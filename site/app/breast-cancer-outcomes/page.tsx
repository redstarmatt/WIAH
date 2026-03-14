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
  { num: 1, name: 'NHS England', dataset: 'Breast Cancer Screening Programme Statistics', url: 'https://digital.nhs.uk/data-and-information/publications/statistical/breast-screening-programme', date: '2024' },
  { num: 2, name: 'Cancer Research UK', dataset: 'Breast Cancer Survival Statistics', url: 'https://www.cancerresearchuk.org/health-professional/cancer-statistics/statistics-by-cancer-type/breast-cancer/survival', date: '2024' },
  { num: 3, name: 'NHS England', dataset: 'National Cancer Patient Experience Survey', url: 'https://www.ncpes.co.uk/', date: '2024' },
];

const fiveYearSurvivalValues = [78.4, 79.1, 80.2, 81.3, 82.1, 83.5, 84.2, 85.1, 85.8, 86.4, 87.0];
const screeningUptakeValues = [74.2, 73.8, 74.1, 73.5, 73.9, 58.2, 70.3, 71.8, 72.4, 72.9, 73.1];
const earlyStageValues = [63.4, 64.1, 65.2, 66.0, 67.3, 65.8, 68.1, 69.5, 70.2, 71.0, 71.8];
const mortalityRateValues = [37.2, 36.8, 36.1, 35.4, 34.8, 34.1, 33.5, 32.9, 32.2, 31.6, 31.0];

