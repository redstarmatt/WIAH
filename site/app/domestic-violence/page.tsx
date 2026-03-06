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

interface PoliceCrimeTimeSeries {
  year: number;
  crimesThousands: number;
}

interface AbuseByType {
  type: string;
  pct: number;
}

interface DomesticViolenceData {
  national: {
    policeCrimes: {
      timeSeries: PoliceCrimeTimeSeries[];
      latestYear: number;
      latestThousands: number;
      reportedPct: number;
      chargeRatePct: number;
      note: string;
    };
    victims: {
      yearToMarch2023: {
        totalMillions: number;
        womenMillions: number;
        menMillions: number;
        source: string;
      };
      lifetimePrevalence: {
        womenPct: number;
        menPct: number;
      };
      femicideCount2022: number;
      femicideSource: string;
    };
    byType: AbuseByType[];
    refuges: {
      bedSpaces: number;
      estimatedNeed: number;
      requestsDeclined2022: number;
      note: string;
    };
    marac: {
      referrals2022: number;
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
  return new Date(y, 0, 1);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function DomesticViolencePage() {
  const [data, setData] = useState<DomesticViolenceData | null>(null);

  useEffect(() => {
    fetch('/data/domestic-violence/domestic_violence.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  // 1. Police recorded crimes series
  const crimesSeries: Series[] = data
    ? [
        {
          id: 'crimes',
          label: 'Crimes recorded',
          colour: '#E63946',
          data: data.national.policeCrimes.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.crimesThousands,
          })),
        },
      ]
    : [];

  const crimeAnnotations: Annotation[] = [
    {
      date: new Date(2015, 5, 1),
      label: '2015: Coercive control criminalised',
    },
    {
      date: new Date(2021, 5, 1),
      label: '2021: Domestic Abuse Act',
    },
  ];

  // ── Metrics ──────────────────────────────────────────────────────────────

  const victimsMetric = data && {
    label: 'Domestic abuse victims per year',
    value: '2.4M',
    unit: '',
    direction: 'flat' as const,
    polarity: 'up-is-bad' as const,
    changeText: '2022/23 · CSEW · 1.4M women, 750K men · Only 18% report to police · 1 in 4 women affected in lifetime',
    sparklineData: [2.3, 2.4, 2.2, 2.3, 2.5, 2.4, 2.3, 2.4],
    onExpand: () => {},
  };

  const chargeMetric = data && {
    label: 'Domestic abuse crimes charged',
    value: '6%',
    unit: '',
    direction: 'down' as const,
    polarity: 'up-is-good' as const,
    changeText: '2022/23 · Down from 14% in 2015 · 900K DA crimes recorded · 54K charged · Evidence gap and victim withdrawal',
    sparklineData: [14, 13, 11, 10, 9, 8, 7, 6],
    onExpand: () => {},
  };

  const femicideMetric = data && {
    label: 'Women killed by partners/ex-partners',
    value: '76',
    unit: '',
    direction: 'flat' as const,
    polarity: 'up-is-bad' as const,
    changeText: '2022 · Femicide Census · 2 per week · 62% killed in own home · Male perpetrators: 95% of cases',
    sparklineData: [82, 79, 80, 76, 85, 79, 77, 76],
    onExpand: () => {},
  };

  return (
    <main>
      <TopicNav topic="Domestic Violence" />

      <div className="max-w-5xl mx-auto px-6 pt-12">
        <TopicHeader
          topic="Domestic Violence"
          question="How Many People Experience Domestic Abuse in Britain?"
          finding="2.4 million adults experienced domestic abuse in England and Wales in the year to March 2023. 76 women were killed by a partner or ex-partner in 2022. Only 6% of domestic abuse crimes result in a charge. 3,700 refuge spaces serve a population with 2× the estimated need."
          colour="#E63946"
        />
      </div>

      {/* Metrics row */}
      <section className="max-w-5xl mx-auto px-6 py-10 border-b border-wiah-border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {victimsMetric && <MetricCard {...victimsMetric} />}
          {chargeMetric && <MetricCard {...chargeMetric} />}
          {femicideMetric && <MetricCard {...femicideMetric} />}
        </div>
      </section>

      {/* Chart 1: Police recorded crimes */}
      <ScrollReveal>
        <section className="max-w-4xl mx-auto px-6 py-12 border-b border-wiah-border">
          {data && crimesSeries.length > 0 && (
            <LineChart
              title="Domestic abuse recorded by police, England &amp; Wales, 2013–2023"
              subtitle="Police recorded crime with domestic abuse flag. Figures include crimes, not just incidents."
              series={crimesSeries}
              annotations={crimeAnnotations}
              yLabel="Crimes recorded (thousands)"
              source={{
                name: 'Home Office',
                dataset: 'Crime outcomes in England and Wales',
                url: 'https://www.gov.uk/government/collections/crime-outcomes-in-england-and-wales-statistics',
                frequency: 'annual',
              }}
            />
          )}
        </section>
      </ScrollReveal>

      {/* Bar chart: Domestic abuse by type */}
      <ScrollReveal>
        <section className="max-w-4xl mx-auto px-6 py-12 border-b border-wiah-border">
          <h3 className="text-xl font-bold mb-2">Domestic abuse by type of abuse</h3>
          <p className="text-sm text-wiah-mid mb-6">Percentage of victims (some overlap)</p>
          {data && (
            <div className="space-y-3">
              {data.national.byType.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <div className="w-40 text-sm font-mono text-wiah-black">{item.type}</div>
                  <div className="flex-1 bg-wiah-light rounded h-8 relative" style={{ width: '100%' }}>
                    <div
                      className="bg-wiah-red h-full rounded"
                      style={{ width: `${item.pct}%` }}
                    />
                  </div>
                  <div className="w-12 text-right text-sm font-mono text-wiah-black">{item.pct}%</div>
                </div>
              ))}
            </div>
          )}
          <p className="text-xs text-wiah-mid mt-6 font-mono">
            Source: Crime Survey for England and Wales, ONS
          </p>
        </section>
      </ScrollReveal>

      {/* Positive callout */}
      <ScrollReveal>
        <PositiveCallout
          title="What's improving"
          value="2021"
          unit="Domestic Abuse Act — landmark legislation creating a statutory definition and strengthening protections"
          description="The Domestic Abuse Act 2021 created a statutory definition of domestic abuse for the first time, including economic abuse and post-separation abuse. It established the Domestic Abuse Commissioner role (currently Nicole Jacobs), created new Domestic Abuse Protection Orders (DAPOs), extended stalking protection, and placed local authorities under a duty to provide accommodation-based support. The Act also made it illegal to cross-examine victims directly in court. Coercive and controlling behaviour had been criminalised under the Serious Crime Act 2015 — now an offence carrying up to 5 years in prison."
          source="Source: ONS — Domestic abuse in England and Wales overview, November 2023; Home Office — Crime outcomes 2022/23."
        />
      </ScrollReveal>

      {/* Editorial context */}
      <section className="max-w-2xl mx-auto px-6 py-12 border-b border-wiah-border text-wiah-black">
        <div className="text-base leading-[1.7] space-y-4">
          <p>
            The Crime Survey for England and Wales found 2.4 million adults experienced domestic abuse in the year to March 2023 — yet only 18% of incidents are reported to police. The Femicide Census recorded 76 women killed by a male partner or ex-partner in 2022, with an average of 12 prior police contacts before the fatal incident. Of over 900,000 domestic abuse crimes recorded in 2022/23, only 6% resulted in a charge — down from 14% in 2015. Victim withdrawal accounts for 48% of discontinued cases.
          </p>

          <p>
            The Domestic Abuse Act 2021 introduced new protections, but infrastructure lags far behind. England has roughly 3,700 refuge beds — half the 7,400 the Istanbul Convention requires. Women's Aid reports 18,000 refuge requests were declined in 2022/23. Multi-Agency Risk Assessment Conferences (MARACs) handled 88,000 high-risk referrals, 70% involving repeat victims — evidence that intervention is coming too late.
          </p>
        </div>
      </section>

      {/* Sources */}
      <section className="max-w-3xl mx-auto px-6 py-12 border-b border-wiah-border">
        <h2 className="text-lg font-bold mb-6">Sources &amp; Methodology</h2>
        {data && (
          <div className="space-y-4">
            {data.metadata.sources.map((source, idx) => (
              <div key={idx} className="text-sm text-wiah-mid font-mono">
                <p className="font-semibold text-wiah-black mb-1">{source.name}</p>
                <p>{source.dataset}</p>
                <p>
                  <a href={source.url} className="text-wiah-blue hover:underline">
                    {source.url}
                  </a>
                </p>
                <p>Updated {source.frequency}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Footer nav */}
      <SectionNav sections={[
        { id: 'crimes', label: 'Police recorded crime' },
        { id: 'types', label: 'Types of abuse' },
        { id: 'legislation', label: 'Legal protections' },
      ]} />
    </main>
  );
}
