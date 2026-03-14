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
  { num: 1, name: 'ONS', dataset: 'Disability and employment', url: 'https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/employmentandemployeetypes/articles/disabilityandemploymentuk/latest', date: '2024' },
  { num: 2, name: 'DWP', dataset: 'Family Resources Survey — disability', url: 'https://www.gov.uk/government/collections/family-resources-survey--2', date: '2024' },
  { num: 3, name: 'Scope', dataset: 'Disability Price Tag research', url: 'https://www.scope.org.uk/campaigns/extra-costs/disability-price-tag/', date: '2024' },
];

interface DataPoint {
  year: number;
  disabilityEmploymentGap: number;
  disabledEmploymentRate: number;
  nonDisabledEmploymentRate: number;
  disabledPayGap: number;
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

export default function DisabilityEmploymentGapPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/disability-employment-gap/disability_employment_gap.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'disabledEmploymentRate', label: 'Disabled employment rate (%)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.disabledEmploymentRate })) },
        { id: 'nonDisabledEmploymentRate', label: 'Non-disabled employment rate (%)', colour: '#2A9D8F', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.nonDisabledEmploymentRate })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'disabilityEmploymentGap', label: 'Employment gap (pp)', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.disabilityEmploymentGap })) },
        { id: 'disabledPayGap', label: 'Disability pay gap (%)', colour: '#6B7280', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.disabledPayGap })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2017, 5, 1), label: 'Thriving at Work review' },
    { date: new Date(2021, 5, 1), label: 'National Disability Strategy' },
  ];

  return (
    <>
      <TopicNav topic="Society & Economy" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Society & Economy"
          question="How Large Is the Disability Employment Gap?"
          finding={<>The disability employment gap — the difference in employment rates between disabled and non-disabled people — stands at around 29 percentage points.<Cite nums={1} /> Despite government targets to narrow it, progress has been slow: the gap has closed by only around 5 points since 2015, and the disability pay gap remains around 17%.<Cite nums={[2, 3]} /></>}
          colour="#6B7280"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Around 7.6 million working-age people in the UK are disabled under the Equality Act definition, and their employment rate (53%) is substantially below that of non-disabled people (82%). The government set a target in 2017 to get 1 million more disabled people into work by 2027, and progress has been made — around 700,000 more disabled people are in work today than in 2017. But the gap itself has barely narrowed, because non-disabled employment has also risen over the same period.<Cite nums={1} /></p>
            <p>The barriers are multiple: employer attitudes and lack of awareness of reasonable adjustments, inaccessible workplaces, health conditions that fluctuate unpredictably, and the interaction between working and means-tested benefit entitlements (the &quot;benefits trap&quot; that means some disabled people are financially better off not working). Scope&apos;s research on the &quot;disability price tag&quot; shows that disabled households face on average £975 per month in extra costs — meaning that simply having a job is not enough to close the financial gap with non-disabled peers.<Cite nums={[2, 3]} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-chart1', label: 'Employment rates' },
          { id: 'sec-chart2', label: 'The gap' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="Disabled employment rate" value="53" unit="%" direction="up" polarity="up-is-good" changeText={<>Up from 44% in 2013<Cite nums={1} /></>} sparklineData={[44, 46, 47, 48, 49, 50, 51, 52, 52.5, 53, 53]} href="#sec-chart1" />
          <MetricCard label="Employment gap" value="29" unit="pp" direction="down" polarity="up-is-bad" changeText={<>Was 34pp in 2013; progress slow<Cite nums={1} /></>} sparklineData={[34, 33, 33, 32, 31, 31, 30, 30, 29.5, 29, 29]} href="#sec-chart2" />
          <MetricCard label="Disability pay gap" value="17" unit="%" direction="flat" polarity="up-is-bad" changeText={<>Disabled workers earn 17% less<Cite nums={3} /></>} sparklineData={[19, 19, 18, 18, 17, 17, 17, 17, 17, 17, 17]} href="#sec-chart2" />
        </div>

        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart title="Employment rates: disabled vs non-disabled, 2013–2024" subtitle="Employment rate for disabled and non-disabled working-age people (%)" series={chart1Series} annotations={annotations} yLabel="%" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart title="Disability employment gap and pay gap, 2013–2024" subtitle="Employment gap (percentage points) and disability pay gap (%)" series={chart2Series} annotations={[]} yLabel="Pp / %" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="Access to Work" value="42k" unit="people supported" description={<>The Access to Work programme — which funds workplace adaptations and support workers for disabled employees — supported 42,000 people in 2023–24, a record, though the waiting list has grown substantially.<Cite nums={2} /></>} source="Source: DWP, Access to Work statistics." />
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
