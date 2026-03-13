'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import PositiveCallout from '@/components/PositiveCallout';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

export default function RenewableEnergyPage() {
  // Renewable share of electricity generation 2010–2024 (%)
  const renewableElecShare = [7, 10, 12, 15, 19, 25, 25, 30, 33, 38, 42, 40, 42, 43, 45];

  // Total energy renewables share 2010–2024 (%)
  const totalEnergyRenewable = [4, 4, 5, 5, 6, 7, 8, 9, 10, 11, 12, 11, 12, 13, 14];

  // Installed capacity by source 2010–2024 (GW)
  const offshoreWind = [1.3, 1.8, 2.9, 3.7, 4.5, 5.1, 5.7, 8.2, 8.5, 9.6, 10.4, 12.7, 13.9, 14.7, 15.4];
  const onshoreWind  = [3.7, 4.2, 5.0, 6.7, 7.9, 8.5, 9.1, 10.2, 11.0, 11.9, 12.9, 13.4, 14.2, 14.7, 15.1];
  const solar        = [0.1, 0.7, 1.7, 2.9, 5.1, 8.9, 11.5, 12.9, 13.1, 13.3, 13.6, 14.0, 14.7, 15.4, 16.2];

  const series1: Series[] = [
    {
      id: 'elec-share',
      label: 'Renewables share of electricity (%)',
      colour: '#2A9D8F',
      data: renewableElecShare.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
    },
    {
      id: 'total-energy',
      label: 'Renewables share of total energy (%)',
      colour: '#6B7280',
      data: totalEnergyRenewable.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
    },
  ];

  const series2: Series[] = [
    {
      id: 'offshore',
      label: 'Offshore wind (GW)',
      colour: '#264653',
      data: offshoreWind.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
    },
    {
      id: 'onshore',
      label: 'Onshore wind (GW)',
      colour: '#2A9D8F',
      data: onshoreWind.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
    },
    {
      id: 'solar',
      label: 'Solar (GW)',
      colour: '#F4A261',
      data: solar.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
    },
  ];

  const annotations1: Annotation[] = [
    { date: new Date(2019, 0, 1), label: '2019: Renewables overtake gas briefly' },
    { date: new Date(2024, 0, 1), label: '2024: Coal generation ends' },
  ];

  const annotations2: Annotation[] = [
    { date: new Date(2015, 0, 1), label: '2015: Onshore wind moratorium' },
    { date: new Date(2022, 0, 1), label: '2022: Moratorium lifted' },
  ];

  return (
    <>
      <TopicNav topic="Renewable Energy" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Renewable Energy"
          question="How Fast Is the UK Going Renewable?"
          finding="Renewables generated 42% of UK electricity in 2023 — up from 7% in 2010 — with offshore wind the fastest-growing source; but total energy (including heat and transport) is only 13% renewable."
          colour="#2A9D8F"
          preposition="on"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The UK's electricity system has been transformed in fifteen years. Renewables generated just 7% of electricity in 2010; by 2023 that had risen to 42%, and exceeded 45% in 2024. Offshore wind has been the engine of that change — the UK operates the world's largest offshore wind fleet, with 15.4GW installed by 2024. The last coal-fired power station closed in September 2024, making the UK the first G7 country to phase out coal entirely. On some days in 2023 and 2024, renewables supplied over 80% of electricity demand.</p>
            <p>But electricity is only part of the energy picture. When you include heat (mostly gas boilers) and transport (mostly petrol and diesel), total energy from renewable sources is only around 13–14%. Decarbonising these sectors — swapping gas boilers for heat pumps and petrol cars for EVs — is the harder and more expensive phase. Heat pump installations run at around 50,000–60,000 a year, compared to the government's own target of 600,000 by 2028.</p>
            <p>The moratorium on onshore wind in England between 2015 and 2022 — a political constraint with no engineering justification — cost roughly seven years of the cheapest form of new generation. Its lifting has opened new pipeline, but planning and grid connection delays mean benefits will take years to materialise.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-share', label: 'Renewable share' },
          { id: 'sec-capacity', label: 'Installed capacity' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Renewables share of electricity (%)"
            value="45%"
            direction="up"
            polarity="up-is-good"
            changeText="2024 · Up from 7% in 2010 · Coal generation ended Sep 2024"
            sparklineData={[7, 10, 12, 15, 19, 25, 25, 30, 33, 38, 42, 40, 42, 43, 45]}
            source="DESNZ — Energy Trends 2024"
          />
          <MetricCard
            label="Offshore wind capacity (GW)"
            value="15.4"
            direction="up"
            polarity="up-is-good"
            changeText="2024 · Up from 1.3GW in 2010 · Largest fleet in world"
            sparklineData={[1.3, 1.8, 2.9, 3.7, 4.5, 5.1, 5.7, 8.2, 8.5, 9.6, 10.4, 12.7, 13.9, 14.7, 15.4]}
            source="DESNZ — Renewable Electricity Capacity 2024"
          />
          <MetricCard
            label="Total energy renewables share (%)"
            value="14%"
            direction="up"
            polarity="up-is-good"
            changeText="2024 incl. heat & transport · Up from 4% in 2010 · Heat pump rollout lagging"
            sparklineData={[4, 4, 5, 5, 6, 7, 8, 9, 10, 11, 12, 11, 12, 13, 14]}
            source="DESNZ — Energy Trends 2024"
          />
        </div>

        <ScrollReveal>
          <section id="sec-share" className="mb-12">
            <LineChart
              title="Renewable electricity generation, 2010–2024 (% of total)"
              subtitle="Share of UK electricity from wind, solar, hydro and biomass combined vs total energy renewable share (grey). The gap shows how much heat and transport decarbonisation still remain."
              series={series1}
              annotations={annotations1}
              yLabel="Share (%)"
              source={{
                name: 'DESNZ',
                dataset: 'Energy Trends UK — Renewables',
                frequency: 'quarterly',
                url: 'https://www.gov.uk/government/statistics/energy-trends-section-6-renewables',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-capacity" className="mb-12">
            <LineChart
              title="Installed renewable capacity by source, 2010–2024 (GW)"
              subtitle="Offshore wind is the fastest-growing source. The onshore wind moratorium (2015–2022) is visible as a plateau. Solar scaled rapidly with falling panel costs."
              series={series2}
              annotations={annotations2}
              yLabel="Installed capacity (GW)"
              source={{
                name: 'DESNZ',
                dataset: 'Renewable Electricity Capacity and Generation',
                frequency: 'quarterly',
                url: 'https://www.gov.uk/government/statistics/energy-trends-section-6-renewables',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="What's improving"
            value="45%"
            unit="of UK electricity from renewables in 2024"
            description="The UK offshore wind industry has created more than 30,000 jobs and attracted over £200bn in investment commitments since 2010. In 2024, wind generated more electricity than gas for the first time. Auction prices for new offshore wind capacity fell from £155/MWh in 2015 to £37/MWh in 2022 — making it the cheapest new electricity source available. The UK ranks first in the world for installed offshore wind capacity."
            source="Source: DESNZ — Energy Trends 2024; Crown Estate — UK Offshore Wind Report 2024."
          />
        </ScrollReveal>

        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p><a href="https://www.gov.uk/government/statistics/energy-trends-section-6-renewables" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DESNZ — Energy Trends (Section 6: Renewables)</a> — generation and capacity. Quarterly.</p>
            <p><a href="https://www.gov.uk/government/statistics/energy-consumption-in-the-uk" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DESNZ — Energy Consumption in the UK</a> — total energy use. Annual.</p>
            <p>Electricity share = renewable generation ÷ total electricity generated. Total energy share uses final energy consumption per UK/EU methodology. Capacity figures are operational GW at year end.</p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
