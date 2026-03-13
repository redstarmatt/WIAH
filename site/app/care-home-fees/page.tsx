'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import PositiveCallout from '@/components/PositiveCallout';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

// Average weekly fee for residential care (£), 2015–2023
const residentialData = [635, 665, 705, 760, 840, 870, 950, 1050, 1100];

// Average weekly fee for nursing care (£), 2015–2023
const nursingData = [780, 815, 860, 920, 1010, 1040, 1130, 1220, 1300];

// Self-funder vs council rate (£/week), 2015–2023
const selfFunderData = [820, 855, 905, 970, 1070, 1100, 1190, 1300, 1350];
const councilData = [575, 595, 620, 665, 735, 750, 810, 880, 920];

const feesSeries: Series[] = [
  {
    id: 'residential',
    label: 'Residential care (£/week)',
    colour: '#E63946',
    data: residentialData.map((v, i) => ({ date: new Date(2015 + i, 5, 1), value: v })),
  },
  {
    id: 'nursing',
    label: 'Nursing care (£/week)',
    colour: '#264653',
    data: nursingData.map((v, i) => ({ date: new Date(2015 + i, 5, 1), value: v })),
  },
];

const crossSubsidySeries: Series[] = [
  {
    id: 'selfFunder',
    label: 'Self-funder weekly rate (£)',
    colour: '#E63946',
    data: selfFunderData.map((v, i) => ({ date: new Date(2015 + i, 5, 1), value: v })),
  },
  {
    id: 'council',
    label: 'Council-funded rate (£)',
    colour: '#6B7280',
    data: councilData.map((v, i) => ({ date: new Date(2015 + i, 5, 1), value: v })),
  },
];

const feesAnnotations: Annotation[] = [
  { date: new Date(2022, 0, 1), label: '2022: NLW increase drives wage cost surge' },
];

const crossSubsidyAnnotations: Annotation[] = [
  { date: new Date(2017, 0, 1), label: '2017: CMA market study finds 41% premium' },
];

export default function CareHomeFeesPage() {
  return (
    <>
      <TopicNav topic="Care Home Fees" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Care Home Fees"
          question="How Much Does a Care Home Actually Cost?"
          finding="The average residential care home in England costs £1,100 per week — £57,200 per year. Self-funders pay 41% more than council-funded residents for equivalent care, with the CMA estimating a cross-subsidy of £8,600 per person per year. Bed capacity has fallen from 452,000 to 412,000 since 2012 as the market faces financial unsustainability."
          colour="#E63946"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The average residential care home in England costs approximately £1,100 per week in 2023, with nursing care at £1,300 per week — equivalent to £57,200 and £67,600 per year. The means-testing threshold requiring full self-funding above £23,250 in capital (including housing wealth) has not been significantly uprated since 2010, meaning far more people now qualify as self-funders than Parliament originally intended. The CMA's 2017 market study found self-funders pay approximately 41% more than council-funded residents for equivalent provision, with the cross-subsidy estimated at £8,600 per person per year — a reflection of the structural power imbalance between large providers and families making decisions under acute time pressure.</p>
            <p>Care home bed capacity has fallen from 452,000 in 2012 to 412,000 in 2023, as council-funded rates below the cost of provision, rising wage bills, and inflationary cost pressures have made viability unsustainable for many operators. The consequences for families are reduced choice, longer waits, and older people occupying hospital beds while suitable placements are sought. The £86,000 lifetime care cost cap — derived from the Dilnot Commission's 2011 recommendations and originally planned for October 2025 — has been delayed further with its future uncertain. Even if implemented, the cap addresses personal care costs only; the hotel costs of accommodation, food, and utilities — which constitute the majority of most bills — remain uncapped.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Fee Trends' },
          { id: 'sec-chart2', label: 'Self-Funder Premium' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Average residential care home fee"
              value="£1,100"
              unit="per week (2023)"
              direction="up"
              polarity="up-is-bad"
              changeText="Up from £635 in 2015 · nursing care £1,300/week"
              sparklineData={[635, 665, 705, 760, 840, 870, 950, 1050, 1100]}
              source="LaingBuisson · Care of Older People 2023"
              href="#sec-chart1"
            />
            <MetricCard
              label="Self-funder premium over council rate"
              value="41%"
              unit="premium"
              direction="up"
              polarity="up-is-bad"
              changeText="£1,350/wk self vs £920/wk council · CMA found £8,600/yr cross-subsidy"
              sparklineData={[42, 44, 46, 46, 45, 47, 47, 48, 47]}
              source="CMA Care Homes Study / LaingBuisson 2023"
              href="#sec-chart2"
            />
            <MetricCard
              label="Care home bed capacity"
              value="412,000"
              unit="beds (2023)"
              direction="down"
              polarity="up-is-good"
              changeText="Down from 452,000 in 2012 · 40,000 beds lost"
              sparklineData={[452, 449, 446, 440, 435, 428, 422, 416, 412]}
              source="CQC / LaingBuisson · State of Care 2023"
              href="#sec-chart1"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Average care home weekly fees, England, 2015–2023"
              subtitle="Average fees for residential and nursing care. England average. Excludes local authority in-house provision. Fees have risen 73% since 2015 driven by wage costs and inflation."
              series={feesSeries}
              annotations={feesAnnotations}
              yLabel="£ per week"
              source={{ name: 'LaingBuisson', dataset: 'Care of Older People UK Market Report', url: 'https://www.laingbuisson.com/', frequency: 'annual', date: '2023' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Self-funder vs council-funded care home rates, England, 2015–2023"
              subtitle="Weekly rates paid by self-funders (red) vs council-funded residents (grey). Gap is the cross-subsidy paid by self-funders — an average of £430 per week more for equivalent care."
              series={crossSubsidySeries}
              annotations={crossSubsidyAnnotations}
              yLabel="£ per week"
              source={{ name: 'CMA / LaingBuisson', dataset: 'Care Homes Market Study / Market Report', url: 'https://www.gov.uk/cma-cases/care-homes-market-study', frequency: 'annual', date: '2023' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Dilnot cap reform: a path to ending catastrophic care costs"
            value="£86,000"
            unit="proposed lifetime cap on personal care costs"
            description="The Dilnot Commission's 2011 recommendation of an £86,000 lifetime cap on personal care costs would end the situation where people face open-ended financial liability that requires selling their home. Analysis by the Office for Budget Responsibility suggests the cap would cost around £1.7 billion per year when fully implemented. Means-testing reform alongside the cap — raising the capital threshold from £23,250 to £100,000 — would extend protection to people of more modest means. Both reforms remain in law under the Health and Care Act 2022 and await a commencement date from government."
            source="Source: DHSC — Social care charging reform implementation update 2025. Dilnot Commission — Fairer Care Funding 2011."
          />
        </ScrollReveal>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.laingbuisson.com/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">LaingBuisson — Care of Older People UK Market Report</a> — annual fee rates, capacity, and market structure. Retrieved March 2026.</p>
            <p><a href="https://www.gov.uk/cma-cases/care-homes-market-study" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">CMA — Care Homes Market Study (2017)</a> — self-funder premium and cross-subsidy analysis. Retrieved March 2026.</p>
            <p><a href="https://www.cqc.org.uk/publications/major-report/state-care" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">CQC — State of Care Annual Report</a> — capacity data and registered bed numbers. Retrieved March 2026.</p>
            <p className="mt-2">Fee data represents average weekly charges inclusive of personal care, accommodation, and meals. Nursing care fees include provision of registered nursing. Fees vary by region: London and the South East typically 20–30% above national average. Self-funder vs council rates from LaingBuisson surveys of providers.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
