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

interface LeaseholdData {
  national: {
    leaseholdProperties: {
      timeSeries: Array<{ year: number; millionsLeasehold: number }>;
    };
    groundRentComplaints: {
      timeSeries: Array<{ year: number; complaints: number }>;
    };
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

export default function LeaseholdPage() {
  const [data, setData] = useState<LeaseholdData | null>(null);

  useEffect(() => {
    fetch('/data/leasehold/leasehold.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const leaseholdSeries: Series[] = data
    ? [{
        id: 'leasehold-properties',
        label: 'Leasehold properties (millions)',
        colour: '#F4A261',
        data: data.national.leaseholdProperties.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.millionsLeasehold,
        })),
      }]
    : [];

  const complaintsSeries: Series[] = data
    ? [{
        id: 'ground-rent-complaints',
        label: 'Ground rent complaints',
        colour: '#E63946',
        data: data.national.groundRentComplaints.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.complaints,
        })),
      }]
    : [];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Leasehold" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Leasehold"
          question="Do You Really Own Your Home If You&apos;re a Leaseholder?"
          finding="Nearly 5 million homes in England and Wales are held on a leasehold basis &mdash; a feudal tenure system that gives freeholders the power to charge escalating ground rents, impose permission fees, and ultimately forfeit properties for arrears as small as &pound;350. Ground rent complaints to the Property Tribunal have tripled since 2015."
          colour="#F4A261"
          preposition="with"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Approximately 4.98 million residential properties in England and Wales are held on a leasehold basis &mdash; roughly one in five homes. From the mid-2000s, major housebuilders began selling new-build houses on leasehold terms, selling the freehold to investment companies that then charged escalating ground rents; by 2017 an estimated 100,000 houses had doubling ground rent clauses meaning rents rising from &pound;250 to &pound;8,000 within 50 years. Beyond ground rent, leaseholders face permission fees for alterations (&pound;250&ndash;&pound;500 per request), insurance commissions marked up 30&ndash;50&percnt;, and forfeiture &mdash; the freeholder&apos;s right to reclaim the property for arrears as small as &pound;350. The Leasehold Reform (Ground Rent) Act 2022 capped new lease ground rents at peppercorn, and the Leasehold and Freehold Reform Act 2024 bans new leasehold houses, extends lease extensions to 990 years, and removes marriage value &mdash; but does not cap existing ground rents or introduce commonhold as the default tenure.</p>
            <p>The burden falls disproportionately on first-time buyers and younger households. In London, where 36&percnt; of homes are leasehold, average service charges reached &pound;2,880 per year in 2023 with some developments charging over &pound;8,000. Shared ownership properties &mdash; designed as an affordable entry to ownership &mdash; are invariably leasehold, meaning the households least able to absorb costs face the most complex tenure arrangements. Ethnic minority households and those on lower incomes are over-represented among leasehold buyers in urban areas, reflecting the concentration of new-build leasehold in city centres marketed to first-time buyers.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-properties', label: 'Leasehold Count' },
          { id: 'sec-complaints', label: 'Complaints' },
        ]} />

        <ScrollReveal>
          <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Leasehold homes in England &amp; Wales"
              value="4.98M"
              direction="up"
              polarity="up-is-bad"
              changeText="2024 &middot; ~1 in 5 homes &middot; 36% of London homes are leasehold &middot; Rising due to new-build flats"
              sparklineData={[4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 4.9, 4.98]}
              onExpand={() => {}}
            />
            <MetricCard
              label="Ground rent &amp; service charge complaints"
              value="10,800"
              direction="up"
              polarity="up-is-bad"
              changeText="2024 &middot; Tripled since 2015 &middot; Property Tribunal &amp; Ombudsman cases &middot; True disputes far higher"
              sparklineData={[3200, 3800, 5100, 6400, 7200, 8100, 9300, 10200, 10800]}
              onExpand={() => {}}
            />
            <MetricCard
              label="Average London service charge"
              value="&pound;2,880"
              direction="up"
              polarity="up-is-bad"
              changeText="Per year &middot; 2023 &middot; Some developments over &pound;8,000/yr &middot; Charges rising faster than inflation"
              sparklineData={[2100, 2200, 2350, 2450, 2550, 2680, 2790, 2880]}
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-properties" className="mb-12">
            <LineChart
              title="Leasehold residential properties, England &amp; Wales, 2015&ndash;2024"
              subtitle="Total number of residential properties held on a leasehold basis (millions)."
              series={leaseholdSeries}
              yLabel="Millions"
              source={{
                name: 'DLUHC / HM Land Registry',
                dataset: 'Leasehold Dwellings in England',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-complaints" className="mb-12">
            <LineChart
              title="Ground rent and leasehold complaints, 2015&ndash;2024"
              subtitle="Annual complaints to the Property Tribunal and Property Ombudsman regarding ground rent, service charges, and lease terms."
              series={complaintsSeries}
              yLabel="Complaints"
              source={{
                name: 'First-Tier Tribunal (Property Chamber)',
                dataset: 'Annual Statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="What&apos;s changing"
            value="&pound;0"
            unit="ground rent on all new leases since June 2022"
            description="The Leasehold Reform (Ground Rent) Act 2022 capped ground rent on new leases at a peppercorn &mdash; effectively zero. The Leasehold and Freehold Reform Act 2024 bans new leasehold houses, extends standard lease extensions to 990 years, and removes the marriage value calculation that inflated extension costs. The Law Commission has recommended commonhold &mdash; the system used in most countries &mdash; as the long-term replacement for leasehold. The CMA secured commitments from developers to remove doubling ground rent clauses from existing contracts."
            source="Source: DLUHC &mdash; Leasehold Dwellings 2024; HM Land Registry &mdash; Title Registrations; First-Tier Tribunal (Property Chamber)."
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
