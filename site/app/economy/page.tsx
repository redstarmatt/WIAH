'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import PositiveCallout from '@/components/PositiveCallout';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

// CPI annual rate (%), 2015–2025 — ONS
const cpiValues = [0.0, 0.7, 2.7, 2.5, 1.8, 0.9, 2.5, 9.1, 11.1, 6.7, 2.6];

// Real weekly earnings (£), 2015–2025 — ONS AWE
const realWageValues = [490, 487, 488, 492, 496, 498, 502, 491, 484, 499, 512];

// Nominal weekly earnings (£), 2015–2025 — ONS AWE
const nominalWageValues = [490, 494, 503, 513, 524, 530, 548, 579, 612, 648, 665];

// Economic inactivity rate (%), 2015–2025 — ONS LFS
const inactivityValues = [21.5, 21.3, 21.0, 21.0, 20.8, 20.5, 21.5, 21.8, 22.1, 22.0, 21.8];

const inflationSeries: Series[] = [
  {
    id: 'cpi',
    label: 'CPI annual rate (%)',
    colour: '#E63946',
    data: cpiValues.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
];

const wagesSeries: Series[] = [
  {
    id: 'nominal',
    label: 'Nominal weekly earnings (£)',
    colour: '#6B7280',
    data: nominalWageValues.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
  {
    id: 'real',
    label: 'Real weekly earnings (£)',
    colour: '#264653',
    data: realWageValues.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
];

const inactivitySeries: Series[] = [
  {
    id: 'inactivity',
    label: 'Economic inactivity rate (%)',
    colour: '#F4A261',
    data: inactivityValues.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
];

const inflationAnnotations: Annotation[] = [
  { date: new Date(2022, 1, 1), label: '2022: Russia invades Ukraine' },
  { date: new Date(2022, 9, 1), label: 'Oct 2022: Peak 11.1%' },
];

const wagesAnnotations: Annotation[] = [
  { date: new Date(2020, 2, 1), label: '2020: COVID-19' },
  { date: new Date(2022, 3, 1), label: '2022: Inflation squeeze' },
];

export default function EconomyPage() {
  return (
    <>
      <TopicNav topic="Economy" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Economy"
          question="Are You Actually Better Off?"
          finding="Real wages took 16 years to recover their 2008 peak. Inflation peaked at 11.1% in 2022 before falling to 2.6% in 2025. One in five working-age adults is not in the workforce — the only G7 country still below pre-COVID employment levels."
          colour="#264653"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Real wages took 16 years to recover their 2008 peak — the longest sustained squeeze on living standards since records began. At the root is a productivity crisis: output per hour grew at roughly 2% a year before the financial crisis, then flatlined. Without productivity growth, wages cannot sustainably rise. The 2022–23 cost-of-living shock — CPI hitting 11.1% in October 2022 — compounded the damage, though inflation has since fallen to around 2.6%. Meanwhile, over a fifth of working-age adults remain economically inactive, elevated since COVID and driven largely by long-term sickness. The economy is growing again, but the foundations remain brittle.</p>
            <p>The National Living Wage, introduced in 2015, compressed the bottom of the earnings distribution: the lowest-paid workers saw faster nominal pay growth than the median through the late 2010s. The April 2024 rise to £11.44 per hour — a 10% increase — was the largest ever. But higher earners have retained a structural advantage, and the ratio between top and bottom decile earnings has barely shifted in a decade. London generates 174% of the UK average GVA per head; the North East generates 73%. This extreme regional concentration of economic activity means growth is unevenly shared and politically as well as economically significant.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Inflation' },
          { id: 'sec-chart2', label: 'Wages' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="CPI inflation (2025)"
              value="2.6"
              unit="%"
              direction="down"
              polarity="up-is-bad"
              changeText="Down from 11.1% peak Oct 2022 · BoE target: 2%"
              sparklineData={[0.0, 0.7, 2.7, 1.8, 0.9, 9.1, 11.1, 6.7, 2.6]}
              source="ONS · CPI annual rate 2025"
              href="#sec-chart1"
            />
            <MetricCard
              label="Real weekly earnings"
              value="£512"
              unit="/wk"
              direction="up"
              polarity="up-is-good"
              changeText="Finally above 2008 peak · 16 years to recover"
              sparklineData={[490, 488, 492, 498, 502, 491, 484, 499, 512]}
              source="ONS · Average Weekly Earnings (real terms) 2025"
              href="#sec-chart2"
            />
            <MetricCard
              label="Economic inactivity rate"
              value="21.8"
              unit="%"
              direction="up"
              polarity="up-is-bad"
              changeText="Above pre-COVID level · only G7 not recovered"
              sparklineData={[21.5, 21.0, 20.8, 20.5, 21.5, 22.1, 22.0, 21.8]}
              source="ONS · Labour Force Survey 2025"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="CPI annual inflation rate, UK, 2015–2025"
              subtitle="Consumer Prices Index 12-month rate. Peaked at 11.1% in October 2022 — a 40-year high. Bank of England target is 2%."
              series={inflationSeries}
              annotations={inflationAnnotations}
              yLabel="Annual rate (%)"
              source={{ name: 'ONS', dataset: 'Consumer Price Inflation (MM23)', url: 'https://www.ons.gov.uk/economy/inflationandpriceindices/timeseries/d7g7/mm23', frequency: 'monthly', date: '2025' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Average weekly earnings: nominal vs real, 2015–2025"
              subtitle="Whole economy, seasonally adjusted. Real terms adjusted using CPI. Real wages took 16 years to recover their 2008 peak."
              series={wagesSeries}
              annotations={wagesAnnotations}
              yLabel="£ per week"
              source={{ name: 'ONS', dataset: 'Average Weekly Earnings (EARN01)', url: 'https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/earningsandworkinghours/timeseries/kab9/lms', frequency: 'monthly', date: '2025' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Income inequality falling for four consecutive years"
            value="-7%"
            description="The Gini coefficient — which measures income inequality — has fallen for four consecutive years since its 2020 pandemic peak, from 35.4 to 32.9. Real weekly wages have recovered their 2008 peak for the first time. Workers on the National Living Wage saw a 10% rise in April 2024. Inflation has returned to near its 2% target, ending the most severe cost-of-living squeeze in a generation."
            source="Source: ONS — Household Income Inequality, Financial Year Ending 2024."
          />
        </ScrollReveal>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.ons.gov.uk/economy/inflationandpriceindices/timeseries/d7g7/mm23" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ONS — Consumer Price Inflation (MM23)</a> — monthly CPI data, time series D7G7.</p>
            <p><a href="https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/earningsandworkinghours/timeseries/kab9/lms" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ONS — Average Weekly Earnings (EARN01)</a> — monthly earnings data, nominal and real series.</p>
            <p><a href="https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/employmentandemployeetypes/timeseries/lf24/lms" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ONS — Labour Market Statistics (LMS)</a> — employment, unemployment, and inactivity rates from the Labour Force Survey.</p>
            <p><a href="https://www.ons.gov.uk/peoplepopulationandcommunity/personalandhouseholdfinances/incomeandwealth/bulletins/householdincomeinequalityfinancial/financialyearending2024" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ONS — Household Income Inequality</a> — Gini coefficient and income distribution by decile.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
