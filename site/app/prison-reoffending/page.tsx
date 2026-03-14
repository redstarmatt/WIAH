'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'Ministry of Justice', dataset: 'Proven Reoffending Statistics Quarterly Bulletin', url: 'https://www.gov.uk/government/statistics/proven-reoffending-statistics-quarterly-bulletin-england-and-wales', date: '2024' },
  { num: 2, name: 'HM Treasury / MoJ', dataset: 'Cost of Reoffending Analysis', url: 'https://www.gov.uk/government/organisations/hm-treasury/about/statistics', date: '2023' },
  { num: 3, name: 'Howard League for Penal Reform', dataset: 'Reoffending Data Analysis', url: 'https://howardleague.org/', date: '2024' },
  { num: 4, name: 'Institute for Fiscal Studies', dataset: 'Short Custodial Sentences and Reoffending', url: 'https://ifs.org.uk/publications', date: '2023' },
  { num: 5, name: 'Ministry of Justice', dataset: 'What Works to Reduce Reoffending', url: 'https://www.gov.uk/government/organisations/ministry-of-justice/about/statistics', date: '2024' },
];

const reoffendingData = [26.4, 26.0, 25.6, 25.4, 25.6, 25.8, 26.0, 25.9, 25.7, 25.5, 25.3, 25.2, 25.1, 25.2, 25.0];
const reoffendingAnnotations: Annotation[] = [
  { date: new Date(2013, 0, 1), label: '2013: Transforming Rehabilitation' },
  { date: new Date(2015, 0, 1), label: '2015: Community Rehabilitation Companies' },
  { date: new Date(2021, 0, 1), label: '2021: Probation renationalised' },
];

const reoffendingSeries: Series[] = [
  {
    id: 'reoffending',
    label: 'Adult reoffending rate within 1 year (%)',
    colour: '#E63946',
    data: reoffendingData.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
  },
];

const byLengthData = {
  short: [64, 63, 62, 61, 60, 59, 59, 58, 58, 58],
  medium: [39, 38, 37, 37, 38, 38, 38, 37, 37, 36],
  long: [22, 21, 21, 20, 20, 21, 21, 20, 20, 19],
};

