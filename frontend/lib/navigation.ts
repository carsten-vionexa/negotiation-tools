import {
  BarChart3,
  BookOpen,
  BriefcaseBusiness,
  Building2,
  ClipboardCheck,
  FileSearch,
  LayoutDashboard,
  MessageSquareText,
  ShieldCheck,
  Target,
  Users,
} from "lucide-react";
import type { ComponentType } from "react";

export type NavigationItem = {
  label: string;
  href: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
};

export type NavigationGroup = {
  label: string;
  items: NavigationItem[];
};

export const navigationGroups: NavigationGroup[] = [
  {
    label: "Cockpit",
    items: [
      {
        label: "Dashboard",
        href: "/dashboard",
        description: "Aktive Projekte und naechste Arbeitsschritte",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    label: "Stammdaten",
    items: [
      {
        label: "Firmen",
        href: "/companies",
        description: "Company- und Mandantenkontext",
        icon: Building2,
      },
      {
        label: "Rollenprofile",
        href: "/profiles",
        description: "Trainee- und Trainingsrollen",
        icon: Users,
      },
      {
        label: "Projekte",
        href: "/projects",
        description: "Verhandlungsprojekte",
        icon: BriefcaseBusiness,
      },
      {
        label: "Datenbasis",
        href: "/knowledge-base",
        description: "Quellen, Claims und Importstatus",
        icon: BookOpen,
      },
    ],
  },
  {
    label: "MVP-Workflow",
    items: [
      {
        label: "Analyse",
        href: "/analysis",
        description: "Fakten, Annahmen und Hypothesen",
        icon: FileSearch,
      },
      {
        label: "Strategie",
        href: "/strategy",
        description: "ZOPA, BATNA, Konzessionen und Argumente",
        icon: Target,
      },
      {
        label: "Briefing",
        href: "/briefing",
        description: "Kultur- und Rollenbriefing",
        icon: MessageSquareText,
      },
      {
        label: "Simulation",
        href: "/simulation",
        description: "Szenario-Konfiguration",
        icon: BarChart3,
      },
      {
        label: "Trainerreview",
        href: "/trainer-review",
        description: "Trainerkommentare und Lernpunkte",
        icon: ClipboardCheck,
      },
    ],
  },
];

export const workflowSteps = [
  "Dashboard",
  "Firmen",
  "Rollenprofile",
  "Projekte",
  "Datenbasis",
  "Analyse",
  "Strategie",
  "Briefing",
  "Simulation",
  "Trainerreview",
];

export const readinessLabel = "Grundlage vorbereitet";

export const appSignal = {
  label: "MVP Cockpit",
  value: "Phase B6",
  icon: ShieldCheck,
};
