'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

// ── Types ────────────────────────────────────────────────────────────────────

interface YearDeaths {
  year: number;
  deaths: number;
}

interface YearAdmissions {
  year: number;
  admissions: number;
}

interface AlcoholDeathsData {
  alcoholDeaths: { timeSeries: YearDeaths[] };
  hospitalAdmissions: { timeSeries: YearAdmissions[] };
  liverDisease: { timeSeries: YearDeaths[] };
  metadata: {
    topic: string;
    lastUpdated: string;
    sources: {
      name: string;
      dataset: string;
      url: string;
      retrieved: string;
      frequency: string;
    }[];
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

function fmtNum(n: number): string {
  return n.toLocaleString();
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function AlcoholSpecificDeathsPage() {
  const [data, setData] = useState<AlcoholDeathsData | null>(null);

  useEffect(() => {
    fetch('/data/alcohol-specific-deaths/alcohol_specific_deaths.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const deathsSeries: Series[] = data
    ? [{
        id: 'alcohol-deaths',
        label: 'Alcohol-specific deaths',
        colour: '#E63946',
        data: data.alcoholDeaths.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.deaths,
        })),
      }]
    : [];

  const admissionsSeries: Series[] = data
    ? [{
        id: 'hospital-admissions',
        label: 'Alcohol-related hospital admissions',
        colour: '#6B7280',
        data: data.hospitalAdmissions.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.admissions,
        })),
      }]
    : [];

