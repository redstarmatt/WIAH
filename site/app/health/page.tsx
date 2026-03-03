'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import SiteName from '@/components/SiteName';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import MetricDetailModal from '@/components/MetricDetailModal';
import PostcodeLookup from '@/components/PostcodeLookup';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import RegionalMap from '@/components/charts/RegionalMap';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';

// ── Types ────────────────────────────────────────────────────────────────────

interface GpTimeSeries {
  date: string;
  avgWaitDays: number;
  totalAppointments: number;
  pctSameOrNextDay: number;
}

interface GpData {
  national: { timeSeries: GpTimeSeries[] };
  regional: { byICB: { code: string; name: string; fullName?: string; avgWaitDays: number }[] };
}

interface AmbTimeSeries {
  date: string;
  cat1MeanMins?: number;
  cat1P90Mins?: number;
  cat2MeanMins?: number;
  cat2P90Mins?: number;
  cat1Incidents?: number;
}

interface AmbData {
  national: { timeSeries: AmbTimeSeries[] };
  regional: { byTrust: { code: string; name: string; cat1MeanMins?: number; cat2MeanMins?: number }[] };
}

interface RttPoint {
  date: string;
  totalList: number;
  within18wk: number | null;
  pctWithin18wk: number | null;
  over18wk: number | null;
  over52wk: number | null;
  over65wk: number | null;
  over78wk: number | null;
  over104wk: number | null;
  medianWaitWks: number | null;
  p92WaitWks: number | null;
}

interface CancerTrendPoint {
  period: string;
  midYear: number;
  oneYearSurvival: number;
  fiveYearSurvival: number | null;
}

interface CancerSitePoint {
  site: string;
  sex: string;
  oneYearSurvival: number;
  fiveYearSurvival: number | null;
  patients: number | null;
}

interface CancerData {
  byCancerSite: CancerSitePoint[];
  trends: Record<string, CancerTrendPoint[]>;
  latestPeriod: string;
}

interface BedPoint {
  quarter: string;
  date: string;
  availableBeds: number | null;
  occupancyPct: number | null;
  occupancyGaPct: number | null;
}

interface BedData {
  timeSeries: BedPoint[];
}

interface RttData {
  national: { timeSeries: RttPoint[] };
  headlines: {
    totalList: number;
    over52wk: number | null;
    pctWithin18wk: number | null;
    medianWaitWks: number | null;
    latestDate: string;
    prePandemicList: number | null;
  };
}
interface LifeExpectancyPoint {
  year: number;
  maleLE: number;
  femaleLE: number;
}

