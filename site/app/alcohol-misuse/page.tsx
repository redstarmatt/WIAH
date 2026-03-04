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

interface AlcoholDeathPoint {
  year: number;
  deaths: number;
}

interface HospitalAdmissionPoint {
  year: number;
  admissions: number;
}

interface ByCauseItem {
  cause: string;
  pct: number;
}

interface AlcoholData {
  alcoholDeaths: AlcoholDeathPoint[];
  hospitalAdmissions: HospitalAdmissionPoint[];
  byCause: ByCauseItem[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function AlcoholMisusePage() {
  const [data, setData] = useState<AlcoholData | null>(null);

  useEffect(() => {
    fetch('/data/alcohol-misuse/alcohol_misuse.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const deathsSeries: Series[] = data
    ? [{
        id: 'deaths',
        label: 'Alcohol-specific deaths',
        data: data.alcoholDeaths.map(d => ({
          date: yearToDate(d.year),
          value: d.deaths,
        })),
        colour: '#6B7280',
      }]
    : [];

  const deathsAnnotations: Annotation[] = [
    { date: yearToDate(2021), label: 'Record: 9,641' },
  ];

  const admissionsSeries: Series[] = data
    ? [{
        id: 'admissions',
        label: 'Hospital admissions',
        data: data.hospitalAdmissions.map(d => ({
          date: yearToDate(d.year),
          value: d.admissions,
        })),
        colour: '#6B7280',
      }]
    : [];

  // Sparkline data for metrics
  const deathsSparkline = data
    ? data.alcoholDeaths.map(d => d.deaths)
    : [];

  const admissionsSparkline = data
    ? data.hospitalAdmissions.map(d => d.admissions / 100000)
    : [];

  return (
    <main>
      <TopicNav topic="Alcohol Misuse" />
      <SectionNav sections={[
        { id: 'sec-overview', label: 'Overview' },
        { id: 'sec-charts', label: 'Charts' },
        { id: 'sec-context', label: 'Context' },
        { id: 'sec-sources', label: 'Sources' },
      ]} />

      {/* Hero section */}
      <section className="bg-white px-6 pt-6 pb-12 md:pb-16">
        <div className="max-w-3xl mx-auto">
          <TopicHeader
            topic="Alcohol Misuse"
            colour="#6B7280"
            question="How much is alcohol actually killing us?"
            finding="Alcohol-specific deaths in the UK reached a record 9,641 in 2021 and hospital admissions have risen to over 900,000 a year, costing the NHS &pound;3.5 billion &mdash; yet alcohol duty has fallen in real terms for a decade."
          />
        </div>
      </section>

      {/* Metrics row */}
      <section id="sec-overview" className="bg-wiah-light px-6 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <MetricCard
              label="Alcohol-specific deaths (2022)"
              value="9,048"
              unit=""
              changeText="Near record; 75% from liver disease"
              direction="up"
              polarity="up-is-bad"
              sparklineData={deathsSparkline}
              onExpand={() => {}}
            />
            <MetricCard
              label="Alcohol-related hospital admissions"
              value="900,000"
              unit="/yr"
              changeText="1 in 14 emergency admissions"
              direction="up"
              polarity="up-is-bad"
              sparklineData={admissionsSparkline}
              onExpand={() => {}}
            />
            <MetricCard
              label="Economic cost of alcohol harm"
              value="&pound;27.4bn"
              unit="/yr"
              changeText="Includes NHS, crime, lost productivity"
              direction="up"
              polarity="up-is-bad"
              sparklineData={[20, 21, 22, 23, 24, 25, 26, 27.4]}
              onExpand={() => {}}
            />
          </div>
        </div>
      </section>

      {/* Charts section */}
      <section id="sec-charts" className="bg-white px-6 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Chart 1: Deaths */}
          <ScrollReveal>
            <div className="h-72 mb-12">
              {deathsSeries.length > 0 ? (
                <LineChart
                  title="Alcohol-specific deaths, UK"
                  subtitle="Deaths directly attributable to alcohol consumption. ONS Alcohol-specific Deaths data."
                  series={deathsSeries}
                  annotations={deathsAnnotations}
                  yLabel="Deaths"
                  source={{
                    name: 'Office for National Statistics',
                    dataset: 'Deaths involving alcohol',
                    frequency: 'annual',
                    url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/healthandsocialcare/healthandlifeexpectancies/datasets/deathsinvolvingalcoholregisteredineachcountyandenglandandwales',
                  }}
                />
              ) : (
                <div className="h-full bg-wiah-light rounded animate-pulse" />
              )}
            </div>
          </ScrollReveal>

          {/* Chart 2: Admissions */}
          <ScrollReveal>
            <div className="h-72 mb-12">
              {admissionsSeries.length > 0 ? (
                <LineChart
                  title="Alcohol-related hospital admissions, England"
                  subtitle="Annual admissions where alcohol is the primary cause. NHS Digital."
                  series={admissionsSeries}
                  yLabel="Admissions"
                  source={{
                    name: 'NHS Digital',
                    dataset: 'Hospital Admitted Patient Care Activity',
                    frequency: 'annual',
                    url: 'https://digital.nhs.uk/data-and-information/publications/statistical/hospital-admitted-patient-care-activity',
                  }}
                />
              ) : (
                <div className="h-full bg-wiah-light rounded animate-pulse" />
              )}
            </div>
          </ScrollReveal>

          {/* Chart 3: Deaths by cause */}
          {data && data.byCause.length > 0 && (
            <ScrollReveal>
              <div className="mb-12">
                <h3 className="text-lg font-bold text-wiah-black mb-1">
                  Alcohol-specific deaths by cause
                </h3>
                <p className="text-sm text-wiah-mid font-mono mb-6">
                  Percentage of alcohol-specific deaths by primary cause, 2022.
                </p>
                <div className="space-y-4">
                  {data.byCause.map((item) => {
                    const barWidth = (item.pct / 80) * 100;
                    return (
                      <div key={item.cause}>
                        <div className="flex justify-between items-baseline mb-1">
                          <span className="text-sm text-wiah-black font-medium">{item.cause}</span>
                          <span className="text-sm font-mono text-wiah-mid">{item.pct}%</span>
                        </div>
                        <div className="h-2 bg-wiah-light rounded overflow-hidden">
                          <div
                            className="h-full rounded"
                            style={{
                              width: `${barWidth}%`,
                              backgroundColor: '#6B7280',
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
                <p className="font-mono text-[11px] text-wiah-mid mt-6">
                  Source: Office for National Statistics, Deaths involving alcohol. Retrieved 2025-03-04.
                </p>
              </div>
            </ScrollReveal>
          )}
        </div>
      </section>

      {/* Context section */}
      <section id="sec-context" className="bg-wiah-light px-6 py-12">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-wiah-black mb-6">The Context</h2>
          <div className="max-w-2xl mt-4 mb-12">
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>Alcohol-specific deaths in the UK reached 9,641 in 2021 &mdash; the highest on record &mdash; and fell only slightly to 9,048 in 2022. Three-quarters of those deaths are from alcoholic liver disease. The death rate in Scotland, at 22.3 per 100,000, is nearly double that of England at 12.9 per 100,000. Alcohol drives roughly 900,000 hospital admissions per year in England, one in every fourteen emergency admissions, at a direct cost to the NHS of &pound;3.5 billion. Across the full economy &mdash; healthcare, criminal justice, lost productivity &mdash; the Office for Health Inequalities and Disparities estimates the total cost at &pound;27.4 billion a year.</p>
              <p>The harm is sharply concentrated by deprivation. People in the most deprived areas of England are twice as likely to die from alcohol as those in the least deprived, and the North of England and Scotland carry a disproportionate share of that burden. The pattern contains an apparent paradox: people in the most deprived communities often drink less in total volume than those in wealthier ones, but when they do drink they do so more intensively and in more harmful patterns. Poverty, stress, poorer underlying health, and less access to early treatment all amplify the damage done by the same unit of alcohol.</p>
              <p>The policy record on alcohol is difficult to defend on evidence. UK alcohol duty rates were frozen or cut repeatedly between 2012 and 2022, leaving real-terms revenues lower than fifteen years ago. A 2023 reform introduced a strength-based structure, but overall rates remain modest. The contrast with Scotland is instructive: Scotland&apos;s introduction of minimum unit pricing at 50p per unit in 2018 was followed by a 13.4% fall in alcohol-specific deaths, against a 4.3% rise in England and Wales over the same period. Wales adopted MUP in 2020. England has not, despite the evidence &mdash; a gap that public health researchers attribute in part to sustained lobbying by the drinks industry.</p>
            </div>
          </div>

          {/* Positive callout */}
          <PositiveCallout
            title="Scotland&apos;s minimum unit pricing cut alcohol deaths"
            value="13.4%"
            unit="reduction"
            description="Scotland introduced a minimum unit price for alcohol of 50p/unit in May 2018 &mdash; the first such policy in the world. Five-year evaluation data shows alcohol-specific deaths fell 13.4% in Scotland compared to a 4.3% rise in England and Wales over the same period. Wales introduced MUP in 2020. The UK government has not adopted it for England."
            source="Public Health Scotland, Scottish National Drinking Survey. Retrieved 2025-03-04."
          />
        </div>
      </section>

      {/* Sources section */}
      <section id="sec-sources" className="bg-white px-6 py-12">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-wiah-black mb-6">Sources &amp; Methodology</h2>
          <div className="space-y-4 text-sm">
            <div>
              <h3 className="font-bold text-wiah-black mb-1">Deaths involving alcohol</h3>
              <p className="text-wiah-mid font-mono text-xs mb-2">
                Office for National Statistics, Annual data, Retrieved 2025-03-04
              </p>
              <p className="text-wiah-black">
                Annual count of deaths registered in the UK where alcohol is the underlying cause. Includes ICD-10 codes F10, K70, K73, K74, K86, X45, X65, Y15.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-wiah-black mb-1">Hospital admissions</h3>
              <p className="text-wiah-mid font-mono text-xs mb-2">
                NHS Digital, Hospital Admitted Patient Care Activity, Annual data, Retrieved 2025-03-04
              </p>
              <p className="text-wiah-black">
                Count of admissions with a primary diagnosis of alcohol-related condition. Includes alcohol-specific diagnoses and mental/behavioural disorders due to alcohol use.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
