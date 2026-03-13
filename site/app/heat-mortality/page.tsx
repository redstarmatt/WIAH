'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'UKHSA', dataset: 'Heat Mortality Monitoring', url: 'https://www.gov.uk/government/publications/heat-mortality-monitoring-england-report', date: '2022' },
  { num: 2, name: 'Met Office', dataset: 'UK climate extremes', url: 'https://www.metoffice.gov.uk/research/climate/maps-and-data/uk-climate-extremes', date: '2022' },
  { num: 3, name: 'UKHSA', dataset: 'Health Effects of Climate Change — heat mortality projections', date: '2023' },
];

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
            <p>On 19 July 2022, the temperature at Coningsby in Lincolnshire reached 40.3&deg;C — the first time in recorded history the UK had exceeded 40 degrees<Cite nums={2} /> — and at least 2,985 excess deaths followed across the summer.<Cite nums={1} /> This was not an aberration: the 2019 heatwave killed 892 people above baseline; the 2020 heatwave during COVID killed 1,062.<Cite nums={1} /> Each year with a significant heat event has pushed the toll higher. Climate projections from UKHSA suggest annual heat deaths could reach 7,000 by 2050 under a moderate 2&deg;C warming scenario and 12,000 under 3&deg;C+ — figures that assume no adaptation.<Cite nums={3} /> Urban heat islands amplify exposure: city centres can be 8–10&deg;C warmer than surrounding countryside on still, cloudless nights, when elderly people most need the temperature to fall.</p>
            <p>The populations most at risk are well-identified and overlap substantially with poverty: those over 75 living alone, people in social housing with poor ventilation, those with heart disease or diabetes, and people on medications that impair thermoregulation. Air conditioning is rare in UK homes; the housing stock was built to retain winter warmth, not shed summer heat, making retrofit for cooling structurally different from insulation programmes. The Future Homes Standard from 2025 does not yet comprehensively address overheating. Urban greening — street trees, green roofs, permeable surfaces — is among the most cost-effective adaptation measures available but requires local authority resources and planning changes that are currently moving slowly relative to the pace of warming.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-deaths', label: 'Historical deaths' },
          { id: 'sec-projections', label: 'Projections' },
        ]} />

        {/* Metric cards */}
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
              href="#sec-deaths"/>
            <MetricCard
              label="First time UK exceeded 40°C"
              value={latestTemp ? latestTemp.year.toString() : '2022'}
              unit=""
              direction="flat"
              polarity="up-is-bad"
              changeText={`${latestTemp?.maxTempEngland ?? 40.3}°C at Coningsby, Lincolnshire on 19 July 2022`}
              sparklineData={[38.1, 38.7, 40.3]}
              source="Met Office · 2022"
              href="#sec-projections"/>
            <MetricCard
              label="Projected annual heat deaths by 2050 (2°C)"
              value={moderateScenario ? moderateScenario.annualDeathsBy2050.toLocaleString() : '7,000'}
              unit="/yr"
              direction="up"
              polarity="up-is-bad"
              changeText="vs ~1,000/yr baseline today · without adaptation measures"
              sparklineData={[800, 900, 1000, 1200, 2985, 7000]}
              source="UKHSA Climate Change Risk Assessment"
              href="#sec-projections"/>
          </div>
        

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

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
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
              <RelatedTopics />
      </main>
    </>
  );
}
