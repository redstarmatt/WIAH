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

interface NHSBedsData {
  national: {
    bedNumbers: {
      timeSeries: Array<{ year: string; bedsThousands: number }>;
      latestYear: string;
      latestThousands: number;
      historicalPeak: number;
      historicalPeakYear: number;
    };
    bedOccupancy: {
      timeSeries: Array<{ year: string; occupancyPct: number }>;
      latestYear: string;
      latestPct: number;
      safetyThresholdPct: number;
    };
    byBedType: Array<{ bedType: string; pct: number }>;
  };
  metadata: {
    sources: Array<{ name: string; dataset: string; url: string; frequency: string }>;
    methodology: string;
    knownIssues: string[];
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function fyToDate(fy: string): Date {
  const start = parseInt(fy.split('/')[0]);
  return new Date(start, 3, 1);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function NHSBedsPage() {
  const [data, setData] = useState<NHSBedsData | null>(null);

  useEffect(() => {
    fetch('/data/nhs-beds/nhs_beds.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const bedsSeries: Series[] = data
    ? [{
        id: 'beds',
        label: 'NHS hospital beds (thousands)',
        colour: '#E63946',
        data: data.national.bedNumbers.timeSeries.map(d => ({
          date: fyToDate(d.year),
          value: d.bedsThousands,
        })),
      }]
    : [];

  const bedsAnnotations: Annotation[] = [
    { date: new Date(1987, 5, 1), label: '1987: Peak 300K beds' },
  ];

  const occupancySeries: Series[] = data
    ? [{
        id: 'occupancy',
        label: 'Occupancy rate (%)',
        colour: '#E63946',
        data: data.national.bedOccupancy.timeSeries.map(d => ({
          date: fyToDate(d.year),
          value: d.occupancyPct,
        })),
      }]
    : [];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="NHS Beds" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="NHS Beds"
          question="Has the NHS Run Out of Hospital Beds?"
          finding="England has 99,000 hospital beds — down from 300,000 in 1987 and the lowest per capita in the developed world. Bed occupancy runs at 94% — above the 85% safety threshold. The NHS needs 10,000 more beds to meet demand safely. 1 in 5 hospital beds is occupied by a patient fit for discharge but awaiting social care."
          colour="#E63946"
          preposition="in"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>England had 99,000 NHS hospital beds in 2022/23 — down from 135,000 in 2010 and from a post-war peak of 300,000 in 1987. At 2.1 beds per 1,000 population, England has the lowest density in western Europe: the EU average is 5.4 per 1,000, Germany runs at 8.0, and France at 5.9. The consequences of that gap are visible in the occupancy data. Average bed occupancy reached 94% in 2022/23, well above the 85% threshold above which infection-control protocols become hard to maintain and patient safety outcomes begin to deteriorate. That figure represents a structural condition, not a temporary surge: occupancy has not fallen below 88% since 2012/13.</p>
            <p>The long-run reduction in beds was not an accident. It was a deliberate policy response to evidence — broadly correct — that shorter lengths of stay, day-case surgery, and community-based care produced better outcomes at lower cost than extended inpatient admission. The shift worked well where community infrastructure kept pace. It did not where social care failed to. England's social care system currently carries a 152,000-vacancy gap, and the result is measurable: 13,500 patients per day occupy acute hospital beds while being clinically fit for discharge, blocked by the absence of a care home place, domiciliary care package, or supported housing arrangement. That single cohort accounts for roughly 1 in 8 acute beds — de facto wasted capacity that drives the chronic occupancy crisis upstream.</p>
            </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-beds', label: 'Bed Numbers' },
          { id: 'sec-occupancy', label: 'Occupancy' },
          { id: 'sec-types', label: 'Bed Types' },
        ]} />

        <ScrollReveal>
          <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="NHS hospital beds, England"
              value="99K"
              direction="down"
              polarity="up-is-good"
              changeText="2022/23 · Down from 300K in 1987 · Lowest per capita in Western Europe · 10K more beds needed (NHS estimate)"
              sparklineData={[135, 130, 126, 122, 115, 110, 103, 99]}
              onExpand={() => {}}
            />
            <MetricCard
              label="NHS bed occupancy rate"
              value="94%"
              direction="up"
              polarity="up-is-bad"
              changeText="2022/23 · Safety threshold: 85% · Highest ever recorded · Infection risk rises sharply above 85%"
              sparklineData={[87.5, 88.0, 88.5, 89.2, 89.9, 86.5, 91.0, 94.0]}
              onExpand={() => {}}
            />
            <MetricCard
              label="Beds occupied by discharge-delayed patients"
              value="1 in 5"
              direction="up"
              polarity="up-is-bad"
              changeText="2023 · 13,500 daily · Social care vacancies main cause · Costs NHS £1bn per year"
              sparklineData={[5, 6, 7, 7, 8, 5, 15, 18, 20]}
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-beds" className="mb-12">
            <LineChart
              title="NHS hospital beds, England (thousands), 2010/11–2022/23"
              subtitle="Total available beds across all NHS trusts in England."
              series={bedsSeries}
              annotations={bedsAnnotations}
              yLabel="Beds (thousands)"
              source={{
                name: 'NHS England',
                dataset: 'Bed Availability and Occupancy Data',
                frequency: 'quarterly',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-occupancy" className="mb-12">
            <LineChart
              title="NHS bed occupancy rate, England, 2010/11–2022/23"
              subtitle="Average daily occupied beds as a percentage of available beds. The 85% safety threshold marks the point where infection control and patient safety become harder to maintain."
              series={occupancySeries}
              yLabel="Occupancy (%)"
              source={{
                name: 'NHS England',
                dataset: 'Bed Availability and Occupancy Data',
                frequency: 'quarterly',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-types" className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-2">NHS bed types by share, England, 2022/23</h2>
            <p className="text-sm text-wiah-mid font-mono mb-6">Distribution of available beds across different care types.</p>
            {data && (
              <div className="space-y-3">
                {data.national.byBedType.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-40 text-sm text-wiah-black flex-shrink-0">{item.bedType}</div>
                    <div className="flex-1 bg-wiah-border rounded h-5 overflow-hidden">
                      <div
                        className="h-full rounded"
                        style={{ width: `${(item.pct / 64) * 100}%`, backgroundColor: '#E63946' }}
                      />
                    </div>
                    <div className="w-16 text-right text-sm font-mono text-wiah-black">{item.pct}%</div>
                  </div>
                ))}
              </div>
            )}
            <p className="font-mono text-xs text-wiah-mid mt-4">Source: NHS England — Bed Availability and Occupancy Data</p>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="What's improving"
            value="40+"
            unit="new Community Diagnostic Centres providing outpatient capacity without using hospital beds"
            description="The NHS has opened more than 160 Community Diagnostic Centres (CDCs) since 2021, providing MRI, CT, endoscopy, and other diagnostic services outside hospitals — reducing unnecessary admissions and freeing beds. The Hospital at Home programme now supports 10,000 'virtual beds', providing acute care in patients' homes and allowing those who would previously have been admitted to avoid hospital entirely. Surgical Hubs — dedicated elective surgery centres separate from emergency pathways — are reducing cancellations. The NHS Long-Term Plan committed to increasing the number of same-day emergency care units to prevent unnecessary overnight admissions."
            source="Source: NHS England — Bed Availability and Occupancy Data 2022/23; The King's Fund — NHS Bed Numbers Analysis 2023."
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
