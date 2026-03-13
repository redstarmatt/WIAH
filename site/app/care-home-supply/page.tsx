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

interface BedPoint {
  year: number;
  beds: number;
}

interface VacancyPoint {
  year: number;
  rate: number;
}

interface ClosurePoint {
  year: number;
  closures: number;
}

interface FeeGapPoint {
  year: number;
  gapPercent: number;
}

interface RegionData {
  region: string;
  bedsPerThousandOver65: number;
  closureRate: number;
}

interface CareHomeSupplyData {
  totalBeds: BedPoint[];
  vacancyRate: VacancyPoint[];
  closures: ClosurePoint[];
  localAuthorityFeeGap: FeeGapPoint[];
  byRegion: RegionData[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

function sparkFrom(arr: number[], n = 10) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function CareHomeSupplyPage() {
  const [data, setData] = useState<CareHomeSupplyData | null>(null);

  useEffect(() => {
    fetch('/data/care-home-supply/care_home_supply.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const bedsSeries: Series[] = data
    ? [{
        id: 'total-beds',
        label: 'Total registered care home beds',
        colour: '#E63946',
        data: data.totalBeds.map(d => ({
          date: yearToDate(d.year),
          value: d.beds,
        })),
      }]
    : [];

  const bedsAnnotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: '2020: COVID-19 pandemic' },
    { date: new Date(2017, 5, 1), label: '2017: CMA market study' },
  ];

  const closuresSeries: Series[] = data
    ? [{
        id: 'closures',
        label: 'Care home closures per year',
        colour: '#E63946',
        data: data.closures.map(d => ({
          date: yearToDate(d.year),
          value: d.closures,
        })),
      }]
    : [];

  const closuresAnnotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: '2020: COVID closures spike' },
    { date: new Date(2022, 5, 1), label: '2022: Energy cost crisis' },
  ];

  const feeGapSeries: Series[] = data
    ? [{
        id: 'fee-gap',
        label: 'LA fee shortfall vs fair cost of care',
        colour: '#F4A261',
        data: data.localAuthorityFeeGap.map(d => ({
          date: yearToDate(d.year),
          value: d.gapPercent,
        })),
      }]
    : [];

  const feeGapAnnotations: Annotation[] = [
    { date: new Date(2021, 5, 1), label: '2021: Fair Cost of Care exercise' },
    { date: new Date(2023, 5, 1), label: '2023: Social care reforms delayed' },
  ];

  // ── Derived values ────────────────────────────────────────────────────────

  const latestBeds = data?.totalBeds[data.totalBeds.length - 1];
  const firstBeds = data?.totalBeds[0];
  const bedsLost = firstBeds && latestBeds
    ? (firstBeds.beds - latestBeds.beds).toLocaleString()
    : '15,300';

  const latestVacancy = data?.vacancyRate[data.vacancyRate.length - 1];
  const peakVacancy = data?.vacancyRate.reduce((a, b) => a.rate > b.rate ? a : b);

  const latestClosures = data?.closures[data.closures.length - 1];
  const totalClosures = data
    ? data.closures.reduce((sum, d) => sum + d.closures, 0).toLocaleString()
    : '4,356';

  const latestFeeGap = data?.localAuthorityFeeGap[data.localAuthorityFeeGap.length - 1];

  return (
    <>
      <TopicNav topic="Care Home Supply" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Care Home Supply"
          question="Are We Running Out of Care Home Places?"
          finding="England has lost over 15,000 care home beds since 2015 while the over-65 population has grown by 1.3 million. Providers are closing faster than new capacity opens, driven by a widening gap between what local authorities pay and what care actually costs."
          colour="#E63946"
          preposition="with"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              England&apos;s care home sector is caught in a slow-motion contraction. Since 2015, the number of
              registered care home beds has fallen from 462,100 to around 446,800 — a net loss of over 15,000
              places. That decline has happened during a decade in which the population aged 65 and over grew by
              1.3 million. The arithmetic is moving in one direction only: more people who will need residential
              care, fewer beds to put them in. The vacancy rate, which peaked at 12% during the pandemic, has
              since fallen to 7.5% — but that tightening reflects not a healthy market but one where supply is
              being withdrawn faster than demand is being met elsewhere. High occupancy in a shrinking sector
              is not a sign of success; it is a sign of fragility.
            </p>
            <p>
              The primary driver is financial. Local authorities fund roughly 60% of all care home placements,
              and their standard fee rates have fallen further and further behind the actual cost of providing
              care. The Competition and Markets Authority identified this &ldquo;fee gap&rdquo; as the central
              structural problem in its 2017 market study, and it has only widened since. By 2025, local authority
              rates sit an estimated 33% below the fair cost of care as calculated by providers and independent
              analysts. The result is predictable: providers who rely heavily on local authority-funded residents
              operate at a loss, defer maintenance, struggle to recruit staff at competitive wages, and eventually
              close. Between 2015 and 2025, over 4,300 care homes closed across England. COVID-19 accelerated
              the trend — 478 homes closed in 2020 alone — but closures remained elevated long after the pandemic,
              with energy costs, wage inflation, and insurance premiums compounding the underlying funding shortfall.
            </p>
            <p>
              The consequences are not evenly distributed. London has the lowest provision of care home beds
              relative to its elderly population — just 36.4 per thousand over-65s — yet the highest closure rate
              at 5.2% of homes per year, driven by land values that make alternative use of care home sites
              irresistible to property owners. Rural and coastal areas face different pressures: workforce
              recruitment is harder, travel distances increase operating costs, and the homes that close tend to
              be smaller, family-run operations that are not replaced by corporate chains. The government&apos;s
              2021 &ldquo;Fair Cost of Care&rdquo; exercise was intended to address the funding gap, but the
              planned social care charging reforms were delayed in 2023 and the fee uplift that followed was
              widely described as inadequate by provider associations. Without a structural solution to the gap
              between what local authorities can pay and what care costs to deliver, the sector will continue to
              shrink — and the people who need care will face longer waits, fewer choices, and placements further
              from their families and communities.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-beds', label: 'Bed supply' },
          { id: 'sec-closures', label: 'Closures' },
          { id: 'sec-fees', label: 'Fee gap' },
          { id: 'sec-regional', label: 'Regional' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Net care home beds lost since 2015"
            value={bedsLost}
            unit="beds"
            direction="up"
            polarity="up-is-bad"
            changeText={`From ${firstBeds ? firstBeds.beds.toLocaleString() : '462,100'} to ${latestBeds ? latestBeds.beds.toLocaleString() : '446,800'} · over-65 population up 1.3m in same period`}
            sparklineData={
              data ? sparkFrom(data.totalBeds.map(d => firstBeds ? firstBeds.beds - d.beds : 0)) : []
            }
            source="CQC — Registered locations data, 2025"
            href="#sec-beds"
          />
          <MetricCard
            label="Care home closures (2015–2025)"
            value={totalClosures}
            unit="homes"
            direction="up"
            polarity="up-is-bad"
            changeText={`${latestClosures ? latestClosures.closures : 365} closures in ${latestClosures ? latestClosures.year : 2025} · 478 peak in 2020`}
            sparklineData={
              data ? data.closures.map(d => d.closures) : []
            }
            source="CQC — Provider directory, 2025"
            href="#sec-closures"
          />
          <MetricCard
            label="LA fee gap vs fair cost of care"
            value={latestFeeGap ? `${latestFeeGap.gapPercent}%` : '33%'}
            unit="shortfall"
            direction="up"
            polarity="up-is-bad"
            changeText={`Up from 8% in 2015 · rates consistently below cost of delivery`}
            sparklineData={
              data ? data.localAuthorityFeeGap.map(d => d.gapPercent) : []
            }
            source="LaingBuisson / CMA — Fair cost of care analysis, 2025"
            href="#sec-fees"
          />
        </div>

        {/* Chart 1: Total beds */}
        <ScrollReveal>
          <div id="sec-beds" className="mb-12">
            <LineChart
              series={bedsSeries}
              title="Total registered care home beds, England, 2015–2025"
              subtitle="Net bed count has fallen every year for a decade as closures outpace new registrations."
              yLabel="Beds"
              annotations={bedsAnnotations}
              source={{
                name: 'Care Quality Commission',
                dataset: 'Registered locations data',
                frequency: 'annual',
                url: 'https://www.cqc.org.uk/publications/major-reports/state-care',
                date: 'Dec 2025',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 2: Closures per year */}
        <ScrollReveal>
          <div id="sec-closures" className="mb-12">
            <LineChart
              series={closuresSeries}
              title="Care home closures per year, England, 2015–2025"
              subtitle="COVID-19 drove a spike in 2020, but closures remain structurally elevated."
              yLabel="Closures"
              annotations={closuresAnnotations}
              source={{
                name: 'Care Quality Commission',
                dataset: 'Provider directory — deregistrations',
                frequency: 'annual',
                url: 'https://www.cqc.org.uk/publications/major-reports/state-care',
                date: 'Dec 2025',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 3: Fee gap */}
        <ScrollReveal>
          <div id="sec-fees" className="mb-12">
            <LineChart
              series={feeGapSeries}
              title="Local authority fee gap vs fair cost of care, 2015–2025"
              subtitle="The gap between what councils pay and what care costs has quadrupled in a decade."
              yLabel="Fee shortfall (%)"
              annotations={feeGapAnnotations}
              source={{
                name: 'LaingBuisson / Competition and Markets Authority',
                dataset: 'Care home fee analysis',
                frequency: 'annual',
                url: 'https://www.gov.uk/cma-cases/care-homes-market-study',
                date: 'Dec 2025',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Regional variation */}
        <ScrollReveal>
          <div id="sec-regional" className="mb-12">
            <div className="bg-white rounded-lg border border-wiah-border p-8">
              <h2 className="text-lg font-bold text-wiah-black mb-2">
                Care home beds per 1,000 people aged 65+, by region
              </h2>
              <p className="text-sm text-wiah-mid mb-6">
                London has the lowest provision relative to its elderly population, and the highest closure rate.
              </p>
              <div className="mt-6 space-y-4">
                {data?.byRegion
                  .sort((a, b) => b.bedsPerThousandOver65 - a.bedsPerThousandOver65)
                  .map((r) => {
                    const pct = (r.bedsPerThousandOver65 / 55) * 100;
                    return (
                      <div key={r.region}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium text-wiah-black">{r.region}</span>
                          <span className="font-mono text-sm text-wiah-black">
                            <span className="font-bold">{r.bedsPerThousandOver65}</span>
                            <span className="text-wiah-mid ml-2">({r.closureRate}% closure rate)</span>
                          </span>
                        </div>
                        <div className="h-6 bg-wiah-light rounded-sm overflow-hidden">
                          <div
                            className="h-full rounded-sm transition-all"
                            style={{ width: `${pct}%`, backgroundColor: r.bedsPerThousandOver65 < 40 ? '#E63946' : '#6B7280' }}
                          />
                        </div>
                      </div>
                    );
                  })}
              </div>
              <p className="font-mono text-xs text-wiah-mid mt-4">
                Source: CQC registered locations data, ONS mid-year population estimates, 2025
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="New models of care are emerging"
            value="Extra care housing up 18% since 2019"
            description="While traditional care home supply contracts, alternative models are growing. Extra care housing — purpose-built apartments with on-site care available — has expanded by 18% since 2019, offering older people more independence at lower cost. Community-based micro-providers, often employing fewer than 10 carers, are filling gaps in rural areas where larger operators have withdrawn. The NHS Long Term Plan's emphasis on keeping people in their own homes longer has also driven investment in domiciliary care technology, including remote monitoring and falls prevention systems. These approaches do not replace the need for residential care beds, but they are beginning to reshape what 'care in later life' looks like — and for many people, the outcomes are better."
            source="Source: Associated Retirement Community Operators (ARCO), 2025. Skills for Care — Adult Social Care Workforce Data Set, 2025."
          />
        </ScrollReveal>

        <RelatedTopics />

        {/* Sources & Methodology */}
        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p>
              <a href="https://www.cqc.org.uk/publications/major-reports/state-care" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">
                Care Quality Commission
              </a> — The state of health care and adult social care in England. Annual report. Bed counts derived from registered locations data. Vacancy rates from provider surveys.
            </p>
            <p>
              <a href="https://www.gov.uk/cma-cases/care-homes-market-study" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">
                Competition and Markets Authority
              </a> — Care homes market study (2017). Fee gap analysis methodology.
            </p>
            <p>
              <a href="https://www.laingbuisson.com/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">
                LaingBuisson
              </a> — Care Homes for Older People UK Market Report. Annual. Independent fee benchmarking.
            </p>
            <p>
              All figures are for England unless otherwise stated. Regional bed-per-capita figures use ONS mid-year population estimates for the 65+ age group. Some closures recorded by CQC represent re-registrations under new ownership rather than genuine capacity loss; where possible these have been excluded, but some double-counting may remain. COVID-19 caused abnormal patterns in 2020–2021 which are noted in chart annotations.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
