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

// Average annual cost of dog ownership (£), 2015–2024 — PDSA PAW Report
const dogCostValues = [1550, 1620, 1680, 1750, 1820, 1900, 2050, 2180, 2340, 2500];

// Average annual cost of cat ownership (£), 2015–2024
const catCostValues = [950, 980, 1020, 1060, 1100, 1150, 1220, 1300, 1400, 1500];

// Pet insurance average annual premium (£), 2015–2024 — ABI
const insurancePremiumValues = [260, 275, 290, 310, 330, 350, 390, 440, 510, 580];

// Average vet bill cost index (2019 = 100), 2015–2024
const vetBillIndexValues = [82, 85, 89, 95, 100, 108, 116, 124, 133, 140];

const series1: Series[] = [
  {
    id: 'dog-cost',
    label: 'Annual dog ownership cost (£)',
    colour: '#E63946',
    data: dogCostValues.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
  {
    id: 'cat-cost',
    label: 'Annual cat ownership cost (£)',
    colour: '#F4A261',
    data: catCostValues.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
];

const series2: Series[] = [
  {
    id: 'insurance-premium',
    label: 'Average annual pet insurance premium (£)',
    colour: '#E63946',
    data: insurancePremiumValues.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
  {
    id: 'vet-bill-index',
    label: 'Vet bill cost index (2019=100)',
    colour: '#6B7280',
    data: vetBillIndexValues.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
];

const annotations: Annotation[] = [
  { date: new Date(2020, 0, 1), label: '2020: Pandemic pet boom begins' },
  { date: new Date(2022, 0, 1), label: '2022: Cost-of-living crisis hits pet owners' },
];

const editorialRefs: Reference[] = [
  { num: 1, name: 'PDSA', dataset: 'PAW (PDSA Animal Wellbeing) Report', url: 'https://www.pdsa.org.uk/what-we-do/pdsa-animal-wellbeing-report', date: '2024' },
  { num: 2, name: 'RSPCA', dataset: 'Annual Statistics and Review', url: 'https://www.rspca.org.uk/whatwedo/latest/facts', date: '2024' },
  { num: 3, name: 'ABI', dataset: 'Pet Insurance Data Bulletin', url: 'https://www.abi.org.uk/products-and-issues/topics-and-issues/pet-insurance/', date: '2024' },
  { num: 4, name: 'ONS', dataset: 'Consumer Price Inflation — Veterinary Services', url: 'https://www.ons.gov.uk/economy/inflationandpriceindices', date: '2024' },
];

export default function PetOwnershipCostsPage() {
  return (
    <>
      <TopicNav topic="Pet Ownership Costs" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Pet Ownership Costs"
          question="Can You Actually Afford a Pet?"
          finding="The average annual cost of owning a dog has reached £2,500 and a cat £1,500. Vet bills have risen 40% since 2019, pet insurance premiums have more than doubled, and the RSPCA is seeing record numbers of animals surrendered."
          colour="#F4A261"
          preposition="with"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The pandemic pet boom has collided with the cost-of-living crisis. An estimated 3.2 million UK households acquired a pet during or shortly after lockdown, drawn by companionship and home-working flexibility.<Cite nums={1} /> Many are now confronting costs they did not anticipate. The average annual cost of dog ownership — covering food, veterinary care, insurance, grooming and boarding — has reached approximately £2,500, up 61% from £1,550 in 2015.<Cite nums={1} /> For cats, the equivalent figure is £1,500. Veterinary fees have risen particularly sharply: ONS data shows vet services inflation running at roughly double the general CPI rate, with bills up 40% since 2019.<Cite nums={4} /> The consolidation of veterinary practices by private equity-backed corporate groups — six chains now control over 60% of UK practices — has raised concerns about competition and pricing.<Cite nums={1} /></p>
            <p>Pet insurance, once a safety net against unexpected costs, has itself become a financial burden. Average annual premiums have more than doubled from £260 in 2015 to £580 in 2024, driven by rising claims costs and increased vet fees.<Cite nums={3} /> Older animals and certain breeds face premiums exceeding £1,000 per year. The RSPCA reports that it received over 130,000 calls to its cruelty line in 2023, with financial hardship increasingly cited as the reason for surrender or abandonment.<Cite nums={2} /> The charity took in a record number of animals and its rehoming centres are at capacity. The PDSA estimates that 5.2 million pets in the UK receive no veterinary care at all, a figure that has risen by 800,000 since 2020.<Cite nums={1} /> The gap between the aspirational image of pet ownership and the economic reality is wider than at any point in recent memory.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Ownership costs' },
          { id: 'sec-chart2', label: 'Insurance & vet bills' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Average annual dog ownership cost"
              value="£2,500"
              unit="2024"
              direction="up"
              polarity="up-is-bad"
              changeText="up 61% since 2015 · food, vet, insurance, boarding"
              sparklineData={dogCostValues.slice(-8)}
              source="PDSA — PAW Report 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Vet bill increase since 2019"
              value="+40%"
              unit="2024"
              direction="up"
              polarity="up-is-bad"
              changeText="running at 2x general inflation · corporate consolidation"
              sparklineData={vetBillIndexValues.slice(-8)}
              source="ONS — Consumer Prices (Vet Services) 2024"
              href="#sec-chart2"
            />
            <MetricCard
              label="Pets receiving no vet care"
              value="5.2m"
              unit="2024"
              direction="up"
              polarity="up-is-bad"
              changeText="up 800,000 since 2020 · cost is primary barrier"
              sparklineData={[4.0, 4.2, 4.4, 4.3, 4.5, 4.7, 5.0, 5.2]}
              source="PDSA — PAW Report 2024"
              href="#sec-chart1"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Average annual pet ownership costs, 2015–2024"
              subtitle="Total estimated annual cost for dogs (red) and cats (amber), including food, veterinary care, insurance, grooming and other essentials."
              series={series1}
              annotations={annotations}
              yLabel="Annual cost (£)"
              source={{ name: 'PDSA', dataset: 'PAW Report — Cost of Pet Ownership', url: 'https://www.pdsa.org.uk/what-we-do/pdsa-animal-wellbeing-report', frequency: 'annual', date: 'Mar 2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Pet insurance premiums and vet bill costs, 2015–2024"
              subtitle="Average annual pet insurance premium (red, £) and vet bill cost index (grey, 2019=100). Both have accelerated sharply since the pandemic."
              series={series2}
              annotations={annotations}
              yLabel="Value"
              source={{ name: 'ABI / ONS', dataset: 'Pet Insurance Statistics / Consumer Prices', url: 'https://www.abi.org.uk/products-and-issues/topics-and-issues/pet-insurance/', frequency: 'annual', date: 'Jan 2025' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="PDSA PetAid: free veterinary care for those who need it most"
            value="1.1m"
            unit="free treatments provided in 2023"
            description="The PDSA operates 48 Pet Hospitals across the UK, providing free and reduced-cost veterinary care to pet owners who cannot afford private treatment. In 2023, PDSA delivered 1.1 million free treatments, including vaccinations, neutering and emergency surgery. Eligibility is based on receipt of means-tested benefits, and the service operates as a genuine safety net preventing animal suffering caused by poverty. PDSA's model demonstrates that charitable veterinary provision remains essential in a market where private costs are increasingly unaffordable for lower-income households."
            source="Source: PDSA — Annual Review 2023–24."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.pdsa.org.uk/what-we-do/pdsa-animal-wellbeing-report" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">PDSA — PAW Report</a> — annual survey of over 5,000 pet owners covering ownership costs, veterinary access, and animal welfare indicators.</p>
            <p><a href="https://www.rspca.org.uk/whatwedo/latest/facts" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">RSPCA — Annual Statistics</a> — data on animal rescues, cruelty investigations, and rehoming numbers across England and Wales.</p>
            <p><a href="https://www.abi.org.uk/products-and-issues/topics-and-issues/pet-insurance/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ABI — Pet Insurance Data</a> — industry-level data on premiums, claims volumes and claims costs from the Association of British Insurers.</p>
            <p><a href="https://www.ons.gov.uk/economy/inflationandpriceindices" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ONS — Consumer Price Inflation</a> — veterinary services sub-index within the Consumer Prices Index including owner-occupiers' housing costs (CPIH).</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
