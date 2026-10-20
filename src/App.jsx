import React, { useState, useEffect, useRef } from 'react';
import './index.css';
import LoadingScreen from './components/LoadingScreen';
import ThemeToggle from './components/ThemeToggle';
import ContactSection from './components/ContactSection';

// ===== CUSTOM CURSOR =====
function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      if (e.target.closest('a, button, .portfolio_item, .button, .capability_item, .process_card-content')) {
        setHovering(true);
      } else {
        setHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <div className="cursor-wrapper">
      <div
        className={`cursor-element ${hovering ? 'hovering' : ''}`}
        style={{ left: `${pos.x}px`, top: `${pos.y}px` }}
      />
    </div>
  );
}

// ===== DATA =====
const skillsData = [
  { name: 'HTML5 & CSS3', category: 'frontend', catLabel: 'Frontend', level: 95, icon: '🎨', desc: 'Semantic layout, CSS Grid, Flexbox, responsive UI & smooth animations' },
  { name: 'JavaScript (ES6+)', category: 'frontend', catLabel: 'Frontend', level: 90, icon: '⚡', desc: 'Async programming, DOM manipulation, REST APIs & modern ES6+ workflows' },
  { name: 'Python (Django)', category: 'backend', catLabel: 'Backend', level: 90, icon: '🐍', desc: 'RESTful API creation, MVC pattern, server logic & authentication' },
  { name: 'MongoDB', category: 'database', catLabel: 'Database', level: 85, icon: '🍃', desc: 'NoSQL document databases, data modeling & Mongoose/Django integration' },
  { name: 'MySQL', category: 'database', catLabel: 'Database', level: 88, icon: '🗄️', desc: 'Relational DB design, SQL queries, indexing, joins & relationships' },
  { name: 'Flutter', category: 'mobile', catLabel: 'Mobile', level: 82, icon: '📱', desc: 'Cross-platform mobile apps, Dart state management & UI widgets' },
  { name: 'Cloud & VMs', category: 'cloud', catLabel: 'Cloud', level: 85, icon: '☁️', desc: 'Virtual machine deployment, cloud storage & server infrastructure' },
  { name: 'Git & GitHub', category: 'tools', catLabel: 'Tools', level: 92, icon: '🐙', desc: 'Version control, branch management, collaborative coding & PRs' },
  { name: 'VS Code', category: 'tools', catLabel: 'Tools', level: 95, icon: '🛠️', desc: 'Professional code editor with powerful extensions, IntelliSense, debugging & Git integration' },
  { name: 'Antigravity IDE', category: 'tools', catLabel: 'Tools', level: 95, icon: '🤖', desc: 'AI-powered coding assistant for full-stack development, code generation & intelligent debugging' },
  { name: 'MS Excel', category: 'tools', catLabel: 'Data & Tools', level: 90, icon: '📊', desc: 'Advanced data structuring, formulas, analysis & reporting' },
];

const projectsData = [
  {
    id: 1,
    tag: 'Web Platform',
    title: 'Construction Worker & Material Finding Platform',
    desc: 'Developed a web-based platform using HTML, CSS, JavaScript, Python (Django), and MongoDB. Enables users to locate nearby workers, connect with structural designers, and purchase construction materials.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Python (Django)', 'MongoDB'],
    emoji: '🏗️',
  },
  {
    id: 2,
    tag: 'Management System',
    title: 'Employee Leave Management System',
    desc: 'Automated leave management solution using HTML, CSS, JavaScript, Python, and MySQL. Simplifies leave application, admin approvals, and detailed leave history tracking for organizations.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Python', 'MySQL'],
    emoji: '📋',
  },
  {
    id: 3,
    tag: 'Management System',
    title: 'Grocery Shop Management System',
    desc: 'Smart grocery shop management solution developed using HTML, CSS, JavaScript, Python (Django), and MongoDB. Streamlines product inventory, billing, sales, customer management, supplier management, and stock monitoring with a user-friendly interface for efficient retail operations.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Python (Django)', 'MongoDB'],
    emoji: '🛒',
  },
];

