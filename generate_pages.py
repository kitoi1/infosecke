#!/usr/bin/env python3
import os
from pathlib import Path

ROOT = Path("infosecke")

# Set to True if you want to overwrite non-empty files as well.
OVERWRITE_EXISTING = False

SECTION_COPY = {
    "home": {
        "label": "InfoSecKe",
        "subtitle": "An open-source, practical-first cybersecurity ecosystem for learners, professionals, and researchers.",
        "overview_suffix": (
            "InfoSecKe combines hands-on labs, tools, learning paths, and community collaboration "
            "to help you grow from absolute beginner to seasoned practitioner."
        ),
    },
    "cybersecurity": {
        "label": "Cybersecurity",
        "subtitle": "Foundations, frameworks, threat landscape, governance, risk, and compliance.",
        "overview_suffix": (
            "This area focuses on security principles, threat intelligence, risk management, and "
            "compliance frameworks like GDPR, PCI-DSS, and ISO 27001."
        ),
    },
    "ethical-hacking": {
        "label": "Ethical Hacking",
        "subtitle": "Offensive security, penetration testing, and red team methodologies.",
        "overview_suffix": (
            "Here you will explore reconnaissance, scanning, exploitation, post-exploitation, "
            "privilege escalation, web and network hacking, and Active Directory attacks."
        ),
    },
    "labs": {
        "label": "Labs & CTFs",
        "subtitle": "Hands-on security labs, CTF challenges, and vulnerable environments.",
        "overview_suffix": (
            "Labs range from beginner to advanced and include Docker-based environments, vulnerable "
            "VMs, Active Directory labs, and integrations with platforms like HackTheBox, TryHackMe, and VulnHub."
        ),
    },
    "tools": {
        "label": "Tools & Automation",
        "subtitle": "Custom security tools, reviews, tutorials, and automation scripts.",
        "overview_suffix": (
            "Explore tools like KasaUSec, KasaUXSS, VulnHunter, and Nuclear Stress Tester, along "
            "with curated third-party tools, installation guides, and automation patterns."
        ),
    },
    "linux": {
        "label": "Linux & System Security",
        "subtitle": "Linux internals, administration, hardening, and security-focused distributions.",
        "overview_suffix": (
            "Focus on kernel basics, containers, init systems, shell scripting, and practical "
            "hardening techniques for production systems."
        ),
    },
    "devops": {
        "label": "DevOps & Cloud Security",
        "subtitle": "Secure CI/CD, infrastructure as code, container and cloud security.",
        "overview_suffix": (
            "This section bridges DevOps engineering and security, covering Docker, Kubernetes, "
            "Terraform, Ansible, and cloud security best practices on AWS, Azure, and beyond."
        ),
    },
    "trading-tech": {
        "label": "Trading Technology",
        "subtitle": "Algorithmic trading, bots, platform security, and risk management.",
        "overview_suffix": (
            "Here you connect security thinking with trading infrastructure, automated strategies, "
            "and the unique risks of forex and crypto systems."
        ),
    },
    "blog": {
        "label": "Blog",
        "subtitle": "News, guides, case studies, and deep technical articles.",
        "overview_suffix": (
            "The blog brings together announcements, step-by-step guides, detailed case studies, "
            "and reflections from the InfoSecKe community."
        ),
    },
    "research": {
        "label": "Research & Publications",
        "subtitle": "Technical writeups, vulnerabilities, malware analysis, and threat reports.",
        "overview_suffix": (
            "Dive into vulnerability research, exploit development, threat intelligence reports, "
            "and malware reverse engineering writeups."
        ),
    },
    "community": {
        "label": "Community",
        "subtitle": "Events, forums, mentorship, jobs, and collaborative projects.",
        "overview_suffix": (
            "Connect with other learners and practitioners through forums, Discord, mentorship, "
            "open source projects, and a curated job board."
        ),
    },
    "education": {
        "label": "Education & Career",
        "subtitle": "Learning paths, courses, certifications, and career roadmaps.",
        "overview_suffix": (
            "Structured learning paths, certification preparation, interview guidance, and career "
            "roadmaps help you move from beginner to advanced professional roles."
        ),
    },
    "legal": {
        "label": "Legal & Ethics",
        "subtitle": "Ethical guidelines, disclosure policies, and compliance considerations.",
        "overview_suffix": (
            "InfoSecKe emphasizes responsible, legal, and ethical security practice, with clear "
            "guidance on disclosure, compliance, and acceptable behavior."
        ),
    },
    "resources": {
        "label": "Resource Library",
        "subtitle": "Cheatsheets, templates, downloads, and curated external links.",
        "overview_suffix": (
            "Use the resource library as a quick-reference hub for commands, playbooks, report "
            "templates, configuration examples, and vetted learning materials."
        ),
    },
    "news": {
        "label": "News & Updates",
        "subtitle": "Security news, project updates, and release announcements.",
        "overview_suffix": (
            "Stay informed about important security developments and keep up with InfoSecKe "
            "feature releases, content drops, and roadmap milestones."
        ),
    },
    "contact": {
        "label": "Contact",
        "subtitle": "Get in touch for support, feedback, partnerships, or collaboration.",
        "overview_suffix": (
            "Use this section to connect with the maintainers for support, ideas, partnerships, "
            "or to discuss contributions and community initiatives."
        ),
    },
    "showcase": {
        "label": "Showcase",
        "subtitle": "Highlighted projects, tools, and community success stories.",
        "overview_suffix": (
            "Discover featured tools, labs, and community projects, along with stories of how "
            "learners and teams are using InfoSecKe in the real world."
        ),
    },
    "search": {
        "label": "Search",
        "subtitle": "Find content, labs, tools, and resources across the platform.",
        "overview_suffix": (
            "Use search to quickly discover tutorials, labs, tools, research, and reference "
            "material relevant to your current learning goals."
        ),
    },
    "api": {
        "label": "API",
        "subtitle": "Programmatic access to labs, tools, and reporting endpoints.",
        "overview_suffix": (
            "The API layer is designed for automation, integration with external platforms, and "
            "future AI-assisted workflows around labs and reports."
        ),
    },
}


