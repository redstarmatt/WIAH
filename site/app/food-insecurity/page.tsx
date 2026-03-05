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

interface FoodBankPoint {
  year: number;
  parcels: number;
}

interface ChildFoodPoint {
  year: number;
  pct: number;
}

interface ReasonPoint {
  reason: string;
  pct: number;
}

interface FoodInsecurityData {
  foodBankUse: FoodBankPoint[];
  childFoodInsecurity: ChildFoodPoint[];
  byReason: ReasonPoint[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

function sparkFrom(arr: number[], n = 12) {
  return arr.slice(-n);
}

function formatNumber(n: number): string {
  if (n >= 1e6) return (n / 1e6).toFixed(1) + 'M';
  if (n >= 1e3) return (n / 1e3).toFixed(1) + 'K';
  return n.toString();
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function FoodInsecurityPage() {
  const [data, setData] = useState<FoodInsecurityData | null>(null);

  useEffect(() => {
    fetch('/data/food-insecurity/food_insecurity.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const foodBankSeries: Series[] = data
    ? [
        {
          id: 'food-bank-parcels',
          label: 'Parcels distributed',
          colour: '#E63946',
          data: data.foodBankUse.map(d => ({
            date: yearToDate(d.year),
            value: d.parcels,
          })),
        },
      ]
    : [];

  const foodBankAnnotations: Annotation[] = [
    { date: new Date(2020, 5), label: '2020: COVID-19 &amp; cost of living surge' },
  ];

  const childFoodSeries: Series[] = data
    ? [
        {
          id: 'child-food-insecurity',
          label: 'Food-insecure households',
          colour: '#E63946',
          data: data.childFoodInsecurity.map(d => ({
            date: yearToDate(d.year),
            value: d.pct,
          })),
        },
      ]
    : [];

  // ── Metric values ────────────────────────────────────────────────────────

  const latestParcels = data?.foodBankUse.at(-1);
  const firstParcels = data?.foodBankUse[0];
  const latestChildFood = data?.childFoodInsecurity.at(-1);
  const parcelChange = latestParcels && firstParcels
    ? latestParcels.parcels - firstParcels.parcels
    : 0;

  const parcelsSparkline = data ? sparkFrom(data.foodBankUse.map(d => d.parcels / 1e6), 12) : [];
  const childFoodSparkline = data ? sparkFrom(data.childFoodInsecurity.map(d => d.pct)) : [];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Food Insecurity" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Food Insecurity"
          question="Can People Afford to Eat?"
          finding="Food bank use has risen twelve-fold since 2012, and one in five children now lives in a household that regularly goes without food."
          colour="#E63946"
        />

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-context', label: 'Context' },

          { id: 'sec-charts', label: 'Charts' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <section id="sec-overview" className="max-w-2xl mt-4 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <MetricCard
              label="Food bank parcels issued"
              value={latestParcels ? formatNumber(latestParcels.parcels) : '—'}
              unit="annual"
              direction="up"
              polarity="up-is-bad"
              changeText={`+${formatNumber(parcelChange)} since 2012`}
              sparklineData={parcelsSparkline}
              onExpand={() => {}}
            />
            <MetricCard
              label="Children in food-insecure households"
              value={latestChildFood ? latestChildFood.pct.toString() : '—'}
              unit="%"
              direction="up"
              polarity="up-is-bad"
              changeText="of all children"
              sparklineData={childFoodSparkline}
              onExpand={() => {}}
            />
            <MetricCard
              label="Adults skipping meals"
              value="7.4"
              unit="M"
              direction="up"
              polarity="up-is-bad"
              changeText="13% of UK adults (Jan 2023)"
              sparklineData={[5.2, 5.8, 6.1, 6.4, 6.8, 7.1, 7.3, 7.4]}
              onExpand={() => {}}
            />
          </div>
        </section>

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The Trussell Trust distributed 128,697 food parcels in 2012. By 2023 that figure had reached 3.1 million &mdash; a 24-fold increase in a decade. More than one million of those parcels went to children. The Trussell Trust network accounts for roughly 60% of food bank provision; including independent operations, there are an estimated 2,800 or more food bank locations across the UK. That number did not exist in any meaningful sense before 2010. The Trussell Trust itself says it should not be a permanent feature of the welfare state.</p>
            <p>The benefits system is the single largest driver. Between 27% and 28% of food bank referrals cite benefit delays or changes as the primary reason. The five-week wait at the start of a Universal Credit claim &mdash; a structural feature introduced with the policy &mdash; leaves newly unemployed households without income precisely when they are most vulnerable. Benefit levels have also failed to keep pace with food costs: UK food prices rose 19.1% in the year to March 2023, the sharpest annual increase in 45 years. Lower-income households spend a disproportionately high share of income on food, and are more exposed to these price shocks than wealthier ones who can absorb them through savings or substitution.</p>
            <p>The state&apos;s main structural response is the free school meals (FSM) programme, which provides a daily meal for 2.1 million eligible pupils in England during term time. But eligibility ends at the school gate: children receive no equivalent support during holidays, a gap described as &ldquo;holiday hunger.&rdquo; The Holiday Activities and Food (HAF) programme, launched in 2021, funds activities and meals for eligible children during school holidays, but coverage varies significantly by local authority. Around 20% of children now live in food-insecure households, according to Food Foundation data. Whether food bank dependency at this scale represents a permanent recalibration of the welfare state or a failure of policy design is a question that successive governments have not answered.</p>
            <p>Food insecurity in the UK is not simply about hunger&mdash;it is about what people eat when money runs short. The cheapest calories available are the most energy-dense and least nutritious: processed foods high in sugar, salt, and saturated fat. Food Foundation research found that a healthy food basket costs &pound;7.50 per 1,000 calories compared with &pound;4.37 for an unhealthy equivalent&mdash;a gap that has widened as food prices have risen. This produces a counterintuitive but well-documented pattern: food-insecure children are more likely to be overweight or obese, not underweight, because the foods their families can afford promote weight gain while delivering poor nutrition. The geography compounds the problem. Large supermarkets have retreated from deprived urban areas over two decades of rationalisation, leaving convenience stores that charge more for less variety. In rural communities, the barrier is transport&mdash;a weekly shop requires a car or an expensive bus journey. School meals, which for 2.1 million pupils represent the most reliable nutritious meal of the day, are governed by nutritional standards last updated in 2014; some schools meet only the legal minimum. The Healthy Start scheme, designed to help pregnant women and families with young children buy fruit, vegetables, and milk, reaches only around 36% of eligible families&mdash;a takeup failure rooted in complex registration processes and low awareness among both families and health professionals.</p>
            <p>The most widely cited measure of food insecurity in the UK&mdash;the Trussell Trust&apos;s 3.1 million emergency food parcels&mdash;is also the most limited. It covers only the Trussell Trust network, which represents roughly 60% of food bank provision; independent food banks, community pantries, and faith-based provision are not systematically counted. More fundamentally, &ldquo;food insecurity&rdquo; as a concept lacks an agreed UK definition or a government-mandated household survey. The UK Food Security Report, published by DEFRA every three years, is thorough on supply chain resilience but less focused on whether individual households can afford to eat adequately. The ONS measures food insecurity through its Opinions and Lifestyle Survey, but question wording differs from the Food Foundation&apos;s methodology, producing substantially different prevalence estimates from the same population. The Trussell Trust&apos;s own data underwent a methodological change in 2019 that complicates pre- and post-comparisons, a caveat rarely noted when the 24-fold increase is cited. Healthy Start eligibility data understates the gap between entitlement and receipt because the NHS Digital registration system does not capture all eligible recipients. Free school meals administrative data counts pupils registered, not meals actually served, and uptake among eligible pupils is not universal. No national dataset captures where families source their food, what they eat, or the nutritional quality of their diet, leaving the most important dimension of food insecurity&mdash;its health consequences&mdash;largely unmeasured.</p>
          </div>
        </section>

        <PositiveCallout
          title="Free school meals expanded in 2023"
          value="+170K"
          description="The government extended free school meals eligibility in 2023, adding an estimated 170,000 children. Evidence consistently shows free school meals improve concentration, behaviour, and attainment &mdash; particularly for children in the most deprived areas."
          source="Source: Department for Education, 2023."
        />

        <section id="sec-charts" className="mt-16 mb-16">
          <ScrollReveal>
            <LineChart
              title="Trussell Trust food bank parcels distributed, England"
              subtitle="Annual totals. Trussell Trust network only &mdash; independent banks not included."
              series={foodBankSeries}
              annotations={foodBankAnnotations}
              yLabel="Parcels (millions)"
              showTitle
            />
          </ScrollReveal>

          <ScrollReveal>
            <LineChart
              title="Children in food-insecure households, England"
              subtitle="Percentage. Food insecurity defined as irregular access to enough food."
              series={childFoodSeries}
              yLabel="Percentage"
              showTitle
            />
          </ScrollReveal>

          <ScrollReveal>
            <div className="mt-12 p-8 bg-white border border-wiah-border rounded-lg">
              <h3 className="text-lg font-bold text-wiah-black mb-6">Primary reasons for food bank referral</h3>
              <div className="space-y-3">
                {data?.byReason.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-32 text-sm text-wiah-mid truncate">{item.reason}</div>
                    <div className="flex-1 bg-wiah-light rounded-sm overflow-hidden">
                      <div
                        className="h-6 bg-wiah-red flex items-center justify-end pr-2"
                        style={{ width: `${(item.pct / 28) * 100}%` }}
                      >
                        {item.pct >= 5 && (
                          <span className="text-xs font-mono text-white">{item.pct}%</span>
                        )}
                      </div>
                    </div>
                    {item.pct < 5 && (
                      <span className="text-xs font-mono text-wiah-mid w-6 text-right">{item.pct}%</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </section>

        <section id="sec-sources" className="max-w-2xl mt-12 pt-8 border-t border-wiah-border">
          <h2 className="text-lg font-bold text-wiah-black mb-4">Sources</h2>
          <div className="text-sm text-wiah-mid space-y-2 font-mono">
            <p>Trussell Trust Food Bank Network &mdash; Annual food bank statistics, Trussell Trust Food Bank Network 2012&ndash;2023.</p>
            <p>Food Insecurity &mdash; Child Food Poverty Tracker, Action for Children &amp; Food Foundation, 2018&ndash;2023.</p>
            <p>Adult Food Insecurity &mdash; Understanding Society: Household Longitudinal Study, Office for National Statistics, Jan 2023.</p>
            <p>Referral Reasons &mdash; Food Bank Referral Reasons Analysis, Trussell Trust, 2023.</p>
          </div>
        </section>
      </main>
    </>
  );
}
