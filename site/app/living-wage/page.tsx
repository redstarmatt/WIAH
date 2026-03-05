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
            <p>The United Kingdom has two different concepts of a &ldquo;living wage&rdquo; that are frequently confused. The National Living Wage (NLW) is a statutory minimum wage set annually by the government following recommendations from the Low Pay Commission, and was introduced in April 2016 at &pound;7.20 per hour for workers aged 25 and over (the age threshold was reduced to 21 in 2021). In April 2024 it rose to &pound;11.44 per hour, representing a substantial real-terms increase over eight years and meeting the government&apos;s target of raising the NLW to two-thirds of median earnings. The Real Living Wage (RLW) is a separate, independently calculated rate published annually by the Living Wage Foundation, based on a basket of goods and services representing the actual cost of a decent standard of living for workers in the UK. The RLW stood at &pound;12.60 per hour outside London and &pound;13.15 per hour in London in 2024 &mdash; significantly above the statutory floor. Accreditation as a Real Living Wage employer is voluntary; companies that pay it display the Living Wage Foundation&apos;s logo and commit to applying the rate to all directly employed workers and regular subcontractors. As of 2024, over 15,000 employers had been accredited, covering approximately 460,000 workers.</p>
            <p>Despite the significant increases in the National Living Wage, a substantial gap between the statutory floor and the Real Living Wage has persisted and in some years widened. In 2016, the gap between the NLW and RLW was &pound;1.25 per hour; by 2023 it had grown to &pound;1.58 before closing slightly in 2024 as the government raised the NLW by a record 9.8%. The Living Wage Foundation calculates the RLW using the Minimum Income Standard (MIS) methodology developed by Loughborough University, which surveys the public on what goods and services are needed for a socially acceptable standard of living and translates this into an hourly rate based on typical working hours. The MIS-based rate responds to actual living cost pressures &mdash; including food, energy, transport, and childcare &mdash; rather than to wage distribution statistics, which is why it tracks inflation more closely and moved sharply higher in 2022 and 2023 as consumer prices surged. The Resolution Foundation estimates that approximately 3.8 million employees were paid below the Real Living Wage in 2023, with the gap between their actual pay and the RLW representing an annual shortfall of around &pound;2,100 per worker.</p>
            <p>The industries with the highest concentrations of workers paid below the Real Living Wage are hospitality, retail, residential social care, and agriculture. These sectors are characterised by high labour intensity, relatively low productivity growth, significant price competition, and historically weak union representation. Hospitality is particularly exposed: approximately 45% of workers in accommodation and food services are paid below the Real Living Wage, compared with 9% in professional services. The Low Pay Commission&apos;s annual reports have consistently found that small and medium-sized businesses in these sectors find NLW increases most challenging, because they cannot easily pass costs on to consumers or absorb them through productivity improvements. Social care is a special case: local authority commissioning rates for residential and domiciliary care rarely reflect the Real Living Wage, meaning that care providers operating on local authority contracts find it structurally difficult to pay it even when they want to. The workforce implications are significant &mdash; the social care sector recorded over 160,000 vacancies in 2023, and the Care Quality Commission links poor pay to high staff turnover and care quality risks.</p>
            <p>The workers most likely to be paid below the Real Living Wage are women, part-time workers, young adults, workers in rural areas, and workers in the most deprived local authorities. Women represent approximately 58% of workers below the Real Living Wage, reflecting the feminisation of low-paid sectors including care, hospitality, and retail. Part-time workers are disproportionately affected: many are on contracts that do not accumulate sufficient hours to achieve a living income even at the Real Living Wage rate, and zero-hours contract workers on short average hours may fall below the Real Living Wage on an annual earnings basis even if their hourly rate exceeds it. Geographically, Northern Ireland, parts of Wales, and rural English counties have the highest proportions of low-paid workers, reflecting local labour market conditions and the predominance of lower-productivity sectors. Young workers aged 16&ndash;21 are excluded from the full National Living Wage and face a statutory minimum of &pound;8.60 in 2024, leaving a significant proportion earning below even the NLW floor that applies to older workers.</p>
            <p>Measuring the number of workers below the Real Living Wage relies primarily on the ONS Annual Survey of Hours and Earnings (ASHE), which collects data on hourly pay from employer payroll records for approximately 180,000 employee jobs. ASHE is considered a reliable source for hourly pay distribution analysis, though it excludes self-employed workers and has some undercoverage of small employers. The comparison between ASHE hourly pay and the Real Living Wage is complicated by the fact that some workers receive non-pay benefits (such as employer pension contributions, subsidised accommodation, or meals) that affect their total compensation but not their headline hourly pay rate. The Living Wage Foundation&apos;s estimate of workers below the RLW uses ASHE data but applies judgment about which benefits can fairly be counted against the wage threshold. Seasonal and part-year workers pose a particular challenge because their hourly pay may exceed the RLW but their annual earnings fall far short of a living income. The NLW compliance rate has improved significantly since HMRC enforcement was strengthened from 2016, but the Resolution Foundation estimates that approximately 250,000 workers are still paid below the statutory minimum, indicating that some underpayment persists even at the legal floor.</p>
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
            description="The number of workers paid below the Real Living Wage has fallen by approximately 2 million since 2015, driven by above-inflation increases in the National Living Wage and voluntary adoption by Real Living Wage employers. Over 15,000 employers &mdash; including major names in retail, finance, and local government &mdash; have now adopted the Real Living Wage voluntarily, covering 460,000 workers who would otherwise earn less. The 2024 National Living Wage increase of 9.8% was the largest single-year rise since its introduction, and brought the rate to two-thirds of median earnings, fulfilling the government&apos;s 2019 manifesto target."
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
