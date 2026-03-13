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

// Children in alternative provision, England, 2014–2024 — DfE
const apPupilsValues = [24100, 25300, 26800, 28400, 30200, 32100, 34500, 36200, 33800, 38400, 41000];

// Permanent exclusions, England, 2014–2024 — DfE
const permanentExclusionsValues = [4950, 5795, 6685, 7720, 7905, 8011, 4600, 6500, 7140, 7350, 7600];

// Managed moves (estimated), 2014–2024 — DfE / school census
const managedMovesValues = [7000, 7500, 8200, 9100, 9800, 10400, 8200, 10800, 12800, 13200, 13800];

// AP attainment (grade 4+ English & Maths) vs mainstream %, 2014–2024 — DfE KS4
const apAttainmentValues = [3.2, 3.4, 3.5, 3.6, 3.7, 3.8, 3.5, 3.9, 4.0, 4.1, 4.2];
const mainstreamAttainmentValues = [53, 54, 57, 59, 60, 60, 59, 62, 65, 65, 66];

const series1: Series[] = [
  {
    id: 'ap-pupils',
    label: 'Children in alternative provision',
    colour: '#E63946',
    data: apPupilsValues.map((v, i) => ({ date: new Date(2014 + i, 0, 1), value: v })),
  },
];

const series2: Series[] = [
  {
    id: 'permanent-exclusions',
    label: 'Permanent exclusions',
    colour: '#E63946',
    data: permanentExclusionsValues.map((v, i) => ({ date: new Date(2014 + i, 0, 1), value: v })),
  },
  {
    id: 'managed-moves',
    label: 'Managed moves (estimated)',
    colour: '#F4A261',
    data: managedMovesValues.map((v, i) => ({ date: new Date(2014 + i, 0, 1), value: v })),
  },
];

const annotations: Annotation[] = [
  { date: new Date(2019, 0, 1), label: '2019: Timpson Review of School Exclusion published' },
  { date: new Date(2020, 0, 1), label: '2020: COVID-19 — exclusions temporarily fall' },
];

const editorialRefs: Reference[] = [
  { num: 1, name: 'Department for Education', dataset: 'Schools, Pupils and their Characteristics', url: 'https://www.gov.uk/government/collections/statistics-school-and-pupil-numbers', date: '2024' },
  { num: 2, name: 'Department for Education', dataset: 'Permanent Exclusions and Suspensions in England', url: 'https://www.gov.uk/government/collections/statistics-exclusions', date: '2024' },
  { num: 3, name: 'Timpson Review', dataset: 'Review of School Exclusion', date: '2019' },
  { num: 4, name: 'Department for Education', dataset: 'Key Stage 4 Performance', date: '2024' },
  { num: 5, name: 'Ministry of Justice', dataset: 'Prisoner education background data', date: '2024' },
  { num: 6, name: 'ISOS Partnership', dataset: 'SAFE Programme Evaluation', date: '2025' },
];

