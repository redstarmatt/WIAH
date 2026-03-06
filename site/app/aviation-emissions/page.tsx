'use client';

import { useState, useEffect } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';

interface AviationData {
  national: {
    timeSeries: Array<{ date: string; emissionsMt: number; passengersMillion: number }>;
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

export default function AviationEmissionsPage() {
  const [data, setData] = useState<AviationData | null>(null);

  useEffect(() => {
    fetch('/data/aviation-emissions/aviation_emissions.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const emissionsSeries: Series[] = data
    ? [{
        id: 'aviation-emissions',
        label: 'Aviation CO\u2082 emissions',
        colour: '#E63946',
        data: data.national.timeSeries.map(d => ({ date: yearToDate(d.date), value: d.emissionsMt })),
      }]
    : [];

  const passengersSeries: Series[] = data
    ? [{
        id: 'passengers',
        label: 'UK airport passengers',
        colour: '#E63946',
        data: data.national.timeSeries.map(d => ({ date: yearToDate(d.date), value: d.passengersMillion })),
      }]
    : [];

  return (
    <>
      <TopicNav topic="Aviation Emissions" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Aviation Emissions"
          question="Is Flying Wrecking Britain&apos;s Climate Goals?"
          finding="Aviation accounts for 7&ndash;8% of the UK&apos;s total climate impact &mdash; more than rail and buses combined &mdash; yet it benefits from an estimated &pound;7bn per year in tax exemptions: no fuel duty and no VAT on international flights. Passenger numbers have recovered to pre-pandemic levels and continue to grow."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Aviation is one of the hardest sectors to decarbonise and one of the fastest growing sources of UK emissions. Direct CO2 from UK aviation amounted to around 35 million tonnes in 2023 &mdash; roughly equivalent to CO2 from all UK cars for four months. But CO2 is only part of the story: contrails, water vapour, and nitrogen oxides emitted at altitude have a warming effect estimated at 2 to 4 times the CO2 figure alone, meaning aviation&apos;s total climate impact is equivalent to perhaps 80&ndash;140 million tonnes of CO2-equivalent &mdash; around 7&ndash;8% of the UK&apos;s total. This is more than the combined climate impact of all UK rail, bus, and domestic shipping. Only around half the UK population flies in any given year, and the most frequent fliers &mdash; roughly 15% of adults who take more than three return flights per year &mdash; account for an estimated 70% of all flights. The distributional dimension of aviation emissions is therefore striking: a relatively small group of frequent fliers is responsible for a disproportionate share of one of the most climate-intensive activities.</p>
            <p>Aviation enjoys what critics describe as extraordinary fiscal privilege. Unlike road vehicles, aviation kerosene carries no fuel duty in the UK &mdash; a 1944 Chicago Convention provision that has never been updated for the climate era. International flights are zero-rated for VAT. HMRC analysis suggests the combined value of these exemptions is around &pound;7bn per year. The only aviation tax is Air Passenger Duty (APD), which raised around &pound;3.7bn in 2023&ndash;24 &mdash; well below the estimated cost of the exemptions. By comparison, a litre of petrol attracts 52.95p in fuel duty plus 20% VAT. The Climate Change Committee has consistently recommended reforming APD to better reflect climate costs, proposing a frequent flier levy and higher rates for long-haul flights. The government has instead frozen or reduced APD rates in recent years and expanded APD exemptions for domestic aviation.</p>
            <p>The aviation industry&apos;s central decarbonisation strategy relies on Sustainable Aviation Fuel (SAF) &mdash; fuel produced from waste, agricultural residues, or synthetic processes that can reduce lifecycle emissions by 70% or more compared to conventional jet fuel. UK law mandates a 10% SAF blend by 2030 and 22% by 2040, with a target of 10% SAF production in the UK by 2030. As of early 2024, SAF represents under 1% of UK aviation fuel. The mandates are achievable in principle but require substantial new production capacity &mdash; three UK SAF plants were under development in 2024, but none were yet operational. SAF currently costs three to five times more than conventional jet fuel, a premium that airlines have generally passed to consumers through higher fares rather than absorbing it as a margin reduction. Hydrogen-powered flight, which Rolls-Royce has successfully tested in ground and flight trials, is unlikely to be commercially viable for long-haul aviation before 2040.</p>
            <p>Heathrow is the UK&apos;s largest single source of transport carbon and the centre of debates about airport expansion. A third runway at Heathrow was approved in the Airports National Policy Statement in 2018, overturned by the Court of Appeal in 2020 on climate grounds, and reinstated by the Supreme Court in 2021. The project remains in planning limbo as of 2026, with a decision on development consent expected in 2026 or 2027. The Climate Change Committee concluded in 2023 that Heathrow expansion is incompatible with net zero unless accompanied by demand management measures. Regional airports &mdash; including Manchester, Edinburgh, Birmingham, and Bristol &mdash; have each sought expansion in recent years; most regional airport expansion proposals have proceeded or are proceeding. Total UK passenger numbers reached around 250 million in 2023, recovering fully to pre-pandemic levels, and are projected to grow to 370 million by 2050 under the aviation industry&apos;s own forecasts.</p>
            <p>Aviation emissions statistics are complex and contested. The CO2 figures in UK national statistics use a territorial accounting basis &mdash; covering only flights within UK airspace &mdash; rather than production-based accounting, which would allocate the full emissions of all UK-departing flights to the UK carbon budget. The Climate Change Committee uses a consumption-based measure that adds international departure emissions; on this basis, UK aviation is responsible for around 35&ndash;40 million tonnes of CO2 per year, one of the highest per-capita aviation footprints in the world. The radiative forcing multiplier &mdash; used to calculate total warming impact beyond CO2 &mdash; is scientifically well-established in principle but the exact figure (ranging from 1.9 to 4.0 in peer-reviewed literature) carries significant uncertainty and is subject to ongoing research. The &pound;7bn tax exemption figure is a comparison to equivalent taxation if aviation were taxed like road fuels, not a direct public expenditure; the counterfactual is contested by the aviation industry, which argues that competitive dynamics would prevent unilateral UK fuel duty from being viable.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-emissions', label: 'Emissions' },
          { id: 'sec-passengers', label: 'Passengers' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Aviation share of UK climate impact"
              value="7.5"
              unit="%"
              direction="flat"
              polarity="up-is-bad"
              changeText="Includes contrail and NOx effects &mdash; CO2 alone is around 4%"
              sparklineData={[7.1, 7.2, 7.3, 7.4, 7.5, 2.9, 3.8, 6.8, 7.5]}
              source="DESNZ &mdash; UK GHG national statistics (with radiative forcing)"
              onExpand={() => {}}
            />
            <MetricCard
              label="Annual aviation tax exemption"
              value="&pound;7bn"
              direction="flat"
              polarity="up-is-bad"
              changeText="No fuel duty, no VAT on international flights &mdash; APD raises &pound;3.7bn"
              sparklineData={[5.5, 5.8, 6.0, 6.3, 6.5, 6.7, 6.9, 7.0]}
              source="HMRC &mdash; Tax expenditures and ready reckoners 2024"
              onExpand={() => {}}
            />
            <MetricCard
              label="UK airport passengers (2023)"
              value="250M"
              direction="up"
              polarity="up-is-bad"
              changeText="Fully recovered from COVID &mdash; projected 370M by 2050"
              sparklineData={[240, 253, 265, 280, 175, 120, 200, 230]}
              source="CAA &mdash; UK aviation activity statistics 2024"
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-emissions" className="mb-12">
            <LineChart
              title="UK aviation CO\u2082 emissions, 2010\u20132024"
              subtitle="Territorial aviation CO\u2082 in million tonnes. COVID dip 2020\u201321, rapid recovery. DESNZ GHG statistics."
              series={emissionsSeries}
              yLabel="MtCO\u2082"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-passengers" className="mb-12">
            <LineChart
              title="Passengers at UK airports, 2010\u20132024"
              subtitle="Total terminal passengers (millions) across all UK airports. CAA aviation activity statistics."
              series={passengersSeries}
              yLabel="Passengers (millions)"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="SAF Mandate &amp; Hydrogen Testing"
            value="10%"
            unit="SAF blend required by 2030"
            description="Sustainable Aviation Fuel mandates require 10% SAF by 2030 and 22% by 2040, giving the UK one of the world&apos;s most ambitious SAF timelines. Rolls-Royce has successfully tested hydrogen-powered jet engines, demonstrating the technical feasibility of zero-emission aviation. Three UK SAF production plants were under development in 2024. SAF can reduce lifecycle emissions by over 70% compared to conventional jet fuel."
            source="Source: DfT &mdash; Jet Zero Strategy 2022; Rolls-Royce hydrogen engine test 2023."
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
