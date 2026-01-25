import { Navigation } from "@/components/navigation";
import { TeamMemberCard, type TeamMember } from "@/components/team-member-card";

const teamMembers: TeamMember[] = [
  {
    name: "Sarah Chen",
    role: "Project Lead & Systems Engineer",
    description:
      "Leading the overall project direction and integrating all drone subsystems. Specializes in embedded systems and flight control software development.",
    image: "/images/team/sarah-chen.jpg",
    linkedin: "sarahchen-engineer",
    resumeUrl: "/resumes/sarah-chen.pdf",
    resumeHighlights: [
      "BS in Electrical Engineering, Stanford",
      "Previous internship at SpaceX - Avionics",
      "Published research on autonomous flight systems",
      "Fluent in C++, Python, MATLAB",
    ],
  },
  {
    name: "Marcus Johnson",
    role: "Mechanical Engineer",
    description:
      "Designed and manufactured the carbon fiber frame. Expert in CAD modeling, 3D printing, and materials engineering for aerospace applications.",
    image: "/images/team/marcus-johnson.jpg",
    linkedin: "marcusjohnson-mech",
    resumeUrl: "/resumes/marcus-johnson.pdf",
    resumeHighlights: [
      "MS in Mechanical Engineering, MIT",
      "Certified SolidWorks Professional",
      "Experience in composite materials fabrication",
      "Led university FSAE team to nationals",
    ],
  },
  {
    name: "Priya Patel",
    role: "Electronics Engineer",
    description:
      "Responsible for all electrical systems including power distribution, sensor integration, and PCB design for the flight controller interface.",
    image: "/images/team/priya-patel.jpg",
    linkedin: "priyapatel-ee",
    resumeUrl: "/resumes/priya-patel.pdf",
    resumeHighlights: [
      "BS in Electrical Engineering, Georgia Tech",
      "PCB design using Altium Designer",
      "Internship at Tesla - Power Electronics",
      "Ham radio operator and RF enthusiast",
    ],
  },
  {
    name: "James Wilson",
    role: "Software Developer",
    description:
      "Developing the ground control software and telemetry systems. Building real-time data visualization and autonomous flight path planning algorithms.",
    image: "/images/team/james-wilson.jpg",
    linkedin: "jameswilson-dev",
    resumeUrl: "/resumes/james-wilson.pdf",
    resumeHighlights: [
      "BS in Computer Science, UC Berkeley",
      "Full-stack development experience",
      "Contributed to open-source flight software",
      "Expertise in React, Node.js, and ROS",
    ],
  },
  {
    name: "Emily Rodriguez",
    role: "Aerodynamics Specialist",
    description:
      "Conducting CFD analysis and optimizing propeller configurations for maximum efficiency. Research focus on low Reynolds number aerodynamics.",
    image: "/images/team/emily-rodriguez.jpg",
    linkedin: "emilyrodriguez-aero",
    resumeUrl: "/resumes/emily-rodriguez.pdf",
    resumeHighlights: [
      "MS in Aerospace Engineering, CalTech",
      "Expert in ANSYS Fluent and OpenFOAM",
      "Published in Journal of Fluid Mechanics",
      "NASA research fellowship recipient",
    ],
  },
  {
    name: "David Kim",
    role: "Test Engineer",
    description:
      "Managing all testing procedures including flight tests, hardware validation, and safety protocols. Ensures compliance with FAA regulations.",
    image: "/images/team/david-kim.jpg",
    linkedin: "davidkim-test",
    resumeUrl: "/resumes/david-kim.pdf",
    resumeHighlights: [
      "BS in Aerospace Engineering, Purdue",
      "FAA Part 107 certified drone pilot",
      "Experience in test automation systems",
      "Quality assurance methodology expert",
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
                Project Falcon
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
