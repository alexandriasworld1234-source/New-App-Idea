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
      return state && NON_NGSS_STATES.includes(state) ? "us_state" : "ngss";
    case "GB":
      return "uk_national";
    case "AU":
      return "acara";
    default:
      return "custom";
  }
}

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
    custom: "Custom Standards",
  };
  return names[code];
}
