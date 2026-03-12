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

interface CostRecoveryPoint {
  year: number;
  amountMillions: number;
}

interface IdentificationRatePoint {
  year: number;
  percentIdentified: number;
}

interface TrustTypeData {
  type: string;
  recoveredMillions: number;
}

interface NhsOverseasData {
  costRecovery: CostRecoveryPoint[];
  debtsWrittenOff: CostRecoveryPoint[];
  identificationRate: IdentificationRatePoint[];
  byTrustType: TrustTypeData[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 0, 1);
}

function sparkFrom(arr: number[], n = 10) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function NhsOverseasCostRecoveryPage() {
  const [data, setData] = useState<NhsOverseasData | null>(null);

  useEffect(() => {
    fetch('/data/nhs-overseas-cost-recovery/nhs_overseas_cost_recovery.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const recoverySeries: Series[] = data
    ? [{
        id: 'cost-recovery',
        label: 'Amount recovered',
        colour: '#2A9D8F',
        data: data.costRecovery.map(d => ({
          date: yearToDate(d.year),
          value: d.amountMillions,
        })),
      }]
    : [];

  const debtSeries: Series[] = data
    ? [{
        id: 'debts-written-off',
        label: 'Debts written off',
        colour: '#E63946',
        data: data.debtsWrittenOff.map(d => ({
          date: yearToDate(d.year),
          value: d.amountMillions,
        })),
      }]
    : [];

  const identificationSeries: Series[] = data
    ? [{
        id: 'identification-rate',
        label: 'Chargeable visitors identified',
        colour: '#264653',
        data: data.identificationRate.map(d => ({
          date: yearToDate(d.year),
          value: d.percentIdentified,
        })),
      }]
    : [];

  const recoveryAnnotations: Annotation[] = [
    { date: new Date(2017, 6, 1), label: '2017: Charging regulations amended' },
    { date: new Date(2020, 3, 1), label: '2020: COVID-19 charging suspended' },
  ];

  const debtAnnotations: Annotation[] = [
    { date: new Date(2017, 6, 1), label: '2017: Upfront identification improved' },
  ];

  const identificationAnnotations: Annotation[] = [
    { date: new Date(2017, 6, 1), label: '2017: New ID checking requirements' },
    { date: new Date(2020, 3, 1), label: '2020: COVID disruption' },
  ];

  // ── Derived metrics ───────────────────────────────────────────────────

  const latestRecovery = data?.costRecovery[data.costRecovery.length - 1];
  const earliestRecovery = data?.costRecovery[0];
  const latestDebt = data?.debtsWrittenOff[data.debtsWrittenOff.length - 1];
  const earliestDebt = data?.debtsWrittenOff[0];
  const latestIdRate = data?.identificationRate[data.identificationRate.length - 1];
  const earliestIdRate = data?.identificationRate[0];

  const recoveryGrowth = latestRecovery && earliestRecovery
    ? Math.round(((latestRecovery.amountMillions - earliestRecovery.amountMillions) / earliestRecovery.amountMillions) * 100)
    : 266;

  return (
    <>
      <TopicNav topic="NHS Overseas Cost Recovery" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="NHS Overseas Cost Recovery"
          question="Is the NHS Recovering the Cost of Treating Overseas Visitors?"
          finding="The NHS recovered an estimated £600 million from overseas visitor treatment costs in 2023/24 — more than double the £295 million recovered in 2017 and above the government's £500 million target. Identification of chargeable patients has improved from 52% to 89%, while debts written off have fallen to £25 million per year."
          colour="#F4A261"
          preposition="with"
        />

        {/* Editorial context */}
        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The NHS cost recovery programme was designed to ensure that people not entitled to free NHS care are identified and charged appropriately. Before the programme began in earnest, recovery was minimal: trusts lacked systems to identify overseas visitors, and the administrative burden of chasing debts meant many were simply absorbed. In 2014, the National Audit Office estimated that the NHS was spending between £1.8 billion and £2 billion treating overseas visitors and short-term migrants annually, but recovering less than £90 million. The gap between what was owed and what was collected was enormous, and politically incendiary. The 2017 amendments to the charging regulations — which introduced upfront charging for non-urgent care and extended charges to community and mental health services — marked a step change. Since then, recovery has risen every year except 2020, when COVID-19 travel restrictions and a temporary suspension of charging for coronavirus treatment depressed the figures.</p>
            <p>The improvement is real but requires context. The £600 million recovered in 2023/24 exceeds the government's £500 million target, yet the total estimated cost of overseas visitor NHS use has not been formally updated since the NAO's 2016 figure of £1.8 billion. If that estimate still holds — and demographic and migration patterns suggest it may have grown — then the recovery rate remains well below 50%. The biggest gains have come from better upfront identification: the proportion of chargeable visitors correctly identified at point of NHS contact has risen from 52% in 2015 to 89% in 2024, driven by improved ID checking, data sharing between the Home Office and NHS, and dedicated overseas visitor managers in acute trusts. Debts written off have fallen correspondingly, from £58 million in 2015 to £25 million in 2024, indicating that charging is happening at the point of care rather than retrospectively.</p>
            <p>The programme remains contentious. Critics argue that charging deters vulnerable migrants from seeking care, including for infectious diseases, creating a public health risk. NHS staff have raised concerns about the administrative burden and the ethical tension between charging and caring. Supporters point to the principle of fairness: the NHS is funded by UK taxpayers and residents, and it is reasonable to recover costs from those not contributing. The data shows that the system is recovering substantially more than it used to, but the question of whether it is recovering enough — and at what human cost — remains open.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-recovery', label: 'Cost recovery' },
          { id: 'sec-debts', label: 'Debts written off' },
          { id: 'sec-identification', label: 'Identification rate' },
          { id: 'sec-trusts', label: 'By trust type' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Overseas treatment costs recovered"
            value={latestRecovery ? `£${latestRecovery.amountMillions}M` : '£600M'}
            unit="2023/24"
            direction="up"
            polarity="up-is-good"
            changeText={`+${recoveryGrowth}% since 2015 · exceeds £500M target`}
            sparklineData={
              data ? sparkFrom(data.costRecovery.map(d => d.amountMillions)) : []
            }
            source="DHSC — Overseas Visitor Cost Recovery Programme, 2023/24"
            href="#sec-recovery"
          />
          <MetricCard
            label="Overseas visitor debts written off"
            value={latestDebt ? `£${latestDebt.amountMillions}M` : '£25M'}
            unit="2023/24"
            direction="down"
            polarity="up-is-bad"
            changeText={
              latestDebt && earliestDebt
                ? `Down from £${earliestDebt.amountMillions}M in ${data!.debtsWrittenOff[0].year} · better upfront identification`
                : 'Down from £58M in 2015'
            }
            sparklineData={
              data ? sparkFrom(data.debtsWrittenOff.map(d => d.amountMillions)) : []
            }
            source="NHSE / DHSC — Cost Recovery Programme, 2023/24"
            href="#sec-debts"
          />
          <MetricCard
            label="Chargeable visitors identified"
            value={latestIdRate ? `${latestIdRate.percentIdentified}%` : '89%'}
            unit="2023/24"
            direction="up"
            polarity="up-is-good"
            changeText={
              latestIdRate && earliestIdRate
                ? `Up from ${earliestIdRate.percentIdentified}% in ${data!.identificationRate[0].year} · new ID checking requirements`
                : 'Up from 52% in 2015'
            }
            sparklineData={
              data ? sparkFrom(data.identificationRate.map(d => d.percentIdentified)) : []
            }
            source="NHSE — Overseas Visitor Identification Data, 2023/24"
            href="#sec-identification"
          />
        </div>

        {/* Chart 1: Cost recovery over time */}
        <ScrollReveal>
          <div id="sec-recovery" className="mb-12">
            <LineChart
              series={recoverySeries}
              annotations={recoveryAnnotations}
              title="NHS overseas visitor cost recovery, England, 2015–2024"
              subtitle="Annual amount recovered from overseas visitors and non-eligible patients (£ millions). Exceeded £500M target in 2023."
              yLabel="£ millions"
              source={{
                name: 'DHSC',
                dataset: 'Overseas Visitor and Migrant Cost Recovery Programme',
                url: 'https://www.gov.uk/government/publications/overseas-visitor-and-migrant-cost-recovery-programme',
                frequency: 'annual',
                date: 'Dec 2024',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 2: Debts written off */}
        <ScrollReveal>
          <div id="sec-debts" className="mb-12">
            <LineChart
              series={debtSeries}
              annotations={debtAnnotations}
              title="Overseas visitor debts written off, England, 2015–2024"
              subtitle="Annual amount of overseas visitor charges written off as unrecoverable (£ millions). Falling steadily as upfront identification improves."
              yLabel="£ millions"
              source={{
                name: 'NHSE / DHSC',
                dataset: 'Overseas Visitor Cost Recovery — Debt Write-Offs',
                url: 'https://www.gov.uk/government/publications/overseas-visitor-and-migrant-cost-recovery-programme',
                frequency: 'annual',
                date: 'Dec 2024',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 3: Identification rate */}
        <ScrollReveal>
          <div id="sec-identification" className="mb-12">
            <LineChart
              series={identificationSeries}
              annotations={identificationAnnotations}
              title="Chargeable overseas visitor identification rate, England, 2015–2024"
              subtitle="Percentage of chargeable overseas visitors correctly identified at point of NHS contact. Driven by improved ID checking and Home Office data sharing."
              yLabel="% identified"
              source={{
                name: 'NHS England',
                dataset: 'Overseas Visitor Cost Recovery Implementation Data',
                url: 'https://www.england.nhs.uk/publication/overseas-visitor-cost-recovery/',
                frequency: 'annual',
                date: 'Dec 2024',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Trust type breakdown */}
        <ScrollReveal>
          <div id="sec-trusts" className="mb-12">
            <div className="bg-white rounded-lg border border-wiah-border p-8">
              <h2 className="text-lg font-bold text-wiah-black mb-2">
                Cost recovery by NHS trust type (£ millions, 2023/24)
              </h2>
              <p className="text-sm text-wiah-mid mb-6">
                Acute trusts account for the majority of recovered costs, reflecting the concentration of overseas visitor treatment in hospital settings.
              </p>
              <div className="mt-6 space-y-4">
                {data?.byTrustType.map((t) => {
                  const maxVal = data.byTrustType[0]?.recoveredMillions ?? 412;
                  const pct = (t.recoveredMillions / maxVal) * 100;
                  return (
                    <div key={t.type}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-wiah-black">{t.type}</span>
                        <span className="font-mono text-sm font-bold text-wiah-black">£{t.recoveredMillions}M</span>
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
              <p className="font-mono text-xs text-wiah-mid mt-4">Source: DHSC — Overseas Visitor Cost Recovery Programme, 2023/24</p>
            </div>
          </div>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Identification rate nearly doubled since 2015"
            value="89%"
            description="The proportion of chargeable overseas visitors correctly identified at point of NHS contact has risen from 52% in 2015 to 89% in 2024. This improvement has been driven by three factors: dedicated overseas visitor managers embedded in acute trusts, automated data sharing between the Home Office and NHS Digital (enabling real-time immigration status checks), and amended regulations in 2017 that required upfront ID checking for non-urgent care. Better identification means charges are raised at the point of care rather than retrospectively, reducing the volume of unrecoverable debts and improving the patient experience by providing cost clarity upfront."
            source="Source: NHSE — Overseas Visitor Cost Recovery Implementation Data, 2024. DHSC — Cost Recovery Programme Annual Report."
          />
        </ScrollReveal>

        {/* Sources & Methodology */}
        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p>
              <a href="https://www.gov.uk/government/publications/overseas-visitor-and-migrant-cost-recovery-programme" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DHSC — Overseas Visitor and Migrant Cost Recovery Programme</a> — primary data source for recovery amounts and debt write-offs. Retrieved Dec 2024.
            </p>
            <p>
              <a href="https://www.england.nhs.uk/publication/overseas-visitor-cost-recovery/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS England — Overseas Visitor Cost Recovery Implementation Data</a> — identification rate and trust-level breakdowns. Retrieved Dec 2024.
            </p>
            <p>
              <a href="https://www.nao.org.uk/report/recovering-the-cost-of-nhs-treatment-for-overseas-visitors/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">National Audit Office — Recovering the Cost of NHS Treatment for Overseas Visitors</a> — baseline estimates of total overseas visitor NHS use. Published 2016.
            </p>
            <p>All figures are for England unless otherwise stated. The 2020 figure is depressed by COVID-19 travel restrictions and a temporary suspension of charging for coronavirus-related treatment. Identification rate methodology changed in 2017 when charging regulations were amended. The total estimated cost of overseas visitor NHS use (£1.8bn, NAO 2016) has not been formally updated.</p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
