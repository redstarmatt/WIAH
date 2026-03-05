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

interface OnlineHarmsData {
  national: {
    onlineFraud: {
      timeSeries: Array<{ year: number; incidentsMillions: number }>;
      latestYear: number;
      latestMillions: number;
      pctOfAllCrime: number;
    };
    csam: {
      timeSeries: Array<{ year: number; reportsThousands: number }>;
      latestYear: number;
      latestThousands: number;
    };
    byCrimeType: Array<{ crimeType: string; incidentsThousands: number }>;
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

export default function OnlineHarmsPage() {
  const [data, setData] = useState<OnlineHarmsData | null>(null);

  useEffect(() => {
    fetch('/data/online-harms/online_harms.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const fraudSeries: Series[] = data
    ? [{
        id: 'fraud',
        label: 'Incidents (millions)',
        colour: '#0D1117',
        data: data.national.onlineFraud.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.incidentsMillions,
        })),
      }]
    : [];

  const csamSeries: Series[] = data
    ? [{
        id: 'csam',
        label: 'Reports (thousands)',
        colour: '#0D1117',
        data: data.national.csam.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.reportsThousands,
        })),
      }]
    : [];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Online Harms" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Online Harms"
          question="How Safe Are People Online in Britain?"
          finding="Online fraud accounts for 41% of all crime in England and Wales &mdash; 3.8 million incidents per year. Reports of child sexual abuse material online reached 1.2 million in 2023. Cybercrime costs the UK economy &pound;27 billion per year. The Online Safety Act 2023 represents the most significant attempt to regulate internet platforms in British history."
          colour="#0D1117"
          preposition="in"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Online fraud is the single largest category of crime in England and Wales, accounting for 41% of all recorded offences &mdash; 3.8 million incidents per year, dwarfing knife crime, burglary, and vehicle theft combined. Only 17% of victims contact Action Fraud, so the true scale is almost certainly higher. The Internet Watch Foundation processed 1.2 million reports of child sexual abuse material (CSAM) in 2023, more than double the 500,000 in 2018, with AI-generated imagery proliferating rapidly since 2022. Cybercrime costs the UK economy an estimated &pound;27 billion per year. Authorised push payment scams &mdash; where victims are manipulated into transferring money directly to fraudsters &mdash; accounted for 40% of banking fraud by value in 2023. The Online Safety Act 2023 is the first systematic attempt to hold platforms legally accountable: Ofcom can fine non-compliant operators up to &pound;18 million or 10% of global turnover; mandatory risk assessments and 24-hour content removal requirements now apply to social media and search. The Payment Systems Regulator&apos;s mandatory reimbursement scheme, launched October 2024, requires banks to refund APP fraud victims up to &pound;85,000.</p>
            <p>The burden falls heaviest on the most vulnerable. Over-65s lose the most per fraud incident &mdash; an average &pound;3,500 per case &mdash; while 18&ndash;34-year-olds face the highest volume of attacks through social media and marketplace scams. Women account for 72&percnt; of romance fraud victims and the majority of image-based sexual abuse cases. Fewer than 1&percnt; of fraud cases result in a charge; Action Fraud was so widely criticised for losing reports that it is being replaced in 2025. The structural gap is institutional: fraud sits across the National Crime Agency, City of London Police, local forces, and banks, with no single body owning the problem end to end.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-fraud', label: 'Online Fraud' },
          { id: 'sec-csam', label: 'Child Safety' },
          { id: 'sec-types', label: 'By Crime Type' },
        ]} />

        <ScrollReveal>
          <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Online fraud incidents per year (England &amp; Wales)"
              value="3.8M"
              direction="up"
              polarity="up-is-bad"
              changeText="2023 &middot; 41% of all crime &middot; Only 17% reported to police &middot; Costs economy &pound;27bn per year"
              sparklineData={[2.5, 2.8, 3.0, 3.3, 3.8, 3.7, 3.8]}
              href="#sec-overview"/>
            <MetricCard
              label="Child sexual abuse image reports (IWF)"
              value="1.2M"
              direction="up"
              polarity="up-is-bad"
              changeText="2023 &middot; Up 140% since 2018 &middot; AI-generated content growing concern &middot; Online Safety Act: mandatory removal within 24 hours"
              sparklineData={[500, 650, 780, 900, 1050, 1200]}
              href="#sec-fraud"/>
            <MetricCard
              label="Cybercrime cost to UK economy"
              value="&pound;27bn"
              direction="up"
              polarity="up-is-bad"
              changeText="Annual &middot; DCMS estimate &middot; Online Safety Act 2023: &pound;78K/day fines &middot; Ofcom powers to fine up to 10% of global turnover"
              sparklineData={[18, 19, 20, 22, 24, 25, 27]}
              href="#sec-csam"/>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-fraud" className="mb-12">
            <LineChart
              title="Online fraud incidents, England &amp; Wales, 2017&ndash;2023"
              subtitle="Crimes including online banking fraud, shopping fraud, romance fraud, and investment scams, from ONS Crime Survey for England and Wales."
              series={fraudSeries}
              yLabel="Incidents (millions)"
              source={{
                name: 'ONS',
                dataset: 'Crime Survey for England and Wales — Fraud and Cybercrime',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-csam" className="mb-12">
            <LineChart
              title="Child sexual abuse material reports to IWF, 2018&ndash;2023"
              subtitle="Reported instances of child sexual abuse material (CSAM), including AI-generated content, submitted to the Internet Watch Foundation."
              series={csamSeries}
              yLabel="Reports (thousands)"
              source={{
                name: 'Internet Watch Foundation',
                dataset: 'Annual Report',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-types" className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-2">Online fraud by type, England &amp; Wales, 2023 (estimated incidents, thousands)</h2>
            <p className="text-sm text-wiah-mid font-mono mb-6">Breakdown of online fraud incidents by type, estimated from ONS Crime Survey and Action Fraud reporting.</p>
            {data && (
              <div className="space-y-3">
                {data.national.byCrimeType.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-40 text-sm text-wiah-black flex-shrink-0">{item.crimeType}</div>
                    <div className="flex-1 bg-wiah-border rounded h-5 overflow-hidden">
                      <div
                        className="h-full rounded"
                        style={{ width: `${(item.incidentsThousands / 1100) * 100}%`, backgroundColor: '#0D1117' }}
                      />
                    </div>
                    <div className="w-20 text-right text-sm font-mono text-wiah-black">{item.incidentsThousands.toLocaleString()}K</div>
                  </div>
                ))}
              </div>
            )}
            <p className="font-mono text-xs text-wiah-mid mt-4">Source: ONS Crime Survey for England and Wales; Action Fraud reporting</p>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="What&apos;s improving"
            value="Online Safety Act"
            unit="2023 &mdash; the first law to hold social media platforms legally responsible for harmful content"
            description="The Online Safety Act 2023, which received Royal Assent in October, is the world&apos;s most comprehensive internet regulation. It places a duty of care on social media platforms, search engines, and online services to protect users &mdash; especially children &mdash; from harmful content. Ofcom can fine companies up to &pound;18 million or 10% of global annual turnover (whichever is higher) for non-compliance. Platforms must carry out risk assessments for illegal content and remove it within 24 hours. The Act makes it a criminal offence for senior managers of non-compliant companies to knowingly fail in their obligations. AI-generated child sexual abuse images are explicitly criminalised."
            source="Source: ONS &mdash; Crime Survey England and Wales 2022/23; IWF &mdash; Annual Report 2023; Ofcom &mdash; Online Safety Act Implementation 2024."
          />
        </ScrollReveal>

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
