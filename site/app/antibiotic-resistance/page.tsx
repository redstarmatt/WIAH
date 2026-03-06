'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';

// ── Types ────────────────────────────────────────────────────────────────────

interface AmrDeathPoint {
  year: number;
  deaths: number;
}

interface EcoliResistancePoint {
  year: number;
  pct: number;
}

interface PathogenPoint {
  pathogen: string;
  resistancePct: number;
}

interface AntibiticResistanceData {
  amrDeaths: AmrDeathPoint[];
  ecoliResistance: EcoliResistancePoint[];
  byPathogen: PathogenPoint[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

function sparkFrom(arr: number[], n = 12) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function AntibiticResistancePage() {
  const [data, setData] = useState<AntibiticResistanceData | null>(null);

  useEffect(() => {
    fetch('/data/antibiotic-resistance/antibiotic_resistance.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const amrDeathsSeries: Series[] = data
    ? [
        {
          id: 'amr-deaths',
          label: 'Deaths attributable to AMR',
          colour: '#E63946',
          data: data.amrDeaths.map(d => ({
            date: yearToDate(d.year),
            value: d.deaths,
          })),
        },
      ]
    : [];

  const ecoliSeries: Series[] = data
    ? [
        {
          id: 'ecoli-resistance',
          label: 'E. coli resistance rate',
          colour: '#264653',
          data: data.ecoliResistance.map(d => ({
            date: yearToDate(d.year),
            value: d.pct,
          })),
        },
      ]
    : [];

  // ── Metric values ────────────────────────────────────────────────────────

  const latestDeaths = data?.amrDeaths.at(-1);
  const latestEcoli = data?.ecoliResistance.at(-1);

  const deathsSparkline = data ? sparkFrom(data.amrDeaths.map(d => d.deaths / 1e3), 8) : [];
  const ecoliSparkline = data ? sparkFrom(data.ecoliResistance.map(d => d.pct), 8) : [];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Antibiotic Resistance" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Antibiotic Resistance"
          question="Are Antibiotics Still Working?"
          finding="Drug-resistant infections kill an estimated 7,000 people in the UK each year, and without action, AMR could become one of the leading causes of death globally by 2050."
          colour="#264653"
        />

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-context', label: 'Context' },

          { id: 'sec-charts', label: 'Charts' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <section id="sec-overview" className="max-w-2xl mt-4 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <MetricCard
              label="UK deaths from AMR"
              value={latestDeaths ? (latestDeaths.deaths / 1e3).toFixed(1) : '—'}
              unit="K annual"
              direction="up"
              polarity="up-is-bad"
              changeText="Forecast 10K by 2035"
              sparklineData={deathsSparkline}
              href="#sec-charts"
            />
            <MetricCard
              label="E. coli bloodstream infections resistant to standard antibiotics"
              value={latestEcoli ? latestEcoli.pct.toString() : '—'}
              unit="%"
              direction="up"
              polarity="up-is-bad"
              changeText="Up from 38% in 2016"
              sparklineData={ecoliSparkline}
              href="#sec-charts"
            />
            <MetricCard
              label="Antibiotic prescribing in primary care"
              value="35.5"
              unit="M items"
              direction="down"
              polarity="up-is-good"
              changeText="Down 25% since 2014 peak"
              sparklineData={[47.0, 46.8, 46.2, 45.1, 43.8, 41.2, 38.5, 36.1, 35.5]}
              href="#sec-charts"
            />
          </div>
        </section>

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Antimicrobial resistance (AMR) kills an estimated 7,000 people in the UK every year and was directly responsible for 1.27 million deaths globally in 2019, according to a landmark Lancet study &mdash; more than HIV or malaria. Without concerted action, the O&apos;Neill Review projects that figure will reach 10 million per year by 2050. The mechanism is evolutionary: bacteria exposed to antibiotics that do not kill them entirely develop resistance over generations. In England, the scale is already visible in routine data. Of all E. coli bloodstream infections &mdash; the most common bloodstream infection in the country &mdash; 46% are now resistant to third-generation cephalosporins, up from 38% in 2016. MRSA rates fell sharply from their mid-2000s peak but have begun rising again.</p>
            <p>The drivers of resistance span three interconnected systems. In human medicine, antibiotics have historically been overprescribed &mdash; for viral infections they cannot treat, or as a precaution rather than a diagnosis. In agriculture, an estimated 60% of global antibiotic use occurs in livestock, often to promote growth rather than treat illness. In the environment, pharmaceutical manufacturing waste &mdash; particularly from drug factories in India and China &mdash; contaminates rivers with antibiotic residues, creating reservoirs of resistant bacteria far from any clinical setting. The pipeline has meanwhile run dry: no new antibiotic class has been successfully developed and commercialised since the 1980s. The reason is commercial. Antibiotics are cheap, used sparingly by design, and rapidly rendered obsolete by resistance &mdash; making them among the least attractive investments in the pharmaceutical sector.</p>
            </div>
        </section>

        <PositiveCallout
          title="UK antibiotic prescribing down 25% since 2014"
          value="-25%"
          description="The UK&apos;s 2019&ndash;2024 National Action Plan set targets to reduce inappropriate antibiotic prescriptions in primary care. Prescriptions fell from 47M items in 2014 to 35.5M in 2023 &mdash; one of the sharpest declines in the developed world. But resistance continues to rise because global overuse outpaces local reductions."
          source="Source: NHS England — Primary Care Prescribing Analysis, 2014&ndash;2023."
        />

        <section id="sec-charts" className="mt-16 mb-16">
          <ScrollReveal>
            <LineChart
              title="Estimated deaths attributable to antimicrobial resistance, UK"
              subtitle="Annual estimates. Includes deaths where AMR was a direct or contributing cause."
              series={amrDeathsSeries}
              yLabel="Deaths"
              showTitle
            />
          </ScrollReveal>

          <ScrollReveal>
            <LineChart
              title="E. coli bloodstream infection resistance to 3rd-generation cephalosporins, UK"
              subtitle="Percentage of isolates resistant to standard first-line antibiotics."
              series={ecoliSeries}
              yLabel="Percentage"
              showTitle
            />
          </ScrollReveal>

          <ScrollReveal>
            <div className="mt-12 p-8 bg-white border border-wiah-border rounded-lg">
              <h3 className="text-lg font-bold text-wiah-black mb-6">Antibiotic resistance rates by common pathogens</h3>
              <div className="space-y-3">
                {data?.byPathogen.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-40 text-sm text-wiah-mid truncate">{item.pathogen}</div>
                    <div className="flex-1 bg-wiah-light rounded-sm overflow-hidden">
                      <div
                        className="h-6 bg-wiah-blue flex items-center justify-end pr-2"
                        style={{ width: `${(item.resistancePct / 46) * 100}%` }}
                      >
                        {item.resistancePct >= 10 && (
                          <span className="text-xs font-mono text-white">{item.resistancePct}%</span>
                        )}
                      </div>
                    </div>
                    {item.resistancePct < 10 && (
                      <span className="text-xs font-mono text-wiah-mid w-6 text-right">{item.resistancePct}%</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </section>

        <section id="sec-sources" className="max-w-2xl mt-12 pt-8 border-t border-wiah-border">
          <h2 className="text-lg font-bold text-wiah-black mb-4">Sources</h2>
          <div className="text-sm text-wiah-mid space-y-2 font-mono">
            <p>AMR Deaths &mdash; Global Burden of Disease Study, Institute for Health Metrics and Evaluation, 2016&ndash;2023.</p>
            <p>E. coli Resistance &mdash; UK Antimicrobial Resistance Report, Health Security Agency &amp; UKHSA, 2016&ndash;2023.</p>
            <p>Antibiotic Prescribing &mdash; Primary Care Prescribing Analysis, NHS England, 2014&ndash;2023.</p>
            <p>Resistance by Pathogen &mdash; European Antimicrobial Resistance Surveillance Network, ECDC, 2023.</p>
          </div>
        </section>
      </main>
    </>
  );
}
