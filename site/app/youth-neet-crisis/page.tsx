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
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

// ── Types ────────────────────────────────────────────────────────────────────

interface NeetRatePoint {
  year: number;
  rate: number;
  total: number;
}

interface NeetByReasonPoint {
  year: number;
  longTermSick: number;
  lookingForWork: number;
  caringResponsibilities: number;
  other: number;
}

interface NeetByRegionPoint {
  year: number;
  northEast: number;
  northWest: number;
  yorkshireHumber: number;
  eastMidlands: number;
  westMidlands: number;
  london: number;
  southEast: number;
  southWest: number;
}

interface YouthNeetData {
  neetRate: NeetRatePoint[];
  neetByReason: NeetByReasonPoint[];
  neetByRegion: NeetByRegionPoint[];
  mentalHealthBreakdown: {
    mentalHealthAsMainIssue: number;
    disabilityReported: number;
    longTermCondition: number;
  };
}

const editorialRefs: Reference[] = [
  { num: 1, name: 'ONS', dataset: 'Labour Force Survey — Young people not in education, employment or training', url: 'https://www.ons.gov.uk/employmentandlabourmarket/peoplenotinwork/neet', date: '2024' },
  { num: 2, name: 'ONS', dataset: 'Labour Force Survey — Reason for economic inactivity (16-24)', url: 'https://www.ons.gov.uk/employmentandlabourmarket/peoplenotinwork/neet', date: '2024' },
  { num: 3, name: 'DfE', dataset: 'NEET and participation statistics', url: 'https://explore-education-statistics.service.gov.uk/find-statistics/neet-statistics-annual-brief', date: '2024' },
  { num: 4, name: 'DfE', dataset: 'Children looked after in England including adoptions — care leaver outcomes', url: 'https://explore-education-statistics.service.gov.uk/find-statistics/children-looked-after-in-england-including-adoptions', date: '2024' },
  { num: 5, name: 'Public Health England', dataset: 'Longitudinal evidence on NEET scarring effects and lifetime costs', date: '2023', note: 'Estimated fiscal cost exceeds £10bn per year' },
];

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

