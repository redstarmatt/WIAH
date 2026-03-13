'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

export default function StemGenderGapPage() {
  // Chart 1: Women as % of STEM workforce 2013–2024
  const womenInStem = [21, 21, 22, 22, 22, 23, 23, 23, 23, 24, 24, 24];

  const stemWorkforceSeries: Series[] = [
    {
      id: 'women-stem',
      label: 'Women as % of STEM workforce',
      colour: '#E63946',
      data: womenInStem.map((v, i) => ({ date: new Date(2013 + i, 0, 1), value: v })),
    },
  ];

  const stemAnnotations: Annotation[] = [
    { date: new Date(2017, 0, 1), label: '2017: WISE Campaign target set' },
    { date: new Date(2022, 0, 1), label: '2022: Post-pandemic workforce shift' },
  ];

  // Chart 2: Girls taking STEM A-levels 2015–2024 (% by subject)
  const girlsPhysics   = [19, 19, 20, 20, 20, 21, 21, 21, 22, 22];
  const girlsComputing = [9,  10, 10, 11, 12, 13, 14, 15, 16, 16];
  const girlsBiology   = [61, 62, 62, 62, 62, 63, 63, 62, 62, 62];
  const girlsMaths     = [40, 40, 40, 39, 40, 40, 40, 40, 40, 40];

  const aLevelSeries: Series[] = [
    {
      id: 'biology',
      label: 'Biology (girls %)',
      colour: '#2A9D8F',
      data: girlsBiology.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
    {
      id: 'maths',
      label: 'Maths (girls %)',
      colour: '#F4A261',
      data: girlsMaths.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
    {
      id: 'physics',
      label: 'Physics (girls %)',
      colour: '#264653',
      data: girlsPhysics.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
    {
      id: 'computing',
      label: 'Computing (girls %)',
      colour: '#E63946',
      data: girlsComputing.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
  ];

  return (
    <>
      <TopicNav topic="STEM Gender Gap" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="STEM Gender Gap"
          question="Why Are Women Still Underrepresented in STEM?"
          finding="Women make up only 24% of STEM workers in the UK — and the gap has narrowed by less than 3 percentage points in a decade — with computing and engineering among the worst."
          colour="#E63946"
          preposition="on the"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-workforce', label: 'STEM workforce' },
          { id: 'sec-alevels', label: 'Girls at A-level' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <section id="sec-metrics" className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Women in STEM workforce (%)"
              value="24"
              direction="up"
              polarity="up-is-good"
              changeText="up from 21% in 2013 · less than 3pp gain in a decade"
              sparklineData={[21, 21, 22, 22, 22, 23, 23, 23, 23, 24, 24, 24]}
              source="WISE Campaign — Women in STEM 2024"
            />
            <MetricCard
              label="Women studying computer science A-level (%)"
              value="16"
              direction="up"
              polarity="up-is-good"
              changeText="up from 9% in 2015 · biggest gain but from lowest base"
              sparklineData={[9, 10, 10, 11, 12, 13, 14, 15, 16, 16]}
              source="JCQ — A-level Results by Gender 2024"
            />
            <MetricCard
              label="Pay gap in STEM (%)"
              value="19"
              direction="down"
              polarity="up-is-bad"
              changeText="women earn 19% less than men in STEM roles"
              sparklineData={[23, 22, 22, 21, 21, 20, 20, 20, 19, 19]}
              source="ONS ASHE — STEM gender pay gap 2024"
            />
          </div>
        </section>

        <ScrollReveal>
          <section id="sec-workforce" className="mb-12">
            <LineChart
              title="Women as % of STEM workforce, UK, 2013–2024"
              subtitle="Women as share of all workers in science, technology, engineering and mathematics occupations. UK."
              series={stemWorkforceSeries}
              annotations={stemAnnotations}
              yLabel="Women in STEM workforce (%)"
              source={{
                name: 'WISE Campaign',
                dataset: 'Women in STEM Workforce Statistics',
                frequency: 'annual',
                url: 'https://www.wisecampaign.org.uk/statistics/',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-alevels" className="mb-12">
            <LineChart
              title="Girls taking STEM A-levels, England, 2015–2024 (% of entries by subject)"
              subtitle="Girls as a share of total A-level entries in each STEM subject. Biology near parity; computing and physics remain heavily male-dominated."
              series={aLevelSeries}
              yLabel="Girls as % of entries"
              source={{
                name: 'JCQ (Joint Council for Qualifications)',
                dataset: 'A-level Results by Subject and Gender',
                frequency: 'annual',
                url: 'https://www.jcq.org.uk/examination-results/',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The data on women in STEM</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>Women make up 24% of STEM workers in the UK — up from 21% in 2013, but a gain of less than 3 percentage points over a decade. At that rate of change, gender parity in the STEM workforce is more than 80 years away. Computing is the worst-performing major STEM sector, with women accounting for around 19% of tech professionals. Engineering is similarly poor. By contrast, life sciences have near-parity at entry level, though women remain underrepresented at senior levels.</p>
              <p>The A-level pipeline reveals the divergence. Biology entries are 62% female — near parity. Maths entries are 40% female. Physics entries are just 22% female, and computing 16%. The gaps open not at GCSE but at the point of subject choice aged 16–17, shaped by subject self-concept, teacher influence, peer norms, and career awareness. Girls who do take physics or computing at A-level go on to STEM degrees and careers at similar rates to boys — the bottleneck is the subject choice itself.</p>
              <p>The economic case for change is clear: the UK cannot meet demand for STEM skills while recruiting only from half the population. The structural change required involves teacher professional development, visible female role models in STEM careers, and challenging the curriculum contexts in which technical subjects are taught. These are solvable problems, but they require sustained investment rather than one-off initiatives.</p>
            </div>
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p><a href="https://www.wisecampaign.org.uk/statistics/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">WISE Campaign</a> — Women in STEM Workforce. Annual statistics.</p>
            <p><a href="https://www.jcq.org.uk/examination-results/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">JCQ</a> — A-level and AS-level results by subject and gender. Published annually.</p>
            <p><a href="https://www.hesa.ac.uk/data-and-analysis/students" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">HESA</a> — Higher Education Student Statistics by subject and gender.</p>
            <p>STEM occupations defined using SOC 2020 coding following WISE methodology. Pay gap calculated from ONS Annual Survey of Hours and Earnings (ASHE) median hourly pay, all STEM occupations combined. Note: 2020 A-level data affected by teacher-assessed grades replacing exams.</p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
