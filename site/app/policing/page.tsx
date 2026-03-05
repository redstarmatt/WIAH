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

interface OfficerPoint {
  year: number;
  officersThousands: number;
}

interface ChargeRatePoint {
  year: number;
  chargedOrSummonedPct: number;
}

interface ConfidencePoint {
  year: number;
  confidencePct: number;
}

interface PolicingData {
  national: {
    officerNumbers: {
      timeSeries: OfficerPoint[];
      latestYear: number;
      latestThousands: number;
    };
    chargeRates: {
      timeSeries: ChargeRatePoint[];
      latestYear: number;
      latestPct: number;
    };
    publicConfidence: {
      timeSeries: ConfidencePoint[];
      latestYear: number;
      latestPct: number;
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

export default function PolicingPage() {
  const [data, setData] = useState<PolicingData | null>(null);

  useEffect(() => {
    fetch('/data/policing/policing.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const officerSeries: Series[] = data
    ? [{
        id: 'officers',
        label: 'Police officers (E&W)',
        colour: '#6B7280',
        data: data.national.officerNumbers.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.officersThousands,
        })),
      }]
    : [];

  const officerAnnotations: Annotation[] = [
    { date: new Date(2019, 5, 1), label: '2019: 20K uplift programme begins' },
    { date: new Date(2022, 5, 1), label: '2022: Record 149,566' },
  ];

  const chargeRateSeries: Series[] = data
    ? [{
        id: 'chargeRate',
        label: 'Charge/summons rate (%)',
        colour: '#E63946',
        data: data.national.chargeRates.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.chargedOrSummonedPct,
        })),
      }]
    : [];

