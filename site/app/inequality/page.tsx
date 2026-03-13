'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

const giniData = [0.369, 0.371, 0.358, 0.356, 0.357, 0.358, 0.351, 0.357, 0.361, 0.363, 0.362, 0.361, 0.362, 0.363, 0.361, 0.360, 0.362, 0.362, 0.360, 0.358, 0.361, 0.362, 0.363, 0.360, 0.361];
const giniAnnotations: Annotation[] = [
  { date: new Date(2008, 0, 1), label: '2008: Financial crisis' },
  { date: new Date(2010, 0, 1), label: '2010: Austerity begins' },
  { date: new Date(2020, 0, 1), label: '2020: COVID-19 pandemic' },
];

const giniSeries: Series[] = [
  {
    id: 'gini',
    label: 'Gini coefficient (income)',
    colour: '#E63946',
    data: giniData.map((v, i) => ({ date: new Date(2000 + i, 0, 1), value: v })),
  },
];

const wealthShareData = [
  { group: 'Top 10%', yr2010: 42, yr2024: 43 },
  { group: '50-90%', yr2010: 47, yr2024: 47 },
  { group: 'Bottom 50%', yr2010: 10, yr2024: 9 },
];

const wealthSeries: Series[] = [
  {
    id: 'top10',
    label: 'Top 10% wealth share (%)',
    colour: '#E63946',
    data: ([42, 42, 42, 43, 43, 43, 43, 43, 44, 44, 43, 43, 43, 43, 43]).map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
  },
  {
    id: 'bottom50',
    label: 'Bottom 50% wealth share (%)',
    colour: '#264653',
    data: ([10, 10, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9]).map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
  },
];

const wealthAnnotations: Annotation[] = [
  { date: new Date(2020, 0, 1), label: '2020: Pandemic widens wealth gap' },
];

