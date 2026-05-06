"use client";

import * as React from "react";
import Image from "next/image";
import { Linkedin, FileText, Briefcase } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export interface TeamMember {
  name: string;
  role: string;
  description: string;
  image: string;
  linkedin: string;
  resumeUrl: string;
  portfolioUrl?: string;
  resumeHighlights: string[];
}

interface TeamMemberCardProps {
  member: TeamMember;
}

export function TeamMemberCard({ member }: TeamMemberCardProps) {
  const isMobile = useIsMobile();
  const linkedin = member.linkedin?.trim();
  const resumeUrl = member.resumeUrl?.trim();
  const portfolioUrl = member.portfolioUrl?.trim();

  const cardBody = (
    <div className="cursor-pointer">
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={member.image || "/placeholder.svg"}
          alt={`${member.name} - ${member.role}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
      </div>

      <div className="p-5">
        <h3 className="text-lg font-semibold text-foreground">{member.name}</h3>
        <p className="mb-3 text-sm font-medium text-primary">{member.role}</p>
        <p className="text-sm leading-relaxed text-muted-foreground line-clamp-3">
          {member.description}
        </p>

        {(!!linkedin || !!portfolioUrl) && (
          <div className="mt-4 space-y-2 border-t border-border pt-4">
            {!!linkedin && (
              <div className="flex items-center gap-2">
                <Linkedin className="size-4 shrink-0 text-muted-foreground" />
                <a
                  href={`https://linkedin.com/in/${linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  onClick={(e) => e.stopPropagation()}
                >
                  @{linkedin}
                </a>
              </div>
            )}
            {!!portfolioUrl && (
              <div className="flex items-center gap-2">
                <Briefcase className="size-4 shrink-0 text-muted-foreground" />
                <a
                  href={portfolioUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  onClick={(e) => e.stopPropagation()}
                >
                  View portfolio
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );

  const resumePanel = (
    <>
      <div className="border-b border-border bg-secondary/50 p-4">
        <div className="flex items-center gap-3">
          <FileText className="size-5 text-primary" />
          <div>
            <p className="font-semibold text-foreground">Resume Preview</p>
            <p className="text-xs text-muted-foreground">{member.name}</p>
          </div>
        </div>
      </div>

      <div className="p-4">
        {(member.resumeHighlights.length > 0 || !!resumeUrl) && (
          <>
            {member.resumeHighlights.length > 0 && (
              <>
                <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Key Highlights
                </p>
                <ul className="space-y-2">
                  {member.resumeHighlights.map((highlight, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-sm text-foreground"
                    >
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </>
            )}

            {!!resumeUrl && (
              <Button
                asChild
                className="mt-4 w-full gap-2 bg-transparent"
                variant="outline"
                size="sm"
              >
                <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
                  <FileText className="size-4" />
                  View Full Resume
                </a>
              </Button>
            )}
            {!!portfolioUrl && (
              <Button
                asChild
                className="mt-4 w-full gap-2 bg-transparent"
                variant="outline"
                size="sm"
              >
                <a href={portfolioUrl} target="_blank" rel="noopener noreferrer">
                  <FileText className="size-4" />
                  View Portfolio
                </a>
              </Button>
            )}
            {member.resumeHighlights.length === 0 && !resumeUrl && (
              <p className="text-sm text-muted-foreground">No resume available yet.</p>
            )}
          </>
        )}
      </div>
    </>
  );

  if (isMobile) {
    return (
      <div className="group relative overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
        <Dialog>
          <DialogTrigger asChild>{cardBody}</DialogTrigger>
          <DialogContent className="w-[92vw] max-w-md border-border bg-card p-0">
            {resumePanel}
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return (
    <div className="group relative overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
      <HoverCard openDelay={200} closeDelay={100}>
        <HoverCardTrigger asChild>{cardBody}</HoverCardTrigger>

        <HoverCardContent
          side="right"
          align="start"
          className="w-80 border-border bg-card p-0"
        >
          {resumePanel}
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}
