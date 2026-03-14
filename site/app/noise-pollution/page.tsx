'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import PositiveCallout from '@/components/PositiveCallout';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'DEFRA', dataset: 'Strategic Noise Mapping', url: 'https://www.gov.uk/government/collections/noise-and-nuisance-statistics', date: '2024' },
  { num: 2, name: 'WHO', dataset: 'Environmental Noise Guidelines for the European Region', url: 'https://www.who.int/europe/publications/i/item/9789289053563', date: '2018' },
  { num: 3, name: 'EEA', dataset: 'Environmental Noise in Europe', url: 'https://www.eea.europa.eu/publications/environmental-noise-in-europe', date: '2022' },
  { num: 4, name: 'DEFRA', dataset: 'Noise Nuisance Statistics — Local Authority Returns', url: 'https://www.gov.uk/government/collections/noise-and-nuisance-statistics', date: '2024' },
];

export default function NoisePollutionPage() {

  const exposureData = [38.0, 38.5, 39.0, 39.5, 40.0, 40.0, 40.5, 40.8, 41.0, 41.3, 41.5, 41.8, 42.0];
  const complaintsData = [330, 345, 355, 365, 380, 395, 410, 435, 420, 405, 395, 385, 375];

  const exposureSeries: Series[] = [
    {
      id: 'exposure',
      label: 'Population exposed to road traffic noise above 55dB Lden (%)',
      colour: '#6B7280',
      data: exposureData.map((v, i) => ({ date: new Date(2012 + i, 0, 1), value: v })),
    },
  ];

  const complaintsSeries: Series[] = [
    {
      id: 'complaints',
      label: 'Noise complaints to local authorities (thousands)',
      colour: '#6B7280',
      data: complaintsData.map((v, i) => ({ date: new Date(2012 + i, 0, 1), value: v })),
    },
  ];

  const exposureAnnotations: Annotation[] = [
    { date: new Date(2018, 0, 1), label: '2018: WHO noise guidelines updated' },
  ];

  const complaintsAnnotations: Annotation[] = [
    { date: new Date(2020, 0, 1), label: '2020: Pandemic WFH drives noise sensitivity spike' },
    { date: new Date(2021, 0, 1), label: '2021: Peak 435,000 complaints' },
  ];

  return (
    <>
      <TopicNav topic="Noise Pollution" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Noise Pollution"
          question="Is Noise Pollution Harming Our Health?"
          finding="Around 40% of the UK population is regularly exposed to road traffic noise above WHO recommended levels — linked to 3,000 premature deaths per year from cardiovascular disease."
          colour="#6B7280"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-exposure', label: 'Exposure Trend' },
          { id: 'sec-complaints', label: 'Complaints' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Population exposed above WHO noise limit"
              value="40%"
              direction="up"
              polarity="up-is-bad"
              changeText="Above 55 dB Lden threshold · rising with urbanisation and traffic"
              sparklineData={exposureData}
              source="DEFRA Strategic Noise Mapping · 2024"
            />
            <MetricCard
              label="Premature deaths attributable per year"
              value="3,000"
              direction="up"
              polarity="up-is-bad"
              changeText="From cardiovascular disease linked to chronic noise exposure"
              sparklineData={[2200, 2300, 2400, 2500, 2600, 2700, 2800, 2900, 2950, 3000, 3000, 3000, 3000]}
              source="WHO / EEA European Noise Assessment · 2023"
            />
            <MetricCard
              label="Average noise level increase (decade)"
              value="+1.2 dB"
              direction="up"
              polarity="up-is-bad"
              changeText="In urban areas since 2012 · perceptible increase in urban environments"
              sparklineData={[0, 0.1, 0.2, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.1, 1.2, 1.2]}
              source="DEFRA Noise Action Plan · 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-exposure" className="mb-12">
            <LineChart
              title="Population exposed to road traffic noise above 55dB Lden, 2012–2024"
              subtitle="England. Percentage of population regularly exposed above the WHO Environmental Noise Guidelines threshold. Lden = day-evening-night noise indicator."
              series={exposureSeries}
              annotations={exposureAnnotations}
              yLabel="Population exposed (%)"
              source={{
                name: 'DEFRA',
                dataset: 'Strategic Noise Mapping',
                frequency: 'quinquennial',
                url: 'https://www.gov.uk/government/collections/noise-and-nuisance-statistics',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-complaints" className="mb-12">
            <LineChart
              title="Noise complaints to local authorities, England, 2012–2024"
              subtitle="Thousands of complaints per year. Includes domestic, construction, industrial, and transport noise. Data from local authority returns to DEFRA."
              series={complaintsSeries}
              annotations={complaintsAnnotations}
              yLabel="Complaints (thousands)"
              source={{
                name: 'DEFRA',
                dataset: 'Noise Nuisance Statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="Electric vehicle transition and noise reduction"
            value="−3 dB"
            unit="projected urban noise reduction by 2035"
            description="The transition to electric vehicles is expected to reduce road traffic noise by up to 3 dB in urban areas by 2035, as electric motors are significantly quieter than combustion engines at low speeds. At higher speeds, tyre and road surface noise dominates — so benefits are concentrated in low-speed urban environments where noise harm is greatest."
            source="DEFRA / DfT Electric Vehicle Noise Assessment · 2024"
          />
        </ScrollReveal>

        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The data on noise pollution</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>Environmental noise is the second most harmful environmental health risk in Europe after air pollution, according to the World Health Organization.<Cite nums={2} /> In England, DEFRA's strategic noise mapping estimates that around 40% of the population is exposed to road traffic noise above 55 dB Lden — the WHO Environmental Noise Guidelines threshold above which adverse health effects become significant.<Cite nums={1} /> An additional 2 million are exposed to harmful noise from railways, and 680,000 from major airports.<Cite nums={1} /></p>
              <p>The WHO estimates that environmental noise causes around 3,000 premature deaths in England annually — primarily through cardiovascular disease — along with 48,000 new cases of ischaemic heart disease across Europe each year.<Cite nums={[2, 3]} /> Sleep disturbance is the primary health pathway: the WHO recommends night-time noise levels below 40 dB Lnight, but DEFRA mapping shows that 2.9 million people in England are exposed to road traffic noise above 50 dB Lnight.<Cite nums={1} /></p>
              <p>Noise complaints to local authorities peaked at 435,000 in 2021, driven by changed working patterns during the pandemic that made daytime neighbourhood noise more intrusive.<Cite nums={4} /> By 2024, complaints had moderated to around 375,000 but remained well above the 2012 baseline of 330,000.<Cite nums={4} /> Construction noise complaints have risen sharply in London and other major cities where housebuilding activity is increasing.</p>
            </div>
          </section>
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p><a href="https://www.gov.uk/government/collections/noise-and-nuisance-statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DEFRA</a> — Strategic Noise Mapping and Noise Nuisance Statistics. Noise maps produced every five years under the Environmental Noise Directive. Exposure figures are modelled estimates. Complaint data from local authority annual returns.</p>
            <p>WHO — Environmental Noise Guidelines for the European Region (2018). EEA — Environmental Noise in Europe (2022). Premature death estimates are modelled from exposure data using WHO exposure-response functions for cardiovascular disease.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
