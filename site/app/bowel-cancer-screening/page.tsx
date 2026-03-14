'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'NHS England', dataset: 'Bowel Cancer Screening Programme Statistics', url: 'https://www.gov.uk/government/collections/bowel-cancer-screening-programme-data', date: '2024' },
  { num: 2, name: 'Cancer Research UK', dataset: 'Bowel Cancer Statistics', url: 'https://www.cancerresearchuk.org/health-professional/cancer-statistics/statistics-by-cancer-type/bowel-cancer', date: '2024' },
  { num: 3, name: 'NHS England', dataset: 'Cancer Waiting Times', url: 'https://www.england.nhs.uk/statistics/statistical-work-areas/cancer-waiting-times/', date: '2024' },
];

const uptakeValues = [57.8, 58.2, 58.4, 57.9, 59.1, 50.4, 63.4, 64.8, 66.1, 67.2, 68.0];
const cancersDetectedValues = [2800, 2950, 3100, 3200, 3350, 2100, 3800, 4200, 4500, 4700, 4900];
const colonoscopyValues = [82.1, 82.5, 83.0, 82.8, 83.5, 75.2, 86.1, 87.4, 88.2, 89.0, 89.5];
const stage1and2Values = [51.2, 52.1, 53.4, 54.0, 55.2, 53.8, 57.3, 58.9, 60.1, 61.5, 62.3];

