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
  { num: 1, name: 'Cabinet Office', dataset: 'Civil Service Statistics', url: 'https://www.gov.uk/government/collections/civil-service-statistics', date: '2024' },
  { num: 2, name: 'Cabinet Office', dataset: 'Diversity and Inclusion in the Civil Service', url: 'https://www.gov.uk/government/publications/diversity-and-inclusion-in-the-civil-service', date: '2024' },
  { num: 3, name: 'Social Mobility Commission', dataset: 'State of the Nation', url: 'https://socialmobilityworks.org/toolkit/measurement/social-mobility-commission-data/', date: '2024' },
];

interface DataPoint {
  year: number;
  ethnicMinorityShare: number;
  femaleInSCS: number;
  disabledStaffShare: number;
  workingClassBackground: number;
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

export default function CivilServiceDiversityPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/civil-service-diversity/civil_service_diversity.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'ethnicMinorityShare', label: 'Ethnic minority staff (%)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.ethnicMinorityShare })) },
        { id: 'femaleInSCS', label: 'Women in Senior Civil Service (%)', colour: '#2A9D8F', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.femaleInSCS })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'disabledStaffShare', label: 'Disabled staff (%)', colour: '#F4A261', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.disabledStaffShare })) },
        { id: 'workingClassBackground', label: 'Working-class background (%)', colour: '#6B7280', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.workingClassBackground })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2017, 5, 1), label: 'Diversity & Inclusion Strategy launched' },
    { date: new Date(2022, 5, 1), label: 'Declaration on Government Reform' },
  ];

  return (
    <>
      <TopicNav topic="Public Services" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Public Services"
          question="Is the Civil Service Becoming More Diverse?"
          finding={<>The civil service has become more ethnically diverse and more gender-balanced in senior roles, but social mobility — the share of staff from working-class backgrounds — has barely shifted.<Cite nums={1} /> Around 14% of civil servants are from ethnic minority backgrounds, compared to 13% in 2019, while only 23% of the Senior Civil Service report working-class origins.<Cite nums={[2, 3]} /></>}
          colour="#6B7280"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The civil service has set itself ambitious diversity targets, and progress on some dimensions is visible. Women now make up 47% of the Senior Civil Service — up from 38% in 2010 — and the share of ethnic minority staff has risen gradually. Disability disclosure rates have also increased, partly reflecting changing attitudes and partly the introduction of anonymous HR data collection. The government has embedded diversity reporting requirements into departmental business plans and the Cabinet Office publishes detailed annual data.<Cite nums={1} /></p>
            <p>But social class remains the diversity variable that moves least. The Social Mobility Commission consistently finds that the civil service — especially its most senior grades — draws disproportionately from private schools and a narrow range of universities. People from professional backgrounds are over-represented at the top; those from routine or manual occupational backgrounds are under-represented. The class pay gap in the civil service is estimated at around 7%.<Cite nums={[2, 3]} /> Understanding whether diversity initiatives genuinely shift life chances or merely rearrange representation at the top requires tracking all dimensions over time.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-chart1', label: 'Ethnicity and gender' },
          { id: 'sec-chart2', label: 'Disability and class' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="Ethnic minority staff" value="14" unit="%" direction="up" polarity="up-is-good" changeText={<>Up from 10% in 2013<Cite nums={1} /></>} sparklineData={[10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 13.8, 14, 14]} href="#sec-chart1" />
          <MetricCard label="Women in SCS" value="47" unit="%" direction="up" polarity="up-is-good" changeText={<>Up from 38% in 2010<Cite nums={1} /></>} sparklineData={[38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 47]} href="#sec-chart1" />
          <MetricCard label="Working-class background (SCS)" value="23" unit="%" direction="flat" polarity="up-is-good" changeText={<>Vs 39% in the wider workforce<Cite nums={3} /></>} sparklineData={[22, 22, 22, 23, 23, 23, 23, 23, 23, 23, 23]} href="#sec-chart2" />
        </div>

        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart title="Civil service ethnicity and gender diversity, 2013–2024" subtitle="Ethnic minority share of all staff and women in the Senior Civil Service (%)" series={chart1Series} annotations={annotations} yLabel="%" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart title="Disability disclosure and social class, 2013–2024" subtitle="Disabled staff and working-class background staff as share of civil service (%)" series={chart2Series} annotations={[]} yLabel="%" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="Fast Stream diversity" value="19%" unit="BAME entrants" description={<>19% of Fast Stream entrants in 2023 were from Black, Asian or minority ethnic backgrounds — broadly in line with the working-age population — though Oxbridge still accounts for a disproportionate share of successful applicants.<Cite nums={2} /></>} source="Source: Cabinet Office, Fast Stream Annual Report." />
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
