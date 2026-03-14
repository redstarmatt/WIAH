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

// Auto-enrolment workplace pension participation (millions), 2012–2024
const enrolmentValues = [0.6, 2.1, 4.8, 6.2, 7.5, 8.5, 9.3, 9.9, 10.2, 10.4, 10.6, 10.8];

// Percentage of employees contributing adequately for retirement (%), 2012–2024
const adequacyValues = [48, 46, 44, 42, 40, 39, 38, 38, 37, 36, 36, 35];

// Gender pension gap — median pension wealth ratio women:men (%), 2010–2024
const genderGapValues = [28, 29, 30, 31, 32, 33, 34, 34, 35, 35, 35, 35, 36, 35, 35];

const series1: Series[] = [
  {
    id: 'enrolment',
    label: 'Auto-enrolment participation (millions)',
    colour: '#2A9D8F',
    data: enrolmentValues.map((v, i) => ({ date: new Date(2012 + i, 6, 1), value: v })),
  },
  {
    id: 'adequacy',
    label: 'Saving adequately for retirement (%)',
    colour: '#E63946',
    data: adequacyValues.map((v, i) => ({ date: new Date(2012 + i, 6, 1), value: v })),
  },
];

const series2: Series[] = [
  {
    id: 'gender-gap',
    label: 'Gender pension gap (%)',
    colour: '#F4A261',
    data: genderGapValues.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
  },
];

const annotations: Annotation[] = [
  { date: new Date(2012, 9, 1), label: '2012: Auto-enrolment launches' },
  { date: new Date(2019, 3, 1), label: '2019: Minimum contribution raised to 8%' },
];

