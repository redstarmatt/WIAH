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
  { num: 1, name: 'Swim England / Sport England', dataset: 'Facilities tracker / State of the Nation report', url: 'https://www.sportengland.org/research-and-data/facilities', date: '2024' },
  { num: 2, name: 'Sport England', dataset: 'Active Lives Adult Survey', url: 'https://www.sportengland.org/research-and-data/data/active-lives', date: '2024' },
  { num: 3, name: 'Sport England', dataset: 'Active Lives Children Survey', url: 'https://www.sportengland.org/research-and-data/data/active-lives', date: '2024' },
];

// Sports/leisure facilities closed (cumulative), 2010–2024
const facilitiesClosedCumulative = [0, 100, 200, 320, 440, 560, 640, 720, 800, 860, 920, 980, 1050, 1120, 1200];
// Adult weekly sport participation (%), 2015–2024
const adultParticipationPct = [59.1, 60.3, 61.1, 62.2, 63.0, 60.4, 62.2, 62.8, 61.5, 61.3];
// Children meeting daily activity guidelines (%), 2018–2024
const childActivityPct = [47, 47, 43, 40, 44, 47, 46];
// Pool closures cumulative, 2010–2024
const poolClosuresCumulative = [0, 30, 65, 105, 145, 190, 230, 270, 310, 350, 370, 385, 395, 400, 405];

const facilitiesSeries: Series[] = [
  {
    id: 'facilities',
    label: 'Sports/leisure facilities closed (cumulative)',
    colour: '#E63946',
    data: facilitiesClosedCumulative.map((v, i) => ({ date: new Date(2010 + i, 5, 1), value: v })),
  },
  {
    id: 'pools',
    label: 'Public pools closed (cumulative)',
    colour: '#F4A261',
    data: poolClosuresCumulative.map((v, i) => ({ date: new Date(2010 + i, 5, 1), value: v })),
  },
];

const participationSeries: Series[] = [
  {
    id: 'adults',
    label: 'Adults: weekly sport participation (%)',
    colour: '#2A9D8F',
    data: adultParticipationPct.map((v, i) => ({ date: new Date(2015 + i, 5, 1), value: v })),
  },
  {
    id: 'children',
    label: 'Children meeting daily activity guidelines (%)',
    colour: '#264653',
    data: childActivityPct.map((v, i) => ({ date: new Date(2018 + i, 5, 1), value: v })),
  },
];

const facilitiesAnnotations: Annotation[] = [
  { date: new Date(2020, 5, 1), label: '2020: Pandemic temporarily closes all facilities' },
  { date: new Date(2022, 5, 1), label: '2022: Energy cost spike accelerates closures' },
];

const participationAnnotations: Annotation[] = [
  { date: new Date(2019, 5, 1), label: '2019: Pre-pandemic participation peak' },
  { date: new Date(2020, 5, 1), label: '2020: Lockdowns reduce participation sharply' },
];

