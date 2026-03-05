'use client'

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';

// ── Types ────────────────────────────────────────────────────────────────────

interface PressFreedomData {
  pressRanking: Array<{ year: number; rank: number }>;
  pressScore: Array<{ year: number; score: number }>;
  metadata: {
    sources: { name: string; dataset: string; url: string; frequency: string }[];
    methodology: string;
    knownIssues: string[];
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function PressFreedomPage() {
  const [data, setData] = useState<PressFreedomData | null>(null);

  useEffect(() => {
    fetch('/data/press-freedom/press_freedom.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const rankingSeries: Series[] = data
    ? [{
        id: 'press-ranking',
        label: 'UK global ranking',
        colour: '#6B7280',
        data: data.pressRanking.map(d => ({
          date: yearToDate(d.year),
          value: d.rank,
        })),
      }]
    : [];

  const scoreSeries: Series[] = data
    ? [{
        id: 'press-score',
        label: 'Press freedom score',
        colour: '#264653',
        data: data.pressScore.map(d => ({
          date: yearToDate(d.year),
          value: d.score,
        })),
      }]
    : [];

  return (
    <>
      <TopicNav topic="Press Freedom" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Press Freedom"
          question="How Free Is the British Press?"
          finding="The UK ranks 23rd in the world for press freedom &mdash; behind Jamaica, Namibia, and Costa Rica. While the ranking has improved from a low of 40th in 2017, structural concerns remain: three companies control 90% of national newspaper circulation, the Official Secrets Act criminalises journalism in the public interest, and the Investigatory Powers Act enables bulk surveillance of journalists&apos; communications."
          colour="#6B7280"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              The UK&apos;s press freedom position has fluctuated significantly over the past decade. Reporters Without Borders (RSF) ranked the UK 40th out of 180 countries in 2017 and 2018, reflecting concerns about mass surveillance legislation, the imprisonment of a journalist for contempt of court, and the use of anti-terrorism powers to intercept journalists&apos; communications. The ranking improved to 23rd by 2024, partly due to the methodology change RSF introduced in 2022 and partly reflecting genuine improvements in the legal environment following successful challenges to surveillance overreach at the European Court of Human Rights. Nevertheless, the UK sits below all Nordic countries, most of Western Europe, and several developing nations &mdash; a position inconsistent with its self-image as a beacon of free expression.
            </p>
            <p>
              Ownership concentration is the structural issue that indices measure poorly. Three companies &mdash; News UK (Murdoch), DMG Media (Rothermere), and Reach plc &mdash; control approximately 90% of national newspaper circulation and significant online readership. Local journalism has contracted sharply: 320 local newspapers have closed since 2009, and the BBC estimates that 58% of local authority areas in England now have no dedicated local news reporter. The Cairncross Review (2019) recommended public funding for local journalism; the government accepted the principle but committed only &pound;2 million to a Future News Fund, which the NUJ described as inadequate. Broadcast media is regulated by Ofcom with statutory impartiality requirements, but print and online media face no equivalent obligation, creating an asymmetric information environment.
            </p>
            <p>
              Legal threats to journalism take multiple forms. The Official Secrets Act 1989 contains no public interest defence, meaning a journalist who publishes classified information that reveals government wrongdoing commits a criminal offence regardless of the public benefit. The Investigatory Powers Act 2016 permits bulk interception of communications, and while judicial commissioner approval is required for access to journalists&apos; sources, the National Union of Journalists has documented cases where this safeguard was circumvented. Strategic lawsuits against public participation (SLAPPs) &mdash; where wealthy claimants use defamation or privacy claims to silence investigative reporting &mdash; are a growing concern: the Foreign Affairs Committee found that SLAPP threats had caused UK media organisations to withdraw or refrain from publishing at least 50 stories between 2018 and 2022. The government introduced anti-SLAPP provisions in the Economic Crime and Corporate Transparency Act 2023, but these apply only to economic crime reporting, leaving a significant gap.
            </p>
            <p>
              The pressures fall unevenly. Freelance journalists, who account for a growing share of investigative work as newsroom staff numbers shrink, have no institutional legal support when threatened with defamation claims. Female journalists face disproportionate online harassment: a 2021 study by the International Federation of Journalists found that 65% of women journalists in the UK had experienced online abuse related to their work, compared with 28% of men. Journalists from ethnic minority backgrounds report higher rates of both online abuse and newsroom discrimination, with 42% saying they had experienced racial discrimination in a UK media workplace. Regional journalists outside London face the dual pressure of fewer outlets and weaker legal resources, meaning that local corruption and public interest stories are increasingly left uncovered. Northern Ireland, where press freedom intersects with legacy conflict issues, has distinct challenges: several journalists investigating paramilitary activity have faced credible death threats.
            </p>
            <p>
              Measuring press freedom is inherently subjective and contested. The RSF index relies on expert questionnaires and incident reporting, with country scores derived from panel assessments that weight qualitative judgement heavily. The 2022 methodology change introduced new indicators and reweighted existing ones, producing ranking shifts that reflect methodological decisions as much as real-world changes &mdash; the UK&apos;s jump from 33rd to 24th in 2022 was partly a recalibration effect. Ownership concentration metrics are well documented by Ofcom&apos;s annual Media Nations report, but measuring the editorial impact of ownership on content is far harder &mdash; concentration of ownership does not automatically mean concentration of editorial line. SLAPP data is particularly difficult: the 50 stories suppressed figure comes from journalist testimony to parliamentary committees and represents a lower bound, since the nature of SLAPPs means many suppressed stories are never publicly known. The closure of local newspapers is well counted, but the replacement of print by digital-only local news sites (which have grown significantly) complicates the narrative of pure decline.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Overview' },
          { id: 'sec-ranking', label: 'Global Ranking' },
          { id: 'sec-score', label: 'Freedom Score' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="UK press freedom ranking"
              value="23rd"
              direction="up"
              polarity="up-is-good"
              changeText="Of 180 countries &middot; Improved from 40th in 2017 &middot; Behind Jamaica, Namibia"
              sparklineData={[34, 38, 40, 40, 33, 35, 33, 24, 26, 23]}
              source="RSF &middot; World Press Freedom Index 2024"
              onExpand={() => {}}
            />
            <MetricCard
              label="Newspaper market concentration"
              value="90%"
              direction="flat"
              polarity="up-is-bad"
              changeText="Three companies control 90% of national circulation"
              sparklineData={[88, 89, 89, 90, 90, 90, 90]}
              source="Ofcom &middot; Media Nations 2023"
              onExpand={() => {}}
            />
            <MetricCard
              label="Local newspapers closed since 2009"
              value="320"
              direction="up"
              polarity="up-is-bad"
              changeText="58% of local authority areas have no dedicated reporter"
              sparklineData={[120, 155, 190, 225, 255, 280, 300, 310, 320]}
              source="Press Gazette &middot; Local News Tracker 2023"
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-ranking" className="mb-12">
            {rankingSeries.length > 0 ? (
              <LineChart
                title="UK press freedom ranking, 2015&ndash;2024"
                subtitle="Position out of 180 countries (lower is better). Methodology changed in 2022, affecting comparability."
                series={rankingSeries}
                yLabel="Ranking (of 180)"
                source={{
                  name: 'Reporters Without Borders',
                  dataset: 'World Press Freedom Index',
                  frequency: 'annual',
                  url: 'https://rsf.org/en/index',
                }}
              />
            ) : (
              <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
            )}
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-score" className="mb-12">
            {scoreSeries.length > 0 ? (
              <LineChart
                title="UK press freedom score, 2015&ndash;2024"
                subtitle="Score out of 100 (higher is better). Evaluates political context, legal framework, economic context, and journalist safety."
                series={scoreSeries}
                yLabel="Score (0&ndash;100)"
                source={{
                  name: 'Reporters Without Borders',
                  dataset: 'World Press Freedom Index',
                  frequency: 'annual',
                  url: 'https://rsf.org/en/index',
                }}
              />
            ) : (
              <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
            )}
          </section>
        </ScrollReveal>

        {/* Sources */}
        <section className="border-t border-wiah-border pt-8 mt-12">
          <h2 className="text-lg font-bold text-wiah-black mb-4">Sources &amp; methodology</h2>
          <div className="text-sm text-wiah-mid space-y-2">
            {data?.metadata.sources.map((src, i) => (
              <p key={i}>
                <strong>{src.name}.</strong> <em>{src.dataset}</em>. {src.frequency} &mdash;&nbsp;
                <a href={src.url} target="_blank" rel="noopener noreferrer" className="underline text-wiah-blue hover:no-underline">
                  {src.url}
                </a>
              </p>
            ))}
          </div>
          <p className="text-sm text-wiah-mid mt-6">{data?.metadata.methodology}</p>
          {data?.metadata.knownIssues && data.metadata.knownIssues.length > 0 && (
            <div className="mt-6 p-4 bg-wiah-light rounded">
              <p className="font-bold text-wiah-black mb-2">Known issues:</p>
              <ul className="text-sm text-wiah-mid space-y-1 list-disc list-inside">
                {data.metadata.knownIssues.map((issue, i) => (
                  <li key={i}>{issue}</li>
                ))}
              </ul>
            </div>
          )}
        </section>
      </main>
    </>
  );
}
