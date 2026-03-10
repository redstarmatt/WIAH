'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import RelatedTopics from '@/components/RelatedTopics';

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
        question="Is British Wildlife Actually Coming Back?"
        finding="The UK biodiversity picture is more complicated than &lsquo;crisis only&rsquo;. 41% of species have declined since 1970 — but red kites went from near-extinction to 10,000 birds in three decades. Beavers, pine martens, and white-tailed eagles are returning. Wildlife can recover when conditions change."
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
            />
            <MetricCard
              label="Farmland bird index (1970=100)"
              value="43"
              unit=""
              direction="down"
              polarity="up-is-good"
              changeText="2021 · Down 57% since 1970 · Grey partridge down 93% · Lapwing down 66% · Corn bunting down 91%"
              sparklineData={[100, 75, 60, 52, 48, 45, 44, 43, 43]}
            />
            <MetricCard
              label="English rivers in good ecological status"
              value="14"
              unit="%"
              direction="flat"
              polarity="up-is-good"
              changeText="2022 · WFD target: 100% by 2027 · Was 16% in 2019 · Sewage, agriculture, and invasive species main causes"
              sparklineData={[26, 22, 19, 17, 16, 14]}
            />
            <MetricCard
              label="Red kites in the UK"
              value="10,000"
              unit="birds"
              direction="up"
              polarity="up-is-good"
              changeText="Up from ~10 breeding pairs in 1990 · RSPB&rsquo;s biggest species success"
              sparklineData={[10, 80, 250, 600, 1200, 2200, 3800, 6000, 8000, 10000]}
            />
          </div>
        </ScrollReveal>

        {/* Farmland Birds Chart */}
        {farmlandBirdsSeries.length > 0 && (
          <ScrollReveal>
            <div className="mb-16">
              <LineChart
                title="Farmland bird index, UK, 1970–2021"
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
                <p className="font-mono text-xs text-wiah-mid mt-6">Source: JNCC/RSPB — State of Nature 2023</p>
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* River Quality Chart */}
        {riverQualitySeries.length > 0 && (
          <ScrollReveal>
            <div className="mb-16">
              <LineChart
                title="English rivers in good ecological status, 2016–2022"
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

        {/* Positive Callouts */}
        <ScrollReveal>
          <PositiveCallout
            title="Red kites: from near-extinction to 10,000 birds"
            value="10,000"
            unit="red kites now in the UK"
            description="In 1990, red kites were functionally extinct in England — a handful of pairs clung on in mid-Wales. A reintroduction programme starting in the Chilterns in 1990 has produced approximately 10,000 birds across the UK, including 6,000 breeding pairs. British-bred kites are now being exported to rewilding projects in Spain and Ireland. The RSPB describes it as the biggest species recovery in UK conservation history. It has been followed by successful beaver reintroductions in at least 15 locations in England and Scotland, pine marten recovery in Wales and southern England, and white-tailed eagle reintroductions in England, reaching 33 breeding pairs by 2024."
            source="Source: Natural England — Red Kite Reintroduction Programme; RSPB — State of Nature 2023."
          />
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Global Commitment: 30×30"
            value="30×30"
            unit="land &amp; seas protected by 2030"
            description="The UK signed the Kunming-Montreal Global Biodiversity Framework at COP15, committing to protect 30% of land and seas by 2030. The Environment Act 2021 introduced mandatory Biodiversity Net Gain (BNG) from January 2024 — requiring a 10% biodiversity gain for all major developments. The Environmental Land Management schemes (SFI, Countryside Stewardship, Landscape Recovery) redirect farming subsidies toward nature. These are the largest reforms of English farming in 50 years. The trajectory of species decline may be worse than the trajectory of recovery — but the direction of policy is, for the first time in decades, firmly toward nature."
            source="Source: JNCC / RSPB — State of Nature 2023; DEFRA — Environmental Land Management Schemes 2024."
          />
        </ScrollReveal>

        {/* Context Section */}
        <ScrollReveal>
          <section className="mt-20 pt-12 border-t border-wiah-border">
            <h2 className="font-sans text-2xl font-bold text-wiah-black mb-6">What's driving these trends?</h2>
            <div className="font-sans text-base text-wiah-black leading-relaxed space-y-4">
              <p>
                The State of Nature 2023 report, compiled by the RSPB, JNCC, and 60-plus wildlife organisations, found that 41% of UK species have declined since 1970 and 15% face extinction. The UK ranks 189th out of 218 nations for biodiversity intactness according to the Natural History Museum's 2021 assessment — behind every G7 peer. Farmland birds have been devastated: the composite index has fallen 57% since 1970, with the grey partridge down 93%, corn bunting down 91%, and lapwing down 66%. The hedgehog population has collapsed by an estimated 95% since 1950, with fewer than one million remaining by the People's Trust for Endangered Species' 2022 count.
              </p>
              <p>
                England's rivers are in poor condition. The Environment Agency's 2022 Water Framework Directive assessment found just 14% in good ecological status — down from 16% in 2019 — and no river achieved &ldquo;high&rdquo; status. Agricultural runoff is the primary driver: 61% of rivers fail on phosphate levels. Sewage discharges and invasive species compound the decline. The UK holds 13% of global peatland, yet 80% is damaged or degraded, releasing an estimated 23 million tonnes of CO2-equivalent annually. Woodland covers just 13% of UK land — England only 10% — against an EU average of 38%. Only 8.5% of UK land sits within statutory protected areas, and 62% of England's SSSIs were in unfavourable condition in 2022, the highest proportion Natural England has recorded.
              </p>
              <p>
                The Environment Act 2021 set legally binding targets including halting net species decline by 2030 and mandating 10% Biodiversity Net Gain for new developments from January 2024. The 30&times;30 commitment, signed at COP15 in Montreal in December 2022, requires 30% of land and seas to be protected by 2030 — up from 8.5% and 26% respectively. Environmental Land Management schemes — Sustainable Farming Incentive, Countryside Stewardship, and Landscape Recovery — are replacing EU Common Agricultural Policy payments, directing funds toward environmental outcomes. Rewilding projects such as Knepp Estate's 3,500 acres in West Sussex and Alladale Wilderness Reserve in Scotland offer proof of concept, though scaling remains the central challenge.
              </p>
              <p>
                Against the bleak backdrop of species loss, rewilding is producing genuinely remarkable results. The red kite, white-tailed eagle, beaver, pine marten, and large blue butterfly have all been successfully reintroduced to parts of England and Wales. Knepp Estate in West Sussex has demonstrated that returning land to natural processes produces extraordinary biodiversity outcomes within a decade. The Environment Act 2021's mandatory Biodiversity Net Gain requirement, the Landscape Recovery tier of Environmental Land Management, and the 30&times;30 commitment represent the most ambitious legislative framework for nature recovery Britain has ever attempted. The State of Nature 2023 report is honest: the aggregate picture is still deteriorating. But the direction of travel is changing, and the evidence from specific reintroductions shows that the damage is not permanent.
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
                        <strong className="text-wiah-black">{src.name}:</strong> 
                        <a href={src.url} target="_blank" rel="noopener noreferrer" className="underline text-wiah-blue">
                          {src.dataset}
                        </a>
                         ({src.frequency})
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
        <RelatedTopics />
    </div>
  );
}
