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
  { num: 1, name: 'NHS Digital', dataset: 'NHS Workforce Statistics — Country of Training', url: 'https://digital.nhs.uk/data-and-information/publications/statistical/nhs-workforce-statistics', date: '2024' },
  { num: 2, name: 'Nuffield Trust', dataset: 'International NHS Staff and NHS Workforce', url: 'https://www.nuffieldtrust.org.uk/research/nhs-international-workforce', date: '2023' },
  { num: 3, name: 'GMC', dataset: 'The State of Medical Education and Practice in the UK', url: 'https://www.gmc-uk.org/about/what-we-do-and-why/data-and-research/the-state-of-medical-education-and-practice-in-the-uk', date: '2024' },
];

interface DataPoint {
  year: number;
  overseasNurses: number;
  overseasDoctors: number;
  imtRecruits: number;
  domesticTraineeGrowth: number;
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

export default function NHSOverseasRecruitmentPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/nhs-overseas-recruitment/nhs_overseas_recruitment.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'overseasNurses', label: 'New nurse joiners trained abroad (thousands/yr)', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.overseasNurses })) },
        { id: 'overseasDoctors', label: 'Overseas-trained doctors joining GMC register (thousands/yr)', colour: '#F4A261', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.overseasDoctors })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'imtRecruits', label: 'International medical graduates in training (thousands)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.imtRecruits })) },
        { id: 'domesticTraineeGrowth', label: 'UK-trained medical students (indexed, 2015=100)', colour: '#6B7280', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.domesticTraineeGrowth })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: 'Brexit: EU recruitment falls sharply' },
    { date: new Date(2022, 5, 1), label: 'International nurse recruitment surge' },
  ];

  return (
    <>
      <TopicNav topic="Health" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Health"
          question="How Much Does the NHS Rely on Overseas Staff?"
          finding={<>Over 40% of NHS doctors and nearly a third of nurses were trained abroad, with international recruitment running at record levels since Brexit reduced EU supply and domestic training failed to keep pace with workforce growth needs.<Cite nums={1} /> Critics raise ethical concerns about recruiting from countries with their own health workforce shortages.<Cite nums={[2, 3]} /></>}
          colour="#E63946"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>International recruitment has become structurally embedded in NHS workforce planning. As of 2024, over 40% of doctors registered with the GMC were trained outside the UK, with the largest source countries being India, Pakistan, Nigeria, Egypt and the Philippines.<Cite nums={1} /> For nursing, the picture shifted dramatically after Brexit — EU nurse recruitment fell from around 10,000 per year to near zero after 2020, and the NHS rapidly scaled up recruitment from India and West Africa to fill the gap. In 2022–23 alone, over 40,000 internationally trained nurses joined the NMC register.</p>
            <p>The Nuffield Trust has documented that the NHS would face acute workforce crises without international recruitment, but raises important ethical questions about the practice.<Cite nums={2} /> The WHO's Health Workforce Support and Safeguards List identifies countries that should not be actively recruited from because of their own critical shortages — yet analysis shows the NHS continues to recruit from several of these countries. The GMC's annual report notes that international medical graduates now account for the majority of new GMC registrations each year, with domestic UK medical training places growing more slowly than overall NHS demand.<Cite nums={3} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-recruitment', label: 'Recruitment trends' },
          { id: 'sec-training', label: 'Training supply' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="Doctors trained abroad (NHS)" value="40" unit="%" direction="up" polarity="up-is-bad" changeText={<>Up from 28% in 2015<Cite nums={1} /></>} sparklineData={[28, 29, 30, 31, 32, 33, 35, 37, 38, 39, 40]} href="#sec-recruitment" />
          <MetricCard label="International nurses joining NMC (2022–23)" value="40" unit="thousand" direction="up" polarity="up-is-bad" changeText={<>Record year; up from 8k pre-Brexit<Cite nums={1} /></>} sparklineData={[8, 8, 9, 10, 11, 5, 20, 30, 38, 40, 40]} href="#sec-recruitment" />
          <MetricCard label="NHS staff from WHO red-list countries" value="~12" unit="thousand" direction="up" polarity="up-is-bad" changeText={<>Ethically problematic source countries<Cite nums={2} /></>} sparklineData={[3, 4, 5, 6, 7, 7, 8, 10, 11, 12, 12]} href="#sec-recruitment" />
        </div>

        <ScrollReveal>
          <section id="sec-recruitment" className="mb-12">
            <LineChart title="Overseas-trained NHS staff joining registers, 2015–2024" subtitle="New internationally trained nurse and doctor joiners (thousands/year), England." series={chart1Series} annotations={annotations} yLabel="Thousands" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-training" className="mb-12">
            <LineChart title="International medical graduates in training and domestic training, 2015–2024" subtitle="International medical graduates in NHS training (thousands) and UK medical student index (2015=100)." series={chart2Series} annotations={[]} yLabel="Value" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="NHS long-term workforce plan" value="2023" unit="published" description={<>The NHS Long Term Workforce Plan published in 2023 commits to expanding domestic medical and nursing training to eventually reduce reliance on international recruitment, including doubling medical school places to 15,000 per year by 2031.<Cite nums={2} /></>} source="Source: NHS England, NHS Long Term Workforce Plan, June 2023." />
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
