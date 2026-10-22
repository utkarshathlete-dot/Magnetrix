/**
 * Types and helper functions for Client Success Stories
 */

export interface ClientSuccessStory {
  id: string;
  client: string;
  industry: 'saas' | 'cloud' | 'fintech' | 'adtech';
  industryLabel: string;
  metricBadge: string;
  metricHighlight: string;
  quote: string;
  author: {
    name: string;
    role: string;
    company: string;
    avatarColor: string;
    initials: string;
  };
}

export function filterSuccessStories<T extends ClientSuccessStory>(
  stories: T[],
  industryFilter: string
): T[] {
  if (!industryFilter || industryFilter === 'all') return stories;
  return stories.filter((s) => s.industry === industryFilter);
}

export function truncateQuote(quote: string, maxLength: number): string {
  if (quote.length <= maxLength) return quote;
  return `${quote.slice(0, maxLength).trim()}...`;
}
