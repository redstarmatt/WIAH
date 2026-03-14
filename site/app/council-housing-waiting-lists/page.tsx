'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'MHCLG', dataset: 'Local Authority Housing Statistics', url: 'https://www.gov.uk/government/collections/local-authority-housing-data', date: '2024' },
  { num: 2, name: 'MHCLG', dataset: 'Homelessness Statistics', url: 'https://www.gov.uk/government/collections/homelessness-statistics', date: '2024' },
  { num: 3, name: 'Shelter', dataset: 'Social Housing Waiting List Report', url: 'https://www.shelter.org.uk/', date: '2024' },
];

const waitingListValues = [1010000, 1020000, 1050000, 1080000, 1120000, 1150000, 1090000, 1120000, 1160000, 1190000, 1220000];
const temporaryAccommodationValues = [62800, 65400, 68200, 72100, 77400, 82800, 84200, 88400, 95200, 101800, 109400];
const avgWaitTimeValues = [3.2, 3.4, 3.6, 3.8, 4.1, 4.4, 4.2, 4.6, 5.1, 5.6, 6.2];
const socialRentStockValues = [3920, 3880, 3840, 3800, 3760, 3720, 3690, 3660, 3640, 3610, 3580];

const series1: Series[] = [
  { id: 'waiting', label: 'Households on social housing waiting lists (millions)', colour: '#E63946', data: waitingListValues.map((v, i) => ({ date: new Date(2013 + i, 3, 1), value: v / 1000000 })) },
  { id: 'temporary', label: 'Households in temporary accommodation (thousands)', colour: '#F4A261', data: temporaryAccommodationValues.map((v, i) => ({ date: new Date(2013 + i, 3, 1), value: v / 1000 })) },
];

const series2: Series[] = [
  { id: 'wait', label: 'Average wait for social home (years)', colour: '#E63946', data: avgWaitTimeValues.map((v, i) => ({ date: new Date(2013 + i, 3, 1), value: v })) },
  { id: 'stock', label: 'Social rent housing stock (thousands)', colour: '#2A9D8F', data: socialRentStockValues.map((v, i) => ({ date: new Date(2013 + i, 3, 1), value: v })) },
];

const annotations1: Annotation[] = [
  { date: new Date(2020, 2, 1), label: '2020: COVID eviction ban — lists grow' },
];

