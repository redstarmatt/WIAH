'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';

// ── Types ────────────────────────────────────────────────────────────────────

interface NrmPoint {
  year: number;
  referrals: number;
}

interface ExploitationType {
  type: string;
  pct: number;
}

interface NationalityData {
  nationality: string;
  referrals: number;
}

interface ModernSlaveryData {
  national: {
    nrmReferrals: {
      timeSeries: NrmPoint[];
      latestYear: number;
      latestCount: number;
      trueEstimate: number;
    };
    exploitationType: ExploitationType[];
    topNationalities: NationalityData[];
  };
  metadata: {
    sources: { name: string; dataset: string; url: string; frequency: string }[];
    methodology: string;
    knownIssues: string[];
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

function sparkFrom(arr: number[], n = 12) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function ModernSlaveryPage() {
  const [data, setData] = useState<ModernSlaveryData | null>(null);

  useEffect(() => {
    fetch('/data/modern-slavery/modern_slavery.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const nrmSeries: Series[] = data
    ? [{
        id: 'nrm-referrals',
        label: 'Referrals',
        colour: '#0D1117',
        data: data.national.nrmReferrals.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.referrals,
        })),
      }]
    : [];

  const nrmAnnotations: Annotation[] = [
    { date: new Date(2015, 0, 1), label: '2015: Modern Slavery Act' },
  ];

  // ── Metric values ────────────────────────────────────────────────────────

  const latestReferrals = data?.national.nrmReferrals.latestCount ?? null;

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Modern Slavery" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Modern Slavery"
          preposition="with"
          question="How Many People Are Being Exploited in Britain?"
          finding="17,004 potential victims of modern slavery were referred to the National Referral Mechanism in 2023 &mdash; up 33% in a single year and 10 times the number in 2014. Experts estimate the true number in the UK exceeds 100,000. The conviction rate for modern slavery offences is just 4%. The UK is both a destination and a transit country."
          colour="#0D1117"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The National Referral Mechanism received 17,004 referrals of potential modern slavery victims in 2023 &mdash; a 33% increase on the previous year and ten times the 1,745 recorded in 2014. The Global Slavery Index estimates between 100,000 and 136,000 people are held in conditions of modern slavery across the United Kingdom at any given time, making the NRM figures a fraction of the true scale. Children now account for 5,509 referrals, nearly a third of the total, driven overwhelmingly by county lines drug networks that recruit boys as young as 12 to transport narcotics between urban hubs and provincial towns. Albanian nationals comprise 15% of all referrals, followed by UK nationals at 14% and Vietnamese nationals at 8%.</p>
            <p>Labour exploitation accounts for 47% of identified cases, ranging from car washes and construction sites to nail bars and agriculture. Sexual exploitation makes up 30%, criminal exploitation 15% &mdash; predominantly county lines &mdash; and domestic servitude 8%. These categories frequently overlap: victims coerced into cannabis cultivation, for instance, may face both criminal and labour exploitation simultaneously. The Section 45 statutory defence, introduced by the Modern Slavery Act 2015, recognises that trafficking victims are often compelled to commit offences, yet courts apply it inconsistently. Many victims also enter the asylum system, creating a complex intersection where trafficking claims and immigration cases run in parallel, with average NRM conclusive-grounds decisions now taking 543 days.</p>
            <p>The Modern Slavery Act 2015 was considered world-leading legislation: it created specific trafficking and slavery offences, established the National Referral Mechanism on a statutory footing, required businesses with turnover above &pound;36 million to publish annual transparency statements, and introduced Slavery and Trafficking Prevention Orders. Yet the prosecution gap remains stark. Only 4% of NRM referrals lead to a prosecution, and the conviction rate relative to estimated victims stands at roughly 0.1%. The Independent Anti-Slavery Commissioner &mdash; a role created by the Act &mdash; has repeatedly warned that enforcement resources fall far short of the scale of exploitation. An independent review in 2019 found that supply-chain transparency statements are largely unenforced, and the Nationality and Borders Act 2022 further tightened eligibility for trafficking protections among asylum seekers.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-trend', label: 'NRM Trend' },
          { id: 'sec-type', label: 'By Type' },
          { id: 'sec-nationality', label: 'Nationalities' },
        ]} />

