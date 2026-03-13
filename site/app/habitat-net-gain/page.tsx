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

interface BngPermissionPoint {
  year: number;
  permissions: number;
}

interface BiodiversityUnitPoint {
  year: number;
  units: number;
}

interface HabitatHectarePoint {
  year: number;
  hectares: number;
}

interface CreditPricePoint {
  year: number;
  priceGBP: number;
}

interface LocalAuthorityReadinessPoint {
  year: number;
  percentReady: number;
}

interface HabitatNetGainData {
  bngPermissions: BngPermissionPoint[];
  biodiversityUnitsTraded: BiodiversityUnitPoint[];
  habitatCreatedHectares: HabitatHectarePoint[];
  creditPricePerUnit: CreditPricePoint[];
  localAuthorityReadiness: LocalAuthorityReadinessPoint[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 0, 1);
}

function sparkFrom(arr: number[], n = 10) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function HabitatNetGainPage() {
  const [data, setData] = useState<HabitatNetGainData | null>(null);

  useEffect(() => {
    fetch('/data/habitat-net-gain/habitat_net_gain.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const permissionsSeries: Series[] = data
    ? [{
        id: 'permissions',
        label: 'Planning permissions with BNG conditions',
        colour: '#2A9D8F',
        data: data.bngPermissions.map(d => ({
          date: yearToDate(d.year),
          value: d.permissions,
        })),
      }]
    : [];

  const permissionsAnnotations: Annotation[] = [
    { date: new Date(2021, 10, 1), label: '2021: Environment Act passes' },
    { date: new Date(2024, 1, 1), label: '2024: Mandatory BNG (major sites)' },
    { date: new Date(2025, 1, 1), label: '2025: Mandatory BNG (small sites)' },
  ];

  const unitsSeries: Series[] = data
    ? [{
        id: 'units-traded',
        label: 'Biodiversity units traded (annual)',
        colour: '#264653',
        data: data.biodiversityUnitsTraded.map(d => ({
          date: yearToDate(d.year),
          value: d.units,
        })),
      }]
    : [];

  const unitsAnnotations: Annotation[] = [
    { date: new Date(2024, 1, 1), label: '2024: Statutory market opens' },
  ];

  const hectaresSeries: Series[] = data
    ? [{
        id: 'hectares',
        label: 'Habitat created or restored (hectares)',
        colour: '#2A9D8F',
        data: data.habitatCreatedHectares.map(d => ({
          date: yearToDate(d.year),
          value: d.hectares,
        })),
      },
      {
        id: 'credit-price',
        label: 'Median credit price (£k per unit)',
        colour: '#F4A261',
        data: data.creditPricePerUnit.map(d => ({
          date: yearToDate(d.year),
          value: d.priceGBP / 1000,
        })),
      }]
    : [];

  const hectaresAnnotations: Annotation[] = [
    { date: new Date(2023, 0, 1), label: '2023: First large habitat banks operational' },
  ];

  // ── Derived metrics ────────────────────────────────────────────────────

  const latestPermissions = data?.bngPermissions[data.bngPermissions.length - 1];
  const prevPermissions = data?.bngPermissions[data.bngPermissions.length - 2];

  const latestUnits = data?.biodiversityUnitsTraded[data.biodiversityUnitsTraded.length - 1];

  const latestHectares = data?.habitatCreatedHectares[data.habitatCreatedHectares.length - 1];
  const prevHectares = data?.habitatCreatedHectares[data.habitatCreatedHectares.length - 2];

  const hectaresChange = latestHectares && prevHectares
    ? Math.round(((latestHectares.hectares - prevHectares.hectares) / prevHectares.hectares) * 100)
    : 44;

  const permissionsChange = latestPermissions && prevPermissions
    ? Math.round(((latestPermissions.permissions - prevPermissions.permissions) / prevPermissions.permissions) * 100)
    : 42;

  return (
    <>
      <TopicNav topic="Biodiversity Net Gain" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Biodiversity Net Gain"
          question="Is Biodiversity Net Gain Delivering for Nature?"
          finding="Mandatory biodiversity net gain came into force in February 2024, requiring a 10% net improvement in biodiversity value for all major planning applications. Over 12,400 permissions have now applied the standard, and 8,450 hectares of habitat have been created or restored through BNG obligations — but serious questions remain about quality, verification, and whether offsite credits truly compensate for local nature loss."
          colour="#2A9D8F"
          preposition="with"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>England&apos;s biodiversity net gain policy is one of the most ambitious attempts anywhere in the world to price nature into the development process. Since February 2024, every major planning application in England must demonstrate that it will leave biodiversity in a measurably better state than before development began — a minimum 10% net gain measured using the DEFRA biodiversity metric. Small sites followed in February 2025. The result is a new market: developers who cannot achieve the 10% gain on-site can purchase biodiversity units from landowners who create or restore habitat elsewhere. Over 38,000 biodiversity units have now been traded, habitat banks are emerging across the country, and a statutory register administered by Natural England tracks obligations and outcomes.</p>
            <p>The scale of uptake is genuinely encouraging. Over 12,400 planning permissions have applied mandatory BNG conditions, up {permissionsChange}% in the past year alone. Some 8,450 hectares of new or restored habitat are now under 30-year management plans secured through BNG — equivalent to roughly 12,000 football pitches. Land managers in marginal agricultural areas are finding that biodiversity credits can offer a more reliable income stream than conventional farming, creating new economic incentives for nature recovery that did not exist five years ago. Median credit prices have risen from around £15,000 per unit in 2021 to £42,000 in 2025, reflecting strong demand and the genuine cost of habitat creation and long-term management.</p>
            <p>But the policy faces real structural challenges. Local planning authorities, many of which lost ecologists during a decade of austerity, are struggling to assess BNG applications competently — only 78% report having adequate capacity. The quality of habitat created through offsite credits is contested: ecologists warn that newly planted hedgerows and species-poor grassland cannot compensate for the loss of mature, irreplaceable habitats like ancient woodland or species-rich meadows. The 30-year management obligation is a significant commitment, but enforcement mechanisms are untested, and there is no precedent for monitoring thousands of small habitat sites over decades. Perhaps most fundamentally, BNG addresses only biodiversity loss caused by the planning system — it does nothing about agricultural intensification, water pollution, or air quality, which together account for the vast majority of nature decline. It is a necessary intervention, but it is not sufficient on its own.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-permissions', label: 'BNG permissions' },
          { id: 'sec-market', label: 'Unit market' },
          { id: 'sec-habitat', label: 'Habitat created' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Planning permissions with BNG"
            value={latestPermissions ? latestPermissions.permissions.toLocaleString() : '12,400'}
            unit="2024/25"
            direction="up"
            polarity="up-is-good"
            changeText={`+${permissionsChange}% year-on-year · mandatory from Feb 2024`}
            sparklineData={
              data ? sparkFrom(data.bngPermissions.map(d => d.permissions)) : []
            }
            source="Natural England — BNG Statistics, Q4 2025"
            href="#sec-permissions"
          />
          <MetricCard
            label="Biodiversity units traded"
            value={latestUnits ? latestUnits.units.toLocaleString() : '38,000'}
            unit="annual"
            direction="up"
            polarity="up-is-good"
            changeText="statutory market from 2024 · median price £42k per unit"
            sparklineData={
              data ? sparkFrom(data.biodiversityUnitsTraded.map(d => d.units)) : []
            }
            source="Natural England / Environment Bank, 2025"
            href="#sec-market"
          />
          <MetricCard
            label="Habitat created or restored"
            value={latestHectares ? latestHectares.hectares.toLocaleString() : '8,450'}
            unit="hectares"
            direction="up"
            polarity="up-is-good"
            changeText={`+${hectaresChange}% year-on-year · under 30-year management plans`}
            sparklineData={
              data ? sparkFrom(data.habitatCreatedHectares.map(d => d.hectares)) : []
            }
            source="DEFRA — Biodiversity Metric Outcomes, 2025"
            href="#sec-habitat"
          />
        </div>

        {/* Chart 1: BNG planning permissions */}
        <ScrollReveal>
          <div id="sec-permissions" className="mb-12">
            <LineChart
              series={permissionsSeries}
              annotations={permissionsAnnotations}
              title="Planning permissions with biodiversity net gain conditions, England, 2019–2025"
              subtitle="Annual permissions with mandatory or voluntary BNG conditions. Mandatory for major sites from Feb 2024, small sites from Feb 2025."
              yLabel="Permissions"
              source={{
                name: 'Natural England',
                dataset: 'Biodiversity Net Gain Statistics',
                frequency: 'quarterly',
                url: 'https://www.gov.uk/government/collections/biodiversity-net-gain',
                date: 'Q4 2025',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 2: Biodiversity units traded */}
        <ScrollReveal>
          <div id="sec-market" className="mb-12">
            <LineChart
              series={unitsSeries}
              annotations={unitsAnnotations}
              title="Biodiversity units traded in the market, England, 2019–2025"
              subtitle="Annual statutory and voluntary biodiversity unit transactions. Market growing rapidly since mandatory requirement."
              yLabel="Units traded"
              source={{
                name: 'Natural England / Environment Bank',
                dataset: 'Biodiversity unit market transactions',
                frequency: 'quarterly',
                url: 'https://www.environmentbank.com',
                date: 'Jan 2026',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 3: Habitat created & credit prices */}
        <ScrollReveal>
          <div id="sec-habitat" className="mb-12">
            <LineChart
              series={hectaresSeries}
              annotations={hectaresAnnotations}
              title="Habitat created or restored through BNG & median credit prices, 2019–2025"
              subtitle="Hectares of new/restored habitat under 30-year management plans (green) and median biodiversity credit price in thousands (amber)."
              yLabel="Hectares / £k per unit"
              source={{
                name: 'DEFRA / Environment Bank',
                dataset: 'Biodiversity Metric Outcomes & Market Data',
                frequency: 'annual',
                url: 'https://www.gov.uk/guidance/biodiversity-net-gain',
                date: 'Feb 2026',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="New income streams for nature-positive land management"
            value="8,450 hectares"
            description="Biodiversity net gain has created a genuine economic incentive for nature recovery. Land managers in marginal agricultural areas are finding that biodiversity credits — at a median price of £42,000 per unit — can offer more reliable income than conventional farming. Over 8,450 hectares of habitat are now under 30-year management plans secured through BNG obligations, with habitat banks emerging as a new asset class. While quality and additionality concerns remain, the policy has demonstrably changed the economic calculus around land use in ways that no previous conservation policy achieved."
            source="Source: Natural England — BNG Register, Q4 2025. DEFRA — Biodiversity Metric Outcomes Monitoring, 2025."
          />
        </ScrollReveal>

        {/* Sources & Methodology */}
        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <div className="space-y-2">
              <p>
                <a href="https://www.gov.uk/government/collections/biodiversity-net-gain" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Natural England — Biodiversity Net Gain Statistics</a> — planning permission and register data. Retrieved Feb 2026.
              </p>
              <p>
                <a href="https://www.gov.uk/guidance/biodiversity-net-gain" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DEFRA — Biodiversity Metric Outcomes Monitoring</a> — habitat creation and restoration data. Retrieved Feb 2026.
              </p>
              <p>
                <a href="https://www.environmentbank.com" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Environment Bank / Habitat Bank Registry</a> — market transaction and credit price data. Retrieved Jan 2026.
              </p>
              <p>All figures are for England unless otherwise stated. Pre-2024 data includes voluntary BNG adoptions only. Mandatory requirement commenced February 2024 for major developments, February 2025 for small sites. Credit prices are median transaction prices and vary significantly by habitat type and geography. Trend data uses the most recent available release at time of publication.</p>
            </div>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
