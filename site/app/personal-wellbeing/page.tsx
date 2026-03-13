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
  { num: 1, name: 'ONS', dataset: 'Annual Population Survey — Personal Well-being Estimates', url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/wellbeing', date: '2024-25', note: 'Life satisfaction fell from 7.7/10 in 2019 to 7.4/10' },
  { num: 2, name: 'ONS', dataset: 'Well-being Inequalities by Local Authority', date: '2024', note: 'Deprivation gap in life satisfaction scores' },
];

interface DataPoint {
  year: number;
    lifeSatisfaction: number;
    anxietyMean: number;
    leastDeprived: number;
    mostDeprived: number;
}

interface TopicData {
  national: {
    timeSeries: DataPoint[];
  };
  metadata: {
    sources: { name: string; dataset: string; url: string; frequency: string }[];
    methodology: string;
    knownIssues: string[];
  };
}

export default function PersonalWellbeingPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/personal-wellbeing/personal_wellbeing.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const series1: Series[] = data ? [
    {
      id: 'lifeSatisfaction',
      label: "Life satisfaction (out of 10)",
      colour: "#2A9D8F",
      data: data.national.timeSeries.map(d => ({ date: new Date(d.year, 0, 1), value: d.lifeSatisfaction })),
    },
    {
      id: 'anxietyMean',
      label: "Average anxiety (out of 10)",
      colour: "#E63946",
      data: data.national.timeSeries.map(d => ({ date: new Date(d.year, 0, 1), value: d.anxietyMean })),
    },
  ] : [];

  const series2: Series[] = data ? [
    {
      id: 'leastDeprived',
      label: "Least deprived areas (life sat.)",
      colour: "#2A9D8F",
      data: data.national.timeSeries.map(d => ({ date: new Date(d.year, 0, 1), value: d.leastDeprived })),
    },
    {
      id: 'mostDeprived',
      label: "Most deprived areas (life sat.)",
      colour: "#E63946",
      data: data.national.timeSeries.map(d => ({ date: new Date(d.year, 0, 1), value: d.mostDeprived })),
    },
  ] : [];

  const annotations1: Annotation[] = [
    { date: new Date(2020, 0, 1), label: "2020: Pandemic wellbeing collapse" },
    { date: new Date(2022, 0, 1), label: "2022: Cost of living crisis deepens" },
  ];

  const annotations2: Annotation[] = [
    { date: new Date(2020, 0, 1), label: "2020: Pandemic equalises some metrics temporarily" },
  ];

  return (
    <>
      <TopicNav topic="Personal Wellbeing" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Wellbeing & Society"
          question="Is Britain's Wellbeing Improving?"
          finding="Average life satisfaction fell from 7.7/10 in 2019 to 7.4/10 in 2024-25; anxiety scores have risen across all age groups. Young adults and those in deprived areas report the worst outcomes."
          colour="#2A9D8F"
        />

        <section className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              Average life satisfaction fell from 7.7/10 in 2019 to 7.4/10 in 2024-25; anxiety scores have risen across all age groups.<Cite nums={1} /> Young adults and those in deprived areas report the worst outcomes.<Cite nums={2} /> The data below draws on official sources to show how this has changed over the past decade and where the pressures are most acute.
            </p>
            <p>
              The figures reflect a structural pattern rather than a short-term fluctuation. Understanding the scale of the issue is the first step toward holding policymakers to account for the decisions that shape these outcomes.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-chart1', label: "Life satisfaction" },
          { id: 'sec-chart2', label: "Least deprived areas" },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Average life satisfaction"
            value="7.4/10"
            unit=""
            direction="down"
            polarity="up-is-good"
            changeText="Down from 7.7 in 2019 \u00b7 not recovered post-pandemic"
            sparklineData={[7.65,7.68,7.7,7.67,7.72,7.48,7.46,7.51,7.43,7.4,7.4]}
            href="#sec-chart1"
          />
          <MetricCard
            label="High anxiety (score 6+/10)"
            value="24.1%"
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText="Up from 20.1% pre-pandemic \u00b7 young adults highest"
            sparklineData={[20.1,20.3,20.6,21.0,20.8,25.4,24.8,24.2,24.0,24.0,24.1]}
            href="#sec-chart2"
          />
          <MetricCard
            label="Activities felt worthwhile"
            value="68%"
            unit=""
            direction="down"
            polarity="up-is-good"
            changeText="Below pre-pandemic level of 71%"
            sparklineData={[71.0,71.5,71.3,71.1,71.2,69.1,69.4,68.8,68.2,68.0,68.0]}
            href="#sec-chart1"
          />
        </div>

        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="UK personal wellbeing scores, 2015\u20132025"
              subtitle="ONS Annual Population Survey mean scores out of 10. Life satisfaction (higher = better), anxiety (higher = worse). Scores from around 150,000 respondents each year."
              series={series1}
              annotations={annotations1}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Wellbeing gap by deprivation, England, 2015\u20132025"
              subtitle="Life satisfaction gap between most and least deprived areas. Those in the most deprived communities consistently report significantly lower wellbeing."
              series={series2}
              annotations={annotations2}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="Social prescribing reaching 1 million people"
            value="900,000+"
            unit="social prescribing referrals per year"
            description="NHS social prescribing \u2014 connecting people to community activities, arts, volunteering and peer support \u2014 is now embedded in almost all GP practices in England. Over 900,000 referrals are made annually. Evidence shows a 25% reduction in GP consultations among those referred, and significant improvements in wellbeing scores at 3-month follow-up."
            source="Source: NHS England \u2014 Social prescribing network annual census, 2025. NICE evidence review NG222."
          />
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            {data?.metadata.sources.map((src, i) => (
              <div key={i}>
                <a href={src.url} target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">
                  {src.name} — {src.dataset}
                </a>
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
              {data?.metadata.knownIssues.map((issue, i) => (
                <li key={i}>{issue}</li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
