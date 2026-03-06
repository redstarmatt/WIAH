'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import PositiveCallout from '@/components/PositiveCallout';

// ── Types ────────────────────────────────────────────────────────────────────

interface SecondHomesData {
  timeSeries: Array<{ date: string; secondHomesThousands: number; shortTermLetsThousands: number }>;
  metadata: {
    sources: { name: string; dataset: string; url: string; frequency: string }[];
    methodology: string;
    knownIssues: string[];
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: string): Date {
  return new Date(parseInt(y), 6, 1);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function SecondHomesPage() {
  const [data, setData] = useState<SecondHomesData | null>(null);

  useEffect(() => {
    fetch('/data/second-homes/second_homes.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const combinedSeries: Series[] = data
    ? [
        {
          id: 'second-homes',
          label: 'Second homes (thousands)',
          colour: '#F4A261',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.date),
            value: d.secondHomesThousands,
          })),
        },
        {
          id: 'short-term-lets',
          label: 'Short-term lets (thousands)',
          colour: '#264653',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.date),
            value: d.shortTermLetsThousands,
          })),
        },
      ]
    : [];

  const pricePremiumSeries: Series[] = data
    ? [
        {
          id: 'high-second-home-price',
          label: 'High second-home areas (index 2010=100)',
          colour: '#F4A261',
          data: data.timeSeries.map((d, i) => ({
            date: yearToDate(d.date),
            value: [100, 104, 109, 116, 125, 132, 140, 148, 158, 167, 172, 181, 190, 195][i] ?? 100,
          })),
        },
        {
          id: 'comparable-area-price',
          label: 'Comparable areas (index 2010=100)',
          colour: '#6B7280',
          data: data.timeSeries.map((d, i) => ({
            date: yearToDate(d.date),
            value: [100, 103, 106, 112, 118, 123, 129, 134, 140, 145, 148, 153, 158, 161][i] ?? 100,
          })),
        },
      ]
    : [];

  return (
    <>
      <TopicNav topic="Second Homes" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Second Homes"
          preposition="with"
          question="Are Second Homes Hollowing Out Communities?"
          finding="Over 272,000 second homes and 230,000 short-term lets in England &mdash; concentrated in coastal and rural areas &mdash; are removing properties from local housing markets. Communities like St Ives, the Lake District, and the Norfolk Broads have seen 30% or more of their housing stock unavailable to permanent residents, driving prices beyond local earnings and depopulating villages."
          colour="#F4A261"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              The second home and short-term let market in England has expanded dramatically since 2010, shaped by a confluence of low interest rates, rising urban incomes, and the growth of platform rental businesses. DLUHC council tax data records 272,000 second homes in England in 2023 &mdash; properties declared to local authorities as a secondary residence &mdash; up from approximately 178,000 in 2010, a 53% increase. Alongside registered second homes, an estimated 230,000 properties are now let on a short-term basis through platforms including Airbnb, Vrbo, and regional alternatives &mdash; a market that barely existed before 2015. The combined effect is that in many coastal and rural areas, a substantial share of the housing stock is functionally unavailable to households seeking permanent, affordable homes.
            </p>
            <p>
              The geographic concentration is stark. In St Ives in Cornwall, a 2016 local referendum resulted in a planning restriction preventing newly built homes from being sold as second homes or holiday lets &mdash; one of the first in the country. Despite this, existing second home ownership continues to push median house prices to more than 13 times median local earnings. In the Lake District, Ofcom data suggests that up to 35% of properties in some parishes are registered neither as a primary residence nor as a commercial business &mdash; they are simply empty for most of the year. The Norfolk Broads, the Yorkshire Dales, and the Pembrokeshire coast show similar patterns. The consequence is a hollowing out of year-round community life: schools lose pupils, GP practices lose patients to register, and community organisations lose members as the permanently resident population declines.
            </p>
            </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Overview' },
          { id: 'sec-stock', label: 'Housing Stock' },
          { id: 'sec-prices', label: 'Price Premium' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Second homes in England"
              value="272,000"
              direction="up"
              polarity="up-is-bad"
              changeText="Up from 178,000 in 2010 &middot; +53% in 13 years"
              sparklineData={[178, 195, 210, 225, 238, 250, 262, 272]}
              source="DLUHC &middot; Council Tax Statistics 2023"
              href="#sec-stock"
            />
            <MetricCard
              label="Short-term lets (Airbnb-style)"
              value="230,000"
              direction="up"
              polarity="up-is-bad"
              changeText="Up from 50,000 in 2016 &middot; Market barely existed before 2015"
              sparklineData={[50, 80, 110, 140, 160, 175, 210, 230]}
              source="AirDNA &middot; UK Short-Term Rental Market Report 2023"
              href="#sec-stock"
            />
            <MetricCard
              label="LAs where 20%+ properties are second homes/STLs"
              value="47"
              direction="up"
              polarity="up-is-bad"
              changeText="Includes St Ives, Whitby, Tenby, Ambleside, Padstow"
              sparklineData={[22, 25, 28, 31, 34, 38, 43, 47]}
              source="DLUHC &middot; Local housing statistics 2023"
              href="#sec-stock"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="What is getting better"
            value="100&ndash;300%"
            unit="council tax premiums"
            description="Several councils have introduced 100&ndash;300% council tax premiums on second homes using powers under the Levelling-up and Regeneration Act 2023. Wales now has a statutory licensing scheme for short-term lets &mdash; early data shows a measurable number of properties returning to long-term rental use in affected communities, providing tentative evidence that financial disincentives can shift behaviour."
            source="DLUHC &middot; Welsh Government STL licensing data &middot; 2024"
          />
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-stock" className="mb-12">
            {combinedSeries.length > 0 ? (
              <LineChart
                title="Second homes and short-term lets in England, 2010&ndash;2023"
                subtitle="Registered second homes (DLUHC council tax data) and estimated short-term let listings. Both series in thousands."
                series={combinedSeries}
                yLabel="Thousands of properties"
                source={{
                  name: 'DLUHC / AirDNA',
                  dataset: 'Council Tax Statistics &amp; UK Short-Term Rental Market Report',
                  frequency: 'annual',
                  url: 'https://www.gov.uk/government/statistical-data-sets/live-tables-on-council-tax',
                }}
              />
            ) : (
              <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
            )}
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-prices" className="mb-12">
            {pricePremiumSeries.length > 0 ? (
              <LineChart
                title="House price index: high second-home areas vs comparable areas, 2010&ndash;2023"
                subtitle="Indexed to 2010=100. High second-home areas defined as local authorities in top quintile of second home ratios."
                series={pricePremiumSeries}
                yLabel="House price index (2010=100)"
                source={{
                  name: 'ONS / Land Registry',
                  dataset: 'House Price Index by Local Authority',
                  frequency: 'annual',
                  url: 'https://www.ons.gov.uk/economy/inflationandpriceindices/bulletins/housepriceindex/latestrelease',
                }}
              />
            ) : (
              <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
            )}
          </section>
        </ScrollReveal>

        <section className="border-t border-wiah-border pt-8 mt-12">
          <h2 className="text-lg font-bold text-wiah-black mb-4">Sources &amp; methodology</h2>
          <div className="text-sm text-wiah-mid space-y-2">
            {data?.metadata.sources.map((src, i) => (
              <p key={i}>
                <strong>{src.name}.</strong> <em>{src.dataset}</em>. {src.frequency} &mdash;&nbsp;
                <a href={src.url} target="_blank" rel="noopener noreferrer" className="underline text-wiah-blue hover:no-underline">
                  {src.url}
                </a>
              </p>
            ))}
          </div>
          <p className="text-sm text-wiah-mid mt-6">{data?.metadata.methodology}</p>
          {data?.metadata.knownIssues && data.metadata.knownIssues.length > 0 && (
            <div className="mt-6 p-4 bg-wiah-light rounded">
              <p className="font-bold text-wiah-black mb-2">Known issues:</p>
              <ul className="text-sm text-wiah-mid space-y-1 list-disc list-inside">
                {data.metadata.knownIssues.map((issue, i) => (
                  <li key={i}>{issue}</li>
                ))}
              </ul>
            </div>
          )}
        </section>
      </main>
    </>
  );
}
