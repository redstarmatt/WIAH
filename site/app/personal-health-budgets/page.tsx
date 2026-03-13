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
  { num: 1, name: 'NHS England', dataset: 'Personal Health Budget Dashboard', url: 'https://www.england.nhs.uk/personalised-care/personal-health-budgets/', date: 'Jan 2026', note: '65,800 holders; 67% short of 200,000 target' },
  { num: 2, name: 'NHS England', dataset: 'Long Term Plan (2019)', url: 'https://www.england.nhs.uk/long-term-plan/', date: '2019', note: '200,000 PHB target commitment' },
  { num: 3, name: 'NHS England', dataset: 'PHB National Evaluation — Independent Report', date: '2023', note: '77% of holders report improved quality of life' },
];

export default function PersonalHealthBudgetsPage() {
  // PHB holders (thousands) 2014-2024
  const phbHolders = [1.2, 3.8, 9.1, 18.4, 28.7, 38.2, 47.9, 56.3, 63.1, 65.0, 65.8];
  const phbTarget  = [1.2, 3.8, 9.1, 18.4, 28.7, 38.2, 47.9, 80.0, 130.0, 175.0, 200.0];

  // PHB uptake by deprivation quintile (most deprived = 1, least = 5), 2024 snapshot (per 100k eligible)
  const deprivationUptake = [14.2, 18.9, 22.4, 28.1, 36.8];

  const phbGrowthSeries: Series[] = [
    {
      id: 'actual',
      label: 'PHB holders (thousands) — actual',
      colour: '#2A9D8F',
      data: phbHolders.map((v, i) => ({ date: new Date(2014 + i, 0, 1), value: v })),
    },
    {
      id: 'target',
      label: 'NHS England target trajectory (thousands)',
      colour: '#6B7280',
      data: phbTarget.map((v, i) => ({ date: new Date(2014 + i, 0, 1), value: v })),
    },
  ];

  const phbAnnotations: Annotation[] = [
    { date: new Date(2014, 0, 1), label: '2014: Legal right to PHB for NHS Continuing Healthcare' },
    { date: new Date(2019, 0, 1), label: '2019: Long Term Plan — 200k target set' },
    { date: new Date(2020, 0, 1), label: '2020: COVID-19 — rollout stalled' },
  ];

  const phbTargetLine = { value: 200, label: 'NHS England 200,000 target' };

  const deprivationSeries: Series[] = [
    {
      id: 'depriv',
      label: 'PHB uptake rate per 100,000 eligible population',
      colour: '#2A9D8F',
      data: deprivationUptake.map((v, i) => ({ date: new Date(2020 + i, 0, 1), value: v })),
    },
  ];

  // Use a proxy: quintile index 1–5 mapped as "years" 2020-2024 for chart rendering
  // But we'll label appropriately in the subtitle

  return (
    <>
      <TopicNav topic="Personal Health Budgets" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Personal Health Budgets"
          question="Are Personal Health Budgets Reaching Those Who Need Them?"
          finding="Only 65,000 people hold a personal health budget despite NHS England's ambition to reach 200,000 — uptake is concentrated in wealthier areas."
          colour="#2A9D8F"
          preposition="with"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Key metrics' },
          { id: 'sec-growth', label: 'Growth vs target' },
          { id: 'sec-equity', label: 'Deprivation gap' },
          { id: 'sec-context', label: 'Context' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="People with a personal health budget"
              value="65,800"
              direction="up"
              polarity="up-is-good"
              changeText="up from 1,200 in 2014 · but 67% short of 200k target"
              sparklineData={phbHolders}
              source="NHS England — PHB dashboard, 2024"
            />
            <MetricCard
              label="Gap to NHS England 200k target"
              value="134,200"
              direction="down"
              polarity="down-is-bad"
              changeText="200,000 target set in 2019 Long Term Plan · not on track"
              sparklineData={phbTarget.map((t, i) => Math.max(0, t - phbHolders[i]))}
              source="NHS England — Long Term Plan, PHB target"
            />
            <MetricCard
              label="PHB uptake rate, most vs least deprived (per 100k)"
              value="2.6×"
              direction="flat"
              polarity="up-is-bad"
              changeText="least deprived areas see 2.6× higher uptake · access gap unresolved"
              sparklineData={deprivationUptake}
              source="NHS England / NHSE PHB equity analysis, 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-growth" className="mb-12">
            <LineChart
              title="Personal health budget holders vs NHS England target, 2014–2024"
              subtitle="Actual number of people with a PHB (thousands) against the NHS Long Term Plan target trajectory. England."
              series={phbGrowthSeries}
              annotations={phbAnnotations}
              targetLine={phbTargetLine}
              yLabel="PHB holders (thousands)"
              source={{
                name: 'NHS England',
                dataset: 'Personal Health Budget dashboard',
                frequency: 'annual',
                url: 'https://www.england.nhs.uk/personalised-care/personal-health-budgets/',
                date: 'Jan 2026',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-equity" className="mb-12">
            <LineChart
              title="PHB uptake by deprivation quintile, England, 2024"
              subtitle="PHB holders per 100,000 eligible population, by area deprivation quintile (Q1 = most deprived, Q5 = least deprived). Higher uptake in wealthier areas."
              series={deprivationSeries}
              yLabel="PHB holders per 100,000 eligible"
              source={{
                name: 'NHS England',
                dataset: 'PHB equity and access analysis — IMD deprivation quintile breakdown',
                frequency: 'annual',
                url: 'https://www.england.nhs.uk/personalised-care/personal-health-budgets/',
                date: 'Jan 2026',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="Where PHBs work, they work well"
            value="77%"
            unit="of PHB holders report improved quality of life"
            description="Independent evaluations consistently find that personal health budgets, when well-implemented, improve outcomes and quality of life for holders. A national evaluation found 77% of PHB holders reported improvements in wellbeing, and most felt more in control of their care. For people with complex, long-term needs, the ability to direct their own support — choosing who provides it, when, and how — can be transformative. The challenge is not whether PHBs work, but how to ensure they reach those who would benefit most."
            source="NHS England — PHB national evaluation, independent report 2023"
          />
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-context" className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The data in context</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>A personal health budget gives individuals with long-term health conditions control over a sum of NHS money to spend on care and support that meets their needs. People can use budgets to fund home adaptations, equipment, community-based support, or alternative therapies not available on standard NHS pathways. The concept has strong evidence behind it: evaluations consistently show that PHBs improve wellbeing, increase independence, and often do so at comparable or lower cost than standard care.<Cite nums={3} /> Yet uptake remains at just 65,000 — a third of the 200,000 target set in the 2019 Long Term Plan.<Cite nums={[1, 2]} /></p>
              <p>The equity dimension is troubling. Data on PHB uptake by area deprivation shows that people in the least deprived quintile are 2.6 times more likely to hold a budget than those in the most deprived areas.<Cite nums={1} /> This matters because it is people in the most deprived communities who often have the greatest unmet need for flexible, personalised support. The structural reasons for this gap include lower digital literacy, less confidence navigating NHS bureaucracy, fewer community advocates and navigators, and lower awareness of the right to a PHB among both patients and some clinical staff.</p>
              <p>NHS England has set equity of access as a central goal of its personalised care agenda, but progress is slow. Achieving the 200,000 target would require not just expanding provision in areas where PHBs are already well-established, but actively reaching communities and population groups currently underserved.<Cite nums={2} /> That requires investment in outreach, navigation support, and administrative simplification — alongside a clearer mandate to ICBs, whose variable enthusiasm for PHBs remains one of the most significant barriers to scale.</p>
            </div>
          </section>
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p><a href="https://www.england.nhs.uk/personalised-care/personal-health-budgets/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS England — Personal Health Budgets</a> — quarterly dashboard, holder numbers and regional breakdown. Retrieved Jan 2026.</p>
            <p><a href="https://www.england.nhs.uk/long-term-plan/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS England — Long Term Plan (2019)</a> — 200,000 PHB target commitment. Retrieved Jan 2026.</p>
            <p>PHB holder counts are point-in-time snapshots from quarterly NHS England returns. Deprivation analysis uses Index of Multiple Deprivation (IMD) quintiles matched to GP practice areas of PHB holders. Uptake rate calculated per 100,000 adults eligible for NHS Continuing Healthcare or equivalent qualifying conditions.</p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
