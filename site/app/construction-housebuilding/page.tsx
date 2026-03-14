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

// Net dwelling additions England, 2015–2023 (DLUHC)
const netAdditionsValues = [170990, 189650, 217350, 222190, 241130, 215920, 221070, 232820, 234400];

// New home completions (private + affordable), 2015–2023
const completionsValues = [142850, 163940, 183570, 195290, 204590, 178580, 188610, 191010, 187000];

// Planning permissions granted (thousands), 2015–2023
const planningValues = [350, 340, 320, 330, 325, 290, 310, 314, 257];

const series1: Series[] = [
  {
    id: 'net-additions',
    label: 'Net dwelling additions',
    colour: '#F4A261',
    data: netAdditionsValues.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
  {
    id: 'completions',
    label: 'New home completions',
    colour: '#264653',
    data: completionsValues.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
];

const series2: Series[] = [
  {
    id: 'planning',
    label: 'Planning permissions granted (thousands)',
    colour: '#6B7280',
    data: planningValues.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v * 1000 })),
  },
];

const annotations1: Annotation[] = [
  { date: new Date(2019, 0, 1), label: '2019: 241k — closest to target' },
  { date: new Date(2020, 2, 1), label: '2020: COVID disruption' },
];

const annotations2: Annotation[] = [
  { date: new Date(2022, 0, 1), label: '2022: Nutrient neutrality ruling halts 160k homes' },
  { date: new Date(2024, 0, 1), label: '2024: Planning reform — mandatory targets' },
];

const editorialRefs: Reference[] = [
  { num: 1, name: 'DLUHC', dataset: 'Housing Supply: Net Additional Dwellings England', url: 'https://www.gov.uk/government/statistical-data-sets/live-tables-on-net-supply-of-housing', date: '2023' },
  { num: 2, name: 'DLUHC', dataset: 'Planning Permission Statistics', url: 'https://www.gov.uk/government/collections/planning-permissions-england', date: '2023' },
  { num: 3, name: 'Homes England', dataset: 'Affordable Homes Programme Data', url: 'https://www.homesengland.org.uk/research/data-and-research/', date: '2023' },
  { num: 4, name: 'DLUHC', dataset: 'National Planning Policy Framework consultation 2024', url: 'https://www.gov.uk/government/consultations/reforms-to-national-planning-policy', date: '2024' },
];

export default function ConstructionHousebuildingPage() {
  return (
    <>
      <TopicNav topic="Housebuilding" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Housing"
          question="Are We Building Enough Homes?"
          finding="England built 234,400 net new homes in 2022/23 — a third fewer than the government's 300,000-a-year target, which has never been met in the post-war era."
          colour="#F4A261"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>England added 234,400 net new dwellings in 2022/23 — 65,600 short of the government's 300,000-a-year target, which has never been met in the post-war era.<Cite nums={1} /> The closest was 2019/20 at 241,130, before the pandemic disrupted construction.<Cite nums={1} /> Planning permissions fell 18% year-on-year, with nutrient neutrality rulings alone halting an estimated 160,000 homes in the pipeline.<Cite nums={2} /> Social and affordable housing completions were approximately 30,000 in 2022/23 — a fraction of assessed need.<Cite nums={3} /> The 2024 government reforms aim to mandate rather than merely target local housebuilding by reintroducing mandatory housing targets into local plans.<Cite nums={4} /></p>
            <p>The shortfall is geographically concentrated. London, the South East, and the commuter belt face the most acute need, with high land costs and viability constraints making development difficult.<Cite nums={1} /> Private rents have risen sharply as supply remains constrained, and affordable housing grant funding has been eroded in real terms by construction cost inflation, meaning the same budget now delivers fewer homes than in 2019.<Cite nums={3} /></p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Completions vs Target' },
          { id: 'sec-chart2', label: 'Planning Permissions' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Net dwelling additions 2022/23"
              value="234,400"
              unit=""
              direction="flat"
              polarity="up-is-good"
              changeText="78% of 300k target · shortfall of 65,600/year"
              sparklineData={[189650, 217350, 222190, 241130, 215920, 221070, 232820, 234400]}
              source="DLUHC — Housing Supply England 2023"
              href="#sec-chart1"
            />
            <MetricCard
              label="New home completions"
              value="187,000"
              unit=""
              direction="down"
              polarity="up-is-good"
              changeText="lowest since 2013 · materials costs hit output"
              sparklineData={[163940, 183570, 195290, 204590, 178580, 188610, 191010, 187000]}
              source="DLUHC — 2023"
              href="#sec-chart1"
            />
            <MetricCard
              label="Planning permissions granted"
              value="257,000"
              unit=""
              direction="down"
              polarity="up-is-good"
              changeText="down 18% year-on-year · nutrient neutrality rulings"
              sparklineData={[320000, 330000, 325000, 290000, 310000, 314000, 257000]}
              source="DLUHC — Planning Permission Statistics 2023"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="New homes built in England, 2015–2023"
              subtitle="Net dwelling additions and new home completions annually. The 300,000-a-year target has never been met. The 2024 planning reforms aim to make targets mandatory."
              series={series1}
              annotations={annotations1}
              yLabel="Dwellings"
              source={{ name: 'DLUHC', dataset: 'Housing Supply: Net Additional Dwellings England', url: 'https://www.gov.uk/government/statistical-data-sets/live-tables-on-net-supply-of-housing', frequency: 'annual', date: '2023' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Planning permissions granted, England, 2015–2023"
              subtitle="Annual planning permissions for residential development. Fell sharply from 2022 as nutrient neutrality rulings blocked sites and viability deteriorated."
              series={series2}
              annotations={annotations2}
              yLabel="Permissions"
              source={{ name: 'DLUHC', dataset: 'Planning Permission Statistics', url: 'https://www.gov.uk/government/collections/planning-permissions-england', frequency: 'quarterly', date: '2023' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="2024 planning reform: mandatory local housing targets restored"
            value="300,000"
            unit="annual target — reform to make it mandatory"
            description="The 2024 government planning reforms reintroduce mandatory housing targets into local plans, removing the flexibility that allowed councils to set their own lower targets. The reforms also simplify the National Planning Policy Framework and introduce new rules to unlock urban brownfield sites. Modelling by the Centre for Cities suggests the reforms could add 370,000 additional homes over five years if fully implemented — though delivery depends on planning capacity, infrastructure funding, and construction industry capacity."
            source="Source: DLUHC — National Planning Policy Framework consultation 2024. Centre for Cities — Housing supply modelling, 2024."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.gov.uk/government/statistical-data-sets/live-tables-on-net-supply-of-housing" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DLUHC — Housing Supply: Net Additional Dwellings England</a> — published annually. Financial year (April–March) data.</p>
            <p><a href="https://www.gov.uk/government/collections/planning-permissions-england" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DLUHC — Planning Permission Statistics</a> — quarterly data. Published annually as calendar year totals.</p>
            <p><a href="https://www.homesengland.gov.uk/research/data-and-research/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Homes England — Affordable Homes Programme Data</a> — affordable housing completions by tenure.</p>
            <p>Net additions include new build completions, conversions, changes of use, minus demolitions. Data is for England only. The 300,000 target applies to England. Financial year data (April–March) is used throughout.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
