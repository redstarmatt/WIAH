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
            <p>Between 8 and 10 million adults in the UK lack basic digital skills, according to the Lloyds Bank Digital Index; around 1.5 million households have no broadband or mobile internet access at all. Digital exclusion clusters around age — around half of people over 75 lack the skills to carry out basic online tasks — but disability, low income, low educational attainment, and rural location are all independent predictors. The practical cost of being offline has risen sharply as GP appointment booking, Universal Credit management, HMRC self-assessment, and banking have all migrated predominantly online: more than 6,000 bank branches have closed since 2015. Libraries serve as de facto digital access infrastructure for many excluded groups, but the library network has contracted significantly since 2010, with around 800 closed. The UK's digital inclusion strategy dates from 2014 and has not been substantively updated since; provision has been left largely to third-sector organisations.</p>
            <p>Digital exclusion is not primarily an elderly issue. Working-age adults with learning disabilities, cognitive impairments, or low literacy — an estimated 7.1 million in England — face barriers that are structural rather than generational. The NHS App illustrates the tension directly: for the digitally confident it offers improved access to records and services; for those without smartphones, reliable data, or the skills to navigate it, it risks becoming another point at which the health service becomes harder to reach. The same people already facing health inequality, poverty, and limited public service access are disproportionately the population for whom digital migration compounds disadvantage rather than reducing it.</p>
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
              href="#sec-internet-users"/>
            <MetricCard
              label="Households without home internet"
              value="6%"
              direction="up"
              polarity="up-is-bad"
              changeText="1.5M households; up from 5% post-COVID"
              sparklineData={[5, 5.2, 5.5, 5.8, 5.2, 5.5, 5.8, 6.0, 6]}
              href="#sec-basic-skills"/>
            <MetricCard
              label="Adults who have never used internet"
              value="3.9M"
              direction="flat"
              polarity="up-is-bad"
              changeText="6% of UK adults; 90%+ are over 65"
              sparklineData={[5.0, 5.2, 5.1, 5.0, 4.8, 4.5, 4.2, 4.0, 3.9]}
              href="#sec-non-users"/>
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
            <p className="font-mono text-xs text-wiah-mid mt-4">Source: Office for National Statistics — Internet Users Survey</p>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="Good Things Foundation reaches 1 million people"
            value="1M"
            unit="people"
            description="The Good Things Foundation, which runs the Digital Unite and Online Centres Network, has helped over 1 million people develop digital skills through community venues including libraries, housing associations and food banks. Its research consistently shows that supported digital skills training — not just access provision — is what gets excluded groups online."
            source="Source: Good Things Foundation"
          />
        </ScrollReveal>

        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            {data?.metadata.sources.map((src, i) => (
              <div key={i}>
                <a href={src.url} target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">
                  {src.name} — {src.dataset}
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
