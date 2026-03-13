'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import PositiveCallout from '@/components/PositiveCallout';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

// Place of death (%), 2010–2022 — ONS
const hospitalDeathValues = [53, 52, 51, 51, 50, 49, 48, 47, 47, 46, 45, 46, 46];
const homeDeathValues = [20, 21, 22, 22, 23, 24, 24, 25, 26, 27, 29, 28, 28];
const careHomeDeathValues = [18, 18, 18, 19, 19, 19, 20, 20, 20, 20, 19, 20, 20];
const hospiceDeathValues = [5, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6];

const placeOfDeathSeries: Series[] = [
  {
    id: 'hospital',
    label: 'Hospital deaths (%)',
    colour: '#E63946',
    data: hospitalDeathValues.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
  },
  {
    id: 'home',
    label: 'Home deaths (%)',
    colour: '#2A9D8F',
    data: homeDeathValues.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
  },
];

const careSettingsSeries: Series[] = [
  {
    id: 'care-home',
    label: 'Care home deaths (%)',
    colour: '#F4A261',
    data: careHomeDeathValues.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
  },
  {
    id: 'hospice',
    label: 'Hospice deaths (%)',
    colour: '#264653',
    data: hospiceDeathValues.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
  },
];

const placeAnnotations: Annotation[] = [
  { date: new Date(2020, 0, 1), label: '2020: COVID-19 — hospital deaths spike' },
];

export default function EndOfLifePage() {
  return (
    <>
      <TopicNav topic="End of Life Care" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="End of Life Care"
          question="Are People Dying Where They Want to Die?"
          finding="Hospital deaths have fallen from 53% in 2010 to 46% in 2022, as more people die at home. But hospices receive only 34% of their costs from the NHS — forcing heavy reliance on charity fundraising to maintain capacity."
          colour="#264653"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The proportion of people dying in hospital has fallen steadily over the past decade, from 53% in 2010 to around 46% in 2022, as policy and preference have aligned around enabling more people to die at home or in community settings. Home deaths rose from 20% to 28% over the same period — the largest shift. This reflects both the expansion of community palliative care and the impact of the COVID pandemic, which accelerated movement away from hospitals in 2020. Surveys consistently show that around 70% of people would prefer to die at home or in a hospice, yet only around 34% do so. The gap between preference and reality reflects inadequate 24-hour community care, lack of carer support, and the crisis-driven default to hospital admission.</p>
            <p>Hospices are the primary providers of specialist palliative care for the most complex cases, yet they receive only around 34% of their costs from NHS funding — a proportion that has not increased in over a decade despite rising demand and inflation. The remaining two-thirds is raised through charity: shops, legacies, and public fundraising. This creates a structurally fragile system where the quality of end-of-life care varies significantly by geography — postcode-dependent on the fundraising strength of local hospices. The Marie Curie annual report estimates that 100,000 people die each year without access to the palliative care they need. An ageing population will place further pressure on an already stretched system.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Place of death' },
          { id: 'sec-chart2', label: 'Care settings' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Hospital deaths"
              value="46%"
              unit=""
              direction="down"
              polarity="down-is-bad"
              changeText="Down from 53% in 2010 · still 25pp above stated preference"
              sparklineData={[53, 52, 51, 50, 49, 48, 47, 47, 46, 46]}
              source="ONS · Deaths registered by place of death 2022"
              href="#sec-chart1"
            />
            <MetricCard
              label="Home deaths"
              value="28%"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="Up from 20% in 2010 · 70% of people prefer to die at home"
              sparklineData={[20, 21, 22, 23, 24, 25, 26, 27, 29, 28]}
              source="ONS · Deaths registered by place of death 2022"
              href="#sec-chart1"
            />
            <MetricCard
              label="Hospice NHS funding share"
              value="34%"
              unit=""
              direction="flat"
              polarity="up-is-good"
              changeText="Unchanged for a decade · two-thirds relies on charity"
              sparklineData={[34, 34, 33, 33, 33, 34, 34, 34, 34, 34]}
              source="Hospice UK · State of UK Hospice Services 2023"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Place of death: hospital vs home, England and Wales, 2010–2022"
              subtitle="Percentage of registered deaths occurring in hospital and at home. Hospital share declining; home deaths rising."
              series={placeOfDeathSeries}
              annotations={placeAnnotations}
              yLabel="% of all deaths"
              source={{ name: 'ONS', dataset: 'Deaths registered by place of death', url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/birthsdeathsandmarriages/deaths/datasets/deathsregisteredbyareaofusualresidenceenglandandwales', frequency: 'annual', date: '2022' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Care home and hospice deaths, England and Wales, 2010–2022"
              subtitle="Percentage of deaths in care homes and hospices. Both stable at around 20% and 6% respectively."
              series={careSettingsSeries}
              annotations={[]}
              yLabel="% of all deaths"
              source={{ name: 'ONS', dataset: 'Deaths registered by place of death', url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/birthsdeathsandmarriages/deaths/datasets/deathsregisteredbyareaofusualresidenceenglandandwales', frequency: 'annual', date: '2022' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Palliative care at home reduces hospital admissions by 30%"
            value="30%"
            description="Robust evidence from NHS-commissioned evaluations shows that well-resourced community palliative care — including 24-hour nursing, rapid response teams, and carer support — reduces emergency hospital admissions in the last year of life by around 30%. Hospice at Home services, which now operate in 80% of England, can support the majority of people who wish to die at home to do so. Marie Curie's evidence review estimates that investment of £200 million per year in community palliative care could enable 50,000 additional people to die in their preferred setting each year."
            source="Source: Hospice UK — State of UK Hospice Services 2023. Marie Curie — The Palliative Care Funding Review 2023."
          />
        </ScrollReveal>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.ons.gov.uk/peoplepopulationandcommunity/birthsdeathsandmarriages/deaths/datasets/deathsregisteredbyareaofusualresidenceenglandandwales" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ONS — Deaths registered by place of death</a> — annual data on location of death by type (hospital, home, care home, hospice, other).</p>
            <p><a href="https://www.hospiceuk.org/our-campaigns/state-of-hospice-services" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Hospice UK — State of UK Hospice Services</a> — annual report on hospice capacity, funding, and workforce.</p>
            <p><a href="https://www.mariecurie.org.uk/policy/publications" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Marie Curie — Palliative Care Research and Policy</a> — analysis of end-of-life care gaps and funding requirements.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
