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
  { num: 1, name: 'ONS', dataset: 'Business Investment in the UK', url: 'https://www.ons.gov.uk/economy/grossdomesticproductgdp/bulletins/businessinvestment/latest', date: '2024' },
  { num: 2, name: 'OECD', dataset: 'Business Investment as % of GDP', url: 'https://stats.oecd.org/', date: '2024' },
  { num: 3, name: 'Bank of England', dataset: 'UK Investment Trends', url: 'https://www.bankofengland.co.uk/quarterly-bulletin/2024', date: '2024' },
];

const investmentGdpValues = [9.4, 9.6, 9.8, 9.9, 9.7, 9.5, 8.8, 9.0, 9.1, 9.2, 9.3];
const rdSpendingValues = [18.2, 18.5, 19.0, 19.4, 19.8, 20.1, 21.4, 22.0, 22.4, 22.8, 23.2];
const machineryInvestValues = [58.2, 59.4, 61.8, 63.2, 62.4, 57.8, 60.1, 62.3, 63.8, 65.1, 66.4];
const oecdAverage = [12.8, 12.9, 13.1, 13.2, 13.0, 11.8, 12.5, 12.8, 13.0, 13.2, 13.4];

const series1: Series[] = [
  { id: 'uk', label: 'UK business investment (% of GDP)', colour: '#E63946', data: investmentGdpValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
  { id: 'oecd', label: 'OECD average business investment (% of GDP)', colour: '#6B7280', data: oecdAverage.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
];

const series2: Series[] = [
  { id: 'rd', label: 'UK R&D expenditure (£ billion)', colour: '#264653', data: rdSpendingValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
  { id: 'machinery', label: 'Investment in machinery & equipment (£ billion)', colour: '#F4A261', data: machineryInvestValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
];

const annotations1: Annotation[] = [
  { date: new Date(2016, 5, 1), label: '2016: Brexit vote — investment uncertainty' },
  { date: new Date(2020, 2, 1), label: '2020: COVID — investment collapsed' },
];

export default function BusinessInvestmentLevelsPage() {
  return (
    <>
      <TopicNav topic="Business Investment Levels" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Economy"
          question="Why Has UK Business Investment Stagnated?"
          finding={<>UK business investment as a share of GDP stands at 9.3% — consistently 3–4 percentage points below the OECD average and among the lowest in the G7, a structural gap that has persisted for decades and worsened since the 2016 Brexit referendum.<Cite nums={[1, 2]} /> Low investment is the primary explanation for the UK&apos;s persistent productivity gap relative to comparable economies.<Cite nums={3} /></>}
          colour="#6B7280"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Business investment — spending by companies on machinery, equipment, buildings, IT, and research and development — is the primary driver of long-run productivity growth. Countries that invest more produce more per hour worked, pay higher wages, and generate higher living standards. The UK has chronically underinvested relative to its peers. At 9.3% of GDP, UK business investment lags the OECD average of 13.4% and is well below France (12.1%), Germany (11.8%), and the United States (13.0%).<Cite nums={2} /> This gap is not new — it has persisted since at least the 1980s — but it widened after the 2016 Brexit referendum, as uncertainty deterred long-term capital commitments, particularly from overseas companies with UK operations.<Cite nums={1} /></p>
            <p>The causes are debated but several structural factors recur in economic analysis: the short-termism of UK capital markets, which reward quarterly earnings over long-term investment; the dominance of the financial sector, which directs capital to financial rather than productive assets; high commercial property costs in London and the South East; and successive years of policy uncertainty spanning Brexit, COVID, energy price shocks, and high interest rates.<Cite nums={3} /> UK R&D spending has grown in absolute terms — to £23.2 billion — but as a share of GDP it remains below the government&apos;s own target of 2.4% and well below OECD leaders such as South Korea (4.9%) and Sweden (3.4%). The October 2024 Budget introduced a permanent full expensing regime for capital investment, which economists broadly welcomed, but its effect on aggregate investment levels remains to be seen.<Cite nums={[1, 2]} /></p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Overview' },
          { id: 'sec-chart1', label: 'Investment vs OECD' },
          { id: 'sec-chart2', label: 'R&D & Equipment' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard label="Business investment (% GDP)" value="9.3%" unit="of GDP" direction="flat" polarity="up-is-good" changeText="was 9.4% in 2013 · 4pp below OECD average" sparklineData={[9.4, 9.6, 9.8, 9.9, 9.7, 9.5, 8.8, 9.0, 9.1, 9.2, 9.3]} source="ONS — Business Investment in the UK 2024" href="#sec-chart1" />
            <MetricCard label="UK R&D expenditure" value="£23.2bn" unit="per year" direction="up" polarity="up-is-good" changeText="rising but below 2.4% GDP target · OECD leaders at 4%+" sparklineData={[18.2, 18.5, 19.0, 19.4, 19.8, 20.1, 21.4, 22.0, 22.4, 22.8, 23.2]} source="ONS — Business Investment in the UK 2024" href="#sec-chart2" />
            <MetricCard label="OECD investment gap" value="4.1pp" unit="below OECD average" direction="up" polarity="up-is-bad" changeText="gap has persisted for decades · widened post-Brexit" sparklineData={[3.4, 3.3, 3.3, 3.3, 3.3, 2.3, 3.7, 3.8, 3.9, 4.0, 4.1]} source="OECD — Business Investment Statistics 2024" href="#sec-chart1" />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="UK vs OECD average business investment as % of GDP, 2013–2024"
              subtitle="UK business investment (gross fixed capital formation by businesses) as a share of GDP, compared to the OECD average. The structural gap has persisted and widened since the Brexit referendum."
              series={series1}
              annotations={annotations1}
              yLabel="% of GDP"
              source={{ name: 'ONS', dataset: 'Business Investment in the UK', url: 'https://www.ons.gov.uk/economy/grossdomesticproductgdp/bulletins/businessinvestment/latest', frequency: 'quarterly', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="UK R&D expenditure and machinery investment, 2013–2024"
              subtitle="Total UK research and development expenditure (£ billion) and investment in machinery and equipment (£ billion). Both growing slowly — insufficient to close the gap with leading economies."
              series={series2}
              annotations={[]}
              yLabel="£ billion"
              source={{ name: 'ONS', dataset: 'Business Investment in the UK', url: 'https://www.ons.gov.uk/economy/grossdomesticproductgdp/bulletins/businessinvestment/latest', frequency: 'quarterly', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Green investment boom offers a potential turning point"
            value="£60bn"
            unit="committed to clean energy investment in the UK by 2030"
            description="The UK's clean energy ambitions — including offshore wind, green hydrogen, battery storage, and EV infrastructure — represent the largest sustained business investment opportunity in a generation. Government and private commitments of around £60 billion by 2030 are concentrated in sectors where the UK has genuine comparative advantage. If delivered, clean energy investment could add 0.5–0.7 percentage points to the UK business investment/GDP ratio — a meaningful but insufficient solution to the structural investment gap."
            source="Source: Office for Budget Responsibility — Economic and Fiscal Outlook 2024. Bank of England 2024."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.ons.gov.uk/economy/grossdomesticproductgdp/bulletins/businessinvestment/latest" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ONS — Business Investment in the UK</a> — gross fixed capital formation by sector, quarterly. Quarterly.</p>
            <p><a href="https://stats.oecd.org/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">OECD — Business Investment Statistics</a> — international comparisons. Annual.</p>
            <p>Business investment is gross fixed capital formation by private sector enterprises (excluding dwellings). Data is in current prices. R&D data is from ONS experimental estimates aligned to OECD Frascati Manual definitions.</p>
          </div>
        </section>
      </main>
    </>
  );
}
