'use client'

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import PositiveCallout from '@/components/PositiveCallout';
import SectionNav from '@/components/SectionNav';

// ── Types ────────────────────────────────────────────────────────────────────

interface HateCrimeData {
  hateCrime: { year: number; offences: number }[];
  byStrand: { strand: string; pct: number }[];
  prosecutions: { year: number; pctProsecuted: number }[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function HateCrimePage() {
  const [data, setData] = useState<HateCrimeData | null>(null);

  useEffect(() => {
    fetch('/data/hate-crime/hate_crime.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const hateCrimeSeries: Series[] = data
    ? [
        {
          id: 'hate-crime',
          label: 'Offences recorded',
          colour: '#E63946',
          data: data.hateCrime.map(d => ({
            date: yearToDate(d.year),
            value: d.offences,
          })),
        },
      ]
    : [];

  const prosecutionSeries: Series[] = data
    ? [
        {
          id: 'prosecution',
          label: 'Prosecution rate',
          colour: '#6B7280',
          data: data.prosecutions.map(d => ({
            date: yearToDate(d.year),
            value: d.pctProsecuted,
          })),
        },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: yearToDate(2016), label: '2016: Brexit referendum' },
  ];

  // Sparklines
  const hateCrimeSparkline = data
    ? data.hateCrime.slice(-11).map(d => d.offences)
    : [];

  const prosecutionSparkline = data
    ? data.prosecutions.slice(-7).map(d => d.pctProsecuted)
    : [];

  return (
    <main>
      <TopicNav topic="Hate Crime" />
      <TopicHeader
        topic="Hate Crime"
        question="Is hate crime increasing?"
        finding="Hate crime in England and Wales more than doubled between 2013 and 2023, reaching a record 147,000 offences, though rises partly reflect improved recording and increasing willingness to report."
        colour="#E63946"
      />

      <section className="px-6 py-12 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Hate crime offences recorded"
              value="147,000"
              direction="up"
              polarity="up-is-bad"
              changeText="Record high; doubled since 2013"
              sparklineData={hateCrimeSparkline}
              source="Home Office Hate Crime Statistics"
              onExpand={() => {}}
            />
            <MetricCard
              label="Race hate crime (% of total)"
              value="70"
              unit="%"
              direction="flat"
              polarity="up-is-bad"
              changeText="104,000 offences; largest category"
              sparklineData={[70, 70, 70, 70, 70]}
              source="Home Office Hate Crime Statistics"
              onExpand={() => {}}
            />
            <MetricCard
              label="Prosecution rate for hate crime"
              value="44"
              unit="%"
              direction="flat"
              polarity="up-is-good"
              changeText="Less than half of offences result in charge"
              sparklineData={prosecutionSparkline}
              source="CPS Hate Crime Report"
              onExpand={() => {}}
            />
          </div>
        </div>
      </section>

      <ScrollReveal>
        <section id="sec-trends" className="px-6 py-12 bg-white">
          <div className="max-w-5xl mx-auto">
            <LineChart
              title="Hate crime offences recorded by police, England &amp; Wales"
              subtitle="Annual offences. Home Office Hate Crime Statistics. Increases partly reflect improved recording."
              series={hateCrimeSeries}
              annotations={annotations}
            />
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section id="sec-prosecution" className="px-6 py-12 bg-white">
          <div className="max-w-5xl mx-auto">
            <LineChart
              title="Hate crime offences resulting in prosecution, England &amp; Wales"
              subtitle="Percentage of hate crime offences where a CPS prosecution takes place."
              series={prosecutionSeries}
            />
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section id="sec-breakdown" className="px-6 py-12 bg-white">
          <div className="max-w-5xl mx-auto">
            <h3 className="text-xl font-bold text-wiah-black mb-6">
              Hate crime by protected characteristic
            </h3>
            <div className="space-y-3">
              {data?.byStrand.map((item) => (
                <div key={item.strand} className="flex items-center gap-4">
                  <div className="w-32 text-sm text-wiah-black font-medium">
                    {item.strand}
                  </div>
                  <div className="flex-1 bg-wiah-light rounded-full h-8 flex items-center overflow-hidden">
                    <div
                      className="bg-[#E63946] h-full flex items-center justify-end pr-3 transition-all"
                      style={{ width: `${item.pct}%` }}
                    >
                      <span className="font-mono text-xs font-bold text-white">
                        {item.pct}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      <section id="sec-context" className="px-6 py-12 bg-white">
        <div className="max-w-2xl mx-auto">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Police-recorded hate crime in England and Wales has more than tripled since 2013, rising from 44,480 offences to 147,000 in 2023. Race hate crime accounts for 70&percnt; of the total &mdash; 104,000 offences in a single year. Transgender hate crime is the fastest-growing category, reaching 11,000 recorded offences in 2023. Hate crime is acutely sensitive to political climate: a 41&percnt; spike followed the Brexit referendum in June 2016, and subsequent peaks tracked terrorist attacks and heightened immigration rhetoric. Online hate crime, measured separately from 2021, now accounts for around a third of all incidents &mdash; a channel supercharged by algorithmic amplification and now designated a priority offence under the Online Safety Act 2023.</p>
            <p>Reporting does not reliably lead to justice. Only 44&percnt; of recorded hate crimes result in a prosecution, with victim withdrawal the central bottleneck &mdash; victims disengage from proceedings citing fear of repeat harassment and distrust of the justice system. The CPS achieves an 86&percnt; conviction rate for cases it does bring, but the gap is before charge. Disability hate crime is the most severely underreported strand: victims are often isolated, frequently dependent on their abusers, and face profound barriers to reporting, while CPS charge rates for the strand are the lowest of any category. Dedicated hate crime units remain rare outside London and a few major cities, meaning most offences are investigated by neighbourhood officers with minimal specialist training.</p>
          </div>
        </div>
      </section>

      <section className="px-6 py-12 bg-white">
        <div className="max-w-5xl mx-auto">
          <PositiveCallout
            title="Hate crime conviction rates improving"
            value="86"
            unit="%"
            description="While the number of hate crime offences has risen, the conviction rate for those who are prosecuted has improved. The CPS charged 84% of hate crime suspects referred to it in 2022/23, and the conviction rate for completed prosecutions was 86% &mdash; higher than for overall crime. The challenge is getting more cases to the point of charge."
            source="CPS Hate Crime Report, 2022/23"
          />
        </div>
      </section>

      <SectionNav
        sections={[
          { id: 'sec-trends', label: 'Trends' },
          { id: 'sec-prosecution', label: 'Prosecution' },
          { id: 'sec-breakdown', label: 'Breakdown' },
          { id: 'sec-context', label: 'Context' },
        ]}
      />
    </main>
  );
}
