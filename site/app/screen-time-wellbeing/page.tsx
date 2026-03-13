'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

export default function ScreenTimeWellbeingPage() {
  // Teen social media 5+ hrs/day (%) and poor wellbeing (%) — 2015–2024
  const teensSocialMedia5hrs = [18, 21, 25, 29, 33, 40, 43, 44, 44, 45];
  const teenPoorWellbeing    = [22, 23, 25, 26, 28, 33, 34, 35, 36, 37];

  // Average daily screen time by age group — 2018–2024 (7 points)
  const screenAge11to15  = [3.8, 4.1, 5.2, 5.0, 4.8, 4.7, 4.6];
  const screenAge16to19  = [5.4, 5.8, 7.1, 6.8, 6.5, 6.3, 6.2];
  const screenAdults1834 = [4.8, 5.0, 6.2, 6.0, 5.8, 5.6, 5.5];

  const chart1Series: Series[] = [
    {
      id: 'socialMedia5hrs',
      label: 'Teens spending 5+ hrs/day on social media (%)',
      colour: '#E63946',
      data: teensSocialMedia5hrs.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
    {
      id: 'poorWellbeing',
      label: 'Teens reporting poor mental wellbeing (%)',
      colour: '#6B7280',
      data: teenPoorWellbeing.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
  ];

  const chart1Annotations: Annotation[] = [
    { date: new Date(2020, 0, 1), label: '2020: COVID school closures spike' },
    { date: new Date(2017, 0, 1), label: '2017: Smartphones ubiquitous in secondary schools' },
  ];

  const chart2Series: Series[] = [
    {
      id: 'age11to15',
      label: 'Age 11–15 (hours/day)',
      colour: '#E63946',
      data: screenAge11to15.map((v, i) => ({ date: new Date(2018 + i, 0, 1), value: v })),
    },
    {
      id: 'age16to19',
      label: 'Age 16–19 (hours/day)',
      colour: '#264653',
      data: screenAge16to19.map((v, i) => ({ date: new Date(2018 + i, 0, 1), value: v })),
    },
    {
      id: 'adults1834',
      label: 'Adults 18–34 (hours/day)',
      colour: '#6B7280',
      data: screenAdults1834.map((v, i) => ({ date: new Date(2018 + i, 0, 1), value: v })),
    },
  ];

  const chart2Annotations: Annotation[] = [
    { date: new Date(2020, 0, 1), label: '2020: Lockdown — all groups spike' },
    { date: new Date(2022, 0, 1), label: '2022: Post-pandemic partial normalisation' },
  ];

  return (
    <>
      <TopicNav topic="Screen Time & Wellbeing" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Screen Time & Wellbeing"
          question="Is Screen Time Harming Young People's Wellbeing?"
          finding="Teenagers spending 5+ hours daily on social media are twice as likely to report poor mental health — 45% of 13–17 year olds now exceed this threshold."
          colour="#6B7280"
          preposition="on"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Key metrics' },
          { id: 'sec-chart1', label: 'Social media & wellbeing' },
          { id: 'sec-chart2', label: 'Screen time by age' },
          { id: 'sec-context', label: 'Context' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Teens spending 5+ hrs/day on social media"
            value="45%"
            direction="up"
            polarity="up-is-bad"
            changeText="up from 18% in 2015 · doubling since smartphone ubiquity"
            sparklineData={teensSocialMedia5hrs}
            source="Ofcom — Children & Parents Media Use 2024"
          />
          <MetricCard
            label="Teens reporting poor mental wellbeing"
            value="37%"
            direction="up"
            polarity="up-is-bad"
            changeText="up from 22% in 2015 · NHS Digital MHCYP survey"
            sparklineData={teenPoorWellbeing}
            source="NHS Digital — Mental Health of Children 2024"
          />
          <MetricCard
            label="Average daily screen time, age 16–19"
            value="6.2 hrs"
            direction="down"
            polarity="up-is-bad"
            changeText="down from peak 7.1 hrs in 2020 · still 15% above pre-pandemic"
            sparklineData={screenAge16to19}
            source="Ofcom — Online Nation 2024"
          />
        </div>

        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Teen social media use and mental wellbeing, England, 2015–2024"
              subtitle="Percentage of 13–17 year olds spending 5+ hours daily on social media (Ofcom) and reporting poor mental wellbeing (NHS Digital MHCYP, SDQ score). Annual data."
              series={chart1Series}
              annotations={chart1Annotations}
              yLabel="Percentage (%)"
              source={{
                name: 'Ofcom / NHS Digital',
                dataset: 'Children and Parents: Media Use and Attitudes / Mental Health of Children and Young People',
                frequency: 'annual',
                url: 'https://www.ofcom.org.uk/research-and-data/telecoms-research/data-dashboards',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Average daily screen time by age group, UK, 2018–2024"
              subtitle="Self-reported average hours per day on all screens (TV, smartphone, tablet, computer). Ofcom diary method. All figures exclude work or school use."
              series={chart2Series}
              annotations={chart2Annotations}
              yLabel="Hours per day"
              source={{
                name: 'Ofcom',
                dataset: 'Online Nation and Children and Parents: Media Use and Attitudes',
                frequency: 'annual',
                url: 'https://www.ofcom.org.uk/research-and-data/internet-and-on-demand-research/online-nation',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="Statutory online safety requirements now in force"
            value="2024"
            unit="Online Safety Act fully commenced"
            description="The Online Safety Act 2023 places binding duties on social media platforms to prevent children from accessing harmful content and to conduct children's risk assessments. Ofcom's Children's Safety Codes, which took effect in 2024, require platforms to use age assurance tools, limit algorithmic recommendation of harmful content to under-18s, and provide accessible reporting tools. These are the most significant legal protections for children online introduced in any democracy. Their impact on wellbeing outcomes will become measurable from 2025 onwards."
            source="Source: Ofcom — Online Safety Act Implementation. DCMS — Children's Online Safety report, 2024."
          />
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-context" className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">What the data shows</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>Between 2015 and 2024, the share of teenagers spending five or more hours daily on social media more than doubled — from 18% to 45%. Over the same period, the proportion reporting poor mental wellbeing rose from 22% to 37%. This correlation does not establish causation: young people with pre-existing mental health difficulties may use social media more, and broader social and economic pressures have intensified during the same period. But the scale and consistency of the relationship across multiple datasets is striking.</p>
              <p>The COVID-19 pandemic created a sharp interruption in 2020 — school closures drove screen time to its highest recorded levels, and poor wellbeing rates jumped simultaneously. While average screen time has partially recovered toward pre-pandemic levels for most age groups, it has not returned to 2019 baselines, and the wellbeing trajectory has not recovered at all. The post-pandemic period has been harder for young people than the pre-pandemic data would have predicted.</p>
              <p>Screen time itself is an imprecise measure. Forty minutes of video calling grandparents is not equivalent to forty minutes of passive scrolling on an algorithmically-curated feed. Research consistently identifies passive consumption — particularly of appearance-related and social comparison content — as most strongly associated with negative outcomes, especially for girls aged 11 to 16. The incoming Ofcom children's safety codes focus precisely on limiting this category of content recommendation.</p>
            </div>
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <div>
              <a href="https://www.ofcom.org.uk/research-and-data/telecoms-research/data-dashboards" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Ofcom — Children and Parents: Media Use and Attitudes Report</a>
              <div className="text-xs text-wiah-mid mt-1">Annual. Primary source for screen time and social media use figures.</div>
            </div>
            <div>
              <a href="https://digital.nhs.uk/data-and-information/publications/statistical/mental-health-of-children-and-young-people-in-england" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS Digital — Mental Health of Children and Young People in England</a>
              <div className="text-xs text-wiah-mid mt-1">Annual survey. Poor wellbeing defined using Strengths and Difficulties Questionnaire (SDQ) clinical threshold.</div>
            </div>
            <div>
              <a href="https://www.ofcom.org.uk/research-and-data/internet-and-on-demand-research/online-nation" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Ofcom — Online Nation</a>
              <div className="text-xs text-wiah-mid mt-1">Annual. Age-group screen time averages use diary-based self-report methodology.</div>
            </div>
            <p className="mt-4 text-xs">All figures are for England or UK as noted. 2020 data reflects COVID-19 school closures and is not directly comparable with adjacent years. Self-reported screen time underestimates device-measured usage by approximately 20–40%.</p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
