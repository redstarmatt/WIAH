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

interface VaccinationData {
  national: {
    mmrUptake: {
      timeSeries: Array<{ year: string; uptakePct: number }>;
      latestYear: string;
      latestPct: number;
      herdImmunityThresholdPct: number;
    };
    otherVaccines: {
      timeSeries: Array<{ year: string; dtapPct: number; menBPct: number }>;
    };
    byRegion: Array<{ region: string; mmrPct: number }>;
  };
  metadata: {
    sources: Array<{ name: string; dataset: string; url: string; frequency: string }>;
    methodology: string;
    knownIssues: string[];
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function fyToDate(fy: string): Date {
  const start = parseInt(fy.split('/')[0]);
  return new Date(start, 3, 1);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function NHSVaccinationPage() {
  const [data, setData] = useState<VaccinationData | null>(null);

  useEffect(() => {
    fetch('/data/nhs-vaccination/nhs_vaccination.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const mmrSeries: Series[] = data
    ? [{
        id: 'mmr',
        label: 'MMR uptake at age 2 (%)',
        colour: '#2A9D8F',
        data: data.national.mmrUptake.timeSeries.map(d => ({
          date: fyToDate(d.year),
          value: d.uptakePct,
        })),
      }]
    : [];

  const mmrTargetLine = data ? { value: data.national.mmrUptake.herdImmunityThresholdPct, label: 'WHO herd immunity threshold' } : undefined;

  const dtapSeries: Series[] = data
    ? [
        {
          id: 'dtap',
          label: 'DTaP (primary course)',
          colour: '#2A9D8F',
          data: data.national.otherVaccines.timeSeries.map(d => ({
            date: fyToDate(d.year),
            value: d.dtapPct,
          })),
        },
        {
          id: 'menb',
          label: 'MenB (primary course)',
          colour: '#264653',
          data: data.national.otherVaccines.timeSeries.map(d => ({
            date: fyToDate(d.year),
            value: d.menBPct,
          })),
        },
      ]
    : [];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="NHS Vaccination" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="NHS Vaccination"
          question="Are Vaccine Uptake Rates High Enough to Prevent Outbreaks?"
          finding="MMR (measles, mumps, rubella) vaccine uptake in 2-year-olds fell to 89% in 2023 &mdash; below the 95% herd immunity threshold for the first time since 2011. The UK lost its WHO measles-free status in 2019. Childhood immunisation rates have fallen across all vaccines since 2013. A measles outbreak in Birmingham in early 2024 infected over 300 children."
          colour="#2A9D8F"
          preposition="in"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>England&apos;s MMR vaccination rate stood at 89.3% for two doses by age 5 in 2022/23 &mdash; more than five percentage points below the 95% herd immunity threshold &mdash; and the UK lost its WHO measles-free status in 2019. In the year to October 2024 England notified 2,978 measles cases, the highest annual total in three decades; a Birmingham outbreak in early 2024 infected over 300 children. Whooping cough is also resurgent, with 15,000 confirmed cases in 2024 and at least 10 infant deaths. DTaP coverage has fallen to 91.7% from 95.2% in 2016/17. COVID-19 compounded the problem: areas with high COVID vaccine refusal saw correlated declines in routine childhood immunisation, affecting 2020 and 2021 birth cohorts. UKHSA&apos;s MMR Vaccine Equity Programme is targeting 3.4 million children estimated to have missed doses since 2019, and a targeted Birmingham campaign achieved a 40% uptake increase within six weeks.</p>
            <p>The geography of under-vaccination reflects deprivation, transience, and community trust. Inner London boroughs &mdash; Hackney, Newham, Tower Hamlets &mdash; record MMR uptake below 80%, driven by population turnover, fragmented GP registration, and hesitancy rooted in the since-retracted Wakefield MMR-autism paper. Orthodox Jewish, Somali, and Roma communities are among the most under-vaccinated, each for distinct reasons. Coastal towns with transient populations &mdash; Blackpool, Great Yarmouth, Thanet &mdash; also fall well below threshold. Childhood vaccination depends entirely on GP-based delivery in England; where registration is incomplete or appointment access poor, children fall through without an alternative pathway.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-mmr', label: 'MMR' },
          { id: 'sec-other', label: 'Other Vaccines' },
          { id: 'sec-regions', label: 'By Region' },
        ]} />

        <ScrollReveal>
          <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="MMR vaccine uptake at age 2 (England)"
              value="89.3%"
              direction="down"
              polarity="up-is-good"
              changeText="2022/23 &middot; Below 95% herd immunity threshold &middot; Down from 92.3% in 2012/13 &middot; UK lost measles-free status 2019"
              sparklineData={[92.3, 92.7, 92.3, 91.9, 91.6, 91.2, 90.3, 89.8, 89.2, 89.0, 89.3]}
              onExpand={() => {}}
            />
            <MetricCard
              label="MMR uptake in London (lowest region)"
              value="84.1%"
              direction="down"
              polarity="up-is-good"
              changeText="2022/23 &middot; 11pp below herd immunity threshold &middot; Some boroughs below 80% &middot; Birmingham outbreak 2024: 300+ cases"
              sparklineData={[88, 87, 86, 85, 84, 83, 82, 81, 80, 81, 84.1]}
              onExpand={() => {}}
            />
            <MetricCard
              label="DTaP primary course completion"
              value="91.7%"
              direction="down"
              polarity="up-is-good"
              changeText="2022/23 &middot; Down from 95.2% in 2016/17 &middot; Pertussis (whooping cough) cases rising &middot; COVID disrupted infant vaccination schedules"
              sparklineData={[95.2, 94.8, 94.3, 93.7, 91.8, 91.5, 91.7]}
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-mmr" className="mb-12">
            <LineChart
              title="MMR vaccine uptake at age 2, England, 2012/13&ndash;2022/23"
              subtitle="Percentage of children turning 2 in the financial year who had received MMR1 by their second birthday."
              series={mmrSeries}
              targetLine={mmrTargetLine}
              yLabel="Uptake (%)"
              source={{
                name: 'NHS Digital',
                dataset: 'Childhood Vaccination Coverage Statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-other" className="mb-12">
            <LineChart
              title="DTaP and MenB vaccine uptake, England, 2016/17&ndash;2022/23"
              subtitle="Percentage of children completing primary course by 12 months: diphtheria, tetanus, acellular pertussis (DTaP) and meningococcal B (MenB)."
              series={dtapSeries}
              yLabel="Uptake (%)"
              source={{
                name: 'NHS Digital',
                dataset: 'Childhood Vaccination Coverage Statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-regions" className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-2">MMR vaccine uptake by NHS region, England, 2022/23</h2>
            <p className="text-sm text-wiah-mid font-mono mb-6">Percentage of 2-year-olds with MMR vaccine uptake by region. The 95% threshold is needed for herd immunity against measles.</p>
            {data && (
              <div className="space-y-3">
                {data.national.byRegion.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-40 text-sm text-wiah-black flex-shrink-0">{item.region}</div>
                    <div className="flex-1 bg-wiah-border rounded h-5 overflow-hidden">
                      <div
                        className="h-full rounded"
                        style={{ width: `${(item.mmrPct / 92.8) * 100}%`, backgroundColor: '#2A9D8F' }}
                      />
                    </div>
                    <div className="w-16 text-right text-sm font-mono text-wiah-black">{item.mmrPct}%</div>
                  </div>
                ))}
              </div>
            )}
            <p className="font-mono text-xs text-wiah-mid mt-4">Source: NHS Digital &mdash; Childhood Vaccination Coverage Statistics 2022/23</p>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="What&apos;s improving"
            value="95%"
            unit="MMR uptake target &mdash; achievable through targeted catch-up campaigns in low-uptake areas"
            description="UKHSA&apos;s MMR Vaccine Equity Programme, launched in 2024, is targeting the 3.4 million children and young people estimated to have missed MMR doses since 2019. NHS England has deployed vaccine buses and pop-up clinics across London, the West Midlands, and other low-uptake areas. The Birmingham measles outbreak (January&ndash;March 2024) accelerated a targeted vaccination push that achieved a 40% increase in MMR uptake in affected areas within six weeks. School entry checks, where children&apos;s vaccination records are reviewed, are being strengthened. The COVID-19 vaccination programme demonstrated that when logistical barriers are removed, uptake can reach 95%+ rapidly."
            source="Source: NHS Digital &mdash; Childhood Vaccination Coverage Statistics 2022/23; UKHSA &mdash; Measles Outbreak Update 2024."
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
