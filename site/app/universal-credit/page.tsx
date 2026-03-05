'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';

// ── Types ────────────────────────────────────────────────────────────────────

interface ClaimantsPoint {
  year: number;
  millions: number;
}

interface SanctionsPoint {
  year: number;
  pctSanctioned: number;
}

interface HouseholdTypePoint {
  type: string;
  pct: number;
}

interface ChildProtectionData {
  topic: string;
  national: {
    claimants: ClaimantsPoint[];
    sanctionsRate: SanctionsPoint[];
    byHouseholdType: HouseholdTypePoint[];
  };
  metadata: {
    sources: { name: string; dataset: string; url: string; frequency: string }[];
    methodology: string;
    knownIssues: string[];
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

// ── Component ────────────────────────────────────────────────────────────────

export default function UniversalCreditPage() {
  const [data, setData] = useState<ChildProtectionData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data/universal-credit/universal_credit.json')
      .then((res) => res.json())
      .then((json: ChildProtectionData) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load universal credit data:', err);
        setLoading(false);
      });
  }, []);

  if (loading || !data) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  // ── Series ────────────────────────────────────────────────────────────────

  const claimantsSeries: Series[] = [
    {
      id: 'claimants',
      label: 'UC claimants (millions)',
      colour: '#F4A261',
      data: data.national.claimants.map((p) => ({
        date: yearToDate(p.year),
        value: p.millions,
      })),
    },
  ];

  const sanctionsSeries: Series[] = [
    {
      id: 'sanctions',
      label: 'Claimants sanctioned (%)',
      colour: '#E63946',
      data: data.national.sanctionsRate.map((p) => ({
        date: yearToDate(p.year),
        value: p.pctSanctioned,
      })),
    },
  ];

  return (
    <main>
      <TopicNav topic="Universal Credit" />

      <TopicHeader
        topic="Universal Credit"
        question="Is Universal Credit actually working?"
        finding="Universal Credit now supports 6.4 million households, but its five-week wait, two-child limit, and benefit cap mean that for many of the most vulnerable claimants, the safety net has significant holes."
        colour="#F4A261"
        preposition="with"
      />

      {/* Metric Cards */}
      <section className="max-w-4xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <ScrollReveal>
            <MetricCard
              label="Universal Credit claimants"
              value="6.4M"
              unit="households"
              direction="up"
              polarity="up-is-bad"
              changeText="2023 &middot; Was 2.9M before COVID; full rollout by 2024"
              sparklineData={[0.5, 0.9, 1.6, 2.9, 5.6, 5.9, 6.1, 6.4]}
              href="#sec-charts"/>
          </ScrollReveal>

          <ScrollReveal>
            <MetricCard
              label="Households affected by benefit cap"
              value="126K"
              direction="up"
              polarity="up-is-bad"
              changeText="Average cap shortfall: &pound;58/week"
              sparklineData={[85, 95, 105, 115, 120, 122, 125, 126]}
              href="#sec-positive"/>
          </ScrollReveal>

          <ScrollReveal>
            <MetricCard
              label="Claimants using food banks within 1 month"
              value="34%"
              direction="up"
              polarity="up-is-bad"
              changeText="Trussell Trust data; five-week wait driver"
              sparklineData={[18, 20, 24, 28, 30, 31, 33, 34]}
              href="#sec-positive"/>
          </ScrollReveal>
        </div>
      </section>

      {/* Charts */}
      <section id="sec-context" className="max-w-2xl mt-4 mb-12">
        <div className="text-base text-wiah-black leading-[1.7] space-y-4">
          <p>Universal Credit now supports 6.4 million households, up from 2.9 million before COVID &mdash; a scale that makes its structural failings consequential at population level. The five-week wait before first payment arrives is the most acute: no comparable welfare system asks newly destitute claimants to wait five weeks, and the Trussell Trust estimates 34% of new claimants access a food bank within a month of claiming. The two-child limit (introduced April 2017) restricts the child element to the first two children; approximately 450,000 families and one million children are affected, with the Joseph Rowntree Foundation estimating 250,000 children pushed into poverty. The sanction rate reached 3.8% in 2023 &mdash; the highest since records began &mdash; disproportionately affecting claimants with mental health conditions, caring responsibilities, or unstable housing. The benefit cap, not uprated in line with inflation or benefit levels since 2016, now affects 126,000 households.</p>
          <p>The burden of the system&apos;s failings falls along predictable lines. Single parents &mdash; 85% of capped households are headed by women &mdash; and disabled claimants bear the greatest load. Disabled claimants represent 44% of the UC caseload yet face the most error-prone assessment process: the Work Capability Assessment generates incorrect decisions in approximately one-third of tribunal appeals. Claimants in the North East, where 25% of working-age adults receive UC, face a labour market with fewer vacancies per claimant than London or the South East, yet face identical conditionality requirements. Young people aged 18&ndash;24 receive &pound;71.84 per week standard allowance against &pound;90.67 for those 25 and over, despite facing the same basic costs of living.</p>
        </div>
      </section>

      {/* Positive Callout */}
      <section id="sec-positive" className="max-w-4xl mx-auto px-6 py-12">
        <PositiveCallout
          title="UC makes work pay more than legacy benefits"
          value="55%"
          unit="taper rate"
          description="The Universal Credit taper rate &mdash; the rate at which UC is withdrawn as earnings rise &mdash; was cut from 63% to 55% in October 2021. Combined with increases in the work allowance, this means claimants in work keep more of their UC as they earn more. DWP modelling suggests this incentivises an estimated 200,000 additional hours of work per week."
          source="Source: DWP &mdash; Universal Credit reform analysis, October 2021."
        />
      </section>

      {/* Sources */}
      <section id="sec-charts" className="max-w-5xl mx-auto px-6 py-16 space-y-20">
        <ScrollReveal>
          <LineChart
            title="Universal Credit claimants, 2016–2023"
            subtitle="Millions of households. Surged during pandemic; has continued growing as legacy benefit migration completes."
            series={claimantsSeries}
            yLabel="Claimants (millions)"
            source={{
              name: 'DWP',
              dataset: 'Universal Credit statistics',
              frequency: 'monthly',
              url: 'https://www.gov.uk/government/collections/universal-credit-statistics',
            }}
          />
        </ScrollReveal>

        <ScrollReveal>
          <LineChart
            title="UC claimants sanctioned, 2016–2023"
            subtitle="Percentage of UC claimants whose payments are reduced as a sanction for non-compliance."
            series={sanctionsSeries}
            yLabel="Sanctioned (%)"
            source={{
              name: 'DWP',
              dataset: 'Benefit sanctions statistics',
              frequency: 'annual',
              url: 'https://www.gov.uk/government/collections/benefit-sanctions-statistics',
            }}
          />
        </ScrollReveal>

        <ScrollReveal>
          <div className="w-full">
            <h3 className="font-bold text-wiah-black text-lg mb-2">Universal Credit claimants by household type</h3>
            <p className="text-sm text-wiah-mid mb-6">Distribution of 6.4 million claimants across household composition.</p>
            <div className="space-y-4">
              {data.national.byHouseholdType.map((item, idx) => {
                const widthPercent = (item.pct / 50) * 100;
                return (
                  <div key={idx}>
                    <div className="flex justify-between items-baseline mb-1">
                      <span className="text-sm font-semibold text-wiah-black">{item.type}</span>
                      <span className="text-sm font-mono font-bold text-wiah-black">{item.pct}%</span>
                    </div>
                    <div className="h-3 bg-wiah-light rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{ width: `${widthPercent}%`, backgroundColor: '#F4A261' }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="text-xs text-wiah-mid font-mono mt-6">
              Source: DWP &mdash; Universal Credit statistics. Updated annually.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* Context */}
      <section id="sec-sources" className="max-w-4xl mx-auto px-6 py-16 border-t border-wiah-border">
        <h3 className="font-bold text-wiah-black mb-6">Sources and methodology</h3>
        <div className="space-y-4 text-sm text-wiah-mid font-mono">
          {data.metadata.sources.map((src, idx) => (
            <div key={idx}>
              <p className="font-bold text-wiah-black">{src.name}</p>
              <p>
                <a
                  href={src.url}
                  className="text-wiah-blue hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {src.dataset}
                </a>
              </p>
              <p>Updated {src.frequency}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 space-y-4 text-sm text-wiah-mid">
          <div>
            <p className="font-bold text-wiah-black mb-2">Methodology</p>
            <p>{data.metadata.methodology}</p>
          </div>

          <div>
            <p className="font-bold text-wiah-black mb-2">Known issues</p>
            <ul className="list-disc list-inside space-y-1">
              {data.metadata.knownIssues.map((issue, idx) => (
                <li key={idx}>{issue}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <SectionNav sections={[
        { id: 'sec-context', label: 'Context' },

        { id: 'sec-charts', label: 'Charts' },
        { id: 'sec-positive', label: 'What&apos;s improving' },
        { id: 'sec-sources', label: 'Sources' },
      ]} />
    </main>
  );
}
