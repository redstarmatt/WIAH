'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import PositiveCallout from '@/components/PositiveCallout';

// ── Types ────────────────────────────────────────────────────────────────────

interface CreativeIndustriesData {
  timeSeries: Array<{ date: string; creativeGvaBn: number; grassrootsVenues: number }>;
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

export default function CreativeIndustriesPage() {
  const [data, setData] = useState<CreativeIndustriesData | null>(null);

  useEffect(() => {
    fetch('/data/creative-industries/creative_industries.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const gvaSeries: Series[] = data
    ? [
        {
          id: 'gva',
          label: 'Creative industries GVA (&pound;bn)',
          colour: '#264653',
          data: data.timeSeries.map(d => ({ date: yearToDate(d.date), value: d.creativeGvaBn })),
        },
      ]
    : [];

  const venueSeries: Series[] = data
    ? [
        {
          id: 'venues',
          label: 'Grassroots music venues (number)',
          colour: '#E63946',
          data: data.timeSeries.map(d => ({ date: yearToDate(d.date), value: d.grassrootsVenues })),
        },
      ]
    : [];

  return (
    <>
      <TopicNav topic="Creative Industries" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Creative Industries"
          question="What Is Actually Happening to Britain&apos;s Creative Industries?"
          finding="The UK&apos;s creative industries contribute &pound;116bn to GDP annually and employ 2.4 million people &mdash; but the sector faces mounting pressures from AI-generated content threatening copyright, Brexit barriers to touring, and the disappearance of grassroots music venues at a rate of 12 per month."
          colour="#264653"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              Britain&apos;s creative industries are simultaneously one of the country&apos;s most remarkable success stories and one of its most underappreciated crises. The sector &mdash; which spans film, television, music, games, publishing, advertising, architecture, design, and the arts &mdash; generated &pound;116bn in gross value added in 2023, more than the automotive and aerospace sectors combined. Employment has grown every year since 2010, reaching 2.4 million jobs &mdash; around 6&percnt; of total UK employment &mdash; with a particularly high concentration in London and the South East but significant clusters in Manchester, Bristol, Glasgow, and Leeds. UK creative content reaches global audiences in ways no other sector can match: UK-produced television is watched in 190 countries, British musicians generate 13&percnt; of global music streaming revenue, and UK games studios have produced some of the best-selling titles in history.
            </p>
            <p>
              Brexit imposed structural costs that the sector is still absorbing. Before 2021, UK musicians, theatre companies, and film crews could tour across the EU under freedom of movement without visa or work permit requirements. Now they must navigate 27 different national bureaucracies, each with different rules on temporary work permits, equipment carnets, and social security contributions. The Creative Industries Federation estimated in 2022 that the additional administrative burden cost the average mid-sized UK touring act &pound;30,000 to &pound;50,000 per European tour, making many dates economically unviable. The UK was also removed from EU creative funding programmes including Creative Europe, losing an estimated &pound;40m per year in EU grants for arts and culture projects. A bilateral agreement to re-associate with some Creative Europe strands had not been concluded as of early 2025.
            </p>
            <p>
              Artificial intelligence represents a new and potentially existential threat to the copyright foundations on which the creative industries depend. Generative AI systems trained on millions of copyright-protected works &mdash; songs, books, images, scripts, code &mdash; are now producing outputs that compete directly with human-created content. UK law does not currently require consent from or compensation to rights holders for AI training, placing British creators at a disadvantage compared with the EU&apos;s AI Act framework. The Authors&apos; Licensing and Collecting Society found in 2023 that 62&percnt; of authors had had their work used to train AI without consent or payment; musicians, visual artists, and screenwriters report similar experiences. The government&apos;s 2024 consultation on AI and intellectual property closed without producing new legislative protections, leaving creators in legal limbo.
            </p>
            <p>
              The grassroots music venue crisis is the most visible symptom of wider pressures on the creative pipeline. Music Venue Trust registers show that the number of venues with a capacity under 350 &mdash; the incubators where new talent develops before graduating to larger stages &mdash; fell from approximately 6,800 in 2015 to 4,600 in 2023, a loss of 32&percnt;. The causes are multiple: rising rents in urban areas driven by property development pressures, business rates that treat live music venues the same as retail premises, noise complaints from new residential developments built next to existing venues, rising energy costs, and the post-COVID collapse in midweek audiences. The loss is not just cultural: Music Venue Trust research found that 90&percnt; of acts in the UK&apos;s top 100 venues had played grassroots venues within the previous five years, making them essential infrastructure for the industry at large.
            </p>
            <p>
              Creative industries data has important limitations. DCMS GVA estimates are based on Standard Industrial Classification codes that have been revised over time, making long-run comparisons approximate. The classification of &ldquo;creative industries&rdquo; is itself contested: some analyses include computer games, some do not; some include advertising as a whole, others only the creative production component. Employment figures count jobs rather than full-time equivalents, and a high proportion of creative workers are self-employed, part-time, or portfolio workers whose income is not captured in standard labour market statistics. Music Venue Trust registers are comprehensive but not exhaustive, and the turnover of small venues is high even in stable market conditions. Copyright infringement by AI systems is difficult to quantify by definition &mdash; the training datasets are not fully disclosed by any major AI company, making it impossible to audit the scale of unlicensed use.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Overview' },
          { id: 'sec-gva', label: 'Economic Output' },
          { id: 'sec-venues', label: 'Music Venues' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Creative industries GVA"
              value="&pound;116bn"
              direction="up"
              polarity="up-is-good"
              changeText="Up from &pound;84bn in 2015 &middot; 6&percnt; of UK GDP &middot; 2.4 million jobs"
              sparklineData={[84, 90, 97, 105, 112, 95, 106, 116]}
              source="DCMS &middot; Economic estimates 2023"
              onExpand={() => {}}
            />
            <MetricCard
              label="Grassroots music venues closed since 2007"
              value="35%"
              direction="down"
              polarity="up-is-bad"
              changeText="~12 venues closing per month &middot; Down from 7,000&plus; in 2007"
              sparklineData={[6800, 6500, 6200, 5900, 5600, 5300, 5000, 4600]}
              source="Music Venue Trust &middot; Venues at Risk Report 2023"
              onExpand={() => {}}
            />
            <MetricCard
              label="Creative workers below living wage"
              value="42%"
              direction="flat"
              polarity="up-is-bad"
              changeText="Stable at 40&ndash;44&percnt; &middot; Self-employment and portfolio work depress incomes"
              sparklineData={[40, 41, 42, 43, 44, 43, 42, 42]}
              source="Creative Industries Policy and Evidence Centre &middot; 2023"
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-gva" className="mb-12">
            {gvaSeries.length > 0 ? (
              <LineChart
                title="Creative industries gross value added, UK, 2015&ndash;2024"
                subtitle="GVA contribution of the UK&apos;s creative industries sector (&pound;bn, current prices). Includes film, TV, music, games, publishing, advertising, architecture, and design. The 2020 dip reflects COVID-19 lockdowns."
                series={gvaSeries}
                yLabel="GVA (&pound;bn)"
                source={{
                  name: 'Department for Culture, Media and Sport',
                  dataset: 'DCMS sectors economic estimates: GVA',
                  frequency: 'annual',
                  url: 'https://www.gov.uk/government/collections/dcms-sectors-economic-estimates',
                }}
              />
            ) : (
              <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
            )}
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-venues" className="mb-12">
            {venueSeries.length > 0 ? (
              <LineChart
                title="Grassroots music venues in the UK, 2015&ndash;2024"
                subtitle="Number of registered live music venues with capacity under 350 &mdash; the grassroots pipeline that develops emerging talent. Declining at roughly 12 venues per month from a 2007 peak of over 7,000."
                series={venueSeries}
                yLabel="Venues (number)"
                source={{
                  name: 'Music Venue Trust',
                  dataset: 'Venues at Risk report',
                  frequency: 'annual',
                  url: 'https://musicvenuetrust.com/venues-at-risk/',
                }}
              />
            ) : (
              <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
            )}
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="Where the sector thrives"
            value="&pound;7.9bn"
            unit="UK games GVA 2023"
            description="The UK games industry generated &pound;7.9bn in 2023 &mdash; up 400&percnt; since 2010 &mdash; and UK films regularly top global box offices. The Creative Industries Sector Vision (2023) commits &pound;50m in additional support for grassroots venues and music education, alongside plans to expand the UK&apos;s cultural export programme."
            source="Ukie &middot; UK games industry statistics 2023 &middot; DCMS &middot; Creative Industries Sector Vision 2023"
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
