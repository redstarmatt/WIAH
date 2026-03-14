'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';
import RelatedTopics from '@/components/RelatedTopics';

const editorialRefs: Reference[] = [
  { num: 1, name: 'The Lancet', dataset: 'Effect of HPV vaccination on cervical cancer in England', url: 'https://www.thelancet.com/', date: 'November 2021', note: 'Cervical cancer rates 87% lower in women vaccinated at age 12-13' },
  { num: 2, name: 'UKHSA', dataset: 'HPV Vaccination Coverage in Adolescents in England', url: 'https://www.gov.uk/government/publications/hpv-vaccine-coverage-in-england', date: '2024', note: 'Girls uptake 84.1%; boys 76.8%; London below 80% for girls' },
  { num: 3, name: 'Cancer Research UK / ONS', dataset: 'Cervical Cancer Incidence Statistics', url: 'https://www.cancerresearchuk.org/health-professional/cancer-statistics/statistics-by-cancer-type/cervical-cancer/incidence', date: '2024', note: 'Cervical cancer incidence fell 53% since 2010' },
  { num: 4, name: 'WHO', dataset: 'Global Strategy to Accelerate the Elimination of Cervical Cancer', date: '2020', note: 'Target: 90% HPV vaccination coverage by 2030' },
];

// ── Types ────────────────────────────────────────────────────────────────────

interface UptakePoint {
  year: number;
  percentage: number;
  note?: string;
}

interface CancerIncidencePoint {
  year: number;
  ratePer100k: number;
}

interface RegionData {
  region: string;
  girlsUptake: number;
  boysUptake: number;
}

