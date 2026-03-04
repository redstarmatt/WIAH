'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';

// ── Types ────────────────────────────────────────────────────────────────────

interface MaternityData {
  national: {
    maternalMortality: {
      timeSeries: Array<{ year: number; ratePer100k: number }>;
      latestYear: number;
      latestRate: number;
    };
    midwifeVacancies: {
      timeSeries: Array<{ year: number; vacancyRatePct: number }>;
      latestYear: number;
      latestVacancyRatePct: number;
      vacancyCount: number;
    };
    cqcRatings: Array<{ rating: string; pct: number }>;
  };
  metadata: {
    sources: Array<{ name: string; dataset: string; url: string; frequency: string }>;
    methodology: string;
    knownIssues: string[];
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function MaternityPage() {
  const [data, setData] = useState<MaternityData | null>(null);

  useEffect(() => {
    fetch('/data/maternity/maternity.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const mortalitySeries: Series[] = data
    ? [{
        id: 'mortality',
        label: 'Maternal mortality rate',
        colour: '#E63946',
        data: data.national.maternalMortality.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.ratePer100k,
        })),
      }]
    : [];

  const mortalityAnnotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: '2020: COVID-19 impact' },
  ];

  const vacancySeries: Series[] = data
    ? [{
        id: 'vacancies',
        label: 'Vacancy rate (%)',
        colour: '#E63946',
        data: data.national.midwifeVacancies.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.vacancyRatePct,
        })),
      }]
    : [];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Maternity Services" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Maternity Services"
          question="Are Britain&apos;s Maternity Services Safe?"
          finding="The UK maternal mortality rate stands at 9.7 per 100,000 births &mdash; double the rate in Norway. Midwife vacancy rates reached 12.3% in 2023. The Ockenden Report found repeated safety failures in NHS maternity services. 60% of maternity units have been rated &apos;requires improvement&apos; or &apos;inadequate&apos; by the CQC."
          colour="#E63946"
          preposition="in"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Britain&apos;s maternal mortality rate stands at 9.7 per 100,000 maternities as of 2022, up from 8.2 in 2014 and roughly double Norway&apos;s rate of 4.2. The figure places the UK above the EU average for a metric that should, in a well-resourced health system, be falling. Sixty per cent of NHS maternity units are rated &apos;requires improvement&apos; or &apos;inadequate&apos; by the Care Quality Commission. The disparities within those numbers are stark: MBRRACE-UK data show Black women are 3.7 times more likely to die in childbirth than white women, and Asian women 1.8 times more likely &mdash; a gap that has persisted for two decades with minimal improvement despite repeated national commitments to close it.</p>
            <p>Two landmark investigations exposed the scale of institutional failure. The Ockenden Report (March 2022) examined Shrewsbury and Telford NHS Trust and found 1,223 cases of harm over 20 years, including 201 baby deaths and 9 maternal deaths deemed potentially avoidable. Poor staffing, normalisation of bad outcomes and weak governance ran through every finding. A year later the East Kent maternity inquiry (March 2023) identified 45 babies who died unnecessarily, with a further 40 deaths that may have been avoidable &mdash; the same pattern of understaffing, poor CTG interpretation and a culture of blame rather than learning. These were not isolated trusts; they were systems operating under the same national pressures.</p>
            <p>The staffing crisis underpins much of the risk. England carries 2,500 midwife vacancies, a rate of 12.3%, and the Royal College of Midwives estimates 2,500 more midwives are needed simply to deliver NICE-standard care. A 2023 RCM survey found one in three midwives considering leaving the profession. NICE recommends every woman have a named midwife throughout pregnancy &mdash; a model shown to reduce preterm birth by 24% and stillbirth by 16% &mdash; yet only 14% of women in England receive continuity of carer. The Maternity Safety Strategy (2016) and the Three-Year Delivery Plan (2023) committed to halving stillbirths and neonatal deaths by 2025. Neonatal mortality has fallen 25% since 2010, but maternal mortality remains stubbornly, unacceptably high.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-mortality', label: 'Maternal Mortality' },
          { id: 'sec-workforce', label: 'Midwife Workforce' },
          { id: 'sec-ratings', label: 'CQC Ratings' },
        ]} />

        <ScrollReveal>
          <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Maternal mortality rate (per 100,000 maternities)"
              value="9.7"
              direction="up"
              polarity="up-is-bad"
              changeText="2022 &middot; Double Norway&apos;s rate &middot; Up from 8.2 in 2014 &middot; Black women 3.7x more likely to die"
              sparklineData={[8.5, 8.4, 8.2, 8.3, 9.7, 9.7, 9.8, 9.8, 9.5, 10.4, 9.7]}
              onExpand={() => {}}
            />
            <MetricCard
              label="NHS midwife vacancies"
              value="2,500"
              direction="up"
              polarity="up-is-bad"
              changeText="2023 &middot; 12.3% vacancy rate &middot; Up from 7% in 2016 &middot; CQC: staffing cited in 90% of inadequate ratings"
              sparklineData={[7.0, 8.2, 8.8, 9.5, 9.8, 10.4, 11.8, 12.3]}
              onExpand={() => {}}
            />
            <MetricCard
              label="Maternity units rated &apos;requires improvement&apos; or worse"
              value="60%"
              direction="up"
              polarity="up-is-bad"
              changeText="2023 &middot; 13% inadequate &middot; Ockenden Report: 1,223 families harmed at Shrewsbury &middot; East Kent: 45 preventable deaths"
              sparklineData={[30, 35, 38, 42, 48, 52, 55, 58, 60]}
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-mortality" className="mb-12">
            <LineChart
              title="UK maternal mortality rate, 2012&ndash;2022"
              subtitle="Deaths per 100,000 maternities. MBRRACE-UK uses three-year rolling average."
              series={mortalitySeries}
              annotations={mortalityAnnotations}
              yLabel="Deaths per 100,000 maternities"
              source={{
                name: 'MBRRACE-UK',
                dataset: 'Saving Lives Improving Mothers Care Report',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-workforce" className="mb-12">
            <LineChart
              title="NHS midwife vacancy rate, England, 2016&ndash;2023"
              subtitle="Community and hospital midwives combined."
              series={vacancySeries}
              yLabel="Vacancy rate (%)"
              source={{
                name: 'NHS England',
                dataset: 'NHS Workforce Statistics',
                frequency: 'monthly',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-ratings" className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-2">CQC ratings of NHS maternity units, England, 2023</h2>
            <p className="text-sm text-wiah-mid font-mono mb-6">Care Quality Commission ratings across all NHS maternity services.</p>
            {data && (
              <div className="space-y-3">
                {data.national.cqcRatings.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-40 text-sm text-wiah-black flex-shrink-0">{item.rating}</div>
                    <div className="flex-1 bg-wiah-border rounded h-5 overflow-hidden">
                      <div
                        className="h-full rounded"
                        style={{ width: `${(item.pct / 47) * 100}%`, backgroundColor: '#E63946' }}
                      />
                    </div>
                    <div className="w-16 text-right text-sm font-mono text-wiah-black">{item.pct}%</div>
                  </div>
                ))}
              </div>
            )}
            <p className="font-mono text-xs text-wiah-mid mt-4">Source: Care Quality Commission &mdash; State of Care 2023</p>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="What&apos;s improving"
            value="3,000"
            unit="additional midwives being recruited as part of the NHS Long-Term Workforce Plan"
            description="The NHS Long-Term Workforce Plan (2023) commits to training 3,000 more midwives over the next decade, doubling the annual intake to NHS midwifery courses. The Maternity Safety Strategy, launched in 2016, set the ambition of halving stillbirths, neonatal and maternal deaths by 2025 &mdash; neonatal deaths have fallen 25% since 2010. The Three-Year Delivery Plan for Maternity and Neonatal Services (2023) provides &pound;165 million for staffing, continuity of carer, and safety improvements. Following the Ockenden and East Kent inquiries, NHS England has introduced standardised safety checklists and mandatory culture programmes for all maternity units."
            source="Source: MBRRACE-UK &mdash; Saving Lives Improving Mothers Care 2023; NHS England &mdash; Three-Year Delivery Plan for Maternity Services 2023."
          />
        </ScrollReveal>

        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            {data?.metadata.sources.map((src, i) => (
              <div key={i}>
                <a href={src.url} target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">
                  {src.name} &mdash; {src.dataset}
                </a>
                <div className="text-xs text-wiah-mid">Updated {src.frequency}</div>
              </div>
            ))}
          </div>
          <div className="text-sm text-wiah-mid mt-6 space-y-2">
            <h3 className="font-bold">Methodology</h3>
            <p>{data?.metadata.methodology}</p>
          </div>
          <div className="text-sm text-wiah-mid mt-6 space-y-2">
            <h3 className="font-bold">Known issues</h3>
            <ul className="list-disc list-inside space-y-1">
              {data?.metadata.knownIssues.map((issue, i) => (
                <li key={i}>{issue}</li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
