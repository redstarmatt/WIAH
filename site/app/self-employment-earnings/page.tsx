'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'ONS', dataset: 'Labour Force Survey — Self-Employment Income', url: 'https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/earningsandworkinghours', date: '2025', note: 'Median self-employed earnings £16,300; 45% below equivalent employed workers; gap widened since 2010' },
  { num: 2, name: 'HMRC', dataset: 'Self Assessment Tax Returns', url: 'https://www.gov.uk/government/statistics/personal-tax-credits-finalised-award-statistics', date: '2024', note: '65% of self-employed without pension savings; excluded from auto-enrolment' },
  { num: 3, name: 'HMRC', dataset: 'Self-Employment Income Support Scheme Final Report', url: 'https://www.gov.uk/government/collections/hmrc-statistics', date: '2022', note: '2.9 million self-employed received SEISS grants totalling £28.7bn' },
];

// ── Types ────────────────────────────────────────────────────────────────────

interface DataPoint {
  year: number;
  selfEmployedMedian: number;
  employedMedian: number;
  belowLivingWage: number;
  noPension: number;
}

interface TopicData {
  national: {
    timeSeries: DataPoint[];
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

export default function TopicPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/self-employment-earnings/self_employment_earnings.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const chart1Series: Series[] = data
    ? [
        {
          id: 'selfEmployedMedian',
          label: 'Self-employed median (£)',
          colour: '#E63946',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.selfEmployedMedian,
          })),
        },
        {
          id: 'employedMedian',
          label: 'Employed median (£)',
          colour: '#264653',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.employedMedian,
          })),
        },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        {
          id: 'belowLivingWage',
          label: 'Earning below Living Wage (%)',
          colour: '#E63946',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.belowLivingWage,
          })),
        },
        {
          id: 'noPension',
          label: 'Without pension savings (%)',
          colour: '#F4A261',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.noPension,
          })),
        },
      ]
    : [];

  const chart1Annotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: '2020: SEISS support launched — many missed' },
    { date: new Date(2022, 5, 1), label: '2022: Self-employed bear more inflation risk' },
  ];

  const chart2Annotations: Annotation[] = [
    { date: new Date(2016, 5, 1), label: '2016: National Living Wage introduced for employees' },
  ];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Self-Employment Earnings" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Economy & Work"
          question="Are the Self-Employed Getting Left Behind?"
          finding={<>Median self-employed earnings are £16,300 — 45% below equivalent employed workers.<Cite nums={1} /> The gap has widened since 2010 and the pandemic significantly accelerated it.</>}
          colour="#6B7280"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The UK's 4.2 million self-employed workers earn a median of £16,300 per year — 45% less than the median for employees doing comparable work. This gap has widened steadily since 2010 and accelerated sharply during the pandemic, when self-employed incomes fell faster and recovered more slowly than employee wages. The composition of self-employment has shifted: while it once skewed towards skilled tradespeople and professionals, a growing share now comprises low-paid, low-autonomy work in sectors like construction subcontracting, private hire driving and platform-based delivery. Unlike employees, the self-employed have no entitlement to the National Minimum Wage, no statutory sick pay, and no automatic protection against unfair dismissal.<Cite nums={1} /></p>
            <p>The long-term consequences extend well beyond current earnings. Some 65% of self-employed workers have no pension savings at all, because they are excluded from the workplace auto-enrolment scheme that has transformed retirement saving for employees since 2012. This creates a looming crisis: millions of people will reach retirement age with nothing beyond the state pension, which itself replaces a smaller share of income for lower earners. The Self-Employment Income Support Scheme during the pandemic demonstrated both the scale of vulnerability — 2.9 million people claimed £28.7 billion in grants — and the limitations of the safety net, since newly self-employed workers and those with mixed income were excluded entirely. HMRC is exploring pension auto-enrolment through the Making Tax Digital programme, but progress has been slow.<Cite nums={2} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-chart1', label: 'Chart 1' },
          { id: 'sec-chart2', label: 'Chart 2' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Median self-employed earnings"
            value="£16,300"
            unit=""
            direction="flat"
            polarity="up-is-bad"
            changeText={<>45% below equivalent employed workers<Cite nums={1} /></>}
            sparklineData={[14200, 14400, 14600, 14800, 15100, 14500, 15200, 15800, 16000, 16200, 16300]}
            href="#sec-coverage"
          />
          <MetricCard
            label="Gap vs employed (%, median)"
            value="45%"
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText={<>Widened from 35% in 2015 · pandemic accelerated divergence<Cite nums={1} /></>}
            sparklineData={[35, 36, 37, 38, 39, 43, 44, 44, 45, 45, 45]}
            href="#sec-coverage"
          />
          <MetricCard
            label="Self-employed without pension savings"
            value="65%"
            unit=""
            direction="flat"
            polarity="up-is-bad"
            changeText={<>Excluded from auto-enrolment · significant retirement risk<Cite nums={2} /></>}
            sparklineData={[68, 68, 67, 66, 66, 65, 65, 65, 65, 65, 65]}
            href="#sec-coverage"
          />
        </div>

        {/* Charts */}
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Median earnings: self-employed vs employed, UK, 2015-2025"
              subtitle="Median annual earnings for self-employed and employed workers. The gap has widened since 2015."
              series={chart1Series}
              annotations={chart1Annotations}
              yLabel="Value"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Self-employed income distribution, UK, 2015-2025"
              subtitle="Percentage of self-employed earning below key income thresholds."
              series={chart2Series}
              annotations={chart2Annotations}
              yLabel="Value"
            />
          </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="SEISS filled a gap in 2020"
            value="2.9m"
            unit="self-employed received SEISS grants"
            description={<>The Self-Employment Income Support Scheme paid out £28.7bn to 2.9 million self-employed workers during the pandemic, covering 80% of average trading profits.<Cite nums={3} /> The government is considering extending pension auto-enrolment to the self-employed through HMRC's digital tax returns.<Cite nums={2} /></>}
            source="Source: HMRC — Self-Employment Income Support Scheme final report, 2022."
          />
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

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
      </main>
    </>
  );
}
