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
            <p>Serious youth violence has risen significantly over the past decade. Police forces recorded 28,500 serious violence offences involving under-25 victims in 2024, up 57% from 18,200 in 2015. Hospital admissions for assault-related injuries among under-25s reached 7,100 &mdash; a figure that, unlike police records, cannot be inflated by changes in recording practice. The drivers are structural and well-documented: local authority spending on youth services fell by 73% in real terms between 2010 and 2023, over 750 youth centres closed since 2012, school exclusions increased 50% between 2012 and 2019 (excluded children are five times more likely to become victims or perpetrators), and county lines drug networks have recruited children as young as 10. The Serious Violence Duty, introduced in 2023, requires local authorities, police, health, and probation to collaborate on prevention strategies, and 18 Violence Reduction Units now operate across England modelled on the Glasgow approach that cut violence-related hospital admissions by 60% over 15 years.</p>
            <p>Black boys and young men bear a disproportionate burden: in London, Black males aged 15&ndash;24 are victims of serious violence at four to five times the average for their age group, and face simultaneous overrepresentation in stop-and-search, arrest, and sentencing. This dual burden reflects deep structural inequalities in housing, education, and employment. Girls and young women are frequently invisible in the data, often exploited through sexual violence or coerced into carrying weapons by male associates. Children in care are significantly overrepresented among both victims and suspects. VRU funding remains short-term and grant-dependent, significantly below the sustained Scottish model, and hospital-based violence intervention programmes &mdash; operating in around 30 A&amp;E departments &mdash; are not yet a standard NHS service.</p>
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
