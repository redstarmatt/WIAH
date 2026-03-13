'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import PositiveCallout from '@/components/PositiveCallout';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

// Estimated value of unpaid care (£ billions), 2016–2024
const unpaidCareValueData = [57, 60, 64, 68, 72, 74, 80, 87, 93];

// Carers receiving Carer's Allowance (thousands), 2016–2024
const carersAllowanceData = [760, 780, 800, 820, 840, 850, 870, 880, 900];

// Carer's Allowance weekly rate (£), 2016–2024
const carersAllowanceRateData = [62.70, 64.60, 64.60, 66.15, 67.25, 67.60, 69.70, 76.75, 81.90];

const unpaidCareSeries: Series[] = [
  {
    id: 'unpaidCareValue',
    label: 'Unpaid care value (£ billions/year)',
    colour: '#F4A261',
    data: unpaidCareValueData.map((v, i) => ({ date: new Date(2016 + i, 0, 1), value: v })),
  },
];

const allowanceSeries: Series[] = [
  {
    id: 'carersAllowance',
    label: "Carer's Allowance claimants (thousands)",
    colour: '#264653',
    data: carersAllowanceData.map((v, i) => ({ date: new Date(2016 + i, 0, 1), value: v })),
  },
  {
    id: 'allowanceRate',
    label: "Weekly rate (£ × 10 for scale)",
    colour: '#6B7280',
    data: carersAllowanceRateData.map((v, i) => ({ date: new Date(2016 + i, 0, 1), value: v * 10 })),
  },
];

const careAnnotations: Annotation[] = [
  { date: new Date(2020, 0, 1), label: '2020: Pandemic intensifies caring burden' },
  { date: new Date(2022, 0, 1), label: "2022: Carer's Leave Act enacted" },
];

const allowanceAnnotations: Annotation[] = [
  { date: new Date(2024, 0, 1), label: '2024: Earnings threshold raised to £195/week' },
];

export default function CareEconomyValuePage() {
  return (
    <>
      <TopicNav topic="Care Economy Value" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Care Economy"
          question="What Is Unpaid Care Actually Worth?"
          finding="Britain's 10.6 million unpaid carers provide £93 billion of care annually — comparable to the entire NHS England budget — while average Carer's Allowance is just £81.90 per week. Only 900,000 carers claim the allowance from an eligible population of 10.6 million. An estimated 600 carers leave paid employment every day."
          colour="#F4A261"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Carers UK estimates 10.6 million people provide unpaid care in the UK — looking after a family member, partner, or friend who is ill, elderly, disabled, or has a mental health condition. If that care were provided commercially at professional carer rates, it would cost £93 billion per year — comparable to the entire NHS England budget and representing around 4% of GDP. Carer's Allowance — the main financial support for carers providing 35 or more hours per week — is £81.90 per week, the lowest of all means-tested benefits. The earnings threshold of £151 per week (raised to £195 in the 2024 Autumn Budget) has trapped carers attempting to combine part-time work with caring, often losing the allowance entirely if they earn just above the limit. Only 900,000 carers claim Carer's Allowance from an eligible population of 10.6 million.</p>
            <p>Women bear a disproportionate share of the burden: they are significantly more likely to reduce employment when caring responsibilities arise, contributing to gender pay gaps and pension gaps that compound across decades. An estimated 600 carers leave paid employment every day, at an ONS-estimated annual cost of £1.3 billion in lost output. Population ageing will intensify pressure on unpaid carers as the workforce gap in paid social care — already 150,000 vacancies — grows. The Carer's Leave Act 2022 gave carers the right to 5 days of unpaid leave from employment, and the NHS Long Term Plan committed to identifying carers registered with GP practices, but these are incremental steps against a structural gap between the economic value of unpaid care and the support provided to those who provide it.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Care Value' },
          { id: 'sec-chart2', label: "Carer's Allowance" },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Unpaid care value annually"
              value="£93bn"
              unit="2024"
              direction="up"
              polarity="up-is-good"
              changeText="+£21bn since 2019 · equals NHS England budget"
              sparklineData={[57, 60, 64, 68, 72, 74, 80, 87, 93]}
              source="Carers UK · State of Caring Report 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Carers receiving Allowance"
              value="900,000"
              unit="of 10.6m eligible"
              direction="up"
              polarity="up-is-bad"
              changeText="Only 8.5% of eligible carers claim · £81.90/week"
              sparklineData={[760, 780, 800, 820, 840, 850, 870, 880, 900]}
              source="DWP · Carer's Allowance Statistics 2024"
              href="#sec-chart2"
            />
            <MetricCard
              label="Carers leaving work per day"
              value="600"
              unit="per day"
              direction="flat"
              polarity="up-is-bad"
              changeText="£1.3bn GDP impact annually · majority are women"
              sparklineData={[600, 600, 590, 610, 620, 600, 610, 600]}
              source="Carers UK · State of Caring Report 2024"
              href="#sec-chart1"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Estimated value of unpaid care, UK, 2016–2024"
              subtitle="Annual economic value of unpaid care at professional carer wage rates (£ billions). Rising as population ages, health conditions increase, and more people require support at home."
              series={unpaidCareSeries}
              annotations={careAnnotations}
              yLabel="£ billions"
              source={{ name: "Carers UK", dataset: "State of Caring Report", url: 'https://www.carersuk.org/media-centre/press-releases/state-of-caring-report', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Carer's Allowance claimants and weekly rate, 2016–2024"
              subtitle="Number of carers claiming Carer's Allowance (thousands, dark) and weekly rate scaled (grey). Claimants represent less than 9% of the eligible carer population."
              series={allowanceSeries}
              annotations={allowanceAnnotations}
              yLabel="Claimants / scaled rate"
              source={{ name: 'DWP', dataset: "Carer's Allowance Statistics", url: 'https://www.gov.uk/government/collections/carers-allowance-statistics', frequency: 'quarterly', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Carer's Leave Act: 5 days entitlement for working carers"
            value="5 days"
            unit="statutory carer's leave from April 2024"
            description="The Carer's Leave Act 2022 gave carers the right to 5 days of unpaid leave per year from employment, taking effect from April 2024. Surveys suggest 60% of working carers were previously taking annual leave or sick leave to fulfil caring responsibilities. The 2024 Autumn Budget also raised the Carer's Allowance earnings threshold from £151 to £195 per week, allowing part-time carers to earn more without losing the benefit — an estimated 45,000 additional carers will now be able to work while retaining support."
            source="Source: Carers UK — Carer's Leave Act impact survey 2024. DWP — Carer's Allowance earnings threshold reform 2024."
          />
        </ScrollReveal>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.carersuk.org/media-centre/press-releases/state-of-caring-report" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Carers UK — State of Caring Report</a> — annual survey of carers. Retrieved March 2026.</p>
            <p><a href="https://www.gov.uk/government/collections/carers-allowance-statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DWP — Carer's Allowance Statistics</a> — claimant counts, benefit rates, and earnings threshold data. Retrieved March 2026.</p>
            <p><a href="https://www.ons.gov.uk/peoplepopulationandcommunity/healthandsocialcare/socialcare" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ONS — Social care statistics</a> — employment impact estimates using Labour Force Survey. Retrieved March 2026.</p>
            <p className="mt-2">Unpaid care value is calculated by applying the median hourly rate for professional care workers to estimated hours of informal care provided, using ONS Time Use Survey data. Carer's Allowance claimant figures are DWP administrative data. Employment exit estimates are from Carers UK surveys combined with ONS Labour Force Survey analysis.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
