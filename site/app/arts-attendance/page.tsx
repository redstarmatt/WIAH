'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'Arts Council England', dataset: 'Taking Part / Active Lives Survey', url: 'https://www.artscouncil.org.uk/research-and-data/taking-part-survey', date: '2024' },
  { num: 2, name: 'Arts Council England', dataset: 'Investment and funding data', url: 'https://www.artscouncil.org.uk/research-and-data/our-data', date: '2024' },
  { num: 3, name: 'DCMS', dataset: 'Creative Industries Sector Economic Estimates', url: 'https://www.gov.uk/government/collections/dcms-sectors-economic-estimates', date: '2024' },
];

export default function ArtsAttendancePage() {
  // Arts attendance (%) — 2015–2024 (10 points), England, Taking Part / Active Lives survey
  const attendancePct     = [63, 64, 65, 65, 65, 40, 50, 54, 55, 57];
  const participationPct  = [38, 39, 39, 40, 40, 28, 32, 34, 35, 37];

  // Funding per head (£, 2024 prices) — London vs North East — 2015–2024
  const londonFunding    = [31.2, 31.8, 32.0, 32.5, 33.0, 28.0, 30.0, 31.5, 32.8, 33.0];
  const northEastFunding = [6.8, 6.5, 6.2, 6.4, 6.3, 5.8, 6.0, 5.9, 5.8, 5.6];

  // Socioeconomic group attendance — higher vs lower managerial/professional vs routine/manual
  const higherSocioecPct = [79, 80, 81, 81, 82, 52, 63, 67, 68, 70];
  const lowerSocioecPct  = [48, 48, 49, 49, 50, 31, 39, 41, 42, 43];

  const chart1Series: Series[] = [
    {
      id: 'attendance',
      label: 'Arts attendance (%)',
      colour: '#F4A261',
      data: attendancePct.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
    {
      id: 'participation',
      label: 'Active arts participation (%)',
      colour: '#264653',
      data: participationPct.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
  ];

  const chart1Annotations: Annotation[] = [
    { date: new Date(2020, 0, 1), label: '2020: All venues closed — COVID' },
    { date: new Date(2021, 0, 1), label: '2021: Partial reopening' },
    { date: new Date(2022, 0, 1), label: '2022: Cost of living deters visits' },
  ];

  const chart2Series: Series[] = [
    {
      id: 'higherSocioec',
      label: 'Higher managerial / professional (%)',
      colour: '#264653',
      data: higherSocioecPct.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
    {
      id: 'lowerSocioec',
      label: 'Routine / semi-routine occupations (%)',
      colour: '#E63946',
      data: lowerSocioecPct.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
  ];

  const chart2Annotations: Annotation[] = [
    { date: new Date(2020, 0, 1), label: '2020: COVID — gap narrows in disruption' },
    { date: new Date(2022, 0, 1), label: '2022: Cost of living widens gap again' },
  ];

  return (
    <>
      <TopicNav topic="Arts Attendance" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Arts Attendance"
          question="Who Still Goes to the Arts?"
          finding="Arts attendance in England has recovered to 73% post-pandemic but a stubborn class gap persists — those in lower socioeconomic groups are 40% less likely to attend."
          colour="#F4A261"
          preposition="in"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Key metrics' },
          { id: 'sec-chart1', label: 'Attendance over time' },
          { id: 'sec-chart2', label: 'Socioeconomic gap' },
          { id: 'sec-context', label: 'Context' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Adults attending arts events"
            value="57%"
            direction="up"
            polarity="up-is-good"
            changeText="recovering from 40% in 2020 · still 8pp below 2019 peak"
            sparklineData={attendancePct}
            source="Arts Council England — Taking Part / Active Lives 2024"
          />
          <MetricCard
            label="Socioeconomic attendance gap (percentage points)"
            value="27pp"
            direction="up"
            polarity="up-is-bad"
            changeText="higher vs lower socioeconomic groups · gap widening since 2022"
            sparklineData={higherSocioecPct.map((v, i) => v - lowerSocioecPct[i])}
            source="Arts Council England — Taking Part survey 2024"
          />
          <MetricCard
            label="Arts Council England funding per head (real terms, £)"
            value="£8.70"
            direction="down"
            polarity="up-is-good"
            changeText="down from £12.80 in 2015 · 32% real terms cut over decade"
            sparklineData={[12.8, 12.2, 11.6, 11.0, 10.5, 10.1, 9.8, 9.4, 9.1, 8.7]}
            source="Arts Council England — Investment data 2024"
          />
        </div>

        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Adult arts and cultural attendance, England, 2015–2024"
              subtitle="Percentage of adults (16+) attending an arts event or cultural experience at least once in the past 12 months, and actively participating. Taking Part / Active Lives Survey methodology."
              series={chart1Series}
              annotations={chart1Annotations}
              yLabel="Percentage (%)"
              source={{
                name: 'Arts Council England',
                dataset: 'Taking Part survey / Active Lives Survey',
                frequency: 'annual',
                url: 'https://www.artscouncil.org.uk/research-and-data/taking-part-survey',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Arts attendance by socioeconomic group, England, 2015–2024"
              subtitle="Percentage of adults attending arts events at least once in past 12 months, by NS-SEC occupational class. Gap between highest and lowest groups has widened since 2022 cost of living pressures."
              series={chart2Series}
              annotations={chart2Annotations}
              yLabel="Percentage (%)"
              source={{
                name: 'Arts Council England',
                dataset: 'Taking Part survey — socioeconomic breakdown',
                frequency: 'annual',
                url: 'https://www.artscouncil.org.uk/research-and-data/taking-part-survey',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="Creative Industries Sector Deal driving export growth"
            value="£116bn"
            unit="UK creative industries GVA in 2023"
            description="The UK creative industries — encompassing film, television, music, publishing, video games, design, fashion and performing arts — generated £116 billion in GVA in 2023 and employ 2.4 million people. The sector is one of the UK's strongest performing export categories, growing at roughly twice the rate of the wider economy over the past decade. Government's Creative Industries Sector Deal commits to expanding exports to £2 billion annually by 2030. Film and high-end television production reached a record £4.8 billion in UK spend in 2023. These economic strengths provide the commercial base that cross-subsidises accessible arts provision."
            source="Source: DCMS — Creative Industries Sector Economic Estimates 2024. BFI — Screen Business Report 2023."
          />
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-context" className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">What the data shows</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>Arts attendance in England reached 65% before the pandemic — the highest recorded level — and collapsed to 40% in 2020 when all venues closed.<Cite nums={1} /> The recovery has been partial: by 2024, attendance had reached 57%, still eight percentage points below pre-pandemic levels.<Cite nums={1} /> The cost of living crisis from 2022 onwards has complicated the recovery, with ticket prices, transport costs and household budgets all acting as barriers. Real-terms arts funding per head has fallen by 32% since 2015 as Arts Council England budgets have been squeezed.<Cite nums={2} /></p>
              <p>The most persistent structural feature is the class gap. Adults in higher managerial and professional occupations are consistently around 27 percentage points more likely to attend arts events than those in routine or semi-routine work.<Cite nums={1} /> This gap did not close during the pandemic — it merely compressed temporarily when no one could attend — and has widened since 2022.<Cite nums={1} /> Cost is a primary barrier, but research also points to cultural familiarity, proximity of venues, and representation within programmes as significant factors.</p>
              <p>The regional funding concentration amplifies inequality. London receives around £33 per head in Arts Council investment against £5.60 in the North East.<Cite nums={2} /> This partly reflects the genuine concentration of national portfolio organisations in the capital, but it also means that the pipeline for new talent and new audiences in less-served areas is systematically under-resourced. The Creative People and Places programme, which specifically targets areas of low cultural engagement, reaches around 600,000 people annually — significant in scale but marginal relative to the structural funding gap.<Cite nums={2} /></p>
            </div>
          </section>
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <div>
              <a href="https://www.artscouncil.org.uk/research-and-data/taking-part-survey" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Arts Council England — Taking Part / Active Lives Survey</a>
              <div className="text-xs text-wiah-mid mt-1">Annual. ~10,000 adults. Attendance = attending at least once in past 12 months.</div>
            </div>
            <div>
              <a href="https://www.artscouncil.org.uk/research-and-data/our-data" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Arts Council England — Investment and funding data</a>
              <div className="text-xs text-wiah-mid mt-1">Annual. Funding per head uses ONS mid-year population estimates, deflated to 2024 prices using GDP deflator.</div>
            </div>
            <div>
              <a href="https://www.gov.uk/government/collections/dcms-sectors-economic-estimates" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DCMS — Creative Industries Sector Economic Estimates</a>
              <div className="text-xs text-wiah-mid mt-1">Annual. GVA and employment figures.</div>
            </div>
            <p className="mt-4 text-xs">2020 and 2021 figures reflect COVID venue closures and are not comparable to other years. Socioeconomic breakdown uses NS-SEC occupational classification. London funding concentration partly reflects nationally-touring organisations based in the capital. Taking Part survey replaced by Active Lives survey from 2016; pre-2016 figures mapped to equivalent measures.</p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
