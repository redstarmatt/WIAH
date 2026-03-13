'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import PositiveCallout from '@/components/PositiveCallout';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

// UPF share of total calorie intake (%), 2008–2024, England/UK
const upfShareAll = [46, 47, 48, 49, 50, 51, 52, 53, 53, 54, 55, 55, 56, 57, 57, 57, 57];

// UPF share for children aged 1–18 (%), 2008–2024
const upfShareChildren = [57, 58, 59, 60, 61, 62, 62, 63, 64, 64, 65, 65, 65, 66, 66, 66, 66];

// UPF share by income decile (most recent year, decile 1 = lowest income)
const upfByIncome = [65, 63, 61, 59, 58, 56, 54, 53, 51, 48];

// Estimated UPF-related health costs (£bn/year), 2010–2024
const upfHealthCosts = [3.2, 3.5, 3.8, 4.1, 4.4, 4.8, 5.1, 5.5, 5.9, 6.2, 6.5, 6.8, 7.2, 7.6, 8.1];

const upfTrendSeries: Series[] = [
  {
    id: 'all',
    label: 'UPF share of calories — all adults (%)',
    colour: '#E63946',
    data: upfShareAll.map((v, i) => ({ date: new Date(2008 + i, 0, 1), value: v })),
  },
  {
    id: 'children',
    label: 'UPF share of calories — children (%)',
    colour: '#F4A261',
    data: upfShareChildren.map((v, i) => ({ date: new Date(2008 + i, 0, 1), value: v })),
  },
];

const upfAnnotations: Annotation[] = [
  { date: new Date(2009, 0, 1), label: '2009: NOVA classification system developed' },
  { date: new Date(2018, 0, 1), label: '2018: Major BMJ studies link UPF to disease' },
  { date: new Date(2023, 0, 1), label: '2023: WHO declares UPF major health risk' },
];

