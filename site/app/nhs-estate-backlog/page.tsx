'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import PositiveCallout from '@/components/PositiveCallout';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

export default function NhsEstateBacklogPage() {
  // Total backlog £bn, 2014-2024
  const totalBacklog = [3.4, 4.1, 4.9, 5.5, 6.0, 6.5, 7.2, 7.9, 8.6, 10.0, 11.6];
  // High/significant risk backlog £bn, 2014-2024
  const highRiskBacklog = [0.8, 1.1, 1.5, 1.8, 2.1, 2.3, 2.6, 3.0, 3.4, 4.2, 5.1];

  // Backlog by risk category 2018-2024 (£bn)
  const criticalRisk  = [0.12, 0.14, 0.16, 0.18, 0.21, 0.28, 0.35];
  const highRisk      = [1.98, 2.16, 2.44, 2.82, 3.19, 3.92, 4.75];
  const moderateRisk  = [3.82, 4.06, 4.41, 4.69, 4.91, 5.24, 5.63];
  const lowRisk       = [1.08, 1.14, 1.19, 1.21, 1.09, 0.86, 0.87];

  const totalBacklogSeries: Series[] = [
    {
      id: 'total',
      label: 'Total NHS estate maintenance backlog (£bn)',
      colour: '#E63946',
      data: totalBacklog.map((v, i) => ({ date: new Date(2014 + i, 0, 1), value: v })),
    },
    {
      id: 'highrisk',
      label: 'High/significant risk backlog (£bn)',
      colour: '#F4A261',
      data: highRiskBacklog.map((v, i) => ({ date: new Date(2014 + i, 0, 1), value: v })),
    },
  ];

  const backlogAnnotations: Annotation[] = [
    { date: new Date(2016, 0, 1), label: '2016: Sustainability & Transformation Plans introduced' },
    { date: new Date(2020, 0, 1), label: '2020: COVID-19 — maintenance deferred' },
    { date: new Date(2021, 0, 1), label: '2021: £3.7bn new hospital programme announced' },
  ];

  const riskCategoryBacklogSeries: Series[] = [
    {
      id: 'critical',
      label: 'Critical (immediate risk to patients/staff) (£bn)',
      colour: '#1A1A1A',
      data: criticalRisk.map((v, i) => ({ date: new Date(2018 + i, 0, 1), value: v })),
    },
    {
      id: 'high',
      label: 'High risk (£bn)',
      colour: '#E63946',
      data: highRisk.map((v, i) => ({ date: new Date(2018 + i, 0, 1), value: v })),
    },
    {
      id: 'moderate',
      label: 'Moderate risk (£bn)',
      colour: '#F4A261',
      data: moderateRisk.map((v, i) => ({ date: new Date(2018 + i, 0, 1), value: v })),
    },
    {
      id: 'low',
      label: 'Low risk (£bn)',
      colour: '#6B7280',
      data: lowRisk.map((v, i) => ({ date: new Date(2018 + i, 0, 1), value: v })),
    },
  ];

  return (
    <>
      <TopicNav topic="NHS Estate Backlog" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="NHS Estate Backlog"
          question="How Bad is the NHS Estate Maintenance Backlog?"
          finding="The NHS estate maintenance backlog has reached £11.6 billion — with £5.1 billion classified as high or significant risk to patient safety."
          colour="#E63946"
          preposition="with"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Key metrics' },
          { id: 'sec-backlog', label: 'Backlog over time' },
          { id: 'sec-risk', label: 'Risk categories' },
          { id: 'sec-context', label: 'Context' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Total NHS estate backlog (£bn)"
              value="£11.6bn"
              direction="up"
              polarity="up-is-bad"
              changeText="up from £3.4bn in 2014 · 3.4× increase in 10 years"
              sparklineData={totalBacklog}
              source="NHS England — Estates Returns Information Collection (ERIC), 2024"
            />
            <MetricCard
              label="High/significant risk backlog (£bn)"
              value="£5.1bn"
              direction="up"
              polarity="up-is-bad"
              changeText="up from £0.8bn in 2014 · 44% of total backlog"
              sparklineData={highRiskBacklog}
              source="NHS England — ERIC, 2024"
            />
            <MetricCard
              label="Critical risk backlog (£m)"
              value="£350m"
              direction="up"
              polarity="up-is-bad"
              changeText="up from £120m in 2018 · immediate risk to patients and staff"
              sparklineData={criticalRisk.map(v => v * 1000)}
              source="NHS England — ERIC, 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-backlog" className="mb-12">
            <LineChart
              title="NHS estate maintenance backlog, 2014–2024"
              subtitle="Total backlog and high/significant risk component, £bn. England. Annual ERIC survey."
              series={totalBacklogSeries}
              annotations={backlogAnnotations}
              yLabel="Backlog value (£bn)"
              source={{
                name: 'NHS England',
                dataset: 'Estates Returns Information Collection (ERIC)',
                frequency: 'annual',
                url: 'https://www.england.nhs.uk/estates/eric/',
                date: 'Jan 2026',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-risk" className="mb-12">
            <LineChart
              title="NHS estate backlog by risk category, 2018–2024"
              subtitle="Breakdown of maintenance backlog by risk classification, £bn. Critical = immediate risk to patients or staff."
              series={riskCategoryBacklogSeries}
              yLabel="Backlog value (£bn)"
              source={{
                name: 'NHS England',
                dataset: 'Estates Returns Information Collection (ERIC) — risk category breakdown',
                frequency: 'annual',
                url: 'https://www.england.nhs.uk/estates/eric/',
                date: 'Jan 2026',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="The New Hospital Programme"
            value="40"
            unit="hospitals committed to rebuild or major refurbishment"
            description="The government's New Hospital Programme, first announced in 2020, commits to building or substantially rebuilding 40 hospitals by 2030 — the largest hospital building programme in NHS history. The programme has faced delays and cost increases, but a number of projects are now in construction. New facilities eliminate the backlog risk entirely in the buildings they replace and provide modern, energy-efficient clinical environments. Whether the programme delivers at scale and on schedule will be the defining infrastructure question for the NHS this decade."
            source="DHSC — New Hospital Programme, progress update 2025"
          />
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-context" className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The data in context</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>The NHS estate maintenance backlog is the accumulated cost of work needed to restore NHS buildings and infrastructure to an acceptable standard. It has grown from £3.4 billion in 2014 to £11.6 billion in 2024 — a 3.4-fold increase driven by chronic underinvestment in capital maintenance. The most alarming component is the £5.1 billion classified as posing high or significant risk: work that, if not done, creates a real and immediate risk to the quality and safety of patient care. The £350 million critical risk backlog represents infrastructure failures where patients or staff could be harmed today.</p>
              <p>RAAC — reinforced autoclaved aerated concrete — became a focal issue in 2023 when safety concerns forced emergency partial closures of hospitals built with the lightweight concrete used widely in NHS construction between the 1950s and 1990s. The RAAC problem illustrates a broader truth: the NHS is treating patients in buildings that are decades past their intended lifespan. Roof leaks, failing ventilation systems, outdated electrical infrastructure, and crumbling Victorian-era wards are not abstract statistics — they directly affect infection control, patient dignity, and staff safety.</p>
              <p>The long-term cause is straightforward: capital funding has consistently been raided to cover operational pressures. NHS trusts are legally required to balance their revenue accounts, and when faced with a choice between maintaining a building and treating a patient, the patient wins in the short term. Over decades, this rational short-termism has produced an irrational outcome: an estate so degraded that it is now itself a constraint on the system's ability to treat patients efficiently. Catching up would require sustained capital investment of a scale not seen since the PFI-funded hospital programme of the 2000s.</p>
            </div>
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p><a href="https://www.england.nhs.uk/estates/eric/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS England — Estates Returns Information Collection (ERIC)</a> — annual survey of NHS estate condition and backlog maintenance by risk category. Retrieved Jan 2026.</p>
            <p><a href="https://www.england.nhs.uk/estates/new-hospital-programme/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DHSC / NHS England — New Hospital Programme</a> — capital investment pipeline. Retrieved Jan 2026.</p>
            <p>Backlog figures represent the estimated cost of maintenance work needed to restore properties to a condition where they are reasonably fit for the present intended purpose. Risk categories follow standard NHS definitions: critical (immediate risk to patient/staff), high (serious risk within 2 years), moderate (within 3–5 years), low (longer term). All figures are for NHS trusts in England.</p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
