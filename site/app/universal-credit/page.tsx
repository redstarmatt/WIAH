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
              onExpand={() => {}}
            />
          </ScrollReveal>

          <ScrollReveal>
            <MetricCard
              label="Households affected by benefit cap"
              value="126K"
              direction="up"
              polarity="up-is-bad"
              changeText="Average cap shortfall: &pound;58/week"
              sparklineData={[85, 95, 105, 115, 120, 122, 125, 126]}
              onExpand={() => {}}
            />
          </ScrollReveal>

          <ScrollReveal>
            <MetricCard
              label="Claimants using food banks within 1 month"
              value="34%"
              direction="up"
              polarity="up-is-bad"
              changeText="Trussell Trust data; five-week wait driver"
              sparklineData={[18, 20, 24, 28, 30, 31, 33, 34]}
              onExpand={() => {}}
            />
          </ScrollReveal>
        </div>
      </section>

      {/* Charts */}
      <section id="sec-context" className="max-w-2xl mt-4 mb-12">
        <div className="text-base text-wiah-black leading-[1.7] space-y-4">
          <p>Universal Credit replaced six legacy benefits &mdash; Income Support, Jobseeker&apos;s Allowance, Employment and Support Allowance, Working Tax Credit, Child Tax Credit, and Housing Benefit &mdash; with a single monthly payment. The design intention was simplicity and work incentives. The structural problem is the five-week wait before the first payment arrives. No comparable welfare system among developed nations asks newly destitute claimants to wait five weeks before receiving support. Claimants can apply for an advance loan, but it is repaid from future UC payments, creating debt at the point of greatest vulnerability. The Trussell Trust estimates that 34% of new UC claimants access a food bank within a month of making their first claim.</p>
          <p>The two-child limit, introduced in April 2017, restricts the child element of Universal Credit to the first two children in a family. Children born after that date into families with two or more existing children receive no UC child element. Approximately 450,000 families and around one million children are affected. The Joseph Rowntree Foundation estimates the policy pushes 250,000 children into poverty. Despite sustained cross-party pressure from MPs, charities, and the Church of England, both the Conservative government that introduced the policy and the Labour government elected in 2024 have declined to repeal it. The Treasury saving &mdash; roughly &pound;1.3bn a year &mdash; is the stated reason.</p>
          <p>The rate of UC claimants being sanctioned &mdash; having payments cut for missing appointments or failing job-search requirements &mdash; reached 3.8% in 2023, the highest level since records began. Academic research consistently finds that sanctions fall disproportionately on the most vulnerable claimants: those with mental health conditions, caring responsibilities, or unstable housing. Sanctions are strongly associated with food bank referrals and destitution. Separately, the benefit cap limits total household benefit income regardless of need; 126,000 households are currently capped, concentrated among single parents in London and the South East where housing costs are highest. The cap has not been uprated in line with either inflation or benefit levels, meaning its real-terms bite has deepened since 2016.</p>
          <p>The burden of Universal Credit&apos;s structural failings falls along predictable lines. Single parents &mdash; overwhelmingly women &mdash; make up 28&percnt; of UC claimants but account for a disproportionate share of those affected by the two-child limit and the benefit cap. DWP data shows that 85&percnt; of capped households are headed by women. Disabled claimants and those with long-term health conditions represent roughly 44&percnt; of the UC caseload yet face the most complex and error-prone assessment process: the Work Capability Assessment, which independent reviews have found generates incorrect decisions in approximately one-third of appeals heard by tribunal. Claimants in the North East, where 25&percnt; of working-age adults receive UC, face a labour market with fewer vacancies per claimant than London or the South East, yet are subject to identical conditionality requirements. The local housing allowance, frozen between 2020 and 2024, left UC claimants in the private rented sector covering an average shortfall of &pound;100 per month from their remaining benefit income. Young people aged 18&ndash;24 receive a lower standard allowance &mdash; &pound;71.84 per week compared with &pound;90.67 for those 25 and over &mdash; a distinction without clear policy justification, given that the basic costs of food, energy, and transport do not differ by age.</p>
          <p>The statistics cited on Universal Credit are drawn primarily from DWP administrative data, which captures claimant numbers, sanction rates, and payment amounts with precision but reveals almost nothing about lived experience. The five-week wait is measured from claim submission to first payment, but DWP does not systematically record how long claimants actually wait when verification delays, evidence requests, or system errors extend the process &mdash; Citizens Advice evidence suggests the effective wait frequently exceeds seven weeks. Sanction data counts adverse decisions but does not track outcomes: how many sanctioned claimants borrowed money, missed rent, or went without food is not captured in any official dataset. The 34&percnt; food bank figure comes from Trussell Trust referral data linked to UC claim timing, a methodology that establishes correlation but cannot fully isolate causation from other deprivation factors. Child poverty estimates from the Joseph Rowntree Foundation rely on modelled counterfactuals &mdash; what household income would have been without the two-child limit &mdash; which are sensitive to assumptions about employment and other income. An estimated 700,000&ndash;800,000 eligible households do not claim UC at all, a non-take-up rate of roughly 12&percnt; that means the hardship associated with the system is systematically undercounted.</p>
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
