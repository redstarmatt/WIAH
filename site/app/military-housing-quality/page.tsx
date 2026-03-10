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

interface BelowStandardPoint {
  year: number;
  percentBelowStandard: number;
}

interface BacklogPoint {
  year: number;
  backlogMillions: number;
}

interface ComplaintsPoint {
  year: number;
  complaints: number;
}

interface MilitaryHousingData {
  national: {
    belowStandard: {
      timeSeries: BelowStandardPoint[];
      latestYear: number;
      latestPercent: number;
      note: string;
    };
    maintenanceBacklog: {
      timeSeries: BacklogPoint[];
      latestYear: number;
      latestMillions: number;
      note: string;
    };
    housingComplaints: {
      timeSeries: ComplaintsPoint[];
      latestYear: number;
      latestComplaints: number;
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

export default function MilitaryHousingPage() {
  const [data, setData] = useState<MilitaryHousingData | null>(null);

  useEffect(() => {
    fetch('/data/military-housing-quality/military_housing.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const standardSeries: Series[] = data
    ? [{
        id: 'belowStandard',
        label: 'Accommodation below standard (%)',
        colour: '#0D1117',
        data: data.national.belowStandard.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.percentBelowStandard,
        })),
      }]
    : [];

  const backlogAndComplaintsSeries: Series[] = data
    ? [
        {
          id: 'backlog',
          label: 'Maintenance backlog (£ millions)',
          colour: '#0D1117',
          data: data.national.maintenanceBacklog.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.backlogMillions,
          })),
        },
        {
          id: 'complaints',
          label: 'Annual housing complaints',
          colour: '#E63946',
          data: data.national.housingComplaints.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.complaints,
          })),
        },
      ]
    : [];

  const standardAnnotations: Annotation[] = [
    { date: new Date(2021, 5, 1), label: '2021: Condition rating methodology updated' },
    { date: new Date(2023, 5, 1), label: '2023: PAC inquiry into MOD housing' },
  ];

  const backlogAnnotations: Annotation[] = [
    { date: new Date(2018, 5, 1), label: '2018: Annington contract renegotiation fails' },
    { date: new Date(2023, 5, 1), label: '2023: Annington Homes purchased — government buyback' },
  ];

  // ── Sparkline helpers ────────────────────────────────────────────────────

  const standardSparkline = data
    ? data.national.belowStandard.timeSeries.map(d => d.percentBelowStandard)
    : [];
  const backlogSparkline = data
    ? data.national.maintenanceBacklog.timeSeries.map(d => d.backlogMillions)
    : [];
  const complaintsSparkline = data
    ? data.national.housingComplaints.timeSeries.map(d => d.complaints)
    : [];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Military Housing" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Military Housing"
          question="Are Britain's Armed Forces Living in Decent Homes?"
          finding="40% of service family accommodation fails to meet basic living standards. The MOD housing backlog stands at £750 million. Mould, damp and disrepair are cited as a major retention factor with 15% of service leavers citing housing as a reason."
          colour="#0D1117"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              The MOD owns approximately 49,000 homes for service families in England, Wales and Germany. In 1996, the then-Conservative government sold 57,000 of these homes to Annington Homes for £1.67 billion, leasing them back. Under the Annington contract, the MOD paid rising ground rents while Annington took the proceeds of homes sold on the open market. The National Audit Office estimated in 2018 that the deal had cost taxpayers £4.2 billion more than retaining the homes would have. In 2023, the government exercised its enfranchisement right and began buying back the homes at market value — estimated to cost over £6 billion.
            </p>
            <p>
              The consequences of the Annington deal for housing quality have been severe. Maintenance budgets were squeezed because rental income went to Annington. Condition surveys now show 40% of service family accommodation does not meet the MOD Standard for Condition, with mould, damp, heating failures and structural defects all reported. Annual complaints from service families have risen to 11,000 — a record high. Survey data shows housing quality is among the top three reasons cited by service personnel considering leaving the military, alongside pay and deployment tempo. The MOD's Future Accommodation Model seeks to diversify provision away from tied housing, but the capital required to bring existing stock up to standard remains largely uncommitted.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-standard', label: 'Condition Decline' },
          { id: 'sec-backlog', label: 'Backlog & Complaints' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Service accommodation below standard"
              value="40%"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Up from 32% in 2018 · Annington Homes contract blamed"
              sparklineData={standardSparkline}
              href="#sec-standard"
            />
            <MetricCard
              label="MOD housing maintenance backlog"
              value="£750M"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Up from £480M in 2018 · Annington rents absorb maintenance funds"
              sparklineData={backlogSparkline}
              href="#sec-standard"
            />
            <MetricCard
              label="Annual housing complaints from families"
              value="11,000"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Record high · Mould, damp, heating failures most common"
              sparklineData={complaintsSparkline}
              href="#sec-standard"
            />
          </div>
        

        {/* Chart 1: Below standard */}
        <ScrollReveal>
          <section id="sec-standard" className="mb-12">
            <LineChart
              title="Service family accommodation below MOD standard, 2018–2024"
              subtitle="Percentage of MOD service family accommodation failing to meet the MOD Standard for Condition (equivalent to Decent Homes standard). Steady deterioration since 2018 with no evidence of reversal."
              series={standardSeries}
              annotations={standardAnnotations}
              yLabel="Percent (%)"
            />
          </section>
        </ScrollReveal>

        {/* Chart 2: Backlog and complaints */}
        <ScrollReveal>
          <section id="sec-backlog" className="mb-12">
            <LineChart
              title="MOD housing maintenance backlog and annual complaints, 2018–2024"
              subtitle="Cumulative MOD housing maintenance backlog (£ millions) and annual complaints from service families. Both indicators have risen steadily, reflecting structural underfunding of maintenance and deteriorating conditions."
              series={backlogAndComplaintsSeries}
              annotations={backlogAnnotations}
              yLabel="£M / Complaints"
            />
          </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="What's improving"
            value="£1.6bn"
            unit="New service accommodation"
            description="The MOD's Future Accommodation Model is redesigning how it provides housing from 2025, moving away from tied accommodation and towards a housing allowance model that gives service personnel more choice. The government committed £1.6 billion for new service accommodation in the Defence Review 2023. The government's exercise of enfranchisement rights against Annington Homes in 2023 enables the MOD to reclaim and refurbish sold homes as they become available. Dedicated maintenance funding was increased by £200 million in the 2024 Autumn Budget."
            source="Source: MOD — Annual Report and Accounts 2023/24. Defence Infrastructure Organisation — Future Accommodation Model prospectus."
          />
        </ScrollReveal>

        {/* Sources */}
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
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
