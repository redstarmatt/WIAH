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

// Asylum applications, UK, 2017–2024 — Home Office
const applicationsValues = [26547, 35566, 35099, 56040, 74751, 84425, 98519, 84000];

// People awaiting initial decision (thousands), 2017–2024 — Home Office
const pendingCasesValues = [30, 37, 44, 64, 100, 134, 220, 170];

// Hotel accommodation cost (£bn), 2019–2024 — Home Office / DLUHC
const hotelCostValues = [0.3, 0.5, 0.8, 1.4, 2.8, 4.0];

const series1: Series[] = [
  {
    id: 'applications',
    label: 'Asylum applications',
    colour: '#264653',
    data: applicationsValues.map((v, i) => ({ date: new Date(2017 + i, 0, 1), value: v })),
  },
];

const series2: Series[] = [
  {
    id: 'pending',
    label: 'People awaiting initial decision (thousands)',
    colour: '#E63946',
    data: pendingCasesValues.map((v, i) => ({ date: new Date(2017 + i, 0, 1), value: v * 1000 })),
  },
];

const annotations: Annotation[] = [
  { date: new Date(2021, 0, 1), label: '2021: Afghan evacuations — applications surge' },
  { date: new Date(2022, 0, 1), label: '2022: Small boat crossings exceed 45,000' },
  { date: new Date(2023, 0, 1), label: '2023: 2,500 new caseworkers recruited' },
];

const editorialRefs: Reference[] = [
  { num: 1, name: 'Home Office', dataset: 'Immigration System Statistics — Asylum and Resettlement', url: 'https://www.gov.uk/government/collections/immigration-statistics-quarterly-release', date: '2024' },
  { num: 2, name: 'Home Office', dataset: 'Asylum Accommodation Statistics', url: 'https://www.gov.uk/government/collections/immigration-statistics-quarterly-release', date: '2024' },
  { num: 3, name: 'NAO', dataset: 'Investigation into the costs of the Rwanda policy', url: 'https://www.nao.org.uk/reports/investigation-into-the-costs-of-the-rwanda-policy/', date: '2024' },
];

