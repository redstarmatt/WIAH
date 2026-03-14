'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';
import RelatedTopics from '@/components/RelatedTopics';

const editorialRefs: Reference[] = [
  { num: 1, name: 'Sport England', dataset: 'Active Lives Adult Survey', url: 'https://www.sportengland.org/research-and-data/data/active-lives', date: '2024-25' },
  { num: 2, name: 'Sport England', dataset: 'Active Lives Adult Survey — IMD Quintile Analysis', url: 'https://www.sportengland.org/research-and-data/data/active-lives', date: '2024-25' },
  { num: 3, name: 'Sport England', dataset: 'Active Lives Children and Young People Survey', url: 'https://www.sportengland.org/research-and-data/data/active-lives', date: '2024-25' },
  { num: 4, name: 'Active Travel England / DfT', dataset: 'Walking and Cycling Statistics', url: 'https://www.gov.uk/government/collections/walking-and-cycling-statistics', date: '2025' },
];

// -- Types --------------------------------------------------------------------

interface DataPoint {
  year: number;
  activePct: number;
  inactivePct: number;
  leastDeprivedPct: number;
  mostDeprivedPct: number;
  childrenActivePct: number;
  walkCyclePct: number;
}

interface RegionData {
  region: string;
  activePct: number;
}

interface TopicData {
  national: { timeSeries: DataPoint[] };
  byRegion: RegionData[];
  metadata: {
    sources: { name: string; dataset: string; url: string; frequency: string }[];
    methodology: string;
    knownIssues: string[];
  };
}

// -- Helpers ------------------------------------------------------------------

function yearToDate(y: number): Date {
  return new Date(y, 0, 1);
}

function sparkFrom(arr: number[], n = 10) {
  return arr.slice(-n);
}

// -- Page ---------------------------------------------------------------------

