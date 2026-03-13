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
  { num: 1, name: 'HESA', dataset: 'Graduate Outcomes Survey', url: 'https://www.hesa.ac.uk/data-and-analysis/graduates', date: '2023' },
  { num: 2, name: 'DfE', dataset: 'Longitudinal Education Outcomes (LEO)', url: 'https://explore-education-statistics.service.gov.uk/find-statistics/graduate-outcomes-leo', date: '2023' },
  { num: 3, name: 'IFS', dataset: 'Higher Education Finance research', url: 'https://ifs.org.uk/higher-education', date: '2023' },
];

// % in professional/managerial roles 15 months after graduation, 2018–2023
const professionalManagerial = [72.1, 74.3, 73.8, 74.5, 75.2, 76.9];
// Median graduate salary 5 years post-graduation (£000s), 2017–2022
const medianSalary5yr = [27, 28, 29, 30, 31, 32];
// Lifetime earnings premium vs non-graduates (£000s), 2017–2023
const lifetimePremiumK = [130, 135, 137, 138, 140, 140, 140];
// Graduate unemployment rate (%), 2018–2023
const gradUnemploymentPct = [4.8, 4.5, 4.2, 5.8, 4.9, 4.2];

const employmentSeries: Series[] = [
  {
    id: 'professional',
    label: '% in professional/managerial role (15 months)',
    colour: '#2A9D8F',
    data: professionalManagerial.map((v, i) => ({ date: new Date(2018 + i, 0, 1), value: v })),
  },
  {
    id: 'unemployment',
    label: 'Graduate unemployment rate (%)',
    colour: '#E63946',
    data: gradUnemploymentPct.map((v, i) => ({ date: new Date(2018 + i, 0, 1), value: v })),
  },
];

const salarySeries: Series[] = [
  {
    id: 'median-salary',
    label: 'Median graduate salary 5 years post-graduation (£000s)',
    colour: '#264653',
    data: medianSalary5yr.map((v, i) => ({ date: new Date(2017 + i, 0, 1), value: v })),
  },
  {
    id: 'premium',
    label: 'Lifetime earnings premium (£000s, scaled)',
    colour: '#2A9D8F',
    data: lifetimePremiumK.map((v, i) => ({ date: new Date(2017 + i, 0, 1), value: v / 5 })),
  },
];

const employmentAnnotations: Annotation[] = [
  { date: new Date(2020, 0, 1), label: '2020: COVID disrupts graduate labour market' },
];

const salaryAnnotations: Annotation[] = [
  { date: new Date(2020, 0, 1), label: '2020: Degree premium unaffected by pandemic' },
];

