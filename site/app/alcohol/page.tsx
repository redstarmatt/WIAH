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

interface AlcoholData {
  national: {
    hospitalAdmissions: {
      timeSeries: Array<{ year: number; admissionsThousands: number }>;
      latestYear: number;
      latestThousands: number;
    };
    deaths: {
      timeSeries: Array<{ year: number; deathsCount: number }>;
      latestYear: number;
      latestCount: number;
    };
    consumptionByType: Array<{ drinkType: string; unitsPerWeek: number }>;
    drinkingAboveGuidelines: {
      latestPct: number;
    };
  };
  metadata: {
    sources: Array<{ name: string; dataset: string; url: string; frequency: string }>;
    methodology: string;
    knownIssues: string[];
  };
}

// ── Component ────────────────────────────────────────────────────────────────

export default function AlcoholPage() {
  const [data, setData] = useState<AlcoholData | null>(null);

  useEffect(() => {
    fetch('/data/alcohol/alcohol.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // Derive series for hospital admissions chart (convert thousands to actual numbers for display)
  const admissionsSeries: Series[] = data
    ? [
        {
          id: 'hospital-admissions',
          label: 'Hospital admissions',
          colour: '#F4A261',
          data: data.national.hospitalAdmissions.timeSeries.map(d => ({
            date: new Date(d.year, 0, 1),
            value: d.admissionsThousands * 1000,
          })),
        },
      ]
    : [];

  // Derive series for deaths chart
  const deathsSeries: Series[] = data
    ? [
        {
          id: 'alcohol-deaths',
          label: 'Alcohol-specific deaths',
          colour: '#E63946',
          data: data.national.deaths.timeSeries.map(d => ({
            date: new Date(d.year, 0, 1),
            value: d.deathsCount,
          })),
        },
      ]
    : [];

  const deathsAnnotations: Annotation[] = [
    {
      date: new Date(2020, 5, 1),
      label: '2020: COVID — off-trade surge',
    },
  ];

  return (
    <>
      <TopicNav topic="Alcohol" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Alcohol"
          question="Is Britain Actually Drinking Less?"
          finding="Alcohol-related hospital admissions have risen to 980,000 a year &mdash; up 17% since 2010. Over 8,000 people die from alcohol-specific causes each year. Per-capita consumption has fallen since the 2004 peak but remains one of the highest in Europe. Alcohol costs the NHS &pound;3.5 billion annually."
          colour="#F4A261"
          preposition="with"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Britain is consuming less alcohol than it did in 2004, when per-capita consumption peaked, yet the health toll keeps rising. Alcohol-specific deaths in England and Wales reached 8,274 in 2023 &mdash; up 24% since 2010 &mdash; driven by alcoholic liver disease, which has a long latency: the drinkers dying today were drinking heavily in the 2000s. Hospital admissions where alcohol was the primary or secondary diagnosis reached 980,000 in 2022/23, up 17% from 839,000 in 2010, and now cost the NHS an estimated &pound;3.5 billion a year. The heaviest 10% of drinkers consume more than 60% of all alcohol sold; it is their ill-health that dominates the statistics even as moderate drinkers cut back.</p>
            <p>Around 21% of English adults &mdash; roughly 11 million people &mdash; drink above the Chief Medical Officers&apos; guideline of 14 units a week; men at 24%, women at 18%. The COVID-19 pandemic produced a sharp spike in alcohol mortality: deaths peaked at 9,641 in 2021 as off-licence sales surged, hospital services were constrained, and previously dependent drinkers went without clinical support. Deaths have since fallen back to 8,274 but remain well above pre-pandemic levels. There are marked socioeconomic gradients: alcohol-specific death rates in the most deprived areas of England are more than twice those in the least deprived, a disparity that has widened since 2010.</p>
            </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-admissions', label: 'Admissions' },
          { id: 'sec-deaths', label: 'Deaths' },
          { id: 'sec-consumption', label: 'Consumption' },
        ]} />

        <ScrollReveal>
          <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Alcohol-specific deaths (England &amp; Wales)"
              value="8,274"
              direction="up"
              polarity="up-is-bad"
              changeText="2023 &middot; Up from 6,669 in 2010 &middot; Peaked at 9,641 in 2021 &middot; COVID drove sharp spike"
              sparklineData={[6669, 6880, 6490, 6592, 6831, 7366, 7327, 7697, 7551, 7565, 8974, 9641, 8209, 8274]}
              href="#sec-admissions"
            />
            <MetricCard
              label="Alcohol-related hospital admissions"
              value="980K"
              direction="up"
              polarity="up-is-bad"
              changeText="2022/23 &middot; Up 17% since 2010 &middot; Alcohol liver disease the primary cause &middot; NHS cost &pound;3.5bn/year"
              sparklineData={[839, 865, 884, 904, 916, 925, 930, 940, 950, 955, 890, 960, 975, 980]}
              href="#sec-admissions"
            />
            <MetricCard
              label="Adults drinking above guidelines (weekly)"
              value="21%"
              direction="flat"
              polarity="up-is-bad"
              changeText="2023 &middot; Guidelines: 14 units/week &middot; Men 24%, Women 18% &middot; Heaviest 10% drink 60%+ of all alcohol"
              sparklineData={[26, 25, 24, 23, 23, 22, 22, 21, 21, 21, 19, 20, 21, 21]}
              href="#sec-admissions"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-admissions" className="mb-12">
            <LineChart
              title="Alcohol-related hospital admissions, 2010&ndash;2023"
              subtitle="All admissions where alcohol was the primary or secondary diagnosis, England"
              series={admissionsSeries}
              yLabel="Admissions"
              source={{
                name: 'NHS Digital',
                dataset: 'Hospital Admissions Statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-deaths" className="mb-12">
            <LineChart
              title="Alcohol-specific deaths, 2010&ndash;2023"
              subtitle="England &amp; Wales, ICD-10 codes entirely attributable to alcohol"
              series={deathsSeries}
              yLabel="Deaths per year"
              annotations={deathsAnnotations}
              source={{
                name: 'ONS',
                dataset: 'Alcohol-specific deaths in the UK',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-consumption" className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-2">Alcohol consumption by drink type</h2>
            <p className="text-sm text-wiah-mid font-mono mb-6">Average units per week consumed, adults who drink, England 2023.</p>
            {data && (
              <div className="space-y-3">
                {data.national.consumptionByType.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-32 text-sm text-wiah-black flex-shrink-0">{item.drinkType}</div>
                    <div className="flex-1 bg-wiah-border rounded h-5 overflow-hidden">
                      <div
                        className="h-full rounded"
                        style={{ width: `${(item.unitsPerWeek / 6) * 100}%`, backgroundColor: '#F4A261' }}
                      />
                    </div>
                    <div className="w-16 text-right text-sm font-mono text-wiah-black">{item.unitsPerWeek.toFixed(1)}</div>
                  </div>
                ))}
              </div>
            )}
            <p className="font-mono text-xs text-wiah-mid mt-4">Source: Health Survey for England &mdash; self-reported alcohol consumption</p>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="What&apos;s improving"
            value="&ndash;18%"
            unit="fall in per-capita alcohol consumption since 2004 peak"
            description="Alcohol consumption per capita has fallen 18% since the 2004 peak, driven by falling drinking among young people &mdash; 26% of 16&ndash;24 year olds now report not drinking at all, up from 18% in 2005. Minimum unit pricing (MUP) was introduced in Scotland at 50p per unit in 2018 and in Wales in 2020; Public Health Scotland&apos;s evaluation found a 13% reduction in alcohol-specific deaths in year one. England has not yet adopted MUP. The alcohol duty reform of 2023 simplified the tax structure and introduced a new lower rate for drinks below 3.5% ABV, incentivising lower-strength products."
            source="Source: ONS &mdash; Alcohol-specific deaths in the UK 2023; NHS Digital &mdash; Statistics on Alcohol 2023."
          />
        </ScrollReveal>

        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
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
