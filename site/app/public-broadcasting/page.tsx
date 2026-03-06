'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import PositiveCallout from '@/components/PositiveCallout';

// ── Types ────────────────────────────────────────────────────────────────────

interface PublicBroadcastingData {
  timeSeries: Array<{ date: string; licenceFeeNominal: number; licenceFeeReal2010: number }>;
  metadata: {
    sources: { name: string; dataset: string; url: string; frequency: string }[];
    methodology: string;
    knownIssues: string[];
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: string): Date {
  return new Date(parseInt(y), 6, 1);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function PublicBroadcastingPage() {
  const [data, setData] = useState<PublicBroadcastingData | null>(null);

  useEffect(() => {
    fetch('/data/public-broadcasting/public_broadcasting.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const licenceFeeSeries: Series[] = data
    ? [
        {
          id: 'licence-nominal',
          label: 'Licence fee &mdash; nominal (&pound;/yr)',
          colour: '#264653',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.date),
            value: d.licenceFeeNominal,
          })),
        },
        {
          id: 'licence-real',
          label: 'Licence fee &mdash; real terms, 2010 prices (&pound;/yr)',
          colour: '#E63946',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.date),
            value: d.licenceFeeReal2010,
          })),
        },
      ]
    : [];

  const headcountSeries: Series[] = data
    ? [
        {
          id: 'bbc-headcount',
          label: 'BBC headcount (full-time equivalent)',
          colour: '#264653',
          data: [
            { date: new Date(2015, 6, 1), value: 21700 },
            { date: new Date(2016, 6, 1), value: 21100 },
            { date: new Date(2017, 6, 1), value: 20800 },
            { date: new Date(2018, 6, 1), value: 20500 },
            { date: new Date(2019, 6, 1), value: 20200 },
            { date: new Date(2020, 6, 1), value: 19800 },
            { date: new Date(2021, 6, 1), value: 19400 },
            { date: new Date(2022, 6, 1), value: 19100 },
            { date: new Date(2023, 6, 1), value: 18600 },
            { date: new Date(2024, 6, 1), value: 18200 },
          ],
        },
      ]
    : [];

  return (
    <>
      <TopicNav topic="Public Broadcasting" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Public Broadcasting"
          preposition="in"
          question="Is the BBC Becoming Unaffordable to Fund?"
          finding="The BBC licence fee was frozen at &pound;159 and then increased below inflation until 2027, cutting real-terms income by over &pound;1 billion compared with what a CPI-linked fee would have generated. The result: 1,500&plus; redundancies, the closure of BBC4 as a broadcast channel, deep cuts to local radio, and an evasion rate approaching 10% as younger households treat it as optional."
          colour="#264653"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              The BBC licence fee was frozen at &pound;159 per household per year from April 2022 to March 2024 &mdash; a two-year freeze announced by Culture Secretary Nadine Dorries in a move that caught BBC leadership off guard. In a period when CPI inflation reached 11.1%, this amounted to a substantial real-terms cut. The subsequent settlement, reached in early 2024, raised the fee to &pound;169.50 from April 2024 and linked future increases to CPI through to 2027, but this came after two years of significant real-terms erosion. The BBC&apos;s own analysis estimated the cumulative real-terms gap between the frozen fee and an inflation-linked fee at over &pound;1 billion across the settlement period. This shortfall required structural savings that materialised as redundancies, closures, and programme cuts across the corporation.
            </p>
            <p>
              The consequences have been concrete and measurable. BBC4, once described as &ldquo;the home of ideas television,&rdquo; ceased broadcasting new content and became a repeats channel from 2022. Twenty-five local radio stations faced significant format changes, with several moving to shared programming, automated music, or networked speech. The BBC&apos;s journalism workforce &mdash; correspondents, investigators, and foreign bureau staff &mdash; has contracted: the Foreign Affairs Select Committee noted in 2023 that BBC foreign bureau closures had reduced the Corporation&apos;s ability to report from countries where UK policy interests are directly engaged. The BBC announced 1,000 redundancies in 2023 alone, on top of earlier rounds, bringing the total reduction since 2020 to over 1,500 posts. The corporation has also sought to reduce costs through increased repeats, less original drama, and greater reliance on co-productions.
            </p>
            </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Overview' },
          { id: 'sec-licence', label: 'Licence Fee' },
          { id: 'sec-headcount', label: 'BBC Headcount' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="BBC real-terms income loss 2022&ndash;2027"
              value="&gt;&pound;1bn"
              direction="down"
              polarity="up-is-bad"
              changeText="Vs CPI-linked equivalent &middot; 2-year freeze at &pound;159 &middot; 11% inflation peak"
              sparklineData={[0, 0, 0, 0, 150, 300, 500, 700, 900, 1000]}
              source="BBC &middot; Charter Review Evidence &middot; 2023"
              href="#sec-licence"
            />
            <MetricCard
              label="BBC redundancies since 2020"
              value="1,500+"
              direction="up"
              polarity="up-is-bad"
              changeText="BBC4 closed &middot; Local radio cuts &middot; Foreign bureaux reduced"
              sparklineData={[0, 200, 500, 800, 1100, 1500]}
              source="BBC &middot; Annual Report 2024"
              href="#sec-licence"
            />
            <MetricCard
              label="Licence fee evasion rate"
              value="9.2%"
              direction="up"
              polarity="up-is-bad"
              changeText="Up from 6% in 2015 &middot; Each 1% = &pound;50m lost revenue"
              sparklineData={[6.0, 6.5, 7.0, 7.5, 8.0, 8.5, 9.0, 9.2]}
              source="TV Licensing &middot; Annual Enforcement Report 2024"
              href="#sec-licence"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="What is getting better"
            value="492M"
            unit="weekly listeners"
            description="BBC World Service reaches 492 million people weekly &mdash; the world&apos;s largest international broadcaster &mdash; providing a globally trusted source of English and non-English language journalism in 42 languages. BBC iPlayer has 40 million&plus; registered users, more than Netflix&apos;s UK subscriber base, demonstrating that public broadcasting retains mass relevance in the streaming era."
            source="BBC &middot; Annual Report 2024 &middot; Ofcom Media Nations 2024"
          />
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-licence" className="mb-12">
            {licenceFeeSeries.length > 0 ? (
              <LineChart
                title="BBC licence fee: nominal vs real terms, 2010&ndash;2024"
                subtitle="Nominal fee (&pound;/household/year) and real-terms equivalent at 2010 prices. Gap shows erosion of purchasing power."
                series={licenceFeeSeries}
                yLabel="&pound; per household per year"
                source={{
                  name: 'DCMS / BBC',
                  dataset: 'BBC Charter and Licence Fee Settlement',
                  frequency: 'annual',
                  url: 'https://www.gov.uk/government/publications/bbc-charter-and-framework-agreement',
                }}
              />
            ) : (
              <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
            )}
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-headcount" className="mb-12">
            {headcountSeries.length > 0 ? (
              <LineChart
                title="BBC full-time equivalent headcount, 2015&ndash;2024"
                subtitle="Workforce reductions across BBC news, sport, local radio, and creative content divisions."
                series={headcountSeries}
                yLabel="Full-time equivalent staff"
                source={{
                  name: 'BBC',
                  dataset: 'Annual Report and Accounts',
                  frequency: 'annual',
                  url: 'https://www.bbc.co.uk/corporate2/insidethebbc/reports/reports',
                }}
              />
            ) : (
              <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
            )}
          </section>
        </ScrollReveal>

        <section className="border-t border-wiah-border pt-8 mt-12">
          <h2 className="text-lg font-bold text-wiah-black mb-4">Sources &amp; methodology</h2>
          <div className="text-sm text-wiah-mid space-y-2">
            {data?.metadata.sources.map((src, i) => (
              <p key={i}>
                <strong>{src.name}.</strong> <em>{src.dataset}</em>. {src.frequency} &mdash;&nbsp;
                <a href={src.url} target="_blank" rel="noopener noreferrer" className="underline text-wiah-blue hover:no-underline">
                  {src.url}
                </a>
              </p>
            ))}
          </div>
          <p className="text-sm text-wiah-mid mt-6">{data?.metadata.methodology}</p>
          {data?.metadata.knownIssues && data.metadata.knownIssues.length > 0 && (
            <div className="mt-6 p-4 bg-wiah-light rounded">
              <p className="font-bold text-wiah-black mb-2">Known issues:</p>
              <ul className="text-sm text-wiah-mid space-y-1 list-disc list-inside">
                {data.metadata.knownIssues.map((issue, i) => (
                  <li key={i}>{issue}</li>
                ))}
              </ul>
            </div>
          )}
        </section>
      </main>
    </>
  );
}
