'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';

// ── Types ─────────────────────────────────────────────────────────────────────

interface EmploymentPoint {
  year: number;
  professionalManagerial: number;
}

interface SubjectSalary {
  subject: string;
  medianSalary5yr: number;
}

interface PremiumPoint {
  year: number;
  lifetimePremium: number;
}

interface GraduateOutcomesData {
  employmentOutcomes: EmploymentPoint[];
  salaryBySubject: SubjectSalary[];
  degreePremium: PremiumPoint[];
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function GraduateOutcomesPage() {
  const [data, setData] = useState<GraduateOutcomesData | null>(null);

  useEffect(() => {
    fetch('/data/graduate-outcomes/graduate_outcomes.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const employmentSeries: Series[] = data
    ? [
        {
          id: 'professional-managerial',
          label: '% in professional or managerial role',
          colour: '#2A9D8F',
          data: data.employmentOutcomes.map(d => ({
            date: new Date(d.year, 0, 1),
            value: d.professionalManagerial,
          })),
        },
      ]
    : [];

  return (
    <>
      <TopicNav topic="Graduate Outcomes" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Graduate Outcomes"
          question="What actually happens to people after university?"
          finding="76.9% of graduates are in professional or managerial employment 15 months after graduation. The lifetime graduate earnings premium is around £140,000. But outcomes vary hugely by subject and institution — and 20% of graduates work in non-graduate roles."
          colour="#2A9D8F"
        />

        <section className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              On average, going to university significantly improves your employment prospects
              and lifetime earnings. The Graduate Outcomes survey — which covers all UK
              graduates 15 months after completing their course — found that 76.9% were in
              professional or managerial employment in 2022, up from 72.1% in 2018. The
              graduate employment rate has outperformed the general labour market for
              most of the past decade. Graduates are more likely to be employed, earn
              more, and report greater job satisfaction than non-graduates.
            </p>
            <p>
              But the aggregate masks enormous variation. Subject choice matters more than
              many prospective students realise. Medicine graduates earn a median of £55,000
              five years after graduation; performing arts graduates earn £24,000. The gap
              between the highest and lowest-earning subjects is larger than the gap between
              many Russell Group and post-92 institutions for the same subject. Economics,
              engineering, and law all command significant premiums; humanities and creative
              arts do not, though they serve important cultural and civic functions that
              raw salary data does not capture.
            </p>
            </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-premium', label: 'Earnings Premium' },
          { id: 'sec-employment', label: 'Employment Rate' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="In professional/managerial roles (15 months)"
              value="76.9"
              unit="%"
              direction="up"
              polarity="up-is-good"
              changeText="Up from 72.1% in 2018 · strong labour market for graduates"
              sparklineData={[72.1, 74.3, 73.8, 75.2, 76.9]}
              source="Graduate Outcomes Survey (HESA) · 2022"
            />
            <MetricCard
              label="Median graduate salary (5 years post)"
              value="£32,000"
              unit="/yr"
              direction="up"
              polarity="up-is-good"
              changeText="Median across all subjects · medicine £55k, arts £27k"
              sparklineData={[27000, 28000, 29000, 30000, 31000, 32000]}
              source="DfE Graduate Outcomes / LEO data · 2022"
            />
            <MetricCard
              label="Lifetime earnings premium vs non-graduate"
              value="£140k"
              unit=""
              direction="flat"
              polarity="up-is-good"
              changeText="On average · but varies enormously by subject and institution"
              sparklineData={[130000, 135000, 140000, 140000, 140000]}
              source="IFS / DfE · 2023"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div id="sec-premium" className="mb-12">
            <PositiveCallout
              title="£140,000 lifetime earnings advantage"
              value="£140k"
              unit=""
              description="On average, graduates earn £140,000 more over their working lifetime than non-graduates — even accounting for student loan repayments. For high-earning subjects like medicine and economics, the premium is much higher."
              source="IFS Graduate Earnings Premium analysis, 2023"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div id="sec-employment" className="mb-12">
            <LineChart
              series={employmentSeries}
              title="Graduates in professional/managerial employment, 15 months after graduation"
              subtitle="Share of UK graduates in professional or managerial roles. Graduate Outcomes survey."
              yLabel="% in professional/managerial role"

            />
            <p className="font-mono text-[11px] text-wiah-mid mt-2">
              Source:{' '}
              <a
                href="https://www.hesa.ac.uk/data-and-analysis/graduates"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-wiah-black"
              >
                HESA Graduate Outcomes Survey
              </a>{' '}
              · Annual
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div id="sec-sources" className="border-t border-wiah-border pt-8 mt-8">
            <h2 className="text-base font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
            <ul className="font-mono text-[11px] text-wiah-mid space-y-2">
              <li>
                <a
                  href="https://www.hesa.ac.uk/data-and-analysis/graduates"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-wiah-black"
                >
                  HESA — Graduate Outcomes Survey
                </a>{' '}
                · Annual
              </li>
              <li>
                <a
                  href="https://explore-education-statistics.service.gov.uk/find-statistics/graduate-outcomes-leo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-wiah-black"
                >
                  DfE — Longitudinal Education Outcomes (LEO)
                </a>{' '}
                · Annual
              </li>
              <li>
                <a
                  href="https://ifs.org.uk/higher-education"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-wiah-black"
                >
                  IFS — Higher Education Finance research
                </a>
              </li>
            </ul>
          </div>
        </ScrollReveal>
      </main>
    </>
  );
}
