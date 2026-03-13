'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import PositiveCallout from '@/components/PositiveCallout';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

// One-year cancer survival (%), 2001–2023
const survivalData = [59.8, 60.5, 61.2, 62.0, 62.8, 63.5, 64.3, 65.1, 65.9, 66.6, 67.4, 68.1, 68.8, 69.5, 70.2, 70.8, 71.4, 71.9, 72.4, 72.9, 71.5, 72.8, 73.7];

// Late-stage diagnosis rate (% at stage 3 or 4), 2013–2023
const lateDiagData = [25.8, 25.5, 25.2, 24.9, 24.6, 24.2, 23.9, 26.8, 25.0, 24.4, 24.0];

// Screening uptake by programme (%), 2010–2023
const breastData = [76.8, 75.9, 76.2, 75.8, 75.4, 74.9, 74.2, 73.8, 65.0, 70.1, 72.5, 73.8, 74.4, 74.4];
const bowelData = [52.1, 53.0, 53.8, 54.2, 54.9, 55.3, 56.1, 57.0, 55.0, 60.5, 63.2, 65.0, 66.8, 66.8];
const cervicalData = [74.2, 73.5, 73.1, 72.5, 72.0, 71.4, 70.1, 69.5, 65.0, 68.3, 68.5, 68.5, 68.5, 68.5];

const survivalSeries: Series[] = [
  {
    id: 'one-year-survival',
    label: 'One-year survival rate (%)',
    colour: '#2A9D8F',
    data: survivalData.map((v, i) => ({ date: new Date(2001 + i, 5, 1), value: v })),
  },
];

const screeningSeries: Series[] = [
  {
    id: 'breast',
    label: 'Breast screening (%)',
    colour: '#264653',
    data: breastData.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
  },
  {
    id: 'bowel',
    label: 'Bowel screening (%)',
    colour: '#2A9D8F',
    data: bowelData.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
  },
  {
    id: 'cervical',
    label: 'Cervical screening (%)',
    colour: '#F4A261',
    data: cervicalData.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
  },
];

const survivalAnnotations: Annotation[] = [
  { date: new Date(2013, 0, 1), label: '2013: Cancer strategy launched' },
  { date: new Date(2020, 2, 1), label: '2020: COVID-19 diagnostic disruption' },
];

const screeningAnnotations: Annotation[] = [
  { date: new Date(2018, 6, 1), label: '2018: FIT test replaces gFOBt (bowel)' },
  { date: new Date(2020, 2, 1), label: '2020: COVID-19 screening pause' },
];

