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

// Ofgem price cap (£/year, typical dual fuel), quarterly 2019–2025 — Ofgem
const priceCap = [1137, 1138, 1138, 1138, 1138, 1138, 1138, 1277, 1277, 1971, 2500, 3549, 3000, 2500, 2100, 1834, 1717, 1717, 1717, 1717, 1849, 1923, 1717, 1717];

// Fuel poor households (millions), 2019–2024 — DESNZ
const fuelPoorValues = [2.38, 2.40, 2.50, 3.20, 3.44, 3.12, 2.80];

// Standing charge electricity (p/day), 2019–2024 — Ofgem
const standingChargeValues = [24.1, 24.5, 25.0, 29.0, 46.0, 61.0, 61.0];

const priceSeries: Series[] = [
  {
    id: 'price-cap',
    label: 'Ofgem price cap (£/year)',
    colour: '#E63946',
    data: priceCap.map((v, i) => {
      const quarter = i % 4;
      const year = 2019 + Math.floor(i / 4);
      return { date: new Date(year, quarter * 3, 1), value: v };
    }),
  },
];

const fuelPovertySeries: Series[] = [
  {
    id: 'fuel-poor',
    label: 'Fuel poor households (millions)',
    colour: '#F4A261',
    data: fuelPoorValues.map((v, i) => ({ date: new Date(2019 + i, 0, 1), value: v })),
  },
];

const priceAnnotations: Annotation[] = [
  { date: new Date(2022, 2, 1), label: '2022: Russia invades Ukraine' },
  { date: new Date(2022, 9, 1), label: 'Oct 2022: Cap peaks at £3,549' },
  { date: new Date(2023, 0, 1), label: '2023: Energy Price Guarantee ends' },
];

const povertyAnnotations: Annotation[] = [
  { date: new Date(2022, 0, 1), label: '2022: 3.4 million fuel poor' },
];

const editorialRefs: Reference[] = [
  { num: 1, name: 'Ofgem', dataset: 'Energy price cap quarterly update', url: 'https://www.ofgem.gov.uk/check-if-energy-price-cap-affects-you', date: '2025' },
  { num: 2, name: 'DESNZ', dataset: 'Annual Fuel Poverty Statistics', url: 'https://www.gov.uk/government/collections/fuel-poverty-statistics', date: '2024' },
  { num: 3, name: 'Ofgem', dataset: 'Standing charge data', date: '2024' },
  { num: 4, name: 'DESNZ', dataset: 'Warm Homes Plan', date: '2024' },
];

