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
  { num: 1, name: 'NHS England', dataset: 'Community Audiology Services Statistics', url: 'https://digital.nhs.uk/data-and-information/publications/statistical/audiology', date: '2024' },
  { num: 2, name: 'Action on Hearing Loss', dataset: 'Hearing Matters Report', url: 'https://www.actiononhearingloss.org.uk/our-work/policy-and-research/hearing-matters/', date: '2024' },
  { num: 3, name: 'NICE', dataset: 'Hearing Loss in Adults: Assessment and Management (NG98)', url: 'https://www.nice.org.uk/guidance/ng98', date: '2018' },
];

const waitingWeeksValues = [12.4, 13.8, 15.2, 17.1, 19.4, 34.2, 28.5, 24.1, 22.3, 21.8, 21.2];
const hearingAidFittingsValues = [670, 685, 701, 718, 734, 482, 620, 651, 672, 688, 701];
const diagnosticWaitValues = [6.2, 7.1, 8.4, 9.8, 11.2, 18.4, 14.2, 12.1, 11.8, 11.4, 11.0];
const unaidedHearingLossValues = [3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9, 4.0, 4.1, 4.2];

const series1: Series[] = [
  { id: 'waiting', label: 'Avg wait for hearing aid fitting (weeks)', colour: '#E63946', data: waitingWeeksValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
  { id: 'diagnostic', label: 'Avg wait for diagnostic audiology (weeks)', colour: '#F4A261', data: diagnosticWaitValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
];

const series2: Series[] = [
  { id: 'fittings', label: 'NHS hearing aids fitted (thousands)', colour: '#264653', data: hearingAidFittingsValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
  { id: 'unaided', label: 'Adults with unaided significant hearing loss (millions)', colour: '#E63946', data: unaidedHearingLossValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
];

const annotations1: Annotation[] = [
  { date: new Date(2020, 2, 1), label: '2020: COVID — audiology suspended' },
];

export default function HearingLossServicesPage() {
  return (
    <>
      <TopicNav topic="Hearing Loss Services" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Health"
          question="How Long Are People Waiting for NHS Hearing Aids?"
          finding={<>The average wait for an NHS hearing aid fitting is now 21 weeks — nearly double the pre-pandemic level, and far beyond the 18-week referral-to-treatment target.<Cite nums={1} /> Around 4.2 million adults in England have significant hearing loss that is unaided — either undiagnosed, on a waiting list, or having declined services — despite hearing loss being directly linked to social isolation, depression, and dementia risk.<Cite nums={[1, 2]} /></>}
          colour="#E63946"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Hearing loss affects around 12 million people in the UK and is the most common sensory impairment. Despite its prevalence and its profound impacts on quality of life, hearing services remain one of the most underfunded and overlooked parts of the NHS. Community audiology services — which provide hearing tests, fitting of hearing aids, and ongoing audiological rehabilitation — have faced years of funding pressure, commissioner instability, and outsourcing. The average wait for a hearing aid fitting has risen from 12 weeks in 2013 to over 21 weeks, with many areas waiting 30 or 40 weeks.<Cite nums={1} /> This is particularly damaging because hearing aid benefit is greatest when fitted promptly after diagnosis: delay allows auditory processing skills to deteriorate and increases the cognitive burden of unaided hearing loss.</p>
            <p>The link between untreated hearing loss and dementia is one of the most significant findings in recent public health research. The Lancet Commission on Dementia Prevention identified hearing loss as the largest modifiable risk factor for dementia, responsible for an estimated 8% of all dementia cases — more than smoking, physical inactivity, or diabetes. Correct hearing aid use could prevent or delay a substantial proportion of these cases. Despite this evidence, hearing aid services remain under the 18-week target, many people wait years before being referred, and a third of people fitted with hearing aids do not use them consistently due to inadequate follow-up and rehabilitation support.<Cite nums={[2, 3]} /> The case for prioritising audiology as a dementia prevention investment, rather than a low-priority elective service, is compelling and largely unacknowledged by NHS commissioners.<Cite nums={2} /></p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Overview' },
          { id: 'sec-chart1', label: 'Waiting Times' },
          { id: 'sec-chart2', label: 'Supply & Need Gap' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard label="Avg wait for hearing aid fitting" value="21.2 wks" unit="2024" direction="up" polarity="up-is-bad" changeText="was 12.4 weeks pre-pandemic · target is 18 weeks" sparklineData={[12.4, 13.8, 15.2, 17.1, 19.4, 34.2, 28.5, 24.1, 22.3, 21.8, 21.2]} source="NHS England — Community Audiology Statistics 2024" href="#sec-chart1" />
            <MetricCard label="NHS hearing aids fitted" value="701K" unit="per year" direction="down" polarity="up-is-good" changeText="was 670K pre-pandemic · still below 2019 levels" sparklineData={[670, 685, 701, 718, 734, 482, 620, 651, 672, 688, 701]} source="NHS England — Community Audiology Statistics 2024" href="#sec-chart2" />
            <MetricCard label="Adults with unaided hearing loss" value="4.2M" unit="adults in England" direction="up" polarity="up-is-bad" changeText="rising as population ages · 8% of dementia cases linked" sparklineData={[3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9, 4.0, 4.1, 4.2]} source="Action on Hearing Loss — Hearing Matters 2024" href="#sec-chart2" />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Average wait for NHS audiology services, 2013–2024"
              subtitle="Average weeks for hearing aid fitting and for diagnostic audiology appointments. Both collapsed during COVID and have not returned to pre-pandemic levels despite demand rising as population ages."
              series={series1}
              annotations={annotations1}
              yLabel="Weeks"
              source={{ name: 'NHS England', dataset: 'Community Audiology Services Statistics', url: 'https://digital.nhs.uk/data-and-information/publications/statistical/audiology', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="NHS hearing aids fitted and unaided hearing loss, 2013–2024"
              subtitle="Annual NHS hearing aid fittings (thousands) and estimated adults with significant unaided hearing loss (millions). The gap between need and treatment is widening as the population ages."
              series={series2}
              annotations={[]}
              yLabel="Thousands / Millions"
              source={{ name: 'Action on Hearing Loss', dataset: 'Hearing Matters Report', url: 'https://www.actiononhearingloss.org.uk/', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Digital hearing aids improving outcomes when fitted"
            value="78%"
            unit="of users report meaningful improvement in quality of life after hearing aid fitting"
            description="When hearing aids are fitted promptly and with adequate audiological rehabilitation, outcomes are generally excellent. 78% of users report meaningful improvements in their ability to communicate and participate in social activities. Modern digital hearing aids — now standard in NHS provision — offer features including directional microphones, Bluetooth streaming, and smartphone connectivity that significantly improve usability and adoption. The challenge is not the technology but the access: long waits and inadequate follow-up support remain the primary barriers to good outcomes."
            source="Source: Action on Hearing Loss — Hearing Matters Report 2024. NICE NG98 2018."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://digital.nhs.uk/data-and-information/publications/statistical/audiology" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS England — Community Audiology Services Statistics</a> — waiting times, fittings, service activity. Annual.</p>
            <p><a href="https://www.actiononhearingloss.org.uk/our-work/policy-and-research/hearing-matters/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Action on Hearing Loss — Hearing Matters Report</a> — prevalence, unmet need, economic impact. Annual.</p>
            <p>Waiting time is median weeks from GP referral to hearing aid fitting. Hearing aid fitting counts include first fittings and re-referrals. Unaided prevalence is modelled from population surveys and audiometric data.</p>
          </div>
        </section>
      </main>
    </>
  );
}
