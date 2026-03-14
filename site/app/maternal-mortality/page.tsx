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
const maternalRateValues = [11.4, 10.1, 9.6, 9.0, 8.5, 9.2, 9.8, 10.8, 9.7, 10.6, 13.4, 12.8, 11.2, 10.1];

// Mortality rate by ethnicity per 100,000 — MBRRACE-UK triennial reports (biennial data points)
const blackWomenValues = [34.0, 32.5, 29.8, 34.2, 37.1, 33.6, 32.0];
const whiteWomenValues = [8.2, 7.8, 8.0, 8.5, 9.0, 8.8, 8.5];
const asianWomenValues = [13.2, 12.8, 14.1, 15.0, 14.5, 13.8, 12.9];

// Stillbirth rate per 1,000 total births, 2010–2023
const stillbirthValues = [5.2, 5.0, 4.9, 4.7, 4.5, 4.4, 4.2, 4.1, 3.9, 3.8, 3.9, 3.7, 3.5, 3.4];

const series1: Series[] = [
  {
    id: 'maternal-rate',
    label: 'Maternal mortality rate (per 100,000)',
    colour: '#E63946',
    data: maternalRateValues.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
  },
];

const series2: Series[] = [
  {
    id: 'black-women',
    label: 'Black women',
    colour: '#E63946',
    data: blackWomenValues.map((v, i) => ({ date: new Date(2011 + i * 2, 0, 1), value: v })),
  },
  {
    id: 'asian-women',
    label: 'Asian women',
    colour: '#F4A261',
    data: asianWomenValues.map((v, i) => ({ date: new Date(2011 + i * 2, 0, 1), value: v })),
  },
  {
    id: 'white-women',
    label: 'White women',
    colour: '#6B7280',
    data: whiteWomenValues.map((v, i) => ({ date: new Date(2011 + i * 2, 0, 1), value: v })),
  },
];

const annotations: Annotation[] = [
  { date: new Date(2016, 0, 1), label: '2016: National Maternity Safety Strategy' },
  { date: new Date(2020, 0, 1), label: '2020: COVID-19 disrupts maternity services' },
];

