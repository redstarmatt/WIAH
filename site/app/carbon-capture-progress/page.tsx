'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

export default function CarbonCaptureProgressPage() {
  // CCS capacity: 0 across entire series — no commercial capture yet
  const ccsCapacityData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  // Target trajectory 2015–2024 (interpolated from 0 to where we should be by 2024 on path to 25 MtCO2 by 2030)
  const targetTrajectoryData = [0.5, 1.0, 2.0, 3.5, 5.0, 7.0, 9.0, 12.0, 16.0, 20.0];
  // Public investment committed (£bn cumulative)
  const publicInvestmentData = [0, 0, 0.1, 0.8, 1.0, 1.0, 1.5, 6.0, 10.0, 22.0];
  // Global CCS operational capacity MtCO2/yr (2015–2024)
  const globalCcsData = [28, 30, 33, 35, 37, 38, 40, 42, 44, 50];
  // UK share: 0 throughout
  const ukGlobalShareData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  const chart1Series: Series[] = [
    {
      id: 'actual',
      label: 'UK CCS capacity (operational, MtCO2/yr)',
      colour: '#E63946',
      data: ccsCapacityData.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
    {
      id: 'target',
      label: 'Required trajectory to 2030 target',
      colour: '#6B7280',
      data: targetTrajectoryData.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
  ];

  const chart1Annotations: Annotation[] = [
    { date: new Date(2021, 0, 1), label: '2021: Track-1 clusters selected' },
    { date: new Date(2023, 0, 1), label: '2023: £22bn committed' },
  ];

  const chart1Target = { value: 25, label: '2030 target: 25 MtCO2/yr' };

  const chart2Series: Series[] = [
    {
      id: 'global',
      label: 'Global CCS capacity (MtCO2/yr)',
      colour: '#264653',
      data: globalCcsData.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
    {
      id: 'uk',
      label: 'UK CCS capacity (MtCO2/yr)',
      colour: '#E63946',
      data: ukGlobalShareData.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
  ];

  return (
    <>
      <TopicNav topic="Carbon Capture Progress" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Carbon Capture Progress"
          question="How Close Is the UK to Carbon Capture at Scale?"
          finding="The UK has committed to capturing 20–30 MtCO2 per year by 2030 — but only 0 tonnes of carbon have been captured commercially so far, with major CCS projects repeatedly delayed."
          colour="#2A9D8F"
          preposition="on"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-charts', label: 'Charts' },
          { id: 'sec-context', label: 'Context' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="CCS capacity deployed (MtCO2/yr)"
              value="0"
              direction="flat"
              polarity="up-is-bad"
              changeText="Zero commercial CCS operational in UK · 2030 target is 20–30 Mt"
              sparklineData={[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]}
              source="DESNZ · CCUS Programme Update 2024"
              href="#sec-charts"
            />
            <MetricCard
              label="2030 CCS capture target (MtCO2/yr)"
              value="20–30"
              direction="flat"
              polarity="up-is-good"
              changeText="Set in Net Zero Strategy 2021 · off track"
              sparklineData={[2, 4, 6, 8, 10, 12, 15, 18, 22, 25]}
              source="DESNZ · Net Zero Strategy 2021"
              href="#sec-charts"
            />
            <MetricCard
              label="Years of delay on flagship projects"
              value="5+"
              direction="up"
              polarity="up-is-bad"
              changeText="Track-1 clusters now not before 2028–29 · selected 2021"
              sparklineData={[0, 0, 1, 1, 2, 3, 4, 5, 5, 5]}
              source="DESNZ · HyNet / East Coast Cluster 2024"
              href="#sec-charts"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-charts" className="mb-12">
            <LineChart
              title="UK CCS capacity vs required trajectory, 2015–2024 (MtCO2/yr)"
              subtitle="Operational carbon capture capacity and the trajectory needed to reach the 2030 target of 20–30 MtCO2/yr."
              series={chart1Series}
              targetLine={chart1Target}
              annotations={chart1Annotations}
              yLabel="MtCO2 per year"
              source={{
                name: 'DESNZ',
                dataset: 'CCUS Programme Update',
                frequency: 'annual',
                url: 'https://www.gov.uk/government/publications/carbon-capture-usage-and-storage-ccus-programme',
                date: 'Dec 2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="Global CCS capacity vs UK contribution, 2015–2024 (MtCO2/yr)"
              subtitle="The world has built over 50 MtCO2/yr of operational CCS. The UK's share is zero."
              series={chart2Series}
              yLabel="MtCO2 per year"
              source={{
                name: 'Global CCS Institute',
                dataset: 'Global Status of CCS Report',
                frequency: 'annual',
                url: 'https://www.globalccsinstitute.com/resources/global-status-report/',
                date: 'Dec 2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-context" className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The data on carbon capture progress</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>The UK government's net zero strategy relies substantially on Carbon Capture, Usage and Storage (CCUS) to decarbonise hard-to-abate sectors — steel, cement, chemicals, and blue hydrogen production — with a target of capturing 20–30 million tonnes of CO2 per year by 2030. As of 2026, not a single commercial CCUS plant is operational in the UK. The government's Track-1 industrial clusters — HyNet in the North West and the East Coast Cluster around Teesside and Humberside — were selected in 2021 as priority development sites but have been delayed by protracted commercial negotiations over risk allocation, contract pricing, and CO2 transport and storage tariffs. Track-1 operations are now not expected before 2028–29 at the earliest, more than two years behind the original timetable.</p>
              <p>The gap between ambition and delivery creates knock-on risks for the overall net zero pathway. If CCS targets are missed, the residual emissions it was supposed to address will need to be offset through additional renewable generation, demand reduction, or expensive international credits. The Climate Change Committee's 2024 Progress Report identified CCUS deployment as one of the areas of greatest concern in the near-term carbon budget. The government has committed £22 billion in public investment, but disbursement lags significantly behind the stated timeline, and the commitment is spread over 25 years rather than representing an upfront capital commitment.</p>
              <p>The delay risk is primarily commercial and policy rather than technological. CCS technology is proven at scale in Norway (Sleipner, operational since 1996) and other countries — the global fleet now exceeds 50 MtCO2/yr operational capacity. The UK's challenge is constructing the commercial frameworks under which private capital will finance the capture, compression, transport, and storage infrastructure. Until those frameworks are settled, projects remain in planning rather than construction. The longer Track-1 is delayed, the steeper the ramp-up required in the 2030s — and the more expensive it will be to meet carbon budgets through alternative means.</p>
            </div>
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p><a href="https://www.gov.uk/government/publications/carbon-capture-usage-and-storage-ccus-programme" className="text-wiah-blue hover:underline" target="_blank" rel="noopener noreferrer">DESNZ — CCUS Programme Update</a>. Investment figures represent committed government support across 25 years, not upfront expenditure. No commercial CCS operational in UK as of March 2026.</p>
            <p><a href="https://www.theccc.org.uk/publication/progress-in-reducing-emissions-2024-report-to-parliament/" className="text-wiah-blue hover:underline" target="_blank" rel="noopener noreferrer">Climate Change Committee — 2024 Progress Report to Parliament</a>. Track-1 cluster timeline from DESNZ HyNet and East Coast Cluster project documentation. CCS capture target from Net Zero Strategy 2021 and Powering Up Britain 2023.</p>
            <p><a href="https://www.globalccsinstitute.com/resources/global-status-report/" className="text-wiah-blue hover:underline" target="_blank" rel="noopener noreferrer">Global CCS Institute — Global Status of CCS Report 2024</a>. Global operational capacity covers commercial-scale facilities. Required trajectory interpolated from 2030 target assuming linear ramp-up from 2026 first operations.</p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
