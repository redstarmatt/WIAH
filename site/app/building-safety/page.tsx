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
          finding="Nearly eight years after the Grenfell Tower fire killed 72 people, over 3,600 residential buildings with unsafe cladding have not yet completed remediation. An estimated 300,000 leaseholders remain trapped in flats they cannot sell, with waking watch costs of up to &pound;500 per month per household. The government&apos;s &pound;5.1 billion Building Safety Fund has disbursed less than half its allocation."
          colour="#E63946"
          preposition="with"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Nearly eight years after the Grenfell Tower fire killed 72 people, 5,412 residential buildings over 11 metres have been identified with unsafe cladding or fire safety defects in England &mdash; of which only 1,780 (33&percnt;) have completed remediation as of early 2025. The remaining 3,632 buildings house an estimated 300,000 leaseholders who cannot sell or remortgage their flats because lenders refuse to advance loans against buildings with known defects. The &pound;5.1 billion Building Safety Fund has disbursed approximately &pound;2.3 billion since 2020, with progress slowed by contractor shortages, legal disputes, and freeholders &mdash; including offshore-registered companies and insolvent developers &mdash; failing to engage. Interim waking watch costs have reached &pound;500 per household per month. The Grenfell Tower Inquiry&apos;s September 2024 final report found that manufacturers knowingly sold combustible cladding, testing laboratories issued misleading certifications, and successive governments failed to update regulations despite repeated warnings.</p>
            <p>The crisis falls most heavily on young professionals and first-time buyers who purchased flats between 2005 and 2017 &mdash; a cohort that entered the market assuming building safety was regulated. London accounts for approximately 40&percnt; of all identified buildings, with Tower Hamlets, Newham, and Greenwich most affected. An estimated 9,000&ndash;12,000 mid-rise buildings between 11 and 18 metres face fire safety defects not fully covered by government schemes; those below 11 metres are largely absent from official data. A 2023 UK Cladding Action Group survey found 89&percnt; of affected leaseholders reporting anxiety or depression, and 12&percnt; reporting suicidal thoughts.</p>
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
              changeText="2024 &middot; Identification ongoing &middot; True total likely higher &middot; 40% in London"
              sparklineData={[457, 1650, 3120, 4630, 5120, 5340, 5412]}
              href="#sec-overview"/>
            <MetricCard
              label="Remediation completed"
              value="1,780"
              direction="up"
              polarity="up-is-good"
              changeText="2024 &middot; 33% completion rate &middot; 3,632 buildings still awaiting works &middot; ~300K households affected"
              sparklineData={[15, 128, 340, 612, 1015, 1420, 1780]}
              href="#sec-progress"/>
            <MetricCard
              label="Building Safety Fund disbursed"
              value="&pound;2.3bn"
              direction="up"
              polarity="up-is-good"
              changeText="Of &pound;5.1bn allocated &middot; 45% disbursed after 4 years &middot; Contractor shortages slowing progress"
              sparklineData={[0.3, 0.6, 1.0, 1.5, 1.9, 2.3]}
              href="#sec-progress"/>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-progress" className="mb-12">
            <LineChart
              title="Cladding remediation progress, England, 2018&ndash;2024"
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
            title="What&apos;s changing"
            value="1,780"
            unit="buildings remediated — pace is accelerating"
            description="The Building Safety Act 2022 established the principle that leaseholders should not pay for cladding remediation in buildings over 11 metres. The Building Safety Regulator began operations in April 2023 with new enforcement powers. The Grenfell Tower Inquiry final report (September 2024) recommended sweeping regulatory reform. Remediation completions rose from 1,015 in 2022 to 1,780 in 2024 as contractor capacity expanded. The Cladding Safety Scheme is designed to streamline applications and speed up disbursement."
            source="Source: DLUHC &mdash; Building Safety Programme Monthly Data Release 2024; Grenfell Tower Inquiry Final Report 2024."
          />
        </ScrollReveal>

        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            {data?.metadata.sources.map((src, i) => (
              <div key={i}>
                <a href={src.url} target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">
                  {src.name} &mdash; {src.dataset}
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
