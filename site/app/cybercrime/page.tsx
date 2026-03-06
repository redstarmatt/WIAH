'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';

// ── Types ────────────────────────────────────────────────────────────────────

interface MisusePoint {
  year: number;
  count: number;
}

interface ProsecutionPoint {
  year: number;
  count: number;
}

interface CybercrimeData {
  national: {
    computerMisuseOffences: MisusePoint[];
    prosecutions: ProsecutionPoint[];
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function CybercrimePage() {
  const [data, setData] = useState<CybercrimeData | null>(null);

  useEffect(() => {
    fetch('/data/cybercrime/cybercrime.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const offencesSeries: Series[] = data
    ? [{
        id: 'computer-misuse',
        label: 'Computer misuse offences (CSEW)',
        colour: '#6B7280',
        data: data.national.computerMisuseOffences.map(d => ({
          date: yearToDate(d.year),
          value: d.count,
        })),
      }]
    : [];

  const prosecutionSeries: Series[] = data
    ? [{
        id: 'prosecutions',
        label: 'Prosecutions',
        colour: '#E63946',
        data: data.national.prosecutions.map(d => ({
          date: yearToDate(d.year),
          value: d.count,
        })),
      }]
    : [];

  return (
    <>
      <TopicNav topic="Cybercrime" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Cybercrime"
          question="Can the Law Keep Up with Cybercrime?"
          finding="The Crime Survey estimates 1.9 million computer misuse offences annually in England and Wales, yet prosecutions number fewer than 900 per year. Ransomware attacks on NHS trusts, councils, and businesses have surged, while specialist cyber policing units remain drastically underfunded."
          colour="#6B7280"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Cybercrime is the fastest-growing category of crime in the UK, yet it remains one of the least-policed. The Crime Survey for England and Wales estimates approximately 1.9 million computer misuse offences per year, including hacking, malware attacks, and denial-of-service incidents. This figure excludes the substantial volume of cyber-enabled fraud, which is counted separately. The National Cyber Security Centre handled 1,957 significant cyber incidents in 2023 — a record. Ransomware attacks on the NHS, local councils, Royal Mail, and the British Library have made the threat tangible to the public, but the vast majority of cybercrime targets individuals and small businesses who receive little or no support from law enforcement.</p>
            <p>The enforcement gap is stark. Fewer than 900 prosecutions for computer misuse offences were brought in 2024, down from 1,240 in 2015. The Computer Misuse Act 1990 — drafted before the world wide web existed — remains the primary legislative tool, and has been widely criticised as outdated and difficult to apply to modern attack vectors. The National Crime Agency's National Cyber Crime Unit is the lead enforcement body, but its capacity is limited relative to the scale of the threat. Most of the 43 police forces in England and Wales have small cyber teams, typically consisting of fewer than ten officers, many of whom lack specialist digital forensics training.</p>
            </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-offences', label: 'Offences' },
          { id: 'sec-prosecutions', label: 'Prosecutions' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Computer misuse offences"
              value="1.9M"
              unit="/year"
              direction="up"
              polarity="up-is-bad"
              changeText="CSEW estimate · excludes cyber-enabled fraud"
              sparklineData={[1.1, 1.34, 1.48, 1.58, 1.7, 2.1, 1.89, 1.62, 1.74, 1.9]}
              source="ONS · Crime Survey for England and Wales, 2024"
              href="#sec-offences"
            />
            <MetricCard
              label="Prosecutions"
              value="870"
              unit="/year"
              direction="down"
              polarity="up-is-good"
              changeText="Down from 1,240 in 2015 · Computer Misuse Act"
              sparklineData={[1240, 1180, 1020, 960, 890, 620, 710, 780, 820, 870]}
              source="CPS · Annual Report, 2024"
              href="#sec-offences"
            />
            <MetricCard
              label="Ransomware losses (est.)"
              value="£3.2B"
              unit="/year"
              direction="up"
              polarity="up-is-bad"
              changeText="UK-wide · includes disruption and recovery costs"
              sparklineData={[0.8, 1.1, 1.4, 1.8, 2.2, 2.7, 3.2]}
              source="NCSC · Annual Review, 2024"
              href="#sec-offences"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-offences" className="mb-12">
            <LineChart
              title="Estimated computer misuse offences, England &amp; Wales"
              subtitle="Crime Survey for England and Wales estimates. Includes hacking, malware, and denial-of-service."
              series={offencesSeries}
              yLabel="Offences"
              source={{ name: 'ONS', dataset: 'Crime Survey for England and Wales', frequency: 'annual' }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-prosecutions" className="mb-12">
            <LineChart
              title="Prosecutions under Computer Misuse Act, 2015–2024"
              subtitle="Annual prosecutions brought under the Computer Misuse Act 1990. England and Wales."
              series={prosecutionSeries}
              yLabel="Prosecutions"
              source={{ name: 'CPS', dataset: 'Annual Report', frequency: 'annual' }}
            />
          </section>
        </ScrollReveal>
      </main>
    </>
  );
}
