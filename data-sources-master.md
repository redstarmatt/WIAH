# WIAH Data Sources — Master Reference

**Last updated:** 2026-03-03
**Purpose:** 100+ datasets organised by theme for "What is actually happening" topic pages. Each entry includes the dataset, source, story potential, feasibility tier, and access details.

**Tier key:**
- **T1** = Easy. Clean, regular, machine-readable, stable endpoints. Pipeline in a day.
- **T2** = Moderate. Data exists but needs assembly, joining, or processing.
- **T3** = Hard. Fragmented, infrequent, or requires significant compilation.

---

## EXISTING WIAH TOPICS (already built or in progress)

### Health (live)
Already covered: GP access, ambulance response times. These are additional datasets to deepen or extend the topic.

| # | Dataset | Source | Tier | Story | Access |
|---|---------|--------|------|-------|--------|
| 1 | NHS RTT Waiting Lists | NHS England | T1 | 7.3M people waiting. 18-week target not met since 2016. By provider & specialty. | Monthly CSV. england.nhs.uk/statistics/statistical-work-areas/rtt-waiting-times/ |
| 2 | A&E Waiting Times | NHS England | T1 | 4-hour target collapsed. Which hospitals are coping, which are not. | Monthly CSV by trust. england.nhs.uk/statistics/statistical-work-areas/ae-waiting-times-and-activity/ |
| 3 | NHS Workforce Statistics | NHS Digital | T1 | Monthly headcount/FTE of all NHS staff. Is the workforce growing fast enough? | Monthly CSV. digital.nhs.uk |
| 4 | NHS Vacancy Statistics | NHS Digital | T1 | Staffing gaps by region and specialty since April 2015. | Quarterly. digital.nhs.uk |
| 5 | NHS Dental Activity | NHS BSA | T1 | 97% of new patients can't get NHS dental care. Regional deserts. | Monthly, regional. nhsbsa.nhs.uk |
| 6 | Mental Health Services (IAPT/Talking Therapies) | NHS Digital | T2 | 1.7M on the mental health waiting list. 78,577 children waiting >1 year. Crisis team data patchy by trust. | Monthly. digital.nhs.uk |
| 7 | NHS Sickness Absence | NHS Digital | T1 | Workforce burnout proxy. Above pre-pandemic levels across all sectors. | Monthly by organisation. digital.nhs.uk |
| 8 | Obesity (NCMP child + HSE adult) | NHS Digital | T1 | Child and adult obesity rates over time. Regional, well-structured. | Annual. digital.nhs.uk |
| 9 | Healthy Life Expectancy by Deprivation | ONS | T1 | Gap of 19–24 years of healthy life between most/least deprived. Widening. | Annual from 2011. By LA/deprivation decile. ons.gov.uk |
| 10 | Avoidable Mortality by Deprivation | ONS | T1 | 1 in 5 deaths preventable. Rate 4× higher in deprived areas. | Annual, LA-level, 2001–2023. ons.gov.uk |
| 11 | Life Expectancy Gap | ONS Health State Life Expectancy | T1 | By deprivation decile, sex, region. The inequality that kills. | Annual, clean. ons.gov.uk |
| 12 | Drug-Related Deaths | ONS | T1 | Tripled since 1993. North East 2.5× national average. Gen X cohort. | Annual CSV by LA, substance, age, sex. ons.gov.uk |
| 13 | Alcohol-Specific Deaths | ONS | T1 | Sharp pandemic jump that hasn't reversed. Quarterly. | Quarterly. ons.gov.uk |
| 14 | Suicides by Local Authority | ONS | T1 | Postcode lottery of mental health outcomes. Middle-aged men highest. | Annual from 1981 (national). LA-level. ons.gov.uk |
| 15 | Smoking, Drinking & Drug Use Among Young People | NHS Digital | T1 | Is the next generation making better or worse choices? Vaping data. | Annual, regional. digital.nhs.uk |
| 16 | Adult Psychiatric Morbidity Survey (APMS) | NHS Digital | T2 | Clinical evidence: common mental health conditions rose 17.6% → 22.6% (2007–2024). | Every ~7 years. digital.nhs.uk |
| 17 | Health Survey for England (HSE) | UK Data Service (SN 2000021) | T1 | Three decades of obesity, diabetes, BP, drinking, physical activity. | Annual since 1991. datacatalogue.ukdataservice.ac.uk |
| 18 | Public Health Outcomes Framework (Fingertips) | OHID | T1 | 100+ indicators at LA level — obesity, smoking, alcohol admissions, teenage pregnancy. | Downloadable. fingertips.phe.org.uk |

