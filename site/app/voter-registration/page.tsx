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

// ── References ──────────────────────────────────────────────────────────────

const editorialRefs: Reference[] = [
  { num: 1, name: 'Electoral Commission', dataset: 'Accuracy and completeness of the electoral registers', url: 'https://www.electoralcommission.org.uk/research-reports-and-data', date: '2025' },
  { num: 2, name: 'Electoral Commission', dataset: 'Voter identification monitoring — 2023 local elections', url: 'https://www.electoralcommission.org.uk/research-reports-and-data', date: '2023' },
  { num: 3, name: 'Electoral Commission', dataset: '2024 General Election monitoring report', url: 'https://www.electoralcommission.org.uk/research-reports-and-data', date: '2024' },
];

// ── Types ────────────────────────────────────────────────────────────────────

interface DataPoint {
  year: number;
  under25Pct: number;
  over65Pct: number;
  completeness: number;
  youngPeopleM: number;
  bameM: number;
  totalUnregisteredM: number;
}

interface VoterIdPoint {
  year: number;
  localElectionTurnedAwayPct: number | null;
  localElectionWithoutIdPct: number | null;
  generalElectionTurnedAwayPct: number | null;
  generalElectionWithoutIdPct: number | null;
}

interface RegionData {
  region: string;
  completeness: number;
  under25Pct: number;
}

interface TopicData {
  national: { timeSeries: DataPoint[] };
  voterIdImpact: VoterIdPoint[];
  byRegion: RegionData[];
  metadata: {
    sources: { name: string; dataset: string; url: string; frequency: string }[];
    methodology: string;
    knownIssues: string[];
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 0, 1);
}

