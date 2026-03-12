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

// ── Types ────────────────────────────────────────────────────────────────────

interface PrevalencePoint {
  year: number;
  percent: number;
}

interface DeprivationPoint {
  year: number;
  mostDeprived: number;
  leastDeprived: number;
}

interface RegionData {
  region: string;
  percent: number;
}

interface NhsCostPoint {
  year: number;
  billionGBP: number;
}

interface AdultObesityData {
  prevalence: PrevalencePoint[];
  severeObesity: PrevalencePoint[];
  deprivationGap: DeprivationPoint[];
  byRegion: RegionData[];
  nhsCosts: NhsCostPoint[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 0, 1);
}

function sparkFrom(arr: number[], n = 10) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function AdultObesityPage() {
  const [data, setData] = useState<AdultObesityData | null>(null);

  useEffect(() => {
    fetch('/data/adult-obesity/adult_obesity.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const prevalenceSeries: Series[] = data
    ? [
        {
          id: 'prevalence',
          label: 'Adult obesity prevalence (%)',
          colour: '#E63946',
          data: data.prevalence.map(d => ({
            date: yearToDate(d.year),
            value: d.percent,
          })),
        },
        {
          id: 'severe',
          label: 'Severe obesity (BMI 40+) (%)',
          colour: '#6B7280',
          data: data.severeObesity.map(d => ({
            date: yearToDate(d.year),
            value: d.percent,
          })),
        },
      ]
    : [];

  const deprivationSeries: Series[] = data
    ? [
        {
          id: 'most-deprived',
          label: 'Most deprived quintile',
          colour: '#E63946',
          data: data.deprivationGap.map(d => ({
            date: yearToDate(d.year),
            value: d.mostDeprived,
          })),
        },
        {
          id: 'least-deprived',
          label: 'Least deprived quintile',
          colour: '#2A9D8F',
          data: data.deprivationGap.map(d => ({
            date: yearToDate(d.year),
            value: d.leastDeprived,
          })),
        },
      ]
    : [];

  const nhsCostSeries: Series[] = data
    ? [
        {
          id: 'nhs-costs',
          label: 'Estimated annual NHS cost (bn)',
          colour: '#264653',
          data: data.nhsCosts.map(d => ({
            date: yearToDate(d.year),
            value: d.billionGBP,
          })),
        },
      ]
    : [];

  const latestPrevalence = data?.prevalence[data.prevalence.length - 1];
  const earliestPrevalence = data?.prevalence[0];
  const latestSevere = data?.severeObesity[data.severeObesity.length - 1];
  const latestCost = data?.nhsCosts[data.nhsCosts.length - 1];
  const earliestCost = data?.nhsCosts[0];
  const latestDeprivation = data?.deprivationGap[data.deprivationGap.length - 1];

  const deprivationGapPp = latestDeprivation
    ? (latestDeprivation.mostDeprived - latestDeprivation.leastDeprived).toFixed(1)
    : '16.8';

  return (
    <>
      <TopicNav topic="Adult Obesity" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Adult Obesity"
          question="Is Adult Obesity Still Getting Worse?"
          finding="29.5% of adults in England are now obese -- the highest rate on record. Severe obesity has nearly tripled since 2005, the deprivation gap is widening, and the annual NHS cost has passed seven billion pounds."
          colour="#E63946"
          preposition="with"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The proportion of English adults classified as obese has risen steadily for two decades, reaching 29.5% in 2023 according to the Health Survey for England -- the highest rate ever recorded. Severe obesity, defined as a BMI of 40 or above, has nearly tripled from 1.4% in 2005 to 4.1% today. The health consequences are not distributed equally: obesity prevalence in the most deprived quintile of neighbourhoods stands at 39.0%, compared with 22.2% in the least deprived. That gap of almost 17 percentage points has widened from 14.4 points in 2010. Geography follows the same gradient, with the North East recording the highest regional rate at 32.8% and London the lowest at 24.2%.</p>
            <p>The economic burden is equally stark. NHS England estimates the direct healthcare cost of obesity-related conditions -- type 2 diabetes, cardiovascular disease, certain cancers, musculoskeletal disorders -- at approximately 7.2 billion pounds per year, up from 5.1 billion in 2015. That figure does not include lost productivity, social care costs, or the widening gap in healthy life expectancy between rich and poor areas. Policy responses have been piecemeal. The Soft Drinks Industry Levy, introduced in 2018, successfully reduced sugar content in drinks but did not bend the prevalence curve. Restrictions on high fat, sugar and salt (HFSS) food advertising and promotions were repeatedly delayed. GLP-1 receptor agonist drugs -- semaglutide and tirzepatide -- offer clinically significant weight loss for individuals, but NHS specialist obesity services face waiting times of two years or more. The fundamental structural drivers -- the ubiquity of ultra-processed food, built environments that discourage walking and cycling, food poverty, and long working hours -- remain largely unaddressed.</p>
            <p>There are reasons for cautious optimism. The rate of increase has slowed since 2021, suggesting prevalence may be approaching a plateau. The sugar tax has proven that fiscal policy can change industry behaviour. And the rapid expansion of pharmacological treatment options, if made accessible beyond private clinics, could reduce the clinical severity of existing obesity. But without systemic changes to the food environment and the economic conditions that drive dietary inequality, the gap between the most and least deprived will continue to widen.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-prevalence', label: 'Prevalence trend' },
          { id: 'sec-deprivation', label: 'Deprivation gap' },
          { id: 'sec-costs', label: 'NHS costs' },
          { id: 'sec-regional', label: 'Regional' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Adult obesity prevalence (England)"
            value={latestPrevalence ? `${latestPrevalence.percent}%` : '29.5%'}
            unit="2023"
            direction="up"
            polarity="up-is-bad"
            changeText={
              latestPrevalence && earliestPrevalence
                ? `up from ${earliestPrevalence.percent}% in ${earliestPrevalence.year} · highest rate on record`
                : 'up from 22.1% in 2005 · highest rate on record'
            }
            sparklineData={
              data ? sparkFrom(data.prevalence.map(d => d.percent)) : [26.9, 27.2, 27.5, 28, 28.5, 29, 29.5]
            }
            source="NHS Digital — Health Survey for England, 2023"
            href="#sec-prevalence"
          />
          <MetricCard
            label="Severe obesity (BMI 40+)"
            value={latestSevere ? `${latestSevere.percent}%` : '4.1%'}
            unit="2023"
            direction="up"
            polarity="up-is-bad"
            changeText="nearly tripled since 2005 · most deprived areas twice as affected"
            sparklineData={
              data ? sparkFrom(data.severeObesity.map(d => d.percent)) : [2.4, 2.6, 2.8, 3.2, 3.6, 3.9, 4.1]
            }
            source="NHS Digital — Health Survey for England, 2023"
            href="#sec-deprivation"
          />
          <MetricCard
            label="Estimated annual NHS cost"
            value={latestCost ? `£${latestCost.billionGBP}bn` : '£7.2bn'}
            unit="2023"
            direction="up"
            polarity="up-is-bad"
            changeText={
              latestCost && earliestCost
                ? `up from £${earliestCost.billionGBP}bn in ${earliestCost.year} · excludes productivity losses`
                : 'up from £5.1bn in 2015 · excludes productivity losses'
            }
            sparklineData={
              data ? sparkFrom(data.nhsCosts.map(d => d.billionGBP)) : [5.1, 5.4, 5.6, 5.9, 6.1, 5.8, 6.5, 6.8, 7.2]
            }
            source="NHS England — Obesity cost estimates, 2023"
            href="#sec-costs"
          />
        </div>

        {/* Chart 1: Prevalence trend */}
        <ScrollReveal>
          <div id="sec-prevalence" className="mb-12">
            <LineChart
              series={prevalenceSeries}
              title="Adult obesity prevalence, England, 2005-2023"
              subtitle="Percentage of adults (16+) classified as obese (BMI 30+) and severely obese (BMI 40+). Health Survey for England."
              yLabel="Prevalence (%)"
              annotations={[
                { date: new Date(2018, 3, 1), label: '2018: Soft Drinks Industry Levy introduced' },
                { date: new Date(2020, 2, 1), label: '2020: COVID-19 pandemic' },
              ]}
              targetLine={{ value: 27.0, label: 'CMO healthy weight target' }}
              source={{
                name: 'NHS Digital',
                dataset: 'Health Survey for England',
                frequency: 'annual',
                url: 'https://digital.nhs.uk/data-and-information/publications/statistical/health-survey-for-england',
                date: 'Dec 2024',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 2: Deprivation gap */}
        <ScrollReveal>
          <div id="sec-deprivation" className="mb-12">
            <LineChart
              series={deprivationSeries}
              title="Obesity prevalence by deprivation quintile, England, 2010-2023"
              subtitle="Gap between most and least deprived neighbourhoods has widened from 14.4 to 16.8 percentage points."
              yLabel="Prevalence (%)"
              annotations={[
                { date: new Date(2015, 0, 1), label: '2015: Austerity cuts to public health budgets' },
                { date: new Date(2020, 2, 1), label: '2020: Pandemic widens inequality' },
              ]}
              source={{
                name: 'NHS Digital',
                dataset: 'Health Survey for England — Deprivation Analysis',
                frequency: 'annual',
                url: 'https://digital.nhs.uk/data-and-information/publications/statistical/health-survey-for-england',
                date: 'Dec 2024',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 3: NHS costs */}
        <ScrollReveal>
          <div id="sec-costs" className="mb-12">
            <LineChart
              series={nhsCostSeries}
              title="Estimated annual NHS cost of obesity, England, 2015-2023"
              subtitle="Direct healthcare costs including type 2 diabetes, cardiovascular disease, and related conditions."
              yLabel="Cost (£ billion)"
              annotations={[
                { date: new Date(2020, 2, 1), label: '2020: Elective care disruption' },
              ]}
              source={{
                name: 'NHS England',
                dataset: 'Obesity-related NHS costs',
                frequency: 'annual',
                date: '2024',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Regional variation bar chart */}
        <ScrollReveal>
          <div id="sec-regional" className="mb-12">
            <div className="bg-white rounded-lg border border-wiah-border p-8">
              <h2 className="text-lg font-bold text-wiah-black mb-2">
                Adult obesity prevalence by region, England (%)
              </h2>
              <p className="text-sm text-wiah-mid mb-6">
                Percentage of adults classified as obese (BMI 30+), 2023. North East has the highest rate; London the lowest.
              </p>
              <div className="mt-6 space-y-4">
                {data?.byRegion.map((r) => {
                  const pct = (r.percent / 40) * 100;
                  return (
                    <div key={r.region}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-wiah-black">{r.region}</span>
                        <span className="font-mono text-sm font-bold text-wiah-black">{r.percent}%</span>
                      </div>
                      <div className="h-6 bg-wiah-light rounded-sm overflow-hidden">
                        <div
                          className="h-full rounded-sm transition-all"
                          style={{ width: `${pct}%`, backgroundColor: r.percent >= 30 ? '#E63946' : r.percent >= 28 ? '#F4A261' : '#2A9D8F' }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="font-mono text-xs text-wiah-mid mt-4">Source: NHS Digital — Health Survey for England, 2023</p>
            </div>
          </div>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Soft Drinks Industry Levy: fiscal policy that changed behaviour"
            value="46%"
            unit="reduction in sugar per drink"
            description="The Soft Drinks Industry Levy, introduced in April 2018, led to a 46% reduction in the average sugar content of soft drinks sold in the UK. Manufacturers reformulated products before the levy even took effect, demonstrating that well-designed fiscal measures can shift industry behaviour at scale. While the levy alone has not reversed obesity trends, it provides the strongest UK evidence that upstream policy interventions work. The success has informed proposals for extending similar measures to other high-sugar product categories."
            source="Source: HM Revenue & Customs — SDIL receipts data, 2024. University of Cambridge evaluation, The Lancet Public Health."
          />
        </ScrollReveal>

        <RelatedTopics />

        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <div className="space-y-2">
              <p><a href="https://digital.nhs.uk/data-and-information/publications/statistical/health-survey-for-england" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS Digital — Health Survey for England</a> — primary source for prevalence and deprivation data. Annual survey of approximately 8,000 adults with measured height and weight. Retrieved Dec 2024.</p>
              <p><a href="https://www.england.nhs.uk/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS England</a> — estimated obesity-related NHS costs. Based on attributable fractions for type 2 diabetes, cardiovascular disease, musculoskeletal conditions, and certain cancers.</p>
              <p>All figures are for England unless otherwise stated. Obesity is defined as BMI 30 or above; severe obesity as BMI 40 or above. The 2020 Health Survey for England used a smaller sample and mixed-mode methodology due to COVID-19 restrictions, which may affect comparability. Trend data uses the most recent available release at time of publication.</p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
