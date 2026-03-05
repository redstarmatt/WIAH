'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';

// ── Types ────────────────────────────────────────────────────────────────────

interface PriceCapPoint {
  quarter: string;
  annualBillGBP: number;
}

interface FuelPovertyPoint {
  year: number;
  fuelPoorHouseholdsMillions: number;
}

interface StandingChargePoint {
  year: number;
  electricityStandingChargePencePerDay: number;
}

interface EnergyBillsData {
  national: {
    priceCap: {
      timeSeries: PriceCapPoint[];
      latestQuarter: string;
      latestAnnualBillGBP: number;
      peakQuarter: string;
      peakAnnualBillGBP: number;
      note: string;
    };
    fuelPoverty: {
      timeSeries: FuelPovertyPoint[];
      latestYear: number;
      latestMillions: number;
      latestPct: number;
      note: string;
    };
    standingCharges: {
      timeSeries: StandingChargePoint[];
      latestYear: number;
      latestPencePerDay: number;
    };
  };
  metadata: {
    sources: { name: string; dataset: string; url: string; frequency: string }[];
    methodology: string;
    knownIssues: string[];
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function quarterToDate(q: string): Date {
  const parts = q.split(' Q');
  const year = parseInt(parts[0]);
  const quarter = parseInt(parts[1]);
  return new Date(year, (quarter - 1) * 3, 1);
}

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function EnergyBillsPage() {
  const [data, setData] = useState<EnergyBillsData | null>(null);

  useEffect(() => {
    fetch('/data/energy-bills/energy_bills.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  // 1. Price cap over time
  const priceCapSeries: Series[] = data
    ? [{
        id: 'priceCap',
        label: 'Annual bill (£)',
        colour: '#F4A261',
        data: data.national.priceCap.timeSeries.map(d => ({
          date: quarterToDate(d.quarter),
          value: d.annualBillGBP,
        })),
      }]
    : [];

  const priceCapAnnotations: Annotation[] = [
    { date: new Date(2022, 9, 1), label: 'Oct 2022: EPG caps bills at £2,500' },
    { date: new Date(2022, 8, 1), label: '2022 Q3: cap would have been £3,549' },
  ];

  // 2. Fuel poverty
  const fuelPovertySeries: Series[] = data
    ? [{
        id: 'fuelPoverty',
        label: 'Fuel poor households (millions)',
        colour: '#E63946',
        data: data.national.fuelPoverty.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.fuelPoorHouseholdsMillions,
        })),
      }]
    : [];

  // 3. Standing charges
  const standingChargesSeries: Series[] = data
    ? [{
        id: 'standingCharges',
        label: 'Electricity standing charge (pence/day)',
        colour: '#F4A261',
        data: data.national.standingCharges.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.electricityStandingChargePencePerDay,
        })),
      }]
    : [];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Energy Bills" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Energy Bills"
          question="Are Energy Bills Actually Still Too High?"
          finding={
            data
              ? `Energy bills hit &pound;${data.national.priceCap.peakAnnualBillGBP.toLocaleString()} in autumn 2022 &mdash; triple their 2019 level. Government intervention capped bills at &pound;2,500, costing &pound;37bn in 2022 alone. Bills have fallen to &pound;1,717 but remain 52% above pre-crisis levels. 3.44 million households are in fuel poverty.`
              : 'Energy bills reached record highs during the 2022–23 crisis.'
          }
          colour="#F4A261"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              Russia&apos;s invasion of Ukraine in February 2022 exposed Britain&apos;s structural dependence on gas imports. The Ofgem price cap tripled from &pound;1,138 in winter 2020/21 to &pound;3,549 by October 2022; the Energy Price Guarantee capped bills at &pound;2,500, costing &pound;37 billion in 2022 alone. The cap has since fallen to &pound;1,717 in Q4 2024 &mdash; but that remains 52% above the 2019 level. Wholesale prices have normalised; the cost that has not retreated is the standing charge, which rose 153% from 24p/day in 2019 to 61p/day in 2024. Fuel poverty now affects 3.44 million households &mdash; 13.1% of English homes &mdash; up from 2.5 million before the crisis. With 19 million homes still reliant on gas boilers and 27% below EPC band C, Britain&apos;s exposure to the next price shock is largely unchanged.
            </p>
            <p>
              The energy cost structure is regressive by design. Around 4 million households on prepayment meters pay historically around &pound;100 per year more than equivalent direct debit customers &mdash; a structure that charges the poorest the most. High fixed standing charges penalise low-usage households: pensioners and fuel-poor families who cut consumption find their bills barely fall. Social tariff proposals for the 3&ndash;4 million most vulnerable households have gained traction in Labour&apos;s energy review, and Ofgem opened a consultation on restructuring standing charges in 2024, but ECO4 insulation installation rates are running at roughly half the pace needed to meet the 2026 endpoint, leaving the structural exposure intact.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-price-cap', label: 'Price Cap' },
          { id: 'sec-fuel-poverty', label: 'Fuel Poverty' },
          { id: 'sec-standing-charges', label: 'Standing Charges' },
        ]} />

        {/* Metric cards */}
        <ScrollReveal>
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Typical annual energy bill"
            value="£1,738"
            unit=""
            direction="down"
            polarity="up-is-bad"
            changeText="Q1 2025 · Down from peak £3,549 (Oct 2022) · Still 53% above pre-crisis £1,137"
            sparklineData={[1137, 1179, 1162, 1042, 1138, 1277, 1971, 3549, 2500, 2500, 2074, 1834, 1928, 1690, 1568, 1717, 1738]}
            onExpand={() => {}}
          />
          <MetricCard
            label="Fuel poor households"
            value="3.44M"
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText="2023 · 13.1% of homes · Up from 2.5M pre-crisis · Elderly and renters worst affected"
            sparklineData={[2.38, 2.50, 2.55, 2.52, 2.53, 2.51, 2.55, 2.67, 3.24, 3.44]}
            onExpand={() => {}}
          />
          <MetricCard
            label="Electricity standing charge"
            value="61p/day"
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText="2024 · Up from 24p/day in 2019 · 153% rise · Hits low-consumption households hardest"
            sparklineData={[24.1, 25.3, 27.2, 38.7, 53.4, 61.0]}
            onExpand={() => {}}
          />
        </div>
        </ScrollReveal>

        {/* Charts */}
        <ScrollReveal>
        <section id="sec-price-cap" className="mb-12">
          <LineChart
            title="Ofgem energy price cap for typical household, 2019–2025"
            subtitle="Annual bill equivalent (£) for typical dual-fuel household (2,900kWh gas + 2,700kWh electricity). Rose from £1,137 in 2019 to £3,549 in October 2022 before falling. Still 53% above pre-crisis level."
            series={priceCapSeries}
            annotations={priceCapAnnotations}
            yLabel="£/year"
          />
        </section>
        </ScrollReveal>

        <ScrollReveal>
        <section id="sec-fuel-poverty" className="mb-12">
          <LineChart
            title="Fuel poor households, England, 2014–2023"
            subtitle="Millions of households in fuel poverty (LIHC definition). Rose sharply in 2022 from a stable plateau of ~2.5 million to 3.44 million as bills surged."
            series={fuelPovertySeries}
            yLabel="Millions"
          />
        </section>
        </ScrollReveal>

        <ScrollReveal>
        <section id="sec-standing-charges" className="mb-12">
          <LineChart
            title="Electricity standing charges, 2019–2024"
            subtitle="Daily fixed charges for electricity regardless of consumption. Rose from 24.1p/day in 2019 to 61.0p/day in 2024. Disproportionately affects low-consumption households."
            series={standingChargesSeries}
            yLabel="Pence/day"
          />
        </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
        <PositiveCallout
          title="What&apos;s improving"
          value="£1,717"
          unit="Q4 2024 bill &mdash; falling from &pound;3,549 peak as wholesale gas prices normalise"
          description="Wholesale gas prices have fallen from their crisis peak as LNG supply diversified and European storage recovered. The Ofgem price cap in Q4 2024 is &pound;1,717 &mdash; less than half the October 2022 level. Government energy support of &pound;37bn prevented millions more households from falling into fuel poverty. The Energy Price Guarantee and &pound;400 Energy Bills Support Scheme payments reached virtually all households, with targeted &pound;900 payments to those on means-tested benefits."
          source="Source: Ofgem &mdash; Electricity and gas price cap, 2024."
        />
        </ScrollReveal>

        {/* Sources */}
        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            {data?.metadata.sources.map((src, i) => (
              <div key={i}>
                <a href={src.url} target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">
                  {src.name} &mdash; {src.dataset}
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
      </main>

    </>
  );
}
