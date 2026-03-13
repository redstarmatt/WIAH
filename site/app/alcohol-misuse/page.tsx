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

// Alcohol-specific deaths, 2012–2024 — ONS
const alcoholDeathsValues = [6490, 6592, 6831, 7366, 7327, 7697, 7551, 7565, 8974, 9641, 8209, 8274, 9048];

// Hospital admissions (alcohol-related), 2012–2024 — NHS Digital
const hospitalAdmissionsValues = [720000, 750000, 780000, 810000, 840000, 870000, 880000, 900000, 840000, 870000, 880000, 890000, 900000];

// Treatment numbers vs estimated dependent drinkers, 2012–2024
const inTreatmentValues = [120000, 118000, 116000, 115000, 113000, 112000, 110000, 108000, 105000, 102000, 104000, 110000, 113200];
const estimatedDependentValues = [600000, 600000, 605000, 608000, 610000, 612000, 610000, 612000, 615000, 613000, 615000, 615000, 615000];

const series1: Series[] = [
  {
    id: 'alcohol-deaths',
    label: 'Alcohol-specific deaths',
    colour: '#E63946',
    data: alcoholDeathsValues.map((v, i) => ({ date: new Date(2012 + i, 0, 1), value: v })),
  },
];

const series2: Series[] = [
  {
    id: 'in-treatment',
    label: 'In structured treatment',
    colour: '#2A9D8F',
    data: inTreatmentValues.map((v, i) => ({ date: new Date(2012 + i, 0, 1), value: v })),
  },
  {
    id: 'estimated-dependent',
    label: 'Estimated dependent drinkers',
    colour: '#E63946',
    data: estimatedDependentValues.map((v, i) => ({ date: new Date(2012 + i, 0, 1), value: v })),
  },
];

const annotations: Annotation[] = [
  { date: new Date(2015, 0, 1), label: '2015: Local authority public health budget cuts' },
  { date: new Date(2020, 0, 1), label: '2020: COVID-19 pandemic — deaths surge' },
];

