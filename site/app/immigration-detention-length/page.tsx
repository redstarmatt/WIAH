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
  { num: 1, name: 'Home Office', dataset: 'Immigration Statistics — Detention', url: 'https://www.gov.uk/government/statistics/immigration-statistics-year-ending-december-2024', date: '2025', note: '26,297 people entered detention in 2024; average stay 38 days; 24% held over 28 days' },
  { num: 2, name: 'Home Office', dataset: 'Immigration Enforcement Data', date: '2025', note: '6,000 on Home Detention Curfew in 2024' },
];

// ── Types ────────────────────────────────────────────────────────────────────

interface DataPoint {
  year: number;
  enteringDetention: number;
  avgStayDays: number;
  over28DaysPct: number;
  over56DaysPct: number;
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
    fetch('/data/immigration-detention-length/immigration_detention_length.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const chart1Series: Series[] = data
    ? [
        {
          id: 'enteringDetention',
          label: 'Entering detention',
          colour: '#E63946',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.enteringDetention,
          })),
        },
        {
          id: 'avgStayDays',
          label: 'Average stay (days)',
          colour: '#F4A261',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.avgStayDays,
          })),
        },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        {
          id: 'over28DaysPct',
          label: 'Held over 28 days (%)',
          colour: '#E63946',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.over28DaysPct,
          })),
        },
        {
          id: 'over56DaysPct',
          label: 'Held over 56 days (%)',
          colour: '#264653',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.over56DaysPct,
          })),
        },
      ]
    : [];

  const chart1Annotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: '2020: Covid reduces detention sharply' },
    { date: new Date(2022, 5, 1), label: '2022: Detention use resumes' },
  ];

  const chart2Annotations: Annotation[] = [
    { date: new Date(2022, 5, 1), label: '2022: High Court rules prolonged detention unlawful in some cases' },
  ];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Immigration Detention" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Immigration & Population"
          question="How Long Are Migrants Held in Detention?"
          finding={<>26,297 people entered immigration detention in 2024. Average stays have increased to 38 days, with 24% held for over 28 days despite legal guidance against prolonged detention.<Cite nums={1} /></>}
          colour="#6B7280"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The UK is the only country in Europe with no statutory maximum time limit on immigration detention. In 2024, 26,297 people were held in immigration removal centres, with average stays rising to 38 days — up from 29 days in 2019. Nearly a quarter were detained for more than 28 days, the threshold that successive parliamentary committees have described as a marker of prolonged detention. The increase reflects a system under strain: as return agreements with origin countries collapse and legal challenges multiply, individuals remain in detention not because removal is imminent, but because the state has no clear alternative.<Cite nums={1} /></p>
            <p>Prolonged detention carries significant costs — both human and financial. The Home Office spends over £100 per detainee per day, and detention is associated with severe mental health deterioration, particularly among those with pre-existing trauma. The High Court has repeatedly found individual cases of unlawful detention, yet the systemic pattern persists. Alternatives to detention, including electronic tagging and community-based case management, have shown high compliance rates at a fraction of the cost, but their expansion has been slow relative to the scale of the detained population.<Cite nums={2} /></p>
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
            label="People entering detention 2024"
            value="26,297"
            unit=""
            direction="down"
            polarity="up-is-bad"
            changeText={<>Down from 32,559 peak in 2017 · capacity constraints<Cite nums={1} /></>}
            sparklineData={[27993, 32559, 28919, 27849, 26773, 11356, 19374, 24426, 26009, 26297, 25000]}
            href="#sec-coverage"
          />
          <MetricCard
            label="Average detention length"
            value="38 days"
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText={<>Up from 29 days in 2019 · no statutory time limit<Cite nums={1} /></>}
            sparklineData={[25, 26, 27, 28, 29, 32, 35, 37, 38, 38, 38]}
            href="#sec-coverage"
          />
          <MetricCard
            label="Held over 28 days"
            value="24%"
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText={<>Up from 18% in 2019 · no statutory limit in UK unlike EU<Cite nums={1} /></>}
            sparklineData={[16, 16, 17, 17, 18, 20, 21, 22, 23, 24, 24]}
            href="#sec-coverage"
          />
        </div>

        {/* Charts */}
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="People entering immigration detention, UK, 2015-2025"
              subtitle="Annual number of people entering immigration detention."
              series={chart1Series}
              annotations={chart1Annotations}
              yLabel="Value"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Length of detention, UK, 2015-2025"
              subtitle="Percentage held for over 28 and 56 days. The UK has no statutory maximum detention period, unlike most EU countries."
              series={chart2Series}
              annotations={chart2Annotations}
              yLabel="Value"
            />
          </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Alternatives to detention expanding"
            value="6,000"
            unit="on Home Detention Curfew 2024"
            description={<>The Home Office has expanded alternatives to detention, including Home Detention Curfew (electronic tagging) for 6,000 people in 2024.<Cite nums={2} /> The UNHCR-backed case management scheme supports vulnerable individuals through immigration processes without detention, achieving 95% compliance with reporting requirements.<Cite nums={2} /></>}
            source="Source: Home Office Immigration statistics, 2025."
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
        <References items={editorialRefs} />
      </main>
    </>
  );
}
