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
  { num: 1, name: 'ONS', dataset: 'Labour Force Survey: economic inactivity by reason', url: 'https://www.ons.gov.uk/employmentandlabourmarket/peoplenotinwork/economicinactivity', date: '2023' },
  { num: 2, name: 'DWP', dataset: 'Inactivity and health statistics', url: 'https://www.gov.uk/government/organisations/department-for-work-pensions', date: '2023' },
  { num: 3, name: 'OBR', dataset: 'Economic and Fiscal Outlook', url: 'https://obr.uk/efo/economic-and-fiscal-outlook-march-2024/', date: '2023' },
  { num: 4, name: 'Resolution Foundation', dataset: 'Health and economic inactivity analysis', url: 'https://www.resolutionfoundation.org/publications/', date: '2023' },
];

// Inactive due to long-term sickness (millions), 2015–2025 — ONS LFS
const sicknessInactiveValues = [2.1, 2.1, 2.1, 2.1, 2.1, 2.2, 2.5, 2.7, 2.8, 2.8, 2.8];

// Mental health share of sickness inactivity (%), 2015–2025 — ONS LFS
const mentalHealthShareValues = [26, 27, 27, 28, 28, 30, 34, 36, 37, 38, 38];

// Overall inactivity rate (%), 2015–2025 — ONS LFS
const inactivityRateValues = [20.8, 20.7, 20.5, 20.5, 20.7, 21.0, 21.8, 22.1, 22.0, 22.1, 22.0];

// Sickness-specific inactivity rate (%), 2015–2025 — ONS LFS
const sicknessRateValues = [5.1, 5.1, 5.0, 5.0, 5.1, 5.2, 6.0, 6.5, 6.8, 6.7, 6.7];

const chart1Series: Series[] = [
  {
    id: 'sickness-inactive',
    label: 'Inactive due to long-term sickness (millions)',
    colour: '#E63946',
    data: sicknessInactiveValues.map((v, i) => ({ date: new Date(2015 + i, 5, 1), value: v })),
  },
  {
    id: 'mental-health-share',
    label: 'Mental health share of sickness inactivity (%)',
    colour: '#264653',
    data: mentalHealthShareValues.map((v, i) => ({ date: new Date(2015 + i, 5, 1), value: v })),
  },
];

const chart2Series: Series[] = [
  {
    id: 'inactivity-rate',
    label: 'Overall inactivity rate (%)',
    colour: '#6B7280',
    data: inactivityRateValues.map((v, i) => ({ date: new Date(2015 + i, 5, 1), value: v })),
  },
  {
    id: 'sickness-rate',
    label: 'Sickness inactivity rate (%)',
    colour: '#E63946',
    data: sicknessRateValues.map((v, i) => ({ date: new Date(2015 + i, 5, 1), value: v })),
  },
];

const chart1Annotations: Annotation[] = [
  { date: new Date(2020, 5, 1), label: '2020: Pandemic onset' },
  { date: new Date(2022, 5, 1), label: '2022: Mental health overtakes MSK' },
];

const chart2Annotations: Annotation[] = [
  { date: new Date(2023, 5, 1), label: '2023: OBR forecasts 3.5m by 2027' },
];

