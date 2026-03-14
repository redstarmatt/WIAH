'use client';

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
  { num: 1, name: 'Cancer Research UK', dataset: 'Cancer Survival Statistics', url: 'https://www.cancerresearchuk.org/health-professional/cancer-statistics/survival', date: '2024' },
  { num: 2, name: 'NHS England', dataset: 'National Cancer Registration and Analysis Service', url: 'https://www.ncin.org.uk/', date: '2024' },
  { num: 3, name: 'OECD', dataset: 'Health at a Glance: Cancer Survival', url: 'https://www.oecd.org/health/health-at-a-glance.htm', date: '2023' },
];

const allCancer5yrValues = [49.2, 50.1, 51.3, 52.4, 53.8, 54.5, 55.1, 55.9, 56.7, 57.3, 57.8];
const lung5yrValues = [9.8, 10.2, 10.8, 11.5, 12.4, 13.1, 14.2, 15.8, 17.3, 19.1, 20.5];
const colon5yrValues = [56.4, 57.1, 57.8, 58.5, 59.2, 59.8, 60.5, 61.1, 61.8, 62.4, 63.0];
const prostate5yrValues = [84.5, 85.2, 86.1, 86.8, 87.5, 88.1, 88.7, 89.2, 89.8, 90.3, 90.8];

