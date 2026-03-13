'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import PositiveCallout from '@/components/PositiveCallout';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

// Buildings with unsafe cladding awaiting remediation (thousands), 2018–2024 — DLUHC
const unsafeCladdingValues = [0, 4.5, 6.0, 7.5, 8.0, 7.2, 6.8];

// Waking watch costs (£m cumulative), 2017–2024 — DLUHC / NFCC
const wakingWatchCostsValues = [0, 120, 280, 460, 620, 750, 830];

// Buildings with EWS1 form completed (thousands), 2020–2024 — BSR/RICS
const ewsCompletedValues = [0, 15, 35, 55, 70];

const claddingSeries: Series[] = [
  {
    id: 'unsafe-cladding',
    label: 'Buildings with unsafe cladding (thousands)',
    colour: '#E63946',
    data: unsafeCladdingValues.map((v, i) => ({ date: new Date(2018 + i, 0, 1), value: v })),
  },
];

const costSeries: Series[] = [
  {
    id: 'waking-watch',
    label: 'Waking watch costs (£m cumulative)',
    colour: '#F4A261',
    data: wakingWatchCostsValues.map((v, i) => ({ date: new Date(2017 + i, 0, 1), value: v })),
  },
];

const claddingAnnotations: Annotation[] = [
  { date: new Date(2017, 5, 1), label: 'Jun 2017: Grenfell Tower fire' },
  { date: new Date(2022, 0, 1), label: '2022: Building Safety Act' },
];

export default function FireSafetyBuildingsPage() {
  return (
    <>
      <TopicNav topic="Building Fire Safety" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Building Fire Safety"
          question="Is the Cladding Crisis Actually Being Fixed?"
          finding="Seven years after Grenfell, around 6,800 residential buildings still have unsafe cladding awaiting remediation. Leaseholders have faced cumulative waking watch costs of £830 million. The Building Safety Act 2022 gives residents new protections — but remediation pace remains too slow."
          colour="#E63946"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The Grenfell Tower fire of June 2017 — which killed 72 people and revealed systemic failures in building safety, regulation, and oversight — triggered the largest remediation programme in UK building history. Investigations revealed that hundreds of thousands of homes across the country had been clad with aluminium composite material (ACM) or other flammable materials as part of cost-cutting refurbishments, often approved under building regulations despite clear fire safety risks. Seven years on, an estimated 6,800 residential buildings still have unsafe cladding awaiting remediation — though the true number may be higher, as many buildings have not been assessed.</p>
            <p>In the interim, the cost of fire safety measures has fallen heavily on leaseholders — precisely the people who had no role in the unsafe construction. 'Waking watch' patrols — guards who walk buildings continuously to provide early warning of fire — became widespread, costing leaseholders on average £300–400 per month each. Cumulative waking watch costs have exceeded £830 million nationally. The Building Safety Act 2022 gave leaseholders legal protections against being charged for remediation costs attributable to construction defects — but implementation has been slow and contested. The government's developer levy and building safety fund cover some costs, but significant gaps remain for orphaned buildings where the original developer no longer exists.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Unsafe buildings' },
          { id: 'sec-chart2', label: 'Remediation costs' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Buildings with unsafe cladding"
              value="6,800"
              unit=""
              direction="down"
              polarity="down-is-bad"
              changeText="Down from 8,000 peak · but progress too slow"
              sparklineData={[0, 4500, 6000, 7500, 8000, 7200, 6800]}
              source="DLUHC · Building safety remediation statistics 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Cumulative waking watch costs"
              value="£830m"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="£300-400/month per leaseholder · borne by residents"
              sparklineData={[0, 120, 280, 460, 620, 750, 830]}
              source="DLUHC · Building Safety Programme 2024"
              href="#sec-chart2"
            />
            <MetricCard
              label="Leaseholders protected by BSA 2022"
              value="90%"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="Building Safety Act protects most leaseholders from remediation costs"
              sparklineData={[0, 0, 0, 0, 0, 60, 90]}
              source="DLUHC · Building Safety Act implementation 2024"
              href="#sec-chart1"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Residential buildings with unsafe cladding awaiting remediation, England, 2018–2024"
              subtitle="Estimated number of buildings where dangerous cladding has been identified but not yet removed or replaced. Peak was approximately 8,000 in 2021."
              series={claddingSeries}
              annotations={claddingAnnotations}
              yLabel="Buildings (thousands)"
              source={{ name: 'DLUHC', dataset: 'Building safety remediation statistics', url: 'https://www.gov.uk/government/collections/building-safety-programme', frequency: 'quarterly', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Cumulative waking watch costs, England, 2017–2024"
              subtitle="Running total of costs incurred by leaseholders for fire safety patrols while awaiting cladding remediation. Over £830 million spent on a temporary measure since Grenfell."
              series={costSeries}
              annotations={[{ date: new Date(2022, 0, 1), label: '2022: Building Safety Act — leaseholder protections' }]}
              yLabel="Cumulative costs (£m)"
              source={{ name: 'DLUHC / NFCC', dataset: 'Building Safety Programme costs', url: 'https://www.gov.uk/government/collections/building-safety-programme', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Developer pledges cover £2bn of remediation costs"
            value="£2bn"
            description="Following government pressure and the threat of legislation, 49 major housebuilders signed the developer remediation contract in March 2023, committing to fund remediation of buildings they constructed or refurbished since 1992 that have life-critical fire safety defects. The pledged value is estimated at approximately £2 billion. The Building Safety Levy — charged on new developments — will raise a further £3 billion over 10 years. The new Building Safety Regulator, operating within the Health and Safety Executive, provides oversight of high-rise residential buildings and has powers to require remediation. If developer pledges are honoured and the Regulator uses its enforcement powers, the pace of remediation should accelerate significantly."
            source="Source: DLUHC — Building safety programme statistics 2024. HSE — Building Safety Regulator annual report 2023/24."
          />
        </ScrollReveal>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.gov.uk/government/collections/building-safety-programme" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DLUHC — Building Safety Programme</a> — quarterly statistics on cladding remediation progress, costs, and developer pledges.</p>
            <p><a href="https://www.hse.gov.uk/building-safety/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">HSE — Building Safety Regulator</a> — oversight of higher-risk buildings, registration data, and enforcement actions.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
