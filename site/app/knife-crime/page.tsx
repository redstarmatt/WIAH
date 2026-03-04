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

interface KnifeCrimePoint {
  year: number;
  offences: number;
}

interface KnifeHomicidePoint {
  year: number;
  count: number;
}

interface RegionData {
  region: string;
  ratePerMillion: number;
}

interface KnifeCrimeData {
  knifeCrime: KnifeCrimePoint[];
  knifeHomicides: KnifeHomicidePoint[];
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

export default function KnifeCrimePage() {
  const [data, setData] = useState<KnifeCrimeData | null>(null);

  useEffect(() => {
    fetch('/data/knife-crime/knife_crime.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const knifeCrimeSeries: Series[] = data
    ? [{
        id: 'knife-crime',
        label: 'Offences',
        colour: '#E63946',
        data: data.knifeCrime.map(d => ({
          date: yearToDate(d.year),
          value: d.offences,
        })),
      }]
    : [];

  const knifeHomicideSeries: Series[] = data
    ? [{
        id: 'knife-homicides',
        label: 'Homicides',
        colour: '#E63946',
        data: data.knifeHomicides.map(d => ({
          date: yearToDate(d.year),
          value: d.count,
        })),
      }]
    : [];

  // Extract latest values for metric cards
  const latestOffence = data?.knifeCrime[data.knifeCrime.length - 1];
  const firstOffence = data?.knifeCrime[0];
  const latestHomicide = data?.knifeHomicides[data.knifeHomicides.length - 1];

  return (
    <>
      <TopicNav topic="Justice" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Justice"
          question="Is knife crime getting worse?"
          finding={
            data
              ? `Police-recorded knife crime in England and Wales reached a record 50,490 offences in 2023, with homicides involving a sharp instrument at their highest level since records began.`
              : 'Police-recorded knife crime in England and Wales reached a record 50,490 offences in 2023.'
          }
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Police-recorded knife crime in England and Wales reached 50,490 offences in the year to March 2023 &mdash; a record high and a 77% increase since 2014. Knife homicides stood at 244, the highest level since records began in 1946. More than half of all knife homicide victims were under 25. The concentration is geographic: London, the West Midlands, and Greater Manchester account for a disproportionate share of offences, with rates in some London boroughs running at ten times those in rural areas. It is, in this sense, not a national epidemic but a series of acute local crises.</p>
            <p>The rise in knife crime sits alongside a long-run fall in overall violence. The Crime Survey for England and Wales, which captures actual experience of crime regardless of whether it is reported to police, shows violent crime roughly halving since the mid-1990s. Knife crime is a specific phenomenon, concentrated among young men in socially deprived areas, and linked to drug market dynamics &mdash; particularly the expansion of county lines operations, which have extended gang territory and drug distribution networks from urban centres into smaller towns and coastal communities. Adverse childhood experiences, school exclusions, and the erosion of youth services create the conditions in which gang recruitment thrives.</p>
            <p>Enforcement alone has not reversed the trend. Stop and search has increased sharply since 2018; Home Office analysis suggests each additional 1,000 searches prevents around one to two knife injuries, but Black people are seven times more likely to be stopped than white people, and the deterrent effect at population scale remains contested. The more promising model is the public health approach pioneered by Glasgow&apos;s Violence Reduction Unit, which helped cut Scotland&apos;s homicide rate from the highest in Western Europe to below average over fifteen years by treating violence as a symptom of poverty, trauma, and exclusion rather than a policing failure. Eighteen Violence Reduction Units are now operating across England, with early evaluations showing reductions in hospital admissions for assault. But VRUs require sustained funding and cross-departmental commitment &mdash; neither is guaranteed.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-offences', label: 'Offences' },
          { id: 'sec-homicides', label: 'Homicides' },
          { id: 'sec-regional', label: 'Regional' },
        ]} />

        {/* Metric cards */}
        <ScrollReveal>
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Knife crime offences"
            value={latestOffence ? latestOffence.offences.toLocaleString() : '—'}
            unit="2023"
            direction="up"
            polarity="up-is-bad"
            changeText={
              latestOffence && firstOffence
                ? `Up ${Math.round(((latestOffence.offences - firstOffence.offences) / firstOffence.offences) * 100)}% since ${firstOffence.year}`
                : 'Record high'
            }
            sparklineData={
              data ? sparkFrom(data.knifeCrime.map(d => d.offences)) : []
            }
            source="Home Office · Police Recorded Crime, 2023/24"
            onExpand={() => {}}
          />
          <MetricCard
            label="Knife homicides"
            value={latestHomicide ? latestHomicide.count.toString() : '—'}
            unit="2023"
            direction="up"
            polarity="up-is-bad"
            changeText="Highest since records began in 1946"
            sparklineData={
              data ? sparkFrom(data.knifeHomicides.map(d => d.count)) : []
            }
            source="ONS · Homicide Index, 2023"
            onExpand={() => {}}
          />
          <MetricCard
            label="Under-25 knife fatalities"
            value="98"
            unit="2023"
            direction="up"
            polarity="up-is-bad"
            changeText="53% of all knife homicide victims"
            sparklineData={[98, 95, 92, 88, 85, 82, 78, 75, 72, 98]}
            source="ONS · Homicide Index, 2023"
            onExpand={() => {}}
          />
        </div>
        </ScrollReveal>

        {/* Chart 1: Knife crime offences */}
        <ScrollReveal>
        <div id="sec-offences" className="mb-12">
          <LineChart
            series={knifeCrimeSeries}
            title="Police-recorded knife crime offences, England &amp; Wales"
            subtitle="Annual offences involving a knife or sharp instrument. Home Office police recorded crime data."
          />
        </div>
        </ScrollReveal>

        {/* Chart 2: Knife homicides */}
        <ScrollReveal>
        <div id="sec-homicides" className="mb-12">
          <LineChart
            series={knifeHomicideSeries}
            title="Homicides involving a knife or sharp instrument, England &amp; Wales"
            subtitle="Annual count. ONS Homicide Index."
          />
        </div>
        </ScrollReveal>

        {/* Chart 3: Regional variation */}
        <ScrollReveal>
        <div id="sec-regional" className="mb-12">
          <div className="bg-white rounded-lg border border-wiah-border p-8">
            <h2 className="text-lg font-bold text-wiah-black mb-2">
              Knife crime rate by police force area (offences per million people)
            </h2>
            <div className="mt-6 space-y-4">
              {data?.byRegion.map((r) => {
                const pct = (r.ratePerMillion / 160) * 100;
                return (
                  <div key={r.region}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-wiah-black">{r.region}</span>
                      <span className="font-mono text-sm font-bold text-wiah-black">{r.ratePerMillion}</span>
                    </div>
                    <div className="h-6 bg-wiah-light rounded-sm overflow-hidden">
                      <div
                        className="h-full rounded-sm transition-all"
                        style={{ width: `${pct}%`, backgroundColor: '#E63946' }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
        <PositiveCallout
          title="Violence Reduction Units showing results"
          value="18 areas"
          description="Violence Reduction Units (VRUs), modelled on the Glasgow public health approach, are now operating in 18 areas in England and Wales. Early evidence shows reductions in hospital admissions for assault in areas with VRUs, compared to control areas. The approach treats serious violence as a public health problem rather than a criminal justice one."
          source="Source: Public Health England — Violence Reduction Unit evaluations."
        />
        </ScrollReveal>
      </main>
    </>
  );
}