### Justice (live)
Already covered: crime outcomes, court backlog, prison population. Additional datasets:

| # | Dataset | Source | Tier | Story | Access |
|---|---------|--------|------|-------|--------|
| 19 | Prison Population & Overcrowding | MOJ Quarterly Stats | T1 | 87,000+ prisoners. Men's estate at 97.7% capacity. Quadrupled since 1900. | Quarterly CSV. data.justice.gov.uk |
| 20 | Crown Court Backlog | MOJ | T1 | Outstanding caseload ballooned post-pandemic. Victims waiting years. | Quarterly. data.justice.gov.uk |
| 21 | Police Staffing | Home Office Police Workforce | T1 | Force-level headcount. Are there enough police? | Annual, force-level, clean Excel/CSV. gov.uk |
| 22 | Knife Crime | ONS Crime Survey + NHS HES | T2 | Quarterly crime data + annual hospital admissions for knife injuries. | Two sources to join. ons.gov.uk + digital.nhs.uk |
| 23 | Domestic Abuse | ONS + CPS | T2 | Two separate datasets to join. Recording practices vary. | ONS Crime Survey + CPS outcomes. |
| 24 | Anti-Social Behaviour | data.police.uk | T2 | Monthly, force-level — but recording practices wildly inconsistent. | data.police.uk |
| 25 | Crime Severity Score | ONS | T1 | Weights crimes by severity not count. Harm concentrated in specific areas. | By police force area & LA. ons.gov.uk |
| 26 | Cybercrime | Action Fraud / CSEW | T3 | Massive under-reporting. Data quality widely questioned. | Patchy. |

### Education (live)
Already covered: persistent absence, SEND/EHCP, attainment gap. Additional datasets:

| # | Dataset | Source | Tier | Story | Access |
|---|---------|--------|------|-------|--------|
| 27 | Children in Care (SSDA903) | DfE | T1 | LA-level. How many children the state looks after. | Annual CSV. explore-education-statistics.service.gov.uk |
| 28 | Adoption & Fostering | DfE | T2 | Less granular than CiC. Foster carer data sparse. | Annual. |
| 29 | Ofsted Inspection Outcomes | Ofsted | T1 | % schools Good/Outstanding by area. Geography of school quality. | Monthly management info. LA-level since 2005. gov.uk |
| 30 | Childcare Costs | Coram Survey + DfE Funded Hours | T2 | £158/week for under-2s. 25,900 fewer providers since 2015. Two sources. | Annual (Coram survey-based) + DfE. |
| 31 | Youth Mental Health (CAMHS) | NHS Digital MHSDS | T2 | Monthly — but data quality varies wildly by trust. | digital.nhs.uk |
| 32 | Millennium Cohort Study (Age 23) | UK Data Service (SN 9509) | T2 | 19,000 born ~2000 tracked to adulthood. Childhood disadvantage → adult outcomes. | datacatalogue.ukdataservice.ac.uk |
| 33 | COVID Impacts on Children's Speech/Language | UK Data Service (SN 858126) | T2 | Pandemic developmental damage years later. | datacatalogue.ukdataservice.ac.uk |

### Housing (stub)