export default function GraduateOutcomesPage() {
  return (
    <>
      <TopicNav topic="Education" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Education"
          question="What Actually Happens to People After University?"
          finding="76.9% of graduates are in professional or managerial employment 15 months after graduation. The lifetime earnings premium is around £140,000. But outcomes vary hugely by subject — and 20% of graduates work in non-graduate roles."
          colour="#2A9D8F"
          preposition="after"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>On average, going to university significantly improves employment prospects and lifetime earnings. The Graduate Outcomes survey — which covers all UK graduates 15 months after completing their course — found that 76.9% were in professional or managerial employment in 2023, up from 72.1% in 2018.<Cite nums={1} /> The graduate employment rate has outperformed the general labour market for most of the past decade. Graduates are more likely to be employed, earn more, and report greater job satisfaction than non-graduates. The IFS estimates the lifetime earnings premium at around £140,000 after accounting for tuition fees and foregone earnings during study.<Cite nums={3} /></p>
            <p>But the aggregate masks enormous variation. Subject choice matters more than many prospective students realise. Medicine graduates earn a median of £55,000 five years after graduation; performing arts graduates earn around £24,000.<Cite nums={2} /> The gap between the highest and lowest-earning subjects exceeds the gap between many Russell Group and post-92 institutions for the same subject. Economics, engineering, dentistry, and law all command significant premiums; humanities and creative arts do not, though they serve important cultural functions that raw salary data does not capture. Around 20% of graduates work in roles that do not require a degree 15 months after graduation — a figure that falls significantly by five years post-graduation as careers develop.<Cite nums={1} /></p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Employment Outcomes' },
          { id: 'sec-chart2', label: 'Earnings Premium' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="In professional/managerial role (15 months)"
              value="76.9%"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="Up from 72.1% in 2018 · strong graduate labour market"
              sparklineData={professionalManagerial.slice(-8)}
              source="HESA · Graduate Outcomes Survey 2023"
              href="#sec-chart1"
            />
            <MetricCard
              label="Median graduate salary (5 years post)"
              value="£32k"
              unit="/year"
              direction="up"
              polarity="up-is-good"
              changeText="Across all subjects · medicine £55k, performing arts £24k"
              sparklineData={medianSalary5yr.slice(-8)}
              source="DfE · Longitudinal Education Outcomes 2023"
              href="#sec-chart2"
            />
            <MetricCard
              label="Lifetime earnings premium"
              value="£140k"
              unit=""
              direction="flat"
              polarity="up-is-good"
              changeText="vs non-graduates · after fees and foregone earnings"
              sparklineData={lifetimePremiumK.slice(-8)}
              source="IFS / DfE · Higher Education Finance research 2023"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Graduate employment outcomes 15 months after graduation, 2018–2023"
              subtitle="Share in professional/managerial roles (green) and graduate unemployment rate (red). Both improved after the pandemic disruption of 2020."
              series={employmentSeries}
              annotations={employmentAnnotations}
              yLabel="Percentage (%)"
              source={{ name: 'HESA', dataset: 'Graduate Outcomes Survey', url: 'https://www.hesa.ac.uk/data-and-analysis/graduates', frequency: 'annual', date: '2023' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Graduate median salary and lifetime earnings premium, 2017–2023"
              subtitle="Median salary 5 years post-graduation (blue, £000s) and lifetime earnings premium vs non-graduates (green, £000s ÷5 for scale). Premium stable at around £140,000."
              series={salarySeries}
              annotations={salaryAnnotations}
              yLabel="£ thousands (salary) / £ thousands ÷5 (premium)"
              source={{ name: 'DfE / IFS', dataset: 'Longitudinal Education Outcomes / Graduate Earnings Premium', url: 'https://explore-education-statistics.service.gov.uk/find-statistics/graduate-outcomes-leo', frequency: 'annual', date: '2023' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Graduate Outcomes data now enables subject-level transparency"
            value="2019"
            unit="Graduate Outcomes survey replaces DLHE — now includes salary data"
            description="The Graduate Outcomes survey, introduced in 2019, replaced the Destinations of Leavers from Higher Education (DLHE) survey and for the first time systematically tracks graduate salaries and career progression by subject, institution, and graduate characteristics. Combined with the Longitudinal Education Outcomes (LEO) dataset — which links education records to HMRC earnings data — it enables unprecedented transparency about which degrees deliver the best outcomes. Prospective students can now compare median salaries, employment rates, and graduate satisfaction by course at specific institutions. This information is published by the Office for Students and the DfE as part of a wider drive to improve value for money in higher education."
            source="Source: HESA — Graduate Outcomes Survey 2023. DfE — Longitudinal Education Outcomes 2023. Office for Students — Teaching Excellence Framework 2023."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.hesa.ac.uk/data-and-analysis/graduates" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">HESA — Graduate Outcomes Survey</a> — Annual survey of UK graduates 15 months after graduation. Retrieved 2024.</p>
            <p><a href="https://explore-education-statistics.service.gov.uk/find-statistics/graduate-outcomes-leo" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DfE — Longitudinal Education Outcomes (LEO)</a> — HMRC earnings data linked to education records. Covers 1, 3, and 5 years post-graduation. Retrieved 2024.</p>
            <p><a href="https://ifs.org.uk/higher-education" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">IFS — Higher Education Finance research</a> — Lifetime earnings premium estimates accounting for fees, foregone earnings, and loan repayment. Retrieved 2024.</p>
            <p>Professional/managerial classification uses Standard Occupational Classification (SOC) codes 1–3. Lifetime premium is median estimate and varies substantially by subject and institution. Non-graduate roles are SOC codes 4–9 and include some roles that require specific professional skills not requiring a degree.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
