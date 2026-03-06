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
          finding="An estimated 500,000 people in England are waiting for a care needs assessment or delayed in receiving a home care package &mdash; while 132,000 social care vacancies go unfilled and providers return contracts they can no longer afford to deliver."
          colour="#264653"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              Home care &mdash; also called domiciliary care &mdash; enables older and disabled people to live independently by providing support with washing, dressing, cooking, medication, and personal care in their own homes. It is the largest component of adult social care by volume: around 870,000 people in England receive some form of home care support, making it far larger than residential care. Yet the system is under severe strain. An estimated 500,000 people are waiting for a care needs assessment or have been assessed but are still awaiting a care package to start &mdash; a figure that has roughly doubled since 2016 as demand from an ageing population outstrips the sector&apos;s capacity to respond.
            </p>
            <p>
              The workforce crisis is the immediate constraint. Skills for Care estimates that the social care sector has 132,000 vacant posts &mdash; a vacancy rate of 9.9%, compared with 3.8% across the whole economy. Turnover in home care is 38% annually, meaning providers must replace more than a third of their staff every year simply to stand still. Pay is the primary driver: the median home care worker earns &pound;10.80 per hour, barely above the national living wage, and significantly less than NHS equivalents doing comparable work. The sector lost an estimated 50,000 European workers following the end of free movement in 2021, and while international recruitment has partially filled the gap &mdash; 70,000 overseas care workers entered the sector in 2022 and 2023 &mdash; visa restrictions tightened in early 2024 may reverse these gains.
            </p>
            <p>
              Provider viability is the structural problem underneath the workforce crisis. Local authorities commission the vast majority of home care at rates that providers say are below the actual cost of delivery once staff pay, travel time, and management costs are included. The United Kingdom Homecare Association calculated in 2023 that the minimum sustainable rate for home care was &pound;25.95 per hour, but the average local authority rate was &pound;19.35 per hour &mdash; a gap of 25%. As a result, 360 providers returned council contracts in 2023, unable to deliver services at the commissioned price. This creates a vicious cycle: as providers exit, remaining providers take on more referrals than they can safely staff, leading to missed calls, shortened visits, and deteriorating care quality. CQC inspections increasingly cite staffing as the primary risk factor in inadequate ratings.
            </p>
            <p>
              The consequences fall hardest on the oldest and most isolated. The average home care recipient is 80 years old; 60% have dementia or a significant cognitive impairment; 45% live alone. When care packages break down or cannot start, the burden transfers to unpaid carers &mdash; predominantly daughters and daughters-in-law &mdash; who reduce working hours or leave employment entirely. Carers UK estimates that 600 people leave work every day to care for an older or disabled relative. Regional variation is stark: rural areas and coastal towns with older populations and lower council funding face the most acute shortages, while London and major cities have higher vacancy rates due to competition from higher-paying sectors. The North East of England has the highest proportion of older people in home care relative to the population, and some of the lowest local authority commissioning rates.
            </p>
            <p>
              Quantifying the home care crisis accurately is genuinely difficult. England has no national waiting list database equivalent to NHS Referral to Treatment data &mdash; waiting figures are estimated by combining local authority delayed assessments data, NHS community health service waiting times, and charity surveys of carers. The Adult Social Care Finance Return (ASCFR) collects some data annually but with a 12-month lag. Care Quality Commission ratings give a snapshot of quality at the point of inspection but inspections are infrequent and may not reflect current conditions. Vacancy figures from Skills for Care are derived from an employer survey with good but not complete coverage, and the methodology changed in 2021 making pre-pandemic comparisons approximate. International recruitment statistics are drawn from Home Office visa data and do not track whether workers remain in care roles after two years.
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
              changeText="Up from 280,000 in 2016 &middot; Doubled in eight years"
              sparklineData={[280, 310, 340, 370, 400, 430, 470, 500]}
              source="NHS England / Local authorities &middot; Adult social care data 2023"
              onExpand={() => {}}
            />
            <MetricCard
              label="Social care vacancies"
              value="132,000"
              direction="up"
              polarity="up-is-bad"
              changeText="Vacancy rate 9.9% vs 3.8% whole-economy average"
              sparklineData={[88000, 95000, 102000, 110000, 165000, 152000, 140000, 132000]}
              source="Skills for Care &middot; State of the Sector 2023"
              onExpand={() => {}}
            />
            <MetricCard
              label="Home care providers returning contracts"
              value="360"
              unit="in 2023"
              direction="up"
              polarity="up-is-bad"
              changeText="Up from 140 in 2015 &middot; Providers exit as rates fall below cost"
              sparklineData={[140, 155, 188, 220, 245, 210, 260, 305, 360]}
              source="UKHCA / CQC &middot; Provider market analysis 2023"
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-waiting" className="mb-12">
            {waitingSeries.length > 0 ? (
              <LineChart
                title="People waiting for home care assessment or package, England, 2016&ndash;2024"
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
                title="Domiciliary care provider closures and contract returns, 2015&ndash;2024"
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
            value="&pound;1.16bn"
            unit="Disabled Facilities Grant 2024"
            description="The Disabled Facilities Grant was increased to &pound;1.16bn in 2024, enabling more people to adapt their homes with stairlifts, wet rooms, and accessible layouts to support independent living &mdash; keeping people out of residential care and hospital. The Better Care Fund also provides &pound;7.5bn annually to integrate health and social care and reduce delayed discharges."
            source="DLUHC / DHSC &middot; Disabled Facilities Grant 2024 &middot; Better Care Fund 2024"
          />
        </ScrollReveal>

        <section className="border-t border-wiah-border pt-8 mt-12">
          <h2 className="text-lg font-bold text-wiah-black mb-4">Sources &amp; methodology</h2>
          <div className="text-sm text-wiah-mid space-y-2">
            {data?.metadata.sources.map((src, i) => (
              <p key={i}>
                <strong>{src.name}.</strong> <em>{src.dataset}</em>. {src.frequency} &mdash;&nbsp;
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
