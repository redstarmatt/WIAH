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
          finding="Net migration to the UK reached a record 906,000 in the year to June 2023 &mdash; driven largely by students and workers from non-EU countries filling vacancies in health, social care, and hospitality &mdash; before falling sharply to around 350,000 by late 2024 following visa restrictions."
          colour="#6B7280"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              UK net migration &mdash; the difference between the number of people arriving to live in the UK and the number leaving &mdash; has been the most politically contentious number in British public life for two decades. Governments of all parties have made reducing it a central commitment, and none has succeeded in meeting their stated targets. The story of the last four years has been one of extraordinary volatility: a record 906,000 net in the year to June 2023, driven by a post-COVID surge in student visas, NHS and social care recruitment, and the emergency humanitarian response to Ukraine and Hong Kong &mdash; followed by a deliberate policy contraction that brought figures down towards 350,000 by late 2024. Neither extreme tells the whole story, and both have been heavily distorted by statistical methodology changes that make historical comparison treacherous.
            </p>
            <p>
              The composition of migration has changed radically since Brexit. Free movement within the EU, which accounted for a significant share of pre-2020 immigration particularly in hospitality, construction, and agriculture, ended in January 2021. The government introduced a new points-based immigration system that made non-EU and EU citizens subject to identical rules for the first time. The practical effect was that sectors previously reliant on EU workers &mdash; social care, food processing, seasonal agriculture, hospitality &mdash; pivoted to recruitment from India, the Philippines, Nigeria, and Zimbabwe. The number of health and care visas issued rose from under 30,000 in 2020 to 143,000 in 2023. International student numbers surged as UK universities competed aggressively for non-EU students in the post-Brexit environment, and as students in the global south sought access to post-study work rights expanded in 2021.
            </p>
            <p>
              The government&apos;s January 2024 visa restriction package was the most significant tightening in a generation. It removed the right of international students to bring dependants to the UK (except for postgraduate research students), raised the salary threshold for skilled worker visas from &pound;26,200 to &pound;38,700, and restricted health and care workers from bringing family members. The ONS estimated that these changes, combined with a reduction in Ukraine and Afghanistan humanitarian schemes, could reduce net migration by 200,000 to 300,000 annually. Early data from late 2024 suggested the target range was being met, but at a cost: NHS trusts, care homes, and universities all reported significant recruitment difficulties following the restrictions.
            </p>
            <p>
              The distributional effects of migration are highly uneven. London receives a disproportionate share of immigration and bears the highest housing cost pressures partly as a result, though it also generates the largest fiscal and economic returns from migrant workers. Rural and coastal communities that relied on EU seasonal workers for agriculture, fishing, and food processing have faced acute labour shortages since free movement ended. Asylum seekers &mdash; who account for a relatively small share of net migration figures (around 40,000 per year) but a disproportionate share of political debate &mdash; are concentrated in a small number of local authorities, putting pressure on housing, schools, and GP practices in those areas while other areas bear no costs at all. The failure to distribute asylum seekers more evenly is a policy choice, not an inevitability.
            </p>
            <p>
              Net migration statistics carry significant measurement uncertainty. Until 2021, ONS relied primarily on the International Passenger Survey &mdash; a sample survey of passengers at ports and airports &mdash; which had a large margin of error and was acknowledged to under-count certain groups. From 2021, ONS shifted to a new methodology using administrative data sources including Home Office visa records, HMRC employment records, and NHS patient registrations, combined with survey data. This change produced significantly higher estimates for earlier years when applied retrospectively, making pre-2021 and post-2021 figures non-comparable on a like-for-like basis. The 906,000 figure for 2023 should be understood in this context: it is not comparable with the sub-300,000 figures quoted in most of the 2010s, which used the older methodology.
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
              changeText="Record high &middot; Driven by students, health &amp; care workers, Ukraine &amp; HK schemes"
              sparklineData={[168, 248, 184, 260, 129, 488, 745, 906]}
              source="ONS &middot; Long-term international migration 2023"
              onExpand={() => {}}
            />
            <MetricCard
              label="Net migration (year to mid-2024)"
              value="~350,000"
              direction="down"
              polarity="neutral"
              changeText="Down from 906,000 peak &middot; Effect of January 2024 visa restrictions"
              sparklineData={[906, 800, 650, 500, 400, 350]}
              source="ONS &middot; Long-term international migration provisional 2024"
              onExpand={() => {}}
            />
            <MetricCard
              label="Health &amp; care visas issued (2023)"
              value="143,000"
              direction="flat"
              polarity="up-is-good"
              changeText="Filling NHS &amp; social care vacancies &middot; Restricted from 2024"
              sparklineData={[28000, 45000, 68000, 95000, 130000, 143000]}
              source="Home Office &middot; Immigration statistics 2023"
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-trend" className="mb-12">
            {netMigrationSeries.length > 0 ? (
              <LineChart
                title="UK net migration, 2004&ndash;2024"
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
                title="Work and study visas granted, 2017&ndash;2024"
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
            description="Without the 143,000&plus; health and care visas in 2023, NHS waiting lists would be substantially longer and care homes would face catastrophic staffing shortfalls. International workers make up 19&percnt; of all NHS staff and 21&percnt; of care home workers &mdash; a structural dependency that reflects decades of under-investment in domestic training pipelines."
            source="NHS England &middot; Workforce statistics 2023 &middot; Home Office immigration data 2023"
          />
        </ScrollReveal>

        <section className="border-t border-wiah-border pt-8 mt-12">
          <h2 className="text-lg font-bold text-wiah-black mb-4">Sources &amp; methodology</h2>
          <div className="text-sm text-wiah-mid space-y-2">
            {data?.metadata.sources.map((src, i) => (
              <p key={i}>
                <strong>{src.name}.</strong> <em>{src.dataset}</em>. {src.frequency} &mdash;&nbsp;
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
