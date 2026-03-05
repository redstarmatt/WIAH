'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';

// ── Types ────────────────────────────────────────────────────────────────────

interface CrossingsPoint {
  year: number;
  arrivals: number;
}

interface BacklogPoint {
  year: number;
  cases: number;
}

interface BorderSecurityData {
  national: {
    smallBoatCrossings: CrossingsPoint[];
    asylumBacklog: BacklogPoint[];
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function BorderSecurityPage() {
  const [data, setData] = useState<BorderSecurityData | null>(null);

  useEffect(() => {
    fetch('/data/border-security/border_security.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const crossingsSeries: Series[] = data
    ? [{
        id: 'small-boat-crossings',
        label: 'Small boat arrivals',
        colour: '#264653',
        data: data.national.smallBoatCrossings.map(d => ({
          date: yearToDate(d.year),
          value: d.arrivals,
        })),
      }]
    : [];

  const backlogSeries: Series[] = data
    ? [{
        id: 'asylum-backlog',
        label: 'Asylum backlog',
        colour: '#E63946',
        data: data.national.asylumBacklog.map(d => ({
          date: yearToDate(d.year),
          value: d.cases,
        })),
      }]
    : [];

  return (
    <>
      <TopicNav topic="Border Security" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Border Security"
          question="What Is Actually Happening at the Border?"
          finding="36,816 people crossed the English Channel in small boats in 2024, up 25% on 2023. The asylum decision backlog stood at 98,600 cases at the end of 2025, down from a peak of 175,400 but still more than double pre-pandemic levels. Returns of failed asylum seekers have fallen to historic lows."
          colour="#264653"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Small boat crossings of the English Channel have become the defining border security issue of the 2020s. From 299 arrivals in 2018, the annual total rose to 45,755 in 2022 before falling to 29,437 in 2023 and rising again to 36,816 in 2024. These numbers are small relative to overall immigration &mdash; net migration to the UK was 728,000 in 2024 &mdash; but the crossings are dangerous, visible, and politically charged. At least 70 people have died attempting the crossing since 2018. The route is controlled by organised criminal smuggling networks operating from northern France and Belgium, charging &pound;3,000 to &pound;6,000 per person for a place on an overcrowded inflatable dinghy.</p>
            <p>Successive governments have pursued deterrence-based strategies with limited measurable effect. The Rwanda deportation policy, announced in 2022 and eventually declared unlawful by the Supreme Court in 2023, consumed approximately &pound;700 million without removing a single asylum seeker. The Illegal Migration Act 2023 sought to make anyone arriving by small boat permanently inadmissible to the asylum system, but implementation has been suspended following legal challenges and a change of government. France has received over &pound;500 million in UK funding since 2018 to increase beach patrols and disrupt launch sites. Interception rates have risen &mdash; around 40% of launch attempts are now prevented &mdash; but crossings continue because demand for the route is driven by factors beyond French policing: conflict, persecution, and the absence of safe legal routes to claim asylum in the UK.</p>
            <p>The asylum decision backlog, which peaked at 175,400 in mid-2023, has been reduced to 98,600 through a surge in caseworker recruitment and streamlined decision-making processes. However, this remains more than double the pre-pandemic figure of 42,000 and far above the government&apos;s target. Average waiting times for initial decisions remain at around 12 months. During this period, asylum seekers are housed at public expense but forbidden from working &mdash; a policy that costs the exchequer approximately &pound;8 million per day in hotel and dispersal accommodation. The use of hotels to house asylum seekers, peaking at over 50,000 people in 400 hotels in late 2023, has generated significant local opposition and was a factor in the 2024 unrest in several English towns.</p>
            <p>The demographics of small boat arrivals are specific and often misunderstood. The majority are young men, but around 20% are women and children, including unaccompanied minors. The largest nationality groups in 2024 were Afghan, Iranian, Iraqi, Eritrean, and Syrian &mdash; countries with well-documented conflict, persecution, and human rights crises. Grant rates for asylum claims from these nationalities are high: around 80% for Afghans, 73% for Eritreans, and 90% for Sudanese. Albanians, who were the largest group in 2022, declined sharply in 2023 following a bilateral returns agreement. Returns of failed asylum seekers have fallen to historic lows: fewer than 3,000 enforced returns in 2024, compared with over 12,000 a decade earlier, reflecting difficulties in negotiating returns agreements and the practical challenges of removal.</p>
            <p>Border crossing data is collected by the Home Office and published with a lag of several weeks. Figures are recorded at the point of interception or arrival, not at the point of departure, and small discrepancies between Home Office totals and independent counts (such as those maintained by the PA news agency) arise from different counting rules. Asylum backlog figures are snapshots at a point in time and can fluctuate due to batch-processing of decisions. Grant rates vary significantly by nationality, caseworker, and over time &mdash; making aggregate figures somewhat misleading. The total cost of the asylum system is estimated but not independently audited in a way that separates small boat arrivals from other routes. Comparisons with European countries are complicated by different asylum systems, geographic positions, and the Schengen zone&apos;s internal border-free movement.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-crossings', label: 'Crossings' },
          { id: 'sec-backlog', label: 'Backlog' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Small boat arrivals"
              value="36,816"
              unit="2024"
              direction="up"
              polarity="up-is-bad"
              changeText="Up 25% on 2023 &middot; 70+ deaths since 2018"
              sparklineData={[299, 1843, 8466, 28526, 45755, 29437, 36816]}
              source="Home Office &middot; Irregular Migration Statistics, 2025"
              onExpand={() => {}}
            />
            <MetricCard
              label="Asylum decision backlog"
              value="98,600"
              direction="down"
              polarity="up-is-bad"
              changeText="Down from 175K peak &middot; still 2x pre-pandemic levels"
              sparklineData={[38200, 42100, 52400, 76900, 132400, 175400, 118300, 98600]}
              source="Home Office &middot; Immigration Statistics, 2025"
              onExpand={() => {}}
            />
            <MetricCard
              label="Enforced returns"
              value="2,950"
              unit="/year"
              direction="down"
              polarity="up-is-good"
              changeText="Down from 12,000+ a decade ago &middot; historic low"
              sparklineData={[12400, 10800, 8200, 6100, 4800, 3600, 3200, 2950]}
              source="Home Office &middot; Returns Statistics, 2025"
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-crossings" className="mb-12">
            <LineChart
              title="Small boat Channel crossings, 2018&ndash;2025"
              subtitle="People arriving in the UK via small boats across the English Channel. 2025 figure is year-to-date."
              series={crossingsSeries}
              yLabel="Arrivals"
              source={{ name: 'Home Office', dataset: 'Irregular Migration to the UK Statistics', frequency: 'quarterly' }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-backlog" className="mb-12">
            <LineChart
              title="Asylum decision backlog, 2018&ndash;2025"
              subtitle="Total cases awaiting an initial decision on asylum claim. UK-wide."
              series={backlogSeries}
              yLabel="Cases"
              source={{ name: 'Home Office', dataset: 'Immigration System Statistics', frequency: 'quarterly' }}
            />
          </section>
        </ScrollReveal>
      </main>
    </>
  );
}
