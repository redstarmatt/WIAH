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
            <p>County lines is a model of drug distribution in which urban gangs establish dealing networks in smaller towns and rural areas, using dedicated phone lines to take orders. The defining feature is the exploitation of children and vulnerable adults as couriers, dealers, and custodians of cash and drugs. The National Crime Agency estimates that at peak, around 2,000 county lines were operating across England and Wales. Intensive policing through Operation Orochi and its successors has closed more than 3,000 lines since 2019 &mdash; yet the model persists, adapting its methods as enforcement pressure increases.</p>
            <p>The recruitment pipeline targets children as young as 10. Gangs identify vulnerable young people &mdash; those excluded from school, in care, with unstable housing, or from families experiencing addiction or domestic abuse &mdash; and groom them with small payments, gifts, status, and belonging before escalating to coercion, threats, and violence. &ldquo;Cuckooing,&rdquo; where dealers take over the homes of vulnerable adults to use as local bases, remains widespread. Once embedded, children face debt bondage, sexual exploitation, and extreme violence including stabbing, torture, and in some cases murder.</p>
            <p>Referrals of children to the National Referral Mechanism for criminal exploitation have risen from around 4,000 in 2017 to over 10,000 in 2024. This increase reflects both growing awareness and genuine expansion of the exploitation model. The Children&apos;s Society estimates that the true number of affected children is significantly higher, as many are never identified by services. Contextual safeguarding &mdash; an approach that assesses risk in a child&apos;s wider environment rather than focusing narrowly on the family &mdash; has been adopted by some local authorities but remains unevenly implemented.</p>
            <p>Black and mixed-heritage boys are disproportionately represented among identified county lines victims, reflecting both patterns of recruitment and racial biases in who gets flagged by police and social services. Children in care are at acute risk: a 2020 review found that looked-after children were three times more likely to be identified as county lines victims. Rural and coastal towns &mdash; Margate, Hastings, Grimsby, Blackpool &mdash; have become hotspots, but county lines networks now operate in virtually every county in England and Wales. Girls are increasingly identified as victims, often exploited through sexual violence alongside drug running.</p>
            <p>Data on county lines is inherently uncertain. The NCA&apos;s line counts are intelligence estimates, not census data; definitions of what constitutes a &ldquo;line&rdquo; vary between forces. NRM referrals depend on professionals recognising exploitation, which requires training that not all frontline workers have received. Police data conflates children exploited by county lines with broader categories of youth violence and drug crime. The Home Office does not publish consistent annual statistics on county lines specifically. Outcome data &mdash; how many exploited children receive effective support, how many are re-exploited, how many are wrongly criminalised for drug offences &mdash; is essentially unavailable at a national level.</p>
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
              onExpand={() => {}}
            />
            <MetricCard
              label="County lines closed since 2019"
              value="3,000+"
              direction="up"
              polarity="up-is-good"
              changeText="Op Orochi and successors &middot; but lines re-emerge"
              sparklineData={[400, 800, 1400, 2100, 2600, 3000]}
              source="NCA &middot; County Lines Strategic Assessment, 2024"
              onExpand={() => {}}
            />
            <MetricCard
              label="Estimated active lines"
              value="~700"
              direction="down"
              polarity="up-is-bad"
              changeText="Down from peak of 2,000 &middot; NCA estimate"
              sparklineData={[2000, 1500, 1300, 800, 600, 660, 720, 700]}
              source="NCA &middot; County Lines Strategic Assessment, 2024"
              onExpand={() => {}}
            />
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
