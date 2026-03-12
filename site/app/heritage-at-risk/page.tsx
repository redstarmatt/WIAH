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

interface RegisterEntry {
  year: number;
  entries: number;
}

interface ListedBuildingPoint {
  year: number;
  count: number;
}

interface ConservationAreaPoint {
  year: number;
  count: number;
}

interface FundingPoint {
  year: number;
  fundingMillions: number;
}

interface RegionData {
  region: string;
  atRiskCount: number;
}

interface HeritageData {
  registerEntries: RegisterEntry[];
  listedBuildingsAtRisk: ListedBuildingPoint[];
  conservationAreasAtRisk: ConservationAreaPoint[];
  heritageFunding: FundingPoint[];
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

export default function HeritageAtRiskPage() {
  const [data, setData] = useState<HeritageData | null>(null);

  useEffect(() => {
    fetch('/data/heritage-at-risk/heritage_at_risk.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const registerSeries: Series[] = data
    ? [{
        id: 'register-entries',
        label: 'Heritage at Risk register entries',
        colour: '#F4A261',
        data: data.registerEntries.map(d => ({
          date: yearToDate(d.year),
          value: d.entries,
        })),
      }]
    : [];

  const listedBuildingsSeries: Series[] = data
    ? [{
        id: 'listed-buildings',
        label: 'Listed buildings at risk',
        colour: '#264653',
        data: data.listedBuildingsAtRisk.map(d => ({
          date: yearToDate(d.year),
          value: d.count,
        })),
      }]
    : [];

  const conservationSeries: Series[] = data
    ? [{
        id: 'conservation-areas',
        label: 'Conservation areas at risk',
        colour: '#E63946',
        data: data.conservationAreasAtRisk.map(d => ({
          date: yearToDate(d.year),
          value: d.count,
        })),
      }]
    : [];

  const registerAnnotations: Annotation[] = [
    { date: new Date(2008, 6, 1), label: '2008: Register expanded to include conservation areas' },
    { date: new Date(2020, 2, 1), label: '2020: COVID disrupts survey fieldwork' },
  ];

  const conservationAnnotations: Annotation[] = [
    { date: new Date(2012, 0, 1), label: '2012: NPPF published' },
  ];

  // ── Derived metrics ───────────────────────────────────────────────────

  const latestRegister = data?.registerEntries[data.registerEntries.length - 1];
  const firstRegister = data?.registerEntries[0];
  const latestListed = data?.listedBuildingsAtRisk[data.listedBuildingsAtRisk.length - 1];
  const firstListed = data?.listedBuildingsAtRisk[0];
  const latestConservation = data?.conservationAreasAtRisk[data.conservationAreasAtRisk.length - 1];
  const firstConservation = data?.conservationAreasAtRisk[0];

  const registerReduction = latestRegister && firstRegister
    ? Math.round(((firstRegister.entries - latestRegister.entries) / firstRegister.entries) * 100)
    : 18;

  const listedReduction = latestListed && firstListed
    ? Math.round(((firstListed.count - latestListed.count) / firstListed.count) * 100)
    : 34;

  return (
    <>
      <TopicNav topic="Heritage at Risk" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Heritage at Risk"
          question="How Much of Britain's Heritage Is at Risk of Being Lost?"
          finding="England has 4,848 historic sites on the Heritage at Risk register, down 18% since 2009 — but the pace of improvement is slowing. Conservation areas at risk have risen every year since records began, and heritage funding has been cut by more than half in real terms."
          colour="#F4A261"
          preposition="with"
        />

        {/* Editorial context */}
        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              The Heritage at Risk register, maintained by Historic England since 2008, is the
              most comprehensive picture of the condition of England's historic environment. It
              covers Grade I and II* listed buildings, scheduled monuments, registered parks and
              gardens, battlefields, protected wreck sites, and conservation areas. The headline
              number — 4,848 entries in 2023 — is 18% lower than the 5,889 recorded in 2009, an
              apparently encouraging trend. But the rate of removal from the register has slowed
              markedly: between 2009 and 2014, an average of 115 sites per year were saved or
              repaired sufficiently to leave the register. Between 2019 and 2023, that average fell
              to just 29 per year. At the current pace, clearing the register would take over a
              century and a half.
            </p>
            <p>
              The picture for listed buildings is more positive. The number of Grade I and II* listed
              buildings at risk has fallen from 4,189 in 2000 to 2,780 in 2023 — a 34% reduction
              driven by Heritage Lottery Fund grants, Section 106 agreements, and tax relief for
              repairs to listed buildings. This is a genuine success story, reflecting decades of
              targeted investment and patient conservation work by local authorities, charities,
              and private owners. Many of the buildings saved were in the North of England, where
              the economics of repair are least favourable and public funding most critical.
            </p>
            <p>
              But the opposite trend is visible in conservation areas. The number of conservation
              areas at risk has risen every year since Historic England began tracking them in 2009,
              from 468 to 563 — a 20% increase. Conservation areas are harder to protect: they
              depend on consistent local authority enforcement of planning controls, and local
              authority planning departments have lost around 40% of their specialist staff since
              2010. Meanwhile, the grant-in-aid funding to Historic England from DCMS has fallen
              from {'\u00A3'}128 million in 2010 to {'\u00A3'}61 million in 2023 in real terms — a cut of more than
              half. The heritage sector increasingly depends on the National Lottery Heritage Fund,
              charitable trusts, and volunteer labour to fill the gap. The risk is that a slow
              erosion of the historic environment continues beneath the surface of an apparently
              improving headline figure.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-register', label: 'Register entries' },
          { id: 'sec-listed', label: 'Listed buildings' },
          { id: 'sec-conservation', label: 'Conservation areas' },
          { id: 'sec-regional', label: 'Regional' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Heritage at Risk register entries"
            value={latestRegister ? latestRegister.entries.toLocaleString() : '4,848'}
            unit="2023"
            direction="down"
            polarity="up-is-bad"
            changeText={`Down ${registerReduction}% since 2009 · but pace of improvement slowing`}
            sparklineData={
              data ? sparkFrom(data.registerEntries.map(d => d.entries)) : [5889,5700,5500,5300,5100,4950,4848]
            }
            source="Historic England — Heritage at Risk Register, Oct 2023"
            href="#sec-register"
          />
          <MetricCard
            label="Listed buildings at risk (England)"
            value={latestListed ? latestListed.count.toLocaleString() : '2,780'}
            unit="2023"
            direction="down"
            polarity="up-is-bad"
            changeText={`Down ${listedReduction}% since 2000 · grants and tax incentives working`}
            sparklineData={
              data ? sparkFrom(data.listedBuildingsAtRisk.map(d => d.count)) : [4189,3800,3400,3200,3000,2900,2780]
            }
            source="Historic England — Heritage Counts, 2023"
            href="#sec-listed"
          />
          <MetricCard
            label="Conservation areas at risk"
            value={latestConservation ? latestConservation.count.toLocaleString() : '563'}
            unit="2023"
            direction="up"
            polarity="up-is-bad"
            changeText={
              latestConservation && firstConservation
                ? `Up ${Math.round(((latestConservation.count - firstConservation.count) / firstConservation.count) * 100)}% since 2009 · rising every year`
                : 'Up 20% since 2009 · rising every year'
            }
            sparklineData={
              data ? sparkFrom(data.conservationAreasAtRisk.map(d => d.count)) : [468,490,512,535,549,556,563]
            }
            source="Historic England — Heritage at Risk Register, Oct 2023"
            href="#sec-conservation"
          />
        </div>

        {/* Chart 1: Heritage at Risk register entries */}
        <ScrollReveal>
          <div id="sec-register" className="mb-12">
            <LineChart
              series={registerSeries}
              annotations={registerAnnotations}
              title="Heritage at Risk register entries, England, 2009-2023"
              subtitle="Total entries on Historic England's Heritage at Risk register. Includes listed buildings, scheduled monuments, parks, gardens, battlefields, and conservation areas."
              yLabel="Register entries"
              source={{
                name: 'Historic England',
                dataset: 'Heritage at Risk Register',
                frequency: 'annual',
                url: 'https://historicengland.org.uk/advice/heritage-at-risk/search-register/',
                date: 'Oct 2023',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 2: Listed buildings at risk */}
        <ScrollReveal>
          <div id="sec-listed" className="mb-12">
            <LineChart
              series={listedBuildingsSeries}
              title="Grade I and II* listed buildings at risk, England, 2000-2023"
              subtitle="A genuine success story: targeted investment has reduced the number of listed buildings at risk by a third since 2000."
              yLabel="Buildings at risk"
              source={{
                name: 'Historic England',
                dataset: 'Heritage Counts — Listed Buildings at Risk',
                frequency: 'annual',
                url: 'https://historicengland.org.uk/research/heritage-counts/',
                date: 'Oct 2023',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 3: Conservation areas at risk */}
        <ScrollReveal>
          <div id="sec-conservation" className="mb-12">
            <LineChart
              series={conservationSeries}
              annotations={conservationAnnotations}
              title="Conservation areas at risk, England, 2009-2023"
              subtitle="Rising every year since records began. Local authority planning capacity has been cut by 40% since 2010."
              yLabel="Conservation areas at risk"
              source={{
                name: 'Historic England',
                dataset: 'Heritage at Risk Register — Conservation Areas',
                frequency: 'annual',
                url: 'https://historicengland.org.uk/advice/heritage-at-risk/search-register/',
                date: 'Oct 2023',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Regional variation */}
        <ScrollReveal>
          <div id="sec-regional" className="mb-12">
            <div className="bg-white rounded-lg border border-wiah-border p-8">
              <h2 className="text-lg font-bold text-wiah-black mb-2">
                Heritage at Risk entries by region (England, 2023)
              </h2>
              <p className="text-sm text-wiah-mid mb-6">
                The North West and Yorkshire have the highest concentrations of at-risk heritage, reflecting both the density of industrial heritage and the economics of repair in post-industrial areas.
              </p>
              <div className="mt-6 space-y-4">
                {data?.byRegion.map((r) => {
                  const maxCount = data.byRegion[0]?.atRiskCount ?? 712;
                  const pct = (r.atRiskCount / maxCount) * 100;
                  return (
                    <div key={r.region}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-wiah-black">{r.region}</span>
                        <span className="font-mono text-sm font-bold text-wiah-black">{r.atRiskCount}</span>
                      </div>
                      <div className="h-6 bg-wiah-light rounded-sm overflow-hidden">
                        <div
                          className="h-full rounded-sm transition-all"
                          style={{ width: `${pct}%`, backgroundColor: '#F4A261' }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="font-mono text-xs text-wiah-mid mt-4">Source: Historic England — Heritage at Risk Register, Oct 2023</p>
            </div>
          </div>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Listed buildings: a conservation success story"
            value="1,409"
            unit="buildings saved since 2000"
            description="The number of Grade I and II* listed buildings at risk has fallen by a third since 2000, from 4,189 to 2,780. This reflects sustained investment through the Heritage Lottery Fund, English Heritage (now Historic England) repair grants, and tax relief schemes. Many of the most significant rescues have been in the North of England — former mills, chapels, and civic buildings that anchor community identity. The Heritage at Risk programme itself deserves credit: by publicly naming at-risk buildings and working with owners, it has created both the reputational pressure and the practical support needed to drive repair. This is what long-term, evidence-led policy can achieve."
            source="Source: Historic England — Heritage Counts, 2023. Heritage Lottery Fund annual reports."
          />
        </ScrollReveal>

        {/* Sources & Methodology */}
        <ScrollReveal>
          <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
            <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
            <div className="text-sm text-wiah-mid font-mono space-y-2">
              <p>
                <a href="https://historicengland.org.uk/advice/heritage-at-risk/search-register/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Historic England — Heritage at Risk Register</a> — primary data source for register entries and conservation areas at risk. Annual publication, typically October. Retrieved Oct 2023.
              </p>
              <p>
                <a href="https://historicengland.org.uk/research/heritage-counts/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Historic England — Heritage Counts</a> — listed buildings at risk time series. Annual publication. Retrieved Oct 2023.
              </p>
              <p>
                <a href="https://www.gov.uk/government/statistics/dcms-economic-estimates-2023" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DCMS — Sectors Economic Estimates</a> — heritage funding figures (grant-in-aid in real terms, 2023 prices). Retrieved Nov 2025.
              </p>
              <p>
                Register methodology expanded in 2008 to include conservation areas — pre/post totals are not directly comparable. COVID-19 disrupted 2020 and 2021 survey fieldwork; some entries were carried forward without re-inspection. Funding figures exclude National Lottery Heritage Fund grants. All figures are for England unless otherwise stated.
              </p>
            </div>
          </section>
        </ScrollReveal>

        <RelatedTopics />
      </main>
    </>
  );
}
