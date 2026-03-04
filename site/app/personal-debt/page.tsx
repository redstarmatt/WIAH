'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';

// ── Types ────────────────────────────────────────────────────────────────────

interface PersonalDebtData {
  national: {
    householdDebt: {
      timeSeries: Array<{ year: number; totalBillionGBP: number }>;
      latestYear: number;
      latestBillionGBP: number;
      pctOfIncome: number;
    };
    personalInsolvencies: {
      timeSeries: Array<{ year: number; insolvenciesThousands: number }>;
      latestYear: number;
      latestThousands: number;
    };
    byDebtType: Array<{ debtType: string; billionGBP: number }>;
  };
  metadata: {
    sources: Array<{ name: string; dataset: string; url: string; frequency: string }>;
    methodology: string;
    knownIssues: string[];
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function PersonalDebtPage() {
  const [data, setData] = useState<PersonalDebtData | null>(null);

  useEffect(() => {
    fetch('/data/personal-debt/personal_debt.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const debtSeries: Series[] = data
    ? [{
        id: 'debt',
        label: 'Total household debt (&pound;bn)',
        colour: '#E63946',
        data: data.national.householdDebt.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.totalBillionGBP,
        })),
      }]
    : [];

  const debtAnnotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: '2020: COVID-19' },
  ];