interface LifeExpectancyData {
  nationalLE: LifeExpectancyPoint[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function isoToDate(s: string): Date {
  // YYYY-MM → first of month
  return new Date(s + '-01');
}

function sparkFrom(series: { date: string; value: number }[], n = 12) {
  return series.slice(-n).map(d => d.value);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function HealthPage() {
  const [gpData, setGpData] = useState<GpData | null>(null);
  const [ambData, setAmbData] = useState<AmbData | null>(null);
  const [rttData, setRttData] = useState<RttData | null>(null);
  const [cancerData, setCancerData] = useState<CancerData | null>(null);
  const [bedData, setBedData] = useState<BedData | null>(null);
  const [leData, setLeData] = useState<LifeExpectancyData | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    fetch('/data/health/gp_appointments.json')
      .then(r => r.json())
      .then(setGpData)
      .catch(console.error);
    fetch('/data/health/ambulance.json')
      .then(r => r.json())
      .then(setAmbData)
      .catch(console.error);
    fetch('/data/health/rtt_waiting.json')
      .then(r => r.json())
      .then(setRttData)
      .catch(console.error);
    fetch('/data/health/cancer_survival.json')
      .then(r => r.json())
      .then(setCancerData)
      .catch(console.error);
    fetch('/data/health/hospital_beds.json')
      .then(r => r.json())
      .then(setBedData)
      .catch(console.error);
    fetch('/data/health/life_expectancy.json')
      .then(r => r.json())
      .then(setLeData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const gpWaitSeries: Series[] = gpData
    ? [
        {
          id: 'national',
          label: 'England average',
          data: gpData.national.timeSeries.map(d => ({
            date: isoToDate(d.date),
            value: d.avgWaitDays,
          })),
        },
      ]
    : [];

  const gpSameDaySeries: Series[] = gpData
    ? [
        {
          id: 'sameday',
          label: '% seen same or next day',
          colour: '#2A9D8F',
          data: gpData.national.timeSeries.map(d => ({
            date: isoToDate(d.date),
            value: d.pctSameOrNextDay,
          })),
        },
      ]
    : [];

  const ambulanceSeries: Series[] = ambData
    ? [
        {
          id: 'cat2',
          label: 'Category 2 (emergency)',
          colour: '#0D1117',
          data: ambData.national.timeSeries
            .filter(d => d.cat2MeanMins !== undefined)
            .map(d => ({
              date: isoToDate(d.date),
              value: d.cat2MeanMins!,
            })),
        },
        {
          id: 'cat1',
          label: 'Category 1 (life-threatening)',
          colour: '#E63946',
          data: ambData.national.timeSeries
            .filter(d => d.cat1MeanMins !== undefined)
            .map(d => ({
              date: isoToDate(d.date),
              value: d.cat1MeanMins!,
            })),
        },
      ]
    : [];

  // P90 response times
  const p90Series: Series[] = ambData
    ? [
        {
          id: 'cat2-p90',
          label: 'Category 2 (90th percentile)',
          colour: '#0D1117',
          data: ambData.national.timeSeries
            .filter(d => d.cat2P90Mins !== undefined)
            .map(d => ({ date: isoToDate(d.date), value: d.cat2P90Mins! })),
        },
        {
          id: 'cat1-p90',
          label: 'Category 1 (90th percentile)',
          colour: '#E63946',
          data: ambData.national.timeSeries
            .filter(d => d.cat1P90Mins !== undefined)
            .map(d => ({ date: isoToDate(d.date), value: d.cat1P90Mins! })),
        },
      ]
    : [];

  // Cat 1 incident volume
  const incidentSeries: Series[] = ambData
    ? [{
        id: 'cat1-incidents',
        label: 'Category 1 incidents',
        colour: '#E63946',
        data: ambData.national.timeSeries
          .filter(d => d.cat1Incidents !== undefined)
          .map(d => ({ date: isoToDate(d.date), value: d.cat1Incidents! })),
      }]
    : [];

  // Total GP appointments volume
  const gpVolumeSeries: Series[] = gpData
    ? [{
        id: 'gp-volume',
        label: 'Total appointments',
        colour: '#264653',
        data: gpData.national.timeSeries.map(d => ({
          date: isoToDate(d.date),
          value: d.totalAppointments,
        })),
      }]
    : [];

  // ── Cancer survival trend series ─────────────────────────────────────────

  const cancerTrendSeries: Series[] = cancerData
    ? [
        { id: 'lung', label: 'Lung', colour: '#E63946',
          data: (cancerData.trends['Lung'] || []).map(d => ({ date: new Date(d.midYear, 0, 1), value: d.oneYearSurvival })) },
        { id: 'colorectal', label: 'Colorectal', colour: '#F4A261',
          data: (cancerData.trends['Colorectal'] || []).map(d => ({ date: new Date(d.midYear, 0, 1), value: d.oneYearSurvival })) },
        { id: 'breast', label: 'Breast (women)', colour: '#2A9D8F',
          data: (cancerData.trends['Breast'] || []).map(d => ({ date: new Date(d.midYear, 0, 1), value: d.oneYearSurvival })) },
        { id: 'prostate', label: 'Prostate (men)', colour: '#264653',
          data: (cancerData.trends['Prostate'] || []).map(d => ({ date: new Date(d.midYear, 0, 1), value: d.oneYearSurvival })) },
      ]
    : [];

  // ── Hospital bed series ────────────────────────────────────────────────

  const bedOccupancySeries: Series[] = bedData
    ? [{
        id: 'bed-occupancy',
        label: 'Overnight bed occupancy (%)',
        colour: '#E63946',
        data: bedData.timeSeries
          .filter(d => d.occupancyPct !== null)
          .map(d => ({ date: isoToDate(d.date), value: d.occupancyPct! })),
      }]
    : [];

  const bedCountSeries: Series[] = bedData
    ? [{
        id: 'bed-count',
        label: 'Available overnight beds',
        colour: '#264653',
        data: bedData.timeSeries
          .filter(d => d.availableBeds !== null)
          .map(d => ({ date: isoToDate(d.date), value: d.availableBeds! })),
      }]
    : [];

  // ── Life Expectancy series ──────────────────────────────────────────────

  const leSeries: Series[] = leData
    ? [
        {
          id: 'male-le',
          label: 'Male',
          colour: '#264653',
          data: leData.nationalLE.map(d => ({
            date: new Date(d.year, 0, 1),
            value: d.maleLE,
          })),
        },
        {
          id: 'female-le',
          label: 'Female',
          colour: '#E63946',
          data: leData.nationalLE.map(d => ({
            date: new Date(d.year, 0, 1),
            value: d.femaleLE,
          })),
        },
      ]
    : [];

  const leAnnotations: Annotation[] = [
    { date: new Date(2011, 0), label: '2011: Growth stalls' },
    { date: new Date(2020, 0), label: '2020: COVID impact' },
  ];

  // ── RTT Waiting list series ──────────────────────────────────────────────

  // Total waiting list size
  const rttTotalSeries: Series[] = rttData
    ? [{
        id: 'rtt-total',
        label: 'Total waiting list',
        colour: '#E63946',
        data: rttData.national.timeSeries
          .filter(d => d.date >= '2012-04')
          .map(d => ({ date: isoToDate(d.date), value: d.totalList })),
      }]
    : [];

  const rttAnnotations: Annotation[] = [
    { date: new Date(2018, 0), label: '2018: 4M list' },
    { date: new Date(2020, 2), label: 'Mar 2020: COVID-19' },
    { date: new Date(2023, 8), label: 'Sep 2023: 7.8M peak' },
  ];

  // Duration bands — over 52wk and over 65wk
  const rttBandSeries: Series[] = rttData
    ? [
        {
          id: 'over-52wk',
          label: 'Waiting > 52 weeks',
          colour: '#E63946',
          data: rttData.national.timeSeries
            .filter(d => d.date >= '2012-04' && d.over52wk !== null)
            .map(d => ({ date: isoToDate(d.date), value: d.over52wk! })),
        },
        ...(rttData.national.timeSeries.some(d => d.over65wk !== null && d.over65wk > 0)
          ? [{
              id: 'over-65wk',
              label: 'Waiting > 65 weeks',
              colour: '#F4A261',
              data: rttData.national.timeSeries
                .filter(d => d.date >= '2020-04' && d.over65wk !== null)
                .map(d => ({ date: isoToDate(d.date), value: d.over65wk! })),
            }]
          : []),
      ]
    : [];

  // Percentage within 18 weeks (constitutional standard)
  const rttPctSeries: Series[] = rttData
    ? [{
        id: 'pct-18wk',
        label: '% within 18 weeks',
        colour: '#264653',
        data: rttData.national.timeSeries
          .filter(d => d.date >= '2012-04' && d.pctWithin18wk !== null)
          .map(d => ({ date: isoToDate(d.date), value: d.pctWithin18wk! })),
      }]
    : [];

  // Waiting list metric values
  const rttLatest = rttData?.headlines;
  const rttListMillions = rttLatest ? (rttLatest.totalList / 1_000_000).toFixed(1) : null;

  const ambulanceAnnotations: Annotation[] = [
    { date: new Date(2018, 3), label: 'Apr 2018: New category system' },
    { date: new Date(2020, 2), label: 'Mar 2020: COVID-19' },
    { date: new Date(2022, 11), label: 'Dec 2022: Peak (93 min)' },
  ];

  // ── Metric values ────────────────────────────────────────────────────────

  const latestGp = gpData?.national.timeSeries.at(-1);
  const firstGp  = gpData?.national.timeSeries[0];
  const gpWaitChange = latestGp && firstGp
    ? (latestGp.avgWaitDays - firstGp.avgWaitDays).toFixed(1)
    : null;

  const latestAmb = ambData?.national.timeSeries.at(-1);
  const preCovid  = ambData?.national.timeSeries.find(d => d.date === '2020-02');

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      {/* Sticky nav */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-wiah-border px-6 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/"><SiteName size="nav" /></Link>
          <span className="text-wiah-mid text-sm font-mono">Health</span>
          <Link href="/" className="text-sm text-wiah-blue hover:underline">← All topics</Link>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Health"
          question="Can You Actually See a Doctor?"
          finding={
            latestAmb && latestGp && preCovid && rttLatest
              ? `${rttListMillions} million people are waiting for NHS treatment — more than at any point in the health service's history.`
              : 'Over 7 million people are on the NHS waiting list — the highest ever recorded.'
          }
          colour="#E63946"
        />

        <section className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              The NHS is caught in a system-wide capacity squeeze. The waiting list has grown from 4.4 million
              before the pandemic to 7.64 million, with over 300,000 people waiting more than a year for
              treatment. Behind that backlog lies a chain of bottlenecks: hospitals running at 92% bed
              occupancy (above the 85% safe maximum) with roughly 100,000 beds &mdash; down from 145,000 in
              2010 &mdash; which means ambulances queue outside full A&amp;E departments, pushing Cat 2 response
              times to 35 minutes against an 18-minute target. At the front door of the system, average GP
              waits have tripled from under 7 days in 2013 to 21 days, while each GP now covers around 2,300
              patients. The NHS is delivering 76 million appointments a month. The problem is not effort but
              arithmetic: demand has outgrown capacity at every stage.
            </p>
            <p>
              Life expectancy reveals something deeper than an operational crisis. For decades, the UK added
              roughly 0.2 years of life per year &mdash; steady, predictable progress. After 2011, that
              improvement stalled almost completely. Male life expectancy sits at 79.0 years, female at
              83.0. COVID caused a visible dip, but the flatlining began nearly a decade earlier and has not
              recovered. The UK is not alone in this &mdash; similar slowdowns have appeared across wealthy
              nations &mdash; but the stall coincided with a period of austerity-driven cuts to public health,
              social care, and local government services. The causes remain debated; the trend does not.
            </p>
            <p>
              Not everything is deteriorating. Cancer survival has improved markedly: five-year lung cancer
              survival has risen from 10.4% to 16.2%, breast cancer survival exceeds 85%, and melanoma
              survival tops 91%. These gains reflect genuine advances in screening, diagnostics, and treatment.
              Life expectancy, at 79 and 83 years, remains high by historical standards. The picture is one
              of a health system producing better clinical outcomes within an infrastructure that can no longer
              absorb the volume of demand placed on it.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-waiting', label: 'Waiting Lists' },
          { id: 'sec-ambulance', label: 'Ambulance' },
          { id: 'sec-life-expectancy', label: 'Life Expectancy' },
          { id: 'sec-gp', label: 'GP Access' },
          { id: 'sec-map', label: 'Regional Map' },
        ]} />

        {/* Metric cards */}
        <ScrollReveal>
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <MetricCard
            label="NHS waiting list"
            value={rttListMillions ? `${rttListMillions}M` : '—'}
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText={
              rttLatest
                ? `${rttLatest.prePandemicList ? (rttLatest.prePandemicList / 1_000_000).toFixed(1) : '4.4'}M pre-pandemic · ${((rttLatest.over52wk ?? 0) / 1000).toFixed(0)}K over 52 weeks`
                : 'Loading…'
            }
            sparklineData={
              rttData
                ? rttData.national.timeSeries.filter(d => d.date >= '2015-01').filter((_, i) => i % 3 === 0).map(d => d.totalList / 1_000_000)
                : []
            }
            source="NHS England · RTT Waiting Times"
            baseline="More than 1 in 8 people in England waiting for hospital treatment"
            onExpand={rttTotalSeries.length > 0 ? () => setExpanded('rtt') : undefined}
          />
          <MetricCard
            label="Avg GP wait"
            value={latestGp ? latestGp.avgWaitDays.toFixed(1) : '—'}
            unit="days"
            direction={gpWaitChange && parseFloat(gpWaitChange) > 0 ? 'up' : 'flat'}
            polarity="up-is-bad"
            changeText={
              latestGp
                ? `${latestGp.pctSameOrNextDay}% seen same or next day`
                : 'Loading…'
            }
            sparklineData={
              gpData
                ? sparkFrom(gpData.national.timeSeries.map(d => ({ date: d.date, value: d.avgWaitDays })))
                : []
            }
            source="NHS England · Appointments in General Practice"
            baseline="21 days to see a GP now — was under 7 days in 2013"
            onExpand={gpWaitSeries.length > 0 ? () => setExpanded('gp-wait') : undefined}
          />
          <MetricCard
            label="Cat 2 ambulance wait"
            value={latestAmb ? latestAmb.cat2MeanMins?.toFixed(0) ?? '—' : '—'}
            unit="min"
            direction="up"
            polarity="up-is-bad"
            changeText={
              latestAmb && preCovid
                ? `+${((latestAmb.cat2MeanMins ?? 0) - (preCovid.cat2MeanMins ?? 0)).toFixed(0)} min vs pre-pandemic · Target: 18 min`
                : 'Target: 18 min'
            }
            sparklineData={
              ambData
                ? sparkFrom(
                    ambData.national.timeSeries
                      .filter(d => d.cat2MeanMins !== undefined)
                      .map(d => ({ date: d.date, value: d.cat2MeanMins! }))
                  )
                : []
            }
            source="NHS England · Ambulance Quality Indicators"
            baseline="Ambulances now take 34 minutes on average — nearly twice the 18-minute target set in 2017"
            onExpand={ambulanceSeries.length > 0 ? () => setExpanded('ambulance') : undefined}
          />
          <MetricCard
            label="Cat 1 ambulance wait"
            value={latestAmb ? latestAmb.cat1MeanMins?.toFixed(1) ?? '—' : '—'}
            unit="min"
            direction="up"
            polarity="up-is-bad"
            changeText="Target: 7 min mean"
            sparklineData={
              ambData
                ? sparkFrom(
                    ambData.national.timeSeries
                      .filter(d => d.cat1MeanMins !== undefined)
                      .map(d => ({ date: d.date, value: d.cat1MeanMins! }))
                  )
                : []
            }
            source="NHS England · Ambulance Quality Indicators"
            onExpand={ambulanceSeries.length > 0 ? () => setExpanded('cat1') : undefined}
          />
        </div>
        </ScrollReveal>

        {/* Postcode lookup */}
        <ScrollReveal>
        <div className="mb-16 p-6 bg-wiah-light rounded-lg">
          <h2 className="text-lg font-bold text-wiah-black mb-2">How is your area doing?</h2>
          <p className="text-sm text-wiah-mid mb-4">
            Enter your postcode to see your local ambulance trust and GP wait times compared to the national average.
          </p>
          <PostcodeLookup
            gpIcbs={gpData?.regional.byICB}
            ambTrusts={ambData?.regional.byTrust}
            nationalGpWait={latestGp?.avgWaitDays}
            nationalCat2={latestAmb?.cat2MeanMins}
          />
        </div>
        </ScrollReveal>

        {/* RTT Chart 1: Total waiting list size */}
        <div id="sec-waiting">
        {rttTotalSeries.length > 0 ? (
          <LineChart
            title="NHS waiting list size, 2012–2025"
            subtitle="Total incomplete pathways — the number of people waiting to start consultant-led treatment, England."
            series={rttTotalSeries}
            annotations={rttAnnotations}
            yLabel="Patients"
            source={{
              name: 'NHS England',
              dataset: 'Consultant-led Referral to Treatment Waiting Times',
              frequency: 'monthly',
              url: 'https://www.england.nhs.uk/statistics/statistical-work-areas/rtt-waiting-times/',
            }}
          />
        ) : (
          <div className="h-64 bg-wiah-light rounded animate-pulse mb-16" />
        )}

        {/* RTT Chart 2: Long waits — over 52 weeks */}
        {rttBandSeries.length > 0 ? (
          <LineChart
            title="Patients waiting over 52 weeks, 2012–2025"
            subtitle="Number of patients waiting more than one year for treatment. Over 65 weeks tracked from April 2021."
            series={rttBandSeries}
            yLabel="Patients"
            source={{
              name: 'NHS England',
              dataset: 'Consultant-led Referral to Treatment Waiting Times',
              frequency: 'monthly',
              url: 'https://www.england.nhs.uk/statistics/statistical-work-areas/rtt-waiting-times/',
            }}
          />
        ) : (
          <div className="h-64 bg-wiah-light rounded animate-pulse mb-16" />
        )}

        {/* RTT Chart 3: % within 18 weeks */}
        {rttPctSeries.length > 0 ? (
          <LineChart
            title="Patients treated within 18 weeks, 2012–2025"
            subtitle="Percentage of patients on incomplete pathways within the 18-week constitutional standard. Target: 92%."
            series={rttPctSeries}
            targetLine={{ value: 92, label: 'Constitutional standard: 92%' }}
            yLabel="Percent"
            source={{
              name: 'NHS England',
              dataset: 'Consultant-led Referral to Treatment Waiting Times',
              frequency: 'monthly',
              url: 'https://www.england.nhs.uk/statistics/statistical-work-areas/rtt-waiting-times/',
            }}
          />
        ) : (
          <div className="h-64 bg-wiah-light rounded animate-pulse mb-16" />
        )}

        </div>{/* end sec-waiting */}

        {/* Chart 4: Ambulance response times */}
        <div id="sec-ambulance">
        {ambulanceSeries.length > 0 ? (
          <LineChart
            title="Ambulance response times, 2017–2026"
            subtitle="Mean response time in minutes, England. Category 2 target: 18 minutes."
            series={ambulanceSeries}
            annotations={ambulanceAnnotations}
            targetLine={{ value: 18, label: 'Cat 2 target: 18 min' }}
            yLabel="Minutes"
            source={{
              name: 'NHS England',
              dataset: 'Ambulance Quality Indicators — AmbSYS Timeseries',
              frequency: 'monthly',
              url: 'https://www.england.nhs.uk/statistics/statistical-work-areas/ambulance-quality-indicators/',
            }}
          />
        ) : (
          <div className="h-64 bg-wiah-light rounded animate-pulse mb-16" />
        )}

        </div>{/* end sec-ambulance */}

        {/* Life Expectancy section */}
        <div id="sec-life-expectancy">
        {leSeries.length > 0 ? (
          <ScrollReveal>
          <LineChart
            title="Life expectancy at birth, UK, 1981–2023"
            subtitle="Years of life expected at birth, 3-year rolling averages. Growth stalled after 2011."
            series={leSeries}
            annotations={leAnnotations}
            yLabel="Years"
            source={{
              name: 'ONS',
              dataset: 'National Life Tables, United Kingdom',
              frequency: 'annual',
              url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/birthsdeathsandmarriages/lifeexpectancies/datasets/nationallifetablesunitedkingdomreferencetables',
            }}
          />
          </ScrollReveal>
        ) : (
          <div className="h-64 bg-wiah-light rounded animate-pulse mb-16" />
        )}
        <ScrollReveal>
        <div className="max-w-2xl mb-16">
          <p className="text-base text-wiah-black leading-[1.7] mb-4">
            UK life expectancy at birth rose steadily throughout the twentieth century, driven by
            improvements in infant and child mortality, better nutrition, and advances in medicine.
            Male life expectancy increased from around 70 years in the early 1980s to nearly 80
            by 2014.
          </p>
          <p className="text-base text-wiah-black leading-[1.7]">
            Since 2011, progress has stalled. The rate of improvement slowed dramatically,
            with some years recording slight falls. The COVID-19 pandemic caused a sharp drop
            in 2020 — male life expectancy fell by 1.2 years in a single year. Recovery
            since 2021 has been partial. The most recent data (2022–2024) shows male
            life expectancy at 79.1 years and female at 83.0 years, below the pre-pandemic peak.
          </p>
        </div>
        </ScrollReveal>
        </div>{/* end sec-life-expectancy */}

        {/* Chart 2: GP appointment wait */}
        <div id="sec-gp">
        {gpWaitSeries.length > 0 ? (
          <LineChart
            title="GP appointment wait times, Jul 2023–Dec 2025"
            subtitle="Average days from booking to appointment, England. All attended appointments."
            series={gpWaitSeries}
            yLabel="Days"
            source={{
              name: 'NHS England',
              dataset: 'Appointments in General Practice',
              frequency: 'monthly',
              url: 'https://digital.nhs.uk/data-and-information/publications/statistical/appointments-in-general-practice',
            }}
          />
        ) : (
          <div className="h-64 bg-wiah-light rounded animate-pulse mb-16" />
        )}

        {/* Chart 3: Same/next day appointments */}
        {gpSameDaySeries.length > 0 ? (
          <LineChart
            title="Same or next day GP appointments, Jul 2023–Dec 2025"
            subtitle="Percentage of attended appointments booked same day or one day prior, England."
            series={gpSameDaySeries}
            yLabel="Percent"
            source={{
              name: 'NHS England',
              dataset: 'Appointments in General Practice',
              frequency: 'monthly',
              url: 'https://digital.nhs.uk/data-and-information/publications/statistical/appointments-in-general-practice',
            }}
          />
        ) : (
          <div className="h-64 bg-wiah-light rounded animate-pulse mb-16" />
        )}

        {/* Chart 4: Total GP appointment volume */}
        {gpVolumeSeries.length > 0 ? (
          <LineChart
            title="Total GP appointments per month, Jul 2023–Dec 2025"
            subtitle="All attended appointments across England. Seasonal dips in December, peaks in October."
            series={gpVolumeSeries}
            yLabel="Appointments"
            source={{
              name: 'NHS England',
              dataset: 'Appointments in General Practice',
              frequency: 'monthly',
              url: 'https://digital.nhs.uk/data-and-information/publications/statistical/appointments-in-general-practice',
            }}
          />
        ) : (
          <div className="h-64 bg-wiah-light rounded animate-pulse mb-16" />
        )}

        {/* Chart 5: Ambulance P90 response times */}
        {p90Series.length > 0 ? (
          <LineChart
            title="Ambulance 90th percentile response times, 2017–2026"
            subtitle="9 in 10 patients waited this long or less. Cat 2 P90 target: 40 minutes."
            series={p90Series}
            annotations={ambulanceAnnotations}
            targetLine={{ value: 40, label: 'Cat 2 P90 target: 40 min' }}
            yLabel="Minutes"
            source={{
              name: 'NHS England',
              dataset: 'Ambulance Quality Indicators — AmbSYS Timeseries',
              frequency: 'monthly',
              url: 'https://www.england.nhs.uk/statistics/statistical-work-areas/ambulance-quality-indicators/',
            }}
          />
        ) : (
          <div className="h-64 bg-wiah-light rounded animate-pulse mb-16" />
        )}

        {/* Chart 6: Cat 1 incident volume */}
        {incidentSeries.length > 0 ? (
          <LineChart
            title="Category 1 incidents per month, 2017–2026"
            subtitle="Life-threatening 999 calls requiring the fastest response, England."
            series={incidentSeries}
            yLabel="Incidents"
            source={{
              name: 'NHS England',
              dataset: 'Ambulance Quality Indicators — AmbSYS Timeseries',
              frequency: 'monthly',
              url: 'https://www.england.nhs.uk/statistics/statistical-work-areas/ambulance-quality-indicators/',
            }}
          />
        ) : (
          <div className="h-64 bg-wiah-light rounded animate-pulse mb-16" />
        )}

        {/* Trust table — latest month, Cat 1 + Cat 2 */}
        {ambData && ambData.regional.byTrust.length > 0 && (
          <section className="mb-16">
            <h2 className="text-xl font-bold text-wiah-black mb-1">
              Response times by ambulance trust
            </h2>
            <p className="text-sm text-wiah-mid font-mono mb-6">
              Latest month ({ambData.national.timeSeries.at(-1)?.date}). Cat 1 target: 7 min · Cat 2 target: 18 min.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-wiah-border">
                    <th className="text-left py-2 pr-4 font-mono text-xs text-wiah-mid">Trust</th>
                    <th className="text-right py-2 px-3 font-mono text-xs text-wiah-mid">Cat 1</th>
                    <th className="text-right py-2 px-3 font-mono text-xs text-wiah-mid">Cat 2</th>
                    <th className="py-2 pl-3 font-mono text-xs text-wiah-mid w-40">Cat 2 vs target</th>
                  </tr>
                </thead>
                <tbody>
                  {[...ambData.regional.byTrust]
                    .sort((a, b) => (b.cat2MeanMins ?? 0) - (a.cat2MeanMins ?? 0))
                    .map(trust => {
                      const cat2 = trust.cat2MeanMins ?? 0;
                      const cat1 = trust.cat1MeanMins ?? 0;
                      const pct = Math.min((cat2 / 60) * 100, 100);
                      const c2colour = cat2 > 30 ? '#E63946' : cat2 > 18 ? '#F4A261' : '#2A9D8F';
                      const c1colour = cat1 > 10 ? '#E63946' : cat1 > 7 ? '#F4A261' : '#2A9D8F';
                      return (
                        <tr key={trust.code} className="border-b border-wiah-border/50 hover:bg-wiah-light/50">
                          <td className="py-2 pr-4 text-sm">{trust.name}</td>
                          <td className="py-2 px-3 font-mono text-sm text-right font-bold" style={{ color: c1colour }}>
                            {cat1.toFixed(1)}
                          </td>
                          <td className="py-2 px-3 font-mono text-sm text-right font-bold" style={{ color: c2colour }}>
                            {cat2.toFixed(0)}
                          </td>
                          <td className="py-2 pl-3">
                            <div className="bg-wiah-light rounded h-2 w-full">
                              <div className="h-2 rounded" style={{ width: `${pct}%`, backgroundColor: c2colour }} />
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
            <p className="font-mono text-xs text-wiah-mid mt-3">
              Source: NHS England, Ambulance Quality Indicators. Sorted by Cat 2 mean response time (worst first).
            </p>
          </section>
        )}

        {/* ICB table — GP wait */}
        {gpData && gpData.regional.byICB.length > 0 && (
          <section className="mb-16">
            <h2 className="text-xl font-bold text-wiah-black mb-1">
              GP wait by ICB area
            </h2>
            <p className="text-sm text-wiah-mid font-mono mb-6">
              Latest month ({gpData.national.timeSeries.at(-1)?.date}). 42 Integrated Care Boards.
            </p>
            <div className="divide-y divide-wiah-border">
              {gpData.regional.byICB.slice(0, 15).map(icb => {
                const days = icb.avgWaitDays;
                const pct = Math.min((days / 12) * 100, 100);
                const colour = days > 8 ? '#E63946' : days > 6 ? '#F4A261' : '#2A9D8F';
                return (
                  <div key={icb.code} className="py-3 flex items-center gap-4">
                    <span className="text-sm text-wiah-black w-64 shrink-0">{icb.name}</span>
                    <div className="flex-1 bg-wiah-light rounded h-2">
                      <div
                        className="h-2 rounded"
                        style={{ width: `${pct}%`, backgroundColor: colour }}
                      />
                    </div>
                    <span
                      className="font-mono text-sm font-bold w-16 text-right"
                      style={{ color: colour }}
                    >
                      {days.toFixed(1)}d
                    </span>
                  </div>
                );
              })}
            </div>
            <p className="font-mono text-xs text-wiah-mid mt-3">
              Source: NHS England, Appointments in General Practice
            </p>
          </section>
        )}

        </div>{/* end sec-gp */}

        {/* Regional map: GP wait by ICB */}
        <div id="sec-map">
        {gpData && gpData.regional.byICB.length > 0 && (
          <ScrollReveal>
            <RegionalMap
              title="GP wait times by ICB area"
              subtitle="Average days from booking to appointment. 42 Integrated Care Boards, England."
              geoUrl="/geo/icb.geojson"
              data={gpData.regional.byICB.map(icb => {
                // Normalise: GeoJSON uses "Hampshire and Isle of Wight" (no "the")
                const raw = icb.fullName || `NHS ${icb.name} Integrated Care Board`;
                return { name: raw.replace(' and the Isle of Wight', ' and Isle of Wight'), value: icb.avgWaitDays };
              })}
              nameField="ICB23NM"
              valueLabel="days"
              colourDirection="low-is-good"
              source={{
                name: 'NHS England',
                dataset: 'Appointments in General Practice',
                url: 'https://digital.nhs.uk/data-and-information/publications/statistical/appointments-in-general-practice',
                frequency: 'monthly',
              }}
            />
          </ScrollReveal>
        )}

        </div>{/* end sec-map */}

        {/* Cancer survival trend chart */}
        {cancerTrendSeries.length > 0 ? (
          <LineChart
            title="Cancer 1-year survival rates by type, 2008–2015"
            subtitle="Age-standardised net survival (%), rolling 5-year cohorts. Midpoint year shown. England, adults 15-99."
            series={cancerTrendSeries}
            yLabel="Percent"
            source={{
              name: 'Office for National Statistics',
              dataset: 'Cancer survival in England — adults diagnosed 2013–2017',
              frequency: 'annual (~2yr publication lag)',
              url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/healthandsocialcare/conditionsanddiseases/datasets/cancersurvivalratescancersurvivalinenglandadultsdiagnosed',
            }}
          />
        ) : (
          <div className="h-64 bg-wiah-light rounded animate-pulse mb-16" />
        )}

        {/* Cancer survival by type — horizontal bar table */}
        {cancerData && cancerData.byCancerSite.length > 0 && (
          <section className="mb-16">
            <h3 className="text-lg font-bold text-wiah-black mb-1">
              Cancer survival by type ({cancerData.latestPeriod})
            </h3>
            <p className="text-sm text-wiah-mid font-mono mb-6">
              5-year age-standardised net survival (%). England, adults 15-99. Sorted by 5-year survival rate.
            </p>
            <div className="space-y-2">
              {cancerData.byCancerSite
                .filter(c => c.fiveYearSurvival !== null)
                .map(c => {
                  const pct = c.fiveYearSurvival!;
                  const colour = pct >= 80 ? '#2A9D8F' : pct >= 50 ? '#F4A261' : '#E63946';
                  return (
                    <div key={c.site} className="flex items-center gap-3">
                      <span className="text-xs text-wiah-black w-44 shrink-0 truncate">{c.site}</span>
                      <div className="flex-1 bg-wiah-light rounded h-3">
                        <div className="h-3 rounded" style={{ width: `${pct}%`, backgroundColor: colour }} />
                      </div>
                      <span className="font-mono text-xs font-bold w-12 text-right" style={{ color: colour }}>
                        {pct.toFixed(0)}%
                      </span>
                    </div>
                  );
                })}
            </div>
            <p className="font-mono text-[11px] text-wiah-mid mt-3">
              Source: ONS, Cancer survival in England, adults diagnosed {cancerData.latestPeriod}. Green ≥80%, amber ≥50%, red &lt;50%.
            </p>
          </section>
        )}

        {/* Hospital bed occupancy chart */}
        {bedOccupancySeries.length > 0 ? (
          <LineChart
            title="NHS overnight bed occupancy, 2010–2026"
            subtitle="Quarterly average, all overnight beds, England. 85% is considered the safe maximum."
            series={bedOccupancySeries}
            targetLine={{ value: 85, label: 'Safe occupancy: 85%' }}
            yLabel="Percent"
            annotations={[
              { date: new Date(2020, 2), label: 'Mar 2020: COVID-19' },
            ]}
            source={{
              name: 'NHS England',
              dataset: 'KH03 Bed Availability and Occupancy',
              frequency: 'quarterly',
              url: 'https://www.england.nhs.uk/statistics/statistical-work-areas/bed-availability-and-occupancy/bed-availability-and-occupancy-kh03/',
            }}
          />
        ) : (
          <div className="h-64 bg-wiah-light rounded animate-pulse mb-16" />
        )}

        {/* Total overnight beds chart */}
        {bedCountSeries.length > 0 ? (
          <LineChart
            title="Total overnight NHS beds, 2010–2026"
            subtitle="Average daily available overnight beds, England. Long-term capacity decline."
            series={bedCountSeries}
            yLabel="Beds"
            source={{
              name: 'NHS England',
              dataset: 'KH03 Bed Availability and Occupancy',
              frequency: 'quarterly',
              url: 'https://www.england.nhs.uk/statistics/statistical-work-areas/bed-availability-and-occupancy/bed-availability-and-occupancy-kh03/',
            }}
          />
        ) : (
          <div className="h-64 bg-wiah-light rounded animate-pulse mb-16" />
        )}

        {/* Positive story */}
        <ScrollReveal>
        <PositiveCallout
          title="What's improving"
          value="+56%"
          description="Five-year lung cancer survival has risen from 10.4% to 16.2% over the past decade. Breast cancer five-year survival now exceeds 85%, and melanoma exceeds 91%. Earlier diagnosis and better treatments are saving thousands more lives each year."
          source="Source: ONS — Cancer survival in England, adults diagnosed 2013–2017."
        />
        </ScrollReveal>

        {/* Sources */}
        <section className="border-t border-wiah-border pt-8">
          <h2 className="text-lg font-bold text-wiah-black mb-4">Sources &amp; methodology</h2>
          <ul className="space-y-2 font-mono text-xs text-wiah-mid">
            <li>
              <a
                href="https://www.england.nhs.uk/statistics/statistical-work-areas/rtt-waiting-times/"
                className="underline hover:text-wiah-blue"
                target="_blank" rel="noreferrer"
              >
                NHS England — Consultant-led Referral to Treatment Waiting Times (monthly)
              </a>
              {' '}— total incomplete pathways, duration bands (18wk, 52wk, 65wk), national overview timeseries.
            </li>
            <li>
              <a
                href="https://digital.nhs.uk/data-and-information/publications/statistical/appointments-in-general-practice"
                className="underline hover:text-wiah-blue"
                target="_blank" rel="noreferrer"
              >
                NHS England — Appointments in General Practice (monthly)
              </a>
              {' '}— weighted average wait from 42 ICB regional CSVs, attended appointments only.
            </li>
            <li>
              <a
                href="https://www.england.nhs.uk/statistics/statistical-work-areas/ambulance-quality-indicators/"
                className="underline hover:text-wiah-blue"
                target="_blank" rel="noreferrer"
              >
                NHS England — Ambulance Quality Indicators (monthly)
              </a>
              {' '}— AmbSYS timeseries, Raw sheet, England national rows, seconds converted to minutes.
            </li>
            <li>
              <a
                href="https://www.ons.gov.uk/peoplepopulationandcommunity/healthandsocialcare/conditionsanddiseases/datasets/cancersurvivalratescancersurvivalinenglandadultsdiagnosed"
                className="underline hover:text-wiah-blue"
                target="_blank" rel="noreferrer"
              >
                ONS — Cancer Survival in England, adults diagnosed (annual, ~2yr lag)
              </a>
              {' '}— age-standardised net survival, 5-year rolling cohorts, 29 cancer sites.
            </li>
            <li>
              <a
                href="https://www.england.nhs.uk/statistics/statistical-work-areas/bed-availability-and-occupancy/bed-availability-and-occupancy-kh03/"
                className="underline hover:text-wiah-blue"
                target="_blank" rel="noreferrer"
              >
                NHS England — KH03 Bed Availability and Occupancy (quarterly)
              </a>
              {' '}— overnight beds, available and occupied, by trust and nationally.
            </li>
            <li>
              <a
                href="https://www.ons.gov.uk/peoplepopulationandcommunity/birthsdeathsandmarriages/lifeexpectancies/datasets/nationallifetablesunitedkingdomreferencetables"
                className="underline hover:text-wiah-blue"
                target="_blank" rel="noreferrer"
              >
                ONS — National Life Tables, United Kingdom (annual)
              </a>
              {' '}— period life expectancy at birth, 3-year rolling averages, UK. 1980–82 to 2022–24.
            </li>
          </ul>
          <p className="font-mono text-xs text-wiah-mid mt-4">
            Data updated automatically each Monday via GitHub Actions. Last pipeline run:{' '}
            {new Date().toISOString().slice(0, 10)}.
          </p>
        </section>
      </main>

      {/* Expanded metric modal */}
      {expanded === 'rtt' && (
        <MetricDetailModal
          title="NHS waiting list size, 2012–2025"
          subtitle="Total incomplete pathways — people waiting to start consultant-led treatment, England."
          series={rttTotalSeries}
          annotations={rttAnnotations}
          yLabel="Patients"
          source={{
            name: 'NHS England',
            dataset: 'Consultant-led Referral to Treatment Waiting Times',
            frequency: 'monthly',
            url: 'https://www.england.nhs.uk/statistics/statistical-work-areas/rtt-waiting-times/',
          }}
          onClose={() => setExpanded(null)}
        />
      )}
      {expanded === 'gp-wait' && (
        <MetricDetailModal
          title="GP appointment wait times, Jul 2023–Dec 2025"
          subtitle="Average days from booking to appointment, England. All attended appointments."
          series={gpWaitSeries}
          yLabel="Days"
          source={{
            name: 'NHS England',
            dataset: 'Appointments in General Practice',
            frequency: 'monthly',
            url: 'https://digital.nhs.uk/data-and-information/publications/statistical/appointments-in-general-practice',
          }}
          onClose={() => setExpanded(null)}
        />
      )}
      {expanded === 'ambulance' && (
        <MetricDetailModal
          title="Ambulance response times, 2017–2026"
          subtitle="Mean response time in minutes, England. Category 2 target: 18 minutes."
          series={ambulanceSeries}
          annotations={ambulanceAnnotations}
          targetLine={{ value: 18, label: 'Cat 2 target: 18 min' }}
          yLabel="Minutes"
          source={{
            name: 'NHS England',
            dataset: 'Ambulance Quality Indicators — AmbSYS Timeseries',
            frequency: 'monthly',
            url: 'https://www.england.nhs.uk/statistics/statistical-work-areas/ambulance-quality-indicators/',
          }}
          onClose={() => setExpanded(null)}
        />
      )}
      {expanded === 'cat1' && (
        <MetricDetailModal
          title="Category 1 ambulance response times, 2017–2026"
          subtitle="Mean response time in minutes for life-threatening calls, England. Target: 7 minutes."
          series={ambulanceSeries.filter(s => s.id === 'cat1')}
          annotations={ambulanceAnnotations}
          targetLine={{ value: 7, label: 'Cat 1 target: 7 min' }}
          yLabel="Minutes"
          source={{
            name: 'NHS England',
            dataset: 'Ambulance Quality Indicators — AmbSYS Timeseries',
            frequency: 'monthly',
            url: 'https://www.england.nhs.uk/statistics/statistical-work-areas/ambulance-quality-indicators/',
          }}
          onClose={() => setExpanded(null)}
        />
      )}
    </>
  );
}
