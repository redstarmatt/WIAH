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

// Creative industries GVA £bn, 2010–2024
const creativeGvaValues = [84, 87, 91, 95, 99, 104, 109, 111, 115, 119, 115, 106, 116, 124, 131];

// Grassroots music venues, 2012–2024
const grassrootsValues = [1050, 1030, 1000, 970, 950, 920, 880, 850, 820, 780, 640, 660, 700];

// Creative sector employment (thousands), 2010–2024
const employmentValues = [1680, 1720, 1760, 1810, 1870, 1930, 1980, 2020, 2060, 2100, 1940, 2010, 2080, 2130, 2180];

const series1: Series[] = [
  {
    id: 'creative-gva',
    label: 'Creative industries GVA (£bn)',
    colour: '#E63946',
    data: creativeGvaValues.map((v, i) => ({ date: new Date(2010 + i, 5, 1), value: v })),
  },
];

const series2: Series[] = [
  {
    id: 'grassroots',
    label: 'Grassroots music venues',
    colour: '#E63946',
    data: grassrootsValues.map((v, i) => ({ date: new Date(2012 + i, 5, 1), value: v })),
  },
  {
    id: 'employment',
    label: 'Creative employment (thousands, scaled ÷10)',
    colour: '#264653',
    data: employmentValues.map((v, i) => ({ date: new Date(2010 + i, 5, 1), value: v / 10 })),
  },
];

const annotations1: Annotation[] = [
  { date: new Date(2016, 5, 1), label: '2016: Brexit vote — sector uncertainty' },
  { date: new Date(2020, 2, 1), label: '2020: COVID devastates live events' },
  { date: new Date(2023, 5, 1), label: '2023: AI threatens creative livelihoods' },
];

const annotations2: Annotation[] = [
  { date: new Date(2012, 5, 1), label: '2012: 1,050 grassroots venues open' },
  { date: new Date(2020, 2, 1), label: '2020: COVID closures — 400 venues lost' },
];

const editorialRefs: Reference[] = [
  { num: 1, name: 'DCMS', dataset: 'Creative Industries Economic Estimates', url: 'https://www.gov.uk/government/collections/creative-industries-economic-estimates', date: '2024' },
  { num: 2, name: 'Music Venue Trust', dataset: 'Venue Census 2024', url: 'https://musicvenuetrust.com', date: '2024' },
  { num: 3, name: 'Ukie', dataset: 'UK Video Games Industry Statistics', url: 'https://ukie.org.uk', date: '2024' },
  { num: 4, name: 'DCMS', dataset: 'Creative Industries Sector Vision 2023', url: 'https://www.gov.uk/government/collections/creative-industries-economic-estimates', date: '2023' },
];

