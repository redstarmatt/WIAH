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
            <p>Small boat crossings of the English Channel have become the defining border security issue of the 2020s. From 299 arrivals in 2018, the annual total rose to 45,755 in 2022 before falling to 29,437 in 2023 and rising again to 36,816 in 2024. These numbers are small relative to overall immigration — net migration to the UK was 728,000 in 2024 — but the crossings are dangerous, visible, and politically charged. At least 70 people have died attempting the crossing since 2018. The route is controlled by organised criminal smuggling networks operating from northern France and Belgium, charging £3,000 to £6,000 per person for a place on an overcrowded inflatable dinghy.</p>
            <p>Successive governments have pursued deterrence-based strategies with limited measurable effect. The Rwanda deportation policy, announced in 2022 and eventually declared unlawful by the Supreme Court in 2023, consumed approximately £700 million without removing a single asylum seeker. The Illegal Migration Act 2023 sought to make anyone arriving by small boat permanently inadmissible to the asylum system, but implementation has been suspended following legal challenges and a change of government. France has received over £500 million in UK funding since 2018 to increase beach patrols and disrupt launch sites. Interception rates have risen — around 40% of launch attempts are now prevented — but crossings continue because demand for the route is driven by factors beyond French policing: conflict, persecution, and the absence of safe legal routes to claim asylum in the UK.</p>
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
              changeText="Up 25% on 2023 · 70+ deaths since 2018"
              sparklineData={[299, 1843, 8466, 28526, 45755, 29437, 36816]}
              source="Home Office · Irregular Migration Statistics, 2025"
              onExpand={() => {}}
            />
            <MetricCard
              label="Asylum decision backlog"
              value="98,600"
              direction="down"
              polarity="up-is-bad"
              changeText="Down from 175K peak · still 2x pre-pandemic levels"
              sparklineData={[38200, 42100, 52400, 76900, 132400, 175400, 118300, 98600]}
              source="Home Office · Immigration Statistics, 2025"
              onExpand={() => {}}
            />
            <MetricCard
              label="Enforced returns"
              value="2,950"
              unit="/year"
              direction="down"
              polarity="up-is-good"
              changeText="Down from 12,000+ a decade ago · historic low"
              sparklineData={[12400, 10800, 8200, 6100, 4800, 3600, 3200, 2950]}
              source="Home Office · Returns Statistics, 2025"
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-crossings" className="mb-12">
            <LineChart
              title="Small boat Channel crossings, 2018–2025"
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
              title="Asylum decision backlog, 2018–2025"
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
