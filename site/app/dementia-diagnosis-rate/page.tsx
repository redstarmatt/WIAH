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

// Dementia diagnosis rate (%), 2012–2025
const diagnosisRateValues = [58.6, 60.2, 63.1, 67.4, 67.6, 67.2, 66.8, 65.4, 63.1, 61.6, 62.0, 62.9, 62.2, 61.4];

// Estimated undiagnosed (thousands), 2012–2025
const undiagnosedValues = [420, 410, 395, 360, 340, 345, 350, 360, 395, 410, 405, 400, 395, 385];

// Memory clinic median wait (weeks), 2015–2025
const clinicWaitValues = [4.2, 4.8, 5.2, 5.8, 6.1, 7.3, 13.2, 11.8, 10.4, 9.1, 8.2];

const series1: Series[] = [
  {
    id: 'diagnosis-rate',
    label: 'Diagnosis rate (%)',
    colour: '#E63946',
    data: diagnosisRateValues.map((v, i) => ({ date: new Date(2012 + i, 0, 1), value: v })),
  },
];

const series2: Series[] = [
  {
    id: 'clinic-wait',
    label: 'Memory clinic median wait (weeks)',
    colour: '#264653',
    data: clinicWaitValues.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
];

const annotations1: Annotation[] = [
  { date: new Date(2014, 6, 1), label: "2014: PM's Dementia Challenge target set" },
  { date: new Date(2017, 0, 1), label: '2017: peak rate 67.6% — then decline begins' },
  { date: new Date(2020, 2, 1), label: '2020: COVID — GP referrals collapse' },
];

const annotations2: Annotation[] = [
  { date: new Date(2020, 2, 1), label: '2020: COVID — clinics suspended' },
];

const targetLine = { value: 66.7, label: 'NHS 66.7% target' };

const editorialRefs: Reference[] = [
  { num: 1, name: 'NHS England', dataset: 'Recorded Dementia Diagnoses', url: 'https://digital.nhs.uk/data-and-information/publications/statistical/recorded-dementia-diagnoses', date: 'Feb 2026' },
  { num: 2, name: 'Alzheimer\'s Society', dataset: 'Dementia UK Update — prevalence estimates', url: 'https://www.alzheimers.org.uk/about-us/policy-and-influencing/dementia-uk-report', date: '2024' },
  { num: 3, name: 'Royal College of Psychiatrists', dataset: 'Memory Services National Accreditation Programme (MSNAP)', url: 'https://www.rcpsych.ac.uk/improving-care/ccqi/national-clinical-audits/memory-services-national-accreditation-programme', date: '2025' },
];

export default function DementiaDiagnosisRatePage() {
  return (
    <>
      <TopicNav topic="Dementia Diagnosis Rate" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Dementia Diagnosis Rate"
          question="Why Are Hundreds of Thousands Living with Undiagnosed Dementia?"
          finding="The dementia diagnosis rate has fallen to 61.4% — well below the NHS 66.7% target. An estimated 385,000 people in England are living with undiagnosed dementia, missing out on treatment, support, and the chance to plan for their future. Memory clinic waits remain double their 2015 levels."
          colour="#E63946"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>In 2014, when the Prime Minister launched the Dementia Challenge, the diagnosis rate stood at 58.6%. A major push through GP incentive schemes and memory clinic expansion drove the rate to a peak of 67.6% by 2017 — briefly exceeding the ambition standard of 66.7%. It has fallen every year since. The COVID-19 pandemic accelerated a decline that was already underway: face-to-face GP consultations collapsed, memory clinic referrals dropped by over 40% in the first lockdown, and many older people with early cognitive symptoms never presented. By 2025, the rate has slipped to 61.4%, meaning more than one in three people estimated to have dementia have no formal diagnosis on their GP record.</p>
            <p>The consequences of non-diagnosis are concrete and serious. Without a diagnosis, people cannot access dementia-specific medications such as cholinesterase inhibitors, which can slow symptom progression in early-stage Alzheimer's disease. They cannot be referred to post-diagnostic support services — Admiral Nurses, cognitive stimulation therapy groups, or social prescribing. They are far less likely to set up lasting powers of attorney, make advance care plans, or have conversations with their families about the future while they still can. Memory clinic waiting times, which surged to a median of 13.2 weeks during the pandemic, have recovered to 8.2 weeks but remain double the 4.2-week median seen in 2015.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Diagnosis Rate' },
          { id: 'sec-chart2', label: 'Clinic Waits' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Dementia diagnosis rate"
              value="61.4%"
              unit="2025"
              direction="down"
              polarity="up-is-good"
              changeText="down from 67.6% peak in 2017 · NHS target is 66.7%"
              sparklineData={[67.6, 67.2, 66.8, 65.4, 63.1, 61.6, 62.0, 62.9, 62.2, 61.4]}
              source="NHS England — Recorded Dementia Diagnoses 2025"
              href="#sec-chart1"
            />
            <MetricCard
              label="People with undiagnosed dementia"
              value="385K"
              unit="est. 2025"
              direction="up"
              polarity="up-is-bad"
              changeText="rising as population ages · London worst at 55.2% diagnosis rate"
              sparklineData={[340, 345, 350, 360, 395, 410, 405, 400, 395, 385]}
              source="NHS England / Alzheimer's Society — Prevalence Estimates 2025"
              href="#sec-chart1"
            />
            <MetricCard
              label="Memory clinic median wait"
              value="8.2 wks"
              unit="2025"
              direction="down"
              polarity="up-is-bad"
              changeText="down from 13.2-week COVID peak · still double 2015 levels"
              sparklineData={[4.2, 4.8, 5.2, 5.8, 6.1, 7.3, 13.2, 11.8, 10.4, 9.1, 8.2]}
              source="Royal College of Psychiatrists — MSNAP 2025"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Dementia diagnosis rate, England, 2012–2025"
              subtitle="Percentage of estimated dementia cases with a formal GP-recorded diagnosis. NHS ambition standard is 66.7%. The rate peaked in 2017 and has declined every year since, with COVID accelerating the fall."
              series={series1}
              annotations={annotations1}
              targetLine={targetLine}
              yLabel="Diagnosis rate (%)"
              source={{ name: 'NHS England', dataset: 'Recorded Dementia Diagnoses', url: 'https://digital.nhs.uk/data-and-information/publications/statistical/recorded-dementia-diagnoses', frequency: 'monthly', date: 'Feb 2026' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Memory clinic median waiting time, England, 2015–2025"
              subtitle="Median weeks from GP referral to first memory clinic assessment. COVID caused a sharp spike in 2020; waits have recovered but remain double the 2015 baseline — a critical delay for a condition where early intervention matters most."
              series={series2}
              annotations={annotations2}
              yLabel="Weeks (median)"
              source={{ name: 'Royal College of Psychiatrists', dataset: 'Memory Services National Accreditation Programme (MSNAP)', url: 'https://www.rcpsych.ac.uk/improving-care/ccqi/national-clinical-audits/memory-services-national-accreditation-programme', frequency: 'annual', date: 'Feb 2026' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="North East consistently meeting the diagnosis target"
            value="66.8%"
            unit="North East diagnosis rate — the only region meeting the 66.7% target"
            description="The North East is the only NHS England region consistently meeting the 66.7% ambition standard for dementia diagnosis. This reflects sustained investment in memory assessment services, strong primary care networks with proactive case-finding, and effective integration between GP practices and specialist dementia teams. The region has maintained its diagnosis rate above the target even through the pandemic recovery period, demonstrating that the national decline is not inevitable — it reflects choices about resource allocation and clinical priority. New blood biomarker tests for Alzheimer's disease, piloted in 2024–25, could enable earlier and cheaper diagnosis if rolled out at scale."
            source="Source: NHS England — Recorded Dementia Diagnoses by region 2025. Royal College of Psychiatrists — MSNAP Annual Report."
          />
        </ScrollReveal>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://digital.nhs.uk/data-and-information/publications/statistical/recorded-dementia-diagnoses" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS England — Recorded Dementia Diagnoses</a> — monthly GP-registered dementia diagnoses. Retrieved Feb 2026.</p>
            <p><a href="https://www.alzheimers.org.uk/about-us/policy-and-influencing/dementia-uk-report" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Alzheimer's Society — Dementia UK Update</a> — prevalence estimates by age and region. Periodic.</p>
            <p><a href="https://www.rcpsych.ac.uk/improving-care/ccqi/national-clinical-audits/memory-services-national-accreditation-programme" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Royal College of Psychiatrists — MSNAP</a> — memory clinic waiting time data. Annual. 2025.</p>
            <p>Diagnosis rate is the percentage of estimated dementia prevalence (from CFAS II model) that has a formal GP-recorded diagnosis. Undiagnosed estimates are derived from CFAS II prevalence minus GP-registered diagnoses. Regional rates reflect ICB-level data aggregated to NHS England regions.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
