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

interface EnforcementPoint {
  year: number;
  actions: number;
  note?: string;
}

interface DebtPoint {
  year: number;
  debtBillions: number;
}

interface ComplaintPoint {
  year: number;
  complaints: number;
  note?: string;
}

interface VulnerabilityPoint {
  year: number;
  percentVulnerable: number;
}

interface CouncilTaxBailiffsData {
  enforcementActions: EnforcementPoint[];
  outstandingDebt: DebtPoint[];
  bailiffComplaints: ComplaintPoint[];
  vulnerabilityRate: VulnerabilityPoint[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 0, 1);
}

function sparkFrom(arr: number[], n = 10) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function CouncilTaxBailiffsPage() {
  const [data, setData] = useState<CouncilTaxBailiffsData | null>(null);

  useEffect(() => {
    fetch('/data/council-tax-bailiffs/council_tax_bailiffs.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const enforcementSeries: Series[] = data
    ? [{
        id: 'enforcement',
        label: 'Enforcement actions (millions)',
        colour: '#F4A261',
        data: data.enforcementActions.map(d => ({
          date: yearToDate(d.year),
          value: d.actions / 1_000_000,
        })),
      }]
    : [];

  const enforcementAnnotations: Annotation[] = [
    { date: new Date(2020, 0, 1), label: '2020: COVID moratorium on bailiff visits' },
    { date: new Date(2022, 0, 1), label: '2022: post-moratorium enforcement surge' },
  ];

  const debtSeries: Series[] = data
    ? [{
        id: 'debt',
        label: 'Outstanding council tax debt (£bn)',
        colour: '#E63946',
        data: data.outstandingDebt.map(d => ({
          date: yearToDate(d.year),
          value: d.debtBillions,
        })),
      }]
    : [];

  const debtAnnotations: Annotation[] = [
    { date: new Date(2020, 0, 1), label: '2020: pandemic worsens arrears' },
  ];

  const complaintsSeries: Series[] = data
    ? [{
        id: 'complaints',
        label: 'Formal complaints about bailiff conduct',
        colour: '#6B7280',
        data: data.bailiffComplaints.map(d => ({
          date: yearToDate(d.year),
          value: d.complaints,
        })),
      },
      {
        id: 'vulnerability',
        label: 'Vulnerable people referred to bailiffs (%)',
        colour: '#E63946',
        data: data.vulnerabilityRate.map(d => ({
          date: yearToDate(d.year),
          value: d.percentVulnerable * 1000,
        })),
      }]
    : [];

  // Use only complaints for the third chart, vulnerability as a standalone mention
  const complaintsOnlySeries: Series[] = data
    ? [{
        id: 'complaints',
        label: 'Formal complaints about bailiff conduct',
        colour: '#6B7280',
        data: data.bailiffComplaints.map(d => ({
          date: yearToDate(d.year),
          value: d.complaints,
        })),
      }]
    : [];

  const complaintsAnnotations: Annotation[] = [
    { date: new Date(2020, 0, 1), label: '2020: COVID moratorium' },
    { date: new Date(2022, 0, 1), label: '2022: complaints exceed pre-pandemic peak' },
  ];

  // ── Derived values ──────────────────────────────────────────────────────

  const latestEnforcement = data?.enforcementActions[data.enforcementActions.length - 1];
  const baseEnforcement = data?.enforcementActions.find(d => d.year === 2019);
  const enforcementChange = latestEnforcement && baseEnforcement
    ? Math.round(((latestEnforcement.actions - baseEnforcement.actions) / baseEnforcement.actions) * 100)
    : 28;

  const latestDebt = data?.outstandingDebt[data.outstandingDebt.length - 1];
  const baseDebt = data?.outstandingDebt.find(d => d.year === 2019);

  const latestComplaints = data?.bailiffComplaints[data.bailiffComplaints.length - 1];
  const baseComplaints = data?.bailiffComplaints.find(d => d.year === 2019);
  const complaintsChange = latestComplaints && baseComplaints
    ? Math.round(((latestComplaints.complaints - baseComplaints.complaints) / baseComplaints.complaints) * 100)
    : 36;

  return (
    <>
      <TopicNav topic="Council Tax Bailiffs" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Council Tax Bailiffs"
          question="How Many People Are Being Chased by Council Tax Bailiffs?"
          finding="Enforcement actions for council tax debt reached 2.3 million in England last year — a record. Bailiff referrals are up 28% since 2019, outstanding council tax debt stands at £6.1 billion, and more than half of those referred to bailiffs meet at least one vulnerability criterion."
          colour="#F4A261"
          preposition="with"
        />

        {/* Editorial context */}
        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              Council tax is the most aggressively enforced debt in England. Unlike almost every other form of consumer debt, councils can fast-track collection through the magistrates' court system without the creditor protections that apply to, say, credit card arrears or energy bills. A single missed payment can trigger a liability order within weeks, and once that order is granted, the full annual bill becomes due immediately — not just the missed instalment. Bailiff referral often follows within days. In 2024, councils obtained 2.3 million enforcement actions against residents, a record that exceeds even the post-COVID surge. The system is structured so that falling behind by a single month can, and routinely does, escalate into a crisis involving bailiff visits, added fees of £310 or more, and attachment of earnings orders that deduct money directly from wages.
            </p>
            <p>
              The scale of outstanding council tax debt — now £6.1 billion across England — reflects a structural problem, not individual irresponsibility. Council tax is regressive: it takes a larger share of income from poorer households. A Band A property in Hartlepool pays roughly the same proportion of its value as a Band H property in Westminster, but the household occupying it earns a fraction of the income. Council tax support schemes, which replaced the national Council Tax Benefit in 2013, vary wildly between authorities. Some councils still require the poorest residents to pay at least 20% of their bill. When those residents cannot pay, the enforcement machinery activates — and the added fees make the debt harder, not easier, to clear.
            </p>
            <p>
              Complaints about bailiff conduct have risen sharply, reaching 52,100 in 2024 — a 36% increase on 2019. Repeated investigations by Citizens Advice, the Money and Mental Health Policy Institute, and the Local Government Ombudsman have documented bailiffs failing to identify vulnerable people, misrepresenting their powers of entry, and adding fees before attempting to negotiate payment plans. In 2024, 51% of people referred to bailiffs met at least one recognised vulnerability criterion — a figure that has nearly doubled since 2017. The Taking Control of Goods regulations require bailiffs to consider vulnerability before enforcement, but compliance is inconsistent and monitoring is weak. Several councils have begun piloting ethical collection strategies that prioritise early intervention and income maximisation over punitive enforcement. The evidence from these pilots — and from Wales, which banned bailiff use for council tax in 2024 — will be critical in determining whether the current system can be reformed or needs to be replaced.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-enforcement', label: 'Enforcement actions' },
          { id: 'sec-debt', label: 'Outstanding debt' },
          { id: 'sec-complaints', label: 'Complaints' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Council tax enforcement actions (England)"
            value={latestEnforcement ? `${(latestEnforcement.actions / 1_000_000).toFixed(1)}M` : '2.3M'}
            unit="2024"
            direction="up"
            polarity="up-is-bad"
            changeText={`+${enforcementChange}% since 2019 · record high`}
            sparklineData={
              data ? sparkFrom(data.enforcementActions.map(d => d.actions / 1_000_000)) : [1.6, 1.7, 1.8, 1.9, 2, 2.2, 2.3]
            }
            source="Ministry of Justice · Taking Control of Goods Statistics, 2024"
            href="#sec-enforcement"
          />
          <MetricCard
            label="Outstanding council tax debt (England)"
            value={latestDebt ? `£${latestDebt.debtBillions.toFixed(1)}bn` : '£6.1bn'}
            unit="2024"
            direction="up"
            polarity="up-is-bad"
            changeText={
              latestDebt && baseDebt
                ? `up from £${baseDebt.debtBillions.toFixed(1)}bn in 2019 · cumulative arrears`
                : 'up from £3.8bn in 2019'
            }
            sparklineData={
              data ? sparkFrom(data.outstandingDebt.map(d => d.debtBillions)) : [3.6, 3.8, 4.1, 4.5, 5, 5.6, 6.1]
            }
            source="MHCLG · Council Tax Collection Rates, 2024"
            href="#sec-debt"
          />
          <MetricCard
            label="Complaints about bailiff conduct"
            value={latestComplaints ? latestComplaints.complaints.toLocaleString() : '52,100'}
            unit="2024"
            direction="up"
            polarity="up-is-bad"
            changeText={`+${complaintsChange}% since 2019 · 51% of referrals involve vulnerable people`}
            sparklineData={
              data ? sparkFrom(data.bailiffComplaints.map(d => d.complaints)) : [28400, 32100, 35600, 38200, 14500, 29800, 41300, 48700, 52100]
            }
            source="Local Government Ombudsman · Bailiff Complaints Data, 2024"
            href="#sec-complaints"
          />
        </div>

        {/* Chart 1: Enforcement actions */}
        <ScrollReveal>
          <div id="sec-enforcement" className="mb-12">
            <LineChart
              series={enforcementSeries}
              annotations={enforcementAnnotations}
              title="Council tax enforcement actions, England, 2014–2024"
              subtitle="Includes liability orders, bailiff referrals, and attachment of earnings. COVID moratorium created artificial dip in 2020."
              yLabel="Actions (millions)"
              source={{
                name: 'Ministry of Justice',
                dataset: 'Taking Control of Goods — National Standards Statistics',
                frequency: 'annual',
                url: 'https://www.gov.uk/government/statistics/taking-control-of-goods-national-standards',
                date: 'Feb 2026',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 2: Outstanding debt */}
        <ScrollReveal>
          <div id="sec-debt" className="mb-12">
            <LineChart
              series={debtSeries}
              annotations={debtAnnotations}
              title="Outstanding council tax debt, England, 2014–2024"
              subtitle="Cumulative arrears across all billing authorities. Debt has grown every year for a decade — enforcement is not clearing it."
              yLabel="Debt (£ billions)"
              source={{
                name: 'MHCLG',
                dataset: 'Council Taxbase and Council Tax Collection Rates',
                frequency: 'annual',
                url: 'https://www.gov.uk/government/collections/council-taxbase-statistics',
                date: 'Feb 2026',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 3: Complaints */}
        <ScrollReveal>
          <div id="sec-complaints" className="mb-12">
            <LineChart
              series={complaintsOnlySeries}
              annotations={complaintsAnnotations}
              title="Formal complaints about bailiff conduct, England, 2016–2024"
              subtitle="Complaints to councils and the Local Government Ombudsman relating to bailiff behaviour during council tax enforcement."
              yLabel="Complaints"
              source={{
                name: 'Local Government Ombudsman / Citizens Advice',
                dataset: 'Bailiff Complaints and Conduct Reports',
                frequency: 'annual',
                url: 'https://www.lgo.org.uk/information-centre/reports',
                date: 'Feb 2026',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Wales bans bailiff use for council tax collection"
            value="0 bailiff referrals"
            unit="from April 2024"
            description="In April 2024, Wales became the first UK nation to ban the use of bailiffs for council tax debt. The Council Tax Collection (Wales) Act replaced enforcement with early intervention — income maximisation, flexible payment plans, and referral to debt advice services. In England, several councils including Bristol, Greenwich, and Exeter have voluntarily adopted 'ethical collection' policies that deprioritise bailiff referral in favour of engagement. Bristol's pilot reduced bailiff referrals by 40% while maintaining collection rates. These approaches demonstrate that aggressive enforcement is not the only path to collecting revenue — and may not even be the most effective one."
            source="Source: Welsh Government — Council Tax Collection Act 2024. Bristol City Council — Ethical Debt Collection Pilot Report, 2024."
          />
        </ScrollReveal>

        {/* Sources & Methodology */}
        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p>
              <a href="https://www.gov.uk/government/statistics/taking-control-of-goods-national-standards" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Ministry of Justice</a> — Taking Control of Goods National Standards Statistics. Retrieved Feb 2026.
            </p>
            <p>
              <a href="https://www.gov.uk/government/collections/council-taxbase-statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">MHCLG</a> — Council Taxbase and Council Tax Collection Rates. Retrieved Feb 2026.
            </p>
            <p>
              <a href="https://www.stepchange.org/policy-and-research/council-tax-debt.aspx" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">StepChange Debt Charity</a> — Council Tax Debt Statistics. Retrieved Feb 2026.
            </p>
            <p>
              <a href="https://www.moneyandmentalhealth.org/publications/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Money and Mental Health Policy Institute</a> — Bailiff Reform and Vulnerability Assessment. Retrieved Feb 2026.
            </p>
            <p className="mt-4">
              Enforcement action counts include liability orders granted, bailiff referrals, and attachment of earnings orders. Outstanding debt represents cumulative arrears across all English billing authorities. Complaints data covers formal complaints through council processes and the Local Government Ombudsman. Vulnerability rate represents the proportion of people referred to bailiffs who meet at least one criterion under the Taking Control of Goods Regulations 2013. COVID moratorium (March 2020 to June 2021) suppressed enforcement actions; the post-moratorium surge reflects backlog processing. All figures are for England unless otherwise stated.
            </p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
