"use client";

import { useRef, useState } from "react";

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
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);
  const scrollFrameRef = useRef(0);
  const [activeService, setActiveService] = useState(0);

  const selectService = (index: number) => {
    setActiveService(index);
    const track = trackRef.current;
    const card = cardRefs.current[index];
    if (!track || !card) return;

    const targetLeft =
      card.offsetLeft - (track.clientWidth - card.clientWidth) / 2;
    track.scrollTo({
      left: Math.max(0, targetLeft),
      behavior: "smooth",
    });
  };

  const scroll = (direction: number) => {
    const next = Math.max(
      0,
      Math.min(services.length - 1, activeService + direction),
    );
    selectService(next);
  };

  const updateActiveCard = () => {
    const track = trackRef.current;
    if (!track) return;
    const trackCenter = track.getBoundingClientRect().left + track.clientWidth / 2;
    let closest = 0;
    let smallestDistance = Number.POSITIVE_INFINITY;

    cardRefs.current.forEach((card, index) => {
      if (!card) return;
      const bounds = card.getBoundingClientRect();
      const distance = Math.abs(bounds.left + bounds.width / 2 - trackCenter);
      if (distance < smallestDistance) {
        smallestDistance = distance;
        closest = index;
      }
    });
    setActiveService((current) => (current === closest ? current : closest));
  };

  const scheduleActiveCardUpdate = () => {
    if (scrollFrameRef.current) return;
    scrollFrameRef.current = requestAnimationFrame(() => {
      scrollFrameRef.current = 0;
      updateActiveCard();
    });
  };

  return (
    <>
      <div className="carousel-shell desktop-services">
      <div className="service-navigation">
        <div className="service-tabs" aria-label="Choose a service">
          {services.map((service, index) => (
            <button
              className={activeService === index ? "active" : ""}
              type="button"
              aria-pressed={activeService === index}
              aria-label={`View ${service.label} service`}
              onClick={() => selectService(index)}
              key={service.label}
            >
              <span>0{index + 1}</span>
              {service.label}
            </button>
          ))}
        </div>
        <div className="carousel-controls" aria-label="Service carousel controls">
          <button
            type="button"
            onClick={() => scroll(-1)}
            aria-label="Previous service"
            disabled={activeService === 0}
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => scroll(1)}
            aria-label="Next service"
            disabled={activeService === services.length - 1}
          >
            →
          </button>
        </div>
      </div>

      <div
        className="service-track"
        ref={trackRef}
        onScroll={scheduleActiveCardUpdate}
      >
        {services.map((service, index) => (
          <article
            className="service-card"
            aria-label={`${service.label} service`}
            ref={(element) => {
              cardRefs.current[index] = element;
            }}
            key={service.label}
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
        ))}
      </div>
      </div>

      <div className="mobile-services" aria-label="Services">
        {services.map((service, index) => (
          <details className="mobile-service" open={index === 0} key={service.label}>
          <summary>
            <span>{service.number}</span>
            <strong>{service.label}</strong>
            <i aria-hidden="true" />
          </summary>
          <div className="mobile-service-panel">
            <div className={`service-art ${service.className}`} aria-hidden="true">
              <span />
              <i />
              <b />
              <em />
            </div>
            <div className="service-content">
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
          </div>
          </details>
        ))}
      </div>
    </>
  );
}
