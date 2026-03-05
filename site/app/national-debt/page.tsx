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
        label: 'Public debt as % of GDP',
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
          finding="UK public debt reached 98.8% of GDP in 2024 &mdash; the highest since the 1960s &mdash; with interest payments of &pound;112bn annually, consuming more than &pound;1 in every &pound;9 of tax revenue."
          colour="#6B7280"
          preposition="with"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>UK Public Sector Net Debt stood at approximately 98.8% of GDP at the end of 2023/24 &mdash; around &pound;2.7 trillion and the highest ratio since the early 1960s. The ratio rose from 36% before the 2008 financial crisis to over 80% by 2013 through recession and bank bailouts, remained elevated through the austerity decade, then surged again as the government borrowed an additional &pound;330 billion during the COVID-19 pandemic. Net interest payments reached &pound;112 billion in 2023/24 &mdash; up from &pound;42 billion in 2010 and &pound;52 billion in 2021 &mdash; driven by the RPI-linkage on approximately 25% of outstanding gilts, which spiked as inflation hit 11% in 2022, and by the high rates at which new gilts have been issued since late 2021. Debt interest now exceeds the entire defence budget and absorbs 11.6% of all tax revenue, with the OBR forecasting payments above &pound;100 billion a year through the late 2020s.</p>
            <p>The costs are distributed unequally. Austerity policies between 2010 and 2019 fell disproportionately on lower-income households through welfare cuts, local government reductions, and public sector pay freezes; the Resolution Foundation found the bottom income decile lost approximately 10% of disposable income through benefit changes alone. The North East, Wales, and parts of Northern Ireland, most dependent on public sector employment and services, bore the largest share of fiscal consolidation. Conversely, holders of government bonds &mdash; pension funds, insurance companies, and wealthier individuals &mdash; have benefited from the higher interest payments now being made, representing a substantial ongoing transfer from taxpayers to creditors.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-debt', label: 'Debt % GDP' },
          { id: 'sec-interest', label: 'Interest Payments' },
        ]} />

        <ScrollReveal>
          <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Debt as % of GDP"
              value="98.8%"
              direction="up"
              polarity="up-is-bad"
              changeText="2024 &middot; Highest since the 1960s &middot; Up from 42% in 2007"
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
              label="Debt interest as % of tax revenue"
              value="11.6%"
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
              title="UK public debt as % of GDP, 2000&ndash;2024"
              subtitle="Public Sector Net Debt excluding Bank of England, as a percentage of nominal GDP. Annotated at key fiscal events."
              series={debtSeries}
              annotations={debtAnnotations}
              yLabel="% of GDP"
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
