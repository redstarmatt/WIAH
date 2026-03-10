'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

// ── Types ─────────────────────────────────────────────────────────────────────

interface GcseEntriesPoint {
  year: number;
  artDesign: number;
  music: number;
  drama: number;
  dance: number;
}

interface ArtsTeacherPoint {
  year: number;
  artTeachers: number;
  musicTeachers: number;
}

interface ArtsInSchoolsData {
  gcseEntries: GcseEntriesPoint[];
  artsTeacherNumbers: ArtsTeacherPoint[];
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ArtsInSchoolsPage() {
  const [data, setData] = useState<ArtsInSchoolsData | null>(null);

  useEffect(() => {
    fetch('/data/arts-in-schools/arts_in_schools.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const gcseSeries: Series[] = data
    ? [
        {
          id: 'art-design',
          label: 'Art & Design',
          colour: '#E63946',
          data: data.gcseEntries.map(d => ({
            date: new Date(d.year, 0, 1),
            value: d.artDesign,
          })),
        },
        {
          id: 'drama',
          label: 'Drama',
          colour: '#264653',
          data: data.gcseEntries.map(d => ({
            date: new Date(d.year, 0, 1),
            value: d.drama,
          })),
        },
        {
          id: 'music',
          label: 'Music',
          colour: '#F4A261',
          data: data.gcseEntries.map(d => ({
            date: new Date(d.year, 0, 1),
            value: d.music,
          })),
        },
        {
          id: 'dance',
          label: 'Dance',
          colour: '#2A9D8F',
          data: data.gcseEntries.map(d => ({
            date: new Date(d.year, 0, 1),
            value: d.dance,
          })),
        },
      ]
    : [];

  return (
    <>
      <TopicNav topic="Arts in Schools" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Arts in Schools"
          question="Are the arts disappearing from English schools?"
          finding="GCSE art and design entries have fallen 41% since 2010. Music entries are down 41%, drama down 34%, dance down 44%. The EBacc — which excludes arts — has been the primary driver. Schools in deprived areas have cut arts most heavily."
          colour="#E63946"
        />

        <section className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              The picture is stark and consistent across every arts subject. GCSE entries
              in art and design, music, drama, and dance have all fallen sharply since 2010,
              with the steepest drops in dance (down 44%) and music (down 41%). This is not
              a reflection of changing pupil preferences: it is the direct consequence of
              the EBacc — a performance measure introduced in 2010 that rewards schools for
              the proportion of pupils gaining GCSE grades in English, maths, science,
              history or geography, and a language. The arts are absent from the EBacc,
              which means schools focused on performance table positions have a structural
              incentive to reduce arts provision to free timetable space for EBacc subjects.
            </p>
            <p>
              The impact is clearest in the most deprived schools. Arts subjects are typically
              the first to be cut when budgets are under pressure, as they require specialist
              teachers, instruments, equipment, and studio space. Schools in areas of high
              deprivation — where the funding squeeze hit hardest and the pressure to improve
              on headline metrics was greatest — have cut arts provision most deeply. The
              result is that access to music and art education has become increasingly stratified
              by family income. Private schools have not cut arts: if anything, their arts
              provision has expanded, reinforcing the class dimension of the decline.
            </p>
            </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-gcse', label: 'GCSE Entries' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Art & Design GCSE entries since 2010"
              value="−41"
              unit="%"
              direction="down"
              polarity="up-is-good"
              changeText="191,500 in 2010 → 113,200 in 2023 · EBacc driving shift away from arts"
              sparklineData={[191500, 177300, 155600, 133200, 117800, 113200]}
              source="JCQ GCSE Entries · 2023"
            />
            <MetricCard
              label="Music GCSE entries since 2010"
              value="−41"
              unit="%"
              direction="down"
              polarity="up-is-good"
              changeText="65,200 → 38,700 · secondary school music teachers down 24%"
              sparklineData={[65200, 57800, 47900, 42700, 40100, 38700]}
              source="JCQ / DfE School Workforce · 2023"
            />
            <MetricCard
              label="Drama GCSE entries since 2010"
              value="−34"
              unit="%"
              direction="down"
              polarity="up-is-good"
              changeText="82,300 → 54,100 · creative industries contribute £116bn to UK economy"
              sparklineData={[82300, 73400, 67200, 59800, 55200, 54100]}
              source="JCQ · 2023"
            />
          </div>
        

        <ScrollReveal>
          <div id="sec-gcse" className="mb-12">
            <LineChart
              series={gcseSeries}
              title="Arts GCSE entries in England, 2010–2023"
              subtitle="Number of GCSE entries across four creative subjects. EBacc introduced 2010."
              yLabel="Number of GCSE entries"

              annotations={[
                { date: new Date(2010, 0), label: '2010: EBacc introduced' },
                { date: new Date(2016, 0), label: '2016: EBacc target raised to 90%' },
              ]}
            />
            <p className="font-mono text-[11px] text-wiah-mid mt-2">
              Source:{' '}
              <a
                href="https://www.jcq.org.uk/examination-results"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-wiah-black"
              >
                JCQ — GCSE Examination Results
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
                  href="https://www.jcq.org.uk/examination-results"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-wiah-black"
                >
                  JCQ — GCSE Results and Statistics
                </a>{' '}
                · Annual
              </li>
              <li>
                <a
                  href="https://explore-education-statistics.service.gov.uk/find-statistics/school-workforce-in-england"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-wiah-black"
                >
                  DfE — School Workforce Census
                </a>{' '}
                · Annual
              </li>
              <li>
                <a
                  href="https://www.culturallearningalliance.org.uk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-wiah-black"
                >
                  Cultural Learning Alliance
                </a>
              </li>
            </ul>
          </div>
        </ScrollReveal>
              <RelatedTopics />
      </main>
    </>
  );
}
