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

interface ExecutivePayData {
  national: {
    timeSeries: Array<{ date: string; ceoPay: number; workerRatio: number }>;
  };
  metadata: {
    sources: Array<{ name: string; dataset: string; url: string; frequency: string }>;
    methodology: string;
    knownIssues: string[];
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: string): Date {
  return new Date(parseInt(y), 5, 1);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function ExecutivePayPage() {
  const [data, setData] = useState<ExecutivePayData | null>(null);

  useEffect(() => {
    fetch('/data/executive-pay/executive_pay.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const ceoPaySeries: Series[] = data
    ? [{
        id: 'ceo-pay',
        label: 'FTSE 100 CEO median total pay (£m)',
        colour: '#E63946',
        data: data.national.timeSeries.map(d => ({
          date: yearToDate(d.date),
          value: d.ceoPay,
        })),
      }]
    : [];

  const ratioSeries: Series[] = data
    ? [{
        id: 'worker-ratio',
        label: 'CEO-to-worker pay ratio',
        colour: '#E63946',
        data: data.national.timeSeries.map(d => ({
          date: yearToDate(d.date),
          value: d.workerRatio,
        })),
      }]
    : [];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Executive Pay" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Executive Pay"
          question="How Much More Are Bosses Paid Than Workers?"
          finding="FTSE 100 CEOs earn on average £3.9 million per year — 118 times the median UK full-time worker salary — a ratio that has more than doubled since 2000."
          colour="#E63946"
          preposition="with"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The gap between what Britain's top executives earn and what their workers take home has widened dramatically over the past three decades. In 2023, the median total remuneration for a FTSE 100 chief executive reached £3.9 million — equivalent to earning the median UK full-time salary of £33,000 in under four days. The High Pay Centre, which tracks executive remuneration through annual analysis of company reports, found that the FTSE 100 CEO-to-worker pay ratio stood at 118:1 in 2023, up from approximately 47:1 in 2000 and from just 20:1 in 1980. Total pay packages combine base salary, annual bonus, and long-term incentive plans (LTIPs) that vest over three-to-five years, typically linked to earnings per share or total shareholder return targets. In boom years, LTIP vestings can dwarf base salary, pushing headline pay figures to multiples that attract significant public attention. In 2019 — the pre-pandemic peak — the highest-paid FTSE 100 CEO received over £58 million in total remuneration, more than 1,700 times the UK median wage.</p>
            <p>Pay governance in the UK has evolved considerably since the first statutory &ldquo;say on pay&rdquo; vote was introduced in 2003. Since 2013, shareholders have had a binding vote on companies' remuneration policies at least every three years, and an advisory vote on the annual remuneration report. The Investment Association, which represents major institutional investors, publishes a public register of companies that have received significant shareholder opposition — defined as 20% or more votes against — on pay resolutions. Remuneration committees, composed of independent non-executive directors, are responsible for setting and overseeing executive pay, guided by the UK Corporate Governance Code. From 2020, large UK companies with more than 250 employees have been required to disclose their CEO pay ratio relative to median, 25th percentile, and 75th percentile employee pay. Despite these governance improvements, average CEO pay in real terms has risen substantially faster than worker pay over the same period, suggesting that governance mechanisms have moderated but not arrested the underlying trend.</p>
            </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-ceo-pay', label: 'CEO Pay' },
          { id: 'sec-ratio', label: 'Pay Ratio' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="FTSE 100 CEO average pay"
              value="£3.9M"
              direction="up"
              polarity="up-is-bad"
              changeText="2023 · 118&times; the median UK worker salary · up from £1.8M in 2016"
              sparklineData={[1.8, 2.1, 2.5, 2.8, 3.0, 3.2, 3.6, 3.9]}
              href="#sec-ceo-pay"
            />
            <MetricCard
              label="CEO-to-worker pay ratio"
              value="118&times;"
              direction="up"
              polarity="up-is-bad"
              changeText="2023 · Up from 47&times; in 2000 · OECD average is around 80&times;"
              sparklineData={[47, 55, 65, 75, 85, 95, 108, 118]}
              href="#sec-ceo-pay"
            />
            <MetricCard
              label="Companies with shareholder pay rebellion"
              value="32%"
              direction="up"
              polarity="up-is-good"
              changeText="2023 · Up from 8 companies in 2015 · Governance pressure growing"
              sparklineData={[8, 10, 12, 14, 17, 20, 26, 32]}
              href="#sec-ceo-pay"
            />
          </div>
        

        <ScrollReveal>
          <section id="sec-ceo-pay" className="mb-12">
            <LineChart
              title="FTSE 100 CEO median total pay, 2010–2023 (£m)"
              subtitle="Median single total figure remuneration for FTSE 100 chief executives, including salary, bonus, and vested long-term incentives."
              series={ceoPaySeries}
              yLabel="£m"
              source={{
                name: 'High Pay Centre',
                dataset: 'FTSE 100 CEO Pay Survey — annual remuneration reports',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-ratio" className="mb-12">
            <LineChart
              title="CEO-to-worker pay ratio, 2010–2023"
              subtitle="FTSE 100 CEO median pay divided by UK median full-time annual earnings (ONS ASHE). Ratio shows how many times more the average FTSE 100 CEO earns than the typical UK worker."
              series={ratioSeries}
              yLabel="Ratio (&times;)"
              source={{
                name: 'High Pay Centre &amp; ONS',
                dataset: 'CEO Pay Survey &amp; Annual Survey of Hours and Earnings',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="What's changing"
            value="Shareholder rebellions rising"
            unit="2023"
            description="Shareholder rebellions on executive pay have risen sharply — in 2023, 32 FTSE 100 companies faced significant opposition (20%+ votes against) on pay resolutions, up from just 8 in 2015. The Investment Association's public register of companies with substantial opposition has increased board accountability. From 2020, mandatory CEO pay ratio disclosure has made the gap between boardroom and workforce pay visible in annual reports for the first time — a transparency measure that has begun to shift the narrative in remuneration committee discussions."
            source="Source: High Pay Centre — FTSE 100 CEO Pay Survey 2023; Investment Association — Shareholder Voting & Engagement Report 2023; ONS — Annual Survey of Hours and Earnings 2023."
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