const experienceData = [
  {
    period: 'INTERNSHIP · LIVEWIRE',
    role: 'Web Development Intern',
    company: 'Livewire, Tiruchengode',
    desc: 'Demonstrated strong frontend capabilities, semantic HTML5/CSS3 layout structuring, JavaScript DOM manipulation, and responsive web design.',
  },
  {
    period: 'INTERNSHIP · MAKE VISION',
    role: 'Cloud Infrastructure Intern',
    company: 'Make Vision, Krishnagiri',
    desc: 'Gained practical expertise in cloud computing infrastructure, virtual machine provisioning, networking, and cloud storage management.',
  },
  {
    period: 'INDUSTRIAL TRAINING · DELPHI-TVS',
    role: 'Quality Operations Trainee',
    company: 'Delphi-TVS, Oragadam',
    desc: 'Participated in manufacturing production line quality control, analytical inspection, and precision testing workflows.',
  },
];

const processData = [
  { step: '01', title: 'Request', desc: 'Submit your requirements & project goals' },
  { step: '02', title: 'Estimate', desc: 'Get tech stack architecture & project roadmap' },
  { step: '03', title: 'Approve', desc: 'Finalize database schema & UI wireframes' },
  { step: '04', title: 'Develop', desc: 'Executed in Python (Django), React, or Flutter' },
  { step: '05', title: 'Deliver', desc: 'Full testing, quality assurance & deployment' },
];

const educationData = [
  {
    degree: 'B.Tech, Computer Science & Business Systems',
    school: 'Excel Engineering College (Autonomous)',
    period: '2023 – 2027 (Pursuing)',
    score: 'CGPA: 6.9',
  },
  {
    degree: 'HSC (Higher Secondary)',
    school: 'Darussalam Hr Sec School',
    period: '2022 – 2023',
    score: '66%',
  },
  {
    degree: 'SSLC (Secondary School)',
    school: 'Darussalam Hr Sec School',
    period: '2020 – 2021',
    score: '100% (Top Score)',
  },
];

const awardsData = [
  {
    rank: '🥇 1ST PRIZE',
    contest: 'Problem Solving Contest',
    dept: 'Techsynergy Club, Dept of CSBS, Excel Engineering College (Autonomous)',
  },
  {
    rank: '🥈 2ND PRIZE',
    contest: 'ARIVOLI 2K26 Project Expo',
    dept: 'Knowledge Institute of Technology (KIOT)',
  },
  {
    rank: '🏆 PARTICIPANT',
    contest: 'INTEROFEST 2K26 National Symposium',
    dept: 'Sree Sakthi Engineering College, Coimbatore',
  },
];

// ===== PARTICLE CANVAS =====
function ParticleCanvas() {
  const canvasRef = React.useRef(null);
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let W = canvas.offsetWidth;
    let H = canvas.offsetHeight;
    canvas.width = W; canvas.height = H;
    const COLORS = ['#00e5ff','#a855f7','#38bdf8','#818cf8','#67e8f9','#c084fc'];
    const particles = Array.from({ length: 200 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      r: Math.random() * 2.2 + 0.3,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.7 + 0.2,
    }));
    function draw() {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => {
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color; ctx.globalAlpha = p.alpha; ctx.fill(); ctx.globalAlpha = 1;
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
      });
      animId = requestAnimationFrame(draw);
    }
    draw();
    const onResize = () => { W = canvas.offsetWidth; H = canvas.offsetHeight; canvas.width = W; canvas.height = H; };
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', onResize); };
  }, []);
  return <canvas ref={canvasRef} className="particle-canvas" />;
}