| # | Dataset | Source | Tier | Story | Access |
|---|---------|--------|------|-------|--------|
| 34 | Housing Affordability Ratios | ONS | T1 | Median house = 8× median earnings. LA-level. 5× (North) to 14× (South East). | Annual. ons.gov.uk |
| 35 | Private Rental Affordability | ONS | T1 | Renters spend 36% of income. Some London boroughs >50%. | Annual from 2016. LA-level. ons.gov.uk |
| 36 | Index of Private Housing Rental Prices | ONS | T1 | Rents rising faster than inflation since 2021. | Monthly. ons.gov.uk |
| 37 | Statutory Homelessness | DLUHC | T1 | Families in temporary accommodation, rough sleeping, by LA. | Quarterly since 2008. gov.uk |
| 38 | Rough Sleeping | ONS / DLUHC | T2 | Cross-UK analysis. Different measurement approaches across 4 nations. | Annual estimates. ons.gov.uk |
| 39 | Deaths of Homeless People | ONS | T1 | Hundreds die on streets/shelters yearly. Drug poisoning, suicide, alcohol. | Annual. Experimental. ons.gov.uk |
| 40 | English Housing Survey | DLUHC / UK Data Service | T1 | Physical state of housing stock — damp, overcrowding, energy efficiency, tenure. | Annual. govuk + datacatalogue.ukdataservice.ac.uk |
| 41 | Fuel Poverty | DESNZ | T1 | ~11% of households fuel poor. Poorest in worst-insulated homes. | Annual. Sub-regional. gov.uk |

### Water (stub)
Already specified in CLAUDE.md. No additions needed at this stage.

---

## NEW TOPICS

### Economy & Cost of Living

| # | Dataset | Source | Tier | Story | Access |
|---|---------|--------|------|-------|--------|
| 42 | National Debt | OBR / ONS | T1 | Monthly, clean CSV, decades of history. Debt-to-GDP trajectory. | Monthly. obr.uk + ons.gov.uk |
| 43 | Real Average Weekly Earnings (X09) | ONS | T1 | Real wages only just recovered to 2008 level. A lost decade and a half. | Monthly, inflation-adjusted, from 2000. ons.gov.uk |
| 44 | CPI/CPIH Inflation | ONS | T1 | Low-income households face higher effective inflation than wealthy ones. | Monthly. ons.gov.uk |
| 45 | Household Costs Indices | ONS | T1 | Inflation experienced differently by income group. Gap widened from May 2025. | Quarterly. ons.gov.uk |
| 46 | Regional GDP / GVA by Local Authority | ONS | T1 | London gap widened over 25 years. Some LAs produce <⅓ London average. | Annual from 1998. ons.gov.uk |
| 47 | GVA & Productivity for Towns/Cities | ONS | T1 | Down to LSOA level. Which towns are thriving, which are hollowing out. | Annual. ons.gov.uk |
| 48 | Business Demography (births, deaths, survival) | ONS | T1 | Closures spiked post-pandemic. Startup survival rates falling. | Annual. ons.gov.uk |
| 49 | Trade Balance | ONS UK Trade | T1 | Monthly, long time series. Post-Brexit trade patterns. | Monthly CSV. ons.gov.uk |
| 50 | Tax Burden | HMRC / OBR | T1 | Quarterly receipts, annual breakdowns. Tax as % of GDP at 70-year high? | Quarterly/annual. hmrc.gov.uk + obr.uk |
| 51 | Council Tax by Local Authority | MHCLG | T1 | Risen relentlessly since 1993. Massive variation between authorities. | Annual since 1993. gov.uk |
| 52 | Council Funding / Spending Power | DLUHC | T1 | Per-authority. Austerity cuts mapped. | Annual, structured Excel. gov.uk |

### Work & Employment

