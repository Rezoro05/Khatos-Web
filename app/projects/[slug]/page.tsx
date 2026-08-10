import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "../../projectData";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) return {};

  const path = `/projects/${project.slug}`;
  return {
    title: `${project.title} | Khatuna Goguadze`,
    description: project.description,
    alternates: { canonical: path },
    openGraph: {
      title: project.title,
      description: project.description,
      url: path,
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();

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
          ← All projects
        </Link>
      </header>

      <article>
        <div className={`project-key-visual ${project.theme}`}>
          <span />
          <i />
          <b />
          <em />
        </div>
        <div className="project-article-copy">
          <p className="eyebrow">{project.eyebrow}</p>
          <h1>{project.title}</h1>
          <p className="project-intro">{project.description}</p>

          <dl>
            <div>
              <dt>Format</dt>
              <dd>{project.format}</dd>
            </div>
            <div>
              <dt>Audience</dt>
              <dd>{project.audience}</dd>
            </div>
            <div>
              <dt>Duration</dt>
              <dd>{project.duration}</dd>
            </div>
          </dl>

          <section>
            <p className="eyebrow">Impact</p>
            <h2>{project.outcome}</h2>
          </section>

          <Link className="button button-large" href="/#contact">
            Start a conversation <span aria-hidden="true">→</span>
          </Link>
        </div>
      </article>
    </main>
  );
}
