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

interface FuelPovertyData {
  national: {
    fuelPoverty: {
      timeSeries: Array<{ year: string; pctHouseholds: number }>;
      latestYear: string;
      latestPct: number;
      latestMillions: number;
    };
    energyPriceCap: {
      timeSeries: Array<{ year: number; capGBP: number }>;
      latestYear: number;
      latestCapGBP: number;
    };
    byTenureType: Array<{ tenure: string; pctFuelPoor: number }>;
  };
  metadata: {
    sources: Array<{ name: string; dataset: string; url: string; frequency: string }>;
    methodology: string;
    knownIssues: string[];
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

function fyToDate(fy: string): Date {
  const start = parseInt(fy.split('/')[0]);
  return new Date(start, 3, 1);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function FuelPovertyPage() {
  const [data, setData] = useState<FuelPovertyData | null>(null);

  useEffect(() => {
    fetch('/data/fuel-poverty/fuel_poverty.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const fuelPovertySeries: Series[] = data
    ? [{
        id: 'fuel-poverty',
        label: 'Households in fuel poverty (%)',
        colour: '#F4A261',
        data: data.national.fuelPoverty.timeSeries.map(d => ({
          date: fyToDate(d.year),
          value: d.pctHouseholds,
        })),
      }]
    : [];

  const energyCapSeries: Series[] = data
    ? [{
        id: 'energy-cap',
        label: 'Energy price cap (&pound;)',
        colour: '#F4A261',
        data: data.national.energyPriceCap.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.capGBP,
        })),
      }]
    : [];

  const energyAnnotations: Annotation[] = [
    { date: new Date(2022, 0, 1), label: '2022: Ukraine war energy crisis' },
  ];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Fuel Poverty" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Fuel Poverty"
          question="How Many British Homes Cannot Afford to Stay Warm?"
          finding="13.4% of English households &mdash; 3.3 million homes &mdash; are in fuel poverty. The energy price cap reached &pound;3,549/year in January 2023. Excess winter deaths attributable to cold homes average 9,700 per year. Fuel poverty is highest in the private rented sector, where 18.8% of households cannot afford to heat their homes."
          colour="#F4A261"
          preposition="in"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Some 3.3 million English households &mdash; 13.4% of the total &mdash; are classified as fuel poor under the Low Income Low Energy Efficiency (LILEE) metric adopted in 2014. Private renters are worst affected at 18.8%, followed by social renters at 16.2%. Fourteen million homes carry an EPC rating below band C, and an estimated 9,700 excess winter deaths each year are attributable to cold housing. The structural geography is stark: fuel poverty runs highest in Yorkshire &amp; the Humber (15.4%), the West Midlands (15.2%) and the North East (15.0%), while rural off-gas-grid properties &mdash; reliant on oil heating whose cost rose 130% in 2022 &mdash; face the sharpest price shocks.</p>
            <p>The 2022&ndash;23 energy crisis laid bare the scale of exposure. Ofgem&apos;s price cap reached &pound;3,549 per year in January 2023, up from &pound;1,277 in October 2021, driven overwhelmingly by the Russia&ndash;Ukraine war. The government&apos;s Energy Price Guarantee capped typical bills at &pound;2,500 for six months, while the Energy Bills Support Scheme delivered a &pound;400 non-repayable discount to 28 million households. Total government energy support exceeded &pound;40 billion. Yet standing charges have risen 45% since 2019, hitting low-consumption households hardest &mdash; a structural penalty that Ofgem&apos;s 2024 standing-charge review is only now examining. Citizens Advice estimates 6.7 million households remain energy-vulnerable under broader definitions than LILEE allows.</p>
            <p>The retrofit gap keeps fuel poverty locked in. Eighty-five per cent of UK homes rely on gas central heating, and the government quietly dropped the Minimum Energy Efficiency Standard requiring private rented homes to reach EPC band C by 2025 in September 2023. The Great British Insulation Scheme &mdash; successor to ECO4 &mdash; targets 300,000 home upgrades by 2026, while the Boiler Upgrade Scheme offers &pound;7,500 grants for heat pump installation but remains chronically underspent. Cold homes cost the NHS an estimated &pound;1.36 billion annually according to BRE: 10% of respiratory admissions and 5% of circulatory admissions are linked to cold housing, children in cold homes are three times more likely to develop respiratory illness, and hypothermia deaths cluster disproportionately among the over-75s.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-fuelpoverty', label: 'Fuel Poverty' },
          { id: 'sec-prices', label: 'Energy Prices' },
          { id: 'sec-tenure', label: 'By Tenure' },
        ]} />

        <ScrollReveal>
          <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Households in fuel poverty (England)"
              value="3.3M"
              direction="up"
              polarity="up-is-bad"
              changeText="2022/23 &middot; 13.4% of households &middot; Private renters worst affected (18.8%) &middot; 9,700 excess winter deaths from cold homes"
              sparklineData={[11.1, 11.0, 10.4, 10.6, 11.1, 10.9, 13.4, 13.2, 13.2, 13.0, 13.4]}
              onExpand={() => {}}
            />
            <MetricCard
              label="Ofgem energy price cap (typical annual bill)"
              value="&pound;1,928"
              direction="down"
              polarity="up-is-bad"
              changeText="2024 Q1 &middot; Down from &pound;3,549 peak (Jan 2023) &middot; Still 54% above pre-crisis 2019 level &middot; Energy Support Scheme ended April 2023"
              sparklineData={[1254, 1162, 1277, 2500, 3000, 1928]}
              onExpand={() => {}}
            />
            <MetricCard
              label="Excess winter deaths from cold homes"
              value="9,700"
              direction="flat"
              polarity="up-is-bad"
              changeText="Annual average &middot; Cold homes cost NHS &pound;1.4bn per year &middot; 14% of England&apos;s housing stock has EPC below E &middot; Retrofit gap: 14M homes need upgrading"
              sparklineData={[9200, 9300, 9400, 9500, 9600, 9700, 9700, 9700, 9700]}
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-fuelpoverty" className="mb-12">
            <LineChart
              title="Households in fuel poverty, England, 2012/13&ndash;2022/23"
              subtitle="Percentage of households in fuel poverty using the LILEE (Low Income Low Energy Efficiency) metric."
              series={fuelPovertySeries}
              yLabel="% of households"
              source={{
                name: 'DESNZ',
                dataset: 'Annual Fuel Poverty Statistics Report',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-prices" className="mb-12">
            <LineChart
              title="Ofgem energy price cap (typical annual bill), 2019&ndash;2024"
              subtitle="Annual bill estimate for a typical household (2,900 kWh electricity, 12,000 kWh gas)."
              series={energyCapSeries}
              annotations={energyAnnotations}
              yLabel="&pound; per year"
              source={{
                name: 'Ofgem',
                dataset: 'Energy Price Cap',
                frequency: 'quarterly',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-tenure" className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-2">Fuel poverty rate by housing tenure, England, 2022/23</h2>
            <p className="text-sm text-wiah-mid font-mono mb-6">Percentage of households in fuel poverty by housing type.</p>
            {data && (
              <div className="space-y-3">
                {data.national.byTenureType.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-40 text-sm text-wiah-black flex-shrink-0">{item.tenure}</div>
                    <div className="flex-1 bg-wiah-border rounded h-5 overflow-hidden">
                      <div
                        className="h-full rounded"
                        style={{ width: `${(item.pctFuelPoor / 18.8) * 100}%`, backgroundColor: '#F4A261' }}
                      />
                    </div>
                    <div className="w-16 text-right text-sm font-mono text-wiah-black">{item.pctFuelPoor}%</div>
                  </div>
                ))}
              </div>
            )}
            <p className="font-mono text-xs text-wiah-mid mt-4">Source: DESNZ &mdash; Annual Fuel Poverty Statistics 2023</p>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="What&apos;s improving"
            value="&pound;6.3bn"
            unit="Energy Bills Support Scheme delivered to 28 million households in 2022/23"
            description="The Energy Bills Support Scheme (2022/23) provided a &pound;400 non-repayable discount to all UK households, costing &pound;6.3 billion. The Warm Home Discount was extended to 3 million households in 2022/23. The Boiler Upgrade Scheme offers &pound;7,500 grants for heat pump installation, though take-up has been slow. The UK Infrastructure Bank has committed &pound;1.6 billion to retrofit social housing. Ofgem&apos;s standing charge review (2024) is examining whether flat daily standing charges disproportionately burden low-income households. The Minimum Energy Efficiency Standard, requiring private rented homes to reach EPC band C by 2025, was quietly dropped by the previous government in September 2023."
            source="Source: DESNZ &mdash; Annual Fuel Poverty Statistics 2023; Ofgem &mdash; Energy Price Cap 2024 Q1."
          />
        </ScrollReveal>

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
