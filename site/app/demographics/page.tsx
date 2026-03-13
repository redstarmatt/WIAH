'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

// Total fertility rate, 2000–2024
const fertilityValues = [1.65, 1.63, 1.65, 1.72, 1.77, 1.78, 1.84, 1.87, 1.91, 1.94, 1.92, 1.91, 1.89, 1.85, 1.81, 1.76, 1.72, 1.67, 1.70, 1.62, 1.58, 1.56, 1.49, 1.45, 1.41];

// Net migration (thousands), 2012–2024
const migrationValues = [183, 209, 209, 332, 248, 282, 231, 270, 282, 745, 764, 906, 204];

const series1: Series[] = [
  {
    id: 'tfr',
    label: 'Total fertility rate',
    colour: '#E63946',
    data: fertilityValues.map((v, i) => ({ date: new Date(2000 + i, 0, 1), value: v })),
  },
];

const series2: Series[] = [
  {
    id: 'migration',
    label: 'Net migration (thousands)',
    colour: '#264653',
    data: migrationValues.map((v, i) => ({ date: new Date(2012 + i, 0, 1), value: v })),
  },
];

const annotations1: Annotation[] = [
  { date: new Date(2010, 0, 1), label: '2010: Peak TFR 1.94' },
  { date: new Date(2024, 0, 1), label: '2024: Record low 1.41' },
];

const annotations2: Annotation[] = [
  { date: new Date(2023, 0, 1), label: '2023: Record high 906K' },
  { date: new Date(2024, 0, 1), label: '2024: Falls to 204K' },
];

const targetLine = { value: 2.1, label: 'Replacement level 2.1' };

export default function DemographicsPage() {
  return (
    <>
      <TopicNav topic="Demographics" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Demographics"
          question="What's Actually Happening to Britain's Population?"
          finding="Britain's population is 68.9 million in 2024, but the fertility rate has fallen to a record low of 1.41 — far below the 2.1 replacement level. Population growth now depends almost entirely on immigration, which swung from a record 906,000 net arrivals in 2023 to 204,000 in 2024. One in five residents is now over 65."
          colour="#6B7280"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Britain's 68.9 million population rests on a demographic model that has fundamentally changed. Since 2001, the country added 9.8 million people — but natural increase (births minus deaths) contributed just 1.3 million. Migration delivered the other 8.5 million. The total fertility rate has fallen to 1.41 children per woman, a record low and far below the 2.1 replacement threshold. Without net inward migration, the population would now be shrinking. One in five residents is over 65, up from one in six in 2001. The UK no longer grows itself; it imports growth — and even that lever has proved volatile.</p>
            <p>The fertility collapse is structural, not cyclical. Average house prices exceed eight times median earnings. Full-time childcare costs £14,000–£15,000 a year per child. Women delay first births into their thirties, compressing the window for larger families. These forces push the TFR further below replacement with each cohort. Migration filled the gap — net arrivals hit a record 906,000 in 2023, driven by post-Brexit visa schemes and humanitarian routes — but the political backlash was swift. By 2024, tighter rules cut net migration to 204,000, a 78% drop in a single year. That whiplash exposes the tension at the core of UK demography: the economy needs working-age migrants, but policy treats migration as a tap to be turned on and off.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Fertility Rate' },
          { id: 'sec-chart2', label: 'Net Migration' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="UK population"
              value="68.9M"
              unit="2024"
              direction="up"
              polarity="up-is-good"
              changeText="up 9.8M since 2001 · mostly from migration, not births"
              sparklineData={[63.3, 64.1, 64.8, 65.6, 66.4, 67.1, 67.5, 67.9, 68.3, 68.9]}
              source="ONS — Mid-year Estimates 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Total fertility rate"
              value="1.41"
              unit="2024"
              direction="down"
              polarity="up-is-good"
              changeText="record low · was 1.94 in 2010 · replacement level: 2.1"
              sparklineData={[1.89, 1.85, 1.81, 1.76, 1.72, 1.67, 1.70, 1.62, 1.56, 1.49, 1.45, 1.41]}
              source="ONS — Vital Statistics 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Over-65s share of population"
              value="19.1%"
              unit="2024"
              direction="up"
              polarity="up-is-bad"
              changeText="1 in 5 people · was 15.9% in 2001 · ~13.2M people"
              sparklineData={[16.3, 16.7, 17.2, 17.7, 18.1, 18.4, 18.7, 18.9, 19.0, 19.1]}
              source="ONS — Mid-year Estimates 2024"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Total fertility rate, England and Wales, 2000–2024"
              subtitle="Children per woman. The replacement level (2.1) is marked. Below this, population declines without migration. The fertility rate has fallen from its 2010 peak of 1.94 to a record low of 1.41 in 2024."
              series={series1}
              annotations={annotations1}
              targetLine={targetLine}
              yLabel="Children per woman"
              source={{ name: 'ONS', dataset: 'Vital statistics: births — live births by age of mother', url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/birthsdeathsandmarriages/livebirths/datasets/birthsummarytables', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Long-term net migration, UK, 2012–2024"
              subtitle="Thousands of people. Peaked at 906,000 in 2023 before falling sharply to 204,000 in 2024 following visa restrictions. Net migration is the primary driver of recent UK population growth."
              series={series2}
              annotations={annotations2}
              yLabel="Thousands"
              source={{ name: 'ONS', dataset: 'Long-term International Migration', url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/populationandmigration/internationalmigration/bulletins/longterminternationalmigration', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Life expectancy has risen 3 years since 2001"
            value="3.1 years"
            unit="higher life expectancy since 2001"
            description="Life expectancy has risen from 75.9 years (male) and 80.4 years (female) in 2001 to 79.0 and 82.9 in 2023 — an increase of 3.1 and 2.5 years respectively. This reflects decades of health and living standard improvements. However, progress has stalled since 2020 due to excess deaths during the pandemic and the long-term health effects of COVID-19. UK healthy life expectancy — the years lived in good health — remains well below total life expectancy, with significant regional variation: healthy life expectancy in Blackpool is nearly 20 years lower than in Wokingham."
            source="Source: ONS — National Life Tables 2024."
          />
        </ScrollReveal>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.ons.gov.uk/peoplepopulationandcommunity/populationandmigration/populationestimates" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ONS — Mid-year Population Estimates</a> — total population by age and sex. Annual. 2024.</p>
            <p><a href="https://www.ons.gov.uk/peoplepopulationandcommunity/birthsdeathsandmarriages/livebirths/datasets/birthsummarytables" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ONS — Vital Statistics: Births</a> — total fertility rate by year. Annual. 2024.</p>
            <p><a href="https://www.ons.gov.uk/peoplepopulationandcommunity/populationandmigration/internationalmigration/bulletins/longterminternationalmigration" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ONS — Long-term International Migration</a> — net migration estimates. Annual. 2024.</p>
            <p>Fertility rate is children per woman (total fertility rate). Replacement level is 2.1 for developed countries with low infant mortality. Migration figures are ONS estimates subject to revision; the 2023 and 2024 figures incorporate administrative data revisions. Over-65s figures are from ONS mid-year population estimates.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
