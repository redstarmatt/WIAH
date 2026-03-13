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

const editorialRefs: Reference[] = [
  { num: 1, name: 'TUC / University of Hertfordshire', dataset: 'Living on the Gig Economy Survey', url: 'https://www.tuc.org.uk/research-analysis/reports/gig-economy', date: '2024' },
  { num: 2, name: 'Supreme Court', dataset: 'Uber BV v Aslam [2021] UKSC 5', date: '2021' },
  { num: 3, name: 'BEIS', dataset: 'Employment Rights Bill / Taylor Review', url: 'https://assets.publishing.service.gov.uk/media/5f1b4a39e90e07480da19a72/good-work-plan.pdf', date: '2024' },
];

// Gig economy workers (millions), 2015–2025
const gigWorkers = [2.5, 2.8, 3.0, 3.2, 3.5, 3.8, 3.9, 4.0, 4.1, 4.2, 4.4];
// Platform-only income workers (millions), 2015–2025
const platformOnly = [0.8, 1.0, 1.2, 1.5, 1.8, 2.1, 2.3, 2.4, 2.5, 2.6, 2.7];
// Without sick pay (%), 2015–2025
const withoutSickPay = [75, 75, 74, 73, 73, 72, 72, 72, 72, 72, 72];
// Without pension auto-enrolment (%), 2015–2025
const withoutPension = [72, 72, 71, 70, 70, 69, 68, 68, 68, 68, 68];

const workersSeries: Series[] = [
  {
    id: 'gig-workers',
    label: 'Gig economy workers (millions)',
    colour: '#E63946',
    data: gigWorkers.map((v, i) => ({ date: new Date(2015 + i, 5, 1), value: v })),
  },
  {
    id: 'platform-only',
    label: 'Platform-only income (millions)',
    colour: '#F4A261',
    data: platformOnly.map((v, i) => ({ date: new Date(2015 + i, 5, 1), value: v })),
  },
];

const rightsSeries: Series[] = [
  {
    id: 'without-sick-pay',
    label: 'Without sick pay (%)',
    colour: '#E63946',
    data: withoutSickPay.map((v, i) => ({ date: new Date(2015 + i, 5, 1), value: v })),
  },
  {
    id: 'without-pension',
    label: 'Without pension auto-enrolment (%)',
    colour: '#264653',
    data: withoutPension.map((v, i) => ({ date: new Date(2015 + i, 5, 1), value: v })),
  },
];

const workersAnnotations: Annotation[] = [
  { date: new Date(2020, 5, 1), label: '2020: COVID delivery demand surges' },
  { date: new Date(2021, 5, 1), label: '2021: Supreme Court Uber workers ruling' },
];

const rightsAnnotations: Annotation[] = [
  { date: new Date(2021, 5, 1), label: '2021: Taylor Review recommendations still unimplemented' },
  { date: new Date(2024, 5, 1), label: '2024: Employment Rights Bill introduced' },
];

