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

interface AlcoholDeathPoint {
  year: number;
  deaths: number;
}

interface HospitalAdmissionPoint {
  year: number;
  admissions: number;
}

interface TreatmentPoint {
  year: number;
  inTreatment: number;
  estimatedDependent: number;
}

interface AlcoholMisuseData {
  alcoholDeaths: AlcoholDeathPoint[];
  hospitalAdmissions: HospitalAdmissionPoint[];
  treatmentVsNeed: TreatmentPoint[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

function sparkFrom(arr: number[], n = 10) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function AlcoholMisusePage() {
  const [data, setData] = useState<AlcoholMisuseData | null>(null);

  useEffect(() => {
    fetch('/data/alcohol-misuse/alcohol_misuse.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const deathsSeries: Series[] = data
    ? [{
        id: 'alcohol-deaths',
        label: 'Alcohol-specific deaths',
        colour: '#E63946',
        data: data.alcoholDeaths.map(d => ({
          date: yearToDate(d.year),
          value: d.deaths,
        })),
      }]
    : [];

  const admissionsSeries: Series[] = data
    ? [{
        id: 'hospital-admissions',
        label: 'Hospital admissions (alcohol-related)',
        colour: '#E63946',
        data: data.hospitalAdmissions.map(d => ({
          date: yearToDate(d.year),
          value: d.admissions,
        })),
      }]
    : [];

  const treatmentSeries: Series[] = data
    ? [
        {
          id: 'in-treatment',
          label: 'In treatment',
          colour: '#2A9D8F',
          data: data.treatmentVsNeed.map(d => ({
            date: yearToDate(d.year),
            value: d.inTreatment,
          })),
        },
        {
          id: 'estimated-dependent',
          label: 'Estimated dependent drinkers',
          colour: '#E63946',
          data: data.treatmentVsNeed.map(d => ({
            date: yearToDate(d.year),
            value: d.estimatedDependent,
          })),
        },
      ]
    : [];

  const latestDeaths = data?.alcoholDeaths[data.alcoholDeaths.length - 1];
  const preCovidDeaths = data?.alcoholDeaths.find(d => d.year === 2019);
  const latestAdmissions = data?.hospitalAdmissions[data.hospitalAdmissions.length - 1];
  const latestTreatment = data?.treatmentVsNeed[data.treatmentVsNeed.length - 1];

  const deathsChangeFromPreCovid = latestDeaths && preCovidDeaths
    ? Math.round(((latestDeaths.deaths - preCovidDeaths.deaths) / preCovidDeaths.deaths) * 100)
    : 20;

  const treatmentPct = latestTreatment
    ? Math.round((latestTreatment.inTreatment / latestTreatment.estimatedDependent) * 100)
    : 18;

  return (
    <>
      <TopicNav topic="Mental Health" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Mental Health"
          question="How bad is Britain's drinking problem?"
          finding="Alcohol-specific deaths surged 20% during the pandemic and have barely fallen back. Around 900,000 hospital admissions each year are linked to alcohol, yet only 18% of dependent drinkers are in treatment — a gap that has widened as local authority budgets were cut."
          colour="#6B7280"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              The COVID-19 pandemic did not create Britain&apos;s alcohol problem, but it accelerated it dramatically. Between 2019 and 2021, alcohol-specific deaths in England and Wales jumped from 7,565 to 9,641 — a 27% increase in just two years. The pattern was stark: those who were already heavy drinkers drank more, while moderate drinkers generally cut back. Lockdowns removed the social scaffolding — work routines, pub closing times, the presence of colleagues — that had previously kept consumption in check for many people. Three years on, deaths have barely retreated from their pandemic peak. In 2024, 9,048 people died from causes wholly attributable to alcohol — still 20% above pre-pandemic levels. Most of these deaths are from alcoholic liver disease, a condition that typically takes 10–20 years of heavy drinking to develop, meaning today&apos;s death toll reflects drinking patterns established a decade or more ago. The surge in deaths during COVID suggests an even grimmer toll is coming.
            </p>
            <p>
              The treatment gap is the most damning statistic. An estimated 615,000 adults in England are dependent drinkers — people for whom alcohol has become a physiological need, not a lifestyle choice. Of those, only around 113,200 (roughly 18%) are currently in structured treatment. This is not because treatment does not work: NICE estimates that every pound spent on alcohol treatment saves five pounds in NHS, criminal justice and welfare costs. The gap exists because local authority public health budgets, which fund alcohol services, were cut by 24% in real terms between 2015 and 2021. Many areas now have waiting lists of three months or more for community alcohol services. The deprivation gradient is brutal: alcohol-specific death rates in the most deprived areas of England are 3.5 times higher than in the least deprived. People in poorer areas do not necessarily drink more, but they die more — a phenomenon researchers call the &ldquo;alcohol harm paradox,&rdquo; driven by co-occurring poverty, poor diet, smoking, and reduced access to healthcare.
            </p>
            <p>
              Scotland&apos;s introduction of minimum unit pricing (MUP) at 50p per unit in May 2018 — raised to 65p in September 2024 — offers the clearest natural experiment in UK alcohol policy. Public Health Scotland&apos;s evaluation found that MUP reduced alcohol-specific deaths by an estimated 13.4% and alcohol-related hospital admissions by 4.1% in its first three years, with the largest reductions among men and people living in the most deprived areas. The affordability of alcohol in England, by contrast, has improved: alcohol is 74% more affordable today than it was in 1987, measured against average earnings. The Dry January movement, now in its eleventh year, saw 8.9 million participants in 2025 — evidence of widespread public appetite for cultural change even in the absence of policy action. But individual willpower cannot substitute for population-level measures. The evidence from Scotland is clear: price floors save lives, and they save the most lives in the communities with the least.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-deaths', label: 'Alcohol deaths' },
          { id: 'sec-admissions', label: 'Hospital admissions' },
          { id: 'sec-treatment', label: 'Treatment gap' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Alcohol-specific deaths"
            value={latestDeaths ? latestDeaths.deaths.toLocaleString() : '9,048'}
            unit="2024"
            direction="up"
            polarity="up-is-bad"
            changeText={`+${deathsChangeFromPreCovid}% vs pre-COVID · surged during pandemic · alcoholic liver disease leading cause`}
            sparklineData={
              data ? sparkFrom(data.alcoholDeaths.map(d => d.deaths)) : []
            }
            source="ONS · Alcohol-specific deaths, England and Wales, 2024"
            href="#sec-deaths"
          />
          <MetricCard
            label="Hospital admissions (alcohol-related)"
            value={latestAdmissions ? (latestAdmissions.admissions / 1000).toFixed(0) + 'K' : '900K'}
            unit="per year"
            direction="up"
            polarity="up-is-bad"
            changeText="Broad measure · up 31% since 2012 · includes A&E attendances, liver disease, mental health"
            sparklineData={
              data ? sparkFrom(data.hospitalAdmissions.map(d => d.admissions)) : []
            }
            source="NHS Digital · Statistics on Alcohol, England, 2024"
            href="#sec-admissions"
          />
          <MetricCard
            label="Dependent drinkers in treatment"
            value={`${treatmentPct}%`}
            unit="of estimated need"
            direction="down"
            polarity="down-is-bad"
            changeText={
              latestTreatment
                ? `${latestTreatment.inTreatment.toLocaleString()} in treatment of ~${(latestTreatment.estimatedDependent / 1000).toFixed(0)}K dependent · funding cuts drove decline`
                : '113,200 in treatment of ~615K dependent'
            }
            sparklineData={
              data ? sparkFrom(data.treatmentVsNeed.map(d => Math.round((d.inTreatment / d.estimatedDependent) * 100))) : []
            }
            source="OHID · Adult substance misuse treatment statistics, 2024"
            href="#sec-treatment"
          />
        </div>

        {/* Chart 1: Alcohol-specific deaths */}
        <ScrollReveal>
          <div id="sec-deaths" className="mb-12">
            <LineChart
              series={deathsSeries}
              title="Alcohol-specific deaths, England and Wales, 2012–2024"
              subtitle="Deaths from causes wholly attributable to alcohol. Pandemic surge has barely retreated."
              yLabel="Deaths"
              source={{
                name: 'ONS',
                dataset: 'Alcohol-specific deaths in the UK',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 2: Hospital admissions */}
        <ScrollReveal>
          <div id="sec-admissions" className="mb-12">
            <LineChart
              series={admissionsSeries}
              title="Alcohol-related hospital admissions, England, 2012–2024"
              subtitle="Broad measure including all admissions where an alcohol-related condition was recorded."
              yLabel="Admissions"
              source={{
                name: 'NHS Digital',
                dataset: 'Statistics on Alcohol, England',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 3: Treatment gap */}
        <ScrollReveal>
          <div id="sec-treatment" className="mb-12">
            <LineChart
              series={treatmentSeries}
              title="Alcohol treatment numbers vs estimated dependent drinkers, England, 2012–2024"
              subtitle="Only ~18% of dependent drinkers receive structured treatment. The gap widened as budgets were cut."
              yLabel="People"
              source={{
                name: 'OHID',
                dataset: 'Adult substance misuse treatment statistics',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Scotland's minimum unit pricing is saving lives"
            value="13.4% fewer deaths"
            description="Scotland introduced minimum unit pricing (MUP) at 50p per unit in May 2018, raised to 65p in September 2024. Public Health Scotland's evaluation found MUP reduced alcohol-specific deaths by an estimated 13.4% and hospital admissions by 4.1% in its first three years, with the greatest impact in the most deprived communities. Meanwhile, the Dry January campaign has grown from a niche initiative to 8.9 million participants in 2025 — evidence that public appetite for change is running ahead of policy in England, where no equivalent pricing measure has been introduced."
            source="Source: Public Health Scotland — Evaluating the impact of MUP, 2023. Alcohol Change UK — Dry January 2025 report."
          />
        </ScrollReveal>

        <RelatedTopics />
      </main>
    </>
  );
}
