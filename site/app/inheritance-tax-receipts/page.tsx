'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'HMRC', dataset: 'Inheritance Tax Statistics', url: 'https://www.gov.uk/government/statistics/inheritance-tax-statistics-commentary', date: '2024' },
  { num: 2, name: 'IFS', dataset: 'Inheritance and Inequality', url: 'https://ifs.org.uk/research/inheritance', date: '2024' },
  { num: 3, name: 'Resolution Foundation', dataset: 'Wealth Concentration and IHT', url: 'https://www.resolutionfoundation.org/', date: '2024' },
];

const ihtReceiptsValues = [3.4, 3.8, 4.4, 4.8, 5.1, 5.4, 5.9, 6.1, 7.1, 7.5, 8.2];
const estatesPayingValues = [3.2, 3.5, 3.8, 4.1, 4.3, 4.5, 4.8, 5.0, 5.2, 5.4, 5.6];
const averageIhtValues = [157, 162, 171, 176, 182, 188, 196, 202, 211, 218, 228];
const propertyShareValues = [47.2, 48.1, 49.3, 50.1, 51.2, 52.4, 53.1, 54.2, 55.8, 56.9, 58.1];

const series1: Series[] = [
  { id: 'receipts', label: 'IHT receipts (£ billion)', colour: '#6B7280', data: ihtReceiptsValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
  { id: 'estates', label: 'Estates paying IHT (thousands)', colour: '#264653', data: estatesPayingValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
];

const series2: Series[] = [
  { id: 'average', label: 'Average IHT bill (£ thousand)', colour: '#E63946', data: averageIhtValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
  { id: 'property', label: 'Property as % of taxable estate value', colour: '#F4A261', data: propertyShareValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
];

const annotations1: Annotation[] = [
  { date: new Date(2017, 3, 1), label: '2017: Residence Nil-Rate Band introduced' },
  { date: new Date(2024, 9, 1), label: '2024: Budget — pension assets included in IHT' },
];

export default function InheritanceTaxReceiptsPage() {
  return (
    <>
      <TopicNav topic="Inheritance Tax Receipts" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Economy"
          question="Who Is Actually Paying Inheritance Tax?"
          finding={<>HMRC collected £8.2 billion in inheritance tax in 2023/24 — a record, rising fast as house prices have dragged more estates above the nil-rate band threshold, which has been frozen at £325,000 since 2009.<Cite nums={1} /> Only 5.6% of deaths trigger an IHT charge — but the October 2024 Budget decision to include pension assets in IHT from 2027 will materially expand its reach.<Cite nums={[1, 2]} /></>}
          colour="#6B7280"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Inheritance tax is one of the most politically contentious levies in the UK, widely characterised as a &quot;death tax&quot; that hits ordinary families — despite data showing that only around 5–6% of deaths each year result in an IHT charge. Its receipts have more than doubled since 2013, rising from £3.4 billion to £8.2 billion, primarily because the nil-rate band — the threshold below which estates pay no tax — has been frozen at £325,000 since April 2009. As house prices have risen substantially in that period, more estates have been drawn above the threshold even without any increase in real wealth. Property now accounts for 58% of the value of all taxable estates.<Cite nums={1} /></p>
            <p>The IFS estimates that inherited wealth now accounts for around one-quarter of all wealth held by people in their 40s and 50s — up from around one-eighth two decades ago. This represents a fundamental shift in how wealth is accumulated in Britain: increasingly, it is inherited rather than earned. The Resolution Foundation has argued that the growing importance of inheritance is one of the primary drivers of wealth inequality, because it compounds existing advantages.<Cite nums={[2, 3]} /> The tax itself is riddled with reliefs that benefit the wealthy: Business Property Relief allows family businesses and AIM shares to pass inheritance-tax-free; Agricultural Property Relief does the same for farmland. The October 2024 Budget capped these reliefs and included unspent pension pots in IHT from 2027 — changes expected to raise £2 billion annually but which have generated significant political controversy, particularly from farming communities.<Cite nums={1} /></p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Overview' },
          { id: 'sec-chart1', label: 'Receipts & Estates' },
          { id: 'sec-chart2', label: 'Avg Bill & Property Share' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard label="IHT receipts" value="£8.2bn" unit="2023/24" direction="up" polarity="up-is-bad" changeText="up from £3.4bn in 2013 · nil-rate band frozen since 2009" sparklineData={[3.4, 3.8, 4.4, 4.8, 5.1, 5.4, 5.9, 6.1, 7.1, 7.5, 8.2]} source="HMRC — Inheritance Tax Statistics 2024" href="#sec-chart1" />
            <MetricCard label="Estates paying IHT" value="5.6%" unit="of deaths" direction="up" polarity="up-is-bad" changeText="was 3.2% in 2013 · threshold drag pulling more estates in" sparklineData={[3.2, 3.5, 3.8, 4.1, 4.3, 4.5, 4.8, 5.0, 5.2, 5.4, 5.6]} source="HMRC — Inheritance Tax Statistics 2024" href="#sec-chart1" />
            <MetricCard label="Average IHT bill" value="£228K" unit="per estate" direction="up" polarity="up-is-bad" changeText="up from £157K in 2013 · property drives the increase" sparklineData={[157, 162, 171, 176, 182, 188, 196, 202, 211, 218, 228]} source="HMRC — Inheritance Tax Statistics 2024" href="#sec-chart2" />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Inheritance tax receipts and share of estates paying, 2013–2024"
              subtitle="Annual IHT receipts (£ billion) and proportion of deaths that trigger an IHT liability (%). Both rising due to frozen thresholds and rising house prices pulling more estates above the nil-rate band."
              series={series1}
              annotations={annotations1}
              yLabel="£ billion / Percentage"
              source={{ name: 'HMRC', dataset: 'Inheritance Tax Statistics', url: 'https://www.gov.uk/government/statistics/inheritance-tax-statistics-commentary', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Average IHT bill and property share of taxable estates, 2013–2024"
              subtitle="Average inheritance tax bill per estate (£ thousand) and property as % of total taxable estate value. Rising house prices mean property now accounts for nearly 60% of all IHT liability."
              series={series2}
              annotations={[]}
              yLabel="£ thousand / Percentage"
              source={{ name: 'HMRC', dataset: 'Inheritance Tax Statistics', url: 'https://www.gov.uk/government/statistics/inheritance-tax-statistics-commentary', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Only 5.6% of estates pay any inheritance tax at all"
            value="94.4%"
            unit="of deaths generate no IHT liability at all"
            description="Despite the perception that IHT is a widespread burden, over 94% of all deaths in the UK generate no IHT liability. The tax falls on relatively wealthy estates — those above the £325,000 nil-rate band (or £500,000 with the residence nil-rate band for property passing to direct descendants). The political controversy often conflates the estate tax with the broader issue of wealth concentration, which is real and growing — but is not primarily a function of IHT, which affects a small minority of estates and is riddled with reliefs that allow the wealthiest families to reduce their effective tax rate well below the headline 40%."
            source="Source: HMRC — Inheritance Tax Statistics 2024. IFS — Inheritance and Inequality 2024."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.gov.uk/government/statistics/inheritance-tax-statistics-commentary" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">HMRC — Inheritance Tax Statistics</a> — receipts, estates, reliefs used. Annual.</p>
            <p><a href="https://ifs.org.uk/research/inheritance" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">IFS — Inheritance and Inequality</a> — distribution of inheritance, wealth accumulation. Annual.</p>
            <p>Financial year runs April to March. Estate count is estates triggering IHT on death returns. Average bill excludes those with zero liability. Property includes main residence and other property.</p>
          </div>
        </section>
      </main>
    </>
  );
}
