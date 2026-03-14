'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'Trussell Trust', dataset: 'End of Year Statistics', url: 'https://www.trusselltrust.org/news-and-blog/latest-stats/end-year-stats/', date: '2024' },
  { num: 2, name: 'Independent Food Aid Network', dataset: 'Food Aid Census', url: 'https://www.foodaidnetwork.org.uk/food-aid-census', date: '2024' },
  { num: 3, name: 'Joseph Rowntree Foundation', dataset: 'UK Poverty Report', url: 'https://www.jrf.org.uk/report/uk-poverty-2024', date: '2024' },
];

const parcelsValues = [0.91, 1.09, 1.08, 1.18, 1.33, 1.90, 2.17, 2.17, 3.03, 3.12, 3.09];
const childParcelValues = [0.33, 0.40, 0.40, 0.44, 0.49, 0.72, 0.84, 0.83, 1.14, 1.17, 1.16];
const inWorkPovertyValues = [31.2, 32.4, 33.1, 34.2, 35.0, 36.1, 36.8, 38.4, 40.1, 41.2, 42.0];
const lowIncomeReferralValues = [42.3, 43.1, 44.2, 45.8, 47.1, 48.3, 50.2, 52.1, 53.8, 55.0, 56.4];

const series1: Series[] = [
  { id: 'parcels', label: 'Emergency food parcels distributed (millions)', colour: '#6B7280', data: parcelsValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
  { id: 'children', label: 'Child food parcels (millions)', colour: '#E63946', data: childParcelValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
];

const series2: Series[] = [
  { id: 'inwork', label: 'Working households among food bank users (%)', colour: '#264653', data: inWorkPovertyValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
  { id: 'lowincome', label: 'Low income as primary referral reason (%)', colour: '#F4A261', data: lowIncomeReferralValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
];

const annotations1: Annotation[] = [
  { date: new Date(2019, 9, 1), label: '2019: UC migration — benefit delays spike' },
  { date: new Date(2022, 3, 1), label: '2022: Cost of living crisis' },
];

export default function FoodBankUsePage() {
  return (
    <>
      <TopicNav topic="Food Bank Use" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Society"
          question="How Many People Are Using Food Banks?"
          finding={<>The Trussell Trust network distributed 3.09 million emergency food parcels in 2023/24 — more than triple the number a decade ago — of which 1.16 million went to children.<Cite nums={1} /> Food banks are no longer a safety net for the most extreme cases: 42% of Trussell users are in working households, and low income — not benefit delays — is now the primary referral reason.<Cite nums={[1, 3]} /></>}
          colour="#6B7280"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Food bank use in the UK has risen almost every year since 2013. The Trussell Trust — the UK's largest food bank network — distributed 3.09 million three-day emergency food parcels in 2023/24, equivalent to 8,000 parcels a day. This is the figure for the Trussell network alone; the Independent Food Aid Network estimates that independent food banks and community pantries distribute a further 1.5–2 million parcels annually, suggesting total food aid provision may exceed 5 million households per year.<Cite nums={[1, 2]} /> The causes have shifted over time: in the early years, benefit delays and sanctions were the dominant driver. By 2024, low income — inadequate wages, high housing costs, energy bills — is cited by 56% of referrals as the primary reason.<Cite nums={1} /></p>
            <p>The most alarming trend is the normalisation of food bank use among working households. Forty-two percent of people referred to Trussell Trust food banks in 2023/24 are in paid work. This is in-work poverty made visible — the minimum wage is insufficient to cover the cost of living in most parts of England, particularly for renters. The Joseph Rowntree Foundation's Minimum Income Standard calculates that a single adult needs £25,100 a year after tax to achieve a minimum acceptable standard of living; the National Living Wage generates approximately £19,000 after tax for a full-time worker.<Cite nums={3} /> Child poverty — defined as households below 60% of median income — affects 4.3 million children, with two-thirds in working households. The two-child benefit limit, which restricts Child Tax Credit and Universal Credit to the first two children, is estimated to keep 250,000 children in poverty who would otherwise escape it.<Cite nums={[1, 3]} /></p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Overview' },
          { id: 'sec-chart1', label: 'Food Parcels' },
          { id: 'sec-chart2', label: 'Working Poor' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard label="Emergency food parcels" value="3.09M" unit="2023/24" direction="up" polarity="up-is-bad" changeText="was 0.91M in 2013 · tripled in a decade" sparklineData={[0.91, 1.09, 1.08, 1.18, 1.33, 1.90, 2.17, 2.17, 3.03, 3.12, 3.09]} source="Trussell Trust — End of Year Statistics 2024" href="#sec-chart1" />
            <MetricCard label="Child food parcels" value="1.16M" unit="for children" direction="up" polarity="up-is-bad" changeText="was 0.33M in 2013 · 38% of all parcels" sparklineData={[0.33, 0.40, 0.40, 0.44, 0.49, 0.72, 0.84, 0.83, 1.14, 1.17, 1.16]} source="Trussell Trust — End of Year Statistics 2024" href="#sec-chart1" />
            <MetricCard label="Working households among users" value="42.0%" unit="of Trussell users" direction="up" polarity="up-is-bad" changeText="was 31.2% in 2013 · in-work poverty normalising" sparklineData={[31.2, 32.4, 33.1, 34.2, 35.0, 36.1, 36.8, 38.4, 40.1, 41.2, 42.0]} source="Trussell Trust — End of Year Statistics 2024" href="#sec-chart2" />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Emergency food parcels distributed, Trussell Trust network, 2013–2024"
              subtitle="Annual food parcels distributed to adults and children by the Trussell Trust. The scale has grown from under 1 million to over 3 million in a decade. This does not include independent food banks."
              series={series1}
              annotations={annotations1}
              yLabel="Millions of parcels"
              source={{ name: 'Trussell Trust', dataset: 'End of Year Statistics', url: 'https://www.trusselltrust.org/news-and-blog/latest-stats/end-year-stats/', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Working households and low income referrals at food banks, 2013–2024"
              subtitle="% of Trussell Trust users in paid work and % with low income as primary referral reason. Food banks are no longer primarily for those out of work — in-work poverty is the dominant driver."
              series={series2}
              annotations={[]}
              yLabel="Percentage (%)"
              source={{ name: 'Trussell Trust', dataset: 'End of Year Statistics', url: 'https://www.trusselltrust.org/news-and-blog/latest-stats/end-year-stats/', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Universal Free School Meals could break the cycle"
            value="530,000"
            unit="children in England eligible for free school meals who are not registered"
            description="Around 530,000 children in England are eligible for free school meals but are not registered to receive them — either because their parents are unaware of their entitlement, because the stigma of claiming prevents take-up, or because administrative barriers have not been cleared. Automatically enrolling all eligible children would require no change in eligibility criteria and would reduce both child hunger and administrative burden on schools. Scotland has already implemented universal free school meals for all primary school children in P1-P5 regardless of income."
            source="Source: Child Poverty Action Group — Free School Meals 2024. Joseph Rowntree Foundation 2024."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.trusselltrust.org/news-and-blog/latest-stats/end-year-stats/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Trussell Trust — End of Year Statistics</a> — food parcel numbers, referral reasons, demographics. Annual.</p>
            <p><a href="https://www.foodaidnetwork.org.uk/food-aid-census" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Independent Food Aid Network — Food Aid Census</a> — independent food banks, community provision. Annual.</p>
            <p>Trussell Trust data covers the April to March financial year. Each parcel provides three days of nutritionally balanced emergency food. Households can receive a maximum of three emergency parcels per crisis period.</p>
          </div>
        </section>
      </main>
    </>
  );
}