TEMPLATE = """<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{full_title}</title>
  <meta name="description" content="{description}" />

  <link rel="stylesheet" href="/assets/css/typography.css" />
  <link rel="stylesheet" href="/assets/css/main.css" />
  <link rel="stylesheet" href="/assets/css/animations.css" />
  <link rel="stylesheet" href="/assets/css/theme-dark.css" />
  <link rel="stylesheet" href="/assets/css/theme-light.css" />
</head>
<body>
  <div class="app-root">
    <header class="site-header">
      <div class="top-bar">
        <a href="/index.html" class="brand">
          <img src="/assets/images/branding/logo-mark.svg" alt="InfoSecKe logo" class="brand-logo" />
          <span class="brand-text">InfoSecKe</span>
        </a>
        <button class="theme-toggle" id="themeToggle" aria-label="Toggle theme">
          <span class="icon-moon">🌙</span>
          <span class="icon-sun">☀️</span>
        </button>
      </div>
      <nav class="navbar" id="mainNavbar">
        <button class="navbar-toggle" id="navbarToggle" aria-label="Toggle navigation">☰</button>
        <ul class="navbar-links">
          <li><a href="/pages/cybersecurity/index.html">Cybersecurity</a></li>
          <li><a href="/pages/ethical-hacking/index.html">Ethical Hacking</a></li>
          <li><a href="/pages/labs/index.html">Labs</a></li>
          <li><a href="/pages/tools/index.html">Tools</a></li>
          <li><a href="/pages/linux/index.html">Linux</a></li>
          <li><a href="/pages/devops/index.html">DevOps</a></li>
          <li><a href="/pages/trading-tech/index.html">Trading Tech</a></li>
          <li><a href="/pages/research/index.html">Research</a></li>
          <li><a href="/pages/community/index.html">Community</a></li>
          <li><a href="/pages/education/index.html">Education</a></li>
          <li><a href="/pages/blog/index.html">Blog</a></li>
        </ul>
      </nav>
    </header>

    <nav class="breadcrumbs" aria-label="Breadcrumb">
      <ol class="breadcrumbs-list">
        {breadcrumbs_html}
      </ol>
    </nav>

    <main class="page-main">
      <aside class="sidebar">
        <section class="sidebar-section">
          <h2 class="sidebar-title">On this page</h2>
          <ul class="sidebar-list">
            <li><a href="#overview">Overview</a></li>
            <li><a href="#key-topics">Key topics</a></li>
            <li><a href="#resources">Related resources</a></li>
          </ul>
        </section>
      </aside>

      <section class="page-content">
        <header class="page-header">
          <h1 class="page-title">{page_title}</h1>
          <p class="page-subtitle">{subtitle}</p>
        </header>

        <article class="content-section" id="overview">
          <h2>Overview</h2>
          <p>{overview}</p>
        </article>

        <article class="content-section" id="key-topics">
          <h2>Key topics on this page</h2>
          <p>{key_topics}</p>
        </article>

        <article class="content-section" id="resources">
          <h2>Related InfoSecKe resources</h2>
          <p>{resources}</p>
        </article>

        <section class="cta">
          <h2>Continue your learning journey</h2>
          <p>{cta_text}</p>
          <div class="cta-actions">
            <a class="btn btn-primary" href="/pages/labs/index.html">Explore labs</a>
            <a class="btn btn-outline" href="/pages/community/index.html">Join the community</a>
          </div>
        </section>
      </section>
    </main>

    <footer class="site-footer">
      <div class="footer-grid">
        <section>
          <h3>About InfoSecKe</h3>
          <p>
            An open-source, community-driven cybersecurity ecosystem focused on
            practical, hands-on learning and collaboration.
          </p>
        </section>
        <section>
          <h3>Explore</h3>
          <ul>
            <li><a href="/pages/education/index.html">Learning Paths</a></li>
            <li><a href="/pages/labs/index.html">Labs &amp; CTFs</a></li>
            <li><a href="/pages/tools/index.html">Tools</a></li>
            <li><a href="/pages/research/index.html">Research</a></li>
          </ul>
        </section>
        <section>
          <h3>Community</h3>
          <ul>
            <li><a href="/pages/community/discord.html">Discord</a></li>
            <li><a href="/pages/community/events/index.html">Events</a></li>
            <li><a href="/pages/community/jobs/index.html">Jobs</a></li>
          </ul>
        </section>
        <section>
          <h3>Legal</h3>
          <ul>
            <li><a href="/pages/legal/ethics.html">Ethics</a></li>
            <li><a href="/pages/legal/disclosure.html">Disclosure Policy</a></li>
            <li><a href="/pages/legal/compliance.html">Compliance</a></li>
          </ul>
        </section>
      </div>
      <div class="footer-bottom">
        <p>© <span id="year"></span> InfoSecKe. Built with ❤️ by the community.</p>
      </div>
    </footer>
  </div>

  <script src="/assets/js/theme-toggle.js"></script>
  <script src="/assets/js/navbar.js"></script>
  <script src="/assets/js/search.js"></script>
  <script src="/assets/js/progress-bar.js"></script>
  <script src="/assets/js/tooltip.js"></script>
  <script src="/assets/js/modal.js"></script>
  <script src="/assets/js/notifications.js"></script>
  <script src="/assets/js/main.js"></script>
</body>
</html>
"""


