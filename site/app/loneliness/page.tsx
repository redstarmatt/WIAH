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

interface LonelinessPoint {
  year: number;
  pctOftenAlways: number;
}

interface AgeGroupPoint {
  ageGroup: string;
  pctLonely: number;
}

interface LifeCircumstancePoint {
  circumstance: string;
  pctLonely: number;
}

interface LonelinessData {
  lonelinessPrevalence: LonelinessPoint[];
  byAgeGroup: AgeGroupPoint[];
  byLifeCircumstance: LifeCircumstancePoint[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function LonelinessPage() {
  const [data, setData] = useState<LonelinessData | null>(null);

  useEffect(() => {
    fetch('/data/loneliness/loneliness.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  // 1. Chronic loneliness prevalence
  const prevalenceSeries: Series[] = data
    ? [{
        id: 'lonely',
        label: 'Adults reporting loneliness often or always (%)',
        colour: '#6B7280',
        data: data.lonelinessPrevalence.map(d => ({
          date: yearToDate(d.year),
          value: d.pctOftenAlways,
        })),
      }]
    : [];

  const prevalenceAnnotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: 'COVID-19 lockdowns' },
  ];

  return (
    <main>
      <TopicNav topic="Loneliness" />

      <TopicHeader
        topic="Loneliness"
        colour="#6B7280"
        question="How many people are lonely in Britain?"
        finding="Around 3.8 million adults in England say they are chronically lonely, and loneliness carries health risks equivalent to smoking 15 cigarettes a day &mdash; yet public spending on the problem remains negligible."
      />

      {/* Metric cards */}
      <section className="max-w-5xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-3 gap-6">
          <MetricCard
            label="Adults chronically lonely"
            value="3.8M"
            unit="people"
            polarity="up-is-bad"
            direction="up"
            changeText="9% of adults; up since pandemic"
          />
          <MetricCard
            label="Young people (16-24) lonely often/always"
            value="27"
            unit="%"
            polarity="up-is-bad"
            direction="up"
            changeText="Highest of any age group"
          />
          <MetricCard
            label="Estimated economic cost of loneliness per lonely person"
            value="&pound;9,900"
            unit="per year"
            polarity="up-is-bad"
            direction="up"
            changeText="Total NHS cost: &pound;2.4bn/year"
          />
        </div>
      </section>

      {/* Chart 1: Loneliness prevalence */}
      {data && (
        <ScrollReveal>
          <section className="max-w-5xl mx-auto px-6 py-16">
            <LineChart
              title="Adults reporting loneliness often or always, England"
              subtitle="Percentage. Community Life Survey / ONS. &ldquo;Often/always&rdquo; corresponds to chronic loneliness."
              series={prevalenceSeries}
              annotations={prevalenceAnnotations}
              yLabel="Percentage (%)"
              source={{
                name: 'ONS',
                dataset: 'Community Life Survey',
                date: 'March 2026',
                frequency: 'Annual'
              }}
            />
          </section>
        </ScrollReveal>
      )}

      {/* Chart 2: By age group */}
      {data && (
        <ScrollReveal>
          <section className="max-w-5xl mx-auto px-6 py-16">
            <h2 className="text-2xl font-bold text-wiah-black mb-2">Percentage reporting loneliness, by age group</h2>
            <p className="text-sm text-wiah-mid font-mono mb-6">Community Life Survey / ONS</p>
            
            <div className="space-y-3">
              {data.byAgeGroup.map((item) => (
                <div key={item.ageGroup} className="flex items-center gap-4">
                  <div className="w-24 text-sm font-mono text-wiah-black">{item.ageGroup}</div>
                  <div className="flex-1 flex items-center gap-3">
                    <div
                      className="h-6 bg-wiah-grey rounded"
                      style={{
                        width: `${(item.pctLonely / 30) * 100}%`,
                        backgroundColor: '#6B7280',
                      }}
                    />
                    <div className="w-12 text-right font-mono text-sm font-bold text-wiah-black">
                      {item.pctLonely}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </ScrollReveal>
      )}

      {/* Chart 3: By life circumstance */}
      {data && (
        <ScrollReveal>
          <section className="max-w-5xl mx-auto px-6 py-16">
            <h2 className="text-2xl font-bold text-wiah-black mb-2">Loneliness prevalence by life circumstance</h2>
            <p className="text-sm text-wiah-mid font-mono mb-6">Community Life Survey / ONS</p>
            
            <div className="space-y-3">
              {data.byLifeCircumstance.map((item) => (
                <div key={item.circumstance} className="flex items-center gap-4">
                  <div className="w-44 text-sm font-mono text-wiah-black">{item.circumstance}</div>
                  <div className="flex-1 flex items-center gap-3">
                    <div
                      className="h-6 bg-wiah-grey rounded"
                      style={{
                        width: `${(item.pctLonely / 40) * 100}%`,
                        backgroundColor: '#6B7280',
                      }}
                    />
                    <div className="w-12 text-right font-mono text-sm font-bold text-wiah-black">
                      {item.pctLonely}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </ScrollReveal>
      )}

      {/* Context section */}
      <section id="sec-context" className="max-w-2xl mx-auto px-6 py-16">
        <div className="text-base text-wiah-black leading-[1.7] space-y-4">
          <p>Around 3.8 million adults in England &mdash; roughly 9% &mdash; report feeling lonely often or always. Young adults aged 16&ndash;24 have the highest rates at around 27%, far above older age groups, confounding the assumption that loneliness is simply a condition of age. Chronic loneliness is associated with a 26% higher risk of premature death, comparable in effect to smoking 15 cigarettes a day, driving cognitive decline, cardiovascular disease, and depression through measurable physiological pathways; the estimated NHS cost runs to &pound;2.4 billion a year. The UK appointed the world&apos;s first Minister for Loneliness in 2018 and published a national strategy in 2021, and social prescribing is now available in most GP practices &mdash; but structural drivers are harder to address: single-person households account for 31% of all households, and trade union membership, religious attendance, and civic participation have all declined for decades.</p>
          <p>Loneliness is not evenly distributed. Rural isolation &mdash; driven by poor transport, closed pubs and post offices, and dispersed populations &mdash; differs structurally from urban alienation. Certain groups are consistently overrepresented: unpaid carers who have withdrawn from work and social life, new parents, bereaved people whose networks contract after loss, and disabled people for whom physical access and employment barriers compound social exclusion. Social prescribing works best for the mildly lonely with transport access to activities; it reaches the most chronically isolated &mdash; those facing poverty, disability, and remote geography &mdash; less well.</p>
        </div>
      </section>

      {/* Positive callout */}
      <ScrollReveal>
        <section className="max-w-5xl mx-auto px-6 py-12">
          <PositiveCallout
            title="What&apos;s improving"
            value="Social prescribing"
            unit="now available in most GP practices"
            description="Social prescribing &mdash; where GPs refer patients to community activities, befriending services, or support groups rather than medication &mdash; is now available in most GP practices in England. NHS England plans to have a link worker in every PCN. Early evidence shows reduced GP appointments, lower antidepressant prescribing, and improved wellbeing scores."
            source="Source: NHS England &mdash; Social Prescribing 2024."
          />
        </section>
      </ScrollReveal>

      {/* Section nav */}
      <SectionNav sections={[
        { id: 'sec-context', label: 'Context' },
      ]} />
    </main>
  );
}
