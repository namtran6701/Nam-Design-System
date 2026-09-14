import { useId, useMemo, useRef } from "react";
import { ScrollProgress } from "../../registry/scroll-progress";

export function ScrollProgressPreview() {
  const id = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const sections = useMemo(
    () =>
      ["Overview", "Typography", "Layout", "Motion"].map((label, index) => ({
        id: `${id}-${index}`,
        label,
      })),
    [id],
  );
  return (
    <div className="mobile-scroll-example">
      <div
        ref={containerRef}
        className="mobile-scroll-content"
        role="region"
        aria-label="Mobile scrolling demo"
        tabIndex={0}
      >
        {sections.map((section, index) => (
          <section key={section.id} id={section.id}>
            <span>0{index + 1}</span>
            <h3>{section.label}</h3>
            <p>
              {
                [
                  "Start with a clear purpose and a simple structure.",
                  "Give every heading and paragraph room to breathe.",
                  "Use spacing to bring related content together.",
                  "Let movement make changes easier to follow.",
                ][index]
              }
            </p>
          </section>
        ))}
      </div>
      <ScrollProgress
        containerRef={containerRef}
        sections={sections}
        offset={16}
        className="absolute bottom-4 lg:block"
      />
    </div>
  );
}
