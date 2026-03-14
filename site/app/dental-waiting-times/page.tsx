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
  { num: 1, name: 'NHS England', dataset: 'NHS Dental Statistics for England', url: 'https://digital.nhs.uk/data-and-information/publications/statistical/nhs-dental-statistics', date: '2024' },
  { num: 2, name: 'Healthwatch England', dataset: 'NHS Dentistry — People\'s Experiences', url: 'https://www.healthwatch.co.uk/report/2023-06-07/nhs-dentistry-peoples-experiences', date: '2023' },
  { num: 3, name: 'British Dental Association', dataset: 'NHS Dentistry Crisis Briefing', url: 'https://bda.org/dentists/health-and-safety/BDA-Guidance/Pages/NHS-Contract.aspx', date: '2024' },
];

const waitingTimeValues = [4.2, 4.5, 4.8, 5.1, 5.4, 22.0, 16.8, 13.2, 11.8, 11.1, 10.9];
const urgentAppointmentValues = [88.2, 87.5, 86.9, 86.1, 85.4, 45.2, 67.3, 74.8, 78.2, 80.1, 81.3];
const newPatientAcceptValues = [61.2, 60.8, 60.1, 59.4, 58.8, 34.1, 42.3, 47.5, 49.8, 51.2, 52.4];
const privateShareValues = [34.0, 35.2, 36.5, 37.8, 39.1, 42.0, 46.3, 50.1, 53.2, 55.4, 57.1];

