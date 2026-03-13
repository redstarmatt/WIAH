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

// Defence spending as % GDP, 2015–2024
const gdpPctValues = [2.2, 2.2, 2.1, 2.1, 2.1, 2.1, 2.2, 2.25, 2.3, 2.3];
const natoTargetValues = gdpPctValues.map(() => 2.0);

// Defence spending real terms (£bn) and equipment budget (£bn), 2015–2024
const defenceSpendValues = [36, 37, 38, 39, 40, 41, 43, 45, 48, 51];
const equipmentBudgetValues = [14, 15, 15, 16, 17, 17, 18, 19, 20, 22];

const series1: Series[] = [
  {
    id: 'defence-gdp',
    label: 'Defence spending (% GDP)',
    colour: '#264653',
    data: gdpPctValues.map((v, i) => ({ date: new Date(2015 + i, 5, 1), value: v })),
  },
  {
    id: 'nato-target',
    label: 'NATO 2% target',
    colour: '#6B7280',
    data: natoTargetValues.map((v, i) => ({ date: new Date(2015 + i, 5, 1), value: v })),
  },
];

const series2: Series[] = [
  {
    id: 'defence-spend',
    label: 'Defence spending (£bn, real)',
    colour: '#264653',
    data: defenceSpendValues.map((v, i) => ({ date: new Date(2015 + i, 5, 1), value: v })),
  },
  {
    id: 'equipment-budget',
    label: 'Equipment budget (£bn, real)',
    colour: '#F4A261',
    data: equipmentBudgetValues.map((v, i) => ({ date: new Date(2015 + i, 5, 1), value: v })),
  },
];

const annotations1: Annotation[] = [
  { date: new Date(2022, 5, 1), label: '2022: Russia invades Ukraine — NATO pressure increases' },
  { date: new Date(2024, 5, 1), label: '2024: 2.5% target announced' },
];

const annotations2: Annotation[] = [
  { date: new Date(2021, 5, 1), label: '2021: AUKUS announced with US and Australia' },
  { date: new Date(2023, 5, 1), label: '2023: £2.3bn Ukraine military aid' },
];

const editorialRefs: Reference[] = [
  { num: 1, name: 'DESNZ', dataset: 'UK Defence Statistics', url: 'https://www.gov.uk/government/collections/uk-defence-statistics', date: '2024' },
  { num: 2, name: 'NATO', dataset: 'Defence Expenditure of NATO Countries', url: 'https://www.nato.int/cps/en/natohq/topics_49198.htm', date: '2024' },
];

