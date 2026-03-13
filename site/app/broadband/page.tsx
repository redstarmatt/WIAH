'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import PositiveCallout from '@/components/PositiveCallout';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

// Median download speed (Mbps), 2013–2024
const speedData = [15, 18, 22, 28, 36, 46, 64, 80, 80, 95, 112, 126];

// Full fibre coverage (% of UK premises), 2017–2024
const fullFibreData = [2, 4, 8, 14, 24, 38, 55, 68];

// Gigabit-capable coverage (% of UK premises), 2017–2024
const gigabitData = [3, 6, 12, 22, 40, 60, 75, 86];

// Rural % without 30Mbps, 2019–2024
const ruralGapData = [14.2, 12.8, 11.0, 9.5, 8.0, 6.5];

// Urban % without 30Mbps, 2019–2024
const urbanGapData = [2.1, 1.9, 1.7, 1.5, 1.3, 1.0];

const speedSeries: Series[] = [
  {
    id: 'speed',
    label: 'Median download speed (Mbps)',
    colour: '#264653',
    data: speedData.map((v, i) => ({ date: new Date(2013 + i, 0, 1), value: v })),
  },
];

const coverageSeries: Series[] = [
  {
    id: 'gigabit',
    label: 'Gigabit-capable (%)',
    colour: '#264653',
    data: gigabitData.map((v, i) => ({ date: new Date(2017 + i, 0, 1), value: v })),
  },
  {
    id: 'fullfibre',
    label: 'Full fibre / FTTP (%)',
    colour: '#2A9D8F',
    data: fullFibreData.map((v, i) => ({ date: new Date(2017 + i, 0, 1), value: v })),
  },
];

const ruralUrbanSeries: Series[] = [
  {
    id: 'rural',
    label: 'Rural — % without decent broadband',
    colour: '#E63946',
    data: ruralGapData.map((v, i) => ({ date: new Date(2019 + i, 0, 1), value: v })),
  },
  {
    id: 'urban',
    label: 'Urban — % without decent broadband',
    colour: '#6B7280',
    data: urbanGapData.map((v, i) => ({ date: new Date(2019 + i, 0, 1), value: v })),
  },
];

const speedAnnotations: Annotation[] = [
  { date: new Date(2020, 0, 1), label: '2020: Pandemic drives demand surge' },
  { date: new Date(2022, 0, 1), label: '2022: Full fibre rollout accelerates' },
];

const coverageAnnotations: Annotation[] = [
  { date: new Date(2020, 0, 1), label: '2020: Project Gigabit launched' },
  { date: new Date(2023, 0, 1), label: '2023: Openreach full-fibre target raised' },
];