| # | Dataset | Source | Tier | Story | Access |
|---|---------|--------|------|-------|--------|
| 53 | Unemployment by Region | ONS LFS (NOMIS API) | T1 | Monthly, regional, excellent API. The headline labour market story. | Monthly. nomisweb.co.uk |
| 54 | Economic Inactivity (Long-Term Sickness) | ONS | T1 | Historically unprecedented levels. Driven by mental health + MSK. | Monthly time series. ons.gov.uk |
| 55 | Zero-Hours Contracts (EMP17) | ONS LFS | T2 | From negligible to 1M+. Quarterly but small sample; sector breakdown noisy. | Quarterly. ons.gov.uk |
| 56 | Gender Pay Gap | EHRC Mandatory Reporting | T1 | Annual, employer-level, downloadable. Who pays women less? | Annual. gender-pay-gap.service.gov.uk |
| 57 | ASHE (Hours and Earnings) | ONS | T1 | Most comprehensive pay picture. By age, gender, region, occupation, sector. | Annual. ons.gov.uk / Secure Access via UK Data Service |
| 58 | Sickness Absence in the Labour Market | ONS | T1 | Days lost significantly above pre-pandemic. Lasting workforce health deterioration. | Annual. ons.gov.uk |
| 59 | Trade Unions | BEIS/DBT Annual Stats | T2 | Annual, clean — but limited granularity. Membership decline over 40 years. | Annual. gov.uk |
| 60 | Skills and Employment Survey | WISERD | T2 | Job quality, autonomy, stress. Every ~5 years. 2024 wave covers Covid/Brexit/CoL impact. | wiserd.ac.uk/ses/ |
| 61 | Gig Economy | No single dataset | T3 | Patched from BEIS, TUC, platform reports. No official count. | Fragmented. |

### Immigration & Population

| # | Dataset | Source | Tier | Story | Access |
|---|---------|--------|------|-------|--------|
| 62 | Net Migration Flows | ONS | T1 | From 944,000 to 204,000 in two years. Most dramatic swing in UK immigration history. | Quarterly. ons.gov.uk |
| 63 | Immigration System Statistics | Home Office | T1 | Full picture: work visas, student visas, asylum decisions, removals. | Quarterly Excel/CSV. gov.uk |
| 64 | Small Boat Channel Crossings | Home Office | T1 | 193,000 detected since 2018. 45,183 in YE Sep 2025 (+51%). Daily updates. | Daily/weekly CSV. gov.uk |
| 65 | Asylum Backlog | Home Office | T1 | 48,700 cases awaiting decision (down from 134K peak). Appeals backlog 42,000 growing. | Quarterly Excel. gov.uk |
| 66 | Total Fertility Rate | ONS | T1 | Record low 1.41 in 2024. Third consecutive record low. Demographic transformation. | Annual from 1938. Regional. ons.gov.uk |
| 67 | Mid-Year Population Estimates | ONS | T1 | Growth now almost entirely driven by international migration. | Annual. ons.gov.uk |
| 68 | National Population Projections | ONS | T1 | By 2032, roughly equal births and deaths. Rising proportion of over-65s. | Periodic. ons.gov.uk |
| 69 | British Social Attitudes Survey | NatCen / UK Data Service | T2 | What Britain thinks: immigration, NHS, welfare, inequality, trust. Annual since 1983. | natcen.ac.uk / datacatalogue.ukdataservice.ac.uk |
| 70 | National Referral Mechanism (Modern Slavery) | Home Office / UK Data Service (SN 8910) | T2 | Rise of modern slavery referrals. Who is being trafficked and by whom. | Quarterly. gov.uk |

### Poverty & Inequality

