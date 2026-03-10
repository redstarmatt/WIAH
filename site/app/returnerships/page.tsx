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

// ── Types ────────────────────────────────────────────────────────────────────

interface InactivityPoint {
  year: number;
  millionsInactive: number;
}

interface PlacementsPoint {
  year: number;
  cumulativePlacements: number;
}

interface IllHealthPoint {
  year: number;
  percentCitingIllHealth: number;
}

interface ReturnershipsData {
  national: {
    economicInactivity5064: {
      timeSeries: InactivityPoint[];
      latestYear: number;
      latestMillions: number;
      note: string;
    };
    returnershipPlacements: {
      timeSeries: PlacementsPoint[];
      latestYear: number;
      latestPlacements: number;
      target: number;
      note: string;
    };
    illHealthInactivity: {
      timeSeries: IllHealthPoint[];
      latestYear: number;
      latestPercent: number;
      note: string;
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

export default function ReturnershipsPage() {
  const [data, setData] = useState<ReturnershipsData | null>(null);

  useEffect(() => {
    fetch('/data/returnerships/returnerships.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const inactivitySeries: Series[] = data
    ? [{
        id: 'inactivity',
        label: 'Economically inactive 50\u201364 (millions)',
        colour: '#E63946',
        data: data.national.economicInactivity5064.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.millionsInactive,
        })),
      }]
    : [];

  const placementsSeries: Series[] = data
    ? [{
        id: 'placements',
        label: 'Returnership placements (cumulative, thousands)',
        colour: '#2A9D8F',
        data: data.national.returnershipPlacements.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.cumulativePlacements / 1000,
        })),
      }]
    : [];

  const illHealthSeries: Series[] = data
    ? [{
        id: 'ill-health',
        label: '% citing ill health as reason for inactivity',
        colour: '#F4A261',
        data: data.national.illHealthInactivity.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.percentCitingIllHealth,
        })),
      }]
    : [];

  const inactivityAnnotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: '2020: Pandemic onset' },
    { date: new Date(2022, 5, 1), label: '2022: Returnership scheme launched' },
  ];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Returnerships" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Returnerships"
          question="Can the UK Bring Older Workers Back?"
          finding="1.1 million people aged 50–64 left the labour market during and after the pandemic. The government's Returnership scheme has helped 15,000 people return to work — a fraction of those who left."
          colour="#264653"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              Economic inactivity among people aged 50–64 rose sharply during the pandemic and has not fully recovered. The stock of inactive 50–64 year olds grew from 3.2 million pre-pandemic to 3.8 million at peak — a rise of 600,000. By 2024, it had fallen to 3.5 million, still 300,000 above the 2019 level. The Bank of England and OBR have consistently identified this cohort as a key constraint on labour supply, contributing to elevated wage growth and persistent inflation.
            </p>
            <p>
              The drivers are primarily health rather than preference. The percentage of inactive 50–64 year olds citing long-term illness or disability as their main reason rose from 34% in 2019 to 45% in 2024 — reflecting both the direct health impacts of COVID-19 (including long COVID, which affects approximately 1.8 million people) and a deterioration in NHS access that has prolonged recovery times. The government's Returnership scheme — launched in Spring 2023 and combining apprenticeships, Skills Bootcamps, and Sector-based Work Academy Programmes targeted at over-50s — had supported 15,000 placements by 2024, against a stated ambition of 100,000. The gap between rhetoric and delivery reflects both the scheme's modest scale and the fundamental barrier that many non-returners face: health problems that paid work cannot easily accommodate.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-inactivity', label: 'Inactivity Trend' },
          { id: 'sec-ill-health', label: 'Ill Health Driver' },
          { id: 'sec-scheme', label: 'Scheme Performance' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Economically inactive aged 50\u201364"
              value="3.5M"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Up 300,000 since pre-pandemic · Long-term illness main driver"
              sparklineData={[3.2, 3.3, 3.6, 3.8, 3.7, 3.5]}
              href="#sec-inactivity"
            />
            <MetricCard
              label="Returnership scheme placements"
              value="15,000"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="Since 2022 · Target: 100,000 · Significant under-delivery"
              sparklineData={[0, 6, 15]}
              href="#sec-inactivity"
            />
            <MetricCard
              label="50\u201364s citing ill health as reason"
              value="45%"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Up from 34% in 2019 · Post-pandemic health deterioration"
              sparklineData={[34, 33, 38, 42, 44, 45]}
              href="#sec-inactivity"
            />
          </div>
        

        {/* Charts */}
        <ScrollReveal>
          <section id="sec-inactivity" className="mb-12">
            <LineChart
              title="Economic inactivity, aged 50–64, UK, 2019–2024"
              subtitle="Millions of people aged 50\u201364 who are neither in work nor seeking work. Rose by 600,000 at pandemic peak; fallen since but remains 300,000 above 2019 level."
              series={inactivitySeries}
              annotations={inactivityAnnotations}
              yLabel="Millions"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-ill-health" className="mb-12">
            <LineChart
              title="Ill health as reason for inactivity, aged 50–64, 2019–2024"
              subtitle="Percentage of economically inactive 50\u201364 year olds citing long-term illness or disability as their main reason for not working. Structural barrier to returnership policy."
              series={illHealthSeries}
              annotations={[{ date: new Date(2020, 5, 1), label: '2020: COVID impact' }]}
              yLabel="Percent (%)"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-scheme" className="mb-12">
            <LineChart
              title="Returnership scheme placements (cumulative), 2022–2024"
              subtitle="Cumulative placements through apprenticeships, Skills Bootcamps, and SWAPs targeted at over-50s. 15,000 achieved against a 100,000 target — a 15% delivery rate."
              series={placementsSeries}
              annotations={[]}
              yLabel="Thousands (cumulative)"
            />
          </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="What's improving"
            value="100,000"
            unit="Returnership target by scheme close"
            description="The Spring Budget 2023 launched Returnerships alongside pension changes that removed the lifetime allowance, reducing the financial incentive for early retirement among higher earners. Work coaches in Jobcentres now have dedicated resource for clients aged 50 and over. The DWP's 50 Plus Champions in every Jobcentre Plus district provide specialist support. Skills Bootcamp completions for over-50s rose 40% in 2024, showing the demand is there when provision is accessible and health barriers are accommodated."
            source="Source: DWP Returnership programme evaluation 2024 · ONS Labour Force Survey Q4 2024."
          />
        </ScrollReveal>

        {/* Sources */}
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
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
              <RelatedTopics />
      </main>
    </>
  );
}
