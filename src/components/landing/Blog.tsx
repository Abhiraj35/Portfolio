import { getPublishedBlogPosts } from '@/lib/blog';
import Link from 'next/link';
import React from 'react';

import Container from '@/components/common/Container';
import SectionHeading from '@/components/common/SectionHeading';

export default function Blog() {
  const posts = getPublishedBlogPosts();

  return (
    <Container className="mt-20">
      <SectionHeading subHeading="Featured" heading="Blogs" />
      {posts.length === 0 ? (
        <div className="mt-8 text-secondary">No posts found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          {posts.slice(0, 2).map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="p-4 border rounded-lg">
              <h3 className="text-lg font-semibold">{post.frontmatter.title}</h3>
              <p className="text-sm text-secondary line-clamp-3">{post.frontmatter.description}</p>
            </Link>
          ))}
        </div>
      )}
      <div className="mt-8 flex justify-center">
        <Link href="/blog" className="border rounded-md px-3 py-2 text-sm">
          Show all blogs
        </Link>
      </div>
    </Container>
  );
}