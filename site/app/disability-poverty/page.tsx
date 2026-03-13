'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

// ── Types ─────────────────────────────────────────────────────────────────────

interface PovertyRatePoint {
  year: number;
  disabled: number;
  nonDisabled: number;
}

interface ExtraCostItem {
  category: string;
  monthlyAvg: number;
}

interface ShareOfPovertyPoint {
  year: number;
  disabledShareOfPoverty: number;
}

interface DisabilityPovertyData {
  povertyRates: PovertyRatePoint[];
  extraCosts: ExtraCostItem[];
  shareOfPoverty: ShareOfPovertyPoint[];
}

// ── References ────────────────────────────────────────────────────────────────

const editorialRefs: Reference[] = [
  { num: 1, name: 'DWP', dataset: 'Households Below Average Income (HBAI)', url: 'https://www.gov.uk/government/collections/households-below-average-income-hbai--2', date: '2022' },
  { num: 2, name: 'Scope', dataset: 'Extra Costs Commission', url: 'https://www.scope.org.uk/campaigns/extra-costs', date: '2023' },
  { num: 3, name: 'Joseph Rowntree Foundation', dataset: 'UK Poverty Report', url: 'https://www.jrf.org.uk', date: '2022' },
];

// ── Page ──────────────────────────────────────────────────────────────────────

export default function DisabilityPovertyPage() {
  const [data, setData] = useState<DisabilityPovertyData | null>(null);

  useEffect(() => {
    fetch('/data/disability-poverty/disability_poverty.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const povertyRateSeries: Series[] = data
    ? [
        {
          id: 'disabled-poverty',
          label: 'Disabled household poverty rate',
          colour: '#E63946',
          data: data.povertyRates.map(d => ({
            date: new Date(d.year, 0, 1),
            value: d.disabled,
          })),
        },
        {
          id: 'non-disabled-poverty',
          label: 'Non-disabled household poverty rate',
          colour: '#0D1117',
          data: data.povertyRates.map(d => ({
            date: new Date(d.year, 0, 1),
            value: d.nonDisabled,
          })),
        },
      ]
    : [];

  return (
    <>
      <TopicNav topic="Disability & Poverty" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Disability & Poverty"
          question="How much more likely is a disabled person to be in poverty?"
          finding="The disability poverty rate is 29% — nearly double the non-disabled rate of 16%. Disabled households face an estimated £570/month in additional costs relating to their disability. 45% of everyone in poverty is disabled or lives with someone who is."
          colour="#E63946"
        />

        <section className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              The poverty gap between disabled and non-disabled households is one of the
              most persistent features of UK inequality, yet it receives relatively little
              political attention compared to other dimensions of poverty. Around 29% of
              disabled households are in poverty after housing costs, compared with 16%
              of non-disabled households — a gap of 13 percentage points that has barely
              narrowed in a decade. This is not primarily about employment: even working-age
              disabled people in employment are significantly more likely to be in poverty
              than non-disabled workers in equivalent roles.<Cite nums={1} />
            </p>
            <p>
              The core problem is extra costs. Scope&apos;s Extra Costs Commission estimated
              that disabled people face, on average, approximately £570 per month in
              additional costs directly related to their disability.<Cite nums={2} /> These include specialist
              equipment (£120/month), higher energy bills to maintain appropriate temperatures
              and run medical equipment (£95/month), transport to access care and services
              (£85/month), personal care and support (£180/month), and adapted food,
              clothing, and household items (£90/month).<Cite nums={2} /> These costs are largely invisible
              in standard poverty measures, which compare income to median thresholds
              without adjusting for the higher cost base that disabled households face.
            </p>
            </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-rates', label: 'Poverty Rates' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Disabled household poverty rate"
              value="29"
              unit="%"
              direction="flat"
              polarity="up-is-bad"
              changeText="Nearly double the non-disabled rate of 16% · gap not narrowing"
              sparklineData={[28, 28, 29, 29, 29, 29, 29]}
              source="DWP HBAI / Scope · 2022"
            />
            <MetricCard
              label="Disabled people's share of all poverty"
              value="45"
              unit="%"
              direction="up"
              polarity="up-is-bad"
              changeText="Up from 42% in 2015 · disability intersects with all poverty risks"
              sparklineData={[42, 44, 45]}
              source="JRF Poverty Report · 2022"
            />
            <MetricCard
              label="Estimated extra monthly costs of disability"
              value="£570"
              unit="/month"
              direction="up"
              polarity="up-is-bad"
              changeText="Specialist equipment, energy, transport, care · inflation rising these costs"
              sparklineData={[390, 420, 450, 490, 540, 570]}
              source="Scope Extra Costs Commission · 2023"
            />
          </div>
        

        <ScrollReveal>
          <div id="sec-rates" className="mb-12">
            <LineChart
              series={povertyRateSeries}
              title="Poverty rate: disabled vs non-disabled households, 2016–2022"
              subtitle="% in poverty after housing costs. Disabled = household contains someone with a limiting disability."
              yLabel="% in poverty (after housing costs)"

            />
            <p className="font-mono text-[11px] text-wiah-mid mt-2">
              Source:{' '}
              <a
                href="https://www.gov.uk/government/collections/households-below-average-income-hbai--2"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-wiah-black"
              >
                DWP — Households Below Average Income
              </a>{' '}
              ·{' '}
              <a
                href="https://www.scope.org.uk/campaigns/extra-costs"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-wiah-black"
              >
                Scope — Extra Costs
              </a>{' '}
              · Annual
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        <ScrollReveal>
          <div id="sec-sources" className="border-t border-wiah-border pt-8 mt-8">
            <h2 className="text-base font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
            <ul className="font-mono text-[11px] text-wiah-mid space-y-2">
              <li>
                <a
                  href="https://www.gov.uk/government/collections/households-below-average-income-hbai--2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-wiah-black"
                >
                  DWP — Households Below Average Income
                </a>{' '}
                · Annual
              </li>
              <li>
                <a
                  href="https://www.scope.org.uk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-wiah-black"
                >
                  Scope — Extra Costs Commission
                </a>
              </li>
              <li>
                <a
                  href="https://www.jrf.org.uk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-wiah-black"
                >
                  Joseph Rowntree Foundation
                </a>
              </li>
            </ul>
          </div>
        </ScrollReveal>
              <RelatedTopics />
      </main>
    </>
  );
}
