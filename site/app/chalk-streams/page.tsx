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

// % of chalk streams in good ecological status (WFD), 2015–2024
const goodEcologyData = [8, 7.5, 7, 6.5, 6, 5.5, 5.5, 5, 5, 5];

// % of chalk stream catchments over-abstracted, 2015–2024
const overAbstractedData = [62, 62, 61, 61, 60, 60, 60, 60, 60, 59];

// Sewage discharge events on chalk stream catchments (thousands), 2016–2024
const sewageEventsData = [6.0, 7.0, 8.5, 9.8, 10.8, 11.5, 12.0, 12.5, 11.8];

// Abstraction licence reforms completed (cumulative), 2016–2024
const licenceReformsData = [12, 18, 25, 32, 40, 46, 52, 58, 65];

const ecologySeries: Series[] = [
  {
    id: 'goodEcology',
    label: 'Chalk streams in good ecological status (%)',
    colour: '#264653',
    data: goodEcologyData.map((v, i) => ({ date: new Date(2015 + i, 6, 1), value: v })),
  },
  {
    id: 'overAbstracted',
    label: 'Catchments over-abstracted (%)',
    colour: '#E63946',
    data: overAbstractedData.map((v, i) => ({ date: new Date(2015 + i, 6, 1), value: v })),
  },
];

const sewageSeries: Series[] = [
  {
    id: 'sewageEvents',
    label: 'Sewage discharge events on chalk catchments (thousands)',
    colour: '#E63946',
    data: sewageEventsData.map((v, i) => ({ date: new Date(2016 + i, 6, 1), value: v })),
  },
  {
    id: 'licenceReforms',
    label: 'Abstraction licence reforms completed (cumulative)',
    colour: '#2A9D8F',
    data: licenceReformsData.map((v, i) => ({ date: new Date(2016 + i, 6, 1), value: v })),
  },
];

const ecologyAnnotations: Annotation[] = [
  { date: new Date(2019, 6, 1), label: '2019: Environment Agency over-abstraction report published' },
  { date: new Date(2021, 6, 1), label: '2021: Chalk Stream Restoration Group Blueprint launched' },
];

const sewageAnnotations: Annotation[] = [
  { date: new Date(2016, 6, 1), label: '2016: EDM monitoring begins — reveals true scale' },
  { date: new Date(2022, 6, 1), label: '2022: Environment Act storm overflow duties commence' },
];

const editorialRefs: Reference[] = [
  { num: 1, name: 'Environment Agency', dataset: 'Water Framework Directive Classification', url: 'https://www.gov.uk/guidance/water-framework-directive-wfd-classification-status', date: '2024' },
  { num: 2, name: 'Environment Agency', dataset: 'Event Duration Monitoring', url: 'https://www.gov.uk/government/collections/water-quality-statistics', date: '2024' },
  { num: 3, name: 'Chalk Stream Restoration Group', dataset: 'Blueprint for Chalk Streams', url: 'https://chalkstreams.org/', date: '2021' },
];

