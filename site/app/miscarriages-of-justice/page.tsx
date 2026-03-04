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
            <p>The Criminal Cases Review Commission was established in 1997 following a series of high-profile wrongful convictions &mdash; the Birmingham Six, the Guildford Four, and others &mdash; that revealed systemic failures in the appeals process. Its role is to investigate potential miscarriages of justice and refer cases to the Court of Appeal where there is a &ldquo;real possibility&rdquo; that the conviction would be overturned. In its 28 years of operation, the CCRC has received more than 30,000 applications and referred approximately 800 cases, of which around 70&percnt; resulted in the conviction being quashed or the sentence varied.</p>
            <p>The referral rate &mdash; consistently around 2&percnt; of applications &mdash; has been a persistent source of criticism. Campaigners argue that the &ldquo;real possibility&rdquo; test sets too high a threshold, particularly for cases that rely on new evidence of disclosure failures, unreliable forensic science, or witness recantation. The CCRC&apos;s budget has remained broadly flat in cash terms since 2010, representing a real-terms cut of around 30&percnt;. Average waiting times from application to decision have stretched to 16 months, with complex cases taking three years or more. Staff numbers have been reduced, and the organisation has acknowledged that resource constraints affect the depth of investigation it can undertake.</p>
            <p>Several categories of case raise particular concern. Joint enterprise convictions &mdash; where individuals are convicted of murder or manslaughter on the basis of association rather than direct participation &mdash; have been challenged following the Supreme Court&apos;s 2016 ruling that the law had been wrongly applied for over 30 years. Despite this, the CCRC has referred fewer than 20 joint enterprise cases, and the Court of Appeal has been reluctant to overturn convictions. Post Office sub-postmasters wrongly convicted of theft and fraud on the basis of faulty Horizon software represent the largest known miscarriage of justice in British legal history, with nearly 1,000 convictions now overturned or in the process of being quashed. Cases involving discredited forensic techniques &mdash; including bite mark analysis and some DNA interpretation methods &mdash; remain a concern.</p>
            <p>Black and ethnic minority defendants are overrepresented among those claiming wrongful conviction. They make up approximately 25&percnt; of CCRC applicants, despite representing around 13&percnt; of the prison population. Research by the University of Exeter found that Black defendants are more likely to be convicted on weaker evidence and face longer sentences for equivalent offences. The joint enterprise pathway disproportionately affects young Black men. People with learning disabilities and mental health conditions are at elevated risk of making false confessions, particularly during long police interviews without appropriate adult support. Women applicants to the CCRC face specific barriers, often relating to coercive control by co-defendants whose evidence was accepted at trial.</p>
            <p>Measuring miscarriages of justice is inherently difficult because the &ldquo;ground truth&rdquo; &mdash; whether a person is genuinely innocent &mdash; is rarely knowable with certainty after conviction. The CCRC&apos;s referral statistics are not a measure of the rate of wrongful conviction; they reflect the Commission&apos;s capacity, legal threshold, and the quality of applications received. Academic estimates of the wrongful conviction rate in England and Wales range from 0.5&percnt; to 5&percnt; of all convictions &mdash; which, against a prison population of 87,000, would imply between 435 and 4,350 people currently serving sentences for crimes they did not commit. These estimates are highly uncertain and methodologically contested. What is not contested is that the system for correcting errors is slow, applies a conservative threshold, and has not been resourced to match demand.</p>
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
              onExpand={() => {}}
            />
            <MetricCard
              label="Cases referred to Court of Appeal"
              value="33"
              unit="/year"
              direction="flat"
              polarity="up-is-good"
              changeText="~2% referral rate &middot; ~70% of referrals result in quashed conviction"
              sparklineData={[32, 28, 27, 34, 30, 22, 25, 31, 29, 33]}
              source="CCRC &middot; Annual Report, 2024"
              onExpand={() => {}}
            />
            <MetricCard
              label="Post Office convictions overturned"
              value="983"
              direction="up"
              polarity="up-is-good"
              changeText="Largest miscarriage of justice in British legal history"
              sparklineData={[0, 0, 39, 72, 200, 500, 700, 900, 983]}
              source="Post Office Horizon Inquiry, 2024"
              onExpand={() => {}}
            />
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
