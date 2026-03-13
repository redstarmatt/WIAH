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
  { num: 1, name: 'CIPFA', dataset: 'Public Library Statistics 2022/23', url: 'https://www.cipfa.org/services/benchmarking/profiles/public-library-profiles', date: '2023' },
  { num: 2, name: 'DCMS', dataset: 'Taking Part Survey — Library engagement', url: 'https://www.gov.uk/government/collections/taking-part-survey', date: '2023' },
];

// ── Types ────────────────────────────────────────────────────────────────────

interface BranchPoint {
  year: number;
  branchCount: number;
}

interface VisitPoint {
  year: number;
  visitMillions: number;
}

interface IssuePoint {
  year: number;
  issuesMillions: number;
}

interface LibrariesData {
  national: {
    branches: {
      timeSeries: BranchPoint[];
      latestYear: number;
      latestCount: number;
      closuresSince2010: number;
    };
    visits: {
      timeSeries: VisitPoint[];
      latestYear: number;
      latestMillions: number;
      declinePercentage: number;
    };
    issues: {
      timeSeries: IssuePoint[];
      latestYear: number;
      latestMillions: number;
      digitalPct: number;
      declinePercentage: number;
    };
    staffing: {
      paidStaff2010: number;
      paidStaff2023: number;
      volunteers2023: number;
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

export default function LibrariesPage() {
  const [data, setData] = useState<LibrariesData | null>(null);

  useEffect(() => {
    fetch('/data/libraries/libraries.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const branchSeries: Series[] = data
    ? [{
        id: 'branches',
        label: 'Library branches',
        colour: '#6B7280',
        data: data.national.branches.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.branchCount,
        })),
      }]
    : [];

  const visitSeries: Series[] = data
    ? [{
        id: 'visits',
        label: 'Visits (millions)',
        colour: '#264653',
        data: data.national.visits.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.visitMillions,
        })),
      }]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: '2020: COVID closures' },
  ];

  return (
    <>
      <TopicNav topic="Libraries" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Libraries"
          question="Are Britain's Public Libraries Disappearing?"
          finding="England has lost over 770 library branches since 2010 — a 17% fall. Book issues have dropped 42%. But visits are recovering post-COVID, and libraries have expanded digital services. The question is whether a reimagined library can survive further council budget cuts."
          colour="#6B7280"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              England had 4,516 library branches in 2010; by 2022/23 roughly 3,000 remained — a 33% contraction in twelve years, with over 8,000 library jobs lost.<Cite nums={1} /> Real-terms local authority spending fell approximately 34% between 2009/10 and 2022/23. Total visits fell from 338 million in 2010 to a COVID-driven low of 170 million in 2020/21, recovering partially to 247 million by 2022/23; book issues dropped 42% from 302 million to 175 million, though e-books and audiobooks now account for 22% of loans.<Cite nums={1} /> Paid library staff fell from 24,000 in 2010 to 16,000 by 2022 while volunteer numbers tripled to over 60,000. In winter 2022–23, more than 2,200 libraries registered as warm spaces, illustrating how these institutions have evolved from lending rooms into front-line community infrastructure.
            </p>
            <p>Library closures fall hardest on those with fewest alternatives. Older adults lose a social lifeline; children from low-income families lose their only access to books and quiet study space; homeless people lose daytime refuge. Volunteer-run libraries cannot replicate the professional services qualified librarians delivered — structured job search support, digital skills training, ESOL classes, and mental health signposting. Councils that closed libraries to save £30,000–£80,000 per branch per year now spend more commissioning fragmented outreach services that reach fewer people.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-branches', label: 'Library branches' },
          { id: 'sec-visits', label: 'Library visits' },
          { id: 'sec-improvement', label: "What's improving" },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Library branches (England)"
              value="3,000"
              unit=""
              direction="down"
              polarity="up-is-good"
              changeText="2022/23 · Down from 3,583 in 2010 · 770+ closures · Volunteers now run 600+ branches"
              sparklineData={[3583, 3509, 3450, 3392, 3341, 3268, 3210, 3150, 3100, 3050, 3100, 3050, 3000]}
              href="#sec-branches"/>
            <MetricCard
              label="Library visits (England, millions)"
              value="247M"
              unit=""
              direction="down"
              polarity="up-is-good"
              changeText="2022/23 · Down from 338M in 2010 · COVID caused 170M low in 2020/21 · Partial recovery underway"
              sparklineData={[338, 312, 296, 280, 268, 253, 247, 220, 170, 190, 247]}
              href="#sec-visits"/>
            <MetricCard
              label="Books issued (millions)"
              value="175M"
              unit=""
              direction="down"
              polarity="up-is-good"
              changeText="2022/23 · Down 42% from 302M in 2010 · E-book loans and audiobooks growing · Digital now 22% of issues"
              sparklineData={[302, 278, 251, 233, 219, 206, 197, 185, 162, 168, 175]}
              href="#sec-improvement"/>
          </div>
        

        <ScrollReveal>
          <div id="sec-branches" className="mb-12">
            <LineChart
              title="Library branches, England, 2010–2023"
              subtitle="Steady contraction from austerity and competition from digital lending and cultural shift"
              series={branchSeries}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div id="sec-visits" className="mb-12">
            <LineChart
              title="Library visits, England, 2010–2023"
              subtitle="Historic decline reversed post-COVID, though below pre-pandemic levels"
              series={visitSeries}
              annotations={annotations}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div id="sec-improvement" className="mb-12">
            <PositiveCallout
              title="What's improving"
              value="+60K"
              unit="volunteers keeping libraries open — tripling since 2010"
              description="The number of library volunteers has tripled from around 20,000 in 2010 to more than 60,000 today, keeping hundreds of branches open that would otherwise have closed. Digital library membership and e-book loans have grown rapidly: digital issues now account for 22% of all loans, up from under 5% a decade ago. Libraries have also diversified into warm-space hubs, digital inclusion support, and NHS signposting. The British Library's digital newspaper archive is freely accessible through any library card."
              source="Source: CIPFA — Public library statistics 2022/23."
            />
          </div>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-lg font-black text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            {data?.metadata.sources.map((src, idx) => (
              <div key={idx}>
                <a href={src.url} target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">
                  {src.name} — {src.dataset}
                </a>
                <div className="text-xs text-wiah-mid">{src.frequency}</div>
              </div>
            ))}
          </div>
          <div className="text-sm text-wiah-mid mt-6">
            <p className="mb-3">
              <strong>Methodology.</strong> {data?.metadata.methodology}
            </p>
            {data?.metadata.knownIssues && data.metadata.knownIssues.length > 0 && (
              <div>
                <strong>Known issues.</strong>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  {data.metadata.knownIssues.map((issue, idx) => (
                    <li key={idx}>{issue}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
              <RelatedTopics />
      </main>
    </>
  );
}
