'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import PositiveCallout from '@/components/PositiveCallout';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

// Public vs private sector real wage index (2015 = 100), 2015–2025 — ONS ASHE
const publicSectorIndex = [100, 99, 98, 97, 96, 97, 98, 94, 91, 92, 94];
const privateSectorIndex = [100, 101, 103, 105, 107, 109, 110, 105, 103, 105, 107];

// Top decile vs bottom decile real earnings index (2015 = 100), 2015–2025 — ONS ASHE
const top10Index = [100, 101, 103, 105, 107, 110, 111, 107, 105, 108, 110];
const bottom10Index = [100, 102, 105, 108, 111, 113, 114, 106, 103, 107, 109];

const chart1Series: Series[] = [
  {
    id: 'public-sector',
    label: 'Public sector real wage index (2015=100)',
    colour: '#264653',
    data: publicSectorIndex.map((v, i) => ({ date: new Date(2015 + i, 5, 1), value: v })),
  },
  {
    id: 'private-sector',
    label: 'Private sector real wage index (2015=100)',
    colour: '#2A9D8F',
    data: privateSectorIndex.map((v, i) => ({ date: new Date(2015 + i, 5, 1), value: v })),
  },
];

const chart2Series: Series[] = [
  {
    id: 'top-decile',
    label: 'Top decile real earnings index',
    colour: '#2A9D8F',
    data: top10Index.map((v, i) => ({ date: new Date(2015 + i, 5, 1), value: v })),
  },
  {
    id: 'bottom-decile',
    label: 'Bottom decile real earnings index',
    colour: '#E63946',
    data: bottom10Index.map((v, i) => ({ date: new Date(2015 + i, 5, 1), value: v })),
  },
];

const chart1Annotations: Annotation[] = [
  { date: new Date(2022, 5, 1), label: '2022: Inflation peaks, real wages fall' },
  { date: new Date(2023, 5, 1), label: '2023: Public sector strikes' },
];

const chart2Annotations: Annotation[] = [
  { date: new Date(2016, 5, 1), label: '2016: National Living Wage introduced' },
];

export default function EarningsBySectorPage() {
  return (
    <>
      <TopicNav topic="Economy & Work" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Economy & Work"
          question="Which Jobs Are Actually Keeping Up With Inflation?"
          finding="Real wages in most sectors remain below their 2008 peak. Public sector workers have seen 12% real-terms cuts since 2010, while private sector financial services recovered fully. Real wages finally turned positive in 2024."
          colour="#6B7280"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Real wages in the UK experienced one of the longest sustained squeezes since the Industrial Revolution following the 2008 financial crisis. By 2022, the public sector was worse off in real terms than in 2010 — a 12% real-terms cut driven by extended pay freezes and high inflation. The private sector fared better overall, but outcomes varied enormously: financial services workers recovered to their 2008 peak, while retail, hospitality, and social care workers remained significantly below. The National Living Wage, introduced in 2016, provided meaningful support for the lowest-paid but could not compensate for the structural compression of real wages across the economy.</p>
            <p>The 2022 inflation surge — peaking at 11% — compressed real wages across all sectors. Public sector workers, already behind, suffered a further real-terms cut; many sectors saw the largest annual falls in real pay in a generation. Strikes across the NHS, railways, education, and civil service reflected the tension between pay caps and rising living costs. From late 2023, nominal pay growth exceeded inflation and real wages turned positive for most workers — but few had recovered the ground lost since 2010. Workers on the National Living Wage benefited from the April 2024 rise to £11.44 per hour.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Sector comparison' },
          { id: 'sec-chart2', label: 'Earnings inequality' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Public sector real wage vs 2015"
              value="-6%"
              unit=""
              direction="flat"
              polarity="up-is-good"
              changeText="Recovering from -9% peak in 2022 · still negative"
              sparklineData={[100, 99, 98, 97, 96, 97, 94, 91, 92, 94]}
              source="ONS · Annual Survey of Hours and Earnings 2025"
              href="#sec-chart1"
            />
            <MetricCard
              label="Private sector real wage vs 2015"
              value="+7%"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="Recovery led by financial services · broad recovery in 2024"
              sparklineData={[100, 101, 103, 105, 107, 109, 105, 103, 105, 107]}
              source="ONS · Annual Survey of Hours and Earnings 2025"
              href="#sec-chart1"
            />
            <MetricCard
              label="National Living Wage April 2024"
              value="£11.44"
              unit="/hr"
              direction="up"
              polarity="up-is-good"
              changeText="10% rise · largest ever · up from £10.42 in 2023"
              sparklineData={[7.20, 7.50, 7.83, 8.21, 8.72, 8.91, 9.50, 9.90, 10.42, 11.44]}
              source="Low Pay Commission · NLW rate 2024"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Real wage growth by sector, UK, 2015–2025"
              subtitle="Median real weekly earnings indexed to 2015 = 100. Public sector persistently behind private sector."
              series={chart1Series}
              annotations={chart1Annotations}
              yLabel="Index (2015=100)"
              source={{ name: 'ONS', dataset: 'Annual Survey of Hours and Earnings', url: 'https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/earningsandworkinghours/bulletins/annualsurveyofhoursandearnings/latest', frequency: 'annual', date: '2025' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Real earnings by income decile, UK, 2015–2025"
              subtitle="Real wage index for highest and lowest earners. Bottom decile squeeze was more severe; National Living Wage has narrowed the gap."
              series={chart2Series}
              annotations={chart2Annotations}
              yLabel="Index (2015=100)"
              source={{ name: 'ONS', dataset: 'Annual Survey of Hours and Earnings', url: 'https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/earningsandworkinghours/bulletins/annualsurveyofhoursandearnings/latest', frequency: 'annual', date: '2025' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Real wages above inflation in 2024"
            value="+2.4%"
            unit="real wage growth in 2024"
            description="Real wages grew 2.4% in 2024 as inflation fell while nominal pay growth remained elevated. Workers on the National Living Wage saw a 10% increase in April 2024 — the largest ever annual rise — protecting the lowest-paid from the worst of the cost of living crisis. Nominal pay growth averaged 5.8% across 2024, comfortably ahead of the 2.7% CPI rate."
            source="Source: ONS — Annual Survey of Hours and Earnings 2025. Low Pay Commission — NLW recommendations 2024."
          />
        </ScrollReveal>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/earningsandworkinghours/bulletins/annualsurveyofhoursandearnings/latest" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ONS — Annual Survey of Hours and Earnings (ASHE)</a> — annual survey of earnings by sector, occupation, and region. Real wages deflated by CPI.</p>
            <p><a href="https://www.gov.uk/government/organisations/low-pay-commission" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Low Pay Commission</a> — National Living Wage and National Minimum Wage rates and recommendations.</p>
            <p>Public and private sector classifications follow ONS standard industry codes. Real wage indices use 2015 as base year. Sector comparisons are for median full-time employees.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
