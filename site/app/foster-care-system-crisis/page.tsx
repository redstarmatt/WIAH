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
  { num: 1, name: 'Department for Education', dataset: 'Children looked after in England', url: 'https://explore-education-statistics.service.gov.uk/find-statistics/children-looked-after-in-england-including-adoptions', date: '2024' },
  { num: 2, name: 'Fostering Network', dataset: 'Foster Care Statistics 2024', url: 'https://www.thefosteringnetwork.org.uk/policy-practice/facts-and-figures' },
  { num: 3, name: 'CMA', dataset: "Children's social care market study", url: 'https://www.gov.uk/cma-cases/childrens-social-care-market-study', date: '2022' },
];

// Children in care, 2010–2024
const childrenInCare = [64400, 65520, 67050, 68060, 69540, 70440, 72670, 74570, 75420, 78150, 80080, 82170, 83840, 83840, 81770];
// Foster carers, 2010–2024
const fosterCarers = [44000, 45000, 46000, 47200, 48000, 49100, 49700, 49500, 48900, 48000, 46800, 45200, 43800, 42500, 42070];
// LA weekly cost (£), 2015–2024
const laWeeklyCost = [650, 680, 700, 720, 750, 780, 800, 830, 860, 900];
// Private agency weekly cost (£), 2015–2024
const privateWeeklyCost = [2200, 2500, 2800, 3200, 3600, 4000, 4500, 5000, 5500, 5800];

const childrenInCareSeries: Series[] = [
  {
    id: 'children-in-care',
    label: 'Children looked after',
    colour: '#E63946',
    data: childrenInCare.map((v, i) => ({ date: new Date(2010 + i, 5, 1), value: v })),
  },
];

const fosterCarersSeries: Series[] = [
  {
    id: 'foster-carers',
    label: 'Approved foster carers',
    colour: '#264653',
    data: fosterCarers.map((v, i) => ({ date: new Date(2010 + i, 5, 1), value: v })),
  },
];

const placementCostSeries: Series[] = [
  {
    id: 'la-cost',
    label: 'Local authority weekly cost (£)',
    colour: '#2A9D8F',
    data: laWeeklyCost.map((v, i) => ({ date: new Date(2015 + i, 5, 1), value: v })),
  },
  {
    id: 'private-cost',
    label: 'Private agency weekly cost (£)',
    colour: '#E63946',
    data: privateWeeklyCost.map((v, i) => ({ date: new Date(2015 + i, 5, 1), value: v })),
  },
];

const childrenAnnotations: Annotation[] = [
  { date: new Date(2017, 5, 1), label: '2017: Foster carer numbers peak' },
  { date: new Date(2022, 5, 1), label: '2022: CMA market study into care placements' },
];

const carersAnnotations: Annotation[] = [
  { date: new Date(2017, 5, 1), label: '2017: Peak — 49,700 households' },
];

const costAnnotations: Annotation[] = [
  { date: new Date(2022, 5, 1), label: '2022: CMA finds 19–23% profit margins in private sector' },
];

