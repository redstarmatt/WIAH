'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import PositiveCallout from '@/components/PositiveCallout';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

export default function TradeUnionsPage() {
  // Trade union membership 1979–2023 (millions) — selected years
  const membership = [
    13.0, 12.2, 11.6, 11.0, 10.5, 10.1, 9.8, 9.5, 9.1, 8.8,
    8.6, 8.3, 8.0, 7.8, 7.5, 7.3, 7.1, 7.0, 6.9, 6.7,
    6.5, 6.5, 6.4, 6.4, 6.3, 6.3, 6.2, 6.2, 6.2, 6.2,
    6.2, 6.3, 6.3, 6.4, 6.3, 6.4, 6.4, 6.4, 6.4, 6.5,
    6.6, 6.4, 6.4, 6.4, 6.4,
  ];

  // Working days lost to industrial action 2010–2023 (millions)
  const strikeDays = [0.37, 1.39, 0.25, 0.44, 0.79, 0.17, 0.32, 0.33, 0.23, 0.27, 1.38, 0.56, 2.47, 4.08];

  // Union density 2010–2023 (%)
  const unionDensity = [26.6, 26.0, 25.8, 25.6, 25.0, 24.7, 23.5, 23.2, 23.4, 23.5, 23.1, 23.1, 22.3, 22.3];

  const series1: Series[] = [
    {
      id: 'membership',
      label: 'Trade union membership (millions)',
      colour: '#6B7280',
      data: membership.map((v, i) => ({ date: new Date(1979 + i, 0, 1), value: v })),
    },
  ];

  const series2: Series[] = [
    {
      id: 'strike-days',
      label: 'Working days lost to strikes (millions)',
      colour: '#E63946',
      data: strikeDays.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
    },
  ];

  const annotations1: Annotation[] = [
    { date: new Date(1980, 0, 1), label: "1980: Thatcher's Employment Acts begin" },
    { date: new Date(1984, 0, 1), label: '1984–85: Miners strike' },
    { date: new Date(2016, 0, 1), label: '2016: Trade Union Act — 50% turnout threshold' },
  ];

  const annotations2: Annotation[] = [
    { date: new Date(2022, 0, 1), label: '2022–23: Rail, health, postal strikes' },
    { date: new Date(2023, 0, 1), label: '2023: Biggest wave in 30 years' },
  ];

  return (
    <>
      <TopicNav topic="Trade Unions" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Trade Unions"
          question="Are Trade Unions Making a Comeback?"
          finding="Trade union membership fell from 13 million in 1979 to 6.4 million in 2023 — but union density has stabilised at 22% and the 2022-23 wave of strikes was the largest in 30 years."
          colour="#6B7280"
          preposition="on"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Trade union membership peaked in the UK at around 13 million in 1979 — the year Margaret Thatcher came to power — and fell steeply through the 1980s and 1990s as deindustrialisation wiped out the union heartlands of mining, steel, shipbuilding and manufacturing, and successive Employment Acts restricted unions' legal powers. By 2023, membership had stabilised at around 6.4 million, representing 22.3% of all employees — a figure that has been remarkably stable since around 2000, suggesting the structural decline may have bottomed out.</p>
            <p>The composition of union membership has shifted profoundly. The public sector is now the heartland: around 49% of public sector workers are union members, compared to just 12% in the private sector. Unions are strongest in education (52% density), public administration (51%), and health (43%). The fastest-growing sector — gig economy platform work — has almost no union presence, raising fundamental questions about whether the 20th-century union model can adapt to 21st-century employment.</p>
            <p>The 2022–23 wave of strikes — involving Royal Mail, rail workers, nurses, teachers, junior doctors, and civil servants — produced 4 million working days lost in 2023, the highest since 1989. The strikes were driven by real-terms pay cuts from a combination of multi-year pay freezes and high inflation. The government's response included the Strikes (Minimum Service Levels) Act 2023, which allows employers to require a minimum level of service during strikes in certain sectors — condemned by unions as an attack on the right to strike.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-membership', label: 'Membership' },
          { id: 'sec-strikes', label: 'Strike action' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Union membership (millions)"
            value="6.4"
            direction="down"
            polarity="neutral"
            changeText="2023 · Down from 13m in 1979 · Stable since 2000 · Public sector 49%, private 12%"
            sparklineData={[6.9, 6.7, 6.5, 6.5, 6.4, 6.4, 6.3, 6.3, 6.2, 6.2, 6.2, 6.3, 6.3, 6.4, 6.3, 6.4, 6.4, 6.4, 6.4, 6.5, 6.6, 6.4, 6.4, 6.4, 6.4]}
            source="BEIS — Trade Union Statistics 2023"
          />
          <MetricCard
            label="Union density (%)"
            value="22.3%"
            direction="flat"
            polarity="neutral"
            changeText="2023 · Stable since 2000 · Public sector 49% · Private sector 12% · Gig economy near zero"
            sparklineData={[26.6, 26.0, 25.8, 25.6, 25.0, 24.7, 23.5, 23.2, 23.4, 23.5, 23.1, 23.1, 22.3, 22.3]}
            source="BEIS — Trade Union Statistics 2023"
          />
          <MetricCard
            label="Working days lost to strikes (millions)"
            value="4.08"
            direction="up"
            polarity="neutral"
            changeText="2023 · Highest since 1989 · Rail, health, postal, education · Real-pay cuts driving action"
            sparklineData={[0.37, 1.39, 0.25, 0.44, 0.79, 0.17, 0.32, 0.33, 0.23, 0.27, 1.38, 0.56, 2.47, 4.08]}
            source="ONS — Labour Disputes Statistics 2023"
          />
        </div>

        <ScrollReveal>
          <section id="sec-membership" className="mb-12">
            <LineChart
              title="Trade union membership, 1979–2023 (millions)"
              subtitle="Membership fell from 13 million in 1979 to below 6.4 million — driven by deindustrialisation, legislative restrictions, and the shift to service-sector employment. Stable since ~2000."
              series={series1}
              annotations={annotations1}
              yLabel="Members (millions)"
              source={{
                name: 'BEIS / DBIS',
                dataset: 'Trade Union Statistics',
                frequency: 'annual',
                url: 'https://www.gov.uk/government/statistics/trade-union-statistics-2023',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-strikes" className="mb-12">
            <LineChart
              title="Working days lost to industrial action, 2010–2023 (millions)"
              subtitle="Strike activity was historically low from 2010 to 2021. The 2022–23 wave — rail, NHS, postal, education — produced the highest strike levels since 1989. Driven by real-terms pay cuts from inflation."
              series={series2}
              annotations={annotations2}
              yLabel="Days lost (millions)"
              source={{
                name: 'ONS',
                dataset: 'Labour Disputes — Working days lost',
                frequency: 'annual',
                url: 'https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/workplacedisputesandworkingconditions',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="What's stabilising"
            value="49%"
            unit="of public sector workers are union members"
            description="After four decades of decline, union density has stabilised and in some sectors is recovering. Young workers in the public sector are joining unions at comparable rates to older workers — breaking a long trend of generational decline. New organising campaigns in previously un-unionised sectors (Amazon warehouses, Deliveroo riders, Netflix productions) have won recognition in some workplaces. The 2022–23 strikes, while disruptive, ultimately produced pay settlements that partially offset inflation for workers in the NHS, rail and education — demonstrating that collective bargaining still works."
            source="Source: BEIS — Trade Union Statistics 2023; TUC — Unions in 2023 report."
          />
        </ScrollReveal>

        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p><a href="https://www.gov.uk/government/statistics/trade-union-statistics-2023" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">BEIS — Trade Union Statistics</a> — membership, density by sector. Annual.</p>
            <p><a href="https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/workplacedisputesandworkingconditions" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ONS — Labour Disputes</a> — working days lost, workers involved. Annual.</p>
            <p>Membership figures from Certification Officer returns; density calculated as members as % of employees (Labour Force Survey). Working days lost are provisional for the most recent year and subject to revision.</p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
