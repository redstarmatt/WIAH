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
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'UK Sepsis Trust / NHS England', dataset: 'Sepsis-related Mortality Estimates', date: '2025', note: 'Approx 48,000 deaths/year; peaked at 54,800 in 2020; down 12% from peak' },
  { num: 2, name: 'ICNARC', dataset: 'Case Mix Programme — Sepsis Admissions', date: '2025', note: 'Survival rate risen from 73% (2014) to 81% (2025); South West 84% vs North East 77%' },
  { num: 3, name: 'NHS England', dataset: 'CQUIN Sepsis Indicators', url: 'https://www.england.nhs.uk/statistics/', date: '2025', note: 'Sepsis-6 bundle compliance 72% (up from 42% in 2016); median time to IV antibiotics halved to 44 minutes' },
  { num: 4, name: 'NHS England', dataset: 'NEWS2 National Early Warning Score Implementation', url: 'https://www.england.nhs.uk/statistics/', date: '2025', note: 'NEWS2 adopted across 95% of acute trusts; automatic deterioration flagging triggers sepsis screening' },
];

// ── Types ────────────────────────────────────────────────────────────────────

interface DeathPoint {
  year: number;
  deaths: number;
}

interface CompliancePoint {
  year: number;
  percent: number;
}

interface SurvivalPoint {
  year: number;
  percent: number;
}

interface AntibioticsPoint {
  year: number;
  minutes: number;
}

interface RegionData {
  region: string;
  survivalPercent: number;
}

