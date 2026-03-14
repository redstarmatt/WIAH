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

// Estimated adults experiencing domestic abuse (millions), 2012–2024 — ONS CSEW
const prevalenceValues = [3.1, 3.2, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9, 4.1, 3.9, 3.8, 3.7, 3.8];

// Police-recorded DA offences (thousands), 2012–2024 — Home Office
const policeValues = [430, 450, 500, 580, 660, 730, 800, 860, 900, 850, 910, 940, 970];

const prevalenceSeries: Series[] = [
  {
    id: 'prevalence',
    label: 'Estimated victims (millions)',
    colour: '#E63946',
    data: prevalenceValues.map((v, i) => ({ date: new Date(2012 + i, 5, 1), value: v })),
  },
];

const policeSeries: Series[] = [
  {
    id: 'police-recorded',
    label: 'Police-recorded DA offences (thousands)',
    colour: '#6B7280',
    data: policeValues.map((v, i) => ({ date: new Date(2012 + i, 5, 1), value: v })),
  },
];

const annotations: Annotation[] = [
  { date: new Date(2015, 5, 1), label: '2015: Coercive control criminalised' },
  { date: new Date(2021, 5, 1), label: '2021: Domestic Abuse Act' },
];

const editorialRefs: Reference[] = [
  { num: 1, name: 'ONS', dataset: 'Crime Survey for England and Wales — Domestic Abuse', url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/crimeandjustice/bulletins/domesticabuseinenglandandwalesoverview/latest', date: '2024' },
  { num: 2, name: 'Home Office', dataset: 'Crime Outcomes in England and Wales', url: 'https://www.gov.uk/government/collections/crime-outcomes-in-england-and-wales-statistics', date: '2024' },
  { num: 3, name: "Women's Aid", dataset: 'Annual Audit of Domestic Abuse Services', url: 'https://www.womensaid.org.uk/what-we-do/research-and-publications/annual-audit/', date: '2023/24' },
];

export default function DomesticAbuseViolencePage() {
  return (
    <>
      <TopicNav topic="Justice" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Justice"
          question="How much domestic abuse happens behind closed doors?"
          finding="An estimated 3.8 million people experience domestic abuse each year in England and Wales. Around 81% of incidents are never reported to police — and fewer than 5% of recorded offences result in a charge."
          colour="#E63946"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Domestic abuse is the most widespread violent crime in England and Wales, yet it remains the least visible. The Crime Survey for England and Wales estimates that 3.8 million adults experienced some form of domestic abuse in the year to March 2024 — around 7.8% of the adult population.<Cite nums={1} /> An estimated 81% of victims never contact the police.<Cite nums={1} /> Among those who do, the journey from report to justice is vanishingly narrow: just 4.9% of police-recorded domestic abuse offences resulted in a charge in 2023/24, down from 12.2% a decade earlier.<Cite nums={2} /> The collapse in charge rates reflects systemic failures — overwhelmed police domestic abuse units, delays in digital evidence processing, and high victim withdrawal rates driven by fear, coercion, and loss of confidence in the system.</p>
            <p>The Domestic Abuse Act 2021 created the first statutory definition of domestic abuse, recognising coercive control, economic abuse, and psychological manipulation alongside physical violence. It established the office of the Domestic Abuse Commissioner, placed duties on local authorities to fund safe accommodation, and banned perpetrators from cross-examining victims in family courts. However, implementation has been uneven. Refuge provision remains in crisis — Women&apos;s Aid reports that 64% of referrals are turned away, primarily due to a shortage of bed spaces.<Cite nums={3} /> Specialist services for Black and minoritised women, disabled women, and LGBT+ survivors are especially scarce.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Prevalence' },
          { id: 'sec-chart2', label: 'Police-recorded' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="People experiencing domestic abuse"
              value="3.8M"
              unit="/yr"
              direction="flat"
              polarity="up-is-bad"
              changeText="7.8% of adult population · survey likely undercounts"
              sparklineData={[3.1, 3.3, 3.5, 3.7, 3.9, 4.1, 3.9, 3.8]}
              source="ONS · Crime Survey for England and Wales, 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Incidents never reported to police"
              value="81%"
              unit=""
              direction="flat"
              polarity="up-is-bad"
              changeText="Consistent across survey years · fear is primary barrier"
              sparklineData={[80, 81, 82, 81, 80, 81, 82, 81]}
              source="ONS · Crime Survey for England and Wales, 2024"
              href="#sec-chart2"
            />
            <MetricCard
              label="Refuge referrals turned away"
              value="64%"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Lack of bed spaces · up from 58% in 2020"
              sparklineData={[55, 56, 58, 59, 60, 62, 63, 64]}
              source="Women's Aid · Annual Audit 2023/24"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Estimated adults experiencing domestic abuse, England & Wales, 2012–2024"
              subtitle="Millions of adults reporting domestic abuse in the preceding 12 months. COVID-19 lockdowns drove a surge in 2020–21."
              series={prevalenceSeries}
              annotations={annotations}
              yLabel="Victims (millions)"
              source={{ name: 'ONS', dataset: 'Crime Survey for England and Wales — Domestic Abuse', url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/crimeandjustice/datasets/domesticabuseinenglandandwalesappendixtables', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Police-recorded domestic abuse offences, England & Wales, 2012–2024"
              subtitle="Thousands of offences with a domestic abuse flag. Rising trend partly reflects improved recording, not only more abuse."
              series={policeSeries}
              annotations={[]}
              yLabel="Offences (thousands)"
              source={{ name: 'Home Office', dataset: 'Crime Outcomes in England and Wales', url: 'https://www.gov.uk/government/collections/crime-outcomes-in-england-and-wales-statistics', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Domestic Abuse Act 2021 and Ask for ANI"
            value="Landmark reform"
            description="The Domestic Abuse Act 2021 created the first statutory definition of domestic abuse, established the Domestic Abuse Commissioner, placed duties on local authorities to fund safe accommodation, and banned perpetrators from cross-examining victims in family courts. The Ask for ANI (Action Needed Immediately) scheme, launched in 2021, enables victims to use a codeword at over 6,000 participating pharmacies to discreetly access support. These are the most significant legislative advances in domestic abuse protection in a generation."
            source="Source: Home Office — Domestic Abuse Act 2021. Ask for ANI — Home Office / Hestia, 2021–present."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.ons.gov.uk/peoplepopulationandcommunity/crimeandjustice/bulletins/domesticabuseinenglandandwalesoverview/latest" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ONS — Domestic abuse in England and Wales overview</a> — annual CSEW-based estimate of prevalence.</p>
            <p><a href="https://www.gov.uk/government/collections/crime-outcomes-in-england-and-wales-statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Home Office — Crime Outcomes in England and Wales</a> — police-recorded DA offences and charge rates.</p>
            <p><a href="https://www.womensaid.org.uk/what-we-do/research-and-publications/annual-audit/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Women's Aid — Annual Audit</a> — refuge referral and capacity data.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
