'use client';

import { useState, useEffect } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';

interface EVData {
  national: {
    timeSeries: Array<{ date: string; evSharePct: number; chargePoints: number }>;
  };
  metadata: {
    sources: Array<{ name: string; dataset: string; url: string; frequency: string }>;
    methodology: string;
    knownIssues: string[];
  };
}

function yearToDate(y: string): Date {
  return new Date(parseInt(y), 6, 1);
}

export default function ElectricVehiclesPage() {
  const [data, setData] = useState<EVData | null>(null);

  useEffect(() => {
    fetch('/data/electric-vehicles/electric_vehicles.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const evShareSeries: Series[] = data
    ? [{
        id: 'ev-share',
        label: 'BEV share of new car sales',
        colour: '#2A9D8F',
        data: data.national.timeSeries.map(d => ({ date: yearToDate(d.date), value: d.evSharePct })),
      }]
    : [];

  const chargePointSeries: Series[] = data
    ? [{
        id: 'charge-points',
        label: 'Public charge points',
        colour: '#264653',
        data: data.national.timeSeries.map(d => ({ date: yearToDate(d.date), value: d.chargePoints })),
      }]
    : [];

  return (
    <>
      <TopicNav topic="Electric Vehicles" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Electric Vehicles"
          question="Is Britain Actually Switching to Electric Cars?"
          finding="EVs took 16.5% of new car sales in 2023, but public charging infrastructure is insufficient &mdash; just 1 charger per 54 EVs, against a target of 1 per 10. The 2030 petrol ban may slip to 2035, and range anxiety and upfront cost remain the top barriers for most buyers."
          colour="#2A9D8F"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The UK&apos;s electric vehicle transition has accelerated rapidly since 2020. Battery electric vehicles (BEVs) took just 0.5% of new car sales in 2018; by 2023 that figure had risen to 16.5%, driven by an expanding model range, falling battery costs, and the government&apos;s Zero Emission Vehicle (ZEV) mandate &mdash; which requires manufacturers to sell a rising proportion of zero-emission vehicles, starting at 22% in 2024 and rising to 80% by 2030. The UK ranks in the global top five for EV adoption by new car share, alongside Norway, Germany, France, and the Netherlands. Battery costs, which determine the upfront price premium of EVs over equivalent petrol cars, have fallen from over &pound;1,000 per kilowatt-hour in 2010 to around &pound;100/kWh in 2024 &mdash; a 90% reduction in real terms &mdash; and are expected to reach &pound;60&ndash;70/kWh by 2030, the level at which EVs become cost-competitive at the point of purchase without subsidy. Over a vehicle&apos;s lifetime, EVs are already cheaper than petrol equivalents at current electricity and petrol prices when home charging is available.</p>
            <p>The charging infrastructure gap is the most pressing barrier to mass adoption. The UK had around 58,000 public charge points at the start of 2024 &mdash; but with approximately 1.1 million BEVs on the road, that is one public charger per 54 EVs, well short of the government&apos;s own target of one per ten. The Automated and Electric Vehicles Act 2018 required all publicly accessible fuel stations to install rapid chargers, but enforcement has been slow. In January 2024, new regulations came into force requiring charge points at all new non-residential buildings with more than ten car parking spaces &mdash; an important long-term reform, but with limited short-term impact. The distribution of charge points is uneven: London has the highest density, while rural areas and deprived urban communities have fewer chargers per EV than the national average. Motorway service stations have improved significantly &mdash; all major operators now offer at least six rapid chargers &mdash; but many smaller A-road services have none. Reliability remains a concern: Which? mystery shopping found around 10% of charge point visits resulted in a failure to charge successfully.</p>
            </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-share', label: 'EV Sales Share' },
          { id: 'sec-charging', label: 'Charging Infrastructure' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="BEV share of new car sales"
              value="16.5"
              unit="%"
              direction="up"
              polarity="up-is-good"
              changeText="Up from 0.5% in 2018 &mdash; ZEV mandate requires 80% by 2030"
              sparklineData={[0.5, 0.7, 1.6, 3.1, 7.4, 11.6, 14.8, 16.5]}
              source="SMMT &mdash; New car registrations by fuel type"
              href="#sec-share"
            />
            <MetricCard
              label="Public charge points"
              value="58,000"
              direction="up"
              polarity="up-is-good"
              changeText="1 per 54 EVs &mdash; government target: 1 per 10"
              sparklineData={[12000, 16000, 22000, 30000, 40000, 50000, 55000, 58000]}
              source="DESNZ &mdash; EV charging infrastructure statistics"
              href="#sec-share"
            />
            <MetricCard
              label="EVs per public charger"
              value="54"
              direction="up"
              polarity="up-is-bad"
              changeText="Target: 10 per charger &mdash; gap widening as EVs outpace charger rollout"
              sparklineData={[8, 12, 16, 22, 32, 45, 50, 54]}
              source="DESNZ / DVLA &mdash; calculated from fleet and infrastructure data"
              href="#sec-share"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-share" className="mb-12">
            <LineChart
              title="Battery electric vehicle share of new car sales, UK, 2018&ndash;2025"
              subtitle="BEVs only, excluding plug-in hybrids. SMMT new car registration data."
              series={evShareSeries}
              yLabel="% of new car sales"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-charging" className="mb-12">
            <LineChart
              title="Public electric vehicle charge points, UK, 2018&ndash;2025"
              subtitle="Total publicly accessible charge points on DESNZ register. Includes all speed tiers."
              series={chargePointSeries}
              yLabel="Total charge points"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="90% Cost Reduction"
            value="&pound;100/kWh"
            unit="battery cost &mdash; down from &pound;1,000 in 2010"
            description="UK is top-5 globally for EV adoption, and battery costs have fallen 90% since 2010 &mdash; making EVs cost-competitive over their full lifetime with petrol cars at current fuel prices for drivers with home charging access. Volkswagen, BMW, and Stellantis all confirmed full transition plans to BEV-only by 2030 in Europe. The ZEV mandate&apos;s credit trading mechanism gives manufacturers flexibility while maintaining the aggregate transition trajectory."
            source="Source: BloombergNEF &mdash; Battery Price Survey 2024; SMMT &mdash; EV registrations data."
          />
        </ScrollReveal>

        <ScrollReveal>
          <section className="mt-8 pt-12 border-t border-wiah-border">
            <h2 className="font-sans text-2xl font-bold text-wiah-black mb-6">Sources &amp; Methodology</h2>
            {data && (
              <div className="font-sans text-sm space-y-6">
                <div>
                  <h3 className="font-bold text-wiah-black mb-2">Data sources</h3>
                  <ul className="space-y-2">
                    {data.metadata.sources.map((src, idx) => (
                      <li key={idx} className="text-wiah-mid">
                        <strong className="text-wiah-black">{src.name}:</strong>&nbsp;
                        <a href={src.url} target="_blank" rel="noopener noreferrer" className="underline text-wiah-blue">
                          {src.dataset}
                        </a>
                        &nbsp;({src.frequency})
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-wiah-black mb-2">Methodology</h3>
                  <p className="text-wiah-mid">{data.metadata.methodology}</p>
                </div>
                <div>
                  <h3 className="font-bold text-wiah-black mb-2">Known issues</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {data.metadata.knownIssues.map((issue, idx) => (
                      <li key={idx} className="text-wiah-mid">{issue}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </section>
        </ScrollReveal>
      </main>
    </>
  );
}
