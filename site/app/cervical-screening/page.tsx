'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import PositiveCallout from '@/components/PositiveCallout';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'NHS England', dataset: 'Cervical Screening Programme Statistics', url: 'https://digital.nhs.uk/data-and-information/publications/statistical/cervical-screening-programme', date: '2024' },
];

export default function CervicalScreeningPage() {
  const coverageData = [80.4, 79.8, 79.1, 78.4, 77.5, 76.3, 75.0, 73.5, 72.9, 71.7, 71.4, 70.1, 69.9, 69.8, 68.7, 68.4, 68.5, 68.7, 68.9, 69.1, 69.2, 69.4, 69.6, 69.8, 68.4];
  const ageGroupData = [
    [61.8, 60.5, 59.2, 58.0, 57.1, 56.3, 55.8, 55.2, 54.9, 54.7],
    [74.2, 73.8, 73.1, 72.5, 71.8, 71.2, 70.6, 70.0, 69.4, 68.9],
    [80.1, 79.6, 79.2, 78.8, 78.4, 78.0, 77.6, 77.2, 76.8, 76.5],
  ];

  const coverageSeries: Series[] = [
    {
      id: 'coverage',
      label: 'Cervical screening coverage (%)',
      colour: '#E63946',
      data: coverageData.map((v: number, i: number) => ({ date: new Date(2000 + i, 0, 1), value: v })),
    },
  ];

  const ageGroupSeries: Series[] = [
    {
      id: 'age25to34',
      label: 'Age 25–34 coverage (%)',
      colour: '#E63946',
      data: ageGroupData[0].map((v: number, i: number) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
    {
      id: 'age35to49',
      label: 'Age 35–49 coverage (%)',
      colour: '#F4A261',
      data: ageGroupData[1].map((v: number, i: number) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
    {
      id: 'age50to64',
      label: 'Age 50–64 coverage (%)',
      colour: '#6B7280',
      data: ageGroupData[2].map((v: number, i: number) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
  ];

  const coverageAnnotations: Annotation[] = [
    { date: new Date(2009, 0, 1), label: '2009: Jade Goody effect — surge then fades' },
    { date: new Date(2020, 0, 1), label: '2020: COVID-19 disruption' },
  ];

  const coverageTarget = { value: 80.0, label: '80% coverage target' };

  return (
    <>
      <TopicNav topic="Cervical Screening" />
      <SectionNav sections={[
        { id: 'sec-metrics', label: 'Key Metrics' },
        { id: 'sec-coverage', label: 'Coverage Trend' },
        { id: 'sec-age', label: 'By Age Group' },
        { id: 'sec-context', label: 'Context' },
        { id: 'sec-sources', label: 'Sources' },
      ]} />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Cervical Screening"
          question="Are Women Getting Their Cervical Screening?"
          finding="Cervical screening (smear test) coverage is at a 21-year low of 68.4% — 1 in 4 women invited do not attend, and coverage is lowest among the youngest age group."
          colour="#E63946"
        />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 mb-12">
            <MetricCard
              label="Cervical screening coverage (%)"
              value="68.4"
              direction="down"
              polarity="down-is-bad"
              changeText="21-year low · down from 80.4% in 2000 · target is 80%"
              sparklineData={[72.9, 71.7, 71.4, 70.1, 69.9, 68.7, 68.4]}
              source="NHS England — 2024"
            />
            <MetricCard
              label="Women overdue for screening (millions)"
              value="4.6"
              direction="up"
              polarity="up-is-bad"
              changeText="4.6m women overdue · 1 in 4 invited do not attend"
              sparklineData={[3.2, 3.5, 3.7, 4.0, 4.2, 4.4, 4.6]}
              source="NHS England — 2024"
            />
            <MetricCard
              label="HPV positivity rate (%)"
              value="11.8"
              direction="down"
              polarity="up-is-bad"
              changeText="down from 14.2% in 2012 · HPV vaccination working"
              sparklineData={[14.2, 13.8, 13.1, 12.7, 12.3, 12.0, 11.8]}
              source="NHS England — 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-coverage" className="mb-12">
            <LineChart
              title="Cervical screening coverage, England 2000–2024"
              subtitle="Percentage of women aged 25–64 screened within the recommended interval (3 or 5 years depending on age)."
              series={coverageSeries}
              targetLine={coverageTarget}
              annotations={coverageAnnotations}
              yLabel="Coverage (%)"
              source={{
                name: 'NHS England',
                dataset: 'Cervical Screening Programme statistics',
                frequency: 'annual',
                url: 'https://digital.nhs.uk/data-and-information/publications/statistical/cervical-screening-programme',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-age" className="mb-12">
            <LineChart
              title="Cervical screening coverage by age group, England 2015–2024"
              subtitle="Coverage is lowest among the 25–34 age group and has been declining across all cohorts."
              series={ageGroupSeries}
              yLabel="Coverage (%)"
              source={{
                name: 'NHS England',
                dataset: 'Cervical Screening Programme — age-specific coverage',
                frequency: 'annual',
                url: 'https://digital.nhs.uk/data-and-information/publications/statistical/cervical-screening-programme',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="Screening Saves Lives"
            value="5,000"
            unit="cases prevented"
            description="Cervical screening prevents around 5,000 cases of cervical cancer per year in England. The HPV vaccination programme — now achieving over 80% coverage among school-age girls and boys — will reduce future incidence substantially. For women already outside vaccination cohorts, cervical screening remains the primary protection."
            source="NHS England, Cervical Screening Programme"
          />
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-context" className="max-w-2xl mb-12 mt-8">
            <h2 className="text-xl font-bold text-wiah-black mb-4">Why are fewer women attending?</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>Cervical screening coverage in England peaked in the early 2000s and has fallen almost continuously since. The 2009 "Jade Goody effect" — a temporary surge in attendance following extensive media coverage of the celebrity's cervical cancer diagnosis and death — demonstrated that awareness drives uptake, but the effect dissipated within 18 months as the normal downward trend resumed.<Cite nums={1} /> Coverage is now at 68.4%, the lowest since the programme began in its current form.<Cite nums={1} /></p>
              <p>The youngest women — aged 25 to 34 — have the lowest coverage of any age group, at around 55%.<Cite nums={1} /> Barriers include embarrassment, previous negative experiences, fear of abnormal results, difficulty booking convenient appointments, and cultural factors that are particularly pronounced among women from some South Asian and Black African backgrounds. The move to longer screening intervals under the HPV primary screening programme has caused confusion — some women believe they no longer need to attend as frequently.</p>
              <p>Access barriers are structural as well as psychological. Most smear tests are performed in GP surgeries during standard hours, making attendance difficult for women in inflexible employment. Evening and weekend appointments remain limited. The national campaign "Help Us Help You" has raised awareness but not systematically shifted behaviour. Academic evidence consistently shows that personal invitation from a named GP and simplified booking significantly improve attendance, but implementation is patchy.</p>
            </div>
          </section>
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p><a href="https://digital.nhs.uk/data-and-information/publications/statistical/cervical-screening-programme" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS England — Cervical Screening Programme statistics</a> — annual publication covering coverage rates, call and recall activity, and colposcopy outcomes.</p>
            <p>HPV positivity rates from NHS England HPV primary screening programme reporting. Age-specific coverage from programme monitoring data. All figures are for England. Recommended screening interval varies by age: every 3 years for women 25–49, every 5 years for women 50–64.</p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
