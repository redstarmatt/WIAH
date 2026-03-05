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

interface DrugDeathPoint {
  year: number;
  poisoningDeaths: number;
}

interface AlcoholDeathPoint {
  year: number;
  alcoholSpecificDeaths: number;
}

interface TreatmentPoint {
  year: string;
  inTreatmentThousands: number;
  successfullyCompletedThousands: number;
}

interface PrevalencePoint {
  year: number;
  drugUsePast12mPct: number;
}

interface DrugsData {
  national: {
    drugDeaths: { timeSeries: DrugDeathPoint[] };
    alcoholDeaths: { timeSeries: AlcoholDeathPoint[] };
    treatmentEngagement: { timeSeries: TreatmentPoint[] };
    prevalence: { timeSeries: PrevalencePoint[] };
  };
  metadata: {
    sources: { name: string; dataset: string; url: string; frequency: string }[];
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

function fyToDate(fy: string): Date {
  const start = parseInt(fy.split('/')[0]);
  return new Date(start, 3, 1);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function DrugsPage() {
  const [data, setData] = useState<DrugsData | null>(null);

  useEffect(() => {
    fetch('/data/drugs/drugs.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Series ───────────────────────────────────────────────────────────────

  const drugDeathSeries: Series[] = data
    ? [{
        id: 'drug-deaths',
        label: 'Drug poisoning deaths',
        colour: '#E63946',
        data: data.national.drugDeaths.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.poisoningDeaths,
        })),
      }]
    : [];

  const alcoholDeathSeries: Series[] = data
    ? [{
        id: 'alcohol-deaths',
        label: 'Alcohol-specific deaths',
        colour: '#F4A261',
        data: data.national.alcoholDeaths.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.alcoholSpecificDeaths,
        })),
      }]
    : [];

  const treatmentSeries: Series[] = data
    ? [
        {
          id: 'in-treatment',
          label: 'In treatment (thousands)',
          colour: '#264653',
          data: data.national.treatmentEngagement.timeSeries.map(d => ({
            date: fyToDate(d.year),
            value: d.inTreatmentThousands,
          })),
        },
        {
          id: 'completed-treatment',
          label: 'Completed treatment (thousands)',
          colour: '#2A9D8F',
          data: data.national.treatmentEngagement.timeSeries.map(d => ({
            date: fyToDate(d.year),
            value: d.successfullyCompletedThousands,
          })),
        },
      ]
    : [];

