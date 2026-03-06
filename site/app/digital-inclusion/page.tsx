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

interface DigitalInclusionData {
  national: {
    householdAccess: {
      timeSeries: Array<{ year: number; accessPct: number }>;
      latestYear: number;
      latestPct: number;
    };
    broadbandSpeed: {
      timeSeries: Array<{ year: number; medianMbps: number }>;
      latestYear: number;
      latestMbps: number;
    };
    basicDigitalSkillsByAge: Array<{ ageGroup: string; lackingPct: number }>;
    adultsLackingSkillsMillions: number;
  };
  metadata: {
    sources: Array<{ name: string; dataset: string; url: string; frequency: string }>;
    methodology: string;
    knownIssues: string[];
  };
}

// ── Component ────────────────────────────────────────────────────────────────

export default function DigitalInclusionPage() {
  const [data, setData] = useState<DigitalInclusionData | null>(null);

  useEffect(() => {
    fetch('/data/digital-inclusion/digital_inclusion.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // Derive series for household access chart
  const accessSeries: Series[] = data
    ? [
        {
          id: 'internet-access',
          label: 'Households with internet access',
          colour: '#2A9D8F',
          data: data.national.householdAccess.timeSeries.map(d => ({
            date: new Date(d.year, 0, 1),
            value: d.accessPct,
          })),
        },
      ]
    : [];

  // Derive series for broadband speed chart
  const speedSeries: Series[] = data
    ? [
        {
          id: 'broadband-speed',
          label: 'Median broadband speed',
          colour: '#264653',
          data: data.national.broadbandSpeed.timeSeries.map(d => ({
            date: new Date(d.year, 0, 1),
            value: d.medianMbps,
          })),
        },
      ]
    : [];

  const speedAnnotations: Annotation[] = [
    {
      date: new Date(2020, 3, 1),
      label: '2020: COVID lockdown — demand surge',
    },
  ];

  return (
    <>
      <TopicNav topic="Digital Inclusion" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Digital Inclusion"
          question="Who Is Being Left Behind Online?"
          finding="Around 8 million UK adults lack basic digital skills. 1.5 million households have no internet access. Older adults, disabled people, and those in lower-income households are most affected. The UK ranks 10th in Europe on DESI (Digital Economy and Society Index). Being offline costs an estimated &pound;1,064 per year in higher prices."
          colour="#2A9D8F"
          preposition="with"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Around 8 million UK adults &mdash; 15% of the adult population &mdash; lack the five essential digital skills defined by the Lloyds/Good Things Foundation framework: communicating, handling information, transacting, problem-solving, and creating online. Exclusion is not uniformly distributed: 51% of adults aged 75 and over lack basic digital skills, compared with 3% of 16&ndash;24 year olds. Around 1.5 million households have no internet access at all. Disability is a stronger predictor than age: adults with a disability or long-term health condition are three times more likely to be offline than those without. Those in social housing, with no qualifications, and in the lowest income quintile are most affected.</p>
            <p>Being offline carries a measurable financial penalty. The Good Things Foundation estimates the &ldquo;digital poverty premium&rdquo; at &pound;1,064 a year &mdash; the extra cost of buying energy, banking, and shopping through non-online channels. Online-only tariffs for broadband, energy, and insurance are typically 10&ndash;30% cheaper. The infrastructure picture has improved sharply: median UK broadband speeds reached 114 Mbps in 2023, up from 27 Mbps in 2018, as full-fibre (FTTP) coverage expanded from 8% of premises in 2019 to 60% in 2024, driven by commercial rollout and the government&apos;s Project Gigabit subsidy scheme. But 155,000 rural premises remain without decent broadband of 10 Mbps, and mobile not-spots still cover 3% of UK landmass.</p>
            <p>The UK&apos;s Digital Strategy commits to ensuring everyone has the skills to benefit from digital technology by 2030, but the target lacks statutory force. The Good Things Foundation&apos;s National Databank &mdash; a collaboration with Vodafone, O2, and Three &mdash; provides free data SIMs to digitally excluded people; it has distributed over 2 million gigabytes of data to 400,000 recipients. NHS Digital&apos;s 2024 digitisation agenda requires patients to manage appointments, access records, and order prescriptions online, raising the stakes for the excluded. The UK ranked 10th in the EU&apos;s Digital Economy and Society Index (DESI) in 2023 &mdash; above France but behind Sweden, Finland, and Denmark &mdash; reflecting a broadband infrastructure lead offset by persistent basic digital skills deficits in older and lower-income groups.</p>
            <p>The economic consequences of digital exclusion extend well beyond the immediate inconvenience of being unable to access a service online. Research from the Resolution Foundation indicates that digitally excluded workers earn less, occupy more precarious roles, and face steeper barriers to retraining or career progression. Exclusion compounds: those without digital skills are also least likely to own suitable devices, afford reliable connectivity, or have someone nearby who can help&mdash;creating a self-reinforcing cycle that generic skills programmes rarely penetrate. Asylum seekers and refugees frequently lack both devices and mobile data, cutting them off from legal advice, language learning, and communication with caseworkers. Care home residents are increasingly expected to engage with digital health services, yet most facilities provide no internet access for residents. In rural areas, 5% of premises still lack what Ofcom defines as decent broadband, and the actual figure for usable connectivity in remote locations is likely higher. The NHS digital transformation illustrates the central paradox: the NHS App now has 35 million registered users, but the people who use health services most intensively&mdash;older adults, those with multiple long-term conditions, people with learning disabilities&mdash;are precisely those least likely to access care digitally. Among children, an estimated 1.9 million lack adequate home internet for schoolwork, embedding educational disadvantage from the earliest years.</p>
            <p>The widely cited figure of eight million digitally excluded adults derives from the Lloyds Consumer Digital Index and Good Things Foundation&apos;s Essential Digital Skills research, both based on survey methodologies that face an inherent challenge: respondents may underreport digital incapacity due to stigma, or overreport competence through misunderstanding what a skill entails. The &ldquo;five essential digital skills&rdquo; framework itself is defined by the commissioning bodies, and alternative frameworks&mdash;including those used by JISC and the Basic Digital Skills Trust&mdash;define competence differently, producing materially different estimates of exclusion. Measuring digital capability among older adults via telephone or online surveys creates obvious selection effects: the most excluded are least reachable by either method. The &ldquo;digital poverty premium&rdquo; of &pound;1,064 per year depends on pricing comparisons between online and offline channels that shift over time as markets change and some offline options disappear entirely, making the figure indicative rather than precise. Ofcom&apos;s Connected Nations Report tracks infrastructure coverage&mdash;whether a broadband connection is available&mdash;but not whether households actually use it or possess the skills and confidence to do so. There is no government longitudinal survey tracking digital inclusion specifically over time. Benefit claimants&apos; experiences of digital-by-default services are captured in DWP-commissioned research, but findings are published inconsistently and not in formats that permit systematic comparison across years.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-access', label: 'Internet Access' },
          { id: 'sec-speed', label: 'Broadband Speed' },
          { id: 'sec-skills', label: 'Digital Skills' },
        ]} />

        <ScrollReveal>
          <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Adults without basic digital skills"
              value="8M"
              direction="down"
              polarity="up-is-bad"
              changeText="2023 &middot; Down from 11.3M in 2020 &middot; Older adults, low income, disabled most affected &middot; 1.5M households offline"
              sparklineData={[14.3, 13.0, 12.6, 12.1, 11.3, 10.2, 9.1, 8.0]}
              onExpand={() => {}}
            />
            <MetricCard
              label="Median UK broadband speed (Mbps)"
              value="114"
              direction="up"
              polarity="up-is-good"
              changeText="2023 &middot; Up from 27 Mbps in 2018 &middot; Full fibre rollout accelerating &middot; Rural &lt;10 Mbps still common"
              sparklineData={[27, 35, 54, 77, 90, 114]}
              onExpand={() => {}}
            />
            <MetricCard
              label="Cost of being offline (annual)"
              value="&pound;1,064"
              direction="flat"
              polarity="up-is-bad"
              changeText="Per year &middot; Unable to access cheapest online tariffs &middot; Affects energy, banking, shopping &middot; Good Things Foundation estimate"
              sparklineData={[800, 850, 900, 950, 1000, 1064]}
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-access" className="mb-12">
            <LineChart
              title="Household internet access, 2012&ndash;2023"
              subtitle="Percentage of UK households with internet access"
              series={accessSeries}
              yLabel="% households with internet access"
              source={{
                name: 'ONS',
                dataset: 'Internet Access Survey',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-speed" className="mb-12">
            <LineChart
              title="Median broadband speed, 2018&ndash;2023"
              subtitle="Median download speed across UK fixed-line connections"
              series={speedSeries}
              yLabel="Median speed (Mbps)"
              annotations={speedAnnotations}
              source={{
                name: 'Ofcom',
                dataset: 'Connected Nations Report',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-skills" className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-2">Adults without basic digital skills by age group</h2>
            <p className="text-sm text-wiah-mid font-mono mb-6">Percentage of adults lacking basic digital skills, UK 2023.</p>
            {data && (
              <div className="space-y-3">
                {data.national.basicDigitalSkillsByAge.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-20 text-sm text-wiah-black flex-shrink-0">{item.ageGroup}</div>
                    <div className="flex-1 bg-wiah-border rounded h-5 overflow-hidden">
                      <div
                        className="h-full rounded"
                        style={{ width: `${(item.lackingPct / 55) * 100}%`, backgroundColor: '#2A9D8F' }}
                      />
                    </div>
                    <div className="w-12 text-right text-sm font-mono text-wiah-black">{item.lackingPct}%</div>
                  </div>
                ))}
              </div>
            )}
            <p className="font-mono text-xs text-wiah-mid mt-4">Source: Good Things Foundation &mdash; Essential Digital Skills Framework</p>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="What&apos;s improving"
            value="&ndash;30%"
            unit="fall in adults without basic digital skills since 2020"
            description="The number of UK adults without basic digital skills has fallen by 30% since 2020, from 11.3 million to 8 million. Median broadband speeds have more than quadrupled since 2018, reaching 114 Mbps. Full fibre (FTTP) coverage reached 60% of UK premises by 2024, up from 8% in 2019, driven by commercial rollout and Project Gigabit subsidy. The Good Things Foundation&apos;s National Databank provides free data SIMs to digitally excluded people &mdash; it has distributed over 2 million gigabytes to date. NHS App registrations have reached 34 million. The UKCIS (UK Council for Internet Safety) digital skills framework has been adopted by 85% of English local authorities."
            source="Source: Ofcom &mdash; Connected Nations 2023; Good Things Foundation &mdash; Digital Inclusion Insights 2023; ONS &mdash; Internet users UK 2023."
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
