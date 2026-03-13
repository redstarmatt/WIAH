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

interface UptakePoint {
  year: number;
  percent: number;
}

interface EarlyStagePoint {
  year: number;
  percent: number;
}

interface MortalityPoint {
  year: number;
  ratePer100k: number;
}

interface AgeExpansionPoint {
  year: number;
  lowerAge: number;
  invitationsSent: number;
}

interface DeprivationPoint {
  quintile: string;
  uptakePercent: number;
}

interface BowelScreeningData {
  uptake: UptakePoint[];
  earlyStageDetection: EarlyStagePoint[];
  mortalityRate: MortalityPoint[];
  ageExpansion: AgeExpansionPoint[];
  deprivationGap: DeprivationPoint[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 0, 1);
}

function sparkFrom(arr: number[], n = 10) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function BowelScreeningPage() {
  const [data, setData] = useState<BowelScreeningData | null>(null);

  useEffect(() => {
    fetch('/data/bowel-screening/bowel_screening.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const uptakeSeries: Series[] = data
    ? [{
        id: 'uptake',
        label: 'Screening uptake (%)',
        colour: '#2A9D8F',
        data: data.uptake.map(d => ({
          date: yearToDate(d.year),
          value: d.percent,
        })),
      }]
    : [];

  const earlyDetectionSeries: Series[] = data
    ? [{
        id: 'early-stage',
        label: 'Cancers caught at Stage 1-2 (%)',
        colour: '#264653',
        data: data.earlyStageDetection.map(d => ({
          date: yearToDate(d.year),
          value: d.percent,
        })),
      }]
    : [];

  const mortalitySeries: Series[] = data
    ? [{
        id: 'mortality',
        label: 'Age-standardised mortality rate',
        colour: '#E63946',
        data: data.mortalityRate.map(d => ({
          date: yearToDate(d.year),
          value: d.ratePer100k,
        })),
      }]
    : [];

  const uptakeAnnotations: Annotation[] = [
    { date: new Date(2019, 5, 1), label: "2019: FIT test replaces gFOBt" },
    { date: new Date(2021, 3, 1), label: "2021: Age expansion begins (50-74)" },
  ];

  const earlyDetectionAnnotations: Annotation[] = [
    { date: new Date(2019, 5, 1), label: "2019: FIT introduced" },
  ];

  const mortalityAnnotations: Annotation[] = [
    { date: new Date(2006, 0, 1), label: "2006: Screening programme launched" },
    { date: new Date(2020, 2, 1), label: "2020: COVID pauses screening" },
  ];

  const uptakeTargetLine = { value: 75.0, label: "NHS 75% uptake target" };

  // ── Latest values ──────────────────────────────────────────────────────

  const latestUptake = data?.uptake[data.uptake.length - 1];
  const baselineUptake = data?.uptake[0];
  const latestEarly = data?.earlyStageDetection[data.earlyStageDetection.length - 1];
  const baselineEarly = data?.earlyStageDetection[0];
  const latestMortality = data?.mortalityRate[data.mortalityRate.length - 1];
  const baselineMortality = data?.mortalityRate[0];

  const mortalityDrop = baselineMortality && latestMortality
    ? Math.round(((baselineMortality.ratePer100k - latestMortality.ratePer100k) / baselineMortality.ratePer100k) * 100)
    : 24;

  return (
    <>
      <TopicNav topic="Bowel Cancer Screening" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Bowel Cancer Screening"
          question="Is Bowel Cancer Screening Finally Working?"
          finding="Uptake of bowel cancer screening has risen to 67% following the switch to the simpler FIT test, and the programme is now being extended to people from age 50. More than half of screen-detected cancers are caught at early stages, when survival rates exceed 90%. But a 25-percentage-point gap between the most and least deprived communities means the people who need screening most are still the least likely to complete it."
          colour="#2A9D8F"
          preposition="with"
        />

        {/* Editorial context */}
        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              Bowel cancer is the fourth most common cancer in the UK and the second biggest cancer killer, claiming around 16,800 lives each year. Yet it is also one of the most preventable. When caught at Stage 1, the five-year survival rate is over 90%. By Stage 4, it collapses to around 10%. The entire logic of the NHS Bowel Cancer Screening Programme rests on this asymmetry: find cancers early, before symptoms appear, and the odds shift dramatically in the patient"s favour. The programme, launched in 2006, invites eligible adults to complete a home testing kit every two years. For its first thirteen years it used the guaiac faecal occult blood test, a kit that required six separate stool samples and had a deserved reputation for being unpleasant. Uptake plateaued stubbornly in the mid-50s.
            </p>
            <p>
              The turning point came in June 2019, when the programme switched to the faecal immunochemical test. FIT requires a single, small sample and is markedly easier to use. The effect was immediate and sustained: uptake jumped from 57% to over 60% within a year and has continued climbing to 67.3% by 2024. Simultaneously, NHS England began lowering the eligible age from 60 to 50, a phased expansion that is already bringing 6.3 million invitations per year and is on track to reach all 50-year-olds by 2025. The combination of a better test and a wider eligible population means more cancers are being caught at early, treatable stages. In 2024, 53.1% of screen-detected bowel cancers were diagnosed at Stage 1 or 2, up from 38% in 2010. Age-standardised bowel cancer mortality has fallen 24% over the same period, from 17.4 to 13.2 deaths per 100,000 people.
            </p>
            <p>
              The remaining challenge is inequality. Screening uptake in the most deprived quintile of areas stands at just 51.2%, compared with 76.3% in the least deprived. This 25-percentage-point gap has barely narrowed since the programme began and means that bowel cancer continues to kill disproportionately in poorer communities. Targeted outreach, simplified messaging, and community pharmacy collection points have shown promise in pilots, but none has yet been deployed at the scale needed to close the gap. The programme is working, but it is not yet working for everyone.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-uptake', label: 'Uptake' },
          { id: 'sec-early-detection', label: 'Early detection' },
          { id: 'sec-mortality', label: 'Mortality' },
          { id: 'sec-inequality', label: 'Inequality' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Bowel screening uptake (England)"
            value={latestUptake ? `${latestUptake.percent}%` : '67.3%'}
            unit="2024"
            direction="up"
            polarity="up-is-good"
            changeText={
              latestUptake && baselineUptake
                ? `Up from ${baselineUptake.percent}% in ${baselineUptake.year} · FIT test drove step-change`
                : 'Up from 52.1% in 2010 · FIT test drove step-change'
            }
            sparklineData={
              data ? sparkFrom(data.uptake.map(d => d.percent)) : []
            }
            source="NHS England — Bowel Cancer Screening Programme, 2024"
            href="#sec-uptake"
          />
          <MetricCard
            label="Cancers caught at Stage 1-2"
            value={latestEarly ? `${latestEarly.percent}%` : '53.1%'}
            unit="2024"
            direction="up"
            polarity="up-is-good"
            changeText={
              latestEarly && baselineEarly
                ? `Up from ${baselineEarly.percent}% in ${baselineEarly.year} · early detection saves lives`
                : 'Up from 38.2% in 2010 · early detection saves lives'
            }
            sparklineData={
              data ? sparkFrom(data.earlyStageDetection.map(d => d.percent)) : []
            }
            source="NHS England — Cancer Registration Statistics, 2024"
            href="#sec-early-detection"
          />
          <MetricCard
            label="Bowel cancer mortality rate"
            value={latestMortality ? `${latestMortality.ratePer100k}` : '13.2'}
            unit="per 100k (2024)"
            direction="down"
            polarity="down-is-bad"
            changeText={`Down ${mortalityDrop}% since 2010 · age-standardised rate`}
            sparklineData={
              data ? sparkFrom(data.mortalityRate.map(d => d.ratePer100k)) : []
            }
            source="ONS — Cancer Registration Statistics, 2024"
            href="#sec-mortality"
          />
        </div>

        {/* Chart 1: Screening uptake */}
        <ScrollReveal>
          <div id="sec-uptake" className="mb-12">
            <LineChart
              series={uptakeSeries}
              title="Bowel cancer screening uptake, England, 2010-2024"
              subtitle="Proportion of eligible adults completing a screening kit within six months of invitation. FIT replaced gFOBt in June 2019."
              yLabel="Uptake (%)"
              annotations={uptakeAnnotations}
              targetLine={uptakeTargetLine}
              source={{
                name: 'NHS England',
                dataset: 'Bowel Cancer Screening Programme Statistics',
                url: 'https://www.gov.uk/government/statistics/bowel-cancer-screening-programme-statistics',
                date: 'March 2026',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 2: Early stage detection */}
        <ScrollReveal>
          <div id="sec-early-detection" className="mb-12">
            <LineChart
              series={earlyDetectionSeries}
              title="Screen-detected bowel cancers diagnosed at Stage 1-2, England, 2010-2024"
              subtitle="Earlier detection dramatically improves survival. Stage 1 five-year survival exceeds 90%; Stage 4 is around 10%."
              yLabel="Stage 1-2 (%)"
              annotations={earlyDetectionAnnotations}
              source={{
                name: 'NHS England',
                dataset: 'Cancer Registration Statistics',
                url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/healthandsocialcare/conditionsanddiseases',
                date: 'March 2026',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 3: Mortality rate */}
        <ScrollReveal>
          <div id="sec-mortality" className="mb-12">
            <LineChart
              series={mortalitySeries}
              title="Bowel cancer mortality rate (age-standardised), England, 2010-2024"
              subtitle="Deaths per 100,000 population. Sustained decline reflects earlier detection and improved treatment pathways."
              yLabel="Deaths per 100k"
              annotations={mortalityAnnotations}
              source={{
                name: 'Office for National Statistics',
                dataset: 'Cancer Registration Statistics',
                url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/healthandsocialcare/conditionsanddiseases',
                date: 'March 2026',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Deprivation gap bar chart */}
        <ScrollReveal>
          <div id="sec-inequality" className="mb-12">
            <div className="bg-white rounded-lg border border-wiah-border p-8">
              <h2 className="text-lg font-bold text-wiah-black mb-2">
                Screening uptake by deprivation quintile, England (2024)
              </h2>
              <p className="text-sm text-wiah-mid mb-6">
                A 25-percentage-point gap persists between the most and least deprived areas. The people most at risk of bowel cancer are least likely to be screened.
              </p>
              <div className="mt-6 space-y-4">
                {data?.deprivationGap.map((d) => {
                  const pct = (d.uptakePercent / 80) * 100;
                  const isLowest = d.quintile === 'Most deprived';
                  return (
                    <div key={d.quintile}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-wiah-black">{d.quintile}</span>
                        <span className="font-mono text-sm font-bold text-wiah-black">{d.uptakePercent}%</span>
                      </div>
                      <div className="h-6 bg-wiah-light rounded-sm overflow-hidden">
                        <div
                          className="h-full rounded-sm transition-all"
                          style={{
                            width: `${pct}%`,
                            backgroundColor: isLowest ? '#E63946' : '#2A9D8F',
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="font-mono text-xs text-wiah-mid mt-4">
                Source: NHS England — Bowel Cancer Screening Programme Statistics by Index of Multiple Deprivation, 2024
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="FIT test: a public health success story"
            value="67.3%"
            unit="uptake"
            description="The switch from the six-sample guaiac test to the single-sample FIT test in June 2019 was the single most effective intervention in the programme's history. Uptake rose by more than 10 percentage points. Combined with the age expansion to 50-year-olds, the programme now sends 6.3 million invitations per year and detects cancers earlier in their progression. Over half of screen-detected bowel cancers are now found at Stage 1 or 2, when treatment is most effective and least invasive. Age-standardised mortality from bowel cancer has fallen 24% since 2010."
            source="Source: NHS England — Bowel Cancer Screening Programme Statistics, 2024. ONS — Cancer Registration Statistics, 2024."
          />
        </ScrollReveal>

        {/* Sources & Methodology */}
        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p>
              <a href="https://www.gov.uk/government/statistics/bowel-cancer-screening-programme-statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">
                NHS England — Bowel Cancer Screening Programme Statistics
              </a>{' '}
              — primary data source for uptake and age expansion. Retrieved March 2026.
            </p>
            <p>
              <a href="https://www.ons.gov.uk/peoplepopulationandcommunity/healthandsocialcare/conditionsanddiseases" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">
                ONS — Cancer Registration Statistics
              </a>{' '}
              — stage at diagnosis and mortality data. Retrieved March 2026.
            </p>
            <p>
              <a href="https://www.cancerresearchuk.org/health-professional/cancer-statistics/statistics-by-cancer-type/bowel-cancer" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">
                Cancer Research UK — Bowel Cancer Statistics
              </a>{' '}
              — contextual data and survival rates. Retrieved March 2026.
            </p>
            <p className="mt-4">
              Uptake is measured as the proportion of eligible people who completed a screening kit within six months of invitation.
              The programme transitioned from gFOBt to FIT in June 2019; pre- and post-2019 figures are not directly comparable.
              Mortality rates are age-standardised to the 2013 European Standard Population.
              All figures are for England unless otherwise stated.
            </p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
