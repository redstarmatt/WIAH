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

// Average Band D council tax £/year, 2010–2024 (DLUHC)
const councilTaxValues = [1196, 1196, 1196, 1200, 1252, 1337, 1439, 1484, 1530, 1591, 1671, 1756, 1898, 2065, 2171];

// Government grants to councils £bn real terms, 2010–2024
const govGrantValues = [39.0, 36.5, 33.2, 30.8, 28.9, 27.2, 26.1, 25.2, 24.8, 24.6, 24.8, 25.1, 24.5, 24.2, 24.0];

const series1: Series[] = [
  {
    id: 'band-d',
    label: 'Average Band D council tax (£/year)',
    colour: '#F4A261',
    data: councilTaxValues.map((v, i) => ({ date: new Date(2010 + i, 5, 1), value: v })),
  },
];

const series2: Series[] = [
  {
    id: 'gov-grant',
    label: 'Government grants to councils (£bn real terms)',
    colour: '#264653',
    data: govGrantValues.map((v, i) => ({ date: new Date(2010 + i, 5, 1), value: v })),
  },
];

const annotations1: Annotation[] = [
  { date: new Date(2016, 5, 1), label: '2016: Referendum cap raised to 4%' },
  { date: new Date(2020, 5, 1), label: '2020: 2% ASC precept introduced' },
  { date: new Date(2022, 5, 1), label: '2022: Cap raised to 5%' },
];

const annotations2: Annotation[] = [
  { date: new Date(2010, 5, 1), label: '2010: Austerity begins' },
  { date: new Date(2020, 5, 1), label: '2020: COVID grants (temporary)' },
];

const editorialRefs: Reference[] = [
  { num: 1, name: 'DLUHC', dataset: 'Council Tax Levels Set by Local Authorities', url: 'https://www.gov.uk/government/collections/council-tax-statistics', date: '2024' },
  { num: 2, name: 'HM Treasury / DLUHC', dataset: 'Local Authority Revenue Expenditure and Financing', url: 'https://www.gov.uk/government/collections/local-authority-revenue-expenditure-and-financing', date: '2024' },
  { num: 3, name: 'Institute for Fiscal Studies', dataset: 'Local Government Funding: The Picture in 2024', url: 'https://ifs.org.uk/publications/local-government-funding-picture-2024', date: '2024' },
];

export default function CouncilTaxPage() {
  return (
    <>
      <TopicNav topic="Council Tax" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Local Government"
          question="Why Does Council Tax Keep Rising While Services Are Cut?"
          finding="Council tax in England has risen 25% in real terms since 2016 — with many councils raising bills by the maximum permitted 5% per year — yet government grants have fallen 40% since 2010, producing less total funding overall."
          colour="#F4A261"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Council tax has risen every year since 2016 — yet local services have deteriorated in almost every area of provision.<Cite nums={1} /> Central government grants — which historically funded the majority of council spending — have been cut by over 40% in real terms since 2010.<Cite nums={2} /> Council tax revenue has risen, but from a much lower base and at a rate constrained by referendum limits (currently 5% per year including a 2% adult social care precept). The net result is that councils are collecting more from residents while spending less on them, as a growing share of income is consumed by the rocketing cost of adult social care, children's services, and temporary accommodation.<Cite nums={3} /></p>
            <p>The average Band D council tax bill in England reached £2,171 in 2024 — up from £1,439 in 2010, and up 25% in real terms since 2016.<Cite nums={1} /> These averages conceal enormous variation. In some London boroughs, bills remain under £1,500; in areas with high demand and low property values, bills exceed £2,500.<Cite nums={1} /> The failure to revalue properties since 1991 means council tax is profoundly regressive: a £500,000 house in a northern town pays the same as a £100,000 house in the same band, while a £10 million mansion in London pays only three times as much as a £150,000 flat.<Cite nums={3} /></p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Council Tax Trend' },
          { id: 'sec-chart2', label: 'Government Grants' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Average Band D council tax (England, 2024)"
              value="£2,171"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="up from £1,439 in 2010 · +25% in real terms since 2016"
              sparklineData={[1439, 1484, 1530, 1591, 1671, 1756, 1898, 2065, 2171]}
              source="DLUHC — Council tax levels 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Real-terms service spending reduction"
              value="-23%"
              unit="since 2010"
              direction="down"
              polarity="up-is-good"
              changeText="central grants cut 40% · council tax cannot fill the gap"
              sparklineData={[100, 95, 90, 86, 83, 80, 79, 79, 78, 78, 77]}
              source="IFS — Local government funding: the picture in 2024"
              href="#sec-chart2"
            />
            <MetricCard
              label="Councils at risk of s114"
              value="20+"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="9 councils issued s114 notices since 2018 · 20+ more at risk"
              sparklineData={[1, 1, 2, 3, 5, 7, 9, 15, 20]}
              source="LGA — Financial stability assessment 2024"
              href="#sec-sources"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Average Band D council tax, England, 2010–2024"
              subtitle="Average annual charge for a Band D property across all English billing authorities (£). Council tax has risen every year since 2010, including years when the government mandated freeze grants."
              series={series1}
              annotations={annotations1}
              yLabel="Annual charge (£)"
              source={{ name: 'DLUHC', dataset: 'Council Tax Levels Set by Local Authorities', url: 'https://www.gov.uk/government/collections/council-tax-statistics', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Central government grants to English councils, 2010–2024 (real terms)"
              subtitle="Net revenue support grant and formula grants in 2024 prices (£bn). Grants have fallen by over 40% since 2010, driving councils to raise council tax while delivering fewer services."
              series={series2}
              annotations={annotations2}
              yLabel="Government grants (£bn, real)"
              source={{ name: 'HM Treasury / DLUHC', dataset: 'Local Authority Revenue Expenditure and Financing', url: 'https://www.gov.uk/government/collections/local-authority-revenue-expenditure-and-financing', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Devolution: more control over local priorities"
            value="Greater Manchester, West Midlands, West Yorkshire"
            unit="devolution deals in operation"
            description="The introduction of devolution deals — granting major city-regions more control over spending and strategic planning — is allowing some councils to align investment with local priorities more effectively than the centralised grant system allowed. The English Devolution Bill (2025) proposes extending devolved powers to all areas of England by 2030. Combined authority mayors have used devolved powers to invest in transport, housing, and skills in ways that individual councils could not achieve alone."
            source="Source: DLUHC — English Devolution Bill 2025. Combined authority spending reviews 2024."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.gov.uk/government/collections/council-tax-statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DLUHC — Council Tax Levels Set by Local Authorities</a> — average Band D charges. Annual. Retrieved 2024.</p>
            <p><a href="https://www.gov.uk/government/collections/local-authority-revenue-expenditure-and-financing" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">HM Treasury / DLUHC — Local Authority Revenue Expenditure</a> — government grant data. Annual. Retrieved 2024.</p>
            <p><a href="https://ifs.org.uk/publications/local-government-funding-picture-2024" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Institute for Fiscal Studies — Local Government Funding</a> — independent analysis of spending trends.</p>
            <p>Council tax figures are average Band D charges across all English billing authorities. Government grant figures adjusted using GDP deflator. Band D is the reference band for council tax; actual charges vary by property band and local authority precepts.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
