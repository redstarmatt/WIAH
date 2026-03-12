'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

// ── Types ────────────────────────────────────────────────────────────────────

interface ASBIncidentPoint {
  year: number;
  incidents: number;
}

interface EnforcementPoint {
  year: number;
  actions: number;
  note?: string;
}

interface SatisfactionPoint {
  year: number;
  pctSatisfied: number;
}

interface ASBData {
  asbIncidents: ASBIncidentPoint[];
  enforcementActions: EnforcementPoint[];
  satisfactionWithPolice: SatisfactionPoint[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

function sparkFrom(arr: number[], n = 10) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function AntiSocialBehaviourCrisisPage() {
  const [data, setData] = useState<ASBData | null>(null);

  useEffect(() => {
    fetch('/data/anti-social-behaviour-crisis/anti_social_behaviour_crisis.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const incidentSeries: Series[] = data
    ? [{
        id: 'asb-incidents',
        label: 'ASB incidents (CSEW estimate)',
        colour: '#6B7280',
        data: data.asbIncidents.map(d => ({
          date: yearToDate(d.year),
          value: d.incidents,
        })),
      }]
    : [];

  const enforcementSeries: Series[] = data
    ? [{
        id: 'enforcement',
        label: 'Enforcement actions issued',
        colour: '#E63946',
        data: data.enforcementActions.map(d => ({
          date: yearToDate(d.year),
          value: d.actions,
        })),
      }]
    : [];

  const satisfactionSeries: Series[] = data
    ? [{
        id: 'satisfaction',
        label: '% satisfied with police handling',
        colour: '#264653',
        data: data.satisfactionWithPolice.map(d => ({
          date: yearToDate(d.year),
          value: d.pctSatisfied,
        })),
      }]
    : [];

  const latestIncidents = data?.asbIncidents[data.asbIncidents.length - 1];
  const prevIncidents = data?.asbIncidents[data.asbIncidents.length - 2];
  const latestEnforcement = data?.enforcementActions[data.enforcementActions.length - 1];
  const firstEnforcement = data?.enforcementActions[0];
  const latestSatisfaction = data?.satisfactionWithPolice[data.satisfactionWithPolice.length - 1];
  const firstSatisfaction = data?.satisfactionWithPolice[0];

  const enforcementDecline = latestEnforcement && firstEnforcement
    ? Math.round(((firstEnforcement.actions - latestEnforcement.actions) / firstEnforcement.actions) * 100)
    : 46;

  const satisfactionDrop = firstSatisfaction && latestSatisfaction
    ? (firstSatisfaction.pctSatisfied - latestSatisfaction.pctSatisfied).toFixed(1)
    : '18.7';

  return (
    <>
      <TopicNav topic="Crime & Justice" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Crime & Justice"
          question="What actually happens about anti-social behaviour?"
          finding="Anti-social behaviour affects an estimated 1.2 million people each year in England and Wales, yet enforcement actions have fallen 46% since 2014. Public satisfaction with how police handle ASB has dropped to just 40%. Neighbourhood policing — the frontline of ASB response — has been hollowed out."
          colour="#6B7280"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Anti-social behaviour is the crime category that most directly shapes how people feel about where they live. It covers a wide spectrum: persistent noise nuisance, fly-tipping on residential streets, aggressive begging, drug use in stairwells, off-road bikes tearing through estates, harassment of shop workers, and groups intimidating residents in public spaces. The Crime Survey for England and Wales estimates around 1.2 million incidents per year, but this almost certainly understates the true scale. Many victims stop reporting after repeated experiences of nothing being done. A 2023 HMICFRS inspection found that some forces were not recording up to 30% of ASB reports, and that call handlers routinely downgraded ASB incidents to avoid generating a formal record. The gap between lived experience and official statistics is wider for ASB than for almost any other crime type.</p>
            <p>The enforcement infrastructure has been significantly weakened. When ASBOs were replaced by Community Protection Notices, Criminal Behaviour Orders, and other tools under the Anti-Social Behaviour, Crime and Policing Act 2014, the intention was to give agencies more flexible powers. In practice, the number of formal enforcement actions has fallen from over 26,000 in 2014 to around 14,200 in 2024 — a decline of 46%. This mirrors the collapse in neighbourhood policing capacity. England and Wales lost over 7,000 Police Community Support Officers between 2010 and 2023, and neighbourhood policing teams are routinely abstracted to cover response shifts, leaving communities without a visible, dedicated local presence. Fly-tipping incidents have risen to over 1 million per year. Noise complaints to local authorities have increased by 30% since 2019. Councils, facing their own budget pressures, have cut environmental enforcement teams and closed community wardens programmes. The result is a visible deterioration in public spaces that residents experience daily but that rarely features in national crime statistics.</p>
            <p>The government's ASB Action Plan, published in March 2023, acknowledged the scale of the problem and introduced several measures: Immediate Justice pilots requiring offenders to undertake visible community payback within 48 hours, a strengthened Community Trigger giving victims the right to demand a formal case review after three reports in six months, and new powers for local authorities to tackle persistent fly-tipping. The Immediate Justice pilots, initially operating in ten police force areas, have expanded and shown early promise — visible community payback appears to increase victim satisfaction and local confidence. However, the structural problem remains: without sustained investment in neighbourhood policing and local authority enforcement capacity, these tools risk being underused. The community trigger, for instance, was activated only 700 times nationally in 2023/24, suggesting that most victims either do not know about it or have lost faith that reporting will lead to action.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-incidents', label: 'ASB incidents' },
          { id: 'sec-enforcement', label: 'Enforcement' },
          { id: 'sec-satisfaction', label: 'Satisfaction' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="ASB incidents (CSEW estimate)"
            value={latestIncidents ? (latestIncidents.incidents / 1000000).toFixed(1) + 'm' : '1.2m'}
            unit="2023/24"
            direction="up"
            polarity="up-is-bad"
            changeText={
              latestIncidents && prevIncidents
                ? `${((latestIncidents.incidents - prevIncidents.incidents) / prevIncidents.incidents * 100).toFixed(1)}% annual change · widely underreported`
                : 'Widely underreported — true figure likely much higher'
            }
            sparklineData={
              data ? sparkFrom(data.asbIncidents.map(d => d.incidents)) : []
            }
            source="ONS · Crime Survey for England and Wales, 2023/24"
            href="#sec-incidents"
          />
          <MetricCard
            label="Enforcement actions (CPNs/CBOs)"
            value={latestEnforcement ? latestEnforcement.actions.toLocaleString() : '14,200'}
            unit="2023/24"
            direction="down"
            polarity="up-is-bad"
            changeText={`Down ${enforcementDecline}% since 2014 · enforcement capacity declining`}
            sparklineData={
              data ? sparkFrom(data.enforcementActions.map(d => d.actions)) : []
            }
            source="Home Office · ASB Enforcement Statistics, 2023/24"
            href="#sec-enforcement"
          />
          <MetricCard
            label="Satisfaction with police ASB handling"
            value={latestSatisfaction ? latestSatisfaction.pctSatisfied.toFixed(1) + '%' : '40.5%'}
            unit="2023/24"
            direction="down"
            polarity="down-is-bad"
            changeText={`Down ${satisfactionDrop}pp since 2014 · lowest on record`}
            sparklineData={
              data ? sparkFrom(data.satisfactionWithPolice.map(d => d.pctSatisfied)) : []
            }
            source="HMICFRS · Public Perceptions of Policing, 2023/24"
            href="#sec-satisfaction"
          />
        </div>

        {/* Chart 1: ASB incidents */}
        <ScrollReveal>
          <div id="sec-incidents" className="mb-12">
            <LineChart
              series={incidentSeries}
              title="Anti-social behaviour incidents, England &amp; Wales, 2014–2024"
              subtitle="CSEW estimated incidents per year. True figure likely higher due to chronic underreporting."
              yLabel="Incidents"
              source={{
                name: 'ONS',
                dataset: 'Crime Survey for England and Wales — ASB Module',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 2: Enforcement actions */}
        <ScrollReveal>
          <div id="sec-enforcement" className="mb-12">
            <LineChart
              series={enforcementSeries}
              title="ASB enforcement actions issued, England &amp; Wales, 2014–2024"
              subtitle="ASBOs (pre-2015), then CPNs, CBOs, and dispersal orders. Down 46% over the decade."
              yLabel="Actions"
              source={{
                name: 'Home Office',
                dataset: 'Anti-Social Behaviour Enforcement Statistics',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 3: Satisfaction with police handling */}
        <ScrollReveal>
          <div id="sec-satisfaction" className="mb-12">
            <LineChart
              series={satisfactionSeries}
              title="Victim satisfaction with police handling of ASB, 2014–2024"
              subtitle="Percentage of ASB victims who reported being satisfied with the police response. Record low in 2024."
              yLabel="% satisfied"
              source={{
                name: 'HMICFRS',
                dataset: 'Public Perceptions of Policing — ASB Satisfaction',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Immediate Justice pilots and the Community Trigger"
            value="10+ force areas"
            description="The Immediate Justice programme, launched as part of the ASB Action Plan 2023, requires offenders to undertake visible reparative work — litter-picking, graffiti removal, clearing fly-tips — within 48 hours of being identified. Early results from pilot areas show increased victim satisfaction and improved public confidence in policing. The Community Trigger gives any victim the right to demand a formal multi-agency case review after reporting ASB three times in six months. While still underused nationally (around 700 activations in 2023/24), where it is applied it has led to the resolution of entrenched, long-running cases that had previously been passed between agencies without action."
            source="Source: Home Office — ASB Action Plan Progress Report, 2024. HMICFRS — Anti-Social Behaviour Inspection, 2023."
          />
        </ScrollReveal>

        <RelatedTopics />
      </main>
    </>
  );
}
