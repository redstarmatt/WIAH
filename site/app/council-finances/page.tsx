'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';

// ── Types ────────────────────────────────────────────────────────────────────

interface CouncilFinancesData {
  national: {
    governmentGrant: {
      timeSeries: Array<{ year: string; realTermsIndexed: number }>;
      latestYear: string;
      latestIndexed: number;
      reductionSince2010Pct: number;
    };
    serviceSpending: {
      timeSeries: Array<{ year: string; spendingBillionGBP: number }>;
      latestYear: string;
      latestBillionGBP: number;
    };
    byServiceArea: Array<{ area: string; sharePct: number }>;
  };
  metadata: {
    sources: Array<{ name: string; dataset: string; url: string; frequency: string }>;
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

export default function CouncilFinancesPage() {
  const [data, setData] = useState<CouncilFinancesData | null>(null);

  useEffect(() => {
    fetch('/data/council-finances/council_finances.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const grantSeries: Series[] = data
    ? [{
        id: 'grant',
        label: 'Real-terms index',
        colour: '#6B7280',
        data: data.national.governmentGrant.timeSeries.map(d => ({
          date: fyToDate(d.year),
          value: d.realTermsIndexed,
        })),
      }]
    : [];

  const spendingSeries: Series[] = data
    ? [{
        id: 'spending',
        label: 'Service spending (&pound;bn)',
        colour: '#6B7280',
        data: data.national.serviceSpending.timeSeries.map(d => ({
          date: fyToDate(d.year),
          value: d.spendingBillionGBP,
        })),
      }]
    : [];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Council Finances" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Council Finances"
          question="Are Britain&apos;s Local Councils Going Bankrupt?"
          finding="12 English councils have issued Section 114 notices (effective bankruptcy) since 2018, including Birmingham, Thurrock, and Woking. The local government funding gap is &pound;4 billion per year. Council tax has risen 40% in real terms since 2010 while services have been cut by 25%. 1 in 6 councils are at risk of financial failure."
          colour="#6B7280"
          preposition="in"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>English councils lost &pound;14 billion a year in government grant between 2010 and 2023 &mdash; a 37% real-terms reduction from &pound;39 billion to &pound;25 billion. Twelve councils have issued Section 114 notices since 2018 &mdash; the statutory declaration that a council cannot balance its budget. Birmingham accumulated a &pound;760 million deficit from an equal pay liability ignored for years; Thurrock borrowed &pound;500 million in commercial property that collapsed in rising rates; Woking ran up &pound;1.2 billion in debt on a regeneration programme. CIPFA assessed one in six councils as at risk of financial failure. Adult social care now consumes 36% of council budgets (up from 29% in 2010), children&apos;s services costs rose 20% in real terms between 2019 and 2023, and SEND demand for Education, Health and Care plans rose 140% since 2014 &mdash; statutory duties that cannot be avoided but are increasingly unaffordable.</p>
            <p>The pressure has hollowed out discretionary services: more than 6,000 library branches have closed or cut hours since 2010, 5,000 miles of supported bus routes have been cut, and planning departments lost 30% of professional staff. Council tax &mdash; capped at 5% annual growth without a local referendum &mdash; has risen 40% in real terms since 2010 but cannot keep pace with demand. The crisis falls unevenly: London boroughs retain significant business rates income, while rural and coastal councils with the highest demand and lowest tax base face the worst squeeze. The 2024/25 Finance Settlement provided &pound;64 billion &mdash; the largest cash increase in a decade &mdash; but remains below the 2010 real-terms level.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-grants', label: 'Government Grants' },
          { id: 'sec-spending', label: 'Service Spending' },
          { id: 'sec-services', label: 'By Service Area' },
        ]} />

        <ScrollReveal>
          <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Cut to government grants since 2010 (real terms)"
              value="37%"
              direction="down"
              polarity="up-is-good"
              changeText="2022/23 &middot; From &pound;39bn to &pound;25bn &middot; Council tax raised 40% to compensate &middot; Poorer areas hit hardest"
              sparklineData={[100, 92, 83, 76, 73, 68, 65, 63, 62, 63, 63]}
              onExpand={() => {}}
            />
            <MetricCard
              label="Councils issuing Section 114 notices since 2018"
              value="12"
              direction="up"
              polarity="up-is-bad"
              changeText="2024 &middot; Birmingham: &pound;760M deficit &middot; Thurrock: &pound;500M &middot; Woking: &pound;1.2bn &middot; 1 in 6 at risk"
              sparklineData={[0, 0, 1, 2, 3, 4, 6, 9, 12]}
              onExpand={() => {}}
            />
            <MetricCard
              label="Annual local government funding gap"
              value="&pound;4bn"
              direction="up"
              polarity="up-is-bad"
              changeText="2024 &middot; LGA estimate &middot; Adult social care main pressure &middot; Libraries, parks, buses cut"
              sparklineData={[1, 1.5, 2, 2.5, 3, 3, 3.5, 3.5, 4]}
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-grants" className="mb-12">
            <LineChart
              title="Government grant to English councils, real terms (2010/11 = 100)"
              subtitle="Real-terms government grant index to English councils, adjusted for inflation using GDP deflator."
              series={grantSeries}
              yLabel="Index (2010/11 = 100)"
              source={{
                name: 'DLUHC',
                dataset: 'Local Authority Revenue Expenditure and Financing',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-spending" className="mb-12">
            <LineChart
              title="English council service spending, &pound; billion"
              subtitle="Total English council expenditure on services (2010/11 &ndash; 2022/23), current prices."
              series={spendingSeries}
              yLabel="&pound; billion"
              source={{
                name: 'DLUHC',
                dataset: 'Local Authority Revenue Expenditure and Financing',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-services" className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-2">Council expenditure by service area, England, 2022/23</h2>
            <p className="text-sm text-wiah-mid font-mono mb-6">Percentage of total council service spending by area.</p>
            {data && (
              <div className="space-y-3">
                {data.national.byServiceArea.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-40 text-sm text-wiah-black flex-shrink-0">{item.area}</div>
                    <div className="flex-1 bg-wiah-border rounded h-5 overflow-hidden">
                      <div
                        className="h-full rounded"
                        style={{ width: `${(item.sharePct / 36) * 100}%`, backgroundColor: '#6B7280' }}
                      />
                    </div>
                    <div className="w-16 text-right text-sm font-mono text-wiah-black">{item.sharePct}%</div>
                  </div>
                ))}
              </div>
            )}
            <p className="font-mono text-xs text-wiah-mid mt-4">Source: DLUHC &mdash; Local Authority Revenue Expenditure and Financing</p>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="What&apos;s improving"
            value="&pound;64bn"
            unit="Local Government Finance Settlement for 2024/25 &mdash; the largest cash increase in a decade"
            description="The 2024/25 Local Government Finance Settlement provided &pound;64 billion, including a &pound;4 billion increase for adult social care and &pound;1.5 billion for children&apos;s services &mdash; the largest cash increase in a decade. The Spending Review 2025 is expected to provide multi-year settlements allowing longer-term planning. CIPFA&apos;s Financial Resilience Index now monitors 120 financial indicators across all councils, providing early warning of impending distress. The government is reviewing business rates, which have created distortions favouring out-of-town retail over high streets. Council tax referendum limits &mdash; requiring a local vote for rises above 5% &mdash; remain in place."
            source="Source: DLUHC &mdash; Local Authority Revenue Expenditure 2022/23; LGA &mdash; Local Government Funding 2024."
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
