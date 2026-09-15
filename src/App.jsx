import React, { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  ArrowDown,
  Sun,
  Moon,
  Menu,
  X,
  Code2,
  Layers,
  PenTool,
  Github,
  Linkedin,
  Globe2,
  Plus,
  LockKeyhole,
  LogOut,
  Trash2,
  ArrowLeft,
} from "lucide-react";

// Replace null values with your real profile URLs and email when ready.
const contact = {
  github: "https://github.com/coding-ai-ui",
  linkedin: null,
  email: "houssamelorabi04@gmail.com",
};
const projects = [
  {
    id: "vestra",
    number: "01",
    name: "Vestra",
    url: "https://vextra-93ix.onrender.com/projects",
    category: "FINANCE · WEB PLATFORM",
    type: "Educational demo",
    description:
      "An exploration of premium financial interfaces, investment concepts, and a connected frontend and backend.",
    tags: ["React", "Django", "UI/UX"],
    details:
      "Vestra is an investment-themed platform demo built with React and Django. It explores how a polished frontend can connect to a backend while making financial information approachable.",
    note: "This is an educational project, not a real investment service.",
  },
  {
    id: "aurevia",
    number: "02",
    name: "Aurevia",
    category: "COMMUNITY · PRODUCT CONCEPT",
    type: "Platform concept",
    description:
      "A place to exchange knowledge, share your skills, and grow together. Curiosity becomes a shared currency.",
    tags: ["Product thinking", "UI/UX", "Community"],
    details:
      "Aurevia imagines a community where people exchange knowledge, earn coins for sharing skills, and connect with other learners.",
    note: "A platform concept exploring knowledge exchange and community.",
  },
  {
    id: "carzone",
    number: "03",
    name: "CAR ZONE",
    category: "AUTOMOTIVE · WEBSITE",
    type: "Website project",
    description:
      "A refined car-selling experience with confident vehicle presentation and a clear, intuitive interface.",
    tags: ["Web design", "Responsive", "UI/UX"],
    details:
      "CAR ZONE is a modern car-selling website focused on vehicle presentation, premium design, and a user-friendly browsing experience.",
    note: "A personal website project. No live project link has been added yet.",
  },
  {
    id: "planner",
    number: "04",
    name: "Smart Study Planner",
    category: "PRODUCTIVITY · APP CONCEPT",
    type: "Application concept",
    description:
      "Making room for better learning. A thoughtful approach to organizing study time and finding focus.",
    tags: ["App concept", "Planning", "UI/UX"],
    details:
      "Smart Study Planner is an application concept designed to help students organize their time and improve their learning through a clear study plan.",
    note: "An application concept focused on student organization.",
  },
];
const projectsStorageKey = "houssam-portfolio-projects";
const adminSessionKey = "houssam-portfolio-admin";
const emptyProject = {
  name: "",
  category: "WEB · PROJECT",
  type: "Website project",
  description: "",
  details: "",
  note: "",
  tags: "React, UI/UX",
  url: "",
};

function readProjects() {
  try {
    const stored = JSON.parse(localStorage.getItem(projectsStorageKey));
    return Array.isArray(stored) ? stored : projects;
  } catch {
    return projects;
  }
}

