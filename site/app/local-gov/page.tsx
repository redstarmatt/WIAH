'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';

// ── Types ────────────────────────────────────────────────────────────────────

interface FundingPoint {
  year: string;
  realTermsFundingIndexed: number;
}

interface CouncilTaxPoint {
  year: string;
  averageBandDGBP: number;
}

interface Section114Notice {
  council: string;
  year: number;
  estimatedDeficit: number;
}

interface ServiceSpendingItem {
  service: string;
  realTermsChangeFrom2010Pct: number;
}

interface LocalGovData {
  topic: string;
  lastUpdated: string;
  national: {
    fundingReduction: {
      timeSeries: FundingPoint[];
      latestYear: string;
      latestIndex: number;
      note: string;
    };
    section114Notices: {
      councils: Section114Notice[];
      totalDeficitMillions: number;
      note: string;
    };
    councilTax: {
      timeSeries: CouncilTaxPoint[];
      latestYear: string;
      latestBandD: number;
      changeFrom2010: number;
    };
    serviceSpending: {
      latestYear: string;
      categories: ServiceSpendingItem[];
    };
  };
  metadata: {
    sources: { name: string; dataset: string; url: string; frequency: string }[];
    methodology: string;
    knownIssues: string[];
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function fyToDate(fy: string): Date {
  const start = parseInt(fy.split('/')[0]);
  return new Date(start, 3, 1);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function LocalGovPage() {
  const [data, setData] = useState<LocalGovData | null>(null);

  useEffect(() => {
    fetch('/data/local-gov/local_gov.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const fundingSeries: Series[] = data
    ? [{
        id: 'funding',
        label: 'Real-terms funding (2010/11=100)',
        colour: '#E63946',
        data: data.national.fundingReduction.timeSeries.map(d => ({
          date: fyToDate(d.year),
          value: d.realTermsFundingIndexed,
        })),
      }]
    : [];

  const councilTaxSeries: Series[] = data
    ? [{
        id: 'council-tax',
        label: 'Average Band D council tax (£)',
        colour: '#F4A261',
        data: data.national.councilTax.timeSeries.map(d => ({
          date: fyToDate(d.year),
          value: d.averageBandDGBP,
        })),
      }]
    : [];

  // ── Metric cards ──────────────────────────────────────────────────────

  const fundingMetric = {
    label: 'Real-terms council funding',
    value: '−32%',
    polarity: 'up-is-good' as const,
    direction: 'down' as const,
    changeText: 'Since 2010/11 · Core funding fell from 100 to 68 · Central grants cut more than council tax raised',
    sparklineData: [100, 94, 89, 84, 79, 73, 70, 69, 69, 70, 71, 69, 68],
  };

  const councilTaxMetric = {
    label: 'Average Band D council tax',
    value: '£1,900',
    polarity: 'up-is-bad' as const,
    direction: 'up' as const,
    changeText: '2024/25 · Up £704 since 2010/11 · Councils raising max allowed to close funding gap',
    sparklineData: [1196, 1205, 1196, 1199, 1286, 1352, 1449, 1522, 1671, 1779, 1900],
  };

  const section114Metric = {
    label: 'Section 114 notices issued',
    value: '8',
    polarity: 'up-is-bad' as const,
    direction: 'up' as const,
    changeText: 'Since 2020 · Including Birmingham (UK&apos;s largest) · Total estimated deficit £3.3bn',
    sparklineData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 3, 1],
  };

  return (
    <main className="bg-white">
      {/* Sticky nav */}
      <TopicNav topic="Local Government" />

      {/* Topic header */}
      <TopicHeader
        topic="Local Government"
        colour="#6B7280"
        question="Is Your Council Actually Going Broke?"
        finding="Local government funding has fallen 32% in real terms since 2010, forcing councils to cut services, raise council tax by 59%, and eight councils have issued Section 114 notices declaring they cannot meet their financial obligations."
        preposition="with"
      />

      {/* Finding */}
      <section className="max-w-3xl mx-auto px-6 py-12">
        <p className="text-lg leading-relaxed text-wiah-black">
          Local government in England has faced unprecedented funding cuts since 2010. Real-terms core funding has fallen 32%, forcing councils to cut discretionary services, raise council tax to the maximum, and eight councils have issued Section 114 notices — a formal declaration of insolvency. The system is under extreme stress.
        </p>
      </section>

      {/* Metric cards */}
      <section className="max-w-4xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <ScrollReveal>
            <MetricCard
              label={fundingMetric.label}
              value={fundingMetric.value}
              direction={fundingMetric.direction}
              polarity={fundingMetric.polarity}
              changeText={fundingMetric.changeText}
              sparklineData={fundingMetric.sparklineData}
            />
          </ScrollReveal>
          <ScrollReveal>
            <MetricCard
              label={councilTaxMetric.label}
              value={councilTaxMetric.value}
              direction={councilTaxMetric.direction}
              polarity={councilTaxMetric.polarity}
              changeText={councilTaxMetric.changeText}
              sparklineData={councilTaxMetric.sparklineData}
            />
          </ScrollReveal>
          <ScrollReveal>
            <MetricCard
              label={section114Metric.label}
              value={section114Metric.value}
              direction={section114Metric.direction}
              polarity={section114Metric.polarity}
              changeText={section114Metric.changeText}
              sparklineData={section114Metric.sparklineData}
            />
          </ScrollReveal>
        </div>
      </section>


      {/* Chart 1: Funding */}
      <ScrollReveal>
        <section className="max-w-4xl mx-auto px-6 py-12">
          <LineChart
            title="Real-terms local government funding, England, 2010–2024"
            subtitle="Core spending power indexed to 2010/11=100 (inflation-adjusted). Has fallen 32% in real terms since 2010/11, with central government grants cut more sharply than council tax rises could offset."
            series={fundingSeries}
            source={{
              name: 'IFS',
              dataset: 'English local government funding analysis',
              frequency: 'annual',
              url: 'https://ifs.org.uk/publications/local-government-funding-and-service-data',
            }}
          />
        </section>
      </ScrollReveal>

      {/* Chart 2: Council tax */}
      <ScrollReveal>
        <section className="max-w-4xl mx-auto px-6 py-12">
          <LineChart
            title="Average Band D council tax, England, 2010–2025"
            subtitle="Annual council tax for a Band D property. Has risen 59% in cash terms since 2010/11. In the face of reduced central grants, councils have raised council tax to the maximum permitted level."
            series={councilTaxSeries}
            source={{
              name: 'MHCLG',
              dataset: 'Council tax statistics',
              frequency: 'annual',
              url: 'https://www.gov.uk/government/collections/council-tax-statistics',
            }}
          />
        </section>
      </ScrollReveal>

      {/* Section 114 table */}
      <ScrollReveal>
        <section className="max-w-4xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold text-wiah-black mb-8">
            Councils effectively bankrupt: Section 114 notices since 2020
          </h2>
          {data && (
            <div className="overflow-x-auto border border-wiah-border rounded">
              <table className="w-full text-sm">
                <thead className="bg-wiah-light border-b border-wiah-border">
                  <tr>
                    <th className="px-4 py-3 text-left font-sans font-bold text-wiah-black">Council</th>
                    <th className="px-4 py-3 text-right font-sans font-bold text-wiah-black">Year issued</th>
                    <th className="px-4 py-3 text-right font-sans font-bold text-wiah-black">Estimated deficit (£m)</th>
                  </tr>
                </thead>
                <tbody>
                  {data.national.section114Notices.councils.map((notice, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-wiah-light'}>
                      <td className="px-4 py-3 font-sans text-wiah-black">{notice.council}</td>
                      <td className="px-4 py-3 font-mono text-right text-wiah-black">{notice.year}</td>
                      <td className="px-4 py-3 font-mono text-right text-wiah-black">{notice.estimatedDeficit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <p className="font-mono text-xs text-wiah-mid mt-4">
            Source: MHCLG — Section 114 notices and government intervention reports. Updated March 2026.
          </p>
        </section>
      </ScrollReveal>

      {/* Service spending bar chart */}
      <ScrollReveal>
        <section className="max-w-4xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold text-wiah-black mb-8">
            Real-terms change in service spending, 2010/11 to 2022/23
          </h2>
          {data && (
            <div className="space-y-4">
              {data.national.serviceSpending.categories.map((item, idx) => {
                const isPositive = item.realTermsChangeFrom2010Pct > 0;
                const barWidth = Math.abs(item.realTermsChangeFrom2010Pct);
                return (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-48 flex-shrink-0 text-sm font-sans text-wiah-black">
                      {item.service}
                    </div>
                    <div className="flex-grow flex items-center gap-2">
                      <div
                        className="h-6 rounded transition-all"
                        style={{
                          width: `${Math.min((barWidth / 52) * 100, 100)}%`,
                          backgroundColor: isPositive ? '#2A9D8F' : '#E63946',
                        }}
                      />
                      <span className="font-mono text-sm font-bold text-wiah-black" style={{
                        color: isPositive ? '#2A9D8F' : '#E63946',
                      }}>
                        {isPositive ? '+' : ''}{item.realTermsChangeFrom2010Pct}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          <p className="font-mono text-xs text-wiah-mid mt-6">
            Source: MHCLG — Local authority service expenditure. Real-terms deflation using GDP deflator. Updated March 2026.
          </p>
        </section>
      </ScrollReveal>

      {/* Editorial context */}
      <section className="max-w-3xl mx-auto px-6 py-12 space-y-6">
        <p className="text-base leading-relaxed text-wiah-black">
          No part of the English state has been cut deeper. IFS analysis shows real-terms council funding fell 32% between 2010/11 and 2023/24 as central grants shrank faster than local revenue could grow. Councils slashed what they legally could: planning spending is down 52% in real terms, highways maintenance 41%, libraries 37%, parks and environmental services 28%. What they could not cut&mdash;adult social care, now consuming more than 40% of average council budgets&mdash;kept growing in cash terms, squeezing everything else. The result is a system that funds statutory obligations and almost nothing beyond them.
        </p>
        <p className="text-base leading-relaxed text-wiah-black">
          Eight councils have issued Section 114 notices since 2020, formally declaring they cannot balance their books. The combined deficit stands at &pound;3.3 billion. Birmingham City Council, the UK&apos;s largest authority, accounts for &pound;760 million of that&mdash;driven partly by an unresolved equal pay liability. Woking Borough Council racked up &pound;1.2 billion in losses from speculative commercial property investments that collapsed as interest rates rose; Thurrock followed a similar path. In each case central government has dispatched commissioners and emergency funding, but the interventions treat symptoms rather than the structural shortfall.
        </p>
        <p className="text-base leading-relaxed text-wiah-black">
          Average Band D council tax has climbed from &pound;1,196 to &pound;1,900 since 2010/11&mdash;up &pound;704, or 59% in cash terms&mdash;with councils raising by the maximum 5% a year permitted without a referendum. Even so, the gap keeps widening: SEND-related costs have doubled, homelessness spending has more than doubled, and adult social care demand outpaces inflation. The LGA estimated in 2024 that English councils face a collective &pound;4 billion shortfall by 2026/27. Fundamental reform&mdash;including revaluation of council tax bands, still based on 1991 property prices&mdash;has been deferred by every government for over three decades.
        </p>
      </section>

      {/* Positive callout */}
      <ScrollReveal>
        <section className="max-w-3xl mx-auto px-6 py-12">
          <PositiveCallout
            title="What&apos;s improving"
            value="+12%"
            unit="real-terms increase in children&apos;s services since 2010"
            description="Children&apos;s services &mdash; covering safeguarding, looked-after children, and early help &mdash; has seen a 12% real-terms increase in spending since 2010/11, even as most other services have been cut. This reflects statutory protections and political priority given to child protection after high-profile cases. Investment in early intervention and family support has grown, with evidence it reduces the number of children entering the care system."
            source="Source: MHCLG &mdash; Local authority revenue expenditure and financing 2022/23."
          />
        </section>
      </ScrollReveal>

      {/* Sources */}
      <section className="max-w-3xl mx-auto px-6 py-12">
        <h2 className="font-sans text-xl font-bold text-wiah-black mb-6">Sources</h2>
        {data && (
          <ul className="space-y-3 font-mono text-sm text-wiah-mid">
            {data.metadata.sources.map((src, idx) => (
              <li key={idx}>
                <strong>{src.name}</strong> — {src.dataset}
                <br />
                <a
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-wiah-blue hover:underline break-all"
                >
                  {src.url}
                </a>
                <br />
                Updated {src.frequency}
              </li>
            ))}
          </ul>
        )}
      </section>

    </main>
  );
}
