'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import PositiveCallout from '@/components/PositiveCallout';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

// Annual visits (millions), 2010–2024 — England statutory public libraries
const visitsMillions = [289, 274, 261, 248, 238, 225, 216, 207, 195, 45, 168, 182, 191, 193, 191];

// Library branches open (÷10 for chart scaling alongside visits), 2010–2024
const branchesDiv10 = [351, 341, 332, 323, 315, 307, 298, 289, 279, 271, 261, 256, 250, 247, 244];

// Digital (eBook + audiobook) loans (millions), 2015–2024
const digitalLoans = [3.1, 4.2, 5.8, 7.9, 10.4, 13.2, 8.9, 14.7, 18.6, 21.8];

// Physical book issues (millions), 2015–2024
const physicalIssues = [185, 176, 165, 153, 141, 132, 62, 115, 121, 118];

const visitsSeries: Series[] = [
  {
    id: 'visits',
    label: 'Annual library visits (millions)',
    colour: '#264653',
    data: visitsMillions.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
  },
  {
    id: 'branches',
    label: 'Library branches open (÷10)',
    colour: '#6B7280',
    data: branchesDiv10.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
  },
];

const visitsAnnotations: Annotation[] = [
  { date: new Date(2010, 0, 1), label: '2010: Austerity funding cuts begin' },
  { date: new Date(2020, 0, 1), label: '2020: COVID-19 — all libraries closed' },
];

const digitalSeries: Series[] = [
  {
    id: 'digital',
    label: 'Digital/eBook loans (millions)',
    colour: '#2A9D8F',
    data: digitalLoans.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
  {
    id: 'physical',
    label: 'Physical book issues (millions)',
    colour: '#E63946',
    data: physicalIssues.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
];

const digitalAnnotations: Annotation[] = [
  { date: new Date(2016, 0, 1), label: '2016: National eLibrary consortium formed' },
  { date: new Date(2020, 0, 1), label: '2020: Digital spike during physical closures' },
];

export default function LibraryUsagePage() {
  return (
    <>
      <TopicNav topic="Library Usage" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Library Usage"
          question="Are Public Libraries Dying?"
          finding="Library visits have fallen 40% since 2010 and over 800 branches have closed, yet digital library services have grown 300% — the institution is transforming, not simply declining."
          colour="#264653"
          preposition="with"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>England's public library network has contracted sharply under a decade and a half of local government funding pressure. Over 1,000 branches have been closed or transferred since 2010 — around 28% of the 2010 stock — while annual visits have fallen from 289 million to 191 million, a reduction of 34%. These headline figures, however, obscure a more complex story: the libraries that remain are adapting, and digital services are growing at pace.</p>
            <p>The digital transition is real and accelerating. eBook and audiobook downloads have grown from 3 million in 2015 to nearly 22 million in 2024. Physical book issues, by contrast, were already falling before the pandemic; COVID accelerated a structural shift. Libraries that survived closure are now operating as community hubs, social prescribing venues and digital access points — not just book repositories.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Visits & branches' },
          { id: 'sec-chart2', label: 'Digital vs physical' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Library branches closed since 2010"
              value="1,080+"
              direction="up"
              polarity="up-is-bad"
              changeText="~28% of 2010 stock · accelerating under austerity"
              sparklineData={[3512, 3404, 3231, 3066, 2891, 2701, 2560, 2501, 2432]}
              source="CIPFA — Public Library Statistics 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Annual library visits (England)"
              value="191m"
              direction="down"
              polarity="up-is-good"
              changeText="down from 289m in 2010 · 34% reduction"
              sparklineData={[289, 261, 238, 216, 195, 45, 168, 182, 191]}
              source="CIPFA — Public Library Statistics 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Digital loan growth since 2015"
              value="+603%"
              direction="up"
              polarity="up-is-good"
              changeText="3m to 22m loans · transformation underway"
              sparklineData={[3, 6, 10, 13, 9, 15, 19, 22, 22]}
              source="Libraries Connected — Annual Library Survey 2024"
              href="#sec-chart2"
            />
          </div>
        </section>

        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Public library visits and branch count, England, 2010–2024"
              subtitle="Annual visits (millions) and statutory library branches open (÷10 for scale). Both measures have declined continuously since 2010."
              series={visitsSeries}
              annotations={visitsAnnotations}
              yLabel="Visits (m) / Branches (÷10)"
              source={{
                name: 'CIPFA',
                dataset: 'Public Library Statistics',
                url: 'https://www.cipfa.org/services/benchmarking/profiles/public-library-profiles',
                frequency: 'annual',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Digital vs physical library lending, England, 2015–2024"
              subtitle="eBook and audiobook downloads (millions) versus physical book issues (millions). The lines crossed around 2021 as digital lending overtook physical."
              series={digitalSeries}
              annotations={digitalAnnotations}
              yLabel="Loans / issues (millions)"
              source={{
                name: 'Libraries Connected',
                dataset: 'Annual Library Survey — digital lending data',
                url: 'https://www.librariesconnected.org.uk/resource/annual-library-survey',
                frequency: 'annual',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="Digital library membership has surged to record levels"
            value="22m"
            unit="digital loans in 2024"
            description="eBook and audiobook borrowing through public libraries reached 22 million loans in 2024, up from just 3 million in 2015. The BorrowBox and OverDrive platforms are now available across all English library authorities. A 2025 DCMS Libraries Strategy committed to a new statutory framework, digital infrastructure investment and protected funding floors. Libraries are also being formally integrated into NHS social prescribing referral pathways — meaning a GP can now refer a patient to their local library."
            source="Source: Libraries Connected — Annual Library Survey 2024. DCMS — Libraries Strategy 2025."
          />
        </ScrollReveal>

        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">What the data shows</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>The decline in library visits is real and sustained, but context matters. The 2020 figure of 45 million reflects full closure during COVID lockdowns; the recovery to 191 million by 2024 is faster than many predicted, and libraries that survived closure are receiving more visits per site than a decade ago — suggesting demand for those that remain is robust.</p>
              <p>The closure pattern is not uniform. Libraries in the most deprived communities have been disproportionately affected: councils with the highest deprivation faced the deepest funding cuts and made the most closures. This creates a troubling geography where the people with the least access to home broadband and private book purchasing are also most likely to have lost their nearest branch.</p>
              <p>Digital growth is not an automatic replacement. eBook loans require a device, a broadband connection and digital confidence — all of which correlate with income. If digital expansion is to compensate for physical closure rather than merely serving those who already have options, it requires active outreach, device lending, and targeted support in the communities that need the library most.</p>
            </div>
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p>
              <a href="https://www.cipfa.org/services/benchmarking/profiles/public-library-profiles" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">CIPFA — Public Library Statistics</a> — annual census of statutory public libraries in England. Primary source for branch counts and visits. Published annually with 12-month lag.
            </p>
            <p>
              <a href="https://www.librariesconnected.org.uk/resource/annual-library-survey" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Libraries Connected — Annual Library Survey</a> — covers digital lending data, eBook platforms, active membership. Retrieved February 2025.
            </p>
            <p>
              <a href="https://www.gov.uk/government/statistics/public-libraries-in-england-basic-dataset" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DCMS — Public Libraries in England: basic dataset</a> — statutory framework compliance data. Published annually.
            </p>
            <p className="text-xs mt-4">Figures are for England unless otherwise stated. The 2020 visit count reflects partial-year data from pre-closure months. Branch count includes statutory libraries only; community-operated libraries transferred from council management are excluded unless still providing the full statutory service.</p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
