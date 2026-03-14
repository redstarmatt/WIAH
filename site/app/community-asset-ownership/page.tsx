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

// Community-owned assets in England, 2012–2025 (Locality Census)
const assetValues = [3800, 4400, 5100, 5900, 6700, 7400, 7900, 8500, 9100, 8800, 9300, 9800, 10100, 10240];

// ACV registrations per year, 2012–2025 (DLUHC returns)
const acvValues = [180, 380, 560, 720, 850, 940, 1020, 1060, 1110, 890, 1050, 1180, 1300, 1340];

const series1: Series[] = [{
  id: 'community-assets',
  label: 'Community-owned assets (England)',
  colour: '#2A9D8F',
  data: assetValues.map((v, i) => ({ date: new Date(2012 + i, 0, 1), value: v })),
}];

const series2: Series[] = [
  {
    id: 'acv-registrations',
    label: 'ACV registrations (annual)',
    colour: '#264653',
    data: acvValues.map((v, i) => ({ date: new Date(2012 + i, 0, 1), value: v })),
  },
  {
    id: 'community-pubs',
    label: 'Community-owned pubs',
    colour: '#F4A261',
    data: [38, 52, 68, 85, 104, 118, 132, 148, 160, 155, 168, 182, 196, 206].map((v, i) => ({ date: new Date(2012 + i, 0, 1), value: v })),
  },
];

const annotations1: Annotation[] = [
  { date: new Date(2011, 8, 1), label: '2011: Localism Act passed' },
  { date: new Date(2018, 0, 1), label: '2018: Community Ownership Fund' },
];

const annotations2: Annotation[] = [
  { date: new Date(2012, 8, 1), label: '2012: ACV rights commence' },
  { date: new Date(2020, 2, 1), label: '2020: COVID-19 disruption' },
];

const editorialRefs: Reference[] = [
  { num: 1, name: 'Locality', dataset: 'Community Ownership and Management of Assets Census', url: 'https://locality.org.uk/policy-campaigns/community-ownership/', date: '2025' },
  { num: 2, name: 'DLUHC', dataset: 'Assets of Community Value Registrations', url: 'https://www.gov.uk/government/publications/community-right-to-bid-assess-whether-land-or-buildings-are-of-community-value', date: '2025' },
  { num: 3, name: 'Plunkett Foundation', dataset: 'Community Business Market Report', url: 'https://plunkett.co.uk/community-business-market/', date: '2025' },
  { num: 4, name: 'DLUHC', dataset: 'Community Ownership Fund Evaluation', url: 'https://www.gov.uk/government/organisations/ministry-of-housing-communities-and-local-government/about/statistics', date: '2024' },
];

