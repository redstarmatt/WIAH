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
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'Gambling Commission', dataset: 'Industry Statistics', url: 'https://www.gamblingcommission.gov.uk/statistics-and-research/publication/industry-statistics', date: '2025' },
  { num: 2, name: 'Gambling Commission', dataset: 'Statistics on Participation and Problem Gambling', url: 'https://www.gamblingcommission.gov.uk/statistics-and-research/publication/statistics-on-participation-and-problem-gambling', date: '2025' },
  { num: 3, name: 'NHS Digital', dataset: 'Health Survey for England — Gambling chapter', url: 'https://digital.nhs.uk/data-and-information/publications/statistical/health-survey-for-england', date: '2025' },
  { num: 4, name: 'DHSC', dataset: 'Gambling Act White Paper', url: 'https://www.gov.uk/government/white-papers/high-stakes-gambling-reform-for-the-digital-age', date: '2023' },
  { num: 5, name: 'NHS England', dataset: 'National Gambling Treatment Service', url: 'https://www.england.nhs.uk/statistics/', date: '2024/25' },
];

// ── Types ────────────────────────────────────────────────────────────────────

interface GrossYieldPoint {
  year: number;
  valueBn: number;
}

interface ProblemGamblerPoint {
  year: number;
  thousandsProblem: number;
  thousandsModerateRisk: number;
}

interface SlotIntensityPoint {
  year: number;
  millionsHighIntensity: number;
}

interface OnlineGamblingData {
  grossYield: GrossYieldPoint[];
  problemGamblers: ProblemGamblerPoint[];
  onlineSlotIntensity: SlotIntensityPoint[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 0, 1);
}