export default function AlternativeProvisionPage() {
  return (
    <>
      <TopicNav topic="Education & Skills" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Education & Skills"
          question="What actually happens when a child is excluded from school?"
          finding="Around 41,000 children in England are educated in alternative provision — up 70% since 2014. Just 4% achieve grade 4 or above in English and Maths, compared with 66% in mainstream schools. The exclusion pipeline disproportionately affects children with SEND, those on free school meals, and Black Caribbean pupils."
          colour="#2A9D8F"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Alternative provision is where children go when mainstream school has given up on them — or, more accurately, when the system around them has failed to provide what they need. Around 41,000 children in England now attend AP settings: pupil referral units, hospital schools, and a patchwork of registered and unregistered providers.<Cite nums={1} /> That number has risen 70% since 2014, driven by a sustained increase in permanent exclusions and the harder-to-track practice of managed moves, where schools remove pupils from their rolls without formal exclusion.<Cite nums={2} /> The Timpson Review in 2019 found that exclusion is not random. Children with special educational needs are six times more likely to be permanently excluded than their peers. Those eligible for free school meals are four times more likely. Black Caribbean pupils are excluded at three times the rate of White British pupils.<Cite nums={3} /> These disparities have persisted for over a decade and have not meaningfully narrowed.</p>
            <p>The quality of alternative provision varies enormously. Some AP settings deliver exceptional pastoral care and tailored curricula. Others operate in substandard buildings with high staff turnover and weak safeguarding. The attainment gap tells the starkest story: just 4% of AP pupils achieve grade 4 or above in both English and Maths at Key Stage 4, compared with 66% in mainstream schools.<Cite nums={4} /> For most children who enter AP, the pathway leads to NEET status, involvement in the criminal justice system, or both. Ministry of Justice data shows that 42% of prisoners attended AP or a pupil referral unit as children.<Cite nums={5} /> The SAFE (Support, Attend, Fulfil, Exceed) programme, piloted in 12 local authorities, takes an early-intervention approach — embedding specialist staff in mainstream schools to prevent exclusions before they happen. Early results show a 23% reduction in permanent exclusions in pilot areas.<Cite nums={6} /></p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'AP pupils' },
          { id: 'sec-chart2', label: 'Exclusions' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Children in alternative provision"
              value="41,000"
              unit="2024"
              direction="up"
              polarity="up-is-bad"
              changeText="+70% since 2014 · 82% have SEND · 64% eligible for FSM"
              sparklineData={apPupilsValues.slice(-8)}
              source="DfE — Schools, Pupils and their Characteristics 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="AP pupils achieving grade 4+ English & Maths"
              value="4%"
              unit="2024"
              direction="flat"
              polarity="up-is-good"
              changeText="vs 66% in mainstream · gap of 62 percentage points · unchanged for a decade"
              sparklineData={apAttainmentValues.slice(-8)}
              source="DfE — Key Stage 4 Performance 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Permanent exclusions"
              value="7,600"
              unit="2024"
              direction="up"
              polarity="up-is-bad"
              changeText="+54% since 2014 · plus ~13,800 managed moves · SEND pupils 6x more likely"
              sparklineData={permanentExclusionsValues.slice(-8)}
              source="DfE — Permanent Exclusions and Suspensions in England 2024"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Children in alternative provision, England, 2014–2024"
              subtitle="Total pupils in pupil referral units, AP academies, and AP free schools. Up 70% in a decade, with a brief pandemic dip in 2020."
              series={series1}
              annotations={[{ date: new Date(2020, 0, 1), label: '2020: COVID-19 — exclusions temporarily fall' }]}
              yLabel="Pupils"
              source={{ name: 'Department for Education', dataset: 'Schools, Pupils and their Characteristics', url: 'https://www.gov.uk/government/collections/statistics-school-and-pupil-numbers', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Permanent exclusions and managed moves, England, 2014–2024"
              subtitle="Permanent exclusions are formally recorded (red). Managed moves are estimated — no mandatory national reporting exists (amber). Together they drive the growth in AP numbers."
              series={series2}
              annotations={annotations}
              yLabel="Children"
              source={{ name: 'Department for Education', dataset: 'Permanent Exclusions and Suspensions in England', url: 'https://www.gov.uk/government/collections/statistics-exclusions', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="SAFE programme shows early intervention works"
            value="23%"
            unit="reduction in permanent exclusions in SAFE pilot areas"
            description="The SAFE (Support, Attend, Fulfil, Exceed) programme, piloted in 12 local authorities from 2023, embeds specialist staff in mainstream schools to identify and support children at risk of exclusion before a crisis point is reached. Early evaluation results show a 23% reduction in permanent exclusions in pilot areas compared with comparable schools not in the programme. The government's AP Taskforce, established in 2024, is developing national quality standards for all AP settings, with mandatory registration for unregistered providers expected by 2026. The Timpson Review's core recommendation — that exclusion should be a genuine last resort — is now being translated into operational requirements, with new DfE guidance requiring schools to document what interventions were attempted before exclusion."
            source="Source: DfE — AP Taskforce Terms of Reference 2024. ISOS Partnership — SAFE Programme Evaluation 2025. Timpson Review of School Exclusion 2019."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.gov.uk/government/collections/statistics-school-and-pupil-numbers" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DfE — Schools, Pupils and their Characteristics</a> — annual census data. AP pupil numbers by setting type.</p>
            <p><a href="https://www.gov.uk/government/collections/statistics-exclusions" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DfE — Permanent Exclusions and Suspensions in England</a> — annual data on formal exclusions and suspensions. Managed moves are estimated from school census data and are not separately reported at national level.</p>
            <p>Key Stage 4 attainment figures for AP pupils are drawn from DfE performance tables. Grade 4+ in English and Maths is the standard pass measure. AP includes PRUs, AP academies, and AP free schools. Unregistered provision is excluded from all figures.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
