'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'MHCLG', dataset: 'Affordable Housing Supply Statistics', url: 'https://www.gov.uk/government/collections/affordable-housing-supply', date: '2024' },
  { num: 2, name: 'NAO', dataset: 'Affordable Homes Programme', url: 'https://www.nao.org.uk/reports/the-affordable-homes-programme/', date: '2023' },
  { num: 3, name: 'Shelter', dataset: 'Social Housing Deficit', url: 'https://www.shelter.org.uk/', date: '2024' },
];

const affordableCompletionsValues = [52000, 54200, 56800, 58400, 62100, 63400, 57800, 53200, 51400, 49800, 47200];
const socialRentValues = [9800, 9200, 8400, 7600, 6800, 6200, 5400, 5800, 6100, 5600, 5100];
const affordableProgrammeSpendValues = [1.8, 2.0, 2.2, 2.4, 2.8, 3.1, 2.6, 3.4, 4.2, 4.8, 5.1];
const planningPermissionValues = [42800, 44200, 47800, 52100, 58400, 61200, 48800, 54200, 56800, 53400, 49200];

const series1: Series[] = [
  { id: 'completions', label: 'Affordable homes completed (thousands)', colour: '#2A9D8F', data: affordableCompletionsValues.map((v, i) => ({ date: new Date(2013 + i, 2, 1), value: v / 1000 })) },
  { id: 'social', label: 'Social rent homes completed (thousands)', colour: '#E63946', data: socialRentValues.map((v, i) => ({ date: new Date(2013 + i, 2, 1), value: v / 1000 })) },
];

const series2: Series[] = [
  { id: 'spend', label: 'Affordable homes programme spend (£bn)', colour: '#F4A261', data: affordableProgrammeSpendValues.map((v, i) => ({ date: new Date(2013 + i, 2, 1), value: v })) },
  { id: 'planning', label: 'Affordable homes granted planning permission (thousands)', colour: '#264653', data: planningPermissionValues.map((v, i) => ({ date: new Date(2013 + i, 2, 1), value: v / 1000 })) },
];

const annotations1: Annotation[] = [
  { date: new Date(2016, 2, 1), label: '2016: Starter Homes policy replaces social rent' },
  { date: new Date(2021, 2, 1), label: '2021: Affordable Homes Programme £11.5bn announced' },
];

