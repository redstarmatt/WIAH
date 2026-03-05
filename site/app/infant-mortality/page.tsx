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

interface InfantMortalityData {
  national: {
    infantMortality: {
      timeSeries: Array<{ year: number; ratePer1000: number }>;
      latestYear: number;
      latestRate: number;
      stillbirthsAnnual: number;
    };
    internationalComparison: {
      timeSeries: Array<{ year: number; ukRate: number; franceRate: number; germanyRate: number }>;
    };
    byDeprivation: Array<{ quintile: string; ratePer1000: number }>;
  };
  metadata: {
    sources: Array<{ name: string; dataset: string; url: string; frequency: string }>;
    methodology: string;
    knownIssues: string[];
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function InfantMortalityPage() {
  const [data, setData] = useState<InfantMortalityData | null>(null);

  useEffect(() => {
    fetch('/data/infant-mortality/infant_mortality.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const infantMortalitySeries: Series[] = data
    ? [{
        id: 'infantMortality',
        label: 'Deaths per 1,000 live births',
        colour: '#E63946',
        data: data.national.infantMortality.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.ratePer1000,
        })),
      }]
    : [];

  const infantMortalityAnnotations: Annotation[] = [
    { date: new Date(2014, 5, 1), label: '2014: Rate stalls' },
  ];

  const ukSeries: Series = {
    id: 'uk',
    label: 'England &amp; Wales',
    colour: '#E63946',
    data: data
      ? data.national.internationalComparison.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.ukRate,
        }))
      : [],
  };

  const germanySeries: Series = {
    id: 'germany',
    label: 'Germany',
    colour: '#264653',
    data: data
      ? data.national.internationalComparison.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.germanyRate,
        }))
      : [],
  };

  const internationalSeries: Series[] = data ? [ukSeries, germanySeries] : [];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Infant Mortality" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Infant Mortality"
          question="Why Do More Babies Die in Britain Than in Comparable Countries?"
          finding="3.6 babies per 1,000 live births die in England and Wales &mdash; worse than France, Germany, Sweden, and Japan. Babies born in the most deprived areas are 2.5 times more likely to die in their first year than those in the least deprived. 3,000 stillbirths occur every year. The UK infant mortality rate has stalled since 2014 while comparator countries continue to improve."
          colour="#E63946"
          preposition="in"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>England and Wales recorded an infant mortality rate of 3.6 deaths per 1,000 live births in 2022 &mdash; a figure that has barely shifted since 2014 while comparable nations keep improving: Germany is at 3.0, France 3.2, Sweden 2.3. More than 3,000 stillbirths occur every year. The NHS Saving Babies&apos; Lives Care Bundle, launched in 2016 and updated in 2019, brought standardised protocols for fetal movement monitoring and CTG interpretation into maternity units; trusts that fully adopted it saw stillbirth rates fall by approximately 20%. Yet progress has stalled partly because of maternity staffing shortfalls &mdash; RCOG estimates a shortage of more than 500 consultant obstetricians &mdash; and because continuity of carer, which evidence links to better outcomes, remains available to fewer than a quarter of women.</p>
            <p>The death rate is not distributed evenly. In the most deprived areas, 5.4 babies per 1,000 live births die before their first birthday; in the least deprived, the figure is 2.2 &mdash; a gap of more than 2.5 times. MBRRACE-UK&apos;s perinatal mortality reports consistently find that babies born to Black and South Asian mothers face significantly elevated risks of stillbirth and neonatal death, driven by underlying health conditions, access to antenatal care, and institutional failings. Black women&apos;s pain is underassessed in maternity settings, complaints are more likely to be dismissed, and language barriers reduce antenatal care quality. After 15 years of monitoring, the MBRRACE-UK reports show no meaningful narrowing of the racial gap in infant death. Regional variation mirrors the deprivation gradient, with rates in parts of the North and Midlands persistently above the national average.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-trend', label: 'Mortality Trend' },
          { id: 'sec-international', label: 'International' },
          { id: 'sec-deprivation', label: 'By Deprivation' },
        ]} />

        <ScrollReveal>
          <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Infant mortality rate (England &amp; Wales)"
              value="3.6"
              direction="flat"
              polarity="up-is-bad"
              changeText="Per 1,000 live births &middot; 2022 &middot; Rate stalled since 2014 &middot; Worse than France, Germany &amp; Sweden"
              sparklineData={[4.1, 4.0, 3.9, 3.9, 3.8, 3.8, 3.8, 3.7, 3.6, 3.6, 3.6]}
              href="#sec-overview"/>
            <MetricCard
              label="Stillbirths (England &amp; Wales)"
              value="3,000"
              direction="down"
              polarity="up-is-bad"
              changeText="Per year &middot; 2022 &middot; Down from 4,100 in 2012 &middot; Halve by 2025 target &mdash; on track"
              sparklineData={[4100, 4000, 3900, 3800, 3700, 3600, 3500, 3400, 3200, 3100, 3000]}
              href="#sec-trend"/>
            <MetricCard
              label="Deprivation gap (most vs least deprived)"
              value="2.5x"
              direction="flat"
              polarity="up-is-bad"
              changeText="2022 &middot; Most deprived: 5.4 per 1,000 &middot; Least deprived: 2.2 per 1,000 &middot; Ethnic disparities also significant"
              sparklineData={[2.5, 2.5, 2.5, 2.5, 2.4, 2.4, 2.5, 2.5, 2.5, 2.5, 2.5]}
              href="#sec-international"/>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-trend" className="mb-12">
            <LineChart
              title="Infant mortality rate, England &amp; Wales, 2012&ndash;2022"
              subtitle="Deaths under 1 year per 1,000 live births. The rate has stalled since 2014, while many comparable countries continue to improve."
              series={infantMortalitySeries}
              annotations={infantMortalityAnnotations}
              yLabel="Deaths per 1,000 live births"
              source={{
                name: 'ONS',
                dataset: 'Child Mortality in England and Wales',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-international" className="mb-12">
            <LineChart
              title="Infant mortality: UK vs Germany, 2012&ndash;2022"
              subtitle="International comparison showing diverging trends. England &amp; Wales has flatlined while Germany continues to improve."
              series={internationalSeries}
              yLabel="Deaths per 1,000 live births"
              source={{
                name: 'OECD',
                dataset: 'Health Statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-deprivation" className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-2">Infant mortality by deprivation quintile, England, 2022</h2>
            <p className="text-sm text-wiah-mid font-mono mb-6">Babies born in the most deprived areas are 2.5 times more likely to die in their first year.</p>
            {data && (
              <div className="space-y-3">
                {data.national.byDeprivation.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-40 text-sm text-wiah-black flex-shrink-0">{item.quintile}</div>
                    <div className="flex-1 bg-wiah-border rounded h-5 overflow-hidden">
                      <div
                        className="h-full rounded"
                        style={{ width: `${(item.ratePer1000 / 5.4) * 100}%`, backgroundColor: '#E63946' }}
                      />
                    </div>
                    <div className="w-16 text-right text-sm font-mono text-wiah-black">{item.ratePer1000} per 1,000</div>
                  </div>
                ))}
              </div>
            )}
            <p className="font-mono text-xs text-wiah-mid mt-4">Source: ONS &mdash; Child Mortality Statistics</p>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="What&apos;s improving"
            value="3,000"
            unit="stillbirths per year &mdash; down from 4,100 in 2012, putting the government&apos;s halving target within reach"
            description="Stillbirths in England and Wales have fallen from 4,100 in 2012 to 3,000 in 2022 &mdash; a 27% reduction that puts the NHS Long-Term Plan&apos;s target of halving rates by 2025 within reach. The Saving Babies&apos; Lives Care Bundle, mandated for all NHS maternity units, includes enhanced fetal movement monitoring, improved CTG interpretation, and standardised carbon monoxide testing. The MBRRACE-UK perinatal mortality surveillance programme allows real-time comparison of outcomes across hospitals, enabling rapid identification of under-performing units. Tommy&apos;s charity has funded research that identified maternal BMI, reduced fetal movements, and smoking as the three most modifiable risk factors."
            source="Source: ONS &mdash; Child Mortality Statistics 2022; MBRRACE-UK &mdash; Perinatal Mortality Surveillance 2023."
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