export default function CreativeIndustriesPage() {
  return (
    <>
      <TopicNav topic="Creative Industries" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Culture"
          question="What Is Actually Happening to the Creative Economy?"
          finding="The UK creative industries generate £131 billion annually and employ 2.2 million people — but grassroots music venues have fallen from 1,050 to under 700 since 2012. COVID wiped out a third of remaining venues, and AI now threatens the freelance workforce that underpins the sector."
          colour="#E63946"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The UK creative industries — film, television, music, games, advertising, fashion, architecture, publishing — generated £131 billion in GVA in 2024, making Britain one of the world's leading creative economies.<Cite nums={1} /> Yet the sector's foundations are cracking. Grassroots music venues, where tomorrow's artists develop, have fallen from over 1,050 in 2012 to under 700 today — a 33% collapse driven by rising rents, business rates, and the long tail of COVID closures.<Cite nums={2} /> In London alone, 35% of grassroots venues have closed since 2010.<Cite nums={2} /> Without affordable rehearsal rooms and small venues, the pipeline of talent that feeds major labels, touring artists, and the festival economy disappears.</p>
            <p>The freelance workforce — 47% of all creative sector workers — was hit hardest by the pandemic.<Cite nums={1} /> Many left permanently for more stable employment. The explosion of generative AI in 2023–24 now threatens the illustration, copywriting, music composition, and voice acting roles that sustained the mid-tier. The government's Creative Industries Sector Vision (2023) set ambitious growth targets but provides limited protection for the grassroots ecosystem or freelance workforce.<Cite nums={4} /> Tax relief schemes for film, animation, and games have driven genuine inward investment but do not reach the self-employed musician or the community arts organisation.<Cite nums={3} /></p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Sector GVA' },
          { id: 'sec-chart2', label: 'Venues & Employment' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Creative industries GVA"
              value="£131bn"
              unit="2024"
              direction="up"
              polarity="up-is-good"
              changeText="+56% since 2010 · 5% of UK economy · 2.2M jobs"
              sparklineData={[91, 95, 99, 104, 109, 115, 106, 116, 124, 131]}
              source="DCMS — Creative Industries Economic Estimates 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Grassroots music venues"
              value="~700"
              unit="2024"
              direction="down"
              polarity="down-is-bad"
              changeText="down 33% from 1,050 in 2012 · 400 closed since 2020"
              sparklineData={[1000, 970, 950, 920, 880, 850, 820, 780, 640, 700]}
              source="Music Venue Trust — Venue Census 2024"
              href="#sec-chart2"
            />
            <MetricCard
              label="Creative sector employment"
              value="2.18M"
              unit="2024"
              direction="up"
              polarity="up-is-good"
              changeText="recovered post-COVID · 47% are freelance · AI threat growing"
              sparklineData={[1870, 1930, 1980, 2020, 2060, 1940, 2010, 2080, 2130, 2180]}
              source="DCMS — Creative Industries Economic Estimates 2024"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Creative industries GVA, UK, 2010–2024"
              subtitle="Gross value added by DCMS-defined creative industries (£bn, current prices). The sector has grown strongly despite Brexit uncertainty and COVID disruption, but the freelance workforce and grassroots infrastructure face structural pressure."
              series={series1}
              annotations={annotations1}
              yLabel="GVA (£ billions)"
              source={{ name: 'DCMS', dataset: 'Creative Industries Economic Estimates', url: 'https://www.gov.uk/government/collections/creative-industries-economic-estimates', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Grassroots music venues and creative employment, 2012–2024"
              subtitle="Grassroots music venue count and creative industries employment (thousands, scaled ÷10 for comparison). COVID caused catastrophic venue closures; employment recovered but venues did not."
              series={series2}
              annotations={annotations2}
              yLabel="Venues / Employment (÷10)"
              source={{ name: 'Music Venue Trust / DCMS', dataset: 'Venue Census; Creative Industries Economic Estimates', url: 'https://musicvenuetrust.com', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="UK games industry: £7bn and growing"
            value="£7bn"
            unit="UK games industry GVA, 2024"
            description="The UK video games industry generated £7 billion in 2024 — the third largest in the world — supported by a Video Games Tax Relief that has leveraged £1.15 billion in investment since 2014. Over 2,500 studios operate across the UK, from large publishers to indie developers. The games sector is one of the few creative sub-sectors where AI is being absorbed as a development tool rather than a replacement threat. The Creative Industries Sector Vision targets £50 billion in GVA from the creative economy by 2030, and the games industry is among the most likely to hit that target."
            source="Source: Ukie — UK Video Games Industry Statistics 2024. DCMS — Creative Industries Sector Vision 2023."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.gov.uk/government/collections/creative-industries-economic-estimates" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DCMS — Creative Industries Economic Estimates</a> — GVA and employment by sub-sector. Annual. 2024.</p>
            <p><a href="https://musicvenuetrust.com" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Music Venue Trust — Venue Census</a> — grassroots music venue count and closures. Annual. 2024.</p>
            <p><a href="https://ukie.org.uk" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Ukie — UK Video Games Industry Statistics</a> — games sector GVA and employment. Annual. 2024.</p>
            <p>GVA figures are in current prices. Creative industries are defined per DCMS 2015 classification. Employment includes employed and self-employed. Venue counts are from Music Venue Trust census; actual closures may be higher as not all venues are registered.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
