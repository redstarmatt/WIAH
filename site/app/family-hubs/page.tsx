'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import PositiveCallout from '@/components/PositiveCallout';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

// Cumulative family hubs open, 2021–2025 (England)
const hubRollout = [0, 12, 68, 68, 68];

// Families reached (thousands), 2021–2025
const familiesReached = [0, 18, 112, 148, 165];

// Children's centres open, 2010–2024 (England)
const centresOpen = [3632, 3393, 3082, 2766, 2481, 2300, 2153, 2050, 1981, 1920, 1852];

// Visits per hub by deprivation quintile (visits/year, most deprived = 1)
const deprivationVisits = [1820, 2340, 3210, 3870, 4290];

const rolloutSeries: Series[] = [
  {
    id: 'hubs',
    label: 'Family hubs open (cumulative)',
    colour: '#2A9D8F',
    data: hubRollout.map((v, i) => ({ date: new Date(2021 + i, 0, 1), value: v })),
  },
  {
    id: 'families',
    label: 'Families reached (thousands)',
    colour: '#264653',
    data: familiesReached.map((v, i) => ({ date: new Date(2021 + i, 0, 1), value: v })),
  },
];

const rolloutAnnotations: Annotation[] = [
  { date: new Date(2021, 0, 1), label: '2021: Family Hubs programme announced, £301m allocated' },
  { date: new Date(2023, 0, 1), label: '2023: 68 networks reach target — rollout stalls' },
];

const centreSeries: Series[] = [
  {
    id: 'centres',
    label: "Children's centres open (England)",
    colour: '#E63946',
    data: centresOpen.map((v, i) => ({ date: new Date(2010 + i * 1.4, 0, 1), value: v })),
  },
];

// Deprivation quintile chart uses quintile as x-axis — represent as yearly points
const deprivationSeries: Series[] = [
  {
    id: 'q1',
    label: 'Annual visits per hub',
    colour: '#2A9D8F',
    data: deprivationVisits.map((v, i) => ({ date: new Date(2020 + i, 0, 1), value: v })),
  },
];

const deprivationAnnotations: Annotation[] = [
  { date: new Date(2020, 0, 1), label: 'Most deprived' },
  { date: new Date(2024, 0, 1), label: 'Least deprived' },
];

const editorialRefs: Reference[] = [
  { num: 1, name: 'Department for Education', dataset: 'Family Hubs and Start for Life programme data', url: 'https://www.gov.uk/government/publications/family-hubs-and-start-for-life-programme', date: 'Jan 2025' },
  { num: 2, name: 'National Centre for Family Hubs', dataset: 'Pathfinder authority evaluation — deprivation analysis', url: 'https://www.ncfh.org.uk', date: '2024' },
  { num: 3, name: 'Action for Children', dataset: "Children's centre census", url: 'https://www.actionforchildren.org.uk', date: '2024' },
];

