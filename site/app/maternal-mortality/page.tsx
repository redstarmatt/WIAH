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

// Maternal mortality rate per 100,000 maternities, UK, 2010–2023 — MBRRACE-UK
const maternalRateValues = [11.4, 10.1, 10.6, 9.0, 8.5, 9.7, 9.8, 9.2, 10.8, 10.9, 10.3, 9.7, 10.2, 10.0];

// Mortality rate by ethnicity per 100,000, 2016–2023 — MBRRACE-UK
const blackWomenValues = [38.6, 37.2, 34.2, 33.8, 34.0, 31.5, 29.8, 28.7];
const whiteWomenValues = [8.2, 8.1, 8.5, 8.8, 8.4, 8.0, 8.2, 7.8];
const asianWomenValues = [14.8, 14.2, 13.5, 14.0, 15.2, 14.1, 13.8, 12.9];

// Stillbirth rate per 1,000 total births, 2010–2023
const stillbirthValues = [5.2, 5.0, 4.9, 4.7, 4.6, 4.5, 4.4, 4.2, 4.0, 3.9, 3.8, 3.5, 3.4, 3.4];

const series1: Series[] = [
  {
    id: 'maternal-rate',
    label: 'Maternal deaths per 100,000 maternities',
    colour: '#E63946',
    data: maternalRateValues.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
  },
];

const series2: Series[] = [
  {
    id: 'black-women',
    label: 'Black women',
    colour: '#E63946',
    data: blackWomenValues.map((v, i) => ({ date: new Date(2016 + i, 0, 1), value: v })),
  },
  {
    id: 'asian-women',
    label: 'Asian women',
    colour: '#F4A261',
    data: asianWomenValues.map((v, i) => ({ date: new Date(2016 + i, 0, 1), value: v })),
  },
  {
    id: 'white-women',
    label: 'White women',
    colour: '#6B7280',
    data: whiteWomenValues.map((v, i) => ({ date: new Date(2016 + i, 0, 1), value: v })),
  },
];

const annotations: Annotation[] = [
  { date: new Date(2016, 0, 1), label: '2016: National Maternity Safety Strategy launched' },
  { date: new Date(2020, 0, 1), label: '2020: COVID-19 disrupts maternity services' },
];

const editorialRefs: Reference[] = [
  { num: 1, name: 'MBRRACE-UK', dataset: 'Saving Lives, Improving Mothers\' Care', url: 'https://www.npeu.ox.ac.uk/mbrrace-uk/reports', date: '2023' },
  { num: 2, name: 'NHS England', dataset: 'Maternity Services Monthly Statistics', url: 'https://digital.nhs.uk/data-and-information/publications/statistical/maternity-services-monthly-statistics', date: '2024' },
  { num: 3, name: 'MBRRACE-UK', dataset: 'Perinatal Mortality Surveillance Report', url: 'https://www.npeu.ox.ac.uk/mbrrace-uk/reports', date: '2023' },
];

