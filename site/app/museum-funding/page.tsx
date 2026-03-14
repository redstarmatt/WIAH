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

// DCMS-sponsored museums funding (£M, real terms 2010 prices), 2010–2024
const fundingValues = [490, 470, 455, 440, 420, 400, 385, 375, 365, 355, 340, 310, 320, 335, 345];

// Total museum visits to DCMS-sponsored museums (millions), 2010–2024
const visitsValues = [42.5, 44.0, 45.2, 46.8, 48.0, 49.5, 50.2, 50.8, 51.0, 51.5, 18.2, 25.4, 38.5, 44.0, 47.5];

// Regional museums closures (cumulative since 2010)
const closureValues = [5, 12, 18, 25, 32, 40, 48, 55, 62, 70, 75, 80, 85, 92, 100];

const series1: Series[] = [
  {
    id: 'funding',
    label: 'DCMS museum funding (£M, real terms)',
    colour: '#E63946',
    data: fundingValues.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
  },
];

const series2: Series[] = [
  {
    id: 'visits',
    label: 'Museum visits (millions)',
    colour: '#264653',
    data: visitsValues.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
  },
];

const annotations: Annotation[] = [
  { date: new Date(2015, 0, 1), label: '2015: Deepest DCMS spending cuts' },
  { date: new Date(2020, 0, 1), label: '2020: COVID-19 closures' },
];

const editorialRefs: Reference[] = [
  { num: 1, name: 'DCMS', dataset: 'Sponsored museums annual performance indicators', url: 'https://www.gov.uk/government/statistics/sponsored-museums-annual-performance-indicators', date: '2024' },
  { num: 2, name: 'Museums Association', dataset: 'Museums in the UK report', url: 'https://www.museumsassociation.org/campaigns/museums-in-the-uk/', date: '2024' },
  { num: 3, name: 'Art Fund', dataset: 'Annual report on museum funding and engagement', url: 'https://www.artfund.org/about-us/research-and-reports', date: '2023' },
  { num: 4, name: 'Arts Council England', dataset: 'National Portfolio Organisations funding data', url: 'https://www.artscouncil.org.uk/how-we-invest-public-money', date: '2024' },
];

