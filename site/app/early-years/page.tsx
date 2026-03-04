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
              onExpand={() => {}}
            />
            <MetricCard
              label="Parents who reduced work due to childcare costs"
              value="28%"
              direction="up"
              polarity="up-is-bad"
              changeText="Women disproportionately affected"
              source="TUC, 2023"
              onExpand={() => {}}
            />
            <MetricCard
              label="Take-up of 15-hour free entitlement (3-4 year olds)"
              value="93%"
              direction="flat"
              polarity="up-is-good"
              changeText="But only 60% use it full 15 hours"
              source="DfE, 2023"
              onExpand={() => {}}
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
            <p>The UK has some of the least affordable childcare in the developed world. A full-time nursery place for a child under two costs &pound;14,836 a year &mdash; more than a year of university tuition at &pound;9,250 &mdash; and as a share of average wages, only Switzerland pays more among OECD nations. That cost does not fall equally. Take-up of the 30-hour free entitlement for working parents of three and four year olds stands at 68% among the highest-income fifth of households, but just 38% among the lowest. The eligibility rules, the top-up charges providers levy, and the simple scarcity of places in poorer areas all conspire to make a nominally universal policy regressive in practice.</p>
            <p>The supply side is deteriorating. Registered childcare places in England fell from 1.28 million in 2010 to 1.01 million in 2023 &mdash; a loss of 270,000 places over thirteen years. Childminders alone have declined by 13,000 since 2020. The underlying cause is financial: the government pays providers around &pound;5.97 per hour for the free entitlement, while providers estimate their actual costs at &pound;8&ndash;9 per hour. The gap is met by charging more for paid-for hours or ancillary services, a cross-subsidy that is becoming unsustainable as the government&apos;s phased expansion &mdash; extending free hours to children from nine months old &mdash; drives demand upward into a shrinking market.</p>
            <p>The stakes extend well beyond family finances. Ofsted data consistently shows that high-quality early years provision is more strongly associated with better child development outcomes than almost any other intervention, particularly for disadvantaged children. Yet Early Years Foundation Stage outcomes &mdash; the proportion of children reaching a good level of development at age five &mdash; have been falling since 2019. Without a funded rate that covers actual costs, expanding entitlement without expanding quality risks cementing, rather than closing, the gap between the children who most need good early education and those who reliably receive it.</p>
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
