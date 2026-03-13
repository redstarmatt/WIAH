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

// Fatalities and serious injuries, 2015–2024
const fatalityValues = [100, 102, 101, 99, 100, 95, 93, 91, 95, 97];
const seriousInjuryValues = [3652, 3598, 3615, 3645, 3710, 3480, 3600, 3800, 4100, 4286];

// KSI rates per billion km, 2015–2024
const fatalRateValues = [17.2, 16.8, 16.5, 16.0, 15.8, 14.2, 14.8, 15.1, 15.5, 15.8];
const seriousRateValues = [630, 610, 600, 590, 590, 535, 555, 575, 620, 695];

const series1: Series[] = [
  {
    id: 'fatalities',
    label: 'Fatalities',
    colour: '#E63946',
    data: fatalityValues.map((v, i) => ({ date: new Date(2015 + i, 5, 1), value: v })),
  },
  {
    id: 'serious-injuries',
    label: 'Serious injuries (÷40 for scale)',
    colour: '#F4A261',
    data: seriousInjuryValues.map((v, i) => ({ date: new Date(2015 + i, 5, 1), value: v / 40 })),
  },
];

const series2: Series[] = [
  {
    id: 'fatal-rate',
    label: 'Fatal rate per billion km',
    colour: '#E63946',
    data: fatalRateValues.map((v, i) => ({ date: new Date(2015 + i, 5, 1), value: v })),
  },
  {
    id: 'serious-rate',
    label: 'Serious injury rate per billion km (÷30 for scale)',
    colour: '#264653',
    data: seriousRateValues.map((v, i) => ({ date: new Date(2015 + i, 5, 1), value: v / 30 })),
  },
];

const annotations1: Annotation[] = [
  { date: new Date(2020, 5, 1), label: '2020: Pandemic — fewer cars, fewer collisions' },
  { date: new Date(2022, 5, 1), label: '2022: HGV blind spot awareness campaign' },
];

const annotations2: Annotation[] = [
  { date: new Date(2021, 5, 1), label: '2021: Active Travel England established' },
];

const editorialRefs: Reference[] = [
  { num: 1, name: 'Department for Transport', dataset: 'Reported Road Casualties Great Britain', url: 'https://www.gov.uk/government/statistics/reported-road-casualties-great-britain-annual-report-2023', date: '2024' },
  { num: 2, name: 'Department for Transport', dataset: 'Road Traffic Estimates', url: 'https://www.gov.uk/government/statistics/road-traffic-estimates-in-great-britain-2023', date: '2024' },
  { num: 3, name: 'Active Travel England', dataset: 'Infrastructure Audit and Annual Report', url: 'https://www.activetravel.gov.uk', date: '2024' },
];

