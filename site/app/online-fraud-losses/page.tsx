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
  millionsGBP: number;
}

interface FraudByTypePoint {
  year: number;
  investmentFraud: number;
  shoppingFraud: number;
  romanceFraud: number;
  advanceFee: number;
  other: number;
}

interface ReportVolumePoint {
  year: number;
  reports: number;
}

interface ReimbursementPoint {
  year: number;
  pctReimbursed: number;
}

interface OnlineFraudData {
  totalLosses: LossPoint[];
  fraudByType: FraudByTypePoint[];
  reportVolumes: ReportVolumePoint[];
  reimbursementRate: ReimbursementPoint[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 0, 1);
}

function sparkFrom(arr: number[], n = 10) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function OnlineFraudLossesPage() {
  const [data, setData] = useState<OnlineFraudData | null>(null);

  useEffect(() => {
    fetch('/data/online-fraud-losses/online_fraud_losses.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const totalLossesSeries: Series[] = data
    ? [{
        id: 'total-losses',
        label: 'Total online fraud losses',
        colour: '#E63946',
        data: data.totalLosses.map(d => ({
          date: yearToDate(d.year),
          value: d.millionsGBP,
        })),
      }]
    : [];

  const fraudByTypeSeries: Series[] = data
    ? [
        {
          id: 'investment',
          label: 'Investment fraud',
          colour: '#E63946',
          data: data.fraudByType.map(d => ({
            date: yearToDate(d.year),
            value: d.investmentFraud,
          })),
        },
        {
          id: 'shopping',
          label: 'Shopping fraud',
          colour: '#6B7280',
          data: data.fraudByType.map(d => ({
            date: yearToDate(d.year),
            value: d.shoppingFraud,
          })),
        },
        {
          id: 'romance',
          label: 'Romance fraud',
          colour: '#F4A261',
          data: data.fraudByType.map(d => ({
            date: yearToDate(d.year),
            value: d.romanceFraud,
          })),
        },
      ]
    : [];

  const reimbursementSeries: Series[] = data
    ? [{
        id: 'reimbursement',
        label: 'Victim reimbursement rate',
        colour: '#264653',
        data: data.reimbursementRate.map(d => ({
          date: yearToDate(d.year),
          value: d.pctReimbursed,
        })),
      }]
    : [];

  const totalLossesAnnotations: Annotation[] = [
    { date: new Date(2020, 0, 1), label: "2020: Pandemic drives surge in online activity" },
    { date: new Date(2023, 5, 1), label: "2023: Online Safety Act enacted" },
  ];

  const fraudByTypeAnnotations: Annotation[] = [
    { date: new Date(2020, 0, 1), label: "2020: Crypto scams added to investment fraud" },
    { date: new Date(2024, 0, 1), label: "2024: Investment fraud overtakes shopping fraud" },
  ];

  const reimbursementAnnotations: Annotation[] = [
    { date: new Date(2019, 0, 1), label: "2019: Voluntary CRM Code introduced" },
    { date: new Date(2024, 5, 1), label: "2024: Mandatory reimbursement rules take effect" },
  ];

  // ── Derived values ────────────────────────────────────────────────────

  const latestLoss = data?.totalLosses[data.totalLosses.length - 1];
  const firstLoss = data?.totalLosses[0];
  const latestReports = data?.reportVolumes[data.reportVolumes.length - 1];
  const firstReports = data?.reportVolumes[0];
  const latestReimbursement = data?.reimbursementRate[data.reimbursementRate.length - 1];
  const lowestReimbursement = data?.reimbursementRate.reduce((a, b) => a.pctReimbursed < b.pctReimbursed ? a : b);

  const lossPctChange = latestLoss && firstLoss
    ? Math.round(((latestLoss.millionsGBP - firstLoss.millionsGBP) / firstLoss.millionsGBP) * 100)
    : 116;

  return (
    <>
      <TopicNav topic="Online Fraud Losses" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Online Fraud Losses"
          question="How Much Are Britons Losing to Online Fraud?"
          finding="Online fraud cost UK consumers an estimated \u00A31.34 billion in 2025 \u2014 more than double the 2017 figure. Investment fraud, fuelled by cryptocurrency scams and AI-generated deepfakes, is now the single largest category. Over 200,000 fraud reports were filed with Action Fraud, yet an estimated 85% of incidents still go unreported."
          colour="#E63946"
          preposition="with"
        />

        {/* ── Editorial context ─────────────────────────────────────────── */}
        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              The scale of online fraud in the United Kingdom has grown relentlessly for the better part of a decade. In 2017, UK Finance estimated that consumers lost around \u00A3620 million to digitally-enabled fraud. By 2025, that figure has more than doubled to \u00A31.34 billion. The trajectory is not subtle: every year since records began in this format, total losses have increased. The pandemic accelerated what was already a steep trend \u2014 lockdowns pushed millions of transactions online, and fraudsters followed. Between 2019 and 2021 alone, reported fraud cases jumped 80 per cent. The Crime Survey for England and Wales now classifies fraud as the single most common crime type, ahead of theft, criminal damage, and violent offences combined.
            </p>
            <p>
              What is perhaps most alarming is the shifting composition of fraud. Online shopping fraud \u2014 fake goods, non-delivery scams, counterfeit websites \u2014 dominated the early part of the period. But since 2022, investment fraud has overtaken it as the largest single category by value. This is driven overwhelmingly by cryptocurrency scams, which exploit social media advertising and, increasingly, AI-generated deepfake endorsements from public figures. The average loss per victim for investment fraud is now around \u00A314,600 \u2014 compared with \u00A3720 for a shopping scam. Romance fraud, while lower in volume, carries devastating personal consequences alongside an average loss exceeding \u00A37,000 per case. The emotional and psychological cost of fraud \u2014 shame, isolation, loss of trust \u2014 rarely appears in the statistics but is consistently highlighted in victim surveys.
            </p>
            <p>
              There are, however, genuine signs of structural improvement. The Payment Systems Regulator introduced mandatory reimbursement for authorised push payment (APP) fraud in October 2024, requiring banks to reimburse victims within five business days unless gross negligence is proven. The reimbursement rate, which had fallen from 58% in 2017 to a low of 41% in 2023 as fraud complexity outpaced bank defences, has since recovered to 52% in 2025. The Online Safety Act, while primarily designed to tackle harmful content, has given Ofcom new powers to compel platforms to remove fraudulent advertisements. Several major banks have deployed real-time AI detection systems that flag unusual payment patterns before transactions complete. These measures have not reversed the overall trend, but they have slowed its acceleration and improved outcomes for victims who do come forward. The challenge ahead is twofold: closing the vast gap between crimes committed and crimes reported, and keeping pace with criminal innovation in an era where generative AI makes sophisticated fraud accessible to anyone.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-losses', label: 'Total losses' },
          { id: 'sec-by-type', label: 'By fraud type' },
          { id: 'sec-reimbursement', label: 'Reimbursement' },
        ]} />

        {/* ── Metric cards ──────────────────────────────────────────────── */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Total online fraud losses (annual)"
            value={latestLoss ? `\u00A3${(latestLoss.millionsGBP / 1000).toFixed(2)}B` : '\u00A31.34B'}
            unit="2025"
            direction="up"
            polarity="up-is-bad"
            changeText={`+${lossPctChange}% since 2017 \u00b7 investment fraud now largest category`}
            sparklineData={
              data ? sparkFrom(data.totalLosses.map(d => d.millionsGBP)) : [620,720,820,940,1040,1110,1170,1290,1340]
            }
            source="UK Finance \u2014 Fraud: The Facts, 2025"
            href="#sec-losses"
          />
          <MetricCard
            label="Fraud reports filed (annual)"
            value={latestReports ? latestReports.reports.toLocaleString() : '212,000'}
            unit="2025"
            direction="up"
            polarity="up-is-bad"
            changeText={
              latestReports && firstReports
                ? `up from ${firstReports.reports.toLocaleString()} in 2017 \u00b7 est. 85% go unreported`
                : 'up from 56,000 in 2017 \u00b7 est. 85% go unreported'
            }
            sparklineData={
              data ? sparkFrom(data.reportVolumes.map(d => d.reports)) : [56000,68000,82000,118000,148000,162000,175000,198000,212000]
            }
            source="Action Fraud / NFIB \u2014 Annual Report, 2025"
            href="#sec-by-type"
          />
          <MetricCard
            label="Victim reimbursement rate"
            value={latestReimbursement ? `${latestReimbursement.pctReimbursed}%` : '52%'}
            unit="2025"
            direction="up"
            polarity="up-is-good"
            changeText={
              latestReimbursement && lowestReimbursement
                ? `recovering from ${lowestReimbursement.pctReimbursed}% low in ${lowestReimbursement.year} \u00b7 mandatory rules now in force`
                : 'recovering from 41% low in 2023 \u00b7 mandatory rules now in force'
            }
            sparklineData={
              data ? sparkFrom(data.reimbursementRate.map(d => d.pctReimbursed)) : [58,56,54,49,46,43,41,47,52]
            }
            source="Payment Systems Regulator \u2014 APP Fraud Data, 2025"
            href="#sec-reimbursement"
          />
        </div>

        {/* ── Chart 1: Total losses ─────────────────────────────────────── */}
        <ScrollReveal>
          <div id="sec-losses" className="mb-12">
            <LineChart
              series={totalLossesSeries}
              annotations={totalLossesAnnotations}
              title="Total online fraud losses, UK consumers, 2017\u20132025"
              subtitle="Annual losses in millions of pounds. Includes APP fraud, card fraud, and online banking fraud."
              yLabel="Losses (\u00A3m)"
              source={{
                name: 'UK Finance',
                dataset: 'Fraud: The Facts',
                url: 'https://www.ukfinance.org.uk/data-and-research/data/fraud/fraud-the-facts',
                date: 'Mar 2026',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* ── Chart 2: By fraud type ────────────────────────────────────── */}
        <ScrollReveal>
          <div id="sec-by-type" className="mb-12">
            <LineChart
              series={fraudByTypeSeries}
              annotations={fraudByTypeAnnotations}
              title="Online fraud losses by type, 2017\u20132025"
              subtitle="Investment fraud overtook shopping fraud in 2024, driven by cryptocurrency scams and deepfake endorsements."
              yLabel="Losses (\u00A3m)"
              source={{
                name: 'UK Finance',
                dataset: 'Fraud: The Facts \u2014 Breakdown by Category',
                url: 'https://www.ukfinance.org.uk/data-and-research/data/fraud/fraud-the-facts',
                date: 'Mar 2026',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* ── Chart 3: Reimbursement rate ────────────────────────────────── */}
        <ScrollReveal>
          <div id="sec-reimbursement" className="mb-12">
            <LineChart
              series={reimbursementSeries}
              annotations={reimbursementAnnotations}
              title="Victim reimbursement rate, 2017\u20132025"
              subtitle="Proportion of fraud losses returned to victims by banks and payment providers. Now recovering after mandatory rules."
              yLabel="% reimbursed"
              source={{
                name: 'Payment Systems Regulator',
                dataset: 'APP Fraud Performance Data',
                url: 'https://www.psr.org.uk/our-work/app-scams/',
                date: 'Mar 2026',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* ── Positive callout ──────────────────────────────────────────── */}
        <ScrollReveal>
          <PositiveCallout
            title="Mandatory reimbursement shifting the balance toward victims"
            value="52%"
            unit="reimbursement rate"
            description="In October 2024, the Payment Systems Regulator made it mandatory for banks to reimburse victims of authorised push payment fraud within five business days. The reimbursement rate has risen from its 2023 low of 41% to 52% in 2025 — the first sustained improvement since tracking began. Several major banks have also deployed AI-powered transaction monitoring that flags suspicious payments in real time, preventing an estimated 1.4 million fraudulent transactions in 2024. While total losses continue to rise, victims who report fraud are now significantly more likely to recover their money than at any point since 2019."
            source="Source: Payment Systems Regulator — APP Fraud Performance Data, 2025. UK Finance — Fraud: The Facts, 2025."
          />
        </ScrollReveal>

        {/* ── Sources & Methodology ─────────────────────────────────────── */}
        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p>
              <a href="https://www.ukfinance.org.uk/data-and-research/data/fraud/fraud-the-facts" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">UK Finance — Fraud: The Facts</a> — primary data source for total losses and fraud type breakdowns. Annual publication, latest edition March 2026.
            </p>
            <p>
              <a href="https://www.actionfraud.police.uk/reporting-fraud-and-cyber-crime" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Action Fraud / NFIB</a> — report volume data from the National Fraud Intelligence Bureau. Annual.
            </p>
            <p>
              <a href="https://www.psr.org.uk/our-work/app-scams/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Payment Systems Regulator</a> — APP fraud reimbursement performance data. Annual.
            </p>
            <p>
              UK Finance methodology changed in 2020 to include cryptocurrency investment scams within the investment fraud category. Reimbursement data covers UK Finance member institutions only, not all payment providers. An estimated 85% of fraud goes unreported to Action Fraud, meaning actual losses are substantially higher than reported figures.
            </p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
