'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

// ── Types ────────────────────────────────────────────────────────────────────

interface HeatPumpPoint {
  year: number;
  trainedThousands: number;
}

interface VacanciesPoint {
  year: number;
  vacanciesThousands: number;
}

interface RequiredPoint {
  year: number;
  neededThousands: number;
}

interface GreenSkillsData {
  national: {
    heatPumpInstallers: {
      timeSeries: HeatPumpPoint[];
      latestYear: number;
      latestThousands: number;
      targetThousands: number;
      note: string;
    };
    greenJobVacancies: {
      timeSeries: VacanciesPoint[];
      latestYear: number;
      latestThousands: number;
      note: string;
    };
    requiredInstallers: {
      timeSeries: RequiredPoint[];
      latestYear: number;
      latestThousands: number;
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

export default function GreenSkillsPage() {
  const [data, setData] = useState<GreenSkillsData | null>(null);

  useEffect(() => {
    fetch('/data/green-skills-gap/green_skills.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const heatPumpVsRequiredSeries: Series[] = data
    ? [
        {
          id: 'trained',
          label: 'Heat pump installers trained per year (thousands)',
          colour: '#2A9D8F',
          data: data.national.heatPumpInstallers.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.trainedThousands,
          })),
        },
      ]
    : [];

  const vacanciesSeries: Series[] = data
    ? [{
        id: 'vacancies',
        label: 'UK green job vacancies per quarter (thousands)',
        colour: '#2A9D8F',
        data: data.national.greenJobVacancies.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.vacanciesThousands,
        })),
      }]
    : [];

  const heatPumpAnnotations: Annotation[] = [
    { date: new Date(2022, 5, 1), label: '2022: Boiler Upgrade Scheme launched' },
    { date: new Date(2023, 5, 1), label: '2023: Heat pump target revised downward' },
    { date: new Date(2025, 5, 1), label: '2025: Clean Energy Skills Bootcamps begin' },
  ];

  const vacanciesAnnotations: Annotation[] = [
    { date: new Date(2021, 5, 1), label: '2021: Net zero by 2050 — skills demand surges' },
    { date: new Date(2023, 5, 1), label: '2023: British Energy Security Strategy skills push' },
  ];

  // ── Sparkline helpers ────────────────────────────────────────────────────

  const heatPumpSparkline = data
    ? data.national.heatPumpInstallers.timeSeries.map(d => d.trainedThousands)
    : [];
  const vacanciesSparkline = data
    ? data.national.greenJobVacancies.timeSeries.map(d => d.vacanciesThousands)
    : [];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Green Skills Gap" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Green Skills Gap"
          question="Does Britain Have the Workers for Net Zero?"
          finding="The UK needs 130,000 additional heat pump installers by 2028, but is training 3,200 a year. Similar gaps exist in EV charging, offshore wind and retrofit insulation. The green skills gap threatens to delay net zero by a decade."
          colour="#2A9D8F"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              Net zero requires the UK to deploy 600,000 heat pumps per year by 2028, retrofit 19 million homes by 2035, install 300,000 EV charging points by 2030, and build a workforce for 50 GW of offshore wind. Each of these transitions is workforce-constrained. MCS Certification records show approximately 3,200 heat pump installers trained in 2025 — 2.4% of the 130,000 needed by 2028. The Boiler Upgrade Scheme and building regulations requiring heat pumps in new homes are driving demand, but the training supply is nowhere near keeping pace. Existing gas engineers can retrain in 12–18 months, but the Gas Safe Register has 130,000 registered engineers versus around 5,000 heat pump certified ones.
            </p>
            <p>
              Green job vacancies have grown fivefold since 2020, reaching an estimated 215,000 per quarter by 2025. Offshore wind alone requires 100,000 workers by 2030, against a current workforce of around 20,000. Ports, turbine manufacturing, subsea cable installation, and operations and maintenance are all skills-constrained. The Green Jobs Taskforce report identified 30 priority green occupations where skills gaps are most acute. Regional concentration compounds the problem: offshore wind jobs cluster in Scotland, Yorkshire and the Humber, and East Anglia, but the workers who need retraining — former oil and gas workers, automotive workers, steel workers — are concentrated in different geographies. Without active labour mobility and retraining investment, the net zero transition risks creating regional inequality rather than resolving it.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-heatpumps', label: 'Heat Pump Gap' },
          { id: 'sec-vacancies', label: 'Green Job Vacancies' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Heat pump installers trained per year"
              value="3,200"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="vs 130,000 needed by 2028 · Gap widening, not closing"
              sparklineData={heatPumpSparkline}
              href="#sec-heatpumps"
            />
            <MetricCard
              label="UK green job vacancies"
              value="215,000/quarter"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="+514% since 2020 · But not enough workers to fill them"
              sparklineData={vacanciesSparkline}
              href="#sec-heatpumps"
            />
            <MetricCard
              label="Offshore wind workers needed by 2030"
              value="100,000"
              unit=""
              direction="flat"
              polarity="up-is-bad"
              changeText="Current workforce ~20,000 · 80,000 gap in 5 years"
              sparklineData={[20, 28, 38, 52, 68, 80, 100]}
              href="#sec-heatpumps"
            />
          </div>
        

        {/* Chart 1: Heat pump installers trained */}
        <ScrollReveal>
          <section id="sec-heatpumps" className="mb-12">
            <LineChart
              title="Heat pump installers trained per year, UK, 2019–2025"
              subtitle="Annual MCS-certified heat pump installer training completions in the UK (thousands). Training has more than tripled since 2019 but remains at 3,200 per year against a government target requiring 130,000 qualified installers by 2028."
              series={heatPumpVsRequiredSeries}
              annotations={heatPumpAnnotations}
              yLabel="Thousands"
            />
          </section>
        </ScrollReveal>

        {/* Chart 2: Green job vacancies */}
        <ScrollReveal>
          <section id="sec-vacancies" className="mb-12">
            <LineChart
              title="UK green job vacancies per quarter, 2020–2025"
              subtitle="Estimated quarterly green job vacancies in the UK (thousands), based on job postings analysis against BEIS green skills taxonomy. Fivefold increase since 2020 reflects rapid growth in clean energy, retrofit, and sustainable transport sectors."
              series={vacanciesSeries}
              annotations={vacanciesAnnotations}
              yLabel="Thousands"
            />
          </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="What's improving"
            value="SkillsEngland"
            unit="Coordinating green apprenticeships"
            description="The Green Jobs Taskforce roadmap identifies 30 priority green occupations and pathways to address each gap. The British Energy Security Strategy commits to 10 Clean Energy Skills Bootcamps annually, providing rapid retraining for workers from fossil fuel industries. SkillsEngland will coordinate green apprenticeship standards across the technical education system. The North Sea Transition Deal includes £16 billion for skills to support oil and gas workers retraining for offshore wind. Colleges in coastal communities are developing dedicated offshore wind engineering programmes."
            source="Source: DESNZ — Green Jobs Taskforce final report. DESNZ — British Energy Security Strategy 2022 skills chapter."
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
              <RelatedTopics />
      </main>
    </>
  );
}
