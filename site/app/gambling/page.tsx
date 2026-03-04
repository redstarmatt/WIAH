'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';

interface GamblingData {
  national: {
    problemGamblers: {
      timeSeries: { year: number; problemGamblersThousands: number }[];
      latestYear: number;
      latestThousands: number;
      moderateRiskThousands: number;
      youngPeopleThousands: number;
      suicideRateMultiplier: number;
      note: string;
    };
    onlineGambling: {
      timeSeries: { year: number; grossYieldBillionGBP: number }[];
      latestYear: number;
      latestBillionGBP: number;
      pctOfTotalGambling: number;
      problemGamblersPctOnline: number;
    };
    bettingShops: {
      timeSeries: { year: number; shopCount: number }[];
      latestYear: number;
      latestCount: number;
      note: string;
    };
    byActivity: { activity: string; problemGamblerPct: number }[];
    regulation: {
      gamblingActYear: number;
      whitepaperYear: number;
      stakeLimitOnlineSlotsUnder25GBP: number;
      stakeLimitOnlineSlotsAdultGBP: number;
      levyAnnualMillionGBP: number;
      note: string;
    };
  };
  metadata: {
    sources: { name: string; dataset: string; url: string; frequency: string }[];
    methodology: string;
    knownIssues: string[];
  };
}

