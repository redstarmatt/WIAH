'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

// Online gambling gross yield (£bn), 2016–2023
const onlineYieldBn = [3.2, 3.8, 4.2, 4.7, 5.0, 5.5, 6.0, 7.1];
// Betting shops (thousands), 2013–2023
const bettingShopsK = [9.0, 8.9, 8.8, 8.6, 8.4, 8.1, 7.7, 7.2, 6.9, 6.7, 6.7];
// Problem gamblers (thousands), 2017–2023
const problemGamblersK = [430, 440, 420, 410, 415, 425, 430];
// Moderate risk gamblers (thousands), 2017–2023
const moderateRiskK = [1200, 1250, 1280, 1250, 1280, 1300, 1300];

const yieldShopsSeries: Series[] = [
  {
    id: 'online-yield',
    label: 'Online gambling gross yield (£bn)',
    colour: '#6B7280',
    data: onlineYieldBn.map((v, i) => ({ date: new Date(2016 + i, 0, 1), value: v })),
  },
  {
    id: 'betting-shops',
    label: 'Betting shops (thousands)',
    colour: '#264653',
    data: bettingShopsK.map((v, i) => ({ date: new Date(2013 + i, 0, 1), value: v })),
  },
];

const harmSeries: Series[] = [
  {
    id: 'problem-gamblers',
    label: 'Problem gamblers (thousands)',
    colour: '#E63946',
    data: problemGamblersK.map((v, i) => ({ date: new Date(2017 + i, 0, 1), value: v })),
  },
  {
    id: 'moderate-risk',
    label: 'Moderate risk gamblers (thousands)',
    colour: '#F4A261',
    data: moderateRiskK.map((v, i) => ({ date: new Date(2017 + i, 0, 1), value: v })),
  },
];

const yieldAnnotations: Annotation[] = [
  { date: new Date(2019, 0, 1), label: '2019: FOBT stake cut to £2 — shops decline' },
  { date: new Date(2023, 0, 1), label: '2023: Gambling Act White Paper' },
];

const harmAnnotations: Annotation[] = [
  { date: new Date(2021, 0, 1), label: '2021: NHS gambling clinics established' },
];

