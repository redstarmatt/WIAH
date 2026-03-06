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

interface HighRatedPoint {
  year: number;
  pct4or5: number;
}

interface InspectorPoint {
  year: number;
  inspectorsThousands: number;
}

interface AdmissionsPoint {
  year: number;
  admissionsThousands: number;
}

interface FoodHygieneData {
  national: {
    highRatedBusinesses: {
      timeSeries: HighRatedPoint[];
      latestYear: number;
      latestPct: number;
      note: string;
    };
    foodInspectors: {
      timeSeries: InspectorPoint[];
      latestYear: number;
      latestThousands: number;
      note: string;
    };
    hospitalAdmissions: {
      timeSeries: AdmissionsPoint[];
      latestYear: number;
      latestThousands: number;
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

export default function FoodHygieneCompliancePage() {
  const [data, setData] = useState<FoodHygieneData | null>(null);

  useEffect(() => {
    fetch('/data/food-hygiene-compliance/food_hygiene.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const complianceSeries: Series[] = data
    ? [{
        id: 'compliance',
        label: 'Businesses rated 4 or 5 (%)',
        colour: '#2A9D8F',
        data: data.national.highRatedBusinesses.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.pct4or5,
        })),
      }]
    : [];

  const inspectorSeries: Series[] = data
    ? [{
        id: 'inspectors',
        label: 'Food safety inspectors (thousands)',
        colour: '#264653',
        data: data.national.foodInspectors.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.inspectorsThousands,
        })),
      }]
    : [];

  const complianceAnnotations: Annotation[] = [
    { date: new Date(2019, 5, 1), label: '2019: Pre-pandemic compliance peak' },
    { date: new Date(2020, 5, 1), label: '2020: Pandemic disrupts inspections' },
    { date: new Date(2022, 5, 1), label: '2022: Cost-of-living pressures hit margins' },
  ];

  const inspectorAnnotations: Annotation[] = [
    { date: new Date(2010, 5, 1), label: '2010: Austerity cuts begin' },
    { date: new Date(2021, 5, 1), label: '2021: LA recruitment drive' },
  ];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Food Hygiene Compliance" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Food Hygiene Compliance"
          question="How Clean Is the Food We&apos;re Buying?"
          finding="2.4 million people suffer foodborne illness annually in England. Only 65% of food businesses have a hygiene rating of 4 or 5 (broadly compliant). Local authority food safety teams have been cut by 34% since 2010."
          colour="#6B7280"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              The Food Standards Agency estimates 2.4 million cases of foodborne illness every year in England, causing approximately 180 deaths and 23,000 hospital admissions. Most of this burden is preventable: the primary vectors are Campylobacter (mainly in poultry), Listeria (chilled ready-to-eat foods), and Salmonella (eggs, meat). The hygiene rating system &mdash; the green sticker in takeaway windows and restaurant doors &mdash; is the public&apos;s main proxy for food safety standards. Yet since its 2019 peak, the proportion of businesses achieving the highest ratings has fallen from 76% to 65%.
            </p>
            <p>
              The structural cause is inspector capacity. Since 2010, local authority food safety officer numbers have fallen by a third &mdash; from 4,800 to around 3,200 &mdash; as councils absorbed successive funding reductions. The FSA&apos;s risk-based inspection framework means that low-risk businesses may go uninspected for years; high-risk establishments such as care home kitchens and large food manufacturers are prioritised, but officer shortfalls mean even these are not always inspected on schedule. Post-pandemic pressure &mdash; cost of living squeezing margins, high staff turnover, supply chain substitutions &mdash; has hit compliance precisely when regulatory oversight capacity is weakest.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-compliance', label: 'Compliance Rates' },
          { id: 'sec-inspectors', label: 'Inspector Numbers' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        {/* Metric cards */}
        <ScrollReveal>
          <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Food businesses rated 4&ndash;5 (FSA)"
              value="65%"
              unit=""
              direction="down"
              polarity="up-is-good"
              changeText="Down from 76% in 2019 &middot; Pandemic and cost pressures"
              sparklineData={[71, 73, 74, 75, 76, 72, 68, 65, 65, 65]}
              href="#sec-compliance"
            />
            <MetricCard
              label="Food safety inspectors remaining"
              value="3,200"
              unit=""
              direction="down"
              polarity="up-is-bad"
              changeText="Down 33% from 4,800 in 2010 &middot; Risk-based inspection stretched"
              sparklineData={[4.8, 4.4, 4.0, 3.7, 3.5, 3.4, 3.3, 3.2, 3.2, 3.1, 3.1, 3.0, 3.0, 3.1, 3.2]}
              href="#sec-compliance"
            />
            <MetricCard
              label="Annual food poisoning hospitalisations"
              value="25,000"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Up from 22,000 in 2018 &middot; Campylobacter and Listeria main causes"
              sparklineData={[22, 23, 18, 21, 23, 24, 25]}
              href="#sec-compliance"
            />
          </div>
        </ScrollReveal>

        {/* Charts */}
        <ScrollReveal>
          <section id="sec-compliance" className="mb-12">
            <LineChart
              title="Food businesses rated 4&ndash;5 by FSA, England, 2015&ndash;2024"
              subtitle="Percentage of food businesses achieving a Food Hygiene Rating Scheme score of 4 (good) or 5 (very good). A falling rate means a higher proportion of businesses have substandard hygiene."
              series={complianceSeries}
              annotations={complianceAnnotations}
              yLabel="% rated 4 or 5"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-inspectors" className="mb-12">
            <LineChart
              title="Local authority food safety inspectors, England, 2010&ndash;2024"
              subtitle="Full-time equivalent food safety officers employed by local authorities. Down 33% from 4,800 to 3,200 since 2010. Recovery since 2022 has been partial."
              series={inspectorSeries}
              annotations={inspectorAnnotations}
              yLabel="Thousands (FTE)"
            />
          </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="What&apos;s improving"
            value="Regulating Our Future"
            unit=""
            description="The Food Standards Agency&apos;s Regulating Our Future programme moves to risk-based inspection using business compliance data and real-time monitoring. Wales mandates FSA rating display on all food businesses; England has &lsquo;scores on the doors&rsquo; as voluntary. Pressure is growing for mandatory display in England. The FSA&apos;s new Food Crime Unit has strengthened fraud detection. Campylobacter on retail chicken has fallen from 73% to 56% surface contamination as a result of biosecurity controls on farms."
            source="Source: FSA &mdash; Food hygiene rating scheme statistics 2024; FSA Regulating Our Future programme update."
          />
        </ScrollReveal>

        {/* Sources */}
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
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
