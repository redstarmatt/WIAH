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

// ── References ──────────────────────────────────────────────────────────────

const editorialRefs: Reference[] = [
  { num: 1, name: 'HMRC', dataset: 'National Minimum Wage Enforcement Statistics 2024', url: 'https://www.gov.uk/government/collections/national-minimum-wage-statistics', date: '2024' },
  { num: 2, name: 'Resolution Foundation / TUC', dataset: 'Estimated scale of wage theft in the UK', url: 'https://www.resolutionfoundation.org/', date: '2024' },
  { num: 3, name: 'BEIS', dataset: 'Employment Rights Bill Impact Assessment', url: 'https://www.gov.uk/government/publications/employment-rights-bill-impact-assessments', date: '2024' },
];

export default function WageTheftPage() {

  const hmrcArrearsData     = [10.9, 13.0, 15.3, 14.9, 15.4, 17.3, 12.0, 14.1, 16.8, 18.2];
  const complaintsData      = [14000, 16000, 17000, 18000, 19000, 20500, 21000, 22000, 23500, 24000];
  const investigatedData    = [7000, 7500, 8000, 8200, 8500, 9000, 9000, 9500, 10000, 10200];
  const workersUnderpaidData = [215000, 230000, 245000, 260000, 270000, 295000, 320000, 340000, 355000, 360000];

  const arrearsSeries: Series[] = [
    {
      id: 'hmrc-arrears',
      label: 'HMRC minimum wage arrears identified (£m)',
      colour: '#E63946',
      data: hmrcArrearsData.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
  ];

  const enforcementSeries: Series[] = [
    {
      id: 'complaints',
      label: 'Minimum wage complaints received',
      colour: '#6B7280',
      data: complaintsData.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
    {
      id: 'investigated',
      label: 'Complaints investigated',
      colour: '#E63946',
      data: investigatedData.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
  ];

  const arrearsAnnotations: Annotation[] = [
    { date: new Date(2020, 0, 1), label: '2020: Pandemic — enforcement paused' },
    { date: new Date(2024, 0, 1), label: '2024: Employment Rights Bill — expanded enforcement' },
  ];

  const enforcementAnnotations: Annotation[] = [
    { date: new Date(2020, 0, 1), label: '2020: Complaints spike during pandemic' },
  ];

  return (
    <>
      <TopicNav topic="Wage Theft" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Wage Theft"
          question="How Widespread is Wage Theft?"
          finding="HMRC identified £26 million in underpaid minimum wage in 2023/24 — but estimates suggest the true scale is £3 billion annually, as enforcement is vastly underfunded."
          colour="#E63946"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-arrears', label: 'Arrears Identified' },
          { id: 'sec-enforcement', label: 'Enforcement Gap' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="HMRC minimum wage arrears identified"
              value="£26m/yr"
              direction="up"
              polarity="up-is-good"
              changeText="Up from £10.9m in 2015 · but covers only ~1% of estimated theft"
              sparklineData={hmrcArrearsData}
              source="HMRC · NMW Enforcement Statistics 2024"
            />
            <MetricCard
              label="Estimated true scale of wage theft"
              value="£3bn/yr"
              direction="up"
              polarity="up-is-bad"
              changeText="Modelled estimate from ONS earnings data — enforcement catches a fraction"
              sparklineData={[1.5, 1.7, 1.9, 2.0, 2.2, 2.5, 2.7, 2.8, 3.0, 3.0]}
              source="Resolution Foundation / TUC estimates · 2024"
            />
            <MetricCard
              label="Workers underpaid minimum wage"
              value="355,000"
              direction="up"
              polarity="up-is-bad"
              changeText="Up from 215,000 in 2015 · concentrated in hospitality, social care, retail"
              sparklineData={workersUnderpaidData}
              source="HMRC / ONS · NMW Compliance Data 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-arrears" className="mb-12">
            <LineChart
              title="HMRC minimum wage enforcement — arrears identified, 2015–2024"
              subtitle="Total wages identified for repayment through HMRC enforcement activity (£ millions). Does not represent all underpayment — only what enforcement activity finds."
              series={arrearsSeries}
              annotations={arrearsAnnotations}
              yLabel="Arrears identified (£m)"
              source={{
                name: 'HMRC',
                dataset: 'National Minimum Wage Enforcement Statistics',
                frequency: 'annual',
                url: 'https://www.gov.uk/government/collections/national-minimum-wage-statistics',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-enforcement" className="mb-12">
            <LineChart
              title="Minimum wage complaints received vs investigated, 2015–2024"
              subtitle="Gap between complaints received by HMRC and those actually investigated. The ratio illustrates enforcement capacity constraints."
              series={enforcementSeries}
              annotations={enforcementAnnotations}
              yLabel="Complaints"
              source={{
                name: 'HMRC',
                dataset: 'NMW Enforcement Statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="Employment Rights Bill — extended time limits"
            value="3 years"
            unit="tribunal time limit (up from 3 months)"
            description="The 2024 Employment Rights Bill extended the tribunal time limit for wage claims from 3 months to 3 years — a significant improvement for workers who fear retaliation if they complain while still employed. It also increased HMRC enforcement resource. But advocates argue that without a dramatic increase in inspectors and a shift to proactive sector-based enforcement, the gap between theft and recovery will persist."
            source="BEIS · Employment Rights Bill Impact Assessment 2024"
          />
        </ScrollReveal>

        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The data on wage theft</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>Wage theft — the non-payment or underpayment of wages legally owed — is one of the most pervasive and least prosecuted economic crimes in the UK. HMRC estimates approximately 355,000 workers are paid below the National Living Wage at any point, with total underpayment running at an estimated £3 billion per year, concentrated in hospitality, social care, retail, and agriculture.<Cite nums={[1, 2]} /> Enforcement is strikingly weak: HMRC identified just £26 million in arrears in 2023/24<Cite nums={1} /> — roughly 1% of the estimated annual theft — and criminal prosecutions average fewer than 10 per year.</p>
              <p>The problem extends beyond minimum wage violations to unpaid pre-shift time, unlawful deductions for uniforms and breakages, and worker misclassification as self-employed to avoid holiday pay, sick pay, and pension obligations. The most affected workers — those on zero-hours or agency contracts in hospitality and care — are also those with the least power to complain, least access to union representation, and most fear of losing future work.</p>
              <p>Redress is structurally inaccessible. Bringing a tribunal claim is complex and intimidating, and legal aid cuts since 2013 have reduced support for low-income claimants. The ratio of workers at risk to enforcement officers is estimated at over 50,000:1 — making deterrence through prosecution a statistical impossibility. The 2024 Employment Rights Bill's extended time limits and additional enforcement resource are welcome, but enforcement advocates argue proactive sector-based inspection — as used in Australia and the US — is the only model that can approach the true scale of non-compliance.</p>
            </div>
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p><a href="https://www.gov.uk/government/collections/national-minimum-wage-statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">HMRC</a> — National Minimum Wage Enforcement Statistics 2024. Published annually. Worker underpayment estimates are based on HMRC survey evidence and employer compliance data. Arrears recovered are total wages identified for repayment through HMRC enforcement activity.</p>
            <p>Resolution Foundation / TUC — True scale of wage theft estimates. Modelled from ONS Annual Survey of Hours and Earnings matched to minimum wage rates by sector. Criminal prosecution figures are from CPS and HMRC joint reporting.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
