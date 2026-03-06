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

interface FacilitiesClosedPoint {
  year: number;
  closedCumulative: number;
}

interface AdultParticipationPoint {
  year: number;
  weeklyParticipationPct: number;
}

interface ChildActivityPoint {
  year: number;
  meetingGuidelinesPct: number;
}

interface GrassrootsSportData {
  national: {
    facilitiesClosed: {
      timeSeries: FacilitiesClosedPoint[];
      latestYear: number;
      latestCumulative: number;
      note: string;
    };
    adultParticipation: {
      timeSeries: AdultParticipationPoint[];
      latestYear: number;
      latestPct: number;
      note: string;
    };
    childDailyActivity: {
      timeSeries: ChildActivityPoint[];
      latestYear: number;
      latestPct: number;
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

export default function GrassrootsSportPage() {
  const [data, setData] = useState<GrassrootsSportData | null>(null);

  useEffect(() => {
    fetch('/data/grassroots-sport/grassroots_sport.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const facilitiesSeries: Series[] = data
    ? [{
        id: 'facilities',
        label: 'Facilities closed since 2010 (cumulative)',
        colour: '#E63946',
        data: data.national.facilitiesClosed.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.closedCumulative,
        })),
      }]
    : [];

  const participationSeries: Series[] = data
    ? [
        {
          id: 'adults',
          label: 'Adults: weekly sport participation (%)',
          colour: '#2A9D8F',
          data: data.national.adultParticipation.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.weeklyParticipationPct,
          })),
        },
        {
          id: 'children',
          label: 'Children: meeting daily activity guidelines (%)',
          colour: '#264653',
          data: data.national.childDailyActivity.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.meetingGuidelinesPct,
          })),
        },
      ]
    : [];

  const facilitiesAnnotations: Annotation[] = [
    { date: new Date(2010, 5, 1), label: '2010: Council budget cuts begin' },
    { date: new Date(2020, 5, 1), label: '2020: Pandemic temporarily closes remaining facilities' },
    { date: new Date(2022, 5, 1), label: '2022: Energy cost spike accelerates closures' },
  ];

  const participationAnnotations: Annotation[] = [
    { date: new Date(2019, 5, 1), label: '2019: Pre-pandemic participation peak' },
    { date: new Date(2020, 5, 1), label: '2020: Lockdowns reduce participation' },
  ];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Grassroots Sport" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Grassroots Sport"
          question="Is Grassroots Sport in Decline?"
          finding="1,200 sports and leisure facilities closed between 2010 and 2024. Weekly sports participation rates have stagnated at 61% since 2019. Children from low-income families are 50% less likely to participate regularly."
          colour="#2A9D8F"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              England lost 1,200 public sports and leisure facilities between 2010 and 2024 — an average of 86 per year, sustained across 14 years of local government financial pressure. Swimming pools account for the largest share: over 400 public pools closed in this period, with many more reducing operating hours. The pattern is geographically uneven. Facilities closed fastest in deprived areas where councils faced the most severe funding pressure and commercial replacement providers saw the least commercial opportunity. The result is that access to sport and physical activity has become more stratified by income and geography.
            </p>
            <p>
              The participation data tells a story of stagnation. The adult weekly sport participation rate reached 63% in 2019, then fell to 60.4% during the pandemic, and has recovered only to 61.3% by 2024 — below the pre-pandemic peak. Child activity is particularly concerning: only 46% of children meet the Chief Medical Officer's guideline of 60 minutes of moderate-to-vigorous activity per day. The income gradient is steep — Sport England data consistently shows children from families in the lowest income quintile are 50% less likely to meet activity guidelines than those in the highest quintile. The closure of free or low-cost council facilities, and the reduction of school sport in the curriculum since 2010, are the structural drivers of this gap.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-facilities', label: 'Facility Closures' },
          { id: 'sec-participation', label: 'Participation' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        {/* Metric cards */}
        <ScrollReveal>
          <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Sports/leisure facilities closed since 2010"
              value="1,200"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Austerity-era council cuts · Swimming pools hardest hit"
              sparklineData={[0, 100, 200, 320, 440, 560, 640, 720, 800, 860, 920, 980, 1050, 1120, 1200]}
              href="#sec-facilities"
            />
            <MetricCard
              label="Weekly sport participation (adults)"
              value="61.3%"
              unit=""
              direction="flat"
              polarity="up-is-good"
              changeText="Stagnant since 2019 · Pre-pandemic peak was 63%"
              sparklineData={[59.1, 60.3, 61.1, 62.2, 63.0, 60.4, 62.2, 62.8, 61.5, 61.3]}
              href="#sec-facilities"
            />
            <MetricCard
              label="Children meeting daily activity guidelines"
              value="46%"
              unit=""
              direction="down"
              polarity="up-is-good"
              changeText="Down from 47% pre-pandemic · Free school sport provision cut"
              sparklineData={[47, 47, 43, 40, 44, 47, 46]}
              href="#sec-facilities"
            />
          </div>
        </ScrollReveal>

        {/* Charts */}
        <ScrollReveal>
          <section id="sec-facilities" className="mb-12">
            <LineChart
              title="Cumulative sports and leisure facility closures, UK, 2010–2024"
              subtitle="Cumulative total of public sports and leisure facilities closed since 2010. Includes swimming pools, leisure centres, public courts, and sports halls. Closures accelerated during 2022 energy crisis."
              series={facilitiesSeries}
              annotations={facilitiesAnnotations}
              yLabel="Facilities closed (cumulative)"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-participation" className="mb-12">
            <LineChart
              title="Sport participation rates: adults and children, England, 2015/18–2024"
              subtitle="Adults doing sport at least weekly (Sport England Active Lives survey) and children meeting CMO daily activity guidelines (60+ minutes MVPA). Both stagnant or declining since 2019."
              series={participationSeries}
              annotations={participationAnnotations}
              yLabel="Participation (%)"
            />
          </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="What's improving"
            value="£300m Multi-Sport Grassroots Facilities Programme"
            unit=""
            description="Sport England's Uniting the Movement strategy targets halving physical inactivity by 2030. The £300 million Multi-Sport Grassroots Facilities Programme is upgrading 8,000 facilities. Swimming England's Swim England blueprint aims to protect the remaining public pool estate. The Government's School Sport and Activity Action Plan seeks to reverse the decline in school sport. Active Travel England is investing in walking and cycling infrastructure as a route to daily activity."
            source="Source: Sport England — Active Lives 2024; Swim England — Facilities review 2024."
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
