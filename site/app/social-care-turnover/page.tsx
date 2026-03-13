'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'Skills for Care', dataset: 'State of the adult social care sector and workforce in England', url: 'https://www.skillsforcare.org.uk/adult-social-care-workforce-data/Workforce-intelligence/publications/national-information/The-state-of-the-adult-social-care-sector-and-workforce-in-England.aspx', date: '2024' },
  { num: 2, name: 'Home Office', dataset: 'Health and Care Worker visa statistics', url: 'https://www.gov.uk/government/collections/immigration-statistics-quarterly-release', date: '2023' },
  { num: 3, name: 'DHSC', dataset: 'People at the Heart of Care — workforce strategy', url: 'https://www.gov.uk/government/publications/people-at-the-heart-of-care-adult-social-care-reform-white-paper', date: '2021' },
];

// ── Types ────────────────────────────────────────────────────────────────────

interface TurnoverPoint {
  year: number;
  turnoverPct: number;
}

interface VacanciesPoint {
  year: number;
  vacanciesThousands: number;
}

interface PayPoint {
  year: number;
  avgHourlyPay: number;
}

interface CareTurnoverData {
  national: {
    turnoverRate: {
      timeSeries: TurnoverPoint[];
      latestYear: number;
      latestPct: number;
      note: string;
    };
    vacancies: {
      timeSeries: VacanciesPoint[];
      latestYear: number;
      latestThousands: number;
      note: string;
    };
    hourlyPay: {
      timeSeries: PayPoint[];
      latestYear: number;
      latestPay: number;
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

export default function SocialCareTurnoverPage() {
  const [data, setData] = useState<CareTurnoverData | null>(null);

  useEffect(() => {
    fetch('/data/social-care-turnover/care_turnover.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const turnoverSeries: Series[] = data
    ? [{
        id: 'turnover',
        label: 'Staff turnover rate (%)',
        colour: '#F4A261',
        data: data.national.turnoverRate.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.turnoverPct,
        })),
      }]
    : [];

  const vacanciesAndPaySeries: Series[] = data
    ? [
        {
          id: 'vacancies',
          label: 'Unfilled vacancies (thousands)',
          colour: '#E63946',
          data: data.national.vacancies.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.vacanciesThousands,
          })),
        },
      ]
    : [];

  const turnoverAnnotations: Annotation[] = [
    { date: new Date(2021, 5, 1), label: '2021: International recruitment ramps up' },
    { date: new Date(2022, 5, 1), label: '2022: Cost-of-living crisis hits care pay' },
    { date: new Date(2023, 5, 1), label: '2023: Care Workforce Pathway launched' },
  ];

  const vacancyAnnotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: '2020: Pandemic staffing crisis' },
    { date: new Date(2022, 5, 1), label: '2022: Post-pandemic demand surge peaks' },
    { date: new Date(2023, 5, 1), label: '2023: International recruitment reduces gap' },
  ];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Social Care Turnover" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Social Care Workforce Turnover"
          question="Why Can't Social Care Keep Its Workers?"
          finding="Staff turnover in the adult social care sector reached 28.3% in 2024 — one in three workers leaves every year. 131,000 vacancies go unfilled. Average pay is £10.89/hour, barely above minimum wage."
          colour="#F4A261"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              Adult social care employs approximately 1.52 million people in England — more than the NHS — yet it operates with annual staff turnover of 28.3%.<Cite nums={1} /> In practical terms, this means the sector has to replace one in three of its workers every year. The cost of this churn is staggering: Skills for Care estimates recruitment and induction costs of approximately £3,000 per worker, putting the annual recruitment cost burden at around £1 billion.<Cite nums={1} /> The toll on care quality is harder to quantify but no less real: continuity of care is the most important determinant of wellbeing for older people with dementia and complex needs.
            </p>
            <p>
              The fundamental driver is pay. At £10.89 per hour in 2024 — barely above the National Living Wage of £11.44 — care worker pay fails to reflect the skill, physical and emotional demands of the role.<Cite nums={1} /> A supermarket retail assistant or a warehouse picker can earn similar wages with far less relational and clinical complexity. NHS pay rises have compounded the problem by creating a persistent wage gap between NHS healthcare support workers (who do comparable work) and care sector workers, accelerating movement from care into the NHS. International recruitment — driven by a post-Brexit visa regime that admitted 70,000 overseas care workers in 2023 — has partially plugged the gap but raised its own concerns about exploitation and sustainability.<Cite nums={2} />
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-turnover', label: 'Turnover Rate' },
          { id: 'sec-vacancies', label: 'Vacancies' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Annual social care staff turnover"
              value="28.3%"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Up from 25% in 2015 · 1 in 3 workers leaves every year"
              sparklineData={[25.2, 25.9, 26.8, 27.1, 27.8, 27.4, 27.1, 27.6, 28.0, 28.3]}
              href="#sec-turnover"
            />
            <MetricCard
              label="Unfilled care vacancies"
              value="131,000"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Down from peak 155,000 · International recruitment main relief valve"
              sparklineData={[82, 88, 110, 105, 155, 152, 131]}
              href="#sec-turnover"
            />
            <MetricCard
              label="Average care worker hourly pay"
              value="£10.89"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="+33% since 2018 but barely above minimum wage · Real terms flat"
              sparklineData={[8.20, 8.45, 8.72, 9.10, 9.80, 10.40, 10.89]}
              href="#sec-turnover"
            />
          </div>
        

        {/* Charts */}
        <ScrollReveal>
          <section id="sec-turnover" className="mb-12">
            <LineChart
              title="Adult social care staff turnover rate, England, 2015–2024"
              subtitle="Annual turnover as a percentage of the workforce. One in three care workers leaves every year. Turnover costs the sector an estimated £1 billion annually in recruitment and induction."
              series={turnoverSeries}
              annotations={turnoverAnnotations}
              yLabel="Turnover rate (%)"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-vacancies" className="mb-12">
            <LineChart
              title="Unfilled adult social care vacancies, England, 2018–2024"
              subtitle="Estimated vacancies on a given day. Peaked at 155,000 in 2022 as post-pandemic demand surged. Fell to 131,000 by 2024 largely due to international recruitment of overseas care workers."
              series={vacanciesAndPaySeries}
              annotations={vacancyAnnotations}
              yLabel="Thousands"
            />
          </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="What's improving"
            value="Care Workforce Pathway 2023"
            unit=""
            description="The Care Workforce Pathway launched in 2023 introduces a new career structure for care workers with clear progression routes and professional recognition. NHS pay rises have fuelled movement from care to NHS, prompting sector-specific retention strategies including care-specific supplements. Some local authorities are piloting &lsquo;real living wage&rsquo; requirements in their care commissioning contracts. The government's adult social care reform white paper includes long-term workforce investment commitments."
            source="Source: Skills for Care — State of the adult social care sector 2024; DHSC — People at the Heart of Care workforce strategy."
          />
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

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
              <RelatedTopics />
      </main>
    </>
  );
}
