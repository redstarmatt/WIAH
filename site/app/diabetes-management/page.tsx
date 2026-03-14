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
  { num: 1, name: 'NHS England', dataset: 'National Diabetes Audit', url: 'https://digital.nhs.uk/data-and-information/clinical-audits-and-registries/national-diabetes-audit', date: '2024' },
  { num: 2, name: 'Diabetes UK', dataset: 'Facts and Stats Report', url: 'https://www.diabetes.org.uk/professionals/position-statements-reports/statistics', date: '2024' },
  { num: 3, name: 'NHS England', dataset: 'Prescription Cost Analysis', url: 'https://digital.nhs.uk/data-and-information/publications/statistical/prescription-cost-analysis', date: '2024' },
];

const diabetesPrevalenceValues = [5.8, 6.0, 6.2, 6.4, 6.6, 6.8, 7.0, 7.2, 7.5, 7.8, 8.0];
const hba1cControlValues = [67.3, 67.9, 68.4, 69.1, 70.2, 69.8, 71.3, 72.1, 73.4, 74.2, 75.0];
const amputation Values = [8600, 8800, 9100, 9200, 9400, 8900, 9600, 9800, 10100, 10300, 10500];
const preventionReferralValues = [0, 0, 12000, 32000, 65000, 72000, 105000, 180000, 218000, 240000, 255000];

