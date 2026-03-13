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

const editorialRefs: Reference[] = [
  { num: 1, name: 'NHS England', dataset: 'Gambling Disorder Treatment Services', url: 'https://www.england.nhs.uk/mental-health/gambling/', date: '2024' },
  { num: 2, name: 'Gambling Commission', dataset: 'Problem gambling prevalence data', url: 'https://www.gamblingcommission.gov.uk/statistics-and-research', date: '2024' },
  { num: 3, name: 'DCMS', dataset: 'Gambling Reform White Paper', url: 'https://www.gov.uk/government/publications/high-stakes-gambling-reform-for-the-digital-age', date: '2023' },
  { num: 4, name: 'GamCare', dataset: 'Annual helpline statistics', date: '2023' },
];

// NHS gambling clinics in England, 2019–2024
const nhsClinics = [2, 3, 7, 11, 15, 15];
// Treatment capacity (annual slots), 2019–2024
const treatmentCapacity = [800, 1200, 2800, 4400, 6000, 6200];
// Problem gamblers receiving treatment (thousands), 2019–2024
const receivingTreatmentK = [0.8, 1.2, 2.8, 4.4, 6.0, 6.2];
// Problem gamblers (thousands) — stable at ~320k, 2019–2024
const problemGamblersK = [300, 310, 295, 305, 310, 315];

const clinicCapacitySeries: Series[] = [
  {
    id: 'nhs-clinics',
    label: 'NHS gambling clinics',
    colour: '#F4A261',
    data: nhsClinics.map((v, i) => ({ date: new Date(2019 + i, 0, 1), value: v })),
  },
  {
    id: 'treatment-capacity',
    label: 'Treatment capacity (hundreds/year)',
    colour: '#2A9D8F',
    data: treatmentCapacity.map((v, i) => ({ date: new Date(2019 + i, 0, 1), value: v / 100 })),
  },
];

const needGapSeries: Series[] = [
  {
    id: 'problem-gamblers',
    label: 'Problem gamblers (thousands)',
    colour: '#E63946',
    data: problemGamblersK.map((v, i) => ({ date: new Date(2019 + i, 0, 1), value: v })),
  },
  {
    id: 'receiving-treatment',
    label: 'Receiving NHS treatment (thousands)',
    colour: '#2A9D8F',
    data: receivingTreatmentK.map((v, i) => ({ date: new Date(2019 + i, 0, 1), value: v })),
  },
];

const clinicAnnotations: Annotation[] = [
  { date: new Date(2021, 0, 1), label: '2021: NHS gambling clinic expansion begins' },
  { date: new Date(2023, 0, 1), label: '2023: Mandatory levy funds treatment' },
];

const needAnnotations: Annotation[] = [
  { date: new Date(2023, 0, 1), label: '2023: Statutory levy replaces voluntary contributions' },
];

