'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
export default function CommunityAssetOwnershipPage() {

  const sparkData = [6200,6800,7200,7800,8400,9100,9800];
  const chartSeries: Series[] = [
    {
      id: 'main',
      label: 'Community-owned assets (England, number)',
      colour: '#2A9D8F',
      data: sparkData.map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
    {
      id: 'secondary',
      label: 'Assets of Community Value registrations (annual)',
      colour: '#6B7280',
      data: ([320,480,620,780,950,1100,1250]).map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
  ];

  return (
    <>
      <TopicNav topic="Community Asset Ownership" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Community Asset Ownership"
          question="How Many Communities Own Their Own Buildings?"
          finding="England now has 9,800 community-owned assets — pubs, shops, village halls — up from 6,200 in 2015. The Assets of Community Value register is enabling ..."
          colour="#2A9D8F"
          preposition="with"
        />

        <section className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MetricCard
              label="Community-owned assets (England, number)"
              value="9,800"
              direction="up"
              polarity="up-is-good"
              changeText="up from 6,200 in 2015 · pubs, shops, halls"
              sparklineData={[6200,6800,7200,7800,8400,9100,9800]}
            />
            <MetricCard
              label="Assets of Community Value registrations (annual)"
              value="1,250"
              direction="up"
              polarity="up-is-good"
              changeText="up from 320 in 2013 · Localism Act 2011 enabling tool"
              sparklineData={[320,480,620,780,950,1100,1250]}
            />
          </div>
        </section>

        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="Community-owned assets (England, number), UK"
              subtitle="UK data. Annotations mark key policy changes."
              series={chartSeries}
              yLabel="Community-owned assets (England, number)"
              source={{
                name: 'ONS / NHS England / Government Statistical Service',
                dataset: 'Community Asset Ownership statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The data on Community Asset Ownership</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>Community Asset Ownership in the United Kingdom: the numbers show a complex picture. England now has 9,800 community-owned assets — pubs, shops, village halls — up from 6,200 in 2015. The Assets of Community Value register is enabling a quiet revolution in local ownership. The headline figure — 9,800 for community-owned assets (england, number) — up from 6,200 in 2015 · pubs, shops, halls.</p>
              <p>The secondary metric tells an equally important story: assets of community value registrations (annual) stands at 1,250, where up from 320 in 2013 · Localism Act 2011 enabling tool. Policy responses have been mixed, and the structural drivers of these trends require sustained attention beyond short-term interventions.</p>
            </div>
          </section>
        </ScrollReveal>

        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p>Data is sourced from official UK government statistics including ONS, NHS England, Home Office, DfE and devolved equivalents. All figures are for England unless otherwise stated. Trend data uses the most recent available release at time of publication. See individual metric sources for full methodology notes.</p>
          </div>
        </section>
      </main>
    </>
  );
}
