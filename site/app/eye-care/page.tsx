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

// NHS eye clinic waits over 18 weeks (thousands), 2018–2024 — NHS England
const eyeWaitValues = [80, 100, 130, 120, 180, 250, 290];

// Glaucoma patients waiting >6 months for follow-up (thousands), 2018–2024 — RNIB
const glaucomaWaitValues = [25, 30, 38, 35, 55, 75, 90];

// Sight loss cases from treatable conditions (thousands/year), 2018–2024 — RNIB
const preventableSightLossValues = [12, 12, 13, 13, 14, 15, 16];

const eyeWaitSeries: Series[] = [
  {
    id: 'eye-waits',
    label: 'Eye clinic waits over 18 weeks (thousands)',
    colour: '#E63946',
    data: eyeWaitValues.map((v, i) => ({ date: new Date(2018 + i, 0, 1), value: v })),
  },
];

const glaucomaSeries: Series[] = [
  {
    id: 'glaucoma',
    label: 'Glaucoma patients waiting >6 months (thousands)',
    colour: '#264653',
    data: glaucomaWaitValues.map((v, i) => ({ date: new Date(2018 + i, 0, 1), value: v })),
  },
  {
    id: 'preventable',
    label: 'Preventable sight loss cases (thousands/year)',
    colour: '#F4A261',
    data: preventableSightLossValues.map((v, i) => ({ date: new Date(2018 + i, 0, 1), value: v })),
  },
];

const eyeAnnotations: Annotation[] = [
  { date: new Date(2020, 2, 1), label: '2020: COVID — services suspended' },
];

const editorialRefs: Reference[] = [
  { num: 1, name: 'NHS England', dataset: 'Referral to treatment waiting times', url: 'https://www.england.nhs.uk/statistics/statistical-work-areas/rtt-waiting-times/', date: '2024' },
  { num: 2, name: 'RNIB', dataset: 'Sight loss crisis in NHS eye care', url: 'https://www.rnib.org.uk/your-eyes/eye-health-resources-for-professionals/nhs-eye-care-crisis/', date: '2024' },
];

export default function EyeCarePage() {
  return (
    <>
      <TopicNav topic="Eye Care" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Eye Care"
          question="Is Britain Going Blind While the NHS Waits?"
          finding="290,000 patients are waiting more than 18 weeks for NHS eye treatment. 90,000 glaucoma patients are waiting more than 6 months for follow-up appointments. Up to 16,000 people a year are losing preventable sight. Ophthalmology is the NHS's most referred speciality."
          colour="#264653"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Ophthalmology — the medical treatment of eye conditions — is the single largest outpatient speciality in the NHS, accounting for approximately 8% of all outpatient appointments.<Cite nums={[1]} /> Waiting times have deteriorated severely since the pandemic: 290,000 patients were waiting more than 18 weeks in 2024, up from around 80,000 in 2018.<Cite nums={[1]} /> Sight loss is often irreversible — delayed treatment for conditions like glaucoma, age-related macular degeneration (AMD), and diabetic retinopathy causes permanent vision loss that cannot be restored even when treatment eventually begins. The RNIB estimates that 16,000 people per year are losing preventable sight as a direct result of NHS waiting time failures.<Cite nums={[2]} /></p>
            <p>Glaucoma — which affects around 700,000 people in the UK and causes gradual, irreversible damage to the optic nerve — is the condition most severely affected by delayed follow-up care.<Cite nums={[2]} /> Patients can lose significant portions of their visual field in the weeks or months between a missed appointment and rescheduled treatment. Around 90,000 glaucoma patients were waiting more than six months for follow-up appointments in 2024.<Cite nums={[2]} /> The NHS has piloted optometrist-led community glaucoma monitoring, where trained opticians conduct regular monitoring appointments in community settings instead of hospital clinics, freeing hospital capacity for complex cases. Evidence from these pilots shows they are safe, cost-effective, and acceptable to patients — but national roll-out has been slow.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Eye clinic waits' },
          { id: 'sec-chart2', label: 'Glaucoma & sight loss' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Eye clinic waits over 18 weeks"
              value="290,000"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Up from 80,000 in 2018 · largest outpatient speciality"
              sparklineData={[80, 100, 130, 120, 180, 250, 290]}
              source="NHS England · Referral to treatment statistics 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Glaucoma patients awaiting follow-up"
              value="90,000"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Waiting >6 months · irreversible damage possible"
              sparklineData={[25, 30, 38, 35, 55, 75, 90]}
              source="RNIB · Sight loss crisis report 2024"
              href="#sec-chart2"
            />
            <MetricCard
              label="Preventable sight loss (per year)"
              value="16,000"
              unit="cases"
              direction="up"
              polarity="up-is-bad"
              changeText="Up from 12,000 in 2018 · caused by NHS waiting time failures"
              sparklineData={[12, 12, 13, 13, 14, 15, 16]}
              source="RNIB · Sight loss crisis report 2024"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="NHS eye clinic patients waiting over 18 weeks, England, 2018–2024"
              subtitle="Number of ophthalmology patients waiting beyond the 18-week referral to treatment standard. Pandemic caused severe backlog that has not been cleared."
              series={eyeWaitSeries}
              annotations={eyeAnnotations}
              yLabel="Patients (thousands)"
              source={{ name: 'NHS England', dataset: 'Referral to treatment waiting times', url: 'https://www.england.nhs.uk/statistics/statistical-work-areas/rtt-waiting-times/', frequency: 'monthly', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Glaucoma follow-up waits and preventable sight loss, England, 2018–2024"
              subtitle="Glaucoma patients waiting more than 6 months for follow-up (thousands) and estimated annual cases of preventable sight loss. Both rising."
              series={glaucomaSeries}
              annotations={[{ date: new Date(2020, 2, 1), label: '2020: COVID suspensions' }]}
              yLabel="Patients / cases (thousands)"
              source={{ name: 'RNIB', dataset: 'Sight loss crisis in NHS eye care', url: 'https://www.rnib.org.uk/your-eyes/eye-health-resources-for-professionals/nhs-eye-care-crisis/', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Community optometry could see 30% of hospital eye patients"
            value="30%"
            description="NHS England estimates that approximately 30% of current hospital ophthalmology outpatient appointments could safely be managed in community optometry settings, freeing hospital capacity for surgical and complex cases. The Community Ophthalmology Service (COS) models have demonstrated this in pilot areas. Glaucoma shared care — where optometrists manage stable patients with digital monitoring and only refer back to hospital for deterioration — has shown equivalent clinical outcomes at significantly lower cost. If scaled nationally, this could reduce hospital eye clinic pressure by hundreds of thousands of appointments annually and dramatically reduce the sight loss caused by delayed follow-up care."
            source="Source: RNIB — Sight loss crisis in NHS eye care 2024. NHS England — Community ophthalmology pathway review."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.england.nhs.uk/statistics/statistical-work-areas/rtt-waiting-times/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS England — Referral to treatment waiting times</a> — monthly data on patients waiting for consultant-led treatment by speciality, including ophthalmology.</p>
            <p><a href="https://www.rnib.org.uk/your-eyes/eye-health-resources-for-professionals/nhs-eye-care-crisis/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">RNIB — Sight loss crisis in NHS eye care</a> — analysis of avoidable sight loss and waiting time data across all eye conditions.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
