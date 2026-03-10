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
          label: 'National Living Wage (£/hr)',
          colour: '#F4A261',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.date),
            value: d.nationalLivingWage,
          })),
        },
        {
          id: 'real-living-wage',
          label: 'Real Living Wage (£/hr)',
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
          finding="Despite the National Living Wage rising to £11.44/hr in 2024, an estimated 3.8 million workers still earn below the Real Living Wage of £12.60/hr — the independently calculated rate for actual living costs."
          colour="#2A9D8F"
          preposition="with"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The United Kingdom has two different concepts of a &ldquo;living wage&rdquo; that are frequently confused. The National Living Wage (NLW) is a statutory minimum wage set annually by the government following recommendations from the Low Pay Commission, and was introduced in April 2016 at £7.20 per hour for workers aged 25 and over (the age threshold was reduced to 21 in 2021). In April 2024 it rose to £11.44 per hour, representing a substantial real-terms increase over eight years and meeting the government's target of raising the NLW to two-thirds of median earnings. The Real Living Wage (RLW) is a separate, independently calculated rate published annually by the Living Wage Foundation, based on a basket of goods and services representing the actual cost of a decent standard of living for workers in the UK. The RLW stood at £12.60 per hour outside London and £13.15 per hour in London in 2024 — significantly above the statutory floor. Accreditation as a Real Living Wage employer is voluntary; companies that pay it display the Living Wage Foundation's logo and commit to applying the rate to all directly employed workers and regular subcontractors. As of 2024, over 15,000 employers had been accredited, covering approximately 460,000 workers.</p>
            <p>Despite the significant increases in the National Living Wage, a substantial gap between the statutory floor and the Real Living Wage has persisted and in some years widened. In 2016, the gap between the NLW and RLW was £1.25 per hour; by 2023 it had grown to £1.58 before closing slightly in 2024 as the government raised the NLW by a record 9.8%. The Living Wage Foundation calculates the RLW using the Minimum Income Standard (MIS) methodology developed by Loughborough University, which surveys the public on what goods and services are needed for a socially acceptable standard of living and translates this into an hourly rate based on typical working hours. The MIS-based rate responds to actual living cost pressures — including food, energy, transport, and childcare — rather than to wage distribution statistics, which is why it tracks inflation more closely and moved sharply higher in 2022 and 2023 as consumer prices surged. The Resolution Foundation estimates that approximately 3.8 million employees were paid below the Real Living Wage in 2023, with the gap between their actual pay and the RLW representing an annual shortfall of around £2,100 per worker.</p>
            </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-wages', label: 'Wage Gap' },
          { id: 'sec-workers', label: 'Workers Below' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Workers below Real Living Wage"
              value="3.8M"
              direction="down"
              polarity="up-is-bad"
              changeText="2023 · Down from 5.8M in 2015 · Still £1.16/hr short of Real Living Wage"
              sparklineData={[5.8, 5.5, 5.1, 4.8, 4.4, 4.1, 3.9, 3.8]}
              href="#sec-wages"
            />
            <MetricCard
              label="National Living Wage 2024"
              value="£11.44/hr"
              direction="up"
              polarity="up-is-good"
              changeText="Up from £7.20 in 2016 · Target: two-thirds of median earnings · Now met"
              sparklineData={[7.20, 7.50, 7.83, 8.21, 8.72, 9.50, 10.42, 11.44]}
              href="#sec-wages"
            />
            <MetricCard
              label="Real Living Wage accredited employers"
              value="15,000&plus;"
              direction="up"
              polarity="up-is-good"
              changeText="2024 · Up from 1,000 in 2013 · Covering 460,000 workers"
              sparklineData={[1000, 2000, 3500, 5200, 7000, 9500, 12000, 15000]}
              href="#sec-wages"
            />
          </div>
        

        <ScrollReveal>
          <section id="sec-wages" className="mb-12">
            <LineChart
              title="National Living Wage vs Real Living Wage gap, 2016–2024"
              subtitle="Statutory National Living Wage (government-set floor) compared to the independently calculated Real Living Wage (actual living costs). Gap shows how far the statutory minimum falls short of a genuine living wage."
              series={wageSeries}
              yLabel="£ per hour"
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
              title="Workers paid below the Real Living Wage, UK, 2016–2024 (millions)"
              subtitle="Employees earning below the Real Living Wage rate, based on ONS Annual Survey of Hours and Earnings hourly pay distributions."
              series={workersSeries}
              yLabel="Millions"
              source={{
                name: 'Living Wage Foundation &amp; ONS',
                dataset: 'Low Pay Analysis — ASHE',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="What's improving"
            value="2 million fewer low-paid workers since 2015"
            unit=""
            description="The number of workers paid below the Real Living Wage has fallen by approximately 2 million since 2015, driven by above-inflation increases in the National Living Wage and voluntary adoption by Real Living Wage employers. Over 15,000 employers — including major names in retail, finance, and local government — have now adopted the Real Living Wage voluntarily, covering 460,000 workers who would otherwise earn less. The 2024 National Living Wage increase of 9.8% was the largest single-year rise since its introduction, and brought the rate to two-thirds of median earnings, fulfilling the government's 2019 manifesto target."
            source="Source: Living Wage Foundation — UK Living Wage Report 2024; ONS — Annual Survey of Hours and Earnings 2023; Resolution Foundation — Low Pay Britain 2024."
          />
        </ScrollReveal>

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
      </main>
    </>
  );
}
