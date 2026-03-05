'use client'

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';

// ── Types ────────────────────────────────────────────────────────────────────

interface VolunteeringData {
  volunteeringRate: Array<{ year: number; formalPct: number }>;
  charityIncome: Array<{ year: number; realTermsBillions: number }>;
  metadata: {
    sources: { name: string; dataset: string; url: string; frequency: string }[];
    methodology: string;
    knownIssues: string[];
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function VolunteeringPage() {
  const [data, setData] = useState<VolunteeringData | null>(null);

  useEffect(() => {
    fetch('/data/volunteering/volunteering.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const volunteeringSeries: Series[] = data
    ? [{
        id: 'formal-volunteering',
        label: 'Monthly formal volunteering rate',
        colour: '#2A9D8F',
        data: data.volunteeringRate.map(d => ({
          date: yearToDate(d.year),
          value: d.formalPct,
        })),
      }]
    : [];

  const charityIncomeSeries: Series[] = data
    ? [{
        id: 'charity-income',
        label: 'UK charity sector income (real terms)',
        colour: '#264653',
        data: data.charityIncome.map(d => ({
          date: yearToDate(d.year),
          value: d.realTermsBillions,
        })),
      }]
    : [];

  return (
    <>
      <TopicNav topic="Volunteering" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Volunteering"
          question="Is Britain Still Willing to Give Its Time?"
          finding="Formal volunteering has fallen by a quarter since 2015, from 27% of adults volunteering monthly to just 20% in 2023. The pandemic accelerated a pre-existing decline, and the charity sector is under growing financial pressure: real-terms income has stagnated while demand for services has surged."
          colour="#2A9D8F"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              Volunteering is a pillar of British civil society, with an estimated 16.3 million adults volunteering formally at least once a year, contributing an estimated &pound;23 billion of economic value annually. But the trend is downward. The DCMS Community Life Survey shows regular formal volunteering &mdash; at least once a month &mdash; fell from 27% of adults in 2015 to 20% in 2023. The pandemic was a watershed: lockdowns dismantled the routines that sustain volunteering, and NCVO found 40% of charities reported a decline in volunteer numbers between 2019 and 2023. The cost-of-living crisis compounded the pressure, with the Charities Aid Foundation finding 34% of people who stopped volunteering cited financial reasons. Simultaneously, demand for charity services &mdash; food banks, debt advice, mental health support &mdash; has surged, creating a widening gap between what civil society is asked to provide and its capacity to deliver.
            </p>
            <p>
              The decline is not evenly distributed. Volunteering rates are 28% in the least deprived areas against 14% in the most deprived; time, transport, and social networks required to volunteer are less available to people in precarious economic circumstances. Young people aged 16&ndash;24 have the lowest rates. Black African and Black Caribbean communities have lower formal volunteering rates than the white British average, though informal community support is likely under-measured. Rural areas face particular pressure as 3,000 community buildings &mdash; village halls, churches, community centres &mdash; have closed since 2010, removing the physical infrastructure on which much volunteering depends.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Overview' },
          { id: 'sec-volunteering', label: 'Volunteering Rate' },
          { id: 'sec-charity', label: 'Charity Income' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Adults volunteering monthly"
              value="20%"
              direction="down"
              polarity="up-is-good"
              changeText="Down from 27% in 2015 &middot; Pandemic accelerated pre-existing decline"
              sparklineData={[27.0, 26.1, 24.8, 23.3, 23.1, 17.2, 16.3, 19.4, 20.1]}
              source="DCMS &middot; Community Life Survey 2023"
              onExpand={() => {}}
            />
            <MetricCard
              label="Charity sector income (real terms)"
              value="&pound;54.8bn"
              direction="flat"
              polarity="up-is-good"
              changeText="Stagnated in real terms &middot; Demand for services surging"
              sparklineData={[54.2, 55.1, 55.8, 56.4, 57.0, 51.3, 53.8, 55.2, 54.8]}
              source="NCVO &middot; UK Civil Society Almanac 2023"
              onExpand={() => {}}
            />
            <MetricCard
              label="Charities reporting volunteer decline"
              value="40%"
              direction="up"
              polarity="up-is-bad"
              changeText="2019&ndash;2023 &middot; Older volunteers disproportionately not returning"
              sparklineData={[15, 18, 22, 28, 35, 40]}
              source="NCVO &middot; Charity Tracker Survey 2023"
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-volunteering" className="mb-12">
            {volunteeringSeries.length > 0 ? (
              <LineChart
                title="Regular formal volunteering rate, England, 2015&ndash;2023"
                subtitle="Percentage of adults volunteering at least once a month through a group, club, or organisation."
                series={volunteeringSeries}
                yLabel="Percentage (%)"
                source={{
                  name: 'DCMS',
                  dataset: 'Community Life Survey',
                  frequency: 'annual',
                  url: 'https://www.gov.uk/government/collections/community-life-survey--2',
                }}
              />
            ) : (
              <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
            )}
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-charity" className="mb-12">
            {charityIncomeSeries.length > 0 ? (
              <LineChart
                title="UK charity sector income, 2015&ndash;2023 (real terms)"
                subtitle="Total income of registered charities in England and Wales, adjusted to 2023 prices using the GDP deflator."
                series={charityIncomeSeries}
                yLabel="Income (&pound; billions)"
                source={{
                  name: 'NCVO',
                  dataset: 'UK Civil Society Almanac',
                  frequency: 'annual',
                  url: 'https://www.ncvo.org.uk/research/almanac/',
                }}
              />
            ) : (
              <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
            )}
          </section>
        </ScrollReveal>

        {/* Sources */}
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
