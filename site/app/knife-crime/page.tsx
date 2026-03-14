'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'Home Office', dataset: 'Crime Outcomes in England and Wales 2024', url: 'https://www.gov.uk/government/statistics/crime-outcomes-in-england-and-wales-statistics', date: '2024' },
  { num: 2, name: 'NHS Digital', dataset: 'Hospital Episode Statistics — Admitted Patient Care 2024', url: 'https://digital.nhs.uk/data-and-information/publications/statistical/hospital-admitted-patient-care-activity', date: '2024' },
  { num: 3, name: 'Home Office', dataset: 'Violence Reduction Units Evaluation', url: 'https://www.gov.uk/government/publications/violence-reduction-units', date: '2023' },
];

export default function KnifeCrimePage() {
  // Knife crime offences recorded by police, England & Wales, 2014–2024
  const knifeCrimeOffences = [28757, 31836, 32468, 35674, 39818, 43516, 46265, 49027, 48716, 50489, 50200];
  // Hospital admissions for assault with sharp object, 2014–2024
  const hospitalAdmissions = [3800, 4100, 4300, 4700, 5200, 5700, 6200, 6600, 6300, 6800, 6900];

  const chart1Series: Series[] = [
    {
      id: 'offences',
      label: 'Knife crime offences',
      colour: '#E63946',
      data: knifeCrimeOffences.map((v, i) => ({ date: new Date(2014 + i, 0, 1), value: v })),
    },
  ];

  const chart1Annotations: Annotation[] = [
    { date: new Date(2014, 0, 1), label: '2014: Recording improvements' },
    { date: new Date(2019, 0, 1), label: '2019: Violence reduction units launched' },
    { date: new Date(2020, 0, 1), label: '2020: COVID lockdowns' },
  ];

  const chart2Series: Series[] = [
    {
      id: 'hospital',
      label: 'Hospital admissions for stab wounds',
      colour: '#E63946',
      data: hospitalAdmissions.map((v, i) => ({ date: new Date(2014 + i, 0, 1), value: v })),
    },
  ];

  return (
    <>
      <TopicNav topic="Knife Crime" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Knife Crime"
          question="Is Knife Crime Getting Worse?"
          finding="Knife crime offences reached a record 50,489 in 2023 — up 77% since 2014 — with young men aged 18–24 the most likely victims and perpetrators."
          colour="#E63946"
          preposition="on"
        />

        <section className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Knife crime offences per year"
              value="50,489"
              direction="up"
              polarity="up-is-bad"
              changeText="+77% since 2014 · record high in 2023"
              sparklineData={knifeCrimeOffences}
              source="Home Office — Crime outcomes in England and Wales, 2024"
            />
            <MetricCard
              label="Change since 2014 (%)"
              value="+77%"
              direction="up"
              polarity="up-is-bad"
              changeText="from 28,757 in 2014 to 50,489 in 2023"
              sparklineData={knifeCrimeOffences}
              source="Home Office — Crime outcomes in England and Wales, 2024"
            />
            <MetricCard
              label="Hospital admissions for stab wounds"
              value="6,900"
              direction="up"
              polarity="up-is-bad"
              changeText="+82% since 2014 · NHS treating consequences"
              sparklineData={hospitalAdmissions}
              source="NHS Digital — Hospital Episode Statistics, 2024"
            />
          </div>
        </section>

        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="Knife crime offences recorded by police, England & Wales, 2014–2024"
              subtitle="Includes possession, threat, and use of a knife or blade. Trend partly reflects improved recording."
              series={chart1Series}
              annotations={chart1Annotations}
              yLabel="Offences"
              source={{
                name: 'Home Office',
                dataset: 'Crime outcomes in England and Wales',
                frequency: 'annual',
                url: 'https://www.gov.uk/government/statistics/crime-outcomes-in-england-and-wales-statistics',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="Hospital admissions for assault with sharp object, 2014–2024"
              subtitle="England. NHS data provides an independent measure of serious knife violence."
              series={chart2Series}
              yLabel="Hospital admissions"
              source={{
                name: 'NHS Digital',
                dataset: 'Hospital Episode Statistics — Admitted Patient Care',
                frequency: 'annual',
                url: 'https://digital.nhs.uk/data-and-information/publications/statistical/hospital-admitted-patient-care-activity',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">Understanding the trend</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>Knife crime offences recorded by the police have risen sharply since 2014, reaching a record 50,489 in 2023.<Cite nums={1} /> Part of this increase reflects improved police recording practices introduced after a series of high-profile cases — but the NHS hospital admissions data, which is independent of police recording, has also risen substantially, suggesting the increase in serious violence is real.<Cite nums={2} /></p>
              <p>Young men aged 18–24 are both the most likely victims and perpetrators. London and other major metropolitan areas account for a disproportionate share of incidents, though smaller towns have seen faster percentage growth. The geography of knife crime closely tracks areas of concentrated deprivation, gang activity, and drug market competition.</p>
              <p>Violence Reduction Units — modelled on Glasgow's public health approach — were launched in 18 police force areas in 2019.<Cite nums={3} /> Early evidence suggests they reduce serious violence in the areas they target, but funding has been uncertain and coverage patchy. The overall national trend has not yet reversed.</p>
            </div>
          </section>
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p><a href="https://www.gov.uk/government/statistics/crime-outcomes-in-england-and-wales-statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Home Office — Crime outcomes in England and Wales</a>. Annual. Retrieved 2024.</p>
            <p><a href="https://digital.nhs.uk/data-and-information/publications/statistical/hospital-admitted-patient-care-activity" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS Digital — Hospital Episode Statistics</a>. Annual. Retrieved 2024.</p>
            <p>Knife crime figures cover England and Wales. Hospital admissions cover England only. Knife crime offences include possession of a bladed article as well as offences involving use or threat.</p>
          </div>
        </section>
      </main>
    </>
  );
}
