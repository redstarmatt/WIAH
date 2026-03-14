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

// Bus passenger journeys outside London (billions), 2010–2024
const outsideLondonData = [3.30, 3.25, 3.22, 3.18, 3.14, 3.10, 3.06, 3.00, 2.95, 2.90, 1.85, 2.50, 2.65, 2.68, 2.60];

// Bus passenger journeys in London (billions), 2010–2024
const londonData = [2.40, 2.42, 2.45, 2.47, 2.45, 2.44, 2.43, 2.41, 2.38, 2.36, 1.30, 1.80, 2.00, 2.10, 2.15];

// Local authority bus subsidy spending (£m real terms), 2010–2024
const laSpendingData = [1120, 1060, 1000, 940, 890, 840, 790, 740, 700, 660, 640, 630, 620, 685, 720];

// Cumulative subsidised routes cut since 2010
const routesCutData = [0, 200, 400, 600, 900, 1200, 1500, 1800, 2100, 2400, 2600, 2700, 2800, 2900, 3000];

const journeysSeries: Series[] = [
  {
    id: 'outsideLondon',
    label: 'Outside London (billion journeys)',
    colour: '#E63946',
    data: outsideLondonData.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
  },
  {
    id: 'london',
    label: 'London (billion journeys)',
    colour: '#264653',
    data: londonData.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
  },
];

const subsidySeries: Series[] = [
  {
    id: 'laSpending',
    label: 'LA bus subsidies (£m real terms)',
    colour: '#264653',
    data: laSpendingData.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
  },
  {
    id: 'routesCut',
    label: 'Cumulative routes cut (2010 = 0)',
    colour: '#E63946',
    data: routesCutData.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
  },
];

const journeysAnnotations: Annotation[] = [
  { date: new Date(2020, 0, 1), label: '2020: COVID-19 collapse' },
  { date: new Date(2023, 0, 1), label: '2023: Bus Back Better launched' },
];

const subsidyAnnotations: Annotation[] = [
  { date: new Date(2010, 0, 1), label: '2010: Spending cuts begin' },
  { date: new Date(2017, 0, 1), label: '2017: Bus Services Act' },
];

const editorialRefs: Reference[] = [
  { num: 1, name: 'Department for Transport', dataset: 'Bus Statistics England', url: 'https://www.gov.uk/government/collections/bus-statistics', date: '2024' },
  { num: 2, name: 'Campaign for Better Transport', dataset: 'Bus Route Cuts report', url: 'https://bettertransport.org.uk/research/buses/', date: 'March 2026' },
  { num: 3, name: 'DfT', dataset: 'Bus Back Better: National Bus Strategy', url: 'https://www.gov.uk/government/publications/bus-back-better', date: 'March 2026' },
];

