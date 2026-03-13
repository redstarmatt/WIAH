'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import PositiveCallout from '@/components/PositiveCallout';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

export default function SocialHousingWaitingListsPage() {
  // Chart 1: Social housing waiting list 2010-2024 (millions of households)
  const waitingListData = [1.84, 1.79, 1.73, 1.67, 1.62, 1.18, 1.15, 1.16, 1.17, 1.21, 1.20, 1.21, 1.26, 1.28, 1.29];
  const waitingListSeries: Series[] = [
    {
      id: 'waiting-list',
      label: 'Households on social housing waiting list (millions)',
      colour: '#F4A261',
      data: waitingListData.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
    },
  ];
  const waitingAnnotations: Annotation[] = [
    { date: new Date(2012, 0, 1), label: '2012: Right to Buy extension · stock falls' },
    { date: new Date(2015, 0, 1), label: '2015: Eligibility reforms reduce register' },
    { date: new Date(2021, 0, 1), label: '2021: COVID drives demand surge' },
  ];

  // Chart 2: Social housing completions vs right-to-buy sales 2010-2024
  const completionsData = [32000, 31000, 27000, 25000, 24000, 23000, 22000, 22000, 24000, 30000, 29000, 28000, 26000, 24000, 22000];
  const rtbSalesData = [3700, 5940, 16020, 26010, 26100, 24470, 19120, 17610, 18780, 11040, 4920, 7900, 9480, 9310, 8500];
  const completionsSeries: Series[] = [
    {
      id: 'completions',
      label: 'Social housing completions per year',
      colour: '#2A9D8F',
      data: completionsData.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
    },
    {
      id: 'rtb',
      label: 'Right-to-Buy sales per year',
      colour: '#E63946',
      data: rtbSalesData.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
    },
  ];

  return (
    <>
      <TopicNav topic="Social Housing Waiting Lists" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Social Housing Waiting Lists"
          question="How Long Do People Wait for Social Housing?"
          finding="1.29 million households are on social housing waiting lists — with average waits exceeding 5 years in London — and social housing stock has fallen by 1.4 million since right-to-buy was extended."
          colour="#F4A261"
          preposition="on"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Key figures' },
          { id: 'sec-waitlist', label: 'Waiting list' },
          { id: 'sec-stock', label: 'Completions vs sales' },
          { id: 'sec-context', label: 'Context' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <section id="sec-metrics" className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Households on waiting list"
              value="1.29m"
              direction="up"
              polarity="up-is-bad"
              changeText="rising since 2015 reforms · London wait avg 5+ years"
              sparklineData={[1.84, 1.73, 1.62, 1.18, 1.15, 1.17, 1.20, 1.21, 1.26, 1.29]}
              source="DLUHC — Local Authority Housing Statistics, 2024"
            />
            <MetricCard
              label="Average wait for social housing"
              value="5+ years"
              direction="up"
              polarity="up-is-bad"
              changeText="London average · some families wait 10+ years"
              sparklineData={[2.5, 2.8, 3.0, 3.2, 3.5, 3.8, 4.2, 4.5, 4.9, 5.2]}
              source="Crisis / Shelter — Social Housing Research, 2024"
            />
            <MetricCard
              label="Social housing stock change since 1980"
              value="-1.4m"
              direction="down"
              polarity="down-is-bad"
              changeText="right-to-buy sales outpaced new build by 1.4 million homes"
              sparklineData={[-0.1, -0.3, -0.5, -0.7, -0.9, -1.0, -1.1, -1.2, -1.3, -1.4]}
              source="DLUHC — Live Tables on Social Housing Stock, 2024"
            />
          </div>
        </section>

        <ScrollReveal>
          <section id="sec-waitlist" className="mb-12">
            <LineChart
              title="Social housing waiting list, England, 2010–2024 (millions of households)"
              subtitle="Households on local authority housing registers at 1 April each year. The sharp fall in 2015 reflects eligibility reforms that removed households assessed as not in housing need."
              series={waitingListSeries}
              annotations={waitingAnnotations}
              yLabel="Households (millions)"
              source={{
                name: 'Department for Levelling Up, Housing and Communities',
                dataset: 'Local Authority Housing Statistics — waiting lists',
                frequency: 'annual',
                url: 'https://www.gov.uk/government/statistical-data-sets/live-tables-on-rents-lettings-and-tenancies',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-stock" className="mb-12">
            <LineChart
              title="Social housing completions vs right-to-buy sales, England, 2010–2024"
              subtitle="Annual new social housing completions compared with right-to-buy sales. Sales surged after the 2012 discount increase before declining. New build has not replaced losses."
              series={completionsSeries}
              yLabel="Homes per year"
              source={{
                name: 'DLUHC',
                dataset: 'Housing Supply: Indicators of New Supply / Right to Buy Sales',
                frequency: 'annual',
                url: 'https://www.gov.uk/government/statistical-data-sets/live-tables-on-affordable-housing-supply',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="Housing Target Set"
            value="1.5"
            unit="million homes"
            description="The government announced in 2024 a target to build 1.5 million homes over five years, with a renewed focus on affordable and social housing. Reforms to right-to-buy discounts — reducing the maximum discount — were introduced in 2024 to slow the rate at which council homes are removed from social stock. Housing associations have been expanding delivery under the Affordable Homes Programme."
            source="DLUHC, Affordable Homes Programme"
          />
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-context" className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The data on social housing waiting lists</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>England&rsquo;s social housing waiting list stands at 1.29 million households — and that figure undercounts true need. The 2015 reforms allowed councils to remove households assessed as adequately housed from their registers, producing the apparent sharp fall visible in the data. The underlying demand for affordable, secure housing is substantially higher: the charity Shelter estimates around 4 million people are living in inadequate housing conditions who could benefit from social housing but are not on a waiting list.</p>
              <p>The fundamental problem is stock. England had 6.7 million council homes in 1979; it has around 1.6 million today. Right-to-buy, introduced in 1980 and extended with larger discounts in 2012, has transferred over 2 million homes from the social to private sector. Receipts were not ring-fenced for replacement: councils could keep only a proportion and were subject to restrictions that made building replacement homes difficult. The net effect over four decades has been a loss of approximately 1.4 million social homes relative to the 1979 stock base.</p>
              <p>In London, the situation is most acute. Average waiting times for social housing in the capital exceed five years, and in some boroughs families wait a decade or more. The consequence of insufficient social housing is not merely inconvenience: it drives homelessness, overspending on temporary accommodation (which councils spent £2.3 billion on in 2023-24), child poverty, and the breakdown of communities as working families are unable to afford to remain in areas where they have established lives. The cost of not building falls entirely on those with the least power to bear it.</p>
            </div>
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p><a href="https://www.gov.uk/government/statistical-data-sets/live-tables-on-rents-lettings-and-tenancies" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DLUHC</a> — Local Authority Housing Statistics. Published annually. Waiting list figures are households on local authority housing registers at 1 April. Data for 2024 is provisional.</p>
            <p><a href="https://www.gov.uk/government/statistical-data-sets/live-tables-on-affordable-housing-supply" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DLUHC</a> — Live Tables on Affordable Housing Supply. Social housing completions include local authority and housing association affordable rented homes. Right-to-buy sales from DLUHC Right to Buy live tables.</p>
            <p>The 2015 fall in waiting list figures reflects eligibility reforms under the Localism Act 2011 allowing councils to restrict who can join housing registers. The &ldquo;social housing stock change since 1980&rdquo; figure is derived from DLUHC dwelling stock estimates. Average wait times from Crisis and Shelter analysis of local authority data.</p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
