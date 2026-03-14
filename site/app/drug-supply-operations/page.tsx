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

// County lines disrupted, 2017–2024 — NCA / Home Office
const countyLinesValues = [1100, 1400, 2100, 3000, 4200, 5500, 6240, 6500];

// Drug deaths England & Wales, 2017–2024 — ONS
const drugDeathValues = [3744, 4359, 4393, 4561, 4859, 4907, 4800, 4700];

const combinedSeries: Series[] = [
  {
    id: 'county-lines',
    label: 'County lines disrupted',
    colour: '#264653',
    data: countyLinesValues.map((v, i) => ({ date: new Date(2017 + i, 0, 1), value: v })),
  },
  {
    id: 'drug-deaths',
    label: 'Drug deaths (England & Wales)',
    colour: '#E63946',
    data: drugDeathValues.map((v, i) => ({ date: new Date(2017 + i, 0, 1), value: v })),
  },
];

const drugDeathsSeries: Series[] = [
  {
    id: 'drug-deaths',
    label: 'Drug poisoning deaths',
    colour: '#E63946',
    data: drugDeathValues.map((v, i) => ({ date: new Date(2017 + i, 0, 1), value: v })),
  },
];

const annotations: Annotation[] = [
  { date: new Date(2020, 0, 1), label: '2020: COVID lockdown surge' },
];

const editorialRefs: Reference[] = [
  { num: 1, name: 'Home Office / NCA', dataset: 'County Lines Data and Trends', url: 'https://www.gov.uk/government/publications/county-lines-data-and-trends', date: '2024' },
  { num: 2, name: 'ONS', dataset: 'Deaths related to drug poisoning in England and Wales', url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/birthsdeathsandmarriages/deaths/bulletins/deathsrelatedtodrugpoisoningenglandandwales/latest', date: '2024' },
];

export default function DrugSupplyOperationsPage() {
  return (
    <>
      <TopicNav topic="Justice" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Justice"
          question="Is the War on Drugs Working?"
          finding="Over 6,500 county lines were disrupted in 2024 — yet drug deaths remain near their record high of 4,907. Supply is replaced faster than it is disrupted."
          colour="#6B7280"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The National Crime Agency&apos;s county lines disruption programme ramped from around 1,100 line disruptions in 2017 to 6,500 in 2024.<Cite nums={1} /> By any operational measure, enforcement activity has increased substantially. By the most important outcome measure — drug deaths — the picture is far less encouraging: drug poisoning deaths rose from 3,744 in 2017 to a peak of 4,907 in 2022, before falling slightly to 4,700 in 2024.<Cite nums={2} /> Drug deaths remain at near-record levels. The disconnect reflects a well-documented feature of drug markets: supply is elastic and resilient. When a county line is disrupted, demand does not disappear; within weeks or months, a new supply line typically emerges. Disruption removes individual exploiters and prevents specific harm to children used as runners, but does not reduce aggregate supply or demand at the population level.</p>
            <p>Synthetic opioids — particularly fentanyl and nitazenes — are now appearing with increasing frequency in the UK drug supply; both are far more potent than heroin and difficult to detect without drug testing, raising overdose risk substantially. Treatment services offer the strongest evidence base for reducing drug-related harm. The honest assessment is that enforcement-led responses at current levels have not demonstrably reduced drug deaths; the political obstacles to harm reduction, not its effectiveness, represent the primary barrier to better outcomes.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Lines vs Deaths' },
          { id: 'sec-chart2', label: 'Deaths trend' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="County lines disrupted (2024)"
              value="6,500"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="Record disruptions · up from 1,100 in 2017"
              sparklineData={[1100, 1400, 2100, 3000, 4200, 5500, 6240, 6500]}
              source="Home Office / NCA · County Lines Annual 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Drug deaths 2024"
              value="4,700"
              unit=""
              direction="down"
              polarity="up-is-bad"
              changeText="Slight fall from 2022 peak · but near record level"
              sparklineData={[3744, 4359, 4561, 4859, 4907, 4800, 4700]}
              source="ONS · Deaths related to drug poisoning 2024"
              href="#sec-chart2"
            />
            <MetricCard
              label="Drug arrests per year"
              value="146K"
              unit=""
              direction="flat"
              polarity="up-is-good"
              changeText="Enforcement sustained · substitution effect observed"
              sparklineData={[156, 154, 151, 148, 143, 138, 141, 146]}
              source="Home Office · Drug Misuse Statistical Bulletin 2024"
              href="#sec-chart1"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="County lines disrupted vs drug deaths, 2017–2024"
              subtitle="Enforcement activity rising sharply. Drug deaths remain near record levels. Supply is replaced faster than it is disrupted."
              series={combinedSeries}
              annotations={annotations}
              yLabel="Count"
              source={{ name: 'Home Office / ONS', dataset: 'County Lines Data / Drug Poisoning Deaths', url: 'https://www.gov.uk/government/publications/county-lines-data-and-trends', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Drug poisoning deaths, England & Wales, 2017–2024"
              subtitle="Near-record levels persist despite increased enforcement. Synthetic opioids emerging as new risk factor."
              series={drugDeathsSeries}
              annotations={[{ date: new Date(2022, 0, 1), label: '2022: Record 4,907 deaths' }]}
              yLabel="Deaths"
              source={{ name: 'ONS', dataset: 'Deaths related to drug poisoning in England and Wales', url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/birthsdeathsandmarriages/deaths/bulletins/deathsrelatedtodrugpoisoningenglandandwales/latest', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Treatment investment reversing a decade of cuts"
            value="£780M"
            description="The 2021 Ten-Year Drugs Plan committed £780 million over 2022–25 to rebuild drug treatment services after a decade of funding cuts. Treatment places have increased, naloxone distribution has expanded, and recovery rates have improved. In areas with high naloxone coverage, overdose deaths have fallen by up to 30%."
            source="Source: Home Office — From Harm to Hope: 10-year drug strategy, 2021."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.gov.uk/government/publications/county-lines-data-and-trends" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Home Office / NCA — County Lines Data and Trends</a> — annual published data on county line disruptions.</p>
            <p><a href="https://www.ons.gov.uk/peoplepopulationandcommunity/birthsdeathsandmarriages/deaths/bulletins/deathsrelatedtodrugpoisoningenglandandwales/latest" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ONS — Deaths related to drug poisoning in England and Wales</a> — annual publication.</p>
            <p>A county line disruption is defined as an operation that closes down or significantly degrades a drug supply line. Definitions have been refined over time and figures may not be directly comparable across all years.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
