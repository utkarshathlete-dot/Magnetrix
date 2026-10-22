/**
 * Pure data and logic helpers for About Us section
 */

export interface TeamLeader {
  id: string;
  name: string;
  role: string;
  background: string;
  expertise: string[];
}

export interface OperatingPrinciple {
  number: string;
  title: string;
  summary: string;
  deliverableFocus: string;
}

export function filterTeamByExpertise(
  leaders: TeamLeader[],
  expertiseTag?: string
): TeamLeader[] {
  if (!expertiseTag || expertiseTag === 'all') return leaders;
  return leaders.filter((leader) =>
    leader.expertise.some((e) => e.toLowerCase() === expertiseTag.toLowerCase())
  );
}

export function calculateCompanyTenure(foundedYear: number, currentYear: number): number {
  return Math.max(0, currentYear - foundedYear);
}
