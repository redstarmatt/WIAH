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
  { num: 1, name: 'NHS England / NICE', dataset: 'Perinatal Mental Health Programme — Access and Outcomes Data', url: 'https://www.england.nhs.uk/mental-health/perinatal/', date: 'Jan 2026', note: '1 in 5 new mothers affected (~140,000/yr in England); detection rate risen from 38% to 51%' },
  { num: 2, name: 'NHS England', dataset: 'Perinatal Mental Health Waiting Times — ICB-level Returns', url: 'https://www.england.nhs.uk/mental-health/perinatal/', date: 'Jan 2026', note: 'National average wait 7.8 weeks; worst region exceeds 16 weeks; NHS standard is 4 weeks' },
  { num: 3, name: 'Centre for Mental Health / LSBU', dataset: 'Economic Cost of Perinatal Mental Illness', url: 'https://www.lsbu.ac.uk/research/centres/cmhp/perinatal-mental-health-economic-cost', date: 'Jan 2026', note: 'Long-run cost estimated at £8.1 billion per year' },
];

export default function PostnatalDepressionCarePage() {
  // PND detection and treatment rates 2015-2024 (%)
  const pndPrevalence  = [20, 20, 20, 20, 20, 20, 21, 21, 20, 20];
  const pndDetected    = [38, 40, 42, 44, 46, 47, 45, 48, 50, 51];
  const pndTreated     = [24, 26, 27, 28, 30, 31, 29, 32, 34, 35];

  // Perinatal MH waiting times by region 2019-2024 (weeks)
  const nationalAvgWait    = [5.2, 5.8, 7.1, 6.9, 7.4, 7.8];
  const bestRegionWait     = [2.1, 2.3, 2.8, 2.6, 2.9, 3.1];
  const worstRegionWait    = [10.4, 12.1, 16.3, 14.2, 15.8, 16.9];

  const detectionSeries: Series[] = [
    {
      id: 'prevalence',
      label: 'PND prevalence — estimated % of new mothers affected',
      colour: '#6B7280',
      data: pndPrevalence.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
    {
      id: 'detected',
      label: 'PND detected — % of new mothers identified by services',
      colour: '#F4A261',
      data: pndDetected.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
    {
      id: 'treated',
      label: 'PND treated — % of new mothers receiving evidence-based care',
      colour: '#2A9D8F',
      data: pndTreated.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
  ];

  const detectionAnnotations: Annotation[] = [
    { date: new Date(2017, 0, 1), label: '2017: NHS perinatal MH expansion programme begins' },
    { date: new Date(2020, 0, 1), label: '2020: COVID-19 — face-to-face screening paused' },
  ];

  const waitingTimeSeries: Series[] = [
    {
      id: 'national',
      label: 'National average wait (weeks)',
      colour: '#E63946',
      data: nationalAvgWait.map((v, i) => ({ date: new Date(2019 + i, 0, 1), value: v })),
    },
    {
      id: 'best',
      label: 'Best-performing region (weeks)',
      colour: '#2A9D8F',
      data: bestRegionWait.map((v, i) => ({ date: new Date(2019 + i, 0, 1), value: v })),
    },
    {
      id: 'worst',
      label: 'Worst-performing region (weeks)',
      colour: '#6B7280',
      data: worstRegionWait.map((v, i) => ({ date: new Date(2019 + i, 0, 1), value: v })),
    },
  ];

  const waitTargetLine = { value: 4, label: 'NHS access standard: 4 weeks' };

  return (
    <>
      <TopicNav topic="Postnatal Depression Care" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Postnatal Depression Care"
          question="Are New Mothers Getting Postnatal Depression Support?"
          finding="Around 1 in 5 new mothers experience postnatal depression, but half go undetected — perinatal mental health waiting times exceed 6 weeks in most areas."
          colour="#E63946"
          preposition="with"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Key metrics' },
          { id: 'sec-detection', label: 'Detection and treatment' },
          { id: 'sec-waits', label: 'Waiting times' },
          { id: 'sec-context', label: 'Context' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="PND prevalence — new mothers affected (%)"
              value="20"
              direction="flat"
              polarity="up-is-bad"
              changeText="stable at 1 in 5 · approximately 140,000 women per year in England"
              sparklineData={pndPrevalence}
              source="NICE / NHS England — Perinatal mental health prevalence estimates, 2024"
            />
            <MetricCard
              label="PND detection rate (% of affected mothers identified)"
              value="51"
              direction="up"
              polarity="up-is-good"
              changeText="up from 38% in 2015 · but still nearly half go undetected"
              sparklineData={pndDetected}
              source="NHS England — Perinatal mental health CQUIN data, 2024"
            />
            <MetricCard
              label="Average wait for specialist perinatal MH support (weeks)"
              value="7.8"
              direction="up"
              polarity="up-is-bad"
              changeText="up from 5.2 weeks in 2019 · NHS standard is 4 weeks"
              sparklineData={nationalAvgWait}
              source="NHS England — Perinatal mental health waiting time data, 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-detection" className="mb-12">
            <LineChart
              title="Postnatal depression: prevalence, detection and treatment rates, 2015–2024"
              subtitle="Estimated % of new mothers affected, identified, and receiving evidence-based care. England."
              series={detectionSeries}
              annotations={detectionAnnotations}
              yLabel="% of new mothers"
              source={{
                name: 'NHS England / NICE',
                dataset: 'Perinatal mental health programme — access and outcomes data',
                frequency: 'annual',
                url: 'https://www.england.nhs.uk/mental-health/perinatal/',
                date: 'Jan 2026',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-waits" className="mb-12">
            <LineChart
              title="Perinatal mental health service waiting times by region, 2019–2024"
              subtitle="Weeks from referral to first specialist appointment. National average, best and worst region. NHS standard: 4 weeks."
              series={waitingTimeSeries}
              targetLine={waitTargetLine}
              yLabel="Wait (weeks)"
              source={{
                name: 'NHS England',
                dataset: 'Perinatal mental health waiting times — ICB-level returns',
                frequency: 'quarterly',
                url: 'https://www.england.nhs.uk/mental-health/perinatal/',
                date: 'Jan 2026',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="Perinatal mental health investment is making a difference"
            value="66%"
            unit="of areas now have a specialist perinatal mental health team"
            description="In 2014, only a handful of areas in England had a specialist perinatal mental health team. Following sustained NHS investment — including the NHS Long Term Plan commitment to treat 30,000 additional women per year by 2024 — two-thirds of ICB areas now have a dedicated team. Detection rates are rising and more women are receiving evidence-based treatment. This is real progress from a very low base, demonstrating that targeted investment in a historically neglected area of women's health can yield measurable improvements."
            source="NHS England — Perinatal mental health programme, five-year progress report 2024"
          />
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-context" className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The data in context</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>Postnatal depression is one of the most common complications of childbirth: approximately one in five new mothers — around 140,000 women each year in England — will experience a perinatal mental health condition, ranging from postnatal depression and anxiety to, in rarer cases, postpartum psychosis.<Cite nums={1} /> Untreated perinatal mental health conditions carry serious consequences not just for mothers but for their children: secure attachment in infancy, early cognitive development, and long-term emotional regulation are all affected when maternal mental health goes unsupported. The economic case for treatment is overwhelming: the long-run cost of perinatal mental illness to UK society has been estimated at £8.1 billion per year, largely in impacts on children.<Cite nums={3} /></p>
              <p>Despite a clear evidence base and a strong policy commitment, the gap between prevalence and detection remains wide. Half of new mothers with postnatal depression go unidentified by health services. The barriers are multiple: a cultural reluctance among new mothers to disclose distress, fear of stigma or that children will be removed, inconsistent application of validated screening tools (such as the Edinburgh Postnatal Depression Scale) in health visitor contacts, and time pressures on overstretched community health teams. Detection rates have improved from 38% to 51% over a decade, but a system that misses half the cases it is designed to find has significant room to improve.<Cite nums={1} /></p>
              <p>For those who are detected and referred, waiting times present the next barrier. The NHS access standard for perinatal mental health services is four weeks from referral to first appointment. The national average is now 7.8 weeks and in the worst-performing areas it exceeds 16 weeks — four times the standard.<Cite nums={2} /> This is not an abstract statistic: the perinatal period is one of rapid change for both mother and child, and a delay of three or four months before treatment begins can determine the trajectory of the entire early parenting relationship. Regional variation of this magnitude reflects differences in ICB investment and commissioning priority, not clinical need.</p>
            </div>
          </section>
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p><a href="https://www.england.nhs.uk/mental-health/perinatal/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS England — Perinatal mental health programme</a> — access, detection and waiting time data. Annual. Retrieved Jan 2026.</p>
            <p><a href="https://www.nice.org.uk/guidance/ng194" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NICE — Antenatal and postnatal mental health (NG194)</a> — clinical guidance and prevalence estimates. Retrieved Jan 2026.</p>
            <p><a href="https://www.lsbu.ac.uk/research/centres/cmhp/perinatal-mental-health-economic-cost" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Centre for Mental Health — Economic cost of perinatal mental illness</a> — £8.1bn annual cost estimate. Retrieved Jan 2026.</p>
            <p>PND prevalence is an estimated population rate; detection and treatment rates are derived from NHS CQUIN and programme data returns from trusts. Waiting times are measured from date of referral to first specialist appointment. Regional comparisons use ICB-level data aggregated to broad regional groupings.</p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
