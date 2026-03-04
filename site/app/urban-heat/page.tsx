'use client';

import { useState, useEffect } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';

interface HeatData {
  national: {
    heatDeaths: { year: number; excessDeaths: number }[];
    hotDays: { year: number; daysAbove28C: number }[];
    byVulnerability: { group: string; riskMultiplier: number }[];
  };
}

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

export default function UrbanHeatPage() {
  const [data, setData] = useState<HeatData | null>(null);

  useEffect(() => {
    fetch('/data/urban-heat/urban_heat.json')
      .then(res => res.json())
      .then(setData)
      .catch(err => console.error('Failed to load urban heat data:', err));
  }, []);

  const heatDeathsSeries: Series[] = data ? [{
    id: 'deaths',
    label: 'Excess deaths',
    colour: '#E63946',
    data: data.national.heatDeaths.map(d => ({
      date: yearToDate(d.year),
      value: d.excessDeaths
    }))
  }] : [];

  const heatDeathsAnnotations: Annotation[] = [{
    date: yearToDate(2022),
    label: '40.3°C record'
  }];

  const hotDaysSeries: Series[] = data ? [{
    id: 'days',
    label: 'Days above 28°C',
    colour: '#E63946',
    data: data.national.hotDays.map(d => ({
      date: yearToDate(d.year),
      value: d.daysAbove28C
    }))
  }] : [];

  return (
    <>
      <TopicNav topic="Urban Heat" />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <TopicHeader
          topic="Urban Heat"
          question="Are British Cities Becoming Dangerously Hot?"
          finding="The summer of 2022 saw UK temperatures exceed 40&deg;C for the first time, with over 2,800 excess deaths attributed to the heatwave. Urban areas are significantly hotter than surrounding countryside &mdash; London is on average 4&deg;C warmer &mdash; and as the climate warms, this &lsquo;heat island&rsquo; effect is intensifying. The UK has no mandatory standards for indoor temperatures in workplaces or homes."
          colour="#F4A261"
          preposition="in"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>On 19 July 2022, the temperature at Coningsby, Lincolnshire reached 40.3&deg;C &mdash; the first time the UK had ever recorded temperatures above 40&deg;C. That single day was not an anomaly but a marker. The Met Office estimates that days above 28&deg;C in England have risen from roughly 8 per year in 2010 to 21 in 2022. UKHSA attributed 2,803 excess deaths to the summer 2022 heatwave, the highest on record. The infrastructure of a country built for cold and damp is meeting a climate it was not designed for.</p>
            <p>The risks are not evenly distributed. Over-75s face a 5.4 times higher heat mortality risk than the general population; those with cardiovascular or respiratory conditions face 3.8 times the risk. Less discussed but equally serious: people taking antipsychotics or antidepressants have impaired thermoregulation, placing a substantial portion of the mental health population in acute danger during heatwaves. Central London runs on average 4&deg;C warmer than the surrounding countryside due to the urban heat island effect &mdash; heat absorbed by concrete, asphalt and buildings, with little vegetation to cool it. Top-floor flat residents, outdoor workers, and care home residents face the sharpest exposure, often with the least capacity to adapt.</p>
            <p>The structural problem is a near-total absence of heat-resilient housing. An estimated 95% of UK homes have no air conditioning, one of the lowest rates in Europe. There is no mandatory maximum indoor workplace temperature &mdash; only an advisory threshold of 30&deg;C (27&deg;C for strenuous work) &mdash; and no legal requirement for landlords to cool homes as there is to heat them. Night-time temperatures are rising particularly fast, and it is sustained overnight heat that turns a hot day into a physiological emergency: without nocturnal cooling, the body cannot recover. Housing stock built for heat retention, windows that cannot cross-ventilate, and dark rooftops that absorb rather than reflect solar radiation are legacies of a different climate assumption.</p>
            <p>There is a well-evidenced mitigation path. Urban greening &mdash; street trees, green roofs, pocket parks &mdash; reduces surface temperatures by 8&ndash;12&deg;C in studies. Scotland&apos;s National Planning Framework 4 now requires new buildings to be &apos;heat network ready&apos;, and the NHS Heat Health Alert system operates across five escalating tiers with defined clinical responses at each. The National Heatwave Action Plan is updated annually. These are genuine institutional responses, but they operate at the margins of a much larger adaptation deficit: millions of existing homes, workplaces and public buildings that will need retrofitting in a warmer climate.</p>
            <p>What the data cannot fully tell us is how mortality risk will compound as heatwaves become more frequent and more intense simultaneously. The 2022 figure of 2,803 excess deaths reflects a single exceptional event against a population not yet adapted to heat. Longer, more frequent heatwaves in successive years may produce cumulative physiological vulnerability not captured in single-event statistics. Nor does the current data adequately track heat illness presentation at primary care level, since much heat-related morbidity is managed at home or goes unrecorded. The picture is almost certainly worse than the numbers suggest.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-context', label: 'Context' },
          { id: 'sec-charts', label: 'Charts' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <section id="sec-overview" className="mt-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <MetricCard
              label="Excess deaths attributed to 2022 heatwave"
              value="2,803"
              direction="up"
              polarity="up-is-bad"
              changeText="Summer 2022 · UK record 40.3°C · Up from 760 in 2014"
              source="UKHSA Heat Mortality Monitoring Report"
              onExpand={() => {}}
            />
            <MetricCard
              label="Days above 28°C in England"
              value="21"
              direction="up"
              polarity="up-is-bad"
              changeText="2022 · Up from 8 in 2010"
              source="Met Office · Urban heat island effect adds 4°C above surrounding area"
              onExpand={() => {}}
            />
            <MetricCard
              label="UK homes with no cooling"
              value="95%"
              unit="%"
              direction="flat"
              polarity="up-is-bad"
              changeText="Estimate · vs 90% EU average · No mandatory UK building regs for maximum indoor temperature"
              source="Building Regulations & Energy Performance Certificate data"
              onExpand={() => {}}
            />
          </div>
        </section>

        <section id="sec-charts" className="mt-12 space-y-16">
          <ScrollReveal>
            <div className="bg-white rounded-lg p-6 border border-wiah-border">
              <LineChart
                title="Excess deaths attributed to heat, England, 2014–2023"
                subtitle="Annual total during summer months. Calculated by comparing actual deaths to expected baseline."
                series={heatDeathsSeries}
                annotations={heatDeathsAnnotations}
                source={{
                  name: 'UKHSA',
                  dataset: 'Heat Mortality Monitoring Report',
                  url: 'https://www.ukhsa.gov.uk/our-work/health-protection/heat-health',
                  frequency: 'annual',
                  date: '2024'
                }}
              />
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="bg-white rounded-lg p-6 border border-wiah-border">
              <LineChart
                title="Days above 28°C, England, 2010–2023"
                subtitle="Calendar year total. The 28°C threshold marks the onset of significant health risk for vulnerable populations."
                series={hotDaysSeries}
                source={{
                  name: 'Met Office',
                  dataset: 'UK Climate Observations & National Climate Information Centre',
                  url: 'https://www.metoffice.gov.uk/',
                  frequency: 'annual',
                  date: '2024'
                }}
              />
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="bg-white rounded-lg p-6 border border-wiah-border">
              <div className="mb-6">
                <h3 className="text-lg font-bold text-wiah-black mb-2">Relative heat mortality risk by group</h3>
                <p className="text-sm text-wiah-mid">Estimated multiplier of baseline mortality risk during heat stress. Those over 75 face mortality risk 5.4 times higher than working-age population.</p>
              </div>
              <div className="space-y-3">
                {data?.national.byVulnerability.map(d => {
                  const barWidth = (d.riskMultiplier / 5.4 * 100);
                  return (
                    <div key={d.group}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-wiah-black">{d.group}</span>
                        <span className="font-mono text-wiah-mid">{d.riskMultiplier.toFixed(1)}x</span>
                      </div>
                      <div className="h-2 bg-wiah-border rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{ width: `${barWidth}%`, backgroundColor: '#E63946' }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="text-xs text-wiah-mid mt-4 font-mono">
                Source: UKHSA Heat Mortality Monitoring Report · 2023 data
              </p>
            </div>
          </ScrollReveal>
        </section>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border">
          <h2 className="text-2xl font-bold text-wiah-black mb-4">Sources &amp; methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3">
            <p>
              <strong className="text-wiah-black">Excess deaths:</strong> The UK Health Security Agency calculates excess deaths during heat stress using the Office for National Statistics baseline mortality rates. Estimates account for day-to-day variation in deaths and are published annually.
            </p>
            <p>
              <strong className="text-wiah-black">Hot days:</strong> Met Office data records daily maximum temperatures across England. Days exceeding 28&deg;C represent sustained heat stress and correlate with increased mortality, hospital admissions, and public health alerts.
            </p>
            <p>
              <strong className="text-wiah-black">Urban heat islands:</strong> Temperature differential between urban and rural areas is well-established in climate science. London&apos;s urban heat island effect is documented in Environment Agency and Royal Meteorological Society studies.
            </p>
            <p>
              <strong className="text-wiah-black">Building standards:</strong> The UK Building Regulations do not mandate indoor temperature maxima for residential or workplace settings, unlike many EU jurisdictions which enforce maximum indoor temperatures (e.g. 26&deg;C in France, 30&deg;C in some EU states).
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