export default function CommunityAssetOwnershipPage() {
  return (
    <>
      <TopicNav topic="Community Asset Ownership" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Community Asset Ownership"
          question="How Many Communities Own Their Own Buildings?"
          finding="England now has over 10,200 community-owned assets — pubs, shops, village halls, sports grounds — more than double the number a decade ago."
          colour="#2A9D8F"
          preposition="with"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Community asset ownership in England has grown steadily for over a decade, driven by the Localism Act 2011, which introduced the Community Right to Bid.<Cite nums={2} /> This allows communities to nominate local buildings as Assets of Community Value and gives them a six-month moratorium period to raise funds if the asset comes up for sale. Since the register opened in 2012, over 1,340 nominations are now made annually, up from just 180 in the first year.<Cite nums={2} /> The conversion rate from nomination to purchase sits at around 15–20%, but the register itself has had a chilling effect on speculative sales, keeping pubs, post offices, and community centres in community hands even when not formally purchased.<Cite nums={1} /></p>
            <p>The most visible success story is community pubs. England now has over 200 community-owned pubs, up from just 38 in 2014, with a 96% survival rate compared to roughly 400 pub closures per year nationally.<Cite nums={3} /> The Community Ownership Fund, launched in 2018 with £150 million of government backing and covering up to 50% of acquisition costs, has accelerated purchases.<Cite nums={4} /> Community ownership remains heavily concentrated in affluent rural and semi-rural areas; deprived urban communities, where the need is arguably greatest, are underrepresented due to the administrative burden and requirement for upfront capital.<Cite nums={[1, 4]} /></p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Total Assets' },
          { id: 'sec-chart2', label: 'ACV & Pubs' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Community-owned assets (England)"
              value="10,240"
              unit="2025"
              direction="up"
              polarity="up-is-good"
              changeText="+169% since 2012 · pubs, shops, halls, sports grounds"
              sparklineData={[7400, 7900, 8500, 9100, 8800, 9300, 9800, 10100, 10240]}
              source="Locality — Community Ownership Census 2025"
              href="#sec-chart1"
            />
            <MetricCard
              label="ACV registrations (annual)"
              value="1,340"
              unit="2025"
              direction="up"
              polarity="up-is-good"
              changeText="up from 180 in 2012 · Localism Act enabling tool"
              sparklineData={[940, 1020, 1060, 1110, 890, 1050, 1180, 1300, 1340]}
              source="DLUHC — Assets of Community Value returns 2025"
              href="#sec-chart2"
            />
            <MetricCard
              label="Community-owned pubs"
              value="206"
              unit="2025"
              direction="up"
              polarity="up-is-good"
              changeText="up from 38 in 2014 · 96% survival rate"
              sparklineData={[118, 132, 148, 160, 155, 168, 182, 196, 206]}
              source="Plunkett Foundation — Community Business Market Report 2025"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Community-owned assets in England, 2012–2025"
              subtitle="Total number of assets owned or managed by community organisations. Includes pubs, shops, halls, land, and sports grounds."
              series={series1}
              annotations={annotations1}
              yLabel="Assets"
              source={{ name: 'Locality', dataset: 'Community Ownership and Management of Assets', url: 'https://locality.org.uk/policy-campaigns/community-ownership/', frequency: 'annual', date: 'Nov 2025' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="ACV registrations and community pubs, 2012–2025"
              subtitle="Annual nominations under the Localism Act Community Right to Bid, alongside growth in community-owned pubs. COVID-19 caused a dip in 2020."
              series={series2}
              annotations={annotations2}
              yLabel="Count"
              source={{ name: 'DLUHC / Plunkett Foundation', dataset: 'ACV returns and Community Business Market Report', url: 'https://plunkett.co.uk/community-business-market/', frequency: 'annual', date: 'Nov 2025' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Community pubs: a 96% survival rate"
            value="206 pubs"
            unit="community-owned"
            description="Community-owned pubs have a 96% survival rate, compared to roughly 400 pub closures per year across England. The Plunkett Foundation reports that community pubs generate average annual revenues of around £250,000, employ local staff, and serve as vital social infrastructure in areas where other services have withdrawn. The Community Ownership Fund, backed by £150 million of government funding, has accelerated purchases since 2018 by covering up to 50% of acquisition costs."
            source="Source: Plunkett Foundation — Community Business Market Report, 2025. DLUHC — Community Ownership Fund evaluation, 2024."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://locality.org.uk/policy-campaigns/community-ownership/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Locality — Community Ownership and Management of Assets census</a> — annual count of community-owned assets in England. Retrieved Nov 2025.</p>
            <p><a href="https://plunkett.co.uk/community-business-market/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Plunkett Foundation — Community Business Market Report</a> — annual report on community pubs, shops, and other businesses. Retrieved Nov 2025.</p>
            <p><a href="https://www.gov.uk/government/publications/community-right-to-bid-assess-whether-land-or-buildings-are-of-community-value" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DLUHC — Assets of Community Value registrations</a> — local authority returns. Retrieved Nov 2025.</p>
            <p>All figures are for England unless otherwise stated. ACV registration totals are collated from local authority returns and may undercount where authorities have not submitted data.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
