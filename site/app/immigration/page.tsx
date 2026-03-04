'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';

// ── Types ────────────────────────────────────────────────────────────────────

interface ImmigrationData {
  national: {
    netMigration: {
      timeSeries: Array<{ year: number; netMigrationThousands: number }>;
      latestYear: number;
      latestThousands: number;
    };
    byVisa: Array<{ visaType: string; grantedThousands: number }>;
    asylumBacklog: {
      timeSeries: Array<{ year: number; backlogThousands: number }>;
      latestYear: number;
      latestThousands: number;
    };
    emigration: {
      timeSeries: Array<{ year: number; emigrationThousands: number }>;
      latestYear: number;
      latestThousands: number;
    };
  };
  metadata: {
    sources: Array<{ name: string; dataset: string; url: string; frequency: string }>;
    methodology: string;
    knownIssues: string[];
  };
}

// ── Component ────────────────────────────────────────────────────────────────

export default function ImmigrationPage() {
  const [data, setData] = useState<ImmigrationData | null>(null);

  useEffect(() => {
    fetch('/data/immigration/immigration.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // Derive series for net migration and emigration chart
  const migrationSeries: Series[] = data
    ? [
        {
          id: 'net-migration',
          label: 'Net migration (thousands)',
          colour: '#264653',
          data: data.national.netMigration.timeSeries.map(d => ({
            date: new Date(d.year, 0, 1),
            value: d.netMigrationThousands,
          })),
        },
        {
          id: 'emigration',
          label: 'Emigration (thousands)',
          colour: '#6B7280',
          data: data.national.emigration.timeSeries.map(d => ({
            date: new Date(d.year, 0, 1),
            value: d.emigrationThousands,
          })),
        },
      ]
    : [];

  const asylumSeries: Series[] = data
    ? [
        {
          id: 'asylum-backlog',
          label: 'Asylum backlog (thousands)',
          colour: '#E63946',
          data: data.national.asylumBacklog.timeSeries.map(d => ({
            date: new Date(d.year, 0, 1),
            value: d.backlogThousands,
          })),
        },
      ]
    : [];

  return (
    <>
      <TopicNav topic="Immigration" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Immigration"
          question="What Is Actually Happening with UK Immigration?"
          finding="Net migration to the UK reached a record 745,000 in the year to December 2022 &mdash; nearly three times pre-Brexit levels. It fell to an estimated 685,000 in 2023. Work visas are the largest category, followed by study. The asylum backlog reached 133,000 in 2023, though it has been cut substantially. Emigration has also risen."
          colour="#264653"
          preposition="with"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Net migration to the UK peaked at 745,000 in the year to December 2022 &mdash; the highest figure since records began and nearly three times the pre-Brexit average of roughly 250,000 a year recorded between 2012 and 2019. It fell to an estimated 685,000 in the year to December 2023 as Home Office restrictions took effect, but remained historically extraordinary. The ONS substantially revised earlier estimates upward in 2023 after adopting new methodology incorporating HMRC and DWP administrative data. Emigration has risen in parallel: 508,000 people left the UK in 2023, up from around 310,000 before Brexit, reflecting post-departure mobility among EU nationals and a steady outflow of British emigrants. The points-based system introduced in January 2021, replacing free movement for EU nationals, means non-EU immigration now drives the totals.</p>
            <p>Work visas accounted for 286,000 grants in 2022/23, with health and care workers forming the single largest skilled-worker group following the extension of the Health and Care Worker visa route. Student visas reached 486,000 &mdash; triple the 2019 figure &mdash; driven by surging international enrolments and English-language courses; dependent-visa rules were tightened in January 2024 to curb the growth. Humanitarian routes contributed around 199,000 grants, combining asylum decisions, the British National (Overseas) Hong Kong visa scheme, and the Homes for Ukraine programme, which has housed over 160,000 Ukrainians. Family visas totalled 104,000; the minimum income threshold for family reunion was raised from &pound;18,600 to &pound;29,000 in 2024, a move expected to reduce volumes sharply.</p>
            <p>The asylum backlog &mdash; cases awaiting an initial decision &mdash; grew from 24,000 in 2017 to a peak of 133,000 in 2023. The causes were cumulative: surging applications (particularly from Albania, Afghanistan, and Eritrea), a COVID-era suspension of in-person interviews, and a chronic shortage of trained caseworkers. The Home Office processed 112,000 claims in 2023, double the 2022 rate, using a surge staffing model that cut the initial-decision queue. The average time to reach an asylum decision remained around 22 months. The Rwanda removal scheme, designed to deter Channel crossings, was blocked by the Supreme Court in November 2023 and remained on hold; small-boat arrivals peaked at around 45,000 in 2022 before falling to roughly 29,000 in 2023.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-migration', label: 'Migration Trend' },
          { id: 'sec-visas', label: 'By Visa Type' },
          { id: 'sec-asylum', label: 'Asylum Backlog' },
        ]} />

        <ScrollReveal>
          <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Net migration (UK)"
              value="685K"
              direction="down"
              polarity="up-is-bad"
              changeText="Year to Dec 2023 &middot; Down from record 745K in 2022 &middot; Pre-Brexit average was ~250K &middot; ONS revised upwards significantly in 2023"
              sparklineData={[177, 209, 249, 322, 273, 282, 270, 271, 184, 488, 745, 685]}
              onExpand={() => {}}
            />
            <MetricCard
              label="Asylum backlog (cases awaiting decision)"
              value="133K"
              direction="down"
              polarity="up-is-bad"
              changeText="2023 &middot; Down from peak but still 3x pre-pandemic &middot; Rwanda policy blocked by courts &middot; Average wait: 2+ years"
              sparklineData={[30, 28, 24, 29, 38, 52, 76, 120, 133]}
              onExpand={() => {}}
            />
            <MetricCard
              label="Student visas granted"
              value="486K"
              direction="flat"
              polarity="up-is-bad"
              changeText="2022/23 &middot; Up 3x since 2019 &middot; Dependent visa changes Jan 2024 expected to cut numbers &middot; Universities warn of financial risk"
              sparklineData={[175, 228, 297, 289, 179, 379, 486, 460]}
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-migration" className="mb-12">
            <LineChart
              title="UK net migration and emigration, 2012&ndash;2023"
              subtitle="Thousands of people. Net migration is immigration minus emigration. Both have risen since Brexit."
              series={migrationSeries}
              yLabel="Thousands"
              source={{
                name: 'ONS',
                dataset: 'International Migration Statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-visas" className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-2">UK visas granted by route, 2022/23</h2>
            <p className="text-sm text-wiah-mid font-mono mb-6">Thousands of visas granted by visa category.</p>
            {data && (
              <div className="space-y-3">
                {data.national.byVisa.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-40 text-sm text-wiah-black flex-shrink-0">{item.visaType}</div>
                    <div className="flex-1 bg-wiah-border rounded h-5 overflow-hidden">
                      <div
                        className="h-full rounded"
                        style={{ width: `${(item.grantedThousands / 490) * 100}%`, backgroundColor: '#264653' }}
                      />
                    </div>
                    <div className="w-16 text-right text-sm font-mono text-wiah-black">{item.grantedThousands}K</div>
                  </div>
                ))}
              </div>
            )}
            <p className="font-mono text-xs text-wiah-mid mt-4">Source: Home Office &mdash; Immigration Statistics 2023</p>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-asylum" className="mb-12">
            <LineChart
              title="UK asylum backlog, 2015&ndash;2023"
              subtitle="Thousands of cases awaiting an initial decision. Peaked at 133,000 in 2023."
              series={asylumSeries}
              yLabel="Thousands"
              source={{
                name: 'Home Office',
                dataset: 'Asylum Statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="What&apos;s improving"
            value="&ndash;36%"
            unit="fall in asylum backlog processing time since new fast-track decisions were introduced in 2023"
            description="The Home Office processed a record 112,000 asylum claims in 2023 &mdash; more than double the 2022 figure &mdash; driven by a &apos;surge&apos; processing model and additional caseworkers. The backlog of cases awaiting an initial decision fell from its peak. The UK Resettlement Scheme and Homes for Ukraine programme have provided legal, managed routes for over 200,000 displaced people since 2022. The points-based immigration system, introduced in January 2021, has simplified routes and added greater transparency to work visa allocations. The Illegal Migration Act 2023 introduced new provisions, though key parts remain subject to legal challenge."
            source="Source: ONS &mdash; Migration Statistics 2023; Home Office &mdash; Immigration Statistics 2023."
          />
        </ScrollReveal>

        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            {data?.metadata.sources.map((src, i) => (
              <div key={i}>
                <a href={src.url} target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">
                  {src.name} &mdash; {src.dataset}
                </a>
                <div className="text-xs text-wiah-mid">Updated {src.frequency}</div>
              </div>
            ))}
          </div>
          <div className="text-sm text-wiah-mid mt-6 space-y-2">
            <h3 className="font-bold">Methodology</h3>
            <p>{data?.metadata.methodology}</p>
          </div>
          <div className="text-sm text-wiah-mid mt-6 space-y-2">
            <h3 className="font-bold">Known issues</h3>
            <ul className="list-disc list-inside space-y-1">
              {data?.metadata.knownIssues.map((issue, i) => (
                <li key={i}>{issue}</li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
