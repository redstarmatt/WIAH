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

// Community pharmacies in England, 2015–2023 (NHS BSA)
const pharmacyCountValues = [11673, 11559, 11423, 11276, 11148, 11020, 10870, 10720, 10575];

// Prescriptions dispensed (millions), 2015–2023
const prescriptionValues = [1020, 1045, 1068, 1092, 1115, 1090, 1120, 1155, 1190];

const series1: Series[] = [
  {
    id: 'pharmacy-count',
    label: 'Community pharmacies (England)',
    colour: '#2A9D8F',
    data: pharmacyCountValues.map((v, i) => ({ date: new Date(2015 + i, 5, 1), value: v })),
  },
];

const series2: Series[] = [
  {
    id: 'prescriptions',
    label: 'Prescriptions dispensed (millions)',
    colour: '#264653',
    data: prescriptionValues.map((v, i) => ({ date: new Date(2015 + i, 5, 1), value: v })),
  },
  {
    id: 'pharmacy-count-scaled',
    label: 'Community pharmacies (÷10)',
    colour: '#E63946',
    data: pharmacyCountValues.map((v, i) => ({ date: new Date(2015 + i, 5, 1), value: Math.round(v / 10) })),
  },
];

const annotations1: Annotation[] = [
  { date: new Date(2016, 0, 1), label: '2016: £113M funding cut not restored' },
  { date: new Date(2024, 0, 1), label: '2024: Pharmacy First scheme' },
];

const annotations2: Annotation[] = [
  { date: new Date(2020, 2, 1), label: '2020: COVID-19 demand spike' },
];

const editorialRefs: Reference[] = [
  { num: 1, name: 'NHS Business Services Authority', dataset: 'Community Pharmacy Network', url: 'https://www.nhsbsa.nhs.uk/statistical-collections/community-pharmacy-dispensing-cost-analysis-report', date: '2023' },
  { num: 2, name: 'NHS Business Services Authority', dataset: 'Prescription Volume Report', url: 'https://www.nhsbsa.nhs.uk/statistical-collections/prescription-cost-analysis', date: '2023' },
  { num: 3, name: 'Company Chemists\' Association', dataset: 'Annual Survey — Pharmacy Financial Viability', url: 'https://www.thecompanychemists.com/', date: '2023' },
  { num: 4, name: 'NHS England', dataset: 'Pharmacy First Service Specification', url: 'https://www.england.nhs.uk/statistics/', date: '2024' },
];

