'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import PositiveCallout from '@/components/PositiveCallout';
import RelatedTopics from '@/components/RelatedTopics';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'NHS Digital', dataset: 'Mental Health of Children and Young People in England', url: 'https://digital.nhs.uk/data-and-information/publications/statistical/mental-health-of-children-and-young-people-in-england', date: '2023' },
  { num: 2, name: 'Ditch the Label', dataset: 'Annual Bullying Survey 2023', url: 'https://www.ditchthelabel.org/research-papers/the-annual-bullying-survey-2023/', date: '2023' },
  { num: 3, name: 'University College London', dataset: 'Cyberbullying and Self-Harm Study', date: '2022', note: 'Tracked 10,000 adolescents; cyberbullying victims 2.5x more likely to report self-harm' },
];

// ── Types ────────────────────────────────────────────────────────────────────

interface SocialMediaHarmData {
  timeSeries: Array<{ date: string; teenDepressionPct: number; cyberbullyingPct: number }>;
  metadata: {
    sources: { name: string; dataset: string; url: string; frequency: string }[];
    methodology: string;
    knownIssues: string[];
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: string): Date {
  return new Date(parseInt(y), 6, 1);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function SocialMediaHarmPage() {
  const [data, setData] = useState<SocialMediaHarmData | null>(null);

  useEffect(() => {
    fetch('/data/social-media-harm/social_media_harm.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const depressionSeries: Series[] = data
    ? [
        {
          id: 'teen-depression',
          label: 'Teen girls with depression (%)',
          colour: '#E63946',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.date),
            value: d.teenDepressionPct,
          })),
        },
      ]
    : [];

  const cyberbullySeries: Series[] = data
    ? [
        {
          id: 'cyberbullying',
          label: 'Girls 11–15 experiencing cyberbullying (%)',
          colour: '#E63946',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.date),
            value: d.cyberbullyingPct,
          })),
        },
      ]
    : [];

  return (
    <>
      <TopicNav topic="Social Media Harm" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Social Media Harm"
          preposition="from"
          question="What Is Social Media Actually Doing to Us?"
          finding="40% of girls aged 11–15 experience cyberbullying online. Teen girls' rates of depression have doubled since 2012 — a period that precisely tracks mass smartphone and social media adoption. The Online Safety Act 2023 gives Ofcom powers to fine platforms up to 10% of global revenue, but no major platform has yet faced a meaningful penalty."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              The correlation between mass smartphone adoption and deteriorating adolescent mental health is one of the most debated findings in contemporary social science. In 2012, fewer than half of UK teenagers owned a smartphone; by 2016, that proportion exceeded 80%. Over the same period, NHS Digital surveys using validated clinical tools found that the proportion of 11–16 year old girls meeting the threshold for probable depression or anxiety rose from approximately 7% to 14% — a doubling.<Cite nums={1} /> Boys' rates also rose, but less sharply. Among 17–19 year old women, one-in-four now meets the clinical threshold for a probable mental disorder, compared with fewer than one-in-eight in 2004.<Cite nums={1} /> The mechanism most consistently identified in academic literature is social comparison: platforms designed around image-sharing, likes, and follower counts create constant, inescapable status competitions that are experienced most intensely by adolescent girls during a developmentally vulnerable period.
            </p>
            <p>
              Cyberbullying has been transformed by the architecture of social platforms. Bullying that once ended at the school gate now follows children into their bedrooms. The Ditch the Label Annual Bullying Survey 2023 found that 40% of girls aged 11–15 had experienced cyberbullying — up from 22% in 2012.<Cite nums={2} /> Instagram, Snapchat, and TikTok were the most commonly cited platforms. The 24-hour nature of online harassment, combined with the potential for content to be shared to indefinitely large audiences, means that the psychological impact of cyberbullying is typically more severe than traditional bullying. A 2022 study by University College London tracked 10,000 adolescents and found that those experiencing cyberbullying were 2.5 times more likely to report self-harm than those who had not.<Cite nums={3} /> Children from lower-income households reported disproportionately higher rates, partly because they are less likely to have parental supervision of screen time.
            </p>
            </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Overview' },
          { id: 'sec-depression', label: 'Teen Depression' },
          { id: 'sec-cyberbullying', label: 'Cyberbullying' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Girls 11–15 experiencing cyberbullying"
              value="40%"
              direction="up"
              polarity="up-is-bad"
              changeText="Up from 22% in 2012 · Instagram &amp; Snapchat most cited platforms"
              sparklineData={[22, 25, 28, 32, 35, 37, 39, 40]}
              source="Ditch the Label · Annual Bullying Survey 2023"
              href="#sec-depression"
            />
            <MetricCard
              label="Teen girls reporting depression vs 2012"
              value="+100%"
              direction="up"
              polarity="up-is-bad"
              changeText="7% to 14% · Tracks smartphone adoption curve"
              sparklineData={[7, 8, 9, 10, 11, 12, 13, 14]}
              source="NHS Digital · Mental Health of Children &amp; Young People 2023"
              href="#sec-depression"
            />
            <MetricCard
              label="Social media platforms fined under OSA"
              value="0"
              direction="flat"
              polarity="up-is-bad"
              changeText="Online Safety Act 2023 · Powers in force · Enforcement pending"
              sparklineData={[0, 0, 0, 0, 0, 0, 0, 0]}
              source="Ofcom · Online Safety Act enforcement register 2026"
              href="#sec-depression"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="What is getting better"
            value="OSA 2023"
            unit="in force"
            description="The Online Safety Act 2023 gives Ofcom power to fine platforms up to 10% of global revenue for systemic child safety failures. Several platforms have already changed default settings for under-18 accounts — including Instagram restricting DMs from strangers and TikTok limiting screen time for under-16s — following regulatory pressure ahead of formal enforcement."
            source="Ofcom · Online Safety Act · Platform accountability reports 2024"
          />
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-depression" className="mb-12">
            {depressionSeries.length > 0 ? (
              <LineChart
                title="Teen girls with probable depression, 2012–2024"
                subtitle="Percentage of girls aged 11–16 meeting clinical threshold for probable depression. Tracks smartphone adoption curve."
                series={depressionSeries}
                yLabel="% with probable depression"
                source={{
                  name: 'NHS Digital',
                  dataset: 'Mental Health of Children and Young People in England',
                  frequency: 'biennial',
                  url: 'https://digital.nhs.uk/data-and-information/publications/statistical/mental-health-of-children-and-young-people-in-england',
                }}
              />
            ) : (
              <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
            )}
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-cyberbullying" className="mb-12">
            {cyberbullySeries.length > 0 ? (
              <LineChart
                title="Girls aged 11–15 experiencing cyberbullying, 2012–2024"
                subtitle="Percentage reporting online harassment, threats, or humiliation. Rises sharply with smartphone penetration."
                series={cyberbullySeries}
                yLabel="% experiencing cyberbullying"
                source={{
                  name: 'Ditch the Label',
                  dataset: 'Annual Bullying Survey',
                  frequency: 'annual',
                  url: 'https://www.ditchthelabel.org/research-papers/the-annual-bullying-survey-2023/',
                }}
              />
            ) : (
              <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
            )}
          </section>
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        <section className="border-t border-wiah-border pt-8 mt-12">
          <h2 className="text-lg font-bold text-wiah-black mb-4">Sources &amp; methodology</h2>
          <div className="text-sm text-wiah-mid space-y-2">
            {data?.metadata.sources.map((src, i) => (
              <p key={i}>
                <strong>{src.name}.</strong> <em>{src.dataset}</em>. {src.frequency} — 
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
              <RelatedTopics />
      </main>
    </>
  );
}