export default function EnergyBillsPage() {
  return (
    <>
      <TopicNav topic="Energy Bills" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Energy Bills"
          question="Can People Actually Afford to Heat Their Homes?"
          finding="The typical energy bill peaked at £3,549 a year in October 2022 — more than three times its pre-crisis level. Fuel poverty hit 3.4 million households. Standing charges more than doubled between 2019 and 2024, raising the fixed cost of having energy regardless of consumption."
          colour="#F4A261"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The Ofgem energy price cap — introduced in 2019 to protect consumers on default tariffs — became the central instrument of energy affordability policy when wholesale gas prices surged following Russia's invasion of Ukraine in February 2022. The cap rose from £1,138 per year in spring 2022 to a peak of £3,549 per year in October 2022 — a 212% increase in eight months.<Cite nums={1} /> The government's Energy Price Guarantee, which effectively superseded the cap for several quarters, limited bills to around £2,500 per year at a fiscal cost of approximately £25 billion. As wholesale prices fell, the cap returned toward £1,717 by mid-2023, though this remains 50% above pre-crisis levels.<Cite nums={1} /></p>
            <p>The standing charge — the fixed daily cost of being connected to the electricity grid, regardless of use — more than doubled from around 24p per day in 2019 to over 61p per day in 2024<Cite nums={3} />, disproportionately affecting low-consumption households including single occupiers, carers, and those in fuel poverty. The DESNZ fuel poverty estimate reached 3.44 million households in 2022<Cite nums={2} />, with the South East having higher absolute numbers but lower rates than the North East and Wales. Insulation remains the structural solution: upgrading from EPC E to C rating reduces annual bills by around £500 and reduces exposure to gas price volatility. The government's Warm Homes Plan commits £6.6 billion to insulation over five years<Cite nums={4} />, but this falls short of the Climate Change Committee's assessment of what is needed.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Price cap' },
          { id: 'sec-chart2', label: 'Fuel poverty' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Ofgem price cap (typical)"
              value="£1,717"
              unit="/year"
              direction="down"
              polarity="up-is-bad"
              changeText="Down from £3,549 peak · still 50% above pre-crisis £1,138"
              sparklineData={[1137, 1138, 1971, 2500, 3549, 3000, 2500, 2100, 1834, 1717]}
              source="Ofgem · Energy price cap quarterly update 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Fuel poor households"
              value="2.8M"
              unit=""
              direction="down"
              polarity="up-is-bad"
              changeText="Down from 3.4M peak in 2022 · still above pre-crisis 2.4M"
              sparklineData={[2.38, 2.40, 2.50, 3.20, 3.44, 3.12, 2.80]}
              source="DESNZ · Annual Fuel Poverty Statistics 2024"
              href="#sec-chart2"
            />
            <MetricCard
              label="Electricity standing charge"
              value="61p"
              unit="/day"
              direction="up"
              polarity="up-is-bad"
              changeText="Up from 24p in 2019 · fixed cost hits low-consumption households hardest"
              sparklineData={[24.1, 24.5, 25.0, 29.0, 46.0, 61.0, 61.0]}
              source="Ofgem · Standing charge data 2024"
              href="#sec-chart1"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Ofgem energy price cap, UK, 2019–2025"
              subtitle="Typical annual dual-fuel household bill under the price cap. Peaked at £3,549 in Q4 2022. Values are quarterly."
              series={priceSeries}
              annotations={priceAnnotations}
              yLabel="Annual bill (£)"
              source={{ name: 'Ofgem', dataset: 'Energy price cap quarterly update', url: 'https://www.ofgem.gov.uk/check-if-energy-price-cap-affects-you', frequency: 'quarterly', date: '2025' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Fuel poor households, England, 2019–2024"
              subtitle="Households in fuel poverty under the Low Income Low Energy Efficiency (LILEE) definition. Rose to 3.4 million at the 2022 peak."
              series={fuelPovertySeries}
              annotations={povertyAnnotations}
              yLabel="Fuel poor households (millions)"
              source={{ name: 'DESNZ', dataset: 'Annual Fuel Poverty Statistics', url: 'https://www.gov.uk/government/collections/fuel-poverty-statistics', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Home insulation could save £500/year per household"
            value="£500"
            description="Upgrading a typical home from EPC band E to band C reduces annual energy bills by approximately £500 at current prices — and eliminates significant exposure to future gas price volatility. The government's Warm Homes Plan commits £6.6 billion over five years to help 5 million homes insulate and switch to low-carbon heating. The Great British Insulation Scheme targets 300,000 of the least efficient homes. Evidence from Germany's KfW programme shows that deep retrofit delivered at scale reduces whole-system energy costs — not just individual bills — by improving grid efficiency and reducing peak gas demand."
            source="Source: DESNZ — Warm Homes Plan 2024. Climate Change Committee — Progress in reducing emissions 2024."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.ofgem.gov.uk/check-if-energy-price-cap-affects-you" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Ofgem — Energy price cap</a> — quarterly updates to the default tariff cap for typical dual-fuel households.</p>
            <p><a href="https://www.gov.uk/government/collections/fuel-poverty-statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DESNZ — Annual Fuel Poverty Statistics</a> — estimates of fuel poverty in England using the Low Income Low Energy Efficiency (LILEE) definition.</p>
            <p>Standing charge data sourced from Ofgem quarterly tariff breakdowns. Fuel poverty estimates are for England only; Scotland, Wales, and Northern Ireland use different definitions and publication schedules.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
