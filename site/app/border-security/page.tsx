'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import PositiveCallout from '@/components/PositiveCallout';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

// Small boat Channel crossings, 2018–2025 (annual arrivals)
const crossingsData = [299, 1843, 8466, 28526, 45755, 29437, 36816, 19200];

// Asylum backlog (cases awaiting initial decision, year-end)
const backlogData = [38200, 42100, 52400, 76900, 132400, 175400, 118300, 98600];

// Enforced returns
const returnsData = [12400, 10800, 8200, 6100, 4800, 3600, 3200, 2950];

const crossingsSeries: Series[] = [
  {
    id: 'small-boat-crossings',
    label: 'Small boat arrivals (annual)',
    colour: '#264653',
    data: crossingsData.map((v, i) => ({ date: new Date(2018 + i, 0, 1), value: v })),
  },
  {
    id: 'returns',
    label: 'Enforced returns (annual)',
    colour: '#E63946',
    data: returnsData.map((v, i) => ({ date: new Date(2018 + i, 0, 1), value: v })),
  },
];

const backlogSeries: Series[] = [
  {
    id: 'asylum-backlog',
    label: 'Asylum decision backlog (cases)',
    colour: '#E63946',
    data: backlogData.map((v, i) => ({ date: new Date(2018 + i, 0, 1), value: v })),
  },
];

const crossingsAnnotations: Annotation[] = [
  { date: new Date(2022, 0, 1), label: '2022: Record 45,755 crossings' },
  { date: new Date(2023, 0, 1), label: '2023: Rwanda policy announced' },
];

const backlogAnnotations: Annotation[] = [
  { date: new Date(2022, 0, 1), label: '2022: Decision-making collapses' },
  { date: new Date(2023, 0, 1), label: '2023: Clearing backlog operation begins' },
];

export default function BorderSecurityPage() {
  return (
    <>
      <TopicNav topic="Border Security" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Border Security"
          question="What Is Actually Happening at the Border?"
          finding="36,816 people crossed the English Channel in small boats in 2024 — up 25% on 2023. The asylum decision backlog stands at 98,600 cases, still more than double pre-pandemic levels, while enforced returns of failed asylum seekers have fallen to a historic low of under 3,000 per year."
          colour="#264653"
          preposition="with"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Small boat crossings of the English Channel have become the defining border security issue of the 2020s. From 299 arrivals in 2018, the annual total rose to 45,755 in 2022 before falling to 29,437 in 2023 and rising again to 36,816 in 2024. These numbers are small relative to overall immigration — net migration to the UK was around 700,000 in 2024 — but the crossings are dangerous, visible, and politically charged. At least 70 people have died attempting the crossing since 2018. The route is controlled by organised criminal smuggling networks operating from northern France and Belgium, charging £3,000–£6,000 per person for a place on an overcrowded inflatable dinghy.</p>
            <p>Successive governments have pursued deterrence-based strategies with limited measurable effect. The Rwanda deportation policy, announced in 2022 and declared unlawful by the Supreme Court in 2023, consumed approximately £700 million without removing a single asylum seeker. France has received over £500 million in UK funding since 2018 to increase beach patrols and disrupt launch sites. Interception rates have risen — around 40% of launch attempts are now prevented — but crossings continue because demand is driven by conflict, persecution, and the absence of safe legal routes to claim asylum in the UK. Meanwhile, enforced returns of failed asylum seekers have fallen from 12,400 in 2018 to under 3,000 in 2025, undermining the credibility of the system.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-crossings', label: 'Crossings' },
          { id: 'sec-backlog', label: 'Backlog' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Small boat arrivals"
              value="36,816"
              unit="2024"
              direction="up"
              polarity="up-is-bad"
              changeText="Up 25% on 2023 · 70+ deaths since 2018"
              sparklineData={[299, 1843, 8466, 28526, 45755, 29437, 36816]}
              source="Home Office · Irregular Migration Statistics 2025"
              href="#sec-crossings"
            />
            <MetricCard
              label="Asylum decision backlog"
              value="98,600"
              unit="cases"
              direction="down"
              polarity="up-is-bad"
              changeText="Down from 175,400 peak · still 2.6× pre-pandemic"
              sparklineData={[38200, 52400, 76900, 132400, 175400, 118300, 98600]}
              source="Home Office · Immigration Statistics 2025"
              href="#sec-backlog"
            />
            <MetricCard
              label="Enforced returns"
              value="2,950"
              unit="per year"
              direction="down"
              polarity="up-is-good"
              changeText="Down from 12,400 in 2018 · historic low"
              sparklineData={[12400, 10800, 8200, 6100, 4800, 3600, 3200, 2950]}
              source="Home Office · Returns Statistics 2025"
              href="#sec-crossings"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-crossings" className="mb-12">
            <LineChart
              title="Small boat Channel crossings and enforced returns, 2018–2025"
              subtitle="People arriving in the UK via small boats vs. enforced returns of failed asylum seekers. The gap between the two widened sharply after 2020."
              series={crossingsSeries}
              annotations={crossingsAnnotations}
              yLabel="People"
              source={{ name: 'Home Office', dataset: 'Irregular Migration to the UK Statistics', url: 'https://www.gov.uk/government/collections/irregular-migration-to-the-uk', frequency: 'quarterly', date: '2025' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-backlog" className="mb-12">
            <LineChart
              title="Asylum decision backlog, 2018–2025"
              subtitle="Total cases awaiting an initial decision on asylum claim. UK-wide. Peaked at 175,400 in 2023 following collapse of decision-making during the pandemic."
              series={backlogSeries}
              annotations={backlogAnnotations}
              yLabel="Cases"
              source={{ name: 'Home Office', dataset: 'Immigration System Statistics', url: 'https://www.gov.uk/government/statistical-data-sets/immigration-system-statistics-data-tables', frequency: 'quarterly', date: '2025' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Decision-making capacity rebuilt: 112,000 decisions in 2024"
            value="112,000"
            unit="asylum decisions made in 2024"
            description="After the asylum system ground to near-standstill during 2020–22, the Home Office rebuilt decision-making capacity and made 112,000 initial decisions in 2024 — the highest annual total on record. The backlog fell from 175,400 to 98,600 as a result. Additional caseworkers and reformed processes have reduced the average waiting time for a decision from over 18 months to around 9 months. The challenge now is sustaining that throughput while maintaining quality and appeal outcomes."
            source="Source: Home Office — Immigration System Statistics, 2025."
          />
        </ScrollReveal>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.gov.uk/government/collections/irregular-migration-to-the-uk" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Home Office — Irregular Migration to the UK Statistics</a> — small boat crossing figures, published quarterly.</p>
            <p><a href="https://www.gov.uk/government/statistical-data-sets/immigration-system-statistics-data-tables" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Home Office — Immigration System Statistics</a> — asylum backlog, decisions, and returns data.</p>
            <p><a href="https://www.gov.uk/government/collections/migration-statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Home Office — Migration Statistics</a> — net migration and visa data. Retrieved March 2026.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
