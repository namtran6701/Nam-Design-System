import { useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { HookSidebar } from "../../registry/hook-sidebar";

const sections = [
  {
    label: "Overview",
    text: "Start with a clear purpose and a simple structure.",
  },
  {
    label: "Typography",
    text: "Give every heading and paragraph room to breathe.",
  },
  { label: "Layout", text: "Use spacing to bring related content together." },
  { label: "Motion", text: "Let movement make changes easier to follow." },
];

export function HookSidebarPreview() {
  const [active, setActive] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  return (
    <div className="hook-example">
      <p className="hook-mobile-note">Desktop preview · 1024px and wider</p>
      <div className="hook-desktop-preview">
        <HookSidebar
          label="On this page"
          items={sections.map((section) => section.label)}
          value={active}
          onChange={(index) => {
            const container = scrollRef.current;
            const section = container?.children[index] as
              HTMLElement | undefined;
            if (container && section) {
              container.scrollTo({
                top: section.offsetTop,
                behavior: reduced ? "instant" : "smooth",
              });
            }
          }}
        />
        <div
          ref={scrollRef}
          className="hook-scroll-content"
          tabIndex={0}
          role="region"
          aria-label="Scrolling navigation demo"
          onScroll={(event) => {
            const container = event.currentTarget;
            const index = Array.from(container.children).reduce(
              (current, child, i) =>
                (child as HTMLElement).offsetTop <= container.scrollTop + 30
                  ? i
                  : current,
              0,
            );
            setActive(index);
          }}
        >
          {sections.map((section) => (
            <section key={section.label}>
              <h3>{section.label}</h3>
              <p>{section.text}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
