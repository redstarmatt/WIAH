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

// Carer's Allowance weekly rate (£), 2016–2024
const allowanceRateData = [62.70, 64.60, 64.60, 66.15, 67.25, 67.60, 69.70, 76.75, 81.90];

// Carers in poverty (%) and poverty rate for all working-age adults (%), 2016–2024
const carerPovertyData = [31, 32, 32, 33, 34, 34, 35, 35, 36];
const generalPovertyData = [20, 20, 21, 21, 22, 22, 22, 22, 22];

const allowanceSeries: Series[] = [
  {
    id: 'allowanceRate',
    label: "Carer's Allowance weekly rate (£)",
    colour: '#E63946',
    data: allowanceRateData.map((v, i) => ({ date: new Date(2016 + i, 0, 1), value: v })),
  },
];

const povertySeries: Series[] = [
  {
    id: 'carerPoverty',
    label: 'Carers in poverty (%)',
    colour: '#E63946',
    data: carerPovertyData.map((v, i) => ({ date: new Date(2016 + i, 0, 1), value: v })),
  },
  {
    id: 'generalPoverty',
    label: 'All working-age adults in poverty (%)',
    colour: '#6B7280',
    data: generalPovertyData.map((v, i) => ({ date: new Date(2016 + i, 0, 1), value: v })),
  },
];

const allowanceAnnotations: Annotation[] = [
  { date: new Date(2022, 0, 1), label: '2022: NLW rise makes earnings limit more binding' },
  { date: new Date(2024, 0, 1), label: '2024: Earnings threshold raised to £195/week' },
];

const povertyAnnotations: Annotation[] = [
  { date: new Date(2019, 0, 1), label: '2019: Carers UK finds 600 leaving work daily' },
  { date: new Date(2023, 0, 1), label: '2023: NAO finds widespread overpayment problem' },
];

const editorialRefs: Reference[] = [
  { num: 1, name: 'Carers UK', dataset: 'State of Caring Annual Survey', url: 'https://www.carersuk.org/media-centre/press-releases/state-of-caring-report', date: '2024' },
  { num: 2, name: 'DWP', dataset: "Carer's Allowance Statistics", url: 'https://www.gov.uk/government/collections/carers-allowance-statistics', date: '2024' },
  { num: 3, name: 'NAO', dataset: "Carer's Allowance: DWP's Management of Overpayments", url: 'https://www.nao.org.uk/reports/carers-allowance/', date: '2023' },
];

