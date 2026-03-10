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

interface DigitalInclusionData {
  national: {
    householdAccess: {
      timeSeries: Array<{ year: number; accessPct: number }>;
      latestYear: number;
      latestPct: number;
    };
    broadbandSpeed: {
      timeSeries: Array<{ year: number; medianMbps: number }>;
      latestYear: number;
      latestMbps: number;
    };
    basicDigitalSkillsByAge: Array<{ ageGroup: string; lackingPct: number }>;
    adultsLackingSkillsMillions: number;
  };
  metadata: {
    sources: Array<{ name: string; dataset: string; url: string; frequency: string }>;
    methodology: string;
    knownIssues: string[];
  };
}

// ── Component ────────────────────────────────────────────────────────────────

export default function DigitalInclusionPage() {
  const [data, setData] = useState<DigitalInclusionData | null>(null);

  useEffect(() => {
    fetch('/data/digital-inclusion/digital_inclusion.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // Derive series for household access chart
  const accessSeries: Series[] = data
    ? [
        {
          id: 'internet-access',
          label: 'Households with internet access',
          colour: '#2A9D8F',
          data: data.national.householdAccess.timeSeries.map(d => ({
            date: new Date(d.year, 0, 1),
            value: d.accessPct,
          })),
        },
      ]
    : [];

  // Derive series for broadband speed chart
  const speedSeries: Series[] = data
    ? [
        {
          id: 'broadband-speed',
          label: 'Median broadband speed',
          colour: '#264653',
          data: data.national.broadbandSpeed.timeSeries.map(d => ({
            date: new Date(d.year, 0, 1),
            value: d.medianMbps,
          })),
        },
      ]
    : [];

  const speedAnnotations: Annotation[] = [
    {
      date: new Date(2020, 3, 1),
      label: '2020: COVID lockdown — demand surge',
    },
  ];

  return (
    <>
      <TopicNav topic="Digital Inclusion" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Digital Inclusion"
          question="Who Is Being Left Behind Online?"
          finding="Around 8 million UK adults lack basic digital skills. 1.5 million households have no internet access. Older adults, disabled people, and those in lower-income households are most affected. The UK ranks 10th in Europe on DESI (Digital Economy and Society Index). Being offline costs an estimated £1,064 per year in higher prices."
          colour="#2A9D8F"
          preposition="with"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Around 8 million UK adults — 15% of the adult population — lack the five essential digital skills defined by the Lloyds/Good Things Foundation framework: communicating, handling information, transacting, problem-solving, and creating online. Exclusion is not uniformly distributed: 51% of adults aged 75 and over lack basic digital skills, compared with 3% of 16–24 year olds. Around 1.5 million households have no internet access at all. Disability is a stronger predictor than age: adults with a disability or long-term health condition are three times more likely to be offline than those without. Those in social housing, with no qualifications, and in the lowest income quintile are most affected.</p>
            <p>Being offline carries a measurable financial penalty. The Good Things Foundation estimates the &ldquo;digital poverty premium&rdquo; at £1,064 a year — the extra cost of buying energy, banking, and shopping through non-online channels. Online-only tariffs for broadband, energy, and insurance are typically 10–30% cheaper. The infrastructure picture has improved sharply: median UK broadband speeds reached 114 Mbps in 2023, up from 27 Mbps in 2018, as full-fibre (FTTP) coverage expanded from 8% of premises in 2019 to 60% in 2024, driven by commercial rollout and the government's Project Gigabit subsidy scheme. But 155,000 rural premises remain without decent broadband of 10 Mbps, and mobile not-spots still cover 3% of UK landmass.</p>
            </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-access', label: 'Internet Access' },
          { id: 'sec-speed', label: 'Broadband Speed' },
          { id: 'sec-skills', label: 'Digital Skills' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Adults without basic digital skills"
              value="8M"
              direction="down"
              polarity="up-is-bad"
              changeText="2023 · Down from 11.3M in 2020 · Older adults, low income, disabled most affected · 1.5M households offline"
              sparklineData={[14.3, 13.0, 12.6, 12.1, 11.3, 10.2, 9.1, 8.0]}
              href="#sec-access"
            />
            <MetricCard
              label="Median UK broadband speed (Mbps)"
              value="114"
              direction="up"
              polarity="up-is-good"
              changeText="2023 · Up from 27 Mbps in 2018 · Full fibre rollout accelerating · Rural &lt;10 Mbps still common"
              sparklineData={[27, 35, 54, 77, 90, 114]}
              href="#sec-access"
            />
            <MetricCard
              label="Cost of being offline (annual)"
              value="£1,064"
              direction="flat"
              polarity="up-is-bad"
              changeText="Per year · Unable to access cheapest online tariffs · Affects energy, banking, shopping · Good Things Foundation estimate"
              sparklineData={[800, 850, 900, 950, 1000, 1064]}
              href="#sec-access"
            />
          </div>
        

        <ScrollReveal>
          <section id="sec-access" className="mb-12">
            <LineChart
              title="Household internet access, 2012–2023"
              subtitle="Percentage of UK households with internet access"
              series={accessSeries}
              yLabel="% households with internet access"
              source={{
                name: 'ONS',
                dataset: 'Internet Access Survey',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-speed" className="mb-12">
            <LineChart
              title="Median broadband speed, 2018–2023"
              subtitle="Median download speed across UK fixed-line connections"
              series={speedSeries}
              yLabel="Median speed (Mbps)"
              annotations={speedAnnotations}
              source={{
                name: 'Ofcom',
                dataset: 'Connected Nations Report',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-skills" className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-2">Adults without basic digital skills by age group</h2>
            <p className="text-sm text-wiah-mid font-mono mb-6">Percentage of adults lacking basic digital skills, UK 2023.</p>
            {data && (
              <div className="space-y-3">
                {data.national.basicDigitalSkillsByAge.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-20 text-sm text-wiah-black flex-shrink-0">{item.ageGroup}</div>
                    <div className="flex-1 bg-wiah-border rounded h-5 overflow-hidden">
                      <div
                        className="h-full rounded"
                        style={{ width: `${(item.lackingPct / 55) * 100}%`, backgroundColor: '#2A9D8F' }}
                      />
                    </div>
                    <div className="w-12 text-right text-sm font-mono text-wiah-black">{item.lackingPct}%</div>
                  </div>
                ))}
              </div>
            )}
            <p className="font-mono text-xs text-wiah-mid mt-4">Source: Good Things Foundation — Essential Digital Skills Framework</p>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="What's improving"
            value="–30%"
            unit="fall in adults without basic digital skills since 2020"
            description="The number of UK adults without basic digital skills has fallen by 30% since 2020, from 11.3 million to 8 million. Median broadband speeds have more than quadrupled since 2018, reaching 114 Mbps. Full fibre (FTTP) coverage reached 60% of UK premises by 2024, up from 8% in 2019, driven by commercial rollout and Project Gigabit subsidy. The Good Things Foundation's National Databank provides free data SIMs to digitally excluded people — it has distributed over 2 million gigabytes to date. NHS App registrations have reached 34 million. The UKCIS (UK Council for Internet Safety) digital skills framework has been adopted by 85% of English local authorities."
            source="Source: Ofcom — Connected Nations 2023; Good Things Foundation — Digital Inclusion Insights 2023; ONS — Internet users UK 2023."
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
