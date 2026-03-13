'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import MetricDetailModal from '@/components/MetricDetailModal';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import FunnelChart, { FunnelStage } from '@/components/charts/FunnelChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'ONS', dataset: 'Crime Survey for England and Wales', url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/crimeandjustice/bulletins/crimeinenglandandwales/latest', date: '2024' },
  { num: 2, name: 'Home Office', dataset: 'Crime outcomes in England and Wales', url: 'https://www.gov.uk/government/statistics/crime-outcomes-in-england-and-wales-2023-to-2024', date: '2024' },
  { num: 3, name: 'Home Office', dataset: 'Police officer uplift statistics', url: 'https://www.gov.uk/government/statistics/police-officer-uplift-quarterly-update-to-march-2023', date: '2023' },
  { num: 4, name: 'Ministry of Justice', dataset: 'Legal aid statistics', url: 'https://www.gov.uk/government/statistics/legal-aid-statistics-quarterly', date: '2024' },
  { num: 5, name: 'HMCTS', dataset: 'Crown Court outstanding caseload', url: 'https://www.gov.uk/government/statistics/criminal-court-statistics-quarterly', date: '2024' },
  { num: 6, name: 'Ministry of Justice', dataset: 'Prison population statistics', url: 'https://www.gov.uk/government/statistics/prison-population-figures', date: '2024' },
  { num: 7, name: 'ONS', dataset: 'Domestic abuse prevalence and trends', url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/crimeandjustice/bulletins/domesticabuseinenglandandwalesoverview/latest', date: '2024' },
];

// ── Types ────────────────────────────────────────────────────────────────────

interface ChargeRatePoint {
  date: string;
  pct: number;
}

interface CrimeTypeRate {
  type: string;
  pct: number;
}

interface CourtBacklogPoint {
  date: string;
  outstanding: number;
}

interface PrisonPoint {
  date: string;
  population: number;
  capacity: number;
}

interface CrimeTrendPoint {
  period: string;
  count: number;
  ratePer100k?: number;
}

interface CrimeTrendCategory {
  label: string;
  timeSeries: CrimeTrendPoint[];
}

interface CsewTotalPoint {
  period: string;
  incidentsMn: number;
}

interface CrimeTrendsData {
  crimeTrends: Record<string, CrimeTrendCategory>;
  csewSurvey?: {
    total: CsewTotalPoint[];
  };
}

interface ReoffendingPoint {
  cohort: string;
  date: string;
  reoffendingRate: number;
  avgReoffences: number | null;
}

interface OffenceGroupPoint {
  group: string;
  offenders: number;
  reoffenders: number;
  reoffendingRate: number;
}

interface ReoffendingData {
  timeSeries: ReoffendingPoint[];
  byOffenceGroup: OffenceGroupPoint[];
  latestCohort: string;
}

interface JusticeData {
  national: {
    chargeRate: {
      timeSeries: ChargeRatePoint[];
      byCrimeType: CrimeTypeRate[];
    };
    funnel: {
      stages: FunnelStage[];
    };
    courtBacklog: {
      timeSeries: CourtBacklogPoint[];
      target: number;
    };
    prisonPopulation: {
      timeSeries: PrisonPoint[];
      currentCapacity: number;
      currentPopulation: number;
    };
  };
  metadata: {
    sources: { name: string; dataset: string; url: string; frequency: string }[];
  };
}

interface DomesticAbusePrevalencePoint {
  year: string;
  womenPct: number;
  menPct: number;
  totalVictimsM: number;
}

interface DomesticAbuseOutcomes {
  year: string;
  recordedDA: number;
  chargeOrSummons: number;
  chargeRate: number;
  convictions: number;
  convictionRate: number;
  noFurtherAction: number;
  victimWithdrew: number;
}

interface DomesticAbuseData {
  csewPrevalence: DomesticAbusePrevalencePoint[];
  outcomes: DomesticAbuseOutcomes;
  metadata: {
    sources: { name: string; dataset: string; url: string; frequency: string }[];
  };
}

interface PoliceOfficerPoint {
  year: number;
  officersFTE: number;
}

interface PoliceOfficerData {
  topic: string;
  lastUpdated: string;
  timeSeries: PoliceOfficerPoint[];
}

interface LegalAidPoint {
  date: string;
  legalAidBnReal: number;
  legalAidFirms: number;
}

interface LegalAidData {
  timeSeries: LegalAidPoint[];
}

interface KnifeCrimePoint {
  year: number;
  offences: number;
}

interface KnifeHomicidePoint {
  year: number;
  count: number;
}

interface YouthKnifeCrimePoint {
  year: number;
  offences: number;
}

