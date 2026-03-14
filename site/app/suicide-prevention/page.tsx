'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'ONS', dataset: 'Suicides in England and Wales', url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/birthsdeathsandmarriages/deaths/bulletins/suicidesintheunitedkingdom/latest', date: '2024', note: '~6,400 deaths in 2023; rate 11.0 per 100K; men 3x female rate; 25-44 cohort rising fastest' },
  { num: 2, name: 'DHSC', dataset: 'National Suicide Prevention Strategy', url: 'https://www.gov.uk/government/publications/suicide-prevention-strategy-for-england-2023-to-2028', date: '2023', note: 'Refreshed 2023; ambitions but no binding targets or ring-fenced funding' },
];

export default function SuicidePreventionPage() {
  // UK suicide rate per 100,000 (age-standardised) 2010–2024
  const suicideRate = [10.1, 10.4, 10.3, 10.9, 10.8, 10.5, 10.3, 10.2, 11.2, 11.0, 10.3, 10.7, 10.9, 11.1, 11.0];
  // Young adult (25–44) rate per 100,000 2010–2024
  const youngAdultRate = [11.2, 11.8, 11.5, 12.1, 12.0, 11.6, 11.4, 11.3, 12.6, 12.4, 11.5, 12.1, 12.5, 12.9, 12.7];
  // Male rate 2015–2024
  const maleRate = [16.0, 15.4, 15.2, 15.0, 17.2, 16.9, 15.8, 16.3, 16.7, 17.0];
  // Female rate 2015–2024
  const femaleRate = [5.1, 5.0, 5.2, 5.3, 5.7, 5.5, 5.0, 5.4, 5.6, 5.7];
  // Total UK suicides per year (thousands) — sparkline
  const totalDeaths = [5981, 6045, 5981, 6233, 6122, 5965, 5821, 5965, 6507, 6319, 5224, 6319, 6434, 6444, 6361];

  const chart1Series: Series[] = [
    {
      id: 'overall',
      label: 'Overall suicide rate (per 100,000)',
      colour: '#264653',
      data: suicideRate.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
    },
    {
      id: 'young',
      label: 'Rate aged 25–44 (per 100,000)',
      colour: '#E63946',
      data: youngAdultRate.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
    },
  ];

  const chart1Annotations: Annotation[] = [
    { date: new Date(2012, 0, 1), label: '2012: NHS talking therapies expansion' },
    { date: new Date(2019, 0, 1), label: '2019: National suicide prevention strategy' },
    { date: new Date(2020, 0, 1), label: '2020: COVID-19 pandemic' },
  ];

  const chart2Series: Series[] = [
    {
      id: 'male',
      label: 'Male (per 100,000)',
      colour: '#264653',
      data: maleRate.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
    {
      id: 'female',
      label: 'Female (per 100,000)',
      colour: '#F4A261',
      data: femaleRate.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
  ];

  return (
    <>
      <TopicNav topic="Suicide Prevention" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Suicide Prevention"
          question="Is the UK Doing Enough to Prevent Suicide?"
          finding="Around 5,000 people die by suicide each year in the UK — rates have risen among young adults — yet mental health crisis service capacity has not kept pace with demand."
          colour="#264653"
          preposition="on"
        />

        <section className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Suicides per year (UK)"
              value="~6,400"
              direction="up"
              polarity="up-is-bad"
              changeText="up from ~5,981 in 2010 · persistent toll"
              sparklineData={totalDeaths.map(v => v / 1000)}
              source="ONS — Suicides in England and Wales, 2024"
            />
            <MetricCard
              label="Age-standardised rate (per 100,000)"
              value="11.0"
              direction="up"
              polarity="up-is-bad"
              changeText="up from 10.1 in 2010 · young adults rising fastest"
              sparklineData={suicideRate}
              source="ONS — Suicides in England and Wales, 2024"
            />
            <MetricCard
              label="Young adult (25–44) rate change (%)"
              value="+13%"
              direction="up"
              polarity="up-is-bad"
              changeText="since 2010 · disproportionate increase in working-age adults"
              sparklineData={youngAdultRate}
              source="ONS — Suicides in England and Wales, 2024"
            />
          </div>
        </section>

        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="UK suicide rate per 100,000 population, 2010–2024"
              subtitle="Age-standardised rates. Overall and age 25–44 cohort shown separately."
              series={chart1Series}
              annotations={chart1Annotations}
              yLabel="Rate per 100,000"
              source={{
                name: 'Office for National Statistics',
                dataset: 'Suicides in England and Wales',
                frequency: 'annual',
                url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/birthsdeathsandmarriages/deaths/bulletins/suicidesintheunitedkingdom/latest',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="Suicide rate by sex, UK, 2015–2024"
              subtitle="Age-standardised rate per 100,000. Men die by suicide at three times the rate of women."
              series={chart2Series}
              yLabel="Rate per 100,000"
              source={{
                name: 'Office for National Statistics',
                dataset: 'Suicides in England and Wales',
                frequency: 'annual',
                url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/birthsdeathsandmarriages/deaths/bulletins/suicidesintheunitedkingdom/latest',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">What the numbers show</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>Around 6,400 people died by suicide in the UK in 2023 — roughly 17 people every day. The age-standardised rate has edged upward since 2010, with the sharpest increases concentrated among men aged 25–44.<Cite nums={1} /> Men account for three quarters of all suicide deaths, a gap that has remained stubbornly constant despite targeted prevention strategies.</p>
              <p>The UK's National Suicide Prevention Strategy, refreshed in 2019 and updated in 2023, sets ambitions for reducing rates but lacks binding targets or ring-fenced funding.<Cite nums={2} /> Mental health crisis services — the frontline response to suicidal distress — face demand that has grown faster than capacity. Waiting times for talking therapies exceed 18 weeks in many NHS trusts, and crisis lines regularly operate below staffing levels.</p>
              <p>Means restriction — such as packaging limits on paracetamol — has demonstrably reduced method-specific deaths. But economic stressors, social isolation, and unmet mental health need continue to drive overall rates upward. The data does not yet show a sustained downward trend.<Cite nums={1} /></p>
            </div>
          </section>
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p><a href="https://www.ons.gov.uk/peoplepopulationandcommunity/birthsdeathsandmarriages/deaths/bulletins/suicidesintheunitedkingdom/latest" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ONS — Suicides in England and Wales</a>. Annual. Retrieved 2024.</p>
            <p>Age-standardised rates allow comparison over time by removing the effect of changing population age structure. Figures are for deaths registered, not deaths occurring, which introduces a small lag. UK figures include England, Wales, Scotland, and Northern Ireland.</p>
          </div>
        </section>
      </main>
    </>
  );
}
