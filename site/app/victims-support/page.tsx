'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';

// ── Types ────────────────────────────────────────────────────────────────────

interface SatisfactionPoint {
  year: number;
  rate: number;
}

interface KeptInformedPoint {
  year: number;
  rate: number;
}

interface VictimsSupportData {
  national: {
    victimSatisfaction: SatisfactionPoint[];
    keptInformed: KeptInformedPoint[];
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function VictimsSupportPage() {
  const [data, setData] = useState<VictimsSupportData | null>(null);

  useEffect(() => {
    fetch('/data/victims-support/victims_support.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const satisfactionSeries: Series[] = data
    ? [{
        id: 'satisfaction',
        label: 'Victim satisfaction (%)',
        colour: '#264653',
        data: data.national.victimSatisfaction.map(d => ({
          date: yearToDate(d.year),
          value: d.rate,
        })),
      }]
    : [];

  const informedSeries: Series[] = data
    ? [{
        id: 'kept-informed',
        label: 'Kept adequately informed (%)',
        colour: '#E63946',
        data: data.national.keptInformed.map(d => ({
          date: yearToDate(d.year),
          value: d.rate,
        })),
      }]
    : [];

  return (
    <>
      <TopicNav topic="Victims&apos; Support" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Victims&apos; Support"
          question="Does the Justice System Actually Support Victims?"
          finding="Victim satisfaction with the criminal justice system has fallen to 56.5&percnt; &mdash; down from 73&percnt; in 2015. Fewer than half of victims say they were kept adequately informed about their case. The Victims&apos; Code, which sets out entitlements, is routinely breached with no meaningful enforcement mechanism."
          colour="#264653"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The Victims&apos; Code of Practice sets out 12 rights for victims of crime in England and Wales, including the right to be informed about case progress and referred to support services. In practice, compliance is inconsistent and unenforced. The 2024 crime survey found only 56.5&percnt; of victims satisfied with their overall criminal justice experience &mdash; down from 73&percnt; in 2015 &mdash; and fewer than 45&percnt; said they had been kept adequately informed about their case. The Victims and Prisoners Act 2024 placed the Code on a statutory footing for the first time, but it creates no individually enforceable rights; compliance will be monitored through inspectorates. The Victims&apos; Commissioner&apos;s 2024 survey found 62&percnt; of victims had never heard of the Code. Referrals to Victim Support increased 35&percnt; between 2019 and 2024 without equivalent funding growth, and waiting lists for specialist sexual violence and domestic abuse counselling extend to six months or longer in some areas.</p>
            <p>The burden falls unevenly across groups. Victims from ethnic minority backgrounds report lower satisfaction with police and are less likely to be referred to support. Victims of sexual offences wait an average of over 1,000 days for their case to reach trial. Young victims in abuse proceedings face traumatic cross-examination despite reforms. Poverty, language barriers, and immigration status compound the barriers to accessing justice, and rural victims have fewer specialist services locally &mdash; a structural inequality that the Victims&apos; Code, without enforcement, does nothing to correct.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-satisfaction', label: 'Satisfaction' },
          { id: 'sec-informed', label: 'Kept Informed' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Victim satisfaction"
              value="56.5%"
              direction="down"
              polarity="up-is-good"
              changeText="Down from 73% in 2015 &middot; overall CJS satisfaction"
              sparklineData={[73.2, 71.8, 70.5, 68.1, 66.3, 64.0, 61.5, 59.2, 57.8, 56.5]}
              source="ONS &middot; Crime Survey for England and Wales, 2024"
              onExpand={() => {}}
            />
            <MetricCard
              label="Kept adequately informed"
              value="44.1%"
              direction="down"
              polarity="up-is-good"
              changeText="Down from 62.5% in 2015 &middot; a core Victims&apos; Code right"
              sparklineData={[62.5, 60.2, 58.8, 56.1, 54.0, 51.3, 49.5, 47.2, 45.8, 44.1]}
              source="Victims&apos; Commissioner &middot; Annual Survey, 2024"
              onExpand={() => {}}
            />
            <MetricCard
              label="Victims aware of Victims&apos; Code"
              value="38%"
              direction="down"
              polarity="up-is-good"
              changeText="62% have never heard of it"
              sparklineData={[45, 43, 42, 41, 40, 39, 38]}
              source="Victims&apos; Commissioner &middot; Annual Survey, 2024"
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-satisfaction" className="mb-12">
            <LineChart
              title="Victim satisfaction with criminal justice system, 2015&ndash;2024"
              subtitle="Percentage of victims reporting overall satisfaction with their CJS experience. England and Wales."
              series={satisfactionSeries}
              yLabel="Satisfaction (%)"
              source={{ name: 'ONS', dataset: 'Crime Survey for England and Wales', frequency: 'annual' }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-informed" className="mb-12">
            <LineChart
              title="Victims kept adequately informed about their case, 2015&ndash;2024"
              subtitle="Percentage of victims who felt they were kept sufficiently informed about their case progress."
              series={informedSeries}
              yLabel="Kept informed (%)"
              source={{ name: 'Victims&apos; Commissioner', dataset: 'Annual Survey', frequency: 'annual' }}
            />
          </section>
        </ScrollReveal>
      </main>
    </>
  );
}
