// src/components/Section.tsx
import React, { ReactNode } from "react";

type SectionProps = {
  sectionClass?: string;
  id?: string;
  ariaLabel?: string;
  content: ReactNode;
  imageContent: ReactNode;
  reverse?: boolean; // por defecto false
};

const Section: React.FC<SectionProps> = ({
  sectionClass = "",
  id,
  ariaLabel,
  content,
  imageContent,
  reverse = false,
}) => {
  return (
    <section className={`section ${sectionClass}`} id={id} aria-label={ariaLabel}>
      {reverse ? (
        <>
          <div className="image-column">{imageContent}</div>
          <div className="content-column">{content}</div>
        </>
      ) : (
        <>
          <div className="content-column">{content}</div>
          <div className="image-column">{imageContent}</div>
        </>
      )}
    </section>
  );
};

export default Section;
