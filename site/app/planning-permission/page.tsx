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

interface PlanningPermissionData {
  timeSeries: Array<{ date: string; permissionsThousands: number; completionsThousands: number; backlogThousands: number }>;
  staffingTimeSeries: Array<{ date: string; staffingIndex: number }>;
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

export default function PlanningPermissionPage() {
  const [data, setData] = useState<PlanningPermissionData | null>(null);

  useEffect(() => {
    fetch('/data/planning-permission/planning_permission.json')
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
          data: data.timeSeries.map(d => ({ date: yearToDate(d.date), value: d.permissionsThousands })),
        },
        {
          id: 'completions',
          label: 'Homes completed (thousands)',
          colour: '#2A9D8F',
          data: data.timeSeries.map(d => ({ date: yearToDate(d.date), value: d.completionsThousands })),
        },
      ]
    : [];

  const staffingSeries: Series[] = data
    ? [
        {
          id: 'staffing',
          label: 'Local planning authority staffing (2010 = 100)',
          colour: '#F4A261',
          data: data.staffingTimeSeries.map(d => ({ date: yearToDate(d.date), value: d.staffingIndex })),
        },
      ]
    : [];

  return (
    <>
      <TopicNav topic="Planning Permission" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Planning Permission"
          question="Is the Planning System Blocking the Homes Britain Needs?"
          finding="England granted 474,000 planning permissions in 2023 but only 234,000 new homes were completed &mdash; a completion rate of under 50% &mdash; while the planning backlog has reached 500,000 undecided applications and planning department staffing has fallen 40% since 2010 due to budget cuts."
          colour="#F4A261"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              The planning system is at the centre of Britain&apos;s housing crisis &mdash; but not in the way that is usually assumed. The conventional narrative blames planning refusals for blocking new homes, but the data tells a more complicated story: England grants far more planning permissions than homes are built. In 2023, local authorities approved 474,000 planning applications for residential development, but only 234,000 homes were completed &mdash; a conversion rate of under 50%. The planning system is not primarily blocking permissions; it is struggling to convert permissions into homes, for reasons that span developer behaviour, infrastructure constraints, and the systematic underfunding of planning departments that has left them too understaffed to process applications efficiently or enforce conditions effectively.
            </p>
            <p>
              Planning departments have been among the hardest-hit casualties of local government austerity. Between 2010 and 2023, the Planning Advisory Service estimates that English local planning authorities lost approximately 40% of their planning department staff &mdash; roughly 12,000 full-time equivalent posts. The cuts happened precisely as the planning caseload grew more complex: major infrastructure schemes, nutrient neutrality requirements, biodiversity net gain conditions, and the transition to digital planning portals all added administrative burden without additional resources. The result is a system stretched to breaking point: 500,000 planning applications were awaiting a decision in England at the end of 2023, and the proportion of major residential applications decided within the statutory 13-week period fell below 50% for the first time in 2022.
            </p>
            <p>
              The mismatch between permissions and completions has multiple causes beyond the land banking behaviour of large developers (covered separately). Nutrient neutrality rules &mdash; introduced by Natural England in 2022 following a court ruling and affecting 74 local authority areas &mdash; halted tens of thousands of permitted homes pending mitigation solutions. Infrastructure constraints are genuine in many areas: sites with planning permission cannot be built until sufficient water, electricity, transport, and school capacity is in place. Small and medium-sized housebuilders, who once built a significant share of new homes, have largely exited the market following the 2008 financial crisis and have not returned in scale, leaving the market dominated by five large developers who collectively set the pace of completions. Meanwhile, the government&apos;s target of 300,000 new homes per year &mdash; a target no government has met since the early 1970s &mdash; has been largely abandoned in practice if not in rhetoric.
            </p>
            <p>
              The burden of inadequate housing supply falls along clear social lines. Young people are the primary losers: home ownership among 25&ndash;34-year-olds fell from 67% in 2000 to 39% in 2023, a generational shift with profound implications for wealth accumulation, retirement security, and family formation. Renters in high-demand areas pay an increasing share of their income in rent &mdash; 40% of income in London, 30% in the South East &mdash; while housing benefit costs to the public purse have risen 40% in real terms since 2010 because rents have risen faster than wages. Rural communities are being priced out by second-home purchases and planning restrictions that prevent affordable housing development, particularly in National Parks and Areas of Outstanding Natural Beauty where local residents often cannot afford homes in the places where they were born and raised.
            </p>
            <p>
              Planning statistics are collected by DLUHC but their interpretation is contested. The headline permissions-to-completions gap is a real phenomenon, but comparing total permissions with annual completions is methodologically imperfect: permissions have multi-year validity and a single large permission may represent several years of building activity. The backlog of undecided applications includes minor household applications (extensions, outbuildings) that are irrelevant to housing supply alongside the strategic residential applications that matter most. Staffing data from the Planning Advisory Service is the best available but is based on annual surveys with variable response rates and does not always distinguish between planning policy officers, development management officers, and enforcement officers, all of whom play different roles. The government&apos;s housing completions target itself is subject to methodological debate: what counts as a new home, and whether conversions should be included, affects the headline number significantly.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Overview' },
          { id: 'sec-permissions', label: 'Permissions vs Completions' },
          { id: 'sec-staffing', label: 'Planner Staffing' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Planning permissions granted (2023)"
              value="474,000"
              direction="down"
              polarity="up-is-bad"
              changeText="Down from 580,000 in 2010 &middot; But still 2&times; the number of homes completed"
              sparklineData={[580, 560, 540, 520, 490, 480, 470, 474]}
              source="DLUHC &middot; Planning applications in England 2023"
              onExpand={() => {}}
            />
            <MetricCard
              label="Planning department staff reduction since 2010"
              value="-40%"
              direction="down"
              polarity="up-is-good"
              changeText="~12,000 posts lost &middot; &lt;50% of major applications decided on time"
              sparklineData={[100, 94, 89, 85, 82, 78, 75, 73, 70, 68, 66, 63, 61, 60]}
              source="Planning Advisory Service &middot; LPA staffing survey 2023"
              onExpand={() => {}}
            />
            <MetricCard
              label="Undecided planning applications backlog"
              value="500,000"
              direction="up"
              polarity="up-is-bad"
              changeText="Up from 280,000 in 2016 &middot; Record high &middot; Delays add cost and uncertainty"
              sparklineData={[280, 300, 330, 360, 400, 440, 480, 500]}
              source="DLUHC &middot; Planning applications statistics 2023"
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-permissions" className="mb-12">
            {permissionSeries.length > 0 ? (
              <LineChart
                title="Planning permissions granted vs homes completed, England, 2010&ndash;2024"
                subtitle="Permissions granted (dark, thousands) vs new homes completed (green, thousands). The persistent gap between the two series illustrates that the system grants more permissions than are ever built &mdash; driven by land banking, infrastructure constraints, and viability issues."
                series={permissionSeries}
                yLabel="Homes (thousands)"
                source={{
                  name: 'DLUHC',
                  dataset: 'Planning applications &amp; house building statistics',
                  frequency: 'quarterly',
                  url: 'https://www.gov.uk/government/collections/planning-applications-statistics',
                }}
              />
            ) : (
              <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
            )}
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-staffing" className="mb-12">
            {staffingSeries.length > 0 ? (
              <LineChart
                title="Local planning authority staffing, England, 2010&ndash;2024"
                subtitle="Indexed to 2010 = 100. Full-time equivalent planning department staff in English local authorities. A 40% reduction since 2010 has left planning departments unable to process applications within statutory timescales or enforce planning conditions effectively."
                series={staffingSeries}
                yLabel="Staffing index (2010 = 100)"
                source={{
                  name: 'Planning Advisory Service / LGA',
                  dataset: 'Local planning authority staffing and resourcing',
                  frequency: 'annual',
                  url: 'https://www.local.gov.uk/pas',
                }}
              />
            ) : (
              <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
            )}
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="What the reforms propose"
            value="Planning &amp; Infrastructure Bill"
            description="The Planning and Infrastructure Bill (2025) proposes automatic planning permission in designated growth areas, mandatory decision timelines with fee refunds for late decisions, and increased planning fees to fund 300 additional planners &mdash; the most significant planning reform in decades. The Bill also introduces mandatory nature recovery strategies to address the nutrient neutrality blockage."
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
