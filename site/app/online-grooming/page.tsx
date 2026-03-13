'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

// ── Types ────────────────────────────────────────────────────────────────────

interface OffencePoint {
  year: number;
  offences: number;
}

interface Under13Point {
  year: number;
  percent: number;
}

interface ChargeRatePoint {
  year: number;
  percent: number;
}

interface PlatformData {
  platform: string;
  percent: number;
}

interface ForceData {
  force: string;
  offences: number;
}

interface OnlineGroomingData {
  recordedOffences: OffencePoint[];
  under13Share: Under13Point[];
  chargeRate: ChargeRatePoint[];
  byPlatformType: PlatformData[];
  byPoliceForce: ForceData[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

function sparkFrom(arr: number[], n = 10) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function OnlineGroomingPage() {
  const [data, setData] = useState<OnlineGroomingData | null>(null);

  useEffect(() => {
    fetch('/data/online-grooming/online_grooming.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const offencesSeries: Series[] = data
    ? [{
        id: 'recorded-offences',
        label: 'Recorded grooming offences',
        colour: '#6B7280',
        data: data.recordedOffences.map(d => ({
          date: yearToDate(d.year),
          value: d.offences,
        })),
      }]
    : [];

  const under13Series: Series[] = data
    ? [{
        id: 'under-13-share',
        label: 'Cases involving under-13s (%)',
        colour: '#E63946',
        data: data.under13Share.map(d => ({
          date: yearToDate(d.year),
          value: d.percent,
        })),
      }]
    : [];

  const chargeRateSeries: Series[] = data
    ? [{
        id: 'charge-rate',
        label: 'Charge rate (%)',
        colour: '#264653',
        data: data.chargeRate.map(d => ({
          date: yearToDate(d.year),
          value: d.percent,
        })),
      }]
    : [];

  const offencesAnnotations: Annotation[] = [
    { date: new Date(2020, 2, 1), label: "2020: Lockdown \u00b7 children online more" },
    { date: new Date(2023, 0, 1), label: "2023: Online Safety Act passed" },
  ];

  const under13Annotations: Annotation[] = [
    { date: new Date(2020, 2, 1), label: "2020: Under-13 tablet/phone ownership surges" },
  ];

  const chargeRateAnnotations: Annotation[] = [
    { date: new Date(2019, 0, 1), label: "2019: Encryption concerns raised by NPCC" },
  ];

  const latestOffences = data?.recordedOffences[data.recordedOffences.length - 1];
  const firstOffences = data?.recordedOffences[0];
  const latestUnder13 = data?.under13Share[data.under13Share.length - 1];
  const firstUnder13 = data?.under13Share[0];
  const latestChargeRate = data?.chargeRate[data.chargeRate.length - 1];
  const firstChargeRate = data?.chargeRate[0];

  const offencesIncrease = latestOffences && firstOffences
    ? Math.round(((latestOffences.offences - firstOffences.offences) / firstOffences.offences) * 100)
    : 165;

  return (
    <>
      <TopicNav topic="Online Grooming" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Online Grooming"
          question="Is Online Child Grooming Getting Worse?"
          finding="Recorded online grooming offences have risen every year since tracking began in 2017, reaching 8,420 in the year to March 2025. Children under 13 now account for 40% of victims. Fewer than 5% of recorded cases result in a charge."
          colour="#E63946"
          preposition="with"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              The scale of online child grooming in England and Wales has grown relentlessly. Police
              recorded 8,420 sexual communication with a child offences in the year to March 2025 —
              up 165% from the 3,172 recorded in the first full year after the offence was created in
              2017. Some of this increase reflects improved police awareness and reporting by
              platforms, but the National Crime Agency estimates that the true number of children
              targeted online each year is many times the recorded figure. The COVID-19 lockdowns
              marked a step change: with children spending dramatically more time online and
              unsupervised, offences rose sharply in 2020 and never returned to pre-pandemic levels.
              The growth of end-to-end encrypted messaging has made detection significantly harder,
              with the Internet Watch Foundation warning that known tools for identifying grooming
              conversations are rendered ineffective on encrypted platforms.
            </p>
            <p>
              What is most alarming is the age profile of victims. In 2017, 24% of recorded grooming
              offences involved children under 13. By 2025, that share had risen to 40%. This shift
              is closely linked to earlier smartphone ownership — 50% of UK children now have their
              own smartphone by age seven — and the design of social media and gaming platforms that
              allow adult strangers to contact children directly. The NSPCC reports that Snapchat,
              Instagram, and WhatsApp remain the most commonly used platforms in grooming cases, but
              online gaming environments and live-streaming services are growing rapidly as vectors.
              Perpetrators typically establish contact on open platforms before migrating conversations
              to encrypted channels where they cannot be monitored.
            </p>
            <p>
              The criminal justice response has not kept pace with the scale of the problem. The
              charge rate for online grooming offences has fallen from 11.2% in 2017 to just 4.6% in
              2025. Digital forensic examination backlogs of 12 months or more are common, and police
              forces report that the volume of digital evidence in each case has grown exponentially.
              The Online Safety Act 2023 placed new duties on platforms to prevent child sexual
              exploitation, but Ofcom is still finalising enforcement codes and the practical impact
              on grooming volumes remains to be seen. Proactive policing — where officers pose as
              children online — accounts for a significant share of detected offences, but
              capacity is limited. The gap between recorded crime and actual harm remains vast.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-offences', label: 'Recorded offences' },
          { id: 'sec-under13', label: 'Under-13 victims' },
          { id: 'sec-charges', label: 'Charge rate' },
          { id: 'sec-platforms', label: 'Platforms' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Recorded grooming offences"
            value={latestOffences ? latestOffences.offences.toLocaleString() : "8,420"}
            unit="year to Mar 2025"
            direction="up"
            polarity="up-is-bad"
            changeText={`+${offencesIncrease}% since 2017 \u00b7 highest on record`}
            sparklineData={
              data ? sparkFrom(data.recordedOffences.map(d => d.offences)) : []
            }
            source="Home Office \u00b7 Police Recorded Crime, year to Mar 2025"
            href="#sec-offences"
          />
          <MetricCard
            label="Cases involving under-13s"
            value={latestUnder13 ? `${latestUnder13.percent}%` : "40%"}
            unit="2024/25"
            direction="up"
            polarity="up-is-bad"
            changeText={
              latestUnder13 && firstUnder13
                ? `Up from ${firstUnder13.percent}% in ${firstUnder13.year} \u00b7 younger children increasingly targeted`
                : "Up from 24% in 2017"
            }
            sparklineData={
              data ? data.under13Share.map(d => d.percent) : []
            }
            source="Home Office \u00b7 Police Recorded Crime, 2024/25"
            href="#sec-under13"
          />
          <MetricCard
            label="Offences resulting in a charge"
            value={latestChargeRate ? `${latestChargeRate.percent}%` : "4.6%"}
            unit="2024/25"
            direction="down"
            polarity="down-is-bad"
            changeText={
              latestChargeRate && firstChargeRate
                ? `Down from ${firstChargeRate.percent}% in ${firstChargeRate.year} \u00b7 digital forensic backlogs growing`
                : "Down from 11.2% in 2017"
            }
            sparklineData={
              data ? data.chargeRate.map(d => d.percent) : []
            }
            source="Home Office \u00b7 Crime Outcomes, 2024/25"
            href="#sec-charges"
          />
        </div>

        {/* Chart 1: Recorded offences */}
        <ScrollReveal>
          <div id="sec-offences" className="mb-12">
            <LineChart
              series={offencesSeries}
              annotations={offencesAnnotations}
              title="Police-recorded online grooming offences, England &amp; Wales, 2017\u20132025"
              subtitle="Sexual communication with a child offences (s.15A, Sexual Offences Act 2003). Created April 2017."
              yLabel="Offences"
              source={{
                name: 'Home Office',
                dataset: 'Police Recorded Crime',
                frequency: 'annual',
                url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/crimeandjustice/datasets/crimeinenglandandwalesappendixtables',
                date: 'Mar 2025',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 2: Under-13 share */}
        <ScrollReveal>
          <div id="sec-under13" className="mb-12">
            <LineChart
              series={under13Series}
              annotations={under13Annotations}
              title="Share of grooming victims aged under 13, 2017\u20132025"
              subtitle="Percentage of recorded online grooming offences where the victim was under 13 years old."
              yLabel="Percent (%)"
              source={{
                name: 'Home Office / NSPCC',
                dataset: 'Online grooming age profile analysis',
                frequency: 'annual',
                url: 'https://www.nspcc.org.uk/about-us/news-opinion/online-grooming-crimes-rise/',
                date: 'Jan 2025',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 3: Charge rate */}
        <ScrollReveal>
          <div id="sec-charges" className="mb-12">
            <LineChart
              series={chargeRateSeries}
              annotations={chargeRateAnnotations}
              title="Charge rate for online grooming offences, 2017\u20132025"
              subtitle="Percentage of recorded offences resulting in a charge or summons. Down 59% in eight years."
              yLabel="Charge rate (%)"
              source={{
                name: 'Home Office',
                dataset: 'Crime Outcomes in England and Wales',
                frequency: 'annual',
                url: 'https://www.gov.uk/government/statistics/crime-outcomes-in-england-and-wales',
                date: 'Mar 2025',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Platform breakdown */}
        <ScrollReveal>
          <div id="sec-platforms" className="mb-12">
            <div className="bg-white rounded-lg border border-wiah-border p-8">
              <h2 className="text-lg font-bold text-wiah-black mb-2">
                Online grooming by platform type (% of recorded cases where platform identified)
              </h2>
              <p className="text-sm text-wiah-mid mb-6">
                Based on cases where the platform or communication method was recorded by police. Many cases involve multiple platforms.
              </p>
              <div className="mt-6 space-y-4">
                {data?.byPlatformType.map((p) => {
                  return (
                    <div key={p.platform}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-wiah-black">{p.platform}</span>
                        <span className="font-mono text-sm font-bold text-wiah-black">{p.percent}%</span>
                      </div>
                      <div className="h-6 bg-wiah-light rounded-sm overflow-hidden">
                        <div
                          className="h-full rounded-sm transition-all"
                          style={{ width: `${p.percent}%`, backgroundColor: '#6B7280' }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="font-mono text-xs text-wiah-mid mt-4">
                Source: NSPCC analysis of police-recorded grooming offences, 2024/25. Platform identification available in approx. 62% of cases.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Online Safety Act beginning to take effect"
            value="2023"
            unit="Act passed"
            description="The Online Safety Act 2023 placed legal duties on platforms to proactively prevent child sexual exploitation and grooming. Ofcom gained powers to require platforms to use automated detection technology, even on encrypted services, where there is a significant risk to children. While enforcement codes are still being finalised, major platforms have already strengthened default privacy settings for under-18 accounts, and Meta announced the rollout of end-to-end encryption safeguards specifically designed to detect grooming patterns without reading message content. The Internet Watch Foundation reported a 23% increase in platform-initiated reports of suspected grooming to the NCA in 2024 compared to 2023."
            source="Source: Ofcom \u2014 Online Safety Act implementation report, 2024. IWF Annual Report 2024."
          />
        </ScrollReveal>

        {/* Sources & Methodology */}
        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p>
              <a href="https://www.ons.gov.uk/peoplepopulationandcommunity/crimeandjustice/datasets/crimeinenglandandwalesappendixtables" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Home Office / ONS</a> — Police Recorded Crime, England and Wales. Retrieved Mar 2025.
            </p>
            <p>
              <a href="https://www.gov.uk/government/statistics/crime-outcomes-in-england-and-wales" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Home Office</a> — Crime Outcomes in England and Wales. Retrieved Mar 2025.
            </p>
            <p>
              <a href="https://www.nspcc.org.uk/about-us/news-opinion/online-grooming-crimes-rise/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NSPCC</a> — analysis of police-recorded grooming offences, including age profile and platform data.
            </p>
            <p>
              Online grooming is recorded under s.15A Sexual Offences Act 2003 (sexual communication with a child), introduced April 2017.
              All figures are for England and Wales unless otherwise stated. The under-13 share is derived from NSPCC Freedom of Information
              requests to police forces. Charge rate data is from Home Office crime outcomes publications. Platform data is available for
              approximately 62% of recorded cases. Trend data uses the most recent available release at time of publication.
            </p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
