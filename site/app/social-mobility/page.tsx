'use client'

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';

// ── Types ────────────────────────────────────────────────────────────────────

interface SocialMobilityData {
  professionalUptake: Array<{ year: number; pctWorkingClass: number }>;
  higherEducation: Array<{ year: number; fsmPct: number }>;
  byProfession: Array<{ profession: string; pctWorkingClass: number }>;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

// ── Component ────────────────────────────────────────────────────────────────

export default function SocialMobilityPage() {
  const [data, setData] = useState<SocialMobilityData | null>(null);

  useEffect(() => {
    fetch('/data/social-mobility/social_mobility.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const professionalUptakeSeries: Series[] = data
    ? [{
        id: 'professional',
        label: 'Working-class representation in professional roles',
        colour: '#264653',
        data: data.professionalUptake.map(d => ({
          date: yearToDate(d.year),
          value: d.pctWorkingClass,
        })),
      }]
    : [];

  const higherEdSeries: Series[] = data
    ? [{
        id: 'fsm',
        label: 'FSM pupils in higher education',
        colour: '#264653',
        data: data.higherEducation.map(d => ({
          date: yearToDate(d.year),
          value: d.fsmPct,
        })),
      }]
    : [];

  return (
    <>
      <TopicNav topic="Social Mobility" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Social Mobility"
          question="Does where you grow up still determine where you end up?"
          finding="Intergenerational social mobility in Britain has stalled since the 1980s, and the class you are born into remains the strongest predictor of the class you will die in."
          colour="#264653"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Britain is one of the least socially mobile countries in the developed world. OECD analysis finds it takes on average five generations for a family from the bottom income decile to reach the national average &mdash; compared with two generations in Denmark or three in Germany. The class pay gap compounds this: people from working-class backgrounds earn on average &pound;6,800 less per year than colleagues from professional families doing the same job at the same level &mdash; a &ldquo;class ceiling&rdquo; driven not by qualification gaps but by accent, networks, and the social capital that elite education provides. In the most selective professions &mdash; law (26%), medicine (20%), journalism (28%) &mdash; people from working-class origins are represented at less than half their share of the wider population. FSM pupils progressing to higher education rose from 22% in 2014 to 29% in 2022, but the gap to non-FSM peers (50%) remains wide, and disadvantaged students are disproportionately concentrated in post-1992 institutions with weaker graduate earnings outcomes.</p>
            <p>Geography and identity compound the class disadvantage. The Social Mobility Commission identifies persistent &ldquo;cold spots&rdquo; &mdash; coastal towns, former mining communities, rural areas &mdash; where weak labour markets, poor transport, and under-resourced schools make upward mobility structurally harder regardless of individual effort. British Pakistani and Bangladeshi workers face a class pay gap 40% wider than the white British average; disabled graduates are 15 percentage points less likely to be in professional employment three years after university than non-disabled peers with identical qualifications; working-class women in professional roles earn on average &pound;12,000 less per year than upper-middle-class men in the same occupation. By age five, children from the poorest fifth of families are already 11 months behind their wealthiest peers in vocabulary development &mdash; a gap that current early years provision narrows only marginally.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-professional', label: 'Professional Roles' },
          { id: 'sec-higher-ed', label: 'Higher Education' },
          { id: 'sec-profession', label: 'By Profession' },
        ]} />

        <ScrollReveal>
          <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Professional jobs filled by working-class background"
              value="39%"
              direction="down"
              polarity="up-is-good"
              changeText="vs 60% of population from WC backgrounds"
              sparklineData={[43, 42, 41, 40, 40, 39, 39, 39, 39]}
              onExpand={() => {}}
            />
            <MetricCard
              label="FSM pupils reaching higher education"
              value="29%"
              direction="up"
              polarity="up-is-good"
              changeText="vs 50% for non-FSM peers"
              sparklineData={[22, 24, 25, 26, 27, 27, 28, 28, 29]}
              onExpand={() => {}}
            />
            <MetricCard
              label="Class pay gap (professional roles)"
              value="&pound;6,800"
              unit="/year"
              direction="up"
              polarity="up-is-bad"
              changeText="People from WC backgrounds earn &pound;6.8K less in same role"
              sparklineData={[4000, 4500, 5000, 5500, 6000, 6400, 6800]}
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-professional" className="mb-12">
            <LineChart
              title="Share of professional &amp; managerial jobs held by people from working-class backgrounds, UK"
              subtitle="Percentage. Social Mobility Commission data. Working-class: parents in routine/semi-routine occupations."
              series={professionalUptakeSeries}
              yLabel="Percentage (%)"
              source={{
                name: 'Social Mobility Commission',
                dataset: 'Social Mobility Barometer',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-higher-ed" className="mb-12">
            <LineChart
              title="Pupils eligible for free school meals progressing to higher education, England"
              subtitle="Percentage entering higher education by age 19. DfE / HESA data."
              series={higherEdSeries}
              yLabel="Percentage (%)"
              source={{
                name: 'Department for Education',
                dataset: 'HESA Higher Education Student Statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-profession" className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-2">People from working-class backgrounds, by profession (%)</h2>
            <p className="text-sm text-wiah-mid font-mono mb-6">Percentage of working-class-origin workers in each profession.</p>
            {data && (
              <div className="space-y-3">
                {data.byProfession.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-40 text-sm text-wiah-black flex-shrink-0">{item.profession}</div>
                    <div className="flex-1 bg-wiah-border rounded h-5 overflow-hidden">
                      <div
                        className="h-full rounded"
                        style={{ width: `${(item.pctWorkingClass / 45) * 100}%`, backgroundColor: '#264653' }}
                      />
                    </div>
                    <div className="w-16 text-right text-sm font-mono text-wiah-black">{item.pctWorkingClass}%</div>
                  </div>
                ))}
              </div>
            )}
            <p className="font-mono text-xs text-wiah-mid mt-4">Source: Social Mobility Commission &mdash; Socio-Economic Diversity in the Professions 2023</p>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="HE participation by disadvantaged students has risen"
            value="Doubled"
            unit="from 13% in 2006 to 28% in 2022"
            description="The proportion of students from the most disadvantaged backgrounds (POLAR4 quintile 1) entering higher education doubled from 13% in 2006 to 28% in 2022 &mdash; a real improvement. But participation gaps between the most and least advantaged students remain large, and disadvantaged students are more likely to study at lower-ranked institutions with weaker graduate outcomes."
            source="Source: HESA &mdash; Higher Education Student Statistics 2006–2022"
          />
        </ScrollReveal>
      </main>
    </>
  );
}
