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

// Trussell Trust emergency food parcels distributed (millions), 2010/11–2023/24
const parcelsValues = [0.061, 0.129, 0.347, 0.614, 0.913, 1.084, 1.182, 1.332, 1.583, 1.900, 2.537, 2.986, 2.959, 3.121];

// Food insecurity rate among UK adults (%), 2016–2024
const insecurityValues = [7.4, 8.0, 8.8, 9.5, 10.8, 14.0, 13.5, 13.2, 14.1];

// Working households as % of food bank users, 2016–2024
const workingHouseholdValues = [21.2, 23.0, 25.5, 27.0, 29.5, 33.0, 35.2, 36.8, 38.5];

const series1: Series[] = [
  {
    id: 'parcels',
    label: 'Emergency food parcels (millions)',
    colour: '#E63946',
    data: parcelsValues.map((v, i) => ({ date: new Date(2010 + i, 6, 1), value: v })),
  },
];

const series2: Series[] = [
  {
    id: 'insecurity',
    label: 'Adult food insecurity rate (%)',
    colour: '#E63946',
    data: insecurityValues.map((v, i) => ({ date: new Date(2016 + i, 0, 1), value: v })),
  },
  {
    id: 'working',
    label: 'Working households using food banks (%)',
    colour: '#F4A261',
    data: workingHouseholdValues.map((v, i) => ({ date: new Date(2016 + i, 0, 1), value: v })),
  },
];

const annotations: Annotation[] = [
  { date: new Date(2016, 0, 1), label: '2016: Universal Credit rollout begins' },
  { date: new Date(2020, 0, 1), label: '2020: COVID-19 pandemic' },
  { date: new Date(2022, 0, 1), label: '2022: Cost-of-living crisis' },
];

const editorialRefs: Reference[] = [
  { num: 1, name: 'Trussell Trust', dataset: 'End of Year Statistics', url: 'https://www.trusselltrust.org/news-and-blog/latest-stats/', date: '2024' },
  { num: 2, name: 'Food Foundation', dataset: 'Food Insecurity Tracker', url: 'https://foodfoundation.org.uk/initiatives/food-insecurity-tracking', date: '2024' },
  { num: 3, name: 'DWP', dataset: 'Family Resources Survey', url: 'https://www.gov.uk/government/collections/family-resources-survey--2', date: '2024' },
];