| # | Dataset | Source | Tier | Story | Access |
|---|---------|--------|------|-------|--------|
| 71 | Child Poverty (Local Area Statistics) | DWP / HMRC | T1 | Rates vary 6% to 45% across LAs. Ward-level. Hugely shareable. | Annual from FYE 2015. gov.uk |
| 72 | Households Below Average Income (HBAI) | DWP | T1 | The official poverty measure. By family type, region, material deprivation. | Annual from FYE 1995. gov.uk + Stat-Xplore |
| 73 | Household Income Inequality (Gini) | ONS | T1 | Jumped in 1980s, stubbornly flat since at ~32–33%. | Time series. ons.gov.uk |
| 74 | Household Total Wealth (WAS) | ONS | T2 | Top 1% = bottom 50%. Financial wealth Gini = 0.87. Published every ~2 years; long lag. | Biennial. ons.gov.uk |
| 75 | Income Estimates for Small Areas (MSOA) | ONS | T1 | Extreme poverty and extreme wealth within metres of each other. | ons.gov.uk |
| 76 | Food Bank Usage | Trussell Trust | T1 | 60,000 parcels (2010/11) → 2.9 million (2024/25). 48× increase. 1M to children. | Annual + mid-year. trusselltrust.org |
| 77 | Food Insecurity (Food and You 2) | FSA / UK Data Service | T2 | Food insecurity, food bank use, how cost-of-living changed eating habits. Biannual waves since 2020. | datacatalogue.ukdataservice.ac.uk (series 2000034) |
| 78 | Universal Credit Statistics | DWP | T1 | Monthly caseload, deductions, payment timeliness. How the welfare system actually works. | Monthly/quarterly. gov.uk + stat-xplore.dwp.gov.uk |
| 79 | PIP Statistics | DWP | T1 | Assessment waits, award rates, mandatory reconsideration, appeals. How disabled people navigate the system. | Quarterly by region/LA. gov.uk |
| 80 | Persistent Poverty | ONS | T2 | Nearly ⅔ of children in poverty one year are still in it the next. Poverty is sticky. | Periodic. ons.gov.uk |

### Waste & Recycling 🆕

| # | Dataset | Source | Tier | Story | Access |
|---|---------|--------|------|-------|--------|
| 81 | LA Collected Waste (WasteDataFlow) | DEFRA | T2 | National recycling rate stuck at 44% for a decade. Target 65% by 2035. Best council 60%+, worst <20%. | Annual CSV. LA-level (321 authorities). gov.uk + data.gov.uk |
| 82 | Fly-Tipping Statistics | DEFRA | T2 | ~1 million incidents/year. Enforcement declining. By land type, waste type, size. | Annual CSV since 2007/08. LA-level. gov.uk |
| 83 | UK Statistics on Waste (national overview) | DEFRA | T1 | Total waste by sector. Treatment method over time (recycled/landfilled/incinerated/exported). Landfill collapsed from 80%+ to 5.5%. | Annual ODS. gov.uk |
| 84 | Waste Data Interrogator | Environment Agency | T2 | What happens at every one of ~6,000 regulated waste sites. Trace flows from collection to facility. | Annual CSV. Site-level since 2006. data.gov.uk |
| 85 | Remaining Landfill Capacity | Environment Agency | T2 | Several regions could run out within a decade. Some LAs already at zero. | Annual CSV. Site-level. data.gov.uk |
| 86 | Waste Exports (International Waste Shipments) | Environment Agency | T2 | UK is world's 2nd largest plastic waste exporter (615,000 tonnes). Turkey now top destination after China ban. | CSV. Shipment-level. data.gov.uk |
| 87 | Packaging Recycling Rates by Material | EA / DEFRA (NPWD) | T1 | Paper 86%, glass 80%, metal 80%, plastic 51%. Why "recycling" means different things for different materials. | Annual. Within UK Stats on Waste ODS. npwd.environment-agency.gov.uk |
| 88 | Recycling Contamination/Rejection | WasteDataFlow / WRAP / LGA | T2 | 82% of residents put non-recyclables in recycling bin. 525,000 tonnes rejected yearly. | Derived from WasteDataFlow. LGA analysis. |
| 89 | Energy from Waste / Incineration Capacity | DEFRA / EA | T2 | EfW capacity doubled since 2014. Replaced landfill. CO2 debate. Entering ETS 2028. | Annual. Within UK Stats on Waste + EA data. |
| 90 | Food Waste | WRAP | T2 | 6M tonnes/year from households. 73% was edible. Worth £17B (£1,000/family of four). | Periodic report (every 2–3 years). Latest July 2025. wrap.ngo |

### Transport

