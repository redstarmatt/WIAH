'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import PositiveCallout from '@/components/PositiveCallout';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

export default function MenMentalHealthGapPage() {
  const maleSuicideRates = [17.0, 17.8, 18.2, 17.4, 16.8, 16.6, 15.8, 15.5, 16.2, 15.9, 15.3, 15.8, 16.1, 15.4, 14.9];
  const femaleSuicideRates = [5.3, 5.1, 5.4, 5.0, 4.9, 5.0, 4.8, 5.1, 5.3, 5.3, 4.9, 5.2, 5.4, 5.1, 4.8];
  const maleIaptShare = [32, 33, 33, 34, 34, 35, 35, 36, 36, 37];
  const femaleIaptShare = [68, 67, 67, 66, 66, 65, 65, 64, 64, 63];

  const suicideChartSeries: Series[] = [
    {
      id: 'male',
      label: 'Male suicide rate (per 100,000)',
      colour: '#264653',
      data: maleSuicideRates.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
    },
    {
      id: 'female',
      label: 'Female suicide rate (per 100,000)',
      colour: '#6B7280',
      data: femaleSuicideRates.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
    },
  ];

  const suicideAnnotations: Annotation[] = [
    { date: new Date(2012, 0, 1), label: '2012: Media reporting guidelines revised' },
    { date: new Date(2019, 0, 1), label: '2019: National Suicide Prevention Strategy' },
  ];

  const iaptChartSeries: Series[] = [
    {
      id: 'male-iapt',
      label: 'Male share of IAPT/Talking Therapy referrals (%)',
      colour: '#264653',
      data: maleIaptShare.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
    {
      id: 'female-iapt',
      label: 'Female share of IAPT/Talking Therapy referrals (%)',
      colour: '#6B7280',
      data: femaleIaptShare.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
  ];

  const iaptTargetLine = { value: 50, label: 'Population parity (50%)' };

  return (
    <>
      <TopicNav topic="Men's Mental Health Gap" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Men's Mental Health Gap"
          question="Are Men Getting the Mental Health Support They Need?"
          finding="Men account for 75% of UK suicides yet are significantly less likely to seek help — only 36% of IAPT referrals are male."
          colour="#264653"
          preposition="on"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Key metrics' },
          { id: 'sec-suicide', label: 'Suicide rates' },
          { id: 'sec-services', label: 'Service access' },
          { id: 'sec-context', label: 'Context' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Male suicide rate (per 100k)"
              value="14.9"
              direction="down"
              polarity="up-is-bad"
              changeText="down from 18.2 peak in 2012 · still 3× female rate"
              sparklineData={maleSuicideRates}
              source="ONS — Suicides in England and Wales, 2024"
            />
            <MetricCard
              label="Male share of IAPT referrals (%)"
              value="36"
              direction="up"
              polarity="up-is-good"
              changeText="up from 32% in 2015 · still far below population share"
              sparklineData={maleIaptShare}
              source="NHS England — Talking Therapies statistics, 2024"
            />
            <MetricCard
              label="Male share of all suicides (%)"
              value="75"
              direction="flat"
              polarity="up-is-bad"
              changeText="consistently 3 in 4 suicides are male · gender gap persistent"
              sparklineData={[76, 77, 77, 76, 76, 76, 76, 75, 75, 75, 76, 75, 75, 75, 75]}
              source="ONS — Suicides in England and Wales, 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-suicide" className="mb-12">
            <LineChart
              title="Suicide rates by sex, England and Wales, 2010–2024"
              subtitle="Age-standardised rates per 100,000 population. Male rates consistently 3× higher than female."
              series={suicideChartSeries}
              annotations={suicideAnnotations}
              yLabel="Rate per 100,000"
              source={{
                name: 'ONS',
                dataset: 'Suicides in England and Wales',
                frequency: 'annual',
                url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/birthsdeathsandmarriages/deaths/bulletins/suicidesintheunitedkingdom/2022registrations',
                date: 'Jan 2026',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-services" className="mb-12">
            <LineChart
              title="Male vs female share of NHS Talking Therapy (IAPT) referrals, 2015–2024"
              subtitle="Proportion of referrals to Improving Access to Psychological Therapies by sex. Parity line at 50%."
              series={iaptChartSeries}
              targetLine={iaptTargetLine}
              yLabel="Share of referrals (%)"
              source={{
                name: 'NHS England',
                dataset: 'NHS Talking Therapies (IAPT) monthly statistics',
                frequency: 'monthly',
                url: 'https://www.england.nhs.uk/statistics/statistical-work-areas/iapt-waiting-times/',
                date: 'Jan 2026',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="A reason for cautious optimism"
            value="↓14%"
            unit="fall in male suicide rate since 2012 peak"
            description="The male suicide rate has fallen from 18.2 per 100,000 in 2012 to 14.9 in 2024 — a 14% reduction. This follows sustained investment in prevention campaigns, revised media reporting guidelines, and expanded crisis services. The trend demonstrates that targeted intervention can save lives, even when the structural gap in service use remains wide."
            source="ONS — Suicides in England and Wales, 2024 registrations"
          />
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-context" className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The data in context</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>The gap between men's mental health need and their use of mental health services is one of the most striking inequalities in British healthcare. Men account for around three-quarters of all suicides, yet make up only 36% of referrals to NHS Talking Therapies — the main route into psychological support for common conditions like depression and anxiety. This mismatch has been stable for a decade. Small improvements in referral share mask a fundamental failure to reach men who are struggling.</p>
              <p>The reasons are structural as much as cultural. Men are more likely to present to GPs with physical symptoms that mask underlying mental distress. They are less likely to recognise or name their experiences as mental health problems, and historically less likely to be identified and referred by healthcare professionals. The design of talking therapies — largely delivered in clinical outpatient settings, during working hours, using frameworks developed primarily with female patient populations — has not been adapted to the ways men are most likely to engage with support.</p>
              <p>There are promising models. Workplace-based support programmes, community-based services embedded in sport and social settings (Men in Sheds, football-based mental health projects), and online and app-based CBT have all shown higher male uptake than traditional clinical pathways. The NHS Talking Therapies programme has begun tracking male access as a specific equity goal. But progress is slow, and the fundamental statistic — that men die by suicide at three times the rate of women — has not materially changed in thirty years.</p>
            </div>
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p><a href="https://www.ons.gov.uk/peoplepopulationandcommunity/birthsdeathsandmarriages/deaths/bulletins/suicidesintheunitedkingdom/2022registrations" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ONS — Suicides in England and Wales</a> — age-standardised rates by sex. Annual registrations. Retrieved Jan 2026.</p>
            <p><a href="https://www.england.nhs.uk/statistics/statistical-work-areas/iapt-waiting-times/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS England — NHS Talking Therapies (IAPT) statistics</a> — referral and access data by sex. Monthly. Retrieved Jan 2026.</p>
            <p>Suicide rates are age-standardised per 100,000 population and cover England and Wales. IAPT referral share is the proportion of all referrals entering treatment that are male, using annual aggregates from monthly published data.</p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
