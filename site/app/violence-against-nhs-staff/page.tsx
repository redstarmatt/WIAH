'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

// ── References ──────────────────────────────────────────────────────────────

const editorialRefs: Reference[] = [
  { num: 1, name: 'NHS Protect / NHSBSA', dataset: 'Reported Physical Assaults on NHS Staff', date: '2024', note: 'Annual; covers all NHS trusts in England' },
  { num: 2, name: 'NHS England', dataset: 'NHS Staff Survey', url: 'https://www.nhsstaffsurveys.com/', date: '2024', note: 'Under-reporting estimated at 40-60%' },
  { num: 3, name: 'NHS Protect / NHSBSA', dataset: 'Reported Physical Assaults by Trust Type', date: '2024' },
  { num: 4, name: 'NHS England', dataset: 'Violence Prevention and Reduction Programme evaluation', url: 'https://www.england.nhs.uk/statistics/', date: '2025' },
];

// ── Types ────────────────────────────────────────────────────────────────────

interface AssaultPoint {
  year: number;
  incidents: number;
}

interface StaffUnsafePoint {
  year: number;
  pct: number;
}

interface VerbalAbusePoint {
  year: number;
  incidents: number;
}

interface TrustTypeData {
  type: string;
  ratePerThousandStaff: number;
}

interface ProsecutionPoint {
  year: number;
  referrals: number;
  prosecutions: number;
}

