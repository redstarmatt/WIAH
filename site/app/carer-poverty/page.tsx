'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';

// ── Types ─────────────────────────────────────────────────────────────────────

interface AllowancePoint {
  year: number;
  weeklyRate: number;
}

interface CarerNumberPoint {
  year: number;
  millions: number;
}

interface FinancialImpactItem {
  metric: string;
  percent: number;
}

interface CarerPovertyData {
  carersAllowanceTimeSeries: AllowancePoint[];
  unpaidCarerNumbers: CarerNumberPoint[];
  carerFinancialImpact: FinancialImpactItem[];
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function CarerPovertyPage() {
  const [data, setData] = useState<CarerPovertyData | null>(null);

  useEffect(() => {
    fetch('/data/carer-poverty/carer_poverty.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const allowanceSeries: Series[] = data
    ? [
        {
          id: 'carers-allowance',
          label: 'Carers Allowance weekly rate (£)',
          colour: '#E63946',
          data: data.carersAllowanceTimeSeries.map(d => ({
            date: new Date(d.year, 0, 1),
            value: d.weeklyRate,
          })),
        },
      ]
    : [];

  return (
    <>
      <TopicNav topic="Carer Poverty" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Carer Poverty"
          question="What is the financial reality for unpaid carers?"
          finding="Carers Allowance is £76.75 per week — the lowest benefit of its kind in Europe. It is withdrawn if the carer earns over £151 per week, creating a poverty trap. 6.5 million unpaid carers save the state an estimated £162 billion per year."
          colour="#E63946"
        />

        <section className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              There are approximately 6.5 million unpaid carers in the UK — people who provide
              regular, often intensive care for a family member or friend with a disability,
              long-term illness, mental health condition, or age-related need. Carers UK
              estimates that the value of unpaid care is £162 billion per year — more than
              the entire NHS budget. This enormous contribution to the welfare state is
              largely invisible in national accounts and largely unrewarded in the benefits
              system. Carers Allowance — the main benefit for unpaid carers — is £76.75
              per week in 2023/24, the lowest benefit of its kind among comparable European
              welfare states.
            </p>
            <p>
              The earnings trap built into Carers Allowance is a source of acute hardship.
              The benefit is withdrawn entirely if the carer earns above £151 per week
              (after allowable deductions). This creates a cliff edge: carers who want
              to work part-time to supplement their income can earn a maximum of around
              £151 per week without losing the benefit entirely. Many carers are providing
              35 or more hours of care per week, which makes full-time employment impossible
              and the £151 earnings limit both insulting and practically harmful. The 2023
              NAO report on Carers Allowance found significant problems with overpayment
              recovery, where carers who had unknowingly exceeded the earnings limit were
              pursued for years for repayments they could not afford.
            </p>
            <p>
              The financial impact on carers is severe. Carers UK's annual State of Caring
              survey consistently finds that around 35% of carers are in poverty — well
              above the national average of 22%. 55% have reduced their working hours or
              left employment entirely to care, with permanent consequences for earnings,
              pension accumulation, and career progression. 62% have drawn on savings to
              cover care costs or household bills. 36% are in debt as a direct result of
              their caring role. These are not temporary inconveniences: they are
              structural financial injuries that follow carers long after the caring role ends.
            </p>
            <p>
              The mental and physical health toll is inseparable from the financial one.
              Carers who are financially stressed are less able to take breaks, access
              support, and maintain their own health. Carer breakdown — where the primary
              carer can no longer provide care — is a leading cause of emergency hospital
              admissions for the person being cared for, creating acute NHS pressures.
              Investment in carer support is therefore not purely welfare spending: it
              is a cost-effective way of sustaining a care workforce that would otherwise
              need to be replaced at far greater public expense.
            </p>
            <p>
              Reform proposals from Carers UK and the Carers Trust include: raising
              Carers Allowance to at least the level of Jobseekers Allowance; raising
              or removing the earnings limit; introducing a Carer Minimum Income Guarantee;
              and extending Carer's Credit (which protects pension entitlements during
              caring periods) to a wider range of carers. The current government has
              committed to review Carers Allowance following the NAO report, but
              substantive reform has not yet been legislated.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-allowance', label: "Carers Allowance" },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Carers Allowance weekly rate"
              value="£76.75"
              unit="/wk"
              direction="up"
              polarity="up-is-good"
              changeText="Below the Real Living Wage for hours worked · lowest in Europe"
              sparklineData={[53.90, 59.75, 62.70, 66.15, 67.60, 76.75]}
              source="DWP · 2023/24"
            />
            <MetricCard
              label="Carers in poverty"
              value="35"
              unit="%"
              direction="flat"
              polarity="up-is-bad"
              changeText="Poverty rate among full-time carers · vs 22% national average"
              sparklineData={[34, 34, 35, 35, 35]}
              source="Carers UK State of Caring · 2023"
            />
            <MetricCard
              label="Unpaid carers in the UK"
              value="6.5m"
              unit=""
              direction="flat"
              polarity="up-is-good"
              changeText="Saving the state £162bn/yr · 600,000 providing 50+ hours/week"
              sparklineData={[6.0, 6.5, 5.0, 6.5]}
              source="Carers UK / 2021 Census"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div id="sec-allowance" className="mb-12">
            <LineChart
              series={allowanceSeries}
              title="Carers Allowance weekly rate, 2010–2023"
              subtitle="Main benefit for unpaid carers providing 35+ hours of care per week."
              yLabel="£ per week"

              annotations={[
                { date: new Date(2021, 0), label: '2021: pandemic support ended' },
              ]}
            />
            <p className="font-mono text-[11px] text-wiah-mid mt-2">
              Source:{' '}
              <a
                href="https://www.gov.uk/carers-allowance"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-wiah-black"
              >
                DWP — Carers Allowance
              </a>{' '}
              · Annual
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div id="sec-sources" className="border-t border-wiah-border pt-8 mt-8">
            <h2 className="text-base font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
            <ul className="font-mono text-[11px] text-wiah-mid space-y-2">
              <li>
                <a
                  href="https://www.carersuk.org/reports-and-research/state-of-caring"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-wiah-black"
                >
                  Carers UK — State of Caring Survey
                </a>{' '}
                · Annual
              </li>
              <li>
                <a
                  href="https://www.gov.uk/government/collections/carers-allowance"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-wiah-black"
                >
                  DWP — Carers Allowance Statistics
                </a>{' '}
                · Annual
              </li>
              <li>
                <a
                  href="https://commonslibrary.parliament.uk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-wiah-black"
                >
                  House of Commons Library — Carers research
                </a>
              </li>
            </ul>
          </div>
        </ScrollReveal>
      </main>
    </>
  );
}