        {/* Metric cards */}
        <ScrollReveal>
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="NRM referrals (potential victims)"
            value={latestReferrals ? latestReferrals.toLocaleString() : '—'}
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText="2023 &middot; Up 33% in one year &middot; Up 10x since 2014 &middot; True total est. 100K+ &middot; Albanian and Vietnamese nationals most referred"
            sparklineData={
              data
                ? sparkFrom(data.national.nrmReferrals.timeSeries.map(d => d.referrals), 10)
                : []
            }
            source="Home Office · NRM Statistics"
            onExpand={() => {}}
          />
          <MetricCard
            label="Modern slavery convictions (annual)"
            value="352"
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText="2022 &middot; Conviction rate ~4% of referrals &middot; Up from 74 in 2014 &middot; Prosecution gap persisting"
            sparklineData={[74, 112, 188, 232, 264, 270, 295, 320, 345, 352]}
            source="CPS · Modern Slavery Prosecutions"
            onExpand={() => {}}
          />
          <MetricCard
            label="Children referred as potential victims"
            value="5,509"
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText="2023 &middot; 32% of all referrals &middot; County lines main driver for children &middot; UK nationals increasingly common"
            sparklineData={[480, 700, 1000, 1500, 2100, 2500, 3100, 3800, 4500, 5509]}
            source="Home Office · NRM Statistics"
            onExpand={() => {}}
          />
        </div>
        </ScrollReveal>

        {/* Chart 1: NRM referrals trend */}
        <ScrollReveal>
        <section id="sec-trend" className="mb-16">
          <LineChart
            title="Potential modern slavery victims referred to NRM, 2014–2023"
            subtitle="National Referral Mechanism referrals. A 10x increase since 2014 reflects both growing exploitation and improved detection."
            series={nrmSeries}
            annotations={nrmAnnotations}
            yLabel="Referrals"
            source={{ name: 'Home Office', dataset: 'NRM Statistics' }}
          />
        </section>
        </ScrollReveal>

        {/* Chart 2: Exploitation type (CSS bar chart) */}
        <ScrollReveal>
        <section id="sec-type" className="mb-16">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-wiah-black mb-2">Type of exploitation</h2>
            <p className="text-sm text-wiah-mid">Potential victims by exploitation type, England 2023.</p>
          </div>
          <div className="space-y-4">
            {data?.national.exploitationType.map((item, idx) => {
              const widthPct = (item.pct / 42) * 100;
              return (
                <div key={idx} className="flex items-center gap-4">
                  <div className="w-48 text-sm font-medium text-wiah-black">{item.type}</div>
                  <div className="flex-1 flex items-center gap-3">
                    <div className="h-8 bg-wiah-light rounded flex-1 relative overflow-hidden">
                      <div
                        style={{
                          width: `${widthPct}%`,
                          backgroundColor: '#0D1117',
                        }}
                        className="h-full transition-all duration-300"
                      />
                    </div>
                    <div className="w-12 text-right text-sm font-mono text-wiah-black">{item.pct}%</div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
        </ScrollReveal>

        {/* Chart 3: Top nationalities (CSS bar chart) */}
        <ScrollReveal>
        <section id="sec-nationality" className="mb-16">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-wiah-black mb-2">Top nationalities of referred potential victims</h2>
            <p className="text-sm text-wiah-mid">Modern slavery NRM referrals by nationality, 2023.</p>
          </div>
          <div className="space-y-4">
            {data?.national.topNationalities.map((item, idx) => {
              const widthPct = (item.referrals / 2405) * 100;
              return (
                <div key={idx} className="flex items-center gap-4">
                  <div className="w-32 text-sm font-medium text-wiah-black">{item.nationality}</div>
                  <div className="flex-1 flex items-center gap-3">
                    <div className="h-8 bg-wiah-light rounded flex-1 relative overflow-hidden">
                      <div
                        style={{
                          width: `${widthPct}%`,
                          backgroundColor: '#6B7280',
                        }}
                        className="h-full transition-all duration-300"
                      />
                    </div>
                    <div className="w-20 text-right text-sm font-mono text-wiah-black">{item.referrals.toLocaleString()}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
        <PositiveCallout
          title="Legal framework"
          value="2015"
          unit="Modern Slavery Act &mdash; world-leading legislation now in need of strengthening"
          description="The Modern Slavery Act 2015 was considered world-leading when enacted: it created specific modern slavery offences, required large businesses to publish annual transparency statements, and established the Independent Anti-Slavery Commissioner. Over 17,000 businesses now publish slavery transparency statements. However, the Independent Review of the Act (2019) found key weaknesses: supply chain transparency statements are largely unenforced; the NRM process is slow (average 543 days for a conclusive grounds decision); and victims lose support when their claim is concluded, increasing vulnerability to re-trafficking. The Nationality and Borders Act 2022 tightened the grounds for modern slavery claims for asylum seekers &mdash; criticised by the Commissioner as likely to reduce reporting."
          source="Source: Home Office &mdash; Modern Slavery NRM Statistics Q4 2023; CPS &mdash; Modern Slavery and Trafficking Report 2023."
        />
        </ScrollReveal>
      </main>
    </>
  );
}
