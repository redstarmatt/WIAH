'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'Skills for Care', dataset: 'The State of the Adult Social Care Sector and Workforce in England', url: 'https://www.skillsforcare.org.uk/Adult-Social-Care-Workforce-Data/Workforce-intelligence/publications/national-information/The-state-of-the-adult-social-care-sector-and-workforce-in-England.aspx', date: '2024' },
  { num: 2, name: 'NHS England', dataset: 'NHS Workforce Statistics', url: 'https://digital.nhs.uk/data-and-information/publications/statistical/nhs-workforce-statistics', date: '2024' },
  { num: 3, name: 'The Kings Fund', dataset: 'Social Care 360', url: 'https://www.kingsfund.org.uk/insight-and-analysis/data-and-charts/social-care-360', date: '2024' },
];

const vacancyRateValues = [6.6, 6.8, 7.4, 8.2, 10.7, 9.5, 8.7, 8.3, 7.9, 8.1, 8.4];
const turnoverValues = [28.3, 27.8, 28.1, 30.4, 28.5, 29.0, 31.2, 35.5, 34.1, 32.8, 31.5];
const zeroHoursValues = [25.0, 25.5, 24.8, 23.2, 22.1, 21.8, 22.5, 24.3, 25.1, 26.0, 27.2];
const internationalRecruitValues = [3.2, 3.4, 3.6, 3.8, 4.1, 5.2, 18.4, 35.0, 47.0, 52.0, 38.0];

const series1: Series[] = [
  { id: 'vacancy', label: 'Vacancy rate (%)', colour: '#E63946', data: vacancyRateValues.map((v, i) => ({ date: new Date(2014 + i, 5, 1), value: v })) },
  { id: 'turnover', label: 'Annual turnover rate (%)', colour: '#F4A261', data: turnoverValues.map((v, i) => ({ date: new Date(2014 + i, 5, 1), value: v })) },
];

const series2: Series[] = [
  { id: 'zerohours', label: 'On zero-hours contracts (%)', colour: '#6B7280', data: zeroHoursValues.map((v, i) => ({ date: new Date(2014 + i, 5, 1), value: v })) },
  { id: 'international', label: 'International recruits (thousands)', colour: '#264653', data: internationalRecruitValues.map((v, i) => ({ date: new Date(2014 + i, 5, 1), value: v })) },
];

const annotations1: Annotation[] = [
  { date: new Date(2020, 2, 1), label: '2020: COVID-19 pandemic' },
  { date: new Date(2022, 8, 1), label: '2022: Visa rules relaxed for care workers' },
];

