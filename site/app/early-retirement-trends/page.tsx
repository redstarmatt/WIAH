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
  { num: 1, name: 'ONS', dataset: 'Employment in the UK — early retirement analysis', url: 'https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/employmentandemployeetypes/bulletins/uklabourmarket/latest', date: '2024' },
  { num: 2, name: 'Resolution Foundation', dataset: 'Going, going, gone? Early retirement in the UK', url: 'https://www.resolutionfoundation.org/publications/', date: '2024' },
  { num: 3, name: 'Bank of England', dataset: 'Agents summary of business conditions — labour market', url: 'https://www.bankofengland.co.uk/agents-summary', date: '2024' },
];

interface DataPoint {
  year: number;
  over50sInactiveChoiceRetirement: number;
  over50sInactiveIllHealth: number;
  avgEarlyRetirementAge: number;
  pensionWealthTop20Pct: number;
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

export default function EarlyRetirementTrendsPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/early-retirement-trends/early_retirement_trends.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'over50sInactiveChoiceRetirement', label: 'Inactive by choice (thousands)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.over50sInactiveChoiceRetirement })) },
        { id: 'over50sInactiveIllHealth', label: 'Inactive due to ill health (thousands)', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.over50sInactiveIllHealth })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'avgEarlyRetirementAge', label: 'Avg age at early retirement', colour: '#2A9D8F', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.avgEarlyRetirementAge })) },
        { id: 'pensionWealthTop20Pct', label: 'Top-20% pension wealth (£000s)', colour: '#6B7280', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.pensionWealthTop20Pct })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: 'Covid — wave of early retirements' },
    { date: new Date(2022, 5, 1), label: 'Some return to work as inflation bites' },
  ];

  return (
    <>
      <TopicNav topic="Economy & Society" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Economy & Society"
          question="Why Are More People Retiring Early?"
          finding={<>Around 630,000 people aged 50–64 became economically inactive between 2019 and 2022, with early retirement and long-term ill health roughly equal contributors.<Cite nums={1} /> Early retirement is heavily concentrated among those with substantial pension wealth — the bottom half of the wealth distribution cannot afford to retire early even if they want to.<Cite nums={[2, 3]} /></>}
          colour="#6B7280"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The pandemic triggered an unusual wave of early retirements. The combination of rising asset values (particularly housing and pensions), reduced spending during lockdown, and changes to work preferences pushed many over-50s out of the labour market at a rate not seen in decades. This &quot;great retirement&quot; contributed meaningfully to the post-pandemic labour shortage and the inflationary wage pressures of 2021–22. However, as the cost of living rose, some of those who retired early returned to work — particularly women and those without defined benefit pensions.<Cite nums={1} /></p>
            <p>The early retirement trend masks significant inequality. Those able to retire early are disproportionately homeowners with defined benefit pensions or substantial savings — typically those who worked in the public sector or large companies before the 1990s pension shift. For the majority of over-50s, the combination of lower pension wealth, higher housing costs, and greater financial obligations means early retirement is simply not affordable. The Resolution Foundation has estimated that the bottom half of the wealth distribution retires an average of four years later than the top half.<Cite nums={[2, 3]} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-chart1', label: 'Inactivity drivers' },
          { id: 'sec-chart2', label: 'Wealth and age' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="Inactive by choice (50–64)" value="1.08m" unit="" direction="up" polarity="up-is-bad" changeText={<>Up 300k since 2019 pandemic surge<Cite nums={1} /></>} sparklineData={[780, 790, 800, 850, 1100, 1100, 1080, 1060, 1055, 1060, 1080]} href="#sec-chart1" />
          <MetricCard label="Inactive due to ill health" value="2.8m" unit="" direction="up" polarity="up-is-bad" changeText={<>Record high; roughly equal split with choice<Cite nums={2} /></>} sparklineData={[2.3, 2.3, 2.4, 2.4, 2.8, 2.9, 2.9, 2.85, 2.82, 2.8, 2.8]} href="#sec-chart1" />
          <MetricCard label="Avg early retirement age" value="61.3" unit="yrs" direction="down" polarity="flat" changeText={<>Down from 62.8 in 2018<Cite nums={3} /></>} sparklineData={[63, 62.5, 62.8, 62.8, 61.0, 61.0, 61.2, 61.3, 61.3, 61.3, 61.3]} href="#sec-chart2" />
        </div>

        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart title="Economic inactivity in 50–64 age group by reason, 2015–2024" subtitle="Inactive by retirement choice and inactive due to ill health (thousands), UK" series={chart1Series} annotations={annotations} yLabel="Thousands" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart title="Early retirement age and top-wealth pension accumulation, 2015–2024" subtitle="Average age at early retirement and top-quintile pension wealth (£000s)" series={chart2Series} annotations={[]} yLabel="Years / £000s" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="Return-to-work support" value="50+" unit="programmes" description={<>Over 50 Returner programmes and mid-life MOT services have been trialled across England, helping some over-50s re-enter the workforce — but take-up has been limited and most schemes are small-scale.<Cite nums={2} /></>} source="Source: DWP, labour market participation review." />
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
