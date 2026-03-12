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

interface AttendancePoint {
  year: number;
  upperMiddle: number;
  lowerWorking: number;
}

interface FundingPoint {
  year: number;
  fundingMillions: number;
}

interface MuseumVisitPoint {
  year: number;
  visitsMillions: number;
}

interface CulturalParticipationData {
  attendanceBySocioeconomic: AttendancePoint[];
  artsFundingRealTerms: FundingPoint[];
  museumVisits: MuseumVisitPoint[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

function sparkFrom(arr: number[], n = 10) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function CulturalParticipationGapPage() {
  const [data, setData] = useState<CulturalParticipationData | null>(null);

  useEffect(() => {
    fetch('/data/cultural-participation-gap/cultural_participation_gap.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const attendanceSeries: Series[] = data
    ? [
        {
          id: 'upper-middle',
          label: 'Upper/middle socioeconomic group',
          colour: '#264653',
          data: data.attendanceBySocioeconomic.map(d => ({
            date: yearToDate(d.year),
            value: d.upperMiddle,
          })),
        },
        {
          id: 'lower-working',
          label: 'Lower/working socioeconomic group',
          colour: '#E63946',
          data: data.attendanceBySocioeconomic.map(d => ({
            date: yearToDate(d.year),
            value: d.lowerWorking,
          })),
        },
      ]
    : [];

  const fundingSeries: Series[] = data
    ? [{
        id: 'arts-funding',
        label: 'Arts Council England funding (real terms)',
        colour: '#E63946',
        data: data.artsFundingRealTerms.map(d => ({
          date: yearToDate(d.year),
          value: d.fundingMillions,
        })),
      }]
    : [];

  const museumSeries: Series[] = data
    ? [{
        id: 'museum-visits',
        label: 'Total visits (DCMS-sponsored museums)',
        colour: '#264653',
        data: data.museumVisits.map(d => ({
          date: yearToDate(d.year),
          value: d.visitsMillions,
        })),
      }]
    : [];

  const latestAttendance = data?.attendanceBySocioeconomic[data.attendanceBySocioeconomic.length - 1];
  const latestFunding = data?.artsFundingRealTerms[data.artsFundingRealTerms.length - 1];
  const firstFunding = data?.artsFundingRealTerms[0];
  const deprivationGap = latestAttendance
    ? Math.round(latestAttendance.upperMiddle - latestAttendance.lowerWorking)
    : 19;

  const fundingCutPct = latestFunding && firstFunding
    ? Math.round(((firstFunding.fundingMillions - latestFunding.fundingMillions) / firstFunding.fundingMillions) * 100)
    : 30;

  return (
    <>
      <TopicNav topic="Society & Democracy" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Society & Democracy"
          question="Who gets to experience culture in Britain?"
          finding="Museum and gallery attendance has recovered to near pre-pandemic levels, but the class gap hasn't closed. Adults from higher socioeconomic groups are nearly twice as likely to visit as those from lower groups — a 19 percentage point gap that has barely moved in a decade. Meanwhile, Arts Council England funding has fallen 30% in real terms since 2010."
          colour="#6B7280"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Britain has one of the world&apos;s great free museum policies. Since 2001, national museums have offered free entry, and the result has been impressive headline numbers — nearly 50 million visits a year to DCMS-sponsored institutions alone. But those headline figures mask a structural inequality that has barely shifted in a generation. The DCMS Taking Part Survey consistently shows that adults from higher socioeconomic groups attend museums, galleries, and heritage sites at roughly twice the rate of those from lower socioeconomic groups. In 2024, 63% of upper and middle socioeconomic adults had visited a museum or gallery in the past year, compared with just 36% of lower and working socioeconomic adults. That 27 percentage point gap has hovered between 25 and 30 points for the entire decade. Free entry removes the ticket price but not the transport cost, the geographic distance, the time off work, or the sense that these spaces are &quot;not for people like us.&quot;</p>
            <p>Geography is a major driver. London contains a third of all Arts Council England National Portfolio Organisation funding and most of the free national museums. Outside the capital, cultural provision is patchy at best. The Warwick Commission identified &quot;cultural cold spots&quot; — areas with minimal publicly funded arts infrastructure — concentrated in coastal towns, former industrial areas, and rural communities. These are the same places with the lowest participation rates. The creative industries, which contribute over 100 billion pounds to the UK economy, draw their workforce disproportionately from London and the South East, from graduates, and from higher-income families. Just 16% of workers in music, performing, and visual arts come from working-class backgrounds, according to the Social Mobility Commission. Culture both reflects and reinforces existing inequalities.</p>
            <p>Funding cuts have made things worse. Arts Council England&apos;s grant-in-aid has fallen roughly 30% in real terms since 2010, forcing regional theatres, galleries, and community arts organisations to cut programmes, reduce opening hours, or close entirely. Local authority spending on culture has fallen even further — by more than 40% in real terms in the most deprived areas. The Levelling Up Culture fund and the Arts Council&apos;s own Priority Places programme represent attempts to redirect resources, but they operate against a backdrop of sustained disinvestment. School arts provision has also narrowed: entries for GCSE arts subjects have fallen 47% since 2010, removing a key pipeline through which young people from all backgrounds encounter the arts. The pattern is clear — access to culture in Britain is increasingly shaped by where you live, what your parents earn, and whether anyone in your life ever took you to a gallery.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-attendance', label: 'Attendance gap' },
          { id: 'sec-funding', label: 'Arts funding' },
          { id: 'sec-visits', label: 'Museum visits' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Adult museum/gallery attendance"
            value="43%"
            unit="2024"
            direction="flat"
            polarity="up-is-good"
            changeText="Overall adult attendance rate · largely unchanged since 2015"
            sparklineData={
              data ? sparkFrom(data.attendanceBySocioeconomic.map(d => (d.upperMiddle + d.lowerWorking) / 2)) : []
            }
            source="DCMS · Taking Part Survey, 2024"
            href="#sec-attendance"
          />
          <MetricCard
            label="Deprivation participation gap"
            value={`${deprivationGap}pp`}
            unit="2024"
            direction="flat"
            polarity="up-is-bad"
            changeText="Gap between highest and lowest socioeconomic groups · persistent since 2015"
            sparklineData={
              data ? sparkFrom(data.attendanceBySocioeconomic.map(d => d.upperMiddle - d.lowerWorking)) : []
            }
            source="DCMS · Taking Part Survey, 2024"
            href="#sec-attendance"
          />
          <MetricCard
            label="Arts Council funding (real terms)"
            value={`-${fundingCutPct}%`}
            unit="since 2010"
            direction="down"
            polarity="up-is-good"
            changeText={
              latestFunding && firstFunding
                ? `From £${firstFunding.fundingMillions}m to £${latestFunding.fundingMillions}m in real terms`
                : 'From £694m to £480m in real terms'
            }
            sparklineData={
              data ? sparkFrom(data.artsFundingRealTerms.map(d => d.fundingMillions)) : []
            }
            source="Arts Council England · Annual Report, 2024"
            href="#sec-funding"
          />
        </div>

        {/* Chart 1: Attendance by socioeconomic group */}
        <ScrollReveal>
          <div id="sec-attendance" className="mb-12">
            <LineChart
              series={attendanceSeries}
              title="Museum &amp; gallery attendance by socioeconomic group, 2015–2024"
              subtitle="Percentage of adults attending at least once in the past year. The gap between groups has barely shifted."
              yLabel="% of adults"
              source={{
                name: 'DCMS',
                dataset: 'Taking Part Survey',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 2: Arts funding in real terms */}
        <ScrollReveal>
          <div id="sec-funding" className="mb-12">
            <LineChart
              series={fundingSeries}
              title="Arts Council England grant-in-aid funding, real terms, 2010–2024"
              subtitle="Adjusted for inflation (2024 prices). A sustained 30% decline over 14 years."
              yLabel="£ millions"
              source={{
                name: 'Arts Council England',
                dataset: 'Annual Report and Grant-in-Aid',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 3: Museum visits */}
        <ScrollReveal>
          <div id="sec-visits" className="mb-12">
            <LineChart
              series={museumSeries}
              title="Total visits to DCMS-sponsored museums, 2015–2024"
              subtitle="Millions of visits per year. Pandemic collapse in 2020, near-full recovery by 2023."
              yLabel="Visits (millions)"
              source={{
                name: 'DCMS',
                dataset: 'Sponsored Museums Performance Indicators',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Free national museums and the Levelling Up Culture fund"
            value="2,000+ organisations"
            description="Britain's free national museums policy, introduced in 2001, remains one of the most successful cultural access interventions in the world — DCMS-sponsored museums receive nearly 50 million visits a year with no entry charge. The Arts Council's Priority Places programme now targets 109 'Levelling Up for Culture Places' across England, directing funding to areas with historically low cultural investment. The £125m Levelling Up Culture fund has supported over 200 projects in underserved areas, from new gallery spaces in Wakefield to community arts centres in Hartlepool. These interventions cannot close the participation gap alone, but they represent a recognition that geography and income should not determine who gets to experience culture."
            source="Source: DCMS — Sponsored Museums Performance Indicators, 2024. Arts Council England — Levelling Up for Culture Places, 2024."
          />
        </ScrollReveal>

        <RelatedTopics />
      </main>
    </>
  );
}
