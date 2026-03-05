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
        label: 'FTSE 100 CEO median total pay (&pound;m)',
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
          finding="FTSE 100 CEOs earn on average &pound;3.9 million per year &mdash; 118 times the median UK full-time worker salary &mdash; a ratio that has more than doubled since 2000."
          colour="#E63946"
          preposition="with"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The median FTSE 100 CEO earned &pound;3.9 million in 2023 &mdash; equivalent to earning the UK median annual salary in under four days. The CEO-to-worker pay ratio stood at 118:1 in 2023, up from 47:1 in 2000 and 20:1 in 1980, according to the High Pay Centre. A 2022 Investment Association review found no statistically significant correlation between CEO pay levels and total shareholder return across FTSE 100 companies over the preceding decade, and the High Pay Centre identifies the structural cause: remuneration consultants benchmark pay against peers, creating an upward ratchet regardless of performance. From 2020, large companies must disclose their CEO pay ratio in annual reports; despite this, real CEO pay has risen substantially faster than worker pay, suggesting governance mechanisms have moderated but not arrested the trend.</p>
            <p>The sharpest pay ratios are in retailers, hospitality, and diversified financial firms &mdash; those with large numbers of lower-paid frontline workers. The disparity is worst in London and the South East, where FTSE 100 headquarters are concentrated. Gender inequality persists at the top: women represent just 9&percnt; of FTSE 100 chief executives and the median female CEO pay was around 20&percnt; lower than male median pay in 2023, reflecting differences in tenure and sector concentration. Shareholder governance pressure has grown &mdash; 32 FTSE 100 companies faced significant opposition on pay resolutions in 2023, up from 8 in 2015 &mdash; but binding shareholder votes apply only to remuneration policy, not to individual awards, limiting their effect on year-to-year outcomes.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-ceo-pay', label: 'CEO Pay' },
          { id: 'sec-ratio', label: 'Pay Ratio' },
        ]} />

        <ScrollReveal>
          <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="FTSE 100 CEO average pay"
              value="&pound;3.9M"
              direction="up"
              polarity="up-is-bad"
              changeText="2023 &middot; 118&times; the median UK worker salary &middot; up from &pound;1.8M in 2016"
              sparklineData={[1.8, 2.1, 2.5, 2.8, 3.0, 3.2, 3.6, 3.9]}
              href="#sec-overview"/>
            <MetricCard
              label="CEO-to-worker pay ratio"
              value="118&times;"
              direction="up"
              polarity="up-is-bad"
              changeText="2023 &middot; Up from 47&times; in 2000 &middot; OECD average is around 80&times;"
              sparklineData={[47, 55, 65, 75, 85, 95, 108, 118]}
              href="#sec-ceo-pay"/>
            <MetricCard
              label="Companies with shareholder pay rebellion"
              value="32&percnt;"
              direction="up"
              polarity="up-is-good"
              changeText="2023 &middot; Up from 8 companies in 2015 &middot; Governance pressure growing"
              sparklineData={[8, 10, 12, 14, 17, 20, 26, 32]}
              href="#sec-ratio"/>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-ceo-pay" className="mb-12">
            <LineChart
              title="FTSE 100 CEO median total pay, 2010&ndash;2023 (&pound;m)"
              subtitle="Median single total figure remuneration for FTSE 100 chief executives, including salary, bonus, and vested long-term incentives."
              series={ceoPaySeries}
              yLabel="&pound;m"
              source={{
                name: 'High Pay Centre',
                dataset: 'FTSE 100 CEO Pay Survey &mdash; annual remuneration reports',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-ratio" className="mb-12">
            <LineChart
              title="CEO-to-worker pay ratio, 2010&ndash;2023"
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
            title="What&apos;s changing"
            value="Shareholder rebellions rising"
            unit="2023"
            description="Shareholder rebellions on executive pay have risen sharply &mdash; in 2023, 32 FTSE 100 companies faced significant opposition (20&percnt;+ votes against) on pay resolutions, up from just 8 in 2015. The Investment Association&apos;s public register of companies with substantial opposition has increased board accountability. From 2020, mandatory CEO pay ratio disclosure has made the gap between boardroom and workforce pay visible in annual reports for the first time &mdash; a transparency measure that has begun to shift the narrative in remuneration committee discussions."
            source="Source: High Pay Centre &mdash; FTSE 100 CEO Pay Survey 2023; Investment Association &mdash; Shareholder Voting & Engagement Report 2023; ONS &mdash; Annual Survey of Hours and Earnings 2023."
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
