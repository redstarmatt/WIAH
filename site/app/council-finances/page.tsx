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
        label: 'Service spending (£bn)',
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
          question="Are Britain's Local Councils Going Bankrupt?"
          finding="12 English councils have issued Section 114 notices (effective bankruptcy) since 2018, including Birmingham, Thurrock, and Woking. The local government funding gap is £4 billion per year. Council tax has risen 40% in real terms since 2010 while services have been cut by 25%. 1 in 6 councils are at risk of financial failure."
          colour="#6B7280"
          preposition="in"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>English councils have lost £14 billion a year in government grant since 2010 — a 37% real-terms reduction, from £39 billion to £25 billion. The consequences have been acute. Twelve councils have issued Section 114 notices since 2018, the statutory declaration that a council cannot balance its budget — the local government equivalent of insolvency. Birmingham accumulated a £760 million deficit, largely from an equal pay liability ignored for years. Thurrock borrowed £500 million to invest in commercial property through a specialist vehicle, then watched rising interest rates and falling asset values collapse the strategy. Woking ran up £1.2 billion in debt financing an ambitious town-centre regeneration programme on cheap borrowing that turned expensive. The Chartered Institute of Public Finance and Accountancy (CIPFA) assessed one in six English councils as at risk of financial failure.</p>
            <p>The structural problem is the collision of rising demand with revenues constrained by statute and austerity. Adult social care — the statutory duty to fund care for elderly and disabled residents — now consumes 36% of council budgets, up from 29% in 2010, as an ageing population drives both volume and complexity of need. Children's services costs rose 20% in real terms between 2019 and 2023 as placement costs soared and complex cases increased. Council tax, the principal locally-controlled revenue stream, is capped at 5% annual growth without triggering a local referendum — a constraint introduced in 2012. It has risen 40% in real terms since 2010 but cannot keep pace with demand. Business rates income — the other major local tax — has stagnated as high streets hollowed out and large online retailers optimised their physical footprints.</p>
            </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-grants', label: 'Government Grants' },
          { id: 'sec-spending', label: 'Service Spending' },
          { id: 'sec-services', label: 'By Service Area' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Cut to government grants since 2010 (real terms)"
              value="37%"
              direction="down"
              polarity="up-is-good"
              changeText="2022/23 · From £39bn to £25bn · Council tax raised 40% to compensate · Poorer areas hit hardest"
              sparklineData={[100, 92, 83, 76, 73, 68, 65, 63, 62, 63, 63]}
              href="#sec-grants"
            />
            <MetricCard
              label="Councils issuing Section 114 notices since 2018"
              value="12"
              direction="up"
              polarity="up-is-bad"
              changeText="2024 · Birmingham: £760M deficit · Thurrock: £500M · Woking: £1.2bn · 1 in 6 at risk"
              sparklineData={[0, 0, 1, 2, 3, 4, 6, 9, 12]}
              href="#sec-grants"
            />
            <MetricCard
              label="Annual local government funding gap"
              value="£4bn"
              direction="up"
              polarity="up-is-bad"
              changeText="2024 · LGA estimate · Adult social care main pressure · Libraries, parks, buses cut"
              sparklineData={[1, 1.5, 2, 2.5, 3, 3, 3.5, 3.5, 4]}
              href="#sec-grants"
            />
          </div>
        

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
              title="English council service spending, £ billion"
              subtitle="Total English council expenditure on services (2010/11 – 2022/23), current prices."
              series={spendingSeries}
              yLabel="£ billion"
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
            <p className="font-mono text-xs text-wiah-mid mt-4">Source: DLUHC — Local Authority Revenue Expenditure and Financing</p>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="What's improving"
            value="£64bn"
            unit="Local Government Finance Settlement for 2024/25 — the largest cash increase in a decade"
            description="The 2024/25 Local Government Finance Settlement provided £64 billion, including a £4 billion increase for adult social care and £1.5 billion for children's services — the largest cash increase in a decade. The Spending Review 2025 is expected to provide multi-year settlements allowing longer-term planning. CIPFA's Financial Resilience Index now monitors 120 financial indicators across all councils, providing early warning of impending distress. The government is reviewing business rates, which have created distortions favouring out-of-town retail over high streets. Council tax referendum limits — requiring a local vote for rises above 5% — remain in place."
            source="Source: DLUHC — Local Authority Revenue Expenditure 2022/23; LGA — Local Government Funding 2024."
          />
        </ScrollReveal>

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