export default function FoodBankUsagePage() {
  return (
    <>
      <TopicNav topic="Food Bank Usage" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Food Bank Usage"
          question="How Many People Can't Afford to Eat?"
          finding="The Trussell Trust distributed 3.1 million emergency food parcels in 2023/24 — up from 61,000 in 2010/11. One in seven UK adults is now food insecure, with working households increasingly turning to food banks."
          colour="#E63946"
          preposition="with"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Food bank usage in the UK has undergone a transformation from marginal emergency provision to a structural feature of the welfare system. The Trussell Trust, which operates over 1,400 food bank centres, distributed 3.1 million emergency food parcels in 2023/24 — a fifty-fold increase from the 61,000 parcels given out in 2010/11.<Cite nums={1} /> Independent food banks, not included in these figures, are estimated to distribute a further 1–2 million parcels annually. The primary drivers cited by recipients are benefit delays, the five-week wait for Universal Credit, low income, and debt.<Cite nums={1} /> The sharpest growth has occurred since 2020, driven first by pandemic-related income shocks and then by the cost-of-living crisis that saw food price inflation peak at 19.2% in March 2023.</p>
            <p>The profile of food bank users has shifted markedly. In 2016, around 21% of Trussell Trust users came from working households; by 2024, that figure had risen to nearly 39%.<Cite nums={2} /> The Food Foundation estimates that 14% of UK adults — approximately 7.4 million people — experienced food insecurity in 2024, defined as skipping meals, reducing portions, or going a whole day without eating due to lack of money.<Cite nums={2} /> Among children, the picture is particularly stark: an estimated 4 million children live in food-insecure households, with free school meals often their only guaranteed hot meal of the day.<Cite nums={3} /> Destitution, once considered a historical condition, has returned as a measurable reality in the UK. The DWP Family Resources Survey confirms that food insecurity is concentrated among single-parent households, disabled people, and those on legacy benefits awaiting migration to Universal Credit.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Parcels trend' },
          { id: 'sec-chart2', label: 'Insecurity & work' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Emergency food parcels distributed"
              value="3.1M"
              unit="2023/24"
              direction="up"
              polarity="up-is-bad"
              changeText="up from 61,000 in 2010/11 · 50x increase in 13 years"
              sparklineData={parcelsValues.slice(-8)}
              source="Trussell Trust — End of Year Statistics 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Adults experiencing food insecurity"
              value="14%"
              unit="2024"
              direction="up"
              polarity="up-is-bad"
              changeText="~7.4 million adults · up from 7.4% in 2016"
              sparklineData={insecurityValues.slice(-8)}
              source="Food Foundation — Food Insecurity Tracker 2024"
              href="#sec-chart2"
            />
            <MetricCard
              label="Children in food-insecure households"
              value="4M"
              unit="2024"
              direction="up"
              polarity="up-is-bad"
              changeText="1 in 5 children · free school meals often only hot meal"
              sparklineData={[2.5, 2.7, 2.9, 3.1, 3.4, 3.8, 3.9, 4.0]}
              source="DWP — Family Resources Survey 2024"
              href="#sec-chart1"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Trussell Trust emergency food parcels distributed, UK, 2010–2024"
              subtitle="Number of three-day emergency food supply parcels distributed per year. Figures exclude independent food banks, estimated to serve a further 1–2 million people."
              series={series1}
              annotations={annotations}
              yLabel="Parcels (millions)"
              source={{ name: 'Trussell Trust', dataset: 'End of Year Statistics', url: 'https://www.trusselltrust.org/news-and-blog/latest-stats/', frequency: 'annual', date: 'Apr 2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Food insecurity rate and working household food bank use, UK, 2016–2024"
              subtitle="Adult food insecurity rate (red) alongside percentage of food bank users from working households (amber). Both measures have risen sharply since 2020."
              series={series2}
              annotations={[{ date: new Date(2022, 0, 1), label: '2022: Food inflation peaks at 19.2%' }]}
              yLabel="Percentage (%)"
              source={{ name: 'Food Foundation', dataset: 'Food Insecurity Tracker', url: 'https://foodfoundation.org.uk/initiatives/food-insecurity-tracking', frequency: 'biannual', date: 'Sep 2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Holiday Activities and Food Programme: bridging the gap"
            value="600,000"
            unit="children reached per year"
            description="The Holiday Activities and Food (HAF) programme, launched in 2021 and extended across all local authorities in England, now provides free activities and meals to over 600,000 children during school holidays. The programme targets those eligible for free school meals and has been shown to reduce holiday hunger, improve wellbeing, and increase physical activity. While it does not address the root causes of food insecurity, it demonstrates that targeted public investment can meaningfully reduce the immediate harm of poverty on children."
            source="Source: DfE — Holiday Activities and Food Programme evaluation 2024."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.trusselltrust.org/news-and-blog/latest-stats/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Trussell Trust — End of Year Statistics</a> — primary source for food parcel distribution volumes. Covers approximately 1,400 food bank centres across the UK. Does not include independent food banks.</p>
            <p><a href="https://foodfoundation.org.uk/initiatives/food-insecurity-tracking" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Food Foundation — Food Insecurity Tracker</a> — nationally representative surveys measuring household food insecurity using the USDA validated six-item module.</p>
            <p><a href="https://www.gov.uk/government/collections/family-resources-survey--2" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DWP — Family Resources Survey</a> — annual survey of approximately 20,000 UK households measuring income, food security, and living standards.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