  const prevalenceSeries: Series[] = data
    ? [{
        id: 'prevalence',
        label: 'Drug use (past 12 months, %)',
        colour: '#E63946',
        data: data.national.prevalence.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.drugUsePast12mPct,
        })),
      }]
    : [];

  const drugDeathAnnotations: Annotation[] = [
    { date: new Date(2017, 5, 1), label: '2017: Record high' },
  ];

  const alcoholAnnotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: '2020: COVID surge' },
  ];

  const treatmentAnnotations: Annotation[] = [
    { date: new Date(2014, 3, 1), label: '2013-20: Funding cuts' },
  ];

  // ── Metric cards ──────────────────────────────────────────────────────────

  const drugDeathsSparkline = data
    ? data.national.drugDeaths.timeSeries.slice(-10).map(d => d.poisoningDeaths)
    : [];

  const alcoholDeathsSparkline = data
    ? [6276, 6905, 6669, 6831, 7327, 7551, 8974, 9641, 10048]
    : [];

  const treatmentSparkline = data
    ? data.national.treatmentEngagement.timeSeries.map(d => d.inTreatmentThousands)
    : [];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Drugs & Alcohol" />
      <main>
        <TopicHeader
          topic="Drugs & Alcohol"
          question="What Is Addiction Actually Doing to Britain?"
          finding="Drug poisoning deaths reached 4,907 in 2023—a record high. Alcohol deaths surged to 10,048. But treatment access, starved of funding for years, is finally recovering."
          colour="#6B7280"
        />

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-context', label: 'Context' },
          { id: 'sec-improving', label: 'What&apos;s Improving' },
        ]} />

        {/* Metric cards */}
        <section className="max-w-5xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <ScrollReveal>
            <MetricCard
              label="Drug poisoning deaths"
              value="4,907"
              direction="up"
              polarity="up-is-bad"
              changeText="2023 · Record high · Up 166% since 2004 · Opioids dominant"
              sparklineData={drugDeathsSparkline}
              source="Source: ONS, 2023"
            />
          </ScrollReveal>
          <ScrollReveal>
            <MetricCard
              label="Alcohol-specific deaths"
              value="10,048"
              direction="up"
              polarity="up-is-bad"
              changeText="2023 · Record high · Pandemic caused lasting increase · Liver disease main cause"
              sparklineData={alcoholDeathsSparkline}
              source="Source: ONS, 2023"
            />
          </ScrollReveal>
          <ScrollReveal>
            <MetricCard
              label="In drug/alcohol treatment"
              value="298,700"
              direction="up"
              polarity="up-is-good"
              changeText="2023/24 · Rising after decade of cuts · Successful completions up to 39,200"
              sparklineData={treatmentSparkline}
              source="Source: OHID, 2023/24"
            />
          </ScrollReveal>
        </section>

        {/* Charts */}
        <section id="sec-overview" className="max-w-5xl mx-auto px-6 py-16 space-y-12">
          <ScrollReveal>
            <LineChart
              title="Drug poisoning deaths, England and Wales, 2004–2023"
              subtitle="All drug-related poisoning deaths. At 4,907 in 2023, this is the highest ever recorded — more than double the 2004 level. Opioids (heroin, morphine, fentanyl) account for the majority."
              series={drugDeathSeries}
              annotations={drugDeathAnnotations}
            />
          </ScrollReveal>

          <ScrollReveal>
            <LineChart
              title="Alcohol-specific deaths, UK, 2004–2023"
              subtitle="Deaths from conditions wholly attributable to alcohol. Surged during COVID as heavy drinkers had less healthcare contact. At 10,048 in 2023, this is the highest on record."
              series={alcoholDeathSeries}
              annotations={alcoholAnnotations}
            />
          </ScrollReveal>

          <ScrollReveal>
            <LineChart
              title="Adults in drug and alcohol treatment, 2014–2024"
              subtitle="Thousands of adults in structured drug and alcohol treatment services. Declined as funding was cut from 2013 to 2020; now recovering. Successful completions also rising."
              series={treatmentSeries}
              annotations={treatmentAnnotations}
            />
          </ScrollReveal>

          <ScrollReveal>
            <LineChart
              title="Drug use prevalence, 2010–2023"
              subtitle="Percentage of adults aged 16–59 who used any illegal drug in the last 12 months. Stable at around 9% for a decade, but concealing a shift in drug types."
              series={prevalenceSeries}
            />
          </ScrollReveal>
        </section>

        {/* Context */}
        <section id="sec-context" className="bg-wiah-light py-16 px-6">
          <div className="max-w-3xl mx-auto prose prose-lg">
            <h2>What&apos;s driving these trends?</h2>

            <p>
              Drug poisoning deaths in England and Wales hit 4,907 in 2023 &mdash; 166% higher than the 1,843 recorded in 2004. Opioids account for roughly 52% of all drug deaths: heroin and morphine alone killed 2,219 people, and synthetic opioids including fentanyl are rising fast. Scotland recorded 1,051 deaths in 2022, a rate 3.7 times the England and Wales figure per capita and the highest in Europe. Most deaths occur among people aged 35&ndash;54 &mdash; a cohort effect tracing back to the 1980s heroin wave, now compounded by decades of poverty, poor health, and polydrug use. Alcohol-specific deaths reached 10,048 across the UK in 2023 &mdash; a record &mdash; with the 2020&ndash;22 surge driven by heavy drinkers isolated during lockdowns; deaths have remained elevated even as the pandemic ended. NICE estimates around 800,000 people in the UK have severe drug or alcohol problems; only about 300,000 are in treatment, a gap of roughly 500,000, reflecting a 40% real-terms funding cut between 2013 and 2020.
            </p>

            <p>
              The government&apos;s 2021 strategy, From Harm to Hope, committed &pound;780 million over three years, shifting emphasis toward recovery rather than maintenance prescribing. Treatment numbers are climbing: 298,700 adults were in structured treatment in 2023/24. Naloxone became available without prescription from pharmacies in 2023, a measure that could prevent thousands of deaths annually if distribution reaches the people most at risk. In some local authority areas up to 40&percnt; of drug poisoning deaths involve people with no fixed abode, and when heroin supply is disrupted users switch to more dangerous alternatives &mdash; synthetic opioids, illicit benzodiazepines &mdash; multiplying overdose risk. Supervised drug consumption rooms, supported by more than 200 facilities worldwide with consistent evidence of reduced overdose deaths, remain legally impossible in the UK; the Scottish Government has sought to pilot one in Glasgow since 2017, but no legislative amendment has been forthcoming from Westminster.
            </p>
          </div>
        </section>

        {/* Positive callout */}
        <section id="sec-improving" className="max-w-5xl mx-auto px-6 py-16">
          <ScrollReveal>
            <PositiveCallout
              title="What&apos;s improving"
              value="39,200"
              unit="people successfully completed treatment in 2023/24"
              description="Successful treatment completions reached 39,200 in 2023/24&mdash;up from 26,300 during the pandemic nadir and the highest since 2015. The 2021 drugs strategy provided additional ring-fenced funding to local authorities, helping to reverse a decade of cuts. Treatment works: people who complete residential rehabilitation have 5-year abstinence rates above 50%."
              source="Source: OHID &mdash; National Drug Treatment Monitoring System (NDTMS) 2023/24."
            />
          </ScrollReveal>
        </section>

        {/* Sources */}
        <section className="border-t border-wiah-border py-12 px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Sources & Methodology</h2>
            {data?.metadata.sources && (
              <ul className="space-y-3 font-mono text-sm">
                {data.metadata.sources.map((src, idx) => (
                  <li key={idx} className="text-wiah-mid">
                    <a href={src.url} className="text-wiah-blue hover:underline">
                      {src.name}: {src.dataset}
                    </a>
                    {' '} ({src.frequency})
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
