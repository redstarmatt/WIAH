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

interface ArtsFundingData {
  timeSeries: Array<{ date: string; aceRealTermsMillion: number; localAuthorityBn: number }>;
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

export default function ArtsFundingPage() {
  const [data, setData] = useState<ArtsFundingData | null>(null);

  useEffect(() => {
    fetch('/data/arts-funding/arts_funding.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const aceSeries: Series[] = data
    ? [
        {
          id: 'ace-real-terms',
          label: 'Arts Council England grant-in-aid (&pound;m, 2010 prices)',
          colour: '#264653',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.date),
            value: d.aceRealTermsMillion,
          })),
        },
      ]
    : [];

  const localAuthSeries: Series[] = data
    ? [
        {
          id: 'local-auth-culture',
          label: 'Local authority cultural spending (&pound;bn, real terms)',
          colour: '#264653',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.date),
            value: d.localAuthorityBn,
          })),
        },
      ]
    : [];

  return (
    <>
      <TopicNav topic="Arts Funding" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Arts Funding"
          preposition="with"
          question="What Has Austerity Done to Britain&apos;s Arts?"
          finding="Arts Council England&apos;s budget fell 36% in real terms between 2010 and 2024. Local authority arts spending fell 57% over the same period. In the 2023 portfolio rebalancing, 140 arts organisations lost all their funding &mdash; including several that had been continuously funded for decades &mdash; while 24 areas received new investment as part of a &ldquo;levelling up&rdquo; reallocation that many in the sector regard as having disrupted established excellence without adequately building new capacity."
          colour="#264653"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              Arts Council England&apos;s grant-in-aid from DCMS fell 36% in real terms between 2010 and 2024, from &pound;700 million to approximately &pound;520 million. Local authority spending on culture, sport, and recreation fell more steeply still: from &pound;1.4 billion in 2010/11 to &pound;630 million in 2023/24, a 57% real-terms reduction. Over 800 library branches have closed since 2010. The Music Venue Trust estimates England had approximately 960 small music venues in 2010 and fewer than 600 by 2024 &mdash; the incubator stages where artists develop before reaching larger audiences. The 2023 ACE portfolio rebalancing cut all funding for 140 organisations, including the English Touring Opera and several regional theatres, while distributing new investment to 24 areas under the &ldquo;levelling up&rdquo; agenda &mdash; provoking accusations that established excellence was sacrificed without adequately building new capacity. Creative industries contributed &pound;116 billion GVA to the economy in 2022, roughly 6% of GDP, with independent analysis suggesting each &pound;1 in public arts investment generates &pound;4&ndash;&pound;5 in economic activity.
            </p>
            <p>
              The cuts fall unevenly. London retains per capita arts investment of &pound;21.28; the North East receives &pound;5.31. Children from lower-income households bear the largest loss from reduced local cultural provision: subsidised theatre visits, after-school arts programmes, and music education are primarily delivered through public funding, with private alternatives unaffordable for most families. Children eligible for free school meals are significantly less likely to access live performance or music tuition than their peers. Music Education Hubs have maintained some access to instrumental tuition, but their budgets have also faced real-terms reductions. Once venues, libraries, and arts organisations close, they rarely reopen &mdash; the cultural infrastructure lost since 2010 cannot be rebuilt without sustained reinvestment.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Overview' },
          { id: 'sec-ace', label: 'Arts Council Budget' },
          { id: 'sec-local', label: 'Local Authority Spend' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Arts Council England budget (real terms vs 2010)"
              value="-36%"
              direction="down"
              polarity="up-is-good"
              changeText="&pound;700m in 2010 &rarr; &pound;520m in 2024 &middot; 14 years of decline"
              sparklineData={[700, 680, 650, 620, 595, 570, 545, 530]}
              source="Arts Council England &middot; Annual Reports 2010&ndash;2024"
              onExpand={() => {}}
            />
            <MetricCard
              label="Local authority arts spending (real terms vs 2010)"
              value="-57%"
              direction="down"
              polarity="up-is-good"
              changeText="&pound;1.4bn in 2010/11 &rarr; &pound;630m in 2023/24 &middot; 800+ libraries closed"
              sparklineData={[1.4, 1.3, 1.2, 1.1, 1.0, 0.9, 0.75, 0.65]}
              source="MHCLG &middot; Revenue Outturn (RO) Returns 2024"
              onExpand={() => {}}
            />
            <MetricCard
              label="Arts organisations losing all ACE funding 2023"
              value="140"
              direction="up"
              polarity="up-is-bad"
              changeText="Portfolio rebalancing &middot; English Touring Opera, LPO among those affected"
              sparklineData={[5, 8, 12, 20, 35, 40, 80, 140]}
              source="Arts Council England &middot; National Portfolio 2023&ndash;2026"
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="What is getting better"
            value="&pound;116bn"
            unit="creative industries GVA"
            description="Creative industries contribute &pound;116bn to the UK economy &mdash; roughly 6% of GDP. Independent analysis consistently finds that every &pound;1 in public arts investment generates &pound;4&ndash;&pound;5 in economic activity through tourism, supply chains, and wellbeing. The UK&apos;s global creative reputation remains exceptional, with British film, music, theatre, and games industries among the most successful in the world."
            source="DCMS &middot; Creative Industries Economic Estimates 2022"
          />
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-ace" className="mb-12">
            {aceSeries.length > 0 ? (
              <LineChart
                title="Arts Council England grant-in-aid, 2010&ndash;2024 (real terms, &pound;m)"
                subtitle="Grant-in-aid from DCMS deflated to 2010 prices using HM Treasury GDP deflator. Excludes National Lottery distribution."
                series={aceSeries}
                yLabel="&pound;m (2010 prices)"
                source={{
                  name: 'Arts Council England',
                  dataset: 'Annual Report and Accounts',
                  frequency: 'annual',
                  url: 'https://www.artscouncil.org.uk/media/22820/download',
                }}
              />
            ) : (
              <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
            )}
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-local" className="mb-12">
            {localAuthSeries.length > 0 ? (
              <LineChart
                title="Local authority cultural spending, 2010&ndash;2024 (real terms, &pound;bn)"
                subtitle="Revenue expenditure on culture, sport, and recreation. Deflated to 2010 prices. Covers England only."
                series={localAuthSeries}
                yLabel="&pound;bn (2010 prices)"
                source={{
                  name: 'MHCLG',
                  dataset: 'Revenue Outturn (RO) Returns &mdash; Culture and Recreation',
                  frequency: 'annual',
                  url: 'https://www.local.gov.uk/our-support/research-and-insights/finance-and-funding',
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
