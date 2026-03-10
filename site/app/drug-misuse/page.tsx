'use client'

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
  deaths: number;
}

interface TreatmentPoint {
  year: number;
  inTreatment: number;
}

interface SubstanceBreakdown {
  substance: string;
  pct: number;
}

interface DrugMisuseData {
  drugDeaths: DrugDeathPoint[];
  treatmentNumbers: TreatmentPoint[];
  bySubstance: SubstanceBreakdown[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

function sparkFrom(arr: number[], n = 12) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function DrugMisusePage() {
  const [data, setData] = useState<DrugMisuseData | null>(null);

  useEffect(() => {
    fetch('/data/drug-misuse/drug_misuse.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const deathsSeries: Series[] = data
    ? [{
        id: 'drug-deaths',
        label: 'Drug poisoning deaths',
        colour: '#6B7280',
        data: data.drugDeaths.map(d => ({
          date: yearToDate(d.year),
          value: d.deaths,
        })),
      }]
    : [];

  const deathsAnnotations: Annotation[] = [
    { date: yearToDate(2021), label: 'Record high: 4,907 deaths' },
  ];

  const treatmentSeries: Series[] = data
    ? [{
        id: 'treatment-numbers',
        label: 'Adults in treatment',
        colour: '#6B7280',
        data: data.treatmentNumbers.map(d => ({
          date: yearToDate(d.year),
          value: d.inTreatment,
        })),
      }]
    : [];

  // ── Latest values ──────────────────────────────────────────────────────

  const latest = data && data.drugDeaths.length > 0
    ? data.drugDeaths[data.drugDeaths.length - 1]
    : null;

  const peak = data && data.drugDeaths.length > 0
    ? data.drugDeaths.reduce((p, c) => c.deaths > p.deaths ? c : p)
    : null;

  const latestTreatment = data && data.treatmentNumbers.length > 0
    ? data.treatmentNumbers[data.treatmentNumbers.length - 1]
    : null;

  const baseline2013 = data && data.treatmentNumbers.length > 0
    ? data.treatmentNumbers[0]
    : null;

  const heroinPct = data
    ? data.bySubstance.find(s => s.substance === 'Heroin/morphine')?.pct || 35
    : 35;

  return (
    <>
      <TopicNav topic="Drug Misuse" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Drug Misuse"
          question="How many people are dying from drugs?"
          finding="Drug poisoning deaths in England and Wales reached a record 4,907 in 2021 and have remained at near-record levels, driven by an ageing cohort of heroin users and the spread of illicitly manufactured fentanyl."
          colour="#6B7280"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>There were 4,534 drug poisoning deaths registered in England and Wales in 2022 — the second highest annual total on record, just below the 2021 peak of 4,907. The UK has the highest drug-related death rate in Europe by most measures. These are not deaths concentrated among young recreational users: the typical profile is a man in his 40s or 50s with a long history of opioid dependency, tracking back to the heroin epidemic that flooded post-industrial towns in the 1980s and 1990s. Scotland's death rate is approximately three times that of England, concentrated in Glasgow, Dundee, and other post-industrial cities. An estimated 300,000 people in England have a dependency on heroin or crack cocaine, but only around 150,000 are in structured treatment at any one time. Drug treatment funding fell by around 35% in real terms between 2013 and 2020; the 2021 ten-year drugs strategy committed £780 million to rebuilding it. Nitazenes — synthetic opioids far more potent than heroin — have been detected in the UK drug supply with increasing frequency since 2021, raising the risk of mass casualty events seen in North America.</p>
            <p>The geography of drug deaths maps closely onto the geography of deindustrialisation: communities that lost industrial employment in the 1980s face the highest rates of drug mortality four decades later. Scotland's higher death rate reflects historically lower treatment coverage in the areas most affected. Drug checking services, where people test substances before use, have demonstrated they can identify dangerous adulterants and change behaviour, but regulatory and political barriers to expanding them remain substantial. The full cost of drug dependency to families and communities — children taken into care, relationships destroyed, housing lost, unpaid caring by relatives — does not appear in any single dataset; the mortality figures measure only the terminal outcome of a much larger harm.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-deaths', label: 'Deaths' },
          { id: 'sec-treatment', label: 'Treatment' },
          { id: 'sec-substances', label: 'By substance' },
        ]} />

        {/* Metric cards */}
        <ScrollReveal>
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Drug poisoning deaths (2022)"
            value={latest ? latest.deaths.toString() : '—'}
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText={
              latest && peak
                ? `Near record; ${peak.year === latest.year ? '1st highest ever' : '2nd highest ever'}`
                : 'Loading…'
            }
            sparklineData={
              data
                ? sparkFrom(data.drugDeaths.map(d => d.deaths))
                : []
            }
            source="ONS · Drug poisoning mortality"
            baseline="England &amp; Wales, annual deaths registered"
            href="#sec-deaths"/>
          <MetricCard
            label="Heroin/morphine deaths"
            value={latest ? Math.round(latest.deaths * heroinPct / 100).toString() : '—'}
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText={`${heroinPct}% of drug deaths`}
            sparklineData={
              data
                ? sparkFrom(data.drugDeaths.map(d => Math.round(d.deaths * heroinPct / 100)))
                : []
            }
            source="ONS · Opioid-related deaths"
            baseline="Opiates cause over one-third of all drug deaths"
            href="#sec-treatment"/>
          <MetricCard
            label="People in drug treatment"
            value={latestTreatment ? `${(latestTreatment.inTreatment / 1000).toFixed(0)}K` : '—'}
            unit=""
            direction="down"
            polarity="up-is-good"
            changeText={
              latestTreatment && baseline2013
                ? `Down from 311K in 2013 · Treatment capacity stagnated`
                : 'Loading…'
            }
            sparklineData={
              data
                ? sparkFrom(data.treatmentNumbers.map(d => d.inTreatment / 1000))
                : []
            }
            source="NDTMS · Adults in drug and alcohol treatment"
            baseline="2022 figure. Includes both drug and alcohol treatment."
            href="#sec-substances"/>
        </div>
        </ScrollReveal>

        {/* Chart 1: Drug deaths over time */}
        <div id="sec-deaths">
        {deathsSeries.length > 0 ? (
          <LineChart
            title="Drug poisoning deaths, England &amp; Wales"
            subtitle="Annual deaths registered. ONS Drug Poisoning Mortality data. Includes legal and illegal drugs."
            series={deathsSeries}
            annotations={deathsAnnotations}
            yLabel="Deaths"
            source={{
              name: 'Office for National Statistics',
              dataset: 'Deaths related to drug poisoning in England and Wales',
              frequency: 'annual',
              url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/birthsdeathsandmarriages/deaths/bulletins/deathsrelatedtodrugpoisoningengland andwales/latest',
            }}
          />
        ) : (
          <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
        )}
        </div>

        {/* Chart 2: Treatment numbers */}
        <div id="sec-treatment">
        {treatmentSeries.length > 0 ? (
          <LineChart
            title="Adults in drug and alcohol treatment, England"
            subtitle="Annual figures. NDTMS data. Treatment capacity reduced as budgets were cut after 2013."
            series={treatmentSeries}
            yLabel="People in treatment"
            source={{
              name: 'National Drug Treatment Monitoring System',
              dataset: 'Adult drug and alcohol treatment activity',
              frequency: 'annual',
              url: 'https://www.ndtms.net/',
            }}
          />
        ) : (
          <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
        )}
        </div>

        {/* Chart 3: By substance */}
        <div id="sec-substances" className="mb-12">
          <h3 className="text-lg font-bold text-wiah-black mb-4">Drug poisoning deaths by substance type (2022)</h3>
          {data && data.bySubstance.length > 0 ? (
            <div className="space-y-3">
              {data.bySubstance.map((item) => {
                const width = (item.pct / 36) * 100;
                return (
                  <div key={item.substance}>
                    <div className="text-sm text-wiah-mid mb-1">{item.substance}</div>
                    <div className="flex items-center gap-2">
                      <div
                        className="bg-wiah-mid h-6 rounded"
                        style={{ width: `${width}%` }}
                      />
                      <span className="text-sm font-mono text-wiah-mid">{item.pct}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="h-32 bg-wiah-light rounded animate-pulse" />
          )}
        </div>

        {/* Positive callout */}
        <PositiveCallout
          title="Treatment investment"
          value="£780M"
          description="The government's 2021 drug strategy committed £780M over three years to treatment and recovery services — reversing a decade of cuts. New funding has increased treatment places and the number of naloxone (overdose-reversal drug) kits distributed."
          source="Source: Home Office — 10-year drug strategy, 2021."
        />
      </main>
    </>
  );
}
