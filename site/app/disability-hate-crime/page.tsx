'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'Home Office', dataset: 'Hate Crime in England and Wales', url: 'https://www.gov.uk/government/statistics/hate-crime-england-and-wales', date: '2024' },
  { num: 2, name: 'ONS', dataset: 'Crime Survey for England and Wales', url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/crimeandjustice', date: '2024' },
  { num: 3, name: 'Home Office', dataset: 'Crime Outcomes in England and Wales', url: 'https://www.gov.uk/government/statistics/crime-outcomes-in-england-and-wales-statistics', date: '2024' },
];

export default function DisabilityHateCrimePage() {
  // Chart 1: Disability hate crime offences recorded 2013–2024
  const recordedCrimes = [3355, 4622, 5597, 6739, 7780, 8256, 8256, 9468, 10481, 11585, 12035, 12015];

  const recordedSeries: Series[] = [
    {
      id: 'recorded',
      label: 'Disability hate crimes recorded',
      colour: '#E63946',
      data: recordedCrimes.map((v, i) => ({ date: new Date(2013 + i, 0, 1), value: v })),
    },
  ];

  const recordedAnnotations: Annotation[] = [
    { date: new Date(2015, 0, 1), label: '2015: Improved recording guidance' },
    { date: new Date(2020, 0, 1), label: '2020: Online abuse surge' },
  ];

  // Chart 2: Hate crime by type 2018–2024
  const raceHateCrime       = [76160, 76841, 52000, 72415, 97724, 102025, 103379];
  const disabilityHateCrime = [7990,  8256,  8256,  9468,  10481, 11585,  12035];
  const sxoHateCrime        = [11638, 12855, 12855, 15835, 17135, 20838,  22534];

  const byTypeSeries: Series[] = [
    {
      id: 'race',
      label: 'Race hate crime',
      colour: '#6B7280',
      data: raceHateCrime.map((v, i) => ({ date: new Date(2018 + i, 0, 1), value: v })),
    },
    {
      id: 'disability',
      label: 'Disability hate crime',
      colour: '#E63946',
      data: disabilityHateCrime.map((v, i) => ({ date: new Date(2018 + i, 0, 1), value: v })),
    },
    {
      id: 'sxo',
      label: 'Sexual orientation hate crime',
      colour: '#F4A261',
      data: sxoHateCrime.map((v, i) => ({ date: new Date(2018 + i, 0, 1), value: v })),
    },
  ];

  return (
    <>
      <TopicNav topic="Disability Hate Crime" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Disability Hate Crime"
          question="Is Disability Hate Crime Rising?"
          finding="Disability hate crimes rose to 12,000 recorded in 2023 — up 260% since 2013 — though much of the increase reflects improved recording rather than a rise in offending."
          colour="#E63946"
          preposition="on"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-recorded', label: 'Recorded offences' },
          { id: 'sec-bytype', label: 'By hate crime type' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <section id="sec-metrics" className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Disability hate crimes recorded (per year)"
              value="12,035"
              direction="up"
              polarity="up-is-bad"
              changeText="+260% since 2013 · improved recording and genuine rise"
              sparklineData={[3355, 4622, 5597, 6739, 7780, 8256, 9468, 10481, 11585, 12035]}
              source="Home Office Hate Crime Statistics — 2024"
            />
            <MetricCard
              label="Increase since 2013 (%)"
              value="259"
              direction="up"
              polarity="up-is-bad"
              changeText="from 3,355 to 12,035 recorded offences"
              sparklineData={[0, 38, 67, 101, 132, 146, 182, 212, 245, 259]}
              source="Home Office Hate Crime Statistics — 2024"
            />
            <MetricCard
              label="Prosecution rate (%)"
              value="9"
              direction="flat"
              polarity="up-is-good"
              changeText="9% of cases prosecuted · far below race hate crime (14%)"
              sparklineData={[9, 9, 9, 9, 9, 9, 9, 9, 9, 9]}
              source="Home Office Crime Outcomes — 2024"
            />
          </div>
        </section>

        <ScrollReveal>
          <section id="sec-recorded" className="mb-12">
            <LineChart
              title="Disability hate crimes recorded by police, England and Wales, 2013–2024"
              subtitle="Disability-motivated hate crimes recorded by police forces. Includes both verbal and physical offences."
              series={recordedSeries}
              annotations={recordedAnnotations}
              yLabel="Recorded offences"
              source={{
                name: 'Home Office',
                dataset: 'Hate Crime in England and Wales',
                frequency: 'annual',
                url: 'https://www.gov.uk/government/statistics/hate-crime-england-and-wales',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-bytype" className="mb-12">
            <LineChart
              title="Hate crime by monitored strand, England and Wales, 2018–2024"
              subtitle="Recorded hate crimes by motivating characteristic. Race hate crime shown at full scale; disability and sexual orientation shown together for comparison."
              series={byTypeSeries}
              yLabel="Recorded offences"
              source={{
                name: 'Home Office',
                dataset: 'Hate Crime in England and Wales — supplementary tables',
                frequency: 'annual',
                url: 'https://www.gov.uk/government/statistics/hate-crime-england-and-wales',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The data on disability hate crime</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>Disability hate crime recorded by police has risen 260% since 2013 — from 3,355 to 12,035 offences in the year ending March 2024.<Cite nums={1} /> This rise is real but partly reflects structural changes: successive government reviews have encouraged police forces to improve recording practices for all hate crime strands, and what was previously dismissed or recorded without a hate motivation flag is now more reliably captured. The Crime Survey for England and Wales estimates actual incidents at approximately 70,000 per year, suggesting only around 17% are reported to police.<Cite nums={2} /></p>
              <p>Justice outcomes remain strikingly poor. The prosecution rate for disability hate crime stands at around 9%, compared with 14% for race hate crime — a persistent gap that reflects both structural under-recording and a tendency within the criminal justice system to take disability motivation less seriously as an aggravating factor.<Cite nums={3} /> The sentencing uplift for disability hostility is applied far less consistently than for race, and disability hate crime convictions are less likely to attract enhanced sentences. Disabled People's Organisations have called for a standalone disability hate crime offence.</p>
              <p>A particularly serious category is "mate crime" — where perpetrators befriend people with learning disabilities or autism to exploit them financially or physically. Victims may not recognise the abuse as criminal, and family members and carers may not identify the pattern. These cases are among the hardest to prosecute and are systematically underrepresented in recorded crime data.</p>
            </div>
          </section>
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p><a href="https://www.gov.uk/government/statistics/hate-crime-england-and-wales" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Home Office</a> — Hate Crime in England and Wales. Published annually.</p>
            <p>ONS — Crime Survey for England and Wales. Estimated incidents are self-reported hate crime from CSEW interviews and represent a substantially higher figure than police-recorded data.</p>
            <p>Charge rate calculated from Home Office crime outcomes data as charges/summons as a proportion of all recorded disability hate crime offences.</p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
