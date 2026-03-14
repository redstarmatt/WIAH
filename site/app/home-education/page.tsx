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
  { num: 1, name: 'Department for Education', dataset: 'Elective Home Education Statistics', url: 'https://www.gov.uk/government/statistics/elective-home-education', date: '2025' },
  { num: 2, name: "Children's Commissioner", dataset: 'Children Not in School', url: 'https://www.childrenscommissioner.gov.uk/report/children-not-in-school/', date: '2023' },
  { num: 3, name: 'ADCS', dataset: 'Elective Home Education Survey', url: 'https://adcs.org.uk/safeguarding/article/elective-home-education-survey', date: '2025' },
  { num: 4, name: 'UK Parliament', dataset: 'Schools Bill 2022 — Children Not in School Register', url: 'https://bills.parliament.uk/bills/3156', date: '2022' },
];

// ── Types ────────────────────────────────────────────────────────────────────

interface EHEPoint {
  year: number;
  children: number;
}

interface RegistrationPoint {
  year: number;
  pct: number;
}

interface ReasonsPoint {
  year: number;
  schoolAnxiety: number;
  dissatisfactionSEN: number;
  philosophicalChoice: number;
  bullying: number;
  other: number;
}

interface SENDPoint {
  year: number;
  pct: number;
}

interface RegionData {
  region: string;
  ratePer10k: number;
}

