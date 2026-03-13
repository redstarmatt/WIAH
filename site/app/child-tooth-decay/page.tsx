'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

// % of 5-year-olds with tooth decay and hospital admissions (thousands), 2015–2024
const decayPrevalenceData = [33, 31, 28, 24, 23, 20, 22, 24, 26, 26];
const hospitalAdmissionsData = [42, 40, 37, 34, 33, 22, 28, 31, 33, 34];

// Decay rate by deprivation quintile (most to least deprived, single year snapshot) — used in sparkline
// For time series: most deprived quintile rate vs least deprived rate, 2015–2024
const mostDeprivedData = [50, 48, 45, 43, 42, 38, 41, 43, 42, 42];
const leastDeprivedData = [16, 15, 15, 14, 14, 13, 14, 14, 14, 14];

const decaySeries: Series[] = [
  {
    id: 'decayPrevalence',
    label: '5-year-olds with tooth decay (%)',
    colour: '#E63946',
    data: decayPrevalenceData.map((v, i) => ({ date: new Date(2015 + i, 5, 1), value: v })),
  },
  {
    id: 'hospitalAdmissions',
    label: 'Hospital admissions for dental extraction <18 (thousands)',
    colour: '#F4A261',
    data: hospitalAdmissionsData.map((v, i) => ({ date: new Date(2015 + i, 5, 1), value: v })),
  },
];

const deprivationSeries: Series[] = [
  {
    id: 'mostDeprived',
    label: 'Most deprived quintile: decay rate (%)',
    colour: '#E63946',
    data: mostDeprivedData.map((v, i) => ({ date: new Date(2015 + i, 5, 1), value: v })),
  },
  {
    id: 'leastDeprived',
    label: 'Least deprived quintile: decay rate (%)',
    colour: '#2A9D8F',
    data: leastDeprivedData.map((v, i) => ({ date: new Date(2015 + i, 5, 1), value: v })),
  },
];

const decayAnnotations: Annotation[] = [
  { date: new Date(2019, 5, 1), label: '2019: Water fluoridation consultation launched' },
  { date: new Date(2020, 5, 1), label: '2020: Pandemic halts dental services — decay worsens' },
];

const deprivationAnnotations: Annotation[] = [
  { date: new Date(2022, 5, 1), label: '2022: Health and Care Act gives Ministers fluoridation powers' },
  { date: new Date(2023, 5, 1), label: '2023: NHS dental recovery plan announced' },
];

