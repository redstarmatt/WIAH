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
          finding="Adoption orders in England have fallen 45&percnt; since their 2015 peak, from 5,360 to 2,950 in 2023. Children who are adopted wait an average of 538 days from entering care to their Adoption Order &mdash; nearly 18 months &mdash; and children from Black and minority ethnic backgrounds wait significantly longer."
          colour="#2A9D8F"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              Adoption from care in England has been in sustained decline. The number of Adoption Orders granted peaked at 5,360 in 2015, driven by a push from the coalition government to increase adoption as a permanence option. By 2023, that figure had fallen to 2,950 &mdash; a 45&percnt; drop. The decline is partly by design: the Children and Social Work Act 2017 strengthened the requirement to consider kinship care and Special Guardianship Orders (SGOs) before adoption, and many children who would previously have been adopted are now placed with relatives under SGOs, which rose from 3,530 in 2015 to 4,480 in 2023. But the fall also reflects real capacity constraints &mdash; a shrinking pool of approved adopters, longer matching processes, and growing complexity of children&apos;s needs.
            </p>
            <p>
              Delay is the defining challenge. The government&apos;s target for the average time between a child entering care and being placed with adopters is 426 days (14 months). In 2023, the actual average was 538 days &mdash; nearly 18 months &mdash; and has been rising since 2019. For children aged five and over, the average wait exceeds 800 days. Court processes account for a significant portion of delay: the 26-week target for care proceedings introduced by the Children and Families Act 2014 is met in only 42&percnt; of cases, with the average now closer to 44 weeks. The pandemic created an acute backlog &mdash; 2,000 adoption orders were delayed by court closures in 2020&ndash;21 &mdash; and recovery has been slow.
            </p>
            <p>
              Post-adoption support is widely acknowledged as inadequate. The Adoption Support Fund, established in 2015, provides therapeutic services to adopted children and their families, with a cap of &pound;5,000 per child per year. Take-up has grown &mdash; 43,000 applications were made in 2022/23 &mdash; but the cap has not been uprated for inflation, and the Fund does not cover ongoing therapeutic parenting support or respite. Adoption UK&apos;s annual Barometer survey found that 65&percnt; of adoptive families had sought mental health support for their child, but only 38&percnt; had received it in a timely way. Adoption breakdown rates &mdash; where an adoption order is effectively reversed by the child entering care again &mdash; are not officially tracked nationally, though estimates range from 3&percnt; to 9&percnt; depending on the cohort studied.
            </p>
            <p>
              Ethnicity and age drive the deepest inequalities in adoption outcomes. Black children wait on average 18 months longer than white children from the point of a placement order to being matched with adopters. Mixed-heritage children face similar delays. The government removed the duty to give &ldquo;due consideration&rdquo; to ethnicity matching in 2014, intending to speed up placements, but the evidence on whether this accelerated timescales for minority ethnic children is mixed. Children aged five and over, sibling groups, and children with disabilities are the hardest to place: just 14&percnt; of children adopted in 2023 were aged five or older, compared with 52&percnt; of the waiting children in that age group. Sibling groups of three or more represent 6&percnt; of waiting children but just 2&percnt; of adoptive placements.
            </p>
            <p>
              Adoption statistics are among the better-quality datasets in children&apos;s social care, thanks to the Adoption Scorecard and DfE&apos;s Children Looked After returns. However, several gaps persist. Post-adoption outcomes &mdash; educational attainment, mental health, and placement stability after the Adoption Order &mdash; are not systematically tracked at a national level, meaning the long-term effectiveness of adoption as a permanence option cannot be rigorously evaluated. The shift toward SGOs creates a measurement challenge: some children counted as &ldquo;not adopted&rdquo; have achieved stable permanent homes through guardianship, making the raw adoption decline figure potentially misleading about overall permanence outcomes. Adoption disruption data (breakdowns after the order) is not centrally collected, meaning the true rate is unknown. International adoption data is not included in DfE figures and is tracked separately by the Home Office, with numbers too small for meaningful trend analysis.
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
              changeText="Down 45&percnt; from 5,360 peak in 2015 &middot; Some shift to SGOs"
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
              changeText="65&percnt; sought mental health support &middot; Only 38&percnt; received it timely"
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
