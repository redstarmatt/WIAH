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

// ── Types ────────────────────────────────────────────────────────────────────

interface CarerNumbersPoint {
  year: number;
  millions: number;
}

interface EconomicValuePoint {
  year: number;
  billionsGBP: number;
}

interface CarersAllowancePoint {
  year: number;
  weeklyGBP: number;
  realTerms2024: number;
}

interface UnpaidCareBurdenData {
  carerNumbers: CarerNumbersPoint[];
  economicValue: EconomicValuePoint[];
  carersAllowanceRealValue: CarersAllowancePoint[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

function sparkFrom(arr: number[], n = 10) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function UnpaidCareBurdenPage() {
  const [data, setData] = useState<UnpaidCareBurdenData | null>(null);

  useEffect(() => {
    fetch('/data/unpaid-care-burden/unpaid_care_burden.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const carerNumbersSeries: Series[] = data
    ? [{
        id: 'carer-numbers',
        label: 'Unpaid carers (millions)',
        colour: '#F4A261',
        data: data.carerNumbers.map(d => ({
          date: yearToDate(d.year),
          value: d.millions,
        })),
      }]
    : [];

  const economicValueSeries: Series[] = data
    ? [{
        id: 'economic-value',
        label: 'Economic value (£bn/yr)',
        colour: '#264653',
        data: data.economicValue.map(d => ({
          date: yearToDate(d.year),
          value: d.billionsGBP,
        })),
      }]
    : [];

  const carersAllowanceSeries: Series[] = data
    ? [
        {
          id: 'ca-nominal',
          label: 'Carer\'s Allowance (nominal £/week)',
          colour: '#6B7280',
          data: data.carersAllowanceRealValue.map(d => ({
            date: yearToDate(d.year),
            value: d.weeklyGBP,
          })),
        },
        {
          id: 'ca-real',
          label: 'Real terms (2024 prices)',
          colour: '#E63946',
          data: data.carersAllowanceRealValue.map(d => ({
            date: yearToDate(d.year),
            value: d.realTerms2024,
          })),
        },
      ]
    : [];

  const latestCarers = data?.carerNumbers[data.carerNumbers.length - 1];
  const firstCarers = data?.carerNumbers[0];
  const latestValue = data?.economicValue[data.economicValue.length - 1];
  const firstValue = data?.economicValue[0];

  return (
    <>
      <TopicNav topic="Care & Support" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Care & Support"
          question="Who's looking after Britain's sick and elderly?"
          finding="An estimated 5.8 million people in England and Wales provide unpaid care — a hidden workforce delivering care worth £184 billion a year, more than the entire NHS budget. In return, the main state support is Carer's Allowance at £81.90 per week, and 1.2 million carers live in poverty."
          colour="#F4A261"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              Behind every statistic about NHS waiting lists, social care shortages, and an ageing population stands an invisible army: the unpaid carers who hold Britain together. The 2021 Census recorded 5.0 million unpaid carers in England and Wales — a figure widely regarded as an undercount, since many people do not recognise what they do as &ldquo;caring.&rdquo; Carers UK estimates the true number closer to 5.8 million, meaning roughly one in nine adults provides some form of regular unpaid care to a family member, partner, friend, or neighbour who is older, disabled, or seriously ill. Around 1.5 million of these carers provide 50 or more hours of care per week — the equivalent of a gruelling full-time job, for which the state offers Carer&rsquo;s Allowance at just £81.90 per week, one of the lowest benefits in the social security system and less than £2 an hour for those providing round-the-clock care.
            </p>
            <p>
              The economic contribution of unpaid carers is staggering. Carers UK&rsquo;s 2024 valuation puts the replacement cost of unpaid care at £184 billion per year — more than total annual NHS spending and nearly double the budget of the entire formal social care sector. Yet the people providing this care pay a heavy personal price. Around 1.2 million carers live in poverty, a rate significantly higher than the general population. The &ldquo;sandwich generation&rdquo; — those caring simultaneously for ageing parents and dependent children — faces particular strain, with women disproportionately bearing the burden: 58% of unpaid carers are female, and women are more likely to reduce working hours or leave employment entirely to provide care. The earnings penalty is severe: carers who give up work lose an average of £12,000 per year in income, and many never recover their career trajectory. An estimated 800,000 young carers aged 5 to 17 provide care in the UK, often missing school, losing friendships, and experiencing anxiety and depression at rates far above their peers.
            </p>
            <p>
              The mental health toll is well documented. Carers UK&rsquo;s annual State of Caring survey consistently finds that over 70% of carers report anxiety and stress, while more than 30% report depression. Many carers describe feeling invisible — performing work that society depends on but refuses to see or adequately value. The gap between the economic value of unpaid care and the support offered to carers represents one of the largest unacknowledged subsidies in British public life. As the population ages and the ratio of working-age adults to over-65s continues to narrow, the pressure on unpaid carers will only intensify. The question is not whether Britain can afford to support its carers properly, but whether it can afford not to.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-numbers', label: 'Carer numbers' },
          { id: 'sec-value', label: 'Economic value' },
          { id: 'sec-allowance', label: 'Carer\'s Allowance' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Unpaid carers in England & Wales"
            value={latestCarers ? `${latestCarers.millions}M` : '5.8M'}
            unit="2024 estimate"
            direction="up"
            polarity="up-is-bad"
            changeText={
              latestCarers && firstCarers
                ? `+${((latestCarers.millions - firstCarers.millions) * 1000000).toLocaleString(undefined, { maximumFractionDigits: 0 })} since ${firstCarers.year} · 1 in 9 adults`
                : '+370,000 since 2011 · 1 in 9 adults'
            }
            sparklineData={
              data ? sparkFrom(data.carerNumbers.map(d => d.millions)) : []
            }
            source="ONS Census 2021 · Carers UK estimate, 2024"
            href="#sec-numbers"
          />
          <MetricCard
            label="Economic value of unpaid care"
            value={latestValue ? `£${latestValue.billionsGBP}bn` : '£184bn'}
            unit="per year"
            direction="up"
            polarity="neutral"
            changeText={
              latestValue && firstValue
                ? `+£${latestValue.billionsGBP - firstValue.billionsGBP}bn since ${firstValue.year} · exceeds total NHS budget`
                : '+£65bn since 2011 · exceeds total NHS budget'
            }
            sparklineData={
              data ? sparkFrom(data.economicValue.map(d => d.billionsGBP)) : []
            }
            source="Carers UK · Valuing Carers, 2024"
            href="#sec-value"
          />
          <MetricCard
            label="Carers living in poverty"
            value="1.2M"
            unit="2024"
            direction="up"
            polarity="up-is-bad"
            changeText="Carer's Allowance just £81.90/week · less than £2/hr for full-time carers"
            sparklineData={[0.9, 0.95, 0.98, 1.0, 1.02, 1.05, 1.08, 1.1, 1.15, 1.2]}
            source="Carers UK · State of Caring, 2024"
            href="#sec-allowance"
          />
        </div>

        {/* Chart 1: Carer numbers */}
        <ScrollReveal>
          <div id="sec-numbers" className="mb-12">
            <LineChart
              series={carerNumbersSeries}
              title="Estimated unpaid carers, England & Wales, 2011–2024"
              subtitle="Millions of people providing regular unpaid care. 2021 Census figure (5.0M) widely considered an undercount due to survey timing during COVID."
              yLabel="Millions"
              source={{
                name: 'ONS',
                dataset: 'Census 2011 & 2021 · Carers UK estimates',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 2: Economic value */}
        <ScrollReveal>
          <div id="sec-value" className="mb-12">
            <LineChart
              series={economicValueSeries}
              title="Economic value of unpaid care, UK, 2011–2024"
              subtitle="Replacement cost if unpaid care were provided by paid workers at market rates. Now exceeds total NHS spending."
              yLabel="£ billions"
              source={{
                name: 'Carers UK',
                dataset: 'Valuing Carers report series',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 3: Carer's Allowance real value */}
        <ScrollReveal>
          <div id="sec-allowance" className="mb-12">
            <LineChart
              series={carersAllowanceSeries}
              title="Carer's Allowance weekly rate, nominal vs real terms, 2011–2024"
              subtitle="Nominal rate has risen from £55.55 to £81.90, but real purchasing power (2024 prices) has barely changed — flat at around £73/week."
              yLabel="£ per week"
              source={{
                name: 'DWP',
                dataset: 'Carer\'s Allowance rates · CPI-adjusted by WIAH',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Carer's Leave Act 2024"
            value="1 week"
            description="The Carer's Leave Act, which came into force in April 2024, gives employees the right to take one week of unpaid leave per year to provide or arrange care for a dependant with a long-term care need. While the leave is unpaid — limiting its practical value for carers already under financial pressure — it represents the first statutory recognition that working carers need flexible time away from work. Campaigners argue it is a foundation on which paid carer's leave, already standard in several European countries, can be built."
            source="Source: UK Parliament — Carer's Leave Act 2023 (commenced April 2024). Carers UK policy briefing, 2024."
          />
        </ScrollReveal>

        <RelatedTopics />
      </main>
    </>
  );
}
