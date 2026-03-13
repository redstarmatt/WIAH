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

// LGSCO complaints received, 2014–2024
const complaintsValues = [18870, 19210, 19850, 20340, 20910, 21500, 17200, 22650, 25100, 27400, 27950];

// Complaint upheld rate %, 2014–2024
const upheldValues = [52, 53, 54, 56, 58, 59, 61, 62, 64, 66, 67];

// Council funding per person real terms index (2010=100), 2014–2024
const fundingValues = [86, 83, 76, 73, 68, 65, 63, 62, 63, 63, 62];

const series1: Series[] = [
  {
    id: 'complaints',
    label: 'LGSCO complaints received',
    colour: '#F4A261',
    data: complaintsValues.map((v, i) => ({ date: new Date(2014 + i, 0, 1), value: v })),
  },
  {
    id: 'upheld',
    label: 'Upheld rate (% — right scale approx)',
    colour: '#E63946',
    data: upheldValues.map((v, i) => ({ date: new Date(2014 + i, 0, 1), value: v * 350 })),
  },
];

const series2: Series[] = [
  {
    id: 'funding',
    label: 'Central govt funding per person (index 2010=100)',
    colour: '#264653',
    data: fundingValues.map((v, i) => ({ date: new Date(2014 + i, 0, 1), value: v })),
  },
];

const annotations1: Annotation[] = [
  { date: new Date(2020, 0, 1), label: '2020: LGSCO suspends casework — COVID' },
  { date: new Date(2022, 0, 1), label: '2022: complaints surge post-COVID' },
];

const annotations2: Annotation[] = [
  { date: new Date(2016, 0, 1), label: '2016: funding cut accelerates' },
  { date: new Date(2023, 0, 1), label: '2023: first multi-year settlement in sight' },
];

const editorialRefs: Reference[] = [
  { num: 1, name: 'LGSCO', dataset: 'Annual Review of Complaints', url: 'https://www.lgo.org.uk/information-centre/reports/annual-review-reports', date: '2024' },
  { num: 2, name: 'DLUHC', dataset: 'Local Authority Revenue Expenditure and Financing', url: 'https://www.gov.uk/government/collections/local-authority-revenue-expenditure-and-financing', date: '2024' },
  { num: 3, name: 'CIPFA', dataset: 'Financial Resilience Index', url: 'https://www.cipfa.org/services/financial-resilience-index', date: '2024' },
];

export default function CouncilComplaintsPage() {
  return (
    <>
      <TopicNav topic="Local Government Services" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Local Government"
          question="Does Your Council Actually Work?"
          finding="Ombudsman complaints have risen 30% since 2019 to nearly 28,000 a year. Two-thirds of investigated complaints are now upheld — the highest rate on record — as services deteriorate under sustained funding pressure."
          colour="#F4A261"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Complaints to the Local Government and Social Care Ombudsman have surged 30% since 2019, reaching nearly 28,000 in 2024 — and the proportion the Ombudsman upholds has climbed to 67%, a sustained rise from 52% a decade ago.<Cite nums={1} /> The most common complaint categories are housing (repairs and disrepair, where maintenance backlogs run into billions), planning (average decision time now 16 weeks against an 8-week target), adult social care, and education and SEND provision.<Cite nums={1} /> Average council complaint response times have stretched to 28 working days, well beyond the 10–20 day target most authorities set themselves.<Cite nums={1} /></p>
            <p>Behind the numbers sits a structural funding crisis: central government funding per person fell 40% in real terms between 2010 and 2024, while demand-led services — adult social care, children's services, homelessness support — have grown relentlessly.<Cite nums={2} /> Council tax rose 5% in 2024/25, the tenth consecutive above-inflation increase, yet the additional revenue has not kept pace with spending pressures.<Cite nums={[2, 3]} /> When a council closes a library, extends pothole repair times, or fails to process a planning application within statutory timescales, the Ombudsman is where residents end up — and they are increasingly finding that their complaint is justified.<Cite nums={1} /></p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Complaints Trend' },
          { id: 'sec-chart2', label: 'Funding Decline' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Ombudsman complaints received (2024)"
              value="27,950"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="+30% since 2019 · housing and planning lead"
              sparklineData={[19850, 20340, 20910, 21500, 17200, 22650, 25100, 27400, 27950]}
              source="LGSCO — Annual Review of Complaints 2023/24"
              href="#sec-chart1"
            />
            <MetricCard
              label="Complaint upheld rate"
              value="67%"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="was 52% in 2014 · rising steadily"
              sparklineData={[52, 54, 56, 58, 59, 61, 62, 64, 66, 67]}
              source="LGSCO — Annual Review of Complaints 2023/24"
              href="#sec-chart1"
            />
            <MetricCard
              label="Councils in financial distress"
              value="7"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Section 114 notices since 2020 · several near-misses"
              sparklineData={[0, 0, 1, 2, 3, 5, 7]}
              source="DLUHC — CIPFA Financial Resilience Index 2024"
              href="#sec-sources"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="LGSCO complaints received and upheld rate, 2014–2024"
              subtitle="Complaints received by the Local Government and Social Care Ombudsman (left scale) and upheld rate scaled for comparison. 2020 dip reflects COVID service suspension."
              series={series1}
              annotations={annotations1}
              yLabel="Complaints / upheld rate (scaled)"
              source={{ name: 'LGSCO', dataset: 'Annual Review of Complaints', url: 'https://www.lgo.org.uk/information-centre/reports/annual-review-reports', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Central government funding per person, real terms index (2010=100), 2014–2024"
              subtitle="Core spending power per person, adjusted for inflation. The 40% real-terms cut since 2010 has forced councils to reduce or withdraw services that residents rely on."
              series={series2}
              annotations={annotations2}
              yLabel="Index (2010=100)"
              source={{ name: 'DLUHC', dataset: 'Local Authority Revenue Expenditure and Financing', url: 'https://www.gov.uk/government/collections/local-authority-revenue-expenditure-and-financing', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Digital transformation reducing some failure points"
            value="25%"
            unit="reduction in call centre volumes in early-adopter councils"
            description="Digital service transformation in early-adopter councils has reduced call centre volumes by 25% through online planning portals, automated bin collection alerts, and AI-assisted housing triage. Several councils piloting proactive complaint resolution — contacting residents before they escalate — have reduced formal complaint volumes by 15–20%. The question is whether these innovations can scale fast enough to offset the structural gap between what councils are expected to deliver and what they are funded to provide."
            source="Source: LGSCO — Annual Review 2023/24. LGA — Digital transformation in local government, 2024."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.lgo.org.uk/information-centre/reports/annual-review-reports" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">LGSCO — Annual Review of Complaints</a> — complaints received, investigated, and upheld by category. Published annually.</p>
            <p><a href="https://www.gov.uk/government/collections/local-authority-revenue-expenditure-and-financing" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DLUHC — Local Authority Revenue Expenditure and Financing</a> — core spending power and settlement funding data. Annual.</p>
            <p><a href="https://www.cipfa.org/services/financial-resilience-index" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">CIPFA — Financial Resilience Index</a> — indicators of council financial stress. Annual.</p>
            <p>COVID-19 temporarily suppressed LGSCO complaints in 2020 as the Ombudsman suspended casework March–June 2020. Funding per person figures are adjusted to 2024 prices using the HM Treasury GDP deflator.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
