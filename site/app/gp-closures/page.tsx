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
  { num: 1, name: 'NHS Digital', dataset: 'GP Workforce Statistics', url: 'https://digital.nhs.uk/data-and-information/publications/statistical/general-and-personal-medical-services', date: '2024' },
  { num: 2, name: 'BMA', dataset: 'General Practice Analysis', date: '2024' },
  { num: 3, name: 'NHS England', dataset: 'NHS Long Term Plan', url: 'https://www.england.nhs.uk/statistics/', date: '2019' },
];

export default function GpClosuresPage() {

  const practiceData = [8221, 7989, 7850, 7672, 7500, 7394, 7260, 7128, 6900, 6730, 6581, 6480];
  const patientsPerGpData = [1810, 1850, 1900, 1950, 2010, 2090, 2160, 2200, 2240, 2260, 2275, 2290];

  const practicesSeries: Series[] = [
    {
      id: 'practices',
      label: 'GP practices in England',
      colour: '#E63946',
      data: practiceData.map((v, i) => ({ date: new Date(2013 + i, 0, 1), value: v })),
    },
  ];

  const patientsPerGpSeries: Series[] = [
    {
      id: 'patients-per-gp',
      label: 'Patients per GP FTE (national)',
      colour: '#E63946',
      data: patientsPerGpData.map((v, i) => ({ date: new Date(2013 + i, 0, 1), value: v })),
    },
  ];

  const practiceAnnotations: Annotation[] = [
    { date: new Date(2016, 0, 1), label: '2016: GP Forward View published' },
    { date: new Date(2020, 0, 1), label: '2020: Pandemic accelerates retirements' },
  ];

  const gpAnnotations: Annotation[] = [
    { date: new Date(2019, 0, 1), label: '2019: NHS Long Term Plan — 6,000 more GPs target' },
  ];

  return (
    <>
      <TopicNav topic="GP Closures" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="GP Closures"
          question="How Many GP Practices Have Closed?"
          finding="Over 1,400 GP practices have closed since 2013 — the number of patients per GP has risen to 2,275 — and patients in deprived areas face the largest list sizes."
          colour="#E63946"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-practices', label: 'Practice Numbers' },
          { id: 'sec-patients', label: 'Patients per GP' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="GP practices closed since 2013"
              value="−1,741"
              direction="down"
              polarity="up-is-good"
              changeText="From 8,221 in 2013 to 6,480 in 2024 · accelerating closures"
              sparklineData={practiceData}
              source="NHS Digital · GP Workforce 2024"
            />
            <MetricCard
              label="Patients per GP FTE"
              value="2,275"
              direction="up"
              polarity="up-is-bad"
              changeText="Up from 1,810 in 2013 · target was to reduce not increase"
              sparklineData={patientsPerGpData}
              source="NHS Digital · 2024"
            />
            <MetricCard
              label="Practices in deprived areas closed (%)"
              value="23%"
              direction="up"
              polarity="up-is-bad"
              changeText="Deprived areas losing practices faster · inverse care law"
              sparklineData={[12, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 23]}
              source="BMA GP Analysis · 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-practices" className="mb-12">
            <LineChart
              title="Total GP practices in England, 2013–2024"
              subtitle="Total NHS GP practices with a registered GMS, PMS, or APMS contract. Closures include permanent closures and mergers."
              series={practicesSeries}
              annotations={practiceAnnotations}
              yLabel="Number of practices"
              source={{
                name: 'NHS Digital',
                dataset: 'GP Workforce Statistics',
                frequency: 'annual',
                url: 'https://digital.nhs.uk/data-and-information/publications/statistical/general-and-personal-medical-services',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-patients" className="mb-12">
            <LineChart
              title="Patients per GP FTE, England, 2013–2024"
              subtitle="Registered patients divided by full-time equivalent qualified GPs. National figure — deprived areas are significantly higher."
              series={patientsPerGpSeries}
              annotations={gpAnnotations}
              yLabel="Patients per GP FTE"
              source={{
                name: 'NHS Digital',
                dataset: 'General Practice Workforce Statistics',
                frequency: 'monthly',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="Additional Roles Reimbursement Scheme"
            value="26,000"
            unit="additional roles funded by 2024"
            description="The Additional Roles Reimbursement Scheme has funded over 26,000 additional clinical roles in general practice — pharmacists, paramedics, physiotherapists, social prescribers — reducing pressure on GPs for non-medical needs. But the scheme does not replace GP numbers, and continuity of care with the same doctor remains the strongest predictor of good outcomes for long-term conditions."
            source="NHS England · ARRS Update 2024"
          />
        </ScrollReveal>

        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The data on GP closures</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>England has lost over 1,740 GP practices since 2013 — a fall from 8,221 to around 6,480 surgeries — with the highest annual closure totals since 2020.<Cite nums={[1]} /> The causes are structural: an ageing GP workforce approaching retirement, contract arrangements that make small practices financially marginal, and rising indemnity costs that disproportionately hit single-handed surgeries. As smaller practices close, patient lists are absorbed by remaining surgeries, driving patients per GP FTE from 1,810 in 2013 to 2,275 in 2024.<Cite nums={[1]} /></p>
              <p>The burden of closures is not evenly spread. Rural areas are most exposed: when the only surgery within 20 miles closes because a GP has retired and no successor can be recruited, patients face long travel times or cannot register anywhere at all. GP deserts are emerging in coastal and rural communities. Deprived areas are losing practices at a faster rate — 23% of deprived-area practices have closed since 2013 — an expression of the inverse care law: those with greatest need receive the least provision.<Cite nums={[2]} /></p>
              <p>The NHS Long Term Plan committed to training 6,000 additional GPs by 2024 — a target that was not met — and around 40% of GPs are now aged over 50, with surveys showing high burnout and early retirement intent.<Cite nums={[3, 2]} /> Consolidation also erodes continuity of care: seeing the same GP repeatedly is associated with better outcomes for long-term conditions and lower emergency admissions — and a 9,600-patient practice is structurally unable to deliver it.</p>
            </div>
          </section>
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p><a href="https://digital.nhs.uk/data-and-information/publications/statistical/general-and-personal-medical-services" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS Digital</a> — General Practice Workforce Statistics. Published annually. Practice count reflects NHS organisations with a registered GMS, PMS, or APMS contract. Practices that merge into a single entity count as one closure.</p>
            <p>BMA — General Practice Analysis. bma.org.uk. List size data derived from the NHS Digital Patient Registered at a GP Practice dataset, divided by active practice count at the same date.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
