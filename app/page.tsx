import Link from "next/link";
import MobileMenu from "./MobileMenu";
import NeuralBrain from "./NeuralBrain";
import ServicesCarousel from "./ServicesCarousel";
import { projects } from "./projectData";

const consultationEmail =
  "mailto:khato.goguadze@gmail.com?subject=Free%2015-minute%20consultation&body=Hello%20Khatuna%2C%0A%0AI%20would%20like%20to%20schedule%20a%20free%2015-minute%20consultation.%0A%0AI%20am%20reaching%20out%20for%3A%20%0APreferred%20days%20or%20times%3A%20%0A%0AThank%20you.";

const organizations = [
  "KAIKONA",
  "UCL",
  "CHEVENING",
  "MJHS",
  "MAC GEORGIA",
  "BANK OF GEORGIA",
];

const testimonials = [
  {
    quote:
      "Khatuna helped us replace daily frustration with a structure our family could actually use. The changes felt thoughtful, practical, and possible.",
    byline: "Parent of a child age 9",
  },
  {
    quote:
      "The sessions made attention and memory feel less mysterious. I left with clear tools and a much kinder understanding of how my mind works.",
    byline: "Adult participant",
  },
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Khatuna Goguadze home">
          <span className="brand-mark" aria-hidden="true">
            <i />
          </span>
          <span className="brand-name">
            Khatuna Goguadze
            <small>Executive Function Trainer</small>
          </span>
        </a>

        <nav className="desktop-navigation" aria-label="Primary navigation">
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#projects">Projects</a>
        </nav>

        <MobileMenu />

        <a className="button button-small" href={consultationEmail}>
          Free consultation <span aria-hidden="true">↗</span>
        </a>
      </header>

      <section className="hero" id="top" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">Executive function support, grounded in neuroscience</p>
          <h1 id="hero-title">
            Practical strategies for focus, memory, and everyday independence.
          </h1>
          <p className="hero-intro">
            Individualized support for children ages 5–12, people navigating
            ADHD-related challenges, and adults age 65+.
          </p>
          <a className="text-link" href="#services">
            Explore the work <span aria-hidden="true">↓</span>
          </a>
        </div>
        <NeuralBrain />
      </section>

      <blockquote className="quote-band">
        <p>
          “Where attention goes, neural firing flows, and neural connection
          grows.”
        </p>
        <cite>Daniel J. Siegel</cite>
      </blockquote>

      <section className="about section" id="about">
        <div className="portrait-wrap">
          <div
            className="portrait-image"
            role="img"
            aria-label="Portrait of Khatuna Goguadze"
          />
          <p className="portrait-caption">Khatuna Goguadze</p>
        </div>

        <div className="about-copy">
          <p className="eyebrow">Meet Khatuna</p>
          <h2>Science translated into everyday progress.</h2>
          <p className="lead">
            Khatuna Goguadze is an Executive Function Trainer with an MSc in
            Educational Neuroscience and more than eight years of experience
            helping people understand how they learn, focus, remember, and
            organize.
          </p>
          <p>
            Her work combines research with practical, individualized
            strategies. She has designed learning programs, supported students
            with ADHD, and brought neuroscience education to thousands of
            learners, families, and educators.
          </p>
          <Link className="about-more" href="/about">
            Read more about Khatuna <span aria-hidden="true">↗</span>
          </Link>

          <div className="credential-panel">
            <div>
              <span>MSc</span>
              <p>Educational Neuroscience</p>
            </div>
            <div>
              <span>8+</span>
              <p>Years of experience</p>
            </div>
            <div>
              <span>27K+</span>
              <p>Program participants</p>
            </div>
          </div>
        </div>
      </section>

      <section className="services-section" id="services">
        <div className="section services-heading">
          <div>
            <p className="eyebrow">Services</p>
            <h2>Different needs. A thoughtful way forward.</h2>
          </div>
          <p>
            Select a service to explore the focus, format, and kind of support
            Khatuna can provide.
          </p>
        </div>
        <ServicesCarousel consultationEmail={consultationEmail} />
      </section>

      <section className="organizations" aria-labelledby="organizations-title">
        <p className="eyebrow" id="organizations-title">
          Experience and collaboration across
        </p>
        <div className="organization-track">
          {organizations.map((organization) => (
            <span key={organization}>{organization}</span>
          ))}
        </div>
      </section>

      <section className="testimonials section" id="testimonials">
        <div className="testimonial-heading">
          <p className="eyebrow">Kind words</p>
          <h2>What the experience can feel like.</h2>
          <p className="placeholder-note">
            Sample testimonials — to be replaced with verified client words.
          </p>
        </div>
        <div className="testimonial-grid">
          {testimonials.map((testimonial, index) => (
            <blockquote key={testimonial.byline}>
              <span aria-hidden="true">“</span>
              <p>{testimonial.quote}</p>
              <footer>
                <i />
                <cite>{testimonial.byline}</cite>
                <small>Example only</small>
              </footer>
              <b>0{index + 1}</b>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="projects-section" id="projects">
        <div className="section projects-heading">
          <div>
            <p className="eyebrow">Selected projects</p>
            <h2>Learning experiences designed to travel.</h2>
          </div>
          <p>
            From individual learning plans to public neuroscience education,
            each project turns complex ideas into useful experiences.
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
                <h3>{project.title}</h3>
                <span>
                  Read project story <b aria-hidden="true">↗</b>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="before section" id="contact">
        <div>
          <p className="eyebrow">Before we begin</p>
          <h2>Let’s understand what support could look like.</h2>
        </div>
        <div className="before-copy">
          <p>
            Start with a free 15-minute conversation about current challenges,
            goals, and the format that may be most useful. There is no
            commitment.
          </p>
          <ul>
            <li>For parents of children ages 5–12</li>
            <li>For people navigating ADHD-related challenges</li>
            <li>For adults age 65+ and their families</li>
            <li>Individual, family, or small-group formats</li>
          </ul>
          <a className="button button-large" href={consultationEmail}>
            Book a free 15-minute consultation <span aria-hidden="true">→</span>
          </a>
          <a className="email-link" href="mailto:khato.goguadze@gmail.com">
            Or email khato.goguadze@gmail.com
          </a>
          <p className="scope">
            I offer structured executive function strategies that complement
            clinical care and support daily functioning. This may include
            attention exercises, planning everyday tasks, organization
            systems, and goal-based activities. When appropriate, I
            collaborate with family members and coordinate with licensed
            clinicians to reinforce established therapy plans.
          </p>
        </div>
      </section>

      <footer className="site-footer">
        <div>
          <span className="brand-mark light" aria-hidden="true">
            <i />
          </span>
          <p>Khatuna Goguadze</p>
          <small>Executive Function Trainer</small>
        </div>
        <div>
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </div>
        <p>© {new Date().getFullYear()} Khatuna Goguadze</p>
      </footer>
    </main>
  );
}
