"use client";

import { BriefcaseBusiness } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { experienceTimeline } from "@/lib/portfolioInteractions";

export function ExperienceTimeline() {
  const experiences = [...experienceTimeline].reverse();
  return (
    <div className="experience-journey">
      <div className="experience-journey-key" aria-hidden="true">
        <span>
          <i className="experience-key-dot experience-key-dot-current" />{" "}
          Current role
        </span>
        <span>
          <i className="experience-key-dot" /> Earlier experience
        </span>
      </div>
      <Accordion
        type="single"
        collapsible
        defaultValue={experiences[0]?.id}
        className="experience-accordion"
      >
        {experiences.map((item, index) => (
          <AccordionItem
            key={item.id}
            value={item.id}
            className="experience-item"
          >
            <div className="experience-header">
              <AccordionTrigger className="experience-trigger">
                <span className="experience-rail" aria-hidden="true">
                  <span
                    className={`experience-marker ${index === 0 ? "is-current" : ""}`}
                  >
                    <BriefcaseBusiness size={15} />
                  </span>
                </span>
                <span className="experience-summary">
                  <span className="experience-period">{item.period}</span>
                  <strong>{item.role}</strong>
                </span>
              </AccordionTrigger>
              <a
                href={item.companyUrl}
                target="_blank"
                rel="noreferrer"
                className="experience-company-link"
              >
                {item.company}
              </a>
            </div>
            <AccordionContent className="experience-content">
              <p>{item.summary}</p>
              <ul
                className="editorial-tech"
                aria-label={`${item.company} technologies`}
              >
                {item.tools.map(tool => (
                  <li key={tool}>{tool}</li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
