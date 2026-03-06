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
          finding="Adult participation in learning has fallen from 20% to 15% since 2015. Further education enrolments have declined by 30% in a decade, from 3.3 million to 2.3 million. The Adult Education Budget has been cut by over 40% in real terms since 2010 while the UK faces critical skills shortages in construction, digital, and green energy."
          colour="#2A9D8F"
          preposition="with"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The UK is experiencing a structural decline in adult learning at precisely the moment when the economy demands more of it. Adult participation in learning &mdash; defined as the proportion of adults aged 19 and over who have engaged in any form of education or training in the past three years &mdash; has fallen from approximately 20% in 2015 to 15.4% in 2024. Further education (FE) enrolments have declined from 3.3 million in the 2015/16 academic year to 2.3 million in 2023/24, a 30% reduction. The Adult Education Budget (AEB), which funds the majority of classroom-based adult skills provision, was &pound;1.34 billion in 2024/25 &mdash; a real-terms cut of over 40% since 2010. The UK now spends less on adult skills as a proportion of GDP than any comparator OECD economy except Turkey and Mexico.</p>
            <p>The decline matters because the UK has acute skills shortages. The Migration Advisory Committee identifies over 40 occupations on the Shortage Occupation List, including nurses, electricians, HGV drivers, and software developers. The Construction Industry Training Board estimates a shortfall of 251,000 construction workers by 2028, critical at a time when the government is pursuing an ambitious housebuilding programme. The green transition will require 480,000 workers in insulation, heat pump installation, and renewable energy &mdash; skills that barely exist at scale in the current workforce. Yet apprenticeship starts for adults (25+) have fallen 42% since the introduction of the Apprenticeship Levy in 2017, which shifted training decisions toward employers who have largely concentrated spending on management qualifications rather than technical skills. The proportion of Level 2 (equivalent to GCSEs) qualifications in adult FE has fallen, while Level 3+ (equivalent to A-levels and above) provision has grown &mdash; progress for those who access it, but a narrowing of opportunity for the nine million adults in England who lack basic qualifications.</p>
            <p>Policy responses have been fragmented. The Lifetime Skills Guarantee, announced in 2020, offers free Level 3 qualifications to adults without one, but take-up has been modest: approximately 42,000 adults started a free Level 3 course in 2023/24, against an eligible population of millions. Skills Bootcamps &mdash; short (12&ndash;16 week), intensive training courses in digital, technical, and green skills &mdash; have grown rapidly and show promising employment outcomes, with 72% of participants reporting positive career progression. The Lifelong Learning Entitlement, legislated in the Lifelong Learning (Higher Education Fee Limits) Act 2023, will from 2025 provide a modular funding system equivalent to four years of student finance for both further and higher education, potentially transforming how adults access and pay for training. However, its success depends on employer recognition of modular qualifications and FE colleges having the capacity to deliver them. Devolution of the Adult Education Budget to mayoral combined authorities (Greater Manchester, West Midlands, London, and others) has produced some locally tailored provision but also created complexity and variation in entitlements.</p>
            <p>The decline in adult learning is not evenly distributed. Participation rates are lowest among those who would benefit most: adults without Level 2 qualifications, those in low-paid work, older workers (55+), disabled people, and those in rural areas with poor transport links. The Learning and Work Institute&apos;s annual participation survey consistently shows that adults with existing qualifications are twice as likely to participate in further learning as those without &mdash; a &ldquo;Matthew effect&rdquo; in which those who have, get more. Geographic disparities mirror the wider regional inequality picture: London has the highest adult participation rate (21%) and the North East the lowest (12%). Women are slightly more likely to participate than men, but ethnic minority adults face barriers including language provision (ESOL funding has been cut by 60% since 2009), cultural access, and discrimination. For workers in the gig economy and on zero-hours contracts, time away from work for training is economically prohibitive.</p>
            <p>Measuring adult learning is inherently difficult. The primary source &mdash; the Annual Population Survey &mdash; relies on self-reported participation and uses a broad definition that includes informal learning, workplace training, and online courses alongside formal qualifications. This means participation rates are not directly comparable with FE enrolment data, which counts only funded starts. The National Adult Learner Survey, which provided the most rigorous participation data, was discontinued after 2010 as a cost-saving measure. FE enrolment counts double-count individuals who start multiple courses, and completion rates (as opposed to starts) are not published in a timely or comparable format. The Adult Education Budget underspend &mdash; which has averaged 10&ndash;15% of the allocation since 2018 &mdash; is variously interpreted as evidence of suppressed demand, inadequate marketing, or institutional capacity constraints. International comparisons (OECD Education at a Glance) use different definitions and survey instruments, making precise UK ranking difficult, though the direction of travel &mdash; declining relative to peers &mdash; is clear across all measures.</p>
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