export default function GamblingPage() {
  const [data, setData] = useState<GamblingData | null>(null);

  useEffect(() => {
    fetch('/data/gambling/gambling.json')
      .then((res) => res.json())
      .then((d: GamblingData) => setData(d))
      .catch((err) => console.error('Failed to load gambling data:', err));
  }, []);

  if (!data) return <div className="p-8">Loading...</div>;

  // Build chart series
  const onlineSeries: Series[] = [
    {
      id: 'onlineYield',
      label: 'Online gambling gross yield (£bn)',
      colour: '#6B7280',
      data: data.national.onlineGambling.timeSeries.map((d) => ({
        date: new Date(d.year, 0, 1),
        value: d.grossYieldBillionGBP,
      })),
    },
  ];

  const bettingShopsSeries: Series[] = [
    {
      id: 'bettingShops',
      label: 'Betting shops in Great Britain',
      colour: '#6B7280',
      data: data.national.bettingShops.timeSeries.map((d) => ({
        date: new Date(d.year, 0, 1),
        value: d.shopCount / 1000, // Scale to thousands for visibility
      })),
    },
  ];

  // Max activity for scaling
  const maxActivity = Math.max(...data.national.byActivity.map((a) => a.problemGamblerPct));

  return (
    <main>
      <TopicNav topic="Gambling" />

      <TopicHeader
        topic="Gambling"
        colour="#6B7280"
        question="How Big Is Britain&apos;s Gambling Problem?"
        finding="430,000 people in England are problem gamblers. Online gambling gross yield has grown to &pound;7.1 billion. Betting shops have halved since 2010. The 2023 White Paper introduced stake limits on online slots &mdash; but affordability checks remain contentious and delayed."
      />

      <section id="sec-context" className="max-w-2xl mx-auto px-6 mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              The Gambling Act 2005, drafted in the pre-smartphone era, permitted remote gambling,
              expanded casinos, and allowed fixed-odds betting terminals with stakes up to
              &pound;100 per spin. The consequences have been structural. Online gambling gross
              yield rose from &pound;3.2 billion in 2016/17 to &pound;7.1 billion in 2022/23
              &mdash; a 121% increase &mdash; and now accounts for 51% of all gambling revenue.
              Some 430,000 people in England meet the clinical threshold for problem gambling
              (PGSI score 8+, NHS Health Survey), with a further 1.3 million at moderate risk.
              Public Health England found the suicide rate among problem gamblers is 15 times
              the national average. Of those with the most severe habits, 80% gamble primarily online.
            </p>
            <p>
              The high street has borne a visible cost. Fixed-odds betting terminal stakes were
              cut from &pound;100 to &pound;2 in April 2019, after years of campaigning, and the
              reduction contributed directly to the closure of roughly 1,400 betting shops. Total
              shop numbers fell from over 9,000 in 2013 to 6,700 by 2023 &mdash; with the
              remaining outlets disproportionately concentrated in deprived areas. Online slots
              have largely filled the demand gap left by FOBTs. The Gambling Commission, which
              licences over 3,000 operators, received 4,200 complaints in 2022/23 and levied
              &pound;19.2 million in fines against William Hill entities in 2023 alone. The
              industry spent &pound;1.5 billion per year on advertising, including Premier League
              shirt sponsorships &mdash; a practice banned from 2026 onward.
            </p>
            <p>
              The Gambling Act White Paper (April 2023) represents the first major reform in
              18 years. Key measures include online slot stake limits of &pound;2 for under-25s
              and &pound;5 for adults, plus a mandatory statutory levy of &pound;100 million
              per year on operators &mdash; replacing voluntary contributions of just &pound;10 million.
              Affordability checks for high-spending customers, the most contested proposal, remain
              delayed. The GamStop national self-exclusion scheme has 480,000 registered users.
              Separately, the Gambling Commission&apos;s 2022 Youth Survey found 55,000 children
              and young people are problem gamblers, and GamCare&apos;s helpline received
              55,000 contacts in 2022/23 &mdash; a 25% increase year-on-year. The National
              Lottery, now operated by Allwyn since February 2024, generated &pound;8.1 billion
              in sales in 2022/23, of which &pound;1.8 billion went to good causes.
            </p>
          </div>
        </section>

      <section className="max-w-4xl mx-auto px-6 py-12">
        {/* Metric cards row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <ScrollReveal>
            <MetricCard
              label="Problem gamblers (England)"
              value="430K"
              direction="flat"
              polarity="up-is-bad"
              changeText="2022 · NHS survey · 1.3M at moderate risk · 55,000 young people problem gamblers · Suicide rate 15&times; higher"
              sparklineData={[430, 440, 420, 410, 430, 430]}
              onExpand={() => {}}
            />
          </ScrollReveal>
          <ScrollReveal>
            <MetricCard
              label="Online gambling gross yield"
              value="&pound;7.1bn"
              direction="up"
              polarity="up-is-bad"
              changeText="2022/23 · Up from &pound;4.7bn in 2016/17 · 51% of all gambling yield · 80% of problem gamblers gamble online"
              sparklineData={[3.2, 3.8, 4.2, 4.7, 5.0, 5.5, 6.0, 7.1]}
              onExpand={() => {}}
            />
          </ScrollReveal>
          <ScrollReveal>
            <MetricCard
              label="Betting shops in Great Britain"
              value="6,700"
              direction="down"
              polarity="up-is-bad"
              changeText="2023 · Down from 9,000+ in 2013 · FOBT &pound;2 stake limit (2019) key driver · High street decline accelerating"
              sparklineData={[9000, 8900, 8800, 8600, 8400, 8100, 7700, 7200, 6900, 6700]}
              onExpand={() => {}}
            />
          </ScrollReveal>
        </div>

        {/* Chart: Online gambling yield */}
        <ScrollReveal>
          <div className="mb-12">
            <LineChart
              title="Online gambling gross yield, Great Britain, 2016&ndash;2023"
              series={onlineSeries}
              yLabel="&pound; billion"
              source={{
                name: 'Gambling Commission',
                dataset: 'Industry Statistics',
                url: 'https://www.gamblingcommission.gov.uk/statistics-and-research/publication/industry-statistics',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart: Betting shops trend */}
        <ScrollReveal>
          <div className="mb-12">
            <LineChart
              title="Betting shops in Great Britain, 2013&ndash;2023"
              series={bettingShopsSeries}
              yLabel="Thousands"
              source={{
                name: 'Gambling Commission',
                dataset: 'Licensed Premises Data',
                url: 'https://www.gamblingcommission.gov.uk/statistics-and-research/publication/industry-statistics',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Problem gambling by activity */}
        <ScrollReveal>
          <div className="mb-12">
            <h3 className="text-lg font-bold text-wiah-black mb-6">Problem gamblers by primary gambling activity</h3>
            <div className="space-y-3">
              {data.national.byActivity.map((activity) => (
                <div key={activity.activity}>
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm text-wiah-black">{activity.activity}</p>
                    <p className="font-mono text-sm font-bold text-wiah-dark">{activity.problemGamblerPct}%</p>
                  </div>
                  <div className="w-full bg-wiah-light rounded h-2">
                    <div
                      className="bg-wiah-mid h-2 rounded"
                      style={{ width: `${(activity.problemGamblerPct / maxActivity) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Gambling Reform"
            value="&pound;100M"
            unit="mandatory gambling levy from 2025 &mdash; replacing voluntary &pound;10M contributions"
            description="The Gambling Act White Paper (April 2023) announced a mandatory statutory levy on gambling operators, replacing the voluntary GambleAware contribution of &pound;10 million/year with a compulsory &pound;100 million/year. This will fund treatment, prevention, and research. Stake limits on online slots &mdash; &pound;2 for under-25s and &pound;5 for adults &mdash; were phased in from September 2024. The Gambling Commission gained enhanced powers to require operators to implement affordability checks for high-spending customers. GamStop self-exclusion scheme has 480,000 registered users."
            source="Source: Gambling Commission &mdash; Industry Statistics 2022/23; DCMS &mdash; High Stakes: Gambling Reform White Paper 2023."
          />
        </ScrollReveal>

        {/* Methodology */}
        <ScrollReveal>
          <div className="mt-16 border-t border-wiah-border pt-8">
            <h3 className="text-lg font-bold text-wiah-black mb-4">Methodology</h3>
            <p className="text-sm text-wiah-black leading-relaxed mb-4">
              {data.metadata.methodology}
            </p>
            <div className="bg-wiah-light rounded p-4 mb-4">
              <p className="text-xs font-mono text-wiah-mid mb-2">Known issues:</p>
              <ul className="space-y-1">
                {data.metadata.knownIssues.map((issue, idx) => (
                  <li key={idx} className="text-xs text-wiah-black leading-relaxed">
                    • {issue}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-mono text-wiah-mid mb-2">Sources:</p>
              {data.metadata.sources.map((source, idx) => (
                <div key={idx} className="text-xs text-wiah-mid mb-1">
                  <a href={source.url} className="text-wiah-blue hover:underline">
                    {source.name}
                  </a>
                  {' '}&mdash; {source.dataset} ({source.frequency})
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>
    </main>
  );
}
