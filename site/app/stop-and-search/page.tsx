'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'Home Office', dataset: 'Stop and Search Statistics, England and Wales', url: 'https://www.gov.uk/government/statistics/police-powers-and-procedures-stop-and-search-and-arrests-england-and-wales', date: '2024', note: 'Black people 52 per 1,000; 6.5x white rate; 1.29M total searches in 2023/24' },
  { num: 2, name: 'HMICFRS', dataset: 'PEEL Inspection — Stop and Search', url: 'https://www.justiceinspectorates.gov.uk/hmicfrs/', date: '2021', note: '28% of searches not based on reasonable grounds; arrest rate ~17%' },
  { num: 3, name: 'College of Policing', dataset: 'Stop and Search Evidence Review', url: 'https://www.college.police.uk/', date: '2021', note: 'No consistent relationship between stop and search intensity and crime rates' },
];

const blackRateData = [38, 36, 34, 31, 29, 27, 26, 29, 35, 42, 52];
const whiteRateData = [7, 6, 6, 5, 5, 4, 4, 5, 6, 7, 8];

const ratesBySeries: Series[] = [
  {
    id: 'black',
    label: 'Black people (per 1,000)',
    colour: '#E63946',
    data: blackRateData.map((v, i) => ({ date: new Date(2014 + i, 0, 1), value: v })),
  },
  {
    id: 'white',
    label: 'White people (per 1,000)',
    colour: '#6B7280',
    data: whiteRateData.map((v, i) => ({ date: new Date(2014 + i, 0, 1), value: v })),
  },
];

const ratesAnnotations: Annotation[] = [
  { date: new Date(2019, 0, 1), label: '2019: Police powers expanded' },
  { date: new Date(2021, 0, 1), label: '2021: HMICFRS critical report' },
];

const totalSearchesData = [1150, 1050, 980, 900, 860, 790, 740, 820, 950, 1100, 1290];

const totalSeries: Series[] = [
  {
    id: 'total',
    label: 'Total stop and searches (thousands)',
    colour: '#6B7280',
    data: totalSearchesData.map((v, i) => ({ date: new Date(2014 + i, 0, 1), value: v })),
  },
];

const totalAnnotations: Annotation[] = [
  { date: new Date(2014, 0, 1), label: '2014: Section 60 reforms' },
  { date: new Date(2019, 0, 1), label: '2019: Police powers extended' },
];

export default function StopAndSearchPage() {
  return (
    <>
      <TopicNav topic="Stop and Search" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Stop and Search"
          question="Is Stop and Search Applied Fairly?"
          finding="Black people are 6× more likely to be stopped and searched than white people — and the gap has widened since 2019 — despite stop and search having no proven crime-reduction effect."
          colour="#6B7280"
          preposition="on"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Key numbers' },
          { id: 'sec-rates', label: 'Rates by ethnicity' },
          { id: 'sec-total', label: 'Total searches' },
        ]} />

        <section id="sec-metrics" className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Stop and search rate — Black people (per 1,000)"
              value="52"
              direction="up"
              polarity="up-is-bad"
              changeText="2023/24 · Up from 26 in 2019 · Highest rate since records began · 6× the white rate"
              sparklineData={[29, 27, 26, 29, 35, 42, 52]}
              source="Home Office — Stop and Search Statistics, 2024"
            />
            <MetricCard
              label="Stop and search rate — white people (per 1,000)"
              value="8"
              direction="up"
              polarity="up-is-bad"
              changeText="2023/24 · Up from 4 in 2019 · Also rising but from a much lower base"
              sparklineData={[4, 4, 4, 5, 6, 7, 8]}
              source="Home Office — Stop and Search Statistics, 2024"
            />
            <MetricCard
              label="Racial disparity ratio (Black:white)"
              value="6.5×"
              direction="up"
              polarity="up-is-bad"
              changeText="2023/24 · Up from 4× in 2014 · Gap widening, not closing · No proven crime-reduction effect"
              sparklineData={[5.4, 6.0, 5.7, 5.8, 5.8, 6.0, 6.5]}
              source="Home Office — Stop and Search Statistics, 2024"
            />
          </div>
        </section>

        <ScrollReveal>
          <section id="sec-rates" className="mb-12">
            <LineChart
              title="Stop and search rate per 1,000 by ethnicity, 2014–2024"
              subtitle="Number of stop and searches per 1,000 people by self-identified ethnicity, England and Wales. The gap between Black and white rates has widened significantly since 2019."
              series={ratesBySeries}
              annotations={ratesAnnotations}
              yLabel="Searches per 1,000 people"
              source={{
                name: 'Home Office',
                dataset: 'Stop and Search Statistics, England and Wales',
                url: 'https://www.gov.uk/government/statistics/police-powers-and-procedures-stop-and-search-and-arrests-england-and-wales',
                frequency: 'annual',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-total" className="mb-12">
            <LineChart
              title="Total stop and searches, 2014–2024 (thousands)"
              subtitle="Total number of stop and searches conducted under all powers, England and Wales. Searches fell sharply after 2014 reforms, then rebounded from 2019."
              series={totalSeries}
              annotations={totalAnnotations}
              yLabel="Searches (thousands)"
              source={{
                name: 'Home Office',
                dataset: 'Stop and Search Statistics, England and Wales',
                url: 'https://www.gov.uk/government/statistics/police-powers-and-procedures-stop-and-search-and-arrests-england-and-wales',
                frequency: 'annual',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The data on stop and search</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>Black people in England and Wales are subjected to 52 stop and searches per 1,000 people per year — 6.5 times the rate for white people.<Cite nums={1} /> This disparity has widened since 2019, when the government extended police stop and search powers and the overall use of the power increased sharply. In 2023/24, there were 1.29 million stop and searches — up 74% from the 2018/19 low of 740,000.<Cite nums={1} /></p>
              <p>The evidence base for the effectiveness of stop and search in reducing crime is weak. A 2021 HMICFRS inspection found that 28% of searches were not based on reasonable grounds as required by law.<Cite nums={2} /> The arrest rate following a stop and search is around 17%, meaning the vast majority of people searched are innocent. Research by the College of Policing found no consistent relationship between stop and search intensity and crime rates across different force areas.<Cite nums={3} /></p>
              <p>The Macpherson Report (1999) made reducing racial disparity in stop and search a central recommendation. Twenty-five years later, the gap is wider than when the report was written. Black communities experience stop and search as both individually distressing and collectively corrosive to trust in the police — an effect that undermines the cooperation policing depends on to detect and prevent crime.</p>
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="What works instead"
            value="17%"
            unit="arrest rate from stop and searches — 83% of people stopped are found to be innocent"
            description="Violence Reduction Units (VRUs), introduced in 2019 in high-violence areas, use a public health approach to knife crime — diverting young people before they offend rather than searching them after. Early evaluations suggest VRUs are associated with reductions in serious youth violence. Community intelligence — relationships between police and local people — is consistently found to be more effective at detecting crime than suspicionless searches."
            source="Source: Home Office — Stop and Search Statistics 2023/24; HMICFRS — PEEL inspection 2021; College of Policing — Stop and Search evidence review."
          />
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p><a href="https://www.gov.uk/government/statistics/police-powers-and-procedures-stop-and-search-and-arrests-england-and-wales" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Home Office — Stop and Search Statistics</a> — primary data. Updated annually.</p>
            <p>Rates per 1,000 calculated using Census 2021 population estimates by self-identified ethnicity for England and Wales.</p>
            <p>All figures are for England and Wales. Ethnicity recorded at point of search using self-identification where provided, officer assessment otherwise.</p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
