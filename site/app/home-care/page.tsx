'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import PositiveCallout from '@/components/PositiveCallout';

// ── Types ────────────────────────────────────────────────────────────────────

interface HomeCareData {
  timeSeries: Array<{ date: string; waitingThousands: number; vacancies: number }>;
  providerTimeSeries: Array<{ date: string; providerClosures: number }>;
  metadata: {
    sources: { name: string; dataset: string; url: string; frequency: string }[];
    methodology: string;
    knownIssues: string[];
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: string): Date {
  return new Date(parseInt(y), 5, 1);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function HomeCarePage() {
  const [data, setData] = useState<HomeCareData | null>(null);

  useEffect(() => {
    fetch('/data/home-care/home_care.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const waitingSeries: Series[] = data
    ? [
        {
          id: 'waiting',
          label: 'People waiting for home care assessment (thousands)',
          colour: '#264653',
          data: data.timeSeries.map(d => ({ date: yearToDate(d.date), value: d.waitingThousands })),
        },
      ]
    : [];

  const providerSeries: Series[] = data
    ? [
        {
          id: 'closures',
          label: 'Domiciliary care provider closures &amp; contract returns',
          colour: '#E63946',
          data: data.providerTimeSeries.map(d => ({ date: yearToDate(d.date), value: d.providerClosures })),
        },
      ]
    : [];

  return (
    <>
      <TopicNav topic="Home Care" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Home Care"
          question="Are Older People Getting the Care They Need at Home?"
          finding="An estimated 500,000 people in England are waiting for a care needs assessment or delayed in receiving a home care package — while 132,000 social care vacancies go unfilled and providers return contracts they can no longer afford to deliver."
          colour="#264653"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              Home care — also called domiciliary care — enables older and disabled people to live independently by providing support with washing, dressing, cooking, medication, and personal care in their own homes. It is the largest component of adult social care by volume: around 870,000 people in England receive some form of home care support, making it far larger than residential care. Yet the system is under severe strain. An estimated 500,000 people are waiting for a care needs assessment or have been assessed but are still awaiting a care package to start — a figure that has roughly doubled since 2016 as demand from an ageing population outstrips the sector's capacity to respond.
            </p>
            <p>
              The workforce crisis is the immediate constraint. Skills for Care estimates that the social care sector has 132,000 vacant posts — a vacancy rate of 9.9%, compared with 3.8% across the whole economy. Turnover in home care is 38% annually, meaning providers must replace more than a third of their staff every year simply to stand still. Pay is the primary driver: the median home care worker earns £10.80 per hour, barely above the national living wage, and significantly less than NHS equivalents doing comparable work. The sector lost an estimated 50,000 European workers following the end of free movement in 2021, and while international recruitment has partially filled the gap — 70,000 overseas care workers entered the sector in 2022 and 2023 — visa restrictions tightened in early 2024 may reverse these gains.
            </p>
            </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Overview' },
          { id: 'sec-waiting', label: 'Waiting Times' },
          { id: 'sec-providers', label: 'Provider Closures' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="People waiting for home care assessment"
              value="500,000"
              direction="up"
              polarity="up-is-bad"
              changeText="Up from 280,000 in 2016 · Doubled in eight years"
              sparklineData={[280, 310, 340, 370, 400, 430, 470, 500]}
              source="NHS England / Local authorities · Adult social care data 2023"
              href="#sec-waiting"
            />
            <MetricCard
              label="Social care vacancies"
              value="132,000"
              direction="up"
              polarity="up-is-bad"
              changeText="Vacancy rate 9.9% vs 3.8% whole-economy average"
              sparklineData={[88000, 95000, 102000, 110000, 165000, 152000, 140000, 132000]}
              source="Skills for Care · State of the Sector 2023"
              href="#sec-waiting"
            />
            <MetricCard
              label="Home care providers returning contracts"
              value="360"
              unit="in 2023"
              direction="up"
              polarity="up-is-bad"
              changeText="Up from 140 in 2015 · Providers exit as rates fall below cost"
              sparklineData={[140, 155, 188, 220, 245, 210, 260, 305, 360]}
              source="UKHCA / CQC · Provider market analysis 2023"
              href="#sec-waiting"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-waiting" className="mb-12">
            {waitingSeries.length > 0 ? (
              <LineChart
                title="People waiting for home care assessment or package, England, 2016–2024"
                subtitle="Estimated number of people awaiting a care needs assessment or a home care package commencement (thousands). Combines NHS community health and local authority delayed assessment data."
                series={waitingSeries}
                yLabel="People waiting (thousands)"
                source={{
                  name: 'NHS England / DHSC',
                  dataset: 'Community health services &amp; adult social care statistics',
                  frequency: 'quarterly',
                  url: 'https://www.england.nhs.uk/statistics/statistical-work-areas/community-health-services/',
                }}
              />
            ) : (
              <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
            )}
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-providers" className="mb-12">
            {providerSeries.length > 0 ? (
              <LineChart
                title="Domiciliary care provider closures and contract returns, 2015–2024"
                subtitle="Number of registered home care providers closing or returning local authority contracts annually in England. Rising provider exits signal systemic market failure driven by unaffordable commissioning rates."
                series={providerSeries}
                yLabel="Provider exits (number)"
                source={{
                  name: 'Care Quality Commission / UKHCA',
                  dataset: 'State of care &amp; provider market analysis',
                  frequency: 'annual',
                  url: 'https://www.cqc.org.uk/publications/major-report/state-of-care',
                }}
              />
            ) : (
              <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
            )}
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="What is changing"
            value="£1.16bn"
            unit="Disabled Facilities Grant 2024"
            description="The Disabled Facilities Grant was increased to £1.16bn in 2024, enabling more people to adapt their homes with stairlifts, wet rooms, and accessible layouts to support independent living — keeping people out of residential care and hospital. The Better Care Fund also provides £7.5bn annually to integrate health and social care and reduce delayed discharges."
            source="DLUHC / DHSC · Disabled Facilities Grant 2024 · Better Care Fund 2024"
          />
        </ScrollReveal>

        <section className="border-t border-wiah-border pt-8 mt-12">
          <h2 className="text-lg font-bold text-wiah-black mb-4">Sources &amp; methodology</h2>
          <div className="text-sm text-wiah-mid space-y-2">
            {data?.metadata.sources.map((src, i) => (
              <p key={i}>
                <strong>{src.name}.</strong> <em>{src.dataset}</em>. {src.frequency} — 
                <a href={src.url} target="_blank" rel="noopener noreferrer" className="underline text-wiah-blue hover:no-underline">
                  {src.url}
                </a>
              </p>
            ))}
          </div>
          <p className="text-sm text-wiah-mid mt-6">{data?.metadata.methodology}</p>
          {data?.metadata.knownIssues && data.metadata.knownIssues.length > 0 && (
            <div className="mt-6 p-4 bg-wiah-light rounded">
              <p className="font-bold text-wiah-black mb-2">Known issues:</p>
              <ul className="text-sm text-wiah-mid space-y-1 list-disc list-inside">
                {data.metadata.knownIssues.map((issue, i) => (
                  <li key={i}>{issue}</li>
                ))}
              </ul>
            </div>
          )}
        </section>
      </main>
    </>
  );
}
