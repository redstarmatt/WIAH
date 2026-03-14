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
  { num: 1, name: 'ONS', dataset: 'Annual Survey of Hours and Earnings (ASHE)', url: 'https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/earningsandworkinghours/bulletins/genderpaygapintheuk/2024', date: '2024' },
  { num: 2, name: 'Gov.uk', dataset: 'Gender Pay Gap Service', url: 'https://gender-pay-gap.service.gov.uk/', date: '2024' },
  { num: 3, name: 'IFS', dataset: 'The Motherhood Penalty research', date: '2024' },
];

// Full-time gender pay gap (%), 2015–2025
const fullTimeGap = [10.0, 9.4, 9.0, 8.6, 8.3, 7.9, 7.9, 7.7, 7.7, 7.8, 7.7];
// All-workers gender pay gap (%), 2015–2025
const allWorkersGap = [19.2, 18.1, 17.4, 17.3, 17.3, 15.5, 15.4, 14.9, 14.3, 14.1, 13.9];
// Financial services sector gap (%), 2015–2025
const financialSectorGap = [24.2, 24.0, 23.8, 23.6, 23.4, 23.2, 23.1, 23.0, 23.2, 23.1, 23.1];
// Education sector gap (%), 2015–2025
const educationGap = [14.5, 14.2, 13.8, 13.5, 13.2, 12.8, 12.5, 12.2, 12.0, 11.8, 11.5];

const overallGapSeries: Series[] = [
  {
    id: 'full-time',
    label: 'Full-time gap (%)',
    colour: '#264653',
    data: fullTimeGap.map((v, i) => ({ date: new Date(2015 + i, 5, 1), value: v })),
  },
  {
    id: 'all-workers',
    label: 'All-workers gap (%)',
    colour: '#E63946',
    data: allWorkersGap.map((v, i) => ({ date: new Date(2015 + i, 5, 1), value: v })),
  },
];

const sectorGapSeries: Series[] = [
  {
    id: 'financial',
    label: 'Financial services gap (%)',
    colour: '#E63946',
    data: financialSectorGap.map((v, i) => ({ date: new Date(2015 + i, 5, 1), value: v })),
  },
  {
    id: 'education',
    label: 'Education sector gap (%)',
    colour: '#2A9D8F',
    data: educationGap.map((v, i) => ({ date: new Date(2015 + i, 5, 1), value: v })),
  },
];

const overallAnnotations: Annotation[] = [
  { date: new Date(2017, 5, 1), label: '2017: Mandatory reporting for 250+ employers' },
  { date: new Date(2020, 5, 1), label: '2020: Pandemic pauses mandatory reporting' },
  { date: new Date(2023, 5, 1), label: '2023: Ethnicity pay gap reporting piloted' },
];

const sectorAnnotations: Annotation[] = [
  { date: new Date(2020, 5, 1), label: '2020: COVID reporting suspended' },
];

