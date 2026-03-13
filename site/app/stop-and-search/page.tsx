'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

// ── Types ────────────────────────────────────────────────────────────────────

interface TotalSearchesPoint {
  year: number;
  searches: number;
}

interface EthnicDisparityPoint {
  year: number;
  blackToWhiteRatio: number;
  asianToWhiteRatio: number;
}

interface FindRatePoint {
  year: number;
  positiveOutcomePct: number;
}

interface Section60Point {
  year: number;
  orders: number;
  searches: number;
}

interface ForceAreaData {
  force: string;
  searchesPer1000: number;
  blackToWhiteRatio: number;
}

interface StopAndSearchData {
  totalSearches: TotalSearchesPoint[];
  ethnicDisparity: EthnicDisparityPoint[];
  findRate: FindRatePoint[];
  section60: Section60Point[];
  byForceArea: ForceAreaData[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

function sparkFrom(arr: number[], n = 10) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function StopAndSearchPage() {
  const [data, setData] = useState<StopAndSearchData | null>(null);

  useEffect(() => {
    fetch('/data/stop-and-search/stop_and_search.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const totalSearchesSeries: Series[] = data
    ? [{
        id: 'total-searches',
        label: 'Total stop and searches',
        colour: '#6B7280',
        data: data.totalSearches.map(d => ({
          date: yearToDate(d.year),
          value: d.searches,
        })),
      }]
    : [];

  const totalSearchesAnnotations: Annotation[] = [
    { date: new Date(2014, 5, 1), label: "2014: Theresa May's Best Use reforms" },
    { date: new Date(2019, 5, 1), label: "2019: S60 relaxation · knife crime surge" },
  ];

  const disparitySeries: Series[] = data
    ? [
        {
          id: 'black-ratio',
          label: 'Black to white ratio',
          colour: '#E63946',
          data: data.ethnicDisparity.map(d => ({
            date: yearToDate(d.year),
            value: d.blackToWhiteRatio,
          })),
        },
        {
          id: 'asian-ratio',
          label: 'Asian to white ratio',
          colour: '#F4A261',
          data: data.ethnicDisparity.map(d => ({
            date: yearToDate(d.year),
            value: d.asianToWhiteRatio,
          })),
        },
      ]
    : [];

  const disparityAnnotations: Annotation[] = [
    { date: new Date(2016, 5, 1), label: "2016: Lowest disparity on record" },
    { date: new Date(2020, 5, 1), label: "2020: Post-pandemic surge in disparity" },
  ];

  const section60Series: Series[] = data
    ? [{
        id: 'section60-searches',
        label: 'Section 60 searches',
        colour: '#264653',
        data: data.section60.map(d => ({
          date: yearToDate(d.year),
          value: d.searches,
        })),
      }]
    : [];

  const section60Annotations: Annotation[] = [
    { date: new Date(2019, 5, 1), label: "2019: S60 authorisation relaxed" },
  ];

  // ── Derived metrics ───────────────────────────────────────────────────────

  const latestSearches = data?.totalSearches[data.totalSearches.length - 1];
  const troughSearches = data?.totalSearches.reduce((a, b) =>
    a.searches < b.searches ? a : b
  );
  const latestDisparity = data?.ethnicDisparity[data.ethnicDisparity.length - 1];
  const latestFindRate = data?.findRate[data.findRate.length - 1];
  const latestS60 = data?.section60[data.section60.length - 1];
  const firstS60 = data?.section60[0];

  const s60Growth = latestS60 && firstS60
    ? Math.round(((latestS60.searches - firstS60.searches) / firstS60.searches) * 100)
    : 1453;

  return (
    <>
      <TopicNav topic="Stop and Search" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Stop and Search"
          question="Is Stop and Search Being Used Fairly?"
          finding="1.06 million stop and searches took place in England and Wales in 2023/24 — up 250% from the 2016 low. Black people are now stopped at seven times the rate of white people, up from 3.6 times at the lowest point. Section 60 no-suspicion searches have increased fifteenfold since 2017."
          colour="#6B7280"
          preposition="with"
        />

        {/* ── Editorial context ─────────────────────────────────────────────── */}
        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Stop and search is the most contested power in everyday policing. Used well, it can remove weapons from the street and deter violence. Used badly, it alienates the communities most affected by crime. The data tells a story of a power that collapsed to historic lows after Theresa May demanded forces justify their use of it in 2014, then surged back after the government relaxed guidance in response to rising knife crime. The total number of stop and searches in England and Wales fell from 1.2 million in 2010/11 to just 303,000 in 2016/17 under the "Best Use of Stop and Search" scheme. By 2023/24, it had risen to over 1.06 million — more than tripling in seven years.</p>
            <p>The resurgence has come with a sharp increase in racial disproportionality. When stop and search was at its lowest, the ratio of Black people stopped compared to white people stood at 3.6:1. By 2023/24, it had climbed to 7:1 — nearly double. In London, where the Metropolitan Police conducts the largest share of all searches nationally, the ratio is even steeper. Asian communities have also seen rising disproportionality, with a ratio increasing from 1.4:1 to 2.7:1 over the same period. The positive outcome rate — the proportion of searches that lead to an arrest, penalty, or seized item — stood at around 14% in 2023/24, meaning that for every seven searches conducted, six find nothing.</p>
            <p>The most significant change in recent years has been the explosion in Section 60 orders. These allow officers to stop anyone in a defined area without reasonable suspicion — a blanket power originally intended for exceptional circumstances. Section 60 searches have risen from roughly 4,100 in 2017/18 to nearly 64,000 in 2023/24. Critics argue this represents a return to the discredited "sus laws" era, with young Black men in London disproportionately affected. Defenders point to the correlation between targeted S60 deployments and falling knife injuries in specific areas. The evidence remains genuinely contested. What is not contested is the scale: stop and search in England and Wales has returned to levels not seen since the start of the decade, and the communities bearing the heaviest burden are the same ones who have always borne it.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-volume', label: 'Total searches' },
          { id: 'sec-disparity', label: 'Ethnic disparity' },
          { id: 'sec-section60', label: 'Section 60' },
          { id: 'sec-regional', label: 'By force area' },
        ]} />

        {/* ── Metric cards ──────────────────────────────────────────────────── */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Stop and searches per year"
            value={latestSearches ? latestSearches.searches.toLocaleString() : '1,061,281'}
            unit="2023/24"
            direction="up"
            polarity="up-is-bad"
            changeText={
              latestSearches && troughSearches
                ? `Up ${Math.round(((latestSearches.searches - troughSearches.searches) / troughSearches.searches) * 100)}% from ${troughSearches.year} low of ${troughSearches.searches.toLocaleString()}`
                : 'Up 250% from 2016 low'
            }
            sparklineData={
              data ? sparkFrom(data.totalSearches.map(d => d.searches)) : []
            }
            source="Home Office — Police Powers and Procedures, 2023/24"
            href="#sec-volume"
          />
          <MetricCard
            label="Black to white stop ratio"
            value={latestDisparity ? `${latestDisparity.blackToWhiteRatio}:1` : '7:1'}
            unit="2023/24"
            direction="up"
            polarity="up-is-bad"
            changeText="Up from 3.6:1 in 2016 — disproportionality highest in London"
            sparklineData={
              data ? sparkFrom(data.ethnicDisparity.map(d => d.blackToWhiteRatio)) : []
            }
            source="Home Office — Police Powers and Procedures, 2023/24"
            href="#sec-disparity"
          />
          <MetricCard
            label="Positive outcome rate"
            value={latestFindRate ? `${latestFindRate.positiveOutcomePct}%` : '14%'}
            unit="2023/24"
            direction="down"
            polarity="down-is-bad"
            changeText="Down from 17.8% in 2016 — 6 in 7 searches find nothing"
            sparklineData={
              data ? sparkFrom(data.findRate.map(d => d.positiveOutcomePct)) : []
            }
            source="Home Office — Police Powers and Procedures, 2023/24"
            href="#sec-section60"
          />
        </div>

        {/* ── Chart 1: Total stop and searches ──────────────────────────────── */}
        <ScrollReveal>
          <div id="sec-volume" className="mb-12">
            <LineChart
              series={totalSearchesSeries}
              title="Total stop and searches, England and Wales, 2010-2024"
              subtitle="Annual figures. Collapsed after 2014 Best Use reforms, then surged post-2019 knife crime response."
              yLabel="Searches"
              annotations={totalSearchesAnnotations}
              source={{
                name: 'Home Office',
                dataset: 'Police Powers and Procedures',
                frequency: 'annual',
                url: 'https://www.gov.uk/government/statistics/police-powers-and-procedures-stop-and-search-and-arrests-england-and-wales-year-ending-march-2024',
                date: 'Oct 2024',
              }}
            />
          </div>
        </ScrollReveal>

        {/* ── Chart 2: Ethnic disparity ─────────────────────────────────────── */}
        <ScrollReveal>
          <div id="sec-disparity" className="mb-12">
            <LineChart
              series={disparitySeries}
              title="Ethnic disproportionality in stop and search, 2010-2024"
              subtitle="Rate at which Black and Asian people are stopped compared to white people. Higher = more disproportionate."
              yLabel="Ratio to white rate"
              annotations={disparityAnnotations}
              source={{
                name: 'Home Office',
                dataset: 'Police Powers and Procedures — Ethnicity Tables',
                frequency: 'annual',
                url: 'https://www.gov.uk/government/statistics/police-powers-and-procedures-stop-and-search-and-arrests-england-and-wales-year-ending-march-2024',
                date: 'Oct 2024',
              }}
            />
          </div>
        </ScrollReveal>

        {/* ── Chart 3: Section 60 searches ──────────────────────────────────── */}
        <ScrollReveal>
          <div id="sec-section60" className="mb-12">
            <LineChart
              series={section60Series}
              title="Section 60 (no-suspicion) searches, 2017-2024"
              subtitle="Blanket stop and search powers. Up fifteenfold since authorisation rules were relaxed in 2019."
              yLabel="Searches"
              annotations={section60Annotations}
              source={{
                name: 'Home Office',
                dataset: 'Police Powers and Procedures — Section 60 Tables',
                frequency: 'annual',
                url: 'https://www.gov.uk/government/statistics/police-powers-and-procedures-stop-and-search-and-arrests-england-and-wales-year-ending-march-2024',
                date: 'Oct 2024',
              }}
            />
          </div>
        </ScrollReveal>

        {/* ── Regional breakdown ─────────────────────────────────────────────── */}
        <ScrollReveal>
          <div id="sec-regional" className="mb-12">
            <div className="bg-white rounded-lg border border-wiah-border p-8">
              <h2 className="text-lg font-bold text-wiah-black mb-2">
                Stop and search rate by police force area (per 1,000 people)
              </h2>
              <p className="text-sm text-wiah-mid mb-6">
                Rates vary sevenfold across forces. Includes Black-to-white disparity ratio for each area.
              </p>
              <div className="mt-6 space-y-4">
                {data?.byForceArea.map((r) => {
                  const pct = (r.searchesPer1000 / 20) * 100;
                  return (
                    <div key={r.force}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-wiah-black">{r.force}</span>
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs text-wiah-mid">{r.blackToWhiteRatio}:1 disparity</span>
                          <span className="font-mono text-sm font-bold text-wiah-black">{r.searchesPer1000}</span>
                        </div>
                      </div>
                      <div className="h-6 bg-wiah-light rounded-sm overflow-hidden">
                        <div
                          className="h-full rounded-sm transition-all"
                          style={{ width: `${pct}%`, backgroundColor: '#6B7280' }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="font-mono text-xs text-wiah-mid mt-4">Source: Home Office — Police Powers and Procedures by Force Area, 2023/24</p>
            </div>
          </div>
        </ScrollReveal>

        {/* ── Positive callout ───────────────────────────────────────────────── */}
        <ScrollReveal>
          <PositiveCallout
            title="Positive outcome rates have begun recovering"
            value="14%"
            unit="find rate"
            description="After falling to 12.8% in 2021 as search volumes surged, the positive outcome rate has recovered to 14% in 2023/24. Forces implementing the College of Policing guidance on intelligence-led searching — including body-worn video review and supervisor authorisation — are seeing higher find rates and fewer complaints. The evidence suggests that when stop and search is used selectively and with genuine suspicion, it is both more effective and less damaging to community trust. The challenge is maintaining that discipline as political pressure to increase search numbers continues."
            source="Source: Home Office — Police Powers and Procedures, 2023/24. College of Policing — Best Use of Stop and Search Scheme evaluation."
          />
        </ScrollReveal>

        {/* ── Sources & methodology ──────────────────────────────────────────── */}
        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p>
              <a href="https://www.gov.uk/government/statistics/police-powers-and-procedures-stop-and-search-and-arrests-england-and-wales-year-ending-march-2024" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Home Office — Police Powers and Procedures, England and Wales</a> — primary data source for all stop and search figures. Retrieved October 2024.
            </p>
            <p>
              Ethnic disparity ratios are calculated using the resident population estimates from the 2021 Census. "Positive outcome" includes arrests, penalty notices, cautions, and items seized. Section 60 data covers Criminal Justice and Public Order Act 1994 authorisations only.
            </p>
            <p>
              All figures are for England and Wales unless otherwise stated. Yearly figures correspond to the 12 months ending 31 March.
            </p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
