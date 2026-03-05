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
          label: 'Legal aid expenditure (&pound;bn, 2010 prices)',
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
          question="Is Justice Still Available to Those Who Can&apos;t Afford a Lawyer?"
          finding="Legal aid spending fell 36&percnt; in real terms between 2010 and 2024. The number of solicitor firms holding legal aid contracts halved from 2,300 to around 1,150 &mdash; creating legal aid deserts where 1 in 4 English local authority areas has no solicitor offering legally aided services within a reasonable distance. Those without money increasingly face the courts alone."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              The Legal Aid, Sentencing and Punishment of Offenders Act 2012 (LASPO) removed whole categories of civil law from legal aid scope &mdash; most private family law, employment law, housing law (save serious disrepair or homelessness), welfare benefits, and clinical negligence for under-2-year-olds &mdash; with the Ministry of Justice estimating annual savings of &pound;300 million. Criminal legal aid fee rates were frozen from 2011; the 15&percnt; increase in 2023 was the first in 12 years, by which point Law Society analysis found solicitors earning less in real terms than their 2001 equivalents. The number of firms holding legal aid contracts fell from approximately 2,300 in 2010 to around 1,150 by 2024, a 50&percnt; collapse as medium-sized high street practices &mdash; once the backbone of provision &mdash; exited the market. By 2024, 1 in 4 English local authority areas had no housing legal aid provider within a reasonable distance, with equally severe deserts in immigration (35&percnt; of areas), family law (28&percnt;), and crime.
            </p>
            <p>
              The inequality in access to justice is visible in court statistics. The proportion of family court hearings where at least one party is unrepresented has grown from around 20&percnt; in 2011 to over 45&percnt; by 2023. Unrepresented defendants in employment tribunals win approximately 35&percnt; of cases versus 60&percnt; for represented claimants &mdash; a gap directly attributable to legal aid withdrawal from employment law. People from ethnic minority backgrounds are disproportionately affected, being over-represented in immigration, criminal, and welfare benefit proceedings where cuts have been deepest. Legal aid deserts are concentrated in rural areas, coastal towns, and the Midlands, where private practice is least profitable and transport links make travelling to distant providers hardest.
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
              changeText="&pound;2.1bn in 2010 &rarr; &pound;1.44bn in 2024 &middot; LASPO 2012 removed whole categories"
              sparklineData={[2.1, 2.0, 1.9, 1.8, 1.7, 1.6, 1.5, 1.45]}
              source="Legal Aid Agency &middot; Legal Aid Statistics 2024"
              href="#sec-spend"/>
            <MetricCard
              label="Solicitor firms with legal aid contracts"
              value="1,150"
              direction="down"
              polarity="up-is-good"
              changeText="Down from 2,300 in 2010 &middot; 50&percnt; market collapse &middot; Rates frozen 2011&ndash;2023"
              sparklineData={[2300, 2100, 1900, 1700, 1600, 1500, 1350, 1200]}
              source="Legal Aid Agency &middot; Provider Directory 2024"
              href="#sec-firms"/>
            <MetricCard
              label="Legal aid deserts (LAs with no provision)"
              value="25%"
              direction="up"
              polarity="up-is-bad"
              changeText="1 in 4 English local authority areas &middot; Rural, coastal areas worst affected"
              sparklineData={[5, 8, 12, 15, 18, 20, 23, 25]}
              source="Law Society &middot; Legal Aid Desert Research 2024"
              href="#sec-firms"/>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="What is getting better"
            value="15%"
            unit="fee increase (2023)"
            description="The Criminal Legal Aid Review (2022) recommended a 15&percnt; fee increase for criminal defence solicitors &mdash; the first new rates in a generation, implemented in 2023. While the Law Society and criminal bar argue the increase is insufficient to prevent further market collapse, it represents the first acknowledgment in over a decade that fee rates had fallen to unsustainable levels."
            source="Ministry of Justice &middot; Criminal Legal Aid Review &middot; 2022"
          />
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-spend" className="mb-12">
            {spendSeries.length > 0 ? (
              <LineChart
                title="Legal aid expenditure, 2010&ndash;2024 (real terms, &pound;bn)"
                subtitle="Total legal aid spend in England and Wales, deflated to 2010 prices. LASPO 2012 removed whole categories from scope."
                series={spendSeries}
                yLabel="&pound;bn (2010 prices)"
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
                title="Solicitor firms holding legal aid contracts, 2010&ndash;2024"
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
