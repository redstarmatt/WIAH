'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import PositiveCallout from '@/components/PositiveCallout';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

// Care home vacancy rate (%) and annual turnover rate (%), 2016–2024
const vacancyRateData = [10.2, 10.8, 11.3, 11.9, 12.4, 16.0, 17.3, 10.5, 9.8];
const turnoverRateData = [28.1, 28.5, 29.0, 29.4, 30.2, 31.0, 32.5, 29.8, 28.9];

// International care worker visas (thousands) and average hourly pay (£), 2016–2024
const intlVisasData = [12, 15, 18, 22, 28, 42, 101, 82, 70];
const hourlyPayData = [8.20, 8.50, 8.75, 9.00, 9.50, 10.00, 10.50, 11.00, 11.20];

const staffingSeries: Series[] = [
  {
    id: 'vacancyRate',
    label: 'Vacancy rate (%)',
    colour: '#E63946',
    data: vacancyRateData.map((v, i) => ({ date: new Date(2016 + i, 0, 1), value: v })),
  },
  {
    id: 'turnoverRate',
    label: 'Annual staff turnover (%)',
    colour: '#F4A261',
    data: turnoverRateData.map((v, i) => ({ date: new Date(2016 + i, 0, 1), value: v })),
  },
];

const recruitmentSeries: Series[] = [
  {
    id: 'intlVisas',
    label: 'International care visas issued (000s)',
    colour: '#264653',
    data: intlVisasData.map((v, i) => ({ date: new Date(2016 + i, 0, 1), value: v })),
  },
  {
    id: 'hourlyPay',
    label: 'Average hourly pay (£ × 10 for scale)',
    colour: '#6B7280',
    data: hourlyPayData.map((v, i) => ({ date: new Date(2016 + i, 0, 1), value: v * 10 })),
  },
];

const staffingAnnotations: Annotation[] = [
  { date: new Date(2021, 0, 1), label: '2021: Post-pandemic vacancy surge' },
  { date: new Date(2022, 0, 1), label: '2022: Health and Care Worker visa extended to care' },
];

const recruitmentAnnotations: Annotation[] = [
  { date: new Date(2022, 0, 1), label: '2022: International recruitment pathway opened' },
  { date: new Date(2024, 0, 1), label: '2024: Dependant visa restrictions cut inflows' },
];