function sparkFrom(arr: number[], n = 10) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function OnlineGamblingGrowthPage() {
  const [data, setData] = useState<OnlineGamblingData | null>(null);

  useEffect(() => {
    fetch('/data/online-gambling-growth/online_gambling_growth.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const grossYieldSeries: Series[] = data
    ? [{
        id: 'gross-yield',
        label: 'Online gross gambling yield (£bn)',
        colour: '#E63946',
        data: data.grossYield.map(d => ({
          date: yearToDate(d.year),
          value: d.valueBn,
        })),
      }]
    : [];

  const problemGamblerSeries: Series[] = data
    ? [
        {
          id: 'problem',
          label: 'Problem gamblers (thousands)',
          colour: '#E63946',
          data: data.problemGamblers.map(d => ({
            date: yearToDate(d.year),
            value: d.thousandsProblem,
          })),
        },
        {
          id: 'moderate-risk',
          label: 'Moderate-risk gamblers (thousands)',
          colour: '#F4A261',
          data: data.problemGamblers.map(d => ({
            date: yearToDate(d.year),
            value: d.thousandsModerateRisk,
          })),
        },
      ]
    : [];

  const slotIntensitySeries: Series[] = data
    ? [{
        id: 'slots',
        label: 'High-intensity online slots players (millions)',
        colour: '#6B7280',
        data: data.onlineSlotIntensity.map(d => ({
          date: yearToDate(d.year),
          value: d.millionsHighIntensity,
        })),
      }]
    : [];

  // ── Annotations ──────────────────────────────────────────────────────────

  const yieldAnnotations: Annotation[] = [
    { date: new Date(2020, 2, 1), label: '2020: Lockdown — online gambling surges' },
    { date: new Date(2023, 6, 1), label: '2023: Gambling Act white paper' },
  ];

  const problemAnnotations: Annotation[] = [
    { date: new Date(2018, 0, 1), label: '2018: Survey methodology change' },
    { date: new Date(2020, 2, 1), label: '2020: Pandemic spike' },
  ];

  const slotAnnotations: Annotation[] = [
    { date: new Date(2019, 3, 1), label: '2019: FOBT stake cut to £2' },
    { date: new Date(2020, 2, 1), label: '2020: Lockdown shift online' },
  ];

  // ── Latest data points ──────────────────────────────────────────────────

  const latestYield = data?.grossYield[data.grossYield.length - 1];
  const baseYield = data?.grossYield[0];
  const latestProblem = data?.problemGamblers[data.problemGamblers.length - 1];
  const baseProblem = data?.problemGamblers[0];
  const latestSlots = data?.onlineSlotIntensity[data.onlineSlotIntensity.length - 1];

  return (
    <>
      <TopicNav topic="Online Gambling Growth" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Online Gambling Growth"
          question="Is Online Gambling Getting Bigger?"
          finding="Online gambling generated £7.7 billion in gross yield in 2025 — nearly half the total UK gambling market. An estimated 450,000 adults are problem gamblers, and 1.4 million play online slots at high intensity. The market has more than doubled in a decade."
          colour="#E63946"
          preposition="with"
        />

        {/* Editorial context */}
        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              The UK online gambling market has undergone a structural transformation. In 2014, online operators
              generated around £3.1 billion in gross gambling yield. By 2025, that figure reached £7.7 billion — a 148%
              increase that far outstrips inflation, wage growth, or the expansion of any comparable consumer market.<Cite nums={1} />
              Online gambling now accounts for roughly 46% of total UK gambling revenue, up from around 30% a decade
              ago.<Cite nums={1} /> This is not a gradual evolution; it is a wholesale migration of gambling activity from high streets
              to smartphones. When the government cut the maximum stake on fixed-odds betting terminals from £100 to £2
              in April 2019, bookmakers closed nearly 4,700 shops within two years. But the money did not leave the
              gambling system — it moved online, where the regulatory environment was looser, the products were faster,
              and the operators had already built highly personalised digital platforms.<Cite nums={1} />
            </p>
            <p>
              The human cost of this expansion is measured in the Gambling Commission's participation surveys and the
              NHS Health Survey for England.<Cite nums={[2, 3]} /> An estimated 450,000 adults in Great Britain now meet the clinical threshold
              for problem gambling — people who have lost control of their gambling to the point where it causes serious
              harm to themselves and their families. A further 940,000 are classified as moderate-risk gamblers, one
              life event away from tipping into problem territory.<Cite nums={2} /> Online slots — fast, repetitive, and algorithmically
              designed to maximise time-on-device — are the product category most strongly associated with harm. Around
              1.4 million people play online slots at high intensity, defined as four or more days per week.<Cite nums={1} /> These are
              not recreational gamblers having an occasional flutter; they are engaged in a pattern of behaviour that
              clinical evidence links to depression, relationship breakdown, debt crisis, and suicide.
            </p>
            <p>
              The 2023 Gambling Act white paper acknowledged the scale of the problem and proposed stake limits for
              online slots, mandatory affordability checks, and a statutory levy on operators to fund research,
              prevention, and treatment.<Cite nums={4} /> Implementation has been slow. The NHS National Gambling Clinic in London and
              regional clinics now treat over 3,000 patients per year, but the treatment system reaches less than 2%
              of those estimated to need help.<Cite nums={5} /> Meanwhile, gambling operators spend over £1.5 billion annually on
              advertising and marketing, much of it targeted through social media algorithms at young men aged 18–34 —
              the demographic with the highest rates of problem gambling.<Cite nums={[1, 2]} /> The data is unambiguous: the market is growing,
              the harm is growing, and the regulatory response has not yet caught up with either.
            </p>
          </div>

          <div className="mt-6">
            <References items={editorialRefs} />
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-yield', label: 'Market growth' },
          { id: 'sec-problem', label: 'Problem gambling' },
          { id: 'sec-slots', label: 'Online slots' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Online gross gambling yield"
            value={latestYield ? `£${latestYield.valueBn}bn` : '£7.7bn'}
            unit="2025"
            direction="up"
            polarity="up-is-bad"
            changeText={
              latestYield && baseYield
                ? `+148% since ${baseYield.year} · now 46% of total UK gambling market`
                : '+148% since 2014 · now 46% of total gambling market'
            }
            sparklineData={
              data ? sparkFrom(data.grossYield.map(d => d.valueBn)) : [3.1, 3.5, 3.9, 4.4, 4.9, 5.5, 6, 6.3, 6.7, 7]
            }
            source="Gambling Commission — Industry Statistics, 2025"
            href="#sec-yield"
          />
          <MetricCard
            label="Estimated problem gamblers"
            value={latestProblem ? `${latestProblem.thousandsProblem}k` : '450k'}
            unit="adults"
            direction="up"
            polarity="up-is-bad"
            changeText={
              latestProblem && baseProblem
                ? `up from ${baseProblem.thousandsProblem}k in ${baseProblem.year} · <2% access treatment`
                : 'up from 280k in 2014 · <2% access treatment'
            }
            sparklineData={
              data ? sparkFrom(data.problemGamblers.map(d => d.thousandsProblem)) : [280, 300, 310, 340, 370, 390, 410, 400, 420, 430]
            }
            source="Gambling Commission — Participation & Problem Gambling, 2025"
            href="#sec-problem"
          />
          <MetricCard
            label="High-intensity online slots players"
            value={latestSlots ? `${latestSlots.millionsHighIntensity}m` : '1.42m'}
            unit="4+ days/week"
            direction="up"
            polarity="up-is-bad"
            changeText="daily or near-daily play · strongest link to gambling harm"
            sparklineData={
              data ? sparkFrom(data.onlineSlotIntensity.map(d => d.millionsHighIntensity)) : [0.7, 0.8, 0.9, 1.05, 1.1, 1.15, 1.3, 1.38, 1.42]
            }
            source="Gambling Commission — Industry Statistics, 2025"
            href="#sec-slots"
          />
        </div>

        {/* Chart 1: Gross gambling yield */}
        <ScrollReveal>
          <div id="sec-yield" className="mb-12">
            <LineChart
              series={grossYieldSeries}
              annotations={yieldAnnotations}
              title="Online gross gambling yield (£ billions), UK, 2014–2025"
              subtitle="Amount retained by online operators after payout of winnings. Excludes retail betting shops."
              yLabel="Gross yield (£bn)"
              source={{
                name: 'Gambling Commission',
                dataset: 'Industry Statistics',
                url: 'https://www.gamblingcommission.gov.uk/statistics-and-research/publication/industry-statistics',
                date: 'March 2026',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 2: Problem gambling prevalence */}
        <ScrollReveal>
          <div id="sec-problem" className="mb-12">
            <LineChart
              series={problemGamblerSeries}
              annotations={problemAnnotations}
              title="Problem and moderate-risk gamblers (thousands), Great Britain, 2014–2025"
              subtitle="Estimated adults meeting PGSI clinical threshold for problem gambling or moderate risk."
              yLabel="People (thousands)"
              source={{
                name: 'Gambling Commission',
                dataset: 'Statistics on Participation and Problem Gambling',
                url: 'https://www.gamblingcommission.gov.uk/statistics-and-research/publication/statistics-on-participation-and-problem-gambling',
                date: 'March 2026',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 3: Online slots intensity */}
        <ScrollReveal>
          <div id="sec-slots" className="mb-12">
            <LineChart
              series={slotIntensitySeries}
              annotations={slotAnnotations}
              title="High-intensity online slots players (millions), UK, 2017–2025"
              subtitle="Adults playing online slots 4+ days per week. The product category most linked to gambling harm."
              yLabel="Players (millions)"
              source={{
                name: 'Gambling Commission',
                dataset: 'Industry Statistics — Online Slots',
                url: 'https://www.gamblingcommission.gov.uk/statistics-and-research/publication/industry-statistics',
                date: 'March 2026',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="NHS gambling treatment services expanding"
            value="3,000+"
            unit="patients treated per year"
            description="The NHS Northern Gambling Service and National Gambling Clinic in London now treat over 3,000 patients annually, up from fewer than 500 in 2019. Fourteen NHS gambling clinics now operate across England, providing free CBT-based therapy and psychiatric support. The 2023 Gambling Act white paper proposed a mandatory statutory levy on operators to fund further expansion of research, prevention, and treatment — a model already proven in Australia and New Zealand. Early evidence from NHS clinics shows 70% of patients completing treatment report sustained reductions in gambling behaviour at 12-month follow-up."
            source="Source: NHS England — National Gambling Treatment Service, 2024/25. DHSC — Gambling Act White Paper, 2023."
          />
        </ScrollReveal>

        {/* Sources & Methodology */}
        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p>
              <a href="https://www.gamblingcommission.gov.uk/statistics-and-research/publication/industry-statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Gambling Commission — Industry Statistics</a> — gross gambling yield, operator data, online slots activity. Retrieved March 2026.
            </p>
            <p>
              <a href="https://www.gamblingcommission.gov.uk/statistics-and-research/publication/statistics-on-participation-and-problem-gambling" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Gambling Commission — Statistics on Participation and Problem Gambling</a> — prevalence estimates using Problem Gambling Severity Index (PGSI). Retrieved March 2026.
            </p>
            <p>
              <a href="https://digital.nhs.uk/data-and-information/publications/statistical/health-survey-for-england" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS Digital — Health Survey for England</a> — gambling chapter providing independent prevalence estimates. Retrieved March 2026.
            </p>
            <p>
              Problem gambling prevalence methodology changed in 2018 from face-to-face interviews to combined telephone/online survey, creating a partial break in the time series. COVID-19 lockdowns (2020–21) caused temporary shifts from retail to online gambling. All figures are for Great Britain unless otherwise stated.
            </p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