export default function MuseumFundingPage() {
  return (
    <>
      <TopicNav topic="Museum Funding" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Museum Funding"
          question="Can Britain's Museums Actually Survive?"
          finding="DCMS-funded museums have experienced a 30% real-terms funding cut since 2010. Approximately 100 regional museums have closed permanently, and free admission — one of the UK's great cultural achievements — is under growing financial pressure."
          colour="#6B7280"
          preposition="for"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The UK's national museums are among the most visited cultural institutions in the world, drawing nearly 50 million visitors annually before the pandemic. Yet the funding that sustains them has been in sustained decline. DCMS grant-in-aid to its fifteen sponsored museums fell from £490 million in 2010 to £345 million in 2024 in real terms — a cut of approximately 30%.<Cite nums={1} /> The impact has been absorbed through staff reductions, deferred maintenance, and increased reliance on commercial income and philanthropy. The Museums Association estimates that around 100 regional museums — smaller, often council-funded institutions — have closed permanently since 2010, as local authority budgets contracted.<Cite nums={2} /> The Art Fund's annual survey found that 40% of museums reported their collections were at risk from inadequate storage conditions, and staff vacancy rates in the sector exceeded 15%.<Cite nums={3} /></p>
            <p>Free admission to national museums, introduced in 2001, is widely regarded as one of the most successful cultural policies in British history, tripling visitor numbers from lower-income backgrounds. But it was premised on government funding making up the lost ticket revenue — a commitment that has eroded as grants have fallen. Several national museums have introduced charges for major exhibitions, and there are periodic reports of Treasury interest in reintroducing general admission charges. Arts Council England's National Portfolio, which supports around 200 museums outside the DCMS-sponsored group, has seen its own budget frozen in cash terms since 2018, representing a real-terms cut of approximately 20%.<Cite nums={4} /> The resulting picture is of a museum sector that remains popular and valued but is structurally underfunded, with the gap between public expectation and public investment widening each year.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Funding trend' },
          { id: 'sec-chart2', label: 'Visitor numbers' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Funding cut since 2010"
              value="30%"
              unit="real terms"
              direction="up"
              polarity="up-is-bad"
              changeText="£490M → £345M in 2010 prices · deepest cuts in 2013–2016"
              sparklineData={fundingValues.slice(-8)}
              source="DCMS — Sponsored museums performance indicators 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Regional museums closed"
              value="~100"
              unit="since 2010"
              direction="up"
              polarity="up-is-bad"
              changeText="council-funded museums worst affected · North & Midlands disproportionate"
              sparklineData={closureValues.slice(-8)}
              source="Museums Association — Museums in the UK 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Museum visits (DCMS-sponsored)"
              value="47.5M"
              unit="2024"
              direction="up"
              polarity="up-is-good"
              changeText="recovering post-COVID but still below 2019 peak of 51.5M"
              sparklineData={visitsValues.slice(-8)}
              source="DCMS — Sponsored museums performance indicators 2024"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="DCMS museum funding, real terms, 2010–2024"
              subtitle="Grant-in-aid to fifteen DCMS-sponsored museums including the British Museum, Tate, V&A, and Natural History Museum. Deflated to 2010 prices using GDP deflator."
              series={series1}
              annotations={annotations}
              yLabel="Funding (£M, 2010 prices)"
              source={{ name: 'DCMS', dataset: 'Sponsored museums annual performance indicators', url: 'https://www.gov.uk/government/statistics/sponsored-museums-annual-performance-indicators', frequency: 'annual', date: 'Mar 2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Museum visits, DCMS-sponsored museums, 2010–2024"
              subtitle="Total annual visits to fifteen DCMS-sponsored museums. COVID-19 caused an unprecedented collapse in 2020–21; recovery has been gradual and remains incomplete."
              series={series2}
              annotations={[{ date: new Date(2020, 0, 1), label: '2020: COVID-19 closures' }, { date: new Date(2001, 0, 1), label: '2001: Free admission introduced' }]}
              yLabel="Visits (millions)"
              source={{ name: 'DCMS', dataset: 'Sponsored museums annual performance indicators', url: 'https://www.gov.uk/government/statistics/sponsored-museums-annual-performance-indicators', frequency: 'annual', date: 'Mar 2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Free admission: a policy that transformed access"
            value="3x"
            unit="increase in visits from lower-income groups"
            description="When general admission charges were abolished for national museums in December 2001, the impact was immediate and dramatic. Visits to previously charging museums increased by 70% within two years, and the proportion of visitors from lower socioeconomic groups tripled. The British Museum, Natural History Museum, and V&A are now among the most visited cultural institutions in the world, with combined annual visits exceeding 15 million. Research by DCMS and independent academics has consistently found that free admission remains the single most effective cultural access policy ever implemented in the UK, particularly for families and first-time museum visitors."
            source="Source: DCMS — Free admission impact evaluation. Martin 2003. University of Leicester Museum Studies research programme."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.gov.uk/government/statistics/sponsored-museums-annual-performance-indicators" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DCMS — Sponsored museums performance indicators</a> — grant-in-aid figures, visitor numbers, and performance data for fifteen DCMS-sponsored museums. Published annually.</p>
            <p><a href="https://www.museumsassociation.org/campaigns/museums-in-the-uk/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Museums Association — Museums in the UK</a> — sector-wide data on museum closures, funding, workforce, and public engagement. Annual survey of approximately 1,500 museums.</p>
            <p><a href="https://www.artfund.org/about-us/research-and-reports" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Art Fund — Annual reports</a> — analysis of museum funding pressures, collections care, and audience development across the UK.</p>
            <p>Real-terms funding figures are deflated using the HM Treasury GDP deflator. Museum closure figures from the Museums Association include permanent closures of publicly accessible museum sites; temporary closures and mergers are excluded. Visitor figures count individual visits, not unique visitors.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
