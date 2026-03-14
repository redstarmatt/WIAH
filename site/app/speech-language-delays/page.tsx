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
  { num: 1, name: 'Department for Education', dataset: 'Early Years Foundation Stage Profile Results, 2023/24', url: 'https://explore-education-statistics.service.gov.uk/find-statistics/early-years-foundation-stage-profile-results', date: '2024' },
  { num: 2, name: 'NHS England', dataset: 'Community Services Statistics — SLT Waiting Times', url: 'https://digital.nhs.uk/data-and-information/publications/statistical/community-services-statistics', date: '2024' },
  { num: 3, name: 'RCSLT / NHS Digital', dataset: 'NHS Workforce Statistics — Speech and Language Therapists', url: 'https://digital.nhs.uk/data-and-information/publications/statistical/nhs-workforce-statistics', date: '2024' },
  { num: 4, name: 'Education Endowment Foundation', dataset: 'Nuffield Early Language Intervention (NELI) Evaluation', url: 'https://educationendowmentfoundation.org.uk/projects-and-evaluation/projects/nuffield-early-language-intervention', date: '2023' },
];

// ── Types ────────────────────────────────────────────────────────────────────

interface SchoolReadinessPoint {
  year: number;
  pct: number;
}

interface WaitingTimePoint {
  year: number;
  pct: number;
}

interface WorkforcePoint {
  year: number;
  fte: number;
}

interface ReferralPoint {
  year: number;
  count: number;
}

interface SpeechLanguageData {
  schoolReadiness: SchoolReadinessPoint[];
  waitingTimes: WaitingTimePoint[];
  sltWorkforce: WorkforcePoint[];
  referrals: ReferralPoint[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 0, 1);
}

