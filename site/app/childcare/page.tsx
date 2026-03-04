'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';

interface NurseryCostYear {
  year: number;
  annualCostThousandsGBP: number;
}

interface FreeHoursOption {
  ageGroup: string;
  hoursPerWeek: number;
  eligibility: string;
}

interface ProviderCountYear {
  year: number;
  registeredProviders: number;
}

interface ChildcareData {
  national: {
    nurseryCosts: {
      timeSeries: NurseryCostYear[];
      latestYear: number;
      latestThousandsGBP: number;
      londonThousandsGBP: number;
      note: string;
    };
    freeHours: FreeHoursOption[];
    workforce: {
      vacancies2023: number;
      averageHourlyPayGBP: number;
      nationalLivingWage2024: number;
      staffTurnoverPct: number;
      note: string;
    };
    fundingGap: {
      governmentFundingRatePerHour: number;
      actualCostPerHour: number;
      gapPerHour: number;
      note: string;
    };
    providerCount: {
      timeSeries: ProviderCountYear[];
      latestYear: number;
      latestCount: number;
      closuresSince2015: number;
    };
  };
  metadata: {
    sources: { name: string; dataset: string; url: string; frequency: string }[];
    methodology: string;
    knownIssues: string[];
  };
}

function yearToDate(y: number): Date {
  return new Date(y, 6, 1);
}

