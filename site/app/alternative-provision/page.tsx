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

interface PupilPoint {
  year: number;
  pupilsThousands: number;
}

interface OfstedPoint {
  year: number;
  inadequatePlusRiPct: number;
}

interface APData {
  national: {
    pupilNumbers: {
      timeSeries: PupilPoint[];
      latestYear: number;
      latestThousands: number;
    };
    ofstedRatings: {
      timeSeries: OfstedPoint[];
      latestYear: number;
      latestPct: number;
    };
    attainment: {
      year: number;
      apGcse94PassPct: number;
      mainstreamGcse94PassPct: number;
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

export default function AlternativeProvisionPage() {
  const [data, setData] = useState<APData | null>(null);

  useEffect(() => {
    fetch('/data/alternative-provision/alternative_provision.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const pupilSeries: Series[] = data
    ? [
        {
          id: 'pupils',
          label: 'Pupils in alternative provision',
          colour: '#2A9D8F',
          data: data.national.pupilNumbers.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.pupilsThousands,
          })),
        },
      ]
    : [];

  const ofstedSeries: Series[] = data
    ? [
        {
          id: 'ofsted',
          label: '% rated Inadequate or Requires Improvement',
          colour: '#E63946',
          data: data.national.ofstedRatings.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.inadequatePlusRiPct,
          })),
        },
      ]
    : [];

  const pupilAnnotations: Annotation[] = [
    { date: new Date(2015, 5, 1), label: '2015: 16,300 pupils in AP' },
    { date: new Date(2020, 5, 1), label: '2020: COVID disruption' },
    { date: new Date(2023, 5, 1), label: '2023: SEND &amp; AP Improvement Plan' },
  ];

  const ofstedAnnotations: Annotation[] = [
    { date: new Date(2023, 5, 1), label: '2023: New AP inspection framework' },
  ];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Alternative Provision" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Education"
          question="What Happens to Pupils Excluded from Mainstream Schools?"
          finding="22,440 pupils were in alternative provision in England in 2024, a 38% increase since 2015. Quality is highly variable, with 44% of AP schools rated inadequate or requiring improvement by Ofsted."
          colour="#2A9D8F"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              Alternative provision — pupil referral units, AP academies and AP free schools — serves some of the most vulnerable young people in England: children who have been excluded, who cannot attend mainstream school due to illness or mental health needs, or who have never been in a school at all. The number of pupils in AP has grown by 38% since 2015, driven by rising exclusions, the SEND crisis, and post-COVID attendance pressures.
            </p>
            <p>
              The consequences of poor-quality provision are severe. Only 11% of pupils in AP achieve grade 9–4 in both English and Maths at GCSE, compared with 65% in mainstream schools. A child placed in inadequate provision at 14 has a dramatically reduced chance of gaining qualifications, and is significantly more likely to enter the youth justice system. The 44% of AP schools rated inadequate or requiring improvement by Ofsted represents a systemic failure of the state's duty to these young people.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-pupils', label: 'Pupil numbers' },
          { id: 'sec-quality', label: 'Quality' },
        ]} />

        {/* Metric cards */}
        <ScrollReveal>
          <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Pupils in alternative provision"
              value="22,440"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="+38% since 2015 · Up from 16,300"
              sparklineData={[16.3, 16.8, 17.4, 18.1, 18.9, 19.2, 18.8, 19.6, 21.2, 22.4]}
              href="#sec-pupils"
            />
            <MetricCard
              label="AP schools rated inadequate or RI"
              value="44%"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="vs 13% of all schools · Quality crisis"
              sparklineData={[38, 40, 41, 42, 43, 44, 44]}
              href="#sec-pupils"
            />
            <MetricCard
              label="GCSE pass rate in AP"
              value="11%"
              unit=""
              direction="flat"
              polarity="up-is-good"
              changeText="vs 65% mainstream · Massive attainment gap"
              sparklineData={[10, 11, 10, 11, 11, 11, 11]}
              href="#sec-pupils"
            />
          </div>
        </ScrollReveal>

        {/* Charts */}
        <ScrollReveal>
          <section id="sec-pupils" className="mb-12">
            <LineChart
              title="Pupils in alternative provision, England, 2015–2024"
              subtitle="Number of pupils in state-funded alternative provision (pupil referral units, AP academies, AP free schools). Numbers fell during COVID then rose sharply as exclusions and SEND pressures increased."
              series={pupilSeries}
              annotations={pupilAnnotations}
              yLabel="Thousands"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-quality" className="mb-12">
            <LineChart
              title="AP schools rated inadequate or requires improvement by Ofsted, 2018–2024"
              subtitle="Percentage of alternative provision schools receiving the two lowest Ofsted grades. Significantly higher than the national average for all school types."
              series={ofstedSeries}
              annotations={ofstedAnnotations}
              yLabel="% of AP schools"
            />
          </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="What's improving"
            value="SEND &amp; AP"
            unit="Improvement Plan 2023"
            description="The SEND and AP Improvement Plan 2023 commits to new AP free schools in areas of greatest need, a new national framework for AP quality, and stronger local authority oversight of unregistered provision. The plan also introduces a new AP &lsquo;national standards&rsquo; framework and requires local authorities to publish data on AP outcomes for the first time."
            source="Source: DfE — SEND and AP Improvement Plan, March 2023. Ofsted — Alternative Provision inspection outcomes, 2024."
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
      </main>
    </>
  );
}
