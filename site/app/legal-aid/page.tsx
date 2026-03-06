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

interface LegalAidData {
  timeSeries: Array<{ date: string; legalAidBnReal: number; legalAidFirms: number }>;
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

export default function LegalAidPage() {
  const [data, setData] = useState<LegalAidData | null>(null);

  useEffect(() => {
    fetch('/data/legal-aid/legal_aid.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const spendSeries: Series[] = data
    ? [
        {
          id: 'legal-aid-spend',
          label: 'Legal aid expenditure (£bn, 2010 prices)',
          colour: '#E63946',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.date),
            value: d.legalAidBnReal,
          })),
        },
      ]
    : [];

  const firmsSeries: Series[] = data
    ? [
        {
          id: 'legal-aid-firms',
          label: 'Solicitor firms with legal aid contracts',
          colour: '#E63946',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.date),
            value: d.legalAidFirms,
          })),
        },
      ]
    : [];

  return (
    <>
      <TopicNav topic="Legal Aid" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Legal Aid"
          preposition="in"
          question="Is Justice Still Available to Those Who Can't Afford a Lawyer?"
          finding="Legal aid spending fell 36% in real terms between 2010 and 2024. The number of solicitor firms holding legal aid contracts halved from 2,300 to around 1,150 — creating legal aid deserts where 1 in 4 English local authority areas has no solicitor offering legally aided services within a reasonable distance. Those without money increasingly face the courts alone."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              The Legal Aid, Sentencing and Punishment of Offenders Act 2012 (LASPO) was the most significant contraction of legal aid in the system's history. The Act removed whole categories of civil law from the scope of legal aid — including most private family law, employment law, housing law (save in cases of serious disrepair or homelessness), welfare benefits, and clinical negligence for under-2-year-olds. The Ministry of Justice estimated the annual saving at approximately £300 million. In practice, the effect was to exclude millions of people from legal assistance on matters that are central to their lives: disputes with landlords, employment tribunal claims, family contact arrangements, and welfare benefit appeals. The Law Commission's 2022 review of LASPO found that the predicted savings had largely been achieved, but that the human cost was greater than anticipated — courts had become clogged with litigants in person who took longer and required more judicial intervention than legally represented parties.
            </p>
            <p>
              The market for legal aid work has contracted sharply because the fee rates paid to solicitors have not kept pace with either inflation or the cost of running a practice. Criminal legal aid fee rates were frozen from 2011, with a 15% increase in 2023 representing the first material change in 12 years. Law Society analysis found that criminal defence solicitors were earning less in real terms in 2022 than their equivalents in 2001. Under these conditions, the number of firms willing to do legal aid work has fallen from approximately 2,300 in 2010 to around 1,150 by 2024 — a 50% reduction. The firms that remain are typically either very large organisations that can cross-subsidise legal aid from private work, or small specialist firms that have structured their business around publicly funded work. Medium-sized high street practices — once the backbone of legal aid provision — have largely exited the market.
            </p>
            </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Overview' },
          { id: 'sec-spend', label: 'Legal Aid Budget' },
          { id: 'sec-firms', label: 'Provider Collapse' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Legal aid spend (real terms vs 2010)"
              value="-36%"
              direction="down"
              polarity="up-is-good"
              changeText="£2.1bn in 2010 &rarr; £1.44bn in 2024 · LASPO 2012 removed whole categories"
              sparklineData={[2.1, 2.0, 1.9, 1.8, 1.7, 1.6, 1.5, 1.45]}
              source="Legal Aid Agency · Legal Aid Statistics 2024"
              href="#sec-spend"
            />
            <MetricCard
              label="Solicitor firms with legal aid contracts"
              value="1,150"
              direction="down"
              polarity="up-is-good"
              changeText="Down from 2,300 in 2010 · 50% market collapse · Rates frozen 2011–2023"
              sparklineData={[2300, 2100, 1900, 1700, 1600, 1500, 1350, 1200]}
              source="Legal Aid Agency · Provider Directory 2024"
              href="#sec-spend"
            />
            <MetricCard
              label="Legal aid deserts (LAs with no provision)"
              value="25%"
              direction="up"
              polarity="up-is-bad"
              changeText="1 in 4 English local authority areas · Rural, coastal areas worst affected"
              sparklineData={[5, 8, 12, 15, 18, 20, 23, 25]}
              source="Law Society · Legal Aid Desert Research 2024"
              href="#sec-spend"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="What is getting better"
            value="15%"
            unit="fee increase (2023)"
            description="The Criminal Legal Aid Review (2022) recommended a 15% fee increase for criminal defence solicitors — the first new rates in a generation, implemented in 2023. While the Law Society and criminal bar argue the increase is insufficient to prevent further market collapse, it represents the first acknowledgment in over a decade that fee rates had fallen to unsustainable levels."
            source="Ministry of Justice · Criminal Legal Aid Review · 2022"
          />
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-spend" className="mb-12">
            {spendSeries.length > 0 ? (
              <LineChart
                title="Legal aid expenditure, 2010–2024 (real terms, £bn)"
                subtitle="Total legal aid spend in England and Wales, deflated to 2010 prices. LASPO 2012 removed whole categories from scope."
                series={spendSeries}
                yLabel="£bn (2010 prices)"
                source={{
                  name: 'Legal Aid Agency',
                  dataset: 'Legal Aid Statistics: England and Wales',
                  frequency: 'quarterly',
                  url: 'https://www.gov.uk/government/collections/legal-aid-statistics',
                }}
              />
            ) : (
              <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
            )}
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-firms" className="mb-12">
            {firmsSeries.length > 0 ? (
              <LineChart
                title="Solicitor firms holding legal aid contracts, 2010–2024"
                subtitle="Number of firms with at least one Legal Aid Agency contract. Halved in 14 years as fee rates made legal aid work unviable."
                series={firmsSeries}
                yLabel="Number of firms"
                source={{
                  name: 'Legal Aid Agency',
                  dataset: 'Provider Directory',
                  frequency: 'annual',
                  url: 'https://www.gov.uk/government/publications/legal-aid-agency-annual-report-and-accounts',
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
                <strong>{src.name}.</strong> <em>{src.dataset}</em>. {src.frequency} — 
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
