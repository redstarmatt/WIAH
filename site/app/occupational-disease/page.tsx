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

const editorialRefs: Reference[] = [
  { num: 1, name: 'HSE', dataset: 'Labour Force Survey — Self-reported work-related ill health', url: 'https://www.hse.gov.uk/statistics/lfs/index.htm', date: '2022/23' },
  { num: 2, name: 'HSE', dataset: 'Costs to Great Britain of workplace injuries and new cases of work-related ill health', url: 'https://www.hse.gov.uk/statistics/cost.htm', date: '2021/22' },
  { num: 3, name: 'HSE', dataset: 'RIDDOR fatal injuries statistics', url: 'https://www.hse.gov.uk/statistics/fatals.htm', date: '2022/23' },
  { num: 4, name: 'HSE', dataset: 'Health and Safety Executive budget and staffing data', url: 'https://www.hse.gov.uk/aboutus/reports/', date: '2023' },
  { num: 5, name: 'Stevenson / Farmer', dataset: 'Thriving at Work — independent review of mental health and employers', url: 'https://www.gov.uk/government/publications/thriving-at-work-a-review-of-mental-health-and-employers', date: '2017' },
];

// ── Types ────────────────────────────────────────────────────────────────────

interface IllHealthPoint {
  year: number;
  cases: number;
}

interface DaysLostPoint {
  year: number;
  days: number;
}

interface StressPoint {
  year: number;
  cases: number;
}

interface MusculoskeletalPoint {
  year: number;
  cases: number;
}

interface FatalInjuryPoint {
  year: number;
  count: number;
}

interface CostPoint {
  year: number;
  billionGBP: number;
}

interface SectorData {
  sector: string;
  ratePerHundredThousand: number;
}

