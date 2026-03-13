'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import RelatedTopics from '@/components/RelatedTopics';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'Student Loans Company', dataset: 'Student Loans in England Statistics, 2022/23', url: 'https://www.gov.uk/government/collections/student-loans-company', date: '2023' },
  { num: 2, name: 'IFS', dataset: 'The Graduate Premium, 2024', url: 'https://ifs.org.uk/publications/graduate-premium', date: '2024' },
  { num: 3, name: 'Office for Students', dataset: 'Financial Sustainability of Higher Education Providers, 2023', url: 'https://www.officeforstudents.org.uk/', date: '2023' },
  { num: 4, name: 'HESA', dataset: 'Higher Education Student Statistics, 2022/23', url: 'https://www.hesa.ac.uk/data-and-analysis', date: '2023' },
  { num: 5, name: 'OfS', dataset: 'Graduate Outcomes Survey, 2022/23', url: 'https://www.officeforstudents.org.uk/', date: '2023' },
];

interface StudentDebtData {
  timeSeries: { year: number; averageDebtThousandsGBP: number }[];
  latestYear: number;
  latestThousands: number;
  neverRepayPlanTwoPct: number;
  repaymentTermYearsPlanFive: number;
  note: string;
}

interface TuitionFeesData {
  nominalFeeCapped2023: number;
  realTerms2023: number;
  frozenSinceYear: number;
  providersInDifficulty: number;
  note: string;
}

interface InternationalStudentsData {
  timeSeries: { year: number; studentsThousands: number }[];
  latestYear: number;
  latestThousands: number;
  pctOfAllStudents: number;
  economicContributionBillionGBP: number;
}

interface SubjectOutcome {
  subject: string;
  graduateJobPct: number;
}

interface UniversityFundingData {
  topic: string;
  lastUpdated: string;
  national: {
    studentDebt: StudentDebtData;
    tuitionFees: TuitionFeesData;
    internationalStudents: InternationalStudentsData;
    subjectOutcomes: SubjectOutcome[];
  };
  metadata: {
    sources: { name: string; dataset: string; url: string; frequency: string }[];
    methodology: string;
    knownIssues: string[];
  };
}

function calendarYearToDate(y: number): Date {
  return new Date(y, 0, 1);
}

