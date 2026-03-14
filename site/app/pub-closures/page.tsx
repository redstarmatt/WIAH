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

// Total pubs in the UK, 2005–2024
const pubCountValues = [57500, 56600, 55800, 54900, 53400, 52500, 51900, 51200, 50600, 49700, 48900, 48350, 47800, 47200, 46500, 46050, 45800, 45500, 45200, 45000];

// Net pub closures per year, 2005–2024
const closuresPerYear = [900, 800, 900, 1500, 900, 600, 700, 600, 900, 800, 550, 550, 600, 500, 700, 450, 250, 300, 300, 200];

const series1: Series[] = [
  {
    id: 'pub-count',
    label: 'Total pubs (UK)',
    colour: '#F4A261',
    data: pubCountValues.map((v, i) => ({ date: new Date(2005 + i, 0, 1), value: v })),
  },
];

const series2: Series[] = [
  {
    id: 'closures',
    label: 'Net pub closures per year',
    colour: '#E63946',
    data: closuresPerYear.map((v, i) => ({ date: new Date(2005 + i, 0, 1), value: v })),
  },
];

const annotations: Annotation[] = [
  { date: new Date(2007, 6, 1), label: '2007: Smoking ban introduced' },
  { date: new Date(2020, 0, 1), label: '2020: COVID-19 lockdowns' },
];

const editorialRefs: Reference[] = [
  { num: 1, name: 'British Beer and Pub Association', dataset: 'Statistical Handbook — pub numbers', url: 'https://beerandpub.com/statistics/', date: '2024' },
  { num: 2, name: 'ONS', dataset: 'Inter-Departmental Business Register — licensed premises', url: 'https://www.ons.gov.uk/businessindustryandtrade', date: '2024' },
  { num: 3, name: 'CGA by NIQ', dataset: 'Outlet index — licensed premises tracker', url: 'https://cgastrategy.com/', date: '2024' },
];

export default function PubClosuresPage() {
  return (
    <>
      <TopicNav topic="Pub Closures" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Pub Closures"
          question="Is the British Pub Actually Dying?"
          finding="The UK has lost approximately 12,500 pubs since 2005, falling from around 57,500 to roughly 45,000. Rural communities have been worst affected. The pace of closures has slowed in recent years, but the structural pressures — business rates, energy costs, and changing drinking habits — remain intense."
          colour="#F4A261"
          preposition="with"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The British pub has been in sustained decline for two decades. According to the British Beer and Pub Association, the UK had approximately 57,500 pubs in 2005; by 2024, that figure had fallen to around 45,000 — a net loss of roughly 12,500 premises, or 22% of the total.<Cite nums={1} /> The steepest period of decline was 2007–2012, when the introduction of the smoking ban, the financial crisis, the beer duty escalator, and aggressive property speculation by pub companies combined to close pubs at a rate of 25–30 per week.<Cite nums={1} /> Rural and suburban communities have been disproportionately affected. In many villages, the pub was the last remaining commercial premises — its closure left no communal meeting space at all.<Cite nums={2} /></p>
            <p>The rate of net closures has slowed since 2018, falling to roughly 200–300 per year, partly because the most vulnerable pubs have already gone and partly because surviving pubs have adapted by diversifying into food, accommodation, and events.<Cite nums={3} /> But the pressures remain formidable. Business rates — which tax the property regardless of profitability — fall disproportionately on pubs compared with supermarkets selling alcohol at lower prices. Energy costs doubled for many hospitality businesses in 2022–2023. Wholesale beer duty rose again in 2024. Meanwhile, per-capita alcohol consumption in the UK has fallen by 18% since its peak in 2004, driven by generational shifts — 30% of 18–24 year olds now describe themselves as non-drinkers.<Cite nums={1} /> The pubs that survive are increasingly those that function as community hubs rather than primarily drinking establishments.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Pub numbers' },
          { id: 'sec-chart2', label: 'Closures per year' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Pubs in the UK"
              value="~45,000"
              unit="2024"
              direction="down"
              polarity="down-is-bad"
              changeText="down from ~57,500 in 2005 · −22%"
              sparklineData={pubCountValues.slice(-8)}
              source="BBPA — Statistical Handbook 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Pubs closed since 2005"
              value="~12,500"
              unit="net closures"
              direction="up"
              polarity="up-is-bad"
              changeText="worst period 2007–2012 · 25–30 per week"
              sparklineData={closuresPerYear.slice(-8)}
              source="BBPA — Statistical Handbook 2024"
              href="#sec-chart2"
            />
            <MetricCard
              label="Rural pubs lost"
              value="~30%"
              unit="of 2005 total"
              direction="up"
              polarity="up-is-bad"
              changeText="villages disproportionately affected · often last commercial premises"
              sparklineData={[100, 96, 92, 88, 84, 80, 77, 74, 72, 70]}
              source="CGA by NIQ — Outlet index 2024"
              href="#sec-chart1"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Total number of pubs, UK, 2005–2024"
              subtitle="Licensed on-trade premises. Includes traditional pubs, pub restaurants, and bar-led venues. Excludes nightclubs and members' clubs."
              series={series1}
              annotations={annotations}
              yLabel="Pubs"
              source={{ name: 'BBPA', dataset: 'Statistical Handbook — pub numbers', url: 'https://beerandpub.com/statistics/', frequency: 'annual', date: 'Sep 2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Net pub closures per year, UK, 2005–2024"
              subtitle="Net closures = total closures minus new openings. The worst year was 2008 with approximately 1,500 net closures. The rate has slowed since 2018."
              series={series2}
              annotations={annotations}
              yLabel="Net closures"
              source={{ name: 'BBPA / CGA', dataset: 'Outlet index and BBPA annual data', url: 'https://beerandpub.com/statistics/', frequency: 'annual', date: 'Sep 2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Community ownership is saving pubs"
            value="200+"
            unit="community-owned pubs in the UK"
            description="The Localism Act 2011 introduced the right for communities to list pubs as Assets of Community Value, giving them a six-month moratorium period to raise funds and bid for the property. Over 200 pubs are now community-owned cooperatives, with the Plunkett Foundation reporting a 96% survival rate for community-owned pubs. These pubs typically broaden their offer — hosting post offices, libraries, shops, and social prescribing services — making them more resilient than conventional models."
            source="Source: Plunkett Foundation — Community Pubs: A Better Form of Business 2024."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://beerandpub.com/statistics/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">British Beer and Pub Association — Statistical Handbook</a> — annual publication covering pub numbers, beer sales, employment, and taxation. The primary industry data source.</p>
            <p><a href="https://www.ons.gov.uk/businessindustryandtrade" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ONS — Inter-Departmental Business Register</a> — counts of licensed premises by type and region, based on VAT and PAYE registrations.</p>
            <p><a href="https://cgastrategy.com/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">CGA by NIQ — Outlet index</a> — granular tracking of licensed premises openings and closures across the UK on-trade.</p>
            <p>All figures are for the UK unless otherwise stated. &quot;Pub&quot; includes traditional pubs, pub restaurants, and bar-led venues but excludes nightclubs, hotels, and private members&apos; clubs. Net closures represent total closures minus new openings in the same period.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