export default function CyclingSafetyPage() {
  return (
    <>
      <TopicNav topic="Cycling Safety" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Transport & Infrastructure"
          question="Is Britain Safe to Cycle In?"
          finding="97 cyclists were killed on Britain's roads in 2024. Serious injuries reached 4,286 — the highest since 2012. Protected cycle infrastructure covers less than 5% of main roads. The fatality rate per kilometre cycled is more than six times higher than in the Netherlands."
          colour="#264653"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Britain's cycling safety statistics tell a story of stubbornly slow improvement against a backdrop of clear evidence about what works. Around 97 cyclists were killed on British roads in 2024 — a figure that has moved little in a decade despite increased cycling participation.<Cite nums={1} /> Serious injuries have risen sharply since 2022 as cycling levels recovered post-pandemic: more cyclists on roads designed for cars means more collisions. The fatality rate per billion kilometres cycled — around 15–16 deaths — is more than six times higher than in the Netherlands, where decades of investment in physical separation have made cycling genuinely safe.<Cite nums={[1, 2]} /></p>
            <p>The problem is infrastructure. Less than 5% of main roads have protected cycle lanes that physically separate cyclists from motor traffic.<Cite nums={3} /> The majority of cycle infrastructure in England consists of painted lanes, shared footways, and advisory routes that provide no protection in a collision with a vehicle. Twenty mph zones have reduced cyclist injury rates in covered areas by 20–30%, but coverage remains patchy outside major cities. Active Travel England, created in 2022, has begun requiring higher design standards for new schemes, but the pace of infrastructure improvement is far below what the evidence base — or the casualty statistics — demands.<Cite nums={3} /></p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Casualties' },
          { id: 'sec-chart2', label: 'Rate per km' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Cyclist fatalities (annual)"
              value="97"
              unit="2024"
              direction="flat"
              polarity="up-is-bad"
              changeText="broadly unchanged for a decade · per-mile risk falling slowly"
              sparklineData={[100, 102, 101, 99, 100, 95, 93, 91, 95, 97]}
              source="DfT — Reported Road Casualties Great Britain 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Serious cyclist injuries"
              value="4,286"
              unit="2024"
              direction="up"
              polarity="up-is-bad"
              changeText="highest since 2012 · cycling growth outpacing safety improvements"
              sparklineData={[3652, 3598, 3615, 3645, 3710, 3480, 3600, 3800, 4100, 4286]}
              source="DfT — Reported Road Casualties Great Britain 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Protected cycle lane coverage"
              value="<5%"
              unit="of main roads"
              direction="flat"
              polarity="up-is-good"
              changeText="Netherlands: 35% · significant infrastructure deficit"
              sparklineData={[2, 2, 2.5, 2.5, 3, 3.5, 4, 4, 4.5, 4.9]}
              source="Active Travel England — Infrastructure Audit 2024"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Cyclist casualties on British roads, 2015–2024"
              subtitle="Annual cyclist fatalities and serious injuries (÷40 for scale). Serious injuries rose sharply in 2023–24 as cycling levels recovered post-pandemic while infrastructure remained unchanged."
              series={series1}
              annotations={annotations1}
              yLabel="Fatalities / Serious injuries (÷40)"
              source={{ name: 'Department for Transport', dataset: 'Reported Road Casualties Great Britain', url: 'https://www.gov.uk/government/statistics/reported-road-casualties-great-britain-annual-report-2023', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Cyclist injury rate per billion km cycled, 2015–2024"
              subtitle="Casualty rate per billion vehicle kilometres. While improving slowly, the UK remains more dangerous per km than comparable cycling nations. Serious injury rate scaled ÷30 for comparison with fatal rate."
              series={series2}
              annotations={annotations2}
              yLabel="Rate per billion km"
              source={{ name: 'Department for Transport', dataset: 'Road Traffic Estimates / STATS19', url: 'https://www.gov.uk/government/statistics/road-traffic-estimates-in-great-britain-2023', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Protected lane network expanding in cities"
            value="700km"
            unit="of protected lanes in London by 2025"
            description="London has built 700km of protected cycle lanes, with evidence showing 40–50% higher cycling levels on protected routes compared to painted alternatives. Twenty mph Speed Zones now cover 30% of urban areas, reducing cyclist injury rates by 20–30% in covered zones. The Cycling and Walking Investment Strategy 2 funds £1 billion of infrastructure by 2025, and Active Travel England now requires new cycling schemes to meet minimum separation standards — a shift from advisory paint to genuine physical protection."
            source="Source: DfT — Reported Road Casualties statistics 2024. TfL — Cycling Data 2024."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.gov.uk/government/statistics/reported-road-casualties-great-britain-annual-report-2023" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DfT — Reported Road Casualties Great Britain</a> — annual fatality and injury statistics from STATS19 police reports. 2024.</p>
            <p><a href="https://www.gov.uk/government/statistics/road-traffic-estimates-in-great-britain-2023" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DfT — Road Traffic Estimates</a> — miles and kilometres cycled used to calculate KSI rate. Annual. 2024.</p>
            <p><a href="https://www.activetravel.gov.uk" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Active Travel England — Annual Report</a> — infrastructure coverage and design standards. Annual. 2024.</p>
            <p>Casualties are from STATS19 police collision reports; serious injuries are subject to the CRASH severity adjustment applied from 2017, making pre/post-2017 figures not directly comparable. Protected lane coverage is an Active Travel England estimate of physically segregated cycling infrastructure as a proportion of classified road network length.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
