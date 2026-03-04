'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';

// ── Types ────────────────────────────────────────────────────────────────────

interface SuicideData {
  national: {
    suicideRate: {
      timeSeries: Array<{ year: number; ratePer100k: number }>;
      latestYear: number;
      latestRate: number;
      latestDeaths: number;
    };
    selfHarmAE: {
      timeSeries: Array<{ year: number; presentationsThousands: number }>;
      latestYear: number;
      latestThousands: number;
    };
    byAgeGroup: Array<{ ageGroup: string; ratePer100k: number }>;
  };
  metadata: {
    sources: Array<{ name: string; dataset: string; url: string; frequency: string }>;
    methodology: string;
    knownIssues: string[];
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function SuicidePreventionPage() {
  const [data, setData] = useState<SuicideData | null>(null);

  useEffect(() => {
    fetch('/data/suicide-prevention/suicide_prevention.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const suicideRateSeries: Series[] = data
    ? [{
        id: 'suicide-rate',
        label: 'Suicide rate per 100,000',
        colour: '#E63946',
        data: data.national.suicideRate.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.ratePer100k,
        })),
      }]
    : [];

  const suicideRateAnnotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: '2020: COVID lockdown' },
  ];

  const selfHarmSeries: Series[] = data
    ? [{
        id: 'self-harm',
        label: 'A&E presentations (thousands)',
        colour: '#E63946',
        data: data.national.selfHarmAE.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.presentationsThousands,
        })),
      }]
    : [];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Suicide Prevention" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Suicide Prevention"
          question="Why Is Britain Failing to Prevent Suicide?"
          finding="Around 5,642 deaths by suicide were registered in England and Wales in 2022 &mdash; the highest since 1999. Men account for 75% of all suicides. Suicide is the leading cause of death for people aged 20&ndash;34. The UK suicide rate stands at 10.7 per 100,000 &mdash; above the EU average. Crisis services are overwhelmed: A&amp;E presentations for self-harm have doubled since 2010."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Suicide is the leading cause of death for people aged 20&ndash;34 in England and Wales. In 2022 the overall toll reached its highest level in two decades, with 5,642 suicides registered &mdash; a figure that sits behind statistics on heart disease and cancer but which receives a fraction of the equivalent policy and clinical attention. Three-quarters of those deaths are men. That disparity &mdash; consistent across decades and across comparable countries &mdash; reflects patterns of help-seeking, social isolation, method availability, and the still-inadequate reach of services designed around crisis presentations rather than prevention.</p>
            <p>A&amp;E presentations for self-harm have approximately doubled since 2012, from around 50,000 to over 100,000 annually, though this partly reflects improved recording and reduced stigma in presenting. Hotspot locations &mdash; specific railway lines, bridges, and coastal cliffs &mdash; account for a disproportionate share of method-specific deaths. This matters because the evidence on means restriction is among the strongest in suicide prevention: physical barriers at hotspots consistently reduce deaths at that location without simply displacing method. The gap between the evidence base and infrastructure investment remains wide.</p>
            <p>The National Suicide Prevention Strategy for England, published in 2023, identifies six priority groups: men, young people, people in contact with the criminal justice system, people in mental health crisis, neurodivergent people, and autistic people. It commits to a &ldquo;zero suicide&rdquo; ambition within mental health services and to expanding real-time surveillance so that local areas can respond to emerging clusters. The ambition is appropriate. Whether the accompanying investment &mdash; and accountability mechanisms to track progress against it &mdash; is sufficient is a different question.</p>
            <p>The evidence base for what works is clearer than is sometimes acknowledged. Means restriction at specific hotspots reduces deaths with consistent effect sizes across international studies. Safe messaging guidelines &mdash; avoiding method detail, avoiding sensationalised framing &mdash; have measurable impact on contagion following high-profile deaths. Crisis line capacity matters at the margin. Several NHS trusts have implemented Zero Suicide frameworks with promising early results, embedding risk assessment and safety planning into routine care pathways rather than treating suicidality as a specialised referral trigger. The challenge is not primarily evidential; it is implementation, funding consistency, and workforce.</p>
            <p>The recorded suicide figures are almost certainly an undercount. Coroners apply a high evidentiary threshold for a suicide verdict &mdash; requiring proof of intent &mdash; meaning deaths recorded as &ldquo;undetermined&rdquo; or &ldquo;accidental&rdquo; include an unknown proportion of suicides. Methodological conservatism also delays registration; figures for recent years are revised upward as inquests conclude. Digital mental health data &mdash; crisis contacts via text and online platforms, patterns of self-harm in younger cohorts &mdash; is poorly integrated into national surveillance. Speaking plainly about suicide, as this strategy requires, is itself an evidence-based act: research consistently shows that frank, careful discussion reduces stigma and increases help-seeking rather than causing harm.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-rate', label: 'Suicide Rate' },
          { id: 'sec-selfharm', label: 'Self-Harm' },
          { id: 'sec-age', label: 'By Age Group' },
        ]} />

        <ScrollReveal>
          <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Deaths by suicide registered (England &amp; Wales)"
              value="5,642"
              direction="up"
              polarity="up-is-bad"
              changeText="2022 &middot; Highest since 1999 &middot; 75% male &middot; Leading cause of death aged 20&ndash;34"
              sparklineData={[4800, 4900, 5000, 5100, 5200, 5400, 5250, 5300, 4912, 5224, 5642]}
              onExpand={() => {}}
            />
            <MetricCard
              label="Suicide rate (per 100,000 population)"
              value="10.7"
              direction="up"
              polarity="up-is-bad"
              changeText="2022 &middot; Above EU average &middot; Men: 16.3 per 100,000 &middot; Women: 5.1 per 100,000"
              sparklineData={[10.1, 10.1, 10.0, 10.0, 10.1, 10.1, 11.2, 11.0, 10.0, 10.4, 10.7]}
              onExpand={() => {}}
            />
            <MetricCard
              label="A&amp;E self-harm presentations (annual)"
              value="225K"
              direction="up"
              polarity="up-is-bad"
              changeText="2022 &middot; Doubled since 2010 &middot; Young women worst affected &middot; Waits for crisis beds average 24 hours"
              sparklineData={[115, 120, 128, 138, 152, 165, 185, 200, 172, 210, 225]}
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-rate" className="mb-12">
            <LineChart
              title="Age-standardised suicide rate, England and Wales, 2012&ndash;2022"
              subtitle="Deaths per 100,000 population, registered deaths."
              series={suicideRateSeries}
              annotations={suicideRateAnnotations}
              yLabel="Deaths per 100,000"
              source={{
                name: 'ONS',
                dataset: 'Suicides in England and Wales',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-selfharm" className="mb-12">
            <LineChart
              title="A&amp;E presentations for self-harm, England, 2012&ndash;2022"
              subtitle="Annual A&amp;E attendances for intentional self-harm, in thousands."
              series={selfHarmSeries}
              yLabel="Presentations (thousands)"
              source={{
                name: 'NHS England',
                dataset: 'A&amp;E Attendances and Emergency Admissions',
                frequency: 'monthly',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-age" className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-2">Suicide rate by age group, England and Wales, 2022</h2>
            <p className="text-sm text-wiah-mid font-mono mb-6">Age-standardised rates per 100,000 population by age group.</p>
            {data && (
              <div className="space-y-3">
                {data.national.byAgeGroup.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-20 text-sm text-wiah-black flex-shrink-0">{item.ageGroup}</div>
                    <div className="flex-1 bg-wiah-border rounded h-5 overflow-hidden">
                      <div
                        className="h-full rounded"
                        style={{ width: `${(item.ratePer100k / 16.3) * 100}%`, backgroundColor: '#E63946' }}
                      />
                    </div>
                    <div className="w-16 text-right text-sm font-mono text-wiah-black">{item.ratePer100k.toFixed(1)}</div>
                  </div>
                ))}
              </div>
            )}
            <p className="font-mono text-xs text-wiah-mid mt-4">Source: ONS &mdash; Suicides in England and Wales</p>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="What&apos;s improving"
            value="Zero Suicide"
            unit="ambition adopted by NHS Long-Term Plan &mdash; aiming to reduce suicides by 10% by 2028"
            description="The NHS Long-Term Plan (2019) set an ambition to reduce suicides by at least 10% by 2028. Crisis Resolution Home Treatment Teams now cover all areas of England, providing 24/7 community-based crisis support as an alternative to hospital admission. Samaritans handled 21,000 contacts per day in 2023 &mdash; almost 8 million annually. The Safe Messaging guidelines, followed by all major UK broadcasters, have demonstrably reduced suicide following high-profile cases. The Suicide Prevention Strategy 2023 focuses on six priority groups: men, young people, people in contact with the justice system, people with health conditions, autistic people, and people from deprived communities."
            source="Source: ONS &mdash; Suicides in England and Wales 2022; DHSC &mdash; Suicide Prevention Strategy 2023."
          />
        </ScrollReveal>

        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            {data?.metadata.sources.map((src, i) => (
              <div key={i}>
                <a href={src.url} target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">
                  {src.name} &mdash; {src.dataset}
                </a>
                <div className="text-xs text-wiah-mid">Updated {src.frequency}</div>
              </div>
            ))}
          </div>
          <div className="text-sm text-wiah-mid mt-6 space-y-2">
            <h3 className="font-bold">Methodology</h3>
            <p>{data?.metadata.methodology}</p>
          </div>
          <div className="text-sm text-wiah-mid mt-6 space-y-2">
            <h3 className="font-bold">Known issues</h3>
            <ul className="list-disc list-inside space-y-1">
              {data?.metadata.knownIssues.map((issue, i) => (
                <li key={i}>{issue}</li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
