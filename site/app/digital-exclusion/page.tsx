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
            <p>Ninety-four percent of UK adults used the internet in the three months to 2023, according to the ONS &mdash; a figure that sounds like near-universal coverage until you examine who remains offline. The 3.9 million non-users are not evenly distributed: 28% of adults aged 75 and over have never used the internet, alongside 22% of those with no formal qualifications and 16% of disabled people. Even among those who are technically online, 7.5 million adults &mdash; 11% of the population &mdash; lack at least one of the five basic digital skills defined by the Lloyds Bank Consumer Digital Index: communicating, finding information, completing transactions, solving problems, and creating content. The consequences are material, not abstract: people without digital skills consistently pay higher prices, access fewer services, and report greater social isolation.</p>
            <p>The problem is compounding as the services people depend on move online-first. Universal Credit has no paper-based route. GP appointment booking systems are increasingly digital by default. High street banks have closed more than 5,000 branches since 2015, with closures concentrated in the areas with the highest rates of non-use. Ofcom estimates 1.5 million households have no home internet connection &mdash; not because they lack the skills, but because they cannot afford it. BT&apos;s copper network switch-off, due to complete between 2025 and 2027, risks disrupting the analogue landlines that many elderly people rely on as their sole communication link, without adequate notice or assistance to migrate.</p>
            <p>Solutions exist but are poorly publicised. BT&apos;s Social Tariff offers broadband for &pound;15 a month to households on qualifying benefits; Sky Broadband Basics is similarly available at low cost. Ofcom estimates fewer than one in ten eligible households actually takes up these offers, largely because providers are not required to promote them proactively. The Good Things Foundation&apos;s Online Centres Network has helped over a million people develop digital skills through community venues, demonstrating that supported skills training &mdash; not just infrastructure provision &mdash; is what reaches the most excluded. The deeper structural question &mdash; whether online-only public services should be permissible before universal affordable access is guaranteed &mdash; remains politically unresolved.</p>
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
