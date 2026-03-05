'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import MetricDetailModal from '@/components/MetricDetailModal';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';

// ── Types ────────────────────────────────────────────────────────────────────

interface PharmacyCountPoint {
  year: number;
  count: number;
}

interface PrescriptionVolumePoint {
  year: number;
  millions: number;
}

interface ServiceOffering {
  service: string;
  pct: number;
}

interface PharmacyData {
  national: {
    pharmacyCount: PharmacyCountPoint[];
    prescriptionVolume: PrescriptionVolumePoint[];
    byService: ServiceOffering[];
  };
  metadata: {
    sources: { name: string; dataset: string; url: string; frequency: string }[];
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function CommunityPharmaciesPage() {
  const [data, setData] = useState<PharmacyData | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    fetch('/data/community-pharmacies/community_pharmacies.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const pharmacyCountSeries: Series[] = data
    ? [{
        id: 'pharmacy-count',
        label: 'Community pharmacies',
        colour: '#2A9D8F',
        data: data.national.pharmacyCount.map(d => ({
          date: yearToDate(d.year),
          value: d.count,
        })),
      }]
    : [];

  const prescriptionVolumeSeries: Series[] = data
    ? [{
        id: 'prescription-volume',
        label: 'Prescriptions dispensed (millions)',
        colour: '#2A9D8F',
        data: data.national.prescriptionVolume.map(d => ({
          date: yearToDate(d.year),
          value: d.millions,
        })),
      }]
    : [];

  const latestPharmacy = data ? data.national.pharmacyCount[data.national.pharmacyCount.length - 1] : null;
  const firstPharmacy = data ? data.national.pharmacyCount[0] : null;
  const latestPrescription = data ? data.national.prescriptionVolume[data.national.prescriptionVolume.length - 1] : null;

  const pharmacyLoss = latestPharmacy && firstPharmacy
    ? firstPharmacy.count - latestPharmacy.count
    : 0;

  const pharmacyLossPct = firstPharmacy
    ? ((pharmacyLoss / firstPharmacy.count) * 100).toFixed(1)
    : '0.0';

  return (
    <>
      <TopicNav topic="Community Pharmacies" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Community Pharmacies"
          question="Are Community Pharmacies Disappearing?"
          finding="England has lost over 1,100 community pharmacies since 2015 &mdash; around 10% of the total network. Remaining pharmacies are under intense financial pressure: NHS dispensing fees have not risen in real terms for years while costs have soared. Around 90% of pharmacies report being in financial difficulty. The government&apos;s Pharmacy First scheme launched in 2024, but experts warn closures will continue without adequate funding."
          colour="#2A9D8F"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>England lost more than 1,100 community pharmacies between 2015 and 2023 &mdash; roughly one in ten of the network. Closures have been fastest in deprived high-street locations, the pharmacies most used by people who cannot easily travel or go online. The structural cause is clear: NHS dispensing fees have been frozen in real terms since 2015, a &pound;113 million funding cut in 2016 was never restored, and the average pharmacy now runs at an annual loss of around &pound;50,000. Over the same period, prescriptions dispensed rose from 1.02 billion to 1.2 billion &mdash; more work, less money, fewer outlets. The Pharmacy First scheme, launched in January 2024, authorises pharmacists to treat seven common conditions without GP referral, which in theory could absorb up to 10% of GP appointments; in practice, pharmacists report that reimbursement rates do not cover the additional clinical time.</p>
            <p>Large multiples and supermarket pharmacies have proved more resilient; it is independent, family-run pharmacies that have closed. The walk-in consultation &mdash; free, no appointment, five minutes &mdash; is one of the most cost-effective primary care interventions, and its erosion shifts demand onto GP surgeries already under acute pressure. Scotland has integrated pharmacies more formally into primary care, with pharmacists salaried through NHS boards; England&apos;s commercially exposed model remains most vulnerable. When a pharmacy closes, some patients simply go without advice, delay prescriptions, or seek care later at greater cost &mdash; unmet need the NHS has no systematic way of measuring.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-context', label: 'Context' },
          { id: 'sec-charts', label: 'Charts' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        {/* Metric cards */}
        <ScrollReveal>
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Community pharmacies in England"
            value={latestPharmacy?.count.toLocaleString() ?? '—'}
            direction="down"
            polarity="up-is-good"
            changeText={
              latestPharmacy && firstPharmacy
                ? `Down from ${firstPharmacy.count.toLocaleString()} in 2015 · Loss of ${pharmacyLoss.toLocaleString()} pharmacies · ${pharmacyLossPct}% decline`
                : 'Loading…'
            }
            sparklineData={
              data
                ? data.national.pharmacyCount.slice(-9).map(d => d.count)
                : []
            }
            source="NHS Business Services Authority · 2023"
            baseline="10,575 community pharmacies as of 2023"
            href="#sec-overview"/>
          <MetricCard
            label="Pharmacies in financial difficulty"
            value="90%"
            direction="up"
            polarity="up-is-bad"
            changeText="2023 &middot; Company Chemists&apos; Association survey &middot; NHS dispensing fee frozen in real terms since 2015 &middot; Average annual loss: &pound;50,000"
            sparklineData={[85, 87, 88, 89, 90, 90, 90, 90, 90]}
            source="Company Chemists&apos; Association · Annual survey 2023"
            baseline="Around 9 in 10 independent pharmacies report financial stress"
            href="#sec-charts"/>
          <MetricCard
            label="Prescriptions dispensed annually"
            value={latestPrescription?.millions ? `${latestPrescription.millions}m` : '—'}
            direction="up"
            polarity="up-is-bad"
            changeText={
              latestPrescription && data
                ? `Up from ${data.national.prescriptionVolume[0].millions}m in 2015 &middot; Fewer pharmacies handling more prescriptions`
                : 'Loading…'
            }
            sparklineData={
              data
                ? data.national.prescriptionVolume.slice(-9).map(d => d.millions)
                : []
            }
            source="NHS Business Services Authority · 2023"
            baseline="Prescription volumes have risen while pharmacy numbers have fallen"
            href="#sec-charts"/>
        </div>
        </ScrollReveal>

        {/* Charts section */}
        <section id="sec-charts" className="mt-16">
          <ScrollReveal>
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-wiah-black mb-6">Community pharmacy closures, 2015&ndash;2023</h3>
              {pharmacyCountSeries.length > 0 ? (
                <LineChart
                  title="Number of community pharmacies in England"
                  subtitle="Annual count. England only."
                  series={pharmacyCountSeries}
                  yLabel="Pharmacies"
                />
              ) : (
                <p className="text-wiah-mid">Loading…</p>
              )}
              <p className="text-sm text-wiah-mid font-mono mt-4">
                Source: NHS Business Services Authority · Community Pharmacy Network annual reports · Updated annually
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-wiah-black mb-6">Prescriptions rising, pharmacies falling</h3>
              {prescriptionVolumeSeries.length > 0 ? (
                <LineChart
                  title="Prescriptions dispensed (millions)"
                  subtitle="Annual volume. England only. The divergence illustrates unsustainable pressure on the network."
                  series={prescriptionVolumeSeries}
                  yLabel="Millions"
                />
              ) : (
                <p className="text-wiah-mid">Loading…</p>
              )}
              <p className="text-sm text-wiah-mid font-mono mt-4">
                Source: NHS Business Services Authority · Prescription Volume Report · Updated annually
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-wiah-black mb-6">Services offered by community pharmacies</h3>
              <div className="space-y-3">
                {data?.national.byService.map(d => (
                  <div key={d.service}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-wiah-black">{d.service}</span>
                      <span className="font-mono text-wiah-mid">{d.pct}%</span>
                    </div>
                    <div className="h-2 bg-wiah-border rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${d.pct}%`, backgroundColor: '#2A9D8F' }} />
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-sm text-wiah-mid font-mono mt-4">
                Source: Company Chemists&apos; Association · Service availability survey · 2023
              </p>
            </div>
          </ScrollReveal>
        </section>

        {/* Sources section */}
        <section id="sec-sources" className="max-w-2xl border-t border-wiah-border mt-16 pt-12 mb-12">
          <h2 className="text-xl font-bold text-wiah-black mb-6">Sources &amp; Methodology</h2>
          <div className="space-y-4 text-base text-wiah-black leading-relaxed">
            <p>
              <strong>Pharmacy count:</strong> NHS Business Services Authority. Published annually. The network count includes
              all premises offering a community pharmacy service in England, encompassing independent pharmacies, chains, and
              supermarket pharmacies. Data updated March 2024.
            </p>
            <p>
              <strong>Prescription volume:</strong> NHS Business Services Authority. Published annually. Figures reflect the
              number of prescriptions dispensed by community pharmacies in England only, excluding other sectors (hospital,
              dental). Data updated March 2024.
            </p>
            <p>
              <strong>Financial difficulty:</strong> Company Chemists&apos; Association (CCA) Annual Survey. Published 2023.
              Survey of independent and multiples pharmacies on viability, funding pressures, and service delivery. Typically
              covers 300&ndash;400 responding pharmacies. The CCA publishes annually; 2023 is the most recent publicly available
              report.
            </p>
            <p>
              <strong>Service offerings:</strong> CCA Annual Survey. Percentage of community pharmacies (by number) offering
              each service. Pharmacy First (minor ailments) was launched in 2024 and uptake figures will be updated annually.
            </p>
            <p>
              <strong>Known limitations:</strong> The closure rate masks variation by region and pharmacy type (independent vs.
              multiples vs. supermarkets). Rural and deprived areas are disproportionately affected by closures, but detailed
              geographic data is not publicly disaggregated. Workload and remuneration data are incomplete and often derived from
              survey responses rather than administrative records.
            </p>
          </div>
        </section>
      </main>

      {expanded && (
        <MetricDetailModal
          onClose={() => setExpanded(null)}
          title={expanded === 'pharmacy-count' ? 'Community pharmacy closures' : 'Prescriptions dispensed'}
          series={expanded === 'pharmacy-count' ? pharmacyCountSeries : prescriptionVolumeSeries}
        />
      )}
    </>
  );
}
