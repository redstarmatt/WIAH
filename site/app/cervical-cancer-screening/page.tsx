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
  { num: 1, name: 'NHS England', dataset: 'Cervical Screening Programme Statistics', url: 'https://digital.nhs.uk/data-and-information/publications/statistical/cervical-screening-programme', date: '2024' },
  { num: 2, name: 'Cancer Research UK', dataset: 'Cervical Cancer Statistics', url: 'https://www.cancerresearchuk.org/health-professional/cancer-statistics/statistics-by-cancer-type/cervical-cancer', date: '2024' },
  { num: 3, name: 'Jo\'s Cervical Cancer Trust', dataset: 'Cervical Cancer Statistics Report', url: 'https://www.jostrust.org.uk/information/cervical-screening/statistics', date: '2024' },
];

const uptake25to49Values = [72.1, 71.5, 71.0, 70.4, 69.8, 66.2, 68.9, 70.1, 70.8, 71.2, 71.5];
const uptake50to64Values = [79.8, 79.5, 79.1, 78.8, 78.4, 74.1, 76.8, 78.0, 78.5, 78.8, 79.0];
const cervicalCancerIncidenceValues = [9.4, 9.2, 8.9, 8.7, 8.6, 8.5, 8.4, 8.3, 8.2, 8.1, 8.0];
const abnormalityDetectionValues = [7.8, 8.0, 8.2, 8.4, 8.1, 7.2, 9.1, 9.5, 9.8, 10.1, 10.3];

