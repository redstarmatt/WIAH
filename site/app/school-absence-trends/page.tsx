'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

const overallAbsenceData = [4.6, 4.6, 4.7, 4.8, 4.9, 5.0, 4.9, 7.5, 6.7, 6.5];
const persistentAbsenceData = [10.9, 11.1, 11.2, 11.8, 13.1, 13.0, 12.1, 22.3, 21.2, 20.8];

const absenceSeries: Series[] = [
  {
    id: 'overall',
    label: 'Overall absence rate (%)',
    colour: '#F4A261',
    data: overallAbsenceData.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
  {
    id: 'persistent',
    label: 'Persistent absence rate (%)',
    colour: '#E63946',
    data: persistentAbsenceData.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
];

const absenceAnnotations: Annotation[] = [
  { date: new Date(2020, 0, 1), label: '2020: COVID school closures' },
  { date: new Date(2022, 0, 1), label: '2022: Post-COVID absence surge' },
];

const fsmNonFsmData = {
  fsm: [20.0, 21.3, 22.5, 38.5, 37.2, 36.5],
  nonFsm: [9.5, 10.1, 10.6, 18.3, 17.4, 17.0],
};

const fsmSeries: Series[] = [
  {
    id: 'fsm',
    label: 'FSM-eligible pupils (% persistently absent)',
    colour: '#E63946',
    data: fsmNonFsmData.fsm.map((v, i) => ({ date: new Date(2018 + i, 0, 1), value: v })),
  },
  {
    id: 'non-fsm',
    label: 'Non-FSM pupils (% persistently absent)',
    colour: '#6B7280',
    data: fsmNonFsmData.nonFsm.map((v, i) => ({ date: new Date(2018 + i, 0, 1), value: v })),
  },
];

const fsmAnnotations: Annotation[] = [
  { date: new Date(2020, 0, 1), label: '2020: Pandemic widened gap' },
];

export default function SchoolAbsenceTrendsPage() {
  return (
    <>
      <TopicNav topic="School Absence" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="School Absence"
          question="Why Are Children Missing So Much School?"
          finding="Persistent absenteeism (missing 10%+ of school) hit 22.3% in 2022/23 — double pre-pandemic — with disadvantaged pupils and those with SEND absent at twice the rate of peers."
          colour="#F4A261"
          preposition="on"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Key numbers' },
          { id: 'sec-trend', label: 'Absence trend' },
          { id: 'sec-deprivation', label: 'Deprivation gap' },
        ]} />

        <section id="sec-metrics" className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Persistently absent pupils (%)"
              value="20.8%"
              direction="down"
              polarity="up-is-bad"
              changeText="2023/24 · Down from 22.3% peak but double pre-pandemic · 1.44M children · Still the highest in modern records"
              sparklineData={[11.2, 11.8, 13.0, 22.3, 21.2, 20.8, 20.8]}
              source="DfE — Pupil absence in schools in England, 2024"
            />
            <MetricCard
              label="Disadvantaged persistent absence (%)"
              value="36.5%"
              direction="down"
              polarity="up-is-bad"
              changeText="2023/24 · FSM-eligible pupils · 2× rate of non-disadvantaged · Poverty drives absence through illness, transport, clothing"
              sparklineData={[20.0, 21.3, 22.5, 38.5, 37.2, 36.5, 36.5]}
              source="DfE — Pupil absence in schools in England, 2024"
            />
            <MetricCard
              label="Overall absence rate (%)"
              value="6.5%"
              direction="down"
              polarity="up-is-bad"
              changeText="2023/24 · Down from 7.5% post-COVID peak · Still 33% higher than 2019 pre-pandemic · 50M sessions lost/year"
              sparklineData={[4.7, 4.8, 5.0, 7.5, 6.7, 6.5, 6.5]}
              source="DfE — Pupil absence in schools in England, 2024"
            />
          </div>
        </section>

        <ScrollReveal>
          <section id="sec-trend" className="mb-12">
            <LineChart
              title="Overall and persistent absence rate in England, 2015–2024 (%)"
              subtitle="Overall absence rate (any sessions missed) and persistent absence rate (missing 10%+ of sessions) for state-funded schools, England. The pandemic created a step-change in absence that has not reversed."
              series={absenceSeries}
              annotations={absenceAnnotations}
              yLabel="Absence rate (%)"
              source={{
                name: 'DfE',
                dataset: 'Pupil absence in schools in England',
                url: 'https://explore-education-statistics.service.gov.uk/find-statistics/pupil-absence-in-schools-in-england',
                frequency: 'annual',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-deprivation" className="mb-12">
            <LineChart
              title="Persistent absence by free school meal eligibility, 2018–2024 (%)"
              subtitle="Persistent absence rate for pupils eligible for free school meals (FSM) vs non-FSM pupils. The gap has doubled since the pandemic, reflecting the disproportionate impact on disadvantaged families."
              series={fsmSeries}
              annotations={fsmAnnotations}
              yLabel="Persistently absent (%)"
              source={{
                name: 'DfE',
                dataset: 'Pupil absence in schools — by characteristic',
                url: 'https://explore-education-statistics.service.gov.uk/find-statistics/pupil-absence-in-schools-in-england',
                frequency: 'annual',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The data on school absence</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>Persistent absenteeism — defined as missing 10% or more of school sessions — hit 22.3% of pupils in 2022/23, double the pre-pandemic rate of around 11%. In 2023/24 this fell slightly to 20.8%, but remains the highest rate in modern records and affects an estimated 1.44 million children. Overall absence — any sessions missed — stands at 6.5%, a third higher than in 2018/19. Collectively, pupils are missing around 50 million sessions per year.</p>
              <p>The absence crisis is not evenly distributed. Pupils eligible for free school meals — a proxy for poverty — have persistent absence rates of 36.5%, more than double the 17% rate for non-disadvantaged pupils. Pupils with special educational needs and disabilities (SEND) are absent at similar elevated rates. The causes of disadvantaged pupils' higher absence are multiple: illness from poor housing, inability to afford transport or school uniform, caring responsibilities, and in some cases schools making it clear — directly or indirectly — that certain pupils are unwanted.</p>
              <p>The pandemic's role was catalytic rather than causative: absence was already rising before COVID-19, and the pandemic appears to have disrupted the habit of attendance in ways that have proved persistent. Research by Education Endowment Foundation suggests each additional week of school missed is associated with lower attainment — and that the attainment gap between disadvantaged and non-disadvantaged pupils has widened significantly post-pandemic.</p>
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="What the government is doing"
            value="87 weeks"
            unit="threshold at which fines for unauthorised absence were doubled in 2024 — from 10 to 160 sessions"
            description="The government introduced new attendance guidance in 2022 requiring schools to have an attendance policy and work with families before issuing penalty notices. In 2024, fines for unauthorised term-time holidays were increased from £60 to £160 per child per parent. But most chronic absence is not unauthorised holidays — it is illness, mental health difficulties, and circumstances linked to poverty. Early intervention partnerships (local authorities, schools, NHS, social care working together) have the best evidence for reducing entrenched absence, particularly for SEND pupils and those with mental health needs."
            source="Source: DfE — Pupil absence in schools in England 2023/24; EEF — COVID-19 and pupil attainment."
          />
        </ScrollReveal>

        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p><a href="https://explore-education-statistics.service.gov.uk/find-statistics/pupil-absence-in-schools-in-england" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DfE — Pupil absence in schools in England</a> — primary absence data. Updated annually.</p>
            <p>Persistent absence = missing 10% or more of possible sessions. Data covers state-funded primary, secondary and special schools in England. Academic year data mapped to start year for charting.</p>
            <p>Free school meals (FSM) eligibility used as indicator of disadvantage. SEND data from same annual statistical release.</p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
