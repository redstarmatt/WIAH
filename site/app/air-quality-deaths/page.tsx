'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
export default function AirQualityDeathsPage() {

  const sparkData = [52000,50000,48000,46000,45000,44000,43000];
  const chartSeries: Series[] = [
    {
      id: 'main',
      label: 'Premature deaths from air pollution (annual)',
      colour: '#E63946',
      data: sparkData.map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
    {
      id: 'secondary',
      label: 'Local authorities breaching NO₂ limits',
      colour: '#6B7280',
      data: ([61,58,55,52,49,46,43]).map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
  ];
  const chartAnnotations: Annotation[] = [
    { date: new Date(2015, 0, 1), label: '2015: VW dieselgate' },
    { date: new Date(2023, 0, 1), label: '2023: ULEZ expanded' },
  ];
  const chartTargetLine = { value: 5.0, label: 'WHO PM2.5 guideline (μg/m³)' };

  return (
    <>
      <TopicNav topic="Air Quality Deaths" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Air Quality Deaths"
          question="How Many People Die from Air Pollution in Britain?"
          finding="Air pollution causes an estimated 43,000 premature deaths in the UK each year — still placing Britain among the worst in Europe. 43% of English local authorities breach legal nitrogen dioxide limits."
          colour="#E63946"
          preposition="with"
        />

        <section className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MetricCard
              label="Premature deaths from air pollution (annual)"
              value="43,000"
              direction="down"
              polarity="up-is-bad"
              changeText="down from 52,000 in 2010 · still 7th worst in Europe"
              sparklineData={[52000,50000,48000,46000,45000,44000,43000]}
              source="UK Health Security Agency — Mar 2024"
            />
            <MetricCard
              label="Local authorities breaching NO₂ limits"
              value="43%"
              direction="down"
              polarity="up-is-bad"
              changeText="down from 61% in 2019 · ULEZ expansion main driver"
              sparklineData={[61,58,55,52,49,46,43]}
              source="UK Health Security Agency — Mar 2024"
            />
          </div>
        </section>

        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="Premature deaths from air pollution (annual), UK"
              subtitle="UK data. Annotations mark key policy changes."
              series={chartSeries}
              targetLine={chartTargetLine}
              annotations={chartAnnotations}
              yLabel="Premature deaths from air pollution (annual)"
              source={{
                name: 'ONS / NHS England / Government Statistical Service',
                dataset: 'Air Quality Deaths statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="Local authorities breaching NO₂ limits, UK"
              subtitle="UK data. Source: official government statistics."
              series={[{
                id: 'sec',
                label: 'Local authorities breaching NO₂ limits',
                colour: '#6B7280',
                data: ([61,58,55,52,49,46,43]).map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
              }]}
              yLabel="Local authorities breaching NO₂ limits"
              source={{
                name: 'UK Health Security Agency',
                dataset: 'Local authorities breaching NO₂ limits',
                frequency: 'annual',
                url: 'https://www.gov.uk/government/publications/air-quality-and-health',
                date: 'Mar 2024',
              }}
            />
          </section>
        </ScrollReveal>


        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">Air Pollution Is Britain's Biggest Environmental Killer</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>Air pollution causes an estimated 43,000 premature deaths in the UK each year — more than alcohol and obesity combined, and still placing Britain among the worst in Europe. The long-run decline in PM2.5 concentrations driven by industrial emissions controls and the decline of coal has stalled, largely because domestic wood-burning now contributes 29% of UK PM2.5 emissions — the single largest source, and one that policy has been slow to address.</p>
              <p>The WHO tightened its annual PM2.5 guideline from 10 to 5 μg/m³ in 2021, a threshold now exceeded virtually everywhere in urban Britain. The Environment Act 2021 sets a legally binding target of 10 μg/m³ by 2040 — still twice the WHO guideline. The 2020 inquest ruling that air pollution contributed to Ella Adoo-Kissi-Debrah's death was a landmark moment, but progress on the most effective interventions — urban clean air zones, restrictions on domestic solid fuel burning, and reducing road traffic — remains slow.</p>
            </div>
          </section>
        </ScrollReveal>

        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <div className="space-y-2"><p><a href="https://www.gov.uk/government/publications/air-quality-and-health" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">UK Health Security Agency</a> — primary data source. Retrieved Mar 2024.</p><p>All figures are for England unless otherwise stated. Trend data uses the most recent available release at time of publication.</p></div>
          </div>
        </section>
      </main>
    </>
  );
}
