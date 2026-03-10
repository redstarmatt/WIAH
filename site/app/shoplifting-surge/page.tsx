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

interface OffencesPoint {
  year: number;
  offencesThousands: number;
}

interface ChargeRatePoint {
  year: number;
  chargeRatePercent: number;
}

interface RetailCostPoint {
  year: number;
  costBillions: number;
}

interface ShopliftingData {
  national: {
    recordedOffences: {
      timeSeries: OffencesPoint[];
      latestYear: number;
      latestThousands: number;
      note: string;
    };
    chargeRate: {
      timeSeries: ChargeRatePoint[];
      latestYear: number;
      latestPercent: number;
      note: string;
    };
    retailCrimeCost: {
      timeSeries: RetailCostPoint[];
      latestYear: number;
      latestBillions: number;
      note: string;
    };
  };
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

export default function ShopliftingSurgePage() {
  const [data, setData] = useState<ShopliftingData | null>(null);

  useEffect(() => {
    fetch('/data/shoplifting-surge/shoplifting.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const offencesSeries: Series[] = data
    ? [{
        id: 'offences',
        label: 'Shoplifting offences (thousands)',
        colour: '#E63946',
        data: data.national.recordedOffences.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.offencesThousands,
        })),
      }]
    : [];

  const chargeRateSeries: Series[] = data
    ? [{
        id: 'charge-rate',
        label: 'Charge rate (%)',
        colour: '#2A9D8F',
        data: data.national.chargeRate.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.chargeRatePercent,
        })),
      }]
    : [];

  const retailCostSeries: Series[] = data
    ? [{
        id: 'retail-cost',
        label: 'Annual retail crime cost (\u00a3bn)',
        colour: '#F4A261',
        data: data.national.retailCrimeCost.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.costBillions,
        })),
      }]
    : [];

  const offencesAnnotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: '2020: Lockdowns reduce retail activity' },
    { date: new Date(2024, 5, 1), label: '2024: Record high (469,000)' },
  ];

  const chargeRateAnnotations: Annotation[] = [
    { date: new Date(2024, 5, 1), label: '2024: £200 threshold removed' },
  ];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Shoplifting Surge" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Shoplifting Surge"
          question="Why Is Shoplifting Out of Control?"
          finding="Recorded shoplifting offences reached 469,000 in year ending March 2024, a 30% increase on the previous year and the highest since records began. Retail crime costs businesses £1.8 billion annually."
          colour="#6B7280"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              The surge in recorded shoplifting has multiple drivers operating simultaneously. Cost-of-living pressures have pushed more individuals into opportunistic theft for survival goods — supermarkets report significant increases in small-value food thefts that would previously have gone unrecorded. But organised retail crime — coordinated gangs systematically targeting stores for resale — has grown proportionally faster, accounting for an increasing share of total losses. The British Retail Consortium estimates organised crime now accounts for around 30% of total retail theft value, concentrated in high-value electronics, alcohol, and cosmetics.
            </p>
            <p>
              The charge rate of 12% reflects both a policing prioritisation problem and structural evidentiary challenges. The de facto £200 threshold — an unofficial police policy under which lower-value thefts were rarely actively investigated — has now been formally abolished by the Criminal Justice Bill 2024. Whether this will translate into higher enforcement remains to be seen: police capacity is constrained, and retailers themselves often do not report thefts below certain values because the opportunity cost of staff time exceeds the benefit. The £1.8 billion annual cost to retailers — ultimately passed on in prices — falls disproportionately on smaller independent retailers who lack the security infrastructure of large chains.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-offences', label: 'Offence Volume' },
          { id: 'sec-charge-rate', label: 'Charge Rate' },
          { id: 'sec-cost', label: 'Retail Cost' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Recorded shoplifting offences"
              value="469,000"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="+30% in one year · Highest since records began · Organised crime growing"
              sparklineData={[321, 330, 342, 356, 362, 342, 330, 348, 360, 469]}
              href="#sec-offences"
            />
            <MetricCard
              label="Charge rate for shoplifting"
              value="12%"
              unit=""
              direction="down"
              polarity="up-is-good"
              changeText="Down from 18% in 2015 · Police prioritisation declining · £200 threshold abolished"
              sparklineData={[18, 17, 16, 15, 15, 14, 13, 13, 12, 12]}
              href="#sec-offences"
            />
            <MetricCard
              label="Annual cost to retailers"
              value="£1.8bn"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Up from £1.0bn in 2019 · Organised crime a growing factor · Passed to consumers"
              sparklineData={[1.0, 1.1, 0.9, 1.1, 1.4, 1.8]}
              href="#sec-offences"
            />
          </div>
        

        {/* Charts */}
        <ScrollReveal>
          <section id="sec-offences" className="mb-12">
            <LineChart
              title="Recorded shoplifting offences, England and Wales, 2015–2024"
              subtitle="Police recorded shoplifting offences (year ending March). Hit a record 469,000 in 2024 — a 30% annual increase driven by cost-of-living pressures and organised retail crime."
              series={offencesSeries}
              annotations={offencesAnnotations}
              yLabel="Thousands"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-charge-rate" className="mb-12">
            <LineChart
              title="Shoplifting charge rate, England and Wales, 2015–2024"
              subtitle="Percentage of recorded shoplifting offences resulting in charge or summons. Declined from 18% to 12% as offence volumes rose and policing prioritisation shifted. £200 de facto threshold removed by Criminal Justice Bill 2024."
              series={chargeRateSeries}
              annotations={chargeRateAnnotations}
              yLabel="Percent (%)"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-cost" className="mb-12">
            <LineChart
              title="Annual retail crime cost, UK, 2019–2024"
              subtitle="Total cost of retail crime including theft, criminal damage, and violence against staff (British Retail Consortium estimate). Rose 80% in five years, with organised crime driving an increasing share."
              series={retailCostSeries}
              annotations={[{ date: new Date(2022, 5, 1), label: '2022: Post-pandemic surge begins' }]}
              yLabel="\u00a3 Billions"
            />
          </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="What's improving"
            value="£700M"
            unit="retail security investment"
            description="The Criminal Justice Bill 2024 removed the £200 de facto decriminalisation threshold for shoplifting, making all theft an active policing priority regardless of value. Retailers have collectively invested £700 million in security technology including AI-powered CCTV that can identify known offenders and provide automatic evidence packages. The National Business Crime Centre coordinates intelligence sharing between retailers and police. Several police forces have dedicated retail crime units that have significantly improved local charge rates."
            source="Source: Home Office Police Recorded Crime 2023/24 · British Retail Consortium Retail Crime Survey 2024."
          />
        </ScrollReveal>

        {/* Sources */}
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            {data?.metadata.sources.map((src, i) => (
              <div key={i}>
                <a href={src.url} target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">
                  {src.name} — {src.dataset}
                </a>
                <div className="text-xs text-wiah-mid">Updated {src.frequency}</div>
              </div>
            ))}
          </div>
          <div className="text-sm text-wiah-mid mt-6 space-y-2">
            <h3 className="font-bold">Methodology</h3>
            <p>{data?.metadata.methodology}</p>
          </div>
          <div className="text-sm text-wiah-mid mt-6 space-y-2">
            <h3 className="font-bold">Known issues</h3>
            <ul className="list-disc list-inside space-y-1">
              {data?.metadata.knownIssues.map((issue, i) => (
                <li key={i}>{issue}</li>
              ))}
            </ul>
          </div>
        </section>
              <RelatedTopics />
      </main>
    </>
  );
}
