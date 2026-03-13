'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import PositiveCallout from '@/components/PositiveCallout';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

// Total fertility rate (TFR), UK, 2010–2023 — ONS
const tfrValues = [1.98, 1.96, 1.94, 1.90, 1.83, 1.82, 1.81, 1.76, 1.70, 1.66, 1.60, 1.56, 1.56, 1.49];

// Average age at first birth, 2010–2023 — ONS
const ageFirstBirthValues = [27.3, 27.5, 27.7, 27.9, 28.0, 28.3, 28.5, 28.6, 28.8, 29.0, 29.1, 29.3, 29.4, 29.6];

// Births per year (thousands), 2010–2023 — ONS
const birthsValues = [724, 724, 729, 729, 695, 697, 696, 679, 657, 640, 614, 625, 615, 591];

const tfrSeries: Series[] = [
  {
    id: 'tfr',
    label: 'Total fertility rate',
    colour: '#264653',
    data: tfrValues.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
  },
];

const birthsSeries: Series[] = [
  {
    id: 'births',
    label: 'Live births (thousands)',
    colour: '#2A9D8F',
    data: birthsValues.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
  },
];

const tfrAnnotations: Annotation[] = [
  { date: new Date(2014, 0, 1), label: '2014: TFR peaks at 1.83 then falls' },
  { date: new Date(2020, 0, 1), label: '2020: COVID — births fall further' },
];

export default function FertilityRatePage() {
  return (
    <>
      <TopicNav topic="Fertility Rate" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Fertility Rate"
          question="Is Britain Having Fewer Babies?"
          finding="The UK total fertility rate fell to 1.49 in 2023 — the lowest since records began in 1938. Births fell to 591,000. Well below the 2.1 replacement rate, this is reshaping the UK's demographic future. Women are having children later, or not at all."
          colour="#264653"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The UK's total fertility rate (TFR) — the average number of children a woman is expected to have over her lifetime at current rates — fell to 1.49 in 2023, the lowest since ONS records began. This is well below the replacement rate of 2.1 children per woman needed to maintain a stable population without migration. The decline has been consistent since 2012, when the TFR reached 1.94. The most significant driver is delayed childbearing: the average age at first birth rose from 27.3 in 2010 to 29.6 in 2023, reflecting the financial and career pressures on younger adults — particularly housing costs, student debt, insecure employment, and the high cost of childcare.</p>
            <p>Childlessness rates are also rising. ONS projections suggest that around 20% of women born in the 1990s will remain childless throughout their lives — up from 17% for those born in the 1970s. The fall in births from 724,000 in 2012 to 591,000 in 2023 — a 18% decline in eleven years — will feed through to school rolls (already falling), the working-age population (projected to shrink from the mid-2030s), and ultimately pension sustainability. The government has no explicit pronatalist policy, though improvements to childcare entitlement — 30 hours for 2-year-olds from September 2024 — may marginally reduce the cost barrier. International evidence suggests childcare expansion alone has limited effects on fertility; housing affordability and job security are more important determinants.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Fertility rate' },
          { id: 'sec-chart2', label: 'Live births' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Total fertility rate (2023)"
              value="1.49"
              unit=""
              direction="down"
              polarity="neutral"
              changeText="Lowest on record · well below 2.1 replacement rate"
              sparklineData={[1.98, 1.96, 1.90, 1.83, 1.82, 1.76, 1.70, 1.60, 1.56, 1.49]}
              source="ONS · Birth characteristics in England and Wales 2023"
              href="#sec-chart1"
            />
            <MetricCard
              label="Annual live births"
              value="591,000"
              unit=""
              direction="down"
              polarity="neutral"
              changeText="Down from 724,000 in 2012 · 18% fall in 11 years"
              sparklineData={[724, 724, 729, 695, 697, 679, 657, 614, 615, 591]}
              source="ONS · Birth statistics 2023"
              href="#sec-chart2"
            />
            <MetricCard
              label="Average age at first birth"
              value="29.6"
              unit="years"
              direction="up"
              polarity="neutral"
              changeText="Up from 27.3 in 2010 · housing and costs delaying families"
              sparklineData={[27.3, 27.5, 27.9, 28.0, 28.3, 28.5, 28.8, 29.0, 29.3, 29.6]}
              source="ONS · Birth characteristics 2023"
              href="#sec-chart1"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="UK total fertility rate, 2010–2023"
              subtitle="Average number of children per woman at current rates. Replacement rate is 2.1. UK fertility has fallen every year since 2012."
              series={tfrSeries}
              annotations={tfrAnnotations}
              yLabel="Total fertility rate"
              source={{ name: 'ONS', dataset: 'Birth characteristics in England and Wales', url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/birthsdeathsandmarriages/livebirths/bulletins/birthcharacteristicsinenglandandwales/latest', frequency: 'annual', date: '2023' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Annual live births, UK, 2010–2023"
              subtitle="Total live births registered in the UK. Down 18% since peak in 2012. Falling school rolls, labour force, and pension base are downstream consequences."
              series={birthsSeries}
              annotations={[{ date: new Date(2020, 0, 1), label: '2020: COVID further reduces births' }]}
              yLabel="Live births (thousands)"
              source={{ name: 'ONS', dataset: 'Birth statistics, England and Wales', url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/birthsdeathsandmarriages/livebirths', frequency: 'annual', date: '2023' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="30-hour childcare for 2-year-olds from September 2024"
            value="30 hrs"
            description="The government's expansion of free childcare entitlement — 30 hours per week for 2-year-olds from September 2024, and for babies from 9 months from September 2025 — is the largest expansion of state-supported childcare in UK history. For families who wish to have children but are deterred by cost, this removes a significant financial barrier: average nursery fees of £14,000 per year for a child under 2 are the highest in the OECD relative to wages. Evidence from Scandinavian countries suggests that reducing the cost of childcare increases maternal employment significantly, though the effect on birth rates is modest — typically 0.1–0.15 children per woman over a decade."
            source="Source: DfE — Childcare expansion programme 2024. OECD — Family database: childcare costs and female employment."
          />
        </ScrollReveal>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.ons.gov.uk/peoplepopulationandcommunity/birthsdeathsandmarriages/livebirths/bulletins/birthcharacteristicsinenglandandwales/latest" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ONS — Birth characteristics in England and Wales</a> — annual data on live births, fertility rates, and age at first birth.</p>
            <p><a href="https://www.ons.gov.uk/peoplepopulationandcommunity/populationandmigration/populationprojections" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ONS — National population projections</a> — projections of UK population under different fertility assumptions.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
