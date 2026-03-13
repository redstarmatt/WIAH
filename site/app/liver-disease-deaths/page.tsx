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

interface DeathPoint {
  year: number;
  deaths: number;
}

interface RegionData {
  region: string;
  ratePerHundredThousand: number;
}

interface LiverDiseaseData {
  totalDeaths: DeathPoint[];
  prematureDeaths: DeathPoint[];
  alcoholRelated: DeathPoint[];
  byRegion: RegionData[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

function sparkFrom(arr: number[], n = 10) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function LiverDiseaseDeathsPage() {
  const [data, setData] = useState<LiverDiseaseData | null>(null);

  useEffect(() => {
    fetch('/data/liver-disease-deaths/liver_disease_deaths.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const totalSeries: Series[] = data
    ? [{
        id: 'total-deaths',
        label: 'Total liver disease deaths',
        colour: '#E63946',
        data: data.totalDeaths.map(d => ({
          date: yearToDate(d.year),
          value: d.deaths,
        })),
      }]
    : [];

  const prematureSeries: Series[] = data
    ? [{
        id: 'premature-deaths',
        label: 'Under-65 deaths',
        colour: '#E63946',
        data: data.prematureDeaths.map(d => ({
          date: yearToDate(d.year),
          value: d.deaths,
        })),
      }]
    : [];

  const alcoholSeries: Series[] = data
    ? [{
        id: 'alcohol-related',
        label: 'Alcohol-related liver deaths',
        colour: '#F4A261',
        data: data.alcoholRelated.map(d => ({
          date: yearToDate(d.year),
          value: d.deaths,
        })),
      }]
    : [];

  const latestTotal = data?.totalDeaths[data.totalDeaths.length - 1];
  const firstTotal = data?.totalDeaths[0];
  const peakTotal = data?.totalDeaths.reduce((a, b) => a.deaths > b.deaths ? a : b);
  const latestPremature = data?.prematureDeaths[data.prematureDeaths.length - 1];
  const firstPremature = data?.prematureDeaths[0];
  const latestAlcohol = data?.alcoholRelated[data.alcoholRelated.length - 1];
  const firstAlcohol = data?.alcoholRelated[0];

  const totalChange = latestTotal && firstTotal
    ? Math.round(((latestTotal.deaths - firstTotal.deaths) / firstTotal.deaths) * 100)
    : 39;

  const prematureChange = latestPremature && firstPremature
    ? Math.round(((latestPremature.deaths - firstPremature.deaths) / firstPremature.deaths) * 100)
    : 43;

  const alcoholChange = latestAlcohol && firstAlcohol
    ? Math.round(((latestAlcohol.deaths - firstAlcohol.deaths) / firstAlcohol.deaths) * 100)
    : 39;

  return (
    <>
      <TopicNav topic="Liver Disease Deaths" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Liver Disease Deaths"
          question="Why Are Liver Disease Deaths Rising?"
          finding="Liver disease deaths have risen by over 40% since 2001, driven by alcohol, obesity, and hepatitis, making the UK an outlier in Western Europe."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The UK is one of the only countries in Western Europe where liver disease deaths have been rising consistently. Since 2001, total deaths from liver disease have increased by around 39%, from 9,231 to 12,802 per year. The pandemic accelerated the trend sharply: increased alcohol consumption during lockdowns pushed annual deaths above 13,000 in 2021. While there has been a modest retreat since that peak, deaths remain far above the long-run trajectory that existed before COVID-19.</p>
            <p>Three factors drive the crisis. Alcohol-related liver disease accounts for roughly 45% of all liver deaths and has risen in step with cheap alcohol availability and a culture of heavy drinking that public health messaging has failed to dislodge. Non-alcoholic fatty liver disease (NAFLD), linked to obesity and type 2 diabetes, is the fastest-growing cause and now affects an estimated one in three UK adults, most of whom are undiagnosed. Viral hepatitis B and C, though now treatable, still causes preventable deaths because screening remains patchy and many infected people do not know their status.</p>
            <p>Premature liver deaths -- those in people under 65 -- have risen even faster, up 43% since 2001. This is distinctive: most other major causes of death in the UK have falling premature mortality rates. The regional pattern is stark, with mortality rates in the North East nearly double those in the South East, closely mirroring patterns of deprivation, alcohol harm, and obesity prevalence.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-total', label: 'Total deaths' },
          { id: 'sec-premature', label: 'Premature deaths' },
          { id: 'sec-alcohol', label: 'Alcohol-related' },
          { id: 'sec-regional', label: 'Regional' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Liver disease deaths per year"
            value={latestTotal ? latestTotal.deaths.toLocaleString() : '12,802'}
            unit="2024"
            direction="up"
            polarity="up-is-bad"
            changeText={`+${totalChange}% since 2001 · peaked at ${peakTotal ? peakTotal.deaths.toLocaleString() : '13,167'} in ${peakTotal ? peakTotal.year : 2021}`}
            sparklineData={
              data ? sparkFrom(data.totalDeaths.map(d => d.deaths)) : []
            }
            source="ONS · Death registrations, liver disease (ICD-10 K70-K77), 2024"
            href="#sec-total"
          />
          <MetricCard
            label="Under-65 liver deaths"
            value={latestPremature ? latestPremature.deaths.toLocaleString() : '4,071'}
            unit="2024"
            direction="up"
            polarity="up-is-bad"
            changeText={`+${prematureChange}% since 2001 · premature deaths rising fastest`}
            sparklineData={
              data ? sparkFrom(data.prematureDeaths.map(d => d.deaths)) : []
            }
            source="ONS · Death registrations by age, liver disease, 2024"
            href="#sec-premature"
          />
          <MetricCard
            label="Alcohol-related liver deaths"
            value={latestAlcohol ? latestAlcohol.deaths.toLocaleString() : '5,762'}
            unit="2024"
            direction="up"
            polarity="up-is-bad"
            changeText={`+${alcoholChange}% since 2001 · ~45% of all liver deaths`}
            sparklineData={
              data ? sparkFrom(data.alcoholRelated.map(d => d.deaths)) : []
            }
            source="ONS · Alcohol-specific deaths, England & Wales, 2024"
            href="#sec-alcohol"
          />
        </div>

        {/* Chart 1: Total liver disease deaths */}
        <ScrollReveal>
          <div id="sec-total" className="mb-12">
            <LineChart
              series={totalSeries}
              title="Liver disease deaths, England & Wales, 2001–2024"
              subtitle="Annual registered deaths from chronic liver disease (ICD-10 K70-K77). Sharp rise during pandemic."
              yLabel="Deaths"
              source={{
                name: 'ONS',
                dataset: 'Death registrations — liver disease',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 2: Premature deaths */}
        <ScrollReveal>
          <div id="sec-premature" className="mb-12">
            <LineChart
              series={prematureSeries}
              title="Premature liver disease deaths (under 65), 2001–2024"
              subtitle="Rising faster than total deaths. Unlike most major diseases, premature liver mortality is worsening."
              yLabel="Deaths"
              source={{
                name: 'ONS',
                dataset: 'Death registrations by age — liver disease',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 3: Alcohol-related */}
        <ScrollReveal>
          <div id="sec-alcohol" className="mb-12">
            <LineChart
              series={alcoholSeries}
              title="Alcohol-related liver disease deaths, 2001–2024"
              subtitle="Alcohol-related liver disease is the single largest cause, accounting for roughly 45% of liver deaths."
              yLabel="Deaths"
              source={{
                name: 'ONS',
                dataset: 'Alcohol-specific deaths, England & Wales',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 4: Regional variation */}
        <ScrollReveal>
          <div id="sec-regional" className="mb-12">
            <div className="bg-white rounded-lg border border-wiah-border p-8">
              <h2 className="text-lg font-bold text-wiah-black mb-2">
                Liver disease mortality rate by region (deaths per 100,000 population)
              </h2>
              <p className="text-sm text-wiah-mid mb-6">
                North East rates are nearly double those of the South East, closely mirroring deprivation patterns.
              </p>
              <div className="mt-6 space-y-4">
                {data?.byRegion.map((r) => {
                  const pct = (r.ratePerHundredThousand / 25) * 100;
                  return (
                    <div key={r.region}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-wiah-black">{r.region}</span>
                        <span className="font-mono text-sm font-bold text-wiah-black">{r.ratePerHundredThousand}</span>
                      </div>
                      <div className="h-6 bg-wiah-light rounded-sm overflow-hidden">
                        <div
                          className="h-full rounded-sm transition-all"
                          style={{ width: `${pct}%`, backgroundColor: r.ratePerHundredThousand >= 20 ? '#E63946' : r.ratePerHundredThousand >= 16 ? '#F4A261' : '#6B7280' }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="font-mono text-xs text-wiah-mid mt-4">Source: ONS — Age-standardised liver disease mortality by region, 2024</p>
            </div>
          </div>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Hepatitis C elimination within reach"
            value="95% cure rate"
            description="Direct-acting antiviral treatments now cure hepatitis C in over 95% of cases within 8-12 weeks. NHS England's hepatitis C elimination programme has treated over 57,000 people since 2015, and the UK is on track to eliminate hepatitis C as a public health threat by 2030, ahead of the WHO target. Opt-out testing in emergency departments and prisons has identified thousands of cases that would otherwise have gone undetected. If sustained, this will remove one of the three major drivers of liver disease mortality — though alcohol and obesity-related liver disease continue to rise."
            source="Source: NHS England — Hepatitis C elimination programme, 2024. WHO — Global hepatitis targets."
          />
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>Deaths data: ONS death registrations, England and Wales, coded to ICD-10 K70-K77 (diseases of the liver). Includes alcoholic liver disease (K70), fibrosis/cirrhosis (K74), and other liver diseases.</p>
            <p>Alcohol-specific deaths: ONS alcohol-specific deaths dataset, which uses the narrower definition of deaths wholly attributable to alcohol consumption.</p>
            <p>Regional rates: ONS age-standardised mortality rates by English region. Age standardisation uses the 2013 European Standard Population.</p>
            <p>Premature deaths defined as deaths in persons aged under 65, consistent with the NHS Outcomes Framework indicator 1.1.</p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
