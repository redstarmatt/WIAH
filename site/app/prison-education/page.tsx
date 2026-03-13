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

// ── Types ────────────────────────────────────────────────────────────────────

interface EducationParticipationPoint {
  year: number;
  pct: number;
}

interface NoQualificationsPoint {
  year: number;
  pct: number;
}

interface ReoffendingRatePoint {
  year: number;
  pct: number;
}

interface EducationBudgetPoint {
  year: number;
  millionGBP: number;
}

interface VocationalCompletionsPoint {
  year: number;
  count: number;
}

interface PrisonEducationData {
  educationParticipation: EducationParticipationPoint[];
  noQualifications: NoQualificationsPoint[];
  reoffendingRate: ReoffendingRatePoint[];
  educationBudget: EducationBudgetPoint[];
  vocationalCompletions: VocationalCompletionsPoint[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 0, 1);
}

function sparkFrom(arr: number[], n = 10) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function PrisonEducationPage() {
  const [data, setData] = useState<PrisonEducationData | null>(null);

  useEffect(() => {
    fetch('/data/prison-education/prison_education.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const participationSeries: Series[] = data
    ? [{
        id: 'participation',
        label: 'Prisoners in education each week (%)',
        colour: '#E63946',
        data: data.educationParticipation.map(d => ({
          date: yearToDate(d.year),
          value: d.pct,
        })),
      }]
    : [];

  const budgetSeries: Series[] = data
    ? [{
        id: 'budget',
        label: 'Prison education budget (£m)',
        colour: '#E63946',
        data: data.educationBudget.map(d => ({
          date: yearToDate(d.year),
          value: d.millionGBP,
        })),
      }]
    : [];

  const reoffendingSeries: Series[] = data
    ? [
        {
          id: 'reoffending',
          label: 'Proven reoffending rate (%)',
          colour: '#6B7280',
          data: data.reoffendingRate.map(d => ({
            date: yearToDate(d.year),
            value: d.pct,
          })),
        },
        {
          id: 'vocational',
          label: 'Vocational completions (thousands)',
          colour: '#2A9D8F',
          data: (data.vocationalCompletions || []).map(d => ({
            date: yearToDate(d.year),
            value: d.count / 1000,
          })),
        },
      ]
    : [];

  const participationAnnotations: Annotation[] = [
    { date: new Date(2010, 6, 1), label: "2010: Austerity cuts begin" },
    { date: new Date(2020, 2, 1), label: "2020: COVID suspends classes" },
  ];

  const budgetAnnotations: Annotation[] = [
    { date: new Date(2013, 0, 1), label: "2013: OLASS contract restructured" },
    { date: new Date(2019, 0, 1), label: "2019: Education review published" },
  ];

  const reoffendingAnnotations: Annotation[] = [
    { date: new Date(2016, 0, 1), label: "2016: Coates Review recommends reform" },
    { date: new Date(2020, 2, 1), label: "2020: COVID disruption" },
  ];

  // ── Derived metrics ─────────────────────────────────────────────────────

  const latestParticipation = data?.educationParticipation[data.educationParticipation.length - 1];
  const peakParticipation = data?.educationParticipation[0];
  const latestNoQual = data?.noQualifications[data.noQualifications.length - 1];
  const latestReoffending = data?.reoffendingRate[data.reoffendingRate.length - 1];
  const earliestReoffending = data?.reoffendingRate[0];

  const participationDrop = latestParticipation && peakParticipation
    ? (peakParticipation.pct - latestParticipation.pct).toFixed(1)
    : '8.2';

  return (
    <>
      <TopicNav topic="Prison Education" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Prison Education"
          question="Is Prison Education Working?"
          finding="Only 28% of prisoners engage in education each week — down from 36% in 2010. The education budget has been cut 40% in real terms since austerity began. 57% of prisoners enter custody with no formal qualifications. The evidence that education reduces reoffending is overwhelming, yet investment continues to fall short."
          colour="#6B7280"
          preposition="with"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              Prison education in England is in a state of managed decline. The budget was cut by 40%
              between 2010 and 2020, from £168 million to around £100 million, and has flatlined since.
              Weekly participation has dropped from 36% to 28% over the same period, with COVID wiping
              out a further two years of provision when classes were suspended entirely. The population
              entering prison is among the most educationally disadvantaged in the country: 57% have no
              formal qualifications, around half have the reading ability of an eleven-year-old or below,
              and an estimated 30% have a learning disability or difficulty that has never been formally
              assessed. These are people for whom the school system already failed once. Prison was supposed
              to be a second chance. For most, it is not.
            </p>
            <p>
              The evidence base for prison education is unusually strong. The RAND Corporation meta-analysis
              — the largest of its kind — found that prisoners who participate in educational programmes are
              43% less likely to reoffend than those who do not. UK-specific research from the Ministry of
              Justice confirms a significant reduction in proven reoffending among those who complete
              vocational qualifications in custody. The Coates Review of 2016 laid out a comprehensive reform
              blueprint, recommending a "prisoner learning account" that would follow individuals through the
              gate. Most of its recommendations were accepted in principle. Few have been fully implemented.
              The prison education contract, now managed through a dynamic purchasing system rather than a single
              national provider, has improved flexibility in some establishments but created inconsistency in
              others. Ofsted inspections continue to rate a significant proportion of prison education provision
              as requiring improvement.
            </p>
            <p>
              The economics are stark. It costs approximately £47,000 per year to hold someone in prison. The
              proven reoffending rate sits stubbornly at 49% — meaning nearly half of all prisoners released
              will commit another offence within twelve months. Each prevented reoffence saves the criminal
              justice system an estimated £18,000 in police, court, and custody costs alone, before accounting
              for the cost to victims and communities. Investing in literacy, numeracy, and vocational
              qualifications during a custodial sentence is one of the highest-return interventions available
              to the justice system. The data has been saying this for over a decade. The budget has been
              saying the opposite.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-participation', label: 'Participation' },
          { id: 'sec-budget', label: 'Budget' },
          { id: 'sec-reoffending', label: 'Reoffending' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Prisoners in education each week"
            value={latestParticipation ? `${latestParticipation.pct}%` : '28%'}
            unit="2024"
            direction="down"
            polarity="down-is-bad"
            changeText={`Down ${participationDrop} points from 2010 peak of ${peakParticipation?.pct ?? 36.2}%`}
            sparklineData={
              data ? sparkFrom(data.educationParticipation.map(d => d.pct)) : [36.2, 34.1, 31.4, 30.1, 29.0, 18.3, 22.7, 27.1, 27.8, 28.0]
            }
            source="HMPPS / Ofsted — Prison Education Statistics, 2024"
            href="#sec-participation"
          />
          <MetricCard
            label="No formal qualifications on entry"
            value={latestNoQual ? `${latestNoQual.pct}%` : '57%'}
            unit="2024"
            direction="flat"
            polarity="up-is-bad"
            changeText="Persistently above 55% for over a decade"
            sparklineData={
              data ? sparkFrom(data.noQualifications.map(d => d.pct)) : [56.0, 56.3, 56.8, 57.0, 57.2, 57.1, 57.0, 57.3, 57.0]
            }
            source="HMPPS — Reception Screening Data, 2024"
            href="#sec-budget"
          />
          <MetricCard
            label="Proven reoffending rate"
            value={latestReoffending ? `${latestReoffending.pct}%` : '48.9%'}
            unit="2024"
            direction="up"
            polarity="up-is-bad"
            changeText={
              latestReoffending && earliestReoffending
                ? `Up from ${earliestReoffending.pct}% in ${earliestReoffending.year} · nearly 1 in 2 reoffend within a year`
                : 'Up from 46.8% in 2010 · nearly 1 in 2 reoffend within a year'
            }
            sparklineData={
              data ? sparkFrom(data.reoffendingRate.map(d => d.pct)) : [48.0, 48.4, 48.8, 49.2, 43.1, 45.7, 47.8, 48.5, 48.9]
            }
            source="Ministry of Justice — Proven Reoffending Statistics, 2024"
            href="#sec-reoffending"
          />
        </div>

        {/* Chart 1: Education participation */}
        <ScrollReveal>
          <div id="sec-participation" className="mb-12">
            <LineChart
              series={participationSeries}
              annotations={participationAnnotations}
              title="Prisoners participating in education each week (%), England, 2010-2024"
              subtitle="Percentage of prison population engaging in purposeful education activity in any given week. COVID caused a sharp drop in 2020-2021."
              yLabel="Participation (%)"
              source={{
                name: 'HMPPS / Ofsted',
                dataset: 'Prison Education Framework Annual Statistics',
                url: 'https://www.gov.uk/government/statistics/prison-education-statistics',
                date: 'November 2025',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 2: Education budget */}
        <ScrollReveal>
          <div id="sec-budget" className="mb-12">
            <LineChart
              series={budgetSeries}
              annotations={budgetAnnotations}
              title="Prison education budget (£m nominal), England, 2010-2024"
              subtitle="Annual budget allocation for prison education. Real-terms cuts are larger than headline figures due to inflation."
              yLabel="Budget (£m)"
              source={{
                name: 'HMPPS',
                dataset: 'Prison Education Budget and Expenditure',
                url: 'https://www.gov.uk/government/publications/prison-education-expenditure',
                date: 'November 2025',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 3: Reoffending rate vs vocational completions */}
        <ScrollReveal>
          <div id="sec-reoffending" className="mb-12">
            <LineChart
              series={reoffendingSeries}
              annotations={reoffendingAnnotations}
              title="Proven reoffending rate (%) and vocational completions (thousands), 2010-2024"
              subtitle="Reoffending rate (grey) remains stubbornly high as vocational course completions (green) have fallen. COVID caused a temporary dip in both."
              yLabel="Rate (%) / Completions (000s)"
              source={{
                name: 'Ministry of Justice / HMPPS',
                dataset: 'Proven Reoffending Statistics; Prison Education Statistics',
                url: 'https://www.gov.uk/government/statistics/proven-reoffending-statistics',
                date: 'October 2025',
                frequency: 'quarterly / annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Education in prison works — the evidence is clear"
            value="43%"
            description="Prisoners who participate in educational programmes are 43% less likely to reoffend than those who do not, according to the RAND Corporation meta-analysis of 30 years of international evidence. UK-specific data from the Ministry of Justice confirms that completing a vocational qualification in custody is associated with a significant reduction in proven reoffending within one year of release. The Coates Review estimated that a fully funded prison education system would pay for itself within two years through reduced reoffending costs alone. At £47,000 per prison place per year and a 49% reoffending rate, even modest improvements in educational outcomes generate substantial savings."
            source="Source: RAND Corporation — Evaluating the Effectiveness of Correctional Education, 2013. Ministry of Justice — Proven Reoffending Statistics, 2024. Coates Review of Prison Education, 2016."
          />
        </ScrollReveal>

        {/* Editorial */}
        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">
              Cutting Prison Education Was One of the Most Counterproductive Austerity Decisions
            </h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>
                The arithmetic is not complicated. It costs £47,000 a year to keep someone in prison. Nearly
                half of those released are back within twelve months. Education is the single most
                evidence-backed intervention for breaking that cycle. And yet the budget has been cut by
                40% since 2010, participation has fallen, and vocational course completions have dropped
                from over 48,000 per year to under 35,000. The RAND Corporation found a 43% reduction
                in reoffending among those who take part in education. The Ministry of Justice found
                similar patterns in its own data. This is not a contested finding. It is one of the most
                robust results in criminal justice research.
              </p>
              <p>
                The Coates Review of 2016 set out a credible reform programme. Its central recommendation
                — that every prisoner should have a personal learning plan, funded through a "prisoner
                learning account" that follows them from reception to release and beyond — was accepted
                by the government. Implementation has been slow and uneven. The shift from a single
                national education contract to a dynamic purchasing system has given governors more
                flexibility but has also created gaps in provision, particularly for specialist literacy
                and SEND support. Ofsted continues to identify significant variability in quality across
                the estate.
              </p>
            </div>
          </section>
        </ScrollReveal>

        {/* Sources & methodology */}
        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p>
              <a href="https://www.gov.uk/government/statistics/prison-education-statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">
                HMPPS / Ofsted — Prison Education Framework Annual Statistics
              </a> — education participation and vocational completion data. Retrieved November 2025.
            </p>
            <p>
              <a href="https://www.gov.uk/government/statistics/proven-reoffending-statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">
                Ministry of Justice — Proven Reoffending Statistics
              </a> — reoffending rates measured as proven reoffending within one year of release. Retrieved October 2025.
            </p>
            <p>
              <a href="https://www.gov.uk/government/publications/prison-education-expenditure" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">
                HMPPS — Prison Education Budget and Expenditure
              </a> — annual budget allocation figures (nominal). Retrieved November 2025.
            </p>
            <p>
              All figures are for England unless otherwise stated. Education participation is defined as the percentage of the prison population engaging in purposeful education activity in any given week. No-qualifications data is self-reported at reception screening. Budget figures are nominal and do not account for inflation — real-terms cuts are larger than headline figures suggest. COVID-19 suspended most prison education from March 2020 to mid-2021.
            </p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
