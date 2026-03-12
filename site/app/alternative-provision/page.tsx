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

// ── Types ────────────────────────────────────────────────────────────────────

interface APPupilPoint {
  year: number;
  count: number;
}

interface AttainmentPoint {
  year: number;
  apPct: number;
  mainstreamPct: number;
  note?: string;
}

interface ExclusionPoint {
  year: number;
  permanentExclusions: number;
  managedMoves: number;
  suspensions: number;
  note?: string;
}

interface APData {
  apPupilNumbers: APPupilPoint[];
  attainmentGap: AttainmentPoint[];
  exclusionRates: ExclusionPoint[];
  demographics: {
    sendRate: number;
    fsmRate: number;
    blackCaribbeanOverrepresentation: number;
    note: string;
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

function sparkFrom(arr: number[], n = 10) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function AlternativeProvisionPage() {
  const [data, setData] = useState<APData | null>(null);

  useEffect(() => {
    fetch('/data/alternative-provision/alternative_provision.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const pupilNumbersSeries: Series[] = data
    ? [{
        id: 'ap-pupils',
        label: 'Children in AP',
        colour: '#E63946',
        data: data.apPupilNumbers.map(d => ({
          date: yearToDate(d.year),
          value: d.count,
        })),
      }]
    : [];

  const attainmentSeries: Series[] = data
    ? [
        {
          id: 'ap-attainment',
          label: 'AP pupils (grade 4+ English & Maths)',
          colour: '#E63946',
          data: data.attainmentGap.map(d => ({
            date: yearToDate(d.year),
            value: d.apPct,
          })),
        },
        {
          id: 'mainstream-attainment',
          label: 'Mainstream pupils (grade 4+ English & Maths)',
          colour: '#2A9D8F',
          data: data.attainmentGap.map(d => ({
            date: yearToDate(d.year),
            value: d.mainstreamPct,
          })),
        },
      ]
    : [];

  const exclusionSeries: Series[] = data
    ? [
        {
          id: 'permanent-exclusions',
          label: 'Permanent exclusions',
          colour: '#E63946',
          data: data.exclusionRates.map(d => ({
            date: yearToDate(d.year),
            value: d.permanentExclusions,
          })),
        },
        {
          id: 'managed-moves',
          label: 'Managed moves (estimated)',
          colour: '#F4A261',
          data: data.exclusionRates.map(d => ({
            date: yearToDate(d.year),
            value: d.managedMoves,
          })),
        },
      ]
    : [];

  const latestPupils = data?.apPupilNumbers[data.apPupilNumbers.length - 1];
  const firstPupils = data?.apPupilNumbers[0];
  const latestAttainment = data?.attainmentGap[data.attainmentGap.length - 1];
  const latestExclusions = data?.exclusionRates[data.exclusionRates.length - 1];
  const prevExclusions = data?.exclusionRates[data.exclusionRates.length - 2];

  const pupilChange = latestPupils && firstPupils
    ? Math.round(((latestPupils.count - firstPupils.count) / firstPupils.count) * 100)
    : 70;

  const exclusionChange = latestExclusions && prevExclusions
    ? Math.round(((latestExclusions.permanentExclusions - prevExclusions.permanentExclusions) / prevExclusions.permanentExclusions) * 100)
    : 3;

  return (
    <>
      <TopicNav topic="Education & Skills" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Education & Skills"
          question="What actually happens when a child is excluded from school?"
          finding="Around 41,000 children in England are educated in alternative provision — up 70% in a decade. Just 4% achieve grade 4 or above in English and Maths, compared with 65% in mainstream schools. The exclusion pipeline disproportionately affects children with SEND, those on free school meals, and Black Caribbean pupils."
          colour="#2A9D8F"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              Alternative provision is where children go when mainstream school has given up on them — or, more accurately, when the system around them has failed to provide what they need. Around 41,000 children in England now attend AP settings: pupil referral units, hospital schools, and a patchwork of registered and unregistered providers. That number has risen 70% since 2014, driven by a sustained increase in permanent exclusions and the quieter, harder-to-track practice of managed moves and off-rolling, where schools remove pupils from their rolls without formal exclusion. The Timpson Review in 2019 found that exclusion is not random. Children with special educational needs are six times more likely to be permanently excluded than their peers. Those eligible for free school meals are four times more likely. Black Caribbean pupils are excluded at three times the rate of White British pupils. These disparities have persisted for over a decade and have not meaningfully narrowed.
            </p>
            <p>
              The quality of alternative provision varies enormously. Some AP settings deliver exceptional pastoral care and tailored curricula that re-engage young people with education. Others operate in substandard buildings with high staff turnover, limited subject offerings, and weak safeguarding. Ofsted has repeatedly flagged concerns about unregistered settings — providers operating outside regulatory oversight where children may be placed for months without the protections that apply in mainstream schools. The attainment gap tells the starkest story: just 4% of AP pupils achieve grade 4 or above in both English and Maths at Key Stage 4, compared with 65% in mainstream schools. This is not a gap — it is a chasm. For most children who enter AP, the pathway leads to NEET status (not in education, employment, or training), involvement in the criminal justice system, or both. Ministry of Justice data shows that 42% of prisoners attended AP or a pupil referral unit as children.
            </p>
            <p>
              There are grounds for cautious optimism. The government's AP Taskforce, established in 2024, is developing a national framework for AP quality standards, with mandatory registration for all providers expected by 2026. The SAFE (Support, Attend, Fulfil, Exceed) programme, piloted in 12 local authorities, takes an early-intervention approach — embedding specialist staff in mainstream schools to prevent exclusions before they happen, rather than trying to fix outcomes after a child has already been removed. Early results show a 23% reduction in permanent exclusions in pilot areas. The Timpson Review's central recommendation — that exclusion should be a last resort, not a first response to challenging behaviour — has been accepted in principle by successive governments. The challenge now is implementation: ensuring that managed moves are genuinely consensual, that off-rolling is identified and sanctioned, and that every child in AP receives an education that gives them a realistic chance of a decent life.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-pupils', label: 'AP pupils' },
          { id: 'sec-attainment', label: 'Attainment gap' },
          { id: 'sec-exclusions', label: 'Exclusions' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Children in alternative provision"
            value={latestPupils ? latestPupils.count.toLocaleString() : '41,000'}
            unit="2023/24"
            direction="up"
            polarity="up-is-bad"
            changeText={`+${pupilChange}% since 2014 · 82% have SEND · 64% eligible for FSM`}
            sparklineData={
              data ? sparkFrom(data.apPupilNumbers.map(d => d.count)) : []
            }
            source="DfE — Schools, Pupils and their Characteristics, 2023/24"
            href="#sec-pupils"
          />
          <MetricCard
            label="AP pupils achieving grade 4+ English & Maths"
            value={latestAttainment ? `${latestAttainment.apPct}%` : '4%'}
            unit="2023/24"
            direction="flat"
            polarity="up-is-good"
            changeText="vs 65% in mainstream schools · gap of 61 percentage points"
            sparklineData={
              data ? sparkFrom(data.attainmentGap.map(d => d.apPct)) : []
            }
            source="DfE — Key Stage 4 Performance, 2023/24"
            href="#sec-attainment"
          />
          <MetricCard
            label="Permanent exclusions"
            value={latestExclusions ? latestExclusions.permanentExclusions.toLocaleString() : '7,140'}
            unit="2023/24"
            direction="up"
            polarity="up-is-bad"
            changeText={`+${exclusionChange}% year-on-year · plus est. ${latestExclusions ? latestExclusions.managedMoves.toLocaleString() : '12,800'} managed moves`}
            sparklineData={
              data ? sparkFrom(data.exclusionRates.map(d => d.permanentExclusions)) : []
            }
            source="DfE — Permanent Exclusions and Suspensions in England, 2023/24"
            href="#sec-exclusions"
          />
        </div>

        {/* Chart 1: AP pupil numbers */}
        <ScrollReveal>
          <div id="sec-pupils" className="mb-12">
            <LineChart
              series={pupilNumbersSeries}
              title="Children in alternative provision, England, 2014–2024"
              subtitle="Total pupils in pupil referral units, AP academies, and AP free schools. Up 70% in a decade."
              yLabel="Pupils"
              source={{
                name: 'Department for Education',
                dataset: 'Schools, Pupils and their Characteristics',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 2: Attainment gap */}
        <ScrollReveal>
          <div id="sec-attainment" className="mb-12">
            <LineChart
              series={attainmentSeries}
              title="Attainment at Key Stage 4: AP vs mainstream, 2014–2024"
              subtitle="Percentage achieving grade 4+ in English and Maths. The gap has remained at ~60 percentage points for a decade."
              yLabel="% achieving grade 4+"
              source={{
                name: 'Department for Education',
                dataset: 'Key Stage 4 Performance',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 3: Exclusion rates */}
        <ScrollReveal>
          <div id="sec-exclusions" className="mb-12">
            <LineChart
              series={exclusionSeries}
              title="Permanent exclusions and managed moves feeding AP, 2014–2024"
              subtitle="Permanent exclusions are formally recorded. Managed moves are estimated — no mandatory national reporting exists."
              yLabel="Children"
              source={{
                name: 'Department for Education',
                dataset: 'Permanent Exclusions and Suspensions in England',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="AP Taskforce and SAFE programme: early intervention over exclusion"
            value="23% reduction"
            description="The government's AP Taskforce, established in 2024, is developing national quality standards for all alternative provision settings, with mandatory registration expected by 2026. The SAFE (Support, Attend, Fulfil, Exceed) programme, piloted in 12 local authorities, embeds specialist staff in mainstream schools to prevent exclusions before they happen. Early results show a 23% reduction in permanent exclusions in pilot areas. The Timpson Review's core recommendation — that exclusion should be a genuine last resort — is now being translated into operational practice, with new guidance requiring schools to demonstrate what interventions were attempted before exclusion."
            source="Source: DfE — AP Taskforce Terms of Reference, 2024. Timpson Review of School Exclusion, 2019. ISOS Partnership — SAFE Programme Evaluation, 2025."
          />
        </ScrollReveal>
        <RelatedTopics />
      </main>
    </>
  );
}
