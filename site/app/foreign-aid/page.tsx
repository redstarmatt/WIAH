'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import PositiveCallout from '@/components/PositiveCallout';

// ── Types ────────────────────────────────────────────────────────────────────

interface ForeignAidData {
  timeSeries: Array<{ date: string; odaPctGni: number; odaTotalBn: number; asylumDiversionBn: number }>;
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

export default function ForeignAidPage() {
  const [data, setData] = useState<ForeignAidData | null>(null);

  useEffect(() => {
    fetch('/data/foreign-aid/foreign_aid.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const odaPctSeries: Series[] = data
    ? [
        {
          id: 'oda-pct-gni',
          label: 'UK ODA as &percnt; of GNI',
          colour: '#264653',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.date),
            value: d.odaPctGni,
          })),
        },
      ]
    : [];

  const odaAnnotations: Annotation[] = [
    {
      date: new Date(2021, 6, 1),
      label: '2021: Cut to 0.5&percnt;',
    },
  ];

  const targetLine = { value: 0.7, label: '0.7% UN target', colour: '#2A9D8F' };

  const odaBreakdownSeries: Series[] = data
    ? [
        {
          id: 'total-oda',
          label: 'Total ODA (&pound;bn)',
          colour: '#264653',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.date),
            value: d.odaTotalBn,
          })),
        },
        {
          id: 'asylum-diversion',
          label: 'Asylum in-donor costs (&pound;bn)',
          colour: '#E63946',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.date),
            value: d.asylumDiversionBn,
          })),
        },
      ]
    : [];

  return (
    <>
      <TopicNav topic="Foreign Aid" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Foreign Aid"
          preposition="with"
          question="What Has Happened to Britain&apos;s Foreign Aid?"
          finding="The UK cut overseas development assistance from 0.7&percnt; to 0.5&percnt; of GNI in 2021, withdrawing approximately &pound;4 billion annually from programmes fighting malaria, famine, and displacement. Simultaneously, the government classified &pound;3.5 billion of the remaining aid budget as &ldquo;in-donor asylum costs&rdquo; &mdash; money spent in the UK on asylum processing &mdash; leaving dramatically less for the world&apos;s poorest."
          colour="#264653"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              The UK legislated for the 0.7&percnt; of GNI aid target in 2015 following decades of cross-party commitment. In April 2021, the cut to 0.5&percnt; of GNI withdrew approximately &pound;4 billion annually from overseas programmes, with immediate consequences: bilateral programmes in sub-Saharan Africa, South Asia, and fragile states were cut or closed. Support for the Global Fund to Fight AIDS, Tuberculosis and Malaria was cut by 60&percnt;; the UK&apos;s contribution to the World Food Programme fell from &pound;300 million to &pound;114 million in the same year that hunger in Yemen, Ethiopia, and South Sudan reached record levels. A second, less-discussed problem compounds the headline cut: in 2023, &pound;3.5 billion of the &pound;15.2 billion ODA budget was classified as in-donor asylum costs &mdash; money spent on hotels, processing, and support for asylum seekers in the UK &mdash; leaving just &pound;11.7 billion for actual overseas programmes.
            </p>
            <p>
              The distributional impact is almost entirely felt outside the UK, in some of the world&apos;s most deprived communities. Critics argue the reclassification of domestic asylum costs as ODA distorts the measurement of generosity, allowing ministers to claim a 0.5&percnt; commitment while a growing fraction is spent on domestic bureaucracy. Norway, Sweden, and Germany have imposed domestic caps on in-donor cost claims; the UK has not. The UK remains one of the world&apos;s largest donors in absolute terms, but ICAI found the rapid elimination of established bilateral programmes &mdash; with limited time for partners to secure alternative funding &mdash; destroyed institutional capacity built over years and produced outcomes far worse than a proportional cut would suggest.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Overview' },
          { id: 'sec-oda-pct', label: 'ODA &percnt; of GNI' },
          { id: 'sec-breakdown', label: 'Aid Breakdown' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="UK ODA as &percnt; of GNI"
              value="0.5%"
              direction="down"
              polarity="up-is-good"
              changeText="Down from 0.7&percnt; &middot; Cut in 2021 &middot; &pound;4bn annually withdrawn from overseas programmes"
              sparklineData={[0.7, 0.7, 0.7, 0.7, 0.7, 0.5, 0.5, 0.5]}
              source="FCDO &middot; Statistics on International Development 2024"
              onExpand={() => {}}
            />
            <MetricCard
              label="Total ODA budget 2023"
              value="&pound;15.2bn"
              direction="down"
              polarity="up-is-good"
              changeText="Of which &pound;3.5bn spent in UK on asylum processing &middot; Net overseas: &pound;11.7bn"
              sparklineData={[12.2, 13.4, 14.1, 14.6, 15.2, 11.4, 13.0, 15.2]}
              source="FCDO &middot; ODA Statistics 2023"
              onExpand={() => {}}
            />
            <MetricCard
              label="Aid diverted to domestic asylum costs"
              value="&pound;3.5bn"
              direction="up"
              polarity="up-is-bad"
              changeText="Up from &pound;300m in 2015 &middot; Classified as ODA under DAC rules &middot; 23&percnt; of total budget"
              sparklineData={[0.5, 0.8, 1.2, 1.8, 2.5, 3.0, 3.5, 3.5]}
              source="ICAI &middot; Annual Review 2024"
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="What is getting better"
            value="Top 5"
            unit="global donors"
            description="Despite the cut from 0.7&percnt; to 0.5&percnt;, the UK remains one of the world&apos;s largest donors in absolute terms &mdash; ranking in the top 5 globally by ODA volume. The commitment to return to 0.7&percnt; &ldquo;when fiscal conditions allow&rdquo; is embedded in the 2015 legislation. UK multilateral contributions through the World Bank, Global Fund, and UN agencies continue to fund proven life-saving programmes."
            source="OECD DAC &middot; Official Aid Statistics 2023"
          />
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-oda-pct" className="mb-12">
            {odaPctSeries.length > 0 ? (
              <LineChart
                title="UK ODA as &percnt; of GNI, 2015&ndash;2024"
                subtitle="UK overseas development assistance as a percentage of gross national income. 0.7&percnt; is the UN and statutory target."
                series={odaPctSeries}
                annotations={odaAnnotations}
                targetLine={targetLine}
                yLabel="&percnt; of GNI"
                source={{
                  name: 'FCDO / OECD DAC',
                  dataset: 'UK Overseas Development Assistance Statistics',
                  frequency: 'annual',
                  url: 'https://www.gov.uk/government/collections/statistics-on-international-development',
                }}
              />
            ) : (
              <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
            )}
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-breakdown" className="mb-12">
            {odaBreakdownSeries.length > 0 ? (
              <LineChart
                title="UK ODA: total budget vs asylum in-donor costs, 2015&ndash;2024"
                subtitle="Growing proportion of ODA budget classified as domestic asylum processing costs under OECD DAC rules. Red = spent in UK."
                series={odaBreakdownSeries}
                yLabel="&pound;bn"
                source={{
                  name: 'FCDO / ICAI',
                  dataset: 'Statistics on International Development &amp; ICAI Annual Review',
                  frequency: 'annual',
                  url: 'https://icai.independent.gov.uk/',
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
