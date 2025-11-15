import React from "react";
import { educationData } from "@/config/Education";
import EducationTimelineItem from "../ui/EducationTimeline";
import Container from "../common/Container";
import SectionHeading from "../common/SectionHeading";

export default function Education() {
  return (
    <Container className="mt-20">
      <SectionHeading subHeading="Abhiraj's" heading="Education" />

      <div className="mt-8 flex justify-center border border-border rounded-md">
        <div className="space-y-8 mt-8">
          {educationData.map((edu, i) => (
            <EducationTimelineItem key={edu.institution + i} education={edu} />
          ))}
        </div>
      </div>
    </Container>
  );
}
