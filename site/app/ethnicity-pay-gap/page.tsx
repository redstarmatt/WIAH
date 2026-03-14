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

// Overall ethnicity pay gap (%), 2012–2023 — ONS ASHE
// Median hourly pay: ethnic minority workers vs White British workers
const overallGapValues = [11.8, 11.5, 11.2, 11.0, 10.8, 10.5, 10.2, 10.0, 9.8, 9.5, 9.2, 9.0];

// Pakistani/Bangladeshi pay gap (%), 2012–2023 — ONS ASHE
const pakBangGapValues = [26, 25, 25, 24, 24, 23, 23, 22, 22, 21, 21, 20];

// Black African/Caribbean pay gap (%), 2012–2023 — ONS ASHE
const blackGapValues = [8, 8, 7, 7, 7, 6, 6, 6, 5, 5, 5, 4];

const overallGapSeries: Series[] = [
  {
    id: 'overall-gap',
    label: 'Ethnic minority pay gap (%)',
    colour: '#E63946',
    data: overallGapValues.map((v, i) => ({ date: new Date(2012 + i, 0, 1), value: v })),
  },
];

const breakdownSeries: Series[] = [
  {
    id: 'pak-bang',
    label: 'Pakistani/Bangladeshi pay gap (%)',
    colour: '#E63946',
    data: pakBangGapValues.map((v, i) => ({ date: new Date(2012 + i, 0, 1), value: v })),
  },
  {
    id: 'black',
    label: 'Black African/Caribbean pay gap (%)',
    colour: '#264653',
    data: blackGapValues.map((v, i) => ({ date: new Date(2012 + i, 0, 1), value: v })),
  },
];

const gapAnnotations: Annotation[] = [
  { date: new Date(2017, 0, 1), label: '2017: Race Disparity Audit published' },
];

const editorialRefs: Reference[] = [
  { num: 1, name: 'ONS', dataset: 'Annual Survey of Hours and Earnings — ethnicity pay gaps', url: 'https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/earningsandworkinghours/articles/ethnicitypaygapsingreatbritain/2012to2022', date: '2023' },
  { num: 2, name: 'EHRC', dataset: 'Pay gap reporting tracker', date: '2023' },
];

