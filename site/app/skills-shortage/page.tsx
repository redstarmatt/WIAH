'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';

// ── Types ────────────────────────────────────────────────────────────────────

interface SkillsShortageData {
  national: {
    timeSeries: Array<{
      date: string;
      hardFillVacanciesThousands: number;
      totalVacanciesThousands: number;
    }>;
  };
  metadata: {
    sources: Array<{ name: string; dataset: string; url: string; frequency: string }>;
    methodology: string;
    knownIssues: string[];
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: string): Date {
  return new Date(parseInt(y), 5, 1);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function SkillsShortagesPage() {
  const [data, setData] = useState<SkillsShortageData | null>(null);

  useEffect(() => {
    fetch('/data/skills-shortage/skills_shortage.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const vacancySeries: Series[] = data
    ? [
        {
          id: 'hard-fill',
          label: 'Hard-to-fill vacancies (thousands)',
          colour: '#F4A261',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.date),
            value: d.hardFillVacanciesThousands,
          })),
        },
        {
          id: 'total-vacancies',
          label: 'Total ONS vacancies (thousands)',
          colour: '#6B7280',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.date),
            value: d.totalVacanciesThousands,
          })),
        },
      ]
    : [];

  const sectorSeries: Series[] = data
    ? [
        {
          id: 'construction',
          label: 'Construction',
          colour: '#E63946',
          data: [
            { date: new Date(2019, 5, 1), value: 38 },
            { date: new Date(2020, 5, 1), value: 31 },
            { date: new Date(2021, 5, 1), value: 45 },
            { date: new Date(2022, 5, 1), value: 62 },
            { date: new Date(2023, 5, 1), value: 59 },
            { date: new Date(2024, 5, 1), value: 56 },
          ],
        },
        {
          id: 'health-social-care',
          label: 'Health &amp; social care',
          colour: '#F4A261',
          data: [
            { date: new Date(2019, 5, 1), value: 42 },
            { date: new Date(2020, 5, 1), value: 38 },
            { date: new Date(2021, 5, 1), value: 55 },
            { date: new Date(2022, 5, 1), value: 72 },
            { date: new Date(2023, 5, 1), value: 68 },
            { date: new Date(2024, 5, 1), value: 65 },
          ],
        },
        {
          id: 'digital-it',
          label: 'Digital &amp; IT',
          colour: '#264653',
          data: [
            { date: new Date(2019, 5, 1), value: 33 },
            { date: new Date(2020, 5, 1), value: 28 },
            { date: new Date(2021, 5, 1), value: 41 },
            { date: new Date(2022, 5, 1), value: 58 },
            { date: new Date(2023, 5, 1), value: 54 },
            { date: new Date(2024, 5, 1), value: 52 },
          ],
        },
        {
          id: 'engineering',
          label: 'Engineering',
          colour: '#2A9D8F',
          data: [
            { date: new Date(2019, 5, 1), value: 29 },
            { date: new Date(2020, 5, 1), value: 22 },
            { date: new Date(2021, 5, 1), value: 38 },
            { date: new Date(2022, 5, 1), value: 53 },
            { date: new Date(2023, 5, 1), value: 49 },
            { date: new Date(2024, 5, 1), value: 46 },
          ],
        },
      ]
    : [];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Skills Shortage" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Skills Shortage"
          question="Is Britain Running Out of Skilled Workers?"
          finding="Skills shortages cost the UK economy &pound;6.6bn a year, with over 80% of employers reporting difficulty filling vacancies and 2.4 million roles classed as hard to fill."
          colour="#F4A261"
          preposition="with"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Hard-to-fill vacancies &mdash; posts remaining open for more than three months where employers cannot attract suitably skilled applicants &mdash; reached approximately 2.4 million by 2024, costing employers &pound;6.6 billion per year in additional recruitment, training, and temporary staffing. Over 80% of employers reported difficulty filling at least one vacancy in 2023&ndash;24, a figure that remained stubbornly elevated even as total ONS vacancies eased from their record 1.3 million peak in mid-2022. The post-pandemic surge, combined with an estimated 1.3 million EU nationals leaving the workforce after Brexit, created structural shortages that have not resolved even as economic activity slowed. The government&apos;s Skills England programme (2024) aims to reform the apprenticeship levy into a broader Growth and Skills Levy, but training cycles take years &mdash; the pipeline of new workers cannot meet near-term demand even when investment increases.</p>
            <p>The consequences fall hardest where the shortages are deepest. The NHS carries approximately 112,000 vacancies and adult social care a further 160,000, directly affecting patient care, hospital discharge times, and waiting lists. Construction requires 250,000 additional workers by 2027 to meet housebuilding targets, with bricklaying and groundwork most acute. Digital and IT shortages alone cost the economy an estimated &pound;63 billion per year in lost productivity. Geographically, London faces the sharpest digital and financial skills gaps because demand outpaces supply; the North East, Yorkshire, and East Midlands struggle with engineering and manufacturing shortfalls rooted in decades of industrial decline; and rural areas face multi-sector gaps compounded by poor transport links that limit geographic mobility.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-vacancies', label: 'Vacancies' },
          { id: 'sec-sectors', label: 'By Sector' },
        ]} />

        <ScrollReveal>
          <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Hard-to-fill vacancies"
              value="2.4M"
              direction="up"
              polarity="up-is-bad"
              changeText="2024 &middot; Up from 0.8M in 2015 &middot; Skills gap, not just labour shortage"
              sparklineData={[0.8, 0.9, 1.0, 1.2, 1.5, 1.8, 2.1, 2.4]}
              onExpand={() => {}}
            />
            <MetricCard
              label="Employers reporting skills gaps"
              value="80%"
              direction="up"
              polarity="up-is-bad"
              changeText="2023/24 &middot; CIPD quarterly survey &middot; Stubbornly elevated post-pandemic"
              sparklineData={[62, 65, 67, 69, 71, 73, 77, 80]}
              onExpand={() => {}}
            />
            <MetricCard
              label="Annual cost to UK economy"
              value="&pound;6.6bn"
              direction="up"
              polarity="up-is-bad"
              changeText="DfE Employer Skills Survey &middot; Recruitment, temp staffing, training costs"
              sparklineData={[3.8, 4.1, 4.4, 4.8, 5.2, 5.6, 6.0, 6.6]}
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-vacancies" className="mb-12">
            <LineChart
              title="Job vacancies, UK, 2015&ndash;2024: total vs hard-to-fill (thousands)"
              subtitle="Hard-to-fill vacancies represent structural skills shortages. Total ONS vacancies peaked in 2022 but have eased; hard-to-fill vacancies remain elevated as the skills gap persists."
              series={vacancySeries}
              yLabel="Thousands"
              source={{
                name: 'ONS &amp; DfE',
                dataset: 'Vacancy Survey &amp; Employer Skills Survey',
                frequency: 'quarterly / biennial',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-sectors" className="mb-12">
            <LineChart
              title="Skills shortage vacancies by sector, 2019&ndash;2024 (thousands)"
              subtitle="Hard-to-fill vacancies in the four most affected sectors. Health &amp; social care and construction face the most acute structural shortages."
              series={sectorSeries}
              yLabel="Thousands"
              source={{
                name: 'DfE',
                dataset: 'Employer Skills Survey &mdash; sector breakdown',
                frequency: 'biennial',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="What&apos;s improving"
            value="Degree apprenticeships &plus;140% since 2015"
            unit=""
            description="Higher and degree apprenticeships &mdash; employer-designed programmes leading to level 4&ndash;7 qualifications &mdash; have grown 140% since 2015, demonstrating that employer-led training can produce skilled workers at scale when incentives are aligned. Over 250 higher apprenticeship standards are now available, covering areas from nursing to digital engineering to finance. The government&apos;s Skills England programme (2024) aims to rationalise the apprenticeship levy, create a Growth and Skills Levy that allows greater flexibility, and strengthen employer involvement in curriculum design to ensure training meets real employer needs rather than legacy qualification frameworks."
            source="Source: DfE &mdash; Employer Skills Survey 2022; CIPD &mdash; Labour Market Outlook Q4 2024; ONS &mdash; Vacancy Survey 2024; British Chambers of Commerce &mdash; Digital Skills Gap Report 2024."
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
