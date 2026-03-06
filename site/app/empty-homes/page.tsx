'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';

// ── Types ────────────────────────────────────────────────────────────────────

interface EmptyHomesData {
  national: {
    longTermEmpty: {
      timeSeries: Array<{ year: number; thousandsEmpty: number }>;
    };
    allEmpty: {
      timeSeries: Array<{ year: number; thousandsEmpty: number }>;
    };
  };
  metadata: {
    sources: Array<{ name: string; dataset: string; url: string; frequency: string }>;
    methodology: string;
    knownIssues: string[];
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function EmptyHomesPage() {
  const [data, setData] = useState<EmptyHomesData | null>(null);

  useEffect(() => {
    fetch('/data/empty-homes/empty_homes.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const longTermSeries: Series[] = data
    ? [{
        id: 'long-term-empty',
        label: 'Long-term empty homes (thousands)',
        colour: '#F4A261',
        data: data.national.longTermEmpty.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.thousandsEmpty,
        })),
      }]
    : [];

  const allEmptySeries: Series[] = data
    ? [{
        id: 'all-empty',
        label: 'All empty homes (thousands)',
        colour: '#E63946',
        data: data.national.allEmpty.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.thousandsEmpty,
        })),
      }]
    : [];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Empty Homes" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Empty Homes"
          question="Why Are 700,000 Homes Sitting Empty in a Housing Crisis?"
          finding="England has approximately 700,000 empty properties — enough to house every person on a local authority waiting list. Long-term vacancies have risen every year since 2016 while 1.3 million households wait for social housing. Council tax premiums on empty homes remain weakly enforced and unevenly applied."
          colour="#F4A261"
          preposition="with"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>England has roughly 700,000 empty dwellings, of which approximately 261,000 have been vacant for over six months — the standard definition of &ldquo;long-term empty.&rdquo; The total figure is comparable to the entire housing stock of Greater Manchester. These properties span every region and tenure: derelict Victorian terraces in post-industrial towns, buy-to-leave investment flats in central London, probate properties awaiting sale, and homes abandoned after compulsory purchase orders stalled. DLUHC's council tax base data shows long-term empties rising from 205,000 in 2016 to 261,000 in 2024, a 27% increase over eight years. The broader count of all empty homes — including short-term vacancies between lettings and sales — exceeds 700,000, a figure that has climbed every year since 2017.</p>
            <p>The trend is running in the wrong direction at precisely the wrong time. England's social housing waiting list stands at 1.3 million households, and the government's own assessment identifies a need for 300,000 new homes per year — a target consistently missed since it was first announced. Meanwhile, rough sleeping has risen 27% since 2022 and temporary accommodation costs local authorities over £1.7 billion per year. The Levelling Up and Regeneration Act 2023 gave councils the power to charge up to a 300% council tax premium on homes empty for more than one year, and up to 100% on second homes. However, implementation is patchy: many councils have not adopted the full premium, and enforcement relies on self-declaration through council tax records, a system widely acknowledged to undercount true vacancies.</p>
            </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-long-term', label: 'Long-term Empty' },
          { id: 'sec-all-empty', label: 'All Vacancies' },
        ]} />

        <ScrollReveal>
          <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Total empty homes in England"
              value="700K"
              direction="up"
              polarity="up-is-bad"
              changeText="2024 · Equivalent to housing stock of Greater Manchester · Rising every year since 2017"
              sparklineData={[590, 605, 617, 630, 648, 665, 678, 689, 700]}
              href="#sec-long-term"
            />
            <MetricCard
              label="Long-term empty (6+ months)"
              value="261K"
              direction="up"
              polarity="up-is-bad"
              changeText="2024 · Up 27% since 2016 · Burnley, Hyndburn, Blackpool worst-affected · 31K in London alone"
              sparklineData={[205, 210, 216, 225, 232, 245, 250, 258, 261]}
              href="#sec-long-term"
            />
            <MetricCard
              label="Social housing waiting list"
              value="1.3M"
              direction="up"
              polarity="up-is-bad"
              changeText="Households · 2024 · Empty homes could theoretically house every household on the list"
              sparklineData={[1.16, 1.18, 1.20, 1.22, 1.26, 1.28, 1.29, 1.30]}
              href="#sec-long-term"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-long-term" className="mb-12">
            <LineChart
              title="Long-term empty homes, England, 2015–2024"
              subtitle="Properties vacant and substantially unfurnished for over six months (thousands)."
              series={longTermSeries}
              yLabel="Thousands"
              source={{
                name: 'DLUHC',
                dataset: 'Council Tax Base (CTB1)',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-all-empty" className="mb-12">
            <LineChart
              title="All empty homes, England, 2015–2024"
              subtitle="Total vacant dwellings including short-term vacancies between lettings and sales (thousands)."
              series={allEmptySeries}
              yLabel="Thousands"
              source={{
                name: 'DLUHC',
                dataset: 'Council Tax Base (CTB1)',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="What could be done"
            value="10,700"
            unit="empty homes returned to use under the Empty Homes Programme (2012–15)"
            description="The Empty Homes Programme demonstrated that targeted grants of £7,500–£15,000 per property could bring long-term vacancies back into use at a fraction of new-build costs. The Levelling Up and Regeneration Act 2023 empowers councils to charge 300% council tax premiums on long-term empty homes. Community-led housing groups have successfully converted empty properties in Liverpool, Leeds, and Bristol. The National Empty Homes Network estimates that £150 million of investment could return 20,000 properties to use within three years."
            source="Source: DLUHC — Council Tax Base 2024; Homes England — Empty Homes Programme Evaluation 2015."
          />
        </ScrollReveal>

        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
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
      </main>
    </>
  );
}
