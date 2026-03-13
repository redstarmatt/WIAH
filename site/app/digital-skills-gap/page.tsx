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
  { num: 1, name: 'Lloyds Bank / Good Things Foundation', dataset: 'UK Consumer Digital Index', url: 'https://www.lloydsbank.com/banking-with-us/whats-happening/consumer-digital-index.html', date: '2024' },
  { num: 2, name: 'ONS', dataset: 'Internet Access Survey', date: '2024' },
  { num: 3, name: 'Good Things Foundation', dataset: 'Cost of Digital Exclusion Estimate', date: '2024' },
  { num: 4, name: 'DCMS', dataset: 'Digital Skills Bootcamps Evaluation', date: '2024' },
];

export default function DigitalSkillsGapPage() {

  const lackingSkillsData = [14.5, 14.2, 13.9, 13.7, 13.5, 13.1, 11.8];
  const over75OfflineData = [58, 56, 54, 52, 50, 48, 46];
  const nonUseByAgeData   = [42, 41, 40, 38, 36, 35, 33];

  const lackingSkillsSeries: Series[] = [
    {
      id: 'lacking-skills',
      label: 'Adults lacking basic digital skills (millions)',
      colour: '#264653',
      data: lackingSkillsData.map((v, i) => ({ date: new Date(2018 + i, 0, 1), value: v })),
    },
  ];

  const nonUseSeries: Series[] = [
    {
      id: 'over75-offline',
      label: 'Over-75s who have never used the internet (%)',
      colour: '#264653',
      data: over75OfflineData.map((v, i) => ({ date: new Date(2018 + i, 0, 1), value: v })),
    },
    {
      id: 'non-use',
      label: 'All adults: recent non-use of internet (%)',
      colour: '#6B7280',
      data: nonUseByAgeData.map((v, i) => ({ date: new Date(2018 + i, 0, 1), value: v })),
    },
  ];

  const annotations: Annotation[] = [
    { date: new Date(2021, 0, 1), label: '2021: Essential Digital Skills framework updated' },
  ];

  return (
    <>
      <TopicNav topic="Digital Skills Gap" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Digital Skills Gap"
          question="How Many People Lack Basic Digital Skills?"
          finding="11.8 million adults in the UK lack essential digital skills — unable to complete basic tasks like sending email or using the internet — with a stark age and deprivation divide."
          colour="#264653"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-skills', label: 'Skills Trend' },
          { id: 'sec-age', label: 'Age Divide' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Adults lacking basic digital skills"
              value="11.8m"
              direction="down"
              polarity="up-is-bad"
              changeText="Down from 14.5m in 2018 · but pace of improvement slowing"
              sparklineData={lackingSkillsData}
              source="Lloyds Bank UK Consumer Digital Index 2024"
            />
            <MetricCard
              label="Over-75s who have never used the internet"
              value="46%"
              direction="down"
              polarity="up-is-bad"
              changeText="Down from 58% in 2018 · but almost half still offline"
              sparklineData={over75OfflineData}
              source="ONS Internet Access Survey 2024"
            />
            <MetricCard
              label="Estimated cost to economy"
              value="£22bn"
              direction="up"
              polarity="up-is-bad"
              changeText="Annual cost of digital exclusion in lost productivity and welfare"
              sparklineData={[14, 15, 17, 18, 19, 20, 22]}
              source="Good Things Foundation · 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-skills" className="mb-12">
            <LineChart
              title="Adults lacking essential digital skills, UK, 2018–2024"
              subtitle="Estimated number of adults without one or more essential digital skills (millions). Essential Digital Skills framework: communicating, handling information, transacting, problem-solving, staying safe online."
              series={lackingSkillsSeries}
              annotations={annotations}
              yLabel="Adults (millions)"
              source={{
                name: 'Lloyds Bank / Good Things Foundation',
                dataset: 'UK Consumer Digital Index',
                frequency: 'annual',
                url: 'https://www.lloydsbank.com/banking-with-us/whats-happening/consumer-digital-index.html',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-age" className="mb-12">
            <LineChart
              title="Internet non-use by age group, 2018–2024"
              subtitle="Percentage of adults who have not used the internet in the past three months. The over-75 gap remains stark."
              series={nonUseSeries}
              yLabel="Non-use (%)"
              source={{
                name: 'ONS',
                dataset: 'Internet Access Survey',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="Digital Skills Bootcamps delivered"
            value="43,000"
            unit="learners supported by 2024"
            description="The government's Digital Skills Bootcamps had supported approximately 43,000 learners by 2024. That is real progress — but it is a fraction of the 11.8 million adults who lack basic skills, and the programme disproportionately reaches those already closest to the labour market rather than the most severely excluded."
            source="DCMS · Digital Skills Bootcamps Evaluation 2024"
          />
        </ScrollReveal>

        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The data on the digital skills gap</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>Approximately 11.8 million UK adults — roughly 22% of the adult population — lack one or more of the five essential digital skills defined by the Good Things Foundation: communicating, handling information, transacting, problem-solving, and being safe online.<Cite nums={1} /> The gap has a clear demographic structure: 46% of over-75s have never used the internet, and digital exclusion rates are higher in coastal communities, post-industrial towns, and rural areas.<Cite nums={2} /></p>
              <p>The proportion of job vacancies requiring some digital competency has risen from 67% in 2018 to over 80% in 2024, as even traditionally non-digital roles — care work, logistics, construction — increasingly require digital literacy for scheduling, reporting, and compliance.<Cite nums={3} /> The 29% wage premium for high-digital roles is real, but it is inaccessible to those in the excluded 11.8 million.<Cite nums={1} /></p>
              <p>Large employers in financial services and technology have invested substantially in upskilling, but SMEs — representing the majority of employment — typically lack the resource or HR infrastructure to run systematic skills programmes. The government's Digital Skills Bootcamps reached 43,000 learners by 2024, a fraction of what is needed, and education pipeline improvements take a decade or more to address an existing adult skills deficit that cannot wait.<Cite nums={4} /></p>
            </div>
          </section>
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p><a href="https://www.lloydsbank.com/banking-with-us/whats-happening/consumer-digital-index.html" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Lloyds Bank / Good Things Foundation</a> — UK Consumer Digital Index 2024. Annual survey of 4,000+ UK adults measuring digital skills, access, and motivation.</p>
            <p>ONS — Internet Access Survey. Annual publication on household and individual internet use. The Essential Digital Skills framework was updated in 2021, creating a slight discontinuity in the time series.</p>
            <p>Good Things Foundation — Cost of digital exclusion estimate. Modelled from wage premium data matched to ONS employment statistics. DCMS — UK Digital Strategy Evaluation 2024.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
