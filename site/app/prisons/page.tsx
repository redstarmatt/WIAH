'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import RelatedTopics from '@/components/RelatedTopics';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'Ministry of Justice', dataset: 'Prison Population Statistics', url: 'https://www.gov.uk/government/collections/prison-population-statistics', date: '2024' },
  { num: 2, name: 'Ministry of Justice', dataset: 'Crown Court Statistics', url: 'https://www.gov.uk/government/statistics/criminal-court-statistics-quarterly', date: '2024' },
  { num: 3, name: 'Ministry of Justice', dataset: 'End of Custody Supervised Licence Statistics', url: 'https://www.gov.uk/government/collections/prisons-and-probation-statistics', date: '2024' },
  { num: 4, name: 'Ministry of Justice', dataset: 'Proven Reoffending Statistics', url: 'https://www.gov.uk/government/statistics/proven-reoffending-statistics-quarterly-bulletin-england-and-wales', date: '2024' },
  { num: 5, name: 'Howard League for Penal Reform', dataset: 'Reoffending Analysis', url: 'https://howardleague.org/', date: '2024' },
  { num: 6, name: 'Institute for Fiscal Studies', dataset: 'Short Custodial Sentences and Reoffending Outcomes', url: 'https://ifs.org.uk/publications', date: '2023' },
];

interface PrisonsData {
  national: {
    prisonPopulation: {
      timeSeries: { year: number; populationThousands: number }[];
      latestYear: number;
      latestThousands: number;
      operationalCapacityThousands: number;
      remandPct: number;
      earlyRelease2024: number;
      note: string;
    };
    reoffending: {
      timeSeries: { year: number; reoffendingWithin12MonthsPct: number }[];
      latestYear: number;
      latestPct: number;
      under12MonthSentenceReoffendPct: number;
      note: string;
    };
    assaults: {
      timeSeries: { year: number; assaultsThousands: number }[];
      latestYear: number;
      latestThousands: number;
      seriousAssaultsThousands: number;
      onPrisonersPct: number;
    };
    byOffenceType: { offenceType: string; pct: number }[];
    buildingProgramme: {
      newPlacesTarget: number;
      newPlacesDeliveredBy2024: number;
      targetYear: number;
      costBillionGBP: number;
      note: string;
    };
  };
  metadata: {
    sources: { name: string; dataset: string; url: string; frequency: string }[];
    methodology: string;
    knownIssues: string[];
  };
}

