export const projects = [
  {
    slug: "kaikona-neuroeducation",
    title: "KAIKONA: A Space for Neuroeducation",
    eyebrow: "Making neuroscience accessible",
    description:
      "Georgia’s first neuroscience-based digital education platform brought research-informed learning resources and live programs to schools, communities, and public audiences.",
    outcome:
      "More than 100 digital resources, 30+ education programs, 27,000+ participants, and 10,000 learners reached through the platform.",
    format: "Digital platform + group programs",
    audience: "Learners, educators, families, and communities",
    role: "Founder and neuroeducation program designer",
    duration: "2018–2025",
    theme: "coral",
  },
  {
    slug: "architect-of-your-brain",
    title: "Become an Architect of Your Brain",
    eyebrow: "Public neuroscience education",
    description:
      "A weekly television segment translated neuroscience into engaging, everyday language, helping a broad public audience think differently about learning, behavior, and the brain.",
    outcome:
      "Reached more than 200,000 viewers and increased public engagement with neuroscience-based learning.",
    format: "Weekly television series",
    audience: "Public audience",
    role: "Creator and on-screen neuroscience educator",
    duration: "Ongoing weekly format",
    theme: "night",
  },
  {
    slug: "individualized-learning-plans",
    title: "Individualized Learning Plans",
    eyebrow: "Learning support for neurodivergent students",
    description:
      "Individualized plans connected each student’s strengths and needs with practical school-based strategies, while keeping teachers, parents, and specialists aligned.",
    outcome:
      "Students with ADHD achieved a 10% increase in MAP scores, supported by regular IEP collaboration and progress reporting.",
    format: "Individual support + team collaboration",
    audience: "Students with special education needs",
    role: "Learning support specialist and plan facilitator",
    duration: "2015–2017",
    theme: "green",
  },
] as const;

export type Project = (typeof projects)[number];
