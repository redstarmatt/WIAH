'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import PositiveCallout from '@/components/PositiveCallout';
import SectionNav from '@/components/SectionNav';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';
import RelatedTopics from '@/components/RelatedTopics';

export default function NhsStaffingPage() {
  const colour = '#E63946';

  // NHS vacancy rate 2015–2024 (%)
  const vacancyRateData = [5.1, 5.5, 6.2, 7.0, 7.8, 8.4, 9.3, 9.9, 10.8, 9.4];
  const vacancyAnnotations: Annotation[] = [
    { date: new Date(2016, 5, 1), label: '2016: Brexit vote — EU nurse departures' },
    { date: new Date(2021, 0, 1), label: '2021: Post-COVID demand surge' },
  ];

  const vacancyRateSeries: Series[] = [
    {
      id: 'vacancy-rate',
      label: 'NHS vacancy rate (%)',
      colour: colour,
      data: vacancyRateData.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
  ];

  // Nursing workforce: domestic vs international 2015–2024 (thousands of new joiners)
  const domesticNursingData = [18.2, 17.4, 16.9, 16.3, 15.8, 15.2, 16.1, 17.3, 19.4, 22.1];
  const internationalNursingData = [4.1, 3.9, 3.2, 4.5, 5.8, 7.2, 14.3, 21.6, 28.9, 32.4];

  const nursingSeries: Series[] = [
    {
      id: 'domestic',
      label: 'UK-trained nurses joining NHS (thousands)',
      colour: '#264653',
      data: domesticNursingData.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
    {
      id: 'international',
      label: 'Internationally recruited nurses joining NHS (thousands)',
      colour: colour,
      data: internationalNursingData.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
  ];

  const nursingAnnotations: Annotation[] = [
    { date: new Date(2020, 0, 1), label: '2020: International recruitment scaled up' },
  ];

  return (
    <>
      <TopicNav topic="NHS Staffing" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="NHS Staffing"
          question="Is the NHS Running Out of Staff?"
          finding="The NHS has 112,000 vacancies — 1 in 10 posts unfilled — with nursing the most acute shortage, and international recruitment masking the depth of domestic training failures."
          colour={colour}
          preposition="with"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Overview' },
          { id: 'sec-vacancies', label: 'Vacancy Rate' },
          { id: 'sec-nursing', label: 'Nursing Workforce' },
        ]} />

        <section id="sec-metrics" className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="NHS vacancies (thousands)"
              value="112"
              direction="up"
              polarity="up-is-bad"
              changeText="2024 · 1 in 10 posts unfilled · down from 133K peak in 2022"
              sparklineData={[38, 43, 51, 60, 71, 80, 93, 100, 133, 112]}
              source="NHS England — NHS Vacancy Statistics, 2024"
            />
            <MetricCard
              label="Nursing vacancies (thousands)"
              value="34.2"
              direction="up"
              polarity="up-is-bad"
              changeText="2024 · largest single staff group shortage · 1 in 9 nursing posts vacant"
              sparklineData={[12.3, 14.1, 16.8, 19.4, 22.1, 25.3, 29.6, 32.1, 43.4, 34.2]}
              source="NHS England — NHS Vacancy Statistics, 2024"
            />
            <MetricCard
              label="International recruits per year (thousands)"
              value="32.4"
              direction="up"
              polarity="up-is-good"
              changeText="2024 · majority from Philippines and India · up from 4K in 2015"
              sparklineData={[4.1, 3.9, 3.2, 4.5, 5.8, 7.2, 14.3, 21.6, 28.9, 32.4]}
              source="NHS England — NHS Workforce Statistics, 2024"
            />
          </div>
        </section>

        <ScrollReveal>
          <section id="sec-vacancies" className="mb-12">
            <LineChart
              title="NHS vacancy rate, England, 2015–2024 (%)"
              subtitle="Percentage of all NHS posts unfilled at any given time. Includes all staff groups: doctors, nurses, allied health professionals, and support staff."
              series={vacancyRateSeries}
              annotations={vacancyAnnotations}
              yLabel="Vacancy rate (%)"
              source={{
                name: 'NHS England',
                dataset: 'NHS Vacancy Statistics',
                frequency: 'quarterly',
                url: 'https://digital.nhs.uk/data-and-information/publications/statistical/nhs-vacancies-survey',
                date: 'Jan 2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-nursing" className="mb-12">
            <LineChart
              title="Nursing workforce new joiners — domestic vs international, 2015–2024 (thousands)"
              subtitle="England. Number of newly registered nurses joining the NHS workforce each year, by country of training. International recruitment has filled the gap left by domestic training shortfalls."
              series={nursingSeries}
              annotations={nursingAnnotations}
              yLabel="New joiners (thousands)"
              source={{
                name: 'NHS England',
                dataset: 'NHS Workforce Statistics',
                frequency: 'annual',
                url: 'https://digital.nhs.uk/data-and-information/publications/statistical/nhs-workforce-statistics',
                date: 'Jan 2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="Progress being made"
            value="10,000"
            unit="additional nursing and midwifery training places funded since 2019"
            description="The government funded 10,000 additional undergraduate nursing places from 2019, and the NHS Long Term Workforce Plan (2023) commits to training 24,000 more nurses and midwives annually by 2031. The return-to-practice programme has re-registered over 5,000 nurses and allied health professionals. NHS England's international recruitment programme operates under ethical recruitment guidelines aligned with WHO standards, avoiding active recruitment from countries with their own critical shortages. Vacancy rates fell from their 2022 peak of 133,000 to 112,000 in 2024 — progress, though still far above pre-pandemic levels."
            source="Source: NHS England — Long Term Workforce Plan 2023; NHS Vacancy Statistics Q3 2024."
          />
        </ScrollReveal>

        <ScrollReveal>
          <section className="max-w-2xl mb-12 mt-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">What the data shows</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>The NHS had 112,000 vacancies in 2024 — roughly 1 in 10 of all posts. This represents a partial recovery from the 133,000-vacancy peak in 2022, but remains more than double the pre-pandemic level. Nursing shortages are most acute: 34,200 nursing posts sit unfilled, representing 1 in 9 of the total nursing establishment. The Royal College of Nursing estimates that safe staffing requires the NHS to recruit and retain 40,000 additional nurses over the next decade.</p>
              <p>International recruitment has become the primary mechanism for workforce growth. In 2024, 32,400 internationally trained nurses joined the NHS — up from just 4,100 in 2015. The majority came from the Philippines and India. This has stabilised total nursing numbers, but it masks a domestic training pipeline that has not kept pace with demand. The removal of NHS bursaries for student nurses in 2017 reduced applications by 30%; the bursaries were partially restored in 2020, but take-up has not fully recovered. The domestic training system simply cannot produce nurses fast enough: undergraduate courses take three years, and attrition rates during training are around 20%.</p>
              <p>Staff sickness absence — running at 5.6% of contracted hours, compared to 3.8% in 2019 — further depletes effective workforce capacity. Burnout, post-COVID trauma, and unmanageable caseloads drive both absence and resignation. The pay dispute of 2022–23, which saw nurses strike for the first time in NHS history, reflected a real-terms pay cut of around 20% since 2010. The 2023 pay settlement of 5% remained below inflation. Agency and bank staff filled an estimated 8% of NHS shifts in 2024, at a cost of £3.2 billion — more than double the pre-pandemic agency spend.</p>
            </div>
          </section>
        </ScrollReveal>

        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p><a href="https://digital.nhs.uk/data-and-information/publications/statistical/nhs-vacancies-survey" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS England — NHS Vacancy Statistics</a> — quarterly. Vacancy numbers by staff group and trust.</p>
            <p><a href="https://digital.nhs.uk/data-and-information/publications/statistical/nhs-workforce-statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS England — NHS Workforce Statistics</a> — monthly. Headcount and FTE by staff group, nationality, and trust.</p>
            <p><a href="https://www.england.nhs.uk/long-read/nhs-long-term-workforce-plan-2/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS England — Long Term Workforce Plan 2023</a></p>
            <p>All figures are for England. Vacancy rate = vacancies as a percentage of total posts. International figures are based on country of nursing training as recorded at NMC registration.</p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
