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

// Problem gamblers (millions), 2016–2023 — NHS / Gambling Commission
const problemGamblerValues = [0.8, 0.7, 0.7, 0.7, 0.8, 1.0, 0.9, 0.8];

// Online gambling gross yield (£bn), 2016–2024 — Gambling Commission
const onlineGrossYieldValues = [4.5, 5.0, 5.5, 6.0, 7.0, 8.5, 9.0, 9.5, 10.0];

// FOBT stake reduction: £100 → £2 per spin (April 2019)
const fobtstakeValues = [100, 100, 100, 2, 2, 2, 2, 2, 2];

const gamblerSeries: Series[] = [
  {
    id: 'problem-gamblers',
    label: 'Problem gamblers (millions)',
    colour: '#E63946',
    data: problemGamblerValues.map((v, i) => ({ date: new Date(2016 + i, 0, 1), value: v })),
  },
];

const yieldSeries: Series[] = [
  {
    id: 'online-yield',
    label: 'Online gambling gross yield (£bn)',
    colour: '#264653',
    data: onlineGrossYieldValues.map((v, i) => ({ date: new Date(2016 + i, 0, 1), value: v })),
  },
];

const gamblingAnnotations: Annotation[] = [
  { date: new Date(2019, 3, 1), label: 'Apr 2019: FOBT stake reduced to £2' },
  { date: new Date(2023, 0, 1), label: '2023: Gambling Act White Paper' },
];

const editorialRefs: Reference[] = [
  { num: 1, name: 'Gambling Commission', dataset: 'Participation and problem gambling survey', url: 'https://www.gamblingcommission.gov.uk/statistics-and-research/publication/gambling-participation-in-great-britain-behaviour-awareness-and-attitudes', date: '2023' },
  { num: 2, name: 'Gambling Commission', dataset: 'Industry statistics', url: 'https://www.gamblingcommission.gov.uk/statistics-and-research/publication/industry-statistics', date: '2024' },
  { num: 3, name: 'DCMS', dataset: 'FOBT review', date: '2019' },
  { num: 4, name: 'DCMS', dataset: 'Gambling Act Review White Paper', date: '2023' },
];

