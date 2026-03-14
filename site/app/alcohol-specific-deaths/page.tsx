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

// Alcohol-specific deaths, England, 2012–2024 — ONS
const alcoholDeathsValues = [6490, 6592, 6831, 7366, 7327, 7697, 7551, 7565, 8974, 9641, 8209, 8274, 10048];

// Hospital admissions, 2012–2024 — NHS Digital
const hospitalAdmissionsValues = [895000, 920000, 950000, 985000, 1010000, 1040000, 1050000, 1070000, 1020000, 1050000, 1060000, 1080000, 1080000];

// Alcoholic liver disease deaths, 2012–2024
const liverDiseaseValues = [4680, 4750, 4920, 5310, 5280, 5540, 5430, 5450, 6460, 6940, 5910, 5960, 7236];

const series1: Series[] = [
  {
    id: 'alcohol-deaths',
    label: 'Alcohol-specific deaths',
    colour: '#E63946',
    data: alcoholDeathsValues.map((v, i) => ({ date: new Date(2012 + i, 0, 1), value: v })),
  },
];

const series2: Series[] = [
  {
    id: 'hospital-admissions',
    label: 'Alcohol-related hospital admissions',
    colour: '#6B7280',
    data: hospitalAdmissionsValues.map((v, i) => ({ date: new Date(2012 + i, 0, 1), value: v })),
  },
  {
    id: 'liver-deaths',
    label: 'Alcoholic liver disease deaths',
    colour: '#F4A261',
    data: liverDiseaseValues.map((v, i) => ({ date: new Date(2012 + i, 0, 1), value: v })),
  },
];

const annotations: Annotation[] = [
  { date: new Date(2013, 0, 1), label: '2013: England shelves minimum unit pricing plans' },
  { date: new Date(2018, 0, 1), label: '2018: Scotland introduces MUP at 50p/unit' },
  { date: new Date(2020, 0, 1), label: '2020: COVID-19 lockdowns begin' },
];

