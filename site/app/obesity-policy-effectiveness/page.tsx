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
  { num: 1, name: 'NHS Digital', dataset: 'Health Survey for England — Obesity', url: 'https://digital.nhs.uk/data-and-information/publications/statistical/health-survey-for-england', date: '2024' },
  { num: 2, name: 'PHE/UKHSA', dataset: 'National Child Measurement Programme', url: 'https://www.gov.uk/government/collections/national-child-measurement-programme', date: '2024' },
  { num: 3, name: 'NHS England', dataset: 'Tier 3 and 4 Weight Management Services', url: 'https://www.england.nhs.uk/supporting-our-nhs-people/health-and-wellbeing-programmes/weight-management/', date: '2023' },
];

interface DataPoint {
  year: number;
  adultObesityRate: number;
  childObesityRate: number;
  sugarTaxRevenue: number;
  tier3Referrals: number;
}

interface TopicData {
  national: { timeSeries: DataPoint[] };
  metadata: {
    sources: { name: string; dataset: string; url: string; frequency: string }[];
    methodology: string;
    knownIssues: string[];
  };
}

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

export default function ObesityPolicyEffectivenessPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/obesity-policy-effectiveness/obesity_policy_effectiveness.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'adultObesityRate', label: 'Adult obesity rate (%)', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.adultObesityRate })) },
        { id: 'childObesityRate', label: 'Year 6 obesity rate (%)', colour: '#F4A261', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.childObesityRate })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'sugarTaxRevenue', label: 'Soft drinks industry levy revenue (£m/yr)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.sugarTaxRevenue })) },
        { id: 'tier3Referrals', label: 'NHS Tier 3 weight management referrals (thousands)', colour: '#6B7280', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.tier3Referrals })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2018, 5, 1), label: 'Sugar levy introduced' },
    { date: new Date(2020, 5, 1), label: "Government's obesity strategy published" },
  ];

  return (
    <>
      <TopicNav topic="Health" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Health"
          question="Is Obesity Policy Working?"
          finding={<>Adult obesity rates in England have remained broadly flat at around 26% since 2019, suggesting current policy is failing to reverse an epidemic that costs the NHS an estimated £6bn annually.<Cite nums={1} /> Child obesity has risen, with Year 6 obesity rates reaching 23.4% in 2023 — the highest on record.<Cite nums={[2, 3]} /></>}
          colour="#E63946"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>England has one of the highest obesity rates in western Europe. Around 26% of adults are classified as obese and a further 38% are overweight, with rates higher in areas of deprivation and among certain ethnic groups.<Cite nums={1} /> The government has pursued a range of policy responses including the Soft Drinks Industry Levy (the 'sugar tax') introduced in 2018, mandatory calorie labelling for large food businesses, restrictions on HFSS food advertising before 9pm, and NHS weight management referral pathways. The sugar levy has raised over £300m per year and prompted reformulation by drinks manufacturers — but population-level obesity rates have not declined.</p>
            <p>Child obesity data from the National Child Measurement Programme tells a particularly concerning story: the proportion of Year 6 children classified as obese reached 23.4% in 2022–23, up from 20% in 2019.<Cite nums={2} /> The data show stark deprivation gradients — children in the most deprived areas are more than twice as likely to be obese as those in the least deprived. NHS England's clinical weight management services face overwhelming demand: referrals to Tier 3 specialist services have doubled since 2020, partly driven by new GLP-1 receptor agonist medications (such as Ozempic and Wegovy) which are effective but expensive and in short supply.<Cite nums={3} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-trends', label: 'Obesity trends' },
          { id: 'sec-policy', label: 'Policy interventions' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="Adult obesity rate" value="26" unit="%" direction="flat" polarity="up-is-bad" changeText={<>Unchanged since 2019, up from 15% in 1993<Cite nums={1} /></>} sparklineData={[22, 23, 24, 25, 25, 26, 26, 26, 26, 26, 26]} href="#sec-trends" />
          <MetricCard label="Year 6 child obesity rate" value="23.4" unit="%" direction="up" polarity="up-is-bad" changeText={<>Up from 20% in 2019 — record high<Cite nums={2} /></>} sparklineData={[19, 19.5, 20, 21, 23, 22, 22.5, 23, 23.2, 23.3, 23.4]} href="#sec-trends" />
          <MetricCard label="NHS cost of obesity" value="6" unit="£bn/yr" direction="up" polarity="up-is-bad" changeText={<>Projected to reach £9.7bn by 2050<Cite nums={1} /></>} sparklineData={[4.2, 4.5, 4.8, 5.0, 5.3, 5.5, 5.7, 5.8, 5.9, 6.0, 6.0]} href="#sec-policy" />
        </div>

        <ScrollReveal>
          <section id="sec-trends" className="mb-12">
            <LineChart title="Adult and child obesity rates, 2010–2024" subtitle="Adult obesity prevalence (%) and Year 6 child obesity rate (%), England." series={chart1Series} annotations={annotations} yLabel="%" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-policy" className="mb-12">
            <LineChart title="Sugar levy revenue and NHS weight management referrals, 2018–2024" subtitle="Annual soft drinks levy revenue (£m) and Tier 3 NHS weight management referrals (thousands), England." series={chart2Series} annotations={[]} yLabel="Value" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="Sugar levy impact" value="45%" unit="reformulation" description={<>Around 45% of soft drink products were reformulated to reduce sugar content before the Soft Drinks Industry Levy came into force in 2018, one of the most successful pre-emptive reformulation effects ever recorded for a food tax.<Cite nums={1} /></>} source="Source: HMRC, Soft Drinks Industry Levy statistics, 2024." />
        </ScrollReveal>

        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            {data?.metadata.sources.map((src, i) => (
              <div key={i}>
                <a href={src.url} target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">{src.name} — {src.dataset}</a>
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
              {data?.metadata.knownIssues.map((issue, i) => <li key={i}>{issue}</li>)}
            </ul>
          </div>
        </section>
        <References items={editorialRefs} />
      </main>
    </>
  );
}
