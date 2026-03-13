'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

const floodRiskData = [3.8, 3.9, 4.0, 4.1, 4.2, 4.3, 4.5, 4.7, 4.9, 5.0, 5.1, 5.2];
const floodRiskAnnotations: Annotation[] = [
  { date: new Date(2015, 0, 1), label: '2015: Winter floods — record damage' },
  { date: new Date(2019, 0, 1), label: '2019: Climate risk review' },
  { date: new Date(2021, 0, 1), label: '2021: Flood Re scheme expanded' },
];

const floodRiskSeries: Series[] = [
  {
    id: 'at-risk',
    label: 'Properties at significant flood risk (millions)',
    colour: '#264653',
    data: floodRiskData.map((v, i) => ({ date: new Date(2013 + i, 0, 1), value: v })),
  },
];

const damageCostData = [0.7, 1.3, 0.5, 1.6, 0.8, 1.1, 0.9, 1.2, 1.5, 1.0, 1.1, 1.4, 1.6, 1.8];
const damageCostAnnotations: Annotation[] = [
  { date: new Date(2013, 0, 1), label: '2013/14: £1.3bn winter floods' },
  { date: new Date(2015, 0, 1), label: '2015/16: £1.6bn Cumbria floods' },
  { date: new Date(2023, 0, 1), label: '2023/24: Storm Babet/Ciaran' },
];

const damageCostSeries: Series[] = [
  {
    id: 'damage',
    label: 'Annual flood damage costs (£bn)',
    colour: '#264653',
    data: damageCostData.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
  },
];

export default function FloodingPage() {
  return (
    <>
      <TopicNav topic="Flooding" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Flooding"
          question="How Bad is Britain's Flood Risk?"
          finding="5.2 million homes in England are at risk of flooding — a third more than 10 years ago — and flood damage costs the economy £1.1bn/year, set to double with climate change."
          colour="#264653"
          preposition="on"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Key numbers' },
          { id: 'sec-risk', label: 'Properties at risk' },
          { id: 'sec-costs', label: 'Damage costs' },
        ]} />

        <section id="sec-metrics" className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Homes at significant flood risk (millions)"
              value="5.2"
              direction="up"
              polarity="up-is-bad"
              changeText="2024 · Up 37% from 3.8M in 2013 · 1 in 6 English properties · Rising with climate change"
              sparklineData={[3.8, 4.0, 4.2, 4.5, 4.7, 5.0, 5.2]}
              source="Environment Agency — National Flood Risk Assessment, 2024"
            />
            <MetricCard
              label="Annual flood damage cost (£bn)"
              value="1.1"
              direction="up"
              polarity="up-is-bad"
              changeText="Long-run average · Peak years exceed £2bn · Climate projections: doubling by 2050 · Insurance gaps widening"
              sparklineData={[0.7, 1.3, 0.8, 1.1, 0.9, 1.2, 1.1]}
              source="Environment Agency — Long-term investment scenarios, 2024"
            />
            <MetricCard
              label="New homes built in flood zones (thousands)"
              value="11"
              direction="up"
              polarity="up-is-bad"
              changeText="2022/23 · 1 in 20 new homes in high flood risk areas · Planning overrides continue · DEFRA concerned"
              sparklineData={[8, 9, 9, 10, 10, 11, 11]}
              source="Environment Agency / DLUHC analysis, 2023"
            />
          </div>
        </section>

        <ScrollReveal>
          <section id="sec-risk" className="mb-12">
            <LineChart
              title="Properties at significant flood risk in England, 2013–2024 (millions)"
              subtitle="Number of residential and commercial properties at significant flood risk from rivers, sea and surface water, England. Risk is rising as climate change intensifies rainfall and sea levels rise."
              series={floodRiskSeries}
              annotations={floodRiskAnnotations}
              yLabel="Properties (millions)"
              source={{
                name: 'Environment Agency',
                dataset: 'National Flood Risk Assessment (NaFRA2)',
                url: 'https://www.gov.uk/flood-and-coastal-erosion-risk-management-research-reports/national-flood-and-coastal-erosion-risk-register',
                frequency: 'annual',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-costs" className="mb-12">
            <LineChart
              title="Annual flood damage costs, 2010–2024 (£bn)"
              subtitle="Economic cost of flood damage in England per year including property damage, infrastructure disruption and emergency response. Highly variable year-to-year depending on weather events."
              series={damageCostSeries}
              annotations={damageCostAnnotations}
              yLabel="Damage costs (£bn)"
              source={{
                name: 'Environment Agency',
                dataset: 'Long-term investment scenarios for flood and coastal erosion risk management',
                url: 'https://www.gov.uk/government/publications/flood-and-coastal-erosion-risk-management-long-term-investment-scenarios',
                frequency: 'annual',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The data on flood risk</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>5.2 million properties in England are now at significant risk of flooding from rivers, sea, or surface water — up 37% from 3.8 million in 2013. The Environment Agency's latest National Flood Risk Assessment (NaFRA2) projects this will rise further as climate change intensifies rainfall events and sea levels rise. The Climate Change Committee estimates that without significant additional adaptation investment, flood damage costs could double by 2050.</p>
              <p>Annual flood damage costs average £1.1 billion, but with enormous year-to-year variation: the 2015/16 winter floods in Cumbria, Lancashire and Yorkshire cost an estimated £1.6 billion; Storm Babet and Ciaran in autumn 2023 caused over £500 million of damage in a single week. The number of new homes being built in high flood risk areas continues to increase, with approximately 11,000 new homes granted planning permission in flood zones in 2022/23 despite Environment Agency objections.</p>
              <p>Flood insurance is becoming harder to obtain in high-risk areas. The Flood Re reinsurance scheme, which subsidises insurance for high-risk properties, covers around 350,000 homes. But as risk increases, the scheme faces growing pressure — and properties built after 2009 are excluded entirely. The gap between insured and actual losses means many flood victims bear costs that are not covered.</p>
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="Flood defence investment"
            value="£5.6bn"
            unit="committed by government for flood defences 2021–2027 — protecting 336,000 properties"
            description="The government's 2021–2027 Flood and Coastal Erosion Risk Management (FCERM) investment programme is the largest ever: £5.6 billion to construct or improve flood defences protecting 336,000 properties. Natural flood management — using trees, wetlands and other natural features to slow water — is being integrated alongside hard infrastructure. The Environment Agency estimates every £1 spent on flood defences saves £7–10 in avoided damage. The challenge is that investment is not keeping pace with the growth in risk."
            source="Source: Environment Agency — FCERM investment programme 2021–2027; NaFRA2 2024."
          />
        </ScrollReveal>

        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p><a href="https://www.gov.uk/flood-and-coastal-erosion-risk-management-research-reports/national-flood-and-coastal-erosion-risk-register" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Environment Agency — National Flood Risk Assessment</a> — flood risk exposure data. Updated periodically.</p>
            <p><a href="https://www.gov.uk/government/publications/flood-and-coastal-erosion-risk-management-long-term-investment-scenarios" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Environment Agency — Long-term investment scenarios</a> — damage cost estimates. Updated periodically.</p>
            <p>All figures are for England. "Significant flood risk" defined as greater than 1-in-75-year probability from rivers or sea, or 1-in-30-year from surface water.</p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
