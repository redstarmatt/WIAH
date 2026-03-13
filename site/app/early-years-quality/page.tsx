'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import PositiveCallout from '@/components/PositiveCallout';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

// Good/Outstanding % 2015–2023 — Ofsted
const goodOutstandingValues = [82, 86, 89, 91, 92, 93, 94, 95, 96];

// Inadequate % 2015–2023 — Ofsted
const inadequateValues = [1.0, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.3];

const qualitySeries: Series[] = [
  {
    id: 'good-outstanding',
    label: 'Good or Outstanding (%)',
    colour: '#2A9D8F',
    data: goodOutstandingValues.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
  {
    id: 'inadequate',
    label: 'Inadequate (%)',
    colour: '#E63946',
    data: inadequateValues.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
];

const annotations: Annotation[] = [
  { date: new Date(2019, 0, 1), label: '2019: New Ofsted EIF framework' },
];

export default function EarlyYearsQualityPage() {
  return (
    <>
      <TopicNav topic="Early Years Quality" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Early Years Quality"
          question="Is Early Years Care Actually Good Quality?"
          finding="96% of nurseries and childminders are now rated Good or Outstanding by Ofsted — up from 82% in 2015. But 1.3 million children live in childcare deserts with too few local places."
          colour="#2A9D8F"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The quality of early years provision in England has improved substantially over the past decade. In 2015, 82% of nurseries and childminders were rated Good or Outstanding by Ofsted; by 2023, that figure had risen to 96%, driven by the Early Years Foundation Stage framework, improved workforce qualifications, and rigorous inspection. The proportion rated Inadequate has fallen from around 1% to just 0.3%. But quality and access are different problems: an estimated 1.3 million children under 5 live in childcare deserts — areas with fewer than a third of the places needed — concentrated in rural, coastal, and deprived urban communities where providers cannot sustain operations on government funding rates.</p>
            <p>More than 40% of nurseries reported operating at a loss on funded places in 2023, and over 4,000 childcare providers closed between 2021 and 2023. The early years workforce compounds this: childcare workers earn around £11–12 per hour on average, turnover is high, and the sector has an estimated 40,000 vacancies. Without adequate funding rates and improved workforce conditions, sustained quality improvement cannot reach the children who stand to benefit most — those in areas of greatest disadvantage.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Quality trend' },
          { id: 'sec-chart2', label: 'Second view' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Good/Outstanding nurseries"
              value="96%"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="Up from 82% in 2015 · near-universal quality"
              sparklineData={[82, 86, 89, 92, 94, 94, 95, 96]}
              source="Ofsted · Early Years Inspection Data 2023"
              href="#sec-chart1"
            />
            <MetricCard
              label="Inadequate settings"
              value="0.3%"
              unit=""
              direction="down"
              polarity="down-is-bad"
              changeText="Down from 1% in 2015 · sustained improvement"
              sparklineData={[1.0, 0.9, 0.8, 0.7, 0.6, 0.4, 0.3, 0.3]}
              source="Ofsted · Early Years Inspection Data 2023"
              href="#sec-chart1"
            />
            <MetricCard
              label="Children in childcare deserts"
              value="1.3M"
              unit=""
              direction="down"
              polarity="up-is-bad"
              changeText="Improving but significant geography gaps remain"
              sparklineData={[1.6, 1.55, 1.5, 1.45, 1.4, 1.38, 1.32, 1.3]}
              source="Coram Family and Childcare · Childcare Survey 2023"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Early years settings rated Good or Outstanding and Inadequate, England, 2015–2023"
              subtitle="Percentage at most recent Ofsted inspection. Good/Outstanding rose from 82% to 96%. Inadequate fell from 1% to 0.3%."
              series={qualitySeries}
              annotations={annotations}
              yLabel="Settings (%)"
              source={{ name: 'Ofsted', dataset: 'Early Years Annual Report / Management Information', url: 'https://www.gov.uk/government/collections/ofsted-annual-report', frequency: 'annual', date: '2023' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Good or Outstanding early years settings, England, 2015–2023"
              subtitle="Percentage of registered nurseries, pre-schools and childminders rated Good or Outstanding. Near-universal quality improvement across the sector."
              series={[{
                id: 'good-outstanding-only',
                label: 'Good or Outstanding (%)',
                colour: '#2A9D8F',
                data: goodOutstandingValues.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
              }]}
              annotations={[]}
              yLabel="Good or Outstanding (%)"
              source={{ name: 'Ofsted', dataset: 'Early Years Annual Report', url: 'https://www.gov.uk/government/collections/ofsted-annual-report', frequency: 'annual', date: '2023' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="96% of nurseries rated Good or Outstanding"
            value="96%"
            description="Early years quality has improved dramatically over the past decade. The proportion of nurseries and childminders rated Good or Outstanding by Ofsted has risen from 82% to 96% — transforming the quality of care for millions of young children. The proportion rated Inadequate has fallen from 1% to 0.3%, the lowest ever recorded. This improvement is driven by the Early Years Foundation Stage framework and more rigorous inspection."
            source="Source: Ofsted — Early Years Inspection Data, 2023."
          />
        </ScrollReveal>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.gov.uk/government/collections/ofsted-annual-report" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Ofsted — Early Years Annual Report</a> — inspection outcomes for all registered early years providers.</p>
            <p><a href="https://www.gov.uk/government/statistical-data-sets/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Ofsted — Management Information: early years providers</a> — monthly statistical release of registered provider and inspection outcome data.</p>
            <p><a href="https://www.coramfcc.org.uk/research-publications/uk-childcare-survey" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Coram Family and Childcare — Childcare Survey</a> — annual survey of childcare availability and affordability by local authority. Childcare desert definition: areas where places are fewer than one-third of the 0–4 child population.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
