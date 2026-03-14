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

// Total UK farm subsidies (£bn), 2015–2024 — Defra
const subsidyValues = [3.0, 3.0, 3.1, 3.1, 3.0, 3.1, 3.2, 3.1, 3.0, 2.8];

// SFI (Sustainable Farming Incentive) payments (£m), 2022–2024 — Defra
const sfiPaymentValues = [0, 0, 50, 200, 400];

// Basic Payment Scheme value (£bn), 2015–2024 — Defra
const bpsValues = [2.1, 2.1, 2.1, 2.1, 2.0, 2.0, 1.9, 1.5, 1.0, 0.6];

const subsidySeries: Series[] = [
  {
    id: 'total-subsidies',
    label: 'Total farm subsidies (£bn)',
    colour: '#2A9D8F',
    data: subsidyValues.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
  {
    id: 'bps',
    label: 'Basic Payment Scheme (£bn)',
    colour: '#6B7280',
    data: bpsValues.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
];

const sfiSeries: Series[] = [
  {
    id: 'sfi',
    label: 'SFI payments (£m)',
    colour: '#2A9D8F',
    data: sfiPaymentValues.map((v, i) => ({ date: new Date(2020 + i, 0, 1), value: v })),
  },
];

const subsidyAnnotations: Annotation[] = [
  { date: new Date(2020, 0, 1), label: '2020: Brexit — UK leaves Common Agricultural Policy' },
  { date: new Date(2022, 0, 1), label: '2022: BPS reductions begin; SFI launched' },
];

const editorialRefs: Reference[] = [
  { num: 1, name: 'Defra', dataset: 'Environmental Land Management statistics', url: 'https://www.gov.uk/government/collections/environmental-land-management-statistics', date: '2024' },
  { num: 2, name: 'Defra', dataset: 'Farm Business Survey', url: 'https://www.gov.uk/government/statistics/farm-business-survey', date: '2024' },
  { num: 3, name: 'NFU', dataset: 'Farm Business Survey', url: 'https://www.nfuonline.com/updates-and-information/research/', date: '2024' },
];

export default function FarmingSubsidiesPage() {
  return (
    <>
      <TopicNav topic="Farming Subsidies" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Farming Subsidies"
          question="Is the New Farming Subsidy System Actually Working?"
          finding="The UK is replacing the EU's area-based Basic Payment Scheme with the Environmental Land Management (ELM) scheme, which pays farmers for environmental outcomes. BPS payments have been cut from £2.1bn to £600m; SFI replacements total only £400m so far. Farmers face a funding gap."
          colour="#2A9D8F"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Brexit gave the UK the opportunity to redesign agricultural subsidies from scratch, replacing the EU's Common Agricultural Policy (CAP) — which paid farmers per hectare of land regardless of environmental outcomes — with a new system that pays for 'public goods' such as biodiversity, clean water, carbon sequestration, and animal welfare. The transition is being managed through a seven-year phase-out (2021–2027) of the Basic Payment Scheme (BPS), which paid around £2.1 billion per year.<Cite nums={[2]} /> In parallel, three new schemes have been introduced: the Sustainable Farming Incentive (SFI), Countryside Stewardship (CS), and Landscape Recovery. Together these aim to replace BPS by 2028.<Cite nums={[1]} /></p>
            <p>However, the transition is creating a serious funding gap. BPS has been cut from £2.1 billion to approximately £600 million in 2024, but SFI payments totalled only around £400 million — meaning total support for farmers fell.<Cite nums={[1, 2]} /> The NFU (National Farmers' Union) and farming charities have repeatedly warned that the pace of BPS reduction has outstripped the availability of SFI agreements, particularly for smaller farms that lack the capacity to navigate the complex application process.<Cite nums={[3]} /> A series of proposed changes to inheritance tax for agricultural land (announced in the October 2024 Budget) — removing the 100% Agricultural Property Relief for assets above £1 million — triggered large-scale farmer protests and has been estimated to affect around 70,000 farming businesses.<Cite nums={[3]} /></p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Subsidy transition' },
          { id: 'sec-chart2', label: 'SFI uptake' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Basic Payment Scheme (2024)"
              value="£600m"
              unit=""
              direction="down"
              polarity="neutral"
              changeText="Down from £2.1bn in 2019 · 71% cut in five years"
              sparklineData={[2100, 2100, 2100, 2000, 2000, 1900, 1500, 1000, 600]}
              source="Defra · Farm payment statistics 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="SFI payments (2024)"
              value="£400m"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="Up from zero in 2021 · still below BPS reduction pace"
              sparklineData={[0, 0, 50, 200, 400]}
              source="Defra · ELM scheme statistics 2024"
              href="#sec-chart2"
            />
            <MetricCard
              label="Farming businesses facing funding gap"
              value="70%"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="NFU survey: majority not yet in SFI agreements"
              sparklineData={[10, 15, 20, 25, 40, 55, 65, 70]}
              source="NFU · Farm Business Survey 2024"
              href="#sec-chart1"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="UK farm subsidies: Basic Payment Scheme vs total, 2015–2024"
              subtitle="Total farm support and Basic Payment Scheme element in £ billions. BPS being phased out between 2021 and 2028; new ELM schemes not yet filling the gap."
              series={subsidySeries}
              annotations={subsidyAnnotations}
              yLabel="Payments (£bn)"
              source={{ name: 'Defra', dataset: 'Farm business survey and payment data', url: 'https://www.gov.uk/government/collections/agri-climate-report', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Sustainable Farming Incentive payments, England, 2020–2024"
              subtitle="Annual payments under the SFI scheme, which pays farmers for environmental actions including soil health, hedgerow management, and water quality. Uptake growing but below BPS levels."
              series={sfiSeries}
              annotations={[{ date: new Date(2022, 0, 1), label: '2022: SFI launched' }]}
              yLabel="Payments (£m)"
              source={{ name: 'Defra', dataset: 'Environmental Land Management statistics', url: 'https://www.gov.uk/government/collections/environmental-land-management-statistics', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="SFI covers 4.5 million hectares of English farmland"
            value="4.5M ha"
            description="By 2024, the Sustainable Farming Incentive scheme had enrolled over 4.5 million hectares of English farmland — around 28% of total agricultural area — in agreements paying for soil testing, cover crops, hedgerow management, and low-input grassland. The Climate Change Committee has assessed ELM as the most significant opportunity to restore biodiversity on agricultural land since the postwar period. If SFI and Landscape Recovery are adequately funded and maintained over a decade, they could reverse decades of agricultural biodiversity loss and contribute significantly to the government's 30×30 nature target."
            source="Source: Defra — Environmental Land Management statistics 2024. Climate Change Committee — Land use: Policies for a Net Zero UK."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.gov.uk/government/collections/environmental-land-management-statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Defra — Environmental Land Management statistics</a> — uptake and payment data for SFI, Countryside Stewardship, and Landscape Recovery.</p>
            <p><a href="https://www.gov.uk/government/statistics/farm-business-survey" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Defra — Farm Business Survey</a> — annual survey of farm incomes, costs, and subsidy receipts in England.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
