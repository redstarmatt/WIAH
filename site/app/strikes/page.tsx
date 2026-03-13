'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import RelatedTopics from '@/components/RelatedTopics';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'ONS', dataset: 'Labour Disputes — Working Days Lost', url: 'https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/workplacedisputesandworkingconditions/datasets/labourdisputesinternationalagreementsonworkingdayslostworkersinvolvedanddisputesinprogressuk', date: '2024', note: '3.75M days lost in 2023 — highest since 1989; 784K in 2024' },
  { num: 2, name: 'ONS', dataset: 'Average Weekly Earnings — Public Sector', url: 'https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/earningsandworkinghours/bulletins/averageweeklyearningsingreatbritain/latest', date: '2024', note: 'CPI hit 11.1% Oct 2022; real wages down 4% in a single year; +3.2% recovery in 2024' },
  { num: 3, name: 'NHS England / BMA', dataset: 'Industrial Action Impact Data', date: '2024', note: 'NHS accounted for 614K+ lost days; BMA junior doctors 11 separate stoppages; settlements 5-6% average' },
];

// ── Types ────────────────────────────────────────────────────────────────────

interface DaysLostPoint {
  year: number;
  daysLostThousands: number;
}

interface WorkersPoint {
  year: number;
  workersInvolved: number;
}

interface RealPayPoint {
  year: number;
  publicSectorRealPayPctChange: number;
}

interface SectorPoint {
  sector: string;
  daysLostThousands: number;
}

interface StrikesData {
  topic: string;
  lastUpdated: string;
  national: {
    workingDaysLost: {
      timeSeries: DaysLostPoint[];
      latestYear: number;
      latestDaysLostThousands: number;
      peak2023: number;
    };
    workers: {
      timeSeries: WorkersPoint[];
    };
    bySector: {
      latestYear: string;
      sectors: SectorPoint[];
    };
    realPayGrowth: {
      timeSeries: RealPayPoint[];
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

export default function StrikesPage() {
  const [data, setData] = useState<StrikesData | null>(null);

  useEffect(() => {
    fetch('/data/strikes/strikes.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const daysLostSeries: Series[] = data
    ? [{
        id: 'days-lost',
        label: 'Working days lost (thousands)',
        colour: '#E63946',
        data: data.national.workingDaysLost.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.daysLostThousands,
        })),
      }]
    : [];

  const daysLostAnnotations: Annotation[] = [
    { date: new Date(2011, 5, 1), label: '2011: Pension reforms strike' },
    { date: new Date(2023, 5, 1), label: '2023: 3.7M days lost' },
  ];

  const workersSeries: Series[] = data
    ? [{
        id: 'workers',
        label: 'Workers involved (thousands)',
        colour: '#F4A261',
        data: data.national.workers.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.workersInvolved / 1000,
        })),
      }]
    : [];