function sparkFrom(arr: number[], n = 10) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function VoterRegistrationPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/voter-registration/voter_registration.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const registrationByAgeSeries: Series[] = data
    ? [
        {
          id: 'under25Pct',
          label: '18–24 registered (%)',
          colour: '#E63946',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.under25Pct,
          })),
        },
        {
          id: 'over65Pct',
          label: '65+ registered (%)',
          colour: '#264653',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.over65Pct,
          })),
        },
      ]
    : [];

  const unregisteredSeries: Series[] = data
    ? [
        {
          id: 'youngPeopleM',
          label: 'Under-25s unregistered (millions)',
          colour: '#E63946',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.youngPeopleM,
          })),
        },
        {
          id: 'bameM',
          label: 'Black/ethnic minority unregistered (millions)',
          colour: '#F4A261',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.bameM,
          })),
        },
      ]
    : [];

  const completenessSeries: Series[] = data
    ? [
        {
          id: 'completeness',
          label: 'Register completeness (%)',
          colour: '#264653',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.completeness,
          })),
        },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2014, 0, 1), label: '2014: Individual Electoral Registration introduced' },
    { date: new Date(2023, 0, 1), label: '2023: Photo ID required for voting' },
  ];

  const completenessAnnotations: Annotation[] = [
    { date: new Date(2014, 0, 1), label: '2014: IER transition' },
    { date: new Date(2016, 5, 1), label: '2016: EU referendum surge' },
  ];

  // ── Derived values ────────────────────────────────────────────────────

  const latest = data?.national.timeSeries[data.national.timeSeries.length - 1];
  const earliest = data?.national.timeSeries[0];

  return (
    <>
      <TopicNav topic="Voter Registration" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Democracy & Governance"
          question="How Many Eligible Voters Aren't Registered?"
          finding="An estimated 8.3 million eligible voters are not registered to vote in Great Britain — including 43% of 18–24 year olds and 23% of Black and minority ethnic adults. The register is less complete now than at any point since the transition to individual registration in 2014."
          colour="#6B7280"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              The electoral register is the gateway to democratic participation. If you are not on it, you cannot vote. An estimated 8.3 million eligible adults in Great Britain are missing from the register — a number that has remained stubbornly stable for a decade despite successive registration drives. The shift to Individual Electoral Registration in 2014, which replaced household registration with a requirement for each person to register individually, permanently reduced completeness from around 91% to 83–86%, with the sharpest falls among young adults, private renters, and ethnic minority communities.<Cite nums={1} />
            </p>
            <p>
              The introduction of mandatory photo ID for voting in 2023 added a second barrier. Electoral Commission monitoring found that 0.7% of voters at the May 2023 local elections were initially turned away without valid ID, with higher rates among younger and older voters and those from ethnic minority backgrounds.<Cite nums={2} /> At the July 2024 general election, the figure fell to 0.3%, but the Commission noted this captures only those who attended<Cite nums={3} /> — not those who stayed home because they lacked or believed they lacked valid identification.
            </p>
            <p>
              The pattern is structural, not accidental. Under-registration maps onto disadvantage: the groups least likely to be registered — young renters, recent movers, people in Houses of Multiple Occupation, ethnic minority communities — are also those whose policy interests are least represented. A register that systematically under-counts certain groups does not just reduce turnout; it shapes which voices political parties choose to hear.<Cite nums={1} />
            </p>
          </div>
          <div className="mt-6">
            <References items={editorialRefs} />
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-age-gap', label: 'Age gap' },
          { id: 'sec-unregistered', label: 'Who is missing' },
          { id: 'sec-completeness', label: 'Completeness' },
          { id: 'sec-regional', label: 'Regional' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Eligible voters not registered"
            value="8.3m"
            unit=""
            direction="flat"
            polarity="up-is-bad"
            changeText="Unchanged for a decade · structural problem"
            sparklineData={
              data
                ? sparkFrom(data.national.timeSeries.map(d => d.totalUnregisteredM))
                : [8.1, 8.1, 8.2, 8.3, 8.5, 8.4, 8.3, 8.3, 8.3, 8.3]
            }
            source="Electoral Commission · Register completeness study, 2025"
            href="#sec-age-gap"
          />
          <MetricCard
            label="18–24 year olds registered"
            value={latest ? `${latest.under25Pct}%` : '57%'}
            unit=""
            direction="flat"
            polarity="up-is-good"
            changeText={
              earliest && latest
                ? `Up from ${earliest.under25Pct}% in ${earliest.year} · still 40pp below 65+`
                : 'Up from 45% in 2015 · still 40pp below 65+'
            }
            sparklineData={
              data
                ? sparkFrom(data.national.timeSeries.map(d => d.under25Pct))
                : [45, 47, 49, 52, 54, 56, 57, 57, 57, 57]
            }
            source="Electoral Commission · Ipsos polling, 2025"
            href="#sec-unregistered"
          />
          <MetricCard
            label="Electoral register completeness"
            value={latest ? `${latest.completeness}%` : '83%'}
            unit=""
            direction="down"
            polarity="up-is-good"
            changeText="Below pre-IER level of 91% · declining since 2021"
            sparklineData={
              data
                ? sparkFrom(data.national.timeSeries.map(d => d.completeness))
                : [84, 84, 85, 85, 86, 86, 86, 85, 84, 83]
            }
            source="Electoral Commission · Register accuracy and completeness, 2025"
            href="#sec-completeness"
          />
        </div>

        {/* Chart 1: Registration by age */}
        <ScrollReveal>
          <div id="sec-age-gap" className="mb-12">
            <LineChart
              series={registrationByAgeSeries}
              title="Voter registration completeness by age, Great Britain, 2015–2025"
              subtitle="Percentage of eligible voters in each age group who are registered to vote. The gap between young and old has narrowed since 2015, but 18–24s remain the most under-registered group by a wide margin."
              yLabel="Registered (%)"
              annotations={annotations}
              source={{
                name: 'Electoral Commission',
                dataset: 'Register completeness estimates (Ipsos polling)',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 2: Unregistered by characteristic */}
        <ScrollReveal>
          <div id="sec-unregistered" className="mb-12">
            <LineChart
              series={unregisteredSeries}
              title="Unregistered eligible voters by characteristic, 2015–2025"
              subtitle="Estimated number of eligible voters not on the electoral register, by demographic group. The growth in unregistered ethnic minority adults reflects both population growth and persistently lower registration rates."
              yLabel="Millions"
              annotations={[
                { date: new Date(2023, 0, 1), label: '2023: Voter ID requirement begins' },
              ]}
              source={{
                name: 'Electoral Commission',
                dataset: 'Under-registration estimates',
                frequency: 'biennial',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 3: Overall completeness */}
        <ScrollReveal>
          <div id="sec-completeness" className="mb-12">
            <LineChart
              series={completenessSeries}
              title="Electoral register completeness, Great Britain, 2015–2025"
              subtitle="Percentage of eligible adults appearing on the electoral register. The shift to individual registration in 2014 caused a permanent drop from around 91%; completeness has not recovered."
              yLabel="Completeness (%)"
              annotations={completenessAnnotations}
              source={{
                name: 'Electoral Commission',
                dataset: 'Accuracy and completeness of the electoral registers',
                frequency: 'biennial',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Regional variation */}
        <ScrollReveal>
          <div id="sec-regional" className="mb-12">
            <div className="bg-white rounded-lg border border-wiah-border p-8">
              <h2 className="text-lg font-bold text-wiah-black mb-2">
                Electoral register completeness by region
              </h2>
              <p className="text-sm text-wiah-mid mb-6">
                Estimated percentage of eligible adults registered to vote. London has the lowest completeness, driven by high population mobility, private renting, and younger demographics.
              </p>
              <div className="mt-6 space-y-4">
                {data?.byRegion
                  .sort((a, b) => a.completeness - b.completeness)
                  .map((r) => {
                    const pct = ((r.completeness - 70) / 25) * 100;
                    return (
                      <div key={r.region}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium text-wiah-black">{r.region}</span>
                          <span className="font-mono text-sm font-bold text-wiah-black">{r.completeness}%</span>
                        </div>
                        <div className="h-6 bg-wiah-light rounded-sm overflow-hidden">
                          <div
                            className="h-full rounded-sm transition-all"
                            style={{ width: `${Math.max(pct, 5)}%`, backgroundColor: r.completeness < 83 ? '#E63946' : '#264653' }}
                          />
                        </div>
                      </div>
                    );
                  })}
              </div>
              <p className="font-mono text-xs text-wiah-mid mt-4">
                Source: Electoral Commission — Accuracy and completeness of the electoral registers, 2025
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Automatic registration pilot expanding"
            value="2024"
            unit="automatic registration pilot in 6 councils"
            description="Six English councils piloted automatic voter registration from 2024, using data matching between council tax, school, and benefits records to automatically enrol eligible residents. Early results show registration rates rising by 12–18 percentage points in pilot areas among under-30s. A national rollout is under consultation, which the Electoral Commission estimates could add 4–5 million eligible voters to the register. Wales has already implemented automatic registration for 16 and 17-year-olds for Senedd elections, with registration rates in that age group rising from 20% to 68% in the first year."
            source="Source: Electoral Commission — Automatic Voter Registration pilot evaluation, 2025. Welsh Government — Electoral Administration and Registration, 2025."
          />
        </ScrollReveal>

        {/* Sources & Methodology */}
        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            {data?.metadata.sources.map((src, i) => (
              <div key={i}>
                <a
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-wiah-blue hover:underline"
                >
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
              {data?.metadata.knownIssues.map((x, i) => (
                <li key={i}>{x}</li>
              ))}
            </ul>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
