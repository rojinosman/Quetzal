export const dynamic = "force-static"

import { Navigation } from "@/components/navigation";
import { TeamMemberCard, type TeamMember } from "@/components/team-member-card";

const meTeam: TeamMember[] = [
  {
    name: "Utku Solmaz",
    role: "ME Lead",
    description:
      "Mechanical Engineering team. Leading mechanical design and fabrication efforts.",
    image: "/images/team/utku.jpg",
    linkedin: "utku-solmaz",
    resumeUrl: "/resumes/utku-resume.pdf",
    resumeHighlights: [
      "Certified SolidWorks Professional",
      "Experience in composite materials fabrication",
    ],
  },
  {
    name: "Laith Abouhasoun",
    role: "Procurement Lead",
    description: "Mechanical Engineering team.",
    image: "/images/team/laith.jpg",
    linkedin: "laith-abouhasoun-482132227",
    resumeUrl: "",
    resumeHighlights: [],
  },
  {
    name: "Christian Mandigma",
    role: "Mechanical Design Engineer",
    description: "Mechanical Engineering team.",
    image: "/images/team/ChristianM.jpg",
    linkedin: "christian-mandigma-3b0477182",
    resumeUrl: "",
    resumeHighlights: [],
  },
  {
    name: "Jonah Olsen",
    role: "Mechanical Design Engineer",
    description: "Mechanical Engineering team.",
    image: "/images/team/jonah.jpg",
    linkedin: "jonaholsen",
    resumeUrl: "",
    resumeHighlights: [],
  },
  {
    name: "Gavin Rask",
    role: "Structures Engineer",
    description: "Mechanical Engineering team.",
    image: "/images/team/gavin.jpg",
    linkedin: "gavin-rask-99213a386",
    resumeUrl: "",
    resumeHighlights: [],
  },
];

const aeTeam: TeamMember[] = [
  {
    name: "Cristian Rosete",
    role: "AE Lead",
    description: "Aerospace Engineering team.",
    image: "/images/team/cristian.jpg",
    linkedin: "cristian-j-rosete",
    resumeUrl: "",
    resumeHighlights: [],
  },
  {
    name: "Maxwell Weaver",
    role: "Mechanical Integration Engineer",
    description: "Aerospace Engineering team.",
    image: "/images/team/max.jpg",
    linkedin: "maxwell-weaver",
    resumeUrl: "/resumes/Maxwell-Weaver-Resume.pdf",
    resumeHighlights: [],
  },
  {
    name: "Kyle Loutzenhiser",
    role: "Aerodynamics Engineer",
    description: "Aerospace Engineering team.",
    image: "/images/team/kyle.jpg",
    linkedin: "",
    resumeUrl: "",
    resumeHighlights: [],
  },
  {
    name: "Peter Husch",
    role: "Performance Engineer",
    description: "Aerospace Engineering team.",
    image: "/images/team/peter.jpg",
    linkedin: "peter-husch-2ab325235",
    resumeUrl: "",
    resumeHighlights: [],
  },
];

const eceTeam: TeamMember[] = [
  {
    name: "Rojin Osman",
    role: "ECE Lead",
    description:
      "Electrical and Computer Engineering team. Overseeing project management, systems integration, and overall design architecture.",
    image: "/images/team/Rojin.JPG",
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
    name: "Riley McGregor",
    role: "Avionics Integration Engineer",
    description: "Electrical and Computer Engineering team. Avionics systems integration and flight operations.",
    image: "/images/team/riley.jpg",
    linkedin: "riley-conan-mcgregor",
    resumeUrl: "/resumes/Riley-Resume.pdf",
    resumeHighlights: [],
  },
  {
    name: "Ismael Villavicencio",
    role: "Electrical Integration Engineer",
    description: "Electrical and Computer Engineering team.",
    image: "/images/team/ismael.jpg",
    linkedin: "ismael-villavicencio-111090347",
    resumeUrl: "",
    resumeHighlights: [],
  },
  {
    name: "Jack Slaten",
    role: "Power Systems Engineer",
    description: "Electrical and Computer Engineering team.",
    image: "/images/team/jack.jpg",
    linkedin: "jack-slaten",
    resumeUrl: "/resumes/jack.pdf",
    resumeHighlights: [],
  },
  {
    name: "Burak Ozhan",
    role: "Control Systems Engineer",
    description: "Electrical and Computer Engineering team.",
    image: "/images/team/burak.jpg",
    linkedin: "burak-ozhan",
    resumeUrl: "",
    resumeHighlights: [],
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

        {/* Team Grid - 3 columns: ME (left), AE (middle), ECE (right) */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <div className="grid gap-8 lg:grid-cols-3">
              {/* ME - Left column */}
              <div className="flex flex-col gap-6">
                <h2 className="text-lg font-semibold text-foreground">Mechanical Engineering</h2>
                {meTeam.map((member) => (
                  <TeamMemberCard key={member.name} member={member} />
                ))}
              </div>
              {/* AE - Middle column */}
              <div className="flex flex-col gap-6">
                <h2 className="text-lg font-semibold text-foreground">Aerospace Engineering</h2>
                {aeTeam.map((member) => (
                  <TeamMemberCard key={member.name} member={member} />
                ))}
              </div>
              {/* ECE - Right column */}
              <div className="flex flex-col gap-6">
                <h2 className="text-lg font-semibold text-foreground">Electrical & Computer Engineering</h2>
                {eceTeam.map((member) => (
                  <TeamMemberCard key={member.name} member={member} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Questions Section */}
        <section>
          <div className="mx-auto max-w-6xl px-6 py-20">
            <div className="rounded-xl border border-border bg-card p-8 text-center md:p-12">
              <h2 className="mb-4 text-2xl font-bold text-foreground md:text-3xl">
                Have Questions?
              </h2>
              <p className="mx-auto mb-6 max-w-xl text-muted-foreground">
                Interested in our project? Reach out to our team if you have any
                questions.
              </p>
              <a
                href="mailto:rojinosman1988@gmail.com"
                className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-card/30 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-6 py-4">
          <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:justify-between">
            <img
              src="/Quetzal-logo.png"
              alt="Quetzal"
              width={164}
              height={164}
            />
            <a
                href="mailto:rojinosman1988@gmail.com"
                className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Connect with the team
              </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
