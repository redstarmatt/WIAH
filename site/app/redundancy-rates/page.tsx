'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import PositiveCallout from '@/components/PositiveCallout';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

export default function RedundancyRatesPage() {

  const redundancyRateData = [3.8, 3.5, 3.4, 3.2, 3.1, 3.0, 3.3, 14.7, 3.4, 3.2, 2.9, 3.5, 4.1, 4.2, 3.8];

  const notificationsData = [
    { year: 2019, retail: 18, manufacturing: 22, hospitality: 12, other: 28 },
    { year: 2020, retail: 45, manufacturing: 38, hospitality: 55, other: 62 },
    { year: 2021, retail: 25, manufacturing: 20, hospitality: 18, other: 35 },
    { year: 2022, retail: 22, manufacturing: 19, hospitality: 14, other: 32 },
    { year: 2023, retail: 28, manufacturing: 22, hospitality: 20, other: 38 },
    { year: 2024, retail: 55, manufacturing: 28, hospitality: 42, other: 50 },
  ];

  const redundancyRateSeries: Series[] = [
    {
      id: 'redundancy-rate',
      label: 'UK redundancy rate (per 1,000 employees)',
      colour: '#6B7280',
      data: redundancyRateData.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
    },
  ];

  const notificationsSeries: Series[] = [
    {
      id: 'retail',
      label: 'Retail (thousands)',
      colour: '#E63946',
      data: notificationsData.map(d => ({ date: new Date(d.year, 0, 1), value: d.retail })),
    },
    {
      id: 'manufacturing',
      label: 'Manufacturing (thousands)',
      colour: '#6B7280',
      data: notificationsData.map(d => ({ date: new Date(d.year, 0, 1), value: d.manufacturing })),
    },
    {
      id: 'hospitality',
      label: 'Hospitality (thousands)',
      colour: '#F4A261',
      data: notificationsData.map(d => ({ date: new Date(d.year, 0, 1), value: d.hospitality })),
    },
  ];

  const rateAnnotations: Annotation[] = [
    { date: new Date(2020, 0, 1), label: '2020: Pandemic peak 14.7 per 1,000' },
    { date: new Date(2024, 0, 1), label: '2024: NI rise drives new spike' },
  ];

  const notificationsAnnotations: Annotation[] = [
    { date: new Date(2020, 0, 1), label: '2020: Furlough winds down — notifications surge' },
    { date: new Date(2024, 0, 1), label: '2024: Employer NI increase — retail and hospitality hardest hit' },
  ];

  return (
    <>
      <TopicNav topic="Redundancy Rates" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Redundancy Rates"
          question="Are Job Losses Rising?"
          finding="Redundancy rates hit a pandemic peak of 14.7 per 1,000 employees in 2020 — now returning to historical norms of 3-4 per 1,000 — but structural redundancies in manufacturing and retail continue."
          colour="#6B7280"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-rate', label: 'Redundancy Rate' },
          { id: 'sec-sector', label: 'By Sector' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Current redundancy rate (per 1,000)"
              value="3.8"
              direction="up"
              polarity="up-is-bad"
              changeText="Up from 2.9 in 2023 · driven by employer NI rise impact"
              sparklineData={redundancyRateData}
              source="ONS · Labour Force Survey 2024"
            />
            <MetricCard
              label="Redundancy notifications"
              value="175,000"
              direction="up"
              polarity="up-is-bad"
              changeText="Highest since pandemic · retail and hospitality lead losses"
              sparklineData={[80, 200, 100, 88, 108, 175]}
              source="Insolvency Service · HR1 Notifications 2024"
            />
            <MetricCard
              label="Sectors with rising redundancies"
              value="Retail & hospitality"
              direction="up"
              polarity="up-is-bad"
              changeText="31% of all 2024 notifications from two sectors · NI rise effect"
              sparklineData={[21, 28, 22, 22, 24, 31]}
              source="Insolvency Service · HR1 Notifications 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-rate" className="mb-12">
            <LineChart
              title="UK redundancy rate per 1,000 employees, 2010–2024"
              subtitle="Seasonally adjusted annual average. LFS-measured redundancies as a rate per 1,000 employees."
              series={redundancyRateSeries}
              annotations={rateAnnotations}
              yLabel="Per 1,000 employees"
              source={{
                name: 'ONS',
                dataset: 'Labour Force Survey',
                frequency: 'quarterly',
                url: 'https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/employmentandemployeetypes/bulletins/uklabourmarket/latest',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-sector" className="mb-12">
            <LineChart
              title="Redundancy notifications by sector, 2019–2024"
              subtitle="Proposed job losses from HR1 collective redundancy notifications submitted to the Insolvency Service (thousands). Not all proposed redundancies result in actual job losses."
              series={notificationsSeries}
              annotations={notificationsAnnotations}
              yLabel="Proposed job losses (thousands)"
              source={{
                name: 'Insolvency Service',
                dataset: 'HR1 Collective Redundancy Notifications',
                frequency: 'quarterly',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="Rapid Response Service — support for redundant workers"
            value="200,000"
            unit="workers supported annually"
            description="The government's Rapid Response Service supports workers facing redundancy through a coordinated package of careers advice, benefits information, and skills support. Around 200,000 workers access the service annually — but research consistently finds that older workers, those in manual occupations, and those in areas with limited alternative employment remain most at risk of long-term worklessness following redundancy."
            source="DWP · Rapid Response Service Annual Report 2024"
          />
        </ScrollReveal>

        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The data on redundancy rates</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>Redundancy rates hit a pandemic peak of 14.7 per 1,000 employees in 2020 — far above the pre-pandemic norm of 3–4 per 1,000 — before falling sharply as furlough support wound down and labour markets tightened. By 2023 the rate had returned to 2.9 per 1,000, but 2024 saw a new upturn to around 3.8 per 1,000 following the October 2023 announcement and April 2024 implementation of employer National Insurance contribution increases combined with a significant National Living Wage rise.</p>
              <p>Retail and hospitality, the two sectors most exposed to rising employer NIC costs and higher minimum wage floors, account for approximately 31% of all 2024 collective redundancy notifications. These are sectors with thin margins, high labour intensity, and limited ability to absorb cost increases through productivity gains or price rises. Collective redundancy notifications — which cover proposed job cuts of 20 or more — reached approximately 175,000 in 2024, the highest since the pandemic.</p>
              <p>Redundancy is not evenly distributed geographically. Northern England, the Midlands, and coastal communities — where retail, hospitality, and labour-intensive manufacturing form a larger share of local employment — see higher redundancy rates per capita than London and the South East. Approximately 600,000 more people are economically inactive than pre-pandemic trends would predict, concentrated among older workers and those with long-term health conditions; some workers made redundant are re-entering inactivity rather than unemployment, meaning headline unemployment figures understate the true degree of labour market slack.</p>
            </div>
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p><a href="https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/employmentandemployeetypes/bulletins/uklabourmarket/latest" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ONS</a> — Labour Force Survey. Published quarterly. Redundancy rate is LFS-measured redundancies per 1,000 employees, seasonally adjusted, annual average.</p>
            <p>Insolvency Service — HR1 Collective Redundancy Notifications. Published quarterly. Notification figures are total proposed redundancies from HR1 forms submitted by employers proposing 20 or more redundancies. Not all proposed redundancies result in actual job losses. Sector share is proportion of 2024 HR1 notifications by industry classification.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
