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

const editorialRefs: Reference[] = [
  { num: 1, name: 'NHS Digital', dataset: 'Safeguarding Adults annual collection', url: 'https://digital.nhs.uk/data-and-information/publications/statistical/safeguarding-adults', date: '2024' },
  { num: 2, name: 'Age UK / Action on Elder Abuse', dataset: 'Elder financial abuse prevalence survey', date: '2024' },
  { num: 3, name: 'UK Finance', dataset: 'Annual Fraud Report', date: '2023' },
  { num: 4, name: 'CPS / Home Office', dataset: 'Prosecution data on elder financial abuse', date: '2024' },
];

export default function FinancialAbuseElderlyPage() {
  const safeguardingReferralsData = [58, 62, 67, 72, 78, 82, 88, 91, 95, 100];
  const abuseTypesData = [
    [32, 33, 34, 35, 36, 37],
    [28, 29, 30, 31, 32, 33],
    [22, 22, 22, 23, 23, 23],
    [18, 16, 14, 11, 9, 7],
  ];

  const referralsSeries: Series[] = [
    {
      id: 'referrals',
      label: 'Financial abuse referrals to adult safeguarding (thousands)',
      colour: '#E63946',
      data: safeguardingReferralsData.map((v: number, i: number) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
  ];

  const abuseTypesSeries: Series[] = [
    {
      id: 'theft',
      label: 'Theft by family/carer (%)',
      colour: '#E63946',
      data: abuseTypesData[0].map((v: number, i: number) => ({ date: new Date(2019 + i, 0, 1), value: v })),
    },
    {
      id: 'scams',
      label: 'Phone/online scams (%)',
      colour: '#F4A261',
      data: abuseTypesData[1].map((v: number, i: number) => ({ date: new Date(2019 + i, 0, 1), value: v })),
    },
    {
      id: 'poa',
      label: 'Power of attorney misuse (%)',
      colour: '#6B7280',
      data: abuseTypesData[2].map((v: number, i: number) => ({ date: new Date(2019 + i, 0, 1), value: v })),
    },
    {
      id: 'other',
      label: 'Other financial abuse (%)',
      colour: '#264653',
      data: abuseTypesData[3].map((v: number, i: number) => ({ date: new Date(2019 + i, 0, 1), value: v })),
    },
  ];

  const referralAnnotations: Annotation[] = [
    { date: new Date(2015, 0, 1), label: '2015: Care Act — adult safeguarding duties' },
    { date: new Date(2020, 0, 1), label: '2020: Digital fraud accelerates during lockdowns' },
  ];

  return (
    <>
      <TopicNav topic="Financial Abuse of Older People" />
      <SectionNav sections={[
        { id: 'sec-metrics', label: 'Key Metrics' },
        { id: 'sec-referrals', label: 'Safeguarding Referrals' },
        { id: 'sec-types', label: 'Types of Abuse' },
        { id: 'sec-context', label: 'Context' },
        { id: 'sec-sources', label: 'Sources' },
      ]} />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Elder Financial Abuse"
          question="How Widespread is Financial Abuse of Older People?"
          finding="An estimated 1 million older people in England experience financial abuse annually — yet only 1 in 4 cases is ever reported, and prosecutions remain rare."
          colour="#E63946"
        />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 mb-12">
            <MetricCard
              label="Estimated victims of financial abuse (millions/yr)"
              value="1.0"
              direction="up"
              polarity="up-is-bad"
              changeText="~1m older people affected annually · mostly unreported"
              sparklineData={[0.7, 0.75, 0.8, 0.85, 0.9, 0.95, 1.0]}
              source="Age UK / Action on Elder Abuse — 2024"
            />
            <MetricCard
              label="Cases ever reported (%)"
              value="25"
              direction="flat"
              polarity="up-is-good"
              changeText="only 1 in 4 cases reported · shame and dependency barriers"
              sparklineData={[24, 24, 25, 25, 25, 25, 25]}
              source="Action on Elder Abuse — 2024"
            />
            <MetricCard
              label="Successful prosecutions per year"
              value="820"
              direction="up"
              polarity="up-is-good"
              changeText="up from 420 in 2015 · still a tiny fraction of offences"
              sparklineData={[420, 480, 540, 600, 660, 740, 820]}
              source="CPS / Home Office — 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-referrals" className="mb-12">
            <LineChart
              title="Financial abuse referrals to adult safeguarding, England 2015–2024 (thousands)"
              subtitle="Formal referrals under the Care Act 2014. These represent reported cases only — estimated true prevalence is 4× higher."
              series={referralsSeries}
              annotations={referralAnnotations}
              yLabel="Referrals (thousands)"
              source={{
                name: 'NHS Digital',
                dataset: 'Adult Social Care Statistics: Safeguarding Adults annual collection',
                frequency: 'annual',
                url: 'https://digital.nhs.uk/data-and-information/publications/statistical/safeguarding-adults',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-types" className="mb-12">
            <LineChart
              title="Types of financial abuse reported, England 2019–2024 (% of cases)"
              subtitle="Breakdown of financial abuse categories in adult safeguarding referrals. Phone and online scams are a growing share of reported cases."
              series={abuseTypesSeries}
              yLabel="Share of reported cases (%)"
              source={{
                name: 'Action on Elder Abuse / NHS Digital',
                dataset: 'Safeguarding Adults — abuse type analysis',
                frequency: 'annual',
                url: 'https://digital.nhs.uk/data-and-information/publications/statistical/safeguarding-adults',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="Reporting Increasing"
            value="9,000"
            unit="referrals"
            description="The Office of the Public Guardian received over 9,000 referrals for attorney misconduct in 2024 — nearly double the 2019 figure — reflecting improved reporting and greater public awareness of power of attorney abuse. Specialist police units focused on elder fraud have improved prosecution rates, though volume remains low relative to estimated offending."
            source="Office of the Public Guardian, Annual Report 2024"
          />
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-context" className="max-w-2xl mb-12 mt-8">
            <h2 className="text-xl font-bold text-wiah-black mb-4">Hidden, complex, and systematically underreported</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>Financial abuse is the most common form of elder abuse in England after neglect. Age UK and Action on Elder Abuse estimate around 1 million older people experience it annually — through theft by family members or carers, fraud by strangers, and misuse of powers of attorney — costing an estimated £3.6 billion each year.<Cite nums={[2]} /> Phone and online scams targeting people over 65 generated £1.2 billion in losses in 2023 alone, with authorised push payment fraud particularly hard to recover.<Cite nums={[3]} /> Yet formal adult safeguarding referrals capture only a fraction of actual cases.<Cite nums={[1]} /></p>
              <p>The low reporting rate reflects structural features of the abuse itself. Many victims do not recognise that what is happening is abuse — particularly where cognitive decline reduces financial decision-making capacity. Where the perpetrator is a family member — the most common scenario in domestic settings — victims often stay silent out of loyalty, shame, fear of losing care, or inability to navigate reporting processes. Adults with dementia are particularly vulnerable: they may not be able to recall or articulate what has happened, and those responsible for their care may also control access to information.</p>
              <p>The adult safeguarding system, strengthened by the Care Act 2014, is the primary statutory mechanism for response. But it operates under severe capacity pressure, and financial abuse cases are among the most complex and resource-intensive to investigate. The forensic complexity of multi-party financial abuse — involving banks, solicitors, attorneys, and family members — often exceeds the capacity of overstretched safeguarding teams.</p>
            </div>
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p><a href="https://digital.nhs.uk/data-and-information/publications/statistical/safeguarding-adults" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS Digital — Safeguarding Adults annual collection</a> — formal referral data under Care Act 2014. Victim estimates from Age UK Later Life in the UK factsheet and Action on Elder Abuse survey research.</p>
            <p>Financial loss estimates from UK Finance Annual Fraud Report supplemented by academic survey estimates accounting for underreporting. Office of the Public Guardian referral data from Ministry of Justice OPG annual report. Prosecution data from Crown Prosecution Service data and analysis. All figures are for England.</p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
