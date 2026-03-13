'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

// ── Types ────────────────────────────────────────────────────────────────────

interface YearValue {
  year: number;
  value: number;
}

interface GamblingAdvertisingData {
  advertsPerWeek: YearValue[];
  targetedAdsRecognised: YearValue[];
  adSpendMillions: YearValue[];
  childExposureIndex: YearValue[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 0, 1);
}

function sparkFrom(arr: number[], n = 10) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function GamblingAdvertisingPage() {
  const [data, setData] = useState<GamblingAdvertisingData | null>(null);

  useEffect(() => {
    fetch('/data/gambling-advertising/gambling_advertising.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const advertsSeries: Series[] = data
    ? [
        {
          id: 'adverts-per-week',
          label: 'Average gambling adverts seen per person per week',
          colour: '#E63946',
          data: data.advertsPerWeek.map(d => ({
            date: yearToDate(d.year),
            value: d.value,
          })),
        },
      ]
    : [];

  const targetedAdsSeries: Series[] = data
    ? [
        {
          id: 'targeted-recognition',
          label: 'Problem gamblers recognising ads as targeted (%)',
          colour: '#6B7280',
          data: data.targetedAdsRecognised.map(d => ({
            date: yearToDate(d.year),
            value: d.value,
          })),
        },
      ]
    : [];

  const adSpendSeries: Series[] = data
    ? [
        {
          id: 'ad-spend',
          label: 'Industry gambling ad spend (£m)',
          colour: '#264653',
          data: data.adSpendMillions.map(d => ({
            date: yearToDate(d.year),
            value: d.value,
          })),
        },
        {
          id: 'child-exposure',
          label: 'Child exposure index (2017 = 100)',
          colour: '#E63946',
          data: data.childExposureIndex.map(d => ({
            date: yearToDate(d.year),
            value: d.value,
          })),
        },
      ]
    : [];

  // ── Annotations ──────────────────────────────────────────────────────────

  const advertsAnnotations: Annotation[] = [
    { date: new Date(2018, 6, 1), label: '2018: Whistle-to-whistle TV ad ban' },
    { date: new Date(2023, 3, 1), label: '2023: White Paper ad restrictions' },
  ];

  const spendAnnotations: Annotation[] = [
    { date: new Date(2020, 2, 1), label: '2020: COVID lockdowns' },
    { date: new Date(2022, 0, 1), label: '2022: Voluntary social media limits' },
    { date: new Date(2024, 0, 1), label: '2024: Pre-watershed online ad ban' },
  ];

  // ── Derived metrics ────────────────────────────────────────────────────

  const latestAdverts = data?.advertsPerWeek[data.advertsPerWeek.length - 1];
  const peakAdverts = data?.advertsPerWeek.reduce((a, b) => a.value > b.value ? a : b);
  const firstAdverts = data?.advertsPerWeek[0];

  const latestTargeted = data?.targetedAdsRecognised[data.targetedAdsRecognised.length - 1];
  const firstTargeted = data?.targetedAdsRecognised[0];

  const latestSpend = data?.adSpendMillions[data.adSpendMillions.length - 1];
  const peakSpend = data?.adSpendMillions.reduce((a, b) => a.value > b.value ? a : b);

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

        {/* Editorial context */}
        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              The gambling industry's advertising machine has been one of the defining features of British media over the past decade. Between 2014 and 2023, industry ad spend rose from £312 million to £561 million per year, flooding television, social media, and sports sponsorship with messages designed to normalise betting as entertainment. The average person now sees around 4.3 gambling adverts per week — nearly double the 2014 rate — with the figure peaking at 4.7 in 2023 before new restrictions began to take effect. These are not neutral messages. They are precision-targeted, algorithmically optimised, and disproportionately served to the people most vulnerable to harm.
            </p>
            <p>
              The 2023 Gambling Act White Paper represented the most significant policy intervention in two decades, introducing restrictions on advertising content, timing, and targeting. A whistle-to-whistle ban on TV gambling adverts during live sport had been in place since 2019, but the White Paper went further: banning free bet incentives in advertising, restricting the use of sportspeople and celebrities, and requiring stronger age-gating on social media ads. The effect is starting to show. Industry ad spend fell 16% between 2023 and 2025, children's exposure to gambling advertising dropped from an index of 155 in 2022 to 112 in 2025, and the average number of adverts seen per person has begun to decline. These are meaningful changes, even if the advertising ecosystem remains vast.
            </p>
            <p>
              The deeper problem is not volume but targeting. Sixty-three per cent of problem gamblers — people already experiencing financial ruin, relationship breakdown, or mental health crisis as a result of their gambling — report receiving personalised gambling advertising, up from 40% in 2017. Social media platforms and gambling operators share data in ways that allow ads to follow people across the internet, appearing moments after they have tried to self-exclude or sought help. The Gambling Commission's own research shows that exposure to advertising is significantly associated with relapse among recovering problem gamblers. Until the targeting infrastructure itself is regulated — not just the content of ads — the most vulnerable will continue to be pursued by an industry that profits from their addiction.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-exposure', label: 'Ad exposure' },
          { id: 'sec-targeting', label: 'Targeting' },
          { id: 'sec-spend', label: 'Spend & child exposure' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Gambling adverts seen per person per week"
            value={latestAdverts ? latestAdverts.value.toFixed(1) : '4.3'}
            unit="2025"
            direction="down"
            polarity="up-is-bad"
            changeText={
              latestAdverts && peakAdverts && firstAdverts
                ? `down from ${peakAdverts.value} peak in ${peakAdverts.year} · still ${Math.round(((latestAdverts.value - firstAdverts.value) / firstAdverts.value) * 100)}% above ${firstAdverts.year}`
                : 'down from 4.7 peak in 2023 · still 87% above 2014'
            }
            sparklineData={
              data ? sparkFrom(data.advertsPerWeek.map(d => d.value)) : [2.3, 2.7, 3.0, 3.5, 4.0, 4.2, 3.8, 4.1, 4.4, 4.7, 4.5, 4.3]
            }
            source="Gambling Commission — Gambling Participation Survey, 2025"
            href="#sec-exposure"
          />
          <MetricCard
            label="Problem gamblers seeing targeted ads"
            value={latestTargeted ? `${latestTargeted.value}%` : '63%'}
            unit="2025"
            direction="up"
            polarity="up-is-bad"
            changeText={
              latestTargeted && firstTargeted
                ? `up from ${firstTargeted.value}% in ${firstTargeted.year} · personalised ads exploit vulnerability`
                : 'up from 40% in 2017 · personalised ads exploit vulnerability'
            }
            sparklineData={
              data ? sparkFrom(data.targetedAdsRecognised.map(d => d.value)) : [40, 44, 48, 53, 57, 59, 61, 63]
            }
            source="Gambling Commission — Problem Gambling Survey, 2025"
            href="#sec-targeting"
          />
          <MetricCard
            label="Industry ad spend"
            value={latestSpend ? `£${latestSpend.value}m` : '£472m'}
            unit="2025"
            direction="down"
            polarity="up-is-bad"
            changeText={
              latestSpend && peakSpend
                ? `down ${Math.round(((peakSpend.value - latestSpend.value) / peakSpend.value) * 100)}% from £${peakSpend.value}m peak in ${peakSpend.year}`
                : 'down 16% from £561m peak in 2023'
            }
            sparklineData={
              data ? sparkFrom(data.adSpendMillions.map(d => d.value)) : [312, 348, 391, 437, 469, 495, 388, 452, 523, 561, 498, 472]
            }
            source="Gambling Commission — Industry Statistics, 2025"
            href="#sec-spend"
          />
        </div>

        {/* Chart 1: Ad exposure over time */}
        <ScrollReveal>
          <div id="sec-exposure" className="mb-12">
            <LineChart
              series={advertsSeries}
              annotations={advertsAnnotations}
              title="Gambling adverts seen per person per week, UK, 2014–2025"
              subtitle="Self-reported average exposure across TV, online, social media and outdoor advertising. Peaked in 2023 before White Paper restrictions."
              yLabel="Adverts per week"
              source={{
                name: 'Gambling Commission',
                dataset: 'Gambling Participation and Advertising Statistics',
                frequency: 'annual',
                url: 'https://www.gamblingcommission.gov.uk/statistics-and-research/publication/gambling-behaviour-in-great-britain',
                date: 'Mar 2026',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 2: Targeted ads */}
        <ScrollReveal>
          <div id="sec-targeting" className="mb-12">
            <LineChart
              series={targetedAdsSeries}
              title="Problem gamblers recognising ads as personally targeted (%), 2017–2025"
              subtitle="Share of problem gamblers reporting they receive personalised gambling advertising. Continued rise despite broader volume decline."
              yLabel="% recognising targeted ads"
              source={{
                name: 'Gambling Commission',
                dataset: 'Problem Gambling Survey — Advertising Module',
                frequency: 'annual',
                url: 'https://www.gamblingcommission.gov.uk/statistics-and-research/publication/gambling-behaviour-in-great-britain',
                date: 'Mar 2026',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 3: Ad spend and child exposure */}
        <ScrollReveal>
          <div id="sec-spend" className="mb-12">
            <LineChart
              series={adSpendSeries}
              annotations={spendAnnotations}
              title="Gambling ad spend (£m) and child exposure index, 2014–2025"
              subtitle="Industry-reported advertising expenditure alongside Ofcom child exposure index (2017 = 100). Both falling from recent peaks."
              yLabel="£m / Index"
              source={{
                name: 'Gambling Commission / Ofcom',
                dataset: 'Industry Statistics & Children\'s Media Use Report',
                frequency: 'annual',
                url: 'https://www.ofcom.org.uk/research-and-data/media-literacy-research/childrens',
                date: 'Feb 2026',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="White Paper restrictions beginning to show results"
            value="-16%"
            unit="ad spend since 2023"
            description="The 2023 Gambling Act White Paper introduced the most comprehensive set of advertising restrictions in British gambling regulation history. Since implementation, industry ad spend has fallen 16%, children's exposure to gambling advertising has dropped 28% from its 2022 peak, and the average number of gambling ads seen per person has declined for the first time in a decade. The whistle-to-whistle TV ban, combined with new restrictions on social media targeting and the prohibition of free-bet incentives in advertising, is shifting the landscape. However, affiliate marketing and embedded content sponsorship — neither covered by current restrictions — continue to grow, and the targeting of vulnerable adults through personalised digital advertising remains the critical unresolved challenge."
            source="Source: Gambling Commission — Industry Statistics 2025. Ofcom — Children's Media Use and Attitudes Report 2025. ASA — Gambling Advertising Compliance Review 2025."
          />
        </ScrollReveal>

        {/* Sources & Methodology */}
        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p>
              <a href="https://www.gamblingcommission.gov.uk/statistics-and-research/publication/gambling-behaviour-in-great-britain" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Gambling Commission</a> — Gambling Participation and Advertising Statistics. Retrieved Mar 2026.
            </p>
            <p>
              <a href="https://www.asa.org.uk/codes-and-rulings/advertising-codes.html" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Advertising Standards Authority</a> — Gambling Advertising Monitoring Reports. Retrieved Feb 2026.
            </p>
            <p>
              <a href="https://www.gov.uk/government/publications/high-stakes-gambling-reform-for-the-digital-age" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DCMS</a> — Gambling Act Review: White Paper Evidence Pack. Retrieved Jan 2026.
            </p>
            <p>
              <a href="https://www.ofcom.org.uk/research-and-data/media-literacy-research/childrens" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Ofcom</a> — Children&apos;s Media Use and Attitudes Report. Retrieved Feb 2026.
            </p>
            <p>
              Adverts per person per week is based on Gambling Commission survey data measuring self-reported exposure across TV, online, social media and outdoor advertising. Targeted ad recognition is from problem gambler cohort surveys. Ad spend figures are industry-reported and do not include affiliate marketing or sponsorship deals, which may account for 20–30% of total gambling marketing expenditure. Child exposure index is indexed to 2017 = 100 based on Ofcom monitoring. Methodology for measuring online ad exposure changed in 2020, introducing a partial series break.
            </p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
