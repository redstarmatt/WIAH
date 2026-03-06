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

interface IncidentPoint {
  year: number;
  incidents: number;
}

interface InjectionPoint {
  year: number;
  percentOfTotal: number;
}

interface ProsecutionPoint {
  year: number;
  ratePercent: number;
}

interface SpikingData {
  national: {
    recordedIncidents: {
      timeSeries: IncidentPoint[];
      latestYear: number;
      latestCount: number;
      expertEstimateActual: number;
      note: string;
    };
    injectionSpiking: {
      timeSeries: InjectionPoint[];
      latestYear: number;
      latestPercent: number;
      note: string;
    };
    prosecutionRate: {
      timeSeries: ProsecutionPoint[];
      latestYear: number;
      latestPercent: number;
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

export default function SpikingReportsPage() {
  const [data, setData] = useState<SpikingData | null>(null);

  useEffect(() => {
    fetch('/data/spiking-reports/spiking.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const incidentsSeries: Series[] = data
    ? [{
        id: 'incidents',
        label: 'Recorded spiking incidents',
        colour: '#E63946',
        data: data.national.recordedIncidents.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.incidents,
        })),
      }]
    : [];

  const injectionSeries: Series[] = data
    ? [{
        id: 'injection',
        label: 'Injection spiking as % of all incidents',
        colour: '#6B7280',
        data: data.national.injectionSpiking.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.percentOfTotal,
        })),
      }]
    : [];

  const prosecutionSeries: Series[] = data
    ? [{
        id: 'prosecution',
        label: 'Prosecution rate (%)',
        colour: '#2A9D8F',
        data: data.national.prosecutionRate.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.ratePercent,
        })),
      }]
    : [];

  const incidentAnnotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: '2020: Pandemic — venues closed' },
    { date: new Date(2022, 5, 1), label: '2022: Spiking Prevention Act · Specific offence created' },
  ];

  const injectionAnnotations: Annotation[] = [
    { date: new Date(2021, 5, 1), label: '2021: Injection spiking emerges' },
  ];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Spiking Reports" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Spiking Reports"
          question="How Common Is Spiking?"
          finding="Police recorded 6,732 spiking incidents in 2024, more than double the pre-pandemic level. Experts estimate only 1 in 7 incidents is reported to police. Injection spiking has grown from almost zero to 25% of cases."
          colour="#6B7280"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              Spiking — the deliberate administration of substances to a person without their knowledge or consent — is substantially under-reported. The 6,732 police-recorded incidents in 2024 represent a fraction of actual cases: NPCC analysis and academic research suggest a reporting rate of approximately one in seven, implying around 47,000 incidents per year. Victims frequently do not report because they are uncertain about what happened, fear not being believed, were intoxicated themselves, or because the rapid fading of toxicological evidence (typically 12–24 hours) makes them doubt prosecution is possible.
            </p>
            <p>
              The emergence of injection spiking from 2021 onwards represents a qualitatively different threat. Previously almost exclusively involving drinks — alcohol, GHB, ketamine, and more recently synthetic opioids — spiking now involves hypodermic needles in 25% of recorded cases. This shift presents greater physical risks (needle-stick injury, potential blood-borne virus transmission) and greater psychological impact on victims. The Spiking Prevention Act 2023 created spiking as a specific criminal offence, clarifying what had previously required prosecution under the Offences Against the Person Act, but the prosecution rate of 8% reflects persistent evidential barriers that legislation alone cannot resolve.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-incidents', label: 'Incident Trend' },
          { id: 'sec-injection', label: 'Injection Spiking' },
          { id: 'sec-prosecution', label: 'Prosecution Rate' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        {/* Metric cards */}
        <ScrollReveal>
          <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Recorded spiking incidents"
              value="6,732"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="+110% since 2019 · Expert estimate: 47,000+ actual cases · 1 in 7 reported"
              sparklineData={[3200, 2800, 3400, 4200, 5800, 6732]}
              onExpand={() => {}}
            />
            <MetricCard
              label="Injection spiking as % of cases"
              value="25%"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Up from near-zero in 2020 · Needles increasingly used · Needle-stick risk"
              sparklineData={[2, 8, 18, 25]}
              onExpand={() => {}}
            />
            <MetricCard
              label="Prosecution rate"
              value="8%"
              unit=""
              direction="flat"
              polarity="up-is-good"
              changeText="Very low conviction rate · Toxicology evidence fades within 24 hours"
              sparklineData={[8, 7, 6, 7, 8]}
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        {/* Charts */}
        <ScrollReveal>
          <section id="sec-incidents" className="mb-12">
            <LineChart
              title="Recorded spiking incidents, England and Wales, 2019–2024"
              subtitle="Police recorded spiking incidents. Spiking became a separately recorded offence in 2022; earlier figures estimated from poisoning and assault records. Experts estimate actual incidence is 7x higher than recorded."
              series={incidentsSeries}
              annotations={incidentAnnotations}
              yLabel="Incidents"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-injection" className="mb-12">
            <LineChart
              title="Injection spiking as percentage of all spiking incidents, 2021–2024"
              subtitle="Spiking using hypodermic needles emerged from 2021 and now accounts for 25% of recorded incidents. Presents additional risks of needle-stick injury and potential blood-borne virus transmission."
              series={injectionSeries}
              annotations={injectionAnnotations}
              yLabel="Percent (%)"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-prosecution" className="mb-12">
            <LineChart
              title="Spiking prosecution rate, 2020–2024"
              subtitle="Percentage of recorded spiking incidents resulting in prosecution. Remains stubbornly low due to rapid disappearance of toxicological evidence, difficulty in proving intent, and victim reluctance to engage with criminal justice process."
              series={prosecutionSeries}
              annotations={[]}
              yLabel="Percent (%)"
            />
          </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="What's improving"
            value="Spiking Prevention Act"
            unit="2023 — specific offence created"
            description="The Spiking Prevention Act 2023 created a specific offence of spiking, carrying up to 10 years imprisonment, making prosecutions clearer and removing the need to rely on general assault legislation. The Home Office funds specialist training for bar staff and university security teams. Many venues have introduced spiking detection nail varnish, drink covers, and rapid toxicology testing kits. Some police forces have fast-track toxicology services to collect evidence within the critical window. Student Unions have run effective bystander intervention campaigns."
            source="Source: Home Office Police Recorded Crime 2023/24 · NPCC Spiking National Problem Profile 2024."
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
