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
const libraryCountValues = [4290, 4265, 4190, 4145, 4095, 4042, 3972, 3876, 3789, 3710, 3583, 3550, 3520, 3500, 3487];

// Library spending per capita (£), England, 2010–2024
const spendingPerCapValues = [18.20, 17.40, 16.30, 15.10, 14.00, 13.10, 12.40, 11.90, 11.30, 10.80, 10.10, 9.80, 9.50, 9.20, 8.90];

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
    id: 'spending-per-cap',
    label: 'Library spending per capita (£)',
    colour: '#E63946',
    data: spendingPerCapValues.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
  },
];

const annotations: Annotation[] = [
  { date: new Date(2011, 0, 1), label: '2011: Austerity cuts begin' },
  { date: new Date(2020, 0, 1), label: '2020: COVID-19 closures' },
];

const editorialRefs: Reference[] = [
  { num: 1, name: 'CIPFA', dataset: 'Public library statistics', url: 'https://www.cipfa.org/services/comparative-profiles/public-libraries', date: '2024' },
  { num: 2, name: 'DCMS', dataset: 'Libraries as a statutory service', url: 'https://www.gov.uk/government/publications/libraries-as-a-statutory-service', date: '2023' },
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
          finding="Around 800 public libraries have closed in England since 2010, from approximately 4,290 to 3,487. Those that remain have seen budgets cut by more than half. Libraries are often the last free, warm, staffed public space in a community — and they are disappearing."
          colour="#6B7280"
          preposition="with"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Public libraries are a statutory service — councils are legally required to provide a &ldquo;comprehensive and efficient&rdquo; library service under the Public Libraries and Museums Act 1964. Yet since 2010, approximately 800 libraries have closed across England, with hundreds more transferred to volunteer-run operation.<Cite nums={1} /> The closures have not been evenly distributed: deprived communities, rural areas, and coastal towns have been disproportionately affected. CIPFA data shows that total library spending in England fell from £1.01 billion in 2010 to £0.49 billion in 2024, a real-terms cut of more than 50%.<Cite nums={1} /> Staffing has followed the same trajectory, with around 8,000 paid library staff posts lost over the period.</p>
            <p>The impact extends far beyond book lending. Libraries provide free internet access in communities where 7% of households have no broadband connection. They host jobseeker support, children&rsquo;s reading groups, English language classes, and mental health drop-in sessions.<Cite nums={3} /> During the cost of living crisis, libraries became designated &ldquo;warm spaces&rdquo; — a role that underscored both their community importance and the grim circumstances driving demand. DCMS has intervened only once under the 1964 Act, when Wirral Council proposed closing 11 of its 24 libraries in 2009.<Cite nums={2} /> Since then, despite hundreds of closures, no further interventions have been made, raising questions about whether the statutory duty has any practical meaning.</p>
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
              changeText="from ~4,290 to ~3,487 · 19% reduction"
              sparklineData={libraryCountValues.slice(-8)}
              source="CIPFA — Public library statistics 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Paid library staff lost"
              value="8,000"
              unit="posts"
              direction="up"
              polarity="up-is-bad"
              changeText="many replaced by volunteers or not replaced at all"
              sparklineData={[23500, 22100, 20800, 19500, 18200, 17100, 16300, 15500]}
              source="CIPFA — Public library statistics 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Annual library visits (England)"
              value="214m"
              unit="2023/24"
              direction="down"
              polarity="down-is-bad"
              changeText="down from 288m in 2010 · -26% in 14 years"
              sparklineData={[288, 278, 267, 255, 245, 236, 228, 220, 215, 128, 165, 198, 210, 214]}
              source="CIPFA — Public library statistics 2024"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Number of public libraries, England, 2010–2024"
              subtitle="Statutory and council-run public library service points. Excludes volunteer-only libraries and mobile services."
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
              subtitle="Total library service expenditure divided by population. Real-terms spending has more than halved since 2010."
              series={series2}
              annotations={[{ date: new Date(2020, 0, 1), label: '2020: Temporary closures reduce spend further' }]}
              yLabel="Spending per capita (£)"
              source={{ name: 'CIPFA', dataset: 'Public library statistics — expenditure', url: 'https://www.cipfa.org/services/comparative-profiles/public-libraries', frequency: 'annual', date: 'Dec 2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Libraries as warm spaces: community resilience in action"
            value="2,500+"
            unit="libraries registered as warm spaces"
            description="During the 2022/23 cost of living crisis, over 2,500 libraries across the UK registered as 'warm spaces' — free, heated, welcoming places for people who could not afford to heat their homes during the day. Libraries offered hot drinks, companionship, and access to benefit advice alongside their usual services. While the underlying need was bleak, the response demonstrated that libraries remain among the most trusted and accessible public institutions in Britain."
            source="Source: Libraries Connected — Warm Spaces survey 2023."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.cipfa.org/services/comparative-profiles/public-libraries" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">CIPFA — Public library statistics</a> — primary source for library counts, staffing, expenditure, and visits. Annual survey of all library authorities in England.</p>
            <p><a href="https://www.gov.uk/government/publications/libraries-as-a-statutory-service" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DCMS — Libraries as a statutory service</a> — guidance on the 1964 Act duty and the Secretary of State&rsquo;s power of intervention.</p>
            <p>Figures are for England unless otherwise stated. Library counts include statutory service points operated by councils; some volunteer-run community libraries are excluded. COVID-19 closures in 2020 and 2021 affected visit counts and spending figures for those years.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
