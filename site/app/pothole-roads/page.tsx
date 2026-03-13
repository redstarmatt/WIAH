'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

export default function PotholeRoadsPage() {
  // Local road maintenance backlog 2015–2024 (£bn)
  const backlogRaw = [10.0, 10.5, 11.2, 11.8, 12.3, 12.7, 13.2, 14.0, 14.8, 16.3];
  // Potholes reported and filled 2018–2024 (millions)
  const potholesFilledRaw = [1.6, 1.7, 1.5, 1.8, 1.9, 2.0, 2.1];
  const potholesReportedRaw = [2.0, 2.2, 2.1, 2.5, 2.8, 3.1, 3.5];

  const backlogSeries: Series[] = [
    {
      id: 'backlog',
      label: 'Road maintenance backlog (£bn)',
      colour: '#6B7280',
      data: backlogRaw.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
  ];

  const potholeSeries: Series[] = [
    {
      id: 'reported',
      label: 'Potholes reported (millions)',
      colour: '#E63946',
      data: potholesReportedRaw.map((v, i) => ({ date: new Date(2018 + i, 0, 1), value: v })),
    },
    {
      id: 'filled',
      label: 'Potholes filled (millions)',
      colour: '#6B7280',
      data: potholesFilledRaw.map((v, i) => ({ date: new Date(2018 + i, 0, 1), value: v })),
    },
  ];

  const backlogAnnotations: Annotation[] = [
    { date: new Date(2019, 0, 1), label: '2019–20: Wettest winter on record' },
    { date: new Date(2023, 0, 1), label: '2023–24: Sixth wettest winter on record' },
  ];

  return (
    <>
      <TopicNav topic="Pothole Roads" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Pothole Roads"
          question="How Bad Are Britain's Roads?"
          finding="Local councils have a £16.3 billion road maintenance backlog — a pothole is reported every 7 minutes — and the average road in England is in its worst condition in a decade."
          colour="#6B7280"
          preposition="on"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>England's local road network stretches approximately 188,000 miles — around 97% of all roads — and is maintained by 153 local highway authorities. The Annual Local Authority Road Maintenance (ALARM) survey estimated the one-time cost to bring all local roads up to a reasonable standard at £16.3 billion in 2024, up from £10 billion in 2015. The survey found that the average road surface is resurfaced only once every 77 years, against a recommended lifecycle of 10–20 years.</p>
            <p>Local authority highway maintenance spending in England fell 22% in real terms between 2010/11 and 2022/23, from £4.7 billion to £3.7 billion. During the same period, vehicle-miles on local roads increased 8%, and extreme weather events — particularly freeze-thaw cycles — have become more frequent. The winter of 2023/24 was the sixth-wettest on record, accelerating road surface failure across England.</p>
            <p>The cost to motorists is direct: the RAC reported 29,377 breakdowns caused by pothole damage in 2023 — the highest since tracking began in 2006 — with an average repair cost to motorists of £290 per incident. Councils report 54% of spending goes on reactive emergency repairs rather than planned resurfacing, perpetuating the cycle of failure.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-backlog', label: 'Maintenance Backlog' },
          { id: 'sec-potholes', label: 'Potholes' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Road maintenance backlog (£bn)"
              value="16.3"
              direction="up"
              polarity="up-is-bad"
              changeText="up 63% from £10bn in 2015 · average road resurfaced every 77 years"
              sparklineData={[10.0, 10.5, 11.2, 11.8, 12.3, 12.7, 13.2, 14.0, 14.8, 16.3]}
              source="ALARM Survey — Asphalt Industry Alliance 2024"
            />
            <MetricCard
              label="Potholes filled per year (millions)"
              value="2.1"
              direction="up"
              polarity="neutral"
              changeText="but potholes reported outpacing repairs · 3.5 million reported in 2024"
              sparklineData={[1.6, 1.7, 1.5, 1.8, 1.9, 2.0, 2.1]}
              source="ALARM Survey / Local authority returns — 2024"
            />
            <MetricCard
              label="Cost to motorists in vehicle damage (£bn/yr)"
              value="1.7"
              direction="up"
              polarity="up-is-bad"
              changeText="RAC: 29,377 breakdowns in 2023 · avg £290 per incident"
              sparklineData={[0.9, 1.0, 1.1, 1.2, 1.3, 1.5, 1.7]}
              source="RAC Pothole Index — 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-backlog" className="mb-12">
            <LineChart
              title="Local road maintenance backlog, England, 2015–2024"
              subtitle="Estimated one-time cost (£bn) to bring all local roads to an acceptable standard. Asphalt Industry Alliance ALARM Survey."
              series={backlogSeries}
              annotations={backlogAnnotations}
              yLabel="£ billion"
              source={{
                name: 'Asphalt Industry Alliance',
                dataset: 'ALARM Survey (Annual Local Authority Road Maintenance)',
                frequency: 'annual',
                url: 'https://www.asphaltuk.org/alarm-survey-page/',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-potholes" className="mb-12">
            <LineChart
              title="Potholes reported and filled, England, 2018–2024"
              subtitle="Millions of potholes reported by the public vs filled by local highway authorities per year. Gap is widening."
              series={potholeSeries}
              yLabel="Millions"
              source={{
                name: 'ALARM Survey / Local authority returns',
                dataset: 'Pothole statistics',
                frequency: 'annual',
                url: 'https://www.asphaltuk.org/alarm-survey-page/',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p><a href="https://www.asphaltuk.org/alarm-survey-page/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Asphalt Industry Alliance — ALARM Survey</a>. Annual road maintenance backlog. Retrieved 2024.</p>
            <p><a href="https://www.rac.co.uk/breakdown-cover/rac-report-on-motoring/pothole-index" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">RAC — Pothole Index</a>. Annual breakdown callout data. Retrieved 2024.</p>
            <p>Maintenance backlog is the ALARM survey estimate of one-time remediation cost for all classified local roads in England. Pothole fill figures are from local authority returns to DfT and ALARM. Vehicle damage cost estimated from RAC insurance claims and breakdown data.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
