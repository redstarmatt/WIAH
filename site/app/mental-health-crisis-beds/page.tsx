'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'NHS England', dataset: 'KH03 Bed Availability and Occupancy', date: '2024/25' },
  { num: 2, name: 'Royal College of Psychiatrists', dataset: 'Bed occupancy safe limit guidance (85%)', date: '2024' },
  { num: 3, name: 'NHS Digital', dataset: 'Mental Health Act Statistics — annual detentions', date: '2024/25' },
  { num: 4, name: 'NHS England', dataset: 'Out of Area Placements in Mental Health Services', date: '2025' },
];

// ── Types ────────────────────────────────────────────────────────────────────

interface BedCountPoint {
  year: number;
  beds: number;
}

interface OccupancyPoint {
  year: number;
  rate: number;
}

interface DetentionPoint {
  year: number;
  detentions: number;
}

interface OOAPPoint {
  year: number;
  placements: number;
}

interface RegionData {
  region: string;
  occupancy: number;
  bedsPerCapita: number;
}

interface MentalHealthBedsData {
  bedCount: BedCountPoint[];
  occupancyRate: OccupancyPoint[];
  detentionsUnderMHA: DetentionPoint[];
  outOfAreaPlacements: OOAPPoint[];
  byRegion: RegionData[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

function sparkFrom(arr: number[], n = 10) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function MentalHealthCrisisBedsPage() {
  const [data, setData] = useState<MentalHealthBedsData | null>(null);

  useEffect(() => {
    fetch('/data/mental-health-crisis-beds/mental_health_crisis_beds.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const bedCountSeries: Series[] = data
    ? [{
        id: 'bed-count',
        label: 'Mental health beds (England)',
        colour: '#E63946',
        data: data.bedCount.map(d => ({
          date: yearToDate(d.year),
          value: d.beds,
        })),
      }]
    : [];

  const occupancySeries: Series[] = data
    ? [{
        id: 'occupancy',
        label: 'Average occupancy rate (%)',
        colour: '#E63946',
        data: data.occupancyRate.map(d => ({
          date: yearToDate(d.year),
          value: d.rate,
        })),
      }]
    : [];

  const detentionsSeries: Series[] = data
    ? [{
        id: 'detentions',
        label: 'Detentions under the Mental Health Act',
        colour: '#6B7280',
        data: data.detentionsUnderMHA.map(d => ({
          date: yearToDate(d.year),
          value: d.detentions,
        })),
      }]
    : [];

  // ── Derived metrics ─────────────────────────────────────────────────────

  const latestBeds = data?.bedCount[data.bedCount.length - 1];
  const firstBeds = data?.bedCount[0];
  const bedReduction = firstBeds && latestBeds
    ? Math.round(((firstBeds.beds - latestBeds.beds) / firstBeds.beds) * 100)
    : 47;

  const latestOccupancy = data?.occupancyRate[data.occupancyRate.length - 1];

  const latestDetentions = data?.detentionsUnderMHA[data.detentionsUnderMHA.length - 1];
  const firstDetentions = data?.detentionsUnderMHA[0];
  const detentionIncrease = firstDetentions && latestDetentions
    ? Math.round(((latestDetentions.detentions - firstDetentions.detentions) / firstDetentions.detentions) * 100)
    : 40;

  const latestOOAP = data?.outOfAreaPlacements[data.outOfAreaPlacements.length - 1];
  const peakOOAP = data?.outOfAreaPlacements.reduce((a, b) => a.placements > b.placements ? a : b);

  return (
    <>
      <TopicNav topic="Mental Health Crisis Beds" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Mental Health Crisis Beds"
          question="Are There Enough Mental Health Beds?"
          finding="Mental health inpatient beds have been cut by nearly half since 1998. Occupancy rates regularly exceed safe limits, detentions under the Mental Health Act have risen 40%, and thousands of patients each year are sent hundreds of miles from home because their local unit is full."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>England had 33,100 mental health inpatient beds in 1998. Today that figure stands at around 17,400 -- a reduction of {bedReduction}% over 27 years<Cite nums={1} />, while the population has grown by over 10 million. The reduction was originally justified by the move towards &ldquo;care in the community,&rdquo; the idea that people would be treated closer to home through expanded community mental health services. Those community services were never funded at the scale required. The result is a system where acute beds are almost permanently full, crisis teams are overwhelmed, and people in severe psychiatric distress are turned away from hospital or detained under the Mental Health Act because voluntary admission is no longer available.</p>
            <p>The Royal College of Psychiatrists considers occupancy above 85% to be unsafe<Cite nums={2} /> -- it leaves no capacity for emergency admissions and forces premature discharges to free beds. The national average has been above 90% since 2017 and sits at 92.7% in 2025, with London trusts routinely exceeding 96%.<Cite nums={1} /> When a local unit is full, patients are placed in out-of-area beds, sometimes hundreds of miles from family and support networks. These out-of-area placements (OAPs) peaked at 6,500 in 2019; the government target to eliminate them entirely has been missed repeatedly, though numbers have fallen to around 4,400 in 2025.<Cite nums={4} /></p>
            <p>Detentions under the Mental Health Act have risen from 48,600 in 2010 to over 68,000 in 2025 -- a 40% increase.<Cite nums={3} /> Black people are detained at more than four times the rate of white people, a disparity that has persisted for decades. The Mental Health Act reform, which received Royal Assent in 2025, aims to reduce detentions and address racial disparities, but implementation depends on the availability of community alternatives that currently do not exist at sufficient scale.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-beds', label: 'Bed numbers' },
          { id: 'sec-occupancy', label: 'Occupancy' },
          { id: 'sec-detentions', label: 'Detentions' },
          { id: 'sec-regional', label: 'Regional' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Mental health beds"
            value={latestBeds ? latestBeds.beds.toLocaleString() : '17,400'}
            unit="2025"
            direction="down"
            polarity="up-is-good"
            changeText={`down ${bedReduction}% from ${firstBeds ? firstBeds.beds.toLocaleString() : '33,100'} in 1998`}
            sparklineData={
              data ? sparkFrom(data.bedCount.map(d => d.beds)) : []
            }
            source="NHS England · KH03 bed availability returns, 2024/25"
            href="#sec-beds"
          />
          <MetricCard
            label="Average bed occupancy"
            value={latestOccupancy ? `${latestOccupancy.rate}%` : '92.7%'}
            unit="2025"
            direction="up"
            polarity="up-is-bad"
            changeText="safe limit is 85% · London trusts at 96%+"
            sparklineData={
              data ? sparkFrom(data.occupancyRate.map(d => d.rate)) : []
            }
            source="NHS England · KH03 bed occupancy, 2024/25"
            href="#sec-occupancy"
          />
          <MetricCard
            label="Detentions under Mental Health Act"
            value={latestDetentions ? latestDetentions.detentions.toLocaleString() : '68,100'}
            unit="2024/25"
            direction="up"
            polarity="up-is-bad"
            changeText={`up ${detentionIncrease}% since 2010 · Black people detained at 4x rate`}
            sparklineData={
              data ? sparkFrom(data.detentionsUnderMHA.map(d => d.detentions)) : []
            }
            source="NHS Digital · Mental Health Act Statistics, 2024/25"
            href="#sec-detentions"
          />
        </div>

        {/* Chart 1: Bed count */}
        <ScrollReveal>
          <div id="sec-beds" className="mb-12">
            <LineChart
              series={bedCountSeries}
              title="Mental health inpatient beds, England, 1998–2025"
              subtitle="Total available NHS mental health beds. Down nearly half while population grew 10 million."
              yLabel="Beds"
              source={{
                name: 'NHS England',
                dataset: 'KH03 Bed Availability and Occupancy',
                frequency: 'quarterly',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 2: Occupancy rate */}
        <ScrollReveal>
          <div id="sec-occupancy" className="mb-12">
            <LineChart
              series={occupancySeries}
              title="Mental health bed occupancy rate, 2010–2025"
              subtitle="Royal College of Psychiatrists considers above 85% unsafe. National average has exceeded 90% since 2017."
              yLabel="Occupancy (%)"
              source={{
                name: 'NHS England',
                dataset: 'KH03 Bed Occupancy',
                frequency: 'quarterly',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 3: Detentions under MHA */}
        <ScrollReveal>
          <div id="sec-detentions" className="mb-12">
            <LineChart
              series={detentionsSeries}
              title="Detentions under the Mental Health Act, England, 2010–2025"
              subtitle="Annual detentions have risen 40% in 15 years. Dipped in 2020 during pandemic, then resumed upward trend."
              yLabel="Detentions"
              source={{
                name: 'NHS Digital',
                dataset: 'Mental Health Act Statistics',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Regional variation */}
        <ScrollReveal>
          <div id="sec-regional" className="mb-12">
            <div className="bg-white rounded-lg border border-wiah-border p-8">
              <h2 className="text-lg font-bold text-wiah-black mb-2">
                Mental health bed occupancy by region (%)
              </h2>
              <p className="text-sm text-wiah-mid mb-6">Royal College of Psychiatrists safe limit: 85%. Every region exceeds it.</p>
              <div className="mt-6 space-y-4">
                {data?.byRegion.map((r) => {
                  const pct = (r.occupancy / 100) * 100;
                  const isAboveSafe = r.occupancy > 85;
                  return (
                    <div key={r.region}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-wiah-black">{r.region}</span>
                        <span className="font-mono text-sm font-bold text-wiah-black">{r.occupancy}%</span>
                      </div>
                      <div className="h-6 bg-wiah-light rounded-sm overflow-hidden relative">
                        {/* 85% safe limit marker */}
                        <div
                          className="absolute top-0 h-full border-r-2 border-dashed border-wiah-mid z-10"
                          style={{ left: '85%' }}
                        />
                        <div
                          className="h-full rounded-sm transition-all"
                          style={{
                            width: `${pct}%`,
                            backgroundColor: isAboveSafe ? '#E63946' : '#2A9D8F',
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
                <p className="font-mono text-xs text-wiah-mid mt-2">Dashed line = 85% safe occupancy limit (Royal College of Psychiatrists)</p>
              </div>
              <p className="font-mono text-xs text-wiah-mid mt-4">Source: NHS England — KH03 Bed Availability and Occupancy, 2024/25</p>
            </div>
          </div>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Out-of-area placements falling from peak"
            value={latestOOAP ? latestOOAP.placements.toLocaleString() : '4,400'}
            unit="2025"
            description={`Out-of-area placements — where patients are sent to distant units because local beds are full — have fallen from a peak of ${peakOOAP ? peakOOAP.placements.toLocaleString() : '6,500'} in ${peakOOAP ? peakOOAP.year : 2019} to ${latestOOAP ? latestOOAP.placements.toLocaleString() : '4,400'} in 2025, a reduction of around 32%. The original NHS target to eliminate OAPs entirely by 2021 was missed, but sustained focus on local crisis provision, crisis houses, and psychiatric decision units has driven numbers down. Each out-of-area placement represents a person removed from their family, friends, and community at a point of extreme vulnerability — the reduction, while incomplete, reflects real improvement in local crisis capacity.`}
            source="Source: NHS England — Out of Area Placements in Mental Health Services, monthly data, 2025."
          />
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p><strong>KH03 Bed Availability and Occupancy</strong> — NHS England. Quarterly returns from all NHS trusts on available beds and occupancy rates. Published quarterly.</p>
            <p><strong>Mental Health Act Statistics</strong> — NHS Digital. Annual data on uses of the Mental Health Act 1983 (as amended 2007), including detentions by demographic group. Published annually.</p>
            <p><strong>Out of Area Placements</strong> — NHS England. Monthly data on inappropriate out-of-area placements in mental health services. Published monthly.</p>
            <p><strong>Note:</strong> Bed counts include all NHS mental health beds (acute, psychiatric intensive care, rehabilitation, older adults). Private sector beds are excluded. The 2020 dip in detentions reflects pandemic disruption, not policy change. Pre-1998 data uses different definitions and is not directly comparable.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