export default function BusServicesPage() {
  return (
    <>
      <TopicNav topic="Bus Services" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Transport & Infrastructure"
          question="What Has Happened to Britain's Buses?"
          finding="Bus passenger journeys outside London have fallen 21% since 2010, with 3,000 subsidised routes cut as local authority funding dropped 40% in real terms. Many rural areas now have no bus service at all. The pandemic caused a further collapse from which recovery has been only partial."
          colour="#264653"
          preposition="with"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Bus services outside London have been in structural decline for over a decade, driven by a sustained reduction in local authority subsidies following the 2010 spending review. Real-terms LA spending on bus support fell from £1.12 billion in 2010 to £660 million by 2019 — a 41% cut — resulting in over 3,000 subsidised routes being withdrawn or significantly reduced.<Cite nums={[1, 2]} /> In London, where Transport for London controls and funds bus services directly, the network has remained broadly stable. But the contrast between London's relatively comprehensive bus coverage and the sparse, erratic provision in many English cities, towns, and rural areas is stark. Areas with no regular bus service have risen steadily as marginal routes were withdrawn.</p>
            <p>The pandemic caused a catastrophic collapse in ridership — journeys outside London fell from 2.9 billion in 2019 to 1.85 billion in 2020.<Cite nums={1} /> Emergency government funding kept services running, but recovery has been partial. By 2024, journeys outside London stood at around 2.6 billion, still 11% below pre-pandemic levels, and significantly below the 3.3 billion of 2010.<Cite nums={1} /> The government's £3 billion Bus Back Better programme, combined with new franchising powers available to Combined Authorities, has stabilised networks in Greater Manchester and West Yorkshire but has not yet reversed the long-run decline in most of England.<Cite nums={3} /> The question for the next decade is whether re-regulation — taking routes back into public control as Manchester has done — can rebuild the reliable, affordable networks that make public transport a genuine alternative to the car.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Journeys' },
          { id: 'sec-chart2', label: 'Subsidies & Routes' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Journeys outside London"
              value="2.6bn"
              unit="per year (2024)"
              direction="down"
              polarity="up-is-good"
              changeText="Down 21% since 2010 · pandemic collapse partially recovered"
              sparklineData={[3.30, 3.22, 3.14, 3.06, 2.95, 1.85, 2.50, 2.65, 2.60]}
              source="DfT · Bus Statistics England 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Subsidised routes cut since 2010"
              value="3,000+"
              unit="routes"
              direction="up"
              polarity="up-is-bad"
              changeText="Local authority funding down 40% since 2010"
              sparklineData={[200, 400, 900, 1200, 1800, 2400, 2700, 2900, 3000]}
              source="Campaign for Better Transport · Bus Report 2024"
              href="#sec-chart2"
            />
            <MetricCard
              label="Rural areas with no bus service"
              value="~40%"
              unit="of rural areas"
              direction="up"
              polarity="up-is-bad"
              changeText="Rising as marginal routes cut · estimated from route data"
              sparklineData={[20, 22, 25, 27, 29, 31, 33, 35, 37, 40]}
              source="Campaign for Better Transport · 2024"
              href="#sec-chart1"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Bus passenger journeys, England, 2010–2024"
              subtitle="Annual bus passenger journeys in England outside London (red) and London (dark). London is funded under a different system and has maintained ridership far better."
              series={journeysSeries}
              annotations={journeysAnnotations}
              yLabel="Billion journeys"
              source={{ name: 'Department for Transport', dataset: 'Bus Statistics England', url: 'https://www.gov.uk/government/collections/bus-statistics', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Local authority bus subsidy spending and routes cut, 2010–2024"
              subtitle="Real-terms (2024 prices) LA spending on bus service support (dark) and cumulative subsidised routes cut since 2010 (red). Falling subsidies drive route cuts."
              series={subsidySeries}
              annotations={subsidyAnnotations}
              yLabel="£m / routes"
              source={{ name: 'DfT / Campaign for Better Transport', dataset: 'Bus Route Cuts and LA Spending', url: 'https://bettertransport.org.uk/research/buses/', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Manchester's Bee Network: 160 million journeys in year one"
            value="£3bn"
            unit="Bus Back Better programme"
            description="The government committed £3 billion through the Bus Back Better programme. Combined Authorities in Greater Manchester, West Yorkshire, and the West Midlands have used new franchising powers to re-regulate networks, stabilise timetables, and cap fares. Manchester's Bee Network carried 160 million bus journeys in its first year of operation — a 20% increase on pre-franchising levels — demonstrating that coordinated public investment and integrated ticketing can rebuild ridership even in a car-dominated urban area."
            source="Source: DfT — Bus Back Better programme data 2025. Transport for Greater Manchester — Bee Network Annual Report 2024."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.gov.uk/government/collections/bus-statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Department for Transport — Bus Statistics England</a> — passenger journey data by region. Retrieved March 2026.</p>
            <p><a href="https://bettertransport.org.uk/research/buses/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Campaign for Better Transport — Bus Route Cuts report</a> — cumulative route withdrawal analysis. Retrieved March 2026.</p>
            <p><a href="https://www.gov.uk/government/publications/bus-back-better" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DfT — Bus Back Better: National Bus Strategy</a> — programme commitments and progress. Retrieved March 2026.</p>
            <p className="mt-2">LA subsidy spending is deflated to 2024 prices using the GDP deflator. Routes cut is estimated from DfT local transport statistics and Campaign for Better Transport annual route audits. London figures are for Transport for London-controlled services only and are funded through a different mechanism.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