export default function UniversityFundingPage() {
  const [data, setData] = useState<UniversityFundingData | null>(null);

  useEffect(() => {
    fetch('/data/university-funding/university_funding.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // Student debt series (in thousands for display)
  const studentDebtSeries: Series[] = data
    ? [
        {
          id: 'student-debt',
          label: 'Average student loan debt at graduation',
          colour: '#264653',
          data: data.national.studentDebt.timeSeries.map(d => ({
            date: calendarYearToDate(d.year),
            value: d.averageDebtThousandsGBP,
          })),
        },
      ]
    : [];

  const studentDebtAnnotations: Annotation[] = [
    { date: new Date(2012, 5, 1), label: '2012: Fees rise to £9,000' },
  ];

  // International students series (in thousands)
  const internationalStudentsSeries: Series[] = data
    ? [
        {
          id: 'intl-students',
          label: 'International students',
          colour: '#264653',
          data: data.national.internationalStudents.timeSeries.map(d => ({
            date: calendarYearToDate(d.year),
            value: d.studentsThousands,
          })),
        },
      ]
    : [];

  return (
    <div className="min-h-screen bg-white">
      <TopicNav topic="University Funding" />

      <TopicHeader
        topic="University Funding"
        question="Is a Degree Actually Worth the Debt?"
        finding="Average student loan debt at graduation reached £45,800 in 2022/23. Under Plan 5 (from 2023), graduates repay for 40 years. 72% of graduates under Plan 2 never repay their loan in full. Universities face a real-terms funding cut as the £9,250 fee has been frozen since 2017."
        colour="#264653"
      />

      <div className="max-w-4xl mx-auto px-4 md:px-6 py-12">
        <ScrollReveal>
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <MetricCard
              label="Average student loan debt at graduation"
              value="£45,800"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="2022/23 · Up from £16,200 in 2011/12 · Plan 5 (2023+): repay for 40 years · 72% never repay in full under Plan 2"
              sparklineData={[16200, 20500, 25600, 29400, 33900, 38200, 41300, 43500, 45800]}
            />
            <MetricCard
              label="Tuition fee (real terms, 2023 prices)"
              value="£6,800"
              unit=""
              direction="down"
              polarity="up-is-good"
              changeText="2023 · Nominal fee £9,250 unchanged since 2017 · Real-terms cut of £2,450 since 2017 · 40% of providers in financial difficulty (OfS)"
              sparklineData={[9000, 9250, 9250, 9250, 9250, 9000, 8600, 8100, 7600, 7100, 6800]}
            />
            <MetricCard
              label="International students in UK"
              value="680K"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="2022/23 · 26% of all students · Up from 425K in 2015 · £25bn contribution to UK economy · Govt. sought to reduce post-study work visas"
              sparklineData={[350, 370, 395, 410, 425, 440, 460, 490, 540, 600, 650, 680]}
            />
          </div>
        </ScrollReveal>

        {/* Student Debt Chart */}
        {studentDebtSeries.length > 0 && (
          <ScrollReveal>
            <div className="mb-16">
              <LineChart
                title="Average student loan debt at graduation, England, 2012–2023"
                subtitle="Full-time English-domiciled undergraduates"
                series={studentDebtSeries}
                annotations={studentDebtAnnotations}
                yLabel="£ thousands (nominal)"
                source={{
                  name: 'Student Loans Company',
                  dataset: 'Student loans in England statistics',
                  frequency: 'annual',
                }}
              />
            </div>
          </ScrollReveal>
        )}

        {/* Graduate Employment by Subject Bar Chart */}
        {data && (
          <ScrollReveal>
            <div className="mb-16">
              <div className="bg-wiah-light p-8 rounded-lg">
                <h3 className="font-sans font-bold text-xl mb-6 text-wiah-black">Graduate employment outcomes by subject</h3>
                <p className="font-sans text-sm text-wiah-mid mb-6">15 months after graduation, % in graduate-level employment</p>
                <div className="space-y-4">
                  {data.national.subjectOutcomes.map((item, idx) => {
                    const maxPct = 96;
                    const barWidth = (item.graduateJobPct / maxPct) * 100;
                    return (
                      <div key={idx}>
                        <div className="flex justify-between mb-2">
                          <span className="font-sans text-sm font-semibold text-wiah-black">{item.subject}</span>
                          <span className="font-mono text-sm font-semibold text-wiah-black">{item.graduateJobPct}%</span>
                        </div>
                        <div className="h-8 bg-wiah-border rounded">
                          <div
                            className="h-full bg-wiah-blue rounded transition-all"
                            style={{ width: `${barWidth}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
                <p className="font-mono text-xs text-wiah-mid mt-6">Source: Graduate Outcomes Survey — DfE. 2022/23 cohort.</p>
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* International Students Chart */}
        {internationalStudentsSeries.length > 0 && (
          <ScrollReveal>
            <div className="mb-16">
              <LineChart
                title="International students in UK higher education, 2015–2023"
                subtitle="Headcount of non-UK domicile students. Contributes £25bn to UK economy annually."
                series={internationalStudentsSeries}
                yLabel="Students (thousands)"
                source={{
                  name: 'HESA',
                  dataset: 'Higher Education Student Statistics',
                  frequency: 'annual',
                }}
              />
            </div>
          </ScrollReveal>
        )}

        {/* Positive Callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Graduate Earnings Premium"
            value="£100K+"
            unit="lifetime earnings advantage over non-graduates"
            description="Despite rising debt, the average graduate still earns around £100,000–£300,000 more over their lifetime than a non-graduate — with medicine, law, and engineering at the top. The graduate premium remains positive across most subjects. The Office for Students registers and regulates 400+ providers. From 2025/26, tuition fees will rise to £9,535 (the first increase since 2017) — partially restoring real-terms university income. The Higher Education (Freedom of Speech) Act 2023 places new duties on universities to protect lawful free expression."
            source="Source: IFS — The graduate premium, 2024; Student Loans Company — 2022/23 statistics."
          />
        </ScrollReveal>

        {/* Context Section */}
        <ScrollReveal>
          <section className="mt-20 pt-12 border-t border-wiah-border">
            <h2 className="font-sans text-2xl font-bold text-wiah-black mb-6">What's driving these trends?</h2>
            <div className="font-sans text-base text-wiah-black leading-relaxed space-y-4">
              <p>
                England's tuition fee has risen from £1,000 when Labour introduced it in 1998 to £3,000 in 2006 and £9,000 in 2012, reaching £9,250 in 2017 where it froze until a rise to £9,535 in 2025/26. Average debt at graduation nearly tripled in a decade: £16,200 in 2011/12 under £3,000 fees, £45,800 in 2022/23 under £9,250 fees.<Cite nums={1} /> Under Plan 5, introduced for the 2023 entry cohort, the repayment term extends to 40 years at a threshold of £25,000 and interest capped at RPI (Bank Rate plus 1%). Under Plan 2, 72% of graduates never fully repay — far above original Treasury modelling.<Cite nums={1} />
              </p>
              <p>
                Despite the debt, access has not collapsed: 76% of young people who left school after the 2012 fee increase went on to higher education. The IFS estimated in 2024 that the average graduate earns £100,000–£300,000 more over a lifetime than a non-graduate, though creative arts, social care, and some humanities degrees produce negative returns for many.<Cite nums={2} /> The OfS Graduate Outcomes Survey shows three in ten graduates working in non-graduate roles five years after leaving.<Cite nums={5} /> Subject-level variation is stark: medicine and engineering deliver strong returns while other fields leave graduates no better off financially than peers who skipped university entirely.
              </p>
              <p>
                Universities themselves face a funding crisis. The £9,250 fee cap, frozen from 2017 to 2025, lost over £2,450 per student in real terms. The Office for Students' 2023 financial sustainability assessment found 40% of English higher education providers in difficulty; 40 universities ran deficits in 2022/23, with several — including Coventry — announcing restructuring.<Cite nums={3} /> Total sector income was £41.9 billion in 2021/22, of which £19.2 billion came from tuition fees. International students, numbering 680,000 in 2022/23 and generating £25 billion in economic activity, have become the financial lifeline — making government moves from 2023 to restrict the Graduate Route visa a direct threat to institutional solvency.<Cite nums={4} />
              </p>
            </div>
          </section>
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        {/* Sources & Methodology */}
        <ScrollReveal>
          <section className="mt-16 pt-12 border-t border-wiah-border">
            <h2 className="font-sans text-2xl font-bold text-wiah-black mb-6">Sources &amp; Methodology</h2>
            {data && (
              <div className="font-sans text-sm space-y-6">
                <div>
                  <h3 className="font-bold text-wiah-black mb-2">Data sources</h3>
                  <ul className="space-y-2">
                    {data.metadata.sources.map((src, idx) => (
                      <li key={idx} className="text-wiah-mid">
                        <strong className="text-wiah-black">{src.name}:</strong> 
                        <a href={src.url} target="_blank" rel="noopener noreferrer" className="underline text-wiah-blue">
                          {src.dataset}
                        </a>
                         ({src.frequency})
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-wiah-black mb-2">Methodology</h3>
                  <p className="text-wiah-mid">{data.metadata.methodology}</p>
                </div>
                <div>
                  <h3 className="font-bold text-wiah-black mb-2">Known issues</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {data.metadata.knownIssues.map((issue, idx) => (
                      <li key={idx} className="text-wiah-mid">
                        {issue}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </section>
        </ScrollReveal>

      </div>
        <RelatedTopics />
    </div>
  );
}
