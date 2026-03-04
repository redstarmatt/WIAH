'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';

// ── Types ────────────────────────────────────────────────────────────────────

interface DigitalExclusionData {
  internetUsers: Array<{ year: number; pctUsers: number }>;
  nonUsersProfile: Array<{ group: string; pctNonUser: number }>;
  basicSkills: Array<{ year: number; pctHaveSkills: number }>;
  metadata: {
    sources: Array<{ name: string; dataset: string; url: string; frequency: string }>;
    methodology: string;
    knownIssues: string[];
  };
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

// ── Component ────────────────────────────────────────────────────────────────

export default function DigitalExclusionPage() {
  const [data, setData] = useState<DigitalExclusionData | null>(null);

  useEffect(() => {
    fetch('/data/digital-exclusion/digital_exclusion.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const internetUsersSeries: Series[] = data
    ? [{
        id: 'internet-users',
        label: 'Internet users (%)',
        colour: '#6B7280',
        data: data.internetUsers.map(d => ({
          date: yearToDate(d.year),
          value: d.pctUsers,
        })),
      }]
    : [];

  const basicSkillsSeries: Series[] = data
    ? [{
        id: 'basic-skills',
        label: 'Adults with basic digital skills (%)',
        colour: '#2A9D8F',
        data: data.basicSkills.map(d => ({
          date: yearToDate(d.year),
          value: d.pctHaveSkills,
        })),
      }]
    : [];

  return (
    <>
      <TopicNav topic="Digital Exclusion" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Digital Exclusion"
          question="Who is being left behind online?"
          finding="7.5 million adults in the UK lack basic digital skills, and as public services, banking, and healthcare move online, digital exclusion is becoming a fundamental barrier to participation in modern life."
          colour="#6B7280"
          preposition="in"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Between 8 and 10 million adults in the UK lack basic digital skills, according to the Lloyds Bank Digital Index. Around 1.5 million households have no broadband or mobile internet access at all, and an estimated 6 million people have never used the internet. Digital exclusion clusters around age &mdash; around half of people over 75 lack the foundational skills to carry out basic online tasks &mdash; but it is not solely an elderly problem: disability, low income, low educational attainment, and rural location are all independent predictors. The pandemic materially worsened the situation. The accelerated migration of services, social life, and commerce online during 2020&ndash;2022 increased the practical cost of being offline without a corresponding expansion of support for those who could not make the transition.</p>
            <p>Digital exclusion is not an inconvenience &mdash; it compounds existing disadvantage across health, welfare, and finance simultaneously. GP appointment booking is now predominantly online or via apps in most practices. Universal Credit requires digital access to manage claims and communicate with the DWP. HMRC&apos;s shift to online self-assessment has made paper filing increasingly impractical. High street banking has contracted sharply: more than 6,000 bank branches have closed since 2015, pushing account management and financial services online for people who were previously served in person. Each of these shifts is rational from a cost and efficiency perspective for the institution making it. Collectively, they create a system that is inaccessible to a significant minority of the population &mdash; and that minority is disproportionately the same people already facing health inequality, poverty, and limited public service access.</p>
            <p>Age dominates public discussion of digital exclusion, and the numbers are real: 2.8 million people over 65 in the UK have never used the internet. But framing this primarily as an elderly issue obscures a second population of digitally excluded working-age adults who face structural rather than generational barriers. People with learning disabilities, cognitive impairments, or serious mental health conditions face barriers to digital engagement that are not resolved by time or familiarity. Adults with low literacy &mdash; an estimated 7.1 million in England &mdash; find most digital interfaces inaccessible regardless of connectivity. The NHS App&apos;s rollout illustrates the tension directly: for the digitally confident it offers a significant improvement in access to records and services; for those without smartphones, reliable data, or the skills to navigate it, it risks becoming another point at which the health service becomes harder to reach.</p>
            <p>The UK Government published a digital inclusion strategy in 2014, and it has not been substantively updated since. In the decade that followed, the institutional landscape has been left largely to third sector organisations and individual employer initiatives. The Good Things Foundation runs a network of community digital access points and publishes the most widely cited exclusion research. BT, Lloyds, and several local authorities have run targeted skills programmes. Libraries serve as de facto digital access infrastructure for many excluded groups &mdash; providing devices, broadband, and often informal assistance &mdash; but the library network has contracted significantly since 2010, with around 800 libraries closed. Assisted digital support is theoretically available for people who cannot complete DWP and HMRC transactions online, but it is poorly signposted, inconsistently staffed, and not widely used by the people it is designed to serve.</p>
            <p>&ldquo;Digital exclusion&rdquo; is not a standardised defined category, and the headline figures from different surveys diverge meaningfully. The Lloyds Digital Index, ONS Internet Access survey, and Ofcom connectivity data use different methodologies, different skill definitions, and different populations, producing estimates of excluded adults that range from 6 million to over 10 million depending on which definition is applied. The deepest structural problem is that the most excluded people are the hardest to capture in survey data: people without internet access are unlikely to complete online surveys, people not engaged with services are unlikely to appear in administrative data, and those living in chaotic circumstances &mdash; the homeless, those in crisis &mdash; are routinely undercounted. The intersections between exclusion factors &mdash; being simultaneously elderly, disabled, and income-poor, for example &mdash; are not well captured in available data, making it hard to size the population that faces multiple compounding barriers at once.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-internet-users', label: 'Internet Users' },
          { id: 'sec-basic-skills', label: 'Digital Skills' },
          { id: 'sec-non-users', label: 'Non-Users Profile' },
        ]} />

        <ScrollReveal>
          <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Adults lacking basic digital skills"
              value="7.5M"
              direction="up"
              polarity="up-is-bad"
              changeText="11% of UK adults; disproportionately elderly"
              sparklineData={[7.0, 7.2, 7.5, 7.3, 7.1, 7.0, 6.9, 6.7, 6.5]}
              onExpand={() => {}}
            />
            <MetricCard
              label="Households without home internet"
              value="6%"
              direction="up"
              polarity="up-is-bad"
              changeText="1.5M households; up from 5% post-COVID"
              sparklineData={[5, 5.2, 5.5, 5.8, 5.2, 5.5, 5.8, 6.0, 6]}
              onExpand={() => {}}
            />
            <MetricCard
              label="Adults who have never used internet"
              value="3.9M"
              direction="flat"
              polarity="up-is-bad"
              changeText="6% of UK adults; 90%+ are over 65"
              sparklineData={[5.0, 5.2, 5.1, 5.0, 4.8, 4.5, 4.2, 4.0, 3.9]}
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-internet-users" className="mb-12">
            <LineChart
              title="UK adults who have used the internet in the last 3 months"
              subtitle="Percentage. ONS Internet Users survey. The gap between 94% and 100% represents 3.9M non-users."
              series={internetUsersSeries}
              yLabel="Percentage of adults (%)"
              source={{
                name: 'Office for National Statistics',
                dataset: 'Internet Users Survey',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-basic-skills" className="mb-12">
            <LineChart
              title="Adults with basic digital skills, UK"
              subtitle="Percentage. Lloyds Bank UK Consumer Digital Index. Skills include communicating, finding information, managing transactions, and problem-solving online."
              series={basicSkillsSeries}
              yLabel="Percentage of adults (%)"
              source={{
                name: 'Lloyds Bank',
                dataset: 'UK Consumer Digital Index',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-non-users" className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-2">Adults who have never used the internet, by group</h2>
            <p className="text-sm text-wiah-mid font-mono mb-6">Percentage of each demographic group that have never used the internet.</p>
            {data && (
              <div className="space-y-3">
                {data.nonUsersProfile.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-48 text-sm text-wiah-black flex-shrink-0">{item.group}</div>
                    <div className="flex-1 bg-wiah-border rounded h-5 overflow-hidden">
                      <div
                        className="h-full rounded"
                        style={{ width: `${(item.pctNonUser / 30) * 100}%`, backgroundColor: '#6B7280' }}
                      />
                    </div>
                    <div className="w-12 text-right text-sm font-mono text-wiah-black">{item.pctNonUser}%</div>
                  </div>
                ))}
              </div>
            )}
            <p className="font-mono text-xs text-wiah-mid mt-4">Source: Office for National Statistics &mdash; Internet Users Survey</p>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="Good Things Foundation reaches 1 million people"
            value="1M"
            unit="people"
            description="The Good Things Foundation, which runs the Digital Unite and Online Centres Network, has helped over 1 million people develop digital skills through community venues including libraries, housing associations and food banks. Its research consistently shows that supported digital skills training &mdash; not just access provision &mdash; is what gets excluded groups online."
            source="Source: Good Things Foundation"
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
