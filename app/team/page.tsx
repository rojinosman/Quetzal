export const dynamic = "force-static"

import { Navigation } from "@/components/navigation";
import { TeamMemberCard, type TeamMember } from "@/components/team-member-card";

const teamMembers: TeamMember[] = [
  {
    name: "Rojin Osman",
    role: "Electrical and Computer Engineering Team Lead",
    description:
      "Overseeing project management, systems integration, and overall design architecture.",
    image: "/images/team/Rojin.jpg",
    linkedin: "rojin-osman",
    resumeUrl: "/resumes/rojin-osman.pdf",
    resumeHighlights: [
      "BS in Computer Engineering, San Diego State University",
      "Minored in Mathematics, San Diego State University",
      "Fluent in C, Python, React, and Node.js",
      "Experience with embedded systems",

    ],
  },
  {
    name: "Utku Solmaz",
    role: "Mechanical Engineer Team Lead",
    description:
      "na",
    image: "/images/team/Utku.png",
    linkedin: "utku-solmaz",
    resumeUrl: "/resumes/utku-resume.pdf",
    resumeHighlights: [
      "Certified SolidWorks Professional",
      "Experience in composite materials fabrication",
    ],
  },
  {
    name: "Riley McGregor",
    role: "Avionics Engineer & Pilot",
    description:
      "na",
    image: "/images/team/riley.png",
    linkedin: "riley-conan-mcgregor",
    resumeUrl: "/resumes/Riley-Resume.pdf",
    resumeHighlights: [
      "na",
    ],
  },
  {
    name: "Maxwell Weaver",
    role: "Systems Integration Lead",
    description:
      "na",
    image: "/images/team/max.png",
    linkedin: "maxwell-weaver",
    resumeUrl: "/resumes/Maxwell-Weaver-Resume.pdf",
    resumeHighlights: [
      "na",
    ],
  },
  {
    name: "Jack Slaten",
    role: "Power Systems Engineer",
    description:
      "na",
    image: "/images/team/jack.png",
    linkedin: "jack-slaten",
    resumeUrl: "/resumes/jack.pdf",
    resumeHighlights: [
      "na",
    ],
  },
  {
    name: "na",
    role: "na",
    description:
      "na",
    image: "na",
    linkedin: "na",
    resumeUrl: "na",
    resumeHighlights: [
      "na",
    ],
  },
    {
    name: "na",
    role: "na",
    description:
      "na",
    image: "na",
    linkedin: "na",
    resumeUrl: "na",
    resumeHighlights: [
      "na",
    ],
  },
    {
    name: "na",
    role: "na",
    description:
      "na",
    image: "na",
    linkedin: "na",
    resumeUrl: "na",
    resumeHighlights: [
      "na",
    ],
  },
    {
    name: "na",
    role: "na",
    description:
      "na",
    image: "na",
    linkedin: "na",
    resumeUrl: "na",
    resumeHighlights: [
      "na",
    ],
  },
    {
    name: "na",
    role: "na",
    description:
      "na",
    image: "na",
    linkedin: "na",
    resumeUrl: "na",
    resumeHighlights: [
      "na",
    ],
  },
    {
    name: "na",
    role: "na",
    description:
      "na",
    image: "na",
    linkedin: "na",
    resumeUrl: "na",
    resumeHighlights: [
      "na",
    ],
  },
];

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
            <p className="mb-4 text-sm font-medium tracking-wider text-primary uppercase">
              The Team
            </p>
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-5xl text-balance">
              Meet the Engineers
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
              A diverse group of passionate students bringing together expertise
              in mechanical engineering, electronics, software development, and
              aerospace to build something extraordinary.
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              Hover over a team member to preview their resume
            </p>
          </div>
        </section>

        {/* Team Grid */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {teamMembers.map((member) => (
                <TeamMemberCard key={member.name} member={member} />
              ))}
            </div>
          </div>
        </section>

        {/* Join Section */}
        <section>
          <div className="mx-auto max-w-6xl px-6 py-20">
            <div className="rounded-xl border border-border bg-card p-8 text-center md:p-12">
              <h2 className="mb-4 text-2xl font-bold text-foreground md:text-3xl">
                Interested in Joining?
              </h2>
              <p className="mx-auto mb-6 max-w-xl text-muted-foreground">
                We are always looking for talented individuals to join our team.
                If you are passionate about drones, robotics, or aerospace
                engineering, we would love to hear from you.
              </p>
              <a
                href="mailto:team@projectfalcon.edu"
                className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card">
        <div className="mx-auto max-w-6xl px-6 py-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex size-6 items-center justify-center rounded bg-primary">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="size-4 text-primary-foreground"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <span className="text-sm font-medium text-foreground">
                Quetzal
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              A student engineering project
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
