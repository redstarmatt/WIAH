'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

// ── Types ─────────────────────────────────────────────────────────────────────

interface GapPoint {
  year: number;
  gapGrades: number | null;
}

interface SpendPoint {
  year: number;
  totalBn: number;
}

interface PerPupilPoint {
  year: number;
  amount: number;
}

interface PupilPremiumData {
  attainmentGap: GapPoint[];
  pupilPremiumSpend: SpendPoint[];
  perPupilAmount: PerPupilPoint[];
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function PupilPremiumPage() {
  const [data, setData] = useState<PupilPremiumData | null>(null);

  useEffect(() => {
    fetch('/data/pupil-premium/pupil_premium.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const gapSeries: Series[] = data
    ? [
        {
          id: 'attainment-gap',
          label: 'Attainment gap (pp)',
          colour: '#F4A261',
          data: data.attainmentGap
            .filter(d => d.gapGrades !== null)
            .map(d => ({
              date: new Date(d.year, 0, 1),
              value: d.gapGrades as number,
            })),
        },
      ]
    : [];

  return (
    <>
      <TopicNav topic="Pupil Premium" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Pupil Premium"
          question="Is the Pupil Premium actually closing the attainment gap?"
          finding="The Pupil Premium has invested £2.9 billion per year to close the attainment gap between disadvantaged pupils and their peers. The gap narrowed 4 percentage points from 2011–2019, but COVID widened it again. An 18-point gap still remains."
          colour="#F4A261"
        />

        <section className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              The Pupil Premium, introduced in 2011, gives schools additional funding for
              every pupil who has been eligible for free school meals at any point in the past
              six years. The current rate is £1,480 per primary-aged pupil and £1,050 per
              secondary-aged pupil. The total spend has grown from £0.6 billion in 2012 to
              £2.9 billion in 2024. It is the largest targeted education intervention in
              England's history, designed specifically to close the gap between disadvantaged
              children and their better-off peers.
            </p>
            <p>
              In the years before COVID-19, the intervention showed real results. The
              attainment gap at GCSE — measured as the difference in point scores between
              pupils eligible for free school meals and all other pupils — narrowed from
              19.4 percentage points in 2011 to 17.1 in 2019. That is genuine progress,
              attributable in part to evidence-based interventions like structured tutoring,
              high-quality early language work, and targeted reading programmes identified
              by the Education Endowment Foundation (EEF).
            </p>
            </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-gap', label: 'Attainment Gap' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="GCSE attainment gap (FSM vs non-FSM)"
              value="18.0"
              unit="pp"
              direction="flat"
              polarity="up-is-bad"
              changeText="Progress made 2011–19 reversed by COVID · back near 2011 levels"
              sparklineData={[19.4, 18.7, 17.9, 17.2, 17.1, 18.4, 18.0]}
              source="DfE KS4 Attainment Statistics · 2023"
            />
            <MetricCard
              label="Annual Pupil Premium spend"
              value="£2.9bn"
              unit="/yr"
              direction="up"
              polarity="up-is-good"
              changeText="Up from £0.6bn in 2012 · largest targeted education intervention"
              sparklineData={[0.6, 2.3, 2.5, 2.6, 2.7, 2.9]}
              source="DfE Pupil Premium · 2024"
            />
            <MetricCard
              label="Pupil Premium per pupil (2024)"
              value="£1,480"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="Up from £488 in 2011 · FSM pupils receive additional £1,480/yr"
              sparklineData={[488, 935, 1320, 1385, 1480]}
              source="DfE Pupil Premium Allocations · 2024"
            />
          </div>
        

        <ScrollReveal>
          <div id="sec-gap" className="mb-12">
            <LineChart
              series={gapSeries}
              title="GCSE attainment gap: disadvantaged vs non-disadvantaged pupils, 2011–2023"
              subtitle="Percentage point gap in GCSE grades between FSM-eligible pupils and their peers."
              yLabel="Gap in percentage points"

              annotations={[
                { date: new Date(2011, 0), label: '2011: Pupil Premium launched' },
                { date: new Date(2020, 2), label: '2020: COVID-19' },
              ]}
            />
            <p className="font-mono text-[11px] text-wiah-mid mt-2">
              Source:{' '}
              <a
                href="https://explore-education-statistics.service.gov.uk/find-statistics/key-stage-4-performance"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-wiah-black"
              >
                DfE — Key Stage 4 Attainment Statistics
              </a>{' '}
              · Annual
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div id="sec-sources" className="border-t border-wiah-border pt-8 mt-8">
            <h2 className="text-base font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
            <ul className="font-mono text-[11px] text-wiah-mid space-y-2">
              <li>
                <a
                  href="https://explore-education-statistics.service.gov.uk/find-statistics/key-stage-4-performance"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-wiah-black"
                >
                  DfE — Key Stage 4 Attainment Statistics
                </a>{' '}
                · Annual
              </li>
              <li>
                <a
                  href="https://educationendowmentfoundation.org.uk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-wiah-black"
                >
                  Education Endowment Foundation — Teaching and Learning Toolkit
                </a>
              </li>
            </ul>
          </div>
        </ScrollReveal>
              <RelatedTopics />
      </main>
    </>
  );
}
