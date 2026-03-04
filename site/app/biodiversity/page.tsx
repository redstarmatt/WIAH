'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';

interface FarmlandBirdData {
  timeSeries: { year: number; index: number }[];
  latestYear: number;
  latestIndex: number;
  note: string;
}

interface RiverQualityData {
  timeSeries: { year: number; goodStatusPct: number }[];
  latestYear: number;
  latestPct: number;
  wfdTarget: number;
  note: string;
}

interface SpeciesStatusData {
  status: string;
  pct: number;
}

interface LandProtectionData {
  protectedLandPct: number;
  protectedSeasPct: number;
  target30x30LandPct: number;
  target30x30SeasPct: number;
  note: string;
}

interface SssiConditionData {
  favourablePct: number;
  unfavourablePct: number;
  totalSSSIs: number;
  note: string;
}

interface BiodiversityData {
  topic: string;
  lastUpdated: string;
  national: {
    farmlandBirds: FarmlandBirdData;
    riverQuality: RiverQualityData;
    speciesStatus: SpeciesStatusData[];
    landProtection: LandProtectionData;
    sssisCondition: SssiConditionData;
  };
  metadata: {
    sources: { name: string; dataset: string; url: string; frequency: string }[];
    methodology: string;
    knownIssues: string[];
  };
}

function calendarYearToDate(y: number): Date {
  return new Date(y, 0, 1);
}

