'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';

// ── Types ────────────────────────────────────────────────────────────────────

interface ChildcareCostPoint {
  year: number;
  annualCostPounds: number;
}

interface NurseryPlacePoint {
  year: number;
  registeredPlaces: number;
}

interface IncomeUsagePoint {
  band: string;
  pctUsing30hr: number;
}

interface EarlyYearsData {
  childcareCosts: ChildcareCostPoint[];
  nurseryPlaces: NurseryPlacePoint[];
  byIncomeBand: IncomeUsagePoint[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

function sparkFrom(arr: number[], n = 12) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function EarlyYearsPage() {
  const [data, setData] = useState<EarlyYearsData | null>(null);

  useEffect(() => {
    fetch('/data/early-years/early_years.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const childcareCostSeries: Series[] = data
    ? [
        {
          id: 'childcare-cost',
          label: 'Average annual cost',
          colour: '#2A9D8F',
          data: data.childcareCosts.map(d => ({
            date: yearToDate(d.year),
            value: d.annualCostPounds,
          })),
        },
      ]
    : [];

  const nurseryPlacesSeries: Series[] = data
    ? [
        {
          id: 'nursery-places',
          label: 'Registered childcare places',
          colour: '#E63946',
          data: data.nurseryPlaces.map(d => ({
            date: yearToDate(d.year),
            value: d.registeredPlaces / 1000,
          })),
        },
      ]
    : [];

  const nurseryPlacesAnnotations: Annotation[] = [
    { date: yearToDate(2020), label: 'COVID closures reduced capacity' },
  ];

  // ── Metrics ──────────────────────────────────────────────────────────────

  const costSparkline = data ? sparkFrom(data.childcareCosts.map(d => d.annualCostPounds)) : [];

  return (
    <main>
      <TopicNav topic="Early Years &amp; Childcare" />

      <section className="border-b border-wiah-border">
        <div className="max-w-2xl mx-auto px-6 py-12">
          <TopicHeader
            topic="Early Years &amp; Childcare"
            colour="#2A9D8F"
            question="Can families afford childcare?"
            finding="The UK has some of the highest childcare costs in the developed world relative to wages, with a full-time nursery place for a child under two costing &pound;14,800 a year &mdash; more than university tuition fees."
          />
        </div>
      </section>

      {/* Metrics row */}
      <section className="border-b border-wiah-border bg-wiah-light">
        <div className="max-w-2xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <MetricCard
              label="Average full-time nursery cost (under 2)"
              value="&pound;14,800"
              unit="/yr"
              direction="up"
              polarity="up-is-bad"
              changeText="Up 59% since 2013; more than university fees"
              sparklineData={costSparkline}
              source="Coram Family &amp; Childcare, 2023"
            />
            <MetricCard
              label="Parents who reduced work due to childcare costs"
              value="28%"
              direction="up"
              polarity="up-is-bad"
              changeText="Women disproportionately affected"
              source="TUC, 2023"
            />
            <MetricCard
              label="Take-up of 15-hour free entitlement (3-4 year olds)"
              value="93%"
              direction="flat"
              polarity="up-is-good"
              changeText="But only 60% use it full 15 hours"
              source="DfE, 2023"
            />
          </div>
        </div>
      </section>

      {/* Charts */}
      <section className="border-b border-wiah-border">
        <div className="max-w-4xl mx-auto px-6 py-12">
          {data && (
            <>
              <ScrollReveal>
                <div className="mb-12">
                  <LineChart
                    title="Average annual cost of full-time nursery place (under 2), England"
                    subtitle="Pounds per year, 50 hours per week. Coram Family &amp; Childcare survey data."
                    series={childcareCostSeries}
                    yLabel="Cost (&pound;)"
                    source={{
                      name: 'Coram Family &amp; Childcare',
                      dataset: 'UK Childcare Survey',
                      url: 'https://www.coramfcc.org.uk/research-publications/uk-childcare-survey',
                      date: 'Updated 2023',
                      frequency: 'Annual',
                    }}
                  />
                </div>
              </ScrollReveal>

              <ScrollReveal>
                <div className="mb-12">
                  <LineChart
                    title="Registered childcare places, England"
                    subtitle="Ofsted registered places in day nurseries and childminders. Declining since 2010."
                    series={nurseryPlacesSeries}
                    annotations={nurseryPlacesAnnotations}
                    yLabel="Places (thousands)"
                    source={{
                      name: 'Ofsted',
                      dataset: 'Childcare Places Survey',
                      url: 'https://www.gov.uk/government/organisations/ofsted',
                      date: 'Updated 2023',
                      frequency: 'Annual',
                    }}
                  />
                </div>
              </ScrollReveal>

              <ScrollReveal>
                <div className="mb-12">
                  <h3 className="text-lg font-bold text-wiah-black mb-6">Take-up of 30-hour free childcare offer, by household income</h3>
                  <div className="space-y-3 bg-white p-6 rounded-lg border border-wiah-border">
                    {data.byIncomeBand.map(item => {
                      const widthPct = (item.pctUsing30hr / 70) * 100;
                      return (
                        <div key={item.band} className="flex items-center gap-4">
                          <div className="w-32 text-sm font-mono text-wiah-black">{item.band}</div>
                          <div className="flex-1">
                            <div className="h-6 bg-wiah-light rounded relative" style={{ position: 'relative' }}>
                              <div
                                className="h-6 rounded bg-[#2A9D8F] transition-all flex items-center justify-end pr-2"
                                style={{ width: `${widthPct}%` }}
                              >
                                {widthPct > 15 && (
                                  <span className="font-mono text-xs text-white font-bold">
                                    {item.pctUsing30hr}%
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          {widthPct <= 15 && (
                            <div className="w-12 text-sm font-mono text-wiah-black text-right">
                              {item.pctUsing30hr}%
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  <p className="font-mono text-xs text-wiah-mid mt-4">Source: Department for Education, Childcare and Early Years Survey of Parents and Carers</p>
                </div>
              </ScrollReveal>
            </>
          )}
        </div>
      </section>

      {/* Context */}
      <section id="sec-context" className="border-b border-wiah-border">
        <div className="max-w-2xl mx-auto px-6 py-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The UK has some of the highest childcare costs in the developed world. Full-time care for a child under two averaged around &pound;14,000 a year in 2023 &mdash; more than the median full-time salary after tax in many parts of the country. The government&apos;s 30-hour free childcare entitlement was extended in 2024 to cover children from nine months in staged rollout at an annual cost of &pound;4&ndash;5 billion, but hourly rates paid to providers have consistently been below delivery cost: over 40% of nurseries reported operating at a loss on funded places in 2023, and more than 4,000 childcare providers closed between 2021 and 2023. At age five, 72% of children reach the Good Level of Development &mdash; but only 57% of those eligible for free school meals do so. Speech and language delays worsened after the pandemic: before 2020, around one in six children entered school with communication difficulties; recent data puts the figure closer to one in four. Sure Start children&apos;s centres, which at their peak in 2010 numbered 3,500 and delivered proven long-run benefits, have fallen to under 2,600 after a decade of local authority cuts, with losses concentrated in the most deprived areas.</p>
            <p>The childcare access gap and the early development gap reinforce each other along the same fault lines. The families least able to afford market-rate childcare are the same families whose children stand to gain most from quality early years provision, yet they are least served by a funding model that depends on cross-subsidy from fee-paying parents. The sector workforce compounds the problem: with around 40,000 vacancies and average pay close to the national living wage floor, turnover is high and the continuity of care that underpins secure attachment in young children is difficult to maintain. The long-run evidence base for early years investment is robust; the political commitment to fund it adequately has consistently fallen short.</p>
          </div>
        </div>
      </section>

      {/* Positive callout */}
      <section className="bg-wiah-light border-b border-wiah-border">
        <div className="max-w-2xl mx-auto px-6 py-12">
          <PositiveCallout
            title="30-hour expansion rolling out from April 2024"
            value="September"
            unit="2025"
            description="From April 2024, the government began extending free childcare to children from 9 months old. The full rollout (30 hours for all under-5s of working parents) reaches completion in September 2025. Providers warn the government funding rate &mdash; &pound;5.97/hour &mdash; is below actual costs, threatening supply at the point of expanded demand."
            source="Department for Education, 2024"
          />
        </div>
      </section>

      {/* Section nav */}
      <SectionNav sections={[
        { id: 'sec-context', label: 'Context' },
      ]} />
    </main>
  );
}