export default function FixedOddsBettingReformPage() {
  return (
    <>
      <TopicNav topic="Gambling Reform" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Gambling Reform"
          question="Is the Fixed-Odds Betting Reform Working?"
          finding="The 2019 reduction of fixed-odds betting terminal (FOBT) stakes from £100 to £2 per spin reduced FOBT revenues by £400m. But online gambling has grown from £4.5bn to £10bn since 2016. Problem gambling affects around 800,000 people, and the number is not falling."
          colour="#E63946"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Fixed-odds betting terminals (FOBTs) — high-speed electronic roulette machines in high street bookmakers — were described by critics as the 'crack cocaine of gambling' for their ability to enable rapid, high-stakes losses. In 2018, following years of campaigning and a government review, the maximum stake per spin was reduced from £100 to £2 — one of the most significant gambling regulations in decades. The change came into force in April 2019 and resulted in an immediate reduction of around £400 million in FOBT gross gambling yield<Cite nums={3} />. Some bookmakers closed shops as a result; high street gambling density in deprived areas fell modestly.</p>
            <p>However, the FOBT reform has been partially offset by the explosion in online gambling. Online gambling gross yield grew from £4.5 billion in 2016 to approximately £10 billion in 2024 — more than doubling<Cite nums={2} /> — as smartphone apps, in-play betting, and algorithm-driven product design made gambling more accessible, persistent, and immersive than ever. The Gambling Commission estimates there are around 800,000 problem gamblers in Great Britain, with a further 1.5–2 million 'at-risk'<Cite nums={1} />. The government's 2023 Gambling Act White Paper proposed stake limits for online slots (confirmed at £5 for over-25s), enhanced affordability checks, and a statutory gambling levy to fund treatment<Cite nums={4} /> — though the levy rate has been contested by the industry. The NHS Northern Gambling Service now operates nationally.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Problem gambling' },
          { id: 'sec-chart2', label: 'Online growth' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Problem gamblers"
              value="800,000"
              unit=""
              direction="flat"
              polarity="up-is-bad"
              changeText="Broadly unchanged · 1.5-2M more 'at-risk'"
              sparklineData={[0.8, 0.7, 0.7, 0.7, 0.8, 1.0, 0.9, 0.8]}
              source="Gambling Commission · Gambling participation and problem gambling survey 2023"
              href="#sec-chart1"
            />
            <MetricCard
              label="Online gambling gross yield"
              value="£10bn"
              unit="/year"
              direction="up"
              polarity="up-is-bad"
              changeText="Up from £4.5bn in 2016 · FOBT reform offset by online growth"
              sparklineData={[4.5, 5.0, 5.5, 6.0, 7.0, 8.5, 9.0, 9.5, 10.0]}
              source="Gambling Commission · Industry statistics 2024"
              href="#sec-chart2"
            />
            <MetricCard
              label="FOBT max stake"
              value="£2"
              unit="/spin"
              direction="down"
              polarity="down-is-bad"
              changeText="Reduced from £100 in 2019 · saved estimated 17,500 people from gambling harm"
              sparklineData={[100, 100, 100, 2, 2, 2, 2, 2]}
              source="DCMS · FOBT review 2019"
              href="#sec-chart1"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Problem gamblers in Great Britain, 2016–2023"
              subtitle="Estimated number of adults with gambling problems (thousands). Slight uptick during COVID lockdowns as online gambling surged; broadly flat."
              series={gamblerSeries}
              annotations={gamblingAnnotations}
              yLabel="Problem gamblers (millions)"
              source={{ name: 'Gambling Commission', dataset: 'Participation and problem gambling survey', url: 'https://www.gamblingcommission.gov.uk/statistics-and-research/publication/gambling-participation-in-great-britain-behaviour-awareness-and-attitudes', frequency: 'annual', date: '2023' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Online gambling gross yield, UK, 2016–2024"
              subtitle="Gross gambling yield (stakes minus winnings) from online casino, slots, and betting. More than doubled since 2016 despite FOBT reforms targeting land-based venues."
              series={yieldSeries}
              annotations={[{ date: new Date(2020, 2, 1), label: '2020: COVID — online surge' }]}
              yLabel="Gross yield (£bn)"
              source={{ name: 'Gambling Commission', dataset: 'Industry statistics', url: 'https://www.gamblingcommission.gov.uk/statistics-and-research/publication/industry-statistics', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Statutory gambling levy to fund £100m treatment annually"
            value="£100m"
            description="The 2023 Gambling Act White Paper proposed a statutory gambling levy on operators to fund research, education, and treatment — replacing the current voluntary levy system under which treatment funding has been inadequate and inconsistent. The statutory rate is expected to raise approximately £100 million per year, compared to around £10 million currently raised voluntarily. This would fund NHS gambling clinics in every region and substantially expand GamCare helpline capacity. Online slots stake limits of £5 per spin (for adults aged 25+) and £2 (for 18–24s) are confirmed for implementation in 2025."
            source="Source: DCMS — Gambling Act Review White Paper 2023. Gambling Commission — Licence conditions and codes of practice 2024."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.gamblingcommission.gov.uk/statistics-and-research/publication/gambling-participation-in-great-britain-behaviour-awareness-and-attitudes" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Gambling Commission — Participation and problem gambling survey</a> — annual survey of gambling behaviour and problem gambling rates in adults.</p>
            <p><a href="https://www.gamblingcommission.gov.uk/statistics-and-research/publication/industry-statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Gambling Commission — Industry statistics</a> — quarterly gross gambling yield by sector (online, land-based, lottery).</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