export default function CarerPovertyPage() {
  return (
    <>
      <TopicNav topic="Carer Poverty" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Social Care"
          question="What Is the Financial Reality for Unpaid Carers?"
          finding="Carer's Allowance is £81.90 per week — the lowest major benefit rate in Europe, equivalent to £2.34 per hour for 35 hours of care. 36% of full-time carers live in poverty, compared to 22% of working-age adults generally. The earnings cliff edge at £195 per week has trapped millions in financial hardship for decades."
          colour="#E63946"
          preposition="for"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>There are approximately 10.6 million unpaid carers in the UK — people who provide regular, often intensive care for a family member or friend with a disability, long-term illness, mental health condition, or age-related need.<Cite nums={1} /> Carers UK estimates that the value of unpaid care is £93 billion per year — comparable to the entire NHS England budget.<Cite nums={1} /> This enormous contribution to the welfare state is largely invisible in national accounts and largely unrewarded in the benefits system. Carer's Allowance — the main benefit for unpaid carers providing 35 or more hours per week of care — is £81.90 per week in 2024, the lowest rate of any major benefit in comparable European welfare states.<Cite nums={2} /> Working out at £2.34 per hour for 35 hours of care, it falls well below any minimum wage calculation.</p>
            <p>The earnings trap built into Carer's Allowance is a source of acute hardship. For most of the period from 2016 to 2023, the benefit was withdrawn entirely if the carer earned above £151 per week — creating a cliff edge where a small pay rise could cost a carer over £3,500 per year in lost benefit.<Cite nums={2} /> Many carers providing 35 or more hours of care per week cannot work full-time, making the earnings limit both insulting and practically harmful. The 2024 Autumn Budget raised the earnings threshold to £195 per week, providing some relief.<Cite nums={2} /> But the 2023 NAO report on Carer's Allowance found widespread problems with overpayment recovery: carers who had unknowingly exceeded the earnings limit were pursued for years for repayments they could not afford, in some cases losing thousands of pounds they had already spent.<Cite nums={3} /></p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: "Allowance Rate" },
          { id: 'sec-chart2', label: 'Poverty Gap' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Carer's Allowance weekly rate"
              value="£81.90"
              unit="2024/25"
              direction="up"
              polarity="up-is-good"
              changeText="Up from £62.70 in 2016 · lowest major benefit in Europe · £2.34/hr for 35hrs care"
              sparklineData={[62.70, 64.60, 64.60, 66.15, 67.25, 67.60, 69.70, 76.75, 81.90]}
              source="DWP · Benefit Rates 2024/25"
              href="#sec-chart1"
            />
            <MetricCard
              label="Full-time carers in poverty"
              value="36%"
              unit="2024"
              direction="up"
              polarity="up-is-bad"
              changeText="vs 22% of working-age adults · up from 31% in 2016"
              sparklineData={[31, 32, 32, 33, 34, 34, 35, 35, 36]}
              source="Carers UK · State of Caring 2024"
              href="#sec-chart2"
            />
            <MetricCard
              label="Carers claiming the Allowance"
              value="900,000"
              unit="of 10.6m eligible"
              direction="up"
              polarity="up-is-bad"
              changeText="Only 8.5% of eligible carers claim · most unaware or ineligible"
              sparklineData={[760, 780, 800, 820, 840, 850, 870, 880, 900]}
              source="DWP · Carer's Allowance Statistics 2024"
              href="#sec-chart1"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Carer's Allowance weekly rate, 2016–2024"
              subtitle="Weekly benefit rate for carers providing 35+ hours of care per week. Rate has risen 31% in cash terms since 2016 but remains the lowest major benefit rate in comparable European welfare states."
              series={allowanceSeries}
              annotations={allowanceAnnotations}
              yLabel="£ per week"
              source={{ name: 'DWP', dataset: "Carer's Allowance benefit rates", url: 'https://www.gov.uk/government/collections/carers-allowance-statistics', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Poverty rates: carers vs all working-age adults, 2016–2024"
              subtitle="Percentage in poverty (below 60% median income after housing costs) for full-time carers (red) versus all working-age adults (grey). The carers' poverty premium has widened from 11pp to 14pp."
              series={povertySeries}
              annotations={povertyAnnotations}
              yLabel="% in poverty"
              source={{ name: 'Carers UK / DWP', dataset: 'State of Caring / Households Below Average Income', url: 'https://www.carersuk.org/media-centre/press-releases/state-of-caring-report', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Earnings threshold raised to £195/week in 2024"
            value="£195"
            unit="new Carer's Allowance earnings threshold"
            description="The 2024 Autumn Budget raised the Carer's Allowance earnings threshold from £151 to £195 per week, allowing part-time working carers to earn more without losing the benefit. An estimated 45,000 additional carers are now able to work while retaining their Allowance. The Carer's Leave Act 2024 also gives all working carers five days of unpaid statutory leave, recognised for the first time as a right rather than a discretionary employer concession. The government has also committed to reviewing the Carer's Allowance overpayment debt issue, following the NAO report that found thousands of carers had been pursued for debts arising from the cliff-edge structure of the benefit."
            source="Source: DWP — Carer's Allowance earnings threshold reform 2024. NAO — Carer's Allowance overpayments report 2023."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.gov.uk/government/collections/carers-allowance-statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DWP — Carer's Allowance Statistics</a> — claimant counts and benefit rate history. Retrieved March 2026.</p>
            <p><a href="https://www.carersuk.org/media-centre/press-releases/state-of-caring-report" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Carers UK — State of Caring Annual Survey</a> — poverty rates, financial impact, and employment consequences. Retrieved March 2026.</p>
            <p><a href="https://www.nao.org.uk/reports/carers-allowance/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NAO — Carer's Allowance: DWP's Management of Overpayments</a> — overpayment analysis and debt recovery impact. Retrieved March 2026.</p>
            <p className="mt-2">Poverty figures use the 60% of median income after housing costs threshold from Carers UK survey analysis cross-referenced against DWP Households Below Average Income data. Carer's Allowance rates are nominal cash values; real value has lagged CPI inflation in several years. Claimant figures are DWP administrative data.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