  const liverSeries: Series[] = data
    ? [{
        id: 'liver-deaths',
        label: 'Alcoholic liver disease deaths',
        colour: '#F4A261',
        data: data.liverDisease.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.deaths,
        })),
      }]
    : [];

  // ── Derived metrics ──────────────────────────────────────────────────────

  const latestDeaths = data?.alcoholDeaths.timeSeries[data.alcoholDeaths.timeSeries.length - 1];
  const preCovidDeaths = data?.alcoholDeaths.timeSeries.find(d => d.year === 2019);
  const deathsChange = latestDeaths && preCovidDeaths
    ? Math.round(((latestDeaths.deaths - preCovidDeaths.deaths) / preCovidDeaths.deaths) * 100)
    : 33;

  const latestAdmissions = data?.hospitalAdmissions.timeSeries[data.hospitalAdmissions.timeSeries.length - 1];

  const latestLiver = data?.liverDisease.timeSeries[data.liverDisease.timeSeries.length - 1];
  const preCovidLiver = data?.liverDisease.timeSeries.find(d => d.year === 2019);
  const liverChange = latestLiver && preCovidLiver
    ? Math.round(((latestLiver.deaths - preCovidLiver.deaths) / preCovidLiver.deaths) * 100)
    : 36;

  return (
    <>
      <TopicNav topic="Alcohol-Specific Deaths" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Alcohol-Specific Deaths"
          question="Are Alcohol Deaths Still Rising?"
          finding="Alcohol-specific deaths in England reached 10,048 in 2024 — a new record and up 33% since 2019. The pandemic drove a step change in heavy drinking that has not reversed, and alcohol-related hospital admissions now exceed one million per year."
          colour="#E63946"
          preposition="with"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              Alcohol-specific deaths in England have reached their highest level since records began.
              In 2024, 10,048 people died from conditions wholly caused by alcohol — up 33% from
              7,565 in 2019. The pandemic was the inflection point: lockdowns, isolation, and the
              closure of support services drove a surge in heavy drinking among those already
              dependent, and the trajectory has not reversed. The people dying are overwhelmingly
              middle-aged men in the most deprived areas of England: the death rate in the most
              deprived decile is more than five times higher than in the least deprived.
            </p>
            <p>
              Alcoholic liver disease accounts for roughly 72% of these deaths and has followed
              the same upward curve. Liver disease is unusual among major killers in that it
              disproportionately affects working-age adults — the average age of death is
              significantly lower than for cancer or heart disease. The NHS burden is immense:
              alcohol-related hospital admissions now exceed one million episodes per year, consuming
              theatre time, ICU beds, and psychiatric liaison resources that are already stretched
              thin. Emergency department presentations for acute alcohol harm have risen in parallel.
            </p>
            <p>
              The policy gap is stark. Scotland introduced minimum unit pricing (MUP) in 2018, and
              Public Health Scotland reported a 13% reduction in alcohol-specific deaths in the
              years that followed. England shelved its own MUP plans in 2013 after industry
              lobbying, and has not revisited the policy since. The evidence base for what works —
              minimum pricing, restrictions on marketing, brief interventions in primary care,
              investment in community alcohol treatment — is robust and repeatedly endorsed by NICE,
              the Chief Medical Officer, and the WHO. The challenge is not a lack of evidence but
              a lack of political will. Meanwhile, alcohol treatment services in England have seen
              real-terms funding cuts of over 30% since 2013/14, and waiting times for specialist
              support have grown. The people most affected are the least likely to have a political
              voice. The data makes the case plainly: this is a public health emergency being met
              with policy silence.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-deaths', label: 'Deaths trend' },
          { id: 'sec-admissions', label: 'Hospital admissions' },
          { id: 'sec-liver', label: 'Liver disease' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Alcohol-specific deaths (England)"
            value={latestDeaths ? fmtNum(latestDeaths.deaths) : '10,048'}
            unit="2024"
            direction="up"
            polarity="up-is-bad"
            changeText={`+${deathsChange}% since 2019 · record high`}
            sparklineData={
              data ? sparkFrom(data.alcoholDeaths.timeSeries.map(d => d.deaths)) : []
            }
            source="ONS — Alcohol-specific deaths in the UK, Feb 2026"
            href="#sec-deaths"
          />
          <MetricCard
            label="Alcohol-related hospital admissions"
            value={latestAdmissions ? (latestAdmissions.admissions / 1000000).toFixed(2) + 'M' : '1.08M'}
            unit="2024"
            direction="up"
            polarity="up-is-bad"
            changeText="exceeds 1 million per year since 2019"
            sparklineData={
              data ? sparkFrom(data.hospitalAdmissions.timeSeries.map(d => d.admissions)) : []
            }
            source="NHS Digital — Statistics on Alcohol, Feb 2026"
            href="#sec-admissions"
          />
          <MetricCard
            label="Alcoholic liver disease deaths"
            value={latestLiver ? fmtNum(latestLiver.deaths) : '7,236'}
            unit="2024"
            direction="up"
            polarity="up-is-bad"
            changeText={`+${liverChange}% since 2019 · 72% of all alcohol deaths`}
            sparklineData={
              data ? sparkFrom(data.liverDisease.timeSeries.map(d => d.deaths)) : []
            }
            source="ONS — Liver disease mortality, Feb 2026"
            href="#sec-liver"
          />
        </div>

        {/* Chart 1: Alcohol-specific deaths */}
        <ScrollReveal>
          <div id="sec-deaths" className="mb-12">
            <LineChart
              series={deathsSeries}
              title="Alcohol-specific deaths, England, 2012-2024"
              subtitle="Deaths from conditions wholly attributable to alcohol. Record high reached in 2024."
              yLabel="Deaths"
              annotations={[
                { date: new Date(2018, 5, 1), label: '2018: Scotland introduces MUP' },
                { date: new Date(2020, 2, 1), label: '2020: COVID-19 lockdowns begin' },
              ]}
              source={{
                name: 'ONS',
                dataset: 'Alcohol-specific deaths in the UK',
                frequency: 'annual',
                url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/healthandsocialcare/causesofdeath/bulletins/alcoholspecificdeathsintheuk',
                date: 'Feb 2026',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 2: Hospital admissions */}
        <ScrollReveal>
          <div id="sec-admissions" className="mb-12">
            <LineChart
              series={admissionsSeries}
              title="Alcohol-related hospital admissions, England, 2012-2024"
              subtitle="Total episodes where alcohol was a primary or secondary diagnosis. Exceeded 1 million in 2019 and has remained above that level."
              yLabel="Admissions"
              annotations={[
                { date: new Date(2020, 2, 1), label: '2020: Lockdown suppresses admissions' },
                { date: new Date(2021, 5, 1), label: '2021: Methodology change' },
              ]}
              source={{
                name: 'NHS Digital',
                dataset: 'Statistics on Alcohol, England',
                frequency: 'annual',
                url: 'https://digital.nhs.uk/data-and-information/publications/statistical/statistics-on-alcohol',
                date: 'Feb 2026',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 3: Liver disease deaths */}
        <ScrollReveal>
          <div id="sec-liver" className="mb-12">
            <LineChart
              series={liverSeries}
              title="Alcoholic liver disease deaths, England, 2012-2024"
              subtitle="Liver disease accounts for roughly 72% of all alcohol-specific deaths. Average age of death is significantly below that for cancer or heart disease."
              yLabel="Deaths"
              annotations={[
                { date: new Date(2013, 0, 1), label: '2013: England shelves MUP plans' },
                { date: new Date(2020, 2, 1), label: '2020: Pandemic step change' },
              ]}
              source={{
                name: 'ONS',
                dataset: "Deaths from liver disease",
                frequency: 'annual',
                url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/healthandsocialcare/causesofdeath',
                date: 'Feb 2026',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Scotland shows minimum unit pricing works"
            value="13%"
            unit="reduction"
            description="Scotland introduced minimum unit pricing (MUP) for alcohol in May 2018, setting a floor price of 50p per unit. Public Health Scotland reported a 13% reduction in alcohol-specific deaths in the four years following implementation, with the largest reductions among men and people living in the most deprived areas — precisely the groups most affected. In 2024, Scotland raised the minimum price to 65p per unit. The evidence is clear that price-based interventions reduce harm among the heaviest drinkers without meaningfully affecting moderate consumers. England has not introduced equivalent measures."
            source="Source: Public Health Scotland — Evaluating the impact of minimum unit pricing, 2023. Scottish Government — MUP evaluation framework."
          />
        </ScrollReveal>

        <RelatedTopics />

        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p>
              <a
                href="https://www.ons.gov.uk/peoplepopulationandcommunity/healthandsocialcare/causesofdeath/bulletins/alcoholspecificdeathsintheuk"
                target="_blank"
                rel="noopener noreferrer"
                className="text-wiah-blue hover:underline"
              >
                ONS — Alcohol-specific deaths in the UK
              </a>{' '}
              — primary source for deaths data. Retrieved Feb 2026.
            </p>
            <p>
              <a
                href="https://digital.nhs.uk/data-and-information/publications/statistical/statistics-on-alcohol"
                target="_blank"
                rel="noopener noreferrer"
                className="text-wiah-blue hover:underline"
              >
                NHS Digital — Statistics on Alcohol, England
              </a>{' '}
              — hospital admissions data. Retrieved Feb 2026.
            </p>
            <p>
              Alcohol-specific deaths are defined using ICD-10 codes for conditions wholly
              attributable to alcohol, including alcoholic liver disease (K70), mental and
              behavioural disorders due to alcohol (F10), and accidental poisoning by alcohol
              (X45). Hospital admissions cover episodes where an alcohol-related condition was
              the primary or secondary diagnosis.
            </p>
            <p>
              All figures are for England unless otherwise stated. The COVID-19 pandemic disrupted
              both drinking patterns and healthcare access in 2020-2021, creating a step change
              visible in all three time series. Hospital admissions methodology changed in 2021;
              pre/post figures for the broader measure are not directly comparable.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
