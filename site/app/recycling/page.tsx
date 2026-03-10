'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

// ── Types ─────────────────────────────────────────────────────────────────────

interface RatePoint {
  year: number;
  rate: number;
}

interface ExportPoint {
  year: number;
  totalKt: number;
}

interface MaterialFate {
  material: string;
  recycledPct: number;
  colour: string;
}

interface PlasticType {
  code: string;
  example: string;
  recycled: boolean;
}

interface LAEntry {
  name: string;
  region: string;
  rate: number;
}

interface RecyclingData {
  topic: string;
  lastUpdated: string;
  national: {
    recyclingRate: {
      timeSeries: RatePoint[];
      target2035: number;
      wales2023: number;
      scotland2023: number;
    };
    wasteExports: {
      timeSeries: ExportPoint[];
      chinaBanYear: number;
      chinaBanLabel: string;
    };
    materialFate: MaterialFate[];
    plasticTypes: PlasticType[];
  };
  localAuthority: {
    englandAverage: number;
    bestPerformers: LAEntry[];
    worstPerformers: LAEntry[];
    distribution: {
      under30: number;
      '30to40': number;
      '40to50': number;
      '50to60': number;
      above60: number;
    };
  };
  metadata: {
    sources: { name: string; dataset: string; url: string; frequency: string }[];
    methodology: string;
    knownIssues: string[];
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 0, 1);
}

const TOPIC_COLOUR = '#5C7A4E';

// ── Page ─────────────────────────────────────────────────────────────────────