export default function AdultSocialCareWorkforcePage() {
  return (
    <>
      <TopicNav topic="Adult Social Care Workforce" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Health & Social Care"
          question="Is the Adult Social Care Workforce Breaking Down?"
          finding={<>There are approximately 152,000 vacancies in adult social care in England on any given day — an 8.4% vacancy rate, against 4% across the wider economy.<Cite nums={1} /> Annual staff turnover runs at 31.5%, meaning one in three care workers leaves their job every year, costing providers an estimated £1.3 billion annually in recruitment and training.<Cite nums={[1, 3]} /></>}
          colour="#E63946"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Adult social care employs around 1.59 million people in England — more than the NHS — yet it operates on a fundamentally different footing. Local authority commissioning rates have not kept pace with the National Living Wage: the average fee paid per hour of homecare rose 3.4% in 2023/24, against a 9.8% rise in the NLW, compressing the margins that allow providers to pay decent wages, invest in training, or retain experienced staff.<Cite nums={[1, 3]} /> The result is a sector in chronic workforce crisis. Care workers earn an average of £10.80 per hour — below the Real Living Wage and barely above supermarket shelf-stacking — yet the work demands emotional intelligence, clinical awareness, and often physical strength. Around 27% of the workforce is on zero-hours contracts, providing no income security.</p>
            <p>The sector's reliance on international recruitment has grown dramatically since 2022, when social care was added to the shortage occupation list and overseas care workers were granted new visa routes. International recruits filled around 38,000 positions in 2023/24 — masking the underlying structural failures without solving them.<Cite nums={1} /> Visa restrictions tightened again in 2024, reducing the flow. Meanwhile, demand is rising: the population aged 85 and over — the group most likely to need intensive support — is projected to double by 2041. The workforce is not growing to meet it. Skills for Care estimates that 440,000 additional workers will be needed by 2035 just to maintain current service levels.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Overview' },
          { id: 'sec-chart1', label: 'Vacancies & Turnover' },
          { id: 'sec-chart2', label: 'Contracts & Recruitment' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard label="Vacancy rate" value="8.4%" unit="of all posts vacant" direction="up" polarity="up-is-bad" changeText="up from 6.6% in 2014 · ~152,000 vacancies daily" sparklineData={[6.6, 6.8, 7.4, 8.2, 10.7, 9.5, 8.7, 8.3, 7.9, 8.1, 8.4]} source="Skills for Care — State of the Workforce 2024" href="#sec-chart1" />
            <MetricCard label="Annual staff turnover" value="31.5%" unit="of workforce" direction="up" polarity="up-is-bad" changeText="was 28.3% in 2014 · costs £1.3bn annually in recruitment" sparklineData={[28.3, 27.8, 28.1, 30.4, 28.5, 29.0, 31.2, 35.5, 34.1, 32.8, 31.5]} source="Skills for Care — State of the Workforce 2024" href="#sec-chart1" />
            <MetricCard label="On zero-hours contracts" value="27.2%" unit="of workers" direction="up" polarity="up-is-bad" changeText="up from 25% in 2014 · no guaranteed hours" sparklineData={[25.0, 25.5, 24.8, 23.2, 22.1, 21.8, 22.5, 24.3, 25.1, 26.0, 27.2]} source="Skills for Care — State of the Workforce 2024" href="#sec-chart2" />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Adult social care vacancy rate and annual turnover, 2014–2024"
              subtitle="Vacancy rate (% of posts unfilled on census day) and annual staff turnover rate (% leaving in 12 months), England. Both indicators point to a workforce in chronic instability."
              series={series1}
              annotations={annotations1}
              yLabel="Percentage (%)"
              source={{ name: 'Skills for Care', dataset: 'State of the Adult Social Care Sector and Workforce', url: 'https://www.skillsforcare.org.uk/', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Zero-hours contract workers and international recruits, 2014–2024"
              subtitle="Proportion of workforce on zero-hours contracts (%) and international recruits starting new roles (thousands). International recruitment surged after 2022 visa changes then fell back after 2024 tightening."
              series={series2}
              annotations={[{ date: new Date(2022, 8, 1), label: '2022: Social care added to shortage occupation list' }, { date: new Date(2024, 2, 1), label: '2024: Visa restrictions tightened' }]}
              yLabel="% / Thousands"
              source={{ name: 'Skills for Care', dataset: 'State of the Adult Social Care Sector and Workforce', url: 'https://www.skillsforcare.org.uk/', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Registered nurse vacancies in social care have fallen"
            value="12.4%"
            unit="vacancy rate for registered nurses — down from 17.2% in 2022"
            description="After peaking at 17.2% in 2021/22, the vacancy rate for registered nurses in adult social care has fallen to 12.4%. International recruitment played a significant role. Several local areas have also piloted social care workforce development funds, providing fee-free training and NVQ Level 2 and 3 qualifications to new entrants, showing modest but measurable improvements in retention among those who complete formal qualifications."
            source="Source: Skills for Care — State of the Adult Social Care Sector and Workforce 2024."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.skillsforcare.org.uk/Adult-Social-Care-Workforce-Data/Workforce-intelligence/publications/national-information/The-state-of-the-adult-social-care-sector-and-workforce-in-England.aspx" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Skills for Care — The State of the Adult Social Care Sector and Workforce in England</a> — vacancies, turnover, contracts, international recruitment. Annual. 2024.</p>
            <p><a href="https://www.kingsfund.org.uk/insight-and-analysis/data-and-charts/social-care-360" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">The King's Fund — Social Care 360</a> — funding, commissioning rates, sector trends. Annual.</p>
            <p>Vacancy rates are a snapshot from the annual workforce census. Turnover includes leavers to all destinations. International recruits are those starting roles who were not previously employed in England.</p>
          </div>
        </section>
      </main>
    </>
  );
}
