'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

export default function WaterInfrastructurePage() {
  // Water main bursts per day 2010–2024
  const burstsRaw = [72, 74, 76, 78, 80, 82, 84, 86, 88, 84, 82, 84, 86, 84, 84];
  // Water company infrastructure investment 2010–2024 (£bn real terms)
  const investmentRaw = [5.8, 5.6, 5.5, 5.4, 5.3, 5.2, 5.0, 4.9, 4.8, 4.6, 5.1, 5.3, 5.5, 5.4, 5.4];

  const burstsSeries: Series[] = [
    {
      id: 'bursts',
      label: 'Water main bursts per day',
      colour: '#264653',
      data: burstsRaw.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
    },
  ];

  const investmentSeries: Series[] = [
    {
      id: 'investment',
      label: 'Infrastructure investment (£bn real terms)',
      colour: '#264653',
      data: investmentRaw.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
    },
  ];

  const burstsAnnotations: Annotation[] = [
    { date: new Date(2018, 0, 1), label: '2018: Beast from the East — burst spike' },
    { date: new Date(2022, 0, 1), label: '2022: Thames Water financial crisis' },
  ];

  const investmentAnnotations: Annotation[] = [
    { date: new Date(2019, 0, 1), label: '2019: Ofwat PR19 price review' },
    { date: new Date(2024, 0, 1), label: '2024: PR24 — increased investment required' },
  ];

  return (
    <>
      <TopicNav topic="Water Infrastructure" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Water Infrastructure"
          question="How Old and Broken is Britain's Water Infrastructure?"
          finding="Water mains burst 84 times a day on average — the oldest pipes date to the Victorian era — and water companies spent less on infrastructure in real terms in 2023 than in 2010."
          colour="#264653"
          preposition="in"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>England and Wales's water network comprises approximately 345,000 kilometres of water mains, serving 56 million customers through 17 privatised water companies. An estimated 25% of pipes are over 100 years old, with Victorian-era infrastructure still in daily use across much of London and the North West. Water mains burst an average of 84 times every day — around 31,000 bursts per year — releasing treated water and causing supply disruptions, road collapses, and property flooding.</p>
            <p>Water companies spent £5.4 billion on capital investment in 2023, compared with £5.8 billion in 2010 in real terms — a real-terms decline even as the volume and age of assets requiring replacement has grown. The shortfall accumulated over a decade of Ofwat price reviews that allowed companies to distribute dividends while deferring maintenance investment. Thames Water, the largest company, is currently under financial restructuring with £16 billion of debt accumulated partly through leveraged buyouts, and has repeatedly missed its infrastructure targets.</p>
            <p>The Ofwat PR24 price review, finalised in 2024, allows water companies to raise bills by an average of 36% over the next five years to fund a £96 billion investment programme — the largest in the industry's history. Whether this translates into reduced burst rates and improved infrastructure condition will be the test over the next decade.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-bursts', label: 'Pipe Bursts' },
          { id: 'sec-investment', label: 'Investment' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Water main bursts per day"
              value="84"
              direction="up"
              polarity="up-is-bad"
              changeText="~31,000 bursts/year · oldest pipes Victorian era"
              sparklineData={[72, 74, 76, 78, 80, 82, 84, 86, 88, 84, 82, 84, 86, 84, 84]}
              source="Ofwat — Water Company Performance Reports 2024"
            />
            <MetricCard
              label="Infrastructure investment (£bn/yr)"
              value="5.4"
              direction="down"
              polarity="down-is-bad"
              changeText="down from £5.8bn in 2010 · real-terms fall despite ageing assets"
              sparklineData={[5.8, 5.6, 5.5, 5.4, 5.3, 5.2, 5.0, 4.9, 4.8, 4.6, 5.1, 5.3, 5.5, 5.4, 5.4]}
              source="Ofwat — Annual Reports / Water UK 2024"
            />
            <MetricCard
              label="Average pipe age (years)"
              value="75+"
              direction="up"
              polarity="up-is-bad"
              changeText="25% of pipes over 100 years old · Victorian infrastructure still in use"
              sparklineData={[68, 69, 70, 71, 72, 73, 74, 74, 75, 75, 75, 75, 75, 75, 75]}
              source="Water Industry Research / Ofwat — 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-bursts" className="mb-12">
            <LineChart
              title="Water main bursts per day, England & Wales, 2010–2024"
              subtitle="Average daily water main burst events reported by water companies. 25% of pipes are over 100 years old."
              series={burstsSeries}
              annotations={burstsAnnotations}
              yLabel="Bursts per day"
              source={{
                name: 'Ofwat',
                dataset: 'Water company performance reports',
                frequency: 'annual',
                url: 'https://www.ofwat.gov.uk/regulated-companies/company-obligations/resilience/',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-investment" className="mb-12">
            <LineChart
              title="Water company infrastructure investment, England & Wales, 2010–2024"
              subtitle="Annual capital investment (£bn, real terms 2023–24 prices). Investment fell in real terms despite ageing infrastructure. PR24 commitments from 2025 onward."
              series={investmentSeries}
              annotations={investmentAnnotations}
              yLabel="£ billion (real terms)"
              source={{
                name: 'Ofwat / Water UK',
                dataset: 'Capital Expenditure Monitoring / Annual Review',
                frequency: 'annual',
                url: 'https://www.ofwat.gov.uk/wp-content/uploads/2024/07/PR24-final-determinations-overview.pdf',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p><a href="https://www.ofwat.gov.uk/regulated-companies/company-obligations/resilience/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Ofwat — Water Company Performance Reports</a>. Annual burst and leakage data. Retrieved 2024.</p>
            <p><a href="https://www.water.org.uk/publication/water-uk-annual-review/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Water UK — Annual Review</a>. Industry investment data. Retrieved 2024.</p>
            <p>Burst data is self-reported by water companies to Ofwat as part of annual performance reporting. Investment figures are deflated to 2023–24 prices using HM Treasury GDP deflators. Pipe age estimates from Water Industry Research and company asset registers. PR24 = Ofwat's 2024 periodic review determining prices 2025–2030.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
