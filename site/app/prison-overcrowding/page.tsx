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
  { num: 1, name: 'Ministry of Justice', dataset: 'Prison Population Statistics', url: 'https://www.gov.uk/government/collections/prison-population-statistics', date: '2024' },
  { num: 2, name: 'HM Inspectorate of Prisons', dataset: 'Annual Report 2023/24', url: 'https://www.justiceinspectorates.gov.uk/hmiprisons/', date: '2024' },
  { num: 3, name: 'Prison Officers\' Association', dataset: 'Safe Operating Capacity Guidance', date: '2023', url: 'https://www.poauk.org.uk/' },
  { num: 4, name: 'Ministry of Justice', dataset: 'End of Custody Supervised Licence Statistics', url: 'https://www.gov.uk/government/collections/prison-population-statistics', date: '2024' },
  { num: 5, name: 'Ministry of Justice', dataset: 'Proven Reoffending Statistics', url: 'https://www.gov.uk/government/statistics/proven-reoffending-statistics-quarterly-bulletin-england-and-wales', date: '2024' },
];

export default function PrisonOvercrowdingPage() {
  const colour = '#E63946';

  // Prison population vs usable capacity 2010–2024
  const populationData = [84725, 86048, 84421, 85509, 85961, 85862, 86584, 83539, 82781, 78837, 79027, 84246, 87000, 88000, 88728];
  const capacityData =   [84523, 86065, 87012, 86986, 87110, 86400, 86500, 85800, 85200, 84900, 84500, 85000, 86000, 87500, 89600];

  const populationSeries: Series[] = [
    {
      id: 'population',
      label: 'Prison population',
      colour: colour,
      data: populationData.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
    },
    {
      id: 'capacity',
      label: 'Usable operational capacity',
      colour: '#6B7280',
      data: capacityData.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
    },
  ];

  const populationAnnotations: Annotation[] = [
    { date: new Date(2020, 0, 1), label: '2020: COVID early releases' },
    { date: new Date(2023, 8, 1), label: '2023: Emergency early release scheme' },
  ];

  // Overcrowding by prison category 2018–2024
  const categoryAData = [95, 97, 95, 96, 94, 97, 99];
  const categoryBData = [100, 101, 103, 104, 102, 107, 110];
  const categoryCData = [103, 105, 107, 108, 106, 111, 115];

  const categorySeries: Series[] = [
    {
      id: 'cat-a',
      label: 'Category A (high security)',
      colour: '#264653',
      data: categoryAData.map((v, i) => ({ date: new Date(2018 + i, 0, 1), value: v })),
    },
    {
      id: 'cat-b',
      label: 'Category B (training)',
      colour: colour,
      data: categoryBData.map((v, i) => ({ date: new Date(2018 + i, 0, 1), value: v })),
    },
    {
      id: 'cat-c',
      label: 'Category C (resettlement)',
      colour: '#F4A261',
      data: categoryCData.map((v, i) => ({ date: new Date(2018 + i, 0, 1), value: v })),
    },
  ];

  return (
    <>
      <TopicNav topic="Prison Overcrowding" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Prison Overcrowding"
          question="How Overcrowded Are Britain's Prisons?"
          finding="England and Wales prisons are at 99% capacity — 88 prisons are overcrowded — and the system is chronically short of 10,000 places, forcing early release schemes."
          colour={colour}
          preposition="in"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Overview' },
          { id: 'sec-population', label: 'Population vs Capacity' },
          { id: 'sec-categories', label: 'By Category' },
        ]} />

        <section id="sec-metrics" className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Prison capacity utilisation (%)"
              value="99"
              direction="up"
              polarity="up-is-bad"
              changeText="2024 · 88 prisons overcrowded · system short 10,000 places"
              sparklineData={[98, 99, 97, 98, 99, 98, 93, 92, 93, 94, 99, 99, 102, 99]}
              source="Ministry of Justice — Prison Population Statistics, 2024"
            />
            <MetricCard
              label="Prisons officially overcrowded (count)"
              value="88"
              direction="up"
              polarity="up-is-bad"
              changeText="2024 · up from 67 in 2019 · worst since records began"
              sparklineData={[72, 75, 70, 74, 72, 67, 58, 62, 68, 74, 79, 83, 86, 88]}
              source="Ministry of Justice — Prison Population Statistics, 2024"
            />
            <MetricCard
              label="Early releases per year (thousands)"
              value="10.1"
              direction="up"
              polarity="up-is-bad"
              changeText="2024 · emergency scheme activated Sep 2023 · prisoners freed weeks early"
              sparklineData={[0, 0, 0, 0, 0, 0, 0.4, 0, 0, 0.2, 2.1, 5.3, 8.2, 10.1]}
              source="Ministry of Justice — End of Custody Supervised Licence, 2024"
            />
          </div>
        </section>

        <ScrollReveal>
          <section id="sec-population" className="mb-12">
            <LineChart
              title="Prison population vs usable operational capacity, 2010–2024"
              subtitle="England and Wales. Usable operational capacity is the number of prisoners that can be held safely."
              series={populationSeries}
              annotations={populationAnnotations}
              yLabel="Number of prisoners"
              source={{
                name: 'Ministry of Justice',
                dataset: 'Prison Population Statistics',
                frequency: 'monthly',
                url: 'https://www.gov.uk/government/collections/prison-population-statistics',
                date: 'Jan 2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-categories" className="mb-12">
            <LineChart
              title="Prison occupancy by category, 2018–2024 (%)"
              subtitle="England and Wales. Percentage of operational capacity in use. 100% = full. Category C prisons hold the majority of the sentenced population."
              series={categorySeries}
              yLabel="Occupancy (%)"
              source={{
                name: 'Ministry of Justice',
                dataset: 'Prison Population Statistics — capacity and overcrowding',
                frequency: 'quarterly',
                url: 'https://www.gov.uk/government/collections/prison-population-statistics',
                date: 'Jan 2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="What's being done"
            value="10,000"
            unit="new prison places under construction — the largest programme since the Victorian era"
            description="The government has committed to building six new prisons as part of a programme to create 10,000 additional prison places. HMP Fosse Way in Leicestershire opened in 2023, adding 1,700 places. The Independent Sentencing Review (2025), chaired by David Gauke, is examining alternatives to short custodial sentences to reduce pressure from recall prisoners — who account for 16% of the total prison population. Electronic monitoring has been extended, with 200,000 tags deployed annually. The Probation Service received a £155 million investment to improve supervision and reduce reoffending post-release."
            source="Source: Ministry of Justice — Prison Population Statistics 2024; HMPPS — Annual Report 2023/24."
          />
        </ScrollReveal>

        <ScrollReveal>
          <section className="max-w-2xl mb-12 mt-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">What the data shows</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>England and Wales hold 88,728 prisoners in an estate built for around 89,600 usable places — but usable capacity is a ceiling, not a comfortable operating level.<Cite nums={1} /> The Prison Officers' Association and HM Inspectorate of Prisons both consider 90% occupancy to be safe;<Cite nums={[2, 3]} /> at 99%, double-bunking in cells designed for one person is routine, rehabilitation programmes are cancelled through lack of space, and violence rates rise sharply. In 2023, the government activated the End of Custody Supervised Licence scheme for the first time since 2010, releasing prisoners up to 18 days before their scheduled date.<Cite nums={4} /></p>
              <p>The overcrowding crisis is most severe in Category C training and resettlement prisons, which are running at 115% of certified normal accommodation.<Cite nums={1} /> These are the prisons where most sentenced adults serve most of their time — the overcrowding directly undermines rehabilitation. Category A high-security prisons sit at 99% capacity, which is itself unprecedented: these establishments were historically held below 90% to maintain the separation of dangerous prisoners.<Cite nums={2} /> The remand population — prisoners awaiting trial rather than serving sentences — hit a record 16,400 in 2024, a direct consequence of the Crown Court backlog.<Cite nums={1} /></p>
              <p>New prison construction is the government's primary response, but building a prison takes a decade. The six new prisons currently in planning and construction will add approximately 10,000 places by the late 2020s at the earliest.<Cite nums={1} /> In the interim, the Ministry of Justice has expanded use of police cells under Operation Safeguard, temporarily held prisoners in court-custody suites, and cancelled planned maintenance programmes. The reoffending rate — 60% within two years for those serving sentences under twelve months — means the system keeps refilling.<Cite nums={5} /></p>
            </div>
          </section>
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p><a href="https://www.gov.uk/government/collections/prison-population-statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Ministry of Justice — Prison Population Statistics</a> — monthly. Primary source for population and capacity figures.</p>
            <p><a href="https://www.gov.uk/government/collections/her-majestys-prison-and-probation-service-annual-report-and-accounts" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">HMPPS Annual Report</a> — annual. Staff numbers, assaults, deaths in custody.</p>
            <p><a href="https://www.gov.uk/government/statistics/safety-in-custody-statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Ministry of Justice — Safety in Custody Statistics</a> — quarterly. Self-harm and assault data.</p>
            <p>All figures are for England and Wales unless otherwise stated. Capacity figures use certified normal accommodation (CNA) and in-use certified normal accommodation (ICNA) as published by HMPPS.</p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