export default function GamblingHarmTreatmentPage() {
  return (
    <>
      <TopicNav topic="Gambling" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Gambling"
          question="Can People Get Help for Problem Gambling?"
          finding="Problem gambling affects around 300,000 people in England but NHS treatment capacity covers fewer than 1 in 48. The 2023 mandatory levy will fund 15 clinics — but waiting times of 6–8 weeks remain and geographic gaps persist."
          colour="#F4A261"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Gambling disorder affects approximately 290,000 to 340,000 people in England, with a further 1.5 million at moderate risk.<Cite nums={[2]} /> The Gambling Commission estimates gambling-related harms cost the UK economy approximately £1.4 billion per year in health, social care, and criminal justice costs.<Cite nums={[2]} /> Until 2019, the National Problem Gambling Clinic in London was the sole NHS provider. By 2024, 15 specialist clinics operate across England with a combined capacity of approximately 6,200 people per year — a 7.5-fold expansion in five years, funded initially from voluntary operator contributions and subsequently from a mandatory statutory levy introduced in 2023.<Cite nums={[1, 3]} /> Waiting times at many clinics still extend to six to eight weeks.<Cite nums={[1]} /></p>
            <p>Despite this expansion, NHS capacity can treat approximately 2.1% of problem gamblers — fewer than one in 48.<Cite nums={[1, 2]} /> The gap between provision and need is most acute for those in areas without clinics, those whose gambling disorder coexists with other addictions or mental health conditions, and those who cannot access face-to-face services. Debt, family breakdown, domestic abuse, and suicide are all significantly elevated among problem gamblers. The suicide rate among problem gamblers is estimated at 15 times the national average.<Cite nums={[2]} /> Harms extend well beyond the individual and fall hardest on households already in financial difficulty. GamCare's helpline received 47,000 contacts in 2023, and the Samaritans report that gambling harm is increasingly cited in crisis calls.<Cite nums={[4]} /></p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Clinic Growth' },
          { id: 'sec-chart2', label: 'Treatment Gap' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="NHS gambling clinics"
              value="15"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="Up from 2 in 2019 · 7.5× expansion in 5 years"
              sparklineData={nhsClinics.slice(-8)}
              source="NHS England · Gambling Disorder Services 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Treatment capacity"
              value="6,200"
              unit="/year"
              direction="up"
              polarity="up-is-good"
              changeText="Annual treatment slots · up from 800 in 2019"
              sparklineData={treatmentCapacity.slice(-8).map(v => v / 1000)}
              source="NHS England · Gambling Clinics 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Problem gamblers receiving treatment"
              value="2.1%"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="Fewer than 1 in 48 · significant unmet need"
              sparklineData={[0.3, 0.4, 0.9, 1.5, 2.0, 2.1]}
              source="NHS England / Gambling Commission 2024"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="NHS gambling clinic expansion, England, 2019–2024"
              subtitle="Number of specialist NHS clinics (amber) and annual treatment capacity in hundreds (green). Rapid expansion from a near-zero base following mandatory funding."
              series={clinicCapacitySeries}
              annotations={clinicAnnotations}
              yLabel="Clinics / Capacity (hundreds)"
              source={{ name: 'NHS England', dataset: 'Gambling Disorder Treatment Services', url: 'https://www.england.nhs.uk/mental-health/gambling/', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Problem gamblers vs those receiving NHS treatment, 2019–2024"
              subtitle="Problem gamblers in England (red, thousands) compared to those receiving NHS treatment (green, thousands). The gap between lines is the unmet treatment need."
              series={needGapSeries}
              annotations={needAnnotations}
              yLabel="People (thousands)"
              source={{ name: 'NHS England / Gambling Commission', dataset: 'Gambling Disorder Services / Health Survey for England', url: 'https://www.gamblingcommission.gov.uk/statistics-and-research', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="From 2 to 15 NHS clinics — and a £100m mandatory levy from 2025"
            value="15"
            unit="NHS specialist gambling clinics in England"
            description="The NHS has expanded from 2 specialist gambling clinics in 2019 to 15 by 2024, funded first by voluntary operator contributions and then by a mandatory statutory levy. The £100 million annual levy from 2025 will fund treatment, prevention, and research on a sustainable basis, replacing the previous voluntary system where operators contributed just £10 million per year. GamStop self-exclusion has 480,000 registered users, and Gamban software blocks gambling websites on devices for registered users. These structural changes represent the first time problem gambling treatment has been funded at scale by those who profit from the activity."
            source="Source: NHS England — Gambling Disorder Treatment Services 2024. Gambling Commission — Annual Report 2024. DCMS — Gambling Reform White Paper 2023."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.england.nhs.uk/mental-health/gambling/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS England — Gambling Disorder Treatment Services</a> — Clinic locations, capacity, and waiting times. Retrieved 2025.</p>
            <p><a href="https://www.gamblingcommission.gov.uk/statistics-and-research" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Gambling Commission — Problem gambling prevalence data</a> — Health Survey for England and Gambling Commission surveys using the Problem Gambling Severity Index. Retrieved 2025.</p>
            <p>Problem gambling prevalence estimate uses the PGSI threshold score of 8 or above for problem gambling. Treatment capacity reflects annual appointment slots, not unique patients, as some patients require multiple sessions.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
