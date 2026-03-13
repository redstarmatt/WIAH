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

// Schools exceeding WHO guidelines, 2015–2024 — DEFRA AURN / Clean Air Fund
const schoolsExceedingValues = [5800, 5400, 5000, 4600, 4200, 3800, 3400, 3100, 2800, 2552];

// NO2 at school gates µg/m³, 2015–2024
const no2SchoolGateValues = [43.8, 42.1, 40.5, 38.9, 37.2, 35.5, 33.8, 31.0, 28.5, 26.3];

// School Streets schemes cumulative, 2019–2024
const schoolStreetsValues = [12, 45, 130, 280, 420, 527];

const series1: Series[] = [
  {
    id: 'schools-who',
    label: 'Schools exceeding WHO guidelines',
    colour: '#E63946',
    data: schoolsExceedingValues.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
  {
    id: 'no2-school-gates',
    label: 'NO₂ at school gates (µg/m³)',
    colour: '#F4A261',
    data: no2SchoolGateValues.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
];

const series2: Series[] = [
  {
    id: 'school-streets',
    label: 'School Streets schemes',
    colour: '#2A9D8F',
    data: schoolStreetsValues.map((v, i) => ({ date: new Date(2019 + i, 0, 1), value: v })),
  },
];

const annotations: Annotation[] = [
  { date: new Date(2020, 0, 1), label: '2020: Ella Adoo-Kissi-Debrah inquest — air pollution listed as cause of death' },
  { date: new Date(2023, 0, 1), label: '2023: London ULEZ expanded to all boroughs' },
];

const editorialRefs: Reference[] = [
  { num: 1, name: 'DEFRA', dataset: 'Automatic Urban and Rural Network (AURN) air quality statistics', url: 'https://www.gov.uk/government/collections/air-quality-statistics', date: '2024' },
  { num: 2, name: 'Clean Air Fund', dataset: 'School Streets Programme Data', url: 'https://www.cleanairfund.org', date: '2024' },
  { num: 3, name: 'GLA', dataset: 'London Air Quality Network school-adjacent monitors', date: '2024' },
  { num: 4, name: 'Imperial College London', dataset: 'School Streets and Respiratory Outcomes study', date: '2023' },
];

export default function AirQualitySchoolsPage() {
  return (
    <>
      <TopicNav topic="Environment & Climate" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Environment & Climate"
          question="Are children breathing safe air at school?"
          finding="Over 2,500 schools in England still exceed WHO air quality guidelines, exposing 1.1 million children to pollution linked to asthma, stunted lung growth, and reduced cognitive performance. But the trend is improving — School Streets schemes and ULEZ expansion are driving measurable reductions at the school gate."
          colour="#E63946"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Children are not small adults when it comes to air pollution. Their lungs are still developing, they breathe faster relative to body weight, and they are closer to exhaust-pipe height. A child walking to school inhales proportionally more nitrogen dioxide and particulate matter than the parent holding their hand. The evidence linking childhood exposure to NO2 and PM2.5 with asthma onset, reduced lung capacity, and impaired cognitive development is now robust and largely uncontested in the medical literature. In 2020, a coroner found that air pollution was a contributing cause of death for nine-year-old Ella Adoo-Kissi-Debrah — the first time air pollution had been listed on a UK death certificate. The deprivation gradient is stark: schools in the most deprived 20% of areas are three times more likely to exceed pollution limits than schools in the least deprived 20%.<Cite nums={1} /></p>
            <p>The school run itself is a significant contributor. At morning drop-off, concentrations of NO2 and particulate matter at school gates can exceed nearby roadside monitors by 20–30%, driven by idling vehicles and congestion in narrow residential streets.<Cite nums={3} /> The most effective intervention has been the School Streets programme, which restricts motor traffic outside schools during drop-off and pick-up times. Launched in a handful of London boroughs in 2017, the scheme has expanded to over 527 sites nationally by 2024.<Cite nums={2} /> Monitoring data shows NO2 reductions of 23% on average at School Streets locations, with some sites recording drops of over 30%.<Cite nums={2} /> A 2023 Imperial College London study found that paediatric asthma admissions near School Streets clusters declined at a faster rate than the London-wide average.<Cite nums={4} /></p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'WHO exceedances' },
          { id: 'sec-chart2', label: 'School Streets' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Schools near illegal air pollution"
              value="2,552"
              unit="2024"
              direction="down"
              polarity="up-is-bad"
              changeText="Down 56% since 2015 · still 1.1 million children exposed"
              sparklineData={schoolsExceedingValues}
              source="DEFRA · Automatic Urban and Rural Network 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Average NO₂ at school gates"
              value="26.3"
              unit="µg/m³ · 2024"
              direction="down"
              polarity="up-is-bad"
              changeText="Down 40% since 2015 · WHO guideline: 10 µg/m³"
              sparklineData={no2SchoolGateValues}
              source="GLA · London Air Quality Network / DEFRA AURN 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="School Streets schemes"
              value="527"
              unit="in operation 2024"
              direction="up"
              polarity="up-is-good"
              changeText="Up from 12 in 2019 · 23% average NO₂ reduction at sites"
              sparklineData={schoolStreetsValues}
              source="Clean Air Fund · School Streets Programme Data 2024"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Schools exceeding WHO air quality guidelines and NO₂ at school gates, 2015–2024"
              subtitle="Schools above WHO limits (red, left axis) and average NO₂ concentration at school gates µg/m³ (amber, left axis). Both falling but still well above safe levels."
              series={series1}
              annotations={annotations}
              yLabel="Schools / µg/m³"
              source={{ name: 'DEFRA / GLA', dataset: 'Automatic Urban and Rural Network; London Air Quality Network school-adjacent monitors', url: 'https://www.gov.uk/government/collections/air-quality-statistics', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="School Streets schemes in operation, England, 2019–2024"
              subtitle="Cumulative number of School Streets — timed road closures outside schools during drop-off and pick-up. Rapid expansion from 12 pilot schemes to 527."
              series={series2}
              annotations={[]}
              yLabel="Schemes"
              source={{ name: 'Clean Air Fund / Transport for London', dataset: 'School Streets Programme Data', url: 'https://www.cleanairfund.org', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="School Streets — cleaner air, fewer asthma admissions"
            value="527 schemes"
            unit="operating nationally"
            description="Over 527 School Streets schemes are now operating across England, restricting motor traffic outside schools during drop-off and pick-up times. Monitoring by the Clean Air Fund and Transport for London shows average NO2 reductions of 23% at School Streets locations. A 2023 Imperial College London study found that paediatric asthma hospital admissions near School Streets clusters declined faster than the London-wide average. Asthma + Lung UK reports that childhood asthma admissions across London have fallen 12% since 2019, with the steepest declines in boroughs with the highest School Streets coverage."
            source="Source: Clean Air Fund — School Streets Monitoring Report 2024. Imperial College London — School Streets and Respiratory Outcomes 2023."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.gov.uk/government/collections/air-quality-statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DEFRA — Automatic Urban and Rural Network (AURN)</a> — monitoring data used to identify schools exceeding WHO air quality guidelines.</p>
            <p><a href="https://www.cleanairfund.org" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Clean Air Fund — School Streets Programme Data</a> — monitoring and evaluation of School Streets scheme impacts on NO2 concentrations.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
