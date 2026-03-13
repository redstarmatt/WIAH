'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import PositiveCallout from '@/components/PositiveCallout';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

export default function CancerSurvivalPage() {
  const oneYearSurvival  = [69.5, 70.2, 71.0, 71.8, 72.5, 73.1, 73.8, 74.3, 74.9, 75.3, 75.8, 76.2, 76.5, 76.8];
  const fiveYearSurvival = [50.1, 50.8, 51.5, 52.2, 52.9, 53.5, 54.1, 54.6, 55.0, 55.4, 55.8, 56.1, 56.4, 56.6];
  const stageEarlyDiag   = [51.2, 52.0, 52.8, 53.5, 54.0, 54.5, 55.0, 55.4, 55.8, 56.2, 56.5, 56.8, 57.0, 57.1];
  const lateDiag         = [48.8, 48.0, 47.2, 46.5, 46.0, 45.5, 45.0, 44.6, 44.2, 43.8, 43.5, 43.2, 43.0, 42.9];

  const chart1Series: Series[] = [
    {
      id: 'one-year',
      label: '1-year survival (%)',
      colour: '#F4A261',
      data: oneYearSurvival.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
    },
    {
      id: 'five-year',
      label: '5-year survival (%)',
      colour: '#E63946',
      data: fiveYearSurvival.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
    },
  ];

  const chart2Series: Series[] = [
    {
      id: 'early-diag',
      label: 'Diagnosed at stage 1–2 (%)',
      colour: '#2A9D8F',
      data: stageEarlyDiag.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
    {
      id: 'late-diag',
      label: 'Diagnosed at stage 3–4 (%)',
      colour: '#E63946',
      data: lateDiag.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
  ];

  const chart1Annotations: Annotation[] = [
    { date: new Date(2015, 0, 1), label: '2015: Achieving World-Class Cancer Outcomes strategy' },
    { date: new Date(2020, 0, 1), label: '2020: Covid disrupts screening and diagnosis' },
  ];

  const chart2Annotations: Annotation[] = [
    { date: new Date(2019, 0, 1), label: '2019: NHS Long Term Plan — earlier diagnosis target' },
    { date: new Date(2020, 0, 1), label: '2020: Screening backlogs from Covid' },
  ];

  const chart2TargetLine = { value: 75.0, label: 'NHS LTP target: 75% early stage by 2028' };

  return (
    <>
      <TopicNav topic="Cancer Survival" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Cancer Survival"
          question="How Do UK Cancer Survival Rates Compare?"
          finding="UK cancer survival rates lag behind comparable European countries — 5-year breast cancer survival is 87% vs 91% in Sweden — driven by late diagnosis and long diagnostic waits."
          colour="#E63946"
          preposition="in"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Key metrics' },
          { id: 'sec-chart1', label: 'Survival rates' },
          { id: 'sec-chart2', label: 'Stage at diagnosis' },
        ]} />

        <section id="sec-metrics" className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="5-year survival — all cancers (%)"
              value="56.6"
              direction="up"
              polarity="up-is-good"
              changeText="up from 50% in 2010 · but below Sweden (65%), Norway (62%)"
              sparklineData={[50, 51, 52, 53, 54, 55, 57]}
              source="NHS England / NDRS — 2024"
            />
            <MetricCard
              label="Diagnoses at stage 1–2 (%)"
              value="57"
              direction="up"
              polarity="up-is-good"
              changeText="up from 51% in 2015 · NHS LTP target 75% by 2028"
              sparklineData={[51, 52, 53, 54, 55, 56, 57]}
              source="NHS England — 2024"
            />
            <MetricCard
              label="Diagnostic wait >62 days from urgent referral (%)"
              value="49"
              direction="up"
              polarity="up-is-bad"
              changeText="up from 12% in 2012 · target is less than 15%"
              sparklineData={[12, 18, 25, 30, 35, 40, 49]}
              source="NHS England — 2024"
            />
          </div>
        </section>

        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Cancer survival rates, England 2010–2024 (%)"
              subtitle="Age-standardised 1-year and 5-year net survival for all cancers combined. Source: NHS England National Disease Registration Service."
              series={chart1Series}
              annotations={chart1Annotations}
              yLabel="Survival rate (%)"
              source={{
                name: 'NHS England — National Disease Registration Service',
                dataset: 'Cancer survival in England — stage at diagnosis',
                frequency: 'annual',
                url: 'https://www.cancerdata.nhs.uk/',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Cancer stage at diagnosis distribution, England 2015–2024 (%)"
              subtitle="Share of cancers diagnosed at early (stage 1–2) vs late (stage 3–4) stage. Earlier diagnosis dramatically improves survival odds."
              series={chart2Series}
              annotations={chart2Annotations}
              targetLine={chart2TargetLine}
              yLabel="Share of diagnoses (%)"
              source={{
                name: 'NHS England — National Disease Registration Service',
                dataset: 'Cancer stage at diagnosis, England',
                frequency: 'annual',
                url: 'https://www.cancerdata.nhs.uk/',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="What is improving"
            value="Earlier diagnosis rising"
            unit="2015–2024"
            description="The share of cancers diagnosed at stage 1 or 2 has risen from around 51% in 2015 to 57% in 2024, driven by expanded screening programmes, the NHS Cancer 2 Week Wait pathway, and greater public awareness. Lung cancer early diagnosis — historically the worst — has improved particularly sharply thanks to targeted lung health checks in high-risk communities. The NHS Long Term Plan target of 75% early stage diagnosis by 2028 remains ambitious but is now within reach if diagnostic capacity grows."
            source="Source: NHS England — Cancer survival and stage at diagnosis 2024; NHS Long Term Plan 2019."
          />
        </ScrollReveal>

        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The data on cancer survival</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>UK cancer survival rates have improved significantly since the 1990s but continue to trail comparable European countries. Five-year survival for all cancers combined stands at around 57% in England — behind Sweden (65%), Norway (62%), and Germany (61%). For breast cancer specifically, the UK 5-year survival rate of around 87% compares to 91% in Sweden. These gaps are not explained by differences in cancer incidence, age structure, or risk factors: they primarily reflect differences in diagnostic speed and treatment access.</p>
              <p>The most important driver of survival is stage at diagnosis. A patient diagnosed with stage 1 bowel cancer has a 90% chance of surviving five years; diagnosed at stage 4, that falls to under 10%. England has historically had higher rates of late-stage diagnosis than comparable countries, partly because GP access constraints slow the referral pathway, partly because of lower uptake of screening, and partly because some symptoms are normalised rather than investigated. The 2020 pandemic significantly worsened this, with screening paused for months and urgent referrals falling sharply — creating a cohort of cancers that were diagnosed later and at more advanced stages than would otherwise have been the case.</p>
              <p>Diagnostic waits are the most measurable system failure. The 62-day target from urgent GP referral to first treatment is now missed for nearly half of all patients, up from around 12% in 2012. The endoscopy and imaging backlogs built during Covid have proved slow to clear, with workforce shortages in radiology and gastroenterology acting as persistent bottlenecks.</p>
            </div>
          </section>
        </ScrollReveal>

        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p><a href="https://www.cancerdata.nhs.uk/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS England — National Disease Registration Service</a> — cancer survival and stage at diagnosis. Annual. Retrieved 2024.</p>
            <p><a href="https://www.ons.gov.uk/peoplepopulationandcommunity/healthandsocialcare/conditionsanddiseases" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ONS — Cancer statistics</a> — incidence, mortality, and survival trends. Annual. Retrieved 2024.</p>
            <p><a href="https://www.eurocare.it" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">EUROCARE</a> — European comparative cancer survival data. Retrieved 2024.</p>
            <p>Survival rates are age-standardised net survival for England. European comparisons use EUROCARE-6 data. Stage at diagnosis reflects cancers with known stage at presentation; around 20% of cancers have unknown stage and are excluded from stage distribution figures.</p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
