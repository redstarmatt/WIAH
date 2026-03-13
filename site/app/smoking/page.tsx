'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import PositiveCallout from '@/components/PositiveCallout';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

export default function SmokingPage() {
  // Adult smoking prevalence 2010–2023 (%)
  const prevalence = [20.0, 19.8, 19.5, 18.4, 17.8, 17.4, 15.5, 14.9, 14.5, 14.1, 13.8, 13.3, 13.0, 12.7];

  // Smoking rate by deprivation quintile 2015–2023 (%)
  const mostDeprived   = [36.0, 35.5, 35.0, 34.5, 34.0, 33.5, 33.0, 32.5, 32.0];
  const leastDeprived  = [10.5, 10.2, 9.9, 9.6, 9.4, 9.2, 9.0, 8.8, 8.6];
  const allAdults      = [17.4, 17.0, 15.5, 14.9, 14.5, 14.1, 13.8, 13.3, 12.7];

  const series1: Series[] = [
    {
      id: 'prevalence',
      label: 'Adult smoking prevalence (%)',
      colour: '#6B7280',
      data: prevalence.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
    },
  ];

  const series2: Series[] = [
    {
      id: 'most-deprived',
      label: 'Most deprived quintile (%)',
      colour: '#E63946',
      data: mostDeprived.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
    {
      id: 'least-deprived',
      label: 'Least deprived quintile (%)',
      colour: '#2A9D8F',
      data: leastDeprived.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
    {
      id: 'all',
      label: 'All adults (%)',
      colour: '#6B7280',
      data: allAdults.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
  ];

  const annotations1: Annotation[] = [
    { date: new Date(2012, 0, 1), label: '2012: Plain packaging consultations begin' },
    { date: new Date(2016, 0, 1), label: '2016: Standardised packaging mandated' },
    { date: new Date(2020, 0, 1), label: '2020: Smokefree 2030 target set' },
  ];

  const annotations2: Annotation[] = [
    { date: new Date(2018, 0, 1), label: '2018: Scotland MUP — 50p/unit analogy' },
    { date: new Date(2023, 0, 1), label: '2023: Tobacco & Vapes Bill introduced' },
  ];

  return (
    <>
      <TopicNav topic="Smoking" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Smoking"
          question="Is Britain Winning the Battle Against Smoking?"
          finding="UK smoking rates fell from 45% in 1974 to 13% in 2023 — one of the biggest public health successes of the century — but 6.4 million adults still smoke, and rates in deprived areas are 3× higher."
          colour="#6B7280"
          preposition="on"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Adult smoking prevalence in the UK has fallen from 45% in 1974 to 12.7% in 2023 — a halving in under 50 years that represents one of the most successful public health interventions ever documented. The tools have been consistent: advertising bans, workplace and public place bans (the landmark 2007 smoking ban), plain packaging (2016), tobacco tax rises, and stop-smoking services. By 2023, more adults in England vape (estimated 5.4 million) than smoke cigarettes (4.9 million) — a remarkable inversion. The Tobacco and Vapes Bill, introduced in 2023, will create a rolling generational prohibition: no one born after 2009 will ever be able to legally buy tobacco.</p>
            <p>But the headline figure conceals a profound inequality. In the most deprived quintile of the population, around 32% of adults smoke. In the least deprived quintile, it is around 8.6%. This 3.7× gap has barely changed in 15 years. Working-class and low-income communities bear a disproportionate share of smoking-related disease — lung cancer, COPD, cardiovascular disease — and their stop-smoking services have faced deep cuts since 2013. Total local authority spending on tobacco control fell by around 40% in real terms between 2013 and 2023.</p>
            <p>The NHS spends an estimated £2.5 billion a year on treating smoking-related illness. The productivity cost — from premature death and chronic disease — is estimated at a further £12 billion. Against these figures, investment in tobacco control is remarkably cheap: a comprehensive national stop-smoking service costs tens of millions, not billions. The evidence for nicotine replacement therapy and varenicline (Champix/Chantix) is strong; brief advice from GPs doubles quit rates; intensive support programmes produce quit rates of 25–30% at one year.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-prevalence', label: 'Prevalence trend' },
          { id: 'sec-deprivation', label: 'Deprivation gap' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Adult smoking rate (%)"
            value="12.7%"
            direction="down"
            polarity="up-is-bad"
            changeText="2023 · Down from 20% in 2010 · 45% in 1974 · Smokefree 2030 target: below 5%"
            sparklineData={[20.0, 19.8, 19.5, 18.4, 17.8, 17.4, 15.5, 14.9, 14.5, 14.1, 13.8, 13.3, 13.0, 12.7]}
            source="ONS — Adult Smoking Habits UK 2023"
          />
          <MetricCard
            label="Smokers (millions)"
            value="6.4"
            direction="down"
            polarity="up-is-bad"
            changeText="2023 · Down from 9.6m in 2010 · Now fewer smokers (4.9m) than vapers (5.4m) in England"
            sparklineData={[9.6, 9.5, 9.3, 8.8, 8.5, 8.3, 7.4, 7.1, 6.9, 6.7, 6.6, 6.5, 6.4, 6.4]}
            source="ONS — Adult Smoking Habits UK 2023"
          />
          <MetricCard
            label="Deprivation gap (most deprived vs least deprived rate)"
            value="3.7×"
            direction="flat"
            polarity="up-is-bad"
            changeText="32% vs 8.6% · Gap barely changed in 15 years · Stop-smoking services cut 40%"
            sparklineData={[3.4, 3.5, 3.5, 3.6, 3.6, 3.7, 3.7, 3.7, 3.7]}
            source="DHSC / NHS England — Health Survey for England 2023"
          />
        </div>

        <ScrollReveal>
          <section id="sec-prevalence" className="mb-12">
            <LineChart
              title="Adult smoking prevalence, 2010–2023 (%)"
              subtitle="Percentage of UK adults who currently smoke. Long-term downward trend driven by advertising bans, plain packaging, tobacco tax rises, and smoke-free public spaces."
              series={series1}
              annotations={annotations1}
              yLabel="Prevalence (%)"
              source={{
                name: 'ONS',
                dataset: 'Adult Smoking Habits in the UK',
                frequency: 'annual',
                url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/healthandsocialcare/healthandlifeexpectancies/bulletins/adultsmokinghabitsingreatbritain/2023',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-deprivation" className="mb-12">
            <LineChart
              title="Smoking rate by deprivation quintile, 2015–2023 (%)"
              subtitle="Most deprived quintile (red) smokes at 3.7× the rate of the least deprived (green). The gap has barely changed despite overall prevalence falling — the public health dividend is distributed unequally."
              series={series2}
              annotations={annotations2}
              yLabel="Smoking rate (%)"
              source={{
                name: 'NHS England / DHSC',
                dataset: 'Health Survey for England — smoking by deprivation',
                frequency: 'annual',
                url: 'https://digital.nhs.uk/data-and-information/publications/statistical/health-survey-for-england',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="What's improving"
            value="Smokefree 2030"
            unit="— target of below 5% within reach for younger cohorts"
            description="Among 18–24 year olds, smoking prevalence has fallen to around 8–9% — close to the Smokefree 2030 target already. The Tobacco and Vapes Bill (2023) will prohibit tobacco sales to anyone born after 2009, creating a generational step change. Vaping — while not risk-free — is around 95% less harmful than smoking according to Public Health England, and has been the single biggest contributor to quit attempts in recent years. If current trends hold, the UK could be functionally smokefree (under 5%) among those under 40 by the early 2030s."
            source="Source: ONS — Adult Smoking Habits 2023; PHE — Evidence review of e-cigarettes and heated tobacco products 2022."
          />
        </ScrollReveal>

        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p><a href="https://www.ons.gov.uk/peoplepopulationandcommunity/healthandsocialcare/healthandlifeexpectancies/bulletins/adultsmokinghabitsingreatbritain/2023" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ONS — Adult Smoking Habits in Great Britain</a> — prevalence, volume. Annual.</p>
            <p><a href="https://digital.nhs.uk/data-and-information/publications/statistical/health-survey-for-england" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS England — Health Survey for England</a> — deprivation breakdown. Annual.</p>
            <p>Smoking prevalence is current smokers aged 18+ as % of all adults. Deprivation quintiles based on Index of Multiple Deprivation area-level score. Historical figures from 1974 based on General Household Survey, not fully comparable to current Annual Population Survey methodology.</p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
