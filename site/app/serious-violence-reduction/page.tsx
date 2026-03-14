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
  { num: 1, name: 'Home Office', dataset: 'Violence Reduction Units Evaluation', url: 'https://www.gov.uk/government/publications/violence-reduction-units-vrus-annual-report', date: '2024' },
  { num: 2, name: 'ONS', dataset: 'Homicide in England and Wales', url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/crimeandjustice/articles/homicideinenglandandwales/latestrelease', date: '2024' },
  { num: 3, name: 'NHS England', dataset: 'Hospital admissions for assault with a sharp object', url: 'https://www.england.nhs.uk/statistics/statistical-work-areas/hospital-admitted-patient-care-activity/', date: '2024' },
];

interface DataPoint {
  year: number;
  knifeOffences: number;
  homicides: number;
  hospitalAdmissionsKnife: number;
  vruInterventions: number;
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

export default function SeriousViolenceReductionPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/serious-violence-reduction/serious_violence_reduction.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'knifeOffences', label: 'Knife offences', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.knifeOffences })) },
        { id: 'homicides', label: 'Homicides', colour: '#F4A261', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.homicides })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'hospitalAdmissionsKnife', label: 'Hospital admissions (knife)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.hospitalAdmissionsKnife })) },
        { id: 'vruInterventions', label: 'VRU young people reached', colour: '#2A9D8F', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.vruInterventions })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2019, 5, 1), label: 'Violence Reduction Units launched' },
    { date: new Date(2023, 5, 1), label: 'Serious Violence Duty comes into force' },
  ];

  return (
    <>
      <TopicNav topic="Justice" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Justice"
          question="Is the Violence Reduction Unit Model Working?"
          finding={<>Knife crime remains at historically high levels with over 50,000 offences recorded in 2023, but Violence Reduction Units have shown promising results in areas where they operate, reaching over 100,000 young people with diversionary activity.<Cite nums={1} /> Hospital admissions for knife assault have begun to plateau.<Cite nums={[2, 3]} /></>}
          colour="#6B7280"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Violence Reduction Units, modelled on the Scottish Violence Reduction Unit which helped transform Glasgow from one of Europe&apos;s most violent cities, were introduced to England and Wales in 2019. The public health approach they embody treats violence as a preventable disease, investing in early intervention, youth services, and community outreach rather than relying solely on enforcement. Initial evaluations have been cautiously positive: areas with mature VRUs have seen some reduction in youth violence, though causal attribution is complex.<Cite nums={1} /></p>
            <p>The Serious Violence Duty, which came into force in 2023 under the Police, Crime, Sentencing and Courts Act, places a legal requirement on a wide range of bodies — police, local authorities, NHS trusts, probation, youth offending teams — to collaborate on preventing serious violence. Whether this duty translates into meaningful coordinated action, or becomes a compliance exercise, remains to be seen.<Cite nums={[2, 3]} /> Knife crime conviction rates have not risen in proportion to offences recorded, suggesting the criminal justice route alone is insufficient.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-chart1', label: 'Violence trends' },
          { id: 'sec-chart2', label: 'Interventions' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="Knife offences (2023)" value="50,500" unit="" direction="up" polarity="up-is-bad" changeText={<>Near record high; up 80% since 2014<Cite nums={1} /></>} sparklineData={[28000, 32000, 36000, 40000, 44000, 48000, 49000, 50000, 50200, 50300, 50500]} href="#sec-chart1" />
          <MetricCard label="Homicides" value="617" unit="" direction="flat" polarity="up-is-bad" changeText={<>Relatively stable over 5 years<Cite nums={2} /></>} sparklineData={[570, 585, 600, 695, 580, 600, 610, 615, 617, 617, 617]} href="#sec-chart1" />
          <MetricCard label="Young people reached by VRUs" value="110k" unit="" direction="up" polarity="up-is-good" changeText={<>Up from 30k in first year<Cite nums={1} /></>} sparklineData={[0, 0, 0, 30000, 55000, 70000, 85000, 95000, 105000, 108000, 110000]} href="#sec-chart2" />
        </div>

        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart title="Knife crime and homicide, 2014–2023" subtitle="Knife offences recorded by police and homicides, England and Wales" series={chart1Series} annotations={annotations} yLabel="Offences" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart title="Hospital admissions and VRU reach, 2014–2023" subtitle="Hospital admissions for knife assault and young people reached by VRU programmes" series={chart2Series} annotations={[]} yLabel="Count" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="Scottish VRU model" value="–60%" unit="youth homicide" description={<>Scotland&apos;s Violence Reduction Unit, the model for the English VRUs, is associated with a roughly 60% reduction in youth homicide over 15 years — a result that has drawn international attention.<Cite nums={1} /></>} source="Source: Scottish Violence Reduction Unit, Annual Report." />
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
