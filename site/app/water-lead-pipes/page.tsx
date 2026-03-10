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

interface ReplacementPoint {
  year: number;
  replacementsThousands: number;
}

interface CompletionYearsPoint {
  year: number;
  yearsAtCurrentRate: number;
}

interface LeadPipesData {
  national: {
    homesEstimate: {
      centralEstimateMillions: number;
      rangeLowMillions: number;
      rangeHighMillions: number;
      note: string;
    };
    replacementRate: {
      timeSeries: ReplacementPoint[];
      latestYear: number;
      latestThousands: number;
      pr24Target: number;
      note: string;
    };
    yearsToComplete: {
      timeSeries: CompletionYearsPoint[];
      latestYear: number;
      latestYears: number;
      note: string;
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

export default function WaterLeadPipesPage() {
  const [data, setData] = useState<LeadPipesData | null>(null);

  useEffect(() => {
    fetch('/data/water-lead-pipes/lead_pipes.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const replacementSeries: Series[] = data
    ? [{
        id: 'replacement',
        label: 'Lead pipes replaced per year (thousands)',
        colour: '#264653',
        data: data.national.replacementRate.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.replacementsThousands,
        })),
      }]
    : [];

  const completionYearsSeries: Series[] = data
    ? [{
        id: 'completion-years',
        label: 'Years to complete at current rate',
        colour: '#E63946',
        data: data.national.yearsToComplete.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.yearsAtCurrentRate,
        })),
      }]
    : [];

  const replacementAnnotations: Annotation[] = [
    { date: new Date(2024, 5, 1), label: '2024: PR24 target set at 600,000/year by 2030' },
  ];

  const pr24Target: number | undefined = data?.national.replacementRate.pr24Target;

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Lead Pipes in Water" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Lead Pipes in Water"
          question="How Many Homes Still Have Lead Water Pipes?"
          finding="An estimated 6 million homes in the UK still have lead supply pipes, predominantly in houses built before 1970. Lead levels in tap water can exceed WHO guidelines in older properties, particularly where water is soft."
          colour="#264653"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              The World Health Organisation revised its guidance on lead in drinking water in 2022 to state that there is no safe level of lead exposure, removing a previous threshold and increasing the urgency of pipe replacement programmes globally. In England and Wales, the Drinking Water Inspectorate enforces a lead standard of 10 micrograms per litre — a standard that some older properties with lead pipes and soft water (which is more corrosive to lead) routinely exceed, particularly from the first draw of water after the pipe has been standing.
            </p>
            <p>
              The scale of the problem is poorly understood because there is no national register of lead supply pipes. Water UK's estimate of 6 million homes is derived from company records and property age data, with a range of 5.5–8 million. At the current replacement rate of 72,000 per year, it would take 83 years to replace all lead service pipes — down from an estimated 130 years in 2020 as companies have accelerated. Ofwat's PR24 price review requires companies to accelerate to 600,000 replacements per year by 2030 — an eightfold increase that would reduce the completion timeline to approximately 10 years for the most tractable portion of the problem. Whether this target is achievable given supply chain constraints in skilled plumbers remains to be seen.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-replacement', label: 'Replacement Rate' },
          { id: 'sec-timeline', label: 'Completion Timeline' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Homes with lead water pipes"
              value="6M"
              unit=""
              direction="down"
              polarity="up-is-bad"
              changeText="Estimate · Pre-1970 properties · Soft water areas worst · No safe level (WHO 2022)"
              sparklineData={[6.0, 5.9, 5.8, 5.7, 5.6]}
              href="#sec-replacement"
            />
            <MetricCard
              label="Lead pipes replaced per year"
              value="72,000"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="+60% since 2020 · But 83 years to complete at this rate · Target: 600,000/year"
              sparklineData={[45, 52, 58, 65, 72]}
              href="#sec-replacement"
            />
            <MetricCard
              label="Years to complete replacement"
              value="83 years"
              unit=""
              direction="down"
              polarity="up-is-bad"
              changeText="At current pace · Down from 130 years in 2020 · Still decades away"
              sparklineData={[130, 115, 103, 92, 83]}
              href="#sec-replacement"
            />
          </div>
        

        {/* Charts */}
        <ScrollReveal>
          <section id="sec-replacement" className="mb-12">
            <LineChart
              title="Lead pipe replacements per year, England and Wales, 2020–2024"
              subtitle="Number of lead service pipes replaced by water companies annually. Rising steadily but far below the 600,000/year target set by Ofwat's PR24 price review for 2030."
              series={replacementSeries}
              annotations={replacementAnnotations}
              yLabel="Thousands replaced"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-timeline" className="mb-12">
            <LineChart
              title="Estimated years to complete lead pipe replacement at current rate, 2020–2024"
              subtitle="Calculated as total estimated lead pipes divided by annual replacement rate. Improving as pace accelerates, but still 83 years at 2024 rate. PR24 target of 600,000/year would reduce this to approximately 10 years."
              series={completionYearsSeries}
              annotations={[]}
              yLabel="Years to completion"
            />
          </section>
        </ScrollReveal>

        {pr24Target && (
          <ScrollReveal>
            <div className="mb-12 p-6 bg-wiah-light border border-wiah-border rounded">
              <div className="text-sm text-wiah-mid font-mono mb-1">Ofwat PR24 target</div>
              <div className="text-3xl font-mono font-bold text-wiah-black">{pr24Target.toLocaleString()}</div>
              <div className="text-sm text-wiah-mid mt-1">Lead pipe replacements per year by 2030 — an eightfold increase on 2024 levels. Required to bring the completion timeline within a generation.</div>
            </div>
          </ScrollReveal>
        )}

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="What's improving"
            value="600,000"
            unit="replacements per year target by 2030"
            description="Ofwat's PR24 price review requires water companies to accelerate lead pipe replacement to 600,000 per year by 2030, backed by ring-fenced capital investment. Partial lead pipe replacement (company-side only) is being actively discouraged as WHO evidence shows it can temporarily worsen leaching. The Drinking Water Inspectorate is increasing monitoring of lead levels in areas with high concentrations of older housing. Some water companies are running pro-active customer contact programmes to identify homes with lead internal plumbing."
            source="Source: Ofwat PR24 Final Determinations December 2024 · Water UK Lead Pipe Survey 2024 · DWI Annual Report 2023."
          />
        </ScrollReveal>

        {/* Sources */}
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
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