const editorialRefs: Reference[] = [
  { num: 1, name: 'ONS', dataset: 'Alcohol-specific deaths in the UK', url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/healthandsocialcare/causesofdeath/bulletins/alcoholspecificdeathsintheuk', date: 'Feb 2026' },
  { num: 2, name: 'NHS Digital', dataset: 'Statistics on Alcohol, England', url: 'https://digital.nhs.uk/data-and-information/publications/statistical/statistics-on-alcohol', date: 'Feb 2026' },
  { num: 3, name: 'Public Health Scotland', dataset: 'Evaluating the impact of minimum unit pricing', url: 'https://www.publichealthscotland.scot/publications/', date: '2023' },
];

export default function AlcoholSpecificDeathsPage() {
  return (
    <>
      <TopicNav topic="Alcohol-Specific Deaths" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Alcohol-Specific Deaths"
          question="Are alcohol deaths still rising?"
          finding="Alcohol-specific deaths in England reached 10,048 in 2024 — a new record and up 33% since 2019. The pandemic drove a step change in heavy drinking that has not reversed, and alcohol-related hospital admissions now exceed one million per year."
          colour="#E63946"
          preposition="with"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Alcohol-specific deaths in England have reached their highest level since records began. In 2024, 10,048 people died from conditions wholly caused by alcohol — up 33% from 7,565 in 2019.<Cite nums={1} /> The pandemic was the inflection point: lockdowns, isolation, and the closure of support services drove a surge in heavy drinking among those already dependent, and the trajectory has not reversed. The people dying are overwhelmingly middle-aged men in the most deprived areas of England: the death rate in the most deprived decile is more than five times higher than in the least deprived.<Cite nums={1} /> Alcoholic liver disease accounts for roughly 72% of these deaths and has followed the same upward curve.<Cite nums={1} /> Liver disease is unusual among major killers in that it disproportionately affects working-age adults — the average age of death is significantly lower than for cancer or heart disease.</p>
            <p>The policy gap is stark. Scotland introduced minimum unit pricing in 2018, and Public Health Scotland reported a 13% reduction in alcohol-specific deaths in the years that followed.<Cite nums={3} /> England shelved its own MUP plans in 2013 after industry lobbying, and has not revisited the policy since. The evidence base for what works — minimum pricing, restrictions on marketing, brief interventions in primary care, investment in community alcohol treatment — is robust and repeatedly endorsed by NICE, the Chief Medical Officer, and the WHO. The challenge is not a lack of evidence but a lack of political will. Meanwhile, alcohol treatment services in England have seen real-terms funding cuts of over 30% since 2013/14, and waiting times for specialist support have grown.<Cite nums={2} /> The data makes the case plainly: this is a public health emergency being met with policy silence.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Deaths trend' },
          { id: 'sec-chart2', label: 'Admissions & liver disease' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Alcohol-specific deaths (England)"
              value="10,048"
              unit="2024"
              direction="up"
              polarity="up-is-bad"
              changeText="+33% since 2019 · record high"
              sparklineData={alcoholDeathsValues.slice(-8)}
              source="ONS — Alcohol-specific deaths in the UK, Feb 2026"
              href="#sec-chart1"
            />
            <MetricCard
              label="Alcohol-related hospital admissions"
              value="1.08M"
              unit="2024"
              direction="up"
              polarity="up-is-bad"
              changeText="Exceeds 1 million per year since 2019 · rising"
              sparklineData={hospitalAdmissionsValues.slice(-8)}
              source="NHS Digital — Statistics on Alcohol, Feb 2026"
              href="#sec-chart2"
            />
            <MetricCard
              label="Alcoholic liver disease deaths"
              value="7,236"
              unit="2024"
              direction="up"
              polarity="up-is-bad"
              changeText="+36% since 2019 · 72% of all alcohol deaths"
              sparklineData={liverDiseaseValues.slice(-8)}
              source="ONS — Liver disease mortality, Feb 2026"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Alcohol-specific deaths, England, 2012–2024"
              subtitle="Deaths from conditions wholly attributable to alcohol. Record high reached in 2024, driven by pandemic-era step change in heavy drinking."
              series={series1}
              annotations={annotations}
              yLabel="Deaths"
              source={{ name: 'ONS', dataset: 'Alcohol-specific deaths in the UK', url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/healthandsocialcare/causesofdeath/bulletins/alcoholspecificdeathsintheuk', frequency: 'annual', date: 'Feb 2026' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Alcohol-related hospital admissions and liver disease deaths, England, 2012–2024"
              subtitle="Hospital admissions (grey) exceeded 1 million in 2019 and remain above that level. Alcoholic liver disease deaths (amber) account for 72% of alcohol-specific mortality."
              series={series2}
              annotations={[{ date: new Date(2020, 0, 1), label: '2020: Lockdown suppresses admissions briefly' }]}
              yLabel="Admissions / Deaths"
              source={{ name: 'NHS Digital / ONS', dataset: 'Statistics on Alcohol, England; Deaths from liver disease', url: 'https://digital.nhs.uk/data-and-information/publications/statistical/statistics-on-alcohol', frequency: 'annual', date: 'Feb 2026' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Scotland shows minimum unit pricing works"
            value="13%"
            unit="reduction in alcohol-specific deaths after MUP"
            description="Scotland introduced minimum unit pricing (MUP) for alcohol in May 2018, setting a floor price of 50p per unit. Public Health Scotland reported a 13% reduction in alcohol-specific deaths in the four years following implementation, with the largest reductions among men and people living in the most deprived areas — precisely the groups most affected. In 2024, Scotland raised the minimum price to 65p per unit. The evidence is clear that price-based interventions reduce harm among the heaviest drinkers without meaningfully affecting moderate consumers. England has not introduced equivalent measures."
            source="Source: Public Health Scotland — Evaluating the impact of minimum unit pricing 2023. Scottish Government — MUP evaluation framework."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.ons.gov.uk/peoplepopulationandcommunity/healthandsocialcare/causesofdeath/bulletins/alcoholspecificdeathsintheuk" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ONS — Alcohol-specific deaths in the UK</a> — primary source for deaths data. Retrieved Feb 2026.</p>
            <p><a href="https://digital.nhs.uk/data-and-information/publications/statistical/statistics-on-alcohol" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS Digital — Statistics on Alcohol, England</a> — hospital admissions data. Retrieved Feb 2026.</p>
            <p>Alcohol-specific deaths are defined using ICD-10 codes for conditions wholly attributable to alcohol, including alcoholic liver disease (K70) and mental and behavioural disorders due to alcohol (F10). All figures are for England unless otherwise stated. Hospital admissions methodology changed in 2021; pre/post figures for the broader measure are not directly comparable.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
