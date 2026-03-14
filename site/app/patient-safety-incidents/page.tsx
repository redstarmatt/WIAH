'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'NHS England', dataset: 'Patient Safety Incident Management System (PSIMS)', url: 'https://www.england.nhs.uk/patient-safety/patient-safety-incident-management-system/', date: '2024' },
  { num: 2, name: 'NHS Resolution', dataset: 'Annual Report and Accounts', url: 'https://resolution.nhs.uk/resources/annual-report-and-accounts/', date: '2023/24' },
  { num: 3, name: 'Donna Ockenden', dataset: 'Independent Review of Maternity Services at Shrewsbury and Telford NHS Trust', date: 'March 2022' },
];

export default function PatientSafetyIncidentsPage() {
  // Chart 1: NHS patient safety incidents 2015–2024 (millions)
  const totalIncidents = [1.22, 1.32, 1.43, 1.52, 1.58, 1.48, 1.54, 1.61, 1.58, 1.55];

  const incidentSeries: Series[] = [
    {
      id: 'total',
      label: 'Patient safety incidents reported (millions)',
      colour: '#E63946',
      data: totalIncidents.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
  ];

  const incidentAnnotations: Annotation[] = [
    { date: new Date(2019, 0, 1), label: '2019: NRLS peak volume' },
    { date: new Date(2022, 0, 1), label: '2022: PSIRF framework introduced' },
  ];

  // Chart 2: Clinical negligence costs 2010–2024 (£bn)
  const negligenceCosts = [0.86, 1.03, 1.19, 1.37, 1.49, 1.67, 1.73, 1.84, 2.17, 2.38, 2.42, 2.41, 2.69, 2.75, 2.40];

  const negligenceSeries: Series[] = [
    {
      id: 'negligence',
      label: 'NHS clinical negligence costs (£bn)',
      colour: '#F4A261',
      data: negligenceCosts.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
    },
  ];

  const negligenceAnnotations: Annotation[] = [
    { date: new Date(2018, 0, 1), label: '2018: Maternity claims surge' },
    { date: new Date(2021, 0, 1), label: '2021: Ockenden review published' },
  ];

  return (
    <>
      <TopicNav topic="Patient Safety Incidents" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Patient Safety Incidents"
          question="How Many NHS Patients Are Harmed Each Year?"
          finding="Over 1.5 million patient safety incidents are reported annually — around 11,000 result in severe harm or death — and the NHS spends £2.4 billion per year on clinical negligence claims."
          colour="#E63946"
          preposition="on"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-incidents', label: 'Safety incidents' },
          { id: 'sec-negligence', label: 'Negligence costs' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <section id="sec-metrics" className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Safety incidents reported (millions/yr)"
              value="1.55"
              direction="up"
              polarity="up-is-bad"
              changeText="up from 1.22m in 2015 · partly reflects better reporting culture"
              sparklineData={[1.22, 1.32, 1.43, 1.52, 1.58, 1.48, 1.54, 1.61, 1.58, 1.55]}
              source="NHS England NRLS / PSIMS — 2024"
            />
            <MetricCard
              label="Severe harm or death incidents (thousands/yr)"
              value="11"
              direction="up"
              polarity="up-is-bad"
              changeText="11,000 result in severe harm or death each year"
              sparklineData={[8.2, 8.9, 9.5, 10.2, 10.8, 9.9, 10.5, 11.2, 11.1, 11.0]}
              source="NHS England PSIMS — 2024"
            />
            <MetricCard
              label="Clinical negligence costs (£bn/yr)"
              value="2.4"
              direction="up"
              polarity="up-is-bad"
              changeText="up from £0.86bn in 2010 · maternity claims largest category"
              sparklineData={[0.86, 1.03, 1.19, 1.37, 1.49, 1.67, 1.73, 1.84, 2.17, 2.38, 2.42, 2.41, 2.69, 2.75, 2.40]}
              source="NHS Resolution — Annual Report 2023/24"
            />
          </div>
        </section>

        <ScrollReveal>
          <section id="sec-incidents" className="mb-12">
            <LineChart
              title="NHS patient safety incidents reported, England, 2015–2024 (millions)"
              subtitle="Total patient safety incidents reported to the National Reporting and Learning System (NRLS) and Patient Safety Incident Management System (PSIMS). Rising reporting can reflect both improving safety culture and deteriorating care."
              series={incidentSeries}
              annotations={incidentAnnotations}
              yLabel="Incidents (millions)"
              source={{
                name: 'NHS England',
                dataset: 'National Reporting and Learning System / PSIMS',
                frequency: 'annual',
                url: 'https://www.england.nhs.uk/patient-safety/patient-safety-incident-management-system/',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-negligence" className="mb-12">
            <LineChart
              title="NHS clinical negligence costs, England, 2010–2024 (£bn)"
              subtitle="Annual expenditure on clinical negligence claims, including settlements, legal costs, and provisions. Managed by NHS Resolution."
              series={negligenceSeries}
              annotations={negligenceAnnotations}
              yLabel="Cost (£bn)"
              source={{
                name: 'NHS Resolution',
                dataset: 'Annual Report and Accounts',
                frequency: 'annual',
                url: 'https://resolution.nhs.uk/resources/annual-report-and-accounts/',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The data on patient safety</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>Over 1.5 million patient safety incidents are reported to NHS England each year — around 11,000 of which result in severe harm or death.<Cite nums={1} /> These figures require careful interpretation: higher reporting rates can indicate a healthier safety culture, where staff feel confident raising concerns, as much as more frequent harm. The NHS's National Reporting and Learning System was explicitly designed to encourage near-miss reporting precisely to identify systemic risk before it causes harm.</p>
              <p>Clinical negligence costs have grown from £0.86 billion in 2010 to £2.4 billion in 2023/24.<Cite nums={2} /> Maternity claims account for the largest category — roughly 60% of total cost despite being a small share of NHS activity. The Ockenden Review (2022) found systematic failures at Shrewsbury and Telford NHS Trust spanning two decades, resulting in avoidable deaths and brain injuries among hundreds of babies and mothers.<Cite nums={3} /> Similar patterns emerged from the East Kent and Morecambe Bay reviews.</p>
              <p>The burden of unsafe care falls disproportionately on those least able to advocate for themselves. Patients in maternity services, mental health inpatient units, and emergency departments account for a disproportionate share of serious incidents.<Cite nums={1} /> Rising clinical negligence costs also represent a significant and growing pressure on NHS budgets — money spent on legal claims and settlements that cannot be spent on care.<Cite nums={2} /></p>
            </div>
          </section>
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p><a href="https://www.england.nhs.uk/patient-safety/patient-safety-incident-management-system/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS England</a> — Patient Safety Incident Management System (PSIMS). Published annually.</p>
            <p><a href="https://resolution.nhs.uk/resources/annual-report-and-accounts/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS Resolution</a> — Annual Report and Accounts. Clinical negligence costs include all NHSLA-managed claims, settlements, provisions, and legal costs.</p>
            <p>Donna Ockenden — Independent Review of Maternity Services at Shrewsbury and Telford NHS Trust. March 2022. Never events are defined under the NHS England Never Events Policy and Framework.</p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
