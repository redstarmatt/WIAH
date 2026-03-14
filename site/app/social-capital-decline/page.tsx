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
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'ONS', dataset: 'Community Wellbeing Survey', url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/wellbeing', date: '2025' },
  { num: 2, name: 'DCMS', dataset: 'Community Life Survey', url: 'https://www.gov.uk/government/collections/community-life-survey--2', date: '2024-25' },
  { num: 3, name: 'Ipsos / King\'s College London', dataset: 'Trust in Government Tracker', date: '2025' },
  { num: 4, name: 'Jo Cox Foundation', dataset: 'Loneliness Annual Report', url: 'https://www.jocoxfoundation.org/', date: '2024' },
];

// ── Types ────────────────────────────────────────────────────────────────────

interface DataPoint {
  year: number;
  neighbourTrustPct: number;
  belongingPct: number;
  govTrustPct: number;
  volunteeringPct: number;
}

interface LonelinessPoint {
  year: number;
  chronicLonelyPct: number;
  sometimesLonelyPct: number;
}

interface RegionData {
  region: string;
  neighbourTrustPct: number;
  belongingPct: number;
}

interface TopicData {
  national: { timeSeries: DataPoint[] };
  loneliness: LonelinessPoint[];
  byRegion: RegionData[];
  metadata: {
    sources: { name: string; dataset: string; url: string; frequency: string }[];
    methodology: string;
    knownIssues: string[];
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 0, 1);
}