export default function CouncilHousingWaitingListsPage() {
  return (
    <>
      <TopicNav topic="Council Housing Waiting Lists" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Housing"
          question="How Long Is the Wait for a Council Home?"
          finding={<>1.22 million households are on social housing waiting lists in England — a 30-year high — with the average wait for a social home now 6.2 years, up from 3.2 years in 2013.<Cite nums={[1, 3]} /> Over 109,000 households are living in temporary accommodation, including 140,000 children, at a cost to local authorities of over £2 billion per year.<Cite nums={[1, 2]} /></>}
          colour="#F4A261"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The social housing waiting list in England reflects the accumulated failure of housing policy over four decades. The Right to Buy has removed around 2 million council homes from the social stock since 1980, and replacements have never kept pace with disposals. Meanwhile the private rented sector, which absorbed much of the displaced demand, has become both unaffordable and insecure — driving families back towards the social housing system that has insufficient homes to offer them. The 1.22 million households on waiting lists represent a 30-year high: these are families who have been assessed as eligible for social housing and are actively waiting, not simply registered. The true extent of housing need is larger — households who do not apply because they believe the wait is hopeless, or who are not eligible under local lettings policies.<Cite nums={[1, 3]} /></p>
            <p>The temporary accommodation crisis is particularly severe. Over 109,000 households — the highest figure ever recorded — are being housed in bed-and-breakfasts, hostels, and private sector nightly-let accommodation paid for by local councils at emergency rates. This represents a catastrophic failure of the housing system: families living in single rooms for months or years, children unable to attend school consistently, parents unable to work, and local authorities spending money they do not have on accommodation that provides no security and no pathway to permanence. Shelter estimates that the true cost of homelessness — including temporary accommodation, health impacts, and lost productivity — exceeds £24 billion annually, far more than it would cost to build the social homes needed.<Cite nums={[2, 3]} /></p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Overview' },
          { id: 'sec-chart1', label: 'Waiting Lists' },
          { id: 'sec-chart2', label: 'Wait Times & Stock' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard label="Households on waiting lists" value="1.22m" unit="England" direction="up" polarity="up-is-bad" changeText="was 1.01m in 2013 · 30-year high" sparklineData={[1010, 1020, 1050, 1080, 1120, 1150, 1090, 1120, 1160, 1190, 1220]} source="MHCLG — Local Authority Housing 2024" href="#sec-chart1" />
            <MetricCard label="Households in temporary accommodation" value="109,400" unit="including 140,000 children" direction="up" polarity="up-is-bad" changeText="was 62,800 in 2013 · record high · costs councils £2bn/yr" sparklineData={[62.8, 65.4, 68.2, 72.1, 77.4, 82.8, 84.2, 88.4, 95.2, 101.8, 109.4]} source="MHCLG — Homelessness Statistics 2024" href="#sec-chart1" />
            <MetricCard label="Average wait for social home" value="6.2 yrs" unit="England average" direction="up" polarity="up-is-bad" changeText="was 3.2 years in 2013 · near doubled" sparklineData={[3.2, 3.4, 3.6, 3.8, 4.1, 4.4, 4.2, 4.6, 5.1, 5.6, 6.2]} source="Shelter — Social Housing Waiting 2024" href="#sec-chart2" />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Social housing waiting lists and temporary accommodation, England, 2013–2024"
              subtitle="Households on social housing waiting lists (millions) and households in temporary accommodation (thousands). Both at record levels, driven by a widening gap between housing need and social housing supply."
              series={series1}
              annotations={annotations1}
              yLabel="Millions / Thousands"
              source={{ name: 'MHCLG', dataset: 'Local Authority Housing Statistics', url: 'https://www.gov.uk/government/collections/local-authority-housing-data', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Average wait for social home and social rent stock, England, 2013–2024"
              subtitle="Average years to be allocated a social home from waiting list and total social rent housing stock (thousands of homes). Declining stock and growing demand are driving wait times ever higher."
              series={series2}
              annotations={[]}
              yLabel="Years / Thousands of homes"
              source={{ name: 'MHCLG', dataset: 'Local Authority Housing Statistics', url: 'https://www.gov.uk/', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Council housebuilding beginning to recover"
            value="4,200"
            unit="council homes started in 2023/24 — highest level since 1991"
            description="After decades of near-zero council housebuilding, English councils started 4,200 homes in 2023/24 — the highest figure since 1991 and a sign that the government's decision to remove the borrowing cap from the Housing Revenue Account is having some effect. Several councils — particularly in London, Manchester, and Bristol — are running ambitious council housebuilding programmes funded through a combination of grant, borrowing against rental income, and land value capture. These programmes demonstrate that councils with the political will and financial capacity can build cost-effectively and quickly, typically delivering homes within 18–24 months of site acquisition."
            source="Source: MHCLG — Local Authority Housing Statistics 2024. Councils in Action 2024."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.gov.uk/government/collections/local-authority-housing-data" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">MHCLG — Local Authority Housing Statistics</a> — waiting lists, stock, allocations, starts. Annual.</p>
            <p><a href="https://www.gov.uk/government/collections/homelessness-statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">MHCLG — Homelessness Statistics</a> — temporary accommodation, rough sleeping, prevention. Quarterly.</p>
            <p>Waiting list figures are households assessed as qualifying for social housing under local lettings policies and actively seeking allocation. Average wait is median time from active application to first offer. Social rent stock excludes affordable rent and shared ownership.</p>
          </div>
        </section>
      </main>
    </>
  );
}
