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

// ── Types ────────────────────────────────────────────────────────────────────

interface InvestmentPoint {
  year: number;
  spendMillions: number;
}

interface CyclingTripsPoint {
  year: number;
  tripsMillions: number;
}

interface CyclistKSIPoint {
  year: number;
  killed: number;
  seriouslyInjured: number;
  total: number;
}

interface ActiveTravelData {
  investmentSpend: InvestmentPoint[];
  cyclingTrips: CyclingTripsPoint[];
  cyclistKSI: CyclistKSIPoint[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

function sparkFrom(arr: number[], n = 10) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function ActiveTravelInvestmentPage() {
  const [data, setData] = useState<ActiveTravelData | null>(null);

  useEffect(() => {
    fetch('/data/active-travel-investment/active_travel_investment.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const investmentSeries: Series[] = data
    ? [{
        id: 'investment',
        label: 'Government spend (£m)',
        colour: '#2A9D8F',
        data: data.investmentSpend.map(d => ({
          date: yearToDate(d.year),
          value: d.spendMillions,
        })),
      }]
    : [];

  const cyclingTripsSeries: Series[] = data
    ? [{
        id: 'cycling-trips',
        label: 'Cycling trips (millions)',
        colour: '#264653',
        data: data.cyclingTrips.map(d => ({
          date: yearToDate(d.year),
          value: d.tripsMillions,
        })),
      }]
    : [];

  const ksiSeries: Series[] = data
    ? [
        {
          id: 'ksi-total',
          label: 'Total KSI casualties',
          colour: '#E63946',
          data: data.cyclistKSI.map(d => ({
            date: yearToDate(d.year),
            value: d.total,
          })),
        },
        {
          id: 'ksi-killed',
          label: 'Cyclists killed',
          colour: '#1A1A1A',
          data: data.cyclistKSI.map(d => ({
            date: yearToDate(d.year),
            value: d.killed,
          })),
        },
      ]
    : [];

  const latestSpend = data?.investmentSpend[data.investmentSpend.length - 1];
  const peakSpend = data?.investmentSpend.reduce((a, b) => a.spendMillions > b.spendMillions ? a : b);
  const latestTrips = data?.cyclingTrips[data.cyclingTrips.length - 1];
  const baselineTrips = data?.cyclingTrips[0];
  const latestKSI = data?.cyclistKSI[data.cyclistKSI.length - 1];
  const prevKSI = data?.cyclistKSI[data.cyclistKSI.length - 2];

  const tripsChange = latestTrips && baselineTrips
    ? Math.round(((latestTrips.tripsMillions - baselineTrips.tripsMillions) / baselineTrips.tripsMillions) * 100)
    : 34;

  const ksiChange = latestKSI && prevKSI
    ? Math.round(((latestKSI.total - prevKSI.total) / prevKSI.total) * 100)
    : -3;

  return (
    <>
      <TopicNav topic="Infrastructure & Services" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Infrastructure & Services"
          question="Is Britain actually investing in cycling and walking?"
          finding="The government promised a cycling and walking revolution. Active Travel England's budget sits at £200m per year — a fraction of the £4bn Gear Change target. Cycling trips have grown 34% since 2015, but almost entirely because of the pandemic, not infrastructure. Cyclist deaths are falling, but serious injuries remain stubbornly high."
          colour="#2A9D8F"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              In July 2020, the UK government published <em>Gear Change</em>, its &ldquo;bold vision for cycling and walking.&rdquo; The ambition was transformative: half of all journeys in towns and cities to be walked or cycled by 2030, protected cycle lanes on every main road in city centres, and a new inspectorate &mdash; Active Travel England &mdash; to ensure local authorities built infrastructure to proper standards. The document explicitly cited the Netherlands and Denmark, where per-capita spending on cycling infrastructure runs at roughly ten times UK levels, and where cycling accounts for 25&ndash;30% of all trips. The promise was to close that gap. Four years on, the gap has barely narrowed.
            </p>
            <p>
              Active Travel England was formally established in 2022 under cycling commissioner Chris Boardman. It has genuine teeth: the power to rate local authority active travel schemes and, critically, to block DfT funding for councils whose road schemes fail to meet cycling and walking standards. ATE&rsquo;s scheme ratings have already forced redesigns of major junction projects. But ATE&rsquo;s own budget tells the real story. At around &pound;200m per year, total government spending on active travel amounts to roughly &pound;3.50 per person &mdash; compared to &pound;30&ndash;36 per person in the Netherlands and Denmark. The Gear Change document implied a trajectory toward &pound;4bn cumulative investment; actual spend has fallen from its 2020 pandemic-era peak of &pound;541m (inflated by the Emergency Active Travel Fund) to less than half that. Low-Traffic Neighbourhoods &mdash; the most visible and politically contentious element of the active travel agenda &mdash; have provoked fierce local opposition in some areas, though evaluations consistently show that where LTNs are retained, traffic volumes and air pollution fall, and cycling rates rise. The controversy has made some councils reluctant to pursue further schemes.
            </p>
            <p>
              Cyclist safety remains a critical concern. While the number of cyclists killed on British roads has fallen &mdash; from around 100 per year in the mid-2010s to 78 in 2024 &mdash; serious injuries have risen, driven by increased cycling volumes on roads that remain fundamentally designed for motor vehicles. Protected cycle lanes, the proven solution, cover fewer than 200 km nationally; the Netherlands has over 35,000 km. E-bike sales are the brightest spot: UK e-bike sales have grown roughly 30% year-on-year since 2020, and now account for around 1 in 6 bike sales. E-bikes extend the practical range and demographic reach of cycling &mdash; but without safe infrastructure, new riders face the same hostile road environment. Walking trips, meanwhile, have quietly declined: the National Travel Survey shows a sustained drop in walking stages per person per year, from 252 in 2015 to 224 in 2023, partly reflecting car dependency and partly the loss of local amenities that made short trips walkable. The data is clear: Britain wants to cycle and walk more, but the infrastructure investment to make it safe and practical is not keeping pace with either the ambition or the need.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-investment', label: 'Investment' },
          { id: 'sec-trips', label: 'Cycling trips' },
          { id: 'sec-safety', label: 'Safety' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Active travel spend"
            value={latestSpend ? `£${latestSpend.spendMillions}m` : '£200m'}
            unit="2024"
            direction="down"
            polarity="up-is-good"
            changeText={
              latestSpend && peakSpend
                ? `Down from £${peakSpend.spendMillions}m peak in ${peakSpend.year} · Target: £4bn cumulative`
                : 'Down from £541m peak in 2020 · Target: £4bn cumulative'
            }
            sparklineData={
              data ? sparkFrom(data.investmentSpend.map(d => d.spendMillions)) : []
            }
            source="DfT · Walking and Cycling Statistics, 2024"
            href="#sec-investment"
          />
          <MetricCard
            label="Cycling trips per year"
            value={latestTrips ? `${(latestTrips.tripsMillions / 1000).toFixed(1)}bn` : '1.1bn'}
            unit="2024"
            direction="up"
            polarity="up-is-good"
            changeText={`+${tripsChange}% since 2015 · pandemic spike in 2020 not sustained`}
            sparklineData={
              data ? sparkFrom(data.cyclingTrips.map(d => d.tripsMillions)) : []
            }
            source="DfT · National Travel Survey, 2024"
            href="#sec-trips"
          />
          <MetricCard
            label="Cyclist KSI casualties"
            value={latestKSI ? latestKSI.total.toLocaleString() : '4,000'}
            unit="2024"
            direction="down"
            polarity="up-is-bad"
            changeText={`${ksiChange}% change · ${latestKSI ? latestKSI.killed : 78} killed · serious injuries still elevated`}
            sparklineData={
              data ? sparkFrom(data.cyclistKSI.map(d => d.total)) : []
            }
            source="DfT · Reported Road Casualties, STATS19, 2024"
            href="#sec-safety"
          />
        </div>

        {/* Chart 1: Investment spend */}
        <ScrollReveal>
          <div id="sec-investment" className="mb-12">
            <LineChart
              series={investmentSeries}
              title="Government active travel investment, England, 2015–2024"
              subtitle="Total central and local government capital and revenue spend on walking and cycling infrastructure (£m). Peak in 2020 reflects Emergency Active Travel Fund."
              yLabel="£ millions"
              source={{
                name: 'Department for Transport',
                dataset: 'Walking and Cycling Statistics',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 2: Cycling trips */}
        <ScrollReveal>
          <div id="sec-trips" className="mb-12">
            <LineChart
              series={cyclingTripsSeries}
              title="Estimated cycling trips per year, England, 2015–2024"
              subtitle="Millions of cycling trips. The 2020 pandemic spike has partially sustained, with trips 34% above 2015 levels."
              yLabel="Trips (millions)"
              source={{
                name: 'Department for Transport',
                dataset: 'National Travel Survey & Cycle Traffic Counts',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 3: Cyclist KSI casualties */}
        <ScrollReveal>
          <div id="sec-safety" className="mb-12">
            <LineChart
              series={ksiSeries}
              title="Cyclist killed or seriously injured (KSI), Great Britain, 2015–2024"
              subtitle="Deaths falling but serious injuries remain elevated. More cyclists on unchanged roads."
              yLabel="Casualties"
              source={{
                name: 'Department for Transport',
                dataset: 'Reported Road Casualties Great Britain (STATS19)',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Active Travel England inspections driving better design"
            value="30% of schemes redesigned"
            description="Active Travel England's scheme rating system is working. Since its establishment in 2022, ATE has reviewed over 200 local authority active travel schemes and required redesigns on roughly 30% — ensuring protected cycle lanes meet Dutch-standard design principles rather than painted gutters. E-bike sales have grown approximately 30% year-on-year since 2020, now accounting for 1 in 6 bikes sold in the UK, extending practical cycling range to 10–15 miles and making cycling viable for older riders, those with disabilities, and people in hillier areas. Where Low-Traffic Neighbourhoods have been retained beyond trial periods, monitoring data shows 10–25% reductions in through-traffic and measurable improvements in local air quality."
            source="Source: Active Travel England — Annual Report 2023/24. Bicycle Association — UK E-Bike Market Data 2024. DfT — LTN Monitoring Reports."
          />
        </ScrollReveal>

        <RelatedTopics />
      </main>
    </>
  );
}
