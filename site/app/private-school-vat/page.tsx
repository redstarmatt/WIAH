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
  { num: 1, name: 'DfE', dataset: 'VAT on Private Schools — Impact Assessment', date: '2025' },
  { num: 2, name: 'HM Treasury', dataset: 'VAT Education Receipts Q1 2025', date: '2025' },
  { num: 3, name: 'Independent Schools Council', dataset: 'ISC Annual Census 2025', url: 'https://www.isc.co.uk/research/', date: '2025' },
];

// ── Types ────────────────────────────────────────────────────────────────────

interface TermlyFeePoint {
  year: number;
  avgTermlyFeeThousands: number;
}

interface PupilTransferPoint {
  month: string;
  cumulativeThousands: number;
}

interface SchoolClosurePoint {
  year: number;
  closedOrMerged: number;
}

interface PrivateSchoolVatData {
  national: {
    termlyFees: {
      timeSeries: TermlyFeePoint[];
      latestYear: number;
      latestThousands: number;
      note: string;
    };
    pupilTransfers: {
      timeSeries: PupilTransferPoint[];
      latestMonth: string;
      latestThousands: number;
      note: string;
    };
    schoolClosures: {
      timeSeries: SchoolClosurePoint[];
      latestYear: number;
      latestCount: number;
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

// Month labels to dates (2025)
const monthMap: Record<string, Date> = {
  'Jan 2025': new Date(2025, 0, 15),
  'Feb 2025': new Date(2025, 1, 15),
  'Mar 2025': new Date(2025, 2, 15),
  'Apr 2025': new Date(2025, 3, 15),
  'May 2025': new Date(2025, 4, 15),
};

// ── Page ─────────────────────────────────────────────────────────────────────

export default function PrivateSchoolVatPage() {
  const [data, setData] = useState<PrivateSchoolVatData | null>(null);

  useEffect(() => {
    fetch('/data/private-school-vat/private_school_vat.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const feesSeries: Series[] = data
    ? [{
        id: 'fees',
        label: 'Average termly fee (£ thousands)',
        colour: '#2A9D8F',
        data: data.national.termlyFees.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.avgTermlyFeeThousands,
        })),
      }]
    : [];

  const transferSeries: Series[] = data
    ? [{
        id: 'transfers',
        label: 'Cumulative pupils transferred to state (thousands)',
        colour: '#264653',
        data: data.national.pupilTransfers.timeSeries.map(d => ({
          date: monthMap[d.month] ?? new Date(2025, 0, 15),
          value: d.cumulativeThousands,
        })),
      }]
    : [];

  const feesAnnotations: Annotation[] = [
    { date: new Date(2024, 5, 1), label: '2024: VAT announcement confirmed' },
    { date: new Date(2025, 0, 1), label: 'Jan 2025: VAT takes effect' },
  ];

  const transferAnnotations: Annotation[] = [
    { date: new Date(2025, 0, 15), label: 'Jan 2025: Term begins with VAT in place' },
  ];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Private School VAT" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Private School VAT"
          question="What Happened When VAT Was Added to Private Schools?"
          finding="20% VAT on private school fees was introduced in January 2025. Average fees rose by 6.5%, with larger fee rises in less price-sensitive London schools. An estimated 35,000 pupils moved to state schools in 2025, below government projections."
          colour="#2A9D8F"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              The removal of VAT exemption from private school fees in January 2025 was the most significant structural change to the independent education sector in decades. The government projected that 40,000 pupils would transfer to state schools as a consequence, generating revenue of approximately £1.5 billion per year to fund 6,500 new state school teachers.<Cite nums={1} /> Early data suggests the actual transfer was somewhat lower — around 35,000 by May 2025 — partly because larger, more financially resilient schools absorbed much of the VAT cost internally through fee restructuring, bursary adjustments, and cost efficiency, passing through an average of 6.5% to parents rather than the full 20%.<Cite nums={[2, 3]} />
            </p>
            <p>
              The distributional effects have been uneven. Smaller prep schools — many of which operated on thin margins serving middle-income families with annual household incomes of £60,000–£100,000 — have faced the sharpest squeeze. Nine schools closed or merged in the first year of VAT.<Cite nums={3} /> London's most elite schools, with termly fees exceeding £10,000, have been least affected in relative terms: their clientele has the least price sensitivity and the schools have the largest endowment buffers. The policy has effectively been regressive within the independent sector, falling hardest on the schools serving the borderline family that could just about afford private education.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-fees', label: 'Fee Levels' },
          { id: 'sec-transfers', label: 'Pupil Transfers' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Average private school termly fee"
              value="£6,300"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Up 21% since 2022 · VAT pass-through + pre-existing inflation"
              sparklineData={[5.2, 5.5, 5.9, 6.3]}
              href="#sec-fees"
            />
            <MetricCard
              label="Pupils moved to state sector (2025)"
              value="35,000"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Below government 40,000 projection · Larger schools absorbed cost"
              sparklineData={[5, 12, 21, 28, 35]}
              href="#sec-fees"
            />
            <MetricCard
              label="Private schools closed/merged (2025)"
              value="9"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Mainly smaller prep schools · More at risk in 2026"
              sparklineData={[0, 4, 9]}
              href="#sec-fees"
            />
          </div>
        

        {/* Charts */}
        <ScrollReveal>
          <section id="sec-fees" className="mb-12">
            <LineChart
              title="Average private school termly fee, UK, 2022–2025"
              subtitle="Average termly day-pupil fee across ISC member schools (£ thousands). Fees have risen 21% since 2022, driven by pre-existing cost inflation and then VAT introduction in January 2025."
              series={feesSeries}
              annotations={feesAnnotations}
              yLabel="£ thousands per term"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-transfers" className="mb-12">
            <LineChart
              title="Cumulative pupils transferred from private to state schools, Jan–May 2025"
              subtitle="Estimated cumulative number of pupils moving from independent schools to state sector following VAT introduction. The government projected 40,000 transfers; 35,000 had occurred by May 2025."
              series={transferSeries}
              annotations={transferAnnotations}
              yLabel="Thousands (cumulative)"
            />
          </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="What's improving"
            value="6,500 new teachers funded"
            unit=""
            description="VAT revenue is earmarked for state school investment, funding 6,500 new teachers. Schools in the most deprived areas receive extra funding from the VAT receipts. The government's Opportunity Mission commits to improving GCSE outcomes for pupils from disadvantaged backgrounds. Some private schools are expanding bursary provision to retain pupils from families who cannot afford the full VAT-inclusive fee."
            source="Source: DfE — VAT on private schools: impact assessment 2025; HM Treasury — VAT education receipts Q1 2025."
          />
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        {/* Sources */}
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            {data?.metadata.sources.map((src, i) => (
              <div key={i}>
                <a href={src.url} target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">
                  {src.name} — {src.dataset}
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
              <RelatedTopics />
      </main>
    </>
  );
}
