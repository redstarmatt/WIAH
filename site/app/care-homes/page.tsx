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

// CQC rating: % Good or Outstanding, % Requires Improvement or Inadequate, 2015–2024
const goodOutstandingData = [75.2, 74.8, 74.1, 73.5, 72.8, 72.0, 71.5, 71.9, 72.3, 72.8];
const belowStandardData = [24.8, 25.2, 25.9, 26.5, 27.2, 28.0, 28.5, 28.1, 27.7, 27.2];

// Staff vacancies (thousands) and self-funder vs LA-funded residents (%), 2015–2024
const vacanciesData = [95, 100, 108, 115, 122, 165, 172, 168, 165, 155];
const selfFunderPctData = [44, 44, 45, 45, 46, 46, 47, 47, 48, 48];

const ratingsSeries: Series[] = [
  {
    id: 'goodOutstanding',
    label: 'Good or Outstanding (%)',
    colour: '#2A9D8F',
    data: goodOutstandingData.map((v, i) => ({ date: new Date(2015 + i, 5, 1), value: v })),
  },
  {
    id: 'belowStandard',
    label: 'Requires Improvement or Inadequate (%)',
    colour: '#E63946',
    data: belowStandardData.map((v, i) => ({ date: new Date(2015 + i, 5, 1), value: v })),
  },
];

const workforceSeries: Series[] = [
  {
    id: 'vacancies',
    label: 'Sector vacancies (thousands)',
    colour: '#F4A261',
    data: vacanciesData.map((v, i) => ({ date: new Date(2015 + i, 5, 1), value: v })),
  },
  {
    id: 'selfFunderPct',
    label: 'Self-funder share of residents (%)',
    colour: '#264653',
    data: selfFunderPctData.map((v, i) => ({ date: new Date(2015 + i, 5, 1), value: v })),
  },
];

const ratingsAnnotations: Annotation[] = [
  { date: new Date(2020, 5, 1), label: '2020: Pandemic severely disrupts inspection programme' },
  { date: new Date(2022, 5, 1), label: '2022: CQC restarts full inspections' },
];

const workforceAnnotations: Annotation[] = [
  { date: new Date(2021, 5, 1), label: '2021: Post-pandemic vacancy surge' },
  { date: new Date(2022, 5, 1), label: '2022: International recruitment expanded' },
];

const editorialRefs: Reference[] = [
  { num: 1, name: 'Care Quality Commission', dataset: 'State of Care Annual Report', url: 'https://www.cqc.org.uk/publications/major-report/state-care', date: '2024' },
  { num: 2, name: 'Skills for Care', dataset: 'State of the Adult Social Care Sector and Workforce', url: 'https://www.skillsforcare.org.uk/Adult-Social-Care-Workforce-Data', date: '2024' },
  { num: 3, name: 'LaingBuisson', dataset: 'Care Homes for Older People UK Market Report', url: 'https://www.laingbuisson.com/', date: '2024' },
];