export default function CareHomeStaffingPage() {
  return (
    <>
      <TopicNav topic="Care Home Staffing" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Social Care"
          question="Who Is Looking After Our Care Homes?"
          finding="Care homes face a structural staffing crisis: 165,000 vacancies, a 30% annual turnover rate, and average pay of £11.20 per hour — less than many supermarkets. International recruitment surged to 101,000 visas in 2022–23 before a crackdown on sponsorship abuse reduced flows to 70,000. The workforce remains under severe pressure as demand grows."
          colour="#F4A261"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The adult social care workforce in England — around 1.52 million jobs — is characterised by high vacancy rates, chronically high turnover, and pay that has historically lagged behind comparable sectors. As of 2024, the care home sector carries approximately 165,000 vacancies, a vacancy rate of around 9–10%. Annual staff turnover reached a pandemic peak of 32.5% in 2022 and has since edged down but remains above 28% — meaning that on average, more than one in four care workers leaves their employer each year. This instability is directly harmful to residents, for whom consistent relationships with familiar carers are fundamental to wellbeing, particularly for the 70% of care home residents with dementia.</p>
            <p>Average hourly pay in the care sector is £11.20 — above the National Living Wage floor but below rates offered by logistics, retail, and hospitality employers competing for the same workers. In response to the vacancy crisis, the government expanded the Health and Care Worker visa pathway to include care workers in 2022, leading to a surge in international recruitment that peaked at around 101,000 visas in 2022–23. However, widespread sponsorship abuse prompted the Home Office to restrict dependant visas in 2024, sharply reducing inflows to around 70,000. The international pipeline cannot substitute for a sustainable domestic recruitment and retention strategy rooted in competitive pay and career progression.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Vacancies & Turnover' },
          { id: 'sec-chart2', label: 'Recruitment & Pay' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Care home vacancies"
              value="165,000"
              unit="2024"
              direction="down"
              polarity="up-is-bad"
              changeText="Down from 172k peak · ~10% vacancy rate · 1.52m total workforce"
              sparklineData={[100, 105, 112, 118, 125, 165, 172, 168, 165]}
              source="Skills for Care · State of the Adult Social Care Sector 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Annual staff turnover rate"
              value="28.9%"
              unit="2024"
              direction="down"
              polarity="up-is-bad"
              changeText="Down from 32.5% peak in 2022 · 1 in 3 workers leave per year"
              sparklineData={[28.1, 28.5, 29.0, 29.4, 30.2, 31.0, 32.5, 29.8, 28.9]}
              source="Skills for Care · Workforce Intelligence 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Average care worker hourly pay"
              value="£11.20"
              unit="2024"
              direction="up"
              polarity="up-is-good"
              changeText="Up from £8.20 in 2016 · below comparable retail/logistics roles"
              sparklineData={[8.20, 8.50, 8.75, 9.00, 9.50, 10.00, 10.50, 11.00, 11.20]}
              source="Skills for Care · Workforce Intelligence 2024"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Care home vacancy rate and staff turnover, England, 2016–2024"
              subtitle="Vacancy rate % (red) and annual turnover rate % (amber). Both indicators reflect the structural instability of the care workforce, peaking during the post-pandemic period."
              series={staffingSeries}
              annotations={staffingAnnotations}
              yLabel="Percentage (%)"
              source={{ name: 'Skills for Care', dataset: 'State of the Adult Social Care Sector and Workforce', url: 'https://www.skillsforcare.org.uk/Adult-Social-Care-Workforce-Data', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="International care worker visas and average hourly pay, 2016–2024"
              subtitle="International Health and Care Worker visas issued to the care sector (thousands, dark) and average hourly pay scaled ×10 (grey). Visa surge followed 2022 expansion; crackdown reduced flows from 2024."
              series={recruitmentSeries}
              annotations={recruitmentAnnotations}
              yLabel="Visas (000s) / pay ×10"
              source={{ name: 'Home Office / Skills for Care', dataset: 'Visa Statistics / Workforce Intelligence', url: 'https://www.gov.uk/government/collections/immigration-statistics', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Care Workforce Pathway: career progression for the first time"
            value="6 levels"
            unit="named career levels introduced 2023"
            description="The Care Workforce Pathway — published in 2023 — introduces named career levels for care workers for the first time, providing a progression route from care assistant to senior practitioner with associated pay expectations at each level. Skills for Care's workforce development fund distributes £12 million annually to support training. The Registered Manager qualification framework has been linked to measurably better CQC ratings in homes where managers hold it. Fair Pay Agreements, piloted in adult social care, aim to set sector-wide minimum pay floors above the National Living Wage — addressing the competitive pay disadvantage that drives the retention crisis."
            source="Source: DHSC — Care Workforce Pathway 2023. Skills for Care — State of the Adult Social Care Sector 2024."
          />
        </ScrollReveal>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.skillsforcare.org.uk/Adult-Social-Care-Workforce-Data" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Skills for Care — State of the Adult Social Care Sector and Workforce</a> — vacancy rates, turnover, pay, and training data. Retrieved March 2026.</p>
            <p><a href="https://www.gov.uk/government/collections/immigration-statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Home Office — Immigration Statistics</a> — Health and Care Worker visa data by occupation and sector. Retrieved March 2026.</p>
            <p><a href="https://www.cqc.org.uk/publications/major-report/state-care" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">CQC — State of Care Annual Report</a> — workforce-quality linkage analysis. Retrieved March 2026.</p>
            <p className="mt-2">Vacancy and turnover data from Skills for Care's National Minimum Data Set for Social Care (NMDS-SC), covering approximately 60% of the care workforce. Pay figures are median hourly rates excluding overtime. International visa figures are Home Office administrative data for the Health and Care Worker visa route, care worker standard occupation classification.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
