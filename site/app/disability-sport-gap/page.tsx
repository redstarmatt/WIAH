'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

// ── Types ────────────────────────────────────────────────────────────────────

interface InactivityPoint {
  year: number;
  disabled: number;
  nonDisabled: number;
}

interface GapPoint {
  year: number;
  gapPP: number;
}

interface FacilitiesPoint {
  year: number;
  fundingMillions: number;
}

interface DisabilitySportData {
  inactivityRate: InactivityPoint[];
  participationGap: GapPoint[];
  accessibleFacilities: FacilitiesPoint[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 0, 1);
}

function sparkFrom(arr: number[], n = 10) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function DisabilitySportGapPage() {
  const [data, setData] = useState<DisabilitySportData | null>(null);

  useEffect(() => {
    fetch('/data/disability-sport-gap/disability_sport_gap.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const inactivitySeries: Series[] = data
    ? [
        {
          id: 'disabled',
          label: 'Disabled adults inactive (%)',
          colour: '#E63946',
          data: data.inactivityRate.map(d => ({
            date: yearToDate(d.year),
            value: d.disabled,
          })),
        },
        {
          id: 'non-disabled',
          label: 'Non-disabled adults inactive (%)',
          colour: '#6B7280',
          data: data.inactivityRate.map(d => ({
            date: yearToDate(d.year),
            value: d.nonDisabled,
          })),
        },
      ]
    : [];

  const gapSeries: Series[] = data
    ? [{
        id: 'gap',
        label: 'Participation gap (pp)',
        colour: '#E63946',
        data: data.participationGap.map(d => ({
          date: yearToDate(d.year),
          value: d.gapPP,
        })),
      }]
    : [];

  const facilitiesSeries: Series[] = data
    ? [{
        id: 'funding',
        label: 'Accessible facilities funding (£m)',
        colour: '#264653',
        data: data.accessibleFacilities.map(d => ({
          date: yearToDate(d.year),
          value: d.fundingMillions,
        })),
      }]
    : [];

  // ── Annotations ─────────────────────────────────────────────────────────

  const inactivityAnnotations: Annotation[] = [
    { date: new Date(2012, 6, 1), label: '2012: London Paralympics' },
    { date: new Date(2020, 2, 1), label: '2020: COVID-19 lockdowns' },
  ];

  const gapAnnotations: Annotation[] = [
    { date: new Date(2016, 0, 1), label: '2016: Disability definition aligned to Equality Act' },
  ];

  const facilitiesAnnotations: Annotation[] = [
    { date: new Date(2012, 6, 1), label: '2012: Paralympic legacy peak' },
    { date: new Date(2020, 2, 1), label: '2020: COVID-19 cuts' },
  ];

  // ── Derived metrics ─────────────────────────────────────────────────────

  const latestInactivity = data?.inactivityRate[data.inactivityRate.length - 1];
  const earliestInactivity = data?.inactivityRate[0];
  const latestGap = data?.participationGap[data.participationGap.length - 1];
  const earliestGap = data?.participationGap[0];
  const latestFunding = data?.accessibleFacilities[data.accessibleFacilities.length - 1];
  const peakFunding = data?.accessibleFacilities[0];

  const fundingDrop = latestFunding && peakFunding
    ? Math.round(((peakFunding.fundingMillions - latestFunding.fundingMillions) / peakFunding.fundingMillions) * 100)
    : 27;

  return (
    <>
      <TopicNav topic="Disability Sport Gap" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Disability Sport Gap"
          question="Why Are Disabled People So Much Less Active?"
          finding="43% of disabled adults do no physical activity — a 21-percentage-point gap versus non-disabled adults that has persisted for over a decade. Despite the London 2012 Paralympic legacy, accessible facilities funding has fallen 27% since its peak."
          colour="#6B7280"
          preposition="with"
        />

        {/* Editorial context */}
        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              The 2012 London Paralympics were supposed to transform disabled sport in Britain. Twelve years on, the participation gap tells a different story. While inactivity among disabled adults has fallen from 52% to 43% since 2012, the gap between disabled and non-disabled participation has narrowed by less than five percentage points in the same period. The structural barriers that prevent disabled people from being active — inaccessible facilities, unaffordable adapted equipment, a shortage of inclusive coaching, and the sheer exhaustion of navigating a world not designed for you — have proved far more resistant to change than the post-Paralympic optimism suggested.
            </p>
            <p>
              The funding picture helps explain why progress has stalled. Local authority spending on accessible sport and leisure infrastructure peaked in 2012 at around £142 million and has since fallen to £103 million — a 27% real-terms decline that coincides with the broader collapse in local government funding since 2010. Many of the facilities upgraded for the Paralympics have since deteriorated. Community pools with hoists have closed. Specialist coaching programmes have lost funding. For disabled people outside London, the legacy has often been a new velodrome they cannot reach rather than a local leisure centre they can use.
            </p>
            <p>
              The gap is not simply about individual motivation. Activity Alliance research consistently shows that disabled people want to be more active at the same rate as non-disabled people. The difference is opportunity. Transport is the single most cited barrier: 40% of disabled adults say getting to a facility is the main reason they do not participate. Cost is second — adapted equipment and personal assistance add significantly to the expense. And the social dimension matters too: 28% of disabled people say they would be more active if they could find inclusive sessions where they felt welcome, not singled out. Closing this gap requires sustained infrastructure investment, not short-term inspiration.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-inactivity', label: 'Inactivity rates' },
          { id: 'sec-gap', label: 'Participation gap' },
          { id: 'sec-funding', label: 'Facilities funding' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Disabled adults inactive"
            value={latestInactivity ? latestInactivity.disabled.toFixed(0) + '%' : '43%'}
            unit="2024"
            direction="down"
            polarity="up-is-bad"
            changeText={
              latestInactivity && earliestInactivity
                ? `down from ${earliestInactivity.disabled}% in ${earliestInactivity.year} · still ${(latestInactivity.disabled - latestInactivity.nonDisabled).toFixed(0)}pp above non-disabled`
                : 'down from 52% in 2012 · still 21pp above non-disabled'
            }
            sparklineData={
              data ? sparkFrom(data.inactivityRate.map(d => d.disabled)) : [52, 51, 50, 49, 48, 47, 46, 47, 45, 44, 43]
            }
            source="Sport England — Active Lives Adult Survey, 2024"
            href="#sec-inactivity"
          />
          <MetricCard
            label="Participation gap (disabled vs non-disabled)"
            value={latestGap ? latestGap.gapPP.toFixed(1) + 'pp' : '20.9pp'}
            unit="2024"
            direction="down"
            polarity="up-is-bad"
            changeText={
              latestGap && earliestGap
                ? `down from ${earliestGap.gapPP}pp in ${earliestGap.year} · narrowing slowly`
                : 'down from 25.8pp in 2012 · narrowing slowly'
            }
            sparklineData={
              data ? sparkFrom(data.participationGap.map(d => d.gapPP)) : [25, 25, 25, 24, 23, 23, 22, 21, 21, 21, 21]
            }
            source="Sport England — Active Lives Adult Survey, 2024"
            href="#sec-gap"
          />
          <MetricCard
            label="Accessible facilities funding"
            value={latestFunding ? '£' + latestFunding.fundingMillions + 'm' : '£103m'}
            unit="2024"
            direction="down"
            polarity="up-is-good"
            changeText={`down ${fundingDrop}% from 2012 peak · local authority budgets squeezed`}
            sparklineData={
              data ? sparkFrom(data.accessibleFacilities.map(d => d.fundingMillions)) : [142, 138, 131, 125, 118, 112, 108, 105, 87, 92, 98, 101, 103]
            }
            source="DCMS — Local authority sport expenditure, 2024"
            href="#sec-funding"
          />
        </div>

        {/* Chart 1: Inactivity rates — disabled vs non-disabled */}
        <ScrollReveal>
          <div id="sec-inactivity" className="mb-12">
            <LineChart
              series={inactivitySeries}
              title="Physical inactivity among disabled vs non-disabled adults, England, 2012–2024"
              subtitle="Percentage doing fewer than 30 minutes of moderate activity per week. Both groups improving, but the gap persists."
              yLabel="Inactive (%)"
              annotations={inactivityAnnotations}
              source={{
                name: 'Sport England',
                dataset: 'Active Lives Adult Survey',
                frequency: 'annual',
                url: 'https://www.sportengland.org/research-and-data/data/active-lives',
                date: 'December 2024',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 2: Participation gap over time */}
        <ScrollReveal>
          <div id="sec-gap" className="mb-12">
            <LineChart
              series={gapSeries}
              title="Disability sport participation gap, England, 2012–2024"
              subtitle="Difference in percentage points between disabled and non-disabled adults meeting 150+ minutes per week. Despite post-Paralympic momentum, progress has been glacial."
              yLabel="Gap (percentage points)"
              annotations={gapAnnotations}
              source={{
                name: 'Sport England',
                dataset: 'Active Lives Adult Survey',
                frequency: 'annual',
                url: 'https://www.sportengland.org/research-and-data/data/active-lives',
                date: 'December 2024',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 3: Accessible facilities funding */}
        <ScrollReveal>
          <div id="sec-funding" className="mb-12">
            <LineChart
              series={facilitiesSeries}
              title="Local authority spending on accessible sport and leisure facilities, England, 2012–2024"
              subtitle="Capital and revenue funding for disability-inclusive sport infrastructure. Peaked in the Paralympic year and has never recovered."
              yLabel="Funding (£ millions)"
              annotations={facilitiesAnnotations}
              source={{
                name: 'DCMS',
                dataset: 'Local authority revenue expenditure and financing',
                frequency: 'annual',
                url: 'https://www.gov.uk/government/statistics/local-authority-revenue-expenditure-and-financing',
                date: 'December 2024',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Inclusive community programmes showing measurable impact"
            value="5pp"
            unit="gap reduction in pilot areas"
            description="Activity Alliance's 'Get Out Get Active' programme, operating in 18 localities across England, has demonstrated that community-based inclusive activity sessions — where disabled and non-disabled people participate together — can reduce the local participation gap by up to 5 percentage points within two years. Participants report higher wellbeing scores and greater confidence in using mainstream facilities. The programme's success has led Sport England to commit £10.5 million to scaling inclusive community sport models through 2027, targeting areas with the widest gaps. Early evidence from these expansion sites shows sustained engagement rates of 68% after 12 months — significantly above the 42% retention typical of mainstream programmes."
            source="Source: Activity Alliance — Get Out Get Active evaluation, 2024. Sport England — Uniting the Movement investment programme, 2024."
          />
        </ScrollReveal>

        {/* Sources & Methodology */}
        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p>
              <a href="https://www.sportengland.org/research-and-data/data/active-lives" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Sport England — Active Lives Adult Survey</a> — primary data source for inactivity rates and participation gap. Annual survey of ~180,000 adults aged 16+. Retrieved December 2024.
            </p>
            <p>
              <a href="https://www.activityalliance.org.uk/how-we-help/research" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Activity Alliance — Annual Disability and Activity Survey</a> — supplementary data on barriers to participation and attitudes. Retrieved December 2024.
            </p>
            <p>
              <a href="https://www.gov.uk/government/statistics/local-authority-revenue-expenditure-and-financing" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DCMS — Local authority revenue expenditure and financing</a> — accessible facilities funding data. Retrieved December 2024.
            </p>
            <p>
              Inactivity is defined as fewer than 30 minutes of moderate-intensity physical activity per week. The participation gap is the difference in percentage points between disabled and non-disabled adults meeting the Chief Medical Officer guideline of 150+ minutes per week. COVID-19 disrupted 2020 data collection. Definition of disability aligned to the Equality Act 2010 from 2016 onwards.
            </p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