export default function MaternalMortalityPage() {
  return (
    <>
      <TopicNav topic="Maternal Mortality" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Maternal Mortality"
          question="How Safe Is It to Give Birth in Britain?"
          finding="Around 10 women per 100,000 maternities die during or shortly after pregnancy in the UK. Black women are 3.7 times more likely to die than white women — a disparity that has persisted for over a decade."
          colour="#E63946"
          preposition="with"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The UK maternal mortality rate has remained stubbornly around 10 per 100,000 maternities for over a decade, having failed to achieve sustained improvement despite the 2016 National Maternity Safety Strategy.<Cite nums={1} /> While this rate is comparable to other high-income nations, it masks profound inequalities. MBRRACE-UK's confidential enquiry reports consistently show that Black women face a maternal death rate of 28.7 per 100,000 — 3.7 times that of white women at 7.8 per 100,000.<Cite nums={1} /> Asian women face a rate 1.7 times higher than white women. These disparities are not fully explained by clinical factors; systemic issues including implicit bias, language barriers, socioeconomic deprivation, and later booking into antenatal care all contribute.<Cite nums={1} /></p>
            <p>Maternity services across England are under severe strain. Midwife vacancy rates stood at 2,500 full-time equivalents in 2024, and the Royal College of Midwives reports that one in three midwives plans to leave the profession within five years.<Cite nums={2} /> Continuity of carer — the model shown to improve outcomes, particularly for women from disadvantaged backgrounds — was rolled back in 2022 due to staffing shortages. The Ockenden and East Kent reviews exposed catastrophic failures in specific trusts, but the systemic workforce crisis is national. Stillbirth rates have improved, falling from 5.2 per 1,000 in 2010 to 3.4 per 1,000 in 2023, partly due to the Saving Babies' Lives care bundle, though progress has slowed since 2020.<Cite nums={3} /></p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Mortality trend' },
          { id: 'sec-chart2', label: 'Ethnic disparity' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Maternal death rate (UK)"
              value="10.0"
              unit="per 100k · 2023"
              direction="flat"
              polarity="up-is-bad"
              changeText="largely unchanged since 2010 · no sustained improvement"
              sparklineData={maternalRateValues.slice(-8)}
              source="MBRRACE-UK — Saving Lives, Improving Mothers' Care 2023"
              href="#sec-chart1"
            />
            <MetricCard
              label="Black maternal death disparity"
              value="3.7x"
              unit="vs white women · 2023"
              direction="up"
              polarity="up-is-bad"
              changeText="28.7 vs 7.8 per 100k · persistent decade-long gap"
              sparklineData={blackWomenValues.slice(-8)}
              source="MBRRACE-UK — Saving Lives, Improving Mothers' Care 2023"
              href="#sec-chart2"
            />
            <MetricCard
              label="Stillbirth rate (UK)"
              value="3.4"
              unit="per 1,000 · 2023"
              direction="down"
              polarity="up-is-bad"
              changeText="down from 5.2 in 2010 · progress has slowed since 2020"
              sparklineData={stillbirthValues.slice(-8)}
              source="MBRRACE-UK — Perinatal Mortality Surveillance 2023"
              href="#sec-chart1"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Maternal mortality rate, UK, 2010–2023"
              subtitle="Deaths per 100,000 maternities during pregnancy or within 42 days of the end of pregnancy. Includes direct and indirect causes."
              series={series1}
              annotations={annotations}
              yLabel="Deaths per 100,000"
              source={{ name: 'MBRRACE-UK', dataset: 'Saving Lives, Improving Mothers\' Care', url: 'https://www.npeu.ox.ac.uk/mbrrace-uk/reports', frequency: 'annual', date: 'Nov 2023' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Maternal mortality rate by ethnicity, UK, 2016–2023"
              subtitle="Black women (red) face a maternal death rate 3.7x that of white women (grey). Asian women (amber) face a rate 1.7x higher. The gap is narrowing slowly but remains stark."
              series={series2}
              annotations={[{ date: new Date(2020, 0, 1), label: '2020: Pandemic disrupts maternity care' }]}
              yLabel="Deaths per 100,000"
              source={{ name: 'MBRRACE-UK', dataset: 'Saving Lives, Improving Mothers\' Care — Ethnic Disparities', url: 'https://www.npeu.ox.ac.uk/mbrrace-uk/reports', frequency: 'annual', date: 'Nov 2023' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Stillbirth rates: sustained progress through the Saving Babies' Lives care bundle"
            value="35%"
            unit="reduction in stillbirths since 2010"
            description="The stillbirth rate in the UK has fallen from 5.2 per 1,000 total births in 2010 to 3.4 in 2023, a reduction of approximately 35%. This improvement is largely attributed to the Saving Babies' Lives care bundle, introduced by NHS England in 2016, which standardised approaches to reduced fetal movement monitoring, fetal growth surveillance, and smoking cessation in pregnancy. While the rate of improvement has slowed since 2020, the UK has made more progress on stillbirth reduction than most comparable nations over this period."
            source="Source: MBRRACE-UK — Perinatal Mortality Surveillance Report 2023. NHS England — Saving Babies' Lives Version 2."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.npeu.ox.ac.uk/mbrrace-uk/reports" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">MBRRACE-UK — Saving Lives, Improving Mothers' Care</a> — the UK's confidential enquiry into maternal deaths and morbidity. Covers all deaths during pregnancy or within one year. Rolling triennial reports.</p>
            <p><a href="https://digital.nhs.uk/data-and-information/publications/statistical/maternity-services-monthly-statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS England — Maternity Services Monthly Statistics</a> — covers booking appointments, delivery methods, workforce data, and continuity of carer metrics.</p>
            <p>Maternal mortality is defined as death during pregnancy or within 42 days of the end of pregnancy from causes related to or aggravated by the pregnancy. Ethnic group classification follows ONS census categories. Small numbers in some ethnic groups mean rates are calculated using rolling three-year averages to reduce statistical volatility.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