export default function CareHomesPage() {
  return (
    <>
      <TopicNav topic="Care Homes" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Social Care"
          question="What Is Actually Happening in Care Homes?"
          finding="Around 410,000 people in England live in residential or nursing care homes. Over a quarter — 27% — are in homes rated below the standard by the CQC. The sector employs 1.52 million people but carries 155,000 vacancies. Self-funders pay 41% more than council-funded residents for equivalent care, with providers dependent on the cross-subsidy to remain viable."
          colour="#F4A261"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Around 410,000 people live in residential and nursing care homes in England — a figure that has remained broadly stable despite an ageing population, as the sector has lost capacity through closures faster than it has added new provision.<Cite nums={[1, 3]} /> The Care Quality Commission inspects care homes against five domains: safe, effective, caring, responsive, and well-led. As of 2024, approximately 72% of inspected homes are rated Good or Outstanding.<Cite nums={1} /> But the remaining 27% — Requiring Improvement or Inadequate — represents over 3,500 homes and tens of thousands of residents receiving care that does not meet the standard.<Cite nums={1} /> Financial pressure is the primary driver of poor ratings: homes operating on the thinnest margins are least able to invest in staffing, training, and physical environment.</p>
            <p>The care home market is structurally dependent on self-funders — residents who pay their own fees, typically above the cost of care — to cross-subsidise local authority-funded places that are commissioned at below the true cost of provision.<Cite nums={3} /> Approximately 48% of residents are self-funders in 2024, up from 44% in 2015, as the capital threshold triggering self-funding (£23,250) has not been uprated with inflation.<Cite nums={3} /> This creates a two-tier system in which those who can pay receive a wider choice of placement, while council-funded residents are concentrated in homes operating on the narrowest margins. Workforce vacancies of 155,000 — down from a pandemic peak of 172,000 — reflect ongoing difficulty recruiting and retaining staff at current pay rates.<Cite nums={2} /></p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'CQC Ratings' },
          { id: 'sec-chart2', label: 'Workforce & Funding' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Care home residents in England"
              value="410,000"
              unit="2024"
              direction="flat"
              polarity="neutral"
              changeText="Stable despite ageing population · bed supply constrained by closures"
              sparklineData={[415, 414, 413, 412, 411, 410, 410, 410, 410, 410]}
              source="CQC / LaingBuisson · State of Care 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Homes rated below standard"
              value="27%"
              unit="2024"
              direction="down"
              polarity="up-is-bad"
              changeText="Slightly improved from 28.5% peak · 3,500+ homes affected"
              sparklineData={[24.8, 25.2, 25.9, 26.5, 27.2, 28.0, 28.5, 28.1, 27.7, 27.2]}
              source="CQC · State of Care 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Sector vacancies"
              value="155,000"
              unit="2024"
              direction="down"
              polarity="up-is-bad"
              changeText="Down from 172k peak · 1 in 10 posts unfilled · £11.20/hr avg pay"
              sparklineData={[95, 100, 108, 115, 122, 165, 172, 168, 165, 155]}
              source="Skills for Care · Workforce Intelligence 2024"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="CQC care home ratings, England, 2015–2024"
              subtitle="Percentage of inspected care homes rated Good or Outstanding (green) versus Requiring Improvement or Inadequate (red). Slow deterioration in quality ratings driven by financial pressure on the sector."
              series={ratingsSeries}
              annotations={ratingsAnnotations}
              yLabel="% of care homes"
              source={{ name: 'Care Quality Commission', dataset: 'State of Care Annual Report', url: 'https://www.cqc.org.uk/publications/major-report/state-care', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Care home sector vacancies and self-funder share of residents, 2015–2024"
              subtitle="Total sector vacancies (thousands, amber) and self-funder proportion of all residents (%, dark). Rising self-funder share reflects failure to uprate the capital threshold, concentrating LA-funded residents in pressured homes."
              series={workforceSeries}
              annotations={workforceAnnotations}
              yLabel="Vacancies (000s) / Self-funders (%)"
              source={{ name: 'Skills for Care / LaingBuisson', dataset: 'Workforce Intelligence / Care Homes Market Report', url: 'https://www.skillsforcare.org.uk/Adult-Social-Care-Workforce-Data', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="72% of care homes are rated Good or Outstanding"
            value="72%"
            unit="of inspected care homes meet or exceed the standard"
            description="Despite financial and workforce pressures, the majority of England's care homes — 72% — are rated Good or Outstanding by the CQC, meaning the typical resident is in a home that meets or exceeds the standard. CQC improvement notices and enforcement actions have resulted in 68% of previously Inadequate homes improving their rating within 18 months of reinspection. The sector employs 1.52 million people, making it one of the largest employers in England, and Skills for Care's qualification frameworks have been linked to measurably better resident outcomes in homes with higher-trained staff."
            source="Source: CQC — State of Care 2024. Skills for Care — State of the Adult Social Care Workforce 2024."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.cqc.org.uk/publications/major-report/state-care" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Care Quality Commission — State of Care Annual Report</a> — quality ratings, inspection outcomes, and sector data. Retrieved March 2026.</p>
            <p><a href="https://www.skillsforcare.org.uk/Adult-Social-Care-Workforce-Data" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Skills for Care — State of the Adult Social Care Sector and Workforce</a> — vacancy, turnover, and pay data. Retrieved March 2026.</p>
            <p><a href="https://www.laingbuisson.com/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">LaingBuisson — Care Homes for Older People UK Market Report</a> — market structure, self-funder ratios, and fee data. Retrieved March 2026.</p>
            <p className="mt-2">CQC ratings are as proportion of all registered care homes with a published rating. Vacancy data from Skills for Care NMDS-SC covering approximately 60% of the workforce. Self-funder ratios from LaingBuisson provider surveys. Resident population estimate from NHS Digital and LaingBuisson capacity data.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
