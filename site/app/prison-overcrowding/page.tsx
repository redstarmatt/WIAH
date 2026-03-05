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

interface PrisonData {
  national: {
    prisonPopulation: {
      timeSeries: Array<{ year: number; population: number }>;
      latestYear: number;
      latestPopulation: number;
      usableCapacity: number;
      occupancyPct: number;
    };
    remandPopulation: {
      timeSeries: Array<{ year: number; remandCount: number }>;
      latestYear: number;
      latestCount: number;
      pctOfPrisonPop: number;
    };
    byOffenceCategory: Array<{ category: string; count: number }>;
  };
  metadata: {
    sources: Array<{ name: string; dataset: string; url: string; frequency: string }>;
    methodology: string;
    knownIssues: string[];
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function PrisonOvercrowdingPage() {
  const [data, setData] = useState<PrisonData | null>(null);

  useEffect(() => {
    fetch('/data/prison-overcrowding/prison_overcrowding.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const populationSeries: Series[] = data
    ? [{
        id: 'prison-pop',
        label: 'Prison population',
        colour: '#6B7280',
        data: data.national.prisonPopulation.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.population,
        })),
      }]
    : [];

  const remandSeries: Series[] = data
    ? [{
        id: 'remand',
        label: 'Remand prisoners',
        colour: '#6B7280',
        data: data.national.remandPopulation.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.remandCount,
        })),
      }]
    : [];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Prison Overcrowding" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Prison Overcrowding"
          question="Are British Prisons at Breaking Point?"
          finding="England and Wales have 88,225 prisoners in jails built for 79,927 &mdash; 110% of usable capacity. In September 2023, a temporary early-release scheme freed 1,700 prisoners to avert collapse. The remand population has hit a record 16,400 &mdash; 24% of all prisoners. Reoffending costs the economy &pound;18 billion a year."
          colour="#6B7280"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>England and Wales hold 88,225 prisoners in an estate built for 79,927 usable places &mdash; an occupancy rate of 110%. The prison population has roughly doubled since 1990, when it stood at 45,000, driven by a sentencing ratchet that shows no sign of reversing. The average custodial sentence rose from 14.5 months in 2012 to 20 months in 2023. Recall prisoners &mdash; those returned to custody after breaching licence conditions &mdash; now account for 16% of the total population. In September 2023, the government activated an emergency early-release scheme, freeing 1,700 prisoners weeks before their scheduled dates to avert operational collapse.</p>
            <p>Much of the pressure traces to the court system. Between 2010 and 2019, 107 court buildings were closed across England and Wales, concentrating caseloads into fewer sites. The Crown Court backlog, already chronic before Covid, has pushed the remand population to a record 16,400 &mdash; 24% of all prisoners, some held for more than two years awaiting trial. Inside the walls, the staffing crisis compounds every problem: 4,200 prison officer posts sit vacant (an 8% gap), assaults on staff have risen 33% since 2019, and synthetic cannabinoids circulate in most adult male prisons. There were 61 self-inflicted deaths in custody in 2022.</p>
            <p>The reoffending cycle absorbs &pound;18 billion a year. Sixty per cent of those released reoffend within two years, with sentences under twelve months producing the worst outcomes &mdash; yet rehabilitation programmes have been cut as staff shortages force officers into basic custodial duties. The government&apos;s expansion plan targets 10,000 additional places across six new prisons by 2026; HMP Fosse Way in Leicestershire opened in 2023 with 1,700 places. The Independent Sentencing Review, launched in 2025 under David Gauke, is examining alternatives to short sentences. Legal challenges citing Article 3 of the European Convention on Human Rights &mdash; the prohibition of degrading treatment &mdash; are mounting over cell conditions and overcrowding.</p>
            <p>Overcrowding concentrates in specific estate categories. Category B local prisons &mdash; which hold remand prisoners and short-sentence inmates &mdash; run at 130&ndash;150% capacity, with two people routinely placed in cells designed for one. HMP Wandsworth, built in 1851 for 943, held 1,628 in 2023. The population skews heavily: 27% of prisoners are from Black and minority ethnic backgrounds, against 14% of the general population. Foreign national prisoners number 10,100 (12% of the total), with deportation backlogs adding to the strain. Women&apos;s prisons face acute overcrowding relative to their small estate &mdash; 12 prisons hold the entire female population, with several running above 120% capacity. Self-harm among women prisoners is six times the male rate, a crisis compounded by distance from families: the average woman is held 64 miles from home.</p>
            <p>Prison population projections have consistently underestimated growth. The Ministry of Justice&apos;s own 2019 model predicted 82,000 prisoners by 2024; the actual figure exceeded 88,000. Projections depend on assumptions about sentencing behaviour, recall rates, and court throughput that prove unreliable when policy changes &mdash; such as the expansion of indeterminate sentences or tougher parole conditions &mdash; alter the system&apos;s dynamics. Certified Normal Accommodation, the official measure of capacity, counts places rather than assessing liveable conditions; a cell &ldquo;designed for&rdquo; two may have no screening around the toilet. Overcrowding data exclude police cells used as overflow and prisoners held in court cells overnight. Reoffending statistics use a one-year follow-up window that misses longer-term patterns, and the &pound;18 billion annual cost estimate has not been independently audited since 2019.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-population', label: 'Prison Population' },
          { id: 'sec-remand', label: 'Remand' },
          { id: 'sec-offences', label: 'By Offence' },
        ]} />

        <ScrollReveal>
          <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Prison population (England &amp; Wales)"
              value="88,225"
              direction="up"
              polarity="up-is-bad"
              changeText="2023 &middot; 110% of usable capacity &middot; Built for 79,927 &middot; Emergency early-release in September 2023"
              sparklineData={[86048, 84421, 85509, 85961, 85862, 86584, 83539, 82781, 78837, 79027, 84246, 88225]}
              onExpand={() => {}}
            />
            <MetricCard
              label="Prisoners on remand (awaiting trial)"
              value="16,400"
              direction="up"
              polarity="up-is-bad"
              changeText="2023 &middot; Record high &middot; 24% of prison population &middot; Some held 2+ years pre-trial"
              sparklineData={[11000, 11200, 10800, 10200, 10600, 13200, 15000, 15800, 16400]}
              onExpand={() => {}}
            />
            <MetricCard
              label="Annual reoffending cost to economy"
              value="&pound;18bn"
              direction="flat"
              polarity="up-is-bad"
              changeText="Per year &middot; 60% of those released reoffend within 2 years &middot; Short sentences (&lt;12 months) have highest reoffending rates"
              sparklineData={[15, 15.5, 16, 16.5, 17, 17.5, 18, 18, 18]}
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-population" className="mb-12">
            <LineChart
              title="Prison population, England and Wales, 2012&ndash;2023"
              subtitle="Total number of sentenced and remand prisoners."
              series={populationSeries}
              yLabel="Number of prisoners"
              source={{
                name: 'Ministry of Justice',
                dataset: 'Prison Population Statistics',
                frequency: 'monthly',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-remand" className="mb-12">
            <LineChart
              title="Prisoners on remand (awaiting trial), 2012&ndash;2023"
              subtitle="Number of prisoners held on remand awaiting trial or sentence."
              series={remandSeries}
              yLabel="Remand prisoners"
              source={{
                name: 'Ministry of Justice',
                dataset: 'Offender Management Statistics',
                frequency: 'quarterly',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-offences" className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-2">Prison population by offence category, England and Wales, 2023</h2>
            <p className="text-sm text-wiah-mid font-mono mb-6">Total number of prisoners by primary offence category.</p>
            {data && (
              <div className="space-y-3">
                {data.national.byOffenceCategory.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-40 text-sm text-wiah-black flex-shrink-0">{item.category}</div>
                    <div className="flex-1 bg-wiah-border rounded h-5 overflow-hidden">
                      <div
                        className="h-full rounded"
                        style={{ width: `${(item.count / 32500) * 100}%`, backgroundColor: '#6B7280' }}
                      />
                    </div>
                    <div className="w-20 text-right text-sm font-mono text-wiah-black">{item.count.toLocaleString()}</div>
                  </div>
                ))}
              </div>
            )}
            <p className="font-mono text-xs text-wiah-mid mt-4">Source: Ministry of Justice &mdash; Prison Population Statistics</p>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="What&apos;s improving"
            value="10,000"
            unit="additional prison places planned &mdash; the largest prison-building programme since the Victorian era"
            description="The government has committed to building six new prisons as part of a programme to create 10,000 additional prison places by 2026 &mdash; the largest expansion since the Victorian era. HMP Fosse Way in Leicestershire opened in 2023, adding 1,700 places. The Independent Sentencing Review (2025), chaired by David Gauke, is examining alternatives to short custodial sentences to reduce the pressure of recall prisoners &mdash; who account for 16% of the prison population. Electronic monitoring has been extended, with 200,000 tags deployed annually. The Probation Service received a &pound;155 million investment to improve supervision and reduce reoffending post-release."
            source="Source: Ministry of Justice &mdash; Prison Population Statistics 2024; HMPPS &mdash; Annual Report 2023/24."
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