export default function FamilyHubsPage() {
  return (
    <>
      <TopicNav topic="Family Hubs" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Family Hubs"
          question="Are Family Hubs Actually Reaching Families?"
          finding="The government pledged 75 Family Hub networks by 2025 — 68 are now operating, but early evaluation shows take-up is lowest in the most deprived areas they were designed to serve."
          colour="#2A9D8F"
          preposition="with"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Family hubs were announced in 2021 as a flagship early-years policy — a reimagining of the Sure Start children's centre model, integrating support for families from pregnancy through to age 19. The government allocated £301 million over three years and set a target of 75 hub networks across the most disadvantaged local authorities in England.<Cite nums={[1]} /> By early 2025, 68 networks were operational, each typically comprising a central hub and several outreach spokes.<Cite nums={[1]} /></p>
            <p>The reach figures are more complicated than the rollout headline suggests. Early evaluation data from the National Centre for Family Hubs shows that visits per hub are lowest in the most deprived quintile of areas — the exact communities the programme was designed to prioritise.<Cite nums={[2]} /> This inverse relationship between need and take-up has also been observed in evaluations of Sure Start and other early-years interventions: the families under the most pressure are often least able to engage with a new service, particularly where transport, childcare costs and working-hours barriers are significant.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Hub rollout' },
          { id: 'sec-chart2', label: 'Deprivation gap' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Family hub networks operating"
              value="68"
              direction="up"
              polarity="up-is-good"
              changeText="vs 75 target · rollout stalled in 2023"
              sparklineData={[0, 0, 12, 68, 68, 68]}
              source="DfE — Family Hubs programme data, Jan 2025"
              href="#sec-chart1"
            />
            <MetricCard
              label="Families reached (thousands)"
              value="165k"
              direction="up"
              polarity="up-is-good"
              changeText="up from zero in 2021 · but most deprived areas lag"
              sparklineData={[0, 18, 112, 148, 165]}
              source="National Centre for Family Hubs — evaluation 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Deprivation coverage gap"
              value="2.4x"
              direction="up"
              polarity="up-is-bad"
              changeText="least deprived areas visit 2.4x more per hub"
              sparklineData={[1820, 2340, 3210, 3870, 4290]}
              source="NCFH — Pathfinder authority evaluation 2024"
              href="#sec-chart2"
            />
          </div>
        </section>

        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Family hub rollout and families reached, England, 2021–2025"
              subtitle="Cumulative family hub networks open and thousands of families reached. Rollout reached 68 of the 75-network target and has not progressed since mid-2023."
              series={rolloutSeries}
              annotations={rolloutAnnotations}
              yLabel="Hubs (count) / Families reached (thousands)"
              source={{
                name: 'Department for Education',
                dataset: 'Family Hubs and Start for Life programme data',
                url: 'https://www.gov.uk/government/publications/family-hubs-and-start-for-life-programme',
                frequency: 'quarterly',
                date: 'Jan 2025',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Annual visits per family hub by deprivation quintile"
              subtitle="Average annual visits per hub, from most deprived (left) to least deprived (right) quintile. Hubs in the least deprived areas receive more than twice the visits of those in the most deprived. Source: NCFH pathfinder evaluation, 12 local authorities."
              series={deprivationSeries}
              annotations={deprivationAnnotations}
              yLabel="Annual visits per hub"
              source={{
                name: 'National Centre for Family Hubs',
                dataset: 'Pathfinder authority evaluation — deprivation analysis',
                url: 'https://www.ncfh.org.uk',
                frequency: 'annual',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="Family hubs are integrating services that were previously fragmented"
            value="68"
            unit="hub networks now co-locating health visiting, midwifery and parenting support"
            description="The key innovation of family hubs is service integration. Before the programme, a new parent might see their health visitor, midwife, SEND coordinator and parenting support worker in four different buildings on four different days. Family hubs bring these under one roof, with a single point of contact. Early evaluation from pathfinder authorities shows parents report significantly higher awareness of available support, and professional referral rates between services have increased. Where hubs are reaching the most disadvantaged families, they are having a measurable impact on parental wellbeing and infant feeding rates."
            source="Source: DfE / National Centre for Family Hubs — Start for Life programme evaluation 2024."
          />
        </ScrollReveal>

        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">What the data shows</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>The family hubs programme has delivered against its headline rollout target — 68 of 75 planned networks are operating — but the shortfall matters: it is concentrated in the highest-deprivation areas where the programme was most needed.<Cite nums={[1]} /> Seven local authority areas that were allocated funding did not proceed to full operation.</p>
              <p>The deprivation paradox in visit rates is not unique to family hubs. It reflects a well-documented pattern in universal services: the most socially isolated, economically stressed, or digitally excluded families are least likely to proactively seek support, even when it is available. The evidence base on Sure Start, which family hubs partially replace, found the clearest impacts on the most disadvantaged families — but only when they were actively recruited into the service, not when they self-referred.</p>
              <p>The context of children's centre closures is important. England had over 3,600 children's centres at the 2010 peak; there are now approximately 1,850.<Cite nums={[3]} /> Family hubs are not a direct replacement: they serve a wider age range (to 19) and a different geographic model (fewer, larger hubs with spokes), but they cover far fewer locations than the network they partially replace. The question of whether 68 hub networks can match the community reach of 3,600 centres has not been answered.</p>
            </div>
          </section>
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p>
              <a href="https://www.gov.uk/government/publications/family-hubs-and-start-for-life-programme" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Department for Education — Family Hubs and Start for Life programme</a> — primary source for hub count, funding allocation and families reached data. Retrieved January 2025.
            </p>
            <p>
              <a href="https://www.ncfh.org.uk" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">National Centre for Family Hubs — evaluation reports</a> — pathfinder authority evaluation data including deprivation analysis. Sample covers 12 local authorities.
            </p>
            <p>
              <a href="https://www.actionforchildren.org.uk" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Action for Children — children's centre census</a> — annual estimates of children's centres operating. The 2010 baseline of 3,632 is the peak prior to austerity-era cuts.
            </p>
            <p className="text-xs mt-4">Figures are for England. Deprivation quintile analysis is from a sample of 12 pathfinder local authorities and may not be representative of the full national programme. Children's centre counts use the Action for Children / Coram methodology; some community-transferred centres may be included or excluded depending on service level.</p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
