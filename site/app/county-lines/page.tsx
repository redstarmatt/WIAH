'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import PositiveCallout from '@/components/PositiveCallout';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

// Estimated active county lines, 2017–2024 (NCA)
const activeLinesValues = [1500, 2000, 1800, 1500, 1300, 900, 750, 700];

// Children referred to NRM for criminal exploitation, 2017–2024
const nrmValues = [4000, 5000, 6200, 6300, 7400, 8200, 9100, 10200];

const series1: Series[] = [
  {
    id: 'active-lines',
    label: 'Estimated active county lines',
    colour: '#6B7280',
    data: activeLinesValues.map((v, i) => ({ date: new Date(2017 + i, 5, 1), value: v })),
  },
];

const series2: Series[] = [
  {
    id: 'nrm-children',
    label: 'Children referred to NRM for criminal exploitation',
    colour: '#E63946',
    data: nrmValues.map((v, i) => ({ date: new Date(2017 + i, 5, 1), value: v })),
  },
];

const annotations1: Annotation[] = [
  { date: new Date(2019, 5, 1), label: '2019: Operation Orochi begins' },
  { date: new Date(2022, 5, 1), label: '2022: 3,000 lines closed cumulatively' },
];

const annotations2: Annotation[] = [
  { date: new Date(2020, 2, 1), label: '2020: COVID — exploitation shifts online' },
];

export default function CountyLinesPage() {
  return (
    <>
      <TopicNav topic="County Lines" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Justice"
          question="How Are Children Being Exploited by Drug Gangs?"
          finding="An estimated 10,000 children are involved in county lines drug dealing across England and Wales. Despite police operations closing over 3,000 lines since 2019, NRM referrals of exploited children continue to rise year on year."
          colour="#6B7280"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>County lines is a model of drug distribution in which urban gangs establish dealing networks in smaller towns and rural areas, exploiting children and vulnerable adults as couriers, dealers, and custodians of cash and drugs. The National Crime Agency estimated around 2,000 lines at peak; Operation Orochi and successor operations have closed over 3,000 lines since 2019, with approximately 700 estimated as still active. NRM referrals of children exploited through criminal activity have risen from around 4,000 in 2017 to over 10,200 in 2024. Gangs target children as young as 10 — particularly those excluded from school, in care, or with unstable housing — grooming them before escalating to coercion and violence. Cuckooing of vulnerable adults' homes as local bases remains widespread.</p>
            <p>Black and mixed-heritage boys are disproportionately represented among identified victims, and children in care are three times more likely to be identified as county lines victims. Rural and coastal towns — Margate, Hastings, Grimsby, Blackpool — are hotspots, but networks operate in virtually every county. Girls are increasingly identified as victims, often exploited through sexual violence alongside drug running. Contextual safeguarding — assessing risk in a child's wider environment rather than the family alone — has been adopted by some councils but remains unevenly implemented nationally. The rise in NRM referrals partly reflects improved identification, but also genuine growth in exploitation.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Active Lines' },
          { id: 'sec-chart2', label: 'Children Exploited' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Children exploited (NRM referrals)"
              value="10,200"
              unit="/year"
              direction="up"
              polarity="up-is-bad"
              changeText="up from 4,000 in 2017 · true figure likely higher"
              sparklineData={[4000, 5000, 6200, 6300, 7400, 8200, 9100, 10200]}
              source="Home Office — National Referral Mechanism 2024"
              href="#sec-chart2"
            />
            <MetricCard
              label="County lines closed since 2019"
              value="3,000+"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="Operation Orochi and successors · but lines re-emerge"
              sparklineData={[400, 800, 1400, 2100, 2600, 3000]}
              source="NCA — County Lines Strategic Assessment 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Estimated active lines"
              value="~700"
              unit=""
              direction="down"
              polarity="down-is-bad"
              changeText="down from peak of 2,000 · NCA estimate"
              sparklineData={[2000, 1800, 1500, 1300, 900, 750, 700]}
              source="NCA — County Lines Strategic Assessment 2024"
              href="#sec-chart1"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Estimated active county lines, England and Wales, 2017–2024"
              subtitle="National Crime Agency intelligence estimates of active lines. Counts are approximate. Line closures since 2019 have reduced active lines from ~2,000 to ~700, but exploitation continues."
              series={series1}
              annotations={annotations1}
              yLabel="Active lines"
              source={{ name: 'NCA', dataset: 'County Lines Strategic Assessment', url: 'https://www.nationalcrimeagency.gov.uk/what-we-do/crime-threats/drug-trafficking/county-lines', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Children referred to NRM for criminal exploitation, 2017–2024"
              subtitle="National Referral Mechanism referrals of children flagged as potential victims of county lines criminal exploitation. Rising referrals reflect both improved identification and genuine growth in exploitation."
              series={series2}
              annotations={annotations2}
              yLabel="NRM referrals"
              source={{ name: 'Home Office', dataset: 'National Referral Mechanism Statistics', url: 'https://www.gov.uk/government/collections/national-referral-mechanism-statistics', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Contextual safeguarding: protecting children outside the family home"
            value="37%"
            unit="reduction in children entering care in pilot areas"
            description="Contextual safeguarding — assessing and responding to risk in a child's wider community environment (peers, schools, neighbourhoods) rather than the family alone — has been piloted by nine local authorities since 2019. Early evaluations show a 37% reduction in the number of children entering care in pilot areas, and improved identification of children being criminally exploited before they reach crisis point. The approach is now recommended by the Child Safeguarding Practice Review Panel and OFSTED as best practice for county lines response."
            source="Source: Contextual Safeguarding Network — National evaluation, 2024. Child Safeguarding Practice Review Panel — Annual report 2024."
          />
        </ScrollReveal>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.nationalcrimeagency.gov.uk/what-we-do/crime-threats/drug-trafficking/county-lines" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NCA — County Lines Strategic Assessment</a> — intelligence estimates of active lines and closures. Annual. 2024.</p>
            <p><a href="https://www.gov.uk/government/collections/national-referral-mechanism-statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Home Office — National Referral Mechanism Statistics</a> — referrals by age, gender, nationality, and exploitation type. Quarterly/Annual. 2024.</p>
            <p><a href="https://www.contextualsa feguarding.org.uk/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Contextual Safeguarding Network</a> — national evaluation of contextual safeguarding pilots. 2024.</p>
            <p>Active lines are NCA intelligence estimates and carry significant uncertainty. NRM referrals capture identified victims; true exploitation prevalence is substantially higher. Line closure counts are cumulative since Operation Orochi began in 2019. Children are those under 18.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
