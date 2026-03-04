'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';

interface OnlineGamblingPoint {
  year: number;
  grossYieldBn: number;
}

interface TreatmentAccessPoint {
  year: number;
  inTreatment: number;
}

interface GamblingActivityType {
  type: string;
  pctProblematic: number;
}

interface GamblingHarmData {
  onlineGambling: OnlineGamblingPoint[];
  treatmentAccess: TreatmentAccessPoint[];
  byGamblingType: GamblingActivityType[];
}

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

export default function GamblingHarmPage() {
  const [data, setData] = useState<GamblingHarmData | null>(null);

  useEffect(() => {
    fetch('/data/gambling-harm/gambling_harm.json')
      .then((res) => res.json())
      .then((d: GamblingHarmData) => setData(d))
      .catch((err) => console.error('Failed to load gambling harm data:', err));
  }, []);

  if (!data) return <div className="p-8">Loading...</div>;

  // ── Series ────────────────────────────────────────────────────────────────

  const onlineYieldSeries: Series[] = [
    {
      id: 'online-yield',
      label: 'Online gambling gross yield (&pound;bn)',
      colour: '#E63946',
      data: data.onlineGambling.map((p) => ({
        date: yearToDate(p.year),
        value: p.grossYieldBn,
      })),
    },
  ];

  const treatmentSeries: Series[] = [
    {
      id: 'in-treatment',
      label: 'People in treatment',
      colour: '#2A9D8F',
      data: data.treatmentAccess.map((p) => ({
        date: yearToDate(p.year),
        value: p.inTreatment,
      })),
    },
  ];

  // For horizontal bar chart
  const maxActivityRate = Math.max(...data.byGamblingType.map((a) => a.pctProblematic));

  return (
    <main>
      <TopicNav topic="Gambling Harm" />

      <TopicHeader
        topic="Gambling Harm"
        colour="#E63946"
        question="How much harm is gambling causing?"
        finding="Around 300,000 people in Great Britain are problem gamblers, 1.8 million more are at risk, and online gambling growth has outpaced the regulatory system designed to protect them."
      />

      {/* ── MetricCards ────────────────────────────────────────────────────── */}
      <section className="bg-wiah-light px-6 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ScrollReveal delay={0}>
              <MetricCard
                label="Problem gamblers in Great Britain"
                value="300,000"
                direction="up"
                polarity="up-is-bad"
                changeText="0.5% of adults; 430,000 at moderate risk"
                sparklineData={[280, 285, 290, 295, 298, 300]}
                onExpand={() => {}}
              />
            </ScrollReveal>

            <ScrollReveal delay={1}>
              <MetricCard
                label="Online gambling gross yield"
                value="&pound;6.9bn"
                direction="up"
                polarity="up-is-bad"
                changeText="Up from &pound;1.8bn in 2012; now 46% of total"
                sparklineData={[1.8, 2.3, 2.8, 3.3, 3.9, 4.5, 5.1, 5.6, 5.9, 6.5, 6.9]}
                onExpand={() => {}}
              />
            </ScrollReveal>

            <ScrollReveal delay={2}>
              <MetricCard
                label="Gambling-related suicides per year (est.)"
                value="500"
                direction="up"
                polarity="up-is-bad"
                changeText="1 in 50 suicides associated with gambling"
                sparklineData={[350, 380, 420, 450, 475, 500]}
                onExpand={() => {}}
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Online Yield Chart ────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <ScrollReveal>
          <div>
            <h2 className="text-2xl font-bold text-wiah-black mb-2">
              Online gambling gross yield, Great Britain
            </h2>
            <p className="text-wiah-mid text-sm mb-6 font-mono">
              Gross gambling yield (&pound;bn): amount retained by operators after paying winnings. Gambling Commission data.
            </p>
            <LineChart
              title="Online gambling gross yield, Great Britain"
              subtitle="Gross gambling yield (&pound;bn): amount retained by operators after paying winnings. Gambling Commission data."
              series={onlineYieldSeries}
              annotations={[{ date: new Date(2020, 2), label: '2020: COVID-19; land-based venues closed' }]}
              source={{
                name: 'Gambling Commission',
                dataset: 'Annual Report and Accounts',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>
      </section>

      {/* ── Treatment Access Chart ────────────────────────────────────────── */}
      <section className="bg-wiah-light px-6 py-12">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div>
              <h2 className="text-2xl font-bold text-wiah-black mb-2">
                People in NHS gambling treatment services, England
              </h2>
              <p className="text-wiah-mid text-sm mb-6 font-mono">
                Annual figures. NHS National Problem Gambling Clinic and commissioned IAPT services.
              </p>
              <LineChart
                title="People in NHS gambling treatment services, England"
                subtitle="Annual figures. NHS National Problem Gambling Clinic and commissioned IAPT services."
                series={treatmentSeries}
                source={{
                  name: 'NHS England',
                  dataset: 'IAPT Data Portal',
                  frequency: 'annual',
                }}
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Problem Gambling by Activity Type ────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <ScrollReveal>
          <div>
            <h2 className="text-2xl font-bold text-wiah-black mb-2">
              Problem gambling prevalence by type of gambling activity
            </h2>
            <div className="space-y-4 mt-8">
              {data.byGamblingType.map((item, idx) => {
                const widthPct = (item.pctProblematic / maxActivityRate) * 100;
                return (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-48 text-sm font-semibold text-wiah-black truncate">
                      {item.type}
                    </div>
                    <div className="flex-1">
                      <div className="bg-wiah-border rounded h-6 overflow-hidden">
                        <div
                          className="h-full bg-wiah-red transition-all"
                          style={{ width: `${widthPct}%` }}
                        />
                      </div>
                    </div>
                    <div className="w-12 text-right font-mono text-sm font-semibold text-wiah-black">
                      {item.pctProblematic}%
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="text-wiah-mid text-xs mt-6 font-mono">
              Source: Gambling Commission, Problem Gambling by Activity, 2022
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* ── Context Section ────────────────────────────────────────────────── */}
      <section id="sec-context" className="bg-wiah-light px-6 py-12">
        <div className="max-w-2xl mx-auto">
          <ScrollReveal>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>The Gambling Commission estimates that around 300,000 adults in Great Britain are problem gamblers, with a further 1.8 million at some risk of harm. Online gambling has been the dominant growth story: gross yield from online products rose from &pound;1.8bn in 2012 to &pound;6.9bn in 2022, now accounting for 46% of the total market. The harm is concentrated in specific products. The Commission found that 18% of online slot gamblers showed problem gambling symptoms &mdash; a rate far higher than for any land-based equivalent. The mechanism is straightforward: a product accessible 24 hours a day from a phone, with no closing time and no social friction, is structurally more addictive than a betting shop or casino.</p>
              <p>The consequences of problem gambling extend well beyond financial loss. A 2021 study estimated that approximately 500 suicides per year in England are associated with problem gambling &mdash; around one in fifty of all suicides &mdash; and that problem gamblers face a suicide risk roughly 15 times that of the general population. The pathway is consistent: escalating debt, concealment from family, shame, and the collapse of ordinary coping mechanisms. Debt compounds the crisis; problem gamblers often borrow to fund continued play, and the realisation of the full scale of losses can be a precipitating event. The accessibility of online gambling &mdash; available in the hours when support services are closed &mdash; makes the isolation more acute.</p>
              <p>Despite 300,000 estimated problem gamblers, only around 14,000 people are in gambling treatment services at any one time &mdash; a treatment gap of roughly 95%. The NHS National Problem Gambling Clinic opened in 2008; further clinics followed in 2019 and 2023, but capacity has never matched need. The 2023 Gambling Act review introduced a mandatory levy on operators to fund treatment, replacing a voluntary system that left funding dependent on industry goodwill. It also set online slot stake limits at &pound;5 for adults. Whether these measures are sufficient is contested: the industry spent &pound;1.5bn on advertising in 2021 alone, and several of the review&apos;s more stringent proposals were weakened before the final White Paper was published.</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Positive Callout ────────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <ScrollReveal>
          <PositiveCallout
            title="Gambling Act reform introduced stake limits"
            value="&pound;5"
            unit="max stake (adults)"
            description="The Gambling Act 2005 review, completed in April 2023, introduced online slot stake limits of &pound;5 for adults (or &pound;2 for under-25s), affordability checks for high-spending customers, and a mandatory levy on operators to fund treatment. Critics argue the measures are too modest; the online industry opposed the &pound;2 youth stake limit."
            source="Source: Gambling Commission, Gambling Act review outcomes, 2023"
          />
        </ScrollReveal>
      </section>
    </main>
  );
}
