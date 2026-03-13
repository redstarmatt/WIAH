'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

// South East median household wealth (£k), 2010–2023
const seWealthK = [280, 310, 360, 400, 440, 470, 490, 495, 503, 510, 512, 514, 516, 510];
// North East median household wealth (£k), 2010–2023
const neWealthK = [130, 132, 140, 148, 155, 160, 162, 163, 165, 168, 168, 169, 169, 168];
// SE/NE wealth gap ratio, 2010–2023
const wealthGapRatio = [2.2, 2.3, 2.6, 2.7, 2.8, 2.9, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.1, 3.0];
// London GVA per head as % of UK average, 2010–2023
const londonGvaPct = [166, 168, 170, 172, 173, 174, 175, 176, 175, 172, 174, 176, 177, 175];

const regionalWealthSeries: Series[] = [
  {
    id: 'se-wealth',
    label: 'South East median household wealth (£k)',
    colour: '#E63946',
    data: seWealthK.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
  },
  {
    id: 'ne-wealth',
    label: 'North East median household wealth (£k)',
    colour: '#264653',
    data: neWealthK.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
  },
];

const gapSeries: Series[] = [
  {
    id: 'wealth-gap',
    label: 'SE vs NE wealth gap (ratio)',
    colour: '#E63946',
    data: wealthGapRatio.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
  },
  {
    id: 'london-gva',
    label: 'London GVA per head (% of UK average)',
    colour: '#F4A261',
    data: londonGvaPct.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v / 10 })),
  },
];

const wealthAnnotations: Annotation[] = [
  { date: new Date(2013, 0, 1), label: '2013: Help to Buy inflates SE house prices' },
  { date: new Date(2020, 0, 1), label: '2020: Levelling Up agenda announced' },
];

const gapAnnotations: Annotation[] = [
  { date: new Date(2022, 0, 1), label: '2022: Levelling Up White Paper' },
];

export default function GeographicWealthInequalityPage() {
  return (
    <>
      <TopicNav topic="Economy & Work" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Economy & Work"
          question="How Unequal Is Wealth Across Britain?"
          finding="Households in the South East are on average three times wealthier than households in the North East — a gap that has widened since 2010, driven almost entirely by differential house price growth."
          colour="#E63946"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Britain's regional wealth divide is not primarily about income — it is about property. Median total household wealth in the South East (approximately £510,000 in 2023) is roughly three times that in the North East (£168,000), a gap that has grown from 2.2× in 2010 to 3.0× today, driven almost entirely by differential house price growth. London and the South East saw the most dramatic house price inflation of the 2010s; the North East, parts of the Midlands, and the North West saw far more modest gains. The Levelling Up agenda, announced in 2020 and formalised in a 2022 White Paper, was the stated policy response; the UK2070 Commission found its commitments fell substantially short of the scale required, and the 2024 change of government brought a shift in framing but no resolution to the underlying structural gaps.</p>
            <p>The wealth gap compounds in ways that earnings data does not capture. A household in the South East that owns a £500,000 home can borrow against it, weather financial shocks by releasing equity, and pass on substantial assets to children — while a household in the North East in equivalent rented accommodation accumulates nothing and is far more exposed to job loss or illness. The same income produces very different financial security depending on whether regional property markets have delivered wealth accumulation. London's GVA per head remains 175% of the UK average, while the North East sits at around 73% — a productivity gap that has persisted for decades. Remote working after COVID-19 offered a partial corrective, but gains accrued mainly to existing homeowners, not low-income local residents.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Regional Wealth' },
          { id: 'sec-chart2', label: 'Wealth Gap' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="South East median household wealth"
              value="£510k"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="House price inflation driving wealth accumulation"
              sparklineData={seWealthK.slice(-8)}
              source="ONS · Wealth and Assets Survey Wave 7 2022"
              href="#sec-chart1"
            />
            <MetricCard
              label="North East median household wealth"
              value="£168k"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="Modest growth but widening gap with South East"
              sparklineData={neWealthK.slice(-8)}
              source="ONS · Wealth and Assets Survey Wave 7 2022"
              href="#sec-chart1"
            />
            <MetricCard
              label="SE vs NE wealth gap"
              value="3.0×"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Up from 2.2× in 2010 · property the key driver"
              sparklineData={wealthGapRatio.slice(-8)}
              source="ONS · Wealth and Assets Survey 2022"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Median household wealth by region, England, 2010–2023"
              subtitle="Median total household wealth (£thousands) in South East (red) and North East (blue). Includes property, financial, and pension wealth. Gap has widened as house prices diverged."
              series={regionalWealthSeries}
              annotations={wealthAnnotations}
              yLabel="Median wealth (£thousands)"
              source={{ name: 'ONS', dataset: 'Wealth and Assets Survey', url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/personalandhouseholdfinances/debt/bulletins/wealthingreatbritainwave', frequency: 'biennial', date: '2022' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="SE/NE wealth gap ratio and London GVA premium, 2010–2023"
              subtitle="South East to North East median wealth ratio (red) and London GVA per head as a share of UK average, divided by 10 for scale (amber). Both show persistent and widening geographic inequality."
              series={gapSeries}
              annotations={gapAnnotations}
              yLabel="Ratio / GVA index ÷10"
              source={{ name: 'ONS', dataset: 'Wealth and Assets Survey / Regional GVA', url: 'https://www.ons.gov.uk/economy/grossvalueaddedgva/bulletins/regionalgrossvalueaddedbalanceduk/1998to2022', frequency: 'annual', date: '2023' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Levelling Up Fund and devolution deals targeting regional gaps"
            value="£4.8bn"
            unit="Levelling Up Fund committed 2021–2025"
            description="The £4.8 billion Levelling Up Fund and £2.1 billion UK Shared Prosperity Fund represent the most significant regionally-targeted capital investment in decades. Early evaluations show genuine improvements in local infrastructure, transport, and regeneration in funded areas. The devolution deals agreed with the North East, Greater Manchester, West Midlands, and other areas give combined authorities greater powers over transport, skills, and economic development. If sustained over multiple parliaments, these interventions could begin to narrow the productivity gap — but the UK2070 Commission estimated that closing the North-South divide would require £18 billion annually over a decade, nearly four times current commitments."
            source="Source: DLUHC — Levelling Up Fund progress report 2024. UK2070 Commission — Make No Little Plans 2020."
          />
        </ScrollReveal>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.ons.gov.uk/peoplepopulationandcommunity/personalandhouseholdfinances/debt/bulletins/wealthingreatbritainwave" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ONS — Wealth and Assets Survey</a> — Biennial household survey covering property, financial, pension, and physical wealth by region. Retrieved 2024.</p>
            <p><a href="https://www.ons.gov.uk/economy/grossvalueaddedgva/bulletins/regionalgrossvalueaddedbalanceduk" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ONS — Regional Gross Value Added</a> — Annual regional GVA estimates. Retrieved 2024.</p>
            <p>Median wealth figures from ONS WAS waves 1–7 (2006–2022). Regional classifications use ONS Government Office Regions. Total wealth includes property wealth (net of mortgage), financial wealth, physical wealth, and private pension wealth. Intermediate years estimated by linear interpolation between survey waves.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
