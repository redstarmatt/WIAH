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

interface ReferralsPoint {
  year: number;
  count: number;
}

interface ChildrenInCarePoint {
  year: number;
  count: number;
}

interface AbuseCategoryPoint {
  category: string;
  pct: number;
}

interface ChildProtectionData {
  topic: string;
  national: {
    referrals: ReferralsPoint[];
    childrenInCare: ChildrenInCarePoint[];
    byAbuseCategory: AbuseCategoryPoint[];
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

// ── Component ────────────────────────────────────────────────────────────────

export default function ChildProtectionPage() {
  const [data, setData] = useState<ChildProtectionData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data/child-protection/child_protection.json')
      .then((res) => res.json())
      .then((json: ChildProtectionData) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load child protection data:', err);
        setLoading(false);
      });
  }, []);

  if (loading || !data) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  // ── Series ────────────────────────────────────────────────────────────────

  const referralsSeries: Series[] = [
    {
      id: 'referrals',
      label: 'Referrals (thousands)',
      colour: '#E63946',
      data: data.national.referrals.map((p) => ({
        date: yearToDate(p.year),
        value: p.count / 1000,
      })),
    },
  ];

  const childrenInCareSeries: Series[] = [
    {
      id: 'children-in-care',
      label: 'Children in care (thousands)',
      colour: '#E63946',
      data: data.national.childrenInCare.map((p) => ({
        date: yearToDate(p.year),
        value: p.count / 1000,
      })),
    },
  ];

  return (
    <main>
      <TopicNav topic="Child Protection" />

      <TopicHeader
        topic="Child Protection"
        question="Are children being protected?"
        finding="Child protection referrals have reached record levels while the social worker workforce is stretched to breaking point &mdash; leading to missed warning signs and preventable child deaths."
        colour="#E63946"
      />

      {/* Metric Cards */}
      <section className="max-w-4xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <ScrollReveal>
            <MetricCard
              label="Child protection referrals (England)"
              value="714K"
              unit="/yr"
              direction="up"
              polarity="up-is-bad"
              changeText="Up 37% since 2011/12"
              sparklineData={[521, 545, 570, 590, 604, 630, 640, 655, 670, 690, 714]}
              href="#sec-positive"
            />
          </ScrollReveal>

          <ScrollReveal>
            <MetricCard
              label="Children on child protection plans"
              value="52K"
              direction="up"
              polarity="up-is-bad"
              changeText="Rate of 46 per 10,000"
              sparklineData={[38, 40, 42, 45, 47, 48, 50, 51, 52]}
              href="#sec-positive"
            />
          </ScrollReveal>

          <ScrollReveal>
            <MetricCard
              label="Children in care (looked-after children)"
              value="83,840"
              direction="up"
              polarity="up-is-bad"
              changeText="Up 24% since 2011; record high"
              sparklineData={[65.5, 66.5, 68.1, 69.5, 72.7, 78.2, 80.1, 82.2, 83.8]}
              href="#sec-positive"
            />
          </ScrollReveal>
        </div>
      </section>

      {/* Charts */}
      <section id="sec-context" className="max-w-2xl mt-4 mb-12">
        <div className="text-base text-wiah-black leading-[1.7] space-y-4">
          <p>England&apos;s child protection system is carrying a load it was not designed for. In 2022, local authorities received 714,000 referrals to children&apos;s social care &mdash; up 37% since 2011/12. At the same moment, 83,840 children were in local authority care, a record high and 24% more than a decade ago; a further 52,000 were on child protection plans. These numbers have risen in almost every year since 2008. They do not describe a system in crisis at the margins. They describe structural overload at the centre.</p>
          <p>The workforce cannot absorb this demand. There are around 32,000 social workers in children&apos;s services in England, but the vacancy rate stands at approximately 21% &mdash; one post in five is unfilled. Average caseloads have risen from 13 to 19 cases per worker. The gap is filled by agency staff, at significantly higher cost to already stretched council budgets. Turnover runs at 16% per year, eroding the continuity of relationship that effective child protection depends on. The consequences are visible in the record of serious case reviews: Arthur Labinjo-Hughes and Star Hobson, both murdered in 2020 by family members, had multiple prior contacts with social services. The Child Safeguarding Practice Review Panel reviewed 256 serious incidents in 2022/23 alone.</p>
            </div>
      </section>

      {/* Positive Callout */}
      <section id="sec-positive" className="max-w-4xl mx-auto px-6 py-12">
        <PositiveCallout
          title="Family hubs expanding early support"
          value="75"
          unit="local authorities by 2025"
          description="The government&apos;s Family Hubs programme, funded from 2022, is establishing multi-agency support centres in 75 local authorities by 2025, modelled on Sure Start children&apos;s centres. Evidence from the original Sure Start programme showed reductions in abuse and neglect, improved school readiness, and lower juvenile offending in areas with centres."
          source="Source: Department for Education &mdash; Family Hubs funding rollout, 2022–2025."
        />
      </section>

      {/* Sources */}
      <section id="sec-charts" className="max-w-5xl mx-auto px-6 py-16 space-y-20">
        <ScrollReveal>
          <LineChart
            title="Child protection referrals, England, 2011–2022"
            subtitle="Annual referrals to children&apos;s social care. DfE Children in Need census."
            series={referralsSeries}
            yLabel="Referrals (thousands)"
            source={{
              name: 'Department for Education',
              dataset: 'Children in Need census',
              frequency: 'annual',
              url: 'https://www.gov.uk/government/collections/statistics-children-in-need',
            }}
          />
        </ScrollReveal>

        <ScrollReveal>
          <LineChart
            title="Children in local authority care (looked after), England, 2011–2022"
            subtitle="Children in foster care, residential care, and other placements. Annual snapshot."
            series={childrenInCareSeries}
            yLabel="Children in care (thousands)"
            source={{
              name: 'Department for Education',
              dataset: 'Looked-after children statistics',
              frequency: 'annual',
              url: 'https://www.gov.uk/government/collections/statistics-looked-after-children',
            }}
          />
        </ScrollReveal>

        <ScrollReveal>
          <div className="w-full">
            <h3 className="font-bold text-wiah-black text-lg mb-2">Children on child protection plans, by abuse category</h3>
            <p className="text-sm text-wiah-mid mb-6">Primary reason for child protection plan (multiple forms of abuse may apply).</p>
            <div className="space-y-4">
              {data.national.byAbuseCategory.map((item, idx) => {
                const widthPercent = (item.pct / 52) * 100;
                return (
                  <div key={idx}>
                    <div className="flex justify-between items-baseline mb-1">
                      <span className="text-sm font-semibold text-wiah-black">{item.category}</span>
                      <span className="text-sm font-mono font-bold text-wiah-black">{item.pct}%</span>
                    </div>
                    <div className="h-3 bg-wiah-light rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{ width: `${widthPercent}%`, backgroundColor: '#E63946' }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="text-xs text-wiah-mid font-mono mt-6">
              Source: Department for Education &mdash; Looked-after children statistics. Updated annually.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* Context */}
      <section id="sec-sources" className="max-w-4xl mx-auto px-6 py-16 border-t border-wiah-border">
        <h3 className="font-bold text-wiah-black mb-6">Sources and methodology</h3>
        <div className="space-y-4 text-sm text-wiah-mid font-mono">
          {data.metadata.sources.map((src, idx) => (
            <div key={idx}>
              <p className="font-bold text-wiah-black">{src.name}</p>
              <p>
                <a
                  href={src.url}
                  className="text-wiah-blue hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {src.dataset}
                </a>
              </p>
              <p>Updated {src.frequency}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 space-y-4 text-sm text-wiah-mid">
          <div>
            <p className="font-bold text-wiah-black mb-2">Methodology</p>
            <p>{data.metadata.methodology}</p>
          </div>

          <div>
            <p className="font-bold text-wiah-black mb-2">Known issues</p>
            <ul className="list-disc list-inside space-y-1">
              {data.metadata.knownIssues.map((issue, idx) => (
                <li key={idx}>{issue}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <SectionNav sections={[
        { id: 'sec-context', label: 'Context' },

        { id: 'sec-charts', label: 'Charts' },
        { id: 'sec-positive', label: 'What&apos;s improving' },
        { id: 'sec-sources', label: 'Sources' },
      ]} />
    </main>
  );
}
