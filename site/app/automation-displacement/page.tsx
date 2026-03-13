'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'ONS', dataset: 'Labour Force Survey — Employment by Occupation', url: 'https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/employmentandemployeetypes', date: '2024' },
  { num: 2, name: 'OECD', dataset: 'Automation risk classification (Arntz, Gregory & Zierahn)', url: 'https://www.oecd.org/employment/automation.htm', date: '2024' },
  { num: 3, name: 'ONS', dataset: 'Labour Market Statistics — Routine task employment', url: 'https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/employmentandemployeetypes/datasets/labourmarketstatistics', date: '2024' },
];

export default function AutomationDisplacementPage() {
  // Chart 1: Automation risk by occupation 2018–2024
  const highRisk = [22.1, 22.4, 22.3, 22.5, 22.6, 22.5, 22.4];
  const medRisk  = [38.2, 38.0, 37.9, 37.6, 37.4, 37.2, 37.0];
  const lowRisk  = [39.7, 39.6, 39.8, 39.9, 40.0, 40.3, 40.6];

  const riskSeries: Series[] = [
    {
      id: 'high',
      label: 'High automation risk (% of jobs)',
      colour: '#E63946',
      data: highRisk.map((v, i) => ({ date: new Date(2018 + i, 0, 1), value: v })),
    },
    {
      id: 'medium',
      label: 'Medium automation risk (% of jobs)',
      colour: '#F4A261',
      data: medRisk.map((v, i) => ({ date: new Date(2018 + i, 0, 1), value: v })),
    },
    {
      id: 'low',
      label: 'Low automation risk (% of jobs)',
      colour: '#2A9D8F',
      data: lowRisk.map((v, i) => ({ date: new Date(2018 + i, 0, 1), value: v })),
    },
  ];

  const riskAnnotations: Annotation[] = [
    { date: new Date(2020, 0, 1), label: '2020: COVID accelerates automation' },
    { date: new Date(2023, 0, 1), label: '2023: Generative AI mainstreams' },
  ];

  // Chart 2: Employment in routine vs non-routine jobs 2010–2024
  const routineJobs    = [9200, 9100, 8950, 8800, 8650, 8500, 8350, 8200, 8050, 7900, 7700, 7600, 7500, 7450, 7400];
  const nonRoutineJobs = [19800, 20100, 20500, 20900, 21300, 21700, 22100, 22500, 22800, 23100, 23300, 23600, 23900, 24100, 24300];

  const employmentSeries: Series[] = [
    {
      id: 'routine',
      label: 'Routine task jobs (thousands)',
      colour: '#E63946',
      data: routineJobs.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
    },
    {
      id: 'non-routine',
      label: 'Non-routine jobs (thousands)',
      colour: '#2A9D8F',
      data: nonRoutineJobs.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
    },
  ];

  const employmentAnnotations: Annotation[] = [
    { date: new Date(2016, 0, 1), label: '2016: OECD automation risk report' },
    { date: new Date(2020, 0, 1), label: '2020: Pandemic shock' },
  ];

  return (
    <>
      <TopicNav topic="Automation & Displacement" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Automation & Displacement"
          question="How Many Jobs Are at Risk from Automation?"
          finding="7.4 million UK jobs are at high risk of automation — 22% of the workforce — concentrated in transport, retail, and administrative roles, with lowest-paid workers most exposed."
          colour="#6B7280"
          preposition="with"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-risk', label: 'Risk by occupation' },
          { id: 'sec-employment', label: 'Routine vs non-routine' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <section id="sec-metrics" className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Jobs at high automation risk (millions)"
              value="7.4"
              direction="up"
              polarity="up-is-bad"
              changeText="22% of UK workforce · transport, retail, admin most exposed"
              sparklineData={[6.5, 6.7, 6.9, 7.0, 7.1, 7.3, 7.4]}
              source="ONS / OECD — 2024"
            />
            <MetricCard
              label="Share of workforce at high risk (%)"
              value="22"
              direction="flat"
              polarity="up-is-bad"
              changeText="stable since 2018 · lowest-paid workers most exposed"
              sparklineData={[22.1, 22.4, 22.3, 22.5, 22.6, 22.5, 22.4]}
              source="ONS Labour Force Survey — 2024"
            />
            <MetricCard
              label="Routine task jobs lost since 2010 (thousands)"
              value="1,800"
              direction="down"
              polarity="down-is-bad"
              changeText="down from 9.2m to 7.4m · structural shift ongoing"
              sparklineData={[9200, 9100, 8950, 8800, 8650, 8500, 8350, 8200, 8050, 7900, 7700, 7600, 7500, 7450, 7400]}
              source="ONS Labour Market Statistics — 2024"
            />
          </div>
        </section>

        <ScrollReveal>
          <section id="sec-risk" className="mb-12">
            <LineChart
              title="Automation risk by occupation, UK, 2018–2024"
              subtitle="Share of jobs classified as high, medium, or low automation risk. England and Wales."
              series={riskSeries}
              annotations={riskAnnotations}
              yLabel="% of jobs"
              source={{
                name: 'ONS / OECD',
                dataset: 'Automation risk by occupation',
                frequency: 'annual',
                url: 'https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/employmentandemployeetypes',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-employment" className="mb-12">
            <LineChart
              title="Employment in routine vs non-routine jobs, UK, 2010–2024"
              subtitle="Thousands of workers in jobs classified by task routineness. UK."
              series={employmentSeries}
              annotations={employmentAnnotations}
              yLabel="Employment (thousands)"
              source={{
                name: 'ONS',
                dataset: 'Labour Force Survey — routine task employment',
                frequency: 'annual',
                url: 'https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/employmentandemployeetypes/datasets/labourmarketstatistics',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The data on automation and jobs</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>Around 7.4 million UK jobs — roughly 22% of the workforce — are classified as at high risk of automation according to OECD methodology.<Cite nums={[1, 2]} /> These are jobs where most tasks could, in principle, be performed by current or near-future automated systems. Transport and logistics, retail, and administrative and secretarial occupations account for the largest share.<Cite nums={2} /> The pattern is not random: automation risk correlates strongly with lower wages, fewer qualifications required, and limited union representation.</p>
              <p>The story of routine task employment since 2010 shows a structural shift already underway. Roughly 1.8 million jobs classified as routine — those following predictable, codifiable procedures — have disappeared from the UK economy over the past 14 years, while non-routine employment has grown by around 4.5 million.<Cite nums={3} /> This hollowing out of middle-skill routine work is well-established in labour economics and predates the current wave of generative AI.</p>
              <p>The arrival of large language models and general-purpose AI tools from 2022 onwards has extended automation risk upward into cognitive and professional roles previously considered safe. Legal research, coding, financial analysis, and customer service work now sit in scope. The distributional question — who absorbs these transitions and who is left behind — remains inadequately addressed by current policy.</p>
            </div>
          </section>
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p><a href="https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/employmentandemployeetypes" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ONS Labour Force Survey</a> — primary employment data. Retrieved 2024.</p>
            <p><a href="https://www.oecd.org/employment/automation.htm" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">OECD</a> — automation risk classification methodology (Arntz, Gregory &amp; Zierahn, 2016). Figures are estimates based on task content of occupations.</p>
            <p>Routine vs non-routine classification follows Autor &amp; Dorn (2013). All figures are for the UK unless otherwise stated.</p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