export default function CommunityPharmaciesPage() {
  return (
    <>
      <TopicNav topic="Community Pharmacies" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Community Pharmacies"
          question="Are Community Pharmacies Disappearing?"
          finding="England has lost over 1,100 community pharmacies since 2015 — around 10% of the total network — while prescriptions dispensed have risen by 17%."
          colour="#2A9D8F"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>England lost more than 1,100 community pharmacies between 2015 and 2023 — roughly one in ten of the network.<Cite nums={1} /> Closures have been fastest in deprived high-street locations, the pharmacies most used by people who cannot easily travel or go online. The structural cause is clear: NHS dispensing fees have been frozen in real terms since 2015, a £113 million funding cut in 2016 was never restored, and the average pharmacy now runs at an annual loss of around £50,000.<Cite nums={3} /> Over the same period, prescriptions dispensed rose from 1.02 billion to 1.19 billion — more work, less money, fewer outlets.<Cite nums={2} /> The Pharmacy First scheme, launched in January 2024, authorises pharmacists to treat seven common conditions without GP referral, which in theory could absorb up to 10% of GP appointments; in practice, pharmacists report that reimbursement rates do not cover the additional clinical time.<Cite nums={4} /></p>
            <p>Large multiples and supermarket pharmacies have proved more resilient; it is independent, family-run pharmacies that have closed.<Cite nums={1} /> The walk-in consultation — free, no appointment, five minutes — is one of the most cost-effective primary care interventions, and its erosion shifts demand onto GP surgeries already under acute pressure. Scotland has integrated pharmacies more formally into primary care, with pharmacists salaried through NHS boards; England's commercially exposed model remains most vulnerable. When a pharmacy closes, patients may delay prescriptions or seek care later at greater cost — unmet need the NHS has no systematic way of measuring.<Cite nums={[1, 3]} /></p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Pharmacy Numbers' },
          { id: 'sec-chart2', label: 'Prescriptions vs Pharmacies' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Community pharmacies in England"
              value="10,575"
              unit="2023"
              direction="down"
              polarity="up-is-good"
              changeText="down from 11,673 in 2015 · loss of 1,098 pharmacies"
              sparklineData={[11423, 11276, 11148, 11020, 10870, 10720, 10575]}
              source="NHS Business Services Authority — 2023"
              href="#sec-chart1"
            />
            <MetricCard
              label="Pharmacies in financial difficulty"
              value="90%"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="dispensing fee frozen in real terms since 2015 · avg annual loss £50k"
              sparklineData={[75, 78, 82, 85, 88, 89, 90]}
              source="Company Chemists' Association — Annual survey 2023"
              href="#sec-sources"
            />
            <MetricCard
              label="Prescriptions dispensed annually"
              value="1,190M"
              unit="2023"
              direction="up"
              polarity="up-is-bad"
              changeText="up from 1,020M in 2015 · fewer pharmacies handling more"
              sparklineData={[1045, 1068, 1092, 1115, 1090, 1120, 1190]}
              source="NHS Business Services Authority — Prescription Volume Report 2023"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Community pharmacies in England, 2015–2023"
              subtitle="Annual count of community pharmacies. The network has contracted by over 1,100 since 2015 as NHS funding in real terms has fallen while costs have risen."
              series={series1}
              annotations={annotations1}
              yLabel="Pharmacies"
              source={{ name: 'NHS Business Services Authority', dataset: 'Community Pharmacy Network', url: 'https://www.nhsbsa.nhs.uk/statistical-collections/community-pharmacy-dispensing-cost-analysis-report', frequency: 'annual', date: '2023' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Prescriptions rising, pharmacies falling, 2015–2023"
              subtitle="Prescriptions dispensed (millions) alongside pharmacy numbers (÷10 for scale). Divergence illustrates growing pressure on the network."
              series={series2}
              annotations={annotations2}
              yLabel="Prescriptions (M) / Pharmacies (÷10)"
              source={{ name: 'NHS Business Services Authority', dataset: 'Prescription Volume Report', url: 'https://www.nhsbsa.nhs.uk/statistical-collections/prescription-cost-analysis', frequency: 'annual', date: '2023' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Pharmacy First: treating 7 conditions without a GP"
            value="Pharmacy First"
            unit="launched January 2024"
            description="The Pharmacy First scheme authorises community pharmacists to treat seven common conditions — sinusitis, sore throat, earache, infected insect bites, impetigo, shingles, and uncomplicated urinary tract infections — without a GP referral. If fully utilised, the scheme could absorb up to 10% of GP appointments. Scotland's community pharmacy integration model, where pharmacists are salaried NHS staff, provides a working template for a more sustainable English approach."
            source="Source: NHS England — Pharmacy First Service Specification, 2024. Scottish Government — Community Pharmacy Contractual Framework, 2023."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.nhsbsa.nhs.uk/statistical-collections/community-pharmacy-dispensing-cost-analysis-report" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS Business Services Authority — Community Pharmacy Network</a> — annual count of pharmacies. Updated March 2024.</p>
            <p><a href="https://www.nhsbsa.nhs.uk/statistical-collections/prescription-cost-analysis" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS Business Services Authority — Prescription Volume Report</a> — annual prescriptions dispensed. Updated March 2024.</p>
            <p><a href="https://www.thecompanychemists.com/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Company Chemists' Association — Annual Survey</a> — pharmacy financial viability and service availability. 2023.</p>
            <p>Network count includes independent pharmacies, chains, and supermarket pharmacies. Rural and deprived areas are disproportionately affected by closures, but detailed geographic data is not publicly disaggregated. Prescription volume excludes hospital and dental dispensing.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