export default function CancerOneYearSurvivalPage() {
  return (
    <>
      <TopicNav topic="Health" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Health"
          question="How Many Cancer Patients Survive One Year?"
          finding="One-year cancer survival in England has risen from 59.8% in 2001 to 73.7% in 2023 — a significant improvement driven by better treatments and faster diagnostic pathways. But a quarter of cancers are still diagnosed late, and the UK consistently ranks in the bottom third of comparable European nations for cancer survival."
          colour="#2A9D8F"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>In 2001, fewer than six in ten adults diagnosed with cancer in England survived a full year. By 2023, that figure had climbed to 73.7% — a testament to better treatments, faster diagnostic pathways, and the quiet expansion of screening programmes that catch disease before symptoms appear. The gains have been uneven across cancer types: breast and prostate one-year survival now exceeds 95%, while lung cancer — still the biggest killer — has seen its one-year survival rise from under 30% to 44.6%, the steepest absolute improvement of any major cancer. Immunotherapy and targeted treatments introduced since 2016 have been a key driver of that shift.</p>
            <p>Yet the story is complicated by persistent weaknesses in early detection. Nearly a quarter of all cancers are still diagnosed at stage 3 or 4, when treatment options narrow and survival rates drop sharply. The pandemic made things worse: screening programmes were paused for months in 2020, and the resulting diagnostic backlog pushed late-stage diagnoses up to 26.8% that year. Screening uptake has since recovered but remains below pre-pandemic levels for breast and cervical programmes. International comparisons remain uncomfortable — the UK consistently ranks in the bottom third of comparable European countries for one-year cancer survival, behind Denmark, the Netherlands, Norway, and Australia. The gap is not explained by treatment quality but by how late cancer is found.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Survival Trend' },
          { id: 'sec-chart2', label: 'Screening Uptake' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="One-year cancer survival"
              value="73.7%"
              unit="2023"
              direction="up"
              polarity="up-is-good"
              changeText="Up from 59.8% in 2001 · +13.9pp in two decades"
              sparklineData={[66.6, 67.4, 68.1, 68.8, 70.2, 71.4, 72.4, 71.5, 72.8, 73.7]}
              source="ONS · Cancer survival in England 2023"
              href="#sec-chart1"
            />
            <MetricCard
              label="Late-stage diagnosis rate"
              value="24.0%"
              unit="2023"
              direction="down"
              polarity="up-is-bad"
              changeText="Down from 26.8% pandemic peak · still 1 in 4 found late"
              sparklineData={[25.8, 25.2, 24.6, 23.9, 26.8, 25.0, 24.4, 24.0]}
              source="NHS England · Cancer staging data 2023"
              href="#sec-chart1"
            />
            <MetricCard
              label="Bowel screening uptake"
              value="66.8%"
              unit="2023"
              direction="up"
              polarity="up-is-good"
              changeText="Highest ever · up from 52.1% in 2010 · FIT test driving gain"
              sparklineData={[52.1, 54.2, 55.3, 57.0, 55.0, 60.5, 65.0, 66.8]}
              source="NHS Digital · Cancer Screening Statistics 2023"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="One-year cancer survival rate, England, 2001–2023"
              subtitle="Proportion of adults surviving at least one year after cancer diagnosis. Age-standardised. Steady improvement interrupted by COVID-19 diagnostic disruption in 2020."
              series={survivalSeries}
              annotations={survivalAnnotations}
              yLabel="Survival (%)"
              source={{ name: 'Office for National Statistics', dataset: 'Cancer survival in England — adults diagnosed', url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/healthandsocialcare/conditionsanddiseases/datasets/cancersurvivalratescancersurvivalinenglandadultsdiagnosed', frequency: 'annual', date: '2023' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Cancer screening uptake by programme, England, 2010–2023"
              subtitle="Percentage of eligible population screened. Bowel uptake rising since FIT test introduction; breast and cervical both below 80% target and below pre-pandemic levels."
              series={screeningSeries}
              annotations={screeningAnnotations}
              targetLine={{ value: 80, label: 'NHS 80% uptake target (cervical, breast)' }}
              yLabel="Uptake (%)"
              source={{ name: 'NHS Digital', dataset: 'Cancer screening programme statistics', url: 'https://digital.nhs.uk/data-and-information/publications/statistical/cancer-screening', frequency: 'annual', date: '2023' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Lung cancer survival improving fastest of any major cancer type"
            value="+6.1pp"
            unit="one-year survival in 5 years"
            description="Lung cancer one-year survival has risen from 38.5% to 44.6% in just five years — the fastest improvement of any major cancer type. This reflects immunotherapy and targeted treatments on the NHS, and early results from the Targeted Lung Health Check programme, which detects 80% of lung cancers at early stages in pilot areas compared to 27% through the standard symptomatic pathway. Rolling out nationally by 2027 could prevent an estimated 12,000 lung cancer deaths over its first decade."
            source="Source: ONS — Cancer survival in England 2023. NHS England — Targeted Lung Health Check interim evaluation 2025."
          />
        </ScrollReveal>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.ons.gov.uk/peoplepopulationandcommunity/healthandsocialcare/conditionsanddiseases/datasets/cancersurvivalratescancersurvivalinenglandadultsdiagnosed" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ONS — Cancer survival in England</a> — age-standardised net survival estimates. Updated annually. Retrieved March 2026.</p>
            <p><a href="https://digital.nhs.uk/data-and-information/publications/statistical/cancer-screening" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS Digital — Cancer screening programme statistics</a> — uptake by programme. Retrieved March 2026.</p>
            <p><a href="https://www.england.nhs.uk/statistics/statistical-work-areas/cancer-waiting-times/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS England — Cancer Waiting Times and staging data</a> — late-stage diagnosis rates. Retrieved March 2026.</p>
            <p className="mt-2">COVID-19 caused major diagnostic disruption in 2020; fewer cancers were diagnosed and those found tended to be more advanced, temporarily affecting survival figures. Staging completeness has improved over time, so apparent increases in late-stage diagnosis may partly reflect better recording. Data covers England only.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
