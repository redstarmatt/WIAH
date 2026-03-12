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

interface AssetsRecoveredPoint {
  year: number;
  valueMillions: number;
}

interface ConfiscationOrderPoint {
  year: number;
  ordersMade: number;
  ordersEnforced: number;
}

interface UwoFreezingPoint {
  year: number;
  uwos: number;
  accountFreezingOrders: number;
}

interface AssetRecoveryData {
  assetsRecovered: AssetsRecoveredPoint[];
  confiscationOrders: ConfiscationOrderPoint[];
  uwosAndFreezingOrders: UwoFreezingPoint[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

function sparkFrom(arr: number[], n = 10) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function AssetRecoveryRatesPage() {
  const [data, setData] = useState<AssetRecoveryData | null>(null);

  useEffect(() => {
    fetch('/data/asset-recovery-rates/asset_recovery_rates.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const assetsRecoveredSeries: Series[] = data
    ? [{
        id: 'assets-recovered',
        label: 'Criminal assets recovered (£m)',
        colour: '#2A9D8F',
        data: data.assetsRecovered.map(d => ({
          date: yearToDate(d.year),
          value: d.valueMillions,
        })),
      }]
    : [];

  const confiscationSeries: Series[] = data
    ? [
        {
          id: 'orders-made',
          label: 'Confiscation orders made',
          colour: '#6B7280',
          data: data.confiscationOrders.map(d => ({
            date: yearToDate(d.year),
            value: d.ordersMade,
          })),
        },
        {
          id: 'orders-enforced',
          label: 'Confiscation orders enforced',
          colour: '#E63946',
          data: data.confiscationOrders.map(d => ({
            date: yearToDate(d.year),
            value: d.ordersEnforced,
          })),
        },
      ]
    : [];

  const uwoSeries: Series[] = data
    ? [
        {
          id: 'uwos',
          label: 'Unexplained Wealth Orders',
          colour: '#264653',
          data: data.uwosAndFreezingOrders.map(d => ({
            date: yearToDate(d.year),
            value: d.uwos,
          })),
        },
        {
          id: 'account-freezing',
          label: 'Account Freezing Orders',
          colour: '#F4A261',
          data: data.uwosAndFreezingOrders.map(d => ({
            date: yearToDate(d.year),
            value: d.accountFreezingOrders,
          })),
        },
      ]
    : [];

  const latestRecovered = data?.assetsRecovered[data.assetsRecovered.length - 1];
  const firstRecovered = data?.assetsRecovered[0];
  const latestConfiscation = data?.confiscationOrders[data.confiscationOrders.length - 1];
  const totalUwos = data?.uwosAndFreezingOrders.reduce((sum, d) => sum + d.uwos, 0) ?? 9;

  const recoveryGrowth = latestRecovered && firstRecovered
    ? Math.round(((latestRecovered.valueMillions - firstRecovered.valueMillions) / firstRecovered.valueMillions) * 100)
    : 145;

  const enforcementRate = latestConfiscation
    ? Math.round((latestConfiscation.ordersEnforced / latestConfiscation.ordersMade) * 100)
    : 54;

  return (
    <>
      <TopicNav topic="Justice" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Crime & Justice"
          question="Where does the money actually go?"
          finding="The UK recovers just 3% of an estimated £12 billion laundered annually through the country. Criminal asset recovery has risen to £378 million per year, but only half of all confiscation orders are ever enforced, and Unexplained Wealth Orders — once heralded as a game-changer — have been used just 9 times since 2018."
          colour="#6B7280"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The Proceeds of Crime Act 2002 (POCA) gave UK law enforcement sweeping powers to strip criminals of their assets. In theory, crime should not pay. In practice, the enforcement gap is vast. Courts impose roughly 7,900 confiscation orders per year, but only around 54% are ever enforced — meaning nearly half of all court-ordered asset seizures go uncollected. The total amount recovered, £378 million in 2023/24, sounds significant until you set it against the National Crime Agency's own estimate that £12 billion is laundered through the UK every year. That 3% recovery rate has barely shifted in a decade. The NAO has repeatedly criticised HMCTS and enforcement agencies for failing to collect debts owed under confiscation orders, with over £1.8 billion in outstanding unpaid orders accumulating on the books.</p>
            <p>Unexplained Wealth Orders, introduced under the Criminal Finances Act 2017, were supposed to change the calculus. They allow the NCA to compel politically exposed persons and suspected criminals to explain the source of assets worth over £50,000. The idea was sound: reverse the burden of proof for assets that appeared far beyond legitimate means. But in practice, UWOs have been used only 9 times since their introduction in 2018. The NCA's failed attempt to use a UWO against the family of Kazakh banker Dariga Nazarbayeva cost the agency over £1.5 million in legal fees and had a chilling effect on further applications. By contrast, Account Freezing Orders — a lower-threshold tool — have surged to over 700 per year, proving more practical but less transformative. Meanwhile, the estimated total cost of economic crime to the UK stands at £290 billion annually according to the NCA's National Strategic Assessment, encompassing fraud, money laundering, bribery, and sanctions evasion.</p>
            <p>There are signs of progress. The Economic Crime and Corporate Transparency Act 2022 introduced new crypto asset seizure powers, allowing law enforcement to freeze and recover digital assets without first needing a criminal conviction. The NCA has reported several successful crypto seizures, including a £3.4 billion Bitcoin haul linked to a Chinese money laundering network. The UK's regime compares poorly internationally — Australia recovers roughly 8% of criminal proceeds, and Italy's dedicated anti-Mafia asset confiscation regime regularly recovers billions in property, businesses, and financial assets. The gap between powers on the statute book and enforcement in practice remains the central weakness of the UK's approach: the law is there, but the resources, institutional capacity, and political will to use it consistently are not.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-recovered', label: 'Assets recovered' },
          { id: 'sec-confiscation', label: 'Confiscation orders' },
          { id: 'sec-uwos', label: 'UWOs & freezing orders' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Criminal assets recovered"
            value={latestRecovered ? `£${latestRecovered.valueMillions}m` : '£378m'}
            unit="2023/24"
            direction="up"
            polarity="up-is-good"
            changeText={`+${recoveryGrowth}% since 2012 · but only 3% of £12bn laundered annually`}
            sparklineData={
              data ? sparkFrom(data.assetsRecovered.map(d => d.valueMillions)) : []
            }
            source="Home Office · Asset Recovery Statistical Bulletin, 2023/24"
            href="#sec-recovered"
          />
          <MetricCard
            label="Confiscation order enforcement rate"
            value={`${enforcementRate}%`}
            unit="2023/24"
            direction="flat"
            polarity="up-is-good"
            changeText="Nearly half of court-ordered confiscation goes uncollected · £1.8bn outstanding"
            sparklineData={
              data ? sparkFrom(data.confiscationOrders.map(d => Math.round((d.ordersEnforced / d.ordersMade) * 100))) : []
            }
            source="NAO · Criminal confiscation order enforcement, 2023/24"
            href="#sec-confiscation"
          />
          <MetricCard
            label="Unexplained Wealth Orders used"
            value={String(totalUwos)}
            unit="since 2018"
            direction="flat"
            polarity="up-is-good"
            changeText="Only 9 UWOs ever issued · NCA deterred after costly failed case"
            sparklineData={
              data ? data.uwosAndFreezingOrders.map(d => d.uwos) : []
            }
            source="NCA · Annual Report, 2024"
            href="#sec-uwos"
          />
        </div>

        {/* Chart 1: Assets recovered over time */}
        <ScrollReveal>
          <div id="sec-recovered" className="mb-12">
            <LineChart
              series={assetsRecoveredSeries}
              title="Criminal assets recovered under POCA, England & Wales, 2012–2024"
              subtitle="Total value of assets recovered annually through confiscation, cash forfeiture, and civil recovery (£ millions)."
              yLabel="£ millions"
              source={{
                name: 'Home Office',
                dataset: 'Asset Recovery Statistical Bulletin',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 2: Confiscation orders made vs enforced */}
        <ScrollReveal>
          <div id="sec-confiscation" className="mb-12">
            <LineChart
              series={confiscationSeries}
              title="Confiscation orders made vs enforced, 2012–2024"
              subtitle="The gap between court-imposed confiscation orders and those actually enforced. Nearly half go uncollected."
              yLabel="Orders"
              source={{
                name: 'NAO / Home Office',
                dataset: 'Criminal Confiscation Order Enforcement',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 3: UWOs and Account Freezing Orders */}
        <ScrollReveal>
          <div id="sec-uwos" className="mb-12">
            <LineChart
              series={uwoSeries}
              title="Unexplained Wealth Orders & Account Freezing Orders, 2018–2024"
              subtitle="UWOs have been used just 9 times since introduction. Account Freezing Orders, a lower-threshold tool, have surged."
              yLabel="Orders"
              source={{
                name: 'NCA / SFO',
                dataset: 'Annual Reports — Criminal Finances Act Powers',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Economic Crime Act 2022 — new crypto seizure powers"
            value="£3.4bn"
            description="The Economic Crime and Corporate Transparency Act 2022 gave UK law enforcement the power to seize crypto assets without first securing a criminal conviction. The NCA's largest crypto seizure to date — £3.4 billion in Bitcoin linked to a Chinese money laundering network — demonstrated the scale of illicit digital assets flowing through the UK. New provisions also allow for the seizure of crypto held in overseas wallets, closing a significant loophole. While traditional asset recovery remains slow, the crypto seizure framework represents the most significant expansion of POCA powers in two decades, and enforcement agencies are now building dedicated teams to trace, freeze, and forfeit digital assets at scale."
            source="Source: NCA Annual Report 2024. Home Office — Economic Crime and Corporate Transparency Act 2022 Impact Assessment. SFO Annual Report 2023/24."
          />
        </ScrollReveal>
        <RelatedTopics />
      </main>
    </>
  );
}
