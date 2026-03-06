'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';

interface TradeBalancePoint {
  year: number;
  goodsDeficitBillionGBP: number;
  servicesSuplusBillionGBP: number;
}

interface ExportIndexPoint {
  year: number;
  indexValue: number;
}

interface EUSharePoint {
  year: number;
  euSharePct: number;
}

interface TradeData {
  national: {
    tradeBalance: {
      timeSeries: TradeBalancePoint[];
      latestYear: number;
      latestGoodsDeficit: number;
      latestServicesSurplus: number;
    };
    euGoodsExports: {
      timeSeries: ExportIndexPoint[];
      latestYear: number;
      latestIndex: number;
      note: string;
    };
    euShareOfExports: {
      timeSeries: EUSharePoint[];
      latestYear: number;
      latestPct: number;
    };
    foodExports: {
      timeSeries: ExportIndexPoint[];
      latestYear: number;
      latestIndex: number;
      note: string;
    };
  };
  metadata: {
    sources: { name: string; dataset: string; url: string; frequency: string }[];
    methodology: string;
    knownIssues: string[];
  };
}

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

export default function TradePage() {
  const [data, setData] = useState<TradeData | null>(null);

  useEffect(() => {
    fetch('/data/trade/trade.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const tradeBalanceSeries: Series[] = data
    ? [
        {
          id: 'goods',
          label: 'Goods deficit (negative)',
          colour: '#E63946',
          data: data.national.tradeBalance.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.goodsDeficitBillionGBP,
          })),
        },
        {
          id: 'services',
          label: 'Services surplus',
          colour: '#2A9D8F',
          data: data.national.tradeBalance.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.servicesSuplusBillionGBP,
          })),
        },
      ]
    : [];

  const euExportsSeries: Series[] = data
    ? [
        {
          id: 'eu-exports',
          label: 'UK goods exports to EU (volume index)',
          colour: '#264653',
          data: data.national.euGoodsExports.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.indexValue,
          })),
        },
      ]
    : [];

  const euExportsAnnotations: Annotation[] = [
    { date: new Date(2021, 0, 1), label: 'Jan 2021: TCA takes effect' },
  ];

  const economicImpactAnnotations: Annotation[] = [];

  return (
    <>
      <TopicNav topic="Trade &amp; Brexit" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Trade &amp; Brexit"
          question="Has Brexit Actually Changed British Trade?"
          finding="UK goods exports to the EU remain 7% below pre-Brexit trend in volume terms. The OBR estimates Brexit has reduced UK trade intensity by 15%. The UK runs a £157bn goods deficit but a £145bn services surplus. Food exports to the EU fell 22% in 2021 and have not recovered."
          colour="#264653"
          preposition="with"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              The Trade and Cooperation Agreement took effect in January 2021, and the friction showed immediately. UK goods exports to the EU fell to a volume index of 93 by 2023 — 7% below the pre-Brexit trend with the 2016 baseline at 100. Food and drink were hit hardest: new veterinary checks and certification requirements drove a 33% volume collapse in 2021, and by 2023 exports remained 22% below 2019 levels. The OBR estimates Brexit has reduced overall UK trade intensity by 15% relative to continued membership, with non-tariff barriers adding 1–4% to the cost of each goods transaction.
            </p>
            <p>
              Britain's services sector has partially compensated. The UK ran a £145 billion services surplus in 2023, up from £121 billion in 2019, driven by financial services, consulting, and higher education. The EU's share of UK exports edged down from 43% to 41% over the same period as trade redirected towards new partners — the UK has signed agreements with 71 countries covering roughly 66% of trade, and joined CPTPP, the 11-country Pacific bloc. Yet the EU remains by far the largest single market for British goods, and no new deal replaces its scale.
            </p>
            </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-goods', label: 'Goods Trade' },
          { id: 'sec-services', label: 'Services' },
          { id: 'sec-eu-share', label: 'EU Share' },
        ]} />

        <ScrollReveal>
          <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="UK goods trade deficit"
              value="£157bn"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="2023 · Services surplus £145bn · Net goods deficit persistent and widening · Energy imports drove 2022 spike"
              sparklineData={[105, 119, 122, 135, 138, 138, 131, 95, 117, 177, 157]}
              onExpand={() => {}}
            />
            <MetricCard
              label="EU goods exports (volume index)"
              value="93"
              unit=""
              direction="flat"
              polarity="up-is-good"
              changeText="2023 · 2016=100 · Still 7% below pre-Brexit trend · OBR: 15% long-run trade intensity reduction"
              sparklineData={[100, 105, 107, 109, 85, 87, 92, 93]}
              onExpand={() => {}}
            />
            <MetricCard
              label="EU share of UK exports"
              value="41%"
              unit=""
              direction="down"
              polarity="up-is-good"
              changeText="2023 · Was 43% pre-Brexit · Partial diversification to Australia, Japan, CPTPP · Still largest trading partner"
              sparklineData={[44, 43, 44, 43, 43, 39, 40, 41, 41]}
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-goods" className="mb-12">
            <LineChart
              title="UK goods trade deficit and services surplus, 2013–2023"
              subtitle="Annual trade balance (£bn). UK runs persistent goods deficit (imports exceed exports) offset by strong services surplus. Goods deficit spiked in 2022 due to energy price rises."
              series={tradeBalanceSeries}
              annotations={economicImpactAnnotations}
              yLabel="£ billion"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-services" className="mb-12">
            <LineChart
              title="UK goods exports to EU, volume index, 2016–2023"
              subtitle="Volume index of UK goods exports to the EU (2016=100). Fell sharply in 2020 (COVID) and again in 2021 (Brexit TCA) and has recovered only partially to 93 — 7% below the pre-Brexit trajectory."
              series={euExportsSeries}
              annotations={euExportsAnnotations}
              yLabel="Index (2016=100)"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="What's improving"
            value="£145bn"
            unit="services trade surplus in 2023 — the UK's largest ever"
            description="UK services exports have grown strongly, reaching a £145 billion surplus in 2023 — up from £121 billion in 2019. Financial services, professional and legal services, higher education, and tech consulting all contribute. The UK has signed free trade agreements with 71 countries (covering 66% of UK exports), including Australia, Japan, New Zealand, and the CPTPP bloc. The Windsor Framework (2023) resolved many of the trading frictions for Northern Ireland. UK-India trade talks are ongoing."
            source="Source: ONS — UK trade in goods and services, 2023."
          />
        </ScrollReveal>

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
      </main>
    </>
  );
}
