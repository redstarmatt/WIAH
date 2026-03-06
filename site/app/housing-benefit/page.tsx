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

interface HousingBenefitData {
  national: {
    timeSeries: Array<{ date: string; avgShortfall: number; recipientsThousands: number }>;
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

export default function HousingBenefitPage() {
  const [data, setData] = useState<HousingBenefitData | null>(null);

  useEffect(() => {
    fetch('/data/housing-benefit/housing_benefit.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const shortfallSeries: Series[] = data
    ? [{
        id: 'lha-shortfall',
        label: 'Average LHA-to-rent shortfall (&pound;/month)',
        colour: '#6B7280',
        data: data.national.timeSeries.map(d => ({
          date: yearToDate(d.date),
          value: d.avgShortfall,
        })),
      }]
    : [];

  const recipientsSeries: Series[] = data
    ? [{
        id: 'recipients',
        label: 'Private sector housing benefit recipients (thousands)',
        colour: '#264653',
        data: data.national.timeSeries.map(d => ({
          date: yearToDate(d.date),
          value: d.recipientsThousands,
        })),
      }]
    : [];

  const shortfallAnnotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: 'LHA temporarily raised to 30th percentile (COVID)' },
    { date: new Date(2024, 5, 1), label: 'LHA permanently reset to 30th percentile' },
  ];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Housing Benefit" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Housing Benefit"
          question="Is Housing Benefit Keeping Pace With Rents?"
          finding="The Local Housing Allowance was frozen for four years until 2024, leaving recipients facing an average gap of &pound;190 per month between benefit and actual rent &mdash; pushing 186,000 households to the brink of eviction."
          colour="#6B7280"
          preposition="in"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The Local Housing Allowance (LHA) is the mechanism by which the government sets housing benefit entitlements for private sector renters. It was introduced in 2008 to replace a system in which housing benefit was set at actual rent levels, and instead links the benefit to the cheapest 30th percentile of rents in each &ldquo;Broad Rental Market Area&rdquo; (BRMA). The design intention was that the benefit would allow recipients to access the cheapest third of the private market, giving them choice about where to live while capping the government&apos;s exposure to high rents. However, the LHA has been frozen or limited far below rent inflation for substantial periods: from 2012 to 2020, LHA rates were frozen in cash terms for much of the period even as private rents rose substantially. LHA was temporarily raised back to the 30th percentile in April 2020 in response to the COVID-19 emergency, but was then frozen again in cash terms from April 2021. By 2023, private rents had risen far faster than the frozen LHA, and the average gap between the LHA rate payable and median market rent for a two-bedroom property reached approximately &pound;190 per month nationally, with extreme shortfalls in London where the gap often exceeded &pound;500 per month. Approximately 1.6 million households were receiving housing benefit or universal credit housing costs in the private sector by 2023.</p>
            <p>The consequences of the LHA shortfall cascade through the housing and welfare systems in predictable and well-documented ways. Landlords increasingly refuse to let to tenants in receipt of housing benefit when the LHA rate falls well below market rent, citing income shortfall and the administrative complexity of direct payments. Shelter and the National Residential Landlords Association both documented a significant reduction in the number of landlords actively advertising to housing benefit claimants between 2020 and 2023, shrinking the already limited affordable private rental market available to lower-income households. Tenants facing a &pound;190/month shortfall have three options: make up the difference from other income (typically stripping other household spending to subsistence levels), move to cheaper accommodation (which becomes harder as LHA-accessible properties disappear), or accrue rent arrears that eventually lead to eviction. The Ministry of Justice records show that landlord possession claims &mdash; the precursor to eviction &mdash; rose 97% between Q1 2021 and Q1 2024, with rent arrears cited as the primary reason in approximately 60% of cases. Crisis, the homelessness charity, estimated that approximately 186,000 households were at immediate risk of losing their tenancy due to LHA shortfall in 2023.</p>
            </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-shortfall', label: 'Shortfall' },
          { id: 'sec-recipients', label: 'Recipients' },
        ]} />

        <ScrollReveal>
          <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Average LHA-to-rent shortfall (pre-2024)"
              value="&pound;190/mo"
              direction="up"
              polarity="up-is-bad"
              changeText="2023 peak &middot; Inner London shortfall exceeded &pound;500/mo &middot; Reset in April 2024"
              sparklineData={[0, 10, 30, 60, 90, 130, 160, 190]}
              href="#sec-shortfall"
            />
            <MetricCard
              label="Housing benefit recipients (private sector)"
              value="1.6M"
              direction="up"
              polarity="up-is-bad"
              changeText="2023 &middot; Up from 1.2M in 2016 &middot; Landlords increasingly refusing claimants"
              sparklineData={[1200, 1250, 1300, 1380, 1450, 1500, 1550, 1600]}
              href="#sec-shortfall"
            />
            <MetricCard
              label="Households at eviction risk due to shortfall"
              value="186,000"
              direction="up"
              polarity="up-is-bad"
              changeText="2023 &middot; Crisis estimate &middot; Rent arrears rising across all tenure types"
              sparklineData={[20000, 40000, 65000, 90000, 120000, 150000, 170000, 186000]}
              href="#sec-shortfall"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-shortfall" className="mb-12">
            <LineChart
              title="Average LHA-to-rent shortfall, UK, 2016&ndash;2024 (&pound;/month)"
              subtitle="Gap between the Local Housing Allowance payable and median private rent for equivalent property sizes and areas. LHA was frozen while rents rose, creating a growing affordability crisis. Reset to 30th percentile in April 2024."
              series={shortfallSeries}
              annotations={shortfallAnnotations}
              yLabel="&pound; per month"
              source={{
                name: 'Shelter &amp; DWP',
                dataset: 'LHA shortfall analysis &mdash; VOA rates vs ONS PRMS',
                frequency: 'quarterly',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-recipients" className="mb-12">
            <LineChart
              title="Private sector housing benefit recipients, UK, 2016&ndash;2024 (thousands)"
              subtitle="Households receiving housing benefit or the housing cost element of Universal Credit in the private rented sector. Rising caseload alongside rising shortfall signals growing housing stress."
              series={recipientsSeries}
              yLabel="Thousands"
              source={{
                name: 'DWP',
                dataset: 'Housing benefit &amp; Universal Credit housing costs statistics',
                frequency: 'quarterly',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="What&apos;s changed"
            value="LHA reset to 30th percentile in April 2024"
            unit=""
            description="After four years of real-terms cuts, the Local Housing Allowance was permanently reset to the 30th percentile of local rents in April 2024 &mdash; the rate at which it was originally designed to be set. The DWP estimated this would benefit 1.6 million households by an average of &pound;800 per year (&pound;67 per month). In the highest-pressure areas like Inner London, gains were substantially larger. Housing charities broadly welcomed the reset while noting that it was a return to the status quo ante rather than an improvement. The test will be whether future governments maintain the 30th percentile linkage or allow the shortfall to accumulate again through future freezes."
            source="Source: DWP &mdash; LHA and housing benefit statistics 2024; Shelter &mdash; LHA shortfall report 2023; Crisis &mdash; Homelessness Monitor 2024; ONS &mdash; Private Rental Market Statistics 2024."
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
