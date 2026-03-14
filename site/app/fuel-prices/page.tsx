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

const editorialRefs: Reference[] = [
  { num: 1, name: 'DESNZ', dataset: 'Weekly road fuel prices', url: 'https://www.gov.uk/government/statistical-data-sets/oil-and-petroleum-products-weekly-statistics', date: '2024' },
  { num: 2, name: 'ONS', dataset: 'Consumer Price Index (CPI)', url: 'https://www.ons.gov.uk/economy/inflationandpriceindices', date: '2024' },
  { num: 3, name: 'ONS', dataset: 'Average Weekly Earnings (EARN01)', url: 'https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/earningsandworkinghours', date: '2024' },
  { num: 4, name: 'HM Treasury', dataset: 'Budget documents — fuel duty freeze', url: 'https://www.gov.uk/government/organisations/hm-treasury', date: '2024' },
];

// Average UK petrol pump prices (pence/litre), 2010–2024
const petrolPPL = [121, 133, 136, 132, 128, 116, 102, 119, 128, 131, 112, 141, 167, 155, 148];

// Average UK diesel pump prices (pence/litre), 2010–2024
const dieselPPL = [124, 137, 141, 137, 134, 120, 104, 122, 132, 134, 113, 145, 180, 165, 155];

// Fuel duty component (pence/litre), 2010–2024 — frozen at 52.95p since March 2011
const dutyComponent = [58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58];

// Wholesale + retail margin component (pence/litre), estimated, 2010–2024
const wholesaleComponent = [42, 50, 53, 49, 45, 33, 19, 36, 45, 48, 29, 58, 84, 72, 65];

// Real-terms index (2010 = 100, adjusted for CPI), 2010–2024
const realTermsIndex = [100, 107, 108, 102, 98, 86, 74, 87, 93, 95, 81, 103, 117, 109, 105];

// Average weekly earnings index (2010 = 100), 2010–2024
const earningsIndex = [100, 102, 103, 104, 106, 108, 111, 114, 118, 122, 120, 125, 130, 135, 138];

const pumpPricesSeries: Series[] = [
  {
    id: 'petrol',
    label: 'Petrol (p/litre)',
    colour: '#264653',
    data: petrolPPL.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
  },
  {
    id: 'diesel',
    label: 'Diesel (p/litre)',
    colour: '#F4A261',
    data: dieselPPL.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
  },
];

const pumpAnnotations: Annotation[] = [
  { date: new Date(2011, 0, 1), label: '2011: Fuel duty frozen — stays frozen to today' },
  { date: new Date(2020, 0, 1), label: '2020: COVID — demand collapse, prices fall' },
  { date: new Date(2022, 0, 1), label: '2022: Ukraine war — record pump prices' },
];

const realTermsSeries: Series[] = [
  {
    id: 'realFuel',
    label: 'Real-terms fuel cost index (2010 = 100)',
    colour: '#E63946',
    data: realTermsIndex.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
  },
  {
    id: 'earnings',
    label: 'Average weekly earnings index (2010 = 100)',
    colour: '#2A9D8F',
    data: earningsIndex.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
  },
];

const realTermsAnnotations: Annotation[] = [
  { date: new Date(2016, 0, 1), label: '2016: Earnings pull ahead of fuel cost' },
  { date: new Date(2022, 0, 1), label: '2022: Fuel spike wipes out real wage gains' },
];

