'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';

// ── Types ────────────────────────────────────────────────────────────────────

interface HospitalPoint {
  year: number;
  count: number;
}

interface ViolencePoint {
  year: number;
  offences: number;
}

interface YouthViolenceData {
  national: {
    hospitalAdmissions: HospitalPoint[];
    seriousViolence: ViolencePoint[];
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function YouthViolencePage() {
  const [data, setData] = useState<YouthViolenceData | null>(null);

  useEffect(() => {
    fetch('/data/youth-violence/youth_violence.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const hospitalSeries: Series[] = data
    ? [{
        id: 'hospital-admissions',
        label: 'Admissions (under-25s)',
        colour: '#E63946',
        data: data.national.hospitalAdmissions.map(d => ({
          date: yearToDate(d.year),
          value: d.count,
        })),
      }]
    : [];

  const violenceSeries: Series[] = data
    ? [{
        id: 'serious-violence',
        label: 'Serious youth violence offences',
        colour: '#6B7280',
        data: data.national.seriousViolence.map(d => ({
          date: yearToDate(d.year),
          value: d.offences,
        })),
      }]
    : [];

  return (
    <>
      <TopicNav topic="Youth Violence" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Youth Violence"
          question="Are Young People Safer Than They Were?"
          finding="Hospital admissions for assault among under-25s reached 7,100 in 2024, the highest level since 2012. Serious youth violence offences have risen 57% in a decade, concentrated in a small number of urban areas where youth services have been cut most deeply."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Serious youth violence in England and Wales has followed a distinctive pattern over the past decade: a sustained rise in police-recorded offences alongside a more complex picture from health data. Police forces recorded 28,500 serious violence offences involving under-25 victims in 2024, up from 18,200 in 2015. Hospital admissions for assault-related injuries among under-25s reached 7,100 &mdash; a figure that, unlike police records, cannot be inflated by changes in recording practice. Emergency departments in London, Birmingham, Manchester, and parts of South Yorkshire treat the majority of cases. The geography of youth violence is not evenly distributed; it clusters in areas of concentrated deprivation.</p>
            <p>The drivers are structural and well-documented. Local authority spending on youth services fell by 73% in real terms between 2010 and 2023, according to the YMCA. Youth centres have closed across the country &mdash; more than 750 since 2012. School exclusions, which increased 50% between 2012 and 2019, are among the strongest predictors of involvement in serious violence. Children excluded from school are five times more likely to become both victims and perpetrators. The expansion of county lines drug networks has drawn younger children into violence, with some recruited as young as 10. Adverse childhood experiences &mdash; domestic abuse, parental imprisonment, neglect &mdash; feature in the backgrounds of virtually every young person caught up in serious violence.</p>
            <p>The policy response has shifted towards a public health model. The Serious Violence Duty, introduced in 2023, requires local authorities, police, health services, and probation to collaborate on violence prevention strategies. Eighteen Violence Reduction Units now operate across England, modelled on the Glasgow approach that achieved a 60% reduction in violence-related hospital admissions over 15 years. Early evaluations of English VRUs show promising results in some areas, but funding remains short-term and significantly below the Scottish model. Hospital-based violence intervention programmes, which deploy specialist workers in A&amp;E departments to support young victims at a &ldquo;teachable moment,&rdquo; are operating in around 30 hospitals but are not yet a standard NHS service.</p>
            <p>Black boys and young men are disproportionately affected. In London, Black males aged 15&ndash;24 are victims of serious violence at a rate four to five times the average for their age group. They are also disproportionately stopped and searched, arrested, and sentenced. This dual burden &mdash; elevated risk of violence and elevated exposure to punitive criminal justice interventions &mdash; reflects deep structural inequalities in housing, education, and employment. Girls and young women involved in youth violence are often invisible in the data, frequently exploited through sexual violence or coerced into carrying weapons and drugs by male associates. Children in care are significantly overrepresented among both victims and suspects of serious youth violence.</p>
            <p>Youth violence data is shaped by multiple measurement challenges. Police-recorded serious violence depends on force definitions and recording thresholds, which vary. Hospital admissions data captures the most severe injuries but misses the far larger volume of cases treated in A&amp;E without admission, treated by GPs, or not treated at all. The Crime Survey excludes under-16s and people not in private households. Hotspot analyses are sensitive to boundary definitions and population estimates. The most commonly cited figure &mdash; youth homicides &mdash; represents the extreme tail of a distribution whose body is invisible in most datasets. Trend comparisons pre- and post-2015 are complicated by the introduction of new recording standards. What the available data does make clear is that the geography and demography of serious youth violence are highly concentrated, and that prevention and intervention programmes show measurable effects where they are properly funded.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-hospital', label: 'Hospital Admissions' },
          { id: 'sec-offences', label: 'Offences' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Hospital admissions for assault (under-25)"
              value="7,100"
              unit="/year"
              direction="up"
              polarity="up-is-bad"
              changeText="Highest since 2012 &middot; concentrated in urban areas"
              sparklineData={[5820, 5300, 5960, 6400, 6100, 4200, 5500, 6300, 6800, 7100]}
              source="NHS Digital &middot; Hospital Episode Statistics, 2024"
              onExpand={() => {}}
            />
            <MetricCard
              label="Serious youth violence offences"
              value="28,500"
              unit="/year"
              direction="up"
              polarity="up-is-bad"
              changeText="Up 57% since 2015 &middot; police-recorded"
              sparklineData={[18200, 19500, 22100, 24800, 25400, 20100, 23300, 26200, 27800, 28500]}
              source="Home Office &middot; Police Recorded Crime, 2024"
              onExpand={() => {}}
            />
            <MetricCard
              label="Youth services budget cut"
              value="73%"
              direction="down"
              polarity="up-is-good"
              changeText="Real-terms cut since 2010 &middot; 750+ youth centres closed"
              sparklineData={[100, 88, 72, 58, 48, 40, 35, 30, 28, 27]}
              source="YMCA &middot; Youth Services Spending Tracker, 2023"
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-hospital" className="mb-12">
            <LineChart
              title="Hospital admissions for assault, under-25s, England"
              subtitle="Finished admission episodes for assault-related injuries in patients aged 0-24. NHS Hospital Episode Statistics."
              series={hospitalSeries}
              yLabel="Admissions"
              source={{ name: 'NHS Digital', dataset: 'Hospital Episode Statistics', frequency: 'annual' }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-offences" className="mb-12">
            <LineChart
              title="Police-recorded serious youth violence, England &amp; Wales"
              subtitle="Offences of violence with injury involving victims aged under 25."
              series={violenceSeries}
              yLabel="Offences"
              source={{ name: 'Home Office', dataset: 'Police Recorded Crime', frequency: 'annual' }}
            />
          </section>
        </ScrollReveal>
      </main>
    </>
  );
}
