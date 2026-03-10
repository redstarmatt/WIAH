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

interface AirQualityData {
  national: {
    pm25: {
      timeSeries: Array<{ year: number; annualMeanUgM3: number }>;
      latestYear: number;
      latestMean: number;
      whoLimit: number;
      ukLimit: number;
    };
    no2: {
      timeSeries: Array<{ year: number; annualMeanUgM3: number }>;
      latestYear: number;
      latestMean: number;
      legalLimit: number;
    };
    prematureDeaths: {
      annualEstimate: number;
    };
    emissionsBySource: Array<{ source: string; contributionPct: number }>;
  };
  metadata: {
    sources: Array<{ name: string; dataset: string; url: string; frequency: string }>;
    methodology: string;
    knownIssues: string[];
  };
}

// ── Component ────────────────────────────────────────────────────────────────

export default function AirQualityPage() {
  const [data, setData] = useState<AirQualityData | null>(null);

  useEffect(() => {
    fetch('/data/air-quality/air_quality.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // Derive series for dual-pollutant chart
  const pollutantSeries: Series[] = data
    ? [
        {
          id: 'pm25',
          label: 'PM2.5 (μg/m³)',
          colour: '#E63946',
          data: data.national.pm25.timeSeries.map(d => ({
            date: new Date(d.year, 0, 1),
            value: d.annualMeanUgM3,
          })),
        },
        {
          id: 'no2-scaled',
          label: 'NO₂ (μg/m³) / 5',
          colour: '#F4A261',
          data: data.national.no2.timeSeries.map(d => ({
            date: new Date(d.year, 0, 1),
            value: d.annualMeanUgM3 / 5,
          })),
        },
      ]
    : [];

  const pollutantAnnotations: Annotation[] = [
    {
      date: new Date(2020, 0, 1),
      label: '2020: COVID lockdown',
    },
  ];

  return (
    <>
      <TopicNav topic="Air Quality" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Air Quality"
          question="Is the Air in British Cities Actually Safe to Breathe?"
          finding="Air pollution causes an estimated 36,000 premature deaths in the UK each year — more than obesity. London breaches WHO annual PM2.5 guidelines at most monitoring sites. NO&cent; levels fell sharply after the Ultra Low Emission Zone expanded in 2023. But 43% of English local authorities still breach legal nitrogen dioxide limits."
          colour="#6B7280"
          preposition="in"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Air pollution is the largest environmental risk to public health in the UK, responsible for an estimated 28,000–36,000 premature deaths each year. The national annual mean PM2.5 concentration fell from around 11 &mu;g/m&sup3; in 2010 to approximately 8–9 by the early 2020s, driven by the long-run decline of coal heating, vehicle fleet improvement, and industrial emissions controls. However, the WHO tightened its annual PM2.5 guideline from 10 to 5 &mu;g/m&sup3; in 2021 — a threshold now exceeded by virtually all UK urban monitoring sites. London's ULEZ expansion in August 2023 brought an additional 700,000 vehicles into scope and reduced roadside NO2 by 21% within its first year. Domestic solid fuel burning now contributes approximately 29% of UK PM2.5 emissions — the largest single source — following growth in wood-burning stoves since 2012, a shift policy has been slow to address. The Environment Act 2021 sets a legally binding target of 10 &mu;g/m&sup3; annual mean PM2.5 by 2040, still twice the WHO guideline.</p>
            <p>The health burden is deeply unequal. People in the most deprived areas are 1.5 times more likely than those in the least deprived to live within 150 metres of a major road. Children in high-pollution areas show measurably smaller lung development by age 8, with deficits persisting into adulthood; Lancet research associates long-term NO2 exposure with reduced cognitive development and educational attainment. An estimated 17,000 deaths annually are attributed to PM2.5-driven cardiovascular disease in England alone, and emerging cohort studies link long-term exposure to dementia risk. The legal framework has been driven significantly by litigation: the 2015 Supreme Court ruling against the government and the 2020 ruling that air pollution contributed to Ella Adoo-Kissi-Debrah's death were both landmark moments that forced policy change.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-pollutants', label: 'Pollutant Levels' },
          { id: 'sec-sources', label: 'Emission Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Premature deaths from air pollution"
              value="36,000"
              direction="down"
              polarity="up-is-bad"
              changeText="Per year · More than obesity · Mainly cardiovascular and respiratory · Cross-Government Clean Air Strategy target: reduce PM2.5 by 35% by 2030"
              sparklineData={[45000, 43000, 41000, 40000, 38000, 37000, 36000, 36000]}
              href="#sec-pollutants"/>
            <MetricCard
              label="Urban PM2.5 annual mean (μg/m³)"
              value="8.2"
              direction="down"
              polarity="up-is-bad"
              changeText="2023 · Down from 12.1 in 2010 · WHO limit: 5μg/m³ · UK legal limit: 12μg/m³ · Still 64% above WHO guideline"
              sparklineData={[12.1, 11.8, 11.2, 11.5, 10.8, 10.5, 10.2, 9.8, 9.6, 9.2, 8.1, 8.8, 8.5, 8.2]}
              href="#sec-sources"/>
            <MetricCard
              label="Roadside NO₂ annual mean (μg/m³)"
              value="27.8"
              direction="down"
              polarity="up-is-bad"
              changeText="2023 · Legal limit: 40μg/m³ · Down sharply post-ULEZ expansion 2023 · 43% of English LAs still in breach"
              sparklineData={[48.2, 46.8, 45.5, 44.2, 43.0, 41.5, 40.0, 38.5, 37.0, 35.5, 28.0, 31.0, 30.5, 27.8]}
              href="#sec-sources"/>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-pollutants" className="mb-12">
            <LineChart
              title="Air pollutant levels, England, 2010–2023"
              subtitle="PM2.5 (urban background, μg/m³) and NO₂/5 (roadside, scaled). Both declining. UK annual PM2.5 limit: 12μg/m³. WHO guideline: 5μg/m³."
              series={pollutantSeries}
              yLabel="μg/m³"
              annotations={pollutantAnnotations}
              source={{
                name: 'DEFRA',
                dataset: 'Ambient Air Quality Statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-sources" className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-2">Air pollution contribution by source</h2>
            <p className="text-sm text-wiah-mid font-mono mb-6">Estimated contribution to UK PM2.5 emissions by source.</p>
            {data && (
              <div className="space-y-3">
                {data.national.emissionsBySource.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-40 text-sm text-wiah-black flex-shrink-0">{item.source}</div>
                    <div className="flex-1 bg-wiah-border rounded h-5 overflow-hidden">
                      <div
                        className="h-full rounded"
                        style={{ width: `${(item.contributionPct / 34) * 100}%`, backgroundColor: '#6B7280' }}
                      />
                    </div>
                    <div className="w-12 text-right text-sm font-mono text-wiah-black">{item.contributionPct}%</div>
                  </div>
                ))}
              </div>
            )}
            <p className="font-mono text-xs text-wiah-mid mt-4">Source: DEFRA — Air Quality Statistics 2023</p>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="What's improving"
            value="–32%"
            unit="fall in UK PM2.5 concentrations since 2010"
            description="UK urban PM2.5 concentrations have fallen 32% since 2010, driven by the long-run decline of coal heating, vehicle fleet improvement, and industrial emissions controls under the EU Industrial Emissions Directive. Road transport NO₂ fell sharply in 2020 during COVID lockdowns and has not rebounded to pre-pandemic levels, as remote working and EV uptake have kept volumes lower. London's Ultra Low Emission Zone expansion in August 2023 covered all London boroughs and reduced roadside NO₂ by 21% in the first year. The Environment Act 2021 set a legally binding target to reduce PM2.5 by at least 35% by 2040."
            source="Source: DEFRA — Ambient Air Quality Statistics 2023; PHE — Health matters: air pollution."
          />
        </ScrollReveal>

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
      </main>
    </>
  );
}