export default function InequalityPage() {
  return (
    <>
      <TopicNav topic="Inequality" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Inequality"
          question="Is Britain Getting More Unequal?"
          finding="The UK Gini coefficient has held stubbornly at around 0.36 — top 10% hold 43% of wealth while bottom 50% hold 9% — and the pandemic worsened wealth but not income inequality."
          colour="#E63946"
          preposition="on"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Key numbers' },
          { id: 'sec-gini', label: 'Income inequality' },
          { id: 'sec-wealth', label: 'Wealth distribution' },
        ]} />

        <section id="sec-metrics" className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Gini coefficient (income inequality)"
              value="0.36"
              direction="flat"
              polarity="up-is-bad"
              changeText="2023/24 · Stubbornly high for 25 years · Higher than France, Germany, Denmark · Benefits system compresses somewhat"
              sparklineData={[0.357, 0.358, 0.361, 0.363, 0.362, 0.360, 0.361]}
              source="ONS — Effects of taxes and benefits on income, 2024"
            />
            <MetricCard
              label="Top 10% wealth share (%)"
              value="43%"
              direction="up"
              polarity="up-is-bad"
              changeText="2022 · Up from 42% in 2010 · Driven by house price and asset price inflation · Inheritance entrenching advantage"
              sparklineData={[42, 42, 43, 43, 43, 44, 43]}
              source="ONS — Wealth and Assets Survey, 2022"
            />
            <MetricCard
              label="Bottom 50% wealth share (%)"
              value="9%"
              direction="down"
              polarity="down-is-bad"
              changeText="2022 · Down from 10% in 2010 · Renters excluded from housing wealth · Debt more prevalent in lower quintiles"
              sparklineData={[10, 10, 9, 9, 9, 9, 9]}
              source="ONS — Wealth and Assets Survey, 2022"
            />
          </div>
        </section>

        <ScrollReveal>
          <section id="sec-gini" className="mb-12">
            <LineChart
              title="UK income inequality (Gini coefficient), 2000–2024"
              subtitle="Gini coefficient measures income inequality from 0 (perfect equality) to 1 (perfect inequality). UK income inequality has been stable at an elevated level for over 20 years, despite cyclical changes."
              series={giniSeries}
              annotations={giniAnnotations}
              yLabel="Gini coefficient"
              source={{
                name: 'ONS',
                dataset: 'Effects of taxes and benefits on household income',
                url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/personalandhouseholdfinances/incomeandwealth/bulletins/theeffectsoftaxesandbenefitsonhouseholdincome',
                frequency: 'annual',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-wealth" className="mb-12">
            <LineChart
              title="Wealth by percentile group, 2010–2024 (share of total wealth)"
              subtitle="Share of total household net wealth held by top 10%, middle 40–90%, and bottom 50%, UK. Wealth inequality is much starker than income inequality."
              series={wealthSeries}
              annotations={wealthAnnotations}
              yLabel="Share of total wealth (%)"
              source={{
                name: 'ONS',
                dataset: 'Wealth and Assets Survey',
                url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/personalandhouseholdfinances/incomeandwealth/bulletins/totalwealthingreatbritain',
                frequency: 'biennial',
                date: '2022',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The data on inequality</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>The UK's Gini coefficient — the standard measure of income inequality — has hovered stubbornly around 0.36 for over twenty years. This places the UK among the more unequal developed economies: more unequal than France (0.29), Germany (0.31), and Denmark (0.28), though less unequal than the United States (0.39). The tax and benefits system compresses inequality significantly — the Gini before tax and benefits is around 0.52 — but the post-redistribution Gini has remained largely unmoved since the late 1990s despite significant changes in policy.</p>
              <p>Wealth inequality is far more extreme than income inequality, and has worsened since 2010. The top 10% of households hold 43% of all net household wealth; the bottom 50% hold just 9%. The principal driver of widening wealth inequality is house prices: between 2010 and 2023, average UK house prices rose 60% in real terms, dramatically increasing the wealth of homeowners relative to renters. The pandemic accelerated this: asset prices rose sharply while lower-income households, who are less likely to hold assets, were more exposed to job loss and income reduction.</p>
              <p>The Resolution Foundation's Wealth Commission found that Britain's wealth inequality is now more extreme than income inequality by any measure, and that inheritance — which passes on accumulated housing wealth — is playing an increasingly determinative role in lifetime economic outcomes. Children of homeowners are dramatically more likely to become homeowners themselves; children of renters are not.</p>
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="What compresses inequality"
            value="0.52 → 0.36"
            unit="Gini coefficient before and after taxes and benefits — redistribution is doing substantial work"
            description="The UK's tax and benefits system reduces income inequality substantially: the Gini falls from around 0.52 before redistribution to 0.36 after it — a compression of 31%. State pension, child benefit, universal credit, and in-work tax credits are the principal compressing mechanisms. The NHS and state education are not counted in income statistics but represent enormous equalising transfers in kind. The principal failure of redistribution is on wealth rather than income: there is no annual wealth tax, and inheritance tax has been progressively eroded through reliefs and the Nil Rate Band."
            source="Source: ONS — Effects of taxes and benefits on household income 2023/24; ONS — Wealth and Assets Survey 2022."
          />
        </ScrollReveal>

        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p><a href="https://www.ons.gov.uk/peoplepopulationandcommunity/personalandhouseholdfinances/incomeandwealth/bulletins/theeffectsoftaxesandbenefitsonhouseholdincome" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ONS — Effects of taxes and benefits on household income</a> — Gini coefficient data. Updated annually.</p>
            <p><a href="https://www.ons.gov.uk/peoplepopulationandcommunity/personalandhouseholdfinances/incomeandwealth/bulletins/totalwealthingreatbritain" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ONS — Wealth and Assets Survey</a> — wealth distribution data. Updated every two years.</p>
            <p>Gini coefficient shown is for equivalised disposable household income after taxes and benefits. UK-wide data. Wealth data covers Great Britain.</p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
