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
          finding="England has 99,000 hospital beds &mdash; down from 300,000 in 1987 and the lowest per capita in the developed world. Bed occupancy runs at 94% &mdash; above the 85% safety threshold. The NHS needs 10,000 more beds to meet demand safely. 1 in 5 hospital beds is occupied by a patient fit for discharge but awaiting social care."
          colour="#E63946"
          preposition="in"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>England had 99,000 NHS hospital beds in 2022/23 &mdash; down from 135,000 in 2010 and a post-war peak of 300,000 in 1987. At 2.1 beds per 1,000 population, England has the lowest density in western Europe (EU average 5.4; Germany 8.0; France 5.9). Average bed occupancy reached 94&percnt; in 2022/23, well above the 85&percnt; threshold above which infection-control protocols become difficult and patient safety outcomes deteriorate &mdash; and occupancy has not fallen below 88&percnt; since 2012/13. The proximate driver is delayed discharge: 13,500 patients per day occupy acute beds while clinically fit for discharge, blocked by the absence of a care home place, domiciliary care package, or social housing arrangement &mdash; roughly 1 in 8 acute beds consumed by social care failure rather than clinical need. A King&apos;s Fund analysis estimated England needs 10,000 additional beds to bring occupancy to safe levels, at a capital cost of approximately &pound;5 billion.</p>
            <p>Running at 94&percnt; occupancy leaves no flex capacity for winter surges: the 2022/23 winter, when Covid, influenza, and RSV peaked simultaneously, was a predictable consequence of structural zero slack. Each winter&apos;s surge compounds into the next year&apos;s elective backlog, reducing capacity for the following emergency season. The delayed discharge burden falls disproportionately on older patients, those with dementia, and those in areas where social care vacancy rates are highest &mdash; typically rural communities and areas of higher deprivation where care homes and domiciliary providers cannot recruit at the wages local authorities are able to fund.</p>
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
              changeText="2022/23 &middot; Down from 300K in 1987 &middot; Lowest per capita in Western Europe &middot; 10K more beds needed (NHS estimate)"
              sparklineData={[135, 130, 126, 122, 115, 110, 103, 99]}
              onExpand={() => document.getElementById('sec-beds')?.scrollIntoView({ behavior: 'smooth' })}
            />
            <MetricCard
              label="NHS bed occupancy rate"
              value="94%"
              direction="up"
              polarity="up-is-bad"
              changeText="2022/23 &middot; Safety threshold: 85% &middot; Highest ever recorded &middot; Infection risk rises sharply above 85%"
              sparklineData={[87.5, 88.0, 88.5, 89.2, 89.9, 86.5, 91.0, 94.0]}
              onExpand={() => document.getElementById('sec-occupancy')?.scrollIntoView({ behavior: 'smooth' })}
            />
            <MetricCard
              label="Beds occupied by discharge-delayed patients"
              value="1 in 5"
              direction="up"
              polarity="up-is-bad"
              changeText="2023 &middot; 13,500 daily &middot; Social care vacancies main cause &middot; Costs NHS &pound;1bn per year"
              sparklineData={[5, 6, 7, 7, 8, 5, 15, 18, 20]}
              onExpand={() => document.getElementById('sec-types')?.scrollIntoView({ behavior: 'smooth' })}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-beds" className="mb-12">
            <LineChart
              title="NHS hospital beds, England (thousands), 2010/11&ndash;2022/23"
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
              title="NHS bed occupancy rate, England, 2010/11&ndash;2022/23"
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
            <p className="font-mono text-xs text-wiah-mid mt-4">Source: NHS England &mdash; Bed Availability and Occupancy Data</p>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="What&apos;s improving"
            value="40+"
            unit="new Community Diagnostic Centres providing outpatient capacity without using hospital beds"
            description="The NHS has opened more than 160 Community Diagnostic Centres (CDCs) since 2021, providing MRI, CT, endoscopy, and other diagnostic services outside hospitals &mdash; reducing unnecessary admissions and freeing beds. The Hospital at Home programme now supports 10,000 &apos;virtual beds&apos;, providing acute care in patients&apos; homes and allowing those who would previously have been admitted to avoid hospital entirely. Surgical Hubs &mdash; dedicated elective surgery centres separate from emergency pathways &mdash; are reducing cancellations. The NHS Long-Term Plan committed to increasing the number of same-day emergency care units to prevent unnecessary overnight admissions."
            source="Source: NHS England &mdash; Bed Availability and Occupancy Data 2022/23; The King&apos;s Fund &mdash; NHS Bed Numbers Analysis 2023."
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
