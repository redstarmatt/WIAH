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
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'MHCLG', dataset: 'Rough Sleeping Snapshot in England, Autumn 2023', url: 'https://www.gov.uk/government/statistics/rough-sleeping-snapshot-in-england-autumn-2023', date: '2024', note: '320 veterans on a single night, down 45% from 2010 peak' },
  { num: 2, name: "Office for Veterans' Affairs", dataset: 'Op FORTITUDE Annual Report', url: 'https://www.gov.uk/government/publications/veterans-strategy-action-plan-2022-to-2024', date: '2024', note: '1,200+ veterans housed since 2021' },
  { num: 3, name: 'DLUHC', dataset: 'Statutory Homelessness Statistics', url: 'https://www.gov.uk/government/collections/homelessness-statistics', date: '2024', note: 'Veteran assessments down 32% since 2012' },
  { num: 4, name: 'Forces in Mind Trust', dataset: 'Veterans and homelessness research', url: 'https://www.fim-trust.org/', date: '2023', note: 'True homelessness estimated 3-5x visible count' },
];

// ── Types ────────────────────────────────────────────────────────────────────

interface RoughSleepingPoint {
  year: number;
  count: number;
}

interface HomelessAssessmentPoint {
  year: number;
  assessments: number;
}

interface SupportedHousingPoint {
  year: number;
  units: number;
}

interface RegionData {
  region: string;
  veteransRoughSleeping: number;
}

interface VeteranRoughSleepingData {
  roughSleeping: RoughSleepingPoint[];
  homelessAssessments: HomelessAssessmentPoint[];
  supportedHousing: SupportedHousingPoint[];
  byRegion: RegionData[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 0, 1);
}

