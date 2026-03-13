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
  { num: 1, name: 'NHS England', dataset: 'Breast Screening Programme statistics', url: 'https://digital.nhs.uk/data-and-information/publications/statistical/breast-screening-programme', date: '2024' },
  { num: 2, name: 'NHS England', dataset: 'Breast Screening Programme — cancer detection rates', url: 'https://digital.nhs.uk/data-and-information/publications/statistical/breast-screening-programme', date: '2024' },
  { num: 3, name: 'NHS England', dataset: 'Long Term Workforce Plan', url: 'https://www.england.nhs.uk/publication/nhs-long-term-workforce-plan/', date: '2023' },
];

export default function BreastScreeningPage() {
  const coverageRawData = [73.4, 73.9, 74.2, 75.0, 75.4, 75.9, 76.4, 75.1, 74.3, 73.8, 72.8, 70.5, 71.0, 70.7, 70.2, 70.0];
  const cancersDetectedData = [7.1, 7.2, 7.4, 7.5, 7.6, 7.7, 7.8, 7.8, 7.9, 8.0, 7.2, 6.8, 7.1, 7.2, 7.1, 6.9];

  const coverageSeries: Series[] = [
    {
      id: 'coverage',
      label: 'Breast screening coverage rate (%)',
      colour: '#E63946',
      data: coverageRawData.map((v: number, i: number) => ({ date: new Date(2008 + i, 0, 1), value: v })),
    },
  ];

  const cancersSeries: Series[] = [
    {
      id: 'cancers',
      label: 'Cancers detected per 1,000 screened',
      colour: '#E63946',
      data: cancersDetectedData.map((v: number, i: number) => ({ date: new Date(2010 + i, 0, 1), value: v })),
    },
  ];

  const coverageAnnotations: Annotation[] = [
    { date: new Date(2018, 0, 1), label: '2018: IT failure — 450,000 women missed' },
    { date: new Date(2020, 0, 1), label: '2020: COVID-19 programme suspension' },
  ];

  const coverageTarget = { value: 80.0, label: '80% coverage target' };

  return (
    <>
      <TopicNav topic="Breast Screening" />
      <SectionNav sections={[
        { id: 'sec-metrics', label: 'Key Metrics' },
        { id: 'sec-coverage', label: 'Coverage Trend' },
        { id: 'sec-detection', label: 'Cancer Detection' },
        { id: 'sec-context', label: 'Context' },
        { id: 'sec-sources', label: 'Sources' },
      ]} />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Breast Screening"
          question="Are Women Getting Their Breast Screening?"
          finding="Breast screening coverage has fallen to 70% — the lowest in 15 years — with 1 in 3 eligible women not attending, and waiting times for results growing."
          colour="#E63946"
        />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 mb-12">
            <MetricCard
              label="Breast screening coverage rate (%)"
              value="70.0"
              direction="down"
              polarity="down-is-bad"
              changeText="down from 76.4% in 2014 · 15-year low · target is 80%"
              sparklineData={[76.4, 75.1, 74.3, 73.8, 72.8, 70.5, 70.0]}
              source="NHS England — 2024"
            />
            <MetricCard
              label="Women not screened (millions)"
              value="1.0"
              direction="up"
              polarity="up-is-bad"
              changeText="~1m eligible women not attending · 1 in 3 missing screening"
              sparklineData={[0.7, 0.8, 0.8, 0.9, 1.0, 1.0, 1.0]}
              source="NHS England — 2024"
            />
            <MetricCard
              label="Average wait for results (weeks)"
              value="4.2"
              direction="up"
              polarity="up-is-bad"
              changeText="up from 2.8 weeks in 2019 · standard is 2 weeks"
              sparklineData={[2.8, 2.9, 3.0, 4.8, 4.5, 4.3, 4.2]}
              source="NHS England — 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-coverage" className="mb-12">
            <LineChart
              title="Breast screening coverage rate, England 2008–2024"
              subtitle="Percentage of women aged 50–70 screened within the last 3 years. National programme."
              series={coverageSeries}
              targetLine={coverageTarget}
              annotations={coverageAnnotations}
              yLabel="Coverage rate (%)"
              source={{
                name: 'NHS England',
                dataset: 'Breast Screening Programme statistics',
                frequency: 'annual',
                url: 'https://digital.nhs.uk/data-and-information/publications/statistical/breast-screening-programme',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-detection" className="mb-12">
            <LineChart
              title="Cancers detected per 1,000 women screened, England 2010–2024"
              subtitle="Includes invasive cancers and ductal carcinoma in situ (DCIS). Lower detection partially reflects fewer women attending."
              series={cancersSeries}
              yLabel="Cancers detected per 1,000 screened"
              source={{
                name: 'NHS England',
                dataset: 'Breast Screening Programme — cancer detection rates',
                frequency: 'annual',
                url: 'https://digital.nhs.uk/data-and-information/publications/statistical/breast-screening-programme',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="Screening saves lives"
            value="18,000"
            unit="cancers detected per year"
            description="When women do attend, breast screening saves lives. The programme detects around 18,000 cancers each year, and early detection significantly improves survival rates. Closing the participation gap is one of the most cost-effective interventions available to the NHS — each percentage point of coverage recovered prevents hundreds of late-stage diagnoses."
            source="NHS Digital, Breast Screening Programme Statistics, 2024"
          />
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-context" className="max-w-2xl mb-12 mt-8">
            <h2 className="text-xl font-bold text-wiah-black mb-4">What is driving the decline?</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>England's breast screening programme invites women aged 50–70 for a mammogram every three years. At its peak in 2014, coverage reached 76.4%.<Cite nums={1} /> It has declined steadily since — even before the COVID-19 pandemic caused widespread programme suspension in 2020. Coverage has not recovered to pre-pandemic levels, and at 70% it sits 10 percentage points below the programme's own 80% ambition.<Cite nums={1} /></p>
              <p>A significant IT failure in 2018 affected around 450,000 women who were not properly invited for their final screen.<Cite nums={1} /> The subsequent catch-up effort temporarily improved figures, but the underlying trend continued downward. Inequalities in uptake are marked: women in the most deprived areas are substantially less likely to attend, and women from some ethnic minority groups have lower uptake than the national average.<Cite nums={1} /> Capacity constraints — too few radiographers, an ageing fleet of mammography machines, and insufficient mobile screening units — compound the problem.</p>
              <p>Waiting times for results have grown alongside these capacity pressures. The standard is to return results within two weeks; many trusts are now taking over four weeks.<Cite nums={1} /> Delayed recall for further assessment adds to anxiety and, in some cases, delays diagnosis of cancers that were detected but not acted on promptly. The NHS Long Term Workforce Plan committed to expanding the radiography workforce, but training pipelines take years to fill.<Cite nums={3} /></p>
            </div>
          </section>
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p><a href="https://digital.nhs.uk/data-and-information/publications/statistical/breast-screening-programme" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS England — Breast Screening Programme statistics</a> — annual publication. Coverage calculated as women screened within 36 months as a percentage of the eligible population aged 50–70.</p>
            <p>Cancer detection rates from the same publication. Wait time data from NHS England operational statistics and NHS Digital waiting time returns. All figures are for England. The 2018 IT failure data gap is documented in a PHE incident report.</p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
