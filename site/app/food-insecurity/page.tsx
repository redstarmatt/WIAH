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

const editorialRefs: Reference[] = [
  { num: 1, name: 'Trussell Trust', dataset: 'Annual food bank statistics', url: 'https://www.trusselltrust.org/news-and-blog/latest-stats/', date: '2024' },
  { num: 2, name: 'Action for Children', dataset: 'Child Food Poverty Tracker 2024', url: 'https://foodfoundation.org.uk', date: '2024' },
  { num: 3, name: 'ONS', dataset: 'Understanding Society household longitudinal study', date: 'January 2023' },
  { num: 4, name: 'Department for Education', dataset: 'Free school meals eligibility expansion', date: '2023' },
];

// Trussell Trust parcels (millions), 2012–2024
const foodBankParcels = [0.13, 0.35, 0.91, 1.08, 1.11, 1.18, 1.33, 1.60, 2.03, 2.50, 2.99, 2.92, 2.90];
// Children in food-insecure households (%), 2012–2024
const childFoodInsecurity = [9, 10, 11, 12, 14, 16, 17, 18, 19, 20, 21, 20, 20];
// Adults skipping meals (millions), 2018–2025
const adultsSkippingMeals = [5.2, 5.8, 6.1, 6.4, 6.8, 7.1, 7.3, 7.4];

const foodBankSeries: Series[] = [
  {
    id: 'food-bank-parcels',
    label: 'Parcels distributed (millions)',
    colour: '#E63946',
    data: foodBankParcels.map((v, i) => ({ date: new Date(2012 + i, 5, 1), value: v })),
  },
];

const childFoodSeries: Series[] = [
  {
    id: 'child-food-insecurity',
    label: 'Children in food-insecure households (%)',
    colour: '#E63946',
    data: childFoodInsecurity.map((v, i) => ({ date: new Date(2012 + i, 5, 1), value: v })),
  },
  {
    id: 'adults-skipping',
    label: 'Adults skipping meals (millions)',
    colour: '#F4A261',
    data: adultsSkippingMeals.map((v, i) => ({ date: new Date(2018 + i, 5, 1), value: v })),
  },
];

const foodBankAnnotations: Annotation[] = [
  { date: new Date(2019, 5, 1), label: '2019: Universal Credit national rollout' },
  { date: new Date(2020, 5, 1), label: '2020: COVID-19 surge' },
  { date: new Date(2022, 5, 1), label: '2022: Cost of living crisis' },
];

const childFoodAnnotations: Annotation[] = [
  { date: new Date(2022, 5, 1), label: '2022: Food insecurity accelerates' },
];

export default function FoodInsecurityPage() {
  return (
    <>
      <TopicNav topic="Food Insecurity" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Food Insecurity"
          question="Can People Afford to Eat?"
          finding="Food bank use has risen more than twelve-fold since 2012, and one in five children now lives in a household that regularly goes without food."
          colour="#E63946"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The Trussell Trust distributed 128,697 food parcels in 2012. By 2023 that figure had reached 2.99 million — a 24-fold increase in a decade.<Cite nums={[1]} /> More than one million of those parcels went to children.<Cite nums={[1]} /> The Trussell Trust network accounts for roughly 60% of food bank provision; including independent operations, there are an estimated 2,800 or more food bank locations across the UK.<Cite nums={[1]} /> That number did not exist in any meaningful sense before 2010. The Trussell Trust itself says it should not be a permanent feature of the welfare state.</p>
            <p>The benefits system is the single largest driver. Between 27% and 28% of food bank referrals cite benefit delays or changes as the primary reason.<Cite nums={[1]} /> The five-week wait at the start of a Universal Credit claim leaves newly unemployed households without income precisely when they are most vulnerable. Benefit levels have also failed to keep pace with food costs: UK food prices rose 19.1% in the year to March 2023, the sharpest annual increase in 45 years.<Cite nums={[3]} /> Lower-income households spend a disproportionately high share of income on food, and are more exposed to these price shocks than wealthier ones who can absorb them through savings or substitution.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Food Bank Use' },
          { id: 'sec-chart2', label: 'Child Hunger' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Food bank parcels issued"
              value="2.9m"
              unit="annual"
              direction="up"
              polarity="up-is-bad"
              changeText="+12× since 2012 · Trussell Trust network only"
              sparklineData={foodBankParcels.slice(-8)}
              source="Trussell Trust · Annual statistics 2023–24"
              href="#sec-chart1"
            />
            <MetricCard
              label="Children in food-insecure households"
              value="20%"
              unit="of all children"
              direction="up"
              polarity="up-is-bad"
              changeText="1 in 5 children · up from 9% in 2012"
              sparklineData={childFoodInsecurity.slice(-8)}
              source="Action for Children · Child Food Poverty Tracker 2024"
              href="#sec-chart2"
            />
            <MetricCard
              label="Adults skipping meals"
              value="7.4m"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="13% of UK adults · January 2023"
              sparklineData={adultsSkippingMeals}
              source="Understanding Society · ONS January 2023"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Trussell Trust food bank parcels distributed, 2012–2024"
              subtitle="Annual totals. Trussell Trust network only — independent food banks not included. Each parcel provides 3 days of nutritionally balanced emergency food."
              series={foodBankSeries}
              annotations={foodBankAnnotations}
              yLabel="Parcels (millions)"
              source={{ name: 'Trussell Trust', dataset: 'Annual food bank statistics', url: 'https://www.trusselltrust.org/news-and-blog/latest-stats/', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Child food insecurity and adults skipping meals, UK, 2012–2024"
              subtitle="Children in food-insecure households and adults skipping meals due to lack of money. Both measures have risen sharply since 2020."
              series={childFoodSeries}
              annotations={childFoodAnnotations}
              yLabel="% / millions"
              source={{ name: 'Action for Children / ONS', dataset: 'Child Food Poverty Tracker / Understanding Society', url: 'https://foodfoundation.org.uk', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Free school meals expanded in 2023"
            value="+170K"
            unit="additional children eligible"
            description="The government extended free school meals eligibility in 2023, adding an estimated 170,000 children. Evidence consistently shows free school meals improve concentration, behaviour, and attainment — particularly for children in the most deprived areas. Scotland has gone further, providing universal free school meals to all primary school pupils. The evidence base for further expansion in England is strong."
            source="Source: Department for Education, 2023. Food Foundation — School Food Matters 2024."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.trusselltrust.org/news-and-blog/latest-stats/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Trussell Trust — Annual food bank statistics</a> — Food parcel distribution data 2012–2024. Retrieved 2025.</p>
            <p><a href="https://foodfoundation.org.uk" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Food Foundation — Food Insecurity Tracker</a> — Child food poverty and adult food insecurity measures. Retrieved 2025.</p>
            <p>Adult food insecurity data from ONS Understanding Society household longitudinal study, January 2023.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
