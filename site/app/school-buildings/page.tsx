'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';

// ── Types ────────────────────────────────────────────────────────────────────

interface MaintenancePoint {
  year: number;
  billionsPounds: number;
}

interface CapitalPoint {
  year: number;
  billionsPounds: number;
}

interface ConditionItem {
  condition: string;
  pct: number;
}

interface SchoolBuildingsData {
  national: {
    maintenanceBacklog: MaintenancePoint[];
    capitalSpending: CapitalPoint[];
    buildingCondition: ConditionItem[];
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

export default function SchoolBuildingsPage() {
  const [data, setData] = useState<SchoolBuildingsData | null>(null);

  useEffect(() => {
    fetch('/data/school-buildings/school_buildings.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const backlogSeries: Series[] = data
    ? [{
        id: 'backlog',
        label: 'Maintenance backlog (&pound;bn)',
        colour: '#0D1117',
        data: data.national.maintenanceBacklog.map(d => ({
          date: yearToDate(d.year),
          value: d.billionsPounds,
        })),
      }]
    : [];

  const spendingSeries: Series[] = data
    ? [{
        id: 'spending',
        label: 'Annual capital spending (&pound;bn)',
        colour: '#264653',
        data: data.national.capitalSpending.map(d => ({
          date: yearToDate(d.year),
          value: d.billionsPounds,
        })),
      }]
    : [];

  // ── Metric values ────────────────────────────────────────────────────────

  const latestBacklog = data?.national.maintenanceBacklog.at(-1);
  const earliestBacklog = data?.national.maintenanceBacklog[0];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="School Buildings" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="School Buildings"
          question="Are Britain&apos;s Schools Safe?"
          finding="The Department for Education identified 174 schools across England with RAAC concrete that posed a risk of collapse in 2023. The school capital maintenance backlog is estimated at &pound;15 billion. One in three school buildings was constructed before 1976. Over 700,000 pupils were in schools with confirmed RAAC in the year it was publicly disclosed."
          colour="#F4A261"
          preposition="in"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>English schools are crumbling. The capital maintenance backlog &mdash; the estimated cost of repairing or replacing deteriorating school buildings &mdash; stood at &pound;15 billion in 2023, more than double the &pound;6.7 billion recorded in 2011. One in three school buildings was constructed before 1976. Around 4% are rated in &ldquo;critical&rdquo; condition; a further 17% are rated &ldquo;poor.&rdquo; These are not abstract engineering assessments: they translate into leaking roofs, broken boilers, windows that won&apos;t close, and structures that cannot safely be occupied.</p>
            <p>The RAAC crisis of autumn 2023 made the problem impossible to ignore. Reinforced Autoclaved Aerated Concrete &mdash; a lightweight bubbly material used extensively in public buildings constructed between 1954 and 1990 &mdash; can fail catastrophically and with little warning as it ages. By September 2023 the Department for Education had confirmed 174 schools contained RAAC, disrupting the education of more than 700,000 pupils at the start of the academic year. RAAC is the acute symptom; the chronic condition is decades of deferred investment. Asbestos, present in around 80% of schools built before 1985, is estimated to cause more than 170 teacher deaths per year. Lead water pipes remain in some older buildings. These hazards are not new discoveries &mdash; they have been catalogued in successive government surveys and consistently underfunded.</p>
            <p>The structural cause is straightforward: capital spending on schools was cut by around 40% in real terms between 2010 and 2014 as part of the coalition government&apos;s austerity programme. The Priority Schools Building Programme (launched 2011, extended 2014) targeted the very worst buildings, but the number of schools in serious disrepair far exceeded the programme&apos;s capacity. The School Rebuilding Programme, announced in 2020 with a commitment to rebuild 500 schools by 2030, has proceeded slowly: by 2023 only a fraction of the promised schools had been completed or meaningfully started. Annual School Condition Allocations &mdash; grants distributed to local authorities, academy trusts, and other responsible bodies &mdash; provide some maintenance funding, but the sums are widely regarded as insufficient to halt the deterioration, let alone reverse it.</p>
            <p>There is meaningful variation across the UK. Scotland has invested more heavily in its school estate in recent years, with the Scottish Futures Trust&apos;s hub programme delivering new-build and refurbished schools across all 32 local authority areas. Wales has its own Sustainable Communities for Learning programme. Within England, the condition of school buildings correlates imperfectly but noticeably with area deprivation: councils squeezed by a decade of funding reductions have had less capacity to top up central allocations with local capital. Academy trusts with large portfolios of older buildings face particular challenges, as maintenance liability transferred with the schools but funding did not always follow.</p>
            <p>One genuine positive emerged from the RAAC disruption: schools identified with structural problems received priority access to alternative provision and emergency capital support, and no serious injuries were reported. The condition surveys also produced the most comprehensive picture of the school estate in years, which is necessary groundwork for any credible rebuilding programme. What the data cannot tell us is how much deterioration has occurred in buildings not yet surveyed, how many schools are deferring maintenance that will become urgent within five years, or what a fully-funded remediation programme would realistically cost. The &pound;15 billion backlog figure is an estimate, not a ceiling.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-context', label: 'Context' },
          { id: 'sec-charts', label: 'Charts' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Capital maintenance backlog"
            value={latestBacklog ? `&pound;${latestBacklog.billionsPounds}bn` : '—'}
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText={
              latestBacklog && earliestBacklog
                ? `Up from &pound;${earliestBacklog.billionsPounds}bn in 2011 · Equivalent to &pound;21,000 per pupil`
                : 'Loading…'
            }
            sparklineData={
              data
                ? sparkFrom(data.national.maintenanceBacklog.map(d => d.billionsPounds))
                : []
            }
            source="DfE School Condition Survey 2023"
            baseline="Deferred maintenance now exceeds annual school capital spending by 2.4x"
            onExpand={() => {}}
          />
          <MetricCard
            label="Schools with RAAC concrete (risk of collapse)"
            value="174"
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText="Identified Sept 2023 · 700K+ pupils affected · RAAC = Reinforced Autoclaved Aerated Concrete, used 1954&ndash;1990"
            sparklineData={[174]}
            source="DfE RAAC survey"
            baseline="RAAC can collapse without warning. Schools had emergency building surveys."
            onExpand={() => {}}
          />
          <MetricCard
            label="School buildings pre-1976"
            value="1 in 3"
            unit=""
            direction="flat"
            polarity="up-is-bad"
            changeText="33% of school estate · Oldest buildings most likely to have RAAC, lead pipes, asbestos · More than half of secondary schools built before 1980"
            sparklineData={[33]}
            source="DfE School Condition Survey"
            baseline="Schools older than 50 years incur exponentially higher maintenance costs"
            onExpand={() => {}}
          />
        </div>
        </ScrollReveal>

        <div id="sec-charts" className="space-y-12">
          {backlogSeries.length > 0 ? (
            <LineChart
              title="School capital maintenance backlog, 2011&ndash;2023"
              subtitle="Estimated backlog of urgent repairs and improvements, England. Growing despite repeated pledges to address school condition."
              series={backlogSeries}
              yLabel="&pound; billions"
              source={{
                name: 'Department for Education',
                dataset: 'School Condition Data, 2023',
                frequency: 'annual',
                url: 'https://www.gov.uk/government/collections/school-condition',
              }}
            />
          ) : (
            <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
          )}

          {spendingSeries.length > 0 ? (
            <LineChart
              title="Annual school capital spending, 2010&ndash;2023"
              subtitle="Department for Education capital budget for school improvements and maintenance, England. Real terms (2024 &pound;bn). Spending fell 40% from 2010 to 2014 and has never recovered."
              series={spendingSeries}
              yLabel="&pound; billions (real 2024)"
              source={{
                name: 'Department for Education',
                dataset: 'School Capital Investment Budget',
                frequency: 'annual',
                url: 'https://www.gov.uk/government/organisations/department-for-education/about/statistics',
              }}
            />
          ) : (
            <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
          )}

          {data && data.national.buildingCondition.length > 0 && (
            <section className="mb-12">
              <h3 className="text-lg font-bold text-wiah-black mb-1">
                School buildings by condition rating
              </h3>
              <p className="text-sm text-wiah-mid font-mono mb-6">
                DfE School Condition Survey 2023. A = Excellent, B = Good, C = Satisfactory, D = Poor, E = Critical.
              </p>
              <div className="space-y-3">
                {data.national.buildingCondition.map(item => {
                  const colour = item.condition.includes('Good') ? '#2A9D8F' : item.condition.includes('Satisfactory') ? '#F4A261' : item.condition.includes('Poor') ? '#E63946' : '#0D1117';
                  return (
                    <div key={item.condition}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-wiah-black">{item.condition}</span>
                        <span className="font-mono text-wiah-mid">{item.pct}%</span>
                      </div>
                      <div className="h-2 bg-wiah-border rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${item.pct}%`, backgroundColor: colour }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="font-mono text-[11px] text-wiah-mid mt-3">
                Source: Department for Education, School Condition Survey 2023.
              </p>
            </section>
          )}
        </div>

        <section id="sec-sources" className="border-t border-wiah-border pt-8">
          <h2 className="text-lg font-bold text-wiah-black mb-4">Sources &amp; methodology</h2>
          <ul className="space-y-2 font-mono text-xs text-wiah-mid">
            <li>
              <a
                href="https://www.gov.uk/government/collections/school-condition"
                className="underline hover:text-wiah-blue"
                target="_blank"
                rel="noreferrer"
              >
                Department for Education &mdash; School Condition Data (annual)
              </a>
            </li>
            <li>
              <a
                href="https://www.gov.uk/government/news/raac-concrete-in-schools-survey-findings"
                className="underline hover:text-wiah-blue"
                target="_blank"
                rel="noreferrer"
              >
                Department for Education &mdash; RAAC Concrete in Schools Survey (2023)
              </a>
            </li>
            <li>
              <a
                href="https://www.gov.uk/government/organisations/department-for-education"
                className="underline hover:text-wiah-blue"
                target="_blank"
                rel="noreferrer"
              >
                Department for Education &mdash; Capital Investment Statistics
              </a>
            </li>
          </ul>
          <p className="font-mono text-xs text-wiah-mid mt-4">
            The maintenance backlog is the DfE&apos;s own estimate of the cost to bring all school buildings to &apos;good&apos; condition. RAAC was identified through emergency surveys following national publicity in September 2023. Building condition ratings are from the Department&apos;s annual condition surveys of maintained schools in England.
          </p>
          <p className="font-mono text-xs text-wiah-mid mt-4">
            Data updated automatically via GitHub Actions. Last pipeline run:{' '}
            {new Date().toISOString().slice(0, 10)}.
          </p>
        </section>
      </main>
    </>
  );
}
