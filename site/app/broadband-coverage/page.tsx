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

// Superfast (30Mbps+) and full fibre coverage, 2015–2025
const superfastData = [91.0, 92.2, 93.4, 94.5, 95.5, 96.2, 96.8, 97.1, 97.4, 97.6, 97.8];
const fullFibreData = [1.5, 2.5, 4.0, 7.0, 10.0, 18.0, 35.0, 50.0, 60.0, 68.0, 70.0];

// Premises below 10Mbps (millions) and rural superfast coverage (%), 2015–2025
const belowTargetData = [9.2, 8.6, 8.0, 7.4, 6.8, 6.2, 5.7, 5.2, 4.7, 4.0, 3.5];
const ruralCoverageData = [71.0, 73.5, 76.0, 78.5, 80.0, 82.0, 83.5, 85.0, 86.5, 87.5, 88.0];

const series1: Series[] = [
  {
    id: 'superfastPct',
    label: 'Superfast 30Mbps+ (%)',
    colour: '#264653',
    data: superfastData.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
  {
    id: 'fullFibrePct',
    label: 'Full-fibre gigabit (%)',
    colour: '#2A9D8F',
    data: fullFibreData.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
];

const series2: Series[] = [
  {
    id: 'belowTargetM',
    label: 'Premises below 10Mbps (millions)',
    colour: '#E63946',
    data: belowTargetData.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
  {
    id: 'ruralCoveragePct',
    label: 'Rural superfast coverage (%)',
    colour: '#F4A261',
    data: ruralCoverageData.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
];

const annotations1: Annotation[] = [
  { date: new Date(2020, 0, 1), label: '2020: Project Gigabit launched' },
  { date: new Date(2023, 0, 1), label: '2023: BT Openreach full-fibre rollout accelerates' },
];

const annotations2: Annotation[] = [
  { date: new Date(2020, 0, 1), label: '2020: Universal Service Obligation introduced' },
];

const editorialRefs: Reference[] = [
  { num: 1, name: 'Ofcom', dataset: 'Connected Nations — annual broadband coverage report', url: 'https://www.ofcom.org.uk/research-and-data/telecoms-research/connected-nations', date: '2025' },
  { num: 2, name: 'DSIT', dataset: 'Project Gigabit programme statistics', url: 'https://www.gov.uk/government/collections/project-gigabit', date: '2025' },
  { num: 3, name: 'Ofcom', dataset: 'Universal Service Obligation', url: 'https://www.ofcom.org.uk/home/consumer-rights/broadband-usc', date: '2025' },
];

export default function BroadbandCoveragePage() {
  return (
    <>
      <TopicNav topic="Broadband Coverage" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Digital & Connectivity"
          question="Who Still Can't Get Decent Broadband?"
          finding="97.8% of UK premises can access superfast broadband, but full-fibre gigabit coverage reaches only 70% and 3.5 million rural premises remain below the 10 Mbps Universal Service Obligation standard. The rural–urban gap is narrowing but has not closed."
          colour="#264653"
          preposition="with"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The UK's broadband infrastructure has undergone rapid transformation since 2017. Superfast broadband — capable of 30 Mbps or more — now reaches 97.8% of UK premises, up from 91% in 2015.<Cite nums={1} /> Full-fibre gigabit-capable broadband, once a luxury available to fewer than 2% of homes, reached 70% by 2025 on the back of a massive commercial rollout by BT Openreach and a wave of independent altnet providers.<Cite nums={1} /> The government's £5 billion Project Gigabit programme aims to extend this further to the hardest-to-reach 20% of premises that the market will not serve commercially, with a target of 99% gigabit coverage by 2030.<Cite nums={2} /></p>
            <p>Despite these gains, 3.5 million premises — predominantly in rural areas — remain below the 10 Mbps Universal Service Obligation standard.<Cite nums={3} /> Rural superfast coverage stands at 88%, compared with 99.4% in urban areas.<Cite nums={1} /> For households in these areas, slow and unreliable connectivity translates directly into disadvantage: remote working is unreliable, streaming is impossible, and digital public services are inaccessible. The cost of catching up is also falling disproportionately on rural communities: Starlink satellite broadband, the main alternative for the hardest-to-reach premises, costs around £75 per month — three to four times the price of urban full-fibre packages.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Coverage' },
          { id: 'sec-chart2', label: 'Rural gap' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Full-fibre (gigabit) coverage"
              value="70%"
              unit="of UK premises"
              direction="up"
              polarity="up-is-good"
              changeText="Up from 10% in 2020 · target 99% by 2030"
              sparklineData={[10, 14, 18, 25, 35, 47, 55, 62, 68, 69, 70]}
              source="Ofcom · Connected Nations 2025"
              href="#sec-chart1"
            />
            <MetricCard
              label="Below 10Mbps (USO standard)"
              value="3.5m"
              unit="premises"
              direction="down"
              polarity="up-is-bad"
              changeText="Down from 9.2m in 2015 · mainly rural"
              sparklineData={[9.2, 8.0, 6.8, 5.7, 4.7, 4.0, 3.5]}
              source="Ofcom · Connected Nations 2025"
              href="#sec-chart2"
            />
            <MetricCard
              label="Superfast (30Mbps+) coverage"
              value="97.8%"
              unit="of UK premises"
              direction="up"
              polarity="up-is-good"
              changeText="Near universal · rural gap persists at 88%"
              sparklineData={[91, 92, 93, 94.5, 95.5, 96.8, 97.1, 97.4, 97.6, 97.8]}
              source="Ofcom · Connected Nations 2025"
              href="#sec-chart1"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="UK broadband coverage by technology, 2015–2025"
              subtitle="Percentage of UK premises covered by superfast (30Mbps+) and full-fibre (gigabit-capable) broadband. Full-fibre coverage has grown rapidly since 2020."
              series={series1}
              annotations={annotations1}
              yLabel="% of premises"
              source={{ name: 'Ofcom', dataset: 'Connected Nations — annual broadband coverage report', url: 'https://www.ofcom.org.uk/research-and-data/telecoms-research/connected-nations', frequency: 'annual', date: '2025' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Premises below target speed and rural coverage, 2015–2025"
              subtitle="Number of premises unable to access 10Mbps (millions, red) and rural superfast coverage % (amber). Rural progress is real but the gap with urban areas remains large."
              series={series2}
              annotations={annotations2}
              yLabel="Millions / %"
              source={{ name: 'Ofcom', dataset: 'Connected Nations — rural/urban breakdown', url: 'https://www.ofcom.org.uk/research-and-data/telecoms-research/connected-nations', frequency: 'annual', date: '2025' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Project Gigabit delivering fast results"
            value="£5bn"
            unit="Project Gigabit commitment"
            description="Project Gigabit committed £5 billion to connect the hardest-to-reach premises with gigabit broadband by 2030. Over 1 million contracts have been signed for rural premises under the scheme's supplier framework. Full-fibre coverage grew by 20 percentage points in just three years — faster than any other major European country in that period. The USO scheme provides a legal right to request a connection at 10 Mbps for premises outside commercial rollout plans."
            source="Source: DSIT — Project Gigabit programme statistics 2025. Ofcom — Connected Nations 2025."
          />
        </ScrollReveal>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.ofcom.org.uk/research-and-data/telecoms-research/connected-nations" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Ofcom — Connected Nations</a> — annual broadband coverage and technology breakdown. Retrieved March 2026.</p>
            <p><a href="https://www.gov.uk/government/collections/project-gigabit" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DSIT — Project Gigabit programme statistics</a> — public investment and contract coverage data. Retrieved March 2026.</p>
            <p><a href="https://www.ofcom.org.uk/home/consumer-rights/broadband-usc" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Ofcom — Universal Service Obligation</a> — eligibility, take-up, and delivery data. Retrieved March 2026.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