| # | Dataset | Source | Tier | Story | Access |
|---|---------|--------|------|-------|--------|
| 91 | Bus Statistics (BUS01-09) | DfT | T1 | Collapse of bus services outside London. Passenger journeys, fares, routes. Some series from 1950. | Annual + quarterly. Regional/LA. gov.uk |
| 92 | Road Conditions / Potholes | DfT (RDC tables) | T2 | 13 councils got red rating in 2025/26. DfT now rates every council. | Annual by LA. gov.uk |
| 93 | Road Casualty Statistics | DfT (RAS30) | T1 | Road deaths by user type, age, region since 1926. Are roads getting safer? | Annual ODS. Police force/LA level. gov.uk |
| 94 | Rail Performance | ORR Data Portal | T1 | Punctuality, cancellations, complaints, fares by operator. | Downloadable. dataportal.orr.gov.uk |
| 95 | National Travel Survey | DfT | T1 | How, why, where people travel. Car dependency vs public transport/cycling by region. | Annual. ~16,000 individuals. gov.uk |
| 96 | EV Charging Infrastructure | DfT | T2 | Clean but short history (~5 years). Targets need separate source. | Quarterly. gov.uk |
| 97 | Fuel & Transport Poverty | UK Data Service (SN 856805) | T3 | "Double energy vulnerability" — can't afford to heat AND can't afford to travel. | 2022 study. reshare.ukdataservice.ac.uk |
| 98 | Weekly Road Fuel Prices | DESNZ | T1 | Petrol/diesel at the pump. The number that affects every driver every week. | Weekly CSV. gov.uk |

### Environment & Energy

| # | Dataset | Source | Tier | Story | Access |
|---|---------|--------|------|-------|--------|
| 99 | UK Greenhouse Gas Emissions | DESNZ | T1 | Territorial emissions by sector since 1990. Are we on track for carbon budgets? | Annual + quarterly provisional. gov.uk |
| 100 | Air Quality (UK-AIR) | DEFRA | T2 | PM2.5 & NO2 at 1km resolution by LA. Which communities breathe the dirtiest air? Needs aggregation across 100+ stations. | Annual modelled + real-time monitoring. uk-air.defra.gov.uk |
| 101 | Bathing Water Quality | Environment Agency | T1 | Annual classification of every designated bathing water. Which beaches are safe? | Annual by site. environment.data.gov.uk |
| 102 | Low Carbon & Renewable Energy Economy | ONS | T1 | Renewable sector GVA growth outpacing all other environmental categories since 2010. | Annual. ons.gov.uk |
| 103 | Flooding | EA Flood Risk + Recorded Events | T2 | Risk data excellent; event frequency needs scraping multiple sources. | environment.data.gov.uk |
| 104 | Energy Bills (Domestic) | DESNZ | T1 | Average bills 44% above pre-crisis levels. Quarterly. Time series from ~2004. | Quarterly CSV/Excel. gov.uk |
| 105 | Tree Planting | Forest Research + CCC | T2 | Annual planting stats clean; tracking vs targets needs manual work. | Annual. forestresearch.gov.uk |
| 106 | Biodiversity / State of Nature | State of Nature / NBN Atlas | T3 | Report every ~3 years. Species data scattered across NGOs. | stateofnature.org.uk |

### Defence & Foreign Affairs

| # | Dataset | Source | Tier | Story | Access |
|---|---------|--------|------|-------|--------|
| 107 | Defence Spending | MOD Annual Statistics / NATO | T1 | Simple metrics. 2% GDP target debate. Clean annual. | Annual. gov.uk + nato.int |
| 108 | Foreign Aid | FCDO Statistics on International Development | T2 | Annual, clean — but DFID→FCDO restructuring caused breaks in series. | Annual. gov.uk |

### Democracy & Governance

| # | Dataset | Source | Tier | Story | Access |
|---|---------|--------|------|-------|--------|
| 109 | Voter Turnout | Electoral Commission | T1 | Clean CSVs per election. Decades of history. Who votes and who doesn't. | Per election. electoralcommission.org.uk |
| 110 | Lobbying & Donations | Electoral Commission + ORCL | T2 | Donations clean; lobbying register less so. Two registries to join. | electoralcommission.org.uk |
| 111 | FOI Requests | Cabinet Office Monitoring | T2 | Quarterly, clean — but only covers central govt, not all public bodies. | Quarterly. gov.uk |
| 112 | Trust in Government | BSA / Ipsos / Edelman | T3 | Multiple surveys, different methodologies. No single clean source. | Various. |
| 113 | PPP/PFI Costs | Treasury + NAO | T3 | Published but complex. Annual payments spreadsheet needs interpretation. | gov.uk |
| 114 | Devolution / Regional Spending | IFS / Treasury | T3 | Spending per head doable. "Powers transferred" is qualitative. | ifs.org.uk |

