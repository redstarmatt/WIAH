'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

// Food safety incidents involving imports, 2019–2025
const safetyIncidents = [62, 58, 71, 78, 84, 87, 90];
// Import border checks (% of shipments), 2021–2025
const borderCheckPct = [8, 12, 25, 55, 85];
// Cumulative standards divergences from EU, 2021–2025
const cumulativeDivergences = [2, 5, 8, 11, 14];

const incidentsSeries: Series[] = [
  {
    id: 'incidents',
    label: 'Food safety incidents (imports)',
    colour: '#6B7280',
    data: safetyIncidents.map((v, i) => ({ date: new Date(2019 + i, 5, 1), value: v })),
  },
];

const borderAndDivergenceSeries: Series[] = [
  {
    id: 'borderChecks',
    label: 'Import border checks (% of shipments)',
    colour: '#2A9D8F',
    data: borderCheckPct.map((v, i) => ({ date: new Date(2021 + i, 5, 1), value: v })),
  },
  {
    id: 'divergence',
    label: 'Cumulative standards divergences from EU',
    colour: '#E63946',
    data: cumulativeDivergences.map((v, i) => ({ date: new Date(2021 + i, 5, 1), value: v })),
  },
];

const incidentsAnnotations: Annotation[] = [
  { date: new Date(2021, 5, 1), label: '2021: Brexit — UK exits EU food safety network (RASFF)' },
  { date: new Date(2023, 5, 1), label: '2023: Border checks delayed again' },
  { date: new Date(2024, 5, 1), label: '2024: Border Target Operating Model implemented' },
];

const borderAnnotations: Annotation[] = [
  { date: new Date(2021, 5, 1), label: '2021: Full import checks promised — then delayed' },
  { date: new Date(2024, 5, 1), label: '2024: Physical checks finally implemented' },
];

export default function FoodStandardsPage() {
  return (
    <>
      <TopicNav topic="Post-Brexit Food Standards" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Post-Brexit Food Standards"
          question="Has Brexit Changed What's on Our Plates?"
          finding="UK food import checks promised for 2021 were delayed until 2024. 87 food safety incidents involving imported food were detected in 2025. The UK–US trade deal could allow chlorinated chicken and hormone-treated beef."
          colour="#6B7280"
          preposition="with"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Brexit removed the UK from the EU's Rapid Alert System for Food and Feed (RASFF) — the network through which member states share food safety alerts in real time. The UK created its own Food and Feed Safety and Incidents Network but operates it with fewer resources and without the automatic information sharing that RASFF provides. More consequentially, the government repeatedly delayed implementing import border checks on EU food and feed imports after Brexit. Full checks were promised for January 2021, delayed to January 2022, delayed to July 2022, then to November 2023, before physical checks finally began at major ports in April 2024. During this three-year period, UK import checks on EU food products ran at single-digit percentages.</p>
            <p>More concerning for the longer term is the question of standards divergence. The UK–US trade deal negotiations remain live, with the American agricultural sector seeking access for products banned in the UK under EU-inherited regulations — hormone-treated beef, ractopamine-treated pork, chlorine-washed chicken. The Food Standards Agency has stated it will not recommend standards reductions in trade deals. The Trade and Agriculture Commission scrutinises each agreement, but its reports are advisory rather than binding. The combination of reduced border surveillance and potential future trade pressures creates a genuine long-term risk to the food standards the UK has historically maintained.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-incidents', label: 'Safety Incidents' },
          { id: 'sec-border', label: 'Border Checks' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Food safety incidents (imports)"
              value="87"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Up from 62 in 2019 · delayed border checks left gap in protection"
              sparklineData={safetyIncidents.slice(-8)}
              source="FSA/FSS · Food safety incidents 2025"
              href="#sec-incidents"
            />
            <MetricCard
              label="Import border checks"
              value="85%"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="Up from 8% in 2021 · full checks finally implemented 2024"
              sparklineData={[8, 12, 25, 55, 85, 85, 85, 85]}
              source="DEFRA · Border Target Operating Model 2024"
              href="#sec-border"
            />
            <MetricCard
              label="Standards divergences from EU"
              value="14"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Cumulative since 2021 · affects agri-food exporters to EU"
              sparklineData={cumulativeDivergences}
              source="Trade and Agriculture Commission 2025"
              href="#sec-border"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-incidents" className="mb-12">
            <LineChart
              title="Food safety incidents involving imported food, UK, 2019–2025"
              subtitle="Incidents detected by FSA and FSS involving imported food and feed. Dip in 2020 reflects pandemic; rise from 2021 combines reduced oversight and improving detection."
              series={incidentsSeries}
              annotations={incidentsAnnotations}
              yLabel="Incidents"
              source={{ name: 'FSA / FSS', dataset: 'Food and Feed Safety Incidents Network', url: 'https://www.food.gov.uk/safety-hygiene/food-alerts', frequency: 'annual', date: '2025' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-border" className="mb-12">
            <LineChart
              title="Import border checks and cumulative standards divergences, 2021–2025"
              subtitle="Percentage of food and feed import shipments physically checked at UK borders alongside cumulative documented divergences from EU food standards."
              series={borderAndDivergenceSeries}
              annotations={borderAnnotations}
              yLabel="Percent / Count"
              source={{ name: 'DEFRA / Trade and Agriculture Commission', dataset: 'Border Target Operating Model; TAC scrutiny reports', url: 'https://www.gov.uk/government/organisations/trade-and-agriculture-commission', frequency: 'annual', date: '2025' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="FSA committed to no standards reduction in trade deals"
            value="Agriculture Act 2020"
            unit="statutory protection on standards"
            description="The Food Standards Agency maintains its statutory commitment to no lowering of standards in international trade deals — a formal legal obligation introduced via the Agriculture Act 2020. The Border Target Operating Model, now fully operational, delivers physical checks at 85% of risk-rated imports. The Trade and Agriculture Commission scrutinises all trade agreements for food standard implications before parliamentary ratification, providing a meaningful check on any future pressure to lower standards."
            source="Source: FSA — Food Standards Agency position on trade and food standards 2024. Trade and Agriculture Commission — scrutiny reports 2025."
          />
        </ScrollReveal>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.food.gov.uk" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Food Standards Agency — Food and Feed Safety Incidents</a> — Annual summary of food safety incidents. Retrieved 2025.</p>
            <p><a href="https://www.gov.uk/government/organisations/trade-and-agriculture-commission" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Trade and Agriculture Commission — Scrutiny reports</a> — Review of trade agreements for food standard implications. Retrieved 2025.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