function AdminPage({ projects, onSave, onLogout }) {
  const [draft, setDraft] = useState(emptyProject);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const isEditing = Boolean(editingId);

  const resetForm = () => {
    setDraft(emptyProject);
    setEditingId(null);
    setMessage("");
  };

  const submitProject = (event) => {
    event.preventDefault();
    const name = draft.name.trim();
    if (!name || !draft.description.trim() || !draft.details.trim()) {
      setMessage("Name, description, and details are required.");
      return;
    }
    const project = {
      ...draft,
      name,
      description: draft.description.trim(),
      details: draft.details.trim(),
      note: draft.note.trim(),
      category: draft.category.trim() || "WEB · PROJECT",
      type: draft.type.trim() || "Website project",
      tags: draft.tags.split(",").map((tag) => tag.trim()).filter(Boolean),
      url: draft.url.trim(),
    };
    const nextProjects = isEditing
      ? projects.map((item) => item.id === editingId ? { ...item, ...project } : item)
      : [...projects, { ...project, id: `${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Date.now()}`, number: String(projects.length + 1).padStart(2, "0") }];
    onSave(nextProjects);
    setMessage(isEditing ? "Project updated." : "Project added.");
    resetForm();
  };

  const editProject = (project) => {
    setEditingId(project.id);
    setDraft({ ...project, tags: project.tags.join(", ") });
    setMessage("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteProject = (id) => {
    if (!window.confirm("Delete this project from the portfolio?")) return;
    onSave(projects.filter((project) => project.id !== id));
    if (editingId === id) resetForm();
    setMessage("Project deleted.");
  };

  return (
    <main className="admin-page">
      <div className="admin-shell">
        <div className="admin-topbar"><a className="text-link" href="#home"><ArrowLeft size={16} /> Back to portfolio</a><button className="text-link admin-logout" onClick={onLogout}><LogOut size={16} /> Log out</button></div>
        <div className="admin-heading"><div className="eyebrow"><span className="small-line" /> ADMIN / PROJECTS</div><h1>Shape the work<span className="accent-word">.</span></h1><p>Manage the projects shown on your public portfolio.</p></div>
        <div className="admin-grid">
          <form className="admin-form" onSubmit={submitProject}>
            <div className="admin-form-heading"><h2>{isEditing ? "Edit project" : "Add a project"}</h2>{isEditing && <button type="button" className="text-link" onClick={resetForm}>Cancel</button>}</div>
            <label>Project name<input value={draft.name} onChange={(event) => setDraft({ ...draft, name: event.target.value })} placeholder="Project name" /></label>
            <label>Category<input value={draft.category} onChange={(event) => setDraft({ ...draft, category: event.target.value })} /></label>
            <label>Short description<textarea rows="3" value={draft.description} onChange={(event) => setDraft({ ...draft, description: event.target.value })} placeholder="What is this project about?" /></label>
            <label>Full details<textarea rows="4" value={draft.details} onChange={(event) => setDraft({ ...draft, details: event.target.value })} placeholder="Describe the project in more detail." /></label>
            <div className="admin-form-row"><label>Type<input value={draft.type} onChange={(event) => setDraft({ ...draft, type: event.target.value })} /></label><label>Tags<input value={draft.tags} onChange={(event) => setDraft({ ...draft, tags: event.target.value })} placeholder="React, UI/UX" /></label></div>
            <label>Live URL <span className="field-hint">optional</span><input type="url" value={draft.url} onChange={(event) => setDraft({ ...draft, url: event.target.value })} placeholder="https://example.com" /></label>
            <label>Note <span className="field-hint">optional</span><input value={draft.note} onChange={(event) => setDraft({ ...draft, note: event.target.value })} placeholder="A small context note" /></label>
            <button className="button primary admin-submit" type="submit"><Plus size={18} /> {isEditing ? "Save changes" : "Add project"}</button>
            {message && <p className="admin-message" role="status">{message}</p>}
          </form>
          <section className="admin-list" aria-labelledby="project-list-title"><div className="admin-form-heading"><h2 id="project-list-title">Published projects</h2><span>{projects.length} total</span></div>{projects.map((project) => <article className="admin-project" key={project.id}><div><span className="admin-project-number">{project.number}</span><div><h3>{project.name}</h3><p>{project.category}</p></div></div><div className="admin-project-actions"><button className="icon-button" aria-label={`Edit ${project.name}`} onClick={() => editProject(project)}><PenTool size={17} /></button><button className="icon-button danger" aria-label={`Delete ${project.name}`} onClick={() => deleteProject(project.id)}><Trash2 size={17} /></button></div></article>)}</section>
        </div>
      </div>
    </main>
  );
}

function AdminGate({ onUnlock }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const submit = (event) => { event.preventDefault(); if (code === "2010") onUnlock(); else setError("That access code is not correct."); };
  return <main className="admin-gate"><form className="admin-gate-card" onSubmit={submit}><span className="admin-lock"><LockKeyhole size={22} /></span><div className="eyebrow"><span className="small-line" /> PRIVATE AREA</div><h1>Welcome back<span className="accent-word">.</span></h1><p>Enter your access code to manage the portfolio.</p><label>Access code<input autoFocus inputMode="numeric" type="password" value={code} onChange={(event) => setCode(event.target.value)} aria-describedby="admin-error" /></label>{error && <span className="admin-error" id="admin-error" role="alert">{error}</span>}<button className="button primary admin-submit" type="submit">Enter admin</button><a className="text-link" href="#home"><ArrowLeft size={16} /> Return to portfolio</a></form></main>;
}

function ProjectPreview({ id }) {
  return (
    <div className={`project-preview ${id}`} aria-hidden="true">
      {id === "vestra" && (
        <div className="finance-ui">
          <div className="mock-nav">
            <strong>
              vestra<span>®</span>
            </strong>
            <span>
              Overview <span className="mock-nav-muted">Portfolio</span>
            </span>
            <span className="mock-avatar">V</span>
          </div>
          <div className="finance-body">
            <div>
              <span className="mock-label">YOUR PORTFOLIO</span>
              <div className="mock-balance">
                $24,680<span>.00</span>
              </div>
              <span className="mock-gain">
                ↗ 12.8% <span>this month</span>
              </span>
            </div>
            <span className="mock-pill">This month⌄</span>
            <svg viewBox="0 0 520 120" preserveAspectRatio="none">
              <defs>
                <linearGradient id="chart-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#bdf282" stopOpacity=".18" />
                  <stop offset="100%" stopColor="#bdf282" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0 107L24 95L52 101L83 77L104 85L130 66L153 75L180 55L200 61L230 35L255 45L286 25L310 39L337 15L362 28L388 13L420 23L447 4L480 15L520 0V120H0Z"
                fill="url(#chart-fill)"
              />
              <path
                d="M0 107L24 95L52 101L83 77L104 85L130 66L153 75L180 55L200 61L230 35L255 45L286 25L310 39L337 15L362 28L388 13L420 23L447 4L480 15L520 0"
                stroke="#bdf282"
                strokeWidth="2.5"
                fill="none"
              />
            </svg>
            <div className="mock-months">
              <span>JAN</span>
              <span>FEB</span>
              <span>MAR</span>
              <span>APR</span>
              <span>MAY</span>
            </div>
          </div>
        </div>
      )}
      {id === "aurevia" && (
        <div className="knowledge-ui">
          <div className="mock-nav">
            <strong>
              <span className="aurevia-icon">✳</span> aurevia
            </strong>
            <span>Explore · Connect</span>
            <span className="coin">✦ 240</span>
          </div>
          <div className="knowledge-body">
            <span className="mock-label">GOOD THINGS GROW WHEN SHARED</span>
            <h4>
              You know something.
              <br />
              Someone wants to learn it.
            </h4>
            <div className="knowledge-chips">
              <span>✳ Design</span>
              <span>⌘ Development</span>
              <span>↗ Marketing</span>
            </div>
            <div className="knowledge-bottom">
              <div className="avatars">
                <i>A</i>
                <i>S</i>
                <i>M</i>
              </div>
              <span>Learn something. Share something.</span>
              <span>↗</span>
            </div>
          </div>
        </div>
      )}
      {id === "carzone" && (
        <div className="car-ui">
          <div className="mock-nav">
            <strong>
              CAR<span> ZONE</span>
            </strong>
            <span>EXPLORE THE COLLECTION ↗</span>
          </div>
          <div className="car-body">
            <span className="mock-label">A NEW PERSPECTIVE ON THE ROAD</span>
            <h4>
              DRIVEN
              <br />
              BY DESIGN<span>.</span>
            </h4>
            <div className="car-bottom">
              <span>Find your next chapter.</span>
              <span>EXPLORE ↗</span>
            </div>
          </div>
          <span className="car-watermark">CZ</span>
        </div>
      )}
      {id === "planner" && (
        <div className="planner-ui">
          <div className="planner-sidebar">
            <span className="planner-logo">
              s<span>p</span>
            </span>
            <span>▦</span>
            <span>◷</span>
            <span>✓</span>
          </div>
          <div className="planner-body">
            <div className="mock-nav">
              <strong>A little more focused.</strong>
              <span className="mock-avatar">H</span>
            </div>
            <div className="planner-subtitle">
              Your day, one step at a time.
            </div>
            <div className="week-strip">
              {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                <span key={i} className={i === 2 ? "chosen" : ""}>
                  {d}
                  <b>{12 + i}</b>
                </span>
              ))}
            </div>
            <div className="study-item">
              <span className="study-check">✓</span>
              <div>
                <b>JavaScript fundamentals</b>
                <small>09:00 — 10:00 · Deep work</small>
              </div>
              <span className="study-duration">60m</span>
            </div>
            <div className="study-item purple">
              <span className="study-check">○</span>
              <div>
                <b>Design exploration</b>
                <small>11:00 — 11:45 · Creative time</small>
              </div>
              <span className="study-duration">45m</span>
            </div>
          </div>
        </div>
      )}
      <span className="preview-caption">CONCEPT VISUAL</span>
    </div>
  );
}

