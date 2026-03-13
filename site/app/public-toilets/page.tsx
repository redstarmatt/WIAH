'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

export default function PublicToiletsPage() {
  // Public toilet provision per 10,000 population 2010–2024
  const provisionRaw = [9.8, 9.2, 8.6, 8.0, 7.5, 7.0, 6.5, 6.1, 5.8, 5.5, 5.3, 5.1, 5.0, 4.9, 4.8];
  // Public toilet closures by area type 2010–2024 (% of 2010 stock remaining)
  const urbanRemainingRaw = [100, 96, 93, 90, 87, 84, 82, 80, 78, 77, 75, 74, 73, 72, 71];
  const ruralRemainingRaw = [100, 93, 87, 80, 73, 67, 61, 56, 52, 49, 46, 44, 42, 41, 40];

  const provisionSeries: Series[] = [
    {
      id: 'provision',
      label: 'Public toilets per 10,000 population',
      colour: '#6B7280',
      data: provisionRaw.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
    },
  ];

  const closureSeries: Series[] = [
    {
      id: 'urban',
      label: 'Urban stock remaining (% of 2010)',
      colour: '#6B7280',
      data: urbanRemainingRaw.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
    },
    {
      id: 'rural',
      label: 'Rural stock remaining (% of 2010)',
      colour: '#E63946',
      data: ruralRemainingRaw.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
    },
  ];

  const provisionAnnotations: Annotation[] = [
    { date: new Date(2010, 0, 1), label: '2010: Austerity — discretionary services first cut' },
    { date: new Date(2017, 0, 1), label: '2017: Public Lavatories (Turnstiles) Act repealed' },
  ];

  return (
    <>
      <TopicNav topic="Public Toilets" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Public Toilets"
          question="Where Have All the Public Toilets Gone?"
          finding="Over 50% of public toilets have closed since 2010 — England now has fewer public toilets per head than any comparable European country, with severe impact on older people and those with health conditions."
          colour="#6B7280"
          preposition="in"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>England had approximately 5,600 council-maintained public toilets in 2000. By 2024, that number had fallen by over 50% to around 2,700. Public toilet provision is a discretionary service — councils may provide it but are not legally required to. When budgets contract, discretionary services are the first to go. Total central government funding to councils fell 49% in real terms between 2010/11 and 2019/20.</p>
            <p>The impact falls hardest on those who need public facilities most: older people, disabled people, pregnant women, and those with bowel or bladder conditions. The Royal Society for Public Health estimated that 4 in 10 people restrict their time outside the home because of inadequate access to public toilets. Around 36% of over-65s report limiting outings specifically due to concern about toilet access.</p>
            <p>Rural areas have lost a higher proportion of facilities than urban centres: only 40% of rural public toilets from 2010 remain. Community Toilet Schemes — paying local businesses to allow public access — have partially filled the gap in some areas, but coverage is patchy, restricted to business trading hours, and dependent on individual goodwill.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-provision', label: 'Provision' },
          { id: 'sec-closures', label: 'Closures by Area' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Public toilets closed since 2010 (%)"
              value="51"
              direction="up"
              polarity="up-is-bad"
              changeText="from ~9.8 per 10,000 to 4.8 · fewest in comparable Europe"
              sparklineData={[0, 6, 12, 18, 24, 29, 34, 38, 41, 44, 46, 48, 49, 50, 51]}
              source="British Toilet Association / BBC FOI — 2024"
            />
            <MetricCard
              label="Current provision (per 10,000 population)"
              value="4.8"
              direction="down"
              polarity="down-is-bad"
              changeText="down from 9.8 in 2010 · below Germany (12.3), France (9.1), Netherlands (8.7)"
              sparklineData={[9.8, 9.2, 8.6, 8.0, 7.5, 7.0, 6.5, 6.1, 5.8, 5.5, 5.3, 5.1, 5.0, 4.9, 4.8]}
              source="British Toilet Association — 2024"
            />
            <MetricCard
              label="Estimated access need unmet (millions)"
              value="14"
              direction="up"
              polarity="up-is-bad"
              changeText="people who need regular toilet access outside home without adequate provision"
              sparklineData={[6, 7, 8, 9, 10, 11, 12, 13, 13.5, 14]}
              source="RSPH / Age UK — 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-provision" className="mb-12">
            <LineChart
              title="Public toilet provision per 10,000 population, England, 2010–2024"
              subtitle="Number of council-run public toilet facilities per 10,000 residents. England has fewer than any comparable European country."
              series={provisionSeries}
              annotations={provisionAnnotations}
              yLabel="Facilities per 10,000 population"
              source={{
                name: 'British Toilet Association / BBC FOI research',
                dataset: 'Public toilet provision data',
                frequency: 'annual',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-closures" className="mb-12">
            <LineChart
              title="Public toilet stock remaining by area type, England, 2010–2024"
              subtitle="Percentage of 2010 public toilet stock still open, by urban and rural areas. Rural areas have seen faster closures."
              series={closureSeries}
              yLabel="% of 2010 stock remaining"
              source={{
                name: 'British Toilet Association / Local authority data',
                dataset: 'Toilet closures by area type',
                frequency: 'annual',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p><a href="https://www.britishtoilet.org.uk" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">British Toilet Association</a>. UK public toilet provision surveys. Retrieved 2024.</p>
            <p><a href="https://www.rsph.org.uk" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Royal Society for Public Health — Taking the P*** report</a>. Access and health impact analysis.</p>
            <p>Provision figures compiled from Freedom of Information requests to local authorities and British Toilet Association membership data. European comparisons from EEA and Eurostat local service provision data. Unmet need estimated from ONS population data and RSPH survey findings on access restrictions.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
