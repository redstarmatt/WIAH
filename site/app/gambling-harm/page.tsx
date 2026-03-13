'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import PositiveCallout from '@/components/PositiveCallout';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

export default function GamblingHarmPage() {
  const colour = '#E63946';

  // Online vs offline gambling gross yield 2015–2024 (£bn)
  const onlineData =  [4.4, 4.9, 5.5, 6.1, 6.9, 7.6, 6.8, 7.9, 8.7, 9.4];
  const offlineData = [9.8, 9.9, 10.2, 10.4, 10.1, 10.0, 5.8, 8.9, 9.2, 9.3];

  const yieldAnnotations: Annotation[] = [
    { date: new Date(2020, 0, 1), label: '2020: COVID closes betting shops' },
    { date: new Date(2023, 0, 1), label: '2023: Gambling Act White Paper' },
  ];

  const yieldSeries: Series[] = [
    {
      id: 'online',
      label: 'Online gambling gross yield (£bn)',
      colour: colour,
      data: onlineData.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
    {
      id: 'offline',
      label: 'Offline/land-based gross yield (£bn)',
      colour: '#6B7280',
      data: offlineData.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
  ];

  // Problem gambling rate 2010–2024 (%)
  const problemGamblingData = [0.9, 0.7, 0.8, 0.5, 0.5, 0.7, 0.8, 0.5, 0.4, 0.3, 0.5, 0.4, 0.3, 0.4, 0.5];

  const problemRateSeries: Series[] = [
    {
      id: 'problem-rate',
      label: 'Problem gambling rate (%)',
      colour: colour,
      data: problemGamblingData.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
    },
  ];

  const problemRateAnnotations: Annotation[] = [
    { date: new Date(2019, 0, 1), label: '2019: FOBT stakes cut to £2' },
    { date: new Date(2023, 0, 1), label: '2023: White Paper reforms' },
  ];

  return (
    <>
      <TopicNav topic="Gambling Harm" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Gambling Harm"
          question="How Widespread is Gambling Harm?"
          finding="Around 300,000 people in Britain are problem gamblers, and up to 1.4 million are at-risk — online gambling has grown to 40% of the market, making harm harder to detect."
          colour={colour}
          preposition="with"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Overview' },
          { id: 'sec-yield', label: 'Online vs Offline' },
          { id: 'sec-rate', label: 'Problem Gambling Rate' },
        ]} />

        <section id="sec-metrics" className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Problem gamblers (thousands)"
              value="300"
              direction="flat"
              polarity="up-is-bad"
              changeText="2024 · 0.5% of adult population · PGSI score 8+ · estimated from surveys"
              sparklineData={[430, 340, 370, 230, 230, 320, 370, 230, 185, 140, 230, 185, 140, 185, 230]}
              source="Gambling Commission — Gambling Survey for Great Britain, 2024"
            />
            <MetricCard
              label="At-risk gamblers (millions)"
              value="1.4"
              direction="up"
              polarity="up-is-bad"
              changeText="2024 · PGSI score 3–7 · vulnerable to harm · difficult to identify"
              sparklineData={[1.1, 1.0, 1.1, 0.9, 0.9, 1.0, 1.1, 1.0, 0.9, 0.9, 1.1, 1.1, 1.2, 1.3, 1.4]}
              source="Gambling Commission — Gambling Survey for Great Britain, 2024"
            />
            <MetricCard
              label="Online gambling share of total market (%)"
              value="50"
              direction="up"
              polarity="up-is-bad"
              changeText="2024 · up from 31% in 2015 · harder to detect and intervene on harm"
              sparklineData={[31, 33, 35, 37, 41, 43, 54, 47, 49, 50]}
              source="Gambling Commission — Industry Statistics, 2024"
            />
          </div>
        </section>

        <ScrollReveal>
          <section id="sec-yield" className="mb-12">
            <LineChart
              title="Online vs offline gambling gross yield, Great Britain, 2015–2024 (£bn)"
              subtitle="Gross gambling yield (GGY) is the amount retained by operators after paying out winnings. Online gambling has grown substantially while land-based gambling was hit hard by COVID-19 closures."
              series={yieldSeries}
              annotations={yieldAnnotations}
              yLabel="Gross yield (£bn)"
              source={{
                name: 'Gambling Commission',
                dataset: 'Industry Statistics',
                frequency: 'annual',
                url: 'https://www.gamblingcommission.gov.uk/statistics-and-research/publication/industry-statistics',
                date: 'Jan 2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-rate" className="mb-12">
            <LineChart
              title="Problem gambling rate, Great Britain, 2010–2024 (%)"
              subtitle="Percentage of adults scoring 8 or above on the Problem Gambling Severity Index (PGSI). Survey-based measure; actual prevalence may differ from official estimates."
              series={problemRateSeries}
              annotations={problemRateAnnotations}
              yLabel="Problem gambling rate (%)"
              source={{
                name: 'Gambling Commission',
                dataset: 'Gambling Survey for Great Britain',
                frequency: 'annual',
                url: 'https://www.gamblingcommission.gov.uk/statistics-and-research/publication/gambling-survey-for-great-britain',
                date: 'Jan 2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="Reforms underway"
            value="£100m"
            unit="statutory levy on gambling operators to fund research, education, and treatment — from 2024"
            description="The Gambling Act White Paper (2023) introduced the most significant reforms to gambling regulation in two decades. A statutory levy of up to 1% of operator turnover — around £100 million per year — replaced the voluntary system of contributions to research and treatment. Stake limits for online slots were set at £5 per spin for adults and £2 for under-25s. Affordability checks on high-spending customers were introduced. The Gambling Commission's enforcement powers were expanded. GamStop, the national self-exclusion scheme, has over 400,000 registered users."
            source="Source: DCMS — High Stakes: Gambling Reform for the Digital Age, 2023; Gambling Commission — Annual Report 2024."
          />
        </ScrollReveal>

        <ScrollReveal>
          <section className="max-w-2xl mb-12 mt-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">What the data shows</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>Around 300,000 people in Britain are problem gamblers — scoring 8 or above on the Problem Gambling Severity Index — and up to 1.4 million are classified as &ldquo;at-risk&rdquo;. The overall prevalence rate of around 0.5% has remained relatively stable, but the composition of harm has shifted dramatically. Online gambling now accounts for around 50% of total market yield, up from 31% in 2015. Online harms are structurally harder to detect: they occur in private, 24 hours a day, without the social context of a betting shop or casino where staff might intervene.</p>
              <p>The fixed-odds betting terminal (FOBT) crisis of the mid-2010s — machines in bookmakers where players could stake £100 every 20 seconds — mobilised a cross-party campaign that resulted in maximum stakes being cut from £100 to £2 in 2019. FOBTs were responsible for an estimated 40% of problem gambling presentations in treatment services at their peak. Their curtailment demonstrated that product design regulation can reduce harm; but as land-based play declined, online play accelerated, and the same vulnerable individuals followed the product.</p>
              <p>Treatment capacity remains deeply inadequate. The NHS has fourteen gambling treatment clinics — up from one in 2019 — but waiting times exceed three months in most areas. Only 2–3% of problem gamblers in England access any form of treatment in a given year. The voluntary levy system that funded research and treatment was chronically underfunded; the statutory levy introduced in 2024 should produce around £100 million annually, but the sector cautions it will take years to build adequate treatment infrastructure.</p>
            </div>
          </section>
        </ScrollReveal>

        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p><a href="https://www.gamblingcommission.gov.uk/statistics-and-research/publication/gambling-survey-for-great-britain" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Gambling Commission — Gambling Survey for Great Britain</a> — annual. Problem and at-risk gambling prevalence.</p>
            <p><a href="https://www.gamblingcommission.gov.uk/statistics-and-research/publication/industry-statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Gambling Commission — Industry Statistics</a> — annual. Market size, gross yield by sector.</p>
            <p><a href="https://www.gov.uk/government/publications/high-stakes-gambling-reform-for-the-digital-age" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DCMS — Gambling Act White Paper 2023</a></p>
            <p>Problem gambling = PGSI score 8+. At-risk = PGSI 3–7. Prevalence estimates are from survey data and carry sampling uncertainty. All figures are for Great Britain unless otherwise stated.</p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
