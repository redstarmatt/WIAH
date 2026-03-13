'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import PositiveCallout from '@/components/PositiveCallout';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

// Screening uptake, England, 2010–2024
const uptakeData = [52.1, 53.0, 53.8, 54.2, 54.9, 55.3, 56.1, 57.0, 57.4, 61.2, 63.8, 64.5, 65.9, 66.7, 67.3];

// Cancers caught at Stage 1–2 (screen-detected), 2010–2024
const earlyStageData = [38.2, 39.1, 40.0, 40.8, 41.5, 42.2, 43.0, 43.9, 44.7, 46.2, 48.0, 49.5, 51.0, 52.1, 53.1];

// Bowel cancer mortality rate (age-standardised, per 100k), 2010–2024
const mortalityData = [17.4, 17.0, 16.8, 16.5, 16.1, 15.8, 15.4, 15.0, 14.7, 14.4, 14.1, 13.9, 13.6, 13.4, 13.2];

const uptakeSeries: Series[] = [
  {
    id: 'uptake',
    label: 'Screening uptake (%)',
    colour: '#2A9D8F',
    data: uptakeData.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
  },
];

const detectionSeries: Series[] = [
  {
    id: 'early-stage',
    label: 'Cancers caught at Stage 1–2 (%)',
    colour: '#264653',
    data: earlyStageData.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
  },
  {
    id: 'mortality',
    label: 'Age-standardised mortality (per 100k)',
    colour: '#E63946',
    data: mortalityData.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
  },
];

const uptakeAnnotations: Annotation[] = [
  { date: new Date(2019, 5, 1), label: '2019: FIT test replaces gFOBt' },
  { date: new Date(2021, 3, 1), label: '2021: Age expansion to 50–74 begins' },
];

const detectionAnnotations: Annotation[] = [
  { date: new Date(2019, 5, 1), label: '2019: FIT introduced — earlier detection improves' },
  { date: new Date(2020, 2, 1), label: '2020: COVID pauses screening' },
];

