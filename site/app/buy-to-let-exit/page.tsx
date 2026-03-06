'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';

// ── Types ────────────────────────────────────────────────────────────────────

interface LandlordNumbersPoint {
  year: number;
  landlordsMillions: number;
}

interface RentalListingsPoint {
  year: number;
  listingsIndex: number;
}

interface BuyToLetData {
  national: {
    landlordNumbers: {
      timeSeries: LandlordNumbersPoint[];
      latestYear: number;
      latestMillions: number;
      note: string;
    };
    rentalListings: {
      timeSeries: RentalListingsPoint[];
      latestYear: number;
      latestIndex: number;
      note: string;
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

// ── Page ─────────────────────────────────────────────────────────────────────

export default function BuyToLetExitPage() {
  const [data, setData] = useState<BuyToLetData | null>(null);

  useEffect(() => {
    fetch('/data/buy-to-let-exit/buy_to_let.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const landlordSeries: Series[] = data
    ? [{
        id: 'landlords',
        label: 'Private landlords (millions)',
        colour: '#F4A261',
        data: data.national.landlordNumbers.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.landlordsMillions,
        })),
      }]
    : [];

  const listingsSeries: Series[] = data
    ? [{
        id: 'listings',
        label: 'Rental listings index (2020=100)',
        colour: '#E63946',
        data: data.national.rentalListings.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.listingsIndex,
        })),
      }]
    : [];

  const landlordAnnotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: '2020: Section 24 mortgage interest relief removed' },
    { date: new Date(2022, 5, 1), label: '2022: Bank Rate rises push BTL mortgage costs up' },
  ];

  const listingsAnnotations: Annotation[] = [
    { date: new Date(2022, 5, 1), label: '2022: Rental supply begins steep decline' },
    { date: new Date(2024, 5, 1), label: '2024: Renters\u2019 Rights Bill introduced' },
  ];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Buy-to-Let Exit" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Buy-to-Let Exit"
          question="Are Landlords Abandoning the Private Rental Market?"
          finding="Net landlord numbers fell by 140,000 between 2022 and 2025 as mortgage costs, tax changes and regulatory burdens pushed smaller landlords to sell. Private rental supply is contracting fastest in areas with highest tenant demand."
          colour="#F4A261"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              The private rented sector has contracted sharply since 2022. The convergence of three forces &mdash; the phased removal of mortgage interest tax relief under Section 24 (complete from 2020), the sharp rise in Bank Rate from 0.1% to 5.25%, and the regulatory burden of proposed and enacted tenancy reforms &mdash; has made the economics of small-scale residential landlordism significantly less attractive. Net landlord numbers fell from a peak of 2.69 million in 2020 to an estimated 2.52 million in 2025, with the decline concentrated among landlords with one or two properties who cannot absorb rising costs the way portfolio landlords can.
            </p>
            <p>
              The consequence for tenants has been immediate. Rental listings in major UK cities fell 29% between 2020 and 2024 as departing landlords sold properties to owner-occupiers rather than other landlords. Average asking rents rose 9.4% in the year to January 2025 nationally, with London and the South East seeing double-digit increases. The paradox is acute: regulatory changes designed to improve tenant security may, in the short term, be accelerating the supply contraction that makes renting more expensive and competitive. The debate between tenant advocates and landlord representatives about the net effect of the Renters&apos; Rights Bill on supply remains genuinely contested.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-landlords', label: 'Landlord Numbers' },
          { id: 'sec-listings', label: 'Rental Supply' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        {/* Metric cards */}
        <ScrollReveal>
          <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Net landlord decline (2022&ndash;2025)"
              value="140,000"
              unit=""
              direction="down"
              polarity="up-is-bad"
              changeText="Selling faster than entering &middot; Section 24 tax change main driver"
              sparklineData={[2.66, 2.68, 2.69, 2.64, 2.58, 2.54, 2.53, 2.52]}
              href="#sec-landlords"
            />
            <MetricCard
              label="Buy-to-let mortgage deals available"
              value="3,500"
              unit=""
              direction="down"
              polarity="up-is-good"
              changeText="Down from 6,200 at peak 2022 &middot; Higher rates forcing exits"
              sparklineData={[2.1, 3.2, 4.8, 6.2, 5.4, 4.8, 4.2, 3.8, 3.5]}
              href="#sec-landlords"
            />
            <MetricCard
              label="Private rental listings vs 2020"
              value="-29%"
              unit=""
              direction="down"
              polarity="up-is-bad"
              changeText="Fewer properties to rent &middot; Rents rising as supply shrinks"
              sparklineData={[100, 92, 84, 78, 71]}
              href="#sec-landlords"
            />
          </div>
        </ScrollReveal>

        {/* Charts */}
        <ScrollReveal>
          <section id="sec-landlords" className="mb-12">
            <LineChart
              title="Estimated private landlords, UK, 2018&ndash;2025"
              subtitle="Total number of private residential landlords (millions). Peaked in 2020 then declined as tax changes and mortgage costs increased. Decline concentrated among small-portfolio landlords."
              series={landlordSeries}
              annotations={landlordAnnotations}
              yLabel="Millions"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-listings" className="mb-12">
            <LineChart
              title="Private rental listings in major cities, 2020&ndash;2024 (index: 2020=100)"
              subtitle="Available rental listings on major property portals in UK cities, indexed to 2020. A falling index means fewer properties available to rent. Down 29% from 2020 baseline."
              series={listingsSeries}
              annotations={listingsAnnotations}
              yLabel="Index (2020=100)"
            />
          </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="What&apos;s improving"
            value="Renters&apos; Rights Bill 2024"
            unit=""
            description="The Renters&apos; Rights Bill 2024 strengthens tenant protections while abolishing Section 21 no-fault evictions. Some argue increased protections reduce landlord exits by improving long-term tenancy stability; others argue they accelerate exits by reducing landlord control. Build-to-rent developments &mdash; professionally managed at scale &mdash; are growing rapidly and may offset some of the small-landlord exit. 50,000 build-to-rent homes are currently under construction nationally."
            source="Source: British Property Federation &mdash; Build to Rent census 2024; NRLA landlord confidence survey Q4 2024."
          />
        </ScrollReveal>

        {/* Sources */}
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
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
