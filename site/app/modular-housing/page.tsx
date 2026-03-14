'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'DLUHC', dataset: 'Housing Supply Statistics — Net Additional Dwellings', url: 'https://www.gov.uk/government/statistical-data-sets/live-tables-on-house-building', date: '2025' },
  { num: 2, name: 'Homes England', dataset: 'MMC Programme Statistics', url: 'https://www.gov.uk/government/publications/homes-england-modern-methods-of-construction', date: '2025' },
  { num: 3, name: 'NHBC', dataset: 'New Home Statistics Review', url: 'https://www.nhbc.co.uk/products-and-services/techzone/nhbc-standards/modern-methods-of-construction', date: '2025' },
];

// ── Types ────────────────────────────────────────────────────────────────────

interface CompletionsPoint {
  year: number;
  homesThousands: number;
}

interface SharePoint {
  year: number;
  mmcSharePct: number;
}

interface CollapsePoint {
  year: number;
  cumulativeCollapses: number;
}

interface ModularHousingData {
  national: {
    modularCompletions: {
      timeSeries: CompletionsPoint[];
      latestYear: number;
      latestThousands: number;
    };
    mmcShareOfNewHomes: {
      timeSeries: SharePoint[];
      latestYear: number;
      latestPct: number;
      governmentTarget: number;
      targetYear: number;
    };
    mmcCompanyCollapses: {
      timeSeries: CollapsePoint[];
      latestYear: number;
      latestCount: number;
    };
  };
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

export default function ModularHousingPage() {
  const [data, setData] = useState<ModularHousingData | null>(null);

  useEffect(() => {
    fetch('/data/modular-housing/modular_housing.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const completionsSeries: Series[] = data
    ? [
        {
          id: 'completions',
          label: 'Modular/MMC homes completed (thousands)',
          colour: '#F4A261',
          data: data.national.modularCompletions.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.homesThousands,
          })),
        },
      ]
    : [];

  const shareSeries: Series[] = data
    ? [
        {
          id: 'share',
          label: '% of new homes using MMC',
          colour: '#264653',
          data: data.national.mmcShareOfNewHomes.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.mmcSharePct,
          })),
        },
      ]
    : [];

  const completionsAnnotations: Annotation[] = [
    { date: new Date(2019, 5, 1), label: '2019: Government 25% MMC target announced' },
    { date: new Date(2022, 5, 1), label: '2022: First major MMC insolvencies' },
    { date: new Date(2023, 5, 1), label: '2023: Ilke Homes collapses' },
  ];

  const shareAnnotations: Annotation[] = [
    { date: new Date(2021, 5, 1), label: '2021: Homes England MMC mandate' },
    { date: new Date(2025, 5, 1), label: '2025: Govt target — 25% of new homes' },
  ];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Modular Housing" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Housing"
          question="Can Factory-Built Homes Solve the Housing Crisis?"
          finding="Modular housing completions reached 12,000 in 2024, just 3% of total housebuilding. Despite government backing, several major MMC manufacturers have collapsed. The UK is far behind Sweden (84% offsite) and Japan."
          colour="#F4A261"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              Modern Methods of Construction — factory-built homes that arrive on site largely pre-assembled — promised to transform UK housebuilding. Faster, cheaper, more consistent quality, lower carbon. The government set a target in 2019 that 25% of homes funded through Homes England would use MMC by 2025.<Cite nums={2} /> That target will not be met. MMC accounts for just 3.1% of completions.<Cite nums={1} />
            </p>
            <p>
              The sector has been hit by a wave of high-profile insolvencies. Ilke Homes — backed by £100 million of Homes England funding — went into administration in 2023 with hundreds of jobs lost and half-built developments abandoned.<Cite nums={2} /> House by Urban Splash, L&amp;G Modular and others followed. The causes vary: capital-intensive factory setup, planning delays, resistance from mortgage lenders and valuers, and the difficulty of competing against traditional housebuilders with established supply chains.<Cite nums={3} />
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-completions', label: 'Completions' },
          { id: 'sec-share', label: 'Market share' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Modular homes completed (UK, 2024)"
              value="12,000"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="+200% since 2018 · But still only 3% of total"
              sparklineData={[4, 5, 6, 7, 8, 10, 12]}
              href="#sec-completions"
            />
            <MetricCard
              label="% of new homes using MMC"
              value="3%"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="Up from 1.2% · Government target was 25% by 2025"
              sparklineData={[1.2, 1.4, 1.6, 2.0, 2.2, 2.7, 3.1]}
              href="#sec-completions"
            />
            <MetricCard
              label="Major MMC manufacturers collapsed"
              value="8"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="2022-2024 · Including Ilke Homes, House by Urban Splash"
              sparklineData={[0, 0, 0, 0, 3, 8]}
              href="#sec-completions"
            />
          </div>
        

        {/* Charts */}
        <ScrollReveal>
          <section id="sec-completions" className="mb-12">
            <LineChart
              title="Modular and MMC homes completed, UK, 2018–2024"
              subtitle="Annual completions of homes built using modern methods of construction (volumetric, panelised and hybrid systems). Growth has been consistent but absolute numbers remain small relative to total housing need."
              series={completionsSeries}
              annotations={completionsAnnotations}
              yLabel="Thousands of homes"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-share" className="mb-12">
            <LineChart
              title="MMC as share of total new homes, UK, 2018–2024"
              subtitle="Modern Methods of Construction as a percentage of total new homes completed. The government target of 25% by 2025 (from Homes England's capital programme) is shown for reference. Actual progress is far behind."
              series={shareSeries}
              annotations={shareAnnotations}
              yLabel="% of total completions"
            />
          </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="What's improving"
            value="NHBC MMC"
            unit="warranty framework"
            description="Homes England's MMC programme continues to invest in factory capacity and de-risk procurement for registered providers. The NHBC's MMC framework provides warranty assurance to address buyer and lender uncertainty. Social housing providers are increasingly specifying MMC — L&amp;G Affordable Homes has committed to 100% MMC for new schemes. The social housing sector's longer contracts and stable demand are better suited to the MMC business model than speculative market sale."
            source="Source: Homes England — MMC Programme Statistics, 2025. NHBC — New Home Statistics Review, 2025."
          />
        </ScrollReveal>

        {/* Sources */}
        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            {data?.metadata.sources.map((src, i) => (
              <div key={i}>
                <a href={src.url} target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">
                  {src.name} — {src.dataset}
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
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
              <RelatedTopics />
      </main>
    </>
  );
}
