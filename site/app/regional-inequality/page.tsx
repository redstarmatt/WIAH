'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';

// ── Types ────────────────────────────────────────────────────────────────────

interface RegionalInequalityData {
  national: {
    gvaPerHead: {
      timeSeries: Array<{ year: number; londonIndex: number; northEastIndex: number }>;
    };
    healthyLifeExpectancy: {
      timeSeries: Array<{ year: number; richestDecile: number; poorestDecile: number }>;
    };
  };
  metadata: {
    sources: Array<{ name: string; dataset: string; url: string; frequency: string }>;
    methodology: string;
    knownIssues: string[];
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function RegionalInequalityPage() {
  const [data, setData] = useState<RegionalInequalityData | null>(null);

  useEffect(() => {
    fetch('/data/regional-inequality/regional_inequality.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const gvaSeries: Series[] = data
    ? [
        {
          id: 'london-gva',
          label: 'London',
          colour: '#264653',
          data: data.national.gvaPerHead.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.londonIndex,
          })),
        },
        {
          id: 'north-east-gva',
          label: 'North East',
          colour: '#E63946',
          data: data.national.gvaPerHead.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.northEastIndex,
          })),
        },
      ]
    : [];

  const hleSeries: Series[] = data
    ? [
        {
          id: 'richest-hle',
          label: 'Richest decile',
          colour: '#2A9D8F',
          data: data.national.healthyLifeExpectancy.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.richestDecile,
          })),
        },
        {
          id: 'poorest-hle',
          label: 'Poorest decile',
          colour: '#E63946',
          data: data.national.healthyLifeExpectancy.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.poorestDecile,
          })),
        },
      ]
    : [];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Regional Inequality" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Regional Inequality"
          question="Is the North&ndash;South Divide Actually Getting Worse?"
          finding="London&apos;s economic output per person is 178&percnt; of the UK average; the North East produces 65&percnt;. This 113-point gap has widened, not narrowed, since 2015 despite successive &lsquo;levelling up&rsquo; commitments. People in the poorest areas of England can expect 21 fewer years of healthy life than those in the wealthiest."
          colour="#6B7280"
          preposition="with"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The United Kingdom has the widest regional economic disparities of any large OECD economy. London&apos;s gross value added (GVA) per head is approximately 178&percnt; of the UK average, while the North East of England produces just 65&percnt;. This means that economic output per person in London is nearly three times that of the North East &mdash; a gap more extreme than between the richest and poorest regions of France, Germany, or Italy. The disparity is not new, but it has deepened: ONS regional accounts show the gap between London and every English region outside the South East widening in real terms since 2010. Inner London West (which includes the City of London and Westminster) produces GVA per head of &pound;137,000 &mdash; roughly ten times the &pound;14,800 produced in Blackpool. These are not merely statistical abstractions: they translate directly into wages, employment opportunities, public service quality, and life expectancy.</p>
            <p>&ldquo;Levelling up&rdquo; became the central domestic policy agenda of the 2019 Conservative government, culminating in the Levelling Up and Regeneration Act 2023. The programme committed &pound;4.8 billion through the Levelling Up Fund, &pound;2.6 billion through the UK Shared Prosperity Fund (replacing EU structural funds), and &pound;3.8 billion through city and devolution deals. Early evaluations are not encouraging: the Institute for Fiscal Studies found no statistically significant narrowing of regional economic gaps between 2019 and 2024. Transport investment remains overwhelmingly concentrated in London and the South East: per capita transport spending in London was &pound;902 in 2022/23, compared with &pound;337 in the North East and &pound;296 in Yorkshire. The cancellation of the northern leg of HS2 in October 2023 &mdash; a project explicitly intended to improve connectivity between Birmingham and Manchester &mdash; was described by northern leaders as a decisive blow to the levelling up agenda.</p>
            <p>Regional inequality is not solely an economic phenomenon. Healthy life expectancy &mdash; the years a person can expect to live in good health &mdash; varies by 21 years between the richest and poorest deciles of the English population. In the wealthiest areas, people can expect to live in good health until approximately 70.4 years; in the most deprived areas, healthy life expectancy is 49.5 years &mdash; meaning many residents of poor areas are in poor health before they reach state pension age. School attainment, access to healthcare, broadband connectivity, and cultural infrastructure all follow similar geographic gradients. The gap in GCSE attainment between disadvantaged pupils in London and those in the North East or East Midlands widened between 2019 and 2023. University funding per student is roughly equal nationally, but graduate retention is heavily skewed toward London: over 60&percnt; of graduates from northern universities who move for work relocate to London or the South East.</p>
            <p>The burden of regional inequality falls most heavily on post-industrial communities, coastal towns, and areas with older populations. Former coalfield communities in South Yorkshire, County Durham, and Nottinghamshire experienced deindustrialisation in the 1980s and have never recovered to national average income levels. Coastal towns such as Blackpool, Clacton, and Jaywick combine seasonal employment, poor housing stock, and weak transport links. These areas also have higher rates of disability, limiting long-term illness, and economic inactivity. Ethnic minority communities in northern and midland cities face a compound disadvantage: lower regional economic output combined with ethnic pay gaps and discrimination in hiring. The devolution agenda &mdash; mayoral combined authorities in Greater Manchester, West Midlands, West Yorkshire, and other areas &mdash; is intended to give regions greater fiscal autonomy, but devolved budgets remain small relative to the scale of the challenge and the fiscal powers available to English regional mayors are weaker than those of the Scottish Parliament or Welsh Senedd.</p>
            <p>Measuring regional inequality is methodologically complex. GVA per head &mdash; the standard ONS measure &mdash; overstates London&apos;s advantage because it attributes economic output to the workplace, not the worker&apos;s residence: approximately 900,000 people commute into London from surrounding regions, inflating London&apos;s per-capita figure. Gross disposable household income (GDHI), which measures income where people live, narrows the gap somewhat but still shows London 30&percnt; above the UK average and the North East 15&percnt; below. Purchasing power adjustments (accounting for lower housing costs outside London) narrow the gap further, but the IFS calculates that even on a cost-adjusted basis, the London&ndash;North East gap is approximately 40&percnt;. Healthy life expectancy estimates at local authority level have wide confidence intervals and depend on self-reported health status in the Annual Population Survey, which may systematically differ by region and culture. Transport investment comparisons are sensitive to whether London-based national infrastructure (Crossrail, the Elizabeth line) is classified as regional or national spending. The Levelling Up missions &mdash; 12 quantitative targets set in the 2022 White Paper &mdash; have not been independently evaluated since publication, and several lack baseline data.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-gva', label: 'Economic Output' },
          { id: 'sec-health', label: 'Healthy Life' },
        ]} />

        <ScrollReveal>
          <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="London GVA per head (UK = 100)"
              value="178"
              direction="up"
              polarity="up-is-bad"
              changeText="2023 &middot; Gap widening since 2015 &middot; Inner London West: &pound;137K per head &middot; North East: 65"
              sparklineData={[170, 172, 173, 174, 175, 168, 172, 176, 178]}
              onExpand={() => {}}
            />
            <MetricCard
              label="Healthy life expectancy gap"
              value="21 yrs"
              direction="up"
              polarity="up-is-bad"
              changeText="Between richest &amp; poorest deciles &middot; 2023 &middot; Poorest: 49.5 yrs &middot; Richest: 70.4 yrs"
              sparklineData={[18.6, 18.7, 19.0, 19.4, 19.7, 19.9, 20.3, 20.7, 20.9]}
              onExpand={() => {}}
            />
            <MetricCard
              label="Transport spend per head, North East"
              value="&pound;337"
              direction="flat"
              polarity="up-is-good"
              changeText="2022/23 &middot; London: &pound;902 &middot; Yorkshire: &pound;296 &middot; HS2 northern leg cancelled Oct 2023"
              sparklineData={[310, 315, 320, 325, 330, 335, 337]}
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-gva" className="mb-12">
            <LineChart
              title="GVA per head: London vs North East (UK = 100), 2015&ndash;2023"
              subtitle="Gross value added per head of population, indexed to UK average = 100. The gap has widened over the period."
              series={gvaSeries}
              yLabel="Index (UK = 100)"
              source={{
                name: 'ONS',
                dataset: 'Regional Gross Value Added (Balanced)',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-health" className="mb-12">
            <LineChart
              title="Healthy life expectancy: richest vs poorest decile, England, 2015&ndash;2023"
              subtitle="Years of life expected in good health by deprivation decile. The gap has reached 21 years."
              series={hleSeries}
              yLabel="Years"
              source={{
                name: 'ONS',
                dataset: 'Health State Life Expectancies',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="Where devolution is making a difference"
            value="&pound;13bn"
            unit="devolution deal commitments to English regions since 2014"
            description="Mayoral combined authorities in Greater Manchester, West Midlands, West Yorkshire, South Yorkshire, and Liverpool City Region now control transport, skills, and housing budgets. Greater Manchester&apos;s integrated health and social care system &mdash; the first in England &mdash; has been cited as a model for regional autonomy. The trailblazer devolution deals for Greater Manchester and West Midlands (2023) provide single funding settlements, giving mayors greater fiscal flexibility. Early evidence from the Northern Powerhouse Investment Fund shows higher SME survival rates in areas with targeted regional support."
            source="Source: ONS &mdash; Regional GVA (Balanced) 2023; ONS &mdash; Health State Life Expectancies 2023; DLUHC &mdash; Levelling Up Fund Monitoring 2024."
          />
        </ScrollReveal>

        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            {data?.metadata.sources.map((src, i) => (
              <div key={i}>
                <a href={src.url} target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">
                  {src.name} &mdash; {src.dataset}
                </a>
                <div className="text-xs text-wiah-mid">Updated {src.frequency}</div>
              </div>
            ))}
          </div>
          <div className="text-sm text-wiah-mid mt-6 space-y-2">
            <h3 className="font-bold">Methodology</h3>
            <p>{data?.metadata.methodology}</p>
          </div>
          <div className="text-sm text-wiah-mid mt-6 space-y-2">
            <h3 className="font-bold">Known issues</h3>
            <ul className="list-disc list-inside space-y-1">
              {data?.metadata.knownIssues.map((issue, i) => (
                <li key={i}>{issue}</li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
