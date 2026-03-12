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

interface PM25Point {
  year: number;
  ugm3: number;
}

interface NO2Point {
  year: number;
  ugm3: number;
}

interface DeathsPoint {
  year: number;
  count: number;
}

interface AirQualityData {
  pm25: PM25Point[];
  no2Roadside: NO2Point[];
  prematureDeaths: DeathsPoint[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

function sparkFrom(arr: number[], n = 10) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function AirQualityPage() {
  const [data, setData] = useState<AirQualityData | null>(null);

  useEffect(() => {
    fetch('/data/air-quality/air_quality.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const pm25Series: Series[] = data
    ? [{
        id: 'pm25',
        label: 'PM2.5 (population-weighted mean)',
        colour: '#2A9D8F',
        data: data.pm25.map(d => ({
          date: yearToDate(d.year),
          value: d.ugm3,
        })),
      }]
    : [];

  const no2Series: Series[] = data
    ? [{
        id: 'no2',
        label: 'NO\u2082 roadside annual mean',
        colour: '#264653',
        data: data.no2Roadside.map(d => ({
          date: yearToDate(d.year),
          value: d.ugm3,
        })),
      }]
    : [];

  const deathsSeries: Series[] = data
    ? [{
        id: 'deaths',
        label: 'Premature deaths attributable to air pollution',
        colour: '#E63946',
        data: data.prematureDeaths.map(d => ({
          date: yearToDate(d.year),
          value: d.count,
        })),
      }]
    : [];

  const latestPM25 = data?.pm25[data.pm25.length - 1];
  const earliestPM25 = data?.pm25[0];
  const latestNO2 = data?.no2Roadside[data.no2Roadside.length - 1];
  const earliestNO2 = data?.no2Roadside[0];
  const latestDeaths = data?.prematureDeaths[data.prematureDeaths.length - 1];
  const earliestDeaths = data?.prematureDeaths[0];

  const pm25Reduction = earliestPM25 && latestPM25
    ? Math.round(((earliestPM25.ugm3 - latestPM25.ugm3) / earliestPM25.ugm3) * 100)
    : 37;

  const no2Reduction = earliestNO2 && latestNO2
    ? Math.round(((earliestNO2.ugm3 - latestNO2.ugm3) / earliestNO2.ugm3) * 100)
    : 52;

  const deathsReduction = earliestDeaths && latestDeaths
    ? Math.round(((earliestDeaths.count - latestDeaths.count) / earliestDeaths.count) * 100)
    : 26;

  return (
    <>
      <TopicNav topic="Environment & Climate" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Environment & Climate"
          question="Is the air you breathe actually getting cleaner?"
          finding="PM2.5 concentrations have fallen 37% since 2010 to their lowest recorded level. But at 7.2 micrograms per cubic metre, the UK still exceeds the WHO guideline of 5 &mu;g/m&sup3; &mdash; and people in the most deprived areas breathe the worst air."
          colour="#2A9D8F"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The UK&rsquo;s air is cleaner than at any point since industrialisation. Fine particulate matter (PM2.5) &mdash; the pollutant most dangerous to human health, small enough to cross from lungs into the bloodstream &mdash; has fallen 37% since 2010, reaching a population-weighted annual mean of 7.2 micrograms per cubic metre in 2024. Nitrogen dioxide (NO&#8322;), overwhelmingly a product of road traffic, has halved at roadside monitoring stations over the same period. These are real, measurable improvements driven by tighter vehicle emissions standards, the phasing out of coal power, and the introduction of Clean Air Zones in cities including Birmingham, Bristol, Bath, and Bradford. London&rsquo;s Ultra Low Emission Zone (ULEZ), expanded city-wide in August 2023, has contributed to a 20% reduction in roadside NO&#8322; concentrations within its boundary. The estimated number of premature deaths attributable to air pollution in England has fallen from around 39,000 in 2010 to 29,000 in 2024 &mdash; still an enormous number, but the trend is firmly downward.</p>
            <p>Yet the picture is far from resolved. The UK&rsquo;s legal annual mean limit for PM2.5 is 20 micrograms per cubic metre &mdash; four times the World Health Organisation guideline of 5 &mu;g/m&sup3;, which was revised downward in 2021 based on evidence that no level of PM2.5 exposure is truly safe. The landmark 2020 coroner&rsquo;s ruling in the death of nine-year-old Ella Adoo-Kissi-Debrah &mdash; the first person in the UK to have air pollution listed as a cause of death &mdash; found that unlawful levels of NO&#8322; near her south London home had contributed to her fatal asthma attack. Her case forced a national reckoning: the Environment Act 2021 now requires the government to set a legally binding PM2.5 target, but the chosen level of 10 &mu;g/m&sup3; by 2040 still falls short of what the WHO considers safe. Research by Imperial College London estimates that meeting the WHO guideline would prevent an additional 17,000 premature deaths annually.</p>
            <p>Domestic wood burning has emerged as a significant and growing source of PM2.5, contributing an estimated 17% of the UK&rsquo;s total &mdash; more than road transport. This is largely unregulated in most areas and disproportionately affects neighbourhoods where wood burners are popular. Indoor air quality remains a regulatory blind spot: poorly ventilated homes, particularly newer builds designed for energy efficiency, can trap pollutants at concentrations several times higher than outdoor levels. And the environmental justice dimension is stark. DEFRA&rsquo;s own analysis shows that communities in the most deprived 10% of areas experience PM2.5 concentrations 15&ndash;20% higher than the least deprived, owing to proximity to major roads, industrial sites, and waste facilities. The air is getting cleaner on average, but the gains are not equally shared &mdash; and &ldquo;better than before&rdquo; is not the same as safe.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-pm25', label: 'PM2.5 trend' },
          { id: 'sec-no2', label: 'NO\u2082 roadside' },
          { id: 'sec-deaths', label: 'Premature deaths' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="PM2.5 concentration (annual mean)"
            value={latestPM25 ? latestPM25.ugm3.toFixed(1) : '7.2'}
            unit={'\u00b5g/m\u00b3'}
            direction="down"
            polarity="up-is-bad"
            changeText={`Down ${pm25Reduction}% since 2010 \u00b7 lowest recorded \u00b7 WHO guideline: 5 \u00b5g/m\u00b3`}
            sparklineData={
              data ? sparkFrom(data.pm25.map(d => d.ugm3)) : []
            }
            source="DEFRA \u00b7 Air Quality Statistics, 2024"
            href="#sec-pm25"
          />
          <MetricCard
            label="NO\u2082 roadside annual mean"
            value={latestNO2 ? latestNO2.ugm3.toFixed(1) : '23.1'}
            unit={'\u00b5g/m\u00b3'}
            direction="down"
            polarity="up-is-bad"
            changeText={`Down ${no2Reduction}% since 2010 \u00b7 driven by cleaner vehicles and Clean Air Zones`}
            sparklineData={
              data ? sparkFrom(data.no2Roadside.map(d => d.ugm3)) : []
            }
            source="DEFRA \u00b7 Automatic Urban and Rural Network, 2024"
            href="#sec-no2"
          />
          <MetricCard
            label="Premature deaths (air pollution)"
            value={latestDeaths ? (latestDeaths.count / 1000).toFixed(0) + 'K' : '29K'}
            unit="2024"
            direction="down"
            polarity="up-is-bad"
            changeText={`Down ${deathsReduction}% since 2010 \u00b7 still 29,000 preventable deaths annually`}
            sparklineData={
              data ? sparkFrom(data.prematureDeaths.map(d => d.count)) : []
            }
            source="COMEAP \u00b7 Mortality Effects of Long-Term Exposure, 2024"
            href="#sec-deaths"
          />
        </div>

        {/* Chart 1: PM2.5 national trend */}
        <ScrollReveal>
          <div id="sec-pm25" className="mb-12">
            <LineChart
              series={pm25Series}
              title="PM2.5 population-weighted annual mean concentration, England, 2010–2024"
              subtitle="Fine particulate matter (\u00b5g/m\u00b3). Falling steadily but still above WHO guideline of 5 \u00b5g/m\u00b3."
              yLabel={'\u00b5g/m\u00b3'}
              source={{
                name: 'DEFRA',
                dataset: 'Air Quality Statistics \u2014 PM2.5',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 2: NO2 roadside trend */}
        <ScrollReveal>
          <div id="sec-no2" className="mb-12">
            <LineChart
              series={no2Series}
              title="NO\u2082 roadside annual mean concentration, England, 2010–2024"
              subtitle="Nitrogen dioxide at automatic urban monitoring stations. Halved since 2010; ULEZ and Clean Air Zones accelerating decline."
              yLabel={'\u00b5g/m\u00b3'}
              source={{
                name: 'DEFRA',
                dataset: 'Automatic Urban and Rural Network (AURN)',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 3: Premature deaths */}
        <ScrollReveal>
          <div id="sec-deaths" className="mb-12">
            <LineChart
              series={deathsSeries}
              title="Estimated premature deaths attributable to air pollution, England, 2010–2024"
              subtitle="Deaths linked to long-term PM2.5 and NO\u2082 exposure. Down 26% but still around 29,000 per year."
              yLabel="Deaths"
              source={{
                name: 'COMEAP / Imperial College London',
                dataset: 'Mortality Effects of Long-Term Exposure to Air Pollution',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Clean Air Zones and ULEZ delivering measurable results"
            value="37% PM2.5 reduction"
            description="PM2.5 concentrations have fallen 37% since 2010, driven by the transition away from coal power, tighter Euro emissions standards for vehicles, and the introduction of Clean Air Zones. London's ULEZ expansion in August 2023 reduced roadside NO\u2082 by 20% within its boundary. Birmingham, Bristol, Bath, and Bradford have all implemented Clean Air Zones with measurable improvements in local air quality. These interventions demonstrate that targeted policy action works — but meeting the WHO guideline of 5 \u00b5g/m\u00b3 will require tackling domestic wood burning, agricultural ammonia emissions, and the environmental justice gap that leaves the most deprived communities breathing the worst air."
            source="Source: DEFRA — Air Quality Statistics, 2024. Imperial College London — Health Impact Assessment of ULEZ Expansion, 2024. WHO — Global Air Quality Guidelines, 2021."
          />
        </ScrollReveal>
        <RelatedTopics />
      </main>
    </>
  );
}
