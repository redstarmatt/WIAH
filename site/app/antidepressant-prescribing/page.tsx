'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

// ── Types ────────────────────────────────────────────────────────────────────

interface PrescriptionPoint {
  year: number;
  items: number;
}

interface PatientPoint {
  year: number;
  count: number;
}

interface CostPoint {
  year: number;
  cost: number;
}

interface RegionData {
  region: string;
  itemsPer1000: number;
}

interface AntidepressantData {
  prescriptions: PrescriptionPoint[];
  patients: PatientPoint[];
  costMillions: CostPoint[];
  byRegion: RegionData[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

function sparkFrom(arr: number[], n = 10) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function AntidepressantPrescribingPage() {
  const [data, setData] = useState<AntidepressantData | null>(null);

  useEffect(() => {
    fetch('/data/antidepressant-prescribing/antidepressant_prescribing.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const prescriptionSeries: Series[] = data
    ? [{
        id: 'prescriptions',
        label: 'Prescription items dispensed',
        colour: '#264653',
        data: data.prescriptions.map(d => ({
          date: yearToDate(d.year),
          value: d.items,
        })),
      }]
    : [];

  const patientSeries: Series[] = data
    ? [{
        id: 'patients',
        label: 'Patients on antidepressants',
        colour: '#264653',
        data: data.patients.map(d => ({
          date: yearToDate(d.year),
          value: d.count,
        })),
      }]
    : [];

  const costSeries: Series[] = data
    ? [{
        id: 'cost',
        label: 'Annual cost (millions)',
        colour: '#6B7280',
        data: data.costMillions.map(d => ({
          date: yearToDate(d.year),
          value: d.cost,
        })),
      }]
    : [];

  const latestPrescriptions = data?.prescriptions[data.prescriptions.length - 1];
  const firstPrescriptions = data?.prescriptions[0];
  const latestPatients = data?.patients[data.patients.length - 1];
  const firstPatients = data?.patients[0];
  const latestCost = data?.costMillions[data.costMillions.length - 1];

  const prescriptionGrowth = latestPrescriptions && firstPrescriptions
    ? Math.round(((latestPrescriptions.items - firstPrescriptions.items) / firstPrescriptions.items) * 100)
    : 147;

  const patientGrowth = latestPatients && firstPatients
    ? Math.round(((latestPatients.count - firstPatients.count) / firstPatients.count) * 100)
    : 102;

  return (
    <>
      <TopicNav topic="Mental Health" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Mental Health"
          question="Are we medicating a crisis?"
          finding="One in six adults in England is now prescribed an antidepressant. The number of prescription items has risen from 36 million in 2008 to 89 million in 2024 — a 147% increase — while access to talking therapies remains limited, particularly in deprived areas where prescribing rates are twice the national average."
          colour="#264653"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              Antidepressant prescribing in England has more than doubled since 2008. Around 8.3 million people — roughly one in six adults — now receive at least one antidepressant prescription per year. The total number of items dispensed reached 89 million in 2023/24, making antidepressants one of the most commonly prescribed drug classes in the country, behind only statins and blood pressure medication. This growth has been steady and unbroken: there is no single year in the past sixteen in which prescribing fell. The pandemic accelerated an existing trend rather than creating a new one, with items rising 3.8% in 2020/21 alone as GP practices shifted to remote consultations and referral pathways into talking therapies were disrupted.
            </p>
            <p>
              The NICE stepped care model recommends that mild to moderate depression should first be treated with guided self-help, cognitive behavioural therapy, or structured exercise — with antidepressants reserved for moderate to severe cases or where psychological interventions have not worked. In practice, the model is inverted. NHS Talking Therapies (formerly IAPT) treated 1.2 million people in 2023/24, but average waits exceeded six weeks in many areas and completion rates remained below 50%. For a GP with a ten-minute appointment slot and a distressed patient, a prescription is often the only intervention immediately available. Once started, antidepressants are difficult to stop: NICE published its first dedicated deprescribing guidance in 2022, acknowledging that withdrawal symptoms had been systematically underestimated for decades. An estimated 40% of long-term users could safely taper with support, but structured deprescribing programmes remain rare.
            </p>
            <p>
              Regional variation is stark. The North East dispenses 198 antidepressant items per 1,000 population — nearly twice the rate of London at 104. This mirrors the geography of deprivation, poor health outcomes, and limited access to alternatives. Areas with the highest prescribing rates tend to have the fewest therapists per capita, the longest waits for talking therapy, and the greatest burden of chronic pain, unemployment, and social isolation — all independent drivers of prescribing. Social prescribing — linking patients with community activities, debt advice, and employment support — is expanding, with over 3,400 link workers now in post across England, but the evidence base for its impact on antidepressant prescribing specifically remains thin. The question is not whether antidepressants work — for many people they are essential — but whether a health system that prescribes 89 million items a year is treating the right problem.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-prescriptions', label: 'Prescriptions' },
          { id: 'sec-patients', label: 'Patients' },
          { id: 'sec-cost', label: 'Cost' },
          { id: 'sec-regional', label: 'Regional' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Antidepressant prescriptions"
            value={latestPrescriptions ? `${Math.round(latestPrescriptions.items / 1000000)}m` : '89m'}
            unit="items, 2023/24"
            direction="up"
            polarity="neutral"
            changeText={`+${prescriptionGrowth}% since 2008 · up from 36m`}
            sparklineData={
              data ? sparkFrom(data.prescriptions.map(d => d.items)) : []
            }
            source="NHS BSA · Prescription Cost Analysis, 2023/24"
            href="#sec-prescriptions"
          />
          <MetricCard
            label="People on antidepressants"
            value={latestPatients ? `${(latestPatients.count / 1000000).toFixed(1)}m` : '8.3m'}
            unit="patients, 2023/24"
            direction="up"
            polarity="neutral"
            changeText={`+${patientGrowth}% since 2008 · 1 in 6 adults`}
            sparklineData={
              data ? sparkFrom(data.patients.map(d => d.count)) : []
            }
            source="NHS Digital · Medicines Used in Mental Health, 2023/24"
            href="#sec-patients"
          />
          <MetricCard
            label="Annual prescribing cost"
            value={latestCost ? `£${latestCost.cost}m` : '£342m'}
            unit="2023/24"
            direction="up"
            polarity="neutral"
            changeText="Up from £265m in 2008 · generics reduced unit cost"
            sparklineData={
              data ? sparkFrom(data.costMillions.map(d => d.cost)) : []
            }
            source="NHS BSA · Prescription Cost Analysis, 2023/24"
            href="#sec-cost"
          />
        </div>

        {/* Chart 1: Prescription items over time */}
        <ScrollReveal>
          <div id="sec-prescriptions" className="mb-12">
            <LineChart
              series={prescriptionSeries}
              title="Antidepressant prescription items dispensed, England, 2008–2024"
              subtitle="Total items dispensed per year. Growth has been continuous — no single year of decline in sixteen years."
              yLabel="Items"
              source={{
                name: 'NHS BSA',
                dataset: 'Prescription Cost Analysis',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 2: Patients on antidepressants */}
        <ScrollReveal>
          <div id="sec-patients" className="mb-12">
            <LineChart
              series={patientSeries}
              title="Number of patients receiving antidepressants, England, 2008–2024"
              subtitle="Individuals with at least one antidepressant prescription per year. Now 1 in 6 adults."
              yLabel="Patients"
              source={{
                name: 'NHS Digital',
                dataset: 'Medicines Used in Mental Health',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 3: Cost */}
        <ScrollReveal>
          <div id="sec-cost" className="mb-12">
            <LineChart
              series={costSeries}
              title="Annual NHS cost of antidepressant prescribing, England, 2008–2024"
              subtitle="Total net ingredient cost. Fell 2009–2013 as patents expired, then rose with volume."
              yLabel="Cost (£m)"
              source={{
                name: 'NHS BSA',
                dataset: 'Prescription Cost Analysis',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Regional variation bar chart */}
        <ScrollReveal>
          <div id="sec-regional" className="mb-12">
            <div className="bg-white rounded-lg border border-wiah-border p-8">
              <h2 className="text-lg font-bold text-wiah-black mb-2">
                Antidepressant prescribing rate by region (items per 1,000 population)
              </h2>
              <p className="text-sm text-wiah-mid mb-6">
                The North East prescribes nearly twice the rate of London, mirroring deprivation and limited therapy access.
              </p>
              <div className="mt-6 space-y-4">
                {data?.byRegion.map((r) => {
                  const pct = (r.itemsPer1000 / 220) * 100;
                  return (
                    <div key={r.region}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-wiah-black">{r.region}</span>
                        <span className="font-mono text-sm font-bold text-wiah-black">{r.itemsPer1000}</span>
                      </div>
                      <div className="h-6 bg-wiah-light rounded-sm overflow-hidden">
                        <div
                          className="h-full rounded-sm transition-all"
                          style={{ width: `${pct}%`, backgroundColor: '#264653' }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="font-mono text-xs text-wiah-mid mt-4">Source: NHS BSA — Prescription Cost Analysis by Sub-ICB, 2023/24</p>
            </div>
          </div>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="NICE deprescribing guidance and social prescribing expansion"
            value="3,400 link workers"
            description="NICE published its first dedicated deprescribing guidance for antidepressants in 2022, acknowledging that withdrawal symptoms had been systematically underestimated and recommending structured, gradual dose reductions with clinical support. An estimated 40% of long-term antidepressant users could safely taper with appropriate guidance. Alongside this, NHS England has embedded over 3,400 social prescribing link workers in primary care networks across England, connecting patients with community activities, debt advice, employment support, and structured exercise programmes — addressing some of the social drivers that lead to prescribing in the first place. Early evidence from pilot areas suggests social prescribing can reduce GP appointments by 28% for participating patients, though its direct impact on antidepressant prescribing rates is still being evaluated."
            source="Source: NICE — Medicines associated with dependence or withdrawal symptoms, 2022. NHS England — Social Prescribing Link Workers, 2024."
          />
        </ScrollReveal>
        <RelatedTopics />
      </main>
    </>
  );
}
