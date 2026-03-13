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

// BTR stock (thousands of completed units), 2016–2024
const btrStockData = [26, 34, 43, 54, 63, 73, 83, 97, 105];

// BTR pipeline (thousands of units), 2016–2024
const btrPipelineData = [89, 102, 124, 148, 173, 198, 222, 250, 268];

// BTR rent premium above market rate (%), 2016–2024
const premiumData = [4, 4, 5, 5, 6, 6, 7, 7, 7];

const btrSeries: Series[] = [
  {
    id: 'stock',
    label: 'BTR units in operation (thousands)',
    colour: '#264653',
    data: btrStockData.map((v, i) => ({ date: new Date(2016 + i, 0, 1), value: v })),
  },
  {
    id: 'pipeline',
    label: 'Units in pipeline (thousands)',
    colour: '#6B7280',
    data: btrPipelineData.map((v, i) => ({ date: new Date(2016 + i, 0, 1), value: v })),
  },
];

const premiumSeries: Series[] = [
  {
    id: 'premium',
    label: 'BTR rent premium above market rate (%)',
    colour: '#F4A261',
    data: premiumData.map((v, i) => ({ date: new Date(2016 + i, 0, 1), value: v })),
  },
];

const btrAnnotations: Annotation[] = [
  { date: new Date(2020, 0, 1), label: '2020: Institutional capital accelerates into BTR' },
  { date: new Date(2022, 0, 1), label: '2022: Rising rates squeeze development finance' },
];

const premiumAnnotations: Annotation[] = [];

const editorialRefs: Reference[] = [
  { num: 1, name: 'British Property Federation', dataset: 'Build to Rent Report', url: 'https://bpf.org.uk/what-we-do/residential/build-to-rent/', date: '2024' },
  { num: 2, name: 'Savills', dataset: 'UK Build to Rent Market Update', url: 'https://www.savills.co.uk/research_articles/229130/358001-0', date: '2024' },
  { num: 3, name: 'DLUHC', dataset: 'Private Rented Sector Survey', url: 'https://www.gov.uk/government/collections/private-rented-sector', date: 'March 2026' },
];

export default function BuildToRentSectorPage() {
  return (
    <>
      <TopicNav topic="Housing" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Housing"
          question="Who Is Building the Homes of the Future?"
          finding="The build-to-rent sector has grown to 105,000 completed units with 268,000 in the pipeline — a fourfold increase since 2016. But average BTR rents run 7% above comparable market-rate properties in the same postcode, raising questions about whether institutional landlords are adding supply or extracting premiums."
          colour="#6B7280"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Build-to-rent is the fastest-growing segment of the UK housing market, expanding from around 26,000 purpose-built units in 2016 to approximately 105,000 operational units by 2024, with a further 268,000 in the development pipeline.<Cite nums={1} /> Backed by institutional capital from pension funds and real estate investment trusts, BTR developments offer features the fragmented private rental market cannot match — professional management, longer tenancies, in-house maintenance. But analysis consistently finds rents running approximately 7% above comparable market-rate properties in the same postcode.<Cite nums={2} /> In cities where BTR has concentrated, notably Manchester and Birmingham, institutional landlords now account for a significant share of all rental supply.<Cite nums={1} /> The planning policy debate turns on whether BTR adds net supply or displaces mixed-tenure developments that would have included a higher proportion of affordable homes.</p>
            <p>The distributional consequences are emerging but not yet fully understood. Evidence from the United States and Germany — where institutional rental housing has a longer history — suggests professional management standards improve, but rents in landlord-concentrated cities tend to rise faster than in comparable markets. BTR development is heavily urban and city-centre focused, meaning its supply benefits primarily reach higher-income renters while mid-market and family-sized rental supply in suburban areas remains dominated by small private landlords whose numbers are shrinking as buy-to-let becomes less financially viable.<Cite nums={3} /> The decisions now being made on planning obligations, rent regulation, and permitted development rights will shape the character of Britain's rental market for decades.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Sector Growth' },
          { id: 'sec-chart2', label: 'Rent Premium' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="BTR completed stock"
              value="105,000"
              unit="units (2024)"
              direction="up"
              polarity="up-is-good"
              changeText="Quadrupled since 2016 · new institutional supply mode"
              sparklineData={[26, 34, 43, 54, 63, 73, 83, 97, 105]}
              source="BPF · Build to Rent Report 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="BTR pipeline"
              value="268,000"
              unit="units"
              direction="up"
              polarity="up-is-good"
              changeText="Significant investor interest · planning pipeline key"
              sparklineData={[89, 102, 124, 148, 173, 198, 222, 250, 268]}
              source="BPF · Build to Rent Report 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="BTR rent premium"
              value="7%"
              unit="above market rate"
              direction="up"
              polarity="up-is-bad"
              changeText="Up from 4% in 2016 · amenity premium or monopoly rent?"
              sparklineData={[4, 4, 5, 5, 6, 6, 7, 7, 7]}
              source="Savills · UK BTR Market Update 2024"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Build-to-rent sector growth: stock and pipeline, 2016–2024"
              subtitle="Completed BTR units in operation and units in development pipeline. Thousands. UK. Sector has grown fourfold in eight years backed by institutional investment."
              series={btrSeries}
              annotations={btrAnnotations}
              yLabel="Units (thousands)"
              source={{ name: 'British Property Federation', dataset: 'Build to Rent Report', url: 'https://bpf.org.uk/what-we-do/residential/build-to-rent/', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="BTR rent premium above comparable market-rate properties, 2016–2024"
              subtitle="Average percentage by which BTR rents exceed comparable privately let properties in the same postcode. Premium has grown as the sector matured and amenity levels increased."
              series={premiumSeries}
              annotations={premiumAnnotations}
              yLabel="Premium (%)"
              source={{ name: 'Savills', dataset: 'UK Build to Rent Market Update', url: 'https://www.savills.co.uk/research_articles/229130/358001-0', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Professional management raises standards for renters"
            value="92%"
            unit="BTR tenants satisfied with management"
            description="BTR tenants consistently report higher satisfaction with management responsiveness, maintenance turnaround times, and lease flexibility than private rental sector tenants. Average BTR tenancy lengths are 2.8 years, compared with 1.9 years in the wider PRS. Zero-deposit options are available in 74% of BTR schemes. For renters who can afford the premium, BTR offers genuine improvements in the tenancy experience that the fragmented small-landlord sector cannot reliably provide."
            source="Source: British Property Federation — BTR Resident Survey 2024. Savills — UK Build to Rent Market Update 2024."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://bpf.org.uk/what-we-do/residential/build-to-rent/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">British Property Federation — Build to Rent Report</a> — annual sector census of completed stock and pipeline. Retrieved March 2026.</p>
            <p><a href="https://www.savills.co.uk/research_articles/229130/358001-0" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Savills — UK Build to Rent Market Update</a> — quarterly research including rent premium analysis. Retrieved March 2026.</p>
            <p><a href="https://www.gov.uk/government/collections/private-rented-sector" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DLUHC — Private Rented Sector Survey</a> — annual housing market data. Retrieved March 2026.</p>
            <p className="mt-2">BTR defined as purpose-built private rental developments of 20 or more units retained in single institutional ownership. Excludes single-family BTR (houses rather than flats) unless specified. Pipeline includes units with planning permission, under construction, or in pre-application stage.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
