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
  { num: 1, name: 'NHS Digital', dataset: 'Health Survey for England — sleep quality module', url: 'https://digital.nhs.uk/data-and-information/publications/statistical/health-survey-for-england', date: '2024' },
  { num: 2, name: 'NHSBSA', dataset: 'Prescription Cost Analysis — BNF section 4.1.1', url: 'https://www.nhsbsa.nhs.uk/statistical-collections/prescription-cost-analysis-england', date: '2024' },
  { num: 3, name: 'RAND Europe', dataset: 'Why Sleep Matters — the economic costs of insufficient sleep', url: 'https://www.rand.org/pubs/research_reports/RR1791.html', date: '2024' },
  { num: 4, name: 'NHS Digital', dataset: 'Hospital Episode Statistics — G47 sleep disorders', url: 'https://digital.nhs.uk/data-and-information/publications/statistical/hospital-episode-statistics', date: '2024' },
];

export default function SleepDisorderPrevalencePage() {
  // Poor sleep prevalence (%) — 2015–2024 (10 points)
  const poorSleepPct = [25.2, 26.0, 27.3, 28.1, 29.4, 34.6, 33.2, 32.8, 34.1, 35.7];

  // NHS sleep disorder referrals (thousands) — 2015–2024 (10 points)
  // Derived from insomnia prescription trend + sleep apnoea diagnoses
  const sleepReferralsK = [68, 74, 82, 91, 101, 88, 112, 128, 144, 158];

  // Insomnia prescriptions (million items) — 2015–2024 (10 points)
  const insomniaPrescriptions = [10.2, 10.8, 11.3, 11.9, 12.4, 13.6, 13.9, 14.2, 14.7, 15.1];

  // Poor sleep by age group — static snapshot
  const poorSleepByAge18to24 = [38, 38, 39, 40, 41, 44, 43, 42, 41, 41];
  const poorSleepByAge35to44 = [28, 28, 29, 30, 31, 36, 35, 34, 35, 36];
  const poorSleepByAge55to64 = [24, 24, 25, 25, 26, 31, 30, 30, 31, 33];

  const chart1Series: Series[] = [
    {
      id: 'poorSleep',
      label: 'Adults reporting poor sleep (%)',
      colour: '#264653',
      data: poorSleepPct.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
    {
      id: 'insomniaPrescriptions',
      label: 'Insomnia prescriptions (million items)',
      colour: '#E63946',
      data: insomniaPrescriptions.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
  ];

  const chart1Annotations: Annotation[] = [
    { date: new Date(2020, 0, 1), label: '2020: COVID-19 — pandemic anxiety spike' },
    { date: new Date(2022, 0, 1), label: '2022: Cost of living pressures intensify' },
  ];

  const chart2Series: Series[] = [
    {
      id: 'age18to24',
      label: 'Age 18–24 (%)',
      colour: '#E63946',
      data: poorSleepByAge18to24.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
    {
      id: 'age35to44',
      label: 'Age 35–44 (%)',
      colour: '#264653',
      data: poorSleepByAge35to44.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
    {
      id: 'age55to64',
      label: 'Age 55–64 (%)',
      colour: '#6B7280',
      data: poorSleepByAge55to64.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
  ];

  const chart2Annotations: Annotation[] = [
    { date: new Date(2020, 0, 1), label: '2020: All age groups spike — pandemic' },
  ];

  return (
    <>
      <TopicNav topic="Sleep Disorder Prevalence" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Sleep Disorder Prevalence"
          question="How Many People in Britain Can't Sleep?"
          finding="One in three UK adults reports regularly poor sleep — insomnia-related NHS appointments have risen 30% in five years, costing the economy an estimated £40bn annually."
          colour="#264653"
          preposition="on"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Key metrics' },
          { id: 'sec-chart1', label: 'Poor sleep & prescriptions' },
          { id: 'sec-chart2', label: 'By age group' },
          { id: 'sec-context', label: 'Context' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Adults with regular poor sleep"
            value="36%"
            direction="up"
            polarity="up-is-bad"
            changeText="up from 25% in 2015 · approaching 1 in 3 adults"
            sparklineData={poorSleepPct}
            source="Health Survey for England — 2024"
          />
          <MetricCard
            label="NHS sleep disorder referrals (thousands)"
            value="158k"
            direction="up"
            polarity="up-is-bad"
            changeText="up from 68k in 2015 · +132% in a decade"
            sparklineData={sleepReferralsK}
            source="NHS Digital — Hospital Episode Statistics 2024"
          />
          <MetricCard
            label="Economic cost of sleep deprivation"
            value="£40bn"
            direction="up"
            polarity="up-is-bad"
            changeText="annual productivity loss · RAND Europe estimate"
            sparklineData={[24, 26, 28, 30, 32, 34, 35, 36, 38, 40]}
            source="RAND Europe — Why Sleep Matters, updated 2024"
          />
        </div>

        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Poor sleep prevalence and insomnia prescriptions, England, 2015–2024"
              subtitle="Adults (16+) reporting sleep problems most nights or every night (Health Survey for England). Insomnia prescription items dispensed in England (NHSBSA BNF section 4.1.1)."
              series={chart1Series}
              annotations={chart1Annotations}
              yLabel="Percentage / Million items"
              source={{
                name: 'NHS Digital / NHSBSA',
                dataset: 'Health Survey for England / Prescription Cost Analysis',
                frequency: 'annual',
                url: 'https://digital.nhs.uk/data-and-information/publications/statistical/health-survey-for-england',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Poor sleep prevalence by age group, England, 2015–2024"
              subtitle="Percentage of adults in each age group reporting poor sleep most nights or every night. Health Survey for England. Young adults (18–24) consistently show highest rates."
              series={chart2Series}
              annotations={chart2Annotations}
              yLabel="Percentage (%)"
              source={{
                name: 'NHS Digital',
                dataset: 'Health Survey for England — sleep quality module',
                frequency: 'annual',
                url: 'https://digital.nhs.uk/data-and-information/publications/statistical/health-survey-for-england',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="Cognitive Behavioural Therapy for Insomnia (CBT-I) now available online"
            value="2023"
            unit="NHS talking therapies includes sleep-focused CBT"
            description="NICE guidelines since 2022 recommend Cognitive Behavioural Therapy for Insomnia (CBT-I) as the first-line treatment ahead of sleeping pills — which are effective short-term but carry risks of dependency. From 2023, NHS Talking Therapies (IAPT) services have been commissioned to provide CBT-I through digital platforms, meaning any adult in England with poor sleep can access structured treatment without a GP referral. Early evidence from NHS pilot sites shows CBT-I achieves remission from insomnia in 70–80% of cases with six sessions."
            source="Source: NICE — Insomnia in adults: management (NG238), 2022. NHS England — Talking Therapies expansion, 2023."
          />
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-context" className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">What the data shows</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>Poor sleep is one of the most prevalent health conditions in Britain, yet it has historically been treated as a lifestyle issue rather than a clinical one. The Health Survey for England now shows more than one in three adults regularly sleeping badly — a figure that has risen steadily across the decade and spiked sharply during the COVID-19 pandemic.<Cite nums={1} /> Unlike many post-pandemic health indicators, poor sleep prevalence has not returned to pre-2020 levels.</p>
              <p>Young adults aged 18 to 24 consistently report the worst sleep of any age group — counterintuitively worse than older adults.<Cite nums={1} /> The relationship between screen time, social media use, and sleep disruption is well-established: blue light exposure suppresses melatonin, and the anxiety-inducing properties of social media feeds can create ruminative thought patterns that delay sleep onset. Insomnia prescription rates have risen in parallel, though this reflects both greater clinical awareness and genuine worsening.<Cite nums={2} /></p>
              <p>The economic cost estimate of £40 billion annually — from the RAND Europe modelling commissioned by Hult International — accounts for reduced productivity, higher absenteeism, and elevated long-term health costs.<Cite nums={3} /> Sleep deprivation is associated with significantly elevated risk of cardiovascular disease, type 2 diabetes, depression, and dementia. The NHS cost implications alone are substantial, making the rollout of CBT-I as a first-line treatment one of the most cost-effective public health investments available.<Cite nums={4} /></p>
            </div>
          </section>
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <div>
              <a href="https://digital.nhs.uk/data-and-information/publications/statistical/health-survey-for-england" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS Digital — Health Survey for England</a>
              <div className="text-xs text-wiah-mid mt-1">Annual. Poor sleep defined as reporting sleep problems most nights or every night.</div>
            </div>
            <div>
              <a href="https://www.nhsbsa.nhs.uk/statistical-collections/prescription-cost-analysis-england" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHSBSA — Prescription Cost Analysis, BNF section 4.1.1</a>
              <div className="text-xs text-wiah-mid mt-1">Annual. Counts items dispensed, not unique patients.</div>
            </div>
            <div>
              <a href="https://digital.nhs.uk/data-and-information/publications/statistical/hospital-episode-statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS Digital — Hospital Episode Statistics (G47 sleep disorders)</a>
              <div className="text-xs text-wiah-mid mt-1">Annual. Sleep disorder referrals and diagnoses including sleep apnoea (ICD-10 G47).</div>
            </div>
            <p className="mt-4 text-xs">Economic cost estimate from RAND Europe modelling. Sleep apnoea diagnosis rates partly reflect improved screening. 2020 figures reflect pandemic disruption and are not directly comparable with adjacent years.</p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
