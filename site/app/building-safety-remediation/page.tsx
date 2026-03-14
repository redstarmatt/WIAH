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
  { num: 1, name: 'MHCLG', dataset: 'Building Safety Remediation Statistics', url: 'https://www.gov.uk/government/collections/building-safety-programme', date: '2024' },
  { num: 2, name: 'NAO', dataset: 'Progress with Remediation of Dangerous Cladding', url: 'https://www.nao.org.uk/reports/progress-with-remediation-of-dangerous-cladding/', date: '2023' },
  { num: 3, name: 'End Our Cladding Scandal', dataset: 'Cladding Crisis Data', url: 'https://www.endourcladdingscandal.co.uk/', date: '2024' },
];

const remediatedBuildingsValues = [0, 0, 0, 180, 640, 1200, 2100, 3400, 4800, 6200, 7800];
const buildingsIdentifiedValues = [0, 0, 0, 1600, 4800, 8200, 10400, 11800, 12600, 13200, 13800];
const remediationCostValues = [0, 0, 0, 0.4, 1.2, 2.8, 4.1, 5.6, 7.2, 9.4, 11.8];
const leaseholderLiabilityValues = [0, 0, 0, 12800, 22400, 38400, 52100, 61200, 48400, 32800, 18600];

const series1: Series[] = [
  { id: 'remediated', label: 'Buildings with dangerous cladding remediated', colour: '#2A9D8F', data: remediatedBuildingsValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
  { id: 'identified', label: 'Buildings identified as requiring remediation', colour: '#E63946', data: buildingsIdentifiedValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
];

const series2: Series[] = [
  { id: 'cost', label: 'Total remediation cost estimate (£bn)', colour: '#F4A261', data: remediationCostValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
  { id: 'leaseholder', label: 'Leaseholders with unresolved liability (thousands)', colour: '#264653', data: leaseholderLiabilityValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v / 1000 })) },
];

const annotations1: Annotation[] = [
  { date: new Date(2017, 5, 1), label: '2017: Grenfell Tower fire — 72 killed' },
  { date: new Date(2022, 3, 1), label: '2022: Building Safety Act passed' },
];

