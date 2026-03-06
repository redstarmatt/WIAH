'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import PositiveCallout from '@/components/PositiveCallout';

// ── Types ────────────────────────────────────────────────────────────────────

interface NetMigrationData {
  timeSeries: Array<{ date: string; netMigrationThousands: number; workVisas: number; studyVisas: number }>;
  metadata: {
    sources: { name: string; dataset: string; url: string; frequency: string }[];
    methodology: string;
    knownIssues: string[];
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: string): Date {
  return new Date(parseInt(y), 5, 1);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function NetMigrationPage() {
  const [data, setData] = useState<NetMigrationData | null>(null);

  useEffect(() => {
    fetch('/data/net-migration/net_migration.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const netMigrationAnnotations: Annotation[] = [
    { date: new Date(2016, 5, 1), label: 'Brexit referendum' },
    { date: new Date(2021, 5, 1), label: 'Free movement ends' },
    { date: new Date(2024, 0, 1), label: 'Visa restrictions' },
  ];

  const netMigrationSeries: Series[] = data
    ? [
        {
          id: 'net-migration',
          label: 'UK net migration (thousands)',
          colour: '#6B7280',
          data: data.timeSeries.map(d => ({ date: yearToDate(d.date), value: d.netMigrationThousands })),
        },
      ]
    : [];

  const visaBreakdownSeries: Series[] = data
    ? [
        {
          id: 'work-visas',
          label: 'Work visas granted (thousands)',
          colour: '#264653',
          data: data.timeSeries
            .filter(d => parseInt(d.date) >= 2017)
            .map(d => ({ date: yearToDate(d.date), value: d.workVisas })),
        },
        {
          id: 'study-visas',
          label: 'Study visas granted (thousands)',
          colour: '#F4A261',
          data: data.timeSeries
            .filter(d => parseInt(d.date) >= 2017)
            .map(d => ({ date: yearToDate(d.date), value: d.studyVisas })),
        },
      ]
    : [];

  return (
    <>
      <TopicNav topic="Net Migration" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Net Migration"
          question="What Is Actually Happening to UK Migration Numbers?"
          finding="Net migration to the UK reached a record 906,000 in the year to June 2023 — driven largely by students and workers from non-EU countries filling vacancies in health, social care, and hospitality — before falling sharply to around 350,000 by late 2024 following visa restrictions."
          colour="#6B7280"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              UK net migration reached a record 906,000 in the year to June 2023, driven by a post-COVID surge in student visas, NHS and social care recruitment, and emergency humanitarian schemes for Ukraine and Hong Kong. The January 2024 visa restriction package — the most significant tightening in a generation — removed the right of international students to bring dependants, raised the skilled worker salary threshold from £26,200 to £38,700, and restricted health and care workers from bringing family members. Early 2024 data suggested net migration was falling towards 350,000 as intended, but at a measurable cost: NHS trusts, care homes, and universities all reported significant recruitment difficulties. Free movement of EU workers ended in January 2021; health and care visa numbers surged from under 30,000 in 2020 to 143,000 in 2023 as social care and NHS employers pivoted to India, the Philippines, Nigeria, and Zimbabwe.
            </p>
            <p>
              The distributional effects are highly uneven. London receives a disproportionate share of immigration and bears the highest associated housing cost pressures, while generating the largest fiscal and economic returns from migrant workers. Rural and coastal communities that relied on EU seasonal workers for agriculture and food processing face acute labour shortages since free movement ended. Asylum seekers — around 40,000 per year in net migration terms — are concentrated in a small number of local authorities, placing pressure on housing, schools, and GP practices in those areas while other communities bear no equivalent burden. The failure to distribute asylum seekers more evenly across local authorities is a policy choice with visible consequences for the areas that bear the full weight of that choice.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Overview' },
          { id: 'sec-trend', label: 'Long-run Trend' },
          { id: 'sec-visas', label: 'Visa Breakdown' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Net migration (peak, year to June 2023)"
              value="906,000"
              direction="up"
              polarity="up-is-bad"
              changeText="Record high · Driven by students, health &amp; care workers, Ukraine &amp; HK schemes"
              sparklineData={[168, 248, 184, 260, 129, 488, 745, 906]}
              source="ONS · Long-term international migration 2023"
              href="#sec-trend"/>
            <MetricCard
              label="Net migration (year to mid-2024)"
              value="~350,000"
              direction="down"
              polarity="neutral"
              changeText="Down from 906,000 peak · Effect of January 2024 visa restrictions"
              sparklineData={[906, 800, 650, 500, 400, 350]}
              source="ONS · Long-term international migration provisional 2024"
              href="#sec-visas"/>
            <MetricCard
              label="Health &amp; care visas issued (2023)"
              value="143,000"
              direction="flat"
              polarity="up-is-good"
              changeText="Filling NHS &amp; social care vacancies · Restricted from 2024"
              sparklineData={[28000, 45000, 68000, 95000, 130000, 143000]}
              source="Home Office · Immigration statistics 2023"
              href="#sec-visas"/>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-trend" className="mb-12">
            {netMigrationSeries.length > 0 ? (
              <LineChart
                title="UK net migration, 2004–2024"
                subtitle="Long-run net migration figures (thousands). Note: 2021 onwards uses revised administrative data methodology; pre-2021 figures use International Passenger Survey and are not directly comparable. Dashed vertical lines mark key policy changes."
                series={netMigrationSeries}
                annotations={netMigrationAnnotations}
                yLabel="Net migration (thousands)"
                source={{
                  name: 'Office for National Statistics',
                  dataset: 'Long-term international migration, provisional estimates',
                  frequency: 'quarterly',
                  url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/populationandmigration/internationalmigration',
                }}
              />
            ) : (
              <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
            )}
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-visas" className="mb-12">
            {visaBreakdownSeries.length > 0 ? (
              <LineChart
                title="Work and study visas granted, 2017–2024"
                subtitle="Work visas (dark) and study visas (amber) granted annually in thousands. Both surged post-2020 as EU free movement ended, before visa restrictions in 2024 brought study numbers down sharply."
                series={visaBreakdownSeries}
                yLabel="Visas granted (thousands)"
                source={{
                  name: 'Home Office',
                  dataset: 'Immigration statistics',
                  frequency: 'quarterly',
                  url: 'https://www.gov.uk/government/collections/immigration-statistics-quarterly-release',
                }}
              />
            ) : (
              <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
            )}
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="What migration makes possible"
            value="143,000"
            unit="health &amp; care visas in 2023"
            description="Without the 143,000&plus; health and care visas in 2023, NHS waiting lists would be substantially longer and care homes would face catastrophic staffing shortfalls. International workers make up 19% of all NHS staff and 21% of care home workers — a structural dependency that reflects decades of under-investment in domestic training pipelines."
            source="NHS England · Workforce statistics 2023 · Home Office immigration data 2023"
          />
        </ScrollReveal>

        <section className="border-t border-wiah-border pt-8 mt-12">
          <h2 className="text-lg font-bold text-wiah-black mb-4">Sources &amp; methodology</h2>
          <div className="text-sm text-wiah-mid space-y-2">
            {data?.metadata.sources.map((src, i) => (
              <p key={i}>
                <strong>{src.name}.</strong> <em>{src.dataset}</em>. {src.frequency} — 
                <a href={src.url} target="_blank" rel="noopener noreferrer" className="underline text-wiah-blue hover:no-underline">
                  {src.url}
                </a>
              </p>
            ))}
          </div>
          <p className="text-sm text-wiah-mid mt-6">{data?.metadata.methodology}</p>
          {data?.metadata.knownIssues && data.metadata.knownIssues.length > 0 && (
            <div className="mt-6 p-4 bg-wiah-light rounded">
              <p className="font-bold text-wiah-black mb-2">Known issues:</p>
              <ul className="text-sm text-wiah-mid space-y-1 list-disc list-inside">
                {data.metadata.knownIssues.map((issue, i) => (
                  <li key={i}>{issue}</li>
                ))}
              </ul>
            </div>
          )}
        </section>
      </main>
    </>
  );
}
