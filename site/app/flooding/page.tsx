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

interface FloodingData {
  national: {
    atRiskProperties: {
      totalAtRisk: number;
      significantRisk: number;
      highRisk: number;
    };
    floodEvents: {
      timeSeries: Array<{ year: number; propertiesFloodedThousands: number }>;
      latestYear: number;
      latestThousands: number;
    };
    floodDefenceSpending: {
      timeSeries: Array<{ year: string; spendingMillionGBP: number }>;
      latestYear: string;
      latestMillionGBP: number;
    };
    riskByRegion: Array<{ region: string; propertiesAtRiskThousands: number }>;
  };
  metadata: {
    sources: Array<{ name: string; dataset: string; url: string; frequency: string }>;
    methodology: string;
    knownIssues: string[];
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

function fyToDate(fy: string): Date {
  const start = parseInt(fy.split('/')[0]);
  return new Date(start, 3, 1);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function FloodingPage() {
  const [data, setData] = useState<FloodingData | null>(null);

  useEffect(() => {
    fetch('/data/flooding/flooding.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const floodsSeries: Series[] = data
    ? [{
        id: 'floods',
        label: 'Properties flooded (thousands)',
        colour: '#264653',
        data: data.national.floodEvents.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.propertiesFloodedThousands,
        })),
      }]
    : [];

  const floodsAnnotations: Annotation[] = [
    { date: new Date(2015, 0, 1), label: '2015/16: Major winter floods' },
    { date: new Date(2023, 0, 1), label: '2023: Storms Babet &amp; Ciaran' },
  ];

  const spendingSeries: Series[] = data
    ? [{
        id: 'spending',
        label: 'Spending (£m)',
        colour: '#2A9D8F',
        data: data.national.floodDefenceSpending.timeSeries.map(d => ({
          date: fyToDate(d.year),
          value: d.spendingMillionGBP,
        })),
      }]
    : [];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Flooding" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Flooding"
          question="How at Risk Are British Homes from Flooding?"
          finding="6.3 million properties in England are at risk of flooding — roughly 1 in 6 homes. 2.4 million are at significant risk. Winter 2023/24 saw the most flood incidents since records began, with Storms Babet, Ciaran, and Henk causing over 2,000 property floods. The Environment Agency's flood defence budget was cut 8% in real terms between 2010 and 2023."
          colour="#264653"
          preposition="with"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Flood risk in England is larger and more pervasive than most people realise. 6.3 million properties face some degree of flood risk — roughly one in six homes. Of those, 2.4 million are at significant risk and 880,000 at high risk. The National Flood Risk Assessment 2 (NaFRA2), published in 2023, identified 500,000 more properties at risk than previously assessed, largely because improved surface water mapping revealed threats invisible to earlier river-focused models. Surface water flooding — caused by rainfall overwhelming urban drainage rather than rivers breaching banks — now accounts for 40% of at-risk properties and is often not covered by standard insurance. Winter 2023/24 saw the highest number of flood incidents on record: Storms Babet, Ciaran and Henk caused 7,800 property floods in 2023 alone. Despite this, 13% of new homes built in 2022 were sited in flood-risk areas, often over Environment Agency objections.</p>
            <p>Capital spending on flood defences has risen — from £670 million in 2010/11 to £1.1 billion in 2022/23 — and the FCERM Investment Plan commits £5.6 billion between 2021 and 2027, protecting an estimated 336,000 additional properties. But revenue and maintenance spending was cut in real terms between 2010 and 2023, leaving existing defences underfunded and ageing. Flood Re, the government-backed reinsurance scheme for high-risk properties, covers 250,000 policies and has kept insurance accessible — yet it is designed to wind down by 2039, at which point those homes will face open-market pricing. London faces a distinct tidal threat: 1.5 million people live in the Thames tidal floodplain, and the Thames Barrier has been used over 200 times since 1982. It needs replacement or major upgrade by the 2070s, at an estimated cost exceeding £10 billion.</p>
            </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-floods', label: 'Flood Events' },
          { id: 'sec-spending', label: 'Defence Spending' },
          { id: 'sec-regions', label: 'By Region' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Properties at risk of flooding (England)"
              value="6.3M"
              direction="up"
              polarity="up-is-bad"
              changeText="2024 · 1 in 6 homes · 2.4M at significant risk · 880K at high risk · Climate change will increase risk"
              sparklineData={[5200, 5400, 5600, 5800, 5900, 6100, 6200, 6300]}
              href="#sec-floods"
            />
            <MetricCard
              label="Properties flooded (latest year)"
              value="7,800"
              direction="up"
              polarity="up-is-bad"
              changeText="2023 · Storms Babet, Ciaran &amp; Henk · Up sharply from 2022 · Winter 2023/24 most incidents on record"
              sparklineData={[6.5, 8.2, 5.8, 5.5, 16.5, 3.2, 2.1, 1.5, 4.7, 4.6, 3.1, 2.8, 7.8]}
              href="#sec-floods"
            />
            <MetricCard
              label="Flood defence capital spending"
              value="£1.1bn"
              direction="up"
              polarity="up-is-good"
              changeText="2022/23 · Up from £670M in 2010/11 · Real-terms increase · FCERM Investment Plan: £5.6bn to 2027"
              sparklineData={[670, 640, 700, 780, 820, 860, 900, 890, 950, 1030, 1100]}
              href="#sec-floods"
            />
          </div>
        

        <ScrollReveal>
          <section id="sec-floods" className="mb-12">
            <LineChart
              title="Properties flooded, 2010–2023"
              subtitle="Thousands of properties experiencing internal flooding from rivers, coastal, and surface water sources."
              series={floodsSeries}
              annotations={floodsAnnotations}
              yLabel="Properties flooded (thousands)"
              source={{
                name: 'Environment Agency',
                dataset: 'Flood incident data',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-spending" className="mb-12">
            <LineChart
              title="Flood defence capital spending, 2010/11–2022/23"
              subtitle="Annual DEFRA and Environment Agency capital investment in flood and coastal risk management (£ millions)."
              series={spendingSeries}
              yLabel="Spending (£m)"
              source={{
                name: 'Environment Agency',
                dataset: 'FCERM Investment Programme',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-regions" className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-2">Properties at significant flood risk by region, England</h2>
            <p className="text-sm text-wiah-mid font-mono mb-6">Thousands of properties at significant flood risk by Environment Agency region.</p>
            {data && (
              <div className="space-y-3">
                {data.national.riskByRegion.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-40 text-sm text-wiah-black flex-shrink-0">{item.region}</div>
                    <div className="flex-1 bg-wiah-border rounded h-5 overflow-hidden">
                      <div
                        className="h-full rounded"
                        style={{ width: `${(item.propertiesAtRiskThousands / 490) * 100}%`, backgroundColor: '#264653' }}
                      />
                    </div>
                    <div className="w-16 text-right text-sm font-mono text-wiah-black">{item.propertiesAtRiskThousands}K</div>
                  </div>
                ))}
              </div>
            )}
            <p className="font-mono text-xs text-wiah-mid mt-4">Source: Environment Agency — National Flood Risk Assessment 2</p>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="What's improving"
            value="£5.6bn"
            unit="committed to flood and coastal erosion risk management to 2027 — the largest ever commitment"
            description="The government's FCERM (Flood and Coastal Erosion Risk Management) Investment Plan commits £5.6 billion between 2021 and 2027, protecting around 336,000 properties from flooding and coastal erosion. Flood defence spending has grown from £670 million in 2010/11 to £1.1 billion in 2022/23. Surface water flood risk mapping has been extended to cover 70,000 additional locations. The Flood Re reinsurance scheme, which pools risk for high-flood-risk homes, has 250,000 policies, making insurance more affordable. Smart flood warning systems now cover 1.2 million properties registered for alerts."
            source="Source: Environment Agency — Flood and Coastal Erosion Risk Management Programme 2023/24; EA — Long-term flood risk data."
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
              <RelatedTopics />
      </main>
    </>
  );
}
