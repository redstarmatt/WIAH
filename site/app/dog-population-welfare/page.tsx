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
  { num: 1, name: 'PDSA', dataset: 'Animal Wellbeing (PAW) Report', url: 'https://www.pdsa.org.uk/what-we-do/pdsa-animal-wellbeing-report', date: '2024' },
  { num: 2, name: 'RSPCA', dataset: 'Animal Welfare Statistics and Rescue Data', url: 'https://www.rspca.org.uk/whatwedo/latest/statistics', date: '2024' },
  { num: 3, name: 'Dogs Trust', dataset: 'Stray Dogs Survey', url: 'https://www.dogstrust.org.uk/news-events/news/stray-dogs-survey', date: '2023' },
];

interface DataPoint {
  year: number;
  dogPopulation: number;
  abandonedDogs: number;
  vetsPerDog: number;
  dogBitesAdmissions: number;
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

export default function DogPopulationWelfarePage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/dog-population-welfare/dog_population_welfare.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'dogPopulation', label: 'Estimated UK dog population (millions)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.dogPopulation })) },
        { id: 'abandonedDogs', label: 'Dogs abandoned or surrendered to rescues (thousands/yr)', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.abandonedDogs })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'vetsPerDog', label: 'Registered vets per 1,000 dogs', colour: '#2A9D8F', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.vetsPerDog })) },
        { id: 'dogBitesAdmissions', label: 'Hospital admissions for dog bites (thousands/yr)', colour: '#F4A261', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.dogBitesAdmissions })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: 'Covid pandemic: dog ownership surge' },
    { date: new Date(2022, 5, 1), label: 'Post-pandemic dog abandonment spike' },
  ];

  return (
    <>
      <TopicNav topic="Society & Environment" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Society & Environment"
          question="Is the UK Dog Population Under Welfare Pressure?"
          finding={<>The UK dog population surged to around 13 million during Covid-19 lockdowns, and rescue charities are now facing unprecedented numbers of abandoned and surrendered animals as owners struggle with cost-of-living pressures and the reality of full-time pet ownership.<Cite nums={1} /> Hospital admissions for dog bites have risen 30% in a decade.<Cite nums={[2, 3]} /></>}
          colour="#6B7280"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The UK experienced a significant surge in dog ownership during 2020–21, with an estimated 3.2 million additional dogs acquired during lockdown as people sought companionship and exercise motivation. The total UK dog population reached around 13 million by 2022, up from approximately 9.9 million in 2019.<Cite nums={1} /> PDSA's annual Animal Wellbeing survey consistently finds significant welfare concerns: around a quarter of dogs are not walked daily, and many Covid-acquired dogs are inadequately socialised with other dogs and people, contributing to the rise in reported biting incidents.</p>
            <p>The post-pandemic correction has been significant. Dogs Trust reported a record number of stray and surrendered dogs — over 47,000 — in 2022–23, a 27% increase on 2019 levels, as people returned to offices, faced cost-of-living pressures, or found they had underestimated the demands of dog ownership.<Cite nums={3} /> Rescue charities report being at or near capacity, and concerns have been raised about the growth of illegal puppy imports and online sales of dogs from poor breeding conditions, which peaked during the pandemic when demand was high and supply constrained.<Cite nums={2} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-population', label: 'Population trends' },
          { id: 'sec-welfare', label: 'Welfare indicators' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="UK dog population" value="13" unit="million" direction="up" polarity="up-is-bad" changeText={<>Up from 9.9m in 2019 (Covid surge)<Cite nums={1} /></>} sparklineData={[9.0, 9.4, 9.7, 9.9, 10.2, 13.0, 13.3, 13.2, 13.0, 13.0, 13.0]} href="#sec-population" />
          <MetricCard label="Dogs abandoned/surrendered to rescues" value="47" unit="thousand/yr" direction="up" polarity="up-is-bad" changeText={<>Record high; up 27% on 2019<Cite nums={3} /></>} sparklineData={[35, 36, 37, 37, 38, 32, 38, 47, 45, 46, 47]} href="#sec-welfare" />
          <MetricCard label="Hospital admissions for dog bites" value="9.1" unit="thousand/yr" direction="up" polarity="up-is-bad" changeText={<>Up 30% in ten years<Cite nums={2} /></>} sparklineData={[7.0, 7.2, 7.5, 7.7, 8.0, 8.2, 8.5, 8.7, 9.0, 9.0, 9.1]} href="#sec-welfare" />
        </div>

        <ScrollReveal>
          <section id="sec-population" className="mb-12">
            <LineChart title="UK dog population and abandonment rates, 2015–2024" subtitle="Estimated dog population (millions) and annual rescue surrenders (thousands), UK." series={chart1Series} annotations={annotations} yLabel="Value" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-welfare" className="mb-12">
            <LineChart title="Veterinary capacity and dog bite incidents, 2015–2024" subtitle="Registered vets per 1,000 dogs and hospital admissions for dog bites (thousands/yr), UK." series={chart2Series} annotations={[]} yLabel="Value" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="Lucy's Law" value="2020" unit="enacted" description={<>Lucy's Law, which came into force in England in 2020, banned the third-party sale of puppies and kittens by pet shops and commercial dealers, requiring all purchases to be direct from breeders or rehoming centres — an important step toward reducing low-welfare puppy mills.<Cite nums={2} /></>} source="Source: RSPCA, Lucy's Law Impact Assessment, 2023." />
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
