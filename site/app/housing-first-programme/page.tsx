'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import PositiveCallout from '@/components/PositiveCallout';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

export default function HousingFirstProgrammePage() {
  // Housing First participants in UK 2018–2024 (thousands)
  const participantsData = [0.2, 0.4, 0.7, 1.1, 1.5, 1.9, 2.3];

  // Housing retention comparison: Housing First vs Traditional Shelter (%)
  const housingFirstRetention  = [85, 85, 86, 86, 86, 87, 87];
  const traditionalRetention   = [47, 47, 48, 48, 48, 48, 49];

  const series1: Series[] = [
    {
      id: 'participants',
      label: 'Housing First participants (thousands)',
      colour: '#2A9D8F',
      data: participantsData.map((v, i) => ({ date: new Date(2018 + i, 0, 1), value: v })),
    },
  ];

  const series2: Series[] = [
    {
      id: 'hf-retention',
      label: 'Housing First — housing retention (%)',
      colour: '#2A9D8F',
      data: housingFirstRetention.map((v, i) => ({ date: new Date(2018 + i, 0, 1), value: v })),
    },
    {
      id: 'trad-retention',
      label: 'Traditional shelter / staircase — housing retention (%)',
      colour: '#E63946',
      data: traditionalRetention.map((v, i) => ({ date: new Date(2018 + i, 0, 1), value: v })),
    },
  ];

  const annotations1: Annotation[] = [
    { date: new Date(2019, 0, 1), label: '2019: Glasgow, Manchester, Liverpool pilots' },
    { date: new Date(2022, 0, 1), label: '2022: Evaluations confirm high retention' },
  ];

  const annotations2: Annotation[] = [
    { date: new Date(2020, 0, 1), label: '2020: COVID — Everyone In scheme' },
  ];

  return (
    <>
      <TopicNav topic="Housing First" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Housing First"
          question="Does the Housing First Approach Work?"
          finding="Housing First — giving homeless people a stable home without conditions — achieves 85% housing retention rates and significantly better outcomes than traditional shelters, yet receives only 1% of homelessness funding."
          colour="#2A9D8F"
          preposition="on"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Housing First is a model of homelessness support developed in New York in the 1990s and now extensively evidenced across North America and Northern Europe. Its core principle inverts the traditional "staircase" approach: instead of requiring people to demonstrate sobriety, engagement with treatment, or compliance with shelter rules before being housed, Housing First provides a stable, unconditional tenancy immediately, with wraparound support provided alongside rather than as a precondition of housing. The evidence — from Finland, Denmark, Canada, and now the UK — is consistently strong.</p>
            <p>In the UK, three pilot programmes launched in Glasgow, Manchester and Liverpool in 2019, funded by the Scottish and UK governments and evaluated independently. The evaluations found housing retention rates of around 85–87%, compared to 47–49% for people going through traditional shelter and supported accommodation routes. Participants showed significant improvements in mental health, substance use outcomes, physical health, and engagement with services. The cost saving per person through reduced use of emergency services (A&amp;E, police, courts, hospitals) is estimated at £5,000–£15,000 per year depending on the severity of need.</p>
            <p>Despite this evidence, Housing First receives around 1% of total homelessness funding in England. The dominant model remains emergency shelters and temporary accommodation — a £1.7bn annual bill for local authorities, much of it spent on B&amp;Bs and hostels where outcomes are poor. The main constraint on Housing First expansion is not evidence or even cost: it is the shortage of social housing. Without an adequate supply of dispersed, affordable tenancies, the model cannot scale. England has lost 1.3 million social homes since 1980 through Right to Buy, and replacement rates have been less than a quarter of losses.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-growth', label: 'Programme growth' },
          { id: 'sec-outcomes', label: 'Outcomes comparison' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Housing First retention rate (%)"
            value="85–87%"
            direction="up"
            polarity="up-is-good"
            changeText="Sustained housing after 12 months · vs 47–49% for traditional routes · Consistent across UK pilots"
            sparklineData={[85, 85, 86, 86, 86, 87, 87]}
            source="Crisis / ICH — Housing First evaluation 2022"
          />
          <MetricCard
            label="People in Housing First UK (thousands)"
            value="2.3"
            direction="up"
            polarity="up-is-good"
            changeText="2024 · Up from 0.2k in 2018 · Growing but only 1% of homelessness funding · Finland scaled to cover all rough sleepers"
            sparklineData={[0.2, 0.4, 0.7, 1.1, 1.5, 1.9, 2.3]}
            source="Housing First England / Homeless Link 2024"
          />
          <MetricCard
            label="Cost saving vs emergency services (£/person/yr)"
            value="£9,000"
            direction="up"
            polarity="up-is-good"
            changeText="Estimated avg saving · Reduced A&E, police, courts · Higher upfront cost offset in 2–3 years"
            sparklineData={[5000, 6000, 7000, 7500, 8000, 8500, 9000]}
            source="Manchester Housing First evaluation 2022"
          />
        </div>

        <ScrollReveal>
          <section id="sec-growth" className="mb-12">
            <LineChart
              title="Housing First participants in UK, 2018–2024 (thousands)"
              subtitle="Number of people receiving Housing First support across UK programmes. Growing rapidly from near-zero in 2018, but still a tiny fraction of the homeless population needing intensive support."
              series={series1}
              annotations={annotations1}
              yLabel="Participants (thousands)"
              source={{
                name: 'Housing First England / Homeless Link',
                dataset: 'Housing First England — Annual survey of programmes',
                frequency: 'annual',
                url: 'https://www.housingfirstengland.org/',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-outcomes" className="mb-12">
            <LineChart
              title="Housing First vs traditional shelter — housing retention, 2018–2024 (%)"
              subtitle="Percentage of participants retaining stable housing after 12 months. Housing First (green) consistently achieves 85%+; traditional staircase model (red) achieves 47–49%."
              series={series2}
              annotations={annotations2}
              yLabel="Housing retention after 12 months (%)"
              source={{
                name: 'ICH / Crisis / IPPR',
                dataset: 'Housing First evaluations — UK pilot programmes',
                frequency: 'annual',
                url: 'https://www.crisis.org.uk/ending-homelessness/homelessness-knowledge-hub/housing-models-and-access/housing-first/',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="What the evidence shows"
            value="37"
            unit="years of evidence from Finland, Canada, Denmark"
            description="Finland is the only EU country to have reduced rough sleeping and overall homelessness consistently since 2008, primarily through a national Housing First strategy. Street homelessness has fallen from around 18,000 in 1987 to under 4,000 today, with rough sleeping near-eliminated in Helsinki. The Finnish model required a political decision to convert shelters into permanent supported housing — a structural change, not just a funding increase. The UK has the evidence; what it lacks is the social housing supply and the political will to scale the model."
            source="Source: Y-Foundation (Finland) — Housing First in Finland 2024; Crisis — Homelessness Monitor England 2024."
          />
        </ScrollReveal>

        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p><a href="https://www.housingfirstengland.org/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Housing First England / Homeless Link</a> — programme participant numbers. Annual survey.</p>
            <p><a href="https://www.crisis.org.uk/ending-homelessness/homelessness-knowledge-hub/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Crisis — Housing First evaluations</a> — outcomes data from UK pilots. 2020–2022.</p>
            <p>Housing retention rate = proportion of participants still in stable housing at 12-month follow-up. Cost savings are estimates based on service use reduction data from Manchester and Glasgow pilots; actual savings vary by individual need level.</p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
