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

interface ObesityData {
  national: {
    obesityPrevalence: {
      timeSeries: Array<{ year: number; obesePct: number }>;
      latestYear: number;
      latestPct: number;
      overweightPct: number;
    };
    childObesity: {
      timeSeries: Array<{ year: number; obesePct: number }>;
      latestYear: number;
      latestPct: number;
    };
    byDeprivation: Array<{ quintile: string; obesePct: number }>;
  };
  metadata: {
    sources: Array<{ name: string; dataset: string; url: string; frequency: string }>;
    methodology: string;
    knownIssues: string[];
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function ObesityPage() {
  const [data, setData] = useState<ObesityData | null>(null);

  useEffect(() => {
    fetch('/data/obesity/obesity.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const adultObesitySeries: Series[] = data
    ? [{
        id: 'adult-obesity',
        label: 'Adults obese (%)',
        colour: '#F4A261',
        data: data.national.obesityPrevalence.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.obesePct,
        })),
      }]
    : [];

  const childObesitySeries: Series[] = data
    ? [{
        id: 'child-obesity',
        label: 'Year 6 obese (%)',
        colour: '#F4A261',
        data: data.national.childObesity.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.obesePct,
        })),
      }]
    : [];

  const childObesityAnnotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: '2020: COVID-19 surge' },
  ];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Obesity" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Obesity"
          question="How Is Britain&apos;s Obesity Crisis Changing the Nation&apos;s Health?"
          finding="28% of adults in England are obese &mdash; double the 1990s rate. A further 38% are overweight. Obesity costs the NHS &pound;6.1 billion per year. The UK has the highest obesity rate in Western Europe. New GLP-1 weight-loss drugs (Wegovy, Mounjaro) could transform treatment, but NHS access is severely rationed."
          colour="#F4A261"
          preposition="in"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>In 1993, 15% of English adults were obese. By 2022 that figure was 28% &mdash; and a further 38% were overweight, leaving two in three adults at an unhealthy weight. Child obesity has risen in parallel: 23% of Year 6 children aged 10&ndash;11 were classified as obese in 2022/23, up from 19% before the pandemic, with rates spiking to 25.5% during the COVID-19 lockdowns before partially recovering. Ultra-processed foods now account for an estimated 57% of energy intake in the UK diet, and the built environment &mdash; cheap calories, fewer opportunities for active travel &mdash; has made weight gain the path of least resistance for millions of households.</p>
            <p>The health burden falls hardest on the poorest. Adults in the most deprived fifth of areas have an obesity rate of 35.1%, compared with 19.8% in the least deprived &mdash; a 15 percentage point gap that widens further among children. The direct NHS cost of obesity-related conditions &mdash; type 2 diabetes, cardiovascular disease, cancer, joint replacements &mdash; is &pound;6.1 billion per year, forecast to reach &pound;9.7 billion by 2050. Frontier Economics estimated the total economic burden, including lost productivity, at &pound;58 billion annually. The North East has the highest regional obesity rate (32%); London the lowest (22%), though London&apos;s figure conceals stark borough-level inequality.</p>
            <p>The 2018 Soft Drinks Industry Levy cut sugar content in drinks by around 40% without reducing sales volumes, and was associated with a modest reduction in child obesity. Advertising restrictions on high-fat, salt and sugar foods before the 9pm television watershed came into force in 2023, though evidence of population-level impact remains limited. The more significant development is pharmacological: GLP-1 receptor agonists such as semaglutide (Wegovy) produced average weight loss of 15% in clinical trials &mdash; a scale of effect previously unachievable. NICE approved semaglutide for obesity treatment in 2023. NHS rollout is under way via specialist weight management services, but supply constraints and a cost of around &pound;100 per month mean access remains tightly rationed. Whether the NHS can deploy these drugs at the scale the epidemic demands is the central question in obesity policy for the next decade.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-adults', label: 'Adult Obesity' },
          { id: 'sec-children', label: 'Child Obesity' },
          { id: 'sec-deprivation', label: 'By Deprivation' },
        ]} />

        <ScrollReveal>
          <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Adults classified as obese (England)"
              value="28%"
              direction="up"
              polarity="up-is-bad"
              changeText="2023 &middot; Up from 13% in the 1990s &middot; A further 38% overweight &middot; Highest in Western Europe"
              sparklineData={[23.1, 24.2, 22.0, 24.8, 26.0, 27.0, 28.7, 28.0, 25.9, 26.9, 28.0]}
              onExpand={() => {}}
            />
            <MetricCard
              label="Year 6 children classified as obese"
              value="23%"
              direction="up"
              polarity="up-is-bad"
              changeText="2023 &middot; Up from 19% in 2012 &middot; Surged to 25.5% during COVID lockdowns &middot; Deprivation gap: most deprived 2x more likely"
              sparklineData={[18.9, 19.1, 18.9, 19.1, 19.8, 20.1, 20.2, 20.6, 25.5, 23.4, 22.7, 23.0]}
              onExpand={() => {}}
            />
            <MetricCard
              label="Annual NHS cost of obesity-related conditions"
              value="&pound;6.1bn"
              direction="up"
              polarity="up-is-bad"
              changeText="Per year &middot; Forecast &pound;9.7bn by 2050 &middot; Diabetes, cardiovascular disease, cancers &middot; 30,000 premature deaths per year"
              sparklineData={[4.5, 4.8, 5.0, 5.2, 5.4, 5.6, 5.7, 5.8, 5.9, 6.0, 6.1]}
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-adults" className="mb-12">
            <LineChart
              title="Adult obesity prevalence, England, 2005&ndash;2023"
              subtitle="Percentage of adults with BMI ≥30, measured (not self-reported), from Health Survey for England."
              series={adultObesitySeries}
              yLabel="Adults obese (%)"
              source={{
                name: 'NHS Digital',
                dataset: 'Health Survey for England',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-children" className="mb-12">
            <LineChart
              title="Year 6 children classified as obese, England, 2012&ndash;2023"
              subtitle="Percentage of Year 6 children (aged 10–11) with BMI ≥95th percentile for age and sex, from National Child Measurement Programme."
              series={childObesitySeries}
              annotations={childObesityAnnotations}
              yLabel="Obese (%)"
              source={{
                name: 'NHS Digital',
                dataset: 'National Child Measurement Programme',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-deprivation" className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-2">Adult obesity rate by deprivation quintile, England, 2023</h2>
            <p className="text-sm text-wiah-mid font-mono mb-6">Percentage of adults classified as obese, by IMD deprivation quintile.</p>
            {data && (
              <div className="space-y-3">
                {data.national.byDeprivation.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-40 text-sm text-wiah-black flex-shrink-0">{item.quintile}</div>
                    <div className="flex-1 bg-wiah-border rounded h-5 overflow-hidden">
                      <div
                        className="h-full rounded"
                        style={{ width: `${(item.obesePct / 35.1) * 100}%`, backgroundColor: '#F4A261' }}
                      />
                    </div>
                    <div className="w-16 text-right text-sm font-mono text-wiah-black">{item.obesePct}%</div>
                  </div>
                ))}
              </div>
            )}
            <p className="font-mono text-xs text-wiah-mid mt-4">Source: NHS Digital &mdash; Health Survey for England 2023</p>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="What&apos;s changing"
            value="GLP-1"
            unit="weight-loss drugs (Wegovy, Mounjaro) are showing 15&ndash;20% body weight reduction in clinical trials"
            description="GLP-1 receptor agonists (semaglutide/Wegovy, tirzepatide/Mounjaro) have produced 15&ndash;20% body weight reductions in clinical trials &mdash; far beyond anything previously available. NHS England approved Mounjaro in November 2023 for people with BMI ≥35 and a weight-related condition, initially through specialist weight management services, with 2-year NHS use. The NHS Diabetes Prevention Programme reached 200,000 people in 2022/23, demonstrating that lifestyle intervention can prevent type 2 diabetes in 37% of cases. NICE updated obesity guidelines in 2023, recommending multi-component interventions. The sugar tax (Soft Drinks Industry Levy, 2018) reduced sugar content in drinks by 28.8% without reducing sales volumes."
            source="Source: NHS Digital &mdash; Health Survey for England 2023; NHS Digital &mdash; National Child Measurement Programme 2022/23."
          />
        </ScrollReveal>

        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            {data?.metadata.sources.map((src, i) => (
              <div key={i}>
                <a href={src.url} target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">
                  {src.name} &mdash; {src.dataset}
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
      </main>
    </>
  );
}
