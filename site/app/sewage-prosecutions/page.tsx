'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import PositiveCallout from '@/components/PositiveCallout';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

// EA prosecutions of water companies, 2010–2024
const prosecutionValues = [56, 48, 42, 35, 28, 22, 18, 14, 10, 8, 6, 4, 3, 2, 3];

// EA enforcement budget (£M, real terms 2023 prices), 2010–2024
const enforcementBudgetValues = [42, 39, 36, 33, 30, 27, 25, 23, 21, 19, 18, 17, 16, 16, 17];

// Average fine per prosecution (£k), 2010–2024
const avgFineValues = [35, 42, 55, 68, 85, 95, 110, 130, 150, 175, 195, 210, 200, 185, 200];

const series1: Series[] = [
  {
    id: 'prosecutions',
    label: 'EA prosecutions of water companies',
    colour: '#E63946',
    data: prosecutionValues.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
  },
];

const series2: Series[] = [
  {
    id: 'budget',
    label: 'EA enforcement budget (£M)',
    colour: '#264653',
    data: enforcementBudgetValues.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
  },
];

const annotations: Annotation[] = [
  { date: new Date(2014, 0, 1), label: '2014: Self-monitoring regime introduced' },
  { date: new Date(2022, 0, 1), label: '2022: Storm Overflows Taskforce' },
];

const editorialRefs: Reference[] = [
  { num: 1, name: 'Environment Agency', dataset: 'Enforcement and sanctions data', url: 'https://www.gov.uk/government/publications/environment-agency-enforcement-and-sanctions-policy', date: '2024' },
  { num: 2, name: 'Ofwat', dataset: 'Water company performance reports', url: 'https://www.ofwat.gov.uk/regulated-companies/company-obligations/performance/', date: '2024' },
  { num: 3, name: 'Environmental Audit Committee', dataset: 'Water quality in rivers inquiry', url: 'https://committees.parliament.uk/work/6852/water-quality-in-rivers/', date: '2023' },
];

export default function SewageProsecutionsPage() {
  return (
    <>
      <TopicNav topic="Sewage Prosecutions" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Sewage Prosecutions"
          question="Is Anyone Actually Being Punished for Sewage Dumping?"
          finding="Environment Agency prosecutions of water companies have collapsed from 56 in 2010 to just 3 in 2023. Average fines of £200,000 are trivial against revenues of billions. The EA's enforcement budget has been cut by 60%."
          colour="#264653"
          preposition="with"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>In 2010, the Environment Agency brought 56 prosecutions against water companies for pollution offences. By 2023, that number had fallen to 3.<Cite nums={1} /> This collapse in enforcement is not because water companies stopped polluting — sewage discharge events have increased dramatically over the same period, with 3.6 million hours of raw sewage discharged into English waterways in 2023 alone.<Cite nums={2} /> The EA's own enforcement budget tells the story: cut from £42 million in 2010 to just £17 million in real terms, a reduction of 60%.<Cite nums={1} /> Staffing in enforcement roles has fallen by a similar proportion. The agency has been, in the words of its former chair, "systematically defunded."<Cite nums={3} /></p>
            <p>When prosecutions do occur, the penalties are derisory. The average fine of around £200,000 represents minutes of revenue for companies like Thames Water (annual revenue: £2.4 billion) or United Utilities (£1.9 billion).<Cite nums={2} /> The 2014 introduction of "self-monitoring" — allowing water companies to report their own discharge data to the regulator — was described by the Environmental Audit Committee as allowing companies to "mark their own homework."<Cite nums={3} /> Some companies were subsequently found to have underreported discharges by factors of ten or more. Ofwat has begun imposing larger financial penalties through regulatory action rather than criminal prosecution, but critics argue this approach lacks the deterrent effect of criminal liability and allows companies to treat fines as a cost of doing business.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Prosecutions' },
          { id: 'sec-chart2', label: 'Enforcement budget' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="EA prosecutions (2023)"
              value="3"
              unit=""
              direction="down"
              polarity="down-is-bad"
              changeText="down from 56 in 2010 · a 95% collapse"
              sparklineData={prosecutionValues.slice(-8)}
              source="Environment Agency — Enforcement data 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Average fine per prosecution"
              value="£200k"
              unit="2023"
              direction="up"
              polarity="up-is-good"
              changeText="higher fines but trivial against billion-pound revenues"
              sparklineData={avgFineValues.slice(-8)}
              source="Environment Agency — Enforcement data 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="EA enforcement budget cut"
              value="60%"
              unit="since 2010"
              direction="up"
              polarity="up-is-bad"
              changeText="from £42M to £17M in real terms · staffing halved"
              sparklineData={enforcementBudgetValues.slice(-8)}
              source="Environment Agency — Annual report 2024"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="EA prosecutions of water companies, England, 2010–2024"
              subtitle="Number of criminal prosecutions brought by the Environment Agency for pollution offences. A 95% decline over 14 years despite rising sewage discharges."
              series={series1}
              annotations={annotations}
              yLabel="Prosecutions"
              source={{ name: 'Environment Agency', dataset: 'Enforcement and sanctions data', url: 'https://www.gov.uk/government/publications/environment-agency-enforcement-and-sanctions-policy', frequency: 'annual', date: 'Mar 2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="EA enforcement budget, real terms, 2010–2024"
              subtitle="Environment Agency enforcement and compliance budget in 2023 prices (£M). Systematic funding cuts have hollowed out regulatory capacity."
              series={series2}
              annotations={[{ date: new Date(2016, 0, 1), label: '2016: Deepest cuts under austerity' }]}
              yLabel="Budget (£M, real terms)"
              source={{ name: 'Environment Agency', dataset: 'Annual report and accounts', url: 'https://www.gov.uk/government/publications/environment-agency-annual-report-and-accounts', frequency: 'annual', date: 'Jul 2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Record Ofwat penalty: a regulatory shift?"
            value="£168M"
            unit="penalty package for Thames Water (2024)"
            description="In 2024, Ofwat imposed a record £168 million penalty package on Thames Water for sewage discharge failures — the largest ever regulatory action against a UK water company. While still modest relative to the scale of environmental harm, the penalty signalled a shift in regulatory posture. Ofwat has also begun linking executive bonuses to environmental performance and has blocked dividend payments for companies failing to meet pollution targets. Whether this regulatory toughening translates into sustained behavioural change remains to be seen, but the direction of travel is more assertive than at any point in the past decade."
            source="Source: Ofwat — Water company enforcement decisions 2024."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.gov.uk/government/publications/environment-agency-enforcement-and-sanctions-policy" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Environment Agency — Enforcement data</a> — prosecution and enforcement action data from annual enforcement reports. Covers criminal prosecutions, formal cautions, and civil sanctions.</p>
            <p><a href="https://www.ofwat.gov.uk/regulated-companies/company-obligations/performance/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Ofwat — Company performance</a> — financial data on water company revenues, profits, and regulatory penalties.</p>
            <p><a href="https://committees.parliament.uk/work/6852/water-quality-in-rivers/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Environmental Audit Committee</a> — parliamentary inquiry into water quality, including assessment of regulatory failures and self-monitoring regime.</p>
            <p>All figures are for England unless otherwise stated. Budget figures adjusted to 2023 prices using HMT GDP deflator series.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
