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

const editorialRefs: Reference[] = [
  { num: 1, name: 'ONS', dataset: 'Labour Force Survey: economic inactivity', url: 'https://www.ons.gov.uk/employmentandlabourmarket/peoplenotinwork/economicinactivity', date: '2023' },
  { num: 2, name: 'ONS', dataset: 'Sickness absence in the labour market', url: 'https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/labourproductivity/articles/sicknessabsenceinthelabourmarket/latest', date: '2022' },
  { num: 3, name: 'OBR', dataset: 'Economic and Fiscal Outlook', date: '2023' },
  { num: 4, name: 'Resolution Foundation', dataset: 'Health and economic inactivity analysis', date: '2023' },
];

// Total economic inactivity (millions), 2014–2023 — ONS LFS
const inactivityValues = [8.6, 8.5, 8.4, 8.4, 8.4, 8.4, 8.4, 8.7, 9.2, 9.4];

// Long-term sick (millions), 2014–2023 — ONS LFS
const sickValues = [2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.1, 2.6, 2.8];

const inactivitySeries: Series[] = [
  {
    id: 'inactivity',
    label: 'Economically inactive (millions)',
    colour: '#F4A261',
    data: inactivityValues.map((v, i) => ({ date: new Date(2014 + i, 5, 1), value: v })),
  },
  {
    id: 'long-term-sick',
    label: 'Inactive due to long-term sickness (millions)',
    colour: '#E63946',
    data: sickValues.map((v, i) => ({ date: new Date(2014 + i, 5, 1), value: v })),
  },
];

const sickOnlySeries: Series[] = [
  {
    id: 'long-term-sick',
    label: 'Inactive due to long-term sickness (millions)',
    colour: '#E63946',
    data: sickValues.map((v, i) => ({ date: new Date(2014 + i, 5, 1), value: v })),
  },
];

const inactivityAnnotations: Annotation[] = [
  { date: new Date(2020, 2, 1), label: '2020: COVID-19 pandemic' },
];

export default function EconomicInactivityPage() {
  return (
    <>
      <TopicNav topic="Economic Inactivity" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Economic Inactivity"
          question="Why Are 2.8 Million More People Out of Work Since COVID?"
          finding="Economic inactivity has risen by 800,000 since the pandemic to 9.4 million — 22% of the working-age population. Long-term sickness is now the largest single reason. The UK is the only G7 country whose employment rate has not recovered to pre-COVID levels."
          colour="#F4A261"
          preposition="with"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Economic inactivity among working-age adults rose to 9.4 million by late 2023 — 22% of the working-age population and 800,000 above the pre-pandemic level.<Cite nums={[1]} /> The UK is now the only G7 economy whose employment rate has not recovered to pre-COVID levels; the OBR estimates this gap represents a 2% shortfall in potential output.<Cite nums={[3]} /> The shift is structural, not cyclical: long-term sickness is the primary driver, with 2.8 million economically inactive due to illness in 2023, up from 2.0 million in 2019.<Cite nums={[1]} /> The NHS waiting list of 7.5 million cases is a significant factor — Resolution Foundation modelling suggests eliminating the backlog could return 170,000 people to employment.<Cite nums={[4]} /> Mental health accounts for 38% of all long-term sickness inactivity; musculoskeletal conditions 35%.<Cite nums={[1]} /></p>
            <p>The burden falls unevenly. Women account for 60% of the economically inactive, with caring responsibilities a major driver.<Cite nums={[1]} /> Geographic clustering is pronounced: Wales, the North East, and parts of Yorkshire have inactivity rates 4–6 percentage points above the national average — a legacy of deindustrialisation.<Cite nums={[1]} /> The 50–64 cohort has driven the post-pandemic increase most sharply, with many leaving the workforce during COVID-19 and not returning. The disability employment gap of around 28 percentage points has narrowed only marginally over a decade.<Cite nums={[1]} /></p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Inactivity trend' },
          { id: 'sec-chart2', label: 'Long-term sick' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Economically inactive (working age)"
              value="9.4"
              unit="million"
              direction="up"
              polarity="up-is-bad"
              changeText="22% of working-age adults · up 800k since COVID"
              sparklineData={[8.6, 8.5, 8.4, 8.4, 8.4, 8.7, 9.2, 9.4]}
              source="ONS · Labour Force Survey 2023 Q4"
              href="#sec-chart1"
            />
            <MetricCard
              label="Inactive due to long-term sickness"
              value="2.8"
              unit="million"
              direction="up"
              polarity="up-is-bad"
              changeText="Up from 2.0M pre-COVID · now largest reason for inactivity"
              sparklineData={[2.0, 2.0, 2.0, 2.0, 2.0, 2.1, 2.6, 2.8]}
              source="ONS · Labour Force Survey 2023"
              href="#sec-chart2"
            />
            <MetricCard
              label="Working days lost to sickness absence"
              value="185M"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="2022 · Up 35% since 2019 · mental health & MSK top causes"
              sparklineData={[141, 137, 131, 131, 137, 170, 185, 185]}
              source="ONS · Sickness Absence Survey 2022"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Working-age economic inactivity, UK, 2014–2023"
              subtitle="Millions of people aged 16–64 neither in work nor seeking work. The UK is the only G7 country not to have recovered to pre-pandemic employment levels."
              series={inactivitySeries}
              annotations={inactivityAnnotations}
              yLabel="People (millions)"
              source={{ name: 'ONS', dataset: 'Labour Force Survey', url: 'https://www.ons.gov.uk/employmentandlabourmarket/peoplenotinwork/economicinactivity', frequency: 'quarterly', date: '2023' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Economically inactive due to long-term sickness, UK, 2014–2023"
              subtitle="The largest single driver of the rise in inactivity since COVID. Up from 2 million to 2.8 million in four years. Mental health and musculoskeletal conditions are the primary causes."
              series={sickOnlySeries}
              annotations={[{ date: new Date(2020, 2, 1), label: '2020: Pandemic triggers surge' }]}
              yLabel="People (millions)"
              source={{ name: 'ONS', dataset: 'Labour Force Survey', url: 'https://www.ons.gov.uk/employmentandlabourmarket/peoplenotinwork/economicinactivity', frequency: 'quarterly', date: '2023' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="£2.5bn Back to Work Plan"
            value="£2.5bn"
            description="The government's Back to Work Plan (Autumn Statement 2023) committed £2.5 billion over five years to help people with disabilities and health conditions into employment. WorkWell — a pilot programme co-ordinating NHS and employment support — launched across 15 areas in 2024. Universal Support, linking economically inactive people with tailored employment coaching, targets 100,000 people by 2025. The OBR estimates getting 200,000 more people into work would add 0.3% to GDP."
            source="Source: ONS — Labour Force Survey Q4 2023; DWP — Back to Work Plan 2023."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.ons.gov.uk/employmentandlabourmarket/peoplenotinwork/economicinactivity" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ONS — Labour Force Survey: economic inactivity</a> — quarterly survey of labour market status for people aged 16–64.</p>
            <p><a href="https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/labourproductivity/articles/sicknessabsenceinthelabourmarket/latest" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ONS — Sickness absence in the labour market</a> — annual estimates of working days lost.</p>
            <p>Economic inactivity includes people neither in employment nor seeking work. Long-term sickness data covers people whose primary reason for inactivity is illness or disability lasting more than 12 months.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