export default function GigWorkerRightsPage() {
  return (
    <>
      <TopicNav topic="Economy & Work" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Economy & Work"
          question="What Protections Do Gig Workers Actually Have?"
          finding="An estimated 4.4 million people work in the gig economy. Fewer than 30% receive sick pay, pension auto-enrolment, or holiday pay — leaving most without basic employment protections that employees take for granted."
          colour="#6B7280"
          preposition="in the"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>British employment law distinguishes three categories: employees, workers, and the self-employed. Employees have the fullest rights — sick pay, parental leave, redundancy, unfair dismissal protection. Workers get minimum wage, holiday pay, and pension auto-enrolment, but not the rest. The self-employed get almost none of these. Most gig workers are classified as self-employed by the platforms that engage them, which means they receive none of the protections available even to workers, let alone employees.<Cite nums={[1]} /> The 2017 Taylor Review of Modern Working Practices recommended extending rights to gig workers and creating a clearer classification system, but its recommendations were not implemented for years.<Cite nums={[3]} /></p>
            <p>The 2021 Supreme Court ruling in Uber v Aslam established that Uber drivers are workers — not self-employed — entitling them to minimum wage, holiday pay, and pension auto-enrolment.<Cite nums={[2]} /> Uber complied and settled with affected drivers. But the ruling applied only to Uber's specific contractual arrangements; other platforms argued their contracts were materially different, and litigation continues across the sector. Deliveroo successfully argued in 2021 that its riders are genuinely self-employed, a ruling upheld by the Court of Appeal. The Employment Rights Bill, introduced in 2024, proposes to extend worker status protections and create a single employment status, potentially affecting an estimated 1.5 million people.<Cite nums={[3]} /> It also proposes to require platforms to offer predictable hours contracts to workers who request them.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Workforce Size' },
          { id: 'sec-chart2', label: 'Rights Gap' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Gig economy workers"
              value="4.4m"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Up 60% since 2015 · platform work dominant"
              sparklineData={gigWorkers.slice(-8)}
              source="TUC / University of Hertfordshire · 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Without sick pay"
              value="72%"
              unit=""
              direction="flat"
              polarity="up-is-bad"
              changeText="Most classified as self-employed · no access to SSP"
              sparklineData={withoutSickPay.slice(-8)}
              source="TUC · Gig Economy Survey 2024"
              href="#sec-chart2"
            />
            <MetricCard
              label="Without pension auto-enrolment"
              value="68%"
              unit=""
              direction="flat"
              polarity="up-is-bad"
              changeText="Excluded from 2012 AE reforms · low retirement savings"
              sparklineData={withoutPension.slice(-8)}
              source="TUC / ONS · 2024"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Gig economy workforce size, UK, 2015–2025"
              subtitle="Estimated gig economy workers as primary income source (red) and those relying solely on platform income (amber). Both rising, with platform-only dependency growing fastest."
              series={workersSeries}
              annotations={workersAnnotations}
              yLabel="Workers (millions)"
              source={{ name: 'TUC / University of Hertfordshire', dataset: 'Living on the Gig Economy Survey', url: 'https://www.tuc.org.uk/research-analysis/reports/gig-economy', frequency: 'periodic', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Gig workers without key employment rights, UK, 2015–2025"
              subtitle="Percentage of gig workers lacking sick pay (red) and pension auto-enrolment (blue). Both have barely shifted despite multiple court rulings and the Taylor Review."
              series={rightsSeries}
              annotations={rightsAnnotations}
              yLabel="Workers without right (%)"
              source={{ name: 'TUC', dataset: 'Gig Economy Survey — Rights Module', url: 'https://www.tuc.org.uk/research-analysis/reports/gig-economy', frequency: 'periodic', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Employment Rights Bill 2024 proposing single employment status"
            value="2024"
            unit="Employment Rights Bill introduced in Parliament"
            description="The Employment Rights Bill, introduced in October 2024, proposes the most significant overhaul of employment law in a generation. Key measures include creating a clearer single employment status framework to reduce classification disputes, requiring platforms to offer predictable hours contracts to workers who request them, strengthening the right to claim worker status, and making it easier to bring tribunal claims. If fully implemented, the Bill could extend rights to an estimated 1.5 million people currently classified as self-employed by platforms. The Supreme Court Uber ruling in 2021 had already established that contractual classification does not determine legal status — what matters is the reality of the working relationship."
            source="Source: BEIS — Employment Rights Bill 2024. TUC — Analysis of Employment Rights Bill provisions 2024."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.tuc.org.uk/research-analysis/reports/gig-economy" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">TUC / University of Hertfordshire — Living on the Gig Economy</a> — Periodic survey of gig workers covering pay, rights, and working conditions. Retrieved 2025.</p>
            <p><a href="https://assets.publishing.service.gov.uk/media/5f1b4a39e90e07480da19a72/good-work-plan.pdf" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">BEIS — Good Work Plan</a> — Taylor Review implementation document and subsequent Employment Rights Bill. Retrieved 2025.</p>
            <p>Worker status classification uses legal categories under the Employment Rights Act 1996 as interpreted through case law. Rights gaps are estimated from TUC survey self-reporting. Figures should be treated as indicative due to definitional variation across surveys.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
