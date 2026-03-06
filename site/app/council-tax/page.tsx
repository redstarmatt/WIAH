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

interface CouncilTaxData {
  timeSeries: Array<{ date: string; bandDCouncilTax: number; govGrantBillionReal: number }>;
  metadata: {
    sources: { name: string; dataset: string; url: string; frequency: string }[];
    methodology: string;
    knownIssues: string[];
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: string): Date {
  return new Date(parseInt(y), 5, 1);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function CouncilTaxPage() {
  const [data, setData] = useState<CouncilTaxData | null>(null);

  useEffect(() => {
    fetch('/data/council-tax/council_tax.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const councilTaxSeries: Series[] = data
    ? [
        {
          id: 'band-d',
          label: 'Average Band D council tax (£/year)',
          colour: '#F4A261',
          data: data.timeSeries.map(d => ({ date: yearToDate(d.date), value: d.bandDCouncilTax })),
        },
      ]
    : [];

  const grantSeries: Series[] = data
    ? [
        {
          id: 'gov-grant',
          label: 'Government grants to councils (£bn real)',
          colour: '#264653',
          data: data.timeSeries.map(d => ({ date: yearToDate(d.date), value: d.govGrantBillionReal })),
        },
      ]
    : [];

  return (
    <>
      <TopicNav topic="Council Tax" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Council Tax"
          question="Why Does Council Tax Keep Rising While Services Are Cut?"
          finding="Council tax in England has risen 25% in real terms since 2016 — with many councils raising bills by the maximum permitted 5% per year — yet local authorities are simultaneously closing libraries, cutting bin collections, and reducing adult social care, because government grants have fallen faster than council tax has risen."
          colour="#F4A261"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              Council tax has risen every year since 2016 — yet local services have deteriorated in almost every area of provision. This paradox is the defining fiscal story of English local government in the 2020s. The answer lies in the arithmetic of local authority funding: central government grants — which historically funded the majority of council spending — have been cut by over 40% in real terms since 2010. Council tax revenue has risen, but from a much lower base and at a rate constrained by referendum limits (currently 5% per year including a 2% adult social care precept). The net result is that councils are collecting more from residents while spending less on them, as a growing share of their income is consumed by the rocketing cost of adult social care, children's services, and temporary accommodation for homeless households.
            </p>
            <p>
              The average Band D council tax bill in England reached £2,171 in 2024 — up from £1,439 in 2010, and up 25% in real terms since 2016 alone. But these averages conceal enormous variation. In some London boroughs with high council tax bases and central grant top-ups, bills remain under £1,500. In areas with high demand for services, low property values (council tax is based on 1991 property valuations, not current values), and low central grant, bills exceed £2,500. The failure to revalue properties since 1991 means the council tax system is profoundly regressive: a £500,000 house in a northern town pays the same as a £100,000 house in the same band, while a £10 million mansion in London pays only three times as much as a £150,000 flat.
            </p>
            </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Overview' },
          { id: 'sec-tax', label: 'Council Tax Trend' },
          { id: 'sec-grants', label: 'Government Grants' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Average Band D council tax (England, 2024)"
              value="£2,171"
              direction="up"
              polarity="up-is-bad"
              changeText="Up from £1,439 in 2010 · +25% in real terms since 2016"
              sparklineData={[1484, 1530, 1591, 1671, 1756, 1898, 2065, 2171]}
              source="DLUHC · Council tax levels 2024"
              onExpand={() => {}}
            />
            <MetricCard
              label="Local authority net revenue expenditure reduction (real terms 2010–2024)"
              value="-23%"
              direction="down"
              polarity="up-is-good"
              changeText="Central government grants cut 40% · Council tax cannot fill the gap"
              sparklineData={[100, 95, 90, 86, 83, 80, 79, 79, 78, 78, 77]}
              source="IFS · Local government funding: the picture in 2024"
              onExpand={() => {}}
            />
            <MetricCard
              label="Councils at risk of s114 (effective bankruptcy)"
              value="20+"
              direction="up"
              polarity="up-is-bad"
              changeText="9 councils issued s114 notices since 2018 · 20&plus; more at risk"
              sparklineData={[1, 1, 2, 3, 5, 7, 9, 15, 20]}
              source="LGA · Financial stability assessment 2023"
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-tax" className="mb-12">
            {councilTaxSeries.length > 0 ? (
              <LineChart
                title="Average Band D council tax, England, 2010–2024"
                subtitle="Average annual charge for a Band D property across all English billing authorities (£). Council tax has risen every year since 2010, including years when the government mandated freezes funded by short-term grants."
                series={councilTaxSeries}
                yLabel="Annual charge (£)"
                source={{
                  name: 'DLUHC',
                  dataset: 'Council tax levels set by local authorities',
                  frequency: 'annual',
                  url: 'https://www.gov.uk/government/collections/council-tax-statistics',
                }}
              />
            ) : (
              <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
            )}
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-grants" className="mb-12">
            {grantSeries.length > 0 ? (
              <LineChart
                title="Central government grants to English local authorities, 2010–2024 (real terms)"
                subtitle="Net revenue support grant and formula grants in 2024 prices (£bn). Government grants to councils have fallen by over 40% in real terms since 2010, driving councils to raise council tax to part-compensate."
                series={grantSeries}
                yLabel="Government grants (£bn, real)"
                source={{
                  name: 'HM Treasury / DLUHC',
                  dataset: 'Local authority revenue expenditure and financing',
                  frequency: 'annual',
                  url: 'https://www.gov.uk/government/collections/local-authority-revenue-expenditure-and-financing',
                }}
              />
            ) : (
              <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
            )}
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="What devolution offers"
            value="Greater Manchester, West Midlands, West Yorkshire"
            description="The introduction of devolution deals — granting major city-regions more control over spending and strategic planning — is allowing some councils to align investment with local priorities more effectively than the centralised grant system allowed. The English Devolution Bill (2025) proposes extending devolved powers to all areas of England by 2030."
            source="DLUHC · English Devolution Bill 2025 · Combined authority spending reviews 2024"
          />
        </ScrollReveal>

        <section className="border-t border-wiah-border pt-8 mt-12">
          <h2 className="text-lg font-bold text-wiah-black mb-4">Sources &amp; methodology</h2>
          <div className="text-sm text-wiah-mid space-y-2">
            {data?.metadata.sources.map((src, i) => (
              <p key={i}>
                <strong>{src.name}.</strong> <em>{src.dataset}</em>. {src.frequency} — 
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