export default function GrassrootsSportPage() {
  return (
    <>
      <TopicNav topic="Grassroots Sport" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Grassroots Sport"
          question="Is Grassroots Sport in Decline?"
          finding="1,200 sports and leisure facilities closed between 2010 and 2024. Weekly adult sports participation has stagnated at 61% since 2019. Children from low-income families are 50% less likely to participate regularly."
          colour="#2A9D8F"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>England lost 1,200 public sports and leisure facilities between 2010 and 2024 — an average of 86 per year across 14 years of local government financial pressure.<Cite nums={1} /> Swimming pools account for the largest share: over 400 public pools closed in this period, with many more reducing operating hours.<Cite nums={1} /> The pattern is geographically uneven. Facilities closed fastest in deprived areas where councils faced the most severe funding pressure and commercial replacement providers saw the least commercial opportunity.</p>
            <p>The participation data tells a story of stagnation. The adult weekly sport participation rate reached 63% in 2019, fell during the pandemic, and had recovered only to 61.3% by 2024 — below the pre-pandemic peak.<Cite nums={2} /> Child activity is particularly concerning: only 46% of children meet the Chief Medical Officer's guideline of 60 minutes of moderate-to-vigorous activity per day.<Cite nums={3} /> The income gradient is steep — Sport England data consistently shows children from families in the lowest income quintile are 50% less likely to meet activity guidelines than those in the highest.<Cite nums={3} /></p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Facility Closures' },
          { id: 'sec-chart2', label: 'Participation' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Sports facilities closed since 2010"
              value="1,200"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Austerity-era council cuts · swimming pools hardest hit"
              sparklineData={facilitiesClosedCumulative.slice(-8)}
              source="Swim England / Sport England · Facilities tracker 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Weekly sport participation (adults)"
              value="61.3%"
              unit=""
              direction="flat"
              polarity="up-is-good"
              changeText="Stagnant since 2019 · pre-pandemic peak was 63%"
              sparklineData={adultParticipationPct.slice(-8)}
              source="Sport England · Active Lives Adult Survey 2024"
              href="#sec-chart2"
            />
            <MetricCard
              label="Children meeting daily activity guidelines"
              value="46%"
              unit=""
              direction="down"
              polarity="up-is-good"
              changeText="Below pre-pandemic peak · low-income gap persistent"
              sparklineData={childActivityPct.slice(-8)}
              source="Sport England · Active Lives Children Survey 2024"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Cumulative sports and leisure facility closures, England, 2010–2024"
              subtitle="Total public sports and leisure facilities closed since 2010 (red) and public pools (amber). Closures accelerated during 2022 energy crisis as operating costs became unsustainable."
              series={facilitiesSeries}
              annotations={facilitiesAnnotations}
              yLabel="Facilities closed (cumulative)"
              source={{ name: 'Swim England / Sport England', dataset: 'Facilities tracker / State of the Nation report', url: 'https://www.sportengland.org/research-and-data/facilities', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Sport participation rates, England, 2015–2024"
              subtitle="Adults doing sport at least weekly (green) and children meeting CMO 60-minute daily activity guideline (blue). Both stagnant or declining since 2019."
              series={participationSeries}
              annotations={participationAnnotations}
              yLabel="Participation (%)"
              source={{ name: 'Sport England', dataset: 'Active Lives Adult and Children Surveys', url: 'https://www.sportengland.org/research-and-data/data/active-lives', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="£300m Multi-Sport Grassroots Facilities Programme targeting upgrades"
            value="8,000"
            unit="facilities being upgraded 2021–2025"
            description="Sport England's Uniting the Movement strategy targets halving physical inactivity by 2030. The £300 million Multi-Sport Grassroots Facilities Programme is upgrading 8,000 facilities, with a focus on deprived communities where closures have been most severe. Swim England's national facilities blueprint is working with councils and Sport England to protect the remaining public pool estate and prevent further closures. The Government's School Sport and Activity Action Plan seeks to reverse the decline in curriculum sport time since 2010. Active Travel England is investing in walking and cycling infrastructure as a route to everyday physical activity."
            source="Source: Sport England — Active Lives 2024. DCMS — Multi-Sport Grassroots Facilities Programme progress report 2024."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.sportengland.org/research-and-data/data/active-lives" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Sport England — Active Lives Survey</a> — Biannual survey of adult and children's physical activity participation. Retrieved 2025.</p>
            <p><a href="https://www.sportengland.org/research-and-data/facilities" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Sport England / Swim England — Facilities tracker</a> — Annual tracking of sports and leisure facility openings and closures. Retrieved 2025.</p>
            <p>Facility closure counts are based on Sport England local authority facilities data and Swim England pool audit. Adult participation from Active Lives Adult Survey (16+, sport at least twice in 28 days). Children's activity from Active Lives Children Survey (age 5–16), measured against CMO 60-minute MVPA daily guideline.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
