'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';

// ── Types ────────────────────────────────────────────────────────────────────

interface DecayPrevalencePoint {
  year: number;
  decayPct: number;
}

interface HospitalAdmissionsPoint {
  year: number;
  admissionsThousands: number;
}

interface DeprivationPoint {
  quintile: string;
  quintileShort: string;
  decayPct: number;
}

interface ChildDentalData {
  national: {
    decayPrevalence5yo: {
      timeSeries: DecayPrevalencePoint[];
      latestYear: number;
      latestPct: number;
      note: string;
    };
    hospitalAdmissions: {
      timeSeries: HospitalAdmissionsPoint[];
      latestYear: number;
      latestThousands: number;
      note: string;
    };
    deprivationGap: {
      data: DeprivationPoint[];
      year: number;
      note: string;
    };
  };
  metadata: {
    sources: { name: string; dataset: string; url: string; frequency: string }[];
    methodology: string;
    knownIssues: string[];
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function ChildToothDecayPage() {
  const [data, setData] = useState<ChildDentalData | null>(null);

  useEffect(() => {
    fetch('/data/child-tooth-decay/child_dental.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const decaySeries: Series[] = data
    ? [{
        id: 'decay',
        label: '5-year-olds with tooth decay (%)',
        colour: '#E63946',
        data: data.national.decayPrevalence5yo.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.decayPct,
        })),
      }]
    : [];

  const admissionsSeries: Series[] = data
    ? [{
        id: 'admissions',
        label: 'Hospital admissions for tooth decay <18 (thousands)',
        colour: '#F4A261',
        data: data.national.hospitalAdmissions.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.admissionsThousands,
        })),
      }]
    : [];

  const decayAnnotations: Annotation[] = [
    { date: new Date(2019, 5, 1), label: '2019: Water fluoridation consultation launched' },
    { date: new Date(2020, 5, 1), label: '2020: Pandemic halts dental services' },
    { date: new Date(2022, 5, 1), label: '2022: Health and Care Act \u2014 fluoridation powers' },
  ];

  const admissionsAnnotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: '2020: Elective GA procedures suspended' },
    { date: new Date(2023, 5, 1), label: '2023: Record waiting list for dental GA' },
  ];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Child Tooth Decay" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Child Tooth Decay"
          question="Why Is Tooth Decay the Number One Reason Children Go to Hospital?"
          finding="Tooth decay is the most common reason for hospital admissions in children aged 5&ndash;9. In 2023, 34,000 children had teeth extracted under general anaesthetic &mdash; almost all preventable. Decay rates are 3&times; higher in deprived areas."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              Dental caries &mdash; tooth decay caused by acid-producing bacteria feeding on dietary sugar &mdash; is the most entirely preventable disease that nonetheless sends more children to hospital under general anaesthetic than any other condition. In 2024, 34,000 children under 18 had teeth extracted in hospital, almost all as a direct consequence of decay that could have been prevented by fluoride toothpaste, diet, routine dental check-ups, and water fluoridation. The NHS dental crisis that has left an estimated 12 million adults unable to access an NHS dentist is amplifying the problem: children who do not see a dentist routinely are diagnosed later, by which point extraction is often the only option.
            </p>
            <p>
              The social gradient is the starkest expression of health inequality in England. Children aged five in the most deprived areas have a 42% prevalence of visible tooth decay &mdash; three times the 14% rate in the least deprived areas. The gap has not narrowed materially in a decade. Sugar consumption correlates strongly with deprivation, NHS dental access is worst in deprived areas, and fluoridated water supply covers only a minority of England&apos;s population. The public health tools to address child tooth decay are well-understood and cost-effective. The barrier is political will and structural investment in NHS dentistry and preventive oral health programmes.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-decay', label: 'Decay Rates' },
          { id: 'sec-admissions', label: 'Hospital Admissions' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        {/* Metric cards */}
        <ScrollReveal>
          <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Children aged 5 with tooth decay"
              value="26%"
              unit=""
              direction="flat"
              polarity="up-is-bad"
              changeText="Down from 33% in 2015 but stalling since 2021 &middot; Pandemic regression"
              sparklineData={[33, 31, 28, 24, 23, 20, 22, 24, 26, 26]}
              href="#sec-decay"
            />
            <MetricCard
              label="Hospital admissions for tooth decay &lt;18"
              value="34,000"
              unit=""
              direction="flat"
              polarity="up-is-bad"
              changeText="Almost entirely preventable &middot; #1 reason for child hospital admission"
              sparklineData={[42, 40, 37, 34, 33, 22, 28, 31, 33, 34]}
              href="#sec-decay"
            />
            <MetricCard
              label="Deprivation gap in child decay"
              value="3x"
              unit=""
              direction="flat"
              polarity="up-is-bad"
              changeText="42% most deprived vs 14% least &middot; Starkest health inequality"
              sparklineData={[42, 33, 26, 18, 14]}
              href="#sec-decay"
            />
          </div>
        </ScrollReveal>

        {/* Charts */}
        <ScrollReveal>
          <section id="sec-decay" className="mb-12">
            <LineChart
              title="Tooth decay in 5-year-olds, England, 2015&ndash;2024"
              subtitle="Percentage of 5-year-old children with obvious dental decay experience. Long-run improvement stalled after the pandemic as dental services were disrupted and sugar consumption rose in lower-income households."
              series={decaySeries}
              annotations={decayAnnotations}
              yLabel="% 5-year-olds with decay"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-admissions" className="mb-12">
            <LineChart
              title="Hospital admissions for tooth extractions under GA, under-18s, England, 2015&ndash;2024"
              subtitle="Children admitted to hospital for dental extraction under general anaesthetic. Fell 2015&ndash;2019 due to preventive improvements, then rose again post-pandemic as dental access deteriorated."
              series={admissionsSeries}
              annotations={admissionsAnnotations}
              yLabel="Thousands per year"
            />
          </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="What&apos;s improving"
            value="Water fluoridation expansion"
            unit=""
            description="The NHS Start4Life programme promotes tooth brushing from the first tooth. Water fluoridation expansion is planned under the Health and Care Act 2022, with the government taking direct powers to extend fluoridation schemes. Some councils fund free toothbrush packs for children in deprived areas. NHS England&apos;s dental recovery plan has increased the number of new NHS dental contracts. The Healthy Start voucher scheme provides nutritional support to low-income families with young children."
            source="Source: OHID &mdash; Oral health survey of 5-year-old children 2023; NHS England &mdash; Dental statistics 2024."
          />
        </ScrollReveal>

        {/* Sources */}
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            {data?.metadata.sources.map((src, i) => (
              <div key={i}>
                <a href={src.url} target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">
                  {src.name} &mdash; {src.dataset}
                </a>
                <div className="text-xs text-wiah-mid">Updated {src.frequency}</div>
              </div>
            ))}
          </div>
          <div className="text-sm text-wiah-mid mt-6 space-y-2">
            <h3 className="font-bold">Methodology</h3>
            <p>{data?.metadata.methodology}</p>
          </div>
          <div className="text-sm text-wiah-mid mt-6 space-y-2">
            <h3 className="font-bold">Known issues</h3>
            <ul className="list-disc list-inside space-y-1">
              {data?.metadata.knownIssues.map((issue, i) => (
                <li key={i}>{issue}</li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
