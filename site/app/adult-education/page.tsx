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

interface AdultEducationData {
  national: {
    participationRate: {
      timeSeries: Array<{ year: number; pctAdults: number }>;
    };
    feEnrolments: {
      timeSeries: Array<{ year: number; millionsEnrolments: number }>;
    };
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

export default function AdultEducationPage() {
  const [data, setData] = useState<AdultEducationData | null>(null);

  useEffect(() => {
    fetch('/data/adult-education/adult_education.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const participationSeries: Series[] = data
    ? [{
        id: 'participation',
        label: 'Adult participation in learning (%)',
        colour: '#2A9D8F',
        data: data.national.participationRate.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.pctAdults,
        })),
      }]
    : [];

  const enrolmentSeries: Series[] = data
    ? [{
        id: 'fe-enrolments',
        label: 'FE enrolments (millions)',
        colour: '#264653',
        data: data.national.feEnrolments.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.millionsEnrolments,
        })),
      }]
    : [];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Adult Education" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Adult Education"
          question="Why Has Britain Stopped Training Its Adults?"
          finding="Adult participation in learning has fallen from 20&percnt; to 15&percnt; since 2015. Further education enrolments have declined by 30&percnt; in a decade, from 3.3 million to 2.3 million. The Adult Education Budget has been cut by over 40&percnt; in real terms since 2010 while the UK faces critical skills shortages in construction, digital, and green energy."
          colour="#2A9D8F"
          preposition="with"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Adult participation in learning has fallen from 20&percnt; to 15.4&percnt; since 2015, and further education enrolments have dropped 30&percnt; &mdash; from 3.3 million to 2.3 million &mdash; over the same period. The Adult Education Budget has been cut over 40&percnt; in real terms since 2010, leaving the UK spending less on adult skills as a proportion of GDP than any comparator OECD economy except Turkey and Mexico. The decline falls at precisely the wrong moment: the Migration Advisory Committee identifies over 40 shortage occupations; the Construction Industry Training Board projects a shortfall of 251,000 workers by 2028; the green transition needs an estimated 480,000 workers in insulation, heat pump installation, and renewables. Apprenticeship starts for adults aged 25 and over have fallen 42&percnt; since the Apprenticeship Levy was introduced in 2017, with employer spending concentrated on management qualifications rather than technical skills. Nine million adults in England still lack Level 2 qualifications equivalent to GCSEs.</p>
            <p>The decline is not evenly distributed. Participation is lowest among those who would benefit most: adults without Level 2 qualifications, low-paid workers, those aged 55 and over, disabled people, and people in rural areas with poor transport links. Adults with existing qualifications are twice as likely to participate in further learning as those without &mdash; a compounding inequality. Geographic gaps are stark: London&apos;s participation rate of 21&percnt; compares with 12&percnt; in the North East. ESOL funding has been cut 60&percnt; since 2009, limiting access for ethnic minority adults. For workers on zero-hours contracts or in the gig economy, time off for training is economically prohibitive, making the population with the greatest skills need the least able to access provision.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-participation', label: 'Participation' },
          { id: 'sec-enrolments', label: 'FE Enrolments' },
        ]} />

        <ScrollReveal>
          <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Adult learning participation rate"
              value="15.4%"
              direction="down"
              polarity="up-is-good"
              changeText="2024 &middot; Down from 20% in 2015 &middot; Lowest among those without Level 2 qualifications"
              sparklineData={[20.1, 19.4, 18.7, 17.3, 17.0, 14.2, 15.5, 16.1, 15.8, 15.4]}
              onExpand={() => {}}
            />
            <MetricCard
              label="FE enrolments"
              value="2.3M"
              direction="down"
              polarity="up-is-good"
              changeText="2023/24 &middot; Down 30% from 3.3M in 2015 &middot; AEB cut 40% in real terms since 2010"
              sparklineData={[3.3, 3.1, 2.9, 2.8, 2.7, 2.4, 2.5, 2.5, 2.4, 2.3]}
              onExpand={() => {}}
            />
            <MetricCard
              label="Adults without Level 2 qualifications"
              value="9M"
              direction="flat"
              polarity="up-is-bad"
              changeText="England &middot; Equivalent to GCSEs &middot; 17% of working-age adults &middot; Limits employment options"
              sparklineData={[10.2, 10.0, 9.8, 9.6, 9.4, 9.2, 9.1, 9.0]}
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-participation" className="mb-12">
            <LineChart
              title="Adult participation in learning, UK, 2015&ndash;2024"
              subtitle="Proportion of adults aged 19+ who have participated in learning in the past three years."
              series={participationSeries}
              yLabel="%"
              source={{
                name: 'DfE / Learning and Work Institute',
                dataset: 'Adult Participation in Learning Survey',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-enrolments" className="mb-12">
            <LineChart
              title="Further education enrolments, England, 2015&ndash;2024"
              subtitle="Total learner starts in FE and skills programmes funded through the Adult Education Budget, advanced learner loans, and apprenticeships (millions)."
              series={enrolmentSeries}
              yLabel="Millions"
              source={{
                name: 'DfE',
                dataset: 'Further Education and Skills Statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="What&apos;s being built"
            value="72%"
            unit="of Skills Bootcamp participants reporting positive career progression"
            description="Skills Bootcamps &mdash; intensive 12&ndash;16 week courses in digital, technical, and green skills &mdash; have shown strong employment outcomes. The Lifelong Learning Entitlement (from 2025) will provide modular funding equivalent to four years of student finance for FE and HE. The Lifetime Skills Guarantee offers free Level 3 qualifications to adults without one. Devolution of the Adult Education Budget to mayoral combined authorities allows locally tailored provision. T-Levels are expanding technical education routes for younger adults."
            source="Source: DfE &mdash; Further Education and Skills Statistics 2024; Learning and Work Institute &mdash; Adult Participation Survey 2024; OECD &mdash; Education at a Glance 2024."
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
