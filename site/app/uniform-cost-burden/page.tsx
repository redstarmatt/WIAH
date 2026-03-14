'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'Child Poverty Action Group', dataset: 'Cost of a Child 2024', url: 'https://cpag.org.uk/policy-and-campaigns/report/cost-child', date: '2024' },
  { num: 2, name: 'Citizens Advice', dataset: 'Back to School Costs Survey 2024', url: 'https://www.citizensadvice.org.uk', date: '2024', note: '30% of parents going into debt for uniform' },
  { num: 3, name: 'UK Government', dataset: 'School Uniform (Minimum Requirements) Regulations 2022', url: 'https://www.legislation.gov.uk/uksi/2022/1098', date: '2022' },
];

// ── Types ────────────────────────────────────────────────────────────────────

interface PrimaryCostPoint {
  year: number;
  averageCostPounds: number;
}

interface SecondaryCostPoint {
  year: number;
  averageCostPounds: number;
}

interface ParentDebtPoint {
  year: number;
  percentInDebt: number;
}

interface UniformData {
  national: {
    primaryCost: {
      timeSeries: PrimaryCostPoint[];
      latestYear: number;
      latestCostPounds: number;
      note: string;
    };
    secondaryCost: {
      timeSeries: SecondaryCostPoint[];
      latestYear: number;
      latestCostPounds: number;
      note: string;
    };
    parentDebt: {
      timeSeries: ParentDebtPoint[];
      latestYear: number;
      latestPercent: number;
      note: string;
    };
  };
  metadata: {
    sources: { name: string; dataset: string; url: string; frequency: string }[];
    methodology: string;
    knownIssues: string[];
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 8, 1);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function UniformCostBurdenPage() {
  const [data, setData] = useState<UniformData | null>(null);

  useEffect(() => {
    fetch('/data/uniform-cost-burden/school_uniform.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const primarySecondarySeries: Series[] = data
    ? [
        {
          id: 'primary',
          label: 'Primary school uniform cost (\u00a3)',
          colour: '#264653',
          data: data.national.primaryCost.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.averageCostPounds,
          })),
        },
        {
          id: 'secondary',
          label: 'Secondary school uniform cost (\u00a3)',
          colour: '#E63946',
          data: data.national.secondaryCost.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.averageCostPounds,
          })),
        },
      ]
    : [];

  const debtSeries: Series[] = data
    ? [{
        id: 'debt',
        label: 'Parents going into debt for uniform (%)',
        colour: '#F4A261',
        data: data.national.parentDebt.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.percentInDebt,
        })),
      }]
    : [];

  const costAnnotations: Annotation[] = [
    { date: new Date(2022, 8, 1), label: '2022: Uniform Regulations introduced' },
    { date: new Date(2022, 8, 1), label: '2022: Food/energy inflation peak' },
  ];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="School Uniform Costs" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="School Uniform Costs"
          question="Can Families Afford the School Uniform?"
          finding={<>The average cost of a primary school uniform is £337 per child per year, rising to £442 at secondary.<Cite nums={1} /> Three in ten parents go into debt to buy school uniforms.<Cite nums={2} /> The Uniform Cost Regulations 2022 have had limited impact.<Cite nums={3} /></>}
          colour="#2A9D8F"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              School uniform costs have risen 17% at primary and 19% at secondary since 2019 — significantly faster than general inflation over the same period.<Cite nums={1} /> The drivers are well understood: compulsory branded items (logoed polo shirts, blazers, PE kit) that can only be purchased from designated suppliers, often at high margins; specialist equipment requirements that go beyond the DfE's minimum definition; and the expectation of separate items for different weather, PE, and art activities. A secondary school pupil in full uniform — blazer, tie, PE kit, specialist shoes, bag, and all required extras — can cost parents over £600 before any optional items.
            </p>
            <p>
              The School Uniform (Minimum Requirements) Regulations 2022 introduced requirements for schools to limit branded items to three (down from an unlimited number), ensure at least one affordable high-street alternative for each required item, and publish their uniform policies online. The impact has been modest: the regulations apply only to maintained schools and academies with older uniform policies, enforcement is light, and many schools have found ways to maintain branded requirements within the letter of the rules. Three in ten parents report going into debt — using credit cards, overdrafts, or buy-now-pay-later services — to cover uniform costs at the start of the school year.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-costs', label: 'Uniform Costs' },
          { id: 'sec-debt', label: 'Parent Debt' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Average primary school uniform cost"
              value="£337"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="+17% since 2019 · Logos and branded items biggest driver"
              sparklineData={[289, 298, 310, 325, 337, 337]}
              href="#sec-costs"
            />
            <MetricCard
              label="Average secondary uniform cost"
              value="£442"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="+19% since 2019 · Specialist PE kit often costs extra · Blazers expensive"
              sparklineData={[372, 380, 398, 418, 435, 442]}
              href="#sec-costs"
            />
            <MetricCard
              label="Parents going into debt for uniform"
              value="30%"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Up from 22% in 2021 · Credit, overdraft, BNPL · Second-hand markets growing"
              sparklineData={[22, 25, 28, 30]}
              href="#sec-costs"
            />
          </div>
        

        {/* Charts */}
        <ScrollReveal>
          <section id="sec-costs" className="mb-12">
            <LineChart
              title="School uniform costs, primary and secondary, England, 2019–2024"
              subtitle="Average annual cost to kit out one child in full school uniform including PE kit, bag and all required items. Both primary and secondary costs have risen well above general inflation."
              series={primarySecondarySeries}
              annotations={costAnnotations}
              yLabel="\u00a3 per year"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-debt" className="mb-12">
            <LineChart
              title="Parents going into debt to buy school uniform, 2021–2024"
              subtitle="Percentage of parents using credit cards, overdrafts, or buy-now-pay-later services to cover school uniform costs. Worsened through cost-of-living crisis despite 2022 regulations intended to limit costs."
              series={debtSeries}
              annotations={[{ date: new Date(2022, 8, 1), label: '2022: Regulations introduced' }]}
              yLabel="Percent (%)"
            />
          </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="What's improving"
            value="Uniform exchange"
            unit="schemes in every council area"
            description="The School Uniform (Minimum Requirements) Regulations 2022 require schools to limit branded items to three per uniform and ensure affordable alternatives exist at high-street retailers for every required item. Many councils now run uniform exchange schemes allowing families to donate and collect good-condition second-hand uniform at no cost. The Labour government is considering extending the scope of uniform regulations to cover pricing directly. Scotland already restricts the number of branded items more strictly and provides uniform grants to low-income families as a right rather than a discretionary payment."
            source="Source: Child Poverty Action Group Cost of a Child 2024 · Citizens Advice Back to School Costs Survey 2024."
          />
        </ScrollReveal>

        {/* Sources */}
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            {data?.metadata.sources.map((src, i) => (
              <div key={i}>
                <a href={src.url} target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">
                  {src.name} — {src.dataset}
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
              <RelatedTopics />
      </main>
    </>
  );
}
