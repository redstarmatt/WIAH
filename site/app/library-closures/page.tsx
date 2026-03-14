'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import PositiveCallout from '@/components/PositiveCallout';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

// Number of public libraries in England, 2010–2024
const libraryCountValues = [4290, 4265, 4190, 4145, 4087, 3972, 3875, 3800, 3725, 3660, 3583, 3550, 3520, 3500, 3490];

// Library spending per capita (£), England, 2010–2024
const spendingPerCapita = [19.20, 18.50, 17.40, 16.20, 14.80, 13.60, 12.90, 12.40, 12.10, 11.80, 10.50, 10.20, 10.00, 9.80, 9.60];

const series1: Series[] = [
  {
    id: 'library-count',
    label: 'Public libraries (England)',
    colour: '#6B7280',
    data: libraryCountValues.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
  },
];

const series2: Series[] = [
  {
    id: 'spending',
    label: 'Library spending per capita (£)',
    colour: '#E63946',
    data: spendingPerCapita.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
  },
];

const annotations: Annotation[] = [
  { date: new Date(2011, 0, 1), label: '2011: Austerity cuts begin' },
  { date: new Date(2020, 0, 1), label: '2020: COVID-19 closures' },
];

const editorialRefs: Reference[] = [
  { num: 1, name: 'CIPFA', dataset: 'Public library statistics', url: 'https://www.cipfa.org/services/comparative-profiles/public-libraries', date: '2024' },
  { num: 2, name: 'DCMS', dataset: 'Libraries as a statutory service — guidance', url: 'https://www.gov.uk/government/publications/guidance-on-libraries-as-a-statutory-service', date: '2024' },
  { num: 3, name: 'Libraries Connected', dataset: 'Annual survey of library services', url: 'https://www.librariesconnected.org.uk/', date: '2024' },
];

export default function LibraryClosuresPage() {
  return (
    <>
      <TopicNav topic="Library Closures" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Library Closures"
          question="What's Happening to Britain's Libraries?"
          finding="England has lost approximately 800 public libraries since 2010 — from around 4,290 to roughly 3,490. The remaining libraries have seen staffing cut by a third, opening hours reduced, and book budgets halved. Libraries are the last free, warm, universally accessible public space in many communities."
          colour="#6B7280"
          preposition="with"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Public libraries are a statutory service in England — local authorities have a legal duty to provide a &quot;comprehensive and efficient&quot; library service under the Public Libraries and Museums Act 1964.<Cite nums={2} /> Yet since 2010, approximately 800 libraries have closed permanently, and the network has shrunk by nearly 19%.<Cite nums={1} /> CIPFA data shows that total library spending in England fell from £1.04 billion in 2010 to £580 million in 2024, a real-terms cut of over 50%.<Cite nums={1} /> Staffing has followed: the number of paid library staff fell from approximately 25,000 full-time equivalents in 2010 to around 17,000 in 2024. Many of the libraries that remain open are now volunteer-run, with reduced hours and limited services.<Cite nums={3} /></p>
            <p>The closures are not evenly distributed. Deprived areas have been disproportionately affected — councils with the deepest cuts to central government funding have closed the most libraries.<Cite nums={1} /> In the most affected authorities, library spending per capita has fallen below £5 per person per year, compared with a national average of £9.60. For many communities, the library was the last remaining public building offering free internet access, warm space in winter, children&apos;s activities, and access to information and support services. The loss is not just cultural — it is infrastructural. DCMS has intervened in only a handful of cases despite its supervisory role, and no council has been found in breach of its statutory duty, regardless of the scale of closures.<Cite nums={2} /></p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Library numbers' },
          { id: 'sec-chart2', label: 'Spending trend' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Libraries closed since 2010"
              value="~800"
              unit="England"
              direction="up"
              polarity="up-is-bad"
              changeText="from ~4,290 to ~3,490 · a 19% reduction"
              sparklineData={libraryCountValues.slice(-8)}
              source="CIPFA — Public library statistics 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Library staff lost"
              value="~8,000"
              unit="FTEs since 2010"
              direction="up"
              polarity="up-is-bad"
              changeText="from ~25,000 to ~17,000 paid FTEs"
              sparklineData={[25, 24, 23, 22, 21, 20, 19, 18.5, 18, 17]}
              source="CIPFA — Public library statistics 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Annual physical visits"
              value="214m"
              unit="2023/24"
              direction="down"
              polarity="down-is-bad"
              changeText="down from 315m in 2010 · −32%"
              sparklineData={[315, 305, 290, 275, 260, 248, 235, 225, 140, 180, 205, 210, 214]}
              source="CIPFA — Public library statistics 2024"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Number of public libraries, England, 2010–2024"
              subtitle="Statutory service points operated or funded by local authorities. Excludes community-managed libraries without council funding."
              series={series1}
              annotations={annotations}
              yLabel="Libraries"
              source={{ name: 'CIPFA', dataset: 'Public library statistics', url: 'https://www.cipfa.org/services/comparative-profiles/public-libraries', frequency: 'annual', date: 'Dec 2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Library spending per capita, England, 2010–2024"
              subtitle="Total library service expenditure divided by population. Real-terms spending has halved since 2010."
              series={series2}
              annotations={annotations}
              yLabel="Spending per capita (£)"
              source={{ name: 'CIPFA', dataset: 'Public library statistics — expenditure data', url: 'https://www.cipfa.org/services/comparative-profiles/public-libraries', frequency: 'annual', date: 'Dec 2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Digital lending is growing — but it is not a replacement"
            value="35m"
            unit="e-book and e-audiobook loans in 2023"
            description="Digital lending through platforms like Libby and BorrowBox has grown significantly, reaching 35 million loans in 2023 — up from 12 million in 2019. This growth accelerated during COVID-19 lockdowns and has been sustained. However, digital lending requires a device, internet access, and digital literacy — precisely the resources that library closures remove from communities. For the 7% of UK households without home internet access, and for elderly residents who rely on physical library visits, digital is a complement, not a substitute."
            source="Source: Libraries Connected — Digital lending statistics 2024."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.cipfa.org/services/comparative-profiles/public-libraries" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">CIPFA — Public library statistics</a> — the primary statistical source for UK public library services, covering service points, expenditure, staffing, visits, and lending.</p>
            <p><a href="https://www.gov.uk/government/publications/guidance-on-libraries-as-a-statutory-service" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DCMS — Libraries as a statutory service</a> — government guidance on local authority duties under the Public Libraries and Museums Act 1964.</p>
            <p><a href="https://www.librariesconnected.org.uk/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Libraries Connected</a> — sector body providing annual survey data on library usage, digital lending, and community impact.</p>
            <p>All figures are for England unless otherwise stated. Library counts include all statutory service points; some councils have transferred libraries to community groups or trusts, which may be counted differently across years.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
