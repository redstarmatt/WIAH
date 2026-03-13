'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import PositiveCallout from '@/components/PositiveCallout';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

export default function WaterCompanyLeakagePage() {
  const totalLeakageData = [3464, 3410, 3352, 3311, 3277, 3213, 3185, 3156, 3121, 3080, 3043, 3011, 2982, 3000];
  const byCompanyData = [
    [745, 740, 732, 726, 718, 710, 703, 696, 692, 688, 684, 680, 676, 680],
    [462, 458, 451, 445, 438, 430, 422, 415, 410, 405, 400, 396, 392, 395],
    [384, 380, 374, 370, 364, 358, 352, 347, 342, 338, 334, 330, 327, 329],
    [342, 338, 333, 328, 323, 318, 313, 309, 306, 303, 300, 297, 295, 297],
    [312, 308, 304, 301, 297, 293, 289, 286, 283, 281, 278, 276, 274, 276],
  ];

  const totalLeakageSeries: Series[] = [
    {
      id: 'leakage',
      label: 'Total daily leakage (million litres/day)',
      colour: '#264653',
      data: totalLeakageData.map((v: number, i: number) => ({ date: new Date(2010 + i, 0, 1), value: v })),
    },
  ];

  const byCompanySeries: Series[] = [
    {
      id: 'thames',
      label: 'Thames Water (Ml/day)',
      colour: '#264653',
      data: byCompanyData[0].map((v: number, i: number) => ({ date: new Date(2010 + i, 0, 1), value: v })),
    },
    {
      id: 'severn',
      label: 'Severn Trent (Ml/day)',
      colour: '#2A9D8F',
      data: byCompanyData[1].map((v: number, i: number) => ({ date: new Date(2010 + i, 0, 1), value: v })),
    },
    {
      id: 'united',
      label: 'United Utilities (Ml/day)',
      colour: '#F4A261',
      data: byCompanyData[2].map((v: number, i: number) => ({ date: new Date(2010 + i, 0, 1), value: v })),
    },
    {
      id: 'anglian',
      label: 'Anglian Water (Ml/day)',
      colour: '#6B7280',
      data: byCompanyData[3].map((v: number, i: number) => ({ date: new Date(2010 + i, 0, 1), value: v })),
    },
    {
      id: 'yorkshire',
      label: 'Yorkshire Water (Ml/day)',
      colour: '#E63946',
      data: byCompanyData[4].map((v: number, i: number) => ({ date: new Date(2010 + i, 0, 1), value: v })),
    },
  ];

  const leakageAnnotations: Annotation[] = [
    { date: new Date(2018, 0, 1), label: '2018: Ofwat sets 2019 price review targets' },
    { date: new Date(2022, 0, 1), label: '2022: Environment Act — leakage duties' },
    { date: new Date(2024, 0, 1), label: '2024: Most companies missing PR19 targets' },
  ];

  const leakageTarget = { value: 2400, label: 'Ofwat PR19 target (2,400 Ml/day by 2025)' };

  return (
    <>
      <TopicNav topic="Water Leakage" />
      <SectionNav sections={[
        { id: 'sec-metrics', label: 'Key Metrics' },
        { id: 'sec-total', label: 'Total Leakage' },
        { id: 'sec-companies', label: 'By Company' },
        { id: 'sec-context', label: 'Context' },
        { id: 'sec-sources', label: 'Sources' },
      ]} />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Water"
          question="How Much Water Is Leaking from Britain's Pipes?"
          finding="Water companies lose 3 billion litres per day to leakage — equivalent to 1 in 5 litres treated — and most companies are missing their leakage reduction targets."
          colour="#264653"
        />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 mb-12">
            <MetricCard
              label="Daily leakage (billion litres/day)"
              value="3.0"
              direction="down"
              polarity="up-is-bad"
              changeText="down from 3.5bn in 2010 · still far above Ofwat target of 2.4bn"
              sparklineData={[3.4, 3.35, 3.28, 3.21, 3.15, 3.08, 3.0]}
              source="Ofwat — Water Company Performance Report 2024"
            />
            <MetricCard
              label="Treated water lost to leakage (%)"
              value="20"
              direction="down"
              polarity="up-is-bad"
              changeText="1 in 5 litres treated never reaches a customer"
              sparklineData={[23, 22, 22, 21, 21, 20, 20]}
              source="Ofwat — Water Company Performance Report 2024"
            />
            <MetricCard
              label="Companies missing leakage targets (count)"
              value="10"
              direction="up"
              polarity="up-is-bad"
              changeText="10 of 17 companies missing their own PR19 targets"
              sparklineData={[5, 6, 7, 8, 9, 10, 10]}
              source="Ofwat — 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-total" className="mb-12">
            <LineChart
              title="Total daily water leakage, England and Wales 2010–2024 (million litres/day)"
              subtitle="Total leakage from water company distribution systems. Includes distribution losses and customer supply pipe leakage up to the meter."
              series={totalLeakageSeries}
              targetLine={leakageTarget}
              annotations={leakageAnnotations}
              yLabel="Leakage (million litres/day)"
              source={{
                name: 'Ofwat',
                dataset: 'Water company performance report — leakage data',
                frequency: 'annual',
                url: 'https://www.ofwat.gov.uk/regulated-companies/performance/comparative-performance-of-the-water-companies/',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-companies" className="mb-12">
            <LineChart
              title="Leakage by water company 2010–2024 (million litres/day)"
              subtitle="The five largest leaking companies by volume. Thames Water is the largest contributor to England and Wales total leakage."
              series={byCompanySeries}
              yLabel="Leakage (million litres/day)"
              source={{
                name: 'Ofwat',
                dataset: 'Company-level leakage performance data',
                frequency: 'annual',
                url: 'https://www.ofwat.gov.uk/regulated-companies/performance/comparative-performance-of-the-water-companies/',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout>
            Total leakage in England and Wales has fallen by 14% since 2010 — a genuine reduction driven by regulatory pressure and improved leak detection technology. Acoustic sensors, satellite monitoring, and district metering have all helped. The challenge is accelerating the pace of reduction while water companies face growing financial constraints.
          </PositiveCallout>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-context" className="max-w-2xl mb-12 mt-8">
            <h2 className="text-xl font-bold text-wiah-black mb-4">3 billion litres lost every day — and most companies are falling short</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>England and Wales loses around 3 billion litres of treated water to leakage every day — roughly 20% of all water put into the distribution system. That is equivalent to the daily water use of 20 million people, flowing not into homes and businesses but out of cracked Victorian pipes into the ground. In the context of growing water stress — driven by climate change reducing reliable rainfall and population growth increasing demand — this level of waste represents a strategic infrastructure failure.</p>
              <p>Ofwat set ambitious leakage reduction targets in the 2019 price review (PR19): companies were required to cut leakage by 16% by 2025. Most are failing to meet these commitments. Of the 17 water companies in England and Wales, 10 are missing their own PR19 leakage targets. Thames Water — which accounts for the largest single share of total leakage — has been placed under special regulatory oversight following financial difficulties. The 2019 price review targets were themselves a floor, not an ambition: independent analysis suggests leakage of under 2 billion litres per day is technically achievable.</p>
              <p>The water industry's financial structure complicates the picture. Companies carry combined debt of around £60 billion, accumulated through leveraged buyouts since privatisation. Interest payments on this debt compete with capital investment for cash. Accelerating leakage reduction requires major infrastructure spending — replacing pipes, installing smart meters, deploying real-time monitoring. Under regulatory pressure from Ofwat and government, PR24 (the 2024 price review) requires further leakage reductions alongside investment in sewage overflow elimination, storm overflow management, and resilience to climate variability.</p>
            </div>
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p><a href="https://www.ofwat.gov.uk/regulated-companies/performance/comparative-performance-of-the-water-companies/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Ofwat — Comparative Performance of the Water Companies</a> — annual report covering company-level leakage, interruptions, and customer service performance. The standard source for England and Wales water company data.</p>
            <p>Total leakage figures are the sum of all company-reported distribution losses. PR19 targets from Ofwat final determinations. Company-level targets from individual company performance commitments. The percentage of treated water lost is calculated as total leakage divided by total water put into supply. All figures are for England and Wales combined.</p>
          </div>
        </section>

        <RelatedTopics topics={[
          { href: '/water', label: 'Water Quality' },
          { href: '/water-infrastructure', label: 'Water Infrastructure' },
          { href: '/water-affordability', label: 'Water Affordability' },
          { href: '/bathing-water-quality', label: 'Bathing Water Quality' },
        ]} />
      </main>
    </>
  );
}