export default function FosterCareSystemCrisisPage() {
  return (
    <>
      <TopicNav topic="Children & Families" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Children & Families"
          question="Is the Foster Care System Collapsing?"
          finding="England's care system is in structural crisis: the number of children needing placements has risen 27% since 2010 while the pool of foster carers has shrunk 12% since its 2017 peak. The gap is filled by private agencies charging up to six times more than local authority placements."
          colour="#E63946"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>There are now 81,770 children in local authority care in England, the highest sustained level since the Children Act 1989.<Cite nums={[1]} /> The figure has risen almost every year since 2010, driven by a combination of rising child poverty, cuts to early-help and family support services, and a system that intervenes late rather than early. Meanwhile, the number of approved foster carers peaked at around 49,700 in 2017 and has fallen steadily since, dropping 12% to approximately 42,070 in 2024.<Cite nums={[2]} /> The Fostering Network estimates England is short of at least 5,900 foster families at any given time.<Cite nums={[2]} /></p>
            <p>When a local authority cannot find a foster placement through its own network, it turns to independent fostering agencies, where weekly fees now average over £5,000, compared to around £900 for an in-house placement.<Cite nums={[3]} /> The Competition and Markets Authority found in 2022 that the largest private providers were making profit margins of 19–23%.<Cite nums={[3]} /> Some councils now spend more than half their children's services budget on placements alone, crowding out the preventive work that might reduce the number of children entering care. Care leavers face some of the worst outcomes of any group in the country: by age 21, 39% are not in education, employment, or training, compared to 12% of all young people.<Cite nums={[1]} /></p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-children', label: 'Children in Care' },
          { id: 'sec-costs', label: 'Placement Costs' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Children in care"
              value="81,770"
              unit="2023–24"
              direction="up"
              polarity="up-is-bad"
              changeText="Up 27% since 2010 · highest sustained level on record"
              sparklineData={childrenInCare.slice(-8)}
              source="DfE · Children looked after in England 2023–24"
              href="#sec-children"
            />
            <MetricCard
              label="Foster carer decline since 2017"
              value="12%"
              unit=""
              direction="down"
              polarity="up-is-good"
              changeText="From 49,700 to 42,070 · 5,900 families short"
              sparklineData={fosterCarers.slice(-8).map(v => v / 1000)}
              source="Fostering Network · Foster Care Statistics 2024"
              href="#sec-children"
            />
            <MetricCard
              label="Agency placement approved occupancy"
              value="60%"
              unit=""
              direction="down"
              polarity="up-is-good"
              changeText="Mismatch between available carers and children's needs"
              sparklineData={[72, 70, 68, 66, 65, 63, 62, 60]}
              source="DfE · Fostering in England 2023–24"
              href="#sec-costs"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-children" className="mb-12">
            <LineChart
              title="Children looked after by local authorities, England, 2010–2024"
              subtitle="Total children in care at 31 March each year. Sustained rise over 14 years driven by rising demand and reduced early-help services."
              series={childrenInCareSeries}
              annotations={childrenAnnotations}
              yLabel="Children"
              source={{ name: 'Department for Education', dataset: 'Children looked after in England', url: 'https://explore-education-statistics.service.gov.uk/find-statistics/children-looked-after-in-england-including-adoptions', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-costs" className="mb-12">
            <LineChart
              title="Weekly foster placement costs: local authority vs private agency, 2015–2024"
              subtitle="Private agency placements now cost over six times more than in-house local authority placements. The gap has widened every year as demand has exceeded supply."
              series={placementCostSeries}
              annotations={costAnnotations}
              yLabel="Weekly cost (£)"
              source={{ name: 'CMA / DfE', dataset: "Children's social care market study / Section 251 Returns", url: 'https://www.gov.uk/cma-cases/childrens-social-care-market-study', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Mockingbird model and Staying Put showing promise"
            value="Staying Put to 25"
            unit="policy extended in 2024"
            description="The Mockingbird Family Model, piloted across 40 local authorities in England, organises foster carers into supportive constellations around an experienced hub carer. Early evaluations show improved placement stability, reduced carer burnout, and better outcomes for children. The Staying Put policy now allows care leavers to remain with their foster families until age 25. Care leavers who stay put are significantly more likely to be in education, employment, or training at 21. These models demonstrate that structural reform can make measurable difference to the most vulnerable young people."
            source="Source: DfE — Mockingbird programme evaluation, 2023. DfE — Staying Put guidance and outcomes data, 2024."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://explore-education-statistics.service.gov.uk/find-statistics/children-looked-after-in-england-including-adoptions" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DfE — Children looked after in England</a> — Annual data on placement types, stability, and outcomes. Retrieved 2025.</p>
            <p><a href="https://www.gov.uk/cma-cases/childrens-social-care-market-study" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">CMA — Children's social care market study</a> — Analysis of placement costs and provider profit margins, 2022. Retrieved 2025.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
