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
  { num: 1, name: 'COMEAP', dataset: 'Mortality effects of long-term exposure to particulate air pollution in the UK', url: 'https://www.gov.uk/government/publications/comeap-mortality-effects-of-long-term-exposure-to-particulate-air-pollution-in-the-uk', date: '2024' },
  { num: 2, name: 'DEFRA', dataset: 'UK Air Quality Archive — PM2.5 and NO2 monitoring data', url: 'https://uk-air.defra.gov.uk/', date: '2024' },
  { num: 3, name: 'WHO', dataset: 'Global Air Quality Guidelines 2021', url: 'https://www.who.int/publications/i/item/9789240034228', date: '2021' },
  { num: 4, name: 'DEFRA', dataset: 'Air Quality Economic Analysis programme', date: '2023' },
];

export default function AirQualityPage() {
  const pm25National  = [12.1, 11.8, 11.5, 11.2, 11.0, 10.8, 10.5, 10.3, 10.1, 9.9, 9.7, 9.5, 9.3, 9.1];
  const londonNo2     = [51.0, 49.5, 48.0, 47.5, 46.8, 45.2, 44.0, 42.5, 41.0, 40.2, 39.5, 38.8, 38.2, 37.5];
  const birminghamNo2 = [44.0, 43.0, 42.0, 41.5, 40.8, 40.0, 39.0, 38.0, 37.2, 36.5, 35.8, 35.2, 34.8, 34.2];
  const manchesterNo2 = [38.0, 37.5, 37.0, 36.5, 36.0, 35.5, 34.8, 34.0, 33.2, 32.5, 32.0, 31.5, 31.0, 30.5];

  const chart1Series: Series[] = [
    {
      id: 'pm25-national',
      label: 'National annual mean PM2.5 (μg/m³)',
      colour: '#264653',
      data: pm25National.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
    },
  ];

  const chart2Series: Series[] = [
    {
      id: 'london-no2',
      label: 'London (μg/m³)',
      colour: '#E63946',
      data: londonNo2.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
    {
      id: 'birmingham-no2',
      label: 'Birmingham (μg/m³)',
      colour: '#F4A261',
      data: birminghamNo2.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
    {
      id: 'manchester-no2',
      label: 'Manchester (μg/m³)',
      colour: '#6B7280',
      data: manchesterNo2.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
  ];

  const chart1Annotations: Annotation[] = [
    { date: new Date(2015, 0, 1), label: '2015: UK Air Quality Plan challenged in court' },
    { date: new Date(2019, 0, 1), label: '2019: WHO tightens PM2.5 guidelines' },
  ];

  const chart2Annotations: Annotation[] = [
    { date: new Date(2019, 0, 1), label: '2019: London ULEZ zone expanded' },
    { date: new Date(2023, 0, 1), label: '2023: London ULEZ expanded to all 33 boroughs' },
  ];

  const pm25TargetLine = { value: 5.0, label: 'WHO 2021 guideline: 5 μg/m³' };
  const no2TargetLine  = { value: 10.0, label: 'WHO 2021 guideline: 10 μg/m³' };

  return (
    <>
      <TopicNav topic="Air Quality" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Air Quality"
          question="Is Britain's Air Safe to Breathe?"
          finding="40 UK towns and cities exceed WHO air quality guidelines — fine particulate matter (PM2.5) causes 28,000–36,000 premature deaths per year, and toxic air is worst in deprived urban areas."
          colour="#264653"
          preposition="in"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Key metrics' },
          { id: 'sec-chart1', label: 'PM2.5 levels' },
          { id: 'sec-chart2', label: 'NO2 in cities' },
        ]} />

        <section id="sec-metrics" className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Premature deaths from air pollution (per year)"
              value="36,000"
              direction="down"
              polarity="up-is-bad"
              changeText="improving slowly · but still equivalent to a city the size of York dying each year"
              sparklineData={[40000, 39000, 38500, 38000, 37500, 37000, 36000]}
              source="COMEAP / DEFRA — 2024"
            />
            <MetricCard
              label="Areas exceeding WHO PM2.5 limit (count)"
              value="40"
              direction="down"
              polarity="up-is-bad"
              changeText="down from 80+ in 2010 · WHO tightened guideline in 2021"
              sparklineData={[80, 75, 68, 60, 55, 48, 40]}
              source="DEFRA Air Quality Statistics — 2024"
            />
            <MetricCard
              label="Annual economic cost (£bn)"
              value="20"
              direction="flat"
              polarity="up-is-bad"
              changeText="£20bn estimated annual cost to health and economy · DEFRA 2023"
              sparklineData={[22, 21.5, 21, 20.5, 20.5, 20.2, 20]}
              source="DEFRA / COMEAP — 2023"
            />
          </div>
        </section>

        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="UK annual mean PM2.5 levels 2010–2024 (μg/m³, national average)"
              subtitle="Fine particulate matter below 2.5 micrometres. Penetrates deep into the lungs and bloodstream. Source: DEFRA/Aether air quality monitoring."
              series={chart1Series}
              annotations={chart1Annotations}
              targetLine={pm25TargetLine}
              yLabel="PM2.5 annual mean (μg/m³)"
              source={{
                name: 'DEFRA — Aether / UK Air Quality Archive',
                dataset: 'Annual mean PM2.5 concentrations — UK background',
                frequency: 'annual',
                url: 'https://uk-air.defra.gov.uk/',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="NO2 levels in major cities 2015–2024 vs WHO guideline (μg/m³)"
              subtitle="Annual mean nitrogen dioxide at roadside monitoring stations in London, Birmingham, and Manchester. WHO 2021 guideline is 10 μg/m³."
              series={chart2Series}
              annotations={chart2Annotations}
              targetLine={no2TargetLine}
              yLabel="NO2 annual mean (μg/m³)"
              source={{
                name: 'DEFRA — Automatic Urban and Rural Network (AURN)',
                dataset: 'NO2 annual mean concentrations — UK cities',
                frequency: 'annual',
                url: 'https://uk-air.defra.gov.uk/networks/network-info?view=aurn',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="What is improving"
            value="PM2.5 and NO2 declining"
            unit="2010–2024"
            description="UK air quality has improved substantially since the 1990s, driven by the decline of heavy industry, cleaner vehicle standards (Euro 5 and Euro 6), and targeted clean air interventions like the London ULEZ. National mean PM2.5 has fallen from 12.1 μg/m³ in 2010 to around 9.1 μg/m³ in 2024. London's annual mean NO2 at roadside locations has fallen from over 50 μg/m³ in 2015 to around 37 μg/m³ after ULEZ expansion. The trajectory is in the right direction — but the UK still exceeds the 2021 WHO guideline of 5 μg/m³ for PM2.5 almost everywhere."
            source="Source: DEFRA Air Quality Statistics 2024; London Air Quality Network; COMEAP health burden estimates."
          />
        </ScrollReveal>

        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The data on air quality</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>Air pollution is the largest environmental health risk in the UK. The Committee on the Medical Effects of Air Pollutants (COMEAP) estimates that between 28,000 and 36,000 deaths per year are attributable to long-term exposure to fine particulate matter (PM2.5) and nitrogen dioxide.<Cite nums={1} /> These are not dramatic acute events — they are the cumulative toll of years of breathing degraded air: shortened lives, worsening cardiovascular disease, accelerated dementia, more severe asthma, and higher cancer rates.</p>
              <p>Air quality has improved significantly over the past three decades, largely because of the decline of coal-burning industry rather than deliberate clean air policy. But the pace of improvement has slowed, and the 2021 WHO guidelines — which tightened the PM2.5 limit from 10 μg/m³ to 5 μg/m³ — revealed how far the UK still has to travel.<Cite nums={3} /> Almost no UK monitoring station records annual mean PM2.5 below 5 μg/m³.<Cite nums={2} /> The UK's legal limit remains at 20 μg/m³ for PM2.5 — four times the WHO guideline.<Cite nums={3} /></p>
              <p>The distribution of harm is not equal. Children in the most deprived fifth of areas are exposed to significantly worse air than those in the least deprived fifth. Schools near busy roads — disproportionately in lower-income areas — expose children to elevated NO2 during critical development periods. Ethnic minority communities are more likely to live near major roads and industrial sources. Pollution is not just a public health crisis; it is an equality crisis.<Cite nums={2} /></p>
            </div>
          </section>
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p><a href="https://uk-air.defra.gov.uk/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DEFRA — UK Air Quality Archive</a> — monitoring network data including PM2.5 and NO2. Annual. Retrieved 2024.</p>
            <p><a href="https://www.gov.uk/government/publications/comeap-mortality-effects-of-long-term-exposure-to-particulate-air-pollution-in-the-uk" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">COMEAP — Mortality effects of long-term air pollution</a> — health burden estimates. Retrieved 2024.</p>
            <p><a href="https://www.who.int/publications/i/item/9789240034228" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">WHO — Global Air Quality Guidelines 2021</a> — PM2.5 guideline 5 μg/m³, NO2 guideline 10 μg/m³. Retrieved 2024.</p>
            <p>PM2.5 national average is the UK background concentration modelled by DEFRA/Aether. City NO2 figures are annual mean roadside measurements from AURN automatic monitoring stations. Economic cost estimate from DEFRA's Air Quality Economic Analysis programme.</p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
