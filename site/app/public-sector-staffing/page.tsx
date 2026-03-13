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
  { num: 1, name: 'Cabinet Office', dataset: 'Civil Service Statistics', url: 'https://www.gov.uk/government/statistics/civil-service-statistics', date: '2024', note: 'Civil service contracted from 492,000 in 2010 to 384,000 by 2016; recovered to 514,000 by 2024' },
  { num: 2, name: 'DLUHC / ONS', dataset: 'Local Government Employment Statistics', date: '2024', note: 'Local government workforce fell from 2.98M in 2010 to 2.44M by 2016; at 2.62M in 2024, still 12% below pre-austerity' },
  { num: 3, name: 'NHS Digital', dataset: 'NHS Workforce Statistics', url: 'https://digital.nhs.uk/data-and-information/publications/statistical/nhs-workforce-statistics', date: '2024', note: 'NHS grew from 1.16M in 2015 to 1.48M in 2024; 27% increase' },
];

// ── Types ────────────────────────────────────────────────────────────────────

interface CivilServicePoint {
  year: number;
  headcountThousands: number;
}

interface NHSPoint {
  year: number;
  headcountThousands: number;
}

interface LocalGovPoint {
  year: number;
  headcountThousands: number;
}

interface PublicSectorStaffingData {
  national: {
    civilService: {
      timeSeries: CivilServicePoint[];
      latestYear: number;
      latestThousands: number;
      note: string;
    };
    nhsWorkforce: {
      timeSeries: NHSPoint[];
      latestYear: number;
      latestThousands: number;
      note: string;
    };
    localGovernment: {
      timeSeries: LocalGovPoint[];
      latestYear: number;
      latestThousands: number;
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

export default function PublicSectorStaffingPage() {
  const [data, setData] = useState<PublicSectorStaffingData | null>(null);

  useEffect(() => {
    fetch('/data/public-sector-staffing/public_sector_staffing.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const civilServiceSeries: Series[] = data
    ? [{
        id: 'civil-service',
        label: 'Civil service headcount',
        colour: '#264653',
        data: data.national.civilService.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.headcountThousands,
        })),
      }]
    : [];

  const nhsSeries: Series[] = data
    ? [{
        id: 'nhs',
        label: 'NHS workforce',
        colour: '#E63946',
        data: data.national.nhsWorkforce.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.headcountThousands,
        })),
      }]
    : [];

  const localGovSeries: Series[] = data
    ? [{
        id: 'local-gov',
        label: 'Local government workforce',
        colour: '#F4A261',
        data: data.national.localGovernment.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.headcountThousands,
        })),
      }]
    : [];

  const civilServiceAnnotations: Annotation[] = [
    { date: new Date(2010, 5, 1), label: '2010: Austerity begins' },
    { date: new Date(2016, 5, 1), label: '2016: Low point (384,000)' },
    { date: new Date(2020, 5, 1), label: '2020: COVID expansion' },
  ];

  const localGovAnnotations: Annotation[] = [
    { date: new Date(2010, 5, 1), label: '2010: Peak (2.98M)' },
    { date: new Date(2016, 5, 1), label: '2016: Low (2.44M, -18%)' },
  ];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Public Sector Staffing" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Public Sector Staffing"
          question="Is the State Running Out of Workers?"
          finding="Public sector employment fell from 5.9 million in 2010 to 5.5 million in 2016, then rose to 5.9 million by 2024 — but heavily concentrated in NHS headcount. The civil service shrank 23% under austerity and has not recovered."
          colour="#264653"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              The UK public sector workforce tells three distinct stories that the aggregate headline number obscures. The civil service contracted sharply from 492,000 in 2010 to 384,000 by 2016 under the coalition's austerity programme, shedding around 110,000 posts — a 22% reduction.<Cite nums={1} /> It has since recovered to 514,000, driven largely by pandemic response machinery, post-Brexit border functions, and the growth of arm's-length bodies, but remains structurally different: younger, more London-concentrated, and with less institutional memory than the service it replaced.
            </p>
            <p>
              Local government bore the heaviest cuts proportionally. From 2.98 million workers in 2010, the local government workforce fell to 2.44 million by 2016 as councils absorbed an average 40% real-terms reduction in central government grant. Adult social care, libraries, planning teams, and environmental health departments all contracted. Unlike the civil service, local government has not recovered: at 2.62 million in 2024, it remains 12% below its pre-austerity level.<Cite nums={2} /> Meanwhile the NHS grew continuously, from 1.16 million in 2015 to 1.48 million in 2024, as demand outpaced the departures that vacancy crisis headlines describe.<Cite nums={3} />
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-civil-service', label: 'Civil Service' },
          { id: 'sec-local-gov', label: 'Local Government' },
          { id: 'sec-nhs', label: 'NHS' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Civil service headcount"
              value="514,000"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="+4% in 2024 · But still 23% below 2010 peak · COVID era expansion ongoing"
              sparklineData={[492, 450, 424, 400, 390, 384, 384, 390, 396, 404, 436, 465, 478, 512, 514]}
              href="#sec-civil-service"
            />
            <MetricCard
              label="NHS workforce"
              value="1.48M"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="+27% since 2015 · Largest component of public sector growth"
              sparklineData={[1160, 1180, 1210, 1240, 1260, 1280, 1320, 1360, 1420, 1480]}
              href="#sec-civil-service"
            />
            <MetricCard
              label="Local government workforce"
              value="2.62M"
              unit=""
              direction="down"
              polarity="up-is-bad"
              changeText="Down 12% from 2010 · Austerity-era cuts not reversed · Social care most affected"
              sparklineData={[2980, 2760, 2620, 2540, 2480, 2450, 2440, 2460, 2490, 2520, 2560, 2580, 2600, 2610, 2620]}
              href="#sec-civil-service"
            />
          </div>
        

        {/* Charts */}
        <ScrollReveal>
          <section id="sec-civil-service" className="mb-12">
            <LineChart
              title="UK civil service headcount, 2010–2024"
              subtitle="Total civil service headcount, all grades and departments. Fell 22% under austerity 2010–2016, recovering through COVID expansion and post-Brexit functions."
              series={civilServiceSeries}
              annotations={civilServiceAnnotations}
              yLabel="Thousands"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-local-gov" className="mb-12">
            <LineChart
              title="Local government workforce, England, 2010–2024"
              subtitle="Local government headcount. Fell 18% 2010–2016 as councils absorbed central grant cuts. Unlike the civil service, local government has not recovered to pre-austerity levels."
              series={localGovSeries}
              annotations={localGovAnnotations}
              yLabel="Thousands"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-nhs" className="mb-12">
            <LineChart
              title="NHS workforce headcount, England, 2015–2024"
              subtitle="All NHS staff in post, including clinical and non-clinical. Grew 27% over nine years, driven by demand, international recruitment, and Workforce Plan commitments."
              series={nhsSeries}
              annotations={[]}
              yLabel="Thousands"
            />
          </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="What's improving"
            value="60,000"
            unit="more doctors by 2036/37"
            description="The NHS Long Term Workforce Plan (2023) commits to training 60,000 more doctors and 170,000 more nurses by 2036/37, with medical school places expanded by 50%. Public sector pay rises in 2024 — averaging 5.5% for NHS and 5% for teachers — aim to improve retention after years of real-terms pay falls. The civil service's Places for Growth programme is redistributing 22,000 roles out of London to improve regional representation and reduce London-weighting costs."
            source="Source: NHS England Long Term Workforce Plan 2023 · Cabinet Office Civil Service Statistics 2024."
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
