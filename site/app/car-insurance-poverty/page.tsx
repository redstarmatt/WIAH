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

// Average annual car insurance premium (£), 2016–2024
const avgPremiumData = [465, 475, 490, 515, 500, 475, 520, 585, 924];

// Average young driver (18yr) premium (£), 2016–2024
const youngDriverData = [1500, 1550, 1600, 1650, 1700, 1680, 1800, 1900, 2800];

const premiumSeries: Series[] = [
  {
    id: 'avgPremium',
    label: 'Average premium (£/year)',
    colour: '#E63946',
    data: avgPremiumData.map((v, i) => ({ date: new Date(2016 + i, 0, 1), value: v })),
  },
  {
    id: 'youngDriver',
    label: 'Young driver premium age 18 (£/year)',
    colour: '#F4A261',
    data: youngDriverData.map((v, i) => ({ date: new Date(2016 + i, 0, 1), value: v })),
  },
];

// Estimated uninsured drivers (thousands), 2016–2024
const uninsuredData = [800, 810, 820, 835, 845, 855, 870, 910, 1020];

const uninsuredSeries: Series[] = [
  {
    id: 'uninsured',
    label: 'Estimated uninsured drivers (thousands)',
    colour: '#264653',
    data: uninsuredData.map((v, i) => ({ date: new Date(2016 + i, 0, 1), value: v })),
  },
];

const premiumAnnotations: Annotation[] = [
  { date: new Date(2022, 0, 1), label: '2022: Supply chain costs surge post-pandemic' },
  { date: new Date(2023, 0, 1), label: '2023: 58% annual premium spike' },
];

const uninsuredAnnotations: Annotation[] = [
  { date: new Date(2023, 0, 1), label: '2023: Premium spike triggers compliance crisis' },
];

const editorialRefs: Reference[] = [
  { num: 1, name: 'ABI', dataset: 'Motor Insurance Premium Tracker', url: 'https://www.abi.org.uk/data-and-research/research-and-briefings/', date: 'March 2026' },
  { num: 2, name: 'Motor Insurers Bureau', dataset: 'Uninsured Driving Statistics', url: 'https://www.mib.org.uk/', date: 'March 2026' },
  { num: 3, name: 'FCA', dataset: 'General Insurance Pricing Practices', url: 'https://www.fca.org.uk/publications/market-studies/general-insurance-pricing-practices', date: 'March 2026' },
];

export default function CarInsurancePovertyPage() {
  return (
    <>
      <TopicNav topic="Car Insurance" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Transport"
          question="Is Car Insurance Becoming Unaffordable?"
          finding="Average UK car insurance premiums rose 58% in 2023 to £924 — with young drivers in cities facing premiums over £2,800 — leaving some workers unable to afford to drive to work. Over one million vehicles are estimated to be driven uninsured, adding £15–30 to every insured driver's premium through the Motor Insurers' Bureau."
          colour="#E63946"
          preposition="with"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Average UK car insurance premiums rose 58% in the year to December 2023, reaching £924 — the highest level since comparable data began.<Cite nums={1} /> The rise followed a period of below-inflation increases in 2020–22 and represents a sharp correction as claims costs caught up: vehicle repair costs surged due to complex electronics, supply chain disruption, and the high cost of EV battery replacements; legal claims management costs added further pressure; and reinsurance costs rose globally. For an 18-year-old in a major city, average premiums can exceed £3,500 per year — a sum larger than many young workers' annual after-tax income from part-time employment.</p>
            <p>The insurance poverty trap is most acute for workers in areas with poor public transport who need a car to access employment. Delivery drivers, construction workers, and care workers in rural and suburban areas face a situation where legal insurance can exceed any realistic return from employment. The burden falls disproportionately on young drivers and those in high-risk postcode areas — typically deprived urban communities — creating a transport access penalty that compounds existing disadvantage. Over one million vehicles are estimated to be driven uninsured, with losses funded through the Motor Insurers' Bureau adding approximately £15–30 to every insured driver's premium.<Cite nums={2} /> Telematics insurance offers some relief for safe young drivers, but premiums remain very high in actuarial risk categories regardless of individual driving behaviour.<Cite nums={1} /></p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Premiums' },
          { id: 'sec-chart2', label: 'Uninsured Drivers' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Average car insurance premium"
              value="£924"
              unit="per year (2024)"
              direction="up"
              polarity="up-is-bad"
              changeText="+58% in 2023 · highest in 20 years"
              sparklineData={[465, 475, 490, 515, 500, 475, 520, 585, 924]}
              source="ABI · Motor Insurance Premium Tracker 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Young driver premium (age 18)"
              value="£2,800"
              unit="average"
              direction="up"
              polarity="up-is-bad"
              changeText="+£900 in 2023 · often exceeds part-time annual income"
              sparklineData={[1500, 1550, 1600, 1650, 1700, 1800, 1900, 2800]}
              source="Confused.com / Compare the Market 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Estimated uninsured drivers"
              value="1m+"
              unit="vehicles"
              direction="up"
              polarity="up-is-bad"
              changeText="Costs add £15–30 to every insured premium"
              sparklineData={[800, 820, 835, 845, 855, 870, 910, 1020]}
              source="Motor Insurers Bureau 2024"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Car insurance premiums, UK, 2016–2024"
              subtitle="Average annual motor insurance premium for all drivers (red) and young drivers aged 18 (amber). Sharp spike in 2023 reflects post-pandemic repair cost inflation catching up."
              series={premiumSeries}
              annotations={premiumAnnotations}
              yLabel="£ per year"
              source={{ name: 'ABI', dataset: 'Motor Insurance Premium Tracker', url: 'https://www.abi.org.uk/data-and-research/research-and-briefings/', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Estimated uninsured drivers, UK, 2016–2024"
              subtitle="Estimated number of vehicles on public roads without valid insurance (thousands). Rising sharply since 2022 as premium unaffordability exceeds risk tolerance."
              series={uninsuredSeries}
              annotations={uninsuredAnnotations}
              yLabel="Thousands of vehicles"
              source={{ name: 'Motor Insurers Bureau', dataset: 'Uninsured Driving Statistics', url: 'https://www.mib.org.uk/', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Telematics insurance offers safe young drivers fair premiums"
            value="30%"
            unit="average saving for telematics users"
            description="Black box (telematics) insurance, which monitors individual driving behaviour rather than applying actuarial postcode and age risk ratings, offers safe young drivers savings of around 30% on standard premiums. Approximately 800,000 drivers in the UK use telematics policies. The FCA's General Insurance Pricing Practices reform (2022) also banned the longstanding practice of charging loyal renewing customers more than new customers — a reform estimated to save consumers £4.2 billion over 10 years. Uptake of telematics policies among under-25s has grown from 14% to 22% since 2020."
            source="Source: ABI — Telematics report 2024. FCA — General Insurance Pricing Practices reform impact assessment 2023."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.abi.org.uk/data-and-research/research-and-briefings/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ABI — Motor Insurance Premium Tracker</a> — average premium data (comprehensive cover, annual average). Retrieved March 2026.</p>
            <p><a href="https://www.mib.org.uk/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Motor Insurers Bureau — Annual Report</a> — uninsured driving estimates and economic impact. Retrieved March 2026.</p>
            <p><a href="https://www.fca.org.uk/publications/market-studies/general-insurance-pricing-practices" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">FCA — General Insurance Pricing Practices</a> — pricing reform impact data. Retrieved March 2026.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
