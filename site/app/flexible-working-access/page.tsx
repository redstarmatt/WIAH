'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import PositiveCallout from '@/components/PositiveCallout';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

// Workers with access to flexible working (%), 2015–2024 — CIPD / ONS
const flexAccessValues = [38, 40, 42, 44, 46, 55, 62, 65, 68, 70];

// Remote/hybrid workers (% of workforce), 2015–2024 — ONS
const remoteValues = [5, 5, 6, 6, 6, 37, 28, 26, 24, 22];

// Flexible working requests refused (%), 2015–2024 — CIPD
const refusedValues = [42, 40, 38, 36, 34, 20, 22, 24, 25, 22];

const flexSeries: Series[] = [
  {
    id: 'flex-access',
    label: 'Workers with flexible working access (%)',
    colour: '#2A9D8F',
    data: flexAccessValues.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
  {
    id: 'remote',
    label: 'Remote/hybrid workers (% of workforce)',
    colour: '#264653',
    data: remoteValues.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
];

const refusedSeries: Series[] = [
  {
    id: 'refused',
    label: 'Flexible working requests refused (%)',
    colour: '#E63946',
    data: refusedValues.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
];

const flexAnnotations: Annotation[] = [
  { date: new Date(2020, 2, 1), label: '2020: COVID — mass shift to home working' },
  { date: new Date(2024, 3, 1), label: 'Apr 2024: Day-one flexible working rights' },
];

export default function FlexibleWorkingAccessPage() {
  return (
    <>
      <TopicNav topic="Flexible Working" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Flexible Working"
          question="Can Workers Actually Get Flexible Hours?"
          finding="70% of workers now have access to some flexible working arrangement — a major shift from 38% in 2015, driven by COVID normalisation. Day-one flexible working rights came into force in April 2024. But access remains unequal: manual and lower-paid workers have far less flexibility than office workers."
          colour="#2A9D8F"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The right to request flexible working has existed since 2003, but take-up and employer response were patchy for most of its history: around 42% of requests were refused in 2015. The COVID-19 pandemic forced a mass experiment in remote and flexible working that fundamentally changed employer attitudes. Approximately 37% of the workforce was working from home at the peak of lockdown restrictions in spring 2020; by 2024, around 22% worked remotely at least part of the time — a fourfold increase on pre-pandemic levels. This normalisation coincided with a significant cultural shift: CIPD surveys show employer refusal rates fell from 42% to around 22% between 2015 and 2024.</p>
            <p>The Employment Relations (Flexible Working) Act 2023 significantly strengthened the statutory right from April 2024: workers can now request flexible working from the first day of employment (previously after 26 weeks), can make two requests per year (previously one), and employers must consult with the employee and provide their reasons for refusal within two months. However, the Act does not create a right to work flexibly — only a right to request it. The inequality in access between those who can work from home (predominantly office-based, higher-paid, graduate jobs) and those who cannot (care workers, retail, manual trades) represents a structural divide that flexible working law alone cannot address. The TUC's analysis shows that black and minority ethnic workers are significantly less likely to have flexible working arrangements than White workers, even in similar occupations.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Flexible working access' },
          { id: 'sec-chart2', label: 'Refusal rate' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Workers with flexible working access"
              value="70%"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="Up from 38% in 2015 · COVID transformed employer attitudes"
              sparklineData={[38, 40, 42, 44, 46, 55, 62, 65, 68, 70]}
              source="CIPD · Working lives survey 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Remote/hybrid workers"
              value="22%"
              unit=""
              direction="down"
              polarity="neutral"
              changeText="Down from COVID peak 37% · stabilised at 4x pre-pandemic level"
              sparklineData={[5, 5, 6, 6, 6, 37, 28, 26, 24, 22]}
              source="ONS · Homeworking hours in the UK 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Flexible working requests refused"
              value="22%"
              unit=""
              direction="down"
              polarity="down-is-bad"
              changeText="Down from 42% in 2015 · day-one rights from April 2024"
              sparklineData={[42, 40, 38, 36, 34, 20, 22, 24, 25, 22]}
              source="CIPD · Flexible working survey 2024"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Flexible working access and remote working, UK, 2015–2024"
              subtitle="Percentage of workers with access to any flexible arrangement and percentage working remotely or hybrid. COVID caused step-change in both measures."
              series={flexSeries}
              annotations={flexAnnotations}
              yLabel="% of workforce"
              source={{ name: 'CIPD / ONS', dataset: 'Working lives survey and homeworking data', url: 'https://www.cipd.org/uk/knowledge/reports/flexible-working/', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Flexible working requests refused by employers, UK, 2015–2024"
              subtitle="Percentage of statutory flexible working requests that employers refused. Fell significantly after COVID; remained lower despite return-to-office trends."
              series={refusedSeries}
              annotations={[{ date: new Date(2024, 3, 1), label: 'Apr 2024: Day-one rights introduced' }]}
              yLabel="Refusal rate (%)"
              source={{ name: 'CIPD', dataset: 'Flexible working survey', url: 'https://www.cipd.org/uk/knowledge/reports/flexible-working/', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Flexible working boosts women's employment by 10 percentage points"
            value="10pp"
            description="ONS longitudinal analysis shows that access to flexible working arrangements is associated with a 10 percentage-point higher employment rate among women with dependent children, compared to those without access. For carers of elderly relatives, the effect is similar. The productivity evidence is also positive: Stanford research on hybrid working found no significant productivity reduction for office-compatible roles, and lower attrition rates that offset any productivity costs. The Employment Relations (Flexible Working) Act 2023 and the government's Equality (Race and Disability) Bill both include provisions to extend flexible working rights, with the longer-term goal of making it the default rather than the exception."
            source="Source: ONS — Homeworking and labour market outcomes 2024. CIPD — Working Lives Survey 2024."
          />
        </ScrollReveal>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.cipd.org/uk/knowledge/reports/flexible-working/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">CIPD — Flexible working survey</a> — annual employer and employee survey on flexible working arrangements, requests, and outcomes.</p>
            <p><a href="https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/employmentandemployeetypes/articles/homeworkingintheuk/latest" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ONS — Homeworking in the UK</a> — quarterly data on home and hybrid working by occupation, industry, and demographics.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
