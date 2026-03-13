'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import PositiveCallout from '@/components/PositiveCallout';
import RelatedTopics from '@/components/RelatedTopics';

// Arts Council England grant-in-aid (£m, real terms 2010 prices), 2010–2024 — ACE
const aceValues = [700, 680, 658, 635, 610, 590, 568, 550, 535, 520, 540, 545, 528, 522, 520];

// Local authority cultural spending (£bn, real terms), 2010–2024 — MHCLG
const localAuthValues = [1.40, 1.32, 1.22, 1.12, 1.03, 0.95, 0.86, 0.80, 0.75, 0.71, 0.68, 0.66, 0.64, 0.63, 0.63];

const series1: Series[] = [
  {
    id: 'ace-real-terms',
    label: 'Arts Council England grant-in-aid (£m, 2010 prices)',
    colour: '#264653',
    data: aceValues.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
  },
];

const series2: Series[] = [
  {
    id: 'local-auth',
    label: 'Local authority cultural spending (£bn, real terms)',
    colour: '#E63946',
    data: localAuthValues.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v * 1000 })),
  },
];

const annotations: Annotation[] = [
  { date: new Date(2010, 0, 1), label: '2010: Spending Review — austerity begins' },
  { date: new Date(2020, 0, 1), label: '2020: COVID Cultural Recovery Fund (temporary uplift)' },
  { date: new Date(2023, 0, 1), label: '2023: ACE portfolio rebalancing — 140 organisations lose funding' },
];

export default function ArtsFundingPage() {
  return (
    <>
      <TopicNav topic="Arts Funding" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Arts Funding"
          question="What has austerity done to Britain's arts?"
          finding="Arts Council England's budget fell 36% in real terms between 2010 and 2024. Local authority arts spending fell 57% over the same period. In 2023, 140 arts organisations lost all their funding in a portfolio rebalancing that disrupted established excellence without adequately building new capacity in underserved areas."
          colour="#264653"
          preposition="with"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The decade of austerity that followed the 2010 Spending Review fell heavily on culture. Arts Council England's grant-in-aid from DCMS was £700 million in 2010 in real terms. By 2024 it had fallen to approximately £520 million — a 36% real-terms reduction over 14 years. This decline translated directly into reduced support for symphony orchestras, touring theatre companies, contemporary dance, visual arts organisations, and the literary sector. Local authorities have made even deeper cuts: MHCLG Revenue Outturn data shows local authority spending on culture, sport, and recreation in England fell from £1.4 billion in 2010/11 to approximately £630 million by 2023/24 — a 57% reduction. More than 800 library branches have closed since 2010. The Music Venue Trust estimates that England had approximately 960 small music venues in 2010 and fewer than 600 by 2024.</p>
            <p>The 2023 ACE portfolio rebalancing — intended to direct more funding outside London and the South East — resulted in 140 organisations losing all their funding, including several with decades of continuous support. English Touring Opera, which had provided affordable opera to regional theatres across England for years, initially lost its entire grant before a partial reversal after a public campaign. Critics noted that the shift gave grants to newer organisations in underserved areas without the infrastructure or track record to absorb and deploy funding effectively, while dismantling networks of touring provision that took years to build. The creative industries, meanwhile, contribute £116 billion to the UK economy. The cultural sector's economic multiplier — every £1 invested generating £4–5 in broader activity — is among the highest of any public investment, but this case has struggled to translate into protected funding given the intensity of competition for public spending.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Arts Council budget' },
          { id: 'sec-chart2', label: 'Local authority spend' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Arts Council England budget (real terms)"
              value="£520M"
              unit="2024"
              direction="down"
              polarity="up-is-good"
              changeText="-36% since 2010 · £700m in 2010 → £520m in 2024"
              sparklineData={aceValues.slice(-8)}
              source="Arts Council England — Annual Report and Accounts 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Local authority cultural spending"
              value="£630M"
              unit="2024"
              direction="down"
              polarity="up-is-good"
              changeText="-57% since 2010 · 800+ libraries closed · venues lost"
              sparklineData={localAuthValues.slice(-8).map(v => Math.round(v * 1000))}
              source="MHCLG — Revenue Outturn Returns 2024"
              href="#sec-chart2"
            />
            <MetricCard
              label="Arts organisations losing all ACE funding"
              value="140"
              unit="2023 portfolio"
              direction="up"
              polarity="up-is-bad"
              changeText="Portfolio rebalancing · English Touring Opera among those affected"
              sparklineData={[5, 8, 12, 20, 35, 40, 80, 140]}
              source="Arts Council England — National Portfolio 2023–2026"
              href="#sec-chart1"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Arts Council England grant-in-aid, 2010–2024 (real terms, £m)"
              subtitle="Grant-in-aid from DCMS deflated to 2010 prices using HM Treasury GDP deflator. Excludes National Lottery distribution. Steady real-terms decline with brief COVID uplift."
              series={series1}
              annotations={annotations}
              yLabel="£m (2010 prices)"
              source={{ name: 'Arts Council England', dataset: 'Annual Report and Accounts', url: 'https://www.artscouncil.org.uk/publication-types/annual-report', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Local authority cultural spending, England, 2010–2024 (real terms, £m)"
              subtitle="Revenue expenditure on culture, sport, and recreation deflated to 2010 prices. Down 57% since the 2010 Spending Review — libraries, museums, and arts centres have borne most of the reduction."
              series={series2}
              annotations={[{ date: new Date(2010, 0, 1), label: '2010: Austerity — local authority budgets cut' }]}
              yLabel="£m (2010 prices)"
              source={{ name: 'MHCLG', dataset: 'Revenue Outturn (RO) Returns — Culture and Recreation', url: 'https://www.gov.uk/government/collections/local-authority-revenue-expenditure-and-financing', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Creative industries contribute £116bn — the economic case for arts funding"
            value="£116bn"
            unit="creative industries contribution to UK GDP"
            description="Creative industries contribute £116 billion to the UK economy — roughly 6% of GDP — and are among the fastest-growing sectors in the economy. Independent analysis consistently finds that every £1 in public arts investment generates £4–5 in broader economic activity through tourism, supply chains, and community wellbeing. The UK's global creative reputation remains exceptional: British film, music, theatre, games, and fashion industries are among the most successful in the world. The Cultural Recovery Fund, launched during COVID-19, provided £2 billion in emergency support and demonstrated that targeted investment can sustain cultural infrastructure through crisis. Arts Council England's Investment Principles 2023–2026 commit to reaching more people outside London, with a focus on areas with limited existing provision — a genuine ambition, though its delivery has been contested."
            source="Source: DCMS — Creative Industries Economic Estimates 2024. Arts Council England — Investment Principles 2023–2026."
          />
        </ScrollReveal>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.artscouncil.org.uk/publication-types/annual-report" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Arts Council England — Annual Report and Accounts</a> — published annually. Grant-in-aid figures are the government grant from DCMS, excluding National Lottery distribution. Deflated to 2010 prices using the HM Treasury GDP deflator series.</p>
            <p><a href="https://www.gov.uk/government/collections/local-authority-revenue-expenditure-and-financing" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">MHCLG — Revenue Outturn (RO) Returns</a> — annual. Spending on culture, recreation, and libraries classified under service code E. Deflated to 2010 prices. Covers England only; excludes capital spending.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
