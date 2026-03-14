'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';
import SectionNav from '@/components/SectionNav';

const editorialRefs: Reference[] = [
  { num: 1, name: 'ONS', dataset: 'Internet Users, UK', url: 'https://www.ons.gov.uk/businessindustryandtrade/itandinternetindustry/bulletins/internetusers', date: '2025' },
  { num: 2, name: 'Ofcom', dataset: 'Adults\' Media Use and Attitudes Report', url: 'https://www.ofcom.org.uk/research-and-data/media-literacy-research', date: '2025' },
  { num: 3, name: 'BDUK', dataset: 'Gigabit Programme Progress', url: 'https://www.gov.uk/guidance/building-digital-uk', date: '2025' },
];

// ── Types ────────────────────────────────────────────────────────────────────

interface DataPoint {
  year: number;
  offlineMillions: number;
  neverUsedMillions: number;
  highIncomePct: number;
  lowIncomePct: number;
}

interface TopicData {
  national: {
    timeSeries: DataPoint[];
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

export default function TopicPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/internet-access/internet_access.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const chart1Series: Series[] = data
    ? [
        {
          id: 'offlineMillions',
          label: 'Offline adults (millions)',
          colour: '#E63946',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.offlineMillions,
          })),
        },
        {
          id: 'neverUsedMillions',
          label: 'Never used internet (millions)',
          colour: '#6B7280',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.neverUsedMillions,
          })),
        },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        {
          id: 'highIncomePct',
          label: 'Highest income quintile (%)',
          colour: '#264653',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.highIncomePct,
          })),
        },
        {
          id: 'lowIncomePct',
          label: 'Lowest income quintile (%)',
          colour: '#E63946',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.lowIncomePct,
          })),
        },
      ]
    : [];

  const chart1Annotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: '2020: COVID drives online surge' },
    { date: new Date(2023, 5, 1), label: '2023: GOV.UK offline services cut' },
  ];

  const chart2Annotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: '2020: Broadband declared essential' },
    { date: new Date(2022, 5, 1), label: '2022: Social tariffs expanded' },
  ];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Internet Access" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Digital & Connectivity"
          question="Who Still Can't Get Online?"
          finding={<>Around 5 million UK adults remain offline, concentrated among over-75s, those with disabilities, and people in low-income households.<Cite nums={1} /> Internet non-use correlates strongly with social isolation and exclusion from essential services.<Cite nums={2} /></>}
          colour="#264653"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Around 5 million UK adults do not use the internet — a figure that has fallen from 7.4 million in 2015 but is now declining at a much slower rate. The remaining non-users are concentrated among over-75s, disabled people, and those in the lowest income quintile, groups for whom the barriers are not primarily infrastructural but a combination of cost, confidence, and perceived relevance. As the easy gains of broadband rollout are exhausted, each further percentage point of digital inclusion becomes harder and more expensive to achieve. The pandemic briefly accelerated adoption, but the underlying trajectory has since reverted.<Cite nums={1} /></p>
            <p>The consequences of being offline are no longer marginal. Government services from Universal Credit claims to GP appointment booking now default to digital channels. Banking, energy tariff comparison, and job applications increasingly assume internet access. Ofcom research shows that non-users are significantly more likely to experience social isolation, to miss out on cheaper deals available only online, and to have worse health outcomes — not because the internet causes good health, but because it mediates access to information, services, and social connection that correlate with it. The 22-percentage-point gap in home internet access between the richest and poorest households is narrowing, but it remains a reliable proxy for broader inequality.<Cite nums={2} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-chart1', label: 'Chart 1' },
          { id: 'sec-chart2', label: 'Chart 2' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Adults without internet access"
            value="5.2M"
            unit=""
            direction="down"
            polarity="up-is-bad"
            changeText="Down from 7.4M in 2015 · Progress stalling"
            sparklineData={[7.4, 7.1, 6.8, 6.5, 6.2, 6.0, 5.8, 5.6, 5.4, 5.3, 5.2]}
            href="#sec-coverage"
          />
          <MetricCard
            label="Adults never used internet"
            value="3.8M"
            unit=""
            direction="down"
            polarity="up-is-bad"
            changeText="Older adults hardest hit · 73% are over 65"
            sparklineData={[6.3, 5.9, 5.5, 5.1, 4.8, 4.5, 4.3, 4.1, 4.0, 3.9, 3.8]}
            href="#sec-coverage"
          />
          <MetricCard
            label="Low-income households online"
            value="78%"
            unit=""
            direction="up"
            polarity="up-is-good"
            changeText="Up from 62% in 2015 · Still 22% gap vs affluent"
            sparklineData={[62, 65, 67, 69, 71, 73, 74, 75, 76, 77, 78]}
            href="#sec-coverage"
          />
        </div>

        {/* Charts */}
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Adults without internet access, UK, 2015–2025"
              subtitle="Millions of adults who have not used the internet in the last 3 months. Decline has slowed as the remaining non-users face the highest barriers."
              series={chart1Series}
              annotations={chart1Annotations}
              yLabel="Value"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Internet access by household income quintile, UK, 2015–2025"
              subtitle="Percentage of households with home internet access. The gap between highest and lowest income quintiles has narrowed but persists."
              series={chart2Series}
              annotations={chart2Annotations}
              yLabel="Value"
            />
          </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="What's improving"
            value="£40/mo"
            unit="Social tariff broadband cap"
            description="Social tariffs from major broadband providers offer connections from £15/month for benefits recipients. The BDUK gigabit programme is connecting the final 5% of premises excluded from commercial rollout. Ofcom's digital inclusion tracker shows smartphone-based access has partially compensated for lack of fixed-line broadband."
            source="Source: Ofcom — Adults' Media Use and Attitudes, 2025. ONS — Internet users, UK, 2025."
          />
        </ScrollReveal>

        {/* Sources */}
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

        <References items={editorialRefs} />
      </main>
    </>
  );
}