export default function BowelScreeningPage() {
  return (
    <>
      <TopicNav topic="Bowel Cancer Screening" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Bowel Cancer Screening"
          question="Is Bowel Cancer Screening Finally Working?"
          finding="Uptake of bowel cancer screening has risen to 67% following the switch to the simpler FIT test, and more than half of screen-detected cancers are now caught at early stages when survival rates exceed 90%. But a 25-percentage-point gap between the most and least deprived communities means the people who need screening most remain the least likely to complete it."
          colour="#2A9D8F"
          preposition="with"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Bowel cancer is the fourth most common cancer in the UK and the second biggest cancer killer, claiming around 16,800 lives each year. When caught at Stage 1, the five-year survival rate is over 90%. By Stage 4, it collapses to around 10%. The NHS Bowel Cancer Screening Programme, launched in 2006, invites eligible adults to complete a home testing kit every two years. For its first thirteen years it used the guaiac faecal occult blood test — a kit requiring six separate samples with an uptake rate stubbornly stuck in the mid-50s. The switch to the faecal immunochemical test in June 2019 was transformative: FIT requires a single sample and is markedly easier to use. Uptake jumped from 57% to over 60% within a year and has continued climbing to 67.3% by 2024.</p>
            <p>Simultaneously, NHS England began lowering the eligible age from 60 to 50 — a phased expansion that is already sending 6.3 million invitations per year. The combination of a better test and a wider eligible population means more cancers are being caught at early, treatable stages: 53.1% of screen-detected bowel cancers were diagnosed at Stage 1 or 2 in 2024, up from 38% in 2010. Age-standardised bowel cancer mortality has fallen 24% over the same period. The remaining challenge is inequality: screening uptake in the most deprived areas stands at just 51%, compared with 76% in the least deprived — a 25-percentage-point gap that has barely narrowed since the programme began.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Uptake' },
          { id: 'sec-chart2', label: 'Detection & Mortality' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Bowel screening uptake (England)"
              value="67.3%"
              unit="2024"
              direction="up"
              polarity="up-is-good"
              changeText="Up from 52.1% in 2010 · FIT test drove step-change"
              sparklineData={[52.1, 54.2, 55.3, 57.0, 61.2, 63.8, 65.9, 67.3]}
              source="NHS England — Bowel Cancer Screening Statistics 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Cancers caught at Stage 1–2"
              value="53.1%"
              unit="2024"
              direction="up"
              polarity="up-is-good"
              changeText="Up from 38.2% in 2010 · Stage 1 survival: 90%+"
              sparklineData={[38.2, 40.8, 42.2, 43.9, 46.2, 49.5, 52.1, 53.1]}
              source="NHS England — Cancer Registration Statistics 2024"
              href="#sec-chart2"
            />
            <MetricCard
              label="Bowel cancer mortality rate"
              value="13.2"
              unit="per 100k (2024)"
              direction="down"
              polarity="down-is-bad"
              changeText="Down 24% since 2010 · age-standardised rate"
              sparklineData={[17.4, 16.5, 16.1, 15.4, 14.7, 14.1, 13.6, 13.2]}
              source="ONS — Cancer Registration Statistics 2024"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Bowel cancer screening uptake, England, 2010–2024"
              subtitle="Proportion of eligible adults completing a screening kit within six months of invitation. FIT replaced gFOBt in June 2019, driving a step-change in uptake."
              series={uptakeSeries}
              annotations={uptakeAnnotations}
              targetLine={{ value: 75, label: 'NHS 75% uptake target' }}
              yLabel="Uptake (%)"
              source={{ name: 'NHS England', dataset: 'Bowel Cancer Screening Programme Statistics', url: 'https://www.gov.uk/government/statistics/bowel-cancer-screening-programme-statistics', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Early-stage detection and bowel cancer mortality, England, 2010–2024"
              subtitle="Screen-detected cancers diagnosed at Stage 1–2 (left scale) and age-standardised mortality rate per 100,000. Both improving as screening reaches more people earlier."
              series={detectionSeries}
              annotations={detectionAnnotations}
              yLabel="% / per 100k"
              source={{ name: 'ONS / NHS England', dataset: 'Cancer Registration Statistics', url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/healthandsocialcare/conditionsanddiseases', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="FIT test: a public health success story"
            value="67.3%"
            unit="uptake — up 10pp in five years"
            description="The switch from the six-sample guaiac test to the single-sample FIT test in June 2019 was the single most effective intervention in the programme's history. Uptake rose by more than 10 percentage points. Combined with the age expansion to 50-year-olds, the programme now sends 6.3 million invitations per year and detects cancers earlier in their progression. Over half of screen-detected bowel cancers are now found at Stage 1 or 2, when treatment is most effective. Age-standardised mortality from bowel cancer has fallen 24% since 2010."
            source="Source: NHS England — Bowel Cancer Screening Programme Statistics, 2024. ONS — Cancer Registration Statistics, 2024."
          />
        </ScrollReveal>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.gov.uk/government/statistics/bowel-cancer-screening-programme-statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS England — Bowel Cancer Screening Programme Statistics</a> — primary data source for uptake and age expansion. Retrieved March 2026.</p>
            <p><a href="https://www.ons.gov.uk/peoplepopulationandcommunity/healthandsocialcare/conditionsanddiseases" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ONS — Cancer Registration Statistics</a> — stage at diagnosis and mortality data. Retrieved March 2026.</p>
            <p><a href="https://www.cancerresearchuk.org/health-professional/cancer-statistics/statistics-by-cancer-type/bowel-cancer" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Cancer Research UK — Bowel Cancer Statistics</a> — contextual data and survival rates. Retrieved March 2026.</p>
            <p className="mt-2">Uptake is measured as the proportion of eligible people who completed a screening kit within six months of invitation. The programme transitioned from gFOBt to FIT in June 2019; pre- and post-2019 figures are not directly comparable. Mortality rates are age-standardised to the 2013 European Standard Population. All figures are for England unless otherwise stated.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
