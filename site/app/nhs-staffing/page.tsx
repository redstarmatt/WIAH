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

interface VacancyPoint {
  date: string;
  vacanciesThousands: number;
}

interface SicknessPoint {
  year: string;
  sicknessDaysPerStaff: number;
  stressRelatedPct: number;
}

interface IntlRecruitPoint {
  year: number;
  intlNurseJoiners: number;
}

interface WorkforcePoint {
  date: string;
  totalFTEThousands: number;
}

interface NHSStaffingData {
  national: {
    vacancies: {
      timeSeries: VacancyPoint[];
      latestDate: string;
      latestVacancies: number;
    };
    sicknessBurnout: {
      timeSeries: SicknessPoint[];
      latestYear: string;
      latestSicknessPerStaff: number;
      latestStressRelatedPct: number;
    };
    internationalRecruitment: {
      timeSeries: IntlRecruitPoint[];
      latestYear: number;
      note: string;
    };
    workforceSize: {
      timeSeries: WorkforcePoint[];
      latestDate: string;
      latestFTE: number;
    };
  };
  metadata: {
    sources: { name: string; dataset: string; url: string; frequency: string }[];
    methodology: string;
    knownIssues: string[];
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function monthToDate(dateStr: string): Date {
  const [year, month] = dateStr.split('-');
  return new Date(parseInt(year), parseInt(month) - 1, 1);
}

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

function fyToDate(fy: string): Date {
  const [startYear] = fy.split('/');
  return new Date(parseInt(startYear), 3, 1);
}

function fmtNum(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return String(n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function NHSStaffingPage() {
  const [data, setData] = useState<NHSStaffingData | null>(null);

  useEffect(() => {
    fetch('/data/nhs-staffing/nhs_staffing.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  // 1. Vacancies over time
  const vacancySeries: Series[] = data
    ? [{
        id: 'vacancies',
        label: 'NHS vacancies (thousands)',
        colour: '#E63946',
        data: data.national.vacancies.timeSeries.map(d => ({
          date: monthToDate(d.date),
          value: d.vacanciesThousands,
        })),
      }]
    : [];

  const vacancyAnnotations: Annotation[] = [
    { date: new Date(2022, 8, 1), label: '2022: Peak 133,500 vacancies' },
  ];

  // 2. Sickness and stress
  const sicknessSeries: Series[] = data
    ? [{
        id: 'sickness',
        label: 'Sickness days per staff member',
        colour: '#F4A261',
        data: data.national.sicknessBurnout.timeSeries.map(d => ({
          date: fyToDate(d.year),
          value: d.sicknessDaysPerStaff,
        })),
      }]
    : [];

  const stressSeries: Series[] = data
    ? [{
        id: 'stress',
        label: 'Stress-related sickness (%)',
        colour: '#E63946',
        data: data.national.sicknessBurnout.timeSeries.map(d => ({
          date: fyToDate(d.year),
          value: d.stressRelatedPct,
        })),
      }]
    : [];

  const sicknessAnnotations: Annotation[] = [
    { date: new Date(2020, 3, 1), label: '2020/21: COVID spike' },
  ];

  // 3. International recruitment
  const intlRecruitSeries: Series[] = data
    ? [{
        id: 'intl',
        label: 'International nurse joiners',
        colour: '#264653',
        data: data.national.internationalRecruitment.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.intlNurseJoiners,
        })),
      }]
    : [];

  const intlAnnotations: Annotation[] = [
    { date: new Date(2022, 5, 1), label: '2022: Record overseas recruitment' },
  ];

  // ── Metric values ────────────────────────────────────────────────────────

  const latestVacancies = data?.national.vacancies.latestVacancies;

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="NHS Staffing" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="NHS Staffing"
          question="Is the NHS Actually Running Out of Staff?"
          finding={
            latestVacancies
              ? `The NHS has ${fmtNum(latestVacancies)} unfilled posts \u2014 equivalent to 1 in 12 posts \u2014 but the workforce is the largest in history.`
              : 'The NHS faces a staffing crisis despite record workforce size.'
          }
          colour="#E63946"
          preposition="in the"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              The NHS employs 1.278 million FTE staff &mdash; its largest workforce ever &mdash; but 104,300 posts were vacant as of September 2024 (down from a record 133,500 in 2022), with 43,553 nursing posts unfilled. International recruitment temporarily plugged the gap: 40,123 overseas nurses joined the NMC register in 2023, outnumbering domestic UK-trained joiners, but that fell to 26,841 in 2024 following visa rule changes and WHO ethical recruitment constraints. The workforce is under severe strain: NHS sickness absence runs at 5.57% &mdash; nearly three times the private-sector rate &mdash; with stress, anxiety, and depression accounting for 34.6% of absences. In 2023, around 40,000 nurses left the NMC register without another UK employer, 9,000 emigrating to Australia, New Zealand, and Canada. The 2023 Long-Term Workforce Plan promises to double domestic medical school places, but the pipeline takes three to four years to deliver qualified staff and the plan is only partially funded.
            </p>
            <p>
              Shortages are concentrated in the specialisms already under greatest pressure. Mental health nursing carries a 16.2% vacancy rate; learning disability nursing 13.4%. Rural and coastal trusts &mdash; ambulance services in the South West, community hospitals in Norfolk and Cumbria &mdash; report vacancy rates above 15%, unable to compete for staff against urban trusts with more career progression. One in four nurses is within ten years of retirement; 30% of GPs are over 55. Agency spending of &pound;3.0 billion in 2022/23 fills immediate gaps at roughly three times the cost of permanent staff, diverting funds from the training and retention that would reduce the underlying dependency. Safe nurse-to-patient ratios remain unlegislated in England, meaning the consequences of understaffing are absorbed silently in longer waits and elevated risk.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-vacancies', label: 'Vacancies' },
          { id: 'sec-burnout', label: 'Burnout' },
          { id: 'sec-recruitment', label: 'Recruitment' },
        ]} />

        {/* Metric cards */}
        <ScrollReveal>
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="NHS vacancies"
            value="104,300"
            unit=""
            direction="down"
            polarity="up-is-bad"
            changeText="Sep 2024 · Down from 133,500 peak · Still historically very high"
            sparklineData={[78.8, 86.2, 107.7, 103.1, 85.3, 105.7, 133.5, 121.1, 104.3]}
            onExpand={() => {}}
          />
          <MetricCard
            label="Sickness days per staff"
            value="13.8"
            unit="days/year"
            direction="up"
            polarity="up-is-bad"
            changeText="2023/24 · 34.6% stress-related · High burnout reflects workload pressure"
            sparklineData={[11.5, 11.8, 12.0, 12.3, 12.7, 17.3, 16.1, 14.2, 13.8]}
            onExpand={() => {}}
          />
          <MetricCard
            label="International nurses joining NMC"
            value="26,841"
            unit=""
            direction="down"
            polarity="up-is-good"
            changeText="2024 · Down from record 40,123 in 2023 · Visa changes and WHO restrictions"
            sparklineData={[6389, 3519, 6103, 10843, 17942, 22906, 35765, 40123, 26841].map(v => v / 1000)}
            onExpand={() => {}}
          />
        </div>
        </ScrollReveal>

        {/* Charts */}
        <ScrollReveal>
        <section id="sec-vacancies" className="mb-12">
          <LineChart
            title="NHS vacancies, England, 2016–2024"
            subtitle="Estimated unfilled posts at end of each quarter. Peaked at 133,500 in 2022 — equivalent to 1 in 9 posts unfilled. Has improved but remains historically very high."
            series={vacancySeries}
            annotations={vacancyAnnotations}
            yLabel="Thousands"
          />
        </section>
        </ScrollReveal>

        <ScrollReveal>
        <section id="sec-burnout" className="mb-12">
          <LineChart
            title="NHS sickness absence, 2015–2024"
            subtitle="Average sickness days per staff member per year. Over a third are stress, anxiety, or depression-related — a signal of workforce burnout."
            series={[...sicknessSeries, ...stressSeries]}
            annotations={sicknessAnnotations}
            yLabel="Days / %"
          />
        </section>
        </ScrollReveal>

        <ScrollReveal>
        <section id="sec-recruitment" className="mb-12">
          <LineChart
            title="International nurses joining the NMC register, 2016–2024"
            subtitle="Overseas-trained nurses joining the UK nursing register. Grew exponentially 2019–2023; declining sharply in 2024 due to visa restrictions and WHO ethical recruitment concerns."
            series={intlRecruitSeries}
            annotations={intlAnnotations}
            yLabel="Joiners"
          />
        </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
        <PositiveCallout
          title="What&apos;s improving"
          value="1.278M"
          unit="NHS FTE — the largest in history"
          description="Despite the staffing crisis, the total NHS workforce has grown every year since 2016 — from 1.121 million FTE to 1.278 million, an increase of 157,000. The workforce is bigger than it has ever been. The challenge is that demand has grown even faster, and that international recruitment is not a sustainable long-term strategy. The NHS Long Term Workforce Plan (2023) is the first attempt to project and plan supply 15 years ahead."
          source="Source: NHS England &mdash; NHS Workforce Statistics, September 2024."
        />
        </ScrollReveal>

        {/* Sources */}
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