const sentenceLengthSeries: Series[] = [
  {
    id: 'short',
    label: 'Under 1 year (%)',
    colour: '#E63946',
    data: byLengthData.short.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
  {
    id: 'medium',
    label: '1–4 years (%)',
    colour: '#F4A261',
    data: byLengthData.medium.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
  {
    id: 'long',
    label: '4+ years (%)',
    colour: '#6B7280',
    data: byLengthData.long.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
];

export default function PrisonReoffendingPage() {
  return (
    <>
      <TopicNav topic="Prison Reoffending" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Prison Reoffending"
          question="Are Prisons Reducing Reoffending?"
          finding="25% of adults released from prison reoffend within a year — for those serving short sentences (under 1 year), reoffending is 58% — and prison is failing to break the cycle."
          colour="#E63946"
          preposition="on"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Key numbers' },
          { id: 'sec-trend', label: 'Reoffending trend' },
          { id: 'sec-sentence', label: 'By sentence length' },
        ]} />

        <section id="sec-metrics" className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Adult reoffending rate within 1 year (%)"
              value="25%"
              direction="flat"
              polarity="up-is-bad"
              changeText="2022/23 · Unchanged for a decade · 80,000 adults reoffend annually · Government target: 15% reduction"
              sparklineData={[26.0, 25.6, 25.4, 25.6, 25.3, 25.2, 25.0]}
              source="MoJ — Proven reoffending statistics, 2024"
            />
            <MetricCard
              label="Short sentence reoffending (under 1 year) (%)"
              value="58%"
              direction="down"
              polarity="up-is-bad"
              changeText="2022/23 · More than half reoffend · Disrupts housing, employment, family · Worse than no custody in many studies"
              sparklineData={[64, 62, 60, 59, 58, 58, 58]}
              source="MoJ — Proven reoffending statistics, 2024"
            />
            <MetricCard
              label="Annual cost of reoffending (£bn)"
              value="18"
              direction="up"
              polarity="up-is-bad"
              changeText="2023 estimate · MoJ/HM Treasury · Includes criminal justice, NHS, victim costs · Cost of reoffenders in prison: £4bn/yr"
              sparklineData={[15, 15, 16, 16, 17, 17, 18]}
              source="MoJ — Cost of reoffending analysis, 2023"
            />
          </div>
        </section>

        <ScrollReveal>
          <section id="sec-trend" className="mb-12">
            <LineChart
              title="Adult reoffending rate within 1 year, 2010–2024 (%)"
              subtitle="Percentage of adults released from prison or completing a community sentence who commit a proven reoffence within one year, England and Wales. The rate has barely moved in 15 years."
              series={reoffendingSeries}
              annotations={reoffendingAnnotations}
              yLabel="Reoffending rate (%)"
              source={{
                name: 'MoJ',
                dataset: 'Proven reoffending statistics quarterly bulletin',
                url: 'https://www.gov.uk/government/statistics/proven-reoffending-statistics-quarterly-bulletin-england-and-wales',
                frequency: 'quarterly',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-sentence" className="mb-12">
            <LineChart
              title="Reoffending rate by sentence length, 2015–2024 (%)"
              subtitle="Reoffending rates are dramatically higher for those serving short sentences (under 1 year). Short sentences disrupt housing, employment and family ties without providing enough time for rehabilitation."
              series={sentenceLengthSeries}
              yLabel="Reoffending rate (%)"
              source={{
                name: 'MoJ',
                dataset: 'Proven reoffending statistics — by sentence length',
                url: 'https://www.gov.uk/government/statistics/proven-reoffending-statistics-quarterly-bulletin-england-and-wales',
                frequency: 'quarterly',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The data on prison reoffending</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>25% of adults released from prison reoffend within a year — a figure that has barely moved for fifteen years despite significant policy changes, including the ill-fated privatisation of probation services in 2015 under Transforming Rehabilitation and its subsequent renationalisation in 2021.<Cite nums={1} /> Around 80,000 adults reoffend annually, generating an estimated £18 billion in annual costs to the criminal justice system, NHS, and victims.<Cite nums={2} /></p>
              <p>The failure of short sentences stands out starkly in the data. For people serving sentences of under one year — who make up around 40% of all prison releases — the reoffending rate is 58%.<Cite nums={1} /> Criminological research is fairly clear why: a short sentence is long enough to destroy a person's housing, employment, and family relationships, but not long enough to deliver meaningful rehabilitation, education, or treatment for substance misuse.<Cite nums={4} /> The evidence base for community sentences — particularly those with supervision and intensive support — is consistently better than for short custodial sentences for non-violent offenders.<Cite nums={5} /></p>
              <p>England and Wales has one of the highest incarceration rates in Western Europe — 150 per 100,000 population — yet reoffending rates are far higher than countries with similar or lower rates of imprisonment.<Cite nums={3} /> Scotland's approach, which has moved significantly toward diversion and community disposals for low-level offending since the Christie Commission in 2011, shows that a different approach is achievable within the UK.</p>
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="What works"
            value="8%"
            unit="reoffending rate for intensive community supervision programmes — vs 58% for short custodial sentences"
            description="Intensive supervision community alternatives (ISCA) — high-intensity community sentences combining supervision, treatment, and employment support — consistently outperform short custodial sentences on reoffending rates. The New Futures Network, which connects prisons with employers for employment on release, reduces reoffending among participants. Prison education, where prisoners complete qualifications, is strongly associated with lower reoffending. The Ministry of Justice's own analysis shows that stable accommodation on release is the single strongest predictor of not reoffending. None of this is new knowledge — implementation at scale is the challenge."
            source="Source: MoJ — Proven reoffending statistics 2024; MoJ — What Works to Reduce Reoffending."
          />
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p><a href="https://www.gov.uk/government/statistics/proven-reoffending-statistics-quarterly-bulletin-england-and-wales" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">MoJ — Proven reoffending statistics quarterly bulletin</a> — primary reoffending data. Updated quarterly.</p>
            <p>Reoffending rate defined as percentage of offenders with a proven reoffence within one year of release from custody or completion of a community sentence. "Proven" means a court conviction, caution, reprimand or warning.</p>
            <p>All figures are for England and Wales. Data typically has an 18-month lag from release cohort to publication.</p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
