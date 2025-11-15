import Container from '@/components/common/Container';
import { BlogContent } from '@/components/blog/BlogContent';
import { BlogList } from '@/components/blog/BlogList';
import { Separator } from '@/components/ui/separator';
import { getBlogPostBySlug, getBlogPostSlugs, getRelatedPosts } from '@/lib/blog';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getBlogPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: 'Blog post not found',
    };
  }

  const { title, description, image } = post.frontmatter;

  return {
    title: `${title} | Blog`,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post || !post.frontmatter.isPublished) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(slug, 3);

  return (
    <Container className="py-16">
      <div className="space-y-12">
        <BlogContent frontmatter={post.frontmatter} content={post.content} />

        {relatedPosts.length > 0 && (
          <section className="space-y-6">
            <Separator />
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Related posts</h2>
              <p className="text-muted-foreground">
                You might also enjoy these posts.
              </p>
            </div>
            <BlogList posts={relatedPosts} />
          </section>
        )}
      </div>
    </Container>
  );
}