export default function GamblingPage() {
  return (
    <>
      <TopicNav topic="Gambling" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Gambling"
          question="How Big Is Britain's Gambling Problem?"
          finding="430,000 people in England are problem gamblers. Online gambling gross yield has grown to £7.1 billion. Betting shops have halved since 2013. The 2023 White Paper introduced stake limits — but affordability checks remain delayed."
          colour="#6B7280"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The Gambling Act 2005, drafted in the pre-smartphone era, permitted remote gambling and allowed fixed-odds betting terminals with stakes up to £100 per spin. Online gambling gross yield has since risen from £3.2 billion in 2016–17 to £7.1 billion in 2022–23 — a 121% increase — and now accounts for 51% of all gambling revenue. Some 430,000 people in England meet the clinical threshold for problem gambling, with a further 1.3 million at moderate risk. The suicide rate among problem gamblers is 15 times the national average, and 80% of the most severely affected gamble primarily online. FOBT stake limits cut from £100 to £2 in April 2019 drove roughly 1,400 betting shop closures, with total shop numbers falling from over 9,000 in 2013 to 6,700 by 2023; online slots largely replaced that demand.</p>
            <p>The Gambling Act White Paper of April 2023 — the first major reform in 18 years — introduced online slot stake limits of £2 for under-25s and £5 for adults, and replaced voluntary industry contributions of £10 million with a mandatory £100 million statutory levy for treatment and research. Affordability checks for high-spending customers, the most contested proposal, remain delayed following industry lobbying. Gambling harm does not affect the population equally: problem gambling rates are roughly three times higher in the most deprived neighbourhoods, and betting shops are approximately three times more numerous per capita in the poorest areas. An estimated 60% of gross gambling yield derives from just 5% of customers — those already at risk — meaning the commercial model is structurally dependent on problem gamblers.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Online Yield & Shops' },
          { id: 'sec-chart2', label: 'Problem Gambling' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Problem gamblers (England)"
              value="430k"
              unit=""
              direction="flat"
              polarity="up-is-bad"
              changeText="1.3m at moderate risk · suicide rate 15× higher · 55k young people"
              sparklineData={problemGamblersK.slice(-8)}
              source="NHS / Gambling Commission · Health Survey for England 2023"
              href="#sec-chart2"
            />
            <MetricCard
              label="Online gambling gross yield"
              value="£7.1bn"
              unit="/year"
              direction="up"
              polarity="up-is-bad"
              changeText="Up 121% since 2016/17 · 51% of all gambling yield"
              sparklineData={onlineYieldBn.slice(-8)}
              source="Gambling Commission · Industry Statistics 2023"
              href="#sec-chart1"
            />
            <MetricCard
              label="Betting shops in Great Britain"
              value="6,700"
              unit=""
              direction="down"
              polarity="up-is-bad"
              changeText="Down from 9,000+ in 2013 · FOBT £2 stake limit key driver"
              sparklineData={bettingShopsK.slice(-8)}
              source="Gambling Commission · Licensed premises data 2023"
              href="#sec-chart1"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Online gambling yield and betting shop numbers, 2013–2023"
              subtitle="Online gross yield (grey, £bn) rising as physical betting shops (blue, thousands) decline. Online has more than compensated for the retreat of fixed-odds terminals from the high street."
              series={yieldShopsSeries}
              annotations={yieldAnnotations}
              yLabel="£bn / Thousands"
              source={{ name: 'Gambling Commission', dataset: 'Industry Statistics', url: 'https://www.gamblingcommission.gov.uk/statistics-and-research/publication/industry-statistics', frequency: 'annual', date: '2023' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Problem and moderate-risk gamblers, England, 2017–2023"
              subtitle="Problem gamblers (red) meeting clinical threshold and moderate risk gamblers (amber). Both series show the persistent scale of gambling harm despite regulatory changes."
              series={harmSeries}
              annotations={harmAnnotations}
              yLabel="People (thousands)"
              source={{ name: 'NHS / Gambling Commission', dataset: 'Health Survey for England / Gambling participation survey', url: 'https://www.gamblingcommission.gov.uk/statistics-and-research/publication/gambling-behaviour-in-great-britain', frequency: 'annual', date: '2023' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="£100m mandatory levy replacing voluntary £10m contributions"
            value="£100m"
            unit="mandatory gambling levy from 2025"
            description="The Gambling Act White Paper (April 2023) announced a mandatory statutory levy on gambling operators, replacing voluntary GambleAware contributions of £10 million per year with a compulsory £100 million annually. This will fund treatment, prevention, and research. Stake limits on online slots — £2 for under-25s and £5 for adults — were phased in from September 2024. The Gambling Commission gained enhanced powers to require operators to implement affordability checks. GamStop self-exclusion has 480,000 registered users. NHS specialist gambling clinics now operate in 15 locations."
            source="Source: Gambling Commission — Industry Statistics 2023. DCMS — High Stakes: Gambling Reform White Paper 2023."
          />
        </ScrollReveal>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.gamblingcommission.gov.uk/statistics-and-research/publication/industry-statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Gambling Commission — Industry Statistics</a> — Annual data on gross yield by sector, licensed premises, and market structure. Retrieved 2024.</p>
            <p><a href="https://www.gamblingcommission.gov.uk/statistics-and-research/publication/gambling-behaviour-in-great-britain" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Gambling Commission — Gambling behaviour in Great Britain</a> — Problem gambling prevalence surveys. Retrieved 2024.</p>
            <p>Problem gambling figures use the Problem Gambling Severity Index (PGSI). Gross yield is gross gambling revenue before deductions. Betting shop figures cover Great Britain; Northern Ireland excluded.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
