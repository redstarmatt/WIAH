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
  { num: 1, name: 'Ministry of Justice', dataset: 'Criminal Court Statistics', url: 'https://www.gov.uk/government/collections/criminal-court-statistics', date: 'Jan 2024' },
  { num: 2, name: 'Ministry of Justice', dataset: 'Criminal Justice Journey Statistics', url: 'https://www.gov.uk/government/statistics/criminal-justice-statistics-quarterly', date: 'Jan 2024' },
  { num: 3, name: 'Ministry of Justice', dataset: 'Prison Population Statistics', url: 'https://www.gov.uk/government/collections/prison-population-statistics', date: '2024' },
  { num: 4, name: 'Law Society', dataset: 'Criminal Legal Aid Statistics', date: '2024' },
];

export default function CourtBacklogPage() {
  const colour = '#6B7280';

  // Crown Court case backlog 2015–2024 (thousands)
  const backlogData = [37.6, 38.9, 39.7, 40.6, 41.3, 40.8, 58.3, 60.7, 64.1, 66.5];
  const backlogAnnotations: Annotation[] = [
    { date: new Date(2020, 2, 1), label: '2020: Courts closed (COVID)' },
    { date: new Date(2022, 7, 1), label: '2022: Bar strikes' },
  ];
  const backlogTarget = { value: 53, label: 'Government target: 53K' };

  const backlogSeries: Series[] = [
    {
      id: 'backlog',
      label: 'Crown Court outstanding cases (thousands)',
      colour: colour,
      data: backlogData.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
  ];

  // Average waiting time from charge to completion 2015–2024 (months)
  const waitData = [10.5, 11.2, 11.8, 12.3, 13.1, 13.7, 17.4, 18.9, 20.1, 18.3];

  const waitSeries: Series[] = [
    {
      id: 'wait',
      label: 'Average wait from charge to completion (months)',
      colour: '#E63946',
      data: waitData.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
  ];

  const waitAnnotations: Annotation[] = [
    { date: new Date(2020, 2, 1), label: '2020: COVID closures' },
  ];

  return (
    <>
      <TopicNav topic="Court Backlog" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Court Backlog"
          question="How Backed Up Are the Courts?"
          finding="The Crown Court backlog hit 73,000 cases in 2024 — a record — with defendants waiting an average of 18 months for trial, and victims waiting years for justice."
          colour={colour}
          preposition="in"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Overview' },
          { id: 'sec-backlog', label: 'Backlog Trend' },
          { id: 'sec-waits', label: 'Waiting Times' },
        ]} />

        <section id="sec-metrics" className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Crown Court backlog (thousands)"
              value="73"
              direction="up"
              polarity="up-is-bad"
              changeText="2024 · record high · up from 41K before COVID · target 53K"
              sparklineData={[37.6, 38.9, 39.7, 40.6, 41.3, 58.3, 60.7, 64.1, 66.5, 73]}
              source="Ministry of Justice — Criminal Court Statistics, 2024"
            />
            <MetricCard
              label="Average wait to trial (months)"
              value="18"
              direction="up"
              polarity="up-is-bad"
              changeText="2024 · up from 10.5 months in 2015 · doubled since pre-COVID"
              sparklineData={[10.5, 11.2, 11.8, 12.3, 13.1, 17.4, 18.9, 20.1, 18.3, 18]}
              source="Ministry of Justice — Criminal Justice Journey Statistics, 2024"
            />
            <MetricCard
              label="Cases over 2 years old (thousands)"
              value="8.9"
              direction="up"
              polarity="up-is-bad"
              changeText="2024 · record · includes rape and serious violence · victims in legal limbo"
              sparklineData={[0.4, 0.5, 0.7, 0.9, 1.1, 2.8, 4.3, 5.9, 7.2, 8.9]}
              source="Ministry of Justice — Criminal Court Statistics, 2024"
            />
          </div>
        </section>

        <ScrollReveal>
          <section id="sec-backlog" className="mb-12">
            <LineChart
              title="Crown Court outstanding cases, 2015–2024 (thousands)"
              subtitle="England and Wales. Cases outstanding at end of quarter. COVID-19 drove a doubling of the backlog; the government's 53,000-case target has not been met since the pandemic."
              series={backlogSeries}
              annotations={backlogAnnotations}
              targetLine={backlogTarget}
              yLabel="Outstanding cases (thousands)"
              source={{
                name: 'Ministry of Justice',
                dataset: 'Criminal Court Statistics',
                frequency: 'quarterly',
                url: 'https://www.gov.uk/government/collections/criminal-court-statistics',
                date: 'Jan 2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-waits" className="mb-12">
            <LineChart
              title="Average waiting time from charge to Crown Court completion, 2015–2024 (months)"
              subtitle="England and Wales. Mean number of months from charge to case disposal in the Crown Court."
              series={waitSeries}
              annotations={waitAnnotations}
              yLabel="Months"
              source={{
                name: 'Ministry of Justice',
                dataset: 'Criminal Justice Journey Statistics',
                frequency: 'annual',
                url: 'https://www.gov.uk/government/statistics/criminal-justice-statistics-quarterly',
                date: 'Jan 2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="Steps being taken"
            value="106,000"
            unit="Crown Court sitting days in 2023/24 — the highest since 2014"
            description="The government committed to increasing Crown Court sitting days to 106,000 in 2023/24 — the highest since 2014. Nightingale courts, temporary hearing venues in hotels, racecourses, and civic buildings, heard over 100,000 cases between 2020 and 2023. The Criminal Legal Aid Review delivered a 15% fee increase for defence solicitors in 2022, reducing the risk of firms exiting legal aid work. The magistrates' courts are processing record numbers of cases using new digital hearing systems. The Law Commission is reviewing the guilty plea discount system to encourage earlier resolution and free up Crown Court capacity."
            source="Source: Ministry of Justice — Criminal Court Statistics 2024; HMCTS — Annual Report 2023/24."
          />
        </ScrollReveal>

        <ScrollReveal>
          <section className="max-w-2xl mb-12 mt-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">What the data shows</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>England's Crown Courts had 73,000 cases outstanding at end of 2024 — a record — up from 41,000 before the pandemic.<Cite nums={1} /> The government's 53,000-case target has not been met since 2020.<Cite nums={1} /> COVID-19 shuttered courts entirely in spring 2020 and kept them at reduced capacity for eighteen months; recovery was then derailed by the criminal Bar strike of autumn 2022, when barristers walked out for more than thirty days over legal aid rates. Jury trial complexity is rising, sentencing guidelines have lengthened average hearings, and the magistrates' courts carry their own backlog of over 350,000 cases.<Cite nums={1} /></p>
              <p>Criminal legal aid rates were last substantially raised in 1994; by 2024 their real-terms value had fallen roughly 40%, according to the Law Society.<Cite nums={4} /> In 2023 alone, 82 solicitor firms exited criminal legal aid work, creating advice deserts across swathes of England and Wales.<Cite nums={4} /> The consequences land on defendants: 16,400 people — 24% of the prison population — are held on remand awaiting trial, a record.<Cite nums={3} /> Some have waited more than two years, testing human rights conventions on reasonable detention.</p>
              <p>Victims bear the heaviest cost. For sexual offences, the average wait from offence to Crown Court completion exceeds 1,000 days, leaving complainants in legal limbo for nearly three years.<Cite nums={2} /> Around 30% of victims of serious offences withdraw from proceedings citing unbearable delays.<Cite nums={2} /> Operation Nightingale — temporary courts in hotels, racecourses, and civic venues — heard more than 100,000 cases between 2020 and 2023 but has since wound down.<Cite nums={1} /></p>
            </div>
          </section>
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p><a href="https://www.gov.uk/government/collections/criminal-court-statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Ministry of Justice — Criminal Court Statistics</a> — quarterly. Outstanding cases and trial completion data.</p>
            <p><a href="https://www.gov.uk/government/statistics/criminal-justice-statistics-quarterly" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Ministry of Justice — Criminal Justice Journey Statistics</a> — annual. Time from offence to completion.</p>
            <p><a href="https://www.gov.uk/government/collections/prison-population-statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Ministry of Justice — Prison Population Statistics</a> — monthly. Remand prisoner numbers.</p>
            <p>All figures are for England and Wales unless otherwise stated. Outstanding cases figures are end-of-quarter snapshots.</p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
