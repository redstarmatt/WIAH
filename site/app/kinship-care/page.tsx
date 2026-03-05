'use client'

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';

// ── Types ────────────────────────────────────────────────────────────────────

interface KinshipCareData {
  kinshipPopulation: Array<{ year: number; childrenThousands: number }>;
  supportRate: Array<{ year: number; pctReceivingSupport: number }>;
  metadata: {
    sources: { name: string; dataset: string; url: string; frequency: string }[];
    methodology: string;
    knownIssues: string[];
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function KinshipCarePage() {
  const [data, setData] = useState<KinshipCareData | null>(null);

  useEffect(() => {
    fetch('/data/kinship-care/kinship_care.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const populationSeries: Series[] = data
    ? [{
        id: 'kinship-children',
        label: 'Children in kinship care',
        colour: '#264653',
        data: data.kinshipPopulation.map(d => ({
          date: yearToDate(d.year),
          value: d.childrenThousands,
        })),
      }]
    : [];

  const supportSeries: Series[] = data
    ? [{
        id: 'support-rate',
        label: 'Kinship carers receiving financial support',
        colour: '#E63946',
        data: data.supportRate.map(d => ({
          date: yearToDate(d.year),
          value: d.pctReceivingSupport,
        })),
      }]
    : [];

  return (
    <>
      <TopicNav topic="Kinship Care" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Kinship Care"
          question="Who Steps In When Parents Can&apos;t?"
          finding="An estimated 162,000 children in the UK are being raised by grandparents, aunts, uncles, and other relatives &mdash; yet 69% of kinship carers receive no financial support from their local authority. The number has risen 26% since 2019, driven by rising child protection referrals and a severe shortage of foster carers."
          colour="#264653"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              An estimated 162,000 children in the UK are being raised by relatives &mdash; typically grandparents &mdash; through formal Special Guardianship Orders (SGOs) or informal family agreements, with the true figure potentially closer to 200,000. SGO applications rose 48&percnt; between 2018 and 2023 as children&apos;s services sought alternatives to foster care. Kinship care saves local authorities an estimated &pound;4.4 billion annually compared with equivalent foster placements, yet 69&percnt; of kinship carers receive no financial support from their local authority and carers receive on average &pound;80 per week less than foster carers for the same-age child. The Kinship Care Act 2024 was the first dedicated legislation for kinship carers, requiring local authorities to publish strategies and extending Pupil Premium eligibility to kinship children, but stopped short of the financial parity recommended by the MacAlister review.
            </p>
            <p>
              The burden falls disproportionately on grandmothers: 75&percnt; of primary kinship carers are female, with a median age of 56; 42&percnt; report a significant drop in household income and 38&percnt; have fallen behind on bills or taken on debt. Black and mixed-heritage children are over-represented &mdash; 18&percnt; of kinship children are from Black backgrounds compared with 6&percnt; of all children nationally &mdash; reflecting patterns of systemic over-surveillance of Black families by children&apos;s social care. Carers in the most deprived areas are least likely to receive a kinship carer assessment, creating a postcode lottery in support at the point when families are most financially stretched.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Overview' },
          { id: 'sec-population', label: 'Population' },
          { id: 'sec-support', label: 'Support' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Children in kinship care"
              value="162K"
              direction="up"
              polarity="up-is-bad"
              changeText="Up 26&percnt; since 2019 &middot; 48&percnt; rise in SGO applications since 2018"
              sparklineData={[128, 132, 137, 141, 146, 150, 154, 158, 162]}
              source="DfE &middot; Children Looked After 2023"
              href="#sec-population"/>
            <MetricCard
              label="Kinship carers receiving financial support"
              value="31%"
              direction="down"
              polarity="up-is-good"
              changeText="Down from 45&percnt; in 2015 &middot; 69&percnt; receive no local authority support"
              sparklineData={[45, 43, 41, 39, 38, 36, 34, 32, 31]}
              source="Kinship &middot; State of the Nation 2023"
              href="#sec-support"/>
            <MetricCard
              label="Savings to the state"
              value="&pound;4.4bn"
              unit="/year"
              direction="up"
              polarity="up-is-good"
              changeText="Kinship care saves &pound;4.4bn annually vs equivalent foster placements"
              sparklineData={[3.2, 3.4, 3.6, 3.8, 4.0, 4.2, 4.4]}
              source="Kinship &middot; Cost-Benefit Analysis 2023"
              href="#sec-support"/>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-population" className="mb-12">
            {populationSeries.length > 0 ? (
              <LineChart
                title="Children in kinship care, England, 2015&ndash;2023"
                subtitle="Estimated number of children being raised by relatives (thousands). Includes formal SGO, Child Arrangements Order, and estimated informal arrangements."
                series={populationSeries}
                yLabel="Children (thousands)"
                source={{
                  name: 'DfE / Kinship',
                  dataset: 'Children Looked After &amp; State of the Nation Survey',
                  frequency: 'annual',
                  url: 'https://explore-education-statistics.service.gov.uk/find-statistics/children-looked-after-in-england-including-adoptions',
                }}
              />
            ) : (
              <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
            )}
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-support" className="mb-12">
            {supportSeries.length > 0 ? (
              <LineChart
                title="Kinship carers receiving financial support, 2015&ndash;2023"
                subtitle="Percentage of kinship carers receiving any financial allowance from their local authority. The majority receive no support."
                series={supportSeries}
                yLabel="Percentage (%)"
                source={{
                  name: 'Kinship',
                  dataset: 'State of the Nation Survey',
                  frequency: 'annual',
                  url: 'https://kinship.org.uk/state-of-the-nation',
                }}
              />
            ) : (
              <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
            )}
          </section>
        </ScrollReveal>

        {/* Sources */}
        <section className="border-t border-wiah-border pt-8 mt-12">
          <h2 className="text-lg font-bold text-wiah-black mb-4">Sources &amp; methodology</h2>
          <div className="text-sm text-wiah-mid space-y-2">
            {data?.metadata.sources.map((src, i) => (
              <p key={i}>
                <strong>{src.name}.</strong> <em>{src.dataset}</em>. {src.frequency} &mdash;&nbsp;
                <a href={src.url} target="_blank" rel="noopener noreferrer" className="underline text-wiah-blue hover:no-underline">
                  {src.url}
                </a>
              </p>
            ))}
          </div>
          <p className="text-sm text-wiah-mid mt-6">{data?.metadata.methodology}</p>
          {data?.metadata.knownIssues && data.metadata.knownIssues.length > 0 && (
            <div className="mt-6 p-4 bg-wiah-light rounded">
              <p className="font-bold text-wiah-black mb-2">Known issues:</p>
              <ul className="text-sm text-wiah-mid space-y-1 list-disc list-inside">
                {data.metadata.knownIssues.map((issue, i) => (
                  <li key={i}>{issue}</li>
                ))}
              </ul>
            </div>
          )}
        </section>
      </main>
    </>
  );
}