const series1: Series[] = [
  { id: 'prevalence', label: 'Diagnosed diabetes prevalence (%)', colour: '#E63946', data: diabetesPrevalenceValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
  { id: 'hba1c', label: 'T2 patients achieving HbA1c target (%)', colour: '#2A9D8F', data: hba1cControlValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
];

const series2: Series[] = [
  { id: 'amputation', label: 'Diabetes-related amputations per year', colour: '#E63946', data: amputation Values.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
  { id: 'prevention', label: 'NHS DPP referrals per year', colour: '#264653', data: preventionReferralValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
];

const annotations1: Annotation[] = [
  { date: new Date(2016, 5, 1), label: '2016: NHS Diabetes Prevention Programme launched' },
];

export default function DiabetesManagementPage() {
  return (
    <>
      <TopicNav topic="Diabetes Management" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Health"
          question="Is Type 2 Diabetes Becoming Unmanageable?"
          finding={<>Around 4.4 million people are diagnosed with diabetes in England — 8% of the adult population — and a further 1.5 million are estimated to have undiagnosed type 2 diabetes.<Cite nums={2} /> Despite improved medication, diabetes-related amputations are rising, and the condition now consumes around 10% of the entire NHS budget — over £10 billion annually.<Cite nums={[1, 2]} /></>}
          colour="#E63946"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Type 2 diabetes — the form driven overwhelmingly by obesity, poor diet, and physical inactivity — is the defining preventable disease of our era. It accounts for around 90% of all diabetes cases and its prevalence has roughly doubled in 20 years. Diagnosed prevalence in England now stands at 8% of the adult population, but the true figure — including undiagnosed cases — is closer to 10%.<Cite nums={2} /> The direct treatment cost is enormous: each person with type 2 diabetes costs the NHS approximately £2,500 per year in medications, monitoring, and management of complications. The indirect costs — through lost productivity, cardiovascular disease, blindness, kidney failure, and amputations — are comparable again. Diabetes accounts for more than half of all non-traumatic lower limb amputations in England.</p>
            <p>The picture is not uniformly bleak. The proportion of type 2 diabetes patients achieving their HbA1c (blood sugar control) target has risen from 67.3% to 75%, driven partly by better medications — particularly SGLT2 inhibitors and GLP-1 receptor agonists — and partly by improved structured education programmes.<Cite nums={1} /> The NHS Diabetes Prevention Programme, launched in 2016, refers high-risk individuals to a nine-month behaviour change programme, and has demonstrated a 26% reduction in type 2 diabetes incidence among completers. Over 255,000 people are now referred annually.<Cite nums={3} /> But the prevention programme reaches a fraction of those eligible, and the underlying drivers — obesity, ultra-processed food consumption, physical inactivity — continue to push prevalence upward at a rate the healthcare system cannot match with treatment alone.<Cite nums={2} /></p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Overview' },
          { id: 'sec-chart1', label: 'Prevalence & Control' },
          { id: 'sec-chart2', label: 'Amputations & Prevention' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard label="Diagnosed diabetes prevalence" value="8.0%" unit="of adults in England" direction="up" polarity="up-is-bad" changeText="up from 5.8% in 2013 · 4.4M people diagnosed" sparklineData={[5.8, 6.0, 6.2, 6.4, 6.6, 6.8, 7.0, 7.2, 7.5, 7.8, 8.0]} source="NHS England — National Diabetes Audit 2024" href="#sec-chart1" />
            <MetricCard label="T2D patients at HbA1c target" value="75.0%" unit="achieving control" direction="up" polarity="up-is-good" changeText="up from 67.3% in 2013 · better medications helping" sparklineData={[67.3, 67.9, 68.4, 69.1, 70.2, 69.8, 71.3, 72.1, 73.4, 74.2, 75.0]} source="NHS England — National Diabetes Audit 2024" href="#sec-chart1" />
            <MetricCard label="Diabetes-related amputations" value="10,500" unit="per year" direction="up" polarity="up-is-bad" changeText="up from 8,600 in 2013 · most are preventable" sparklineData={[8600, 8800, 9100, 9200, 9400, 8900, 9600, 9800, 10100, 10300, 10500]} source="NHS England — National Diabetes Audit 2024" href="#sec-chart2" />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Diabetes prevalence and glycaemic control, England, 2013–2024"
              subtitle="Diagnosed diabetes prevalence (% of adults) and proportion of type 2 diabetes patients achieving HbA1c target of 58 mmol/mol or below. Prevalence rising faster than control improving."
              series={series1}
              annotations={annotations1}
              yLabel="Percentage (%)"
              source={{ name: 'NHS England', dataset: 'National Diabetes Audit', url: 'https://digital.nhs.uk/data-and-information/clinical-audits-and-registries/national-diabetes-audit', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Diabetes-related amputations and NHS prevention programme referrals, 2013–2024"
              subtitle="Annual lower limb amputations with diabetes as a primary or contributing cause, and annual referrals to the NHS Diabetes Prevention Programme (launched 2016)."
              series={series2}
              annotations={[{ date: new Date(2016, 5, 1), label: '2016: NHS DPP launched' }]}
              yLabel="Count"
              source={{ name: 'NHS England', dataset: 'National Diabetes Audit', url: 'https://digital.nhs.uk/data-and-information/clinical-audits-and-registries/national-diabetes-audit', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="NHS prevention programme demonstrably works"
            value="26%"
            unit="reduction in type 2 diabetes incidence among completers of the NHS DPP"
            description="A major independent evaluation of the NHS Diabetes Prevention Programme found that people who completed the nine-month structured behaviour change programme were 26% less likely to develop type 2 diabetes over the following two years compared to matched controls. The programme — delivered through GP referral to community-based group sessions covering diet, physical activity, and behaviour change — costs approximately £270 per referral. Given the lifetime cost of type 2 diabetes per person, the intervention pays for itself many times over."
            source="Source: NHS England — National Diabetes Audit 2024. Diabetes UK 2024."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://digital.nhs.uk/data-and-information/clinical-audits-and-registries/national-diabetes-audit" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS England — National Diabetes Audit</a> — prevalence, care processes, outcomes by type. Annual.</p>
            <p><a href="https://www.diabetes.org.uk/professionals/position-statements-reports/statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Diabetes UK — Facts and Stats</a> — prevalence estimates including undiagnosed, economic costs. Annual.</p>
            <p>Prevalence figures are from QOF diabetes register. HbA1c target is defined as 58 mmol/mol (7.5%) or below for type 2 diabetes. Amputation data covers lower limb amputations with diabetes recorded as primary or contributory condition.</p>
          </div>
        </section>
      </main>
    </>
  );
}
