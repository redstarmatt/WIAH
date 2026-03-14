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
  { num: 1, name: 'DESNZ', dataset: 'Low Carbon and Renewable Energy Economy Survey', url: 'https://www.gov.uk/government/statistics/uk-low-carbon-economy-indicators', date: '2024' },
  { num: 2, name: 'Offshore Wind Industry Council', dataset: 'Sector Deal progress report', url: 'https://www.orr.gov.uk', date: '2024' },
  { num: 3, name: 'ONS', dataset: 'Annual Survey of Hours and Earnings (ASHE)', date: '2023' },
];

// Low-carbon economy employment (thousands), 2014–2023
const lowCarbonJobsK = [430, 475, 520, 570, 610, 640, 660, 695, 720, 763];
// Offshore wind direct employment (thousands), 2014–2023
const offshoreWindK = [6, 8, 11, 15, 18, 22, 25, 28, 30, 32];
// Green job vacancies per quarter (thousands), 2019–2023
const greenVacanciesK = [35, 40, 62, 110, 165];
// Low-carbon sector wage premium above comparable (%), 2014–2023
const wagePremiumPct = [5, 5, 5, 6, 6, 6, 7, 7, 8, 8];

const jobsSeries: Series[] = [
  {
    id: 'low-carbon-jobs',
    label: 'Low-carbon economy employment (thousands)',
    colour: '#2A9D8F',
    data: lowCarbonJobsK.map((v, i) => ({ date: new Date(2014 + i, 6, 1), value: v })),
  },
  {
    id: 'offshore-wind',
    label: 'Offshore wind direct employment (thousands)',
    colour: '#264653',
    data: offshoreWindK.map((v, i) => ({ date: new Date(2014 + i, 6, 1), value: v })),
  },
];

const vacanciesPremiumSeries: Series[] = [
  {
    id: 'vacancies',
    label: 'Green job vacancies per quarter (thousands)',
    colour: '#F4A261',
    data: greenVacanciesK.map((v, i) => ({ date: new Date(2019 + i, 6, 1), value: v })),
  },
  {
    id: 'wage-premium',
    label: 'Low-carbon sector wage premium (%)',
    colour: '#2A9D8F',
    data: wagePremiumPct.map((v, i) => ({ date: new Date(2014 + i, 6, 1), value: v })),
  },
];

const jobsAnnotations: Annotation[] = [
  { date: new Date(2019, 6, 1), label: '2019: Offshore Wind Sector Deal' },
  { date: new Date(2022, 6, 1), label: '2022: Energy Security Strategy' },
];

const vacanciesAnnotations: Annotation[] = [
  { date: new Date(2021, 6, 1), label: '2021: Net zero by 2050 — skills demand surges' },
];

