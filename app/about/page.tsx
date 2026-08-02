import Link from "next/link";

const consultationEmail =
  "mailto:khato.goguadze@gmail.com?subject=Free%2015-minute%20consultation&body=Hello%20Khatuna%2C%0A%0AI%20would%20like%20to%20schedule%20a%20free%2015-minute%20consultation.";

export default function AboutPage() {
  return (
    <main className="about-page">
      <header className="project-header">
        <Link className="brand" href="/#top">
          <span className="brand-mark" aria-hidden="true">
            <i />
          </span>
          <span className="brand-name">
            Khatuna Goguadze
            <small>Executive Function Trainer</small>
          </span>
        </Link>
        <Link className="back-link" href="/#about">
          ← Back home
        </Link>
      </header>

      <section className="about-page-hero">
        <div className="about-page-portrait">
          <div
            className="portrait-image"
            role="img"
            aria-label="Portrait of Khatuna Goguadze"
          />
        </div>
        <div className="about-page-intro">
          <p className="eyebrow">About Khatuna</p>
          <h1>Helping people feel understood by the way they learn.</h1>
          <p>
            Khatuna Goguadze is an Executive Function Trainer and educational
            neuroscience specialist. Her work began with a question that still
            guides her today: how can research become practical, humane support
            for a real person in everyday life?
          </p>
        </div>
      </section>

      <section className="story-section">
        <div className="story-number">01</div>
        <p className="eyebrow">The beginning</p>
        <div>
          <h2>A student with ADHD changed the direction of her work.</h2>
          <p>
            While working as a learning specialist, Khatuna saw how often
            neurodivergent students were misunderstood by education systems.
            She began studying the science behind learning, attention, and
            behavior so she could help create more inclusive environments.
          </p>
          <p>
            At MAC Georgia, she developed individualized learning plans,
            collaborated with parents, teachers, and specialists, and helped
            students connect their strengths with concrete strategies.
          </p>
        </div>
      </section>

      <section className="story-section dark-story">
        <div className="story-number">02</div>
        <p className="eyebrow">Research and education</p>
        <div>
          <h2>Rigorous research should improve everyday experience.</h2>
          <p>
            Khatuna earned an MSc in Educational Neuroscience from University
            College London and Birkbeck with First Class honors through a full
            Chevening Scholarship.
          </p>
          <p>
            As a research assistant, she contributed to the evaluation of
            London’s Youth Mental Health First Aid program in mainstream and
            special schools—deepening her commitment to translating evidence
            into useful support for children, families, and educators.
          </p>
        </div>
      </section>

      <section className="story-section">
        <div className="story-number">03</div>
        <p className="eyebrow">Creating KAIKONA</p>
        <div>
          <h2>Neuroscience learning moved beyond the classroom.</h2>
          <p>
            In 2018, Khatuna co-founded KAIKONA, a space for neuroeducation.
            Over seven years, the initiative grew into a digital platform and
            international learning community with workshops, training
            programs, public events, and more than 100 learning resources.
          </p>
          <p>
            Through KAIKONA and a weekly television segment, her work reached
            thousands of learners and helped make neuroscience approachable,
            reflective, and relevant to daily life.
          </p>
        </div>
      </section>

      <section className="about-values">
        <p className="eyebrow">How Khatuna works</p>
        <div>
          <article>
            <span>01</span>
            <h3>Listen before planning</h3>
            <p>
              Begin with the individual’s strengths, challenges, routines, and
              environment.
            </p>
          </article>
          <article>
            <span>02</span>
            <h3>Make science practical</h3>
            <p>
              Translate complex ideas into strategies that feel clear and
              usable.
            </p>
          </article>
          <article>
            <span>03</span>
            <h3>Adapt with care</h3>
            <p>
              Notice what works, stay curious, and adjust support as needs
              change.
            </p>
          </article>
        </div>
      </section>

      <section className="about-page-cta">
        <p className="eyebrow">Start with a conversation</p>
        <h2>Tell Khatuna what you would like to make easier.</h2>
        <a className="button button-large" href={consultationEmail}>
          Book a free 15-minute consultation <span aria-hidden="true">→</span>
        </a>
      </section>
    </main>
  );
}
