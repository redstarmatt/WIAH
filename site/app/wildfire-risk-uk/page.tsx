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

interface HectaresPoint {
  year: number;
  hectaresThousands: number;
}

interface IncidentsPoint {
  year: number;
  incidents: number;
}

interface WildfireData {
  national: {
    hectaresBurned: {
      timeSeries: HectaresPoint[];
      latestYear: number;
      latestHectares: number;
      decadalAverage: number;
      note: string;
    };
    incidents: {
      timeSeries: IncidentsPoint[];
      latestYear: number;
      latestCount: number;
      note: string;
    };
    fireRiskDays: {
      historical: { period: string; highRiskDays: number }[];
      projected: { period: string; highRiskDays: number }[];
      note: string;
    };
  };
  metadata: {
    sources: { name: string; dataset: string; url: string; frequency: string }[];
    methodology: string;
    knownIssues: string[];
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function WildfireRiskUKPage() {
  const [data, setData] = useState<WildfireData | null>(null);

  useEffect(() => {
    fetch('/data/wildfire-risk-uk/wildfires.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const hectaresSeries: Series[] = data
    ? [{
        id: 'hectares',
        label: 'Hectares burned (thousands)',
        colour: '#E63946',
        data: data.national.hectaresBurned.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.hectaresThousands,
        })),
      }]
    : [];

  const incidentsSeries: Series[] = data
    ? [{
        id: 'incidents',
        label: 'Wildfire incidents',
        colour: '#F4A261',
        data: data.national.incidents.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.incidents,
        })),
      }]
    : [];

  const hectaresAnnotations: Annotation[] = [
    { date: new Date(2018, 5, 1), label: '2018: Saddleworth Moor fire (\u00a3120M cost)' },
    { date: new Date(2021, 5, 1), label: '2021: Scotland spring wildfires' },
  ];

  const incidentAnnotations: Annotation[] = [
    { date: new Date(2018, 5, 1), label: '2018: Prolonged drought and heat' },
    { date: new Date(2022, 5, 1), label: '2022: UK temperature record (40.3\u00b0C)' },
  ];

  const historicalDays = data?.national.fireRiskDays.historical ?? [];
  const projectedDays = data?.national.fireRiskDays.projected ?? [];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="UK Wildfire Risk" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="UK Wildfire Risk"
          question="Is Britain Facing a Wildfire Crisis?"
          finding="UK wildfires destroyed 9,756 hectares in 2023, three times the 2010–2020 average. The fire at Saddleworth Moor in 2018 cost £120 million. Climate projections show a 50% increase in high fire-risk days by 2050."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              The UK is not typically associated with wildfire risk, but the combination of climate change, drought, land management practices, and moorland and peatland in close proximity to urban areas creates a risk profile that has materialised with increasing frequency. The 2018 Saddleworth Moor fire — which burned for weeks, required army assistance, and cost around £120 million in response and economic impact — was a turning point in UK fire service planning. The 2021 spring wildfire season in Scotland destroyed over 12,000 hectares across multiple incidents. In July 2022, following the UK&rsquo;s first-ever 40&deg;C temperature reading, wildfires broke out across London and southern England, destroying homes in Wennington and other villages.
            </p>
            <p>
              The structural drivers are worsening. The number of days per year meeting Met Office criteria for high wildfire fire weather index has increased from an average of 12 in 2010–2020 to 16 in 2020–2024. Climate projections under mid-range scenarios suggest this could reach 24 by 2050 — a doubling from the pre-2020 baseline. Upland peatlands, which store centuries of carbon and act as natural fire breaks when wet, are degraded across large areas of England and Scotland, creating substantial fuel loads when dried by drought. The NFCC Wildfire Risk Register now covers 112 high-risk areas, but fire service capacity for large landscape fires — which require sustained multi-day responses — remains limited.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-area', label: 'Area Burned' },
          { id: 'sec-incidents', label: 'Incidents' },
          { id: 'sec-risk-days', label: 'Risk Days' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        {/* Metric cards */}
        <ScrollReveal>
          <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Hectares burned (2023)"
              value="9,756 ha"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="3x the 2010\u20132020 annual average · Driven by heat and drought"
              sparklineData={[2.1, 1.8, 2.3, 17.4, 2.8, 3.2, 12.1, 4.5, 9.8]}
              href="#sec-area"
            />
            <MetricCard
              label="Wildfire incidents (2023)"
              value="2,100"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Up from ~1,200 in 2015 · Scotland and England both affected"
              sparklineData={[1200, 1100, 1300, 2200, 1400, 1500, 3400, 1600, 2100]}
              href="#sec-area"
            />
            <MetricCard
              label="High fire-risk days per year"
              value="16 days"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Up from 12 in 2010\u20132020 · Projected 24 by 2050 · Peatland degradation worsens risk"
              sparklineData={[12, 12, 13, 14, 14, 15, 16, 16]}
              href="#sec-area"
            />
          </div>
        </ScrollReveal>

        {/* Charts */}
        <ScrollReveal>
          <section id="sec-area" className="mb-12">
            <LineChart
              title="Hectares burned by wildfires, UK, 2015–2023"
              subtitle="Area destroyed by wildfires annually. Highly variable year to year depending on weather conditions. 2018 peak dominated by Saddleworth Moor. 2021 peak driven by Scotland. Underlying trend rising."
              series={hectaresSeries}
              annotations={hectaresAnnotations}
              yLabel="Thousands of hectares"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-incidents" className="mb-12">
            <LineChart
              title="Wildfire incidents, UK, 2015–2023"
              subtitle="Number of wildfire incidents attended by fire and rescue services. Peak years correlate with heat and drought. 2021 Scotland spring season saw the highest incident count on record."
              series={incidentsSeries}
              annotations={incidentAnnotations}
              yLabel="Incidents"
            />
          </section>
        </ScrollReveal>

        {/* Fire risk days — static display */}
        <ScrollReveal>
          <section id="sec-risk-days" className="mb-12">
            <div className="mb-4">
              <h3 className="text-lg font-bold text-wiah-black">High wildfire risk days per year — historical and projected</h3>
              <p className="text-sm text-wiah-mid mt-1">Days meeting Met Office fire weather index threshold. Projected under UKCP18 RCP4.5 mid-range scenario.</p>
            </div>
            <div className="space-y-4">
              <div>
                <div className="text-xs font-mono text-wiah-mid mb-2 uppercase tracking-wide">Historical</div>
                {historicalDays.map((d) => (
                  <div key={d.period} className="flex items-center gap-4 mb-2">
                    <div className="w-44 text-sm text-wiah-mid font-mono flex-shrink-0">{d.period}</div>
                    <div className="flex-1 bg-wiah-border rounded h-5 relative">
                      <div className="h-5 rounded bg-wiah-mid" style={{ width: `${(d.highRiskDays / 30) * 100}%` }} />
                    </div>
                    <div className="w-16 text-sm font-mono text-wiah-black text-right">{d.highRiskDays} days</div>
                  </div>
                ))}
              </div>
              <div>
                <div className="text-xs font-mono text-wiah-mid mb-2 uppercase tracking-wide">Projected (RCP4.5 mid-range)</div>
                {projectedDays.map((d) => (
                  <div key={d.period} className="flex items-center gap-4 mb-2">
                    <div className="w-44 text-sm text-wiah-mid font-mono flex-shrink-0">{d.period}</div>
                    <div className="flex-1 bg-wiah-border rounded h-5 relative">
                      <div className="h-5 rounded bg-wiah-red" style={{ width: `${(d.highRiskDays / 30) * 100}%` }} />
                    </div>
                    <div className="w-16 text-sm font-mono text-wiah-black text-right">{d.highRiskDays} days</div>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-xs font-mono text-wiah-mid mt-3">Source: Met Office UKCP18 climate projections. Projections are scenario-dependent.</p>
          </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="What's improving"
            value="112"
            unit="high-risk areas on the Wildfire Risk Register"
            description="NFCC's Wildfire Risk Register now covers 112 high-risk areas with dedicated planning and resource pre-positioning. Fire and rescue services are updating their National Operational Guidance for wildfires to reflect landscape-scale fire tactics. Natural England's peatland restoration programme has restored over 60,000 hectares of blanket bog — wet peatland is far less susceptible to wildfire. Forestry Commission guidance now requires fire management plans for new woodland plantations in high-risk zones."
            source="Source: NFCC Wildfire Risk Register 2024 · Met Office UKCP18 projections · Natural England Peatland Programme."
          />
        </ScrollReveal>

        {/* Sources */}
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
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
