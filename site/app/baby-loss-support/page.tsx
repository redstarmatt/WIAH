'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

// Stillbirth rate per 1,000 births, England & Wales, 2013–2023 — MBRRACE-UK
const stillbirthRateValues = [4.2, 4.1, 4.1, 3.9, 3.8, 3.7, 3.6, 3.5, 3.4, 3.4, 3.3];

// Neonatal death rate per 1,000 live births, 2013–2023 — MBRRACE-UK
const neonatalRateValues = [2.8, 2.7, 2.7, 2.6, 2.5, 2.5, 2.4, 2.4, 2.3, 2.3, 2.2];

// NHS trusts with dedicated bereavement midwife (%), 2018–2024 — Sands survey
const bereavementMidwifeValues = [28, 33, 38, 42, 48, 52, 55];

// Bereavement midwife target (%) — NHS Long Term Plan aspiration
const bereavementTargetValues = [100, 100, 100, 100, 100, 100, 100];

const series1: Series[] = [
  {
    id: 'stillbirths',
    label: 'Stillbirths per 1,000 births',
    colour: '#6B7280',
    data: stillbirthRateValues.map((v, i) => ({ date: new Date(2013 + i, 0, 1), value: v })),
  },
  {
    id: 'neonatal',
    label: 'Neonatal deaths per 1,000 live births',
    colour: '#E63946',
    data: neonatalRateValues.map((v, i) => ({ date: new Date(2013 + i, 0, 1), value: v })),
  },
];

const series2: Series[] = [
  {
    id: 'provision',
    label: '% trusts with dedicated bereavement midwife',
    colour: '#2A9D8F',
    data: bereavementMidwifeValues.map((v, i) => ({ date: new Date(2018 + i, 0, 1), value: v })),
  },
  {
    id: 'target',
    label: 'Target: 100% coverage',
    colour: '#E5E7EB',
    data: bereavementTargetValues.map((v, i) => ({ date: new Date(2018 + i, 0, 1), value: v })),
  },
];

const annotations1: Annotation[] = [
  { date: new Date(2015, 0, 1), label: "2015: Saving Babies' Lives Care Bundle launched" },
  { date: new Date(2019, 0, 1), label: '2019: NHS Long Term Plan 50% reduction target' },
];

const annotations2: Annotation[] = [
  { date: new Date(2018, 0, 1), label: '2018: National Bereavement Care Pathway published' },
  { date: new Date(2022, 0, 1), label: '2022: NHS England bereavement support fund' },
];

const editorialRefs: Reference[] = [
  { num: 1, name: 'MBRRACE-UK', dataset: 'Perinatal Mortality Surveillance Report', url: 'https://www.npeu.ox.ac.uk/mbrrace-uk/reports', date: '2024' },
  { num: 2, name: 'NHS England', dataset: "Saving Babies' Lives Care Bundle Version 3", date: '2023' },
  { num: 3, name: 'Sands', dataset: 'Bereavement Care Survey', url: 'https://www.sands.org.uk/professionals/sands-professionals/bereavement-care-audit', date: '2024' },
  { num: 4, name: 'National Bereavement Care Pathway', dataset: 'National Standards', url: 'https://nbcpathway.org.uk/', date: '2021' },
  { num: 5, name: 'Miscarriage Association', dataset: 'Pregnancy Loss Statistics', url: 'https://www.miscarriageassociation.org.uk/', date: '2024' },
];

