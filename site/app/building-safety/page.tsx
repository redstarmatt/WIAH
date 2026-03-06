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

interface BuildingSafetyData {
  national: {
    buildingsIdentified: {
      timeSeries: Array<{ year: number; buildings: number }>;
    };
    remediationComplete: {
      timeSeries: Array<{ year: number; buildings: number }>;
    };
  };
  metadata: {
    sources: Array<{ name: string; dataset: string; url: string; frequency: string }>;
    methodology: string;
    knownIssues: string[];
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function BuildingSafetyPage() {
  const [data, setData] = useState<BuildingSafetyData | null>(null);

  useEffect(() => {
    fetch('/data/building-safety/building_safety.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const identifiedSeries: Series[] = data
    ? [{
        id: 'buildings-identified',
        label: 'Buildings identified with unsafe cladding',
        colour: '#E63946',
        data: data.national.buildingsIdentified.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.buildings,
        })),
      }]
    : [];

  const remediatedSeries: Series[] = data
    ? [{
        id: 'remediation-complete',
        label: 'Remediation completed',
        colour: '#2A9D8F',
        data: data.national.remediationComplete.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.buildings,
        })),
      }]
    : [];

  const combinedSeries: Series[] = [...identifiedSeries, ...remediatedSeries];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Building Safety" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Building Safety"
          question="How Many People Still Live in Buildings With Dangerous Cladding?"
          finding="Nearly eight years after the Grenfell Tower fire killed 72 people, over 3,600 residential buildings with unsafe cladding have not yet completed remediation. An estimated 300,000 leaseholders remain trapped in flats they cannot sell, with waking watch costs of up to £500 per month per household. The government's £5.1 billion Building Safety Fund has disbursed less than half its allocation."
          colour="#E63946"
          preposition="with"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The Grenfell Tower fire of 14 June 2017, which killed 72 people, exposed a systemic failure of building safety regulation in England. Combustible aluminium composite material (ACM) cladding on the tower's exterior was the primary accelerant, but the subsequent investigation revealed that the problem extended far beyond one building. DLUHC's Building Safety Programme has identified 5,412 residential buildings over 11 metres with some form of unsafe cladding or fire safety defect. Of these, approximately 1,780 have completed remediation as of early 2025 — a completion rate of 33% after nearly eight years. The remaining 3,632 buildings house an estimated 300,000 households, many of whom cannot sell or remortgage their flats because lenders refuse to advance loans on buildings with known fire safety defects.</p>
            <p>The financial burden on leaseholders has been immense. Before the Building Safety Act 2022 established the principle that leaseholders in buildings over 11 metres should not pay for cladding remediation, many faced bills of £40,000–£100,000 per flat. Interim safety measures — principally waking watches (24-hour fire patrols) and communal alarm systems — have cost leaseholders up to £500 per household per month. The government's £5.1 billion Building Safety Fund, announced in 2020, is the primary remediation funding mechanism, but disbursement has been slow: by late 2024, approximately £2.3 billion had been spent. The Cladding Safety Scheme, which replaced the Building Safety Fund in 2023, aims to accelerate progress but relies on building owners to register and apply, and many have not done so. Buildings between 11 and 18 metres face a different regime: the £1 billion Medium Rise Scheme provides limited support, but many mid-rise leaseholders remain liable for non-cladding fire safety defects (compartmentation failures, missing fire breaks, defective fire doors) that can cost £10,000–£30,000 per flat.</p>
            </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-progress', label: 'Remediation Progress' },
        ]} />

        <ScrollReveal>
          <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Buildings with unsafe cladding identified"
              value="5,412"
              direction="up"
              polarity="up-is-bad"
              changeText="2024 · Identification ongoing · True total likely higher · 40% in London"
              sparklineData={[457, 1650, 3120, 4630, 5120, 5340, 5412]}
              onExpand={() => {}}
            />
            <MetricCard
              label="Remediation completed"
              value="1,780"
              direction="up"
              polarity="up-is-good"
              changeText="2024 · 33% completion rate · 3,632 buildings still awaiting works · ~300K households affected"
              sparklineData={[15, 128, 340, 612, 1015, 1420, 1780]}
              onExpand={() => {}}
            />
            <MetricCard
              label="Building Safety Fund disbursed"
              value="£2.3bn"
              direction="up"
              polarity="up-is-good"
              changeText="Of £5.1bn allocated · 45% disbursed after 4 years · Contractor shortages slowing progress"
              sparklineData={[0.3, 0.6, 1.0, 1.5, 1.9, 2.3]}
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-progress" className="mb-12">
            <LineChart
              title="Cladding remediation progress, England, 2018–2024"
              subtitle="Cumulative buildings identified with unsafe cladding vs. buildings where remediation has been completed."
              series={combinedSeries}
              yLabel="Buildings"
              source={{
                name: 'DLUHC',
                dataset: 'Building Safety Programme Monthly Data Release',
                frequency: 'monthly',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="What's changing"
            value="1,780"
            unit="buildings remediated — pace is accelerating"
            description="The Building Safety Act 2022 established the principle that leaseholders should not pay for cladding remediation in buildings over 11 metres. The Building Safety Regulator began operations in April 2023 with new enforcement powers. The Grenfell Tower Inquiry final report (September 2024) recommended sweeping regulatory reform. Remediation completions rose from 1,015 in 2022 to 1,780 in 2024 as contractor capacity expanded. The Cladding Safety Scheme is designed to streamline applications and speed up disbursement."
            source="Source: DLUHC — Building Safety Programme Monthly Data Release 2024; Grenfell Tower Inquiry Final Report 2024."
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
