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

// FTSE 100 median CEO pay (£m), 2015–2023 — CIPD / High Pay Centre
const ceoPayValues = [3.5, 3.7, 3.9, 3.8, 4.0, 3.2, 3.8, 4.1, 4.4];

// Ratio of CEO pay to median worker pay, 2015–2023 — High Pay Centre
const payRatioValues = [120, 128, 132, 130, 135, 110, 125, 132, 139];

// Proportion of FTSE 100 CEOs whose pay exceeded the shareholder advisory vote (%), 2015–2023
const voteAgainstValues = [7, 8, 9, 11, 12, 8, 10, 14, 16];

const ceoPaySeries: Series[] = [
  {
    id: 'ceo-pay',
    label: 'FTSE 100 median CEO pay (£m)',
    colour: '#E63946',
    data: ceoPayValues.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
];

const ratioSeries: Series[] = [
  {
    id: 'pay-ratio',
    label: 'CEO to median worker pay ratio',
    colour: '#264653',
    data: payRatioValues.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
];

const payAnnotations: Annotation[] = [
  { date: new Date(2020, 0, 1), label: '2020: COVID — some CEO pay cuts' },
  { date: new Date(2019, 0, 1), label: '2019: Pay ratio reporting begins' },
];

const editorialRefs: Reference[] = [
  { num: 1, name: 'High Pay Centre', dataset: 'FTSE 100 CEO pay analysis', url: 'https://highpaycentre.org/ftse-100-ceo-pay-analysis/', date: '2023' },
  { num: 2, name: 'High Pay Centre / CIPD', dataset: 'Executive pay and the workforce', url: 'https://highpaycentre.org/', date: '2023' },
  { num: 3, name: 'Investment Association', dataset: 'Shareholder voting analysis', date: '2023' },
];

export default function ExecutivePayPage() {
  return (
    <>
      <TopicNav topic="Executive Pay" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Executive Pay"
          question="How Much Are FTSE 100 CEOs Actually Paid?"
          finding="The median FTSE 100 CEO earned £4.4 million in 2023 — 139 times the median UK worker. Pay ratios have risen for four consecutive years since the COVID dip. Mandatory pay ratio reporting, introduced in 2019, has not restrained the gap."
          colour="#E63946"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The median total remuneration package for a FTSE 100 chief executive reached £4.4 million in 2023 — the highest since records began, and 139 times the median UK full-time worker's pay.<Cite nums={1} /> This ratio — measured across all FTSE 100 companies since mandatory pay ratio reporting was introduced in 2019 — has risen every year since the COVID-19 dip in 2020<Cite nums={2} />, when some executives voluntarily cut their pay. Long-term incentive plans (LTIPs) dominate executive pay: basic salary typically accounts for only 20–30% of total remuneration, with the remainder made up of bonuses, LTIPs, and pension contributions.<Cite nums={1} /> LTIP vesting is tied to share price and earnings metrics, meaning pay packages are sensitive to stock market cycles rather than operational performance relative to workers.</p>
            <p>The High Pay Centre's analysis consistently shows that most FTSE 100 CEOs are not recruited from a competitive global market — the vast majority are UK or European nationals, contradicting the 'global talent war' justification for high packages.<Cite nums={1} /> Shareholder advisory votes against executive pay resolutions have risen from 7% in 2015 to 16% in 2023<Cite nums={3} />, suggesting growing investor discomfort. The Investment Association maintains a public register of companies receiving 20% or more votes against pay resolutions. But advisory votes are non-binding, and the Remuneration Committee members who set pay are typically drawn from the same executive networks. The Investment Association register shows the same companies appearing repeatedly without significant change.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'CEO pay' },
          { id: 'sec-chart2', label: 'Pay ratio' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Median FTSE 100 CEO pay"
              value="£4.4m"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Up from £3.5m in 2015 · highest on record"
              sparklineData={[3.5, 3.7, 3.9, 3.8, 4.0, 3.2, 3.8, 4.1, 4.4]}
              source="High Pay Centre · FTSE 100 CEO Pay 2023"
              href="#sec-chart1"
            />
            <MetricCard
              label="CEO to median worker pay ratio"
              value="139x"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Up from 120x in 2015 · mandatory reporting since 2019"
              sparklineData={[120, 128, 132, 130, 135, 110, 125, 132, 139]}
              source="High Pay Centre / CIPD · Pay ratio analysis 2023"
              href="#sec-chart2"
            />
            <MetricCard
              label="Shareholder votes against pay"
              value="16%"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Rising investor dissatisfaction · votes are advisory, non-binding"
              sparklineData={[7, 8, 9, 11, 12, 8, 10, 14, 16]}
              source="Investment Association · Shareholder voting analysis 2023"
              href="#sec-chart1"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Median FTSE 100 CEO total remuneration, 2015–2023"
              subtitle="Total pay including salary, bonuses, long-term incentive plans, and pension contributions. Fell in 2020 due to COVID; recovered to record levels by 2023."
              series={ceoPaySeries}
              annotations={payAnnotations}
              yLabel="Total pay (£m)"
              source={{ name: 'High Pay Centre', dataset: 'FTSE 100 CEO pay analysis', url: 'https://highpaycentre.org/ftse-100-ceo-pay-analysis/', frequency: 'annual', date: '2023' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="CEO to median worker pay ratio, FTSE 100, 2015–2023"
              subtitle="Ratio of median FTSE 100 CEO total remuneration to median UK full-time worker earnings. Ratio has risen since 2020 COVID dip."
              series={ratioSeries}
              annotations={[{ date: new Date(2019, 0, 1), label: '2019: Mandatory pay ratio reporting begins' }]}
              yLabel="Pay ratio (CEO : median worker)"
              source={{ name: 'High Pay Centre / CIPD', dataset: 'Executive pay and the workforce', url: 'https://highpaycentre.org/', frequency: 'annual', date: '2023' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Pay ratio reporting covers 900 listed companies since 2019"
            value="900+"
            description="Since January 2019, UK-listed companies with more than 250 employees must publish their CEO-to-median, CEO-to-25th-percentile, and CEO-to-75th-percentile pay ratios annually. This applies to around 900 companies. The High Pay Centre and CIPD publish annual analyses of these reports. Evidence from the US — where executive pay ratios have been required since 2018 — suggests disclosure alone has not compressed ratios, but has increased reputational pressure and investor engagement. Some large companies have voluntarily committed to 'fair pay' frameworks linking executive pay increases to workforce pay growth."
            source="Source: High Pay Centre — FTSE 100 CEO Pay 2023. CIPD — Executive Pay and the Workforce 2023."
          />
        </ScrollReveal>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://highpaycentre.org/ftse-100-ceo-pay-analysis/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">High Pay Centre — FTSE 100 CEO pay analysis</a> — annual analysis of total CEO remuneration and pay ratios.</p>
            <p><a href="https://www.cipd.org/uk/knowledge/reports/executive-pay-workforce/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">CIPD — Executive pay and the workforce</a> — annual survey of pay ratio reporting under the 2019 regulations.</p>
            <p>CEO pay figures are total remuneration (salary + bonus + LTIPs + pension) for the median-paid FTSE 100 CEO in the relevant financial year. Pay ratio is calculated against ONS median full-time weekly earnings (ASHE).</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
