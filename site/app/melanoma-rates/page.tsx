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
  { num: 1, name: 'Cancer Research UK / ONS', dataset: 'Cancer incidence statistics — melanoma', url: 'https://www.cancerresearchuk.org/health-professional/cancer-statistics/statistics-by-cancer-type/melanoma-skin-cancer/incidence', date: '2023' },
  { num: 2, name: 'Cancer Research UK / ONS', dataset: 'Cancer survival statistics — melanoma', url: 'https://www.cancerresearchuk.org/health-professional/cancer-statistics/statistics-by-cancer-type/melanoma-skin-cancer/survival', date: '2023' },
  { num: 3, name: 'NHS England / NCRAS', dataset: 'Cancer staging data', url: 'https://www.cancerdata.nhs.uk/', date: '2024' },
];

// ── Types ────────────────────────────────────────────────────────────────────

interface IncidencePoint {
  year: number;
  ratePer100k: number;
}

interface SurvivalPoint {
  year: number;
  fiveYearPct: number;
}

interface StagePoint {
  year: number;
  stageI_pct: number;
  stageII_pct: number;
  stageIII_pct: number;
  stageIV_pct: number;
  unknown_pct: number;
}

interface RegionData {
  region: string;
  ratePer100k: number;
}

interface NewCasesPoint {
  year: number;
  cases: number;
}

interface MelanomaData {
  incidence: IncidencePoint[];
  survivalRate: SurvivalPoint[];
  stageAtDiagnosis: StagePoint[];
  byRegion: RegionData[];
  newCasesAnnual: NewCasesPoint[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 0, 1);
}

