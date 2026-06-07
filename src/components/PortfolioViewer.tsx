import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Github, Linkedin, Twitter, Mail, ExternalLink, Briefcase, 
  Sparkles, Layers, Sliders, Settings, ArrowUpRight, Check, Trash2, Code, MessageSquare
} from 'lucide-react';
import { PortfolioConfig, Project, CustomThemeColors, Skill, Experience } from '../types';

interface PortfolioViewerProps {
  config: PortfolioConfig;
  theme: CustomThemeColors;
  onOpenEditor: () => void;
  onOpenDeploy: () => void;
}

export default function PortfolioViewer({ config, theme, onOpenEditor, onOpenDeploy }: PortfolioViewerProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projectFilter, setProjectFilter] = useState<string>('all');
  
  // Contact Form State
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [inbox, setInbox] = useState<Array<{ id: string; name: string; email: string; message: string; date: string }>>([]);

  const fontClass = {
    sans: 'font-sans',
    serif: 'font-serif',
    mono: 'font-mono'
  }[theme.fontFamily];

  // Resolve precise dynamic theme variables
  const accentText = theme.id === 'artistic-flair' ? 'text-[#D4FF00]' : 
                     theme.id === 'cyberpunk-dark' ? 'text-[#10b981]' :
                     theme.id === 'minimalist-studio' ? 'text-sky-400' :
                     theme.id === 'editorial-serif' ? 'text-[#b91c1c]' :
                     theme.id === 'nordic-forest' ? 'text-[#2dd4bf]' : 'text-sky-450';

  const accentBg = theme.id === 'artistic-flair' ? 'bg-[#D4FF00] text-[#0A0A0A]' : 
                   theme.id === 'cyberpunk-dark' ? 'bg-[#10b981] text-stone-950' :
                   theme.id === 'minimalist-studio' ? 'bg-sky-500 text-white' :
                   theme.id === 'editorial-serif' ? 'bg-[#b91c1c] text-white' :
                   theme.id === 'nordic-forest' ? 'bg-[#2dd4bf] text-stone-950' : 'bg-sky-500 text-white';

  const accentBorder = theme.id === 'artistic-flair' ? 'border-[#D4FF00]' : 
                       theme.id === 'cyberpunk-dark' ? 'border-[#10b981]' :
                       theme.id === 'minimalist-studio' ? 'border-sky-500' :
                       theme.id === 'editorial-serif' ? 'border-[#b91c1c]' :
                       theme.id === 'nordic-forest' ? 'border-[#2dd4bf]' : 'border-sky-500';

  const accentBorderHover = theme.id === 'artistic-flair' ? 'hover:border-[#D4FF00]' : 
                            theme.id === 'cyberpunk-dark' ? 'hover:border-[#10b981]' :
                            theme.id === 'minimalist-studio' ? 'hover:border-sky-500' :
                            theme.id === 'editorial-serif' ? 'hover:border-[#b91c1c]' :
                            theme.id === 'nordic-forest' ? 'hover:border-[#2dd4bf]' : 'hover:border-[#6366f1]';

  const accentBgColorOnly = theme.id === 'artistic-flair' ? 'bg-[#D4FF00]' : 
                             theme.id === 'cyberpunk-dark' ? 'bg-[#10b981]' :
                             theme.id === 'minimalist-studio' ? 'bg-sky-500' :
                             theme.id === 'editorial-serif' ? 'bg-[#b91c1c]' :
                             theme.id === 'nordic-forest' ? 'bg-[#2dd4bf]' : 'bg-[#6366f1]';

  const accentBgMuted = theme.id === 'artistic-flair' ? 'bg-[#D4FF00]/10 text-[#D4FF00] border-[#D4FF00]/20' : 
                        theme.id === 'cyberpunk-dark' ? 'bg-[#10b981]/10 text-[#10b981] border-[#10b981]/20' :
                        theme.id === 'minimalist-studio' ? 'bg-sky-500/10 text-sky-500 border-sky-500/20' :
                        theme.id === 'editorial-serif' ? 'bg-[#b91c1c]/10 text-[#b91c1c] border-[#b91c1c]/20' :
                        theme.id === 'nordic-forest' ? 'bg-[#2dd4bf]/10 text-[#2dd4bf] border-[#2dd4bf]/20' : 'bg-sky-500/10 text-sky-400 border-sky-400/20';

  // Derive categories from existing skills
  const skillCategories = Array.from(new Set(config.skills.map(s => s.category)));

  // Generate unique tags list for project filters
  const allTags = Array.from(new Set(config.projects.flatMap(p => p.tags)));

  const filteredProjects = projectFilter === 'all' 
    ? config.projects 
    : config.projects.filter(p => p.tags.includes(projectFilter));

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) return;

    // Simulate sending & write to custom visual inbox
    const newMsg = {
      id: `msg-${Date.now()}`,
      name: contactForm.name,
      email: contactForm.email,
      message: contactForm.message,
      date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setInbox([newMsg, ...inbox]);
    setIsSubmitted(true);
    setContactForm({ name: '', email: '', message: '' });
    
    setTimeout(() => {
      setIsSubmitted(false);
    }, 4000);
  };

  const handleClearMsg = (id: string) => {
    setInbox(inbox.filter(m => m.id !== id));
  };

  // Helper link generator for CV/Resume
  const handleDownloadCV = () => {
    if (config.resumeUrl === '#') {
      alert(`CV / Resume download is simulated. The download can target any file path (e.g., config.resumeUrl) in your workspace repository!`);
    } else {
      window.open(config.resumeUrl, '_blank');
    }
  };

  return (
    <div className={`min-h-screen relative ${theme.bg} ${theme.text} ${fontClass} transition-colors duration-350 selection:bg-[#D4FF00] selection:text-[#0A0A0A]`} id="portfolio-viewer">
      
      {/* Radial dots grid background mesh */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0">
        <div className="w-full h-full" style={{ backgroundImage: theme.darkTheme ? 'radial-gradient(#ffffff 1.2px, transparent 1.2px)' : 'radial-gradient(#000000 1.2px, transparent 1.2px)', backgroundSize: '32px 32px' }} />
      </div>

      {/* Floating Design Controller Action Hub */}
      <div className="fixed bottom-6 right-6 z-45 flex flex-col sm:flex-row gap-3">
        <button
          onClick={onOpenEditor}
          className={`flex items-center gap-2 px-4 py-3 bg-stone-900 border border-stone-800 ${accentText} hover:brightness-110 font-bold text-sm tracking-tight rounded-full shadow-2xl transition-all hover:scale-105 active:scale-95`}
          id="trigger-floating-editor"
        >
          <Settings className="w-4 h-4 animate-spin-slow" />
          <span>Customize Portfolio</span>
        </button>
        <button
          onClick={onOpenDeploy}
          className={`flex items-center gap-2 px-4 py-3 ${accentBg} font-extrabold text-sm tracking-tight rounded-full shadow-2xl transition-all hover:scale-105 active:scale-95`}
          id="trigger-floating-deploy"
        >
          <ExternalLink className="w-4 h-4" />
          <span>GitHub Pages Deploy</span>
        </button>
      </div>

      {/* Styled Top Header Grid */}
      <header className={`sticky top-0 z-30 ${theme.bg}/80 backdrop-blur-md border-b ${theme.borderClass} transition-all relative z-10`} id="navbar">
        <div className="max-w-6xl mx-auto px-6 h-18 flex items-center justify-between">
          <a href="#hero" className="flex items-center gap-2.5 group">
            <span className={`w-9 h-9 flex items-center justify-center rounded-xl ${accentBgMuted} font-bold group-hover:${accentBg} transition-all`}>
              {config.avatarType === 'emoji' ? config.avatarUrl : <Check className="w-4 h-4" />}
            </span>
            <span className="font-extrabold tracking-tight text-sm md:text-base font-sans">{config.name}</span>
          </a>

          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold uppercase tracking-wider font-sans text-stone-400">
            <a href="#about" className={`hover:${accentText} transition-colors`}>About</a>
            <a href="#skills" className={`hover:${accentText} transition-colors`}>Skills</a>
            <a href="#projects" className={`hover:${accentText} transition-colors`}>Work</a>
            <a href="#experience" className={`hover:${accentText} transition-colors`}>History</a>
            <a href="#contact" className={`hover:${accentText} transition-colors`}>Contact</a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={handleDownloadCV}
              className={`px-4 py-1.5 rounded-lg border text-xs font-semibold ${theme.borderClass} hover:${accentBgMuted} hover:${accentBorder} transition-all`}
              id="header-cv-download"
            >
              Resume CV
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative pt-20 pb-16 md:py-32 px-6 overflow-hidden">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-start md:items-center gap-10 md:gap-16 relative z-10">
          
          {/* Avatar Container block */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative flex-shrink-0"
            id="avatar-frame"
          >
            {config.avatarType === 'emoji' ? (
              <div className={`w-24 h-24 md:w-32 md:h-32 rounded-3xl bg-stone-900 border-2 ${accentBorder} flex items-center justify-center text-5xl md:text-6xl shadow-2xl select-none`}>
                {config.avatarUrl}
              </div>
            ) : (
              <img 
                src={config.avatarUrl} 
                alt={config.name}
                referrerPolicy="no-referrer"
                className={`w-24 h-24 md:w-32 md:h-32 rounded-3xl object-cover border-2 ${accentBorder} shadow-2xl`}
              />
            )}
          </motion.div>

          {/* Details Column */}
          <div className="space-y-6 flex-1">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter leading-none text-stone-100 font-serif">
                {config.name.split(' ').map((word, wIdx) => (
                  <span key={wIdx} className={wIdx > 0 ? `block pl-8 md:pl-16 ${accentText}` : 'block'}>
                    {word}
                  </span>
                ))}
              </h1>
              <p className={`text-xs md:text-sm tracking-[0.3em] font-bold ${accentText} mt-4 uppercase font-mono`}>
                &mdash; {config.title}
              </p>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-stone-300 text-sm md:text-base leading-relaxed max-w-xl font-sans"
            >
              Building digital experiences that live at the intersection of <span className="text-stone-100 italic">design, engineering, and art</span>. {config.tagline}
            </motion.p>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap items-center gap-3 pt-2"
            >
              <a 
                href="#projects" 
                className={`px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg ${accentBg} transition-all transform active:scale-95`}
              >
                View Curated Work
              </a>
              <a 
                href="#contact" 
                className={`px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg border ${theme.borderClass} hover:bg-stone-850/50 transition-all transform active:scale-95`}
              >
                Let&apos;s Chat
              </a>
            </motion.div>
          </div>

        </div>
      </section>

      {/* About Section */}
      <section id="about" className={`py-16 md:py-24 px-6 border-t ${theme.borderClass} bg-stone-950/20 relative z-10`}>
        <div className="max-w-5xl mx-auto space-y-12">
          
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-[0.3em] font-mono text-stone-500">01 / BRAND BACKGROUND</span>
            <h2 className="text-2xl md:text-3xl font-serif text-stone-100 italic mt-0.5">Personal Story</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
            {/* Colon left summary */}
            <div className="md:col-span-5 space-y-5">
              <p className="text-sm md:text-base font-semibold leading-relaxed text-stone-250 italic">
                &ldquo;{config.aboutMini}&rdquo;
              </p>

              {/* Social Channels List */}
              <div className="flex flex-wrap gap-2.5 pt-2">
                {config.socials.github && (
                  <a href={config.socials.github} target="_blank" rel="noreferrer" className={`p-2 sm:p-2.5 rounded-lg bg-stone-900 border ${theme.borderClass} text-stone-400 hover:${accentText} transition`} title="GitHub Profile">
                    <Github className="w-4 h-4" />
                  </a>
                )}
                {config.socials.linkedin && (
                  <a href={config.socials.linkedin} target="_blank" rel="noreferrer" className={`p-2 sm:p-2.5 rounded-lg bg-stone-900 border ${theme.borderClass} text-stone-400 hover:${accentText} transition`} title="LinkedIn Profile">
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
                {config.socials.twitter && (
                  <a href={config.socials.twitter} target="_blank" rel="noreferrer" className={`p-2 sm:p-2.5 rounded-lg bg-stone-900 border ${theme.borderClass} text-stone-400 hover:${accentText} transition`} title="Twitter Profile">
                    <Twitter className="w-4 h-4" />
                  </a>
                )}
                {config.socials.email && (
                  <a href={`mailto:${config.socials.email}`} className={`p-2 sm:p-2.5 rounded-lg bg-stone-900 border ${theme.borderClass} text-stone-400 hover:${accentText} transition`} title="Send Direct Email">
                    <Mail className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>

            {/* Long narrative right */}
            <div className="md:col-span-7">
              <p className="text-sm md:text-base text-stone-400 leading-relaxed font-sans space-y-4">
                {config.aboutFull}
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Skills Matrix */}
      <section id="skills" className={`py-16 md:py-24 px-6 border-t ${theme.borderClass} relative z-10`}>
        <div className="max-w-5xl mx-auto space-y-12">
          
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-[0.3em] font-mono text-stone-500">02 / BRAND EXPERTISE</span>
            <h2 className="text-2xl md:text-3xl font-serif text-stone-100 italic mt-0.5 font-sans pb-0">Skills Matrix</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {skillCategories.map((cat, idx) => {
              const currentSkills = config.skills.filter(s => s.category === cat);
              if (currentSkills.length === 0) return null;

              return (
                <div key={idx} className="space-y-4">
                  <h3 className={`text-xs font-bold tracking-widest ${accentText} uppercase font-mono`}>{cat} Management</h3>
                  
                  <div className="space-y-3">
                    {currentSkills.map((sk, sIdx) => (
                      <div key={sIdx} className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-semibold text-stone-300">{sk.name}</span>
                          <span className="text-stone-500 font-mono text-[10px]">{sk.level}% Mastery</span>
                        </div>
                        {/* Meter bar */}
                        <div className="h-1.5 w-full bg-stone-950/60 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: `${sk.level}%` }}
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                            className={`h-full ${accentBgColorOnly} rounded-full`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Projects Showcase */}
      <section id="projects" className={`py-16 md:py-24 px-6 border-t ${theme.borderClass} bg-stone-950/10 relative z-10`}>
        <div className="max-w-5xl mx-auto space-y-12">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-[0.3em] font-mono text-stone-500">03 / CREATIVE PRODUCTION</span>
              <h2 className="text-2xl md:text-3xl font-serif text-stone-100 italic mt-0.5">Curated Work</h2>
            </div>
            
            {/* Filter buttons */}
            <div className="flex flex-wrap items-center gap-1.5 bg-stone-950 p-1 rounded-lg border border-stone-850">
              <button
                onClick={() => setProjectFilter('all')}
                className={`px-3 py-1 text-xs font-bold rounded-md transition cursor-pointer ${projectFilter === 'all' ? `${accentBg}` : 'text-stone-400 hover:text-stone-200'}`}
              >
                All
              </button>
              {allTags.map((tag, sIdx) => (
                <button
                  key={sIdx}
                  onClick={() => setProjectFilter(tag)}
                  className={`px-3 py-1 text-xs font-bold rounded-md transition cursor-pointer ${projectFilter === tag ? `${accentBg}` : 'text-stone-400 hover:text-stone-200'}`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Grid list of cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProjects.map((p) => (
              <motion.div
                key={p.id}
                layout
                className={`group cursor-pointer p-6 rounded-2xl bg-stone-900 border border-stone-850 hover:${accentBorder} hover:shadow-2xl hover:scale-[1.01] transition-all duration-300 flex flex-col justify-between border-l-4 ${accentBorder}`}
                onClick={() => setSelectedProject(p)}
                id={`project-card-${p.id}`}
              >
                <div className="space-y-4">
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-stone-950 border border-stone-800">
                    <img 
                      src={p.image} 
                      alt={p.title} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-102 transition duration-300"
                    />
                    {p.featured && (
                      <span className="absolute top-2.5 right-2.5 px-2 py-0.5 text-[9px] font-bold tracking-widest bg-emerald-400 text-stone-950 rounded-md uppercase flex items-center gap-1">
                        <Sparkles className="w-2.5 h-2.5" /> Featured
                      </span>
                    )}
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-base md:text-xl font-serif text-stone-250 flex items-center justify-between group-hover:italic group-hover:text-stone-100 transition-all">
                      {p.title}
                      <ArrowUpRight className={`w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity ${accentText}`} />
                    </h3>
                    <p className="text-xs md:text-sm text-stone-400 line-clamp-3 leading-relaxed">
                      {p.description}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-stone-850/50 mt-4">
                  {p.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="px-2 py-0.5 text-[10px] font-medium bg-stone-950 text-stone-400 rounded-md font-mono border border-stone-850">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* Timeline Experience */}
      <section id="experience" className={`py-16 md:py-24 px-6 border-t ${theme.borderClass} relative z-10`}>
        <div className="max-w-4xl mx-auto space-y-12">
          
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-[0.3em] font-mono text-stone-500">04 / EXPERIENCE</span>
            <h2 className="text-2xl md:text-3xl font-serif text-stone-100 italic mt-0.5">Employment Timeline</h2>
          </div>

          <div className="relative pl-6 md:pl-8 border-l border-stone-800 space-y-12 py-2">
            {config.experience.map((exp) => (
              <div key={exp.id} className="relative group" id={`timeline-item-${exp.id}`}>
                {/* Visual node */}
                <span className={`absolute -left-10 md:-left-12 top-1.5 w-4.5 h-4.5 rounded-full bg-stone-900 border-2 ${accentBorder} group-hover:${accentBgColorOnly} transition duration-300`} />
                
                <div className="space-y-2">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-1">
                    <h3 className="text-base md:text-lg font-extrabold text-stone-200">{exp.role}</h3>
                    <span className="text-xs text-sky-400 font-mono font-bold bg-sky-500/10 px-2 py-0.5 rounded-md border border-sky-500/20">{exp.period}</span>
                  </div>
                  
                  <span className="text-xs font-semibold text-stone-400 block">{exp.company}</span>
                  <p className="text-xs md:text-sm text-stone-400 leading-relaxed max-w-2xl mt-2">
                    {exp.description}
                  </p>

                  {exp.bullets && exp.bullets.length > 0 && (
                    <ul className="list-disc list-inside text-xs text-stone-500 space-y-1 pl-1 mt-2">
                      {exp.bullets.map((b, bIdx) => (
                        <li key={bIdx} className="leading-relaxed">{b}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Interactive Contact & Simulated Msg Console */}
      <section id="contact" className={`py-16 md:py-24 px-6 border-t ${theme.borderClass} bg-stone-950/20 relative z-10`}>
        <div className="max-w-5xl mx-auto space-y-12">
          
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-[0.3em] font-mono text-stone-500">05 / INTERACTIVE CONSOLE</span>
            <h2 className="text-2xl md:text-3xl font-serif text-stone-100 italic mt-0.5">Let's Connect</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
            
            {/* Form Left */}
            <div className="lg:col-span-7 bg-stone-900 border border-stone-850 p-6 md:p-8 rounded-2xl space-y-6">
              <div className="space-y-2">
                <h3 className={`text-sm font-bold uppercase tracking-wider ${accentText} font-mono flex items-center gap-1.5`}>
                  <Code className="w-4 h-4" /> Form Submission Block
                </h3>
                <p className="text-xs text-stone-400 leading-relaxed font-sans">
                  Enter details to test form reactions. It saves messages inside the local React environment, letting your friend test static input submissions.
                </p>
              </div>

              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1 font-mono">Your Name</label>
                    <input 
                      type="text"
                      required
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      placeholder="Jane Doe"
                      className={`w-full px-3 py-2.5 text-xs rounded-xl bg-stone-950 border border-stone-800 text-stone-100 focus:outline-hidden focus:${accentBorder}`}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1 font-mono">Email Address</label>
                    <input 
                      type="email"
                      required
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      placeholder="jane@company.com"
                      className={`w-full px-3 py-2.5 text-xs rounded-xl bg-stone-950 border border-stone-800 text-stone-100 focus:outline-hidden focus:${accentBorder}`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1 font-mono">Message Content</label>
                  <textarea 
                    rows={4}
                    required
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    placeholder="Hello! Let's build a software visual engine..."
                    className={`w-full px-3 py-2.5 text-xs rounded-xl bg-stone-950 border border-stone-800 text-stone-100 focus:outline-hidden focus:${accentBorder}`}
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    type="submit"
                    className={`flex-1 py-3 text-xs uppercase tracking-wider ${accentBg} font-extrabold rounded-xl transition duration-300 cursor-pointer`}
                  >
                    Simulate Submit
                  </button>
                  <a
                    href={`mailto:${config.socials.email}?subject=Inquiry%20from%20Portfolio&body=${encodeURIComponent(contactForm.message)}`}
                    className={`p-3 text-xs bg-stone-950 border border-stone-800 hover:${accentBorder} ${accentText} rounded-xl transition flex items-center justify-center gap-1.5`}
                    title="Send via Email Client"
                  >
                    <Mail className="w-4 h-4" /> Directly Mail
                  </a>
                </div>

                {isSubmitted && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-emerald-500/10 border border-emerald-400/40 text-emerald-400 text-xs rounded-xl font-medium"
                  >
                    Message sent successfully! Your message was submitted to the local Preview Inbox.
                  </motion.div>
                )}
              </form>
            </div>

            {/* Simulated Inbox Right */}
            <div className="lg:col-span-5 bg-stone-900 border border-stone-850 p-6 md:p-8 rounded-2xl flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className={`text-sm font-bold uppercase tracking-wider ${accentText} font-mono flex items-center gap-1.5`}>
                    <MessageSquare className="w-4 h-4" /> Client Inbox ({inbox.length})
                  </h3>
                  {inbox.length > 0 && (
                    <button 
                      onClick={() => setInbox([])}
                      className="text-[10px] text-stone-500 hover:text-red-400 font-bold transition uppercase font-mono"
                    >
                      Empty
                    </button>
                  )}
                </div>
                
                <p className="text-xs text-stone-400 leading-relaxed font-sans">
                  Every time someone tests the submit button above, their request displays here in real-time. Test it to see.
                </p>

                <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
                  {inbox.length === 0 ? (
                    <div className="py-8 text-center text-[11px] text-stone-500 font-mono border border-dashed border-stone-800 rounded-xl">
                      Inbox currently vacant.
                    </div>
                  ) : (
                    inbox.map((msg) => (
                      <div key={msg.id} className="p-3 bg-stone-950 border border-stone-850 rounded-xl text-xs space-y-1.5 animate-fade-in relative group font-sans">
                        <button 
                          onClick={() => handleClearMsg(msg.id)}
                          className="absolute top-2 right-2 text-stone-500 hover:text-red-400 font-bold opacity-0 group-hover:opacity-100 transition duration-200"
                          title="Discard Message"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-stone-200 truncate pr-4">{msg.name}</span>
                          <span className={`text-[9px] ${accentText} font-mono`}>{msg.date}</span>
                        </div>
                        <span className="text-[10px] text-stone-500 block truncate">{msg.email}</span>
                        <p className="text-stone-400 text-[11px] leading-relaxed line-clamp-2 italic pt-1 border-t border-stone-850/50">
                          &ldquo;{msg.message}&rdquo;
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-stone-850/60 text-[10px] text-stone-500 leading-relaxed font-mono mt-4 lg:mt-0">
                Data persists in client cache memory across browser refreshes.
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className={`py-16 border-t ${theme.borderClass} text-xs text-stone-550 px-6 relative z-10 bg-black/40`}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-center md:items-start gap-1">
            <span className="font-sans text-stone-300">&copy; {new Date().getFullYear()} {config.name}. All rights reserved under template guidelines.</span>
            <span className="text-[10px] text-stone-500 font-mono">Developed with Artistic Flair theme presets</span>
          </div>

          <div className="text-center md:text-right flex flex-col items-center md:items-end gap-1.5">
            <div className="flex items-center gap-2.5">
              <div className={`w-2 h-2 rounded-full ${accentBgColorOnly} animate-pulse`} />
              <span className="text-[11px] uppercase tracking-[0.2em] font-mono text-stone-300">Available for projects</span>
            </div>
            <span className="text-[10px] text-stone-500 font-mono">Status: Production Grade CLI Ready</span>
          </div>
        </div>
      </footer>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl bg-stone-900 border border-stone-800 rounded-2xl text-stone-100 shadow-2xl p-6 md:p-8 relative z-55"
              id={`detail-modal-${selectedProject.id}`}
            >
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-stone-800">
                <span className={`text-[10px] uppercase font-bold tracking-widest ${accentText} font-mono`}>Project Blueprint / curations</span>
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="p-1 px-2 hover:bg-stone-850 text-stone-400 hover:text-white rounded transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="aspect-video rounded-xl bg-stone-950 overflow-hidden border border-stone-800 mb-5 text-stone-400">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl md:text-2xl font-serif text-stone-100 italic">{selectedProject.title}</h3>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {selectedProject.tags.map((tag, idx) => (
                      <span key={idx} className="px-2 py-0.5 text-[10px] font-mono bg-stone-950 text-stone-400 border border-stone-850 rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="text-xs md:text-sm text-stone-300 leading-relaxed font-sans whitespace-pre-line">
                  {selectedProject.longDescription || selectedProject.description}
                </p>

                <div className="flex items-center gap-3 pt-4 border-t border-stone-800">
                  {selectedProject.liveUrl && selectedProject.liveUrl !== '#' && (
                    <a 
                      href={selectedProject.liveUrl} 
                      target="_blank" 
                      rel="noreferrer" 
                      className={`px-4 py-2 ${accentBg} text-xs font-bold rounded-lg flex items-center gap-1.5 transition`}
                    >
                      <ArrowUpRight className="w-4 h-4" /> Visit Live Site
                    </a>
                  )}
                  {selectedProject.githubUrl && selectedProject.githubUrl !== '#' && (
                    <a 
                      href={selectedProject.githubUrl} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="px-4 py-2 bg-stone-950 hover:bg-stone-850 border border-stone-800 text-stone-300 text-xs font-bold rounded-lg flex items-center gap-1.5 transition"
                    >
                      <Github className="w-4 h-4" /> Source Repository
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

// Simple Helper component to handle close modal
function X(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      {...props}
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
