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

// Computer misuse offences (millions), 2015–2024 (CSEW)
const offenceValues = [1.10, 1.34, 1.48, 1.58, 1.70, 2.10, 1.89, 1.62, 1.74, 1.90];

// Prosecutions under Computer Misuse Act, 2015–2024
const prosecutionValues = [1240, 1180, 1020, 960, 890, 620, 710, 780, 820, 870];

const series1: Series[] = [
  {
    id: 'computer-misuse',
    label: 'Computer misuse offences (millions, CSEW)',
    colour: '#6B7280',
    data: offenceValues.map((v, i) => ({ date: new Date(2015 + i, 5, 1), value: v })),
  },
];

const series2: Series[] = [
  {
    id: 'prosecutions',
    label: 'Prosecutions under Computer Misuse Act',
    colour: '#E63946',
    data: prosecutionValues.map((v, i) => ({ date: new Date(2015 + i, 5, 1), value: v })),
  },
];

const annotations1: Annotation[] = [
  { date: new Date(2019, 5, 1), label: '2019: COVID pre-cursor — ransomware surge begins' },
  { date: new Date(2020, 2, 1), label: '2020: Pandemic — attacks spike as remote work expands' },
];

const annotations2: Annotation[] = [
  { date: new Date(2020, 2, 1), label: '2020: Court backlogs suppress prosecution numbers' },
];

const editorialRefs: Reference[] = [
  { num: 1, name: 'ONS', dataset: 'Crime Survey for England and Wales', url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/crimeandjustice/datasets/computermisuse', date: '2024' },
  { num: 2, name: 'NCSC', dataset: 'Annual Review', url: 'https://www.ncsc.gov.uk/annual-review', date: '2024' },
  { num: 3, name: 'CPS', dataset: 'Annual Report — Computer Misuse', url: 'https://www.cps.gov.uk/publication/cps-annual-report-and-accounts', date: '2024' },
];

export default function CybercrimePage() {
  return (
    <>
      <TopicNav topic="Cybercrime" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Cybercrime"
          question="Can the Law Keep Up with Cybercrime?"
          finding="The Crime Survey estimates 1.9 million computer misuse offences annually in England and Wales, yet prosecutions number fewer than 900 per year. Ransomware attacks on NHS trusts, councils, and businesses have surged, while specialist cyber policing units remain drastically underfunded."
          colour="#6B7280"
          preposition="with"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Cybercrime is the fastest-growing category of crime in the UK, yet it remains one of the least-policed. The Crime Survey for England and Wales estimates approximately 1.9 million computer misuse offences per year, including hacking, malware attacks, and denial-of-service incidents.<Cite nums={1} /> This figure excludes the substantial volume of cyber-enabled fraud, which is counted separately. The National Cyber Security Centre handled 1,957 significant cyber incidents in 2023 — a record.<Cite nums={2} /> Ransomware attacks on the NHS, local councils, Royal Mail, and the British Library have made the threat tangible to the public, but the vast majority of cybercrime targets individuals and small businesses who receive little or no support from law enforcement.</p>
            <p>The enforcement gap is stark. Fewer than 900 prosecutions for computer misuse offences were brought in 2024, down from 1,240 in 2015.<Cite nums={3} /> The Computer Misuse Act 1990 — drafted before the world wide web existed — remains the primary legislative tool, and has been widely criticised as outdated and difficult to apply to modern attack vectors. The National Crime Agency's National Cyber Crime Unit is the lead enforcement body, but its capacity is limited relative to the scale of the threat. Most of the 43 police forces in England and Wales have cyber teams typically consisting of fewer than ten officers, many of whom lack specialist digital forensics training.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Offences' },
          { id: 'sec-chart2', label: 'Prosecutions' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Computer misuse offences (annual)"
              value="1.9M"
              unit="2024"
              direction="up"
              polarity="up-is-bad"
              changeText="CSEW estimate · excludes cyber-enabled fraud · up 73% since 2015"
              sparklineData={[1.10, 1.34, 1.48, 1.58, 1.70, 2.10, 1.89, 1.62, 1.74, 1.90]}
              source="ONS — Crime Survey for England and Wales 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Prosecutions (Computer Misuse Act)"
              value="870"
              unit="2024"
              direction="down"
              polarity="up-is-good"
              changeText="down from 1,240 in 2015 · <0.05% of estimated offences"
              sparklineData={[1240, 1180, 1020, 960, 890, 620, 710, 780, 820, 870]}
              source="CPS — Annual Report 2024"
              href="#sec-chart2"
            />
            <MetricCard
              label="Ransomware losses (est. annual)"
              value="£3.2B"
              unit="2024"
              direction="up"
              polarity="up-is-bad"
              changeText="UK-wide · includes disruption and recovery costs"
              sparklineData={[0.8, 1.1, 1.4, 1.8, 2.2, 2.7, 2.9, 3.2]}
              source="NCSC — Annual Review 2024"
              href="#sec-chart1"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Estimated computer misuse offences, England and Wales, 2015–2024"
              subtitle="Crime Survey for England and Wales estimates. Includes hacking, malware, and denial-of-service attacks. Excludes cyber-enabled fraud. Pandemic-period spike reflects explosion in opportunistic attacks as remote work expanded."
              series={series1}
              annotations={annotations1}
              yLabel="Offences (millions)"
              source={{ name: 'ONS', dataset: 'Crime Survey for England and Wales', url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/crimeandjustice/datasets/computermisuse', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Prosecutions under Computer Misuse Act, 2015–2024"
              subtitle="Annual prosecutions brought in England and Wales. The fall during 2020–21 reflects court backlogs; even post-recovery, prosecution numbers remain well below 2015 levels despite far more offences."
              series={series2}
              annotations={annotations2}
              yLabel="Prosecutions"
              source={{ name: 'CPS', dataset: 'Annual Report — Computer Misuse', url: 'https://www.cps.gov.uk/publication/cps-annual-report-and-accounts', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="NCSC: 1,957 significant incidents handled in 2023 — record response"
            value="1,957"
            unit="significant cyber incidents managed by NCSC in 2023"
            description="The National Cyber Security Centre's 2023 Annual Review recorded a record 1,957 significant cyber incidents — up 64% from 2022 — but also highlighted that the NCSC's active defence programmes blocked over 7.1 million malicious domains before they could reach UK users. The Cyber Essentials scheme has certified over 100,000 organisations since 2014, providing a baseline of protection for small businesses and charities. The UK's proposed Computer Misuse Act reform — subject to consultation since 2021 — would update offences to cover modern attack vectors including cloud infrastructure and supply chain attacks, addressing the legislative gap that leaves police unable to prosecute many cybercrime methods under the existing 1990 framework."
            source="Source: NCSC — Annual Review 2023. Home Office — Computer Misuse Act reform consultation 2024."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.ons.gov.uk/peoplepopulationandcommunity/crimeandjustice" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ONS — Crime Survey for England and Wales</a> — computer misuse estimates. Annual. 2024.</p>
            <p><a href="https://www.cps.gov.uk/publication/cps-annual-report-and-accounts" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Crown Prosecution Service — Annual Report</a> — prosecution statistics by offence category. Annual. 2024.</p>
            <p><a href="https://www.ncsc.gov.uk/annual-review" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NCSC — Annual Review</a> — significant incident counts and sector impact. Annual. 2024.</p>
            <p>Computer misuse offences are CSEW estimates and carry confidence intervals; actual incident volumes are substantially higher. Prosecution counts are for Computer Misuse Act offences only; cyber-enabled fraud prosecutions are counted under fraud legislation. Ransomware losses are industry estimates based on incident reports and recovery costs.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