function sparkFrom(arr: number[], n = 10) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function MelanomaRatesPage() {
  const [data, setData] = useState<MelanomaData | null>(null);

  useEffect(() => {
    fetch('/data/melanoma-rates/melanoma_rates.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const incidenceSeries: Series[] = data
    ? [{
        id: 'incidence',
        label: 'Melanoma incidence per 100,000',
        colour: '#E63946',
        data: data.incidence.map(d => ({
          date: yearToDate(d.year),
          value: d.ratePer100k,
        })),
      }]
    : [];

  const survivalSeries: Series[] = data
    ? [{
        id: 'survival',
        label: 'Five-year survival rate (%)',
        colour: '#2A9D8F',
        data: data.survivalRate.map(d => ({
          date: yearToDate(d.year),
          value: d.fiveYearPct,
        })),
      }]
    : [];

  const stageSeries: Series[] = data
    ? [
        {
          id: 'stage-i',
          label: 'Stage I at diagnosis (%)',
          colour: '#2A9D8F',
          data: data.stageAtDiagnosis.map(d => ({
            date: yearToDate(d.year),
            value: d.stageI_pct,
          })),
        },
        {
          id: 'stage-iv',
          label: 'Stage IV at diagnosis (%)',
          colour: '#E63946',
          data: data.stageAtDiagnosis.map(d => ({
            date: yearToDate(d.year),
            value: d.stageIV_pct,
          })),
        },
      ]
    : [];

  const incidenceAnnotations: Annotation[] = [
    { date: new Date(2011, 0, 1), label: '2011: Sunbed licensing introduced' },
    { date: new Date(2020, 0, 1), label: '2020: COVID delayed diagnoses' },
  ];

  const stageAnnotations: Annotation[] = [
    { date: new Date(2020, 0, 1), label: '2020: Later-stage shift during COVID' },
  ];

  // ── Latest values ──────────────────────────────────────────────────────

  const latestIncidence = data?.incidence[data.incidence.length - 1];
  const earliestIncidence = data?.incidence[0];
  const latestSurvival = data?.survivalRate[data.survivalRate.length - 1];
  const earliestSurvival = data?.survivalRate[0];
  const latestCases = data?.newCasesAnnual[data.newCasesAnnual.length - 1];

  const incidenceIncrease = latestIncidence && earliestIncidence
    ? Math.round(((latestIncidence.ratePer100k - earliestIncidence.ratePer100k) / earliestIncidence.ratePer100k) * 100)
    : 133;

  return (
    <>
      <TopicNav topic="Melanoma Rates" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Melanoma Rates"
          question="Are Melanoma Cases Still Rising?"
          finding="Melanoma incidence has risen 133% since 2000 in the UK, reaching 22.4 per 100,000. The five-year survival rate has climbed to 93%, but late-stage diagnoses remain devastating. The South West has the highest regional rate, nearly double London."
          colour="#E63946"
          preposition="with"
        />

        {/* Editorial context */}
        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Melanoma is the UK"s fifth most common cancer, and it is getting more common. Around 17,700 people were diagnosed in 2023, up from 15,400 in 2015 and roughly 7,000 in the early 1990s. The age-standardised rate has more than doubled since 2000, reaching 22.4 per 100,000 people.<Cite nums={1} /> The drivers are well-understood: cumulative UV exposure from decades of cheap package holidays, the commercial sunbed boom of the 1990s and 2000s, and an ageing population carrying the skin damage of earlier decades. Melanoma incidence in the over-65s is three times the population average. The pandemic year of 2020 saw a sharp dip in recorded diagnoses as screening paused and people avoided GPs, but the underlying trend resumed immediately afterward, with many of those delayed diagnoses presenting at later stages.</p>
            <p>The good news is substantial and worth stating plainly. Five-year survival has risen from 76% in 2000 to 93% today<Cite nums={2} />, driven by earlier detection through public awareness campaigns and by the revolution in immunotherapy treatment that began around 2012. Checkpoint inhibitors such as pembrolizumab and nivolumab have transformed the outlook for Stage III and Stage IV melanoma from near-certain death to meaningful long-term survival for a growing proportion of patients. NICE approved these treatments for NHS use, and the UK"s ten-year cancer plan identifies melanoma screening as a priority area. The proportion of melanomas caught at Stage I at diagnosis has risen from 44% to 53% over the past decade.<Cite nums={3} /></p>
            <p>But the picture is far from uniformly positive. Stage IV melanoma still kills roughly 80% of patients within five years. There are stark geographic inequalities: the South West has an incidence rate of 28.1 per 100,000, nearly double London"s 15.6.<Cite nums={1} /> This reflects demographic differences (older, less ethnically diverse populations in coastal and rural areas), but also patterns of outdoor recreation and historical sunbed use. Dermatology waiting times have lengthened considerably since 2019, meaning the gap between a person noticing a suspicious mole and having it assessed is growing at exactly the wrong moment. The overall trajectory is one of rising cases, improving survival, and a system under pressure to keep pace with both.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-incidence', label: 'Incidence trend' },
          { id: 'sec-survival', label: 'Survival rates' },
          { id: 'sec-stage', label: 'Stage at diagnosis' },
          { id: 'sec-regional', label: 'Regional' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Melanoma incidence per 100,000"
            value={latestIncidence ? latestIncidence.ratePer100k.toString() : '22.4'}
            unit="2023"
            direction="up"
            polarity="up-is-bad"
            changeText={`+${incidenceIncrease}% since 2000 · driven by UV exposure and ageing population`}
            sparklineData={
              data ? sparkFrom(data.incidence.map(d => d.ratePer100k)) : [14,16,17,18,19,21,22.4]
            }
            source="Cancer Research UK / ONS, 2023"
            href="#sec-incidence"
          />
          <MetricCard
            label="Five-year survival rate"
            value={latestSurvival ? `${latestSurvival.fiveYearPct}%` : '93%'}
            unit="2022"
            direction="up"
            polarity="up-is-good"
            changeText={
              latestSurvival && earliestSurvival
                ? `up from ${earliestSurvival.fiveYearPct}% in 2000 · immunotherapy approach transformed outcomes`
                : 'up from 76% in 2000 · immunotherapy transformed outcomes'
            }
            sparklineData={
              data ? data.survivalRate.map(d => d.fiveYearPct) : [76,80,84,87,90,92,93]
            }
            source="Cancer Research UK / ONS, 2022"
            href="#sec-survival"
          />
          <MetricCard
            label="New cases per year (UK)"
            value={latestCases ? latestCases.cases.toLocaleString() : '17,693'}
            unit="2023"
            direction="up"
            polarity="up-is-bad"
            changeText="up from 15,419 in 2015 · fifth most common cancer in the UK"
            sparklineData={
              data ? data.newCasesAnnual.map(d => d.cases) : [15419,15906,16244,16744,17064,13851,16020,17439,17693]
            }
            source="Cancer Research UK, 2023"
            href="#sec-incidence"
          />
        </div>

        {/* Chart 1: Incidence trend */}
        <ScrollReveal>
          <div id="sec-incidence" className="mb-12">
            <LineChart
              series={incidenceSeries}
              annotations={incidenceAnnotations}
              title="Melanoma incidence rate per 100,000, UK, 2000-2023"
              subtitle="Age-standardised rate. Dip in 2020 reflects delayed diagnoses during the pandemic, not a real reduction."
              yLabel="Rate per 100,000"
              source={{
                name: 'Cancer Research UK / ONS',
                dataset: 'Cancer incidence statistics',
                frequency: 'annual',
                url: 'https://www.cancerresearchuk.org/health-professional/cancer-statistics/statistics-by-cancer-type/melanoma-skin-cancer/incidence',
                date: 'Nov 2023',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 2: Survival rate */}
        <ScrollReveal>
          <div id="sec-survival" className="mb-12">
            <LineChart
              series={survivalSeries}
              title="Melanoma five-year survival rate, UK, 2000-2022"
              subtitle="Net survival at five years after diagnosis. Immunotherapy approvals from 2012 onward drove significant improvement."
              yLabel="Survival rate (%)"
              source={{
                name: 'Cancer Research UK / ONS',
                dataset: 'Cancer survival statistics',
                frequency: 'biennial',
                url: 'https://www.cancerresearchuk.org/health-professional/cancer-statistics/statistics-by-cancer-type/melanoma-skin-cancer/survival',
                date: 'Nov 2023',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 3: Stage at diagnosis */}
        <ScrollReveal>
          <div id="sec-stage" className="mb-12">
            <LineChart
              series={stageSeries}
              annotations={stageAnnotations}
              title="Melanoma stage at diagnosis, England, 2012-2023"
              subtitle="Proportion diagnosed at Stage I (early, high survival) vs Stage IV (late, poor survival). COVID caused a temporary shift to later-stage presentation."
              yLabel="Percentage at diagnosis (%)"
              source={{
                name: 'NHS England / National Cancer Registration and Analysis Service',
                dataset: 'Cancer staging data',
                frequency: 'annual',
                url: 'https://www.cancerdata.nhs.uk/',
                date: '2024',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Regional variation */}
        <ScrollReveal>
          <div id="sec-regional" className="mb-12">
            <div className="bg-white rounded-lg border border-wiah-border p-8">
              <h2 className="text-lg font-bold text-wiah-black mb-2">
                Melanoma incidence rate by region (per 100,000 people)
              </h2>
              <p className="text-sm text-wiah-mid mb-6">
                The South West has nearly double London"s rate, reflecting older demographics, outdoor recreation patterns, and historical sunbed use.
              </p>
              <div className="mt-6 space-y-4">
                {data?.byRegion.map((r) => {
                  const pct = (r.ratePer100k / 32) * 100;
                  return (
                    <div key={r.region}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-wiah-black">{r.region}</span>
                        <span className="font-mono text-sm font-bold text-wiah-black">{r.ratePer100k}</span>
                      </div>
                      <div className="h-6 bg-wiah-light rounded-sm overflow-hidden">
                        <div
                          className="h-full rounded-sm transition-all"
                          style={{ width: `${pct}%`, backgroundColor: r.ratePer100k > 24 ? '#E63946' : r.ratePer100k > 20 ? '#F4A261' : '#6B7280' }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="font-mono text-xs text-wiah-mid mt-4">Source: Cancer Research UK / ONS — age-standardised incidence by region, 2019-2023</p>
            </div>
          </div>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Immunotherapy has transformed late-stage melanoma outcomes"
            value="93%"
            unit="five-year survival"
            description="Since checkpoint inhibitor immunotherapy became available on the NHS from 2012 onward, survival for advanced melanoma has improved dramatically. Pembrolizumab and nivolumab now offer meaningful long-term survival for patients who previously had a median life expectancy of months. Stage I melanoma, caught early, has a near-100% five-year survival rate. The proportion of melanomas diagnosed at Stage I has risen from 44% to 53% over the past decade, reflecting improved public awareness and faster referral pathways. Early detection remains the single most important factor in melanoma outcomes."
            source="Source: Cancer Research UK / NICE — melanoma treatment guidance, 2024. ONS cancer survival statistics."
          />
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        {/* Sources and methodology */}
        <ScrollReveal>
          <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
            <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
            <div className="text-sm text-wiah-mid font-mono space-y-2">
              <p>
                <a href="https://www.cancerresearchuk.org/health-professional/cancer-statistics/statistics-by-cancer-type/melanoma-skin-cancer" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Cancer Research UK</a> — melanoma incidence, survival, and mortality statistics. Based on ONS cancer registration data.
              </p>
              <p>
                <a href="https://www.cancerdata.nhs.uk/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS England / National Cancer Registration and Analysis Service</a> — stage at diagnosis data, England.
              </p>
              <p>
                <a href="https://www.ons.gov.uk/peoplepopulationandcommunity/healthandsocialcare/conditionsanddiseases" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ONS</a> — cancer registration, population denominators for rate calculations.
              </p>
              <p>All incidence rates are age-standardised to the 2013 European Standard Population. Survival estimates are net survival, which removes the effect of background mortality. Regional figures use the nine English regions; Scotland, Wales, and Northern Ireland publish separate registrations.</p>
              <p>The 2020 dip in incidence reflects delayed presentation and reduced GP referrals during the COVID-19 pandemic, not a genuine reduction in melanoma occurrence. Trend data uses the most recent available release at time of publication.</p>
            </div>
          </section>
        </ScrollReveal>

        <RelatedTopics />
      </main>
    </>
  );
}
