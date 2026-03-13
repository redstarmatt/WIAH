'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import PositiveCallout from '@/components/PositiveCallout';
import RelatedTopics from '@/components/RelatedTopics';

// UK ODA as % of GNI, 2015–2024
const odaPctGni = [0.70, 0.70, 0.70, 0.70, 0.70, 0.70, 0.50, 0.50, 0.50, 0.50];
// Total ODA (£bn), 2015–2024
const odaTotalBn = [12.2, 13.4, 14.1, 14.6, 15.1, 15.3, 11.4, 13.0, 15.2, 15.2];
// Asylum in-donor costs (£bn), 2015–2024
const asylumDiversionBn = [0.5, 0.8, 1.2, 1.6, 2.0, 2.5, 3.0, 3.2, 3.5, 3.5];

const odaPctSeries: Series[] = [
  {
    id: 'oda-pct-gni',
    label: 'UK ODA as % of GNI',
    colour: '#264653',
    data: odaPctGni.map((v, i) => ({ date: new Date(2015 + i, 6, 1), value: v })),
  },
];

const odaBreakdownSeries: Series[] = [
  {
    id: 'total-oda',
    label: 'Total ODA (£bn)',
    colour: '#264653',
    data: odaTotalBn.map((v, i) => ({ date: new Date(2015 + i, 6, 1), value: v })),
  },
  {
    id: 'asylum-diversion',
    label: 'Asylum in-donor costs (£bn)',
    colour: '#E63946',
    data: asylumDiversionBn.map((v, i) => ({ date: new Date(2015 + i, 6, 1), value: v })),
  },
];

const odaAnnotations: Annotation[] = [
  { date: new Date(2021, 6, 1), label: '2021: Cut to 0.5%' },
];

const breakdownAnnotations: Annotation[] = [
  { date: new Date(2019, 6, 1), label: '2019: Asylum costs start rising sharply' },
  { date: new Date(2021, 6, 1), label: '2021: ODA cut — overseas aid squeezed further' },
];

export default function ForeignAidPage() {
  return (
    <>
      <TopicNav topic="Foreign Aid" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Foreign Aid"
          question="What Has Happened to Britain's Foreign Aid?"
          finding="The UK cut overseas development assistance from 0.7% to 0.5% of GNI in 2021, withdrawing approximately £4 billion annually. Simultaneously, £3.5 billion of the remaining budget was classified as domestic asylum processing costs."
          colour="#264653"
          preposition="with"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The United Kingdom was one of the first countries in the world to legislate for the 0.7% of GNI aid target, passed into law in 2015. In April 2021, the then Chancellor announced a reduction to 0.5% of GNI, citing the fiscal pressures of the COVID-19 pandemic. The cut amounted to approximately £4 billion annually, with immediate impact: bilateral programmes in sub-Saharan Africa, South Asia, and fragile states were cut or closed. The House of Commons International Development Committee found that programmes addressing girls' education, malaria prevention, and food security were among the most severely affected.</p>
            <p>The 0.5% figure obscures a second problem: a growing proportion of the aid budget is being spent in the UK rather than overseas. Under OECD DAC rules, expenditure on asylum seekers in the donor country during their first year of arrival can be classified as ODA. In 2023, approximately £3.5 billion of the £15.2 billion total ODA budget was classified as in-donor asylum costs — money spent on hotels, processing, and support for people awaiting asylum decisions in the UK. This means the overseas aid budget available for programmes in developing countries was approximately £11.7 billion, not £15.2 billion. The Independent Commission for Aid Impact found this reclassification had resulted in the termination or reduction of programmes with demonstrable life-saving impact.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-oda-pct', label: 'ODA % of GNI' },
          { id: 'sec-breakdown', label: 'Aid Breakdown' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="UK ODA as % of GNI"
              value="0.5%"
              unit=""
              direction="down"
              polarity="up-is-good"
              changeText="Down from 0.7% · cut in 2021 · £4bn annually withdrawn from overseas"
              sparklineData={odaPctGni.slice(-8)}
              source="FCDO · Statistics on International Development 2024"
              href="#sec-oda-pct"
            />
            <MetricCard
              label="Total ODA budget 2023"
              value="£15.2bn"
              unit=""
              direction="down"
              polarity="up-is-good"
              changeText="Of which £3.5bn spent in UK on asylum processing · net overseas: £11.7bn"
              sparklineData={odaTotalBn.slice(-8)}
              source="FCDO · ODA Statistics 2023"
              href="#sec-breakdown"
            />
            <MetricCard
              label="Aid diverted to domestic asylum costs"
              value="£3.5bn"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Up from £300m in 2015 · classified as ODA under DAC rules · 23% of total"
              sparklineData={asylumDiversionBn.slice(-8)}
              source="ICAI · Annual Review 2024"
              href="#sec-breakdown"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-oda-pct" className="mb-12">
            <LineChart
              title="UK ODA as % of GNI, 2015–2024"
              subtitle="UK overseas development assistance as a percentage of gross national income. 0.7% is the UN and statutory target, legislated in 2015 and cut in 2021."
              series={odaPctSeries}
              annotations={odaAnnotations}
              targetLine={{ value: 0.7, label: '0.7% UN target' }}
              yLabel="% of GNI"
              source={{ name: 'FCDO / OECD DAC', dataset: 'UK Overseas Development Assistance Statistics', url: 'https://www.gov.uk/government/collections/statistics-on-international-development', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-breakdown" className="mb-12">
            <LineChart
              title="UK ODA: total budget vs asylum in-donor costs, 2015–2024"
              subtitle="Growing proportion of ODA budget classified as domestic asylum processing costs under OECD DAC rules. Red = spent in UK rather than overseas."
              series={odaBreakdownSeries}
              annotations={breakdownAnnotations}
              yLabel="£bn"
              source={{ name: 'FCDO / ICAI', dataset: 'Statistics on International Development & ICAI Annual Review', url: 'https://icai.independent.gov.uk/', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="UK remains a top-five global donor by volume"
            value="Top 5"
            unit="global donors by ODA volume"
            description="Despite the cut from 0.7% to 0.5%, the UK remains one of the world's largest donors in absolute terms — ranking in the top five globally by ODA volume. The commitment to return to 0.7% when fiscal conditions allow is embedded in the 2015 legislation. UK multilateral contributions through the World Bank, Global Fund, and UN agencies continue to fund proven life-saving programmes. UK aid helped treat 27 million people for malaria in 2023 and vaccinated 13 million children through Gavi."
            source="OECD DAC · Official Aid Statistics 2023; FCDO · UK Aid Annual Review 2023."
          />
        </ScrollReveal>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.gov.uk/government/collections/statistics-on-international-development" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">FCDO — Statistics on International Development</a> — Annual ODA data including in-donor costs breakdown. Retrieved 2025.</p>
            <p><a href="https://icai.independent.gov.uk/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ICAI — Independent Commission for Aid Impact</a> — Annual review and impact assessments of UK aid spending. Retrieved 2025.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
