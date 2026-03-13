'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import PositiveCallout from '@/components/PositiveCallout';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

// Urgent referrals meeting 1-week target (%), 2018–2024 — NHS England
const urgentTargetValues = [72, 68, 65, 61, 57, 54, 59, 62];

// Routine referrals meeting 4-week target (%), 2018–2024 — NHS England
const routineTargetValues = [62, 59, 56, 53, 48, 44, 45, 47];

const targetSeries: Series[] = [
  {
    id: 'urgent',
    label: 'Urgent referrals meeting 1-week target (%)',
    colour: '#E63946',
    data: urgentTargetValues.map((v, i) => ({ date: new Date(2018 + i, 0, 1), value: v })),
  },
  {
    id: 'routine',
    label: 'Routine referrals meeting 4-week target (%)',
    colour: '#F4A261',
    data: routineTargetValues.map((v, i) => ({ date: new Date(2018 + i, 0, 1), value: v })),
  },
];

const referralSeries: Series[] = [
  {
    id: 'urgent-only',
    label: 'Urgent target met (%)',
    colour: '#E63946',
    data: urgentTargetValues.map((v, i) => ({ date: new Date(2018 + i, 0, 1), value: v })),
  },
];

const annotations: Annotation[] = [
  { date: new Date(2020, 0, 1), label: '2020: Pandemic surge in referrals' },
];

export default function EatingDisorderWaitingPage() {
  return (
    <>
      <TopicNav topic="Eating Disorder Waiting Times" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Eating Disorder Waiting Times"
          question="How Long Are People Waiting for Eating Disorder Treatment?"
          finding="Only 62% of urgent eating disorder referrals meet the one-week NHS target — down from 72% in 2018. Fewer than half of routine referrals receive timely care. Eating disorders carry the highest mortality of any mental illness."
          colour="#E63946"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Eating disorders carry the highest mortality rate of any mental illness, and for anorexia nervosa early intervention is strongly associated with recovery. The NHS standard, introduced in 2016, set a target that 95% of urgent cases should be seen within one week and 95% of routine cases within four weeks. By 2024, only 62% of urgent cases and 47% of routine cases met those targets — down from 72% urgent in 2018, with a pandemic-driven surge from 2020 pushing services further behind. Inpatient bed provision has risen modestly, from 5.8 to 6.3 per million people, but out-of-area placements remain common because local capacity is insufficient; these placements are associated with worse outcomes and disrupt the family contact that is a core component of treatment.</p>
            <p>The consequences of delay are medical as well as psychological: prolonged malnutrition causes irreversible cardiac, skeletal, and hormonal damage, meaning each week of waiting has physical costs that cannot be fully reversed by later treatment. The central constraint is workforce: dietitians, psychiatrists, and clinical psychologists with eating disorder specialism take years to train, and NHS England's Long Term Plan commitments have not kept pace with post-pandemic demand. Referral volumes have continued rising across all age groups and increasingly among boys and young men.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Target performance' },
          { id: 'sec-chart2', label: 'Urgent trend' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Urgent target met (1 week)"
              value="62%"
              unit=""
              direction="down"
              polarity="up-is-good"
              changeText="Target: 95% · 38% missing one-week standard"
              sparklineData={[72, 68, 65, 61, 57, 54, 59, 62]}
              source="NHS England · Eating Disorder Waiting Times 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Routine target met (4 weeks)"
              value="47%"
              unit=""
              direction="down"
              polarity="up-is-good"
              changeText="Target: 95% · fewer than half get timely care"
              sparklineData={[62, 59, 56, 53, 48, 44, 45, 47]}
              source="NHS England · Eating Disorder Waiting Times 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Inpatient beds per million"
              value="6.3"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="Modest increase · out-of-area placements still common"
              sparklineData={[5.8, 5.9, 5.6, 5.8, 6.0, 6.2, 6.3]}
              source="NHS England · Mental Health Dashboard 2024"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Eating disorder waiting time targets met, England, 2018–2024"
              subtitle="Percentage meeting NHS access standards. Target is 95% for both. Pandemic-driven demand surge pushed performance down from an already inadequate base."
              series={targetSeries}
              annotations={annotations}
              yLabel="% meeting target"
              source={{ name: 'NHS England', dataset: 'Eating Disorder Waiting Times', url: 'https://www.england.nhs.uk/mental-health/taskforce/imp/mh-dashboard/', frequency: 'quarterly', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Urgent eating disorder referrals meeting one-week target, England, 2018–2024"
              subtitle="Percentage of urgent cases seen within one week. NHS target is 95%. Currently 62%. Each week of delay carries irreversible medical risk."
              series={referralSeries}
              annotations={[{ date: new Date(2016, 0, 1), label: '2016: NHS standard introduced' }]}
              yLabel="% meeting 1-week target"
              source={{ name: 'NHS England', dataset: 'Eating Disorder Waiting Times', url: 'https://www.england.nhs.uk/mental-health/taskforce/imp/mh-dashboard/', frequency: 'quarterly', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Investment in eating disorder services"
            value="£53M"
            description="NHS England's Long Term Plan included £53 million of additional investment in community eating disorder services for children and young people. New intensive outpatient programmes and crisis services have been developed in some areas. The Royal College of Psychiatrists has developed new training pathways to grow the eating disorder specialist workforce, though it will take several years for these to translate into improved capacity."
            source="Source: NHS England — Long Term Plan commitments for mental health, 2019–2024."
          />
        </ScrollReveal>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.england.nhs.uk/mental-health/taskforce/imp/mh-dashboard/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS England — Eating Disorder Waiting Times</a> — quarterly publication of performance against access standards.</p>
            <p><a href="https://digital.nhs.uk/data-and-information/data-collections-and-data-sets/data-sets/mental-health-services-data-set" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS Digital — Mental Health Services Data Set (MHSDS)</a> — patient-level data on referrals and care.</p>
            <p>Standards apply to specialist community eating disorder services. Urgent cases require treatment within one week; routine cases within four weeks. Inpatient bed data covers adult and adolescent specialist wards in England, normalised per million population.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
