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

interface NationalDebtData {
  national: {
    timeSeries: Array<{ date: string; debtPctGdp: number; interestBn: number }>;
  };
  metadata: {
    sources: Array<{ name: string; dataset: string; url: string; frequency: string }>;
    methodology: string;
    knownIssues: string[];
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: string): Date {
  return new Date(parseInt(y), 5, 1);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function NationalDebtPage() {
  const [data, setData] = useState<NationalDebtData | null>(null);

  useEffect(() => {
    fetch('/data/national-debt/national_debt.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const debtSeries: Series[] = data
    ? [{
        id: 'debt-pct-gdp',
        label: 'Public debt as &percnt; of GDP',
        colour: '#6B7280',
        data: data.national.timeSeries.map(d => ({
          date: yearToDate(d.date),
          value: d.debtPctGdp,
        })),
      }]
    : [];

  const interestSeries: Series[] = data
    ? [{
        id: 'debt-interest',
        label: 'Annual debt interest (&pound;bn)',
        colour: '#E63946',
        data: data.national.timeSeries.map(d => ({
          date: yearToDate(d.date),
          value: d.interestBn,
        })),
      }]
    : [];

  const debtAnnotations: Annotation[] = [
    { date: new Date(2008, 5, 1), label: 'Global financial crisis' },
    { date: new Date(2020, 5, 1), label: 'COVID-19 emergency borrowing' },
  ];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="National Debt" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="National Debt"
          question="How Big Is Britain&apos;s Debt and Does It Matter?"
          finding="UK public debt reached 98.8&percnt; of GDP in 2024 &mdash; the highest since the 1960s &mdash; with interest payments of &pound;112bn annually, consuming more than &pound;1 in every &pound;9 of tax revenue."
          colour="#6B7280"
          preposition="with"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The United Kingdom&apos;s national debt &mdash; formally measured as Public Sector Net Debt excluding the Bank of England &mdash; stood at approximately 98.8&percnt; of GDP at the end of the 2023/24 financial year, the highest ratio since the early 1960s when the country was still paying off the costs of the Second World War. In cash terms, the outstanding debt is approximately &pound;2.7 trillion. The ONS publishes monthly public sector finance statistics that track borrowing, debt, and interest costs in detail, and the Office for Budget Responsibility (OBR) provides independent forecasts and historical analysis. The debt-to-GDP ratio rose from around 36&percnt; before the 2008 financial crisis to over 80&percnt; by 2013 as recession and bank bailouts required substantial emergency borrowing, then remained elevated through a decade of austerity before surging again during the COVID-19 pandemic, when the government borrowed an additional &pound;330 billion over two years to fund the furlough scheme, business loans, and emergency health spending. Unlike many European peers, the UK chose not to substantially reduce its debt-to-GDP ratio during the 2010s recovery; fiscal consolidation slowed growth in public spending without reducing the underlying debt stock.</p>
            <p>The annual cost of servicing the debt has become a significant fiscal constraint. Net interest payments on government debt reached &pound;112 billion in 2023/24 &mdash; up from around &pound;42 billion in 2010 and &pound;52 billion as recently as 2021. The surge was driven by two factors: the RPI-linkage on approximately 25&percnt; of the UK&apos;s outstanding gilts, which saw interest payments spike as inflation hit 11&percnt; in 2022, and the high base rate of interest at which new gilts have been issued since the Bank of England began tightening monetary policy from late 2021. Debt interest now exceeds the entire defence budget and is larger than the education budget. As a share of tax revenue, interest payments reached approximately 11.6&percnt; in 2023/24 &mdash; meaning that more than one pound in every nine collected in taxes went straight to bondholders rather than to public services. The OBR forecasts that interest payments will remain above &pound;100 billion per year through the late 2020s even on optimistic assumptions about inflation and growth.</p>
            <p>The question of whether the UK&apos;s debt level &ldquo;matters&rdquo; is genuinely contested among economists. Mainstream Keynesian analysis focuses on the debt-to-GDP ratio and its trajectory: a stable or falling ratio is generally considered manageable, while a rising ratio signals a compounding problem. By this measure, the UK faces a structural challenge because cyclically adjusted borrowing has rarely returned to pre-2008 levels. Modern Monetary Theory proponents argue that a sovereign government that issues its own currency and borrows in that currency cannot default involuntarily, and that debt levels are only constrained by inflation risk rather than by any absolute ceiling. The Liz Truss mini-budget of September 2022 &mdash; which proposed unfunded tax cuts of &pound;45 billion &mdash; provided a real-world test of market confidence: gilt yields spiked, the pound fell sharply, and the package was abandoned within weeks, demonstrating that market sentiment does impose real constraints on UK fiscal policy even if formal default is not possible.</p>
            <p>The distributional effects of high national debt are unevenly felt. Higher debt interest payments require either higher taxes, cuts to public services, or continued borrowing &mdash; each of which affects different groups differently. Austerity policies implemented between 2010 and 2019 fell disproportionately on lower-income households through cuts to welfare, local government funding, and public sector pay. The Resolution Foundation found that the bottom income decile lost approximately 10&percnt; of disposable income through benefit changes alone over this period. Regionally, areas with higher dependency on public sector employment and public services &mdash; the North East, Wales, and parts of Northern Ireland &mdash; bore a disproportionate share of the fiscal consolidation burden. Conversely, holders of government bonds &mdash; pension funds, insurance companies, and wealthy individuals &mdash; have benefited from the higher interest payments, which represent a substantial transfer from taxpayers to creditors.</p>
            <p>Measuring the national debt accurately requires careful attention to accounting conventions, and different measures can differ by hundreds of billions of pounds. The headline PSND ex-BoE figure excludes the Bank of England&apos;s Asset Purchase Facility &mdash; the quantitative easing programme that acquired approximately &pound;895 billion of gilts between 2009 and 2021. Including the BoE balance sheet produces a substantially different picture, particularly as the Bank has begun selling gilts back to the market at a loss (the losses from &ldquo;quantitative tightening&rdquo; represent a real fiscal cost). Public sector pension liabilities &mdash; estimated at &pound;2.2 trillion by the OBR &mdash; are not included in any of the standard debt measures, though they represent legally binding future obligations. Private Finance Initiative liabilities, student loans (which have complex treatment under new ONS methodology), and the contingent liabilities associated with government guarantees also complicate a simple reading of the headline debt figure. Comparisons with other countries are hampered by differences in national accounting standards, the treatment of social security systems, and the scope of what is included in the public sector boundary.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-debt', label: 'Debt &percnt; GDP' },
          { id: 'sec-interest', label: 'Interest Payments' },
        ]} />

        <ScrollReveal>
          <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Debt as &percnt; of GDP"
              value="98.8&percnt;"
              direction="up"
              polarity="up-is-bad"
              changeText="2024 &middot; Highest since the 1960s &middot; Up from 42&percnt; in 2007"
              sparklineData={[42, 52, 62, 70, 76, 84, 87, 99]}
              onExpand={() => {}}
            />
            <MetricCard
              label="Annual debt interest"
              value="&pound;112bn"
              direction="up"
              polarity="up-is-bad"
              changeText="2023/24 &middot; More than the defence budget &middot; Up from &pound;42bn in 2010"
              sparklineData={[42, 45, 48, 50, 52, 60, 88, 112]}
              onExpand={() => {}}
            />
            <MetricCard
              label="Debt interest as &percnt; of tax revenue"
              value="11.6&percnt;"
              direction="up"
              polarity="up-is-bad"
              changeText="2023/24 &middot; &pound;1 in every &pound;9 of tax goes to creditors"
              sparklineData={[6.5, 7.0, 7.5, 7.8, 7.5, 7.2, 10.5, 11.6]}
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-debt" className="mb-12">
            <LineChart
              title="UK public debt as &percnt; of GDP, 2000&ndash;2024"
              subtitle="Public Sector Net Debt excluding Bank of England, as a percentage of nominal GDP. Annotated at key fiscal events."
              series={debtSeries}
              annotations={debtAnnotations}
              yLabel="&percnt; of GDP"
              source={{
                name: 'ONS',
                dataset: 'Public sector finances, UK &mdash; PSF1',
                frequency: 'monthly',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-interest" className="mb-12">
            <LineChart
              title="Annual government debt interest payments, 2010&ndash;2024 (&pound;bn)"
              subtitle="Central government net interest payments, calendar year approximations. The 2022&ndash;24 surge reflects RPI-linked gilt costs during the inflation crisis."
              series={interestSeries}
              yLabel="&pound;bn"
              source={{
                name: 'ONS',
                dataset: 'Public sector finances &mdash; central government interest',
                frequency: 'monthly',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="What&apos;s reassuring"
            value="Long average maturity &amp; sterling debt"
            unit=""
            description="The UK&apos;s debt stock has an average maturity of approximately 15 years &mdash; among the longest of any developed economy &mdash; which limits the risk of a sudden refinancing crisis. Almost all UK government debt is denominated in sterling, meaning the government cannot be forced into default by exchange rate movements. The Debt Management Office has deliberately lengthened maturities over the past two decades to reduce rollover risk. While interest costs are high today, roughly two-thirds of the debt stock was issued at lower rates and will not need refinancing for years &mdash; providing time for fiscal consolidation to take effect."
            source="Source: ONS &mdash; Public Sector Finances 2024; OBR &mdash; Economic and Fiscal Outlook March 2024; HM Treasury &mdash; Debt Management Report 2024."
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
