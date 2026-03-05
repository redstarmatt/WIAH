'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';

// ── Types ────────────────────────────────────────────────────────────────────

interface ApplicationsPoint {
  year: number;
  applications: number;
}

interface ReferralsPoint {
  year: number;
  count: number;
}

interface MiscarriagesData {
  national: {
    ccrcApplications: ApplicationsPoint[];
    referrals: ReferralsPoint[];
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function MiscarriagesOfJusticePage() {
  const [data, setData] = useState<MiscarriagesData | null>(null);

  useEffect(() => {
    fetch('/data/miscarriages-of-justice/miscarriages_of_justice.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const applicationsSeries: Series[] = data
    ? [{
        id: 'ccrc-applications',
        label: 'CCRC applications',
        colour: '#6B7280',
        data: data.national.ccrcApplications.map(d => ({
          date: yearToDate(d.year),
          value: d.applications,
        })),
      }]
    : [];

  const referralsSeries: Series[] = data
    ? [{
        id: 'referrals',
        label: 'Referrals to Court of Appeal',
        colour: '#E63946',
        data: data.national.referrals.map(d => ({
          date: yearToDate(d.year),
          value: d.count,
        })),
      }]
    : [];

  return (
    <>
      <TopicNav topic="Miscarriages of Justice" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Miscarriages of Justice"
          question="How Many Wrongful Convictions Go Uncorrected?"
          finding="The Criminal Cases Review Commission receives around 1,400 applications per year from people claiming wrongful conviction. It refers just 2&percnt; to the Court of Appeal &mdash; roughly 30 cases. The true scale of miscarriages of justice in England and Wales is unknown, but the system for correcting them is slow, under-resourced, and narrowly drawn."
          colour="#6B7280"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The Criminal Cases Review Commission, established in 1997 after the Birmingham Six and Guildford Four exposed systemic appeals failures, has received over 30,000 applications in 28 years and referred approximately 800 cases &mdash; a referral rate consistently around 2&percnt; &mdash; of which 70&percnt; resulted in convictions quashed or sentences varied. The CCRC&apos;s budget has been flat in cash terms since 2010, representing a real-terms cut of around 30&percnt;, with average waiting times stretching to 16 months and complex cases taking three years or more. The largest known miscarriage of justice in British legal history &mdash; the wrongful prosecution of nearly 1,000 Post Office sub-postmasters on the basis of faulty Horizon software &mdash; exposed how institutional pressure to protect flawed systems can generate wrongful convictions at scale. Cases involving joint enterprise convictions and discredited forensic techniques remain significant unresolved categories.</p>
            <p>The burden of wrongful conviction is not shared equally. Black and ethnic minority defendants make up approximately 25&percnt; of CCRC applicants despite representing 13&percnt; of the prison population; the joint enterprise pathway disproportionately affects young Black men convicted on the basis of association rather than direct participation. People with learning disabilities and mental health conditions face elevated risk of false confession during extended interviews. Women applicants often face specific barriers linked to coercive control by co-defendants whose evidence was accepted at trial. The system for correcting errors is slow, applies a conservative legal threshold, and has not been resourced to match demand &mdash; what is not contested is that an unknown number of people are currently imprisoned for crimes they did not commit.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-applications', label: 'Applications' },
          { id: 'sec-referrals', label: 'Referrals' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="CCRC applications per year"
              value="1,380"
              direction="flat"
              polarity="up-is-bad"
              changeText="Broadly stable since 2015 &middot; 30,000+ total since 1997"
              sparklineData={[1472, 1512, 1415, 1438, 1402, 1214, 1337, 1410, 1356, 1380]}
              source="CCRC &middot; Annual Report, 2024"
              href="#sec-applications"/>
            <MetricCard
              label="Cases referred to Court of Appeal"
              value="33"
              unit="/year"
              direction="flat"
              polarity="up-is-good"
              changeText="~2% referral rate &middot; ~70% of referrals result in quashed conviction"
              sparklineData={[32, 28, 27, 34, 30, 22, 25, 31, 29, 33]}
              source="CCRC &middot; Annual Report, 2024"
              href="#sec-referrals"/>
            <MetricCard
              label="Post Office convictions overturned"
              value="983"
              direction="up"
              polarity="up-is-good"
              changeText="Largest miscarriage of justice in British legal history"
              sparklineData={[0, 0, 39, 72, 200, 500, 700, 900, 983]}
              source="Post Office Horizon Inquiry, 2024"
              href="#sec-referrals"/>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-applications" className="mb-12">
            <LineChart
              title="CCRC applications received, 2015&ndash;2024"
              subtitle="Annual applications to the Criminal Cases Review Commission claiming wrongful conviction."
              series={applicationsSeries}
              yLabel="Applications"
              source={{ name: 'CCRC', dataset: 'Annual Report and Accounts', frequency: 'annual' }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-referrals" className="mb-12">
            <LineChart
              title="CCRC referrals to the Court of Appeal, 2015&ndash;2024"
              subtitle="Cases where the CCRC determined there was a real possibility the conviction would be overturned."
              series={referralsSeries}
              yLabel="Referrals"
              source={{ name: 'CCRC', dataset: 'Annual Report and Accounts', frequency: 'annual' }}
            />
          </section>
        </ScrollReveal>
      </main>
    </>
  );
}
