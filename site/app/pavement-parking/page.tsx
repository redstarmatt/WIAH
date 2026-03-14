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
  { num: 1, name: 'Living Streets', dataset: 'Pedestrian Pound Report', date: '2024', note: 'Estimated 28 million annual pavement parking incidents in England' },
  { num: 2, name: 'Department for Transport', dataset: 'Pavement Parking Evidence Base', url: 'https://www.gov.uk/government/consultations/managing-pavement-parking', date: '2024' },
  { num: 3, name: 'Transport (Scotland) Act 2019', dataset: 'National pavement parking ban provisions', date: '2023', note: 'Fixed penalty notices of £100' },
];

// ── Types ────────────────────────────────────────────────────────────────────

interface EnforcementPoint {
  year: number;
  councilsEnforcingPct: number;
}

interface ComplaintsPoint {
  year: number;
  complaintsThousands: number;
}

interface DisabledPoint {
  year: number;
  affectedPct: number;
}

interface PavementParkingData {
  national: {
    councilEnforcement: {
      timeSeries: EnforcementPoint[];
      latestYear: number;
      latestPct: number;
    };
    complaints: {
      timeSeries: ComplaintsPoint[];
      latestYear: number;
      latestThousands: number;
    };
    disabledPeopleAffected: {
      timeSeries: DisabledPoint[];
      latestYear: number;
      latestPct: number;
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

export default function PavementParkingPage() {
  const [data, setData] = useState<PavementParkingData | null>(null);

  useEffect(() => {
    fetch('/data/pavement-parking/pavement_parking.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const enforcementSeries: Series[] = data
    ? [
        {
          id: 'enforcement',
          label: '% councils with active enforcement',
          colour: '#2A9D8F',
          data: data.national.councilEnforcement.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.councilsEnforcingPct,
          })),
        },
      ]
    : [];

  const complaintsSeries: Series[] = data
    ? [
        {
          id: 'complaints',
          label: 'Pavement parking complaints (thousands)',
          colour: '#6B7280',
          data: data.national.complaints.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.complaintsThousands,
          })),
        },
      ]
    : [];

  const enforcementAnnotations: Annotation[] = [
    { date: new Date(2021, 5, 1), label: '2021: DfT consultation closes' },
    { date: new Date(2023, 5, 1), label: '2023: Scotland bans pavement parking' },
  ];

  const complaintsAnnotations: Annotation[] = [
    { date: new Date(2022, 5, 1), label: '2022: Highway Code updated — pedestrian priority' },
  ];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Pavement Parking" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Streets &amp; Transport"
          question="Why Can't You Walk Down Your Street?"
          finding="28 million pavement parking incidents occur annually in England. Pavement parking is illegal in London but only weakly enforceable elsewhere. 56% of disabled people say pavement parking affects their ability to get around."
          colour="#6B7280"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              Pavement parking is illegal in London under the Greater London Council (General Powers) Act 1974. Across the rest of England, it exists in a grey zone: not illegal by default, but enforceable where councils have specific Traffic Regulation Orders.<Cite nums={2} /> The result is a postcode lottery in which the same behaviour is a fineable offence in one borough and entirely routine in the next.
            </p>
            <p>
              The impact falls disproportionately on disabled people, parents with prams and pushchairs, elderly people with limited mobility, and blind and visually impaired pedestrians.<Cite nums={1} /> A car parked half on the pavement can reduce usable pavement width below 1.5 metres — the minimum recommended for a wheelchair to pass. Scotland's Transport (Scotland) Act 2019 introduced a national ban enforced through fixed penalty notices.<Cite nums={3} /> England's DfT ran a consultation in 2020–21 but has yet to legislate nationally.<Cite nums={2} />
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-enforcement', label: 'Enforcement' },
          { id: 'sec-complaints', label: 'Complaints' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Annual pavement parking incidents"
              value="28M"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Estimated by Living Streets 2024 · Outside London: minimal enforcement"
              sparklineData={[20, 22, 24, 26, 27, 28]}
              href="#sec-enforcement"
            />
            <MetricCard
              label="Councils with active enforcement"
              value="28%"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="Up from 12% in 2020 · But voluntary, not statutory"
              sparklineData={[12, 14, 18, 22, 28]}
              href="#sec-enforcement"
            />
            <MetricCard
              label="Disabled people affected"
              value="56%"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Cannot get around due to pavement parking · DfT 2024"
              sparklineData={[52, 54, 55, 56]}
              href="#sec-enforcement"
            />
          </div>
        

        {/* Charts */}
        <ScrollReveal>
          <section id="sec-enforcement" className="mb-12">
            <LineChart
              title="English councils with pavement parking enforcement, 2020–2024"
              subtitle="Percentage of English councils with active enforcement powers for pavement parking (via byelaw or Traffic Regulation Orders). Growth reflects voluntary adoption, not a national statutory requirement."
              series={enforcementSeries}
              annotations={enforcementAnnotations}
              yLabel="% of councils"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-complaints" className="mb-12">
            <LineChart
              title="Pavement parking complaints to councils, England, 2019–2024"
              subtitle="Total pavement parking complaints reported to local councils and police in England. Complaints have risen by 71% since 2019, but without national legislation, enforcement response is inconsistent."
              series={complaintsSeries}
              annotations={complaintsAnnotations}
              yLabel="Thousands of complaints"
            />
          </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="What's changing"
            value="Scotland"
            unit="national ban in force 2023"
            description="Scotland banned pavement parking nationally in 2023 under the Transport (Scotland) Act 2019, with fixed penalty notices of £100. It is the first national pavement parking ban in the UK. England's Highway Code was updated in 2022 to give pedestrians clearer right of way, but this is not the same as enforcement powers. Individual councils can still apply for Traffic Regulation Orders, and the DfT has indicated it may legislate if voluntary adoption remains insufficient."
            source="Source: Living Streets — Pedestrian Pound Report, 2024. DfT — Pavement Parking Evidence Base, 2024."
          />
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

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
              <RelatedTopics />
      </main>
    </>
  );
}