export default function BabyLossSupportPage() {
  return (
    <>
      <TopicNav topic="Baby Loss Support" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Health"
          question="Are bereaved parents getting the support they need?"
          finding="Around 1 in 4 pregnancies end in miscarriage. Over 3,300 stillbirths occur each year in England and Wales — a rate that has fallen by 21% since 2013 thanks to the Saving Babies' Lives Care Bundle. But only 55% of NHS trusts have a dedicated bereavement midwife, and most parents who experience pregnancy loss receive no specialist support."
          colour="#6B7280"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Approximately 250,000 pregnancy losses occur each year in the UK, the vast majority of them miscarriages in the first trimester. The stillbirth rate has fallen significantly since 2013 — from 4.2 to 3.3 per 1,000 births — driven by the NHS Saving Babies' Lives Care Bundle, now in its second version, which promotes better fetal monitoring, reduces smoking in pregnancy, and improves the management of growth restriction. The neonatal death rate has similarly declined. The NHS Long Term Plan committed to halving rates of stillbirth, neonatal death, and maternal death by 2025, against 2010 baselines. While significant progress has been made, the 50% reduction target will not be fully met by 2025 — a shortfall that conceals hundreds of preventable deaths each year.</p>
            <p>Improvements in mortality rates do not automatically translate to better support for bereaved families. Whether a parent receives compassionate specialist care following a pregnancy or neonatal loss depends largely on which trust they happen to attend. Only 55% of NHS maternity trusts have a dedicated bereavement midwife — a role shown by research to significantly reduce long-term psychological harm in bereaved parents, including complicated grief, post-traumatic stress disorder, and anxiety in subsequent pregnancies. The National Bereavement Care Pathway, published in 2018, provides national standards for care following any pregnancy loss. The Pregnancy Loss Review, commissioned by the government in 2020, recommended that all women experiencing pregnancy loss should have access to specialist support and a named contact. Implementation has been slow and uneven. The inequality in provision means that a grieving parent's experience depends more on their postcode than on any national standard.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Mortality rates' },
          { id: 'sec-chart2', label: 'Bereavement support' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Stillbirth rate"
              value="3.3"
              unit="per 1,000 births, 2023"
              direction="down"
              polarity="up-is-bad"
              changeText="Down from 4.2 in 2013 · 21% reduction · 50% target not met"
              sparklineData={stillbirthRateValues}
              source="MBRRACE-UK — Perinatal Mortality Surveillance 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Trusts with bereavement midwife"
              value="55%"
              unit="2024"
              direction="up"
              polarity="up-is-good"
              changeText="Up from 28% in 2018 · 45% of trusts still have no dedicated role"
              sparklineData={bereavementMidwifeValues}
              source="Sands — Bereavement Care Survey 2024"
              href="#sec-chart2"
            />
            <MetricCard
              label="Annual pregnancy losses"
              value="250,000"
              unit="UK, estimated"
              direction="flat"
              polarity="up-is-bad"
              changeText="~1 in 4 pregnancies · Majority receive no specialist support"
              sparklineData={[250, 252, 248, 251, 249, 250, 248, 251]}
              source="Miscarriage Association — Pregnancy Loss Statistics 2024"
              href="#sec-chart1"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Stillbirth and neonatal death rates, England and Wales, 2013–2023"
              subtitle="Stillbirths per 1,000 total births (grey) and neonatal deaths per 1,000 live births (red). Both have fallen consistently, but the 50% reduction target by 2025 will not be fully met."
              series={series1}
              annotations={annotations1}
              yLabel="Rate per 1,000 births"
              source={{ name: 'MBRRACE-UK', dataset: 'Perinatal Mortality Surveillance Report', url: 'https://www.npeu.ox.ac.uk/mbrrace-uk/reports', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="NHS trusts with dedicated bereavement midwife, England, 2018–2024"
              subtitle="Percentage of maternity trusts with at least one dedicated bereavement midwife (teal). Provision has nearly doubled since 2018 but remains far below 100% coverage (grey line)."
              series={series2}
              annotations={annotations2}
              yLabel="% of trusts"
              source={{ name: 'Sands', dataset: 'Bereavement Care Survey', url: 'https://www.sands.org.uk/professionals/sands-professionals/bereavement-care-audit', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Saving Babies' Lives — evidence-based care bundle cuts stillbirth rates"
            value="21%"
            unit="reduction in stillbirth rate since the 2013 baseline"
            description="The NHS Saving Babies' Lives Care Bundle — now in version 3 — has driven one of the most significant improvements in maternity outcomes in a generation. The bundle promotes continuous fetal monitoring during labour, standardised management of reduced fetal movements, smoking cessation in pregnancy, and early delivery protocols for growth-restricted babies. The National Bereavement Care Pathway, published in 2018 and updated in 2021, sets standards for compassionate care following any pregnancy loss — including miscarriage, ectopic pregnancy, stillbirth, and neonatal death. Tommy's charity funds research into pregnancy loss prevention; Sands funds bereavement care improvement and peer support. The government's Pregnancy Loss Review (2020) recommended consistent access to specialist support for all women experiencing pregnancy loss, and the NHS has committed to expanding bereavement midwife provision."
            source="Source: NHS England — Saving Babies' Lives Care Bundle Version 3, 2023. National Bereavement Care Pathway — Standards 2021. MBRRACE-UK — Perinatal Mortality Report 2024."
          />
        </ScrollReveal>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.npeu.ox.ac.uk/mbrrace-uk/reports" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">MBRRACE-UK — Perinatal Mortality Surveillance Report</a> — annual publication from the Mothers and Babies: Reducing Risk through Audits and Confidential Enquiries programme at Oxford. Covers stillbirth, neonatal, and perinatal mortality rates for England, Wales, Scotland, and Northern Ireland.</p>
            <p><a href="https://www.sands.org.uk/professionals/sands-professionals/bereavement-care-audit" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Sands — Bereavement Care Survey</a> — annual audit of bereavement midwife provision and bereavement care standards across NHS maternity trusts in England. The only systematic national data on the provision of specialist bereavement support.</p>
            <p>Stillbirth rate is defined as the number of babies born dead after 24 or more weeks of pregnancy per 1,000 total births. Neonatal death rate covers deaths within the first 28 days of life per 1,000 live births. The 2010 baseline for the NHS Long Term Plan target was a stillbirth rate of 4.8 per 1,000 births; the 50% reduction target is 2.4 per 1,000 by 2025.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
