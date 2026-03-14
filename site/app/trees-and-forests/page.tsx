'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'Forest Research', dataset: 'Forestry Statistics — woodland area and planting', url: 'https://www.forestresearch.gov.uk/tools-and-resources/statistics/forestry-statistics/', date: '2024' },
  { num: 2, name: 'Climate Change Committee', dataset: 'Land Use Policies for a Net Zero UK — 30,000 ha/yr target', url: 'https://www.theccc.org.uk/publication/land-use-policies-for-a-net-zero-uk/', date: '2023' },
  { num: 3, name: 'Woodland Trust', dataset: 'Ancient Woodland Threat Monitoring', url: 'https://www.woodlandtrust.org.uk', date: '2024' },
  { num: 4, name: 'Defra', dataset: 'England Woodland Creation Offer guidance', url: 'https://www.gov.uk/guidance/england-woodland-creation-offer', date: '2022' },
];

export default function TreesAndForestsPage() {
  // New woodland creation 2015–2024 (ha/yr) — UK
  const plantingRaw = [9200, 10100, 10500, 11800, 13200, 13700, 13200, 12500, 13200, 13200];
  // UK woodland cover 1998–2024 (%)
  const coverRaw = [11.8, 11.9, 12.0, 12.1, 12.1, 12.2, 12.3, 12.4, 12.4, 12.5, 12.6, 12.7, 12.8, 12.9, 13.0, 13.0, 13.1, 13.1, 13.1, 13.1, 13.2, 13.2, 13.2, 13.2, 13.2, 13.2, 13.2];

  const plantingSeries: Series[] = [
    {
      id: 'planting',
      label: 'New woodland created (ha/yr)',
      colour: '#2A9D8F',
      data: plantingRaw.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
  ];

  const coverSeries: Series[] = [
    {
      id: 'cover',
      label: 'UK woodland cover (%)',
      colour: '#2A9D8F',
      data: coverRaw.map((v, i) => ({ date: new Date(1998 + i, 0, 1), value: v })),
    },
  ];

  const plantingAnnotations: Annotation[] = [
    { date: new Date(2019, 0, 1), label: '2019: Tree Action Plan announced' },
    { date: new Date(2022, 0, 1), label: '2022: England Woodland Creation Offer launched' },
  ];

  const plantingTarget = { value: 30000, label: 'Target: 30,000 ha/yr by 2025' };

  const coverTarget = { value: 16.5, label: 'Target: 16.5% by 2050' };

  return (
    <>
      <TopicNav topic="Trees & Forests" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Trees & Forests"
          question="Is Britain Planting Enough Trees?"
          finding="The UK planted 13,200 hectares of new woodland in 2023 — against a target of 30,000 hectares per year by 2025 — and is less than 13% woodland, one of the least wooded countries in Europe."
          colour="#2A9D8F"
          preposition="in"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The UK has approximately 3.24 million hectares of woodland, covering 13.2% of land area — one of the lowest proportions in Europe, where the average is 38%.<Cite nums={1} /> England is the least wooded nation at just 10%. The government's Environmental Improvement Plan set a target of increasing UK woodland cover to 16.5% by 2050, requiring approximately 30,000 hectares of new planting per year.<Cite nums={2} /> The UK is currently planting 13,200 hectares per year — less than half the target rate.</p>
            <p>The Climate Change Committee identifies tree planting as essential for the UK to reach net zero, with woodland sequestering carbon while also providing biodiversity, flood attenuation, and shade benefits.<Cite nums={2} /> At the current rate of planting and the current rate of ancient woodland loss — over 1,225 sites are currently threatened by development — the UK will fall far short of both its climate and nature targets.<Cite nums={3} /></p>
            <p>Scotland accounts for around 85% of UK new woodland creation, driven by a more generous planting grant regime.<Cite nums={1} /> England's contribution remains modest. The England Woodland Creation Offer, launched in 2022, offers payments of up to £10,200 per hectare in its first year, but take-up has been constrained by planning complexity, landowner uncertainty, and the 25-year management commitment required.<Cite nums={4} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-planting', label: 'New Woodland' },
          { id: 'sec-cover', label: 'Woodland Cover' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="New woodland planted (ha/yr)"
              value="13,200"
              direction="up"
              polarity="up-is-good"
              changeText="up from 9,200 in 2015 · but only 44% of 30,000 ha/yr target"
              sparklineData={[9200, 10100, 10500, 11800, 13200, 13700, 13200, 12500, 13200, 13200]}
              source="Forest Research — Forestry Statistics 2024"
            />
            <MetricCard
              label="Target (ha/yr)"
              value="30,000"
              direction="flat"
              polarity="neutral"
              changeText="Climate Change Committee requirement by 2025 · UK currently at 44% of target"
              sparklineData={[30000, 30000, 30000, 30000, 30000, 30000, 30000, 30000, 30000, 30000]}
              source="Climate Change Committee — Land Use Report 2023"
            />
            <MetricCard
              label="UK woodland cover (%)"
              value="13.2"
              direction="up"
              polarity="up-is-good"
              changeText="up from 11.8% in 1998 · European average: 38% · target: 16.5% by 2050"
              sparklineData={[11.8, 12.0, 12.2, 12.4, 12.6, 12.8, 13.0, 13.1, 13.2, 13.2]}
              source="Forest Research — National Forest Inventory 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-planting" className="mb-12">
            <LineChart
              title="New woodland creation, UK, 2015–2024"
              subtitle="Hectares of new woodland planted per year across the UK. Scotland accounts for ~85% of total. Target line shows Climate Change Committee requirement."
              series={plantingSeries}
              annotations={plantingAnnotations}
              targetLine={plantingTarget}
              yLabel="Hectares per year"
              source={{
                name: 'Forest Research',
                dataset: 'Forestry Statistics — Area of new planting',
                frequency: 'annual',
                url: 'https://www.forestresearch.gov.uk/tools-and-resources/statistics/forestry-statistics/',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-cover" className="mb-12">
            <LineChart
              title="UK woodland cover, 1998–2024"
              subtitle="Percentage of UK land area classified as woodland. National Forest Inventory. Progress towards 16.5% target is very slow at current planting rates."
              series={coverSeries}
              targetLine={coverTarget}
              yLabel="% of UK land area"
              source={{
                name: 'Forest Research',
                dataset: 'National Forest Inventory / Forestry Statistics',
                frequency: 'annual',
                url: 'https://www.forestresearch.gov.uk/tools-and-resources/statistics/forestry-statistics/',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p><a href="https://www.forestresearch.gov.uk/tools-and-resources/statistics/forestry-statistics/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Forest Research — Forestry Statistics</a>. Annual new planting and woodland cover data. Retrieved 2024.</p>
            <p><a href="https://www.theccc.org.uk/publication/land-use-policies-for-a-net-zero-uk/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Climate Change Committee — Land Use Policies for a Net Zero UK</a>. 30,000 ha/yr target derivation.</p>
            <p>New planting figures include restocking (replanting felled areas) and new woodland creation. Cover percentages are from the National Forest Inventory, which uses aerial survey and sample ground-truthing. Threatened ancient woodland data from Woodland Trust monitoring of planning applications.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
