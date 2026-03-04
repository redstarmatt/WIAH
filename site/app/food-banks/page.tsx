'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';

interface FoodBanksData {
  national: {
    parcelsDistributed: {
      timeSeries: Array<{ year: number; parcelsMillions: number }>;
      latestYear: number;
      latestMillions: number;
      peakYear: number;
      peakMillions: number;
      childParcelsPct: number;
      note: string;
    };
    foodInsecurity: {
      timeSeries: Array<{ year: number; householdsMillions: number }>;
      latestYear: number;
      latestMillions: number;
      pctHouseholds: number;
      note: string;
    };
    referralReasons: Array<{ reason: string; pct: number }>;
    freeMeals: {
      eligiblePupilsPct: number;
      eligiblePupilsMillions: number;
      universalInfantFSMMillions: number;
      note: string;
    };
  };
  metadata: {
    sources: Array<{ name: string; dataset: string; url: string; frequency: string }>;
    methodology: string;
    knownIssues: string[];
  };
}

function yearToDate(y: number): Date {
  return new Date(y, 6, 1);
}

export default function FoodBanksPage() {
  const [data, setData] = useState<FoodBanksData | null>(null);

  useEffect(() => {
    fetch('/data/food-banks/food_banks.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const parcelsSeries: Series[] = data
    ? [{
        id: 'parcels',
        label: 'Trussell Trust food parcels distributed',
        colour: '#E63946',
        data: data.national.parcelsDistributed.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.parcelsMillions,
        })),
      }]
    : [];

  const parcelsAnnotations: Annotation[] = [
    { date: new Date(2016, 5, 1), label: '2016: Benefits freeze begins' },
    { date: new Date(2020, 5, 1), label: '2020: COVID + UC surge' },
  ];

  return (
    <main>
      <TopicNav topic="Food Banks" />

      <div className="max-w-4xl mx-auto px-6 pt-12">
        <TopicHeader
          topic="Food Banks"
          colour="#E63946"
          question="Why Are So Many People Using Food Banks?"
          finding="The Trussell Trust distributed 3.1 million food parcels in 2023/24 &mdash; more than triple the 2013/14 total. 1.1 million went to children. The independent food bank sector adds a further 30%. 7.2 million UK households experienced food insecurity in 2022/23."
        />
      </div>

      {/* Editorial context */}
      <section id="sec-context" className="max-w-4xl mx-auto px-6 pt-4 pb-0">
        <div className="max-w-2xl text-base text-wiah-black leading-[1.7] space-y-4">
          <p>
            The Trussell Trust distributed 913,000 emergency food parcels in 2013/14. By 2022/23 that figure had reached 3.13 million &mdash; a 242% increase in a decade. The 2023/24 total eased slightly to 2.99 million but remained three times the 2013/14 level; 1.1 million of those parcels went to children. The Trussell Trust operates around 1,300 centres, yet independent food banks &mdash; coordinated through the IFAN network and others &mdash; add an estimated 30&ndash;50% more provision on top. Referral data for 2022/23 shows low income (32%), benefit delays (21%), and benefit changes (18%) as the three leading causes.
          </p>
          <p>
            Two policy shocks drove the sharpest increases. The four-year benefits freeze from 2016 to 2020 eroded the real value of working-age payments and correlated with the largest single-period rise in food bank use. Universal Credit&apos;s five-week initial wait compounded the damage: in 2019, IPPR found 36% of new UC claimants reduced food spending during their first year of claim. Then came the cost-of-living crisis &mdash; food price inflation peaked at 19.1% in March 2023, the fastest rate in 45 years. Low-income households spend proportionally more on food, amplifying the squeeze. By 2022/23, 7.2 million UK households (24%) experienced food insecurity, affecting 4 million children (29% of all children).
          </p>
          <p>
            Government support exists but is fragmented. Free school meals reach 2.1 million children (household income threshold: below &pound;7,400 after tax), while Universal Infant Free School Meals cover a further 1.7 million in reception to Year 2. The Holiday Activities and Food programme, funded at &pound;200 million per year, reached 600,000 children in 2022. The Household Support Fund allocated &pound;421 million to councils in 2023/24 for emergency food and cost-of-living aid. The two-child benefit limit, introduced in 2017, affects an estimated 500,000 families and one million children; the IFS calculates removing it would lift 300,000 children out of poverty. As of March 2026, the Labour government had committed to review the cap but had not acted.
          </p>
          <p>Food bank use is not evenly distributed across the country. The North East and Yorkshire consistently record the highest per-capita referral rates, reflecting entrenched deprivation that predates the current crisis. Within communities, disabled people are roughly twice as likely to need emergency food as the general population, while single-parent households &mdash; overwhelmingly headed by women &mdash; account for a disproportionate share of referrals. Ethnic minority communities are significantly overrepresented, though granular data remains patchy. One of the most striking findings is that a substantial proportion of food bank users are in work: low wages, insecure hours, and the gap between pay dates and Universal Credit payments push working families into crisis. The managed migration of legacy benefit claimants onto UC has triggered localised spikes in food bank demand wherever rollout accelerates, as transitional protection proves inadequate for many households. Private renters are particularly vulnerable, spending on average 31% of gross income on housing before food costs are considered. Local authority Household Support Funds, intended as a safety net, are frequently exhausted by mid-financial year, leaving the final months without discretionary crisis support. There is also a stark spatial relationship between food bank density and deprivation indices: provision clusters where need is greatest, but this means less deprived areas with pockets of hidden poverty are chronically underserved.</p>
          <p>The headline figures on food bank use, while striking, significantly undercount the true scale of food insecurity in the UK. Trussell Trust data covers approximately 1,300 centres, but the Independent Food Aid Network estimates the total sector is 40&ndash;50% larger once independent food banks, community pantries, and faith-based provision are included &mdash; there is no national register and no systematic count. The metric itself is parcels distributed, not unique individuals helped, meaning one person returning three times in a month generates three data points. Referral reasons are self-reported at the point of crisis, introducing both recall bias and social desirability effects. Definitions of food insecurity vary considerably: the UK Food Security Report, the Food Foundation, and the Food Standards Agency all use different thresholds and survey methodologies, producing estimates that range by millions of households depending on which measure is applied. Rural food insecurity is structurally underrepresented because food banks are harder to reach without transport, and shame is a more powerful deterrent in smaller communities. School holiday hunger &mdash; when free school meals cease &mdash; is largely invisible in official statistics despite well-documented qualitative evidence. The causal link between Universal Credit&apos;s five-week wait and food bank use, while consistently reported by frontline organisations and supported by academic research, does not appear in official administrative data because DWP does not track onward referrals to emergency food provision.</p>
        </div>
      </section>

      {/* Metric cards */}
      <section className="max-w-4xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <MetricCard
            label="Trussell Trust food parcels"
            value="3.1M"
            direction="up"
            polarity="up-is-bad"
            changeText="2023/24 · Up from 913K in 2013/14 · Tripled in a decade · 1.1M parcels to children"
            sparklineData={[913, 1085, 1182, 1183, 1330, 1600, 1910, 2173, 2578, 3130, 2990, 3100]}
            onExpand={() => {}}
          />
          <MetricCard
            label="Households in food insecurity"
            value="7.2M"
            direction="up"
            polarity="up-is-bad"
            changeText="2022/23 · 24% of households · Up from 8% in 2019 · Food insecurity defined as inadequate or uncertain access"
            sparklineData={[2.4, 2.6, 3.2, 4.7, 7.2]}
            onExpand={() => {}}
          />
          <MetricCard
            label="Children in food insecurity"
            value="4M"
            direction="up"
            polarity="up-is-bad"
            changeText="2022/23 · 29% of all children · Free school meals: 24.6% of pupils eligible · Up from 15% in 2013"
            sparklineData={[1.4, 1.6, 1.9, 2.7, 4.0]}
            onExpand={() => {}}
          />
        </div>
      </section>

      {/* Chart 1: Parcels trend */}
      <ScrollReveal>
        <section className="max-w-4xl mx-auto px-6 py-12">
          <LineChart
            title="Trussell Trust food parcels distributed, 2013&ndash;2024"
            subtitle="UK financial year (April to March), millions"
            series={parcelsSeries}
            annotations={parcelsAnnotations}
            yLabel="Millions of parcels"
          />
          <p className="mt-4 font-mono text-xs text-wiah-mid">
            Source: Trussell Trust &mdash; End of Year Stats. Updated annually.
          </p>
        </section>
      </ScrollReveal>

      {/* Chart 2: Referral reasons */}
      <ScrollReveal>
        <section className="max-w-4xl mx-auto px-6 py-12">
          <div>
            <h3 className="text-xl font-bold text-wiah-black mb-1">Reasons for referral to Trussell Trust food banks</h3>
            <p className="text-sm text-wiah-mid mb-6">2023/24</p>
            <div className="space-y-3 mb-6">
              {data?.national.referralReasons.map((item) => (
                <div key={item.reason} className="flex items-center gap-3">
                  <div className="flex-1 flex items-center gap-2">
                    <p className="text-sm font-mono min-w-fit">{item.reason}</p>
                    <div className="flex-1 h-5 rounded bg-wiah-light relative overflow-hidden">
                      <div
                        className="h-full bg-wiah-dark transition-all"
                        style={{ width: `${item.pct}%` }}
                      />
                    </div>
                  </div>
                  <p className="font-mono text-sm text-wiah-black min-w-fit">{item.pct}%</p>
                </div>
              ))}
            </div>
            <p className="font-mono text-xs text-wiah-mid">
              Source: Trussell Trust &mdash; End of Year Stats 2023/24.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* Food insecurity context */}
      <ScrollReveal>
        <section className="max-w-4xl mx-auto px-6 py-12 border-t border-wiah-border">
          <div>
            <h3 className="text-lg font-bold text-wiah-black mb-4">Food insecurity in the UK</h3>
            <p className="text-sm text-wiah-mid leading-relaxed mb-4">
              Food insecurity &mdash; defined as inadequate or uncertain access to sufficient, safe, nutritious food &mdash; has doubled since 2019. The UK Food Security Report found that 7.2 million households (24%) experienced food insecurity in 2022/23, affecting 4 million children (29% of all children). This represents a sharp acceleration from 8% of households (2.4M) in 2019, driven by inflation, benefit freezes, and increased cost of living.
            </p>
            <p className="text-sm text-wiah-mid leading-relaxed">
              The Trussell Trust operates around 1,300 food bank centres, but independent food banks (IFAN estimates 2,000+ nationwide) add a further 30% to the sector total. Meanwhile, free school meals eligibility has expanded: 2.1 million pupils (24.6%) are now eligible under Universal Credit thresholds, up from 15% in 2013.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* Positive callout */}
      <ScrollReveal>
        <section className="max-w-4xl mx-auto px-6 py-12">
          <PositiveCallout
            title="Support for hungry children"
            value="2.1M"
            unit="children entitled to free school meals"
            description="The Holiday Activities and Food (HAF) programme, funded at &pound;200 million per year, provides free holiday activities and meals to children eligible for free school meals during Christmas, Easter, and summer holidays &mdash; reaching 600,000 children in 2022. Universal Infant Free School Meals, introduced in 2014, feed 1.7 million children in reception to Year 2 regardless of parental income. The Household Support Fund (HSF) &mdash; &pound;421 million in 2023/24 &mdash; enables councils to provide emergency food vouchers and support to families in crisis."
            source="Source: Trussell Trust &mdash; End of Year Stats 2023/24; DfE &mdash; Schools, pupils and their characteristics 2023."
          />
        </section>
      </ScrollReveal>

      {/* Methodology */}
      <section className="max-w-4xl mx-auto px-6 py-12 border-t border-wiah-border">
        <div>
          <h2 className="text-lg font-bold text-wiah-black mb-3">Methodology</h2>
          <p className="text-sm text-wiah-mid leading-relaxed mb-4">
            {data?.metadata.methodology}
          </p>
          <h3 className="text-base font-bold text-wiah-black mb-2">Known issues</h3>
          <ul className="text-sm text-wiah-mid space-y-1">
            {data?.metadata.knownIssues.map((issue, idx) => (
              <li key={idx} className="leading-relaxed">• {issue}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Sources */}
      <section className="max-w-4xl mx-auto px-6 py-12 border-t border-wiah-border">
        <h2 className="text-lg font-bold text-wiah-black mb-4">Sources</h2>
        <div className="space-y-3">
          {data?.metadata.sources.map((source, idx) => (
            <div key={idx} className="text-sm">
              <p className="font-mono font-bold text-wiah-black">
                <a href={source.url} className="text-wiah-blue hover:underline" target="_blank" rel="noopener noreferrer">
                  {source.name}
                </a>
              </p>
              <p className="text-wiah-mid text-xs">{source.dataset} · {source.frequency}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-wiah-border py-8 px-6 bg-wiah-light">
        <div className="max-w-4xl mx-auto text-center text-sm text-wiah-mid">
          <p className="font-mono text-xs">Open data. No cookies. No agenda.</p>
        </div>
      </footer>
    </main>
  );
}
