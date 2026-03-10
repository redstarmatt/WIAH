'use client';

import { useState, useEffect } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';

interface YouthJusticeData {
  national: {
    custodyNumbers: { year: number; count: number }[];
    reoffendingRate: { year: number; pct: number }[];
    byEthnicity: { group: string; pctOfCustody: number }[];
  };
}

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

export default function YouthJusticePage() {
  const [data, setData] = useState<YouthJusticeData | null>(null);

  useEffect(() => {
    fetch('/data/youth-justice/youth_justice.json')
      .then(res => res.json())
      .then(setData)
      .catch(err => console.error('Failed to load youth justice data:', err));
  }, []);

  const custodySeries: Series[] = data ? [{
    id: 'custody',
    label: 'Children in custody',
    colour: '#6B7280',
    data: data.national.custodyNumbers.map(d => ({
      date: yearToDate(d.year),
      value: d.count
    }))
  }] : [];

  const custodyAnnotations: Annotation[] = [{
    date: yearToDate(2008),
    label: 'Peak: 3,006'
  }];

  const reoffendingSeries: Series[] = data ? [{
    id: 'reoffending',
    label: 'Reoffending rate',
    colour: '#6B7280',
    data: data.national.reoffendingRate.map(d => ({
      date: yearToDate(d.year),
      value: d.pct
    }))
  }] : [];

  return (
    <>
      <TopicNav topic="Youth Justice" />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <TopicHeader
          topic="Youth Justice"
          question="Are We Locking Up Too Many Children?"
          finding="The number of children in custody in England and Wales has fallen dramatically — from over 3,000 in 2008 to around 430 in 2024. But those who remain in custody are disproportionately children of colour and children with complex needs. Reoffending rates for young people leaving custody remain high, and the secure estate faces persistent concerns about violence, self-harm, and inadequate education."
          colour="#6B7280"
          preposition="in"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The decline in children in custody is one of the most striking achievements in modern UK criminal justice. In 2008 there were 3,006 children held in custody in England and Wales; by 2024 that figure had fallen to 430 — an 86% reduction sustained over 15 years, driven by Youth Offending Teams, diversion from prosecution, and a consistent policy preference for non-custodial outcomes. Over 70% of children dealt with by the justice system now receive non-custodial disposals. But what the aggregate number obscures is who remains: the 430 in custody are disproportionately those with the most complex multiple needs — 47% have experienced abuse or neglect, 60% have been in local authority care, and 68% have identified mental health needs. Reoffending within 12 months of leaving custody sits at around 68%, barely moved in a decade. Children in custody receive on average 2–3 hours of education per day, and in 2022/23 there were 1,034 self-harm incidents across the youth custody estate.</p>
            <p>Racial disparity is the system's most persistent structural failure. Black children make up approximately 5% of the 10–17 population but 29% of the youth custody population — a sixfold overrepresentation that begins at the point of stop-and-search and compounds at every subsequent stage. The Lammy Review in 2017 documented this in detail; nearly a decade later progress has been limited. Knife possession charges among under-18s have risen even as overall custody has fallen, creating political pressure for more punitive responses that cuts against the diversion model responsible for the long-run improvement.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-context', label: 'Context' },
          { id: 'sec-charts', label: 'Charts' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <section id="sec-overview" className="mt-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <MetricCard
              label="Children in custody"
              value="430"
              direction="down"
              polarity="up-is-bad"
              changeText="2024 · Down 86% from 3,006 in 2008"
              source="Youth Justice Board · Remarkable decline driven by diversion, early intervention"
              href="#sec-context"/>
            <MetricCard
              label="Reoffending rate within 12 months"
              value="68%"
              unit="%"
              direction="flat"
              polarity="up-is-bad"
              changeText="2023 · Of young people leaving custody · Broadly unchanged for a decade"
              source="Ministry of Justice · 7 in 10 reoffend after custody"
              href="#sec-sources"/>
            <MetricCard
              label="Black children as % of custody population"
              value="29%"
              unit="%"
              direction="flat"
              polarity="up-is-bad"
              changeText="Black children are 5% of 10–17 population but 29% of custody population · 6x overrepresentation"
              source="Youth Justice Board Statistics · Disproportionality Analysis"
              href="#sec-sources"/>
          </div>
        </section>

        <section id="sec-charts" className="mt-12 space-y-16">
          <ScrollReveal>
            <div className="bg-white rounded-lg p-6 border border-wiah-border">
              <LineChart
                title="Children in custody, England &amp; Wales, 2008–2024"
                subtitle="Total number of under-18s in the secure youth estate. Includes secure children's homes, secure training centres, and young offenders' institutions."
                series={custodySeries}
                annotations={custodyAnnotations}
                source={{
                  name: 'Youth Justice Board',
                  dataset: 'Annual Workload Data & Establishment Census',
                  url: 'https://www.gov.uk/government/organisations/youth-justice-board-for-england-and-wales',
                  frequency: 'annual',
                  date: '2024'
                }}
              />
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="bg-white rounded-lg p-6 border border-wiah-border">
              <LineChart
                title="Young people reoffending rate within 12 months, 2013–2023"
                subtitle="Percentage of young people who received a sanction detection within 12 months of leaving the youth justice system. Includes custodial and community sentences."
                series={reoffendingSeries}
                source={{
                  name: 'Ministry of Justice',
                  dataset: 'Youth Reoffending Statistics',
                  url: 'https://www.gov.uk/government/statistics/youth-reoffending-statistics',
                  frequency: 'annual',
                  date: '2024'
                }}
              />
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="bg-white rounded-lg p-6 border border-wiah-border">
              <div className="mb-6">
                <h3 className="text-lg font-bold text-wiah-black mb-2">Children in custody by ethnic group</h3>
                <p className="text-sm text-wiah-mid">Percentage of total secure youth estate population. Black children are 5% of the 10–17 age population but 29% of custodial population — a six-fold overrepresentation.</p>
              </div>
              <div className="space-y-3">
                {data?.national.byEthnicity.map(d => (
                  <div key={d.group}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-wiah-black">{d.group}</span>
                      <span className="font-mono text-wiah-mid">{d.pctOfCustody}%</span>
                    </div>
                    <div className="h-2 bg-wiah-border rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{ width: `${d.pctOfCustody}%`, backgroundColor: '#6B7280' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-wiah-mid mt-4 font-mono">
                Source: Youth Justice Board Statistics · 2024 Annual Workload Data
              </p>
            </div>
          </ScrollReveal>
        </section>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border">
          <h2 className="text-2xl font-bold text-wiah-black mb-4">Sources &amp; methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3">
            <p>
              <strong className="text-wiah-black">Custody numbers:</strong> Youth Justice Board Annual Workload Data and Establishment Census. Published annually in March. Includes all under-18s held in secure children's homes, secure training centres, and young offenders' institutions managed by the public and private sectors.
            </p>
            <p>
              <strong className="text-wiah-black">Reoffending rate:</strong> Ministry of Justice Youth Reoffending Statistics. Tracks young people who exit the youth justice system and measures whether they received a sanction detection (caution, conviction, or custody) within 12 months. Annual publication with 18-month lag.
            </p>
            <p>
              <strong className="text-wiah-black">Ethnic representation:</strong> Youth Justice Board ethnicity breakdown in Annual Workload Data. Population statistics from ONS Census 2021. Overrepresentation figures calculated as ratio of custody proportion to population proportion.
            </p>
            <p>
              <strong className="text-wiah-black">Methodology notes:</strong> The secure youth estate definition changed in 2017 following closure of Youth Offenders' Institutions. Pre-2017 data is comparable but reflects a different estate composition. Reoffending figures exclude young people who died, emigrated, or otherwise left the population during the follow-up period.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
