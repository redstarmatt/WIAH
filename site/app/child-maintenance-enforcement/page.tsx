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

// CMS cases (thousands) and accumulated arrears (£ millions), 2015–2024
const cmsCasesData = [620, 680, 740, 800, 860, 900, 930, 960, 975, 990];
const arrearsData = [240, 270, 290, 310, 330, 350, 365, 380, 394, 410];

// Non-compliance rate (%) and direct pay take-up (%), 2015–2024
const nonComplianceData = [29, 29, 30, 30, 30, 31, 31, 31, 31, 31];
const directPayData = [45, 47, 49, 51, 53, 55, 57, 58, 59, 60];

const casesSeries: Series[] = [
  {
    id: 'cmsCases',
    label: 'CMS cases (thousands)',
    colour: '#264653',
    data: cmsCasesData.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
  {
    id: 'arrears',
    label: 'Accumulated arrears (£ millions)',
    colour: '#E63946',
    data: arrearsData.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
];

const complianceSeries: Series[] = [
  {
    id: 'nonCompliance',
    label: 'Non-compliant paying parents (%)',
    colour: '#E63946',
    data: nonComplianceData.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
  {
    id: 'directPay',
    label: 'Cases on Direct Pay service (%)',
    colour: '#6B7280',
    data: directPayData.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
];

const casesAnnotations: Annotation[] = [
  { date: new Date(2018, 0, 1), label: '2018: CSA migration to CMS completes' },
  { date: new Date(2022, 0, 1), label: '2022: New enforcement powers — bank deductions' },
];

const complianceAnnotations: Annotation[] = [
  { date: new Date(2017, 0, 1), label: '2017: Fees structure criticised by Work and Pensions Committee' },
  { date: new Date(2023, 0, 1), label: '2023: Domestic abuse victims given fee exemption' },
];

const editorialRefs: Reference[] = [
  { num: 1, name: 'DWP', dataset: 'Child Maintenance Service Statistics', url: 'https://www.gov.uk/government/collections/child-maintenance-service-statistics', date: '2024' },
  { num: 2, name: 'Gingerbread', dataset: 'Child Maintenance Policy Analysis', url: 'https://www.gingerbread.org.uk/policy-campaigns/', date: '2026' },
  { num: 3, name: 'House of Commons Work and Pensions Committee', dataset: 'Child Maintenance Reports', url: 'https://committees.parliament.uk/committee/164/work-and-pensions-committee/', date: '2026' },
];

export default function ChildMaintenanceEnforcementPage() {
  return (
    <>
      <TopicNav topic="Child Maintenance Enforcement" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Families"
          question="Are Non-Resident Parents Paying Child Support?"
          finding="The Child Maintenance Service manages 990,000 cases but has accumulated £410 million in arrears, with 31% of paying parents non-compliant. The fees structure — where receiving parents pay 4% of maintenance collected — penalises single-parent families seeking enforcement. Non-compliance has barely improved in a decade."
          colour="#F4A261"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The Child Maintenance Service managed 990,000 cases in 2024 — up from 620,000 in 2015, reflecting rising demand and the migration from the old Child Support Agency.<Cite nums={1} /> Around 31% of paying parents are non-compliant: behind on payments, underpaying, or not paying at all.<Cite nums={1} /> This proportion has barely moved in eight years. The result is £410 million in accumulated arrears, up 71% since 2015.<Cite nums={1} /> The fees structure introduced in 2014 — where receiving parents pay 4% of maintenance collected and paying parents pay 20% on top of their assessment on the Collect and Pay service — has been widely criticised as a further disincentive for families already failed by private arrangements, and has been shown to deter victims of domestic abuse from seeking enforcement.<Cite nums={[2, 3]} /></p>
            <p>Lone-parent families — more than 90% headed by women — are the family type most likely to be in poverty, and reliable maintenance payments can materially affect nutrition, housing stability, and educational outcomes for children.<Cite nums={2} /> Enforcement powers including earnings deductions, bank account deductions, curfew orders, and driving disqualification are deployed inconsistently and slowly, while self-employed paying parents can structure income to minimise assessable earnings.<Cite nums={3} /> The 2022 power to deduct directly from bank accounts was a meaningful improvement, but requires court authorisation in most cases, limiting its use.<Cite nums={1} /> A system non-compliant in nearly a third of cases, with over £400 million in outstanding arrears, and fees charged to the very parents seeking enforcement, remains structurally misaligned with the children it exists to protect.<Cite nums={[1, 3]} /></p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Cases & Arrears' },
          { id: 'sec-chart2', label: 'Compliance' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="CMS cases managed"
              value="990,000"
              unit="2024"
              direction="up"
              polarity="up-is-bad"
              changeText="Up from 620,000 in 2015 · private arrangements increasingly failing"
              sparklineData={[620, 680, 740, 800, 860, 900, 930, 960, 975, 990]}
              source="DWP · Child Maintenance Service Statistics 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Non-compliance rate"
              value="31%"
              unit="of paying parents"
              direction="flat"
              polarity="up-is-bad"
              changeText="Unchanged for nearly a decade · enforcement weak and inconsistent"
              sparklineData={[29, 29, 30, 30, 30, 31, 31, 31, 31, 31]}
              source="DWP · Child Maintenance Service Statistics 2024"
              href="#sec-chart2"
            />
            <MetricCard
              label="Accumulated arrears"
              value="£410m"
              unit="2024"
              direction="up"
              polarity="up-is-bad"
              changeText="Up 71% since 2015 · real harm to single-parent families"
              sparklineData={[240, 270, 290, 310, 330, 350, 365, 380, 394, 410]}
              source="DWP · Child Maintenance Service Statistics 2024"
              href="#sec-chart1"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Child Maintenance Service cases and arrears, 2015–2024"
              subtitle="Total CMS cases (thousands, dark) and accumulated arrears outstanding (£ millions, red). Both have grown substantially, reflecting rising demand and persistent non-compliance."
              series={casesSeries}
              annotations={casesAnnotations}
              yLabel="Cases (000s) / Arrears (£m)"
              source={{ name: 'Department for Work and Pensions', dataset: 'Child Maintenance Service Statistics', url: 'https://www.gov.uk/government/collections/child-maintenance-service-statistics', frequency: 'quarterly', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="CMS non-compliance rate and Direct Pay take-up, 2015–2024"
              subtitle="Percentage of paying parents non-compliant with payment schedule (red) and percentage of cases on the Direct Pay (private arrangement) service (grey). Non-compliance has not improved despite growing enforcement powers."
              series={complianceSeries}
              annotations={complianceAnnotations}
              yLabel="Percentage (%)"
              source={{ name: 'DWP', dataset: 'Child Maintenance Service Statistics', url: 'https://www.gov.uk/government/collections/child-maintenance-service-statistics', frequency: 'quarterly', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Domestic abuse victims: fee exemption from 2023"
            value="Free"
            unit="CMS enforcement for domestic abuse victims from 2023"
            description="From 2023, victims of domestic abuse using the CMS Collect and Pay service are exempt from the 4% collection fee — a reform campaigned for by Gingerbread and the Women's Aid Federation. Bank account deduction orders, introduced in 2022, allow the CMS to recover arrears directly from a paying parent's bank account in cases of persistent non-compliance, without requiring court action for amounts under £1,000. These are meaningful improvements to enforcement capability. The government has also committed to reviewing the two-child benefit limit, which — alongside child maintenance reform — forms part of the Labour government's child poverty strategy targeting a 540,000 reduction in child poverty by 2029."
            source="Source: DWP — CMS domestic abuse fee exemption 2023. Work and Pensions Committee — Child maintenance enforcement 2023."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.gov.uk/government/collections/child-maintenance-service-statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DWP — Child Maintenance Service Statistics</a> — quarterly statistical release covering cases, compliance, and arrears. Retrieved March 2026.</p>
            <p><a href="https://www.gingerbread.org.uk/policy-campaigns/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Gingerbread — Child Maintenance Policy Analysis</a> — analysis of CMS enforcement and outcomes for single-parent families. Retrieved March 2026.</p>
            <p><a href="https://committees.parliament.uk/committee/164/work-and-pensions-committee/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">House of Commons Work and Pensions Committee — Child Maintenance Reports</a> — parliamentary scrutiny of CMS performance. Retrieved March 2026.</p>
            <p className="mt-2">CMS cases include all cases on Direct Pay and Collect and Pay services at end-Q4. Non-compliance rate is the percentage of paying parents not fully compliant with payment schedule. Arrears are total outstanding debt across all open and closed cases. Annual figures represent end-March snapshots.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
