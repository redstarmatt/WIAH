'use client'

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';

// ── Types ────────────────────────────────────────────────────────────────────

interface FosterCareData {
  fosterCarerHouseholds: Array<{ year: number; householdsThousands: number }>;
  placementBreakdowns: Array<{ year: number; pctBreakdown: number }>;
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

export default function FosterCarePage() {
  const [data, setData] = useState<FosterCareData | null>(null);

  useEffect(() => {
    fetch('/data/foster-care/foster_care.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const householdSeries: Series[] = data
    ? [{
        id: 'foster-households',
        label: 'Approved foster carer households',
        colour: '#264653',
        data: data.fosterCarerHouseholds.map(d => ({
          date: yearToDate(d.year),
          value: d.householdsThousands,
        })),
      }]
    : [];

  const breakdownSeries: Series[] = data
    ? [{
        id: 'placement-breakdowns',
        label: 'Children with 3+ placements in year',
        colour: '#E63946',
        data: data.placementBreakdowns.map(d => ({
          date: yearToDate(d.year),
          value: d.pctBreakdown,
        })),
      }]
    : [];

  return (
    <>
      <TopicNav topic="Foster Care" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Foster Care"
          question="Where Do the Children Go?"
          finding="England has lost over 5,000 foster carer households since 2015 &mdash; an 11% decline &mdash; while the number of children needing placements has risen. One in eight looked-after children now experiences three or more placement moves in a single year, and councils are spending &pound;1.6 billion annually on agency placements at two to three times the cost of in-house foster care."
          colour="#264653"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              England&apos;s foster care system is caught in a structural crisis of supply and demand. Around 72,000 children are looked after by local authorities &mdash; the highest number since the Children Act 1989 &mdash; yet approved fostering households fell from 45,500 in 2015 to 40,500 in 2023. Ofsted reports that 9,200 new fostering households were approved in 2022/23 but 9,800 ceased fostering in the same year: the system is losing carers faster than it recruits them. In 2023, 12.4% of looked-after children experienced three or more placement moves within the year, up from 9.2% in 2015. Rees Centre research demonstrates that each additional placement move reduces a child&apos;s GCSE attainment by the equivalent of half a grade. Local authorities spent &pound;1.6 billion on independent fostering agency placements in 2022/23 &mdash; up 35% in real terms since 2018 &mdash; because they cannot recruit enough in-house carers; IFA placements cost &pound;900&ndash;&pound;1,200 per week versus &pound;450&ndash;&pound;600 for council-recruited carers.
            </p>
            <p>
              The shortage hits some children harder than others. Teenagers aged 14&ndash;17 account for the largest group waiting for placements but foster carers disproportionately prefer younger children. Unaccompanied asylum-seeking children, around 5,500 in care in England, face particular placement difficulties due to language barriers, complex trauma, and the concentration of arrivals in south-east local authorities. Black children are over-represented in care at 25% of the looked-after population versus 6% of the child population. The government launched the Foster Carer Offer in 2023 including a &pound;2,000 retention payment and expanded training, but local authority representatives have described the investment as insufficient relative to the scale of the challenge.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Overview' },
          { id: 'sec-households', label: 'Carer Supply' },
          { id: 'sec-breakdowns', label: 'Placement Stability' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Foster carer households"
              value="40,500"
              direction="down"
              polarity="up-is-good"
              changeText="Down 11% since 2015 &middot; Net loss of 600 households in 2022/23"
              sparklineData={[45.5, 44.6, 44.2, 43.9, 43.5, 42.8, 42.1, 41.3, 40.5]}
              source="Ofsted &middot; Fostering in England 2023"
              onExpand={() => {}}
            />
            <MetricCard
              label="Children with 3+ placements/year"
              value="12.4%"
              direction="up"
              polarity="up-is-bad"
              changeText="Up from 9.2% in 2015 &middot; Each move reduces GCSE attainment"
              sparklineData={[9.2, 9.8, 10.1, 10.5, 10.9, 11.3, 11.6, 12.0, 12.4]}
              source="DfE &middot; Children Looked After 2023"
              onExpand={() => {}}
            />
            <MetricCard
              label="Spend on agency placements"
              value="&pound;1.6bn"
              unit="/year"
              direction="up"
              polarity="up-is-bad"
              changeText="Up 35% in real terms since 2018 &middot; 2&ndash;3&times; the cost of in-house care"
              sparklineData={[1.05, 1.12, 1.18, 1.24, 1.32, 1.41, 1.50, 1.60]}
              source="DfE &middot; Section 251 Returns 2023"
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-households" className="mb-12">
            {householdSeries.length > 0 ? (
              <LineChart
                title="Approved foster carer households, England, 2015&ndash;2023"
                subtitle="Households approved to foster at 31 March each year. The system is losing carers faster than it recruits them."
                series={householdSeries}
                yLabel="Households (thousands)"
                source={{
                  name: 'Ofsted',
                  dataset: 'Fostering in England',
                  frequency: 'annual',
                  url: 'https://www.gov.uk/government/statistics/fostering-in-england',
                }}
              />
            ) : (
              <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
            )}
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-breakdowns" className="mb-12">
            {breakdownSeries.length > 0 ? (
              <LineChart
                title="Placement instability: children with 3+ moves in year, 2015&ndash;2023"
                subtitle="Percentage of looked-after children experiencing three or more placement changes within the reporting year."
                series={breakdownSeries}
                yLabel="Percentage (%)"
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
