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

interface IncidentsPoint {
  year: number;
  incidents: number;
}

interface BorderChecksPoint {
  year: number;
  percentChecked: number;
}

interface DivergencePoint {
  year: number;
  cumulativeDivergences: number;
}

interface FoodStandardsData {
  national: {
    foodSafetyIncidents: {
      timeSeries: IncidentsPoint[];
      latestYear: number;
      latestIncidents: number;
      note: string;
    };
    borderChecks: {
      timeSeries: BorderChecksPoint[];
      latestYear: number;
      latestPercent: number;
      note: string;
    };
    divergenceIncidents: {
      timeSeries: DivergencePoint[];
      latestYear: number;
      latestCumulativeDivergences: number;
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

export default function FoodStandardsPage() {
  const [data, setData] = useState<FoodStandardsData | null>(null);

  useEffect(() => {
    fetch('/data/food-standards-post-brexit/food_standards.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const incidentsSeries: Series[] = data
    ? [{
        id: 'incidents',
        label: 'Food safety incidents (imports)',
        colour: '#6B7280',
        data: data.national.foodSafetyIncidents.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.incidents,
        })),
      }]
    : [];

  const borderAndDivergenceSeries: Series[] = data
    ? [
        {
          id: 'borderChecks',
          label: 'Import border checks (% of shipments)',
          colour: '#2A9D8F',
          data: data.national.borderChecks.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.percentChecked,
          })),
        },
        {
          id: 'divergence',
          label: 'Cumulative standards divergences from EU',
          colour: '#E63946',
          data: data.national.divergenceIncidents.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.cumulativeDivergences,
          })),
        },
      ]
    : [];

  const incidentsAnnotations: Annotation[] = [
    { date: new Date(2021, 5, 1), label: '2021: Brexit — UK exits EU food safety network (RASFF)' },
    { date: new Date(2023, 5, 1), label: '2023: Border checks delayed again — political decision' },
    { date: new Date(2024, 5, 1), label: '2024: Border Target Operating Model fully implemented' },
  ];

  const borderAnnotations: Annotation[] = [
    { date: new Date(2021, 5, 1), label: '2021: Full import checks promised — then delayed' },
    { date: new Date(2024, 5, 1), label: '2024: Physical checks finally implemented at ports' },
  ];

  // ── Sparkline helpers ────────────────────────────────────────────────────

  const incidentsSparkline = data
    ? data.national.foodSafetyIncidents.timeSeries.map(d => d.incidents)
    : [];
  const borderSparkline = data
    ? data.national.borderChecks.timeSeries.map(d => d.percentChecked)
    : [];
  const divergenceSparkline = data
    ? data.national.divergenceIncidents.timeSeries.map(d => d.cumulativeDivergences)
    : [];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Post-Brexit Food Standards" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Post-Brexit Food Standards"
          question="Has Brexit Changed What's on Our Plates?"
          finding="UK food import checks that were planned for 2021 were delayed until 2024. 87 food safety incidents involving imported food were detected in 2025, up from 62 in 2020. The UK–US trade deal could allow chlorinated chicken; the UK–EU TCA restricts divergence."
          colour="#6B7280"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              Brexit removed the UK from the EU's Rapid Alert System for Food and Feed (RASFF) — the network through which member states share food safety alerts in real time. The UK created its own Food and Feed Safety and Incidents Network but operates it with fewer resources and without the automatic information sharing that RASFF provides. More consequentially, the government repeatedly delayed implementing import border checks on EU food and feed imports after Brexit. Full checks were promised for January 2021, delayed to January 2022, delayed to July 2022, then to November 2023, before physical checks finally began at major ports in April 2024. During this three-year period, UK import checks on EU food products ran at single-digit percentages.
            </p>
            <p>
              Food safety incidents involving imported products rose to 87 in 2025 — a combination of more imports entering with less scrutiny and the UK's improved border systems finally detecting more. It is unclear how much of the increase reflects a genuine deterioration in safety versus improved detection. More concerning for the longer term is the question of standards divergence. The UK–US trade deal negotiations remain live, with the American agricultural sector seeking access for products banned in the UK under EU-inherited regulations — hormone-treated beef, ractopamine-treated pork, chlorine-washed chicken. The Food Standards Agency has stated it will not recommend standards reductions in trade deals. The political and commercial pressures are real. The Trade and Agriculture Commission scrutinises each agreement, but its reports are advisory rather than binding.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-incidents', label: 'Safety Incidents' },
          { id: 'sec-border', label: 'Border Checks' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        {/* Metric cards */}
        <ScrollReveal>
          <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Food safety incidents (imports)"
              value="87"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Up from 62 in 2021 · Delayed border checks left gap in protection"
              sparklineData={incidentsSparkline}
              href="#sec-incidents"
            />
            <MetricCard
              label="Import border checks completion"
              value="85%"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="Up from 8% in 2021 · Full checks finally implemented 2024"
              sparklineData={borderSparkline}
              href="#sec-incidents"
            />
            <MetricCard
              label="Food standards divergence from EU"
              value="14"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Cumulative divergences · Affects agri-food exporters to EU"
              sparklineData={divergenceSparkline}
              href="#sec-incidents"
            />
          </div>
        </ScrollReveal>

        {/* Chart 1: Safety incidents */}
        <ScrollReveal>
          <section id="sec-incidents" className="mb-12">
            <LineChart
              title="Food safety incidents involving imported food, UK, 2019–2025"
              subtitle="Food safety incidents involving imported food and feed detected by FSA and FSS, UK. Dip in 2021 reflects transition period — UK not yet checking imports. Rise from 2022 onwards combines more imports entering and improved detection once the Border Target Operating Model was implemented."
              series={incidentsSeries}
              annotations={incidentsAnnotations}
              yLabel="Incidents"
            />
          </section>
        </ScrollReveal>

        {/* Chart 2: Border checks and divergence */}
        <ScrollReveal>
          <section id="sec-border" className="mb-12">
            <LineChart
              title="Import border checks and cumulative standards divergences, 2021–2025"
              subtitle="Percentage of food and feed import shipments physically checked at UK borders (green) and cumulative documented divergences from EU food standards (red). Border checks rose from 8% to 85% after the Border Target Operating Model was implemented in 2024."
              series={borderAndDivergenceSeries}
              annotations={borderAnnotations}
              yLabel="Percent / Count"
            />
          </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="What's improving"
            value="FSA"
            unit="Committed to no standards reduction"
            description="The Food Standards Agency maintains its statutory commitment to no lowering of standards in international trade deals — a formal legal obligation introduced via the Agriculture Act 2020. The Trade and Agriculture Commission scrutinises all FTAs for food standard implications before parliamentary ratification. The Border Target Operating Model, now fully operational, delivers physical checks at 85% of risk-rated imports. The UK–EU TCA veterinary and sanitary provisions provide a floor on divergence for products traded between the UK and EU. Continued alignment with EU Codex Alimentarius standards means the UK maintains internationally comparable baseline protections."
            source="Source: FSA — Food Standards Agency position on trade and food standards 2024. TAC — Trade and Agriculture Commission scrutiny reports."
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
