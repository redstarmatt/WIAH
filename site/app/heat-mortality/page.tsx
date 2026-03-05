'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';

// ── Types ────────────────────────────────────────────────────────────────────

interface HeatwaveDeathPoint {
  year: number;
  excessDeaths: number;
}

interface ProjectedDeathPoint {
  scenario: string;
  annualDeathsBy2050: number;
}

interface TemperatureRecord {
  year: number;
  maxTempEngland: number;
}

interface HeatMortalityData {
  heatwaveDeaths: HeatwaveDeathPoint[];
  projectedDeaths: ProjectedDeathPoint[];
  temperatureRecords: TemperatureRecord[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function HeatMortalityPage() {
  const [data, setData] = useState<HeatMortalityData | null>(null);

  useEffect(() => {
    fetch('/data/heat-mortality/heat_mortality.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const deathsSeries: Series[] = data
    ? [{
        id: 'excess-deaths',
        label: 'Excess deaths during heatwave events',
        colour: '#E63946',
        data: data.heatwaveDeaths.map(d => ({
          date: yearToDate(d.year),
          value: d.excessDeaths,
        })),
      }]
    : [];

  const latest = data?.heatwaveDeaths[data.heatwaveDeaths.length - 1];
  const latestTemp = data?.temperatureRecords[data.temperatureRecords.length - 1];
  const moderateScenario = data?.projectedDeaths.find(p => p.scenario.includes('2°C'));

  return (
    <>
      <TopicNav topic="Environment & Climate" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Heat-Related Deaths"
          question="How many people die from extreme heat in Britain?"
          finding="The 2022 heatwaves caused at least 2,985 excess deaths in England — on days when 40°C was recorded for the first time. Climate projections suggest annual heat deaths could reach 7,000 by 2050 under moderate warming scenarios."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>On 19 July 2022, the temperature at Coningsby in Lincolnshire reached 40.3°C — the first time in recorded history that the United Kingdom had exceeded 40 degrees Celsius. For a country whose housing stock was built to retain heat rather than shed it, whose NHS was designed around winter pressures rather than summer crises, and whose population had no cultural frame of reference for extreme heat, this was not simply a weather event. The excess deaths that followed — at least 2,985 above the expected baseline across the summer — represented a mortality event on a scale not seen in England since the 2003 European heatwave claimed more than 2,000 lives.</p>
            <p>The 2003 event was treated at the time as exceptional. Two decades on, it is clear it was not exceptional: it was a preview. The 2019 heatwave killed 892 people above the baseline. The 2020 heatwave, during COVID, killed 1,062. Each year with a significant heat event has pushed the death toll higher. The underlying mechanism is not mysterious: when ambient temperatures exceed the body's ability to thermoregulate — particularly at night, when bodies need to cool — cardiovascular and respiratory systems fail, especially in the elderly, the isolated, and those with underlying conditions. Urban heat islands amplify the effect: city centres in England can be 8–10°C warmer than surrounding countryside on still, cloudless nights.</p>
            <p>The populations most at risk are well-identified: those over 75, particularly those living alone; people in social housing with poor ventilation and no garden; those with heart disease, respiratory conditions, or diabetes; and those on certain medications that impair thermoregulation. These populations overlap substantially with poverty. Air conditioning, which is near-universal in much of Europe south of the Alps and in North America, is rare in UK homes. The combination of old housing stock, under-resourced social care, and a history of designing public health systems around cold-weather emergencies leaves England poorly positioned for a climate that is reliably producing extreme heat events.</p>
            <p>Climate projections from the UKHSA and the Met Office suggest the trajectory is severe. Under a moderate 2°C warming scenario — now considered conservative given current emissions trajectories — annual heat deaths in England could reach 7,000 by 2050. Under a 3°C+ scenario, they could reach 12,000. These figures assume no adaptation: no improvement in housing insulation and ventilation, no expansion of urban tree cover, no changes to social care structures. Adaptation is possible, but it requires sustained investment and planning over decades — and the window for the cheapest and most effective interventions is now.</p>
            <p>The adaptation challenge is structural. English homes are among the worst-insulated in Europe — built primarily to retain winter warmth, they are correspondingly poor at excluding summer heat. Retrofitting for summer cooling is different from retrofitting for winter warmth: it requires ventilation, shading, and thermal mass, not insulation alone. The Future Homes Standard, which from 2025 requires new homes to be built to higher environmental standards, does not yet comprehensively address overheating. Urban greening — street trees, green roofs, permeable surfaces — reduces the urban heat island effect and is one of the most cost-effective adaptation measures available, but requires local authority resources and planning changes that are currently moving slowly.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-deaths', label: 'Historical deaths' },
          { id: 'sec-projections', label: 'Projections' },
        ]} />

        {/* Metric cards */}
        <ScrollReveal>
          <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Excess deaths in 2022 heatwaves"
              value={latest ? latest.excessDeaths.toLocaleString() : '2,985'}
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Record England temperature 40.3°C reached July 2022 · most deaths in over-65s"
              sparklineData={[2139, 680, 622, 760, 863, 892, 1062, 2985]}
              source="UKHSA / ONS · 2022"
              onExpand={() => {}}
            />
            <MetricCard
              label="First time UK exceeded 40°C"
              value={latestTemp ? latestTemp.year.toString() : '2022'}
              unit=""
              direction="flat"
              polarity="up-is-bad"
              changeText={`${latestTemp?.maxTempEngland ?? 40.3}°C at Coningsby, Lincolnshire on 19 July 2022`}
              sparklineData={[38.1, 38.7, 40.3]}
              source="Met Office · 2022"
              onExpand={() => {}}
            />
            <MetricCard
              label="Projected annual heat deaths by 2050 (2°C)"
              value={moderateScenario ? moderateScenario.annualDeathsBy2050.toLocaleString() : '7,000'}
              unit="/yr"
              direction="up"
              polarity="up-is-bad"
              changeText="vs ~1,000/yr baseline today · without adaptation measures"
              sparklineData={[800, 900, 1000, 1200, 2985, 7000]}
              source="UKHSA Climate Change Risk Assessment"
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        {/* Chart: historical excess deaths */}
        <ScrollReveal>
          <div id="sec-deaths" className="mb-12">
            <LineChart
              series={deathsSeries}
              title="Excess deaths during UK heatwave events, 2003–2022"
              subtitle="Deaths above the expected seasonal baseline during significant heat events. 2022 was the deadliest on record."
              yLabel="Excess deaths"
              source={{
                name: 'UKHSA / ONS',
                dataset: 'Heat Mortality Monitoring',
                frequency: 'event-based',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Projections */}
        <ScrollReveal>
          <div id="sec-projections" className="mb-12">
            <div className="bg-white rounded-lg border border-wiah-border p-8">
              <h2 className="text-lg font-bold text-wiah-black mb-1">
                Projected annual heat deaths by 2050 — three scenarios
              </h2>
              <p className="text-sm text-wiah-mid mb-6">Based on UKHSA Climate Change Risk Assessment. All scenarios assume no significant adaptation investment.</p>
              <div className="mt-4 space-y-4">
                {data?.projectedDeaths.map((p) => {
                  const pct = (p.annualDeathsBy2050 / 13000) * 100;
                  const colour = p.annualDeathsBy2050 < 4000 ? '#F4A261' : '#E63946';
                  return (
                    <div key={p.scenario}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-wiah-black">{p.scenario}</span>
                        <span className="font-mono text-sm font-bold" style={{ color: colour }}>
                          {p.annualDeathsBy2050.toLocaleString()}/yr
                        </span>
                      </div>
                      <div className="h-6 bg-wiah-light rounded-sm overflow-hidden">
                        <div
                          className="h-full rounded-sm transition-all"
                          style={{ width: `${pct}%`, backgroundColor: colour }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="font-mono text-xs text-wiah-mid mt-4">Source: UKHSA Health Effects of Climate Change — Heat mortality projections · 2023</p>
            </div>
          </div>
        </ScrollReveal>

        {/* Sources */}
        <ScrollReveal>
          <div className="border-t border-wiah-border pt-8 mt-8">
            <h2 className="text-base font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
            <ul className="space-y-2 font-mono text-xs text-wiah-mid">
              <li>
                <a href="https://www.gov.uk/government/publications/heat-mortality-monitoring-england-report" className="underline hover:text-wiah-black" target="_blank" rel="noopener noreferrer">
                  UKHSA Heat Mortality Monitoring
                </a>
                {' '}— excess deaths during heat events, England
              </li>
              <li>
                <a href="https://www.metoffice.gov.uk/research/climate/maps-and-data/uk-climate-extremes" className="underline hover:text-wiah-black" target="_blank" rel="noopener noreferrer">
                  Met Office Climate Change — UK climate extremes
                </a>
                {' '}— temperature records and trend data
              </li>
              <li>
                <a href="https://www.ons.gov.uk/peoplepopulationandcommunity/birthsdeathsandmarriages/deaths/bulletins/excessmortalityinenglandandwales/latest" className="underline hover:text-wiah-black" target="_blank" rel="noopener noreferrer">
                  ONS Excess mortality in England and Wales
                </a>
                {' '}— excess deaths data by cause and period
              </li>
              <li>
                UKHSA Health Effects of Climate Change report — heat mortality projections by warming scenario · 2023
              </li>
            </ul>
          </div>
        </ScrollReveal>
      </main>
    </>
  );
}
