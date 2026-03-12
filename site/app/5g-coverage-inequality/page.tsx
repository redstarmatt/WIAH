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

interface CoveragePoint {
  year: number;
  percent: number;
}

interface RuralUrbanPoint {
  year: number;
  rural: number;
  urban: number;
}

interface GigabitPoint {
  year: number;
  percent: number;
}

interface FiveGCoverageData {
  populationCoverage: CoveragePoint[];
  ruralVsUrban: RuralUrbanPoint[];
  gigabitPremises: GigabitPoint[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

function sparkFrom(arr: number[], n = 10) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function FiveGCoverageInequalityPage() {
  const [data, setData] = useState<FiveGCoverageData | null>(null);

  useEffect(() => {
    fetch('/data/5g-coverage-inequality/5g_coverage_inequality.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const populationCoverageSeries: Series[] = data
    ? [{
        id: '5g-population',
        label: 'UK population 5G coverage',
        colour: '#264653',
        data: data.populationCoverage.map(d => ({
          date: yearToDate(d.year),
          value: d.percent,
        })),
      }]
    : [];

  const ruralUrbanSeries: Series[] = data
    ? [
        {
          id: 'urban',
          label: 'Urban coverage',
          colour: '#264653',
          data: data.ruralVsUrban.map(d => ({
            date: yearToDate(d.year),
            value: d.urban,
          })),
        },
        {
          id: 'rural',
          label: 'Rural coverage',
          colour: '#E63946',
          data: data.ruralVsUrban.map(d => ({
            date: yearToDate(d.year),
            value: d.rural,
          })),
        },
      ]
    : [];

  const gigabitSeries: Series[] = data
    ? [{
        id: 'gigabit',
        label: 'Premises with gigabit broadband',
        colour: '#2A9D8F',
        data: data.gigabitPremises.map(d => ({
          date: yearToDate(d.year),
          value: d.percent,
        })),
      }]
    : [];

  const latestCoverage = data?.populationCoverage[data.populationCoverage.length - 1];
  const prevCoverage = data?.populationCoverage[data.populationCoverage.length - 2];
  const latestRuralUrban = data?.ruralVsUrban[data.ruralVsUrban.length - 1];
  const latestGigabit = data?.gigabitPremises[data.gigabitPremises.length - 1];
  const prevGigabit = data?.gigabitPremises[data.gigabitPremises.length - 2];

  const coverageChange = latestCoverage && prevCoverage
    ? latestCoverage.percent - prevCoverage.percent
    : 5;

  const gigabitChange = latestGigabit && prevGigabit
    ? latestGigabit.percent - prevGigabit.percent
    : 6;

  return (
    <>
      <TopicNav topic="Infrastructure & Services" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Infrastructure & Services"
          question="Who actually has 5G?"
          finding="Half the UK population now has 5G coverage, but in rural areas the figure is just 12%. The urban-rural gap is widening, not closing, and the UK lags well behind international leaders like South Korea at 95%."
          colour="#264653"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              The UK's 5G rollout has reached a headline figure of 50% population coverage, but that number conceals a deepening geographic divide. Coverage is overwhelmingly concentrated in urban centres, where all four major operators now provide service across most of central London, Manchester, Birmingham, and other large cities. Step outside these areas and the picture changes sharply. Rural 5G coverage stands at just 12%, compared with 65% in urban areas — a 53 percentage-point gap that has grown wider each year since commercial 5G launched in 2019. This is not simply a matter of inconvenience. 5G-dependent applications in precision agriculture, remote healthcare, and industrial automation are being trialled in urban testbeds while the communities that could benefit most from remote connectivity remain on 4G or, in some cases, patchy 3G.
            </p>
            <p>
              Several structural factors drive this inequality. Spectrum allocation decisions made by Ofcom have favoured high-frequency bands (3.4–3.8 GHz) that deliver fast speeds but have limited range and poor building penetration — ideal for dense urban areas, less so for scattered rural settlements. The economics of mast deployment are unfavourable in low-density areas: fewer customers per cell site means longer payback periods, and operators have limited commercial incentive to build ahead of demand. Planning objections to new mast installations remain a significant drag on rollout, with local authorities rejecting or delaying applications on visual amenity grounds. Health misinformation about 5G radiation, which surged during the pandemic and led to arson attacks on masts, has left a residual effect on public attitudes and planning committee decisions in some areas. The Shared Rural Network (SRN), a joint initiative between government and the four operators to extend 4G coverage to 95% of the UK landmass by 2025, has made genuine progress — but it addresses 4G, not 5G, and its targets have already slipped.
            </p>
            <p>
              Internationally, the UK sits in the middle of the pack. South Korea has achieved 95% population 5G coverage through state-led industrial strategy and dense urban geography. The United States has pushed past 60% through a combination of mid-band and millimetre-wave spectrum, though with its own rural gaps. Within the UK, devolved nations show significant variation: Scotland's rural coverage trails England's due to more challenging terrain and lower population density, while Northern Ireland has benefited from cross-border spectrum coordination with the Republic of Ireland. Wales, despite the SRN, remains the least-connected nation. The gigabit broadband story is more encouraging — 79% of premises can now access gigabit-capable connections, up from 8% in 2019 — but this is primarily a fixed-line achievement driven by full-fibre rollout, not wireless. The gap between connectivity haves and have-nots is, for now, a 5G story, and it maps almost perfectly onto the UK's existing economic geography.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-population', label: 'Population coverage' },
          { id: 'sec-rural-urban', label: 'Rural vs urban' },
          { id: 'sec-gigabit', label: 'Gigabit broadband' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="UK population 5G coverage"
            value={latestCoverage ? `${latestCoverage.percent}%` : '50%'}
            unit="2025"
            direction="up"
            polarity="up-is-good"
            changeText={`+${coverageChange}pp since last year · up from 0% in 2019`}
            sparklineData={
              data ? sparkFrom(data.populationCoverage.map(d => d.percent)) : []
            }
            source="Ofcom · Connected Nations Report, 2025"
            href="#sec-population"
          />
          <MetricCard
            label="Rural 5G coverage"
            value={latestRuralUrban ? `${latestRuralUrban.rural}%` : '12%'}
            unit="2025"
            direction="up"
            polarity="up-is-good"
            changeText={latestRuralUrban ? `vs ${latestRuralUrban.urban}% urban · 53pp gap` : 'vs 65% urban · 53pp gap'}
            sparklineData={
              data ? sparkFrom(data.ruralVsUrban.map(d => d.rural)) : []
            }
            source="Ofcom · Connected Nations Report, 2025"
            href="#sec-rural-urban"
          />
          <MetricCard
            label="Premises with gigabit broadband"
            value={latestGigabit ? `${latestGigabit.percent}%` : '79%'}
            unit="2025"
            direction="up"
            polarity="up-is-good"
            changeText={`+${gigabitChange}pp since last year · up from 8% in 2019`}
            sparklineData={
              data ? sparkFrom(data.gigabitPremises.map(d => d.percent)) : []
            }
            source="DSIT · UK Gigabit Programme, 2025"
            href="#sec-gigabit"
          />
        </div>

        {/* Chart 1: 5G population coverage */}
        <ScrollReveal>
          <div id="sec-population" className="mb-12">
            <LineChart
              series={populationCoverageSeries}
              title="5G population coverage, UK, 2019–2025"
              subtitle="Percentage of UK population within modelled 5G signal range from at least one operator."
              yLabel="Coverage (%)"
              source={{
                name: 'Ofcom',
                dataset: 'Connected Nations Report',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 2: Rural vs urban coverage */}
        <ScrollReveal>
          <div id="sec-rural-urban" className="mb-12">
            <LineChart
              series={ruralUrbanSeries}
              title="5G coverage: rural vs urban areas, 2020–2025"
              subtitle="The gap between urban and rural 5G coverage has widened each year since launch."
              yLabel="Coverage (%)"
              source={{
                name: 'Ofcom',
                dataset: 'Connected Nations Report — Rural Coverage Analysis',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 3: Gigabit broadband premises */}
        <ScrollReveal>
          <div id="sec-gigabit" className="mb-12">
            <LineChart
              series={gigabitSeries}
              title="Premises with gigabit-capable broadband, UK, 2019–2025"
              subtitle="Full-fibre and upgraded cable network rollout. Up from 8% in 2019 to 79% in 2025."
              yLabel="Premises (%)"
              source={{
                name: 'DSIT',
                dataset: 'UK Gigabit Programme Statistics',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Shared Rural Network and 5G testbeds driving rural progress"
            value="95% 4G target"
            description="The Shared Rural Network (SRN), a public-private partnership backed by £500 million in government funding and £532 million from operators, is extending 4G geographic coverage to 95% of the UK landmass — closing not-spots that have persisted for over a decade. While the SRN addresses 4G rather than 5G, it builds the backhaul and site infrastructure that makes future rural 5G deployment commercially viable. Meanwhile, DSIT-funded 5G testbeds in rural areas — including projects in precision agriculture across the Welsh Valleys, remote veterinary diagnostics in the Scottish Highlands, and smart port operations in Northern Ireland — are demonstrating that 5G is not just an urban technology. These testbeds have shown measurable productivity gains: automated crop monitoring reduced labour costs by 30% in the North Yorkshire farming trial, and remote ultrasound consultations eliminated 85% of patient travel in the Highland health pilot."
            source="Source: DSIT — Shared Rural Network Progress Report, 2025. Ofcom — Connected Nations, 2025. Ookla — UK 5G Performance Analysis, Q4 2025."
          />
        </ScrollReveal>
        <RelatedTopics />
      </main>
    </>
  );
}
