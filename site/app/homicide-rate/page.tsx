'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

// ── Types ────────────────────────────────────────────────────────────────────

interface HomicidePoint {
  year: number;
  count: number;
}

interface HomicideMethodPoint {
  year: number;
  knife: number;
  firearm: number;
  bluntInstrument: number;
  other: number;
}

interface HomicideRatePoint {
  year: number;
  ratePerMillion: number;
}

interface RegionData {
  region: string;
  ratePerMillion: number;
  count: number;
}

interface HomicideData {
  totalHomicides: HomicidePoint[];
  homicidesByMethod: HomicideMethodPoint[];
  homicideRate: HomicideRatePoint[];
  byRegion: RegionData[];
  metadata: {
    lastUpdated: string;
    sources: { name: string; dataset: string; url: string; retrieved: string; frequency: string }[];
    methodology: string;
    knownIssues: string[];
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

function sparkFrom(arr: number[], n = 10) {
  return arr.slice(-n);
}

const editorialRefs: Reference[] = [
  { num: 1, name: 'ONS', dataset: 'Homicide in England and Wales', url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/crimeandjustice/articles/homicideinenglandandwales/latest', date: 'Nov 2025' },
  { num: 2, name: 'Home Office', dataset: 'Homicide Index — Method of Killing', url: 'https://www.gov.uk/government/statistics/homicide-in-england-and-wales', date: 'Nov 2025' },
];

// ── Page ─────────────────────────────────────────────────────────────────────

export default function HomicideRatePage() {
  const [data, setData] = useState<HomicideData | null>(null);

  useEffect(() => {
    fetch('/data/homicide-rate/homicide_rate.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const totalSeries: Series[] = data
    ? [{
        id: 'total-homicides',
        label: 'Total homicides',
        colour: '#6B7280',
        data: data.totalHomicides.map(d => ({
          date: yearToDate(d.year),
          value: d.count,
        })),
      }]
    : [];

  const methodSeries: Series[] = data
    ? [
        {
          id: 'knife',
          label: 'Knife or sharp instrument',
          colour: '#E63946',
          data: data.homicidesByMethod.map(d => ({
            date: yearToDate(d.year),
            value: d.knife,
          })),
        },
        {
          id: 'firearm',
          label: 'Firearm',
          colour: '#264653',
          data: data.homicidesByMethod.map(d => ({
            date: yearToDate(d.year),
            value: d.firearm,
          })),
        },
        {
          id: 'blunt',
          label: 'Blunt instrument',
          colour: '#F4A261',
          data: data.homicidesByMethod.map(d => ({
            date: yearToDate(d.year),
            value: d.bluntInstrument,
          })),
        },
      ]
    : [];

  const rateSeries: Series[] = data
    ? [{
        id: 'rate',
        label: 'Homicides per million population',
        colour: '#6B7280',
        data: data.homicideRate.map(d => ({
          date: yearToDate(d.year),
          value: d.ratePerMillion,
        })),
      }]
    : [];

  // ── Derived values ────────────────────────────────────────────────────────

  const latest = data?.totalHomicides[data.totalHomicides.length - 1];
  const peak = data?.totalHomicides.reduce((a, b) => a.count > b.count ? a : b);
  const latestRate = data?.homicideRate[data.homicideRate.length - 1];
  const peakRate = data?.homicideRate.reduce((a, b) => a.ratePerMillion > b.ratePerMillion ? a : b);
  const latestKnife = data?.homicidesByMethod[data.homicidesByMethod.length - 1];
  const peakKnife = data?.homicidesByMethod.reduce((a, b) => a.knife > b.knife ? a : b);
  const latestKnifeShare = latest && latestKnife
    ? Math.round((latestKnife.knife / latest.count) * 100)
    : 39;

  const totalAnnotations: Annotation[] = [
    { date: new Date(2005, 2, 1), label: '2005: Licensing Act takes effect' },
    { date: new Date(2016, 0, 1), label: '2016: includes Hillsborough reclassification' },
    { date: new Date(2020, 2, 1), label: '2020: COVID lockdown' },
  ];

  const methodAnnotations: Annotation[] = [
    { date: new Date(2014, 0, 1), label: '2014: Knife crime begins rising' },
    { date: new Date(2017, 5, 1), label: '2017: Terror attacks' },
  ];

  const rateAnnotations: Annotation[] = [
    { date: new Date(2014, 0, 1), label: '2014: Historic low reached' },
    { date: new Date(2020, 2, 1), label: '2020: Lockdown effect' },
  ];

  return (
    <>
      <TopicNav topic="Homicide Rate" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Homicide Rate"
          question="Is Britain's Homicide Rate Rising?"
          finding="Homicide in England and Wales remains near historic lows in absolute terms, but the composition of killing has shifted decisively toward knife violence. The overall rate has halved since 2003, yet knife homicides now account for 39% of all killings — up from 31% in 2010."
          colour="#6B7280"
          preposition="with"
        />

        {/* ── Editorial context ─────────────────────────────────────────────── */}
        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              Britain is a substantially less lethal country than it was two decades ago. In the year ending March 2003, 1,047 homicides were recorded in England and Wales — a rate of nearly 20 per million people.<Cite nums={1} /> By 2014, that figure had fallen to 534, a reduction of almost half, driven by improvements in trauma care, CCTV expansion, a decline in alcohol-fuelled violence following the Licensing Act 2003, and broader demographic shifts.<Cite nums={1} /> The 2024 figure of 590 sits roughly in line with the post-2014 average, well below the levels that defined the early 2000s. In international context, England and Wales has one of the lowest homicide rates in the world — roughly a fifth of the US rate and lower than most comparable European nations.
            </p>
            <p>
              But the method of killing has changed markedly. Knife and sharp instrument homicides rose from 186 in 2014 to a peak of 264 in 2017, settling at 231 in 2024.<Cite nums={2} /> This shift reflects the growth of county lines drug networks, which expanded rapidly from 2014 onward and brought systematic violence to new areas. Firearms homicides, by contrast, have fallen consistently — from 41 in 2010 to 22 in 2024 — a success largely attributable to the post-Dunblane firearms legislation and sustained police intelligence operations.<Cite nums={2} /> The typical homicide victim is male, aged 25-34, and disproportionately from a deprived area. Roughly half of all homicide victims knew their killer. Domestic homicide accounts for around a third of cases, a proportion that has remained stubbornly consistent for decades.<Cite nums={1} />
            </p>
            <p>
              The 2016 and 2017 totals require careful reading. The 2016 figure includes 96 Hillsborough disaster victims reclassified as unlawful killings following the inquest conclusion, and the 2017 figure includes 31 victims of the Manchester Arena and London Bridge terror attacks.<Cite nums={1} /> Stripping these out, the underlying trend from 2015 to 2019 shows a modest rise of around 15%, followed by the COVID dip in 2020 and a subsequent stabilisation. The latest data suggests the homicide rate is now gently declining again, though one-year movements in relatively small numbers should be interpreted with caution.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-total', label: 'Total homicides' },
          { id: 'sec-method', label: 'By method' },
          { id: 'sec-rate', label: 'Per capita rate' },
          { id: 'sec-regional', label: 'Regional' },
        ]} />

        {/* ── Metric cards ──────────────────────────────────────────────────── */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Total homicides (England & Wales)"
            value={latest ? latest.count.toLocaleString() : '590'}
            unit="2024"
            direction="down"
            polarity="up-is-bad"
            changeText={
              latest && peak
                ? `Down from peak of ${peak.count.toLocaleString()} in ${peak.year} · halved since 2003`
                : 'down from 2003 peak of 1,047'
            }
            sparklineData={
              data ? sparkFrom(data.totalHomicides.map(d => d.count)) : [636, 619, 577, 551, 534, 571, 695, 739, 714, 590]
            }
            source="ONS — Homicide in England and Wales, Nov 2025"
            href="#sec-total"
          />
          <MetricCard
            label="Homicide rate per million"
            value={latestRate ? latestRate.ratePerMillion.toFixed(1) : '9.8'}
            unit="per million"
            direction="down"
            polarity="up-is-bad"
            changeText={
              latestRate && peakRate
                ? `Down from ${peakRate.ratePerMillion} in ${peakRate.year} · near historic low`
                : 'down from 19.7 in 2003'
            }
            sparklineData={
              data ? sparkFrom(data.homicideRate.map(d => d.ratePerMillion)) : [11.3, 10.9, 10.1, 9.6, 9.2, 9.7, 11.8, 12.4, 10.0, 9.8]
            }
            source="ONS — Homicide in England and Wales, Nov 2025"
            href="#sec-rate"
          />
          <MetricCard
            label="Knife homicides (share of total)"
            value={`${latestKnifeShare}%`}
            direction="up"
            polarity="up-is-bad"
            changeText={
              latestKnife && peakKnife
                ? `${latestKnife.knife} knife killings in 2024 · peak of ${peakKnife.knife} in ${peakKnife.year}`
                : 'up from 31% in 2010'
            }
            sparklineData={
              data ? sparkFrom(data.homicidesByMethod.map(d => Math.round((d.knife / (d.knife + d.firearm + d.bluntInstrument + d.other)) * 100))) : [31, 34, 34, 34, 35, 37, 31, 36, 36, 39]
            }
            source="Home Office — Homicide Index, Nov 2025"
            href="#sec-method"
          />
        </div>

        {/* ── Chart 1: Total homicides ────────────────────────────────────── */}
        <ScrollReveal>
          <div id="sec-total" className="mb-12">
            <LineChart
              series={totalSeries}
              title="Homicides recorded in England & Wales, 2003–2024"
              subtitle="Annual total. Includes Hillsborough reclassification (2016) and terror attacks (2017)."
              yLabel="Homicides"
              annotations={totalAnnotations}
              source={{
                name: 'Office for National Statistics',
                dataset: 'Homicide in England and Wales',
                frequency: 'annual',
                url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/crimeandjustice/articles/homicideinenglandandwales/latest',
                date: 'Nov 2025',
              }}
            />
          </div>
        </ScrollReveal>

        {/* ── Chart 2: By method ──────────────────────────────────────────── */}
        <ScrollReveal>
          <div id="sec-method" className="mb-12">
            <LineChart
              series={methodSeries}
              title="Homicides by method, England & Wales, 2010–2024"
              subtitle="Knife killings rising as a share; firearm homicides at lowest level on record."
              yLabel="Homicides"
              annotations={methodAnnotations}
              source={{
                name: 'Home Office',
                dataset: 'Homicide Index — method of killing',
                frequency: 'annual',
                url: 'https://www.gov.uk/government/statistics/homicide-in-england-and-wales',
                date: 'Nov 2025',
              }}
            />
          </div>
        </ScrollReveal>

        {/* ── Chart 3: Per capita rate ────────────────────────────────────── */}
        <ScrollReveal>
          <div id="sec-rate" className="mb-12">
            <LineChart
              series={rateSeries}
              title="Homicide rate per million population, 2003–2024"
              subtitle="Population-adjusted rate. Halved over two decades despite population growth."
              yLabel="Per million"
              annotations={rateAnnotations}
              source={{
                name: 'Office for National Statistics',
                dataset: 'Homicide in England and Wales (rate calculated using mid-year population estimates)',
                frequency: 'annual',
                url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/crimeandjustice/articles/homicideinenglandandwales/latest',
                date: 'Nov 2025',
              }}
            />
          </div>
        </ScrollReveal>

        {/* ── Regional bar chart ──────────────────────────────────────────── */}
        <ScrollReveal>
          <div id="sec-regional" className="mb-12">
            <div className="bg-white rounded-lg border border-wiah-border p-8">
              <h2 className="text-lg font-bold text-wiah-black mb-2">
                Homicide rate by region (per million population), 2024
              </h2>
              <p className="text-sm text-wiah-mid mb-6">
                London has the highest rate, but the gap with other regions has narrowed since 2010.
              </p>
              <div className="mt-6 space-y-4">
                {data?.byRegion.map((r) => {
                  const pct = (r.ratePerMillion / 16) * 100;
                  return (
                    <div key={r.region}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-wiah-black">{r.region}</span>
                        <span className="font-mono text-sm font-bold text-wiah-black">
                          {r.ratePerMillion} <span className="text-xs text-wiah-mid font-normal">({r.count} cases)</span>
                        </span>
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
              <p className="font-mono text-xs text-wiah-mid mt-4">
                Source: ONS — Homicide in England and Wales, year ending March 2024. Home Office — Homicide Index.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* ── Positive callout ────────────────────────────────────────────── */}
        <ScrollReveal>
          <PositiveCallout
            title="Firearms homicides at lowest level since records began"
            value="22"
            unit="firearm homicides in 2024"
            description="Firearm homicides in England and Wales have fallen by 46% since 2010, reaching 22 in 2024 — the lowest figure since the Homicide Index began in 1977. The post-Dunblane handgun ban (1997), combined with sustained police intelligence work targeting organised crime groups, has made gun violence exceptionally rare in the UK. England and Wales now records roughly one firearm homicide per three million people, compared to around 45 per three million in the United States. This is one of the clearest public policy successes in British criminal justice."
            source="Source: Home Office — Homicide Index, Nov 2025. ONS — Homicide in England and Wales."
          />
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        {/* ── Sources & Methodology ──────────────────────────────────────── */}
        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p>
              <a
                href="https://www.ons.gov.uk/peoplepopulationandcommunity/crimeandjustice/articles/homicideinenglandandwales/latest"
                target="_blank"
                rel="noopener noreferrer"
                className="text-wiah-blue hover:underline"
              >
                ONS — Homicide in England and Wales
              </a>{' '}
              — primary data source. Annual publication based on the Home Office Homicide Index. Retrieved Nov 2025.
            </p>
            <p>
              <a
                href="https://www.gov.uk/government/statistics/homicide-in-england-and-wales"
                target="_blank"
                rel="noopener noreferrer"
                className="text-wiah-blue hover:underline"
              >
                Home Office — Homicide Index
              </a>{' '}
              — detailed breakdown by method, victim demographics, and relationship to suspect. Retrieved Nov 2025.
            </p>
            <p>
              All figures are for England and Wales unless otherwise stated. Figures for the most recent year are provisional and subject to revision as police investigations conclude; latest-year totals are typically revised downward by 5-10%. The 2016 figure includes 96 Hillsborough disaster victims reclassified as unlawful killings. The 2017 figure includes 31 victims of terror attacks. Per-million rates are calculated using ONS mid-year population estimates.
            </p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
