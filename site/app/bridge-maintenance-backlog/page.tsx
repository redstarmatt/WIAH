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

interface BacklogPoint {
  year: number;
  billions: number;
}

interface WeightRestrictedPoint {
  year: number;
  count: number;
}

interface SubstandardPoint {
  year: number;
  percent: number;
}

interface RegionData {
  region: string;
  backlogMillions: number;
  substandard: number;
}

interface BridgeData {
  maintenanceBacklog: BacklogPoint[];
  weightRestrictedBridges: WeightRestrictedPoint[];
  substandardBridges: SubstandardPoint[];
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

export default function BridgeMaintenanceBacklogPage() {
  const [data, setData] = useState<BridgeData | null>(null);

  useEffect(() => {
    fetch('/data/bridge-maintenance-backlog/bridge_maintenance_backlog.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const backlogSeries: Series[] = data
    ? [{
        id: 'backlog',
        label: 'Maintenance backlog (£ billions)',
        colour: '#E63946',
        data: data.maintenanceBacklog.map(d => ({
          date: yearToDate(d.year),
          value: d.billions,
        })),
      }]
    : [];

  const weightRestrictedSeries: Series[] = data
    ? [{
        id: 'weight-restricted',
        label: 'Weight-restricted bridges',
        colour: '#6B7280',
        data: data.weightRestrictedBridges.map(d => ({
          date: yearToDate(d.year),
          value: d.count,
        })),
      }]
    : [];

  const substandardSeries: Series[] = data
    ? [{
        id: 'substandard',
        label: 'Substandard bridges (%)',
        colour: '#F4A261',
        data: data.substandardBridges.map(d => ({
          date: yearToDate(d.year),
          value: d.percent,
        })),
      }]
    : [];

  // ── Derived values ──────────────────────────────────────────────────────

  const latestBacklog = data?.maintenanceBacklog[data.maintenanceBacklog.length - 1];
  const earliestBacklog = data?.maintenanceBacklog[0];
  const latestWeightRestricted = data?.weightRestrictedBridges[data.weightRestrictedBridges.length - 1];
  const earliestWeightRestricted = data?.weightRestrictedBridges[0];
  const latestSubstandard = data?.substandardBridges[data.substandardBridges.length - 1];

  const backlogGrowth = latestBacklog && earliestBacklog
    ? Math.round(((latestBacklog.billions - earliestBacklog.billions) / earliestBacklog.billions) * 100)
    : 163;

  const weightGrowth = latestWeightRestricted && earliestWeightRestricted
    ? Math.round(((latestWeightRestricted.count - earliestWeightRestricted.count) / earliestWeightRestricted.count) * 100)
    : 81;

  // ── Annotations ─────────────────────────────────────────────────────────

  const backlogAnnotations: Annotation[] = [
    { date: new Date(2010, 6, 1), label: '2010: Austerity begins' },
    { date: new Date(2020, 2, 1), label: '2020: COVID disrupts inspections' },
  ];

  const weightAnnotations: Annotation[] = [
    { date: new Date(2014, 0, 1), label: '2014: 44t HGV limit raised' },
  ];

  const substandardAnnotations: Annotation[] = [
    { date: new Date(2016, 0, 1), label: '2016: Reporting methodology updated' },
  ];

  return (
    <>
      <TopicNav topic="Bridge Maintenance Backlog" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Bridge Maintenance Backlog"
          question="Are Britain's bridges actually safe?"
          finding="England's local road bridge maintenance backlog has surpassed £2 billion for the first time. Nearly three in ten bridges are now rated substandard, weight restrictions are rising steadily, and the gap between what councils spend and what the infrastructure requires grows every year."
          colour="#E63946"
          preposition="with"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              England's local highway authorities are responsible for roughly 72,000 road bridges, and the
              accumulated cost of bringing them all back to good repair has now passed £2 billion for the first
              time. That figure has more than doubled since 2010, when austerity-era cuts to local government
              capital funding began a sustained squeeze on maintenance budgets. The consequence is not
              dramatic collapse — though the 2019 partial failure of a bridge in Rochdale and the prolonged
              closure of Hammersmith Bridge in London offered vivid previews — but a slow, compounding
              degradation that makes the network progressively less reliable and more expensive to fix.
            </p>
            <p>
              The most visible symptom is the rising number of weight-restricted bridges. Over 2,100 bridges
              in England now carry weight limits below the standard 40-tonne threshold, forcing HGVs onto
              longer diversions that add cost to haulage, increase emissions, and concentrate wear on
              alternative routes. For rural communities, a single bridge restriction can sever the most direct
              route to a market town, a school, or a hospital. The RAC Foundation has estimated that each
              restricted bridge costs the surrounding economy between £100,000 and £500,000 annually in
              additional transport costs. Nearly 29% of local authority bridges are now rated substandard on
              principal inspection — not necessarily unsafe for current loads, but deteriorating faster than
              they are being repaired, and increasingly likely to require emergency intervention.
            </p>
            <p>
              The underlying economics are stark. Local authorities have seen their overall spending power
              fall by roughly 26% in real terms since 2010, and bridge maintenance competes for funding
              against potholes, social care, and housing. The Department for Transport allocates capital
              maintenance funding through a formula that has not kept pace with either construction cost
              inflation or the accelerating deterioration curve. A 2024 National Audit Office report found
              that councils would need to spend three to four times their current bridge maintenance budgets
              simply to prevent the backlog from growing further. Without a step change in capital investment,
              the trajectory points to an increasing number of emergency closures, reactive repairs at
              multiples of preventive cost, and a growing drag on local economies that already face
              significant infrastructure disadvantage.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-backlog', label: 'Maintenance backlog' },
          { id: 'sec-weight', label: 'Weight restrictions' },
          { id: 'sec-substandard', label: 'Condition ratings' },
          { id: 'sec-regional', label: 'Regional' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Bridge maintenance backlog"
            value={latestBacklog ? `£${latestBacklog.billions.toFixed(1)}bn` : '£2.1bn'}
            unit="2025"
            direction="up"
            polarity="up-is-bad"
            changeText={`up ${backlogGrowth}% since 2010 · doubled in 15 years`}
            sparklineData={
              data ? sparkFrom(data.maintenanceBacklog.map(d => d.billions)) : []
            }
            source="DfT — Road Condition Statistics, 2025"
            href="#sec-backlog"
          />
          <MetricCard
            label="Weight-restricted bridges"
            value={latestWeightRestricted ? latestWeightRestricted.count.toLocaleString() : '2,140'}
            unit="2025"
            direction="up"
            polarity="up-is-bad"
            changeText={`up ${weightGrowth}% since 2010 · HGV diversions increasing`}
            sparklineData={
              data ? sparkFrom(data.weightRestrictedBridges.map(d => d.count)) : []
            }
            source="RAC Foundation — Bridge Analysis, 2025"
            href="#sec-weight"
          />
          <MetricCard
            label="Bridges rated substandard"
            value={latestSubstandard ? `${latestSubstandard.percent}%` : '29.1%'}
            unit="2025"
            direction="up"
            polarity="up-is-bad"
            changeText="up from 18.2% in 2010 · nearly 1 in 3 bridges"
            sparklineData={
              data ? sparkFrom(data.substandardBridges.map(d => d.percent)) : []
            }
            source="DfT — Local Authority Returns, 2025"
            href="#sec-substandard"
          />
        </div>

        {/* Chart 1: Maintenance backlog */}
        <ScrollReveal>
          <div id="sec-backlog" className="mb-12">
            <LineChart
              series={backlogSeries}
              title="Local road bridge maintenance backlog, England, 2010-2025"
              subtitle="Estimated cost to return all local authority highway bridges to good repair. Has more than doubled since austerity began."
              yLabel="£ billions"
              annotations={backlogAnnotations}
              source={{
                name: 'Department for Transport',
                dataset: 'Road Condition and Maintenance Statistics',
                frequency: 'annual',
                url: 'https://www.gov.uk/government/statistical-data-sets/road-condition-statistics-data-tables-rdc',
                date: 'Nov 2025',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 2: Weight-restricted bridges */}
        <ScrollReveal>
          <div id="sec-weight" className="mb-12">
            <LineChart
              series={weightRestrictedSeries}
              title="Bridges with weight restrictions, England, 2010-2025"
              subtitle="Number of local authority bridges with posted weight limits below the 40/44-tonne HGV standard."
              yLabel="Bridges"
              annotations={weightAnnotations}
              source={{
                name: 'RAC Foundation',
                dataset: 'Bridge Condition and Weight Restriction Analysis',
                frequency: 'annual',
                url: 'https://www.racfoundation.org/research/economy/road-bridge-maintenance',
                date: 'Oct 2025',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 3: Substandard bridges */}
        <ScrollReveal>
          <div id="sec-substandard" className="mb-12">
            <LineChart
              series={substandardSeries}
              title="Bridges rated substandard on principal inspection, England, 2010-2025"
              subtitle="Percentage of local authority bridges falling below required condition standard. Rising steadily as maintenance budgets contract."
              yLabel="% substandard"
              annotations={substandardAnnotations}
              source={{
                name: 'Department for Transport',
                dataset: 'Local Authority Bridge Condition Returns',
                frequency: 'annual',
                url: 'https://www.gov.uk/government/statistical-data-sets/road-condition-statistics-data-tables-rdc',
                date: 'Nov 2025',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Regional variation */}
        <ScrollReveal>
          <div id="sec-regional" className="mb-12">
            <div className="bg-white rounded-lg border border-wiah-border p-8">
              <h2 className="text-lg font-bold text-wiah-black mb-2">
                Bridge maintenance backlog by region (£ millions)
              </h2>
              <p className="text-sm text-wiah-mid mb-6">
                Northern regions carry the largest backlog relative to their bridge stock, reflecting older infrastructure and lower capital investment.
              </p>
              <div className="mt-6 space-y-4">
                {data?.byRegion.map((r) => {
                  const maxBacklog = 320;
                  const pct = (r.backlogMillions / maxBacklog) * 100;
                  return (
                    <div key={r.region}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-wiah-black">{r.region}</span>
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs text-wiah-mid">{r.substandard}% substandard</span>
                          <span className="font-mono text-sm font-bold text-wiah-black">£{r.backlogMillions}m</span>
                        </div>
                      </div>
                      <div className="h-6 bg-wiah-light rounded-sm overflow-hidden">
                        <div
                          className="h-full rounded-sm transition-all"
                          style={{ width: `${pct}%`, backgroundColor: r.substandard > 30 ? '#E63946' : r.substandard > 27 ? '#F4A261' : '#6B7280' }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="font-mono text-xs text-wiah-mid mt-4">
                Source: DfT — Local Authority Road Condition and Maintenance Statistics, 2025. RAC Foundation bridge analysis.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Preventive maintenance yields 4:1 return on investment"
            value="£4 saved"
            unit="per £1 spent"
            description="Research by the ADEPT Bridges Group and the UK Bridges Board demonstrates that every £1 invested in planned preventive bridge maintenance avoids approximately £4 in future reactive repair costs. Councils that have maintained consistent inspection and treatment programmes — notably Devon, which ring-fences bridge budgets — show measurably slower deterioration rates and fewer emergency closures than the national average. The evidence strongly supports a shift from the current reactive model to a sustained preventive investment programme, though this requires multi-year capital funding commitments that the current annual settlement cycle does not support."
            source="Source: ADEPT / County Surveyors Society — ALARM Survey, 2025. National Audit Office — Local Road Condition and Maintenance, 2024."
          />
        </ScrollReveal>

        {/* Sources & Methodology */}
        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p>
              <a href="https://www.gov.uk/government/statistical-data-sets/road-condition-statistics-data-tables-rdc" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">
                Department for Transport — Road Condition and Maintenance Statistics
              </a>{' '}
              — primary data source for backlog estimates and condition ratings. Retrieved Nov 2025.
            </p>
            <p>
              <a href="https://www.racfoundation.org/research/economy/road-bridge-maintenance" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">
                RAC Foundation — Bridge Condition and Weight Restriction Analysis
              </a>{' '}
              — weight restriction counts and economic impact estimates. Retrieved Oct 2025.
            </p>
            <p>
              <a href="https://www.asphaltindustryalliance.com/alarm-survey.asp" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">
                ADEPT / County Surveyors Society — ALARM Survey
              </a>{' '}
              — annual local authority road and bridge maintenance survey. Retrieved Sep 2025.
            </p>
            <p>
              All figures are for England unless otherwise stated. Backlog figures represent estimated costs at current prices.
              Substandard ratings are based on principal inspection results returned by local highway authorities to DfT.
              Reporting methodology was updated in 2016 to include retaining walls and culverts in some authority returns.
              COVID-19 disrupted inspection schedules in 2020-21, so condition data for those years may understate deterioration.
            </p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}