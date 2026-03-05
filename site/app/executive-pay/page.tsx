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
            <p>The gap between what Britain&apos;s top executives earn and what their workers take home has widened dramatically over the past three decades. In 2023, the median total remuneration for a FTSE 100 chief executive reached &pound;3.9 million &mdash; equivalent to earning the median UK full-time salary of &pound;33,000 in under four days. The High Pay Centre, which tracks executive remuneration through annual analysis of company reports, found that the FTSE 100 CEO-to-worker pay ratio stood at 118:1 in 2023, up from approximately 47:1 in 2000 and from just 20:1 in 1980. Total pay packages combine base salary, annual bonus, and long-term incentive plans (LTIPs) that vest over three-to-five years, typically linked to earnings per share or total shareholder return targets. In boom years, LTIP vestings can dwarf base salary, pushing headline pay figures to multiples that attract significant public attention. In 2019 &mdash; the pre-pandemic peak &mdash; the highest-paid FTSE 100 CEO received over &pound;58 million in total remuneration, more than 1,700 times the UK median wage.</p>
            <p>Pay governance in the UK has evolved considerably since the first statutory &ldquo;say on pay&rdquo; vote was introduced in 2003. Since 2013, shareholders have had a binding vote on companies&apos; remuneration policies at least every three years, and an advisory vote on the annual remuneration report. The Investment Association, which represents major institutional investors, publishes a public register of companies that have received significant shareholder opposition &mdash; defined as 20% or more votes against &mdash; on pay resolutions. Remuneration committees, composed of independent non-executive directors, are responsible for setting and overseeing executive pay, guided by the UK Corporate Governance Code. From 2020, large UK companies with more than 250 employees have been required to disclose their CEO pay ratio relative to median, 25th percentile, and 75th percentile employee pay. Despite these governance improvements, average CEO pay in real terms has risen substantially faster than worker pay over the same period, suggesting that governance mechanisms have moderated but not arrested the underlying trend.</p>
            <p>The economic arguments around executive pay are complex and contested. Proponents of high executive pay argue that the global market for top talent means that companies competing internationally must offer packages that reflect what equivalent roles pay in the United States, where CEO pay is significantly higher. They also argue that performance-linked pay aligns executive and shareholder interests, and that LTIP structures &mdash; with multi-year vesting and holding requirements &mdash; encourage long-term thinking. Critics counter that the empirical evidence linking high CEO pay to superior company performance is weak: a 2022 review by the Investment Association found no statistically significant correlation between CEO pay levels and total shareholder return across FTSE 100 companies over the preceding decade. The High Pay Centre notes that remuneration committees are structurally prone to pay escalation: consultants hired by committees benchmark pay against peers, creating an upward ratchet as every company strives to be above-median. The process systematically inflates pay regardless of performance.</p>
            <p>Executive pay inequality is most extreme in financial services, consumer goods, and mining. The highest FTSE 100 pay ratios are concentrated in companies with large numbers of lower-paid workers in frontline roles: retailers, hospitality companies, and diversified financial firms. Regionally, the disparity is sharpest in London and the South East, where the headquarters of FTSE 100 companies are concentrated and where both executive pay and worker pay are above the national median. Gender inequality is a persistent feature: women represent just 9% of FTSE 100 chief executives, and the median female CEO pay in 2023 was approximately 20% lower than male CEO median pay, largely reflecting differences in tenure and sector rather than like-for-like pay discrimination. The ethnicity pay gap in boardrooms is even more pronounced, with non-white executives severely underrepresented at the top of FTSE companies.</p>
            <p>Measuring executive pay accurately is methodologically challenging. The headline figures that attract media coverage are often &ldquo;maximum potential&rdquo; or &ldquo;awarded&rdquo; values that may not ultimately vest. The High Pay Centre uses &ldquo;single total figure&rdquo; remuneration &mdash; the statutory disclosure required in company annual reports under Schedule 8 of the Large and Medium-Sized Companies Regulations &mdash; which includes the actual value of LTIPs that vested during the year, typically based on share prices at vesting. This means pay in any given year reflects decisions made three-to-five years earlier, creating apparent volatility that does not correspond to year-on-year decisions. The statutory CEO pay ratio disclosures, introduced for financial years starting 1 January 2019, use a different employee pay denominator from the High Pay Centre&apos;s ratio calculations, making year-on-year comparisons across methodologies unreliable. Survey samples also vary: the High Pay Centre covers all FTSE 100 companies in detail, but index composition changes mean that comparisons across long time periods must account for the changing corporate population.</p>
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
              onExpand={() => {}}
            />
            <MetricCard
              label="CEO-to-worker pay ratio"
              value="118&times;"
              direction="up"
              polarity="up-is-bad"
              changeText="2023 &middot; Up from 47&times; in 2000 &middot; OECD average is around 80&times;"
              sparklineData={[47, 55, 65, 75, 85, 95, 108, 118]}
              onExpand={() => {}}
            />
            <MetricCard
              label="Companies with shareholder pay rebellion"
              value="32%"
              direction="up"
              polarity="up-is-good"
              changeText="2023 &middot; Up from 8 companies in 2015 &middot; Governance pressure growing"
              sparklineData={[8, 10, 12, 14, 17, 20, 26, 32]}
              onExpand={() => {}}
            />
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
            description="Shareholder rebellions on executive pay have risen sharply &mdash; in 2023, 32 FTSE 100 companies faced significant opposition (20%+ votes against) on pay resolutions, up from just 8 in 2015. The Investment Association&apos;s public register of companies with substantial opposition has increased board accountability. From 2020, mandatory CEO pay ratio disclosure has made the gap between boardroom and workforce pay visible in annual reports for the first time &mdash; a transparency measure that has begun to shift the narrative in remuneration committee discussions."
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
