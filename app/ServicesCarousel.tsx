"use client";

import { useId, useState } from "react";

const services = [
  {
    number: "01",
    label: "Children",
    title: "Build the skills behind confident learning.",
    description:
      "Support for focus, working memory, organization, routines, task initiation, flexible thinking, and following multi-step instructions.",
    format:
      "Parent consultation, individual child sessions, or family-supported practice.",
    className: "children",
  },
  {
    number: "02",
    label: "ADHD",
    title: "Work with the brain, not against it.",
    description:
      "Practical strategies for attention, planning, emotional regulation, working memory, starting tasks, and following through.",
    format:
      "Individualized sessions with optional parent or family participation.",
    className: "adhd",
  },
  {
    number: "03",
    label: "Older adults",
    title: "Support memory, focus, and everyday independence.",
    description:
      "Respectful support for remembering information and appointments, sustaining attention, planning routines, and staying engaged.",
    format:
      "Individual sessions, family consultations, or small-group learning.",
    className: "older",
  },
];

export default function ServicesCarousel({
  consultationEmail,
}: {
  consultationEmail: string;
}) {
  const [activeService, setActiveService] = useState(0);
  const tabId = useId();
  const service = services[activeService];

  return (
    <div className="service-selector">
      <div className="service-tabs" role="tablist" aria-label="Choose a service">
        {services.map((item, index) => (
          <button
            className={activeService === index ? "active" : ""}
            type="button"
            role="tab"
            aria-selected={activeService === index}
            aria-controls={`${tabId}-panel`}
            id={`${tabId}-tab-${index}`}
            onClick={() => setActiveService(index)}
            key={item.label}
          >
            <span>{item.number}</span>
            {item.label}
          </button>
        ))}
      </div>

      <article
        className="service-card"
        role="tabpanel"
        id={`${tabId}-panel`}
        aria-labelledby={`${tabId}-tab-${activeService}`}
      >
        <div className={`service-art ${service.className}`} aria-hidden="true">
          <span />
          <i />
          <b />
          <em />
        </div>
        <div className="service-content">
          <p className="service-number">{service.number}</p>
          <p className="service-label">{service.label}</p>
          <h3>{service.title}</h3>
          <p>{service.description}</p>
          <div className="format">
            <span>Format</span>
            <p>{service.format}</p>
          </div>
          <a href={consultationEmail}>
            Discuss this service <span aria-hidden="true">↗</span>
          </a>
        </div>
      </article>
    </div>
  );
}
