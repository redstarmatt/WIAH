'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import PositiveCallout from '@/components/PositiveCallout';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

// Drug poisoning deaths England & Wales, 2013–2022 — ONS
const deathValues = [2732, 2952, 3346, 3744, 3756, 4359, 4393, 4561, 4859, 4907];

// Adults in drug treatment (thousands), 2013–2022 — NDTMS
const treatmentValues = [311, 305, 295, 287, 280, 273, 270, 268, 272, 276];

const deathsSeries: Series[] = [
  {
    id: 'drug-deaths',
    label: 'Drug poisoning deaths',
    colour: '#E63946',
    data: deathValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })),
  },
];

const treatmentSeries: Series[] = [
  {
    id: 'treatment-numbers',
    label: 'Adults in treatment (thousands)',
    colour: '#264653',
    data: treatmentValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })),
  },
];

const deathsAnnotations: Annotation[] = [
  { date: new Date(2021, 5, 1), label: '2021: Record high 4,907 deaths' },
];

const treatmentAnnotations: Annotation[] = [
  { date: new Date(2013, 5, 1), label: '2013–20: Real-terms funding cuts' },
];

export default function DrugMisusePage() {
  return (
    <>
      <TopicNav topic="Health" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Health"
          question="How many people are dying from drugs?"
          finding="Drug poisoning deaths in England and Wales reached a record 4,907 in 2022 and have remained at near-record levels, driven by an ageing cohort of opioid users and the spread of synthetic drugs."
          colour="#6B7280"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>There were 4,907 drug poisoning deaths registered in England and Wales in 2022 — the highest annual total on record. The UK has the highest drug-related death rate in Europe by most measures. The typical profile is a man in his 40s or 50s with a long history of opioid dependency, tracking back to the heroin epidemic that flooded post-industrial towns in the 1980s and 1990s. Scotland's death rate is approximately three times that of England, concentrated in Glasgow, Dundee, and other post-industrial cities. An estimated 300,000 people in England have a dependency on heroin or crack cocaine, but only around 150,000 are in structured treatment at any one time. Drug treatment funding fell by around 35% in real terms between 2013 and 2020; the 2021 Ten-Year Drugs Strategy committed £780 million to rebuilding it.</p>
            <p>The geography of drug deaths maps closely onto the geography of deindustrialisation: communities that lost industrial employment in the 1980s face the highest rates of drug mortality four decades later. Nitazenes — synthetic opioids far more potent than heroin — have been detected in the UK drug supply with increasing frequency since 2021, raising overdose risk at doses that would previously have been considered safe. Drug checking services, where people test substances before use, have demonstrated they can identify dangerous adulterants and change behaviour, but regulatory and political barriers to expanding them remain substantial.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Deaths trend' },
          { id: 'sec-chart2', label: 'Treatment' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Drug poisoning deaths (2022)"
              value="4,907"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Record high · up from 2,732 in 2013"
              sparklineData={[2732, 2952, 3346, 3756, 4359, 4561, 4859, 4907]}
              source="ONS · Drug poisoning mortality 2022"
              href="#sec-chart1"
            />
            <MetricCard
              label="Heroin/morphine deaths"
              value="2,241"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="46% of all drug deaths · opioid crisis deepening"
              sparklineData={[1200, 1350, 1600, 1750, 2000, 2050, 2150, 2241]}
              source="ONS · Opioid-related deaths 2022"
              href="#sec-chart1"
            />
            <MetricCard
              label="People in drug treatment"
              value="276K"
              unit=""
              direction="down"
              polarity="up-is-good"
              changeText="Down from 311K in 2013 · capacity stagnated"
              sparklineData={[311, 305, 295, 287, 280, 273, 270, 276]}
              source="NDTMS · Adults in drug and alcohol treatment 2022"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Drug poisoning deaths, England & Wales, 2013–2022"
              subtitle="Annual deaths registered. Includes legal and illegal drugs. Near-continuous rise over the decade."
              series={deathsSeries}
              annotations={deathsAnnotations}
              yLabel="Deaths"
              source={{ name: 'Office for National Statistics', dataset: 'Deaths related to drug poisoning in England and Wales', url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/birthsdeathsandmarriages/deaths/bulletins/deathsrelatedtodrugpoisoningenglandandwales/latest', frequency: 'annual', date: '2022' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Adults in drug and alcohol treatment, England, 2013–2022"
              subtitle="Thousands of adults in structured treatment. Treatment capacity declined as budgets were cut after 2013."
              series={treatmentSeries}
              annotations={treatmentAnnotations}
              yLabel="People in treatment (thousands)"
              source={{ name: 'National Drug Treatment Monitoring System', dataset: 'Adult drug and alcohol treatment activity', url: 'https://www.ndtms.net/', frequency: 'annual', date: '2022' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="£780 million treatment investment"
            value="£780M"
            description="The government's 2021 drug strategy committed £780 million over three years to treatment and recovery services — reversing a decade of cuts. New funding has increased treatment places and the number of naloxone (overdose-reversal drug) kits distributed in the community. Recovery rates have improved: 45% of those completing structured treatment are recorded as free from dependence."
            source="Source: Home Office — 10-year drug strategy 'From Harm to Hope', 2021."
          />
        </ScrollReveal>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.ons.gov.uk/peoplepopulationandcommunity/birthsdeathsandmarriages/deaths/bulletins/deathsrelatedtodrugpoisoningenglandandwales/latest" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ONS — Deaths related to drug poisoning in England and Wales</a> — annual publication including all deaths where drug poisoning is mentioned on death certificate.</p>
            <p><a href="https://www.ndtms.net/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NDTMS — Adult drug and alcohol treatment activity</a> — all adults in structured community or residential treatment in England.</p>
            <p>Deaths lag by 12–18 months due to the inquest process. Treatment numbers reflect programme activity, not unique individuals.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
