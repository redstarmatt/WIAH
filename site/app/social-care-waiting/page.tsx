'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import PositiveCallout from '@/components/PositiveCallout';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

export default function SocialCareWaitingPage() {

  const waitingData  = [250, 265, 280, 295, 310, 340, 375, 400, 415, 420, 400];
  const unmetNeedData = [900, 950, 1000, 1050, 1100, 1200, 1350, 1450, 1500, 1520, 1480];

  const waitingSeries: Series[] = [
    {
      id: 'waiting',
      label: 'People waiting for social care assessment or service (thousands)',
      colour: '#E63946',
      data: waitingData.map((v, i) => ({ date: new Date(2014 + i, 0, 1), value: v })),
    },
  ];

  const unmetNeedSeries: Series[] = [
    {
      id: 'unmet-need',
      label: 'Estimated people with unmet social care needs (thousands)',
      colour: '#E63946',
      data: unmetNeedData.map((v, i) => ({ date: new Date(2014 + i, 0, 1), value: v })),
    },
  ];

  const waitingAnnotations: Annotation[] = [
    { date: new Date(2020, 0, 1), label: '2020: Pandemic halts assessments' },
    { date: new Date(2021, 0, 1), label: '2021: Care Act easements lifted — backlog surges' },
  ];

  const unmetNeedAnnotations: Annotation[] = [
    { date: new Date(2014, 0, 1), label: '2014: Care Act defines eligibility threshold' },
  ];

  return (
    <>
      <TopicNav topic="Social Care Waiting" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Social Care Waiting"
          question="How Long Do People Wait for Social Care?"
          finding="400,000 people are waiting for a social care assessment — some waiting over a year — while 500,000 with unmet needs receive no support at all."
          colour="#E63946"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-waiting', label: 'Waiting Trend' },
          { id: 'sec-unmet', label: 'Unmet Need' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="People waiting for assessment"
              value="400,000"
              direction="up"
              polarity="up-is-bad"
              changeText="Up from 250,000 in 2014 · pandemic backlog never cleared"
              sparklineData={waitingData}
              source="ADASS Autumn Survey · 2024"
            />
            <MetricCard
              label="Median wait for assessment"
              value="16 weeks"
              direction="up"
              polarity="up-is-bad"
              changeText="Up from 8 weeks pre-pandemic · some wait over a year"
              sparklineData={[8, 8, 9, 9, 10, 12, 16, 18, 16, 17, 16]}
              source="ADASS / NHS Confederation · 2024"
            />
            <MetricCard
              label="People with unmet social care needs"
              value="500,000"
              direction="up"
              polarity="up-is-bad"
              changeText="Not in any queue — assessed ineligible or never applied"
              sparklineData={[350, 370, 400, 430, 450, 480, 490, 500, 510, 520, 500]}
              source="Age UK / NHS Confederation · 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-waiting" className="mb-12">
            <LineChart
              title="Social care waiting list, England, 2014–2024"
              subtitle="Total number of adults waiting for a needs assessment or for an agreed service to start (thousands)."
              series={waitingSeries}
              annotations={waitingAnnotations}
              yLabel="People waiting (thousands)"
              source={{
                name: 'ADASS',
                dataset: 'Autumn Survey of Adult Social Care Directors',
                frequency: 'annual',
                url: 'https://www.adass.org.uk/adass-autumn-survey',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-unmet" className="mb-12">
            <LineChart
              title="Estimated unmet social care need, England, 2014–2024"
              subtitle="People who need social care support but are not receiving it — whether waiting, assessed ineligible, or not in the system (thousands). Modelled estimate."
              series={unmetNeedSeries}
              annotations={unmetNeedAnnotations}
              yLabel="People with unmet need (thousands)"
              source={{
                name: 'Age UK / NHS Confederation',
                dataset: 'Later Life in the United Kingdom — unmet need modelling',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="Delayed discharge reduction"
            value="13,000"
            unit="hospital beds blocked daily by social care delays"
            description="Around 13,000 people occupy NHS hospital beds on any given day who are medically fit for discharge but cannot leave because no safe care package exists. This costs the NHS an estimated 120,000 bed-days per month and drives A&E waiting times and ambulance handover delays. Reducing delayed discharge is one of the highest-value interventions available to the NHS — but it requires adequate social care capacity, not more hospital funding."
            source="NHS England · Discharge Statistics 2024"
          />
        </ScrollReveal>

        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The data on social care waiting</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>An estimated 400,000 people in England are currently waiting for either a social care needs assessment or for a service to begin following a completed assessment — up from 250,000 in 2014, with a sharp pandemic-driven acceleration that has never been fully cleared. One in three has been waiting more than six months: six months without personal care means family members leaving paid work to care informally, older people unable to wash or leave home, and conditions deteriorating until far more expensive residential care becomes unavoidable.</p>
              <p>The 400,000 waiting substantially understates the true scale of need. An estimated 500,000 people need care but are not receiving it and are not in any assessment queue — people who were assessed as ineligible under the Care Act 2014's 'substantial' needs threshold, who self-funded until their assets ran out, or who have not sought help. The median wait for an assessment has risen from 8 weeks before the pandemic to 16 weeks in 2024, with some local authorities reporting waits of over a year.</p>
              <p>The assessment backlog is driven by workforce shortages: local authority assessment teams have been cut as council budgets contracted under a decade of real-terms funding reductions. Multiple reform commitments — including the 2021 Health and Social Care Levy funds, initially intended partly for social care — have been diverted to NHS recovery rather than community services. ADASS, the King's Fund, and the Health Foundation estimate that addressing the assessment backlog alone would require an additional £7 billion in annual funding.</p>
            </div>
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p><a href="https://www.adass.org.uk/adass-autumn-survey" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ADASS</a> — Autumn Survey of Adult Social Care Directors. Annual survey of all 153 English local authorities with adult social care responsibilities. Response rates above 90%.</p>
            <p>NHS England — Discharge delays and delayed transfer of care statistics. Monthly data on patients medically fit for discharge awaiting social care. Age UK — Later Life in the United Kingdom. Annual factsheet covering social care waiting and unmet need estimates. Unmet need estimates are modelled from population survey data and care receipt records; they are indicative rather than exact counts.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
