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
          label: 'UK ODA as % of GNI',
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
      label: '2021: Cut to 0.5%',
    },
  ];

  const targetLine = { value: 0.7, label: '0.7% UN target', colour: '#2A9D8F' };

  const odaBreakdownSeries: Series[] = data
    ? [
        {
          id: 'total-oda',
          label: 'Total ODA (£bn)',
          colour: '#264653',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.date),
            value: d.odaTotalBn,
          })),
        },
        {
          id: 'asylum-diversion',
          label: 'Asylum in-donor costs (£bn)',
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
          question="What Has Happened to Britain's Foreign Aid?"
          finding="The UK cut overseas development assistance from 0.7% to 0.5% of GNI in 2021, withdrawing approximately £4 billion annually from programmes fighting malaria, famine, and displacement. Simultaneously, the government classified £3.5 billion of the remaining aid budget as &ldquo;in-donor asylum costs&rdquo; — money spent in the UK on asylum processing — leaving dramatically less for the world's poorest."
          colour="#264653"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              The United Kingdom was one of the first countries in the world to legislate for the 0.7% of GNI aid target, passed into law through the International Development (Official Development Assistance Target) Act 2015 following decades of cross-party commitment. In April 2021, the then Chancellor Rishi Sunak announced a temporary reduction to 0.5% of GNI, citing the fiscal pressures of the COVID-19 pandemic. The statutory basis allowed this: the Act permits a lower spend when the government determines that economic conditions make 0.7% not practicable. The cut amounted to approximately £4 billion annually at current GNI levels, with immediate impact: bilateral programmes in sub-Saharan Africa, South Asia, and fragile states were cut or closed. The House of Commons International Development Committee found that programmes addressing girls' education, malaria prevention, and food security were among the most severely affected.
            </p>
            <p>
              The 0.5% figure obscures a second, less-discussed problem: a growing proportion of the aid budget is being spent in the UK rather than overseas. Under OECD DAC (Development Assistance Committee) rules, expenditure on asylum seekers in the donor country during their first year of arrival can be classified as ODA. The UK government has taken full advantage of this classification: in 2023, approximately £3.5 billion of the £15.2 billion total ODA budget was classified as in-donor asylum costs — money spent on hotels, processing, and support for people awaiting asylum decisions in the UK. This means the overseas aid budget available for programmes in developing countries was approximately £11.7 billion, not £15.2 billion. The Independent Commission for Aid Impact (ICAI) found that this reclassification had resulted in the termination or significant reduction of programmes that had demonstrable life-saving impact.
            </p>
            </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Overview' },
          { id: 'sec-oda-pct', label: 'ODA % of GNI' },
          { id: 'sec-breakdown', label: 'Aid Breakdown' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="UK ODA as % of GNI"
              value="0.5%"
              direction="down"
              polarity="up-is-good"
              changeText="Down from 0.7% · Cut in 2021 · £4bn annually withdrawn from overseas programmes"
              sparklineData={[0.7, 0.7, 0.7, 0.7, 0.7, 0.5, 0.5, 0.5]}
              source="FCDO · Statistics on International Development 2024"
              onExpand={() => {}}
            />
            <MetricCard
              label="Total ODA budget 2023"
              value="£15.2bn"
              direction="down"
              polarity="up-is-good"
              changeText="Of which £3.5bn spent in UK on asylum processing · Net overseas: £11.7bn"
              sparklineData={[12.2, 13.4, 14.1, 14.6, 15.2, 11.4, 13.0, 15.2]}
              source="FCDO · ODA Statistics 2023"
              onExpand={() => {}}
            />
            <MetricCard
              label="Aid diverted to domestic asylum costs"
              value="£3.5bn"
              direction="up"
              polarity="up-is-bad"
              changeText="Up from £300m in 2015 · Classified as ODA under DAC rules · 23% of total budget"
              sparklineData={[0.5, 0.8, 1.2, 1.8, 2.5, 3.0, 3.5, 3.5]}
              source="ICAI · Annual Review 2024"
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="What is getting better"
            value="Top 5"
            unit="global donors"
            description="Despite the cut from 0.7% to 0.5%, the UK remains one of the world's largest donors in absolute terms — ranking in the top 5 globally by ODA volume. The commitment to return to 0.7% &ldquo;when fiscal conditions allow&rdquo; is embedded in the 2015 legislation. UK multilateral contributions through the World Bank, Global Fund, and UN agencies continue to fund proven life-saving programmes."
            source="OECD DAC · Official Aid Statistics 2023"
          />
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-oda-pct" className="mb-12">
            {odaPctSeries.length > 0 ? (
              <LineChart
                title="UK ODA as % of GNI, 2015–2024"
                subtitle="UK overseas development assistance as a percentage of gross national income. 0.7% is the UN and statutory target."
                series={odaPctSeries}
                annotations={odaAnnotations}
                targetLine={targetLine}
                yLabel="% of GNI"
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
                title="UK ODA: total budget vs asylum in-donor costs, 2015–2024"
                subtitle="Growing proportion of ODA budget classified as domestic asylum processing costs under OECD DAC rules. Red = spent in UK."
                series={odaBreakdownSeries}
                yLabel="£bn"
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
