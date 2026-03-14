'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import PositiveCallout from '@/components/PositiveCallout';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'ONS', dataset: 'Police Recorded Crime', url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/crimeandjustice', date: '2024', note: '68,400 rape offences recorded in 2024 — double the figure from a decade earlier' },
  { num: 2, name: 'CPS', dataset: 'Violence Against Women and Girls Annual Report', url: 'https://www.cps.gov.uk/publication/violence-against-women-and-girls-report', date: '2024', note: 'Charge rate collapsed from 7.5% in 2015 to 1.4% in 2019; partial recovery to 5.3% in 2024' },
  { num: 3, name: 'Home Office', dataset: 'Rape Review Action Plan', url: 'https://www.gov.uk/government/publications/rape-review-action-plan', date: '2024', note: 'Operation Soteria rolled out to 28 police forces; committed to restoring charge volumes to 2016 levels' },
  { num: 4, name: 'CSEW', dataset: 'Crime Survey for England and Wales', date: '2024', note: 'Estimated 128,000 rapes and attempted rapes per year; fewer than 55% reported to police' },
];

export default function RapeProsecutionPage() {
  const colour = '#E63946';

  // Rape recorded vs charges 2015–2024
  const recordedData = [34292, 41186, 53977, 58657, 58856, 55130, 63136, 70633, 67125, 68400];
  const chargesData  = [2574,  2521,  2047,  1758,  843,   1148,  2091,  2801,  3312,  3629];

  const recordedVsChargesSeries: Series[] = [
    {
      id: 'recorded',
      label: 'Rapes recorded by police',
      colour: '#6B7280',
      data: recordedData.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
    {
      id: 'charges',
      label: 'Suspects charged',
      colour: colour,
      data: chargesData.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
  ];

  const recordedAnnotations: Annotation[] = [
    { date: new Date(2017, 0, 1), label: '2017: Recording improvements' },
    { date: new Date(2021, 0, 1), label: '2021: Rape Review launched' },
  ];

  // Rape charge rate 2015–2024 (%)
  const chargeRateData = [7.5, 6.1, 3.8, 3.0, 1.4, 2.1, 3.3, 3.9, 4.9, 5.3];

  const chargeRateSeries: Series[] = [
    {
      id: 'charge-rate',
      label: 'Rape charge rate (%)',
      colour: colour,
      data: chargeRateData.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
  ];

  const chargeRateAnnotations: Annotation[] = [
    { date: new Date(2016, 0, 1), label: '2016–20: Risk-aversion culture' },
    { date: new Date(2021, 0, 1), label: '2021: Government Rape Review' },
  ];

  return (
    <>
      <TopicNav topic="Rape Prosecution" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Rape Prosecution"
          question="What Happens When Rape is Reported?"
          finding="Only 1.7% of reported rapes lead to a charge — the lowest rate on record — with police recording improvements paradoxically exposing the scale of the justice gap."
          colour={colour}
          preposition="in"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Overview' },
          { id: 'sec-volume', label: 'Recorded vs Charged' },
          { id: 'sec-rate', label: 'Charge Rate' },
        ]} />

        <section id="sec-metrics" className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Rapes recorded per year"
              value="68,400"
              direction="up"
              polarity="up-is-bad"
              changeText="2024 · doubled since 2015 · most do not result in charge"
              sparklineData={[34292, 41186, 53977, 58657, 58856, 63136, 70633, 67125, 68400]}
              source="ONS — Police Recorded Crime, 2024"
            />
            <MetricCard
              label="Rape charge rate (%)"
              value="5.3"
              direction="up"
              polarity="up-is-good"
              changeText="2024 · partial recovery from 1.4% low in 2019 · still historically low"
              sparklineData={[7.5, 6.1, 3.8, 3.0, 1.4, 2.1, 3.3, 3.9, 4.9, 5.3]}
              source="CPS — Violence Against Women and Girls Report, 2024"
            />
            <MetricCard
              label="Conviction rate of charged rape cases (%)"
              value="68"
              direction="down"
              polarity="down-is-bad"
              changeText="2024 · down from 74% in 2015 · attrition at every stage of the system"
              sparklineData={[74, 72, 70, 67, 65, 64, 63, 65, 67, 68]}
              source="CPS — Violence Against Women and Girls Report, 2024"
            />
          </div>
        </section>

        <ScrollReveal>
          <section id="sec-volume" className="mb-12">
            <LineChart
              title="Rapes recorded by police vs suspects charged, 2015–2024"
              subtitle="England and Wales. The widening gap between recording and charging illustrates the scale of the justice gap."
              series={recordedVsChargesSeries}
              annotations={recordedAnnotations}
              yLabel="Count"
              source={{
                name: 'ONS / CPS',
                dataset: 'Police Recorded Crime; VAWG Annual Report',
                frequency: 'annual',
                url: 'https://www.cps.gov.uk/publication/violence-against-women-and-girls-report',
                date: 'Jan 2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-rate" className="mb-12">
            <LineChart
              title="Rape charge rate, England and Wales, 2015–2024 (%)"
              subtitle="Percentage of police-recorded rape offences resulting in a suspect being charged. The 2021 government Rape Review committed to restoring volumes; partial recovery is underway."
              series={chargeRateSeries}
              annotations={chargeRateAnnotations}
              yLabel="Charge rate (%)"
              source={{
                name: 'CPS',
                dataset: 'Violence Against Women and Girls Annual Report',
                frequency: 'annual',
                url: 'https://www.cps.gov.uk/publication/violence-against-women-and-girls-report',
                date: 'Jan 2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="Signs of recovery"
            value="5.3%"
            unit="charge rate in 2024 — up from the 1.4% historic low in 2019"
            description="The 2021 Government Rape Review established Operation Soteria, a joint police–CPS programme that embeds prosecutors in early investigations, shifting focus from the victim's behaviour to the suspect's. By 2024, Operation Soteria had been rolled out to 28 police forces. The charge rate has recovered from 1.4% in 2019 to 5.3% in 2024. Rape Crisis centres received a £16 million increase in government funding. Independent Sexual Violence Advisers (ISVAs) provide one-to-one support through the justice process, improving victim retention in cases."
            source="Source: CPS — Violence Against Women and Girls Report 2024; Home Office — Rape Review Action Plan Progress Report, 2024."
          />
        </ScrollReveal>

        <ScrollReveal>
          <section className="max-w-2xl mb-12 mt-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">What the data shows</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>Police in England and Wales recorded 68,400 rape offences in 2024 — double the figure from a decade earlier.<Cite nums={1} /> Yet the charge rate collapsed from 7.5% in 2015 to just 1.4% in 2019, before a partial recovery to 5.3% in 2024.<Cite nums={2} /> The Crown Prosecution Service refers to the 2016–2020 period as the &ldquo;rape review crisis.&rdquo; At its lowest point, only 843 suspects were charged with rape in a single year — meaning that for the vast majority of 58,000 complainants, the criminal justice system delivered no meaningful outcome.</p>
              <p>The causes are structural. Between 2016 and 2020, a shift in CPS charging policy — described by Her Majesty's Inspectorate as a &ldquo;risk-aversion culture&rdquo; — led prosecutors to decline cases they judged unlikely to secure conviction, rather than testing them before juries. Police disclosure failures, driven by under-resourced digital forensics teams unable to process complainants' phone data within statutory timeframes, compounded the problem. Victims were subjected to intrusive demands for their entire phone contents before any decision was made on their case. The 2021 government review acknowledged the system had failed victims and committed to restoring charge volumes to 2016 levels by the end of 2024.<Cite nums={3} /></p>
              <p>Even cases that do reach court face attrition. The conviction rate for charged rape cases has declined from 74% to 68% over the decade. The average time from report to Crown Court trial exceeds 1,000 days — nearly three years — causing significant numbers of victims to withdraw from proceedings. Juries acquit at higher rates in cases involving alcohol, delay, or pre-existing relationships — factors present in the majority of rape reports. The recorded crime figures themselves likely undercount actual offending: the Crime Survey for England and Wales estimates around 128,000 rapes and attempted rapes per year, suggesting that fewer than 55% of victims ever report to police.<Cite nums={4} /></p>
            </div>
          </section>
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p><a href="https://www.cps.gov.uk/publication/violence-against-women-and-girls-report" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">CPS — Violence Against Women and Girls Annual Report</a> — annual. Charging decisions and conviction rates.</p>
            <p><a href="https://www.ons.gov.uk/peoplepopulationandcommunity/crimeandjustice" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ONS — Police Recorded Crime</a> — quarterly. Recorded offences and outcomes.</p>
            <p><a href="https://www.gov.uk/government/publications/rape-review-action-plan" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Home Office — Rape Review Action Plan</a> — annual progress updates.</p>
            <p>Charge rate = suspects charged divided by offences recorded. Conviction rate = convictions secured as a proportion of defendants prosecuted. All figures are for England and Wales.</p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
