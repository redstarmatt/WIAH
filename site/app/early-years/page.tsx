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
            <p>The UK has some of the highest childcare costs in the developed world. Full-time care for a child under two averaged around &pound;14,000 a year in 2023 &mdash; more than the median full-time salary after tax in many parts of the country. The government&apos;s flagship response, the 30-hour free childcare entitlement for three- and four-year-olds, was extended in 2024 to cover children from nine months in staged rollout, at an annual cost of &pound;4&ndash;5 billion. But the hourly rate paid to providers to deliver free hours has consistently been below cost: in 2023, more than 40% of nurseries in England reported operating at a loss on their funded places, and over 4,000 childcare providers closed between 2021 and 2023. A policy designed to improve access to childcare is being delivered through a market that the funding model is actively destabilising.</p>
            <p>At age five, 72% of children in England reach the expected Good Level of Development (GLD) across the Early Years Foundation Stage. The gap between that headline and the experience of disadvantaged children is wide and persistent: only 57% of children eligible for free school meals reach the GLD, and only 51% of summer-born boys. Speech and language delays have worsened since the pandemic: before 2020, around one in six children entered school with speech and language difficulties; recent data suggests the figure is now closer to one in four. The causes are contested, but reduced social interaction during lockdowns &mdash; when children spent extended periods without nursery, playgroups, or contact with extended family &mdash; is widely cited. The early years workforce has not grown to meet the scale of need: only 16% of early years workers hold a degree-level qualification, compared to nearly all primary school teachers.</p>
            <p>Sure Start children&apos;s centres were the most significant investment in early years infrastructure in a generation. At their peak in 2010 there were 3,500 centres offering integrated health, childcare, family support, and employment advice in the same building, with universal access and an explicit focus on the most deprived communities. A decade of local authority funding cuts reduced that number to under 2,600 by 2023, with the losses concentrated in the areas that had most needed them. A 2019 IFS study found that children who had access to Sure Start experienced fewer A&amp;E admissions, improved Key Stage 2 results, and reduced conduct problems in adolescence &mdash; effects that were largest for the most deprived children. The government&apos;s replacement programme, Family Hubs, is funded at a fraction of Sure Start&apos;s scale and is not yet operating at national coverage. The long-run evidence base for early years investment is robust; the political commitment to fund it has not been.</p>
            <p>The early years workforce is in structural difficulty. Vacancy rates across the sector in England reached an estimated 40,000 in recent years. The core problem is wages: many nurseries and childminders cannot pay enough to retain qualified staff. The national living wage rose to &pound;12.21 in April 2024, but large parts of the early years sector were already paying at or below that level, meaning the minimum wage increase compressed margins further without improving recruitment. Male workers make up under 5% of the early years workforce &mdash; a gender imbalance that has implications for the role modelling available to young children, particularly boys at risk of later educational disengagement. Turnover is high throughout the sector, and continuity of care &mdash; the consistent relationship with a key worker that underpins secure attachment in young children &mdash; is difficult to provide when staff leave frequently.</p>
            <p>The Good Level of Development measure is a teacher assessment, not a standardised test, and its results carry the variation that implies: different schools, different practitioners, and different local moderation cultures produce results that are not directly comparable. The measure is what is available at scale and it tracks broad trends reliably, but it is not a precise instrument. Speech and language delay data comes primarily from health visitor assessments, which have variable coverage nationally &mdash; health visitor numbers fell sharply after 2015 &mdash; and are not aggregated into a single national dataset in a form that allows consistent year-on-year comparison. Childcare provider financial sustainability is not systematically monitored: Ofsted records registrations and deregistrations, but not the financial health of operating providers. The full effect of the 2024 childcare expansion on quality, availability, and provider viability will not be visible in child outcome data for several years, by which point the policy decisions that determine its success or failure will long since have been made.</p>
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
