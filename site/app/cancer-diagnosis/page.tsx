'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import PositiveCallout from '@/components/PositiveCallout';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

// Cancers diagnosed at early stage (1 & 2) (%), 2015–2024
const earlyStageData = [50.2, 51.0, 51.8, 52.4, 52.8, 52.1, 53.0, 53.5, 54.0, 54.1];

// 62-day treatment standard compliance (%), 2015–2024
const target62DayData = [85.3, 84.1, 82.5, 80.2, 77.4, 69.1, 66.8, 65.2, 65.0, 65.4];

// Faster Diagnosis Standard met (%), 2020–2024
const fdsData = [60.0, 62.0, 64.0, 63.5, 64.0, 65.0];

const earlyDiagnosisSeries: Series[] = [
  {
    id: 'early-diagnosis',
    label: 'Cancers at early stage 1 & 2 (%)',
    colour: '#2A9D8F',
    data: earlyStageData.map((v, i) => ({ date: new Date(2015 + i, 5, 1), value: v })),
  },
];

const target62DaySeries: Series[] = [
  {
    id: '62-day-compliance',
    label: '62-day treatment standard compliance (%)',
    colour: '#E63946',
    data: target62DayData.map((v, i) => ({ date: new Date(2015 + i, 5, 1), value: v })),
  },
];

const earlyDiagAnnotations: Annotation[] = [
  { date: new Date(2020, 0, 1), label: '2020: COVID disrupts diagnostic pathways' },
];

const target62Annotations: Annotation[] = [
  { date: new Date(2015, 0, 1), label: '2015: Last year target was consistently met' },
  { date: new Date(2020, 0, 1), label: '2020: Pandemic causes further collapse' },
];

