'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';

// ── Types ─────────────────────────────────────────────────────────────────────

interface NationalPoint {
  year: number;
  ratePercent: number;
}

interface RegionPoint {
  region: string;
  ratePercent: number;
}

interface WorkingFamilyPoint {
  year: number;
  percent: number;
}

interface ChildPovertyData {
  nationalTimeSeries: NationalPoint[];
  byRegion2023: RegionPoint[];
  inWorkingFamilies: WorkingFamilyPoint[];
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ChildPovertyRegionsPage() {
  const [data, setData] = useState<ChildPovertyData | null>(null);

  useEffect(() => {
    fetch('/data/child-poverty-regions/child_poverty_regions.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const nationalSeries: Series[] = data
    ? [
        {
          id: 'child-poverty-rate',
          label: 'Child poverty rate (%)',
          colour: '#E63946',
          data: data.nationalTimeSeries.map(d => ({
            date: new Date(d.year, 0, 1),
            value: d.ratePercent,
          })),
        },
      ]
    : [];

  const workingFamilySeries: Series[] = data
    ? [
        {
          id: 'working-poor',
          label: '% of children in poverty in working families',
          colour: '#264653',
          data: data.inWorkingFamilies.map(d => ({
            date: new Date(d.year, 0, 1),
            value: d.percent,
          })),
        },
      ]
    : [];

  return (
    <>
      <TopicNav topic="Child Poverty" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Child Poverty"
          question="Where is child poverty worst — and is it getting better?"
          finding="4.3 million children are in poverty in the UK — 30% of all children. The North East has the highest regional rate at 33%. 67% of children in poverty live in working families — challenging the idea that poverty is about unemployment."
          colour="#E63946"
        />

        <section className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              One in three children in the UK lives in poverty. The standard measure —
              households below average income after housing costs — puts the figure at
              around 4.3 million children, or 30% of all children in 2023. This is not
              a new crisis: rates have remained stubbornly between 27% and 30% for over
              a decade, despite government spending on tax credits, child benefit, and
              the National Living Wage. The headline rate has not fallen to below 25%
              in any year since the late 1990s.
            </p>
            <p>
              Geography matters enormously. The North East has the highest regional child
              poverty rate in England at 33%, followed by West Midlands at 32% and
              Inner London at 37% — where high housing costs push many working families
              below the poverty line even on relatively high nominal incomes. The South
              East and South West have rates around 20–22%. This 13–17 percentage point
              gap between regions reflects deep structural inequalities in wages, housing
              costs, economic opportunity, and local authority capacity to provide
              supplementary services.
            </p>
            <p>
              The most important — and most misunderstood — feature of child poverty in
              2023 is that it is overwhelmingly about working families. 67% of children
              in poverty have at least one working parent, up from 57% in 2010. The
              "working poor" is not a marginal category — it is the norm. Wages have
              not kept pace with housing costs, childcare costs, and the general cost
              of living. The National Living Wage has helped at the bottom of the distribution,
              but it is insufficient on its own when a family in London pays £1,500 per
              month in rent.
            </p>
            <p>
              The two-child limit on child tax credit — introduced in 2017 and restricting
              support to the first two children in a family claiming benefits — is estimated
              by the DWP to have pushed around 250,000 children into poverty who would
              otherwise not have been. The policy was designed to discourage large family
              size, but its effect is to impose a financial penalty on children who had
              no say in the matter. No other comparable welfare state in Western Europe
              has an equivalent restriction.
            </p>
            <p>
              The evidence on what works is relatively clear. Childcare subsidies that
              make work pay for parents — particularly second earners, typically mothers —
              reduce child poverty. Housing cost support that reflects actual market rents
              reduces child poverty. Raising benefit rates in line with inflation rather
              than capping them prevents poverty deepening during cost-of-living shocks.
              The UK has a track record of reducing child poverty when political will exists:
              the Blair-era policies of 1998–2010 cut child poverty by nearly a third.
              The same is achievable again, but requires sustained prioritisation.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-national', label: 'National Trend' },
          { id: 'sec-working-poor', label: 'Working Families' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Children in poverty (UK)"
              value="4.3m"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="30% of all children · up from 27% in 2010"
              sparklineData={[27, 27, 28, 28, 29, 28, 29, 30]}
              source="DWP HBAI Statistics · 2023"
            />
            <MetricCard
              label="North East child poverty rate"
              value="33"
              unit="%"
              direction="up"
              polarity="up-is-bad"
              changeText="Highest English region · South East 20%, South West 22%"
              sparklineData={[28, 29, 30, 31, 33]}
              source="End Child Poverty / JRF · 2023"
            />
            <MetricCard
              label="Children in poverty in working families"
              value="67"
              unit="%"
              direction="up"
              polarity="up-is-bad"
              changeText="Up from 57% in 2010 · 'working poor' is the norm"
              sparklineData={[57, 61, 64, 66, 67, 67]}
              source="DWP HBAI / JRF · 2023"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div id="sec-national" className="mb-12">
            <LineChart
              series={nationalSeries}
              title="Child poverty rate (after housing costs), UK, 2010–2023"
              subtitle="% of children in households below 60% of median income after housing costs."
              yLabel="% of children in poverty"

              annotations={[
                { date: new Date(2013, 0), label: '2013: bedroom tax, benefit cap' },
                { date: new Date(2017, 0), label: '2017: two-child limit' },
                { date: new Date(2022, 0), label: '2022: cost-of-living crisis' },
              ]}
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
              · Annual
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div id="sec-working-poor" className="mb-12">
            <LineChart
              series={workingFamilySeries}
              title="Children in poverty living in working families, 2010–2023"
              subtitle="% of children in poverty who live in a household with at least one working adult."
              yLabel="% of children in poverty in working families"

            />
            <p className="font-mono text-[11px] text-wiah-mid mt-2">
              Source:{' '}
              <a
                href="https://www.jrf.org.uk/poverty-statistics"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-wiah-black"
              >
                Joseph Rowntree Foundation — Poverty Statistics
              </a>{' '}
              · Annual
            </p>
          </div>
        </ScrollReveal>

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
                  href="https://www.jrf.org.uk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-wiah-black"
                >
                  Joseph Rowntree Foundation
                </a>
              </li>
              <li>
                <a
                  href="https://www.endchildpoverty.org.uk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-wiah-black"
                >
                  End Child Poverty Coalition
                </a>
              </li>
            </ul>
          </div>
        </ScrollReveal>
      </main>
    </>
  );
}
