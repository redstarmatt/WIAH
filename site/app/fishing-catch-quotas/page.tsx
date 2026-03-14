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

// UK fishing catch (thousand tonnes), 2015–2023 — MMO
const catchValues = [700, 680, 660, 640, 620, 580, 620, 640, 630];

// UK quota utilisation (%), 2015–2023 — MMO
const quotaUtilValues = [68, 67, 66, 65, 64, 62, 65, 67, 66];

// UK fish landed in UK ports (thousand tonnes), 2015–2023 — MMO
const landedUKValues = [430, 420, 410, 400, 390, 370, 385, 390, 385];

const catchSeries: Series[] = [
  {
    id: 'catch',
    label: 'UK fishing catch (thousand tonnes)',
    colour: '#264653',
    data: catchValues.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
  {
    id: 'landed-uk',
    label: 'Fish landed in UK ports (thousand tonnes)',
    colour: '#2A9D8F',
    data: landedUKValues.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
];

const quotaSeries: Series[] = [
  {
    id: 'quota-utilisation',
    label: 'UK quota utilisation (%)',
    colour: '#F4A261',
    data: quotaUtilValues.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
];

const catchAnnotations: Annotation[] = [
  { date: new Date(2021, 0, 1), label: '2021: Brexit — UK regains fishing control' },
];

const editorialRefs: Reference[] = [
  { num: 1, name: 'MMO', dataset: 'UK sea fisheries statistics', url: 'https://www.gov.uk/government/statistics/uk-sea-fisheries-annual-statistics-report', date: '2023' },
  { num: 2, name: 'MMO', dataset: 'UK quota management data', url: 'https://www.gov.uk/government/collections/uk-sea-fisheries-annual-statistics', date: '2023' },
  { num: 3, name: 'JNCC', dataset: 'Marine Protected Areas: network analysis', url: 'https://jncc.gov.uk/our-work/marine-protected-areas/', date: '2024' },
];

export default function FishingCatchQuotasPage() {
  return (
    <>
      <TopicNav topic="Fishing & Quotas" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Fishing & Quotas"
          question="Did Brexit Actually Help British Fishing?"
          finding="UK fishing catch is around 630,000 tonnes — broadly flat since Brexit. The UK uses only 66% of its post-Brexit quotas. Landings in UK ports have fallen rather than risen. The fishing industry gained sovereignty over quotas but faces ongoing market access and labour challenges."
          colour="#264653"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Brexit was presented in part as an opportunity to 'take back control' of UK waters and revitalise the fishing industry, which had been a focal point of sovereignty arguments in the referendum campaign. The UK-EU Trade and Cooperation Agreement (TCA) of January 2021 gave the UK increased quota shares for certain species over a five-and-a-half-year adjustment period. However, the practical benefits have been more limited than advocates predicted. UK fishing catch has been broadly flat since Brexit, at around 630,000 tonnes per year<Cite nums={1} />, and the quota utilisation rate — the proportion of allocated quota actually fished — has remained around 65–67%<Cite nums={2} />, meaning UK vessels are not catching everything they are entitled to.</p>
            <p>The reasons are structural rather than political. UK fishing capacity has declined over decades: there are not enough vessels, enough crew, or enough processing capacity to catch the additional quota. The industry also faces a severe labour shortage following the end of free movement, as many crew members were EU nationals. Export challenges have been significant: around 70% of UK-caught fish is exported, primarily to the EU<Cite nums={1} />, but new border paperwork, checks, and delays added costs and spoilage risks, particularly for high-value shellfish. Scottish shellfish exporters, who depend on rapid overnight delivery to European markets, were among the hardest hit. The longer-term trajectory of fishing depends partly on stock health — North Sea cod remains at historically low levels.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Catch and landings' },
          { id: 'sec-chart2', label: 'Quota utilisation' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="UK fishing catch"
              value="630,000 t"
              unit=""
              direction="flat"
              polarity="neutral"
              changeText="Flat since Brexit · no post-Brexit expansion"
              sparklineData={[700, 680, 660, 640, 620, 580, 620, 640, 630]}
              source="MMO · UK sea fisheries statistics 2023"
              href="#sec-chart1"
            />
            <MetricCard
              label="Quota utilisation"
              value="66%"
              unit=""
              direction="flat"
              polarity="neutral"
              changeText="UK not fishing its full quota entitlement · capacity constraints"
              sparklineData={[68, 67, 66, 65, 64, 62, 65, 67, 66]}
              source="MMO · UK quota management 2023"
              href="#sec-chart2"
            />
            <MetricCard
              label="Fish landed in UK ports"
              value="385,000 t"
              unit=""
              direction="down"
              polarity="neutral"
              changeText="Slightly down from pre-Brexit levels · exports dominate"
              sparklineData={[430, 420, 410, 400, 390, 370, 385, 390, 385]}
              source="MMO · UK sea fisheries statistics 2023"
              href="#sec-chart1"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="UK fishing catch and landings in UK ports, 2015–2023"
              subtitle="Total UK vessel catch (thousand tonnes) and fish landed at UK ports. Both broadly flat — Brexit has not produced a measurable increase in fishing activity."
              series={catchSeries}
              annotations={catchAnnotations}
              yLabel="Thousand tonnes"
              source={{ name: 'MMO', dataset: 'UK sea fisheries statistics', url: 'https://www.gov.uk/government/statistics/uk-sea-fisheries-annual-statistics-report', frequency: 'annual', date: '2023' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="UK fishing quota utilisation, 2015–2023"
              subtitle="Percentage of UK-allocated fishing quotas actually fished by UK vessels. Consistently below 70%, meaning significant unused entitlement. Capacity and crew shortages are the main constraints."
              series={quotaSeries}
              annotations={[]}
              yLabel="Quota utilisation (%)"
              source={{ name: 'MMO', dataset: 'UK quota management data', url: 'https://www.gov.uk/government/collections/uk-sea-fisheries-annual-statistics', frequency: 'annual', date: '2023' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Marine Protected Areas cover 38% of UK waters"
            value="38%"
            description="The UK now has the largest network of Marine Protected Areas (MPAs) in the world by coverage — approximately 38% of UK waters have some form of protection status. Post-Brexit, the UK introduced new fisheries legislation under the Fisheries Act 2020, requiring fishing to be managed sustainably. Inshore Fisheries and Conservation Authorities (IFCAs) have increased byelaw protections. Scientific evidence shows that well-enforced no-take or low-take zones can rebuild fish stocks significantly within five to ten years, potentially increasing sustainable yields for the entire industry. The challenge is enforcement: the Marine Management Organisation (MMO) has limited patrol vessel capacity."
            source="Source: MMO — UK sea fisheries statistics 2023. JNCC — Marine Protected Areas: network analysis 2024."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.gov.uk/government/statistics/uk-sea-fisheries-annual-statistics-report" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">MMO — UK sea fisheries statistics</a> — annual report on UK fishing vessel activity, catches by species, landings by port, and quota utilisation.</p>
            <p><a href="https://www.gov.uk/government/collections/uk-sea-fisheries-annual-statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">MMO — UK quota management data</a> — quarterly data on quota allocation and uptake for each species and fishing area.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