const series1: Series[] = [
  { id: 'wait', label: 'Avg wait for routine appt (weeks)', colour: '#E63946', data: waitingTimeValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
  { id: 'urgent', label: 'Urgent appointments met within 24h (%)', colour: '#2A9D8F', data: urgentAppointmentValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
];

const series2: Series[] = [
  { id: 'newpatient', label: 'Practices accepting new NHS patients (%)', colour: '#264653', data: newPatientAcceptValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
  { id: 'private', label: 'Private revenue as % of total dental income', colour: '#F4A261', data: privateShareValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
];

const annotations1: Annotation[] = [
  { date: new Date(2020, 2, 1), label: '2020: Dental services suspended — COVID' },
  { date: new Date(2024, 2, 1), label: '2024: Dental Recovery Plan' },
];

export default function DentalWaitingTimesPage() {
  return (
    <>
      <TopicNav topic="Dental Waiting Times" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Health"
          question="Can You Actually Get an NHS Dentist?"
          finding={<>Only 52% of NHS dental practices are accepting new adult patients — and the average wait for a routine NHS appointment is nearly 11 weeks, up from 4 weeks pre-pandemic.<Cite nums={1} /> Private dentistry now accounts for 57% of all dental income in England as the NHS contract drives practitioners towards private work, leaving millions without access to affordable care.<Cite nums={[1, 3]} /></>}
          colour="#E63946"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The structural collapse of NHS dentistry has been building for nearly two decades. The 2006 UDA (Unit of Dental Activity) contract replaced item-of-service payments with a fixed payment for bands of treatment complexity — creating perverse incentives that made NHS dentistry progressively less financially viable for practices. A complex restorative course involving a crown, a root canal, and multiple fillings earns a practice the same UDA value as a simple check-up and scale. The pandemic accelerated the exodus: infection control requirements made NHS treatment rates even more unviable, and thousands of practices reduced their NHS commitments permanently.<Cite nums={3} /> By 2024, private revenue accounted for 57% of all dental income — up from 34% in 2013.</p>
            <p>The consequences are visible in access data and in hospital emergency departments. Healthwatch England surveys report widespread accounts of people removing their own teeth, supergluing crowns back in place, and travelling 50+ miles to reach the nearest NHS practice accepting new patients.<Cite nums={2} /> Around 2.5 million people attempt to register with an NHS dentist each year and fail to find a place. The impact on children is particularly acute — tooth decay remains the most common reason for childhood hospitalisation, with over 35,000 tooth extractions under general anaesthetic annually, concentrated in the most deprived communities with lowest dental access. The NHS Dental Recovery Plan (2024) proposes incentive payments for treating new patients and expanding dental therapist roles, but the BDA has described it as insufficient to reverse the structural problems.<Cite nums={[1, 3]} /></p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Overview' },
          { id: 'sec-chart1', label: 'Waiting Times' },
          { id: 'sec-chart2', label: 'Access & Private Share' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard label="Avg wait for routine appointment" value="10.9 wks" unit="2024" direction="up" polarity="up-is-bad" changeText="was 4.2 weeks pre-pandemic · still not recovered" sparklineData={[4.2, 4.5, 4.8, 5.1, 5.4, 22.0, 16.8, 13.2, 11.8, 11.1, 10.9]} source="NHS England — NHS Dental Statistics 2024" href="#sec-chart1" />
            <MetricCard label="Practices accepting new patients" value="52.4%" unit="of NHS practices" direction="down" polarity="up-is-good" changeText="was 61.2% in 2013 · dental deserts in most areas" sparklineData={[61.2, 60.8, 60.1, 59.4, 58.8, 34.1, 42.3, 47.5, 49.8, 51.2, 52.4]} source="NHS England — NHS Dental Statistics 2024" href="#sec-chart2" />
            <MetricCard label="Private revenue share" value="57.1%" unit="of all dental income" direction="up" polarity="up-is-bad" changeText="up from 34% in 2013 · NHS contract driving exodus" sparklineData={[34.0, 35.2, 36.5, 37.8, 39.1, 42.0, 46.3, 50.1, 53.2, 55.4, 57.1]} source="BDA — NHS Dentistry Crisis Briefing 2024" href="#sec-chart2" />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Average NHS dental waiting time and urgent appointment access, 2013–2024"
              subtitle="Average weeks for a routine NHS dental appointment and % of urgent cases seen within 24 hours. COVID caused a catastrophic disruption; recovery has been partial and slow."
              series={series1}
              annotations={annotations1}
              yLabel="Weeks / Percentage"
              source={{ name: 'NHS England', dataset: 'NHS Dental Statistics for England', url: 'https://digital.nhs.uk/data-and-information/publications/statistical/nhs-dental-statistics', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="NHS practices accepting new patients and private revenue share, 2013–2024"
              subtitle="Proportion of practices accepting new NHS adult patients (%) and private revenue as percentage of total dental income. The two lines tell the same story from different angles."
              series={series2}
              annotations={[]}
              yLabel="Percentage (%)"
              source={{ name: 'NHS England', dataset: 'NHS Dental Statistics', url: 'https://digital.nhs.uk/data-and-information/publications/statistical/nhs-dental-statistics', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Dental therapists could unlock capacity"
            value="40%"
            unit="of NHS dental procedures can be legally performed by dental therapists"
            description="Dental therapists and hygienists can perform around 40% of routine NHS dental procedures — check-ups, scale and polish, simple fillings, extractions of deciduous (baby) teeth — under direct access, without a dentist present. Expanding their scope and numbers could significantly increase NHS capacity, particularly in areas with low dentist-to-population ratios. The NHS Long Term Plan proposed greater use of dental therapists, and the 2024 Recovery Plan includes funding for dental therapy training places."
            source="Source: NHS England — Dental Recovery Plan 2024. British Dental Association 2024."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://digital.nhs.uk/data-and-information/publications/statistical/nhs-dental-statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS England — NHS Dental Statistics for England</a> — access, waiting times, courses of treatment, workforce. Annual.</p>
            <p><a href="https://www.healthwatch.co.uk/report/2023-06-07/nhs-dentistry-peoples-experiences" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Healthwatch England — NHS Dentistry: People&apos;s Experiences</a> — patient survey data. 2023.</p>
            <p>Waiting time estimates are derived from NHS appointment data and patient surveys. New patient acceptance rates are from NHS practitioner returns. Private revenue share is from ONS and BDA surveys.</p>
          </div>
        </section>
      </main>
    </>
  );
}
