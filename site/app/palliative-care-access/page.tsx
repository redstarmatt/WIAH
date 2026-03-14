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
  { num: 1, name: 'NHS England', dataset: 'Palliative and End of Life Care Statistics', url: 'https://www.england.nhs.uk/eolc/palliative-care-data/', date: '2024' },
  { num: 2, name: 'Marie Curie', dataset: 'Dying in the UK: State of the Nation Report', url: 'https://www.mariecurie.org.uk/globalassets/media/documents/policy/state-of-the-nation-reports/', date: '2023' },
  { num: 3, name: 'Hospice UK', dataset: 'Hospice Care in the UK', url: 'https://www.hospiceuk.org/our-campaigns/state-of-care', date: '2024' },
];

interface DataPoint {
  year: number;
  homeDeathRate: number;
  hospiceDeathRate: number;
  palliativeCareReferrals: number;
  unmetNeedRate: number;
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

export default function PalliativeCareAccessPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/palliative-care-access/palliative_care_access.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'homeDeathRate', label: 'Deaths at home (%)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.homeDeathRate })) },
        { id: 'hospiceDeathRate', label: 'Deaths in hospice (%)', colour: '#2A9D8F', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.hospiceDeathRate })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'palliativeCareReferrals', label: 'Specialist palliative care referrals (thousands/yr)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.palliativeCareReferrals })) },
        { id: 'unmetNeedRate', label: 'Estimated unmet palliative need (%)', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.unmetNeedRate })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: 'Covid-19: surge in home deaths' },
    { date: new Date(2022, 5, 1), label: 'NHS palliative care strategy published' },
  ];

  return (
    <>
      <TopicNav topic="Health" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Health"
          question="Who Can't Access Good Palliative Care?"
          finding={<>Around 100,000 people who need palliative care each year do not receive specialist support, with access strongly skewed by deprivation, ethnicity and diagnosis — cancer patients are far better served than those dying of organ failure or dementia.<Cite nums={1} /> Most people want to die at home, but half still die in hospital.<Cite nums={[2, 3]} /></>}
          colour="#E63946"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Around 600,000 people die in England each year, and an estimated 500,000 could benefit from palliative and end-of-life care. However, Marie Curie estimates that around 100,000 people who need specialist palliative care do not receive it.<Cite nums={2} /> Access is deeply unequal: people with cancer are approximately twice as likely to receive specialist palliative care as those dying from heart failure, chronic lung disease or dementia — conditions that account for the majority of deaths. Those from deprived areas, Black and minority ethnic communities, and those with learning disabilities are also significantly less likely to access specialist end-of-life support.</p>
            <p>The preferred place of death for most people is at home or in a care home, yet over 40% of deaths still occur in hospital — often because adequate community palliative support is unavailable out-of-hours or in rural areas.<Cite nums={1} /> The Covid-19 pandemic temporarily shifted the proportion of home deaths upward, as hospitals became overwhelmed and families took people home, but this change was not sustained. Hospice UK estimates that existing hospice services are under severe financial pressure, with NHS commissioning covering on average only around 30% of hospice costs — the remainder depending on charitable fundraising.<Cite nums={3} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-place-of-death', label: 'Place of death' },
          { id: 'sec-access', label: 'Access & unmet need' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="People not receiving needed palliative care" value="100" unit="thousand/yr" direction="flat" polarity="up-is-bad" changeText={<>Estimated unmet need, England<Cite nums={2} /></>} sparklineData={[110, 108, 107, 106, 105, 103, 102, 101, 101, 100, 100]} href="#sec-access" />
          <MetricCard label="Deaths occurring at home" value="30" unit="%" direction="up" polarity="up-is-good" changeText={<>Up from 22% in 2004<Cite nums={1} /></>} sparklineData={[22, 22, 23, 24, 25, 26, 30, 29, 29, 30, 30]} href="#sec-place-of-death" />
          <MetricCard label="Deaths occurring in hospital" value="42" unit="%" direction="down" polarity="down-is-good" changeText={<>Down from 55% in 2004<Cite nums={1} /></>} sparklineData={[55, 53, 52, 51, 50, 49, 43, 44, 43, 42, 42]} href="#sec-place-of-death" />
        </div>

        <ScrollReveal>
          <section id="sec-place-of-death" className="mb-12">
            <LineChart title="Place of death trends, 2004–2024" subtitle="Deaths at home (%) and in hospice (%) as share of all deaths, England." series={chart1Series} annotations={annotations} yLabel="%" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-access" className="mb-12">
            <LineChart title="Palliative care referrals and unmet need, 2015–2024" subtitle="Specialist palliative care referrals (thousands/yr) and estimated unmet need (%), England." series={chart2Series} annotations={[]} yLabel="Value" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="NICE guidance compliance" value="90%" unit="of deaths reviewed" description={<>NHS England's RESPECT programme (Recommended Summary Plan for Emergency Care and Treatment) now covers 90% of expected deaths, ensuring documented care preferences are recorded and followed — a significant improvement in care coordination at end of life.<Cite nums={1} /></>} source="Source: NHS England, RESPECT programme data, 2024." />
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