export default function EthnicityPayGapPage() {
  return (
    <>
      <TopicNav topic="Ethnicity Pay Gap" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Ethnicity Pay Gap"
          question="Are Ethnic Minority Workers Paid Less?"
          finding="Ethnic minority workers earn around 9% less per hour than White British workers on average. The gap varies dramatically by group: Pakistani and Bangladeshi workers face a 20% gap, while Indian workers earn slightly more than the White British median. Mandatory reporting has not yet been introduced."
          colour="#E63946"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The ethnicity pay gap — the difference in median hourly pay between ethnic minority workers and White British workers — stood at around 9% in 2023, down from 11.8% in 2012.<Cite nums={1} /> But aggregate figures mask dramatic variation between groups. Indian workers have a positive pay premium of around 8% above the White British median, driven by high representation in financial services and medicine.<Cite nums={1} /> Pakistani and Bangladeshi workers face a gap of around 20%, reflecting industrial segregation, lower qualification levels (historically), and discrimination. Black African and Caribbean workers have seen the gap narrow from 8% to around 4–5% over the same period<Cite nums={1} />, though they remain significantly underrepresented in senior roles.</p>
            <p>Unlike the gender pay gap, mandatory ethnicity pay gap reporting has not been introduced for UK employers despite repeated consultation and commitment. The government's consultation on mandatory reporting (2018–2019) concluded without legislation. Without mandatory disclosure, the picture is patchy: fewer than 200 companies voluntarily report ethnicity pay data<Cite nums={2} />, out of thousands that meet the proposed threshold. The Sewell Commission's 2021 report controversially played down structural racism as a driver of disparities, attributing gaps primarily to other socioeconomic factors. The Ethnicity Pay Gap Campaign and the TUC argue that without mandatory reporting, employer accountability is impossible and progress will be slow.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Overall gap' },
          { id: 'sec-chart2', label: 'By group' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Overall ethnicity pay gap"
              value="9%"
              unit=""
              direction="down"
              polarity="down-is-bad"
              changeText="Down from 11.8% in 2012 · no mandatory reporting"
              sparklineData={[11.8, 11.5, 11.0, 10.8, 10.5, 10.2, 9.8, 9.5, 9.2, 9.0]}
              source="ONS · Annual Survey of Hours and Earnings 2023"
              href="#sec-chart1"
            />
            <MetricCard
              label="Pakistani/Bangladeshi pay gap"
              value="20%"
              unit=""
              direction="down"
              polarity="down-is-bad"
              changeText="Highest gap of any group · down from 26% in 2012"
              sparklineData={[26, 25, 24, 24, 23, 22, 22, 21, 21, 20]}
              source="ONS · Ethnicity pay gaps 2023"
              href="#sec-chart2"
            />
            <MetricCard
              label="Employers voluntarily reporting"
              value="<200"
              unit=""
              direction="flat"
              polarity="up-is-good"
              changeText="No mandatory requirement · gender reporting covers 10,000+ firms"
              sparklineData={[10, 20, 40, 60, 80, 100, 120, 150, 180, 200]}
              source="EHRC · Pay gap reporting tracker 2023"
              href="#sec-chart1"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Overall ethnicity pay gap, UK, 2012–2023"
              subtitle="Median hourly pay gap between ethnic minority workers and White British workers. Narrowing slowly but no mandatory reporting requirement."
              series={overallGapSeries}
              annotations={gapAnnotations}
              yLabel="Pay gap (%)"
              source={{ name: 'ONS', dataset: 'Annual Survey of Hours and Earnings — ethnicity pay gaps', url: 'https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/earningsandworkinghours/articles/ethnicitypaygapsingreatbritain/2012to2022', frequency: 'annual', date: '2023' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Ethnicity pay gap by group, UK, 2012–2023"
              subtitle="Pay gap for Pakistani/Bangladeshi and Black African/Caribbean workers vs White British median. Gaps narrowing but remain substantial."
              series={breakdownSeries}
              annotations={[]}
              yLabel="Pay gap (%)"
              source={{ name: 'ONS', dataset: 'Annual Survey of Hours and Earnings — ethnicity pay gaps', url: 'https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/earningsandworkinghours/articles/ethnicitypaygapsingreatbritain/2012to2022', frequency: 'annual', date: '2023' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Indian workers earn 8% more than White British median"
            value="+8%"
            description="Indian workers in the UK have a positive pay premium of approximately 8% above the White British median — driven by high concentration in medicine, pharmacy, financial services, and technology. This demonstrates that aggregate ethnicity pay gap figures can obscure wide variation. However, Indian workers also face a significant leadership gap: they are underrepresented in the most senior roles relative to their share of the professional workforce. The Parker Review found that FTSE 100 boards remain overwhelmingly White. Progress at the top requires targeted action on sponsorship, networks, and transparency — regardless of aggregate pay figures."
            source="Source: ONS — Ethnicity pay gaps in Great Britain 2023. Parker Review — FTSE 100 and 250 Board Diversity 2023."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/earningsandworkinghours/articles/ethnicitypaygapsingreatbritain/2012to2022" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ONS — Ethnicity pay gaps in Great Britain</a> — analysis of Annual Survey of Hours and Earnings (ASHE) by ethnic group.</p>
            <p><a href="https://www.gov.uk/government/publications/ethnicity-pay-reporting-guidance-for-employers" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Government Equalities Office — Ethnicity pay reporting</a> — guidance and consultation on voluntary reporting.</p>
            <p>Pay gap is median hourly pay excluding overtime for full-time employees. Ethnic minority workers are those who identify as any non-White British group in ONS ethnicity classifications.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
