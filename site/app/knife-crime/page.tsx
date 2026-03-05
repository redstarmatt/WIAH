'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';

// ── Types ────────────────────────────────────────────────────────────────────

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

interface HospitalAdmissionPoint {
  year: number;
  admissions: number;
}

interface RegionData {
  region: string;
  ratePerMillion: number;
}

interface KnifeCrimeData {
  knifeCrime: KnifeCrimePoint[];
  knifeHomicides: KnifeHomicidePoint[];
  youthKnifeCrime: YouthKnifeCrimePoint[];
  hospitalAdmissions: HospitalAdmissionPoint[];
  byRegion: RegionData[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

function sparkFrom(arr: number[], n = 10) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function KnifeCrimePage() {
  const [data, setData] = useState<KnifeCrimeData | null>(null);

  useEffect(() => {
    fetch('/data/knife-crime/knife_crime.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const knifeCrimeSeries: Series[] = data
    ? [{
        id: 'knife-crime',
        label: 'Total offences',
        colour: '#6B7280',
        data: data.knifeCrime.map(d => ({
          date: yearToDate(d.year),
          value: d.offences,
        })),
      }]
    : [];

  const youthSeries: Series[] = data
    ? [{
        id: 'youth',
        label: 'Under-18 offences',
        colour: '#2A9D8F',
        data: data.youthKnifeCrime.map(d => ({
          date: yearToDate(d.year),
          value: d.offences,
        })),
      }]
    : [];

  const hospitalSeries: Series[] = data
    ? [{
        id: 'hospital',
        label: 'Hospital admissions (knife assault)',
        colour: '#2A9D8F',
        data: data.hospitalAdmissions.map(d => ({
          date: yearToDate(d.year),
          value: d.admissions,
        })),
      }]
    : [];

  const latestOffences = data?.knifeCrime[data.knifeCrime.length - 1];
  const peakOffences = data?.knifeCrime.reduce((a, b) => a.offences > b.offences ? a : b);
  const latestAdmissions = data?.hospitalAdmissions[data.hospitalAdmissions.length - 1];
  const prevAdmissions = data?.hospitalAdmissions[data.hospitalAdmissions.length - 2];
  const latestYouth = data?.youthKnifeCrime[data.youthKnifeCrime.length - 1];
  const peakYouth = data?.youthKnifeCrime[0];

  const admissionsChange = latestAdmissions && prevAdmissions
    ? Math.round(((latestAdmissions.admissions - prevAdmissions.admissions) / prevAdmissions.admissions) * 100)
    : -10;

  return (
    <>
      <TopicNav topic="Justice" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Justice"
          question="Is knife crime actually falling?"
          finding="After peaking in 2023/24, knife crime is now falling. Youth knife offending has declined for six consecutive years. Hospital admissions for knife assaults — the most reliable indicator — fell 10% in 2024/25 to their lowest level since 2018."
          colour="#2A9D8F"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Total police-recorded knife offences peaked at around 54,000 in the year to March 2024 and have since fallen 5% to 51,527 in the year to June 2025 &mdash; now 7% below pre-pandemic levels. The most reliable independent indicator &mdash; NHS hospital admissions for knife assault injuries &mdash; fell 10% in 2024/25 to 3,494, the lowest since 2018 and down 28% from the 2018/19 peak; these figures are not subject to recording variations and represent actual people treated for stab wounds. Youth knife offending has fallen for six consecutive years. Violence Reduction Units, now operating in 18 areas of England, have brought a public health approach to knife crime; early evaluations show areas with VRUs saw larger reductions in assault hospital admissions than comparable areas without them.</p>
            <p>The long-run picture is still sobering. Total knife crime remains far above its 2014 level of 28,600 offences &mdash; the 2014&ndash;2019 rise is linked to county lines drug network expansion, the removal of around 70% of youth service funding between 2010 and 2020, and a wave of school exclusions that left vulnerable young people without structure. Most young people involved in knife crime have themselves experienced violence &mdash; from peers, caregivers, or communities &mdash; making knife-carrying a rational response to perceived threat where protection cannot be expected from adults or institutions. Hospital-based intervention programmes and credible messenger mentoring show consistent evidence of effectiveness; the falling data reflects, in part, their quiet success.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-offences', label: 'Total offences' },
          { id: 'sec-youth', label: 'Youth offending' },
          { id: 'sec-hospital', label: 'Hospital data' },
          { id: 'sec-regional', label: 'Regional' },
        ]} />

        {/* Metric cards */}
        <ScrollReveal>
          <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Hospital admissions (knife assault)"
              value={latestAdmissions ? latestAdmissions.admissions.toLocaleString() : '3,494'}
              unit="2024/25"
              direction="down"
              polarity="up-is-bad"
              changeText={`${admissionsChange}% change · lowest since 2018 · down from 4,830 at peak`}
              sparklineData={
                data ? sparkFrom(data.hospitalAdmissions.map(d => d.admissions)) : []
              }
              source="NHS England · Hospital Episode Statistics, 2024/25"
              href="#sec-overview"/>
            <MetricCard
              label="Youth knife offences (under-18)"
              value={latestYouth ? latestYouth.offences.toLocaleString() : '8,319'}
              unit="2023/24"
              direction="down"
              polarity="up-is-bad"
              changeText={
                latestYouth && peakYouth
                  ? `6th consecutive annual fall · down ${Math.round(((peakYouth.offences - latestYouth.offences) / peakYouth.offences) * 100)}% from ${peakYouth.year} peak`
                  : '6th consecutive annual fall'
              }
              sparklineData={
                data ? data.youthKnifeCrime.map(d => d.offences) : []
              }
              source="Home Office · Police Recorded Crime, 2023/24"
              href="#sec-offences"/>
            <MetricCard
              label="Total knife offences"
              value={latestOffences ? latestOffences.offences.toLocaleString() : '51,527'}
              unit="year to Jun 2025"
              direction="down"
              polarity="up-is-bad"
              changeText={
                latestOffences && peakOffences
                  ? `Down 5% · down from ${peakOffences.offences.toLocaleString()} peak in ${peakOffences.year}`
                  : 'down 5% from 2023/24 peak'
              }
              sparklineData={
                data ? sparkFrom(data.knifeCrime.map(d => d.offences)) : []
              }
              source="Home Office · Police Recorded Crime, year to Jun 2025"
              href="#sec-youth"/>
          </div>
        </ScrollReveal>

        {/* Chart 1: Total knife crime */}
        <ScrollReveal>
          <div id="sec-offences" className="mb-12">
            <LineChart
              series={knifeCrimeSeries}
              title="Police-recorded knife crime offences, England &amp; Wales, 2010–2024"
              subtitle="Annual offences involving a knife or sharp instrument. Peaked 2023/24, now falling."
              yLabel="Offences"
              source={{
                name: 'Home Office',
                dataset: 'Police Recorded Crime',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 2: Youth knife crime */}
        <ScrollReveal>
          <div id="sec-youth" className="mb-12">
            <LineChart
              series={youthSeries}
              title="Youth knife offending (under-18s), 2018–2024"
              subtitle="Six consecutive years of decline in knife offences by people under 18."
              yLabel="Offences"
              source={{
                name: 'Home Office',
                dataset: 'Police Recorded Crime — Youth Offending',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 3: Hospital admissions */}
        <ScrollReveal>
          <div id="sec-hospital" className="mb-12">
            <LineChart
              series={hospitalSeries}
              title="NHS hospital admissions for knife assault injuries, 2018–2024/25"
              subtitle="Independent of police recording practices. Down 28% from 2018/19 peak."
              yLabel="Admissions"
              source={{
                name: 'NHS England',
                dataset: 'Hospital Episode Statistics',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 4: Regional variation */}
        <ScrollReveal>
          <div id="sec-regional" className="mb-12">
            <div className="bg-white rounded-lg border border-wiah-border p-8">
              <h2 className="text-lg font-bold text-wiah-black mb-2">
                Knife crime rate by police force area (offences per million people)
              </h2>
              <div className="mt-6 space-y-4">
                {data?.byRegion.map((r) => {
                  const pct = (r.ratePerMillion / 160) * 100;
                  return (
                    <div key={r.region}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-wiah-black">{r.region}</span>
                        <span className="font-mono text-sm font-bold text-wiah-black">{r.ratePerMillion}</span>
                      </div>
                      <div className="h-6 bg-wiah-light rounded-sm overflow-hidden">
                        <div
                          className="h-full rounded-sm transition-all"
                          style={{ width: `${pct}%`, backgroundColor: '#6B7280' }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="font-mono text-xs text-wiah-mid mt-4">Source: Home Office — Police Recorded Crime by Force Area, 2023/24</p>
            </div>
          </div>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Violence Reduction Units showing sustained results"
            value="18 areas"
            description="Violence Reduction Units (VRUs), modelled on the Glasgow public health approach, operate in 18 areas of England and Wales. Independent evaluation by Nottingham Trent University found that areas with VRUs saw greater reductions in hospital admissions for assault than comparable areas without them. The approach — treating violence as a preventable public health problem, not just a criminal justice one — is now embedded in national policy. NHS hospital admissions for knife injuries are at their lowest since 2018, providing independent confirmation that recorded crime falls are real."
            source="Source: Home Office — Violence Reduction Unit evaluations, 2024. NHS England — Hospital Episode Statistics 2024/25."
          />
        </ScrollReveal>
      </main>
    </>
  );
}