const editorialRefs: Reference[] = [
  { num: 1, name: 'MBRRACE-UK', dataset: 'Saving Lives, Improving Mothers\' Care', url: 'https://www.npeu.ox.ac.uk/mbrrace-uk', date: '2023' },
  { num: 2, name: 'NHS England', dataset: 'Maternity services data and statistics', url: 'https://www.england.nhs.uk/mat-transformation/', date: '2024' },
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
          finding="The UK maternal mortality rate stands at around 10 per 100,000 maternities. Black women are 3.7 times more likely to die than white women in pregnancy or childbirth — a disparity that has persisted for over a decade."
          colour="#E63946"
          preposition="with"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The UK maternal mortality rate has fluctuated between 8.5 and 13.4 per 100,000 maternities over the past decade, according to the MBRRACE-UK confidential enquiry.<Cite nums={1} /> While the overall rate remains low by global standards, progress on reducing it has stalled since 2016. The most recent triennial report found that 83% of women who died had multiple health complications, and that for the majority, improvements in care might have made a difference to the outcome.<Cite nums={1} /> The pandemic exacerbated existing pressures, with reduced antenatal contacts and disrupted mental health support contributing to a spike in 2020.<Cite nums={2} /></p>
            <p>The starkest finding is the persistent ethnic disparity. Black women are 3.7 times more likely to die during pregnancy, childbirth, or in the six weeks following birth compared with white women.<Cite nums={1} /> Asian women face a risk 1.8 times higher. These ratios have remained largely unchanged despite being highlighted in successive MBRRACE-UK reports since 2014. The causes are multifactorial: structural racism in healthcare access, higher rates of pre-existing conditions, socioeconomic deprivation, and evidence of clinical bias in symptom assessment. The NHS Maternity Safety Strategy committed to halving maternal mortality by 2025 against a 2010 baseline — a target that will not be met. Stillbirth rates have fallen more consistently, from 5.2 per 1,000 in 2010 to 3.4 in 2023, but remain above the government ambition of 2.6 per 1,000.<Cite nums={3} /></p>
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
              value="10.1"
              unit="per 100,000 (2023)"
              direction="down"
              polarity="up-is-bad"
              changeText="down from 13.4 peak in 2020 · 2025 halving target will be missed"
              sparklineData={maternalRateValues.slice(-8)}
              source="MBRRACE-UK — Saving Lives 2023"
              href="#sec-chart1"
            />
            <MetricCard
              label="Black maternal death disparity"
              value="3.7x"
              unit="vs white women (2023)"
              direction="stable"
              polarity="up-is-bad"
              changeText="persistent for over a decade · unchanged despite repeated reports"
              sparklineData={[4.0, 3.9, 3.7, 4.0, 4.1, 3.8, 3.7]}
              source="MBRRACE-UK — Ethnic disparity analysis 2023"
              href="#sec-chart2"
            />
            <MetricCard
              label="Stillbirth rate"
              value="3.4"
              unit="per 1,000 births (2023)"
              direction="down"
              polarity="up-is-bad"
              changeText="down from 5.2 in 2010 · target of 2.6 not yet met"
              sparklineData={stillbirthValues.slice(-8)}
              source="MBRRACE-UK — Perinatal Mortality 2023"
              href="#sec-chart1"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Maternal mortality rate, UK, 2010–2023"
              subtitle="Deaths per 100,000 maternities during pregnancy or within 42 days of the end of pregnancy. MBRRACE-UK confidential enquiry."
              series={series1}
              annotations={annotations}
              yLabel="Deaths per 100,000"
              source={{ name: 'MBRRACE-UK', dataset: 'Saving Lives, Improving Mothers\' Care', url: 'https://www.npeu.ox.ac.uk/mbrrace-uk', frequency: 'triennial with annual updates', date: 'Nov 2023' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Maternal mortality rate by ethnicity, UK, 2011–2023"
              subtitle="Black women face a mortality rate 3.7x higher than white women. Data from triennial MBRRACE-UK reports (two-year rolling averages)."
              series={series2}
              annotations={[{ date: new Date(2020, 0, 1), label: '2020: Pandemic widens disparities' }]}
              yLabel="Deaths per 100,000"
              source={{ name: 'MBRRACE-UK', dataset: 'Saving Lives — Ethnic group analysis', url: 'https://www.npeu.ox.ac.uk/mbrrace-uk/reports', frequency: 'triennial', date: 'Nov 2023' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Stillbirth reduction: sustained progress through targeted intervention"
            value="35%"
            unit="reduction since 2010"
            description="The UK stillbirth rate has fallen from 5.2 per 1,000 births in 2010 to 3.4 in 2023 — a 35% reduction. This has been driven by the Saving Babies' Lives care bundle, which introduced standardised approaches to reduced fetal movement, fetal growth surveillance, and smoking cessation. The bundle, implemented across NHS trusts from 2016, has been credited with preventing approximately 1,000 stillbirths. While the national ambition of 2.6 per 1,000 by 2025 will not be met, the trajectory represents meaningful, evidence-based progress."
            source="Source: MBRRACE-UK Perinatal Mortality Surveillance Report 2023. NHS England — Saving Babies' Lives evaluation."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.npeu.ox.ac.uk/mbrrace-uk" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">MBRRACE-UK — Saving Lives, Improving Mothers&apos; Care</a> — confidential enquiry into maternal deaths. Covers all women who die during or up to one year after pregnancy. Published triennially with annual surveillance updates.</p>
            <p><a href="https://www.npeu.ox.ac.uk/mbrrace-uk/reports" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">MBRRACE-UK — Perinatal Mortality Surveillance</a> — annual report covering stillbirths and neonatal deaths. Includes regional and trust-level breakdowns.</p>
            <p>Maternal mortality data covers the entire UK. Ethnicity data is based on MBRRACE-UK classification using triennial rolling periods. The 2020 pandemic year should be interpreted with caution due to changes in care delivery and reporting.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