export default function PrisonsPage() {
  const [data, setData] = useState<PrisonsData | null>(null);

  useEffect(() => {
    fetch('/data/prisons/prisons.json')
      .then(res => res.json())
      .then(setData)
      .catch(err => console.error('Failed to load prisons data:', err));
  }, []);

  if (!data) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  const populationSeries: Series[] = [
    {
      id: 'population',
      label: 'Prison population',
      colour: '#6B7280',
      data: data.national.prisonPopulation.timeSeries.map(d => ({
        date: new Date(d.year, 0, 1),
        value: d.populationThousands,
      })),
    },
  ];

  const assaultsSeries: Series[] = [
    {
      id: 'assaults',
      label: 'Total assaults',
      colour: '#E63946',
      data: data.national.assaults.timeSeries.map(d => ({
        date: new Date(d.year, 0, 1),
        value: d.assaultsThousands,
      })),
    },
  ];

  const reoffendingSeries: Series[] = [
    {
      id: 'reoffending',
      label: 'Proven reoffending within 12 months',
      colour: '#E63946',
      data: data.national.reoffending.timeSeries.map(d => ({
        date: new Date(d.year, 0, 1),
        value: d.reoffendingWithin12MonthsPct,
      })),
    },
  ];

  return (
    <div className="bg-white">
      <TopicNav topic="Prisons" />
      <TopicHeader
        topic="Prisons"
        colour="#6B7280"
        question="Is the British Prison System Actually Working?"
        finding="The prison population in England and Wales reached 88,000 in 2024 — the highest ever, above operational capacity. Reoffending within 12 months: 26%. Assaults are at record levels. The government released 5,500 prisoners early in 2024 to prevent system collapse."
      />

      <div className="max-w-5xl mx-auto px-6 py-12">

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              The prison population of England and Wales reached 88,000 in 2024 — the highest ever
              recorded, exceeding operational capacity of roughly 85,400 certified places.<Cite nums={1} /> It had dipped to
              78,000 during COVID in 2020 before surging on the back of tougher sentencing and a Crown Court
              backlog that has pushed remand numbers to 15,000, or 19% of all inmates — double the 2019
              figure.<Cite nums={2} /> Defendants now wait two years or more for trial, the longest court delays on record. In
              September 2024, the government introduced an emergency early release scheme, freeing 5,500
              prisoners after serving 40% rather than 50% of their sentences — a measure last used in 1987
              and 2007.<Cite nums={3} />
            </p>
            <p>
              The system struggles to reduce reoffending. The proven reoffending rate within 12 months
              stands at 26% overall, but 38% for those serving sentences of under 12 months — and
              two-thirds of men reoffend within two years, according to the Howard League.<Cite nums={[4, 5]} /> The Ministry of
              Justice estimates the total cost of reoffending at £18 billion per year.<Cite nums={4} /> An IFS study
              found that immediate custodial sentences of under 12 months produce no better reoffending
              outcomes than community sentences.<Cite nums={6} /> Intensive Supervision Courts were piloted in 2024 as an
              alternative for prolific offenders. Women make up 4% of the prison population — 3,800
              inmates — with 77% serving sentences of under 12 months, often for non-violent offences.<Cite nums={1} />
            </p>
            </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <ScrollReveal>
            <MetricCard
              label="Prison population, England &amp; Wales"
              value="88K"
              direction="up"
              polarity="up-is-bad"
              changeText="2024 · Record high · Operational capacity ~85K · 5,500 early releases in Sep 2024 · Remand: 19%"
              sparklineData={[70000, 72000, 74000, 76000, 78000, 80000, 82000, 84000, 86000, 88000]}
              href="#sec-chart"
            />
          </ScrollReveal>
          <ScrollReveal>
            <MetricCard
              label="Proven reoffending rate"
              value="26%"
              direction="flat"
              polarity="up-is-bad"
              changeText="Within 12 months of release · 38% for those serving under 12 months · Unchanged for a decade · Half reoffend within 2 years"
              sparklineData={[26, 27, 26, 25, 25, 26, 26, 26]}
              href="#sec-chart"
            />
          </ScrollReveal>
          <ScrollReveal>
            <MetricCard
              label="Assaults in prisons"
              value="36,500"
              direction="up"
              polarity="up-is-bad"
              changeText="2022/23 · Record high · Up from 14,000 in 2012 · 67% on prisoners · Serious assaults: 9,900"
              sparklineData={[14000, 16000, 19000, 22000, 26000, 30000, 27000, 30000, 36500]}
              href="#sec-chart"
            />
          </ScrollReveal>
        </div>

        <ScrollReveal>
          <div id="sec-chart" className="mb-12">
            <LineChart
              series={populationSeries}
              title="Prison population, England &amp; Wales, 2014–2024"
              subtitle="Total inmates at end of month"
              yLabel="Population (thousands)"
              annotations={[
                { date: new Date(2024, 8, 1), label: 'Sep 2024: Early release scheme' },
              ]}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="mb-12">
            <div className="bg-wiah-light rounded-lg p-6">
              <h3 className="text-lg font-bold text-wiah-black mb-4">Prison population by offence type (2024)</h3>
              <div className="space-y-3">
                {data.national.byOffenceType.map((offence, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-48 text-sm text-wiah-black">{offence.offenceType}</div>
                    <div className="flex-1 bg-white rounded h-6 flex items-center px-2">
                      <div
                        className="h-4 bg-[#6B7280] rounded"
                        style={{
                          width: `${offence.pct}%`,
                        }}
                      />
                    </div>
                    <div className="w-12 text-right text-sm font-mono text-wiah-mid">{offence.pct}%</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="mb-12">
            <LineChart
              series={assaultsSeries}
              title="Assaults in prisons, 2014–2023"
              subtitle="All incidents recorded as assault"
              yLabel="Assaults (thousands)"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="mb-12">
            <LineChart
              series={reoffendingSeries}
              title="Proven reoffending rate, 2016–2022"
              subtitle="Caution or conviction within 12 months of release"
              yLabel="Reoffending rate (%)"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="Expansion plan"
            value="5,800"
            unit="new prison places delivered by 2024 — part of £4 billion 20,000-place expansion"
            description="The government has committed to building 20,000 new prison places by 2030, with 5,800 delivered by mid-2024 at a cost of £4 billion. New facilities include HMP Five Wells (Wellingborough) and HMP Fosse Way (Glen Parva). New prisons are designed to &ldquo;colocate&rdquo; education and rehabilitation programmes within purpose-built wings. The Independent Monitoring Boards report improved conditions in new builds. The Prison Education Framework contracts with private providers to deliver literacy, numeracy, and vocational training — recognised by the Farmer Review (2017) as essential to reducing reoffending."
            source="Source: HMPPS — Prison Population Bulletin 2024; MOJ — Proven Reoffending Statistics 2022."
          />
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        <ScrollReveal>
          <div className="border-t border-wiah-border pt-8">
            <h3 className="text-lg font-bold text-wiah-black mb-4">Methodology &amp; sources</h3>
            <p className="text-sm text-wiah-mid mb-4">{data.metadata.methodology}</p>
            <div className="space-y-2 text-xs text-wiah-mid font-mono">
              {data.metadata.sources.map((source, idx) => (
                <div key={idx}>
                  <a href={source.url} className="text-wiah-blue hover:underline" target="_blank" rel="noopener noreferrer">
                    {source.name} — {source.dataset}
                  </a>
                  {' '}({source.frequency})
                </div>
              ))}
            </div>
            {data.metadata.knownIssues.length > 0 && (
              <div className="mt-4 p-3 bg-wiah-light rounded text-xs text-wiah-mid">
                <p className="font-bold mb-2">Known issues:</p>
                <ul className="list-disc list-inside space-y-1">
                  {data.metadata.knownIssues.map((issue, idx) => (
                    <li key={idx}>{issue}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </ScrollReveal>
      </div>
        <RelatedTopics />
    </div>
  );
}