export default function ChildToothDecayPage() {
  return (
    <>
      <TopicNav topic="Child Tooth Decay" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Health"
          question="Why Is Tooth Decay the Number One Reason Children Go to Hospital?"
          finding="Tooth decay is the most common reason for hospital admission in children aged 5–9. In 2024, 34,000 children had teeth extracted under general anaesthetic — almost all preventable. Decay rates are 3× higher in deprived areas: 42% of 5-year-olds in the most deprived quintile have visible decay, against 14% in the least deprived."
          colour="#E63946"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Dental caries — tooth decay caused by acid-producing bacteria feeding on dietary sugar — is the most entirely preventable disease that nonetheless sends more children to hospital under general anaesthetic than any other condition. In 2024, 34,000 children under 18 had teeth extracted in hospital, almost all as a direct consequence of decay that could have been prevented by fluoride toothpaste, diet, routine dental check-ups, and water fluoridation. The NHS dental crisis that has left an estimated 12 million adults unable to access an NHS dentist is amplifying the problem: children who do not see a dentist routinely are diagnosed later, by which point extraction is often the only option.</p>
            <p>The social gradient is the starkest expression of health inequality in England. Children aged five in the most deprived areas have a 42% prevalence of visible tooth decay — three times the 14% rate in the least deprived areas. The gap has not narrowed materially in a decade. Sugar consumption correlates strongly with deprivation, NHS dental access is worst in deprived areas, and fluoridated water supply covers only a minority of England's population. The public health tools to address child tooth decay are well-understood and cost-effective: water fluoridation schemes reduce decay prevalence by 25–30% at population level, and supervised toothbrushing in schools reduces it by a further 30% in high-risk populations. The barrier is structural investment in NHS dentistry and preventive oral health programmes.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Decay & Admissions' },
          { id: 'sec-chart2', label: 'Deprivation Gap' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="5-year-olds with tooth decay"
              value="26%"
              unit="2024"
              direction="flat"
              polarity="up-is-bad"
              changeText="Down from 33% in 2015 but stalling since pandemic · regression in deprived areas"
              sparklineData={[33, 31, 28, 24, 23, 20, 22, 24, 26, 26]}
              source="OHID · Oral Health Survey of 5-year-olds 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Hospital admissions for tooth decay"
              value="34,000"
              unit="children per year"
              direction="flat"
              polarity="up-is-bad"
              changeText="Almost entirely preventable · #1 reason for child hospital admission aged 5–9"
              sparklineData={[42, 40, 37, 34, 33, 22, 28, 31, 33, 34]}
              source="NHS Digital · Hospital Episode Statistics 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Deprivation decay gap"
              value="3×"
              unit="most vs least deprived"
              direction="flat"
              polarity="up-is-bad"
              changeText="42% most deprived vs 14% least · gap unchanged for a decade"
              sparklineData={[3.1, 3.2, 3.0, 3.1, 3.0, 2.9, 2.9, 3.1, 3.0, 3.0]}
              source="OHID · Child Oral Health Survey 2024"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Child tooth decay prevalence and hospital admissions, England, 2015–2024"
              subtitle="Percentage of 5-year-olds with visible tooth decay (red) and children admitted for dental extraction under general anaesthetic (thousands, amber). Both improved to 2019 before the pandemic reversed gains."
              series={decaySeries}
              annotations={decayAnnotations}
              yLabel="Decay (%) / Admissions (000s)"
              source={{ name: 'OHID / NHS Digital', dataset: 'Oral Health Survey / Hospital Episode Statistics', url: 'https://www.gov.uk/government/statistics/oral-health-survey-of-5-year-old-children', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Tooth decay in 5-year-olds by deprivation quintile, England, 2015–2024"
              subtitle="Decay prevalence in the most deprived quintile (red) versus the least deprived (green). The three-fold gap between richest and poorest has not narrowed in a decade, representing one of the starkest health inequalities in England."
              series={deprivationSeries}
              annotations={deprivationAnnotations}
              yLabel="% with decay"
              source={{ name: 'OHID', dataset: 'Child Oral Health Survey — deprivation analysis', url: 'https://www.gov.uk/government/statistics/oral-health-survey-of-5-year-old-children', frequency: 'biennial', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Water fluoridation expansion: 25–30% reduction in decay at population level"
            value="25–30%"
            unit="reduction in decay prevalence from water fluoridation"
            description="The Health and Care Act 2022 gave Ministers direct powers to extend water fluoridation schemes in England without requiring lengthy local consultation processes. The government announced plans to expand fluoridation to the North East — which has the highest rates of child tooth decay — beginning in 2025. Evidence from areas with established fluoridation schemes (such as the West Midlands) shows a 25–30% reduction in decay prevalence compared to non-fluoridated areas of similar deprivation. NHS England's dental recovery plan increased investment in supervised toothbrushing programmes in schools in deprived areas, and the Start4Life programme provides oral health advice to all new parents."
            source="Source: OHID — Oral health survey of 5-year-old children 2023. NHS England — Dental recovery plan 2023. Public Health England — Water fluoridation evidence review."
          />
        </ScrollReveal>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.gov.uk/government/statistics/oral-health-survey-of-5-year-old-children" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">OHID — Oral Health Survey of 5-year-old Children</a> — decay prevalence by deprivation quintile and region. Retrieved March 2026.</p>
            <p><a href="https://digital.nhs.uk/data-and-information/publications/statistical/hospital-admitted-patient-care-activity" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS Digital — Hospital Episode Statistics</a> — dental admissions under general anaesthetic by age group. Retrieved March 2026.</p>
            <p><a href="https://www.gov.uk/government/publications/water-fluoridation-health-monitoring-report-for-england" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">UKHSA — Water Fluoridation Health Monitoring Report</a> — comparative decay rates in fluoridated vs non-fluoridated areas. Retrieved March 2026.</p>
            <p className="mt-2">Decay prevalence from OHID biennial surveys of all 5-year-olds in England; data collection by trained dental examiners in school settings. Hospital admissions for dental extraction under general anaesthetic (ICD-10 K02, K04, K08, OPCS F09). Deprivation data from Index of Multiple Deprivation linked to home postcode.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
