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

interface PrematureDeathPoint {
  year: number;
  deaths: number;
  note?: string;
}

interface NhsCostPoint {
  year: number;
  costBillions: number;
  note?: string;
}

interface Pm25Point {
  year: number;
  ugm3: number;
  whoGuideline: number;
  note?: string;
}

interface AirPollutionData {
  prematureDeaths: PrematureDeathPoint[];
  nhsCosts: NhsCostPoint[];
  pm25Levels: Pm25Point[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

function sparkFrom(arr: number[], n = 10) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function AirPollutionHealthBurdenPage() {
  const [data, setData] = useState<AirPollutionData | null>(null);

  useEffect(() => {
    fetch('/data/air-pollution-health-burden/air_pollution_health_burden.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const deathsSeries: Series[] = data
    ? [{
        id: 'premature-deaths',
        label: 'Premature deaths attributed to air pollution',
        colour: '#E63946',
        data: data.prematureDeaths.map(d => ({
          date: yearToDate(d.year),
          value: d.deaths,
        })),
      }]
    : [];

  const nhsCostSeries: Series[] = data
    ? [{
        id: 'nhs-costs',
        label: 'NHS cost (£ billions)',
        colour: '#E63946',
        data: data.nhsCosts.map(d => ({
          date: yearToDate(d.year),
          value: d.costBillions,
        })),
      }]
    : [];

  const pm25Series: Series[] = data
    ? [
        {
          id: 'pm25',
          label: 'PM2.5 annual mean (µg/m³)',
          colour: '#264653',
          data: data.pm25Levels.map(d => ({
            date: yearToDate(d.year),
            value: d.ugm3,
          })),
        },
        {
          id: 'who-guideline',
          label: 'WHO guideline (5 µg/m³)',
          colour: '#2A9D8F',
          data: data.pm25Levels.map(d => ({
            date: yearToDate(d.year),
            value: d.whoGuideline,
          })),
        },
      ]
    : [];

  const latestDeaths = data?.prematureDeaths[data.prematureDeaths.length - 1];
  const earliestDeaths = data?.prematureDeaths[0];
  const latestCost = data?.nhsCosts[data.nhsCosts.length - 1];
  const earliestCost = data?.nhsCosts[0];
  const latestPm25 = data?.pm25Levels[data.pm25Levels.length - 1];
  const earliestPm25 = data?.pm25Levels[0];

  const pm25ReductionPct = earliestPm25 && latestPm25
    ? Math.round(((earliestPm25.ugm3 - latestPm25.ugm3) / earliestPm25.ugm3) * 100)
    : 54;

  const deathsChange = earliestDeaths && latestDeaths
    ? Math.round(((earliestDeaths.deaths - latestDeaths.deaths) / earliestDeaths.deaths) * 100)
    : 26;

  const costChange = earliestCost && latestCost
    ? Math.round(((latestCost.costBillions - earliestCost.costBillions) / earliestCost.costBillions) * 100)
    : 86;

  return (
    <>
      <TopicNav topic="Environment & Climate" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Environment & Climate"
          question="Is the air you breathe slowly killing you?"
          finding="Air pollution causes an estimated 28,000–36,000 premature deaths in the UK each year. PM2.5 concentrations have fallen 54% since 2003, but remain 40% above the WHO guideline — and the NHS burden continues to rise."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              Air pollution is the largest environmental risk to public health in the United Kingdom. The Committee on the Medical Effects of Air Pollutants (COMEAP) estimates that long-term exposure to fine particulate matter (PM2.5) and nitrogen dioxide (NO2) contributes to between 28,000 and 36,000 premature deaths annually in England alone — more than obesity, more than alcohol, and roughly equivalent to the toll of smoking-related disease. These are not sudden deaths. They accumulate over years and decades: PM2.5 particles, smaller than a red blood cell, penetrate deep into lung tissue, cross into the bloodstream, and drive chronic cardiovascular disease, stroke, lung cancer, and respiratory conditions including asthma and COPD. The evidence linking air pollution to cardiovascular mortality is now as robust as the evidence linking smoking to lung cancer. NO2, primarily from diesel vehicles, inflames airways and worsens existing respiratory conditions. For adults with heart disease or chronic lung conditions, every spike in pollution increases the risk of hospitalisation and death.
            </p>
            <p>
              The burden falls unevenly. Children are disproportionately vulnerable — their lungs are still developing, they breathe faster relative to their body weight, and they are closer to exhaust-pipe height. Research published in the Lancet has linked childhood PM2.5 exposure to reduced lung growth, higher asthma incidence, and emerging evidence of neurodevelopmental harm. Elderly people and those with pre-existing conditions face elevated risk. And the pattern maps almost perfectly onto deprivation: the most polluted neighbourhoods in England are overwhelmingly the poorest, creating a toxic gradient where the people least able to move or adapt bear the greatest health cost. The death of nine-year-old Ella Adoo-Kissi-Debrah in 2013 — the first person in the UK to have air pollution listed as a cause of death — brought this disparity into national consciousness and led to Ella's Law, which aims to set legally binding WHO-aligned air quality targets.
            </p>
            <p>
              There is a dimension of this crisis that barely features in official data: indoor air quality. The average person spends 90% of their time indoors, yet monitoring and regulation focus almost entirely on outdoor concentrations. The surge in domestic wood-burning stoves — marketed as sustainable and cosy — has introduced a significant new source of indoor and neighbourhood PM2.5. DEFRA estimates that domestic wood burning now accounts for 17% of total UK PM2.5 emissions, more than road transport. Meanwhile, poorly ventilated homes, gas cooking, and household chemicals contribute to indoor pollution levels that can exceed outdoor concentrations. The progress made through Clean Air Zones in cities like Birmingham, Bath, and Bristol is real and measurable — PM2.5 has fallen 54% nationally since 2003. But the UK still exceeds WHO guidelines by a wide margin, the NHS cost continues to climb, and the health burden remains concentrated among those with the least power to change their circumstances.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-deaths', label: 'Premature deaths' },
          { id: 'sec-nhs-costs', label: 'NHS costs' },
          { id: 'sec-pm25', label: 'PM2.5 levels' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Premature deaths attributed to air pollution"
            value={latestDeaths ? latestDeaths.deaths.toLocaleString() : '28,900'}
            unit="per year (2024)"
            direction="down"
            polarity="up-is-bad"
            changeText={`Down ${deathsChange}% since 2003 · range 28,000–36,000 · cardiovascular and respiratory`}
            sparklineData={
              data ? sparkFrom(data.prematureDeaths.map(d => d.deaths)) : []
            }
            source="COMEAP · Long-term exposure mortality estimates, 2024"
            href="#sec-deaths"
          />
          <MetricCard
            label="Annual NHS cost of air pollution"
            value={latestCost ? `£${latestCost.costBillions.toFixed(1)}bn` : '£1.6bn'}
            unit="2024"
            direction="up"
            polarity="up-is-bad"
            changeText={`Up ${costChange}% since 2010 · hospitalisations, GP visits, medication`}
            sparklineData={
              data ? sparkFrom(data.nhsCosts.map(d => d.costBillions)) : []
            }
            source="PHE · Estimation of costs to the NHS and social care, 2024"
            href="#sec-nhs-costs"
          />
          <MetricCard
            label="PM2.5 reduction since 2003"
            value={`${pm25ReductionPct}%`}
            unit="national average"
            direction="down"
            polarity="up-is-bad"
            changeText={`${earliestPm25 ? earliestPm25.ugm3 : 15.2} → ${latestPm25 ? latestPm25.ugm3 : 7.0} µg/m³ · still 40% above WHO guideline of 5 µg/m³`}
            sparklineData={
              data ? sparkFrom(data.pm25Levels.map(d => d.ugm3)) : []
            }
            source="DEFRA · Air quality statistics, 2024"
            href="#sec-pm25"
          />
        </div>

        {/* Chart 1: Premature deaths */}
        <ScrollReveal>
          <div id="sec-deaths" className="mb-12">
            <LineChart
              series={deathsSeries}
              title="Premature deaths attributed to air pollution, England, 2003–2024"
              subtitle="Estimated annual mortality from long-term PM2.5 and NO2 exposure. Declining but still 28,000–36,000 per year."
              yLabel="Deaths"
              source={{
                name: 'COMEAP',
                dataset: 'Long-term exposure mortality estimates',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 2: NHS costs */}
        <ScrollReveal>
          <div id="sec-nhs-costs" className="mb-12">
            <LineChart
              series={nhsCostSeries}
              title="NHS and social care costs attributable to air pollution, 2010–2024"
              subtitle="Rising treatment burden despite improving air quality. Includes hospitalisations, GP visits, and prescriptions."
              yLabel="Cost (£ billions)"
              source={{
                name: 'Public Health England',
                dataset: 'Estimation of costs to the NHS and social care due to air pollution',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 3: PM2.5 vs WHO guideline */}
        <ScrollReveal>
          <div id="sec-pm25" className="mb-12">
            <LineChart
              series={pm25Series}
              title="PM2.5 annual mean concentration vs WHO guideline, 2003–2024"
              subtitle="National average has fallen 54% but remains 40% above the 2021 WHO guideline of 5 µg/m³."
              yLabel="µg/m³"
              source={{
                name: 'DEFRA',
                dataset: 'Air quality statistics — PM2.5 annual mean',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="54% PM2.5 reduction and Clean Air Zones delivering results"
            value="54% reduction"
            description="National average PM2.5 concentrations have fallen from 15.2 µg/m³ in 2003 to 7.0 µg/m³ in 2024 — a 54% reduction driven by tighter vehicle emission standards, the phase-out of coal power, and industrial regulation. Clean Air Zones in Birmingham, Bath, Bristol, Bradford, and Portsmouth have accelerated local improvements, with monitoring showing 10–20% NO2 reductions within the first year of operation. London's Ultra Low Emission Zone has contributed to a 44% reduction in roadside NO2 concentrations in central London since 2017. These are real, measurable gains — but the UK still exceeds the WHO guideline by 40%, and domestic wood burning is now the single largest source of PM2.5 emissions, partially offsetting progress from transport and industry."
            source="Source: DEFRA — Air quality statistics, 2024. COMEAP — Long-term exposure mortality estimates. PHE — Costs to NHS and social care."
          />
        </ScrollReveal>

        <RelatedTopics />
      </main>
    </>
  );
}