export default function EconomicInactivitySicknessPage() {
  return (
    <>
      <TopicNav topic="Economy & Work" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Economy & Work"
          question="Why Have 2.8 Million People Left Work Due to Ill-Health?"
          finding="Long-term sickness is now the leading reason for economic inactivity — 2.8 million people, up from 2.1 million in 2019, with mental health conditions the fastest-growing cause."
          colour="#6B7280"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Long-term sickness is now the single largest reason why working-age people are economically inactive, overtaking caring responsibilities for the first time. At 2.8 million in 2023, the number inactive due to illness is up from 2.1 million in 2019 — a rise of 700,000 in four years with no precedent in modern records.<Cite nums={[1]} /> Mental health conditions — anxiety, depression, and more severe conditions — account for 38% of the total, up from 26% in 2015.<Cite nums={[1]} /> Musculoskeletal conditions account for a further 35%.<Cite nums={[1]} /> The rise in mental health inactivity reflects not only the COVID pandemic's psychological toll but a long-running failure of NHS mental health services to treat people quickly enough to prevent deterioration into long-term incapacity.</p>
            <p>The NHS waiting list — 7.5 million cases at its peak — is a significant driver: people waiting months or years for hip replacements, spinal surgery, or mental health treatment cannot work. Resolution Foundation modelling suggests eliminating the waiting list backlog could return 170,000 people to employment.<Cite nums={[4]} /> The OBR has forecast that without intervention, sickness-related inactivity could reach 3.5 million by 2027.<Cite nums={[3]} /> The economic cost is substantial: each additional 100,000 inactive people removes approximately 0.15% from potential GDP and increases benefit expenditure by around £300 million per year.<Cite nums={[3]} /></p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Sickness & mental health' },
          { id: 'sec-chart2', label: 'Inactivity rates' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Economically inactive due to sickness"
              value="2.8M"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Record high · up 700k since 2019"
              sparklineData={[2.1, 2.1, 2.1, 2.1, 2.2, 2.5, 2.7, 2.8]}
              source="ONS · Labour Force Survey 2023"
              href="#sec-chart1"
            />
            <MetricCard
              label="Mental health inactivity share"
              value="38%"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Up from 26% in 2015 · overtook musculoskeletal"
              sparklineData={[26, 27, 28, 30, 34, 36, 37, 38]}
              source="ONS · Labour Force Survey 2023"
              href="#sec-chart1"
            />
            <MetricCard
              label="Working-age inactivity rate"
              value="22%"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Up from 20.7% in 2019 · highest in G7"
              sparklineData={[20.8, 20.7, 20.5, 21.0, 21.8, 22.1, 22.0, 22.0]}
              source="ONS · Labour Force Survey 2023"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="People economically inactive due to long-term sickness and mental health share, 2015–2025"
              subtitle="Millions of working-age people (16–64) inactive due to long-term illness (left scale) and mental health's share of that total (right scale). Both rising."
              series={chart1Series}
              annotations={chart1Annotations}
              yLabel="Value"
              source={{ name: 'ONS', dataset: 'Labour Force Survey', url: 'https://www.ons.gov.uk/employmentandlabourmarket/peoplenotinwork/economicinactivity', frequency: 'quarterly', date: '2023' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Working-age economic inactivity rate, UK, 2015–2025"
              subtitle="Overall inactivity rate and sickness-specific rate as percentage of working-age population (16–64). Both elevated since 2020."
              series={chart2Series}
              annotations={chart2Annotations}
              yLabel="Inactivity rate (%)"
              source={{ name: 'ONS', dataset: 'Labour Force Survey', url: 'https://www.ons.gov.uk/employmentandlabourmarket/peoplenotinwork/economicinactivity', frequency: 'quarterly', date: '2023' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="WorkWell programme launched across 15 areas"
            value="15"
            unit="WorkWell pilot areas — 2024"
            description="The government launched WorkWell pilots in 15 areas in 2024, combining employment support with NHS health services. Early evidence from NHS Talking Therapies shows 50% of completers with anxiety or depression return to work. The DWP Work and Health Programme supports 100,000 people per year. The OBR estimates that returning 200,000 more people to work would add 0.3% to GDP."
            source="Source: DWP — Work and Health Programme statistics 2025. NHS Talking Therapies Annual Report 2023/24."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.ons.gov.uk/employmentandlabourmarket/peoplenotinwork/economicinactivity" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ONS — Labour Force Survey: economic inactivity by reason</a> — quarterly household survey of labour market status.</p>
            <p><a href="https://www.gov.uk/government/organisations/department-for-work-pensions" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DWP — Inactivity and health statistics</a> — supplementary analysis of disability and health-related inactivity.</p>
            <p>Sickness inactivity counts people whose primary reason for not working or seeking work is illness or disability. Mental health share is derived from LFS reason category "long-term sick: mental illness or anxiety/depression".</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
