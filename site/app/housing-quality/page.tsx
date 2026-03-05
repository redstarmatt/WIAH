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

interface HousingQualityData {
  national: {
    nonDecentHomes: {
      timeSeries: Array<{ year: number; millionsNonDecent: number }>;
      latestYear: number;
      latestMillions: number;
      latestPct: number;
    };
    dampAndMould: {
      timeSeries: Array<{ year: number; affectedPct: number }>;
      latestYear: number;
      latestPct: number;
      affectedHouseholdsMillions: number;
    };
    byTenureType: Array<{ tenure: string; nonDecentPct: number }>;
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

export default function HousingQualityPage() {
  const [data, setData] = useState<HousingQualityData | null>(null);

  useEffect(() => {
    fetch('/data/housing-quality/housing_quality.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const nonDecentSeries: Series[] = data
    ? [{
        id: 'non-decent',
        label: 'Non-decent homes (millions)',
        colour: '#F4A261',
        data: data.national.nonDecentHomes.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.millionsNonDecent,
        })),
      }]
    : [];

  const dampSeries: Series[] = data
    ? [{
        id: 'damp',
        label: 'Homes with damp/mould (%)',
        colour: '#E63946',
        data: data.national.dampAndMould.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.affectedPct,
        })),
      }]
    : [];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Housing Quality" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Housing Quality"
          question="How Many British Homes Are Unfit to Live In?"
          finding="4.3 million homes in England do not meet the Decent Homes Standard. 1 million privately rented properties have Category 1 hazards (serious risk to health). The death of Awaab Ishak from mould in a Rochdale social housing flat (2020) exposed the crisis in damp and disrepair. Cold, damp homes cost the NHS &pound;1.4 billion per year."
          colour="#F4A261"
          preposition="in"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Some 4.3 million homes in England &mdash; 17% of all housing stock &mdash; fail the Decent Homes Standard, which requires properties to be structurally sound, free from serious hazards, and above a minimum thermal standard. The private rented sector is worst placed: 24% of privately rented homes are non-decent, compared with 11% of social housing. Around one million homes have damp or mould, directly linked to respiratory and cardiovascular illness; children in persistently damp homes are three times more likely to develop asthma. Cold and damp housing costs the NHS an estimated &pound;1.4 billion per year. The Awaab Ishak case &mdash; a two-year-old who died from black mould in a Rochdale social housing flat in 2020 &mdash; exposed a culture of deference over enforcement, leading to Awaab&apos;s Law (Social Housing (Regulation) Act 2023), which requires social landlords to investigate damp within 14 days. More than 11,000 buildings had not yet completed cladding remediation assessment by early 2026.</p>
            <p>The harms of poor housing fall disproportionately on children, ethnic minorities, and low-income households. Overcrowding affects 320,000 households; children in temporary accommodation &mdash; a record 145,000 in 2023 &mdash; face measurably worse developmental outcomes. Black and Asian households are disproportionately concentrated in the worst private rented conditions, shaped by discrimination in lettings markets and geographic concentration in areas with older, poorly maintained stock. The number of non-decent homes has fallen from 7.5 million in 2010 to 4.3 million in 2022, and the Renters&apos; Rights Act will extend the Decent Homes Standard to the private sector for the first time.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-decent', label: 'Decent Homes' },
          { id: 'sec-damp', label: 'Damp & Mould' },
          { id: 'sec-tenure', label: 'By Tenure' },
        ]} />

        <ScrollReveal>
          <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Homes not meeting Decent Homes Standard"
              value="4.3M"
              direction="down"
              polarity="up-is-bad"
              changeText="2022 &middot; 17% of housing stock &middot; Down from 7.5M in 2010 &middot; Private rented sector worst: 24% non-decent"
              sparklineData={[7.5, 6.5, 5.7, 5.0, 4.7, 4.5, 4.3]}
              href="#sec-overview"/>
            <MetricCard
              label="Homes with damp or mould problem"
              value="1M"
              direction="up"
              polarity="up-is-bad"
              changeText="2022 &middot; 4.5% of all dwellings &middot; Private renters 3x more likely to have damp &middot; Awaab&apos;s Law: new social housing regulations 2024"
              sparklineData={[3.8, 3.7, 3.9, 4.0, 4.3, 4.2, 4.5]}
              href="#sec-decent"/>
            <MetricCard
              label="Cost of cold and damp homes to NHS"
              value="&pound;1.4bn"
              direction="flat"
              polarity="up-is-bad"
              changeText="Per year &middot; BRE estimate &middot; Respiratory &amp; cardiovascular conditions &middot; Children in damp homes 3x more likely to get asthma"
              sparklineData={[1.1, 1.1, 1.2, 1.2, 1.3, 1.3, 1.4, 1.4, 1.4]}
              href="#sec-damp"/>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-decent" className="mb-12">
            <LineChart
              title="Homes not meeting the Decent Homes Standard, England, 2010&ndash;2022"
              subtitle="Number of dwellings that do not meet the Decent Homes Standard (millions)."
              series={nonDecentSeries}
              yLabel="Non-decent homes (millions)"
              source={{
                name: 'DLUHC',
                dataset: 'English Housing Survey',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-damp" className="mb-12">
            <LineChart
              title="Homes with damp or mould, England, 2014&ndash;2022"
              subtitle="Percentage of dwellings with damp or mould problems."
              series={dampSeries}
              yLabel="% of dwellings with damp"
              source={{
                name: 'DLUHC',
                dataset: 'English Housing Survey',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-tenure" className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-2">Proportion of non-decent homes by tenure, England, 2022</h2>
            <p className="text-sm text-wiah-mid font-mono mb-6">Percentage of dwellings not meeting Decent Homes Standard by tenure type.</p>
            {data && (
              <div className="space-y-3">
                {data.national.byTenureType.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-40 text-sm text-wiah-black flex-shrink-0">{item.tenure}</div>
                    <div className="flex-1 bg-wiah-border rounded h-5 overflow-hidden">
                      <div
                        className="h-full rounded"
                        style={{ width: `${(item.nonDecentPct / 24) * 100}%`, backgroundColor: '#F4A261' }}
                      />
                    </div>
                    <div className="w-16 text-right text-sm font-mono text-wiah-black">{item.nonDecentPct}%</div>
                  </div>
                ))}
              </div>
            )}
            <p className="font-mono text-xs text-wiah-mid mt-4">Source: DLUHC &mdash; English Housing Survey 2022/23</p>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="What&apos;s improving"
            value="3.2M"
            unit="homes brought up to the Decent Homes Standard since 2010 &mdash; a 43% improvement"
            description="The number of non-decent homes has fallen from 7.5 million in 2010 to 4.3 million in 2022 &mdash; a reduction of 3.2 million. The Decent Homes Programme (2001&ndash;2010) upgraded 1.6 million social homes. Awaab&apos;s Law, included in the Social Housing (Regulation) Act 2023, requires social landlords to investigate and fix reported damp and mould within strict timeframes &mdash; 14 days for emergencies. The Renters (Reform) Bill (2024) proposes extending Decent Homes Standards to the private rented sector for the first time. The government&apos;s Warm Homes Plan commits to upgrading 5 million homes by 2030 through the Great British Insulation Scheme and targeted grants."
            source="Source: DLUHC &mdash; English Housing Survey 2022/23; BRE &mdash; The Cost of Poor Housing in England 2023."
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
