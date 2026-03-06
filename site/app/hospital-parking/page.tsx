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

interface RevenuePoint {
  year: number;
  revenueMillion: number;
}

interface TrustsChargingPoint {
  year: number;
  percentChargingQualifyingPatients: number;
}

interface HourlyChargePoint {
  year: number;
  averageChargePounds: number;
}

interface HospitalParkingData {
  national: {
    parkingRevenue: {
      timeSeries: RevenuePoint[];
      latestYear: number;
      latestMillion: number;
      note: string;
    };
    trustsCharging: {
      timeSeries: TrustsChargingPoint[];
      latestYear: number;
      latestPercent: number;
      note: string;
    };
    hourlyCharge: {
      timeSeries: HourlyChargePoint[];
      latestYear: number;
      latestChargePounds: number;
      note: string;
    };
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

// ── Page ─────────────────────────────────────────────────────────────────────

export default function HospitalParkingPage() {
  const [data, setData] = useState<HospitalParkingData | null>(null);

  useEffect(() => {
    fetch('/data/hospital-parking/hospital_parking.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const revenueSeries: Series[] = data
    ? [{
        id: 'revenue',
        label: 'NHS parking revenue (\u00a3m)',
        colour: '#E63946',
        data: data.national.parkingRevenue.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.revenueMillion,
        })),
      }]
    : [];

  const trustsSeries: Series[] = data
    ? [{
        id: 'trusts',
        label: '% trusts still charging qualifying patients',
        colour: '#F4A261',
        data: data.national.trustsCharging.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.percentChargingQualifyingPatients,
        })),
      }]
    : [];

  const chargeSeries: Series[] = data
    ? [{
        id: 'charge',
        label: 'Average hourly charge (\u00a3)',
        colour: '#264653',
        data: data.national.hourlyCharge.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.averageChargePounds,
        })),
      }]
    : [];

  const revenueAnnotations: Annotation[] = [
    { date: new Date(2019, 5, 1), label: '2019: Pledge to provide free parking for qualifying patients' },
    { date: new Date(2020, 5, 1), label: '2020: Free parking during pandemic' },
  ];

  const chargeAnnotations: Annotation[] = [
    { date: new Date(2019, 5, 1), label: '2019: NHS parking pledge — not fully implemented' },
  ];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Hospital Parking" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Hospital Parking Charges"
          question="Is the NHS Charging Patients to Use It?"
          finding="NHS hospital car parks generated £214 million in charges in 2022/23. The 2019 pledge to scrap parking charges for patients with frequent attendance and disabled patients has not been fully implemented."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              NHS hospital car parking charges generated £214 million in revenue in 2022/23, up from £175 million pre-pandemic and continuing to rise as trusts face financial pressure to maximise all income streams. The charges fall disproportionately on people with chronic conditions who attend frequently — the very patients for whom the 2019 government pledge was made. Free parking was meant to be provided for disabled badge holders, people with frequent appointments (defined as more than three visits in 30 days), parents of children who are in-patients, and NHS staff working night shifts. In practice, 80% of trusts are still charging at least some of these qualifying patients.
            </p>
            <p>
              The contrast with the rest of the UK is stark. Scotland, Wales, and Northern Ireland all provide free hospital parking as standard policy, recognising that charging patients to access healthcare is fundamentally inconsistent with the NHS principle of care free at the point of need. In England, average hourly charges have risen to £2.20 — a 22% increase since 2019. A patient attending for chemotherapy three times a week at two hours per visit would face £13.20 per week in parking charges, or nearly £700 per year, from parking alone. The revenue generated flows to trust operating budgets, but critics argue it represents a regressive tax on illness.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-revenue', label: 'Revenue' },
          { id: 'sec-compliance', label: 'Pledge Compliance' },
          { id: 'sec-charges', label: 'Charge Rates' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        {/* Metric cards */}
        <ScrollReveal>
          <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="NHS parking revenue"
              value="£214M"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="2022/23 · Up from £188M pre-pandemic · Trust revenue pressure rising"
              sparklineData={[188, 175, 82, 155, 175, 190, 214]}
              onExpand={() => {}}
            />
            <MetricCard
              label="Trusts still charging qualifying patients"
              value="80%"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Despite 2019 pledge · NHS England compliance checking weak · Definition disputes"
              sparklineData={[78, 74, 76, 78, 80]}
              onExpand={() => {}}
            />
            <MetricCard
              label="Average hourly NHS parking charge"
              value="£2.20"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="+22% since 2019 · Free in Scotland, Wales, Northern Ireland"
              sparklineData={[1.80, 1.85, 1.90, 2.00, 2.10, 2.20]}
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        {/* Charts */}
        <ScrollReveal>
          <section id="sec-revenue" className="mb-12">
            <LineChart
              title="NHS hospital car parking revenue, England, 2018–2024"
              subtitle="Total revenue from hospital car parking charges. 2020 dip reflects free parking introduced during the pandemic, subsequently discontinued. Revenue resuming upward trajectory despite 2019 pledge."
              series={revenueSeries}
              annotations={revenueAnnotations}
              yLabel="\u00a3 millions"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-compliance" className="mb-12">
            <LineChart
              title="NHS trusts charging qualifying patients despite 2019 pledge, 2020–2024"
              subtitle="Percentage of NHS trusts that charge for parking patients who should receive free parking under the 2019 NHS Long Term Plan commitment. Compliance remains poor with no meaningful enforcement mechanism."
              series={trustsSeries}
              annotations={[{ date: new Date(2019, 5, 1), label: '2019: Pledge made' }]}
              yLabel="Percent (%)"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-charges" className="mb-12">
            <LineChart
              title="Average hourly NHS hospital parking charge, England, 2019–2024"
              subtitle="Simple average hourly charge across surveyed NHS hospital car parks in England. Rose 22% in five years. Free in Scotland, Wales and Northern Ireland. Disproportionate impact on patients with chronic conditions."
              series={chargeSeries}
              annotations={chargeAnnotations}
              yLabel="\u00a3 per hour"
            />
          </section>
        </ScrollReveal>

        {/* UK comparison */}
        <ScrollReveal>
          <section className="mb-12">
            <div className="mb-4">
              <h3 className="text-lg font-bold text-wiah-black">Hospital parking policy by UK nation</h3>
              <p className="text-sm text-wiah-mid mt-1">England is the only UK nation that charges the majority of hospital visitors for parking.</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { nation: 'England', status: 'Charges apply', colour: '#E63946' },
                { nation: 'Scotland', status: 'Free', colour: '#2A9D8F' },
                { nation: 'Wales', status: 'Free', colour: '#2A9D8F' },
                { nation: 'Northern Ireland', status: 'Free', colour: '#2A9D8F' },
              ].map((n) => (
                <div key={n.nation} className="border border-wiah-border rounded p-4 text-center">
                  <div className="text-sm font-mono text-wiah-mid mb-1">{n.nation}</div>
                  <div className="text-base font-bold" style={{ color: n.colour }}>{n.status}</div>
                </div>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="What's improving"
            value="Free"
            unit="parking in Scotland, Wales and Northern Ireland"
            description="Scotland, Wales and Northern Ireland all offer free hospital parking to all visitors, demonstrating that free parking is operationally viable within NHS budgets. England extended free parking exemptions to disabled badge holders, frequent outpatients, and overnight-staying relatives in 2019, though implementation remains patchy. Some trusts have introduced capped daily rates for long-stay patients. NHS England is consulting on strengthened compliance requirements for the qualifying patient exemptions."
            source="Source: NHS England Hospital Car Parking Report 2022/23 · NHS England Car Parking Policy Guidance."
          />
        </ScrollReveal>

        {/* Sources */}
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            {data?.metadata.sources.map((src, i) => (
              <div key={i}>
                <a href={src.url} target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">
                  {src.name} — {src.dataset}
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
