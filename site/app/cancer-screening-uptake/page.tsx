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

// Cancer screening uptake by programme (%), England, 2015–2023
const cervicalData = [74.2, 73.1, 72.0, 71.4, 70.1, 69.5, 65.0, 68.3, 68.5];
const breastData = [76.8, 75.9, 75.4, 74.9, 74.2, 73.8, 65.0, 70.1, 74.4];
const bowelData = [58.4, 58.9, 59.4, 60.4, 61.2, 57.0, 55.0, 60.1, 66.4];

const allSeries: Series[] = [
  {
    id: 'cervical',
    label: 'Cervical screening (%)',
    colour: '#E63946',
    data: cervicalData.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
  {
    id: 'breast',
    label: 'Breast screening (%)',
    colour: '#264653',
    data: breastData.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
  {
    id: 'bowel',
    label: 'Bowel screening (%)',
    colour: '#2A9D8F',
    data: bowelData.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
];

// Deprivation gap: cervical screening uptake by quintile (2023)
const deprivationGapSeries: Series[] = [
  {
    id: 'most-deprived',
    label: 'Most deprived quintile (%)',
    colour: '#E63946',
    data: [
      { date: new Date(2018, 0, 1), value: 62.5 },
      { date: new Date(2019, 0, 1), value: 61.8 },
      { date: new Date(2020, 0, 1), value: 57.2 },
      { date: new Date(2021, 0, 1), value: 59.0 },
      { date: new Date(2022, 0, 1), value: 60.1 },
      { date: new Date(2023, 0, 1), value: 60.5 },
    ],
  },
  {
    id: 'least-deprived',
    label: 'Least deprived quintile (%)',
    colour: '#2A9D8F',
    data: [
      { date: new Date(2018, 0, 1), value: 80.2 },
      { date: new Date(2019, 0, 1), value: 79.5 },
      { date: new Date(2020, 0, 1), value: 72.0 },
      { date: new Date(2021, 0, 1), value: 76.8 },
      { date: new Date(2022, 0, 1), value: 78.1 },
      { date: new Date(2023, 0, 1), value: 78.8 },
    ],
  },
];

const screeningAnnotations: Annotation[] = [
  { date: new Date(2018, 6, 1), label: '2018: FIT test introduced (bowel)' },
  { date: new Date(2020, 2, 1), label: '2020: COVID-19 programmes paused' },
];

const deprivationAnnotations: Annotation[] = [
  { date: new Date(2020, 2, 1), label: '2020: COVID widens gap temporarily' },
];

const editorialRefs: Reference[] = [
  { num: 1, name: 'NHS Digital', dataset: 'Cervical Screening Programme Statistics', url: 'https://digital.nhs.uk/data-and-information/publications/statistical/cervical-screening-programme', date: 'March 2026' },
  { num: 2, name: 'NHS Digital', dataset: 'Breast Screening Programme Statistics', url: 'https://digital.nhs.uk/data-and-information/publications/statistical/breast-screening-programme', date: 'March 2026' },
  { num: 3, name: 'NHS Digital', dataset: 'Bowel Cancer Screening Programme', url: 'https://digital.nhs.uk/data-and-information/publications/statistical/bowel-cancer-screening-programme', date: 'March 2026' },
];

export default function CancerScreeningUptakePage() {
  return (
    <>
      <TopicNav topic="Cancer Screening Uptake" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Cancer Screening Uptake"
          question="Are You Getting Screened for Cancer?"
          finding="None of England's three national cancer screening programmes are meeting their uptake targets. Cervical screening coverage has fallen to 68.5% against an 80% target. Bowel screening is the exception — rising to 66.4% since the introduction of the simpler FIT home test — but a persistent 18-point deprivation gap means the highest-risk populations are the least likely to be screened."
          colour="#E63946"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>England runs three national cancer screening programmes — cervical, breast, and bowel — but none is meeting its uptake target. Cervical screening coverage fell from 74.2% in 2015 to 68.5% in 2023, with a sharp pandemic dip that has not fully recovered; the 80% population-level effectiveness threshold has not been met for over a decade.<Cite nums={1} /> Breast screening stands at 74.4% against an 80% target; the 2018 disclosure that around 450,000 women were not invited for screening between 2009 and 2018 — with PHE estimating 135–270 may have died earlier as a result — damaged trust in the programme.<Cite nums={2} /> Bowel screening, improved by home-testing kits, has risen from 58.4% to 66.4% since 2015 but remains below its 75% target.<Cite nums={3} /> NHS England estimates improving bowel uptake to 75% would prevent approximately 2,500 cancer deaths per year.</p>
            <p>Access gaps are systematic and persistent. Women from deprived areas are consistently less likely to attend all three programmes; Black and Asian women are significantly underrepresented relative to their population share, reflecting language barriers, cultural factors, practical obstacles, and historical distrust of health services. Young women aged 25–34 are the least likely group to attend cervical screening — the age at which early detection has the greatest potential impact.<Cite nums={1} /> The deprivation gap in cervical screening alone stands at roughly 18 percentage points between the most and least deprived quintiles.<Cite nums={1} /> Targeted outreach and community partnerships have shown results in pilots but have not been deployed at national scale, meaning preventable deaths continue to accumulate along predictable socioeconomic lines.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Uptake Trends' },
          { id: 'sec-chart2', label: 'Deprivation Gap' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Cervical screening uptake"
              value="68.5%"
              unit="2023"
              direction="down"
              polarity="up-is-good"
              changeText="Target: 80% · peaked at 74.2% in 2015 · declining trend"
              sparklineData={[74.2, 73.1, 72.0, 71.4, 70.1, 65.0, 68.3, 68.5]}
              source="NHS England · Cervical Screening Programme 2023"
              href="#sec-chart1"
            />
            <MetricCard
              label="Breast screening uptake"
              value="74.4%"
              unit="2023"
              direction="flat"
              polarity="up-is-good"
              changeText="Target: 80% · not met since 2008 · trust gap persists"
              sparklineData={[76.8, 75.9, 75.4, 74.9, 74.2, 65.0, 70.1, 74.4]}
              source="NHS England · Breast Screening Programme 2023"
              href="#sec-chart1"
            />
            <MetricCard
              label="Bowel screening uptake"
              value="66.4%"
              unit="2023"
              direction="up"
              polarity="up-is-good"
              changeText="Target: 75% · up from 58.4% in 2015 · FIT test helped"
              sparklineData={[58.4, 58.9, 59.4, 60.4, 61.2, 55.0, 60.1, 66.4]}
              source="NHS England · Bowel Cancer Screening Programme 2023"
              href="#sec-chart1"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Cancer screening uptake by programme, England, 2015–2023"
              subtitle="Percentage of eligible population completing screening. All three programmes below targets of 80% (cervical, breast) and 75% (bowel). COVID-19 caused sharp falls in 2020."
              series={allSeries}
              annotations={screeningAnnotations}
              targetLine={{ value: 80, label: 'NHS 80% target (cervical, breast)' }}
              yLabel="Uptake (%)"
              source={{ name: 'NHS England', dataset: 'Cancer Screening Programmes', url: 'https://digital.nhs.uk/data-and-information/publications/statistical/cancer-screening', frequency: 'annual', date: '2023' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Cervical screening uptake by deprivation quintile, England, 2018–2023"
              subtitle="Most deprived (red) vs least deprived (green) areas. An 18-percentage-point gap means women at highest risk of cervical cancer are least likely to be screened."
              series={deprivationGapSeries}
              annotations={deprivationAnnotations}
              yLabel="Uptake (%)"
              source={{ name: 'NHS Digital', dataset: 'Cervical Screening by Deprivation', url: 'https://digital.nhs.uk/data-and-information/publications/statistical/cervical-screening-programme', frequency: 'annual', date: '2023' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Self-sampling kits could transform cervical screening access"
            value="68.5% → 80%"
            unit="target achievable with self-sampling"
            description="NHS pilot programmes offering vaginal self-sampling kits for HPV testing — mailed to women who have not attended clinic-based cervical screening — have shown uptake rates of 25–35% among previously non-attending women. Scaled nationally, self-sampling could close a significant portion of the uptake gap without requiring additional clinical appointments. Scotland has already moved ahead with national roll-out. In bowel screening, the switch to FIT home testing added 10pp of uptake — demonstrating that test format determines who participates."
            source="Source: NHS England — Cervical Screening self-sampling pilot evaluation 2024. NHS Digital — Bowel Cancer Screening Programme statistics 2024."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://digital.nhs.uk/data-and-information/publications/statistical/cervical-screening-programme" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS Digital — Cervical Screening Programme Statistics</a> — uptake and coverage data. Retrieved March 2026.</p>
            <p><a href="https://digital.nhs.uk/data-and-information/publications/statistical/breast-screening-programme" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS Digital — Breast Screening Programme Statistics</a> — uptake and coverage data. Retrieved March 2026.</p>
            <p><a href="https://digital.nhs.uk/data-and-information/publications/statistical/bowel-cancer-screening-programme" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS Digital — Bowel Cancer Screening Programme</a> — uptake and age expansion data. Retrieved March 2026.</p>
            <p className="mt-2">Uptake figures represent the percentage of eligible individuals who completed screening within the programme recall period. COVID-19 disruption in 2020 resulted in significantly reduced activity across all three programmes. Deprivation analysis uses Index of Multiple Deprivation quintiles. Data covers England only.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
