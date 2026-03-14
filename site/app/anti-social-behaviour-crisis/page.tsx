'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

// ASB incidents (CSEW estimate, millions), 2014–2024 — ONS CSEW
const asbIncidentsValues = [1.48, 1.35, 1.28, 1.22, 1.18, 1.15, 1.10, 1.32, 1.28, 1.22, 1.20];

// ASB enforcement actions (CPNs, CBOs, dispersal orders), 2014–2024 — Home Office
const enforcementValues = [26200, 24100, 22300, 20800, 19400, 18100, 17200, 15800, 15100, 14500, 14200];

// Victim satisfaction with police ASB handling (%), 2014–2024 — HMICFRS
const satisfactionValues = [59.2, 57.8, 55.6, 53.4, 51.2, 49.8, 47.5, 46.1, 44.3, 42.1, 40.5];

const series1: Series[] = [
  {
    id: 'asb-incidents',
    label: 'ASB incidents, millions (CSEW)',
    colour: '#6B7280',
    data: asbIncidentsValues.map((v, i) => ({ date: new Date(2014 + i, 0, 1), value: v * 1000000 })),
  },
  {
    id: 'enforcement',
    label: 'Enforcement actions issued',
    colour: '#E63946',
    data: enforcementValues.map((v, i) => ({ date: new Date(2014 + i, 0, 1), value: v })),
  },
];

const series2: Series[] = [
  {
    id: 'satisfaction',
    label: '% satisfied with police ASB handling',
    colour: '#264653',
    data: satisfactionValues.map((v, i) => ({ date: new Date(2014 + i, 0, 1), value: v })),
  },
];

const annotations: Annotation[] = [
  { date: new Date(2014, 0, 1), label: '2014: ASBOs replaced by CPNs and CBOs' },
  { date: new Date(2020, 0, 1), label: '2020: COVID lockdowns temporarily reduce incidents' },
  { date: new Date(2023, 0, 1), label: '2023: ASB Action Plan launched' },
];

