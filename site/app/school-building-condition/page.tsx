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
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'DfE', dataset: 'RAAC Concrete in Schools Survey', url: 'https://www.gov.uk/government/news/raac-concrete-in-schools-survey-findings', date: '2023' },
  { num: 2, name: 'DfE', dataset: 'Condition of School Buildings Survey', url: 'https://www.gov.uk/government/collections/school-condition', date: '2023' },
  { num: 3, name: 'DfE', dataset: 'School Rebuilding Programme statistics', url: 'https://www.gov.uk/government/collections/school-condition', date: '2024' },
];

// ── Types ────────────────────────────────────────────────────────────────────

interface RAACPoint {
  month: string;
  cumulativeConfirmed: number;
}

interface ConditionPoint {
  year: number;
  percentPoorOrVeryPoor: number;
}

interface RebuildPoint {
  year: number;
  completions: number;
}

interface SchoolBuildingData {
  national: {
    raacSchools: {
      timeSeries: RAACPoint[];
      latestCount: number;
      note: string;
    };
    poorCondition: {
      timeSeries: ConditionPoint[];
      latestYear: number;
      latestPercent: number;
      maintenanceBacklogBillions: number;
      note: string;
    };
    rebuildCompletions: {
      timeSeries: RebuildPoint[];
      latestYear: number;
      latestCompletions: number;
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

function monthToDate(m: string): Date {
  const [year, month] = m.split('-').map(Number);
  return new Date(year, month - 1, 1);
}

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function SchoolBuildingConditionPage() {
  const [data, setData] = useState<SchoolBuildingData | null>(null);

  useEffect(() => {
    fetch('/data/school-building-condition/school_buildings.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const raacSeries: Series[] = data
    ? [{
        id: 'raac',
        label: 'Schools with RAAC confirmed',
        colour: '#E63946',
        data: data.national.raacSchools.timeSeries.map(d => ({
          date: monthToDate(d.month),
          value: d.cumulativeConfirmed,
        })),
      }]
    : [];

  const conditionSeries: Series[] = data
    ? [{
        id: 'condition',
        label: 'Schools in poor/very poor condition (%)',
        colour: '#F4A261',
        data: data.national.poorCondition.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.percentPoorOrVeryPoor,
        })),
      }]
    : [];

  const rebuildSeries: Series[] = data
    ? [{
        id: 'rebuilds',
        label: 'School rebuilds completed per year',
        colour: '#2A9D8F',
        data: data.national.rebuildCompletions.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.completions,
        })),
      }]
    : [];

  const raacAnnotations: Annotation[] = [
    { date: new Date(2023, 8, 1), label: 'Sep 2023: Emergency closures announced' },
  ];

  const conditionAnnotations: Annotation[] = [
    { date: new Date(2023, 5, 1), label: '2023: RAAC crisis reveals scale of problem' },
  ];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="School Building Condition" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="School Building Condition"
          question="Are Children Learning in Crumbling Schools?"
          finding="RAAC (Reinforced Autoclaved Aerated Concrete) was found in 235 schools, forcing emergency closures in September 2023. The DfE estimates one in five school buildings needs major repairs, with a £6.7 billion maintenance backlog."
          colour="#2A9D8F"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              The RAAC crisis of September 2023 brought England's school estate into sharp focus, but the structural concrete problem was the visible tip of a much larger iceberg. RAAC — a lightweight aerated concrete used in flat roofs and floors between roughly 1950 and 1990 — was identified in 235 schools following emergency surveys, causing hundreds of classrooms to be closed at the start of term.<Cite nums={1} /> Several schools were entirely shut for weeks. The immediate cost was £1 billion in emergency remediation funding, but this addresses only the most acute structural risk.
            </p>
            <p>
              The broader picture is a maintenance backlog estimated at £6.7 billion by the DfE's own condition surveys, accumulated over decades of under-investment.<Cite nums={2} /> One in five school buildings — approximately 4,000 schools — is now rated in poor or very poor condition. The Priority Schools Building Programme, later renamed the School Rebuilding Programme, was targeting 500 rebuilds over 10 years at completion rates of 20–28 per year.<Cite nums={3} /> At that pace, it would take over 140 years to address the backlog. The programme covers only the most structurally dangerous buildings; it does not address the wider stock of leaking roofs, inadequate heating, poor ventilation, and outdated facilities that affect teaching and learning every day.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-raac', label: 'RAAC Crisis' },
          { id: 'sec-condition', label: 'Building Condition' },
          { id: 'sec-rebuilds', label: 'Rebuild Programme' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Schools with RAAC concrete"
              value="235"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="235 schools across England · Emergency closures Sep 2023 · £1bn remediation"
              sparklineData={[52, 114, 156, 200, 220, 235]}
              href="#sec-raac"
            />
            <MetricCard
              label="Schools in poor/very poor condition"
              value="21%"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Up from 15% in 2019 · £6.7bn maintenance backlog"
              sparklineData={[15, 15, 17, 18, 19, 21]}
              href="#sec-raac"
            />
            <MetricCard
              label="School Rebuilding Programme completions"
              value="28/year"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="Priority School Building Programme · But 500 schools over 10 years is far short of need"
              sparklineData={[18, 20, 22, 24, 26, 28]}
              href="#sec-raac"
            />
          </div>
        

        {/* Charts */}
        <ScrollReveal>
          <section id="sec-raac" className="mb-12">
            <LineChart
              title="Schools with RAAC concrete confirmed, England, 2023–2024"
              subtitle="Cumulative schools confirmed as containing Reinforced Autoclaved Aerated Concrete following emergency DfE survey. Emergency closures were announced in September 2023 after structural failures accelerated."
              series={raacSeries}
              annotations={raacAnnotations}
              yLabel="Schools (cumulative)"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-condition" className="mb-12">
            <LineChart
              title="School buildings in poor or very poor condition, England, 2019–2024"
              subtitle="Percentage of school buildings rated poor or very poor in DfE condition surveys. Underlying deterioration accelerating as buildings age and maintenance budgets remain constrained."
              series={conditionSeries}
              annotations={conditionAnnotations}
              yLabel="Percent (%)"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-rebuilds" className="mb-12">
            <LineChart
              title="School Rebuilding Programme completions per year, 2019–2024"
              subtitle="Schools fully rebuilt under the Priority School Building Programme and School Rebuilding Programme. At current rates, the programme addresses a fraction of the estate requiring major work."
              series={rebuildSeries}
              annotations={[]}
              yLabel="Schools rebuilt"
            />
          </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="What's improving"
            value="£1bn"
            unit="RAAC remediation fund 2023"
            description="The government announced a £1 billion fund for RAAC remediation in 2023, providing funding for affected schools to make classrooms safe. The School Rebuilding Programme will rebuild or refurbish 500 schools over 10 years, prioritising the worst structural cases. Condition surveys are being updated more frequently following the RAAC crisis. Some schools have used capital receipts and MAT reserves to accelerate maintenance independently of central funding."
            source="Source: DfE School Rebuilding Programme statistics · DfE Condition of School Buildings Survey."
          />
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

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
