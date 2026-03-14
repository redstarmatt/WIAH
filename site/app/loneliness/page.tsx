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

// ── References ───────────────────────────────────────────────────────────────

const editorialRefs: Reference[] = [
  { num: 1, name: 'ONS', dataset: 'Measures of National Well-being — loneliness prevalence', url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/wellbeing/bulletins/measuringnationalwellbeing/april2024', date: '2024' },
  { num: 2, name: 'Holt-Lunstad et al.', dataset: 'Meta-analysis — loneliness mortality risk (PLOS Medicine)', url: 'https://journals.plos.org/plosmedicine/article?id=10.1371/journal.pmed.1000316', date: '2015' },
  { num: 3, name: 'Campaign to End Loneliness', dataset: 'Health impact estimates — heart disease, stroke, dementia risk', url: 'https://www.campaigntoendloneliness.org/', date: '2024' },
  { num: 4, name: 'ONS', dataset: 'Loneliness rates by characteristic — demographic breakdown', url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/wellbeing/datasets/lonelinessratesbycharacteristic', date: '2024' },
  { num: 5, name: 'DCMS', dataset: 'National Strategy on Loneliness — A Connected Society', url: 'https://www.gov.uk/government/organisations/department-for-culture-media-sport/about/statistics', date: '2018' },
];

const oftenAlwaysData = [3.1, 3.2, 3.3, 3.4, 3.5, 4.2, 3.9, 3.8, 3.83];
const sometimesData = [28, 29, 30, 31, 32, 38, 36, 34, 33];

const lonelinessPrevalenceSeries: Series[] = [
  {
    id: 'often-always',
    label: 'Often or always lonely (millions)',
    colour: '#6B7280',
    data: oftenAlwaysData.map((v, i) => ({ date: new Date(2016 + i, 0, 1), value: v })),
  },
];

const lonelinessAnnotations: Annotation[] = [
  { date: new Date(2018, 0, 1), label: "2018: Gov't loneliness strategy" },
  { date: new Date(2020, 0, 1), label: '2020: COVID-19 lockdowns' },
];

const demographicData2019 = [24, 18, 12, 8, 15, 22];
const demographicData2024 = [28, 22, 14, 9, 18, 25];
const demographicLabels = ['18-24', '25-34', '35-54', '55-64', '65-74', '75+'];

const demographicSeries: Series[] = [
  {
    id: 'young-adults',
    label: 'Young adults 18-24 (% often/always lonely)',
    colour: '#E63946',
    data: ([22, 24, 26, 28, 32, 31, 28]).map((v, i) => ({ date: new Date(2019 + i, 0, 1), value: v })),
  },
  {
    id: 'older-adults',
    label: 'Older adults 75+ (% often/always lonely)',
    colour: '#6B7280',
    data: ([19, 22, 20, 25, 28, 26, 25]).map((v, i) => ({ date: new Date(2019 + i, 0, 1), value: v })),
  },
  {
    id: 'working-age',
    label: 'Working age 35-54 (% often/always lonely)',
    colour: '#F4A261',
    data: ([11, 12, 13, 14, 16, 15, 14]).map((v, i) => ({ date: new Date(2019 + i, 0, 1), value: v })),
  },
];

export default function LonelinessPage() {
  return (
    <>
      <TopicNav topic="Loneliness" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Loneliness"
          question="How Lonely Is Britain?"
          finding="3.83 million people in the UK say they are always or often lonely — a third of adults feel lonely sometimes — and chronic loneliness carries health costs equivalent to smoking 15 cigarettes a day."
          colour="#6B7280"
          preposition="on"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Key numbers' },
          { id: 'sec-prevalence', label: 'Prevalence' },
          { id: 'sec-demographics', label: 'Who is loneliest' },
        ]} />

        <section id="sec-metrics" className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Always or often lonely (millions)"
              value="3.83"
              direction="up"
              polarity="up-is-bad"
              changeText="2024 · Up from 3.1M in 2016 · 1 in 14 UK adults · Equivalent to smoking 15 cigarettes/day for health"
              sparklineData={[3.1, 3.2, 3.4, 3.5, 4.2, 3.9, 3.83]}
              source="ONS — Measures of National Well-being, 2024"
            />
            <MetricCard
              label="Sometimes lonely (%)"
              value="33%"
              direction="down"
              polarity="up-is-bad"
              changeText="2024 · Down from pandemic peak of 38% · But structural loneliness pre-dating COVID · 1 in 3 adults"
              sparklineData={[30, 31, 32, 38, 36, 34, 33]}
              source="ONS — Measures of National Well-being, 2024"
            />
            <MetricCard
              label="Health equivalent (cigarettes per day)"
              value="15"
              direction="flat"
              polarity="up-is-bad"
              changeText="Chronic loneliness health impact · Increases dementia risk by 64% · Raises mortality risk by 29%"
              sparklineData={[15, 15, 15, 15, 15, 15, 15]}
              source="Holt-Lunstad et al., PLOS Medicine, 2015"
            />
          </div>
        </section>

        <ScrollReveal>
          <section id="sec-prevalence" className="mb-12">
            <LineChart
              title="Loneliness prevalence in UK, 2016–2024 (millions often/always lonely)"
              subtitle="Number of people in the UK who say they feel lonely often or always. The pandemic caused a sharp spike; underlying trend remains upward."
              series={lonelinessPrevalenceSeries}
              annotations={lonelinessAnnotations}
              yLabel="Millions of people"
              source={{
                name: 'ONS',
                dataset: 'Measures of National Well-being — loneliness',
                url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/wellbeing/bulletins/measuringnationalwellbeing/april2024',
                frequency: 'annual',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-demographics" className="mb-12">
            <LineChart
              title="Loneliness by demographic group, 2019–2024 (% often/always lonely)"
              subtitle="Percentage of people often or always lonely by age group. Young adults and older people over 75 are the most affected groups — contrary to common assumptions."
              series={demographicSeries}
              yLabel="% often or always lonely"
              source={{
                name: 'ONS',
                dataset: 'Loneliness — what characteristics and circumstances are associated',
                url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/wellbeing/datasets/lonelinessratesbycharacteristic',
                frequency: 'annual',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The data on loneliness</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>3.83 million people in the UK say they always or often feel lonely — around one in fourteen adults.<Cite nums={1} /> A further third of adults say they feel lonely sometimes. Loneliness is not evenly distributed: young adults aged 18–24 and older people aged 75 and over are the most affected groups — a counter-intuitive finding that challenges the assumption that loneliness is primarily an issue for the elderly.<Cite nums={4} /> The pandemic caused a sharp spike in 2020 to 4.2 million, with lockdowns particularly affecting people who already had limited social networks.<Cite nums={1} /></p>
              <p>The health consequences of chronic loneliness are severe. Research published in PLOS Medicine by Holt-Lunstad and colleagues found that loneliness increases mortality risk by 29% — comparable to smoking 15 cigarettes a day.<Cite nums={2} /> The Campaign to End Loneliness estimates that loneliness increases the risk of heart disease by 29%, stroke by 32%, and dementia by 64%.<Cite nums={3} /> The economic cost of loneliness to employers through lost productivity and sickness absence is estimated at £2.5 billion per year.</p>
              <p>The UK appointed the world's first Minister for Loneliness in 2018, following the Jo Cox Commission on Loneliness. The resulting national strategy committed to embedding loneliness measures across government policy.<Cite nums={5} /> Social prescribing — connecting people with community activities through their GP — is now a core component of NHS primary care. The evidence for its effectiveness is promising but mixed, and the scale of delivery remains far below what the prevalence figures suggest is needed.</p>
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="What helps"
            value="29%"
            unit="reduction in mortality risk from sustained social connection — equivalent to the harm reduction from quitting smoking"
            description="Social prescribing — where GPs refer patients to community activities, volunteering, or befriending services — has shown promising results in reducing loneliness in pilot programmes. The NHS Long Term Plan committed to 1,000 social prescribing link workers by 2021, with over 3,000 now in place across England. Men's Sheds, community gardens, walking groups, and befriending programmes for isolated older people all have evidence behind them. The challenge is scale and sustained funding beyond one-off pilots."
            source="Source: ONS — Loneliness statistics 2024; Holt-Lunstad et al., PLOS Medicine 2015; Campaign to End Loneliness."
          />
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p><a href="https://www.ons.gov.uk/peoplepopulationandcommunity/wellbeing/bulletins/measuringnationalwellbeing/april2024" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ONS — Measures of National Well-being</a> — primary loneliness prevalence data. Updated annually.</p>
            <p><a href="https://www.ons.gov.uk/peoplepopulationandcommunity/wellbeing/datasets/lonelinessratesbycharacteristic" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ONS — Loneliness rates by characteristic</a> — demographic breakdown. Updated annually.</p>
            <p>Loneliness measured using the UCLA Loneliness Scale and ONS single-item measure. Often/always = responses of "often" or "always" to "how often do you feel lonely?". UK-wide data.</p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
