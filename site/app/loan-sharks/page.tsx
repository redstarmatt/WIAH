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

interface VictimPoint {
  year: number;
  estimate: number;
}

interface ProsecutionPoint {
  year: number;
  count: number;
}

interface DebtPoint {
  year: number;
  amount: number;
}

interface RegionData {
  region: string;
  estimatePerMillion: number;
}

interface LoanSharksData {
  illegalLendingVictims: VictimPoint[];
  prosecutions: ProsecutionPoint[];
  averageDebt: DebtPoint[];
  victimsByRegion: RegionData[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 0, 1);
}

function sparkFrom(arr: number[], n = 10) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function LoanSharksPage() {
  const [data, setData] = useState<LoanSharksData | null>(null);

  useEffect(() => {
    fetch('/data/loan-sharks/loan_sharks.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const victimSeries: Series[] = data
    ? [{
        id: 'victims',
        label: 'Estimated victims (England)',
        colour: '#E63946',
        data: data.illegalLendingVictims.map(d => ({
          date: yearToDate(d.year),
          value: d.estimate,
        })),
      }]
    : [];

  const prosecutionSeries: Series[] = data
    ? [{
        id: 'prosecutions',
        label: 'IMLT-led prosecutions',
        colour: '#6B7280',
        data: data.prosecutions.map(d => ({
          date: yearToDate(d.year),
          value: d.count,
        })),
      }]
    : [];

  const debtSeries: Series[] = data
    ? [{
        id: 'avg-debt',
        label: 'Average victim debt',
        colour: '#F4A261',
        data: data.averageDebt.map(d => ({
          date: yearToDate(d.year),
          value: d.amount,
        })),
      }]
    : [];

  const victimAnnotations: Annotation[] = [
    { date: new Date(2020, 0, 1), label: '2020: COVID lockdowns push borrowers underground' },
    { date: new Date(2022, 0, 1), label: '2022: Cost of living crisis accelerates demand' },
  ];

  const prosecutionAnnotations: Annotation[] = [
    { date: new Date(2020, 0, 1), label: '2020: Court backlogs suppress prosecutions' },
  ];

  const debtAnnotations: Annotation[] = [
    { date: new Date(2019, 0, 1), label: '2019: IMLT methodology includes online lending' },
  ];

  // ── Derived values ────────────────────────────────────────────────────────

  const latestVictims = data?.illegalLendingVictims[data.illegalLendingVictims.length - 1];
  const earliestVictims = data?.illegalLendingVictims[0];
  const latestProsecutions = data?.prosecutions[data.prosecutions.length - 1];
  const latestDebt = data?.averageDebt[data.averageDebt.length - 1];
  const earliestDebt = data?.averageDebt[0];

  const victimGrowth = latestVictims && earliestVictims
    ? Math.round(((latestVictims.estimate - earliestVictims.estimate) / earliestVictims.estimate) * 100)
    : 268;

  const debtGrowth = latestDebt && earliestDebt
    ? Math.round(((latestDebt.amount - earliestDebt.amount) / earliestDebt.amount) * 100)
    : 167;

  return (
    <>
      <TopicNav topic="Loan Sharks" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Loan Sharks"
          question="How Many People Are Borrowing from Illegal Lenders?"
          finding="An estimated 1.14 million people in England are borrowing from illegal money lenders, up from around 310,000 a decade ago. The average debt owed to a loan shark now stands at ~4,800 at effective APRs of 1,000% or more. Only 79 IMLT-led prosecutions were brought last year."
          colour="#E63946"
          preposition="with"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Illegal money lending is one of the least visible forms of financial exploitation in the UK, and the data paints a stark picture of a problem that has grown sharply over the past decade. The England Illegal Money Lending Team estimates that 1.14 million people are currently borrowing from unlicensed lenders, a figure that has roughly tripled since 2015. This surge is driven by a confluence of pressures: the tightening of mainstream credit following post-2008 regulatory reforms, the erosion of community-based financial support, and since 2022, the acute cost of living crisis that has pushed hundreds of thousands of households towards desperation borrowing. Many victims do not initially recognise their lender as illegal -- loan sharks often present themselves as helpful neighbours, friends, or community figures before the coercion begins.</p>
            <p>The enforcement response is strikingly disproportionate to the scale of the problem. The England Illegal Money Lending Team, which operates nationally, brought 79 prosecutions last year across the entire country. While each case can dismantle a significant lending operation, the ratio of around one prosecution per 14,000 estimated victims reveals the depth of the enforcement gap. COVID-19 compounded matters: court backlogs suppressed prosecution numbers in 2020 and 2021, while lockdowns simultaneously drove more desperate borrowers towards illegal lenders operating outside institutional reach. The average debt owed to a loan shark has climbed to approximately 4,800, up from 1,800 in 2015, with effective annual interest rates routinely exceeding 1,000%.</p>
            <p>Regional patterns are closely tied to deprivation. The North West, West Midlands, and Yorkshire have the highest estimated rates of illegal lending per head of population, mirroring the geography of financial exclusion. These are areas where bank branch closures, credit union capacity constraints, and the legacy of welfare reforms have left the most acute gaps in affordable credit. The FCA Financial Lives Survey consistently finds that people in these regions are more likely to have been refused mainstream credit and more likely to have borrowed from an unregulated source. There is some cause for cautious optimism: the IMLT has expanded its community outreach, and referrals from local authorities and housing associations have increased, suggesting that awareness is growing. But the structural drivers -- poverty, financial exclusion, and the contraction of the social safety net -- remain firmly in place.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-victims', label: 'Victims' },
          { id: 'sec-prosecutions', label: 'Prosecutions' },
          { id: 'sec-debt', label: 'Average debt' },
          { id: 'sec-regional', label: 'Regional' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Illegal lending victims (England, estimate)"
            value={latestVictims ? (latestVictims.estimate / 1000000).toFixed(2) + 'M' : '1.14M'}
            unit="2025"
            direction="up"
            polarity="up-is-bad"
            changeText={`+${victimGrowth}% since 2015 · tripled in a decade`}
            sparklineData={
              data ? sparkFrom(data.illegalLendingVictims.map(d => d.estimate)) : []
            }
            source="England Illegal Money Lending Team — Annual Report, Dec 2025"
            href="#sec-victims"
          />
          <MetricCard
            label="IMLT-led prosecutions (annual)"
            value={latestProsecutions ? latestProsecutions.count.toString() : '79'}
            unit="2025"
            direction="down"
            polarity="down-is-bad"
            changeText="1 prosecution per ~14,000 estimated victims"
            sparklineData={
              data ? sparkFrom(data.prosecutions.map(d => d.count)) : []
            }
            source="England Illegal Money Lending Team — Annual Report, Dec 2025"
            href="#sec-prosecutions"
          />
          <MetricCard
            label="Average debt to loan shark"
            value={latestDebt ? '\u00A3' + latestDebt.amount.toLocaleString() : '\u00A34,800'}
            unit="2025"
            direction="up"
            polarity="up-is-bad"
            changeText={`+${debtGrowth}% since 2015 · at APRs of 1,000%+`}
            sparklineData={
              data ? sparkFrom(data.averageDebt.map(d => d.amount)) : []
            }
            source="IMLT casework data / Centre for Social Justice, Dec 2025"
            href="#sec-debt"
          />
        </div>

        {/* Chart 1: Estimated victims */}
        <ScrollReveal>
          <div id="sec-victims" className="mb-12">
            <LineChart
              series={victimSeries}
              annotations={victimAnnotations}
              title="Estimated illegal lending victims, England, 2015-2025"
              subtitle="Modelled estimates from IMLT intelligence, local authority referrals, and survey data."
              yLabel="Estimated victims"
              source={{
                name: 'England Illegal Money Lending Team',
                dataset: 'Annual Report — Illegal Money Lending',
                frequency: 'annual',
                url: 'https://www.gov.uk/government/publications/illegal-money-lending-team-annual-report',
                date: 'Dec 2025',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 2: Prosecutions */}
        <ScrollReveal>
          <div id="sec-prosecutions" className="mb-12">
            <LineChart
              series={prosecutionSeries}
              annotations={prosecutionAnnotations}
              title="IMLT-led illegal money lending prosecutions, England, 2015-2025"
              subtitle="Court backlogs during COVID suppressed figures in 2020-21. Prosecution volumes remain flat."
              yLabel="Prosecutions"
              source={{
                name: 'England Illegal Money Lending Team',
                dataset: 'Annual Report — Illegal Money Lending',
                frequency: 'annual',
                url: 'https://www.gov.uk/government/publications/illegal-money-lending-team-annual-report',
                date: 'Dec 2025',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 3: Average debt */}
        <ScrollReveal>
          <div id="sec-debt" className="mb-12">
            <LineChart
              series={debtSeries}
              annotations={debtAnnotations}
              title="Average debt owed to illegal lenders, England, 2015-2025"
              subtitle="Derived from IMLT casework data. Does not include interest already repaid."
              yLabel="Average debt (\u00A3)"
              source={{
                name: 'IMLT / Centre for Social Justice',
                dataset: 'Casework data and Swimming with Sharks report',
                frequency: 'annual',
                url: 'https://www.centreforsocialjustice.org.uk/library/swimming-with-sharks',
                date: 'Dec 2025',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Regional variation */}
        <ScrollReveal>
          <div id="sec-regional" className="mb-12">
            <div className="bg-white rounded-lg border border-wiah-border p-8">
              <h2 className="text-lg font-bold text-wiah-black mb-2">
                Estimated illegal lending rate by region (victims per million people)
              </h2>
              <p className="text-sm text-wiah-mid mb-6">
                Based on IMLT intelligence mapping and FCA Financial Lives survey weighting. Higher rates correlate with deprivation indices.
              </p>
              <div className="mt-6 space-y-4">
                {data?.victimsByRegion.map((r) => {
                  const pct = (r.estimatePerMillion / 220) * 100;
                  return (
                    <div key={r.region}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-wiah-black">{r.region}</span>
                        <span className="font-mono text-sm font-bold text-wiah-black">{r.estimatePerMillion}</span>
                      </div>
                      <div className="h-6 bg-wiah-light rounded-sm overflow-hidden">
                        <div
                          className="h-full rounded-sm transition-all"
                          style={{ width: `${pct}%`, backgroundColor: '#E63946' }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="font-mono text-xs text-wiah-mid mt-4">Source: IMLT intelligence mapping / FCA Financial Lives Survey, 2025</p>
            </div>
          </div>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Community outreach and referrals are growing"
            value="40% increase"
            description="Referrals to the Illegal Money Lending Team from local authorities, housing associations, and community organisations rose 40% between 2022 and 2025. The IMLT's 'Stop Loan Sharks' campaign, operating through schools, community centres, and social media, has significantly raised public awareness that borrowing from an unlicensed lender is not a personal failing but a crime committed against the borrower. Victims who come forward through these channels are offered debt write-off -- the IMLT has written off over 86 million in illegal debt since its creation -- alongside access to affordable credit alternatives through local credit unions."
            source="Source: England Illegal Money Lending Team — Annual Report 2025. Stop Loan Sharks community programme evaluation."
          />
        </ScrollReveal>

        {/* Sources & Methodology */}
        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p><a href="https://www.gov.uk/government/publications/illegal-money-lending-team-annual-report" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">England Illegal Money Lending Team (IMLT) — Annual Report</a> — primary data source for victim estimates, prosecution figures, and casework debt data. Retrieved Dec 2025.</p>
            <p><a href="https://www.centreforsocialjustice.org.uk/library/swimming-with-sharks" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Centre for Social Justice — Swimming with Sharks</a> — independent analysis of illegal lending scale and drivers.</p>
            <p><a href="https://www.fca.org.uk/publications/research/financial-lives" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">FCA Financial Lives Survey</a> — biennial survey of financial wellbeing, used for regional weighting of victim estimates.</p>
            <p>Victim estimates are modelled, not directly measured. The IMLT methodology was updated in 2019 to include online illegal lending. Pre- and post-2019 figures are not directly comparable. COVID-19 suppressed prosecution counts in 2020-21 due to court closures. All figures are for England unless otherwise stated.</p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
