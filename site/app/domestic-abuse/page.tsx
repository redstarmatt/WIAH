'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'ONS', dataset: 'Domestic abuse in England and Wales overview', url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/crimeandjustice/bulletins/domesticabuseinenglandandwalesoverview/latest', date: '2024' },
  { num: 2, name: 'Home Office', dataset: 'Crime outcomes in England and Wales', url: 'https://www.gov.uk/government/statistics/crime-outcomes-in-england-and-wales-statistics', date: '2024' },
  { num: 3, name: "Women's Aid", dataset: 'Annual Survey', url: 'https://www.womensaid.org.uk/information-support/what-is-domestic-abuse/statistics/', date: '2024' },
];

export default function DomesticAbusePage() {
  // Domestic abuse crimes recorded (millions), 2015–2024
  const incidentsRecorded = [1.03, 1.07, 1.14, 1.22, 1.31, 1.39, 1.46, 1.50, 1.49, 1.51];
  // Charge rate (%), 2015–2024
  const chargeRate = [9.5, 9.1, 8.8, 8.3, 7.9, 7.5, 7.2, 7.0, 6.9, 7.0];
  // Conviction rate (%), 2015–2024
  const convictionRate = [7.2, 6.9, 6.7, 6.3, 6.0, 5.8, 5.6, 5.5, 5.5, 5.6];

  const chart1Series: Series[] = [
    {
      id: 'incidents',
      label: 'Domestic abuse crimes recorded (millions)',
      colour: '#E63946',
      data: incidentsRecorded.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
  ];

  const chart1Annotations: Annotation[] = [
    { date: new Date(2015, 0, 1), label: '2015: Domestic Abuse Statutory Guidance' },
    { date: new Date(2021, 0, 1), label: '2021: Domestic Abuse Act' },
  ];

  const chart2Series: Series[] = [
    {
      id: 'charge',
      label: 'Charge rate (%)',
      colour: '#E63946',
      data: chargeRate.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
    {
      id: 'conviction',
      label: 'Conviction rate (%)',
      colour: '#6B7280',
      data: convictionRate.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
  ];

  return (
    <>
      <TopicNav topic="Domestic Abuse" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Domestic Abuse"
          question="What Happens When Domestic Abuse is Reported?"
          finding="Police record 1.5 million domestic abuse incidents annually — but only 7% lead to a charge, and refuge capacity meets less than half of demand."
          colour="#E63946"
          preposition="on"
        />

        <section className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="DA incidents recorded (millions/year)"
              value="1.51"
              direction="up"
              polarity="up-is-bad"
              changeText="+47% since 2015 · reflects both more reporting and more crime"
              sparklineData={incidentsRecorded}
              source="ONS — Domestic abuse prevalence and trends, 2024"
            />
            <MetricCard
              label="Charge rate (%)"
              value="7.0"
              direction="down"
              polarity="down-is-bad"
              changeText="down from 9.5% in 2015 · justice increasingly elusive"
              sparklineData={chargeRate}
              source="Home Office — Crime outcomes in England and Wales, 2024"
            />
            <MetricCard
              label="Refuge spaces vs demand (%)"
              value="<50%"
              direction="down"
              polarity="down-is-bad"
              changeText="fewer than 1 in 2 women seeking refuge can be housed"
              sparklineData={[60, 56, 53, 52, 50, 49, 48, 47, 46, 46]}
              source="Women's Aid — Annual Survey, 2024"
            />
          </div>
        </section>

        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="Domestic abuse crimes recorded by police, England & Wales, 2015–2024"
              subtitle="Millions. Includes both partner and family abuse. Rise reflects improved recording and increased reporting."
              series={chart1Series}
              annotations={chart1Annotations}
              yLabel="Millions of crimes"
              source={{
                name: 'Office for National Statistics',
                dataset: 'Domestic abuse in England and Wales',
                frequency: 'annual',
                url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/crimeandjustice/bulletins/domesticabuseinenglandandwalesoverview/latest',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="Domestic abuse charge and conviction rates, 2015–2024"
              subtitle="% of recorded domestic abuse crimes leading to a charge or conviction. England & Wales."
              series={chart2Series}
              yLabel="% of recorded crimes"
              source={{
                name: 'Home Office',
                dataset: 'Crime outcomes in England and Wales',
                frequency: 'annual',
                url: 'https://www.gov.uk/government/statistics/crime-outcomes-in-england-and-wales-statistics',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The justice gap</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>Police record around 1.5 million domestic abuse crimes each year in England and Wales.<Cite nums={1} /> The true prevalence is higher — the Crime Survey for England and Wales estimates around 2.1 million adults experience domestic abuse annually, and many incidents are never reported.<Cite nums={1} /> Women account for 74% of victims.<Cite nums={1} /></p>
              <p>Of the crimes that are recorded, only around 7% lead to a charge. This has fallen from 9.5% in 2015, despite the Domestic Abuse Act 2021 introducing new offences and stronger protections.<Cite nums={2} /> The reasons are complex: victims often withdraw support for prosecution, evidence gathering is difficult without victim testimony, and case complexity has grown as stalking and coercive control become more commonly recognised and charged.</p>
              <p>Refuge capacity has been chronically underfunded. In any given year, Women&apos;s Aid surveys find that fewer than half of women seeking refuge can be accommodated.<Cite nums={3} /> Local authority cuts to specialist domestic abuse services have compounded the shortage, with many councils relying on short-term grant funding rather than statutory provision.</p>
            </div>
          </section>
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p><a href="https://www.ons.gov.uk/peoplepopulationandcommunity/crimeandjustice/bulletins/domesticabuseinenglandandwalesoverview/latest" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ONS — Domestic abuse in England and Wales overview</a>. Annual. Retrieved 2024.</p>
            <p><a href="https://www.gov.uk/government/statistics/crime-outcomes-in-england-and-wales-statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Home Office — Crime outcomes in England and Wales</a>. Annual. Retrieved 2024.</p>
            <p><a href="https://www.womensaid.org.uk/information-support/what-is-domestic-abuse/statistics/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Women's Aid — Annual Survey</a>. Retrieved 2024.</p>
            <p>All figures are for England and Wales unless otherwise stated. Domestic abuse crimes include both partner and family abuse.</p>
          </div>
        </section>
      </main>
    </>
  );
}
