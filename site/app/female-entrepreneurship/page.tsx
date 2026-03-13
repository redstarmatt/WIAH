'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import PositiveCallout from '@/components/PositiveCallout';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

// Female-led businesses as % of all businesses, 2015–2024 — Rose Review / BEIS
const femaleLeadValues = [19, 20, 20, 21, 22, 22, 23, 24, 25, 26];

// Female-founded businesses receiving VC funding (%), 2015–2023 — British Business Bank
const vcFundingValues = [5, 5, 6, 7, 8, 8, 9, 9, 10];

// Female self-employment rate (%), 2015–2024 — ONS LFS
const selfEmployValues = [8.5, 8.7, 9.0, 9.2, 9.4, 8.8, 9.0, 9.5, 9.8, 10.0];

const businessSeries: Series[] = [
  {
    id: 'female-led',
    label: 'Female-led businesses (% of all)',
    colour: '#2A9D8F',
    data: femaleLeadValues.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
  {
    id: 'vc-funding',
    label: 'Female-founded VC deals (%)',
    colour: '#E63946',
    data: vcFundingValues.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
];

const selfEmploySeries: Series[] = [
  {
    id: 'self-employ',
    label: 'Female self-employment rate (%)',
    colour: '#264653',
    data: selfEmployValues.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
];

const entrepreneurAnnotations: Annotation[] = [
  { date: new Date(2019, 0, 1), label: '2019: Rose Review published' },
];

export default function FemaleEntrepreneurshipPage() {
  return (
    <>
      <TopicNav topic="Female Entrepreneurship" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Female Entrepreneurship"
          question="Are Women Getting a Fair Share of Business Funding?"
          finding="Female-led businesses make up 26% of UK businesses — up from 19% in 2015. But female-founded companies receive only 10% of venture capital funding. The Rose Review's 2019 target of halving the female entrepreneurship gap by 2030 is on track only in the most optimistic projections."
          colour="#2A9D8F"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Female entrepreneurship in the UK has grown steadily — women now lead approximately 26% of businesses, up from 19% in 2015, and the female self-employment rate has risen to 10% of female working-age adults. The Rose Review (2019) — commissioned by the government and led by Alison Rose, former CEO of NatWest — identified the UK's female entrepreneurship gap as costing the economy £250 billion in unrealised potential and set a target of halving the proportion of businesses founded and led by women within a decade. Progress has been made, but the structural barriers to scaling female-founded businesses remain largely intact.</p>
            <p>The most striking gap is in venture capital funding. Despite improvements from a very low base, female-founded companies received only around 10% of UK VC deals in 2023, and female-only founding teams received just 3% — even though evidence from British Business Bank analysis shows that female-founded companies deliver 35% higher return on investment than male equivalents, controlling for sector and stage. The barriers include networks and relationships (VC partnerships remain predominantly male), risk framing (female founders receive more skeptical questioning in pitches), and sector concentration (female founders disproportionately start in sectors with lower VC interest). The British Business Bank's Invest in Women Taskforce has committed to increasing female-founded company VC investment, but progress has been incremental.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Business leadership & VC' },
          { id: 'sec-chart2', label: 'Self-employment' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Female-led businesses"
              value="26%"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="Up from 19% in 2015 · Rose Review target: 50% parity by 2030"
              sparklineData={[19, 20, 20, 21, 22, 22, 23, 24, 25, 26]}
              source="Rose Review / BEIS · Female entrepreneurship review 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Female-founded VC deals"
              value="10%"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="Up from 5% in 2015 · male-only teams receive 87% of VC"
              sparklineData={[5, 5, 6, 7, 8, 8, 9, 9, 10]}
              source="British Business Bank · Diversity in UK venture capital 2023"
              href="#sec-chart1"
            />
            <MetricCard
              label="Female self-employment rate"
              value="10%"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="Up from 8.5% in 2015 · gap with male rate (18%) persists"
              sparklineData={[8.5, 8.7, 9.0, 9.2, 9.4, 8.8, 9.0, 9.5, 9.8, 10.0]}
              source="ONS · Labour Force Survey 2024"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Female-led businesses and VC funding, UK, 2015–2023"
              subtitle="Percentage of businesses led by women and percentage of VC investment going to female-founded companies. Both improving from low baselines."
              series={businessSeries}
              annotations={entrepreneurAnnotations}
              yLabel="% of total"
              source={{ name: 'Rose Review / British Business Bank', dataset: 'Diversity in UK venture capital', url: 'https://www.british-business-bank.co.uk/research/diversity-in-uk-venture-capital/', frequency: 'annual', date: '2023' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Female self-employment rate, UK, 2015–2024"
              subtitle="Percentage of working-age women who are self-employed. Rising trend reflects growth in female entrepreneurship, though still well below male self-employment rate of 18%."
              series={selfEmploySeries}
              annotations={[]}
              yLabel="Self-employment rate (%)"
              source={{ name: 'ONS', dataset: 'Labour Force Survey — self-employment by sex', url: 'https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/employmentandemployeetypes/timeseries/mgsr/lms', frequency: 'quarterly', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Female-founded companies deliver 35% higher ROI"
            value="35%"
            description="British Business Bank analysis of VC-backed companies found that female-founded businesses deliver 35% higher return on investment per pound invested than male equivalents, controlling for sector and investment stage. This performance gap is driven by female founders' tendency toward capital efficiency, longer-term value creation, and higher employee retention. The data challenge the common risk justification for lower VC allocation to female founders. The Invest in Women Taskforce, launched in 2023, has committed 12 major VC firms to publish gender diversity data and set improvement targets, covering approximately £30 billion of assets under management."
            source="Source: British Business Bank — Diversity in UK venture capital 2023. Rose Review — Aligning finance with ambition 2024."
          />
        </ScrollReveal>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.british-business-bank.co.uk/research/diversity-in-uk-venture-capital/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">British Business Bank — Diversity in UK venture capital</a> — annual analysis of VC investment by founder gender, ethnicity, and disability.</p>
            <p><a href="https://assets.publishing.service.gov.uk/media/5d8b87d2e5274a2e96f9e74d/The_Alison_Rose_Review_of_Female_Entrepreneurship.pdf" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Rose Review — Review of female entrepreneurship</a> — 2019 government-commissioned review of barriers and opportunities for female founders.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
