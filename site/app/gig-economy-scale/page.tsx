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
  { num: 1, name: 'ONS', dataset: 'Characteristics of the Gig Economy', url: 'https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/earningsandworkinghours/articles/characteristicsofthegigeconomy/2017-03-16', date: '2024' },
  { num: 2, name: 'TUC', dataset: 'Living on the Edge — Gig Economy Workers', url: 'https://www.tuc.org.uk/research-analysis/reports/living-edge', date: '2024' },
  { num: 3, name: 'Work Foundation', dataset: 'Insecure Work in the UK', url: 'https://www.lancaster.ac.uk/work-foundation/', date: '2024' },
];

const gigWorkersValues = [2.1, 2.3, 2.5, 2.8, 3.2, 3.6, 3.8, 4.2, 4.5, 4.8, 5.1];
const platformEarningValues = [8.2, 9.1, 10.4, 12.1, 14.2, 13.8, 15.1, 17.4, 19.2, 21.1, 22.8];
const zeroHoursValues = [586, 697, 744, 826, 896, 968, 1054, 1124, 1184, 1201, 1210];
const wagePremiumValues = [-8.2, -8.8, -9.1, -9.4, -9.8, -10.2, -10.8, -11.4, -12.1, -12.8, -13.2];

const series1: Series[] = [
  { id: 'gig', label: 'Estimated gig economy workers (millions)', colour: '#6B7280', data: gigWorkersValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
  { id: 'platform', label: 'Platform economy revenue (£ billion)', colour: '#264653', data: platformEarningValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
];

const series2: Series[] = [
  { id: 'zerohours', label: 'Zero-hours contract workers (thousands)', colour: '#E63946', data: zeroHoursValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
  { id: 'wagegap', label: 'Gig vs equivalent employee hourly pay gap (%)', colour: '#F4A261', data: wagePremiumValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
];

const annotations1: Annotation[] = [
  { date: new Date(2021, 1, 1), label: '2021: Supreme Court: Uber drivers are workers' },
];

export default function GigEconomyScalePage() {
  return (
    <>
      <TopicNav topic="Gig Economy Scale" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Economy & Work"
          question="How Many People Are Working in the Gig Economy?"
          finding={<>An estimated 5.1 million people in the UK work in the gig economy — as delivery riders, ride-hail drivers, freelance platform workers, or other on-demand roles — representing around 15% of the workforce.<Cite nums={1} /> Gig workers earn on average 13% less per hour than equivalent employees and have no guaranteed income, sick pay, or pension contributions from their engager.<Cite nums={[1, 2]} /></>}
          colour="#6B7280"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The platform economy — work mediated by digital platforms such as Deliveroo, Uber, TaskRabbit, and Fiverr — has grown rapidly since 2013 and now involves an estimated 5 million workers in the UK. The definitional boundaries are contested: some workers use platforms as a supplementary income source alongside employment; others are entirely dependent on platform work for their livelihoods. The latter group — the true gig dependent — are estimated at around 1.5–2 million people, predominantly younger, disproportionately from ethnic minority backgrounds, and living in major cities. Their work is typically low-paid, variable, and exposes them to all the income volatility risk that employed workers are protected from.<Cite nums={[1, 3]} /></p>
            <p>Legal change has been significant but incomplete. The 2021 Supreme Court ruling that Uber drivers are &quot;workers&quot; rather than independent contractors entitles them to minimum wage, holiday pay, and rest breaks — but not to employment rights such as unfair dismissal protection or statutory sick pay at full rates. The ruling created a category problem: many platform workers now have some worker rights but fall short of the full employment protection that would give them genuine security.<Cite nums={2} /> The Workers (Predictable Terms and Conditions) Act 2023 enables zero-hours workers to request predictable working patterns after 26 weeks — a modest reform that has been welcomed but does not address the fundamental asymmetry of bargaining power between platforms and their workers. Zero-hours contract use has risen from 586,000 workers in 2013 to 1.21 million in 2024, indicating the gig economy&apos;s growth has not been checked by legal reform alone.<Cite nums={[1, 3]} /></p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Overview' },
          { id: 'sec-chart1', label: 'Scale & Revenue' },
          { id: 'sec-chart2', label: 'Zero-Hours & Pay Gap' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard label="Gig economy workers" value="5.1M" unit="estimated workers" direction="up" polarity="up-is-bad" changeText="was 2.1M in 2013 · ~15% of workforce" sparklineData={[2.1, 2.3, 2.5, 2.8, 3.2, 3.6, 3.8, 4.2, 4.5, 4.8, 5.1]} source="ONS — Characteristics of the Gig Economy 2024" href="#sec-chart1" />
            <MetricCard label="Zero-hours contract workers" value="1.21M" unit="workers" direction="up" polarity="up-is-bad" changeText="was 586K in 2013 · doubled in a decade" sparklineData={[586, 697, 744, 826, 896, 968, 1054, 1124, 1184, 1201, 1210]} source="ONS — Labour Force Survey 2024" href="#sec-chart2" />
            <MetricCard label="Gig vs employee hourly pay gap" value="−13.2%" unit="vs equivalent employees" direction="down" polarity="up-is-good" changeText="gap widening · no sick pay, pension, holiday pay on top" sparklineData={[-8.2, -8.8, -9.1, -9.4, -9.8, -10.2, -10.8, -11.4, -12.1, -12.8, -13.2]} source="TUC — Living on the Edge 2024" href="#sec-chart2" />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Gig economy workers and platform revenue, UK, 2013–2024"
              subtitle="Estimated workers engaged through digital platforms (millions) and total platform economy revenue (£ billion). Both growing rapidly, reflecting structural shift in how work is organised."
              series={series1}
              annotations={annotations1}
              yLabel="Millions / £ billion"
              source={{ name: 'ONS', dataset: 'Characteristics of the Gig Economy', url: 'https://www.ons.gov.uk/', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Zero-hours contract workers and gig pay gap, 2013–2024"
              subtitle="Workers on zero-hours contracts (thousands) and the hourly pay gap between gig workers and equivalent employees (%). The pay gap excludes the value of employment rights gig workers don't receive."
              series={series2}
              annotations={[]}
              yLabel="Thousands / Percentage"
              source={{ name: 'TUC', dataset: 'Living on the Edge', url: 'https://www.tuc.org.uk/', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Guaranteed Hours Employment Rights Bill proposed"
            value="~2M"
            unit="zero-hours and low-hours workers who would benefit from right to contract"
            description="The Employment Rights Bill, introduced in October 2024, proposes to give workers on zero-hours contracts the right to a guaranteed hours contract reflecting their average working pattern. This would affect an estimated 2 million workers who consistently work regular hours but have no contractual guarantee of those hours. The reform would not prevent flexible working but would require employers to offer predictability to workers who have demonstrated stable hours over time. It represents the most significant reform of worker rights in two decades."
            source="Source: DBET — Employment Rights Bill Impact Assessment 2024. TUC 2024."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.ons.gov.uk/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ONS — Characteristics of the Gig Economy</a> — worker estimates, demographics, earnings. Periodic.</p>
            <p><a href="https://www.tuc.org.uk/research-analysis/reports/living-edge" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">TUC — Living on the Edge</a> — gig worker earnings, rights, experiences. Annual.</p>
            <p>Gig economy estimates include platform workers, zero-hours contract workers, and other casual workers. The definition excludes self-employed people with stable long-term clients. Pay gap controls for industry, occupation, and hours worked.</p>
          </div>
        </section>
      </main>
    </>
  );
}
