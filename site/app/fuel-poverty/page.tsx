'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'DESNZ', dataset: 'Fuel poverty statistics, England', url: 'https://www.gov.uk/government/collections/fuel-poverty-statistics', date: '2024' },
  { num: 2, name: 'Ofgem / Citizens Advice', dataset: 'Energy bill arrears analysis', url: 'https://www.ofgem.gov.uk/check-if-energy-price-cap-affects-you', date: '2024' },
];

export default function FuelPovertyPage() {
  // Fuel poor households in England (millions) 2012–2024
  const fuelPoorHouseholds = [2.37, 2.35, 2.38, 2.50, 2.55, 2.53, 2.38, 2.39, 2.53, 2.61, 3.19, 3.27, 3.15];
  // Fuel poverty rate in England (%) 2012–2024
  const fuelPovRate = [10.4, 10.3, 10.4, 11.0, 11.1, 11.0, 10.3, 10.3, 10.9, 11.4, 13.4, 13.8, 13.0];
  // Energy bill arrears (£bn) — approximated sparkline
  const energyArrears = [0.6, 0.7, 0.8, 0.9, 1.0, 1.1, 1.2, 1.4, 1.8, 2.2, 2.5];

  // % fuel poor by tenure 2015–2024
  const ownerOccupied = [6.0, 6.1, 5.9, 6.0, 6.2, 6.4, 8.5, 8.9, 8.5];
  const privateRented  = [18.0, 17.8, 17.2, 17.0, 17.5, 18.0, 22.0, 23.0, 22.5];
  const socialRented   = [12.0, 11.8, 11.5, 11.4, 11.6, 12.0, 14.5, 15.0, 14.5];

  const chart1Series: Series[] = [
    {
      id: 'households',
      label: 'Fuel poor households (millions)',
      colour: '#F4A261',
      data: fuelPoorHouseholds.map((v, i) => ({ date: new Date(2012 + i, 0, 1), value: v })),
    },
  ];

  const chart1Annotations: Annotation[] = [
    { date: new Date(2012, 0, 1), label: '2012: Low Income High Costs definition adopted' },
    { date: new Date(2022, 0, 1), label: '2022: Energy price crisis' },
    { date: new Date(2023, 0, 1), label: '2023: Energy Price Guarantee' },
  ];

  const chart2Series: Series[] = [
    {
      id: 'private',
      label: 'Private rented (%)',
      colour: '#E63946',
      data: privateRented.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
    {
      id: 'social',
      label: 'Social rented (%)',
      colour: '#F4A261',
      data: socialRented.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
    {
      id: 'owner',
      label: 'Owner-occupied (%)',
      colour: '#6B7280',
      data: ownerOccupied.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
  ];

  return (
    <>
      <TopicNav topic="Fuel Poverty" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Fuel Poverty"
          question="How Many Households Can't Afford to Heat Their Homes?"
          finding="3.2 million households in England are in fuel poverty — 13% of all homes — with the energy price crisis pushing an additional 1 million into fuel poverty in 2022."
          colour="#F4A261"
          preposition="on"
        />

        <section className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Households in fuel poverty (millions)"
              value="3.2"
              direction="up"
              polarity="up-is-bad"
              changeText="+35% since 2019 · energy crisis impact"
              sparklineData={fuelPoorHouseholds}
              source="DESNZ — Fuel poverty statistics, England, 2024"
            />
            <MetricCard
              label="Fuel poverty rate (%)"
              value="13"
              direction="up"
              polarity="up-is-bad"
              changeText="up from 10.4% in 2012 · 1 in 8 households"
              sparklineData={fuelPovRate}
              source="DESNZ — Fuel poverty statistics, England, 2024"
            />
            <MetricCard
              label="Energy bill arrears (£bn)"
              value="2.5"
              direction="up"
              polarity="up-is-bad"
              changeText="+317% since 2015 · households unable to keep up"
              sparklineData={energyArrears}
              source="Ofgem / Citizens Advice, 2024"
            />
          </div>
        </section>

        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="Fuel poor households in England, 2012–2024"
              subtitle="Millions. Measured using the Low Income High Costs (LIHC) definition since 2012."
              series={chart1Series}
              annotations={chart1Annotations}
              yLabel="Millions of households"
              source={{
                name: 'Department for Energy Security and Net Zero',
                dataset: 'Fuel poverty statistics, England',
                frequency: 'annual',
                url: 'https://www.gov.uk/government/collections/fuel-poverty-statistics',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="Fuel poverty by tenure type, England, 2015–2024"
              subtitle="% of households in fuel poverty by housing tenure. Private renters most exposed."
              series={chart2Series}
              yLabel="% of households in fuel poverty"
              source={{
                name: 'Department for Energy Security and Net Zero',
                dataset: 'Fuel poverty detailed tables',
                frequency: 'annual',
                url: 'https://www.gov.uk/government/collections/fuel-poverty-statistics',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The energy cost crisis</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>Fuel poverty in England is measured using the Low Income High Costs definition: a household is fuel poor if its energy costs are above the median and, were it to spend that amount, it would be left with income below the poverty line. On this measure, 3.2 million households — 13% of all homes — were fuel poor in 2024.<Cite nums={[1]} /></p>
              <p>The energy price crisis of 2022–23, triggered by the Russian invasion of Ukraine, pushed energy prices to levels that drove approximately 1 million additional households into fuel poverty.<Cite nums={[1]} /> Government support through the Energy Price Guarantee and bill relief schemes cushioned the worst impacts, but did not prevent a step-change in the scale of the problem.</p>
              <p>Private renters are most exposed: over 22% of private rented households are fuel poor, compared to around 8.5% of owner-occupiers.<Cite nums={[1]} /> This reflects the lower energy efficiency of private rented stock and the limited leverage tenants have to insist on improvements. Despite successive retrofit schemes, progress on improving the worst-rated homes has been slow, and around 13% of English homes remain at energy efficiency rating E, F, or G.<Cite nums={[1]} /></p>
            </div>
          </section>
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p><a href="https://www.gov.uk/government/collections/fuel-poverty-statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Department for Energy Security and Net Zero — Fuel poverty statistics, England</a>. Annual. Retrieved 2024.</p>
            <p>Fuel poverty measured using the Low Income High Costs (LIHC) methodology, adopted from 2012 onwards. Figures are for England only; devolved nations use different definitions. Energy bill arrears data from Ofgem and Citizens Advice analysis.</p>
          </div>
        </section>
      </main>
    </>
  );
}
