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
  { num: 1, name: 'Diabetes UK', dataset: 'Statistics', url: 'https://www.diabetes.org.uk/professionals/position-statements-reports/statistics', date: '2024' },
  { num: 2, name: 'NHS Digital', dataset: 'National Diabetes Audit', url: 'https://digital.nhs.uk/data-and-information/publications/statistical/national-diabetes-audit', date: '2024' },
  { num: 3, name: 'NHS England', dataset: 'Diabetes — expenditure and prevention programme data', url: 'https://www.england.nhs.uk/diabetes/', date: '2024' },
];

export default function DiabetesPage() {
  const type1Prevalence = [0.40, 0.41, 0.42, 0.43, 0.44, 0.45, 0.45, 0.46, 0.46, 0.47, 0.47, 0.48, 0.48, 0.49];
  const type2Prevalence = [2.90, 3.05, 3.20, 3.35, 3.50, 3.65, 3.80, 3.95, 4.10, 4.25, 4.40, 4.60, 4.80, 5.11];
  const nhsSpend        = [7.7, 7.9, 8.1, 8.3, 8.6, 8.8, 9.0, 9.2, 9.4, 9.5, 9.6, 9.8, 9.9, 10.0];

  const chart1Series: Series[] = [
    {
      id: 'type1',
      label: 'Type 1 diabetes (millions)',
      colour: '#F4A261',
      data: type1Prevalence.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
    },
    {
      id: 'type2',
      label: 'Type 2 diabetes (millions)',
      colour: '#E63946',
      data: type2Prevalence.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
    },
  ];

  const chart2Series: Series[] = [
    {
      id: 'nhs-spend',
      label: 'NHS diabetes expenditure (£bn)',
      colour: '#264653',
      data: nhsSpend.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
    },
  ];

  const chart1Annotations: Annotation[] = [
    { date: new Date(2013, 0, 1), label: '2013: NHS Diabetes Prevention Programme announced' },
    { date: new Date(2019, 0, 1), label: '2019: NHS DPP scaled nationally' },
    { date: new Date(2022, 0, 1), label: '2022: Post-Covid obesity surge' },
  ];

  const chart2Annotations: Annotation[] = [
    { date: new Date(2015, 0, 1), label: '2015: Diabetes treatment costs escalate' },
    { date: new Date(2023, 0, 1), label: '2023: GLP-1 drugs approved (Ozempic/Wegovy)' },
  ];

  return (
    <>
      <TopicNav topic="Diabetes" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Diabetes"
          question="Is the Diabetes Crisis Getting Worse?"
          finding="5.6 million people have diabetes in the UK — type 2 diagnoses rising 40% since 2010 — costing the NHS £10bn/year, with obesity the primary driver."
          colour="#F4A261"
          preposition="in"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Key metrics' },
          { id: 'sec-chart1', label: 'Prevalence' },
          { id: 'sec-chart2', label: 'NHS spend' },
        ]} />

        <section id="sec-metrics" className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="People with diabetes (millions)"
              value="5.6"
              direction="up"
              polarity="up-is-bad"
              changeText="up from 3.3m in 2010 · 1 in 11 adults · projected 5.8m by 2030"
              sparklineData={[3.3, 3.5, 3.6, 3.8, 3.9, 4.1, 4.3, 4.6, 4.8, 5.0, 5.2, 5.4, 5.6]}
              source="Diabetes UK — 2024"
            />
            <MetricCard
              label="Type 2 diagnoses (% of total)"
              value="91"
              direction="up"
              polarity="up-is-bad"
              changeText="up from 85% in 2010 · driven by rising obesity rates"
              sparklineData={[85, 86, 87, 88, 89, 90, 91]}
              source="NHS Digital / Diabetes UK — 2024"
            />
            <MetricCard
              label="NHS diabetes cost (£bn/yr)"
              value="10.0"
              direction="up"
              polarity="up-is-bad"
              changeText="up from £7.7bn in 2010 · 10% of entire NHS budget"
              sparklineData={[7.7, 7.9, 8.1, 8.3, 8.6, 8.8, 9.0, 9.2, 9.5, 9.8, 10.0]}
              source="NHS England — 2024"
            />
          </div>
        </section>

        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Diabetes prevalence in UK 2010–2024 (millions, type 1 vs type 2)"
              subtitle="Diagnosed diabetes cases. Type 2 has risen 76% since 2010, driven primarily by obesity. An estimated 1 million more people have undiagnosed diabetes."
              series={chart1Series}
              annotations={chart1Annotations}
              yLabel="People with diabetes (millions)"
              source={{
                name: 'Diabetes UK / NHS Digital',
                dataset: 'Diabetes prevalence — diagnosed cases by type',
                frequency: 'annual',
                url: 'https://www.diabetes.org.uk/professionals/position-statements-reports/statistics',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="NHS diabetes expenditure 2010–2024 (£bn)"
              subtitle="Total NHS spending on diabetes treatment, including hospital admissions, medications, and complications. Represents around 10% of total NHS England budget."
              series={chart2Series}
              annotations={chart2Annotations}
              yLabel="NHS diabetes spend (£bn)"
              source={{
                name: 'NHS England',
                dataset: 'NHS diabetes expenditure and programme costs',
                frequency: 'annual',
                url: 'https://www.england.nhs.uk/diabetes/',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="What is showing promise"
            value="NHS Diabetes Prevention Programme"
            unit="2016–present"
            description="The NHS Diabetes Prevention Programme (NHS DPP), the world's largest structured diabetes prevention programme, has enrolled over 1.5 million people since 2016. Participants at high risk of type 2 diabetes are referred to a 9-month lifestyle programme combining dietary advice, physical activity, and behaviour change. NHSE evaluation shows a 26% reduction in type 2 diabetes incidence in completers. New GLP-1 receptor agonist drugs (semaglutide), approved for weight management in 2023, offer an additional pharmacological route to prevention at scale — though NHS supply constraints limit current access."
            source="Source: NHS England — Diabetes Prevention Programme 2024; NICE — Semaglutide appraisal 2023; Diabetes UK statistics 2024."
          />
        </ScrollReveal>

        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The data on diabetes</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>Diabetes is one of the fastest-growing long-term conditions in the UK. The number of people diagnosed has risen from around 3.3 million in 2010 to 5.6 million in 2024.<Cite nums={1} /> Add in the estimated 1 million with undiagnosed type 2 diabetes and a further 13.6 million at high risk of developing it, and the scale of the challenge becomes clear.<Cite nums={1} /> Type 2 diabetes accounts for 91% of cases and is almost entirely preventable — it is driven by obesity, physical inactivity, and dietary patterns that are themselves shaped by socioeconomic conditions.<Cite nums={2} /></p>
              <p>The NHS spends around £10bn per year on diabetes — approximately 10% of its entire budget.<Cite nums={3} /> Around 80% of that cost falls on managing complications: kidney failure, cardiovascular disease, lower limb amputations, and retinopathy.<Cite nums={3} /> The UK has a higher rate of diabetes-related lower limb amputations than most comparable countries, reflecting both delayed diagnosis and inconsistent access to specialist foot care.<Cite nums={2} /> Diabetes also drives a substantial share of NHS kidney disease, dialysis, and stroke workload.</p>
              <p>Deprivation is a major factor. Type 2 diabetes prevalence is two to three times higher in the most deprived communities compared to the least deprived.<Cite nums={1} /> South Asian, Black African, and Black Caribbean populations face significantly higher risk at lower BMI thresholds than white European populations — a difference that is not consistently reflected in clinical guidance or screening thresholds.<Cite nums={2} /></p>
            </div>
          </section>
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p><a href="https://www.diabetes.org.uk/professionals/position-statements-reports/statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Diabetes UK — Statistics</a> — prevalence estimates by type. Annual. Retrieved 2024.</p>
            <p><a href="https://digital.nhs.uk/data-and-information/publications/statistical/national-diabetes-audit" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS Digital — National Diabetes Audit</a> — care processes and outcomes. Annual. Retrieved 2024.</p>
            <p><a href="https://www.england.nhs.uk/diabetes/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS England — Diabetes</a> — expenditure and prevention programme data. Annual. Retrieved 2024.</p>
            <p>Prevalence figures are for diagnosed diabetes in the UK. Undiagnosed diabetes is estimated separately. NHS cost figures include all NHS-attributed diabetes spending including complications. All figures are for the UK unless otherwise stated.</p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
