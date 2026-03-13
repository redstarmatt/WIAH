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

// UK business investment as % of GDP, 2000–2025
const investmentShareData = [10.8, 11.0, 10.7, 10.5, 10.8, 11.1, 11.4, 11.6, 11.2, 10.0, 9.6, 9.8, 10.0, 10.2, 10.3, 10.4, 10.2, 9.8, 9.7, 9.5, 8.4, 9.0, 9.6, 10.0, 10.2, 10.2];

// Annual business investment growth (%), 2000–2025
const growthData = [5.2, 4.8, 3.1, 2.9, 4.2, 4.8, 5.1, 5.3, 3.2, -15.4, -2.1, 2.5, 4.8, 4.2, 3.9, 3.6, 2.1, 0.8, -0.3, 0.5, -12.5, 5.2, 7.1, 2.8, 1.2, 1.2];

// R&D spending as % of GDP, 2010–2025
const rdData = [1.56, 1.60, 1.62, 1.64, 1.65, 1.67, 1.68, 1.70, 1.71, 1.73, 1.74, 1.75, 1.76, 1.78, 1.80, 1.83];

const investmentSeries: Series[] = [
  {
    id: 'uk-investment',
    label: 'UK business investment (% GDP)',
    colour: '#6B7280',
    data: investmentShareData.map((v, i) => ({ date: new Date(2000 + i, 0, 1), value: v })),
  },
];

const rdSeries: Series[] = [
  {
    id: 'rd-spending',
    label: 'R&D spending (% GDP)',
    colour: '#2A9D8F',
    data: rdData.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
  },
  {
    id: 'oecd-avg',
    label: 'OECD average R&D (% GDP)',
    colour: '#6B7280',
    data: rdData.map((_, i) => ({ date: new Date(2010 + i, 0, 1), value: 2.7 })),
  },
];

const investmentAnnotations: Annotation[] = [
  { date: new Date(2009, 0, 1), label: '2009: Financial crisis' },
  { date: new Date(2016, 0, 1), label: '2016: Brexit referendum uncertainty' },
  { date: new Date(2020, 0, 1), label: '2020: Pandemic collapse' },
  { date: new Date(2023, 0, 1), label: '2023: Full expensing made permanent' },
];

const rdAnnotations: Annotation[] = [
  { date: new Date(2023, 0, 1), label: '2023: Full expensing boosts R&D incentives' },
];

const editorialRefs: Reference[] = [
  { num: 1, name: 'ONS', dataset: 'Business Investment — Quarterly National Accounts', url: 'https://www.ons.gov.uk/economy/grossdomesticproductgdp/datasets/businessinvestment', date: '2025' },
  { num: 2, name: 'ONS', dataset: 'Gross Domestic Expenditure on R&D', url: 'https://www.ons.gov.uk/economy/governmentpublicsectorandtaxes/researchanddevelopmentexpenditure', date: '2025' },
  { num: 3, name: 'OECD', dataset: 'Main Science and Technology Indicators', url: 'https://www.oecd.org/sti/msti.htm', date: 'March 2026' },
];

