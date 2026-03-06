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

interface WaitingListPoint {
  year: number;
  householdsThousands: number;
}

interface CompletionsPoint {
  year: number;
  completionsThousands: number;
}

interface RightToBuyPoint {
  year: number;
  salesThousands: number;
}

interface StockPoint {
  year: number;
  socialStockMillions: number;
}

interface SocialHousingData {
  national: {
    waitingList: {
      timeSeries: WaitingListPoint[];
      latestYear: number;
      latestThousands: number;
      note: string;
    };
    socialHomesBuilt: {
      timeSeries: CompletionsPoint[];
      latestYear: number;
      latestThousands: number;
      note: string;
    };
    rightToBuy: {
      timeSeries: RightToBuyPoint[];
      latestYear: number;
      latestThousands: number;
      totalSoldSince1980Millions: number;
    };
    socialHousingStock: {
      timeSeries: StockPoint[];
      latestYear: number;
      latestMillions: number;
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

export default function SocialHousingPage() {
  const [data, setData] = useState<SocialHousingData | null>(null);

  useEffect(() => {
    fetch('/data/social-housing/social_housing.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const completionsSeries: Series[] = data
    ? [{
        id: 'completions',
        label: 'Social rented homes completed',
        colour: '#264653',
        data: data.national.socialHomesBuilt.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.completionsThousands,
        })),
      }]
    : [];

  const waitingListSeries: Series[] = data
    ? [{
        id: 'waitingList',
        label: 'Households on waiting list',
        colour: '#F4A261',
        data: data.national.waitingList.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.householdsThousands,
        })),
      }]
    : [];

  const completionsAnnotations: Annotation[] = [
    { date: new Date(2010, 5, 1), label: '2010: 39,500 completions' },
    { date: new Date(2023, 5, 1), label: '2023: 7,500 completions (17-year low)' },
  ];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Social Housing" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Social Housing"
          question="Why Is Social Housing Disappearing?"
          finding="Only 7,500 social rent homes were built in 2023 &mdash; a 17-year low. 1.29 million households are on waiting lists. Since 1980, 1.8 million council homes have been sold under Right to Buy. The social housing stock has shrunk from 4.8 million to 4.0 million."
          colour="#264653"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              England completed 7,500 social rented homes in 2023 &mdash; the lowest annual total since the 1920s and an 81% collapse from 39,500 in 2010. Against that trickle of supply, 1.29 million households sit on council waiting lists, up from 1.14 million in 2018. The supply-to-waiting ratio is roughly 1:170: for every new social let, 170 households queue. Lists did fall between 2013 and 2018, from 1.73 million to 1.14 million, but only because councils tightened eligibility &mdash; not because need shrank. Rough sleeping reached 4,255 and over 100,000 households were in temporary accommodation, confirming that underlying demand never stopped growing.
            </p>
            <p>
              Right to Buy has removed 1.8 million council homes from the social stock since 1980, with discounts of up to 70% of market value. In 2012 the government raised the maximum discount from &pound;75,000 to &pound;96,000, accelerating sales further. Replacement has run at approximately one new social home for every eight sold &mdash; a cumulative shortfall exceeding 1.5 million units. In the worst London boroughs the ratio is 1:31. Labour has proposed mandatory one-for-one replacement with receipts retained locally, but the measure has not yet been legislated and the structural deficit widens each year.
            </p>
            </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-completions', label: 'Supply' },
          { id: 'sec-waiting', label: 'Waiting List' },
          { id: 'sec-rtb', label: 'Right to Buy' },
        ]} />

        {/* Metric cards */}
        <ScrollReveal>
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Social homes built (England)"
            value="7,500"
            unit=""
            direction="down"
            polarity="up-is-good"
            changeText="2023 · Down from 39,500 in 2010 · Lowest since 1920s · 1.29M households waiting"
            sparklineData={[39.5, 46.4, 42.2, 31.4, 30.9, 26.8, 28.1, 27.5, 22.8, 16.9, 17.6, 10.2, 7.5, 7.5]}
            onExpand={() => {}}
          />
          <MetricCard
            label="Households on social housing waiting list"
            value="1.29M"
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText="2023 · Up from 1.14M in 2018 · Eligibility tightened but underlying need rising"
            sparklineData={[1730, 1450, 1310, 1220, 1160, 1140, 1160, 1200, 1230, 1260, 1290]}
            onExpand={() => {}}
          />
          <MetricCard
            label="Council homes sold (Right to Buy)"
            value="8,400"
            unit=""
            direction="flat"
            polarity="up-is-bad"
            changeText="2023 · 1.8M sold since 1980 · 1:8 replacement ratio · Labour reviewing the scheme"
            sparklineData={[2.7, 11.0, 12.3, 13.5, 12.0, 11.3, 11.5, 9.8, 7.4, 9.0, 11.8, 8.4]}
            onExpand={() => {}}
          />
        </div>
        </ScrollReveal>

        {/* Charts */}
        <ScrollReveal>
        <section id="sec-completions" className="mb-12">
          <LineChart
            title="Social rent homes completed, England, 2010&ndash;2023"
            subtitle="New social rented homes completed per year. Fell from 39,500 in 2010 to 7,500 in 2023 &mdash; the lowest level since the 1920s. Driven by funding cuts, Right to Buy sales, and housing association capacity constraints."
            series={completionsSeries}
            annotations={completionsAnnotations}
            yLabel="Thousands"
          />
        </section>
        </ScrollReveal>

        <ScrollReveal>
        <section id="sec-waiting" className="mb-12">
          <LineChart
            title="Households on social housing waiting list, England, 2013&ndash;2023"
            subtitle="Households registered for social housing. Fell 2013-2018 as councils tightened eligibility, then rose again as homelessness and temporary accommodation pressures mounted."
            series={waitingListSeries}
            annotations={[]}
            yLabel="Thousands"
          />
        </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
        <PositiveCallout
          title="What&apos;s improving"
          value="&pound;11.5bn"
          unit="Affordable Homes Programme 2021&ndash;26"
          description="The Affordable Homes Programme 2021&ndash;26 has a &pound;11.5 billion budget targeting 180,000 new affordable homes. Labour&apos;s National Planning Policy Framework reforms require councils to prioritise social rent homes in planning decisions. The government has committed to a Renters&apos; Rights Bill to strengthen tenant protections and abolish no-fault Section 21 evictions. Shared ownership and First Homes schemes provide alternative routes to housing for those who cannot access either private ownership or social rent."
          source="Source: MHCLG &mdash; Affordable housing supply 2022/23 and Homes England programme statistics."
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
