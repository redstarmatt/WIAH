'use client'

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';

// ── Types ────────────────────────────────────────────────────────────────────

interface JudicialDiversityData {
  womenJudges: Array<{ year: number; pct: number }>;
  ethnicMinorityJudges: Array<{ year: number; pct: number }>;
  byCourtLevel: Array<{ level: string; pctWomen: number; pctEthnicMinority: number }>;
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

export default function JudicialDiversityPage() {
  const [data, setData] = useState<JudicialDiversityData | null>(null);

  useEffect(() => {
    fetch('/data/judicial-diversity/judicial_diversity.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const womenSeries: Series[] = data
    ? [{
        id: 'women-judges',
        label: 'Women judges',
        colour: '#6B7280',
        data: data.womenJudges.map(d => ({
          date: yearToDate(d.year),
          value: d.pct,
        })),
      }]
    : [];

  const ethnicMinoritySeries: Series[] = data
    ? [{
        id: 'ethnic-minority-judges',
        label: 'Ethnic minority judges',
        colour: '#264653',
        data: data.ethnicMinorityJudges.map(d => ({
          date: yearToDate(d.year),
          value: d.pct,
        })),
      }]
    : [];

  return (
    <>
      <TopicNav topic="Judicial Diversity" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Judicial Diversity"
          question="Who Sits in Judgement?"
          finding="Women make up 35&percnt; of judges in England and Wales but just 28&percnt; of Court of Appeal judges. Ethnic minority representation stands at 9.8&percnt; overall &mdash; in a country where 18&percnt; of the population identifies as non-white. At the Supreme Court, no judge has ever been from an ethnic minority background."
          colour="#6B7280"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              The judiciary of England and Wales has diversified slowly but unevenly. Women now constitute 35.4&percnt; of all judges, up from 25.2&percnt; in 2015 &mdash; a meaningful improvement driven partly by the Judicial Appointments Commission&apos;s (JAC) equal merit provision, which allows a candidate from an under-represented group to be appointed when two candidates are assessed as equally meritorious. Ethnic minority judges account for 9.8&percnt; of the bench, up from 6.1&percnt; in 2015. These aggregate figures, however, mask a stark pyramid: diversity is concentrated in the lower tiers. Tribunal judges are 46&percnt; female and 14&percnt; ethnic minority; at the Court of Appeal, those figures drop to 28&percnt; and 6&percnt; respectively. The Supreme Court has never had a non-white justice in its history.
            </p>
            <p>
              The pipeline explains the pattern. Senior judicial appointments are drawn overwhelmingly from the barristers&apos; branch of the legal profession, where women represent 39&percnt; of practising barristers and ethnic minorities 16&percnt;. But the problem compounds at each career stage: women leave the Bar at higher rates than men after 10&ndash;15 years of practice (the critical period for building a judicial-appointment profile), in large part because of the incompatibility between self-employed barristers&apos; working patterns and caring responsibilities. Of the KC (King&apos;s Counsel) appointments in 2023, 37&percnt; were women and 14&percnt; ethnic minority &mdash; both record highs, but still below population parity. Since KC status is the primary gateway to the senior judiciary, the current composition of KCs predicts the composition of high court judges for the next 15&ndash;20 years.
            </p>
            <p>
              Policy levers have been cautious. The Constitutional Reform Act 2005 established the JAC to select judges on merit through fair and open competition, replacing the Lord Chancellor&apos;s patronage system. The JAC&apos;s equal merit provision has been applied in around 30&percnt; of appointments since 2013, contributing measurably to female representation at district judge level. The government rejected the 2020 recommendation from the House of Lords Constitution Committee to set statutory diversity targets, arguing that targets would compromise public confidence in merit-based appointment. The Judicial Diversity Forum, a voluntary coalition of the Bar Council, Law Society, JAC, and judiciary, publishes annual action plans but has no enforcement mechanism. The 2023 action plan committed to mentoring programmes, outreach to solicitor-advocates (who are more diverse than barristers), and data collection improvements &mdash; but critics note the same commitments have appeared in successive plans since 2017.
            </p>
            <p>
              Socioeconomic background is arguably the most important axis of judicial homogeneity, yet it is the least measured. The Sutton Trust estimated in 2019 that 65&percnt; of senior judges attended independent schools, compared with 7&percnt; of the population &mdash; making the judiciary one of the most privately-educated professions in the country. Oxford and Cambridge alumni account for approximately 75&percnt; of Supreme Court and Court of Appeal judges. Disability is recorded with a non-declaration rate above 30&percnt;, rendering published figures unreliable. The intersection of ethnicity and gender reveals compounding disadvantage: ethnic minority women constitute just 3.2&percnt; of judges, despite being approximately 9&percnt; of the population. Geographic diversity is unexamined in official statistics, though analysis of judicial addresses suggests concentration in London and the South East.
            </p>
            <p>
              The Ministry of Justice&apos;s annual Diversity of the Judiciary statistical bulletin is the primary data source, but it has significant limitations. Ethnicity and disability data depend on self-declaration, and non-declaration rates of 10&ndash;15&percnt; for ethnicity and above 30&percnt; for disability introduce considerable uncertainty &mdash; it is impossible to know whether non-declarers are disproportionately from one group. The statistics count judges in post, not judicial sitting days, meaning part-time judges (who are more likely to be female) are counted equally with full-time judges. Magistrates &mdash; who are unpaid and handle 90&percnt; of criminal cases &mdash; are included in headline diversity figures, which inflates aggregate female representation since magistrates are 57&percnt; women. Excluding magistrates would drop the overall female share below 30&percnt;. Socioeconomic background data is not collected at all by the MOJ, meaning the most consequential diversity gap cannot be monitored through official channels.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Overview' },
          { id: 'sec-gender', label: 'Gender' },
          { id: 'sec-ethnicity', label: 'Ethnicity' },
          { id: 'sec-court-level', label: 'By Court Level' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Women judges (all courts)"
              value="35.4%"
              direction="up"
              polarity="up-is-good"
              changeText="Up from 25.2&percnt; in 2015 &middot; But just 28&percnt; at Court of Appeal"
              sparklineData={[25.2, 26.8, 28.4, 29.5, 31.0, 32.1, 33.6, 34.8, 35.4]}
              source="MOJ &middot; Judicial Diversity Statistics 2023"
              onExpand={() => {}}
            />
            <MetricCard
              label="Ethnic minority judges"
              value="9.8%"
              direction="up"
              polarity="up-is-good"
              changeText="Population: 18&percnt; non-white &middot; 0 ethnic minority Supreme Court justices ever"
              sparklineData={[6.1, 6.4, 6.9, 7.3, 7.6, 8.0, 8.5, 9.1, 9.8]}
              source="MOJ &middot; Judicial Diversity Statistics 2023"
              onExpand={() => {}}
            />
            <MetricCard
              label="Senior judges from private schools"
              value="65%"
              direction="flat"
              polarity="up-is-bad"
              changeText="vs 7&percnt; of population &middot; 75&percnt; Oxbridge-educated at top courts"
              sparklineData={[68, 67, 66, 66, 65, 65, 65]}
              source="Sutton Trust &middot; Elitist Britain 2019"
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-gender" className="mb-12">
            {womenSeries.length > 0 ? (
              <LineChart
                title="Women as a share of all judges, England &amp; Wales, 2015&ndash;2023"
                subtitle="Percentage of judges in post who are women. Includes all tiers from magistrates to Supreme Court."
                series={womenSeries}
                yLabel="Percentage (%)"
                source={{
                  name: 'MOJ',
                  dataset: 'Diversity of the Judiciary Statistics',
                  frequency: 'annual',
                  url: 'https://www.gov.uk/government/statistics/diversity-of-the-judiciary-2023-statistics',
                }}
              />
            ) : (
              <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
            )}
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-ethnicity" className="mb-12">
            {ethnicMinoritySeries.length > 0 ? (
              <LineChart
                title="Ethnic minority judges, England &amp; Wales, 2015&ndash;2023"
                subtitle="Percentage of judges who self-declare as ethnic minority. Non-declaration rate of 10&ndash;15&percnt; means true figure may be higher."
                series={ethnicMinoritySeries}
                yLabel="Percentage (%)"
                source={{
                  name: 'MOJ',
                  dataset: 'Diversity of the Judiciary Statistics',
                  frequency: 'annual',
                  url: 'https://www.gov.uk/government/statistics/diversity-of-the-judiciary-2023-statistics',
                }}
              />
            ) : (
              <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
            )}
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-court-level" className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-2">Diversity by court level, 2023</h2>
            <p className="text-sm text-wiah-mid font-mono mb-6">Women and ethnic minority representation varies sharply by seniority.</p>
            {data && (
              <div className="space-y-4">
                {data.byCourtLevel.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-36 text-sm text-wiah-black flex-shrink-0">{item.level}</div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <div className="w-12 text-xs font-mono text-wiah-mid text-right">Women</div>
                        <div className="flex-1 bg-wiah-border rounded h-4 overflow-hidden">
                          <div
                            className="h-full rounded"
                            style={{ width: `${(item.pctWomen / 60) * 100}%`, backgroundColor: '#6B7280' }}
                          />
                        </div>
                        <div className="w-10 text-right text-xs font-mono text-wiah-black">{item.pctWomen}%</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-12 text-xs font-mono text-wiah-mid text-right">Ethnic min.</div>
                        <div className="flex-1 bg-wiah-border rounded h-4 overflow-hidden">
                          <div
                            className="h-full rounded"
                            style={{ width: `${(item.pctEthnicMinority / 60) * 100}%`, backgroundColor: '#264653' }}
                          />
                        </div>
                        <div className="w-10 text-right text-xs font-mono text-wiah-black">{item.pctEthnicMinority}%</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <p className="font-mono text-xs text-wiah-mid mt-4">Source: MOJ &mdash; Diversity of the Judiciary 2023</p>
          </section>
        </ScrollReveal>

        {/* Sources */}
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
