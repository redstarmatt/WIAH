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
            <p>Cybercrime is the fastest-growing category of crime in the UK yet one of the least-policed. The Crime Survey for England and Wales estimates approximately 1.9 million computer misuse offences per year &mdash; excluding cyber-enabled fraud, which is counted separately. The National Cyber Security Centre handled 1,957 significant cyber incidents in 2023, a record, while ransomware attacks on the NHS, Royal Mail, and the British Library brought the threat into public view. Yet fewer than 900 prosecutions for computer misuse offences were brought in 2024, down from 1,240 in 2015, as the Computer Misuse Act 1990 &mdash; drafted before the world wide web &mdash; remains the primary legislative tool and most police forces have fewer than ten specialist cyber officers. Total estimated ransomware losses to UK organisations reached &pound;3.2 billion in 2023, and the NCSC estimates fewer than 10&percnt; of cyber incidents are reported to police.</p>
            <p>Small businesses and individuals bear a disproportionate burden. Firms with fewer than 50 employees account for the majority of reported victims but have the least capacity to invest in defences &mdash; only 4&percnt; of eligible businesses have adopted the government&apos;s baseline Cyber Essentials certification. Older internet users are disproportionately targeted by phishing and tech support scams, while ethnic minority-owned businesses report higher victimisation rates potentially reflecting language-targeted attacks. The combination of a rising threat, a limited enforcement response, and low reporting rates means the gap between cybercrime volume and accountability is large and growing.</p>
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
              changeText="CSEW estimate &middot; excludes cyber-enabled fraud"
              sparklineData={[1.1, 1.34, 1.48, 1.58, 1.7, 2.1, 1.89, 1.62, 1.74, 1.9]}
              source="ONS &middot; Crime Survey for England and Wales, 2024"
              onExpand={() => {}}
            />
            <MetricCard
              label="Prosecutions"
              value="870"
              unit="/year"
              direction="down"
              polarity="up-is-good"
              changeText="Down from 1,240 in 2015 &middot; Computer Misuse Act"
              sparklineData={[1240, 1180, 1020, 960, 890, 620, 710, 780, 820, 870]}
              source="CPS &middot; Annual Report, 2024"
              onExpand={() => {}}
            />
            <MetricCard
              label="Ransomware losses (est.)"
              value="&pound;3.2B"
              unit="/year"
              direction="up"
              polarity="up-is-bad"
              changeText="UK-wide &middot; includes disruption and recovery costs"
              sparklineData={[0.8, 1.1, 1.4, 1.8, 2.2, 2.7, 3.2]}
              source="NCSC &middot; Annual Review, 2024"
              onExpand={() => {}}
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
              title="Prosecutions under Computer Misuse Act, 2015&ndash;2024"
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
