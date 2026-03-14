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
  { num: 1, name: 'NHS England', dataset: 'Digital Investment and Technology Transformation', url: 'https://www.england.nhs.uk/digitaltechnology/', date: '2024' },
  { num: 2, name: 'National Audit Office', dataset: 'NHS Digital transformation', url: 'https://www.nao.org.uk/reports/digital-transformation-in-the-nhs/', date: '2024' },
  { num: 3, name: 'The Health Foundation', dataset: 'Digital health technology — investment and outcomes', url: 'https://www.health.org.uk/news-and-comment/charts-and-infographics/nhs-digital-investment', date: '2024' },
];

interface DataPoint {
  year: number;
  nhsDigitalSpend: number;
  ehr_coverage: number;
  digitalWaiting: number;
  paperRecordsStillInUse: number;
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

export default function NhsDigitalInvestmentPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/nhs-digital-investment/nhs_digital_investment.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'nhsDigitalSpend', label: 'NHS digital spend (£bn)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.nhsDigitalSpend })) },
        { id: 'ehr_coverage', label: 'Trusts with electronic patient records (%)', colour: '#2A9D8F', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.ehr_coverage })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'paperRecordsStillInUse', label: 'Trusts still using paper records (%)', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.paperRecordsStillInUse })) },
        { id: 'digitalWaiting', label: 'Outpatients using digital booking (%)', colour: '#6B7280', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.digitalWaiting })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2017, 5, 1), label: 'WannaCry ransomware attack on NHS' },
    { date: new Date(2023, 5, 1), label: 'Wachter Review recommendations' },
  ];

  return (
    <>
      <TopicNav topic="Health & Digital" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Health & Digital"
          question="Is NHS Digital Transformation Actually Happening?"
          finding={<>NHS digital investment has risen to over £3 billion annually, and electronic patient record coverage has expanded significantly — but around 20% of trusts still rely heavily on paper records, and the WannaCry ransomware attack revealed systemic vulnerabilities that have not been fully addressed.<Cite nums={1} /> Digital maturity across the NHS remains highly uneven.<Cite nums={[2, 3]} /></>}
          colour="#E63946"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>NHS digital transformation has been a priority — and a persistent challenge — for two decades. The National Programme for IT, launched in 2003 and abandoned in 2011 after spending £10 billion, cast a long shadow over subsequent reform efforts. Since then, a more incremental approach has taken hold: investing in Electronic Patient Record (EPR) systems, connecting disparate datasets through NHS Federated Data Platform, expanding NHS App functionality, and building interoperability standards. Digital maturity assessments show significant progress in some areas — most acute trusts now have clinical systems in use — but also persistent gaps.<Cite nums={1} /></p>
            <p>The 2017 WannaCry ransomware attack, which infected NHS systems in 80 organisations and forced appointment cancellations and ambulance diversions, exposed the consequence of running outdated operating systems on networked clinical equipment. Despite subsequent investment in cybersecurity, the NHS remains vulnerable: the 2023 Synnovis ransomware attack disrupted blood transfusion services across London for months. The Wachter Review&apos;s 2023 recommendations called for a systematic programme to complete EPR deployment and build AI-ready data infrastructure.<Cite nums={[2, 3]} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-chart1', label: 'Investment and coverage' },
          { id: 'sec-chart2', label: 'Digital adoption' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="NHS digital spend" value="£3.2bn" unit="/yr" direction="up" polarity="up-is-good" changeText={<>Up from £1.8bn in 2015<Cite nums={1} /></>} sparklineData={[1.8, 1.9, 2.0, 2.1, 2.2, 2.4, 2.6, 2.8, 3.0, 3.1, 3.2]} href="#sec-chart1" />
          <MetricCard label="Trusts with full EPR" value="80" unit="%" direction="up" polarity="up-is-good" changeText={<>Up from 45% in 2016<Cite nums={2} /></>} sparklineData={[45, 50, 55, 60, 64, 68, 72, 76, 78, 79, 80]} href="#sec-chart1" />
          <MetricCard label="Still using paper records" value="20" unit="%" direction="down" polarity="up-is-bad" changeText={<>Concentrated in community and mental health<Cite nums={3} /></>} sparklineData={[55, 50, 45, 40, 36, 32, 28, 24, 22, 21, 20]} href="#sec-chart2" />
        </div>

        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart title="NHS digital spending and EPR coverage, 2015–2024" subtitle="Annual NHS digital spend (£bn) and trusts with electronic patient records (%)" series={chart1Series} annotations={annotations} yLabel="£bn / %" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart title="Paper records and digital booking, 2015–2024" subtitle="Trusts still primarily using paper records (%) and outpatients booking digitally (%)" series={chart2Series} annotations={[]} yLabel="%" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="NHS App" value="34m" unit="registered users" description={<>The NHS App had 34 million registered users by early 2024, with over 500 million GP appointment bookings, repeat prescriptions, and health record accesses completed through the platform since launch.<Cite nums={1} /></>} source="Source: NHS England, NHS App statistics." />
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
