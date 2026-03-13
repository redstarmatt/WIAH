'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

// Bailiff visits (millions), 2015–2023
const bailiffVisitValues = [1.9, 2.0, 2.0, 2.1, 2.2, 1.4, 1.0, 1.8, 2.4];

// Average fees charged (£), 2015–2023
const avgFeesValues = [270, 275, 280, 290, 295, 295, 300, 305, 310];

const series1: Series[] = [
  {
    id: 'bailiff-visits',
    label: 'Bailiff visits (millions)',
    colour: '#E63946',
    data: bailiffVisitValues.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
];

const series2: Series[] = [
  {
    id: 'avg-fees',
    label: 'Average fees charged (£)',
    colour: '#F4A261',
    data: avgFeesValues.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
];

const annotations1: Annotation[] = [
  { date: new Date(2020, 2, 1), label: '2020: COVID-19 enforcement suspension' },
  { date: new Date(2022, 0, 1), label: '2022: post-moratorium enforcement surge' },
];

const annotations2: Annotation[] = [
  { date: new Date(2014, 0, 1), label: '2014: Taking Control of Goods Regulations' },
];

const editorialRefs: Reference[] = [
  { num: 1, name: 'Ministry of Justice', dataset: 'Enforcement Statistics Quarterly', url: 'https://www.gov.uk/government/collections/enforcement-statistics-quarterly', date: '2023' },
  { num: 2, name: 'Money Advice Trust', dataset: 'Personal Debt Statistics', url: 'https://www.moneyadvicetrust.org', date: '2023' },
  { num: 3, name: 'StepChange Debt Charity', dataset: 'Statistics Yearbook', url: 'https://www.stepchange.org/policy-and-research/statistics-yearbook.aspx', date: '2023' },
];

export default function DebtEnforcementHardshipPage() {
  return (
    <>
      <TopicNav topic="Debt Enforcement" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Debt Enforcement &amp; Hardship"
          question="What Happens When You Fall Behind on Bills?"
          finding="2.4 million bailiff visits took place in England and Wales in 2023 — the highest since before COVID. An average of £310 in fees is added to debts when a bailiff attends, compounding the burden on households already in crisis. Nearly half of visited debtors show signs of vulnerability that were never identified before enforcement began."
          colour="#E63946"
          preposition="with"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>When people fall behind on bills, the enforcement system can transform a manageable debt into an unmanageable one. Bailiffs — officially called enforcement agents — add a compliance fee of £75 immediately on instruction, followed by an enforcement fee of £235 if they attend the property; these fees are statutory and non-discretionary. The 2.4 million bailiff visits recorded in 2023 are the highest since before COVID-19 suspended enforcement in 2020, with council tax accounting for around half of all referrals.<Cite nums={1} /> Local authorities routinely refer debt earlier and for smaller amounts than commercial creditors, because council tax carries automatic priority status. The government introduced a Breathing Space scheme in 2021 providing temporary enforcement protection for people seeking debt advice, but uptake has been lower than projected.</p>
            <p>The vulnerability problem is systemic and largely invisible to the creditors initiating enforcement. Research by the Money Advice Trust finds that 44% of visited debtors show signs of vulnerability — mental health problems, disability, or crisis circumstances — that were not identified before enforcement began.<Cite nums={2} /> The consequences fall hardest on people already in the most precarious financial positions: those in deprived areas, single-parent households, and renters disproportionately face bailiff action for council tax and rent arrears, and the additional fees can push debts beyond any realistic capacity to repay. StepChange estimates that early debt advice, before enforcement is initiated, would improve outcomes for both debtors and creditors.<Cite nums={3} /></p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Bailiff Visits' },
          { id: 'sec-chart2', label: 'Fees' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Bailiff visits (England and Wales)"
              value="2.4M"
              unit="2023"
              direction="up"
              polarity="up-is-bad"
              changeText="+26% since 2015 · council tax biggest driver"
              sparklineData={[1.9, 2.0, 2.0, 2.1, 2.2, 1.4, 1.0, 1.8, 2.4]}
              source="Ministry of Justice — Enforcement Statistics 2023"
              href="#sec-chart1"
            />
            <MetricCard
              label="Average fees charged per visit"
              value="£310"
              unit="2023"
              direction="up"
              polarity="up-is-bad"
              changeText="+15% since 2015 · statutory fees compound the debt problem"
              sparklineData={[270, 275, 280, 290, 295, 295, 300, 305, 310]}
              source="Taking Control of Goods Regulations — 2023"
              href="#sec-chart2"
            />
            <MetricCard
              label="Vulnerability not flagged before enforcement"
              value="44%"
              unit="of visited debtors"
              direction="flat"
              polarity="up-is-bad"
              changeText="mental health, disability, or crisis — not identified before bailiff visit"
              sparklineData={[42, 43, 43, 44, 44, 44, 44, 44]}
              source="Money Advice Trust — Debt Collection Survey 2023"
              href="#sec-sources"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Bailiff visits in England and Wales, 2015–2023"
              subtitle="Total enforcement agent visits (millions). The 2020 low reflects COVID-19 enforcement suspension from March to June; post-moratorium surge exceeded pre-pandemic levels by 2022."
              series={series1}
              annotations={annotations1}
              yLabel="Visits (millions)"
              source={{ name: 'Ministry of Justice', dataset: 'Enforcement Statistics Quarterly', url: 'https://www.gov.uk/government/collections/enforcement-statistics-quarterly', frequency: 'quarterly', date: '2023' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Average statutory fees charged per bailiff visit, 2015–2023"
              subtitle="Fees are set by the Taking Control of Goods (Fees) Regulations 2014: £75 compliance fee on instruction, plus £235 enforcement fee on attendance. These fees are added to the debt and must be paid before the debt itself."
              series={series2}
              annotations={annotations2}
              yLabel="Average fees (£)"
              source={{ name: 'Ministry of Justice', dataset: 'Taking Control of Goods — National Standards Statistics', url: 'https://www.gov.uk/government/statistics/taking-control-of-goods-national-standards', frequency: 'annual', date: '2023' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Breathing Space: 60 days of enforcement protection"
            value="117,000"
            unit="people used Breathing Space in 2023"
            description="The Breathing Space scheme, launched in May 2021, gives people in problem debt 60 days of protection from creditor action, enforcement, and interest charges while they access professional debt advice. In 2023, 117,000 people used the scheme — a significant but still small fraction of those in serious problem debt. StepChange and National Debtline received over 820,000 client enquiries in 2023. Wales has banned bailiff use for council tax collection as of April 2024, replacing enforcement with early intervention, income maximisation advice, and flexible payment plans — demonstrating that aggressive enforcement is not the only approach."
            source="Source: Insolvency Service — Breathing Space Statistics 2023. Welsh Government — Council Tax Collection Act 2024."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.gov.uk/government/collections/enforcement-statistics-quarterly" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Ministry of Justice — Enforcement Statistics Quarterly</a> — bailiff visit counts. Quarterly. 2023.</p>
            <p><a href="https://www.moneyadvicetrust.org" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Money Advice Trust — Personal Debt Statistics</a> — vulnerability rate in enforcement. Annual. 2023.</p>
            <p><a href="https://www.stepchange.org/policy-and-research/statistics-yearbook.aspx" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">StepChange Debt Charity — Statistics Yearbook</a> — debt advice client data. Annual. 2023.</p>
            <p>Bailiff visit data is from Ministry of Justice quarterly enforcement statistics. Average fees reflect the statutory schedule under Taking Control of Goods (Fees) Regulations 2014. Vulnerability figures are from Money Advice Trust and StepChange research surveys. COVID-19 period data reflects enforcement suspension from March to June 2020.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