export default function BusinessInvestmentRatePage() {
  return (
    <>
      <TopicNav topic="Economy" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Economy"
          question="Are UK Businesses Investing Enough?"
          finding="UK business investment as a share of GDP remains the lowest in the G7 at 10.2% — roughly three percentage points below the group average. A decade of uncertainty from the Brexit referendum through the pandemic suppressed capital spending, and recovery has been tentative. R&D spending is rising but remains well below the OECD average."
          colour="#6B7280"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Business investment measures what the private sector spends on buildings, machinery, vehicles, software, and intellectual property. When firms invest, they create capacity for future growth. When they hold back, productivity stagnates and the economy runs on inertia. The UK has had a business investment problem for decades, but the post-2016 period made it materially worse. Between the 2016 referendum and the onset of COVID-19, business investment flatlined while comparable economies continued to grow theirs.<Cite nums={1} /> The Office for Budget Responsibility estimated the UK lost roughly 25% of potential business investment due to Brexit-related uncertainty alone. The pandemic then caused a historic 12.5% collapse in 2020.<Cite nums={1} /> Recovery has been real but uneven: spending on IT and intangibles bounced back quickly, while investment in structures and machinery remains subdued.</p>
            <p>R&D spending tells a slightly more encouraging story. The UK now spends 1.83% of GDP on research and development, up from 1.56% in 2010 and approaching but still below the OECD average of 2.7%.<Cite nums={[2, 3]} /> Private sector R&D has been the main driver, concentrated in pharmaceuticals, aerospace, and technology. The full expensing capital allowance introduced in 2023 offers permanent tax incentives for plant and machinery investment — the most generous in the G7 — and early data suggests it is beginning to change investment decisions. Whether this translates into broader productivity gains depends on commercialisation: turning ideas into products, which remains a persistent UK weakness.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Investment Share' },
          { id: 'sec-chart2', label: 'R&D Spending' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Business investment (% GDP)"
              value="10.2%"
              unit="2025"
              direction="flat"
              polarity="up-is-good"
              changeText="G7 lowest · peers avg 13.2% · up from 2020 trough"
              sparklineData={[10.4, 10.2, 9.8, 9.7, 9.5, 8.4, 9.0, 9.6, 10.0, 10.2]}
              source="ONS · Business Investment Q4 2025"
              href="#sec-chart1"
            />
            <MetricCard
              label="Annual investment growth"
              value="1.2%"
              unit="2025"
              direction="down"
              polarity="up-is-good"
              changeText="Well below pre-2016 trend of 4–5% per year"
              sparklineData={[3.6, 2.1, 0.8, -0.3, 0.5, -12.5, 5.2, 7.1, 2.8, 1.2]}
              source="ONS · Business Investment Q4 2025"
              href="#sec-chart1"
            />
            <MetricCard
              label="R&D spending (% GDP)"
              value="1.83%"
              unit="2025"
              direction="up"
              polarity="up-is-good"
              changeText="Up from 1.56% in 2010 · OECD avg: 2.7%"
              sparklineData={[1.56, 1.62, 1.65, 1.68, 1.71, 1.74, 1.76, 1.80, 1.83]}
              source="ONS · Gross Expenditure on R&D 2025"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="UK business investment as a share of GDP, 2000–2025"
              subtitle="Collapsed during the financial crisis, flatlined after the EU referendum, fell again in the pandemic. Now recovering but still the lowest in the G7 at around 10% of GDP."
              series={investmentSeries}
              annotations={investmentAnnotations}
              yLabel="% of GDP"
              source={{ name: 'ONS', dataset: 'Business Investment — Quarterly National Accounts', url: 'https://www.ons.gov.uk/economy/grossdomesticproductgdp/datasets/businessinvestment', frequency: 'quarterly', date: '2025' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="UK R&D spending vs OECD average, % of GDP, 2010–2025"
              subtitle="Steady upward trend in UK R&D intensity driven by the private sector. Still well below the OECD average of 2.7%, and significantly below Israel (6.0%) and South Korea (4.9%)."
              series={rdSeries}
              annotations={rdAnnotations}
              yLabel="% of GDP"
              source={{ name: 'ONS', dataset: 'Gross Domestic Expenditure on R&D', url: 'https://www.ons.gov.uk/economy/governmentpublicsectorandtaxes/researchanddevelopmentexpenditure', frequency: 'annual', date: '2025' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Full expensing: the most generous capital allowance in the G7"
            value="100%"
            unit="first-year allowance on plant & machinery"
            description="Since April 2023, UK businesses can deduct the full cost of qualifying plant and machinery investment from their taxable profits in the year of purchase — made permanent in Autumn Statement 2023. Early data from HMRC shows claims under the scheme rose 14% in the first full year. The OBR estimates full expensing will raise the level of business investment by around 4% in the long run, equivalent to roughly £3 billion per year in additional capital spending — the largest positive investment incentive in G7 tax codes."
            source="Source: HMRC — Capital Allowances Statistics 2025. OBR — Economic and Fiscal Outlook March 2025."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.ons.gov.uk/economy/grossdomesticproductgdp/datasets/businessinvestment" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ONS — Business Investment Quarterly National Accounts</a> — primary data for investment share and growth rate. Retrieved March 2026.</p>
            <p><a href="https://www.ons.gov.uk/economy/governmentpublicsectorandtaxes/researchanddevelopmentexpenditure" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ONS — Gross Domestic Expenditure on R&D</a> — R&D spending by sector and source of funds. Retrieved March 2026.</p>
            <p><a href="https://www.oecd.org/sti/msti.htm" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">OECD — Main Science and Technology Indicators</a> — international R&D comparisons. Retrieved March 2026.</p>
            <p className="mt-2">Business investment is measured in chained volume terms (2019 prices) and expressed as a share of nominal GDP. Covers private sector gross fixed capital formation excluding dwellings. OECD average is unweighted mean of member country R&D intensity.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
