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
  { num: 1, name: 'NHS England', dataset: 'Diagnostics Waiting Times and Activity', url: 'https://www.england.nhs.uk/statistics/statistical-work-areas/diagnostics-waiting-times-and-activity/', date: '2024' },
  { num: 2, name: 'Royal College of Radiologists', dataset: 'Clinical Radiology Workforce Census', url: 'https://www.rcr.ac.uk/clinical-radiology/being-consultant/rcr-consultant-census/', date: '2024' },
];

export default function DiagnosticImagingWaitsPage() {
  // Chart 1: Diagnostic imaging waiting list 2015-2024 (millions)
  const waitingListData = [1.4, 1.5, 1.6, 1.7, 1.8, 2.4, 3.8, 4.5, 4.3, 4.2];
  const waitingListSeries: Series[] = [
    {
      id: 'waitlist',
      label: 'Diagnostic waiting list (millions)',
      colour: '#E63946',
      data: waitingListData.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
  ];
  const waitingListAnnotations: Annotation[] = [
    { date: new Date(2020, 0, 1), label: '2020: COVID-19 suspends routine diagnostics' },
    { date: new Date(2022, 0, 1), label: '2022: Community Diagnostic Centres launched' },
  ];

  // Chart 2: % waiting over 6 weeks for diagnostics 2018-2024
  const over6wData = [1.9, 3.2, 18.7, 14.8, 10.2, 7.6, 5.9];
  const over6wSeries: Series[] = [
    {
      id: 'over6w',
      label: '% waiting over 6 weeks',
      colour: '#E63946',
      data: over6wData.map((v, i) => ({ date: new Date(2018 + i, 0, 1), value: v })),
    },
  ];
  const over6wTargetLine = { value: 1.0, label: 'Pre-pandemic level (1%)' };

  return (
    <>
      <TopicNav topic="Diagnostic Imaging Waits" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Diagnostic Imaging Waits"
          question="How Long Do People Wait for Scans?"
          finding="4.2 million diagnostic tests are waiting — a record — with MRI waits exceeding 13 weeks in some trusts, delaying cancer and heart disease diagnosis."
          colour="#E63946"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Key figures' },
          { id: 'sec-waitlist', label: 'Waiting list' },
          { id: 'sec-over6w', label: '6-week waits' },
          { id: 'sec-context', label: 'Context' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <section id="sec-metrics" className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Diagnostic waiting list"
              value="4.2m"
              direction="up"
              polarity="up-is-bad"
              changeText="record high · 3× pre-pandemic level"
              sparklineData={[1.4, 1.6, 1.8, 2.4, 3.8, 4.5, 4.3, 4.2]}
              source="NHS England — Diagnostics Waiting Times, Jan 2024"
            />
            <MetricCard
              label="Waiting over 6 weeks"
              value="5.9%"
              direction="down"
              polarity="up-is-bad"
              changeText="improving · still 3× pre-pandemic level of 1%"
              sparklineData={[1.9, 3.2, 18.7, 14.8, 10.2, 7.6, 5.9]}
              source="NHS England — Diagnostics Waiting Times, 2024"
            />
            <MetricCard
              label="Average MRI wait"
              value="8 weeks"
              direction="up"
              polarity="up-is-bad"
              changeText="vs 3.5-week target · 13+ weeks in worst trusts"
              sparklineData={[3.5, 3.6, 3.8, 6.2, 11.4, 10.8, 9.2, 8.0]}
              source="NHS England — Diagnostics Activity Statistics, 2024"
            />
          </div>
        </section>

        <ScrollReveal>
          <section id="sec-waitlist" className="mb-12">
            <LineChart
              title="Diagnostic imaging waiting list, England, 2015–2024 (millions)"
              subtitle="Total patients waiting for one of 15 key diagnostic tests including MRI, CT, endoscopy and echocardiography. Pre-pandemic growth accelerated sharply in 2020."
              series={waitingListSeries}
              annotations={waitingListAnnotations}
              yLabel="Patients waiting (millions)"
              source={{
                name: 'NHS England',
                dataset: 'Diagnostics Waiting Times and Activity',
                frequency: 'monthly',
                url: 'https://www.england.nhs.uk/statistics/statistical-work-areas/diagnostics-waiting-times-and-activity/',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-over6w" className="mb-12">
            <LineChart
              title="Patients waiting over 6 weeks for diagnostics, 2018–2024 (%)"
              subtitle="Share of diagnostic referrals exceeding the NHS 6-week constitutional standard. COVID-19 caused a sharp peak in 2020; recovery has been gradual."
              series={over6wSeries}
              targetLine={over6wTargetLine}
              yLabel="% waiting over 6 weeks"
              source={{
                name: 'NHS England',
                dataset: 'Diagnostics Waiting Times and Activity',
                frequency: 'monthly',
                url: 'https://www.england.nhs.uk/statistics/statistical-work-areas/diagnostics-waiting-times-and-activity/',
                date: 'Jan 2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="New Diagnostic Hubs"
            value="160"
            unit="centres"
            description="The Community Diagnostic Centres (CDC) programme has created over 160 new diagnostic hubs across England by 2024, adding significant MRI, CT and ultrasound capacity outside hospitals. Early evidence suggests CDCs are reaching patients who would not previously have attended hospital appointments, improving equity of access as well as throughput."
            source="NHS England, Community Diagnostic Centres Programme"
          />
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-context" className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The data on diagnostic imaging waits</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>England has fewer MRI scanners per capita than the OECD average, and fewer trained radiologists to read the scans that are produced.<Cite nums={2} /> Even before the pandemic, the diagnostic waiting list was growing — from 1.4 million in 2015 to 1.8 million by 2019.<Cite nums={1} /> COVID-19 suspension of routine diagnostics drove the waiting list to 4.5 million and pushed the proportion waiting beyond six weeks to 18.7%.<Cite nums={1} /> Recovery has been real but incomplete: by early 2024, the list stood at 4.2 million and 5.9% were waiting more than six weeks — still roughly three times the pre-pandemic rate.<Cite nums={1} /></p>
              <p>The consequences for cancer pathways are direct. Earlier diagnosis of cancer is one of the most powerful determinants of survival. MRI and CT delays mean more patients are diagnosed at advanced stage, requiring more intensive treatment with worse outcomes. The Royal College of Radiologists estimates a shortage of around 1,900 consultant radiologists — a gap that cannot be filled quickly given the seven-year training pipeline from medical school graduation.<Cite nums={2} /> Endoscopy capacity is similarly strained, with bowel cancer screening programmes competing with symptomatic referrals for limited colonoscopy slots.</p>
              <p>Regional variation is substantial. Trusts in London and the South East generally perform closer to the six-week standard; trusts in parts of the North and Midlands routinely see MRI waits of 13 weeks or more.<Cite nums={1} /> The Community Diagnostic Centres programme has added useful capacity but has not yet eliminated the backlog or the geographic inequity within it.</p>
            </div>
          </section>
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p><a href="https://www.england.nhs.uk/statistics/statistical-work-areas/diagnostics-waiting-times-and-activity/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS England</a> — Diagnostics Waiting Times and Activity. Published monthly. The 15 key diagnostic tests are defined in the NHS Constitution. Annual figures are derived from monthly snapshots (year-end or annual average).</p>
            <p><a href="https://www.rcr.ac.uk/clinical-radiology/being-consultant/rcr-consultant-census/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Royal College of Radiologists</a> — Clinical Radiology Workforce Census. Published annually.</p>
            <p>The 6-week standard is an NHS constitutional commitment. Waiting list figures represent all tests, not individual patients (a patient may be waiting for multiple tests). MRI median wait is derived from trust-level published data.</p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