export default function RecyclingPage() {
  const [data, setData] = useState<RecyclingData | null>(null);

  useEffect(() => {
    fetch('/data/recycling/recycling.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // Recycling rate series + comparators
  const rateSeries: Series[] = data
    ? [
        {
          id: 'england',
          label: 'England',
          colour: TOPIC_COLOUR,
          data: data.national.recyclingRate.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.rate,
          })),
        },
      ]
    : [];

  const rateAnnotations: Annotation[] = [
    { date: new Date(2011, 0), label: '2011: Rate stalls at ~44%' },
    { date: new Date(2018, 0), label: "2018: China's waste import ban" },
  ];

  // Exports series
  const exportSeries: Series[] = data
    ? [
        {
          id: 'exports',
          label: 'Waste sent overseas for recycling (kt)',
          colour: '#E63946',
          data: data.national.wasteExports.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.totalKt,
          })),
        },
      ]
    : [];

  const exportAnnotations: Annotation[] = [
    { date: new Date(2018, 0), label: "2018: China's National Sword — mixed waste imports banned" },
  ];

  const latest = data?.national.recyclingRate.timeSeries.at(-1);
  const peakRate = data
    ? Math.max(...data.national.recyclingRate.timeSeries.map(d => d.rate))
    : null;

  const bestLA = data?.localAuthority.bestPerformers[0];
  const worstLA = data?.localAuthority.worstPerformers[0];

  return (
    <>
      <TopicNav topic="Recycling" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Recycling"
          question="Where Does Your Recycling Actually Go?"
          finding={
            data && latest
              ? `England recycles ${latest.rate}% of household waste — a rate that has barely moved since 2011. Where you live determines most of the outcome: the best-performing councils recycle more than three times as much as the worst.`
              : "England's recycling rate has stalled below 44% for over a decade — and where you live determines most of the outcome."
          }
          colour={TOPIC_COLOUR}
        />

        <section className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              When you sort your recycling, you&apos;re doing your part — but the journey from your bin
              to a recycled product is longer, messier and more uncertain than most people assume.
              England&apos;s overall recycling rate has been stuck at roughly 44% since 2011, far from
              the government&apos;s 65% target for 2035. But that average conceals a story of profound
              inequality: in South Oxfordshire, two thirds of household waste is recycled; in Tower
              Hamlets, fewer than one in five bins make it through.
            </p>
            <p>
              Even collected recycling faces barriers. About 18% of material arriving at sorting
              facilities is rejected as contaminated — a yoghurt carton with food residue, a plastic bag
              wrapped around loose cans — and goes to landfill or incineration instead. Plastic is the
              weakest link: only types 1 and 2 are reliably processed in the UK; the other five plastic
              codes rarely have a viable domestic end market. Until 2018, much of the remainder was
              shipped to China. Since Beijing banned imports, the UK has scrambled to find new routes —
              Turkey, Malaysia, Indonesia — with significantly less oversight at the other end.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-rate', label: 'Recycling rate' },
          { id: 'sec-councils', label: 'Your council' },
          { id: 'sec-materials', label: 'By material' },
          { id: 'sec-exports', label: 'Exports' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        {/* ── Metric Cards ──────────────────────────────────────────────────────── */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="England recycling rate"
              value={latest ? latest.rate.toString() : '43.8'}
              unit="%"
              direction="down"
              polarity="up-is-good"
              changeText={peakRate ? `down from peak of ${peakRate}% in 2017 · target: 65% by 2035` : 'stuck below 44% since 2011 · target: 65% by 2035'}
              baseline="Local authority collected household waste, 2023"
              source="DEFRA — WasteDataFlow, 2023"
            />
            <MetricCard
              label="Best vs worst council"
              value={bestLA && worstLA ? `${bestLA.rate}% vs ${worstLA.rate}%` : '66% vs 19%'}
              direction="flat"
              polarity="neutral"
              changeText={bestLA && worstLA ? `${bestLA.name} vs ${worstLA.name} — a 47 percentage point gap` : '47 percentage point gap between best and worst'}
              baseline="Local authority recycling rates, 2022/23"
              source="DEFRA — WasteDataFlow, 2022/23"
            />
            <MetricCard
              label="Plastic recycling rate"
              value="44"
              unit="%"
              direction="flat"
              polarity="up-is-good"
              changeText="lowest of all main materials · paper & card: 87%"
              baseline="Packaging waste recycling by material, England 2023"
              source="DEFRA — National Packaging Waste Database, 2023"
            />
          </div>
        

        {/* ── Section: Recycling Rate ───────────────────────────────────────────── */}
        <ScrollReveal>
          <div id="sec-rate" className="mb-16">
            {rateSeries.length > 0 ? (
              <LineChart
                title="England household recycling rate, 2000–2023"
                subtitle="Local authority collected waste. The rate rose steadily to 2017, then stalled. Wales (56%) significantly outperforms; the 65% target by 2035 looks remote."
                series={rateSeries}
                annotations={rateAnnotations}
                targetLine={{ value: 65, label: 'Target: 65% by 2035' }}
                yLabel="Percent (%)"
                source={{
                  name: 'DEFRA',
                  dataset: 'Local authority collected waste management statistics (WasteDataFlow)',
                  frequency: 'annual',
                  url: 'https://www.gov.uk/government/statistical-data-sets/env18-local-authority-collected-waste-annual-results-tables',
                }}
              />
            ) : (
              <div className="h-96 bg-wiah-light rounded animate-pulse" />
            )}

            {data && (
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { label: 'England', value: `${data.national.recyclingRate.timeSeries.at(-1)?.rate}%`, colour: TOPIC_COLOUR },
                  { label: 'Wales', value: `${data.national.recyclingRate.wales2023}%`, colour: '#2A9D8F' },
                  { label: 'Scotland', value: `${data.national.recyclingRate.scotland2023}%`, colour: '#6B7280' },
                ].map(({ label, value, colour }) => (
                  <div key={label} className="border border-wiah-border rounded p-4">
                    <div className="text-xs font-mono text-wiah-mid mb-1">{label}</div>
                    <div className="text-2xl font-mono font-bold" style={{ color: colour }}>{value}</div>
                    <div className="text-xs font-mono text-wiah-mid mt-1">recycling rate, 2023</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </ScrollReveal>

        {/* ── Section: Council Variation ────────────────────────────────────────── */}
        <ScrollReveal>
          <div id="sec-councils" className="mb-16">
            <h3 className="text-lg font-bold text-wiah-black mb-1">
              The postcode lottery: recycling rates by council, 2022/23
            </h3>
            <p className="text-sm text-wiah-mid font-mono mb-6">
              The gap between the best and worst councils is 47 percentage points. Rural areas consistently outperform dense cities — partly infrastructure, partly housing type, partly collection frequency.
            </p>

            {data ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
                {/* Best performers */}
                <div>
                  <div className="text-xs font-mono text-wiah-mid uppercase tracking-wide mb-3">Highest recycling rates</div>
                  {data.localAuthority.bestPerformers.map(la => (
                    <div key={la.name} className="flex items-center gap-3 mb-2">
                      <div className="w-36 text-xs font-mono text-wiah-black truncate shrink-0">{la.name}</div>
                      <div className="flex-1 bg-wiah-light rounded-sm overflow-hidden h-5">
                        <div
                          className="h-full rounded-sm"
                          style={{ width: `${(la.rate / 70) * 100}%`, backgroundColor: '#2A9D8F' }}
                        />
                      </div>
                      <div className="w-10 text-right text-xs font-mono font-bold text-[#2A9D8F] shrink-0">
                        {la.rate}%
                      </div>
                    </div>
                  ))}
                </div>

                {/* Worst performers */}
                <div>
                  <div className="text-xs font-mono text-wiah-mid uppercase tracking-wide mb-3">Lowest recycling rates</div>
                  {data.localAuthority.worstPerformers.map(la => (
                    <div key={la.name} className="flex items-center gap-3 mb-2">
                      <div className="w-36 text-xs font-mono text-wiah-black truncate shrink-0">{la.name}</div>
                      <div className="flex-1 bg-wiah-light rounded-sm overflow-hidden h-5">
                        <div
                          className="h-full rounded-sm"
                          style={{ width: `${(la.rate / 70) * 100}%`, backgroundColor: '#E63946' }}
                        />
                      </div>
                      <div className="w-10 text-right text-xs font-mono font-bold text-[#E63946] shrink-0">
                        {la.rate}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="h-64 bg-wiah-light rounded animate-pulse" />
            )}

            {/* England average reference line note */}
            {data && (
              <div className="mt-6 flex items-start gap-2 p-4 bg-wiah-light rounded">
                <div className="w-3 h-3 rounded-sm mt-0.5 shrink-0" style={{ backgroundColor: TOPIC_COLOUR }} />
                <p className="text-sm font-mono text-wiah-mid">
                  England average: <strong className="text-wiah-black">{data.localAuthority.englandAverage}%</strong>.
                  Of 331 local authorities in England,{' '}
                  <strong className="text-wiah-black">332 councils</strong> miss the 65% target — none reach it.
                  8 councils recycle below 30%; 22 exceed 60%.
                </p>
              </div>
            )}

            <p className="font-mono text-[11px] text-wiah-mid mt-4">
              <a
                href="https://www.gov.uk/government/statistical-data-sets/env18-local-authority-collected-waste-annual-results-tables"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Source: DEFRA — Local authority collected waste management statistics (WasteDataFlow), 2022/23. England only.
              </a>
            </p>
          </div>
        </ScrollReveal>

        {/* ── Section: Material Fate ────────────────────────────────────────────── */}
        <ScrollReveal>
          <div id="sec-materials" className="mb-16">
            <h3 className="text-lg font-bold text-wiah-black mb-1">
              How much of each material is actually recycled?
            </h3>
            <p className="text-sm text-wiah-mid font-mono mb-6">
              Garden waste and paper are reliably recycled. Plastic tells a different story — and within plastic, it depends on which type you&apos;re looking at.
            </p>

            {data ? (
              <>
                <div className="space-y-2 mb-8">
                  {data.national.materialFate.map(m => (
                    <div key={m.material} className="flex items-center gap-3">
                      <div className="w-28 text-right text-xs font-mono text-wiah-mid shrink-0">
                        {m.material}
                      </div>
                      <div className="flex-1 bg-wiah-light rounded-sm overflow-hidden h-6">
                        <div
                          className="h-full rounded-sm"
                          style={{ width: `${m.recycledPct}%`, backgroundColor: m.colour }}
                        />
                      </div>
                      <div className="w-10 text-right text-xs font-mono font-bold shrink-0" style={{ color: m.colour }}>
                        {m.recycledPct}%
                      </div>
                    </div>
                  ))}
                </div>

                {/* Plastic type breakdown */}
                <h4 className="text-base font-bold text-wiah-black mb-1 mt-10">
                  Which plastic types are actually recycled in the UK?
                </h4>
                <p className="text-sm text-wiah-mid font-mono mb-4">
                  The chasing-arrows symbol means a plastic <em>can</em> technically be recycled — not that it will be. Only types 1, 2 and (sometimes) 5 have consistent UK collection and end markets.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-wiah-border">
                        <th className="text-left font-mono text-xs text-wiah-mid pb-2 pr-4">Code</th>
                        <th className="text-left font-mono text-xs text-wiah-mid pb-2 pr-4">Common uses</th>
                        <th className="text-left font-mono text-xs text-wiah-mid pb-2">Recycled in UK?</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.national.plasticTypes.map(p => (
                        <tr key={p.code} className="border-b border-wiah-border/50">
                          <td className="py-2 pr-4 font-mono text-xs font-bold text-wiah-black">{p.code}</td>
                          <td className="py-2 pr-4 font-mono text-xs text-wiah-mid">{p.example}</td>
                          <td className="py-2">
                            <span
                              className="inline-block px-2 py-0.5 rounded text-xs font-mono font-bold text-white"
                              style={{ backgroundColor: p.recycled ? '#2A9D8F' : '#E63946' }}
                            >
                              {p.recycled ? 'Yes' : 'No'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              <div className="h-64 bg-wiah-light rounded animate-pulse" />
            )}

            <p className="font-mono text-[11px] text-wiah-mid mt-6">
              <a
                href="https://www.gov.uk/government/statistics/uk-waste-data"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Source: DEFRA — National Packaging Waste Database / UK Statistics on Waste, 2023. Material fate figures are estimates.
              </a>
            </p>
          </div>
        </ScrollReveal>

        {/* ── Section: Exports ─────────────────────────────────────────────────── */}
        <ScrollReveal>
          <div id="sec-exports" className="mb-16">
            {exportSeries.length > 0 ? (
              <LineChart
                title="UK waste exports sent overseas for recycling, 2012–2022"
                subtitle="After China banned mixed waste imports in 2018, UK exports fell sharply. Shipments redirected to Turkey, Malaysia and Vietnam — where processing standards and oversight vary widely."
                series={exportSeries}
                annotations={exportAnnotations}
                yLabel="Kilotonnes (kt)"
                source={{
                  name: 'DEFRA / Environment Agency',
                  dataset: 'UK Statistics on Waste — overseas waste shipments',
                  frequency: 'annual',
                  url: 'https://www.gov.uk/government/statistical-data-sets/waste-statistics',
                }}
              />
            ) : (
              <div className="h-96 bg-wiah-light rounded animate-pulse" />
            )}

            <div className="mt-6 max-w-2xl">
              <p className="text-sm text-wiah-mid font-mono leading-relaxed">
                Before 2018, China accepted much of the world&apos;s mixed plastic waste. When it
                stopped, the UK had to find alternative routes. Exports fell from a peak of 2,060 kt
                in 2017 to under 940 kt by 2022 — in part because some material can now be processed
                domestically, but also because contaminated streams were simply diverted to incineration.
                The Basel Convention amendments in 2021 added restrictions on exporting mixed or
                contaminated plastic to non-OECD countries, tightening the options further.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* ── Context block ─────────────────────────────────────────────────────── */}
        <ScrollReveal>
          <div className="max-w-2xl mb-16 p-6 bg-wiah-light rounded">
            <h3 className="text-base font-bold text-wiah-black mb-3">What&apos;s changing</h3>
            <div className="text-sm text-wiah-black leading-[1.7] space-y-3">
              <p>
                <strong>Simpler recycling labels.</strong> From 2026, new OPRL rules require all packaging to carry
                a binary &ldquo;Recycle&rdquo; or &ldquo;Don&apos;t Recycle&rdquo; label — replacing the confusing
                patchwork of local guidance. Early evidence from pilot councils shows contamination rates
                fall significantly with clearer messaging.
              </p>
              <p>
                <strong>Extended Producer Responsibility (EPR).</strong> From October 2025, packaging producers
                bear the full cost of recycling their materials — estimated at £1.7 billion annually.
                This creates a direct financial incentive to design lighter, genuinely recyclable packaging.
                Early evidence suggests companies are reformulating products to reduce plastic complexity.
              </p>
              <p>
                <strong>Deposit Return Scheme.</strong> A DRS for drinks bottles and cans launches in England
                in October 2027, following Scotland&apos;s troubled rollout. A 20p deposit should push
                return rates for these materials above 80% — but beverages are a small fraction of
                total plastic waste.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* ── Sources ─────────────────────────────────────────────────────────── */}
        <section id="sec-sources" className="mt-16 pt-12 border-t border-wiah-border">
          <h2 className="text-lg font-bold text-wiah-black mb-6">Sources &amp; Methodology</h2>
          {data ? (
            <>
              <div className="space-y-3 mb-8">
                {data.metadata.sources.map(s => (
                  <div key={s.dataset} className="font-mono text-xs text-wiah-mid">
                    <a href={s.url} target="_blank" rel="noopener noreferrer" className="hover:underline text-wiah-black">
                      {s.name} — {s.dataset}
                    </a>
                    {' '}· Updated {s.frequency.toLowerCase()}
                  </div>
                ))}
              </div>
              <div className="font-mono text-xs text-wiah-mid leading-relaxed mb-6 max-w-2xl">
                {data.metadata.methodology}
              </div>
              {data.metadata.knownIssues.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold text-wiah-black mb-2">Known issues</h3>
                  <ul className="space-y-1">
                    {data.metadata.knownIssues.map((issue, i) => (
                      <li key={i} className="font-mono text-xs text-wiah-mid flex gap-2">
                        <span className="shrink-0">—</span>
                        <span>{issue}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          ) : (
            <div className="h-32 bg-wiah-light rounded animate-pulse" />
          )}
        </section>
              <RelatedTopics />
      </main>
    </>
  );
}
