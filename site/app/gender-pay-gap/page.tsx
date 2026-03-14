'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'ONS', dataset: 'Annual Survey of Hours and Earnings (ASHE)', url: 'https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/earningsandworkinghours/bulletins/genderpaygapintheuk/2023', date: '2023' },
  { num: 2, name: 'IFS', dataset: 'The Motherhood Penalty research', date: '2023' },
  { num: 3, name: 'FTSE Women Leaders Review', dataset: 'Annual Review', url: 'https://www.ftsewomenleaders.com/', date: '2023' },
  { num: 4, name: 'Gov.uk', dataset: 'Gender Pay Gap Service', url: 'https://gender-pay-gap.service.gov.uk/', date: '2023' },
];

// Gender pay gap full-time (%), 2012–2023
const fullTimeGapPct = [19.7, 19.7, 19.1, 18.4, 18.1, 17.4, 17.1, 17.3, 15.5, 15.4, 14.9, 14.3];
// Gender pay gap all workers (%), 2012–2023
const allWorkersGapPct = [22.5, 21.8, 21.1, 20.4, 19.9, 19.3, 18.8, 18.3, 17.8, 17.2, 16.6, 19.7];
// Women on FTSE 350 boards (%), 2012–2023
const womenOnBoardsPct = [13.0, 19.6, 24.9, 28.0, 33.0, 36.0, 38.5, 39.0, 40.0, 40.5, 40.8, 40.0];
// Financial services pay gap (%), 2012–2023
const financeSectorGapPct = [35, 34, 33, 32, 31, 30, 29, 29, 28.5, 28.3, 28.2, 28.1];

const payGapSeries: Series[] = [
  {
    id: 'full-time-gap',
    label: 'Full-time gender pay gap (%)',
    colour: '#F4A261',
    data: fullTimeGapPct.map((v, i) => ({ date: new Date(2012 + i, 5, 1), value: v })),
  },
  {
    id: 'all-workers-gap',
    label: 'All-workers gender pay gap (%)',
    colour: '#E63946',
    data: allWorkersGapPct.map((v, i) => ({ date: new Date(2012 + i, 5, 1), value: v })),
  },
];

const boardroomSeries: Series[] = [
  {
    id: 'women-boards',
    label: 'Women on FTSE 350 boards (%)',
    colour: '#2A9D8F',
    data: womenOnBoardsPct.map((v, i) => ({ date: new Date(2012 + i, 5, 1), value: v })),
  },
  {
    id: 'finance-gap',
    label: 'Financial services pay gap (%)',
    colour: '#E63946',
    data: financeSectorGapPct.map((v, i) => ({ date: new Date(2012 + i, 5, 1), value: v })),
  },
];

const payGapAnnotations: Annotation[] = [
  { date: new Date(2017, 5, 1), label: '2017: Mandatory pay gap reporting for 250+ employees' },
];

const boardroomAnnotations: Annotation[] = [
  { date: new Date(2021, 5, 1), label: '2021: Hampton-Alexander 40% target deadline' },
];

