import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "../projectData";

export const metadata: Metadata = {
  title: "Projects | Khatuna Goguadze",
  description:
    "Explore Khatuna Goguadze's neuroscience education, public learning, and individualized support projects.",
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Projects | Khatuna Goguadze",
    description:
      "Neuroscience education and individualized learning projects designed to make complex ideas useful in everyday life.",
    url: "/projects",
  },
};

export default function ProjectsPage() {
  return (
    <main className="project-page">
      <header className="project-header">
        <Link className="brand" href="/#top">
          <span className="brand-name">
            Khatuna Goguadze
            <small>Executive Function Trainer</small>
          </span>
        </Link>
        <Link className="back-link" href="/#projects">
          ← Back home
        </Link>
      </header>

      <section className="projects-section projects-index-section">
        <div className="section projects-heading">
          <div>
            <p className="eyebrow">All projects</p>
            <h1>Learning experiences designed to travel.</h1>
          </div>
          <p>
            Explore projects that translate neuroscience, learning research,
            and individualized support into practical experiences.
          </p>
        </div>

        <div className="project-list section">
          {projects.map((project, index) => (
            <Link
              className={`project-card project-visual-${index + 1}`}
              href={`/projects/${project.slug}`}
              key={project.slug}
            >
              <div className="project-visual" aria-hidden="true">
                <span />
                <i />
                <b />
              </div>
              <div className="project-summary">
                <p>
                  {project.format} · {project.duration}
                </p>
                <h2>{project.title}</h2>
                <span>
                  Read project story <b aria-hidden="true">↗</b>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
