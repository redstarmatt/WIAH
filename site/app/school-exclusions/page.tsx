'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'DfE', dataset: 'Suspensions and Permanent Exclusions in England', url: 'https://explore-education-statistics.service.gov.uk/find-statistics/suspensions-and-permanent-exclusions-in-england', date: '2023' },
  { num: 2, name: 'Education Policy Institute', dataset: 'Unexplained pupil exits — off-rolling estimates', url: 'https://epi.org.uk', date: '2023' },
  { num: 3, name: 'Ministry of Justice', dataset: 'Data linkage — school exclusion and custody', url: 'https://www.gov.uk/government/organisations/ministry-of-justice', date: '2022' },
  { num: 4, name: 'DfE', dataset: 'Timpson Review of School Exclusion', url: 'https://www.gov.uk/government/publications/timpson-review-of-school-exclusion', date: '2019' },
];

const permExclusionsData = [5170, 5795, 6685, 7720, 7900, 6619, 5620, 9160, 9440, 9780];
const fixedExclusionsData = [410, 438, 476, 506, 432, 325, 390, 787, 810, 840];

const exclusionsSeries: Series[] = [
  {
    id: 'permanent',
    label: 'Permanent exclusions',
    colour: '#E63946',
    data: permExclusionsData.map((v, i) => ({ date: new Date(2014 + i, 0, 1), value: v })),
  },
];

const exclusionsAnnotations: Annotation[] = [
  { date: new Date(2019, 0, 1), label: '2019: Timpson Review' },
  { date: new Date(2020, 0, 1), label: '2020: COVID school closures' },
  { date: new Date(2022, 0, 1), label: '2022: Post-COVID surge' },
];

const ethnicityData2018 = [3.6, 1.2, 1.9, 0.9, 0.8];
const ethnicityData2024 = [4.1, 1.5, 2.2, 1.1, 0.9];
const ethnicGroups = ['Black Caribbean', 'White British', 'Mixed heritage', 'Asian', 'Other'];

const ethnicitySeries: Series[] = [
  {
    id: 'black-carib',
    label: 'Black Caribbean exclusion rate (per 10,000)',
    colour: '#E63946',
    data: ([3.6, 3.7, 3.8, 3.6, 3.3, 3.9, 4.1]).map((v, i) => ({ date: new Date(2018 + i, 0, 1), value: v })),
  },
  {
    id: 'white-brit',
    label: 'White British exclusion rate (per 10,000)',
    colour: '#6B7280',
    data: ([1.2, 1.3, 1.4, 1.3, 1.1, 1.4, 1.5]).map((v, i) => ({ date: new Date(2018 + i, 0, 1), value: v })),
  },
];