function sparkFrom(arr: number[], n = 10) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function VeteranRoughSleepingPage() {
  const [data, setData] = useState<VeteranRoughSleepingData | null>(null);

  useEffect(() => {
    fetch('/data/veteran-rough-sleeping/veteran_rough_sleeping.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const roughSleepingSeries: Series[] = data
    ? [{
        id: 'rough-sleeping',
        label: 'Veterans sleeping rough (autumn snapshot)',
        colour: '#6B7280',
        data: data.roughSleeping.map(d => ({
          date: yearToDate(d.year),
          value: d.count,
        })),
      }]
    : [];

  const roughSleepingAnnotations: Annotation[] = [
    { date: new Date(2020, 0, 1), label: "2020: 'Everyone In' COVID policy" },
    { date: new Date(2021, 0, 1), label: '2021: Op FORTITUDE launched' },
  ];

  const homelessSeries: Series[] = data
    ? [{
        id: 'homeless-assessments',
        label: 'Veterans assessed as homeless (annual)',
        colour: '#E63946',
        data: data.homelessAssessments.map(d => ({
          date: yearToDate(d.year),
          value: d.assessments,
        })),
      }]
    : [];

  const homelessAnnotations: Annotation[] = [
    { date: new Date(2018, 3, 1), label: '2018: Homelessness Reduction Act' },
  ];

  const supportedHousingSeries: Series[] = data
    ? [{
        id: 'supported-housing',
        label: 'Specialist veteran housing units',
        colour: '#2A9D8F',
        data: data.supportedHousing.map(d => ({
          date: yearToDate(d.year),
          value: d.units,
        })),
      }]
    : [];

  const supportedHousingAnnotations: Annotation[] = [
    { date: new Date(2018, 0, 1), label: '2018: Armed Forces Covenant Fund' },
    { date: new Date(2022, 0, 1), label: "2022: Veterans' Strategy Action Plan" },
  ];

  // ── Derived values ────────────────────────────────────────────────────────

  const latestRoughSleeping = data?.roughSleeping[data.roughSleeping.length - 1];
  const peakRoughSleeping = data?.roughSleeping.reduce((a, b) => a.count > b.count ? a : b);
  const latestHomeless = data?.homelessAssessments[data.homelessAssessments.length - 1];
  const firstHomeless = data?.homelessAssessments[0];
  const latestHousing = data?.supportedHousing[data.supportedHousing.length - 1];
  const firstHousing = data?.supportedHousing[0];

  const homelessChange = latestHomeless && firstHomeless
    ? Math.round(((latestHomeless.assessments - firstHomeless.assessments) / firstHomeless.assessments) * 100)
    : -32;

  const housingChange = latestHousing && firstHousing
    ? Math.round(((latestHousing.units - firstHousing.units) / firstHousing.units) * 100)
    : 98;

  return (
    <>
      <TopicNav topic="Veteran Rough Sleeping" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Veteran Rough Sleeping"
          question="Are Veterans Still Sleeping Rough?"
          finding={<>320 veterans were found sleeping rough in England on a single night in autumn 2023 — down from a peak of 580 in 2010.<Cite nums={1} /> Dedicated programmes like Op FORTITUDE and the Armed Forces Covenant housing duty are making measurable progress,<Cite nums={2} /> but self-declaration undercounting means the true figure is almost certainly higher.<Cite nums={4} /></>}
          colour="#6B7280"
          preposition="with"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              The headline figure of 320 veterans sleeping rough on any given night in England comes from the annual MHCLG autumn snapshot — a mix of actual street counts and local authority estimates conducted on a single night. It represents a 45% fall from the 580 recorded in 2010, and the decline has been broadly sustained through two distinct phases: gradual improvement through better local outreach from 2010 to 2019, and then a sharper drop in 2020 when the government&rsquo;s &ldquo;Everyone In&rdquo; COVID response temporarily housed almost all rough sleepers. The count rebounded slightly after pandemic protections ended but settled at a lower baseline, suggesting some of the emergency interventions created lasting housing pathways.<Cite nums={1} />
            </p>
            <p>
              Op FORTITUDE, launched in 2021, is the most significant dedicated intervention. Run by the Office for Veterans&rsquo; Affairs with the Royal British Legion and other charities, it provides a single referral route connecting rough-sleeping veterans to specialist housing, mental health support, and employment services. Since launch, the programme has helped over 1,200 veterans into settled accommodation.<Cite nums={2} /> Meanwhile, the Armed Forces Covenant housing duty — made law in the Armed Forces Act 2021 — requires local authorities to give &ldquo;due regard&rdquo; to veterans&rsquo; service when making housing decisions. The number of specialist veteran housing units has nearly doubled since 2015, reaching an estimated 12,300 in 2023. Veteran homelessness assessments by local authorities have also fallen, from 8,700 in 2012 to 5,900 in 2023 — a 32% reduction.<Cite nums={3} />
            </p>
            <p>
              But there are structural problems these figures cannot capture. Veteran status in homelessness data relies on self-declaration during outreach encounters or local authority assessments. Many veterans do not disclose their service — some because they do not see it as relevant, others because of stigma or distrust of institutions. Research by the Forces in Mind Trust estimates the true number of veterans experiencing homelessness in any form — including sofa-surfing, temporary accommodation, and hidden homelessness — could be three to five times the visible rough sleeping count. Mental health conditions, particularly PTSD and complex trauma, substance misuse, and relationship breakdown remain the dominant drivers. The progress is real, but the denominator is almost certainly larger than anyone is counting.<Cite nums={4} />
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-rough-sleeping', label: 'Rough sleeping' },
          { id: 'sec-assessments', label: 'Homelessness assessments' },
          { id: 'sec-housing', label: 'Supported housing' },
          { id: 'sec-regional', label: 'Regional' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Veterans sleeping rough (autumn snapshot)"
            value={latestRoughSleeping ? latestRoughSleeping.count.toLocaleString() : '320'}
            unit="2023"
            direction="down"
            polarity="up-is-bad"
            changeText={
              latestRoughSleeping && peakRoughSleeping
                ? `Down ${Math.round(((peakRoughSleeping.count - latestRoughSleeping.count) / peakRoughSleeping.count) * 100)}% from ${peakRoughSleeping.year} peak of ${peakRoughSleeping.count}`
                : 'Down 45% from 2010 peak'
            }
            sparklineData={
              data ? sparkFrom(data.roughSleeping.map(d => d.count)) : []
            }
            source="MHCLG — Rough Sleeping Snapshot, Autumn 2023"
            href="#sec-rough-sleeping"
          />
          <MetricCard
            label="Veterans assessed as homeless (annual)"
            value={latestHomeless ? latestHomeless.assessments.toLocaleString() : '5,900'}
            unit="2023"
            direction="down"
            polarity="up-is-bad"
            changeText={`${homelessChange}% since 2012 · Armed Forces Covenant housing duty`}
            sparklineData={
              data ? sparkFrom(data.homelessAssessments.map(d => d.assessments)) : []
            }
            source="DLUHC — Statutory Homelessness Statistics, 2023"
            href="#sec-assessments"
          />
          <MetricCard
            label="Specialist veteran housing units"
            value={latestHousing ? latestHousing.units.toLocaleString() : '12,300'}
            unit="2023"
            direction="up"
            polarity="up-is-good"
            changeText={`+${housingChange}% since 2015 · near-doubled capacity`}
            sparklineData={
              data ? sparkFrom(data.supportedHousing.map(d => d.units)) : []
            }
            source="Office for Veterans' Affairs — Monitoring Returns, 2023"
            href="#sec-housing"
          />
        </div>

        {/* Chart 1: Rough sleeping snapshot */}
        <ScrollReveal>
          <div id="sec-rough-sleeping" className="mb-12">
            <LineChart
              series={roughSleepingSeries}
              annotations={roughSleepingAnnotations}
              title="Veterans sleeping rough on a single night, England, 2010–2023"
              subtitle="Annual autumn snapshot. Combines street counts and evidence-based estimates by local authorities."
              yLabel="Veterans"
              source={{
                name: 'MHCLG',
                dataset: 'Rough Sleeping Snapshot in England',
                frequency: 'annual',
                url: 'https://www.gov.uk/government/statistics/rough-sleeping-snapshot-in-england-autumn-2023',
                date: 'Feb 2024',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 2: Homelessness assessments */}
        <ScrollReveal>
          <div id="sec-assessments" className="mb-12">
            <LineChart
              series={homelessSeries}
              annotations={homelessAnnotations}
              title="Veterans assessed as homeless by local authorities, England, 2012–2023"
              subtitle="Annual assessments where armed forces history was recorded. Down 32% over the period."
              yLabel="Assessments"
              source={{
                name: 'DLUHC',
                dataset: 'Statutory Homelessness Statistics',
                frequency: 'quarterly',
                url: 'https://www.gov.uk/government/collections/homelessness-statistics',
                date: 'Feb 2024',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 3: Supported housing growth */}
        <ScrollReveal>
          <div id="sec-housing" className="mb-12">
            <LineChart
              series={supportedHousingSeries}
              annotations={supportedHousingAnnotations}
              title="Specialist veteran housing units, England, 2015–2023"
              subtitle="Dedicated accommodation provided by veteran housing charities and registered providers."
              yLabel="Housing units"
              source={{
                name: "Office for Veterans' Affairs",
                dataset: 'Veteran Housing Monitoring Returns',
                frequency: 'annual',
                url: 'https://www.gov.uk/government/publications/veterans-strategy-action-plan-2022-to-2024',
                date: 'Feb 2024',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Regional variation */}
        <ScrollReveal>
          <div id="sec-regional" className="mb-12">
            <div className="bg-white rounded-lg border border-wiah-border p-8">
              <h2 className="text-lg font-bold text-wiah-black mb-2">
                Veterans sleeping rough by region, autumn 2023
              </h2>
              <p className="text-sm text-wiah-mid mb-6">
                Estimated count from annual snapshot. London accounts for over a fifth of all veteran rough sleeping.
              </p>
              <div className="mt-6 space-y-4">
                {data?.byRegion.map((r) => {
                  const maxVal = data.byRegion[0]?.veteransRoughSleeping ?? 68;
                  const pct = (r.veteransRoughSleeping / maxVal) * 100;
                  return (
                    <div key={r.region}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-wiah-black">{r.region}</span>
                        <span className="font-mono text-sm font-bold text-wiah-black">{r.veteransRoughSleeping}</span>
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
              <p className="font-mono text-xs text-wiah-mid mt-4">Source: MHCLG — Rough Sleeping Snapshot, Autumn 2023</p>
            </div>
          </div>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Op FORTITUDE delivering measurable results"
            value="1,200+"
            unit="veterans housed since 2021"
            description={<>Op FORTITUDE, launched in 2021 by the Office for Veterans&rsquo; Affairs in partnership with the Royal British Legion, SSAFA, and other service charities, provides a single referral pathway connecting rough-sleeping veterans directly to specialist housing, mental health support, and employment services. Since launch, the programme has helped over 1,200 veterans into settled accommodation.<Cite nums={2} /> The model — a dedicated navigator working across statutory and charitable sectors — has been adopted as a template for veteran support across England, and the Armed Forces Covenant housing duty now gives veterans legal weight in local authority housing decisions.</>}
            source="Source: Office for Veterans' Affairs — Op FORTITUDE Annual Report, 2024. MHCLG — Rough Sleeping Snapshot, Autumn 2023."
          />
        </ScrollReveal>

        {/* Sources & Methodology */}
        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p>
              <a href="https://www.gov.uk/government/statistics/rough-sleeping-snapshot-in-england-autumn-2023" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">MHCLG — Rough Sleeping Snapshot in England, Autumn 2023</a>. Annual single-night count combining street counts with evidence-based estimates. Retrieved Feb 2024.
            </p>
            <p>
              <a href="https://www.gov.uk/government/collections/homelessness-statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DLUHC — Statutory Homelessness Statistics</a>. Quarterly returns from local authorities including armed forces indicator under the Homelessness Reduction Act 2017. Retrieved Feb 2024.
            </p>
            <p>
              <a href="https://www.gov.uk/government/publications/veterans-strategy-action-plan-2022-to-2024" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Office for Veterans&rsquo; Affairs — Veterans&rsquo; Strategy Action Plan</a>. Annual progress report including Op FORTITUDE outcomes and supported housing data. Retrieved Feb 2024.
            </p>
            <p className="mt-4">
              All figures are for England unless otherwise stated. Veteran status relies on self-declaration and is known to undercount. The 2020 figure reflects the temporary &ldquo;Everyone In&rdquo; COVID policy which housed almost all rough sleepers. The Homelessness Reduction Act 2017 changed recording practices from April 2018, limiting direct comparison with earlier data.
            </p>
          </div>
        </section>

        <div className="mt-6 max-w-2xl"><References items={editorialRefs} /></div>

        <RelatedTopics />
      </main>
    </>
  );
}
