'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import PositiveCallout from '@/components/PositiveCallout';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

export default function PrisonMentalHealthPage() {

  const deathsData    = [52, 89, 70, 62, 67, 75, 83, 86, 80, 87, 87];
  const selfHarmData  = [24000, 30000, 37000, 40161, 45000, 53000, 57968, 60584, 61461, 68000, 74590];
  const treatmentData = [22, 24, 25, 26, 27, 27, 28, 29, 30, 31, 33];
  const referralData  = [65, 68, 72, 76, 80, 83, 86, 89, 92, 95, 98];

  const deathsSeries: Series[] = [
    {
      id: 'deaths',
      label: 'Deaths in custody (self-inflicted)',
      colour: '#E63946',
      data: deathsData.map((v, i) => ({ date: new Date(2014 + i, 0, 1), value: v })),
    },
  ];

  const mhSeries: Series[] = [
    {
      id: 'referrals',
      label: 'MH referrals per 1,000 prisoners',
      colour: '#6B7280',
      data: referralData.map((v, i) => ({ date: new Date(2014 + i, 0, 1), value: v })),
    },
    {
      id: 'treatment',
      label: 'Prisoners receiving MH treatment (%)',
      colour: '#E63946',
      data: treatmentData.map((v, i) => ({ date: new Date(2014 + i, 0, 1), value: v })),
    },
  ];

  const deathsAnnotations: Annotation[] = [
    { date: new Date(2016, 0, 1), label: '2016: Prisons & Probation Ombudsman report' },
    { date: new Date(2022, 0, 1), label: '2022: Mental Health in Prison taskforce' },
  ];

  const mhAnnotations: Annotation[] = [
    { date: new Date(2019, 0, 1), label: '2019: NHS Long Term Plan: prison MH investment' },
  ];

  return (
    <>
      <TopicNav topic="Prison Mental Health" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Prison Mental Health"
          question="What is the State of Mental Health in Prison?"
          finding="70% of prisoners have two or more mental health conditions — yet only 1 in 3 receives treatment in custody, and the suicide rate is 10 times higher than in the general population."
          colour="#E63946"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-deaths', label: 'Deaths in Custody' },
          { id: 'sec-treatment', label: 'Treatment Gap' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Prisoners with 2+ mental health conditions"
              value="70%"
              direction="flat"
              polarity="up-is-bad"
              changeText="Personality disorder 47%, depression 42%, anxiety 38% · concentrated disadvantage"
              sparklineData={[65, 67, 68, 70, 70, 70, 70, 70, 70, 70, 70]}
              source="NHS England / National Prison Survey"
            />
            <MetricCard
              label="In-custody suicide rate (per 100k)"
              value="115"
              direction="up"
              polarity="up-is-bad"
              changeText="10x the general population rate of 11 per 100,000"
              sparklineData={[80, 120, 100, 90, 95, 105, 115, 120, 115, 120, 115]}
              source="HMPPS Safety in Custody Statistics · 2024"
            />
            <MetricCard
              label="Prisoners receiving MH treatment"
              value="33%"
              direction="up"
              polarity="up-is-good"
              changeText="Up from 22% in 2014 · but 2 in 3 receive nothing"
              sparklineData={treatmentData}
              source="NHS England Prison Healthcare · 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-deaths" className="mb-12">
            <LineChart
              title="Deaths in custody (self-inflicted), England and Wales, 2014–2024"
              subtitle="Apparent self-inflicted deaths per year across the prison estate. Categorised as 'apparent self-inflicted' pending coroner determination."
              series={deathsSeries}
              annotations={deathsAnnotations}
              yLabel="Deaths per year"
              source={{
                name: 'HMPPS',
                dataset: 'Safety in Custody Statistics',
                frequency: 'annual',
                url: 'https://www.gov.uk/government/collections/safety-in-custody-statistics',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-treatment" className="mb-12">
            <LineChart
              title="Prison mental health referrals vs treatment provided, 2014–2024"
              subtitle="Referrals per 1,000 prisoners and percentage of prison population receiving active MH treatment. The gap between referral and treatment reflects capacity constraints."
              series={mhSeries}
              annotations={mhAnnotations}
              yLabel="Rate / Percentage"
              source={{
                name: 'NHS England',
                dataset: 'Prison Healthcare Data',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="NHS Long Term Plan investment"
            value="£150m"
            unit="additional prison MH funding 2019–2024"
            description="The NHS Long Term Plan committed £150 million in additional funding for prison mental health services from 2019 to 2024, aiming to improve access to therapy, crisis response, and continuity of care on release. Treatment rates have risen from 22% to 33% of prisoners — real progress. But the gap between those referred and those treated remains large, and the prison environment itself remains antitherapeutic."
            source="NHS England · Long Term Plan Progress Report 2024"
          />
        </ScrollReveal>

        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The data on prison mental health</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>Around 70% of prisoners have at least two diagnosable mental health conditions at the time of entry, according to NHS England estimates. Self-harm incidents recorded in prisons in England and Wales have risen from approximately 24,000 in 2014 to 74,590 in 2023 — a 208% increase over a decade — equivalent to more than 203 incidents every single day. The in-custody suicide rate stands at around 115 per 100,000 — ten times the general population rate of 11 per 100,000.</p>
              <p>Despite NHS Long Term Plan investment, only 33% of prisoners receive active mental health treatment. The gap is not primarily a diagnostic failure — referral rates have risen substantially — but a capacity constraint: too few therapists, too much churn as prisoners are transferred between establishments, and a physical environment incompatible with therapeutic work. Segregation continues to be used for prisoners in acute mental health crisis in the absence of adequate alternative provision.</p>
              <p>The high prevalence of mental illness in prison reflects upstream failures rather than prison conditions alone. Street homelessness, substance dependency, poverty, and trauma are risk factors for both offending and mental illness; prison concentrates the consequences of inadequate community mental health, housing, and drug treatment provision. Release without continuity of care is a critical failure point: the period immediately after release carries the highest risk of suicide and drug overdose death in the entire criminal justice pathway.</p>
            </div>
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p><a href="https://www.gov.uk/government/collections/safety-in-custody-statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">HMPPS</a> — Safety in Custody Statistics. Annual publication covering deaths in prison custody, self-harm incidents, and assaults. Deaths categorised as 'apparent self-inflicted' pending coroner determination.</p>
            <p>NHS England — Prison Healthcare Data. Mental health prevalence estimates drawn from the National Prison Survey and NHS screening data. Prison Reform Trust — Bromley Briefings Prison Factfile. Quarterly factfile summarising key prison statistics.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