const editorialRefs: Reference[] = [
  { num: 1, name: 'ONS', dataset: 'Alcohol-specific deaths in the UK', url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/healthandsocialcare/causesofdeath/bulletins/alcoholspecificdeathsintheuk', date: '2024' },
  { num: 2, name: 'NHS Digital', dataset: 'Statistics on Alcohol, England', date: '2024' },
  { num: 3, name: 'OHID / NDTMS', dataset: 'Adult substance misuse treatment statistics', url: 'https://www.gov.uk/government/collections/statistics-from-the-national-drug-treatment-monitoring-system-ndtms', date: '2024' },
  { num: 4, name: 'Public Health Scotland', dataset: 'Evaluating the impact of minimum unit pricing', date: '2023' },
];

export default function AlcoholMisusePage() {
  return (
    <>
      <TopicNav topic="Mental Health" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Mental Health"
          question="How bad is Britain's drinking problem?"
          finding="Alcohol-specific deaths surged 20% during the pandemic and have barely fallen back. Around 900,000 hospital admissions each year are linked to alcohol, yet only 18% of dependent drinkers are in treatment — a gap that has widened as local authority budgets were cut."
          colour="#6B7280"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The COVID-19 pandemic did not create Britain's alcohol problem, but it accelerated it dramatically. Between 2019 and 2021, alcohol-specific deaths in England and Wales jumped from 7,565 to 9,641 — a 27% increase in just two years.<Cite nums={1} /> Lockdowns removed the social scaffolding — work routines, pub closing times, the presence of colleagues — that had previously kept consumption in check for many people. Three years on, deaths have barely retreated from their pandemic peak. In 2024, 9,048 people died from causes wholly attributable to alcohol — still 20% above pre-pandemic levels.<Cite nums={1} /> Most of these deaths are from alcoholic liver disease, a condition that typically takes 10–20 years of heavy drinking to develop, meaning today's death toll reflects drinking patterns established a decade ago. The surge in deaths during COVID suggests an even grimmer toll is coming.</p>
            <p>The treatment gap is the most damning statistic. An estimated 615,000 adults in England are dependent drinkers. Of those, only around 113,200 — roughly 18% — are currently in structured treatment.<Cite nums={3} /> This gap exists because local authority public health budgets, which fund alcohol services, were cut by 24% in real terms between 2015 and 2021. Many areas now have waiting lists of three months or more for community alcohol services. The deprivation gradient is brutal: alcohol-specific death rates in the most deprived areas of England are 3.5 times higher than in the least deprived.<Cite nums={1} /> Scotland's minimum unit pricing, introduced in 2018 and raised to 65p per unit in 2024, has demonstrably reduced deaths — particularly among the most deprived communities.<Cite nums={4} /> England has not introduced equivalent measures.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Alcohol deaths' },
          { id: 'sec-chart2', label: 'Treatment gap' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Alcohol-specific deaths"
              value="9,048"
              unit="2024"
              direction="up"
              polarity="up-is-bad"
              changeText="+20% vs pre-COVID · surged during pandemic · alcoholic liver disease leading cause"
              sparklineData={alcoholDeathsValues.slice(-8)}
              source="ONS · Alcohol-specific deaths, England and Wales 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Hospital admissions (alcohol-related)"
              value="900K"
              unit="per year"
              direction="up"
              polarity="up-is-bad"
              changeText="Broad measure · up 31% since 2012 · includes A&E, liver disease, mental health"
              sparklineData={hospitalAdmissionsValues.slice(-8)}
              source="NHS Digital · Statistics on Alcohol, England 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Dependent drinkers in treatment"
              value="18%"
              unit="of estimated need"
              direction="down"
              polarity="down-is-bad"
              changeText="113,200 in treatment of ~615K dependent · funding cuts drove decline"
              sparklineData={inTreatmentValues.map((v, i) => Math.round((v / estimatedDependentValues[i]) * 100)).slice(-8)}
              source="OHID · Adult substance misuse treatment statistics 2024"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Alcohol-specific deaths, England and Wales, 2012–2024"
              subtitle="Deaths from causes wholly attributable to alcohol. Pandemic surge has barely retreated — 2024 still 20% above 2019 levels."
              series={series1}
              annotations={annotations}
              yLabel="Deaths"
              source={{ name: 'ONS', dataset: 'Alcohol-specific deaths in the UK', url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/healthandsocialcare/causesofdeath/bulletins/alcoholspecificdeathsintheuk', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Alcohol treatment numbers vs estimated dependent drinkers, England, 2012–2024"
              subtitle="Only ~18% of dependent drinkers receive structured treatment (green). The treatment gap (red minus green) widened as public health budgets were cut from 2015."
              series={series2}
              annotations={[{ date: new Date(2015, 0, 1), label: '2015: Budget cuts begin' }]}
              yLabel="People"
              source={{ name: 'OHID', dataset: 'Adult substance misuse treatment statistics', url: 'https://www.gov.uk/government/collections/statistics-from-the-national-drug-treatment-monitoring-system-ndtms', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Scotland's minimum unit pricing is saving lives"
            value="13.4%"
            unit="fewer alcohol-specific deaths in Scotland after MUP introduction"
            description="Scotland introduced minimum unit pricing (MUP) at 50p per unit in May 2018, raised to 65p in September 2024. Public Health Scotland's evaluation found MUP reduced alcohol-specific deaths by an estimated 13.4% and hospital admissions by 4.1% in its first three years, with the greatest impact in the most deprived communities. Meanwhile, the Dry January campaign has grown to 8.9 million participants in 2025 — evidence that public appetite for change is running ahead of policy in England, where no equivalent pricing measure has been introduced."
            source="Source: Public Health Scotland — Evaluating the impact of MUP 2023. Alcohol Change UK — Dry January 2025 report."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.ons.gov.uk/peoplepopulationandcommunity/healthandsocialcare/causesofdeath/bulletins/alcoholspecificdeathsintheuk" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ONS — Alcohol-specific deaths in the UK</a> — annual publication using ICD-10 codes wholly attributable to alcohol.</p>
            <p><a href="https://www.gov.uk/government/collections/statistics-from-the-national-drug-treatment-monitoring-system-ndtms" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">OHID / NDTMS — Adult substance misuse treatment statistics</a> — alcohol treatment numbers in England.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