export default function GreenJobsPage() {
  return (
    <>
      <TopicNav topic="Green Economy" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Green Economy"
          question="Is the Green Economy Actually Creating Jobs?"
          finding="The low-carbon economy employs 763,000 people — up 77% since 2014 — and pays a wage premium of 8% above comparable roles. But green jobs are concentrated in the South East, with only 12% in the most deprived communities."
          colour="#2A9D8F"
          preposition="in the"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The UK's low-carbon economy has grown substantially over the past decade. DESNZ's Low Carbon and Renewable Energy Economy (LCREE) survey estimated 763,000 jobs in the sector in 2023 — up from around 430,000 in 2014, a 77% increase.<Cite nums={1} /> The sector spans renewable energy generation, energy efficiency, low-carbon heat, environmental consulting, electric vehicle supply chains, and sustainable finance. Green jobs on average pay around 8% more than comparable roles in other sectors, partly reflecting the technical skills demanded and partly reflecting the capital intensity of the energy sector.<Cite nums={3} /> The government's Green Jobs Taskforce set a target of 480,000 additional green jobs by 2030 — implying a total of over 1.2 million.</p>
            <p>Offshore wind is the green economy's most dramatic job-creating sector. The UK's offshore wind industry employed around 32,000 people directly in 2023 — up from just 6,000 in 2012 — and supports an estimated 100,000 jobs in the supply chain.<Cite nums={2} /> Major investments in port infrastructure — Teesworks, the Humber, and Nigg Energy Park in Scotland — are creating manufacturing and assembly facilities for turbine components. Scotland's offshore wind sector has emerged as a major employer in a region historically dependent on North Sea oil and gas. However, only 12% of low-carbon economy jobs are located in the 20% most deprived areas, and the geographic concentration in the South East, Scotland, and coastal areas of Yorkshire and East Anglia means the transition's employment benefits are not evenly distributed.<Cite nums={1} /></p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Employment Growth' },
          { id: 'sec-chart2', label: 'Vacancies & Premium' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Low-carbon economy jobs"
              value="763k"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="Up 77% since 2014 · target 1.2m+ by 2030"
              sparklineData={lowCarbonJobsK.slice(-8)}
              source="DESNZ · Low Carbon and Renewable Energy Economy 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Green jobs in deprived communities"
              value="12%"
              unit=""
              direction="flat"
              polarity="up-is-good"
              changeText="Only 12% in most deprived 20% of areas · concentrated in South East"
              sparklineData={[11, 11, 11, 12, 12, 12, 12, 12]}
              source="DESNZ LCREE · establishment analysis vs IMD 2024"
              href="#sec-chart2"
            />
            <MetricCard
              label="Green sector wage premium"
              value="+8%"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="vs comparable non-green roles · offshore wind engineers earn more"
              sparklineData={wagePremiumPct.slice(-8)}
              source="ONS ASHE · sectoral earnings analysis 2023"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Low-carbon economy employment, UK, 2014–2023"
              subtitle="Total low-carbon economy jobs (green) and offshore wind direct employment (blue), both in thousands. Offshore wind has grown fivefold in a decade as the UK became the world's largest offshore wind operator."
              series={jobsSeries}
              annotations={jobsAnnotations}
              yLabel="Employment (thousands)"
              source={{ name: 'DESNZ', dataset: 'Low Carbon and Renewable Energy Economy Survey', url: 'https://www.gov.uk/government/statistics/uk-low-carbon-economy-indicators', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Green job vacancies and wage premium, UK, 2014–2023"
              subtitle="Quarterly green job vacancies (amber, thousands) surging since 2020 alongside a widening wage premium (green, %) as demand for skilled workers outstrips supply."
              series={vacanciesPremiumSeries}
              annotations={vacanciesAnnotations}
              yLabel="Vacancies (thousands) / Premium (%)"
              source={{ name: 'DESNZ / ONS', dataset: 'LCREE Survey / ASHE', url: 'https://www.gov.uk/government/statistics/uk-low-carbon-economy-indicators', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Offshore wind sector: from 6,000 to 32,000 direct jobs since 2012"
            value="5×"
            unit="increase in offshore wind employment 2012–2023"
            description="Offshore wind alone employs 32,000 people directly — up from 6,000 in 2012 — and investment in Teesworks, the Humber, and Scottish ports is creating new industrial clusters. The UK Offshore Wind Sector Deal targets 70,000 jobs by 2030 with 60% UK content. Siemens Gamesa's blade plant in Hull, Vestas in Peterborough, and GE Vernova in Stafford represent the largest new manufacturing investments in their regions in a generation. The North Sea Transition Deal includes £16 billion for skills to support oil and gas workers retraining for offshore wind, with transferable technical skills from subsea engineering, electrical systems, and marine operations."
            source="Source: Offshore Wind Industry Council — Sector Deal progress report 2024. DESNZ LCREE Survey 2024."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.gov.uk/government/statistics/uk-low-carbon-economy-indicators" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DESNZ — Low Carbon and Renewable Energy Economy Survey</a> — Annual survey of employment in the low-carbon economy. Retrieved 2025.</p>
            <p><a href="https://www.orr.gov.uk" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Offshore Wind Industry Council — Sector Deal progress report</a> — Annual tracking of offshore wind employment and supply chain. Retrieved 2025.</p>
            <p>Green job geography analysis uses LCREE establishment data cross-referenced with Index of Multiple Deprivation deciles. Wage premium calculated from ONS ASHE sectoral data controlling for occupation, qualification, and region. Vacancy data from EMSI Burning Glass job posting analysis using BEIS green skills taxonomy.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
