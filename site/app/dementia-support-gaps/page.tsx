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

// Dementia diagnosis rate (%), 2015–2023
const diagnosisRateValues = [61.4, 66.1, 67.6, 67.8, 67.4, 62.3, 62.7, 63.3, 64.1];

// Post-diagnostic support rate (%), 2015–2023
const postDiagnosticValues = [55, 56, 57, 58, 58, 56, 57, 59, 60];

const series1: Series[] = [
  {
    id: 'diagnosis-rate',
    label: 'Dementia diagnosis rate (%)',
    colour: '#E63946',
    data: diagnosisRateValues.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
  {
    id: 'post-diagnostic',
    label: 'Receiving post-diagnostic support (%)',
    colour: '#264653',
    data: postDiagnosticValues.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
];

// Unpaid carer hours (billions), 2015–2023
const carerHoursValues = [1.10, 1.12, 1.15, 1.18, 1.22, 1.28, 1.30, 1.32, 1.34];

const series2: Series[] = [
  {
    id: 'carer-hours',
    label: 'Estimated unpaid carer hours (billions/year)',
    colour: '#F4A261',
    data: carerHoursValues.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
];

const annotations1: Annotation[] = [
  { date: new Date(2017, 0, 1), label: '2017: peak diagnosis rate 67.8%' },
  { date: new Date(2020, 2, 1), label: '2020: COVID — diagnosis rates fall' },
];

const annotations2: Annotation[] = [
  { date: new Date(2020, 2, 1), label: '2020: COVID increases carer burden' },
];

const targetLine = { value: 67, label: 'NHS 67% target' };

const editorialRefs: Reference[] = [
  { num: 1, name: 'NHS England', dataset: 'Dementia Assessment and Referral Dashboard', url: 'https://www.england.nhs.uk/mental-health/dementia/dementia-assessment', date: '2023' },
  { num: 2, name: 'Alzheimer\'s Society', dataset: 'Dementia UK Report — prevalence and carer hours', url: 'https://www.alzheimers.org.uk/about-us/policy-and-influencing/dementia-uk-report', date: '2023' },
  { num: 3, name: 'London School of Economics', dataset: 'Dementia UK Cost Study', url: 'https://www.lse.ac.uk', date: '2023' },
];

export default function DementiaSupportGapsPage() {
  return (
    <>
      <TopicNav topic="Dementia Support" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Dementia Support Gaps"
          question="Are People with Dementia Getting the Care They Need?"
          finding="Just 64% of people with dementia receive a formal diagnosis — below the NHS 67% target. 40% of those diagnosed receive no structured post-diagnostic support. An estimated 700,000 unpaid carers provide 1.34 billion hours of care annually, with little support from the state."
          colour="#E63946"
          preposition="with"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>An estimated 944,000 people live with dementia in the UK, yet only around 64% have a formal diagnosis — below the NHS target of 67% and a figure that has barely moved in a decade despite successive Prime Ministers' Dementia Challenges.<Cite nums={[1, 2]} /> COVID-19 caused diagnosis rates to fall sharply as GP access contracted, and they have not fully recovered. Without a diagnosis, people with dementia cannot access specialist support, carers cannot access carer services, and the risk of avoidable hospital admissions and safeguarding incidents rises substantially.<Cite nums={3} /> Post-diagnostic support is equally patchy: in principle a diagnosis triggers a named care coordinator, personalised care plan, and regular review; in practice 40% of people with dementia report receiving no structured support after diagnosis.<Cite nums={1} /></p>
            <p>Carers bear the invisible cost of these gaps. Around 700,000 people in the UK care for someone with dementia, providing an estimated 1.34 billion hours of unpaid care annually — more hours per person than carers of any other condition group. Carer support services — respite, Admiral Nurses, support groups — are inconsistently available and significantly underfunded. As dementia progresses, most people move into residential or nursing care funded through means-testing that depletes accumulated wealth before state support begins, while CQC inspections consistently identify inadequate dementia training and inappropriate antipsychotic use in care home settings.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Diagnosis & Support' },
          { id: 'sec-chart2', label: 'Carer Burden' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Dementia diagnosis rate"
              value="64.1%"
              unit="2023"
              direction="flat"
              polarity="up-is-good"
              changeText="below 67% NHS target · COVID setback not recovered"
              sparklineData={[61.4, 66.1, 67.6, 67.8, 67.4, 62.3, 62.7, 63.3, 64.1]}
              source="NHS England — Dementia Assessment 2023"
              href="#sec-chart1"
            />
            <MetricCard
              label="Receiving post-diagnostic support"
              value="60%"
              unit="2023"
              direction="up"
              polarity="up-is-good"
              changeText="improving · 40% still not receiving structured support"
              sparklineData={[55, 56, 57, 58, 58, 56, 57, 59, 60]}
              source="Alzheimer's Society — Dementia APPG 2023"
              href="#sec-chart1"
            />
            <MetricCard
              label="Cost of delayed diagnosis"
              value="£12,500"
              unit="per person per year"
              direction="flat"
              polarity="up-is-bad"
              changeText="in avoidable acute care costs · LSE modelling"
              sparklineData={[10500, 11000, 11500, 12000, 12000, 12500, 12500]}
              source="London School of Economics — Dementia UK Cost Study"
              href="#sec-sources"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Dementia diagnosis rate and post-diagnostic support, 2015–2023"
              subtitle="Percentage of estimated dementia cases with a formal diagnosis (NHS target 67%) and percentage receiving structured post-diagnostic support. Both are below where they should be."
              series={series1}
              annotations={annotations1}
              targetLine={targetLine}
              yLabel="Percentage (%)"
              source={{ name: 'NHS England', dataset: 'Dementia Assessment and Referral Dashboard', url: 'https://www.england.nhs.uk/mental-health/dementia/dementia-assessment', frequency: 'monthly', date: '2023' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Estimated unpaid carer hours for dementia, UK, 2015–2023"
              subtitle="Billions of hours of unpaid care provided annually by family and friends of people with dementia. Dementia carers provide more hours per person than carers for any other condition."
              series={series2}
              annotations={annotations2}
              yLabel="Billions of hours"
              source={{ name: "Alzheimer's Society", dataset: "Dementia UK — Carer Hours Estimate", url: 'https://www.alzheimers.org.uk', frequency: 'periodic', date: '2023' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Admiral Nurses: specialist dementia care support"
            value="700+"
            unit="Admiral Nurses across the UK"
            description="Admiral Nurses are specialist dementia nurses who provide expert support, guidance, and practical advice to family carers — a model developed by Dementia UK that provides the kind of specialist carer support that standard community nursing cannot offer. There are now over 700 Admiral Nurses across the UK, embedded in NHS trusts, GP surgeries, care homes, and community settings. Research shows Admiral Nurses reduce carer distress, delay care home admission, and reduce A&E attendances. The NHS Long Term Plan committed to expanding post-diagnostic support, and the number of memory assessment services meeting the NHS quality criteria has grown — but provision remains highly variable between ICBs."
            source="Source: Dementia UK — Admiral Nurse data 2023. NHS England — Memory Services National Accreditation Programme 2023."
          />
        </ScrollReveal>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.england.nhs.uk/mental-health/dementia/dementia-assessment" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS England — Dementia Assessment and Referral Dashboard</a> — monthly diagnosis rates. 2023.</p>
            <p><a href="https://www.alzheimers.org.uk/about-us/policy-and-influencing/dementia-uk-report" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Alzheimer's Society — Dementia UK Report</a> — prevalence estimates and carer hours. Periodic.</p>
            <p><a href="https://www.lse.ac.uk" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">London School of Economics — Dementia UK Cost Study</a> — cost of delayed diagnosis modelling.</p>
            <p>Diagnosis rate calculated as GP-recorded diagnoses divided by estimated prevalence. Post-diagnostic support figure from APPG survey of ICBs. Cost of delayed diagnosis from LSE modelling of avoidable acute admissions. Carer hours estimated from CFAS II prevalence model × hours per carer from carers' surveys.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