interface OccupationalDiseaseData {
  illHealthCases: IllHealthPoint[];
  daysLost: DaysLostPoint[];
  stressAnxietyDepression: StressPoint[];
  musculoskeletalCases: MusculoskeletalPoint[];
  fatalInjuries: FatalInjuryPoint[];
  costToEconomy: CostPoint[];
  bySector: SectorData[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

function sparkFrom(arr: number[], n = 10) {
  return arr.slice(-n);
}

function millions(n: number): string {
  return (n / 1_000_000).toFixed(1) + 'M';
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function OccupationalDiseasePage() {
  const [data, setData] = useState<OccupationalDiseaseData | null>(null);

  useEffect(() => {
    fetch('/data/occupational-disease/occupational_disease.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const illHealthSeries: Series[] = data
    ? [
        {
          id: 'ill-health',
          label: 'Total work-related ill health cases',
          colour: '#E63946',
          data: data.illHealthCases.map(d => ({
            date: yearToDate(d.year),
            value: d.cases / 1_000_000,
          })),
        },
        {
          id: 'stress',
          label: 'Stress, depression & anxiety',
          colour: '#F4A261',
          data: data.stressAnxietyDepression.map(d => ({
            date: yearToDate(d.year),
            value: d.cases / 1_000_000,
          })),
        },
        {
          id: 'msd',
          label: 'Musculoskeletal disorders',
          colour: '#264653',
          data: data.musculoskeletalCases.map(d => ({
            date: yearToDate(d.year),
            value: d.cases / 1_000_000,
          })),
        },
      ]
    : [];

  const illHealthAnnotations: Annotation[] = [
    { date: new Date(2020, 2, 1), label: '2020: COVID-19 pandemic' },
    { date: new Date(2017, 0, 1), label: '2017: Work-related stress framework revised' },
  ];

  const daysLostSeries: Series[] = data
    ? [{
        id: 'days-lost',
        label: 'Working days lost (millions)',
        colour: '#6B7280',
        data: data.daysLost.map(d => ({
          date: yearToDate(d.year),
          value: d.days / 1_000_000,
        })),
      }]
    : [];

  const daysLostAnnotations: Annotation[] = [
    { date: new Date(2020, 2, 1), label: '2020: Pandemic peak — 38.8M days lost' },
  ];

  const costSeries: Series[] = data
    ? [{
        id: 'cost',
        label: 'Annual cost to the economy',
        colour: '#E63946',
        data: data.costToEconomy.map(d => ({
          date: yearToDate(d.year),
          value: d.billionGBP,
        })),
      }]
    : [];

  const costAnnotations: Annotation[] = [
    { date: new Date(2020, 2, 1), label: '2020: Costs surge with pandemic' },
  ];

  // ── Latest values ─────────────────────────────────────────────────────────

  const latestCases = data?.illHealthCases[data.illHealthCases.length - 1];
  const cases2019 = data?.illHealthCases.find(d => d.year === 2019);
  const latestDays = data?.daysLost[data.daysLost.length - 1];
  const days2019 = data?.daysLost.find(d => d.year === 2019);
  const latestCost = data?.costToEconomy[data.costToEconomy.length - 1];

  const casesChange = latestCases && cases2019
    ? Math.round(((latestCases.cases - cases2019.cases) / cases2019.cases) * 100)
    : 25;

  const daysChange = latestDays && days2019
    ? Math.round(((latestDays.days - days2019.days) / days2019.days) * 100)
    : 7;

  return (
    <>
      <TopicNav topic="Occupational Disease" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Occupational Disease"
          question="How Many People Get Ill Because of Their Job?"
          finding="1.8 million workers in Great Britain reported work-related ill health in 2022/23 — a record high. Stress, depression and anxiety now account for half of all cases. 35.2 million working days were lost to work-related illness and injury, costing the economy an estimated £20.7 billion."
          colour="#6B7280"
          preposition="with"
        />

        {/* Editorial context */}
        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              The scale of occupational ill health in Britain is enormous and growing. In 2022/23,
              an estimated 1.8 million workers reported suffering from a work-related illness — up
              25% from 1.44 million in 2018/19.<Cite nums={1} /> The dominant cause is no longer the industrial
              diseases of the twentieth century. Stress, depression and anxiety now account for
              approximately 900,000 cases annually, overtaking musculoskeletal disorders as the
              leading cause in 2017 and accelerating sharply during the pandemic.<Cite nums={1} /> Health and social
              care workers, teachers and public sector employees face the highest rates. These are
              not minor ailments: the average case of work-related stress results in 19.6 days off
              work, and many cases become chronic, pushing people out of the labour market entirely.<Cite nums={1} />
            </p>
            <p>
              The economic cost is staggering. HSE economists estimate that workplace illness and
              injury cost Britain £20.7 billion in 2021/22 — equivalent to roughly 1% of GDP.<Cite nums={2} /> This
              figure captures lost output, healthcare costs and the human cost of reduced quality of
              life. The largest component is the 35.2 million working days lost each year, a figure
              that peaked at 38.8 million in 2019/20 as the pandemic tore through frontline
              workforces.<Cite nums={1} /> Days lost to stress alone account for over half the total. Meanwhile,
              physical workplace risks have not disappeared. An average of 135 workers are killed at
              work each year in Great Britain, with construction and agriculture consistently the
              most dangerous sectors.<Cite nums={3} /> Non-fatal injuries resulted in a further 561,000 cases in
              2022/23.<Cite nums={1} />
            </p>
            <p>
              Policy responses remain fragmented. The Health and Safety Executive&apos;s budget was cut
              by 50% in real terms between 2010 and 2020, reducing proactive inspections to a
              fraction of their former level.<Cite nums={4} /> The 2017 &ldquo;Thriving at Work&rdquo; review recommended
              mental health core standards for all employers, but adoption is voluntary and patchy.<Cite nums={5} />
              Occupational health provision — workplace doctors and nurses who can intervene early —
              covers fewer than half of UK workers, with almost no coverage in small businesses and
              the gig economy. The government&apos;s 2023 consultation on an occupational health
              taskforce signalled renewed interest, but structural reform has yet to materialise.
              Without it, the gap between the scale of the problem and the capacity to address it
              will continue to widen.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-ill-health', label: 'Ill health cases' },
          { id: 'sec-days-lost', label: 'Days lost' },
          { id: 'sec-cost', label: 'Economic cost' },
          { id: 'sec-sectors', label: 'By sector' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Work-related ill health cases"
            value={latestCases ? millions(latestCases.cases) : '1.8M'}
            unit="2022/23"
            direction="up"
            polarity="up-is-bad"
            changeText={`+${casesChange}% since 2018/19 · stress & anxiety account for 50%`}
            sparklineData={
              data ? sparkFrom(data.illHealthCases.map(d => d.cases / 1_000_000)) : [1.3, 1.4, 1.5, 1.6, 1.7, 1.75, 1.8]
            }
            source="HSE — Labour Force Survey, 2022/23"
            href="#sec-ill-health"
          />
          <MetricCard
            label="Working days lost (millions)"
            value={latestDays ? (latestDays.days / 1_000_000).toFixed(1) : '35.2'}
            unit="2022/23"
            direction="up"
            polarity="up-is-bad"
            changeText={`+${daysChange}% since 2018/19 · mental health main driver`}
            sparklineData={
              data ? sparkFrom(data.daysLost.map(d => d.days / 1_000_000)) : [31.8, 33, 34, 34.5, 35, 35.1, 35.2]
            }
            source="HSE — Labour Force Survey, 2022/23"
            href="#sec-days-lost"
          />
          <MetricCard
            label="Annual cost to economy"
            value={latestCost ? `£${latestCost.billionGBP}bn` : '£20.7bn'}
            unit="2021/22"
            direction="up"
            polarity="up-is-bad"
            changeText="equivalent to ~1% of GDP · includes healthcare, lost output, human costs"
            sparklineData={
              data ? sparkFrom(data.costToEconomy.map(d => d.billionGBP)) : [14.1, 14.9, 15, 15.6, 16.2, 18.8, 20.7]
            }
            source="HSE — Costs to Britain, 2021/22"
            href="#sec-cost"
          />
        </div>

        {/* Chart 1: Ill health cases by type */}
        <ScrollReveal>
          <div id="sec-ill-health" className="mb-12">
            <LineChart
              series={illHealthSeries}
              annotations={illHealthAnnotations}
              title="Work-related ill health cases by type, Great Britain, 2010–2023"
              subtitle="Total cases, stress/anxiety/depression, and musculoskeletal disorders (millions). Self-reported via Labour Force Survey."
              yLabel="Cases (millions)"
              source={{
                name: 'Health and Safety Executive',
                dataset: 'Labour Force Survey — Self-reported work-related ill health',
                frequency: 'annual',
                url: 'https://www.hse.gov.uk/statistics/lfs/index.htm',
                date: 'Nov 2023',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 2: Days lost */}
        <ScrollReveal>
          <div id="sec-days-lost" className="mb-12">
            <LineChart
              series={daysLostSeries}
              annotations={daysLostAnnotations}
              title="Working days lost to work-related illness and injury, 2010–2023"
              subtitle="Millions of days lost annually. Peaked at 38.8M in 2019/20 during the pandemic."
              yLabel="Days lost (millions)"
              source={{
                name: 'Health and Safety Executive',
                dataset: 'Labour Force Survey — Days lost',
                frequency: 'annual',
                url: 'https://www.hse.gov.uk/statistics/lfs/index.htm',
                date: 'Nov 2023',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 3: Cost to economy */}
        <ScrollReveal>
          <div id="sec-cost" className="mb-12">
            <LineChart
              series={costSeries}
              annotations={costAnnotations}
              title="Annual economic cost of workplace illness and injury, 2014–2023"
              subtitle="Total cost to Great Britain in billions (£), including lost output, healthcare and human costs."
              yLabel="Cost (£ billion)"
              source={{
                name: 'Health and Safety Executive',
                dataset: 'Costs to Great Britain of workplace injuries and new cases of work-related ill health',
                frequency: 'annual',
                url: 'https://www.hse.gov.uk/statistics/cost.htm',
                date: 'Nov 2023',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Sector breakdown — bar chart */}
        <ScrollReveal>
          <div id="sec-sectors" className="mb-12">
            <div className="bg-white rounded-lg border border-wiah-border p-8">
              <h2 className="text-lg font-bold text-wiah-black mb-2">
                Work-related ill health rate by industry sector
              </h2>
              <p className="text-sm text-wiah-mid mb-6">
                New cases per 100,000 workers, age-standardised. 2022/23.
              </p>
              <div className="mt-6 space-y-4">
                {data?.bySector.map((s) => {
                  const pct = (s.ratePerHundredThousand / 3500) * 100;
                  return (
                    <div key={s.sector}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-wiah-black">{s.sector}</span>
                        <span className="font-mono text-sm font-bold text-wiah-black">
                          {s.ratePerHundredThousand.toLocaleString()}
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
                Source: HSE — Labour Force Survey, age-standardised rates, 2022/23
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Fatal workplace injuries at historic lows"
            value="138"
            unit="deaths in 2022/23"
            description="Despite the rise in occupational ill health, fatal injuries at work have fallen dramatically over the long term. The 138 workers killed in 2022/23 compares to over 600 annual deaths in the early 1980s — a reduction of more than 75%. Britain's fatal injury rate of 0.41 per 100,000 workers is among the lowest in Europe, well below the EU average of 1.7. This reflects decades of strong health and safety regulation, the decline of heavy industry, and genuine improvements in workplace safety culture. The Health and Safety at Work Act 1974 remains one of the most effective pieces of public health legislation ever passed in the UK."
            source="Source: HSE — RIDDOR fatal injuries 2022/23. Eurostat — European Statistics on Accidents at Work."
          />
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        {/* Sources & Methodology */}
        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p>
              <a href="https://www.hse.gov.uk/statistics/overall/hssh2223.pdf" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">
                HSE — Health and safety at work: Summary statistics for Great Britain 2022/23
              </a>
              {' '}— primary summary source. Retrieved Nov 2023.
            </p>
            <p>
              <a href="https://www.hse.gov.uk/statistics/lfs/index.htm" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">
                HSE — Labour Force Survey: Self-reported work-related ill health and workplace injuries
              </a>
              {' '}— ill health cases and days lost data. Annual.
            </p>
            <p>
              <a href="https://www.hse.gov.uk/statistics/cost.htm" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">
                HSE — Costs to Great Britain of workplace injuries and new cases of work-related ill health
              </a>
              {' '}— economic cost modelling. Annual, ~2 year lag.
            </p>
            <p>
              <a href="https://www.hse.gov.uk/statistics/tables/ridind.xlsx" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">
                HSE — RIDDOR: Reporting of Injuries, Diseases and Dangerous Occurrences
              </a>
              {' '}— fatal injury data. Mandatory employer reporting.
            </p>
            <p className="mt-4">
              All figures are for Great Britain (England, Scotland and Wales) unless otherwise stated.
              Self-reported data from the Labour Force Survey may undercount cases in sectors with high
              migrant worker populations or precarious employment. LFS methodology moved from face-to-face
              to telephone interviews in 2020, which may affect year-on-year comparability. Cost estimates
              lag by approximately two years.
            </p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