### Digital & Connectivity

| # | Dataset | Source | Tier | Story | Access |
|---|---------|--------|------|-------|--------|
| 115 | Broadband Coverage & Speeds | Ofcom Connected Nations | T1 | Postcode-level. The digital divide. Who is left behind. | Annual. 121 CSV files by postcode area. ofcom.org.uk |
| 116 | Mobile Coverage | Ofcom | T2 | Annual — geographic coverage methodology complex. | ofcom.org.uk |
| 117 | Internet Access (Households & Individuals) | ONS | T1 | Near-universal but persistent exclusion: older, disabled, low-income. | Annual. ons.gov.uk |
| 118 | Digital Government / GDS Service Data | GDS | T3 | Some dashboards but no clean aggregate. Metrics changed over time. | Scattered. |
| 119 | AI & Automation | No UK dataset | T3 | Would need OECD forecasts, patent databases, ONS business survey fragments. | Fragmented. |

### Wellbeing & Social Life

| # | Dataset | Source | Tier | Story | Access |
|---|---------|--------|------|-------|--------|
| 120 | Personal Well-Being Estimates | ONS (via APS) | T1 | Life satisfaction, happiness, anxiety. Not recovered to pre-pandemic. LA-level. | Annual + quarterly. ~90,000 respondents. ons.gov.uk |
| 121 | Loneliness Indicators | ONS / Community Life Survey | T2 | Young adults and elderly loneliest. Digital connectivity doesn't solve it. Small sample, limited regional. | Annual survey. ons.gov.uk |
| 122 | Community Life Survey | DCMS / UK Data Service | T1 | Volunteering, charitable giving, trust in neighbours, civic engagement. | Annual since 2013. datacatalogue.ukdataservice.ac.uk (series 2000100) |
| 123 | Active Lives Survey | Sport England / UK Data Service | T1 | How active the nation is. By age, gender, disability, deprivation. | Continuous since 2015. datacatalogue.ukdataservice.ac.uk (series 2000120) |
| 124 | UK Time Use Survey | UK Data Service | T2 | How people spend 24 hours — work, childcare, cooking, commuting, screens, sleep. By gender/class. Only 2000/01 and 2014/15. | datacatalogue.ukdataservice.ac.uk |
| 125 | People and Nature Survey | Natural England / UK Data Service (SN 9092) | T1 | Relationship with nature post-pandemic. Green space visits. Did the lockdown boom last? | 2020–2025. datacatalogue.ukdataservice.ac.uk |

### Mega-Surveys & Longitudinal (cross-cutting)

| # | Dataset | Source | Tier | Story | Access |
|---|---------|--------|------|-------|--------|
| 126 | Understanding Society (UKHLS) | UK Data Service | T2 | 40,000 households tracked annually since 2009 (+ BHPS from 1991). The richest single dataset on British life. | understandingsociety.ac.uk |
| 127 | Living Costs and Food Survey | UK Data Service (series 2000028) | T2 | How household spending patterns shifted over decades — food, housing, energy, transport vs income. | Annual since 1961. datacatalogue.ukdataservice.ac.uk |
| 128 | Family Resources Survey | UK Data Service | T1 | ~24,000 households. Backbone for poverty measurement. Income, benefits, housing costs. | Annual. datacatalogue.ukdataservice.ac.uk |
| 129 | Wealth and Assets Survey | ONS / UK Data Service | T2 | The full wealth inequality picture — property, pensions, savings, debt. Top 1% = bottom 50%. Every ~2 years. | ons.gov.uk / datacatalogue.ukdataservice.ac.uk |
| 130 | National Diet and Nutrition Survey (NDNS) | UK Data Service (series 2000033) | T2 | What the nation actually eats vs what it should. Sugar, fruit/veg, nutrients by income/region. | Rolling programme since 2008. datacatalogue.ukdataservice.ac.uk |
| 131 | National Child Development Study (born 1958) | UK Data Service (series 2000032) | T3 | 65 years of data. How health, class, education at birth predict outcomes decades later. | datacatalogue.ukdataservice.ac.uk |
| 132 | 1970 British Cohort Study | UK Data Service (series 200001) | T3 | 17,000+ born 1970. Children of deindustrialisation approaching retirement. | datacatalogue.ukdataservice.ac.uk |
| 133 | Prices Survey Microdata | UK Data Service (SN 7022) | T3 | Actual price quotes underlying CPI/RPI. ~650 goods across 150 areas. Secure Access. | datacatalogue.ukdataservice.ac.uk |