interface HomeEducationData {
  eheNumbers: EHEPoint[];
  registrationRate: RegistrationPoint[];
  reasonsForEHE: ReasonsPoint[];
  sendWithoutEHCP: SENDPoint[];
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

export default function HomeEducationPage() {
  const [data, setData] = useState<HomeEducationData | null>(null);

  useEffect(() => {
    fetch('/data/home-education/home_education.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const eheSeries: Series[] = data
    ? [{
        id: 'ehe-numbers',
        label: 'Children in elective home education',
        colour: '#6B7280',
        data: data.eheNumbers.map(d => ({
          date: yearToDate(d.year),
          value: d.children,
        })),
      }]
    : [];

  const eheAnnotations: Annotation[] = [
    { date: new Date(2020, 2, 1), label: '2020: School closures — EHE surge' },
    { date: new Date(2024, 3, 1), label: '2024: Children Not in School register proposed' },
  ];

  const reasonsSeries: Series[] = data
    ? [
        {
          id: 'school-anxiety',
          label: 'School anxiety / refusal',
          colour: '#E63946',
          data: data.reasonsForEHE.map(d => ({
            date: yearToDate(d.year),
            value: d.schoolAnxiety,
          })),
        },
        {
          id: 'sen-dissatisfaction',
          label: 'Dissatisfaction with SEN support',
          colour: '#F4A261',
          data: data.reasonsForEHE.map(d => ({
            date: yearToDate(d.year),
            value: d.dissatisfactionSEN,
          })),
        },
        {
          id: 'bullying',
          label: 'Bullying',
          colour: '#264653',
          data: data.reasonsForEHE.map(d => ({
            date: yearToDate(d.year),
            value: d.bullying,
          })),
        },
      ]
    : [];

  const reasonsAnnotations: Annotation[] = [
    { date: new Date(2020, 2, 1), label: '2020: Pandemic shifts reasons profile' },
  ];

  const sendSeries: Series[] = data
    ? [{
        id: 'send-no-ehcp',
        label: 'Home-educated children with SEND but no EHCP',
        colour: '#E63946',
        data: data.sendWithoutEHCP.map(d => ({
          date: yearToDate(d.year),
          value: d.pct,
        })),
      }]
    : [];

  const sendAnnotations: Annotation[] = [
    { date: new Date(2022, 0, 1), label: '2022: SEND Green Paper published' },
  ];

  // ── Derived values ────────────────────────────────────────────────────────

  const latestEHE = data?.eheNumbers[data.eheNumbers.length - 1];
  const baselineEHE = data?.eheNumbers.find(d => d.year === 2019);
  const eheGrowth = latestEHE && baselineEHE
    ? Math.round(((latestEHE.children - baselineEHE.children) / baselineEHE.children) * 100)
    : 61;

  const latestRegistration = data?.registrationRate[data.registrationRate.length - 1];

  const latestSEND = data?.sendWithoutEHCP[data.sendWithoutEHCP.length - 1];
  const firstSEND = data?.sendWithoutEHCP[0];
  const sendIncrease = latestSEND && firstSEND
    ? latestSEND.pct - firstSEND.pct
    : 25;

  return (
    <>
      <TopicNav topic="Home Education" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Home Education"
          question="How Many Children Are Being Educated at Home?"
          finding="An estimated 96,800 children in England are now known to local authorities as electively home educated — a record high, up 61% since 2019. School anxiety and unmet SEND needs are the leading drivers. Nearly half of local authorities still lack a proper register, meaning tens of thousands of children remain invisible to the system."
          colour="#6B7280"
          preposition="with"
        />

        {/* Editorial context */}
        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              Home education in England has undergone a quiet transformation. Before the pandemic, around 60,000 children were known to local authorities as electively home educated. By autumn 2025, that figure had reached 96,800 — a 61% increase in six years.<Cite nums={1} /> The true number is almost certainly higher: England has no mandatory registration system for home-educated children, and the Children's Commissioner has estimated the real total could be 20-40% above official counts.<Cite nums={2} /> That means somewhere between 116,000 and 135,000 children may be educated entirely outside the school system, with no routine oversight of their welfare or educational progress.
            </p>
            <p>
              The reasons families give for deregistering tell a story about what is going wrong inside schools. School anxiety and emotionally-based school avoidance now account for 41% of new deregistrations where a reason is recorded — nearly double the 22% recorded in 2019.<Cite nums={3} /> Dissatisfaction with SEND provision is the second most common factor at 22%, reflecting a special educational needs system under severe strain: an estimated 63% of home-educated children identified as having SEND do not hold an Education, Health and Care Plan, meaning they left school without the formal support they were entitled to.<Cite nums={3} /> Bullying accounts for a further 13%. Only 12% of families cite a positive philosophical preference for home education as their primary reason — the majority are, in effect, refugees from a system that failed them.
            </p>
            <p>
              The policy response has been halting. The Schools Bill 2022, which included provisions for a compulsory register of children not in school, fell when Parliament was prorogued.<Cite nums={4} /> A revised Children Not in School register was proposed in 2024 and is progressing through legislation, but implementation remains uncertain. Meanwhile, local authority children's services — already stretched thin by rising demand for social care — have limited capacity to monitor the welfare of a home-educated population that has nearly tripled in a decade. The fundamental tension is between parents' legal right to educate their children at home and the state's duty to ensure every child receives a suitable education and is safeguarded from harm. The data suggests that for many families, deregistration is not an empowered choice but a last resort — and the system has no reliable way of knowing which is which.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-ehe-trend', label: 'EHE numbers' },
          { id: 'sec-reasons', label: 'Reasons' },
          { id: 'sec-send', label: 'SEND' },
          { id: 'sec-regional', label: 'Regional' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Children in elective home education (England)"
            value={latestEHE ? latestEHE.children.toLocaleString() : '96,800'}
            unit="2024/25"
            direction="up"
            polarity="up-is-bad"
            changeText={`up ${eheGrowth}% since 2019 · record high · true total likely 20-40% higher`}
            sparklineData={
              data ? sparkFrom(data.eheNumbers.map(d => d.children)) : [53000, 57400, 60200, 75700, 81200, 84100, 88400, 92000, 96800]
            }
            source="DfE — Elective Home Education Statistics, Nov 2025"
            href="#sec-ehe-trend"
          />
          <MetricCard
            label="Home-educated children with SEND (no EHCP)"
            value={latestSEND ? `${latestSEND.pct}%` : '63%'}
            unit="2024/25"
            direction="up"
            polarity="up-is-bad"
            changeText={`up ${sendIncrease} percentage points since 2017 · left school without formal support`}
            sparklineData={
              data ? data.sendWithoutEHCP.map(d => d.pct) : [38, 41, 44, 49, 52, 55, 58, 61, 63]
            }
            source="ADCS — Elective Home Education Survey, 2025"
            href="#sec-send"
          />
          <MetricCard
            label="LAs with register of home educators"
            value={latestRegistration ? `${latestRegistration.pct}%` : '52%'}
            unit="2024/25"
            direction="up"
            polarity="up-is-good"
            changeText="rising but still nearly half without · Children Not in School register pending"
            sparklineData={
              data ? data.registrationRate.map(d => d.pct) : [18, 21, 25, 28, 31, 35, 38, 41, 43, 48, 52]
            }
            source="DfE — Local Authority EHE Data, Nov 2025"
            href="#sec-regional"
          />
        </div>

        {/* Chart 1: EHE numbers over time */}
        <ScrollReveal>
          <div id="sec-ehe-trend" className="mb-12">
            <LineChart
              series={eheSeries}
              annotations={eheAnnotations}
              title="Children in elective home education, England, 2015–2025"
              subtitle="Known to local authorities. True total likely 20-40% higher due to no mandatory registration."
              yLabel="Children"
              source={{
                name: 'Department for Education',
                dataset: 'Elective Home Education Statistics',
                frequency: 'annual',
                url: 'https://www.gov.uk/government/statistics/elective-home-education',
                date: 'Nov 2025',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 2: Reasons for home education */}
        <ScrollReveal>
          <div id="sec-reasons" className="mb-12">
            <LineChart
              series={reasonsSeries}
              annotations={reasonsAnnotations}
              title="Primary reason for deregistration, 2019–2025"
              subtitle="Percentage of deregistrations by stated reason. School anxiety has nearly doubled since 2019."
              yLabel="% of deregistrations"
              source={{
                name: 'Association of Directors of Children\'s Services',
                dataset: 'Elective Home Education Survey',
                frequency: 'annual',
                url: 'https://adcs.org.uk/safeguarding/article/elective-home-education-survey',
                date: '2025',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 3: SEND without EHCP */}
        <ScrollReveal>
          <div id="sec-send" className="mb-12">
            <LineChart
              series={sendSeries}
              annotations={sendAnnotations}
              title="Home-educated children with SEND but no EHCP, 2017–2025"
              subtitle="Proportion of identified SEND children in home education who lack an Education, Health and Care Plan."
              yLabel="% without EHCP"
              source={{
                name: 'ADCS / DfE',
                dataset: 'SEND and Elective Home Education linked data',
                frequency: 'annual',
                url: 'https://www.gov.uk/government/statistics/elective-home-education',
                date: '2025',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Regional variation */}
        <ScrollReveal>
          <div id="sec-regional" className="mb-12">
            <div className="bg-white rounded-lg border border-wiah-border p-8">
              <h2 className="text-lg font-bold text-wiah-black mb-2">
                Elective home education rate by region (per 10,000 school-age children)
              </h2>
              <p className="text-sm text-wiah-mid mb-6">
                Rural and coastal areas consistently show higher EHE rates. London has the lowest rate, likely reflecting greater school choice and SEND provision.
              </p>
              <div className="mt-6 space-y-4">
                {data?.byRegion.map((r) => {
                  const pct = (r.ratePer10k / 80) * 100;
                  return (
                    <div key={r.region}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-wiah-black">{r.region}</span>
                        <span className="font-mono text-sm font-bold text-wiah-black">{r.ratePer10k}</span>
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
              <p className="font-mono text-xs text-wiah-mid mt-4">
                Source: DfE — Elective Home Education Statistics by Region, Nov 2025
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Children Not in School register gaining momentum"
            value="52%"
            unit="of LAs now maintaining voluntary registers"
            description="Despite the absence of mandatory registration, the proportion of local authorities maintaining a voluntary register of home-educated children has risen from 18% in 2015 to 52% in 2025. The proposed Children Not in School register, if enacted, would give local authorities a legal basis to identify all home-educated children for the first time. Several local authorities — including Bristol, Hampshire, and Leeds — have developed exemplary practice, offering home-educating families access to examination centres, library resources, and optional educational support without compromising parental autonomy. These models demonstrate that oversight and support need not be adversarial."
            source="Source: DfE — Local Authority EHE Data, Nov 2025. ADCS — Elective Home Education Survey, 2025."
          />
        </ScrollReveal>

        {/* Sources & Methodology */}
        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p>
              <a href="https://www.gov.uk/government/statistics/elective-home-education" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">
                Department for Education — Elective Home Education Statistics
              </a>{' '}
              — primary data source for EHE numbers and registration rates. Retrieved Nov 2025. Annual.
            </p>
            <p>
              <a href="https://adcs.org.uk/safeguarding/article/elective-home-education-survey" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">
                ADCS — Elective Home Education Survey
              </a>{' '}
              — reasons for deregistration and SEND data. Annual survey of Directors of Children&apos;s Services. Retrieved Nov 2025.
            </p>
            <p>
              <a href="https://www.childrenscommissioner.gov.uk/report/children-not-in-school/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">
                Children&apos;s Commissioner — Children Not in School
              </a>{' '}
              — estimates of true EHE population including unregistered children. Periodic.
            </p>
            <p className="mt-4">
              All figures are for England unless otherwise stated. EHE numbers represent children known to local authorities — the true total is higher due to no mandatory registration requirement.
              Reasons data is only available where local authorities record it at point of deregistration.
              SEND figures are based on ADCS survey data and DfE data linkage.
              Trend data uses the most recent available release at time of publication.
            </p>
          </div>
        </section>

        <References items={editorialRefs} />
        <RelatedTopics />
      </main>
    </>
  );
}
