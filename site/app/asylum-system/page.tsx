'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

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
        question="How Broken Is Britain's Asylum System?"
        finding="98,519 asylum applications were made in the UK in 2023 — a post-war record. Over 220,000 people were awaiting an initial decision at year end. The average wait is 26 months. The UK spends £4 billion a year housing asylum seekers in hotels, costing £150 per person per night. Just 44% of decisions grant asylum."
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
              changeText="2023 · Post-war record · Up from 29K in 2018 · Mainly Afghans, Iranians, Syrians · Channel small boats: 30K+"
              sparklineData={sparkFrom([29268, 35566, 35099, 56040, 74751, 84425, 98519])}
              source="Home Office · Asylum Statistics"
              href="#sec-applications"
            />
          </ScrollReveal>

          <ScrollReveal>
            <MetricCard
              label="People awaiting initial asylum decision"
              value="220K+"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="End 2023 · Average wait: 26 months · Up from 64K in 2020 · Home Office missed clearance targets every year"
              sparklineData={sparkFrom([64000, 100000, 130000, 166000, 195000, 220000])}
              source="Home Office · Asylum Statistics"
              href="#sec-applications"
            />
          </ScrollReveal>

          <ScrollReveal>
            <MetricCard
              label="Cost of hotel accommodation for asylum seekers"
              value="£4bn"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="2023 annual cost · £150/person/night · 56K in hotels · Up from £300M in 2019 · Hotels due to shortage of dispersal housing"
              sparklineData={sparkFrom([300, 500, 800, 1200, 2000, 3200, 4000])}
              source="Home Office · Asylum Accommodation Statistics"
              href="#sec-applications"
            />
          </ScrollReveal>
        </div>
      </section>

      {/* ── CONTEXT ────────────────────────────────────────────────────────────── */}

      <section id="sec-context" className="px-4 py-12 max-w-3xl mx-auto bg-wiah-light">
        <div className="space-y-5 text-base leading-relaxed text-wiah-mid">
          <p>Britain's asylum system is processing more claims than at any point since records began. The 98,519 applications lodged in 2023 surpassed the previous record of 74,751 set in 2022, driven by 45,756 small boat crossings that year and continuing displacement from Afghanistan, Iran and Syria. At the end of 2023, more than 220,000 people were awaiting an initial decision — a backlog that leaves applicants in legal limbo for an average of 26 months. The UK nonetheless receives fewer asylum seekers per capita than France, Germany or Austria, despite widespread public perception that it is a top destination.</p>
          <p>The backlog is primarily an administrative failure. Home Office caseworker numbers were cut by more than a third during the 2010s austerity programme, hollowing out decision-making capacity just as global displacement accelerated. COVID-19 then closed immigration tribunals for months. The resulting accommodation crisis has cost £4 billion in 2022/23 alone, housing 56,000 asylum seekers in hotels at roughly £150 per person per night. The Bibby Stockholm barge, introduced in 2023 as an alternative, became a symbol of the system's dysfunction after Legionella bacteria were found in its water supply days before residents were due to board.</p>
          <p>Policy responses have focused on deterrence rather than processing speed. The Illegal Migration Act 2023 attempted to bar asylum claims from those arriving by irregular routes. The Rwanda deportation scheme, struck down by the Supreme Court in November 2023 as unlawful, was revived through the Safety of Rwanda Act in April 2024 — at a cost of £590 million before a single flight departed. Meanwhile, the data on outcomes tells a different story: 61% of initial decisions in 2023 granted protection, with grant rates of 98% for Afghans, 95% for Syrians and 86% for Eritreans. Some 40% of refusals are overturned on appeal, adding to a tribunal backlog exceeding 50,000 cases.</p>
            <p>Behind the aggregate backlog figures are individual cases with distinct national profiles and outcomes. The largest groups of applicants in 2023 came from Afghanistan, Iran, Eritrea, Albania, and Syria—countries where the overall grant rate at initial decision sits around 70%, meaning the majority of people waiting in the system will ultimately be recognised as refugees. The human cost of prolonged uncertainty is substantial: asylum seekers report deteriorating mental health, with limited access to NHS talking therapies and no right to work until 12 months after their claim is lodged. Accommodation pressures fall disproportionately on coastal and post-industrial towns—places where available hotel capacity is cheap but local services are already stretched. The political framing often conflates distinct legal categories: asylum seekers awaiting a decision, recognised refugees with leave to remain, and economic migrants subject to immigration rules are three entirely different populations with different rights and different trajectories. International comparison provides context that domestic debate frequently omits—Germany processed approximately 350,000 asylum applications in 2023, France around 167,000. The UK's 98,519 applications represent a record domestically but are not exceptional by European standards, and the UK receives fewer applications per capita than several comparable nations.</p>
            <p>Home Office statistics on asylum applications, decisions, and pending cases are published quarterly but with reporting lags that can exceed six months. The &ldquo;pending&rdquo; caseload figure aggregates cases at fundamentally different stages: initial applications awaiting a first decision, cases under appeal, and further submissions on previously refused claims. Counting methodology has changed over time, with legacy cases periodically reclassified, creating apparent trend breaks that do not reflect real changes in asylum flows. Small boat crossings are counted at the point of interception by Border Force, not at the point of arrival, and an unknown number of crossings go undetected, particularly in poor weather when surveillance is reduced. Grant rates are calculated on decided cases, which are not representative of the full pending caseload because straightforward claims from nationals of countries with high recognition rates tend to be decided first, inflating the apparent overall success rate. The total cost of the Rwanda scheme—estimated at over £500 million including diplomatic agreements, processing infrastructure in Kigali, and legal costs—is difficult to verify precisely because costs were spread across multiple departmental budgets. There is no reliable mechanism for counting individuals who leave the UK voluntarily while their claim is pending, meaning the true resolution rate of the system is unknown.</p>
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
            description="Despite the political framing around border control, 61% of initial asylum decisions grant some form of protection — 44% full refugee status and 17% humanitarian protection or leave to remain. For Afghans and Syrians, grant rates exceed 95%. The backlog is primarily an administrative and capacity failure, not a question of eligibility: most people in the system will ultimately be granted the right to stay. Faster processing would save money (£4 billion/year in hotel costs), allow those with valid claims to work and contribute sooner, and deter those without viable claims from applying. The Rwanda scheme, which sought to deter applications, cost £590 million in its first year; the Court of Appeal ruled it unlawful."
            source="Source: Home Office — Immigration Statistics Year Ending December 2023; IPPR — The Cost of the Asylum Backlog 2023."
          />
        </ScrollReveal>
      </section>

      {/* ── SOURCES ────────────────────────────────────────────────────────────── */}

      <section className="px-4 py-12 max-w-4xl mx-auto border-t border-wiah-border mt-12">
        <h2 className="text-xl font-bold mb-6 text-wiah-black">Sources &amp; Methodology</h2>
        {data?.metadata.sources.map((src, idx) => (
          <div key={idx} className="mb-6">
            <p className="text-sm font-mono text-wiah-mid">
              {src.name} – <a href={src.url} className="text-wiah-blue hover:underline">{src.dataset}</a> ({src.frequency})
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

        <RelatedTopics />
    </div>
  );
}
