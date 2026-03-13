'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import PositiveCallout from '@/components/PositiveCallout';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

export default function InWorkPovertyPage() {
  const inWorkPovertyRate = [14.2, 14.5, 14.8, 15.1, 15.4, 15.8, 16.2, 16.5, 16.8, 17.0, 17.3, 17.5, 17.8, 18.0];
  const lowPaidWorkers   = [4.5, 4.6, 4.7, 4.8, 4.9, 5.0, 5.1, 5.2, 5.3, 5.3, 5.2, 5.1, 4.9, 4.8];

  const chart1Series: Series[] = [
    {
      id: 'inwork-poverty-rate',
      label: 'In-work poverty rate (%)',
      colour: '#F4A261',
      data: inWorkPovertyRate.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
    },
  ];

  const chart2Series: Series[] = [
    {
      id: 'low-paid-workers',
      label: 'Low-paid workers (millions, below real living wage)',
      colour: '#E63946',
      data: lowPaidWorkers.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
    },
  ];

  const chart1Annotations: Annotation[] = [
    { date: new Date(2015, 0, 1), label: '2015: National Living Wage introduced' },
    { date: new Date(2020, 0, 1), label: '2020: Covid furlough scheme' },
  ];

  const chart2Annotations: Annotation[] = [
    { date: new Date(2016, 0, 1), label: '2016: Real Living Wage campaign expands' },
    { date: new Date(2022, 0, 1), label: '2022: Cost of living crisis' },
  ];

  return (
    <>
      <TopicNav topic="In-Work Poverty" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="In-Work Poverty"
          question="Why Are Working People Still Poor?"
          finding="4 million workers live in poverty — 60% of people in poverty are in working households — driven by low pay, insecure hours, and rising housing costs."
          colour="#F4A261"
          preposition="with"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Key metrics' },
          { id: 'sec-chart1', label: 'Poverty rate' },
          { id: 'sec-chart2', label: 'Low pay' },
        ]} />

        <section id="sec-metrics" className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Workers in poverty (millions)"
              value="4.0"
              direction="up"
              polarity="up-is-bad"
              changeText="up from 2.8m in 2010 · 60% of all poverty is in-work"
              sparklineData={[2.8, 3.0, 3.2, 3.4, 3.6, 3.8, 4.0]}
              source="Joseph Rowntree Foundation — 2024"
            />
            <MetricCard
              label="In-work poverty rate (%)"
              value="18"
              direction="up"
              polarity="up-is-bad"
              changeText="up from 14% in 2010 · highest on record"
              sparklineData={[14, 15, 15, 16, 16, 17, 18]}
              source="DWP Households Below Average Income — 2024"
            />
            <MetricCard
              label="Low-paid jobs (% below real living wage)"
              value="17"
              direction="down"
              polarity="up-is-bad"
              changeText="down from 21% in 2012 · but still 4.8m workers"
              sparklineData={[21, 20, 19, 18, 18, 17, 17]}
              source="Resolution Foundation — 2024"
            />
          </div>
        </section>

        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="In-work poverty rate, UK 2010–2024 (%)"
              subtitle="Share of workers in households below 60% of median income after housing costs. Source: DWP Households Below Average Income."
              series={chart1Series}
              annotations={chart1Annotations}
              yLabel="In-work poverty rate (%)"
              source={{
                name: 'DWP / Joseph Rowntree Foundation',
                dataset: 'Households Below Average Income — in-work poverty rate',
                frequency: 'annual',
                url: 'https://www.gov.uk/government/collections/households-below-average-income-hbai--2',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Low-paid workers, UK 2010–2024 (millions, below real living wage)"
              subtitle="Workers earning below the Real Living Wage set by the Living Wage Foundation. Source: Resolution Foundation."
              series={chart2Series}
              annotations={chart2Annotations}
              yLabel="Low-paid workers (millions)"
              source={{
                name: 'Resolution Foundation / Living Wage Foundation',
                dataset: 'Low-paid workers below Real Living Wage',
                frequency: 'annual',
                url: 'https://www.resolutionfoundation.org',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="What has improved"
            value="National Living Wage"
            unit="2015–2024"
            description="The National Living Wage has risen from £6.50 in 2015 to £11.44 in 2024 — a 76% increase, above inflation for most of that period. The share of workers paid below the Real Living Wage has fallen from around 21% to 17%. Combined with the Universal Credit taper rate cut in 2021, work incentives have strengthened. But housing costs, insecure hours, and the two-child benefit limit mean millions of workers remain below the poverty line despite being in employment."
            source="Source: DWP Households Below Average Income 2024; Resolution Foundation; Living Wage Foundation."
          />
        </ScrollReveal>

        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The data on in-work poverty</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>For decades, full-time employment was treated as the primary route out of poverty. That assumption no longer holds. Today, more than 60% of people living in poverty in the UK are in working households — a structural shift driven by the growth of low-paid, insecure, and part-time work alongside soaring housing costs that absorb an ever-larger share of wages.</p>
              <p>The in-work poverty rate has risen from around 14% in 2010 to 18% by 2024. The National Living Wage, introduced in 2015 and raised annually since, has helped — the share of workers below the Real Living Wage has fallen from a peak of around 21% to 17%. But wage floors have not kept pace with housing costs. In high-cost cities, workers on the legal minimum can spend more than 40% of their income on rent alone.</p>
              <p>Low-paid work is not evenly distributed. Women, ethnic minorities, and workers in hospitality, retail, and social care are disproportionately represented. Part-time and zero-hours arrangements concentrate in the same sectors, meaning workers face both low hourly rates and unpredictable income — a combination that makes budgeting for essentials nearly impossible. Until housing costs are addressed alongside pay, work alone will not end poverty.</p>
            </div>
          </section>
        </ScrollReveal>

        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p><a href="https://www.gov.uk/government/collections/households-below-average-income-hbai--2" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DWP — Households Below Average Income</a> — primary data source for in-work poverty rate. Annual series. Retrieved 2024.</p>
            <p><a href="https://www.jrf.org.uk/uk-poverty-2024-the-essential-guide-to-understanding-poverty-in-the-uk" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Joseph Rowntree Foundation — UK Poverty 2024</a> — in-work poverty headcount and analysis. Retrieved 2024.</p>
            <p><a href="https://www.resolutionfoundation.org" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Resolution Foundation</a> — low-pay analysis and Real Living Wage comparisons. Retrieved 2024.</p>
            <p>In-work poverty is defined as individuals in households with at least one working adult living below 60% of median household income after housing costs. All figures are for the UK unless otherwise stated.</p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
