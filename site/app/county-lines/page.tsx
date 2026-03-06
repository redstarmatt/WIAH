'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';

// ── Types ────────────────────────────────────────────────────────────────────

interface ActiveLinesPoint {
  year: number;
  lines: number;
}

interface ChildrenExploitedPoint {
  year: number;
  count: number;
}

interface CountyLinesData {
  national: {
    activeLines: ActiveLinesPoint[];
    childrenExploited: ChildrenExploitedPoint[];
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function CountyLinesPage() {
  const [data, setData] = useState<CountyLinesData | null>(null);

  useEffect(() => {
    fetch('/data/county-lines/county_lines.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const activeLinesSeries: Series[] = data
    ? [{
        id: 'active-lines',
        label: 'Estimated active lines',
        colour: '#6B7280',
        data: data.national.activeLines.map(d => ({
          date: yearToDate(d.year),
          value: d.lines,
        })),
      }]
    : [];

  const childrenSeries: Series[] = data
    ? [{
        id: 'children-exploited',
        label: 'Children referred to NRM',
        colour: '#E63946',
        data: data.national.childrenExploited.map(d => ({
          date: yearToDate(d.year),
          value: d.count,
        })),
      }]
    : [];

  return (
    <>
      <TopicNav topic="County Lines" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="County Lines"
          question="How Are Children Being Exploited by Drug Gangs?"
          finding="An estimated 10,000 children are involved in county lines drug dealing across England and Wales. Despite police operations closing hundreds of lines, the model has adapted and referrals of exploited children continue to rise year on year."
          colour="#6B7280"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>County lines is a model of drug distribution in which urban gangs establish dealing networks in smaller towns and rural areas, exploiting children and vulnerable adults as couriers, dealers, and custodians of cash and drugs. The National Crime Agency estimated around 2,000 lines at peak; Operation Orochi and successor operations have closed over 3,000 lines since 2019, with approximately 700 estimated as still active. NRM referrals of children exploited through criminal activity have risen from around 4,000 in 2017 to over 10,200 in 2024. Gangs target children as young as 10 &mdash; particularly those excluded from school, in care, or with unstable housing &mdash; grooming them before escalating to coercion and violence. &ldquo;Cuckooing&rdquo; of vulnerable adults&apos; homes as local bases remains widespread.</p>
            <p>Black and mixed-heritage boys are disproportionately represented among identified victims, and children in care are three times more likely to be identified as county lines victims. Rural and coastal towns &mdash; Margate, Hastings, Grimsby, Blackpool &mdash; are hotspots, but networks operate in virtually every county in England and Wales. Girls are increasingly identified as victims, often exploited through sexual violence alongside drug running. Contextual safeguarding &mdash; assessing risk in a child&apos;s wider environment rather than the family alone &mdash; has been adopted by some councils but remains unevenly implemented nationally.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-lines', label: 'Active Lines' },
          { id: 'sec-children', label: 'Children Exploited' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Children exploited (NRM referrals)"
              value="10,200"
              unit="/year"
              direction="up"
              polarity="up-is-bad"
              changeText="Up from 4,000 in 2017 &middot; true figure likely higher"
              sparklineData={[4000, 5500, 7000, 6300, 7400, 8200, 9100, 10200]}
              source="Home Office &middot; National Referral Mechanism, 2024"
              href="#sec-lines"/>
            <MetricCard
              label="County lines closed since 2019"
              value="3,000+"
              direction="up"
              polarity="up-is-good"
              changeText="Op Orochi and successors &middot; but lines re-emerge"
              sparklineData={[400, 800, 1400, 2100, 2600, 3000]}
              source="NCA &middot; County Lines Strategic Assessment, 2024"
              href="#sec-children"/>
            <MetricCard
              label="Estimated active lines"
              value="~700"
              direction="down"
              polarity="up-is-bad"
              changeText="Down from peak of 2,000 &middot; NCA estimate"
              sparklineData={[2000, 1500, 1300, 800, 600, 660, 720, 700]}
              source="NCA &middot; County Lines Strategic Assessment, 2024"
              href="#sec-children"/>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-lines" className="mb-12">
            <LineChart
              title="Estimated active county lines, England &amp; Wales"
              subtitle="National Crime Agency intelligence estimates. Line counts are approximate."
              series={activeLinesSeries}
              yLabel="Active lines"
              source={{ name: 'NCA', dataset: 'County Lines Strategic Assessment', frequency: 'annual' }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-children" className="mb-12">
            <LineChart
              title="Children referred to NRM for criminal exploitation"
              subtitle="National Referral Mechanism referrals of children flagged as potential victims of county lines exploitation."
              series={childrenSeries}
              yLabel="NRM referrals"
              source={{ name: 'Home Office', dataset: 'National Referral Mechanism Statistics', frequency: 'annual' }}
            />
          </section>
        </ScrollReveal>
      </main>
    </>
  );
}
