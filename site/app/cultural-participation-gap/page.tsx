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

// Museum/gallery attendance — upper/middle socioeconomic group %, 2015–2024
const upperMiddleValues = [65, 64, 65, 64, 63, 62, 40, 55, 62, 63];

// Museum/gallery attendance — lower/working socioeconomic group %, 2015–2024
const lowerWorkingValues = [38, 37, 37, 36, 36, 35, 22, 30, 35, 36];

// Arts Council England funding real terms £M, 2010–2024
const artsFundingValues = [694, 670, 648, 628, 610, 595, 582, 570, 560, 550, 545, 510, 490, 480, 480];

const series1: Series[] = [
  {
    id: 'upper-middle',
    label: 'Upper/middle socioeconomic group (%)',
    colour: '#264653',
    data: upperMiddleValues.map((v, i) => ({ date: new Date(2015 + i, 5, 1), value: v })),
  },
  {
    id: 'lower-working',
    label: 'Lower/working socioeconomic group (%)',
    colour: '#E63946',
    data: lowerWorkingValues.map((v, i) => ({ date: new Date(2015 + i, 5, 1), value: v })),
  },
];

const series2: Series[] = [
  {
    id: 'arts-funding',
    label: 'Arts Council England grant-in-aid (real terms, £M)',
    colour: '#E63946',
    data: artsFundingValues.map((v, i) => ({ date: new Date(2010 + i, 5, 1), value: v })),
  },
];

const annotations1: Annotation[] = [
  { date: new Date(2020, 2, 1), label: '2020: COVID — museums close' },
  { date: new Date(2022, 5, 1), label: '2022: post-pandemic recovery' },
];

const annotations2: Annotation[] = [
  { date: new Date(2010, 5, 1), label: '2010: Austerity begins — funding cut' },
  { date: new Date(2020, 2, 1), label: '2020: Emergency COVID arts fund' },
];

const editorialRefs: Reference[] = [
  { num: 1, name: 'DCMS', dataset: 'Taking Part Survey', url: 'https://www.gov.uk/government/collections/dcms-taking-part-survey', date: '2024' },
  { num: 2, name: 'Arts Council England', dataset: 'Annual Report and Grant-in-Aid', url: 'https://www.artscouncil.org.uk/publication-types/annual-report', date: '2024' },
  { num: 3, name: 'DCMS', dataset: 'Sponsored Museums Performance Indicators', url: 'https://www.gov.uk/government/statistics/sponsored-museums-performance-indicators', date: '2024' },
];

