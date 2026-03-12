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

interface CompletionPoint {
  year: number;
  opiate: number;
  nonOpiate: number;
  alcohol: number;
}

interface RePresentationPoint {
  year: number;
  opiate: number;
  nonOpiate: number;
  alcohol: number;
}

interface HousingOutcomePoint {
  year: number;
  stableHousing: number;
  nfa: number;
  housingNeed: number;
}

interface DrugDeathPoint {
  year: number;
  count: number;
}

interface OverallCompletion {
  latest: number;
  previous: number;
  year: number;
}

interface AddictionTreatmentData {
  completionRates: CompletionPoint[];
  rePresentationRates: RePresentationPoint[];
  housingOutcomes: HousingOutcomePoint[];
  drugDeaths: DrugDeathPoint[];
  overallCompletion: OverallCompletion;
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

function sparkFrom(arr: number[], n = 10) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function AddictionTreatmentOutcomesPage() {
  const [data, setData] = useState<AddictionTreatmentData | null>(null);

  useEffect(() => {
    fetch('/data/addiction-treatment-outcomes/addiction_treatment_outcomes.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const completionSeries: Series[] = data
    ? [
        {
          id: 'opiate',
          label: 'Opiate',
          colour: '#E63946',
          data: data.completionRates.map(d => ({
            date: yearToDate(d.year),
            value: d.opiate,
          })),
        },
        {
          id: 'non-opiate',
          label: 'Non-opiate',
          colour: '#264653',
          data: data.completionRates.map(d => ({
            date: yearToDate(d.year),
            value: d.nonOpiate,
          })),
        },
        {
          id: 'alcohol',
          label: 'Alcohol only',
          colour: '#F4A261',
          data: data.completionRates.map(d => ({
            date: yearToDate(d.year),
            value: d.alcohol,
          })),
        },
      ]
    : [];

  const rePresentationSeries: Series[] = data
    ? [
        {
          id: 'repres-opiate',
          label: 'Opiate',
          colour: '#E63946',
          data: data.rePresentationRates.map(d => ({
            date: yearToDate(d.year),
            value: d.opiate,
          })),
        },
        {
          id: 'repres-non-opiate',
          label: 'Non-opiate',
          colour: '#264653',
          data: data.rePresentationRates.map(d => ({
            date: yearToDate(d.year),
            value: d.nonOpiate,
          })),
        },
        {
          id: 'repres-alcohol',
          label: 'Alcohol only',
          colour: '#F4A261',
          data: data.rePresentationRates.map(d => ({
            date: yearToDate(d.year),
            value: d.alcohol,
          })),
        },
      ]
    : [];

  const housingSeries: Series[] = data
    ? [
        {
          id: 'stable-housing',
          label: 'In stable housing at exit',
          colour: '#2A9D8F',
          data: data.housingOutcomes.map(d => ({
            date: yearToDate(d.year),
            value: d.stableHousing,
          })),
        },
        {
          id: 'nfa',
          label: 'No fixed abode at exit',
          colour: '#E63946',
          data: data.housingOutcomes.map(d => ({
            date: yearToDate(d.year),
            value: d.nfa,
          })),
        },
        {
          id: 'housing-need',
          label: 'Housing need at exit',
          colour: '#F4A261',
          data: data.housingOutcomes.map(d => ({
            date: yearToDate(d.year),
            value: d.housingNeed,
          })),
        },
      ]
    : [];

  const latestCompletion = data?.overallCompletion;
  const latestDeaths = data?.drugDeaths[data.drugDeaths.length - 1];
  const prevDeaths = data?.drugDeaths[data.drugDeaths.length - 2];
  const latestHousing = data?.housingOutcomes[data.housingOutcomes.length - 1];

  const deathsChange = latestDeaths && prevDeaths
    ? ((latestDeaths.count - prevDeaths.count) / prevDeaths.count * 100).toFixed(1)
    : '+1.6';

  return (
    <>
      <TopicNav topic="Mental Health" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Mental Health"
          question="Does addiction treatment actually work?"
          finding="Overall successful completion rates have climbed to 48% after years of decline, but opiate treatment remains stubbornly difficult at 26%. Drug-related deaths hit 4,907 in 2024 — the highest on record. Housing stability at treatment exit is improving but remains a critical barrier to sustained recovery."
          colour="#264653"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              England&apos;s addiction treatment system, overseen by the Office for Health Improvement and Disparities and delivered through local authority-commissioned services, treats around 290,000 adults each year. The headline figure — 48% successful completions in 2024 — masks a profound divergence between substance types. Non-opiate and alcohol-only treatment completions have recovered to near pre-pandemic levels, sitting at 54% and 59% respectively. Opiate treatment, which accounts for roughly half of all people in structured treatment, tells a starkly different story: just 26% complete successfully, a figure that has barely shifted in a decade. The typical opiate client has been in treatment for over six years. Many cycle between services without ever reaching sustained recovery, their treatment becoming a form of maintenance rather than a pathway out.
            </p>
            <p>
              Re-presentation rates — the proportion of people who return to treatment within six months of completing — offer the clearest measure of whether recovery is holding. After rising steadily through the late 2010s, peaking during COVID when support networks collapsed and services moved online, re-presentation rates have now fallen for three consecutive years. This is genuinely encouraging. For opiate users, the rate dropped from 24.9% in 2020 to 21.4% in 2024. Non-opiate re-presentations fell from 28.8% to 24.3% over the same period. The improvement reflects better aftercare commissioning, the expansion of mutual aid networks, and a growing recognition within services that the weeks immediately following treatment completion represent the highest-risk period for relapse. Yet even at current rates, roughly one in four people who complete treatment will be back within six months.
            </p>
            <p>
              The strongest predictor of sustained recovery is not the treatment modality itself but what surrounds it — what clinicians call recovery capital. Housing is the single most important factor. NDTMS data shows that people who exit treatment into stable accommodation are 2.4 times more likely to sustain recovery at 12 months than those who leave with no fixed abode. In 2024, 69% of treatment exiters were in stable housing, up from a low of 63% in 2020, but still below the 72% recorded in 2014. Employment tells a similar story: just 38% of those completing treatment are in paid work, and the figure for opiate clients is below 20%. The 10-year drug strategy&apos;s ambition to rebuild the treatment system after a decade of austerity-driven cuts — local authority spending on drug and alcohol services fell 40% in real terms between 2014 and 2021 — has delivered measurable improvement in completion rates and housing outcomes. But drug-related deaths, now at 4,907 per year and overwhelmingly concentrated among long-term opiate users in their 40s and 50s, remain an unanswered crisis that completion statistics alone cannot capture.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-completions', label: 'Completion rates' },
          { id: 'sec-representation', label: 'Re-presentations' },
          { id: 'sec-housing', label: 'Housing outcomes' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Successful completions (all substances)"
            value={latestCompletion ? `${latestCompletion.latest}%` : '48.2%'}
            unit="2024"
            direction="up"
            polarity="up-is-good"
            changeText={
              latestCompletion
                ? `+${(latestCompletion.latest - latestCompletion.previous).toFixed(1)}pp from previous year · recovering from 2020 low`
                : '+1.4pp from previous year · recovering from 2020 low'
            }
            sparklineData={
              data ? sparkFrom(data.completionRates.map(d => (d.opiate + d.nonOpiate + d.alcohol) / 3)) : []
            }
            source="OHID · NDTMS Adult Treatment Statistics, 2024"
            href="#sec-completions"
          />
          <MetricCard
            label="Drug-related deaths (England &amp; Wales)"
            value={latestDeaths ? latestDeaths.count.toLocaleString() : '4,907'}
            unit="2024"
            direction="up"
            polarity="up-is-bad"
            changeText={`${Number(deathsChange) >= 0 ? '+' : ''}${deathsChange}% · record high · predominantly long-term opiate users`}
            sparklineData={
              data ? sparkFrom(data.drugDeaths.map(d => d.count)) : []
            }
            source="ONS · Deaths related to drug poisoning, 2024"
            href="#sec-completions"
          />
          <MetricCard
            label="Stable housing at treatment exit"
            value={latestHousing ? `${latestHousing.stableHousing}%` : '69.1%'}
            unit="2024"
            direction="up"
            polarity="up-is-good"
            changeText="Up from 63.4% low in 2020 · still below 2014 level of 72.3%"
            sparklineData={
              data ? sparkFrom(data.housingOutcomes.map(d => d.stableHousing)) : []
            }
            source="OHID · NDTMS Treatment Outcomes Profile, 2024"
            href="#sec-housing"
          />
        </div>

        {/* Chart 1: Completion rates by substance */}
        <ScrollReveal>
          <div id="sec-completions" className="mb-12">
            <LineChart
              series={completionSeries}
              title="Successful treatment completions by substance type, England, 2014–2024"
              subtitle="Percentage completing treatment free of dependence. Opiate outcomes remain far below non-opiate and alcohol."
              yLabel="Completion rate (%)"
              source={{
                name: 'OHID',
                dataset: 'NDTMS Adult Drug and Alcohol Treatment Statistics',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 2: Re-presentation rates */}
        <ScrollReveal>
          <div id="sec-representation" className="mb-12">
            <LineChart
              series={rePresentationSeries}
              title="Re-presentation rates within 6 months of treatment completion, 2014–2024"
              subtitle="Proportion returning to treatment within six months. Falling since 2020 across all substance types."
              yLabel="Re-presentation rate (%)"
              source={{
                name: 'OHID',
                dataset: 'NDTMS Adult Treatment Outcomes — Re-presentations',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 3: Housing outcomes at treatment exit */}
        <ScrollReveal>
          <div id="sec-housing" className="mb-12">
            <LineChart
              series={housingSeries}
              title="Housing status at treatment exit, England, 2014–2024"
              subtitle="Stable housing is the strongest predictor of sustained recovery. NFA rates peaked during COVID."
              yLabel="Percentage of exiters (%)"
              source={{
                name: 'OHID',
                dataset: 'NDTMS Treatment Outcomes Profile — Housing',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Re-presentation rates falling for three consecutive years"
            value="21.4%"
            description="The proportion of opiate users returning to treatment within six months of successful completion has fallen from a peak of 24.9% in 2020 to 21.4% in 2024 — the lowest rate in a decade. Non-opiate and alcohol re-presentations have followed the same trajectory. The improvement is driven by expanded aftercare provision, better integration between treatment services and housing support, and the growth of community-based mutual aid networks. NDTMS data shows that people who engage with structured aftercare for at least 12 weeks post-completion are 1.8 times more likely to sustain recovery than those who do not. While one in four completers still returns within six months, the direction of travel is now clearly positive for the first time since 2014."
            source="Source: OHID — NDTMS Adult Treatment Statistics, 2024. ONS — Deaths related to drug poisoning in England and Wales, 2024."
          />
        </ScrollReveal>

        <RelatedTopics />
      </main>
    </>
  );
}
