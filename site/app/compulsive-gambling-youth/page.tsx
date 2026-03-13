'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import PositiveCallout from '@/components/PositiveCallout';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

// Problem gambling prevalence 11-16 year olds %, 2018–2024 (Gambling Commission)
const prevalenceValues = [0.9, 1.0, 1.0, 1.1, 1.4, 1.3, 1.4];

// Online gambling 16-24 year olds %, 2018–2024
const onlineValues = [14, 16, 18, 22, 25, 27, 28];

// Children treated for gambling harm, 2018–2024
const treatedValues = [400, 430, 480, 550, 680, 800, 900];

const series1: Series[] = [
  {
    id: 'prevalence',
    label: 'Problem gambling prevalence 11–16 (%)',
    colour: '#F4A261',
    data: prevalenceValues.map((v, i) => ({ date: new Date(2018 + i, 5, 1), value: v })),
  },
];

const series2: Series[] = [
  {
    id: 'online',
    label: 'Online gambling 16–24 year olds (%)',
    colour: '#E63946',
    data: onlineValues.map((v, i) => ({ date: new Date(2018 + i, 5, 1), value: v })),
  },
  {
    id: 'treated',
    label: 'Children treated for gambling harm (hundreds)',
    colour: '#264653',
    data: treatedValues.map((v, i) => ({ date: new Date(2018 + i, 5, 1), value: v / 100 })),
  },
];

const annotations1: Annotation[] = [
  { date: new Date(2020, 5, 1), label: '2020: COVID lockdown — online gambling spike' },
  { date: new Date(2023, 5, 1), label: '2023: Gambling Act Review stake limits' },
];

const annotations2: Annotation[] = [
  { date: new Date(2021, 5, 1), label: '2021: Loot box review published' },
  { date: new Date(2023, 5, 1), label: '2023: Online slot stake limit £5' },
];

export default function YouthGamblingPage() {
  return (
    <>
      <TopicNav topic="Youth Gambling Harm" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Social Issues"
          question="How Many Young People Are Problem Gamblers?"
          finding="An estimated 55,000 children aged 11–16 are classified as problem gamblers. Online gambling among 16–24 year olds has doubled since 2018 and treatment services for under-18s remain severely limited."
          colour="#F4A261"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Children and young people are being exposed to gambling at unprecedented levels. Video game mechanics — particularly loot boxes — normalise chance-based spending. Gambling advertising saturates live sport, with over 95% of Premier League clubs carrying gambling sponsors. Online gambling is accessible via smartphones at all hours with minimal age verification. The Gambling Commission's Young People and Gambling Survey consistently finds around 70% of 11–16 year olds have gambled in some form in the past year, and 1.4% — around 55,000 children — meet the clinical threshold for problem gambling using the DSM-IV scale. The lockdowns of 2020–21 accelerated online gambling among the 16–24 age group, with participation rates doubling from 14% to 28% between 2018 and 2024.</p>
            <p>The treatment infrastructure for young people with gambling problems is essentially non-existent at scale. NHS treatment services are adult-focused; only the National Problem Gambling Clinic accepts under-18 referrals, and it is a single London-based service. The 900 children treated in 2024 represents a small fraction of the estimated 55,000 with a problem. Waiting times for those who do access help are long, and GPs rarely recognise or ask about gambling harm in young people. The Gambling Act Review 2023 introduced a £5 maximum stake for online slots and mandatory affordability checks for high-spending customers, but experts warn these measures are insufficient to address the scale of the problem.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Prevalence' },
          { id: 'sec-chart2', label: 'Online Gambling' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Child problem gamblers (age 11–16)"
              value="55,000"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="1.4% prevalence · up from 0.9% in 2018"
              sparklineData={[0.9, 1.0, 1.0, 1.1, 1.4, 1.3, 1.4]}
              source="Gambling Commission — Young People and Gambling Survey 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Online gambling 16–24 age group"
              value="28%"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="doubled since 2018 · loot boxes and esports betting"
              sparklineData={[14, 16, 18, 22, 25, 27, 28]}
              source="Gambling Commission — Gambling Participation Survey 2024"
              href="#sec-chart2"
            />
            <MetricCard
              label="Children treated for gambling harm"
              value="900"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="+125% since 2020 · treatment capacity vastly insufficient"
              sparklineData={[400, 430, 480, 550, 680, 800, 900]}
              source="NHS National Problem Gambling Clinic — 2024"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Problem gambling prevalence among 11–16 year olds, England, 2018–2024"
              subtitle="Percentage of children aged 11–16 classified as problem gamblers using the DSM-IV Problem Gambling Scale. Prevalence has risen from 0.9% to 1.4%, with a spike during 2020–21 lockdowns."
              series={series1}
              annotations={annotations1}
              yLabel="% problem gamblers"
              source={{ name: 'Gambling Commission', dataset: 'Young People and Gambling Survey', url: 'https://www.gamblingcommission.gov.uk/statistics-and-research/publication/young-people-and-gambling-survey', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Online gambling among 16–24s and children in treatment, 2018–2024"
              subtitle="Percentage of 16–24 year olds who gambled online in the past month, and children (under 18) treated for gambling harm (shown in hundreds for scale)."
              series={series2}
              annotations={annotations2}
              yLabel="% / hundreds treated"
              source={{ name: 'Gambling Commission / NHS', dataset: 'Gambling Participation Survey and National Problem Gambling Clinic data', url: 'https://www.gamblingcommission.gov.uk/statistics-and-research', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Gambling Act Review: stake limits and stronger protections"
            value="£5 max"
            unit="online slot stake limit from 2023"
            description="The Gambling Act Review 2023 introduced a £5 maximum stake for online slots and mandatory affordability checks for high-spending customers. The National Gambling Treatment Service now accepts under-18 referrals. GamCare's Young People's Service provides free counselling for under-18s. The Gambling Commission has tightened rules on advertising near schools and banned cartoon characters in gambling promotions targeting young people."
            source="Source: Gambling Commission — Young People and Gambling Survey, 2024. NHS National Problem Gambling Clinic, 2024."
          />
        </ScrollReveal>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.gamblingcommission.gov.uk/statistics-and-research/publication/young-people-and-gambling-survey" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Gambling Commission — Young People and Gambling Survey</a> — annual survey of 11–16 year olds. Uses DSM-IV Problem Gambling Scale.</p>
            <p><a href="https://www.gamblingcommission.gov.uk/statistics-and-research/publication/gambling-participation-survey" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Gambling Commission — Gambling Participation Survey</a> — adult gambling participation including 16–24 age group.</p>
            <p><a href="https://www.cnwl.nhs.uk/services/mental-health/addictions/national-problem-gambling-clinic" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS — National Problem Gambling Clinic</a> — treatment referral and caseload data.</p>
            <p>Problem gambling prevalence estimates the proportion meeting DSM-IV criteria. Online gambling participation includes any online gambling activity in the past month. Treatment figures cover NHS and third-sector services and may undercount due to incomplete reporting.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
