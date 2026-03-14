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
  { num: 1, name: 'NHS Resolution', dataset: 'Annual Report and Accounts', url: 'https://resolution.nhs.uk/resources/annual-reports-and-accounts/', date: '2024' },
  { num: 2, name: 'National Audit Office', dataset: 'Managing the Cost of Clinical Negligence in Trusts', url: 'https://www.nao.org.uk/reports/managing-the-cost-of-clinical-negligence-in-trusts/', date: '2023' },
  { num: 3, name: 'NHS Resolution', dataset: 'NHS Litigation Authority Factsheet', url: 'https://resolution.nhs.uk/resources/nhsla-factsheets/', date: '2024' },
];

const claimsPayoutValues = [1.1, 1.25, 1.4, 1.6, 2.0, 2.2, 2.5, 2.7, 2.85, 3.0, 3.1];
const newClaimsValues = [10.4, 11.1, 11.6, 12.6, 11.7, 11.9, 12.8, 13.4, 14.3, 15.2, 15.8];
const totalLiabilityValues = [26.1, 28.6, 31.8, 56.0, 61.4, 67.0, 70.0, 78.0, 83.6, 86.0, 89.0];
const maternityClaimsValues = [42.0, 44.1, 46.2, 48.3, 47.1, 45.0, 50.2, 52.4, 55.0, 57.1, 58.0];

const series1: Series[] = [
  { id: 'payouts', label: 'Total payouts (£ billion)', colour: '#E63946', data: claimsPayoutValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
  { id: 'liability', label: 'Total liability (£ billion)', colour: '#6B7280', data: totalLiabilityValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
];

const series2: Series[] = [
  { id: 'claims', label: 'New claims per year (thousands)', colour: '#264653', data: newClaimsValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
  { id: 'maternity', label: 'Maternity claims as % of total cost', colour: '#F4A261', data: maternityClaimsValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
];

const annotations1: Annotation[] = [
  { date: new Date(2017, 3, 1), label: '2017: Discount rate change — liability surged' },
];

export default function ClinicalNegligenceCostsPage() {
  return (
    <>
      <TopicNav topic="Clinical Negligence Costs" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Health"
          question="How Much Is NHS Clinical Negligence Costing Taxpayers?"
          finding={<>NHS clinical negligence payouts reached £3.1 billion in 2023/24 — up from £1.1 billion a decade ago — while the total outstanding liability on NHS Resolution&apos;s books now stands at £89 billion.<Cite nums={1} /> Maternity claims alone account for 58% of total costs by value, despite representing fewer than 10% of cases by number.<Cite nums={[1, 2]} /></>}
          colour="#E63946"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>NHS clinical negligence is the fastest-growing cost pressure in the health service that almost nobody talks about. NHS Resolution — the arm&apos;s-length body that handles NHS litigation — paid out £3.1 billion in compensation in 2023/24, more than three times the £1.1 billion paid a decade earlier. The total future liability — the estimated cost of all outstanding and expected future claims — stands at £89 billion, an enormous contingent liability on the public balance sheet.<Cite nums={[1, 2]} /> These costs are driven partly by rising claims volumes, partly by growing compensation amounts for brain-damaged babies — where care packages can run to £20–30 million per case — and partly by the Ogden discount rate change in 2017, which significantly increased lump-sum compensation values.</p>
            <p>Maternity negligence is the most striking component. Although maternity cases represent around 9% of claims by number, they account for 58% of costs — because a severely brain-injured baby requires a lifetime of intensive care, therapy, and support. Reviews including the Ockenden report into Shrewsbury and Telford NHS Trust (2022) and the East Kent Maternity Services Review have exposed systemic failures in safety culture, staffing, and learning from incidents.<Cite nums={3} /> NHS Resolution argues that every £1 spent on prevention saves approximately £8 in future compensation costs. But progress is slow and the liability is already locked in for decades to come.<Cite nums={2} /></p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Overview' },
          { id: 'sec-chart1', label: 'Payouts & Liability' },
          { id: 'sec-chart2', label: 'Claims Volume' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard label="Annual payouts" value="£3.1bn" unit="2023/24" direction="up" polarity="up-is-bad" changeText="up from £1.1bn in 2013 · nearly tripled in a decade" sparklineData={[1.1, 1.25, 1.4, 1.6, 2.0, 2.2, 2.5, 2.7, 2.85, 3.0, 3.1]} source="NHS Resolution — Annual Report 2024" href="#sec-chart1" />
            <MetricCard label="Total outstanding liability" value="£89bn" unit="contingent liability" direction="up" polarity="up-is-bad" changeText="up from £26bn in 2013 · includes future expected claims" sparklineData={[26.1, 28.6, 31.8, 56.0, 61.4, 67.0, 70.0, 78.0, 83.6, 86.0, 89.0]} source="NHS Resolution — Annual Report 2024" href="#sec-chart1" />
            <MetricCard label="New claims per year" value="15,800" unit="claims" direction="up" polarity="up-is-bad" changeText="up from 10,412 in 2013 · 52% increase" sparklineData={[10.4, 11.1, 11.6, 12.6, 11.7, 11.9, 12.8, 13.4, 14.3, 15.2, 15.8]} source="NHS Resolution — Annual Report 2024" href="#sec-chart2" />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="NHS clinical negligence payouts and total liability, 2013–2024"
              subtitle="Annual compensation paid (£ billion) and total outstanding liability on NHS Resolution's books (£ billion). The 2017 discount rate change caused a step-change in reported liability."
              series={series1}
              annotations={annotations1}
              yLabel="£ billion"
              source={{ name: 'NHS Resolution', dataset: 'Annual Report and Accounts', url: 'https://resolution.nhs.uk/resources/annual-reports-and-accounts/', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="New clinical negligence claims and maternity cost share, 2013–2024"
              subtitle="New claims received per year (thousands) and maternity claims as % of total compensation costs by value. Maternity dominates costs despite being a small minority of cases by number."
              series={series2}
              annotations={[{ date: new Date(2022, 2, 1), label: '2022: Ockenden report published' }]}
              yLabel="Thousands / Percentage"
              source={{ name: 'NHS Resolution', dataset: 'Annual Report and Accounts', url: 'https://resolution.nhs.uk/resources/annual-reports-and-accounts/', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Early intervention programme reducing maternity harm"
            value="£8"
            unit="saved in future claims for every £1 spent on maternity safety"
            description="NHS Resolution's maternity incentive scheme, which ties financial incentives to achievement of 10 safety actions in maternity services, has been taken up by the majority of NHS trusts. Evidence from pilot sites shows reductions in brain injury rates in term babies. NHS Resolution analysis estimates that every £1 invested in maternity safety prevention saves approximately £8 in future clinical negligence compensation. If the scheme achieves its targets across all trusts, it could reduce the annual maternity compensation bill by £500 million within a decade."
            source="Source: NHS Resolution — Annual Report 2024. National Audit Office 2023."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://resolution.nhs.uk/resources/annual-reports-and-accounts/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS Resolution — Annual Report and Accounts</a> — payouts, claims volumes, liability, maternity data. Annual.</p>
            <p><a href="https://www.nao.org.uk/reports/managing-the-cost-of-clinical-negligence-in-trusts/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">National Audit Office — Managing the Cost of Clinical Negligence</a> — system analysis, prevention opportunities. 2023.</p>
            <p>Total liability is the net present value of all estimated future payments. The Ogden discount rate change in March 2017 (from 2.5% to -0.75%) increased lump-sum valuations significantly.</p>
          </div>
        </section>
      </main>
    </>
  );
}
