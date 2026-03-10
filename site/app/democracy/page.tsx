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

interface TurnoutPoint {
  year: number;
  generalElection: boolean;
  turnoutPct: number;
  label: string;
}

interface TrustPoint {
  year: number;
  trustPct: number;
}

interface RegistrationPoint {
  year: number;
  registeredM: number;
  estimatedEligibleM: number;
}

interface DonationPoint {
  year: number;
  conservativeM: number;
  labourM: number;
}

interface DemocracyData {
  topic: string;
  lastUpdated: string;
  national: {
    voterTurnout: {
      timeSeries: TurnoutPoint[];
      latestYear: number;
      latestTurnout: number;
    };
    trustInParliament: {
      timeSeries: TrustPoint[];
      latestYear: number;
      latestTrustPct: number;
    };
    electoralRegistration: {
      timeSeries: RegistrationPoint[];
    };
    partyDonations: {
      timeSeries: DonationPoint[];
    };
  };
  metadata: {
    sources: { name: string; dataset: string; url: string; frequency: string }[];
    methodology: string;
    knownIssues: string[];
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

function sparkFrom(arr: number[], n = 12) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function DemocracyPage() {
  const [data, setData] = useState<DemocracyData | null>(null);

  useEffect(() => {
    fetch('/data/democracy/democracy.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const turnoutSeries: Series[] = data
    ? [{
        id: 'turnout',
        label: 'Turnout (%)',
        colour: '#264653',
        data: data.national.voterTurnout.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.turnoutPct,
        })),
      }]
    : [];

  const turnoutAnnotations: Annotation[] = [
    { date: yearToDate(2001), label: '2001: Historic low 59.4%' },
    { date: yearToDate(2016), label: '2016: EU Referendum 72.2%' },
  ];

  const trustSeries: Series[] = data
    ? [{
        id: 'trust',
        label: 'Trust in politicians (%)',
        colour: '#E63946',
        data: data.national.trustInParliament.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.trustPct,
        })),
      }]
    : [];

  const trustAnnotations: Annotation[] = [
    { date: yearToDate(2009), label: '2009: Expenses scandal' },
    { date: yearToDate(2022), label: '2022: Partygate' },
  ];

  const registrationSeries: Series[] = data
    ? [
        {
          id: 'registered',
          label: 'Registered voters (millions)',
          colour: '#264653',
          data: data.national.electoralRegistration.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.registeredM,
          })),
        },
        {
          id: 'eligible',
          label: 'Estimated eligible voters (millions)',
          colour: '#F4A261',
          data: data.national.electoralRegistration.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.estimatedEligibleM,
          })),
        },
      ]
    : [];

  const donationSeries: Series[] = data
    ? [
        {
          id: 'conservative',
          label: 'Conservative donations (£m)',
          colour: '#264653',
          data: data.national.partyDonations.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.conservativeM,
          })),
        },
        {
          id: 'labour',
          label: 'Labour donations (£m)',
          colour: '#E63946',
          data: data.national.partyDonations.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.labourM,
          })),
        },
      ]
    : [];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Democracy" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Democracy"
          question="Does Your Vote Actually Matter?"
          finding={
            data
              ? `The 2024 general election achieved 59.9% turnout — the second lowest since universal suffrage. Only 17% of Britons trust politicians to tell the truth.`
              : 'Loading…'
          }
          colour="#6B7280"
        />

        <section className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              The 2024 general election returned 59.9% turnout — the second lowest since women were fully enfranchised in 1928, beaten only by 2001's 59.4%. Labour took 412 seats on 33.7% of the vote; the Conservatives collapsed to 121 seats, their worst showing since 1906. The result laid bare the distortions of first-past-the-post: Reform UK won 14.3% of the national vote but just 5 seats (0.8% of the Commons), while the Liberal Democrats converted 12.2% of the vote into 72 seats. Votes and representation are structurally decoupled.
            </p>
            <p>
              Trust in politicians to tell the truth sits at 17%, according to Ipsos's annual survey running since 1983. That figure is level with the post-expenses-scandal trough of 2009 and only marginally above the 15% recorded after Partygate in 2022. For context, 95% of Britons trust nurses and 91% trust doctors; politicians rank below estate agents, at 26%. The 2016 EU referendum — held amid similar distrust — drew 72.2% turnout, suggesting disillusionment with politicians does not automatically suppress participation when the stakes feel direct.
            </p>
            </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-turnout', label: 'Turnout' },
          { id: 'sec-trust', label: 'Trust' },
          { id: 'sec-registration', label: 'Registration' },
          { id: 'sec-donations', label: 'Donations' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="2024 general election turnout"
            value={data?.national.voterTurnout.latestTurnout.toFixed(1) || '—'}
            unit="%"
            direction="down"
            polarity="up-is-good"
            changeText="Second lowest since 1950 · Down from 68.8% in 2017 · Voter ID introduced"
            sparklineData={
              data
                ? sparkFrom(data.national.voterTurnout.timeSeries.map(d => d.turnoutPct))
                : []
            }
            source="Electoral Commission · UK parliamentary general election results 2024"
          />
          <MetricCard
            label="Trust politicians to tell truth"
            value={data ? String(data.national.trustInParliament.latestTrustPct) : '—'}
            unit="%"
            direction="flat"
            polarity="up-is-good"
            changeText="2024 · Lowest since 2009 expenses scandal · Never exceeded 26% since 2003"
            sparklineData={
              data
                ? sparkFrom(data.national.trustInParliament.timeSeries.map(d => d.trustPct))
                : []
            }
            source="Ipsos MORI · Trust in professions and institutions survey 2024"
          />
          <MetricCard
            label="Unregistered eligible voters"
            value="3.1M"
            unit=""
            direction="flat"
            polarity="up-is-bad"
            changeText="2024 · ~6% of eligible voters not registered · Concentrated in young, renters, urban"
            sparklineData={
              data
                ? sparkFrom(data.national.electoralRegistration.timeSeries.map(d => d.estimatedEligibleM - d.registeredM), 10)
                : []
            }
            source="Electoral Commission · UK electoral registration statistics 2024"
          />
        </div>
        

        {/* Chart 1: Turnout */}
        <div id="sec-turnout">
        {turnoutSeries.length > 0 ? (
          <LineChart
            title="UK general election and referendum turnout, 1992–2024"
            subtitle="Percentage of registered electors who voted. Fell sharply in 2001; recovered slightly but fell again in 2024 — the second lowest since universal suffrage."
            series={turnoutSeries}
            annotations={turnoutAnnotations}
            yLabel="Percent"
            source={{
              name: 'Electoral Commission',
              dataset: 'UK Parliamentary general election results',
              frequency: 'per election',
              url: 'https://www.electoralcommission.org.uk/who-we-are-and-what-we-do/elections-and-referendums/past-elections-and-referendums',
            }}
          />
        ) : (
          <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
        )}
        </div>

        {/* Chart 2: Trust */}
        <div id="sec-trust">
        {trustSeries.length > 0 ? (
          <LineChart
            title="Trust in politicians to tell the truth, 2003–2024"
            subtitle="Percentage of adults who trust politicians to tell the truth. Never exceeded 26% since 2003. Expenses scandal and Partygate both caused sharp drops."
            series={trustSeries}
            annotations={trustAnnotations}
            yLabel="Percent"
            source={{
              name: 'Ipsos',
              dataset: 'Trust in Professions and Institutions survey',
              frequency: 'annual',
              url: 'https://www.ipsos.com/en-uk/trust-polls',
            }}
          />
        ) : (
          <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
        )}
        </div>

        {/* Chart 3: Electoral Registration */}
        <div id="sec-registration">
        {registrationSeries.length > 0 ? (
          <LineChart
            title="Electoral registration, England and Wales, 2015–2024"
            subtitle="Registered voters vs estimated eligible voters (millions). Registration reached a record high in 2024. Gap represents unregistered eligible citizens."
            series={registrationSeries}
            yLabel="Millions"
            source={{
              name: 'Electoral Commission',
              dataset: 'UK electoral registration statistics',
              frequency: 'annual',
              url: 'https://www.electoralcommission.org.uk/research-reports-and-data/electoral-data/electoral-registration-statistics',
            }}
          />
        ) : (
          <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
        )}
        </div>

        {/* Chart 4: Party Donations */}
        <div id="sec-donations">
        {donationSeries.length > 0 ? (
          <LineChart
            title="Political party donations, Conservative and Labour, 2015–2024"
            subtitle="Annual declared donations in millions of pounds. Surge dramatically in election years. Reflects both public fundraising and major donor activity."
            series={donationSeries}
            yLabel="£ Millions"
            source={{
              name: 'Electoral Commission',
              dataset: 'Political party donations and spending',
              frequency: 'quarterly',
              url: 'https://www.electoralcommission.org.uk/who-we-are-and-what-we-do/financial-reporting/donations-and-loans',
            }}
          />
        ) : (
          <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
        )}
        </div>

        {/* Positive story */}
        <ScrollReveal>
        <PositiveCallout
          title="What's improving"
          value="48.3M"
          unit="people on the electoral roll"
          description="Electoral registration reached 48.3 million in 2024 — the highest ever recorded. The introduction of Individual Electoral Registration in 2014 initially caused a drop, but automated registration through driving licences and government data has rebuilt the roll. More people are registered to vote than at any point in British electoral history."
          source="Source: Electoral Commission — UK electoral registration statistics 2024."
        />
        </ScrollReveal>

        {/* Sources */}
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
                  {src.name} — {src.dataset} ({src.frequency})
                </a>
              </li>
            ))}
          </ul>
          <p className="font-mono text-xs text-wiah-mid mt-4">
            Turnout figures are percentage of registered electorate. Trust figures are from Ipsos MORI annual survey asking whether respondents trust politicians to tell the truth. Registration figures are Electoral Commission estimates. Voter ID was introduced for the 2024 general election and affected a small but measurable number of votes.
          </p>
          <p className="font-mono text-xs text-wiah-mid mt-4">
            Data updated automatically via GitHub Actions. Last pipeline run:{' '}
            {new Date().toISOString().slice(0, 10)}.
          </p>
        </section>
              <RelatedTopics />
      </main>
    </>
  );
}
