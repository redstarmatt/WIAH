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

interface RacialInequalityData {
  national: {
    ethnicPayGap: {
      timeSeries: Array<{ year: number; gapPct: number }>;
    };
    unemploymentRatio: {
      timeSeries: Array<{ year: number; blackToWhiteRatio: number }>;
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

export default function RacialInequalityPage() {
  const [data, setData] = useState<RacialInequalityData | null>(null);

  useEffect(() => {
    fetch('/data/racial-inequality/racial_inequality.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const payGapSeries: Series[] = data
    ? [{
        id: 'ethnic-pay-gap',
        label: 'Ethnic pay gap (%)',
        colour: '#E63946',
        data: data.national.ethnicPayGap.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.gapPct,
        })),
      }]
    : [];

  const unemploymentSeries: Series[] = data
    ? [{
        id: 'unemployment-ratio',
        label: 'Black:White unemployment ratio',
        colour: '#264653',
        data: data.national.unemploymentRatio.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.blackToWhiteRatio,
        })),
      }]
    : [];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Racial Inequality" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Racial Inequality"
          question="How Wide Are Britain&apos;s Racial Gaps in Pay, Wealth, and Work?"
          finding="The ethnic pay gap remains stubbornly persistent at around 5% for all ethnic minorities combined &mdash; but this aggregate figure conceals much wider gaps for specific groups. Black workers face unemployment rates twice those of white workers. The median wealth of Black African households is &pound;34,000, compared with &pound;314,000 for white British households &mdash; a ninefold gap."
          colour="#E63946"
          preposition="with"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The UK&apos;s ethnic pay gap &mdash; the percentage difference in median hourly earnings between ethnic minority workers and white British workers &mdash; stood at approximately 5.1% in 2024 according to the ONS Annual Survey of Hours and Earnings. This aggregate figure, however, masks extreme variation between groups. Bangladeshi workers earn 20% less than white British workers on a median hourly basis; Pakistani workers earn 16% less; Black African workers earn 8% less. Indian and Chinese workers earn slightly more than the white British median, reflecting high concentrations in professional and technical occupations, but this apparent advantage disappears when controlling for qualifications and location &mdash; a phenomenon known as the &ldquo;ethnic penalty.&rdquo; Research by the Institute for Fiscal Studies shows that even after controlling for education, age, region, and sector, Bangladeshi men earn 14% less than comparable white British men, and Black Caribbean men earn 9% less.</p>
            <p>Unemployment disparities are starker and more persistent. Black workers in the UK face unemployment rates approximately twice those of white workers &mdash; a ratio that has barely changed in 30 years. In 2024, the unemployment rate for Black workers was approximately 7.5%, compared with 3.5% for white workers. During the COVID-19 pandemic, this ratio widened as ethnic minority workers were disproportionately concentrated in shutdown sectors (hospitality, retail, transport) and less likely to be able to work from home. Callback studies &mdash; where identical CVs are submitted with names signalling different ethnic backgrounds &mdash; consistently show that applicants with names perceived as Black, South Asian, or Muslim need to send 60&ndash;80% more applications to receive the same number of interview invitations as those with traditionally white British names. The government rejected mandatory ethnicity pay gap reporting (recommended by the Parker Review and the Commission on Race and Ethnic Disparities) in favour of voluntary guidance, and fewer than 50 large employers currently publish ethnicity pay data.</p>
            <p>The wealth gap is the most striking and least discussed dimension of racial inequality. ONS Wealth and Assets Survey data shows median total household wealth (including property, pensions, and financial assets) of &pound;314,000 for white British households, &pound;112,000 for Indian households, &pound;76,000 for Black Caribbean households, and &pound;34,000 for Black African households. This ninefold gap between white British and Black African median household wealth reflects historical patterns of migration, discrimination in housing and lending, lower homeownership rates, weaker pension provision in sectors where ethnic minority workers are concentrated, and intergenerational wealth transfers that compound over decades. Homeownership rates vary from 68% for white British households to 20% for Black African households &mdash; a gap that both reflects and reinforces the wealth disparity. The Resolution Foundation has argued that without targeted policy intervention, the racial wealth gap will widen further as house price appreciation and defined benefit pension closures benefit existing asset-holders disproportionately.</p>
            <p>Racial inequality intersects with geography, class, and gender in complex ways. In education, the picture is mixed: Bangladeshi and Black African pupils have closed and in some measures overtaken white British attainment at GCSE, while Black Caribbean boys and white working-class boys (particularly in coastal and post-industrial towns) remain the lowest-attaining groups. In the criminal justice system, Black people are 3.6 times more likely to be stopped and searched by police than white people, and make up 13% of the prison population despite being 4% of the general population. In health, ethnic minority groups experienced disproportionate mortality during COVID-19, and South Asian communities have significantly higher rates of Type 2 diabetes and cardiovascular disease. Maternal mortality for Black women is nearly four times higher than for white women. These disparities are not explained by genetics or individual behaviour; they reflect structural differences in housing quality, employment conditions, income, and access to healthcare. The Sewell Report (Commission on Race and Ethnic Disparities, 2021) controversially argued that Britain is not institutionally racist, but its own evidence showed persistent disparities in pay, employment, health, and criminal justice that the report did not satisfactorily explain through its preferred framework of cultural and individual factors.</p>
            <p>Measuring racial inequality in the UK is complicated by data limitations that would be unacceptable in many comparator countries. Ethnicity pay gap reporting is not mandatory, so the most reliable data comes from the ONS&apos;s ASHE, which has sample size limitations for smaller ethnic groups and does not capture self-employment income. The Labour Force Survey, the main source for unemployment data, changed from face-to-face to telephone interviewing in 2020, creating a series break that disproportionately affected response rates among ethnic minority groups. The Wealth and Assets Survey is the only source for household wealth by ethnicity but is conducted biennially with modest sample sizes &mdash; estimates for smaller ethnic groups have wide confidence intervals. Self-reported ethnicity classifications changed between Census 2011 and Census 2021, complicating trend analysis. There is no UK equivalent of the US Equal Employment Opportunity Commission&apos;s mandatory employer-level reporting by race, meaning discrimination in hiring and promotion is documented through academic field experiments rather than administrative data. Stop and search data is collected by police forces using inconsistent ethnic classifications that do not always align with ONS categories.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-pay', label: 'Pay Gap' },
          { id: 'sec-employment', label: 'Employment' },
        ]} />

        <ScrollReveal>
          <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Aggregate ethnic pay gap"
              value="5.1%"
              direction="down"
              polarity="up-is-bad"
              changeText="2024 &middot; Bangladeshi gap: 20% &middot; Pakistani: 16% &middot; Aggregate masks wide variation"
              sparklineData={[5.6, 5.7, 5.8, 5.7, 5.8, 5.6, 5.4, 5.3, 5.2, 5.1]}
              onExpand={() => {}}
            />
            <MetricCard
              label="Black:White unemployment ratio"
              value="2.0x"
              direction="flat"
              polarity="up-is-bad"
              changeText="2024 &middot; Barely changed in 30 years &middot; Black unemployment ~7.5% vs white ~3.5%"
              sparklineData={[2.3, 2.2, 2.1, 2.1, 2.0, 2.4, 2.2, 2.1, 2.1, 2.0]}
              onExpand={() => {}}
            />
            <MetricCard
              label="White:Black African wealth ratio"
              value="9.2x"
              direction="up"
              polarity="up-is-bad"
              changeText="Median household &middot; White British: &pound;314K &middot; Black African: &pound;34K &middot; Homeownership gap: 68% vs 20%"
              sparklineData={[8.0, 8.2, 8.5, 8.7, 8.9, 9.0, 9.1, 9.2]}
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-pay" className="mb-12">
            <LineChart
              title="Ethnic pay gap, Great Britain, 2015&ndash;2024"
              subtitle="Percentage difference in median hourly earnings between ethnic minority workers and white British workers."
              series={payGapSeries}
              yLabel="%"
              source={{
                name: 'ONS',
                dataset: 'Ethnicity Pay Gaps in Great Britain (ASHE)',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-employment" className="mb-12">
            <LineChart
              title="Black:White unemployment ratio, UK, 2015&ndash;2024"
              subtitle="Black unemployment rate divided by white unemployment rate. A ratio of 2.0 means Black workers are twice as likely to be unemployed."
              series={unemploymentSeries}
              yLabel="Ratio"
              source={{
                name: 'ONS',
                dataset: 'Labour Force Survey',
                frequency: 'quarterly',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="Where progress is real"
            value="+16pp"
            unit="improvement in Bangladeshi GCSE attainment relative to white British pupils since 2006"
            description="Educational attainment gaps have narrowed dramatically for several ethnic groups. Bangladeshi and Black African pupils now outperform white British pupils at GCSE in many local authorities. University participation among ethnic minority young people exceeds 50%, above the white British rate. The Parker Review has increased ethnic minority representation on FTSE 100 boards from 7% (2017) to 15% (2024). The NHS Workforce Race Equality Standard has improved ethnic minority representation in senior NHS roles. Ethnic minority entrepreneurship is growing at twice the rate of the overall business population."
            source="Source: ONS &mdash; ASHE Ethnicity Pay Gaps 2024; ONS &mdash; Labour Force Survey 2024; ONS &mdash; Wealth and Assets Survey 2022."
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
