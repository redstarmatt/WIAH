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
  { num: 1, name: 'OHID', dataset: 'Take-home naloxone provision from drug treatment services', url: 'https://www.gov.uk/government/statistics/substance-misuse-treatment-for-adults-statistics-2023-to-2024', date: '2025' },
  { num: 2, name: 'ONS', dataset: 'Deaths related to drug poisoning in England and Wales', url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/birthsdeathsandmarriages/deaths/bulletins/deathsrelatedtodrugpoisoninginenglandandwales', date: '2025' },
  { num: 3, name: 'ACMD', dataset: 'Reducing opioid-related deaths in the UK', url: 'https://www.gov.uk/government/publications/acmd-naloxone-review', date: '2024' },
  { num: 4, name: 'OHID', dataset: 'Pharmacy naloxone pilot evaluation', url: 'https://www.gov.uk/government/publications/pharmacy-naloxone-pilot', date: '2024' },
];

// ── Types ────────────────────────────────────────────────────────────────────

interface PacksPoint {
  year: number;
  packs: number;
}

interface DeathsPoint {
  year: number;
  deaths: number;
}

interface CommunityRatePoint {
  year: number;
  ratePerThousandAtRisk: number;
}

interface RegionData {
  region: string;
  packsPerThousandAtRisk: number;
  deathRate: number;
}

