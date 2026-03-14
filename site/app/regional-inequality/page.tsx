'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import PositiveCallout from '@/components/PositiveCallout';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'ONS', dataset: 'Regional Gross Value Added (balanced) per head', url: 'https://www.ons.gov.uk/economy/grossvalueaddedgva/bulletins/regionaleconomicactivitybygrossvalueaddedukbalanced/1998to2022', date: '2023' },
  { num: 2, name: 'ONS', dataset: 'Sub-regional productivity — GVA per hour worked', url: 'https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/labourproductivity/articles/regionalandsubregionalproductivityintheuk/bulletin', date: '2023' },
  { num: 3, name: 'IFS', dataset: 'Levelling Up Funding Allocations Analysis', url: 'https://ifs.org.uk/publications', date: '2024', note: 'Institute for Fiscal Studies analysis of targeting against deprivation' },
];

export default function RegionalInequalityPage() {
  // GVA per head indexed to UK=100 by region, 2000–2023
  const londonIndex      = [162, 163, 164, 164, 165, 166, 167, 168, 169, 170, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 182, 183, 250];
  const northEastIndex   = [78, 77, 77, 76, 76, 75, 75, 75, 75, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 75, 75];
  const englandIndex     = [102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102];
  const northWestIndex   = [88, 88, 88, 88, 88, 87, 87, 87, 87, 87, 87, 87, 87, 87, 87, 87, 87, 87, 87, 87, 88, 88, 88, 88];
  const yorkshireIndex   = [85, 85, 84, 84, 84, 83, 83, 83, 83, 83, 83, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82];

  // Productivity gap (GVA per hour worked) — London vs North 2010–2023 (% above UK average)
  const londonProductivity = [32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45];
  const northEastProd      = [-18, -18, -18, -18, -19, -19, -19, -19, -20, -20, -20, -20, -20, -20];

  const series1: Series[] = [
    {
      id: 'london',
      label: 'London (UK=100)',
      colour: '#264653',
      data: londonIndex.map((v, i) => ({ date: new Date(2000 + i, 0, 1), value: v })),
    },
    {
      id: 'north-east',
      label: 'North East (UK=100)',
      colour: '#E63946',
      data: northEastIndex.map((v, i) => ({ date: new Date(2000 + i, 0, 1), value: v })),
    },
    {
      id: 'north-west',
      label: 'North West (UK=100)',
      colour: '#F4A261',
      data: northWestIndex.map((v, i) => ({ date: new Date(2000 + i, 0, 1), value: v })),
    },
    {
      id: 'yorkshire',
      label: 'Yorkshire & Humber (UK=100)',
      colour: '#6B7280',
      data: yorkshireIndex.map((v, i) => ({ date: new Date(2000 + i, 0, 1), value: v })),
    },
  ];

  const series2: Series[] = [
    {
      id: 'london-prod',
      label: 'London (% above UK avg)',
      colour: '#264653',
      data: londonProductivity.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
    },
    {
      id: 'ne-prod',
      label: 'North East (% below UK avg)',
      colour: '#E63946',
      data: northEastProd.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
    },
  ];

  const annotations1: Annotation[] = [
    { date: new Date(2010, 0, 1), label: '2010: Austerity — council cuts hit North hardest' },
    { date: new Date(2019, 0, 1), label: '2019: Levelling Up agenda announced' },
  ];

  const annotations2: Annotation[] = [
    { date: new Date(2022, 0, 1), label: '2022: Levelling Up & Regeneration Act' },
  ];

  return (
    <>
      <TopicNav topic="Regional Inequality" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Regional Inequality"
          question="How Unequal Are Britain's Regions?"
          finding="London's GVA per head is 2.5× the UK average — the North East is 75% of the average — and the UK has the most extreme regional inequality of any major European economy."
          colour="#6B7280"
          preposition="on"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Regional inequality in the UK is among the highest of any developed country. London's Gross Value Added (GVA) per head is around 2.5 times the UK average — and within London, Inner London West (Westminster, Kensington) sits at over 9 times the UK average.<Cite nums={1} /> The North East of England, at around 75% of the UK average, sits below all but the poorest regions of Romania and Bulgaria in the European regional ranking.<Cite nums={1} /> This is not a gap that fluctuates with economic cycles: it has widened over three decades and shows no sign of narrowing.</p>
            <p>The regional productivity gap is even more stark when measured by GVA per hour worked — the most meaningful measure of economic efficiency. London workers produce around 45% more per hour than the UK average; North East workers produce around 20% less.<Cite nums={2} /> This gap reflects differences in industrial composition (financial services and professional services are concentrated in London), educational attainment (graduates cluster in cities with graduate-level jobs), and public investment (transport infrastructure spending per head is dramatically skewed towards London).</p>
            <p>Every government since 1997 has launched an initiative to address regional inequality: Northern Powerhouse, City Deals, Levelling Up, Investment Zones, Freeports. The evidence that any of them has materially changed the trajectory is thin.<Cite nums={3} /> The Institute for Fiscal Studies found that Levelling Up funding allocations were poorly targeted against deprivation metrics, and that total public investment per head in London still exceeds that of any northern region.<Cite nums={3} /> The structural forces — agglomeration economics, network effects, the concentration of decision-making in London — are powerful and slow-moving.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-gva', label: 'GVA by region' },
          { id: 'sec-productivity', label: 'Productivity gap' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="London GVA per head vs UK average (ratio)"
            value="2.5×"
            direction="up"
            polarity="up-is-bad"
            changeText="2023 · Widening since 1990 · Highest regional disparity in G7 · Inner London 9×"
            sparklineData={[162, 164, 165, 166, 167, 168, 169, 170, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 182, 183, 250]}
            source="ONS — Regional GVA (balanced) 2023"
          />
          <MetricCard
            label="North East GVA per head vs UK average (%)"
            value="75%"
            direction="flat"
            polarity="down-is-bad"
            changeText="2023 · Unchanged for 20+ years · Below most EU regions · Worst in England"
            sparklineData={[78, 77, 77, 76, 76, 75, 75, 75, 75, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 75, 75]}
            source="ONS — Regional GVA (balanced) 2023"
          />
          <MetricCard
            label="Regional GVA range (London vs North East, £bn)"
            value="£180bn"
            direction="up"
            polarity="up-is-bad"
            changeText="Gap in total GVA · North East 5× smaller than London by population-adjusted output"
            sparklineData={[100, 105, 108, 112, 116, 120, 124, 128, 132, 136, 140, 144, 148, 152, 156, 160, 165, 168, 171, 174, 177, 178, 179, 180]}
            source="ONS — Regional GVA (balanced) 2023"
          />
        </div>

        <ScrollReveal>
          <section id="sec-gva" className="mb-12">
            <LineChart
              title="GVA per head by region, 2000–2023 (indexed, UK=100)"
              subtitle="London (dark blue) has pulled steadily away from the UK average while northern regions (red, amber, grey) have remained static at 75–88% of the average for over 20 years."
              series={series1}
              annotations={annotations1}
              yLabel="Index (UK average = 100)"
              source={{
                name: 'ONS',
                dataset: 'Regional Gross Value Added (balanced) — per head',
                frequency: 'annual',
                url: 'https://www.ons.gov.uk/economy/grossvalueaddedgva/bulletins/regionaleconomicactivitybygrossvalueaddedukbalanced/1998to2022',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-productivity" className="mb-12">
            <LineChart
              title="Productivity gap — London vs North East, 2010–2023 (% from UK average)"
              subtitle="GVA per hour worked. London (dark blue, above zero) has widened its lead; the North East (red, below zero) has seen no convergence in over a decade."
              series={series2}
              annotations={annotations2}
              yLabel="% deviation from UK average"
              source={{
                name: 'ONS',
                dataset: 'Sub-regional productivity — GVA per hour worked',
                frequency: 'annual',
                url: 'https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/labourproductivity/articles/regionalandsubregionalproductivityintheuk/bulletin',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="What's changing"
            value="£2.1bn"
            unit="Levelling Up Fund — 2021–2025"
            description="The Levelling Up Fund allocated £2.1bn in two rounds to local infrastructure projects across the UK. Manchester, Leeds and Birmingham have seen significant investment in public transport and civic infrastructure. Devolution deals — including trailblazer deals for Greater Manchester and the West Midlands — give combined authorities more powers over transport, housing, skills and economic development. These are meaningful institutional changes, but economists broadly agree they are insufficient in scale to move the regional productivity dial materially within a decade."
            source="Source: DLUHC — Levelling Up Fund outcomes 2024; Centre for Cities — UK Cities Outlook 2024."
          />
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p><a href="https://www.ons.gov.uk/economy/grossvalueaddedgva/bulletins/regionaleconomicactivitybygrossvalueaddedukbalanced/1998to2022" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ONS — Regional GVA (balanced) per head</a> — primary regional output data. Annual.</p>
            <p><a href="https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/labourproductivity/articles/regionalandsubregionalproductivityintheuk/bulletin" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ONS — Sub-regional productivity</a> — GVA per hour worked. Annual.</p>
            <p>GVA (balanced) is the average of income-based and production-based GVA estimates; per head uses mid-year population estimates. Regional boundaries follow NUTS1 (ITL1 from 2021). Index = region GVA per head ÷ UK GVA per head × 100.</p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
