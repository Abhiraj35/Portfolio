import React from 'react';

import EducationAccordion from '../education/EducationAccordion';
import Container from '../common/Container';
import SectionHeading from '../common/SectionHeading';

export default function Education() {
  return (
    <Container className="mt-20">
      <SectionHeading subHeading="Abhiraj's" heading="Education" />

      <div className="mt-8">
        <EducationAccordion />
      </div>
    </Container>
  );
}
