'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import PositiveCallout from '@/components/PositiveCallout';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

// 5-year business survival rate (%) and hospitality sector, 2010–2024
const survivalData = [48.0, 47.5, 47.2, 46.8, 46.5, 46.2, 45.8, 45.4, 45.0, 44.6, 43.8, 43.2, 43.6, 44.0, 44.0];
const hospitalityData = [38.0, 37.5, 37.0, 36.5, 36.0, 35.5, 35.0, 34.5, 34.0, 33.5, 31.0, 30.5, 31.0, 32.0, 32.0];

// Business births and deaths (thousands), 2010–2024
const birthsData = [420, 440, 460, 480, 510, 530, 560, 580, 590, 680, 810, 750, 720, 700, 690];
const deathsData = [360, 355, 360, 370, 380, 390, 400, 410, 420, 430, 600, 500, 460, 450, 440];

const survivalSeries: Series[] = [
  {
    id: 'survivalRate',
    label: '5-year survival rate — all sectors (%)',
    colour: '#264653',
    data: survivalData.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
  },
  {
    id: 'hospitalitySurvival',
    label: '5-year survival rate — hospitality (%)',
    colour: '#E63946',
    data: hospitalityData.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
  },
];

const birthDeathSeries: Series[] = [
  {
    id: 'births',
    label: 'New registrations (thousands)',
    colour: '#2A9D8F',
    data: birthsData.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
  },
  {
    id: 'deaths',
    label: 'Deregistrations (thousands)',
    colour: '#E63946',
    data: deathsData.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
  },
];

const survivalAnnotations: Annotation[] = [
  { date: new Date(2020, 5, 1), label: '2020: Pandemic causes record closures' },
  { date: new Date(2022, 5, 1), label: '2022: Energy costs surge' },
];

const birthDeathAnnotations: Annotation[] = [
  { date: new Date(2020, 0, 1), label: '2020: Pandemic spike in closures' },
  { date: new Date(2021, 5, 1), label: '2021: Furlough ends, delayed closures follow' },
];

export default function BusinessSurvivalPage() {
  return (
    <>
      <TopicNav topic="Economy & Work" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Economy & Work"
          question="How Many Small Businesses Are Actually Making It?"
          finding="Only 44% of UK businesses survive five years — down from 48% in 2010. Post-pandemic closures spiked in 2020, and survival rates have fallen across all sectors, with hospitality particularly hard hit at just 32%. Rising energy costs, sustained high interest rates, and weak consumer spending have made the trading environment the toughest in a generation."
          colour="#6B7280"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The UK registered around 690,000 new businesses in 2024 — one of the highest formation rates in Europe — but the five-year survival rate has fallen to 44%, the lowest since comparable records began. Around one in two businesses that start up today will not exist in five years. The pattern is consistent across regions and sectors, though hospitality, retail, and construction face particularly high failure rates. The post-pandemic period has been especially brutal: businesses that survived 2020 on furlough support faced a sequence of shocks — supply chain disruption, energy cost spikes in 2022, and the fastest interest rate rise in 40 years — that each reduced the odds of survival.</p>
            <p>Business deaths hit 600,000 in 2020 — far above any previous year — as closures that had been deferred by government support materialised when schemes ended. Since then, annual closures have moderated to around 440,000, but remain above pre-pandemic norms. The net effect is that the stock of businesses has grown more slowly than at any point since 2012. For many sectors, the problem is not a shortage of entrepreneurship but a hostile operating environment: business rates that do not adjust to economic conditions, planning rules that make physical expansion costly, and a late-payment culture that leaves small suppliers financing large clients at elevated interest rates.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Survival Rates' },
          { id: 'sec-chart2', label: 'Births & Deaths' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="5-year survival rate"
              value="44%"
              unit="all sectors"
              direction="down"
              polarity="up-is-good"
              changeText="Down from 48% in 2010 · hospitality worst at 32%"
              sparklineData={[48, 47.2, 46.5, 45.8, 45.0, 44.6, 43.8, 43.2, 43.6, 44.0]}
              source="ONS · Business Demography 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Annual business closures"
              value="440,000"
              unit="2024"
              direction="up"
              polarity="up-is-bad"
              changeText="+22% since 2019 · retail & hospitality hardest hit"
              sparklineData={[360, 370, 390, 410, 430, 600, 500, 460, 450, 440]}
              source="ONS · Business Demography 2024"
              href="#sec-chart2"
            />
            <MetricCard
              label="Net change vs 2019 business count"
              value="-12%"
              unit="below trend"
              direction="down"
              polarity="up-is-good"
              changeText="Births outpaced deaths until 2020; growth now sluggish"
              sparklineData={[8, 6, 5, 4, 2, -3, -8, -10, -11, -12]}
              source="ONS · Business Register IDBR 2024"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="UK business 5-year survival rate, all sectors and hospitality, 2010–2024"
              subtitle="Percentage of businesses surviving five years from birth. Overall rate declining from 48% to 44%. Hospitality consistently 10–14pp below average — now at 32%."
              series={survivalSeries}
              annotations={survivalAnnotations}
              yLabel="5-year survival (%)"
              source={{ name: 'ONS', dataset: 'Business Demography — UK Business Activity, Size and Location', url: 'https://www.ons.gov.uk/businessindustryandtrade/business/activitysizeandlocation/bulletins/businessdemography/latest', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Annual business births and deaths, UK, 2010–2024"
              subtitle="New business registrations vs deregistrations (thousands). The pandemic caused record closures in 2020 and a temporary spike in new registrations in 2021 as sole traders registered for COVID support."
              series={birthDeathSeries}
              annotations={birthDeathAnnotations}
              yLabel="Businesses (thousands)"
              source={{ name: 'ONS', dataset: 'Business Demography — births and deaths', url: 'https://www.ons.gov.uk/businessindustryandtrade/business/activitysizeandlocation/bulletins/businessdemography/latest', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="UK start-up formation remains among the highest in Europe"
            value="690,000"
            unit="new businesses registered in 2024"
            description="Despite higher closure rates, the UK sees around 690,000 new business registrations per year — among the highest in Europe relative to population. The British Business Bank's Start Up Loans programme has funded over 110,000 businesses since 2012, with average loan size of £8,200. The UK's flexible insolvency regime, which allows failed businesses to exit quickly and founders to try again, supports entrepreneurial risk-taking that more protective systems in France and Germany discourage."
            source="Source: ONS — Business Demography 2024. British Business Bank — Start Up Loans Annual Report 2024."
          />
        </ScrollReveal>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.ons.gov.uk/businessindustryandtrade/business/activitysizeandlocation/bulletins/businessdemography/latest" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ONS — Business Demography</a> — survival rates, births, and deaths from the Inter-Departmental Business Register. Retrieved March 2026.</p>
            <p><a href="https://www.britishbusinessbank.co.uk/research-and-publications/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">British Business Bank — Start Up Loans Annual Report</a> — scheme reach and outcomes. Retrieved March 2026.</p>
            <p className="mt-2">Five-year survival rate is calculated for businesses born in year Y and still active in year Y+5. Hospitality includes SIC codes 55-56 (accommodation and food service). Business births and deaths are based on IDBR registrations and deregistrations, which may differ from VAT/PAYE registration data.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