function sparkFrom(arr: number[], n = 10) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function YouthNeetCrisisPage() {
  const [data, setData] = useState<YouthNeetData | null>(null);

  useEffect(() => {
    fetch('/data/youth-neet-crisis/youth_neet_crisis.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const neetRateSeries: Series[] = data
    ? [{
        id: 'neet-rate',
        label: 'NEET rate (% of 16-24)',
        colour: '#E63946',
        data: data.neetRate.map(d => ({
          date: yearToDate(d.year),
          value: d.rate,
        })),
      }]
    : [];

  const neetByReasonSeries: Series[] = data
    ? [
        {
          id: 'long-term-sick',
          label: 'Long-term sick / disabled',
          colour: '#E63946',
          data: data.neetByReason.map(d => ({
            date: yearToDate(d.year),
            value: d.longTermSick,
          })),
        },
        {
          id: 'looking-for-work',
          label: 'Looking for work',
          colour: '#264653',
          data: data.neetByReason.map(d => ({
            date: yearToDate(d.year),
            value: d.lookingForWork,
          })),
        },
        {
          id: 'caring',
          label: 'Caring responsibilities',
          colour: '#F4A261',
          data: data.neetByReason.map(d => ({
            date: yearToDate(d.year),
            value: d.caringResponsibilities,
          })),
        },
      ]
    : [];

  const regionalSeries: Series[] = data
    ? [
        {
          id: 'north-east',
          label: 'North East',
          colour: '#E63946',
          data: data.neetByRegion.map(d => ({
            date: yearToDate(d.year),
            value: d.northEast,
          })),
        },
        {
          id: 'london',
          label: 'London',
          colour: '#264653',
          data: data.neetByRegion.map(d => ({
            date: yearToDate(d.year),
            value: d.london,
          })),
        },
        {
          id: 'south-east',
          label: 'South East',
          colour: '#2A9D8F',
          data: data.neetByRegion.map(d => ({
            date: yearToDate(d.year),
            value: d.southEast,
          })),
        },
        {
          id: 'west-midlands',
          label: 'West Midlands',
          colour: '#F4A261',
          data: data.neetByRegion.map(d => ({
            date: yearToDate(d.year),
            value: d.westMidlands,
          })),
        },
      ]
    : [];

  const latestRate = data?.neetRate[data.neetRate.length - 1];
  const preCovidRate = data?.neetRate.find(d => d.year === 2019);

  return (
    <>
      <TopicNav topic="Education & Skills" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Education & Skills"
          question="Why are nearly a million young people not working or in school?"
          finding="957,000 young people aged 16-24 in England are not in education, employment, or training. Almost half report a disability or long-term health condition. Mental health is now the single largest barrier, and the problem is getting worse."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              Behind the headline unemployment figures lies a population that barely registers in political debate. Nearly a million young people aged 16 to 24 in England are classified as NEET — not in education, employment, or training. That is 12.8% of the age group, up from a post-2010 low of 10.9% in 2019.<Cite nums={1} /> Unlike the unemployment count, which captures those actively seeking work, the NEET measure includes a large and growing group who are economically inactive — not looking for work at all, often because they are too unwell to do so. The composition of this group has shifted dramatically over the past decade. In 2015, over a third of young NEETs were actively job-seeking. By 2024, that share has halved to under 20%. The fastest-growing category is long-term sickness and disability, which now accounts for 48.4% of the NEET population.<Cite nums={2} /> Mental health conditions are cited as the primary barrier by 42.6%, a figure that has roughly doubled since 2015<Cite nums={3} /> and reflects both the genuine rise in youth mental illness and the collapse of timely access to treatment through CAMHS and adult mental health services.
            </p>
            <p>
              The geography of NEET status mirrors the geography of deprivation. In the North East, 18.3% of 16-to-24-year-olds are NEET, nearly double the rate in the South East. Coastal towns, former industrial areas, and left-behind communities bear the heaviest burden. Care leavers are vastly overrepresented: around 39% of care leavers aged 19-21 are NEET, compared to 12.8% of the general youth population.<Cite nums={4} /> These young people face compounding disadvantages — disrupted education, unstable housing, limited family networks, and higher rates of mental health difficulty — that standard employment programmes rarely address. The scarring effects of early NEET status are well-documented in longitudinal research: a young person who spends a year NEET between 16 and 21 can expect significantly lower lifetime earnings, higher rates of unemployment in their 30s and 40s, and worse physical and mental health outcomes decades later. The cost is not just individual but fiscal — estimated at over 10 billion pounds per year in lost productivity, welfare payments, and health spending.<Cite nums={5} />
            </p>
            <p>
              What makes the current crisis different from previous youth unemployment peaks is its medical character. This is not primarily a story about a lack of jobs — vacancies remain historically high in many sectors — but about a generation whose capacity to work has been undermined by chronic ill health, particularly mental ill health, at a scale the welfare and education systems were not designed to handle. The pandemic accelerated trends that were already visible: rising rates of anxiety and depression among teenagers, longer CAMHS waiting lists, a school attendance crisis that has left hundreds of thousands of children persistently absent, and a benefits system that offers little by way of supported re-engagement. Without a fundamentally different approach — one that integrates health support with employment and education pathways — the numbers will continue to climb.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-neet-rate', label: 'NEET rate' },
          { id: 'sec-by-reason', label: 'By reason' },
          { id: 'sec-regional', label: 'Regional' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Total young people NEET (16-24)"
            value="957,000"
            unit="2024"
            direction="up"
            polarity="up-is-bad"
            changeText={`12.8% of age group · up from ${preCovidRate ? preCovidRate.rate + '%' : '10.9%'} in 2019`}
            sparklineData={
              data ? sparkFrom(data.neetRate.map(d => d.total)) : []
            }
            source="ONS · Labour Force Survey, Young people not in education, employment or training, 2024"
            href="#sec-neet-rate"
          />
          <MetricCard
            label="Report disability or long-term condition"
            value="48.4%"
            unit="of NEET 16-24s"
            direction="up"
            polarity="up-is-bad"
            changeText="Up from 24.1% in 2015 · doubled in under a decade"
            sparklineData={
              data ? data.neetByReason.map(d => d.longTermSick) : []
            }
            source="ONS · Labour Force Survey, reason for economic inactivity, 2024"
            href="#sec-by-reason"
          />
          <MetricCard
            label="Mental health as main barrier"
            value="42.6%"
            unit="of NEET 16-24s"
            direction="up"
            polarity="up-is-bad"
            changeText="Now the single largest reason for youth economic inactivity"
            sparklineData={[]}
            source="DfE · NEET and participation statistics, 2024"
            href="#sec-by-reason"
          />
        </div>

        {/* Chart 1: NEET rate over time */}
        <ScrollReveal>
          <div id="sec-neet-rate" className="mb-12">
            <LineChart
              series={neetRateSeries}
              title="NEET rate among 16-24 year olds, England, 2010-2024"
              subtitle="Percentage of young people not in education, employment, or training. Falling steadily until 2019, now rising again."
              yLabel="% NEET"
              source={{
                name: 'ONS',
                dataset: 'Labour Force Survey — Young people NEET',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 2: NEET by reason */}
        <ScrollReveal>
          <div id="sec-by-reason" className="mb-12">
            <LineChart
              series={neetByReasonSeries}
              title="NEET by reason (% of NEET population), England, 2015-2024"
              subtitle="Long-term sickness has doubled as a share of NEET, overtaking job-seeking as the primary category."
              yLabel="% of NEET"
              source={{
                name: 'ONS',
                dataset: 'Labour Force Survey — Reason for economic inactivity',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 3: Regional variation */}
        <ScrollReveal>
          <div id="sec-regional" className="mb-12">
            <LineChart
              series={regionalSeries}
              title="NEET rate by region, England, 2015-2024"
              subtitle="The North East consistently has the highest NEET rate — nearly double the South East. The gap is widening."
              yLabel="% NEET"
              source={{
                name: 'ONS',
                dataset: 'Labour Force Survey — Regional NEET estimates',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Youth Futures Foundation and Kickstart legacy programmes"
            value="115,000+ starts"
            description="The Kickstart Scheme, launched during the pandemic, funded over 115,000 six-month job placements for young people on Universal Credit between 2020 and 2022. Evaluation by the Institute for Employment Studies found that 68% of participants were in sustained employment six months after completing their placement. The Youth Futures Foundation, an independent endowment created with dormant assets funding, is now investing in evidence-based employment programmes specifically targeting young people with health conditions and disabilities — the fastest-growing NEET cohort. Its Connected Futures programme funds integrated health-and-employment support in 12 areas of England, recognising that you cannot solve a health-driven employment crisis with employment programmes alone."
            source="Source: DfE — Kickstart Scheme evaluation, 2023. Youth Futures Foundation — Connected Futures programme report, 2024."
          />
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        <RelatedTopics />
      </main>
    </>
  );
}
