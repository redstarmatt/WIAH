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

// 4-hour performance (%), 2010–2024 — NHS England A&E Statistics
const fourHourValues = [97.5, 97.2, 96.8, 96.1, 95.6, 94.9, 91.2, 89.1, 87.5, 85.2, 70.0, 78.1, 76.0, 72.4, 40.4];

// 12+ hour waits per month (absolute), 2015–2024
const twelvePlusValues = [820, 1450, 2300, 4100, 8200, 16500, 810, 25000, 52000, 71517];

// Total A&E attendances (millions per year), 2010–2024
const attendancesValues = [19.2, 20.1, 21.0, 21.7, 22.4, 23.0, 23.8, 24.2, 24.7, 25.1, 19.5, 23.3, 24.4, 25.0, 25.4];

const series1: Series[] = [
  {
    id: 'four-hour',
    label: '% seen within 4 hours',
    colour: '#E63946',
    data: fourHourValues.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
  },
];

const series2: Series[] = [
  {
    id: 'twelve-plus',
    label: '12+ hour waits per month',
    colour: '#E63946',
    data: twelvePlusValues.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
  {
    id: 'attendances',
    label: 'Total attendances (millions)',
    colour: '#6B7280',
    data: attendancesValues.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v * 1000 })),
  },
];

const annotations: Annotation[] = [
  { date: new Date(2015, 0, 1), label: '2015: Last month 95% target met nationally' },
  { date: new Date(2020, 0, 1), label: '2020: COVID-19 — attendances drop sharply' },
  { date: new Date(2023, 0, 1), label: '2023: Target revised down to 76%' },
];

const editorialRefs: Reference[] = [
  { num: 1, name: 'NHS England', dataset: 'A&E Attendances and Emergency Admissions', url: 'https://www.england.nhs.uk/statistics/statistical-work-areas/ae-waiting-times-and-activity/', date: '2024' },
  { num: 2, name: 'Royal College of Emergency Medicine', dataset: 'Corridor Care Position Statement', date: '2024' },
];

export default function AEWaitingTimesCrisisPage() {
  return (
    <>
      <TopicNav topic="NHS & Healthcare" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="NHS & Healthcare"
          question="How long will you wait in A&E?"
          finding="The NHS 4-hour A&E target has collapsed. Just 40.4% of emergency patients are seen within 4 hours against a 95% standard. Over 71,000 patients a month wait more than 12 hours — an 87-fold increase from 2015. Emergency departments have become holding wards for a system with nowhere to discharge patients to."
          colour="#E63946"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The 4-hour A&E standard was introduced in 2004 and rapidly became the defining metric of NHS emergency performance. For a decade it worked: the target of seeing, treating, admitting, or discharging 95% of patients within four hours was routinely met. That standard has not been met nationally since July 2015.<Cite nums={1} /> By 2024, performance had fallen to 40.4% — meaning the majority of patients attending a Type 1 emergency department now wait longer than four hours.<Cite nums={1} /> The decline is structural, and it reflects a system under pressure at every link in the chain.</p>
            <p>The proximate cause is exit block: patients cannot leave A&E because there are no beds on the wards, and patients cannot leave the wards because there is nowhere safe to discharge them. Social care capacity in England has contracted by an estimated 120,000 beds since 2010. In 2023/24, an estimated 13,000 acute beds per day were occupied by patients who no longer needed to be there.<Cite nums={1} /> This cascades backwards: wards are full, A&E patients on trolleys cannot be admitted, ambulances queue outside, and 999 response times lengthen. Corridor care has become normalised. The Royal College of Emergency Medicine describes this as the most dangerous situation in the NHS because patients awaiting assessment in crowded corridors are at measurably higher risk of harm and death.<Cite nums={2} /> The 12-hour wait figure — once so rare it was a never-event — reached 71,517 in a single month in late 2024, an 87-fold increase from 2015.<Cite nums={1} /></p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: '4-hour target' },
          { id: 'sec-chart2', label: '12+ hour waits' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="4-hour target met"
              value="40.4%"
              unit="2024"
              direction="down"
              polarity="up-is-good"
              changeText="Down from 97.5% in 2010 · target: 95%"
              sparklineData={fourHourValues.slice(-8)}
              source="NHS England · A&E Attendances and Emergency Admissions 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="12+ hour waits"
              value="71,517"
              unit="/month, 2024"
              direction="up"
              polarity="up-is-bad"
              changeText="87x higher than 2015 · once considered a never-event"
              sparklineData={twelvePlusValues}
              source="NHS England · A&E Attendances and Emergency Admissions 2024"
              href="#sec-chart2"
            />
            <MetricCard
              label="Total A&E attendances"
              value="25.4M"
              unit="per year 2024"
              direction="up"
              polarity="up-is-bad"
              changeText="+32% since 2010 · demand growing on a constrained system"
              sparklineData={attendancesValues.slice(-8)}
              source="NHS England · Urgent and Emergency Care Daily SitRep 2024"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="A&E 4-hour performance, England, 2010–2024"
              subtitle="Percentage of Type 1 A&E patients seen within 4 hours. 95% standard not met nationally since July 2015. Target revised to 76% in 2023."
              series={series1}
              annotations={annotations}
              yLabel="% within 4 hours"
              source={{ name: 'NHS England', dataset: 'A&E Attendances and Emergency Admissions', url: 'https://www.england.nhs.uk/statistics/statistical-work-areas/ae-waiting-times-and-activity/', frequency: 'monthly', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Patients waiting 12+ hours in A&E per month, England, 2015–2024"
              subtitle="Once a never-event, now over 71,000 patients a month. An 87-fold increase in a decade driven by exit block and inadequate social care discharge."
              series={[{
                id: 'twelve-plus',
                label: '12+ hour waits per month',
                colour: '#E63946',
                data: twelvePlusValues.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
              }]}
              annotations={[{ date: new Date(2020, 0, 1), label: '2020: COVID suppresses briefly' }]}
              yLabel="Waits per month"
              source={{ name: 'NHS England', dataset: 'A&E Attendances and Emergency Admissions', url: 'https://www.england.nhs.uk/statistics/statistical-work-areas/ae-waiting-times-and-activity/', frequency: 'monthly', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Same Day Emergency Care and virtual wards are easing pressure"
            value="1.5M+"
            unit="patients handled annually by SDEC units"
            description="Same Day Emergency Care (SDEC) units allow patients who would previously have been admitted overnight to be assessed, treated, and sent home the same day — avoiding A&E entirely for conditions like pulmonary embolism, cellulitis, and deep vein thrombosis. By March 2024, SDEC was available in 97% of acute trusts. Virtual wards — where patients are monitored at home using pulse oximeters and remote clinical oversight — have expanded to over 10,000 beds equivalent nationally, reducing hospital admissions by 20–30% for eligible patients and freeing acute bed capacity."
            source="Source: NHS England — Same Day Emergency Care data 2024. NHS England — Virtual Ward programme dashboard 2024."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.england.nhs.uk/statistics/statistical-work-areas/ae-waiting-times-and-activity/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS England — A&E Attendances and Emergency Admissions</a> — monthly publication covering 4-hour performance, 12-hour waits, and total attendances by department type.</p>
            <p>Type 1 departments are major emergency departments open 24 hours. The 4-hour standard applies to the percentage of patients admitted, transferred, or discharged within 4 hours of arrival. 12-hour waits are measured from decision to admit to actual admission.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
