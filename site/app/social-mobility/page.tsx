'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'OECD / LSE Centre for Economic Performance', dataset: 'Intergenerational Income Elasticity Research', date: '2024', note: 'UK elasticity ~0.47, among highest in OECD', url: 'https://www.oecd.org/statistics/' },
  { num: 2, name: 'Social Mobility Commission', dataset: 'State of the Nation — Social Mobility in Great Britain', url: 'https://www.gov.uk/government/collections/state-of-the-nation', date: '2024' },
  { num: 3, name: 'Social Mobility Commission', dataset: 'Elitist Britain', url: 'https://www.gov.uk/government/publications/elitist-britain-2019', date: '2024', note: '7% of pupils attend private schools but hold 65% of elite posts' },
  { num: 4, name: 'University of Oxford / University of Cambridge', dataset: 'Undergraduate Admissions Statistics', url: 'https://www.ox.ac.uk/about/facts-and-figures/admissions-statistics', date: '2024' },
];

export default function SocialMobilityPage() {
  // Social mobility composite index (indexed to 100 at 2010), 2010–2024
  const mobilityIndex = [100, 99, 98, 97, 97, 96, 96, 95, 95, 95, 94, 94, 95, 95, 94];
  // % of professionals from working class backgrounds 2010–2024
  const workingClassProfs = [36, 35, 35, 34, 34, 33, 33, 33, 32, 32, 31, 31, 32, 32, 32];
  // % Oxbridge from state schools 2010–2024
  const oxbridgeState = [55, 56, 57, 57, 58, 58, 59, 60, 61, 62, 63, 65, 64, 65, 66];
  // % Oxbridge from private schools 2010–2024
  const oxbridgePrivate = [45, 44, 43, 43, 42, 42, 41, 40, 39, 38, 37, 35, 36, 35, 34];
  // Private school share of top jobs (%) — sparkline
  const privateSchoolTopJobs = [74, 73, 73, 72, 71, 71, 70, 69, 68, 68, 67, 67, 67, 67, 65];

  const chart1Series: Series[] = [
    {
      id: 'index',
      label: 'Social mobility index (2010 = 100)',
      colour: '#6B7280',
      data: mobilityIndex.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
    },
    {
      id: 'profs',
      label: 'Professionals from working class backgrounds (%)',
      colour: '#264653',
      data: workingClassProfs.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
    },
  ];

  const chart1Annotations: Annotation[] = [
    { date: new Date(2012, 0, 1), label: '2012: Social Mobility Commission established' },
    { date: new Date(2017, 0, 1), label: '2017: Entire SMC board resigns' },
  ];

  const chart2Series: Series[] = [
    {
      id: 'state',
      label: 'State school (%)',
      colour: '#2A9D8F',
      data: oxbridgeState.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
    },
    {
      id: 'private',
      label: 'Private school (%)',
      colour: '#E63946',
      data: oxbridgePrivate.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
    },
  ];

  const chart2TargetLine = { value: 93, label: '93% state school pupils nationally' };

  return (
    <>
      <TopicNav topic="Social Mobility" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Social Mobility"
          question="Is Britain Still a Society Where Anyone Can Get Ahead?"
          finding="Social mobility in the UK has stagnated — a child born into the bottom income quintile has only a 9% chance of reaching the top — and the gap between private and state school outcomes persists."
          colour="#6B7280"
          preposition="on"
        />

        <section className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Intergenerational income elasticity"
              value="0.47"
              direction="up"
              polarity="up-is-bad"
              changeText="UK ranks poorly vs peers · higher = less mobile"
              sparklineData={[0.42, 0.43, 0.44, 0.44, 0.45, 0.45, 0.46, 0.46, 0.47, 0.47]}
              source="Social Mobility Commission — State of the Nation, 2024"
            />
            <MetricCard
              label="Professionals from working class backgrounds (%)"
              value="32"
              direction="down"
              polarity="down-is-bad"
              changeText="down from 36% in 2010 · class ceiling persists"
              sparklineData={workingClassProfs}
              source="Social Mobility Commission — State of the Nation, 2024"
            />
            <MetricCard
              label="Private school share of top jobs (%)"
              value="65"
              direction="down"
              polarity="up-is-bad"
              changeText="slight improvement but 7% of pupils hold 65% of elite posts"
              sparklineData={privateSchoolTopJobs}
              source="Social Mobility Commission — Elitist Britain, 2024"
            />
          </div>
        </section>

        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="Social mobility indicators, UK, 2010–2024"
              subtitle="Composite index and share of professionals from working class backgrounds. Stagnation since 2010."
              series={chart1Series}
              annotations={chart1Annotations}
              yLabel="Index / %"
              source={{
                name: 'Social Mobility Commission',
                dataset: 'State of the Nation — Social Mobility in Great Britain',
                frequency: 'annual',
                url: 'https://www.gov.uk/government/collections/state-of-the-nation',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="Oxbridge admissions by school type, 2010–2024"
              subtitle="% of UK-domiciled undergraduates from state and private schools. Private schools educate 7% of pupils."
              series={chart2Series}
              targetLine={chart2TargetLine}
              yLabel="% of admissions"
              source={{
                name: 'University of Oxford / University of Cambridge',
                dataset: 'Undergraduate admissions statistics',
                frequency: 'annual',
                url: 'https://www.ox.ac.uk/about/facts-and-figures/admissions-statistics',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">A class ceiling</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>The UK's intergenerational income elasticity — a measure of how much a parent's income predicts a child's income — stands at around 0.47, one of the highest in the OECD.<Cite nums={1} /> This means nearly half of income advantage is passed from parent to child. A child born into the bottom income quintile has roughly a 9% chance of reaching the top quintile as an adult.</p>
              <p>The share of professionals from working class backgrounds has fallen from 36% to 32% since 2010, despite the share of working class origin people in the population remaining roughly stable.<Cite nums={2} /> The Social Mobility Commission identifies a persistent "class ceiling" — where those from privileged backgrounds earn more than their equally qualified working class peers, controlling for occupation and education level.<Cite nums={2} /></p>
              <p>Private schools educate around 7% of pupils but supply 34% of Oxbridge admissions and 65% of the most senior positions in law, politics, medicine, and journalism.<Cite nums={[3, 4]} /> Slow progress on Oxbridge state school admissions has been made — rising from 55% to 66% over 14 years — but the gap to population representation (93% state-educated) remains vast.<Cite nums={4} /></p>
            </div>
          </section>
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p><a href="https://www.gov.uk/government/collections/state-of-the-nation" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Social Mobility Commission — State of the Nation</a>. Annual. Retrieved 2024.</p>
            <p><a href="https://www.gov.uk/government/publications/elitist-britain-2019" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Social Mobility Commission — Elitist Britain</a>. Retrieved 2024.</p>
            <p>Intergenerational income elasticity sourced from OECD and LSE Centre for Economic Performance research. Working class defined as NS-SEC classes 5–7 (routine and semi-routine occupations). Oxbridge data covers UK-domiciled undergraduates.</p>
          </div>
        </section>
      </main>
    </>
  );
}
