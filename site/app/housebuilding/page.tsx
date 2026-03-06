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
          question="Why Isn't Britain Building Enough Homes?"
          finding="England needs 300,000 new homes per year. It has not built this many since the 1960s. Just 234,000 homes were completed in 2022/23. Planning permission grants fell 14% in 2023. Labour has set a target of 1.5 million homes in 5 years — but the planning system, skills shortage, and viability have blocked every previous government."
          colour="#F4A261"
          preposition="in"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>England completed 234,000 new homes in 2022/23, against a government target of 300,000 per year that has not been met since the 1960s. The gap between aspiration and delivery is structural rather than cyclical: planning permissions granted for residential development fell from 325,000 in 2018/19 to 256,000 in 2022/23, a decline of 21% in four years. Labour's 2024 manifesto committed to 1.5 million homes over five years — an average of 300,000 annually — but the arithmetic requires reversing a generation of underbuilding. Comparable European economies do not face the same constraint: Germany completes around 375,000 homes per year, France approximately 470,000. Britain is, in theory, among the most permissive in granting outline planning consent; in practice, the translation from permission to completion is uniquely inefficient.</p>
            <p>The roots of the shortfall run to the 1980s. The Right to Buy scheme, introduced under the Housing Act 1980, has sold roughly two million council homes since then; local authority completions collapsed from 100,000 per year in the 1970s to around 7,000 today. Housing associations build approximately 55,000 homes annually, nowhere near sufficient to offset the withdrawal of state-funded building. The private sector is also constrained in ways that policy has tolerated. Britain's ten largest housebuilders hold an estimated 1.3 million plots with extant planning permission but have not yet built on them — a consequence of business models calibrated to managed supply rather than volume. The construction industry faces a skills shortage of around 100,000 unfilled vacancies. Meanwhile, viability assessments have allowed developers to argue that schemes are not financially viable at the affordable housing proportions set by local plans, legally permitting them to reduce — sometimes to zero — the affordable contribution that planning conditions require.</p>
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
              changeText="2022/23 · Target: 300K/year · Not met since 1960s · Labour target: 1.5M homes in 5 years"
              sparklineData={[135, 142, 155, 163, 183, 195, 213, 244, 211, 232, 234]}
              onExpand={() => {}}
            />
            <MetricCard
              label="Planning permissions granted (residential)"
              value="256K"
              direction="down"
              polarity="up-is-good"
              changeText="2022/23 · Down 14% from 2018/19 peak · NIMBY objections · Viability assessments blocking delivery"
              sparklineData={[299, 323, 325, 317, 269, 298, 256]}
              onExpand={() => {}}
            />
            <MetricCard
              label="New social/council homes built"
              value="7%"
              direction="down"
              polarity="up-is-good"
              changeText="2022/23 share · Down from 40% in 1970s · Right to Buy sold 2M council homes since 1980 · Housing associations filling gap slowly"
              sparklineData={[15, 14, 12, 11, 10, 9, 8, 8, 7, 7, 7]}
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-completions" className="mb-12">
            <LineChart
              title="New homes completed, England, 2012/13–2022/23"
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
              title="Residential planning permissions, England, 2016/17–2022/23"
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
            <p className="font-mono text-xs text-wiah-mid mt-4">Source: DLUHC — House Building Statistics 2022/23</p>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="What's improving"
            value="1.5M"
            unit="homes targeted by Labour in 5 years — backed by mandatory planning targets and new 'grey belt' land release"
            description="The Labour government's Planning and Infrastructure Bill (2025) reinstates mandatory local planning targets, introduces a new 'grey belt' category releasing low-quality green belt land, and removes the viability loophole that had allowed developers to reduce affordable housing contributions. New development corporations — similar to those that built Milton Keynes and Stevenage — are planned for several areas. Housing associations are being offered £2 billion in guaranteed loans to increase social and affordable completions. Permitted development rights expansions are allowing conversion of commercial buildings to residential more easily. The target of 1.5 million homes over five years would require average annual completions of 300,000."
            source="Source: DLUHC — House Building Statistics 2022/23; Planning and Infrastructure Bill 2025 Impact Assessment."
          />
        </ScrollReveal>

        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            {data?.metadata.sources.map((src, i) => (
              <div key={i}>
                <a href={src.url} target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">
                  {src.name} — {src.dataset}
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
