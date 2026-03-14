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
  { num: 1, name: 'ONS', dataset: 'Labour Force Survey — Economic Inactivity', url: 'https://www.ons.gov.uk/employmentandlabourmarket/peoplenotinwork/economicinactivity', date: '2024' },
  { num: 2, name: 'Resolution Foundation', dataset: 'The Great Retirement? Economic Inactivity', url: 'https://www.resolutionfoundation.org/', date: '2024' },
  { num: 3, name: 'ONS', dataset: 'Sickness Absence in the UK Labour Market', url: 'https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/labourproductivity/articles/sicknessabsenceinthelabourmarket/2024', date: '2024' },
];

const inactivityRateValues = [21.8, 21.5, 21.2, 20.9, 20.6, 20.4, 21.8, 22.1, 22.4, 22.1, 21.9];
const longTermSickValues = [1800, 1820, 1840, 1860, 1890, 1920, 2100, 2380, 2640, 2720, 2750];
const studentInactiveValues = [2.1, 2.1, 2.2, 2.2, 2.3, 2.1, 2.3, 2.4, 2.4, 2.3, 2.3];
const caringInactiveValues = [1.8, 1.9, 1.9, 1.8, 1.7, 1.6, 1.7, 1.8, 1.9, 2.0, 2.1];

const series1: Series[] = [
  { id: 'rate', label: 'Economic inactivity rate (%)', colour: '#6B7280', data: inactivityRateValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
  { id: 'sick', label: 'Inactive due to long-term sickness (thousands)', colour: '#E63946', data: longTermSickValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
];

const series2: Series[] = [
  { id: 'student', label: 'Inactive students (millions)', colour: '#264653', data: studentInactiveValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
  { id: 'caring', label: 'Inactive due to caring responsibilities (millions)', colour: '#F4A261', data: caringInactiveValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
];

const annotations1: Annotation[] = [
  { date: new Date(2020, 2, 1), label: '2020: COVID — furlough masked inactivity' },
  { date: new Date(2021, 5, 1), label: '2021: Post-COVID sickness surge' },
];

export default function EconomicInactivityCausesPage() {
  return (
    <>
      <TopicNav topic="Economic Inactivity" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Economy & Work"
          question="Why Have So Many People Left the Labour Market?"
          finding={<>Around 9.3 million people of working age in the UK are economically inactive — neither working nor looking for work. Of these, 2.75 million cite long-term sickness as the primary reason, up from 1.8 million in 2013 and the highest level on record — a post-pandemic surge driven by mental health conditions, musculoskeletal problems, and long COVID.<Cite nums={[1, 3]} /></>}
          colour="#6B7280"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Economic inactivity — the share of the working-age population neither employed nor seeking work — is a defining challenge for UK economic policy. The UK's inactivity rate of 21.9% is higher than most comparable economies and has not returned to pre-pandemic levels. The single largest and fastest-growing reason for inactivity is long-term sickness: nearly 2.75 million working-age adults cite ill-health as the reason they are not in work, up from 1.8 million in 2013.<Cite nums={1} /> This is not simply an ageing effect — the rise is concentrated among people aged 25–54, the core working years, and is driven primarily by mental health conditions (depression, anxiety, PTSD) and musculoskeletal problems, with long COVID adding a new and poorly understood category of workers unable to sustain employment.<Cite nums={3} /></p>
            <p>The Resolution Foundation has described this as the &quot;great sickness&quot; — distinct from the earlier &quot;great retirement&quot; of older workers following COVID. The NHS waiting list crisis has compounded the problem: people waiting for mental health treatment, surgery for joint pain, or diagnostic investigations cannot work and may remain economically inactive for months or years. DWP estimates that bringing the inactive sick back into employment at even half the pre-pandemic rate would add around 200,000 workers to the labour force annually — contributing materially to productivity and reducing welfare costs. But the principal barrier is health, not motivation: the most effective interventions are occupational health support, early access to talking therapies, and supported employment programmes — none of which is currently available at sufficient scale.<Cite nums={[2, 3]} /></p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Overview' },
          { id: 'sec-chart1', label: 'Inactivity Rate & Sickness' },
          { id: 'sec-chart2', label: 'Students & Carers' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard label="Economic inactivity rate" value="21.9%" unit="of working-age population" direction="up" polarity="up-is-bad" changeText="was 20.6% pre-pandemic · 9.3M people inactive" sparklineData={[21.8, 21.5, 21.2, 20.9, 20.6, 20.4, 21.8, 22.1, 22.4, 22.1, 21.9]} source="ONS — Labour Force Survey 2024" href="#sec-chart1" />
            <MetricCard label="Inactive due to long-term sickness" value="2.75M" unit="people" direction="up" polarity="up-is-bad" changeText="up from 1.8M in 2013 · highest ever · mental health dominates" sparklineData={[1800, 1820, 1840, 1860, 1890, 1920, 2100, 2380, 2640, 2720, 2750]} source="ONS — Labour Force Survey 2024" href="#sec-chart1" />
            <MetricCard label="Inactive carers" value="2.1M" unit="people" direction="up" polarity="up-is-bad" changeText="up from 1.8M in 2013 · mostly women · unpaid care work" sparklineData={[1.8, 1.9, 1.9, 1.8, 1.7, 1.6, 1.7, 1.8, 1.9, 2.0, 2.1]} source="ONS — Labour Force Survey 2024" href="#sec-chart2" />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Economic inactivity rate and long-term sickness, UK, 2013–2024"
              subtitle="Working-age economic inactivity rate (%) and number inactive due to long-term sickness (thousands). The sickness rise is the defining post-pandemic labour market story — particularly among under-55s."
              series={series1}
              annotations={annotations1}
              yLabel="% / Thousands"
              source={{ name: 'ONS', dataset: 'Labour Force Survey — Economic Inactivity', url: 'https://www.ons.gov.uk/employmentandlabourmarket/peoplenotinwork/economicinactivity', frequency: 'quarterly', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Students and carers as components of economic inactivity, 2013–2024"
              subtitle="Economically inactive students (millions) and those inactive due to caring responsibilities (millions). Caring inactivity has risen since COVID as social care gaps force more family members to provide unpaid care."
              series={series2}
              annotations={[]}
              yLabel="Millions"
              source={{ name: 'ONS', dataset: 'Labour Force Survey — Economic Inactivity', url: 'https://www.ons.gov.uk/employmentandlabourmarket/peoplenotinwork/economicinactivity', frequency: 'quarterly', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Individual Placement and Support reduces sickness inactivity"
            value="2x"
            unit="more effective than traditional employment support for people with mental illness"
            description="Individual Placement and Support (IPS) — a model that embeds employment advisers within mental health teams to help people with mental health conditions find and sustain competitive employment — has been shown to be twice as effective as traditional employment support services in randomised controlled trials. The model, which originated in the US, is now being scaled in England through NHS mental health services. Early evidence from UK rollouts shows that IPS significantly increases employment rates and reduces time on benefits for people with severe mental illness."
            source="Source: NHS England — IPS Employment Services 2024. Resolution Foundation 2024."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.ons.gov.uk/employmentandlabourmarket/peoplenotinwork/economicinactivity" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ONS — Labour Force Survey</a> — economic inactivity by reason, age, sex, region. Quarterly.</p>
            <p><a href="https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/labourproductivity/articles/sicknessabsenceinthelabourmarket/2024" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ONS — Sickness Absence in the UK Labour Market</a> — sickness absence rates, conditions. Annual.</p>
            <p>Economic inactivity is defined as people aged 16–64 who are not in employment and not seeking or available for work. Reasons are self-reported in the Labour Force Survey.</p>
          </div>
        </section>
      </main>
    </>
  );
}
