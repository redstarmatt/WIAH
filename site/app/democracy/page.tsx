'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

// General election turnout (%), 1992–2024
const turnoutValues = [77.7, 71.4, 59.4, 61.4, 65.1, 68.8, 69.1, 67.3, 59.9];
const turnoutYears = [1992, 1997, 2001, 2005, 2010, 2015, 2017, 2019, 2024];

// Trust in politicians (%), 2003–2024
const trustValues = [22, 23, 21, 19, 20, 21, 22, 16, 18, 18, 17, 15, 17, 17, 17, 17, 17, 17, 17, 17, 18, 17];

// Registered voters and eligible (millions), 2015–2024
const registeredValues = [44.7, 46.1, 46.8, 47.2, 47.6, 47.9, 48.1, 47.8, 48.3, 48.3];
const eligibleValues = [47.2, 47.8, 48.4, 48.8, 49.2, 49.5, 49.8, 50.0, 50.2, 51.4];

const series1: Series[] = [
  {
    id: 'turnout',
    label: 'General election turnout (%)',
    colour: '#264653',
    data: turnoutValues.map((v, i) => ({ date: new Date(turnoutYears[i], 5, 1), value: v })),
  },
];

const series2: Series[] = [
  {
    id: 'registered',
    label: 'Registered voters (millions)',
    colour: '#264653',
    data: registeredValues.map((v, i) => ({ date: new Date(2015 + i, 5, 1), value: v })),
  },
  {
    id: 'eligible',
    label: 'Estimated eligible voters (millions)',
    colour: '#F4A261',
    data: eligibleValues.map((v, i) => ({ date: new Date(2015 + i, 5, 1), value: v })),
  },
];

const annotations1: Annotation[] = [
  { date: new Date(2001, 5, 1), label: '2001: Historic low 59.4%' },
  { date: new Date(2016, 5, 1), label: '2016: EU Referendum 72.2%' },
];

const annotations2: Annotation[] = [
  { date: new Date(2014, 5, 1), label: '2014: Individual Electoral Registration introduced' },
];

const editorialRefs: Reference[] = [
  { num: 1, name: 'Electoral Commission', dataset: 'UK Parliamentary General Election Results', url: 'https://www.electoralcommission.org.uk/who-we-are-and-what-we-do/elections-and-referendums/past-elections-and-referendums', date: '2024' },
  { num: 2, name: 'Ipsos', dataset: 'Trust in Professions and Institutions Survey', url: 'https://www.ipsos.com/en-uk/trust-polls', date: '2024' },
  { num: 3, name: 'Electoral Commission', dataset: 'Electoral Registration Statistics', url: 'https://www.electoralcommission.org.uk/research-reports-and-data/electoral-data/electoral-registration-statistics', date: '2024' },
];

