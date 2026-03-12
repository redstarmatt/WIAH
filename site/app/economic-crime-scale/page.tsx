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

interface LossPoint {
  year: number;
  billionGBP: number;
}

interface FraudSharePoint {
  year: number;
  percent: number;
}

interface ProsecutionPoint {
  year: number;
  percent: number;
}

interface APPFraudPoint {
  year: number;
  millionGBP: number;
}

interface SectorLoss {
  sector: string;
  billionGBP: number;
}

interface EconomicCrimeData {
  totalLosses: LossPoint[];
  fraudShareOfCrime: FraudSharePoint[];
  prosecutionRate: ProsecutionPoint[];
  authorisedPushPaymentFraud: APPFraudPoint[];
  bySectorLosses: SectorLoss[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 0, 1);
}

function sparkFrom(arr: number[], n = 10) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function EconomicCrimeScalePage() {
  const [data, setData] = useState<EconomicCrimeData | null>(null);

  useEffect(() => {
    fetch('/data/economic-crime-scale/economic_crime_scale.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const lossesSeries: Series[] = data
    ? [{
        id: 'total-losses',
        label: 'Total economic crime losses',
        colour: '#E63946',
        data: data.totalLosses.map(d => ({
          date: yearToDate(d.year),
          value: d.billionGBP,
        })),
      }]
    : [];

  const fraudShareSeries: Series[] = data
    ? [{
        id: 'fraud-share',
        label: 'Fraud as % of all crime',
        colour: '#6B7280',
        data: data.fraudShareOfCrime.map(d => ({
          date: yearToDate(d.year),
          value: d.percent,
        })),
      }]
    : [];

  const prosecutionSeries: Series[] = data
    ? [{
        id: 'prosecution-rate',
        label: 'Prosecution rate for fraud offences',
        colour: '#E63946',
        data: data.prosecutionRate.map(d => ({
          date: yearToDate(d.year),
          value: d.percent,
        })),
      }]
    : [];

  const lossesAnnotations: Annotation[] = [
    { date: new Date(2017, 0, 1), label: '2017: Fraud included in CSEW' },
    { date: new Date(2022, 0, 1), label: '2022: Economic Crime Act' },
  ];

  const prosecutionAnnotations: Annotation[] = [
    { date: new Date(2019, 0, 1), label: '2019: Action Fraud reform announced' },
    { date: new Date(2023, 0, 1), label: '2023: Fraud Strategy published' },
  ];

  // ── Derived metrics ──────────────────────────────────────────────────────

  const latestLoss = data?.totalLosses[data.totalLosses.length - 1];
  const earliestLoss = data?.totalLosses[0];
  const latestFraudShare = data?.fraudShareOfCrime[data.fraudShareOfCrime.length - 1];
  const latestProsecution = data?.prosecutionRate[data.prosecutionRate.length - 1];
  const earliestProsecution = data?.prosecutionRate[0];

  const lossIncrease = latestLoss && earliestLoss
    ? ((latestLoss.billionGBP - earliestLoss.billionGBP) / earliestLoss.billionGBP * 100).toFixed(0)
    : '142';

  const prosecutionDrop = latestProsecution && earliestProsecution
    ? (earliestProsecution.percent - latestProsecution.percent).toFixed(1)
    : '5.3';

  return (
    <>
      <TopicNav topic="Economic Crime Scale" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Economic Crime Scale"
          question="How Much Does Economic Crime Cost Britain?"
          finding="Economic crime costs the UK an estimated £8.7 billion a year and is rising. Fraud alone accounts for 42% of all crime in England and Wales, yet fewer than 3% of fraud offences result in a prosecution. The gap between the scale of the problem and the criminal justice response is widening."
          colour="#E63946"
          preposition="with"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              The National Crime Agency estimates that economic crime costs the United Kingdom approximately £8.7 billion
              per year — up from £3.6 billion a decade ago. Fraud is by far the largest component, accounting for
              roughly 57% of total losses, followed by money laundering and cyber-enabled crime. When the Office for
              National Statistics expanded the Crime Survey for England and Wales to include fraud and computer misuse
              in 2017, the total volume of crime in England and Wales effectively doubled overnight — revealing a
              category of offending that had been statistically invisible for decades. Fraud now constitutes 42% of all
              crime experienced by adults in England and Wales, making it the single most common crime type. Yet it
              receives a fraction of the policing resource devoted to other offence categories: fewer than 1% of
              police officers work in dedicated fraud teams.
            </p>
            <p>
              The prosecution gap is stark. In 2015, around 8% of recorded fraud offences resulted in a charge. By
              2025, that figure had fallen to 2.9%. The decline reflects a combination of factors: the volume of
              fraud has grown far faster than enforcement capacity; much of it is cross-border and digitally enabled,
              making investigation complex; and Action Fraud — the national reporting centre — has been widely
              criticised for failing to refer viable cases for investigation. The government published a Fraud Strategy
              in 2023, pledging to replace Action Fraud with a new system and to create a National Fraud Squad, but
              implementation has been slow. Meanwhile, authorised push payment (APP) fraud — where victims are
              manipulated into transferring money directly to criminals — peaked at £583 million in 2021 before falling
              to £374 million in 2025, partly due to new mandatory reimbursement rules introduced by the Payment
              Systems Regulator in October 2024.
            </p>
            <p>
              The human cost of economic crime is routinely underestimated. Fraud victims report higher rates of anxiety
              and depression than victims of many violent crimes, and older people who lose their savings to scams often
              never recover financially. The aggregate £8.7 billion figure itself is likely conservative — the NCA
              acknowledges it is a modelled estimate, and the true figure could be substantially higher when unreported
              losses and the proceeds of money laundering through UK property and corporate structures are fully
              accounted for. What the data makes clear is that economic crime is not a peripheral concern: it is the
              most common crime in the country, and the enforcement response remains nowhere near proportionate to the
              scale.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-losses', label: 'Total losses' },
          { id: 'sec-fraud-share', label: 'Fraud share' },
          { id: 'sec-prosecution', label: 'Prosecutions' },
          { id: 'sec-sectors', label: 'By sector' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Total economic crime losses (annual)"
            value={latestLoss ? `£${latestLoss.billionGBP}B` : '£8.7B'}
            unit="2025 est."
            direction="up"
            polarity="up-is-bad"
            changeText={`+${lossIncrease}% since 2015 · fraud largest component at 57%`}
            sparklineData={
              data ? sparkFrom(data.totalLosses.map(d => d.billionGBP)) : []
            }
            source="NCA — National Strategic Assessment, 2025"
            href="#sec-losses"
          />
          <MetricCard
            label="Fraud as share of all crime"
            value={latestFraudShare ? `${latestFraudShare.percent}%` : '42%'}
            unit="2025"
            direction="up"
            polarity="up-is-bad"
            changeText="now the single most common crime type in England & Wales"
            sparklineData={
              data ? sparkFrom(data.fraudShareOfCrime.map(d => d.percent)) : []
            }
            source="ONS — Crime Survey for England & Wales, 2025"
            href="#sec-fraud-share"
          />
          <MetricCard
            label="Fraud prosecution rate"
            value={latestProsecution ? `${latestProsecution.percent}%` : '2.9%'}
            unit="2025"
            direction="down"
            polarity="down-is-bad"
            changeText={`down ${prosecutionDrop} pp since 2015 · fewer than 1% of police in fraud teams`}
            sparklineData={
              data ? sparkFrom(data.prosecutionRate.map(d => d.percent)) : []
            }
            source="Home Office — Crime Outcomes, 2025"
            href="#sec-prosecution"
          />
        </div>

        {/* Chart 1: Total economic crime losses */}
        <ScrollReveal>
          <div id="sec-losses" className="mb-12">
            <LineChart
              series={lossesSeries}
              title="Estimated total economic crime losses, UK, 2015–2025"
              subtitle="NCA modelled estimates. Includes fraud, money laundering, cyber-enabled crime, corruption, and tax evasion."
              yLabel="£ billion"
              annotations={lossesAnnotations}
              source={{
                name: 'National Crime Agency',
                dataset: 'National Strategic Assessment of Serious and Organised Crime',
                frequency: 'annual',
                url: 'https://www.nationalcrimeagency.gov.uk/what-we-do/crime-threats/fraud-and-economic-crime',
                date: 'Feb 2026',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 2: Fraud as share of all crime */}
        <ScrollReveal>
          <div id="sec-fraud-share" className="mb-12">
            <LineChart
              series={fraudShareSeries}
              title="Fraud as percentage of all crime, England & Wales, 2015–2025"
              subtitle="Crime Survey for England & Wales. Fraud and computer misuse added to survey in 2017."
              yLabel="% of all crime"
              annotations={[
                { date: new Date(2017, 0, 1), label: '2017: Fraud added to CSEW' },
              ]}
              source={{
                name: 'ONS',
                dataset: 'Crime Survey for England and Wales',
                frequency: 'quarterly',
                url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/crimeandjustice',
                date: 'Feb 2026',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 3: Prosecution rate */}
        <ScrollReveal>
          <div id="sec-prosecution" className="mb-12">
            <LineChart
              series={prosecutionSeries}
              title="Fraud prosecution rate, England & Wales, 2015–2025"
              subtitle="Percentage of recorded fraud offences resulting in a charge. Falling despite rising crime volumes."
              yLabel="% charged"
              annotations={prosecutionAnnotations}
              source={{
                name: 'Home Office',
                dataset: 'Crime Outcomes in England and Wales',
                frequency: 'annual',
                url: 'https://www.gov.uk/government/statistics/crime-outcomes-in-england-and-wales',
                date: 'Feb 2026',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Sector breakdown */}
        <ScrollReveal>
          <div id="sec-sectors" className="mb-12">
            <div className="bg-white rounded-lg border border-wiah-border p-8">
              <h2 className="text-lg font-bold text-wiah-black mb-2">
                Economic crime losses by sector (£ billion, latest estimate)
              </h2>
              <p className="text-sm text-wiah-mid mb-6">
                NCA modelled estimates. Fraud to individuals is the largest single category.
              </p>
              <div className="mt-6 space-y-4">
                {data?.bySectorLosses.map((s) => {
                  const maxVal = 3.5;
                  const pct = (s.billionGBP / maxVal) * 100;
                  return (
                    <div key={s.sector}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-wiah-black">{s.sector}</span>
                        <span className="font-mono text-sm font-bold text-wiah-black">£{s.billionGBP}B</span>
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
              <p className="font-mono text-xs text-wiah-mid mt-4">
                Source: NCA — National Strategic Assessment of Serious and Organised Crime, 2025
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="APP fraud losses falling after mandatory reimbursement rules"
            value="£374M"
            description="Authorised push payment (APP) fraud — where victims are manipulated into transferring money directly to criminals — peaked at £583 million in 2021. Following the Payment Systems Regulator's introduction of mandatory reimbursement rules in October 2024, losses fell to £374 million in 2025, a 36% decline from the peak. The new rules require banks to reimburse victims within five business days unless gross negligence is proven, shifting the financial incentive toward prevention. Major banks have invested in real-time fraud detection and confirmation-of-payee checks, and the proportion of APP losses reimbursed to victims rose from 59% in 2022 to 87% in 2025."
            source="Source: UK Finance — Annual Fraud Report, 2025. Payment Systems Regulator — APP Fraud Performance Data, 2025."
          />
        </ScrollReveal>

        {/* Sources & Methodology */}
        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p>
              <a href="https://www.nationalcrimeagency.gov.uk/what-we-do/crime-threats/fraud-and-economic-crime" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">
                National Crime Agency
              </a> — National Strategic Assessment of Serious and Organised Crime. Retrieved Feb 2026.
            </p>
            <p>
              <a href="https://www.gov.uk/government/publications/serious-and-organised-crime-strategy" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">
                Home Office
              </a> — Serious and Organised Crime Strategy: Economic Crime. Retrieved Feb 2026.
            </p>
            <p>
              <a href="https://www.ukfinance.org.uk/policy-and-guidance/reports-and-publications/annual-fraud-report" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">
                UK Finance
              </a> — Annual Fraud Report: Authorised Push Payment Fraud. Retrieved Feb 2026.
            </p>
            <p>
              <a href="https://www.ons.gov.uk/peoplepopulationandcommunity/crimeandjustice" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">
                ONS
              </a> — Crime Survey for England and Wales: fraud and computer misuse. Retrieved Feb 2026.
            </p>
            <p className="mt-4">
              Total economic crime loss estimates are NCA modelled figures and carry significant uncertainty.
              Crime Survey methodology changed in 2016 to include fraud and computer misuse.
              Prosecution rates are not directly comparable pre/post 2017 due to counting rule changes.
              APP fraud figures cover UK Finance members only and likely undercount total losses.
            </p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
