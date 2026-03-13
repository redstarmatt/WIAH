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

interface SurvivalPoint {
  year: number;
  pct: number;
  note?: string;
}

interface LateDiagnosisPoint {
  year: number;
  pct: number;
  note?: string;
}

interface ScreeningPoint {
  year: number;
  breast: number;
  bowel: number;
  cervical: number;
  note?: string;
}

interface CancerTypeData {
  type: string;
  oneYearSurvivalPct: number;
  change5yr: number;
}

interface CancerSurvivalData {
  oneYearSurvival: SurvivalPoint[];
  lateDiagnosis: LateDiagnosisPoint[];
  screeningUptake: ScreeningPoint[];
  byCancerType: CancerTypeData[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

function sparkFrom(arr: number[], n = 10) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function CancerOneYearSurvivalPage() {
  const [data, setData] = useState<CancerSurvivalData | null>(null);

  useEffect(() => {
    fetch('/data/cancer-one-year-survival/cancer_one_year_survival.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const survivalSeries: Series[] = data
    ? [{
        id: 'one-year-survival',
        label: 'One-year survival rate (%)',
        colour: '#2A9D8F',
        data: data.oneYearSurvival.map(d => ({
          date: yearToDate(d.year),
          value: d.pct,
        })),
      }]
    : [];

  const survivalAnnotations: Annotation[] = [
    { date: new Date(2020, 2, 1), label: '2020: COVID-19 diagnostic disruption' },
    { date: new Date(2013, 0, 1), label: '2013: Cancer strategy launched' },
  ];

  const lateDiagnosisSeries: Series[] = data
    ? [{
        id: 'late-diagnosis',
        label: 'Late-stage diagnosis rate (%)',
        colour: '#E63946',
        data: data.lateDiagnosis.map(d => ({
          date: yearToDate(d.year),
          value: d.pct,
        })),
      }]
    : [];

  const lateDiagnosisAnnotations: Annotation[] = [
    { date: new Date(2020, 2, 1), label: '2020: Screening paused' },
  ];

  const screeningSeries: Series[] = data
    ? [
        {
          id: 'breast',
          label: 'Breast screening',
          colour: '#264653',
          data: data.screeningUptake.map(d => ({
            date: yearToDate(d.year),
            value: d.breast,
          })),
        },
        {
          id: 'bowel',
          label: 'Bowel screening',
          colour: '#2A9D8F',
          data: data.screeningUptake.map(d => ({
            date: yearToDate(d.year),
            value: d.bowel,
          })),
        },
        {
          id: 'cervical',
          label: 'Cervical screening',
          colour: '#F4A261',
          data: data.screeningUptake.map(d => ({
            date: yearToDate(d.year),
            value: d.cervical,
          })),
        },
      ]
    : [];

  const screeningAnnotations: Annotation[] = [
    { date: new Date(2020, 2, 1), label: '2020: COVID-19 screening pause' },
    { date: new Date(2018, 6, 1), label: '2018: FIT test replaces gFOBt (bowel)' },
  ];

  // ── Derived metrics ───────────────────────────────────────────────────

  const latestSurvival = data?.oneYearSurvival[data.oneYearSurvival.length - 1];
  const earliestSurvival = data?.oneYearSurvival[0];
  const latestLateDiag = data?.lateDiagnosis[data.lateDiagnosis.length - 1];
  const peakLateDiag = data?.lateDiagnosis.reduce((a, b) => a.pct > b.pct ? a : b);
  const latestScreening = data?.screeningUptake[data.screeningUptake.length - 1];

  return (
    <>
      <TopicNav topic="Health" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Health"
          question="How Many Cancer Patients Survive One Year?"
          finding="One-year cancer survival has improved steadily over two decades, rising from under 60% to nearly 74%. But a quarter of cancers are still diagnosed late, and the UK continues to lag behind comparable European nations."
          colour="#2A9D8F"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              In 2001, fewer than six in ten adults diagnosed with cancer in England survived a full year. By 2023, that figure had climbed to 73.7% — a testament to better treatments, faster diagnostic pathways, and the quiet expansion of screening programmes that catch disease before symptoms appear. The gains have been uneven across cancer types: breast and prostate one-year survival now exceeds 95%, while lung cancer — still the biggest killer — has seen its one-year survival rise from under 30% to 44.6%, the steepest absolute improvement of any major cancer. Immunotherapy and targeted treatments introduced since 2016 have been a key driver of that shift.
            </p>
            <p>
              Yet the story is complicated by persistent weaknesses in early detection. Nearly a quarter of all cancers are still diagnosed at stage III or IV, when treatment options narrow and survival rates drop sharply. The pandemic made things worse: screening programmes were paused for months in 2020, and the resulting diagnostic backlog pushed late-stage diagnoses up to 26.8% that year. Screening uptake has since recovered but remains below pre-pandemic levels for breast and cervical programmes, partly because of appointment backlogs and partly because of a longer-term trend of declining participation among younger eligible women. Bowel screening, by contrast, has seen uptake rise after the introduction of the simpler FIT home test in 2018, replacing the older and less popular gFOBt kit.
            </p>
            <p>
              International comparisons remain uncomfortable. The UK consistently ranks in the bottom third of comparable European countries for one-year cancer survival, behind Denmark, the Netherlands, Norway, and Australia. The gap is not explained by treatment quality — once cancer is found, UK outcomes are competitive — but by how late it is found. England does not yet have a comprehensive national programme for lung cancer screening, and the NHS Targeted Lung Health Check programme, which is showing strong early results in pilot areas, is not expected to reach full national coverage until 2027. Closing the early detection gap is now the single most impactful lever for improving cancer survival in this country.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-survival', label: 'Survival trend' },
          { id: 'sec-late-diagnosis', label: 'Late diagnosis' },
          { id: 'sec-screening', label: 'Screening uptake' },
          { id: 'sec-cancer-types', label: 'By cancer type' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="One-year cancer survival"
            value={latestSurvival ? `${latestSurvival.pct}%` : '73.7%'}
            unit="2023"
            direction="up"
            polarity="up-is-good"
            changeText={
              latestSurvival && earliestSurvival
                ? `up from ${earliestSurvival.pct}% in ${earliestSurvival.year} · +${(latestSurvival.pct - earliestSurvival.pct).toFixed(1)}pp over two decades`
                : 'up from 59.8% in 2001'
            }
            sparklineData={
              data ? sparkFrom(data.oneYearSurvival.map(d => d.pct)) : []
            }
            source="ONS · Cancer survival in England, 2023"
            href="#sec-survival"
          />
          <MetricCard
            label="Late-stage diagnosis rate"
            value={latestLateDiag ? `${latestLateDiag.pct}%` : '24.0%'}
            unit="2023"
            direction="down"
            polarity="up-is-bad"
            changeText={
              latestLateDiag && peakLateDiag
                ? `down from ${peakLateDiag.pct}% in ${peakLateDiag.year} · still 1 in 4 cancers found late`
                : 'still one in four cancers found late'
            }
            sparklineData={
              data ? sparkFrom(data.lateDiagnosis.map(d => d.pct)) : []
            }
            source="NHS England · Cancer staging data, 2023"
            href="#sec-late-diagnosis"
          />
          <MetricCard
            label="Bowel screening uptake"
            value={latestScreening ? `${latestScreening.bowel}%` : '66.8%'}
            unit="2023"
            direction="up"
            polarity="up-is-good"
            changeText="highest ever · up from 53% in 2010 · FIT test driving improvement"
            sparklineData={
              data ? sparkFrom(data.screeningUptake.map(d => d.bowel)) : []
            }
            source="NHS Digital · Cancer screening statistics, 2023"
            href="#sec-screening"
          />
        </div>

        {/* Chart 1: One-year survival trend */}
        <ScrollReveal>
          <div id="sec-survival" className="mb-12">
            <LineChart
              series={survivalSeries}
              annotations={survivalAnnotations}
              title="One-year cancer survival rate, England, 2001–2023"
              subtitle="Proportion of adults surviving at least one year after cancer diagnosis. Age-standardised."
              yLabel="Survival (%)"
              source={{
                name: 'Office for National Statistics',
                dataset: 'Cancer survival in England — adults diagnosed',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 2: Late-stage diagnosis */}
        <ScrollReveal>
          <div id="sec-late-diagnosis" className="mb-12">
            <LineChart
              series={lateDiagnosisSeries}
              annotations={lateDiagnosisAnnotations}
              title="Cancers diagnosed at stage III or IV, England, 2013–2023"
              subtitle="Proportion of newly diagnosed cancers at late stage. Higher means more cancers found too late for optimal treatment."
              yLabel="Late-stage diagnoses (%)"
              source={{
                name: 'NHS England',
                dataset: 'Cancer staging data',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 3: Screening uptake */}
        <ScrollReveal>
          <div id="sec-screening" className="mb-12">
            <LineChart
              series={screeningSeries}
              annotations={screeningAnnotations}
              title="Cancer screening uptake by programme, England, 2010–2023"
              subtitle="Percentage of eligible population screened. Bowel screening rising since FIT test introduction; breast and cervical still below pre-pandemic levels."
              yLabel="Uptake (%)"
              source={{
                name: 'NHS Digital',
                dataset: 'Cancer screening programme statistics',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Cancer type breakdown */}
        <ScrollReveal>
          <div id="sec-cancer-types" className="mb-12">
            <div className="bg-white rounded-lg border border-wiah-border p-8">
              <h2 className="text-lg font-bold text-wiah-black mb-2">
                One-year survival by cancer type, England, 2023
              </h2>
              <p className="text-sm text-wiah-mid mb-6">
                Survival varies enormously by cancer type. Lung and pancreatic cancers have the lowest one-year survival but have seen the largest improvements in the last five years.
              </p>
              <div className="mt-6 space-y-4">
                {data?.byCancerType.map((c) => {
                  const pct = (c.oneYearSurvivalPct / 100) * 100;
                  return (
                    <div key={c.type}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-wiah-black">{c.type}</span>
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs text-wiah-mid">
                            +{c.change5yr}pp in 5 yrs
                          </span>
                          <span className="font-mono text-sm font-bold text-wiah-black">
                            {c.oneYearSurvivalPct}%
                          </span>
                        </div>
                      </div>
                      <div className="h-6 bg-wiah-light rounded-sm overflow-hidden">
                        <div
                          className="h-full rounded-sm transition-all"
                          style={{
                            width: `${pct}%`,
                            backgroundColor: c.oneYearSurvivalPct >= 70 ? '#2A9D8F' : c.oneYearSurvivalPct >= 40 ? '#F4A261' : '#E63946',
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="font-mono text-xs text-wiah-mid mt-4">
                Source: ONS — Cancer survival in England, adults diagnosed, 2023. 5-year change is absolute percentage point improvement.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Lung cancer survival improving fastest"
            value="+6.1pp"
            unit="in 5 years"
            description="Lung cancer one-year survival has risen from 38.5% to 44.6% in just five years — the fastest improvement of any major cancer type. This reflects the introduction of immunotherapy and targeted treatments on the NHS, as well as early results from the Targeted Lung Health Check programme, which is detecting cancers at earlier stages in high-risk populations. If rolled out nationally as planned by 2027, the programme could prevent an estimated 12,000 lung cancer deaths over its first decade."
            source="Source: ONS — Cancer survival in England, 2023. NHS England — Targeted Lung Health Check programme interim evaluation, 2025."
          />
        </ScrollReveal>

        {/* Sources */}
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>
              <strong>One-year survival:</strong> Office for National Statistics, &quot;Cancer survival in England — adults diagnosed.&quot; Age-standardised net survival estimates. Updated annually.{' '}
              <a href="https://www.ons.gov.uk/peoplepopulationandcommunity/healthandsocialcare/conditionsanddiseases/datasets/cancersurvivalratescancersurvivalinenglandadultsdiagnosed" className="text-wiah-blue underline" target="_blank" rel="noopener noreferrer">ons.gov.uk</a>
            </p>
            <p>
              <strong>Cancer staging:</strong> NHS England, Cancer Waiting Times and staging data. Late-stage defined as stage III or IV at diagnosis.{' '}
              <a href="https://www.england.nhs.uk/statistics/statistical-work-areas/cancer-waiting-times/" className="text-wiah-blue underline" target="_blank" rel="noopener noreferrer">england.nhs.uk</a>
            </p>
            <p>
              <strong>Screening uptake:</strong> NHS Digital, cancer screening programme statistics. Coverage measured as proportion of eligible population screened within the target period.{' '}
              <a href="https://digital.nhs.uk/data-and-information/publications/statistical/cancer-screening" className="text-wiah-blue underline" target="_blank" rel="noopener noreferrer">digital.nhs.uk</a>
            </p>
            <p>
              <strong>Known issues:</strong> COVID-19 caused major diagnostic disruption in 2020; fewer cancers were diagnosed and those found tended to be more advanced, temporarily depressing survival figures. Staging completeness has improved over time, so apparent increases in late-stage diagnosis may partly reflect better recording rather than genuine deterioration.
            </p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
