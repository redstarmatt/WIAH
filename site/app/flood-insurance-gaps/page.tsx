'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import PositiveCallout from '@/components/PositiveCallout';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

// Properties with Flood Re coverage (thousands), 2016–2024 — Flood Re
const floodReValues = [0, 50, 100, 150, 180, 200, 220, 230, 240];

// Flood insurance premiums index (2016=100), 2016–2024 — ABI
const premiumIndexValues = [100, 105, 108, 112, 116, 120, 130, 145, 155];

// Properties estimated at significant flood risk (thousands), 2015–2024 — Environment Agency
const atRiskValues = [185, 188, 190, 192, 195, 200, 205, 210, 215, 220];

const floodReSeries: Series[] = [
  {
    id: 'flood-re',
    label: 'Properties with Flood Re coverage (thousands)',
    colour: '#264653',
    data: floodReValues.map((v, i) => ({ date: new Date(2016 + i, 0, 1), value: v })),
  },
];

const riskSeries: Series[] = [
  {
    id: 'at-risk',
    label: 'Properties at significant flood risk (thousands)',
    colour: '#E63946',
    data: atRiskValues.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
];

const floodAnnotations: Annotation[] = [
  { date: new Date(2016, 3, 1), label: 'Apr 2016: Flood Re scheme launches' },
  { date: new Date(2019, 10, 1), label: '2019: Yorkshire and Midlands flooding' },
];

export default function FloodInsuranceGapsPage() {
  return (
    <>
      <TopicNav topic="Flood Insurance" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Flood Insurance"
          question="Can Flood-Risk Homeowners Actually Get Insurance?"
          finding="Flood Re — the government-backed reinsurance scheme — covers 240,000 high-risk properties. But 220,000 properties face significant flood risk, and the gap between insured and at-risk households is growing as climate change increases flood frequency. Premiums outside Flood Re have risen 55% since 2016."
          colour="#264653"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Flood Re, the reinsurance pool launched in April 2016, was designed to ensure that properties at high flood risk can access affordable home insurance. Under the scheme, insurers can cede the flood component of household policies to Flood Re — a not-for-profit entity — in exchange for a premium capped at a level related to council tax band. This prevents market failure in high-risk postcodes where commercial insurers would otherwise either refuse cover or charge prohibitive premiums. By 2024, approximately 240,000 properties had benefited from Flood Re cover, with premiums reduced by an average of 25–50% compared to the unsubsidised commercial rate.</p>
            <p>However, significant gaps remain. Flood Re excludes properties built after 2009 (to avoid incentivising development in flood risk areas), leasehold flats, and small businesses — the last of which are particularly vulnerable. The scheme is also a transitional measure designed to run until 2039, after which it is expected to wind down as risk-reflective pricing and adaptation investment reduce the subsidy required. Climate change is increasing the number of properties at significant flood risk faster than investment in flood defences can protect them: the Environment Agency estimates this number has grown from around 185,000 in 2015 to approximately 220,000 in 2024. Insurance premiums for properties not eligible for Flood Re have risen around 55% since 2016.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Flood Re coverage' },
          { id: 'sec-chart2', label: 'At-risk properties' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Properties with Flood Re cover"
              value="240,000"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="Up from 0 in 2016 · covers high-risk pre-2009 homes"
              sparklineData={[0, 50, 100, 150, 180, 200, 220, 230, 240]}
              source="Flood Re · Annual report 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Properties at significant flood risk"
              value="220,000"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Rising with climate change · up from 185,000 in 2015"
              sparklineData={[185, 188, 190, 192, 195, 200, 205, 210, 215, 220]}
              source="Environment Agency · National flood risk assessment 2024"
              href="#sec-chart2"
            />
            <MetricCard
              label="Premium increase outside Flood Re"
              value="+55%"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Since 2016 · unsubsidised market pricing in risk"
              sparklineData={[100, 105, 108, 112, 116, 120, 130, 145, 155]}
              source="ABI · Household insurance premium data 2024"
              href="#sec-chart1"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Properties with Flood Re coverage, UK, 2016–2024"
              subtitle="Cumulative properties that have benefited from the Flood Re reinsurance scheme. Growing steadily since 2016 launch, covering 240,000 high-risk homes by 2024."
              series={floodReSeries}
              annotations={floodAnnotations}
              yLabel="Properties (thousands)"
              source={{ name: 'Flood Re', dataset: 'Annual report and scheme statistics', url: 'https://www.floodre.co.uk/industry/data-and-reports/', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Properties at significant flood risk, England, 2015–2024"
              subtitle="Estimated properties with greater than 1% annual probability of flooding from rivers or sea. Rising as climate change increases flood frequency."
              series={riskSeries}
              annotations={[{ date: new Date(2019, 10, 1), label: '2019: Major flooding events' }]}
              yLabel="Properties (thousands)"
              source={{ name: 'Environment Agency', dataset: 'National flood risk assessment', url: 'https://www.gov.uk/government/collections/national-flood-risk-assessment', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Flood Re 'transition to 2039' plan includes £250m for flood resilience"
            value="£250m"
            description="Flood Re's 'Build Back Better' scheme, introduced in 2022, allows insurers to include flood resilience measures in claims settlements — replacing like-for-like with flood-resilient materials and fittings. The transition plan commits £250 million to help policyholders improve property resilience before the scheme winds down in 2039. Properties that have been flood-proofed — with flood gates, raised electrical sockets, and water-resistant finishes — are significantly less likely to require re-insurance support. Government flood defence investment of £5.6 billion (2021–2027) is protecting 336,000 properties, but the pace of climate adaptation investment needs to accelerate to keep pace with increasing flood risk."
            source="Source: Flood Re — Transition Plan 2039 and Build Back Better 2023. Environment Agency — Flood risk investment tracker 2024."
          />
        </ScrollReveal>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.floodre.co.uk/industry/data-and-reports/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Flood Re — Annual reports and scheme data</a> — statistics on policy cessions, properties covered, and premium reductions.</p>
            <p><a href="https://www.gov.uk/government/collections/national-flood-risk-assessment" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Environment Agency — National flood risk assessment</a> — estimates of properties at risk from rivers, sea, and surface water flooding.</p>
            <p><a href="https://www.abi.org.uk/data-and-resources/tools-and-resources/claims-portal/household-insurance-data/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ABI — Household insurance data</a> — market statistics on premium trends and claims for household policies.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
