'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import PositiveCallout from '@/components/PositiveCallout';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

// Community belonging %, 2016–2024 (MHCLG Community Life Survey)
const belongingValues = [65, 64, 64, 65, 63, 62, 60, 59, 59];

// Trust across different backgrounds %, 2016–2024
const trustValues = [76, 75, 75, 75, 74, 74, 74, 74, 73];

const series1: Series[] = [
  {
    id: 'belonging',
    label: 'Community belonging (%)',
    colour: '#6B7280',
    data: belongingValues.map((v, i) => ({ date: new Date(2016 + i, 0, 1), value: v })),
  },
  {
    id: 'trust',
    label: 'Trust across backgrounds (%)',
    colour: '#264653',
    data: trustValues.map((v, i) => ({ date: new Date(2016 + i, 0, 1), value: v })),
  },
];

// Belonging by deprivation quintile, 2024
const deprivationValues = [70, 65, 62, 58, 55];

const series2: Series[] = [
  {
    id: 'most-deprived',
    label: 'Most deprived quintile (%)',
    colour: '#E63946',
    data: [60, 59, 59, 58, 57, 57, 56, 56, 55].map((v, i) => ({ date: new Date(2016 + i, 0, 1), value: v })),
  },
  {
    id: 'least-deprived',
    label: 'Least deprived quintile (%)',
    colour: '#2A9D8F',
    data: [72, 71, 72, 73, 71, 71, 70, 70, 70].map((v, i) => ({ date: new Date(2016 + i, 0, 1), value: v })),
  },
];

const annotations1: Annotation[] = [
  { date: new Date(2020, 0, 1), label: '2020: COVID-19 pandemic' },
  { date: new Date(2016, 5, 1), label: '2016: Brexit referendum' },
];

const annotations2: Annotation[] = [];

export default function CommunityCohesionSurveyPage() {
  return (
    <>
      <TopicNav topic="Community Cohesion" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Community Cohesion"
          question="Do Communities Trust Each Other?"
          finding="59% of people feel their local community belongs together — a figure that has fallen 6 percentage points since 2016 and varies sharply by deprivation."
          colour="#6B7280"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Community belonging — the sense that people in an area belong together — has fallen from 65% of adults in 2016 to 59% in 2024, with a sharp dip during and after the pandemic. The deprivation gradient is stark: in the wealthiest local authority areas, belonging typically registers at 70% or above; in the most deprived areas it falls to around 55%, a 15 percentage-point gap. Deprivation predicts low cohesion more strongly than diversity or population density, because it correlates with reduced social trust, high residential turnover, and weaker civic infrastructure. Trust between people of different backgrounds has remained relatively stable at around 74%, but is substantially lower in areas where different groups have limited everyday contact.</p>
            <p>Political polarisation — Brexit, immigration, and cost-of-living debates — has sustained high-temperature public discourse that affects willingness to engage across difference in shared spaces. Cohesion programmes run by local authorities and voluntary organisations are typically underfunded, short-term, and difficult to evaluate. The Levelling Up agenda included cohesion rhetoric without sustained investment in the libraries, youth centres, parks, and civic spaces that cohesion actually depends on. Where community infrastructure has been cut most deeply — disproportionately in deprived areas — the conditions under which belonging is built have eroded furthest.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Cohesion Trends' },
          { id: 'sec-chart2', label: 'Deprivation Gap' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Community belonging"
              value="59%"
              unit=""
              direction="down"
              polarity="up-is-good"
              changeText="-6pp since 2016 · polarisation and inequality"
              sparklineData={[65, 64, 64, 65, 63, 60, 59, 59]}
              source="MHCLG — Community Life Survey 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Trust across backgrounds"
              value="73%"
              unit=""
              direction="down"
              polarity="up-is-good"
              changeText="-3pp since 2016 · lower in deprived areas"
              sparklineData={[76, 75, 75, 74, 74, 74, 74, 73]}
              source="MHCLG — Community Life Survey 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Deprivation belonging gap"
              value="15pp"
              unit=""
              direction="flat"
              polarity="up-is-bad"
              changeText="most deprived areas 15pp below wealthiest"
              sparklineData={[12, 13, 13, 14, 14, 15, 15, 15]}
              source="MHCLG — Community Life Survey analysis 2024"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Community cohesion indicators, England, 2016–2024"
              subtitle="Percentage of adults feeling their community has a sense of belonging and trusting people from different backgrounds."
              series={series1}
              annotations={annotations1}
              yLabel="Percentage (%)"
              source={{ name: 'MHCLG', dataset: 'Community Life Survey', url: 'https://www.gov.uk/government/collections/community-life-survey', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Community belonging by deprivation level, England, 2016–2024"
              subtitle="Belonging rates in the most and least deprived quintile of local authorities. The gap has widened as civic infrastructure has been cut in poorer areas."
              series={series2}
              annotations={annotations2}
              yLabel="Belonging (%)"
              source={{ name: 'MHCLG', dataset: 'Community Life Survey — IMD quintile analysis', url: 'https://www.gov.uk/government/collections/community-life-survey', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Local anchor institutions building cohesion"
            value="74%"
            unit="trust across backgrounds"
            description="Trust between people of different backgrounds has remained broadly stable despite a difficult political environment, suggesting that everyday community contact in schools, workplaces, and local services continues to support cohesion. Areas with sustained investment in libraries, parks, and youth services show stronger belonging scores, providing a policy model for targeted civic infrastructure investment."
            source="Source: MHCLG — Community Life Survey 2024. IPPR — Divided and Connected, 2023."
          />
        </ScrollReveal>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.gov.uk/government/collections/community-life-survey" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">MHCLG — Community Life Survey</a> — annual household survey of civic participation and cohesion indicators.</p>
            <p><a href="https://ippr.org/research/publications" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">IPPR — Divided and Connected: Community Cohesion in Britain</a> — research on deprivation and cohesion.</p>
            <p>Community belonging measure: percentage agreeing their area has a sense of community. Trust: percentage agreeing people in the area can be trusted. Deprivation gap derived from Index of Multiple Deprivation quintile analysis of Community Life Survey microdata.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
