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

const editorialRefs: Reference[] = [
  { num: 1, name: 'Carers UK', dataset: 'State of Caring Annual Survey', url: 'https://www.carersuk.org/media-centre/press-releases/state-of-caring-report', date: '2024' },
  { num: 2, name: 'ONS', dataset: 'Labour Force Survey — Unpaid Care', url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/healthandsocialcare/socialcare', date: '2024' },
  { num: 3, name: 'UK Parliament', dataset: "Carer's Leave Act 2023", url: 'https://www.legislation.gov.uk/ukpga/2023/18/contents/enacted', date: '2023' },
  { num: 4, name: 'NHS England', dataset: 'GP Patient Survey — Carer Identification', url: 'https://www.england.nhs.uk/gp/gpfv/redesign/gpdp/carers/', date: '2024' },
];

// % of carers reporting poor mental health and % accessing support, 2015–2024
const poorMentalHealthData = [61, 62, 64, 65, 67, 68, 72, 73, 72, 72];
const accessingSupportData = [34, 33, 31, 30, 28, 27, 25, 24, 24, 24];

// % of carers who reduced/quit work and % who report physical health impact, 2015–2024
const quitWorkData = [14, 15, 15, 16, 17, 17, 18, 19, 19, 20];
const physHealthData = [55, 56, 57, 58, 60, 61, 63, 65, 66, 67];

const wellbeingSeries: Series[] = [
  {
    id: 'poorMentalHealth',
    label: 'Carers reporting poor mental health (%)',
    colour: '#E63946',
    data: poorMentalHealthData.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
  {
    id: 'accessingSupport',
    label: 'Carers accessing mental health support (%)',
    colour: '#2A9D8F',
    data: accessingSupportData.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
];

const impactSeries: Series[] = [
  {
    id: 'physHealth',
    label: 'Carers reporting physical health impact (%)',
    colour: '#F4A261',
    data: physHealthData.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
  {
    id: 'quitWork',
    label: 'Carers who reduced or quit work (%)',
    colour: '#264653',
    data: quitWorkData.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
];

const wellbeingAnnotations: Annotation[] = [
  { date: new Date(2020, 0, 1), label: '2020: Pandemic intensifies caring burden and isolation' },
  { date: new Date(2022, 0, 1), label: "2022: Carer's Leave Act enacted" },
];

const impactAnnotations: Annotation[] = [
  { date: new Date(2019, 0, 1), label: '2019: Carers UK survey finds 600 leaving work daily' },
  { date: new Date(2024, 0, 1), label: "2024: Carer's Allowance earnings threshold raised" },
];

export default function CarerMentalHealthPage() {
  return (
    <>
      <TopicNav topic="Carer Mental Health" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Social Care"
          question="What Does Caring Do to Carers?"
          finding="72% of Britain's 10.6 million unpaid carers report poor mental health — up from 61% in 2015 — yet only 24% are accessing mental health support, down from 34%. Physical health is affected in 67% of cases. An estimated 600 carers leave paid employment every day, at an annual economic cost of £1.3 billion in lost output."
          colour="#F4A261"
          preposition="on"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Britain's 10.6 million unpaid carers — people providing informal care to a family member, partner, or friend with illness, disability, or a mental health condition — face significant and largely unaddressed health consequences.<Cite nums={2} /> The annual Carers UK State of Caring survey consistently finds rates of poor mental health in the carer population far above the general adult population. In 2024, 72% of carers reported their mental health had been negatively affected by caring — a proportion that has risen from 61% in 2015, with the sharpest deterioration during the pandemic period when carers faced intensified isolation and reduced access to the respite and community services that provide relief.<Cite nums={1} /> Yet access to mental health support has moved in the opposite direction: only 24% of carers report accessing any form of mental health support in 2024, down from 34% in 2015.<Cite nums={1} /></p>
            <p>The physical health toll is equally severe: 67% of carers report physical health impacts from their caring role — back problems from manual handling, sleep deprivation, and the general health consequences of sustained high-stress caregiving without adequate rest.<Cite nums={1} /> An estimated 600 carers leave paid employment every day as caring responsibilities become incompatible with work, at an ONS-estimated annual cost of £1.3 billion in lost economic output, concentrated among women, who provide the majority of unpaid care.<Cite nums={2} /> The Carer's Leave Act 2022 — which gave working carers 5 days of unpaid leave per year from April 2024 — is an important but insufficient step.<Cite nums={3} /> Evidence from Carers UK surveys suggests most carers need not days but weeks of regular respite to avoid breakdown, and respite services have been cut significantly in local authority budgets.<Cite nums={1} /></p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Mental Health' },
          { id: 'sec-chart2', label: 'Wider Impacts' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Carers with poor mental health"
              value="72%"
              unit="2024"
              direction="up"
              polarity="up-is-bad"
              changeText="Up from 61% in 2015 · pandemic caused sharp spike"
              sparklineData={[61, 62, 64, 65, 67, 68, 72, 73, 72, 72]}
              source="Carers UK · State of Caring 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Carers accessing mental health support"
              value="24%"
              unit="2024"
              direction="down"
              polarity="up-is-good"
              changeText="Down from 34% in 2015 · services cut as demand grows"
              sparklineData={[34, 33, 31, 30, 28, 27, 25, 24, 24, 24]}
              source="Carers UK · State of Caring 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Carers who reduced or quit work"
              value="20%"
              unit="2024"
              direction="up"
              polarity="up-is-bad"
              changeText="600 leave work daily · £1.3bn annual GDP loss · women disproportionate"
              sparklineData={[14, 15, 15, 16, 17, 17, 18, 19, 19, 20]}
              source="Carers UK / ONS · State of Caring 2024"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Carer mental health: poor wellbeing vs support access, 2015–2024"
              subtitle="Percentage of carers reporting poor mental health (red) versus percentage accessing any mental health support (green). The gap between need and provision has widened from 27pp to 48pp over a decade."
              series={wellbeingSeries}
              annotations={wellbeingAnnotations}
              yLabel="% of carers"
              source={{ name: 'Carers UK', dataset: 'State of Caring Annual Survey', url: 'https://www.carersuk.org/media-centre/press-releases/state-of-caring-report', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Physical health impact and employment consequences for carers, 2015–2024"
              subtitle="Percentage of carers reporting physical health impact from caring (amber) and percentage who reduced or left employment (dark). Both rising steadily as unpaid caring responsibility intensifies."
              series={impactSeries}
              annotations={impactAnnotations}
              yLabel="% of carers"
              source={{ name: 'Carers UK / ONS', dataset: 'State of Caring / Labour Force Survey', url: 'https://www.carersuk.org/media-centre/press-releases/state-of-caring-report', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Carer's Leave Act: 5 days statutory leave from April 2024"
            value="5 days"
            unit="unpaid carer's leave per year"
            description="The Carer's Leave Act 2022 — which took effect from April 2024 — gives all working carers the right to 5 days of unpaid leave per year to fulfil caring responsibilities, without requiring them to use annual leave or sick leave. Surveys suggest 60% of working carers were previously doing exactly that. NHS GP Patient Survey data shows that practices that proactively identify registered carers and offer signposting to support achieve significantly better health outcomes for carers in their patient population. The NHS Long Term Plan committed to identifying all carers registered with a GP — an estimated 6 million — and ensuring they are offered a carer's health check and access to respite information."
            source="Source: Carers UK — Carer's Leave Act impact survey 2024. NHS England — GP Patient Survey carer identification data 2024."
          />
        </ScrollReveal>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.carersuk.org/media-centre/press-releases/state-of-caring-report" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Carers UK — State of Caring Annual Survey</a> — annual survey of unpaid carers covering health, employment, and financial wellbeing. Retrieved March 2026.</p>
            <p><a href="https://www.ons.gov.uk/peoplepopulationandcommunity/healthandsocialcare/socialcare" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ONS — Social Care Statistics</a> — employment impact of caring, Labour Force Survey analysis. Retrieved March 2026.</p>
            <p><a href="https://www.england.nhs.uk/gp/gpfv/redesign/gpdp/carers/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS England — Supporting Carers in General Practice</a> — carer identification and health check programme data. Retrieved March 2026.</p>
            <p className="mt-2">Mental health data from Carers UK annual survey of approximately 7,000 carers. Employment impact estimates combine Carers UK survey data with ONS Labour Force Survey analysis. All figures refer to unpaid carers in the UK. Respondents self-select; results weighted for age and caring intensity.</p>
          </div>
        </section>
        <References items={editorialRefs} />
        <RelatedTopics />
      </main>
    </>
  );
}
