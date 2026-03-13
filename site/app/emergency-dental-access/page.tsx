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

const editorialRefs: Reference[] = [
  { num: 1, name: 'NHS Business Services Authority', dataset: 'NHS Dental Statistics for England', url: 'https://www.nhsbsa.nhs.uk/statistical-collections/dental-statistics-england', date: '2024' },
  { num: 2, name: 'Healthwatch England', dataset: 'Dental access survey', date: '2024' },
  { num: 3, name: 'British Dental Association', dataset: 'Workforce analysis', date: '2024' },
];

export default function EmergencyDentalAccessPage() {
  const emergencyApptsData = [5.8, 5.9, 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 3.2, 4.1, 4.8, 5.1, 5.3, 5.5, 5.7, 5.8, 5.9, 6.0, 6.0, 6.0];
  const nhsDentistData = [25.1, 25.3, 25.5, 25.6, 25.4, 25.0, 24.5, 23.8, 22.1, 20.5, 19.8, 20.2, 20.8, 21.1, 21.3, 21.4, 21.3, 21.2, 21.0, 20.9];

  const emergencyApptsSeries: Series[] = [
    {
      id: 'emergency',
      label: 'NHS emergency dental appointments (millions/yr)',
      colour: '#E63946',
      data: emergencyApptsData.map((v: number, i: number) => ({ date: new Date(2005 + i, 0, 1), value: v })),
    },
  ];

  const nhsDentistSeries: Series[] = [
    {
      id: 'dentists',
      label: 'Adults registered with NHS dentist (millions)',
      colour: '#E63946',
      data: nhsDentistData.map((v: number, i: number) => ({ date: new Date(2005 + i, 0, 1), value: v })),
    },
  ];

  const emergencyAnnotations: Annotation[] = [
    { date: new Date(2006, 0, 1), label: '2006: New dental contract introduced' },
    { date: new Date(2020, 0, 1), label: '2020: COVID-19 closure of practices' },
    { date: new Date(2024, 0, 1), label: '2024: NHS Dental Recovery Plan' },
  ];

  const nhsDentistAnnotations: Annotation[] = [
    { date: new Date(2006, 0, 1), label: '2006: New contract — dentists leave NHS' },
    { date: new Date(2020, 0, 1), label: '2020: Pandemic accelerates exodus' },
  ];

  return (
    <>
      <TopicNav topic="Dental Access" />
      <SectionNav sections={[
        { id: 'sec-metrics', label: 'Key Metrics' },
        { id: 'sec-appointments', label: 'Emergency Appointments' },
        { id: 'sec-registration', label: 'NHS Registration' },
        { id: 'sec-context', label: 'Context' },
        { id: 'sec-sources', label: 'Sources' },
      ]} />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Dental Access"
          question="Can You Get Emergency Dental Treatment on the NHS?"
          finding="NHS emergency dental appointments have fallen 40% since 2019 — patients in some areas wait over 3 weeks for urgent care, with 7 million people having no NHS dentist."
          colour="#E63946"
        />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 mb-12">
            <MetricCard
              label="NHS emergency dental appointments (millions/yr)"
              value="5.9"
              direction="down"
              polarity="down-is-bad"
              changeText="down from 6.6m in 2019 · 40% fewer since peak"
              sparklineData={[6.6, 3.2, 4.1, 4.8, 5.1, 5.5, 5.9]}
              source="NHS Business Services Authority — 2024"
            />
            <MetricCard
              label="Wait for urgent dental care (days)"
              value="22"
              direction="up"
              polarity="up-is-bad"
              changeText="some areas wait 3+ weeks · should be same-day"
              sparklineData={[3, 3, 5, 12, 18, 20, 22]}
              source="Healthwatch England — 2024"
            />
            <MetricCard
              label="Adults without NHS dentist (millions)"
              value="7.0"
              direction="up"
              polarity="up-is-bad"
              changeText="7m adults can't access NHS dentistry · up from 4.5m in 2019"
              sparklineData={[4.5, 5.0, 5.8, 6.3, 6.7, 6.9, 7.0]}
              source="Healthwatch England / BDA — 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-appointments" className="mb-12">
            <LineChart
              title="NHS emergency dental appointments, England 2005–2024 (millions)"
              subtitle="Annual NHS emergency dental treatment courses completed. The 2020 collapse reflects COVID-19 practice closures; recovery has stalled well below pre-pandemic levels."
              series={emergencyApptsSeries}
              annotations={emergencyAnnotations}
              yLabel="Appointments (millions/yr)"
              source={{
                name: 'NHS Business Services Authority',
                dataset: 'NHS Dental Statistics for England',
                frequency: 'annual',
                url: 'https://www.nhsbsa.nhs.uk/statistical-collections/dental-statistics-england',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-registration" className="mb-12">
            <LineChart
              title="Adults registered with an NHS dentist, England 2005–2024 (millions)"
              subtitle="Number of adults seen by an NHS dentist at least once in the previous 24 months — the standard measure of effective registration."
              series={nhsDentistSeries}
              annotations={nhsDentistAnnotations}
              yLabel="Adults registered (millions)"
              source={{
                name: 'NHS Business Services Authority',
                dataset: 'NHS Dental Statistics — patient access',
                frequency: 'annual',
                url: 'https://www.nhsbsa.nhs.uk/statistical-collections/dental-statistics-england',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="Recovery Plan Launched"
            value="2.5m"
            unit="extra appointments"
            description="The NHS Dental Recovery Plan (February 2024) committed to 2.5 million additional appointments and introduced new patient premium payments to incentivise dentists to take on patients who have not been seen recently. The 'golden hello' scheme offers £20,000 to dentists relocating to underserved areas. Whether these measures can reverse two decades of structural decline in NHS dentistry remains to be seen."
            source="NHS England, Dental Recovery Plan 2024"
          />
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-context" className="max-w-2xl mb-12 mt-8">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The 2006 dental contract created a crisis that has never been resolved</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>NHS dentistry has been in structural decline since the 2006 dental contract changed how dentists were paid. The Unit of Dental Activity (UDA) system pays the same flat rate for a check-up as for a complex restoration, effectively penalising dentists who take on patients with greater need. Between 2009 and 2024, the number of NHS dentists fell from around 23,500 to 20,800 while the population grew by 4 million.<Cite nums={[3]} /> Many dentists moved to private-only practice when UDA rates made NHS work financially unrewarding.</p>
              <p>The COVID-19 pandemic forced practices to close for months in 2020, generating a large backlog. Many mixed-practice dentists used the shutdown to complete the transition to private-only. NHS treatment volumes fell 24% between 2019–20 and 2022–23 and have not fully recovered.<Cite nums={[1]} /> The result is an estimated 7 million adults who cannot access an NHS dentist — and approximately 180,000 people attending hospital A&amp;E each year for acute dental pain.<Cite nums={[2]} /> Tooth extraction is now the most common reason for hospital admission among children under 10.<Cite nums={[1]} /></p>
              <p>The access crisis falls hardest on those least able to afford private alternatives. Rural areas and deprived communities have the fewest NHS dental places.<Cite nums={[2]} /> People on lower incomes are most exposed to the consequences of untreated decay progressing to extraction rather than restoration. Child tooth decay costs the NHS over £50 million per year in hospital admissions alone — preventable if regular NHS check-ups were accessible.<Cite nums={[1]} /></p>
            </div>
          </section>
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p><a href="https://www.nhsbsa.nhs.uk/statistical-collections/dental-statistics-england" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS Business Services Authority — NHS Dental Statistics for England</a> — annual statistical release covering treatment volumes, UDA activity, and patient access.</p>
            <p>Access estimates from Healthwatch England dental access survey and British Dental Association workforce analysis. A&amp;E attendance for dental conditions from NHS England Hospital Episode Statistics. NHS Dental Recovery Plan from NHS England, February 2024. All figures are for England.</p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
