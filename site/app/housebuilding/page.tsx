'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

const completionsData = [135, 142, 155, 163, 183, 195, 213, 244, 211, 232, 234, 238, 241, 239];
const affordableData = [56, 58, 62, 66, 71, 75, 79, 85, 70, 72, 73, 74, 75, 74];

const completionsSeries: Series[] = [
  {
    id: 'completions',
    label: 'Housing completions (thousands)',
    colour: '#F4A261',
    data: completionsData.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
  },
  {
    id: 'target',
    label: 'Government target (thousands)',
    colour: '#E5E7EB',
    data: completionsData.map((_, i) => ({ date: new Date(2010 + i, 0, 1), value: 300 })),
  },
];

const completionsAnnotations: Annotation[] = [
  { date: new Date(2020, 0, 1), label: '2020: COVID-19' },
  { date: new Date(2023, 0, 1), label: '2023: Planning reforms' },
];

const affordableSeries: Series[] = [
  {
    id: 'affordable',
    label: 'Affordable homes (thousands)',
    colour: '#F4A261',
    data: affordableData.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
  },
  {
    id: 'social',
    label: 'Social rent homes (thousands)',
    colour: '#264653',
    data: ([7, 7, 8, 8, 9, 9, 9, 10, 8, 8, 9, 9, 9, 8]).map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
  },
];

export default function HousebuildingPage() {
  return (
    <>
      <TopicNav topic="Housebuilding" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Housebuilding"
          question="Why Isn't Britain Building Enough Homes?"
          finding="England built 234,000 new homes in 2022/23 — well below the government's 300,000 annual target — with planning delays, labour shortages and viability blocking delivery."
          colour="#F4A261"
          preposition="in"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Key numbers' },
          { id: 'sec-completions', label: 'Completions' },
          { id: 'sec-affordable', label: 'Affordable homes' },
        ]} />

        <section id="sec-metrics" className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="New homes completed (England, 2022/23)"
              value="234,000"
              direction="flat"
              polarity="up-is-good"
              changeText="Target: 300,000/year · Not met since the 1960s · 22% below target"
              sparklineData={[183, 195, 213, 244, 211, 232, 234]}
              source="DLUHC — House Building Statistics, 2023"
            />
            <MetricCard
              label="Target shortfall"
              value="22%"
              direction="up"
              polarity="up-is-bad"
              changeText="66,000 homes short of 300,000 target · Gap widening · Labour target: 1.5M in 5 years"
              sparklineData={[39, 35, 29, 19, 30, 23, 22]}
              source="DLUHC — House Building Statistics, 2023"
            />
            <MetricCard
              label="Social and affordable homes built (thousands)"
              value="73"
              direction="flat"
              polarity="up-is-good"
              changeText="2022/23 · Social rent: 9,000 · Down from 40,000+/yr in 1970s council era"
              sparklineData={[71, 75, 79, 85, 70, 72, 73]}
              source="DLUHC — Affordable Housing Supply, 2023"
            />
          </div>
        </section>

        <ScrollReveal>
          <section id="sec-completions" className="mb-12">
            <LineChart
              title="Housing completions in England, 2010–2024 (thousands)"
              subtitle="Total new dwellings completed per year vs government's 300,000 target. England has not met the target since the 1960s."
              series={completionsSeries}
              annotations={completionsAnnotations}
              targetLine={{ value: 300, label: '300K target' }}
              yLabel="Completions (thousands)"
              source={{
                name: 'DLUHC',
                dataset: 'House Building: New Build Dwellings',
                url: 'https://www.gov.uk/government/statistical-data-sets/live-tables-on-house-building',
                frequency: 'quarterly',
                date: '2023',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-affordable" className="mb-12">
            <LineChart
              title="Affordable and social housing completions, 2010–2024 (thousands)"
              subtitle="Affordable homes (including shared ownership, affordable rent, and social rent) completed per year. Social rent has collapsed."
              series={affordableSeries}
              yLabel="Homes (thousands)"
              source={{
                name: 'DLUHC',
                dataset: 'Affordable Housing Supply Statistics',
                url: 'https://www.gov.uk/government/statistical-data-sets/live-tables-on-affordable-housing-supply',
                frequency: 'annual',
                date: '2023',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The data on housebuilding</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>England completed 234,000 new homes in 2022/23, against a government target of 300,000 per year that has not been met since the 1960s. The gap between aspiration and delivery is structural: planning permissions granted for residential development fell sharply in the early 2020s, and the planning system, a skills shortage of around 100,000 construction vacancies, and developer viability arguments have blocked every previous government from closing the gap.</p>
              <p>Affordable and social housing completions tell an even starker story. Local authorities built over 100,000 homes per year in the 1970s; today they build around 9,000 social rent homes annually. Housing associations build approximately 55,000 homes per year, far short of what is needed to replace what was sold under Right to Buy. Meanwhile Britain's largest housebuilders hold planning permissions for an estimated 1.3 million plots they have not yet built on — a consequence of business models calibrated to managed supply rather than volume.</p>
              <p>Labour's 2024 manifesto committed to 1.5 million homes over five years. The Planning and Infrastructure Bill (2025) reinstates mandatory local planning targets and introduces a new "grey belt" category to release low-quality green belt land. Whether delivery will follow ambition is a question British housing policy has failed to answer for six decades.</p>
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="What's been committed"
            value="1.5M"
            unit="homes targeted by Labour over five years — backed by mandatory planning targets and 'grey belt' land release"
            description="The Planning and Infrastructure Bill (2025) reinstates mandatory local housing targets, introduces grey belt land release, and proposes new development corporations modelled on those that built Milton Keynes and Stevenage. Housing associations are being offered £2 billion in guaranteed loans. The target requires 300,000 completions per year — a level not achieved since Harold Wilson's government."
            source="Source: DLUHC — House Building Statistics 2022/23; Planning and Infrastructure Bill 2025 Impact Assessment."
          />
        </ScrollReveal>

        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p><a href="https://www.gov.uk/government/statistical-data-sets/live-tables-on-house-building" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DLUHC — House Building: New Build Dwellings</a> — primary completions data. Updated quarterly.</p>
            <p><a href="https://www.gov.uk/government/statistical-data-sets/live-tables-on-affordable-housing-supply" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DLUHC — Affordable Housing Supply Statistics</a> — affordable and social rent completions. Updated annually.</p>
            <p>All figures are for England unless otherwise stated. Financial year data is mapped to the start year for charting purposes.</p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
