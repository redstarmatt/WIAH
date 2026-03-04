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
          finding="Air pollution causes an estimated 36,000 premature deaths in the UK each year &mdash; more than obesity. London breaches WHO annual PM2.5 guidelines at most monitoring sites. NO&cent; levels fell sharply after the Ultra Low Emission Zone expanded in 2023. But 43% of English local authorities still breach legal nitrogen dioxide limits."
          colour="#6B7280"
          preposition="in"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Air pollution is the largest environmental risk to public health in the United Kingdom, responsible for an estimated 28,000&ndash;36,000 premature deaths each year &mdash; a range produced by different government modelling approaches, with the higher figure from DEFRA&apos;s 2019 analysis. The principal pollutants are PM2.5 (fine particulate matter with a diameter below 2.5 micrometres, capable of penetrating deep into lung tissue and entering the bloodstream) and nitrogen dioxide (NO2), both of which drive cardiovascular disease, lung cancer and respiratory illness. Progress has been made: the national annual mean PM2.5 concentration fell from around 11 micrograms per cubic metre in 2010 to approximately 8&ndash;9 by the early 2020s. But in 2021 the World Health Organisation tightened its annual PM2.5 guideline from 10 to 5 micrograms per cubic metre, a threshold now exceeded by virtually all UK urban monitoring sites. The rollout of Clean Air Zones in Bath, Birmingham, Bradford, Bristol and Newcastle has targeted the highest-emission diesel vehicles in city centres, but coverage of the monitoring network and the geographic scope of enforcement remain uneven.</p>
            <p>Road transport is the dominant source of nitrogen dioxide in urban areas &mdash; principally diesel cars, vans and buses &mdash; accounting for around 26% of total NOx emissions nationally. But the composition of urban air pollution has shifted in ways that policy has been slow to address. As exhaust emissions have been reduced by catalytic converters and vehicle electrification, non-exhaust sources &mdash; tyre wear, brake dust and road surface abrasion &mdash; have become the largest single vehicle-related contributor to PM2.5. These cannot be regulated through emissions standards. Meanwhile, domestic solid fuel burning has grown substantially since 2012, driven partly by the fashion for wood-burning stoves; it now contributes approximately 29% of UK PM2.5 emissions, making it the largest single source category. Indoor air quality &mdash; where many people spend more than 90% of their time &mdash; is almost entirely absent from the regulatory framework. Studies have found that households burning solid fuel regularly experience indoor PM2.5 concentrations several times higher than outdoor readings at the same address.</p>
            <p>The health burden is not evenly distributed. People in the most deprived tenth of areas are 1.5 times more likely than those in the least deprived tenth to live within 150 metres of a major road, meaning they experience disproportionately higher nitrogen dioxide exposures. Children in high-pollution areas show measurably smaller lung development by age 8 compared to children in cleaner areas, with deficits that persist into adulthood. Research published in the Lancet has found associations between long-term nitrogen dioxide exposure and reduced cognitive development and attainment in children. The cardiovascular pathway is the largest killer: an estimated 17,000 deaths annually are attributed to PM2.5-driven cardiovascular disease in England alone. Lung cancer attributable to air pollution accounts for around 6% of all UK lung cancer diagnoses. An emerging body of evidence &mdash; including from cohort studies in Greater London and South Korea &mdash; links long-term PM2.5 exposure to dementia risk, with a dose-response relationship that holds after adjusting for other confounders; this association has not yet been incorporated into official mortality attributions.</p>
            <p>The legal and policy framework has been shaped significantly by litigation. In 2015 the Supreme Court ruled in favour of ClientEarth, finding that the government&apos;s air quality plans were unlawful and ordering revised plans with binding timescales &mdash; the first such ruling of its kind in the UK. Ella Adoo-Kissi-Debrah, a nine-year-old girl who died in 2013 after suffering 28 severe asthma attacks, became in 2020 the first person in the UK to have air pollution listed as a cause of death on her death certificate. &ldquo;Ella&apos;s Law&rdquo; &mdash; an amendment to the Environment Act 2021 &mdash; established a new health standard for PM2.5 in England with a legal target of 10 micrograms per cubic metre by 2040, still twice the WHO guideline. London&apos;s Ultra Low Emission Zone was expanded to all London boroughs in August 2023, bringing an additional 700,000 vehicles into scope and producing a 21% reduction in roadside nitrogen dioxide within its first year of full operation, though the expansion faced sustained political opposition. The Clean Air Act 1956 &mdash; which ended the coal-smoke smogs that killed 12,000 people in London in December 1952 &mdash; remains the foundation of British air quality legislation, updated through subsequent Environment Acts.</p>
            <p>Air quality data has well-documented structural limitations. The Automatic Urban and Rural Network (AURN) comprises around 170 monitoring stations across the UK, providing continuous real-time measurements, but the network is concentrated in major cities; large suburban and rural areas are not directly monitored. The air quality figures cited in most national analyses &mdash; including government mortality attributions &mdash; are modelled estimates interpolated from monitoring stations, weather data and emissions inventories, rather than direct measurements. Mortality attributions do not record air pollution on individual death certificates (Ella Adoo-Kissi-Debrah&apos;s case was exceptional); they are derived from population-level epidemiological modelling that produces estimates with wide confidence intervals. Indoor air quality is almost entirely unmeasured at a population level; the one-off studies that exist suggest systematic underestimation of domestic exposure. Emissions from wood-burning stoves are calculated from sales data and survey responses rather than direct measurement, and the true growth in solid fuel burning is uncertain. The dementia association, while statistically robust in multiple studies, has not been incorporated into official burden-of-disease estimates, meaning total attributable mortality figures may be materially understated.</p>
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
              changeText="Per year &middot; More than obesity &middot; Mainly cardiovascular and respiratory &middot; Cross-Government Clean Air Strategy target: reduce PM2.5 by 35% by 2030"
              sparklineData={[45000, 43000, 41000, 40000, 38000, 37000, 36000, 36000]}
              onExpand={() => {}}
            />
            <MetricCard
              label="Urban PM2.5 annual mean (μg/m³)"
              value="8.2"
              direction="down"
              polarity="up-is-bad"
              changeText="2023 &middot; Down from 12.1 in 2010 &middot; WHO limit: 5μg/m³ &middot; UK legal limit: 12μg/m³ &middot; Still 64% above WHO guideline"
              sparklineData={[12.1, 11.8, 11.2, 11.5, 10.8, 10.5, 10.2, 9.8, 9.6, 9.2, 8.1, 8.8, 8.5, 8.2]}
              onExpand={() => {}}
            />
            <MetricCard
              label="Roadside NO₂ annual mean (μg/m³)"
              value="27.8"
              direction="down"
              polarity="up-is-bad"
              changeText="2023 &middot; Legal limit: 40μg/m³ &middot; Down sharply post-ULEZ expansion 2023 &middot; 43% of English LAs still in breach"
              sparklineData={[48.2, 46.8, 45.5, 44.2, 43.0, 41.5, 40.0, 38.5, 37.0, 35.5, 28.0, 31.0, 30.5, 27.8]}
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-pollutants" className="mb-12">
            <LineChart
              title="Air pollutant levels, England, 2010&ndash;2023"
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
            <p className="font-mono text-xs text-wiah-mid mt-4">Source: DEFRA &mdash; Air Quality Statistics 2023</p>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="What&apos;s improving"
            value="&ndash;32%"
            unit="fall in UK PM2.5 concentrations since 2010"
            description="UK urban PM2.5 concentrations have fallen 32% since 2010, driven by the long-run decline of coal heating, vehicle fleet improvement, and industrial emissions controls under the EU Industrial Emissions Directive. Road transport NO₂ fell sharply in 2020 during COVID lockdowns and has not rebounded to pre-pandemic levels, as remote working and EV uptake have kept volumes lower. London&apos;s Ultra Low Emission Zone expansion in August 2023 covered all London boroughs and reduced roadside NO₂ by 21% in the first year. The Environment Act 2021 set a legally binding target to reduce PM2.5 by at least 35% by 2040."
            source="Source: DEFRA &mdash; Ambient Air Quality Statistics 2023; PHE &mdash; Health matters: air pollution."
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
