import type { ReactNode } from "react";

export function SectionHeading({ eyebrow, title, children, align = "left" }: { eyebrow: string; title: string; children?: ReactNode; align?: "left" | "center" }) {
  return (
    <div className={`section-heading ${align === "center" ? "section-heading-center" : ""}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {children ? <div className="section-lead">{children}</div> : null}
    </div>
  );
}
