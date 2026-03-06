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

interface MarketValuePoint {
  year: number;
  valueBillions: number;
}

interface LocalSourcingPoint {
  year: number;
  percentWithLocalSpec: number;
}

interface MealCostPoint {
  year: number;
  costPounds: number;
}

interface SchoolMealsData {
  national: {
    marketValue: {
      timeSeries: MarketValuePoint[];
      latestYear: number;
      latestBillions: number;
      note: string;
    };
    localSourcingContracts: {
      timeSeries: LocalSourcingPoint[];
      latestYear: number;
      latestPercent: number;
      note: string;
    };
    averageMealCost: {
      timeSeries: MealCostPoint[];
      latestYear: number;
      latestCostPounds: number;
      uifsRatePounds: number;
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
  return new Date(y, 5, 1);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function SchoolMealsProcurementPage() {
  const [data, setData] = useState<SchoolMealsData | null>(null);

  useEffect(() => {
    fetch('/data/school-meals-procurement/school_meals.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const marketValueSeries: Series[] = data
    ? [{
        id: 'market-value',
        label: 'School meals market value (\u00a3bn)',
        colour: '#264653',
        data: data.national.marketValue.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.valueBillions,
        })),
      }]
    : [];

  const localSourcingSeries: Series[] = data
    ? [{
        id: 'local-sourcing',
        label: '% contracts with local food specification',
        colour: '#2A9D8F',
        data: data.national.localSourcingContracts.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.percentWithLocalSpec,
        })),
      }]
    : [];

  const mealCostSeries: Series[] = data
    ? [{
        id: 'meal-cost',
        label: 'Average meal cost (\u00a3)',
        colour: '#F4A261',
        data: data.national.averageMealCost.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.costPounds,
        })),
      }]
    : [];

  const marketAnnotations: Annotation[] = [
    { date: new Date(2021, 5, 1), label: '2021: Pandemic closures reduce revenue' },
  ];

  const costAnnotations: Annotation[] = [
    { date: new Date(2022, 5, 1), label: '2022: Food inflation spikes' },
  ];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="School Meals Procurement" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="School Meals Procurement"
          question="Where Does School Dinner Money Actually Go?"
          finding="Only 7% of school meal contracts specify locally sourced food. The average school meal costs &pound;2.65 to provide but generates &pound;1.2 billion in annual contracts dominated by three large catering companies."
          colour="#2A9D8F"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              The &pound;1.2 billion school meals market is one of the least-scrutinised public procurement sectors in England. Three large contract catering companies &mdash; Compass Group, Sodexo, and ISS &mdash; hold a substantial share of the market, though precise figures are not published as official statistics. The average school meal costs &pound;2.65 to produce in 2024, but the Universal Infant Free School Meals statutory reimbursement rate remained at &pound;2.53 until recently &mdash; a gap that councils and schools had to absorb through cross-subsidy or reduced nutritional quality.
            </p>
            <p>
              Local and sustainable sourcing lags far behind stated ambitions. Henry Dimbleby&apos;s 2021 National Food Strategy recommended extending free school meals to all primary pupils and creating a School Food Review to improve quality and provenance standards. Only 7% of school meal contracts in England specify locally sourced food requirements. Scotland&apos;s Good Food Nation (Scotland) Act 2022 has created binding obligations on public bodies including schools to support local supply chains, a model England has not adopted. The consequence is that school meal contracts prioritise lowest-cost delivery at scale, concentrating economic benefits in large catering corporates rather than local food producers and processors.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-market', label: 'Market Value' },
          { id: 'sec-sourcing', label: 'Local Sourcing' },
          { id: 'sec-cost', label: 'Meal Costs' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        {/* Metric cards */}
        <ScrollReveal>
          <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Annual school meals market value"
              value="&pound;1.2bn"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Dominated by 3 large catering companies &middot; Low local food procurement"
              sparklineData={[0.95, 1.0, 1.05, 0.9, 1.05, 1.1, 1.2]}
              href="#sec-market"
            />
            <MetricCard
              label="Contracts specifying local sourcing"
              value="7%"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="Up from 4% in 2019 &middot; Far below government aspirations &middot; Scotland leads"
              sparklineData={[4, 5, 5, 6, 6, 7]}
              href="#sec-market"
            />
            <MetricCard
              label="Average meal cost (England)"
              value="&pound;2.65"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="+13% since 2019 &middot; Universal Infant FSM rate unchanged at &pound;2.53 until recently"
              sparklineData={[2.35, 2.40, 2.50, 2.55, 2.60, 2.65]}
              href="#sec-market"
            />
          </div>
        </ScrollReveal>

        {/* Charts */}
        <ScrollReveal>
          <section id="sec-market" className="mb-12">
            <LineChart
              title="School meals market value, England, 2018&ndash;2024"
              subtitle="Estimated annual value of school meal contracts in England, including free and paid meals. 2021 dip reflects pandemic school closures. Market highly concentrated among large contract catering companies."
              series={marketValueSeries}
              annotations={marketAnnotations}
              yLabel="\u00a3 Billions"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-sourcing" className="mb-12">
            <LineChart
              title="School meal contracts with local sourcing specification, 2019&ndash;2024"
              subtitle="Percentage of school meal contracts in England specifying locally sourced food. Slow improvement from a very low base. Scotland's Good Food Nation Act creates binding obligations England lacks."
              series={localSourcingSeries}
              annotations={[]}
              yLabel="Percent (%)"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-cost" className="mb-12">
            <LineChart
              title="Average school meal production cost, England, 2019&ndash;2024"
              subtitle="Average cost to produce one school meal including ingredients, labour and overheads. Rose 13% since 2019 driven by food inflation and wage growth, exceeding the Universal Infant FSM reimbursement rate."
              series={mealCostSeries}
              annotations={costAnnotations}
              yLabel="\u00a3 per meal"
            />
          </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="What&apos;s improving"
            value="Good Food Nation"
            unit="Scotland&apos;s binding food sourcing law"
            description="Scotland&apos;s Good Food Nation (Scotland) Act 2022 requires public bodies including schools to create Good Food Nation Plans with measurable local sourcing targets. Henry Dimbleby&apos;s National Food Strategy recommended extending free school meals to all primary pupils in England &mdash; a move that would improve nutrition, reduce stigma, and give procurement more scale for quality standards. Many London boroughs and some academy trusts have independently adopted stricter local sourcing criteria, showing what is achievable under current legal frameworks."
            source="Source: LACA School Food Survey 2024 &middot; DfE Free School Meals guidance &middot; Scottish Government Good Food Nation Act."
          />
        </ScrollReveal>

        {/* Sources */}
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
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
