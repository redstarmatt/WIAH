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
  { num: 1, name: 'Refugee Council', dataset: 'State of the Nation: Refugees and Asylum Seekers in the UK', url: 'https://www.refugeecouncil.org.uk/information/refugee-asylum-facts/', date: '2024' },
  { num: 2, name: 'Kings Fund', dataset: 'Improving NHS Services for Refugees and Asylum Seekers', url: 'https://www.kingsfund.org.uk/publications/improving-nhs-services-refugees-asylum-seekers', date: '2023' },
  { num: 3, name: 'PHE', dataset: 'Migrant Health Guide — NHS Access', url: 'https://www.gov.uk/guidance/nhs-entitlements-migrant-health-guide', date: '2024' },
];

interface DataPoint {
  year: number;
  asylumSeekersInUK: number;
  gpRegistrationRate: number;
  mentalHealthUnmetNeed: number;
  waitTimeToGPDays: number;
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

export default function RefugeeHealthAccessPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/refugee-health-access/refugee_health_access.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'asylumSeekersInUK', label: 'Asylum seekers in UK (thousands)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.asylumSeekersInUK })) },
        { id: 'gpRegistrationRate', label: 'GP registration rate for asylum seekers (%)', colour: '#2A9D8F', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.gpRegistrationRate })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'mentalHealthUnmetNeed', label: 'Estimated mental health unmet need (%)', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.mentalHealthUnmetNeed })) },
        { id: 'waitTimeToGPDays', label: 'Average days to GP registration (asylum seeker)', colour: '#F4A261', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.waitTimeToGPDays })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2022, 5, 1), label: 'Channel crossings reach record levels' },
    { date: new Date(2023, 5, 1), label: 'Illegal Migration Act enacted' },
  ];

  return (
    <>
      <TopicNav topic="Health & Society" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Health & Society"
          question="Can Refugees Actually Access NHS Care?"
          finding={<>Asylum seekers are legally entitled to full NHS care on the same terms as UK residents, yet many face significant practical barriers including difficulty registering with a GP, language barriers, and lack of awareness of rights — particularly those housed in hotels or dispersal accommodation.<Cite nums={1} /> Mental health needs are especially acute and consistently unmet.<Cite nums={[2, 3]} /></>}
          colour="#E63946"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Asylum seekers in the UK are legally entitled to free NHS care on the same basis as UK residents while their claims are being processed. However, Refugee Council and Kings Fund research consistently documents substantial gaps between legal entitlement and actual access.<Cite nums={1} /> People housed in hotels or large accommodation centres — which proliferated from 2021 as the asylum backlog grew — often have limited local knowledge and support to register with a GP. Practices in areas with high concentrations of asylum seekers face capacity pressures. Language barriers, fear of data sharing with immigration authorities (unfounded in most cases but widely believed), and complex eligibility rules for more recently arrived groups all impede access.</p>
            <p>Mental health needs are particularly severe in the asylum-seeking population: rates of PTSD, depression and anxiety are estimated at 50–70% among those fleeing conflict or persecution.<Cite nums={2} /> Yet specialist trauma-informed mental health services are available to only a small fraction of those who need them. The Kings Fund found that GP registration rates among asylum seekers ranged from around 60% in areas with established integration services to under 30% in areas with poor support. Refused asylum seekers and those in limbo on legal proceedings face additional uncertainty about their NHS entitlements.<Cite nums={3} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-registration', label: 'GP registration' },
          { id: 'sec-mental-health', label: 'Mental health need' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="Asylum seekers in UK" value="110" unit="thousand" direction="up" polarity="up-is-bad" changeText={<>Awaiting initial decision, 2024<Cite nums={1} /></>} sparklineData={[40, 45, 50, 55, 60, 65, 75, 85, 95, 105, 110]} href="#sec-registration" />
          <MetricCard label="GP registration rate (asylum seekers)" value="65" unit="%" direction="flat" polarity="up-is-good" changeText={<>Below 30% in poorly supported areas<Cite nums={2} /></>} sparklineData={[55, 56, 58, 60, 61, 62, 63, 64, 65, 65, 65]} href="#sec-registration" />
          <MetricCard label="Mental health unmet need estimate" value="60" unit="%" direction="flat" polarity="up-is-bad" changeText={<>50–70% with PTSD/depression/anxiety<Cite nums={2} /></>} sparklineData={[62, 62, 61, 61, 60, 61, 61, 60, 60, 60, 60]} href="#sec-mental-health" />
        </div>

        <ScrollReveal>
          <section id="sec-registration" className="mb-12">
            <LineChart title="Asylum seekers in UK and GP registration rates, 2015–2024" subtitle="Asylum seekers awaiting decision (thousands) and estimated GP registration rate (%), England." series={chart1Series} annotations={annotations} yLabel="Value" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-mental-health" className="mb-12">
            <LineChart title="Mental health unmet need and access barriers, 2015–2024" subtitle="Estimated mental health unmet need (%) and average days to GP registration for asylum seekers, England." series={chart2Series} annotations={[]} yLabel="Value" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="Doctors of the World" value="25,000+" unit="consultations" description={<>Doctors of the World UK provides over 25,000 healthcare consultations annually to excluded migrants and asylum seekers across its clinics, demonstrating the scale of unmet need that falls outside NHS reach.<Cite nums={1} /></>} source="Source: Doctors of the World UK, Annual Review, 2023." />
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
