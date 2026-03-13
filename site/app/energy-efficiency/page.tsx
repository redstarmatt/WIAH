'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

export default function EnergyEfficiencyPage() {
  // EPC rating distribution 2015–2024: % of homes at EPC C or above
  const epcCAboveRaw = [14, 19, 25, 30, 35, 40, 44, 46, 48, 49];
  // Estimated heat loss vs EU average index (UK=100, lower is better) 2010–2024
  const heatLossRaw = [100, 99, 98, 97, 97, 96, 95, 95, 94, 94, 93, 93, 93, 92, 92];

  const epcSeries: Series[] = [
    {
      id: 'epc-c-above',
      label: 'Homes rated EPC C or above (%)',
      colour: '#2A9D8F',
      data: epcCAboveRaw.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
  ];

  const heatLossSeries: Series[] = [
    {
      id: 'heat-loss',
      label: 'UK heat loss index (UK 2010=100)',
      colour: '#264653',
      data: heatLossRaw.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
    },
    {
      id: 'eu-avg',
      label: 'EU average heat loss index (2010=100)',
      colour: '#E5E7EB',
      data: [82, 81, 80, 79, 79, 78, 77, 77, 76, 76, 75, 75, 74, 74, 73].map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
    },
  ];

  const epcAnnotations: Annotation[] = [
    { date: new Date(2019, 0, 1), label: '2019: Green Homes Grant announced' },
    { date: new Date(2023, 0, 1), label: '2023: Boiler Upgrade Scheme expanded' },
  ];

  const epcTargetLine = { value: 100, label: '2035 target: all homes EPC C+' };

  return (
    <>
      <TopicNav topic="Energy Efficiency" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Energy Efficiency"
          question="How Energy Efficient Are Britain's Homes?"
          finding="19 million homes have an EPC rating of D or below — the UK has some of the leakiest housing stock in Europe, costing households £1,000+ extra per year in heating."
          colour="#2A9D8F"
          preposition="in"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The UK has 29.2 million homes, and heating them accounts for approximately 17% of national greenhouse gas emissions. Some 19 million of those homes have an EPC rating of D or below, including 3.2 million at the worst categories (E, F, or G). The government's stated ambition is for all homes to achieve EPC C or above by 2035, but as of 2024 only 49% meet this standard. At the current rate of improvement, the 2035 target will not be met.</p>
            <p>The cost of living in a poorly insulated home is not abstract: a household in an EPC F or G rated property pays an average of £1,000–£1,400 more per year in energy bills than one in a comparable EPC C home. The gap falls hardest on older people, those in fuel poverty, and private renters — who have no power to compel their landlord to insulate.</p>
            <p>Retrofit at scale requires sustained public investment. Annual government spending on residential energy efficiency stands at around £1.3 billion — roughly one-fiftieth of the estimated total needed to bring all homes to EPC C. The Green Homes Grant was cancelled after six months in 2021. Its successor, the Boiler Upgrade Scheme, offers a £7,500 grant for heat pump installation, but uptake remains far below what the Climate Change Committee says is necessary.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-epc', label: 'EPC Ratings' },
          { id: 'sec-heat', label: 'Heat Loss' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Homes EPC D or below (millions)"
              value="19"
              direction="down"
              polarity="down-is-bad"
              changeText="3.2 million at EPC E, F, or G · worst categories"
              sparklineData={[22, 21, 20.5, 20, 19.8, 19.5, 19.3, 19.1, 19.0, 19]}
              source="English Housing Survey — 2024"
            />
            <MetricCard
              label="Average EPC rating (band)"
              value="D"
              direction="up"
              polarity="up-is-good"
              changeText="improving slowly · 2035 target: all homes C or above"
              sparklineData={[60, 62, 65, 68, 70, 72, 74, 75, 76, 77]}
              source="DLUHC — English Housing Survey 2024"
            />
            <MetricCard
              label="Energy wasted in heating (TWh/yr)"
              value="~270"
              direction="down"
              polarity="down-is-bad"
              changeText="excess vs well-insulated stock · costs £1,000+ per household"
              sparklineData={[310, 305, 300, 295, 290, 285, 280, 278, 275, 270]}
              source="BEIS / Climate Change Committee — 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-epc" className="mb-12">
            <LineChart
              title="Homes rated EPC C or above, England, 2015–2024"
              subtitle="Percentage of assessed homes meeting the government's 2035 target of EPC C or above. English Housing Survey."
              series={epcSeries}
              annotations={epcAnnotations}
              targetLine={epcTargetLine}
              yLabel="% at EPC C+"
              source={{
                name: 'DLUHC',
                dataset: 'English Housing Survey',
                frequency: 'annual',
                url: 'https://www.gov.uk/government/collections/english-housing-survey',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-heat" className="mb-12">
            <LineChart
              title="UK heat loss vs EU average, 2010–2024"
              subtitle="Indexed to UK 2010=100. Lower values indicate less heat loss (better insulation). UK consistently above EU average."
              series={heatLossSeries}
              yLabel="Heat loss index (2010=100)"
              source={{
                name: 'European Environment Agency / BEIS',
                dataset: 'Residential heat loss and energy performance data',
                frequency: 'annual',
                url: 'https://www.eea.europa.eu/en/topics/in-depth/energy-efficiency',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p><a href="https://www.gov.uk/government/collections/english-housing-survey" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DLUHC — English Housing Survey</a>. Annual. EPC ratings and housing stock condition. Retrieved 2024.</p>
            <p><a href="https://www.eea.europa.eu/en/topics/in-depth/energy-efficiency" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">European Environment Agency — Energy Efficiency</a>. Comparative EU member state data.</p>
            <p>EPC ratings cover lodged certificates in England. Not all homes have a lodged certificate; estimates for unassessed stock use modelled data from the English Housing Survey. Heat loss index is indicative and based on modelled space heating demand per dwelling.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
