'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import PositiveCallout from '@/components/PositiveCallout';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

export default function GreenhouseGasEmissionsPage() {
  // UK territorial greenhouse gas emissions 1990–2023 (MtCO2e)
  const territorialEmissions = [
    798, 776, 770, 757, 753, 751, 742, 735, 726, 699,
    696, 673, 660, 641, 621, 589, 575, 571, 547, 512,
    505, 493, 493, 477, 456, 453, 416, 394, 390, 353, 334, 326, 321, 312,
  ];

  // Emissions by sector 2010–2023 (MtCO2e, selected sectors)
  const powerSector    = [168, 155, 148, 144, 131, 89, 83, 73, 65, 56, 50, 46, 45, 43];
  const transportSect  = [122, 120, 119, 118, 116, 119, 122, 124, 126, 88, 107, 112, 115, 117];
  const buildingsSect  = [88, 85, 83, 82, 80, 78, 76, 75, 73, 72, 71, 68, 67, 65];
  const industrySect   = [75, 73, 71, 68, 66, 64, 62, 60, 58, 55, 53, 52, 51, 50];
  const agriSect       = [49, 49, 48, 48, 47, 47, 47, 47, 47, 47, 46, 46, 46, 46];

  const consumptionEmissions = [
    830, 810, 795, 780, 760, 740, 720, 710, 700, 680, 650, 630, 620, 605,
  ];

  const series1: Series[] = [
    {
      id: 'territorial',
      label: 'UK territorial emissions (MtCO2e)',
      colour: '#E63946',
      data: territorialEmissions.map((v, i) => ({ date: new Date(1990 + i, 0, 1), value: v })),
    },
    {
      id: 'consumption',
      label: 'Consumption-based emissions (MtCO2e)',
      colour: '#F4A261',
      data: consumptionEmissions.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
    },
  ];

  const series2: Series[] = [
    {
      id: 'power',
      label: 'Power sector',
      colour: '#264653',
      data: powerSector.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
    },
    {
      id: 'transport',
      label: 'Transport',
      colour: '#E63946',
      data: transportSect.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
    },
    {
      id: 'buildings',
      label: 'Buildings',
      colour: '#F4A261',
      data: buildingsSect.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
    },
    {
      id: 'industry',
      label: 'Industry',
      colour: '#6B7280',
      data: industrySect.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
    },
    {
      id: 'agriculture',
      label: 'Agriculture',
      colour: '#2A9D8F',
      data: agriSect.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
    },
  ];

  const annotations1: Annotation[] = [
    { date: new Date(2008, 0, 1), label: '2008: Climate Change Act' },
    { date: new Date(2019, 0, 1), label: '2019: Net Zero 2050 law' },
    { date: new Date(2024, 0, 1), label: '2024: Last coal plant closes' },
  ];

  const annotations2: Annotation[] = [
    { date: new Date(2020, 0, 1), label: '2020: COVID — transport collapse' },
  ];

  return (
    <>
      <TopicNav topic="Greenhouse Gas Emissions" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Greenhouse Gas Emissions"
          question="Is the UK Actually Cutting Carbon Emissions?"
          finding="UK territorial emissions fell 50% from 1990 to 2023 — one of the fastest declines in the G7 — but consumption-based emissions (including imports) fell only 27%, and the easy reductions are done."
          colour="#2A9D8F"
          preposition="on"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The UK has cut its territorial greenhouse gas emissions by 50% since 1990 — from around 798 MtCO2e to 312 MtCO2e in 2023 — and leads the G7 in the pace of its reduction. The headline is real, but it flatters the picture. Much of the early decline came from replacing coal with gas in power generation through the 1990s, and then with renewables from the 2010s. Deindustrialisation shifted carbon-intensive manufacturing offshore. When you count consumption-based emissions — the carbon embedded in everything the UK imports — the reduction is only 27%, from around 830 MtCO2e to around 605 MtCO2e.</p>
            <p>The remaining challenge is structurally different from what came before. Transport (dominated by petrol and diesel cars) and buildings (gas boilers) are now the two largest sectors and have barely moved. Agriculture, the fifth-largest sector, has been almost flat for 30 years. These are diffuse, behavioural, and politically sensitive — unlike power generation, where a handful of utility decisions could flip the dial. The Climate Change Committee has repeatedly warned that current policy is insufficient to meet the UK's own legally binding carbon budgets beyond the fourth.</p>
            <p>The gap between territorial and consumption emissions is the most important number that rarely appears in political debate. It means that UK consumers still drive significant global emissions — they have simply moved them abroad.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-total', label: 'Total emissions' },
          { id: 'sec-sectors', label: 'By sector' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Territorial emissions (MtCO2e)"
            value="312"
            direction="down"
            polarity="up-is-bad"
            changeText="2023 · Down 50% from 798 MtCO2e in 1990 · G7 leader"
            sparklineData={[505, 493, 493, 477, 456, 453, 416, 394, 390, 353, 334, 326, 321, 312]}
            source="DESNZ — UK Greenhouse Gas Inventory 2024"
          />
          <MetricCard
            label="Reduction since 1990 (%)"
            value="50%"
            direction="down"
            polarity="up-is-bad"
            changeText="Territorial only · Consumption-based down just 27% · Easy wins exhausted"
            sparklineData={[8, 13, 16, 20, 24, 24, 30, 33, 34, 40, 44, 46, 47, 50]}
            source="DESNZ — UK Greenhouse Gas Inventory 2024"
          />
          <MetricCard
            label="Consumption-based emissions (MtCO2e)"
            value="605"
            direction="down"
            polarity="up-is-bad"
            changeText="2023 · Down 27% from 830 MtCO2e in 2010 · Imports excluded from territorial"
            sparklineData={[830, 810, 795, 780, 760, 740, 720, 710, 700, 680, 650, 630, 620, 605]}
            source="ONS — UK Environmental Accounts 2024"
          />
        </div>

        <ScrollReveal>
          <section id="sec-total" className="mb-12">
            <LineChart
              title="UK greenhouse gas emissions, 1990–2023 (MtCO2e)"
              subtitle="Territorial emissions (legally reported total) vs consumption-based emissions including imports. Both lines show real absolute reductions, but at very different rates."
              series={series1}
              annotations={annotations1}
              yLabel="MtCO2e"
              source={{
                name: 'DESNZ / ONS',
                dataset: 'UK Greenhouse Gas Inventory & Environmental Accounts',
                frequency: 'annual',
                url: 'https://www.gov.uk/government/statistics/final-uk-greenhouse-gas-emissions-national-statistics',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-sectors" className="mb-12">
            <LineChart
              title="Emissions by sector, 2010–2023 (MtCO2e)"
              subtitle="Power sector has fallen 74% since 2010. Transport and buildings have barely moved. Agriculture flat for 30 years."
              series={series2}
              annotations={annotations2}
              yLabel="MtCO2e"
              source={{
                name: 'DESNZ',
                dataset: 'UK Greenhouse Gas Inventory — by sector',
                frequency: 'annual',
                url: 'https://www.gov.uk/government/statistics/final-uk-greenhouse-gas-emissions-national-statistics',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="What's improving"
            value="–74%"
            unit="fall in power sector emissions since 2010"
            description="The UK power sector has reduced emissions by 74% since 2010, driven by the near-elimination of coal and the rapid expansion of offshore wind. The last coal-fired power station closed in September 2024, making the UK the first G7 country to phase out coal entirely. Offshore wind capacity now exceeds 15GW — the largest fleet in the world — and renewables generated 42% of electricity in 2023. This is a genuine structural transformation, not an accounting shift."
            source="Source: DESNZ — UK Greenhouse Gas Inventory 2024; NESO — Electricity Generation Statistics 2024."
          />
        </ScrollReveal>

        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p><a href="https://www.gov.uk/government/statistics/final-uk-greenhouse-gas-emissions-national-statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DESNZ — UK Greenhouse Gas Emissions National Statistics</a> — primary territorial emissions source. Annual.</p>
            <p><a href="https://www.ons.gov.uk/economy/environmentalaccounts" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ONS — UK Environmental Accounts</a> — consumption-based emissions. Annual.</p>
            <p>Territorial emissions follow UNFCCC reporting conventions (production-based). Consumption-based figures adjust for trade in embedded carbon. Sector breakdowns use IPCC categories as reported in the National Inventory.</p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
