import Container from '@/components/common/Container';
import Blog from '@/components/landing/Blog';
import Hero from '@/components/landing/Hero';
import Work from '@/components/landing/Projects';
import Education from '@/components/landing/Education';
import LeetCode from '@/components/landing/LeetCode';

import React from 'react';

export default function page() {
  return (
    <Container className="min-h-screen py-16">
      <Hero />
      <Work />
      <Education />
      <LeetCode />
      <Blog />
    </Container>
  );
}
