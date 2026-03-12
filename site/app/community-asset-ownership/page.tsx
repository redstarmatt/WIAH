'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

// ── Types ────────────────────────────────────────────────────────────────────

interface AssetPoint {
  year: number;
  assets: number;
}

interface AcvPoint {
  year: number;
  registrations: number;
}

interface PubPoint {
  year: number;
  pubs: number;
}

interface RegionData {
  region: string;
  assetsPerCapita: number;
}

interface CommunityAssetData {
  communityAssets: AssetPoint[];
  acvRegistrations: AcvPoint[];
  communityPubs: PubPoint[];
  byRegion: RegionData[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 0, 1);
}

function sparkFrom(arr: number[], n = 10) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function CommunityAssetOwnershipPage() {
  const [data, setData] = useState<CommunityAssetData | null>(null);

  useEffect(() => {
    fetch('/data/community-asset-ownership/community_asset_ownership.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const assetSeries: Series[] = data
    ? [{
        id: 'community-assets',
        label: 'Community-owned assets',
        colour: '#2A9D8F',
        data: data.communityAssets.map(d => ({
          date: yearToDate(d.year),
          value: d.assets,
        })),
      }]
    : [];

  const acvSeries: Series[] = data
    ? [{
        id: 'acv-registrations',
        label: 'ACV registrations (annual)',
        colour: '#264653',
        data: data.acvRegistrations.map(d => ({
          date: yearToDate(d.year),
          value: d.registrations,
        })),
      }]
    : [];

  const pubSeries: Series[] = data
    ? [{
        id: 'community-pubs',
        label: 'Community-owned pubs',
        colour: '#F4A261',
        data: data.communityPubs.map(d => ({
          date: yearToDate(d.year),
          value: d.pubs,
        })),
      }]
    : [];

  const assetAnnotations: Annotation[] = [
    { date: new Date(2011, 8, 1), label: '2011: Localism Act passed' },
    { date: new Date(2018, 0, 1), label: '2018: Community Ownership Fund announced' },
  ];

  const acvAnnotations: Annotation[] = [
    { date: new Date(2012, 8, 1), label: '2012: ACV rights commence' },
    { date: new Date(2020, 2, 1), label: '2020: COVID-19 disruption' },
  ];

  const pubAnnotations: Annotation[] = [
    { date: new Date(2016, 0, 1), label: '2016: Pubs Code introduced' },
  ];

  const latestAssets = data?.communityAssets[data.communityAssets.length - 1];
  const earliestAssets = data?.communityAssets[0];
  const latestAcv = data?.acvRegistrations[data.acvRegistrations.length - 1];
  const earliestAcv = data?.acvRegistrations[0];
  const latestPubs = data?.communityPubs[data.communityPubs.length - 1];
  const earliestPubs = data?.communityPubs[0];

  const assetGrowth = latestAssets && earliestAssets
    ? Math.round(((latestAssets.assets - earliestAssets.assets) / earliestAssets.assets) * 100)
    : 112;

  return (
    <>
      <TopicNav topic="Community Asset Ownership" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Community Asset Ownership"
          question="How Many Communities Own Their Own Buildings?"
          finding="England now has over 10,200 community-owned assets -- pubs, shops, village halls, sports grounds -- more than double the number a decade ago. The Localism Act's Assets of Community Value register and targeted funding have enabled a quiet revolution in local ownership."
          colour="#2A9D8F"
          preposition="with"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              Community asset ownership in England has grown steadily for over a decade, driven by a combination of legislative reform, dedicated funding, and the sheer determination of local groups. The Localism Act 2011 introduced the Community Right to Bid, allowing communities to nominate local buildings as Assets of Community Value and giving them a six-month moratorium period to raise funds if the asset comes up for sale. Since the register opened in 2012, over 1,340 nominations are now being made annually -- up from just 180 in the first year. The conversion rate from nomination to purchase sits at around 15-20%, but the register itself has had a chilling effect on speculative sales, keeping pubs, post offices, and community centres in community hands even when they are not formally purchased.
            </p>
            <p>
              The most visible success story is community pubs. England now has over 200 community-owned pubs, up from just 38 in 2014. The Plunkett Foundation, which supports community businesses, reports a 96% survival rate for community-owned pubs -- compared to the roughly 400 pubs closing each year across the country. These are not nostalgic projects. Community pubs generate average annual revenues of around 250,000 pounds, employ local staff, and serve as social infrastructure in areas where the last shop, the last post office, and the last bus route have already gone. The Community Ownership Fund, launched in 2018 with 150 million pounds of government backing, has accelerated purchases by covering up to 50% of acquisition costs. Rural areas -- particularly the South West, Yorkshire, and the North West -- lead the way, with per capita asset ownership rates three to four times higher than London.
            </p>
            <p>
              The picture is not uniformly positive. Community ownership remains heavily concentrated in affluent rural and semi-rural areas where residents have the social capital, professional skills, and financial reserves to run share offers and manage complex assets. Deprived urban communities, where the need for locally controlled social infrastructure is arguably greatest, are underrepresented. The administrative burden of ACV nominations, community share offers, and ongoing governance can be prohibitive for groups without access to pro bono legal and financial advice. And the pipeline of threatened assets continues to grow: with local authorities selling off buildings to fill budget gaps, and commercial operators retreating from marginal areas, the demand for community ownership far outstrips the sector's capacity to respond.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-assets', label: 'Total assets' },
          { id: 'sec-acv', label: 'ACV registrations' },
          { id: 'sec-pubs', label: 'Community pubs' },
          { id: 'sec-regional', label: 'Regional' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Community-owned assets (England)"
            value={latestAssets ? latestAssets.assets.toLocaleString() : '10,240'}
            unit="2025"
            direction="up"
            polarity="up-is-good"
            changeText={`+${assetGrowth}% since ${earliestAssets?.year ?? 2012} · pubs, shops, halls, sports grounds`}
            sparklineData={
              data ? sparkFrom(data.communityAssets.map(d => d.assets)) : []
            }
            source="Locality -- Community Ownership Census, 2025"
            href="#sec-assets"
          />
          <MetricCard
            label="ACV registrations (annual)"
            value={latestAcv ? latestAcv.registrations.toLocaleString() : '1,340'}
            unit="2025"
            direction="up"
            polarity="up-is-good"
            changeText={`up from ${earliestAcv?.registrations ?? 180} in ${earliestAcv?.year ?? 2012} · Localism Act enabling tool`}
            sparklineData={
              data ? sparkFrom(data.acvRegistrations.map(d => d.registrations)) : []
            }
            source="DLUHC -- Assets of Community Value returns, 2025"
            href="#sec-acv"
          />
          <MetricCard
            label="Community-owned pubs"
            value={latestPubs ? latestPubs.pubs.toLocaleString() : '206'}
            unit="2025"
            direction="up"
            polarity="up-is-good"
            changeText={`up from ${earliestPubs?.pubs ?? 38} in ${earliestPubs?.year ?? 2014} · 96% survival rate`}
            sparklineData={
              data ? sparkFrom(data.communityPubs.map(d => d.pubs)) : []
            }
            source="Plunkett Foundation -- Community Business Market Report, 2025"
            href="#sec-pubs"
          />
        </div>

        {/* Chart 1: Total community-owned assets */}
        <ScrollReveal>
          <div id="sec-assets" className="mb-12">
            <LineChart
              series={assetSeries}
              annotations={assetAnnotations}
              title="Community-owned assets in England, 2012--2025"
              subtitle="Total number of assets owned or managed by community organisations. Includes pubs, shops, halls, land, and sports grounds."
              yLabel="Assets"
              source={{
                name: 'Locality',
                dataset: 'Community Ownership and Management of Assets',
                frequency: 'annual',
                url: 'https://locality.org.uk/policy-campaigns/community-ownership/',
                date: 'Nov 2025',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 2: ACV registrations */}
        <ScrollReveal>
          <div id="sec-acv" className="mb-12">
            <LineChart
              series={acvSeries}
              annotations={acvAnnotations}
              title="Assets of Community Value registrations per year, 2012--2025"
              subtitle="Annual nominations under the Localism Act 2011 Community Right to Bid. COVID-19 caused a dip in 2020."
              yLabel="Registrations"
              source={{
                name: 'DLUHC',
                dataset: 'Assets of Community Value local authority returns',
                frequency: 'annual',
                url: 'https://www.gov.uk/government/publications/community-right-to-bid-assess-whether-land-or-buildings-are-of-community-value',
                date: 'Nov 2025',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 3: Community pubs */}
        <ScrollReveal>
          <div id="sec-pubs" className="mb-12">
            <LineChart
              series={pubSeries}
              annotations={pubAnnotations}
              title="Community-owned pubs in England, 2014--2025"
              subtitle="Pubs purchased and operated by community benefit societies or co-operatives. 96% survival rate vs ~400 pub closures per year nationally."
              yLabel="Pubs"
              source={{
                name: 'Plunkett Foundation',
                dataset: 'Community Business Market Report',
                frequency: 'annual',
                url: 'https://plunkett.co.uk/community-business-market/',
                date: 'Nov 2025',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Regional variation */}
        <ScrollReveal>
          <div id="sec-regional" className="mb-12">
            <div className="bg-white rounded-lg border border-wiah-border p-8">
              <h2 className="text-lg font-bold text-wiah-black mb-2">
                Community-owned assets per 100,000 people by region
              </h2>
              <p className="text-sm text-wiah-mid mb-6">
                Rural areas lead, with the South West at nearly five times London&apos;s rate.
              </p>
              <div className="mt-6 space-y-4">
                {data?.byRegion.map((r) => {
                  const pct = (r.assetsPerCapita / 4.0) * 100;
                  return (
                    <div key={r.region}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-wiah-black">{r.region}</span>
                        <span className="font-mono text-sm font-bold text-wiah-black">{r.assetsPerCapita}</span>
                      </div>
                      <div className="h-6 bg-wiah-light rounded-sm overflow-hidden">
                        <div
                          className="h-full rounded-sm transition-all"
                          style={{ width: `${Math.min(pct, 100)}%`, backgroundColor: '#2A9D8F' }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="font-mono text-xs text-wiah-mid mt-4">
                Source: Locality -- Community Ownership Census, 2025. Rate per 100,000 population.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Community pubs: a 96% survival rate"
            value="206 pubs"
            description="Community-owned pubs have a 96% survival rate, compared to roughly 400 pub closures per year across England. The Plunkett Foundation reports that community pubs generate average annual revenues of around 250,000 pounds, employ local staff, and serve as vital social infrastructure in areas where other services have withdrawn. The Community Ownership Fund, backed by 150 million pounds of government funding, has accelerated purchases since 2018 by covering up to 50% of acquisition costs. These are not vanity projects -- they are economically sustainable enterprises filling gaps left by market retreat."
            source="Source: Plunkett Foundation -- Community Business Market Report, 2025. DLUHC -- Community Ownership Fund evaluation, 2024."
          />
        </ScrollReveal>

        {/* Sources & Methodology */}
        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <div className="space-y-2">
              <p>
                <a href="https://locality.org.uk/policy-campaigns/community-ownership/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Locality</a> -- Community Ownership and Management of Assets census. Retrieved Nov 2025.
              </p>
              <p>
                <a href="https://plunkett.co.uk/community-business-market/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Plunkett Foundation</a> -- Community Business Market Report. Retrieved Nov 2025.
              </p>
              <p>
                <a href="https://www.gov.uk/government/publications/community-right-to-bid-assess-whether-land-or-buildings-are-of-community-value" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DLUHC</a> -- Assets of Community Value registrations, local authority returns. Retrieved Nov 2025.
              </p>
              <p>
                <a href="https://www.powertochange.org.uk/research/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Power to Change</a> -- Community Business Fund evaluation data. Retrieved Nov 2025.
              </p>
              <p>
                All figures are for England unless otherwise stated. Community asset definitions vary across sources; Locality counts include both freehold and long-lease community-managed assets. ACV registration totals are collated from local authority returns and may undercount where authorities have not submitted data. COVID-19 disrupted ACV applications in 2020.
              </p>
            </div>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