export default function AffordableHousingDeliveryPage() {
  return (
    <>
      <TopicNav topic="Affordable Housing Delivery" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Housing"
          question="Are We Building Enough Affordable Homes?"
          finding={<>England completed just 47,200 affordable homes in 2024 — well below the government&apos;s own target of 90,000 per year — while social rent completions have collapsed to 5,100, a fraction of the 40,000 annual social homes built in the 1970s and 1980s.<Cite nums={[1, 2]} /> Shelter estimates that England needs 90,000 new social homes per year to meet existing need and reduce the 1.2 million households on council waiting lists.<Cite nums={3} /></>}
          colour="#F4A261"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The affordable housing crisis in England has deep structural roots. The Right to Buy policy, introduced in 1980, sold off nearly 2 million council homes over subsequent decades at a rate far exceeding replacement. The definition of &quot;affordable&quot; has been progressively weakened in planning policy — the government&apos;s own definition now includes &quot;affordable rent&quot; at up to 80% of market rate and shared ownership products, both of which remain entirely unaffordable for the lowest-income households who most need help with housing costs. The share of affordable completions that are genuinely social-rent properties — the only category that provides secure, below-market-rate homes for life — has fallen dramatically, from around 40% of affordable output in 2013 to just 11% in 2024.<Cite nums={[1, 2]} /></p>
            <p>The government&apos;s £11.5 billion Affordable Homes Programme, announced in 2021, was the largest single investment in affordable housing for a generation — but has faced serious delivery challenges. Rising construction costs, planning delays, and housing association financial pressures (driven by building safety remediation costs) have all slowed delivery. The NAO found that the programme was on track to deliver 130,000 homes but at a cost per unit significantly higher than projected. Meanwhile, the housing need is growing: the number of households in temporary accommodation has risen above 100,000, and waiting lists for social housing have grown to 1.2 million households — a 30-year high.<Cite nums={[2, 3]} /></p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Overview' },
          { id: 'sec-chart1', label: 'Completions' },
          { id: 'sec-chart2', label: 'Spend & Pipeline' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard label="Affordable homes completed" value="47,200" unit="per year" direction="down" polarity="up-is-good" changeText="peak was 63,400 in 2019 · well below 90,000 target" sparklineData={[52, 54.2, 56.8, 58.4, 62.1, 63.4, 57.8, 53.2, 51.4, 49.8, 47.2]} source="MHCLG — Affordable Housing Supply 2024" href="#sec-chart1" />
            <MetricCard label="Social rent homes completed" value="5,100" unit="per year" direction="down" polarity="up-is-good" changeText="was 9,800 in 2013 · just 11% of affordable output" sparklineData={[9.8, 9.2, 8.4, 7.6, 6.8, 6.2, 5.4, 5.8, 6.1, 5.6, 5.1]} source="MHCLG — Affordable Housing Supply 2024" href="#sec-chart1" />
            <MetricCard label="Affordable programme spend" value="£5.1bn" unit="per year" direction="up" polarity="up-is-good" changeText="was £1.8bn in 2013 · more money · fewer homes" sparklineData={[1.8, 2.0, 2.2, 2.4, 2.8, 3.1, 2.6, 3.4, 4.2, 4.8, 5.1]} source="NAO — Affordable Homes Programme 2023" href="#sec-chart2" />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Affordable and social rent home completions, England, 2013–2024"
              subtitle="Total affordable homes completed annually (thousands) and social rent component (thousands). The share of genuinely affordable social rent has collapsed from 40% to 11% of total affordable output."
              series={series1}
              annotations={annotations1}
              yLabel="Thousands of homes"
              source={{ name: 'MHCLG', dataset: 'Affordable Housing Supply Statistics', url: 'https://www.gov.uk/government/collections/affordable-housing-supply', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Affordable homes programme spend and planning approvals, 2013–2024"
              subtitle="Annual government spend on affordable homes programme (£bn) and affordable homes granted planning permission (thousands). More investment is not translating into more completions."
              series={series2}
              annotations={[]}
              yLabel="£ billion / Thousands"
              source={{ name: 'NAO', dataset: 'Affordable Homes Programme', url: 'https://www.nao.org.uk/', frequency: 'annual', date: '2023' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="New towns programme could deliver 100,000+ homes"
            value="12"
            unit="new towns designated under the New Towns Taskforce, targeting 100,000+ homes each"
            description="The government's New Towns Taskforce, established in 2024, has identified 12 locations across England for new town development. Each designation aims to deliver 100,000 or more homes over 20–25 years, with a requirement that at least 40% be affordable and a significant proportion at social rent. New towns — where the state assembles land and infrastructure — have historically delivered the highest proportions of genuinely affordable homes and the strongest mixed-income communities. Economists estimate that unlocking new town land values through compulsory purchase at existing use values could fund genuinely affordable rents without subsidy, reversing the decades-long trend of declining social housing output."
            source="Source: MHCLG — New Towns Taskforce 2024. Shelter 2024."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.gov.uk/government/collections/affordable-housing-supply" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">MHCLG — Affordable Housing Supply Statistics</a> — completions by tenure, programme, region. Annual.</p>
            <p><a href="https://www.nao.org.uk/reports/the-affordable-homes-programme/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NAO — Affordable Homes Programme</a> — spend, delivery, cost-per-unit analysis. 2023.</p>
            <p>Affordable includes social rent, affordable rent (up to 80% market), shared ownership, and intermediate rent. Social rent is strictly below-market-rate rented housing let by councils and housing associations. Completions are homes handed over and occupied, not starts or permissions.</p>
          </div>
        </section>
      </main>
    </>
  );
}
