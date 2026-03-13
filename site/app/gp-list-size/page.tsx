'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import PositiveCallout from '@/components/PositiveCallout';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

export default function GpListSizePage() {
  // Chart 1: Average GP list size 2015-2024 (patients per FTE GP)
  const listSizeData = [1977, 2008, 2043, 2079, 2112, 2148, 2190, 2226, 2256, 2275];
  const listSizeSeries: Series[] = [
    {
      id: 'list-size',
      label: 'Patients per GP FTE',
      colour: '#E63946',
      data: listSizeData.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
  ];
  const listAnnotations: Annotation[] = [
    { date: new Date(2019, 0, 1), label: '2019: 6,000 more GPs pledge' },
    { date: new Date(2020, 0, 1), label: '2020: COVID accelerates GP exits' },
  ];
  const listTarget = { value: 1500, label: 'BMA recommended max: 1,500' };

  // Chart 2: GP list size by deprivation quintile 2019-2024
  const depQ1Data = [1820, 1850, 1870, 1890, 1910, 1930]; // least deprived
  const depQ5Data = [2480, 2530, 2580, 2630, 2680, 2710]; // most deprived
  const depNationalData = [2112, 2148, 2190, 2226, 2256, 2275];
  const deprivationSeries: Series[] = [
    {
      id: 'dep-q1',
      label: 'Least deprived quintile (patients per GP FTE)',
      colour: '#2A9D8F',
      data: depQ1Data.map((v, i) => ({ date: new Date(2019 + i, 0, 1), value: v })),
    },
    {
      id: 'dep-national',
      label: 'National average (patients per GP FTE)',
      colour: '#6B7280',
      data: depNationalData.map((v, i) => ({ date: new Date(2019 + i, 0, 1), value: v })),
    },
    {
      id: 'dep-q5',
      label: 'Most deprived quintile (patients per GP FTE)',
      colour: '#E63946',
      data: depQ5Data.map((v, i) => ({ date: new Date(2019 + i, 0, 1), value: v })),
    },
  ];

  return (
    <>
      <TopicNav topic="GP List Size" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="GP List Size"
          question="How Many Patients Does Your GP Have?"
          finding="The average GP now has 2,275 patients — up 15% since 2015 — and GPs in the most deprived areas carry list sizes 40% above the national average."
          colour="#E63946"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Key figures' },
          { id: 'sec-trend', label: 'List size trend' },
          { id: 'sec-deprivation', label: 'Deprivation gap' },
          { id: 'sec-context', label: 'Context' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <section id="sec-metrics" className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Average GP list size"
              value="2,275"
              direction="up"
              polarity="up-is-bad"
              changeText="+15% since 2015 · BMA recommended max: 1,500"
              sparklineData={[1977, 2008, 2043, 2079, 2112, 2148, 2190, 2226, 2256, 2275]}
              source="NHS Digital — GP Workforce Statistics, Oct 2024"
            />
            <MetricCard
              label="Increase since 2015"
              value="+15%"
              direction="up"
              polarity="up-is-bad"
              changeText="from 1,977 in 2015 · 6,000 GP pledge unmet"
              sparklineData={[0, 1.6, 3.3, 5.2, 6.8, 8.7, 10.8, 12.6, 14.1, 15.1]}
              source="NHS Digital — GP Workforce Statistics, 2024"
            />
            <MetricCard
              label="Most deprived area list size"
              value="2,710"
              direction="up"
              polarity="up-is-bad"
              changeText="40% above national average · inverse care law"
              sparklineData={[2480, 2530, 2580, 2630, 2680, 2710]}
              source="NHS Digital — GP Registered Patients by Deprivation, 2024"
            />
          </div>
        </section>

        <ScrollReveal>
          <section id="sec-trend" className="mb-12">
            <LineChart
              title="Average GP list size, England, 2015–2024 (patients per FTE GP)"
              subtitle="Registered patients divided by GP full-time equivalent. Includes GP partners, salaried GPs and regular locums. BMA maximum recommendation: 1,500 patients."
              series={listSizeSeries}
              annotations={listAnnotations}
              targetLine={listTarget}
              yLabel="Patients per GP FTE"
              source={{
                name: 'NHS Digital',
                dataset: 'General Practice Workforce / Patients Registered at a GP Practice',
                frequency: 'annual',
                url: 'https://digital.nhs.uk/data-and-information/publications/statistical/general-and-personal-medical-services',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-deprivation" className="mb-12">
            <LineChart
              title="GP list size by deprivation quintile, 2019–2024 (patients per FTE GP)"
              subtitle="Average list size for practices in the most and least deprived quintiles compared to the national average. The inverse care law: those with most need have fewest GPs."
              series={deprivationSeries}
              yLabel="Patients per GP FTE"
              source={{
                name: 'NHS Digital',
                dataset: 'Patients Registered at a GP Practice — deprivation analysis',
                frequency: 'annual',
                url: 'https://digital.nhs.uk/data-and-information/publications/statistical/patients-registered-at-a-gp-practice',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="New Roles Funded"
            value="30,000"
            description="The Additional Roles Reimbursement Scheme (ARRS) has funded over 30,000 new roles in primary care networks including pharmacists, physiotherapists, and social prescribing link workers. While these roles do not replace GPs, they handle a substantial share of consultations that would otherwise fall to doctors, providing some relief to list-size pressures."
            source="NHS England, Additional Roles Reimbursement Scheme"
          />
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-context" className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The data on GP list sizes</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>The average GP in England now looks after 2,275 patients — 15% more than in 2015. The BMA recommends a maximum of 1,500 patients per GP, a threshold that most practices in England substantially exceed. In the most deprived areas, average list sizes approach 2,710 — 40% above the national average and nearly double the recommended maximum. This is the inverse care law in action: those with the greatest health needs, highest morbidity, and most complex circumstances receive primary care from the most stretched doctors.</p>
              <p>The government committed in 2019 to recruit 6,000 additional GPs by 2024. That target was not met. GP numbers in full-time equivalent terms have remained roughly flat while the patient population has grown. Around 40% of the current GP workforce is over 50, and younger entrants to general practice are more likely to work part-time. Burnout rates are high: BMA surveys find over 40% of GPs report feeling at risk of or already experiencing burnout, and the average number of daily consultations — around 38 — significantly exceeds the 25-contact safety threshold referenced in GMC guidance.</p>
              <p>Large list sizes have measurable consequences. BMJ research associates list sizes above 2,000 with higher rates of missed diagnoses, more unplanned hospital admissions, and lower patient satisfaction. The system is self-reinforcing: high workloads drive early retirement and career changes, leaving remaining colleagues with larger lists still. International recruitment has added some GPs but has not bridged the gap, and cannot on its own address the structural mismatch between the size of the patient population and the primary care workforce available to serve it.</p>
            </div>
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p><a href="https://digital.nhs.uk/data-and-information/publications/statistical/general-and-personal-medical-services" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS Digital</a> — General Practice Workforce Statistics. Published monthly. GP FTE calculated from October snapshot each year.</p>
            <p><a href="https://digital.nhs.uk/data-and-information/publications/statistical/patients-registered-at-a-gp-practice" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS Digital</a> — Patients Registered at a GP Practice. Published quarterly. October snapshot used to match workforce data.</p>
            <p>List size calculated by dividing total registered patients by total GP FTE. Deprivation quintile analysis uses Index of Multiple Deprivation (IMD) practice-level data. The 1,500 recommended maximum is BMA General Practitioners Committee guidance. Daily consultation average from BMA GP Workload Survey 2024.</p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
