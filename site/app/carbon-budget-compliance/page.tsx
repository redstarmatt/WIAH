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
  { num: 1, name: 'Climate Change Committee', dataset: 'Progress in reducing UK emissions — Annual report to Parliament', url: 'https://www.theccc.org.uk/publication/2024-progress-report-to-parliament/', date: '2024' },
  { num: 2, name: 'DESNZ', dataset: 'UK greenhouse gas emissions, provisional figures', url: 'https://www.gov.uk/government/statistics/provisional-uk-greenhouse-gas-emissions-national-statistics', date: '2024' },
  { num: 3, name: 'Climate Change Committee', dataset: 'Sixth Carbon Budget', url: 'https://www.theccc.org.uk/publication/sixth-carbon-budget/', date: '2020' },
];

interface DataPoint {
  year: number;
  actualEmissionsMtCO2e: number;
  carbonBudgetPathwayMtCO2e: number;
  emissionsPerCapita: number;
  renewableSharePct: number;
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

export default function CarbonBudgetCompliancePage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/carbon-budget-compliance/carbon_budget_compliance.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'actualEmissionsMtCO2e', label: 'Actual UK emissions (MtCO₂e)', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.actualEmissionsMtCO2e })) },
        { id: 'carbonBudgetPathwayMtCO2e', label: 'Carbon budget pathway (MtCO₂e)', colour: '#2A9D8F', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.carbonBudgetPathwayMtCO2e })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'renewableSharePct', label: 'Renewables share of electricity (%)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.renewableSharePct })) },
        { id: 'emissionsPerCapita', label: 'Emissions per capita (tCO₂e)', colour: '#6B7280', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.emissionsPerCapita })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2019, 5, 1), label: 'Net zero target legislated' },
    { date: new Date(2022, 5, 1), label: 'Energy crisis' },
  ];

  return (
    <>
      <TopicNav topic="Environment & Climate" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Environment & Climate"
          question="Is the UK on Track to Meet Its Carbon Budgets?"
          finding={<>The Climate Change Committee's 2024 progress report found the UK is not on track to meet the fourth or fifth carbon budgets, with critical gaps in heating decarbonisation, agriculture and surface transport.<Cite nums={1} /> Territorial emissions fell in 2023, partly due to a warm winter and high renewable generation, but the CCC warned these gains are fragile and policy ambition has slipped.<Cite nums={[2, 3]} /></>}
          colour="#264653"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The UK's Climate Change Act 2008 established legally binding carbon budgets — five-year caps on greenhouse gas emissions — with a net zero target for 2050. Provisional government statistics show UK territorial emissions fell to around 394 MtCO₂e in 2023, down 4% on 2022. But the Climate Change Committee's independent assessment warns that current policy is insufficient to meet the fourth carbon budget (2023–2027) and that the gap to the fifth budget is widening, not closing.<Cite nums={[1, 2]} /></p>
            <p>The CCC's 2024 report identified heat pumps, electric vehicles and sustainable farming as the three biggest policy gaps. Installation rates for heat pumps remain a tenth of what is needed; EV uptake is on track for the private market but fleet and van electrification lags; and agriculture emissions have barely fallen since 2010. The sixth carbon budget — covering 2033–2037 and requiring a 78% emissions reduction from 1990 — was legislated in 2021 but the policies to deliver it have not been set out.<Cite nums={3} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-emissions', label: 'Emissions vs budget' },
          { id: 'sec-energy', label: 'Renewables & per capita' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="UK emissions (2023)" value="394 MtCO₂e" unit="" direction="down" polarity="up-is-bad" changeText={<>Down 50% since 1990<Cite nums={2} /></>} sparklineData={[770, 720, 680, 640, 600, 560, 510, 470, 450, 410, 394]} href="#sec-emissions" />
          <MetricCard label="Renewables share of electricity" value="47%" unit="" direction="up" polarity="up-is-good" changeText={<>Up from 7% in 2010<Cite nums={2} /></>} sparklineData={[7, 12, 17, 22, 28, 33, 37, 40, 43, 45, 47]} href="#sec-energy" />
          <MetricCard label="Policy gap to 5th carbon budget" value="High" unit="" direction="up" polarity="up-is-bad" changeText={<>CCC: current policy insufficient<Cite nums={1} /></>} sparklineData={[1, 1, 2, 2, 3, 3, 3, 4, 4, 4, 5]} href="#sec-emissions" />
        </div>

        <ScrollReveal>
          <section id="sec-emissions" className="mb-12">
            <LineChart title="UK greenhouse gas emissions vs carbon budget pathway, 1990–2023" subtitle="Territorial emissions in MtCO₂e against legally required budget pathway." series={chart1Series} annotations={annotations} yLabel="MtCO₂e" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-energy" className="mb-12">
            <LineChart title="Renewable electricity share and emissions per capita, 2000–2023" subtitle="Renewables as % of electricity generation; per capita territorial emissions in tCO₂e." series={chart2Series} annotations={[]} yLabel="Value" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="Electricity sector decarbonisation" value="2030" unit="target" description={<>The UK government has committed to decarbonising the electricity grid by 2030 — making it the world's first major economy to set this target. Clean electricity reached a record 47% share in 2023.<Cite nums={2} /></>} source="Source: DESNZ provisional GHG statistics." />
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
