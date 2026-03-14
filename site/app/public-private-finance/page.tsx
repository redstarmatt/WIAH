'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'HM Treasury', dataset: 'PFI and PF2 Annual Data', url: 'https://www.gov.uk/government/collections/private-finance-initiative-and-private-finance-2-projects-data', date: '2025', note: 'PFI committed £42bn in repayments on projects originally worth £13bn; 3.2x multiplier' },
  { num: 2, name: 'HM Treasury', dataset: 'PFI Programme Closure', url: 'https://www.gov.uk/government/organisations/hm-treasury', date: '2018', note: 'Treasury formally ended PFI and PF2 programme in 2018; no new contracts signed' },
  { num: 3, name: 'NHS England', dataset: 'NHS PFI Trust Analysis', url: 'https://www.england.nhs.uk/statistics/', date: '2024', note: '118 NHS trusts still in PFI contracts; down from 127 in 2018' },
];

// ── Types ────────────────────────────────────────────────────────────────────

interface DataPoint {
  year: number;
  outstandingPFI: number;
  annualPFICharge: number;
  nhsPFISharePct: number;
  educationPFISharePct: number;
}

interface TopicData {
  national: {
    timeSeries: DataPoint[];
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

export default function TopicPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/public-private-finance/public_private_finance.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const chart1Series: Series[] = data
    ? [
        {
          id: 'outstandingPFI',
          label: 'Outstanding PFI payments (£bn)',
          colour: '#E63946',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.outstandingPFI,
          })),
        },
        {
          id: 'annualPFICharge',
          label: 'Annual PFI charge (£bn)',
          colour: '#F4A261',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.annualPFICharge,
          })),
        },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        {
          id: 'nhsPFISharePct',
          label: 'NHS PFI as % of capital budget',
          colour: '#264653',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.nhsPFISharePct,
          })),
        },
        {
          id: 'educationPFISharePct',
          label: 'Education PFI as % of capital budget',
          colour: '#F4A261',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.educationPFISharePct,
          })),
        },
      ]
    : [];

  const chart1Annotations: Annotation[] = [
    { date: new Date(2018, 5, 1), label: '2018: HMT announces end of PF2 programme' },
    { date: new Date(2023, 5, 1), label: '2023: First major hospital PFI contracts expire' },
  ];

  const chart2Annotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: '2020: Covid exposes PFI inflexibility in hospital management' },
  ];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Public Private Finance" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Democracy & Governance"
          question="What Did PFI Contracts Actually Cost?"
          finding={<>PFI and PF2 contracts committed the public sector to £42 billion in repayments on projects originally worth £13 billion.<Cite nums={1} /> Hospitals and schools are still paying contracts that ended years ago.<Cite nums={3} /></>}
          colour="#6B7280"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The Private Finance Initiative was designed to bring private capital into public infrastructure without adding to government borrowing figures. In practice, it created long-term payment obligations that far exceeded the value of the assets built. Across more than 700 PFI contracts signed between 1992 and 2018, the public sector committed to £42 billion in total repayments for projects with an original capital value of £13 billion — a multiplier of 3.2 times. The premium covered financing costs, maintenance fees, and private-sector profit margins that were locked in for 25 to 30 years regardless of whether the underlying services remained fit for purpose.<Cite nums={1} /></p>
            <p>The consequences are still felt across the NHS and education system. Some 118 NHS trusts remain tied to PFI contracts, with annual charges consuming a significant share of their capital budgets — money that cannot be redirected to new equipment or building repairs. During the pandemic, PFI inflexibility hampered hospital reconfigurations because altering contracted buildings required renegotiation with private operators. The Treasury formally ended the PFI programme in 2018, acknowledging that the model had failed to deliver value for money. But the existing contracts will continue running into the 2040s. Some trusts have bought out deals early at discounts, though this requires upfront capital that financially distressed organisations rarely have.<Cite nums={2} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-chart1', label: 'Chart 1' },
          { id: 'sec-chart2', label: 'Chart 2' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Outstanding PFI payments"
            value="£42bn"
            unit=""
            direction="flat"
            polarity="up-is-bad"
            changeText={<>Committed payments to 2040s · declining as contracts expire<Cite nums={1} /></>}
            sparklineData={[58, 55, 52, 50, 48, 46, 44, 43, 42, 42, 42]}
            href="#sec-coverage"
          />
          <MetricCard
            label="Multiplier on original capital cost"
            value="3.2×"
            unit=""
            direction="flat"
            polarity="up-is-bad"
            changeText="£13bn of assets cost £42bn+ to procure · financing costs dominant"
            sparklineData={[3.5, 3.4, 3.4, 3.3, 3.3, 3.2, 3.2, 3.2, 3.2, 3.2, 3.2]}
            href="#sec-coverage"
          />
          <MetricCard
            label="NHS trusts still in PFI"
            value="118"
            unit=""
            direction="down"
            polarity="up-is-bad"
            changeText={<>Down from 127 in 2018 as contracts expire<Cite nums={3} /></>}
            sparklineData={[127, 127, 126, 125, 124, 123, 122, 121, 120, 119, 118]}
            href="#sec-coverage"
          />
        </div>

        {/* Charts */}
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Outstanding PFI/PF2 payment commitments (£bn), 2015-2025"
              subtitle="Total future payments committed by UK public sector under PFI and PF2 contracts (£bn). Declining as contracts expire."
              series={chart1Series}
              annotations={chart1Annotations}
              yLabel="Value"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="PFI charges as % of departmental budgets, 2015-2025"
              subtitle="PFI annual charge as percentage of NHS England and schools capital budget."
              series={chart2Series}
              annotations={chart2Annotations}
              yLabel="Value"
            />
          </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="PFI programme ended permanently"
            value="2018"
            unit="PFI and PF2 programme closed"
            description={<>The Treasury formally ended the PFI and PF2 programme in 2018, meaning no new contracts will be signed.<Cite nums={2} /> Contracts are expiring from the late 2020s. The Infrastructure and Projects Authority monitors all active contracts. Some trusts have successfully bought out PFI contracts early at significant discounts.<Cite nums={1} /></>}
            source="Source: HMT — PFI and PF2 annual data, 2025."
          />
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        {/* Sources */}
        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
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
      </main>
    </>
  );
}
