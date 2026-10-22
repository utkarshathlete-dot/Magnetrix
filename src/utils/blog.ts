/**
 * Pure data and calculation helpers for Blog Section & Dedicated Blog Page
 */

export interface BlogPost {
  id: string;
  category: string;
  title: string;
  teaser: string;
  readTime: string;
  publishDate: string;
  author: {
    name: string;
    role: string;
    initials: string;
  };
  keyTakeaway: string;
  fullOverview?: string[];
  tags?: string[];
}

export function calculateMaxSlideIndex(totalItems: number, itemsPerSlide: number): number {
  if (totalItems <= 0 || itemsPerSlide <= 0) return 0;
  return Math.max(0, Math.ceil(totalItems / itemsPerSlide) - 1);
}

export function getNextSlideIndex(currentIndex: number, maxIndex: number): number {
  return currentIndex >= maxIndex ? 0 : currentIndex + 1;
}

export function getPrevSlideIndex(currentIndex: number, maxIndex: number): number {
  return currentIndex <= 0 ? maxIndex : currentIndex - 1;
}

export function getVisiblePosts(
  posts: BlogPost[],
  page: number,
  pageSize: number
): BlogPost[] {
  const start = page * pageSize;
  return posts.slice(start, start + pageSize);
}

export function filterBlogPosts(
  posts: BlogPost[],
  category: string,
  searchQuery: string
): BlogPost[] {
  const query = searchQuery.trim().toLowerCase();

  return posts.filter((post) => {
    const matchesCategory =
      category === 'all' ||
      post.category.toLowerCase().includes(category.toLowerCase()) ||
      category.toLowerCase().includes(post.category.toLowerCase());

    if (!matchesCategory) return false;

    if (!query) return true;

    return (
      post.title.toLowerCase().includes(query) ||
      post.teaser.toLowerCase().includes(query) ||
      post.keyTakeaway.toLowerCase().includes(query) ||
      post.author.name.toLowerCase().includes(query) ||
      (post.tags && post.tags.some((t) => t.toLowerCase().includes(query))) ||
      (post.fullOverview && post.fullOverview.some((p) => p.toLowerCase().includes(query)))
    );
  });
}

export function validateNewsletterEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

export function calculateEstimatedReadTime(wordCount: number): string {
  if (wordCount <= 0) return '1 min read';
  const minutes = Math.ceil(wordCount / 200);
  return `${minutes} min read`;
}
