'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import PositiveCallout from '@/components/PositiveCallout';
import RelatedTopics from '@/components/RelatedTopics';

// Cycling modal share (% of all trips), 2015–2024
const modalShareValues = [1.8, 1.9, 2.0, 2.1, 2.2, 2.5, 2.3, 2.2, 2.2, 2.2];

// Protected cycle lane miles (England), 2015–2024
const protectedLanesValues = [300, 350, 400, 460, 520, 600, 620, 650, 665, 680];

const series1: Series[] = [
  {
    id: 'cycling-share',
    label: 'Cycling modal share (% of all trips)',
    colour: '#2A9D8F',
    data: modalShareValues.map((v, i) => ({ date: new Date(2015 + i, 6, 1), value: v })),
  },
];

const series2: Series[] = [
  {
    id: 'protected-lanes',
    label: 'Protected cycle lane miles (England)',
    colour: '#2A9D8F',
    data: protectedLanesValues.map((v, i) => ({ date: new Date(2015 + i, 6, 1), value: v })),
  },
];

const annotations1: Annotation[] = [
  { date: new Date(2017, 5, 1), label: '2017: Cycling & Walking Investment Strategy' },
  { date: new Date(2020, 2, 1), label: '2020: Pandemic cycling surge' },
  { date: new Date(2022, 5, 1), label: '2022: Active Travel England created' },
];

const annotations2: Annotation[] = [
  { date: new Date(2020, 2, 1), label: '2020: Emergency active travel fund' },
  { date: new Date(2024, 5, 1), label: '2024: Budget cuts active travel by 50%' },
];

const targetLine = { value: 10, label: '2030 target: 10%', colour: '#2A9D8F' };

export default function CyclingInfrastructurePage() {
  return (
    <>
      <TopicNav topic="Cycling Infrastructure" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Cycling Infrastructure"
          question="Why Is Britain Still So Dangerous for Cyclists?"
          finding="Just 2.2% of all journeys in England are made by bike — compared with 27% in the Netherlands — and the figure has barely moved in a decade despite successive government cycling strategies. England has only 680 miles of protected cycle lanes. The active travel budget was halved from £3 billion to £1.5 billion in the 2024 Autumn Budget."
          colour="#2A9D8F"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The United Kingdom has cycled through — and abandoned — cycling strategies at regular intervals since the 1990s without achieving the step-change in modal shift that has transformed transport in comparable European countries. The government's Cycling and Walking Investment Strategy, published in 2017, set a target for cycling to account for 10% of all journeys by 2025 — a target that is now, in 2026, clearly missed, with the modal share stubbornly at 2.2%. The strategy was backed by a promise of £3 billion in active travel investment through to 2025. In the 2024 Autumn Budget, the active travel budget was halved to approximately £1.5 billion.</p>
            <p>The infrastructure gap between England and the cycling nations of northern Europe is vast and structural. The Netherlands has 35,000 kilometres of protected cycling infrastructure, built over 50 years of consistent investment. England has approximately 680 miles (1,100 kilometres) of protected cycle lanes — nationally. The distinction between protected and unprotected infrastructure is critical: paint alone does not protect cyclists from vehicle collisions. Studies consistently show that cycling rates on streets with physical segregation are 4–6 times higher than on equivalent streets with only painted lanes. More than 60% of English cycling infrastructure consists of shared footways, advisory cycle lanes, or painted lanes without physical barriers — facilities that many experienced cyclists regard as worse than usable because they encourage close passes from motorists.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Modal Share' },
          { id: 'sec-chart2', label: 'Infrastructure' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Cycling share of all trips (England)"
              value="2.2%"
              unit="2024"
              direction="flat"
              polarity="up-is-good"
              changeText="barely moved since 2015 · Netherlands: 27% · 2030 target: 10%"
              sparklineData={[1.8, 1.9, 2.0, 2.1, 2.2, 2.5, 2.3, 2.2, 2.2, 2.2]}
              source="DfT — National Travel Survey 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Protected cycle lane miles (England)"
              value="680"
              unit="2024"
              direction="up"
              polarity="up-is-good"
              changeText="up from 300 in 2015 · Netherlands equivalent: 21,000 miles"
              sparklineData={[300, 350, 400, 460, 520, 600, 620, 650, 665, 680]}
              source="Active Travel England — Infrastructure Audit 2024"
              href="#sec-chart2"
            />
            <MetricCard
              label="Cyclist casualties per year"
              value="17,200"
              unit="2023"
              direction="flat"
              polarity="up-is-bad"
              changeText="880 killed or seriously injured · active travel budget halved in 2024"
              sparklineData={[17500, 17200, 16800, 17100, 9800, 15200, 17000, 17200]}
              source="DfT — Reported Road Casualties 2023"
              href="#sec-chart1"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Cycling modal share in England, 2015–2024"
              subtitle="Percentage of all trips made by bicycle. The 2020 spike reflects COVID lockdowns and reduced car journeys; the subsequent return to 2.2% confirms a structural, not behavioural, ceiling."
              series={series1}
              annotations={annotations1}
              targetLine={targetLine}
              yLabel="% of all trips"
              source={{ name: 'Department for Transport', dataset: 'National Travel Survey: England', url: 'https://www.gov.uk/government/collections/national-travel-survey-statistics', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Protected cycle lane miles in England, 2015–2024"
              subtitle="Miles of physically segregated cycling infrastructure. Excludes painted lanes, shared footways, and advisory routes. Emergency COVID-era funding briefly accelerated build-out; Budget cuts threaten post-2024 progress."
              series={series2}
              annotations={annotations2}
              yLabel="Miles of protected lanes"
              source={{ name: 'Active Travel England', dataset: 'Cycling and Walking Investment Strategy Annual Report', url: 'https://www.gov.uk/government/publications/cycling-and-walking-investment-strategy', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="London's modal share: 4–5% and rising"
            value="4–5%"
            unit="London cycling modal share — double the national average"
            description="London's cycling modal share has risen to 4–5% — double the national average — with inner-borough hotspots reaching 20%. Mini-Holland schemes in Waltham Forest and Enfield show it is possible to achieve Dutch-style cycling rates in English urban neighbourhoods with the right investment. Cycling to work generates £2.1 billion in NHS savings annually through improved cardiovascular and mental health outcomes. The evidence is clear: where infrastructure is built to Dutch standards, cycling rates follow."
            source="Source: TfL — Cycling Data 2024. Cycling UK — NHS Savings Analysis 2024."
          />
        </ScrollReveal>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.gov.uk/government/collections/national-travel-survey-statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DfT — National Travel Survey</a> — modal share and trip data. Annual. 2024.</p>
            <p><a href="https://www.gov.uk/government/publications/cycling-and-walking-investment-strategy" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Active Travel England — CWIS Annual Report</a> — protected lane miles and investment data. Annual. 2024.</p>
            <p><a href="https://www.gov.uk/government/statistics/reported-road-casualties-great-britain-annual-report-2023" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DfT — Reported Road Casualties Great Britain</a> — cyclist casualty data. Annual. 2023.</p>
            <p>Protected lane miles exclude painted advisory lanes, shared footways, and cycle tracks that are not physically separated from motor traffic. Modal share figures are from the National Travel Survey diary-based sample; they exclude walking stages and trips under 1 mile.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
