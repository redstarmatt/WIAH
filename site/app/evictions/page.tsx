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

interface EvictionsData {
  timeSeries: Array<{ date: string; section21Notices: number; possessionClaims: number }>;
  homelessnessTimeSeries: Array<{ date: string; householdsEvicted: number }>;
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

export default function EvictionsPage() {
  const [data, setData] = useState<EvictionsData | null>(null);

  useEffect(() => {
    fetch('/data/evictions/evictions.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const noticeSeries: Series[] = data
    ? [
        {
          id: 'section21',
          label: 'Section 21 notices served',
          colour: '#E63946',
          data: data.timeSeries.map(d => ({ date: yearToDate(d.date), value: d.section21Notices })),
        },
        {
          id: 'possession',
          label: 'Landlord possession claims',
          colour: '#F4A261',
          data: data.timeSeries.map(d => ({ date: yearToDate(d.date), value: d.possessionClaims })),
        },
      ]
    : [];

  const homelessnessSeries: Series[] = data
    ? [
        {
          id: 'evicted-homeless',
          label: 'Households made homeless after eviction',
          colour: '#E63946',
          data: data.homelessnessTimeSeries.map(d => ({ date: yearToDate(d.date), value: d.householdsEvicted })),
        },
      ]
    : [];

  return (
    <>
      <TopicNav topic="Evictions" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Evictions"
          question="How Many Renters Are Being Forced Out of Their Homes?"
          finding="Section 21 &ldquo;no-fault&rdquo; eviction notices have risen sharply since 2021 &mdash; landlords served 25,000&plus; notices in 2023 &mdash; and court-ordered evictions are at their highest since 2017, disproportionately affecting low-income renters and families with children in the private rented sector."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              Section 21 of the Housing Act 1988 &mdash; the &ldquo;no-fault&rdquo; eviction power &mdash; became the leading cause of homelessness in England by the mid-2010s. Landlords were granted over 25,000 Section 21 possession orders in 2023, but Crisis and Shelter estimate the true figure affected is 60,000&ndash;75,000 households annually, as many tenants comply with notices before proceedings reach court. The post-COVID moratorium surge was severe: when the 2020 moratorium lifted in May 2021, notices accelerated sharply, coinciding with rising buy-to-let mortgage rates that pushed 19&percnt; of landlords to reduce their portfolios &mdash; triggering no-fault evictions to sell with vacant possession. Rent affordability deteriorated simultaneously: average private sector rents rose 9.2&percnt; in the year to January 2024, while the Local Housing Allowance was frozen for four years, leaving a widening gap between benefit levels and market rents.
            </p>
            <p>
              The burden falls hardest on families and renters in high-cost areas. DLUHC data shows 58&percnt; of households accepted as homeless following Section 21 evictions had dependent children. In London, Section 21 accounted for 29&percnt; of all statutory homelessness acceptances in 2023, versus 19&percnt; nationally &mdash; placing acute pressure on already overwhelmed temporary accommodation services. Black and Asian renters are disproportionately represented in the private rented sector and face additional barriers when seeking alternative accommodation. The Renters&apos; Rights Bill progressing through Parliament in 2024&ndash;25 commits to abolishing Section 21, alongside rights to challenge unfair rent increases and access to a private renters&apos; ombudsman &mdash; the biggest reform to renter protections since 1988.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Overview' },
          { id: 'sec-notices', label: 'Notices &amp; Claims' },
          { id: 'sec-homeless', label: 'Homelessness' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Section 21 notices served (2023)"
              value="25,000+"
              direction="up"
              polarity="up-is-bad"
              changeText="Up from 8,000 during COVID moratorium &middot; At highest level since 2017"
              sparklineData={[18000, 20000, 19000, 17000, 8000, 16000, 22000, 25000]}
              source="Ministry of Justice &middot; Landlord possession statistics 2023"
              href="#sec-notices"/>
            <MetricCard
              label="Landlord possession claims"
              value="28,400"
              direction="up"
              polarity="up-is-bad"
              changeText="Up from 8,000 in 2020 &middot; Highest since 2017"
              sparklineData={[21000, 22000, 23000, 24000, 8000, 18000, 25000, 28400]}
              source="Ministry of Justice &middot; Civil justice statistics 2023"
              href="#sec-homeless"/>
            <MetricCard
              label="Households made homeless via Section 21"
              value="24,000"
              unit="/yr"
              direction="up"
              polarity="up-is-bad"
              changeText="Up from 12,000 in 2015 &middot; 58&percnt; have dependent children"
              sparklineData={[12000, 13500, 15200, 17100, 18400, 7200, 14600, 20300, 24000]}
              source="DLUHC &middot; Statutory homelessness statistics 2023"
              href="#sec-homeless"/>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-notices" className="mb-12">
            {noticeSeries.length > 0 ? (
              <LineChart
                title="Section 21 notices and landlord possession claims, 2016&ndash;2023"
                subtitle="Annual court-stage figures. Section 21 (&lsquo;no-fault&rsquo;) notices in red; all landlord possession claims in amber. The 2020 dip reflects the COVID evictions moratorium."
                series={noticeSeries}
                yLabel="Notices / claims (number)"
                source={{
                  name: 'Ministry of Justice',
                  dataset: 'Landlord and tenant possession statistics',
                  frequency: 'quarterly',
                  url: 'https://www.gov.uk/government/collections/landlord-and-tenant-act-1954-statistics',
                }}
              />
            ) : (
              <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
            )}
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-homeless" className="mb-12">
            {homelessnessSeries.length > 0 ? (
              <LineChart
                title="Households accepted as homeless following eviction, 2015&ndash;2024"
                subtitle="Households accepted by local authorities as homeless where a Section 21 or equivalent eviction was the primary cause. Excludes households not meeting the statutory threshold."
                series={homelessnessSeries}
                yLabel="Households (number)"
                source={{
                  name: 'DLUHC',
                  dataset: 'Statutory homelessness statistics',
                  frequency: 'quarterly',
                  url: 'https://www.gov.uk/government/collections/homelessness-statistics',
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
            value="Renters&apos; Rights Bill"
            description="The Renters&apos; Rights Bill commits to abolishing Section 21 &lsquo;no-fault&rsquo; evictions &mdash; the biggest reform to renter protections in a generation. Legislation progressed through Parliament in 2024&ndash;25, alongside new measures giving tenants the right to keep pets, challenge unfair rent increases, and access a private renters&apos; ombudsman."
            source="Ministry of Housing, Communities &amp; Local Government &middot; Renters&apos; Rights Bill 2024"
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
