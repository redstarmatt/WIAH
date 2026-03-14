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
  { num: 1, name: 'CQC', dataset: 'Independent Healthcare Sector Regulation Report', url: 'https://www.cqc.org.uk/publications/themes-care/independent-sector', date: '2023' },
  { num: 2, name: 'BAAPS', dataset: 'Annual Audit of Cosmetic Surgery Procedures', url: 'https://baaps.org.uk/about/audit/', date: '2024' },
  { num: 3, name: 'DHSC', dataset: 'Review of the Regulation of Cosmetic Interventions (Keogh Review)', url: 'https://www.gov.uk/government/publications/review-of-the-regulation-of-cosmetic-interventions', date: '2023' },
];

interface DataPoint {
  year: number;
  cosmeticProcedures: number;
  complicationsReported: number;
  unregulatedProviders: number;
  breastAugmentations: number;
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

export default function CosmeticSurgeryRegulationPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/cosmetic-surgery-regulation/cosmetic_surgery_regulation.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'cosmeticProcedures', label: 'Surgical cosmetic procedures (thousands/yr)', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.cosmeticProcedures })) },
        { id: 'complicationsReported', label: 'Complications reported to CQC (count)', colour: '#F4A261', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.complicationsReported })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'breastAugmentations', label: 'Breast augmentations (thousands/yr)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.breastAugmentations })) },
        { id: 'unregulatedProviders', label: 'Unregistered providers reported (count)', colour: '#6B7280', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.unregulatedProviders })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: 'Covid-19: procedures suspended' },
    { date: new Date(2023, 5, 1), label: 'Health and Care Act: new cosmetic provisions' },
  ];

  return (
    <>
      <TopicNav topic="Health" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Health"
          question="Is Cosmetic Surgery Adequately Regulated?"
          finding={<>The cosmetic surgery sector performs around 30,000 surgical procedures annually in the UK, but non-surgical aesthetic treatments — including fillers and botox — remain largely unregulated, with anyone legally able to inject patients without medical training.<Cite nums={1} /> Calls for licensing have been made since the 2013 Keogh Review.<Cite nums={[2, 3]} /></>}
          colour="#E63946"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The UK cosmetic surgery and aesthetics market is worth an estimated £3.6bn annually and continues to grow, driven partly by social media influence and the normalisation of cosmetic procedures among younger demographics.<Cite nums={2} /> Surgical procedures — including breast augmentation, rhinoplasty and liposuction — must be performed by regulated healthcare professionals in CQC-registered facilities. However, a large and growing share of the market consists of non-surgical treatments: dermal fillers, botulinum toxin (Botox), and skin resurfacing, which until recently had no licensing requirements for practitioners.</p>
            <p>The 2013 Keogh Review recommended mandatory licensing for all aesthetic practitioners, but legislative action took a decade. The Health and Care Act 2022 included provisions for a licensing regime for non-surgical cosmetic procedures, and from 2024 practitioners are required to hold a licence from the CQC to administer certain injectable treatments.<Cite nums={3} /> However, enforcement capacity is limited, and investigations by consumer groups have repeatedly found unqualified practitioners operating openly. The CQC has raised concerns about the number of complaints received and the difficulty of tracing practitioners who cause harm.<Cite nums={1} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-procedures', label: 'Procedure trends' },
          { id: 'sec-regulation', label: 'Regulation gaps' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="Surgical cosmetic procedures/yr" value="30" unit="thousand" direction="up" polarity="up-is-bad" changeText={<>Post-Covid rebound above pre-pandemic levels<Cite nums={2} /></>} sparklineData={[28, 30, 32, 29, 16, 24, 29, 30, 31, 30, 30]} href="#sec-procedures" />
          <MetricCard label="Years from Keogh Review to licensing" value="10" unit="years" direction="flat" polarity="up-is-bad" changeText={<>Recommendations made 2013, action 2023<Cite nums={3} /></>} sparklineData={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} href="#sec-regulation" />
          <MetricCard label="Non-surgical aesthetics market" value="3.6" unit="£bn" direction="up" polarity="up-is-bad" changeText={<>Up 60% since 2015<Cite nums={2} /></>} sparklineData={[2.2, 2.4, 2.6, 2.8, 3.0, 2.4, 2.8, 3.1, 3.3, 3.5, 3.6]} href="#sec-procedures" />
        </div>

        <ScrollReveal>
          <section id="sec-procedures" className="mb-12">
            <LineChart title="UK cosmetic procedures and complications, 2015–2024" subtitle="Annual surgical cosmetic procedures (thousands) and CQC-reported complications, UK." series={chart1Series} annotations={annotations} yLabel="Value" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-regulation" className="mb-12">
            <LineChart title="Breast augmentations and unregistered providers, 2015–2024" subtitle="Breast augmentations (thousands/yr) and unregistered provider reports to CQC, UK." series={chart2Series} annotations={[]} yLabel="Value" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="New licensing regime" value="2024" unit="enacted" description={<>From 2024 practitioners must hold a licence from the CQC to perform non-surgical cosmetic procedures including injectable fillers and botulinum toxin treatments — the first mandatory licensing regime for aesthetic practitioners in England.<Cite nums={3} /></>} source="Source: DHSC, Cosmetic Procedures Licensing Implementation, 2024." />
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
