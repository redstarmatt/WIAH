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
  { num: 1, name: 'Ministry of Justice', dataset: 'Legal Aid Statistics — Quarterly 2024', url: 'https://www.gov.uk/government/collections/legal-aid-statistics', date: '2024' },
  { num: 2, name: 'Law Society', dataset: 'Legal aid deserts report 2024', url: 'https://www.lawsociety.org.uk/campaigns/legal-aid', date: '2024' },
  { num: 3, name: 'Ministry of Justice', dataset: 'LASPO Post-Implementation Review 2019', url: 'https://www.gov.uk/government/publications/post-implementation-review-of-part-1-of-laspo', date: '2019' },
  { num: 4, name: 'Public Accounts Committee', dataset: 'Reports on legal aid sustainability, 2015–2023', date: '2023' },
];

export default function LegalAidPage() {
  const colour = '#6B7280';

  // Legal aid expenditure 2010–2024 (real terms £bn, 2024 prices)
  const expenditureData = [2.51, 2.41, 2.21, 2.08, 1.98, 1.92, 1.88, 1.85, 1.83, 1.81, 1.79, 1.82, 1.84, 1.86, 1.88];
  const expenditureAnnotations: Annotation[] = [
    { date: new Date(2012, 3, 1), label: '2012: LASPO cuts take effect' },
    { date: new Date(2019, 0, 1), label: '2019: LASPO post-implementation review' },
  ];

  const expenditureSeries: Series[] = [
    {
      id: 'spend',
      label: 'Legal aid expenditure (real terms £bn)',
      colour: colour,
      data: expenditureData.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
    },
  ];

  // Legal aid cases granted by category 2012–2024 (thousands/year)
  const familyCases    = [180, 165, 148, 132, 120, 110, 102, 96, 91, 88, 85, 87, 90];
  const housingCases   = [52, 45, 38, 34, 30, 28, 26, 24, 22, 21, 20, 21, 22];
  const immigrationCases = [70, 62, 55, 48, 42, 38, 35, 33, 31, 30, 29, 31, 33];

  const casesSeries: Series[] = [
    {
      id: 'family',
      label: 'Family law cases (thousands)',
      colour: '#E63946',
      data: familyCases.map((v, i) => ({ date: new Date(2012 + i, 0, 1), value: v })),
    },
    {
      id: 'housing',
      label: 'Housing law cases (thousands)',
      colour: colour,
      data: housingCases.map((v, i) => ({ date: new Date(2012 + i, 0, 1), value: v })),
    },
    {
      id: 'immigration',
      label: 'Immigration law cases (thousands)',
      colour: '#264653',
      data: immigrationCases.map((v, i) => ({ date: new Date(2012 + i, 0, 1), value: v })),
    },
  ];

  const casesAnnotations: Annotation[] = [
    { date: new Date(2013, 0, 1), label: '2013: Scope restrictions begin' },
  ];

  return (
    <>
      <TopicNav topic="Legal Aid" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Legal Aid"
          question="Can People Still Get Legal Aid?"
          finding="Legal aid spending fell 25% in real terms since 2012 — 59% of areas have no housing legal aid solicitor — leaving millions unable to afford justice in family, housing and immigration cases."
          colour={colour}
          preposition="with"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Overview' },
          { id: 'sec-spend', label: 'Expenditure' },
          { id: 'sec-cases', label: 'Cases by Category' },
        ]} />

        <section id="sec-metrics" className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Legal aid spend — real terms change since 2012 (%)"
              value="-25"
              direction="down"
              polarity="down-is-bad"
              changeText="2024 · LASPO cut scope and eligibility · rates frozen for decades in real terms"
              sparklineData={[100, 96, 88, 83, 79, 76, 75, 74, 73, 72, 71, 72, 73, 74, 75]}
              source="Ministry of Justice — Legal Aid Statistics, 2024"
            />
            <MetricCard
              label="Areas with no housing legal aid solicitor (%)"
              value="59"
              direction="up"
              polarity="up-is-bad"
              changeText="2024 · legal aid deserts across England and Wales · rural and deprived areas worst hit"
              sparklineData={[12, 18, 25, 32, 38, 43, 47, 50, 53, 55, 57, 58, 59]}
              source="Law Society — Legal aid deserts report, 2024"
            />
            <MetricCard
              label="Cases granted legal aid (thousands/yr)"
              value="135"
              direction="down"
              polarity="down-is-bad"
              changeText="2024 · down from 302K in 2012 · 55% reduction · millions left without help"
              sparklineData={[302, 272, 241, 214, 192, 176, 163, 153, 144, 139, 135, 139, 145]}
              source="Ministry of Justice — Legal Aid Statistics, 2024"
            />
          </div>
        </section>

        <ScrollReveal>
          <section id="sec-spend" className="mb-12">
            <LineChart
              title="Legal aid expenditure, England and Wales, 2010–2024 (real terms £bn, 2024 prices)"
              subtitle="Total civil and criminal legal aid spending in real terms. The Legal Aid, Sentencing and Punishment of Offenders Act 2012 (LASPO) removed large areas of civil law from scope."
              series={expenditureSeries}
              annotations={expenditureAnnotations}
              yLabel="Expenditure (real terms £bn)"
              source={{
                name: 'Ministry of Justice',
                dataset: 'Legal Aid Statistics',
                frequency: 'quarterly',
                url: 'https://www.gov.uk/government/collections/legal-aid-statistics',
                date: 'Jan 2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-cases" className="mb-12">
            <LineChart
              title="Legal aid cases granted by category, 2012–2024 (thousands per year)"
              subtitle="England and Wales. Civil legal aid cases in family, housing, and immigration law. All three categories fell sharply after LASPO removed most private family law, housing and immigration cases from scope."
              series={casesSeries}
              annotations={casesAnnotations}
              yLabel="Cases (thousands)"
              source={{
                name: 'Ministry of Justice',
                dataset: 'Legal Aid Statistics — civil',
                frequency: 'quarterly',
                url: 'https://www.gov.uk/government/collections/legal-aid-statistics',
                date: 'Jan 2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="Some restoration underway"
            value="£5,000"
            unit="threshold for legal help extended — mediation and early advice funded for family cases"
            description="The 2019 LASPO post-implementation review acknowledged that the cuts had gone too far, particularly in family and housing law. The Exceptional Case Funding scheme was expanded. Early legal advice pilots in housing and family law were funded from 2022. The Renters Reform Bill includes provisions requiring local authorities to refer tenants to housing advisers. The Legal Aid Agency has increased some family law rates for the first time in decades. The Law Society's 'Legal Deserts' report (2024) has driven political attention to the 59% of areas without housing legal aid provision."
            source="Source: Ministry of Justice — LASPO post-implementation review 2019; Law Society — Legal aid deserts report 2024."
          />
        </ScrollReveal>

        <ScrollReveal>
          <section className="max-w-2xl mb-12 mt-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">What the data shows</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>The Legal Aid, Sentencing and Punishment of Offenders Act 2012 (LASPO) was the most significant restriction on access to legal aid since the system was created in 1949. It removed almost all private family law, most housing disputes, clinical negligence, employment, and immigration cases from the scope of legal aid. Combined with fee rates that have been frozen in cash terms since the 1990s — representing a real-terms cut of around 40% — LASPO has made civil legal aid economically unviable for many law firms.<Cite nums={1} /> Total civil legal aid cases have fallen from 302,000 in 2012 to approximately 135,000 in 2024.<Cite nums={1} /></p>
              <p>The geographical consequences are severe. The Law Society identified in 2024 that 59% of local authority areas in England and Wales have no housing legal aid solicitor — they are &ldquo;legal aid deserts.&rdquo;<Cite nums={2} /> For areas with housing problems — damp, disrepair, illegal evictions — this means travelling potentially hours to access advice. For criminal legal aid, 82 firms exited the market in 2023 alone, following the 15% fee increase offered in 2022 — a rate so low after decades of inflation that most criminal solicitors earn below the minimum wage per hour when legal aid work is properly costed.</p>
              <p>The downstream costs of legal aid cuts fall elsewhere in the public sector. Studies consistently show that every £1 of housing legal aid generates £2.34 in savings elsewhere through prevented homelessness, reduced NHS usage, and avoided domestic violence.<Cite nums={3} /> The Ministry of Justice's own research found that litigants in person — people representing themselves because they cannot access legal help — slow court proceedings by an average of 50 minutes per hearing. The false economy of legal aid cuts has been noted by the Public Accounts Committee in three successive reports since 2015.<Cite nums={4} /></p>
            </div>
          </section>
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p><a href="https://www.gov.uk/government/collections/legal-aid-statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Ministry of Justice — Legal Aid Statistics</a> — quarterly. Expenditure, cases by category, provider numbers.</p>
            <p><a href="https://www.lawsociety.org.uk/campaigns/legal-aid" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Law Society — Legal aid campaigns and research</a></p>
            <p><a href="https://www.gov.uk/government/publications/post-implementation-review-of-part-1-of-laspo" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Ministry of Justice — LASPO Post-Implementation Review 2019</a></p>
            <p>Real-terms figures use HM Treasury GDP deflator. All figures are for England and Wales. &lsquo;Legal aid deserts&rsquo; definition from Law Society mapping of providers with active Legal Aid Agency contracts.</p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
