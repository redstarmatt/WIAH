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
  { num: 1, name: 'MCS Certification', dataset: 'Heat pump installer statistics', url: 'https://mcscertified.com/mcs-data-insights/', date: '2025' },
  { num: 2, name: 'DESNZ', dataset: 'Green Jobs Taskforce report', url: 'https://www.gov.uk/government/publications/green-jobs-taskforce-report', date: '2025' },
  { num: 3, name: 'DESNZ / EMSI', dataset: 'Green job vacancies analysis', url: 'https://www.gov.uk/government/statistics/uk-low-carbon-economy-indicators', date: '2025' },
  { num: 4, name: 'OWIC', dataset: 'Offshore Wind Sector Deal progress report', date: '2024', url: 'https://www.owic.org.uk/' },
];

// Heat pump installers trained per year (thousands), 2019–2025
const heatPumpTrainedK = [0.5, 0.8, 1.2, 1.8, 2.5, 3.0, 3.2];
// Heat pump installers needed by 2028 — static target
const heatPumpTargetK = [130, 130, 130, 130, 130, 130, 130];
// Green job vacancies per quarter (thousands), 2020–2025
const greenVacanciesK = [35, 40, 62, 110, 165, 215];
// Offshore wind workers (thousands), 2019–2025 (current vs needed by 2030)
const offshoreWindCurrentK = [18, 20, 22, 25, 28, 30, 32];

const heatPumpSeries: Series[] = [
  {
    id: 'trained',
    label: 'Heat pump installers trained per year (thousands)',
    colour: '#2A9D8F',
    data: heatPumpTrainedK.map((v, i) => ({ date: new Date(2019 + i, 5, 1), value: v })),
  },
  {
    id: 'target',
    label: 'Installers needed by 2028 (thousands)',
    colour: '#E63946',
    data: heatPumpTargetK.map((v, i) => ({ date: new Date(2019 + i, 5, 1), value: v })),
  },
];

const vacanciesSeries: Series[] = [
  {
    id: 'vacancies',
    label: 'UK green job vacancies per quarter (thousands)',
    colour: '#2A9D8F',
    data: greenVacanciesK.map((v, i) => ({ date: new Date(2020 + i, 5, 1), value: v })),
  },
  {
    id: 'offshore-wind',
    label: 'Offshore wind workers (thousands)',
    colour: '#264653',
    data: offshoreWindCurrentK.map((v, i) => ({ date: new Date(2019 + i, 5, 1), value: v })),
  },
];

const heatPumpAnnotations: Annotation[] = [
  { date: new Date(2022, 5, 1), label: '2022: Boiler Upgrade Scheme launched' },
  { date: new Date(2025, 5, 1), label: '2025: Clean Energy Skills Bootcamps begin' },
];

const vacanciesAnnotations: Annotation[] = [
  { date: new Date(2021, 5, 1), label: '2021: Net zero by 2050 — skills demand surges' },
  { date: new Date(2023, 5, 1), label: '2023: British Energy Security Strategy' },
];