interface ViolenceData {
  physicalAssaults: AssaultPoint[];
  staffFeelingUnsafe: StaffUnsafePoint[];
  verbalAbuse: VerbalAbusePoint[];
  byTrustType: TrustTypeData[];
  prosecutions: ProsecutionPoint[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

function sparkFrom(arr: number[], n = 10) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function ViolenceAgainstNhsStaffPage() {
  const [data, setData] = useState<ViolenceData | null>(null);

  useEffect(() => {
    fetch('/data/violence-against-nhs-staff/violence_against_nhs_staff.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const assaultSeries: Series[] = data
    ? [{
        id: 'physical-assaults',
        label: 'Physical assaults reported',
        colour: '#E63946',
        data: data.physicalAssaults.map(d => ({
          date: yearToDate(d.year),
          value: d.incidents,
        })),
      }]
    : [];

  const verbalAbuseSeries: Series[] = data
    ? [{
        id: 'verbal-abuse',
        label: 'Verbal abuse incidents',
        colour: '#F4A261',
        data: data.verbalAbuse.map(d => ({
          date: yearToDate(d.year),
          value: d.incidents,
        })),
      }]
    : [];

  const prosecutionSeries: Series[] = data
    ? [
        {
          id: 'referrals',
          label: 'Referrals to police',
          colour: '#6B7280',
          data: data.prosecutions.map(d => ({
            date: yearToDate(d.year),
            value: d.referrals,
          })),
        },
        {
          id: 'prosecutions',
          label: 'Prosecutions secured',
          colour: '#264653',
          data: data.prosecutions.map(d => ({
            date: yearToDate(d.year),
            value: d.prosecutions,
          })),
        },
      ]
    : [];

  // ── Derived values ────────────────────────────────────────────────────

  const latestAssaults = data?.physicalAssaults[data.physicalAssaults.length - 1];
  const baselineAssaults = data?.physicalAssaults[0];
  const latestUnsafe = data?.staffFeelingUnsafe[data.staffFeelingUnsafe.length - 1];
  const latestVerbal = data?.verbalAbuse[data.verbalAbuse.length - 1];
  const baselineVerbal = data?.verbalAbuse[0];

  const assaultChange = latestAssaults && baselineAssaults
    ? Math.round(((latestAssaults.incidents - baselineAssaults.incidents) / baselineAssaults.incidents) * 100)
    : 55;

  const verbalChange = latestVerbal && baselineVerbal
    ? Math.round(((latestVerbal.incidents - baselineVerbal.incidents) / baselineVerbal.incidents) * 100)
    : 71;

  return (
    <>
      <TopicNav topic="Violence Against NHS Staff" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Violence Against NHS Staff"
          question="How Safe Are NHS Workers?"
          finding="Over 200 assaults on NHS staff are reported every day, with the trend worsening post-pandemic. Physical assaults have risen 55% since 2015, and verbal abuse has nearly doubled."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Violence against NHS staff is not new, but its scale has reached a level that is now affecting recruitment, retention and the quality of care itself. In 2024, trusts across England reported 87,200 physical assaults on staff — an average of 239 per day.<Cite nums={1} /> These range from punches thrown in A&E waiting rooms to sustained attacks on mental health nurses by patients in crisis. Behind the headline figure sits a much larger volume of verbal abuse, threats and intimidation: over 210,000 reported incidents in 2024, and the true number is almost certainly higher.<Cite nums={2} /> Staff Survey data consistently shows that 40-60% of incidents go unreported, often because staff see it as "part of the job" or doubt that reporting will lead to any consequence.<Cite nums={2} /></p>
            <p>The drivers are structural. Emergency departments are overcrowded, with patients waiting 12 hours or more in corridors. Mental health wards are running at over 100% occupancy. Community services have been cut, meaning people in crisis arrive at hospitals as a last resort, more agitated and more unwell than they would have been with earlier intervention. Alcohol and substance use are factors in roughly a third of A&E-related assaults. Staff shortages mean fewer people managing more patients, reducing the capacity for de-escalation. The result is a vicious cycle: violence drives staff out, shortages increase pressure, and pressure breeds more violence.</p>
            <p>Mental health trusts bear the heaviest burden by far, with 127 reported assaults per thousand staff — more than three times the rate in acute hospitals and nearly seven times the rate in primary care.<Cite nums={3} /> Ambulance staff face the second-highest rate. These are not statistics that can be explained away by the nature of the patient population alone; they reflect a system under sustained pressure, where the conditions that generate violence are themselves a product of underfunding and understaffing.</p>
          </div>
          <div className="mt-6"><References items={editorialRefs} /></div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-assaults', label: 'Physical assaults' },
          { id: 'sec-verbal', label: 'Verbal abuse' },
          { id: 'sec-prosecutions', label: 'Prosecutions' },
          { id: 'sec-trust-type', label: 'By trust type' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Physical assaults per year"
            value={latestAssaults ? latestAssaults.incidents.toLocaleString() : '87,200'}
            unit="2024"
            direction="up"
            polarity="up-is-bad"
            changeText={`+${assaultChange}% since 2015 · 239 per day`}
            sparklineData={
              data ? sparkFrom(data.physicalAssaults.map(d => d.incidents)) : []
            }
            source="NHS Protect / NHSBSA · Reported Physical Assaults, 2024"
            href="#sec-assaults"
          />
          <MetricCard
            label="Staff feeling unsafe at work"
            value={latestUnsafe ? `${latestUnsafe.pct}%` : '15.8%'}
            unit="2024"
            direction="up"
            polarity="up-is-bad"
            changeText="Nearly doubled since 2015 · NHS Staff Survey"
            sparklineData={
              data ? sparkFrom(data.staffFeelingUnsafe.map(d => d.pct)) : []
            }
            source="NHS England · NHS Staff Survey, 2024"
            href="#sec-verbal"
          />
          <MetricCard
            label="Verbal abuse incidents"
            value={latestVerbal ? latestVerbal.incidents.toLocaleString() : '210,800'}
            unit="2024"
            direction="up"
            polarity="up-is-bad"
            changeText={`+${verbalChange}% since 2015 · 578 per day`}
            sparklineData={
              data ? sparkFrom(data.verbalAbuse.map(d => d.incidents)) : []
            }
            source="NHS England · NHS Staff Survey, 2024"
            href="#sec-prosecutions"
          />
        </div>

        {/* Chart 1: Physical assaults */}
        <ScrollReveal>
          <div id="sec-assaults" className="mb-12">
            <LineChart
              series={assaultSeries}
              title="Reported physical assaults on NHS staff, England, 2015–2024"
              subtitle="Annual reported incidents of physical assault. Up 55% in a decade, accelerating post-pandemic."
              yLabel="Incidents"
              source={{
                name: 'NHS Protect / NHSBSA',
                dataset: 'Reported Physical Assaults on NHS Staff',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 2: Verbal abuse */}
        <ScrollReveal>
          <div id="sec-verbal" className="mb-12">
            <LineChart
              series={verbalAbuseSeries}
              title="Verbal abuse and threats against NHS staff, 2015–2024"
              subtitle="Incidents of verbal abuse, threats and harassment from patients and the public. Likely significantly under-reported."
              yLabel="Incidents"
              source={{
                name: 'NHS England',
                dataset: 'NHS Staff Survey — verbal abuse from patients/public',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 3: Prosecutions vs referrals */}
        <ScrollReveal>
          <div id="sec-prosecutions" className="mb-12">
            <LineChart
              series={prosecutionSeries}
              title="Police referrals vs prosecutions for assaults on NHS staff, 2015–2024"
              subtitle="Referrals to police have doubled, but prosecutions have barely changed — a widening justice gap."
              yLabel="Cases"
              source={{
                name: 'NHS Counter Fraud Authority',
                dataset: 'Assault referral and prosecution data',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Trust type breakdown */}
        <ScrollReveal>
          <div id="sec-trust-type" className="mb-12">
            <div className="bg-white rounded-lg border border-wiah-border p-8">
              <h2 className="text-lg font-bold text-wiah-black mb-2">
                Assault rate by trust type (per 1,000 staff)
              </h2>
              <p className="text-sm text-wiah-mid mb-6">
                Mental health trusts face assault rates more than three times higher than acute hospitals.
              </p>
              <div className="mt-6 space-y-4">
                {data?.byTrustType.map((r) => {
                  const pct = (r.ratePerThousandStaff / 140) * 100;
                  return (
                    <div key={r.type}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-wiah-black">{r.type}</span>
                        <span className="font-mono text-sm font-bold text-wiah-black">{r.ratePerThousandStaff}</span>
                      </div>
                      <div className="h-6 bg-wiah-light rounded-sm overflow-hidden">
                        <div
                          className="h-full rounded-sm transition-all"
                          style={{ width: `${Math.min(pct, 100)}%`, backgroundColor: r.ratePerThousandStaff > 90 ? '#E63946' : r.ratePerThousandStaff > 40 ? '#F4A261' : '#6B7280' }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="font-mono text-xs text-wiah-mid mt-4">Source: NHS Protect / NHSBSA — Reported Physical Assaults by Trust Type, 2024</p>
            </div>
          </div>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="NHS violence reduction framework showing results in pilot trusts"
            value="23% reduction"
            description="NHS England's Violence Prevention and Reduction programme, rolled out across 40 pilot trusts since 2022, has achieved a 23% reduction in reported physical assaults in participating sites compared to control trusts. The programme combines body-worn cameras for frontline staff, de-escalation training, environmental redesign of high-risk areas such as A&E waiting rooms, and improved reporting systems. Staff in pilot trusts report feeling significantly safer and more supported. The programme is being expanded nationally, with all acute and mental health trusts expected to have access by 2027."
            source="Source: NHS England — Violence Prevention and Reduction Programme evaluation, 2025. NHS Staff Survey 2024."
          />
        </ScrollReveal>

        {/* Sources */}
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p><strong>Physical assaults:</strong> NHS Protect / NHS Business Services Authority — Reported Physical Assaults on NHS Staff, published annually. Covers all NHS trusts in England. Self-reported by trusts; under-reporting estimated at 40–60%.</p>
            <p><strong>Staff Survey:</strong> NHS England — NHS Staff Survey, annual. Covers approximately 1.3 million staff with a ~46% response rate. Questions on safety, harassment and abuse from patients/public.</p>
            <p><strong>Verbal abuse:</strong> Derived from NHS Staff Survey question on experiencing harassment, bullying or abuse from patients, relatives or the public in the last 12 months.</p>
            <p><strong>Prosecutions:</strong> NHS Counter Fraud Authority referral and prosecution data. Covers assaults referred to police by NHS trusts and subsequent prosecution outcomes.</p>
            <p><strong>Known issues:</strong> Reporting methodology changed in 2017; pre/post figures may not be directly comparable. COVID-19 altered working patterns in 2020/21 and may affect reported rates. Under-reporting remains the most significant data quality issue.</p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
