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

interface LivingWageData {
  national: {
    timeSeries: Array<{
      date: string;
      nationalLivingWage: number;
      realLivingWage: number;
      workersBelowMillion: number;
    }>;
  };
  metadata: {
    sources: Array<{ name: string; dataset: string; url: string; frequency: string }>;
    methodology: string;
    knownIssues: string[];
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: string): Date {
  return new Date(parseInt(y), 5, 1);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function LivingWagePage() {
  const [data, setData] = useState<LivingWageData | null>(null);

  useEffect(() => {
    fetch('/data/living-wage/living_wage.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const wageSeries: Series[] = data
    ? [
        {
          id: 'national-living-wage',
          label: 'National Living Wage (&pound;/hr)',
          colour: '#F4A261',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.date),
            value: d.nationalLivingWage,
          })),
        },
        {
          id: 'real-living-wage',
          label: 'Real Living Wage (&pound;/hr)',
          colour: '#2A9D8F',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.date),
            value: d.realLivingWage,
          })),
        },
      ]
    : [];

  const workersSeries: Series[] = data
    ? [{
        id: 'workers-below',
        label: 'Workers below Real Living Wage (millions)',
        colour: '#E63946',
        data: data.national.timeSeries.map(d => ({
          date: yearToDate(d.date),
          value: d.workersBelowMillion,
        })),
      }]
    : [];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Living Wage" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Living Wage"
          question="How Many Workers Are Still Paid Below a Living Wage?"
          finding="Despite the National Living Wage rising to &pound;11.44/hr in 2024, an estimated 3.8 million workers still earn below the Real Living Wage of &pound;12.60/hr &mdash; the independently calculated rate for actual living costs."
          colour="#2A9D8F"
          preposition="with"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The UK has two different living wage rates. The National Living Wage (NLW) is the statutory minimum, rising to &pound;11.44 per hour in April 2024 &mdash; a record 9.8&percnt; increase meeting the government&apos;s target of two-thirds of median earnings. The Real Living Wage (RLW) is separately calculated by the Living Wage Foundation based on actual living costs, standing at &pound;12.60 per hour (or &pound;13.15 in London) in 2024 &mdash; a gap of &pound;1.16 that, despite narrowing, represents an annual shortfall of around &pound;2,100 for an affected worker. The Resolution Foundation estimates approximately 3.8 million employees were paid below the RLW in 2023. Hospitality (45&percnt; of workers below the RLW), retail, social care, and agriculture have the highest concentrations; social care commissioning rates from local authorities structurally prevent many providers from paying it, contributing to over 160,000 vacancies and high turnover.</p>
            <p>The workers most likely to earn below the Real Living Wage are women (58&percnt; of those affected), part-time workers, young adults aged 16&ndash;21 excluded from the full NLW, and workers in rural areas and deprived local authorities. Northern Ireland, parts of Wales, and rural English counties have the highest proportions of low-paid workers. Young workers aged 16&ndash;21 face a statutory minimum of &pound;8.60 in 2024 &mdash; well below even the NLW floor &mdash; leaving a large proportion earning significantly less than a living income on any measure.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-wages', label: 'Wage Gap' },
          { id: 'sec-workers', label: 'Workers Below' },
        ]} />

        <ScrollReveal>
          <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Workers below Real Living Wage"
              value="3.8M"
              direction="down"
              polarity="up-is-bad"
              changeText="2023 &middot; Down from 5.8M in 2015 &middot; Still &pound;1.16/hr short of Real Living Wage"
              sparklineData={[5.8, 5.5, 5.1, 4.8, 4.4, 4.1, 3.9, 3.8]}
              onExpand={() => {}}
            />
            <MetricCard
              label="National Living Wage 2024"
              value="&pound;11.44/hr"
              direction="up"
              polarity="up-is-good"
              changeText="Up from &pound;7.20 in 2016 &middot; Target: two-thirds of median earnings &middot; Now met"
              sparklineData={[7.20, 7.50, 7.83, 8.21, 8.72, 9.50, 10.42, 11.44]}
              onExpand={() => {}}
            />
            <MetricCard
              label="Real Living Wage accredited employers"
              value="15,000&plus;"
              direction="up"
              polarity="up-is-good"
              changeText="2024 &middot; Up from 1,000 in 2013 &middot; Covering 460,000 workers"
              sparklineData={[1000, 2000, 3500, 5200, 7000, 9500, 12000, 15000]}
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-wages" className="mb-12">
            <LineChart
              title="National Living Wage vs Real Living Wage gap, 2016&ndash;2024"
              subtitle="Statutory National Living Wage (government-set floor) compared to the independently calculated Real Living Wage (actual living costs). Gap shows how far the statutory minimum falls short of a genuine living wage."
              series={wageSeries}
              yLabel="&pound; per hour"
              source={{
                name: 'Living Wage Foundation &amp; HM Government',
                dataset: 'Real Living Wage rates &amp; National Minimum Wage regulations',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-workers" className="mb-12">
            <LineChart
              title="Workers paid below the Real Living Wage, UK, 2016&ndash;2024 (millions)"
              subtitle="Employees earning below the Real Living Wage rate, based on ONS Annual Survey of Hours and Earnings hourly pay distributions."
              series={workersSeries}
              yLabel="Millions"
              source={{
                name: 'Living Wage Foundation &amp; ONS',
                dataset: 'Low Pay Analysis &mdash; ASHE',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="What&apos;s improving"
            value="2 million fewer low-paid workers since 2015"
            unit=""
            description="The number of workers paid below the Real Living Wage has fallen by approximately 2 million since 2015, driven by above-inflation increases in the National Living Wage and voluntary adoption by Real Living Wage employers. Over 15,000 employers &mdash; including major names in retail, finance, and local government &mdash; have now adopted the Real Living Wage voluntarily, covering 460,000 workers who would otherwise earn less. The 2024 National Living Wage increase of 9.8&percnt; was the largest single-year rise since its introduction, and brought the rate to two-thirds of median earnings, fulfilling the government&apos;s 2019 manifesto target."
            source="Source: Living Wage Foundation &mdash; UK Living Wage Report 2024; ONS &mdash; Annual Survey of Hours and Earnings 2023; Resolution Foundation &mdash; Low Pay Britain 2024."
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