export default function SchoolExclusionsPage() {
  return (
    <>
      <TopicNav topic="School Exclusions" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="School Exclusions"
          question="Who Gets Excluded from School — and Why?"
          finding="Over 9,000 children were permanently excluded in 2022/23 — Black Caribbean pupils are 3× more likely to be excluded — and exclusions correlate strongly with later criminal justice contact."
          colour="#E63946"
          preposition="on"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Key numbers' },
          { id: 'sec-trend', label: 'Exclusion trend' },
          { id: 'sec-ethnicity', label: 'Ethnic disparity' },
        ]} />

        <section id="sec-metrics" className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Permanent exclusions per year"
              value="9,160"
              direction="up"
              polarity="up-is-bad"
              changeText="2022/23 · Up 77% since 2015/16 · Boys: 75% of exclusions · SEND pupils: 40%"
              sparklineData={[5170, 6685, 7720, 7900, 5620, 7800, 9160]}
              source="DfE — Suspensions and Permanent Exclusions, 2023"
            />
            <MetricCard
              label="Black Caribbean vs white British exclusion ratio"
              value="3×"
              direction="up"
              polarity="up-is-bad"
              changeText="Black Caribbean pupils excluded at 3× rate · Gypsy/Roma highest of all groups · Gap has not closed since 2010"
              sparklineData={[3.0, 3.0, 3.1, 3.1, 3.0, 3.0, 3.1]}
              source="DfE — Suspensions and Permanent Exclusions, 2023"
            />
            <MetricCard
              label="Fixed-period suspensions (thousands/yr)"
              value="787"
              direction="up"
              polarity="up-is-bad"
              changeText="2022/23 · Record high · Equivalent to 5.1M school days lost · Up from 410K in 2014"
              sparklineData={[410, 476, 506, 432, 325, 390, 787]}
              source="DfE — Suspensions and Permanent Exclusions, 2023"
            />
          </div>
        </section>

        <ScrollReveal>
          <section id="sec-trend" className="mb-12">
            <LineChart
              title="Permanent exclusions in England, 2014–2024"
              subtitle="Number of pupils permanently excluded from state-funded schools per year. Post-COVID surge broke previous records."
              series={exclusionsSeries}
              annotations={exclusionsAnnotations}
              yLabel="Permanent exclusions"
              source={{
                name: 'DfE',
                dataset: 'Suspensions and Permanent Exclusions in England',
                url: 'https://explore-education-statistics.service.gov.uk/find-statistics/suspensions-and-permanent-exclusions-in-england',
                frequency: 'annual',
                date: '2023',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-ethnicity" className="mb-12">
            <LineChart
              title="Exclusion rate by ethnic group, 2018–2024 (per 10,000 pupils)"
              subtitle="Permanent exclusion rate per 10,000 pupils by ethnicity. Black Caribbean pupils are consistently 3× more likely to be excluded than white British peers."
              series={ethnicitySeries}
              yLabel="Exclusions per 10,000 pupils"
              source={{
                name: 'DfE',
                dataset: 'Suspensions and Permanent Exclusions — ethnicity breakdown',
                url: 'https://explore-education-statistics.service.gov.uk/find-statistics/suspensions-and-permanent-exclusions-in-england',
                frequency: 'annual',
                date: '2023',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The data on school exclusions</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>England recorded 9,160 permanent exclusions in 2022/23, up 77% from 5,170 in 2014/15 and the highest figure since comparable records began.<Cite nums={1} /> A further 787,000 fixed-period suspensions were issued — also a record — equivalent to more than five million school days lost. Boys account for 75% of permanent exclusions, and pupils with special educational needs and disabilities make up 40% despite representing just 17% of the school population.</p>
              <p>The ethnic disparity is stark and persistent. Black Caribbean pupils face exclusion at three times the rate of white British pupils. Gypsy, Roma and Irish Traveller children have the highest exclusion rate of any ethnic group. This gap has not meaningfully narrowed since 2010. Research by the Education Policy Institute suggests between 40,000 and 49,000 additional pupils per year leave school rolls through informal off-rolling — meaning official figures understate the true scale.<Cite nums={2} /></p>
              <p>The Ministry of Justice's 2022 data linkage study found that 63% of young people in custody had been permanently excluded from school, and 89% had been suspended at least once.<Cite nums={3} /> Each permanent exclusion is estimated to cost the state £300,000 over a lifetime. Labour's 2024 manifesto committed to reducing exclusions through mandatory inclusion plans and strengthened local authority oversight.</p>
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="The Alternative Provision challenge"
            value="£300,000"
            unit="estimated lifetime cost to the state of each permanent exclusion"
            description="Excluded pupils enter Alternative Provision — pupil referral units, AP academies, and independent special schools — at a cost of £22,000 per pupil per year, versus £6,000 in mainstream. Just 4% of AP pupils achieve five good GCSEs. The Timpson Review (2019) found exclusion decisions were inconsistently applied and recommended schools retain accountability for excluded pupils' outcomes.<Cite nums={4} /> The SEND Review (2022) called for exclusion to be a last resort for pupils with special needs."
            source="Source: DfE — Suspensions and Permanent Exclusions 2022/23; IPPR — Making the Difference."
          />
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p><a href="https://explore-education-statistics.service.gov.uk/find-statistics/suspensions-and-permanent-exclusions-in-england" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DfE — Suspensions and Permanent Exclusions in England</a> — primary exclusions data. Updated annually.</p>
            <p>Ethnicity breakdown data from the same DfE statistical release. Rates expressed per 10,000 pupils of each ethnic group.</p>
            <p>All figures are for England state-funded schools. Financial year data mapped to start year for charting.</p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
