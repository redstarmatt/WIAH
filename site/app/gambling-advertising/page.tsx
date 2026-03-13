'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

// Gambling adverts seen per person per week, 2014–2025
const advertsPerWeek = [2.3, 2.7, 3.0, 3.5, 4.0, 4.2, 3.8, 4.1, 4.4, 4.7, 4.5, 4.3];
// Industry ad spend (£m), 2014–2025
const adSpendMillion = [312, 348, 391, 437, 469, 495, 388, 452, 523, 561, 498, 472];
// Problem gamblers recognising targeted ads (%), 2017–2025
const targetedAdsPct = [40, 44, 48, 53, 57, 59, 61, 63, 63];
// Child exposure index (2017 = 100), 2017–2025
const childExposureIndex = [100, 115, 125, 140, 150, 155, 145, 130, 112];

const exposureSeries: Series[] = [
  {
    id: 'adverts-per-week',
    label: 'Gambling adverts seen per person per week',
    colour: '#E63946',
    data: advertsPerWeek.map((v, i) => ({ date: new Date(2014 + i, 0, 1), value: v })),
  },
];

const spendChildSeries: Series[] = [
  {
    id: 'ad-spend',
    label: 'Industry gambling ad spend (£m)',
    colour: '#264653',
    data: adSpendMillion.map((v, i) => ({ date: new Date(2014 + i, 0, 1), value: v })),
  },
  {
    id: 'child-exposure',
    label: 'Child exposure index (2017 = 100)',
    colour: '#E63946',
    data: childExposureIndex.map((v, i) => ({ date: new Date(2017 + i, 0, 1), value: v })),
  },
];

const exposureAnnotations: Annotation[] = [
  { date: new Date(2019, 0, 1), label: '2019: Whistle-to-whistle TV ad ban during live sport' },
  { date: new Date(2023, 0, 1), label: '2023: White Paper ad restrictions' },
];

const spendAnnotations: Annotation[] = [
  { date: new Date(2020, 0, 1), label: '2020: COVID lockdowns' },
  { date: new Date(2022, 0, 1), label: '2022: Voluntary social media limits' },
  { date: new Date(2024, 0, 1), label: '2024: Pre-watershed online ad ban' },
];

