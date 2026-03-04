'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';

interface AeData {
  national: {
    fourHourPerformance: {
      timeSeries: { year: number; within4HoursPct: number }[];
      latestYear: number;
      latestPct: number;
      targetPct: number;
      lastMetYear: number;
      note: string;
    };
    twelveHourWaits: {
      timeSeries: { year: number; annualWaitsThousands: number }[];
      latestYear: number;
      latestThousands: number;
      december2023Monthly: number;
      note: string;
    };
    attendances: {
      annualAttendances2023Millions: number;
      typeBreakdown: { type: string; pct: number }[];
    };
    ambulanceHandover: {
      timeSeries: { year: number; delayOver30MinPct: number }[];
      latestYear: number;
      latestPct: number;
    };
  };
  metadata: {
    sources: Array<{
      name: string;
      dataset: string;
      url?: string;
      frequency?: string;
    }>;
    methodology: string;
    knownIssues: string[];
  };
}

export default function NhsAePage() {
  const [data, setData] = useState<AeData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data/nhs-ae/nhs_ae.json')
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading || !data) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const fourHourSeries: Series[] = [
    {
      id: 'within4hours',
      label: '% in 4 hours',
      colour: '#E63946',
      data: data.national.fourHourPerformance.timeSeries.map((p) => ({
        date: new Date(p.year, 0, 1),
        value: p.within4HoursPct,
      })),
    },
  ];

  const fourHourAnnotations: Annotation[] = [
    { date: new Date(2015, 5, 1), label: '2015: Target last met' },
    { date: new Date(2020, 3, 1), label: '2020: COVID' },
  ];

  const twelveHourSeries: Series[] = [
    {
      id: 'twelvehourfwaits',
      label: 'Waits (thousands)',
      colour: '#F4A261',
      data: data.national.twelveHourWaits.timeSeries.map((p) => ({
        date: new Date(p.year, 0, 1),
        value: p.annualWaitsThousands,
      })),
    },
  ];

  const ambulanceHandoverSeries: Series[] = [
    {
      id: 'ambulancehandover',
      label: '% delayed >30 mins',
      colour: '#E63946',
      data: data.national.ambulanceHandover.timeSeries.map((p) => ({
        date: new Date(p.year, 0, 1),
        value: p.delayOver30MinPct,
      })),
    },
  ];


  const mainSource = data.metadata.sources[0];

  return (
    <div className="min-h-screen bg-white">
      <TopicNav topic="NHS A&amp;E" />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <TopicHeader
          topic="NHS A&amp;E"
          colour="#E63946"
          question="How Bad Are NHS A&amp;E Waiting Times?"
          finding="Only 70% of patients are seen within 4 hours in major A&amp;E departments &mdash; the target is 95%. This target has not been consistently met since 2015. Over 300,000 patients waited more than 12 hours in 2023/24. 24 million people attended A&amp;E in 2022/23 &mdash; the highest ever."
        />

        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <MetricCard
              label="A&amp;E 4-hour performance (major)"
              value="70%"
              direction="down"
              polarity="up-is-good"
              changeText="2023/24 · Target: 95% · Last met consistently: 2015 · Dec 2023 worst: 67.3% · 24M A&amp;E visits/year"
              sparklineData={[95, 94, 93, 92, 90, 88, 83, 78, 83, 70, 70]}
              source={`Source: ${mainSource.name}`}
              onExpand={() => {}}
            />

            <MetricCard
              label="12-hour waits in A&amp;E (trolley waits)"
              value="300K+"
              direction="up"
              polarity="up-is-bad"
              changeText="2023/24 · Up from near-zero in 2019 · Corridor care · Record 88K in Dec 2023 alone · &lsquo;Unsafe&rsquo; says RCEM"
              sparklineData={[500, 1000, 3000, 5000, 7000, 12000, 40000, 88000]}
              source={`Source: ${mainSource.name}`}
              onExpand={() => {}}
            />

            <MetricCard
              label="Ambulance handover delays &gt;30 mins"
              value="31%"
              direction="up"
              polarity="up-is-bad"
              changeText="2022/23 · Up from &lt;5% in 2020 · Paramedics &lsquo;stacking&rsquo; outside hospitals · 1 in 3 arrivals delayed"
              sparklineData={[3, 4, 5, 8, 15, 25, 28, 31]}
              source={`Source: ${mainSource.name}`}
              onExpand={() => {}}
            />
          </div>

          <ScrollReveal>
            <div className="bg-wiah-light p-6 rounded-lg space-y-4">
              <h2 className="text-xl font-bold text-wiah-black">
                Major A&amp;E 4-hour performance, England, 2012&ndash;2024
              </h2>
              <LineChart
                title="Major A&amp;E 4-hour performance, England, 2012&ndash;2024"
                subtitle="Percentage of Type 1 A&amp;E attendances seen within 4 hours"
                series={fourHourSeries}
                annotations={fourHourAnnotations}
                targetLine={{ value: 95, label: '95% target' }}
                yLabel="% in 4 hours"
                source={{
                  name: mainSource.name,
                  dataset: mainSource.dataset,
                  url: mainSource.url,
                  frequency: mainSource.frequency,
                }}
              />
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="bg-wiah-light p-6 rounded-lg space-y-4">
              <h2 className="text-xl font-bold text-wiah-black">
                12-hour trolley waits in A&amp;E, England, 2018&ndash;2024
              </h2>
              <LineChart
                title="12-hour trolley waits in A&amp;E, England, 2018&ndash;2024"
                subtitle="Patients waiting more than 12 hours from decision to admit to leaving A&amp;E"
                series={twelveHourSeries}
                yLabel="Patients (thousands)"
                source={{
                  name: mainSource.name,
                  dataset: mainSource.dataset,
                  url: mainSource.url,
                  frequency: mainSource.frequency,
                }}
              />
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="bg-wiah-light p-6 rounded-lg space-y-4">
              <h2 className="text-xl font-bold text-wiah-black">
                Ambulance handover delays, England, 2019&ndash;2023
              </h2>
              <LineChart
                title="Ambulance handover delays >30 mins, England, 2019&ndash;2023"
                subtitle="Percentage of ambulance arrivals with handover delays exceeding 30 minutes"
                series={ambulanceHandoverSeries}
                yLabel="% delayed >30 mins"
                source={{
                  name: mainSource.name,
                  dataset: mainSource.dataset,
                  url: mainSource.url,
                  frequency: mainSource.frequency,
                }}
              />
            </div>
          </ScrollReveal>

          <PositiveCallout
            title="Urgent Treatment Centres easing pressure"
            value="50+"
            unit="Urgent Treatment Centres opened since 2017 &mdash; taking pressure off major A&amp;E"
            description="NHS England has opened over 50 Urgent Treatment Centres (UTCs) since 2017, offering same-day care for non-life-threatening conditions without A&amp;E admission. UTCs are open 12 hours a day, 7 days a week, staffed by GPs and nurses. In 2022/23, they handled over 10 million attendances &mdash; around 44% of all emergency care activity &mdash; diverting patients away from major A&amp;E departments. The NHS 111 online triage service directed a further 6 million people to appropriate care without requiring A&amp;E attendance. The &lsquo;ambulance to the front door&rsquo; initiative is improving handover times in high-delay trusts."
            source="Source: NHS England &mdash; A&amp;E Attendances and Emergency Admissions 2023/24."
          />

          <div className="bg-wiah-light p-6 rounded-lg space-y-4">
            <h2 className="text-lg font-bold text-wiah-black">Context</h2>
            <p className="text-base text-wiah-black leading-relaxed">
              The 4-hour A&amp;E target &mdash; 95% of patients seen within four hours &mdash; was last consistently met in 2015, when performance stood at 93%. By 2019 it had fallen to 83% in Type 1 major departments, and by 2023/24 it reached 70%. Total attendances hit 24 million in 2022/23, the highest ever recorded, with 45% at major A&amp;E and 44% at Urgent Treatment Centres. Presentations by over-85s have risen 40% since 2012, bringing longer assessment times and greater clinical complexity that compound the capacity squeeze.
            </p>
            <p className="text-base text-wiah-black leading-relaxed">
              Twelve-hour trolley waits &mdash; the interval from a decision to admit to actual departure from A&amp;E &mdash; were near zero before 2020. They reached 14,000 in 2021, surpassed 200,000 in 2023, and exceeded 300,000 in 2023/24. December 2023 alone recorded 88,000, more in a single month than any full year before 2021. The Royal College of Emergency Medicine declared corridor care a permanent feature of emergency medicine and estimates 23,000 avoidable deaths per year are linked to prolonged A&amp;E waits, based on mortality studies of 8&ndash;12-hour wait cohorts.
            </p>
            <p className="text-base text-wiah-black leading-relaxed">
              The bottleneck runs both ways. Ambulance handover delays exceeding 30 minutes rose from 3% in 2019 to 31% in 2023, with worst-performing trusts averaging 45-minute offload times. Behind that: over 10,000 patients per day awaited discharge in 2022/23, each delayed day costing the NHS &pound;345 in occupied beds. One study found 1 in 7 A&amp;E attendees cited inability to get a GP appointment. NHS England&apos;s 2023 recovery plan targeted the 10 worst-performing trusts and expanded Same Day Emergency Care units, but demand from a growing, ageing population continues to outpace supply.
            </p>
          </div>

          <div className="bg-wiah-light p-6 rounded-lg space-y-4">
            <h2 className="text-lg font-bold text-wiah-black">Sources &amp; Methodology</h2>
            <p className="text-sm text-wiah-mid font-mono">
              <strong>Primary source:</strong> NHS England A&amp;E Attendances and Emergency Admissions (monthly returns). Available at:{' '}
              <a
                href={mainSource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-wiah-blue hover:underline"
              >
                {mainSource.url}
              </a>
            </p>
            <p className="text-sm text-wiah-mid">
              <strong>4-hour performance:</strong> Percentage of all Type 1 A&amp;E attendances meeting the 4-hour standard (arrival to discharge, admission, or transfer). Annual average calculated from monthly data.
            </p>
            <p className="text-sm text-wiah-mid">
              <strong>12-hour trolley waits:</strong> Cumulative count of distinct waits exceeding 12 hours from decision to admit to leaving A&amp;E. Definition changed in 2021 &mdash; pre- and post-2021 data are not directly comparable.
            </p>
            <p className="text-sm text-wiah-mid">
              <strong>Ambulance handover delays:</strong> Percentage of ambulance arrivals experiencing handover delay exceeding 30 minutes. Data collected by ambulance trusts. Collection improved in 2022; earlier figures may undercount.
            </p>
            <div className="mt-4 pt-4 border-t border-wiah-border">
              <p className="text-xs text-wiah-mid">
                <strong>Known issues:</strong> 4-hour target applies to Type 1 only. &lsquo;All type&rsquo; performance (including minor injury units and UTCs) is higher. 12-hour wait definition change in 2021 breaks comparability. Ambulance data collection improved in 2022 &mdash; earlier figures may undercount.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-wiah-border">
          <a href="/" className="text-wiah-blue hover:underline text-sm font-mono">
            ← Back to all topics
          </a>
        </div>
      </main>

    </div>
  );
}