export default function GreenSkillsGapPage() {
  return (
    <>
      <TopicNav topic="Green Economy" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Green Economy"
          question="Does Britain Have the Workers for Net Zero?"
          finding="The UK needs 130,000 heat pump installers by 2028 but is training 3,200 a year. Green job vacancies have grown fivefold since 2020. Offshore wind needs 100,000 workers by 2030 against a current workforce of 32,000."
          colour="#2A9D8F"
          preposition="for"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Net zero requires the UK to deploy 600,000 heat pumps per year by 2028, retrofit 19 million homes by 2035, install 300,000 EV charging points by 2030, and build a workforce for 50 GW of offshore wind. Each of these transitions is workforce-constrained. MCS Certification records show approximately 3,200 heat pump installers trained in 2025 — 2.4% of the 130,000 needed by 2028.<Cite nums={1} /> The Boiler Upgrade Scheme and building regulations requiring heat pumps in new homes are driving demand, but training supply is nowhere near keeping pace. Existing gas engineers can retrain in 12–18 months, but the Gas Safe Register has 130,000 registered engineers versus around 5,000 heat pump certified ones.<Cite nums={1} /></p>
            <p>Green job vacancies have grown fivefold since 2020, reaching an estimated 215,000 per quarter by 2025.<Cite nums={3} /> Offshore wind alone requires 100,000 workers by 2030, against a current workforce of around 32,000.<Cite nums={4} /> Ports, turbine manufacturing, subsea cable installation, and operations and maintenance are all skills-constrained. The Green Jobs Taskforce report identified 30 priority green occupations where skills gaps are most acute.<Cite nums={2} /> Regional concentration compounds the problem: offshore wind jobs cluster in Scotland, Yorkshire and the Humber, and East Anglia, but workers who need retraining — former oil and gas, automotive, and steel workers — are concentrated in different geographies.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Heat Pump Gap' },
          { id: 'sec-chart2', label: 'Vacancies' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Heat pump installers trained per year"
              value="3,200"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="vs 130,000 needed by 2028 · gap widening, not closing"
              sparklineData={heatPumpTrainedK.slice(-8).map(v => v * 1000)}
              source="MCS Certification · Heat pump installer statistics 2025"
              href="#sec-chart1"
            />
            <MetricCard
              label="Green job vacancies per quarter"
              value="215k"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="+514% since 2020 · but not enough workers to fill them"
              sparklineData={greenVacanciesK.slice(-8)}
              source="DESNZ / EMSI · Green job vacancies analysis 2025"
              href="#sec-chart2"
            />
            <MetricCard
              label="Offshore wind workers needed by 2030"
              value="100k"
              unit=""
              direction="flat"
              polarity="up-is-bad"
              changeText="Current workforce ~32k · 68,000 gap in 5 years"
              sparklineData={[20, 28, 38, 52, 68, 80, 100]}
              source="OWIC · Offshore Wind Sector Deal progress 2024"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Heat pump installers trained vs needed, UK, 2019–2025"
              subtitle="Annual MCS-certified heat pump installer completions (green) versus the 130,000 qualified installers needed by 2028 to meet government heat pump targets (red). The gap is vast and not closing."
              series={heatPumpSeries}
              annotations={heatPumpAnnotations}
              yLabel="Installers (thousands)"
              source={{ name: 'MCS Certification / DESNZ', dataset: 'Heat pump installer statistics / Green Jobs Taskforce', url: 'https://mcscertified.com/mcs-data-insights/', frequency: 'annual', date: '2025' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Green job vacancies and offshore wind workforce, UK, 2019–2025"
              subtitle="Quarterly green job vacancies (green, thousands) growing rapidly while offshore wind direct employment (blue, thousands) expands toward its 100,000 by 2030 target."
              series={vacanciesSeries}
              annotations={vacanciesAnnotations}
              yLabel="Thousands"
              source={{ name: 'DESNZ / OWIC', dataset: 'Green job vacancies analysis / Offshore Wind Sector Deal', url: 'https://www.gov.uk/government/publications/green-jobs-taskforce-report', frequency: 'annual', date: '2025' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="SkillsEngland coordinating green apprenticeships and Clean Energy Bootcamps"
            value="10"
            unit="Clean Energy Skills Bootcamps annually from 2025"
            description="The Green Jobs Taskforce roadmap identifies 30 priority green occupations and pathways to address each gap. The British Energy Security Strategy commits to 10 Clean Energy Skills Bootcamps annually, providing rapid retraining for workers from fossil fuel industries. SkillsEngland will coordinate green apprenticeship standards across the technical education system. The North Sea Transition Deal includes £16 billion for skills to support oil and gas workers retraining for offshore wind, with transferable skills from subsea engineering, electrical systems, and marine operations. Colleges in coastal communities are developing dedicated offshore wind engineering programmes that can be delivered in 12–18 months."
            source="Source: DESNZ — Green Jobs Taskforce final report 2021. DESNZ — British Energy Security Strategy 2022. North Sea Transition Authority 2024."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://mcscertified.com/mcs-data-insights/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">MCS Certification — Heat pump installer statistics</a> — Annual data on MCS-certified heat pump installer training completions. Retrieved 2025.</p>
            <p><a href="https://www.gov.uk/government/publications/green-jobs-taskforce-report" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DESNZ — Green Jobs Taskforce report</a> — Priority green occupations and skills gap analysis. Retrieved 2025.</p>
            <p><a href="https://www.gov.uk/government/statistics/uk-low-carbon-economy-indicators" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DESNZ — Low Carbon and Renewable Energy Economy Survey</a> — Annual employment data by sector. Retrieved 2025.</p>
            <p>Vacancy data from EMSI Burning Glass job posting analysis using BEIS green skills taxonomy. 130,000 installer target based on Committee on Climate Change analysis of heat pump deployment required to meet legally binding carbon budgets.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
