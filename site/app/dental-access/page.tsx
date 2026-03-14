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

// NHS dental activity: courses of treatment (millions), 2015–2024 — NHS BSA
const dentalActivityValues = [39.8, 40.2, 40.0, 39.5, 38.8, 23.4, 28.1, 33.5, 35.8, 36.2];

// Adults seen by NHS dentist in previous 24 months (millions), 2015–2024
const adultsSeen24mValues = [22.0, 22.1, 21.8, 21.3, 20.9, 16.4, 15.8, 17.2, 18.5, 19.1];

// NHS dentists performing NHS work (thousands), 2015–2024
const nhsDentistValues = [24.3, 24.5, 24.1, 23.8, 23.5, 23.0, 22.1, 21.6, 21.2, 20.8];
const privateDentistValues = [10.1, 10.5, 11.0, 11.4, 11.9, 12.0, 13.2, 14.1, 14.8, 15.3];

const series1: Series[] = [
  {
    id: 'dental-activity',
    label: 'Courses of treatment (millions)',
    colour: '#E63946',
    data: dentalActivityValues.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
  {
    id: 'adults-seen',
    label: 'Adults seen in 24 months (millions)',
    colour: '#264653',
    data: adultsSeen24mValues.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
];

const series2: Series[] = [
  {
    id: 'nhs-dentists',
    label: 'NHS dentists (thousands)',
    colour: '#E63946',
    data: nhsDentistValues.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
  {
    id: 'private-dentists',
    label: 'Private-only dentists (thousands)',
    colour: '#2A9D8F',
    data: privateDentistValues.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
];

const annotations: Annotation[] = [
  { date: new Date(2020, 2, 1), label: '2020: COVID-19 shuts dental practices' },
  { date: new Date(2022, 6, 1), label: '2022: Dental recovery plan announced' },
];

const editorialRefs: Reference[] = [
  { num: 1, name: 'NHS Business Services Authority', dataset: 'NHS Dental Statistics for England', url: 'https://www.nhsbsa.nhs.uk/statistical-collections/dental-statistics', date: '2024' },
  { num: 2, name: 'British Dental Association', dataset: 'Dental access and workforce data', url: 'https://www.bda.org/advice/patients/', date: '2024' },
  { num: 3, name: 'NHS Digital', dataset: 'NHS Dental Statistics — Patients seen', url: 'https://digital.nhs.uk/data-and-information/publications/statistical/nhs-dental-statistics', date: '2024' },
];

export default function DentalAccessPage() {
  return (
    <>
      <TopicNav topic="Dental Access" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Dental Access"
          question="Can You Actually See an NHS Dentist?"
          finding="Approximately 25 million adults in England have not seen an NHS dentist in the past two years. The NHS dental contract, largely unchanged since 2006, has driven a steady exodus of dentists to private practice, creating dental deserts across rural and coastal England."
          colour="#E63946"
          preposition="with"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>NHS dentistry in England is in structural decline. The number of courses of dental treatment delivered annually fell from 40.2 million in 2016 to 36.2 million in 2024, having collapsed to 23.4 million during the first year of the pandemic.<Cite nums={1} /> Activity has never returned to pre-COVID levels. Approximately 25 million adults — more than half the adult population — have not seen an NHS dentist within the recommended 24-month window.<Cite nums={3} /> The BDA estimates that around 10 million people have tried and failed to get an NHS dental appointment in the past year, with many resorting to DIY dentistry or travelling long distances.<Cite nums={2} /></p>
            <p>The root cause is the 2006 NHS dental contract, which pays dentists in Units of Dental Activity (UDAs) rather than per treatment. The fixed-value UDA system means complex treatments pay little more than simple check-ups, creating a perverse incentive to avoid patients with the greatest need. Since 2015, the number of dentists performing NHS work has fallen from 24,300 to 20,800, while those working exclusively in private practice has grown from 10,100 to 15,300.<Cite nums={1} /> The effect is geographical: in coastal and rural areas of Cornwall, Lincolnshire, and Cumbria, NHS dental deserts have formed where no practice is accepting new patients. The government's 2022 dental recovery plan offered modest incentives but has not reversed the trend. Without fundamental contract reform, the two-tier system will continue to widen.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Activity trend' },
          { id: 'sec-chart2', label: 'Workforce shift' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Adults not seen NHS dentist in 2 years"
              value="~25M"
              unit="2024"
              direction="up"
              polarity="up-is-bad"
              changeText="up from ~18M pre-COVID · more than half of all adults"
              sparklineData={[18.0, 18.5, 19.2, 19.9, 28.0, 29.1, 27.5, 25.0]}
              source="NHS Digital — Dental Statistics 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="NHS dentists leaving for private"
              value="14.4%"
              unit="decline since 2015"
              direction="up"
              polarity="up-is-bad"
              changeText="3,500 fewer dentists doing NHS work · private sector growing"
              sparklineData={nhsDentistValues.slice(-8)}
              source="NHS BSA — Dental workforce 2024"
              href="#sec-chart2"
            />
            <MetricCard
              label="Dental deserts (no NHS access)"
              value="~130"
              unit="local authority areas"
              direction="up"
              polarity="up-is-bad"
              changeText="areas where no NHS dentist is accepting new adult patients"
              sparklineData={[45, 58, 65, 78, 90, 105, 118, 130]}
              source="BDA — Access tracker 2024"
              href="#sec-chart1"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="NHS dental activity and patient access, England, 2015–2024"
              subtitle="Courses of treatment delivered and adults seen by an NHS dentist in the previous 24 months. Activity has not recovered to pre-pandemic levels."
              series={series1}
              annotations={annotations}
              yLabel="Millions"
              source={{ name: 'NHS BSA', dataset: 'NHS Dental Statistics for England', url: 'https://www.nhsbsa.nhs.uk/statistical-collections/dental-statistics', frequency: 'annual', date: 'Aug 2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="NHS vs private dental workforce, England, 2015–2024"
              subtitle="Dentists performing NHS work (red) declining while private-only dentists (green) grow. The contract drives the exodus."
              series={series2}
              annotations={[{ date: new Date(2006, 3, 1), label: '2006 contract remains unreformed' }]}
              yLabel="Dentists (thousands)"
              source={{ name: 'NHS BSA', dataset: 'Dental workforce — NHS and private', url: 'https://www.nhsbsa.nhs.uk/statistical-collections/dental-statistics', frequency: 'annual', date: 'Aug 2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Supervised toothbrushing: prevention at scale"
            value="300k"
            unit="children in programme"
            description="The government's supervised toothbrushing programme, launched in 2024, aims to provide daily brushing with fluoride toothpaste in nurseries and primary schools in the most deprived areas. Based on evidence from similar programmes in Scotland and Wales, which reduced tooth decay in five-year-olds by up to 30%, the scheme targets 300,000 children in its first phase. While it does not address the adult access crisis, it represents the most significant upstream prevention measure in a generation and could significantly reduce the 26,000 child tooth extractions performed under general anaesthetic each year."
            source="Source: OHID — Supervised toothbrushing programme guidance 2024. PHE dental health survey."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.nhsbsa.nhs.uk/statistical-collections/dental-statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS BSA — NHS Dental Statistics</a> — primary source for treatment volumes, patient numbers, and workforce data. Published annually with quarterly updates.</p>
            <p><a href="https://digital.nhs.uk/data-and-information/publications/statistical/nhs-dental-statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS Digital — NHS Dental Statistics</a> — patients seen data by geography and patient type.</p>
            <p>All figures are for England. &quot;Dental deserts&quot; are defined as local authority areas where Healthwatch or BDA surveys found no NHS dental practice accepting new adult patients. The 24-month patient window is the NHS standard recall period for adults.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
