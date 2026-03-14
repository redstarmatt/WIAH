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

// Renewable share of electricity generation (%), 2010–2024 — DESNZ
const renewableShareValues = [7, 10, 12, 15, 19, 25, 25, 30, 33, 37, 40, 37, 39, 42, 45];

// Electricity price index (2015=100), 2015–2024 — ONS
const electricityPriceValues = [100, 102, 104, 107, 110, 112, 120, 155, 210, 185, 160];

// Gas price index (2015=100), 2015–2024 — ONS
const gasPriceValues = [100, 98, 99, 103, 108, 107, 115, 190, 310, 240, 180];

// Fuel poverty (%), 2015–2024 — DESNZ
const fuelPovertyValues = [11.0, 11.1, 11.1, 11.0, 11.9, 13.2, 12.5, 16.0, 19.0, 17.2, 14.8];

const renewableSeries: Series[] = [
  {
    id: 'renewables',
    label: 'Renewable share of electricity (%)',
    colour: '#2A9D8F',
    data: renewableShareValues.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
  },
];

const energyPriceSeries: Series[] = [
  {
    id: 'electricity',
    label: 'Electricity price index (2015=100)',
    colour: '#F4A261',
    data: electricityPriceValues.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
  {
    id: 'gas',
    label: 'Gas price index (2015=100)',
    colour: '#E63946',
    data: gasPriceValues.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
];

const renewableAnnotations: Annotation[] = [
  { date: new Date(2015, 0, 1), label: '2015: Paris Agreement' },
  { date: new Date(2019, 0, 1), label: '2019: Net zero target enacted' },
];

const priceAnnotations: Annotation[] = [
  { date: new Date(2022, 0, 1), label: '2022: Russia invades Ukraine — gas price spike' },
];

const editorialRefs: Reference[] = [
  { num: 1, name: 'DESNZ', dataset: 'Energy Trends: UK electricity', url: 'https://www.gov.uk/government/statistics/electricity-section-5-energy-trends', date: '2024' },
  { num: 2, name: 'DESNZ', dataset: 'Annual Fuel Poverty Statistics', url: 'https://www.gov.uk/government/collections/fuel-poverty-statistics', date: '2024' },
  { num: 3, name: 'ONS', dataset: 'Consumer Price Inflation (MM22)', url: 'https://www.ons.gov.uk/economy/inflationandpriceindices/datasets/consumerpriceinflation', date: '2024' },
  { num: 4, name: 'Climate Change Committee', dataset: 'Progress Report to Parliament', url: 'https://www.theccc.org.uk/publication/progress-in-reducing-emissions-2024-report-to-parliament/', date: '2024' },
];

export default function EnergyPage() {
  return (
    <>
      <TopicNav topic="Energy" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Energy"
          question="Is Britain Actually Going Green?"
          finding="Renewables now generate 45% of UK electricity — up from 7% in 2010. But energy prices spiked 200% in 2022 following the gas price shock, pushing 19% of households into fuel poverty. The transition is rapid but not yet insulating consumers from fossil fuel volatility."
          colour="#2A9D8F"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The UK's electricity system has undergone a structural transformation over the past fifteen years. Renewables — primarily wind (onshore and offshore) and solar — generated 45% of all electricity in 2024, up from just 7% in 2010.<Cite nums={1} /> The UK now has the largest installed offshore wind capacity in the world. Coal, which contributed 40% of electricity in 2010, has been virtually eliminated: the last coal power station closed in September 2024.<Cite nums={1} /> This is among the fastest fossil fuel phase-outs of any major economy. The Climate Change Committee has assessed the UK as on track to decarbonise electricity by 2035, though grid infrastructure investment and planning reform are bottlenecks.<Cite nums={4} /></p>
            <p>Despite this structural progress, household energy prices doubled over the 2022–23 cost-of-living crisis<Cite nums={3} />, driven by the UK's heavy remaining dependence on gas — both for direct heating and for setting the marginal price of electricity. The fuel poverty rate rose from around 11% in 2019 to a peak of 19% in 2022<Cite nums={2} />, before falling as the government's Energy Price Guarantee capped bills. The structural problem remains: an electricity market tied to gas prices means consumers cannot yet benefit financially from the cheapness of wind and solar. Market reform proposals — including decoupling electricity prices from gas — remain under consultation. Insulating the 25 million homes still dependent on gas heating is the central challenge of the 2030s.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Renewable generation' },
          { id: 'sec-chart2', label: 'Energy prices' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Renewable electricity share"
              value="45%"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="Up from 7% in 2010 · largest offshore wind capacity globally"
              sparklineData={[7, 10, 15, 19, 25, 30, 33, 37, 40, 45]}
              source="DESNZ · Energy Trends 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Household fuel poverty rate"
              value="14.8%"
              unit=""
              direction="down"
              polarity="up-is-bad"
              changeText="Down from 19% peak in 2022 · still above pre-crisis level"
              sparklineData={[11.0, 11.1, 11.0, 11.9, 13.2, 16.0, 19.0, 17.2, 14.8]}
              source="DESNZ · Annual Fuel Poverty Statistics 2024"
              href="#sec-chart2"
            />
            <MetricCard
              label="Gas price index vs 2015"
              value="+80%"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Gas peaked at 3x 2015 level in 2022 · structural vulnerability to global markets"
              sparklineData={[100, 99, 103, 108, 107, 115, 190, 310, 240, 180]}
              source="ONS · Energy prices 2024"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Renewable share of UK electricity generation, 2010–2024"
              subtitle="Wind, solar, hydro, and other renewables as percentage of total electricity generated. Rapid growth driven by offshore wind build-out."
              series={renewableSeries}
              annotations={renewableAnnotations}
              yLabel="% of electricity generated"
              source={{ name: 'DESNZ', dataset: 'Energy Trends: UK electricity', url: 'https://www.gov.uk/government/statistics/electricity-section-5-energy-trends', frequency: 'quarterly', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="UK household energy price indices, 2015–2024"
              subtitle="Electricity and gas prices relative to 2015=100. Gas peaked at over 3x its 2015 level in 2022 following the Russian invasion of Ukraine."
              series={energyPriceSeries}
              annotations={priceAnnotations}
              yLabel="Price index (2015=100)"
              source={{ name: 'ONS', dataset: 'Energy prices (MM22)', url: 'https://www.ons.gov.uk/economy/inflationandpriceindices/datasets/consumerpriceinflation', frequency: 'monthly', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="UK world leader in offshore wind — 14 GW installed"
            value="14 GW"
            description="The UK has more installed offshore wind capacity than any other country — around 14 GW in 2024, generating enough electricity for 16 million homes. The government has committed to 50 GW by 2030 under the Clean Power 2030 Action Plan. Offshore wind costs have fallen 70% since 2014, making new projects cheaper than gas for the first time. The Crown Estate seabed leasing programme has attracted over £60 billion in private investment. If current build rates are maintained, the UK's electricity system could be fully decarbonised by 2033."
            source="Source: DESNZ — Energy Trends 2024. RenewableUK — Wind Energy Statistics 2024."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.gov.uk/government/statistics/electricity-section-5-energy-trends" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DESNZ — Energy Trends: UK electricity</a> — quarterly statistics on electricity generation by fuel type.</p>
            <p><a href="https://www.gov.uk/government/collections/fuel-poverty-statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DESNZ — Annual Fuel Poverty Statistics</a> — estimates of fuel poverty under the Low Income Low Energy Efficiency definition.</p>
            <p><a href="https://www.ons.gov.uk/economy/inflationandpriceindices/datasets/consumerpriceinflation" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ONS — Consumer Price Inflation (MM22)</a> — domestic energy price indices within the CPI basket.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
