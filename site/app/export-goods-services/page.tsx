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

// UK goods exports (£bn), 2015–2024 — ONS
const goodsExportValues = [230, 235, 240, 248, 252, 248, 224, 290, 310, 285];

// UK services exports (£bn), 2015–2024 — ONS
const servicesExportValues = [225, 235, 250, 265, 285, 278, 230, 278, 320, 340];

// UK export share of GDP (%), 2015–2024 — ONS
const exportGdpValues = [28.0, 28.2, 28.5, 29.0, 29.5, 29.2, 25.5, 30.5, 32.5, 31.0];

const exportSeries: Series[] = [
  {
    id: 'goods',
    label: 'Goods exports (£bn)',
    colour: '#264653',
    data: goodsExportValues.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
  {
    id: 'services',
    label: 'Services exports (£bn)',
    colour: '#2A9D8F',
    data: servicesExportValues.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
];

const gdpShareSeries: Series[] = [
  {
    id: 'export-gdp',
    label: 'Exports as % of GDP',
    colour: '#F4A261',
    data: exportGdpValues.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
];

const exportAnnotations: Annotation[] = [
  { date: new Date(2020, 0, 1), label: '2020: COVID — trade collapse' },
  { date: new Date(2021, 0, 1), label: '2021: Brexit — new trade barriers' },
];

const editorialRefs: Reference[] = [
  { num: 1, name: 'ONS', dataset: 'UK trade in services', url: 'https://www.ons.gov.uk/economy/nationalaccounts/balanceofpayments/bulletins/uktrade/latest', date: '2024' },
  { num: 2, name: 'ONS', dataset: 'UK trade in goods', url: 'https://www.ons.gov.uk/economy/nationalaccounts/balanceofpayments/bulletins/uktrade/latest', date: '2024' },
  { num: 3, name: 'ONS', dataset: 'UK national accounts', url: 'https://www.ons.gov.uk/economy/grossdomesticproductgdp', date: '2024' },
  { num: 4, name: 'Bank of England / Resolution Foundation', dataset: 'Analysis of Brexit impact on UK goods exports', url: 'https://www.resolutionfoundation.org/publications/', date: '2023' },
  { num: 5, name: 'DCMS', dataset: 'Creative Industries Sector Vision', url: 'https://www.gov.uk/government/publications/creative-industries-sector-vision', date: '2023' },
];

export default function ExportGoodsServicesPage() {
  return (
    <>
      <TopicNav topic="Exports" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Exports"
          question="Is Britain Actually Selling to the World?"
          finding="UK services exports reached £340 billion in 2024 — a record — driven by financial services, professional services, and creative industries. But goods exports have stagnated since Brexit. The UK has the largest services trade surplus of any major economy but runs a persistent goods trade deficit."
          colour="#264653"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>UK exports tell two very different stories. Services exports — financial services, professional and legal services, creative industries, education, and tourism — have grown strongly and reached a record £340 billion in 2024.<Cite nums={[1]} /> The UK has the second-largest services trade surplus in the world after the United States, reflecting London's position as the leading global financial centre and the UK's comparative advantage in knowledge-intensive services.<Cite nums={[1]} /> Services now account for a higher share of UK exports than goods for the first time — a structural shift that Brexit has, in some cases, accelerated by prompting financial firms to expand EU operations while maintaining UK headquarters.</p>
            <p>Goods exports, by contrast, have stagnated. The total value of goods exports was approximately £285 billion in 2024 — roughly flat since 2015 in nominal terms, meaning significant real decline.<Cite nums={[2]} /> Brexit created new non-tariff barriers with the EU, the UK's largest goods trading partner, increasing customs checks, rules of origin requirements, and regulatory divergence that have particularly affected smaller exporters and the food and drink sector. Several studies — including analysis by the Bank of England and Resolution Foundation — found that UK goods exports to the EU were 15–20% lower in the years following Brexit than they would have been had the UK remained in the single market.<Cite nums={[4]} /> The government's Trade and Cooperation Agreement with the EU provides tariff-free trade for goods meeting rules of origin, but non-tariff barriers remain significant.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Goods vs services' },
          { id: 'sec-chart2', label: 'Exports as % of GDP' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Services exports"
              value="£340bn"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="Record high · 2nd largest services surplus in world"
              sparklineData={[225, 235, 250, 265, 285, 278, 230, 278, 320, 340]}
              source="ONS · UK trade in services 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Goods exports"
              value="£285bn"
              unit=""
              direction="flat"
              polarity="up-is-good"
              changeText="Stagnant since 2015 · Brexit non-tariff barriers a drag"
              sparklineData={[230, 235, 240, 248, 252, 248, 224, 290, 310, 285]}
              source="ONS · UK trade in goods 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Exports as % of GDP"
              value="31%"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="Recovering from COVID dip · services share growing"
              sparklineData={[28.0, 28.2, 28.5, 29.0, 29.5, 25.5, 30.5, 32.5, 31.0]}
              source="ONS · UK national accounts 2024"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="UK goods and services exports, 2015–2024"
              subtitle="Annual value of UK exports of goods and services in £ billions. Services exports now exceed goods exports for the first time."
              series={exportSeries}
              annotations={exportAnnotations}
              yLabel="Exports (£bn)"
              source={{ name: 'ONS', dataset: 'UK trade in goods and services', url: 'https://www.ons.gov.uk/economy/nationalaccounts/balanceofpayments/bulletins/uktrade/latest', frequency: 'monthly', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="UK exports as percentage of GDP, 2015–2024"
              subtitle="Total exports (goods + services) as share of GDP. Fell sharply in 2020 due to COVID; recovering, with services driving recent growth."
              series={gdpShareSeries}
              annotations={[]}
              yLabel="Exports as % of GDP"
              source={{ name: 'ONS', dataset: 'UK national accounts', url: 'https://www.ons.gov.uk/economy/grossdomesticproductgdp', frequency: 'quarterly', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="UK creative industries export £50bn annually"
            value="£50bn"
            description="UK creative industries — including film, television, music, gaming, design, and architecture — exported approximately £50 billion in 2023, making the UK the world's second-largest exporter of creative content after the United States. The UK's soft power advantage — English language, global cultural reach, and world-class universities — creates a structural competitive advantage in services exports that is not matched by any other European economy. The DCMS estimates that for every £1 invested in the Creative Industries Sector Vision, £4 is returned in GDP. Services exports are growing faster than goods exports across the G7."
            source="Source: DCMS — Creative Industries Sector Vision 2023. ONS — UK trade in services 2024."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.ons.gov.uk/economy/nationalaccounts/balanceofpayments/bulletins/uktrade/latest" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ONS — UK trade bulletin</a> — monthly and quarterly data on UK imports and exports of goods and services.</p>
            <p><a href="https://www.ons.gov.uk/economy/grossdomesticproductgdp" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ONS — UK national accounts</a> — GDP data used to calculate export share.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
