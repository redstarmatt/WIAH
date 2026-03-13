'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'ONS', dataset: 'Wealth and Assets Survey 2020–22', url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/personalandhouseholdfinances/incomeandwealth/bulletins/totalwealthingreatbritain/latest', date: '2024' },
  { num: 2, name: 'ONS', dataset: 'Income inequality trends since 1990s', url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/personalandhouseholdfinances/incomeandwealth', date: '2024' },
  { num: 3, name: 'ONS', dataset: 'Wealth and Assets Survey — age breakdowns', url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/personalandhouseholdfinances/incomeandwealth/bulletins/totalwealthingreatbritain/latest', date: '2024' },
  { num: 4, name: 'Resolution Foundation', dataset: 'Homeownership trends by age cohort', url: 'https://www.resolutionfoundation.org/publications/', date: '2023' },
];

// ── Types ────────────────────────────────────────────────────────────────────

interface WealthInequalityData {
  wealthShare: Array<{ year: number; top10pct: number; bottom50pct: number }>;
  byWealthType: Array<{ type: string; sharePct: number }>;
  byAgeGroup: Array<{ age: string; medianWealth: number }>;
  metadata: {
    sources: Array<{ name: string; dataset: string; url: string; frequency: string }>;
    methodology: string;
    knownIssues: string[];
  };
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

// ── Component ────────────────────────────────────────────────────────────────

export default function WealthInequalityPage() {
  const [data, setData] = useState<WealthInequalityData | null>(null);

  useEffect(() => {
    fetch('/data/wealth-inequality/wealth_inequality.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const wealthShareSeries: Series[] = data
    ? [
        {
          id: 'top10',
          label: 'Top 10% share',
          colour: '#E63946',
          data: data.wealthShare.map(d => ({
            date: yearToDate(d.year),
            value: d.top10pct,
          })),
        },
        {
          id: 'bottom50',
          label: 'Bottom 50% share',
          colour: '#2A9D8F',
          data: data.wealthShare.map(d => ({
            date: yearToDate(d.year),
            value: d.bottom50pct,
          })),
        },
      ]
    : [];

  return (
    <>
      <TopicNav topic="Wealth Inequality" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Wealth Inequality"
          question="Who owns Britain's wealth?"
          finding="The richest 10% of households own 43% of all UK wealth, while the bottom 50% own just 9% — a gap that has widened since 2006 and is driven primarily by property and pension inequality."
          colour="#264653"
          preposition="in"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The ONS Wealth and Assets Survey (2020–22) found that the richest 10% of households hold 43% of all household wealth in the UK, while the bottom 50% share just 9%.<Cite nums={1} /> This is not a story about income inequality, which has been broadly stable since the mid-1990s.<Cite nums={2} /> It is a story about the accumulation of assets — above all, property and pensions. Homeowners have seen values double or treble in many parts of England since 2000; private renters, who now account for around a fifth of households, accumulate nothing from that appreciation. Those in defined-benefit pension schemes — concentrated in public sector employment — hold substantial accrued wealth that is invisible in take-home pay comparisons.</p>
            <p>The age dimension is stark. Median household wealth for the under-25s stands at around £12,000; for those aged 65–74, it reaches £462,000.<Cite nums={3} /> Much of this reflects a natural lifecycle — people accumulate assets over time — but the gap between older and younger cohorts has grown significantly. Today's 30–35-year-olds hold considerably less wealth than people of the same age did 20 years ago, primarily because homeownership rates among that group have fallen sharply.<Cite nums={4} /> A generation that bought in the 1990s has benefited from three decades of house price growth. One that could not get onto the ladder has not.</p>
            </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-wealth-share', label: 'Wealth Share' },
          { id: 'sec-by-age', label: 'By Age Group' },
          { id: 'sec-by-type', label: 'By Wealth Type' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Wealth share of top 10%"
              value="43%"
              direction="up"
              polarity="up-is-bad"
              changeText="Up from 38% in 2006/08"
              sparklineData={[38, 39, 40, 41, 42, 42, 43, 43, 43]}
              href="#sec-wealth-share"
            />
            <MetricCard
              label="Median household total wealth"
              value="£302.5K"
              direction="flat"
              polarity="up-is-good"
              changeText="But bottom 10% have zero or negative wealth"
              sparklineData={[280, 290, 295, 300, 305, 310, 312, 310, 302.5]}
              href="#sec-wealth-share"
            />
            <MetricCard
              label="Under-35s with no savings"
              value="32%"
              direction="up"
              polarity="up-is-bad"
              changeText="Up from 22% in 2015"
              sparklineData={[22, 24, 25, 27, 28, 30, 31, 32, 32]}
              href="#sec-wealth-share"
            />
          </div>
        

        <ScrollReveal>
          <section id="sec-wealth-share" className="mb-12">
            <LineChart
              title="Share of total household wealth, UK"
              subtitle="Percentage of all household wealth owned by top 10% and bottom 50% of households. ONS Wealth &amp; Assets Survey."
              series={wealthShareSeries}
              yLabel="Share of total wealth (%)"
              source={{
                name: 'Office for National Statistics',
                dataset: 'Wealth and Assets Survey',
                frequency: 'biennial',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-by-age" className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-2">Median household wealth by age group</h2>
            <p className="text-sm text-wiah-mid font-mono mb-6">Net wealth including property, pensions, financial assets and possessions (£).</p>
            {data && (
              <div className="space-y-3">
                {data.byAgeGroup.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-20 text-sm text-wiah-black flex-shrink-0">{item.age}</div>
                    <div className="flex-1 bg-wiah-border rounded h-5 overflow-hidden">
                      <div
                        className="h-full rounded"
                        style={{ width: `${(item.medianWealth / 470000) * 100}%`, backgroundColor: '#264653' }}
                      />
                    </div>
                    <div className="w-32 text-right text-sm font-mono text-wiah-black">
                      £{Math.round(item.medianWealth / 1000)}K
                    </div>
                  </div>
                ))}
              </div>
            )}
            <p className="font-mono text-xs text-wiah-mid mt-4">Source: ONS — Wealth and Assets Survey 2021</p>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-by-type" className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-2">Composition of total household wealth</h2>
            <p className="text-sm text-wiah-mid font-mono mb-6">Percentage breakdown of UK household wealth by asset type.</p>
            {data && (
              <div className="space-y-3">
                {data.byWealthType.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-40 text-sm text-wiah-black flex-shrink-0">{item.type}</div>
                    <div className="flex-1 bg-wiah-border rounded h-5 overflow-hidden">
                      <div
                        className="h-full rounded"
                        style={{ width: `${(item.sharePct / 45) * 100}%`, backgroundColor: '#264653' }}
                      />
                    </div>
                    <div className="w-12 text-right text-sm font-mono text-wiah-black">{item.sharePct}%</div>
                  </div>
                ))}
              </div>
            )}
            <p className="font-mono text-xs text-wiah-mid mt-4">Source: ONS — Wealth and Assets Survey 2021</p>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="Pension auto-enrolment transformed saving"
            value="10M"
            unit="workers enrolled"
            description="The introduction of auto-enrolment for workplace pensions in 2012 has enrolled over 10 million previously unsaved workers. Private sector pension participation rose from 42% to 85% of eligible employees. It is the most successful wealth-building intervention of the last 30 years — though contribution rates remain too low for most to achieve comfortable retirement incomes."
            source="Source: Pensions Regulator"
          />
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            {data?.metadata.sources.map((src, i) => (
              <div key={i}>
                <a href={src.url} target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">
                  {src.name} — {src.dataset}
                </a>
                <div className="text-xs text-wiah-mid">Updated {src.frequency}</div>
              </div>
            ))}
          </div>
          <div className="text-sm text-wiah-mid mt-6 space-y-2">
            <h3 className="font-bold">Methodology</h3>
            <p>{data?.metadata.methodology}</p>
          </div>
          <div className="text-sm text-wiah-mid mt-6 space-y-2">
            <h3 className="font-bold">Known issues</h3>
            <ul className="list-disc list-inside space-y-1">
              {data?.metadata.knownIssues.map((issue, i) => (
                <li key={i}>{issue}</li>
              ))}
            </ul>
          </div>
        </section>
              <RelatedTopics />
      </main>
    </>
  );
}
