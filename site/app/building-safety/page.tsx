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

// Buildings identified with unsafe cladding (cumulative), 2018–2024
const identifiedData = [457, 1650, 3120, 4630, 5120, 5340, 5412];

// Buildings where remediation completed (cumulative), 2018–2024
const remediatedData = [15, 128, 340, 612, 1015, 1420, 1780];

// Building Safety Fund disbursed (£ billions), 2020–2024
const disbursedData = [0.1, 0.3, 0.6, 1.0, 1.5, 1.9, 2.3];

const progressSeries: Series[] = [
  {
    id: 'buildings-identified',
    label: 'Buildings with unsafe cladding identified',
    colour: '#E63946',
    data: identifiedData.map((v, i) => ({ date: new Date(2018 + i, 0, 1), value: v })),
  },
  {
    id: 'remediation-complete',
    label: 'Remediation completed',
    colour: '#2A9D8F',
    data: remediatedData.map((v, i) => ({ date: new Date(2018 + i, 0, 1), value: v })),
  },
];

const fundSeries: Series[] = [
  {
    id: 'disbursed',
    label: 'Building Safety Fund disbursed (£bn)',
    colour: '#2A9D8F',
    data: disbursedData.map((v, i) => ({ date: new Date(2018 + i, 0, 1), value: v })),
  },
];

const progressAnnotations: Annotation[] = [
  { date: new Date(2017, 5, 1), label: '2017: Grenfell Tower fire' },
  { date: new Date(2022, 0, 1), label: '2022: Building Safety Act passed' },
];

const fundAnnotations: Annotation[] = [
  { date: new Date(2020, 0, 1), label: '2020: £5.1bn Building Safety Fund announced' },
  { date: new Date(2023, 0, 1), label: '2023: Cladding Safety Scheme launched' },
];

const editorialRefs: Reference[] = [
  { num: 1, name: 'DLUHC', dataset: 'Building Safety Programme Monthly Data Release', url: 'https://www.gov.uk/government/collections/building-safety-programme', date: 'March 2026' },
  { num: 2, name: 'DLUHC', dataset: 'Building Safety Fund Statistics', url: 'https://www.gov.uk/guidance/building-safety-fund-apply-for-funding', date: 'March 2026' },
  { num: 3, name: 'Grenfell Tower Inquiry', dataset: 'Final Report', url: 'https://www.grenfelltowerinquiry.org.uk', date: 'September 2024' },
];

