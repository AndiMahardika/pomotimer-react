// utils/phaseUtils.ts
export function getPhaseName(phaseNumber: number): string {
  const phases = [
    "First",
    "Second",
    "Third",
    "Fourth",
    "Fifth",
    "Sixth",
    "Seventh",
    "Eighth",
    "Ninth",
    "Tenth",
  ];
  return phases[phaseNumber - 1] || `${phaseNumber}th`;
}