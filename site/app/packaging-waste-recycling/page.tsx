'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import PositiveCallout from '@/components/PositiveCallout';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

export default function PackagingWasteRecyclingPage() {
  // Overall packaging recycling rates by material 2015–2024 (%)
  const overallRecyclingData = [62, 63, 63, 64, 64, 65, 65, 66, 67, 67];
  const glassRecyclingData = [67, 68, 68, 69, 70, 71, 72, 73, 74, 74];
  const paperCardboardData = [80, 81, 81, 82, 82, 83, 83, 84, 84, 84];
  const plasticRecyclingData = [40, 41, 42, 43, 44, 44, 46, 47, 48, 44];

  // Plastic packaging recycling UK vs EU average 2015–2024 (%)
  const ukPlasticData = [40, 41, 42, 43, 44, 44, 46, 47, 48, 44];
  const euPlasticData = [41, 42, 43, 44, 46, 48, 50, 51, 52, 52];

  const chart1Series: Series[] = [
    {
      id: 'overall',
      label: 'All packaging',
      colour: '#2A9D8F',
      data: overallRecyclingData.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
    {
      id: 'paper',
      label: 'Paper & cardboard',
      colour: '#264653',
      data: paperCardboardData.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
    {
      id: 'glass',
      label: 'Glass',
      colour: '#6B7280',
      data: glassRecyclingData.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
    {
      id: 'plastic',
      label: 'Plastic',
      colour: '#E63946',
      data: plasticRecyclingData.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
  ];

  const chart1Annotations: Annotation[] = [
    { date: new Date(2022, 0, 1), label: '2022: Plastic Packaging Tax introduced' },
    { date: new Date(2025, 0, 1), label: '2025: EPR regulations in force' },
  ];

  const chart2Series: Series[] = [
    {
      id: 'uk',
      label: 'UK plastic packaging recycling rate (%)',
      colour: '#264653',
      data: ukPlasticData.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
    {
      id: 'eu',
      label: 'EU average plastic packaging recycling rate (%)',
      colour: '#6B7280',
      data: euPlasticData.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
  ];

  const chart2Annotations: Annotation[] = [
    { date: new Date(2019, 0, 1), label: '2019: EU SUP Directive agreed' },
  ];

  const chart2Target = { value: 55, label: 'UK 2030 target: 55% plastic recycling' };

  return (
    <>
      <TopicNav topic="Packaging Waste Recycling" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Packaging Waste Recycling"
          question="What Happens to Packaging Waste?"
          finding="The UK recycles 67% of packaging waste — meeting EU legacy targets — but plastic packaging recycling lags at 44%, and Extended Producer Responsibility reforms have been repeatedly delayed."
          colour="#2A9D8F"
          preposition="on"
        />

        <PositiveCallout
          title="Paper and cardboard packaging recycling at 84%"
          value="84%"
          description="The UK now recycles 84% of all paper and cardboard packaging — one of the highest rates in Europe and up from 80% in 2015. This reflects the success of kerbside collection infrastructure built over the past two decades and strong market demand for recovered fibre from domestic paper mills. Paper and cardboard packaging recycling is now effectively at near-maximum practical rates given contamination and collection constraints, providing a model for what is possible in other material streams when infrastructure investment and consumer behaviour align."
          source="DEFRA / Environment Agency · Packaging Recycling Statistics 2024"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-charts', label: 'Charts' },
          { id: 'sec-context', label: 'Context' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Overall packaging recycling rate (%)"
              value="67%"
              direction="up"
              polarity="up-is-good"
              changeText="+5pp since 2015 · meets EU 65% benchmark"
              sparklineData={[62, 63, 63, 64, 64, 65, 65, 66, 67, 67]}
              source="DEFRA / EA · Packaging Recycling Statistics 2024"
              href="#sec-charts"
            />
            <MetricCard
              label="Plastic packaging recycling rate (%)"
              value="44%"
              direction="up"
              polarity="up-is-good"
              changeText="+4pp since 2015 · target 55% by 2030"
              sparklineData={[40, 41, 42, 43, 44, 44, 46, 47, 48, 44]}
              source="DEFRA / EA · Packaging Recycling Statistics 2024"
              href="#sec-charts"
            />
            <MetricCard
              label="EPR reform delay (years)"
              value="3+"
              direction="up"
              polarity="up-is-bad"
              changeText="EPR originally planned 2023 · in force Oct 2025"
              sparklineData={[0, 0, 0, 1, 1, 2, 2, 3, 3, 3]}
              source="DEFRA · EPR for Packaging 2024"
              href="#sec-charts"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-charts" className="mb-12">
            <LineChart
              title="UK packaging recycling rate by material, 2015–2024 (%)"
              subtitle="Percentage of packaging waste recovered through recycling by material category."
              series={chart1Series}
              annotations={chart1Annotations}
              yLabel="Recycling rate (%)"
              source={{
                name: 'DEFRA / Environment Agency',
                dataset: 'Packaging Recycling Statistics',
                frequency: 'annual',
                url: 'https://www.gov.uk/government/statistical-data-sets/env23-uk-waste-data-and-management',
                date: 'Dec 2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="Plastic packaging recycling — UK vs EU average, 2015–2024 (%)"
              subtitle="The UK closely tracked the EU average on plastic recycling until 2022, when the rate stalled as the EU continued to improve."
              series={chart2Series}
              targetLine={chart2Target}
              annotations={chart2Annotations}
              yLabel="Plastic packaging recycling rate (%)"
              source={{
                name: 'DEFRA / Eurostat',
                dataset: 'Packaging Recycling Statistics / Packaging Waste Statistics',
                frequency: 'annual',
                url: 'https://ec.europa.eu/eurostat/statistics-explained/index.php/Packaging_waste_statistics',
                date: 'Dec 2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-context" className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The data on packaging waste recycling</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>The UK's overall packaging recycling rate reached 67% in 2024, meeting the EU-derived 65% target inherited from pre-Brexit EU Packaging Directive obligations and up from 62% in 2015. Beneath this headline figure, performance is sharply differentiated by material. Paper and cardboard packaging recycling stands at 84% — near the practical ceiling. Glass is at 74%. Plastic, however, sits at just 44%, well below the government's 2030 target of 55% and significantly behind the EU average of 52%, which has continued improving while UK rates stalled after 2022.</p>
              <p>Contamination is the dominant operational constraint in plastic recycling. Household mixed dry recycling streams consistently show contamination rates of 10–20%, caused by incorrect sorting, co-mingling of incompatible polymers, and wishcycling. Unlike glass or paper — which can tolerate moderate contamination in reprocessing — plastic recycling requires near-pure polymer streams to produce high-quality secondary material. Where contamination is high, collected plastic is rejected or downcycled rather than genuinely recycled. Extended Producer Responsibility regulations, which came into force in October 2025, significantly increase industry's financial obligation for waste management costs, providing new funding for local authority collection infrastructure and creating incentives for producers to design for recyclability.</p>
              <p>The burden of inadequate recycling infrastructure falls unevenly. Councils in more deprived areas typically run simpler, co-mingled collection systems with higher contamination rates, while wealthier areas run source-separated streams achieving better material quality. A Deposit Return Scheme for drinks containers is due to launch in 2027 in England, Wales and Northern Ireland — which should substantially improve plastic bottle recycling rates — but flexible packaging, sachets, and multi-layer materials remain largely unrecyclable at scale through kerbside systems, regardless of collection quality.</p>
            </div>
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p><a href="https://www.gov.uk/government/statistical-data-sets/env23-uk-waste-data-and-management" className="text-wiah-blue hover:underline" target="_blank" rel="noopener noreferrer">DEFRA / Environment Agency — Packaging Recycling Statistics</a>. Annual. Recycling rates measured as percentage of packaging placed on market that is recycled, via Packaging Recovery Note (PRN) compliance data. Coverage gaps for smaller obligated producers.</p>
            <p><a href="https://ec.europa.eu/eurostat/statistics-explained/index.php/Packaging_waste_statistics" className="text-wiah-blue hover:underline" target="_blank" rel="noopener noreferrer">Eurostat — Packaging Waste Statistics</a>. Annual. EU figures based on Eurostat harmonised methodology; not fully comparable with UK PRN data. EU average weighted by packaging volumes.</p>
            <p>Extended Producer Responsibility regulations in force October 2025. Deposit Return Scheme launching 2027 in England, Wales and Northern Ireland. Scotland DRS operational from August 2023. Plastic packaging figures cover rigid and flexible plastic combined.</p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
