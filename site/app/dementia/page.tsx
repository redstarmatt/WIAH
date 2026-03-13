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
  { num: 1, name: 'Alzheimer\'s Research UK', dataset: 'Dementia Statistics — prevalence and projections', url: 'https://www.alzheimersresearchuk.org/dementia-statistics/', date: '2024' },
  { num: 2, name: 'NHS England', dataset: 'Dementia diagnosis rate — monthly data', url: 'https://www.england.nhs.uk/mental-health/dementia/', date: '2024' },
  { num: 3, name: 'Alzheimer\'s Society', dataset: 'Dementia UK Report — economic cost and unpaid carer analysis', url: 'https://www.alzheimers.org.uk/about-us/policy-and-influencing/dementia-uk-report', date: '2024' },
];

export default function DementiaPage() {
  const prevalence     = [670, 700, 720, 740, 760, 790, 820, 850, 876, 900, 920, 940, 944];
  const diagnosisRate  = [42.0, 44.0, 48.0, 58.0, 62.0, 67.0, 67.5, 63.0, 60.5, 62.1, 63.5, 65.0, 66.8];
  const projections    = [944, 990, 1040, 1090, 1150, 1200, 1260, 1320, 1380, 1400];

  const chart1Series: Series[] = [
    {
      id: 'prevalence',
      label: 'Diagnosed dementia prevalence (thousands)',
      colour: '#6B7280',
      data: prevalence.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
    },
    {
      id: 'projection',
      label: '2040 projection (thousands)',
      colour: '#E5E7EB',
      data: projections.map((v, i) => ({ date: new Date(2023 + i, 0, 1), value: v })),
    },
  ];

  const chart2Series: Series[] = [
    {
      id: 'diag-rate',
      label: 'Dementia diagnosis rate (%)',
      colour: '#6B7280',
      data: diagnosisRate.map((v, i) => ({ date: new Date(2012 + i, 0, 1), value: v })),
    },
  ];

  const chart1Annotations: Annotation[] = [
    { date: new Date(2012, 0, 1), label: '2012: PM Dementia Challenge' },
    { date: new Date(2020, 0, 1), label: '2020: Covid disrupts diagnosis services' },
  ];

  const chart2Annotations: Annotation[] = [
    { date: new Date(2015, 0, 1), label: '2015: G8 dementia summit goals' },
    { date: new Date(2019, 0, 1), label: '2019: NHS LTP 66.7% diagnosis target' },
    { date: new Date(2020, 0, 1), label: '2020: Covid — diagnosis rate falls sharply' },
  ];

  const chart2TargetLine = { value: 66.7, label: 'NHS LTP target: 66.7% diagnosis rate' };

  return (
    <>
      <TopicNav topic="Dementia" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Dementia"
          question="Is Britain Prepared for the Dementia Crisis?"
          finding="944,000 people in the UK have dementia — set to reach 1.4 million by 2040 — yet dementia research is underfunded relative to cancer, and care costs fall disproportionately on families."
          colour="#6B7280"
          preposition="in"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Key metrics' },
          { id: 'sec-chart1', label: 'Prevalence & projection' },
          { id: 'sec-chart2', label: 'Diagnosis rate' },
        ]} />

        <section id="sec-metrics" className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="People with dementia (thousands)"
              value="944"
              direction="up"
              polarity="up-is-bad"
              changeText="up from 670k in 2010 · projected 1.4m by 2040"
              sparklineData={[670, 700, 740, 790, 820, 876, 920, 944]}
              source="Alzheimer's Research UK / ONS — 2024"
            />
            <MetricCard
              label="Dementia diagnosis rate (%)"
              value="66.8"
              direction="up"
              polarity="up-is-good"
              changeText="recovering toward 66.7% NHS LTP target · fell to 60% during Covid"
              sparklineData={[42, 48, 62, 67, 67, 60, 63, 67]}
              source="NHS England — 2024"
            />
            <MetricCard
              label="Unpaid care value (£bn/yr)"
              value="18.5"
              direction="up"
              polarity="up-is-bad"
              changeText="families bear most of the cost of dementia care · NHS cost £4.3bn"
              sparklineData={[12, 13, 14, 15, 16, 17, 18, 18.5]}
              source="Alzheimer's Society — 2024"
            />
          </div>
        </section>

        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Dementia prevalence in UK 2010–2024 (thousands) with 2040 projection"
              subtitle="Diagnosed dementia cases. Projected growth to 1.4 million by 2040 driven by ageing population. Projection shown in grey from 2023 onwards."
              series={chart1Series}
              annotations={chart1Annotations}
              yLabel="People with dementia (thousands)"
              source={{
                name: "Alzheimer's Research UK / NHS England",
                dataset: 'Dementia prevalence and projections',
                frequency: 'annual',
                url: 'https://www.alzheimersresearchuk.org/dementia-statistics/',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Dementia diagnosis rate 2012–2024 (%)"
              subtitle="Share of estimated dementia cases that have a formal diagnosis recorded. NHS Long Term Plan target: 66.7%. Covid caused a sharp temporary decline."
              series={chart2Series}
              annotations={chart2Annotations}
              targetLine={chart2TargetLine}
              yLabel="Dementia diagnosis rate (%)"
              source={{
                name: 'NHS England',
                dataset: 'Dementia diagnosis rate — monthly data',
                frequency: 'monthly',
                url: 'https://www.england.nhs.uk/mental-health/dementia/',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="Research breakthrough"
            value="First disease-modifying treatments approved"
            unit="2023–2024"
            description="Lecanemab (Leqembi), a monoclonal antibody targeting amyloid plaques in the brain, became the first disease-modifying Alzheimer's treatment approved in the US (2023) and is under MHRA review in the UK. Clinical trials show a modest but statistically significant slowing of cognitive decline in early-stage Alzheimer's disease — the first time any treatment has altered the underlying disease course. The drug is expensive (approximately $26,500 per year in the US) and suitable only for a subset of early-stage patients. But after decades in which every drug trial failed, this represents a genuine turning point in Alzheimer's research."
            source="Source: FDA — Lecanemab approval 2023; MHRA review status; Alzheimer's Research UK — drug pipeline 2024."
          />
        </ScrollReveal>

        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The data on dementia</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>Dementia is the leading cause of death in England and Wales and the condition that people over 65 most fear. Around 944,000 people in the UK currently have dementia, a number that will grow to an estimated 1.4 million by 2040 as the population ages.<Cite nums={1} /> The Alzheimer's Society estimates the total cost of dementia to the UK economy at £42bn per year — of which only £4.3bn falls on the NHS. The rest is borne by social care systems (£15.7bn) and unpaid family carers (£18.5bn).<Cite nums={3} /> Families, disproportionately women, provide the bulk of dementia care without payment, training, or respite.</p>
              <p>The UK diagnosis rate — the share of estimated dementia cases that have a recorded formal diagnosis — has improved from around 42% in 2012 to just below the 66.7% NHS Long Term Plan target.<Cite nums={2} /> This matters enormously: people with a diagnosis can access post-diagnostic support services, plan their care, and (where applicable) access treatments. People without a diagnosis receive none of this. The diagnosis rate fell sharply during the Covid pandemic as memory clinics closed and GP consultations became harder to access for complex assessments, and has been slowly recovering since.<Cite nums={2} /></p>
              <p>Research funding for dementia has historically lagged far behind its burden. Cancer research in the UK receives approximately four times as much public and charitable funding per death as dementia.<Cite nums={1} /> The gap has narrowed since the 2012 G8 Dementia Summit and subsequent UK government commitments, but remains large. The promising clinical pipeline for disease-modifying treatments — drugs that slow or halt the disease rather than just manage symptoms — makes this funding shortfall increasingly costly.</p>
            </div>
          </section>
        </ScrollReveal>

        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p><a href="https://www.alzheimersresearchuk.org/dementia-statistics/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Alzheimer's Research UK — Dementia Statistics</a> — prevalence and projections. Annual. Retrieved 2024.</p>
            <p><a href="https://www.england.nhs.uk/mental-health/dementia/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS England — Dementia</a> — diagnosis rate monthly data and NHS LTP targets. Monthly. Retrieved 2024.</p>
            <p><a href="https://www.alzheimers.org.uk/about-us/policy-and-influencing/dementia-uk-report" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Alzheimer's Society — Dementia UK Report</a> — economic cost and unpaid carer analysis. Retrieved 2024.</p>
            <p>Dementia prevalence is estimated from modelled data (Alzheimer's Research UK / MRC). The diagnosis rate is calculated by NHS England as diagnosed cases divided by estimated prevalence. Unpaid care valuation uses ONS replacement cost methodology. All figures are for the UK unless otherwise stated.</p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
