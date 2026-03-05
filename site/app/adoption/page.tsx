'use client'

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';

// ── Types ────────────────────────────────────────────────────────────────────

interface AdoptionData {
  adoptionOrders: Array<{ year: number; orders: number }>;
  averageWaitDays: Array<{ year: number; days: number }>;
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

export default function AdoptionPage() {
  const [data, setData] = useState<AdoptionData | null>(null);

  useEffect(() => {
    fetch('/data/adoption/adoption.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const ordersSeries: Series[] = data
    ? [{
        id: 'adoption-orders',
        label: 'Adoption orders granted',
        colour: '#2A9D8F',
        data: data.adoptionOrders.map(d => ({
          date: yearToDate(d.year),
          value: d.orders,
        })),
      }]
    : [];

  const waitSeries: Series[] = data
    ? [{
        id: 'average-wait',
        label: 'Average wait (days)',
        colour: '#E63946',
        data: data.averageWaitDays.map(d => ({
          date: yearToDate(d.year),
          value: d.days,
        })),
      }]
    : [];

  return (
    <>
      <TopicNav topic="Adoption" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Adoption"
          question="Why Are Fewer Children Being Adopted?"
          finding="Adoption orders in England have fallen 45% since their 2015 peak, from 5,360 to 2,950 in 2023. Children who are adopted wait an average of 538 days from entering care to their Adoption Order &mdash; nearly 18 months &mdash; and children from Black and minority ethnic backgrounds wait significantly longer."
          colour="#2A9D8F"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              Adoption from care in England has fallen 45% since its 2015 peak of 5,360 orders, reaching 2,950 in 2023. Part of this is deliberate: the Children and Social Work Act 2017 strengthened requirements to consider kinship care and Special Guardianship Orders first, and SGOs rose from 3,530 to 4,480 over the same period. But real capacity constraints also apply &mdash; a shrinking pool of approved adopters, lengthening matching processes, and growing complexity of children&apos;s needs. Delay is the defining challenge: the government target for the average time from entering care to adoption is 426 days, but the actual average in 2023 was 538 days and rising, with children aged five and over waiting more than 800 days. Court care proceedings meet the 26-week target in only 42% of cases. Post-adoption support through the Adoption Support Fund is capped at &pound;5,000 per child per year, a figure not uprated for inflation, and 65% of adoptive families have sought mental health support for their child but only 38% received it in a timely way.
            </p>
            <p>
              Inequality runs through every stage of the adoption process. Black children wait on average 18 months longer than white children from placement order to match, and mixed-heritage children face similar delays. Children aged five and over, sibling groups of three or more, and children with disabilities are the hardest to place &mdash; just 14% of 2023 adoptions involved children aged five or older despite that age group making up 52% of those waiting, and sibling groups of three or more represent 6% of waiting children but only 2% of placements. Post-adoption outcomes including educational attainment, mental health, and placement stability are not systematically tracked nationally, leaving the long-term effectiveness of adoption as a permanence route largely unmeasured.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Overview' },
          { id: 'sec-orders', label: 'Adoption Orders' },
          { id: 'sec-wait', label: 'Wait Times' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Adoption orders (England)"
              value="2,950"
              direction="down"
              polarity="up-is-good"
              changeText="Down 45% from 5,360 peak in 2015 &middot; Some shift to SGOs"
              sparklineData={[5360, 4690, 4350, 3820, 3570, 3440, 2870, 2960, 2950]}
              source="DfE &middot; Children Looked After 2023"
              onExpand={() => {}}
            />
            <MetricCard
              label="Average wait (care to adoption)"
              value="538 days"
              direction="up"
              polarity="up-is-bad"
              changeText="Target: 426 days &middot; Children aged 5+ wait 800+ days"
              sparklineData={[487, 498, 506, 512, 520, 558, 574, 546, 538]}
              source="DfE &middot; Adoption Scorecard 2023"
              onExpand={() => {}}
            />
            <MetricCard
              label="Adoptive families needing support"
              value="65%"
              direction="up"
              polarity="up-is-bad"
              changeText="65% sought mental health support &middot; Only 38% received it timely"
              sparklineData={[52, 55, 58, 60, 62, 63, 64, 65]}
              source="Adoption UK &middot; Barometer 2023"
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-orders" className="mb-12">
            {ordersSeries.length > 0 ? (
              <LineChart
                title="Adoption orders granted, England, 2015&ndash;2023"
                subtitle="Number of Adoption Orders granted per year. The decline partly reflects a deliberate shift toward kinship care and Special Guardianship Orders."
                series={ordersSeries}
                yLabel="Adoption orders"
                source={{
                  name: 'DfE',
                  dataset: 'Children Looked After in England',
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
          <section id="sec-wait" className="mb-12">
            {waitSeries.length > 0 ? (
              <LineChart
                title="Average wait from entering care to Adoption Order, 2015&ndash;2023"
                subtitle="Median days from a child entering local authority care to the date of the Adoption Order. Target is 426 days."
                series={waitSeries}
                yLabel="Days"
                source={{
                  name: 'DfE',
                  dataset: 'Adoption Scorecard',
                  frequency: 'annual',
                  url: 'https://www.gov.uk/government/publications/adoption-scorecard',
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
