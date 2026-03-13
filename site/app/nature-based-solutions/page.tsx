'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import PositiveCallout from '@/components/PositiveCallout';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

export default function NatureBasedSolutionsPage() {
  // Tree planting rate 2015–2024 (million trees/year)
  const treePlantingData = [6.8, 7.2, 7.8, 8.5, 10.2, 11.5, 9.8, 10.4, 10.1, 11.8];
  // Tree planting target trajectory 2015–2024 (million trees/year, on path to 50m/yr by 2030)
  const treePlantingTargetData = [10, 12, 15, 18, 22, 26, 30, 35, 40, 45];

  // Peatland restoration 2010–2024 (thousand hectares cumulative)
  const peatlandData = [5, 6, 7, 9, 11, 13, 15, 19, 25, 32, 40, 47, 52, 57, 62];

  const chart1Series: Series[] = [
    {
      id: 'actual',
      label: 'Trees planted (millions per year)',
      colour: '#2A9D8F',
      data: treePlantingData.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
    {
      id: 'target',
      label: 'Required trajectory to 50m trees/year by 2030',
      colour: '#6B7280',
      data: treePlantingTargetData.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
  ];

  const chart1Annotations: Annotation[] = [
    { date: new Date(2020, 0, 1), label: "2020: England Tree Strategy published" },
    { date: new Date(2023, 0, 1), label: '2023: Sustainable Farming Incentive expanded' },
  ];

  const chart1Target = { value: 50, label: 'Target: 50m trees/year by 2030' };

  const chart2Series: Series[] = [
    {
      id: 'peatland',
      label: 'Peatland under restoration (thousand ha)',
      colour: '#2A9D8F',
      data: peatlandData.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
    },
  ];

  const chart2Annotations: Annotation[] = [
    { date: new Date(2015, 0, 1), label: '2015: Peatland Code launched' },
    { date: new Date(2020, 0, 1), label: '2020: Nature for Climate Fund' },
  ];

  return (
    <>
      <TopicNav topic="Nature-Based Solutions" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Nature-Based Solutions"
          question="Is the UK Investing in Nature-Based Climate Solutions?"
          finding="Nature-based solutions (tree planting, peatland restoration, wetland creation) could deliver 12% of UK net zero — but funding is fragmented and planting targets are being missed."
          colour="#2A9D8F"
          preposition="on"
        />

        <PositiveCallout
          title="Peatland restoration up 340% since 2019"
          value="340%"
          description="Peatland restoration increased by 340% between 2019 and 2024, with 62,000 hectares now under active restoration. The UK holds 13% of the world's blanket bog — storing approximately 3.2 billion tonnes of carbon — and 3 million hectares of degraded peat currently emits 23 million tonnes of CO2 equivalent per year. The combination of the Peatland Code, Natural England's Peatland Action programme, and the Sustainable Farming Incentive has transformed what was previously a very slow programme into one of the most significant land use changes in England in recent decades."
          source="DESNZ / Natural England · Peatland Action Programme 2024"
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
              label="Tree planting rate (million trees/year)"
              value="11.8m"
              direction="up"
              polarity="up-is-good"
              changeText="+5m/yr since 2015 · target 50m/yr by 2030"
              sparklineData={[6.8, 7.2, 7.8, 8.5, 10.2, 11.5, 9.8, 10.4, 10.1, 11.8]}
              source="Forestry Commission · Woodland Creation Statistics 2024"
              href="#sec-charts"
            />
            <MetricCard
              label="Peatland restored (thousand ha cumulative)"
              value="62k ha"
              direction="up"
              polarity="up-is-good"
              changeText="+37k ha since 2019 · 340% increase"
              sparklineData={[11, 13, 15, 19, 25, 32, 40, 47, 52, 57, 62]}
              source="Natural England · Peatland Action 2024"
              href="#sec-charts"
            />
            <MetricCard
              label="Nature-based solutions funding (£m/year)"
              value="£750m"
              direction="up"
              polarity="up-is-good"
              changeText="+£450m since 2019 · fragmented across schemes"
              sparklineData={[120, 150, 200, 260, 300, 380, 480, 580, 650, 750]}
              source="DESNZ / Defra · Nature for Climate Fund 2024"
              href="#sec-charts"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-charts" className="mb-12">
            <LineChart
              title="UK tree planting rate vs target, 2015–2024 (million trees/year)"
              subtitle="Annual tree planting across England, Scotland, Wales and Northern Ireland vs the trajectory to reach 50 million trees per year by 2030."
              series={chart1Series}
              targetLine={chart1Target}
              annotations={chart1Annotations}
              yLabel="Trees planted (millions/year)"
              source={{
                name: 'Forestry Commission',
                dataset: 'Woodland Creation Statistics',
                frequency: 'annual',
                url: 'https://www.forestresearch.gov.uk/tools-and-resources/statistics/statistics-by-topic/woodland-statistics/',
                date: 'Oct 2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="UK peatland under active restoration, 2010–2024 (thousand hectares)"
              subtitle="Cumulative hectares of UK peatland rewetted and under active restoration management."
              series={chart2Series}
              annotations={chart2Annotations}
              yLabel="Peatland restored (thousand ha)"
              source={{
                name: 'Natural England / DESNZ',
                dataset: 'Peatland Action Programme',
                frequency: 'annual',
                url: 'https://www.gov.uk/government/publications/peatland-grant-scheme',
                date: 'Dec 2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-context" className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The data on nature-based climate solutions</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>The Climate Change Committee estimates that nature-based solutions — peatland restoration, woodland creation, wetland recovery, and sustainable soil management — could contribute approximately 12–15% of the UK's required greenhouse gas reductions by 2035. Peatland is the highest-priority intervention: the UK holds 13% of the world's blanket bog, storing 3.2 billion tonnes of carbon, but 3 million hectares of degraded peat currently emits approximately 23 million tonnes of CO2 equivalent per year. Rewetting degraded peatland prevents CO2 release and, over time, rebuilds the carbon storage function. By 2024, 62,000 hectares were under active restoration — a 340% increase from 2019 — funded through the Peatland Action programme, the Nature for Climate Grant Scheme, and the Sustainable Farming Incentive.</p>
              <p>Woodland creation is falling far short of targets. England planted approximately 11.8 million trees in 2024 — an improvement on recent years but still less than 25% of the trajectory needed to reach 50 million trees per year by 2030. The England Tree Strategy 2021 set a target of 30,000 hectares of new woodland per year by 2025 — current rates are running at roughly 11,000 hectares. Land competition with food production, planning delays, and the long time horizon before new trees provide meaningful carbon sequestration (20–30 years) make woodland creation both politically and economically challenging without sustained long-term payment schemes.</p>
              <p>Nature-based solutions and biodiversity recovery are largely complementary — carbon-rich habitats typically support high biodiversity, and many interventions deliver both outcomes simultaneously. Funding has grown substantially since 2019, reaching an estimated £750 million per year across government schemes, but it remains fragmented across the Sustainable Farming Incentive, the Countryside Stewardship scheme, and multiple competitive grants, creating high transaction costs for landowners and limiting the scale of individual projects. A more joined-up land use strategy, with coherent signals across planning, agriculture, and nature policy, would be the most significant accelerant available.</p>
            </div>
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p><a href="https://www.forestresearch.gov.uk/tools-and-resources/statistics/statistics-by-topic/woodland-statistics/" className="text-wiah-blue hover:underline" target="_blank" rel="noopener noreferrer">Forestry Commission — Woodland Statistics</a>. Annual. Woodland creation covers England, Scotland, Wales and Northern Ireland. Tree planting in millions of trees planted (not hectares, which varies by species and spacing).</p>
            <p><a href="https://www.gov.uk/government/publications/peatland-grant-scheme" className="text-wiah-blue hover:underline" target="_blank" rel="noopener noreferrer">Natural England / DESNZ — Peatland Action Programme</a>. Annual. Restoration hectares cover rewetting and active management under approved schemes. Pre-2015 figures include Scottish Government Peatland Action separate programme.</p>
            <p><a href="https://www.theccc.org.uk/publication/land-use-policies-for-a-net-zero-uk/" className="text-wiah-blue hover:underline" target="_blank" rel="noopener noreferrer">Climate Change Committee — Land Use: Policies for a Net Zero UK</a>. NBS contribution to net zero pathway. Funding figures are government scheme payments only; private voluntary market not included. All figures are UK unless stated.</p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
