export const contentCategories = {
  learn: {
    label: "Learn",
    description: "Structured guides and tutorials for getting started in cybersecurity.",
    href: "/learn",
  },
  cybersecurity: {
    label: "Cybersecurity",
    description: "Core security concepts, frameworks, and defensive practices.",
    href: "/cybersecurity",
  },
  "ethical-hacking": {
    label: "Ethical Hacking",
    description: "Authorized penetration testing, reconnaissance, and vulnerability assessment.",
    href: "/ethical-hacking",
  },
  linux: {
    label: "Linux",
    description: "Linux fundamentals for security practitioners and administrators.",
    href: "/linux",
  },
  research: {
    label: "Research",
    description: "Threat analysis, security research, and technical write-ups.",
    href: "/research",
  },
} as const;

export const contentCategorySlugs = Object.keys(
  contentCategories,
) as ContentCategorySlug[];

export type ContentCategorySlug = keyof typeof contentCategories;

export const CONTENT_DIR = "content";