export default function GenderPayGapPage() {
  return (
    <>
      <TopicNav topic="Economy & Work" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Economy & Work"
          question="How Wide Is Britain's Gender Pay Gap?"
          finding="The UK gender pay gap stands at 14.3% for full-time workers — women earn 86p for every £1 earned by men. The gap persists in every sector and widens sharply after childbirth. At current rates of change, full parity is decades away."
          colour="#F4A261"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Women working full-time in Britain earn 86p for every £1 earned by men — a median gender pay gap of 14.3%.<Cite nums={[1]} /> When part-time workers are included the gap widens further, reflecting the disproportionate concentration of women in lower-paid roles. Financial services carries the largest sector gap at 28.1%, with a bonus gap of 40%.<Cite nums={[1]} /> Since mandatory reporting was introduced in April 2017 for employers with 250 or more staff, 78% still report a gap in favour of men.<Cite nums={[4]} /> The full-time gap has fallen from 19.7% in 2012 but is not projected to close for several more decades at current rates of change.<Cite nums={[1]} /></p>
            <p>The gap is near-zero for women in their twenties, then widens sharply after childbirth: by the time a first child reaches age 12, mothers earn 33% less than fathers, according to the IFS.<Cite nums={[2]} /> Women make up 77% of social care workers and 85% of NHS nurses but only 18% of engineers, and female-dominated sectors are systematically undervalued. Black women earn 20% less than white men; Pakistani and Bangladeshi women face the largest intersectional gaps. Shared Parental Leave has been taken up by only 2% of eligible fathers, doing little to redistribute caring responsibilities. Progress at boardroom level — FTSE 350 boards reached 40% female representation in 2023, up from 13% in 2012 — has not translated into the wider executive pipeline.<Cite nums={[3]} /></p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Pay Gap Trend' },
          { id: 'sec-chart2', label: 'Boardroom & Sector' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Gender pay gap (full-time workers)"
              value="14.3%"
              unit=""
              direction="down"
              polarity="up-is-bad"
              changeText="Women earn 86p per £1 · Down from 19.7% in 2012"
              sparklineData={fullTimeGapPct.slice(-8)}
              source="ONS · Annual Survey of Hours and Earnings 2023"
              href="#sec-chart1"
            />
            <MetricCard
              label="Financial services sector gap"
              value="28.1%"
              unit=""
              direction="flat"
              polarity="up-is-bad"
              changeText="Highest sector gap · bonus gap even larger at 40%"
              sparklineData={financeSectorGapPct.slice(-8)}
              source="ONS · ASHE sector breakdown 2023"
              href="#sec-chart2"
            />
            <MetricCard
              label="Women on FTSE 350 boards"
              value="40%"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="Up from 13% in 2012 · Hampton-Alexander target met"
              sparklineData={womenOnBoardsPct.slice(-8)}
              source="FTSE Women Leaders Review 2023"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="UK gender pay gap, 2012–2023"
              subtitle="Median hourly pay gap for full-time employees (amber) and all workers including part-time (red). Both narrowing, but part-time penalty keeps all-workers gap persistently higher."
              series={payGapSeries}
              annotations={payGapAnnotations}
              yLabel="Pay gap (%)"
              source={{ name: 'ONS', dataset: 'Annual Survey of Hours and Earnings (ASHE)', url: 'https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/earningsandworkinghours/bulletins/genderpaygapintheuk/2023', frequency: 'annual', date: '2023' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Women on FTSE 350 boards and financial services pay gap, 2012–2023"
              subtitle="Women's board representation (green) rising sharply, but financial services sector pay gap (red) barely moved — showing boardroom progress hasn't closed the earnings gap."
              series={boardroomSeries}
              annotations={boardroomAnnotations}
              yLabel="Percentage (%)"
              source={{ name: 'FTSE Women Leaders / ONS', dataset: 'FTSE Women Leaders Review / ASHE', url: 'https://www.ftsewomenleaders.com/', frequency: 'annual', date: '2023' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Mandatory reporting driving transparency since 2017"
            value="~11,000"
            unit="employers now reporting gender pay gaps annually"
            description="Since April 2017, all UK employers with 250 or more staff have been required to publish their gender pay gap annually. Around 11,000 organisations now report each year. The regime has brought unprecedented visibility: published figures are freely searchable, enabling employees, investors, and the public to compare employers directly. FTSE 350 boards now have 40% female representation, meeting the Hampton-Alexander target, up from 13% in 2012. The full-time pay gap has narrowed from 19.7% in 2012 to 14.3% in 2023 — the lowest on record. The phased expansion of funded childcare for children from nine months, rolling out 2024–25, is the most significant structural intervention in years."
            source="Source: ONS — Gender Pay Gap in the UK 2023. FTSE Women Leaders Review 2023. Gov.uk Gender Pay Gap Service."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/earningsandworkinghours/bulletins/genderpaygapintheuk/2023" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ONS — Gender Pay Gap in the UK</a> — Annual bulletin from the Annual Survey of Hours and Earnings. Retrieved 2024.</p>
            <p><a href="https://www.ftsewomenleaders.com/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">FTSE Women Leaders Review</a> — Annual review of women's representation on FTSE company boards. Retrieved 2024.</p>
            <p>Pay gap is difference between men's and women's median hourly earnings (excluding overtime) as a percentage of men's median hourly earnings. All-workers figure includes part-time employees. Sector gaps from mandatory employer reporting published via the government gender pay gap service.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