export default function BiodiversityPage() {
  const [data, setData] = useState<BiodiversityData | null>(null);

  useEffect(() => {
    fetch('/data/biodiversity/biodiversity.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // Farmland birds series
  const farmlandBirdsSeries: Series[] = data
    ? [
        {
          id: 'farmland-birds',
          label: 'Farmland bird index',
          colour: '#2A9D8F',
          data: data.national.farmlandBirds.timeSeries.map(d => ({
            date: calendarYearToDate(d.year),
            value: d.index,
          })),
        },
      ]
    : [];

  const farmlandBirdsAnnotations: Annotation[] = [
    { date: new Date(1992, 5, 1), label: '1992: Intensified farming subsidies' },
    { date: new Date(2013, 5, 1), label: '2013: CAP reform' },
  ];

  // River quality series
  const riverQualitySeries: Series[] = data
    ? [
        {
          id: 'river-quality',
          label: 'Rivers in good ecological status',
          colour: '#2A9D8F',
          data: data.national.riverQuality.timeSeries.map(d => ({
            date: calendarYearToDate(d.year),
            value: d.goodStatusPct,
          })),
        },
      ]
    : [];

  return (
    <div className="min-h-screen bg-white">
      <TopicNav topic="Biodiversity" />

      <TopicHeader
        topic="Biodiversity"
        question="Is British Wildlife Actually Disappearing?"
        finding="41% of UK species have declined since 1970. The UK is one of the most nature-depleted countries in the world, ranking 189th out of 218 nations for biodiversity intactness. Farmland birds have fallen 57%. Just 14% of English rivers are in good ecological status."
        colour="#2A9D8F"
      />

      <div className="max-w-4xl mx-auto px-4 md:px-6 py-12">
        <ScrollReveal>
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <MetricCard
              label="UK species in decline since 1970"
              value="41"
              unit="%"
              direction="up"
              polarity="up-is-bad"
              changeText="State of Nature 2023 · 15% at risk of extinction · Up from 26% declining in 1970 baseline assessment"
              sparklineData={[26, 28, 30, 33, 35, 37, 38, 39, 40, 41]}
              onExpand={() => {}}
            />
            <MetricCard
              label="Farmland bird index (1970=100)"
              value="43"
              unit=""
              direction="down"
              polarity="up-is-good"
              changeText="2021 · Down 57% since 1970 · Grey partridge down 93% · Lapwing down 66% · Corn bunting down 91%"
              sparklineData={[100, 75, 60, 52, 48, 45, 44, 43, 43]}
              onExpand={() => {}}
            />
            <MetricCard
              label="English rivers in good ecological status"
              value="14"
              unit="%"
              direction="flat"
              polarity="up-is-good"
              changeText="2022 · WFD target: 100% by 2027 · Was 16% in 2019 · Sewage, agriculture, and invasive species main causes"
              sparklineData={[26, 22, 19, 17, 16, 14]}
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        {/* Farmland Birds Chart */}
        {farmlandBirdsSeries.length > 0 && (
          <ScrollReveal>
            <div className="mb-16">
              <LineChart
                title="Farmland bird index, UK, 1970&ndash;2021"
                subtitle="Composite trend for 19 specialist farmland species, indexed to 1970 = 100"
                series={farmlandBirdsSeries}
                annotations={farmlandBirdsAnnotations}
                yLabel="Index (1970=100)"
                source={{
                  name: 'DEFRA',
                  dataset: 'Wild bird populations, UK',
                  frequency: 'annual',
                }}
              />
            </div>
          </ScrollReveal>
        )}

        {/* Species Status Bar Chart */}
        {data && (
          <ScrollReveal>
            <div className="mb-16">
              <div className="bg-wiah-light p-8 rounded-lg">
                <h3 className="font-sans font-bold text-xl mb-6 text-wiah-black">UK species by conservation status</h3>
                <div className="space-y-4">
                  {data.national.speciesStatus.map((item, idx) => {
                    const maxPct = 59;
                    const barWidth = (item.pct / maxPct) * 100;
                    return (
                      <div key={idx}>
                        <div className="flex justify-between mb-2">
                          <span className="font-sans text-sm font-semibold text-wiah-black">{item.status}</span>
                          <span className="font-mono text-sm font-semibold text-wiah-black">{item.pct}%</span>
                        </div>
                        <div className="h-8 bg-wiah-border rounded">
                          <div
                            className="h-full bg-wiah-green rounded transition-all"
                            style={{ width: `${barWidth}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
                <p className="font-mono text-xs text-wiah-mid mt-6">Source: JNCC/RSPB &mdash; State of Nature 2023</p>
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* River Quality Chart */}
        {riverQualitySeries.length > 0 && (
          <ScrollReveal>
            <div className="mb-16">
              <LineChart
                title="English rivers in good ecological status, 2016&ndash;2022"
                subtitle="Water Framework Directive assessment. Target: 100% by 2027"
                series={riverQualitySeries}
                yLabel="% in good ecological status"
                source={{
                  name: 'Environment Agency',
                  dataset: 'Water Framework Directive river classification',
                  frequency: 'annual',
                }}
              />
            </div>
          </ScrollReveal>
        )}

        {/* Positive Callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Global Commitment"
            value="30×30"
            unit="land &amp; seas protected by 2030"
            description="The UK signed the Kunming-Montreal Global Biodiversity Framework at COP15 (Montreal, December 2022), committing to protect 30% of land and seas by 2030. The Environment Act 2021 introduced Biodiversity Net Gain (BNG) &mdash; mandatory from January 2024 for major developments, requiring a 10% net gain in biodiversity value. The Environmental Land Management (ELM) scheme replaces EU CAP payments, rewarding farmers for nature-friendly practices. ELMS &mdash; including Sustainable Farming Incentive (SFI), Countryside Stewardship, and Landscape Recovery &mdash; is the largest reform of English farming in 50 years."
            source="Source: JNCC / RSPB &mdash; State of Nature 2023; DEFRA &mdash; Environmental Land Management Schemes 2024."
          />
        </ScrollReveal>

        {/* Context Section */}
        <ScrollReveal>
          <section className="mt-20 pt-12 border-t border-wiah-border">
            <h2 className="font-sans text-2xl font-bold text-wiah-black mb-6">What&apos;s driving these trends?</h2>
            <div className="font-sans text-base text-wiah-black leading-relaxed space-y-4">
              <p>
                The State of Nature 2023 report, compiled by the RSPB, JNCC, and 60-plus wildlife organisations, found that 41% of UK species have declined since 1970 and 15% face extinction. The UK ranks 189th out of 218 nations for biodiversity intactness according to the Natural History Museum&apos;s 2021 assessment &mdash; behind every G7 peer. Farmland birds have been devastated: the composite index has fallen 57% since 1970, with the grey partridge down 93%, corn bunting down 91%, and lapwing down 66%. The hedgehog population has collapsed by an estimated 95% since 1950, with fewer than one million remaining by the People&apos;s Trust for Endangered Species&apos; 2022 count.
              </p>
              <p>
                England&apos;s rivers are in poor condition. The Environment Agency&apos;s 2022 Water Framework Directive assessment found just 14% in good ecological status &mdash; down from 16% in 2019 &mdash; and no river achieved &ldquo;high&rdquo; status. Agricultural runoff is the primary driver: 61% of rivers fail on phosphate levels. Sewage discharges and invasive species compound the decline. The UK holds 13% of global peatland, yet 80% is damaged or degraded, releasing an estimated 23 million tonnes of CO2-equivalent annually. Woodland covers just 13% of UK land &mdash; England only 10% &mdash; against an EU average of 38%. Only 8.5% of UK land sits within statutory protected areas, and 62% of England&apos;s SSSIs were in unfavourable condition in 2022, the highest proportion Natural England has recorded.
              </p>
              <p>
                The Environment Act 2021 set legally binding targets including halting net species decline by 2030 and mandating 10% Biodiversity Net Gain for new developments from January 2024. The 30&times;30 commitment, signed at COP15 in Montreal in December 2022, requires 30% of land and seas to be protected by 2030 &mdash; up from 8.5% and 26% respectively. Environmental Land Management schemes &mdash; Sustainable Farming Incentive, Countryside Stewardship, and Landscape Recovery &mdash; are replacing EU Common Agricultural Policy payments, directing funds toward environmental outcomes. Rewilding projects such as Knepp Estate&apos;s 3,500 acres in West Sussex and Alladale Wilderness Reserve in Scotland offer proof of concept, though scaling remains the central challenge.
              </p>
            </div>
          </section>
        </ScrollReveal>

        {/* Sources & Methodology */}
        <ScrollReveal>
          <section className="mt-16 pt-12 border-t border-wiah-border">
            <h2 className="font-sans text-2xl font-bold text-wiah-black mb-6">Sources &amp; Methodology</h2>
            {data && (
              <div className="font-sans text-sm space-y-6">
                <div>
                  <h3 className="font-bold text-wiah-black mb-2">Data sources</h3>
                  <ul className="space-y-2">
                    {data.metadata.sources.map((src, idx) => (
                      <li key={idx} className="text-wiah-mid">
                        <strong className="text-wiah-black">{src.name}:</strong>&nbsp;
                        <a href={src.url} target="_blank" rel="noopener noreferrer" className="underline text-wiah-blue">
                          {src.dataset}
                        </a>
                        &nbsp;({src.frequency})
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-wiah-black mb-2">Methodology</h3>
                  <p className="text-wiah-mid">{data.metadata.methodology}</p>
                </div>
                <div>
                  <h3 className="font-bold text-wiah-black mb-2">Known issues</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {data.metadata.knownIssues.map((issue, idx) => (
                      <li key={idx} className="text-wiah-mid">
                        {issue}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </section>
        </ScrollReveal>

      </div>
    </div>
  );
}