interface SepsisData {
  sepsisDeaths: DeathPoint[];
  bundleCompliance: CompliancePoint[];
  survivalRate: SurvivalPoint[];
  timeToAntibiotics: AntibioticsPoint[];
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

export default function SepsisOutcomesPage() {
  const [data, setData] = useState<SepsisData | null>(null);

  useEffect(() => {
    fetch('/data/sepsis-outcomes/sepsis_outcomes.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const deathsSeries: Series[] = data
    ? [{
        id: 'sepsis-deaths',
        label: 'Annual deaths',
        colour: '#E63946',
        data: data.sepsisDeaths.map(d => ({
          date: yearToDate(d.year),
          value: d.deaths,
        })),
      }]
    : [];

  const survivalSeries: Series[] = data
    ? [{
        id: 'survival-rate',
        label: 'Survival rate (%)',
        colour: '#2A9D8F',
        data: data.survivalRate.map(d => ({
          date: yearToDate(d.year),
          value: d.percent,
        })),
      }]
    : [];

  const antibioticsSeries: Series[] = data
    ? [{
        id: 'time-to-antibiotics',
        label: 'Median time to IV antibiotics (min)',
        colour: '#264653',
        data: data.timeToAntibiotics.map(d => ({
          date: yearToDate(d.year),
          value: d.minutes,
        })),
      }]
    : [];

  const latestDeaths = data?.sepsisDeaths[data.sepsisDeaths.length - 1];
  const peakDeaths = data?.sepsisDeaths.reduce((a, b) => a.deaths > b.deaths ? a : b);
  const latestSurvival = data?.survivalRate[data.survivalRate.length - 1];
  const earliestSurvival = data?.survivalRate[0];
  const latestCompliance = data?.bundleCompliance[data.bundleCompliance.length - 1];
  const latestAntibiotics = data?.timeToAntibiotics[data.timeToAntibiotics.length - 1];
  const earliestAntibiotics = data?.timeToAntibiotics[0];

  const deathsChangePercent = latestDeaths && peakDeaths
    ? Math.round(((peakDeaths.deaths - latestDeaths.deaths) / peakDeaths.deaths) * 100)
    : 12;

  return (
    <>
      <TopicNav topic="Health" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Health"
          question="Is the NHS Getting Better at Treating Sepsis?"
          finding="Sepsis kills around 48,000 people a year in the UK, but survival rates have risen from 73% to 81% in a decade as faster recognition and treatment take hold."
          colour="#2A9D8F"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Sepsis occurs when the body's response to infection damages its own organs. It remains the leading cause of preventable death in NHS hospitals, killing more people each year than bowel, breast, and prostate cancer combined.<Cite nums={1} /> But outcomes are improving. The national Sepsis-6 care bundle — a checklist of six interventions to be delivered within the first hour — has been adopted across 95% of acute NHS trusts, and compliance has risen from 42% in 2016 to 72% in 2025. Median time from presentation to intravenous antibiotics has halved, from 92 minutes to 44 minutes over the same period.<Cite nums={3} /></p>
            <p>The improvements are real but unevenly distributed. Survival rates in the South West now exceed 84%, while the North East sits at 77% — a gap that maps closely onto broader health inequalities, staffing ratios, and emergency department crowding.<Cite nums={2} /> The 2020 pandemic disrupted progress: compliance fell, delayed presentations increased, and deaths spiked to nearly 55,000. Recovery since then has been steady. The UK Sepsis Trust estimates that achieving 90% bundle compliance nationally could prevent an additional 5,000 deaths per year. The data shows a health system that has learned to recognise sepsis far faster than it once did — but has not yet closed the gap between its best and worst performers.</p>
            <p>There is also a quiet structural success story. The introduction of NEWS2 (National Early Warning Score) across all acute trusts means that deteriorating patients are now flagged automatically, triggering sepsis screening pathways before clinical suspicion alone would have caught them.<Cite nums={4} /> This systematic approach — treating sepsis as a process failure rather than a diagnostic failure — is the single most important change in the last decade.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-deaths', label: 'Deaths' },
          { id: 'sec-survival', label: 'Survival rate' },
          { id: 'sec-antibiotics', label: 'Time to treatment' },
          { id: 'sec-regional', label: 'Regional' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Annual sepsis deaths"
            value={latestDeaths ? latestDeaths.deaths.toLocaleString() : '48,000'}
            unit="2025"
            direction="down"
            polarity="up-is-bad"
            changeText={`Down ${deathsChangePercent}% from ${peakDeaths ? peakDeaths.year : 2020} peak of ${peakDeaths ? peakDeaths.deaths.toLocaleString() : '54,800'}`}
            sparklineData={
              data ? sparkFrom(data.sepsisDeaths.map(d => d.deaths)) : []
            }
            source="UK Sepsis Trust / NHS England, 2025"
            href="#sec-deaths"
          />
          <MetricCard
            label="Sepsis survival rate"
            value={latestSurvival ? `${latestSurvival.percent}%` : '81.2%'}
            unit="2025"
            direction="up"
            polarity="up-is-good"
            changeText={
              latestSurvival && earliestSurvival
                ? `Up ${(latestSurvival.percent - earliestSurvival.percent).toFixed(1)} pts since ${earliestSurvival.year}`
                : 'Up 8.0 pts since 2014'
            }
            sparklineData={
              data ? sparkFrom(data.survivalRate.map(d => d.percent)) : []
            }
            source="ICNARC Case Mix Programme, 2025"
            href="#sec-survival"
          />
          <MetricCard
            label="Sepsis bundle compliance"
            value={latestCompliance ? `${latestCompliance.percent}%` : '72%'}
            unit="2025"
            direction="up"
            polarity="up-is-good"
            changeText="Target: 90% · up from 42% in 2016"
            sparklineData={
              data ? sparkFrom(data.bundleCompliance.map(d => d.percent)) : []
            }
            source="NHS England · CQUIN Sepsis Indicators, 2025"
            href="#sec-antibiotics"
          />
        </div>

        {/* Chart 1: Sepsis deaths */}
        <ScrollReveal>
          <div id="sec-deaths" className="mb-12">
            <LineChart
              series={deathsSeries}
              title="Annual sepsis-related deaths, UK, 2014–2025"
              subtitle="Deaths peaked in 2020 during the pandemic and have since fallen steadily."
              yLabel="Deaths"
              source={{
                name: 'UK Sepsis Trust / NHS England',
                dataset: 'Sepsis-related mortality estimates',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 2: Survival rate */}
        <ScrollReveal>
          <div id="sec-survival" className="mb-12">
            <LineChart
              series={survivalSeries}
              title="Sepsis survival rate (%), UK, 2014–2025"
              subtitle="Survival has risen from 73% to 81% over the last decade, driven by faster recognition and treatment."
              yLabel="Survival (%)"
              source={{
                name: 'ICNARC',
                dataset: 'Case Mix Programme — sepsis admissions',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 3: Time to antibiotics */}
        <ScrollReveal>
          <div id="sec-antibiotics" className="mb-12">
            <LineChart
              series={antibioticsSeries}
              title="Median time from presentation to IV antibiotics (minutes), 2016–2025"
              subtitle={`Down from ${earliestAntibiotics ? earliestAntibiotics.minutes : 92} to ${latestAntibiotics ? latestAntibiotics.minutes : 44} minutes. Target: under 60 minutes.`}
              yLabel="Minutes"
              targetLine={{ value: 60, label: 'Target: 60 min' }}
              source={{
                name: 'NHS England',
                dataset: 'CQUIN Sepsis Indicators',
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
                Sepsis survival rate by NHS region (%)
              </h2>
              <p className="text-sm text-wiah-mid mb-6">
                A 6.7 percentage point gap separates the best- and worst-performing regions.
              </p>
              <div className="mt-6 space-y-4">
                {data?.byRegion.map((r) => {
                  const pct = ((r.survivalPercent - 70) / 20) * 100;
                  return (
                    <div key={r.region}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-wiah-black">{r.region}</span>
                        <span className="font-mono text-sm font-bold text-wiah-black">{r.survivalPercent}%</span>
                      </div>
                      <div className="h-6 bg-wiah-light rounded-sm overflow-hidden">
                        <div
                          className="h-full rounded-sm transition-all"
                          style={{ width: `${Math.max(pct, 0)}%`, backgroundColor: '#2A9D8F' }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="font-mono text-xs text-wiah-mid mt-4">Source: ICNARC Case Mix Programme — regional sepsis outcomes, 2025</p>
            </div>
          </div>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="NEWS2 early warning system preventing avoidable deaths"
            value="95%"
            unit="of acute trusts"
            description="The National Early Warning Score 2 (NEWS2) system is now used across 95% of NHS acute trusts. It automatically flags deteriorating patients, triggering sepsis screening before clinical suspicion alone would catch them. Combined with the Sepsis-6 care bundle, this systematic approach has helped halve the time from presentation to IV antibiotics — from 92 minutes in 2016 to 44 minutes in 2025. The UK Sepsis Trust estimates that reaching 90% bundle compliance nationally could prevent a further 5,000 deaths per year."
            source="Source: NHS England — CQUIN Sepsis Indicators, 2025. ICNARC Case Mix Programme. UK Sepsis Trust."
          />
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>UK Sepsis Trust — annual sepsis-related mortality estimates. Includes deaths where sepsis was a primary or contributing cause on the death certificate.</p>
            <p>ICNARC (Intensive Care National Audit & Research Centre) — Case Mix Programme. Survival rates based on critical care admissions with sepsis as the primary reason for admission.</p>
            <p>NHS England — CQUIN (Commissioning for Quality and Innovation) Sepsis Indicators. Bundle compliance and time-to-antibiotics data from acute trust returns.</p>
            <p>Methodology note: Deaths figures include all sepsis-associated mortality (ICD-10 codes A40-A41 plus implicit sepsis). Survival rates refer to critical care survival to hospital discharge. Regional variation reflects NHS England commissioning regions. Updated annually.</p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
