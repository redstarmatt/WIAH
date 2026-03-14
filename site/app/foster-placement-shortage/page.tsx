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
  { num: 1, name: 'The Fostering Network', dataset: 'State of the Nation 2023', url: 'https://www.thefosteringnetwork.org.uk', date: '2023' },
  { num: 2, name: 'Ofsted', dataset: 'Fostering in England', url: 'https://www.gov.uk/government/statistics/fostering-in-england-1-april-2022-to-31-march-2023', date: '2023' },
  { num: 3, name: 'DfE', dataset: 'Children Looked After in England', url: 'https://explore-education-statistics.service.gov.uk/find-statistics/children-looked-after-in-england-including-adoptions', date: '2023' },
];

// Approved foster carers, 2015–2023
const fosterCarers = [55000, 54800, 54600, 54400, 54200, 54000, 53800, 53600, 53500];
// Carer shortfall, 2015–2023
const shortfall = [4200, 4600, 5100, 5600, 6100, 6600, 7100, 7800, 8700];
// Emergency placements, 2015–2023
const emergencyPlacements = [8200, 8600, 9000, 9800, 10200, 10600, 11000, 11200, 11400];

const supplyShortfallSeries: Series[] = [
  {
    id: 'foster-carers',
    label: 'Approved foster carers',
    colour: '#264653',
    data: fosterCarers.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
  {
    id: 'shortfall',
    label: 'Carer shortfall',
    colour: '#E63946',
    data: shortfall.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
];

const emergencySeries: Series[] = [
  {
    id: 'emergency-placements',
    label: 'Emergency placements',
    colour: '#E63946',
    data: emergencyPlacements.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
];

const supplyAnnotations: Annotation[] = [
  { date: new Date(2019, 0, 1), label: '2019: Net carer loss accelerates' },
  { date: new Date(2022, 0, 1), label: '2022: Shortfall doubles since 2015' },
];

const emergencyAnnotations: Annotation[] = [
  { date: new Date(2020, 0, 1), label: '2020: COVID disrupts matching process' },
];

export default function FosterPlacementShortagePage() {
  return (
    <>
      <TopicNav topic="Foster Placement Shortage" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Foster Placement Shortage"
          question="Are There Enough Foster Carers?"
          finding="England needs 8,700 more foster carers — meaning one in three children who needs fostering cannot be placed locally. Emergency placements have risen to over 11,000 a year."
          colour="#E63946"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>England has a structural and worsening shortage of foster carers. The number of approved foster carers has declined from around 55,000 in 2015 to 53,500 in 2023 — while the number of children needing placement has risen sharply.<Cite nums={[2]} /> The Fostering Network estimates a shortfall of 8,700 carers nationwide, meaning one in three children who needs a foster placement cannot be matched with a local carer.<Cite nums={[1]} /> Recruitment campaigns repeatedly fail to close the gap because low allowances, poor professional recognition, and inadequate support make fostering unattractive for working-age adults. Emergency placements — where a child is placed at short notice without proper matching — have risen to 11,400 annually.<Cite nums={[3]} /></p>
            <p>Children who cannot be matched locally are placed far from their schools, communities, and families, or into residential care costing over £6,000 per week.<Cite nums={[3]} /> The shortfall drives a negative spiral: more children in care means more pressure on placements, and the shortage of placements diverts resources into costly residential provision that crowds out prevention. Teenagers with complex needs and unaccompanied asylum-seeking children are hardest to place, and placement instability — one of the strongest predictors of poor outcomes — is becoming structurally harder to avoid.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Carers vs Shortfall' },
          { id: 'sec-chart2', label: 'Emergency Placements' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Foster carer shortfall"
              value="8,700"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Doubled since 2015 · recruitment and retention crisis"
              sparklineData={shortfall.slice(-8)}
              source="The Fostering Network 2023"
              href="#sec-chart1"
            />
            <MetricCard
              label="Foster carers in England"
              value="53,500"
              unit=""
              direction="down"
              polarity="up-is-good"
              changeText="Declining despite rising demand · majority over 55"
              sparklineData={fosterCarers.slice(-8).map(v => v / 1000)}
              source="Ofsted · Fostering in England 2023"
              href="#sec-chart1"
            />
            <MetricCard
              label="Emergency placements per year"
              value="11,400"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Children placed at short notice without proper matching"
              sparklineData={emergencyPlacements.slice(-8)}
              source="DfE · Children Looked After Statistics 2023"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Foster carers and shortfall, England, 2015–2023"
              subtitle="Approved foster carers (blue) and estimated shortfall of carers needed (red). Shortfall has doubled while carer numbers have declined."
              series={supplyShortfallSeries}
              annotations={supplyAnnotations}
              yLabel="Number"
              source={{ name: 'The Fostering Network / Ofsted', dataset: 'Fostering in England', url: 'https://www.gov.uk/government/statistics/fostering-in-england-1-april-2022-to-31-march-2023', frequency: 'annual', date: '2023' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Emergency foster placements, England, 2015–2023"
              subtitle="Children placed in emergency foster care at short notice without proper matching. Rising trend as structural shortage makes planned placement increasingly difficult."
              series={emergencySeries}
              annotations={emergencyAnnotations}
              yLabel="Placements"
              source={{ name: 'DfE', dataset: 'Children Looked After in England', url: 'https://explore-education-statistics.service.gov.uk/find-statistics/children-looked-after-in-england-including-adoptions', frequency: 'annual', date: '2023' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="New national recruitment strategy launching in 2025"
            value="£27m"
            unit="national foster carer recruitment fund 2025"
            description="The government allocated £27 million in 2025 for a national foster carer recruitment and retention programme, including improved allowances, better professional support, and a streamlined approval process. Evidence from Scotland's national approach, which reduced the carer shortfall by 18% in three years, shows that structured recruitment with sustained financial support can reverse the decline. The Mockingbird Family Model, now running in 40 local authorities, is also showing strong retention improvements among existing carers."
            source="Source: DfE — Foster care recruitment strategy 2025. Fostering Network — State of the Nation 2024."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.gov.uk/government/statistics/fostering-in-england-1-april-2022-to-31-march-2023" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Ofsted — Fostering in England</a> — Annual statistical release covering approved foster carers, households, and placements. Retrieved 2024.</p>
            <p><a href="https://explore-education-statistics.service.gov.uk/find-statistics/children-looked-after-in-england-including-adoptions" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DfE — Children Looked After in England</a> — Placement type breakdowns including emergency placements. Retrieved 2024.</p>
            <p>Shortfall figures are The Fostering Network estimates based on number of children requiring fostering minus available approved carer households.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
