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
  { num: 1, name: 'Natural England', dataset: 'Biodiversity Net Gain Statistics', url: 'https://www.gov.uk/government/collections/biodiversity-net-gain', date: 'Q4 2025' },
  { num: 2, name: 'DEFRA', dataset: 'Biodiversity Metric Outcomes Monitoring', url: 'https://www.gov.uk/guidance/biodiversity-net-gain', date: '2025' },
  { num: 3, name: 'Environment Bank', dataset: 'Market transaction data', url: 'https://www.environmentbank.com', date: '2025' },
];

// Planning permissions with BNG conditions (cumulative), 2019–2025
const bngPermissions = [120, 380, 820, 1900, 4200, 8700, 12400];
// Biodiversity units traded (annual), 2019–2025
const unitsTraded = [800, 2200, 5100, 9800, 18000, 29000, 38000];
// Habitat created or restored (hectares cumulative), 2019–2025
const habitatHa = [280, 820, 1800, 3400, 5500, 7100, 8450];
// Median credit price (£k per unit), 2019–2025
const creditPriceK = [12, 14, 16, 20, 28, 36, 42];

const permissionsSeries: Series[] = [
  {
    id: 'permissions',
    label: 'Planning permissions with BNG conditions (cumulative)',
    colour: '#2A9D8F',
    data: bngPermissions.map((v, i) => ({ date: new Date(2019 + i, 0, 1), value: v })),
  },
];

const marketSeries: Series[] = [
  {
    id: 'units',
    label: 'Biodiversity units traded per year',
    colour: '#264653',
    data: unitsTraded.map((v, i) => ({ date: new Date(2019 + i, 0, 1), value: v })),
  },
  {
    id: 'price',
    label: 'Median credit price (£k per unit)',
    colour: '#F4A261',
    data: creditPriceK.map((v, i) => ({ date: new Date(2019 + i, 0, 1), value: v })),
  },
];

const permissionsAnnotations: Annotation[] = [
  { date: new Date(2021, 0, 1), label: '2021: Environment Act passes' },
  { date: new Date(2024, 0, 1), label: '2024: Mandatory BNG — major sites' },
  { date: new Date(2025, 0, 1), label: '2025: Mandatory BNG — small sites' },
];

const marketAnnotations: Annotation[] = [
  { date: new Date(2024, 0, 1), label: '2024: Statutory BNG market opens' },
];