---

## TOPIC PAGE PRIORITY RECOMMENDATIONS

Based on data quality, story strength, public resonance, and pipeline feasibility:

### Next to build (Tier 1 data, strong stories)

1. **Economy** — "What is actually happening to your money?"
   - Real wages (X09), CPI by income group (HCI), regional GDP, business demography
   - *Pipeline: 1–2 days. All clean ONS CSV.*

2. **Immigration** — "What is actually happening with immigration?"
   - Net migration flows, visa stats, small boats, asylum backlog, fertility rate
   - *Pipeline: 1–2 days. ONS quarterly + Home Office quarterly.*

3. **Poverty** — "What is actually happening to the poorest?"
   - Child poverty by LA, HBAI, food bank usage, UC stats, PIP
   - *Pipeline: 1–2 days. DWP Stat-Xplore + Trussell annual.*

4. **Waste & Recycling** — "What actually happens to your rubbish?"
   - WasteDataFlow (council league table), waste flows (Sankey), exports, fly-tipping
   - *Pipeline: 2–3 days. DEFRA annual + EA data. Definitions slightly inconsistent.*

5. **Transport** — "Can you actually get anywhere?"
   - Bus collapse, rail performance, road conditions, fuel prices, NTS
   - *Pipeline: 1–2 days. DfT clean tables.*

### Medium term (T1/T2 mix)

6. **Work** — "Is your job actually getting better?"
7. **Energy** — "Can you actually afford to heat your home?"
8. **Dentistry + Mental Health** — could extend Health page
9. **Children** — children in care, childcare costs, child poverty (crosscutting)
10. **Democracy** — voter turnout, donations, trust

### Harder but powerful (T3)

11. **Wealth inequality** — WAS data (infrequent but devastating)
12. **Biodiversity** — fragmented but important
13. **AI & work** — no clean dataset yet

---

## KEY DATA ACCESS POINTS

| Portal | URL | Notes |
|--------|-----|-------|
| ONS Time Series Explorer | ons.gov.uk/timeseriestool | Quick access to individual series |
| ONS Developer Hub (API) | developer.ons.gov.uk | Programmatic access |
| NOMIS (Labour Market) | nomisweb.co.uk | Excellent API for LFS, APS, Census |
| DWP Stat-Xplore | stat-xplore.dwp.gov.uk | Custom tables for UC, PIP, HBAI, child poverty |
| NHS Digital | digital.nhs.uk | Workforce, mental health, dental, NCMP |
| DfE Explore Education Statistics | explore-education-statistics.service.gov.uk | Clean CSVs for all DfE data |
| data.gov.uk | data.gov.uk | 48,000+ government datasets |
| UK Data Service Catalogue | datacatalogue.ukdataservice.ac.uk | Academic/survey datasets |
| OHID Fingertips | fingertips.phe.org.uk | 100+ public health indicators at LA level |
| Environment Agency | environment.data.gov.uk | Water, waste, flooding |
| data.police.uk | data.police.uk | Street-level crime, ASB |
| MOJ Justice Data | data.justice.gov.uk | Prisons, courts, reoffending |
| ORR Data Portal | dataportal.orr.gov.uk | Rail performance |
| Ofcom Data | ofcom.org.uk | Broadband, mobile, media |