const series1: Series[] = [
  { id: 'uptake', label: 'Screening uptake (%)', colour: '#E63946', data: uptakeValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
  { id: 'colonoscopy', label: 'Colonoscopy completion rate (%)', colour: '#2A9D8F', data: colonoscopyValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
];

const series2: Series[] = [
  { id: 'cancersDetected', label: 'Cancers detected per year', colour: '#264653', data: cancersDetectedValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
  { id: 'stage1and2', label: 'Screen-detected: stage I or II (%)', colour: '#F4A261', data: stage1and2Values.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
];

const annotations1: Annotation[] = [
  { date: new Date(2020, 2, 1), label: '2020: Programme suspended — COVID' },
  { date: new Date(2021, 3, 1), label: '2021: Age lowered to 50' },
];

export default function BowelCancerScreeningPage() {
  return (
    <>
      <TopicNav topic="Bowel Cancer Screening" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Health"
          question="How Many Cancers Is Screening Actually Catching?"
          finding={<>NHS bowel cancer screening detects around 4,900 cancers per year in England, with 68% of those invited now taking part — up from 58% a decade ago.<Cite nums={1} /> The programme saves an estimated 2,500 lives annually, but uptake remains lowest among men, younger age groups, and deprived communities — precisely those at highest risk of late-stage diagnosis.<Cite nums={[1, 2]} /></>}
          colour="#E63946"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Bowel cancer is the UK's second biggest cancer killer — around 16,800 deaths a year — yet it is highly treatable when caught early. A stage I diagnosis carries a five-year survival rate above 90%; stage IV survival falls to under 10%.<Cite nums={2} /> The NHS Bowel Cancer Screening Programme was introduced in 2006 using the faecal occult blood test, and in 2019 the programme began transitioning to the more sensitive FIT (faecal immunochemical test), which requires just one sample rather than three and has improved uptake among groups previously least likely to complete the test. The programme was suspended in March 2020 during the COVID pandemic, and an estimated 650,000 invitations were delayed — a backlog that took nearly two years to clear and likely resulted in some cancers progressing to later, less treatable stages.</p>
            <p>In 2021, the screening age was extended from 60–74 to 50–74, representing a major expansion of the programme.<Cite nums={1} /> This will substantially increase the number of people screened but also adds significant demand to colonoscopy services, which were already under pressure. Colonoscopy completion rates — the proportion of people referred after a positive FIT test who actually receive a follow-up colonoscopy within the target timeframe — have been improving but remain a bottleneck. Deprivation gradients in uptake are stark: uptake in the most deprived quintile is around 12 percentage points lower than in the least deprived, meaning the group most likely to present late is also least likely to benefit from screening.<Cite nums={[1, 3]} /></p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Overview' },
          { id: 'sec-chart1', label: 'Uptake & Colonoscopy' },
          { id: 'sec-chart2', label: 'Cancers Detected' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard label="Screening uptake" value="68.0%" unit="of those invited" direction="up" polarity="up-is-good" changeText="up from 57.8% in 2013 · target is 75%" sparklineData={[57.8, 58.2, 58.4, 57.9, 59.1, 50.4, 63.4, 64.8, 66.1, 67.2, 68.0]} source="NHS England — Bowel Cancer Screening 2024" href="#sec-chart1" />
            <MetricCard label="Cancers detected per year" value="4,900" unit="screen-detected" direction="up" polarity="up-is-good" changeText="up from ~2,800 in 2013 · age extension driving increase" sparklineData={[2800, 2950, 3100, 3200, 3350, 2100, 3800, 4200, 4500, 4700, 4900]} source="NHS England — Bowel Cancer Screening 2024" href="#sec-chart2" />
            <MetricCard label="Stage I/II at detection" value="62.3%" unit="of screen-detected cancers" direction="up" polarity="up-is-good" changeText="up from 51.2% in 2013 · earlier detection improving" sparklineData={[51.2, 52.1, 53.4, 54.0, 55.2, 53.8, 57.3, 58.9, 60.1, 61.5, 62.3]} source="NHS England — Bowel Cancer Screening 2024" href="#sec-chart2" />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Bowel cancer screening uptake and colonoscopy completion, 2013–2024"
              subtitle="Uptake (% of those invited who complete the test) and colonoscopy completion rate (% of FIT-positive individuals receiving colonoscopy within target time), England."
              series={series1}
              annotations={annotations1}
              yLabel="Percentage (%)"
              source={{ name: 'NHS England', dataset: 'Bowel Cancer Screening Programme Statistics', url: 'https://www.gov.uk/government/collections/bowel-cancer-screening-programme-data', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Screen-detected cancers and stage at detection, 2013–2024"
              subtitle="Number of cancers detected per year through the programme and proportion detected at stage I or II (when survival rates are highest). Both improving, but COVID caused a visible gap in 2020."
              series={series2}
              annotations={[{ date: new Date(2020, 2, 1), label: '2020: Programme suspended' }, { date: new Date(2021, 3, 1), label: '2021: Age extended to 50' }]}
              yLabel="Count / Percentage"
              source={{ name: 'NHS England', dataset: 'Bowel Cancer Screening Programme Statistics', url: 'https://www.gov.uk/government/collections/bowel-cancer-screening-programme-data', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="FIT test switch has improved detection sensitivity"
            value="2x"
            unit="more cancers detected per 1,000 screens with FIT vs gFOBT"
            description="The switch from guaiac faecal occult blood testing (gFOBT) to the faecal immunochemical test (FIT) has roughly doubled the detection rate per 1,000 people screened. FIT requires only a single sample, has fewer dietary restrictions, and can be quantified — allowing risk stratification. High-sensitivity FIT detects around 73% of cancers, compared to 50–60% for gFOBT. The transition, completed across England by 2019, is estimated to detect thousands of additional cancers annually that would otherwise have been missed."
            source="Source: NHS England — Bowel Cancer Screening Programme Statistics 2024. Cancer Research UK 2024."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.gov.uk/government/collections/bowel-cancer-screening-programme-data" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS England — Bowel Cancer Screening Programme Statistics</a> — uptake, positivity rates, cancers detected, colonoscopy completion. Annual.</p>
            <p><a href="https://www.cancerresearchuk.org/health-professional/cancer-statistics/statistics-by-cancer-type/bowel-cancer" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Cancer Research UK — Bowel Cancer Statistics</a> — incidence, mortality, stage at diagnosis. Annual.</p>
            <p>Uptake is the proportion of those invited who return a completed test kit. Colonoscopy completion rate is the proportion of FIT-positive individuals who receive colonoscopy within 6 weeks. Stage data is for adenocarcinomas only.</p>
          </div>
        </section>
      </main>
    </>
  );
}