export default function CancerDiagnosisPage() {
  return (
    <>
      <TopicNav topic="Cancer Diagnosis" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Cancer Diagnosis"
          question="How Many Cancers Are Being Caught Too Late?"
          finding="Only 54% of cancers in England are diagnosed at stages 1 or 2, against a target of 75% by 2028 — 21 percentage points short with four years remaining. The 62-day treatment standard has not been met nationally since 2015. Stage 4 bowel cancer has a 7% five-year survival rate compared to 97% at stage 1, making late diagnosis one of the NHS's most consequential failures."
          colour="#E63946"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>England has some of the worst cancer survival rates in Western Europe, and late diagnosis is the single most important explanation. Five-year cancer survival is strongly correlated with stage at diagnosis: for bowel cancer, the five-year survival rate is 97% at stage 1 but falls to 7% at stage 4. For lung cancer, the gap is even more extreme — stage 1 survival exceeds 80% but stage 4 survival is below 5%. England diagnoses 54% of cancers at the earliest stages, against an NHS Long Term Plan target of 75% by 2028. Meeting that target would, by NHS England's own modelling, save approximately 55,000 additional lives per decade. Between 300,000 and 350,000 new cancer cases are diagnosed in England each year; if 75% were diagnosed early rather than 54%, approximately 63,000 more patients per year would face treatment when it is most likely to be curative.</p>
            <p>The 62-day standard — the longest-standing treatment timeliness metric, with a target of 85% compliance — has not been met nationally since 2015. By 2024, only 65% of cancer patients began treatment within 62 days of urgent GP referral. This means approximately 100,000 people per year are waiting longer than they should from GP referral to treatment start. The Faster Diagnosis Standard, introduced in 2020 to ensure resolution of diagnostic uncertainty within 28 days of referral, met its 95% target for only a handful of months before falling back to around 65%. COVID-19 made an existing problem acute: backlog from the pandemic has not been fully resolved, and additional demand from an ageing population continues to outpace diagnostic capacity.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Early Diagnosis' },
          { id: 'sec-chart2', label: '62-Day Standard' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Cancers at early stage (1 & 2)"
              value="54%"
              unit="2024"
              direction="flat"
              polarity="up-is-good"
              changeText="Target: 75% by 2028 · 21pp below target · barely improving"
              sparklineData={[50, 51, 52, 52.8, 52.1, 53.0, 53.5, 54.0]}
              source="NCRAS / NHS England · Cancer Stage at Diagnosis 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="62-day treatment standard met"
              value="65%"
              unit="2024"
              direction="down"
              polarity="up-is-good"
              changeText="Target: 85% · not met since 2015 · ~100k patients waiting too long"
              sparklineData={[85, 84, 82, 80, 77, 69, 67, 65]}
              source="NHS England · Cancer Waiting Times 2024"
              href="#sec-chart2"
            />
            <MetricCard
              label="Faster Diagnosis Standard met"
              value="65%"
              unit="2024"
              direction="flat"
              polarity="up-is-good"
              changeText="Target: 95% · far below · diagnostic capacity the bottleneck"
              sparklineData={[60, 62, 64, 63.5, 64.0, 65.0]}
              source="NHS England · Cancer Waiting Times 2024"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Cancers diagnosed at early stages (1 & 2), England, 2015–2024"
              subtitle="Percentage of all cancers diagnosed at stage 1 or 2. Excludes cancers with unknown stage. NHS target is 75% by 2028 — current trajectory will not meet it."
              series={earlyDiagnosisSeries}
              annotations={earlyDiagAnnotations}
              targetLine={{ value: 75, label: 'NHS target (75% by 2028)' }}
              yLabel="Early diagnoses (%)"
              source={{ name: 'NCRAS / NHS England', dataset: 'Cancer Stage at Diagnosis', url: 'https://www.england.nhs.uk/statistics/statistical-work-areas/cancer-waiting-times/', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="62-day cancer treatment standard compliance, England, 2015–2024"
              subtitle="Percentage of urgent cancer referrals beginning treatment within 62 days of GP referral. Target is 85%. Has not been met nationally since 2015."
              series={target62DaySeries}
              annotations={target62Annotations}
              targetLine={{ value: 85, label: 'NHS target (85%)' }}
              yLabel="Compliance (%)"
              source={{ name: 'NHS England', dataset: 'Cancer Waiting Times', url: 'https://www.england.nhs.uk/statistics/statistical-work-areas/cancer-waiting-times/', frequency: 'monthly', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Targeted Lung Health Checks detect 80% of lung cancers at early stages"
            value="80%"
            unit="early-stage detection in pilot areas"
            description="The NHS Targeted Lung Health Check programme proactively invites high-risk individuals for low-dose CT scanning without waiting for symptoms. In pilot areas, it detected 80% of lung cancers at stage 1 or 2, compared to 27% through the standard symptomatic pathway — a transformative difference in survival odds. Lung cancer 5-year survival has already risen from 8% to 18% since 2010. Rolling the programme out nationally — expected by 2027 — could prevent an estimated 12,000 lung cancer deaths over its first decade."
            source="Source: NHS England — NHS Long Term Plan Cancer Programme 2024. Targeted Lung Health Check interim evaluation."
          />
        </ScrollReveal>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.england.nhs.uk/statistics/statistical-work-areas/cancer-waiting-times/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS England — Cancer Waiting Times</a> — monthly data on two-week wait, 28-day FDS, 31-day, and 62-day targets. Retrieved March 2026.</p>
            <p><a href="https://www.ons.gov.uk/peoplepopulationandcommunity/healthandsocialcare/conditionsanddiseases/datasets/cancersurvivalratescancersurvivalinenglandadultsdiagnosed" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ONS — Cancer survival in England</a> — stage at diagnosis and survival rates. Retrieved March 2026.</p>
            <p><a href="https://www.cancerresearchuk.org/health-professional/cancer-statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Cancer Research UK — Cancer Statistics</a> — incidence, survival and international comparisons. Retrieved March 2026.</p>
            <p className="mt-2">Stage at diagnosis calculated as proportion of cancers with known stage diagnosed at stage 1 or 2. Approximately 15–20% of cancers have unknown stage and are excluded from the denominator. 62-day clock starts at date of urgent GP referral. Data covers England only.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