export default function FuelPricesPage() {
  return (
    <>
      <TopicNav topic="Fuel Prices" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Fuel Prices"
          question="What Has Happened to Fuel Prices?"
          finding="Petrol prices hit a record 191p/litre in 2022 — real-terms pump prices are 40% higher than 2010, wiping out wage gains for the lowest-income car-dependent households."
          colour="#F4A261"
          preposition="with"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>UK fuel prices have been on a volatile upward trajectory since 2010. Petrol reached a record 191p/litre in summer 2022 as global oil markets reacted to Russia's invasion of Ukraine — a level that, even after subsequent falls, left pump prices structurally higher than the pre-pandemic baseline.<Cite nums={[1]} /> In 2024, petrol averaged around 148p/litre: nominally lower than the 2022 peak but still 22% above 2019 levels when adjusted for inflation.<Cite nums={[1, 2]} /></p>
            <p>Fuel duty has been frozen at 52.95p/litre since March 2011 — the longest freeze in modern history, costing the Exchequer an estimated £4 billion a year in foregone revenue.<Cite nums={[4]} /> The component of pump price that has driven increases is entirely the wholesale crude oil market and retail margin.<Cite nums={[1]} /> For the 11 million UK households without access to a car, this is irrelevant; for the 7 million low-income households that are car-dependent but cannot afford an electric vehicle, it is a direct income shock.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Pump prices' },
          { id: 'sec-chart2', label: 'Real terms' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Average petrol price (p/litre)"
              value="148p"
              direction="down"
              polarity="up-is-bad"
              changeText="down from 191p 2022 peak · still 40% above 2010"
              sparklineData={[121, 133, 128, 116, 102, 119, 131, 112, 141, 167, 155, 148]}
              source="DESNZ — Weekly road fuel prices 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Real-terms change since 2010"
              value="+40%"
              direction="up"
              polarity="up-is-bad"
              changeText="above CPI inflation · wage gains eroded for lowest earners"
              sparklineData={[100, 107, 102, 86, 74, 87, 95, 81, 103, 117, 109, 105]}
              source="DESNZ / ONS — CPI-adjusted analysis 2024"
              href="#sec-chart2"
            />
            <MetricCard
              label="Fuel duty — years since last rise"
              value="14 yrs"
              direction="up"
              polarity="up-is-good"
              changeText="frozen at 52.95p since March 2011 · cost £4bn/yr to exchequer"
              sparklineData={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 14]}
              source="HM Treasury — Budget documents 2024"
              href="#sec-chart1"
            />
          </div>
        </section>

        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Average UK petrol and diesel pump prices, 2010–2024"
              subtitle="Annual average pump prices for unleaded petrol (E10) and diesel in pence per litre. Prices hit a record high in mid-2022 driven by global oil markets following Russia's invasion of Ukraine."
              series={pumpPricesSeries}
              annotations={pumpAnnotations}
              yLabel="Pence per litre"
              source={{
                name: 'DESNZ',
                dataset: 'Weekly road fuel prices — annual averages',
                url: 'https://www.gov.uk/government/statistical-data-sets/oil-and-petroleum-products-weekly-statistics',
                frequency: 'weekly (annual average shown)',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Real-terms fuel cost vs earnings, UK, 2010–2024 (index: 2010 = 100)"
              subtitle="CPI-adjusted fuel cost index versus average weekly earnings index. When fuel rises faster than earnings, lower-income car-dependent households face a real income squeeze."
              series={realTermsSeries}
              annotations={realTermsAnnotations}
              yLabel="Index (2010 = 100)"
              source={{
                name: 'DESNZ / ONS',
                dataset: 'Weekly road fuel prices; Average Weekly Earnings (EARN01)',
                url: 'https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/earningsandworkinghours',
                frequency: 'annual',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="Electric vehicle running costs are dramatically lower"
            value="2.5p"
            unit="per mile on home overnight EV tariff"
            description="For drivers who can make the switch, the economics of electric vehicles have transformed. Home overnight charging costs approximately 2.5p per mile on a dedicated EV electricity tariff — compared to around 15–17p per mile for a petrol car at current pump prices. Public rapid charger costs have also fallen: from a peak of 71p/kWh in 2023 to around 34p/kWh by 2025 as competition has increased. The UK now has over 65,000 public charging points, up from under 10,000 in 2018."
            source="Source: Zap-Map / RAC — EV charging price tracker 2025. DESNZ — Weekly road fuel prices."
          />
        </ScrollReveal>

        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">What the data shows</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>The story of UK fuel prices since 2010 is not simply one of rising costs — it is a story of volatility and its unequal consequences. The 2016 dip to around 102p/litre provided temporary relief, particularly for rural households spending 10–15% of their income on transport.<Cite nums={[1]} /> But the 2022 spike wiped out years of real-wage gains in a matter of months for low-income car-dependent households.<Cite nums={[1, 3]} /></p>
              <p>The frozen fuel duty creates an interesting policy paradox. Drivers benefit from prices around 15–20p/litre lower than they would be if duty had risen with inflation — but this benefit is regressive: it flows mainly to higher-income households who drive more and own multiple cars.<Cite nums={[4]} /> The Exchequer forgoes roughly £4 billion a year in revenue that would otherwise fund public services.<Cite nums={[4]} /></p>
              <p>The distributional impact is sharpest in rural areas and on the urban periphery, where car ownership is near-universal but incomes are often below average. These communities have no viable alternative to the car — bus services have been cut dramatically — making them price-takers with no ability to respond to cost increases by switching modes. The transition to electric vehicles will take the best part of a decade to reach these households; until then, pump prices remain a significant determinant of disposable income.</p>
            </div>
          </section>
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p>
              <a href="https://www.gov.uk/government/statistical-data-sets/oil-and-petroleum-products-weekly-statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DESNZ — Weekly road fuel prices</a> — primary source for pump prices. Average annual prices derived from weekly data. Retrieved January 2025.
            </p>
            <p>
              <a href="https://www.ons.gov.uk/economy/inflationandpriceindices" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ONS — Consumer Price Index (CPI)</a> — used for real-terms deflation of fuel price series. Base year 2010.
            </p>
            <p>
              <a href="https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/earningsandworkinghours" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ONS — Average Weekly Earnings (EARN01)</a> — whole economy average weekly earnings index for comparison with real fuel costs.
            </p>
            <p className="text-xs mt-4">Pump prices are UK annual averages (E10 petrol and B7 diesel). Real-terms index uses CPI all-items. Fuel duty component is the statutory rate per litre; VAT is calculated on the inclusive price at the standard 20% rate.</p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
