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
        label: 'Pension participation rate (%)',
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
          finding="14 million workers have no workplace pension and the UK state pension replacement rate of 28% of earnings is one of the lowest in the OECD &mdash; despite auto-enrolment bringing 11 million new savers into schemes since 2012."
          colour="#F4A261"
          preposition="with"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The United Kingdom&apos;s pension system consists of three distinct layers that interact in complex ways: the New State Pension (NSP), which provides a flat-rate income to those with sufficient National Insurance records; workplace pensions, which are occupational schemes run by employers; and private or personal pensions. The New State Pension pays approximately &pound;11,500 per year (2024/25) for those with 35 qualifying years of NI contributions &mdash; equivalent to about 28% of median UK full-time earnings, one of the lowest replacement rates among OECD countries where averages are around 50%. This low replacement rate means that British retirees are more dependent on private and workplace pension savings than citizens of most comparable economies, creating a two-tier retirement system where those with adequate workplace pension provision enjoy reasonable income security and those without face significant income poverty. The 2022/23 English Longitudinal Study of Ageing found that approximately 18% of people aged 65 and over in England had weekly incomes below the poverty threshold, despite the pension credit safety net that tops up the income of the poorest pensioners.</p>
            <p>Auto-enrolment, introduced under the Pensions Act 2008 and implemented from October 2012 to February 2018, has been the most significant structural change to UK pensions provision in a generation. The legislation required all employers to automatically enrol eligible workers (aged 22 to state pension age, earning over &pound;10,000 per year) into a qualifying workplace pension scheme, with minimum combined employer and employee contribution rates phased up from 2% to 8% by April 2019. Workers retain the right to opt out, but the default is inclusion rather than exclusion &mdash; exploiting behavioural inertia to build pension saving as the norm. The results have been transformative: DWP statistics show that pension participation among eligible employees rose from approximately 47% in 2012 to 88% in 2023, with an estimated 10.9 million people newly saving into a workplace pension who would not otherwise have done so. NEST (the National Employment Savings Trust), created as the auto-enrolment default provider for employers without existing schemes, manages over &pound;30 billion in assets and covers approximately 12 million members &mdash; one of the largest pension funds in the world by membership.</p>
            <p>Despite the success of auto-enrolment, significant pension gaps remain. The 8% minimum contribution rate (which many workers and employers set as their actual rate rather than exceeding it) is estimated by the Pensions and Lifetime Savings Association (PLSA) to be approximately half of what is needed to achieve a &ldquo;moderate&rdquo; retirement income. Workers who are self-employed are excluded from auto-enrolment entirely &mdash; approximately 4.8 million people &mdash; and self-employed pension saving has fallen since 2010 as the gig economy has expanded. The £10,000 earnings threshold for auto-enrolment excludes around 1.5 million low-paid workers, the majority of whom are women in part-time employment. Workers with multiple part-time jobs below the threshold face compounded exclusion. The government has legislated to extend auto-enrolment to younger workers (from age 18) and remove the lower earnings threshold, but implementation has been deferred to the mid-2020s, and even when in place the changes will take decades to build adequate retirement savings for the cohorts affected.</p>
            <p>Defined benefit (DB) pension schemes &mdash; which promise a fixed income in retirement based on final salary or career average earnings &mdash; have undergone a dramatic transformation in funding status over the past decade. The aggregate deficit of UK private sector DB schemes peaked at approximately &pound;400 billion in 2012, when historically low interest rates inflated the present value of future liabilities. A sustained recovery in funding, driven by employer deficit reduction contributions and, most dramatically, by the sharp rise in interest rates from 2022 which reduced the present value of liabilities, has converted this aggregate deficit into a surplus. The Pensions Regulator reported an aggregate funding surplus of over &pound;300 billion across the DB universe by 2023. This transformation has raised a new set of questions about what to do with surplus assets: whether schemes can reduce employer contributions, enhance member benefits, or transfer assets to insurance buyout providers. However, this aggregate picture masks considerable variation: many smaller and older schemes remain in deficit, particularly those in declining industries, and the Pension Protection Fund continues to provide a safety net for workers in schemes where the employer has become insolvent.</p>
            <p>Measuring the adequacy of UK pension provision is methodologically complex and contested. The standard measure of replacement rate &mdash; pension income as a percentage of pre-retirement earnings &mdash; depends critically on the time horizon used, the treatment of state versus private pension, and whether means-tested benefits are included. The OECD&apos;s comparison of replacement rates uses a standardised methodology applied consistently across countries, producing the widely cited finding that the UK&apos;s gross replacement rate for an average earner is among the lowest in the developed world. However, the UK system is designed around a universal flat-rate state pension combined with private savings rather than an earnings-related public pension, so direct comparison with earnings-related state pension systems in France, Germany, or Italy requires care. The DWP&apos;s aggregate pension adequacy assessment concludes that a minority of the workforce (particularly self-employed, career-interrupted, and lower-paid workers) are on track for materially inadequate retirement incomes, while the majority are on track for adequate provision if auto-enrolment contributions are maintained. The biggest uncertainties concern the future level of the state pension relative to earnings (subject to the Triple Lock policy), future investment returns on DC savings, and the long-term fiscal sustainability of public sector pension commitments.</p>
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
              onExpand={() => {}}
            />
            <MetricCard
              label="State pension as % of earnings"
              value="28%"
              direction="flat"
              polarity="up-is-good"
              changeText="OECD average is 50% &middot; One of the lowest replacement rates in the developed world"
              sparklineData={[26, 26, 27, 27, 28, 28, 28, 28]}
              onExpand={() => {}}
            />
            <MetricCard
              label="Pension participation (auto-enrolled)"
              value="88%"
              direction="up"
              polarity="up-is-good"
              changeText="Up from 47% in 2012 &middot; 11 million newly saving &middot; Historic achievement"
              sparklineData={[47, 58, 68, 74, 79, 83, 86, 88]}
              onExpand={() => {}}
            />
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
              title="Workplace pension participation rate, UK, 2012&ndash;2023 (%)"
              subtitle="Proportion of eligible employees (aged 22&ndash;SPA, earning &pound;10,000+) participating in a workplace pension. Auto-enrolment has transformed pension saving from exceptional to near-universal among eligible workers."
              series={participationSeries}
              annotations={participationAnnotations}
              yLabel="%"
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
            description="Auto-enrolment has been one of the most successful policy interventions of the past 20 years. Pension participation rose from 47% to 88% between 2012 and 2023, meaning that approximately 11 million workers are now saving for retirement who previously had no workplace pension. Opt-out rates have remained below 10% &mdash; far lower than predicted &mdash; demonstrating the power of default settings in shifting behaviour. The government has legislated to extend auto-enrolment to workers from age 18 (down from 22) and to remove the &pound;10,000 earnings threshold, which will bring an additional 1.5 million low-paid workers, mostly women, into pension saving when implemented."
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
