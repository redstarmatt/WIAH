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

interface PrevalencePoint {
  year: number;
  prevalencePct: number;
}

interface OnlineGamblingPoint {
  year: number;
  gamblingOnlinePct: number;
}

interface TreatedPoint {
  year: number;
  childrenTreated: number;
}

interface YouthGamblingData {
  national: {
    problemGamblingPrevalence: {
      timeSeries: PrevalencePoint[];
      latestYear: number;
      latestPct: number;
      estimatedProblemGamblers: number;
    };
    onlineGambling1624: {
      timeSeries: OnlineGamblingPoint[];
      latestYear: number;
      latestPct: number;
    };
    childrenTreated: {
      timeSeries: TreatedPoint[];
      latestYear: number;
      latestCount: number;
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

export default function YouthGamblingPage() {
  const [data, setData] = useState<YouthGamblingData | null>(null);

  useEffect(() => {
    fetch('/data/compulsive-gambling-youth/youth_gambling.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const prevalenceSeries: Series[] = data
    ? [
        {
          id: 'prevalence',
          label: 'Problem gambling prevalence 11-16 (%)',
          colour: '#F4A261',
          data: data.national.problemGamblingPrevalence.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.prevalencePct,
          })),
        },
      ]
    : [];

  const onlineSeries: Series[] = data
    ? [
        {
          id: 'online',
          label: 'Online gambling 16-24 year olds (%)',
          colour: '#E63946',
          data: data.national.onlineGambling1624.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.gamblingOnlinePct,
          })),
        },
        {
          id: 'treated',
          label: 'Children treated for gambling harm (hundreds)',
          colour: '#264653',
          data: data.national.childrenTreated.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.childrenTreated / 100,
          })),
        },
      ]
    : [];

  const prevalenceAnnotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: '2020: COVID lockdown &mdash; online gambling spike' },
    { date: new Date(2023, 5, 1), label: '2023: Gambling Act Review stake limits' },
  ];

  const onlineAnnotations: Annotation[] = [
    { date: new Date(2021, 5, 1), label: '2021: Loot box review published' },
    { date: new Date(2023, 5, 1), label: '2023: Online slot stake limit &pound;5' },
  ];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Youth Gambling Harm" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Social Issues"
          question="How Many Young People Are Problem Gamblers?"
          finding="An estimated 55,000 children aged 11&ndash;16 are classified as problem gamblers. Online gambling among 16&ndash;24 year olds has doubled since 2018. Gambling harm treatment services for under-18s are minimal."
          colour="#F4A261"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              Children and young people are being exposed to gambling at unprecedented levels. Video game mechanics &mdash; particularly loot boxes &mdash; normalise chance-based spending. Gambling advertising saturates live sport. Online gambling is accessible via smartphones at all hours. The Gambling Commission&apos;s Young People and Gambling Survey consistently finds around 70% of 11&ndash;16 year olds have gambled in some form in the past year.
            </p>
            <p>
              The treatment infrastructure for young people with gambling problems is essentially non-existent at scale. NHS treatment services are adult-focused; only the National Problem Gambling Clinic accepts under-18 referrals, and it is a single London-based service. The 900 children treated in 2024 represents a small fraction of the estimated 55,000 with a problem. Waiting times for those who do access help are long, and GPs rarely recognise or ask about gambling harm in young people.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-prevalence', label: 'Prevalence' },
          { id: 'sec-online', label: 'Online gambling' },
        ]} />

        {/* Metric cards */}
        <ScrollReveal>
          <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Child problem gamblers (age 11-16)"
              value="55,000"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="1.4% prevalence · Up from 0.9% in 2018"
              sparklineData={[0.9, 1.0, 1.0, 1.1, 1.2, 1.3, 1.4]}
              onExpand={() => {}}
            />
            <MetricCard
              label="Online gambling 16-24 age group"
              value="28%"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Doubled since 2018 · Loot boxes and esports betting"
              sparklineData={[14, 16, 18, 22, 25, 27, 28]}
              onExpand={() => {}}
            />
            <MetricCard
              label="Children treated for gambling harm"
              value="900"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="+125% since 2020 · Treatment capacity vastly insufficient"
              sparklineData={[400, 500, 600, 750, 900]}
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        {/* Charts */}
        <ScrollReveal>
          <section id="sec-prevalence" className="mb-12">
            <LineChart
              title="Problem gambling prevalence among 11&ndash;16 year olds, England, 2018&ndash;2024"
              subtitle="Percentage of children aged 11-16 classified as problem gamblers using the DSM-IV Problem Gambling Scale. Prevalence has risen steadily, with a spike during 2020-21 lockdowns when online gambling increased."
              series={prevalenceSeries}
              annotations={prevalenceAnnotations}
              yLabel="% problem gamblers"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-online" className="mb-12">
            <LineChart
              title="Online gambling among 16&ndash;24 year olds and children in treatment, 2018&ndash;2024"
              subtitle="Percentage of 16-24 year olds who gambled online in the past month, alongside children (under 18) treated for gambling harm. Treatment numbers shown in hundreds for comparability."
              series={onlineSeries}
              annotations={onlineAnnotations}
              yLabel="% / hundreds treated"
            />
          </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="What&apos;s improving"
            value="Gambling Act"
            unit="Review 2023"
            description="The Gambling Act Review 2023 introduced a &pound;5 maximum stake for online slots and mandatory affordability checks for high-spending customers. The National Gambling Treatment Service now accepts under-18 referrals. GamCare&apos;s Young People&apos;s Service provides free counselling for under-18s. The Gambling Commission has tightened rules on advertising near schools and banned cartoon characters in gambling promotions."
            source="Source: Gambling Commission &mdash; Young People and Gambling Survey, 2024. NHS National Problem Gambling Clinic, 2024."
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