export default function HabitatNetGainPage() {
  return (
    <>
      <TopicNav topic="Nature & Environment" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Nature & Environment"
          question="Is Biodiversity Net Gain Delivering for Nature?"
          finding="Mandatory biodiversity net gain came into force in February 2024, requiring a 10% net improvement for all major planning applications. Over 12,400 permissions have applied the standard and 8,450 hectares of habitat created — but questions remain about quality and enforcement."
          colour="#2A9D8F"
          preposition="with"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>England's biodiversity net gain policy is one of the most ambitious attempts anywhere in the world to price nature into the development process. Since February 2024, every major planning application in England must demonstrate that it will leave biodiversity in a measurably better state than before development began — a minimum 10% net gain measured using the DEFRA biodiversity metric. Small sites followed in February 2025. The result is a new market: developers who cannot achieve the 10% gain on-site can purchase biodiversity units from landowners who create or restore habitat elsewhere. Over 38,000 biodiversity units have now been traded, habitat banks are emerging across the country, and a statutory register administered by Natural England tracks obligations and outcomes.<Cite nums={[1, 3]} /></p>
            <p>The scale of uptake is genuinely encouraging — over 12,400 planning permissions have applied mandatory BNG conditions, and 8,450 hectares of new or restored habitat are now under 30-year management plans.<Cite nums={[1, 2]} /> Land managers in marginal agricultural areas are finding that biodiversity credits, at a median price of £42,000 per unit, can offer more reliable income than conventional farming.<Cite nums={3} /> But serious structural challenges remain. Local planning authorities are struggling to assess BNG applications competently after a decade of austerity stripped ecological expertise from councils. Quality of offsite credits is contested: ecologists warn that newly planted hedgerows cannot compensate for loss of ancient woodland. And BNG addresses only development-related biodiversity loss — it does nothing about agricultural intensification or water pollution, which together account for the vast majority of nature decline.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'BNG Permissions' },
          { id: 'sec-chart2', label: 'Unit Market' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Planning permissions with BNG conditions"
              value="12,400"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="Mandatory from Feb 2024 (major) and Feb 2025 (small sites)"
              sparklineData={bngPermissions.slice(-8)}
              source="Natural England · BNG Statistics Q4 2025"
              href="#sec-chart1"
            />
            <MetricCard
              label="Biodiversity units traded annually"
              value="38,000"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="Median price £42k per unit · statutory market from 2024"
              sparklineData={unitsTraded.slice(-8)}
              source="Natural England / Environment Bank 2025"
              href="#sec-chart2"
            />
            <MetricCard
              label="Habitat created or restored"
              value="8,450 ha"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="Under 30-year management plans · equivalent to 12,000 football pitches"
              sparklineData={habitatHa.slice(-8)}
              source="DEFRA · Biodiversity Metric Outcomes 2025"
              href="#sec-chart1"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Planning permissions with biodiversity net gain conditions, England, 2019–2025"
              subtitle="Cumulative planning permissions with mandatory or voluntary BNG conditions. Mandatory for major developments from February 2024, small sites from February 2025."
              series={permissionsSeries}
              annotations={permissionsAnnotations}
              yLabel="Permissions (cumulative)"
              source={{ name: 'Natural England', dataset: 'Biodiversity Net Gain Statistics', url: 'https://www.gov.uk/government/collections/biodiversity-net-gain', frequency: 'quarterly', date: 'Q4 2025' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Biodiversity units traded and median credit price, England, 2019–2025"
              subtitle="Annual statutory and voluntary biodiversity unit transactions (blue) and median credit price in £ thousands per unit (amber). Demand and prices both rising sharply since mandatory requirement."
              series={marketSeries}
              annotations={marketAnnotations}
              yLabel="Units traded / £k per unit"
              source={{ name: 'Natural England / Environment Bank', dataset: 'Biodiversity unit market transactions', url: 'https://www.gov.uk/guidance/biodiversity-net-gain', frequency: 'quarterly', date: '2025' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="New economic incentives for nature-positive land management"
            value="£42k"
            unit="median biodiversity credit price per unit — more than many farm incomes"
            description="Biodiversity net gain has created a genuine economic incentive for nature recovery at a scale no previous conservation policy achieved. At a median price of £42,000 per unit, biodiversity credits can offer landowners in marginal agricultural areas more reliable income than conventional farming. Habitat banks — landowners creating and selling credits in advance of development demand — are emerging as a new asset class, with major financial institutions beginning to enter the market. The 30-year management obligation secured through planning conditions represents the longest-horizon conservation commitment yet embedded in the English planning system. The Lawton principles — more, bigger, better, joined-up — are beginning to find an economic vehicle."
            source="Source: Natural England — BNG Register Q4 2025. DEFRA — Biodiversity Metric Outcomes Monitoring 2025. Environment Bank market data 2025."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.gov.uk/government/collections/biodiversity-net-gain" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Natural England — Biodiversity Net Gain Statistics</a> — Planning permission and register data. Retrieved 2025.</p>
            <p><a href="https://www.gov.uk/guidance/biodiversity-net-gain" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DEFRA — Biodiversity Metric Outcomes Monitoring</a> — Habitat creation and restoration data. Retrieved 2025.</p>
            <p><a href="https://www.environmentbank.com" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Environment Bank — Market transaction data</a> — Biodiversity unit prices and volumes. Retrieved 2025.</p>
            <p>All figures are for England. Pre-2024 data includes voluntary BNG adoptions only. Credit prices are median transaction prices and vary significantly by habitat type and geography. Hectares of habitat are cumulative totals under active 30-year management agreements secured through planning conditions or legal agreements.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
