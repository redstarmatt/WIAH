'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import RelatedTopics from '@/components/RelatedTopics';

interface DrugDeathsData {
  national: {
    drugPoisoningDeaths: {
      timeSeries: Array<{ year: number; deaths: number }>;
      latestYear: number;
      latestDeaths: number;
      note: string;
    };
    scotlandDeathRate: {
      timeSeries: Array<{ year: number; deathsPer100k: number }>;
      latestYear: number;
      latestRate: number;
      absoluteDeaths2022: number;
      euComparison: string;
    };
    bySubstance: Array<{ substance: string; pct: number }>;
    drugTreatment: {
      timeSeries: Array<{ year: number; inTreatmentThousands: number }>;
      latestYear: number;
      latestThousands: number;
      recoveryRatePct: number;
      fundingCutSince2013Pct: number;
      newInvestmentBillionGBP: number;
      newInvestmentPeriod: string;
    };
    naloxone: {
      distributedDoses2022: number;
      note: string;
    };
  };
}

export default function DrugDeathsPage() {
  const [data, setData] = useState<DrugDeathsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data/drug-deaths/drug_deaths.json')
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-8">Loading...</div>;
  if (!data) return <div className="p-8">Error loading data</div>;

  const poisoningData = data.national.drugPoisoningDeaths;
  const scotlandData = data.national.scotlandDeathRate;
  const substanceData = data.national.bySubstance;

  // Chart 1: Drug poisoning deaths over time
  const poisoningSeries: Series[] = [
    {
      id: 'deaths',
      label: 'Deaths',
      colour: '#E63946',
      data: poisoningData.timeSeries.map((d) => ({
        date: new Date(d.year, 0, 1),
        value: d.deaths,
      })),
    },
  ];

  const poisoningAnnotations: Annotation[] = [
    { date: new Date(2016, 0, 1), label: '2016: First record broken' },
    { date: new Date(2020, 0, 1), label: '2020: COVID lockdown surge' },
  ];

  // Chart 2: Scotland death rate
  const scotlandSeries: Series[] = [
    {
      id: 'rate',
      label: 'Deaths per 100,000',
      colour: '#E63946',
      data: scotlandData.timeSeries.map((d) => ({
        date: new Date(d.year, 0, 1),
        value: d.deathsPer100k,
      })),
    },
  ];

  const maxSubstancePct = Math.max(...substanceData.map((s) => s.pct));

  return (
    <>
      <TopicNav topic="Drug Deaths" />
      <TopicHeader
        topic="Drug Deaths"
        question="Why Is Britain's Drug Death Toll Rising?"
        finding="Drug poisoning deaths in England and Wales reached 4,907 in 2022 — a record. Scotland's rate is the highest in Europe at 22.4 deaths per 100,000. Drug treatment funding has been cut 30% in real terms since 2013. Opioids — mainly heroin — account for 48% of all drug deaths."
        colour="#E63946"
      />

      <main className="max-w-4xl mx-auto px-5 py-12">

        {/* Metric Cards */}
        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
            <MetricCard
              label="Drug poisoning deaths (England &amp; Wales)"
              value="4,907"
              direction="up"
              polarity="up-is-bad"
              changeText="2022 · Record high · Up from 2,652 in 2012 · Opioids: 48% of all drug deaths · Cocaine: rising fast"
              sparklineData={[2652, 2732, 2952, 3346, 3744, 3756, 4359, 4393, 4561, 4859, 4907]}
            />
            <MetricCard
              label="Scotland drug death rate per 100K"
              value="22.4"
              direction="up"
              polarity="up-is-bad"
              changeText="2022 · Highest in Europe · 3× England rate · 1,051 deaths · Crack cocaine &amp; opioids · Crisis in deprived areas"
              sparklineData={[6.8, 9.2, 12.3, 17.5, 21.3, 22.4]}
            />
            <MetricCard
              label="People in drug treatment (England)"
              value="275K"
              direction="flat"
              polarity="up-is-good"
              changeText="2022/23 · 45% complete treatment 'free from dependence' · Treatment funding cut 30% real-terms since 2013 · New investment: £780M 2022–25"
              sparklineData={[300, 310, 295, 280, 273, 270, 271, 275]}
            />
          </div>
        </ScrollReveal>

        {/* Chart 1: Drug poisoning deaths trend */}
        <ScrollReveal>
          <div className="mb-12">
            <LineChart
              title="Drug poisoning deaths, England &amp; Wales, 2012–2022"
              subtitle="Includes all drug poisoning deaths where drug mentioned on death certificate"
              series={poisoningSeries}
              annotations={poisoningAnnotations}
              yLabel="Deaths"
            />
          </div>
        </ScrollReveal>

        {/* Chart 2: Scotland death rate */}
        <ScrollReveal>
          <div className="mb-12">
            <LineChart
              title="Drug death rate, Scotland, 2013–2022"
              subtitle="Deaths per 100,000 population. Highest rate in Europe."
              series={scotlandSeries}
              yLabel="Deaths per 100,000"
            />
          </div>
        </ScrollReveal>

        {/* Chart 3: By substance */}
        <ScrollReveal>
          <div className="mb-12">
            <h3 className="text-lg font-bold text-wiah-black mb-4">Drug deaths by substance (England &amp; Wales, 2022)</h3>
            <div className="space-y-3">
              {substanceData.map((item) => (
                <div key={item.substance} className="flex items-center gap-3">
                  <div className="w-32 text-sm text-wiah-mid font-mono">{item.substance}</div>
                  <div className="flex-1 bg-wiah-light rounded">
                    <div
                      className="bg-wiah-red h-6 rounded flex items-center justify-end pr-3"
                      style={{ width: `${(item.pct / maxSubstancePct) * 100}%` }}
                    >
                      <span className="text-xs font-bold text-white">{item.pct}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-wiah-mid font-mono mt-4">Source: ONS — Deaths related to drug poisoning 2022</p>
          </div>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Life-saving naloxone"
            value="110K"
            unit="naloxone doses distributed in 2022 — a life-saving overdose reversal drug"
            description="Naloxone reverses opioid overdose and saves lives in minutes. NHS England expanded community naloxone distribution in 2023, with 110,000 doses distributed in 2022 through drug services, pharmacies, and community organisations. The Ten-Year Drugs Plan (&ldquo;From Harm to Hope&rdquo;, 2021) committed £780 million over 2022–25 to rebuild the drug treatment system after a decade of funding cuts — a 30% real-terms reduction since 2013. Recovery rates have improved: 45% of those completing treatment are recorded as free from dependence. Take-home naloxone programmes have been shown to reduce overdose deaths by 30% in areas with high coverage."
            source="Source: ONS — Drug poisoning deaths 2022; OHID — Adult substance misuse treatment statistics 2022/23."
          />
        </ScrollReveal>

        {/* Context section */}
        <ScrollReveal>
          <section className="max-w-2xl border-t border-wiah-border pt-12 mt-12">
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>
                Drug poisoning deaths in England and Wales rose from 2,652 in 2012 to a record 4,907 in 2022, climbing in every intervening year. Opioids account for 48% of fatalities; cocaine for 18%; benzodiazepines — increasingly mixed into street heroin — for 12%. Scotland's rate of 22.4 deaths per 100,000 is the highest in Europe — three times England's — driven by concentrated poverty in post-industrial communities and an ageing opioid-using population. From 2023, nitazenes and other synthetic opioids were detected in the UK supply, prompting national monitoring alerts.
              </p>
              <p>
                Dame Carol Black's 2020–21 review found the treatment system had been &ldquo;deliberately dismantled&rdquo; by cuts: funding fell 30% in real terms from 2013. The Ten-Year Drugs Plan &ldquo;From Harm to Hope&rdquo; (2021) committed £780 million over 2022–25. By 2022/23, 275,896 adults were in structured treatment, with 45% completing free from dependence. Community naloxone distribution reached 110,000 doses in 2022; in high-coverage areas it has been shown to reduce overdose deaths by 30%.
              </p>
            </div>
          </section>
        </ScrollReveal>

        {/* Methodology */}
        <ScrollReveal>
          <section className="border-t border-wiah-border pt-12 mt-12">
            <h2 className="text-2xl font-bold text-wiah-black mb-4">Sources &amp; methodology</h2>
            <div className="prose prose-sm max-w-none text-wiah-black">
              <ul>
                <li><strong>Drug poisoning deaths:</strong> ONS Deaths related to drug poisoning in England and Wales. Annual publication. Includes all deaths where drug poisoning is mentioned on the death certificate.</li>
                <li><strong>Scotland rates:</strong> National Records of Scotland drug-related deaths statistics. Uses slightly different classification from ONS.</li>
                <li><strong>Drug treatment:</strong> OHID / UKHSA Adult substance misuse treatment statistics. Data from National Drug Treatment Monitoring System (NDTMS) — all adults in structured community or residential treatment in England.</li>
                <li><strong>Known issues:</strong> Deaths lag by 12–18 months due to inquest process. Scotland's classification differs slightly from ONS. Treatment numbers reflect programme completions, not new starts.</li>
              </ul>
            </div>
          </section>
        </ScrollReveal>
              <RelatedTopics />
      </main>
    </>
  );
}
