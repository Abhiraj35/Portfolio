import Container from '@/components/common/Container';
import { BlogList } from '@/components/blog/BlogList';
import { Separator } from '@/components/ui/separator';
import { generateMetadata as getMetadata } from '@/config/Meta';
import { getPublishedBlogPosts } from '@/lib/blog';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  ...getMetadata('/blog'),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function BlogPage() {
  const posts = getPublishedBlogPosts();

  return (
    <Container className="py-16">
      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
            Blog
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Thoughts, deep dives, and tutorials on engineering and web development.
          </p>
        </div>

        <Separator />

        {/* Blog posts */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Latest Posts</h2>
          </div>

          <BlogList posts={posts} />
        </div>
      </div>
    </Container>
  );
}
