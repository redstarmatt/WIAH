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
  { num: 1, name: 'NHS England', dataset: 'Mental Health Services Monthly Statistics — Eating Disorders', url: 'https://digital.nhs.uk/data-and-information/publications/statistical/mental-health-services-monthly-statistics', date: '2024' },
  { num: 2, name: 'Beat Eating Disorders', dataset: 'Waiting Times Report', url: 'https://www.beateatingdisorders.org.uk/get-information-and-support/get-help-for-myself/i-need-support-now/nhs-waiting-times/', date: '2024' },
  { num: 3, name: 'NICE', dataset: 'Eating Disorders: Recognition and Treatment (NG69)', url: 'https://www.nice.org.uk/guidance/ng69', date: '2020' },
];

const referralValues = [9800, 10200, 11500, 13800, 17200, 24600, 22100, 21800, 23400, 25100, 26800];
const waitingTimesValues = [11.2, 12.4, 14.1, 16.3, 18.2, 28.5, 23.4, 21.2, 20.1, 19.4, 18.8];
const treatmentStartedValues = [78.2, 77.4, 76.1, 74.3, 72.8, 68.1, 70.4, 72.1, 73.5, 74.8, 75.6];
const inpatientValues = [950, 1020, 1150, 1280, 1480, 1620, 1580, 1540, 1610, 1680, 1720];

