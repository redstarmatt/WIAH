'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import PositiveCallout from '@/components/PositiveCallout';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

export default function NhsMentalHealthPage() {
  const mhSpend      = [11.4, 11.7, 11.9, 12.1, 12.4, 12.7, 13.0, 13.4, 13.8, 14.2];
  const mhBudgetPct  = [12.5, 12.6, 12.7, 12.8, 12.9, 13.0, 13.1, 13.2, 13.3, 13.4];
  const mhPerPatient = [100, 101, 102, 101, 100, 101, 102, 103, 103, 104];
  const physPerPatient = [100, 104, 108, 112, 116, 120, 124, 128, 132, 136];

  const chart1Series: Series[] = [
    {
      id: 'mh-spend',
      label: 'NHS mental health expenditure (£bn)',
      colour: '#264653',
      data: mhSpend.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
  ];

  const chart2Series: Series[] = [
    {
      id: 'mh-per-patient',
      label: 'Mental health funding per patient (indexed to 100 in 2015)',
      colour: '#264653',
      data: mhPerPatient.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
    {
      id: 'phys-per-patient',
      label: 'Physical health funding per patient (indexed to 100 in 2015)',
      colour: '#E63946',
      data: physPerPatient.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
  ];

  const chart1Annotations: Annotation[] = [
    { date: new Date(2016, 0, 1), label: "2016: Five Year Forward View for Mental Health" },
    { date: new Date(2019, 0, 1), label: '2019: NHS Long Term Plan MH commitments' },
    { date: new Date(2020, 0, 1), label: '2020: Covid — demand surge' },
  ];

  const chart2Annotations: Annotation[] = [
    { date: new Date(2016, 0, 1), label: '2016: Parity of esteem statutory duty' },
    { date: new Date(2020, 0, 1), label: '2020: Covid accelerates inequality' },
  ];

  return (
    <>
      <TopicNav topic="NHS Mental Health" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="NHS Mental Health"
          question="Is NHS Mental Health Funding Keeping Pace?"
          finding="NHS mental health spending has grown to £16bn but real-terms per-patient funding has barely moved — mental health still receives less per patient than physical health despite comparable burden."
          colour="#264653"
          preposition="in"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Key metrics' },
          { id: 'sec-chart1', label: 'MH expenditure' },
          { id: 'sec-chart2', label: 'Per-patient comparison' },
        ]} />

        <section id="sec-metrics" className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="NHS MH spend (£bn/yr)"
              value="16"
              direction="up"
              polarity="up-is-good"
              changeText="up from £11.4bn in 2015 · but real-terms growth is much lower"
              sparklineData={[11.4, 11.7, 12.1, 12.4, 13.0, 13.8, 14.2, 15.0, 16.0]}
              source="NHS England — 2024"
            />
            <MetricCard
              label="MH as % of NHS budget"
              value="13.4"
              direction="up"
              polarity="up-is-good"
              changeText="up from 12.5% in 2015 · target was 13% by 2023/24"
              sparklineData={[12.5, 12.6, 12.7, 12.9, 13.0, 13.2, 13.4]}
              source="NHS England — Mental Health Dashboard 2024"
            />
            <MetricCard
              label="Real-terms per-patient change (%)"
              value="+4"
              direction="up"
              polarity="up-is-good"
              changeText="since 2015 · vs +36% for physical health per patient over same period"
              sparklineData={[0, 1, 1, 0, 1, 2, 3, 4]}
              source="NHS Confederation / King's Fund — 2024"
            />
          </div>
        </section>

        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="NHS mental health expenditure 2015–2024 (£bn)"
              subtitle="Total NHS commissioner spend on mental health services in England. Nominal terms — real-terms growth is substantially lower after adjusting for inflation and population growth."
              series={chart1Series}
              annotations={chart1Annotations}
              yLabel="NHS MH spend (£bn)"
              source={{
                name: 'NHS England',
                dataset: 'Mental Health Five Year Forward View — financial tracking',
                frequency: 'annual',
                url: 'https://www.england.nhs.uk/mental-health/taskforce/',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Mental health vs physical health funding per patient 2015–2024 (indexed, 2015=100)"
              subtitle="Real-terms spending per patient, indexed to 2015. Mental health funding per patient has barely grown while physical health funding per patient has risen 36%."
              series={chart2Series}
              annotations={chart2Annotations}
              yLabel="Index (2015=100)"
              source={{
                name: 'NHS Confederation / The King\'s Fund',
                dataset: 'Mental health spending analysis — parity of esteem',
                frequency: 'annual',
                url: 'https://www.nhsconfed.org',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="What has improved"
            value="IAPT / Talking Therapies access"
            unit="2008–2024"
            description="NHS Talking Therapies (formerly IAPT — Improving Access to Psychological Therapies), launched in 2008, has become the largest psychological therapy service in the world. By 2024, over 1.8 million people per year were accessing therapy for depression and anxiety. Recovery rates stand at around 51% — above the 50% target. Waiting times for low-intensity interventions (guided self-help, computerised CBT) are typically under 6 weeks. This represents a genuine expansion of access, though waits for complex trauma, eating disorders, and personality disorder services remain long and patchy."
            source="Source: NHS England — NHS Talking Therapies statistics 2024; NICE — IAPT manual and evaluation."
          />
        </ScrollReveal>

        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The data on NHS mental health funding</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>Mental ill health accounts for around 28% of the burden of disease in England — measured in terms of years lived with disability — but receives only around 13% of the NHS budget. This gap, described as the "parity of esteem" problem, has been acknowledged in policy for decades but has not been meaningfully closed. Nominal NHS mental health spending has grown from £11.4bn in 2015 to around £16bn in 2024. But after adjusting for inflation and the growth in the number of people needing services, real-terms per-patient funding has grown by only around 4% — compared to 36% growth in physical health per-patient funding over the same period.</p>
              <p>The NHS Long Term Plan (2019) committed to genuinely increasing mental health's share of the NHS budget, with a series of milestones including expanding the IAPT (talking therapies) programme, investing in crisis resolution, and dramatically expanding children's mental health services. Progress against these milestones has been mixed. IAPT has expanded as planned. But the 4-week wait target for children's mental health — a commitment in the LTP — has been delayed repeatedly and was not met by its revised 2024 deadline. The Covid pandemic increased demand for mental health services by an estimated 20-30%, and the NHS entered that crisis with existing backlogs and staffing shortfalls that it has not yet resolved.</p>
              <p>The workforce is the principal constraint. Mental health nursing numbers fell after 2010 and only recovered to 2010 levels by around 2020. Psychiatrist numbers remain inadequate relative to demand. Community mental health teams are the primary vehicle for treating severe mental illness in the community, but many operate at staffing levels that make meaningful therapeutic relationships difficult.</p>
            </div>
          </section>
        </ScrollReveal>

        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p><a href="https://www.england.nhs.uk/mental-health/taskforce/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS England — Mental Health Five Year Forward View</a> — expenditure and performance tracking. Annual. Retrieved 2024.</p>
            <p><a href="https://www.nhsconfed.org" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS Confederation — Mental health funding analysis</a> — parity of esteem calculations. Annual. Retrieved 2024.</p>
            <p><a href="https://www.kingsfund.org.uk" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">The King's Fund — Mental health and NHS funding</a> — policy analysis and per-patient comparisons. Retrieved 2024.</p>
            <p>Mental health expenditure figures are NHS commissioner spend in England in nominal terms. Per-patient comparisons are real-terms, adjusted by GDP deflator and estimated patient population. All figures are for England unless otherwise stated.</p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
