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

interface ApplicationPoint {
  year: number;
  applications: number;
}

interface PendingPoint {
  year: number;
  pending: number;
}

interface DecisionOutcome {
  outcome: string;
  pct: number;
}

interface Nationality {
  nationality: string;
  applications: number;
}

interface AsylumData {
  national: {
    applications: {
      timeSeries: ApplicationPoint[];
      latestYear: number;
      latestCount: number;
    };
    pendingCases: {
      timeSeries: PendingPoint[];
      latestYear: number;
      latestCount: number;
      avgWaitMonths: number;
    };
    decisionOutcomes: DecisionOutcome[];
    topNationalities: Nationality[];
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

function sparkFrom(arr: number[], n = 7) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function AsylumSystemPage() {
  const [data, setData] = useState<AsylumData | null>(null);

  useEffect(() => {
    fetch('/data/asylum-system/asylum_system.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const applicationsSeries: Series[] = data
    ? [{
        id: 'applications',
        label: 'Asylum applications',
        colour: '#264653',
        data: data.national.applications.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.applications,
        })),
      }]
    : [];

  const pendingSeries: Series[] = data
    ? [{
        id: 'pending',
        label: 'People awaiting decision',
        colour: '#E63946',
        data: data.national.pendingCases.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.pending,
        })),
      }]
    : [];

  // ── Modal state ──────────────────────────────────────────────────────────


  // ── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-white text-wiah-dark">
      <TopicNav topic="Asylum System" />

      <TopicHeader
        topic="Asylum System"
        question="How Broken Is Britain&apos;s Asylum System?"
        finding="98,519 asylum applications were made in the UK in 2023 &mdash; a post-war record. Over 220,000 people were awaiting an initial decision at year end. The average wait is 26 months. The UK spends &pound;4 billion a year housing asylum seekers in hotels, costing &pound;150 per person per night. Just 44% of decisions grant asylum."
        colour="#264653"
        preposition="in"
      />

      <SectionNav sections={[
        { id: 'sec-overview', label: 'Overview' },
        { id: 'sec-applications', label: 'Applications' },
        { id: 'sec-backlog', label: 'Backlog' },
        { id: 'sec-outcomes', label: 'Decisions' },
      ]} />

      {/* ── OVERVIEW ────────────────────────────────────────────────────────────── */}

      <section id="sec-overview" className="px-4 py-16 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ScrollReveal>
            <MetricCard
              label="Asylum applications (annual)"
              value="98,519"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="2023 &middot; Post-war record &middot; Up from 29K in 2018 &middot; Mainly Afghans, Iranians, Syrians &middot; Channel small boats: 30K+"
              sparklineData={sparkFrom([29268, 35566, 35099, 56040, 74751, 84425, 98519])}
              source="Home Office · Asylum Statistics"
              onExpand={() => {}}
            />
          </ScrollReveal>

          <ScrollReveal>
            <MetricCard
              label="People awaiting initial asylum decision"
              value="220K+"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="End 2023 &middot; Average wait: 26 months &middot; Up from 64K in 2020 &middot; Home Office missed clearance targets every year"
              sparklineData={sparkFrom([64000, 100000, 130000, 166000, 195000, 220000])}
              source="Home Office · Asylum Statistics"
              onExpand={() => {}}
            />
          </ScrollReveal>

          <ScrollReveal>
            <MetricCard
              label="Cost of hotel accommodation for asylum seekers"
              value="&pound;4bn"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="2023 annual cost &middot; &pound;150/person/night &middot; 56K in hotels &middot; Up from &pound;300M in 2019 &middot; Hotels due to shortage of dispersal housing"
              sparklineData={sparkFrom([300, 500, 800, 1200, 2000, 3200, 4000])}
              source="Home Office · Asylum Accommodation Statistics"
              onExpand={() => {}}
            />
          </ScrollReveal>
        </div>
      </section>

      {/* ── CONTEXT ────────────────────────────────────────────────────────────── */}

      <section id="sec-context" className="px-4 py-12 max-w-3xl mx-auto bg-wiah-light">
        <div className="space-y-5 text-base leading-relaxed text-wiah-mid">
          <p>Britain&apos;s asylum system received 98,519 applications in 2023 &mdash; a post-war record, surpassing 74,751 in 2022 &mdash; driven by 45,756 small boat crossings and continuing displacement from Afghanistan, Iran, and Syria. Over 220,000 people were awaiting an initial decision at year end, a backlog leaving applicants in legal limbo for an average of 26 months. The accommodation crisis costs &pound;4 billion annually, housing 56,000 people in hotels at &pound;150 per night &mdash; up from &pound;300 million in 2019 &mdash; because Home Office caseworker numbers were cut by more than a third during austerity, hollowing out processing capacity. Policy responses focused on deterrence rather than speed: the Illegal Migration Act 2023, the Rwanda scheme struck down by the Supreme Court and revived at a cost of &pound;590 million before a single flight departed, and the Bibby Stockholm barge, which had to be evacuated for Legionella days before occupancy. Meanwhile 61&percnt; of initial decisions in 2023 granted protection &mdash; 98&percnt; for Afghans, 95&percnt; for Syrians &mdash; and 40&percnt; of refusals are overturned on appeal.</p>
          <p>The burden falls unevenly. Accommodation pressures concentrate in coastal and post-industrial towns where hotel capacity is cheap but local services are already stretched, while better-resourced urban authorities bear less. Asylum seekers have no right to work for the first 12 months of their claim, compounding mental health deterioration during prolonged uncertainty; NHS talking therapy access is limited. The UK receives fewer applications per capita than France, Germany, or Austria, a comparison domestic debate consistently omits. The political framing conflates distinct populations &mdash; asylum seekers awaiting decision, recognised refugees, and economic migrants &mdash; who have entirely different legal rights and trajectories; the majority of those currently in the backlog will ultimately be granted protection.</p>
        </div>
      </section>

      {/* ── APPLICATIONS CHART ────────────────────────────────────────────────────── */}

      <section id="sec-applications" className="px-4 py-16 max-w-4xl mx-auto">
        <ScrollReveal>
          <LineChart
            title="Asylum applications, UK, 2017–2023"
            subtitle="Total asylum applications lodged. Rose sharply from 2021 driven by Afghan evacuations, Channel crossings, and global displacement."
            yLabel="Applications"
            series={applicationsSeries}
            source={{ name: 'Home Office', dataset: 'Asylum and Resettlement Statistics', frequency: 'quarterly' }}
          />
        </ScrollReveal>
      </section>

      {/* ── BACKLOG CHART ────────────────────────────────────────────────────── */}

      <section id="sec-backlog" className="px-4 py-16 max-w-4xl mx-auto bg-wiah-light">
        <ScrollReveal>
          <LineChart
            title="People awaiting an asylum decision, 2020–2023"
            subtitle="Cases pending an initial decision at year end. Average wait is 26 months; government targets have never been met."
            yLabel="Pending cases"
            series={pendingSeries}
            source={{ name: 'Home Office', dataset: 'Asylum and Resettlement Statistics', frequency: 'quarterly' }}
          />
        </ScrollReveal>
      </section>

      {/* ── DECISION OUTCOMES ────────────────────────────────────────────────────── */}

      <section id="sec-outcomes" className="px-4 py-16 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-2 text-wiah-black">Asylum decision outcomes</h2>
        <p className="text-wiah-mid text-sm mb-8">Initial decision outcomes for asylum applications, 2023. 61% granted some form of protection.</p>

        <ScrollReveal>
          <div className="space-y-4">
            {data?.national.decisionOutcomes.map((item, idx) => {
              const maxPct = 44;
              const widthPct = (item.pct / maxPct) * 100;
              return (
                <div key={idx} className="flex items-center gap-4">
                  <div className="w-40 text-sm font-medium text-wiah-dark">{item.outcome}</div>
                  <div className="flex-1 h-10 bg-wiah-light rounded-sm overflow-hidden">
                    <div
                      className="h-full bg-wiah-blue flex items-center justify-end pr-3"
                      style={{ width: `${widthPct}%` }}
                    >
                      {widthPct > 15 && <span className="text-xs font-bold text-white">{item.pct}%</span>}
                    </div>
                  </div>
                  {widthPct <= 15 && <span className="text-xs font-bold text-wiah-dark w-10">{item.pct}%</span>}
                </div>
              );
            })}
          </div>
        </ScrollReveal>
      </section>

      {/* ── POSITIVE CALLOUT ────────────────────────────────────────────────────── */}

      <section className="px-4 py-16 max-w-4xl mx-auto">
        <ScrollReveal>
          <PositiveCallout
            title="What the data shows"
            value="61%"
            unit="of asylum decisions result in some form of protection being granted"
            description="Despite the political framing around border control, 61% of initial asylum decisions grant some form of protection &mdash; 44% full refugee status and 17% humanitarian protection or leave to remain. For Afghans and Syrians, grant rates exceed 95%. The backlog is primarily an administrative and capacity failure, not a question of eligibility: most people in the system will ultimately be granted the right to stay. Faster processing would save money (&pound;4 billion/year in hotel costs), allow those with valid claims to work and contribute sooner, and deter those without viable claims from applying. The Rwanda scheme, which sought to deter applications, cost &pound;590 million in its first year; the Court of Appeal ruled it unlawful."
            source="Source: Home Office &mdash; Immigration Statistics Year Ending December 2023; IPPR &mdash; The Cost of the Asylum Backlog 2023."
          />
        </ScrollReveal>
      </section>

      {/* ── SOURCES ────────────────────────────────────────────────────────────── */}

      <section className="px-4 py-12 max-w-4xl mx-auto border-t border-wiah-border mt-12">
        <h2 className="text-xl font-bold mb-6 text-wiah-black">Sources &amp; Methodology</h2>
        {data?.metadata.sources.map((src, idx) => (
          <div key={idx} className="mb-6">
            <p className="text-sm font-mono text-wiah-mid">
              {src.name} &ndash; <a href={src.url} className="text-wiah-blue hover:underline">{src.dataset}</a> ({src.frequency})
            </p>
          </div>
        ))}
        <div className="mt-8 pt-6 border-t border-wiah-border">
          <h3 className="font-bold mb-3 text-wiah-black">Methodology</h3>
          <p className="text-sm text-wiah-mid leading-relaxed">{data?.metadata.methodology}</p>
        </div>
        {data?.metadata.knownIssues.length ? (
          <div className="mt-6">
            <h3 className="font-bold mb-3 text-wiah-black">Known Issues</h3>
            <ul className="text-sm text-wiah-mid space-y-2">
              {data.metadata.knownIssues.map((issue, idx) => (
                <li key={idx} className="list-disc list-inside">{issue}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </section>

    </div>
  );
}
