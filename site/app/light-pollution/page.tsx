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
  { num: 1, name: 'NOAA Earth Observation Group', dataset: 'VIIRS Day/Night Band Nighttime Lights', url: 'https://eogdata.mines.edu/products/vnl/', date: '2025' },
  { num: 2, name: 'CPRE', dataset: 'Night Blight: Mapping England\'s Light Pollution', url: 'https://www.cpre.org.uk/light-pollution-dark-skies-map/', date: '2023' },
  { num: 3, name: 'University of Exeter', dataset: 'Moth population decline and artificial light', date: '2023', note: 'Studies linking sky glow to 33% moth population decline in light-polluted areas', url: 'https://www.exeter.ac.uk/research/' },
  { num: 4, name: 'Shropshire Council', dataset: 'Street Lighting LED Conversion Report', date: '2024', url: 'https://www.shropshire.gov.uk/' },
];

// ── Types ────────────────────────────────────────────────────────────────────

interface SkyGlowPoint {
  year: number;
  radiance: number;
  note?: string;
}

interface DarkSkyPoint {
  year: number;
  pct: number;
  note?: string;
}

interface LedPoint {
  year: number;
  pctLed: number;
}

interface RegionData {
  region: string;
  radianceIndex: number;
}

interface LightPollutionData {
  artificialSkyGlow: SkyGlowPoint[];
  darkSkyLandPct: DarkSkyPoint[];
  ledConversion: LedPoint[];
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

export default function LightPollutionPage() {
  const [data, setData] = useState<LightPollutionData | null>(null);

  useEffect(() => {
    fetch('/data/light-pollution/light_pollution.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const skyGlowSeries: Series[] = data
    ? [{
        id: 'sky-glow',
        label: 'Artificial sky brightness (index)',
        colour: '#F4A261',
        data: data.artificialSkyGlow.map(d => ({
          date: yearToDate(d.year),
          value: d.radiance,
        })),
      }]
    : [];

  const darkSkySeries: Series[] = data
    ? [{
        id: 'dark-sky',
        label: '% of England with dark skies',
        colour: '#264653',
        data: data.darkSkyLandPct.map(d => ({
          date: yearToDate(d.year),
          value: d.pct,
        })),
      }]
    : [];

  const ledSeries: Series[] = data
    ? [{
        id: 'led-conversion',
        label: '% street lights converted to LED',
        colour: '#2A9D8F',
        data: data.ledConversion.map(d => ({
          date: yearToDate(d.year),
          value: d.pctLed,
        })),
      }]
    : [];

  const latestGlow = data?.artificialSkyGlow[data.artificialSkyGlow.length - 1];
  const baselineGlow = data?.artificialSkyGlow[0];
  const latestDarkSky = data?.darkSkyLandPct[data.darkSkyLandPct.length - 1];
  const baselineDarkSky = data?.darkSkyLandPct[0];
  const latestLed = data?.ledConversion[data.ledConversion.length - 1];

  const glowIncrease = latestGlow && baselineGlow
    ? latestGlow.radiance - baselineGlow.radiance
    : 51;

  const darkSkyLoss = baselineDarkSky && latestDarkSky
    ? (baselineDarkSky.pct - latestDarkSky.pct).toFixed(1)
    : '11.5';

  return (
    <>
      <TopicNav topic="Light Pollution" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Light Pollution"
          question="How Dark Are Britain's Skies?"
          finding="Artificial sky brightness has risen 51% since 2011. Less than a fifth of England is dark enough to see the Milky Way, and that share is shrinking every year."
          colour="#6B7280"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Light pollution is one of the fastest-growing forms of environmental degradation in the UK, yet it receives a fraction of the policy attention given to air or water quality. Satellite measurements show that artificial sky brightness over England has increased by roughly 51% since 2011,<Cite nums={1} /> driven by the proliferation of LED lighting, commercial signage, domestic security lights, and the expansion of warehouse and logistics parks along motorway corridors. The shift to LED street lighting -- now covering 89% of council-maintained roads -- was intended to reduce energy consumption, and it has. But many early conversions used high colour temperature (4000K+) blue-white LEDs that scatter more light into the upper atmosphere than the sodium lamps they replaced, paradoxically worsening sky glow even as energy bills fell.</p>
            <p>The consequences extend far beyond stargazing. Artificial light at night disrupts the circadian biology of humans and wildlife alike. Studies from the University of Exeter have linked increased sky glow to declines in moth populations -- down 33% since 2000 in light-polluted areas -- and disrupted migration patterns for birds.<Cite nums={3} /> In humans, chronic exposure to artificial light at night is associated with sleep disruption, increased cortisol, and elevated risks of metabolic disorder. The economic case for darker skies is also strong: dark sky tourism generated an estimated GBP 25 million annually in Northumberland alone.</p>
            <p>CPRE's mapping shows that only 19.7% of England's land area now qualifies as genuinely dark -- down from 31% in 2011.<Cite nums={2} /> Six areas hold International Dark Sky status, but these are concentrated in sparsely populated uplands. For the 85% of the population living in urban areas, the Milky Way is invisible. The good news is that the problem is technically simple to fix: shielded, warm-colour, dimmed, and curfewed lighting can reduce sky glow by 50-70% with no loss of safety. Several councils -- including Shropshire, Devon, and Cumbria -- have demonstrated this at scale.<Cite nums={4} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-sky-glow', label: 'Sky brightness' },
          { id: 'sec-dark-sky', label: 'Dark sky loss' },
          { id: 'sec-led', label: 'LED conversion' },
          { id: 'sec-regional', label: 'Regional' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Artificial sky brightness"
            value={latestGlow ? `+${glowIncrease}%` : '+51%'}
            unit="since 2011"
            direction="up"
            polarity="up-is-bad"
            changeText="Satellite-measured radiance index, 2011 baseline = 100"
            sparklineData={
              data ? sparkFrom(data.artificialSkyGlow.map(d => d.radiance)) : []
            }
            source="NOAA / VIIRS Day-Night Band, 2025"
            href="#sec-sky-glow"
          />
          <MetricCard
            label="England with dark skies"
            value={latestDarkSky ? `${latestDarkSky.pct}%` : '19.7%'}
            unit="of land area"
            direction="down"
            polarity="down-is-bad"
            changeText={`Down ${darkSkyLoss} percentage points since 2011`}
            sparklineData={
              data ? sparkFrom(data.darkSkyLandPct.map(d => d.pct)) : []
            }
            source="CPRE Night Blight mapping, 2025"
            href="#sec-dark-sky"
          />
          <MetricCard
            label="Street lights now LED"
            value={latestLed ? `${latestLed.pctLed}%` : '89%'}
            unit="of council stock"
            direction="up"
            polarity="up-is-good"
            changeText="Up from 8% in 2015 -- energy savings but sky glow trade-off"
            sparklineData={
              data ? sparkFrom(data.ledConversion.map(d => d.pctLed)) : []
            }
            source="UK Highway Authorities, 2025"
            href="#sec-led"
          />
        </div>

        {/* Chart 1: Artificial sky glow */}
        <ScrollReveal>
          <div id="sec-sky-glow" className="mb-12">
            <LineChart
              series={skyGlowSeries}
              title="Artificial sky brightness over England, 2011-2025"
              subtitle="Satellite-measured upward radiance, indexed to 2011 = 100. Note the temporary dip during 2020 lockdowns."
              yLabel="Radiance index"
              source={{
                name: 'NOAA Earth Observation Group',
                dataset: 'VIIRS Day/Night Band Nighttime Lights',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 2: Dark sky land area */}
        <ScrollReveal>
          <div id="sec-dark-sky" className="mb-12">
            <LineChart
              series={darkSkySeries}
              title="Percentage of England dark enough to see the Milky Way, 2011-2025"
              subtitle="Share of land area below CPRE's dark sky radiance threshold. Down from 31% to under 20% in fourteen years."
              yLabel="% of land area"
              source={{
                name: 'CPRE',
                dataset: 'Night Blight: Mapping England\'s Light Pollution',
                frequency: 'periodic',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 3: LED street light conversion */}
        <ScrollReveal>
          <div id="sec-led" className="mb-12">
            <LineChart
              series={ledSeries}
              title="Local authority street light LED conversion, 2015-2025"
              subtitle="Percentage of council-maintained street lights converted to LED. Energy use down, but early high-colour-temperature LEDs worsened sky glow."
              yLabel="% converted to LED"
              source={{
                name: 'UK Highway Authorities',
                dataset: 'Street Lighting Returns',
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
                Artificial sky brightness by region (radiance index)
              </h2>
              <p className="text-sm text-wiah-mid mb-6">
                Higher values indicate brighter skies and greater light pollution. London is over 9x brighter than Scotland.
              </p>
              <div className="mt-6 space-y-4">
                {data?.byRegion.map((r) => {
                  const pct = (r.radianceIndex / 450) * 100;
                  return (
                    <div key={r.region}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-wiah-black">{r.region}</span>
                        <span className="font-mono text-sm font-bold text-wiah-black">{r.radianceIndex}</span>
                      </div>
                      <div className="h-6 bg-wiah-light rounded-sm overflow-hidden">
                        <div
                          className="h-full rounded-sm transition-all"
                          style={{ width: `${pct}%`, backgroundColor: '#6B7280' }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="font-mono text-xs text-wiah-mid mt-4">Source: NOAA VIIRS Day/Night Band, regional aggregation by CPRE, 2025</p>
            </div>
          </div>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Dark sky-friendly lighting works — and some councils are proving it"
            value="50-70% reduction"
            description="Shielded, warm-colour (2700K or below), dimmed, and curfewed street lighting can reduce sky glow by 50-70% with no reduction in road safety. Shropshire Council's countywide conversion to part-night, warm-LED lighting cut upward light spill by 60% and saved GBP 1.2 million annually. Devon and Cumbria have followed similar programmes. The International Dark-Sky Association has designated six UK sites — including Northumberland, Exmoor, and Snowdonia — as International Dark Sky Reserves, demonstrating that darkness and development can coexist. Dark sky tourism in Northumberland alone generates an estimated GBP 25 million per year, proving that protecting the night sky is not just an environmental measure but an economic opportunity."
            source="Source: CPRE Night Blight report, 2023. IDA UK Dark Sky Places programme, 2025. Shropshire Council lighting report, 2024."
          />
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p><strong>Artificial sky brightness:</strong> NOAA Earth Observation Group, VIIRS Day/Night Band nighttime lights composites. Radiance indexed to 2011 = 100 for England. Annual composites exclude stray light and cloud-contaminated observations.</p>
            <p><strong>Dark sky land area:</strong> CPRE Night Blight mapping, using satellite radiance thresholds to classify land as &quot;dark enough to reliably see the Milky Way&quot; (below 1 nanoWatt/cm2/sr). Modelled classification, not direct sky quality meter readings.</p>
            <p><strong>LED conversion:</strong> Compiled from UK Highway Authority annual returns on street lighting stock. Covers council-maintained roads only; privately owned and commercial lighting is excluded.</p>
            <p><strong>Known issues:</strong> VIIRS satellite replaced DMSP in 2012. Pre-2012 data not directly comparable; series begins at 2011 calibrated overlap year. LED conversion figures may undercount due to incomplete returns from some authorities. CPRE mapping is periodic, not annual — intervening years are interpolated.</p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