const series1: Series[] = [
  { id: 'uptake2549', label: 'Uptake 25–49 age group (%)', colour: '#E63946', data: uptake25to49Values.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
  { id: 'uptake5064', label: 'Uptake 50–64 age group (%)', colour: '#264653', data: uptake50to64Values.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
];

const series2: Series[] = [
  { id: 'incidence', label: 'Incidence per 100,000 women', colour: '#E63946', data: cervicalCancerIncidenceValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
  { id: 'abnormality', label: 'Abnormality detection rate (%)', colour: '#2A9D8F', data: abnormalityDetectionValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
];

const annotations1: Annotation[] = [
  { date: new Date(2020, 2, 1), label: '2020: COVID disruption' },
  { date: new Date(2019, 8, 1), label: '2019: HPV primary screening introduced' },
];

export default function CervicalCancerScreeningPage() {
  return (
    <>
      <TopicNav topic="Cervical Cancer Screening" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Health"
          question="Is Cervical Screening Participation Falling?"
          finding={<>Cervical screening uptake in England has fallen from 80% in the 1990s to around 71% among women aged 25–49 — the lowest level since records began.<Cite nums={1} /> Around 4.6 million women are overdue their smear test. Cervical cancer kills around 850 women a year in England, nearly all of which are preventable through screening and HPV vaccination.<Cite nums={[1, 2]} /></>}
          colour="#E63946"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The NHS Cervical Screening Programme is one of the most effective cancer prevention interventions in medicine. Cervical cancer incidence in England has fallen by more than 70% since the programme was introduced in 1988, and mortality by a similar proportion. The 2019 switch from cytology-based (smear) testing to HPV primary screening — which tests for the virus that causes virtually all cervical cancers before looking for cell changes — has made the programme significantly more sensitive, detecting abnormalities earlier and allowing for longer intervals between normal-result tests.<Cite nums={1} /> Abnormality detection rates have risen from 7.8% to 10.3% since HPV primary screening was introduced, reflecting the test's superior sensitivity.</p>
            <p>But participation is falling, and the decline is concentrated in younger women and those from deprived backgrounds. Only 71.5% of women aged 25–49 were screened in 2023/24 — against a 80% coverage target and a historical peak of 83% in the mid-2000s. Jo's Cervical Cancer Trust surveys point to several barriers: embarrassment, past trauma (including sexual violence), fear of results, difficulty booking appointments, and long waiting times.<Cite nums={3} /> The pandemic caused a further dip from which full recovery has not yet occurred. Modelling by Cancer Research UK suggests that if coverage falls to 65% and holds there, the UK will see a reversal of decades of progress, with cervical cancer incidence rising significantly by the 2030s. The HPV vaccination programme — now targeting all secondary school pupils — is the long-term solution, but its full impact on cancer rates will not be visible until the 2040s.<Cite nums={2} /></p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Overview' },
          { id: 'sec-chart1', label: 'Screening Uptake' },
          { id: 'sec-chart2', label: 'Cancer Incidence' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard label="Uptake (25–49 age group)" value="71.5%" unit="screened in 3-year period" direction="down" polarity="up-is-good" changeText="was 72.1% in 2013 · well below 80% target" sparklineData={[72.1, 71.5, 71.0, 70.4, 69.8, 66.2, 68.9, 70.1, 70.8, 71.2, 71.5]} source="NHS England — Cervical Screening Programme 2024" href="#sec-chart1" />
            <MetricCard label="Women overdue screening" value="4.6M" unit="in England" direction="up" polarity="up-is-bad" changeText="highest ever · 850 deaths per year are preventable" sparklineData={[3.2, 3.4, 3.6, 3.8, 4.0, 4.8, 4.5, 4.4, 4.5, 4.6, 4.6]} source="NHS England — Cervical Screening Programme 2024" href="#sec-chart1" />
            <MetricCard label="Cervical cancer incidence" value="8.0" unit="per 100,000 women" direction="down" polarity="up-is-bad" changeText="down from 9.4 in 2013 · screening + HPV vaccination working" sparklineData={[9.4, 9.2, 8.9, 8.7, 8.6, 8.5, 8.4, 8.3, 8.2, 8.1, 8.0]} source="Cancer Research UK — Cervical Cancer Statistics 2024" href="#sec-chart2" />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Cervical screening uptake by age group, England, 2013–2024"
              subtitle="Proportion of eligible women screened within the target interval (3 years for 25–49, 5 years for 50–64). Both age groups declining or stagnant — neither meets the 80% coverage target."
              series={series1}
              annotations={annotations1}
              yLabel="Coverage (%)"
              source={{ name: 'NHS England', dataset: 'Cervical Screening Programme Statistics', url: 'https://digital.nhs.uk/data-and-information/publications/statistical/cervical-screening-programme', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Cervical cancer incidence and abnormality detection rate, 2013–2024"
              subtitle="Age-standardised incidence per 100,000 women (left scale, declining) and abnormality detection rate per 100 women screened (right scale, rising with HPV primary screening)."
              series={series2}
              annotations={[{ date: new Date(2019, 8, 1), label: '2019: HPV primary screening' }]}
              yLabel="Rate"
              source={{ name: 'Cancer Research UK', dataset: 'Cervical Cancer Statistics', url: 'https://www.cancerresearchuk.org/health-professional/cancer-statistics/statistics-by-cancer-type/cervical-cancer', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="HPV vaccination could eliminate cervical cancer"
            value="~90%"
            unit="of cervical cancers preventable through HPV vaccination and screening"
            description="With universal HPV vaccination and adequate screening coverage, cervical cancer could become a rare disease within a generation. The UK was the first country to offer gender-neutral HPV vaccination in schools, and vaccination coverage among eligible girls remains above 85%. Modelling suggests that if vaccination coverage is maintained and screening participation recovers, the UK could see cervical cancer incidence fall below 4 per 100,000 — meeting the WHO's elimination threshold — by the 2040s."
            source="Source: Jo's Cervical Cancer Trust — Statistics Report 2024. Cancer Research UK 2024."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://digital.nhs.uk/data-and-information/publications/statistical/cervical-screening-programme" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS England — Cervical Screening Programme Statistics</a> — uptake by age, abnormality rates, treatment. Annual.</p>
            <p><a href="https://www.cancerresearchuk.org/health-professional/cancer-statistics/statistics-by-cancer-type/cervical-cancer" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Cancer Research UK — Cervical Cancer Statistics</a> — incidence, mortality, survival. Annual.</p>
            <p>Coverage is the 3-year rolling coverage rate. Abnormality detection rates changed in 2019 with the switch to HPV primary screening, so pre/post comparisons should be made with care.</p>
          </div>
        </section>
      </main>
    </>
  );
}