  const confidenceSeries: Series[] = data
    ? [{
        id: 'confidence',
        label: 'Public confidence (%)',
        colour: '#F4A261',
        data: data.national.publicConfidence.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.confidencePct,
        })),
      }]
    : [];

  const confidenceAnnotations: Annotation[] = [
    { date: new Date(2021, 5, 1), label: '2021: Everard murder' },
    { date: new Date(2023, 5, 1), label: '2023: Casey Review' },
  ];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Policing" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Policing"
          question="Is There Actually Enough Policing?"
          finding={
            data
              ? `The charge rate for all recorded crime has fallen from 15.5% in 2014 to ${data.national.chargeRates.latestPct}% in ${data.national.chargeRates.latestYear}. Public confidence in police has dropped 9 percentage points in two years to ${data.national.publicConfidence.latestPct}%. Officer numbers recovered from their austerity low but remain under pressure.`
              : 'The charge rate for all recorded crime has collapsed. Public confidence in police has dropped sharply. Officer numbers are under pressure.'
          }
          colour="#6B7280"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              England and Wales had 143,734 police officers in 2010. Austerity cut 22,000 of them, driving numbers to a low of 121,700 by 2018. The government&apos;s 20,000 officer uplift programme, launched in 2019, pushed headcount to a record 149,566 by March 2022 &mdash; but the recovery proved fragile. By 2024, numbers had slipped to 145,700 as forces struggled to retain recruits. The population grew 6% over the same period, meaning even the 2022 record left the officer-to-population ratio below its 2010 level. More officers in absolute terms; fewer per person served.
            </p>
            <p>
              The charge rate has collapsed. In 2014, 15.5% of police-recorded crimes resulted in a charge or summons; by 2023 that figure was 5.6%. Of the 6.8 million crimes recorded in 2022/23, fewer than 400,000 led to a charge &mdash; meaning 94 in every 100 reported offences produced no criminal proceedings. For rape, the charge rate fell below 2%. The CPS raised its evidential threshold under the Full Code Test after the Janner affair, which police blame for the decline; critics counter that forces deprioritised volume crime and allowed investigative capacity to atrophy.
            </p>
            <p>
              Public trust has eroded to its lowest recorded level. The Crime Survey for England and Wales found just 54.1% of adults rated their local police as doing a good job in 2023, down from 63.5% in 2019. In London, confidence fell to 44% following the murder of Sarah Everard by serving Metropolitan Police officer Wayne Couzens in 2021 and the 2023 Casey Review, which declared the Met institutionally corrupt, racist, and misogynist. The IOPC logged a record 35,846 misconduct complaints in 2022/23. Meanwhile, stop and search surged from 271,000 in 2018 to 809,000 in 2023, with Black people 7 times more likely to be stopped than white.
            </p>
            <p>The burden falls unevenly. Rural forces like Dyfed-Powys and North Yorkshire cover vast geographies with fewer than 1,500 officers, meaning response times for non-emergency calls can exceed 24 hours. In urban areas, neighbourhood policing &mdash; the community-facing function most linked to public trust &mdash; has absorbed the deepest cuts: dedicated neighbourhood officers fell from 20,000 in 2015 to under 12,000 by 2023. The composition of forces has shifted too. The uplift programme recruited heavily from younger, less experienced demographics; 40% of officers now have fewer than five years&apos; service, and detective shortfalls persist at 15% nationally. Experienced investigators retired faster than they could be replaced, hollowing out the capacity to handle complex cases &mdash; fraud, sexual offences, cybercrime &mdash; that demand specialist skills and long-term commitment.</p>
            <p>Policing data in England and Wales is fragmented across 43 territorial forces, each with different recording practices. The Home Office sets counting rules, but compliance varies: HMICFRS found &ldquo;notable inconsistencies&rdquo; in crime recording accuracy across forces in 2023, with some under-recording violent crime by up to 10%. The charge rate figures exclude out-of-court disposals &mdash; cautions, community resolutions, penalty notices &mdash; which now account for a growing share of outcomes but are not consistently captured. Public confidence surveys rely on the Crime Survey for England and Wales, which excludes under-16s, people in institutions, and the homeless &mdash; groups with disproportionate police contact. Stop and search data depend on officer self-recording of perceived ethnicity, introducing subjectivity. There is no national dataset linking individual cases from report through to court outcome.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-officers', label: 'Officers' },
          { id: 'sec-charges', label: 'Charge Rates' },
          { id: 'sec-confidence', label: 'Confidence' },
        ]} />

        {/* Metric cards */}
        <ScrollReveal>
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Police officers (E&W)"
            value="145,700"
            unit=""
            direction="down"
            polarity="up-is-good"
            changeText="2024 · Down from 149,566 record in 2022 · Uplift programme stalling"
            sparklineData={[143.7, 140.2, 135.8, 130.5, 127.9, 124.1, 122.4, 121.9, 121.7, 123.2, 131.3, 139.8, 149.6, 147.5, 145.7]}
            onExpand={() => {}}
          />
          <MetricCard
            label="Charge/summons rate"
            value="5.6%"
            unit=""
            direction="down"
            polarity="up-is-good"
            changeText="2023 · Down from 15.5% in 2014 · &lt;400K charges from 6.8M recorded crimes"
            sparklineData={[15.5, 14.9, 14.1, 12.7, 10.0, 8.0, 7.0, 6.5, 6.1, 5.6]}
            onExpand={() => {}}
          />
          <MetricCard
            label="Public confidence in police"
            value="54.1%"
            unit=""
            direction="down"
            polarity="up-is-good"
            changeText="2023 · Down from 63.5% in 2019 · Post-Everard/Casey Review erosion"
            sparklineData={[61.2, 62.1, 62.7, 63.2, 63.0, 63.5, 60.8, 59.4, 55.7, 54.1]}
            onExpand={() => {}}
          />
        </div>
        </ScrollReveal>

        {/* Charts */}
        <ScrollReveal>
        <section id="sec-officers" className="mb-12">
          <LineChart
            title="Police officers, England and Wales, 2010–2024"
            subtitle="Headcount of police officers (excluding specials). Fell by over 20,000 during austerity 2010–2018, recovered to a record 149,566 in 2022, now declining again."
            series={officerSeries}
            annotations={officerAnnotations}
            yLabel="Thousands"
          />
        </section>
        </ScrollReveal>

        <ScrollReveal>
        <section id="sec-charges" className="mb-12">
          <LineChart
            title="Charge/summons rate for recorded crime, 2014–2023"
            subtitle="Crimes resulting in a charge or summons as % of all police-recorded crime. Has fallen from 15.5% to 5.6% — meaning 94% of recorded crimes now result in no charge."
            series={chargeRateSeries}
            yLabel="%"
          />
        </section>
        </ScrollReveal>

        <ScrollReveal>
        <section id="sec-confidence" className="mb-12">
          <LineChart
            title="Public confidence in police, 2014–2023"
            subtitle="Percentage of adults who agree police do a good job in their area (Crime Survey for England and Wales). Has fallen sharply since 2019 following high-profile misconduct cases."
            series={confidenceSeries}
            annotations={confidenceAnnotations}
            yLabel="%"
          />
        </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
        <PositiveCallout
          title="What&apos;s improving"
          value="149,566"
          unit="officers in 2022 &mdash; the highest headcount in the history of England and Wales policing"
          description="The 20,000 officer uplift programme launched in 2019 succeeded in raising officer numbers to a record 149,566 by March 2022 &mdash; exceeding the pre-austerity 2010 level. Over 8,000 of these were women (a record proportion at 33%). The programme included targeted investment in detective capacity, with 1,000 additional detectives trained. Neighbourhood policing teams were expanded and dedicated Violence Against Women and Girls (VAWG) officers appointed across many forces."
          source="Source: Home Office &mdash; Police workforce, England and Wales, March 2022."
        />
        </ScrollReveal>

        {/* Sources */}
        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
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