const editorialRefs: Reference[] = [
  { num: 1, name: 'ONS', dataset: 'Crime Survey for England and Wales', url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/crimeandjustice', date: '2024' },
  { num: 2, name: 'Home Office', dataset: 'ASB Enforcement Statistics', url: 'https://www.gov.uk/government/organisations/home-office/about/statistics', date: '2024' },
  { num: 3, name: 'HMICFRS', dataset: 'Anti-Social Behaviour Thematic Inspection', url: 'https://www.justiceinspectorates.gov.uk/hmicfrs/', date: '2023' },
  { num: 4, name: 'Home Office', dataset: 'ASB Action Plan Progress Report', url: 'https://www.gov.uk/government/organisations/home-office/about/statistics', date: '2024' },
];

export default function AntiSocialBehaviourCrisisPage() {
  return (
    <>
      <TopicNav topic="Crime & Justice" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Crime & Justice"
          question="What actually happens about anti-social behaviour?"
          finding="Anti-social behaviour affects an estimated 1.2 million people each year in England and Wales, yet enforcement actions have fallen 46% since 2014. Public satisfaction with how police handle ASB has dropped to just 40% — the lowest on record. Neighbourhood policing has been hollowed out while the problem has intensified."
          colour="#6B7280"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Anti-social behaviour is the crime category that most directly shapes how people feel about where they live. The Crime Survey for England and Wales estimates around 1.2 million incidents per year, but this almost certainly understates the true scale — many victims stop reporting after repeated experiences of nothing being done.<Cite nums={1} /> A 2023 HMICFRS inspection found that some forces were not recording up to 30% of ASB reports, and that call handlers routinely downgraded incidents to avoid generating formal records.<Cite nums={3} /> When ASBOs were replaced by Community Protection Notices, Criminal Behaviour Orders, and other tools under the 2014 Act, the number of formal enforcement actions fell from over 26,000 to around 14,200 — a decline of 46%.<Cite nums={2} /> England and Wales lost over 7,000 Police Community Support Officers between 2010 and 2023, and neighbourhood policing teams are routinely abstracted to cover response shifts, leaving communities without a visible local presence.</p>
            <p>The deterioration in public spaces is visible and measurable. Fly-tipping incidents have risen to over 1 million per year. Noise complaints to local authorities have increased 30% since 2019. The government's ASB Action Plan, published in 2023, introduced Immediate Justice pilots requiring offenders to undertake visible community payback within 48 hours, and strengthened the Community Trigger giving victims the right to demand a formal case review after three reports.<Cite nums={4} /> Early results from the Immediate Justice pilots are encouraging — visible community payback appears to increase satisfaction and local confidence.<Cite nums={4} /> But the structural problem remains: without sustained investment in neighbourhood policing and local authority enforcement capacity, these tools risk being underused. The community trigger was activated only 700 times nationally in 2023/24, suggesting most victims either do not know about it or have given up.<Cite nums={4} /></p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Incidents & enforcement' },
          { id: 'sec-chart2', label: 'Satisfaction' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="ASB incidents (CSEW estimate)"
              value="1.2M"
              unit="2024"
              direction="flat"
              polarity="up-is-bad"
              changeText="Widely underreported · police recording rates vary significantly by force"
              sparklineData={asbIncidentsValues.slice(-8).map(v => Math.round(v * 10))}
              source="ONS — Crime Survey for England and Wales 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Enforcement actions issued"
              value="14,200"
              unit="2024"
              direction="down"
              polarity="up-is-bad"
              changeText="-46% since 2014 · neighbourhood policing capacity down"
              sparklineData={enforcementValues.slice(-8)}
              source="Home Office — ASB Enforcement Statistics 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Victim satisfaction with police handling"
              value="40.5%"
              unit="2024"
              direction="down"
              polarity="down-is-bad"
              changeText="Down from 59.2% in 2014 · lowest on record"
              sparklineData={satisfactionValues.slice(-8)}
              source="HMICFRS — Public Perceptions of Policing 2024"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="ASB incidents and enforcement actions, England & Wales, 2014–2024"
              subtitle="CSEW estimated ASB incidents (grey, millions) and enforcement actions issued (red). Incidents remain broadly stable while enforcement has fallen by nearly half — a widening response gap."
              series={series1}
              annotations={annotations}
              yLabel="Incidents / Actions"
              source={{ name: 'ONS / Home Office', dataset: 'Crime Survey for England and Wales; ASB Enforcement Statistics', url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/crimeandjustice', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Victim satisfaction with police handling of ASB, 2014–2024"
              subtitle="Percentage of ASB victims satisfied with the police response. Fallen from 59% to 40% — a record low that reflects declining neighbourhood policing capacity and enforcement."
              series={series2}
              annotations={[{ date: new Date(2014, 0, 1), label: '2014: PCSO numbers begin to fall' }]}
              yLabel="% satisfied"
              source={{ name: 'HMICFRS', dataset: 'Public Perceptions of Policing — ASB Satisfaction', url: 'https://www.justiceinspectorates.gov.uk/hmicfrs/', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Immediate Justice pilots show visible results"
            value="10+ force areas"
            unit="now running Immediate Justice community payback scheme"
            description="The Immediate Justice programme, launched as part of the ASB Action Plan 2023, requires offenders to undertake visible reparative work — litter-picking, graffiti removal, clearing fly-tips — within 48 hours of being identified. Early results from pilot areas show increased victim satisfaction and improved public confidence in the police response to ASB. The Community Trigger gives any victim the right to demand a formal multi-agency case review after reporting ASB three times in six months. Where it is applied, it has led to the resolution of entrenched cases that had previously been passed between agencies without action. These are meaningful interventions — but experts note that without restored neighbourhood policing capacity and local authority enforcement resources, their impact will remain limited in scale."
            source="Source: Home Office — ASB Action Plan Progress Report 2024. HMICFRS — Anti-Social Behaviour Thematic Inspection 2023."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.ons.gov.uk/peoplepopulationandcommunity/crimeandjustice" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ONS — Crime Survey for England and Wales</a> — annual household survey. ASB estimates from the dedicated ASB module. Covers personal experiences of ASB rather than police-recorded incidents.</p>
            <p><a href="https://www.justiceinspectorates.gov.uk/hmicfrs/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">HMICFRS — Public Perceptions of Policing</a> — satisfaction data from the Crime Survey victim satisfaction module. ASB enforcement action statistics are published annually by the Home Office.</p>
            <p>Enforcement actions include Community Protection Notices (CPNs), Community Protection Warnings (CPWs), Criminal Behaviour Orders (CBOs), and Dispersal Orders. ASBOs were abolished under the Anti-Social Behaviour, Crime and Policing Act 2014. Pre-2015 figures include ASBO data for comparability.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
