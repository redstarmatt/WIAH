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
          finding="Legal aid spending fell 36% in real terms between 2010 and 2024. The number of solicitor firms holding legal aid contracts halved from 2,300 to around 1,150 &mdash; creating legal aid deserts where 1 in 4 English local authority areas has no solicitor offering legally aided services within a reasonable distance. Those without money increasingly face the courts alone."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              The Legal Aid, Sentencing and Punishment of Offenders Act 2012 (LASPO) was the most significant contraction of legal aid in the system&apos;s history. The Act removed whole categories of civil law from the scope of legal aid &mdash; including most private family law, employment law, housing law (save in cases of serious disrepair or homelessness), welfare benefits, and clinical negligence for under-2-year-olds. The Ministry of Justice estimated the annual saving at approximately &pound;300 million. In practice, the effect was to exclude millions of people from legal assistance on matters that are central to their lives: disputes with landlords, employment tribunal claims, family contact arrangements, and welfare benefit appeals. The Law Commission&apos;s 2022 review of LASPO found that the predicted savings had largely been achieved, but that the human cost was greater than anticipated &mdash; courts had become clogged with litigants in person who took longer and required more judicial intervention than legally represented parties.
            </p>
            <p>
              The market for legal aid work has contracted sharply because the fee rates paid to solicitors have not kept pace with either inflation or the cost of running a practice. Criminal legal aid fee rates were frozen from 2011, with a 15% increase in 2023 representing the first material change in 12 years. Law Society analysis found that criminal defence solicitors were earning less in real terms in 2022 than their equivalents in 2001. Under these conditions, the number of firms willing to do legal aid work has fallen from approximately 2,300 in 2010 to around 1,150 by 2024 &mdash; a 50% reduction. The firms that remain are typically either very large organisations that can cross-subsidise legal aid from private work, or small specialist firms that have structured their business around publicly funded work. Medium-sized high street practices &mdash; once the backbone of legal aid provision &mdash; have largely exited the market.
            </p>
            <p>
              The consequence is the emergence of legal aid deserts: large geographic areas where no solicitor holds a contract to provide legally aided services. The Law Society publishes annual legal aid desert maps for specific specialisms; as of 2024, 1 in 4 local authority areas in England has no housing legal aid provider within a reasonable distance; the position is equally or worse for immigration and asylum law (35% of areas without provision), family law (28%), and crime. Legal aid deserts are concentrated in rural areas, coastal towns, and the Midlands &mdash; the areas where private legal practice is least profitable and where transport links make travel to distant providers difficult. A person in Penzance, Berwick-upon-Tweed, or rural Lincolnshire who needs a legally aided solicitor for a welfare benefit appeal may face a round trip of several hours, or may simply give up.
            </p>
            <p>
              The inequality in access to justice is visible in the court statistics. The proportion of court hearings in which one or both parties are unrepresented (litigants in person) has grown from approximately 20% in 2011 to over 45% of family court hearings by 2023. Unrepresented litigants are disproportionately those facing domestic abuse allegations, debt proceedings, housing possession actions, and immigration decisions &mdash; exactly the cases where the stakes are highest and the legal complexity is greatest. Research by the Law Society found that unrepresented defendants in employment tribunals win approximately 35% of cases, compared with 60% for represented claimants &mdash; a 25 percentage point gap that is directly attributable to the withdrawal of legal aid from employment law. People from ethnic minority backgrounds are disproportionately affected: they are over-represented in immigration, criminal, and welfare benefit proceedings where legal aid cuts have been deepest.
            </p>
            <p>
              Measuring the state of legal aid is complicated by the LASPO-driven scope changes that make expenditure comparisons before and after 2013 imprecise. Some of the apparent decline in spending reflects the removal of entire areas of law from scope rather than cuts to rates for work that continues to be funded &mdash; though both effects are real and cumulative. The desert mapping methodology used by the Law Society has evolved over time and uses different distance thresholds for different specialisms. Some areas classified as deserts are served by legal advice charities and Citizens Advice Bureaux that are not counted in the solicitor directory; these organisations provide some assistance but typically cannot take cases to court, leaving the most serious legal problems unresolved. The backlog of cases in the civil courts &mdash; nearly 2 million outstanding cases as of 2024 &mdash; means that even where legal aid is available, justice is frequently delayed by years.
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
              onExpand={() => {}}
            />
            <MetricCard
              label="Solicitor firms with legal aid contracts"
              value="1,150"
              direction="down"
              polarity="up-is-good"
              changeText="Down from 2,300 in 2010 &middot; 50% market collapse &middot; Rates frozen 2011&ndash;2023"
              sparklineData={[2300, 2100, 1900, 1700, 1600, 1500, 1350, 1200]}
              source="Legal Aid Agency &middot; Provider Directory 2024"
              onExpand={() => {}}
            />
            <MetricCard
              label="Legal aid deserts (LAs with no provision)"
              value="25%"
              direction="up"
              polarity="up-is-bad"
              changeText="1 in 4 English local authority areas &middot; Rural, coastal areas worst affected"
              sparklineData={[5, 8, 12, 15, 18, 20, 23, 25]}
              source="Law Society &middot; Legal Aid Desert Research 2024"
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="What is getting better"
            value="15%"
            unit="fee increase (2023)"
            description="The Criminal Legal Aid Review (2022) recommended a 15% fee increase for criminal defence solicitors &mdash; the first new rates in a generation, implemented in 2023. While the Law Society and criminal bar argue the increase is insufficient to prevent further market collapse, it represents the first acknowledgment in over a decade that fee rates had fallen to unsustainable levels."
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
