'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

export default function PostOfficesPage() {
  // Post Office branch count 2000–2024
  const branchRaw = [19800, 18800, 17500, 16200, 15500, 14700, 13900, 12900, 12300, 12100, 11900, 11800, 11700, 11600, 11550, 11500, 11450, 11420, 11380, 11350, 11340, 11320, 11300, 11280, 11500];
  // Closures by area type: rural branches as % lost since 2000, 2010–2024
  const ruralClosureRaw = [0, 5, 9, 13, 17, 21, 25, 29, 33, 37, 40, 42, 44, 46, 48];

  const branchSeries: Series[] = [
    {
      id: 'branches',
      label: 'Post Office branch count',
      colour: '#6B7280',
      data: branchRaw.map((v, i) => ({ date: new Date(2000 + i, 0, 1), value: v })),
    },
  ];

  const ruralSeries: Series[] = [
    {
      id: 'rural',
      label: 'Rural branches lost since 2000 (%)',
      colour: '#6B7280',
      data: ruralClosureRaw.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
    },
  ];

  const branchAnnotations: Annotation[] = [
    { date: new Date(2007, 0, 1), label: '2007–08: Network Change Programme — 2,500 closures' },
    { date: new Date(2019, 0, 1), label: '2019: Horizon scandal becomes public' },
    { date: new Date(2024, 0, 1), label: '2024: Horizon convictions quashed' },
  ];

  return (
    <>
      <TopicNav topic="Post Offices" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Post Offices"
          question="Is the Post Office Network Collapsing?"
          finding="The Post Office network has shrunk from 20,000 to 11,500 branches since 1990 — rural and deprived areas lose branches fastest, and the Horizon scandal has left the organisation in crisis."
          colour="#6B7280"
          preposition="in"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The UK Post Office network stood at around 19,800 branches in 2000 — the culmination of over 350 years as one of the most extensive retail networks in the country. By 2024, that number had fallen to approximately 11,500, a reduction of 42%. The steepest decline came between 2007 and 2008, when the Labour government's Network Change Programme closed around 2,500 branches in a single consolidation round.</p>
            <p>Rural branches have been disproportionately affected, with 48% of rural post offices lost since 2000. For many villages, the post office was the last public facility — combining banking, benefits payments, and parcel services in a single location. Its loss compounds existing access problems in communities already cut off by bus cuts and bank branch closures.</p>
            <p>The Horizon IT scandal — in which over 900 sub-postmasters were wrongly prosecuted between 1999 and 2015 due to a faulty Fujitsu accounting system — devastated the institution and made recruitment of new sub-postmasters significantly harder. By 2024, fewer than 1,000 of the 700+ wrongly convicted had received full compensation.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-branches', label: 'Branch Count' },
          { id: 'sec-rural', label: 'Rural Closures' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Post Office branches (count)"
              value="11,500"
              direction="down"
              polarity="down-is-bad"
              changeText="down from ~20,000 in 1990 · 42% loss since 2000"
              sparklineData={[19800, 18800, 16200, 14700, 12900, 12300, 11800, 11600, 11500, 11450, 11420, 11380, 11350, 11300, 11500]}
              source="Post Office Ltd — Annual Data 2024"
            />
            <MetricCard
              label="Rural branches lost since 2000 (%)"
              value="48"
              direction="up"
              polarity="up-is-bad"
              changeText="rural areas disproportionately affected · compound effect with bus cuts"
              sparklineData={[0, 5, 9, 13, 17, 21, 25, 29, 33, 37, 40, 42, 44, 46, 48]}
              source="Post Office Ltd / CPRE — 2024"
            />
            <MetricCard
              label="Horizon victims compensated (count)"
              value="<1,000"
              direction="up"
              polarity="up-is-good"
              changeText="out of 700+ wrongly convicted · compensation scheme ongoing"
              sparklineData={[0, 50, 100, 200, 350, 500, 650, 800, 950]}
              source="Post Office Horizon Compensation — 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-branches" className="mb-12">
            <LineChart
              title="Post Office branch count, UK, 2000–2024"
              subtitle="Total number of post office branches across the UK. Post Office Ltd annual data."
              series={branchSeries}
              annotations={branchAnnotations}
              yLabel="Branches"
              source={{
                name: 'Post Office Ltd',
                dataset: 'Annual Network Report',
                frequency: 'annual',
                url: 'https://corporate.postoffice.co.uk/our-media/insights-and-research/',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-rural" className="mb-12">
            <LineChart
              title="Rural Post Office branch closures since 2000, 2010–2024"
              subtitle="Cumulative percentage of rural post office branches lost since 2000. Rural areas lose branches faster than urban centres."
              series={ruralSeries}
              yLabel="% rural branches lost since 2000"
              source={{
                name: 'Post Office Ltd / CPRE',
                dataset: 'Rural access analysis',
                frequency: 'annual',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p><a href="https://corporate.postoffice.co.uk/our-media/insights-and-research/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Post Office Ltd — Annual Network Report</a>. Branch count data. Retrieved 2024.</p>
            <p><a href="https://bettertransport.org.uk" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">CPRE — Rural Services Report</a>. Rural branch access analysis. Retrieved 2024.</p>
            <p>Branch count data includes main post offices, local post offices, and outreach services. Historical figures pre-2010 derived from Public Accounts Committee reports. Horizon compensation data from the Post Office Horizon Compensation Scheme quarterly reports.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