export default function BroadbandPage() {
  return (
    <>
      <TopicNav topic="Broadband & Digital" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Broadband & Digital"
          question="Are You Actually Connected?"
          finding="Full fibre broadband has reached 68% of UK premises — up from just 2% in 2017 — and median download speeds have risen eightfold to 126 Mbps. But 6.5% of rural homes still cannot get the minimum 30 Mbps standard, six times the urban rate, and 1.5 million households with school-age children lack any home broadband connection."
          colour="#264653"
          preposition="with"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Full fibre broadband reached approximately 68% of UK premises by 2024, up from just 2% in 2017, driven by BT Openreach, Virgin Media O2, and a wave of altnet operators. On the government's original target of national full fibre by 2025, the programme is running two to three years behind; Spain, France, and Sweden each surpassed 75% FTTP coverage by 2022. The government's £5 billion Project Gigabit programme targets the 20% of premises the market will not reach commercially, but procurement has been slow. An estimated 685,000 premises remain below the Universal Service Obligation of 10 Mbps. Social tariffs for Universal Credit claimants are available at £10–£20 per month, but only around 30% of the 4.2 million eligible households have taken one up.</p>
            <p>The rural–urban gap is the defining inequality. Full fibre reaches 73% of urban premises but only 37% of rural ones; 6.5% of rural homes cannot receive the 30 Mbps "decent broadband" standard, six times the urban rate of 1%. Rural households on legacy ADSL connections face download speeds of 5–10 Mbps and upload speeds below 1 Mbps, making remote work and video consultation unreliable. Starlink satellite provides a £75-per-month alternative for around 150,000 rural subscribers — at triple the cost of urban full fibre, a connectivity premium paid by those already at a geographic disadvantage.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Speeds' },
          { id: 'sec-chart2', label: 'Coverage' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Median download speed"
              value="126"
              unit="Mbps (2024)"
              direction="up"
              polarity="up-is-good"
              changeText="Up from 15 Mbps in 2013 · 8× faster in 11 years"
              sparklineData={[15, 22, 36, 64, 80, 95, 112, 126]}
              source="Ofcom · Home Broadband Performance 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Full fibre coverage"
              value="68%"
              unit="of UK premises"
              direction="up"
              polarity="up-is-good"
              changeText="86% gigabit-capable · Govt target: 99% by 2030"
              sparklineData={[2, 4, 8, 14, 24, 38, 55, 68]}
              source="Ofcom · Connected Nations 2024"
              href="#sec-chart2"
            />
            <MetricCard
              label="Rural broadband gap"
              value="6.5%"
              unit="rural without 30Mbps"
              direction="down"
              polarity="up-is-bad"
              changeText="Urban: 1% · Rural: 6.5% — 6× gap persists"
              sparklineData={[14.2, 12.8, 11.0, 9.5, 8.0, 6.5]}
              source="Ofcom · Connected Nations 2024"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="UK median broadband download speed, 2013–2024"
              subtitle="Median residential broadband download speed (Mbps), measured via Ofcom SamKnows panel. Eightfold improvement in eleven years driven by full fibre rollout."
              series={speedSeries}
              annotations={speedAnnotations}
              yLabel="Mbps"
              source={{ name: 'Ofcom', dataset: 'Home Broadband Performance', url: 'https://www.ofcom.org.uk/research-and-data/telecoms-research/broadband-research/broadband-speeds', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Gigabit and full fibre broadband coverage, 2017–2024"
              subtitle="% of UK premises that can receive gigabit-capable or full fibre (FTTP) broadband. Government target: universal gigabit capability by 2030."
              series={coverageSeries}
              annotations={coverageAnnotations}
              targetLine={{ value: 99, label: '2030 target' }}
              yLabel="% premises"
              source={{ name: 'Ofcom', dataset: 'Connected Nations — annual broadband coverage report', url: 'https://www.ofcom.org.uk/research-and-data/telecoms-research/connected-nations', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Speeds have risen eightfold in a decade"
            value="8×"
            unit="faster than 2013"
            description="UK median broadband speeds have risen eightfold since 2013 — from 15 Mbps to 126 Mbps. The proportion of adults who have never used the internet has fallen from 16% to under 4% in 12 years. The government's Project Gigabit is accelerating full fibre rollout to hard-to-reach rural areas, and 5G now covers 91% of UK premises outdoors. Social tariffs from all major providers now offer broadband from £10 per month for Universal Credit recipients."
            source="Source: Ofcom Connected Nations 2024. ONS Internet users 2024."
          />
        </ScrollReveal>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.ofcom.org.uk/research-and-data/telecoms-research/connected-nations" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Ofcom — Connected Nations</a> — annual broadband coverage and technology breakdown. Retrieved March 2026.</p>
            <p><a href="https://www.ofcom.org.uk/research-and-data/telecoms-research/broadband-research/broadband-speeds" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Ofcom — Home Broadband Performance</a> — median speed measurements via SamKnows panel. Retrieved March 2026.</p>
            <p><a href="https://www.ons.gov.uk/businessindustryandtrade/itandinternetindustry/bulletins/internetusers" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ONS — Internet users, Great Britain</a> — digital inclusion data. Retrieved March 2026.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
