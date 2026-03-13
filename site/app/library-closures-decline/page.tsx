'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

// ── Types ────────────────────────────────────────────────────────────────────

interface LibraryNumberPoint {
  year: number;
  count: number;
}

interface VisitPoint {
  year: number;
  millions: number;
}

interface SpendingPoint {
  year: number;
  pounds: number;
}

interface LibraryDeclineData {
  libraryNumbers: LibraryNumberPoint[];
  visits: VisitPoint[];
  spendingPerHead: SpendingPoint[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

function sparkFrom(arr: number[], n = 10) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function LibraryClosuresDeclinePage() {
  const [data, setData] = useState<LibraryDeclineData | null>(null);

  useEffect(() => {
    fetch('/data/library-closures-decline/library_closures_decline.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const libraryNumbersSeries: Series[] = data
    ? [{
        id: 'library-numbers',
        label: 'Public libraries',
        colour: '#E63946',
        data: data.libraryNumbers.map(d => ({
          date: yearToDate(d.year),
          value: d.count,
        })),
      }]
    : [];

  const visitsSeries: Series[] = data
    ? [{
        id: 'visits',
        label: 'Annual visits (millions)',
        colour: '#6B7280',
        data: data.visits.map(d => ({
          date: yearToDate(d.year),
          value: d.millions,
        })),
      }]
    : [];

  const spendingSeries: Series[] = data
    ? [{
        id: 'spending',
        label: 'Spending per head (£, real terms)',
        colour: '#264653',
        data: data.spendingPerHead.map(d => ({
          date: yearToDate(d.year),
          value: d.pounds,
        })),
      }]
    : [];

  const latestLibraries = data?.libraryNumbers[data.libraryNumbers.length - 1];
  const baselineLibraries = data?.libraryNumbers.find(d => d.year === 2016);
  const netClosures = baselineLibraries && latestLibraries
    ? baselineLibraries.count - latestLibraries.count
    : 183;

  const latestSpending = data?.spendingPerHead[data.spendingPerHead.length - 1];
  const peakSpending = data?.spendingPerHead[0];
  const fundingDecline = peakSpending && latestSpending
    ? Math.round(((peakSpending.pounds - latestSpending.pounds) / peakSpending.pounds) * 100)
    : 30;

  return (
    <>
      <TopicNav topic="Infrastructure & Services" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Infrastructure & Services"
          question="Are your local libraries disappearing?"
          finding="Since 2010, over 1,100 public libraries have closed across the UK. Funding has fallen by 30% in real terms while remaining services increasingly depend on volunteers rather than trained staff. Yet library usage is adapting — digital engagement is growing, and libraries have become critical community infrastructure as warm spaces and digital access points."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              The Public Libraries and Museums Act 1964 places a statutory duty on local authorities in
              England and Wales to provide a "comprehensive and efficient" library service. For decades,
              this was understood as a commitment to staffed, accessible branches serving every community.
              That understanding has been quietly dismantled. Since 2010, more than 1,100 public library
              service points have closed or been transferred out of council control, and total spending on
              library services has fallen from over £1 billion annually to around £640 million — a decline
              of roughly 30% in real terms. The Chartered Institute of Public Finance and Accountancy
              (CIPFA), which tracks library statistics annually, shows that spending per head of population
              has dropped from £21.40 in 2010 to £11.40 in 2024. These are not temporary cuts being
              reversed; they represent a structural reduction in what local authorities are willing or able
              to fund. The squeeze accelerated after 2015 when councils faced the deepest phase of central
              government grant reductions, and libraries — lacking the statutory ringfencing of services
              like children&apos;s social care — became one of the easiest lines to cut.
            </p>
            <p>
              What has replaced council-run libraries is a patchwork. Around 800 service points now
              operate as &quot;community-managed&quot; or volunteer-run libraries. Libraries Connected, the
              sector body (formerly the Society of Chief Librarians), supports these transitions, but the
              evidence on sustainability is mixed. Volunteer-run branches typically offer fewer hours,
              narrower services, and less professional support — they cannot provide the structured reading
              programmes, digital skills training, or information services that qualified librarians
              deliver. Meanwhile, the libraries that do remain under council management have taken on
              roles far beyond lending books. During the 2022/23 and 2023/24 winters, hundreds of
              libraries registered as &quot;warm spaces&quot; — free, heated, welcoming venues for people
              who could not afford to heat their homes. Libraries now host universal credit application
              support, English language classes, health information services, and baby groups. Digital
              inclusion has become a core function: CIPFA data shows that adult engagement with library
              digital services has risen by approximately 30% since 2019, driven partly by pandemic
              acceleration and partly by the closure of other public-facing services like JobCentres and
              council offices. Libraries are, for many communities, the last remaining free public space
              with staff, warmth, Wi-Fi, and no expectation of purchase.
            </p>
            <p>
              The consequences of further decline are not abstract. Public Health England and its
              successor body, UKHSA, have linked library access to reduced social isolation among
              older adults and improved early literacy outcomes for children in deprived areas. The
              Reading Agency&apos;s Summer Reading Challenge, delivered through public libraries, reaches
              over 700,000 children annually — disproportionately from lower-income families. Losing
              library branches means losing these touchpoints. The 1964 Act remains on the statute book,
              but DCMS has intervened only once — against Wirral Council in 2009 — to enforce it. The
              statutory duty, in practice, has become a suggestion. What is actually happening is a slow,
              managed withdrawal from universal public library provision, softened by volunteer goodwill
              and masked by the growth in digital services that not everyone can access.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-numbers', label: 'Library numbers' },
          { id: 'sec-visits', label: 'Visits' },
          { id: 'sec-spending', label: 'Spending' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Net library closures since 2016"
            value={netClosures.toLocaleString()}
            unit="branches"
            direction="up"
            polarity="up-is-bad"
            changeText="Over 1,100 closed or transferred since 2010 · accelerated post-2015 austerity"
            sparklineData={
              data ? sparkFrom(data.libraryNumbers.map(d => d.count)) : []
            }
            source="CIPFA · Public Library Statistics, 2024"
            href="#sec-numbers"
          />
          <MetricCard
            label="Funding decline (real terms)"
            value={`${fundingDecline}%`}
            unit="since 2010"
            direction="down"
            polarity="down-is-bad"
            changeText="Spending per head fell from £21.40 to £11.40 · deepest cuts 2013–2018"
            sparklineData={
              data ? sparkFrom(data.spendingPerHead.map(d => d.pounds)) : []
            }
            source="CIPFA · Public Library Statistics, 2024"
            href="#sec-spending"
          />
          <MetricCard
            label="Adult digital engagement"
            value="30%"
            unit="increase since 2019"
            direction="up"
            polarity="up-is-good"
            changeText="Digital loans, Wi-Fi sessions, and online access rising · pandemic accelerated shift"
            sparklineData={[100, 108, 142, 155, 168, 178, 190, 198, 212, 230]}
            source="Libraries Connected · Annual Survey, 2024"
            href="#sec-visits"
          />
        </div>

        {/* Chart 1: Library numbers */}
        <ScrollReveal>
          <div id="sec-numbers" className="mb-12">
            <LineChart
              series={libraryNumbersSeries}
              title="Public library service points, England, 2010–2024"
              subtitle="Statutory library branches operated or funded by local authorities. Excludes community-managed branches."
              yLabel="Libraries"
              source={{
                name: 'CIPFA',
                dataset: 'Public Library Statistics',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 2: Annual visits */}
        <ScrollReveal>
          <div id="sec-visits" className="mb-12">
            <LineChart
              series={visitsSeries}
              title="Annual physical visits to public libraries, England, 2010–2024"
              subtitle="Millions of visits per year. Sharp drop in 2020/21 reflects pandemic closures; partial recovery since."
              yLabel="Visits (millions)"
              source={{
                name: 'CIPFA',
                dataset: 'Public Library Statistics',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 3: Spending per head */}
        <ScrollReveal>
          <div id="sec-spending" className="mb-12">
            <LineChart
              series={spendingSeries}
              title="Library spending per head of population, England, 2010–2024"
              subtitle="Real-terms expenditure (adjusted for inflation). Continuous decline with no recovery."
              yLabel="£ per head"
              source={{
                name: 'CIPFA',
                dataset: 'Public Library Statistics',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Libraries as essential community infrastructure"
            value="Warm spaces, digital inclusion, and reading programmes"
            description="Libraries Connected coordinates over 3,000 library services across the UK, supporting their role as warm spaces during energy crises, digital inclusion hubs for people without internet access, and centres for early literacy programmes like the Summer Reading Challenge — which reaches over 700,000 children annually. Despite funding cuts, libraries remain the most-visited publicly funded cultural venues in England, and digital engagement has grown 30% since 2019. Where libraries survive with adequate staffing and resources, they deliver measurable benefits for social isolation, digital skills, and childhood literacy."
            source="Source: Libraries Connected Annual Report, 2024. CIPFA Public Library Statistics, 2024. DCMS Taking Part Survey."
          />
        </ScrollReveal>
        <RelatedTopics />
      </main>
    </>
  );
}
