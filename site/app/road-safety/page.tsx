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

interface FatalitiesAndKSIPoint {
  year: number;
  fatalitiesCount: number;
  ksi: number;
}

interface DrinkDrivingPoint {
  year: number;
  fatalitiesCount: number;
}

interface RoadSafetyData {
  national: {
    fatalitiesAndKSI: {
      timeSeries: FatalitiesAndKSIPoint[];
      latestYear: number;
      latestFatalities: number;
      latestKSI: number;
      peakYear1972: number;
    };
    vulnerableUsers: {
      timeSeries: Array<{ year: number; pedestrianFatalitiesPct: number; cyclistFatalitiesPct: number; motorcyclistFatalitiesPct: number }>;
    };
    drinkDriving: {
      timeSeries: DrinkDrivingPoint[];
      latestYear: number;
      latestFatalities: number;
    };
    speedingCompliance: {
      timeSeries: Array<{ year: number; motorwayExceedingLimitPct: number }>;
      latestYear: number;
      latestMotorwayExceedingPct: number;
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

export default function RoadSafetyPage() {
  const [data, setData] = useState<RoadSafetyData | null>(null);

  useEffect(() => {
    fetch('/data/road-safety/road_safety.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  // 1. Fatalities
  const fatalitiesSeries: Series[] = data
    ? [{
        id: 'fatalities',
        label: 'Road fatalities',
        colour: '#E63946',
        data: data.national.fatalitiesAndKSI.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.fatalitiesCount,
        })),
      }]
    : [];

  const fatalitiesAnnotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: '2020: COVID lockdown' },
  ];

  // 2. KSI
  const ksiSeries: Series[] = data
    ? [{
        id: 'ksi',
        label: 'Killed or seriously injured',
        colour: '#F4A261',
        data: data.national.fatalitiesAndKSI.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.ksi,
        })),
      }]
    : [];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Road Safety" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Road Safety"
          question="Are British Roads Actually Getting Safer?"
          finding="UK road deaths have fallen 78% since 1972 &mdash; from 7,952 to 1,695. But progress has stalled since 2010: fatalities have plateaued at 1,700&ndash;1,800, serious injuries are rising, and the UK lags behind the Netherlands and Sweden on modern safety measures."
          colour="#F4A261"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              Britain&apos;s road safety record is a story of historic success followed by a decade of stagnation. Fatalities fell from 7,952 in 1972 to a COVID-distorted low of 1,460 in 2020, but in normal traffic years the figure has plateaued at 1,700&ndash;1,800 since 2010. The UK&apos;s fatality rate stands at roughly 3.5 per billion vehicle miles in 2022; Sweden records about 2.0 and the Netherlands 2.5. The DfT&apos;s Road Safety Strategy targets a 50% reduction in killed-or-seriously-injured casualties by 2030, but KSI totalled 28,294 in 2023 and is rising. That figure itself understates the problem: STATS19 police data under-reports serious injuries by approximately three times compared with hospital admission records.
            </p>
            <p>
              Vulnerable road users account for more than half of all deaths despite representing a tiny fraction of vehicle miles. In 2023, 456 pedestrians and 136 cyclists were killed on British roads. Pedestrians, cyclists, and motorcyclists combined bear disproportionate risk precisely because infrastructure has not adapted to rising cycling volumes since 2015. The UK spends &pound;1.27 per head per year on cycling infrastructure; the Netherlands spends &pound;37. Until protected lanes, junction redesigns, and lower urban speed limits close that gap, vulnerable-user casualties will continue to rise alongside modal shift.
            </p>
            <p>
              Drink-driving kills roughly 220 people a year &mdash; 13% of all road deaths &mdash; a figure that has barely moved since 2015. England and Wales retain the 80mg blood-alcohol limit, among the highest in Europe; Scotland cut its limit to 50mg in 2014 and saw an immediate fall in drink-drive casualties. Speed compliance is equally poor: 46% of motorway drivers exceeded 70mph in 2022. Enforcement capacity has collapsed alongside the numbers &mdash; dedicated roads policing officers fell from around 6,800 in 2010 to approximately 3,750 in 2023. Both problems have well-evidenced policy solutions that remain unimplemented in England.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-fatalities', label: 'Fatalities' },
          { id: 'sec-vulnerable', label: 'Vulnerable Users' },
          { id: 'sec-drink-drive', label: 'Drink Driving' },
        ]} />

        {/* Metric cards */}
        <ScrollReveal>
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Road fatalities (GB)"
            value="1,695"
            unit=""
            direction="flat"
            polarity="up-is-bad"
            changeText="2023 · Down 78% from 7,952 in 1972 · Progress stalled since 2010"
            sparklineData={[1857, 1901, 1754, 1713, 1775, 1732, 1792, 1793, 1782, 1752, 1460, 1558, 1711, 1695]}
            onExpand={() => {}}
          />
          <MetricCard
            label="Killed or seriously injured"
            value="28,294"
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText="2022/23 · Rising since 2016 low · Serious injuries 3x higher in hospital data"
            sparklineData={[23530, 23122, 22367, 21657, 22807, 22144, 23432, 24831, 25511, 25945, 21623, 24622, 28294, 28294]}
            onExpand={() => {}}
          />
          <MetricCard
            label="Drink-drive fatalities"
            value="220"
            unit=""
            direction="flat"
            polarity="up-is-bad"
            changeText="2022 · Plateau since 2015 · Scotland lowered limit to 50mg in 2014, England remains at 80mg"
            sparklineData={[260, 240, 210, 230, 250, 240, 230, 200, 230, 220]}
            onExpand={() => {}}
          />
        </div>
        </ScrollReveal>

        {/* Charts */}
        <ScrollReveal>
        <section id="sec-fatalities" className="mb-12">
          <LineChart
            title="Road fatalities, Great Britain, 2010&ndash;2023"
            subtitle="People killed on GB roads per year. Down from 7,952 in 1972 to 1,695 in 2023 &mdash; a long-run success story. However, fatalities have plateaued since 2010 with no meaningful reduction."
            series={fatalitiesSeries}
            annotations={fatalitiesAnnotations}
            yLabel="Fatalities"
          />
        </section>
        </ScrollReveal>

        <ScrollReveal>
        <section id="sec-vulnerable" className="mb-12">
          <LineChart
            title="Killed or seriously injured (KSI), Great Britain, 2010&ndash;2023"
            subtitle="Total casualties killed or seriously injured on GB roads. The KSI figure is more volatile but has been rising since 2016, driven by increases in serious injuries. Police STATS19 under-reports; hospital data estimates are 3x higher."
            series={ksiSeries}
            yLabel="KSI casualties"
          />
        </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
        <PositiveCallout
          title="What&apos;s improving"
          value="&ndash;78%"
          unit="road deaths since 1972 &mdash; one of the greatest public safety achievements in British history"
          description="The fall in road fatalities from 7,952 in 1972 to around 1,700 today represents one of the most significant public health achievements of the past 50 years. Seatbelt legislation (1983), the breathalyser (1967), motorway speed cameras, better car safety standards, improved emergency medicine, and safer road design all contributed. Today&apos;s cars are incomparably safer than those of the 1970s. Child road deaths have fallen particularly sharply: in 1972, over 700 children were killed on roads; by 2023 the figure was below 60."
          source="Source: DfT &mdash; Reported road casualties Great Britain 2023 (STATS19)."
        />
        </ScrollReveal>

        {/* Sources */}
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