export default function DefenceSpendingPage() {
  return (
    <>
      <TopicNav topic="Defence Spending" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Democracy & Governance"
          question="Is Britain Spending Enough on Defence?"
          finding="UK defence spending reached 2.3% of GDP in 2024–25, exceeding NATO's 2% target for the first time since 2010. The government committed to 2.5% by 2027 — the largest real-terms increase in defence spending since the Cold War — amid heightened threat assessments following Russia's invasion of Ukraine."
          colour="#6B7280"
          preposition="on"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>For most of the period from 2010 to 2022, the UK technically met NATO's 2% of GDP spending target, but only through accounting adjustments that included pension contributions and intelligence spending not counted by other NATO members.<Cite nums={2} /> The 2.3% figure reported in 2024–25 is the highest genuine defence spending level since the post-Cold War drawdown began.<Cite nums={1} /> Russia's full-scale invasion of Ukraine in February 2022 transformed the political calculus: what had been an abstract commitment to allied burden-sharing became an immediate question of European security. The UK has provided over £7 billion in military assistance to Ukraine since 2022, including Storm Shadow missiles, artillery, and air defence systems.<Cite nums={1} /></p>
            <p>The commitment to 2.5% of GDP by 2027 would require an additional £10 billion per year in real terms — a significant uplift for an armed forces that has faced persistent capability gaps, recruitment crises, and equipment procurement delays.<Cite nums={1} /> The army is at its smallest since the Napoleonic era; the navy has fewer than 20 destroyers and frigates; and the RAF's fast jet fleet has been reduced to around 120 aircraft.<Cite nums={1} /> Increasing the budget without addressing institutional inefficiency in the defence procurement system — where major programmes routinely run billions over budget and years late — risks the extra money being absorbed without proportionate capability gain.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: '% of GDP' },
          { id: 'sec-chart2', label: 'Real Spending' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Defence spending as % GDP"
              value="2.3%"
              unit="2024–25"
              direction="up"
              polarity="up-is-good"
              changeText="above NATO 2% target for first time since 2010"
              sparklineData={[2.2, 2.2, 2.1, 2.1, 2.1, 2.1, 2.2, 2.25, 2.3, 2.3]}
              source="DESNZ — UK Defence Statistics 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Target: 2.5% of GDP by 2027"
              value="2.5%"
              unit="commitment"
              direction="up"
              polarity="up-is-good"
              changeText="would add ~£10bn/year · NATO discussing 3% tier"
              sparklineData={[2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.3, 2.5]}
              source="HM Treasury — Spending Review 2025"
              href="#sec-chart1"
            />
            <MetricCard
              label="Real-terms defence spending (2024–25)"
              value="£51bn"
              unit="real terms"
              direction="up"
              polarity="up-is-good"
              changeText="+£15bn since 2015 · largest uplift since Cold War"
              sparklineData={[36, 37, 38, 39, 40, 41, 43, 45, 48, 51]}
              source="DESNZ — UK Defence Statistics 2024"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="UK defence spending as % of GDP vs NATO target, 2015–2024"
              subtitle="Defence expenditure as a percentage of GDP. The UK met the NATO 2% target on adjusted measures for most of this period, but genuine expenditure exceeded 2% only from 2023. The 2.5% commitment requires significant further increase by 2027."
              series={series1}
              annotations={annotations1}
              yLabel="% of GDP"
              source={{ name: 'DESNZ / NATO', dataset: 'UK Defence Statistics; NATO Defence Expenditure', url: 'https://www.gov.uk/government/collections/uk-defence-statistics', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="UK defence expenditure in real terms, 2015–2024"
              subtitle="Total defence spending and equipment budget (£bn, 2024–25 prices). Equipment spending has grown as a share of the budget following NATO commitments to modernise capabilities."
              series={series2}
              annotations={annotations2}
              yLabel="£ billions (real terms)"
              source={{ name: 'DESNZ', dataset: 'UK Defence Statistics — Annual', url: 'https://www.gov.uk/government/collections/uk-defence-statistics', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="First major defence uplift in 35 years"
            value="2.5%"
            unit="of GDP by 2027 — largest increase since Cold War"
            description="The commitment to 2.5% of GDP by 2027 represents the largest real-terms increase in UK defence spending since the end of the Cold War. The UK is a top-3 defence spender in NATO and increased military aid to Ukraine to over £7 billion since 2022. AUKUS — the trilateral security partnership with the US and Australia — and GCAP, the next-generation fighter programme with Japan and Italy, strengthen UK defence-industrial capabilities. Nordic-Baltic partnership agreements have expanded the UK's operational footprint beyond traditional NATO commitments."
            source="Source: DESNZ — UK Defence Statistics 2024. NATO — Defence Expenditure of NATO Countries 2024."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.gov.uk/government/collections/uk-defence-statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DESNZ — UK Defence Statistics</a> — annual spending data by capability area and in real terms. Annual. 2024.</p>
            <p><a href="https://www.nato.int/cps/en/natohq/topics_49198.htm" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NATO — Defence Expenditure of NATO Countries</a> — comparative spending data including the 2% guideline. Annual. 2024.</p>
            <p>Real-terms figures are deflated to 2024–25 prices using HM Treasury GDP deflator. NATO's 2% target uses NATO's own definition of defence expenditure, which differs from the UK national accounts definition. Equipment budget includes major platforms, vehicles, and weapons systems.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