const series1: Series[] = [
  { id: 'survival', label: '5-year survival rate (%)', colour: '#2A9D8F', data: fiveYearSurvivalValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
  { id: 'earlyStage', label: 'Diagnosed at stage I or II (%)', colour: '#264653', data: earlyStageValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
];

const series2: Series[] = [
  { id: 'uptake', label: 'Screening uptake (%)', colour: '#E63946', data: screeningUptakeValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
  { id: 'mortality', label: 'Mortality rate per 100,000 women', colour: '#F4A261', data: mortalityRateValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
];

const annotations1: Annotation[] = [
  { date: new Date(2020, 2, 1), label: '2020: Screening paused — COVID' },
];

export default function BreastCancerOutcomesPage() {
  return (
    <>
      <TopicNav topic="Breast Cancer Outcomes" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Health"
          question="Are Breast Cancer Survival Rates Improving?"
          finding={<>Five-year breast cancer survival in England has improved from 78% in 2013 to 87% in 2024 — one of the largest gains of any cancer type.<Cite nums={2} /> But screening uptake remains stubbornly below the 80% target, and the COVID pause left an estimated 1 million women overdue a mammogram, with unknown downstream effects on late-stage diagnoses.<Cite nums={[1, 2]} /></>}
          colour="#E63946"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Breast cancer is the most common cancer in the UK — around 56,000 new diagnoses a year — and improved outcomes are one of modern oncology's genuine success stories. The combination of population screening (mammography every three years for women aged 50–70), better diagnostics, targeted therapies including trastuzumab (Herceptin) and tamoxifen, and improved surgical techniques has pushed five-year survival from under 70% in the 1990s to 87% today.<Cite nums={2} /> The proportion diagnosed at stage I or II — when treatment is most effective — has risen steadily, now standing at 71.8%. These improvements are not uniform: women in more deprived areas are diagnosed at later stages and have worse survival rates, reflecting lower screening uptake and delays in seeking care.</p>
            <p>Screening uptake has plateaued at around 73% — well below the 80% target that would maximise population benefit. In some areas, especially urban and ethnically diverse communities, uptake is below 60%.<Cite nums={1} /> The COVID-19 pandemic caused a sharp disruption: the programme was suspended in March 2020 and not fully restored until late 2021. NHS England estimated that around 1 million women missed their scheduled mammogram. While the catch-up programme has made progress, some of those missing women will have had cancers develop or progress undetected. Cancer Research UK has noted that waiting list pressures and diagnostic capacity constraints continue to affect the timeliness of imaging and biopsy results, with implications for stage at treatment and anxiety for patients.<Cite nums={3} /></p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Overview' },
          { id: 'sec-chart1', label: 'Survival & Stage' },
          { id: 'sec-chart2', label: 'Screening & Mortality' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard label="5-year survival rate" value="87.0%" unit="of diagnoses" direction="up" polarity="up-is-good" changeText="up from 78.4% in 2013 · 9pp gain over a decade" sparklineData={[78.4, 79.1, 80.2, 81.3, 82.1, 83.5, 84.2, 85.1, 85.8, 86.4, 87.0]} source="Cancer Research UK — Breast Cancer Survival 2024" href="#sec-chart1" />
            <MetricCard label="Screening uptake" value="73.1%" unit="of eligible women" direction="down" polarity="up-is-good" changeText="below 80% target · ~1M women overdue post-COVID" sparklineData={[74.2, 73.8, 74.1, 73.5, 73.9, 58.2, 70.3, 71.8, 72.4, 72.9, 73.1]} source="NHS England — Breast Screening Programme 2024" href="#sec-chart2" />
            <MetricCard label="Mortality rate" value="31.0" unit="per 100,000 women" direction="down" polarity="up-is-bad" changeText="down from 37.2 in 2013 · steady long-term decline" sparklineData={[37.2, 36.8, 36.1, 35.4, 34.8, 34.1, 33.5, 32.9, 32.2, 31.6, 31.0]} source="Cancer Research UK — Breast Cancer Statistics 2024" href="#sec-chart2" />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Breast cancer survival and stage at diagnosis, 2013–2024"
              subtitle="Five-year age-standardised survival rate (%) and proportion diagnosed at stage I or II (%), England. Both indicators improving consistently, though the pandemic caused a dip in early-stage detection."
              series={series1}
              annotations={annotations1}
              yLabel="Percentage (%)"
              source={{ name: 'Cancer Research UK', dataset: 'Breast Cancer Survival Statistics', url: 'https://www.cancerresearchuk.org/health-professional/cancer-statistics/statistics-by-cancer-type/breast-cancer/survival', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Breast cancer screening uptake and mortality rate, 2013–2024"
              subtitle="Screening uptake (% of eligible women aged 50–70 screened within 3 years) and age-standardised mortality rate per 100,000 women. Mortality falling despite uptake stagnation — reflecting treatment improvements."
              series={series2}
              annotations={[{ date: new Date(2020, 2, 1), label: '2020: Screening suspended' }]}
              yLabel="% / Per 100,000"
              source={{ name: 'NHS England', dataset: 'Breast Cancer Screening Programme Statistics', url: 'https://digital.nhs.uk/data-and-information/publications/statistical/breast-screening-programme', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Secondary breast cancer outcomes also improving"
            value="3 years"
            unit="median survival for metastatic breast cancer — up from 18 months in 2000"
            description="Even for women diagnosed with stage IV (metastatic) breast cancer, outcomes have improved dramatically. New targeted therapies — CDK4/6 inhibitors, PARP inhibitors for BRCA mutation carriers, and antibody-drug conjugates — have transformed survival for many subtypes. Median survival for metastatic breast cancer has risen from around 18 months in 2000 to over three years today for hormone receptor-positive disease. Around 35% of women with secondary breast cancer now live five years or more."
            source="Source: Cancer Research UK — Breast Cancer Survival Statistics 2024."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://digital.nhs.uk/data-and-information/publications/statistical/breast-screening-programme" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS England — Breast Cancer Screening Programme Statistics</a> — uptake, coverage, cancers detected. Annual.</p>
            <p><a href="https://www.cancerresearchuk.org/health-professional/cancer-statistics/statistics-by-cancer-type/breast-cancer/survival" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Cancer Research UK — Breast Cancer Survival Statistics</a> — survival rates by stage, year, deprivation. Annual.</p>
            <p>Survival rates are age-standardised five-year net survival. Mortality rates are age-standardised European Standard Population. Screening uptake is the 3-year coverage rate for women aged 50–70.</p>
          </div>
        </section>
      </main>
    </>
  );
}