function SectionTitle({ label, title, children }) {
  return (
    <div className="section-heading">
      <div>
        <div className="eyebrow">
          <span className="small-line" />
          {label}
        </div>
        <h2>{title}</h2>
      </div>
      {children && <p>{children}</p>}
    </div>
  );
}

function DetailDialog({ detail, onClose }) {
  const dialog = useRef(null);
  useEffect(() => {
    if (!detail) return;
    const element = dialog.current;
    const trigger = document.activeElement;
    element.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      element.close();
      document.body.style.overflow = previous;
      if (trigger instanceof HTMLElement) trigger.focus();
    };
  }, [detail]);
  return (
    <dialog
      ref={dialog}
      className="detail-dialog"
      aria-labelledby="dialog-title"
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === dialog.current) {
          const r = dialog.current.getBoundingClientRect();
          if (
            event.clientX < r.left ||
            event.clientX > r.right ||
            event.clientY < r.top ||
            event.clientY > r.bottom
          )
            onClose();
        }
      }}
    >
      <button
        className="icon-button dialog-close"
        aria-label="Close dialog"
        onClick={onClose}
      >
        <X size={21} />
      </button>
      {detail && (
        <>
          <span className="eyebrow">{detail.type || "LET’S CONNECT"}</span>
          <h2 id="dialog-title">{detail.name}</h2>
          <p>{detail.details}</p>
          {detail.tags && (
            <div className="tags">
              {detail.tags.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          )}
          <div className="dialog-note">{detail.note}</div>
          {detail.url && (
            <a
              className="button primary"
              href={detail.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit {detail.name} <ArrowUpRight size={18} />
            </a>
          )}
          <button className="button primary" onClick={onClose}>
            Back to portfolio
          </button>
        </>
      )}
    </dialog>
  );
}

