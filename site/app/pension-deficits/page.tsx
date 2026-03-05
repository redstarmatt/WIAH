'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';

// ── Types ────────────────────────────────────────────────────────────────────

interface PensionDeficitsData {
  national: {
    timeSeries: Array<{ date: string; pensionParticipationPct: number; workersNoPensionMillion: number }>;
    dbFunding: Array<{ date: string; fundingBn: number }>;
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

export default function PensionDeficitsPage() {
  const [data, setData] = useState<PensionDeficitsData | null>(null);

  useEffect(() => {
    fetch('/data/pension-deficits/pension_deficits.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const fundingSeries: Series[] = data
    ? [{
        id: 'db-funding',
        label: 'DB scheme aggregate funding position (&pound;bn)',
        colour: '#F4A261',
        data: (data.national.dbFunding ?? []).map(d => ({
          date: yearToDate(d.date),
          value: d.fundingBn,
        })),
      }]
    : [];

  const participationSeries: Series[] = data
    ? [{
        id: 'participation',
        label: 'Pension participation rate (&percnt;)',
        colour: '#2A9D8F',
        data: data.national.timeSeries.map(d => ({
          date: yearToDate(d.date),
          value: d.pensionParticipationPct,
        })),
      }]
    : [];

  const participationAnnotations: Annotation[] = [
    { date: new Date(2012, 9, 1), label: 'Auto-enrolment begins (large employers)' },
    { date: new Date(2018, 2, 1), label: 'Phase complete &mdash; all employers' },
  ];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Pensions" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Pensions"
          question="Are Britain&apos;s Pensions Actually Secure?"
          finding="14 million workers have no workplace pension and the UK state pension replacement rate of 28&percnt; of earnings is one of the lowest in the OECD &mdash; despite auto-enrolment bringing 11 million new savers into schemes since 2012."
          colour="#F4A261"
          preposition="with"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The UK state pension pays approximately &pound;11,500 per year (2024/25) &mdash; equivalent to 28&percnt; of median full-time earnings, among the lowest replacement rates in the OECD where the average is around 50&percnt;. Auto-enrolment, implemented from October 2012, has been the most significant structural reform in UK pensions for a generation: pension participation among eligible employees rose from 47&percnt; to 88&percnt; by 2023, with an estimated 10.9 million people newly saving who would not otherwise have done so. The aggregate funding position of private sector defined benefit schemes swung from a &pound;400 billion deficit in 2012 to a &pound;300 billion surplus by 2023, driven largely by the sharp rise in interest rates from 2022 reducing the present value of liabilities. Despite this, 14 million workers &mdash; predominantly self-employed and low-paid &mdash; have no workplace pension at all.</p>
            <p>The gaps left by auto-enrolment fall along predictable fault lines. The 4.8 million self-employed are entirely excluded from the scheme; the &pound;10,000 earnings threshold excludes 1.5 million low-paid workers, the majority women in part-time work. Workers with multiple part-time jobs below the threshold face compounded exclusion. The minimum 8&percnt; contribution rate &mdash; set as a floor but treated as a target by most workers and employers &mdash; is estimated by the Pensions and Lifetime Savings Association to be roughly half what is needed for a moderate retirement income. The consequence is a two-tier retirement: those with occupational pension provision enjoy reasonable income security, while those without &mdash; disproportionately women, carers, and the self-employed &mdash; face poverty in old age.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-db-funding', label: 'DB Funding' },
          { id: 'sec-participation', label: 'Participation' },
        ]} />

        <ScrollReveal>
          <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Workers without workplace pension"
              value="14M"
              direction="down"
              polarity="up-is-bad"
              changeText="Down from 22M in 2012 &middot; Auto-enrolment works &middot; Self-employed still excluded"
              sparklineData={[22, 20, 18, 16, 14, 13, 13, 14]}
              href="#sec-overview"/>
            <MetricCard
              label="State pension as &percnt; of earnings"
              value="28&percnt;"
              direction="flat"
              polarity="up-is-good"
              changeText="OECD average is 50&percnt; &middot; One of the lowest replacement rates in the developed world"
              sparklineData={[26, 26, 27, 27, 28, 28, 28, 28]}
              href="#sec-db-funding"/>
            <MetricCard
              label="Pension participation (auto-enrolled)"
              value="88&percnt;"
              direction="up"
              polarity="up-is-good"
              changeText="Up from 47&percnt; in 2012 &middot; 11 million newly saving &middot; Historic achievement"
              sparklineData={[47, 58, 68, 74, 79, 83, 86, 88]}
              href="#sec-participation"/>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-db-funding" className="mb-12">
            <LineChart
              title="DB pension scheme aggregate funding position, UK, 2012&ndash;2023 (&pound;bn)"
              subtitle="Combined surplus or deficit of all UK private sector defined benefit pension schemes. A deficit means schemes owe more in future pension promises than their assets can cover. The 2022 swing to surplus was driven by rising interest rates reducing the present value of liabilities."
              series={fundingSeries}
              yLabel="&pound;bn"
              source={{
                name: 'Pensions Regulator',
                dataset: 'DB landscape report &mdash; aggregate scheme funding',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-participation" className="mb-12">
            <LineChart
              title="Workplace pension participation rate, UK, 2012&ndash;2023 (&percnt;)"
              subtitle="Proportion of eligible employees (aged 22&ndash;SPA, earning &pound;10,000+) participating in a workplace pension. Auto-enrolment has transformed pension saving from exceptional to near-universal among eligible workers."
              series={participationSeries}
              annotations={participationAnnotations}
              yLabel="&percnt;"
              source={{
                name: 'DWP',
                dataset: 'Workplace pension participation &amp; savings trends',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="What&apos;s transformed"
            value="Auto-enrolment &mdash; 11 million new savers"
            unit="2012&ndash;2023"
            description="Auto-enrolment has been one of the most successful policy interventions of the past 20 years. Pension participation rose from 47&percnt; to 88&percnt; between 2012 and 2023, meaning that approximately 11 million workers are now saving for retirement who previously had no workplace pension. Opt-out rates have remained below 10&percnt; &mdash; far lower than predicted &mdash; demonstrating the power of default settings in shifting behaviour. The government has legislated to extend auto-enrolment to workers from age 18 (down from 22) and to remove the &pound;10,000 earnings threshold, which will bring an additional 1.5 million low-paid workers, mostly women, into pension saving when implemented."
            source="Source: DWP &mdash; Workplace Pension Participation Trends 2023; Pensions Regulator &mdash; DB Landscape Report 2023; ONS &mdash; ASHE pension provision 2023; PLSA &mdash; Retirement Living Standards 2024."
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
