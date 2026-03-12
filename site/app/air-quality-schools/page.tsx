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

interface WHOPoint {
  year: number;
  schools: number;
}

interface NO2Point {
  year: number;
  ugm3: number;
}

interface SchoolStreetsPoint {
  year: number;
  schemes: number;
}

interface ChildrenAtRiskPoint {
  year: number;
  millions: number;
}

interface AirQualitySchoolsData {
  schoolsExceedingWHO: WHOPoint[];
  no2AtSchoolGates: NO2Point[];
  schoolStreetsRollout: SchoolStreetsPoint[];
  childrenAtRisk: ChildrenAtRiskPoint[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

function sparkFrom(arr: number[], n = 10) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function AirQualitySchoolsPage() {
  const [data, setData] = useState<AirQualitySchoolsData | null>(null);

  useEffect(() => {
    fetch('/data/air-quality-schools/air_quality_schools.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const whoSeries: Series[] = data
    ? [{
        id: 'schools-who',
        label: 'Schools exceeding WHO guidelines',
        colour: '#E63946',
        data: data.schoolsExceedingWHO.map(d => ({
          date: yearToDate(d.year),
          value: d.schools,
        })),
      }]
    : [];

  const no2Series: Series[] = data
    ? [{
        id: 'no2-school-gates',
        label: 'NO\u2082 at school gates (\u00b5g/m\u00b3)',
        colour: '#F4A261',
        data: data.no2AtSchoolGates.map(d => ({
          date: yearToDate(d.year),
          value: d.ugm3,
        })),
      }]
    : [];

  const schoolStreetsSeries: Series[] = data
    ? [{
        id: 'school-streets',
        label: 'School Streets schemes',
        colour: '#2A9D8F',
        data: data.schoolStreetsRollout.map(d => ({
          date: yearToDate(d.year),
          value: d.schemes,
        })),
      }]
    : [];

  const latestWHO = data?.schoolsExceedingWHO[data.schoolsExceedingWHO.length - 1];
  const peakWHO = data?.schoolsExceedingWHO[0];
  const latestChildren = data?.childrenAtRisk[data.childrenAtRisk.length - 1];
  const peakChildren = data?.childrenAtRisk[0];
  const latestNO2 = data?.no2AtSchoolGates[data.no2AtSchoolGates.length - 1];
  const peakNO2 = data?.no2AtSchoolGates[0];

  const whoChange = latestWHO && peakWHO
    ? Math.round(((peakWHO.schools - latestWHO.schools) / peakWHO.schools) * 100)
    : 56;

  return (
    <>
      <TopicNav topic="Environment & Climate" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Environment & Climate"
          question="Are children breathing safe air at school?"
          finding="Over 2,500 schools in England still exceed WHO air quality guidelines, exposing 1.1 million children to pollution levels linked to asthma, stunted lung growth, and reduced cognitive performance. But the trend is improving — School Streets schemes and ULEZ expansion are driving measurable reductions at the school gate."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Children are not small adults when it comes to air pollution. Their lungs are still developing, they breathe faster relative to body weight, and they are closer to exhaust-pipe height. A child walking to school inhales proportionally more nitrogen dioxide and particulate matter than the parent holding their hand. This biological vulnerability makes the air quality around schools a frontline public health issue, not an abstract environmental concern. The evidence linking childhood exposure to NO2 and PM2.5 with asthma onset, reduced lung capacity, and impaired cognitive development is now robust and largely uncontested in the medical literature. In 2020, nine-year-old Ella Adoo-Kissi-Debrah became the first person in the UK to have air pollution listed as a cause of death, after a coroner found that unlawful levels of pollution near her home in Lewisham contributed to her fatal asthma attack. Ella&#39;s Law, which would enshrine the right to breathe clean air as a human right, remains under parliamentary consideration.</p>
            <p>The school run itself is a significant contributor. At morning drop-off, concentrations of NO2 and particulate matter at school gates can exceed nearby roadside monitors by 20-30%, driven by idling vehicles, congestion in narrow residential streets, and the sheer concentration of cars in a short window. Anti-idling campaigns have raised awareness but enforcement remains patchy and voluntary compliance is inconsistent. The most effective intervention has been the School Streets programme, which restricts motor traffic on roads outside schools during drop-off and pick-up times. Launched in a handful of London boroughs in 2017, the scheme has expanded to over 500 sites nationally by 2024. Monitoring data from Transport for London and the Clean Air Fund shows NO2 reductions of 23% on average at School Streets locations, with some sites recording drops of over 30%. More significantly, a 2023 study by researchers at Imperial College London found that paediatric asthma admissions at hospitals near School Streets clusters declined at a faster rate than the London-wide average, suggesting a measurable health dividend.</p>
            <p>The expansion of London&#39;s Ultra Low Emission Zone to cover all London boroughs in August 2023 has contributed to a broader improvement in school-gate air quality across the capital. DEFRA monitoring shows that the number of schools exceeding WHO NO2 guidelines in London fell by 40% between 2019 and 2024. However, the picture outside London is more mixed. Schools near major road junctions in Birmingham, Manchester, Leeds, and Bristol continue to record NO2 levels well above WHO thresholds. There is a stark deprivation gradient: schools in the most deprived 20% of areas are three times more likely to exceed pollution limits than schools in the least deprived 20%. Children who are already disadvantaged by poverty are disproportionately breathing the worst air — a compounding inequality that shows up in asthma admission rates, school absence data, and attainment gaps. The declining national trend is real and welcome, but it is unevenly distributed, and for hundreds of thousands of children attending schools beside busy roads in deprived areas, the air they breathe every day is still making them ill.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-who', label: 'WHO exceedances' },
          { id: 'sec-no2', label: 'NO\u2082 levels' },
          { id: 'sec-streets', label: 'School Streets' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Schools near illegal air pollution"
            value={latestWHO ? latestWHO.schools.toLocaleString() : '2,552'}
            unit="2024"
            direction="down"
            polarity="up-is-bad"
            changeText={`Down ${whoChange}% since 2015 \u00b7 still ${latestWHO ? latestWHO.schools.toLocaleString() : '2,552'} schools above WHO limits`}
            sparklineData={
              data ? sparkFrom(data.schoolsExceedingWHO.map(d => d.schools)) : []
            }
            source="DEFRA \u00b7 Automatic Urban and Rural Network, 2024"
            href="#sec-who"
          />
          <MetricCard
            label="Children at risk"
            value={latestChildren ? `${latestChildren.millions}m` : '1.1m'}
            unit="2024"
            direction="down"
            polarity="up-is-bad"
            changeText={
              latestChildren && peakChildren
                ? `Down from ${peakChildren.millions}m in 2015 \u00b7 disproportionately in deprived areas`
                : 'Down from 2.6m in 2015 \u00b7 disproportionately in deprived areas'
            }
            sparklineData={
              data ? sparkFrom(data.childrenAtRisk.map(d => d.millions * 1000)) : []
            }
            source="Clean Air Fund \u00b7 Schools Air Quality Analysis, 2024"
            href="#sec-no2"
          />
          <MetricCard
            label="Average NO\u2082 at school gates"
            value={latestNO2 ? `${latestNO2.ugm3}` : '26.3'}
            unit={'\u00b5g/m\u00b3 \u00b7 2024'}
            direction="down"
            polarity="up-is-bad"
            changeText={
              latestNO2 && peakNO2
                ? `Down ${Math.round(((peakNO2.ugm3 - latestNO2.ugm3) / peakNO2.ugm3) * 100)}% since 2015 \u00b7 WHO guideline: 10 \u00b5g/m\u00b3`
                : 'Down 40% since 2015 \u00b7 WHO guideline: 10 \u00b5g/m\u00b3'
            }
            sparklineData={
              data ? sparkFrom(data.no2AtSchoolGates.map(d => d.ugm3)) : []
            }
            source="GLA \u00b7 London Air Quality Network / DEFRA AURN, 2024"
            href="#sec-streets"
          />
        </div>

        {/* Chart 1: Schools exceeding WHO guidelines */}
        <ScrollReveal>
          <div id="sec-who" className="mb-12">
            <LineChart
              series={whoSeries}
              title="Schools exceeding WHO air quality guidelines, England, 2015\u20132024"
              subtitle="Number of schools where annual mean NO&#x2082; or PM2.5 exceeds WHO recommended limits. Falling steadily but still over 2,500."
              yLabel="Schools"
              source={{
                name: 'DEFRA',
                dataset: 'Automatic Urban and Rural Network / Clean Air Fund analysis',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 2: NO2 at school gates */}
        <ScrollReveal>
          <div id="sec-no2" className="mb-12">
            <LineChart
              series={no2Series}
              title="Average NO\u2082 concentration at school gates, England, 2015\u20132024"
              subtitle="Mean annual nitrogen dioxide (\u00b5g/m\u00b3) measured at school-adjacent monitoring sites. WHO guideline is 10 \u00b5g/m\u00b3."
              yLabel={'\u00b5g/m\u00b3'}
              source={{
                name: 'DEFRA / GLA',
                dataset: 'London Air Quality Network & AURN school-adjacent monitors',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 3: School Streets rollout */}
        <ScrollReveal>
          <div id="sec-streets" className="mb-12">
            <LineChart
              series={schoolStreetsSeries}
              title="School Streets schemes in operation, England, 2019\u20132024"
              subtitle="Cumulative number of School Streets \u2014 timed road closures outside schools during drop-off and pick-up."
              yLabel="Schemes"
              source={{
                name: 'Clean Air Fund / Transport for London',
                dataset: 'School Streets Programme Data',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="School Streets \u2014 cleaner air, fewer asthma admissions"
            value="527 schemes"
            description="Over 500 School Streets schemes are now operating across England, restricting motor traffic outside schools during drop-off and pick-up times. Monitoring by the Clean Air Fund and Transport for London shows average NO2 reductions of 23% at School Streets locations. A 2023 Imperial College London study found that paediatric asthma hospital admissions near School Streets clusters declined faster than the London-wide average. The programme costs local authorities relatively little to implement \u2014 typically temporary signage and part-time enforcement \u2014 yet delivers measurable improvements in air quality and children&#39;s respiratory health. Asthma + Lung UK reports that childhood asthma admissions across London have fallen 12% since 2019, with the steepest declines in boroughs with the highest School Streets coverage."
            source="Source: Clean Air Fund \u2014 School Streets Monitoring Report, 2024. Imperial College London \u2014 School Streets and Respiratory Outcomes, 2023. Asthma + Lung UK \u2014 Childhood Asthma Trends, 2024."
          />
        </ScrollReveal>
        <RelatedTopics />
      </main>
    </>
  );
}