def prettify_name(name: str) -> str:
    if not name or name == "index":
        return "Home"
    return name.replace("-", " ").title()


def get_section_key(rel_parts) -> str:
    if not rel_parts:
        return "home"
    head = rel_parts[0]
    if head == "index.html":
        return "home"
    if head == "pages":
        if len(rel_parts) > 1:
            return rel_parts[1]
        return "home"
    if head == "api":
        return "api"
    return head


def build_breadcrumbs(path: Path) -> str:
    rel = path.relative_to(ROOT)
    parts = list(rel.parts)

    crumbs = []

    # Always start with Home
    crumbs.append(('Home', '/index.html'))

    if len(parts) == 1 and parts[0] == 'index.html':
        # Home page itself
        # Mark Home as current
        return '<li aria-current="page">Home</li>'

    if parts[0] == "pages":
        # /pages/<section>/.../<file>
        if len(parts) >= 2:
            section_slug = parts[1]
            section_title = prettify_name(section_slug)
            section_href = f"/pages/{section_slug}/index.html"
            crumbs.append((section_title, section_href))

        # Current page
        page_title = prettify_name(path.stem)
        crumbs.append((page_title, None))

    elif parts[0] == "api":
        # /api/...
        crumbs.append(("API", "/api/README.html" if (ROOT / "api/README.html").exists() else None))
        page_title = prettify_name(path.stem)
        crumbs.append((page_title, None))
    else:
        # Fallback for anything else
        page_title = prettify_name(path.stem)
        crumbs.append((page_title, None))

    # Build HTML
    html_parts = []
    for title, href in crumbs:
        if href is None or title == crumbs[-1][0]:
            html_parts.append(f'<li aria-current="page">{title}</li>')
        else:
            html_parts.append(f'<li><a href="{href}">{title}</a></li>')
    return "\n        ".join(html_parts)