export default function GamblingAdvertisingPage() {
  return (
    <>
      <TopicNav topic="Gambling Advertising" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Gambling Advertising"
          question="Is Gambling Advertising Out of Control?"
          finding="Gambling ad spend peaked at £561 million in 2023 before new restrictions brought it down. But 63% of problem gamblers still report receiving personalised advertising that exploits their vulnerability, and children's exposure remains well above 2017 levels."
          colour="#E63946"
          preposition="with"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The gambling industry's advertising machine has been one of the defining features of British media over the past decade. Between 2014 and 2023, industry ad spend rose from £312 million to £561 million per year, flooding television, social media, and sports sponsorship with messages designed to normalise betting as entertainment. The average person now sees around 4.3 gambling adverts per week — nearly double the 2014 rate — with the figure peaking at 4.7 in 2023 before new restrictions began to take effect. These are not neutral messages. They are precision-targeted, algorithmically optimised, and disproportionately served to the people most vulnerable to harm.</p>
            <p>The 2023 Gambling Act White Paper represented the most significant policy intervention in two decades, introducing restrictions on advertising content, timing, and targeting. A whistle-to-whistle ban on TV gambling adverts during live sport had been in place since 2019, but the White Paper went further: banning free bet incentives in advertising, restricting the use of sportspeople and celebrities, and requiring stronger age-gating on social media ads. Industry ad spend fell 16% between 2023 and 2025, children's exposure dropped from an index of 155 in 2022 to 112 in 2025, and the average number of adverts seen per person has begun to decline. The deeper problem is not volume but targeting: 63% of problem gamblers report receiving personalised gambling advertising, up from 40% in 2017, as social media platforms and operators share data to follow vulnerable users across the internet.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Ad Exposure' },
          { id: 'sec-chart2', label: 'Spend & Children' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Gambling adverts per person per week"
              value="4.3"
              unit="2025"
              direction="down"
              polarity="up-is-bad"
              changeText="Down from 4.7 peak in 2023 · still 87% above 2014 level"
              sparklineData={advertsPerWeek.slice(-8)}
              source="Gambling Commission · Participation Survey 2025"
              href="#sec-chart1"
            />
            <MetricCard
              label="Problem gamblers seeing targeted ads"
              value="63%"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Up from 40% in 2017 · personalised ads exploit vulnerability"
              sparklineData={targetedAdsPct.slice(-8)}
              source="Gambling Commission · Problem Gambling Survey 2025"
              href="#sec-chart1"
            />
            <MetricCard
              label="Industry gambling ad spend"
              value="£472m"
              unit="2025"
              direction="down"
              polarity="up-is-bad"
              changeText="Down 16% from £561m peak in 2023"
              sparklineData={adSpendMillion.slice(-8)}
              source="Gambling Commission · Industry Statistics 2025"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Gambling adverts seen per person per week, UK, 2014–2025"
              subtitle="Self-reported average exposure across TV, online, social media and outdoor advertising. Peaked in 2023 before White Paper restrictions; still nearly double the 2014 level."
              series={exposureSeries}
              annotations={exposureAnnotations}
              yLabel="Adverts per week"
              source={{ name: 'Gambling Commission', dataset: 'Gambling Participation and Advertising Statistics', url: 'https://www.gamblingcommission.gov.uk/statistics-and-research/publication/gambling-behaviour-in-great-britain', frequency: 'annual', date: '2025' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Gambling ad spend (£m) and child exposure index, 2014–2025"
              subtitle="Industry-reported advertising expenditure (blue, £m) alongside Ofcom child exposure index (red, 2017 = 100). Both falling from recent peaks following White Paper restrictions."
              series={spendChildSeries}
              annotations={spendAnnotations}
              yLabel="£m / Index"
              source={{ name: 'Gambling Commission / Ofcom', dataset: "Industry Statistics / Children's Media Use Report", url: 'https://www.ofcom.org.uk/research-and-data/media-literacy-research/childrens', frequency: 'annual', date: '2025' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="White Paper restrictions beginning to show results"
            value="-16%"
            unit="ad spend since 2023 peak"
            description="The 2023 Gambling Act White Paper introduced the most comprehensive set of advertising restrictions in British gambling regulation history. Since implementation, industry ad spend has fallen 16%, children's exposure to gambling advertising has dropped 28% from its 2022 peak, and the average number of gambling ads seen per person has declined for the first time in a decade. The whistle-to-whistle TV ban, combined with new restrictions on social media targeting and the prohibition of free-bet incentives in advertising, is shifting the landscape. However, affiliate marketing and embedded content sponsorship remain outside current restrictions, and the targeting of vulnerable adults through personalised digital advertising remains the critical unresolved challenge."
            source="Source: Gambling Commission — Industry Statistics 2025. Ofcom — Children's Media Use and Attitudes Report 2025. ASA — Gambling Advertising Compliance Review 2025."
          />
        </ScrollReveal>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.gamblingcommission.gov.uk/statistics-and-research/publication/gambling-behaviour-in-great-britain" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Gambling Commission — Gambling Participation and Advertising Statistics</a> — Annual survey data on ad exposure and problem gambler targeting. Retrieved March 2026.</p>
            <p><a href="https://www.ofcom.org.uk/research-and-data/media-literacy-research/childrens" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Ofcom — Children's Media Use and Attitudes Report</a> — Child exposure index methodology. Retrieved February 2026.</p>
            <p><a href="https://www.gov.uk/government/publications/high-stakes-gambling-reform-for-the-digital-age" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DCMS — Gambling Act Review White Paper</a> — Policy evidence pack and regulatory impact assessments. Retrieved January 2026.</p>
            <p>Adverts per person per week is based on Gambling Commission survey data measuring self-reported exposure across TV, online, social media and outdoor advertising. Ad spend figures are industry-reported and do not include affiliate marketing, which may account for 20–30% of total gambling marketing expenditure. Child exposure index is indexed to 2017 = 100 based on Ofcom monitoring. Methodology for measuring online ad exposure changed in 2020, introducing a partial series break.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
