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
  { num: 1, name: 'ONS', dataset: 'Household Saving Ratio', url: 'https://www.ons.gov.uk/economy/nationalaccounts/uksectoraccounts/datasets/householdsavingsratio', date: '2024' },
  { num: 2, name: 'Bank of England', dataset: 'Household Sector Report', url: 'https://www.bankofengland.co.uk/statistics/household-sector', date: '2024' },
  { num: 3, name: 'Resolution Foundation', dataset: 'Wealth Gap Report', url: 'https://www.resolutionfoundation.org/', date: '2024' },
];

const savingsRatioValues = [6.8, 6.2, 5.4, 5.2, 5.0, 5.1, 27.4, 10.2, 7.8, 8.1, 7.9];
const zeroSavingsValues = [18.2, 19.1, 19.8, 20.4, 21.2, 22.1, 18.4, 19.8, 23.4, 25.1, 26.8];
const wealthInequalityValues = [42.5, 43.1, 43.8, 44.2, 44.8, 45.2, 44.8, 45.4, 46.1, 46.8, 47.2];
const pensionSavingsGapValues = [14.2, 14.8, 15.1, 15.6, 16.1, 16.5, 16.8, 17.4, 18.1, 18.8, 19.4];

const series1: Series[] = [
  { id: 'ratio', label: 'Household saving ratio (%)', colour: '#264653', data: savingsRatioValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
  { id: 'zero', label: 'Adults with no savings (%)', colour: '#E63946', data: zeroSavingsValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
];

const series2: Series[] = [
  { id: 'wealth', label: 'Top 10% share of household wealth (%)', colour: '#6B7280', data: wealthInequalityValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
  { id: 'pension', label: 'Adults undersaving for retirement (millions)', colour: '#F4A261', data: pensionSavingsGapValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
];

const annotations1: Annotation[] = [
  { date: new Date(2020, 2, 1), label: '2020: COVID — saving ratio surged to 27.4%' },
  { date: new Date(2022, 0, 1), label: '2022: Cost of living depleted savings' },
];

export default function HouseholdSavingsRatioPage() {
  return (
    <>
      <TopicNav topic="Household Savings Ratio" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Economy"
          question="Are British Households Saving Enough?"
          finding={<>The UK household saving ratio stands at 7.9% — above the pre-pandemic average but masking severe inequality: 26.8% of adults have no savings at all, and 19.4 million people are estimated to be undersaving for retirement despite workplace auto-enrolment.<Cite nums={[1, 3]} /> The COVID pandemic created a surplus savings stockpile for the top half of earners that has now been spent down.<Cite nums={[1, 2]} /></>}
          colour="#6B7280"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The headline household saving ratio — the proportion of disposable income that households save rather than spend — conceals a profound inequality. When the ratio surged to 27.4% during the COVID pandemic, this reflected households with secure incomes unable to spend on travel, hospitality, and services. The majority of this &quot;forced saving&quot; accrued to higher-income households, widening the wealth gap. Meanwhile, lower-income households — whose spending is dominated by essentials like food and rent — had no surplus to save and in many cases ran down existing small buffers. The 2022–23 cost of living crisis then caused many middle-income households to spend down their pandemic savings buffers, returning the national saving ratio to around 8% while leaving around 27% of adults with no savings at all.<Cite nums={[1, 2]} /></p>
            <p>The most consequential dimension of the savings deficit is pensions. Auto-enrolment — introduced from 2012 — has been a genuine success in bringing more workers into pension saving: participation among eligible employees has risen from 55% to 89%. But the default contribution rate of 8% (3% employer plus 5% employee) is widely acknowledged by actuaries and the Pensions Policy Institute to be insufficient for most people to achieve an adequate retirement income. The Resolution Foundation estimates that 19.4 million working-age people are undersaving for retirement on current trajectories — a figure that will translate into widespread pensioner poverty in the 2040s and 2050s unless contribution rates are increased or the state pension is substantially enhanced.<Cite nums={3} /></p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Overview' },
          { id: 'sec-chart1', label: 'Saving Ratio' },
          { id: 'sec-chart2', label: 'Wealth Inequality' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard label="Household saving ratio" value="7.9%" unit="of disposable income" direction="up" polarity="up-is-good" changeText="was 6.8% pre-pandemic · masks deep inequality" sparklineData={[6.8, 6.2, 5.4, 5.2, 5.0, 5.1, 27.4, 10.2, 7.8, 8.1, 7.9]} source="ONS — Household Saving Ratio 2024" href="#sec-chart1" />
            <MetricCard label="Adults with no savings" value="26.8%" unit="of adults" direction="up" polarity="up-is-bad" changeText="was 18.2% in 2013 · cost of living depleting savings" sparklineData={[18.2, 19.1, 19.8, 20.4, 21.2, 22.1, 18.4, 19.8, 23.4, 25.1, 26.8]} source="FCA — Financial Lives Survey 2024" href="#sec-chart1" />
            <MetricCard label="Adults undersaving for retirement" value="19.4M" unit="working-age people" direction="up" polarity="up-is-bad" changeText="despite auto-enrolment · 8% default rate insufficient" sparklineData={[14.2, 14.8, 15.1, 15.6, 16.1, 16.5, 16.8, 17.4, 18.1, 18.8, 19.4]} source="Resolution Foundation — Wealth Gap Report 2024" href="#sec-chart2" />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Household saving ratio and adults with no savings, 2013–2024"
              subtitle="Household saving ratio (% of disposable income) and adults with zero savings (%). The COVID surge in savings went overwhelmingly to higher earners; lower earners have depleted buffers."
              series={series1}
              annotations={annotations1}
              yLabel="Percentage (%)"
              source={{ name: 'ONS', dataset: 'Household Saving Ratio', url: 'https://www.ons.gov.uk/', frequency: 'quarterly', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Wealth concentration and pension savings gap, 2013–2024"
              subtitle="Share of household wealth held by the top 10% and adults estimated to be undersaving for retirement (millions). Both rising — wealth is concentrating while the pension savings gap widens."
              series={series2}
              annotations={[]}
              yLabel="% / Millions"
              source={{ name: 'Resolution Foundation', dataset: 'Wealth Gap Report', url: 'https://www.resolutionfoundation.org/', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Auto-enrolment: 10 million new savers since 2012"
            value="10M"
            unit="additional workers enrolled in workplace pensions since 2012"
            description="The automatic enrolment programme, which requires employers to enrol eligible workers in a workplace pension (with an opt-out option), has been one of the most successful behavioural policy interventions in UK history. Over 10 million additional workers have been enrolled since 2012, pension participation among eligible employees has risen from 55% to 89%, and opt-out rates have remained below 10% — far lower than anticipated. However, the minimum contribution rate of 8% needs to rise to at least 12% for most workers to achieve the Pensions Commission's recommended target retirement income."
            source="Source: The Pensions Regulator — Auto-enrolment Statistics 2024. ONS 2024."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.ons.gov.uk/economy/nationalaccounts/uksectoraccounts/datasets/householdsavingsratio" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ONS — Household Saving Ratio</a> — quarterly saving ratio from national accounts. Quarterly.</p>
            <p><a href="https://www.bankofengland.co.uk/statistics/household-sector" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Bank of England — Household Sector Report</a> — household financial balance sheet. Annual.</p>
            <p>Saving ratio is household gross saving as a percentage of gross disposable income. Zero savings prevalence is from FCA Financial Lives Survey. Pension undersaving estimates use PPI modelling of adequate retirement income targets.</p>
          </div>
        </section>
      </main>
    </>
  );
}