export default function ChalkStreamsPage() {
  return (
    <>
      <TopicNav topic="Chalk Streams" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Environment"
          question="Are Britain's Unique Chalk Streams Being Destroyed?"
          finding="England holds 85% of the world's chalk streams — yet 95% are in poor ecological condition. Over-abstraction of groundwater for public supply, more than 12,000 annual sewage discharges on chalk catchments, and invasive species have devastated ecosystems that took millennia to form and cannot be recreated elsewhere on Earth."
          colour="#264653"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Chalk streams are among the rarest and most ecologically valuable freshwater habitats on Earth. They form where rainwater percolates through chalk downland, emerging as crystal-clear, mineral-rich springs with a remarkably stable temperature of around 10–11°C year-round. There are approximately 200 chalk rivers in the world, of which around 85% — roughly 160 rivers covering 4,000 kilometres — are in England, concentrated in Hampshire, Wiltshire, Dorset, Berkshire, Hertfordshire, and East Anglia. The Test, Itchen, Kennet, Avon, Ver, and Misbourne are among the best known. These rivers support unique communities of wildlife: water crowfoot meadows, wild brown trout and Atlantic salmon, white-clawed crayfish, water voles, otters, kingfishers, and rare invertebrates. The Chalk Stream Restoration Group estimated in 2021 that 95% of England's chalk streams are in poor condition, failing Water Framework Directive ecological standards.<Cite nums={[1, 3]} /></p>
            <p>Over-abstraction of groundwater is the most fundamental and chronic threat. Chalk aquifers feed chalk streams and are among the UK's most important water sources — Southern Water, Thames Water, and others abstract billions of litres daily to supply homes and industry in south-east England. When abstraction exceeds natural recharge, water tables fall, springs cease to flow, and rivers become intermittent. The Environment Agency classified 60% of chalk stream catchments as over-licensed or over-abstracted in 2023.<Cite nums={1} /> The Misbourne in Buckinghamshire, once a perennial chalk stream, now runs dry in its upper reaches for most of the year. Reforming abstraction licences has been a policy commitment for over two decades, but the EA's own assessment shows less than 20% of problematic licences had been reformed by 2024. Meanwhile, sewage discharge events on chalk catchments — measured by the EA's Event Duration Monitoring programme from 2016 — reached over 12,000 per year by 2022.<Cite nums={2} /></p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Ecological Status' },
          { id: 'sec-chart2', label: 'Sewage & Abstraction' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Chalk streams in good ecological status"
              value="5%"
              unit="2024"
              direction="flat"
              polarity="up-is-good"
              changeText="Target 100% — 95% failing WFD standards for 15+ years"
              sparklineData={[8, 7.5, 7, 6.5, 6, 5.5, 5.5, 5, 5, 5]}
              source="Environment Agency · WFD River Classification 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Chalk catchments over-abstracted"
              value="60%"
              unit="2024"
              direction="flat"
              polarity="up-is-bad"
              changeText="Groundwater below ecological minimums in dry years · Misbourne now intermittent"
              sparklineData={[62, 62, 61, 61, 60, 60, 60, 60, 60, 59]}
              source="Environment Agency · Water Stressed Areas 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Sewage events on chalk catchments"
              value="12,500"
              unit="per year (2022)"
              direction="up"
              polarity="up-is-bad"
              changeText="Rising since EDM monitoring began in 2016 · partly reflects better recording"
              sparklineData={[6.0, 7.0, 8.5, 9.8, 10.8, 11.5, 12.0, 12.5]}
              source="Environment Agency · Event Duration Monitoring 2022"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Chalk stream ecological health and over-abstraction, England, 2015–2024"
              subtitle="Percentage in good WFD ecological status (dark — target 100%) and percentage of catchments classified as over-abstracted (red). Both indicators show the structural failure of water resource management in chalk stream areas."
              series={ecologySeries}
              annotations={ecologyAnnotations}
              yLabel="Percentage (%)"
              source={{ name: 'Environment Agency', dataset: 'Water Framework Directive River Classification / Water Stressed Areas Assessment', url: 'https://www.gov.uk/guidance/water-framework-directive-wfd-classification-status', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Sewage discharge events and abstraction licence reforms, chalk streams, 2016–2024"
              subtitle="Annual sewage discharge events on chalk stream catchments (thousands, red) and cumulative abstraction licence reforms completed (green). Reform is occurring but far slower than the problem demands."
              series={sewageSeries}
              annotations={sewageAnnotations}
              yLabel="Events (000s) / Reforms (cumulative)"
              source={{ name: 'Environment Agency', dataset: 'Event Duration Monitoring / Abstraction Licence Reform Programme', url: 'https://www.gov.uk/government/collections/water-quality-statistics', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Wild salmon and water voles returning to restored chalk rivers"
            value="Test & Itchen"
            unit="Atlantic salmon recovering on Hampshire's finest chalk streams"
            description="The Test and Itchen — Hampshire's iconic chalk streams — support resurgent wild Atlantic salmon populations following headwater restoration by the Wild Trout Trust and abstraction reductions negotiated with Southern Water. Rewetting of wet meadows along Hampshire rivers has brought water voles back after decades of absence. The Chalk Stream Restoration Group's Blueprint for Chalk Streams provides a science-based roadmap for recovery involving abstraction reform, sewage improvement, and invasive species removal. The Environment Act 2021 imposed a new legal duty on water companies to reduce storm overflow discharges progressively, with the first enforcement action for chalk stream catchments in 2023."
            source="Source: Wild Trout Trust — chalk stream restoration monitoring 2024. Environment Agency — fish count surveys 2024."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.gov.uk/guidance/water-framework-directive-wfd-classification-status" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Environment Agency — Water Framework Directive Classification</a> — ecological status of all water bodies in England. Retrieved March 2026.</p>
            <p><a href="https://www.gov.uk/government/collections/water-quality-statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Environment Agency — Event Duration Monitoring</a> — sewage discharge events by water company and catchment. Retrieved March 2026.</p>
            <p><a href="https://chalkstreams.org/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Chalk Stream Restoration Group — Blueprint for Chalk Streams</a> — restoration roadmap and ecological baseline. Retrieved March 2026.</p>
            <p className="mt-2">Ecological status data covers all English chalk stream water bodies classified under the Water Framework Directive. Over-abstraction classification from EA water stressed areas assessment. Sewage events from EA EDM programme — monitoring coverage increased significantly from 2016, meaning some increase reflects better recording as well as genuine worsening. Abstraction licence reforms from EA Water Abstraction Plans.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
