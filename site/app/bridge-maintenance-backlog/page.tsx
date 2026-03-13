'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import PositiveCallout from '@/components/PositiveCallout';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

// Maintenance backlog, England local bridges, 2010–2025 (£ billions)
const backlogData = [0.8, 0.9, 1.0, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.7, 1.8, 1.9, 2.0, 2.1, 2.1];

// Weight-restricted bridges (count), 2010–2025
const weightData = [1180, 1220, 1290, 1360, 1440, 1510, 1590, 1680, 1760, 1840, 1870, 1930, 2000, 2060, 2100, 2140];

// Substandard bridges (% of stock), 2010–2025
const substandardData = [18.2, 19.0, 19.8, 20.5, 21.4, 22.1, 22.9, 23.8, 24.6, 25.3, 25.8, 26.5, 27.2, 28.0, 28.6, 29.1];

const backlogSeries: Series[] = [
  {
    id: 'backlog',
    label: 'Maintenance backlog (£ billions)',
    colour: '#E63946',
    data: backlogData.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
  },
];

const conditionSeries: Series[] = [
  {
    id: 'weight-restricted',
    label: 'Weight-restricted bridges (count)',
    colour: '#6B7280',
    data: weightData.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
  },
  {
    id: 'substandard-pct',
    label: 'Substandard bridges (% of stock × 100)',
    colour: '#F4A261',
    data: substandardData.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v * 50 })),
  },
];

const backlogAnnotations: Annotation[] = [
  { date: new Date(2010, 6, 1), label: '2010: Austerity cuts capital funding' },
  { date: new Date(2020, 2, 1), label: '2020: COVID disrupts inspections' },
];

const conditionAnnotations: Annotation[] = [
  { date: new Date(2014, 0, 1), label: '2014: 44t HGV limit raised' },
];

export default function BridgeMaintenanceBacklogPage() {
  return (
    <>
      <TopicNav topic="Bridge Maintenance Backlog" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Infrastructure"
          question="Are Britain's Bridges Actually Safe?"
          finding="England's local road bridge maintenance backlog has surpassed £2.1 billion — more than double its 2010 level. Nearly three in ten bridges are now rated substandard, weight restrictions on HGV traffic have risen 81% since 2010, and councils would need to spend four times their current budgets simply to stop the backlog growing further."
          colour="#E63946"
          preposition="with"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>England's local highway authorities are responsible for roughly 72,000 road bridges, and the accumulated cost of bringing them all back to good repair has now passed £2.1 billion. That figure has more than doubled since 2010, when austerity-era cuts to local government capital funding began a sustained squeeze on maintenance budgets. The consequence is not dramatic collapse — though the 2019 partial failure of a bridge in Rochdale and the prolonged closure of Hammersmith Bridge in London offered vivid previews — but a slow, compounding degradation that makes the network progressively less reliable and more expensive to fix.</p>
            <p>The most visible symptom is the rising number of weight-restricted bridges: over 2,140 in England now carry limits below the standard 40-tonne threshold, forcing HGVs onto longer diversions that add cost to haulage and concentrate wear on alternative routes. The RAC Foundation estimates each restricted bridge costs the surrounding economy £100,000–£500,000 annually in additional transport costs. Nearly 29% of local authority bridges are now rated substandard on principal inspection — not necessarily unsafe for current loads, but deteriorating faster than they are being repaired, and increasingly likely to require emergency intervention. A 2024 National Audit Office report found that councils would need to spend three to four times their current maintenance budgets simply to prevent the backlog from growing further.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Backlog' },
          { id: 'sec-chart2', label: 'Condition' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Bridge maintenance backlog"
              value="£2.1bn"
              unit="2025"
              direction="up"
              polarity="up-is-bad"
              changeText="Up 163% since 2010 · doubled in 15 years"
              sparklineData={[0.8, 1.0, 1.2, 1.4, 1.6, 1.7, 1.9, 2.1]}
              source="DfT — Road Condition Statistics 2025"
              href="#sec-chart1"
            />
            <MetricCard
              label="Weight-restricted bridges"
              value="2,140"
              unit="2025"
              direction="up"
              polarity="up-is-bad"
              changeText="Up 81% since 2010 · HGV diversions increasing"
              sparklineData={[1180, 1360, 1510, 1680, 1840, 1930, 2060, 2140]}
              source="RAC Foundation — Bridge Analysis 2025"
              href="#sec-chart2"
            />
            <MetricCard
              label="Bridges rated substandard"
              value="29.1%"
              unit="2025"
              direction="up"
              polarity="up-is-bad"
              changeText="Up from 18.2% in 2010 · nearly 1 in 3 bridges"
              sparklineData={[18.2, 20.5, 22.1, 23.8, 25.3, 26.5, 28.0, 29.1]}
              source="DfT — Local Authority Returns 2025"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Local road bridge maintenance backlog, England, 2010–2025"
              subtitle="Estimated cost to return all local authority highway bridges to good repair. Has more than doubled since austerity began in 2010."
              series={backlogSeries}
              annotations={backlogAnnotations}
              yLabel="£ billions"
              source={{ name: 'Department for Transport', dataset: 'Road Condition and Maintenance Statistics', url: 'https://www.gov.uk/government/statistical-data-sets/road-condition-statistics-data-tables-rdc', frequency: 'annual', date: '2025' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Bridge condition indicators, England, 2010–2025"
              subtitle="Weight-restricted bridges (count) and substandard bridges as % of stock (scaled). Both rising steadily as maintenance budgets contract."
              series={conditionSeries}
              annotations={conditionAnnotations}
              yLabel="Count / scaled %"
              source={{ name: 'RAC Foundation / DfT', dataset: 'Bridge Condition and Weight Restriction Analysis', url: 'https://www.racfoundation.org/research/economy/road-bridge-maintenance', frequency: 'annual', date: '2025' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Preventive maintenance yields a 4:1 return on investment"
            value="£4 saved"
            unit="per £1 of preventive spending"
            description="Research by the ADEPT Bridges Group and the UK Bridges Board demonstrates that every £1 invested in planned preventive bridge maintenance avoids approximately £4 in future reactive repair costs. Councils that have maintained consistent inspection and treatment programmes — notably Devon, which ring-fences bridge budgets — show measurably slower deterioration rates and fewer emergency closures than the national average. The evidence strongly supports a shift from the current reactive model to sustained preventive investment, though this requires multi-year capital funding commitments that the current annual settlement cycle does not support."
            source="Source: ADEPT / County Surveyors Society — ALARM Survey 2025. National Audit Office — Local Road Condition and Maintenance 2024."
          />
        </ScrollReveal>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.gov.uk/government/statistical-data-sets/road-condition-statistics-data-tables-rdc" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Department for Transport — Road Condition and Maintenance Statistics</a> — backlog estimates and condition ratings. Retrieved November 2025.</p>
            <p><a href="https://www.racfoundation.org/research/economy/road-bridge-maintenance" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">RAC Foundation — Bridge Condition and Weight Restriction Analysis</a> — weight restriction counts and economic impact estimates. Retrieved October 2025.</p>
            <p><a href="https://www.asphaltindustryalliance.com/alarm-survey.asp" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ADEPT / County Surveyors Society — ALARM Survey</a> — annual local authority road and bridge maintenance survey. Retrieved September 2025.</p>
            <p className="mt-2">All figures are for England unless otherwise stated. Backlog figures represent estimated costs at current prices. Substandard ratings are based on principal inspection results returned by local highway authorities to DfT. COVID-19 disrupted inspection schedules in 2020–21, so condition data for those years may understate deterioration.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
