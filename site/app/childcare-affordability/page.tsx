'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'Coram Family and Childcare', dataset: 'Childcare Survey', url: 'https://www.familyandchildcaretrust.org/childcare-survey', date: '2024' },
  { num: 2, name: 'DfE', dataset: 'Childcare and Early Years Providers', url: 'https://explore-education-statistics.service.gov.uk/find-statistics/childcare-and-early-years-provider-survey', date: '2024' },
  { num: 3, name: 'IFS', dataset: 'The Cost of Childcare', url: 'https://ifs.org.uk/research/childcare', date: '2024' },
];

const avgFullTimeValues = [211, 224, 237, 251, 264, 263, 270, 285, 302, 318, 329];
const wageShareValues = [28.4, 29.1, 30.2, 31.0, 32.1, 32.8, 33.5, 35.2, 36.8, 38.1, 39.2];
const providerClosureValues = [1200, 1400, 1600, 1800, 1900, 4200, 2100, 1800, 1700, 1600, 1500];
const freeHoursUptakeValues = [72.1, 73.4, 74.2, 75.1, 76.2, 75.8, 77.1, 78.4, 79.2, 80.1, 81.4];

const series1: Series[] = [
  { id: 'cost', label: 'Avg weekly full-time nursery cost (£)', colour: '#E63946', data: avgFullTimeValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
  { id: 'wageShare', label: 'Cost as % of median gross wage', colour: '#F4A261', data: wageShareValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
];

const series2: Series[] = [
  { id: 'closures', label: 'Childcare provider closures per year', colour: '#2A9D8F', data: providerClosureValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
  { id: 'uptake', label: 'Free entitlement uptake (%)', colour: '#264653', data: freeHoursUptakeValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
];

const annotations1: Annotation[] = [
  { date: new Date(2020, 2, 1), label: '2020: COVID — nurseries closed' },
  { date: new Date(2024, 8, 1), label: '2024: Expanded free hours (9m–3yr)' },
];

export default function ChildcareAffordabilityPage() {
  return (
    <>
      <TopicNav topic="Childcare Affordability" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Education"
          question="Is Childcare Still Affordable in Britain?"
          finding={<>Full-time nursery care in England now costs an average of £329 per week — 39% of the median gross wage — making UK childcare among the most expensive in the OECD relative to incomes.<Cite nums={1} /> The high cost is the primary reason around 1.7 million women are economically inactive or working part-time against their preference, representing a significant drag on GDP growth.<Cite nums={[1, 3]} /></>}
          colour="#2A9D8F"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The cost of childcare in England has risen consistently for over a decade, driven by rising staff wages (which are the dominant cost in any childcare setting), property costs, and regulatory requirements. At £329 per week for full-time nursery care in 2024, childcare consumes 39% of the median gross wage — meaning that for many families, particularly single parents or second earners on average wages, working full-time barely covers childcare costs after tax. This &quot;childcare trap&quot; has a disproportionate impact on women: the IFS estimates that around 1.7 million women are out of work or working fewer hours than they would prefer because of childcare costs or availability.<Cite nums={3} /></p>
            <p>The government has committed to a significant expansion of free childcare hours — extending the 30 hours of free provision currently available for 3- and 4-year-olds to include children from 9 months, rolled out in phases from 2024. This is a major investment in childcare access, estimated to cost around £4 billion annually when fully implemented. However, the funding rates paid to providers under free entitlement hours have historically been set below the actual cost of provision, causing providers to cross-subsidise with charges for additional hours or for paid places — or to exit the market entirely. Around 1,500 childcare providers closed in 2023/24, creating desert areas in some communities where no regulated childcare is available at any price.<Cite nums={[1, 2]} /></p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Overview' },
          { id: 'sec-chart1', label: 'Cost Trends' },
          { id: 'sec-chart2', label: 'Provider Supply' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard label="Weekly full-time nursery cost" value="£329" unit="average England" direction="up" polarity="up-is-bad" changeText="was £211 in 2013 · 56% increase · among OECD highest" sparklineData={[211, 224, 237, 251, 264, 263, 270, 285, 302, 318, 329]} source="Coram — Childcare Survey 2024" href="#sec-chart1" />
            <MetricCard label="Cost as % of median wage" value="39.2%" unit="of gross median wage" direction="up" polarity="up-is-bad" changeText="was 28.4% in 2013 · traps parents out of work" sparklineData={[28.4, 29.1, 30.2, 31.0, 32.1, 32.8, 33.5, 35.2, 36.8, 38.1, 39.2]} source="Coram — Childcare Survey 2024" href="#sec-chart1" />
            <MetricCard label="Free entitlement uptake" value="81.4%" unit="of eligible 3-4 year olds" direction="up" polarity="up-is-good" changeText="rising as awareness improves · still 18.6% not claiming" sparklineData={[72.1, 73.4, 74.2, 75.1, 76.2, 75.8, 77.1, 78.4, 79.2, 80.1, 81.4]} source="DfE — Childcare and Early Years Survey 2024" href="#sec-chart2" />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Average full-time nursery cost and affordability, 2013–2024"
              subtitle="Average weekly cost of full-time nursery place in England (£) and as percentage of median gross weekly wage. The affordability ratio has worsened steadily, making childcare increasingly unviable for lower earners."
              series={series1}
              annotations={annotations1}
              yLabel="£ / Percentage"
              source={{ name: 'Coram', dataset: 'Childcare Survey', url: 'https://www.familyandchildcaretrust.org/childcare-survey', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Childcare provider closures and free entitlement uptake, 2013–2024"
              subtitle="Childcare providers (nurseries, childminders) closing per year and uptake rate for free entitlement hours. COVID accelerated closures; recovery has been slow, creating supply shortages in some areas."
              series={series2}
              annotations={[]}
              yLabel="Closures / Percentage"
              source={{ name: 'DfE', dataset: 'Childcare and Early Years Providers', url: 'https://explore-education-statistics.service.gov.uk/', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Expanded free hours could unlock £28bn in GDP"
            value="£28bn"
            unit="estimated annual GDP gain from universal affordable childcare"
            description="The IFS estimates that providing affordable childcare to all families with children under five — enabling parental employment, particularly among women — could add up to £28 billion annually to UK GDP. The expanded free entitlement policy (2024–2025 rollout) is a significant step in this direction, covering children from 9 months for working parents. International evidence from Sweden and Denmark, where high-quality universal childcare is publicly funded, shows that investment in early childcare pays for itself through increased tax revenue from working parents within 5–7 years."
            source="Source: IFS — The Cost of Childcare 2024. Coram — Childcare Survey 2024."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.familyandchildcaretrust.org/childcare-survey" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Coram Family and Childcare — Childcare Survey</a> — costs, availability, free entitlement. Annual.</p>
            <p><a href="https://explore-education-statistics.service.gov.uk/find-statistics/childcare-and-early-years-provider-survey" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DfE — Childcare and Early Years Provider Survey</a> — provider numbers, closures, Ofsted ratings. Annual.</p>
            <p>Weekly cost is average for a full-time place (50 hours per week) for a child under 2 in a registered nursery. Wage affordability uses ONS Annual Survey of Hours and Earnings median gross weekly pay. Free entitlement uptake from DfE census data.</p>
          </div>
        </section>
      </main>
    </>
  );
}
