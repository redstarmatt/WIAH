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
  { num: 1, name: 'Ministry of Justice', dataset: 'HMCTS Reform Programme evaluation', url: 'https://www.gov.uk/government/collections/hmcts-reform-programme-evaluation', date: '2024' },
  { num: 2, name: 'National Audit Office', dataset: 'HMCTS Reform Programme', url: 'https://www.nao.org.uk/reports/hmcts-reform-programme/', date: '2023' },
  { num: 3, name: 'Legal Services Board', dataset: 'Online courts user research', url: 'https://legalservicesboard.org.uk/', date: '2024' },
];

interface DataPoint {
  year: number;
  onlineCasesCompleted: number;
  digitalServiceUserSatisfaction: number;
  courtClosures: number;
  reformBudgetSpent: number;
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

export default function CourtDigitisationProgressPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/court-digitisation-progress/court_digitisation_progress.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'onlineCasesCompleted', label: 'Online cases completed (thousands)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.onlineCasesCompleted })) },
        { id: 'digitalServiceUserSatisfaction', label: 'User satisfaction (%)', colour: '#2A9D8F', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.digitalServiceUserSatisfaction })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'courtClosures', label: 'Courts closed (cumulative)', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.courtClosures })) },
        { id: 'reformBudgetSpent', label: 'Reform budget spent (£m)', colour: '#6B7280', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.reformBudgetSpent })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2016, 5, 1), label: 'HMCTS Reform Programme begins' },
    { date: new Date(2023, 5, 1), label: 'Reform Programme concludes' },
  ];

  return (
    <>
      <TopicNav topic="Justice & Digital" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Justice & Digital"
          question="Has Court Digitisation Improved Justice?"
          finding={<>The £1 billion HMCTS Reform Programme has digitised many court processes, with over 600,000 cases now handled online annually — but it was delivered late, over budget, and was accompanied by the closure of over 250 court buildings.<Cite nums={1} /> Access to justice concerns remain unresolved for those without digital skills or internet access.<Cite nums={[2, 3]} /></>}
          colour="#6B7280"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The HMCTS Reform Programme was launched in 2016 with a projected budget of £1.2 billion and a promise to bring the English and Welsh courts system into the digital age. It created online portals for civil money claims, probate applications, immigration appeals, and employment tribunals — processes that were previously entirely paper-based. The National Audit Office found that despite significant overruns and delays, some services were delivering measurable improvements in processing times and user experience.<Cite nums={1} /></p>
            <p>The reform was, however, explicitly funded partly through savings on the court estate. More than 250 magistrates&apos; courts and county courts have closed since 2010, reducing the number of physical locations where justice is administered. Critics argue this has made physical attendance harder for those in rural areas, the elderly, and people without reliable internet access.<Cite nums={[2, 3]} /> Research by the Legal Services Board found that around 10% of court users reported difficulty using the new digital services, with older users and those from lower socio-economic backgrounds most affected.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-chart1', label: 'Digital services' },
          { id: 'sec-chart2', label: 'Court estate' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="Online cases completed" value="620k" unit="" direction="up" polarity="up-is-good" changeText={<>From near zero in 2017<Cite nums={1} /></>} sparklineData={[0, 50, 120, 200, 320, 420, 500, 570, 600, 615, 620]} href="#sec-chart1" />
          <MetricCard label="User satisfaction" value="73" unit="%" direction="flat" polarity="up-is-good" changeText={<>Below GDS 75% benchmark<Cite nums={2} /></>} sparklineData={[60, 65, 68, 70, 72, 73, 74, 73, 73, 73, 73]} href="#sec-chart1" />
          <MetricCard label="Courts closed since 2010" value="258" unit="" direction="up" polarity="up-is-bad" changeText={<>More than a third of the original estate<Cite nums={2} /></>} sparklineData={[50, 90, 130, 160, 190, 210, 230, 245, 252, 256, 258]} href="#sec-chart2" />
        </div>

        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart title="Online court cases and user satisfaction, 2017–2024" subtitle="Cases completed via digital services (thousands) and user satisfaction (%)" series={chart1Series} annotations={annotations} yLabel="Thousands / %" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart title="Court closures and reform budget, 2016–2024" subtitle="Cumulative court closures and HMCTS Reform Programme spend (£m)" series={chart2Series} annotations={[]} yLabel="Count / £m" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="Online civil claims" value="68%" unit="user satisfaction" description={<>The online civil money claims service — the first major digitised court process — achieves 68% user satisfaction, with claimants resolving disputes in an average of 40 days versus 100+ for paper-based claims.<Cite nums={1} /></>} source="Source: HMCTS, Reform Programme evaluation." />
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