def build_copy(section_key: str, page_title: str):
    section_info = SECTION_COPY.get(section_key, SECTION_COPY["home"])
    label = section_info["label"]
    subtitle = section_info["subtitle"]
    overview_suffix = section_info["overview_suffix"]

    overview = (
        f"This page introduces {page_title} as part of the {label} area of InfoSecKe. "
        f"{overview_suffix}"
    )

    key_topics = (
        f"Use this page to understand the core ideas behind {page_title}, how it fits into the "
        f"broader {label} domain, and which labs, tools, and references you should explore next."
    )

    resources = (
        f"As you study {page_title}, consider combining this page with relevant labs in the "
        f"Labs & CTFs section, tool walkthroughs in the Tools area, and long-form writeups in "
        f"the Research and Blog sections."
    )

    cta_text = (
        f"Put {page_title} into practice by launching a lab, experimenting with tools, or "
        f"joining community discussions, mentorship, and collaborative projects."
    )

    description = f"{page_title} – {subtitle}"

    return subtitle, overview, key_topics, resources, cta_text, description


def render_page(path: Path):
    rel_parts = path.relative_to(ROOT).parts
    section_key = get_section_key(rel_parts)

    # Determine page title
    if path.stem == "index":
        if len(rel_parts) == 1 or rel_parts[0] == "index.html":
            page_title = "Home"
        else:
            page_title = prettify_name(path.parent.name)
    else:
        page_title = prettify_name(path.stem)

    subtitle, overview, key_topics, resources, cta_text, description = build_copy(
        section_key, page_title
    )

    full_title = f"{page_title} | InfoSecKe"
    breadcrumbs_html = build_breadcrumbs(path)

    html = TEMPLATE.format(
        full_title=full_title,
        description=description,
        breadcrumbs_html=breadcrumbs_html,
        page_title=page_title,
        subtitle=subtitle,
        overview=overview,
        key_topics=key_topics,
        resources=resources,
        cta_text=cta_text,
    )

    path.write_text(html, encoding="utf-8")
    print(f"Generated: {path}")


def find_html_files():
    files = []
    # Root index
    root_index = ROOT / "index.html"
    if root_index.exists():
        files.append(root_index)

    # Pages and API subtrees
    for base in (ROOT / "pages", ROOT / "api"):
        if base.exists():
            for p in base.rglob("*.html"):
                files.append(p)

    # Remove duplicates just in case
    return sorted(set(files))


def main():
    if not ROOT.exists():
        raise SystemExit("Could not find 'infosecke' directory next to this script.")

    html_files = find_html_files()
    if not html_files:
        raise SystemExit("No .html files found under 'infosecke'.")

    for path in html_files:
        if not OVERWRITE_EXISTING:
            if path.exists():
                try:
                    content = path.read_text(encoding="utf-8")
                except UnicodeDecodeError:
                    content = ""
                if content.strip():
                    # Skip non-empty files if we are not overwriting
                    continue
        render_page(path)


if __name__ == "__main__":
    main()
