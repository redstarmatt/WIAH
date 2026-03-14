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
  { num: 1, name: 'DLUHC', dataset: 'Council Taxbase statistics — Table CTSOP4.0', date: '2024' },
  { num: 2, name: 'Action on Empty Homes', dataset: 'Empty Homes in England', date: '2024' },
  { num: 3, name: 'DLUHC', dataset: 'Levelling Up and Regeneration Act 2023' },
];

// ── Types ────────────────────────────────────────────────────────────────────

interface EmptyHomesPoint {
  year: number;
  total: number;
}

interface CouncilTaxPremiumPoint {
  year: number;
  properties: number;
}

interface RegionData {
  region: string;
  emptyPerThousand: number;
}

interface EmptyHomesData {
  emptyHomes: EmptyHomesPoint[];
  longTermEmpty: EmptyHomesPoint[];
  councilTaxPremium: CouncilTaxPremiumPoint[];
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

export default function EmptyHomesPage() {
  const [data, setData] = useState<EmptyHomesData | null>(null);

  useEffect(() => {
    fetch('/data/empty-homes-housing-waste/empty_homes_housing_waste.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const emptyHomesSeries: Series[] = data
    ? [{
        id: 'empty-homes',
        label: 'Total empty dwellings',
        colour: '#E63946',
        data: data.emptyHomes.map(d => ({
          date: yearToDate(d.year),
          value: d.total,
        })),
      }]
    : [];

  const longTermEmptySeries: Series[] = data
    ? [{
        id: 'long-term-empty',
        label: 'Long-term empty (6+ months)',
        colour: '#F4A261',
        data: data.longTermEmpty.map(d => ({
          date: yearToDate(d.year),
          value: d.total,
        })),
      }]
    : [];

  const councilTaxSeries: Series[] = data
    ? [{
        id: 'council-tax-premium',
        label: 'Properties subject to council tax premium',
        colour: '#2A9D8F',
        data: data.councilTaxPremium.map(d => ({
          date: yearToDate(d.year),
          value: d.properties,
        })),
      }]
    : [];

  const latestEmpty = data?.emptyHomes[data.emptyHomes.length - 1];
  const prevEmpty = data?.emptyHomes[data.emptyHomes.length - 2];
  const latestLongTerm = data?.longTermEmpty[data.longTermEmpty.length - 1];
  const prevLongTerm = data?.longTermEmpty[data.longTermEmpty.length - 2];
  const latestPremium = data?.councilTaxPremium[data.councilTaxPremium.length - 1];
  const prevPremium = data?.councilTaxPremium[data.councilTaxPremium.length - 2];

  const emptyChange = latestEmpty && prevEmpty
    ? Math.round(((latestEmpty.total - prevEmpty.total) / prevEmpty.total) * 100)
    : 11;

  const longTermChange = latestLongTerm && prevLongTerm
    ? Math.round(((latestLongTerm.total - prevLongTerm.total) / prevLongTerm.total) * 100)
    : 9;

  const premiumChange = latestPremium && prevPremium
    ? Math.round(((latestPremium.properties - prevPremium.properties) / prevPremium.properties) * 100)
    : 19;

  return (
    <>
      <TopicNav topic="Housing" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Housing"
          question="Why are over a million homes sitting empty?"
          finding="England now has over one million empty dwellings — the highest figure in more than a decade. At the same time, 309,856 homes have been empty for six months or more, homelessness is rising, and waiting lists for social housing exceed 1.2 million households. Councils are fighting back with council tax premiums of up to 300%, but the gap between empty stock and unmet need continues to widen."
          colour="#F4A261"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              The paradox is stark: England has over a million empty homes while roughly 130,000 households are trapped in temporary accommodation and the social housing waiting list stands at 1.29 million.<Cite nums={[1]} /> Not all empty homes are the same — some are between tenancies, undergoing renovation, or caught in probate. But a significant and growing share are long-term empty: 309,856 properties have been vacant for six months or more, many held as investment assets or second homes in areas where local people cannot afford to buy.<Cite nums={[1]} /> In coastal and rural communities, second-home ownership has hollowed out villages, closing schools and pubs and pricing out the workers that tourism depends on. Cornwall, Northumberland, and parts of North Wales have become flashpoints, with some parishes reporting 30-40% of housing stock used as holiday lets or standing empty for most of the year.<Cite nums={[2]} />
            </p>
            <p>
              Councils now have the power to charge council tax premiums of up to 100% on properties empty for one year, rising to 200% after five years and 300% after ten.<Cite nums={[3]} /> The Levelling Up and Regeneration Act 2023 extended this further, allowing premiums on second homes from April 2025. These premiums are working: 152,932 properties now attract a premium charge, and councils that have adopted aggressive premium policies — such as Durham, which charges 200% after two years — report measurable reductions in long-term vacancies.<Cite nums={[1]} /> But premiums alone will not solve the problem. Empty Dwelling Management Orders (EDMOs) allow councils to take over properties that have been empty for two or more years and bring them back into use, yet uptake remains low: fewer than 100 EDMOs have been issued nationally since 2006, largely because councils lack the staff and legal resources to pursue them.<Cite nums={[2]} /> The Community Right to Contest, introduced in 2014, gives citizens the right to ask councils to investigate empty properties and consider compulsory sale — a power that remains almost entirely unused.
            </p>
            <p>
              Regional variation is significant. The North West and North East have the highest rates of empty homes per thousand dwellings, reflecting long-standing issues of low housing demand in some areas alongside speculation in others.<Cite nums={[1]} /> London, despite its acute housing crisis, has a lower empty-home rate because market pressure rapidly fills vacancies — but that figure masks thousands of high-value properties held empty as investment vehicles in prime central boroughs. The number of empty homes officers — council staff dedicated to identifying and returning vacant properties to use — has declined as local authority budgets have been cut.<Cite nums={[2]} /> Community-led housing organisations, including community land trusts, are beginning to fill the gap, acquiring and renovating empty properties for affordable local housing. But scale remains the challenge: voluntary effort cannot substitute for systematic policy enforcement across a stock of over a million vacant dwellings.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-total-empty', label: 'Total empty' },
          { id: 'sec-long-term', label: 'Long-term empty' },
          { id: 'sec-premiums', label: 'Council tax premiums' },
          { id: 'sec-regional', label: 'Regional' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Total empty dwellings"
            value={latestEmpty ? latestEmpty.total.toLocaleString() : '1,022,433'}
            unit="2024"
            direction="up"
            polarity="up-is-bad"
            changeText={`+${emptyChange}% year-on-year · highest since 2010`}
            sparklineData={
              data ? sparkFrom(data.emptyHomes.map(d => d.total)) : []
            }
            source="DLUHC · Council Taxbase statistics, 2024"
            href="#sec-total-empty"
          />
          <MetricCard
            label="Long-term empty (6+ months)"
            value={latestLongTerm ? latestLongTerm.total.toLocaleString() : '309,856'}
            unit="2024"
            direction="up"
            polarity="up-is-bad"
            changeText={`+${longTermChange}% year-on-year · rising since 2016`}
            sparklineData={
              data ? sparkFrom(data.longTermEmpty.map(d => d.total)) : []
            }
            source="DLUHC · Council Taxbase statistics, 2024"
            href="#sec-long-term"
          />
          <MetricCard
            label="Council tax premium properties"
            value={latestPremium ? latestPremium.properties.toLocaleString() : '152,932'}
            unit="2024"
            direction="up"
            polarity="up-is-good"
            changeText={`+${premiumChange}% year-on-year · councils expanding use`}
            sparklineData={
              data ? sparkFrom(data.councilTaxPremium.map(d => d.properties)) : []
            }
            source="DLUHC · Council Taxbase statistics, 2024"
            href="#sec-premiums"
          />
        </div>

        {/* Chart 1: Total empty homes */}
        <ScrollReveal>
          <div id="sec-total-empty" className="mb-12">
            <LineChart
              series={emptyHomesSeries}
              title="Total empty dwellings, England, 2010–2024"
              subtitle="All dwellings recorded as unoccupied on council tax records. Includes short-term and long-term vacancies."
              yLabel="Dwellings"
              source={{
                name: 'DLUHC',
                dataset: 'Council Taxbase statistics — Table CTSOP4.0',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 2: Long-term empty */}
        <ScrollReveal>
          <div id="sec-long-term" className="mb-12">
            <LineChart
              series={longTermEmptySeries}
              title="Long-term empty homes (6+ months), England, 2010–2024"
              subtitle="Properties empty for six months or more. Fell to a low of 200,625 in 2016, now rising steadily."
              yLabel="Dwellings"
              source={{
                name: 'DLUHC',
                dataset: 'Council Taxbase statistics — Table CTSOP4.0',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 3: Council tax premium properties */}
        <ScrollReveal>
          <div id="sec-premiums" className="mb-12">
            <LineChart
              series={councilTaxSeries}
              title="Properties subject to council tax empty homes premium, 2019–2024"
              subtitle="Growing use of premium charges (up to 300%) as councils incentivise owners to return properties to use."
              yLabel="Properties"
              source={{
                name: 'DLUHC',
                dataset: 'Council Taxbase statistics',
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
                Empty homes per thousand dwellings by region
              </h2>
              <div className="mt-6 space-y-4">
                {data?.byRegion.map((r) => {
                  const pct = (r.emptyPerThousand / 16) * 100;
                  return (
                    <div key={r.region}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-wiah-black">{r.region}</span>
                        <span className="font-mono text-sm font-bold text-wiah-black">{r.emptyPerThousand}</span>
                      </div>
                      <div className="h-6 bg-wiah-light rounded-sm overflow-hidden">
                        <div
                          className="h-full rounded-sm transition-all"
                          style={{ width: `${pct}%`, backgroundColor: '#F4A261' }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="font-mono text-xs text-wiah-mid mt-4">Source: DLUHC — Council Taxbase statistics, 2024. Action on Empty Homes annual report.</p>
            </div>
          </div>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Empty homes officers and community-led housing are making a difference"
            value="11,000+ homes"
            description="Where councils have invested in dedicated empty homes officers, results follow. Birmingham's empty homes team has returned over 3,000 properties to use since 2010. Community land trusts in rural areas are acquiring and renovating long-term empty properties for affordable local housing — the Community Housing Fund supported over 150 groups before its funding ended in 2020. The Levelling Up and Regeneration Act 2023 gives councils new powers to levy premiums on second homes and strengthens compulsory purchase routes. Action on Empty Homes estimates that targeted local authority programmes bring around 11,000 long-term empty properties back into use each year — demonstrating that the problem is solvable where political will and resources align."
            source="Source: DLUHC — Council Taxbase statistics, 2024. Action on Empty Homes — Empty Homes in England 2024."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <RelatedTopics />
      </main>
    </>
  );
}