const editorialRefs: Reference[] = [
  { num: 1, name: 'DWP', dataset: 'Automatic Enrolment Evaluation Report', url: 'https://www.gov.uk/government/publications/automatic-enrolment-evaluation-report-2023', date: '2023' },
  { num: 2, name: 'Pensions Policy Institute', dataset: 'Adequacy of retirement income', url: 'https://www.pensionspolicyinstitute.org.uk/', date: '2024' },
  { num: 3, name: 'ONS', dataset: 'Pension Wealth in Great Britain', url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/personalandhouseholdfinances/incomeandwealth', date: '2024' },
];

export default function PensionAdequacyPage() {
  return (
    <>
      <TopicNav topic="Pension Adequacy" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Pension Adequacy"
          question="Will You Actually Have Enough to Retire On?"
          finding="12.5 million people are under-saving for retirement. Auto-enrolment brought millions into workplace pensions, but at a minimum contribution of 8% most will face a significant shortfall. The gender pension gap stands at 35%, and the state pension of £11,500 is below the poverty line."
          colour="#F4A261"
          preposition="with"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Automatic enrolment, introduced in October 2012, is the single most successful pension reform in a generation. It has brought 10.8 million people into workplace pension saving who were previously not contributing at all.<Cite nums={1} /> But the success of participation masks a growing adequacy crisis. The minimum total contribution of 8% of qualifying earnings — with only 3% from the employer — is widely recognised as insufficient for a comfortable retirement. The Pensions Policy Institute estimates that 12.5 million working-age adults are under-saving, and that the average worker contributing at the minimum will face a retirement income shortfall of approximately 37% relative to the PLSA Moderate Retirement Living Standard.<Cite nums={2} /></p>
            <p>The full state pension, currently £11,502 per year, falls below both the Joseph Rowntree Foundation minimum income standard and the relative poverty threshold. For those relying predominantly on the state pension — disproportionately women, part-time workers, and those with caring responsibilities — retirement means poverty. The ONS Wealth and Assets Survey reveals a median gender pension gap of approximately 35%: women reaching state pension age have accumulated, on average, just 65p in private pension wealth for every £1 held by men.<Cite nums={3} /> This reflects lifetime pay gaps, part-time working patterns, and career breaks for childcare. Self-employed workers, who are excluded from auto-enrolment, have a participation rate in pension saving of just 16%, down from 43% in 2004. The pensions system is successfully getting people saving; it is not yet getting them saving enough.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Enrolment vs adequacy' },
          { id: 'sec-chart2', label: 'Gender pension gap' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Under-saving for retirement"
              value="12.5M"
              unit="2024"
              direction="up"
              polarity="up-is-bad"
              changeText="workers contributing below adequate levels"
              sparklineData={[10.2, 10.8, 11.2, 11.5, 11.9, 12.0, 12.3, 12.5]}
              source="Pensions Policy Institute 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Auto-enrolment minimum contribution"
              value="8%"
              unit="since 2019"
              direction="flat"
              polarity="down-is-bad"
              changeText="widely considered inadequate · PLSA recommends 12%"
              sparklineData={[1, 2, 3, 5, 5, 8, 8, 8]}
              source="DWP — Automatic Enrolment Review 2023"
              href="#sec-chart1"
            />
            <MetricCard
              label="Gender pension gap"
              value="35%"
              unit="2024"
              direction="up"
              polarity="up-is-bad"
              changeText="women accumulate 65p for every £1 men save"
              sparklineData={genderGapValues.slice(-8)}
              source="ONS — Pension Wealth in Great Britain 2024"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Auto-enrolment participation vs savings adequacy, 2012–2024"
              subtitle="Participation (green) has risen dramatically since 2012, but the proportion saving adequately for retirement (red) has continued to fall as minimum contributions remain at 8%."
              series={series1}
              annotations={annotations}
              yLabel="Millions / %"
              source={{ name: 'DWP', dataset: 'Automatic Enrolment Evaluation', url: 'https://www.gov.uk/government/publications/automatic-enrolment-evaluation-report-2023', frequency: 'annual', date: 'Dec 2023' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Gender pension gap, Great Britain, 2010–2024"
              subtitle="Difference in median private pension wealth between men and women as a percentage. The gap has remained stubbornly high despite rising female employment."
              series={series2}
              annotations={[{ date: new Date(2016, 0, 1), label: '2016: New state pension introduced' }]}
              yLabel="Gender pension gap (%)"
              source={{ name: 'ONS', dataset: 'Pension Wealth in Great Britain', url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/personalandhouseholdfinances/incomeandwealth', frequency: 'biennial', date: 'Jan 2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Auto-enrolment: 10.8 million new savers"
            value="10.8M"
            unit="people now saving in workplace pensions"
            description="Automatic enrolment is a genuine policy success story. Before its introduction in 2012, workplace pension participation in the private sector had fallen to just 2.7 million — its lowest level since records began. By 2024, 10.8 million additional workers were enrolled in workplace pension schemes. Opt-out rates have remained remarkably low at approximately 8%, defying initial forecasts of 25–30%. The behavioural insight that defaults drive behaviour has been validated at scale. The challenge now is increasing contribution levels to make the savings adequate for a decent retirement."
            source="Source: DWP — Automatic Enrolment Evaluation Report 2023. The Pensions Regulator compliance data."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.gov.uk/government/publications/automatic-enrolment-evaluation-report-2023" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DWP — Automatic Enrolment Evaluation Report</a> — official evaluation of auto-enrolment covering participation, opt-out rates, and contribution levels. Based on employer and scheme administrative data.</p>
            <p><a href="https://www.pensionspolicyinstitute.org.uk/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Pensions Policy Institute</a> — adequacy modelling comparing projected retirement incomes against PLSA Retirement Living Standards. Uses stochastic modelling of investment returns, earnings growth, and longevity.</p>
            <p><a href="https://www.ons.gov.uk/peoplepopulationandcommunity/personalandhouseholdfinances/incomeandwealth" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ONS — Pension Wealth in Great Britain</a> — derived from the Wealth and Assets Survey, covering approximately 18,000 households. Gender gap calculated from median total private pension wealth at household level.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
