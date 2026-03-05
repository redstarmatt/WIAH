'use client';

import { useState, useEffect } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';

interface GreenJobsData {
  national: {
    timeSeries: Array<{ date: string; lowCarbonJobsThousands: number }>;
  };
  metadata: {
    sources: Array<{ name: string; dataset: string; url: string; frequency: string }>;
    methodology: string;
    knownIssues: string[];
  };
}

function yearToDate(y: string): Date {
  return new Date(parseInt(y), 6, 1);
}

export default function GreenJobsPage() {
  const [data, setData] = useState<GreenJobsData | null>(null);

  useEffect(() => {
    fetch('/data/green-jobs/green_jobs.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const jobsSeries: Series[] = data
    ? [{
        id: 'green-jobs',
        label: 'Low-carbon economy employment',
        colour: '#2A9D8F',
        data: data.national.timeSeries.map(d => ({ date: yearToDate(d.date), value: d.lowCarbonJobsThousands })),
      }]
    : [];

  return (
    <>
      <TopicNav topic="Green Jobs" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Green Jobs"
          question="Is the Green Economy Actually Creating Jobs?"
          finding="The low-carbon economy employs 763,000 people in the UK &mdash; up from 430,000 in 2014 &mdash; and pays a wage premium of around 8% above comparable non-green roles. But green jobs are highly concentrated in the South East, with just 12% located in the most deprived communities, raising serious questions about who benefits from the transition."
          colour="#2A9D8F"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The UK&apos;s low-carbon economy has grown substantially over the past decade. DESNZ&apos;s Low Carbon and Renewable Energy Economy (LCREE) survey estimated 763,000 jobs in the sector in 2023 &mdash; up from around 430,000 in 2014, a 77% increase. The sector spans renewable energy generation (offshore and onshore wind, solar, hydro), energy efficiency products and installation, low-carbon heat (heat pumps, district heating), environmental consulting and monitoring, electric vehicle supply chains, carbon capture and storage, and sustainable finance. Green jobs on average pay around 8% more than comparable roles in other sectors, according to ONS ASHE analysis &mdash; partly reflecting the technical skills demanded and partly reflecting the capital intensity of the energy sector. The sector is growing faster than the overall economy: while total UK employment grew around 4% between 2019 and 2023, low-carbon employment grew by around 25% over the same period. The government&apos;s Green Jobs Taskforce (2021) set a target of 480,000 additional green jobs by 2030 &mdash; implying a total of over 1.2 million, requiring continued strong growth.</p>
            <p>Offshore wind is the green economy&apos;s most dramatic job-creating sector. The UK&apos;s offshore wind industry employed around 32,000 people directly in 2023 &mdash; up from just 6,000 in 2012 &mdash; and supports an estimated 100,000 jobs in the supply chain including manufacturing, installation, operations, and maintenance. The Offshore Wind Sector Deal (2019) committed to 60% UK content in offshore wind projects by 2030 and a target of 70,000 direct and indirect jobs. Major investments in port infrastructure &mdash; Teesworks in the Tees Valley, the Humber in East Yorkshire, and Nigg Energy Park in the Scottish Highlands &mdash; are creating manufacturing and assembly facilities for turbine components. Siemens Gamesa&apos;s blade manufacturing facility at Hull, Vestas&apos;s nacelle plant in Peterborough, and GE Vernova&apos;s presence in Stafford represent significant industrial investment. Scotland&apos;s offshore wind sector, centred on Montrose, Dundee, and Aberdeen, has emerged as a major employer in a region historically dependent on North Sea oil and gas &mdash; some of the same technical skills are transferable.</p>
            <p>The geographic distribution of green jobs is one of the defining challenges for the UK&apos;s just transition. DESNZ establishment data shows that green jobs are most concentrated in London, the South East, and Scotland &mdash; with London and the South East alone accounting for around 35% of total low-carbon employment. Analysis of green job locations against the Index of Multiple Deprivation shows that only around 12% of green jobs are located in the most deprived 20% of areas. This matters because the communities most likely to bear the costs of the low-carbon transition &mdash; through higher energy bills, stranded assets in fossil fuel industries, or physical climate impacts &mdash; are disproportionately in deprived northern and midland communities. The CCC&apos;s Sixth Carbon Budget analysis specifically identified geographic concentration of green jobs as a risk factor for political sustainability of net zero. Government place-based industrial policy &mdash; including Investment Zones, Freeports, and the UK Shared Prosperity Fund &mdash; has attempted to direct green investment to deprived areas, with Teesworks, Humber, and South Wales net zero clusters as the most prominent examples.</p>
            <p>Green job creation is not only about new roles: it also involves the transition of existing workers from high-carbon industries. The UK still employs around 160,000 people in the North Sea oil and gas sector, and around 45,000 in coal-related industries (including power generation, mining, and supply chains, although coal power generation has effectively ended). The Energy Skills Passport, developed by the Energy and Utility Skills Group, is designed to help oil and gas workers demonstrate equivalent competencies for offshore wind roles. Results have been mixed: while some transferable skills (subsea engineering, project management, health and safety) translate well, others (specific oil and gas processes, geological skills) do not. Workers in deprived ex-coal communities &mdash; notably in South Wales, the East Midlands, and Yorkshire &mdash; face particular barriers to green job access due to geographic isolation from green employers, lower educational attainment, and older age profiles.</p>
            <p>Green jobs statistics face significant measurement challenges. The most fundamental is definitional: what counts as a &ldquo;green job&rdquo; is contested. The LCREE survey uses a sectoral definition &mdash; all jobs at establishments primarily engaged in low-carbon activities &mdash; which counts administrative staff, HR, and finance roles alongside engineers and scientists. An activity-based definition would produce a lower number. The International Labour Organization and OECD have both noted that green job counts vary by an order of magnitude depending on methodology &mdash; estimates of UK green jobs range from 200,000 (narrow, direct green activity definition) to over 1 million (broad supply chain definition). The wage premium figure is an average that masks considerable variation: offshore wind engineers earn significantly above median; some green sector administrative roles earn below it. Regional distribution data relies on establishment-level geography, which may misallocate remote workers. The 2019 LCREE methodology revision creates a break in historical comparison, and figures before 2019 should be treated as indicative rather than precisely comparable to post-2019 data.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-jobs', label: 'Employment Growth' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Low-carbon economy jobs"
              value="763K"
              direction="up"
              polarity="up-is-good"
              changeText="Up from 430K in 2014 &mdash; target 1.2M+ by 2030"
              sparklineData={[430, 475, 520, 570, 610, 660, 720, 763]}
              source="DESNZ &mdash; Low Carbon and Renewable Energy Economy survey 2024"
              onExpand={() => {}}
            />
            <MetricCard
              label="Green jobs in deprived communities"
              value="12"
              unit="%"
              direction="flat"
              polarity="up-is-good"
              changeText="Only 12% in most deprived 20% of areas &mdash; concentrated in South East"
              sparklineData={[11, 11, 11, 12, 12, 12, 12, 12]}
              source="DESNZ LCREE &mdash; establishment analysis vs IMD deciles"
              onExpand={() => {}}
            />
            <MetricCard
              label="Green sector wage premium"
              value="+8"
              unit="%"
              direction="up"
              polarity="up-is-good"
              changeText="vs comparable non-green roles &mdash; offshore wind engineers earn more"
              sparklineData={[5, 5, 6, 6, 7, 7, 8, 8]}
              source="ONS ASHE &mdash; sectoral earnings analysis 2023"
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-jobs" className="mb-12">
            <LineChart
              title="Low-carbon economy employment, UK, 2014&ndash;2023"
              subtitle="Thousands of jobs in renewable energy, energy efficiency, low-carbon heat, and supply chains. DESNZ LCREE survey."
              series={jobsSeries}
              yLabel="Employment (thousands)"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="Offshore Wind: 32,000 Direct Jobs"
            value="5&times;"
            unit="increase in offshore wind employment since 2012"
            description="Offshore wind alone employs 32,000 people directly &mdash; up from 6,000 in 2012 &mdash; and investment in Teesworks, Humber, and Scottish ports is creating new industrial clusters in historically deprived areas. The UK Offshore Wind Sector Deal targets 70,000 jobs by 2030 with 60% UK content. Siemens Gamesa&apos;s blade plant in Hull, Vestas in Peterborough, and GE Vernova in Stafford represent the largest new manufacturing investments in their regions in a generation."
            source="Source: OWIC &mdash; Offshore Wind Sector Deal progress report 2024; DESNZ LCREE survey."
          />
        </ScrollReveal>

        <ScrollReveal>
          <section className="mt-8 pt-12 border-t border-wiah-border">
            <h2 className="font-sans text-2xl font-bold text-wiah-black mb-6">Sources &amp; Methodology</h2>
            {data && (
              <div className="font-sans text-sm space-y-6">
                <div>
                  <h3 className="font-bold text-wiah-black mb-2">Data sources</h3>
                  <ul className="space-y-2">
                    {data.metadata.sources.map((src, idx) => (
                      <li key={idx} className="text-wiah-mid">
                        <strong className="text-wiah-black">{src.name}:</strong>&nbsp;
                        <a href={src.url} target="_blank" rel="noopener noreferrer" className="underline text-wiah-blue">
                          {src.dataset}
                        </a>
                        &nbsp;({src.frequency})
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-wiah-black mb-2">Methodology</h3>
                  <p className="text-wiah-mid">{data.metadata.methodology}</p>
                </div>
                <div>
                  <h3 className="font-bold text-wiah-black mb-2">Known issues</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {data.metadata.knownIssues.map((issue, idx) => (
                      <li key={idx} className="text-wiah-mid">{issue}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </section>
        </ScrollReveal>
      </main>
    </>
  );
}
