'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import PositiveCallout from '@/components/PositiveCallout';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

// IVF cycles per year (thousands), 2013–2022 — HFEA
const ivfCyclesValues = [68, 69, 71, 73, 75, 75, 76, 68, 74, 75];

// NHS-funded IVF cycles (% of total), 2013–2022 — HFEA
const nhsFundedValues = [52, 50, 48, 46, 44, 42, 40, 38, 37, 36];

// IVF success rate per embryo transfer (%), 2013–2022 — HFEA
const successRateValues = [25, 25, 26, 27, 28, 29, 30, 30, 31, 32];

const ivfSeries: Series[] = [
  {
    id: 'cycles',
    label: 'IVF cycles per year (thousands)',
    colour: '#264653',
    data: ivfCyclesValues.map((v, i) => ({ date: new Date(2013 + i, 0, 1), value: v })),
  },
];

const fundingSeries: Series[] = [
  {
    id: 'nhs-funded',
    label: 'NHS-funded IVF cycles (%)',
    colour: '#E63946',
    data: nhsFundedValues.map((v, i) => ({ date: new Date(2013 + i, 0, 1), value: v })),
  },
  {
    id: 'success-rate',
    label: 'Success rate per transfer (%)',
    colour: '#2A9D8F',
    data: successRateValues.map((v, i) => ({ date: new Date(2013 + i, 0, 1), value: v })),
  },
];

const ivfAnnotations: Annotation[] = [
  { date: new Date(2020, 2, 1), label: '2020: COVID — clinics closed for months' },
];

export default function FertilityTreatmentPage() {
  return (
    <>
      <TopicNav topic="Fertility Treatment" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Fertility Treatment"
          question="Is IVF Actually Available on the NHS?"
          finding="NHS-funded IVF cycles have fallen from 52% of all treatments in 2013 to just 36% in 2022. NICE recommends 3 NHS cycles for women under 40, but most CCGs/ICBs only fund 1. A 'postcode lottery' means NHS provision varies from 0 to 3 cycles depending on where you live."
          colour="#264653"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>IVF is one of the most significant medical advances of the past fifty years — around 1 in 60 children born in the UK are now conceived through in vitro fertilisation or other assisted reproduction. But access through the NHS has declined steadily as ICBs (formerly CCGs) have restricted funding under financial pressure. NICE guidance recommends three full cycles of IVF for women under 40 who have not conceived after two years of trying — but the majority of NHS areas now fund only one cycle, and some areas fund none. The proportion of IVF cycles funded by the NHS fell from 52% in 2013 to 36% in 2022, meaning the majority of treatments are now privately funded at an average cost of £5,000–£8,000 per cycle.</p>
            <p>The result is a profound access inequality: the ability to pursue fertility treatment has become largely dependent on personal wealth. Average annual IVF treatment costs of £5,000–£8,000 — combined with the typical requirement for two to three cycles before success — mean total costs can reach £20,000 or more, which is inaccessible for most families. Women from deprived areas are significantly less likely to pursue treatment and significantly more likely to give up after a first failed cycle than women from wealthier areas, even when NHS funding is theoretically available. Success rates per embryo transfer have improved significantly — from around 25% in 2013 to 32% in 2022 — due to advances in laboratory techniques and genetic pre-screening. But these improvements benefit private patients more than NHS patients given the volume disparity.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'IVF volumes' },
          { id: 'sec-chart2', label: 'NHS funding & success' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="NHS-funded IVF (% of cycles)"
              value="36%"
              unit=""
              direction="down"
              polarity="down-is-bad"
              changeText="Down from 52% in 2013 · postcode lottery intensifying"
              sparklineData={[52, 50, 48, 46, 44, 42, 40, 38, 37, 36]}
              source="HFEA · Fertility treatment trends report 2022"
              href="#sec-chart2"
            />
            <MetricCard
              label="Annual IVF cycles"
              value="75,000"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="Up from 68,000 in 2013 · growth driven by private sector"
              sparklineData={[68, 69, 71, 73, 75, 75, 76, 68, 74, 75]}
              source="HFEA · Fertility treatment trends report 2022"
              href="#sec-chart1"
            />
            <MetricCard
              label="IVF success rate per transfer"
              value="32%"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="Up from 25% in 2013 · improved lab techniques and genetic screening"
              sparklineData={[25, 25, 26, 27, 28, 29, 30, 30, 31, 32]}
              source="HFEA · Fertility treatment trends report 2022"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="IVF cycles in the UK, 2013–2022"
              subtitle="Total IVF cycles carried out annually in licensed UK clinics. Fell sharply in 2020 due to COVID clinic closures; recovered to pre-pandemic levels by 2022."
              series={ivfSeries}
              annotations={ivfAnnotations}
              yLabel="Cycles (thousands)"
              source={{ name: 'HFEA', dataset: 'Fertility treatment trends and figures', url: 'https://www.hfea.gov.uk/about-us/publications/research-and-data/', frequency: 'annual', date: '2022' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="NHS-funded IVF share and success rates, UK, 2013–2022"
              subtitle="Percentage of all IVF cycles funded by NHS (falling) and success rate per embryo transfer (rising). NHS proportion declining as ICBs restrict funding."
              series={fundingSeries}
              annotations={[]}
              yLabel="% value"
              source={{ name: 'HFEA', dataset: 'Fertility treatment trends and figures', url: 'https://www.hfea.gov.uk/about-us/publications/research-and-data/', frequency: 'annual', date: '2022' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Success rates doubled since IVF was first offered on the NHS"
            value="2×"
            description="When IVF was first routinely offered on the NHS in the 1990s, success rates per cycle were around 14–16%. By 2022, the rate per embryo transfer reached 32% — more than double — due to improvements in embryo culture conditions, genetic pre-implantation screening, and cryopreservation techniques. The HFEA's regulatory framework is internationally recognised as a model for fertility regulation, balancing clinical innovation with safety and welfare. If NICE recommendations for three NHS cycles were implemented nationally, modelling suggests an additional 3,000–4,000 births per year would result from NHS-funded IVF, with direct NHS costs substantially offset by reduced demand for other fertility-related services."
            source="Source: HFEA — Fertility treatment trends 2022. NICE — Fertility: assessment and treatment (CG156) 2013, updated 2023."
          />
        </ScrollReveal>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.hfea.gov.uk/about-us/publications/research-and-data/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">HFEA — Fertility treatment trends and figures</a> — annual register of all IVF and other licensed fertility treatments in UK clinics, including funding source and outcome data.</p>
            <p><a href="https://www.nice.org.uk/guidance/cg156" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NICE — Fertility assessment and treatment (CG156)</a> — clinical guideline on fertility investigation and IVF eligibility criteria.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
