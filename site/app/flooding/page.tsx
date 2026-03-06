'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';

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
        label: 'Spending (&pound;m)',
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
          finding="6.3 million properties in England are at risk of flooding &mdash; roughly 1 in 6 homes. 2.4 million are at significant risk. Winter 2023/24 saw the most flood incidents since records began, with Storms Babet, Ciaran, and Henk causing over 2,000 property floods. The Environment Agency&apos;s flood defence budget was cut 8% in real terms between 2010 and 2023."
          colour="#264653"
          preposition="with"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Flood risk in England is larger and more pervasive than most people realise. 6.3 million properties face some degree of flood risk &mdash; roughly one in six homes. Of those, 2.4 million are at significant risk and 880,000 at high risk. The National Flood Risk Assessment 2 (NaFRA2), published in 2023, identified 500,000 more properties at risk than previously assessed, largely because improved surface water mapping revealed threats invisible to earlier river-focused models. Surface water flooding &mdash; caused by rainfall overwhelming urban drainage rather than rivers breaching banks &mdash; now accounts for 40% of at-risk properties and is often not covered by standard insurance. Winter 2023/24 saw the highest number of flood incidents on record: Storms Babet, Ciaran and Henk caused 7,800 property floods in 2023 alone. Despite this, 13% of new homes built in 2022 were sited in flood-risk areas, often over Environment Agency objections.</p>
            <p>Capital spending on flood defences has risen &mdash; from &pound;670 million in 2010/11 to &pound;1.1 billion in 2022/23 &mdash; and the FCERM Investment Plan commits &pound;5.6 billion between 2021 and 2027, protecting an estimated 336,000 additional properties. But revenue and maintenance spending was cut in real terms between 2010 and 2023, leaving existing defences underfunded and ageing. Flood Re, the government-backed reinsurance scheme for high-risk properties, covers 250,000 policies and has kept insurance accessible &mdash; yet it is designed to wind down by 2039, at which point those homes will face open-market pricing. London faces a distinct tidal threat: 1.5 million people live in the Thames tidal floodplain, and the Thames Barrier has been used over 200 times since 1982. It needs replacement or major upgrade by the 2070s, at an estimated cost exceeding &pound;10 billion.</p>
            <p>Climate change is compounding every dimension of flood risk. The Environment Agency projects that without significant adaptation, the number of properties at significant risk will rise by 59% by 2055 under a 2&deg;C warming scenario. Sea levels in the Thames estuary have risen 30cm since 1900 and are projected to rise a further 20&ndash;70cm by 2100, intensifying tidal and coastal exposure. The planning system fails to keep pace: National Planning Policy Framework guidance on flood risk is advisory, not binding, and local authorities frequently grant permission against EA advice. Sustainable Urban Drainage Systems (SuDS) are mandatory for new developments in Wales but only advisory in England. The average cost of flood damage to a property is &pound;100,000; victims in high-risk zones face insurance excesses of &pound;2,500 to &pound;10,000. The pattern is one of rising risk, patchwork investment and a planning regime that continues to build in harm&apos;s way.</p>
            <p>The most consequential gap in flood resilience is not engineering but insurance and planning. Flood Re, introduced in 2016, created a reinsurance pool that made home insurance affordable in high-risk areas&mdash;but it covers only residential properties, excluding commercial premises, purpose-built flats, and any home built after 2009. An estimated 200,000 properties remain effectively uninsurable, and they cluster disproportionately in deprived communities where households lack the savings to self-insure. For those who have flooded, the burden extends far beyond property damage. Research consistently links repeated flooding to chronic anxiety, depression, and post-traumatic stress, driven not by the event itself but by the grinding uncertainty of recurrence and the months-long disruption of recovery. The planning system is supposed to prevent new exposure, but it routinely fails: CPRE analysis found 11% of new homes were built in flood zones despite Planning Policy Guidance requiring flood risk assessments. The &pound;200 million annual gap between what the Environment Agency estimates is needed for maintenance of existing defences and what is actually funded means assets deteriorate even as risk increases. The alternative approaches that could absorb some of that risk&mdash;managed realignment, floodplain restoration, peatland rewetting, and upstream woodland planting&mdash;remain pilot-scale interventions rather than systemic strategy, despite consistent evidence that natural flood management reduces peak flows downstream.</p>
            <p>The National Flood Risk Assessment 2 (NaFRA2), published in 2023, represents a significant methodological advance over its predecessor, but it remains a modelled estimate of risk, not a direct measurement of flooding. The threshold for &ldquo;significant risk&rdquo;&mdash;defined as a 1-in-75-year probability or greater&mdash;is somewhat arbitrary, and small changes in that threshold would substantially alter the headline count of properties at risk. Surface water flood modelling relies on rainfall intensity projections at local level, where uncertainty is high; a model that performs well at national scale may be misleading for any individual street. The figure of 200,000 uninsurable properties predates Flood Re&apos;s introduction and has not been formally updated, meaning the current insurance gap is genuinely unknown. Environment Agency flood defence condition ratings are self-assessed by regional teams whose standards and resourcing vary, introducing inconsistency into what appears to be a national dataset. In extreme weather events, the distinction between river flooding, surface water flooding, and groundwater flooding increasingly blurs, making attribution of damage to a single flood type difficult and complicating investment decisions. Insurance claims data&mdash;which would provide the most accurate picture of actual flood impact on households&mdash;is commercially sensitive and unavailable to researchers or policymakers. Most fundamentally, there is no reliable national count of properties that have actually flooded, only properties modelled to be at risk of flooding.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-floods', label: 'Flood Events' },
          { id: 'sec-spending', label: 'Defence Spending' },
          { id: 'sec-regions', label: 'By Region' },
        ]} />

        <ScrollReveal>
          <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Properties at risk of flooding (England)"
              value="6.3M"
              direction="up"
              polarity="up-is-bad"
              changeText="2024 &middot; 1 in 6 homes &middot; 2.4M at significant risk &middot; 880K at high risk &middot; Climate change will increase risk"
              sparklineData={[5200, 5400, 5600, 5800, 5900, 6100, 6200, 6300]}
              onExpand={() => {}}
            />
            <MetricCard
              label="Properties flooded (latest year)"
              value="7,800"
              direction="up"
              polarity="up-is-bad"
              changeText="2023 &middot; Storms Babet, Ciaran &amp; Henk &middot; Up sharply from 2022 &middot; Winter 2023/24 most incidents on record"
              sparklineData={[6.5, 8.2, 5.8, 5.5, 16.5, 3.2, 2.1, 1.5, 4.7, 4.6, 3.1, 2.8, 7.8]}
              onExpand={() => {}}
            />
            <MetricCard
              label="Flood defence capital spending"
              value="&pound;1.1bn"
              direction="up"
              polarity="up-is-good"
              changeText="2022/23 &middot; Up from &pound;670M in 2010/11 &middot; Real-terms increase &middot; FCERM Investment Plan: &pound;5.6bn to 2027"
              sparklineData={[670, 640, 700, 780, 820, 860, 900, 890, 950, 1030, 1100]}
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-floods" className="mb-12">
            <LineChart
              title="Properties flooded, 2010&ndash;2023"
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
              title="Flood defence capital spending, 2010/11&ndash;2022/23"
              subtitle="Annual DEFRA and Environment Agency capital investment in flood and coastal risk management (&pound; millions)."
              series={spendingSeries}
              yLabel="Spending (&pound;m)"
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
            <p className="font-mono text-xs text-wiah-mid mt-4">Source: Environment Agency &mdash; National Flood Risk Assessment 2</p>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="What&apos;s improving"
            value="&pound;5.6bn"
            unit="committed to flood and coastal erosion risk management to 2027 &mdash; the largest ever commitment"
            description="The government&apos;s FCERM (Flood and Coastal Erosion Risk Management) Investment Plan commits &pound;5.6 billion between 2021 and 2027, protecting around 336,000 properties from flooding and coastal erosion. Flood defence spending has grown from &pound;670 million in 2010/11 to &pound;1.1 billion in 2022/23. Surface water flood risk mapping has been extended to cover 70,000 additional locations. The Flood Re reinsurance scheme, which pools risk for high-flood-risk homes, has 250,000 policies, making insurance more affordable. Smart flood warning systems now cover 1.2 million properties registered for alerts."
            source="Source: Environment Agency &mdash; Flood and Coastal Erosion Risk Management Programme 2023/24; EA &mdash; Long-term flood risk data."
          />
        </ScrollReveal>

        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            {data?.metadata.sources.map((src, i) => (
              <div key={i}>
                <a href={src.url} target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">
                  {src.name} &mdash; {src.dataset}
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
