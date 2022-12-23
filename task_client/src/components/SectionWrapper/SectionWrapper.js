import React from "react";

const SectionWrapper = ({ children, className }) => {
  return (
    <section className={`container mx-auto min-h-screen ${className}`}>
      {children}
    </section>
  );
};

export default SectionWrapper;
