'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

// ── Types ────────────────────────────────────────────────────────────────────

interface IllnessPoint {
  year: number;
  reports: number;
  bathingSitesMonitored: number;
}

interface FailurePoint {
  year: number;
  failingSitesAfterRain: number;
  totalDesignatedSites: number;
  failPct: number;
}

interface DischargeVsIllnessPoint {
  year: number;
  dischargeEvents: number;
  illnessReports: number;
  openWaterSwimmersMln: number;
}

interface TopicData {
  national: {
    illnessReports: { timeSeries: IllnessPoint[] };
    bathingWaterFailures: { timeSeries: FailurePoint[] };
    dischargeVsIllness: { timeSeries: DischargeVsIllnessPoint[] };
    openWaterSwimmers: { timeSeries: { year: number; swimmersMln: number }[] };
  };
  metadata: {
    sources: { name: string; dataset: string; url: string; frequency: string }[];
    methodology: string;
    knownIssues: string[];
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

const editorialRefs: Reference[] = [
  { num: 1, name: 'Surfers Against Sewage', dataset: 'Water Quality Illness Tracker', url: 'https://www.sas.org.uk/water-quality/', date: '2024' },
  { num: 2, name: 'Environment Agency', dataset: 'Event Duration Monitoring — Storm Overflows', url: 'https://environment.data.gov.uk/dataset/21e15f12-0df8-4bfc-b763-45226c16a8ac', date: '2024' },
  { num: 3, name: 'Environment Agency', dataset: 'Bathing Water Quality Classifications', url: 'https://environment.data.gov.uk/bwq/profiles/', date: '2024' },
  { num: 4, name: 'University of Exeter', dataset: 'Sewage Pollution and Human Health — Research Programme', url: 'https://www.exeter.ac.uk/research/esi/', date: '2023' },
  { num: 5, name: 'Sport England', dataset: 'Active Lives Adult Survey — Open Water Swimming', url: 'https://www.sportengland.org/research-and-data/data/active-lives', date: '2024' },
];

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function SewageHealthPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/sewage-health/sewage_health.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Chart 1: Reported illnesses at bathing sites 2018–2024 ──────────────

  const chart1Series: Series[] = data
    ? [
        {
          id: 'illnessReports',
          label: 'Illness reports',
          colour: '#E63946',
          data: data.national.illnessReports.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.reports,
          })),
        },
      ]
    : [];

  const chart1Annotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: '2020: COVID lockdowns reduce bathing visits' },
    { date: new Date(2024, 5, 1), label: '2024: SAS records 1,924 illness reports' },
  ];

  // ── Chart 2: Bathing water failures by year 2015–2025 ───────────────────

  const chart2Series: Series[] = data
    ? [
        {
          id: 'failingSites',
          label: 'Sites failing standards after rain',
          colour: '#E63946',
          data: data.national.bathingWaterFailures.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.failingSitesAfterRain,
          })),
        },
        {
          id: 'failPct',
          label: 'Failure rate (%)',
          colour: '#F4A261',
          data: data.national.bathingWaterFailures.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.failPct,
          })),
        },
      ]
    : [];

  const chart2Annotations: Annotation[] = [
    { date: new Date(2021, 5, 1), label: '2021: High rainfall year; sharp rise in failures' },
  ];

  // ── Chart 3: Sewage discharge events vs illness reports 2020–2024 ───────

  const chart3Series: Series[] = data
    ? [
        {
          id: 'dischargeEventsK',
          label: 'Discharge events (thousands)',
          colour: '#264653',
          data: data.national.dischargeVsIllness.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: Math.round(d.dischargeEvents / 1000),
          })),
        },
        {
          id: 'illnessReports',
          label: 'Illness reports',
          colour: '#E63946',
          data: data.national.dischargeVsIllness.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.illnessReports,
          })),
        },
      ]
    : [];

  const chart3Annotations: Annotation[] = [
    { date: new Date(2023, 5, 1), label: '2023: Record 464,000 discharge events' },
  ];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Sewage & Health" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Water"
          question="Is Sewage Making People Ill?"
          finding="Surfers Against Sewage tracked 1,924 illness reports at bathing sites in 2024 — more than double the 847 recorded in 2018. Academic studies have documented a clear correlation between sewage discharge events and illness clusters within 48 hours."
          colour="#E63946"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The link between sewage discharges and human illness is now supported by a growing body of evidence. Surfers Against Sewage tracked 1,924 illness reports at bathing sites in 2024, more than double the 847 recorded in 2018, with gastroenteritis, ear and throat infections, and skin rashes the most common complaints. University of Exeter research has documented a consistent pattern: when water companies release untreated sewage through combined sewer overflows, bacterial concentrations at nearby bathing sites spike beyond safe limits within hours, and illness clusters follow within 48 hours. The 464,000 discharge events recorded by the Environment Agency's monitoring programme in 2023 represent a systemic failure of ageing Victorian infrastructure overwhelmed by population growth and increasingly intense rainfall.<Cite nums={1} /></p>
            <p>The health risks are growing in parallel with exposure. The open water swimming boom has brought 7.5 million people into rivers, lakes and coastal waters, up from 4.1 million in 2019, yet the regulatory framework has not kept pace. The Environment Agency's real-time discharge alerts, launched in 2024, cover only the 430 designated bathing waters in England — not the rivers where wild swimming is most popular and where 93% of waterways fail to meet good ecological status. Children are disproportionately vulnerable, swallowing more water while swimming and facing greater risk from waterborne pathogens. The 1,924 reported illnesses almost certainly undercount the true burden, since most people do not connect a stomach bug to the water they swam in days earlier, and no systematic NHS surveillance programme exists to capture the full picture.<Cite nums={2} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-illness-trend', label: 'Illness reports' },
          { id: 'sec-failures', label: 'Bathing failures' },
          { id: 'sec-discharge-illness', label: 'Discharge vs illness' },
        ]} />

        {/* ── Metric Cards ─────────────────────────────────────────────── */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Illness reports at bathing sites"
            value="1,924"
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText="+127% since 2018 (847) · gastroenteritis, ENT, skin rashes"
            sparklineData={[847, 936, 612, 1247, 1482, 1711, 1924]}
            href="#sec-illness-trend"
          />
          <MetricCard
            label="Bathing sites failing standards after rain"
            value="56"
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText="13% of designated sites · up from 21 in 2015"
            sparklineData={[21, 24, 28, 31, 34, 29, 42, 48, 53, 56]}
            href="#sec-failures"
          />
          <MetricCard
            label="Open water swimmers"
            value="7.5"
            unit="million"
            direction="up"
            polarity="neutral"
            changeText="Up from 4.1m in 2019 · wild swimming boom"
            sparklineData={[4.1, 4.7, 5.8, 6.4, 7.1, 7.5]}
            href="#sec-discharge-illness"
          />
        </div>

        {/* ── Editorial ────────────────────────────────────────────────── */}
        <ScrollReveal>
          <section className="mb-12 max-w-2xl">
            <p className="text-base text-wiah-black leading-relaxed mb-4">
              The evidence linking sewage pollution to human illness is no longer circumstantial. Researchers at the Universities of Exeter and Bangor have documented a consistent pattern: when water companies discharge untreated sewage through combined sewer overflows, E. coli and intestinal enterococci levels at nearby bathing sites spike beyond safe limits — often within hours.<Cite nums={4} /> The health consequences follow predictably. Gastroenteritis is the most commonly reported illness, followed by ear, nose and throat infections and skin rashes. Surfers Against Sewage, which runs the largest crowd-sourced water quality illness tracker in the UK, recorded 1,924 reports of sickness at bathing sites in 2024, more than double the 847 logged in 2018.<Cite nums={1} /> More than 50 monitored bathing sites regularly exceed safe bacterial limits after heavy rain.<Cite nums={3} /> Children are particularly vulnerable — they swallow more water while swimming and their immature immune systems are less equipped to fight waterborne pathogens. The estimated cost to the NHS of treating waterborne illness stands at around £140 million per year.<Cite nums={4} />
            </p>
            <p className="text-base text-wiah-black leading-relaxed">
              These risks are growing in parallel with participation. The open water swimming boom has brought 7.5 million people into rivers, lakes and coastal waters — up from 4.1 million in 2019.<Cite nums={5} /> Yet the Environment Agency&apos;s real-time alerts system, launched in 2024, covers only England&apos;s 430 or so designated bathing waters.<Cite nums={3} /> It does not cover rivers, where wild swimming is most popular and where 93% of waterways fail to meet good ecological status. There is a deeper concern, too: sewage entering waterways carries antibiotic-resistant bacteria, contributing to the growing crisis of antimicrobial resistance. Water company self-monitoring data from the Event Duration Monitoring programme shows that discharge events correlate closely with reported illness clusters, typically within a 48-hour window.<Cite nums={[1, 2]} /> The pattern is clear: more sewage, more swimmers, more illness. What remains absent is a systematic NHS surveillance programme that could quantify the true scale of harm — the 1,924 reports almost certainly represent a fraction of actual cases, since most people do not connect a stomach bug to the river they swam in three days earlier.<Cite nums={1} />
            </p>
          </section>
        </ScrollReveal>

        {/* ── Chart 1: Illness reports ─────────────────────────────────── */}
        <ScrollReveal>
          <section id="sec-illness-trend" className="mb-12">
            <LineChart
              title="Reported illnesses at bathing sites, England, 2018–2024"
              subtitle="Self-reported illness within 72 hours of bathing. Source: Surfers Against Sewage illness tracker."
              series={chart1Series}
              annotations={chart1Annotations}
              yLabel="Reports"
            />
          </section>
        </ScrollReveal>

        {/* ── Chart 2: Bathing water failures ──────────────────────────── */}
        <ScrollReveal>
          <section id="sec-failures" className="mb-12">
            <LineChart
              title="Bathing water failures by year, England, 2015–2025"
              subtitle="Designated bathing sites where E. coli or enterococci exceeded safe limits within 48 hours of rainfall."
              series={chart2Series}
              annotations={chart2Annotations}
              yLabel="Sites / %"
            />
          </section>
        </ScrollReveal>

        {/* ── Chart 3: Discharge events vs illness reports ─────────────── */}
        <ScrollReveal>
          <section id="sec-discharge-illness" className="mb-12">
            <LineChart
              title="Sewage discharge events vs illness reports, England, 2020–2024"
              subtitle="EDM-recorded discharge events (thousands) plotted against SAS illness reports. Both track upward."
              series={chart3Series}
              annotations={chart3Annotations}
              yLabel="Count"
            />
          </section>
        </ScrollReveal>

        {/* ── Positive Callout ─────────────────────────────────────────── */}
        <ScrollReveal>
          <PositiveCallout
            title="Bathing water regulations and real-time alerts"
            value="96%"
            unit="of designated sites at 'Sufficient' quality or above"
            description="The Bathing Water Quality Regulations secured 96% of designated sites at 'Sufficient' quality or above. Real-time sewage discharge alerts, launched in 2024, now cover all designated bathing waters — enabling swimmers to make informed decisions for the first time."
            source="Source: Environment Agency — Bathing water quality classifications, 2024."
          />
        </ScrollReveal>

        {/* ── Sources & Methodology ────────────────────────────────────── */}
        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            {data?.metadata.sources.map((src, i) => (
              <div key={i}>
                <a href={src.url} target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">
                  {src.name} — {src.dataset}
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
        <References items={editorialRefs} />
      </main>
    </>
  );
}