export default function BuildingSafetyPage() {
  return (
    <>
      <TopicNav topic="Building Safety" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Building Safety"
          question="How Many People Still Live in Buildings With Dangerous Cladding?"
          finding="Nearly eight years after the Grenfell Tower fire, over 3,600 residential buildings with unsafe cladding have not yet completed remediation. An estimated 300,000 leaseholders remain trapped in flats they cannot sell, and the government's £5.1 billion Building Safety Fund has disbursed less than half its allocation."
          colour="#E63946"
          preposition="with"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The Grenfell Tower fire of 14 June 2017 killed 72 people and exposed a systemic failure of building safety regulation in England.<Cite nums={3} /> Combustible aluminium composite material cladding on the tower's exterior was the primary accelerant, but the subsequent investigation revealed that the problem extended far beyond one building. DLUHC's Building Safety Programme has identified 5,412 residential buildings over 11 metres with some form of unsafe cladding or fire safety defect. Of these, approximately 1,780 have completed remediation as of early 2025 — a completion rate of 33% after nearly eight years.<Cite nums={1} /> The remaining 3,632 buildings house an estimated 300,000 households, many of whom cannot sell or remortgage their flats because lenders refuse to advance loans on buildings with known fire safety defects.</p>
            <p>The financial burden on leaseholders has been immense. Before the Building Safety Act 2022 established the principle that leaseholders in buildings over 11 metres should not pay for cladding remediation, many faced bills of £40,000–£100,000 per flat. Interim safety measures — principally waking watches and communal alarm systems — have cost leaseholders up to £500 per household per month.<Cite nums={1} /> The government's £5.1 billion Building Safety Fund, announced in 2020, is the primary remediation funding mechanism, but by late 2024 only approximately £2.3 billion had been disbursed.<Cite nums={2} /> Buildings between 11 and 18 metres face a different regime: many mid-rise leaseholders remain liable for non-cladding fire safety defects such as compartmentation failures, missing fire breaks, and defective fire doors that can cost £10,000–£30,000 per flat.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Remediation Progress' },
          { id: 'sec-chart2', label: 'Funding' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Buildings with unsafe cladding"
              value="5,412"
              unit="identified (2024)"
              direction="up"
              polarity="up-is-bad"
              changeText="Identification ongoing · 40% in London · true total likely higher"
              sparklineData={[457, 1650, 3120, 4630, 5120, 5340, 5412]}
              source="DLUHC · Building Safety Programme 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Remediation completed"
              value="1,780"
              unit="buildings (33%)"
              direction="up"
              polarity="up-is-good"
              changeText="3,632 buildings still awaiting works · ~300k households"
              sparklineData={[15, 128, 340, 612, 1015, 1420, 1780]}
              source="DLUHC · Building Safety Programme 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Building Safety Fund disbursed"
              value="£2.3bn"
              unit="of £5.1bn"
              direction="up"
              polarity="up-is-good"
              changeText="45% disbursed after 4 years · contractor shortages slow progress"
              sparklineData={[0.1, 0.3, 0.6, 1.0, 1.5, 1.9, 2.3]}
              source="DLUHC · Building Safety Fund data 2024"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Cladding remediation progress, England, 2018–2024"
              subtitle="Cumulative buildings identified with unsafe cladding (red) vs. buildings where remediation has been completed (green). Gap of over 3,600 buildings remains."
              series={progressSeries}
              annotations={progressAnnotations}
              yLabel="Buildings"
              source={{ name: 'DLUHC', dataset: 'Building Safety Programme Monthly Data Release', url: 'https://www.gov.uk/government/collections/building-safety-programme', frequency: 'monthly', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Building Safety Fund cumulative disbursement, 2018–2024"
              subtitle="Cumulative spending from the £5.1 billion Building Safety Fund. Disbursement accelerated from 2022 but pace remains below what is needed to meet targets."
              series={fundSeries}
              annotations={fundAnnotations}
              targetLine={{ value: 5.1, label: '£5.1bn total fund' }}
              yLabel="£ billions"
              source={{ name: 'DLUHC', dataset: 'Building Safety Fund Statistics', url: 'https://www.gov.uk/government/collections/building-safety-programme', frequency: 'quarterly', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Remediation pace is accelerating"
            value="1,780"
            unit="buildings remediated — pace rising"
            description="The Building Safety Act 2022 established that leaseholders should not pay for cladding remediation in buildings over 11 metres. The Building Safety Regulator began operations in April 2023 with new enforcement powers. Remediation completions rose from 1,015 in 2022 to 1,780 in 2024 as contractor capacity expanded. The Grenfell Tower Inquiry final report (September 2024) recommended sweeping regulatory reform that the government has committed to implement. The Cladding Safety Scheme is designed to streamline applications and accelerate disbursement."
            source="Source: DLUHC — Building Safety Programme Monthly Data Release 2024; Grenfell Tower Inquiry Final Report 2024."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.gov.uk/government/collections/building-safety-programme" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DLUHC — Building Safety Programme Monthly Data Release</a> — primary source for buildings identified and remediation progress. Retrieved March 2026.</p>
            <p><a href="https://www.gov.uk/guidance/building-safety-fund-apply-for-funding" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DLUHC — Building Safety Fund</a> — disbursement and allocation data. Retrieved March 2026.</p>
            <p><a href="https://www.grenfelltowerinquiry.org.uk" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Grenfell Tower Inquiry — Final Report</a> — findings and recommendations, September 2024. Retrieved March 2026.</p>
            <p className="mt-2">Buildings identified includes all residential buildings over 11 metres with unsafe cladding or other fire safety defects on DLUHC's register. Remediation completion means all cladding and primary fire safety works are finished and signed off. Leaseholder cost estimates are from the Leasehold Knowledge Partnership survey data 2023–24.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
