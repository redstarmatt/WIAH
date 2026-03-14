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

const editorialRefs: Reference[] = [
  { num: 1, name: 'Local Data Company', dataset: 'Retail Vacancy Monitor', url: 'https://www.localdatacompany.com', date: 'Q4 2024' },
  { num: 2, name: 'ONS', dataset: 'Retail Sales Index — Internet Sales', url: 'https://www.ons.gov.uk/businessindustryandtrade/retailindustry/bulletins/retailsales/previousReleases', date: '2024' },
  { num: 3, name: 'Local Data Company / PwC', dataset: 'GB Retail and Leisure Opening and Closing', url: 'https://www.localdatacompany.com', date: '2024' },
];

export default function HighStreetVacancyPage() {
  // Chart 1: High street vacancy rate 2010-2024 (%)
  const vacancyData = [11.2, 12.0, 12.4, 12.8, 12.6, 12.3, 12.1, 12.0, 12.4, 14.1, 15.2, 13.8, 14.0, 14.3, 14.5];
  const vacancySeries: Series[] = [
    {
      id: 'vacancy',
      label: 'High street vacancy rate (%)',
      colour: '#6B7280',
      data: vacancyData.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
    },
  ];
  const vacancyAnnotations: Annotation[] = [
    { date: new Date(2017, 0, 1), label: '2017: BHS collapses' },
    { date: new Date(2020, 0, 1), label: '2020: COVID lockdowns' },
    { date: new Date(2023, 0, 1), label: '2023: Wilko enters administration' },
  ];

  // Chart 2: Retail store openings vs closures 2015-2024
  const openingsData = [41200, 39800, 38400, 37100, 36200, 28400, 32100, 34500, 33200, 31800];
  const closuresData = [43100, 44200, 46800, 48100, 49200, 55600, 48300, 46800, 47200, 49400];
  const storesSeries: Series[] = [
    {
      id: 'openings',
      label: 'Store openings per year',
      colour: '#2A9D8F',
      data: openingsData.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
    {
      id: 'closures',
      label: 'Store closures per year',
      colour: '#E63946',
      data: closuresData.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
  ];

  return (
    <>
      <TopicNav topic="High Street Vacancy" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="High Street Vacancy"
          question="Is the High Street Dying?"
          finding="High street vacancy rates hit 14.5% in 2024 — one in seven shops empty — with market towns and secondary shopping centres hit hardest as online retail claims a 27% share."
          colour="#6B7280"
          preposition="on"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Key figures' },
          { id: 'sec-vacancy', label: 'Vacancy rate' },
          { id: 'sec-stores', label: 'Openings vs closures' },
          { id: 'sec-context', label: 'Context' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <section id="sec-metrics" className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="High street vacancy rate"
              value="14.5%"
              direction="up"
              polarity="up-is-bad"
              changeText="one in seven shops empty · worst in market towns"
              sparklineData={[11.2, 12.0, 12.4, 12.8, 12.1, 14.1, 15.2, 13.8, 14.3, 14.5]}
              source="Local Data Company — Retail Vacancy Monitor, Q4 2024"
            />
            <MetricCard
              label="Empty shops"
              value="59,000"
              direction="up"
              polarity="up-is-bad"
              changeText="across GB high streets and retail parks"
              sparklineData={[44000, 46000, 49000, 50000, 48000, 56000, 60000, 54000, 57000, 59000]}
              source="Local Data Company — Retail Vacancy Monitor, 2024"
            />
            <MetricCard
              label="Online retail share"
              value="27%"
              direction="up"
              polarity="neutral"
              changeText="up from 6% in 2010 · structural shift not cyclical"
              sparklineData={[6, 9, 12, 15, 17, 19, 26, 25, 26, 27]}
              source="ONS — Retail Sales Index, 2024"
            />
          </div>
        </section>

        <ScrollReveal>
          <section id="sec-vacancy" className="mb-12">
            <LineChart
              title="High street vacancy rate, Great Britain, 2010–2024 (%)"
              subtitle="Percentage of retail units vacant. Includes high streets, retail parks and shopping centres. Data from Local Data Company footprint surveys."
              series={vacancySeries}
              annotations={vacancyAnnotations}
              yLabel="Vacancy rate (%)"
              source={{
                name: 'Local Data Company',
                dataset: 'Retail Vacancy Monitor',
                frequency: 'quarterly',
                url: 'https://www.localdatacompany.com',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-stores" className="mb-12">
            <LineChart
              title="Retail store openings vs closures, Great Britain, 2015–2024"
              subtitle="Annual store openings and closures across all retail formats. Closures have exceeded openings every year since 2015. The 2020 spike reflects COVID-19 lockdown casualties."
              series={storesSeries}
              yLabel="Stores per year"
              source={{
                name: 'Local Data Company / PwC',
                dataset: 'GB Retail and Leisure Opening and Closing',
                frequency: 'annual',
                url: 'https://www.localdatacompany.com',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="Town Centres Supported"
            value="100"
            unit="towns"
            description="Some vacant high street units are being repurposed as housing, community hubs, workspaces and health facilities. The government's High Street Task Force has supported over 100 town centres since 2021. Permitted development rights changes allow more straightforward conversion of commercial space to residential use."
            source="DLUHC, High Street Task Force"
          />
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-context" className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The data on high street vacancy</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>High street vacancy reached 14.5% across Great Britain in 2024 — roughly one in seven units empty.<Cite nums={1} /> The figure masks considerable variation: prime city centres tend to have lower vacancy rates as footfall and rents remain attractive to remaining retailers; market towns, former mining and industrial communities, and secondary shopping centres face rates of 20-30% or more.<Cite nums={1} /> For these places, vacancy is not a commercial inconvenience but a hollowing-out of the civic and social fabric around which community life organises.</p>
              <p>The structural shift is driven primarily by the growth of online retail, which now accounts for 27% of all retail sales — up from 6% in 2010.<Cite nums={2} /> This is not a temporary cyclical phenomenon. Business rates, which are calculated on physical property values rather than sales, create a structural disadvantage for physical retailers relative to online operations that warehouse goods in low-cost locations. The Confederation of British Industry and British Retail Consortium have consistently argued for business rates reform as the most impactful single change to support high streets.</p>
              <p>COVID-19 accelerated what was already occurring. The pandemic drove vacancy from 12% to 15% as non-essential retail closed for extended periods; subsequent recovery has been partial.<Cite nums={1} /> Major chains — Debenhams, Topshop, BHS, Wilko — have exited the high street entirely, leaving anchor units that are difficult to re-let and that suppress surrounding footfall when empty.<Cite nums={3} /> The economic function of the high street is shifting: more food, leisure and services; less comparison retail. Whether that shift can sustain the investment needed to maintain town centre environments is the central question many councils now face.</p>
            </div>
          </section>
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p><a href="https://www.localdatacompany.com" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Local Data Company</a> — Retail Vacancy Monitor. Quarterly surveys of 2,000+ locations across Great Britain. Published with PwC as the GB Retail and Leisure Opening and Closing report.</p>
            <p><a href="https://www.ons.gov.uk/businessindustryandtrade/retailindustry/bulletins/retailsales/previousReleases" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ONS</a> — Retail Sales Index. Monthly. Online retail share is internet sales as percentage of total retail sales value.</p>
            <p>Vacancy rates cover retail units in surveyed high streets, retail parks and shopping centres. The empty shops figure is an estimate based on LDC survey coverage applied to GB retail unit count. Annual store opening/closing data is from PwC/LDC annual reports.</p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