export default function DemocracyPage() {
  return (
    <>
      <TopicNav topic="Democracy" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Democracy"
          question="Does Your Vote Actually Matter?"
          finding="The 2024 general election achieved 59.9% turnout — the second lowest since universal suffrage. Only 17% of Britons trust politicians to tell the truth. Labour won 412 seats on 33.7% of the vote; Reform UK won 14.3% of votes but just 5 seats."
          colour="#6B7280"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The 2024 general election returned 59.9% turnout — the second lowest since women were fully enfranchised in 1928, beaten only by 2001's 59.4%.<Cite nums={1} /> Labour took 412 seats on 33.7% of the vote; the Conservatives collapsed to 121 seats, their worst showing since 1906.<Cite nums={1} /> The result laid bare the distortions of first-past-the-post: Reform UK won 14.3% of the national vote but just 5 seats (0.8% of the Commons), while the Liberal Democrats converted 12.2% of the vote into 72 seats.<Cite nums={1} /> Votes and representation are structurally decoupled. Voter ID, introduced for the 2024 election, resulted in an estimated 50,000–75,000 people being turned away from polling stations.<Cite nums={3} /></p>
            <p>Trust in politicians to tell the truth sits at 17%, according to Ipsos's annual survey running since 1983. That figure is level with the post-expenses-scandal trough of 2009 and only marginally above the 15% recorded after Partygate in 2022. For context, 95% of Britons trust nurses and 91% trust doctors; politicians rank below estate agents at 26%. The 2016 EU referendum — held amid similar distrust — drew 72.2% turnout, suggesting disillusionment with politicians does not automatically suppress participation when the stakes feel direct and personal.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Turnout' },
          { id: 'sec-chart2', label: 'Registration' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="2024 general election turnout"
              value="59.9%"
              unit=""
              direction="down"
              polarity="up-is-good"
              changeText="second lowest since 1950 · down from 68.8% in 2017 · voter ID introduced"
              sparklineData={[61.4, 65.1, 68.8, 69.1, 67.3, 59.9]}
              source="Electoral Commission — UK parliamentary general election results 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Trust politicians to tell truth"
              value="17%"
              unit="2024"
              direction="flat"
              polarity="up-is-good"
              changeText="lowest since 2009 expenses scandal · never exceeded 26% since 2003"
              sparklineData={[22, 21, 20, 21, 22, 16, 18, 17, 15, 17]}
              source="Ipsos — Trust in Professions Survey 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Unregistered eligible voters"
              value="3.1M"
              unit="2024"
              direction="flat"
              polarity="up-is-bad"
              changeText="~6% of eligible voters · concentrated in young, renters, urban"
              sparklineData={[2.5, 1.7, 1.6, 1.6, 1.9, 1.7, 1.9, 2.2, 1.9, 3.1]}
              source="Electoral Commission — Electoral Registration Statistics 2024"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="UK general election turnout, 1992–2024"
              subtitle="Percentage of registered electors who voted. Fell sharply in 2001; recovered through 2017; fell again in 2024 — the second lowest since universal suffrage. The 2016 EU Referendum achieved 72.2% turnout."
              series={series1}
              annotations={annotations1}
              yLabel="Turnout (%)"
              source={{ name: 'Electoral Commission', dataset: 'UK Parliamentary General Election Results', url: 'https://www.electoralcommission.org.uk/who-we-are-and-what-we-do/elections-and-referendums/past-elections-and-referendums', frequency: 'per election', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Electoral registration, England and Wales, 2015–2024"
              subtitle="Registered voters vs estimated eligible voters (millions). The gap represents unregistered eligible citizens — concentrated among young people, renters, and those who have recently moved."
              series={series2}
              annotations={annotations2}
              yLabel="Millions"
              source={{ name: 'Electoral Commission', dataset: 'UK Electoral Registration Statistics', url: 'https://www.electoralcommission.org.uk/research-reports-and-data/electoral-data/electoral-registration-statistics', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Electoral registration: record 48.3 million in 2024"
            value="48.3M"
            unit="people on the electoral roll — highest ever recorded"
            description="Electoral registration reached 48.3 million in 2024 — the highest ever recorded. The introduction of Individual Electoral Registration in 2014 initially caused a drop, but automated registration through driving licences and government data has rebuilt the roll. More people are registered to vote than at any point in British electoral history. The Electoral Commission estimates that 95% of eligible voters in Great Britain were registered in 2024. Automatic voter registration — where citizens are registered unless they opt out — has been proposed as a way to close the remaining gap, particularly for young people and renters."
            source="Source: Electoral Commission — UK Electoral Registration Statistics 2024."
          />
        </ScrollReveal>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.electoralcommission.org.uk/who-we-are-and-what-we-do/elections-and-referendums/past-elections-and-referendums" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Electoral Commission — UK Parliamentary General Election Results</a> — turnout figures per election. 2024.</p>
            <p><a href="https://www.ipsos.com/en-uk/trust-polls" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Ipsos — Trust in Professions and Institutions Survey</a> — annual survey of trust in politicians and other professions. 2024.</p>
            <p><a href="https://www.electoralcommission.org.uk/research-reports-and-data/electoral-data/electoral-registration-statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Electoral Commission — Electoral Registration Statistics</a> — registered voters by local authority. Annual. 2024.</p>
            <p>Turnout figures are percentage of registered electorate, not eligible population. Trust figures are from Ipsos annual survey asking whether respondents trust politicians to tell the truth. Eligible voter estimates derived from ONS population estimates aged 16+ minus non-citizens.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
