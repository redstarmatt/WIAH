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

interface CivilLibertiesData {
  timeSeries: Array<{ date: string; cctvsPerThousand: number; stopSearchPerThousand: number }>;
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

export default function CivilLibertiesPage() {
  const [data, setData] = useState<CivilLibertiesData | null>(null);

  useEffect(() => {
    fetch('/data/civil-liberties/civil_liberties.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const stopSearchSeries: Series[] = data
    ? [
        {
          id: 'stop-search',
          label: 'Police stop and search per 1,000 population',
          colour: '#6B7280',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.date),
            value: d.stopSearchPerThousand,
          })),
        },
      ]
    : [];

  const cctvSeries: Series[] = data
    ? [
        {
          id: 'cctv-density',
          label: 'Estimated CCTV cameras per 1,000 population',
          colour: '#6B7280',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.date),
            value: d.cctvsPerThousand,
          })),
        },
      ]
    : [];

  return (
    <>
      <TopicNav topic="Civil Liberties" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Civil Liberties"
          preposition="with"
          question="Is the State Acquiring Too Much Power Over Citizens?"
          finding="The UK has an estimated 5.2 million CCTV cameras &mdash; one per 13 people, the highest density of any democracy. Since 2014, a series of laws has expanded surveillance powers, restricted protest rights, and extended pre-charge detention. CIVICUS has downgraded Britain&apos;s civic space rating, and Liberty and other organisations document a pattern of incremental erosion that individually looks modest but cumulatively is significant."
          colour="#6B7280"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              Britain has accumulated one of the world&apos;s most extensive domestic surveillance infrastructures without any single moment of explicit democratic decision. The growth of CCTV cameras &mdash; estimated by the British Security Industry Association at approximately 5.2 million nationwide, roughly one per 13 citizens &mdash; occurred incrementally through decisions by local authorities, transport operators, retailers, housing associations, and private individuals. No government has legislated for this network; it has grown organically through market decisions, planning conditions, and police recommendations. The Investigatory Powers Act 2016 (the &ldquo;Snoopers&apos; Charter&rdquo;) provides a legal framework for bulk interception of communications, mass retention of internet connection records, and equipment interference by intelligence agencies &mdash; powers that the European Court of Human Rights found, in part, to be incompatible with human rights law in 2021. The Home Office&apos;s Biometrics and Surveillance Camera Commissioner was abolished in 2023 and not replaced, removing a layer of independent oversight precisely as the surveillance estate expanded.
            </p>
            <p>
              The legislative trajectory since 2014 has expanded police and state powers across a range of domains. The Investigatory Powers Act 2016 gave statutory basis to mass surveillance practices exposed by Edward Snowden in 2013. The Counter-Terrorism and Security Act 2015 introduced Prevent duty on public bodies and powers to seize passports. The Police, Crime, Sentencing and Courts Act 2022 introduced significant restrictions on the right to protest, including new offences of causing &ldquo;serious disruption&rdquo; and expanding police powers to impose conditions on demonstrations. The Public Order Act 2023 went further, introducing &ldquo;serious disruption prevention orders&rdquo; (SDPOs) that can ban named individuals from attending protests before any offence has been committed &mdash; a form of civil pre-emptive restriction. Liberty and Amnesty International challenged several provisions in the courts; the Joint Committee on Human Rights found multiple clauses incompatible with Article 10 (freedom of expression) and Article 11 (freedom of assembly) of the European Convention.
            </p>
            <p>
              Stop and search is the most statistically visible manifestation of disproportionate police power. The Home Office publishes annual data: stop and search reached a peak of 25 per 1,000 population in 2010/11, fell substantially following the 2014 reforms (a direct result of the then Home Secretary Theresa May&apos;s &ldquo;Best Use of Stop and Search&rdquo; scheme), but has risen again from 2019, reaching approximately 16 per 1,000 in 2023. The ethnic disparity in stop and search has remained stubbornly persistent: Black people are approximately 7 times more likely to be stopped and searched than white people, a ratio that has barely changed for 20 years despite multiple reviews, codes of practice revisions, and body-worn video requirements. The disproportionality exists even when controlling for area-level crime rates, suggesting that race itself remains a factor in officer decision-making, a finding acknowledged in successive HMICFRS inspections.
            </p>
            <p>
              The impacts of civil liberties restrictions fall unevenly. The protest restrictions in the PCSC Act 2022 and Public Order Act 2023 have been most visibly applied against climate activists (Just Stop Oil, Extinction Rebellion), who are predominantly middle-class and white. But the same legal powers are available against any protest movement, and civil society organisations have documented cases where powers were applied against trade union picket lines, pro-Palestinian demonstrations, and anti-HS2 campaigners. People from ethnic minority backgrounds face disproportionate exposure to stop and search, counter-terrorism surveillance, and Prevent referrals &mdash; a 2021 review found that Muslim communities account for 65% of Prevent referrals despite being 5% of the population. Facial recognition technology, deployed by the Metropolitan Police and South Wales Police, has error rates that are significantly higher for darker-skinned individuals, raising both effectiveness and discrimination concerns.
            </p>
            <p>
              Measuring the erosion of civil liberties is methodologically challenging because it involves assessing the cumulative and chilling effects of legal changes rather than discrete incidents. CIVICUS&apos;s annual State of Civil Society report uses a combination of incident data (prosecutions, demonstrations disrupted, journalists investigated) and expert assessment to assign a civic space rating; the UK was downgraded from &ldquo;Open&rdquo; to &ldquo;Narrowed&rdquo; in 2019, reflecting the pattern of legislative restrictions on protest, and has remained in this category. The distinction matters: &ldquo;Narrowed&rdquo; places the UK in the same category as Australia, Canada, and France, rather than countries like Hungary or Turkey that are rated &ldquo;Obstructed&rdquo; &mdash; a reminder that the UK&apos;s civil liberties position remains substantially better than authoritarian states. The independent judiciary, parliamentary scrutiny, a free press, and an active civil society all provide meaningful checks. But the trend is toward restriction, not expansion, and each individual law passed is assessed in isolation rather than against the cumulative picture.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Overview' },
          { id: 'sec-stop-search', label: 'Stop &amp; Search' },
          { id: 'sec-cctv', label: 'CCTV Density' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="CCTV cameras per 1,000 population"
              value="75"
              direction="up"
              polarity="up-is-bad"
              changeText="5.2 million total &middot; 1 per 13 people &middot; Highest density of any democracy"
              sparklineData={[45, 50, 55, 58, 62, 66, 70, 75]}
              source="BSIA &middot; CCTV Survey 2023"
              onExpand={() => {}}
            />
            <MetricCard
              label="Police stop and search per 1,000"
              value="16"
              direction="up"
              polarity="up-is-bad"
              changeText="Rising since 2019 &middot; Black people 7&times; more likely to be stopped"
              sparklineData={[25, 20, 14, 11, 9, 10, 13, 16]}
              source="Home Office &middot; Police Powers and Procedures 2023"
              onExpand={() => {}}
            />
            <MetricCard
              label="UK CIVICUS civic space rating"
              value="3/5"
              direction="down"
              polarity="up-is-good"
              changeText="Narrowed &middot; Downgraded from Open in 2019 &middot; PCSC Act 2022 &amp; Public Order Act 2023 cited"
              sparklineData={[4, 4, 4, 4, 3, 3, 3, 3]}
              source="CIVICUS &middot; State of Civil Society Report 2024"
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="What is getting better"
            value="Independent"
            unit="judiciary"
            description="The UK&apos;s independent judiciary has repeatedly struck down overbroad executive powers &mdash; the Supreme Court ruled the Rwanda deportation plan unlawful in November 2023, courts have quashed several Prevent decisions, and judicial review remains a meaningful check on state power. The rule of law in Britain remains robust by global standards, with active civil society, a free press, and parliamentary scrutiny providing genuine accountability."
            source="UK Supreme Court &middot; Judicial Review Statistics &middot; JUSTICE 2024"
          />
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-stop-search" className="mb-12">
            {stopSearchSeries.length > 0 ? (
              <LineChart
                title="Police stop and search in England and Wales, 2010&ndash;2023"
                subtitle="Searches per 1,000 population under PACE and Section 60 powers. Fell after 2014 reforms, rising again from 2019."
                series={stopSearchSeries}
                yLabel="Searches per 1,000 population"
                source={{
                  name: 'Home Office',
                  dataset: 'Police Powers and Procedures: Stop and Search',
                  frequency: 'annual',
                  url: 'https://www.gov.uk/government/statistics/police-powers-and-procedures-stop-and-search-and-arrests-england-and-wales',
                }}
              />
            ) : (
              <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
            )}
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-cctv" className="mb-12">
            {cctvSeries.length > 0 ? (
              <LineChart
                title="Estimated CCTV cameras per 1,000 population, UK 2010&ndash;2023"
                subtitle="Industry estimates from BSIA survey. No central register exists; actual numbers may be higher. Includes public and private cameras."
                series={cctvSeries}
                yLabel="Cameras per 1,000 population"
                source={{
                  name: 'BSIA',
                  dataset: 'British Security Industry Association CCTV Survey',
                  frequency: 'biennial',
                  url: 'https://www.bsia.co.uk/publications',
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