// ===== SKILLS INTERACTIVE SECTION =====
function SkillsInteractiveSection() {
  const [activeTab, setActiveTab] = useState('all');
  const [animKey, setAnimKey] = useState(0);
  const [lineProgress, setLineProgress] = useState(0);
  const sectionRef = useRef(null);
  const animFrameRef = useRef(null);
  const hasAnimated = useRef(false);

  const categories = [
    { id: 'all', label: '⚡ All Skills' },
    { id: 'frontend', label: '🎨 Frontend' },
    { id: 'backend', label: '🐍 Backend' },
    { id: 'database', label: '🍃 Databases' },
    { id: 'mobile', label: '📱 Mobile' },
    { id: 'cloud', label: '☁️ Cloud' },
    { id: 'tools', label: '🛠️ Tools & Data' },
  ];

  const filteredSkills = activeTab === 'all'
    ? skillsData
    : skillsData.filter(s => s.category === activeTab);

  const runLineAnimation = (duration = 1200) => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    setLineProgress(0);
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const elapsed = ts - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setLineProgress(eased);
      if (progress < 1) animFrameRef.current = requestAnimationFrame(step);
    };
    animFrameRef.current = requestAnimationFrame(step);
  };

  // Intersection observer — fire once on first entry
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          runLineAnimation(1200);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(section);
    return () => {
      observer.disconnect();
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // When tab changes: bump animKey so cards remount fresh, then animate
  const handleTabChange = (id) => {
    if (id === activeTab) return;
    setActiveTab(id);
    setAnimKey(k => k + 1);
    runLineAnimation(800);
  };

  // SVG path spine
  const totalLength = 420;
  const dashOffset = totalLength * (1 - lineProgress);
  const dotY = 20 + lineProgress * 380;
  const dotX = 20 + Math.sin(lineProgress * Math.PI * 3) * 10;

  return (
    <section id="skills" className="section_skills_modern" ref={sectionRef}>
      <div className="padding-global"><div className="container-large"><div className="padding-section-large">

        {/* Section Header */}
        <div className="skills_header_area">
          <p className="text-style-allcaps section-accent-label">Tech Stack &amp; Expertise</p>
          <h2 className="skills_main_heading">Technical Skills &amp; Capabilities</h2>
          <p className="text-size-medium section-sub-text" style={{ marginTop: '0.8rem', maxWidth: '580px' }}>
            Hands-on expertise across full-stack web development, backend engineering, mobile apps, databases, and software tools.
          </p>
        </div>

        {/* Animated SVG line spine */}
        <div className="skills_line_spine_wrap" aria-hidden="true">
          <svg
            className="skills_line_svg"
            viewBox="0 0 40 420"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00e5ff" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#a855f7" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#00e5ff" stopOpacity="0.4" />
              </linearGradient>
              <filter id="lineGlow">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>
            <path
              d="M20 20 C30 80, 10 140, 20 200 C30 260, 10 320, 20 400"
              stroke="url(#lineGrad)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={totalLength}
              strokeDashoffset={dashOffset}
              opacity="0.35"
              filter="url(#lineGlow)"
            />
            <path
              d="M20 20 C30 80, 10 140, 20 200 C30 260, 10 320, 20 400"
              stroke="url(#lineGrad)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray={totalLength}
              strokeDashoffset={dashOffset}
            />
            {lineProgress > 0 && (
              <circle
                cx={dotX}
                cy={dotY}
                r="4"
                fill="#00e5ff"
                style={{ filter: 'drop-shadow(0 0 6px #00e5ff)' }}
              />
            )}
          </svg>
        </div>

        {/* Filter Tabs */}
        <div className="skills_filter_bar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`skills_filter_chip ${activeTab === cat.id ? 'is-active' : ''}`}
              onClick={() => handleTabChange(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Skills Grid — cards animate in with CSS stagger via animKey remount */}
        <div className="skills_cards_grid">
          {filteredSkills.map((skill, i) => (
            <div
              key={`${animKey}-${skill.name}`}
              className="skill_card_modern skill_card_reveal skill_card_stagger"
              style={{ '--stagger-i': i }}
            >
              <div className="skill_card_top">
                <div className="skill_icon_box">{skill.icon}</div>
                <span className="skill_cat_badge">{skill.catLabel}</span>
              </div>
              <h3 className="skill_card_title">{skill.name}</h3>
              <p className="skill_card_desc">{skill.desc}</p>
            </div>
          ))}
        </div>

      </div></div></div>
    </section>
  );
}

export default function App() {
  const [timeString, setTimeString] = useState('');
  const [activeSection, setActiveSection] = useState('about');
  const projectsRef = useRef(null);
  const [projectsVisible, setProjectsVisible] = useState(false);
  const [activeProject, setActiveProject] = useState(0);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);
  const touchStartXRef = useRef(null);
  const projectCount = projectsData.length;

  useEffect(() => {
    const section = projectsRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setProjectsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const nextProject = () => setActiveProject((p) => (p + 1) % projectCount);
  const prevProject = () => setActiveProject((p) => (p - 1 + projectCount) % projectCount);
  const goToProject = (i) => setActiveProject(i);

  // Autoplay — only while section is on screen and not paused/hovering
  useEffect(() => {
    if (isCarouselPaused || !projectsVisible) return;
    const id = setInterval(nextProject, 5000);
    return () => clearInterval(id);
  }, [isCarouselPaused, projectsVisible, activeProject]);

  const handlePointerDown = (e) => { touchStartXRef.current = e.clientX; };
  const handlePointerUp = (e) => {
    if (touchStartXRef.current === null) return;
    const delta = e.clientX - touchStartXRef.current;
    touchStartXRef.current = null;
    if (Math.abs(delta) < 50) return;
    if (delta < 0) nextProject(); else prevProject();
  };
  const handleCarouselKeyDown = (e) => {
    if (e.key === 'ArrowRight') nextProject();
    if (e.key === 'ArrowLeft') prevProject();
  };

  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      const opts = { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit' };
      setTimeString(date.toLocaleTimeString('en-US', opts));
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        { id: 'about', navId: 'about' },
        { id: 'skills', navId: 'skills' },
        { id: 'experience', navId: 'experience' },
        { id: 'projects', navId: 'projects' },
        { id: 'education', navId: 'education' },
        { id: 'contact', navId: 'contact' },
      ];
      const scrollPos = window.scrollY + 250;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i].navId);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });

  const navItems = [
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'education', label: 'Education' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <div className="page-wrapper">
      <LoadingScreen />
      <CustomCursor />

      {/* ===== NAVBAR ===== */}
      <div className="navbar_component">
        <div className="navbar_container">
          <a href="#about" className="navbar_logo-link" onClick={(e) => { e.preventDefault(); setActiveSection('about'); scrollTo('#about'); }}>
            <div className="navbar_logo-initial">S</div>
            <div className="navbar_text-wrapper">
              <div className="navbar_text">B Selvakumar</div>
              <div className="navbar_partner">PORTFOLIO</div>
            </div>
          </a>

          <nav className="navbar_menu is-page-height-tablet">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`navbar_link ${activeSection === item.id ? 'is-active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveSection(item.id);
                  scrollTo(`#${item.id}`);
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="navbar_button-wrapper">
            <ThemeToggle />
            <a href="#contact" className="button is-navbar-button" onClick={(e) => { e.preventDefault(); setActiveSection('contact'); scrollTo('#contact'); }}>Let's Talk</a>
          </div>
        </div>
      </div>

      {/* ===== MAIN ===== */}
      <main>

        {/* 1. ===== ABOUT ME ===== */}
        <header id="about" className="section_header">
          <div className="padding-global" style={{ width: '100%', position: 'relative', zIndex: 2 }}>
            <div className="container-large">
              <div className="hero-layout">
                {/* Left: Text content */}
                <div className="hero-inner">
                  <div className="hero-status-badge">
                    <span className="hero-status-dot" />
                    OPEN TO OPPORTUNITIES · 2026
                  </div>
                  <div className="hero-hi">HI, I'M</div>
                  <h1 className="hero-name">B Selvakumar</h1>
                  <div className="hero-subtitle">
                    <span className="word-cyan">building </span>
                    <span className="word-purple">software.</span>
                  </div>
                  <p className="hero-desc">
                    Final-year Computer Science &amp; Business Systems student with hands-on experience in web development, backend development, Python programming, and database management. Skilled in building responsive web apps with HTML5, CSS3, JavaScript, Python (Django), and MongoDB.
                  </p>
                  <div className="hero-cta-row">
                    <a href="#contact" className="hero-btn-primary" onClick={(e) => { e.preventDefault(); scrollTo('#contact'); }}>
                      Let's Talk
                      <svg width="16" height="16" viewBox="0 0 17 17" fill="none"><path d="M3 8.5L14 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M9.5 13L14 8.5L9.5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </a>
                    <a href="https://github.com/selvakumar2600" target="_blank" rel="noreferrer" className="hero-btn-secondary">GitHub Portfolio ↗</a>
                  </div>
                  <div className="hero-stat-row">
                    <span><span>3+</span> successful internships · 3 real-world projects</span>
                  </div>
                </div>

                {/* Right: Profile image */}
                <div className="hero-image-wrapper">
                  <div className="hero-image-glow" />
                  <img src="/Professional_Photo-1.png" alt="B Selvakumar" className="hero-profile-img" />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* 2. ===== SKILLS SECTION ===== */}
        <SkillsInteractiveSection />

        {/* 3. ===== EXPERIENCE SECTION ===== */}
        <section id="experience" className="section_capability" style={{ borderTop: 'none' }}>
          <div className="padding-global"><div className="container-large"><div className="padding-section-large">
            <p className="text-style-allcaps section-accent-label">Work &amp; Internships</p>
            <h2>Experience</h2>
            <p className="text-size-medium section-sub-text" style={{ marginTop: '0.7rem' }}>Practical industry exposure across web development, cloud computing, and quality engineering.</p>
            <div className="capability_list" style={{ marginTop: '2.5rem' }}>
              {experienceData.map((exp, i) => (
                <div key={i} className="capability_item" style={{ alignItems: 'flex-start', textAlign: 'left' }}>
                  <span className="card-period-label">{exp.period}</span>
                  <h3 style={{ marginTop: '0.4rem' }}>{exp.role}</h3>
                  <p className="card-company-text">{exp.company}</p>
                  <p className="card-desc-text" style={{ marginTop: '0.5rem' }}>{exp.desc}</p>
                </div>
              ))}
            </div>
          </div></div></div>
        </section>

        {/* 4. ===== PROJECT SECTION ===== */}
        <section id="projects" className="section_portfolio" ref={projectsRef}>
          <div className="padding-global"><div className="container-large"><div className="padding-section-large">
            <p className="text-style-allcaps section-accent-label">Featured Work</p>
            <h2>Projects</h2>
            <p className="text-size-medium section-sub-text" style={{ marginTop: '0.7rem' }}>Real-world software solutions built with modern technology stacks.</p>

            <div
              className={`portfolio_carousel portfolio_carousel_reveal ${projectsVisible ? 'is-visible' : ''}`}
              role="region"
              aria-roledescription="carousel"
              aria-label="Featured projects"
              tabIndex={0}
              onMouseEnter={() => setIsCarouselPaused(true)}
              onMouseLeave={() => setIsCarouselPaused(false)}
              onFocus={() => setIsCarouselPaused(true)}
              onBlur={() => setIsCarouselPaused(false)}
              onKeyDown={handleCarouselKeyDown}
            >
              <button type="button" className="portfolio_nav_btn portfolio_nav_prev" onClick={prevProject} aria-label="Previous project">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>

              <div
                className="portfolio_carousel_viewport"
                onPointerDown={handlePointerDown}
                onPointerUp={handlePointerUp}
              >
                <div
                  className="portfolio_carousel_track"
                  style={{ transform: `translateX(-${activeProject * 100}%)` }}
                >
                  {projectsData.map((project, i) => (
                    <div
                      key={project.id}
                      className="portfolio_slide"
                      aria-hidden={i !== activeProject}
                    >
                      <div className="portfolio_item">
                        <div className="portfolio_bg_preview"><span>{project.emoji}</span></div>
                        <div className="portfolio_image-overlay-layer" />
                        <div className="portfolio_slide_index">0{i + 1} <span>/ 0{projectCount}</span></div>
                        <div className="portfolio_content_wrapper">
                          <span className="portfolio_tag">{project.tag}</span>
                          <h3 className="portfolio_title">{project.title}</h3>
                          <p className="portfolio_desc">{project.desc}</p>
                          {project.tech && (
                            <div className="portfolio_tech_row">
                              {project.tech.map((t) => (
                                <span key={t} className="portfolio_tech_chip">{t}</span>
                              ))}
                            </div>
                          )}
                          <div className="button is-portfolio">
                            <div>View Project</div>
                            <svg className="portfolio_arrow" width="14" height="14" viewBox="0 0 15 15" fill="none"><path d="M3.854 11.146L11.146 3.854" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M11.146 9.82L11.146 3.854L5.18 3.854" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button type="button" className="portfolio_nav_btn portfolio_nav_next" onClick={nextProject} aria-label="Next project">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </div>

            <div className="portfolio_carousel_controls">
              <div className="portfolio_dots">
                {projectsData.map((project, i) => (
                  <button
                    key={project.id}
                    type="button"
                    className={`portfolio_dot ${i === activeProject ? 'is-active' : ''}`}
                    onClick={() => goToProject(i)}
                    aria-label={`Go to ${project.title}`}
                    aria-current={i === activeProject}
                  />
                ))}
              </div>
              <div className="portfolio_progress_track" aria-hidden="true">
                <div key={activeProject} className={`portfolio_progress_fill ${(isCarouselPaused || !projectsVisible) ? 'is-paused' : ''}`} />
              </div>
            </div>
          </div></div></div>
        </section>

        {/* 5. ===== EDUCATION SECTION ===== */}
        <section id="education" className="section_capability" style={{ borderTop: 'none' }}>
          <div className="padding-global"><div className="container-large"><div className="padding-section-large">
            <p className="text-style-allcaps section-accent-label">Academic Journey</p>
            <h2>Education</h2>
            <div className="capability_list" style={{ marginTop: '2.5rem' }}>
              {educationData.map((edu, i) => (
                <div key={i} className="capability_item" style={{ alignItems: 'flex-start', textAlign: 'left' }}>
                  <span className="card-period-label">DEGREE / CERTIFICATE</span>
                  <h3 style={{ marginTop: '0.4rem' }}>{edu.degree}</h3>
                  <p className="card-desc-text">{edu.school} · {edu.period}</p>
                  <p className="card-score-text" style={{ marginTop: '0.8rem' }}>{edu.score}</p>
                </div>
              ))}
            </div>
          </div></div></div>
        </section>

        {/* 6. ===== RECOGNITION SECTION ===== */}
        <section id="recognition" className="section_process">
          <div className="padding-global"><div className="container-large"><div className="padding-section-large">
            <p className="text-style-allcaps section-accent-label">Honors &amp; Achievements</p>
            <h2>Recognition</h2>
            <p className="text-size-medium section-sub-text" style={{ marginTop: '0.7rem' }}>Awards, competitions, and symposium participation.</p>
            <div className="capability_list" style={{ marginTop: '2.5rem' }}>
              {awardsData.map((award, i) => (
                <div key={i} className="capability_item award-card" style={{ alignItems: 'flex-start', textAlign: 'left' }}>
                  <span className="card-period-label">{award.rank}</span>
                  <h3 style={{ marginTop: '0.4rem' }}>{award.contest}</h3>
                  <p className="card-desc-text">{award.dept}</p>
                </div>
              ))}
            </div>
          </div></div></div>
        </section>

        {/* 7. ===== CONTACT SECTION (enhanced) ===== */}
        <ContactSection />
      </main>

      {/* ===== FOOTER ===== */}
      <footer className="footer_rich">
        <div className="padding-global"><div className="container-large">
          <div className="footer_rich_inner">
            <div className="footer_brand_col">
              <div className="footer_brand_logo">
                <span className="footer_brand_initial">S</span>
                <div>
                  <div className="footer_brand_name">B Selvakumar</div>
                  <div className="footer_brand_role">B.TECH CSBS DEVELOPER</div>
                </div>
              </div>
              <p className="footer_brand_desc">Building thoughtful, responsive web experiences — from enterprise systems to modern interfaces.</p>
            </div>
            <div className="footer_links_col">
              <div className="footer_col_heading">NAVIGATION</div>
              {[['#about','About'],['#skills','Skills'],['#experience','Experience'],['#projects','Projects'],['#education','Education'],['#recognition','Recognition'],['#contact','Contact']].map(([id,label]) => (
                <a key={id} href={id} className="footer_link" onClick={(e) => { e.preventDefault(); scrollTo(id); }}>{label}</a>
              ))}
            </div>
            <div className="footer_links_col">
              <div className="footer_col_heading">CONNECT</div>
              <a href="https://github.com/selvakumar2600" target="_blank" rel="noreferrer" className="footer_link">GitHub</a>
              <a href="https://linkedin.com/in/selvakumar-b-4335b1290/" target="_blank" rel="noreferrer" className="footer_link">LinkedIn</a>
              <a href="mailto:selvakumarb2406@gmail.com" className="footer_link">Email</a>
              <a href="tel:9150831569" className="footer_link">Phone</a>
            </div>
          </div>
          <div className="footer_bottom_bar">
            <p className="footer_text">Local time ⎯ <span>{timeString} IST</span></p>
            <p className="footer_text">© {new Date().getFullYear()} <span>B SELVAKUMAR</span>. All Rights Reserved.</p>
          </div>
        </div></div>
      </footer>
    </div>
  );
}
