'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

// ── References ───────────────────────────────────────────────────────────────

const editorialRefs: Reference[] = [
  { num: 1, name: 'Electoral Commission', dataset: 'Political party donations and loans — quarterly returns', url: 'https://www.electoralcommission.org.uk/who-we-are-and-what-we-do/financial-reporting/donations-and-loans', date: '2025' },
  { num: 2, name: 'Office of the Registrar of Consultant Lobbyists', dataset: 'Register of Consultant Lobbyists', url: 'https://registrarofconsultantlobbyists.org.uk/', date: '2025' },
  { num: 3, name: 'Transparency International UK', dataset: 'Lobbying in the UK — estimated contacts', url: 'https://www.transparency.org.uk/', date: '2025' },
];

// ── Types ────────────────────────────────────────────────────────────────────

interface DataPoint {
  year: number;
  declarationsMillions: number;
  donorConcentration: number;
  registeredLobbyists: number;
  ministerMeetingsPct: number;
}

interface TopicData {
  national: {
    timeSeries: DataPoint[];
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

export default function TopicPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/lobbying-donations/lobbying_donations.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const chart1Series: Series[] = data
    ? [
        {
          id: 'declarationsMillions',
          label: 'Declared donations (£m)',
          colour: '#264653',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.declarationsMillions,
          })),
        },
        {
          id: 'donorConcentration',
          label: 'Top 10 donors share (%)',
          colour: '#E63946',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.donorConcentration,
          })),
        },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        {
          id: 'registeredLobbyists',
          label: 'Registered lobbyists',
          colour: '#2A9D8F',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.registeredLobbyists,
          })),
        },
        {
          id: 'ministerMeetingsPct',
          label: 'Minister meetings published (%)',
          colour: '#264653',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.ministerMeetingsPct,
          })),
        },
      ]
    : [];

  const chart1Annotations: Annotation[] = [
    { date: new Date(2019, 5, 1), label: '2019: Election year — high donations' },
    { date: new Date(2024, 5, 1), label: '2024: Election year — record peak' },
  ];

  const chart2Annotations: Annotation[] = [
    { date: new Date(2021, 5, 1), label: '2021: Greensill lobbying scandal prompts reform calls' },
  ];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Lobbying and Donations" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Democracy & Governance"
          question="Who Is Buying Access to Government?"
          finding={<>&pound;20.3 million was declared in political donations in Q4 2024.<Cite nums={1} /> The lobbying register covers fewer than 1,000 consultants while 6,000+ lobbying contacts with government occur each year.<Cite nums={[2, 3]} /></>}
          colour="#6B7280"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Political donations in the UK are legal, disclosed, and heavily concentrated. In the final quarter of 2024, parties declared £20.3 million in donations — the highest Q4 figure in a decade, inflated by a general election year. The top ten donors routinely account for over a third of total declared funding, with property, finance, and hedge fund interests disproportionately represented. The Electoral Commission publishes these figures quarterly, and the data is clear: access to senior politicians correlates with the size of donations. Dinners, receptions, and advisory boards create proximity that smaller donors and ordinary constituents cannot match.<Cite nums={1} /></p>
            <p>The lobbying picture is harder to read, by design. The statutory Register of Consultant Lobbyists covers fewer than 1,000 individuals — exclusively third-party consultants hired to lobby on behalf of clients. In-house lobbyists employed directly by corporations, trade associations, and campaign groups are entirely excluded, despite accounting for the vast majority of lobbying activity. Transparency International estimates over 6,000 lobbying contacts with government ministers and senior officials occur each year, most of which fall outside the register&apos;s scope. The Greensill scandal in 2021 prompted calls for reform, but the register&apos;s narrow legal definition remains unchanged, leaving a substantial gap between what is disclosed and what actually happens.<Cite nums={2} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-chart1', label: 'Chart 1' },
          { id: 'sec-chart2', label: 'Chart 2' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Declared political donations (Q4 2024)"
            value="£20.3m"
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText="Highest Q4 for 10 years · property and finance dominant"
            sparklineData={[12, 10, 11, 13, 14, 9, 10, 14, 16, 18, 20.3]}
            href="#sec-coverage"
          />
          <MetricCard
            label="Registered lobbyists"
            value="984"
            unit=""
            direction="up"
            polarity="up-is-good"
            changeText="Up from 392 in 2015 · but most in-house lobbyists excluded"
            sparklineData={[392, 450, 510, 580, 640, 700, 750, 800, 870, 940, 984]}
            href="#sec-coverage"
          />
          <MetricCard
            label="Unregistered lobbying contacts est."
            value="6,000+"
            unit="/year"
            direction="flat"
            polarity="up-is-bad"
            changeText="Transparency International estimate · vast majority not disclosed"
            sparklineData={[5000, 5200, 5400, 5600, 5800, 5800, 5900, 6000, 6000, 6000, 6000]}
            href="#sec-coverage"
          />
        </div>

        {/* Charts */}
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Declared UK political donations, 2015-2025"
              subtitle="Quarterly political party donations declared to the Electoral Commission (£m)."
              series={chart1Series}
              annotations={chart1Annotations}
              yLabel="Value"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Lobbying transparency, UK, 2015-2025"
              subtitle="Number of lobbyists on the statutory register vs estimated total lobbying contacts with government."
              series={chart2Series}
              annotations={chart2Annotations}
              yLabel="Value"
            />
          </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Minister meetings now routinely published"
            value="85%"
            unit="of qualifying minister meetings disclosed"
            description="Government now publishes quarterly returns of minister and senior official meetings with external organisations. Compliance has reached 85% of qualifying meetings. The Commissioner for Public Appointments oversees commercial appointments and the revolving door. The House of Lords began a new register of lobbyists in 2023."
            source="Source: Cabinet Office — Ministerial meetings data, 2025."
          />
        </ScrollReveal>

        {/* Sources */}
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

        <References items={editorialRefs} />
      </main>
    </>
  );
}
