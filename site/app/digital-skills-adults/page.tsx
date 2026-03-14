'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

// ── Types ────────────────────────────────────────────────────────────────────

interface DataPoint {
  year: number;
  withoutBasicMillions: number;
  withoutEssentialMillions: number;
  skillsShortageEmployerPct: number;
  bootcampCompletionsThousands: number;
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

const editorialRefs: Reference[] = [
  { num: 1, name: 'Lloyds Bank', dataset: 'UK Consumer Digital Index', url: 'https://www.lloydsbank.com/banking-with-us/whats-happening/consumer-digital-index.html', date: '2024' },
  { num: 2, name: 'DCMS', dataset: 'UK Digital Strategy', url: 'https://www.gov.uk/government/organisations/department-for-culture-media-sport/about/statistics', date: '2025' },
  { num: 3, name: 'DfE', dataset: 'Further Education: outcome-based success measures', url: 'https://explore-education-statistics.service.gov.uk/', date: '2025' },
];

export default function TopicPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/digital-skills-adults/digital_skills_adults.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const chart1Series: Series[] = data
    ? [
        {
          id: 'withoutBasicMillions',
          label: 'Without basic digital skills (millions)',
          colour: '#E63946',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.withoutBasicMillions,
          })),
        },
        {
          id: 'withoutEssentialMillions',
          label: 'Without essential work digital skills (millions)',
          colour: '#F4A261',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.withoutEssentialMillions,
          })),
        },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        {
          id: 'skillsShortageEmployerPct',
          label: 'Employers with digital skills shortage (%)',
          colour: '#E63946',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.skillsShortageEmployerPct,
          })),
        },
        {
          id: 'bootcampCompletionsThousands',
          label: 'Bootcamp completions (thousands)',
          colour: '#2A9D8F',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.bootcampCompletionsThousands,
          })),
        },
      ]
    : [];

  const chart1Annotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: '2020: COVID forces digital adoption' },
    { date: new Date(2023, 5, 1), label: '2023: AI skills gap identified' },
  ];

  const chart2Annotations: Annotation[] = [
    { date: new Date(2021, 5, 1), label: '2021: Bootcamp programme launched' },
    { date: new Date(2023, 5, 1), label: '2023: AI upskilling added' },
  ];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Digital Skills" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Digital & Connectivity"
          question="Does the UK Workforce Have the Digital Skills It Needs?"
          finding={<>Around 8 million UK adults lack the basic digital skills needed for everyday work and life.<Cite nums={1} /> The digital skills gap costs the UK economy an estimated £22 billion per year in lost productivity, and demand for advanced digital skills is outpacing supply.<Cite nums={2} /></>}
          colour="#264653"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Around 8 million UK adults cannot perform basic digital tasks — completing an online form, managing email, navigating a search engine. This is not merely an inconvenience: as government services, banking, healthcare booking, and job applications migrate online, digital exclusion increasingly mirrors social exclusion. The affected population skews older, poorer, and more likely to have a disability. Covid-19 forced a one-off acceleration in digital adoption, but the pace of improvement has since stalled, leaving a hard-to-reach cohort for whom cost, confidence, and motivation remain significant barriers.<Cite nums={1} /></p>
            <p>At the other end of the spectrum, employers report a growing shortage of advanced digital skills. Over half now struggle to hire staff with the technical capabilities they need, up from 39% in 2019, driven partly by the rapid emergence of AI and data science roles that the education system has not kept pace with. Government-funded bootcamps have scaled to 24,000 completions per year, but this remains marginal against an economy-wide gap that DCMS estimates costs £22 billion annually in lost productivity. The UK faces a two-tier problem: too many adults locked out of basic participation, and too few with the advanced skills the economy demands.<Cite nums={2} /></p>
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
            label="Adults lacking basic digital skills"
            value="8.0M"
            unit=""
            direction="down"
            polarity="up-is-bad"
            changeText={<>Down from 12.6M in 2015 · Pace of improvement slowing<Cite nums={1} /></>}
            sparklineData={[12.6, 12.0, 11.4, 10.8, 10.2, 9.6, 9.1, 8.7, 8.4, 8.2, 8.0]}
            href="#sec-coverage"
          />
          <MetricCard
            label="Employers struggling to hire digitally skilled staff"
            value="52%"
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText={<>Up from 39% in 2019 · AI creating new skill gaps<Cite nums={2} /></>}
            sparklineData={[35, 36, 37, 38, 39, 41, 43, 46, 48, 50, 52]}
            href="#sec-coverage"
          />
          <MetricCard
            label="Digital skills bootcamp completions"
            value="24K"
            unit="/year"
            direction="up"
            polarity="up-is-good"
            changeText={<>Up from 3K in 2021 · Shortage still large relative to need<Cite nums={3} /></>}
            sparklineData={[0, 0, 0, 0, 0, 0, 3000, 8000, 14000, 19000, 24000]}
            href="#sec-coverage"
          />
        </div>

        {/* Charts */}
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Adults without basic digital skills, UK, 2015–2025"
              subtitle="Adults unable to perform basic digital tasks (e.g. use email, complete forms online, use search). Definition from UKCF Essential Digital Skills Framework."
              series={chart1Series}
              annotations={chart1Annotations}
              yLabel="Value"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Employer digital skills vacancies and bootcamp completions, UK, 2015–2025"
              subtitle="Share of employers reporting difficulty hiring digitally skilled staff (%), and annual completions of government-funded digital skills bootcamps."
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
            value="£22bn"
            unit="Potential GDP gain from closing skills gap"
            description={<>Government-funded digital skills bootcamps delivered 24,000 completions in 2025.<Cite nums={3} /> The Digital Skills Partnership coordinates employer investment in skills training.<Cite nums={2} /> The new Digital Entitlement allows adults without Level 3 digital qualifications to access funded training. UK Cyber Security Council is developing standardised qualifications for the cybersecurity workforce.<Cite nums={2} /></>}
            source="Source: DCMS — UK Digital Strategy, 2025. DfE — Further Education: outcome-based success measures, 2025."
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