export default function App() {
  const [theme, setTheme] = useState(
    () => document.documentElement.dataset.theme || "light",
  );
  const [portfolioProjects, setPortfolioProjects] = useState(readProjects);
  const [adminPath, setAdminPath] = useState(() => window.location.hash === "#admin");
  const [adminUnlocked, setAdminUnlocked] = useState(
    () => sessionStorage.getItem(adminSessionKey) === "true",
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const [detail, setDetail] = useState(null);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("portfolio-theme", theme);
    } catch {}
  }, [theme]);
  useEffect(() => {
    const handleHashChange = () => setAdminPath(window.location.hash === "#admin");
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem(projectsStorageKey, JSON.stringify(portfolioProjects));
    } catch {}
  }, [portfolioProjects]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.08 },
    );
    document
      .querySelectorAll(".reveal")
      .forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
  const placeholder = (event, name) => {
    event.preventDefault();
    setDetail({
      name: `${name} coming soon.`,
      details: `My ${name === "Email" ? "contact email" : `${name} profile link`} will be added here soon.`,
      note: "This is a placeholder while my portfolio is being set up.",
    });
  };
  const unlockAdmin = () => {
    sessionStorage.setItem(adminSessionKey, "true");
    setAdminUnlocked(true);
  };
  const logoutAdmin = () => {
    sessionStorage.removeItem(adminSessionKey);
    setAdminUnlocked(false);
    window.location.hash = "home";
  };
  if (adminPath) {
    return adminUnlocked ? (
      <AdminPage
        projects={portfolioProjects}
        onSave={setPortfolioProjects}
        onLogout={logoutAdmin}
      />
    ) : (
      <AdminGate onUnlock={unlockAdmin} />
    );
  }
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="header">
        <a className="brand" href="#home" aria-label="Houssam El Orabi home">
          <span className="monogram">
            h<span>.</span>
          </span>
          <span>
            houssam<span className="brand-dot">.</span>
          </span>
        </a>
        <nav
          className={menuOpen ? "navigation open" : "navigation"}
          aria-label="Main navigation"
        >
          {["About", "Skills", "Projects", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </a>
          ))}
        </nav>
        <div className="nav-actions">
          <button
            className="icon-button"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          >
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          <a className="nav-contact" href="#contact">
            Let’s talk <ArrowUpRight size={16} />
          </a>
          <button
            className="icon-button menu-toggle"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>
      <main id="main">
        <section id="home" className="hero container">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="small-line" /> DEVELOPER. DESIGNER. CREATOR.
            </div>
            <h1>
              Thoughtful design.
              <br />
              Meaningful{" "}
              <span className="accent-word">
                code<span className="period">.</span>
              </span>
            </h1>
            <p className="hero-intro">
              Hi, I’m <strong>Houssam El Orabi.</strong>
              <br />A creative web developer and software creator turning ideas
              into considered digital experiences.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#projects">
                Explore my work <ArrowUpRight size={18} />
              </a>
              <a className="text-link" href="#about">
                A little about me <ArrowDown size={16} />
              </a>
            </div>
            <div className="hero-location">
              <Globe2 size={15} /> Based in Algeria <span>·</span> Building for
              the web
            </div>
          </div>
          <div className="hero-visual" aria-label="Code meets design">
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="blue-glow" />
            <span className="visual-coordinate top-coordinate">
              CREATIVITY × TECHNOLOGY
            </span>
            <div className="glass-code">
              <div className="code-top">
                <div className="window-dots">
                  <i />
                  <i />
                  <i />
                </div>
                <span>hello-world.jsx</span>
                <Code2 size={15} />
              </div>
              <div className="code-content">
                <span className="code-comment">
                  // An idea. A little curiosity.
                </span>
                <br />
                <span className="code-purple">const</span> developer = {"{"}
                <br />
                <span className="code-indent">
                  name: <span className="code-blue">'Houssam'</span>,
                </span>
                <br />
                <span className="code-indent">
                  basedIn: <span className="code-blue">'Algeria'</span>,
                </span>
                <br />
                <span className="code-indent">
                  passion: <span className="code-blue">'Creating'</span>
                </span>
                <br />
                {"}"};<br />
                <br />
                <span className="code-purple">while</span> (curious) {"{"}
                <br />
                <span className="code-indent">
                  learn(); build();{" "}
                  <span className="code-comment">repeat();</span>
                </span>
                <br />
                {"}"}
              </div>
              <div className="code-bottom">
                <span className="code-symbol">↳</span> Ideas into experiences{" "}
                <span className="cursor" />
              </div>
            </div>
            <div className="floating-label">
              <span className="spark">✳</span> A little code. A lot of care.
            </div>
            <span className="visual-coordinate bottom-coordinate">
              ALGERIA → EVERYWHERE
            </span>
          </div>
          <div className="hero-bottom">
            <span>CURIOUS BY NATURE. CREATIVE BY CHOICE.</span>
            <a href="#projects">
              Scroll to explore <ArrowDown size={15} />
            </a>
          </div>
        </section>
        <section id="projects" className="projects-section section-pad">
          <div className="container">
            <SectionTitle
              label="01 / SELECTED PROJECTS"
              title={
                <>
                  Ideas, brought to life<span className="accent-word">.</span>
                </>
              }
            >
              A collection of things I’m building,
              <br />
              exploring, and learning along the way.
            </SectionTitle>
            <div className="projects-grid">
              {portfolioProjects.map((project) => (
                <article className="project-card reveal" key={project.id}>
                  <button
                    className="project-visual-button"
                    aria-label={`Learn about ${project.name}`}
                    onClick={() => setDetail(project)}
                  >
                    <ProjectPreview id={project.id} />
                  </button>
                  <div className="project-info">
                    <div className="project-meta">
                      <span>{project.category}</span>
                      <span>{project.number}</span>
                    </div>
                    <div className="project-name-row">
                      <h3>
                        <button onClick={() => setDetail(project)}>
                          {project.name}
                        </button>
                      </h3>
                      {project.url ? (
                        <a
                          className="project-arrow"
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Visit ${project.name} (opens in a new tab)`}
                        >
                          <ArrowUpRight size={21} />
                        </a>
                      ) : (
                        <button
                          className="project-arrow"
                          aria-label={`View ${project.name} details`}
                          onClick={() => setDetail(project)}
                        >
                          <ArrowUpRight size={21} />
                        </button>
                      )}
                    </div>
                    <p>{project.description}</p>
                    <div className="tags">
                      {project.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                    {project.id === "vestra" && (
                      <span className="educational-note">
                        Educational demo · Not a real investment service
                      </span>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section
          id="about"
          className="container section-pad about-section reveal"
        >
          <div className="about-left">
            <div className="eyebrow">
              <span className="small-line" />
              02 / A LITTLE ABOUT ME
            </div>
            <h2>
              Curiosity is
              <br />
              where it starts.
              <br />
              <span className="muted-heading">
                Creating is
                <br />
                where it goes.
              </span>
            </h2>
            <div className="about-signature">
              Houssam El Orabi <span>↗</span>
            </div>
          </div>
          <div className="about-right">
            <span className="about-kicker">
              <Globe2 size={18} /> From Algeria, with ambition.
            </span>
            <p>
              I’m Houssam, a young web developer and software creator who loves
              the space where design meets technology.
            </p>
            <p>
              I build modern websites and explore ideas for useful software. I
              care about the details: how an interface feels, how clearly it
              communicates, and how well it works on any screen.
            </p>
            <p>
              Right now, I’m growing my full-stack skills with React, Python,
              and Django. My goal is to turn that learning into thoughtful
              digital products and real-world opportunities.
            </p>
            <div className="about-principles">
              <span>
                <span>01</span> Stay curious.
              </span>
              <span>
                <span>02</span> Build with care.
              </span>
              <span>
                <span>03</span> Keep learning.
              </span>
            </div>
          </div>
        </section>
        <section id="skills" className="skills-section section-pad">
          <div className="container">
            <SectionTitle
              label="03 / MY TOOLKIT"
              title={
                <>
                  The tools behind the ideas
                  <span className="accent-word">.</span>
                </>
              }
            >
              From the first sketch to the final interaction,
              <br />a growing toolkit for the things I create.
            </SectionTitle>
            <div className="skills-grid">
              {[
                {
                  Icon: Code2,
                  title: "Frontend development",
                  description: "Building responsive experiences for the web.",
                  skills: [
                    "HTML5",
                    "CSS3",
                    "JavaScript",
                    "React.js",
                    "Responsive design",
                  ],
                },
                {
                  Icon: Layers,
                  title: "Backend & workflow",
                  description: "Connecting the pieces. Learning by building.",
                  skills: ["Python", "Django", "Git", "GitHub"],
                },
                {
                  Icon: PenTool,
                  title: "Design & experience",
                  description: "Clarity, intention, and a little personality.",
                  skills: ["UI/UX design", "Canva", "Interface design"],
                },
              ].map(({ Icon, title, description, skills }, index) => (
                <article className="skill-card reveal" key={title}>
                  <div className="skill-top">
                    <Icon size={25} strokeWidth={1.5} />
                    <span>0{index + 1}</span>
                  </div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                  <div className="skill-list">
                    {skills.map((skill) => (
                      <span key={skill}>
                        {skill}
                        {skill === "Django" && <small>Learning</small>}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
            <div className="skills-footnote">
              <Plus size={16} /> Always adding something new to the toolkit.
            </div>
          </div>
        </section>
        <section id="contact" className="container contact-section reveal">
          <div className="eyebrow">
            <span className="small-line" />
            04 / WHAT’S NEXT?
          </div>
          <div className="contact-main">
            <h2>
              Have an idea?
              <br />
              Let’s make it <span className="accent-word">real.</span>
            </h2>
            <div>
              <p>
                A project, an opportunity, or a good conversation.
                <br />
                I’d love to hear what you have in mind.
              </p>
              <a
                className="button primary"
                href={
                  contact.email
                    ? `mailto:${contact.email}`
                    : "mailto:hello@example.com"
                }
                onClick={(e) => {
                  if (!contact.email) placeholder(e, "Email");
                }}
              >
                Say hello <ArrowUpRight size={19} />
              </a>
              {contact.email ? (
                <a
                  className="contact-placeholder"
                  href={`mailto:${contact.email}`}
                >
                  {contact.email}
                </a>
              ) : (
                <span className="contact-placeholder">
                  Email address coming soon
                </span>
              )}
            </div>
          </div>
          <div className="contact-links">
            <span>LET’S CONNECT</span>
            <a
              href={contact.github || "#contact"}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                if (!contact.github) placeholder(e, "GitHub");
              }}
            >
              <Github size={17} />
              GitHub <ArrowUpRight size={15} />
            </a>
            <a
              href={contact.linkedin || "#contact"}
              onClick={(e) => {
                if (!contact.linkedin) placeholder(e, "LinkedIn");
              }}
            >
              <Linkedin size={17} />
              LinkedIn <ArrowUpRight size={15} />
            </a>
            {(!contact.github || !contact.linkedin) && (
              <span className="social-note">
                {!contact.github && !contact.linkedin
                  ? "Profile links coming soon"
                  : !contact.linkedin
                    ? "LinkedIn coming soon"
                    : "GitHub coming soon"}
              </span>
            )}
          </div>
        </section>
      </main>
      <footer className="container footer">
        <a className="brand" href="#home">
          <span className="monogram">
            h<span>.</span>
          </span>
          <span>Made with intention.</span>
        </a>
        <span>© {new Date().getFullYear()} Houssam El Orabi</span>
        <a href="#home">
          Back to top <ArrowUpRight size={15} />
        </a>
        <a className="admin-link" href="#admin">
          <LockKeyhole size={14} /> Admin
        </a>
      </footer>
      {detail && (
        <DetailDialog detail={detail} onClose={() => setDetail(null)} />
      )}
    </>
  );
}