interface HpvVaccinationData {
  girlsUptake: UptakePoint[];
  boysUptake: UptakePoint[];
  cervicalCancerIncidence: CancerIncidencePoint[];
  byRegion: RegionData[];
  metadata: {
    topic: string;
    lastUpdated: string;
    sources: Array<{
      name: string;
      dataset: string;
      url: string;
      retrieved: string;
      frequency: string;
    }>;
    methodology: string;
    knownIssues: string[];
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

function sparkFrom(arr: number[], n = 10) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function HpvVaccinationPage() {
  const [data, setData] = useState<HpvVaccinationData | null>(null);

  useEffect(() => {
    fetch('/data/hpv-vaccination/hpv_vaccination.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const girlsSeries: Series[] = data
    ? [{
        id: 'girls-uptake',
        label: 'Girls completing HPV course',
        colour: '#2A9D8F',
        data: data.girlsUptake.map(d => ({
          date: yearToDate(d.year),
          value: d.percentage,
        })),
      }]
    : [];

  const combinedSeries: Series[] = data
    ? [
        {
          id: 'girls',
          label: 'Girls completing HPV course',
          colour: '#2A9D8F',
          data: data.girlsUptake.map(d => ({
            date: yearToDate(d.year),
            value: d.percentage,
          })),
        },
        {
          id: 'boys',
          label: 'Boys completing HPV course',
          colour: '#264653',
          data: data.boysUptake.map(d => ({
            date: yearToDate(d.year),
            value: d.percentage,
          })),
        },
      ]
    : [];

  const cancerSeries: Series[] = data
    ? [{
        id: 'cervical-cancer',
        label: 'Cervical cancer incidence',
        colour: '#E63946',
        data: data.cervicalCancerIncidence.map(d => ({
          date: yearToDate(d.year),
          value: d.ratePer100k,
        })),
      }]
    : [];

  const latestGirls = data?.girlsUptake[data.girlsUptake.length - 1];
  const peakGirls = data?.girlsUptake.reduce((a, b) => a.percentage > b.percentage ? a : b);
  const latestBoys = data?.boysUptake[data.boysUptake.length - 1];
  const firstBoys = data?.boysUptake[0];
  const latestCancer = data?.cervicalCancerIncidence[data.cervicalCancerIncidence.length - 1];
  const earliestCancer = data?.cervicalCancerIncidence[0];

  const cancerDecline = latestCancer && earliestCancer
    ? Math.round(((earliestCancer.ratePer100k - latestCancer.ratePer100k) / earliestCancer.ratePer100k) * 100)
    : 53;

  const uptakeAnnotations: Annotation[] = [
    { date: new Date(2019, 5, 1), label: '2019: Programme extended to boys' },
    { date: new Date(2020, 0, 1), label: '2020: COVID disrupts school programme' },
    { date: new Date(2023, 8, 1), label: '2023: Switch to one-dose schedule' },
  ];

  const cancerAnnotations: Annotation[] = [
    { date: new Date(2012, 5, 1), label: '2012: First vaccinated cohort reaches screening age' },
  ];

  return (
    <>
      <TopicNav topic="HPV Vaccination" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="HPV Vaccination"
          question="Is HPV Vaccination Protecting Britain's Young People?"
          finding="The HPV vaccination programme is one of the most successful public health interventions in a generation. Cervical cancer incidence has fallen 53% since 2010, and the programme now covers boys as well as girls. But pandemic disruption left a gap that catch-up campaigns are still closing."
          colour="#2A9D8F"
          preposition="with"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              The UK introduced routine HPV vaccination for 12- to 13-year-old girls in 2008, with a catch-up programme for older teenagers. It was one of the first countries in the world to do so. The results have been remarkable: cervical cancer incidence among women aged 25 to 29 has fallen by more than half compared to pre-vaccination cohorts.<Cite nums={3} /> A landmark 2021 study in The Lancet confirmed that the vaccine had near-eliminated cervical cancer in women vaccinated in their early teens.<Cite nums={1} /> In September 2019, the programme was extended to boys, recognising that HPV causes cancers of the throat, mouth, and anus in men as well as cervical cancer in women. By 2024, 76.8% of boys were completing the vaccination course, up from 54.4% in the first year of the programme.<Cite nums={2} />
            </p>
            <p>
              COVID-19 dealt the programme a serious blow. School-based vaccination sessions were cancelled from March 2020, and catch-up proved difficult. Girls' uptake fell from a peak of 87.4% in 2015 to just 76.7% in 2020.<Cite nums={2} /> Recovery has been steady but slow: by 2024, uptake had climbed back to 84.1%, still short of the pre-pandemic high. London remains a persistent outlier, with uptake below 80% for girls and 70% for boys, driven by higher population mobility, greater school diversity, and lower consent form return rates. In September 2023, the UK followed World Health Organisation guidance and moved from a two-dose to a one-dose schedule, which should simplify delivery and improve completion rates, though it makes direct comparison with earlier years more difficult.
            </p>
            <p>
              The broader picture is overwhelmingly positive. The WHO has set a target of 90% HPV vaccination coverage by 2030 as part of its global strategy to eliminate cervical cancer.<Cite nums={4} /> The UK is within striking distance but not there yet. The programme prevents an estimated 450 cancers and 150 deaths per year in England alone.<Cite nums={[1,3]} /> The remaining challenge is reaching the teenagers who slip through the school-based system: those who are absent on vaccination day, those whose parents do not return consent forms, and those who are not enrolled in mainstream education. Community catch-up clinics, pharmacy-based vaccination, and digital consent systems are all being trialled. The data says the vaccine works. The question now is whether the delivery system can match the science.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-uptake', label: 'Vaccination uptake' },
          { id: 'sec-cancer', label: 'Cancer impact' },
          { id: 'sec-regional', label: 'Regional variation' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Girls completing HPV course"
            value={latestGirls ? `${latestGirls.percentage}%` : '84.1%'}
            unit="2024"
            direction="up"
            polarity="up-is-good"
            changeText={
              latestGirls && peakGirls
                ? `Recovering from COVID low · peak was ${peakGirls.percentage}% in ${peakGirls.year}`
                : 'Recovering from COVID low · peak was 87.4% in 2015'
            }
            sparklineData={
              data ? sparkFrom(data.girlsUptake.map(d => d.percentage)) : []
            }
            source="UKHSA — HPV Vaccination Coverage, 2024"
            href="#sec-uptake"
          />
          <MetricCard
            label="Boys completing HPV course"
            value={latestBoys ? `${latestBoys.percentage}%` : '76.8%'}
            unit="2024"
            direction="up"
            polarity="up-is-good"
            changeText={
              latestBoys && firstBoys
                ? `Up from ${firstBoys.percentage}% in ${firstBoys.year} · programme started 2019`
                : 'Up from 54.4% in 2019 · programme started 2019'
            }
            sparklineData={
              data ? data.boysUptake.map(d => d.percentage) : []
            }
            source="UKHSA — HPV Vaccination Coverage, 2024"
            href="#sec-uptake"
          />
          <MetricCard
            label="Cervical cancer incidence"
            value={latestCancer ? `${latestCancer.ratePer100k}` : '5.8'}
            unit="per 100k women"
            direction="down"
            polarity="up-is-bad"
            changeText={`Down ${cancerDecline}% since 2010 · vaccination effect now visible in cancer data`}
            sparklineData={
              data ? sparkFrom(data.cervicalCancerIncidence.map(d => d.ratePer100k)) : []
            }
            source="Cancer Research UK / ONS — Cervical Cancer Statistics, 2024"
            href="#sec-cancer"
          />
        </div>

        {/* Chart 1: Combined uptake — girls and boys */}
        <ScrollReveal>
          <div id="sec-uptake" className="mb-12">
            <LineChart
              series={combinedSeries}
              title="HPV vaccination completion rate, girls and boys, England, 2010–2024"
              subtitle="Percentage of Year 9 pupils completing the HPV vaccination course by end of academic year. Boys programme began 2019."
              yLabel="Completion rate (%)"
              annotations={uptakeAnnotations}
              source={{
                name: 'UK Health Security Agency',
                dataset: 'HPV Vaccination Coverage in Adolescents in England',
                url: 'https://www.gov.uk/government/publications/hpv-vaccine-coverage-in-england',
                frequency: 'annual',
                date: 'Nov 2025',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 2: Cervical cancer incidence */}
        <ScrollReveal>
          <div id="sec-cancer" className="mb-12">
            <LineChart
              series={cancerSeries}
              title="Cervical cancer incidence, England, 2010–2024"
              subtitle="Age-standardised rate per 100,000 women. The impact of HPV vaccination is now visible in cancer registry data."
              yLabel="Rate per 100,000"
              annotations={cancerAnnotations}
              source={{
                name: 'Cancer Research UK / ONS',
                dataset: 'Cervical Cancer Incidence Statistics',
                url: 'https://www.cancerresearchuk.org/health-professional/cancer-statistics/statistics-by-cancer-type/cervical-cancer/incidence',
                frequency: 'annual',
                date: 'Nov 2025',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 3: Regional variation */}
        <ScrollReveal>
          <div id="sec-regional" className="mb-12">
            <div className="bg-white rounded-lg border border-wiah-border p-8">
              <h2 className="text-lg font-bold text-wiah-black mb-2">
                HPV vaccination completion rate by region, 2024
              </h2>
              <p className="text-sm text-wiah-mid mb-6">
                Girls and boys completion rates by NHS England region. London is a persistent outlier.
              </p>
              <div className="mt-6 space-y-4">
                {data?.byRegion
                  .sort((a, b) => b.girlsUptake - a.girlsUptake)
                  .map((r) => {
                    const girlsPct = (r.girlsUptake / 100) * 100;
                    const boysPct = (r.boysUptake / 100) * 100;
                    return (
                      <div key={r.region}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium text-wiah-black">{r.region}</span>
                          <span className="font-mono text-sm text-wiah-black">
                            <span className="font-bold" style={{ color: '#2A9D8F' }}>{r.girlsUptake}%</span>
                            {' / '}
                            <span className="font-bold" style={{ color: '#264653' }}>{r.boysUptake}%</span>
                          </span>
                        </div>
                        <div className="flex gap-1">
                          <div className="h-5 flex-1 bg-wiah-light rounded-sm overflow-hidden">
                            <div
                              className="h-full rounded-sm transition-all"
                              style={{ width: `${girlsPct}%`, backgroundColor: '#2A9D8F' }}
                            />
                          </div>
                          <div className="h-5 flex-1 bg-wiah-light rounded-sm overflow-hidden">
                            <div
                              className="h-full rounded-sm transition-all"
                              style={{ width: `${boysPct}%`, backgroundColor: '#264653' }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
              <div className="flex gap-4 mt-4">
                <span className="font-mono text-xs text-wiah-mid flex items-center gap-1">
                  <span className="inline-block w-3 h-3 rounded-sm" style={{ backgroundColor: '#2A9D8F' }} /> Girls
                </span>
                <span className="font-mono text-xs text-wiah-mid flex items-center gap-1">
                  <span className="inline-block w-3 h-3 rounded-sm" style={{ backgroundColor: '#264653' }} /> Boys
                </span>
              </div>
              <p className="font-mono text-xs text-wiah-mid mt-4">
                Source: UKHSA — HPV Vaccination Coverage in Adolescents in England, 2024
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="HPV vaccination is eliminating cervical cancer in vaccinated cohorts"
            value="87% reduction"
            description="A landmark 2021 study published in The Lancet found that cervical cancer rates among women vaccinated at age 12-13 were 87% lower than in unvaccinated cohorts. The researchers concluded that the HPV vaccination programme will have near-eliminated cervical cancer in vaccinated women born since September 1995. England's programme currently prevents an estimated 450 cancers and 150 deaths per year. The WHO has endorsed HPV vaccination as a key pillar of its global strategy to eliminate cervical cancer as a public health problem by 2030."
            source="Source: The Lancet, 'Effect of HPV vaccination on cervical cancer in England', November 2021. WHO — Global Strategy to Accelerate the Elimination of Cervical Cancer, 2020."
          />
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        {/* Sources & Methodology */}
        <ScrollReveal>
          <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
            <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
            <div className="text-sm text-wiah-mid font-mono space-y-2">
              {data?.metadata.sources.map((s, i) => (
                <p key={i}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-wiah-blue hover:underline"
                  >
                    {s.name}
                  </a>
                  {' '}&mdash; {s.dataset}. Retrieved {s.retrieved}. Updated {s.frequency}.
                </p>
              ))}
              <p className="mt-4">{data?.metadata.methodology}</p>
              {data?.metadata.knownIssues && data.metadata.knownIssues.length > 0 && (
                <div className="mt-4">
                  <p className="font-bold text-wiah-black">Known issues:</p>
                  <ul className="list-disc list-inside mt-1 space-y-1">
                    {data.metadata.knownIssues.map((issue, i) => (
                      <li key={i}>{issue}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>
        </ScrollReveal>

        <RelatedTopics />
      </main>
    </>
  );
}
