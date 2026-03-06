'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';

// ── Types ────────────────────────────────────────────────────────────────────

interface ChargePointPoint {
  year: number;
  total: number;
  rapid: number;
}

interface EvRegistrationPoint {
  year: number;
  batteryEV: number;
}

interface RuralUrbanPoint {
  area: string;
  chargePointsPer100kPop: number;
}

interface EvChargingData {
  chargePoints: ChargePointPoint[];
  evRegistrations: EvRegistrationPoint[];
  ruralUrbanGap: RuralUrbanPoint[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function EvChargingPage() {
  const [data, setData] = useState<EvChargingData | null>(null);

  useEffect(() => {
    fetch('/data/ev-charging/ev_charging.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chargePointSeries: Series[] = data
    ? [{
        id: 'total-charge-points',
        label: 'Total public charge points',
        colour: '#2A9D8F',
        data: data.chargePoints.map(d => ({
          date: yearToDate(d.year),
          value: d.total,
        })),
      }, {
        id: 'rapid-charge-points',
        label: 'Rapid charge points',
        colour: '#264653',
        data: data.chargePoints.map(d => ({
          date: yearToDate(d.year),
          value: d.rapid,
        })),
      }]
    : [];

  const latest = data?.chargePoints[data.chargePoints.length - 1];
  const earliest = data?.chargePoints[0];
  const latestEv = data?.evRegistrations[data.evRegistrations.length - 1];
  const urbanArea = data?.ruralUrbanGap.find(a => a.area === 'Urban');
  const ruralArea = data?.ruralUrbanGap.find(a => a.area === 'Rural');

  const gapMultiple = urbanArea && ruralArea
    ? Math.round(urbanArea.chargePointsPer100kPop / ruralArea.chargePointsPer100kPop)
    : 8;

  return (
    <>
      <TopicNav topic="Infrastructure & Services" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="EV Charging Infrastructure"
          question="Is the charging network keeping up with electric vehicles?"
          finding="The UK now has 65,000 public charge points — growing fast. But EV registrations are outpacing infrastructure: there is 1 rapid charger for every 22 EVs, against a government target of 1:10. Rural areas have 8x fewer charge points per capita than cities."
          colour="#2A9D8F"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The UK public EV charging network has grown from 8,400 devices in 2017 to 65,000 in early 2024 — an 8-fold increase and a genuine infrastructure achievement. But EV registrations are outpacing charger installation: the ratio of rapid chargers to EVs has fallen from around 1:6 in 2017 to approximately 1:22 in 2023 against a government target of 1:10, and the direction of travel is moving away from that target. Reaching the government's goal of 300,000 public charge points by 2030 would require installations to roughly quadruple in five years — plausible but demanding — and grid connection upgrades to distribution networks are a separate, slower challenge that could constrain the pace.</p>
            <p>The distributional gaps are significant. Urban areas have approximately 66 public charge points per 100,000 people; rural areas have 8 — an 8-fold gap that means households without off-street parking or a workplace charger face a genuine barrier to EV adoption. The transition risks reproducing transport inequalities: those with driveways transition easily; those in flats or rural areas are left dependent on patchy public infrastructure. Reliability compounds this: Zap-Map fault data shows a significant proportion of public charge points are out of service at any given time, and a broken charger may not announce its fault status until a driver has already waited in a queue.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-growth', label: 'Network growth' },
          { id: 'sec-rural-urban', label: 'Rural vs urban' },
        ]} />

        {/* Metric cards */}
        <ScrollReveal>
          <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Public charge points installed"
              value={latest ? latest.total.toLocaleString() : '65,000'}
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText={earliest ? `Up from ${earliest.total.toLocaleString()} in ${earliest.year} · growing at 35%/year` : 'Up from 8,400 in 2017 · growing at 35%/year'}
              sparklineData={[8400, 13700, 20000, 25400, 31000, 47000, 65000]}
              source="OZEV / Zap-Map · Jan 2024"
              href="#sec-overview"/>
            <MetricCard
              label="Rapid chargers per 10 EVs on road"
              value="0.45"
              unit=""
              direction="down"
              polarity="up-is-good"
              changeText="Government target is 1.0 · falling behind as EV fleet grows faster"
              sparklineData={[1.8, 1.5, 1.2, 0.9, 0.7, 0.5, 0.45]}
              source="OZEV · 2023"
              href="#sec-growth"/>
            <MetricCard
              label="Rural vs urban charge point gap"
              value={gapMultiple.toString()}
              unit="×"
              direction="up"
              polarity="up-is-bad"
              changeText={`Urban ${urbanArea?.chargePointsPer100kPop ?? 66} per 100k pop vs rural ${ruralArea?.chargePointsPer100kPop ?? 8} · 'charging deserts'`}
              sparklineData={[4, 5, 5, 6, 7, 8]}
              source="RAC Foundation · 2023"
              href="#sec-rural-urban"/>
          </div>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="65,000 public charge points installed"
            value="65k"
            unit=""
            description="Public charge point coverage has grown nearly 8-fold since 2017. The UK has more public charging infrastructure per EV than most EU nations. Rapid charger installation accelerated significantly in 2022 and 2023, with the government's 300,000 by 2030 target still plausibly achievable if the current pace is maintained."
            source="Source: OZEV / Zap-Map, January 2024."
          />
        </ScrollReveal>

        {/* Chart: charge points growth */}
        <ScrollReveal>
          <div id="sec-growth" className="mb-12 mt-8">
            <LineChart
              series={chargePointSeries}
              title="UK public EV charge points, 2017–2023"
              subtitle="Total devices and rapid chargers (50kW+). Both growing rapidly, but lagging EV registrations."
              yLabel="Number of charge points"
              source={{
                name: 'OZEV / Zap-Map',
                dataset: 'National EV Charging Infrastructure Statistics',
                frequency: 'quarterly',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Rural/urban gap */}
        <ScrollReveal>
          <div id="sec-rural-urban" className="mb-12">
            <div className="bg-white rounded-lg border border-wiah-border p-8">
              <h2 className="text-lg font-bold text-wiah-black mb-1">
                Public charge points per 100,000 people: urban vs rural, 2023
              </h2>
              <p className="text-sm text-wiah-mid mb-6">Rural areas have 8x fewer charge points per capita — a major barrier to EV adoption for households without off-street parking.</p>
              <div className="mt-4 space-y-4">
                {data?.ruralUrbanGap.map((a) => {
                  const pct = (a.chargePointsPer100kPop / 75) * 100;
                  const colour = a.area === 'Urban' ? '#2A9D8F' : a.area === 'Suburban' ? '#F4A261' : '#E63946';
                  return (
                    <div key={a.area}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-wiah-black">{a.area}</span>
                        <span className="font-mono text-sm font-bold" style={{ color: colour }}>
                          {a.chargePointsPer100kPop} per 100k
                        </span>
                      </div>
                      <div className="h-6 bg-wiah-light rounded-sm overflow-hidden">
                        <div
                          className="h-full rounded-sm transition-all"
                          style={{ width: `${pct}%`, backgroundColor: colour }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="font-mono text-xs text-wiah-mid mt-4">Source: RAC Foundation — EV Infrastructure Coverage Report · 2023</p>
            </div>
          </div>
        </ScrollReveal>

        {/* Sources */}
        <ScrollReveal>
          <div className="border-t border-wiah-border pt-8 mt-8">
            <h2 className="text-base font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
            <ul className="space-y-2 font-mono text-xs text-wiah-mid">
              <li>
                <a href="https://www.gov.uk/government/collections/electric-vehicle-charging-infrastructure-statistics" className="underline hover:text-wiah-black" target="_blank" rel="noopener noreferrer">
                  OZEV National EV Charging Infrastructure Statistics
                </a>
                {' '}— total and rapid public charge points installed, quarterly
              </li>
              <li>
                <a href="https://www.zap-map.com/ev-stats/how-many-charging-points/" className="underline hover:text-wiah-black" target="_blank" rel="noopener noreferrer">
                  Zap-Map EV Charging Statistics
                </a>
                {' '}— network growth and reliability data
              </li>
              <li>
                RAC Foundation — EV Infrastructure Coverage Report · geographic coverage analysis by area type
              </li>
            </ul>
          </div>
        </ScrollReveal>
      </main>
    </>
  );
}
