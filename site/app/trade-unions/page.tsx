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

interface TradeUnionsData {
  national: {
    membership: {
      timeSeries: Array<{ year: number; millionsMembers: number }>;
    };
    workingDaysLost: {
      timeSeries: Array<{ year: number; thousandsDays: number }>;
    };
  };
  metadata: {
    sources: Array<{ name: string; dataset: string; url: string; frequency: string }>;
    methodology: string;
    knownIssues: string[];
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function TradeUnionsPage() {
  const [data, setData] = useState<TradeUnionsData | null>(null);

  useEffect(() => {
    fetch('/data/trade-unions/trade_unions.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const membershipSeries: Series[] = data
    ? [{
        id: 'membership',
        label: 'Union membership (millions)',
        colour: '#264653',
        data: data.national.membership.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.millionsMembers,
        })),
      }]
    : [];

  const strikesSeries: Series[] = data
    ? [{
        id: 'working-days-lost',
        label: 'Working days lost (thousands)',
        colour: '#E63946',
        data: data.national.workingDaysLost.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.thousandsDays,
        })),
      }]
    : [];

  const strikeAnnotations: Annotation[] = [
    { date: yearToDate(2022), label: '2022: Rail, NHS, Royal Mail strikes' },
  ];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Trade Unions" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Trade Unions"
          question="What Has Happened to Collective Bargaining in Britain?"
          finding="Trade union membership stands at 6.73 million &mdash; less than half the 1979 peak of 13.2 million. Only 23% of UK workers are union members, one of the lowest rates in Western Europe. Yet the 2022&ndash;23 strike wave &mdash; 3.87 million working days lost, the highest since 1989 &mdash; showed that unions retain significant disruptive power in public services."
          colour="#264653"
          preposition="with"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Trade union membership stands at 6.73 million in 2024 &mdash; 23.1% of employees, less than half the 1979 peak of 13.2 million (55% density) and among the lowest rates in Western Europe. Private sector density is just 12% versus 50% in the public sector. The 2022&ndash;23 strike wave was the most significant industrial action in over 30 years: 3.87 million working days lost in 2023, the highest since 1989, as rail workers, nurses (the RCN&apos;s first strike in its 106-year history), junior doctors, postal workers, teachers, and civil servants all took action against real-terms pay cuts of 5&ndash;10% during peak CPI inflation of 11.1%. The Strikes (Minimum Service Levels) Act 2023 imposed new restrictions; the Labour government&apos;s Employment Rights Bill (2024) proposes repealing it and introducing sectoral fair pay agreements.</p>
            <p>Membership distribution reflects structural inequalities. Women (25.6%) are now more likely to be union members than men (20.4%), largely because women are concentrated in unionised public sector professions. Workers aged 16&ndash;24 have density of just 7%; those aged 50&ndash;59 have 28%. The lowest density sectors &mdash; accommodation and food services (3%), retail (10%) &mdash; are also the lowest-paid, creating a self-reinforcing cycle where the workers most exposed to precarious employment are the hardest to organise. The collapse of manufacturing from 7 million workers in 1980 to 2.6 million today removed the industrial base that sustained post-war union density.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-membership', label: 'Membership' },
          { id: 'sec-strikes', label: 'Strike Action' },
        ]} />

        <ScrollReveal>
          <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Trade union members"
              value="6.73M"
              direction="up"
              polarity="up-is-good"
              changeText="2024 &middot; 23% of employees &middot; Peak: 13.2M in 1979 &middot; Public sector: 50% vs private: 12%"
              sparklineData={[6.50, 6.23, 6.23, 6.35, 6.44, 6.56, 6.55, 6.54, 6.67, 6.73]}
              onExpand={() => {}}
            />
            <MetricCard
              label="Working days lost to strikes (2023)"
              value="3.87M"
              direction="up"
              polarity="up-is-bad"
              changeText="Highest since 1989 &middot; Rail, NHS, postal, teachers &middot; Driven by real-terms pay cuts &middot; 2024: 1.84M (declining)"
              sparklineData={[170, 322, 276, 273, 234, 231, 390, 2470, 3872, 1840]}
              onExpand={() => {}}
            />
            <MetricCard
              label="Private sector union density"
              value="12%"
              direction="down"
              polarity="up-is-good"
              changeText="2024 &middot; Accommodation &amp; food: 3% &middot; Retail: 10% &middot; Gig workers largely unorganised"
              sparklineData={[14.4, 14.0, 13.6, 13.4, 13.2, 12.8, 12.6, 12.4, 12.2, 12.0]}
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-membership" className="mb-12">
            <LineChart
              title="Trade union membership, UK, 2015&ndash;2024"
              subtitle="Total trade union members among UK employees (millions). Membership has stabilised after decades of decline."
              series={membershipSeries}
              yLabel="Millions"
              source={{
                name: 'BEIS / DBT',
                dataset: 'Trade Union Membership Statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-strikes" className="mb-12">
            <LineChart
              title="Working days lost to labour disputes, UK, 2015&ndash;2024"
              subtitle="Thousands of working days lost to strikes. The 2022&ndash;23 wave was the largest since 1989."
              series={strikesSeries}
              yLabel="Thousands"
              annotations={strikeAnnotations}
              source={{
                name: 'ONS',
                dataset: 'Labour Disputes in the UK',
                frequency: 'monthly',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="What&apos;s changing"
            value="+230K"
            unit="net increase in union membership since 2020 — first sustained growth in decades"
            description="Union membership has grown in four of the last five years, driven by new organising in hospitality, logistics, and the gig economy. The RCN&apos;s first-ever strike in 2022 resulted in a 5%+ pay award for nurses. The Employment Rights Bill proposes simplified recognition procedures and sectoral fair pay agreements. Community unions are organising gig workers, with the GMB winning a landmark employment status case against Uber. Young worker membership has grown 15% since 2020, driven by cost-of-living concerns."
            source="Source: BEIS/DBT &mdash; Trade Union Membership Statistics 2024; ONS &mdash; Labour Disputes 2024."
          />
        </ScrollReveal>

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
