'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'ONS', dataset: 'Census 2021 — Unpaid Care, England and Wales', url: 'https://www.ons.gov.uk/releases/unpaidcareinengland2021', date: '2023' },
  { num: 2, name: 'Carers UK', dataset: 'Valuing Carers 2024', url: 'https://www.carersuk.org/policy-and-research/valuing-carers/', date: '2024' },
  { num: 3, name: 'Carers UK', dataset: 'State of Caring Survey 2023', url: 'https://www.carersuk.org/policy-and-research/state-of-caring/', date: '2023' },
  { num: 4, name: 'DWP', dataset: "Carer's Allowance Rates 2023/24", url: 'https://www.gov.uk/carers-allowance', date: '2024' },
];

// ── Types ────────────────────────────────────────────────────────────────────

interface CarerPopulationTimeSeries {
  year: number;
  carersMillions: number;
}

interface CarersAllowanceTimeSeries {
  year: number;
  weeklyGBP: number;
}

interface ImpactOnCarer {
  impact: string;
  pct: number;
}

interface CarersData {
  national: {
    carerPopulation: {
      timeSeries: CarerPopulationTimeSeries[];
      latestYear: number;
      latestMillions: number;
      economicValueBillionGBP: number;
      youngCarers: number;
    };
    carersAllowance: {
      timeSeries: CarersAllowanceTimeSeries[];
      latestYear: number;
      latestWeeklyGBP: number;
      recipientsThousands: number;
    };
    impactOnCarers: ImpactOnCarer[];
  };
  metadata: {
    sources: { name: string; dataset: string; url: string; frequency: string }[];
    methodology: string;
    knownIssues: string[];
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 0, 1);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function UnpaidCarersPage() {
  const [data, setData] = useState<CarersData | null>(null);

  useEffect(() => {
    fetch('/data/unpaid-carers/unpaid_carers.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ────────────────────────────────────────────────────────

  const carerPopulationSeries: Series[] = data
    ? [{
        id: 'carer-population',
        label: 'Unpaid carers',
        colour: '#2A9D8F',
        data: data.national.carerPopulation.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.carersMillions,
        })),
      }]
    : [];

  const carersAllowanceSeries: Series[] = data
    ? [{
        id: 'carers-allowance',
        label: 'Weekly rate',
        colour: '#F4A261',
        data: data.national.carersAllowance.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.weeklyGBP,
        })),
      }]
    : [];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Unpaid Carers" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Unpaid Carers"
          question="Who Is Caring for Britain's 10 Million Unpaid Carers?"
          finding="10.6 million people in the UK provide unpaid care — looking after a disabled, elderly, or ill family member or friend. Their contribution is valued at £162 billion per year — more than NHS spending. 600,000 carers are children under 18. But 72% of carers say their mental health has suffered. The Carer's Allowance of £81.90 per week is among the lowest benefits in the welfare system."
          colour="#2A9D8F"
        />

        <section className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              The 2021 Census recorded 10.6 million unpaid carers in England and Wales — 18% of the population — though academic estimates suggest the true figure is 40–50% higher, since many do not self-identify.<Cite nums={1} /> Their collective contribution is valued at £162 billion a year, comparable to total NHS expenditure.<Cite nums={2} /> Some 58% are women, with peak caring ages between 50 and 64; one in four people will care for a family member at some point. Roughly 1.3 million provide 50 or more hours of care per week — a full-time job without pay, legal protection, or guaranteed respite. Among them are 600,000 young carers under 18, representing 4.5% of all children, with significant under-identification meaning the real number is almost certainly higher.<Cite nums={1} />
            </p>
            <p>
              The personal cost is severe. Carers UK's State of Caring survey, drawing on 13,000 respondents, consistently finds that 72% of carers report deteriorating mental health and 61% worsening physical health.<Cite nums={3} /> Some 44% have reduced their paid working hours; 35% have given up work entirely, creating a &ldquo;caring penalty&rdquo; in lifetime earnings and pension entitlement.<Cite nums={3} /> The main financial support — Carer's Allowance at £81.90 per week in 2023/24 — is paid only to those caring 35 or more hours and earning no more than £151 per week.<Cite nums={4} /> That earnings limit acts as a trap: carers cannot work enough to earn meaningfully without losing the allowance entirely. Young carers face measurable educational disadvantage, attending school less regularly and achieving lower grades than peers from equivalent socioeconomic backgrounds.
            </p>
            </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-population', label: 'Carer Population' },
          { id: 'sec-allowance', label: "Carer's Allowance" },
          { id: 'sec-impact', label: 'Impact on Carers' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Unpaid carers (England &amp; Wales)"
            value="10.6M"
            unit=""
            direction="up"
            polarity="up-is-good"
            changeText="Census 2021 · 18% of population · Economic value: £162bn/year · More than total NHS spending"
            sparklineData={[6100, 6300, 6500, 6800, 7200, 7500, 8000, 8500, 9000, 9500, 10600]}
            source="ONS · Census 2021"
            baseline="1 in 5 people in the UK provides unpaid care"
            href="#sec-population"/>
          <MetricCard
            label="Carer's Allowance (weekly rate)"
            value="£81.90"
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText="2023/24 · Among lowest benefits in system · Paid only if caring 35+ hrs/week · 760K recipients · Earnings limit £151/week"
            sparklineData={[53, 55, 58, 61, 64, 67, 69, 72, 76, 81.90]}
            source="DWP · Benefit Rates 2023/24"
            baseline="Carers can earn only £151/week before Allowance is reduced"
            href="#sec-allowance"/>
          <MetricCard
            label="Young carers (under 18)"
            value="600K"
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText="Census 2021 · 4.5% of all children · Many unidentified · Educational disadvantage · Inadequate support in schools"
            sparklineData={[300, 350, 400, 450, 500, 550, 600]}
            source="ONS · Census 2021"
            baseline="Young carers are significantly less likely to achieve good GCSEs"
            href="#sec-impact"/>
        </div>
        

        {/* Chart 1: Carer population */}
        <div id="sec-population">
        {carerPopulationSeries.length > 0 ? (
          <LineChart
            title="Unpaid carers in England &amp; Wales, 2011–2021"
            subtitle="Self-identified unpaid carers from Census data. Their contribution to care is valued at £162 billion per year."
            series={carerPopulationSeries}
            yLabel="Carers (millions)"
            source={{
              name: 'ONS',
              dataset: 'Census — Unpaid Care',
              frequency: 'decennial',
              url: 'https://www.ons.gov.uk/releases/unpaidcareinengland2021',
            }}
          />
        ) : (
          <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
        )}
        </div>

        {/* Chart 2: Carers Allowance */}
        <div id="sec-allowance">
        {carersAllowanceSeries.length > 0 ? (
          <LineChart
            title="Carer's Allowance weekly rate, 2014–2023"
            subtitle="Weekly benefit paid to carers providing 35+ hours of care. Widely regarded as inadequate for the economic contribution made."
            series={carersAllowanceSeries}
            yLabel="Weekly rate (£)"
            source={{
              name: 'DWP',
              dataset: "Carer's Allowance rates",
              frequency: 'annual',
              url: 'https://www.gov.uk/carers-allowance',
            }}
          />
        ) : (
          <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
        )}
        </div>

        {/* Bar chart: Impact on carers */}
        <div id="sec-impact" className="my-12">
          <h3 className="text-xl font-bold text-wiah-black mb-2">Impact on carers' lives</h3>
          <p className="text-sm text-wiah-mid mb-6">Proportion of carers reporting each impact, England 2023. Source: Carers UK State of Caring Survey.</p>
          <div className="space-y-4">
            {data?.national.impactOnCarers.map((item, idx) => {
              const maxPct = 72;
              const width = (item.pct / maxPct) * 100;
              return (
                <div key={idx} className="flex items-center gap-4">
                  <div className="w-48 text-sm font-mono text-wiah-mid text-right truncate">{item.impact}</div>
                  <div className="flex-1">
                    <div className="bg-wiah-light rounded h-6 relative overflow-hidden">
                      <div
                        className="bg-wiah-blue h-full transition-all duration-500"
                        style={{ width: `${width}%` }}
                      />
                    </div>
                  </div>
                  <div className="w-12 text-sm font-mono text-wiah-black text-right font-bold">{item.pct}%</div>
                </div>
              );
            })}
          </div>
          <p className="text-xs text-wiah-mid mt-6 font-mono">Source: Carers UK — State of Caring 2023.</p>
        </div>

        {/* Positive callout */}
        <ScrollReveal>
        <PositiveCallout
          title="The economic case"
          value="£162bn"
          unit="annual economic value of unpaid care — more than total NHS spending"
          description="Unpaid carers provide £162 billion of care annually — equivalent to the entire NHS budget. Despite this, Carer's Allowance (the main benefit for carers) has never exceeded £82 per week, and is only paid to those caring 35 or more hours per week. The Carer's Allowance Supplement, introduced in Scotland in 2018, pays an extra £279 twice yearly to Scottish recipients. The 2022 Carers Action Plan committed £25 million to improve access to information and services — roughly £2.40 per carer. Carers' assessments (a right under the Care Act 2014) are not offered to all carers who are entitled: only 340,000 assessments were carried out in 2022/23 against 10 million carers."
          source="Source: ONS — Census 2021 Unpaid Care; Carers UK — State of Caring 2023; DWP — Benefit Rates."
        />
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        {/* Sources */}
        <section className="border-t border-wiah-border pt-8 mt-12">
          <h2 className="text-lg font-bold text-wiah-black mb-4">Sources &amp; methodology</h2>
          <div className="text-sm text-wiah-mid space-y-2">
            {data?.metadata.sources.map((src, i) => (
              <p key={i}>
                <strong>{src.name}.</strong> <em>{src.dataset}</em>. {src.frequency} — 
                <a href={src.url} target="_blank" rel="noopener noreferrer" className="underline text-wiah-blue hover:no-underline">
                  {src.url}
                </a>
              </p>
            ))}
          </div>
          <p className="text-sm text-wiah-mid mt-6">{data?.metadata.methodology}</p>
          {data?.metadata.knownIssues && data.metadata.knownIssues.length > 0 && (
            <div className="mt-6 p-4 bg-wiah-light rounded">
              <p className="font-bold text-wiah-black mb-2">Known issues:</p>
              <ul className="text-sm text-wiah-mid space-y-1 list-disc list-inside">
                {data.metadata.knownIssues.map((issue, i) => (
                  <li key={i}>{issue}</li>
                ))}
              </ul>
            </div>
          )}
        </section>
              <RelatedTopics />
      </main>
    </>
  );
}
