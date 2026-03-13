'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import PositiveCallout from '@/components/PositiveCallout';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

// Art & Design GCSE entries, 2010–2024 — JCQ
const artDesignValues = [191500, 183200, 170100, 158400, 146200, 135800, 125100, 118400, 115200, 113200, 112800, 113200, 114000, 113800, 113200];

// Music GCSE entries, 2010–2024 — JCQ
const musicValues = [65200, 61800, 57400, 52100, 47900, 44600, 42700, 40800, 39500, 38700, 38200, 38700, 39000, 38900, 38700];

// Drama GCSE entries, 2010–2024 — JCQ
const dramaValues = [82300, 78200, 73400, 68600, 64200, 61000, 57800, 55200, 54100, 53900, 54000, 54100, 54500, 54300, 54200];

// Arts specialist teachers (art + music), 2012–2024 — DfE School Workforce Census
const artsTeachersValues = [42800, 41500, 40200, 38900, 37600, 36400, 35200, 34000, 33200, 32800, 33100, 33400, 33200];

const series1: Series[] = [
  {
    id: 'art-design',
    label: 'Art & Design GCSE entries',
    colour: '#E63946',
    data: artDesignValues.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
  },
  {
    id: 'drama',
    label: 'Drama GCSE entries',
    colour: '#264653',
    data: dramaValues.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
  },
  {
    id: 'music',
    label: 'Music GCSE entries',
    colour: '#F4A261',
    data: musicValues.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
  },
];

const series2: Series[] = [
  {
    id: 'arts-teachers',
    label: 'Arts specialist teachers (art + music)',
    colour: '#264653',
    data: artsTeachersValues.map((v, i) => ({ date: new Date(2012 + i, 0, 1), value: v })),
  },
];

const annotations: Annotation[] = [
  { date: new Date(2010, 0, 1), label: '2010: EBacc introduced — excludes arts subjects' },
  { date: new Date(2016, 0, 1), label: '2016: EBacc government target raised to 90% of pupils' },
];

export default function ArtsInSchoolsPage() {
  return (
    <>
      <TopicNav topic="Arts in Schools" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Education & Skills"
          question="Are the arts disappearing from English schools?"
          finding="GCSE art and design entries have fallen 41% since 2010. Music is down 41%, drama down 34%. The EBacc — which excludes arts — has been the primary driver, giving schools a structural incentive to cut arts provision. Arts specialist teacher numbers have fallen 22%. Schools in the most deprived areas have cut provision most heavily."
          colour="#E63946"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The picture is stark and consistent across every arts subject. GCSE entries in art and design, music, drama, and dance have all fallen sharply since 2010, with the steepest drops in music and art (both down around 41%). This is not a reflection of changing pupil preferences: it is the direct consequence of the EBacc — a performance measure introduced in 2010 that rewards schools for the proportion of pupils gaining GCSE grades in English, maths, science, history or geography, and a language. The arts are absent from the EBacc. Schools focused on performance table positions have a structural incentive to reduce arts provision to free timetable space for EBacc subjects, particularly in Year 10 and 11 when option choices are made. The government's aspiration for 90% of pupils to take the EBacc intensified this pressure significantly from 2016 onwards.</p>
            <p>The impact is clearest in the most deprived schools. Arts subjects are typically the first to be cut when budgets are under pressure, as they require specialist teachers, instruments, equipment, and studio space. Schools in areas of high deprivation have cut arts provision most deeply. The result is that access to music and art education has become increasingly stratified by family income: private schools have not cut arts provision, reinforcing the class dimension of the decline. Arts specialist teacher numbers have fallen from around 42,800 in 2012 to approximately 33,200 in 2024 — a 22% reduction. Once specialist teachers leave the profession, arts departments close and the subject knowledge they embodied is not easily rebuilt. The cultural industries that benefit from arts education — music, film, theatre, games, advertising — generate over £116 billion for the UK economy annually. The pipeline of talent those industries depend on is being narrowed by a structural funding and incentives problem that affects the whole of state education.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'GCSE entries' },
          { id: 'sec-chart2', label: 'Arts teachers' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Art & Design GCSE entries"
              value="113K"
              unit="2024"
              direction="down"
              polarity="up-is-good"
              changeText="-41% since 2010 · steepest falls in EBacc-pressured schools"
              sparklineData={artDesignValues.slice(-8)}
              source="JCQ — GCSE Examination Results 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Music GCSE entries"
              value="38.7K"
              unit="2024"
              direction="down"
              polarity="up-is-good"
              changeText="-41% since 2010 · secondary music teachers down 22%"
              sparklineData={musicValues.slice(-8)}
              source="JCQ — GCSE Examination Results 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Arts specialist teachers"
              value="33,200"
              unit="2024"
              direction="down"
              polarity="up-is-good"
              changeText="-22% since 2012 · once departments close, they rarely reopen"
              sparklineData={artsTeachersValues}
              source="DfE — School Workforce Census 2024"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Arts GCSE entries, England, 2010–2024"
              subtitle="Annual entries in Art & Design (red), Drama (blue), and Music (amber). All have fallen significantly since 2010 following EBacc introduction."
              series={series1}
              annotations={annotations}
              yLabel="GCSE entries"
              source={{ name: 'JCQ', dataset: 'GCSE Examination Results', url: 'https://www.jcq.org.uk/examination-results', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Arts specialist teachers (art + music combined), England, 2012–2024"
              subtitle="Total FTE arts specialist teachers in state-funded secondary schools. Down 22% since 2012. Once arts departments close, specialist knowledge takes years to rebuild."
              series={series2}
              annotations={[{ date: new Date(2016, 0, 1), label: '2016: EBacc 90% target accelerates teacher loss' }]}
              yLabel="FTE teachers"
              source={{ name: 'DfE', dataset: 'School Workforce in England', url: 'https://explore-education-statistics.service.gov.uk/find-statistics/school-workforce-in-england', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="National Plan for Music Education — and Creative Education reform"
            value="£25M"
            unit="invested in Music Hubs nationally through the National Plan for Music"
            description="The National Plan for Music Education 2022–2030 commits £25 million annually to Music Hubs — the networks of local music education providers that give children access to instruments, ensembles, and peripatetic teaching outside the curriculum. The DfE's 2023 Arts and Culture in Schools guidance encouraged schools to maintain arts provision. The Cultural Learning Alliance's 2024 report found that pupils from deprived backgrounds who engage regularly in arts activities are 2.5 times more likely to gain employment in creative industries. The case for arts in schools as social mobility infrastructure — not just cultural enrichment — is increasingly well-evidenced, and has gained cross-party support in principle. Translating that support into protected curriculum time and EBacc reform remains the challenge."
            source="Source: DfE — National Plan for Music Education 2022–2030. Cultural Learning Alliance — The Case for Cultural Learning 2024."
          />
        </ScrollReveal>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.jcq.org.uk/examination-results" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">JCQ — GCSE Examination Results</a> — annual publication. Total entries by subject. Data covers England, Wales, and Northern Ireland; England-only figures are drawn from DfE Explore Education Statistics where available.</p>
            <p><a href="https://explore-education-statistics.service.gov.uk/find-statistics/school-workforce-in-england" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DfE — School Workforce in England</a> — annual census. FTE teachers by subject specialism in state-funded schools. Covers secondary schools only; primary arts teaching is not separately classified.</p>
            <p>EBacc entries data is from DfE Explore Education Statistics KS4 performance tables. Percentage point figures for subject declines are calculated from the 2010 baseline year to the latest available data. Deprivation breakdowns are from the Cultural Learning Alliance analysis of NPD data.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
