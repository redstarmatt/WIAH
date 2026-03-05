'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import PositiveCallout from '@/components/PositiveCallout';

// ── Types ────────────────────────────────────────────────────────────────────

interface CivilLibertiesData {
  timeSeries: Array<{ date: string; cctvsPerThousand: number; stopSearchPerThousand: number }>;
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

export default function CivilLibertiesPage() {
  const [data, setData] = useState<CivilLibertiesData | null>(null);

  useEffect(() => {
    fetch('/data/civil-liberties/civil_liberties.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const stopSearchSeries: Series[] = data
    ? [
        {
          id: 'stop-search',
          label: 'Police stop and search per 1,000 population',
          colour: '#6B7280',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.date),
            value: d.stopSearchPerThousand,
          })),
        },
      ]
    : [];

  const cctvSeries: Series[] = data
    ? [
        {
          id: 'cctv-density',
          label: 'Estimated CCTV cameras per 1,000 population',
          colour: '#6B7280',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.date),
            value: d.cctvsPerThousand,
          })),
        },
      ]
    : [];

  return (
    <>
      <TopicNav topic="Civil Liberties" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Civil Liberties"
          preposition="with"
          question="Is the State Acquiring Too Much Power Over Citizens?"
          finding="The UK has an estimated 5.2 million CCTV cameras &mdash; one per 13 people, the highest density of any democracy. Since 2014, a series of laws has expanded surveillance powers, restricted protest rights, and extended pre-charge detention. CIVICUS has downgraded Britain&apos;s civic space rating, and Liberty and other organisations document a pattern of incremental erosion that individually looks modest but cumulatively is significant."
          colour="#6B7280"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              Britain has accumulated one of the world&apos;s most extensive surveillance infrastructures without any single democratic decision. An estimated 5.2 million CCTV cameras &mdash; roughly one per 13 citizens &mdash; have grown through market decisions, planning conditions, and police recommendations rather than legislation. The Investigatory Powers Act 2016 provides a framework for bulk communications interception and mass retention of internet connection records; the European Court of Human Rights found parts of it incompatible with human rights law in 2021. The Police, Crime, Sentencing and Courts Act 2022 and the Public Order Act 2023 introduced new offences of &ldquo;serious disruption&rdquo; and &ldquo;serious disruption prevention orders&rdquo; &mdash; civil pre-emptive bans on named individuals attending protests before any offence has been committed, which the Joint Committee on Human Rights found incompatible with Articles 10 and 11 of the European Convention. CIVICUS downgraded the UK&apos;s civic space rating from &ldquo;Open&rdquo; to &ldquo;Narrowed&rdquo; in 2019.
            </p>
            <p>
              Stop and search reached 16 per 1,000 population in 2023 &mdash; up from a post-2014 reform low but below the 25 per 1,000 peak in 2010/11. Black people remain approximately 7 times more likely to be stopped and searched than white people, a ratio unchanged for 20 years and persistent after controlling for area-level crime rates. Ethnic minority communities face disproportionate exposure to Prevent referrals &mdash; Muslim communities account for 65% of referrals despite being 5% of the population. Facial recognition technology deployed by the Metropolitan Police has significantly higher error rates for darker-skinned individuals. The Biometrics and Surveillance Camera Commissioner was abolished in 2023 without replacement, removing independent oversight precisely as the surveillance estate expanded.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Overview' },
          { id: 'sec-stop-search', label: 'Stop &amp; Search' },
          { id: 'sec-cctv', label: 'CCTV Density' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="CCTV cameras per 1,000 population"
              value="75"
              direction="up"
              polarity="up-is-bad"
              changeText="5.2 million total &middot; 1 per 13 people &middot; Highest density of any democracy"
              sparklineData={[45, 50, 55, 58, 62, 66, 70, 75]}
              source="BSIA &middot; CCTV Survey 2023"
              onExpand={() => {}}
            />
            <MetricCard
              label="Police stop and search per 1,000"
              value="16"
              direction="up"
              polarity="up-is-bad"
              changeText="Rising since 2019 &middot; Black people 7&times; more likely to be stopped"
              sparklineData={[25, 20, 14, 11, 9, 10, 13, 16]}
              source="Home Office &middot; Police Powers and Procedures 2023"
              onExpand={() => {}}
            />
            <MetricCard
              label="UK CIVICUS civic space rating"
              value="3/5"
              direction="down"
              polarity="up-is-good"
              changeText="Narrowed &middot; Downgraded from Open in 2019 &middot; PCSC Act 2022 &amp; Public Order Act 2023 cited"
              sparklineData={[4, 4, 4, 4, 3, 3, 3, 3]}
              source="CIVICUS &middot; State of Civil Society Report 2024"
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="What is getting better"
            value="Independent"
            unit="judiciary"
            description="The UK&apos;s independent judiciary has repeatedly struck down overbroad executive powers &mdash; the Supreme Court ruled the Rwanda deportation plan unlawful in November 2023, courts have quashed several Prevent decisions, and judicial review remains a meaningful check on state power. The rule of law in Britain remains robust by global standards, with active civil society, a free press, and parliamentary scrutiny providing genuine accountability."
            source="UK Supreme Court &middot; Judicial Review Statistics &middot; JUSTICE 2024"
          />
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-stop-search" className="mb-12">
            {stopSearchSeries.length > 0 ? (
              <LineChart
                title="Police stop and search in England and Wales, 2010&ndash;2023"
                subtitle="Searches per 1,000 population under PACE and Section 60 powers. Fell after 2014 reforms, rising again from 2019."
                series={stopSearchSeries}
                yLabel="Searches per 1,000 population"
                source={{
                  name: 'Home Office',
                  dataset: 'Police Powers and Procedures: Stop and Search',
                  frequency: 'annual',
                  url: 'https://www.gov.uk/government/statistics/police-powers-and-procedures-stop-and-search-and-arrests-england-and-wales',
                }}
              />
            ) : (
              <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
            )}
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-cctv" className="mb-12">
            {cctvSeries.length > 0 ? (
              <LineChart
                title="Estimated CCTV cameras per 1,000 population, UK 2010&ndash;2023"
                subtitle="Industry estimates from BSIA survey. No central register exists; actual numbers may be higher. Includes public and private cameras."
                series={cctvSeries}
                yLabel="Cameras per 1,000 population"
                source={{
                  name: 'BSIA',
                  dataset: 'British Security Industry Association CCTV Survey',
                  frequency: 'biennial',
                  url: 'https://www.bsia.co.uk/publications',
                }}
              />
            ) : (
              <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
            )}
          </section>
        </ScrollReveal>

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
