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
  { num: 1, name: 'IOPC', dataset: 'Police Complaints Statistics — Annual Report', url: 'https://www.policeconduct.gov.uk/research-and-learning/statistics', date: '2023', note: '34,000 complaints in 2023; up from 27,300 in 2015; 12.5% of appeals upheld' },
  { num: 2, name: 'Baroness Casey', dataset: 'Final Report — An Independent Review into the Standards of Behaviour and Internal Culture of the Metropolitan Police Service', date: '2023', note: 'Found institutional racism, misogyny and homophobia in Met Police culture' },
  { num: 3, name: 'Home Office', dataset: 'Police Powers and Procedures: Stop and Search', url: 'https://www.gov.uk/government/statistics/police-powers-and-procedures-stop-and-search-and-arrests-england-and-wales-year-ending-31-march-2023', date: '2022/23', note: 'Black people 4.1x more likely to be stopped and searched than white people' },
  { num: 4, name: 'Home Office', dataset: 'Police Reform — National Barred Register', date: '2023', note: 'National barred list established in 2023 to prevent re-employment of dismissed officers' },
];

export default function PoliceMisconductPage() {

  const complaintsData = [27.3, 28.1, 29.5, 30.2, 31.0, 29.8, 30.4, 31.8, 33.0, 34.0];
  const disciplineRateData = [3.2, 3.4, 3.5, 3.6, 3.7, 3.5, 3.6, 3.7, 3.8, 3.9];
  const ioplcAppealsData = [9.5, 10.2, 11.0, 11.5, 12.1, 11.8, 12.0, 12.3, 12.5, 12.5];

  const complaintsSeries: Series[] = [
    {
      id: 'complaints',
      label: 'Complaints against police (thousands/yr)',
      colour: '#6B7280',
      data: complaintsData.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
  ];

  const outcomeSeries: Series[] = [
    {
      id: 'discipline-rate',
      label: '% of complaints resulting in discipline',
      colour: '#6B7280',
      data: disciplineRateData.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
    {
      id: 'iopc-upheld',
      label: '% of IOPC appeals upheld',
      colour: '#E63946',
      data: ioplcAppealsData.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
  ];

  const complaintsAnnotations: Annotation[] = [
    { date: new Date(2020, 0, 1), label: '2020: George Floyd protests — scrutiny increases' },
    { date: new Date(2021, 0, 1), label: '2021: Sarah Everard murder by serving officer' },
    { date: new Date(2023, 0, 1), label: '2023: Casey Review published' },
  ];

  return (
    <>
      <TopicNav topic="Police Misconduct" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Police Misconduct"
          question="What Happens When Police Behave Badly?"
          finding="Police misconduct complaints reached 34,000 in 2023 — yet fewer than 4% result in formal disciplinary proceedings, and the IOPC upholds only 1 in 8 appeals."
          colour="#6B7280"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-complaints', label: 'Complaints Trend' },
          { id: 'sec-outcomes', label: 'Outcomes' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Complaints against police (per year)"
              value="34,000"
              direction="up"
              polarity="up-is-bad"
              changeText="Up from 27,300 in 2015 · accelerating since 2021"
              sparklineData={complaintsData}
              source="IOPC Annual Report · 2023"
            />
            <MetricCard
              label="Complaints resulting in discipline"
              value="3.9%"
              direction="up"
              polarity="up-is-good"
              changeText="Fewer than 4 in 100 complaints lead to formal discipline · critics say far too few"
              sparklineData={disciplineRateData}
              source="College of Policing · 2023"
            />
            <MetricCard
              label="IOPC appeals upheld"
              value="12.5%"
              direction="flat"
              polarity="up-is-good"
              changeText="1 in 8 appeals upheld · complainants face long, difficult process"
              sparklineData={ioplcAppealsData}
              source="IOPC Annual Report · 2023"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-complaints" className="mb-12">
            <LineChart
              title="Complaints against police, England and Wales, 2015–2024"
              subtitle="Total formal complaints received against police officers and staff across all 43 forces. Excludes informal resolutions."
              series={complaintsSeries}
              annotations={complaintsAnnotations}
              yLabel="Complaints (thousands)"
              source={{
                name: 'IOPC',
                dataset: 'Police Complaints Statistics',
                frequency: 'annual',
                url: 'https://www.policeconduct.gov.uk/research-and-learning/statistics',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-outcomes" className="mb-12">
            <LineChart
              title="Complaint outcomes, 2015–2024"
              subtitle="Percentage of complaints resulting in formal disciplinary proceedings, and percentage of IOPC appeals upheld by complainants."
              series={outcomeSeries}
              yLabel="Percentage (%)"
              source={{
                name: 'IOPC / College of Policing',
                dataset: 'Misconduct and Complaints Statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="National barred register — progress"
            value="2023"
            unit="year register was finally established"
            description="A national barred list preventing dismissed officers from being re-employed in any UK police force was finally established in 2023 following years of campaigning. Before it existed, officers dismissed for serious misconduct could simply apply to another force. The list is an important safeguard — but enforcement depends on forces checking it before hiring."
            source="Home Office · Police Reform 2023"
          />
        </ScrollReveal>

        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The data on police misconduct</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>Misconduct complaints against police in England and Wales reached 34,000 in 2023, up from 27,300 in 2015, with a sharp acceleration following the Sarah Everard case and Baroness Casey's 2023 review finding institutional racism, misogyny, and homophobia embedded in the Metropolitan Police's culture.<Cite nums={[1, 2]} /> Fewer than 4% of complaints result in formal disciplinary proceedings — a rate critics argue is incompatible with a functional accountability system.<Cite nums={1} /></p>
              <p>The IOPC upholds around 12.5% of appeals — meaning complainants who persist through a lengthy and challenging process succeed less than 1 in 8 times.<Cite nums={1} /> The IOPC had over 2,000 outstanding investigations at the end of 2023, with average resolution times exceeding three years. High-profile failures — David Carrick, a serving Metropolitan Police officer who committed offences over more than a decade during which 17 allegations against him were recorded — illustrate what systemic failures in vetting, supervision, and complaint-handling allow to persist.</p>
              <p>Stop and search disproportionality remains stark: in 2022/23 a Black person was 4.1 times more likely to be stopped and searched than a white person.<Cite nums={3} /> Reform proposals — stronger IOPC compulsion powers, independent disciplinary panels, mandatory vetting standards — face resistance from forces that guard operational independence. Implementation of the Casey Review's 49 recommendations across 43 operationally independent forces represents the core accountability challenge.<Cite nums={2} /></p>
            </div>
          </section>
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p><a href="https://www.policeconduct.gov.uk/research-and-learning/statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">IOPC</a> — Independent Office for Police Conduct. Annual report covering complaints received, outstanding cases, and case outcomes.</p>
            <p>HMICFRS — Annual inspection reports and thematic reviews of police integrity and misconduct. Home Office — Police Powers and Procedures: Stop and Search. Annual statistics on stop and search use by force and ethnicity. Stop and search ratios are calculated as the rate per 1,000 population for each ethnic group.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
