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

// ── Types ────────────────────────────────────────────────────────────────────

interface DataPoint {
  year: number;
  formalPct: number;
  informalPct: number;
  regularWeeklyPct: number;
  age25to44: number;
  age65plus: number;
}

interface TopicData {
  national: { timeSeries: DataPoint[] };
  byType: { type: string; pct2014: number; pct2024: number }[];
  metadata: {
    sources: { name: string; dataset: string; url: string; frequency: string }[];
    methodology: string;
    knownIssues: string[];
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 0, 1);
}

function sparkFrom(arr: number[], n = 10) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function VolunteeringRatesPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/volunteering-rates/volunteering_rates.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const formalInformalSeries: Series[] = data
    ? [
        {
          id: 'formal',
          label: 'Formal volunteering (%)',
          colour: '#264653',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.formalPct,
          })),
        },
        {
          id: 'informal',
          label: 'Informal volunteering (%)',
          colour: '#2A9D8F',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.informalPct,
          })),
        },
      ]
    : [];

  const ageGroupSeries: Series[] = data
    ? [
        {
          id: 'age25to44',
          label: '25\u201344 formal volunteering (%)',
          colour: '#E63946',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.age25to44,
          })),
        },
        {
          id: 'age65plus',
          label: '65+ formal volunteering (%)',
          colour: '#264653',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.age65plus,
          })),
        },
      ]
    : [];

  const regularWeeklySeries: Series[] = data
    ? [
        {
          id: 'regular',
          label: 'Regular weekly volunteers (%)',
          colour: '#6B7280',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.regularWeeklyPct,
          })),
        },
      ]
    : [];

  const latestFormal = data?.national.timeSeries[data.national.timeSeries.length - 1];
  const firstFormal = data?.national.timeSeries[0];

  const formalDrop = latestFormal && firstFormal
    ? firstFormal.formalPct - latestFormal.formalPct
    : 5;

  const informalDrop = latestFormal && firstFormal
    ? firstFormal.informalPct - latestFormal.informalPct
    : 12;

  return (
    <>
      <TopicNav topic="Wellbeing & Society" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Wellbeing & Society"
          question="Are People Still Volunteering?"
          finding="Formal volunteering has fallen from 44% to 39% of adults over a decade. Informal volunteering dropped even more sharply, from 63% to 51%. The steepest decline is among working-age adults aged 25\u201344, squeezed by time, cost of living, and the collapse of the organisations that once connected them to their communities."
          colour="#2A9D8F"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              England&apos;s volunteering infrastructure is quietly hollowing out. The Community Life Survey shows that 39% of adults volunteered formally at least once in 2023-24, down {formalDrop} percentage points from a decade earlier. Informal volunteering \u2014 the everyday help given to neighbours, friends, and strangers \u2014 fell further still, from 63% to 51%. The sharpest losses are among 25\u201344 year olds, the age group most likely to be balancing childcare, insecure work, and rising housing costs. COVID accelerated the decline: face-to-face volunteering collapsed in 2020, and while a surge of mutual aid filled some gaps, the organisational base \u2014 community centres, youth clubs, local charities \u2014 has not fully recovered.
            </p>
            <p>
              The pattern is not uniform. Over-65s have returned close to pre-pandemic levels, and environmental volunteering is the only category to have grown over the decade. But the broader trend is clear: fewer people are giving their time through formal channels. This matters because volunteering is not just a nice thing to do \u2014 it is load-bearing social infrastructure. Foodbanks, citizens advice bureaux, hospital visiting, school reading programmes, and sports clubs all depend on volunteers. When volunteering declines, the gaps fall disproportionately on the communities that can least afford to fill them with paid provision.
            </p>
            <p>
              The data below tracks these trends across a decade, breaking them down by type, age group, and frequency. All figures are drawn from the DCMS Community Life Survey and NCVO research.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-formal-informal', label: 'Formal & informal' },
          { id: 'sec-age', label: 'By age group' },
          { id: 'sec-regular', label: 'Weekly regulars' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Formal volunteering at least once/year"
            value={latestFormal ? `${latestFormal.formalPct}%` : '39%'}
            unit="2023-24"
            direction="down"
            polarity="down-is-bad"
            changeText={`Down from ${firstFormal?.formalPct ?? 44}% in 2013-14 \u00b7 steepest fall in working-age adults`}
            sparklineData={
              data ? sparkFrom(data.national.timeSeries.map(d => d.formalPct)) : [44, 44, 43, 42, 41, 40, 38, 38, 39, 39]
            }
            source="DCMS \u2014 Community Life Survey 2023-24"
            href="#sec-formal-informal"
          />
          <MetricCard
            label="Informal volunteering at least once/year"
            value={latestFormal ? `${latestFormal.informalPct}%` : '51%'}
            unit="2023-24"
            direction="down"
            polarity="down-is-bad"
            changeText={`Down ${informalDrop}pp from 2013-14 \u00b7 largest decline of any volunteering measure`}
            sparklineData={
              data ? sparkFrom(data.national.timeSeries.map(d => d.informalPct)) : [63, 62, 61, 60, 59, 57, 52, 50, 51, 51]
            }
            source="DCMS \u2014 Community Life Survey 2023-24"
            href="#sec-formal-informal"
          />
          <MetricCard
            label="Regular weekly volunteers"
            value={latestFormal ? `${latestFormal.regularWeeklyPct}%` : '15%'}
            unit="2023-24"
            direction="down"
            polarity="down-is-bad"
            changeText="Down from 18% \u00b7 biggest falls in 25\u201344 age group"
            sparklineData={
              data ? sparkFrom(data.national.timeSeries.map(d => d.regularWeeklyPct)) : [18, 18, 17, 17, 17, 16, 15, 14, 15, 15]
            }
            source="DCMS \u2014 Community Life Survey 2023-24"
            href="#sec-regular"
          />
        </div>

        {/* Chart 1: Formal and informal volunteering */}
        <ScrollReveal>
          <div id="sec-formal-informal" className="mb-12">
            <LineChart
              series={formalInformalSeries}
              title="Volunteering rates by type, England, 2013\u20132024"
              subtitle="Percentage of adults volunteering formally (through an organisation) and informally (helping individuals outside their household). Both measures have declined since 2013, with informal volunteering falling more sharply."
              yLabel="% of adults"
              annotations={[
                { date: new Date(2020, 0, 1), label: '2020: COVID \u2014 face-to-face volunteering collapses' },
                { date: new Date(2022, 0, 1), label: '2022: Partial recovery, but below pre-pandemic levels' },
              ]}
              source={{
                name: 'DCMS',
                dataset: 'Community Life Survey 2023-24',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 2: Age group breakdown */}
        <ScrollReveal>
          <div id="sec-age" className="mb-12">
            <LineChart
              series={ageGroupSeries}
              title="Formal volunteering by age group, England, 2013\u20132024"
              subtitle="The 25\u201344 age group has seen the steepest decline \u2014 down 11 percentage points. Over-65s have recovered close to pre-pandemic levels, sustained by retirement, time availability, and established habits."
              yLabel="% volunteering formally"
              annotations={[
                { date: new Date(2020, 0, 1), label: '2020: Shielding removes highest-volunteering age group' },
              ]}
              source={{
                name: 'DCMS',
                dataset: 'Community Life Survey 2023-24',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 3: Regular weekly volunteers */}
        <ScrollReveal>
          <div id="sec-regular" className="mb-12">
            <LineChart
              series={regularWeeklySeries}
              title="Regular weekly volunteers, England, 2013\u20132024"
              subtitle="The committed core: adults who volunteer at least once a week. This group has shrunk from 18% to 15%, representing roughly 1.5 million fewer weekly volunteers than a decade ago."
              yLabel="% volunteering weekly"
              annotations={[
                { date: new Date(2020, 0, 1), label: '2020: Weekly volunteering drops to 15%' },
                { date: new Date(2016, 0, 1), label: '2016: Austerity cuts to community organisations deepen' },
              ]}
              source={{
                name: 'DCMS',
                dataset: 'Community Life Survey 2023-24',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Volunteers Week 2025 reaches record participation"
            value="7m+"
            unit="volunteer pledges during Volunteers Week 2025"
            description="Volunteers Week 2025 recorded over 7 million volunteer pledges \u2014 a record. The #TimeToVolunteer campaign, backed by all major volunteer-involving organisations, drove a 23% increase in new volunteer registrations on Do-it.org compared to 2024. NHS volunteer responders now number 1.6 million \u2014 the largest formal volunteer programme in UK history. Environmental volunteering is the only category to have grown over the decade, rising from 3% to 4% of adults, driven by local litter picks, river clean-ups, and tree-planting initiatives."
            source="Source: DCMS \u2014 Community Life Survey 2024-25. Volunteering Matters \u2014 State of Volunteering report, 2025."
          />
        </ScrollReveal>

        <RelatedTopics />

        {/* Sources & Methodology */}
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
              {data?.metadata.knownIssues.map((x, i) => <li key={i}>{x}</li>)}
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
