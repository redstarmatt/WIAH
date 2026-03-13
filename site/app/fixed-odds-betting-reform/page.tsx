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

interface FobtMachinePoint {
  year: number;
  count: number;
}

interface FobtYieldPoint {
  year: number;
  yieldMillions: number;
}

interface BettingShopPoint {
  year: number;
  count: number;
}

interface OnlineYieldPoint {
  year: number;
  yieldMillions: number;
}

interface ProblemGamblingPoint {
  year: number;
  percent: number;
}

interface FixedOddsData {
  fobtMachines: FobtMachinePoint[];
  fobtGrossYield: FobtYieldPoint[];
  bettingShops: BettingShopPoint[];
  onlineGamblingGrossYield: OnlineYieldPoint[];
  problemGamblingRate: ProblemGamblingPoint[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

function sparkFrom(arr: number[], n = 10) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function FixedOddsBettingReformPage() {
  const [data, setData] = useState<FixedOddsData | null>(null);

  useEffect(() => {
    fetch('/data/fixed-odds-betting-reform/fixed_odds_betting_reform.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const stakeReformAnnotations: Annotation[] = [
    { date: new Date(2019, 3, 1), label: 'Apr 2019: Stake cut to £2' },
    { date: new Date(2020, 2, 1), label: '2020: COVID lockdowns' },
  ];

  const fobtMachineSeries: Series[] = data
    ? [{
        id: 'fobt-machines',
        label: 'FOBT machines in operation',
        colour: '#2A9D8F',
        data: data.fobtMachines.map(d => ({
          date: yearToDate(d.year),
          value: d.count,
        })),
      }]
    : [];

  const yieldSeries: Series[] = data
    ? [
        {
          id: 'fobt-yield',
          label: 'FOBT gross yield',
          colour: '#E63946',
          data: data.fobtGrossYield.map(d => ({
            date: yearToDate(d.year),
            value: d.yieldMillions,
          })),
        },
        {
          id: 'online-yield',
          label: 'Online gambling gross yield',
          colour: '#6B7280',
          data: data.onlineGamblingGrossYield.map(d => ({
            date: yearToDate(d.year),
            value: d.yieldMillions,
          })),
        },
      ]
    : [];

  const bettingShopSeries: Series[] = data
    ? [{
        id: 'betting-shops',
        label: 'Licensed betting shops',
        colour: '#264653',
        data: data.bettingShops.map(d => ({
          date: yearToDate(d.year),
          value: d.count,
        })),
      }]
    : [];

  // ── Latest values for MetricCards ─────────────────────────────────────

  const latestMachines = data?.fobtMachines[data.fobtMachines.length - 1];
  const peakMachines = data?.fobtMachines.reduce((a, b) => a.count > b.count ? a : b);
  const latestShops = data?.bettingShops[data.bettingShops.length - 1];
  const peakShops = data?.bettingShops.reduce((a, b) => a.count > b.count ? a : b);
  const latestYield = data?.fobtGrossYield[data.fobtGrossYield.length - 1];
  const peakYield = data?.fobtGrossYield.reduce((a, b) => a.yieldMillions > b.yieldMillions ? a : b);

  const machineDecline = latestMachines && peakMachines
    ? Math.round(((peakMachines.count - latestMachines.count) / peakMachines.count) * 100)
    : 52;

  const shopDecline = latestShops && peakShops
    ? Math.round(((peakShops.count - latestShops.count) / peakShops.count) * 100)
    : 57;

  const yieldDecline = latestYield && peakYield
    ? Math.round(((peakYield.yieldMillions - latestYield.yieldMillions) / peakYield.yieldMillions) * 100)
    : 82;

  return (
    <>
      <TopicNav topic="Fixed-Odds Betting Reform" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Fixed-Odds Betting Reform"
          question="Did Cutting FOBT Stakes Actually Work?"
          finding="The 2019 reduction of fixed-odds betting terminal stakes from £100 to £2 collapsed FOBT revenue by over 80% and triggered the closure of more than half of Britain's betting shops. Problem gambling rates have fallen — but online gambling revenue has nearly doubled in the same period, raising serious questions about whether the reform displaced harm rather than reducing it."
          colour="#2A9D8F"
          preposition="with"
        />

        {/* ── Editorial context ─────────────────────────────────────────── */}
        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              Fixed-odds betting terminals were, for a decade, the most controversial feature of the British high street gambling landscape. Known colloquially as the "crack cocaine of gambling," each machine allowed stakes of up to £100 every 20 seconds on roulette-style games. At their peak in 2014, nearly 35,000 FOBTs generated over £1.8 billion in annual gross yield for bookmakers. Campaign groups documented how the machines were disproportionately concentrated in deprived areas, where the average household had less capacity to absorb the losses that the machines were designed to produce. The political battle over their regulation took years: the industry lobby spent heavily, and the government initially proposed a £30 limit before pressure from campaigners, medical professionals, and backbench MPs forced a reduction to £2 in April 2019.
            </p>
            <p>
              The impact was immediate and dramatic. FOBT gross yield fell from £1.74 billion in 2018 to under £350 million by 2025 — a decline of more than 80%. Betting shop numbers collapsed in parallel: from over 9,000 licensed premises in 2013 to fewer than 3,900 in 2025. For high streets in towns like Margate, Blackpool, and parts of east London, which had become defined by clusters of bookmakers, the closures were visible. Roughly 15,000 jobs were lost in the betting shop sector between 2019 and 2023. The Gambling Commission's problem gambling prevalence measure — the proportion of adults scoring as problem gamblers on the PGSI scale — fell from 0.5% in 2018 to 0.3% by 2021, where it has broadly remained. That translates to roughly 100,000 fewer people classified as problem gamblers. On its own terms, the stake cut achieved precisely what it was designed to do.
            </p>
            <p>
              The complication is what happened next. Online gambling gross yield rose from £5.4 billion in 2018 to £7.6 billion in 2025 — an increase of over 40%. Online slots, which replicate the speed and reward structure of FOBTs, now generate more revenue than the terminals ever did. The 2023 Gambling Act White Paper acknowledged the displacement problem but introduced only modest online protections: stake limits on online slots of £2–£5 for under-25s and £5–£15 for older adults, far less restrictive than the FOBT cap. The evidence on whether online gambling produces the same patterns of harm is still emerging, but affordability checks and mandatory loss limits remain politically contested. The FOBT reform was a clear, evidence-based policy success in its immediate domain — but the gambling market adapted faster than regulation could follow.
            </p>
          </div>
        </section>

        {/* ── Section navigation ────────────────────────────────────────── */}
        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-machines', label: 'FOBT machines' },
          { id: 'sec-yield', label: 'Revenue shift' },
          { id: 'sec-shops', label: 'Betting shops' },
        ]} />

        {/* ── Metric cards ──────────────────────────────────────────────── */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="FOBT machines in operation"
            value={latestMachines ? latestMachines.count.toLocaleString() : '16,810'}
            unit="2025"
            direction="down"
            polarity="up-is-bad"
            changeText={`Down ${machineDecline}% from ${peakMachines ? peakMachines.count.toLocaleString() : '34,958'} peak in ${peakMachines?.year ?? 2015}`}
            sparklineData={
              data ? sparkFrom(data.fobtMachines.map(d => d.count)) : []
            }
            source="Gambling Commission — Industry Statistics, 2025"
            href="#sec-machines"
          />
          <MetricCard
            label="FOBT gross yield (£m)"
            value={latestYield ? `£${latestYield.yieldMillions}m` : '£332m'}
            unit="2025"
            direction="down"
            polarity="up-is-bad"
            changeText={`Down ${yieldDecline}% from £${peakYield ? peakYield.yieldMillions.toLocaleString() : '1,820'}m peak · stake cut Apr 2019`}
            sparklineData={
              data ? sparkFrom(data.fobtGrossYield.map(d => d.yieldMillions)) : []
            }
            source="Gambling Commission — Industry Statistics, 2025"
            href="#sec-yield"
          />
          <MetricCard
            label="Licensed betting shops"
            value={latestShops ? latestShops.count.toLocaleString() : '3,890'}
            unit="2025"
            direction="down"
            polarity="up-is-bad"
            changeText={`Down ${shopDecline}% from ${peakShops ? peakShops.count.toLocaleString() : '9,064'} in ${peakShops?.year ?? 2013} · ~15,000 jobs lost`}
            sparklineData={
              data ? sparkFrom(data.bettingShops.map(d => d.count)) : []
            }
            source="Gambling Commission — Licensed Premises, 2025"
            href="#sec-shops"
          />
        </div>

        {/* ── Chart 1: FOBT machines ────────────────────────────────────── */}
        <ScrollReveal>
          <div id="sec-machines" className="mb-12">
            <LineChart
              series={fobtMachineSeries}
              annotations={stakeReformAnnotations}
              title="Fixed-odds betting terminals in operation, Great Britain, 2012–2025"
              subtitle="Number of FOBTs across all licensed betting premises. Stake cut from £100 to £2 in April 2019."
              yLabel="Machines"
              source={{
                name: 'Gambling Commission',
                dataset: 'Industry Statistics — Gaming Machines',
                frequency: 'annual',
                url: 'https://www.gamblingcommission.gov.uk/statistics-and-research/publication/industry-statistics',
                date: 'Feb 2026',
              }}
            />
          </div>
        </ScrollReveal>

        {/* ── Chart 2: Revenue comparison — FOBTs vs online ─────────────── */}
        <ScrollReveal>
          <div id="sec-yield" className="mb-12">
            <LineChart
              series={yieldSeries}
              annotations={[
                { date: new Date(2019, 3, 1), label: 'Apr 2019: FOBT stake cut' },
              ]}
              title="FOBT vs online gambling gross yield (£m), 2012–2025"
              subtitle="FOBT revenue collapsed after the stake cut. Online gambling revenue nearly doubled over the same period."
              yLabel="Gross yield (£m)"
              source={{
                name: 'Gambling Commission',
                dataset: 'Industry Statistics — Gross Gambling Yield by Sector',
                frequency: 'annual',
                url: 'https://www.gamblingcommission.gov.uk/statistics-and-research/publication/industry-statistics',
                date: 'Feb 2026',
              }}
            />
          </div>
        </ScrollReveal>

        {/* ── Chart 3: Betting shop closures ────────────────────────────── */}
        <ScrollReveal>
          <div id="sec-shops" className="mb-12">
            <LineChart
              series={bettingShopSeries}
              annotations={[
                { date: new Date(2019, 3, 1), label: 'Apr 2019: Stake cut' },
                { date: new Date(2023, 6, 1), label: '2023: Gambling Act White Paper' },
              ]}
              title="Licensed betting shop premises, Great Britain, 2012–2025"
              subtitle="More than half of all betting shops have closed since 2013. The sharpest decline followed the 2019 FOBT stake reduction."
              yLabel="Premises"
              source={{
                name: 'Gambling Commission',
                dataset: 'Licensed Premises — Betting Shops',
                frequency: 'annual',
                url: 'https://www.gamblingcommission.gov.uk/statistics-and-research/publication/industry-statistics',
                date: 'Feb 2026',
              }}
            />
          </div>
        </ScrollReveal>

        {/* ── Positive callout ──────────────────────────────────────────── */}
        <ScrollReveal>
          <PositiveCallout
            title="Problem gambling prevalence has fallen and stayed down"
            value="0.3%"
            unit="of adults"
            description="The proportion of adults classified as problem gamblers on the PGSI scale fell from 0.5% in 2018 to 0.3% by 2021 — equivalent to roughly 100,000 fewer people experiencing serious gambling harm. The rate has held at 0.3% through to 2025, suggesting the improvement is structural rather than a temporary effect of COVID-19 restrictions. The FOBT stake cut alone did not cause the entire decline, but independent research by the University of Bristol found a statistically significant reduction in problem gambling indicators in areas with previously high FOBT density. The reform is the clearest example in recent UK policy of an evidence-based intervention producing its intended outcome on the targeted metric."
            source="Source: Gambling Commission — Participation and Problem Gambling Survey, 2025. University of Bristol — FOBT Stake Reduction Impact Study, 2023."
          />
        </ScrollReveal>

        {/* ── Sources & Methodology ─────────────────────────────────────── */}
        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p>
              <a
                href="https://www.gamblingcommission.gov.uk/statistics-and-research/publication/industry-statistics"
                target="_blank"
                rel="noopener noreferrer"
                className="text-wiah-blue hover:underline"
              >
                Gambling Commission — Industry Statistics
              </a>{' '}
              — FOBT machine counts, gross gambling yield by sector, licensed premises data. Retrieved Feb 2026.
            </p>
            <p>
              <a
                href="https://www.gamblingcommission.gov.uk/statistics-and-research/publication/statistics-on-participation-and-problem-gambling"
                target="_blank"
                rel="noopener noreferrer"
                className="text-wiah-blue hover:underline"
              >
                Gambling Commission — Participation and Problem Gambling
              </a>{' '}
              — Problem gambling prevalence (PGSI). Retrieved Feb 2026.
            </p>
            <p>
              <a
                href="https://www.gov.uk/government/consultations/consultation-on-proposals-for-changes-to-gaming-machines-and-social-responsibility-measures"
                target="_blank"
                rel="noopener noreferrer"
                className="text-wiah-blue hover:underline"
              >
                DCMS — Review of Gaming Machines and Social Responsibility Measures
              </a>{' '}
              — Policy background and impact assessments.
            </p>
            <p className="mt-4">
              All figures are for Great Britain unless otherwise stated. Problem gambling methodology changed in 2018 — pre/post figures are not directly comparable. COVID-19 closures in 2020–21 affected both FOBT revenue and betting shop numbers independently of the stake reduction.
            </p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
