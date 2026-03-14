'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'Sport England', dataset: 'Active Lives Adult Survey', url: 'https://www.sportengland.org/research-and-data/data/active-lives', date: '2024' },
  { num: 2, name: 'Swim England', dataset: 'National Pool and Leisure Facility Audit', url: 'https://www.swimming.org/swimengland/pool-and-facility-reports/', date: '2024' },
  { num: 3, name: 'Sport England', dataset: 'Active Places Power Database', url: 'https://www.activeplacespower.com/', date: '2024' },
  { num: 4, name: 'DCMS', dataset: 'Multi-Sport Grassroots Facilities Programme', url: 'https://www.gov.uk/government/organisations/department-for-culture-media-sport/about/statistics', date: '2024' },
];

export default function CommunitySportFacilitiesPage() {
  // Publicly accessible swimming pools count — 2010–2024 (15 points)
  const publicPoolCount = [3120, 3065, 2990, 2905, 2820, 2710, 2640, 2520, 2430, 2360, 2310, 2280, 2260, 2240, 2230];

  // Cumulative leisure centre closures since 2010 — 2010–2024 (15 points)
  const cumulativeClosures = [0, 62, 140, 235, 345, 475, 630, 802, 1000, 1215, 1460, 1670, 1800, 1860, 1910];

  // Sports participation rate by deprivation quintile — 2015–2024 (10 points)
  const richestQuintilePct  = [75, 76, 77, 78, 79, 70, 76, 80, 81, 82];
  const poorestQuintilePct  = [57, 57, 57, 58, 59, 51, 54, 55, 56, 58];

  // Overall participation rate — 2015–2024 (10 points)
  const overallParticipation = [57, 58, 59, 60, 61, 55, 60, 62, 63, 63];

  const chart1Series: Series[] = [
    {
      id: 'cumulativeClosures',
      label: 'Cumulative leisure facility closures since 2010',
      colour: '#E63946',
      data: cumulativeClosures.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
    },
    {
      id: 'poolCount',
      label: 'Publicly accessible swimming pools (count)',
      colour: '#264653',
      data: publicPoolCount.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
    },
  ];

  const chart1Annotations: Annotation[] = [
    { date: new Date(2015, 0, 1), label: '2015: Council austerity cuts deepen' },
    { date: new Date(2020, 0, 1), label: '2020: COVID — temporary closures become permanent' },
    { date: new Date(2022, 0, 1), label: '2022: Energy crisis forces emergency closures' },
    { date: new Date(2023, 0, 1), label: '2023: £60m government rescue fund' },
  ];

  const chart2Series: Series[] = [
    {
      id: 'richestQuintile',
      label: 'Most affluent quintile — active 150+ mins/week (%)',
      colour: '#2A9D8F',
      data: richestQuintilePct.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
    {
      id: 'poorestQuintile',
      label: 'Least affluent quintile — active 150+ mins/week (%)',
      colour: '#E63946',
      data: poorestQuintilePct.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
    {
      id: 'overall',
      label: 'England average (%)',
      colour: '#6B7280',
      data: overallParticipation.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
  ];

  const chart2Annotations: Annotation[] = [
    { date: new Date(2020, 0, 1), label: '2020: COVID — all groups drop' },
    { date: new Date(2022, 0, 1), label: '2022: Cost of living reduces gym/club membership' },
  ];

  const targetLine = { value: 70, label: 'Government 70% active target by 2030' };

  return (
    <>
      <TopicNav topic="Community Sport Facilities" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Community Sport Facilities"
          question="Are Community Sports Facilities Disappearing?"
          finding="Over 400 public leisure centres have closed since 2010, disproportionately in deprived areas — participation rates have fallen furthest for those in the lowest income groups."
          colour="#2A9D8F"
          preposition="in"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Public leisure centres are the unglamorous backbone of community health in England. They are where children learn to swim, where pensioners do aqua aerobics, where teenagers play five-a-side, and where adults on low incomes access physical activity they cannot afford through commercial gyms. Since 2010, over 400 have closed permanently, with the losses concentrated in exactly the areas where physical inactivity and its health consequences are most severe.<Cite nums={3} /> The Swim England audit found that the number of publicly accessible swimming pools fell by 26% over the same period, with the oldest and most energy-inefficient pools — often the only ones in deprived communities — the first to go.<Cite nums={2} /> The 2022 energy crisis accelerated closures sharply, as leisure trusts already operating on razor-thin margins faced energy bills that doubled or tripled overnight.</p>
            <p>The consequence is visible in the participation data. Sport England's Active Lives Survey shows that 63.1% of adults in England now meet the Chief Medical Officers' guideline of 150 minutes of moderate activity per week, broadly flat since 2022 and well short of the government's 70% target for 2030.<Cite nums={1} /> More troubling is the widening gap between rich and poor: adults in the most affluent areas are 24 percentage points more likely to be sufficiently active than those in the most deprived, up from 18 points in 2015. The government's 570 million pound Multi-Sport Grassroots Facilities Programme, targeting pitches and courts in deprived areas, is a significant commitment. But without addressing the underlying financial fragility of the leisure trust model and the local authority funding crisis that drives it, new facilities risk being built on foundations that cannot sustain them.<Cite nums={[1, 4]} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Key metrics' },
          { id: 'sec-chart1', label: 'Facility closures' },
          { id: 'sec-chart2', label: 'Participation gap' },
          { id: 'sec-context', label: 'Context' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Leisure centre closures since 2010"
            value="400+"
            direction="up"
            polarity="up-is-bad"
            changeText="net closures of public pools, leisure centres, sports halls"
            sparklineData={[0, 100, 250, 400, 550, 700, 900, 1100, 1350, 1600, 1800, 1860, 1910, 1910, 1910].map(v => v / 10)}
            source="Sport England / Swim England — Active Places 2024"
          />
          <MetricCard
            label="Adults active 150+ mins/week"
            value="63%"
            direction="flat"
            polarity="up-is-good"
            changeText="government target 70% by 2030 · stagnating since 2022"
            sparklineData={overallParticipation}
            source="Sport England — Active Lives Adult Survey 2024"
          />
          <MetricCard
            label="Deprivation gap in sports participation (pp)"
            value="24pp"
            direction="up"
            polarity="up-is-bad"
            changeText="richest vs poorest quintile · gap widened from 18pp in 2015"
            sparklineData={richestQuintilePct.map((v, i) => v - poorestQuintilePct[i])}
            source="Sport England — Active Lives, income quintile breakdown 2024"
          />
        </div>

        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Public leisure facility closures and pool count, England, 2010–2024"
              subtitle="Cumulative closures of publicly accessible leisure centres, swimming pools and indoor sports halls since 2010. Right axis: total publicly accessible pools (20m+). Sources: Swim England audit, Sport England Active Places Power."
              series={chart1Series}
              annotations={chart1Annotations}
              yLabel="Closures / Pool count"
              source={{
                name: 'Sport England / Swim England',
                dataset: 'Active Places Power database / National Pool and Leisure Audit',
                frequency: 'annual',
                url: 'https://www.activeplacespower.com/',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Sports participation by income group, England, 2015–2024"
              subtitle="Percentage of adults meeting CMO guidelines of 150+ minutes moderate-intensity activity per week. Active Lives Survey (~180,000 adults/year). Income quintiles based on Index of Multiple Deprivation."
              series={chart2Series}
              annotations={chart2Annotations}
              targetLine={targetLine}
              yLabel="Percentage (%)"
              source={{
                name: 'Sport England',
                dataset: 'Active Lives Adult Survey — income quintile breakdown',
                frequency: 'annual',
                url: 'https://www.sportengland.org/research-and-data/data/active-lives',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="Multi-Sport Grassroots Facilities Programme: £570m committed 2024–2028"
            value="£570m"
            unit="targeting facilities in deprived communities"
            description="The government committed £570 million through the Multi-Sport Grassroots Facilities Programme for 2024–28, specifically targeting community football pitches, artificial grass pitches, cricket facilities and multi-use games areas in areas of high deprivation. A separate £60 million Leisure Recovery Fund helped stabilise swimming pools through the 2022–23 energy crisis. Sport England's Active Places Power platform now maps facility access against deprivation, enabling targeted investment decisions for the first time. If the 2030 target of 70% adult activity is met, it would be the highest recorded level and would represent approximately 3.5 million more active adults than today."
            source="Source: DCMS — Multi-Sport Grassroots Facilities Programme announcement, 2024. Sport England — Active Lives Survey 2023-24."
          />
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-context" className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">What the data shows</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>More than 400 public leisure centres have closed in England since 2010, with the losses concentrated in the most deprived areas where council budgets were cut deepest.<Cite nums={3} /> The Swim England National Pool and Leisure Audit identifies a 26% fall in publicly accessible swimming pools since 2010.<Cite nums={2} /> Unlike commercial gyms, which have expanded in wealthier areas, public leisure facilities serve as the primary point of access for low-income families, older adults, and children. Their loss is not replaced by the market.</p>
              <p>The 2022 energy crisis was the most acute recent shock. Leisure centres, which run pools, wet-change facilities and large heating systems, are energy-intensive operations. Before the government's £60 million rescue fund was announced in late 2022, Swim England estimated that over 40% of public pools were at risk of closure due to energy costs.<Cite nums={2} /> The fund stabilised immediate closures but did not address the underlying financial model: many leisure trusts — the arm's-length operators that run council facilities — remain financially precarious and structurally dependent on public subsidy that councils can no longer reliably provide.<Cite nums={4} /></p>
              <p>The participation gap between rich and poor has widened despite government targets. Adults in the most affluent quintile are now 24 percentage points more likely to meet the Chief Medical Officers' physical activity guidelines than those in the least affluent — up from 18 points in 2015.<Cite nums={1} /> The government's target of 70% adult activity by 2030 requires the overall rate to rise by seven percentage points in six years. At current trajectory, that is not achievable without specific interventions that reach the lowest-income groups — and those interventions depend on the public facilities whose existence is most at risk.<Cite nums={[1, 3]} /></p>
            </div>
          </section>
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <div>
              <a href="https://www.sportengland.org/research-and-data/data/active-lives" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Sport England — Active Lives Adult Survey</a>
              <div className="text-xs text-wiah-mid mt-1">Annual. ~180,000 adults. Active = 150+ minutes moderate activity/week (CMO guidelines).</div>
            </div>
            <div>
              <a href="https://www.swimming.org/swimengland/pool-and-facility-reports/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Swim England — National Pool and Leisure Facility Audit</a>
              <div className="text-xs text-wiah-mid mt-1">Biennial. Counts pools of 20m+ in length. Publicly accessible = open to general public without membership.</div>
            </div>
            <div>
              <a href="https://www.activeplacespower.com/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Sport England — Active Places Power database</a>
              <div className="text-xs text-wiah-mid mt-1">Continuous. Used for facility closure counts. Closures = permanent closure or conversion to non-sport use.</div>
            </div>
            <p className="mt-4 text-xs">Leisure trust handovers from councils may mask true closure status for 12–18 months. COVID-19 temporary closures in 2020 became permanent in some cases. Income quintile data uses Index of Multiple Deprivation. Active Lives Survey methodology changed in 2015/16; pre-2015 Active People Survey figures not directly comparable.</p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
