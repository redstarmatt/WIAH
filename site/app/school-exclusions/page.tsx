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

interface ExclusionPoint {
  year: string;
  count: number;
}

interface GroupBreakdown {
  group: string;
  pctOfExclusions: number;
}

interface ReasonBreakdown {
  reason: string;
  pct: number;
}

interface ExclusionData {
  national: {
    permanentExclusions: {
      timeSeries: ExclusionPoint[];
      latestYear: string;
      latestCount: number;
    };
    byGroup: GroupBreakdown[];
    topReasons: ReasonBreakdown[];
  };
  metadata: {
    sources: { name: string; dataset: string; url: string; frequency: string }[];
    methodology: string;
    knownIssues: string[];
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function fyToDate(fy: string): Date {
  // "2015/16" → Oct 2015
  const start = parseInt(fy.split('/')[0]);
  return new Date(start, 9, 1);
}

function sparkFrom(arr: number[], n = 7) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function SchoolExclusionsPage() {
  const [data, setData] = useState<ExclusionData | null>(null);

  useEffect(() => {
    fetch('/data/school-exclusions/school_exclusions.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const exclusionSeries: Series[] = data
    ? [{
        id: 'permanent-exclusions',
        label: 'Permanent exclusions',
        colour: '#F4A261',
        data: data.national.permanentExclusions.timeSeries.map(d => ({
          date: fyToDate(d.year),
          value: d.count,
        })),
      }]
    : [];

  const exclusionAnnotations: Annotation[] = [
    { date: fyToDate('2019/20'), label: '2019/20: COVID school closures' },
    { date: fyToDate('2022/23'), label: '2022/23: New post-COVID high' },
  ];

  // ── Modal state ──────────────────────────────────────────────────────────


  // ── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-white text-wiah-dark">
      <TopicNav topic="School Exclusions" />

      <TopicHeader
        topic="School Exclusions"
        question="Who Is Being Excluded from School in Britain?"
        finding="9,160 children were permanently excluded from English schools in 2022/23 — up 77% since 2015/16. A further 787,000 suspensions were issued. Boys, children with SEND, and children eligible for free school meals are dramatically over-represented. Each permanent exclusion costs the state an estimated £60,000 over a lifetime."
        colour="#F4A261"
        preposition="from"
      />

      <SectionNav sections={[
        { id: 'sec-overview', label: 'Overview' },
        { id: 'sec-trend', label: 'Trend' },
        { id: 'sec-groups', label: 'Who Is Excluded' },
        { id: 'sec-reasons', label: 'Reasons' },
      ]} />

      {/* ── OVERVIEW ────────────────────────────────────────────────────────────── */}

      <section id="sec-overview" className="px-4 py-16 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ScrollReveal>
            <MetricCard
              label="Permanent exclusions (England)"
              value="9,160"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="2022/23 · Up 77% from 5,170 in 2015/16 · Boys: 75% of exclusions · SEND pupils: 40% of exclusions"
              sparklineData={sparkFrom([5170, 6685, 7720, 8000, 6619, 5620, 9160])}
              source="DfE · Suspensions and Permanent Exclusions"
              href="#sec-trend"
            />
          </ScrollReveal>

          <ScrollReveal>
            <MetricCard
              label="Fixed-period suspensions (annual)"
              value="787K"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="2022/23 · Up from 410K in 2015/16 · Equivalent to 5.1M school days lost · Persistent disruption schools widening"
              sparklineData={sparkFrom([410, 450, 476, 438, 325, 390, 787])}
              source="DfE · Suspensions and Permanent Exclusions"
              href="#sec-trend"
            />
          </ScrollReveal>

          <ScrollReveal>
            <MetricCard
              label="SEND pupils as % of permanent exclusions"
              value="40%"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="2022/23 · SEND pupils: 17% of school population · Over-represented by 2.4x · Mental health needs often unmet"
              sparklineData={sparkFrom([32, 33, 34, 35, 36, 37, 38, 40])}
              source="DfE · Suspensions and Permanent Exclusions"
              href="#sec-trend"
            />
          </ScrollReveal>
        </div>
      </section>

      {/* ── CONTEXT ────────────────────────────────────────────────────────────── */}

      <section id="sec-context" className="px-4 py-12 max-w-3xl mx-auto bg-wiah-light">
        <div className="space-y-5 text-base leading-relaxed text-wiah-mid">
          <p>England recorded 9,160 permanent exclusions in 2022/23, up 77% from the 5,154 registered in 2018/19 before the pandemic, and the highest figure since comparable records began. A further 787,000 fixed-period suspensions were issued — also a record — equivalent to more than five million school days lost. The burden falls disproportionately on already disadvantaged children. Pupils with special educational needs and disabilities account for 40% of all permanent exclusions despite making up 17% of the school population; those with an Education, Health and Care Plan are eight times more likely to be excluded than their peers. Black Caribbean pupils face exclusion at three times the rate of white pupils, and Gypsy, Roma and Irish Traveller children have the highest exclusion rate of any ethnic group.</p>
          <p>Schools under pressure from Ofsted to demonstrate orderly environments increasingly resort to exclusion as a behaviour management tool, but the official figures understate the true scale. DfE inspection data and research by the Education Policy Institute suggest that between 40,000 and 49,000 pupils per year are removed from school rolls without a formal exclusion — a practice known as off-rolling, where parents are encouraged to deregister children or accept managed moves. The Timpson Review, commissioned by the government and published in 2019, found that head teachers' discretion on exclusions was applied inconsistently and recommended that schools retain accountability for the outcomes of pupils they exclude. Persistent absence, itself running at record levels, compounds the problem: children who miss school frequently are more likely to be disruptive when they do attend, creating a cycle that pushes them towards permanent exclusion.</p>
          <p>Excluded children enter Alternative Provision — a network of roughly 120 state AP schools, pupil referral units and independent providers — at a cost of £22,000 per pupil per year, more than three times the £6,000 mainstream average. Outcomes are poor: only 4% of AP pupils achieve five good GCSEs, and the Institute for Public Policy Research estimates that each permanent exclusion costs the state upwards of £300,000 over a lifetime in welfare payments, criminal justice involvement and lost tax revenue. Labour's 2024 election manifesto committed to reducing exclusions and improving SEND support, including mandatory inclusion plans for schools and strengthened local authority oversight. The challenge is acute: until mainstream schools are resourced to support pupils with unmet needs — particularly those with SEND and mental health difficulties — exclusion will continue to function as the system's pressure valve, pushing the most vulnerable children further from opportunity.</p>
          <p>The geography and demography of exclusion reveal deep structural patterns. Exclusion rates are highest in the most deprived local authorities: Blackpool, Middlesbrough, Knowsley and Hartlepool consistently record permanent exclusion rates two to three times the national average, mirroring broader indices of child poverty, SEND prevalence and family instability. Boys account for 78% of permanent exclusions, and the peak age is 14 — Year 9 and Year 10 — when undiagnosed speech, language and communication needs, trauma responses and unmet SEND requirements most commonly manifest as disruptive behaviour. Multi-academy trusts operating across local authority boundaries have created regulatory blind spots: a pupil &ldquo;managed moved&rdquo; between schools within the same trust does not appear in any exclusion dataset, and the trust has no obligation to report the transfer as anything other than a routine admission. The Ministry of Justice's 2022 data linkage study found that 63% of young people in custody had been permanently excluded from school, and 89% had been suspended at least once. Looked-after children are excluded at four times the rate of their peers despite statutory protections requiring virtual school heads to be consulted before any exclusion decision. The cost falls disproportionately on local authority children's services budgets: the Association of Directors of Children's Services reported a £3.2bn cumulative overspend in 2023/24, with alternative provision and SEND transport accounting for a growing share.</p>
          <p>The official exclusion statistics almost certainly understate the true scale of pupils being removed from mainstream education. Permanent exclusion and suspension data published by the DfE captures only those recorded through the formal statutory process, missing an estimated 40,000–49,000 pupils per year who leave school rolls through &ldquo;off-rolling&rdquo; — informal pressure on parents to withdraw children, managed moves presented as voluntary, and directed transfers that bypass the appeals process. Ofsted began flagging off-rolling in inspection reports from 2018, but its own data relies on unusual mid-year roll movements rather than direct evidence, meaning the practice is identified only where the statistical pattern is extreme. The ethnicity data that reveals disproportionate exclusion of Black Caribbean and Gypsy, Roma and Traveller pupils is drawn from the School Census, which contains roughly 5–8% missing or &ldquo;refused&rdquo; ethnicity records, potentially understating disparities if non-response correlates with specific communities. SEND status is recorded at the point of exclusion, but many excluded pupils receive their first diagnosis only after entering Alternative Provision, meaning the 40% figure for SEND involvement is likely an undercount of underlying need. Outcomes data for AP pupils is limited to headline GCSE attainment and post-16 destination measures, with no systematic longitudinal tracking of employment, mental health or criminal justice contact beyond age 18 — the £300,000 lifetime cost estimate cited by IPPR is modelled rather than observed.</p>
        </div>
      </section>

      {/* ── TREND CHART ────────────────────────────────────────────────────────── */}

      <section id="sec-trend" className="px-4 py-16 max-w-4xl mx-auto">
        <ScrollReveal>
          <LineChart
            title="Permanent school exclusions, England, 2012–2023"
            subtitle="Number of pupils permanently excluded from state-funded schools per year. Significant rise post-COVID."
            yLabel="Permanent exclusions"
            series={exclusionSeries}
            annotations={exclusionAnnotations}
            source={{ name: 'DfE', dataset: 'Suspensions and Permanent Exclusions in England', frequency: 'annual' }}
          />
        </ScrollReveal>
      </section>

      {/* ── WHO IS EXCLUDED ────────────────────────────────────────────────────── */}

      <section id="sec-groups" className="px-4 py-16 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-2 text-wiah-black">Who is permanently excluded</h2>
        <p className="text-wiah-mid text-sm mb-8">Permanent exclusions by pupil group, England 2022/23. Multiple characteristics may apply to individual pupils.</p>

        <ScrollReveal>
          <div className="space-y-4">
            {data?.national.byGroup.map((item, idx) => {
              const maxPct = 75;
              const widthPct = (item.pctOfExclusions / maxPct) * 100;
              return (
                <div key={idx} className="flex items-center gap-4">
                  <div className="w-32 text-sm font-medium text-wiah-dark">{item.group}</div>
                  <div className="flex-1 h-10 bg-wiah-light rounded-sm overflow-hidden">
                    <div
                      className="h-full bg-wiah-amber flex items-center justify-end pr-3"
                      style={{ width: `${widthPct}%` }}
                    >
                      {widthPct > 15 && <span className="text-xs font-bold text-white">{item.pctOfExclusions}%</span>}
                    </div>
                  </div>
                  {widthPct <= 15 && <span className="text-xs font-bold text-wiah-dark w-10">{item.pctOfExclusions}%</span>}
                </div>
              );
            })}
          </div>
        </ScrollReveal>
      </section>

      {/* ── REASONS ────────────────────────────────────────────────────────────── */}

      <section id="sec-reasons" className="px-4 py-16 max-w-4xl mx-auto bg-wiah-light">
        <h2 className="text-2xl font-bold mb-2 text-wiah-black">Top reasons for permanent exclusion</h2>
        <p className="text-wiah-mid text-sm mb-8">Primary reason cited for permanent exclusion, England 2022/23.</p>

        <ScrollReveal>
          <div className="space-y-4">
            {data?.national.topReasons.map((item, idx) => {
              const maxPct = 34;
              const widthPct = (item.pct / maxPct) * 100;
              return (
                <div key={idx} className="flex items-center gap-4">
                  <div className="w-40 text-sm font-medium text-wiah-dark">{item.reason}</div>
                  <div className="flex-1 h-10 bg-white rounded-sm overflow-hidden">
                    <div
                      className="h-full bg-wiah-mid flex items-center justify-end pr-3"
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
            title="The alternative provision challenge"
            value="£22,000"
            unit="average annual cost per pupil in Alternative Provision — twice the mainstream school cost"
            description="Pupils who are permanently excluded enter &lsquo;Alternative Provision&rsquo; (AP) — pupil referral units, AP academies, or independent special schools. The average AP place costs £22,000 per pupil per year, twice the mainstream cost. The Institute for Public Policy Research estimates each permanent exclusion costs the state £60,000 over a lifetime in AP costs, lost earnings, and higher benefit and criminal justice expenditure. Exclusions Scrutiny panels (formerly Independent Review Panels) allow parents to challenge permanent exclusions, but only 4% of decisions are overturned. The government's SEND Review (2022) called for exclusions to be considered only as a last resort for SEND pupils, and proposed strengthened accountability for schools with disproportionate exclusion rates."
            source="Source: DfE — Suspensions and Permanent Exclusions in England 2022/23; IPPR — Making the Difference: Breaking the Link Between School Exclusion and Social Exclusion."
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