const series1: Series[] = [
  { id: 'referrals', label: 'New referrals per year', colour: '#E63946', data: referralValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
  { id: 'waittime', label: 'Average wait for treatment (weeks)', colour: '#F4A261', data: waitingTimesValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
];

const series2: Series[] = [
  { id: 'treatment', label: 'Starting treatment within 4 weeks — urgent (%)', colour: '#264653', data: treatmentStartedValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
  { id: 'inpatient', label: 'Inpatient eating disorder admissions', colour: '#E63946', data: inpatientValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
];

const annotations1: Annotation[] = [
  { date: new Date(2020, 2, 1), label: '2020: Pandemic — referrals surge' },
  { date: new Date(2020, 2, 1), label: '2020: NICE target — 4 wks urgent / 18 wks routine' },
];

export default function EatingDisorderServicesPage() {
  return (
    <>
      <TopicNav topic="Eating Disorder Services" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Health"
          question="Are Eating Disorder Services Keeping Up With Demand?"
          finding={<>Referrals to NHS eating disorder services have nearly tripled since 2013 — from 9,800 to 26,800 per year — driven by rising rates among young people, particularly adolescent girls.<Cite nums={1} /> The average wait for treatment now stands at 18.8 weeks, against a NICE target of 4 weeks for urgent cases, and inpatient admissions continue to rise as community services fail to intervene early enough.<Cite nums={[1, 2]} /></>}
          colour="#E63946"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Eating disorders — anorexia nervosa, bulimia nervosa, binge eating disorder, and ARFID — have the highest mortality rate of any psychiatric condition. Anorexia nervosa in particular carries a standardised mortality ratio of around 6, meaning sufferers are six times more likely to die prematurely than matched controls. Early treatment is the single most important predictor of recovery — which is what makes the current waiting times so clinically damaging. NICE guidelines specify that people with eating disorders should start treatment within 4 weeks for urgent cases and 18 weeks for routine cases, but only 75.6% of urgent referrals are meeting the 4-week standard, and average waits have lengthened substantially.<Cite nums={3} /></p>
            <p>The pandemic triggered a dramatic and apparently sustained surge in referrals, particularly among young women and girls. Social isolation, the closure of schools, and increased social media use during lockdowns are implicated in the rise. Beat Eating Disorders reports that many people are waiting 18 months or more for specialist outpatient treatment, during which time their condition typically deteriorates — ultimately leading to more intensive and expensive inpatient admissions.<Cite nums={2} /> Inpatient eating disorder admissions have risen to 1,720 per year, each costing approximately £120,000. The paradox of eating disorder services is that underfunding community treatment capacity drives up the much more expensive inpatient costs — a false economy that NHS England has acknowledged but not yet reversed with sufficient investment.<Cite nums={[1, 2]} /></p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Overview' },
          { id: 'sec-chart1', label: 'Referrals & Waiting Times' },
          { id: 'sec-chart2', label: 'Treatment Standards' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard label="New referrals per year" value="26,800" unit="2024" direction="up" polarity="up-is-bad" changeText="up from 9,800 in 2013 · nearly tripled" sparklineData={[9800, 10200, 11500, 13800, 17200, 24600, 22100, 21800, 23400, 25100, 26800]} source="NHS England — Mental Health Services Monthly Statistics 2024" href="#sec-chart1" />
            <MetricCard label="Average wait for treatment" value="18.8 wks" unit="2024" direction="up" polarity="up-is-bad" changeText="was 11.2 weeks in 2013 · NICE target is 4 weeks (urgent)" sparklineData={[11.2, 12.4, 14.1, 16.3, 18.2, 28.5, 23.4, 21.2, 20.1, 19.4, 18.8]} source="NHS England — Mental Health Services 2024" href="#sec-chart1" />
            <MetricCard label="Inpatient admissions per year" value="1,720" unit="eating disorder inpatients" direction="up" polarity="up-is-bad" changeText="up from 950 in 2013 · each costs ~£120,000" sparklineData={[950, 1020, 1150, 1280, 1480, 1620, 1580, 1540, 1610, 1680, 1720]} source="NHS England — Mental Health Services 2024" href="#sec-chart2" />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="NHS eating disorder referrals and average waiting time, 2013–2024"
              subtitle="Annual new referrals to NHS eating disorder services and average weeks from referral to first treatment appointment. Referrals surged during COVID and have not returned to pre-pandemic levels."
              series={series1}
              annotations={annotations1}
              yLabel="Count / Weeks"
              source={{ name: 'NHS England', dataset: 'Mental Health Services Monthly Statistics', url: 'https://digital.nhs.uk/data-and-information/publications/statistical/mental-health-services-monthly-statistics', frequency: 'monthly', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Treatment standard compliance and inpatient admissions, 2013–2024"
              subtitle="% of urgent eating disorder referrals starting treatment within 4 weeks (NICE standard) and annual inpatient admissions. Compliance recovering but inpatient demand still rising."
              series={series2}
              annotations={[]}
              yLabel="% / Admissions"
              source={{ name: 'NHS England', dataset: 'Mental Health Services Monthly Statistics', url: 'https://digital.nhs.uk/data-and-information/publications/statistical/mental-health-services-monthly-statistics', frequency: 'monthly', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="First-episode anorexia treatment outcomes improving"
            value="46%"
            unit="of young people in specialist CAMHS achieve weight restoration within 12 months"
            description="Among young people presenting with first-episode anorexia nervosa to specialist Child and Adolescent Mental Health Services (CAMHS), 46% now achieve weight restoration within 12 months of starting treatment — an improvement from earlier cohorts where outpatient outcomes were significantly worse. Family-based treatment (FBT) — which involves parents as active agents in refeeding — has shown the strongest evidence base for adolescents and is now the recommended first-line approach for most young people with anorexia."
            source="Source: NHS England — Mental Health Services Monthly Statistics 2024. NICE NG69."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://digital.nhs.uk/data-and-information/publications/statistical/mental-health-services-monthly-statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS England — Mental Health Services Monthly Statistics</a> — eating disorder referrals, waiting times, treatment starts. Monthly.</p>
            <p><a href="https://www.beateatingdisorders.org.uk/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Beat Eating Disorders — Waiting Times Report</a> — patient experience, waiting times analysis. Annual.</p>
            <p>Referral data includes children and adults referred to NHS eating disorder specialist services. Waiting times are median days from referral to first treatment. Inpatient data is from NHS hospital episode statistics.</p>
          </div>
        </section>
      </main>
    </>
  );
}
