'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import PositiveCallout from '@/components/PositiveCallout';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

export default function NeetYoungPeoplePage() {
  // Chart 1: NEET rate for 16-24 year olds 2010-2024 (%)
  const neetRateData = [16.5, 17.0, 16.4, 15.8, 15.2, 14.6, 13.9, 13.2, 12.8, 12.5, 13.8, 13.1, 12.9, 12.7, 12.6];
  const neetSeries: Series[] = [
    {
      id: 'neet-rate',
      label: 'NEET rate 16-24 (%)',
      colour: '#E63946',
      data: neetRateData.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
    },
  ];
  const neetAnnotations: Annotation[] = [
    { date: new Date(2013, 0, 1), label: '2013: Participation age raised to 17' },
    { date: new Date(2015, 0, 1), label: '2015: Participation age raised to 18' },
    { date: new Date(2020, 0, 1), label: '2020: COVID-19 spike' },
  ];

  // Chart 2: NEET by reason and age group 2019-2024
  const neet1620Data = [6.8, 6.5, 7.2, 6.9, 6.7, 6.5];
  const neet2124Data = [15.2, 14.8, 16.4, 15.8, 15.2, 14.9];
  const longTermNeetData = [3.2, 3.0, 3.6, 3.4, 3.2, 3.1];
  const reasonSeries: Series[] = [
    {
      id: 'neet-21-24',
      label: 'NEET rate 21-24 (%)',
      colour: '#E63946',
      data: neet2124Data.map((v, i) => ({ date: new Date(2019 + i, 0, 1), value: v })),
    },
    {
      id: 'neet-16-20',
      label: 'NEET rate 16-20 (%)',
      colour: '#F4A261',
      data: neet1620Data.map((v, i) => ({ date: new Date(2019 + i, 0, 1), value: v })),
    },
    {
      id: 'long-term',
      label: 'Long-term NEET 12+ months (%)',
      colour: '#6B7280',
      data: longTermNeetData.map((v, i) => ({ date: new Date(2019 + i, 0, 1), value: v })),
    },
  ];

  return (
    <>
      <TopicNav topic="NEET Young People" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="NEET Young People"
          question="How Many Young People Are NEET?"
          finding="12.6% of 16-24 year olds are NEET — not in education, employment or training — with the figure highest in coastal and ex-industrial towns, and 40% of NEETs have a disability or health condition."
          colour="#E63946"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Key figures' },
          { id: 'sec-trend', label: 'NEET trend' },
          { id: 'sec-breakdown', label: 'By age group' },
          { id: 'sec-context', label: 'Context' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <section id="sec-metrics" className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="NEET rate 16-24"
              value="12.6%"
              direction="down"
              polarity="down-is-bad"
              changeText="849,000 young people · down from 17% in 2011"
              sparklineData={[16.5, 17.0, 16.4, 15.2, 13.9, 12.8, 13.8, 12.9, 12.7, 12.6]}
              source="ONS — NEET Statistics Quarterly Brief, Q4 2024"
            />
            <MetricCard
              label="NEET count"
              value="849,000"
              direction="down"
              polarity="down-is-bad"
              changeText="16-24 year olds not in education, employment or training"
              sparklineData={[1040, 1020, 960, 870, 790, 750, 810, 780, 760, 849]}
              source="ONS — NEET Statistics Quarterly Brief, Q4 2024"
            />
            <MetricCard
              label="Long-term NEET 12+ months"
              value="210,000"
              direction="up"
              polarity="up-is-bad"
              changeText="25% of all NEETs · disability or health most common reason"
              sparklineData={[180, 185, 190, 200, 195, 210, 220, 215, 212, 210]}
              source="ONS — NEET Statistics / DWP Labour Market Statistics, 2024"
            />
          </div>
        </section>

        <ScrollReveal>
          <section id="sec-trend" className="mb-12">
            <LineChart
              title="NEET rate for 16-24 year olds, UK, 2010–2024 (%)"
              subtitle="Percentage of 16-24 year olds not in education, employment or training. Falls reflect compulsory participation age rises to 17 (2013) and 18 (2015) in England."
              series={neetSeries}
              annotations={neetAnnotations}
              yLabel="NEET rate (%)"
              source={{
                name: 'Office for National Statistics',
                dataset: 'NEET Statistics Quarterly Brief',
                frequency: 'quarterly',
                url: 'https://www.gov.uk/government/collections/statistics-neet',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-breakdown" className="mb-12">
            <LineChart
              title="NEET rate by age group and long-term NEET, 2019–2024 (%)"
              subtitle="21-24 year olds have a much higher NEET rate than 16-20 year olds. Long-term NEET (12+ months) represents a particularly entrenched group with complex barriers to participation."
              series={reasonSeries}
              yLabel="NEET rate (%)"
              source={{
                name: 'ONS / Department for Education',
                dataset: 'NEET Statistics — age breakdown',
                frequency: 'quarterly',
                url: 'https://www.gov.uk/government/collections/statistics-neet',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="Integrated Support Works"
            value="Youth Hubs"
            description="Youth Hubs — co-located services combining employment support, mental health, housing advice and skills provision — have shown promising results in areas where they operate. Evidence from the Department for Work and Pensions and National Careers Service suggests that integrated support is more effective than single-service referrals for young people with complex NEET barriers."
            source="Department for Work and Pensions, Youth Hubs Programme"
          />
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-context" className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The data on NEET young people</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>Around 849,000 young people aged 16-24 in the UK are NEET — not in education, employment or training. The rate has fallen substantially from a peak of 17% in 2011, partly through compulsory participation age rises that moved 16 and 17 year olds into education, and partly through employment growth in the preceding decade. But 12.6% remains a significant proportion of young people outside any pathway, and the fall has stalled. Among 21-24 year olds — no longer covered by the participation age requirement — the rate is closer to 15%.</p>
              <p>The geography of NEET is deeply uneven. Coastal communities, former mining areas, and post-industrial towns in the North East, South Wales, and parts of the Midlands have NEET rates two to three times the rates in London and the South East. These are not random distributional effects: they reflect the long legacy of deindustrialisation, the concentration of low-skill employment, and the relative absence of further education and employment support infrastructure. Young people in these areas face structural barriers that individual motivation or resilience cannot overcome.</p>
              <p>Around 40% of long-term NEETs have a disability or health condition — a proportion that has grown as mental health conditions have become a more significant driver of economic inactivity across all age groups. For these young people, the barrier to participation is not a lack of jobs or places on courses but the absence of appropriate support to access them. Inadequate SEND support, long CAMHS waits, and gaps in supported employment provision all contribute. The cost to the public finances of long-term NEET is substantial: the Social Mobility Commission estimates a lifetime fiscal cost of £56,000 per young person who remains NEET beyond 12 months.</p>
            </div>
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p><a href="https://www.gov.uk/government/collections/statistics-neet" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Department for Education / ONS</a> — NEET Statistics Quarterly Brief. Published quarterly. Based on the Labour Force Survey. Covers 16-24 year olds in the UK.</p>
            <p>Long-term NEET figures (12+ months) are derived from DWP longitudinal analysis and DfE NEET statistics. The 40% disability/health condition figure is from the ONS Outcomes for young people in education, employment and training series.</p>
            <p>NEET definition: not in full or part-time education, not in employment (paid or self-employed), not on an apprenticeship or traineeship. The compulsory participation age in England rose to 17 in 2013 and 18 in 2015, affecting comparability of pre- and post-reform figures.</p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