export default function AsylumSystemPage() {
  return (
    <>
      <TopicNav topic="Asylum System" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Immigration & Population"
          question="How broken is Britain's asylum system?"
          finding="98,519 asylum applications were made in the UK in 2023 — a post-war record. Over 220,000 people were awaiting an initial decision at year end, with an average wait of 26 months. The system was spending £4 billion a year housing asylum seekers in hotels — and 61% of decisions ultimately granted protection."
          colour="#264653"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Britain's asylum system is processing more claims than at any point since records began. The 98,519 applications lodged in 2023 surpassed the previous record of 74,751 set in 2022, driven by 45,756 small boat crossings and continuing displacement from Afghanistan, Iran, and Syria.<Cite nums={1} /> At the end of 2023, more than 220,000 people were awaiting an initial decision — a backlog that leaves applicants in legal limbo for an average of 26 months.<Cite nums={1} /> The UK nonetheless receives fewer asylum seekers per capita than France, Germany, or Austria. The backlog is primarily an administrative failure: Home Office caseworker numbers were cut by more than a third during the 2010s austerity programme, hollowing out decision-making capacity just as global displacement accelerated. The resulting accommodation crisis cost £4 billion in 2022/23, housing 56,000 asylum seekers in hotels at roughly £150 per person per night.<Cite nums={2} /></p>
            <p>Policy responses have focused on deterrence rather than processing speed. The Rwanda deportation scheme, struck down by the Supreme Court as unlawful in November 2023, cost over £590 million before a single flight departed.<Cite nums={3} /> Meanwhile, the data on outcomes tells a different story: 61% of initial decisions in 2023 granted protection, with grant rates of 98% for Afghans, 95% for Syrians, and 86% for Eritreans.<Cite nums={1} /> Some 40% of refusals are overturned on appeal.<Cite nums={1} /> The people waiting in the system are overwhelmingly from countries where the UK has historically recognised the need for protection. Faster processing would save money, allow those with valid claims to work and contribute sooner, and deter those without viable claims from applying. A major caseworker recruitment drive in 2023 has since reduced the backlog significantly, with over 100,000 decisions made in 2024 alone.<Cite nums={1} /></p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Applications' },
          { id: 'sec-chart2', label: 'Backlog' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Asylum applications (annual)"
              value="98,519"
              unit="2023"
              direction="up"
              polarity="up-is-bad"
              changeText="Post-war record · up from 29K in 2017 · Afghans, Iranians, Syrians · 45K+ small boat arrivals"
              sparklineData={applicationsValues}
              source="Home Office — Asylum and Resettlement Statistics 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="People awaiting initial decision"
              value="220K+"
              unit="end 2023"
              direction="up"
              polarity="up-is-bad"
              changeText="Average wait: 26 months · up from 30K in 2017 · now reducing"
              sparklineData={pendingCasesValues}
              source="Home Office — Asylum and Resettlement Statistics 2024"
              href="#sec-chart2"
            />
            <MetricCard
              label="Hotel accommodation cost"
              value="£4bn"
              unit="2023"
              direction="up"
              polarity="up-is-bad"
              changeText="Up from £300m in 2019 · £150/person/night · 56K in hotels"
              sparklineData={hotelCostValues}
              source="Home Office — Asylum Accommodation Statistics 2024"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Asylum applications, UK, 2017–2024"
              subtitle="Total asylum applications lodged annually. Rose sharply from 2021 driven by Afghan evacuations, Channel crossings, and global displacement. 2023 was a post-war record."
              series={series1}
              annotations={annotations}
              yLabel="Applications"
              source={{ name: 'Home Office', dataset: 'Asylum and Resettlement Statistics', url: 'https://www.gov.uk/government/collections/immigration-statistics-quarterly-release', frequency: 'quarterly', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="People awaiting an asylum decision, UK, 2017–2024"
              subtitle="Cases pending an initial Home Office decision. Peaked at over 220,000 in 2023 following COVID disruption and a decade of caseworker cuts. Reducing from 2023 following major recruitment."
              series={series2}
              annotations={[{ date: new Date(2020, 0, 1), label: '2020: COVID halts casework for months' }]}
              yLabel="Pending cases"
              source={{ name: 'Home Office', dataset: 'Asylum and Resettlement Statistics', url: 'https://www.gov.uk/government/collections/immigration-statistics-quarterly-release', frequency: 'quarterly', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="61% of asylum decisions grant protection — faster processing saves money"
            value="61%"
            unit="of initial asylum decisions in 2023 granted some form of protection"
            description="Despite the political framing around deterrence, 61% of initial asylum decisions in 2023 granted protection — 44% full refugee status and 17% humanitarian protection or leave to remain. For Afghans and Syrians, grant rates exceed 95%. The backlog is primarily an administrative and capacity failure: most people in the system will ultimately be granted the right to stay. A caseworker recruitment drive in 2023 delivered over 100,000 decisions in 2024 — reducing the backlog from 220,000 to around 82,000 and saving hundreds of millions in accommodation costs. Faster processing is not just more humane — it is substantially cheaper than the current system of prolonged hotel accommodation."
            source="Source: Home Office — Immigration Statistics Year Ending December 2023. IPPR — The Cost of the Asylum Backlog 2023."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.gov.uk/government/collections/immigration-statistics-quarterly-release" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Home Office — Immigration System Statistics</a> — quarterly publication. Covers asylum applications, initial decisions, grants and refusals, accommodation, and resettlement statistics.</p>
            <p>Pending cases refers to cases awaiting an initial decision from the Home Office. Grant rate is the proportion of substantive initial decisions resulting in refugee status or leave to remain. Hotel costs are from Home Office accommodation expenditure data. The Rwanda scheme cost estimate covers 2022–2024 and includes treaty negotiation, processing infrastructure, and legal costs across multiple departments. Grant rates by nationality are from Home Office country-of-origin data tables.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
