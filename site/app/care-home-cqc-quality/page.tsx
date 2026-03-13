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

// % rated Inadequate, 2015–2023
const inadequateData = [2.1, 2.3, 2.5, 2.8, 3.0, 3.2, 3.5, 3.6, 3.7];

// % rated Requires Improvement, 2015–2023
const requiresImprovementData = [22.4, 22.8, 23.1, 23.5, 24.2, 24.6, 25.0, 25.1, 25.4];

// Care homes closed since 2010 (cumulative), 2015–2023
const closedData = [800, 900, 1000, 1050, 1100, 1150, 1200, 1300, 1400];

const ratingSeries: Series[] = [
  {
    id: 'inadequate',
    label: 'Rated Inadequate (%)',
    colour: '#E63946',
    data: inadequateData.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
  {
    id: 'requires-improvement',
    label: 'Requires Improvement (%)',
    colour: '#F4A261',
    data: requiresImprovementData.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
];

const closureSeries: Series[] = [
  {
    id: 'closed',
    label: 'Cumulative care home closures since 2010',
    colour: '#6B7280',
    data: closedData.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
];

const ratingAnnotations: Annotation[] = [
  { date: new Date(2020, 0, 1), label: '2020: Pandemic severely impacts inspection capacity' },
  { date: new Date(2022, 0, 1), label: '2022: CQC restarts full inspection programme' },
];

const closureAnnotations: Annotation[] = [
  { date: new Date(2017, 0, 1), label: '2017: Four Seasons near-collapse begins sector crisis' },
  { date: new Date(2019, 0, 1), label: '2019: HC-One consolidation drive' },
];

const editorialRefs: Reference[] = [
  { num: 1, name: 'Care Quality Commission', dataset: 'State of Care Annual Report', url: 'https://www.cqc.org.uk/publications/major-report/state-care', date: '2023' },
  { num: 2, name: 'LaingBuisson', dataset: 'Care Homes for Older People UK Market Report', url: 'https://www.laingbuisson.com/', date: '2023' },
  { num: 3, name: 'Skills for Care', dataset: 'State of the Adult Social Care Sector and Workforce', url: 'https://www.skillsforcare.org.uk/Adult-Social-Care-Workforce-Data', date: '2024' },
];

export default function CareHomeCqcQualityPage() {
  return (
    <>
      <TopicNav topic="Care Home Quality" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Care Home Quality"
          question="Are Care Homes Safe?"
          finding="3.7% of care homes in England are rated Inadequate by the CQC — up from 2.1% in 2015 — and a further 25% Require Improvement. Nearly one in three homes is not meeting the standard. Over 1,400 care homes have closed since 2010, reducing capacity as an ageing population increases demand."
          colour="#F4A261"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>As of 2023, 3.7% of care homes in England are rated Inadequate by the CQC — up from 2.1% in 2015 — and a further 25.4% Require Improvement, meaning nearly one in three homes is not meeting the standard.<Cite nums={1} /> Financial pressure is the primary driver: local authority funding rates have historically been below the cost of care provision, forcing homes to cross-subsidise state-funded residents through higher charges to self-payers.<Cite nums={2} /> Over 1,400 care homes have closed since 2010, reducing capacity as an ageing population increases demand.<Cite nums={2} /> Workforce turnover runs at 28% annually, limiting the continuity of relationships central to good care.<Cite nums={3} /> Around 70% of care home residents have dementia, yet CQC inspections repeatedly identify inadequate dementia training and inappropriate use of antipsychotic medication as chemical restraint.<Cite nums={1} /></p>
            <p>The quality gap falls most heavily on residents funded by local authorities, who are concentrated in homes operating on the tightest margins.<Cite nums={2} /> Each home closure disrupts residents facing distressing moves at a deeply vulnerable point in their lives, often into accommodation further from family. The market structure — in which commercial operators serve a client group that cannot easily exercise consumer choice — creates incentives misaligned with quality. Large provider financial crises, such as the near-collapse of Four Seasons Healthcare in 2017, demonstrated the systemic risk of concentrated ownership in a provider market dependent on public funding. The CQC inspection backlog created by COVID-19 means some homes have not been assessed for over three years, creating a transparency gap in a market where families are making irreversible decisions.<Cite nums={1} /></p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'CQC Ratings' },
          { id: 'sec-chart2', label: 'Closures' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Care homes rated Inadequate"
              value="3.7%"
              unit="2023"
              direction="up"
              polarity="up-is-bad"
              changeText="Up from 2.1% in 2015 · financial pressure driving quality down"
              sparklineData={[2.1, 2.3, 2.5, 2.8, 3.0, 3.2, 3.5, 3.6, 3.7]}
              source="CQC · State of Care 2023"
              href="#sec-chart1"
            />
            <MetricCard
              label="Rated Requires Improvement"
              value="25.4%"
              unit="2023"
              direction="up"
              polarity="up-is-bad"
              changeText="1 in 4 homes below standard · combined 29% below adequate"
              sparklineData={[22.4, 22.8, 23.1, 23.5, 24.2, 24.6, 25.0, 25.1, 25.4]}
              source="CQC · State of Care 2023"
              href="#sec-chart1"
            />
            <MetricCard
              label="Care homes closed since 2010"
              value="1,400+"
              unit="closures"
              direction="up"
              polarity="up-is-bad"
              changeText="Market failures driving exit · 40,000+ beds lost"
              sparklineData={[800, 900, 1000, 1050, 1100, 1150, 1200, 1300, 1400]}
              source="CQC / LaingBuisson · 2023"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Care home CQC ratings: Inadequate and Requires Improvement, England, 2015–2023"
              subtitle="Percentage of inspected care homes rated Inadequate (red) or Requiring Improvement (amber). Both rising steadily as funding pressures increase and workforce challenges worsen."
              series={ratingSeries}
              annotations={ratingAnnotations}
              yLabel="% of care homes"
              source={{ name: 'Care Quality Commission', dataset: 'State of Care Annual Report', url: 'https://www.cqc.org.uk/publications/major-report/state-care', frequency: 'annual', date: '2023' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Cumulative care home closures since 2010, England, 2015–2023"
              subtitle="Total number of care homes closed since 2010, reducing bed capacity as demand from an ageing population grows. Accelerating pace of closures in recent years."
              series={closureSeries}
              annotations={closureAnnotations}
              yLabel="Cumulative closures"
              source={{ name: 'LaingBuisson / CQC', dataset: 'Care Homes Market Report / De-registrations', url: 'https://www.laingbuisson.com/', frequency: 'annual', date: '2023' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="72% of care homes are rated Good or Outstanding"
            value="72%"
            unit="of inspected care homes"
            description="Despite the challenges, the majority of England's care homes — 72% — are rated Good or Outstanding by the CQC, meaning the typical resident is in a home meeting or exceeding the standard. CQC improvement notices and enforcement actions have resulted in 68% of previously Inadequate homes improving their rating within 18 months of reinspection. The sector also employs 1.52 million people, making it one of the largest employers in England. Investment in workforce training, particularly through Skills for Care's qualification frameworks, has been linked to measurably better resident outcomes."
            source="Source: CQC — State of Care 2023. Skills for Care — State of the Adult Social Care Workforce 2024."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.cqc.org.uk/publications/major-report/state-care" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Care Quality Commission — State of Care Annual Report</a> — quality ratings and inspection data. Retrieved March 2026.</p>
            <p><a href="https://www.laingbuisson.com/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">LaingBuisson — Care Homes for Older People UK Market Report</a> — market capacity and closures analysis. Retrieved March 2026.</p>
            <p><a href="https://www.skillsforcare.org.uk/Adult-Social-Care-Workforce-Data" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Skills for Care — State of the Adult Social Care Sector and Workforce</a> — workforce and turnover data. Retrieved March 2026.</p>
            <p className="mt-2">Rating percentages drawn from CQC published inspection data as proportion of all registered care homes with a published rating. Closure figures from LaingBuisson market analysis and CQC de-registrations. Figures cover residential and nursing care homes in England. COVID-19 disrupted the inspection programme in 2020–21.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
