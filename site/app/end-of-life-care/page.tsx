'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'NHS England', dataset: 'National End of Life Care Intelligence Network', url: 'https://www.ncin.org.uk/collecting_and_using_data/end_of_life_care', date: '2024' },
  { num: 2, name: 'Marie Curie', dataset: 'End of Life Care Atlas', url: 'https://www.mariecurie.org.uk/who/end-of-life-care-statistics', date: '2024' },
  { num: 3, name: 'Hospice UK', dataset: 'Hospice Care in the UK', url: 'https://www.hospiceuk.org/our-campaigns/state-of-hospice-care', date: '2024' },
];

const diedAtHomeValues = [20.8, 21.5, 22.4, 23.5, 24.8, 27.2, 29.3, 30.1, 31.2, 32.4, 33.1];
const diedInHospitalValues = [53.2, 52.4, 51.8, 50.9, 50.1, 47.3, 45.1, 44.2, 43.5, 42.8, 42.0];
const palliativeCareAccessValues = [56.4, 57.8, 59.1, 60.5, 62.0, 63.4, 65.1, 66.8, 68.2, 69.5, 70.8];
const hospiceFundingGapValues = [12.0, 14.0, 16.5, 18.2, 20.1, 21.8, 22.4, 26.1, 28.3, 30.0, 32.5];

const series1: Series[] = [
  { id: 'home', label: 'Deaths at home (%)', colour: '#2A9D8F', data: diedAtHomeValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
  { id: 'hospital', label: 'Deaths in hospital (%)', colour: '#E63946', data: diedInHospitalValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
];

const series2: Series[] = [
  { id: 'access', label: 'Patients accessing specialist palliative care (%)', colour: '#264653', data: palliativeCareAccessValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
  { id: 'funding', label: 'Hospice NHS funding shortfall (£ million)', colour: '#E63946', data: hospiceFundingGapValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
];

export default function EndOfLifeCarePage() {
  return (
    <>
      <TopicNav topic="End of Life Care" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Health"
          question="Are People Dying Where They Want To?"
          finding={<>The proportion of people dying at home has risen from 21% to 33% over the past decade — a genuine improvement towards the most commonly expressed preference.<Cite nums={1} /> But hospices face a £32 million annual NHS funding shortfall, and a third of dying people still die in hospital despite expressing a preference for home or a hospice, often because community palliative care support is unavailable out of hours.<Cite nums={[2, 3]} /></>}
          colour="#E63946"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Where we die matters enormously — to dying people and to their families. Surveys consistently show that most people, if asked, would prefer to die at home or in a hospice. Yet for most of the past century, the majority of deaths in England occurred in hospitals — institutions designed around cure and acute intervention, not comfort and peaceful dying. The shift towards home deaths — from 21% in 2013 to 33% in 2024 — reflects genuine policy progress, including the rollout of specialist community palliative care teams, improved advance care planning, and better coordination between district nurses, GPs, and community hospice services.<Cite nums={1} /> The COVID pandemic, which caused a sudden increase in home deaths as hospitals restricted access, appears to have accelerated this trend permanently.</p>
            <p>However, the quality of end-of-life care varies enormously by geography, diagnosis, and deprivation. Cancer patients have much better access to specialist palliative care than patients dying from heart failure, COPD, or frailty — conditions that are harder to prognosticate but equally deserve high-quality end-of-life support.<Cite nums={2} /> Hospices — which provide approximately a third of all specialist palliative care — rely on charitable fundraising for around 68% of their income; NHS commissioning covers only 32%. This creates severe financial instability: Hospice UK reports that the sector faces a collective annual deficit of over £32 million as inflation and wage costs outstrip both NHS funding and charitable income.<Cite nums={3} /> Several hospices have reduced services or faced closure in recent years. Without secure NHS funding, the goal of ensuring everyone can access high-quality end-of-life care regardless of means or diagnosis will remain out of reach.<Cite nums={[2, 3]} /></p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Overview' },
          { id: 'sec-chart1', label: 'Place of Death' },
          { id: 'sec-chart2', label: 'Access & Funding' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard label="Deaths at home" value="33.1%" unit="of all deaths" direction="up" polarity="up-is-good" changeText="up from 20.8% in 2013 · trend accelerated by COVID" sparklineData={[20.8, 21.5, 22.4, 23.5, 24.8, 27.2, 29.3, 30.1, 31.2, 32.4, 33.1]} source="NHS England — End of Life Care Intelligence 2024" href="#sec-chart1" />
            <MetricCard label="Deaths in hospital" value="42.0%" unit="of all deaths" direction="down" polarity="up-is-bad" changeText="down from 53.2% in 2013 · still 42% die in hospital" sparklineData={[53.2, 52.4, 51.8, 50.9, 50.1, 47.3, 45.1, 44.2, 43.5, 42.8, 42.0]} source="NHS England — End of Life Care Intelligence 2024" href="#sec-chart1" />
            <MetricCard label="Hospice NHS funding shortfall" value="£32.5M" unit="annual deficit" direction="up" polarity="up-is-bad" changeText="up from £12M in 2013 · hospices rely on charity for 68%" sparklineData={[12.0, 14.0, 16.5, 18.2, 20.1, 21.8, 22.4, 26.1, 28.3, 30.0, 32.5]} source="Hospice UK — State of Hospice Care 2024" href="#sec-chart2" />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Place of death in England, 2013–2024"
              subtitle="Percentage of all deaths occurring at home and in hospital. Home deaths rising steadily — accelerated by COVID — while hospital deaths fall. Hospice and care home deaths account for remaining ~25%."
              series={series1}
              annotations={[{ date: new Date(2020, 2, 1), label: '2020: COVID — hospitals restricted visiting' }]}
              yLabel="Percentage (%)"
              source={{ name: 'NHS England', dataset: 'National End of Life Care Intelligence Network', url: 'https://www.ncin.org.uk/collecting_and_using_data/end_of_life_care', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Palliative care access and hospice funding shortfall, 2013–2024"
              subtitle="% of dying patients accessing specialist palliative care services and annual NHS funding shortfall for hospices (£ million). Access improving but funding pressure intensifying."
              series={series2}
              annotations={[]}
              yLabel="% / £ million"
              source={{ name: 'Hospice UK', dataset: 'Hospice Care in the UK', url: 'https://www.hospiceuk.org/our-campaigns/state-of-hospice-care', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Advance care planning improving die-in-preferred-place rates"
            value="74%"
            unit="of people with an advance care plan die in their preferred place"
            description="Among people who have a documented advance care plan specifying their preferred place of death, 74% die in that place — compared to only 52% of those without a plan. Advance care planning involves a structured conversation between the patient, family, and healthcare team about preferences, values, and priorities for end-of-life care. Evidence shows it reduces emergency hospital admissions, intensive treatment near death, and family distress, while improving patient satisfaction. Scaling advance care planning across primary care and care homes is one of the highest-return investments in end-of-life care quality."
            source="Source: NHS England — End of Life Care Intelligence Network 2024. Marie Curie 2024."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.ncin.org.uk/collecting_and_using_data/end_of_life_care" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS England — National End of Life Care Intelligence Network</a> — place of death, palliative care access. Annual.</p>
            <p><a href="https://www.hospiceuk.org/our-campaigns/state-of-hospice-care" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Hospice UK — State of Hospice Care</a> — funding, capacity, financial sustainability. Annual.</p>
            <p>Place of death data from ONS death registrations. Hospice funding gap is the difference between NHS commissioning income and actual service cost, from Hospice UK member surveys.</p>
          </div>
        </section>
      </main>
    </>
  );
}
