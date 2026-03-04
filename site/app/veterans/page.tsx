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

interface ArmedForcesPoint {
  year: number;
  regularStrength: number;
}

interface OpCouragePoint {
  year: number;
  referrals: number;
}

interface RoughSleepingPoint {
  year: number;
  veteranPctOfRoughSleepers: number;
}

interface AgeGroup {
  ageGroup: string;
  estimatedThousands: number;
}

interface VeteransData {
  national: {
    armedForcesStrength: {
      timeSeries: ArmedForcesPoint[];
      latestYear: number;
      latestStrength: number;
      target: number;
      note: string;
    };
    veteranPopulation: {
      estimatedTotal: number;
      byAgeGroup: AgeGroup[];
      note: string;
    };
    mentalHealth: {
      ptsdPrevalenceCombatPct: number;
      ptsdPrevalenceAllVeteransPct: number;
      opCourageReferrals: {
        timeSeries: OpCouragePoint[];
        totalSinceLaunch: number;
        averageWaitWeeks: number;
        note: string;
      };
    };
    roughSleeping: {
      timeSeries: RoughSleepingPoint[];
      latestYear: number;
      latestPct: number;
      estimatedNightlyCount: number;
    };
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

export default function VeteransPage() {
  const [data, setData] = useState<VeteransData | null>(null);

  useEffect(() => {
    fetch('/data/veterans/veterans.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const armedForcesSeries: Series[] = data
    ? [{
        id: 'strength',
        label: 'Regular armed forces',
        colour: '#264653',
        data: data.national.armedForcesStrength.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.regularStrength,
        })),
      }]
    : [];

  const opCourageSeries: Series[] = data
    ? [{
        id: 'opcourage',
        label: 'Op COURAGE referrals',
        colour: '#2A9D8F',
        data: data.national.mentalHealth.opCourageReferrals.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.referrals,
        })),
      }]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2018, 5, 1), label: '2018: SDSR cuts' },
  ];

  // Calculate max for bar chart scaling
  const maxVeterans = data ? Math.max(...data.national.veteranPopulation.byAgeGroup.map(g => g.estimatedThousands)) : 0;

  return (
    <>
      <TopicNav topic="Veterans" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Veterans"
          question="Are British Veterans Actually Being Looked After?"
          finding="There are an estimated 2.4 million veterans in the UK. Around 1 in 5 combat veterans experiences PTSD. Op COURAGE, the NHS mental health service for veterans, received 21,000 referrals in its first three years. But rough sleeping rates among veterans remain stubbornly high and armed forces recruitment falls short of targets."
          colour="#264653"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              The 2021 Census &mdash; the first to include a veteran status question &mdash; counted 2.4 million veterans in the UK, of whom 2.1 million reside in England. More than 75% are aged 55 or over, but younger cohorts from Iraq and Afghanistan face acute transition challenges. An estimated 50,000 veterans lack a registered GP, according to NHS England analysis. The Office for Veterans&apos; Affairs, established in 2019, coordinates support through the Veterans&apos; Strategy Action Plan 2022&ndash;24, while the Armed Forces Act 2021 placed the Armed Forces Covenant on a statutory footing, requiring public bodies to give due regard to disadvantage faced by service leavers.
            </p>
            <p>
              The forces themselves are shrinking. UK regular strength fell from 178,600 in 2010 to approximately 148,000 by 2024, well below the 160,000 trained-strength target. The Army missed its recruitment target for eleven consecutive years from 2012 to 2023; in 2023/24 actual intake was around 5,500 against a target of 6,930. King&apos;s College London research puts PTSD prevalence at roughly 17% among combat veterans, though only 6% of all veterans carry a clinical diagnosis. Op COURAGE, the consolidated NHS veterans&apos; mental health service launched in April 2021, received over 21,000 referrals in its first three years &mdash; but waits average seven weeks, exceeding the NICE recommendation that treatment begin within one month.
            </p>
            <p>
              Homelessness is improving but far from resolved. Veterans comprised an estimated 6% of rough sleepers in England in 2023/24, down from a peak of 15% in 2014 &mdash; partly owing to programmes such as VETS 2015 and No Second Night Out &mdash; but that still represents roughly 250 individuals sleeping rough on any given night. Defence spending stood at 2.32% of GDP in 2024/25, above NATO&apos;s 2% minimum, with a commitment to reach 2.5% by 2030. Processing delays in the Armed Forces Compensation Scheme and war pensions have drawn repeated criticism from the Veterans Advisory and Pensions Committees.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-recruitment', label: 'Armed forces recruitment' },
          { id: 'sec-population', label: 'Veteran population' },
          { id: 'sec-mental-health', label: 'Op COURAGE' },
          { id: 'sec-improvement', label: 'What&apos;s improving' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Regular armed forces strength"
              value="148K"
              unit=""
              direction="down"
              polarity="up-is-good"
              changeText="2024 · Target 160,000 · Down from 178,600 in 2010 · Army missed recruitment target for 11 consecutive years"
              sparklineData={[178600, 172700, 164100, 158900, 152400, 149300, 148500, 147500, 145600, 149700, 148000].map(v => v / 1000)}
              onExpand={() => {}}
            />
            <MetricCard
              label="Op COURAGE referrals (NHS veterans mental health)"
              value="21K"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="2021–24 · 3-year cumulative total · Wait: average 7 weeks · Unmet demand estimated much higher"
              sparklineData={[5000, 8000, 8000]}
              onExpand={() => {}}
            />
            <MetricCard
              label="Veterans rough sleeping (% of all rough sleepers)"
              value="6%"
              unit=""
              direction="down"
              polarity="up-is-bad"
              changeText="2024 · ~250 veterans estimated sleeping rough on any night · Down from 15% in 2014 · Progress since 2015 baseline"
              sparklineData={[15, 13, 11, 10, 9, 8, 7, 7, 6, 6]}
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div id="sec-recruitment" className="mb-12">
            <LineChart
              title="UK regular armed forces strength, 2010&ndash;2024"
              subtitle="Trained strength excluding Gurkhas and full-time reserves. Target: 160,000"
              series={armedForcesSeries}
              annotations={annotations}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div id="sec-population" className="mb-12">
            <div className="bg-wiah-light p-6 rounded">
              <h3 className="text-lg font-bold text-wiah-black mb-6">Veteran population by age group, 2021</h3>
              <p className="text-sm text-wiah-mid mb-6">Estimated 2.4 million veterans in the UK. Census 2021 is the first comprehensive count.</p>
              <div className="space-y-3">
                {data?.national.veteranPopulation.byAgeGroup.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-32 text-sm text-wiah-black flex-shrink-0 font-mono">{item.ageGroup}</div>
                    <div className="flex-1 bg-wiah-border rounded h-6 overflow-hidden">
                      <div
                        className="h-full rounded bg-wiah-blue"
                        style={{ width: `${(item.estimatedThousands / maxVeterans) * 100}%` }}
                      />
                    </div>
                    <div className="w-20 text-right text-sm font-mono text-wiah-black">{item.estimatedThousands}K</div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-wiah-mid mt-6">Note: 75%+ of veterans are aged 55 or over. Younger cohorts (16&ndash;34) are from recent conflicts.</p>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div id="sec-mental-health" className="mb-12">
            <LineChart
              title="Op COURAGE NHS veterans mental health referrals, 2021&ndash;2024"
              subtitle="Launched April 2021. 21,000 referrals in first 3 years. Average wait: 7 weeks."
              series={opCourageSeries}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div id="sec-improvement" className="mb-12">
            <PositiveCallout
              title="What&apos;s improving"
              value="21K"
              unit="veterans referred to Op COURAGE NHS mental health service since 2021"
              description="Op COURAGE &mdash; launched in April 2021 by consolidating five previous NHS veteran mental health pathways &mdash; has referred 21,000 veterans for specialist mental health support in its first three years. Veterans can self-refer without a GP. The service includes the Veterans Trauma Network for those with complex PTSD from combat, the Veterans&apos; Mental Health Transition, Intervention and Liaison Service (TILS), and community-based support. The Armed Forces Covenant, now on a statutory footing, requires public bodies to give due regard to the needs of veterans."
              source="Source: NHS England &mdash; Op COURAGE statistics 2024; MOD &mdash; Veterans in the United Kingdom."
            />
          </div>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-lg font-black text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            {data?.metadata.sources.map((src, idx) => (
              <div key={idx}>
                <a href={src.url} target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">
                  {src.name} &mdash; {src.dataset}
                </a>
                <div className="text-xs text-wiah-mid">{src.frequency}</div>
              </div>
            ))}
          </div>
          <div className="text-sm text-wiah-mid mt-6">
            <p className="mb-3">
              <strong>Methodology.</strong> {data?.metadata.methodology}
            </p>
            {data?.metadata.knownIssues && data.metadata.knownIssues.length > 0 && (
              <div>
                <strong>Known issues.</strong>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  {data.metadata.knownIssues.map((issue, idx) => (
                    <li key={idx}>{issue}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
