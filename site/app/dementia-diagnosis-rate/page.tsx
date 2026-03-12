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

interface DiagnosisRatePoint {
  year: number;
  rate: number;
}

interface UndiagnosedPoint {
  year: number;
  count: number;
}

interface MemoryClinicPoint {
  year: number;
  weeksMedian: number;
}

interface RegionData {
  region: string;
  rate: number;
}

interface DementiaDiagnosisData {
  diagnosisRate: DiagnosisRatePoint[];
  estimatedUndiagnosed: UndiagnosedPoint[];
  memoryClinicWaits: MemoryClinicPoint[];
  byRegion: RegionData[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 0, 1);
}

function sparkFrom(arr: number[], n = 10) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function DementiaDiagnosisRatePage() {
  const [data, setData] = useState<DementiaDiagnosisData | null>(null);

  useEffect(() => {
    fetch('/data/dementia-diagnosis-rate/dementia_diagnosis_rate.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const diagnosisRateSeries: Series[] = data
    ? [{
        id: 'diagnosis-rate',
        label: 'Diagnosis rate (%)',
        colour: '#E63946',
        data: data.diagnosisRate.map(d => ({
          date: yearToDate(d.year),
          value: d.rate,
        })),
      }]
    : [];

  const undiagnosedSeries: Series[] = data
    ? [{
        id: 'undiagnosed',
        label: 'Estimated undiagnosed (people)',
        colour: '#6B7280',
        data: data.estimatedUndiagnosed.map(d => ({
          date: yearToDate(d.year),
          value: d.count,
        })),
      }]
    : [];

  const memoryClinicSeries: Series[] = data
    ? [{
        id: 'memory-clinic',
        label: 'Median wait (weeks)',
        colour: '#264653',
        data: data.memoryClinicWaits.map(d => ({
          date: yearToDate(d.year),
          value: d.weeksMedian,
        })),
      }]
    : [];

  const diagnosisAnnotations: Annotation[] = [
    { date: new Date(2014, 6, 1), label: "2014: PM\u2019s Dementia Challenge target set" },
    { date: new Date(2020, 2, 1), label: "2020: COVID \u2014 GP referrals collapse" },
  ];

  const undiagnosedAnnotations: Annotation[] = [
    { date: new Date(2016, 0, 1), label: "2016: lowest undiagnosed figure" },
    { date: new Date(2020, 2, 1), label: "2020: COVID diagnostic gap widens" },
  ];

  const memoryClinicAnnotations: Annotation[] = [
    { date: new Date(2020, 2, 1), label: "2020: COVID \u2014 clinics suspended" },
  ];

  const targetLine = { value: 66.7, label: "NHS 66.7% target" };

  // ── Derived metrics ──────────────────────────────────────────────────────

  const latestRate = data?.diagnosisRate[data.diagnosisRate.length - 1];
  const peakRate = data?.diagnosisRate.reduce((a, b) => a.rate > b.rate ? a : b);
  const latestUndiagnosed = data?.estimatedUndiagnosed[data.estimatedUndiagnosed.length - 1];
  const latestClinicWait = data?.memoryClinicWaits[data.memoryClinicWaits.length - 1];
  const peakClinicWait = data?.memoryClinicWaits.reduce((a, b) => a.weeksMedian > b.weeksMedian ? a : b);

  return (
    <>
      <TopicNav topic="Dementia Diagnosis Rate" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Dementia Diagnosis Rate"
          question="Why Are Hundreds of Thousands Living with Undiagnosed Dementia?"
          finding="The dementia diagnosis rate has fallen to 61.4% — well below the NHS 66.7% target. An estimated 385,000 people in England are living with undiagnosed dementia, missing out on treatment, support, and the chance to plan for their future."
          colour="#E63946"
          preposition="in"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              In 2014, when the Prime Minister launched the Dementia Challenge, the diagnosis rate stood at 58.6%. A major push through GP incentive schemes and memory clinic expansion drove the rate to a peak of 67.6% by 2017 — briefly exceeding the ambition standard of 66.7%. It has fallen every year since. The COVID-19 pandemic accelerated a decline that was already underway: face-to-face GP consultations collapsed, memory clinic referrals dropped by over 40% in the first lockdown, and many older people with early cognitive symptoms simply never presented. By 2025, the rate has slipped to 61.4%, meaning more than one in three people estimated to have dementia have no formal diagnosis on their GP record.
            </p>
            <p>
              The consequences of non-diagnosis are concrete and serious. Without a diagnosis, people cannot access dementia-specific medications such as cholinesterase inhibitors, which can slow symptom progression in early-stage Alzheimer disease. They cannot be referred to post-diagnostic support services — Admiral Nurses, cognitive stimulation therapy groups, or social prescribing. They are far less likely to set up lasting powers of attorney, make advance care plans, or have conversations with their families about the future while they still can. Research consistently shows that earlier diagnosis improves quality of life for both the person with dementia and their carers, yet the system is moving in the wrong direction.
            </p>
            <p>
              The regional picture is stark. London has the lowest diagnosis rate at 55.2%, driven by younger and more mobile populations who are less connected to a single GP, language barriers in diverse communities, and cultural stigma around cognitive decline. The North East performs best at 66.8%, just meeting the national target — a reflection of longstanding investment in memory assessment services and strong primary care networks. Memory clinic waiting times, which surged to a median of 13.2 weeks during the pandemic, have recovered to 8.2 weeks but remain double the 4.2-week median seen in 2015. For a condition where early intervention matters most, an eight-week wait from GP referral to first assessment is not good enough.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-diagnosis-rate', label: 'Diagnosis rate' },
          { id: 'sec-undiagnosed', label: 'Undiagnosed' },
          { id: 'sec-clinic-waits', label: 'Clinic waits' },
          { id: 'sec-regional', label: 'Regional' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Dementia diagnosis rate"
            value={latestRate ? `${latestRate.rate}%` : "61.4%"}
            unit="2025"
            direction="down"
            polarity="up-is-good"
            changeText={
              latestRate && peakRate
                ? `down from ${peakRate.rate}% peak in ${peakRate.year} \u00b7 NHS target is 66.7%`
                : "down from 67.6% peak in 2017 \u00b7 NHS target is 66.7%"
            }
            sparklineData={
              data ? sparkFrom(data.diagnosisRate.map(d => d.rate)) : [63.1, 67.4, 67.6, 67.2, 66.8, 63.1, 61.6, 62.0, 62.9, 62.2]
            }
            source="NHS England \u00b7 Recorded Dementia Diagnoses, 2025"
            href="#sec-diagnosis-rate"
          />
          <MetricCard
            label="People with undiagnosed dementia"
            value={latestUndiagnosed ? `${Math.round(latestUndiagnosed.count / 1000)}K` : "385K"}
            unit="est. 2025"
            direction="up"
            polarity="up-is-bad"
            changeText="rising as population ages \u00b7 London worst at 55.2% diagnosis rate"
            sparklineData={
              data ? sparkFrom(data.estimatedUndiagnosed.map(d => d.count)) : [310000, 345000, 365000, 360000, 355000, 370000, 385000]
            }
            source="NHS England / Alzheimer\u2019s Society \u00b7 Prevalence estimates, 2025"
            href="#sec-undiagnosed"
          />
          <MetricCard
            label="Memory clinic median wait"
            value={latestClinicWait ? `${latestClinicWait.weeksMedian} wks` : "8.2 wks"}
            unit="2025"
            direction="down"
            polarity="up-is-bad"
            changeText={
              latestClinicWait && peakClinicWait
                ? `down from ${peakClinicWait.weeksMedian}-week COVID peak \u00b7 still double 2015 levels`
                : "down from 13.2-week COVID peak \u00b7 still double 2015 levels"
            }
            sparklineData={
              data ? sparkFrom(data.memoryClinicWaits.map(d => d.weeksMedian)) : [6.1, 7.3, 13.2, 11.8, 10.4, 9.1, 8.6, 8.2]
            }
            source="Royal College of Psychiatrists \u00b7 MSNAP, 2025"
            href="#sec-clinic-waits"
          />
        </div>

        {/* Chart 1: Diagnosis rate */}
        <ScrollReveal>
          <div id="sec-diagnosis-rate" className="mb-12">
            <LineChart
              series={diagnosisRateSeries}
              title="Dementia diagnosis rate, England, 2012\u20132025"
              subtitle="Percentage of estimated dementia cases with a formal GP-recorded diagnosis. NHS ambition standard is 66.7%."
              yLabel="Diagnosis rate (%)"
              targetLine={targetLine}
              annotations={diagnosisAnnotations}
              source={{
                name: 'NHS England',
                dataset: 'Recorded Dementia Diagnoses',
                url: 'https://digital.nhs.uk/data-and-information/publications/statistical/recorded-dementia-diagnoses',
                frequency: 'monthly',
                date: 'Feb 2026',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 2: Undiagnosed population */}
        <ScrollReveal>
          <div id="sec-undiagnosed" className="mb-12">
            <LineChart
              series={undiagnosedSeries}
              title="Estimated people living with undiagnosed dementia, England, 2012\u20132025"
              subtitle="Derived from CFAS II prevalence model minus GP-registered diagnoses. Rising as population ages and diagnosis rate falls."
              yLabel="People (estimated)"
              annotations={undiagnosedAnnotations}
              source={{
                name: 'NHS England / Alzheimer\u2019s Society',
                dataset: 'Dementia UK Update \u2014 prevalence estimates',
                url: 'https://www.alzheimers.org.uk/about-us/policy-and-influencing/dementia-uk-report',
                frequency: 'periodic',
                date: 'Feb 2026',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 3: Memory clinic waits */}
        <ScrollReveal>
          <div id="sec-clinic-waits" className="mb-12">
            <LineChart
              series={memoryClinicSeries}
              title="Memory clinic median waiting time, England, 2015\u20132025"
              subtitle="Median weeks from GP referral to first memory clinic assessment. COVID caused a sharp spike in 2020."
              yLabel="Weeks (median)"
              annotations={memoryClinicAnnotations}
              source={{
                name: 'Royal College of Psychiatrists',
                dataset: 'Memory Services National Accreditation Programme (MSNAP)',
                url: 'https://www.rcpsych.ac.uk/improving-care/ccqi/national-clinical-audits/memory-services-national-accreditation-programme',
                frequency: 'annual',
                date: 'Feb 2026',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Regional variation */}
        <ScrollReveal>
          <div id="sec-regional" className="mb-12">
            <div className="bg-white rounded-lg border border-wiah-border p-8">
              <h2 className="text-lg font-bold text-wiah-black mb-2">
                Dementia diagnosis rate by NHS England region (%)
              </h2>
              <p className="text-sm text-wiah-mid mb-6">
                Percentage of estimated dementia cases with a formal diagnosis. NHS ambition standard is 66.7%.
              </p>
              <div className="mt-6 space-y-4">
                {data?.byRegion.map((r) => {
                  const pct = (r.rate / 75) * 100;
                  const meetsTarget = r.rate >= 66.7;
                  return (
                    <div key={r.region}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-wiah-black">{r.region}</span>
                        <span className="font-mono text-sm font-bold text-wiah-black">{r.rate}%</span>
                      </div>
                      <div className="h-6 bg-wiah-light rounded-sm overflow-hidden relative">
                        <div
                          className="h-full rounded-sm transition-all"
                          style={{ width: `${pct}%`, backgroundColor: meetsTarget ? '#2A9D8F' : '#E63946' }}
                        />
                        {/* Target marker */}
                        <div
                          className="absolute top-0 bottom-0 w-px bg-wiah-black opacity-30"
                          style={{ left: `${(66.7 / 75) * 100}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
                <div className="flex items-center gap-4 mt-4">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-sm bg-[#2A9D8F]" />
                    <span className="font-mono text-[11px] text-wiah-mid">Meets 66.7% target</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-sm bg-[#E63946]" />
                    <span className="font-mono text-[11px] text-wiah-mid">Below target</span>
                  </div>
                </div>
              </div>
              <p className="font-mono text-xs text-wiah-mid mt-4">Source: NHS England \u2014 Recorded Dementia Diagnoses by Sub-ICB Location, aggregated to region, 2025</p>
            </div>
          </div>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="North East consistently meeting the diagnosis target"
            value="66.8%"
            description="The North East is the only NHS England region consistently meeting the 66.7% ambition standard for dementia diagnosis. This reflects sustained investment in memory assessment services, strong primary care networks with proactive case-finding, and effective integration between GP practices and specialist dementia teams. The region has maintained its diagnosis rate above the target even through the pandemic recovery period, demonstrating that the national decline is not inevitable — it reflects choices about resource allocation and clinical priority."
            source="Source: NHS England \u2014 Recorded Dementia Diagnoses by region, 2025. Royal College of Psychiatrists \u2014 MSNAP annual report."
          />
        </ScrollReveal>

        <RelatedTopics />
      </main>
    </>
  );
}
