'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'NHS England', dataset: 'National Food Review — Hospital food standards', url: 'https://www.england.nhs.uk/eat-for-health/', date: '2024' },
  { num: 2, name: 'Care Quality Commission', dataset: 'NHS Patient Survey Programme — inpatient experience', url: 'https://www.cqc.org.uk/publications/surveys/adult-inpatient-survey', date: '2024' },
  { num: 3, name: 'BAPEN', dataset: 'Malnutrition prevalence in UK hospitals', url: 'https://www.bapen.org.uk/resources-and-education/publications-and-reports', date: '2024' },
];

interface DataPoint {
  year: number;
  patientSatisfactionFood: number;
  mealsServedPerPatient: number;
  malnutritionRiskOnAdmission: number;
  nutritionalScreeningRate: number;
}

interface TopicData {
  national: { timeSeries: DataPoint[] };
  metadata: {
    sources: { name: string; dataset: string; url: string; frequency: string }[];
    methodology: string;
    knownIssues: string[];
  };
}

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

export default function HospitalFoodQualityPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/hospital-food-quality/hospital_food_quality.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'patientSatisfactionFood', label: 'Patient satisfaction with food (%)', colour: '#2A9D8F', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.patientSatisfactionFood })) },
        { id: 'nutritionalScreeningRate', label: 'Nutritional screening on admission (%)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.nutritionalScreeningRate })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'malnutritionRiskOnAdmission', label: 'Malnutrition risk on admission (%)', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.malnutritionRiskOnAdmission })) },
        { id: 'mealsServedPerPatient', label: 'Meals served per patient day', colour: '#6B7280', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.mealsServedPerPatient })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: 'National Food Review published' },
    { date: new Date(2022, 5, 1), label: 'New Hospital Food Standards enforced' },
  ];

  return (
    <>
      <TopicNav topic="Health" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Health"
          question="Is Hospital Food Meeting Nutritional Standards?"
          finding={<>Only 59% of NHS inpatients rate hospital food as good, and around 30% of patients admitted to hospital are at risk of malnutrition — yet nutritional screening on admission is still not universal.<Cite nums={1} /> Hospital food costs have risen but quality complaints persist.<Cite nums={[2, 3]} /></>}
          colour="#E63946"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Hospital food has been the subject of repeated government reviews and patient surveys stretching back decades. The 2020 National Food Review, triggered partly by a campaign involving chef Prue Leith, set out clear standards for what NHS hospitals should provide: nutritionally adequate meals at appropriate times, protected mealtimes, and support for patients who need help eating. Mandatory nutritional screening on admission — using the MUST screening tool — is a clinical standard, but compliance is inconsistent across trusts.<Cite nums={1} /></p>
            <p>Malnutrition in hospital is both a cause and consequence of poor outcomes: patients who arrive malnourished recover more slowly, are more susceptible to infection, and stay longer. The NHS spends an estimated £7.3 billion per year on disease-related malnutrition — a figure that includes community and care home settings as well as hospitals. Despite this, food budgets per patient per day in many trusts remain below £10, and kitchen facilities in older buildings make fresh preparation difficult.<Cite nums={[2, 3]} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-chart1', label: 'Satisfaction and screening' },
          { id: 'sec-chart2', label: 'Malnutrition' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="Patient food satisfaction" value="59" unit="%" direction="flat" polarity="up-is-good" changeText={<>Stubbornly below 65% target<Cite nums={2} /></>} sparklineData={[56, 57, 58, 58, 59, 60, 59, 58, 59, 59, 59]} href="#sec-chart1" />
          <MetricCard label="Nutritional screening rate" value="78" unit="%" direction="up" polarity="up-is-good" changeText={<>Up from 67% in 2018<Cite nums={1} /></>} sparklineData={[67, 69, 71, 72, 74, 75, 76, 77, 78, 78, 78]} href="#sec-chart1" />
          <MetricCard label="Patients at malnutrition risk" value="30" unit="%" direction="flat" polarity="up-is-bad" changeText={<>Unchanged for a decade<Cite nums={3} /></>} sparklineData={[30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30]} href="#sec-chart2" />
        </div>

        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart title="Patient food satisfaction and nutritional screening, 2015–2024" subtitle="Inpatient satisfaction with food quality (%) and admission screening rate (%)" series={chart1Series} annotations={annotations} yLabel="%" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart title="Malnutrition risk on admission and meals served, 2015–2024" subtitle="Percentage of admissions screened as at malnutrition risk and meals per patient day" series={chart2Series} annotations={[]} yLabel="% / meals" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="Protected mealtimes" value="85%" unit="of trusts" description={<>85% of NHS trusts now operate protected mealtime policies — pausing ward rounds and non-urgent clinical activities to allow patients to eat undisturbed — up from 65% in 2015.<Cite nums={1} /></>} source="Source: NHS England, National Food Review implementation." />
        </ScrollReveal>

        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            {data?.metadata.sources.map((src, i) => (
              <div key={i}>
                <a href={src.url} target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">{src.name} — {src.dataset}</a>
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
              {data?.metadata.knownIssues.map((issue, i) => <li key={i}>{issue}</li>)}
            </ul>
          </div>
        </section>
        <References items={editorialRefs} />
      </main>
    </>
  );
}
