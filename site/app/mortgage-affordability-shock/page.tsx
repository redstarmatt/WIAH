'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import PositiveCallout from '@/components/PositiveCallout';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

export default function MortgageAffordabilityShockPage() {
  // Chart 1: Average monthly mortgage repayment for new buyers 2015-2024 (£)
  const repaymentData = [640, 660, 680, 710, 740, 770, 790, 820, 1110, 1310];
  const repaymentSeries: Series[] = [
    {
      id: 'repayment',
      label: 'Average monthly mortgage repayment (£)',
      colour: '#F4A261',
      data: repaymentData.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
  ];
  const repaymentAnnotations: Annotation[] = [
    { date: new Date(2022, 0, 1), label: '2022: BoE begins rapid rate rises' },
    { date: new Date(2022, 8, 1), label: 'Sep 2022: Mini-budget mortgage shock' },
  ];

  // Chart 2: Mortgage approvals vs house prices 2018-2024
  const approvalsData = [39.8, 40.1, 41.5, 87.7, 72.3, 59.8, 55.2, 51.4];
  const hpiData = [100, 103, 107, 119, 126, 128, 124, 122];
  const mortgageSeries: Series[] = [
    {
      id: 'approvals',
      label: 'Monthly mortgage approvals (thousands)',
      colour: '#264653',
      data: approvalsData.map((v, i) => ({ date: new Date(2018 + i, 0, 1), value: v })),
    },
  ];
  const hpiSeries: Series[] = [
    {
      id: 'hpi',
      label: 'House price index (2018=100)',
      colour: '#F4A261',
      data: hpiData.map((v, i) => ({ date: new Date(2018 + i, 0, 1), value: v })),
    },
  ];
  const combinedSeries: Series[] = [...mortgageSeries, ...hpiSeries];

  return (
    <>
      <TopicNav topic="Mortgage Affordability" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Mortgage Affordability"
          question="What Has Happened to Mortgage Affordability?"
          finding="Monthly mortgage repayments for new buyers rose 60% between 2021 and 2023 — 1.6 million households face renewal at significantly higher rates by end of 2024."
          colour="#F4A261"
          preposition="with"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Key figures' },
          { id: 'sec-repayments', label: 'Repayment trend' },
          { id: 'sec-market', label: 'Approvals & prices' },
          { id: 'sec-context', label: 'Context' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <section id="sec-metrics" className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Average monthly mortgage payment"
              value="£1,310"
              direction="up"
              polarity="up-is-bad"
              changeText="for new buyers · up from £820 in 2021 (+60%)"
              sparklineData={[640, 660, 700, 740, 790, 820, 1110, 1310]}
              source="UK Finance / Moneyfacts — Mortgage Market Data, 2024"
            />
            <MetricCard
              label="Increase 2021-2023"
              value="+60%"
              direction="up"
              polarity="up-is-bad"
              changeText="sharpest two-year rise in modern mortgage history"
              sparklineData={[0, 0, 0, 0, 0, 0, 35, 60]}
              source="UK Finance — Mortgage Market Data, 2023"
            />
            <MetricCard
              label="Households remortgaging in 2024"
              value="1.6m"
              direction="up"
              polarity="up-is-bad"
              changeText="facing renewal at significantly higher rates"
              sparklineData={[1.8, 1.7, 1.6, 1.5, 1.4, 1.3, 1.5, 1.6]}
              source="UK Finance — Mortgage Lending Forecast, 2024"
            />
          </div>
        </section>

        <ScrollReveal>
          <section id="sec-repayments" className="mb-12">
            <LineChart
              title="Average monthly mortgage repayment for new buyers, 2015–2024 (£)"
              subtitle="Based on average two-year fixed rate mortgage at 75% LTV on average UK house price. The 2022 rate rise cycle produced the sharpest rise in monthly costs in the modern era."
              series={repaymentSeries}
              annotations={repaymentAnnotations}
              yLabel="Monthly repayment (£)"
              source={{
                name: 'UK Finance / Moneyfacts',
                dataset: 'Mortgage Market Data — average rates and repayments',
                frequency: 'monthly',
                url: 'https://www.ukfinance.org.uk/data-and-research/data/mortgages',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-market" className="mb-12">
            <LineChart
              title="Mortgage approvals vs house prices, 2018–2024"
              subtitle="Monthly mortgage approvals for house purchase (thousands, left axis) and house price index (2018=100, right axis). The 2020-21 boom preceded the affordability shock."
              series={combinedSeries}
              yLabel="Approvals (thousands) / HPI (2018=100)"
              source={{
                name: 'Bank of England / ONS',
                dataset: 'Mortgage Approvals / UK House Price Index',
                frequency: 'monthly',
                url: 'https://www.bankofengland.co.uk/statistics/mortgage-lenders-and-administrators',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="Borrower Protections Added"
            value="12"
            unit="months"
            description="Mortgage lenders introduced a range of forbearance measures in 2023, including interest-only switching and payment deferrals, following FCA guidance. The Mortgage Charter, agreed between the government and major lenders in June 2023, provided additional protections for borrowers in difficulty including a minimum 12-month period before repossession action."
            source="HM Treasury, Mortgage Charter 2023"
          />
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-context" className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The data on mortgage affordability</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>Between early 2021 and late 2023, the average monthly mortgage repayment for a new buyer rose by approximately 60% — from around £820 to £1,310. This was the direct consequence of the Bank of England&rsquo;s rapid interest rate cycle, which took the base rate from 0.1% to 5.25% in less than two years. For existing borrowers on variable rates, the shock was immediate. For those on fixed-rate deals — the majority of the UK mortgage market — the shock is staggered as fixed terms expire and borrowers remortgage at much higher rates.</p>
              <p>UK Finance estimated that around 1.6 million households were due to remortgage in 2024, facing rates 2-4 percentage points above their previous deal. For a mortgage of £200,000 over 25 years, a 3-percentage-point rate rise adds roughly £340 per month to repayments. The FCA&rsquo;s Financial Lives survey found that by mid-2023, 900,000 mortgage holders reported already being in financial difficulty. Repossessions have risen but remain well below 2008-09 crisis levels, partly due to lender forbearance and full employment.</p>
              <p>First-time buyers have been hardest hit in relative terms: mortgage affordability for this group — measured as monthly repayment as a share of take-home pay — reached its worst level since the early 1990s. In London and the South East, a 90% LTV mortgage on a median-priced first-time buyer property requires monthly repayments equivalent to over 60% of median net earnings. Many potential buyers have deferred purchase decisions or increased deposit targets, suppressing transaction volumes and sustaining rental demand.</p>
            </div>
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p><a href="https://www.ukfinance.org.uk/data-and-research/data/mortgages" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">UK Finance</a> — Mortgage Market Data. Quarterly and annual series. Used for lending volumes, remortgaging forecasts and market share data.</p>
            <p><a href="https://www.bankofengland.co.uk/statistics/mortgage-lenders-and-administrators" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Bank of England</a> — Mortgage Approvals for House Purchase. Monthly. Used for approval volume data.</p>
            <p><a href="https://www.ons.gov.uk/economy/inflationandpriceindices/bulletins/housepriceindex/previousReleases" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ONS</a> — UK House Price Index. Monthly. Monthly repayment figures calculated using average two-year fixed rate (Moneyfacts) applied to average house price at 75% LTV over 25 years. Annual figures are December snapshots.</p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
