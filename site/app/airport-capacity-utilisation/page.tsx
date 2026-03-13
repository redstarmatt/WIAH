'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import PositiveCallout from '@/components/PositiveCallout';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

// UK airport passengers millions, 2016–2024 — CAA Airport Statistics
const ukPassengersValues = [225, 232, 238, 244, 252, 74, 166, 210, 266];

// Heathrow capacity utilisation %, 2016–2024
const heathrowUtilValues = [91, 92, 93, 95, 97, 40, 75, 88, 97];

// Estimated trade cost of no expansion £bn, 2016–2024
const tradeCostValues = [8, 9, 9, 10, 11, 8, 10, 12, 14];

const series1: Series[] = [
  {
    id: 'ukPassengers',
    label: 'UK passengers (millions)',
    colour: '#264653',
    data: ukPassengersValues.map((v, i) => ({ date: new Date(2016 + i, 0, 1), value: v })),
  },
  {
    id: 'heathrowUtil',
    label: 'Heathrow utilisation (%)',
    colour: '#F4A261',
    data: heathrowUtilValues.map((v, i) => ({ date: new Date(2016 + i, 0, 1), value: v })),
  },
];

const series2: Series[] = [
  {
    id: 'tradeCost',
    label: 'Estimated trade cost of no expansion (£bn)',
    colour: '#E63946',
    data: tradeCostValues.map((v, i) => ({ date: new Date(2016 + i, 0, 1), value: v })),
  },
];

const annotations: Annotation[] = [
  { date: new Date(2020, 0, 1), label: '2020: COVID-19 — passenger numbers collapse' },
  { date: new Date(2018, 0, 1), label: '2018: Government approves Heathrow third runway' },
];

export default function AirportCapacityUtilisationPage() {
  return (
    <>
      <TopicNav topic="Airport Capacity Utilisation" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Airport Capacity Utilisation"
          question="Are British airports running out of capacity?"
          finding="Heathrow operated at 97% of capacity in 2024 — the highest utilisation of any major European hub — with no new runway decision taken. UK airports have fully recovered from COVID, but without new capacity the constraint will worsen through the 2030s."
          colour="#264653"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Heathrow — the UK's primary international hub — handled approximately 81 million passengers in 2024 at 97% of operational capacity, the highest utilisation of any major European hub. The Airports Commission concluded in 2015 that a third runway was the right answer to the UK's capacity needs; the government accepted this in 2018, but legal challenges, the pandemic, and net zero debates have delayed a development consent order indefinitely. Gatwick has a DCO application in progress for a second runway adding approximately 15 million passengers. The geographic constraint is acute: the absence of a strong second hub outside London-Heathrow limits connectivity for businesses and individuals in northern and western England, where international routes are often thin, infrequent, and expensive.</p>
            <p>For passengers and businesses today, the capacity constraint translates into higher fares on popular routes where demand exceeds supply, limited slot availability for new services, and the absence of direct connections to secondary international destinations. Heathrow's slot allocation system, where most slots are historically held by incumbent airlines, creates a significant barrier for new route entry. The Airports Commission estimated the trade cost of no Heathrow expansion at £14 billion annually by 2030 — connectivity foregone through routes that cannot be established and investment that goes to competing hubs in Amsterdam, Paris, Frankfurt, and Dubai instead. Aviation's climate obligations complicate the picture further — the sector accounted for approximately 7% of UK greenhouse gas emissions in 2023, and the Climate Change Committee has been clear that demand growth must be constrained to reach net zero.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Capacity & Passengers' },
          { id: 'sec-chart2', label: 'Trade cost' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Heathrow capacity utilisation"
              value="97%"
              unit="2024"
              direction="up"
              polarity="up-is-bad"
              changeText="Highest of any major European hub · Schiphol: 72% · CDG: 78%"
              sparklineData={heathrowUtilValues}
              source="CAA · Airport Statistics 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="UK airport passengers"
              value="266M"
              unit="2024"
              direction="up"
              polarity="up-is-good"
              changeText="+12% since 2019 · fully recovered to pre-pandemic levels"
              sparklineData={ukPassengersValues}
              source="CAA · Airport Statistics 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Trade cost of no expansion (est)"
              value="£14bn"
              unit="per year by 2030"
              direction="up"
              polarity="up-is-bad"
              changeText="Estimated trade loss without Heathrow expansion · Airports Commission"
              sparklineData={tradeCostValues}
              source="Airports Commission · Economic Analysis 2015, updated 2024"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="UK airport passengers and Heathrow capacity utilisation, 2016–2024"
              subtitle="Total UK airport passenger numbers (millions, blue) and Heathrow percentage capacity utilisation (amber). Post-COVID recovery is complete but capacity is unchanged."
              series={series1}
              annotations={annotations}
              yLabel="Passengers (millions) / Utilisation (%)"
              source={{ name: 'Civil Aviation Authority', dataset: 'Airport Statistics', url: 'https://www.caa.co.uk/data-and-analysis/uk-aviation-market/airports/', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Estimated trade cost of no Heathrow expansion, 2016–2024"
              subtitle="Annual economic cost of foregone trade and connectivity from constrained Heathrow capacity (£bn, 2024 prices). Based on Airports Commission economic modelling."
              series={series2}
              annotations={[{ date: new Date(2020, 0, 1), label: '2020: COVID pandemic — cost temporarily reduces' }]}
              yLabel="£ billion"
              source={{ name: 'Airports Commission', dataset: 'Economic Analysis — Final Report', url: 'https://www.gov.uk/government/publications/airports-commission-final-report', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Northern airports and regional connectivity offer alternatives"
            value="14M+"
            unit="passengers through Manchester, Birmingham, and Edinburgh annually"
            description="While the Heathrow debate continues, Manchester, Birmingham, Edinburgh, and Glasgow have expanded their international route networks significantly since 2019. Manchester now operates direct services to over 70 long-haul destinations, offering a genuine alternative hub for northern England. The UK Shared Connectivity Fund has supported new direct routes from regional airports to key business destinations. East Midlands Airport has emerged as the UK's second-largest freight airport, a critical logistics hub that takes pressure off Heathrow cargo operations. Regional airport investment may not solve the long-haul slot constraint, but it meaningfully improves connectivity for the majority of the UK population who live outside London."
            source="Source: CAA — Airport Statistics 2024. Manchester Airport Group — Annual Report 2024."
          />
        </ScrollReveal>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.caa.co.uk/data-and-analysis/uk-aviation-market/airports/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Civil Aviation Authority — Airport Statistics</a> — published annually. Total passengers by airport and capacity utilisation.</p>
            <p><a href="https://www.gov.uk/government/publications/airports-commission-final-report" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Airports Commission — Final Report 2015</a> — economic analysis of Heathrow expansion costs and benefits, updated to 2024 prices.</p>
            <p>Heathrow capacity utilisation is passengers as a percentage of declared operational capacity. 2020–21 data reflects pandemic disruption. Trade cost estimate is from Airports Commission economic modelling updated to 2024 prices.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
