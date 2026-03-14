'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';
import SectionNav from '@/components/SectionNav';

const editorialRefs: Reference[] = [
  { num: 1, name: 'Social Mobility Commission', dataset: 'State of the Nation Report', url: 'https://www.gov.uk/government/organisations/social-mobility-commission', date: '2025' },
  { num: 2, name: 'OECD', dataset: 'A Broken Social Elevator? How to Promote Social Mobility', url: 'https://www.oecd.org/social/broken-elevator-how-to-promote-social-mobility-9789264301085-en.htm', date: '2018' },
  { num: 3, name: 'Institute for Fiscal Studies', dataset: 'Intergenerational Mobility in the UK', url: 'https://ifs.org.uk/', date: '2023' },
];

// ── Types ────────────────────────────────────────────────────────────────────

interface DataPoint {
  year: number;
  bottomQuintilePersistence: number;
  topQuintilePersistence: number;
  degreePoorPct: number;
  degreewealthyPct: number;
}

interface TopicData {
  national: {
    timeSeries: DataPoint[];
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

export default function TopicPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/income-mobility/income_mobility.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const chart1Series: Series[] = data
    ? [
        {
          id: 'bottomQuintilePersistence',
          label: 'Bottom quintile persistence (%)',
          colour: '#E63946',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.bottomQuintilePersistence,
          })),
        },
        {
          id: 'topQuintilePersistence',
          label: 'Top quintile persistence (%)',
          colour: '#264653',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.topQuintilePersistence,
          })),
        },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        {
          id: 'degreePoorPct',
          label: 'Degree attainment - bottom income quintile (%)',
          colour: '#264653',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.degreePoorPct,
          })),
        },
        {
          id: 'degreewealthyPct',
          label: 'Degree attainment - top income quintile (%)',
          colour: '#2A9D8F',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.degreewealthyPct,
          })),
        },
      ]
    : [];

  const chart1Annotations: Annotation[] = [
    { date: new Date(2016, 5, 1), label: '2016: Social Mobility Commission established' },
    { date: new Date(2021, 5, 1), label: '2021: Covid widens educational attainment gap' },
  ];

  const chart2Annotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: '2020: University applications diverge by income' },
  ];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Income Mobility" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Poverty & Cost of Living"
          question="Can You Escape the Income You're Born Into?"
          finding={<>Children born in the bottom income quintile have a 38% chance of remaining there in adulthood — far above the 20% expected if mobility were equal.<Cite nums={1} /> The UK ranks 28th of 38 OECD nations.<Cite nums={2} /></>}
          colour="#F4A261"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>A child born into the poorest fifth of British households has a 38% chance of remaining there as an adult — nearly double the 20% that would occur if income were unrelated to parental background. The UK&apos;s intergenerational earnings elasticity of 0.46 places it 28th out of 38 OECD nations, behind France, Germany, and all of Scandinavia. The mechanisms are well documented: childhood poverty constrains educational attainment, which limits access to professional occupations, which determines lifetime earnings. Geography compounds the effect — mobility is lowest in former industrial towns in the North East, East Midlands, and coastal communities where the labour market offers fewer routes upward.<Cite nums={1} /></p>
            <p>Education is both the primary engine of mobility and its main bottleneck. Children from the wealthiest fifth are roughly twice as likely to obtain a degree as those from the poorest fifth, a gap that widened during the pandemic as learning loss fell disproportionately on disadvantaged pupils. University widening participation initiatives have increased low-income enrolment, but graduate outcomes still diverge sharply by socioeconomic background: those from professional families are more likely to enter higher-paying occupations regardless of degree classification. The OECD estimates it takes five generations for a family at the bottom of the UK income distribution to reach the mean — longer than in almost any other developed economy.<Cite nums={2} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-chart1', label: 'Chart 1' },
          { id: 'sec-chart2', label: 'Chart 2' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Persistence in bottom quintile"
            value="38%"
            unit=""
            direction="flat"
            polarity="up-is-bad"
            changeText="20% would be equal mobility · UK lags OECD peers"
            sparklineData={[39, 39, 39, 38, 38, 38, 38, 38, 38, 38, 38]}
            href="#sec-coverage"
          />
          <MetricCard
            label="Intergenerational earnings elasticity"
            value="0.46"
            unit=""
            direction="flat"
            polarity="up-is-bad"
            changeText="0=perfect mobility, 1=no mobility · Denmark 0.15"
            sparklineData={[0.47, 0.47, 0.46, 0.46, 0.46, 0.46, 0.46, 0.46, 0.46, 0.46, 0.46]}
            href="#sec-coverage"
          />
          <MetricCard
            label="UK OECD mobility rank"
            value="28th"
            unit="of 38"
            direction="flat"
            polarity="up-is-bad"
            changeText="Lower than France (11th), Germany (16th)"
            sparklineData={[27, 27, 27, 28, 28, 28, 28, 28, 28, 28, 28]}
            href="#sec-coverage"
          />
        </div>

        {/* Charts */}
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Intergenerational income persistence, UK vs peers, 2015-2025"
              subtitle="Probability of remaining in bottom income quintile as an adult if born there. Constant at 38% — twice the equal-mobility benchmark of 20%."
              series={chart1Series}
              annotations={chart1Annotations}
              yLabel="Value"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Social mobility indicators, UK, 2015-2025"
              subtitle="Key indicators of social mobility in the UK: degree attainment by parental income, and professional occupancy by background."
              series={chart2Series}
              annotations={chart2Annotations}
              yLabel="Value"
            />
          </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Social Mobility Commission identifying gaps"
            value="2016"
            unit="Social Mobility Commission established"
            description="The Social Mobility Commission publishes annual State of the Nation reports identifying barriers and progress. The Opportunity Areas programme targeted 12 coastal and post-industrial communities. University widening participation has increased students from low-income backgrounds from 27% to 34% of entrants since 2015."
            source="Source: Social Mobility Commission — State of the Nation, 2025."
          />
        </ScrollReveal>

        {/* Sources */}
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
              {data?.metadata.knownIssues.map((issue, i) => (
                <li key={i}>{issue}</li>
              ))}
            </ul>
          </div>
        </section>

        <References items={editorialRefs} />
      </main>
    </>
  );
}
