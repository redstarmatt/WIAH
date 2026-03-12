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

interface DrugDeathPoint {
  year: number;
  deaths: number;
}

interface TreatmentPoint {
  year: number;
  inTreatment: number;
}

interface FundingPoint {
  year: number;
  fundingGBP: number;
}

interface RegionData {
  region: string;
  deathRatePer100k: number;
}

interface AddictionServicesData {
  drugDeaths: DrugDeathPoint[];
  treatmentNumbers: TreatmentPoint[];
  fundingPerHead: FundingPoint[];
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

export default function AddictionServicesPage() {
  const [data, setData] = useState<AddictionServicesData | null>(null);

  useEffect(() => {
    fetch('/data/addiction-services/addiction_services.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const drugDeathsSeries: Series[] = data
    ? [{
        id: 'drug-deaths',
        label: 'Drug poisoning deaths',
        colour: '#E63946',
        data: data.drugDeaths.map(d => ({
          date: yearToDate(d.year),
          value: d.deaths,
        })),
      }]
    : [];

  const treatmentSeries: Series[] = data
    ? [{
        id: 'treatment',
        label: 'People in structured treatment',
        colour: '#264653',
        data: data.treatmentNumbers.map(d => ({
          date: yearToDate(d.year),
          value: d.inTreatment,
        })),
      }]
    : [];

  const fundingSeries: Series[] = data
    ? [{
        id: 'funding',
        label: 'Funding per head (£)',
        colour: '#F4A261',
        data: data.fundingPerHead.map(d => ({
          date: yearToDate(d.year),
          value: d.fundingGBP,
        })),
      }]
    : [];

  const latestDeaths = data?.drugDeaths[data.drugDeaths.length - 1];
  const earliestDeaths = data?.drugDeaths[0];
  const latestTreatment = data?.treatmentNumbers[data.treatmentNumbers.length - 1];
  const peakTreatment = data?.treatmentNumbers[0];
  const latestFunding = data?.fundingPerHead[data.fundingPerHead.length - 1];
  const peakFunding = data?.fundingPerHead[0];

  const deathsChange = latestDeaths && earliestDeaths
    ? Math.round(((latestDeaths.deaths - earliestDeaths.deaths) / earliestDeaths.deaths) * 100)
    : 89;

  const treatmentChange = latestTreatment && peakTreatment
    ? Math.round(((peakTreatment.inTreatment - latestTreatment.inTreatment) / peakTreatment.inTreatment) * 100)
    : 14;

  const fundingChange = latestFunding && peakFunding
    ? Math.round(((peakFunding.fundingGBP - latestFunding.fundingGBP) / peakFunding.fundingGBP) * 100)
    : 30;

  return (
    <>
      <TopicNav topic="Mental Health & Wellbeing" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Mental Health & Wellbeing"
          question="Are addiction services actually working?"
          finding="Drug poisoning deaths in England and Wales have nearly doubled since 2012, reaching 4,907 in 2024. Treatment funding was cut by over 30% per head between 2013 and 2020. The number of people in structured treatment fell to a decade low before partially recovering."
          colour="#E63946"
          preposition="in"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>England and Wales are in the grip of a drug deaths crisis that has received remarkably little public attention. Drug poisoning deaths have risen almost every year since 2012, reaching 4,907 registered deaths in 2024 — an 89% increase in just over a decade. The victims are disproportionately men, aged 40&ndash;49, from the most deprived communities. Opioids — principally heroin and morphine — remain the single largest contributor, involved in roughly half of all drug poisoning deaths. But the picture is shifting: deaths involving cocaine, benzodiazepines, and pregabalin have risen sharply, reflecting changing patterns of polysubstance use. The North East of England has the highest drug death rate in the country at 11.4 per 100,000, nearly three times the rate in London. This is not a crisis distributed evenly; it maps almost perfectly onto deprivation, deindustrialisation, and the withdrawal of public services.</p>
            <p>The treatment system that should be catching these people was hollowed out during the 2010s. Local authority spending on drug and alcohol services fell by more than 30% per head between 2013 and 2020, as the public health grant was repeatedly cut in real terms. The number of people in structured treatment dropped from 338,000 in 2010 to a low of 275,000 in 2020 — a loss of 63,000 treatment places at precisely the moment demand was rising. Dame Carol Black&apos;s landmark independent review, published in 2021, described the treatment system as &ldquo;not fit for purpose&rdquo; and called for an additional &pound;552 million per year in funding. The government responded with a 10-year drug strategy and new investment, but progress has been slow: treatment numbers have recovered only to 289,000, still 15% below 2010 levels. Alcohol treatment is a particular gap — only one in five people who are dependent on alcohol are in treatment, compared with roughly half for opiate users.</p>
            <p>Opioid substitution therapy (OST) — methadone and buprenorphine prescribing — remains the most evidence-based intervention for reducing opiate deaths, and the UK has one of the better OST coverage rates in Europe. But the ageing cohort of long-term heroin users who began using in the 1980s and 1990s now face compounding health conditions — liver disease, respiratory illness, homelessness — that make them acutely vulnerable. Naloxone distribution programmes, which provide overdose-reversal kits to people who use drugs and their peers, have expanded significantly and are saving lives. The challenge ahead is structural: rebuilding a treatment system that was systematically defunded, reaching people who have never engaged with services, and addressing the social determinants — housing, poverty, isolation — that drive addiction in the first place. Without sustained investment, the death toll will continue to climb.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-deaths', label: 'Drug deaths' },
          { id: 'sec-treatment', label: 'Treatment numbers' },
          { id: 'sec-funding', label: 'Funding' },
          { id: 'sec-regional', label: 'Regional' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Drug poisoning deaths"
            value={latestDeaths ? latestDeaths.deaths.toLocaleString() : '4,907'}
            unit="2024"
            direction="up"
            polarity="up-is-bad"
            changeText={`+${deathsChange}% since 2012 · opioids involved in ~50% of deaths`}
            sparklineData={
              data ? sparkFrom(data.drugDeaths.map(d => d.deaths)) : []
            }
            source="ONS · Deaths related to drug poisoning, 2024"
            href="#sec-deaths"
          />
          <MetricCard
            label="People in structured treatment"
            value={latestTreatment ? (latestTreatment.inTreatment / 1000).toFixed(0) + 'K' : '289K'}
            unit="2024"
            direction="down"
            polarity="up-is-good"
            changeText={`Down ${treatmentChange}% from 338K in 2010 · recovering from 275K low in 2020`}
            sparklineData={
              data ? sparkFrom(data.treatmentNumbers.map(d => d.inTreatment)) : []
            }
            source="OHID · NDTMS adult substance misuse statistics, 2024"
            href="#sec-treatment"
          />
          <MetricCard
            label="Treatment funding per head"
            value={latestFunding ? '\u00A3' + latestFunding.fundingGBP.toFixed(2) : '\u00A35.89'}
            unit="2024"
            direction="down"
            polarity="up-is-good"
            changeText={`Down ${fundingChange}% from \u00A3${peakFunding?.fundingGBP.toFixed(2) ?? '8.42'} in 2013 · partial recovery since 2020`}
            sparklineData={
              data ? sparkFrom(data.fundingPerHead.map(d => d.fundingGBP)) : []
            }
            source="OHID · Public health grant expenditure on substance misuse, 2024"
            href="#sec-funding"
          />
        </div>

        {/* Chart 1: Drug poisoning deaths */}
        <ScrollReveal>
          <div id="sec-deaths" className="mb-12">
            <LineChart
              series={drugDeathsSeries}
              title="Drug poisoning deaths, England &amp; Wales, 2012–2024"
              subtitle="Deaths registered each year where the underlying cause is drug poisoning. Near-continuous rise over 12 years."
              yLabel="Deaths"
              source={{
                name: 'ONS',
                dataset: 'Deaths related to drug poisoning in England and Wales',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 2: Treatment numbers */}
        <ScrollReveal>
          <div id="sec-treatment" className="mb-12">
            <LineChart
              series={treatmentSeries}
              title="People in structured drug and alcohol treatment, England, 2010–2024"
              subtitle="Total individuals in contact with structured treatment services. Fell 19% from 2010 to 2020 before partially recovering."
              yLabel="People in treatment"
              source={{
                name: 'OHID',
                dataset: 'National Drug Treatment Monitoring System (NDTMS)',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 3: Funding per head */}
        <ScrollReveal>
          <div id="sec-funding" className="mb-12">
            <LineChart
              series={fundingSeries}
              title="Local authority spending on drug and alcohol treatment per head, England, 2013–2024"
              subtitle="Public health grant expenditure on substance misuse services, adjusted per capita. Cut by over 30% between 2013 and 2020."
              yLabel="\u00A3 per head"
              source={{
                name: 'OHID',
                dataset: 'Public Health Ring-Fenced Grant expenditure',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Regional variation */}
        <ScrollReveal>
          <div id="sec-regional" className="mb-12">
            <div className="bg-white rounded-lg border border-wiah-border p-8">
              <h2 className="text-lg font-bold text-wiah-black mb-2">
                Drug poisoning death rate by region (per 100,000 people)
              </h2>
              <div className="mt-6 space-y-4">
                {data?.byRegion.map((r) => {
                  const pct = (r.deathRatePer100k / 12) * 100;
                  return (
                    <div key={r.region}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-wiah-black">{r.region}</span>
                        <span className="font-mono text-sm font-bold text-wiah-black">{r.deathRatePer100k}</span>
                      </div>
                      <div className="h-6 bg-wiah-light rounded-sm overflow-hidden">
                        <div
                          className="h-full rounded-sm transition-all"
                          style={{ width: `${pct}%`, backgroundColor: '#E63946' }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="font-mono text-xs text-wiah-mid mt-4">Source: ONS — Deaths related to drug poisoning by region, 2024</p>
            </div>
          </div>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Naloxone distribution is expanding and saving lives"
            value="Naloxone kits"
            description="Naloxone — a medicine that rapidly reverses opioid overdose — is now being distributed at scale through drug treatment services, homelessness charities, and peer networks across England. Since regulations were relaxed in 2019 to allow wider distribution, tens of thousands of kits have been supplied. Evidence from Scotland, where a national naloxone programme has operated since 2011, shows that community distribution reduces opioid overdose deaths. The Dame Carol Black review recommended universal naloxone provision, and the government&apos;s 10-year drug strategy committed to making naloxone available to all those at risk. While naloxone cannot address the root causes of the drug deaths crisis, it is the single most effective immediate intervention for preventing fatal overdose."
            source="Source: OHID — Naloxone provision data, 2024. Dame Carol Black — Independent Review of Drugs, 2021."
          />
        </ScrollReveal>

        {/* Sources & Methodology */}
        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>ONS — Deaths Related to Drug Poisoning in England and Wales. Annual publication based on registered deaths where drug poisoning was the underlying cause. Data by substance, age, sex, and geography.</p>
            <p>OHID / NDTMS — Adult Drug and Alcohol Statistics from the National Drug Treatment Monitoring System. Annual data on adults receiving structured treatment for drug and/or alcohol misuse in publicly funded services in England.</p>
            <p>OHID — Public Health Ring-Fenced Grant: Drug and Alcohol Treatment Spend. Annual data on local authority public health grant expenditure on substance misuse services, divided by ONS mid-year population estimates to derive per-head figures.</p>
            <p>Drug poisoning deaths are based on death registration year, not year of occurrence; complex cases involving coroner inquests may be registered 12&ndash;18 months after death. Treatment numbers cover structured treatment only, excluding brief interventions, harm reduction services, and mutual aid. Funding figures do not include NHS secondary care or criminal justice system spending on addiction services. Data covers England and Wales (deaths) and England only (treatment and funding).</p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
