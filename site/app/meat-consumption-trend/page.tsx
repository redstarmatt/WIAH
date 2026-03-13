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

interface ConsumptionPoint {
  year: number;
  kg: number;
  note?: string;
}

interface MeatTypePoint {
  year: number;
  poultry: number;
  beef: number;
  pork: number;
  lamb: number;
  other: number;
}

interface PlantBasedPoint {
  year: number;
  billionGBP: number;
}

interface MeatConsumptionData {
  perCapitaConsumption: ConsumptionPoint[];
  meatTypeBreakdown: MeatTypePoint[];
  plantBasedSales: PlantBasedPoint[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 0, 1);
}

function sparkFrom(arr: number[], n = 10) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function MeatConsumptionTrendPage() {
  const [data, setData] = useState<MeatConsumptionData | null>(null);

  useEffect(() => {
    fetch('/data/meat-consumption-trend/meat_consumption_trend.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const consumptionSeries: Series[] = data
    ? [{
        id: 'per-capita',
        label: 'Per capita consumption (kg/year)',
        colour: '#6B7280',
        data: data.perCapitaConsumption.map(d => ({
          date: yearToDate(d.year),
          value: d.kg,
        })),
      }]
    : [];

  const consumptionAnnotations: Annotation[] = [
    { date: new Date(2013, 0, 1), label: '2013: Horsemeat scandal' },
    { date: new Date(2019, 0, 1), label: '2019: Veganuary breaks through' },
    { date: new Date(2020, 0, 1), label: '2020: COVID lockdowns' },
  ];

  const meatTypeSeries: Series[] = data
    ? [
        {
          id: 'poultry',
          label: 'Poultry',
          colour: '#6B7280',
          data: data.meatTypeBreakdown.map(d => ({
            date: yearToDate(d.year),
            value: d.poultry,
          })),
        },
        {
          id: 'beef',
          label: 'Beef',
          colour: '#E63946',
          data: data.meatTypeBreakdown.map(d => ({
            date: yearToDate(d.year),
            value: d.beef,
          })),
        },
        {
          id: 'pork',
          label: 'Pork',
          colour: '#F4A261',
          data: data.meatTypeBreakdown.map(d => ({
            date: yearToDate(d.year),
            value: d.pork,
          })),
        },
        {
          id: 'lamb',
          label: 'Lamb',
          colour: '#2A9D8F',
          data: data.meatTypeBreakdown.map(d => ({
            date: yearToDate(d.year),
            value: d.lamb,
          })),
        },
      ]
    : [];

  const meatTypeAnnotations: Annotation[] = [
    { date: new Date(2013, 0, 1), label: '2013: Horsemeat scandal — beef drops' },
  ];

  const plantBasedSeries: Series[] = data
    ? [{
        id: 'plant-based',
        label: 'UK plant-based retail sales (£bn)',
        colour: '#2A9D8F',
        data: data.plantBasedSales.map(d => ({
          date: yearToDate(d.year),
          value: d.billionGBP,
        })),
      }]
    : [];

  const plantBasedAnnotations: Annotation[] = [
    { date: new Date(2020, 0, 1), label: '2020: COVID boosts home cooking' },
    { date: new Date(2023, 0, 1), label: '2023: Growth plateau' },
  ];

  // ── Derived values ────────────────────────────────────────────────────

  const latestConsumption = data?.perCapitaConsumption[data.perCapitaConsumption.length - 1];
  const earliestConsumption = data?.perCapitaConsumption[0];
  const totalDrop = earliestConsumption && latestConsumption
    ? (earliestConsumption.kg - latestConsumption.kg).toFixed(1)
    : '12.4';

  const latestPlantBased = data?.plantBasedSales[data.plantBasedSales.length - 1];
  const peakPlantBased = data
    ? data.plantBasedSales.reduce((a, b) => a.billionGBP > b.billionGBP ? a : b)
    : null;

  const latestPoultryShare = data?.meatTypeBreakdown[data.meatTypeBreakdown.length - 1];
  const earliestPoultryShare = data?.meatTypeBreakdown[0];
  const poultrySharePct = latestPoultryShare
    ? Math.round((latestPoultryShare.poultry / (latestPoultryShare.poultry + latestPoultryShare.beef + latestPoultryShare.pork + latestPoultryShare.lamb + latestPoultryShare.other)) * 100)
    : 47;

  return (
    <>
      <TopicNav topic="Meat Consumption Trend" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Meat Consumption Trend"
          question="Is Britain Eating Less Meat?"
          finding="UK per capita meat consumption has fallen steadily from 95kg in 2007 to 83kg in 2025 — a 13% decline over eighteen years. But the story beneath the headline is more nuanced: poultry consumption has risen while red meat has collapsed, and the plant-based boom has stalled."
          colour="#6B7280"
          preposition="with"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Britain is eating less meat than at any point in modern records. The decline has been gradual but persistent: roughly 0.7kg per person per year, every year, for nearly two decades. The causes are layered. Health messaging around red and processed meat — particularly following the WHO's 2015 classification of processed meat as a Group 1 carcinogen — shifted consumer attitudes. The rise of flexitarianism, where people reduce rather than eliminate meat, has proved far more influential than outright veganism. And price has played its part: beef and lamb prices rose sharply between 2010 and 2023, driven by feed costs, post-Brexit trade friction, and global supply disruptions, making chicken the default protein for cost-conscious households.</p>
            <p>The composition of Britain's meat diet has transformed. In 2007, poultry accounted for 36% of total meat consumption; by 2025 it represents 47%. Beef has fallen from 23% to 18%, pork from 22% to 18%, and lamb from 9% to under 8%. This shift has environmental implications — poultry production generates roughly a third of the greenhouse gas emissions per kilogram compared to beef — but the welfare implications of intensive broiler farming are significant and often overlooked. The horsemeat scandal of 2013 caused a sharp short-term drop in beef consumption and permanently damaged consumer trust in processed meat supply chains.</p>
            <p>The plant-based sector tells a story of boom and plateau. UK retail sales of plant-based products tripled from £440 million in 2018 to £1.41 billion by 2024, driven by innovation, celebrity endorsement, and substantial venture capital. But growth stalled in 2023-2025: repeat purchase rates declined, several high-profile brands struggled financially, and consumers complained about taste, texture, and ultra-processed ingredient lists. The market has not collapsed — it has matured. What began as a movement is now a stable category, but the revolution its advocates promised has not materialised. The most significant dietary shift in Britain is not from meat to plants, but from beef and pork to chicken.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-total', label: 'Total consumption' },
          { id: 'sec-breakdown', label: 'By meat type' },
          { id: 'sec-plantbased', label: 'Plant-based sales' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Per capita meat consumption"
            value={latestConsumption ? latestConsumption.kg.toFixed(1) : '82.8'}
            unit="kg/year"
            direction="down"
            polarity="up-is-bad"
            changeText={`Down ${totalDrop}kg since ${earliestConsumption?.year ?? 2007} · 13% decline over 18 years`}
            sparklineData={
              data ? sparkFrom(data.perCapitaConsumption.map(d => d.kg)) : []
            }
            source="DEFRA — Family Food Statistics, 2025"
            href="#sec-total"
          />
          <MetricCard
            label="Plant-based retail sales"
            value={latestPlantBased ? `£${latestPlantBased.billionGBP.toFixed(2)}bn` : '£1.39bn'}
            direction={latestPlantBased && peakPlantBased && latestPlantBased.billionGBP < peakPlantBased.billionGBP ? 'down' : 'up'}
            polarity="up-is-good"
            changeText={`Peaked at £${peakPlantBased?.billionGBP.toFixed(2) ?? '1.41'}bn in ${peakPlantBased?.year ?? 2024} · growth now stalling`}
            sparklineData={
              data ? data.plantBasedSales.map(d => d.billionGBP) : []
            }
            source="Kantar / IGD — UK Plant-Based Market Report, 2025"
            href="#sec-plantbased"
          />
          <MetricCard
            label="Poultry share of total meat"
            value={`${poultrySharePct}%`}
            direction="up"
            polarity="up-is-good"
            changeText={`Up from 36% in ${earliestPoultryShare?.year ?? 2007} · chicken now dominant protein`}
            sparklineData={
              data ? sparkFrom(data.meatTypeBreakdown.map(d =>
                Math.round((d.poultry / (d.poultry + d.beef + d.pork + d.lamb + d.other)) * 100)
              )) : []
            }
            source="DEFRA — Agriculture in the United Kingdom, 2025"
            href="#sec-breakdown"
          />
        </div>

        {/* Chart 1: Total per capita consumption */}
        <ScrollReveal>
          <div id="sec-total" className="mb-12">
            <LineChart
              series={consumptionSeries}
              annotations={consumptionAnnotations}
              title="UK per capita meat consumption, 2007–2025"
              subtitle="Carcase weight equivalent, kilograms per person per year. Steady decline across eighteen years."
              yLabel="kg per person"
              source={{
                name: 'DEFRA',
                dataset: 'Family Food Statistics / Food Statistics Pocketbook',
                frequency: 'annual',
                url: 'https://www.gov.uk/government/statistics/family-food-statistics',
                date: 'Feb 2026',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 2: Meat type breakdown */}
        <ScrollReveal>
          <div id="sec-breakdown" className="mb-12">
            <LineChart
              series={meatTypeSeries}
              annotations={meatTypeAnnotations}
              title="Meat consumption by type, 2007–2025"
              subtitle="Poultry rising, red meat in long-term decline. Kilograms per person per year."
              yLabel="kg per person"
              source={{
                name: 'DEFRA',
                dataset: 'Agriculture in the United Kingdom — Supply Balance Sheets',
                frequency: 'annual',
                url: 'https://www.gov.uk/government/statistics/agriculture-in-the-united-kingdom',
                date: 'Feb 2026',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 3: Plant-based sales */}
        <ScrollReveal>
          <div id="sec-plantbased" className="mb-12">
            <LineChart
              series={plantBasedSeries}
              annotations={plantBasedAnnotations}
              title="UK plant-based product retail sales, 2018–2025"
              subtitle="Rapid growth from 2018 to 2022, now plateauing. Billions of pounds (£)."
              yLabel="£ billions"
              source={{
                name: 'Kantar / IGD',
                dataset: 'UK Plant-Based Market Report',
                frequency: 'annual',
                url: 'https://www.kantar.com',
                date: 'Feb 2026',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="The quiet shift to lower-carbon protein"
            value="47% poultry"
            description="While the debate around meat consumption focuses on veganism versus tradition, the most consequential dietary shift has happened without fanfare. Nearly half of all meat consumed in the UK is now poultry, up from 36% in 2007. Chicken produces roughly 6kg of CO2-equivalent per kilogram of meat — compared to 27kg for beef. This gradual, price-driven substitution has done more to reduce the dietary carbon footprint of British households than the entire plant-based movement. It is a reminder that the most effective changes are often the ones nobody campaigns for."
            source="Source: DEFRA — Agriculture in the United Kingdom, 2025. IPCC emissions factors for livestock."
          />
        </ScrollReveal>

        <RelatedTopics />
      </main>
    </>
  );
}