export default function PhysicalActivityPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/physical-activity/physical_activity.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // -- Derived series ---------------------------------------------------------

  const activitySeries: Series[] = data
    ? [
        {
          id: 'active',
          label: 'Adults active (150+ mins/week) (%)',
          colour: '#2A9D8F',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.activePct,
          })),
        },
        {
          id: 'inactive',
          label: 'Adults inactive (<30 mins/week) (%)',
          colour: '#E63946',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.inactivePct,
          })),
        },
      ]
    : [];

  const deprivationSeries: Series[] = data
    ? [
        {
          id: 'least-deprived',
          label: 'Least deprived — active (%)',
          colour: '#2A9D8F',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.leastDeprivedPct,
          })),
        },
        {
          id: 'most-deprived',
          label: 'Most deprived — active (%)',
          colour: '#E63946',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.mostDeprivedPct,
          })),
        },
      ]
    : [];

  const childrenSeries: Series[] = data
    ? [
        {
          id: 'children',
          label: 'Children meeting 60-min daily guideline (%)',
          colour: '#264653',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.childrenActivePct,
          })),
        },
        {
          id: 'walk-cycle',
          label: 'Adults walking or cycling for travel (%)',
          colour: '#F4A261',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.walkCyclePct,
          })),
        },
      ]
    : [];

  const activityAnnotations: Annotation[] = [
    { date: new Date(2020, 0, 1), label: '2020: Pandemic — gyms close, walking surges' },
    { date: new Date(2023, 0, 1), label: "2023: Women's Sport strategy launched" },
  ];

  const deprivationAnnotations: Annotation[] = [
    { date: new Date(2019, 0, 1), label: '2019: Uniting the Movement strategy' },
    { date: new Date(2020, 0, 1), label: '2020: Pandemic widens gap' },
  ];

  const childrenAnnotations: Annotation[] = [
    { date: new Date(2020, 0, 1), label: '2020: School closures crash children activity' },
    { date: new Date(2022, 0, 1), label: '2022: School sport premium doubled' },
  ];

  const latest = data?.national.timeSeries[data.national.timeSeries.length - 1];
  const earliest = data?.national.timeSeries[0];

  return (
    <>
      <TopicNav topic="Physical Activity" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Wellbeing & Society"
          question="Is Britain Getting More Active?"
          finding="61.7% of adults met recommended physical activity guidelines in 2024-25, up from 55.8% a decade ago. But the gains are unevenly distributed: the gap between the wealthiest and most deprived areas remains a stubborn 19 percentage points, and fewer than half of children meet the daily activity guideline."
          colour="#2A9D8F"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              England is, on balance, getting slightly more active. The proportion of adults meeting the Chief Medical Officers' guideline of 150 minutes of moderate activity per week has risen from 55.8% in 2015-16 to 61.7% in 2024-25.<Cite nums={1} /> The proportion classified as inactive — doing fewer than 30 minutes a week — has fallen from 27.7% to 22.5% over the same period.<Cite nums={1} /> Walking remains the dominant form of activity; it accounts for more of the total than all organised sport combined. The pandemic temporarily reversed the trend in 2020, when gym closures and lockdowns pushed inactivity up sharply, but recovery was swift and the overall trajectory has resumed.
            </p>
            <p>
              The headline numbers, however, conceal a structural inequality that successive sport strategies have failed to close. In the least deprived fifth of neighbourhoods, 70.3% of adults are active. In the most deprived fifth, the figure is 51.1% — a 19 percentage-point gap that has barely moved in a decade.<Cite nums={2} /> The pattern is reproduced across gender, ethnicity, disability, and age. People in lower-income areas have fewer parks, fewer leisure centres, less safe walking infrastructure, and less free time. These are not lifestyle choices but structural conditions.
            </p>
            <p>
              Children's activity tells a more encouraging story. The proportion meeting the guideline of 60 minutes of moderate-to-vigorous activity per day has risen from 17.5% in 2015 to 47% in 2025, boosted by the doubling of the school sport premium and expanded community programmes.<Cite nums={3} /> But the 2012 Olympic legacy target of every child active every day remains unmet, and the pandemic set progress back by several years. Active travel — walking and cycling for transport — has also grown, with nearly half of adults now making at least one active journey per week, supported by new cycling infrastructure and the creation of Active Travel England.<Cite nums={4} />
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-activity', label: 'Adult activity' },
          { id: 'sec-deprivation', label: 'Deprivation gap' },
          { id: 'sec-children', label: 'Children & travel' },
          { id: 'sec-regional', label: 'Regional' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Adults meeting activity guidelines"
            value={latest ? `${latest.activePct}%` : '61.7%'}
            unit="2024-25"
            direction="up"
            polarity="up-is-good"
            changeText={
              latest && earliest
                ? `Up from ${earliest.activePct}% in 2015 · steady improvement`
                : 'Up from 55.8% in 2015'
            }
            sparklineData={
              data ? sparkFrom(data.national.timeSeries.map(d => d.activePct)) : []
            }
            source="Sport England · Active Lives Adult Survey, 2024-25"
            href="#sec-activity"
          />
          <MetricCard
            label="Deprivation activity gap"
            value="19pp"
            unit=""
            direction="flat"
            polarity="up-is-bad"
            changeText={
              latest
                ? `${latest.leastDeprivedPct}% wealthiest vs ${latest.mostDeprivedPct}% most deprived`
                : '70.3% wealthiest vs 51.1% most deprived'
            }
            sparklineData={
              data ? sparkFrom(data.national.timeSeries.map(d => d.leastDeprivedPct - d.mostDeprivedPct)) : []
            }
            source="Sport England · Active Lives, IMD quintile analysis"
            href="#sec-deprivation"
          />
          <MetricCard
            label="Children meeting daily 60-min guideline"
            value={latest ? `${latest.childrenActivePct}%` : '47%'}
            unit="2024-25"
            direction="up"
            polarity="up-is-good"
            changeText={
              latest && earliest
                ? `Up from ${earliest.childrenActivePct}% in 2015 · still below target`
                : 'Up from 17.5% in 2015 · still below target'
            }
            sparklineData={
              data ? sparkFrom(data.national.timeSeries.map(d => d.childrenActivePct)) : []
            }
            source="Sport England · Active Lives CYP Survey, 2024-25"
            href="#sec-children"
          />
        </div>

        {/* Chart 1: Adult activity levels */}
        <ScrollReveal>
          <div id="sec-activity" className="mb-12">
            <LineChart
              series={activitySeries}
              title="Adults meeting physical activity guidelines, England, 2015-2025"
              subtitle="Percentage of adults achieving at least 150 minutes of moderate activity or 75 minutes of vigorous activity per week. Active (green) is rising slowly; inactive (red) is falling."
              yLabel="Percentage"
              annotations={activityAnnotations}
              source={{
                name: 'Sport England',
                dataset: 'Active Lives Adult Survey',
                frequency: 'biannual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 2: Deprivation gap */}
        <ScrollReveal>
          <div id="sec-deprivation" className="mb-12">
            <LineChart
              series={deprivationSeries}
              title="Physical activity by deprivation, England, 2015-2025"
              subtitle="Activity rates in least and most deprived IMD quintiles. The 19-percentage-point gap has not narrowed despite successive sport strategies."
              yLabel="Percentage active"
              annotations={deprivationAnnotations}
              source={{
                name: 'Sport England',
                dataset: 'Active Lives Adult Survey — IMD analysis',
                frequency: 'biannual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 3: Children and active travel */}
        <ScrollReveal>
          <div id="sec-children" className="mb-12">
            <LineChart
              series={childrenSeries}
              title="Children's activity and adult active travel, England, 2015-2025"
              subtitle="Children meeting the 60-minute daily guideline and adults making at least one walking or cycling trip per week. Both measures are rising, with children's activity recovering strongly post-pandemic."
              yLabel="Percentage"
              annotations={childrenAnnotations}
              source={{
                name: 'Sport England / DfT',
                dataset: 'Active Lives CYP Survey; Walking and Cycling Statistics',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Regional variation */}
        <ScrollReveal>
          <div id="sec-regional" className="mb-12">
            <div className="bg-white rounded-lg border border-wiah-border p-8">
              <h2 className="text-lg font-bold text-wiah-black mb-2">
                Adults meeting activity guidelines by region (%)
              </h2>
              <p className="text-sm text-wiah-mid mb-6">
                Percentage of adults achieving 150+ minutes per week, by English region, 2024-25.
              </p>
              <div className="mt-6 space-y-4">
                {data?.byRegion.map((r) => {
                  const pct = (r.activePct / 75) * 100;
                  return (
                    <div key={r.region}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-wiah-black">{r.region}</span>
                        <span className="font-mono text-sm font-bold text-wiah-black">{r.activePct}%</span>
                      </div>
                      <div className="h-6 bg-wiah-light rounded-sm overflow-hidden">
                        <div
                          className="h-full rounded-sm transition-all"
                          style={{ width: `${pct}%`, backgroundColor: r.activePct >= 60 ? '#2A9D8F' : r.activePct >= 57 ? '#F4A261' : '#E63946' }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="font-mono text-xs text-wiah-mid mt-4">
                Source: Sport England — Active Lives Adult Survey by region, 2024-25
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Walking and cycling infrastructure investment up"
            value="\u00A33bn"
            unit="Active Travel England investment 2021-25"
            description="Active Travel England, the government's executive agency for walking and cycling, oversaw \u00A33 billion in investment in cycling and walking infrastructure between 2021 and 2025. The number of daily cycling trips increased by 14% over the period. Cycle lane coverage in English cities doubled. School streets programmes \u2014 temporary road closures at school drop-off times \u2014 now operate at 1,200 schools. Meanwhile, children's activity has risen steeply: the proportion meeting the 60-minute daily guideline has nearly tripled since 2015, from 17.5% to 47%, driven by the doubling of the school sport premium and expanded community programmes."
            source="Source: Active Travel England \u2014 programme statistics, 2025. Sport England \u2014 Active Lives Adult and CYP Surveys, 2024-25."
          />
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        {/* Sources & Methodology */}
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
              {data?.metadata.knownIssues.map((x, i) => <li key={i}>{x}</li>)}
            </ul>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
