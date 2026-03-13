'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import PositiveCallout from '@/components/PositiveCallout';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

// Cyclists killed, 2010–2023
const fatalityValues = [111, 107, 118, 109, 113, 100, 102, 101, 99, 102, 99, 141, 104, 104];

// Seriously injured (adjusted), 2010–2023
const injuryValues = [3500, 3390, 3300, 3370, 3290, 3230, 3200, 4920, 4700, 4650, 4600, 4200, 4560, 4560];

const series1: Series[] = [
  {
    id: 'fatalities',
    label: 'Cyclists killed',
    colour: '#E63946',
    data: fatalityValues.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
  },
];

const series2: Series[] = [
  {
    id: 'serious-injuries',
    label: 'Seriously injured',
    colour: '#6B7280',
    data: injuryValues.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
  },
];

const annotations1: Annotation[] = [
  { date: new Date(2012, 0, 1), label: '2012: Olympic cycling boom begins' },
  { date: new Date(2017, 0, 1), label: '2017: Cycling & Walking Investment Strategy' },
  { date: new Date(2020, 0, 1), label: '2020: Pandemic cycling surge' },
];

const annotations2: Annotation[] = [
  { date: new Date(2017, 0, 1), label: '2017: CRASH severity adjustment — injuries reclassified upward' },
  { date: new Date(2020, 0, 1), label: '2020: Fewer cars, fewer collisions' },
];

export default function CyclingFatalitiesPage() {
  return (
    <>
      <TopicNav topic="Cycling Fatalities" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Cycling Fatalities"
          question="Why Are Cyclists Still Being Killed on British Roads?"
          finding="104 cyclists were killed on UK roads in 2023 — a figure that has barely moved in over a decade. The fatality rate per mile cycled is six times higher than in the Netherlands. Britain continues to design roads primarily for motor vehicles, with infrastructure spending around £4 per person versus £30 in the Netherlands."
          colour="#E63946"
          preposition="with"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Britain's cycling fatality figures tell a story of stalled progress. Around 100 to 110 cyclists are killed on UK roads every year, a number that has remained essentially flat since 2010 despite significant increases in cycling participation. The fatality rate per billion miles cycled — roughly 16 deaths per billion miles — is six times higher than in the Netherlands and four times higher than in Denmark. The core reason is infrastructure: the Netherlands invested systematically in physically separated cycling lanes from the 1970s onward, while Britain has relied overwhelmingly on painted lanes, shared-use pavements, and advisory signage that offer no meaningful protection from motor traffic. Where separation does exist — parts of inner London, the Beeline network in Greater Manchester — casualty rates are markedly lower.</p>
            <p>Serious injuries tell a more complex story. The raw numbers rose sharply after 2016, but much of that rise reflects the introduction of the CRASH severity scoring system in 2017, which reclassified many injuries previously recorded as "slight" to "serious." Adjusting for this methodological break, the underlying trend in serious injuries per mile cycled has been gradually declining. Government cycling investment has been volatile. Active Travel England was created in 2022 to hold local authorities to higher design standards, but sustained capital investment has failed to materialise at the scale needed. England averages around £4 per person per year on cycling infrastructure; the Netherlands spends roughly £30. Until that gap closes, the fatality plateau is unlikely to break.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Fatalities' },
          { id: 'sec-chart2', label: 'Serious Injuries' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Cyclists killed (annual)"
              value="104"
              unit="2023"
              direction="flat"
              polarity="up-is-bad"
              changeText="broadly flat since 2010 · 16 per billion miles vs 2.5 in Netherlands"
              sparklineData={[113, 100, 102, 101, 99, 102, 99, 141, 104, 104]}
              source="DfT — Reported Road Casualties 2023"
              href="#sec-chart1"
            />
            <MetricCard
              label="Seriously injured (annual)"
              value="4,560"
              unit="2023"
              direction="down"
              polarity="up-is-bad"
              changeText="down 9% since 2018 · CRASH adjustment inflates post-2016 figures"
              sparklineData={[4920, 4700, 4650, 4600, 4200, 4560, 4560]}
              source="DfT — Reported Road Casualties 2023"
              href="#sec-chart2"
            />
            <MetricCard
              label="Infrastructure spend per person"
              value="£4"
              unit="England, per year"
              direction="flat"
              polarity="up-is-good"
              changeText="vs £30 in Netherlands · Active Travel England launched 2022"
              sparklineData={[2, 2, 3, 3, 4, 8, 4, 4, 4, 4]}
              source="Active Travel England — Annual Report 2024"
              href="#sec-sources"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Cyclists killed on UK roads, 2010–2023"
              subtitle="Annual fatalities. The number has barely moved in over a decade despite increased cycling participation. The 2021 spike reflects pandemic recovery — more traffic returned before infrastructure improvements."
              series={series1}
              annotations={annotations1}
              yLabel="Cyclists killed"
              source={{ name: 'Department for Transport', dataset: 'Reported Road Casualties Great Britain', url: 'https://www.gov.uk/government/statistics/reported-road-casualties-great-britain-annual-report-2023', frequency: 'annual', date: 'Sep 2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Cyclists seriously injured, Great Britain, 2010–2023"
              subtitle="Note: CRASH severity adjustment from 2017 reclassified many injuries upward, making pre/post-2017 figures not directly comparable. The underlying rate per mile cycled has gradually declined."
              series={series2}
              annotations={annotations2}
              yLabel="Seriously injured"
              source={{ name: 'Department for Transport', dataset: 'Reported Road Casualties Great Britain', url: 'https://www.gov.uk/government/statistics/reported-road-casualties-great-britain-annual-report-2023', frequency: 'annual', date: 'Sep 2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Protected lanes cut casualties by up to 50%"
            value="50%"
            unit="reduction in casualties on protected lane corridors"
            description="Transport for London data shows that protected cycle lanes on main roads — physically separated from motor traffic by kerbs, wands, or planters — have reduced cyclist casualties by up to 50% on treated corridors compared to pre-installation levels. The Cycle Superhighway network in central London has demonstrated that high-quality infrastructure does not simply move risk elsewhere: casualty reductions are sustained across the wider network. Active Travel England, established in 2022, now requires all new cycling schemes to meet minimum separation standards, marking a shift from advisory paint to genuine protection. Greater Manchester's Bee Network aims to build 1,800 miles of walking and cycling routes by 2025."
            source="Source: TfL — Cycling Infrastructure Safety Monitoring 2024. Active Travel England design standards 2023."
          />
        </ScrollReveal>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.gov.uk/government/statistics/reported-road-casualties-great-britain-annual-report-2023" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Department for Transport — Reported Road Casualties Great Britain</a> — annual fatality and injury statistics from STATS19 police reports. 2023.</p>
            <p><a href="https://www.gov.uk/government/statistics/road-traffic-estimates-in-great-britain-2023" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Department for Transport — Road Traffic Estimates</a> — miles cycled data used to calculate KSI rate. Annual. 2023.</p>
            <p><a href="https://www.activetravel.gov.uk" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Active Travel England — Annual Report</a> — infrastructure spending and design standards. Annual. 2024.</p>
            <p>Fatalities are from STATS19 police collision reports. Serious injuries before and after 2017 are not directly comparable due to the CRASH severity adjustment system. Infrastructure spending per person uses England population and DfT cycling and walking investment figures.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
