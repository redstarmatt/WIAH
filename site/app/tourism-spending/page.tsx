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
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'ONS', dataset: 'Overseas Travel and Tourism', url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/leisureandtourism/bulletins/overseastravelandtourism/latestrelease', date: 'Q4 2025' },
  { num: 2, name: 'VisitBritain', dataset: 'Inbound Tourism Statistics', url: 'https://www.visitbritain.org/research-insights/inbound-tourism-trends', date: '2025' },
  { num: 3, name: 'ONS', dataset: 'GB Tourism Survey / GB Day Visits Survey', url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/leisureandtourism', date: '2025' },
  { num: 4, name: 'DCMS', dataset: 'Tourism Satellite Account — Employment Estimates', url: 'https://www.gov.uk/government/collections/tourism-sector-deal', date: '2025' },
];

// ── Types ────────────────────────────────────────────────────────────────────

interface SpendingPoint {
  year: number;
  billions: number;
}

interface EmploymentPoint {
  year: number;
  millions: number;
}

interface VisitorPoint {
  year: number;
  millions: number;
}

interface RegionData {
  region: string;
  sharePercent: number;
  spendBillions: number;
}

interface TourismData {
  overseasSpending: SpendingPoint[];
  domesticSpending: SpendingPoint[];
  tourismEmployment: EmploymentPoint[];
  visitorNumbers: VisitorPoint[];
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

export default function TourismSpendingPage() {
  const [data, setData] = useState<TourismData | null>(null);

  useEffect(() => {
    fetch('/data/tourism-spending/tourism_spending.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const overseasSeries: Series[] = data
    ? [
        {
          id: 'overseas',
          label: 'Overseas visitor spending (£bn)',
          colour: '#264653',
          data: data.overseasSpending.map(d => ({
            date: yearToDate(d.year),
            value: d.billions,
          })),
        },
        {
          id: 'domestic',
          label: 'Domestic tourism spending (£bn)',
          colour: '#6B7280',
          data: data.domesticSpending.map(d => ({
            date: yearToDate(d.year),
            value: d.billions,
          })),
        },
      ]
    : [];

  const visitorSeries: Series[] = data
    ? [{
        id: 'visitors',
        label: 'Overseas visitors (millions)',
        colour: '#264653',
        data: data.visitorNumbers.map(d => ({
          date: yearToDate(d.year),
          value: d.millions,
        })),
      }]
    : [];

  const employmentSeries: Series[] = data
    ? [{
        id: 'employment',
        label: 'Tourism employment (millions)',
        colour: '#2A9D8F',
        data: data.tourismEmployment.map(d => ({
          date: yearToDate(d.year),
          value: d.millions,
        })),
      }]
    : [];

  const spendingAnnotations: Annotation[] = [
    { date: new Date(2020, 0, 1), label: '2020: COVID-19 · international travel collapses' },
    { date: new Date(2016, 5, 1), label: '2016: Brexit vote · sterling falls 15%' },
  ];

  const visitorAnnotations: Annotation[] = [
    { date: new Date(2020, 0, 1), label: '2020: COVID · visitors fall 73%' },
    { date: new Date(2024, 0, 1), label: '2024: recovery to pre-pandemic levels' },
  ];

  const employmentAnnotations: Annotation[] = [
    { date: new Date(2020, 0, 1), label: '2020: 44% of tourism jobs lost' },
  ];

  // ── Derived metrics ───────────────────────────────────────────────────

  const latestOverseas = data?.overseasSpending[data.overseasSpending.length - 1];
  const prePandemicOverseas = data?.overseasSpending.find(d => d.year === 2019);
  const latestVisitors = data?.visitorNumbers[data.visitorNumbers.length - 1];
  const latestEmployment = data?.tourismEmployment[data.tourismEmployment.length - 1];
  const prePandemicEmployment = data?.tourismEmployment.find(d => d.year === 2019);

  const overseasChange = latestOverseas && prePandemicOverseas
    ? ((latestOverseas.billions - prePandemicOverseas.billions) / prePandemicOverseas.billions * 100).toFixed(0)
    : '+22';

  return (
    <>
      <TopicNav topic="Tourism Spending" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Tourism Spending"
          question="Is Britain Good at Attracting Tourists?"
          finding="Overseas visitors spent an estimated £32.8 billion in the UK in 2025 — surpassing pre-pandemic levels for the first time. Domestic tourism spending has stabilised at £74.5 billion. The sector now employs 3.2 million people, but spending is overwhelmingly concentrated in London."
          colour="#264653"
          preposition="with"
        />

        {/* Editorial context */}
        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              The UK tourism sector has staged a remarkable recovery. Overseas visitor spending collapsed from £27 billion in 2019 to just £7 billion in 2020 — a 74% fall that wiped out a decade of growth in a single quarter.<Cite nums={1} /> By 2024, spending had recovered to £31.1 billion, and provisional 2025 figures suggest it has reached £32.8 billion. Sterling's post-Brexit depreciation, which made the UK roughly 15% cheaper for dollar- and euro-denominated visitors, played an underappreciated role in accelerating the rebound. The UK now ranks fifth globally for inbound tourism receipts, behind the United States, Spain, France, and Turkey.<Cite nums={2} />
            </p>
            <p>
              Domestic tourism tells a more complicated story. The 2021 staycation boom pushed UK residents' holiday spending to a record £82 billion as international travel remained restricted.<Cite nums={3} /> That figure has since fallen back to around £74.5 billion as outbound travel recovered — British tourists are once again spending more abroad than foreign visitors spend here, maintaining the UK's persistent tourism trade deficit. The structural challenge is geographic concentration: London captures 54% of all overseas visitor spending, while the entire north of England — from Liverpool to Newcastle — accounts for roughly 12%.<Cite nums={2} /> VisitBritain's "Discover England" fund and the devolved tourism agencies have made incremental progress, but the capital's dominance remains largely unchanged over two decades.
            </p>
            <p>
              Employment recovery has been uneven. The sector lost 44% of its workforce during the pandemic, and many experienced hospitality workers moved permanently into other industries.<Cite nums={4} /> Recruitment difficulties persist, compounded by post-Brexit restrictions on EU workers who previously filled a significant share of seasonal and entry-level tourism roles. The ONS estimates 3.2 million people now work in tourism-related roles — back to pre-pandemic levels in headcount terms, though the proportion of part-time and zero-hours contracts has increased.<Cite nums={4} /> Tourism contributes roughly 10% of UK GDP when indirect effects are included, making it the country's third-largest export sector behind financial services and advanced manufacturing.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-spending', label: 'Spending trends' },
          { id: 'sec-visitors', label: 'Visitor numbers' },
          { id: 'sec-employment', label: 'Employment' },
          { id: 'sec-regional', label: 'Regional' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Overseas visitor spending (£bn)"
            value={latestOverseas ? `${latestOverseas.billions}` : '32.8'}
            unit="2025 est."
            direction="up"
            polarity="up-is-good"
            changeText={`+${overseasChange}% vs 2019 · surpassed pre-pandemic peak`}
            sparklineData={
              data ? sparkFrom(data.overseasSpending.map(d => d.billions)) : [25.2,26.3,27,7,20,27,31.1,32.8]
            }
            source="ONS — Overseas Travel and Tourism, Q4 2025"
            href="#sec-spending"
          />
          <MetricCard
            label="Overseas visitors (millions)"
            value={latestVisitors ? `${latestVisitors.millions}` : '41.2'}
            unit="2025 est."
            direction="up"
            polarity="up-is-good"
            changeText="above 2019 record of 40.9m for the first time"
            sparklineData={
              data ? sparkFrom(data.visitorNumbers.map(d => d.millions)) : [37.9,40.9,11.1,19.7,31.2,38.1,40.4,41.2]
            }
            source="ONS — International Passenger Survey, 2025"
            href="#sec-visitors"
          />
          <MetricCard
            label="Tourism employment (millions)"
            value={latestEmployment ? `${latestEmployment.millions}` : '3.2'}
            unit="2025"
            direction="up"
            polarity="up-is-good"
            changeText={
              latestEmployment && prePandemicEmployment
                ? `recovered to pre-pandemic level of ${prePandemicEmployment.millions}m · 10% of UK GDP`
                : 'recovered to pre-pandemic level · 10% of UK GDP'
            }
            sparklineData={
              data ? sparkFrom(data.tourismEmployment.map(d => d.millions)) : [3.2,1.8,2.3,2.7,2.9,3.1,3.2]
            }
            source="DCMS — Tourism Satellite Account, 2025"
            href="#sec-employment"
          />
        </div>

        {/* Chart 1: Overseas + domestic spending */}
        <ScrollReveal>
          <div id="sec-spending" className="mb-12">
            <LineChart
              series={overseasSeries}
              title="Tourism spending in the UK, 2010–2025"
              subtitle="Overseas visitor spending and UK domestic tourism spending (£ billions, nominal). Sterling depreciation post-2016 boosted inbound spending."
              yLabel="£ billions"
              annotations={spendingAnnotations}
              source={{
                name: 'ONS',
                dataset: 'Overseas Travel and Tourism / GB Tourism Survey',
                frequency: 'quarterly / annual',
                url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/leisureandtourism/bulletins/overseastravelandtourism/latestrelease',
                date: 'Q4 2025',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 2: Visitor numbers */}
        <ScrollReveal>
          <div id="sec-visitors" className="mb-12">
            <LineChart
              series={visitorSeries}
              title="Overseas visitors to the UK, 2010–2025"
              subtitle="Annual inbound visitor numbers (millions). Collapsed 73% in 2020, now surpassing pre-pandemic record."
              yLabel="Visitors (millions)"
              annotations={visitorAnnotations}
              source={{
                name: 'ONS / VisitBritain',
                dataset: 'International Passenger Survey — Inbound Visits',
                frequency: 'annual',
                url: 'https://www.visitbritain.org/research-insights/inbound-tourism-trends',
                date: '2025',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 3: Employment */}
        <ScrollReveal>
          <div id="sec-employment" className="mb-12">
            <LineChart
              series={employmentSeries}
              title="Tourism-related employment, UK, 2015–2025"
              subtitle="Direct and indirect employment in tourism (millions). Lost 44% of workforce in 2020, since recovered in headcount terms."
              yLabel="Employment (millions)"
              annotations={employmentAnnotations}
              source={{
                name: 'DCMS',
                dataset: 'Tourism Satellite Account — Employment Estimates',
                frequency: 'annual',
                url: 'https://www.gov.uk/government/collections/tourism-sector-deal',
                date: '2025',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Regional breakdown */}
        <ScrollReveal>
          <div id="sec-regional" className="mb-12">
            <div className="bg-white rounded-lg border border-wiah-border p-8">
              <h2 className="text-lg font-bold text-wiah-black mb-2">
                Overseas visitor spending by region (% share)
              </h2>
              <p className="text-sm text-wiah-mid mb-6">
                London captures over half of all overseas visitor spending. The entire north of England accounts for roughly 12%.
              </p>
              <div className="mt-6 space-y-4">
                {data?.byRegion.map((r) => {
                  const pct = (r.sharePercent / 54) * 100;
                  return (
                    <div key={r.region}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-wiah-black">{r.region}</span>
                        <span className="font-mono text-sm font-bold text-wiah-black">
                          {r.sharePercent}% · £{r.spendBillions}bn
                        </span>
                      </div>
                      <div className="h-6 bg-wiah-light rounded-sm overflow-hidden">
                        <div
                          className="h-full rounded-sm transition-all"
                          style={{ width: `${pct}%`, backgroundColor: '#264653' }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="font-mono text-xs text-wiah-mid mt-4">
                Source: ONS — Overseas Travel and Tourism, regional estimates, 2024
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Post-pandemic recovery now complete"
            value="£32.8bn"
            unit="overseas visitor spending, 2025"
            description="Overseas visitor spending has surpassed its pre-pandemic peak for the first time. At £32.8 billion in 2025, it exceeds the 2019 figure of £27 billion by 22% in nominal terms. Visitor numbers have also recovered, reaching an estimated 41.2 million — above the 2019 record of 40.9 million. Tourism employment is back to 3.2 million, matching 2019 levels. The UK's tourism trade deficit persists — British residents spend more abroad than foreign visitors spend here — but the gap has narrowed. The sector's contribution to GDP, at roughly 10%, makes it one of the UK's most important service exports."
            source="Source: ONS — Overseas Travel and Tourism, Q4 2025. VisitBritain inbound statistics 2025. DCMS Tourism Satellite Account 2025."
          />
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        {/* Sources & methodology */}
        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p>
              <a href="https://www.ons.gov.uk/peoplepopulationandcommunity/leisureandtourism/bulletins/overseastravelandtourism/latestrelease" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ONS — Overseas Travel and Tourism</a> — overseas visitor spending and visitor numbers. Quarterly, based on the International Passenger Survey. Retrieved Feb 2026.
            </p>
            <p>
              <a href="https://www.visitbritain.org/research-insights/inbound-tourism-trends" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">VisitBritain — Inbound Tourism Statistics</a> — visitor numbers, spending by region, purpose of visit. Annual. Retrieved Feb 2026.
            </p>
            <p>
              <a href="https://www.ons.gov.uk/peoplepopulationandcommunity/leisureandtourism" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ONS — GB Tourism Survey / GB Day Visits Survey</a> — domestic tourism spending estimates. Annual. Retrieved Feb 2026.
            </p>
            <p>
              <a href="https://www.gov.uk/government/collections/tourism-sector-deal" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DCMS — Tourism Sector Deal</a> — employment estimates using Tourism Satellite Account methodology. Annual. Retrieved Feb 2026.
            </p>
            <p className="mt-4">
              All spending values are nominal (not inflation-adjusted). IPS methodology was revised in 2019 — regional breakdowns may not be directly comparable with earlier years. Domestic tourism figures for 2020–21 are estimates due to survey disruption. Employment figures count headcount including part-time and seasonal roles, not FTE.
            </p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