  const insolvencySeries: Series[] = data
    ? [{
        id: 'insolvency',
        label: 'Personal insolvencies (thousands)',
        colour: '#E63946',
        data: data.national.personalInsolvencies.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.insolvenciesThousands,
        })),
      }]
    : [];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Personal Debt" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Personal Debt"
          question="How Many Households Are Drowning in Debt?"
          finding="UK households owe &pound;1.9 trillion in total debt &mdash; 130% of household income. 8.9 million people are in &apos;problem debt&apos; (StepChange). Personal insolvencies rose to 110,000 in 2023 &mdash; the highest since 2010. Energy debt reached &pound;3.1 billion in 2023 as the cost-of-living crisis pushed millions beyond their means."
          colour="#E63946"
          preposition="in"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>UK households owe &pound;1.9 trillion in total &mdash; 130% of annual household income and the highest debt-to-income ratio in the G7. Mortgage debt accounts for &pound;1.54 trillion of this; consumer credit &mdash; credit cards, personal loans, and buy-now-pay-later arrangements &mdash; adds a further &pound;220 billion. The burden is not evenly shared: 8.9 million people, one in seven adults, are in &ldquo;problem debt&rdquo; according to StepChange, meaning they are consistently struggling to meet bills and credit commitments. Personal insolvencies in England and Wales reached 110,000 in 2023, the highest since 2010, with Debt Relief Orders &mdash; the insolvency route for people with few assets &mdash; rising 30% as energy costs pushed lower-income households beyond their limits.</p>
            <p>The cost-of-living crisis of 2021&ndash;23 converted manageable indebtedness into acute distress for millions of households. Energy bills roughly doubling between 2021 and 2023 created &pound;3.1 billion in energy arrears by the end of that period. Council tax arrears rose to &pound;6 billion as households prioritised food and heating over statutory obligations. The buy-now-pay-later sector &mdash; valued at &pound;7 billion and operating largely outside Financial Conduct Authority regulation until its 2022 review &mdash; extended credit to 10 million users, many without a conventional credit history. Simultaneously, the Bank of England raised the base rate from 0.1% in December 2021 to 5.25% by August 2023, the fastest tightening cycle in forty years, adding approximately &pound;270 per month to a typical variable-rate mortgage and forcing millions of fixed-rate borrowers into painful refinancing.</p>
            <p>Debt advice services are overwhelmed by demand. Citizens Advice handled 3.1 million debt issues in 2022/23, a 24% increase on 2019 volumes. The Breathing Space scheme, launched in May 2021, grants a 60-day moratorium on creditor enforcement action and court proceedings, giving indebted people time to seek advice and arrange a sustainable solution; 100,000 people entered the scheme in 2023. The Financial Conduct Authority&apos;s Consumer Duty, effective from July 2023, requires lenders to identify and proactively support customers in financial difficulty rather than waiting for default. The No-Interest Loan Scheme offers 0% credit up to &pound;2,000 for people excluded from mainstream borrowing. Regulation of buy-now-pay-later lenders under the Consumer Credit Act is expected through secondary legislation, though the timeline has slipped repeatedly since the FCA first flagged the gap in 2021.</p>
            <p>Debt distress concentrates in specific demographics and geographies. Single parents carry the highest rates of problem debt &mdash; 29&percnt; report serious financial difficulty, three times the rate for couple households. Renters are four times more likely to be in arrears than homeowners, and the overlap between housing insecurity and debt distress is near-total in the lowest income decile. Regionally, the North East, West Midlands, and coastal towns in the South West have the highest per-capita insolvency rates, reflecting lower wages, thinner savings buffers, and weaker local economies. Age matters too: 25&ndash;34-year-olds hold the fastest-growing share of consumer credit, driven by buy-now-pay-later usage and credit card borrowing for essentials rather than discretionary spending. The interaction between debt types compounds the problem &mdash; a household in energy arrears is five times more likely to also be behind on council tax and credit commitments, creating a spiral that single-issue interventions rarely break.</p>
            <p>Debt statistics are drawn from multiple sources that do not align neatly. The Bank of England&apos;s Money and Credit data captures lending by regulated financial institutions but excludes informal borrowing, family loans, and most buy-now-pay-later balances, meaning total indebtedness is likely understated. StepChange&apos;s &ldquo;problem debt&rdquo; figure of 8.9 million is derived from survey data with self-reported thresholds that differ from the FCA&apos;s definition of financial difficulty. Insolvency statistics count formal proceedings but miss the much larger population in chronic but sub-threshold distress &mdash; people who never default but never recover either. Energy debt figures come from supplier returns to Ofgem, but reporting standards vary and some suppliers have historically under-reported arrears. The buy-now-pay-later sector remains particularly opaque: until FCA regulation takes effect, there is no standardised reporting of default rates, average balances, or the demographic profile of users in difficulty. Council tax arrears data is collected from local authorities with inconsistent definitions of &ldquo;in arrears.&rdquo;</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-debt', label: 'Household Debt' },
          { id: 'sec-insolvency', label: 'Insolvencies' },
          { id: 'sec-types', label: 'By Debt Type' },
        ]} />

        <ScrollReveal>
          <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Total UK household debt"
              value="&pound;1.9tn"
              direction="up"
              polarity="up-is-bad"
              changeText="2023 &middot; 130% of household income &middot; Mortgage debt &pound;1.54tn &middot; Consumer credit &pound;220bn"
              sparklineData={[1540, 1580, 1620, 1680, 1750, 1790, 1800, 1850, 1900]}
              onExpand={() => {}}
            />
            <MetricCard
              label="People in problem debt (StepChange)"
              value="8.9M"
              direction="up"
              polarity="up-is-bad"
              changeText="2023 &middot; Up from 6.3M in 2019 &middot; Energy &amp; food costs driving crisis &middot; Single parents most affected"
              sparklineData={[6.0, 6.1, 6.2, 6.3, 5.8, 6.5, 7.0, 8.0, 8.9]}
              onExpand={() => {}}
            />
            <MetricCard
              label="Personal insolvencies (England &amp; Wales)"
              value="110K"
              direction="up"
              polarity="up-is-bad"
              changeText="2023 &middot; Highest since 2010 &middot; IVAs most common &middot; Debt Relief Orders rise 30% as energy bills bite"
              sparklineData={[107, 101, 100, 95, 91, 99, 115, 122, 80, 109, 105, 110]}
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-debt" className="mb-12">
            <LineChart
              title="UK household debt, &pound; billion, 2010&ndash;2023"
              subtitle="Total secured and unsecured household debt including mortgages, consumer credit, and other liabilities."
              series={debtSeries}
              annotations={debtAnnotations}
              yLabel="&pound; billion"
              source={{
                name: 'Bank of England',
                dataset: 'Money and Credit Statistics',
                frequency: 'monthly',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-insolvency" className="mb-12">
            <LineChart
              title="Personal insolvencies, England &amp; Wales, 2012&ndash;2023"
              subtitle="Annual individual insolvencies including bankruptcies, Individual Voluntary Arrangements (IVAs), and Debt Relief Orders (DROs)."
              series={insolvencySeries}
              yLabel="Insolvencies (thousands)"
              source={{
                name: 'Insolvency Service',
                dataset: 'Insolvency Statistics England and Wales',
                frequency: 'quarterly',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-types" className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-2">Household debt by type, UK, 2023</h2>
            <p className="text-sm text-wiah-mid font-mono mb-6">&pound; billion.</p>
            {data && (
              <div className="space-y-3">
                {data.national.byDebtType.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-40 text-sm text-wiah-black flex-shrink-0">{item.debtType}</div>
                    <div className="flex-1 bg-wiah-border rounded h-5 overflow-hidden">
                      <div
                        className="h-full rounded"
                        style={{ width: `${(item.billionGBP / 1540) * 100}%`, backgroundColor: '#E63946' }}
                      />
                    </div>
                    <div className="w-16 text-right text-sm font-mono text-wiah-black">&pound;{item.billionGBP}bn</div>
                  </div>
                ))}
              </div>
            )}
            <p className="font-mono text-xs text-wiah-mid mt-4">Source: Bank of England &mdash; Money and Credit Statistics 2023</p>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="What&apos;s improving"
            value="&pound;40M"
            unit="invested in free debt advice through MoneyHelper and StepChange, as Breathing Space gives debtors 60 days of protection"
            description="The Breathing Space scheme (May 2021) provides a 60-day moratorium on creditor action, giving indebted people time to seek help and arrange a debt solution. In 2023, over 100,000 people entered Breathing Space. MoneyHelper (formerly Money Advice Service) provides free debt guidance online and by phone. The No-Interest Loan Scheme, piloted in 2022, offers loans of up to &pound;2,000 at 0% interest to people in financial difficulty &mdash; an alternative to high-cost credit. The Financial Conduct Authority&apos;s Consumer Duty (2023) requires lenders to treat customers in financial difficulty fairly and proactively offer support."
            source="Source: Bank of England &mdash; Money and Credit Statistics 2023; Insolvency Service &mdash; Insolvency Statistics 2023."
          />
        </ScrollReveal>

        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            {data?.metadata.sources.map((src, i) => (
              <div key={i}>
                <a href={src.url} target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">
                  {src.name} &mdash; {src.dataset}
                </a>
                <div className="text-xs text-wiah-mid">Updated {src.frequency}</div>
              </div>
            ))}
          </div>
          <div className="text-sm text-wiah-mid mt-6 space-y-2">
            <h3 className="font-bold">Methodology</h3>
            <p>{data?.metadata.methodology}</p>
          </div>
          <div className="text-sm text-wiah-mid mt-6 space-y-2">
            <h3 className="font-bold">Known issues</h3>
            <ul className="list-disc list-inside space-y-1">
              {data?.metadata.knownIssues.map((issue, i) => (
                <li key={i}>{issue}</li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
