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

interface HousebuildingData {
  national: {
    completions: {
      timeSeries: Array<{ year: string; completionsThousands: number }>;
      latestYear: string;
      latestThousands: number;
      targetThousands: number;
    };
    planningPermissions: {
      timeSeries: Array<{ year: string; permissionsThousands: number }>;
      latestYear: string;
      latestThousands: number;
    };
    byTenureType: Array<{ tenure: string; pct: number }>;
  };
  metadata: {
    sources: Array<{ name: string; dataset: string; url: string; frequency: string }>;
    methodology: string;
    knownIssues: string[];
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function fyToDate(fy: string): Date {
  const start = parseInt(fy.split('/')[0]);
  return new Date(start, 3, 1);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function HousebuildingPage() {
  const [data, setData] = useState<HousebuildingData | null>(null);

  useEffect(() => {
    fetch('/data/housebuilding/housebuilding.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const completionsSeries: Series[] = data
    ? [{
        id: 'completions',
        label: 'Completions (thousands)',
        colour: '#F4A261',
        data: data.national.completions.timeSeries.map(d => ({
          date: fyToDate(d.year),
          value: d.completionsThousands,
        })),
      }]
    : [];

  const completionsAnnotations: Annotation[] = [
    { date: new Date(2020, 3, 1), label: '2020/21: COVID-19' },
  ];

  const permissionsSeries: Series[] = data
    ? [{
        id: 'permissions',
        label: 'Permissions (thousands)',
        colour: '#F4A261',
        data: data.national.planningPermissions.timeSeries.map(d => ({
          date: fyToDate(d.year),
          value: d.permissionsThousands,
        })),
      }]
    : [];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Housebuilding" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Housebuilding"
          question="Why Isn&apos;t Britain Building Enough Homes?"
          finding="England needs 300,000 new homes per year. It has not built this many since the 1960s. Just 234,000 homes were completed in 2022/23. Planning permission grants fell 14% in 2023. Labour has set a target of 1.5 million homes in 5 years &mdash; but the planning system, skills shortage, and viability have blocked every previous government."
          colour="#F4A261"
          preposition="in"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>England completed 234,000 new homes in 2022/23, against a government target of 300,000 per year that has not been met since the 1960s. The gap between aspiration and delivery is structural rather than cyclical: planning permissions granted for residential development fell from 325,000 in 2018/19 to 256,000 in 2022/23, a decline of 21% in four years. Labour&apos;s 2024 manifesto committed to 1.5 million homes over five years &mdash; an average of 300,000 annually &mdash; but the arithmetic requires reversing a generation of underbuilding. Comparable European economies do not face the same constraint: Germany completes around 375,000 homes per year, France approximately 470,000. Britain is, in theory, among the most permissive in granting outline planning consent; in practice, the translation from permission to completion is uniquely inefficient.</p>
            <p>The roots of the shortfall run to the 1980s. The Right to Buy scheme, introduced under the Housing Act 1980, has sold roughly two million council homes since then; local authority completions collapsed from 100,000 per year in the 1970s to around 7,000 today. Housing associations build approximately 55,000 homes annually, nowhere near sufficient to offset the withdrawal of state-funded building. The private sector is also constrained in ways that policy has tolerated. Britain&apos;s ten largest housebuilders hold an estimated 1.3 million plots with extant planning permission but have not yet built on them &mdash; a consequence of business models calibrated to managed supply rather than volume. The construction industry faces a skills shortage of around 100,000 unfilled vacancies. Meanwhile, viability assessments have allowed developers to argue that schemes are not financially viable at the affordable housing proportions set by local plans, legally permitting them to reduce &mdash; sometimes to zero &mdash; the affordable contribution that planning conditions require.</p>
            <p>The Planning and Infrastructure Bill 2025 represents the most significant attempt at structural reform in decades. It reinstates mandatory housing targets for local authorities, releases low-quality green belt land designated as &apos;grey belt&apos; for development, and proposes to close the viability loophole that has eroded affordable housing delivery. New development corporations, modelled on those that delivered Milton Keynes and Stevenage in the post-war period, are planned for several high-growth areas. Government impact assessments suggest the reforms could lift annual completions to between 250,000 and 270,000 by 2030 &mdash; progress, but still short of the 300,000 target. Constraints compound each other: Section 106 agreements and the Community Infrastructure Levy routinely underfund the infrastructure new homes require, and water company capacity has become a binding constraint in parts of the South East. Around 60% of planning appeals are overturned in applicants&apos; favour, exposing the distance between what local plans say and what the planning system actually delivers.</p>
            <p>England&apos;s housebuilding market is dominated by a small number of volume developers whose business model is structurally misaligned with the stated policy objective. Ten major firms&mdash;Barratt, Taylor Wimpey, Persimmon, Vistry, Berkeley, and their peers&mdash;produce roughly 44&percnt; of all new homes. Their profitability depends on selling each unit at the highest achievable price, which means they have no commercial incentive to build at a rate that would meaningfully reduce prices. Build-out rates on large sites are calibrated to local absorption rates, not to housing need. Small builders, who once delivered 40&percnt; of output in 1988, now account for just 12&percnt;, squeezed out by the cost of navigating the planning system, the collapse of development finance after 2008, and the difficulty of competing for land against volume buyers with deeper balance sheets. The construction workforce compounds the problem: an estimated 200,000 vacancies persist across the sector, the post-Brexit reduction in EU workers removed a significant labour supply, and roughly 20&percnt; of the current workforce is over 55 with no adequate pipeline of replacements. The planning system itself favours large urban extensions on greenfield land over the smaller infill sites that SME builders once specialised in, further concentrating output among firms whose incentives point away from the speed and affordability that policy demands.</p>
            <p>The 300,000 homes per year target that dominates housing policy debate has no agreed analytical basis&mdash;it was set politically, and the methodology behind it has been contested since its adoption. Different needs assessments, using different assumptions about household formation, migration, and existing unmet need, produce outputs ranging from 250,000 to 345,000 or higher. Housing completions are measured through local authority building control completion certificates and NHBC warranty inspections, but not all completions pass through either system, creating known gaps in the count. The definition of &ldquo;affordable housing&rdquo; varies across planning conditions, housing association classifications, and government statistics&mdash;a home at 80&percnt; of market rent qualifies as &ldquo;affordable&rdquo; in planning terms but is out of reach for most households in housing need. The land banking debate relies on counting extant planning permissions, but many permitted sites face genuine viability constraints rather than deliberate withholding, making the headline figure of over one million unbuilt plots more ambiguous than it appears. The Planning and Infrastructure Bill&apos;s impact cannot be assessed until secondary regulations are published, and past planning reforms have routinely underdelivered against projections. Private rental sector data remains particularly weak: England has no national register of landlords or tenancies, meaning the total size and composition of the sector is estimated from census and council tax records rather than observed directly.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-completions', label: 'Completions' },
          { id: 'sec-planning', label: 'Planning' },
          { id: 'sec-tenure', label: 'By Builder Type' },
        ]} />

        <ScrollReveal>
          <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="New homes completed (England)"
              value="234K"
              direction="flat"
              polarity="up-is-good"
              changeText="2022/23 &middot; Target: 300K/year &middot; Not met since 1960s &middot; Labour target: 1.5M homes in 5 years"
              sparklineData={[135, 142, 155, 163, 183, 195, 213, 244, 211, 232, 234]}
              onExpand={() => {}}
            />
            <MetricCard
              label="Planning permissions granted (residential)"
              value="256K"
              direction="down"
              polarity="up-is-good"
              changeText="2022/23 &middot; Down 14% from 2018/19 peak &middot; NIMBY objections &middot; Viability assessments blocking delivery"
              sparklineData={[299, 323, 325, 317, 269, 298, 256]}
              onExpand={() => {}}
            />
            <MetricCard
              label="New social/council homes built"
              value="7%"
              direction="down"
              polarity="up-is-good"
              changeText="2022/23 share &middot; Down from 40% in 1970s &middot; Right to Buy sold 2M council homes since 1980 &middot; Housing associations filling gap slowly"
              sparklineData={[15, 14, 12, 11, 10, 9, 8, 8, 7, 7, 7]}
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-completions" className="mb-12">
            <LineChart
              title="New homes completed, England, 2012/13&ndash;2022/23"
              subtitle="Total new dwellings completed per financial year, including private, housing association, and local authority."
              series={completionsSeries}
              annotations={completionsAnnotations}
              yLabel="Completions (thousands)"
              source={{
                name: 'DLUHC',
                dataset: 'House Building: New Build Dwellings',
                frequency: 'quarterly',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-planning" className="mb-12">
            <LineChart
              title="Residential planning permissions, England, 2016/17&ndash;2022/23"
              subtitle="Number of major residential planning permissions granted per financial year."
              series={permissionsSeries}
              yLabel="Permissions (thousands)"
              source={{
                name: 'DLUHC',
                dataset: 'Planning Applications in England',
                frequency: 'quarterly',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-tenure" className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-2">New homes completed by builder type, England, 2022/23</h2>
            <p className="text-sm text-wiah-mid font-mono mb-6">Share of dwellings completed by private enterprise, housing associations, and local authorities.</p>
            {data && (
              <div className="space-y-3">
                {data.national.byTenureType.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-40 text-sm text-wiah-black flex-shrink-0">{item.tenure}</div>
                    <div className="flex-1 bg-wiah-border rounded h-5 overflow-hidden">
                      <div
                        className="h-full rounded"
                        style={{ width: `${(item.pct / 74) * 100}%`, backgroundColor: '#F4A261' }}
                      />
                    </div>
                    <div className="w-16 text-right text-sm font-mono text-wiah-black">{item.pct}%</div>
                  </div>
                ))}
              </div>
            )}
            <p className="font-mono text-xs text-wiah-mid mt-4">Source: DLUHC &mdash; House Building Statistics 2022/23</p>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="What&apos;s improving"
            value="1.5M"
            unit="homes targeted by Labour in 5 years &mdash; backed by mandatory planning targets and new &apos;grey belt&apos; land release"
            description="The Labour government&apos;s Planning and Infrastructure Bill (2025) reinstates mandatory local planning targets, introduces a new &apos;grey belt&apos; category releasing low-quality green belt land, and removes the viability loophole that had allowed developers to reduce affordable housing contributions. New development corporations &mdash; similar to those that built Milton Keynes and Stevenage &mdash; are planned for several areas. Housing associations are being offered &pound;2 billion in guaranteed loans to increase social and affordable completions. Permitted development rights expansions are allowing conversion of commercial buildings to residential more easily. The target of 1.5 million homes over five years would require average annual completions of 300,000."
            source="Source: DLUHC &mdash; House Building Statistics 2022/23; Planning and Infrastructure Bill 2025 Impact Assessment."
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