  const realPaySeries: Series[] = data
    ? [{
        id: 'real-pay',
        label: 'Public sector real pay growth (%)',
        colour: '#264653',
        data: data.national.realPayGrowth.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.publicSectorRealPayPctChange,
        })),
      }]
    : [];

  const realPayAnnotations: Annotation[] = [
    { date: new Date(2022, 5, 1), label: '2022: Real pay −4%' },
  ];

  // ── Metric cards ──────────────────────────────────────────────────────

  const daysLostMetric = {
    label: 'Working days lost to strikes',
    value: '784K',
    polarity: 'up-is-bad' as const,
    direction: 'down' as const,
    changeText: '2024 · Down from 3.75M in 2023 · Post-pandemic peak largely resolved',
    sparklineData: [365, 1389, 249, 788, 170, 273, 234, 178, 546, 2487, 3749, 784],
  };

  const workersMetric = {
    label: 'Workers involved in industrial action',
    value: '248K',
    polarity: 'up-is-bad' as const,
    direction: 'down' as const,
    changeText: '2024 · Down from 1.04M in 2023 · Public sector settlements reached',
    sparklineData: [122, 1452, 173, 432, 81, 145, 64, 53, 244, 843, 1042, 248],
  };

  const payMetric = {
    label: 'Public sector real pay growth',
    value: '+3.2%',
    polarity: 'up-is-good' as const,
    direction: 'up' as const,
    changeText: '2024 · Recovery after −4.0% in 2022 · Key driver of dispute resolution',
    sparklineData: [1.2, 2.1, -1.5, -4.0, 1.8, 3.2],
  };

  return (
    <main className="bg-white">
      {/* Sticky nav */}
      <TopicNav topic="Strikes" />

      {/* Topic header */}
      <TopicHeader
        topic="Strikes"
        colour="#E63946"
        question="Is Britain Actually in the Grip of a Strike Wave?"
        finding="The UK experienced the largest wave of industrial action since the 1970s in 2022–23, with 3.75 million working days lost — the highest since 1989 — but the strike wave has largely resolved as public sector pay deals were reached."
      />

      {/* Finding */}
      <section className="max-w-3xl mx-auto px-6 py-12">
        <p className="text-lg leading-relaxed text-wiah-black">
          The UK experienced the largest wave of industrial action since the 1970s in 2022–23. Working days lost peaked at 3.75 million in 2023 — the highest since 1989 — driven by public sector workers fighting real-terms pay cuts. The strike wave has now largely resolved, but the underlying tensions remain.
        </p>
      </section>

      {/* Metric cards */}
      <section className="max-w-4xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <ScrollReveal>
            <MetricCard
              label={daysLostMetric.label}
              value={daysLostMetric.value}
              direction={daysLostMetric.direction}
              polarity={daysLostMetric.polarity}
              changeText={daysLostMetric.changeText}
              sparklineData={daysLostMetric.sparklineData}
            />
          </ScrollReveal>
          <ScrollReveal>
            <MetricCard
              label={workersMetric.label}
              value={workersMetric.value}
              direction={workersMetric.direction}
              polarity={workersMetric.polarity}
              changeText={workersMetric.changeText}
              sparklineData={workersMetric.sparklineData}
            />
          </ScrollReveal>
          <ScrollReveal>
            <MetricCard
              label={payMetric.label}
              value={payMetric.value}
              direction={payMetric.direction}
              polarity={payMetric.polarity}
              changeText={payMetric.changeText}
              sparklineData={payMetric.sparklineData}
            />
          </ScrollReveal>
        </div>
      </section>


      {/* Chart 1: Days lost */}
      <ScrollReveal>
        <section className="max-w-4xl mx-auto px-6 py-12">
          <LineChart
            title="Working days lost to strikes, UK, 2010–2024"
            subtitle="Thousands of working days lost per year. Surged to 3.75 million in 2023 — the highest since 1989 and driven by public sector pay disputes after two years of real-terms pay cuts."
            series={daysLostSeries}
            annotations={daysLostAnnotations}
            source={{
              name: 'ONS',
              dataset: 'Labour disputes: working days lost',
              frequency: 'annual',
              url: 'https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/workplacedisputesandworkingconditions/datasets/labourdisputesinternationalagreementsonworkingdayslostworkersinvolvedanddisputesinprogressuk',
            }}
          />
        </section>
      </ScrollReveal>

      {/* Chart 2: Workers */}
      <ScrollReveal>
        <section className="max-w-4xl mx-auto px-6 py-12">
          <LineChart
            title="Workers involved in industrial action, UK, 2010–2024"
            subtitle="Number of workers taking strike action per year. 2023 saw 1.04 million workers involved — from rail workers and nurses to teachers and civil servants."
            series={workersSeries}
            source={{
              name: 'ONS',
              dataset: 'Labour disputes: workers involved',
              frequency: 'annual',
              url: 'https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/workplacedisputesandworkingconditions/datasets/labourdisputesinternationalagreementsonworkingdayslostworkersinvolvedanddisputesinprogressuk',
            }}
          />
        </section>
      </ScrollReveal>

      {/* Chart 3: Real pay */}
      <ScrollReveal>
        <section className="max-w-4xl mx-auto px-6 py-12">
          <LineChart
            title="Public sector real pay growth, 2019–2024"
            subtitle="Year-on-year change in real (inflation-adjusted) public sector pay. The sharp fall in 2021–22 as inflation surged was the primary cause of the 2022–23 strike wave."
            series={realPaySeries}
            annotations={realPayAnnotations}
            source={{
              name: 'ONS',
              dataset: 'Average Weekly Earnings, public sector',
              frequency: 'monthly',
              url: 'https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/earningsandworkinghours/bulletins/averageweeklyearningsingreatbritain/latest',
            }}
          />
        </section>
      </ScrollReveal>

      {/* Editorial context */}
      <section className="max-w-3xl mx-auto px-6 py-12 space-y-6">
        <p className="text-base leading-relaxed text-wiah-black">
          Working days lost to strikes reached 3.75 million in 2023—the highest annual total since 1989 and a near-tenfold increase from pre-pandemic levels of roughly 300,000.<Cite nums={1} /> More than one million workers walked out across rail, the NHS, education, the civil service, and Royal Mail, making it the broadest wave of industrial action since the 1970s. The trigger was uniform: CPI inflation hit 11.1% in October 2022 while public sector pay offers stayed well below, leaving real wages down 4% in a single year.<Cite nums={2} /> Workers who had accepted a decade of restraint found their living standards collapsing.
        </p>
        <p className="text-base leading-relaxed text-wiah-black">
          The NHS accounted for more than 614,000 of those lost days. BMA junior doctors staged 11 separate stoppages—the longest sustained industrial action in NHS history—demanding a 35% pay restoration to reverse a decade of real-terms erosion.<Cite nums={3} /> The Royal College of Nursing called its first-ever strike. Consultants, ambulance workers, and physiotherapists followed, paralysing services across 2022—23. Settlements arrived in 2024: multi-year awards averaging 5–6% for most NHS staff, enough to end the walkouts but well short of the BMA's original claim.<Cite nums={3} />
        </p>
        <p className="text-base leading-relaxed text-wiah-black">
          The wave has subsided but not vanished. Days lost fell to 784,000 in 2024—an 80% drop from the peak yet still double to triple the 2015–20 baseline of 100,000–300,000.<Cite nums={1} /> The price of settlement was high: an estimated £4–6 billion in additional public sector pay commitments. Government responded with the Minimum Service Levels Act 2023, imposing legal floors on staffing during strikes in transport, health, and education—legislation unions have challenged in the courts. Whether fiscal pressure forces another round of pay restraint remains the unresolved question.
        </p>
      </section>

      {/* Positive callout */}
      <ScrollReveal>
        <section className="max-w-3xl mx-auto px-6 py-12">
          <PositiveCallout
            title="What's improving"
            value="+3.2%"
            unit="real pay growth in public sector, 2024"
            description="Public sector workers received real pay increases of 3.2% in 2024 — the strongest in a decade and above CPI inflation. This reversed two years of real-terms cuts and was the primary reason the 2022–23 strike wave resolved. The pay review body process, which sets pay for NHS staff, teachers, police, and the armed forces, recommended above-inflation increases in 2024. The gap between public and private sector pay, which had widened sharply, has partially closed."
            source="Source: ONS — Average Weekly Earnings, public sector, 2024."
          />
        </section>
      </ScrollReveal>

      <div className="mt-6 max-w-3xl mx-auto px-6">
        <References items={editorialRefs} />
      </div>

      {/* Sources */}
      <section className="max-w-3xl mx-auto px-6 py-12">
        <h2 className="font-sans text-xl font-bold text-wiah-black mb-6">Sources</h2>
        {data && (
          <ul className="space-y-3 font-mono text-sm text-wiah-mid">
            {data.metadata.sources.map((src, idx) => (
              <li key={idx}>
                <strong>{src.name}</strong> — {src.dataset}
                <br />
                <a
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-wiah-blue hover:underline break-all"
                >
                  {src.url}
                </a>
                <br />
                Updated {src.frequency}
              </li>
            ))}
          </ul>
        )}
      </section>

            <RelatedTopics />
      </main>
  );
}