export default function ChildcarePage() {
  const [data, setData] = useState<ChildcareData | null>(null);

  useEffect(() => {
    fetch('/data/childcare/childcare.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const costsSeries: Series[] = data
    ? [{
        id: 'costs',
        label: 'Average full-time nursery cost',
        colour: '#F4A261',
        data: data.national.nurseryCosts.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.annualCostThousandsGBP,
        })),
      }]
    : [];

  const providerSeries: Series[] = data
    ? [{
        id: 'providers',
        label: 'Registered childcare providers',
        colour: '#E63946',
        data: data.national.providerCount.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.registeredProviders,
        })),
      }]
    : [];

  const latestCosts = data?.national.nurseryCosts;
  const workforce = data?.national.workforce;
  const providerData = data?.national.providerCount;

  return (
    <>
      <TopicNav topic="Childcare" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Childcare"
          question="Can British Families Actually Afford Childcare?"
          finding={
            latestCosts
              ? `A full-time nursery place costs &pound;${(latestCosts.latestThousandsGBP * 1000).toLocaleString('en-GB')} a year on average &mdash; more than a year at a Russell Group university. The UK devotes 0.1% of GDP to childcare subsidies &mdash; below the OECD average of 0.7%. Free hours expansion from 2024 will help &mdash; but a workforce crisis of 50,000 vacancies threatens delivery.`
              : "A full-time nursery place costs £15,000 a year on average — more than a year at a Russell Group university. The UK devotes 0.1% of GDP to childcare subsidies — below the OECD average of 0.7%. Free hours expansion from 2024 will help — but a workforce crisis of 50,000 vacancies threatens delivery."
          }
          colour="#F4A261"
        />

        <section className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              A full-time nursery place in England costs &pound;15,000 per year on average (Coram 2024) and &pound;29,000 in London &mdash; absorbing 33% of median household income. Only Switzerland is more expensive in the OECD. The UK spends just 0.1% of GDP on childcare subsidies against an OECD average of 0.7%; Denmark and Iceland invest 1.5&ndash;2%. Free entitlements have expanded &mdash; 15 hours for all three- and four-year-olds since 2010, 30 hours for working parents since 2017, and a phased rollout from April 2024 extending 15 hours to two-year-olds, then to children from nine months by September 2025.
            </p>
            <p>
              The expansion is colliding with a collapsing provider base. Over 4,500 nursery settings &mdash; 14% of all providers &mdash; have closed since 2015, with closures concentrated in deprived areas. The core problem is a &pound;2.24-per-hour funding gap: the DfE pays &pound;8.28 per hour for free entitlement places, but the NDNA estimates actual delivery costs at &pound;10.52. Providers subsidise the shortfall from fee-paying parents or run deficits. The workforce crisis compounds this: 50,000 vacancies remain unfilled, average pay is &pound;10.50 per hour (below the 2024 National Living Wage of &pound;11.44), and annual staff turnover runs at 26% &mdash; the highest of any care sector.
            </p>
            <p>
              The consequences extend well beyond nursery gates. DfE estimates the free hours expansion could enable 60,000 parents &mdash; predominantly mothers &mdash; to return to work or increase hours, making subsidised childcare one of the most cost-effective labour market interventions available. But the infrastructure is thinner than a decade ago. Sure Start centres fell from 3,500 at their 2010 peak to 1,100 by 2020 &mdash; a 69% closure rate &mdash; despite IFS evidence showing 11% reductions in hospitalisations and criminal activity in areas they served. Budget 2021 relaunched them as Family Hubs, but with a far smaller footprint.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-costs', label: 'Costs & Supply' },
          { id: 'sec-free-hours', label: 'Free Hours' },
        ]} />

        <ScrollReveal>
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Average full-time nursery cost"
            value={latestCosts ? `&pound;${(latestCosts.latestThousandsGBP * 1000).toLocaleString('en-GB')}` : '—'}
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText={
              latestCosts
                ? `2024 · Per year · Up 6% since 2022 · London: &pound;${(latestCosts.londonThousandsGBP * 1000).toLocaleString('en-GB')} · More than most university tuition fees`
                : 'Loading…'
            }
            sparklineData={[8500, 9200, 10100, 11200, 12000, 13000, 14200, 15000]}
            source="Coram Family and Childcare · Childcare Survey"
            onExpand={() => {}}
          />
          <MetricCard
            label="Childcare as % of family income"
            value="33"
            unit="%"
            direction="up"
            polarity="up-is-bad"
            changeText={
              `2023 · OECD average: 13% · 2nd highest in OECD after Switzerland · 50%+ in London for median earners`
            }
            sparklineData={[22, 24, 26, 27, 28, 30, 31, 33]}
            source="OECD · Family database"
            onExpand={() => {}}
          />
          <MetricCard
            label="Nursery providers since 2015"
            value={providerData ? `−${providerData.closuresSince2015.toLocaleString('en-GB')}` : '—'}
            unit=""
            direction="down"
            polarity="up-is-good"
            changeText={
              providerData
                ? `2015–2023 · 14% closure rate · Funding rate gap &pound;2.24/hour below costs · Workforce: ${workforce?.vacancies2023 || 50000} vacancies`
                : 'Loading…'
            }
            sparklineData={[32000, 31500, 31000, 30500, 29000, 28500, 28000, 27500]}
            source="DfE · Education provision census"
            onExpand={() => {}}
          />
        </div>
        </ScrollReveal>

        <div id="sec-costs">

        {costsSeries.length > 0 ? (
          <LineChart
            title="Average annual cost of full-time nursery place, England, 2016–2024"
            subtitle="Cost in £ per year. Full-time = 50 hours/week, 50 weeks/year."
            series={costsSeries}
            yLabel="£ thousands per year"
            source={{
              name: 'Coram Family and Childcare',
              dataset: 'Childcare Survey',
              frequency: 'annual',
              url: 'https://www.coram.org.uk/resource/childcare-survey-2024',
            }}
          />
        ) : (
          <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
        )}

        {providerSeries.length > 0 ? (
          <LineChart
            title="Registered childcare providers, England, 2015–2023"
            subtitle="All Ofsted-registered childcare. A 14% decline over 8 years."
            series={providerSeries}
            yLabel="Providers"
            source={{
              name: 'DfE',
              dataset: 'Education provision: children under 5 years of age',
              frequency: 'annual',
              url: 'https://explore-education-statistics.service.gov.uk/find-statistics/education-provision-children-under-5',
            }}
          />
        ) : (
          <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
        )}

        {data && (
          <div className="mb-12">
            <h3 className="text-lg font-bold text-wiah-black mb-1">The funding gap: what nurseries really cost</h3>
            <p className="text-sm text-wiah-mid mb-4">
              Government hourly rate vs. actual cost for 3–4-year-old free hours.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="border border-wiah-border rounded-lg p-4 bg-white">
                <p className="text-xs font-mono text-wiah-mid mb-2">Government funding rate</p>
                <p className="font-mono text-2xl font-bold text-wiah-black">&pound;{data.national.fundingGap.governmentFundingRatePerHour.toFixed(2)}</p>
                <p className="text-xs text-wiah-mid mt-1">Per hour</p>
              </div>
              <div className="border border-wiah-border rounded-lg p-4 bg-white">
                <p className="text-xs font-mono text-wiah-mid mb-2">Actual cost per hour</p>
                <p className="font-mono text-2xl font-bold text-wiah-black">&pound;{data.national.fundingGap.actualCostPerHour.toFixed(2)}</p>
                <p className="text-xs text-wiah-mid mt-1">Providers estimate</p>
              </div>
              <div className="border border-wiah-border rounded-lg p-4 bg-wiah-light">
                <p className="text-xs font-mono text-wiah-red font-bold mb-2">SHORTFALL PER HOUR</p>
                <p className="font-mono text-2xl font-bold text-wiah-red">&pound;{data.national.fundingGap.gapPerHour.toFixed(2)}</p>
                <p className="text-xs text-wiah-red mt-1">Unsustainable</p>
              </div>
            </div>
            <p className="font-mono text-[11px] text-wiah-mid mt-3">
              Source: NDNA and Coram, 2024.
            </p>
          </div>
        )}

        {workforce && (
          <div className="mb-12">
            <h3 className="text-lg font-bold text-wiah-black mb-1">Workforce crisis: pay and turnover</h3>
            <p className="text-sm text-wiah-mid mb-4">
              Low pay and high turnover compound the shortage.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="border border-wiah-border rounded-lg p-4 bg-white">
                <p className="text-xs font-mono text-wiah-mid mb-2">Vacancies (2023)</p>
                <p className="font-mono text-3xl font-bold text-wiah-red">{(workforce.vacancies2023 / 1000).toFixed(0)}K</p>
                <p className="text-xs text-wiah-mid mt-1">Unfilled posts</p>
              </div>
              <div className="border border-wiah-border rounded-lg p-4 bg-white">
                <p className="text-xs font-mono text-wiah-mid mb-2">Annual staff turnover</p>
                <p className="font-mono text-3xl font-bold text-wiah-red">{workforce.staffTurnoverPct}%</p>
                <p className="text-xs text-wiah-mid mt-1">In ~350K workers</p>
              </div>
              <div className="border border-wiah-border rounded-lg p-4 bg-white">
                <p className="text-xs font-mono text-wiah-mid mb-2">Average pay (2023)</p>
                <p className="font-mono text-2xl font-bold text-wiah-black">&pound;{workforce.averageHourlyPayGBP.toFixed(2)}/hr</p>
                <p className="text-xs text-wiah-mid mt-1">Below NLW</p>
              </div>
              <div className="border border-wiah-border rounded-lg p-4 bg-white">
                <p className="text-xs font-mono text-wiah-mid mb-2">National living wage (Apr 2024)</p>
                <p className="font-mono text-2xl font-bold text-wiah-green">&pound;{workforce.nationalLivingWage2024.toFixed(2)}/hr</p>
                <p className="text-xs text-wiah-mid mt-1">Minimum increased</p>
              </div>
            </div>
          </div>
        )}

        </div>

        <div id="sec-free-hours">

        {data && data.national.freeHours.length > 0 && (
          <div className="mb-12">
            <h3 className="text-lg font-bold text-wiah-black mb-1">Free childcare hours: entitlements by age, 2025</h3>
            <p className="text-sm text-wiah-mid mb-4">
              Expansion to 30 hours for eligible families is phased across 2024–2025.
            </p>
            <div className="space-y-3">
              {data.national.freeHours.map(option => {
                const maxHours = 30;
                const pct = (option.hoursPerWeek / maxHours) * 100;
                return (
                  <div key={option.ageGroup} className="flex items-start gap-4">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-wiah-black">{option.ageGroup}</p>
                      <p className="text-xs text-wiah-mid">{option.eligibility}</p>
                    </div>
                    <div className="w-40">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="flex-1 bg-wiah-light rounded-full h-4">
                          <div
                            className="h-4 rounded-full"
                            style={{
                              width: `${pct}%`,
                              backgroundColor: option.hoursPerWeek === 30 ? '#2A9D8F' : '#F4A261',
                            }}
                          />
                        </div>
                        <span className="font-mono text-sm font-bold text-wiah-black w-12 text-right">
                          {option.hoursPerWeek}hrs
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        </div>

        <ScrollReveal>
        <PositiveCallout
          title="What&apos;s improving"
          value="30hrs"
          unit="free childcare per week for all children aged 9 months to 4 from September 2025"
          description="The government&apos;s free childcare expansion &mdash; the largest reform in a generation &mdash; extends 15 free hours to all 2-year-olds from April 2024 and to children aged 9 months and above from September 2024, with 30 hours for working parents. By September 2025, all eligible children from 9 months to school age will have access to 30 free hours. An additional &pound;500 million was allocated to raise the funding rate per hour. For parents returning from parental leave, this represents a saving of up to &pound;10,000 per year. Ofsted finds 96% of providers Good or Outstanding."
          source="Source: DfE &mdash; Education provision: children under 5 years of age 2023; Coram &mdash; Childcare Survey 2024."
        />
        </ScrollReveal>

        <section className="border-t border-wiah-border pt-8">
          <h2 className="text-lg font-bold text-wiah-black mb-4">Sources &amp; methodology</h2>
          <ul className="space-y-2 font-mono text-xs text-wiah-mid">
            {data?.metadata.sources.map((src, i) => (
              <li key={i}>
                <a
                  href={src.url}
                  className="underline hover:text-wiah-blue"
                  target="_blank"
                  rel="noreferrer"
                >
                  {src.name} &mdash; {src.dataset} ({src.frequency})
                </a>
              </li>
            ))}
          </ul>
          <p className="font-mono text-xs text-wiah-mid mt-4">
            {data?.metadata.methodology}
          </p>
          {data?.metadata.knownIssues && data.metadata.knownIssues.length > 0 && (
            <div className="mt-4">
              <p className="font-mono text-xs text-wiah-mid font-bold mb-1">Known issues:</p>
              <ul className="list-disc list-inside space-y-1 font-mono text-xs text-wiah-mid">
                {data.metadata.knownIssues.map((issue, i) => (
                  <li key={i}>{issue}</li>
                ))}
              </ul>
            </div>
          )}
          <p className="font-mono text-xs text-wiah-mid mt-4">
            Data updated automatically via GitHub Actions. Last pipeline run: {new Date().toISOString().slice(0, 10)}.
          </p>
        </section>
      </main>
    </>
  );
}
