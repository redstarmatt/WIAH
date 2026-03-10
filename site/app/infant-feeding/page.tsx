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

interface Feeding6WeeksPoint {
  year: number;
  percentBreastfed: number;
}

interface Feeding6MonthsPoint {
  year: number;
  percentBreastfed: number;
}

interface FormulaCostPoint {
  year: number;
  costGBP: number;
}

interface InfantFeedingData {
  national: {
    breastfeedingAt6Weeks: {
      timeSeries: Feeding6WeeksPoint[];
      latestYear: number;
      latestPercent: number;
      note: string;
    };
    breastfeedingAt6Months: {
      timeSeries: Feeding6MonthsPoint[];
      latestYear: number;
      latestPercent: number;
      note: string;
    };
    formulaCostMonthly: {
      timeSeries: FormulaCostPoint[];
      latestYear: number;
      latestCostGBP: number;
      note: string;
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
  return new Date(y, 5, 1);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function InfantFeedingPage() {
  const [data, setData] = useState<InfantFeedingData | null>(null);

  useEffect(() => {
    fetch('/data/infant-feeding/infant_feeding.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const breastfeedingSeries: Series[] = data
    ? [
        {
          id: 'at6weeks',
          label: 'Breastfeeding at 6-8 weeks (%)',
          colour: '#E63946',
          data: data.national.breastfeedingAt6Weeks.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.percentBreastfed,
          })),
        },
        {
          id: 'at6months',
          label: 'Breastfeeding at 6 months (%)',
          colour: '#F4A261',
          data: data.national.breastfeedingAt6Months.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.percentBreastfed,
          })),
        },
      ]
    : [];