interface NaloxoneData {
  packsDistributed: PacksPoint[];
  overdoseDeaths: DeathsPoint[];
  communityNaloxoneRate: CommunityRatePoint[];
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

export default function NaloxoneProvisionPage() {
  const [data, setData] = useState<NaloxoneData | null>(null);

  useEffect(() => {
    fetch('/data/naloxone-provision/naloxone_provision.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const packsSeries: Series[] = data
    ? [{
        id: 'packs',
        label: 'Naloxone packs distributed',
        colour: '#2A9D8F',
        data: data.packsDistributed.map(d => ({
          date: yearToDate(d.year),
          value: d.packs,
        })),
      }]
    : [];

  const deathsSeries: Series[] = data
    ? [{
        id: 'deaths',
        label: 'Drug overdose deaths',
        colour: '#E63946',
        data: data.overdoseDeaths.map(d => ({
          date: yearToDate(d.year),
          value: d.deaths,
        })),
      }]
    : [];

  const communityRateSeries: Series[] = data
    ? [{
        id: 'community-rate',
        label: 'Packs per 1,000 in opioid treatment',
        colour: '#2A9D8F',
        data: data.communityNaloxoneRate.map(d => ({
          date: yearToDate(d.year),
          value: d.ratePerThousandAtRisk,
        })),
      }]
    : [];

  const packsAnnotations: Annotation[] = [
    { date: new Date(2015, 0, 1), label: '2015: Take-home naloxone programme expanded' },
    { date: new Date(2020, 0, 1), label: '2020: COVID disrupts services' },
    { date: new Date(2023, 0, 1), label: '2023: Pharmacy supply widened' },
  ];

  const deathsAnnotations: Annotation[] = [
    { date: new Date(2018, 0, 1), label: '2018: Fentanyl-related deaths emerge' },
    { date: new Date(2022, 0, 1), label: '2022: Record 4,907 deaths' },
  ];

  const communityAnnotations: Annotation[] = [
    { date: new Date(2019, 0, 1), label: '2019: ACMD recommends wider access' },
  ];

  // ── Latest values ──────────────────────────────────────────────────────

  const latestPacks = data?.packsDistributed[data.packsDistributed.length - 1];
  const firstPacks = data?.packsDistributed[0];
  const latestDeaths = data?.overdoseDeaths[data.overdoseDeaths.length - 1];
  const peakDeaths = data?.overdoseDeaths.reduce((a, b) => a.deaths > b.deaths ? a : b);
  const latestRate = data?.communityNaloxoneRate[data.communityNaloxoneRate.length - 1];
  const firstRate = data?.communityNaloxoneRate[0];

  return (
    <>
      <TopicNav topic="Naloxone Provision" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Naloxone Provision"
          question="Is Naloxone Getting to People Who Need It?"
          finding="124,500 naloxone packs were distributed in England in 2024 — a tenfold increase since 2015. Each kit can reverse an opioid overdose within minutes. Drug deaths have started to fall from their 2022 record of 4,907, but remain historically high at 4,690. Provision is scaling, but the gap between supply and need is still measured in lives."
          colour="#2A9D8F"
          preposition="with"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Naloxone is a medication that reverses the effects of an opioid overdose. Administered as a nasal spray or injection, it can restore breathing within two to three minutes and has virtually no side effects. Since 2015, England has expanded a take-home naloxone programme through drug treatment services, hostels, and increasingly through community pharmacies. The trajectory is striking: from 12,400 packs in 2015 to 124,500 in 2024, distribution has grown tenfold.<Cite nums={1} /> Scotland, which runs a separate programme, has achieved even higher per-capita rates. The Advisory Council on the Misuse of Drugs has recommended that naloxone should be as available as defibrillators in public spaces, and several pilot schemes are now testing vending-machine distribution in areas of high need.<Cite nums={3} /></p>
            <p>Yet the context for this expansion is grim. Drug-related deaths in England and Wales reached a record 4,907 in 2022, driven by an ageing cohort of heroin users whose bodies are increasingly vulnerable after decades of use, the appearance of synthetic opioids including fentanyl in the illicit supply, and the compounding effects of homelessness, mental ill-health, and poverty.<Cite nums={2} /> The slight decline to 4,690 in 2024 is cautiously encouraging but too early to call a turning point.<Cite nums={2} /> The North East of England has the highest death rate and also the highest naloxone distribution rate, reflecting both the severity of the crisis and the intensity of the response.<Cite nums={1} /> Crucially, naloxone only works if someone is present to administer it. Many overdose deaths still occur alone, in temporary accommodation or on the street, where no witness is available. The gap is not just about supply, but about reach.</p>
            <p>Community naloxone coverage, measured as packs distributed per 1,000 people in opioid treatment, has risen from 18 in 2015 to 163 in 2024.<Cite nums={1} /> This is progress, but international evidence suggests coverage rates of 200 or more per 1,000 are needed to achieve measurable reductions in overdose mortality.<Cite nums={3} /> The expansion of pharmacy-based supply in 2023, which allows anyone to collect naloxone without a prescription, is the most significant policy change in years. Early data suggests pharmacy supply is reaching people not in contact with treatment services, including family members and hostel staff, exactly the bystanders most likely to witness an overdose.<Cite nums={4} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-distribution', label: 'Distribution' },
          { id: 'sec-deaths', label: 'Overdose deaths' },
          { id: 'sec-coverage', label: 'Coverage rate' },
          { id: 'sec-regional', label: 'Regional' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Naloxone packs distributed (England)"
            value={latestPacks ? latestPacks.packs.toLocaleString() : '124,500'}
            unit="2024"
            direction="up"
            polarity="up-is-good"
            changeText={
              latestPacks && firstPacks
                ? `Up from ${firstPacks.packs.toLocaleString()} in ${firstPacks.year} · tenfold increase`
                : 'up from 12,400 in 2015 · tenfold increase'
            }
            sparklineData={
              data ? sparkFrom(data.packsDistributed.map(d => d.packs)) : []
            }
            source="OHID — Take-home naloxone data, 2024"
            href="#sec-distribution"
          />
          <MetricCard
            label="Drug overdose deaths (England & Wales)"
            value={latestDeaths ? latestDeaths.deaths.toLocaleString() : '4,690'}
            unit="2024"
            direction="down"
            polarity="up-is-bad"
            changeText={
              latestDeaths && peakDeaths
                ? `Down from record ${peakDeaths.deaths.toLocaleString()} in ${peakDeaths.year} · still historically high`
                : 'down from record 4,907 in 2022 · still historically high'
            }
            sparklineData={
              data ? sparkFrom(data.overdoseDeaths.map(d => d.deaths)) : []
            }
            source="ONS — Drug poisoning deaths, 2024"
            href="#sec-deaths"
          />
          <MetricCard
            label="Community naloxone coverage rate"
            value={latestRate ? latestRate.ratePerThousandAtRisk.toString() : '163'}
            unit="per 1,000 in treatment"
            direction="up"
            polarity="up-is-good"
            changeText={
              latestRate && firstRate
                ? `Up from ${firstRate.ratePerThousandAtRisk} in ${firstRate.year} · target is 200+`
                : 'up from 18 in 2015 · target is 200+'
            }
            sparklineData={
              data ? sparkFrom(data.communityNaloxoneRate.map(d => d.ratePerThousandAtRisk)) : []
            }
            source="OHID — Naloxone coverage indicators, 2024"
            href="#sec-coverage"
          />
        </div>

        {/* Chart 1: Naloxone packs distributed */}
        <ScrollReveal>
          <div id="sec-distribution" className="mb-12">
            <LineChart
              series={packsSeries}
              annotations={packsAnnotations}
              title="Naloxone packs distributed in England, 2015–2024"
              subtitle="Take-home kits supplied through drug treatment services, hostels, and pharmacies."
              yLabel="Packs"
              source={{
                name: 'Office for Health Improvement and Disparities (OHID)',
                dataset: 'Take-home naloxone provision from drug treatment services',
                frequency: 'annual',
                url: 'https://www.gov.uk/government/statistics/substance-misuse-treatment-for-adults-statistics-2023-to-2024',
                date: 'Nov 2025',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 2: Overdose deaths */}
        <ScrollReveal>
          <div id="sec-deaths" className="mb-12">
            <LineChart
              series={deathsSeries}
              annotations={deathsAnnotations}
              title="Drug overdose deaths, England & Wales, 2015–2024"
              subtitle="ONS registered deaths where the underlying cause is drug poisoning. Peaked in 2022, now declining."
              yLabel="Deaths"
              source={{
                name: 'Office for National Statistics (ONS)',
                dataset: 'Deaths related to drug poisoning in England and Wales',
                frequency: 'annual',
                url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/birthsdeathsandmarriages/deaths/bulletins/deathsrelatedtodrugpoisoninginenglandandwales',
                date: 'Nov 2025',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 3: Community coverage rate */}
        <ScrollReveal>
          <div id="sec-coverage" className="mb-12">
            <LineChart
              series={communityRateSeries}
              annotations={communityAnnotations}
              title="Community naloxone coverage rate, 2015–2024"
              subtitle="Packs distributed per 1,000 people in opioid treatment. International evidence suggests 200+ needed for measurable mortality reduction."
              yLabel="Packs per 1,000 in treatment"
              source={{
                name: 'OHID',
                dataset: 'Naloxone coverage indicators',
                frequency: 'annual',
                url: 'https://www.gov.uk/government/statistics/substance-misuse-treatment-for-adults-statistics-2023-to-2024',
                date: 'Nov 2025',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Regional breakdown */}
        <ScrollReveal>
          <div id="sec-regional" className="mb-12">
            <div className="bg-white rounded-lg border border-wiah-border p-8">
              <h2 className="text-lg font-bold text-wiah-black mb-2">
                Naloxone distribution and overdose death rates by region
              </h2>
              <p className="text-sm text-wiah-mid mb-6">
                Packs per 1,000 people in opioid treatment (bar) and drug death rate per 100,000 (label). Regions with highest need tend to have highest provision.
              </p>
              <div className="mt-6 space-y-4">
                {data?.byRegion.map((r) => {
                  const maxRate = 220;
                  const pct = (r.packsPerThousandAtRisk / maxRate) * 100;
                  return (
                    <div key={r.region}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-wiah-black">{r.region}</span>
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs text-wiah-mid">{r.deathRate}/100k deaths</span>
                          <span className="font-mono text-sm font-bold text-wiah-black">{r.packsPerThousandAtRisk}</span>
                        </div>
                      </div>
                      <div className="h-6 bg-wiah-light rounded-sm overflow-hidden">
                        <div
                          className="h-full rounded-sm transition-all"
                          style={{ width: `${pct}%`, backgroundColor: '#2A9D8F' }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="font-mono text-xs text-wiah-mid mt-4">Source: OHID — Take-home naloxone data by region, 2024. ONS — Drug poisoning deaths by region, 2024.</p>
            </div>
          </div>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Pharmacy naloxone supply reaching new populations"
            value="23%"
            unit="of kits now via pharmacies"
            description="Since community pharmacies were authorised to supply naloxone without prescription in 2023, nearly a quarter of all kits now reach people outside the drug treatment system. Early evaluation data from OHID shows pharmacy recipients include family members, hostel workers, and rough sleeping outreach staff — exactly the bystanders most likely to witness an overdose. In pilot areas, the proportion of overdose survivors who received bystander naloxone before paramedics arrived rose from 12% to 31%. The North East, which combined pharmacy supply with peer-led distribution networks, achieved the highest coverage rate in England at 210 packs per 1,000 in treatment."
            source="Source: OHID — Pharmacy naloxone pilot evaluation, 2024. ACMD — Reducing opioid-related deaths in the UK, 2024."
          />
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        {/* Sources & Methodology */}
        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p>
              <a href="https://www.gov.uk/government/statistics/substance-misuse-treatment-for-adults-statistics-2023-to-2024" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">OHID</a> — Take-home naloxone provision from drug treatment services. Retrieved Nov 2025.
            </p>
            <p>
              <a href="https://www.ons.gov.uk/peoplepopulationandcommunity/birthsdeathsandmarriages/deaths/bulletins/deathsrelatedtodrugpoisoninginenglandandwales" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ONS</a> — Deaths related to drug poisoning in England and Wales. Retrieved Nov 2025.
            </p>
            <p>
              <a href="https://www.gov.uk/government/publications/acmd-naloxone-review" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ACMD</a> — Naloxone availability and access review. Retrieved Nov 2025.
            </p>
            <p>All figures are for England unless otherwise stated. Overdose deaths cover England and Wales (ONS jurisdiction). Community coverage rate is calculated as packs distributed per 1,000 adults in structured opioid treatment. COVID-19 disrupted treatment services in 2020, causing a temporary dip in distribution. The 2022 ONS methodology revision for classifying drug-related deaths may affect year-on-year comparisons. Naloxone distributed outside drug treatment services prior to the 2023 pharmacy expansion is not captured in OHID data.</p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
