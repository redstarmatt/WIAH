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

// Estimated gig economy workers (millions), UK, 2015–2024
const gigWorkerValues = [1.3, 1.6, 2.0, 2.4, 2.8, 3.2, 3.6, 4.0, 4.4, 4.7, 5.0];

// Zero-hours contracts (thousands), 2015–2024
const zeroHoursValues = [740, 780, 830, 870, 910, 960, 1010, 1020, 1040, 1070, 1100];

// Self-employed without sick pay or holiday pay (millions), 2015–2024
const noSickPayValues = [3.8, 3.9, 4.0, 4.1, 4.2, 4.3, 4.4, 4.3, 4.2, 4.3, 4.4];

const series1: Series[] = [
  {
    id: 'gig-workers',
    label: 'Gig economy workers (millions)',
    colour: '#E63946',
    data: gigWorkerValues.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
  {
    id: 'no-sick-pay',
    label: 'Self-employed without sick pay (millions)',
    colour: '#6B7280',
    data: noSickPayValues.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
];

const series2: Series[] = [
  {
    id: 'zero-hours',
    label: 'Zero-hours contracts (thousands)',
    colour: '#264653',
    data: zeroHoursValues.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
];

const annotations: Annotation[] = [
  { date: new Date(2017, 0, 1), label: '2017: Taylor Review published' },
  { date: new Date(2021, 1, 1), label: '2021: Supreme Court Uber ruling' },
];

const editorialRefs: Reference[] = [
  { num: 1, name: 'ONS', dataset: 'Labour Force Survey — Employment and labour market', url: 'https://www.ons.gov.uk/employmentandlabourmarket', date: '2024' },
  { num: 2, name: 'CIPD', dataset: 'Flexible and hybrid working practices survey', url: 'https://www.cipd.org/uk/knowledge/reports/', date: '2023' },
  { num: 3, name: 'TUC', dataset: 'Insecure work and the gig economy', url: 'https://www.tuc.org.uk/research-analysis/reports/', date: '2024' },
  { num: 4, name: 'BEIS', dataset: 'Trade union and labour market statistics', url: 'https://www.gov.uk/government/statistics/trade-union-statistics-2023', date: '2024' },
];

export default function GigEconomyRightsPage() {
  return (
    <>
      <TopicNav topic="Gig Economy Rights" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Gig Economy Rights"
          question="Do Gig Workers Actually Have Rights?"
          finding="An estimated 5 million people now work in the UK gig economy, most classified as self-employed with no entitlement to sick pay, holiday pay, or pension contributions. The Supreme Court's landmark Uber ruling in 2021 has been largely unenforced across the wider sector."
          colour="#6B7280"
          preposition="for"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The UK gig economy has grown from an estimated 1.3 million workers in 2015 to approximately 5 million in 2024, encompassing delivery riders, private hire drivers, freelance care workers, and platform-based cleaners, tutors, and tradespeople.<Cite nums={1} /> The vast majority are classified by platforms as "independent contractors" or "self-employed", placing them outside the scope of core employment protections. They receive no statutory sick pay, no paid holiday, no employer pension contributions, and no protection against unfair dismissal. The TUC estimates that 3.6 million gig workers are in "insecure work" with unpredictable hours and income, and that the average gig worker earns below the National Living Wage once waiting time and expenses are included.<Cite nums={3} /></p>
            <p>The legal landscape shifted in February 2021 when the Supreme Court ruled unanimously in Uber v Aslam that Uber drivers are "workers" — not self-employed — and are entitled to minimum wage, paid holiday, and rest breaks. However, the ruling's impact has been limited. Uber reclassified its UK drivers but other major platforms have not followed suit, maintaining that their operating models are sufficiently different. The promised Employment Bill, which would have established a single enforcement body and clarified worker status, was delayed throughout the 2019–2024 Parliament and eventually dropped. Zero-hours contracts, which peaked at 1.1 million in 2024, remain a parallel feature of the UK's insecure work landscape.<Cite nums={2} /> The CIPD has found that while some workers value the flexibility of gig work, a majority would prefer guaranteed hours and employment rights if given the choice.<Cite nums={2} /></p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Gig workers' },
          { id: 'sec-chart2', label: 'Zero-hours contracts' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Gig economy workers (UK)"
              value="~5M"
              unit="2024"
              direction="up"
              polarity="up-is-bad"
              changeText="up from 1.3M in 2015 · most without basic employment rights"
              sparklineData={gigWorkerValues.slice(-8)}
              source="ONS — Labour Force Survey 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Zero-hours contracts"
              value="1.1M"
              unit="2024"
              direction="up"
              polarity="up-is-bad"
              changeText="up from 740k in 2015 · disproportionately young and female workers"
              sparklineData={zeroHoursValues.slice(-8).map(v => v / 100)}
              source="ONS — Labour Force Survey 2024"
              href="#sec-chart2"
            />
            <MetricCard
              label="Workers without sick pay"
              value="4.4M"
              unit="self-employed, 2024"
              direction="up"
              polarity="up-is-bad"
              changeText="no statutory sick pay for self-employed · exposed during COVID-19"
              sparklineData={noSickPayValues.slice(-8)}
              source="TUC — Insecure work report 2024"
              href="#sec-chart1"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Gig economy growth and workers without sick pay, UK, 2015–2024"
              subtitle="Estimated gig economy workers (red) and total self-employed without statutory sick pay entitlement (grey). Gig economy definition includes all platform-mediated work."
              series={series1}
              annotations={annotations}
              yLabel="Workers (millions)"
              source={{ name: 'ONS', dataset: 'Labour Force Survey', url: 'https://www.ons.gov.uk/employmentandlabourmarket', frequency: 'quarterly', date: 'Dec 2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Zero-hours contracts, UK, 2015–2024"
              subtitle="Number of people reporting their main employment as a zero-hours contract. ONS Labour Force Survey measure — likely an undercount as some workers may not recognise the term."
              series={series2}
              annotations={[{ date: new Date(2020, 2, 1), label: '2020: Pandemic exposes insecurity' }]}
              yLabel="Contracts (thousands)"
              source={{ name: 'ONS', dataset: 'Labour Force Survey — Zero-hours contracts', url: 'https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/earningsandworkinghours/articles/contractsthatdonotguaranteeaminimumnumberofhours/latest', frequency: 'quarterly', date: 'Dec 2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Uber v Aslam: a landmark, if limited, ruling"
            value="Unanimous"
            unit="Supreme Court decision"
            description="In February 2021, the UK Supreme Court ruled unanimously that Uber drivers are 'workers' entitled to minimum wage, paid holiday, and rest breaks — rejecting Uber's argument that drivers were self-employed contractors. The ruling established that the degree of control exercised by a platform over its workers, not the contractual label, determines employment status. Uber subsequently reclassified its 70,000 UK drivers and began providing minimum wage guarantees and holiday pay. While other platforms have resisted applying the same logic, the legal precedent stands as the clearest judicial statement that gig workers are not simply entrepreneurs running their own businesses."
            source="Source: Supreme Court — Uber BV v Aslam [2021] UKSC 5. Uber UK policy changes, March 2021."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.ons.gov.uk/employmentandlabourmarket" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ONS — Labour Force Survey</a> — primary source for zero-hours contract numbers and self-employment figures. Quarterly household survey of approximately 80,000 individuals.</p>
            <p><a href="https://www.tuc.org.uk/research-analysis/reports/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">TUC — Insecure work reports</a> — analysis of gig economy scale, earnings, and employment rights gaps. Combines LFS data with commissioned polling.</p>
            <p><a href="https://www.cipd.org/uk/knowledge/reports/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">CIPD — Flexible working surveys</a> — employer and worker perspectives on gig work, zero-hours contracts, and preferences for flexibility vs security.</p>
            <p>Gig economy worker estimates vary significantly depending on definition. Our figure of 5 million uses a broad definition including all platform-mediated work. Narrower definitions focusing on primary employment yield lower figures. Zero-hours contract data relies on worker self-identification and is likely an undercount.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
