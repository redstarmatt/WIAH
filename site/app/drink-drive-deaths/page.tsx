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

// Drink-drive deaths, 2012–2023 — DfT
const deathValues = [260, 240, 250, 230, 220, 250, 280, 290, 210, 260, 280, 270];

// Serious injuries, 2012–2023 — DfT
const injuryValues = [1200, 1110, 1170, 1250, 1200, 1300, 1330, 1320, 970, 1180, 1360, 1290];

const deathsSeries: Series[] = [
  {
    id: 'deaths',
    label: 'Drink-drive deaths',
    colour: '#E63946',
    data: deathValues.map((v, i) => ({ date: new Date(2012 + i, 0, 1), value: v })),
  },
];

const combinedSeries: Series[] = [
  {
    id: 'deaths',
    label: 'Drink-drive deaths',
    colour: '#E63946',
    data: deathValues.map((v, i) => ({ date: new Date(2012 + i, 0, 1), value: v })),
  },
  {
    id: 'serious-injuries',
    label: 'Serious injuries',
    colour: '#F4A261',
    data: injuryValues.map((v, i) => ({ date: new Date(2012 + i, 0, 1), value: v })),
  },
];

const annotations: Annotation[] = [
  { date: new Date(2014, 0, 1), label: '2014: Scotland lowers limit to 50mg' },
];

const editorialRefs: Reference[] = [
  { num: 1, name: 'Department for Transport', dataset: 'Reported Road Casualties Great Britain', url: 'https://www.gov.uk/government/collections/road-accidents-and-safety-statistics', date: '2023' },
  { num: 2, name: 'Transport Research Laboratory', dataset: 'Drink drive limit research', date: '2023', url: 'https://www.trl.co.uk/' },
  { num: 3, name: 'Ministry of Justice', dataset: 'Criminal Justice Statistics', url: 'https://www.gov.uk/government/collections/criminal-justice-statistics', date: '2023' },
];

export default function DrinkDriveDeathsPage() {
  return (
    <>
      <TopicNav topic="Transport" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Transport"
          question="Is Drink Driving Still Killing People?"
          finding="270 people died in drink-drive collisions in 2023 — the same number as a decade ago, despite stricter enforcement. England and Wales retain the highest legal alcohol limit in Western Europe at 80mg/100ml."
          colour="#E63946"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Drink driving deaths in Great Britain fell dramatically through the 1980s and 1990s, but progress has stalled completely since the early 2010s. Deaths have oscillated between 210 and 290 per year for over a decade, with the 2023 figure at 270.<Cite nums={1} /> England and Wales retain the highest legal alcohol limit for driving in Western Europe at 80mg per 100ml of blood. Scotland lowered its limit to 50mg in 2014, in line with the rest of Europe, and recorded a measurable reduction in drink-drive casualties. Multiple road safety organisations, the British Medical Association, and the Parliamentary Advisory Council for Transport Safety have recommended the same change for England and Wales; ministers have consistently declined to act, citing rural community and hospitality industry impacts. Modelling by the Transport Research Laboratory estimated that lowering the limit would prevent around 25 deaths per year in England alone.<Cite nums={2} /></p>
            <p>The number of police breath tests administered has fallen substantially since 2009 as officer numbers fell and breath testing operations were deprioritised. Random breath testing — permitted across most of Europe — is not currently allowed in England and Wales. The moral arithmetic is straightforward: a proven intervention is available, has been implemented without apparent harm in Scotland and across Europe, and has a strong evidence base. The decision not to implement it is a political choice with measurable, fatal consequences.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Deaths trend' },
          { id: 'sec-chart2', label: 'Deaths & injuries' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Drink-drive deaths 2023"
              value="270"
              unit=""
              direction="flat"
              polarity="up-is-bad"
              changeText="No long-term progress since 2012 · was 290 in 2018"
              sparklineData={[260, 240, 250, 230, 250, 280, 290, 270]}
              source="DfT · Reported Road Casualties 2023"
              href="#sec-chart1"
            />
            <MetricCard
              label="Serious injuries 2023"
              value="1,290"
              unit=""
              direction="flat"
              polarity="up-is-bad"
              changeText="Plateau since 2012 · limit discussion needed"
              sparklineData={[1200, 1170, 1250, 1300, 1330, 970, 1360, 1290]}
              source="DfT · Reported Road Casualties 2023"
              href="#sec-chart2"
            />
            <MetricCard
              label="England/Wales legal limit"
              value="80mg"
              unit="/100ml"
              direction="flat"
              polarity="up-is-bad"
              changeText="vs Scotland's 50mg · unchanged since 1967"
              sparklineData={[80, 80, 80, 80, 80, 80, 80, 80]}
              source="Road Traffic Act 1988 · unchanged since 1967"
              href="#sec-chart1"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Drink-drive deaths, Great Britain, 2012–2023"
              subtitle="Estimated fatalities in collisions where at least one driver was over the legal limit. Progress has stalled since 2012."
              series={deathsSeries}
              annotations={annotations}
              yLabel="Deaths"
              source={{ name: 'Department for Transport', dataset: 'Reported Road Casualties Great Britain', url: 'https://www.gov.uk/government/collections/road-accidents-and-safety-statistics', frequency: 'annual', date: '2023' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Drink-drive deaths and serious injuries, Great Britain, 2012–2023"
              subtitle="Both deaths and serious injuries show a plateau — enforcement-only approach has reached its limit."
              series={combinedSeries}
              annotations={[]}
              yLabel="Casualties"
              source={{ name: 'Department for Transport', dataset: 'Reported Road Casualties Great Britain', url: 'https://www.gov.uk/government/collections/road-accidents-and-safety-statistics', frequency: 'annual', date: '2023' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Scotland's lower limit cut casualties"
            value="50mg/100ml"
            unit="Scotland's legal limit since December 2014"
            description="Scotland lowered its drink-drive limit from 80mg to 50mg per 100ml in December 2014, in line with most of Europe. Research found a measurable reduction in drink-drive casualties in the years following the change. The Transport Research Laboratory has modelled that the same reduction in England and Wales would prevent approximately 25 deaths per year. The evidence base is strong; the political will has not yet followed."
            source="Source: Transport Scotland — Road Casualties Scotland 2023. Transport Research Laboratory — drink drive limit research."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.gov.uk/government/collections/road-accidents-and-safety-statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Department for Transport — Reported Road Casualties Great Britain</a> — annual statistical release including drink-drive casualty estimates.</p>
            <p><a href="https://www.gov.uk/government/collections/criminal-justice-statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Ministry of Justice — Criminal Justice Statistics</a> — drink-drive convictions by offence type.</p>
            <p>Drink-drive casualties are estimated figures applying a DfT statistical model to adjust for underreporting and non-breathalysted casualties. These estimates carry uncertainty and are revised on a rolling 3-year basis.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
