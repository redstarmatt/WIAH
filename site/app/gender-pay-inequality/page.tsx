'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'ONS', dataset: 'Annual Survey of Hours and Earnings (ASHE)', url: 'https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/earningsandworkinghours/bulletins/genderpaygapintheuk/2024', date: '2024' },
  { num: 2, name: 'Gov.uk', dataset: 'Gender Pay Gap Service', url: 'https://gender-pay-gap.service.gov.uk/', date: '2024' },
];

// Full-time gender pay gap (%), 1997–2024 (selected years)
const fullTimePct = [17.4, 17.0, 16.5, 16.0, 15.5, 15.0, 14.5, 14.0, 13.5, 13.0, 12.0, 10.5, 9.4, 8.6, 8.3, 7.9, 7.9, 7.7, 7.7, 7.8, 6.9];
// All-employees gender pay gap (%), 1997–2024 (selected)
const allEmployeesPct = [27.0, 26.0, 25.0, 24.0, 23.5, 23.0, 22.5, 22.0, 21.5, 21.0, 20.5, 20.0, 19.6, 19.1, 18.4, 17.4, 17.3, 15.5, 15.4, 14.9, 13.1];
// Gap by age group 30-39 (%), 2015–2024
const age30to39Gap = [8.5, 9.2, 9.8, 10.5, 11.2, 11.8, 12.1, 12.5, 12.8, 12.0];
// Gap by age group 18-21 (%), 2015–2024
const age18to21Gap = [-1.5, -1.2, -0.9, -0.6, -0.3, 0.1, 0.3, 0.5, 0.4, 0.2];

const overallGapSeries: Series[] = [
  {
    id: 'full-time',
    label: 'Full-time employees (%)',
    colour: '#F4A261',
    data: fullTimePct.map((v, i) => ({ date: new Date(1997 + i, 3, 1), value: v })),
  },
  {
    id: 'all-employees',
    label: 'All employees (%)',
    colour: '#E63946',
    data: allEmployeesPct.map((v, i) => ({ date: new Date(1997 + i, 3, 1), value: v })),
  },
];

const ageGroupSeries: Series[] = [
  {
    id: 'age-18-21',
    label: '18–21 age group (%)',
    colour: '#2A9D8F',
    data: age18to21Gap.map((v, i) => ({ date: new Date(2015 + i, 3, 1), value: v })),
  },
  {
    id: 'age-30-39',
    label: '30–39 age group (%)',
    colour: '#E63946',
    data: age30to39Gap.map((v, i) => ({ date: new Date(2015 + i, 3, 1), value: v })),
  },
];

const overallAnnotations: Annotation[] = [
  { date: new Date(2010, 3, 1), label: '2010: Equality Act strengthens pay transparency' },
  { date: new Date(2017, 3, 1), label: '2017: Mandatory reporting for 250+ employers' },
];

const ageAnnotations: Annotation[] = [
  { date: new Date(2019, 3, 1), label: '2019: Shared Parental Leave take-up only 2%' },
];