  const formulaCostSeries: Series[] = data
    ? [{
        id: 'formulaCost',
        label: 'Monthly formula cost per baby (£)',
        colour: '#E63946',
        data: data.national.formulaCostMonthly.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.costGBP,
        })),
      }]
    : [];

  const breastfeedingAnnotations: Annotation[] = [
    { date: new Date(2019, 5, 1), label: '2019: UNICEF Baby Friendly Initiative — 80% trusts accredited' },
    { date: new Date(2020, 5, 1), label: '2020: COVID-19 disrupts health visitor contacts' },
    { date: new Date(2022, 5, 1), label: '2022: Healthy Start scheme expanded' },
  ];

  const formulaAnnotations: Annotation[] = [
    { date: new Date(2022, 5, 1), label: '2022: Supply chain pressures — formula cost rises sharply' },
    { date: new Date(2023, 5, 1), label: '2023: Food banks begin stocking formula' },
  ];

  // ── Sparkline helpers ────────────────────────────────────────────────────

  const breastfeeding6wSparkline = data
    ? data.national.breastfeedingAt6Weeks.timeSeries.map(d => d.percentBreastfed)
    : [];
  const breastfeeding6mSparkline = data
    ? data.national.breastfeedingAt6Months.timeSeries.map(d => d.percentBreastfed)
    : [];
  const formulaSparkline = data
    ? data.national.formulaCostMonthly.timeSeries.map(d => d.costGBP)
    : [];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Infant Feeding" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Infant Feeding"
          question="Why Do So Few Babies Get the Best Start?"
          finding="Only 26% of UK babies are breastfed at 6 months — the lowest rate in the developed world. Formula costs have risen 32% in five years. Breastfeeding rates are directly correlated with maternal income and education."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              The UK has one of the lowest breastfeeding continuation rates in the world. While 81% of mothers initiate breastfeeding, by six weeks only 47% are still feeding, and by six months the rate has fallen to 26% — against an OECD average of 46%. WHO recommendations advise exclusive breastfeeding for the first six months, yet these rates place the UK last among high-income nations. The causes are structural: insufficient post-birth support, early discharge from maternity wards before feeding is established, inadequate peer support networks, and workplace policies that make breastfeeding difficult to sustain on return to work.
            </p>
            <p>
              Deprivation predicts breastfeeding rates with striking consistency. Women in the most deprived decile are half as likely to breastfeed at six weeks as women in the least deprived decile. Black and South Asian women have higher initiation rates than white women but face greater barriers to continuation. The result is that those who would benefit most from the well-documented health advantages of breastfeeding — reduced rates of infection, obesity, SIDS, and improved cognitive outcomes — are least likely to receive them. Meanwhile, formula costs have risen 32% since 2020, reaching an average of £50 per month for standard first-stage formula. Reports of formula dilution, food bank formula stocking, and families rationing feeds have emerged from multiple sources including health visitors and charities.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-breastfeeding', label: 'Breastfeeding Rates' },
          { id: 'sec-formula', label: 'Formula Costs' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Breastfeeding at 6 months"
              value="26%"
              unit=""
              direction="flat"
              polarity="up-is-good"
              changeText="Lowest in developed world · OECD average 46% · UK lowest since 2010"
              sparklineData={breastfeeding6mSparkline}
              href="#sec-breastfeeding"
            />
            <MetricCard
              label="Breastfeeding at 6-8 weeks"
              value="46.8%"
              unit=""
              direction="flat"
              polarity="up-is-good"
              changeText="Stagnant for a decade · Below PHE 50% target · Steep deprivation gradient"
              sparklineData={breastfeeding6wSparkline}
              href="#sec-breastfeeding"
            />
            <MetricCard
              label="Monthly formula cost per baby"
              value="£50"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="+32% since 2020 · Some families diluting formula · Food banks stocking it"
              sparklineData={formulaSparkline}
              href="#sec-breastfeeding"
            />
          </div>
        

        {/* Chart 1: Breastfeeding rates */}
        <ScrollReveal>
          <section id="sec-breastfeeding" className="mb-12">
            <LineChart
              title="Breastfeeding rates at 6-8 weeks and 6 months, England, 2015–2024"
              subtitle="Percentage of babies breastfed at 6-8 weeks (health visitor contact) and at 6 months. Rates have been essentially flat for a decade despite investment in Baby Friendly Initiative accreditation. The steep fall between 6-week and 6-month rates reflects abandonment of breastfeeding over the first months."
              series={breastfeedingSeries}
              annotations={breastfeedingAnnotations}
              yLabel="Percent (%)"
            />
          </section>
        </ScrollReveal>

        {/* Chart 2: Formula cost */}
        <ScrollReveal>
          <section id="sec-formula" className="mb-12">
            <LineChart
              title="Average monthly formula cost per baby, England, 2020–2025"
              subtitle="Average monthly retail cost of standard first-stage infant formula (£ per baby), England. Rose from £38 to £50 between 2020 and 2025 — a 32% increase. Specialist and follow-on formulas cost considerably more."
              series={formulaCostSeries}
              annotations={formulaAnnotations}
              yLabel="£ per month"
            />
          </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="What's improving"
            value="80%"
            unit="NHS trusts Baby Friendly accredited"
            description="UNICEF UK's Baby Friendly Initiative accreditation has improved breastfeeding support in 80% of NHS maternity units, introducing training for midwives and peer support programmes. The NHS Healthy Start scheme provides vouchers worth £4.25 per week for formula, fruit and vegetables for eligible low-income pregnant women and families with children under four. The 2024 Healthy Start expansion increased the weekly voucher value. Breastfeeding peer support programmes, where trained volunteers support new mothers in their communities, have shown evidence of improving rates in deprived areas."
            source="Source: UNICEF UK Baby Friendly Initiative — accreditation data 2024. NHS England — Healthy Start scheme statistics."
          />
        </ScrollReveal>

        {/* Sources */}
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            {data?.metadata.sources.map((src, i) => (
              <div key={i}>
                <a href={src.url} target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">
                  {src.name} — {src.dataset}
                </a>
                <div className="text-xs text-wiah-mid">Updated {src.frequency}</div>
              </div>
            ))}
          </div>
          <div className="text-sm text-wiah-mid mt-6 space-y-2">
            <h3 className="font-bold">Methodology</h3>
            <p>{data?.metadata.methodology}</p>
          </div>
          <div className="text-sm text-wiah-mid mt-6 space-y-2">
            <h3 className="font-bold">Known issues</h3>
            <ul className="list-disc list-inside space-y-1">
              {data?.metadata.knownIssues.map((issue, i) => (
                <li key={i}>{issue}</li>
              ))}
            </ul>
          </div>
        </section>
              <RelatedTopics />
      </main>
    </>
  );
}
