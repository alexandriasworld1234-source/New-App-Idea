// US states that do NOT use NGSS and have their own standards
const NON_NGSS_STATES = [
  "Texas",
  "Virginia",
  "Nebraska",
  "Oklahoma",
  "Wyoming",
  "Ohio",
  "Indiana",
  "Missouri",
  "North Dakota",
  "South Dakota",
  "Pennsylvania",
  "Florida",
  "Georgia",
  "Alabama",
  "Mississippi",
  "Louisiana",
  "South Carolina",
  "Tennessee",
  "North Carolina",
];

export type StandardsFrameworkCode =
  | "ngss"
  | "common_core_ela"
  | "common_core_math"
  | "us_state"
  | "uk_national"
  | "ib_pyp"
  | "ib_myp"
  | "acara"
  | "custom";

export function resolveStandardsFramework(
  country: string,
  state?: string,
  schoolType?: string
): StandardsFrameworkCode {
  // IB schools use IB regardless of country
  if (schoolType === "ib_pyp") return "ib_pyp";
  if (schoolType === "ib_myp") return "ib_myp";

  switch (country) {
    case "US":
    case "PR":
      return state && NON_NGSS_STATES.includes(state) ? "us_state" : "ngss";
    case "GB":
      return "uk_national";
    case "AU":
      return "acara";
    default:
      return "custom";
  }
}

// Human-readable names for all framework codes
export function getFrameworkDisplayName(code: StandardsFrameworkCode): string {
  const names: Record<StandardsFrameworkCode, string> = {
    ngss: "Next Generation Science Standards (NGSS)",
    common_core_ela: "Common Core ELA",
    common_core_math: "Common Core Math",
    us_state: "State Standards",
    uk_national: "UK National Curriculum",
    ib_pyp: "IB Primary Years Programme",
    ib_myp: "IB Middle Years Programme",
    acara: "Australian Curriculum (ACARA)",
    custom: "National / Regional Curriculum",
  };
  return names[code];
}

// Country-specific framework display names for the "custom" bucket
// Used in the review step and generation output to show the teacher
// what curriculum engine the AI is referencing for their country
export function getCountryFrameworkName(countryCode: string): string {
  const countryFrameworks: Record<string, string> = {
    // Americas
    AR: "N\u00facleos de Aprendizajes Prioritarios (NAP)",
    BR: "Base Nacional Comum Curricular (BNCC)",
    CA: "Provincial Curriculum Standards",
    CL: "Bases Curriculares",
    CO: "Est\u00e1ndares B\u00e1sicos de Competencias",
    CR: "Programa de Estudios MEP",
    MX: "Plan y Programas de Estudio (SEP)",
    PE: "Curr\u00edculo Nacional de Educaci\u00f3n B\u00e1sica",
    UY: "Marco Curricular de Referencia Nacional",

    // Europe
    AT: "Austrian National Curriculum (Lehrplan)",
    BE: "Flemish/French Community Curriculum",
    CZ: "R\u00e1mcov\u00fd vzd\u011bl\u00e1vac\u00ed program (RVP)",
    DK: "F\u00e6lles M\u00e5l (Common Objectives)",
    EE: "Estonian National Curriculum",
    FI: "Finnish National Core Curriculum (OPS)",
    FR: "Programmes de l'\u00c9ducation Nationale",
    DE: "Bildungsstandards / Lehrplan",
    GR: "Greek National Curriculum",
    HU: "Nemzeti Alaptanterv (NAT)",
    IS: "Icelandic National Curriculum Guide",
    IE: "Irish National Curriculum (NCCA)",
    IT: "Indicazioni Nazionali",
    LV: "Latvian National Standard",
    LT: "Lithuanian National Curriculum",
    NL: "Kerndoelen / SLO Curriculum",
    NO: "Kunnskapsl\u00f8ftet (LK20)",
    PL: "Podstawa programowa",
    PT: "Perfil dos Alunos / Aprendizagens Essenciais",
    RO: "Romanian National Curriculum",
    RS: "Serbian Education Standards",
    SK: "\u0160t\u00e1tny vzdel\u00e1vac\u00ed program (\u0160VP)",
    SI: "Slovenian Curriculum Standards",
    ES: "LOMLOE Curriculum Framework",
    SE: "Swedish National Curriculum (Lgr22)",
    CH: "Lehrplan 21 / Plan d'\u00e9tudes romand",
    UA: "New Ukrainian School (NUS) Curriculum",

    // Asia
    BH: "Bahrain National Curriculum",
    BD: "National Curriculum and Textbook Board (NCTB)",
    CN: "Chinese National Curriculum Standards",
    HK: "Hong Kong Curriculum Framework",
    IN: "National Curriculum Framework (NCF/NCERT)",
    ID: "Kurikulum Merdeka",
    IL: "Israel National Curriculum",
    JP: "Course of Study (Gakush\u016b Shid\u014d Y\u014dry\u014d)",
    JO: "Jordanian National Curriculum",
    KZ: "Kazakhstan National Education Standards",
    KW: "Kuwait National Curriculum",
    LB: "Lebanese National Curriculum",
    MY: "Kurikulum Standard Sekolah Menengah (KSSM)",
    MN: "Mongolian National Core Curriculum",
    NP: "Nepal National Curriculum Framework",
    OM: "Oman National Curriculum",
    PK: "Single National Curriculum (SNC)",
    PH: "K to 12 Curriculum (DepEd)",
    QA: "Qatar National Curriculum Standards",
    SA: "Saudi National Curriculum",
    SG: "Singapore MOE Curriculum",
    KR: "Korean National Curriculum",
    LK: "Sri Lankan National Curriculum",
    TW: "Taiwan Curriculum Guidelines (12-Year Basic Education)",
    TH: "Thai Basic Education Core Curriculum",
    TR: "T\u00fcrkiye National Curriculum (MEB)",
    AE: "UAE National Curriculum / MOE Standards",
    VN: "Vietnam General Education Curriculum",

    // Africa
    BW: "Botswana National Curriculum",
    CM: "Cameroon National Curriculum",
    EG: "Egyptian National Curriculum",
    ET: "Ethiopian National Curriculum Framework",
    GH: "Ghana National Pre-tertiary Education Curriculum",
    KE: "Kenya Competency-Based Curriculum (CBC)",
    MA: "Moroccan National Curriculum",
    NA: "Namibian National Curriculum",
    NG: "Nigerian National Curriculum",
    RW: "Rwanda Competence-Based Curriculum (CBC)",
    ZA: "South African CAPS Curriculum",
    TZ: "Tanzania National Education Curriculum",
    TN: "Tunisian National Curriculum",
    UG: "Uganda National Curriculum",
    ZM: "Zambia Education Curriculum Framework",
    ZW: "Zimbabwe Updated Curriculum Framework",

    // Oceania
    NZ: "New Zealand Curriculum / Te Marautanga o Aotearoa",
    FJ: "Fiji National Curriculum Framework",
    PG: "Papua New Guinea National Curriculum",
  };

  return countryFrameworks[countryCode] || "National / Regional Curriculum";
}
