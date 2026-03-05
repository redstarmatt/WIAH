'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';

interface PrevalencePoint {
  year: number;
  affectedMillions: number;
}

interface SymptomData {
  symptom: string;
  reportingPct: number;
}

interface ClinicPoint {
  year: number;
  clinicsCount: number;
}

interface EconomicImpactPoint {
  year: number;
  estimatedGDPImpactBillionGBP: number;
}

interface LongCovidData {
  national: {
    prevalence: {
      timeSeries: PrevalencePoint[];
      latestYear: number;
      latestMillions: number;
      limitingActivitiesMillions: number;
      unableToWorkThousands: number;
      note: string;
    };
    symptoms: {
      latestYear: number;
      data: SymptomData[];
    };
    nHSClinics: {
      timeSeries: ClinicPoint[];
      latestYear: number;
      latestCount: number;
      referralWaitWeeks: number;
    };
    economicImpact: {
      timeSeries: EconomicImpactPoint[];
      latestYear: number;
      latestBillionGBP: number;
      note: string;
    };
  };
  metadata: {
    sources: { name: string; dataset: string; url: string; frequency: string }[];
    methodology: string;
    knownIssues: string[];
  };
}

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

export default function LongCovidPage() {
  const [data, setData] = useState<LongCovidData | null>(null);

  useEffect(() => {
    fetch('/data/long-covid/long_covid.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const prevalenceSeries: Series[] = data
    ? [
        {
          id: 'prevalence',
          label: 'People with long COVID (estimated millions)',
          colour: '#E63946',
          data: data.national.prevalence.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.affectedMillions,
          })),
        },
      ]
    : [];

  const prevalenceAnnotations: Annotation[] = [
    { date: new Date(2022, 5, 1), label: '2022: Peak 2.1M' },
  ];

  const economicImpactSeries: Series[] = data
    ? [
        {
          id: 'economic',
          label: 'Estimated economic cost (&pound;bn)',
          colour: '#F4A261',
          data: data.national.economicImpact.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.estimatedGDPImpactBillionGBP,
          })),
        },
      ]
    : [];

  return (
    <>
      <TopicNav topic="Long COVID" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Long COVID"
          question="How Many People Are Still Ill from COVID?"
          finding="An estimated 1.5 million people in the UK have long COVID, down from a peak of 2.1 million in 2022. 800,000 report limitations on daily activities. 50,000 are unable to work. The estimated economic cost is &pound;5 billion a year."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              Long COVID &mdash; defined by NICE as symptoms persisting four or more weeks after infection &mdash; peaked at 2.1 million sufferers across Great Britain in January 2022, with subsequent estimates putting the figure at approximately 1.5 million in 2024. Women are affected more than men, and prevalence concentrates heavily among working-age adults aged 35&ndash;69. Some 800,000 people report long COVID limits their daily activities; 50,000 are unable to work at all. OBR estimates attribute roughly 20% of the rise in long-term sickness inactivity (from 2.1 million to 3.2 million since 2019) to long COVID, with the estimated economic cost running to &pound;5 billion per year. NHS England established 85 long COVID assessment clinics with a 12-week average wait; there is no licensed treatment, with care symptom-based. Vaccination reduces long COVID risk by around 50&percnt;, and the NIHR funded over &pound;50 million of research through the PHOSP-COVID study.
            </p>
            <p>
              Healthcare workers, care home staff, and transport workers unable to work from home were disproportionately affected during the first two waves before vaccination &mdash; mirroring pandemic exposure patterns. Post-exertional malaise, where physical or cognitive effort triggers symptom relapse lasting days, makes conventional rehabilitation counterproductive and traps patients in enforced inactivity. Children were not spared: multisystem inflammatory syndrome (MIS-C and PIMS-TS) hospitalised hundreds, with some experiencing lasting cardiac and neurological effects. Clinical trials in 2024&ndash;25 are testing antivirals, low-dose naltrexone for neuroinflammation, and apheresis, though none has yet produced definitive results.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-prevalence', label: 'Prevalence' },
          { id: 'sec-symptoms', label: 'Symptoms' },
          { id: 'sec-response', label: 'NHS Response' },
        ]} />

        <ScrollReveal>
          <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="People with long COVID (estimated)"
              value="1.5M"
              unit=""
              direction="down"
              polarity="up-is-bad"
              changeText="2024 · Down from 2.1M peak (2022) · 800K with daily limitations · 50K unable to work"
              sparklineData={[1.3, 2.1, 1.8, 1.5]}
              onExpand={() => {}}
            />
            <MetricCard
              label="NHS Long COVID clinics"
              value="85"
              unit=""
              direction="flat"
              polarity="up-is-good"
              changeText="2024 · Down from 91 peak · 12-week average wait · 91 clinics at peak in 2022-23"
              sparklineData={[60, 91, 91, 85]}
              onExpand={() => {}}
            />
            <MetricCard
              label="Estimated economic cost"
              value="&pound;5bn"
              unit=""
              direction="down"
              polarity="up-is-bad"
              changeText="2024 · Down from &pound;5.7bn peak · Lost output from work absence · Still one of UK&apos;s largest pandemic legacies"
              sparklineData={[1.5, 3.8, 5.7, 5.0]}
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-symptoms" className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-2">Most common long COVID symptoms, 2023</h2>
            <p className="text-sm text-wiah-mid font-mono mb-6">Percentage of long COVID sufferers reporting each symptom.</p>
            {data && (
              <div className="space-y-3">
                {data.national.symptoms.data.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-48 text-sm text-wiah-black flex-shrink-0">{item.symptom}</div>
                    <div className="flex-1 bg-wiah-border rounded h-5 overflow-hidden">
                      <div className="h-full rounded" style={{ width: `${item.reportingPct}%`, backgroundColor: '#E63946' }} />
                    </div>
                    <div className="w-12 text-right text-sm font-mono text-wiah-black">{item.reportingPct}%</div>
                  </div>
                ))}
              </div>
            )}
            <p className="font-mono text-xs text-wiah-mid mt-4">Source: ONS &mdash; COVID Infection Survey 2023. Multiple symptoms per person.</p>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-prevalence" className="mb-12">
            <LineChart
              title="Long COVID prevalence, Great Britain, 2021&ndash;2024"
              subtitle="Estimated number of people self-reporting symptoms 4+ weeks after COVID-19 infection. Peaked at 2.1 million in 2022. Declining as population immunity grows but remaining substantial."
              series={prevalenceSeries}
              annotations={prevalenceAnnotations}
              yLabel="Millions"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-response" className="mb-12">
            <LineChart
              title="Estimated economic cost of long COVID, UK, 2021&ndash;2024"
              subtitle="Estimated annual output loss from long COVID-related work absence and reduced productivity (&pound;bn). Peaked at &pound;5.7bn in 2023 and is declining slowly as prevalence falls."
              series={economicImpactSeries}
              annotations={[]}
              yLabel="&pound; billion"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="What&apos;s improving"
            value="&ndash;29%"
            unit="long COVID prevalence falling from 2.1M to 1.5M since 2022 peak"
            description="Long COVID prevalence has fallen by around 29% from its 2022 peak, driven by growing immunity (prior infection plus vaccination) and changes in circulating variants. Vaccination reduces long COVID risk by an estimated 50%. NIHR has funded &pound;50M+ of research including the PHOSP-COVID study which is tracking long-term recovery. NICE guidelines (NG188) have standardised care. Multiple clinical trials of potential treatments were ongoing in 2024, targeting fatigue, cognitive symptoms, and autonomic dysfunction."
            source="Source: ONS &mdash; COVID Infection Survey; NHS England &mdash; Long COVID assessment services 2024."
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
