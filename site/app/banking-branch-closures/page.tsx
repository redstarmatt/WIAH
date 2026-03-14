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
  { num: 1, name: 'Which?', dataset: 'Bank Branch Closures Tracker', url: 'https://www.which.co.uk/news/article/bank-branch-closures', date: '2024' },
  { num: 2, name: 'FCA', dataset: 'Access to Cash and Financial Services Review', url: 'https://www.fca.org.uk/consumers/cash-and-digital-payments', date: '2024' },
  { num: 3, name: 'Link', dataset: 'ATM and Cash Access Monitoring', url: 'https://www.link.co.uk/about/news/', date: '2024' },
];

interface DataPoint {
  year: number;
  bankBranchesTotal: number;
  closuresPerYear: number;
  cashAccessPoints: number;
  digitalBankingUsers: number;
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

export default function BankingBranchClosuresPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/banking-branch-closures/banking_branch_closures.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'bankBranchesTotal', label: 'UK bank branches (total)', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.bankBranchesTotal })) },
        { id: 'closuresPerYear', label: 'Branch closures per year', colour: '#F4A261', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.closuresPerYear })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'cashAccessPoints', label: 'Cash access points (thousands)', colour: '#6B7280', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.cashAccessPoints })) },
        { id: 'digitalBankingUsers', label: 'Digital banking users (millions)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.digitalBankingUsers })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: 'Covid-19: branch use falls sharply' },
    { date: new Date(2023, 5, 1), label: 'FCA cash access duty comes into force' },
  ];

  return (
    <>
      <TopicNav topic="Economy" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Economy"
          question="How Many Bank Branches Have Closed?"
          finding={<>Over 6,000 bank and building society branches have closed since 2015 — more than half the total — with around 400 closing per year in recent years, leaving millions of people, particularly older and rural residents, with severely reduced in-person banking access.<Cite nums={1} /> New FCA rules on cash access took effect in 2024, but critics say they are too weak to reverse the trend.<Cite nums={[2, 3]} /></>}
          colour="#6B7280"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The UK's bank branch network has contracted dramatically since 2015, driven by the shift to digital banking, falling transaction volumes and the drive to reduce costs. According to Which?, over 6,000 branches have closed since 2015, with the pace of closures running at around 400 per year in 2022–23.<Cite nums={1} /> The towns and communities left without any bank branch skew heavily toward rural, coastal and deprived urban areas — places where residents are less likely to use digital banking and more likely to depend on cash for managing their finances. Around 1.4 million adults in the UK remain unbanked, and millions more depend heavily on cash for budgeting.</p>
            <p>The FCA introduced a new Access to Cash duty in September 2023, requiring banks and building societies to assess communities' cash access needs and fill gaps — including through shared Banking Hubs run jointly by the major banks.<Cite nums={2} /> By early 2024, around 100 Banking Hubs had been announced or opened across the UK, providing basic banking services where branches have closed. The LINK network — which operates the majority of free-to-use UK ATMs — has seen its machine count fall by around 20,000 since 2018, and continues to lose machines in rural areas where transaction volumes are too low to sustain commercial viability.<Cite nums={3} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-closures', label: 'Closure trends' },
          { id: 'sec-access', label: 'Cash access' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="Bank branches remaining" value="4,800" unit="" direction="down" polarity="down-is-bad" changeText={<>Down from ~11,000 in 2015<Cite nums={1} /></>} sparklineData={[11000, 9800, 8600, 7800, 7200, 6600, 6100, 5700, 5300, 5000, 4800]} href="#sec-closures" />
          <MetricCard label="Branch closures per year" value="400" unit="" direction="flat" polarity="up-is-bad" changeText={<>Consistently high since 2018<Cite nums={1} /></>} sparklineData={[400, 420, 440, 450, 460, 380, 410, 420, 410, 400, 400]} href="#sec-closures" />
          <MetricCard label="Banking Hubs opened (cumulative)" value="100" unit="" direction="up" polarity="up-is-good" changeText={<>New shared service model replacing branches<Cite nums={2} /></>} sparklineData={[0, 0, 0, 0, 0, 5, 20, 50, 80, 95, 100]} href="#sec-access" />
        </div>

        <ScrollReveal>
          <section id="sec-closures" className="mb-12">
            <LineChart title="UK bank branch closures, 2015–2024" subtitle="Total bank and building society branches and annual closure count, UK." series={chart1Series} annotations={annotations} yLabel="Value" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-access" className="mb-12">
            <LineChart title="Cash access points and digital banking, 2015–2024" subtitle="Free-to-use cash access points (thousands) and digital banking users (millions), UK." series={chart2Series} annotations={[]} yLabel="Value" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="Banking Hub rollout" value="100+" unit="hubs" description={<>Over 100 Banking Hubs — shared service centres run by a consortium of UK banks — have been announced or opened since 2022, providing communities that have lost all their branches with access to cash, deposits and face-to-face banking services from a rotating roster of bank staff.<Cite nums={2} /></>} source="Source: Cash Access UK, Banking Hub Progress, 2024." />
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