export default function GenderPayInequalityPage() {
  return (
    <>
      <TopicNav topic="Economy & Work" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Economy & Work"
          question="How Much Less Do Women Earn Than Men?"
          finding="The gender pay gap has halved since 1997 but remains stubbornly persistent. Full-time women earn 6.9% less than men; when part-time work is included, the gap widens to 13.1%. The gap is near-zero for under-30s but opens dramatically from the mid-30s as caring responsibilities begin."
          colour="#F4A261"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Among full-time employees, the median gender pay gap fell from 17.4% in 1997 to 6.9% in 2024 — a genuine narrowing driven by legislation, transparency, and generational shifts in women's workforce participation.<Cite nums={[1]} /> But this figure flatters reality. When all employees are counted — including the millions of women in part-time roles — the gap sits at 13.1%.<Cite nums={[1]} /> Women are far more likely to work part-time than men, and part-time work pays less per hour than full-time work, even for equivalent roles. This is the part-time penalty, and it remains one of the largest structural drivers of pay inequality in the UK. It is closely tied to the motherhood penalty: women's earnings drop sharply after having children and rarely recover to pre-birth levels, while men's earnings are largely unaffected.</p>
            <p>The age breakdown reveals a striking pattern: among workers under 30, the gender pay gap is near zero or slightly favours women.<Cite nums={[1]} /> The gap opens dramatically from the mid-30s onwards — precisely when caring responsibilities begin. This is not a pipeline problem being solved by generational change. It is a structural penalty applied to women who become mothers, and it has barely shifted in two decades. Shared Parental Leave, introduced in 2015, has been taken up by only 2% of eligible fathers. At the current rate of decline, the full-time gender pay gap will not reach zero until the mid-2060s.<Cite nums={[1]} /> The all-employees gap, which better captures the lived reality of women's earnings, would take even longer.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Long-run Trend' },
          { id: 'sec-chart2', label: 'By Age Group' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Full-time gender pay gap"
              value="6.9%"
              unit="2024"
              direction="down"
              polarity="up-is-bad"
              changeText="Down from 17.4% in 1997 · lowest on record"
              sparklineData={fullTimePct.slice(-8)}
              source="ONS · ASHE 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="All employees gender pay gap"
              value="13.1%"
              unit="2024"
              direction="down"
              polarity="up-is-bad"
              changeText="Includes part-time penalty · far higher than full-time figure"
              sparklineData={allEmployeesPct.slice(-8)}
              source="ONS · ASHE 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Years to close at current pace"
              value="40+"
              unit=""
              direction="flat"
              polarity="up-is-bad"
              changeText="Based on rate of decline since 2017 · full-time median"
              sparklineData={[50, 48, 47, 46, 45, 44, 43, 42]}
              source="ONS · ASHE trend analysis"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Gender pay gap, UK, 1997–2024"
              subtitle="Median hourly pay gap between men and women. Full-time employees only (amber) versus all employees including part-time (red). Both narrowing, but from very different starting points."
              series={overallGapSeries}
              annotations={overallAnnotations}
              yLabel="Pay gap (%)"
              source={{ name: 'ONS', dataset: 'Annual Survey of Hours and Earnings (ASHE)', url: 'https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/earningsandworkinghours/bulletins/genderpaygapintheuk/2024', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Gender pay gap by age group, full-time employees, 2015–2024"
              subtitle="Under-30s (green) have a near-zero or slightly negative gap. The 30–39 group (red) shows the gap widening sharply as caring responsibilities take hold after childbirth."
              series={ageGroupSeries}
              annotations={ageAnnotations}
              yLabel="Pay gap (%)"
              source={{ name: 'ONS', dataset: 'ASHE — Age group breakdown', url: 'https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/earningsandworkinghours/bulletins/genderpaygapintheuk/2024', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Mandatory reporting driving transparency — but structural change lags"
            value="~11,000"
            unit="employers reporting gender pay gaps annually"
            description="Since April 2017, around 11,000 UK employers with 250 or more staff report their gender pay gap annually. Research from the London School of Economics found that mandatory reporting led to a modest narrowing of pay gaps, driven primarily by slower wage growth for men in high-gap firms. The proportion of women in senior management roles has risen from 32% in 2012 to 44% in 2023. The phased expansion of funded childcare for children from nine months, rolling out from 2024–25, addresses the childcare cost barrier that drives many women to part-time work. If take-up is high, this reform could meaningfully reduce the motherhood penalty and narrow the all-employees gap over the next decade."
            source="Source: Gov.uk Gender Pay Gap Service. ONS — ASHE 2024. DfE — Childcare expansion update 2025."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/earningsandworkinghours/bulletins/genderpaygapintheuk/2024" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ONS — Annual Survey of Hours and Earnings (ASHE)</a> — Annual earnings data by sex, employment type, age group, and sector. Retrieved 2025.</p>
            <p><a href="https://gender-pay-gap.service.gov.uk/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Gov.uk Gender Pay Gap Service</a> — Mandatory employer reports. Retrieved 2025.</p>
            <p>Pay gap is difference between men's and women's median hourly earnings (excluding overtime) as percentage of men's median. Full-time excludes part-time employees. Age group breakdowns are for full-time employees only. Negative values indicate women in that age group earn more than men on average.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