function sparkFrom(arr: number[], n = 10) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function SocialCapitalDeclinePage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/social-capital-decline/social_capital_decline.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  // Chart 1: Neighbourhood trust and belonging
  const trustBelongingSeries: Series[] = data
    ? [
        {
          id: 'neighbourTrust',
          label: 'Trust neighbours in crisis (%)',
          colour: '#264653',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.neighbourTrustPct,
          })),
        },
        {
          id: 'belonging',
          label: 'Feel belonging to neighbourhood (%)',
          colour: '#2A9D8F',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.belongingPct,
          })),
        },
      ]
    : [];

  // Chart 2: Institutional trust and volunteering
  const trustCivicSeries: Series[] = data
    ? [
        {
          id: 'govTrust',
          label: 'Trust in national government (%)',
          colour: '#E63946',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.govTrustPct,
          })),
        },
        {
          id: 'volunteering',
          label: 'Regular volunteering (%)',
          colour: '#6B7280',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.volunteeringPct,
          })),
        },
      ]
    : [];

  // Chart 3: Loneliness
  const lonelinessSeries: Series[] = data
    ? [
        {
          id: 'chronicLonely',
          label: 'Often or always lonely (%)',
          colour: '#E63946',
          data: data.loneliness.map(d => ({
            date: yearToDate(d.year),
            value: d.chronicLonelyPct,
          })),
        },
        {
          id: 'sometimesLonely',
          label: 'Sometimes lonely (%)',
          colour: '#F4A261',
          data: data.loneliness.map(d => ({
            date: yearToDate(d.year),
            value: d.sometimesLonelyPct,
          })),
        },
      ]
    : [];

  // Annotations
  const trustAnnotations: Annotation[] = [
    { date: new Date(2020, 0, 1), label: '2020: COVID \u2014 temporary community surge' },
    { date: new Date(2021, 0, 1), label: '2021: Post-lockdown decline accelerates' },
  ];

  const civicAnnotations: Annotation[] = [
    { date: new Date(2016, 0, 1), label: '2016: Brexit referendum \u2014 trust polarises' },
    { date: new Date(2022, 0, 1), label: '2022: Cost of living crisis deepens disengagement' },
  ];

  const lonelinessAnnotations: Annotation[] = [
    { date: new Date(2020, 0, 1), label: '2020: Lockdowns drive loneliness spike' },
    { date: new Date(2023, 0, 1), label: '2023: Partial recovery, but above pre-pandemic' },
  ];

  // Latest values for metric cards
  const latest = data?.national.timeSeries[data.national.timeSeries.length - 1];
  const earliest = data?.national.timeSeries[0];
  const latestLoneliness = data?.loneliness[data.loneliness.length - 1];
  const earliestLoneliness = data?.loneliness[0];

  return (
    <>
      <TopicNav topic="Social Capital Decline" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Democracy & Governance"
          question="Are We Losing the Ties That Bind Communities Together?"
          finding="Only 34% of adults in England say they can rely on people in their neighbourhood in a crisis \u2014 down from 47% in 2011. Trust in government sits at 18%, volunteering has dropped by a quarter, and chronic loneliness has risen 43% since 2015."
          colour="#6B7280"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              Social capital — the networks, norms and trust that enable communities to function — has been
              declining across England for over a decade. The proportion of adults who say they could rely on
              neighbours in a crisis has fallen from 47% to 34% since 2015.<Cite nums={1} /> Neighbourhood belonging, once
              reported by a majority, is now a minority experience at 43%.<Cite nums={1} /> These are not small movements in
              survey data. They represent a measurable erosion of the connective tissue between people.
            </p>
            <p>
              The decline has structural causes. Austerity closed libraries, youth centres and community
              centres — the physical spaces where social bonds form. The shift to online interaction has
              reduced incidental contact between neighbours. Working patterns have changed: longer commutes,
              gig economy work and remote employment all reduce time spent in local communities. The cost
              of living crisis since 2022 has further withdrawn people into survival mode, leaving less
              capacity for civic engagement or mutual aid.
            </p>
            <p>
              Loneliness — the subjective experience of social capital decline — has become a public health
              concern. Chronic loneliness rose from 5.4% to 7.7% of adults between 2015 and 2025, spiking
              during the pandemic and only partially recovering.<Cite nums={[2, 4]} /> A quarter of English adults now report feeling
              lonely at least some of the time. The consequences are not abstract: loneliness is associated
              with a 26% increase in premature mortality risk, equivalent to smoking 15 cigarettes a day.<Cite nums={4} /> The
              2018 loneliness strategy and subsequent ministerial appointment produced some useful frameworks
              but have not reversed the trend.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-trust', label: 'Trust & belonging' },
          { id: 'sec-civic', label: 'Civic participation' },
          { id: 'sec-loneliness', label: 'Loneliness' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Adults who trust neighbours"
            value={latest ? `${latest.neighbourTrustPct}%` : '34%'}
            unit="2025"
            direction="down"
            polarity="up-is-good"
            changeText={
              latest && earliest
                ? `Down from ${earliest.neighbourTrustPct}% in ${earliest.year} · steepest fall post-pandemic`
                : 'Down from 47% in 2015 · steepest fall post-pandemic'
            }
            sparklineData={
              data ? sparkFrom(data.national.timeSeries.map(d => d.neighbourTrustPct)) : []
            }
            source="ONS · Community Wellbeing Survey 2025"
            href="#sec-trust"
          />
          <MetricCard
            label="Regular volunteering (monthly+)"
            value={latest ? `${latest.volunteeringPct}%` : '22%'}
            unit="2025"
            direction="down"
            polarity="up-is-good"
            changeText={
              latest && earliest
                ? `Down from ${earliest.volunteeringPct}% in ${earliest.year} · time poverty cited`
                : 'Down from 28% in 2015 · time poverty cited'
            }
            sparklineData={
              data ? sparkFrom(data.national.timeSeries.map(d => d.volunteeringPct)) : []
            }
            source="DCMS · Community Life Survey 2024-25"
            href="#sec-civic"
          />
          <MetricCard
            label="Trust in national government"
            value={latest ? `${latest.govTrustPct}%` : '18%'}
            unit="2025"
            direction="down"
            polarity="up-is-good"
            changeText={
              latest && earliest
                ? `Down from ${earliest.govTrustPct}% in ${earliest.year} · near all-time low`
                : 'Ipsos/KCL 2025 · near all-time low'
            }
            sparklineData={
              data ? sparkFrom(data.national.timeSeries.map(d => d.govTrustPct)) : []
            }
            source="Ipsos / King's College London · Trust Tracker 2025"
            href="#sec-civic"
          />
        </div>

        {/* Chart 1: Neighbourhood trust and belonging */}
        <ScrollReveal>
          <div id="sec-trust" className="mb-12">
            <LineChart
              series={trustBelongingSeries}
              title="Neighbourhood trust and belonging, England, 2015\u20132025"
              subtitle="Percentage of adults who say they can rely on neighbours in a crisis and who feel a sense of belonging to their neighbourhood."
              yLabel="Percentage"
              annotations={trustAnnotations}
              source={{
                name: 'ONS',
                dataset: 'Community Wellbeing Survey',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 2: Institutional trust and civic participation */}
        <ScrollReveal>
          <div id="sec-civic" className="mb-12">
            <LineChart
              series={trustCivicSeries}
              title="Institutional trust and civic participation, UK, 2015\u20132025"
              subtitle="Percentage trusting national government (Ipsos/KCL) and percentage volunteering at least monthly (DCMS). Both trend downward."
              yLabel="Percentage"
              annotations={civicAnnotations}
              source={{
                name: 'Ipsos / DCMS',
                dataset: 'Trust Tracker & Community Life Survey',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 3: Loneliness */}
        <ScrollReveal>
          <div id="sec-loneliness" className="mb-12">
            <LineChart
              series={lonelinessSeries}
              title="Loneliness in England, 2015\u20132025"
              subtitle="Percentage of adults reporting chronic loneliness (often/always) and occasional loneliness (sometimes). UCLA 3-item scale via Community Life Survey."
              yLabel="Percentage"
              annotations={lonelinessAnnotations}
              source={{
                name: 'ONS / DCMS',
                dataset: 'Community Life Survey \u2014 Loneliness',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Community Wealth Fund established"
            value="\u00a3200m"
            unit="10-year endowment announced 2024"
            description="The Community Wealth Fund, established via the Dormant Assets Act, will distribute \u00a3200 million over 10 years to the 20% most deprived communities in England to build social infrastructure \u2014 community spaces, volunteering coordination and local leadership. Pilot areas began receiving funding in 2024. Early evidence from existing community hub programmes shows that areas with well-maintained shared spaces report 12\u201318 percentage points higher neighbourhood trust than comparable areas without them. Independent evaluation will track changes in social capital indicators including trust, belonging and participation."
            source="Source: DCMS \u2014 Community Wealth Fund prospectus 2024. ONS \u2014 Community Wellbeing Survey 2025. Jo Cox Foundation \u2014 Loneliness Annual Report 2024."
          />
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        {/* Sources & Methodology */}
        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            {data?.metadata.sources.map((src, i) => (
              <div key={i}>
                <a
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-wiah-blue hover:underline"
                >
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
              {data?.metadata.knownIssues.map((x, i) => <li key={i}>{x}</li>)}
            </ul>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