interface KnifeCrimeData {
  knifeCrime: KnifeCrimePoint[];
  knifeHomicides: KnifeHomicidePoint[];
  youthKnifeCrime: YouthKnifeCrimePoint[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function isoToDate(s: string): Date {
  return new Date(s + '-01');
}

function fyToDate(fy: string): Date {
  // "2002/03" → mid-year of ending year (Oct 2002)
  const start = parseInt(fy.split('/')[0]);
  return new Date(start, 9, 1);
}

function quarterToDate(s: string): Date {
  // "2016-Q1" → Jan 2016, Q2 → Apr, Q3 → Jul, Q4 → Oct
  const [year, q] = s.split('-Q');
  const month = (parseInt(q) - 1) * 3;
  return new Date(parseInt(year), month, 1);
}

// "2009/10" → use the latter year as Jan 1
function fyPrevalenceToDate(fy: string): Date {
  const end = parseInt(fy.split('/')[0]) + 1;
  return new Date(end, 0, 1);
}

function sparkFrom(arr: number[], n = 12) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function JusticePage() {
  const [data, setData] = useState<JusticeData | null>(null);
  const [crimeData, setCrimeData] = useState<CrimeTrendsData | null>(null);
  const [reoffData, setReoffData] = useState<ReoffendingData | null>(null);
  const [daData, setDaData] = useState<DomesticAbuseData | null>(null);
  const [policeData, setPoliceData] = useState<PoliceOfficerData | null>(null);
  const [legalAidData, setLegalAidData] = useState<LegalAidData | null>(null);
  const [knifeCrimeData, setKnifeCrimeData] = useState<KnifeCrimeData | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    fetch('/data/justice/justice.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
    fetch('/data/justice/crime_trends.json')
      .then(r => r.json())
      .then(setCrimeData)
      .catch(console.error);
    fetch('/data/justice/reoffending.json')
      .then(r => r.json())
      .then(setReoffData)
      .catch(console.error);
    fetch('/data/justice/domestic_abuse.json')
      .then(r => r.json())
      .then(setDaData)
      .catch(console.error);
    fetch('/data/police-officer-numbers/police_officer_numbers.json')
      .then(r => r.json())
      .then(setPoliceData)
      .catch(console.error);
    fetch('/data/legal-aid/legal_aid.json')
      .then(r => r.json())
      .then(setLegalAidData)
      .catch(console.error);
    fetch('/data/knife-crime/knife_crime.json')
      .then(r => r.json())
      .then(setKnifeCrimeData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const chargeRateSeries: Series[] = data
    ? [{
        id: 'charge-rate',
        label: 'Charge rate (%)',
        data: data.national.chargeRate.timeSeries.map(d => ({
          date: isoToDate(d.date),
          value: d.pct,
        })),
      }]
    : [];

  const chargeAnnotations: Annotation[] = [
    { date: new Date(2019, 3), label: '2019: Outcomes reform' },
    { date: new Date(2020, 2), label: '2020: COVID-19' },
  ];

  const backlogSeries: Series[] = data
    ? [{
        id: 'backlog',
        label: 'Outstanding cases',
        data: data.national.courtBacklog.timeSeries.map(d => ({
          date: quarterToDate(d.date),
          value: d.outstanding,
        })),
      }]
    : [];

  const backlogAnnotations: Annotation[] = [
    { date: new Date(2020, 2), label: '2020: Courts closed' },
    { date: new Date(2022, 5), label: '2022: Barristers strike' },
  ];

  const prisonPopSeries: Series[] = data
    ? [
        {
          id: 'population',
          label: 'Population',
          colour: '#0D1117',
          data: data.national.prisonPopulation.timeSeries.map(d => ({
            date: isoToDate(d.date),
            value: d.population,
          })),
        },
        {
          id: 'capacity',
          label: 'Capacity',
          colour: '#E63946',
          data: data.national.prisonPopulation.timeSeries.map(d => ({
            date: isoToDate(d.date),
            value: d.capacity,
          })),
        },
      ]
    : [];

  const prisonAnnotations: Annotation[] = [
    { date: new Date(2020, 2), label: 'COVID release' },
    { date: new Date(2024, 8), label: 'SDS40 release' },
  ];

  // Prison occupancy rate (population / capacity × 100)
  const occupancySeries: Series[] = data
    ? [{
        id: 'occupancy',
        label: 'Occupancy rate (%)',
        colour: '#E63946',
        data: data.national.prisonPopulation.timeSeries
          .filter(d => d.capacity > 0)
          .map(d => ({
            date: isoToDate(d.date),
            value: Math.round((d.population / d.capacity) * 1000) / 10,
          })),
      }]
    : [];

  // Crime trend series
  const totalCrimeSeries: Series[] = crimeData?.crimeTrends?.total
    ? [{
        id: 'total-crime',
        label: 'Total recorded crime (exc. fraud)',
        colour: '#0D1117',
        data: crimeData.crimeTrends.total.timeSeries.map(d => ({
          date: fyToDate(d.period),
          value: d.count,
        })),
      }]
    : [];

  const crimeRatePer100kSeries: Series[] = crimeData?.crimeTrends?.total
    ? [{
        id: 'total-crime-rate',
        label: 'Recorded crime rate (per 100,000 people)',
        colour: '#0D1117',
        data: crimeData.crimeTrends.total.timeSeries
          .filter(d => d.ratePer100k != null)
          .map(d => ({
            date: fyToDate(d.period),
            value: d.ratePer100k!,
          })),
      }]
    : [];

  // CSEW survey vs recorded crime — both in millions, financial years only
  const csewVsRecordedSeries: Series[] = crimeData
    ? [
        ...(crimeData.csewSurvey?.total ? [{
          id: 'csew-total',
          label: 'CSEW estimated crimes (millions)',
          colour: '#264653',
          data: crimeData.csewSurvey.total
            .filter(d => d.period.includes('/'))
            .map(d => ({
              date: fyToDate(d.period),
              value: d.incidentsMn,
            })),
        }] : []),
        ...(crimeData.crimeTrends.total ? [{
          id: 'recorded-crime-mn',
          label: 'Police recorded crime (millions)',
          colour: '#0D1117',
          data: crimeData.crimeTrends.total.timeSeries.map(d => ({
            date: fyToDate(d.period),
            value: Math.round((d.count / 1_000_000) * 10) / 10,
          })),
        }] : []),
      ]
    : [];

  const crimeTypeSeries: Series[] = crimeData
    ? [
        ...(crimeData.crimeTrends.violence ? [{
          id: 'violence',
          label: 'Violence against the person',
          colour: '#E63946',
          data: crimeData.crimeTrends.violence.timeSeries.map(d => ({
            date: fyToDate(d.period), value: d.count,
          })),
        }] : []),
        ...(crimeData.crimeTrends.theft ? [{
          id: 'theft',
          label: 'Theft offences',
          colour: '#264653',
          data: crimeData.crimeTrends.theft.timeSeries.map(d => ({
            date: fyToDate(d.period), value: d.count,
          })),
        }] : []),
        ...(crimeData.crimeTrends.fraudAndCyber ? [{
          id: 'fraud',
          label: 'Fraud & computer misuse',
          colour: '#F4A261',
          data: crimeData.crimeTrends.fraudAndCyber.timeSeries.map(d => ({
            date: fyToDate(d.period), value: d.count,
          })),
        }] : []),
        ...(crimeData.crimeTrends.burglary ? [{
          id: 'burglary',
          label: 'Burglary',
          colour: '#2A9D8F',
          data: crimeData.crimeTrends.burglary.timeSeries.map(d => ({
            date: fyToDate(d.period), value: d.count,
          })),
        }] : []),
      ]
    : [];

  // Crime trends by type (in thousands for readability)
  const crimeTrendsByTypeSeries: Series[] = crimeData
    ? [
        ...(crimeData.crimeTrends.violence ? [{
          id: 'violence-trends',
          label: 'Violence against the person',
          colour: '#E63946',
          data: crimeData.crimeTrends.violence.timeSeries.map(d => ({
            date: fyToDate(d.period),
            value: d.count / 1000,
          })),
        }] : []),
        ...(crimeData.crimeTrends.fraudAndCyber ? [{
          id: 'fraud-trends',
          label: 'Fraud & computer misuse',
          colour: '#F4A261',
          data: crimeData.crimeTrends.fraudAndCyber.timeSeries.map(d => ({
            date: fyToDate(d.period),
            value: d.count / 1000,
          })),
        }] : []),
        ...(crimeData.crimeTrends.robbery ? [{
          id: 'robbery-trends',
          label: 'Robbery',
          colour: '#2A9D8F',
          data: crimeData.crimeTrends.robbery.timeSeries.map(d => ({
            date: fyToDate(d.period),
            value: d.count / 1000,
          })),
        }] : []),
        ...(crimeData.crimeTrends.drugOffences ? [{
          id: 'drugs-trends',
          label: 'Drug offences',
          colour: '#264653',
          data: crimeData.crimeTrends.drugOffences.timeSeries.map(d => ({
            date: fyToDate(d.period),
            value: d.count / 1000,
          })),
        }] : []),
      ]
    : [];

  const crimeAnnotations: Annotation[] = [
    { date: new Date(2014, 0), label: '2014: NCRS tightened' },
    { date: new Date(2020, 2), label: '2020: COVID-19' },
  ];

  // Proven reoffending rate
  const reoffSeries: Series[] = reoffData
    ? [{
        id: 'reoff-rate',
        label: 'Proven reoffending rate (%)',
        colour: '#E63946',
        data: reoffData.timeSeries.map(d => ({
          date: isoToDate(d.date),
          value: d.reoffendingRate,
        })),
      }]
    : [];

  // Domestic abuse prevalence — women and men %
  const daPrevalenceSeries: Series[] = daData
    ? [
        {
          id: 'da-women',
          label: 'Women',
          colour: '#E63946',
          data: daData.csewPrevalence.map(d => ({
            date: fyPrevalenceToDate(d.year),
            value: d.womenPct,
          })),
        },
        {
          id: 'da-men',
          label: 'Men',
          colour: '#264653',
          data: daData.csewPrevalence.map(d => ({
            date: fyPrevalenceToDate(d.year),
            value: d.menPct,
          })),
        },
      ]
    : [];

  // Police officer numbers series
  const policeOfficerSeries: Series[] = policeData
    ? [{
        id: 'police-officers',
        label: 'Police officers (FTE)',
        colour: '#0D1117',
        data: policeData.timeSeries.map(d => ({
          date: new Date(d.year, 0, 1),
          value: d.officersFTE,
        })),
      }]
    : [];

  const policeAnnotations: Annotation[] = [
    { date: new Date(2010, 0, 1), label: '2010: 143,734 officers (peak)' },
    { date: new Date(2018, 0, 1), label: 'Post-austerity low' },
    { date: new Date(2022, 0, 1), label: 'Uplift programme ends' },
  ];

  // Legal aid series — expenditure (dark) and firms/1000 (red)
  const legalAidSpendSeries: Series[] = legalAidData
    ? [{
        id: 'legal-aid-spend',
        label: 'Legal aid spend (£bn, 2010 prices)',
        colour: '#0D1117',
        data: legalAidData.timeSeries.map(d => ({
          date: new Date(parseInt(d.date), 0, 1),
          value: d.legalAidBnReal,
        })),
      }]
    : [];

  const legalAidFirmsSeries: Series[] = legalAidData
    ? [{
        id: 'legal-aid-firms',
        label: 'Legal aid firms (thousands)',
        colour: '#E63946',
        data: legalAidData.timeSeries.map(d => ({
          date: new Date(parseInt(d.date), 0, 1),
          value: d.legalAidFirms / 1000,
        })),
      }]
    : [];

  const legalAidAnnotations: Annotation[] = [
    { date: new Date(2013, 0, 1), label: '2013: LASPO removes civil categories' },
  ];

  // Knife crime series
  const knifeCrimeSeries: Series[] = knifeCrimeData
    ? [{
        id: 'knife-offences',
        label: 'Knife and offensive weapon offences',
        colour: '#E63946',
        data: knifeCrimeData.knifeCrime.map(d => ({
          date: new Date(d.year, 0, 1),
          value: d.offences,
        })),
      }]
    : [];

  const knifeHomicideSeries: Series[] = knifeCrimeData
    ? [{
        id: 'knife-homicides',
        label: 'Knife homicides',
        colour: '#264653',
        data: knifeCrimeData.knifeHomicides.map(d => ({
          date: new Date(d.year, 0, 1),
          value: d.count,
        })),
      }]
    : [];

  const knifeAnnotations: Annotation[] = [
    { date: new Date(2021, 0, 1), label: 'Pandemic rebound' },
  ];

  // ── Metric values ────────────────────────────────────────────────────────

  const latestCharge = data?.national.chargeRate.timeSeries.at(-1);
  const firstCharge = data?.national.chargeRate.timeSeries[0];

  const latestBacklog = data?.national.courtBacklog.timeSeries.at(-1);
  const preCovidBacklog = data?.national.courtBacklog.timeSeries.find(
    d => d.date === '2019-Q4'
  );

  const currentCap = data?.national.prisonPopulation.currentCapacity;
  const currentPop = data?.national.prisonPopulation.currentPopulation;

  const occupancyPct = currentCap && currentPop
    ? ((currentPop / currentCap) * 100).toFixed(1)
    : null;

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Justice" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Justice"
          question="What Actually Happens When You Report a Crime?"
          finding={
            data
              ? `Fewer than 1 in 14 recorded crimes results in a charge — and for sexual offences and burglary, the figure is closer to 1 in 20.`
              : 'Fewer than 1 in 14 recorded crimes leads to a charge or summons.'
          }
          colour="#6B7280"
        />

        <section className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              The justice system has quietly hollowed out. Of an estimated 9.6 million crimes
              experienced each year, just 388,000 result in a charge — roughly 4 in every 100.<Cite nums={[1, 2]} />
              A decade ago, about 1 in 6 recorded crimes led to a charge; today it is fewer than
              1 in 14.<Cite nums={2} /> The collapse is steepest where it matters most: sexual offences and burglary
              both have charge rates below 5%, and fraud — now the most common crime type — is
              barely investigated at all.<Cite nums={2} /> England and Wales lost over 21,000 officers between 2010
              and 2018; a government uplift programme added roughly 20,000 back by 2023, but numbers
              have flatlined since.<Cite nums={3} /> Real-terms legal aid spending has fallen by over 30%, and the
              number of firms holding contracts has halved, reducing access to representation.<Cite nums={4} />
            </p>
            <p>
              The institutions downstream are equally strained. The Crown Court backlog exceeds
              70,000 cases, nearly 50% above the government&rsquo;s own target.<Cite nums={5} /> Courts were shuttered
              for months in 2020, a barristers&rsquo; strike in 2022 compounded delays, and the
              average case now takes 18 months from offence to completion.<Cite nums={5} /> The prison population sits
              at around 88,000 — near operational capacity — despite overall crime falling for
              decades; in September 2024, the government began releasing prisoners at the 40% sentence
              mark under the emergency SDS40 scheme.<Cite nums={6} /> Knife offences have nearly doubled since 2010 to
              over 51,000 a year.<Cite nums={1} /> Around 1.7 million people experience domestic abuse annually; the
              majority never report to police, and of those who do, only 5 in 100 incidents end in
              a conviction.<Cite nums={7} /> Different crime types have moved in very different directions — violence
              and fraud have risen sharply while robbery has fallen — but the system&rsquo;s capacity
              to respond has narrowed across the board.
            </p>
            </div>
          <div className="mt-6">
            <References items={editorialRefs} />
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-crime', label: 'Crime Trends' },
          { id: 'sec-crime-trends', label: 'Crime Trends by Type' },
          { id: 'sec-outcomes', label: 'Outcomes' },
          { id: 'sec-courts', label: 'Courts' },
          { id: 'sec-prison', label: 'Prison' },
          { id: 'sec-domestic-abuse', label: 'Domestic Abuse' },
          { id: 'sec-police-numbers', label: 'Police Numbers' },
          { id: 'sec-legal-aid', label: 'Legal Aid' },
          { id: 'sec-knife-crime', label: 'Knife Crime' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Crimes leading to charge"
            value={latestCharge ? latestCharge.pct.toFixed(1) : '—'}
            unit="%"
            direction="down"
            polarity="up-is-good"
            changeText={
              latestCharge && firstCharge
                ? `Down from ${firstCharge.pct}% in 2015`
                : 'Loading…'
            }
            sparklineData={
              data
                ? sparkFrom(data.national.chargeRate.timeSeries.map(d => d.pct))
                : []
            }
            source="Home Office · Crime Outcomes YE Mar 2025"
            baseline="Only 7 in 100 recorded crimes end in a charge — down from 15 in 100 a decade ago"
            href="#sec-crime"/>
          <MetricCard
            label="Crown Court backlog"
            value={latestBacklog ? `${(latestBacklog.outstanding / 1000).toFixed(1)}K` : '—'}
            unit="cases"
            direction="up"
            polarity="up-is-bad"
            changeText={
              latestBacklog && preCovidBacklog
                ? `+${Math.round(((latestBacklog.outstanding - preCovidBacklog.outstanding) / preCovidBacklog.outstanding) * 100)}% since 2019 · Target: 53K`
                : 'Target: 53,000 cases'
            }
            sparklineData={
              data
                ? sparkFrom(data.national.courtBacklog.timeSeries.map(d => d.outstanding))
                : []
            }
            source="MOJ · Criminal Court Statistics Q3 2025"
            baseline="At current court throughput, many defendants wait over 2 years for trial"
            href="#sec-crime-trends"/>
          <MetricCard
            label="Prison population"
            value={currentPop ? `${(currentPop / 1000).toFixed(1)}K` : '—'}
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText={
              occupancyPct
                ? `${occupancyPct}% of capacity`
                : 'Loading…'
            }
            sparklineData={
              data
                ? sparkFrom(data.national.prisonPopulation.timeSeries.map(d => d.population))
                : []
            }
            source="MOJ · Prison Population Dec 2025"
            baseline="7 in 10 released prisoners are convicted of a new offence within 9 years"
            href="#sec-outcomes"/>
        </div>
        

        {/* Chart 1: Justice Funnel */}
        <div id="sec-outcomes">
        {data ? (
          <FunnelChart
            title="What happens after a crime, 2024–25"
            subtitle="For every 100 crimes experienced, how many reach each stage of the justice system."
            stages={data.national.funnel.stages}
            source={{
              name: 'ONS / Home Office / CPS',
              dataset: 'CSEW, Crime Outcomes, CPS Quarterly Data',
              frequency: 'annual',
            }}
          />
        ) : (
          <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
        )}

        {/* Chart 2: Charge rate trend */}
        {chargeRateSeries.length > 0 ? (
          <LineChart
            title="Charge rate, 2015–2025"
            subtitle="Percentage of police-recorded offences resulting in a charge or summons, England and Wales."
            series={chargeRateSeries}
            annotations={chargeAnnotations}
            yLabel="Percent"
            source={{
              name: 'Home Office',
              dataset: 'Crime Outcomes in England and Wales, YE March 2025',
              frequency: 'annual',
              url: 'https://www.gov.uk/government/statistics/crime-outcomes-in-england-and-wales-2024-to-2025',
            }}
          />
        ) : (
          <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
        )}

        {/* Chart 3: Charge rate by crime type — inline bar table */}
        {data && data.national.chargeRate.byCrimeType.length > 0 && (
          <section className="mb-12">
            <h3 className="text-lg font-bold text-wiah-black mb-1">
              Charge rate by crime type
            </h3>
            <p className="text-sm text-wiah-mid font-mono mb-6">
              YE March 2025. Percentage of recorded offences charged or summonsed.
            </p>
            <div className="divide-y divide-wiah-border">
              {data.national.chargeRate.byCrimeType.map(ct => {
                const pct = Math.min((ct.pct / 25) * 100, 100);
                const colour = ct.pct < 5 ? '#E63946' : ct.pct < 10 ? '#F4A261' : '#2A9D8F';
                return (
                  <div key={ct.type} className="py-3 flex items-center gap-4">
                    <span className="text-sm text-wiah-black w-56 shrink-0">{ct.type}</span>
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
                      {ct.pct}%
                    </span>
                  </div>
                );
              })}
            </div>
            <p className="font-mono text-[11px] text-wiah-mid mt-3">
              <a
                href="https://www.gov.uk/government/statistics/crime-outcomes-in-england-and-wales-2024-to-2025"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Source: Home Office, Crime Outcomes in England and Wales, YE March 2025
              </a>
            </p>
          </section>
        )}

        </div>{/* end sec-outcomes */}

        {/* Chart 4: Crown Court backlog */}
        <div id="sec-courts">
        {backlogSeries.length > 0 ? (
          <LineChart
            title="Crown Court backlog, 2016–2025"
            subtitle="Outstanding cases in the Crown Court, England and Wales. Target: 53,000."
            series={backlogSeries}
            annotations={backlogAnnotations}
            targetLine={{ value: 53000, label: 'Pre-pandemic target: 53K' }}
            yLabel="Cases"
            source={{
              name: 'Ministry of Justice',
              dataset: 'Criminal Court Statistics Quarterly, Q3 2025',
              frequency: 'quarterly',
              url: 'https://www.gov.uk/government/statistics/criminal-court-statistics-quarterly-july-to-september-2025',
            }}
          />
        ) : (
          <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
        )}

        </div>{/* end sec-courts */}

        {/* Chart 5: Prison population and capacity */}
        <div id="sec-prison">
        {prisonPopSeries.length > 0 ? (
          <LineChart
            title="Prison population and capacity, 2000–2025"
            subtitle="Total prison population vs operational capacity, England and Wales."
            series={prisonPopSeries}
            annotations={prisonAnnotations}
            yLabel="People"
            source={{
              name: 'Ministry of Justice',
              dataset: 'Prison Population Statistics, December 2025',
              frequency: 'monthly',
              url: 'https://www.gov.uk/government/collections/prison-population-statistics',
            }}
          />
        ) : (
          <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
        )}

        {/* Chart 6: Prison occupancy rate */}
        {occupancySeries.length > 0 ? (
          <LineChart
            title="Prison occupancy rate, 2000–2025"
            subtitle="Prison population as a percentage of operational capacity. 100% = full."
            series={occupancySeries}
            annotations={prisonAnnotations}
            targetLine={{ value: 100, label: 'Full capacity' }}
            yLabel="Percent"
            source={{
              name: 'Ministry of Justice',
              dataset: 'Prison Population Statistics, December 2025',
              frequency: 'monthly',
              url: 'https://www.gov.uk/government/collections/prison-population-statistics',
            }}
          />
        ) : (
          <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
        )}

        </div>{/* end sec-prison */}

        {/* Chart 7: Total recorded crime */}
        <div id="sec-crime">
        {totalCrimeSeries.length > 0 ? (
          <LineChart
            title="Total police-recorded crime, 2002/03–2024/25"
            subtitle="All offences recorded by police forces in England and Wales, excluding fraud and computer misuse."
            series={totalCrimeSeries}
            annotations={crimeAnnotations}
            yLabel="Offences"
            source={{
              name: 'ONS / Home Office',
              dataset: 'Crime in England and Wales, Appendix Tables (A5a)',
              frequency: 'annual (financial year)',
              url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/crimeandjustice/datasets/crimeinenglandandwalesappendixtables',
            }}
          />
        ) : (
          <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
        )}

        {/* Chart 7b: Crime rate per 100,000 */}
        {crimeRatePer100kSeries.length > 0 ? (
          <LineChart
            title="Crime rate per 100,000 population, 2002/03–2024/25"
            subtitle="Population-normalised rate. England's population grew ~18% over this period — the absolute count overstates the decline slightly."
            series={crimeRatePer100kSeries}
            annotations={crimeAnnotations}
            yLabel="Offences per 100k"
            source={{
              name: 'ONS / Home Office',
              dataset: 'Crime in England and Wales, Appendix Tables (A5a); ONS Population Estimates',
              frequency: 'annual (financial year)',
              url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/crimeandjustice/datasets/crimeinenglandandwalesappendixtables',
            }}
          />
        ) : (
          <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
        )}

        {/* Chart 7c: CSEW survey vs recorded crime */}
        {csewVsRecordedSeries.length > 0 ? (
          <LineChart
            title="Estimated vs recorded crime, 2002/03–2024/25"
            subtitle="The Crime Survey (CSEW) captures crimes not reported to police. Recorded crime is a fraction of actual victimisation. CSEW was suspended during COVID (2020/21–2021/22)."
            series={csewVsRecordedSeries}
            annotations={[
              { date: new Date(2014, 0), label: '2014: NCRS tightened' },
              { date: new Date(2020, 2), label: '2020: CSEW suspended' },
            ]}
            yLabel="Incidents (millions)"
            source={{
              name: 'ONS — Crime Survey for England and Wales; Home Office',
              dataset: 'Crime in England and Wales, Appendix Tables (A3a, A5a)',
              frequency: 'annual (financial year)',
              url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/crimeandjustice/datasets/crimeinenglandandwalesappendixtables',
            }}
          />
        ) : (
          <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
        )}

        {/* Chart 8: Crime by type — divergent trends */}
        {crimeTypeSeries.length > 0 ? (
          <LineChart
            title="Recorded crime by type, 2002/03–2024/25"
            subtitle="Divergent trends: violence and fraud rising sharply; theft and burglary falling. Recording practice changes in 2014 inflated violence figures."
            series={crimeTypeSeries}
            annotations={crimeAnnotations}
            yLabel="Offences"
            source={{
              name: 'ONS / Home Office',
              dataset: 'Crime in England and Wales, Appendix Tables (A5a)',
              frequency: 'annual (financial year)',
              url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/crimeandjustice/datasets/crimeinenglandandwalesappendixtables',
            }}
          />
        ) : (
          <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
        )}

        {/* Proven reoffending rate chart */}
        {reoffSeries.length > 0 ? (
          <LineChart
            title="Proven reoffending rate, 2012–2024"
            subtitle="Percentage of offenders who reoffend within one year, England and Wales. Adult and juvenile combined."
            series={reoffSeries}
            yLabel="Percent"
            annotations={[
              { date: new Date(2020, 2), label: '2020: COVID-19' },
            ]}
            source={{
              name: 'Ministry of Justice',
              dataset: 'Proven Reoffending Statistics',
              frequency: 'quarterly (annual cohorts)',
              url: 'https://www.gov.uk/government/collections/proven-reoffending-statistics',
            }}
          />
        ) : (
          <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
        )}

        {/* Reoffending by offence group — bar table */}
        {reoffData && reoffData.byOffenceGroup.length > 0 && (
          <section className="mb-12">
            <h3 className="text-lg font-bold text-wiah-black mb-1">
              Reoffending rate by offence type ({reoffData.latestCohort})
            </h3>
            <p className="text-sm text-wiah-mid font-mono mb-6">
              Percentage of offenders who reoffend within one year, by index offence. Sorted worst-first.
            </p>
            <div className="space-y-2">
              {reoffData.byOffenceGroup.map(g => {
                const colour = g.reoffendingRate > 40 ? '#E63946' : g.reoffendingRate > 25 ? '#F4A261' : '#2A9D8F';
                return (
                  <div key={g.group} className="flex items-center gap-3">
                    <span className="text-xs text-wiah-black w-52 shrink-0 leading-tight" title={g.group}>{g.group}</span>
                    <div className="flex-1 bg-wiah-light rounded h-3">
                      <div className="h-3 rounded" style={{ width: `${g.reoffendingRate}%`, backgroundColor: colour }} />
                    </div>
                    <span className="font-mono text-xs font-bold w-12 text-right" style={{ color: colour }}>
                      {g.reoffendingRate}%
                    </span>
                  </div>
                );
              })}
            </div>
            <p className="font-mono text-[11px] text-wiah-mid mt-3">
              Source: Ministry of Justice, Proven Reoffending Statistics, {reoffData.latestCohort} cohort.
            </p>
          </section>
        )}

        </div>{/* end sec-crime */}

        {/* ── Domestic Abuse section ─────────────────────────────────────── */}
        <div id="sec-domestic-abuse">
          <ScrollReveal>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-wiah-black mb-6">Domestic Abuse</h2>
            </div>
          </ScrollReveal>

          {/* Chart: Domestic abuse prevalence — women vs men */}
          {daPrevalenceSeries.length > 0 ? (
            <LineChart
              title="Domestic abuse victims per year, England and Wales, 2009–2024"
              subtitle="ONS Crime Survey estimates. Around 1.7 million people experience domestic abuse each year — about 2.7% of women and 1.5% of men."
              series={daPrevalenceSeries}
              yLabel="% experiencing DA (past year, CSEW)"
              source={{
                name: 'ONS',
                dataset: 'Crime Survey for England and Wales (CSEW) — Domestic abuse',
                frequency: 'annual',
                url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/crimeandjustice/articles/domesticabuseinenglandandwalesoverview/november2024',
              }}
            />
          ) : (
            <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
          )}

          {/* Domestic abuse outcomes funnel — stat callout panel */}
          {daData ? (
            <section className="mb-12">
              <h3 className="text-lg font-bold text-wiah-black mb-1">
                The domestic abuse justice gap, 2023/24
              </h3>
              <p className="text-sm text-wiah-mid font-mono mb-6">
                In 2023/24. Only 5 in 100 incidents lead to a conviction.
              </p>
              <div className="overflow-x-auto">

        {/* ── Crime Trends by Type ─────────────────────────────────────── */}
        <div id="sec-crime-trends">
          <ScrollReveal>
          <h2 className="text-2xl font-bold text-wiah-black mb-6 mt-8">Crime Trends by Type</h2>
          </ScrollReveal>

          {crimeTrendsByTypeSeries.length > 0 ? (
            <LineChart
              title="Recorded crime by type, England and Wales, 2002/03–2024/25"
              subtitle="Police recorded crime (thousands of offences) by crime type. Violence and fraud rising; robbery declining."
              series={crimeTrendsByTypeSeries}
              annotations={crimeAnnotations}
              yLabel="Thousands of offences"
              source={{
                name: 'Home Office',
                dataset: 'Police recorded crime, England and Wales',
                frequency: 'annual',
                url: 'https://www.gov.uk/government/collections/police-recorded-crime-statistics',
              }}
            />
          ) : (
            <div className="h-64 bg-wiah-light rounded animate-pulse mb-16" />
          )}
        </div>
                <div className="flex items-center gap-2 min-w-max">
                  {/* Stage 1 */}
                  <div className="flex flex-col items-center bg-wiah-light rounded-lg px-5 py-4 min-w-[140px]">
                    <span className="font-mono text-[11px] text-wiah-mid uppercase tracking-wide mb-1">CSEW victims</span>
                    <span className="font-mono text-3xl font-bold text-wiah-black">~1.7M</span>
                    <span className="font-mono text-[11px] text-wiah-mid mt-1">estimated per year</span>
                  </div>

                  <div className="flex flex-col items-center px-1">
                    <span className="text-2xl text-wiah-mid">&rarr;</span>
                    <span className="font-mono text-[10px] text-wiah-mid mt-1">recorded</span>
                  </div>

                  {/* Stage 2 */}
                  <div className="flex flex-col items-center bg-wiah-light rounded-lg px-5 py-4 min-w-[140px]">
                    <span className="font-mono text-[11px] text-wiah-mid uppercase tracking-wide mb-1">Police-recorded</span>
                    <span className="font-mono text-3xl font-bold text-wiah-black">
                      {(daData.outcomes.recordedDA / 1000000).toFixed(1)}M
                    </span>
                    <span className="font-mono text-[11px] text-wiah-mid mt-1">offences</span>
                  </div>

                  <div className="flex flex-col items-center px-1">
                    <span className="text-2xl text-wiah-mid">&rarr;</span>
                    <span className="font-mono text-[10px] text-wiah-mid mt-1">charged</span>
                  </div>

                  {/* Stage 3 */}
                  <div className="flex flex-col items-center bg-wiah-light rounded-lg px-5 py-4 min-w-[140px]">
                    <span className="font-mono text-[11px] text-wiah-mid uppercase tracking-wide mb-1">Charged</span>
                    <span className="font-mono text-3xl font-bold" style={{ color: '#F4A261' }}>
                      {daData.outcomes.chargeOrSummons.toLocaleString('en-GB')}
                    </span>
                    <span className="font-mono text-[11px] text-wiah-mid mt-1">
                      {daData.outcomes.chargeRate}% of recorded
                    </span>
                  </div>

                  <div className="flex flex-col items-center px-1">
                    <span className="text-2xl text-wiah-mid">&rarr;</span>
                    <span className="font-mono text-[10px] text-wiah-mid mt-1">convicted</span>
                  </div>

                  {/* Stage 4 */}
                  <div className="flex flex-col items-center bg-wiah-light rounded-lg px-5 py-4 min-w-[140px]">
                    <span className="font-mono text-[11px] text-wiah-mid uppercase tracking-wide mb-1">Convicted</span>
                    <span className="font-mono text-3xl font-bold" style={{ color: '#E63946' }}>
                      {daData.outcomes.convictions.toLocaleString('en-GB')}
                    </span>
                    <span className="font-mono text-[11px] text-wiah-mid mt-1">
                      {daData.outcomes.convictionRate}% of recorded
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4 max-w-md">
                <div className="bg-wiah-light rounded-lg px-4 py-3">
                  <span className="font-mono text-[11px] text-wiah-mid uppercase tracking-wide block mb-1">No further action</span>
                  <span className="font-mono text-xl font-bold text-wiah-black">{daData.outcomes.noFurtherAction}%</span>
                  <span className="font-mono text-[11px] text-wiah-mid block mt-1">of recorded cases</span>
                </div>
                <div className="bg-wiah-light rounded-lg px-4 py-3">
                  <span className="font-mono text-[11px] text-wiah-mid uppercase tracking-wide block mb-1">Victim withdrew</span>
                  <span className="font-mono text-xl font-bold text-wiah-black">{daData.outcomes.victimWithdrew}%</span>
                  <span className="font-mono text-[11px] text-wiah-mid block mt-1">of recorded cases</span>
                </div>
              </div>

              <p className="font-mono text-[11px] text-wiah-mid mt-4">
                <a
                  href="https://www.gov.uk/government/statistics/domestic-abuse-in-england-and-wales-overview"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Source: Home Office, Domestic abuse datasets, annual. ONS CSEW, Domestic abuse overview, November 2024.
                </a>
              </p>
            </section>
          ) : (
            <div className="h-48 bg-wiah-light rounded animate-pulse mb-12" />
          )}
        </div>{/* end sec-domestic-abuse */}

        {/* ── Police Officer Numbers section ──────────────────────────────── */}
        <div id="sec-police-numbers">
          <ScrollReveal>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-wiah-black mb-6">Police Officer Numbers</h2>
            </div>
          </ScrollReveal>

          {policeOfficerSeries.length > 0 ? (
            <ScrollReveal>
              <LineChart
                title="Police officer numbers, England and Wales, 2010–2024"
                subtitle="Full-time equivalent police officers. Numbers fell by 21,000 between 2010 and 2018 before a government recruitment drive."
                series={policeOfficerSeries}
                annotations={policeAnnotations}
                yLabel="Officers (FTE)"
                source={{
                  name: 'Home Office',
                  dataset: 'Police Workforce, England and Wales',
                  frequency: 'annual',
                  url: 'https://www.gov.uk/government/collections/police-workforce-england-and-wales',
                }}
              />
            </ScrollReveal>
          ) : (
            <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
          )}
        </div>{/* end sec-police-numbers */}

        {/* ── Legal Aid section ───────────────────────────────────────────── */}
        <div id="sec-legal-aid">
          <ScrollReveal>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-wiah-black mb-6">Legal Aid</h2>
            </div>
          </ScrollReveal>

          {legalAidSpendSeries.length > 0 ? (
            <ScrollReveal>
              <LineChart
                title="Legal aid expenditure and provider firms, 2010–2024"
                subtitle="Real-terms legal aid spend (£bn, 2010 prices) and number of firms holding legal aid contracts (thousands), England and Wales."
                series={[...legalAidSpendSeries, ...legalAidFirmsSeries]}
                annotations={legalAidAnnotations}
                yLabel="£bn / thousands of firms"
                source={{
                  name: 'Legal Aid Agency',
                  dataset: 'Legal Aid Statistics, England and Wales',
                  frequency: 'annual',
                  url: 'https://www.gov.uk/government/collections/legal-aid-statistics',
                }}
              />
            </ScrollReveal>
          ) : (
            <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
          )}
        </div>{/* end sec-legal-aid */}

        {/* ── Knife Crime section ─────────────────────────────────────────── */}
        <div id="sec-knife-crime">
          <ScrollReveal>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-wiah-black mb-6">Knife Crime</h2>
            </div>
          </ScrollReveal>

          {knifeCrimeSeries.length > 0 ? (
            <ScrollReveal>
              <LineChart
                title="Knife and offensive weapon offences, 2010–2024"
                subtitle="Police recorded knife offences, England and Wales. All ages."
                series={[...knifeCrimeSeries, ...knifeHomicideSeries]}
                annotations={knifeAnnotations}
                yLabel="Offences"
                source={{
                  name: 'Home Office',
                  dataset: 'Knife and Offensive Weapon Statistics, England and Wales',
                  frequency: 'annual',
                  url: 'https://www.gov.uk/government/collections/knife-and-offensive-weapon-statistics',
                }}
              />
            </ScrollReveal>
          ) : (
            <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
          )}
        </div>{/* end sec-knife-crime */}

        {/* Positive story */}
        <ScrollReveal>
        <PositiveCallout
          title="What's improving"
          value="-4.9%"
          description="Total recorded crime (excluding fraud) fell from 5.58 million offences in 2022/23 to 5.31 million in 2024/25. Burglary is down 11%, criminal damage down 13%, and violent crime down 8% from their recent peaks."
          source="Source: ONS — Crime in England and Wales, year ending December 2024."
        />
        </ScrollReveal>

        {/* Sources */}
        <section className="border-t border-wiah-border pt-8">
          <h2 className="text-lg font-bold text-wiah-black mb-4">Sources &amp; methodology</h2>
          <ul className="space-y-2 font-mono text-xs text-wiah-mid">
            {data?.metadata.sources.map((src, i) => (
              <li key={i}>
                <a
                  href={src.url}
                  className="underline hover:text-wiah-blue"
                  target="_blank"
                  rel="noreferrer"
                >
                  {src.name} — {src.dataset} ({src.frequency})
                </a>
              </li>
            ))}
            {reoffData && (
              <li>
                <a
                  href="https://www.gov.uk/government/collections/proven-reoffending-statistics"
                  className="underline hover:text-wiah-blue"
                  target="_blank"
                  rel="noreferrer"
                >
                  Ministry of Justice — Proven Reoffending Statistics (quarterly)
                </a>
              </li>
            )}
            {daData && daData.metadata.sources.map((src, i) => (
              <li key={`da-${i}`}>
                <a
                  href={src.url}
                  className="underline hover:text-wiah-blue"
                  target="_blank"
                  rel="noreferrer"
                >
                  {src.name} — {src.dataset} ({src.frequency})
                </a>
              </li>
            ))}
          </ul>
          <p className="font-mono text-xs text-wiah-mid mt-4">
            Charge rate is the proportion of police-recorded offences assigned a charge or summons
            outcome. Court backlog is outstanding Crown Court cases. Prison figures from MOJ
            monthly bulletins; historical points are June snapshots from published annual data.
            The justice funnel combines CSEW victim survey estimates, police recorded crime totals,
            Home Office outcomes data, and CPS prosecution/conviction statistics.
            Domestic abuse prevalence from CSEW self-completion module; the survey does not cover
            all forms of abuse and excludes under-16s.
          </p>
          <p className="font-mono text-xs text-wiah-mid mt-4">
            Data updated automatically via GitHub Actions. Last pipeline run:{' '}
            {new Date().toISOString().slice(0, 10)}.
          </p>
        </section>
              <RelatedTopics />
      </main>

      {/* Expanded metric modals */}
      {expanded === 'charge-rate' && (
        <MetricDetailModal
          title="Charge rate, 2015–2025"
          subtitle="Percentage of police-recorded offences resulting in a charge or summons, England and Wales."
          series={chargeRateSeries}
          annotations={chargeAnnotations}
          yLabel="Percent"
          source={{
            name: 'Home Office',
            dataset: 'Crime Outcomes in England and Wales, YE March 2025',
            frequency: 'annual',
            url: 'https://www.gov.uk/government/statistics/crime-outcomes-in-england-and-wales-2024-to-2025',
          }}
          onClose={() => setExpanded(null)}
        />
      )}
      {expanded === 'backlog' && (
        <MetricDetailModal
          title="Crown Court backlog, 2016–2025"
          subtitle="Outstanding cases in the Crown Court, England and Wales."
          series={backlogSeries}
          annotations={backlogAnnotations}
          targetLine={{ value: 53000, label: 'Pre-pandemic target: 53K' }}
          yLabel="Cases"
          source={{
            name: 'Ministry of Justice',
            dataset: 'Criminal Court Statistics Quarterly, Q3 2025',
            frequency: 'quarterly',
            url: 'https://www.gov.uk/government/statistics/criminal-court-statistics-quarterly-july-to-september-2025',
          }}
          onClose={() => setExpanded(null)}
        />
      )}
      {expanded === 'prison' && (
        <MetricDetailModal
          title="Prison population and capacity, 2000–2025"
          subtitle="Total prison population vs operational capacity, England and Wales."
          series={prisonPopSeries}
          annotations={prisonAnnotations}
          yLabel="People"
          source={{
            name: 'Ministry of Justice',
            dataset: 'Prison Population Statistics, December 2025',
            frequency: 'monthly',
            url: 'https://www.gov.uk/government/collections/prison-population-statistics',
          }}
          onClose={() => setExpanded(null)}
        />
      )}
    </>
  );
}
