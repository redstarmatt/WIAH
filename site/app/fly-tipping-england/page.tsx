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

interface IncidentPoint {
  year: number;
  total: number;
  householdWastePct: number;
}

interface ClearanceCostPoint {
  year: number;
  costMillions: number;
}

interface EnforcementPoint {
  year: number;
  fixedPenalties: number;
  prosecutions: number;
}

interface RegionData {
  region: string;
  incidentsPerThousand: number;
}

interface FlyTippingData {
  incidents: IncidentPoint[];
  clearanceCosts: ClearanceCostPoint[];
  enforcementActions: EnforcementPoint[];
  byRegion: RegionData[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 0, 1);
}

function sparkFrom(arr: number[], n = 10) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function FlyTippingEnglandPage() {
  const [data, setData] = useState<FlyTippingData | null>(null);

  useEffect(() => {
    fetch('/data/fly-tipping-england/fly_tipping_england.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const incidentSeries: Series[] = data
    ? [{
        id: 'incidents',
        label: 'Total incidents',
        colour: '#6B7280',
        data: data.incidents.map(d => ({
          date: yearToDate(d.year),
          value: d.total,
        })),
      }]
    : [];

  const enforcementSeries: Series[] = data
    ? [
        {
          id: 'fixed-penalties',
          label: 'Fixed penalty notices',
          colour: '#264653',
          data: data.enforcementActions.map(d => ({
            date: yearToDate(d.year),
            value: d.fixedPenalties,
          })),
        },
        {
          id: 'prosecutions',
          label: 'Prosecutions',
          colour: '#E63946',
          data: data.enforcementActions.map(d => ({
            date: yearToDate(d.year),
            value: d.prosecutions,
          })),
        },
      ]
    : [];

  const clearanceSeries: Series[] = data
    ? [{
        id: 'clearance',
        label: 'Clearance cost (£m)',
        colour: '#F4A261',
        data: data.clearanceCosts.map(d => ({
          date: yearToDate(d.year),
          value: d.costMillions,
        })),
      }]
    : [];

  const incidentAnnotations: Annotation[] = [
    { date: new Date(2016, 0, 1), label: '2016: councils introduce bulky waste charges' },
    { date: new Date(2020, 0, 1), label: '2020: tips closed in lockdown' },
  ];

  const enforcementAnnotations: Annotation[] = [
    { date: new Date(2016, 0, 1), label: '2016: FPN powers expanded to local authorities' },
    { date: new Date(2020, 0, 1), label: '2020: courts suspended during COVID' },
  ];

  const clearanceAnnotations: Annotation[] = [
    { date: new Date(2021, 6, 1), label: '2021/22: cost methodology changed' },
  ];

  // ── Derived values ──────────────────────────────────────────────────────

  const latestIncident = data?.incidents[data.incidents.length - 1];
  const firstIncident = data?.incidents[0];
  const peakIncident = data?.incidents.reduce((a, b) => a.total > b.total ? a : b);
  const latestEnforcement = data?.enforcementActions[data.enforcementActions.length - 1];
  const firstEnforcement = data?.enforcementActions[0];
  const latestCost = data?.clearanceCosts[data.clearanceCosts.length - 1];

  const incidentChange = latestIncident && firstIncident
    ? Math.round(((latestIncident.total - firstIncident.total) / firstIncident.total) * 100)
    : 52;

  const penaltyChange = latestEnforcement && firstEnforcement
    ? Math.round(((latestEnforcement.fixedPenalties - firstEnforcement.fixedPenalties) / firstEnforcement.fixedPenalties) * 100)
    : 198;

  return (
    <>
      <TopicNav topic="Fly-Tipping" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Fly-Tipping"
          question="Is Fly-Tipping Getting Worse?"
          finding="Fly-tipping incidents in England exceeded one million for the sixth consecutive year in 2023/24. Household waste accounts for 59% of all incidents, and local authorities now issue three times as many fixed penalty notices as they did a decade ago — but prosecutions have halved."
          colour="#6B7280"
          preposition="with"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Fly-tipping in England has become a chronic, structural problem. In 2023/24, local authorities dealt with an estimated 1.08 million incidents — a 52% increase on a decade earlier. The single biggest category is household waste, which accounts for 59% of all incidents. The connection to local council charging policies is well established: as more councils introduced fees for bulky waste collection (typically between 25 and 50 pounds per item), illegal dumping rose in parallel. When Oldham Council scrapped its bulky waste collection charges in a 2019 trial, fly-tipping fell by 48% in the affected area. Despite this evidence, fewer than a quarter of English councils currently offer free bulky waste collection.</p>
            <p>The enforcement picture reveals a quiet transformation. Local authorities have shifted decisively from prosecutions to fixed penalty notices. In 2013/14, councils issued 26,300 fixed penalty notices and brought 2,171 prosecutions. By 2023/24, fixed penalties had tripled to 78,500, while prosecutions had halved to 1,085. This reflects both pragmatism — FPNs are cheaper and faster to administer — and the erosion of local authority legal capacity after a decade of funding cuts. The Environment Agency handles the largest and most serious cases, including organised criminal dumping of construction and hazardous waste, but its own enforcement resources have been substantially reduced.</p>
            <p>The cost figures require careful reading. DEFRA changed its clearance cost methodology in 2021/22 to measure direct clearance expenditure only, excluding investigation and enforcement overheads. This caused the reported figure to drop from around 63 million pounds to 15 million pounds. The reduction is statistical, not real — councils are spending more in total, but the headline number no longer captures the full burden. Before the change, clearance and enforcement combined cost councils an estimated 392 million pounds annually when indirect costs are included. Private land fly-tipping, which landowners must clear at their own expense, is not systematically recorded at all.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-incidents', label: 'Incidents' },
          { id: 'sec-enforcement', label: 'Enforcement' },
          { id: 'sec-costs', label: 'Costs' },
          { id: 'sec-regional', label: 'Regional' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Fly-tipping incidents (annual)"
            value={latestIncident ? (latestIncident.total / 1000000).toFixed(2) + 'M' : '1.08M'}
            unit="2023/24"
            direction="up"
            polarity="up-is-bad"
            changeText={`+${incidentChange}% since ${firstIncident?.year ?? 2013} · ${latestIncident?.householdWastePct ?? 59}% household waste`}
            sparklineData={
              data ? sparkFrom(data.incidents.map(d => d.total)) : []
            }
            source="DEFRA -- Fly-tipping statistics, 2023/24"
            href="#sec-incidents"
          />
          <MetricCard
            label="Fixed penalty notices issued"
            value={latestEnforcement ? latestEnforcement.fixedPenalties.toLocaleString() : '78,500'}
            unit="2023/24"
            direction="up"
            polarity="up-is-good"
            changeText={`+${penaltyChange}% since ${firstEnforcement?.year ?? 2013} · prosecutions down 50%`}
            sparklineData={
              data ? sparkFrom(data.enforcementActions.map(d => d.fixedPenalties)) : []
            }
            source="DEFRA -- Fly-tipping statistics, 2023/24"
            href="#sec-enforcement"
          />
          <MetricCard
            label="Prosecutions (annual)"
            value={latestEnforcement ? latestEnforcement.prosecutions.toLocaleString() : '1,085'}
            unit="2023/24"
            direction="down"
            polarity="up-is-good"
            changeText={`Down from ${firstEnforcement?.prosecutions.toLocaleString() ?? '2,171'} in ${firstEnforcement?.year ?? 2013} · councils shifting to FPNs`}
            sparklineData={
              data ? sparkFrom(data.enforcementActions.map(d => d.prosecutions)) : []
            }
            source="DEFRA -- Fly-tipping statistics, 2023/24"
            href="#sec-costs"
          />
        </div>

        {/* Chart 1: Incident trends */}
        <ScrollReveal>
          <div id="sec-incidents" className="mb-12">
            <LineChart
              series={incidentSeries}
              title="Fly-tipping incidents in England, 2013/14 -- 2023/24"
              subtitle="Annual local-authority-reported incidents. Exceeded one million in six of the last seven years."
              yLabel="Incidents"
              annotations={incidentAnnotations}
              source={{
                name: 'DEFRA',
                dataset: 'Fly-tipping incidents and actions taken in England',
                frequency: 'annual',
                url: 'https://www.gov.uk/government/statistics/fly-tipping-in-england',
                date: 'Oct 2024',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 2: Enforcement actions */}
        <ScrollReveal>
          <div id="sec-enforcement" className="mb-12">
            <LineChart
              series={enforcementSeries}
              title="Enforcement actions: fixed penalties vs prosecutions, 2013/14 -- 2023/24"
              subtitle="Fixed penalty notices have tripled while prosecutions have halved. Councils favour speed and cost over criminal proceedings."
              yLabel="Actions"
              annotations={enforcementAnnotations}
              source={{
                name: 'DEFRA',
                dataset: 'Fly-tipping incidents and actions taken in England',
                frequency: 'annual',
                url: 'https://www.gov.uk/government/statistics/fly-tipping-in-england',
                date: 'Oct 2024',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 3: Clearance costs */}
        <ScrollReveal>
          <div id="sec-costs" className="mb-12">
            <LineChart
              series={clearanceSeries}
              title="Local authority clearance costs (£ millions), 2013/14 -- 2023/24"
              subtitle="Methodology changed in 2021/22 to exclude investigation and enforcement overheads. Drop is statistical, not real."
              yLabel="Cost (£m)"
              annotations={clearanceAnnotations}
              source={{
                name: 'DEFRA',
                dataset: 'Fly-tipping incidents and actions taken in England',
                frequency: 'annual',
                url: 'https://www.gov.uk/government/statistics/fly-tipping-in-england',
                date: 'Oct 2024',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Regional variation */}
        <ScrollReveal>
          <div id="sec-regional" className="mb-12">
            <div className="bg-white rounded-lg border border-wiah-border p-8">
              <h2 className="text-lg font-bold text-wiah-black mb-2">
                Fly-tipping rate by region (incidents per 1,000 population)
              </h2>
              <p className="text-sm text-wiah-mid mb-6">
                London reports the highest rate, driven by high-density housing with limited waste storage and variable council collection services.
              </p>
              <div className="mt-6 space-y-4">
                {data?.byRegion.map((r) => {
                  const pct = (r.incidentsPerThousand / 6.5) * 100;
                  return (
                    <div key={r.region}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-wiah-black">{r.region}</span>
                        <span className="font-mono text-sm font-bold text-wiah-black">{r.incidentsPerThousand}</span>
                      </div>
                      <div className="h-6 bg-wiah-light rounded-sm overflow-hidden">
                        <div
                          className="h-full rounded-sm transition-all"
                          style={{ width: `${pct}%`, backgroundColor: '#6B7280' }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="font-mono text-xs text-wiah-mid mt-4">Source: DEFRA -- Fly-tipping incidents and actions taken in England, 2023/24</p>
            </div>
          </div>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Free bulky waste collection reduces fly-tipping"
            value="48%"
            unit="reduction"
            description="When Oldham Council scrapped its bulky waste collection charges in a 2019 pilot, fly-tipping in the area fell by 48%. Similar trials in Newham and Bexley produced comparable results. The evidence is consistent: making legal disposal free and convenient at the point of use is the single most effective intervention against household fly-tipping. Councils that have adopted free collection report lower clearance costs, reduced enforcement spend, and cleaner neighbourhoods — a net saving despite the upfront cost of providing the service."
            source="Source: DEFRA -- Fly-tipping statistics. Oldham Council pilot evaluation, 2020. Keep Britain Tidy research, 2023."
          />
        </ScrollReveal>

        {/* Sources & Methodology */}
        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p>
              <a href="https://www.gov.uk/government/statistics/fly-tipping-in-england" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DEFRA</a> -- Fly-tipping incidents and actions taken in England. Retrieved February 2026.
            </p>
            <p>
              Incident counts are based on reports by local authorities in England. The definition of fly-tipping covers illegal deposit of waste on land, contrary to Section 33 of the Environmental Protection Act 1990.
            </p>
            <p>
              Clearance cost methodology changed in 2021/22 to measure direct clearance costs only, excluding investigation and enforcement overheads. Figures before and after this change are not directly comparable.
            </p>
            <p>
              Private land fly-tipping is not systematically recorded and is excluded from all figures shown.
            </p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
