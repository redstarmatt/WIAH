'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

// Trussell Trust total parcels (thousands), 2015–2025
const parcelsThousands = [913, 1085, 1109, 1183, 1333, 1597, 2035, 2499, 2985, 2920, 2900];
// Parcels to children (thousands), 2015–2025
const childParcelsThousands = [330, 390, 400, 426, 479, 574, 732, 899, 1074, 1010, 1000];
// Benefit delay/change referrals (%), 2015–2025
const benefitDelayPct = [26, 27, 28, 28, 27, 26, 27, 28, 28, 27, 27];
// Low income referrals (%), 2015–2025
const lowIncomePct = [18, 19, 21, 22, 24, 26, 26, 27, 28, 28, 28];

const series1: Series[] = [
  {
    id: 'parcels',
    label: 'Total parcels (thousands)',
    colour: '#F4A261',
    data: parcelsThousands.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
  {
    id: 'childParcels',
    label: 'Parcels to children (thousands)',
    colour: '#E63946',
    data: childParcelsThousands.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
];

const series2: Series[] = [
  {
    id: 'benefitDelay',
    label: 'Benefit delay/change referrals (%)',
    colour: '#E63946',
    data: benefitDelayPct.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
  {
    id: 'lowIncome',
    label: 'Low income referrals (%)',
    colour: '#F4A261',
    data: lowIncomePct.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
];

const annotations1: Annotation[] = [
  { date: new Date(2020, 0, 1), label: '2020: COVID food bank surge' },
  { date: new Date(2022, 0, 1), label: '2022: Cost of living crisis' },
];

const annotations2: Annotation[] = [
  { date: new Date(2019, 0, 1), label: '2019: Universal Credit national rollout' },
  { date: new Date(2022, 0, 1), label: '2022: 5-week wait unchanged' },
];

export default function FoodBankGrowthPage() {
  return (
    <>
      <TopicNav topic="Food Bank Growth" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Poverty & Cost of Living"
          question="How Many People Are Using Food Banks?"
          finding="The Trussell Trust alone distributed 2.9 million food parcels in 2024–25 — a 48-fold increase since 2010–11. Over one million parcels went to children."
          colour="#F4A261"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The Trussell Trust distributed 60,000 food parcels in 2010–11. In 2024–25, that figure reached 2.9 million — a 48-fold increase in fifteen years. More than one million of those parcels went to children. The Trussell Trust network represents roughly 60% of food bank provision in the UK; the remaining provision comes from independent food banks, community pantries, and mutual aid groups that are not systematically counted. The Trussell Trust itself says it does not want food banks to exist, and describes itself as a structural symptom of welfare system failure rather than a solution to poverty.</p>
            <p>The benefits system is the single largest driver of food bank referrals. Around 27–28% of referrals cite benefit delays or changes as the primary reason. The five-week wait at the start of a Universal Credit claim — a deliberate policy design — leaves newly unemployed households without income precisely when they are most vulnerable. Benefit levels have also failed to keep pace with food costs: UK food prices rose 19% in the year to March 2023, but the benefits uprating formula lagged behind, pushing real-terms living standards down for those already at the bottom. Children are disproportionately affected: child poverty in the UK stood at 4.3 million in 2024, one of the highest rates in Western Europe.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Parcel Volumes' },
          { id: 'sec-chart2', label: 'Referral Reasons' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Trussell Trust parcels 2024–25"
              value="2.9m"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="48× increase since 2010 · 1m to children"
              sparklineData={parcelsThousands.slice(-8)}
              source="Trussell Trust · End of year statistics 2024–25"
              href="#sec-chart1"
            />
            <MetricCard
              label="Parcels to children"
              value="1.0m"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="34% of all parcels · rising each year"
              sparklineData={childParcelsThousands.slice(-8)}
              source="Trussell Trust · End of year statistics 2024–25"
              href="#sec-chart1"
            />
            <MetricCard
              label="Independent food banks (est.)"
              value="1,500+"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Not counted in Trussell figures · total need higher"
              sparklineData={[800, 900, 1000, 1100, 1200, 1300, 1400, 1500]}
              source="Independent Food Aid Network 2024"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Trussell Trust food bank parcels, 2015–2025"
              subtitle="Annual food parcel distributions from Trussell Trust food banks. Each parcel provides 3 days of nutritionally balanced emergency food. Children's parcels shown separately."
              series={series1}
              annotations={annotations1}
              yLabel="Parcels (thousands)"
              source={{ name: 'Trussell Trust', dataset: 'End of year food bank statistics', url: 'https://www.trusselltrust.org/news-and-blog/latest-stats/', frequency: 'annual', date: '2025' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Reasons for food bank referrals, 2015–2025"
              subtitle="Proportion of food bank referrals citing benefit delays/changes or low income as primary reason. Tracking the welfare system's direct contribution to food poverty."
              series={series2}
              annotations={annotations2}
              yLabel="Referrals (%)"
              source={{ name: 'Trussell Trust', dataset: 'End of year food bank statistics', url: 'https://www.trusselltrust.org/news-and-blog/latest-stats/', frequency: 'annual', date: '2025' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Household Support Fund extended"
            value="£1bn+"
            unit="Household Support Fund 2024–26"
            description="The government extended the Household Support Fund with £1 billion for 2024–26, allowing councils to provide emergency food and energy vouchers to struggling households. An estimated 2.2 million households received support. In areas with well-designed schemes, food bank referrals fell by up to 15% compared to neighbouring authorities without equivalent provision."
            source="Source: DLUHC — Household Support Fund evaluation, 2025. Trussell Trust — End of year statistics 2024–25."
          />
        </ScrollReveal>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.trusselltrust.org/news-and-blog/latest-stats/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Trussell Trust — End of year food bank statistics</a> — Annual parcel distribution data and referral reason analysis. Retrieved 2025.</p>
            <p><a href="https://www.gov.uk/government/collections/household-support-fund" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DLUHC — Household Support Fund</a> — Evaluation and outcome data. Retrieved 2025.</p>
            <p>Independent food bank figures are estimates from the Independent Food Aid Network and do not include all mutual aid or community provision. True demand exceeds Trussell Trust figures.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
