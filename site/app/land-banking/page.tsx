'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import PositiveCallout from '@/components/PositiveCallout';

// ── Types ────────────────────────────────────────────────────────────────────

interface LandBankingData {
  timeSeries: Array<{ date: string; permissionsGranted: number; startsThousands: number; completionsThousands: number }>;
  buildStartLagTimeSeries: Array<{ date: string; avgWeeksToStart: number }>;
  metadata: {
    sources: { name: string; dataset: string; url: string; frequency: string }[];
    methodology: string;
    knownIssues: string[];
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: string): Date {
  return new Date(parseInt(y), 5, 1);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function LandBankingPage() {
  const [data, setData] = useState<LandBankingData | null>(null);

  useEffect(() => {
    fetch('/data/land-banking/land_banking.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const permissionSeries: Series[] = data
    ? [
        {
          id: 'permissions',
          label: 'Planning permissions granted (thousands)',
          colour: '#264653',
          data: data.timeSeries.map(d => ({ date: yearToDate(d.date), value: d.permissionsGranted })),
        },
        {
          id: 'starts',
          label: 'Homes started (thousands)',
          colour: '#F4A261',
          data: data.timeSeries.map(d => ({ date: yearToDate(d.date), value: d.startsThousands })),
        },
        {
          id: 'completions',
          label: 'Homes completed (thousands)',
          colour: '#2A9D8F',
          data: data.timeSeries.map(d => ({ date: yearToDate(d.date), value: d.completionsThousands })),
        },
      ]
    : [];

  const lagSeries: Series[] = data
    ? [
        {
          id: 'lag',
          label: 'Average weeks from permission to build start',
          colour: '#F4A261',
          data: data.buildStartLagTimeSeries.map(d => ({ date: yearToDate(d.date), value: d.avgWeeksToStart })),
        },
      ]
    : [];

  return (
    <>
      <TopicNav topic="Land Banking" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Land Banking"
          question="Are Developers Sitting on Land Instead of Building Homes?"
          finding="The UK&apos;s top 10 housebuilders hold planning permission for over 1 million homes they have not yet started building &mdash; a phenomenon known as &ldquo;land banking&rdquo; that critics say is a structural barrier to solving the housing crisis while developers maximise profit by rationing supply."
          colour="#F4A261"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              England granted 474,000 planning permissions in 2023 but started only 158,000 new homes &mdash; a conversion rate of just 33%. The gap between permissions and starts has widened every year since 2015, from 70,000 unbuilt permissions to over 310,000. The business model of the major listed housebuilders &mdash; Barratt, Taylor Wimpey, Persimmon, Berkeley &mdash; is explicitly designed around margin rather than output: annual reports show these companies target operating margins of 18&ndash;26% and slow construction during downturns to protect margins rather than sustain completions. Lichfields Planning Consultancy data shows the average gap between permission and build start reached 3.4 years in 2023, up from 1.6 years in 2015, and the ten largest developers hold a combined land bank of approximately 1.06 million plots. DLUHC&apos;s 2023 build-out review found two-thirds of slow sites were commercially held back rather than facing genuine infrastructure barriers.
            </p>
            <p>
              The burden of the housing shortfall falls hardest on younger people, renters, and those in high-demand areas. The South East, London, and East of England consistently show the largest gaps between permissions and starts &mdash; precisely the areas with the highest prices and greatest need. First-time buyer numbers have fallen from 400,000 in 2006 to around 300,000 in 2023, with the average first-time buyer age rising from 29 to 34, and ethnic minorities are disproportionately concentrated in the private rented sector where supply constraints drive rent inflation.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Overview' },
          { id: 'sec-permissions', label: 'Permissions vs Builds' },
          { id: 'sec-lag', label: 'Build-Start Lag' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Unbuilt homes with planning permission (top 10 builders)"
              value="1M+"
              direction="up"
              polarity="up-is-bad"
              changeText="Up from ~650,000 in 2016 &middot; 4+ years of supply at current build rate"
              sparklineData={[650, 700, 750, 800, 850, 900, 950, 1000]}
              source="Lichfields &middot; From Permission to Completion 2023"
              onExpand={() => {}}
            />
            <MetricCard
              label="Average gap between permission and build start"
              value="3.4"
              unit="years"
              direction="up"
              polarity="up-is-bad"
              changeText="Up from 1.6 years in 2015 &middot; 75% of permissions not started within 3 years"
              sparklineData={[1.6, 1.9, 2.1, 2.4, 2.6, 2.9, 3.1, 3.4]}
              source="Lichfields &middot; Build-out rate analysis 2023"
              onExpand={() => {}}
            />
            <MetricCard
              label="Housebuilder profit margins (top 5)"
              value="18&ndash;26%"
              direction="flat"
              polarity="up-is-bad"
              changeText="Consistently 18&ndash;26% &middot; Industry target: margin over volume"
              sparklineData={[18, 20, 22, 24, 25, 26, 23, 21]}
              source="Company annual reports &middot; Barratt, Taylor Wimpey, Persimmon 2023"
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-permissions" className="mb-12">
            {permissionSeries.length > 0 ? (
              <LineChart
                title="Planning permissions granted vs homes started vs completions, 2010&ndash;2024"
                subtitle="All figures in thousands. The widening gap between permissions (dark) and starts (amber) illustrates the land banking effect. Completions (green) lag starts by 12&ndash;24 months."
                series={permissionSeries}
                yLabel="Homes (thousands)"
                source={{
                  name: 'DLUHC',
                  dataset: 'House building: new build dwellings (live tables)',
                  frequency: 'quarterly',
                  url: 'https://www.gov.uk/government/statistical-data-sets/live-tables-on-house-building',
                }}
              />
            ) : (
              <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
            )}
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-lag" className="mb-12">
            {lagSeries.length > 0 ? (
              <LineChart
                title="Average time from planning permission to build start, 2015&ndash;2024"
                subtitle="Average weeks from grant of detailed planning permission to commencement on site, for major residential schemes in England. Rising delay signals increasing strategic land holding."
                series={lagSeries}
                yLabel="Weeks"
                source={{
                  name: 'Lichfields Planning Consultancy',
                  dataset: 'From Permission to Completion',
                  frequency: 'annual',
                  url: 'https://lichfields.uk/content/insights/from-permission-to-completion',
                }}
              />
            ) : (
              <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
            )}
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="What is changing"
            value="&ldquo;Use it or lose it&rdquo;"
            description="The Planning and Infrastructure Bill (2025) proposes &ldquo;use it or lose it&rdquo; powers enabling councils to compulsorily purchase land where developers sit on permissions &mdash; potentially the most significant reform to development pressure since the 1947 Town and Country Planning Act. The Bill also proposes mandatory build-out reporting and new powers to issue completion notices."
            source="Ministry of Housing, Communities &amp; Local Government &middot; Planning and Infrastructure Bill 2025"
          />
        </ScrollReveal>

        <section className="border-t border-wiah-border pt-8 mt-12">
          <h2 className="text-lg font-bold text-wiah-black mb-4">Sources &amp; methodology</h2>
          <div className="text-sm text-wiah-mid space-y-2">
            {data?.metadata.sources.map((src, i) => (
              <p key={i}>
                <strong>{src.name}.</strong> <em>{src.dataset}</em>. {src.frequency} &mdash;&nbsp;
                <a href={src.url} target="_blank" rel="noopener noreferrer" className="underline text-wiah-blue hover:no-underline">
                  {src.url}
                </a>
              </p>
            ))}
          </div>
          <p className="text-sm text-wiah-mid mt-6">{data?.metadata.methodology}</p>
          {data?.metadata.knownIssues && data.metadata.knownIssues.length > 0 && (
            <div className="mt-6 p-4 bg-wiah-light rounded">
              <p className="font-bold text-wiah-black mb-2">Known issues:</p>
              <ul className="text-sm text-wiah-mid space-y-1 list-disc list-inside">
                {data.metadata.knownIssues.map((issue, i) => (
                  <li key={i}>{issue}</li>
                ))}
              </ul>
            </div>
          )}
        </section>
      </main>
    </>
  );
}