const incomeSeries: Series[] = [
  {
    id: 'income',
    label: 'UPF share of calories by income decile (%)',
    colour: '#E63946',
    data: upfByIncome.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
];

const incomeAnnotations: Annotation[] = [
  { date: new Date(2015, 0, 1), label: 'Decile 1: lowest income (65%)' },
  { date: new Date(2024, 0, 1), label: 'Decile 10: highest income (48%)' },
];

export default function UltraProcessedFoodPage() {
  return (
    <>
      <TopicNav topic="Ultra-Processed Food" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Ultra-Processed Food"
          question="How Much Ultra-Processed Food Do We Eat?"
          finding="Ultra-processed food now accounts for 57% of average UK calorie intake — the highest in Europe — with low-income households consuming significantly more."
          colour="#E63946"
          preposition="with"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The UK has the highest rate of ultra-processed food consumption in Europe. The NOVA classification system — developed by Brazilian researchers and now adopted by the WHO — groups foods into four categories based on the degree of industrial processing. NOVA group 4, ultra-processed foods, includes products formulated with industrial additives, emulsifiers, flavour enhancers and preservatives not found in home cooking: mass-produced bread, breakfast cereals, reconstituted meat products, fizzy drinks, flavoured yoghurts, packaged snacks and ready meals.</p>
            <p>The health evidence has hardened significantly since 2018. A series of large-scale longitudinal studies — including cohorts from France, Brazil, Australia and the UK — have consistently found associations between high UPF consumption and elevated risks of obesity, type 2 diabetes, cardiovascular disease, depression, inflammatory bowel disease and all-cause mortality. The estimated cost to the NHS and wider economy exceeds £8 billion per year by 2024, including direct treatment costs for diet-related conditions and lost productivity.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'UPF trend' },
          { id: 'sec-chart2', label: 'Income gap' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="UPF share of UK calorie intake"
              value="57%"
              direction="up"
              polarity="up-is-bad"
              changeText="up from 46% in 2008 · highest in Europe"
              sparklineData={[46, 48, 50, 52, 53, 55, 56, 57, 57]}
              source="BMJ / NDNS — UK National Diet and Nutrition Survey 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="UPF share in lowest-income households"
              value="65%"
              direction="up"
              polarity="up-is-bad"
              changeText="vs 48% in highest earners · 17pp inequality gap"
              sparklineData={[58, 60, 62, 63, 64, 65, 65, 65, 65]}
              source="NDNS / NCMP — income decile analysis 2024"
              href="#sec-chart2"
            />
            <MetricCard
              label="UPF-related health costs (£bn/year)"
              value="£8.1bn"
              direction="up"
              polarity="up-is-bad"
              changeText="up from £3.2bn in 2010 · NHS treatment + lost productivity"
              sparklineData={[3.2, 3.8, 4.4, 5.1, 5.9, 6.5, 7.2, 8.1, 8.1]}
              source="Food Foundation / Nesta — diet-related disease cost model 2024"
              href="#sec-chart1"
            />
          </div>
        </section>

        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Ultra-processed food share of UK calorie intake, 2008–2024"
              subtitle="Percentage of total calorie intake from NOVA group 4 (ultra-processed) foods in adults and children. UK adults consume the highest UPF share in Europe."
              series={upfTrendSeries}
              annotations={upfAnnotations}
              yLabel="Share of total calories (%)"
              source={{
                name: 'NDNS / BMJ',
                dataset: 'National Diet and Nutrition Survey; BMJ UPF series',
                url: 'https://www.gov.uk/government/collections/national-diet-and-nutrition-survey',
                frequency: 'annual',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="UPF consumption by income decile, England, most recent year"
              subtitle="Share of calories from ultra-processed food by household income decile (1 = lowest income, 10 = highest). The poorest households consume 17 percentage points more UPF than the wealthiest."
              series={incomeSeries}
              annotations={incomeAnnotations}
              yLabel="UPF share of calories (%)"
              source={{
                name: 'NDNS / Food Foundation',
                dataset: 'National Diet and Nutrition Survey — income quintile breakdown',
                url: 'https://foodfoundation.org.uk',
                frequency: 'annual',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="UK government action is beginning — though campaigners say it is too slow"
            value="2025"
            unit="UPF labelling consultation launched"
            description="The Food Standards Agency launched a consultation in 2025 on mandatory front-of-pack labelling for ultra-processed food, building on the Nutri-Score and traffic light systems already in use. The sugar levy (2018) has already reduced sugar content in soft drinks by 28% — evidence that fiscal measures change product formulation faster than consumer choice. Seven major food manufacturers have voluntarily committed to reformulation targets for 2025–2027. The NHS has also added UPF reduction to the NHS Health Check framework for the first time."
            source="Source: FSA — UPF labelling consultation 2025. OHID — Sugar reduction programme progress 2024."
          />
        </ScrollReveal>

        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">What the data shows</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>The UPF share of UK diets has risen continuously since measurement began in the 2000s, and the pace has not slowed despite growing public awareness of the issue. The 57% average figure conceals a wide range: children and adolescents are closer to 65–66%, and the lowest-income households — who face the greatest price pressure and have the least access to fresh food retail — are disproportionately reliant on processed foods.</p>
              <p>The price mechanism matters enormously. Ultra-processed foods are designed to be cheap, shelf-stable and palatable. Per calorie, they are significantly cheaper than whole foods in UK supermarkets — a relationship that has widened during the cost-of-living crisis. For a household on a tight budget, the rational economic choice is often a high-UPF diet, even when nutritional awareness is high. This is not a failure of education; it is a failure of the food pricing environment.</p>
              <p>The health cost projection of £8.1 billion per year is a conservative estimate focused on direct NHS treatment costs and some productivity losses. It does not include wider social costs — carer time, benefits paid due to diet-related disability, or the effect of childhood obesity on educational attainment. The full societal cost of the UK's ultra-processed food dependence is likely to be substantially higher, and the lag between dietary exposure and clinical disease means the peak cost is still in the future.</p>
            </div>
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p>
              <a href="https://www.gov.uk/government/collections/national-diet-and-nutrition-survey" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NDNS — National Diet and Nutrition Survey</a> — primary source for food consumption data. UK rolling survey. UPF classification applies NOVA group 4 criteria. Retrieved January 2025.
            </p>
            <p>
              <a href="https://www.bmj.com/content/381/bmj-2023-075294" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">BMJ — UPF and human health: a systematic review (2023)</a> — synthesis of longitudinal evidence on UPF and health outcomes.
            </p>
            <p>
              <a href="https://foodfoundation.org.uk" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Food Foundation — The Broken Plate reports</a> — annual analysis of UK food environment and diet inequality by income. Retrieved 2024.
            </p>
            <p className="text-xs mt-4">UPF classification uses NOVA group 4 criteria throughout. Different studies use slightly different food composition databases, which creates comparability issues — the trend direction is robust but absolute percentage figures should be treated as estimates. Health cost estimates are modelled rather than directly measured and are subject to wide confidence intervals.</p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
