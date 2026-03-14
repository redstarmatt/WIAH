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
  { num: 1, name: 'Carers UK', dataset: 'State of Caring Survey', url: 'https://www.carersuk.org/reports/state-of-caring/', date: '2024' },
  { num: 2, name: 'ONS', dataset: 'Unpaid Care and Employment in the UK', url: 'https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/employmentandemployeetypes/articles/unpaidcareandemploymentintheuk/2024', date: '2024' },
  { num: 3, name: 'Carers UK', dataset: 'Employers for Carers — Workforce Impact', url: 'https://www.carersuk.org/policy-and-research/key-facts-and-figures/', date: '2023' },
];

interface DataPoint {
  year: number;
  carersCeasedWork: number;
  carersReducedHours: number;
  economicInactivity: number;
  unpaidCareValue: number;
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

export default function CarerEmploymentGapPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/carer-employment-gap/carer_employment_gap.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'carersCeasedWork', label: 'Carers who gave up work to care (thousands/yr)', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.carersCeasedWork })) },
        { id: 'carersReducedHours', label: 'Carers who reduced hours to care (thousands/yr)', colour: '#F4A261', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.carersReducedHours })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'economicInactivity', label: 'Economically inactive due to caring (thousands)', colour: '#6B7280', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.economicInactivity })) },
        { id: 'unpaidCareValue', label: 'Estimated value of unpaid care (£bn/yr)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.unpaidCareValue })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: 'Covid-19: caring responsibilities intensify' },
    { date: new Date(2024, 5, 1), label: "Carer's Leave Act 2023 enacted" },
  ];

  return (
    <>
      <TopicNav topic="Society & Economy" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Society & Economy"
          question="How Many Carers Have Left Employment?"
          finding={<>Around 600 people a day give up paid work to care for a family member, adding to the 2.6 million people already economically inactive primarily because of caring responsibilities — a group disproportionately composed of women in their 40s and 50s.<Cite nums={1} /> Unpaid carers provide care worth an estimated £162bn annually — more than the entire NHS budget.<Cite nums={[2, 3]} /></>}
          colour="#6B7280"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The UK has around 10.6 million unpaid carers — people providing care for family members or friends without payment — making caring one of the most widespread social roles in the country. Carers UK's annual State of Caring survey consistently documents the financial toll: around 600 people a day give up work entirely to take on caring responsibilities, and a further large number reduce their hours below what they would prefer.<Cite nums={1} /> The employment gap is heavily gendered: women are significantly more likely to reduce or give up work to care, contributing to the gender pension gap and lifetime earnings disparity.</p>
            <p>ONS analysis of Labour Force Survey data finds approximately 2.6 million people are economically inactive primarily because of caring responsibilities — a population that represents an enormous underutilised labour market pool.<Cite nums={2} /> The Care Act 2014 gave carers rights to assessment and support, but local authority resources to implement these rights have been constrained. The Carer's Leave Act 2023, which came into effect in 2024, gave employed carers the right to one week of unpaid leave per year — welcomed as recognition of carers' needs but criticised by Carers UK as insufficient given the scale of the problem. Unpaid carers effectively subsidise the social care system: the economic value of unpaid care is estimated at £162bn annually.<Cite nums={3} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-employment', label: 'Employment impact' },
          { id: 'sec-value', label: 'Economic value' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="People leaving work to care (per day)" value="600" unit="" direction="flat" polarity="up-is-bad" changeText={<>Consistent estimate across years<Cite nums={1} /></>} sparklineData={[580, 585, 590, 595, 600, 610, 615, 610, 605, 602, 600]} href="#sec-employment" />
          <MetricCard label="Economically inactive due to caring" value="2.6" unit="million" direction="up" polarity="up-is-bad" changeText={<>Up as population ages<Cite nums={2} /></>} sparklineData={[2.2, 2.25, 2.3, 2.35, 2.4, 2.45, 2.5, 2.52, 2.55, 2.57, 2.6]} href="#sec-employment" />
          <MetricCard label="Estimated value of unpaid care" value="162" unit="£bn/yr" direction="up" polarity="up-is-good" changeText={<>More than total NHS budget<Cite nums={3} /></>} sparklineData={[119, 124, 128, 133, 138, 144, 149, 153, 157, 160, 162]} href="#sec-value" />
        </div>

        <ScrollReveal>
          <section id="sec-employment" className="mb-12">
            <LineChart title="Employment impact of caring responsibilities, 2015–2024" subtitle="Annual carers leaving work and reducing hours (thousands), UK." series={chart1Series} annotations={annotations} yLabel="Thousands" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-value" className="mb-12">
            <LineChart title="Economic inactivity and value of unpaid care, 2015–2024" subtitle="People economically inactive due to caring (thousands) and annual value of unpaid care (£bn), UK." series={chart2Series} annotations={[]} yLabel="Value" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="Carer's Leave Act 2023" value="1 week" unit="unpaid leave entitlement" description={<>The Carer's Leave Act 2023 gave 2.3 million employed carers the legal right to one week of unpaid leave per year from their employer for the first time — a landmark recognition of carers' needs in employment law, though Carers UK has called for the leave to be paid.<Cite nums={1} /></>} source="Source: Carers UK, Carer's Leave Act factsheet, 2024." />
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