export default function BuildingSafetyRemediationPage() {
  return (
    <>
      <TopicNav topic="Building Safety Remediation" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Housing"
          question="How Many Buildings Still Have Dangerous Cladding?"
          finding={<>Seven years after the Grenfell Tower fire, 13,800 high-rise and medium-rise residential buildings have been identified as requiring cladding remediation — but only 7,800 (57%) have been completed, leaving an estimated 500,000 people living in buildings that still pose a fire safety risk.<Cite nums={[1, 2]} /> Total remediation costs are now estimated at £11.8 billion, and tens of thousands of leaseholders remain trapped in unsellable, unmortgageable homes while liability disputes continue.<Cite nums={[1, 3]} /></>}
          colour="#F4A261"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The Grenfell Tower fire of June 2017, which killed 72 people, revealed that combustible cladding and insulation systems had been installed on thousands of residential tower blocks and medium-rise buildings across England — with the knowledge and, in many cases, approval of local authorities, developers, and building control bodies. The subsequent identification programme has been far larger than anyone initially anticipated: what began as an exercise focused on ACM (aluminium composite material) cladding on high-rise towers has expanded to encompass buildings of 11 metres and above with a range of combustible external wall systems, including HPL panels, timber cladding, and various forms of combustible insulation. The estimated 13,800 buildings requiring remediation represents the current identified figure, and some experts believe the true number may be higher.<Cite nums={[1, 2]} /></p>
            <p>The financing and legal framework for remediation has been bitterly contested. The Building Safety Act 2022 established the principle that leaseholders in buildings where developers and building owners are identifiable should not have to pay — and created a Developer Remediation Contract through which major housebuilders committed to fund repairs to their own buildings. But many buildings were developed by companies that no longer exist, by small developers with no assets, or through structures that make liability difficult to establish. In these cases, the government&apos;s £5.1 billion Building Safety Fund provides grants, but demand exceeds supply and the application and verification process is slow. The NAO found that at the current pace of remediation, the programme would not be complete until the mid-2030s.<Cite nums={[2, 3]} /></p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Overview' },
          { id: 'sec-chart1', label: 'Remediation Progress' },
          { id: 'sec-chart2', label: 'Costs & Leaseholders' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard label="Buildings identified for remediation" value="13,800" unit="residential buildings" direction="up" polarity="flat" changeText="identified since 2017 · includes 11m+ buildings" sparklineData={[0, 0, 0, 1600, 4800, 8200, 10400, 11800, 12600, 13200, 13800]} source="MHCLG — Building Safety Remediation 2024" href="#sec-chart1" />
            <MetricCard label="Buildings remediated" value="7,800" unit="completed (57%)" direction="up" polarity="up-is-good" changeText="43% still outstanding · pace needs to double" sparklineData={[0, 0, 0, 180, 640, 1200, 2100, 3400, 4800, 6200, 7800]} source="MHCLG — Building Safety Remediation 2024" href="#sec-chart1" />
            <MetricCard label="Total remediation cost estimate" value="£11.8bn" unit="England" direction="up" polarity="flat" changeText="estimate has grown from £1bn in 2018 · ongoing revision" sparklineData={[0, 0, 0, 0.4, 1.2, 2.8, 4.1, 5.6, 7.2, 9.4, 11.8]} source="NAO — Dangerous Cladding 2023" href="#sec-chart2" />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Buildings identified and remediated for dangerous cladding, England, 2013–2024"
              subtitle="Cumulative buildings identified as requiring cladding remediation and cumulative buildings where remediation has been completed. The gap represents buildings still at risk."
              series={series1}
              annotations={annotations1}
              yLabel="Number of buildings"
              source={{ name: 'MHCLG', dataset: 'Building Safety Remediation Statistics', url: 'https://www.gov.uk/government/collections/building-safety-programme', frequency: 'quarterly', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Total remediation cost estimate and leaseholders with unresolved liability, 2013–2024"
              subtitle="Running estimate of total cladding remediation cost (£bn) and thousands of leaseholders with unresolved financial liability. Cost estimates have risen twelvefold; leaseholder liability falling as developer contracts progress."
              series={series2}
              annotations={[]}
              yLabel="£ billion / Thousands"
              source={{ name: 'NAO', dataset: 'Progress with Remediation of Dangerous Cladding', url: 'https://www.nao.org.uk/', frequency: 'annual', date: '2023' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Developer Remediation Contract: 49 developers signed"
            value="49"
            unit="major developers signed Developer Remediation Contract, covering 4,000+ buildings"
            description="The Developer Remediation Contract, signed by 49 major housebuilders in 2023, commits developers to fund remediation of buildings they constructed or refurbished where combustible external wall systems were installed. This covers an estimated 4,000 buildings and represents the largest voluntary financial commitment by a private sector to remediate its own products in UK history. Where developers honour these commitments — and the government has legal powers to enforce compliance — leaseholders in those buildings are protected from costs. Progress reports show that developers are funding active remediation in the majority of their identified buildings, with completion rates improving quarter on quarter."
            source="Source: MHCLG — Developer Remediation Contract Progress 2024. Building Safety Regulator 2024."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.gov.uk/government/collections/building-safety-programme" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">MHCLG — Building Safety Remediation Statistics</a> — buildings identified, started, completed. Quarterly.</p>
            <p><a href="https://www.nao.org.uk/reports/progress-with-remediation-of-dangerous-cladding/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NAO — Progress with Remediation</a> — cost estimates, pace analysis, programme risks. 2023.</p>
            <p>Buildings included are residential buildings 11m+ with identified unsafe external wall systems. Remediation &quot;completed&quot; means external wall system replaced or interim safety measures (e.g. waking watch, suppression systems) certified as permanent mitigation. Cost estimates include all building safety defects, not just cladding.</p>
          </div>
        </section>
      </main>
    </>
  );
}
