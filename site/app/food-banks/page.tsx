'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import PositiveCallout from '@/components/PositiveCallout';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'Trussell Trust', dataset: 'End of year food bank statistics', url: 'https://www.trusselltrust.org/news-and-blog/latest-stats/', date: 'Apr 2024' },
  { num: 2, name: 'Independent Food Aid Network', dataset: 'State of the Nation report', url: 'https://www.foodaidnetwork.org.uk', date: '2024' },
  { num: 3, name: 'DWP', dataset: 'Universal Credit uplift impact research', date: '2022' },
  { num: 4, name: 'Institute for Fiscal Studies', dataset: 'Two-child limit poverty impact analysis', date: '2024' },
];

export default function FoodBanksPage() {
  const colour = '#E63946';

  // Trussell Trust food parcels 2013–2024 (millions)
  const parcelsData = [0.91, 1.09, 1.11, 1.18, 1.33, 1.35, 1.58, 1.61, 1.91, 2.17, 2.99, 3.11];
  const parcelsAnnotations: Annotation[] = [
    { date: new Date(2016, 0, 1), label: '2016: Benefit freeze begins' },
    { date: new Date(2020, 2, 1), label: '2020: COVID-19 — £20 uplift' },
    { date: new Date(2021, 9, 1), label: '2021: £20 UC uplift removed' },
    { date: new Date(2022, 0, 1), label: '2022: Cost-of-living crisis' },
  ];

  const parcelsSeries: Series[] = [
    {
      id: 'parcels',
      label: 'Emergency food parcels distributed (millions)',
      colour: colour,
      data: parcelsData.map((v, i) => ({ date: new Date(2013 + i, 0, 1), value: v })),
    },
  ];

  // Food bank users by employment status 2018–2024 (% of users)
  const workingData     = [14, 15, 17, 18, 21, 23, 25];
  const unemployedData  = [38, 37, 36, 35, 34, 33, 32];
  const benefitsData    = [48, 48, 47, 47, 45, 44, 43];

  const usersSeries: Series[] = [
    {
      id: 'working',
      label: 'In-work households (%)',
      colour: '#2A9D8F',
      data: workingData.map((v, i) => ({ date: new Date(2018 + i, 0, 1), value: v })),
    },
    {
      id: 'unemployed',
      label: 'Unemployed households (%)',
      colour: '#6B7280',
      data: unemployedData.map((v, i) => ({ date: new Date(2018 + i, 0, 1), value: v })),
    },
    {
      id: 'benefits',
      label: 'Out-of-work benefit claimants (%)',
      colour: colour,
      data: benefitsData.map((v, i) => ({ date: new Date(2018 + i, 0, 1), value: v })),
    },
  ];

  return (
    <>
      <TopicNav topic="Food Banks" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Food Banks"
          question="How Many People Are Using Food Banks?"
          finding="Trussell Trust food banks distributed 3.1 million emergency food parcels in 2023/24 — a record — with working households now making up 25% of users."
          colour={colour}
          preposition="with"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Overview' },
          { id: 'sec-parcels', label: 'Food Parcels' },
          { id: 'sec-users', label: 'Who Uses Food Banks' },
        ]} />

        <section id="sec-metrics" className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Food parcels distributed (millions/yr)"
              value="3.1"
              direction="up"
              polarity="up-is-bad"
              changeText="2023/24 · Trussell Trust network · up from 910K in 2013/14 · record high"
              sparklineData={[0.91, 1.09, 1.11, 1.18, 1.33, 1.35, 1.58, 1.61, 1.91, 2.17, 2.99, 3.11]}
              source="Trussell Trust — End of year stats 2023/24"
            />
            <MetricCard
              label="Working households using food banks (%)"
              value="25"
              direction="up"
              polarity="up-is-bad"
              changeText="2024 · up from 14% in 2018 · food poverty not limited to unemployment"
              sparklineData={[14, 15, 17, 18, 21, 23, 25]}
              source="Trussell Trust — End of year stats 2023/24"
            />
            <MetricCard
              label="Children's food parcels (millions/yr)"
              value="1.1"
              direction="up"
              polarity="up-is-bad"
              changeText="2023/24 · 36% of all parcels · one parcel in three goes to a child"
              sparklineData={[0.33, 0.39, 0.40, 0.43, 0.48, 0.49, 0.57, 0.58, 0.69, 0.78, 1.08, 1.10]}
              source="Trussell Trust — End of year stats 2023/24"
            />
          </div>
        </section>

        <ScrollReveal>
          <section id="sec-parcels" className="mb-12">
            <LineChart
              title="Trussell Trust emergency food parcels distributed, 2013–2024 (millions)"
              subtitle="England, Wales, Scotland and Northern Ireland. Each parcel contains three days of emergency food for one person. Note: the Trussell Trust network is the largest but not the only food bank network in the UK."
              series={parcelsSeries}
              annotations={parcelsAnnotations}
              yLabel="Parcels distributed (millions)"
              source={{
                name: 'Trussell Trust',
                dataset: 'End of year food bank stats',
                frequency: 'annual',
                url: 'https://www.trusselltrust.org/news-and-blog/latest-stats/',
                date: 'Apr 2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-users" className="mb-12">
            <LineChart
              title="Food bank users by employment status, 2018–2024 (%)"
              subtitle="Trussell Trust network. Percentage of households referred to food banks by employment status. The rise of in-work poverty means food banks are no longer principally serving unemployed people."
              series={usersSeries}
              yLabel="% of users"
              source={{
                name: 'Trussell Trust',
                dataset: 'End of year food bank stats — household demographics',
                frequency: 'annual',
                url: 'https://www.trusselltrust.org/news-and-blog/latest-stats/',
                date: 'Apr 2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="What is being done"
            value="£2.5bn"
            unit="Household Support Fund extended to 2025 — providing emergency grants through local authorities"
            description="The Household Support Fund, extended multiple times since 2021, has provided £2.5 billion to local authorities to distribute as emergency grants for food, energy, and essential items. Free School Meals eligibility was extended and Holiday Activities and Food programmes funded across all 152 local authority areas in England. The Trussell Trust's 'More Than Food' campaign advocates for a guaranteed minimum income floor. The Joseph Rowntree Foundation's 'Guarantee Our Essentials' campaign has cross-party support for raising UC to cover basic costs. The Scottish Government introduced a Minimum Income Guarantee pilot in 2024."
            source="Source: Trussell Trust — Annual Review 2023/24; DWP — Household Support Fund guidance 2024."
          />
        </ScrollReveal>

        <ScrollReveal>
          <section className="max-w-2xl mb-12 mt-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">What the data shows</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>Trussell Trust food banks distributed 3.1 million emergency food parcels in 2023/24 — the highest figure since the network began collecting data<Cite nums={1} />. Each parcel contains three days of food for one person. The Trussell Trust network is the largest in the UK, but the Independent Food Aid Network estimates there are approximately 2,800 additional food banks outside the Trussell Trust structure<Cite nums={2} />, suggesting total usage is significantly higher than the headline figures capture. Food bank usage has increased in every year since 2013, through periods of economic growth as well as recession.</p>
              <p>The most significant trend of recent years is the rise of in-work food bank users. In 2018, 14% of Trussell Trust referrals came from working households; by 2024 this had risen to 25%. This reflects the UK's persistent in-work poverty problem: around 3.7 million working people live below the poverty line, in jobs that do not pay enough to cover basic costs, or on zero-hours contracts that provide insufficient hours. The removal of the £20 per week Universal Credit uplift in October 2021 coincided with a sharp increase in food parcel distribution — DWP's own research found it pushed 500,000 people into destitution.</p>
              <p>Children account for 36% of all Trussell Trust food parcels — 1.1 million parcels per year. The UK is one of a small number of wealthy nations where child poverty has increased over the past decade. The two-child benefit limit, introduced in 2017, prevents families from claiming the child element of Universal Credit or Child Tax Credit for a third or subsequent child, affecting approximately 1.5 million families. The Institute for Fiscal Studies estimates this single policy keeps 250,000 children in poverty who would otherwise not be. Food banks are the symptom; income inadequacy is the cause.</p>
            </div>
          </section>
        </ScrollReveal>

        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p><a href="https://www.trusselltrust.org/news-and-blog/latest-stats/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Trussell Trust — End of year food bank statistics</a> — annual. Parcels distributed, demographics of users.</p>
            <p><a href="https://www.foodaidnetwork.org.uk" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Independent Food Aid Network — State of the Nation report</a> — annual. Independent food banks outside Trussell Trust.</p>
            <p><a href="https://www.jrf.org.uk/poverty-in-the-uk-2023" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Joseph Rowntree Foundation — UK Poverty report</a> — annual.</p>
            <p>All Trussell Trust figures cover the financial year April–March for the UK as a whole. &lsquo;Children&rsquo;s parcels&rsquo; are parcels distributed for children under 16. Employment status is self-reported at referral.</p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
