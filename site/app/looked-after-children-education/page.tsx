'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import PositiveCallout from '@/components/PositiveCallout';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

export default function LookedAfterChildrenEducationPage() {
  // GCSE attainment 2014–2024: LAC vs all pupils (grade 4+ English and maths)
  const lacGcseData = [12, 12, 12, 12, 13, 13, 13, 14, 14, 15, 15];
  const allPupilsGcseData = [53, 54, 55, 57, 59, 61, 64, 65, 65, 64, 65];

  // Permanent exclusion rate 2015–2024: LAC vs all pupils (per 10,000 pupils)
  const lacExclusionData = [68, 72, 76, 80, 75, 68, 65, 62, 58, 55];
  const allPupilsExclusionData = [8, 8, 9, 10, 9, 7, 7, 8, 9, 10];

  const chart1Series: Series[] = [
    {
      id: 'lac',
      label: 'Looked-after children (grade 4+ English & maths GCSE)',
      colour: '#E63946',
      data: lacGcseData.map((v, i) => ({ date: new Date(2014 + i, 0, 1), value: v })),
    },
    {
      id: 'all',
      label: 'All pupils (grade 4+ English & maths GCSE)',
      colour: '#6B7280',
      data: allPupilsGcseData.map((v, i) => ({ date: new Date(2014 + i, 0, 1), value: v })),
    },
  ];

  const chart1Annotations: Annotation[] = [
    { date: new Date(2014, 0, 1), label: '2014: Pupil Premium Plus introduced' },
    { date: new Date(2020, 0, 1), label: '2020: Teacher-assessed grades (COVID)' },
  ];

  const chart2Series: Series[] = [
    {
      id: 'lacExclusion',
      label: 'Looked-after children (permanent exclusions per 10,000)',
      colour: '#E63946',
      data: lacExclusionData.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
    {
      id: 'allExclusion',
      label: 'All pupils (permanent exclusions per 10,000)',
      colour: '#6B7280',
      data: allPupilsExclusionData.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
  ];

  return (
    <>
      <TopicNav topic="Education" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Education"
          question="How Are Children in Care Doing in School?"
          finding="Only 15% of looked-after children achieve grade 4+ in English and maths GCSE — compared to 65% of all pupils — a gap that has narrowed by only 3 percentage points in a decade."
          colour="#E63946"
          preposition="on"
        />

        <PositiveCallout
          title="Permanent exclusions for children in care are falling"
          value="–19%"
          description="Permanent exclusions for looked-after children have fallen 19% since their peak in 2019, from 80 per 10,000 pupils to 55 per 10,000 in 2024. This follows stronger statutory guidance requiring schools to make every effort to support children in care before considering exclusion, and the Pupil Premium Plus funding of £2,570 per pupil per year providing additional resource for targeted pastoral support. While the rate remains six times the national average, the sustained downward trend reflects improving school understanding of trauma-informed approaches."
          source="DfE · Permanent exclusions and suspensions in England 2024"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-charts', label: 'Charts' },
          { id: 'sec-context', label: 'Context' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="LAC GCSE pass rate (grade 4+ English & maths)"
              value="15%"
              direction="up"
              polarity="up-is-good"
              changeText="+3pp since 2014 · 50pp below all pupils"
              sparklineData={[12, 12, 12, 12, 13, 13, 13, 14, 14, 15, 15]}
              source="DfE · Outcomes for Children Looked After 2024"
              href="#sec-charts"
            />
            <MetricCard
              label="All-pupil GCSE pass rate (grade 4+ English & maths)"
              value="65%"
              direction="up"
              polarity="up-is-good"
              changeText="+12pp since 2014 · gap with LAC persistently wide"
              sparklineData={[53, 54, 55, 57, 59, 61, 64, 65, 65, 64, 65]}
              source="DfE · Key Stage 4 Performance 2024"
              href="#sec-charts"
            />
            <MetricCard
              label="Attainment gap (percentage points)"
              value="50pp"
              direction="down"
              polarity="up-is-bad"
              changeText="Gap narrowed 9pp since 2014 · still entrenched"
              sparklineData={[41, 42, 43, 45, 46, 48, 51, 51, 51, 49, 50]}
              source="DfE · Outcomes for Children Looked After 2024"
              href="#sec-charts"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-charts" className="mb-12">
            <LineChart
              title="GCSE attainment — looked-after children vs all pupils, 2014–2024 (%)"
              subtitle="Percentage achieving grade 4+ in both English and maths GCSE. Looked-after children continuously in care for at least 12 months."
              series={chart1Series}
              annotations={chart1Annotations}
              yLabel="Grade 4+ in English & maths (%)"
              source={{
                name: 'DfE',
                dataset: 'Outcomes for Children Looked After by Local Authorities',
                frequency: 'annual',
                url: 'https://explore-education-statistics.service.gov.uk/find-statistics/outcomes-for-children-in-need-including-children-looked-after-by-local-authorities-in-england',
                date: 'Mar 2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="Permanent exclusion rate — looked-after children vs all pupils, 2015–2024 (per 10,000)"
              subtitle="Looked-after children are excluded at six times the national rate, though the gap is narrowing."
              series={chart2Series}
              yLabel="Permanent exclusions per 10,000 pupils"
              source={{
                name: 'DfE',
                dataset: 'Permanent exclusions and suspensions in England',
                frequency: 'annual',
                url: 'https://explore-education-statistics.service.gov.uk/find-statistics/permanent-and-fixed-period-exclusions-in-england',
                date: 'Mar 2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-context" className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The data on children in care education</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>Looked-after children — those in local authority care, typically in foster placements, children's homes, or kinship arrangements — represent the most educationally disadvantaged identifiable group in England. In 2024, just 15% of looked-after children achieved grade 4 or above in both English and maths at GCSE, compared with 65% of all pupils — a 50 percentage point gap that has persisted despite a decade of sustained policy attention. Pupil Premium Plus funding of £2,570 per pupil per year, statutory oversight by Virtual School Heads, and strengthened Personal Education Plans have all contributed to modest improvement, but the structural drivers — placement instability, developmental trauma, and the concentration of children with the highest needs — remain largely unchanged.</p>
              <p>Approximately one in three looked-after children changes school mid-year, against under 5% of all pupils, compounding the educational disruption caused by trauma. Children who have experienced the most placement changes show the lowest attainment and the highest rates of persistent absence. The attainment gap is widest for children who have been in care the longest — a counterintuitive finding that reflects the severity of needs that lead to long-term care, rather than care itself causing harm. The 38% NEET rate for care leavers at age 19, compared with 12% for all young people, extends the educational disadvantage well beyond school.</p>
              <p>Geographic and demographic inequalities are substantial. Children from Black and mixed-heritage backgrounds are overrepresented in the care system relative to their share of the population. Some local authorities show markedly lower attainment for looked-after children than comparable areas, reflecting differences in placement stability, school quality, and the quality of virtual school head interventions. The data consistently shows that where placement stability is maintained — particularly in long-term foster care — educational outcomes improve markedly. Stability, not institutional response, is the primary determinant of outcome.</p>
            </div>
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p><a href="https://explore-education-statistics.service.gov.uk/find-statistics/outcomes-for-children-in-need-including-children-looked-after-by-local-authorities-in-england" className="text-wiah-blue hover:underline" target="_blank" rel="noopener noreferrer">DfE — Outcomes for Children Looked After by Local Authorities in England</a>. Annual. GCSE attainment measured for children continuously looked after for at least 12 months. Grade 4+ in both English and maths GCSE (or equivalent qualification).</p>
            <p><a href="https://explore-education-statistics.service.gov.uk/find-statistics/permanent-and-fixed-period-exclusions-in-england" className="text-wiah-blue hover:underline" target="_blank" rel="noopener noreferrer">DfE — Permanent exclusions and suspensions in England</a>. Annual. Exclusion rates per 10,000 pupils.</p>
            <p>Note: 2020 GCSE data was affected by teacher-assessed grades — year-on-year comparison with 2019 and 2021 requires caution. The looked-after population changes in composition each year. All figures are for England only.</p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
