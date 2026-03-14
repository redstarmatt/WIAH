'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'NHS England', dataset: 'Quality and Outcomes Framework — CKD Indicators', url: 'https://digital.nhs.uk/data-and-information/publications/statistical/quality-and-outcomes-framework', date: '2024' },
  { num: 2, name: 'Kidney Care UK', dataset: 'UK Renal Registry Annual Report', url: 'https://ukkidney.org/audit-research/uk-renal-registry/reports', date: '2024' },
  { num: 3, name: 'NICE', dataset: 'CKD Guideline Evidence Review', url: 'https://www.nice.org.uk/guidance/ng203', date: '2023' },
];

const diagnosedPrevalenceValues = [4.2, 4.4, 4.6, 4.8, 5.0, 5.1, 5.3, 5.5, 5.7, 5.9, 6.1];
const dialysisPatientValues = [22800, 23100, 23500, 23900, 24200, 24100, 24600, 25100, 25600, 26100, 26500];
const transplantValues = [3200, 3350, 3500, 3650, 3700, 2900, 3400, 3600, 3750, 3900, 4050];
const undiagnosedEstimateValues = [1.9, 2.0, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9];

const series1: Series[] = [
  { id: 'diagnosed', label: 'Diagnosed CKD prevalence (%)', colour: '#264653', data: diagnosedPrevalenceValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
  { id: 'undiagnosed', label: 'Estimated undiagnosed (millions)', colour: '#E63946', data: undiagnosedEstimateValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
];

const series2: Series[] = [
  { id: 'dialysis', label: 'Patients on dialysis', colour: '#E63946', data: dialysisPatientValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
  { id: 'transplant', label: 'Kidney transplants per year', colour: '#2A9D8F', data: transplantValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
];

export default function ChronicKidneyDiseasePage() {
  return (
    <>
      <TopicNav topic="Chronic Kidney Disease" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Health"
          question="How Many People Are Living with Undiagnosed Kidney Disease?"
          finding={<>Around 6.1% of adults in England are on a GP register for chronic kidney disease (CKD) — approximately 3.2 million people — but an estimated 2.9 million more have CKD that has never been diagnosed.<Cite nums={[1, 3]} /> Late-stage CKD costs the NHS over £1.8 billion annually in dialysis, transplantation, and complications; earlier detection would allow treatment to slow or halt progression in the majority of cases.<Cite nums={2} /></>}
          colour="#E63946"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Chronic kidney disease is the progressive loss of kidney function. At its most advanced stages, it is fatal without dialysis or transplantation. The great majority of CKD is caused by — or exacerbated by — conditions that are themselves rising in prevalence: type 2 diabetes, hypertension, and obesity. CKD at stages 1 and 2 is asymptomatic, which is why such a large proportion of cases remain undetected until patients present with advanced disease or with complications such as cardiovascular events, which CKD markedly increases in risk.<Cite nums={3} /> NICE guidelines recommend annual eGFR and urine ACR testing for people with diabetes and hypertension — but uptake of this monitoring is incomplete, meaning many patients on GP lists for the relevant comorbidities are not receiving the blood and urine tests that would identify early CKD.</p>
            <p>The NHS has around 26,500 patients on dialysis — a treatment costing approximately £35,000 per patient per year — and performs around 4,050 kidney transplants annually.<Cite nums={2} /> Dialysis numbers are rising as the population ages and as the prevalence of diabetes and obesity increases. There are currently around 5,000 people on the kidney transplant waiting list, and average wait times have lengthened to over two years for a deceased donor kidney. SGLT2 inhibitor drugs — originally developed for type 2 diabetes — have been shown to slow CKD progression by 30–40% in trials, and NICE approved them for CKD in 2023. But they can only be prescribed to patients who have been identified and monitored — the undiagnosed millions remain entirely outside the reach of this intervention.<Cite nums={[2, 3]} /></p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Overview' },
          { id: 'sec-chart1', label: 'Prevalence' },
          { id: 'sec-chart2', label: 'Dialysis & Transplants' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard label="Diagnosed CKD prevalence" value="6.1%" unit="of adults in England" direction="up" polarity="up-is-bad" changeText="up from 4.2% in 2013 · ~3.2M on GP register" sparklineData={[4.2, 4.4, 4.6, 4.8, 5.0, 5.1, 5.3, 5.5, 5.7, 5.9, 6.1]} source="NHS England — QOF 2024" href="#sec-chart1" />
            <MetricCard label="Undiagnosed CKD (est.)" value="2.9M" unit="adults" direction="up" polarity="up-is-bad" changeText="estimated to be undiagnosed · missing early intervention" sparklineData={[1.9, 2.0, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9]} source="NICE — CKD Guideline Evidence Review 2023" href="#sec-chart1" />
            <MetricCard label="Patients on dialysis" value="26,500" unit="in England" direction="up" polarity="up-is-bad" changeText="up from 22,800 in 2013 · costs ~£35,000/patient/year" sparklineData={[22800, 23100, 23500, 23900, 24200, 24100, 24600, 25100, 25600, 26100, 26500]} source="UK Renal Registry Annual Report 2024" href="#sec-chart2" />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="CKD diagnosed prevalence and undiagnosed estimate, England, 2013–2024"
              subtitle="Diagnosed CKD prevalence (% of adults on GP register) and estimated number of adults with undiagnosed CKD (millions). Both rising as population ages and diabetes/obesity prevalence increases."
              series={series1}
              annotations={[]}
              yLabel="% / Millions"
              source={{ name: 'NHS England', dataset: 'Quality and Outcomes Framework — CKD', url: 'https://digital.nhs.uk/data-and-information/publications/statistical/quality-and-outcomes-framework', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Dialysis patients and kidney transplants, England, 2013–2024"
              subtitle="Total patients on renal replacement therapy (dialysis) and number of kidney transplants performed annually. Transplants fell sharply during COVID and are recovering but waiting lists remain long."
              series={series2}
              annotations={[{ date: new Date(2020, 2, 1), label: '2020: COVID — reduced transplant activity' }]}
              yLabel="Patients / Transplants"
              source={{ name: 'Kidney Care UK', dataset: 'UK Renal Registry Annual Report', url: 'https://ukkidney.org/audit-research/uk-renal-registry/reports', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="SGLT2 inhibitors approved for CKD in 2023"
            value="30–40%"
            unit="reduction in CKD progression with SGLT2 inhibitor therapy"
            description="NICE approved dapagliflozin for CKD in 2023 following strong trial evidence that SGLT2 inhibitors slow the decline of kidney function by 30–40% in patients with proteinuria. This represents the most significant advance in CKD management in decades. For the millions of patients who are identified early and treated appropriately, these drugs could prevent or substantially delay the need for dialysis — with major quality of life and cost benefits. The challenge is ensuring they are diagnosed and prescribed in time."
            source="Source: NICE — Technology Appraisal TA775 (Dapagliflozin for CKD) 2023."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://digital.nhs.uk/data-and-information/publications/statistical/quality-and-outcomes-framework" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS England — Quality and Outcomes Framework</a> — CKD register size, monitoring rates. Annual.</p>
            <p><a href="https://ukkidney.org/audit-research/uk-renal-registry/reports" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Kidney Care UK — UK Renal Registry Annual Report</a> — dialysis patients, transplant numbers, outcomes. Annual.</p>
            <p>Diagnosed prevalence is from QOF CKD register. Undiagnosed estimate is modelled from CPRD cohort studies and population surveys. Dialysis counts include haemodialysis and peritoneal dialysis.</p>
          </div>
        </section>
      </main>
    </>
  );
}