function sparkFrom(arr: number[], n = 10) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function SpeechLanguageDelaysPage() {
  const [data, setData] = useState<SpeechLanguageData | null>(null);

  useEffect(() => {
    fetch('/data/speech-language-delays/speech_language_delays.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const schoolReadinessSeries: Series[] = data
    ? [{
        id: 'school-readiness',
        label: 'Children starting school with speech/language delays (%)',
        colour: '#E63946',
        data: data.schoolReadiness.map(d => ({
          date: yearToDate(d.year),
          value: d.pct,
        })),
      }]
    : [];

  const waitingTimeSeries: Series[] = data
    ? [{
        id: 'waiting-times',
        label: 'Children waiting >18 weeks for SLT (%)',
        colour: '#E63946',
        data: data.waitingTimes.map(d => ({
          date: yearToDate(d.year),
          value: d.pct,
        })),
      }]
    : [];

  const workforceSeries: Series[] = data
    ? [
        {
          id: 'workforce',
          label: 'SLT workforce (FTE)',
          colour: '#264653',
          data: data.sltWorkforce.map(d => ({
            date: yearToDate(d.year),
            value: d.fte,
          })),
        },
        {
          id: 'referrals',
          label: 'New referrals',
          colour: '#E63946',
          data: data.referrals.map(d => ({
            date: yearToDate(d.year),
            value: d.count / 10,
          })),
        },
      ]
    : [];

  const schoolReadinessAnnotations: Annotation[] = [
    { date: new Date(2020, 2, 1), label: '2020: COVID lockdowns begin' },
    { date: new Date(2021, 8, 1), label: '2021: Post-lockdown cohort enters school' },
  ];

  const waitingAnnotations: Annotation[] = [
    { date: new Date(2020, 2, 1), label: '2020: Services paused during lockdown' },
  ];

  const workforceAnnotations: Annotation[] = [
    { date: new Date(2018, 0, 1), label: '2018: NHS Long Term Plan announced' },
  ];

  // ── Latest values ─────────────────────────────────────────────────────

  const latestReadiness = data?.schoolReadiness[data.schoolReadiness.length - 1];
  const baselineReadiness = data?.schoolReadiness[0];
  const latestWaiting = data?.waitingTimes[data.waitingTimes.length - 1];
  const baselineWaiting = data?.waitingTimes.find(d => d.year === 2019);
  const latestWorkforce = data?.sltWorkforce[data.sltWorkforce.length - 1];
  const baselineWorkforce = data?.sltWorkforce[0];

  const workforceChange = latestWorkforce && baselineWorkforce
    ? Math.round(((latestWorkforce.fte - baselineWorkforce.fte) / baselineWorkforce.fte) * 100)
    : -14;

  return (
    <>
      <TopicNav topic="Speech & Language Delays" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Speech & Language Delays"
          question="Why Are So Many Children Starting School Unable to Talk Properly?"
          finding="17.5% of children in England now start school with speech and language delays — up from 12.8% a decade ago. 38% of children referred for speech therapy wait more than 18 weeks. The SLT workforce has shrunk by 14% while referrals have surged 72%."
          colour="#E63946"
          preposition="with"
        />

        {/* ── Editorial context ─────────────────────────────────────────── */}
        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              Something has gone wrong with how young children learn to talk, and the data makes it
              impossible to look away. In 2015, roughly one in eight children arrived at primary
              school without the communication and language skills expected for their age. By 2024,
              it was closer to one in six.<Cite nums={1} /> The trajectory was already worsening before COVID-19, but
              the pandemic accelerated it brutally. Lockdowns removed the rich, incidental language
              exposure that young children depend on — playgroups, nurseries, grandparents, the
              everyday background hum of human interaction. Children born in 2019 and 2020 entered
              school having spent their most critical language-development months in homes where
              exhausted parents were working remotely, where screens substituted for socialisation,
              and where face masks made lip-reading impossible for toddlers still learning to decode
              speech. The cohort effect is measurable and may persist for years.<Cite nums={1} />
            </p>
            <p>
              The system that is supposed to catch and support these children is buckling. NHS speech
              and language therapy referrals have risen from 142,000 in 2015 to 245,000 in 2024 — a
              72% increase.<Cite nums={2} /> But the workforce has moved in the opposite direction: the number of
              full-time equivalent speech and language therapists in England has fallen from 16,800
              to 14,500 over the same period, a 14% decline driven by poor pay relative to
              comparable allied health professions, limited career progression, and rising caseloads
              that make the work unsustainable.<Cite nums={3} /> The result is predictable. In 2019, 19% of children
              referred for speech therapy waited more than 18 weeks. By 2024, that figure had
              doubled to 38%.<Cite nums={2} /> Behind each percentage point are children missing the window when
              intervention is most effective — the period before age five when the brain is most
              plastic and responsive to language support.
            </p>
            <p>
              There is a socioeconomic gradient to this crisis that makes it doubly corrosive.
              Children in the most deprived areas are roughly twice as likely to start school with
              speech and language delays as those in the least deprived. The gap has widened since
              the pandemic. Without intervention, poor early language is strongly predictive of
              lower educational attainment, reduced employment prospects, and worse mental health
              outcomes. The evidence base for early speech and language intervention is robust — it
              works, it is cost-effective, and it changes life trajectories.<Cite nums={4} /> The question is not
              whether we know what to do, but whether the system has the capacity to do it.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-readiness', label: 'School readiness' },
          { id: 'sec-waiting', label: 'Waiting times' },
          { id: 'sec-workforce', label: 'Workforce vs demand' },
        ]} />

        {/* ── Metric cards ──────────────────────────────────────────────── */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Children starting school with speech/language delays"
            value={latestReadiness ? `${latestReadiness.pct}%` : '17.5%'}
            direction="up"
            polarity="up-is-bad"
            changeText={
              latestReadiness && baselineReadiness
                ? `up from ${baselineReadiness.pct}% in ${baselineReadiness.year} · post-lockdown cohorts worst affected`
                : 'up from 12.8% in 2015 · post-lockdown cohorts worst affected'
            }
            sparklineData={
              data ? sparkFrom(data.schoolReadiness.map(d => d.pct)) : [12.8,13.1,13.5,14,14.2,15.1,16.4,16.9,17.3,17.5]
            }
            source="DfE — EYFSP Results, 2024"
            href="#sec-readiness"
          />
          <MetricCard
            label="Children waiting >18 weeks for speech therapy"
            value={latestWaiting ? `${latestWaiting.pct}%` : '38%'}
            direction="up"
            polarity="up-is-bad"
            changeText={
              latestWaiting && baselineWaiting
                ? `up from ${baselineWaiting.pct}% in 2019 · SLT workforce shrinking`
                : 'doubled from 19% in 2019 · SLT workforce shrinking'
            }
            sparklineData={
              data ? sparkFrom(data.waitingTimes.map(d => d.pct)) : [12,14.5,16,18,19,21,28,34,37,38]
            }
            source="NHS England — Community Services Statistics, 2024"
            href="#sec-waiting"
          />
          <MetricCard
            label="SLT workforce (FTE)"
            value={latestWorkforce ? latestWorkforce.fte.toLocaleString() : '14,500'}
            direction="down"
            polarity="down-is-bad"
            changeText={`${workforceChange}% since 2015 · referrals up 72% over same period`}
            sparklineData={
              data ? sparkFrom(data.sltWorkforce.map(d => d.fte)) : [16800,16650,16400,16200,15900,15700,15300,15100,14800,14500]
            }
            source="RCSLT / NHS Workforce Statistics, 2024"
            href="#sec-workforce"
          />
        </div>

        {/* ── Chart 1: School readiness ─────────────────────────────────── */}
        <ScrollReveal>
          <div id="sec-readiness" className="mb-12">
            <LineChart
              series={schoolReadinessSeries}
              title="Children starting school with speech and language delays, England, 2015–2024"
              subtitle="Percentage of children rated below expected level in Communication and Language at age 5 (EYFSP)."
              yLabel="% of children"
              annotations={schoolReadinessAnnotations}
              source={{
                name: 'Department for Education',
                dataset: 'Early Years Foundation Stage Profile Results',
                frequency: 'annual',
                url: 'https://explore-education-statistics.service.gov.uk/find-statistics/early-years-foundation-stage-profile-results',
                date: '2024',
              }}
            />
          </div>
        </ScrollReveal>

        {/* ── Chart 2: Waiting times ────────────────────────────────────── */}
        <ScrollReveal>
          <div id="sec-waiting" className="mb-12">
            <LineChart
              series={waitingTimeSeries}
              title="Children waiting >18 weeks for speech and language therapy, England, 2015–2024"
              subtitle="Share of referred children waiting more than 18 weeks for their first SLT appointment. Doubled since 2019."
              yLabel="% waiting >18 weeks"
              annotations={waitingAnnotations}
              source={{
                name: 'NHS England',
                dataset: 'Community Services Statistics — SLT Waiting Times',
                frequency: 'annual',
                url: 'https://digital.nhs.uk/data-and-information/publications/statistical/community-services-statistics',
                date: '2024',
              }}
            />
          </div>
        </ScrollReveal>

        {/* ── Chart 3: Workforce vs referrals ───────────────────────────── */}
        <ScrollReveal>
          <div id="sec-workforce" className="mb-12">
            <LineChart
              series={workforceSeries}
              title="SLT workforce vs referral demand, England, 2015–2024"
              subtitle="Full-time equivalent therapists (blue) vs new referrals in tens of thousands (red). The gap between supply and demand has widened every year."
              yLabel="FTE / Referrals (÷10)"
              annotations={workforceAnnotations}
              source={{
                name: 'RCSLT / NHS England',
                dataset: 'Workforce Statistics & Community Services Statistics',
                frequency: 'annual',
                url: 'https://www.rcslt.org/speech-and-language-therapy/',
                date: '2024',
              }}
            />
          </div>
        </ScrollReveal>

        {/* ── Positive callout ──────────────────────────────────────────── */}
        <ScrollReveal>
          <PositiveCallout
            title="Early intervention programmes showing strong evidence"
            value="2:1"
            unit="return on investment"
            description="Randomised controlled trials of targeted early language interventions — including the Nuffield Early Language Intervention (NELI) programme, now deployed in over 11,000 schools — show consistent, statistically significant gains in receptive and expressive language for children who receive support before age five. Economic modelling by the Education Endowment Foundation estimates a £2 return for every £1 invested, driven by reduced need for later special educational provision and improved long-term educational outcomes. The challenge is not evidence but scale: current SLT workforce capacity means fewer than half of eligible children can access these programmes within the critical window."
            source="Source: Education Endowment Foundation — NELI evaluation, 2023. RCSLT — Early Intervention Evidence Review, 2024."
          />
        </ScrollReveal>

        {/* ── Sources & Methodology ─────────────────────────────────────── */}
        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p>
              <a href="https://explore-education-statistics.service.gov.uk/find-statistics/early-years-foundation-stage-profile-results" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">
                Department for Education — EYFSP Results
              </a>{' '}
              — school readiness data. Annual. Retrieved November 2025.
            </p>
            <p>
              <a href="https://digital.nhs.uk/data-and-information/publications/statistical/community-services-statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">
                NHS England — Community Services Statistics
              </a>{' '}
              — SLT referrals and waiting times. Annual. Retrieved November 2025.
            </p>
            <p>
              <a href="https://www.rcslt.org/speech-and-language-therapy/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">
                Royal College of Speech and Language Therapists
              </a>{' '}
              — workforce data. Annual. Retrieved November 2025.
            </p>
            <p className="mt-4">
              All figures are for England unless otherwise stated. School readiness is measured via
              the Early Years Foundation Stage Profile (EYFSP), assessed at age 5. Children rated
              &apos;emerging&apos; or below in Communication and Language are classified as having speech
              and language delays. EYFSP assessments were suspended in 2020 due to COVID-19; the
              2020 figure shown is interpolated. Waiting time data covers NHS community SLT services.
              Workforce FTE combines NHS and independent sector figures.
            </p>
          </div>
        </section>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <RelatedTopics />
      </main>
    </>
  );
}
