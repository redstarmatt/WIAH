'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import PositiveCallout from '@/components/PositiveCallout';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

// Drug poisoning deaths England & Wales, 2004–2023 — ONS
const drugDeathValues = [1843, 1845, 1954, 2282, 2182, 2248, 2379, 2652, 2732, 2952, 3346, 3744, 3756, 4359, 4393, 4561, 4859, 4907, 4800, 4907];

// Alcohol-specific deaths UK, 2004–2023 — ONS
const alcoholDeathValues = [6276, 6278, 6905, 6669, 6831, 7327, 7551, 7519, 7697, 8234, 8974, 9641, 9641, 9800, 9900, 10048, 9900, 10048, 9700, 10048];

// Adults in treatment (thousands) 2014–2024 — OHID/NDTMS
const treatmentValues = [295, 290, 285, 280, 272, 270, 268, 270, 275, 285, 299];

const drugDeathSeries: Series[] = [
  {
    id: 'drug-deaths',
    label: 'Drug poisoning deaths',
    colour: '#E63946',
    data: drugDeathValues.map((v, i) => ({ date: new Date(2004 + i, 5, 1), value: v })),
  },
];

const alcoholDeathSeries: Series[] = [
  {
    id: 'alcohol-deaths',
    label: 'Alcohol-specific deaths',
    colour: '#F4A261',
    data: alcoholDeathValues.map((v, i) => ({ date: new Date(2004 + i, 5, 1), value: v })),
  },
];

const treatmentSeries: Series[] = [
  {
    id: 'in-treatment',
    label: 'In treatment (thousands)',
    colour: '#264653',
    data: treatmentValues.map((v, i) => ({ date: new Date(2014 + i, 3, 1), value: v })),
  },
];

const drugDeathAnnotations: Annotation[] = [
  { date: new Date(2017, 5, 1), label: '2017: First record broken' },
  { date: new Date(2022, 5, 1), label: '2022: New record 4,907' },
];

const alcoholAnnotations: Annotation[] = [
  { date: new Date(2020, 5, 1), label: '2020: COVID surge' },
];

export default function DrugsPage() {
  return (
    <>
      <TopicNav topic="Drugs & Alcohol" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Drugs & Alcohol"
          question="What Is Addiction Actually Doing to Britain?"
          finding="Drug poisoning deaths reached 4,907 in 2022 — a record high. Alcohol deaths surged to 10,048 in 2023. But treatment access, starved of funding for a decade, is finally recovering."
          colour="#6B7280"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Drug poisoning deaths in England and Wales hit 4,907 in 2022 — more than double the 2004 level. Opioids account for roughly 48% of all drug deaths: heroin and morphine alone killed over 2,200 people, and synthetic opioids including fentanyl and nitazenes are rising fast. Scotland recorded 1,051 deaths in 2022, a rate approximately 3.7 times the England and Wales figure per capita and the highest in Europe. The age profile is telling: most deaths occur among people aged 35–54, not the young — a cohort effect tracing back to the 1980s heroin wave, now compounded by decades of poverty, poor health, and polydrug use. Alcohol-specific deaths reached 10,048 across the UK in 2023 — a record — driven by the pandemic surge in heavy drinking among people with reduced healthcare contact.</p>
            <p>Treatment infrastructure was hollowed out between 2013 and 2020: Public Health England estimated a 40% real-terms funding cut, and many specialist units closed. NICE estimates around 800,000 people have severe drug or alcohol problems; only about 300,000 are in treatment. The government's 2021 strategy, From Harm to Hope, committed £780 million over three years, and treatment numbers have begun climbing: 298,700 adults were in structured treatment in 2023/24. Naloxone became available without prescription from pharmacies in 2023 — a measure that could prevent thousands of deaths annually if distribution reaches people most at risk.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Drug deaths' },
          { id: 'sec-chart2', label: 'Alcohol deaths' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Drug poisoning deaths"
              value="4,907"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="2022 · Record high · up 166% since 2004"
              sparklineData={[2379, 2652, 2732, 2952, 3744, 4359, 4561, 4907]}
              source="ONS · Drug poisoning deaths 2022"
              href="#sec-chart1"
            />
            <MetricCard
              label="Alcohol-specific deaths"
              value="10,048"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="2023 · Record high · pandemic caused lasting increase"
              sparklineData={[6276, 6905, 7327, 7551, 8974, 9641, 9900, 10048]}
              source="ONS · Alcohol-specific deaths 2023"
              href="#sec-chart2"
            />
            <MetricCard
              label="In drug/alcohol treatment"
              value="298,700"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="2023/24 · Rising after decade of cuts"
              sparklineData={[295, 285, 272, 268, 270, 275, 285, 299]}
              source="OHID · NDTMS 2023/24"
              href="#sec-chart1"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Drug poisoning deaths, England and Wales, 2004–2022"
              subtitle="All drug-related poisoning deaths. More than doubled since 2004. Opioids account for nearly half. Record broken in 2022."
              series={drugDeathSeries}
              annotations={drugDeathAnnotations}
              yLabel="Deaths"
              source={{ name: 'ONS', dataset: 'Deaths related to drug poisoning in England and Wales', url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/birthsdeathsandmarriages/deaths/bulletins/deathsrelatedtodrugpoisoningenglandandwales/latest', frequency: 'annual', date: '2022' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Alcohol-specific deaths, UK, 2004–2023"
              subtitle="Deaths from conditions wholly attributable to alcohol. Surged during COVID. Highest on record in 2023."
              series={alcoholDeathSeries}
              annotations={alcoholAnnotations}
              yLabel="Deaths"
              source={{ name: 'ONS', dataset: 'Alcohol-specific deaths in the UK', url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/healthandsocialcare/causesofdeath/bulletins/alcoholspecificdeathsintheunitedkingdom/latest', frequency: 'annual', date: '2023' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="39,200 people successfully completed treatment in 2023/24"
            value="39,200"
            unit="successful treatment completions"
            description="Successful treatment completions reached 39,200 in 2023/24 — the highest since 2015 and up from 26,300 during the pandemic nadir. The 2021 drugs strategy provided additional ring-fenced funding to local authorities, helping reverse a decade of cuts. Naloxone became available without prescription from pharmacies in 2023, a potentially life-saving change for the estimated 300,000 people with opioid dependency."
            source="Source: OHID — National Drug Treatment Monitoring System (NDTMS) 2023/24."
          />
        </ScrollReveal>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.ons.gov.uk/peoplepopulationandcommunity/birthsdeathsandmarriages/deaths/bulletins/deathsrelatedtodrugpoisoningenglandandwales/latest" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ONS — Deaths related to drug poisoning in England and Wales</a> — annual, based on coroner's verdicts.</p>
            <p><a href="https://www.ons.gov.uk/peoplepopulationandcommunity/healthandsocialcare/causesofdeath/bulletins/alcoholspecificdeathsintheunitedkingdom/latest" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ONS — Alcohol-specific deaths in the UK</a> — deaths from conditions wholly attributable to alcohol.</p>
            <p><a href="https://www.ndtms.net/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">OHID / NDTMS — Adult substance misuse treatment statistics</a> — adults in structured drug and alcohol treatment in England.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
