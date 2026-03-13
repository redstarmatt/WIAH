'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import PositiveCallout from '@/components/PositiveCallout';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

// One-year reoffending rates %, 2015–2023 (Ministry of Justice)
const communityReoffendingValues = [34, 33, 33, 33, 32, 32, 32, 32, 32];
const custodialReoffendingValues = [47, 47, 46, 46, 46, 45, 45, 45, 45];

// Community order completion rates %, 2015–2023
const completionValues = [65, 66, 66, 67, 67, 66, 67, 68, 68];

const series1: Series[] = [
  {
    id: 'community',
    label: 'Community sentence reoffending (%)',
    colour: '#2A9D8F',
    data: communityReoffendingValues.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
  {
    id: 'custodial',
    label: 'Short prison sentence reoffending (%)',
    colour: '#E63946',
    data: custodialReoffendingValues.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
];

const series2: Series[] = [
  {
    id: 'completion',
    label: 'Community order completion rate (%)',
    colour: '#264653',
    data: completionValues.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
];

const annotations1: Annotation[] = [
  { date: new Date(2017, 0, 1), label: '2017: Sentencing guidelines tightened' },
  { date: new Date(2020, 2, 1), label: '2020: COVID-19 court disruption' },
];

const annotations2: Annotation[] = [
  { date: new Date(2021, 0, 1), label: '2021: Probation service reunified' },
];

export default function CommunitySentenceOutcomesPage() {
  return (
    <>
      <TopicNav topic="Community Sentence Outcomes" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Justice"
          question="Do Community Sentences Actually Reduce Reoffending?"
          finding="People given community sentences reoffend at a rate of 32%, compared to 45% for those given short custodial sentences — a 13 percentage-point gap that has been stable for a decade."
          colour="#6B7280"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Ministry of Justice proven reoffending data shows consistently that one-year reoffending rates for community orders average around 32%, compared with approximately 45% for sentences under 12 months in custody — a 13 percentage-point gap that has been stable since 2015. Short prison sentences are too brief to deliver rehabilitation but long enough to sever employment, housing, and family ties that protect against reoffending, leaving people in a worse position on release. Community orders can attach conditions — unpaid work, drug treatment, alcohol monitoring, mental health treatment — while preserving those protective social ties. Completion rates improved to 68% in 2023, despite probation vacancy rates exceeding 20% in some regions.</p>
            <p>Despite the reoffending evidence, sentencing trends have moved against community orders over the past decade. Mandatory minimums, knife possession thresholds, and political pressure to appear tough on crime have all pushed toward longer custodial sentences. The 2017 revision of magistrates' sentencing guidelines moved custody to the default for certain offences where community-first had previously applied. The evidence for community sentences is strongest for low-level acquisitive crime driven by drug dependence; drug rehabilitation requirement completion is associated with significant reoffending reductions. The gap between what the evidence supports and what sentencing policy delivers continues to widen.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Reoffending Rates' },
          { id: 'sec-chart2', label: 'Completion Rates' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Community sentence reoffending"
              value="32%"
              unit=""
              direction="down"
              polarity="up-is-bad"
              changeText="down from 34% in 2015 · stable gap vs custody"
              sparklineData={[34, 33, 33, 33, 32, 32, 32, 32]}
              source="Ministry of Justice — Proven reoffending statistics 2023"
              href="#sec-chart1"
            />
            <MetricCard
              label="Short prison sentence reoffending"
              value="45%"
              unit=""
              direction="down"
              polarity="up-is-bad"
              changeText="down from 47% in 2015 · still 13pp above community"
              sparklineData={[47, 47, 46, 46, 46, 45, 45, 45]}
              source="Ministry of Justice — Proven reoffending statistics 2023"
              href="#sec-chart1"
            />
            <MetricCard
              label="Community orders completed"
              value="68%"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="successfully completed without breach · improving"
              sparklineData={[65, 66, 66, 67, 67, 66, 67, 68]}
              source="HMPPS — Community performance annual digest 2023"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Reoffending rates: community vs custodial sentences, 2015–2023"
              subtitle="One-year proven reoffending rates for community orders compared with sentences under 12 months in custody. The 13pp gap has remained consistent."
              series={series1}
              annotations={annotations1}
              yLabel="Reoffending rate (%)"
              source={{ name: 'Ministry of Justice', dataset: 'Proven Reoffending Statistics', url: 'https://www.gov.uk/government/collections/proven-reoffending-statistics', frequency: 'annual', date: '2023' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Community order completion rates, England and Wales, 2015–2023"
              subtitle="Percentage of community orders successfully completed without breach or revocation. Improved following probation service reunification in 2021."
              series={series2}
              annotations={annotations2}
              yLabel="Completion rate (%)"
              source={{ name: 'HMPPS', dataset: 'Community Performance Annual Digest', url: 'https://www.gov.uk/government/organisations/her-majestys-prison-and-probation-service', frequency: 'annual', date: '2023' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Community sentences: better outcomes at lower cost"
            value="32%"
            unit="reoffending rate vs 45% for short custody"
            description="Community sentences consistently outperform short custodial sentences on reoffending outcomes, at a fraction of the cost. A community order costs approximately £4,000 per year compared to £47,000 for a prison place. Drug rehabilitation requirements attached to community orders have the strongest evidence base, with completion associated with a 40–50% reduction in reoffending for drug-related crime. The reunification of probation in 2021 has improved completion rates and supervision quality."
            source="Source: Ministry of Justice — Proven Reoffending Statistics 2023. HMPPS — Community Performance Annual Digest 2023."
          />
        </ScrollReveal>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.gov.uk/government/collections/proven-reoffending-statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Ministry of Justice — Proven Reoffending Statistics</a> — annual one-year proven reoffending rates by sentence type.</p>
            <p><a href="https://www.gov.uk/government/organisations/her-majestys-prison-and-probation-service" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">HMPPS — Community Performance Annual Digest</a> — completion rates and supervision metrics. Published annually.</p>
            <p>Reoffending rate is the proportion of offenders committing at least one proven reoffence within a one-year follow-up period. Proven reoffending captures only recorded offences — actual reoffending is higher. Comparison between community and custodial groups does not constitute a randomised trial; selection effects apply.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
