'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import PositiveCallout from '@/components/PositiveCallout';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

export default function AddictionTreatmentOutcomesPage() {
  const colour = '#264653';

  // Drug treatment completions and successful exits 2015–2024
  const drugInTreatmentData   = [268, 271, 275, 278, 282, 285, 277, 280, 283, 288];
  const drugSuccessfulExitData = [44, 44, 45, 45, 46, 46, 45, 47, 48, 48];

  const drugAnnotations: Annotation[] = [
    { date: new Date(2018, 0, 1), label: '2018: Drug treatment budget cut 30%' },
    { date: new Date(2021, 0, 1), label: '2021: Dame Carol Black review' },
    { date: new Date(2022, 0, 1), label: '2022: £780m investment announced' },
  ];

  const drugSeries: Series[] = [
    {
      id: 'drug-in-treatment',
      label: 'In drug treatment (thousands)',
      colour: colour,
      data: drugInTreatmentData.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
    {
      id: 'drug-success',
      label: 'Successful treatment exits — drug-free (%)',
      colour: '#2A9D8F',
      data: drugSuccessfulExitData.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
  ];

  // Alcohol treatment outcomes 2015–2024
  const alcoholInTreatmentData   = [74, 76, 78, 80, 82, 84, 78, 82, 86, 90];
  const alcoholSuccessfulExitData = [68, 69, 70, 71, 72, 72, 71, 72, 73, 73];

  const alcoholAnnotations: Annotation[] = [
    { date: new Date(2020, 2, 1), label: '2020: COVID — treatment disruption' },
  ];

  const alcoholSeries: Series[] = [
    {
      id: 'alcohol-in-treatment',
      label: 'In alcohol treatment (thousands)',
      colour: colour,
      data: alcoholInTreatmentData.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
    {
      id: 'alcohol-success',
      label: 'Successful treatment exits — alcohol-free (%)',
      colour: '#2A9D8F',
      data: alcoholSuccessfulExitData.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
  ];

  return (
    <>
      <TopicNav topic="Addiction Treatment" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Addiction Treatment"
          question="Does Drug and Alcohol Treatment Work?"
          finding="Only 48% of people completing drug treatment leave free of dependence — but this rises to 73% for alcohol — and the treatment gap leaves 80% of dependent users with no support."
          colour={colour}
          preposition="in"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Overview' },
          { id: 'sec-drugs', label: 'Drug Treatment' },
          { id: 'sec-alcohol', label: 'Alcohol Treatment' },
        ]} />

        <section id="sec-metrics" className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Drug treatment — successful exits (%)"
              value="48"
              direction="up"
              polarity="up-is-good"
              changeText="2024 · up from 44% in 2015 · leaving treatment drug-free · opiates worst outcomes"
              sparklineData={[44, 44, 45, 45, 46, 46, 45, 47, 48, 48]}
              source="OHID — Adult substance misuse treatment statistics, 2024"
            />
            <MetricCard
              label="Alcohol treatment — successful exits (%)"
              value="73"
              direction="up"
              polarity="up-is-good"
              changeText="2024 · up from 68% in 2015 · significantly better outcomes than drug treatment"
              sparklineData={[68, 69, 70, 71, 72, 72, 71, 72, 73, 73]}
              source="OHID — Adult substance misuse treatment statistics, 2024"
            />
            <MetricCard
              label="Estimated treatment gap (%)"
              value="79"
              direction="down"
              polarity="down-is-bad"
              changeText="2024 · 79% of dependent drug users not in treatment · 73% of dependent drinkers untreated"
              sparklineData={[83, 82, 82, 81, 81, 81, 82, 81, 80, 79]}
              source="OHID / NDTMS — treatment need estimates, 2024"
            />
          </div>
        </section>

        <ScrollReveal>
          <section id="sec-drugs" className="mb-12">
            <LineChart
              title="Drug treatment: people in treatment and successful exits, England, 2015–2024"
              subtitle="Left axis: thousands in treatment. Right axis: % leaving treatment drug-free. A successful exit means completing treatment and not requiring re-presentation within 6 months."
              series={drugSeries}
              annotations={drugAnnotations}
              yLabel="In treatment (thousands) / Success rate (%)"
              source={{
                name: 'Office for Health Inequalities and Disparities (OHID)',
                dataset: 'Adult substance misuse treatment statistics',
                frequency: 'annual',
                url: 'https://www.gov.uk/government/collections/alcohol-and-drug-misuse-and-treatment-statistics',
                date: 'Dec 2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-alcohol" className="mb-12">
            <LineChart
              title="Alcohol treatment: people in treatment and successful exits, England, 2015–2024"
              subtitle="People in specialist alcohol treatment and percentage leaving treatment alcohol-free. Alcohol treatment achieves notably better outcomes than drug treatment."
              series={alcoholSeries}
              annotations={alcoholAnnotations}
              yLabel="In treatment (thousands) / Success rate (%)"
              source={{
                name: 'Office for Health Inequalities and Disparities (OHID)',
                dataset: 'Adult substance misuse treatment statistics',
                frequency: 'annual',
                url: 'https://www.gov.uk/government/collections/alcohol-and-drug-misuse-and-treatment-statistics',
                date: 'Dec 2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="The £780m investment"
            value="£780m"
            unit="invested in drug treatment services 2022–2025 — the largest uplift in a generation"
            description="Following Dame Carol Black's independent review (2021), the government committed £780 million over three years to transform drug treatment services in England. The investment funds 10,000 additional treatment places, improved workforce capacity and training, and housing support for people leaving treatment. Drug-related deaths — which reached a record 4,907 in England and Wales in 2021 — have begun to plateau. Naloxone distribution has been expanded. The number of people receiving opiate substitution therapy has increased. Early data suggests the investment is beginning to improve both treatment capacity and outcomes."
            source="Source: OHID — Adult substance misuse treatment statistics 2024; Dame Carol Black — Independent Review of Drugs (Parts 1 and 2), 2020–21."
          />
        </ScrollReveal>

        <ScrollReveal>
          <section className="max-w-2xl mb-12 mt-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">What the data shows</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>England has around 288,000 people in specialist drug treatment and 90,000 in alcohol treatment at any given time. These numbers represent a small fraction of total need: official estimates suggest around 315,000 people are dependent on opiates or crack cocaine, and 600,000 are dependent on alcohol at harmful levels. The &ldquo;treatment gap&rdquo; — the proportion of dependent users not in treatment — stands at approximately 79% for drugs and 73% for alcohol. Most people with addiction problems never access any specialist support.</p>
              <p>For those who do access treatment, outcomes vary significantly by substance. Alcohol treatment achieves relatively good outcomes: 73% of people completing alcohol treatment leave it alcohol-free. Drug treatment — particularly for opiate and crack cocaine dependency — is harder: overall successful exits run at around 48%, but this aggregates very different patterns. Non-opiate drug users achieve success rates above 65%; for opiate users, long-term opiate substitution therapy rather than abstinence is often the clinical goal, and &ldquo;success&rdquo; must be understood in terms of harm reduction rather than abstinence. Drug-related deaths — a direct consequence of untreated addiction — reached 4,907 in England and Wales in 2021 before beginning to plateau.</p>
              <p>The treatment system was cut severely between 2012 and 2020: the public health grant that funds local authority drug and alcohol services fell 24% in real terms over this period. Dame Carol Black's 2021 review found the system in a state of chronic underfunding, with depleted workforce capacity, inadequate housing support for people in recovery, and poor integration with criminal justice. The £780 million three-year investment announced in 2022 is the largest uplift in treatment funding in a generation. Early indicators suggest it is expanding capacity, though workforce shortages mean not all new places have been filled.</p>
            </div>
          </section>
        </ScrollReveal>

        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p><a href="https://www.gov.uk/government/collections/alcohol-and-drug-misuse-and-treatment-statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">OHID — Adult substance misuse treatment statistics</a> — annual. People in treatment, outcomes by substance.</p>
            <p><a href="https://www.gov.uk/government/statistics/drug-misuse-findings-from-the-2023-to-2024-csew" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ONS — Drug misuse in England and Wales</a> — annual. Prevalence estimates and need estimates.</p>
            <p><a href="https://www.gov.uk/government/publications/review-of-drugs-phase-two-report" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Dame Carol Black — Independent Review of Drugs 2021</a></p>
            <p>Successful treatment exit = person completes planned course of treatment and does not represent to services within 6 months. Treatment gap = estimated number dependent minus those in treatment, as a percentage of total estimated need. All figures are for England.</p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