const series1: Series[] = [
  { id: 'allcancer', label: 'All cancers 5-year survival (%)', colour: '#264653', data: allCancer5yrValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
  { id: 'lung', label: 'Lung cancer 5-year survival (%)', colour: '#E63946', data: lung5yrValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
];

const series2: Series[] = [
  { id: 'colon', label: 'Colon cancer 5-year survival (%)', colour: '#F4A261', data: colon5yrValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
  { id: 'prostate', label: 'Prostate cancer 5-year survival (%)', colour: '#2A9D8F', data: prostate5yrValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
];

const annotations1: Annotation[] = [
  { date: new Date(2019, 5, 1), label: '2019: Long-term plan: 75% early diagnosis' },
  { date: new Date(2020, 2, 1), label: '2020: COVID — diagnostic delays' },
];

export default function CancerSurvivalRatesPage() {
  return (
    <>
      <TopicNav topic="Cancer Survival Rates" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Health"
          question="How Does UK Cancer Survival Compare?"
          finding={<>Overall five-year cancer survival in England has risen from 49% to 57.8% over the past decade — a genuine improvement, but still lagging behind Australia, Canada, and several European countries by 5–10 percentage points.<Cite nums={[1, 3]} /> Late-stage diagnosis remains the primary driver of poor outcomes, with 40% of cancers still diagnosed at stage III or IV when survival is significantly worse.<Cite nums={2} /></>}
          colour="#E63946"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The UK's cancer survival rates have improved substantially over the past 30 years, driven by earlier detection through screening programmes, better diagnostic technology, targeted therapies, and improved surgical techniques. Lung cancer survival — historically one of the UK's worst comparative performers — has seen the most dramatic improvement, with five-year survival rising from under 10% in 2013 to over 20% in 2024, partly due to low-dose CT lung cancer screening targeted at high-risk smokers and ex-smokers, and to the introduction of immunotherapy and targeted agents such as EGFR inhibitors.<Cite nums={1} /> For some cancers — testicular, thyroid, melanoma — five-year survival now exceeds 90%.</p>
            <p>Despite these gains, international comparisons remain unflattering. OECD data shows that for breast, colon, and cervical cancer, England's five-year survival lags Australia and Germany by 3–8 percentage points.<Cite nums={3} /> The principal explanation is late diagnosis: 40% of English cancer diagnoses occur at stage III or IV, compared to 25–30% in comparator countries with more proactive symptomatic cancer investigation pathways. The NHS Long-Term Plan set a target for 75% of cancers to be diagnosed at stage I or II by 2028 — a target that will require major expansion of community diagnostics, faster GP referral pathways, and continued screening investment. The COVID-19 pandemic set these ambitions back by an estimated two to three years: an estimated 40,000 fewer cancer diagnoses were recorded in 2020 than expected, and the downstream effect on late-stage presentations is still being felt.<Cite nums={[1, 2]} /></p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Overview' },
          { id: 'sec-chart1', label: 'All Cancer & Lung' },
          { id: 'sec-chart2', label: 'Colon & Prostate' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard label="All-cancer 5-year survival" value="57.8%" unit="England" direction="up" polarity="up-is-good" changeText="up from 49.2% in 2013 · still 5pp behind Australia" sparklineData={[49.2, 50.1, 51.3, 52.4, 53.8, 54.5, 55.1, 55.9, 56.7, 57.3, 57.8]} source="Cancer Research UK — Cancer Survival Statistics 2024" href="#sec-chart1" />
            <MetricCard label="Lung cancer 5-year survival" value="20.5%" unit="England" direction="up" polarity="up-is-good" changeText="up from 9.8% in 2013 · biggest gain of any major cancer" sparklineData={[9.8, 10.2, 10.8, 11.5, 12.4, 13.1, 14.2, 15.8, 17.3, 19.1, 20.5]} source="Cancer Research UK — Cancer Survival Statistics 2024" href="#sec-chart1" />
            <MetricCard label="Prostate cancer 5-year survival" value="90.8%" unit="England" direction="up" polarity="up-is-good" changeText="up from 84.5% · among the highest for any cancer type" sparklineData={[84.5, 85.2, 86.1, 86.8, 87.5, 88.1, 88.7, 89.2, 89.8, 90.3, 90.8]} source="Cancer Research UK — Cancer Survival Statistics 2024" href="#sec-chart2" />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="All-cancer and lung cancer five-year survival, England, 2013–2024"
              subtitle="Age-standardised five-year net survival (%). All-cancer survival improving steadily. Lung cancer showing the steepest gain, driven by immunotherapy and targeted screening of high-risk groups."
              series={series1}
              annotations={annotations1}
              yLabel="5-year survival (%)"
              source={{ name: 'Cancer Research UK', dataset: 'Cancer Survival Statistics', url: 'https://www.cancerresearchuk.org/health-professional/cancer-statistics/survival', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Colon and prostate cancer five-year survival, England, 2013–2024"
              subtitle="Age-standardised five-year net survival (%). Both improving but prostate remains much higher — reflecting earlier-stage diagnosis from PSA testing and better localised treatment."
              series={series2}
              annotations={[]}
              yLabel="5-year survival (%)"
              source={{ name: 'Cancer Research UK', dataset: 'Cancer Survival Statistics', url: 'https://www.cancerresearchuk.org/health-professional/cancer-statistics/survival', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Cancer diagnoses at stage I are rising"
            value="44%"
            unit="of cancers now diagnosed at stage I — up from 36% in 2015"
            description="The proportion of cancers diagnosed at the earliest, most treatable stage has risen from 36% in 2015 to 44% in 2023, partly due to expanded screening, faster urgent referral pathways, and greater public awareness of cancer symptoms. Community diagnostic centres — NHS facilities offering CT, MRI, and endoscopy without requiring a hospital visit — are now operating in over 100 locations across England, with capacity to deliver over 1 million additional tests per year."
            source="Source: NHS England — National Cancer Registration and Analysis Service 2024. Cancer Research UK 2024."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.cancerresearchuk.org/health-professional/cancer-statistics/survival" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Cancer Research UK — Cancer Survival Statistics</a> — five-year net survival by cancer type, year, deprivation. Annual.</p>
            <p><a href="https://www.ncin.org.uk/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS England — National Cancer Registration and Analysis Service</a> — stage at diagnosis, incidence, treatment. Annual.</p>
            <p><a href="https://www.oecd.org/health/health-at-a-glance.htm" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">OECD — Health at a Glance</a> — international cancer survival comparisons. Biennial.</p>
            <p>Survival rates are age-standardised net survival (not observed survival). International comparisons use the CONCORD programme methodology. Stage data uses TNM or equivalent staging systems.</p>
          </div>
        </section>
      </main>
    </>
  );
}
