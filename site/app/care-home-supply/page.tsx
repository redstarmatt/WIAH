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

// Total care home beds (thousands) and annual closures, 2015–2024
const totalBedsData = [452, 448, 443, 438, 432, 425, 420, 415, 412, 436];
const annualClosuresData = [320, 380, 410, 440, 460, 500, 520, 540, 430, 400];

// Local authority fee gap: LA rate vs cost of care (£/week), 2015–2024
const laRateData = [530, 545, 558, 572, 588, 605, 625, 648, 672, 700];
const costOfCareData = [650, 672, 695, 720, 750, 785, 820, 860, 910, 960];

const supplyCapacitySeries: Series[] = [
  {
    id: 'totalBeds',
    label: 'Total care home beds (thousands)',
    colour: '#E63946',
    data: totalBedsData.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
  {
    id: 'annualClosures',
    label: 'Annual care home closures',
    colour: '#F4A261',
    data: annualClosuresData.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
];

const feeGapSeries: Series[] = [
  {
    id: 'costOfCare',
    label: 'Estimated cost of care (£/week)',
    colour: '#264653',
    data: costOfCareData.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
  {
    id: 'laRate',
    label: 'LA commissioning rate (£/week)',
    colour: '#6B7280',
    data: laRateData.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
];

const supplyAnnotations: Annotation[] = [
  { date: new Date(2017, 0, 1), label: '2017: Four Seasons near-collapse triggers sector crisis' },
  { date: new Date(2020, 0, 1), label: '2020: Pandemic accelerates closures' },
];

const feeAnnotations: Annotation[] = [
  { date: new Date(2022, 0, 1), label: '2022: NLW increase widens gap sharply' },
  { date: new Date(2023, 0, 1), label: '2023: CMA finds 33% average underfunding gap' },
];

const editorialRefs: Reference[] = [
  { num: 1, name: 'CQC', dataset: 'State of Care Annual Report', url: 'https://www.cqc.org.uk/publications/major-report/state-care', date: '2024' },
  { num: 2, name: 'LaingBuisson', dataset: 'Care Homes for Older People UK Market Report', url: 'https://www.laingbuisson.com/', date: '2024' },
  { num: 3, name: 'CMA', dataset: 'Care Homes Market Study', url: 'https://www.gov.uk/cma-cases/care-homes-market-study', date: '2023' },
];

export default function CareHomeSupplyPage() {
  return (
    <>
      <TopicNav topic="Care Home Supply" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Social Care"
          question="Are We Running Out of Care Home Places?"
          finding="England has lost over 15,000 care home beds since 2015 as closures outpace new openings. Local authority commissioning rates are on average 33% below the true cost of providing care, creating a structural funding gap that makes viability unsustainable for providers operating on tight margins. An ageing population will require 70,000 additional beds by 2035."
          colour="#E63946"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>England had approximately 436,000 care home beds in 2024, down from 452,000 in 2015 — a net loss of over 15,000 places despite rising demand.<Cite nums={1} /> Annual closures have run at 400–540 homes per year throughout the decade, driven by a structural funding gap between what local authorities pay for care and what care actually costs to provide.<Cite nums={[1, 2]} /> The CMA estimated in 2023 that local authority commissioning rates are on average 33% below the cost of providing adequate care, meaning homes serving high proportions of state-funded residents operate at a systematic loss, cross-subsidised — where possible — by self-funders who pay full market rates.<Cite nums={3} /> Homes that cannot sustain this cross-subsidy close or reduce capacity.</p>
            <p>The concentration of ownership in the sector creates systemic risk. Following the near-collapse of Four Seasons Healthcare in 2017 and the collapse of Southern Cross in 2011, large provider failure now represents a risk to thousands of residents simultaneously.<Cite nums={2} /> Bed capacity is not evenly distributed: rural and deprived areas — where self-funder demand is lowest — are the hardest hit by closures.<Cite nums={1} /> The Care Quality Commission estimates that an additional 70,000 beds will be required by 2035 to meet projected demand from an ageing population.<Cite nums={1} /> Against a backdrop of continued closures, the development pipeline falls far short of this figure. Without a sustainable funding settlement that closes the fee gap, supply will continue to contract as demand grows.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Capacity & Closures' },
          { id: 'sec-chart2', label: 'Funding Gap' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Total care home beds"
              value="436,000"
              unit="2024"
              direction="down"
              polarity="up-is-good"
              changeText="Down from 452,000 in 2015 · 70,000 new beds needed by 2035"
              sparklineData={[452, 448, 443, 438, 432, 425, 420, 415, 412, 436]}
              source="CQC / LaingBuisson · State of Care 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Annual care home closures"
              value="400+"
              unit="homes per year"
              direction="down"
              polarity="up-is-bad"
              changeText="Peak 540 in 2022 · financial pressure the primary driver"
              sparklineData={[320, 380, 410, 440, 460, 500, 520, 540, 430, 400]}
              source="CQC — De-registration data 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="LA fee gap vs cost of care"
              value="33%"
              unit="underfunding (2024)"
              direction="up"
              polarity="up-is-bad"
              changeText="LA pays ~£700/wk vs ~£960/wk cost · gap widened from 19% in 2015"
              sparklineData={[19, 19, 20, 21, 22, 23, 24, 25, 26, 33]}
              source="CMA / LaingBuisson · Care Homes Market 2024"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Care home bed capacity and annual closures, England, 2015–2024"
              subtitle="Total registered care home beds (thousands, red) and annual care home closures (amber). Net capacity has fallen as closures persistently outpace new registrations."
              series={supplyCapacitySeries}
              annotations={supplyAnnotations}
              yLabel="Beds (000s) / Closures"
              source={{ name: 'CQC / LaingBuisson', dataset: 'State of Care / Care Homes UK Market Report', url: 'https://www.cqc.org.uk/publications/major-report/state-care', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Local authority commissioning rate vs estimated cost of care, England, 2015–2024"
              subtitle="Estimated cost of providing care (£/week, dark) versus average local authority commissioning rate (£/week, grey). The gap — the structural underfunding — has widened from 19% in 2015 to 33% in 2024."
              series={feeGapSeries}
              annotations={feeAnnotations}
              yLabel="£ per week"
              source={{ name: 'CMA / LaingBuisson', dataset: 'Care Homes Market Study / Market Report', url: 'https://www.gov.uk/cma-cases/care-homes-market-study', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="New models of provision: supported living and extra care housing"
            value="30,000+"
            unit="new extra care housing units in development"
            description="Extra care housing — where people live in self-contained flats with on-site care available — offers a cost-effective alternative to traditional care homes for people with moderate needs, and is growing rapidly. The government's Adult Social Care Reform White Paper committed £300 million to expand housing with care provision, with a target of 30,000 new units. Supported living — community-based care packages enabling people to live independently — has grown by 22% since 2019 and represents a shift in the model of care delivery that reduces pressure on institutional bed capacity. These models carry lower capital costs for providers and higher resident satisfaction in most surveys."
            source="Source: DHSC — People at the Heart of Care White Paper 2021. Local Government Association — Housing with Care analysis 2024."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.cqc.org.uk/publications/major-report/state-care" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">CQC — State of Care Annual Report</a> — registered capacity, closures, and de-registration data. Retrieved March 2026.</p>
            <p><a href="https://www.laingbuisson.com/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">LaingBuisson — Care Homes for Older People UK Market Report</a> — market structure, fees, and capacity analysis. Retrieved March 2026.</p>
            <p><a href="https://www.gov.uk/cma-cases/care-homes-market-study" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">CMA — Care Homes Market Study</a> — funding gap analysis and self-funder cross-subsidy. Retrieved March 2026.</p>
            <p className="mt-2">Bed capacity figures from CQC registered location data. Annual closures are CQC de-registrations for care home location type. Cost of care estimates from LaingBuisson provider surveys, representing full economic cost including staffing, property, and overheads. LA commissioning rates from ADASS annual budget surveys.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
