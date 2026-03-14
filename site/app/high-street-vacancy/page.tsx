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
  { num: 1, name: 'Local Data Company', dataset: 'GB Retail and Leisure Vacancy Report', url: 'https://www.localdatacompany.com/blog/gb-retail-and-leisure-reports', date: '2024' },
  { num: 2, name: 'BRC', dataset: 'Retail Sales Monitor', url: 'https://brc.org.uk/retail-insight-analytics/retail-sales-data/', date: '2024' },
  { num: 3, name: 'Centre for Cities', dataset: 'Cities Outlook — High Streets', url: 'https://www.centreforcities.org/', date: '2024' },
];

const vacancyRateValues = [11.2, 11.8, 12.4, 11.8, 11.4, 11.2, 17.1, 15.8, 14.2, 13.8, 13.9];
const onlineRetailShareValues = [13.2, 14.8, 16.6, 18.4, 20.0, 26.1, 28.1, 26.8, 26.2, 25.9, 26.5];
const storeClosuresValues = [16000, 16800, 17200, 16800, 17400, 18200, 21400, 17800, 15200, 14800, 15200];
const footfallIndexValues = [100, 101, 102, 103, 101, 100, 72, 80, 84, 86, 88];

const series1: Series[] = [
  { id: 'vacancy', label: 'High street vacancy rate (%)', colour: '#6B7280', data: vacancyRateValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
  { id: 'online', label: 'Online retail as % of total retail sales', colour: '#264653', data: onlineRetailShareValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
];

const series2: Series[] = [
  { id: 'closures', label: 'Net retail store closures per year', colour: '#E63946', data: storeClosuresValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
  { id: 'footfall', label: 'High street footfall index (2013 = 100)', colour: '#F4A261', data: footfallIndexValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
];

const annotations1: Annotation[] = [
  { date: new Date(2020, 2, 1), label: '2020: Lockdown — vacancy surged' },
  { date: new Date(2021, 0, 1), label: '2021: Business rates holiday extended' },
];

export default function HighStreetVacancyPage() {
  return (
    <>
      <TopicNav topic="High Street Vacancy" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Economy"
          question="How Empty Are Britain&apos;s High Streets?"
          finding={<>Around 13.9% of retail and leisure units on Great Britain&apos;s high streets are vacant — nearly 1 in 7 shops sitting empty — while online retail now accounts for 26.5% of all UK retail sales, a structural shift that lockdowns accelerated but did not create.<Cite nums={[1, 2]} /> High street footfall is still 12% below 2013 levels despite improvement from the pandemic low.<Cite nums={1} /></>}
          colour="#6B7280"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The structural decline of the British high street reflects two long-running forces and one acute shock. The first force is the rise of online retail, which has grown from 13% of all retail sales in 2013 to 26.5% today. The shift was largely driven by convenience and price competition from pure-play online retailers and by the major supermarkets&apos; aggressive online delivery expansion. The second force is the UK&apos;s outdated and regressive business rates system, which taxes retail floorspace at rates that have risen much faster than inflation while online retailers carry no comparable property cost burden, creating a significant structural disadvantage for physical retail.<Cite nums={[1, 2]} /> The acute shock was the COVID-19 pandemic, during which many high streets lost anchor tenants permanently — department stores, bank branches, pub chains — that had sustained footfall for decades.</p>
            <p>The vacancy rate has improved from its 2020 pandemic peak of 17.1% but has stalled at around 13.9%, and appears to be edging up again as cost pressures and high interest rates deter new entrants. The composition of high streets is changing: charity shops, nail salons, food-to-go outlets, and vape shops have filled some gaps, but at much lower employment density and consumer spending levels than the anchor retailers they replaced.<Cite nums={3} /> Centre for Cities analysis shows the steepest declines in northern English towns and coastal communities, where high streets had already lost major employers before the pandemic — creating a geography of retail decline that maps closely onto the geography of economic deprivation. The government&apos;s UK Shared Prosperity Fund and the Towns Fund have directed capital into some of these areas, but the scale of investment is far smaller than the structural adjustment required.<Cite nums={[1, 3]} /></p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Overview' },
          { id: 'sec-chart1', label: 'Vacancy & Online Share' },
          { id: 'sec-chart2', label: 'Closures & Footfall' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard label="High street vacancy rate" value="13.9%" unit="of units vacant" direction="up" polarity="up-is-bad" changeText="was 11.2% in 2013 · peaked at 17.1% during COVID" sparklineData={[11.2, 11.8, 12.4, 11.8, 11.4, 11.2, 17.1, 15.8, 14.2, 13.8, 13.9]} source="Local Data Company — Vacancy Report 2024" href="#sec-chart1" />
            <MetricCard label="Online retail market share" value="26.5%" unit="of all retail sales" direction="up" polarity="up-is-bad" changeText="was 13.2% in 2013 · structural shift accelerated by COVID" sparklineData={[13.2, 14.8, 16.6, 18.4, 20.0, 26.1, 28.1, 26.8, 26.2, 25.9, 26.5]} source="BRC / ONS — Retail Sales Monitor 2024" href="#sec-chart1" />
            <MetricCard label="High street footfall index" value="88" unit="(2013 = 100)" direction="up" polarity="up-is-good" changeText="recovering from 72 at COVID low · still 12% below 2013" sparklineData={[100, 101, 102, 103, 101, 100, 72, 80, 84, 86, 88]} source="Local Data Company — Vacancy Report 2024" href="#sec-chart2" />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="High street vacancy rate and online retail share, 2013–2024"
              subtitle="Vacancy rate of retail and leisure units on GB high streets (%) and online retail as % of total UK retail sales. The structural shift to online has driven a secular increase in vacancies."
              series={series1}
              annotations={annotations1}
              yLabel="Percentage (%)"
              source={{ name: 'Local Data Company', dataset: 'GB Retail and Leisure Vacancy Report', url: 'https://www.localdatacompany.com/', frequency: 'quarterly', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Net retail store closures and high street footfall index, 2013–2024"
              subtitle="Annual net store closures across all GB high streets and retail parks and footfall index (2013=100). Closures peaked during COVID; footfall recovering but not to pre-pandemic levels."
              series={series2}
              annotations={[]}
              yLabel="Closures / Index"
              source={{ name: 'Local Data Company', dataset: 'GB Retail and Leisure Vacancy Report', url: 'https://www.localdatacompany.com/', frequency: 'quarterly', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Food, fitness, and leisure filling some gaps"
            value="+18%"
            unit="growth in food-to-go and leisure units on high streets since 2019"
            description="While traditional retail has declined, the high street is being repurposed rather than simply emptied. Food-to-go outlets, gyms, beauty services, and leisure operators have grown 18% since 2019, filling some vacancies and supporting footfall. Successful town centre regeneration schemes — including Stockton-on-Tees, Wigan, and Altrincham — demonstrate that mixed-use development, public realm investment, independent market traders, and events programming can regenerate struggling high streets. These cases have become models for the government's Towns Fund programme."
            source="Source: Local Data Company — Vacancy Report 2024. Centre for Cities 2024."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.localdatacompany.com/blog/gb-retail-and-leisure-reports" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Local Data Company — GB Retail and Leisure Vacancy Report</a> — vacancy rates, store closures, footfall. Quarterly.</p>
            <p><a href="https://brc.org.uk/retail-insight-analytics/retail-sales-data/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">BRC — Retail Sales Monitor</a> — total retail sales, online/offline split. Monthly.</p>
            <p>Vacancy rate covers retail and leisure units on monitored high streets, retail parks, and shopping centres. Online retail share from ONS Retail Sales Index. Footfall from Local Data Company Springboard data.</p>
          </div>
        </section>
      </main>
    </>
  );
}