export default function CulturalParticipationGapPage() {
  return (
    <>
      <TopicNav topic="Society & Democracy" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Society & Democracy"
          question="Who Gets to Experience Culture in Britain?"
          finding="Adults from higher socioeconomic groups are nearly twice as likely to visit museums and galleries as those from lower groups — a 27 percentage point gap that has barely moved in a decade. Arts Council England funding has fallen 30% in real terms since 2010. Access to culture in Britain is shaped by class, geography, and income."
          colour="#6B7280"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Britain has one of the world's great free museum policies. Since 2001, national museums have offered free entry, and the result has been impressive headline numbers — nearly 50 million visits a year to DCMS-sponsored institutions alone.<Cite nums={3} /> But those headline figures mask a structural inequality that has barely shifted in a generation. The DCMS Taking Part Survey consistently shows that adults from higher socioeconomic groups attend museums, galleries, and heritage sites at roughly twice the rate of those from lower socioeconomic groups.<Cite nums={1} /> In 2024, 63% of upper and middle socioeconomic adults had visited a museum or gallery in the past year, compared with just 36% of lower and working socioeconomic adults.<Cite nums={1} /> Free entry removes the ticket price but not the transport cost, the geographic distance, the time off work, or the sense that these spaces are "not for people like us."</p>
            <p>Funding cuts have made things worse. Arts Council England's grant-in-aid has fallen roughly 30% in real terms since 2010, forcing regional theatres, galleries, and community arts organisations to cut programmes, reduce opening hours, or close entirely.<Cite nums={2} /> Local authority spending on culture has fallen even further — by more than 40% in real terms in the most deprived areas. School arts provision has also narrowed: entries for GCSE arts subjects have fallen 47% since 2010, removing a key pipeline through which young people from all backgrounds encounter the arts. The pattern is clear: access to culture in Britain is increasingly shaped by where you live, what your parents earn, and whether anyone in your life ever took you to a gallery.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Attendance Gap' },
          { id: 'sec-chart2', label: 'Arts Funding' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Adult museum/gallery attendance (overall)"
              value="43%"
              unit="2024"
              direction="flat"
              polarity="up-is-good"
              changeText="largely unchanged since 2015 · free entry masks participation gap"
              sparklineData={[52, 51, 51, 50, 50, 49, 31, 43, 49, 50]}
              source="DCMS — Taking Part Survey 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Deprivation participation gap"
              value="27pp"
              unit="2024"
              direction="flat"
              polarity="up-is-bad"
              changeText="gap between highest and lowest socioeconomic groups · persistent since 2015"
              sparklineData={[27, 27, 28, 28, 27, 27, 18, 25, 27, 27]}
              source="DCMS — Taking Part Survey 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Arts Council funding (real terms)"
              value="-30%"
              unit="since 2010"
              direction="down"
              polarity="up-is-good"
              changeText="from £694M to £480M in real terms · regional arts hit hardest"
              sparklineData={[610, 595, 582, 570, 560, 550, 545, 510, 490, 480]}
              source="Arts Council England — Annual Report 2024"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Museum and gallery attendance by socioeconomic group, 2015–2024"
              subtitle="Percentage of adults attending at least once in the past year. The gap between upper/middle and lower/working groups has barely shifted despite free entry at national museums."
              series={series1}
              annotations={annotations1}
              yLabel="% of adults attending"
              source={{ name: 'DCMS', dataset: 'Taking Part Survey', url: 'https://www.gov.uk/government/collections/dcms-taking-part-survey', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Arts Council England grant-in-aid funding, real terms, 2010–2024"
              subtitle="Adjusted for inflation (2024 prices). A sustained 30% decline over 14 years, with regional theatres, galleries, and community arts organisations absorbing the cuts."
              series={series2}
              annotations={annotations2}
              yLabel="£ millions (real terms)"
              source={{ name: 'Arts Council England', dataset: 'Annual Report and Grant-in-Aid', url: 'https://www.artscouncil.org.uk/publication-types/annual-report', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Free national museums and the Levelling Up Culture fund"
            value="2,000+ organisations"
            unit="supported via Levelling Up Culture"
            description="Britain's free national museums policy, introduced in 2001, remains one of the most successful cultural access interventions in the world — DCMS-sponsored museums receive nearly 50 million visits a year with no entry charge. The Arts Council's Priority Places programme now targets 109 'Levelling Up for Culture Places' across England, directing funding to areas with historically low cultural investment. The £125 million Levelling Up Culture fund has supported over 200 projects in underserved areas, from new gallery spaces in Wakefield to community arts centres in Hartlepool. These interventions cannot close the participation gap alone, but they represent a recognition that geography and income should not determine who gets to experience culture."
            source="Source: DCMS — Sponsored Museums Performance Indicators 2024. Arts Council England — Levelling Up for Culture Places 2024."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.gov.uk/government/collections/dcms-taking-part-survey" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DCMS — Taking Part Survey</a> — annual survey of adult cultural participation by socioeconomic group, age, ethnicity, and region. 2024.</p>
            <p><a href="https://www.artscouncil.org.uk/publication-types/annual-report" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Arts Council England — Annual Report</a> — grant-in-aid allocation and NPO funding. Annual. 2024.</p>
            <p><a href="https://www.gov.uk/government/statistics/sponsored-museums-performance-indicators" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DCMS — Sponsored Museums Performance Indicators</a> — visits to DCMS-sponsored museums. Annual. 2024.</p>
            <p>Socioeconomic groupings follow the NS-SEC classification used in the Taking Part Survey. Real-terms funding figures deflated using HM Treasury GDP deflator. COVID years (2020/21) show artificially low participation due to closures.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