export default function GenderPayGapReportPage() {
  return (
    <>
      <TopicNav topic="Economy & Work" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Economy & Work"
          question="Is the Gender Pay Gap Closing?"
          finding="The median gender pay gap for full-time workers fell to 7.7% in 2024, but the gap for all workers including part-time remains at 13.9% — barely changed in a decade. The part-time penalty is the main reason."
          colour="#6B7280"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The headline gender pay gap figure for full-time workers — 7.7% in 2024 — tells a story of slow progress.<Cite nums={[1]} /> Down from 10% in 2015, it represents genuine narrowing driven by legislation, transparency, and generational shifts in women's workforce participation. But this figure flatters reality. When all employees are counted — including the millions of women in part-time roles — the gap sits at 13.9%.<Cite nums={[1]} /> Women are far more likely to work part-time than men, and part-time work pays less per hour than full-time work even for equivalent roles. This is the part-time penalty, and it remains one of the largest structural drivers of pay inequality in the UK.</p>
            <p>The motherhood penalty lies beneath the part-time gap. Research from the Institute for Fiscal Studies shows that by the time a first child reaches age 20, women earn roughly 30% less per hour than similarly-qualified men who became fathers at the same time.<Cite nums={[3]} /> Sector segregation compounds the picture: women are concentrated in lower-paying sectors — care, retail, education — while construction and finance, where pay is highest, remain overwhelmingly male. The financial services sector pay gap has barely moved in a decade, remaining at 23% despite mandatory reporting.<Cite nums={[1]} /> Since 2017, over 10,000 employers report their gender pay gap annually.<Cite nums={[2]} /> The regime has brought visibility, but the data show that visibility alone is insufficient to close structural gaps.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Overall Gap' },
          { id: 'sec-chart2', label: 'By Sector' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Full-time gender pay gap"
              value="7.7%"
              unit=""
              direction="down"
              polarity="up-is-bad"
              changeText="Down from 10% in 2015 · narrowing slowly"
              sparklineData={fullTimeGap.slice(-8)}
              source="ONS · Annual Survey of Hours and Earnings 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="All-workers gender pay gap"
              value="13.9%"
              unit=""
              direction="down"
              polarity="up-is-bad"
              changeText="Down from 19.2% in 2015 · part-time penalty dominant"
              sparklineData={allWorkersGap.slice(-8)}
              source="ONS · Annual Survey of Hours and Earnings 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Financial sector pay gap"
              value="23.1%"
              unit=""
              direction="flat"
              polarity="up-is-bad"
              changeText="Highest of any sector · barely changed in 10 years"
              sparklineData={financialSectorGap.slice(-8)}
              source="ONS · ASHE sector data 2024"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="UK gender pay gap by employment type, 2015–2025"
              subtitle="Median hourly pay gap for full-time employees (blue) and all workers including part-time (red). The part-time penalty keeps the all-workers gap persistently wider."
              series={overallGapSeries}
              annotations={overallAnnotations}
              yLabel="Pay gap (%)"
              source={{ name: 'ONS', dataset: 'Annual Survey of Hours and Earnings (ASHE)', url: 'https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/earningsandworkinghours/bulletins/genderpaygapintheuk/2024', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Gender pay gap by sector, UK, 2015–2025"
              subtitle="Financial services sector gap (red) vs education sector (green). Finance has consistently the widest gap and has barely narrowed despite mandatory reporting."
              series={sectorGapSeries}
              annotations={sectorAnnotations}
              yLabel="Sector pay gap (%)"
              source={{ name: 'ONS / Gov.uk', dataset: 'ASHE / Gender Pay Gap Service', url: 'https://gender-pay-gap.service.gov.uk/', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Mandatory pay gap reporting now covers over 10,000 employers"
            value="10,000+"
            unit="employers reporting their pay gap annually"
            description="Over 10,000 employers now report their gender pay gap annually under regulations introduced in 2017. Sectors with mandatory reporting show faster closure rates than those without. Published figures are freely searchable via the government's Gender Pay Gap Service, enabling employees, investors, and the public to compare employers directly. The government has announced plans to extend mandatory reporting to include bonus gaps and, on a voluntary basis, ethnicity pay data. Shared Parental Leave reforms under consideration would make paternity leave better paid, potentially reducing the motherhood penalty that drives much of the structural gap."
            source="Source: EHRC — Gender pay gap reporting data 2025. Gov.uk Gender Pay Gap Service 2025."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/earningsandworkinghours/bulletins/genderpaygapintheuk/2024" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ONS — Annual Survey of Hours and Earnings (ASHE)</a> — Annual data on earnings by sex, employment type, and sector. Retrieved 2025.</p>
            <p><a href="https://gender-pay-gap.service.gov.uk/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Gov.uk Gender Pay Gap Service</a> — Mandatory employer reports by all organisations with 250 or more employees. Retrieved 2025.</p>
            <p>Pay gap measured as difference between men's and women's median hourly earnings (excluding overtime) as percentage of men's median earnings. Full-time excludes part-time employees. All-workers includes part-time. Sector data from mandatory employer reports aggregated by industry classification.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
